function _BlacklistListener(_) {
  return { redirectUrl: chrome.runtime.getURL("blocked.html") };
}

function _HTTPSListener(details) {
  console.log("_HTTPSListener Triggered");
  return { redirectUrl: details.url.replace("http://", "https://") };
}

function _ObfuscatedListenerRedirect(details) {
  console.log("_ObfuscatedListenerRedirect");
  chrome.storage.local.get(["data"], (result) => {
    var url = details.url.replace(/^[a-z]+:\/\//, "");
    result.data.website_path = url;
    chrome.storage.local.set({ data: result.data });
  });
  return {
    redirectUrl: `http://localhost:3001/obfuscated/${details.url.replace(
      /^https?:\/\//,
      ""
    )}`,
  };
}

function setBlacklist(status) {
  if (status) {
    chrome.storage.local.get(["data"], (result) => {
      chrome.webRequest.onBeforeRequest.addListener(
        _BlacklistListener,
        {
          urls: result.data.blacklist.map((website) => `*://*.${website}/*`),
          types: ["main_frame", "sub_frame"],
        },
        ["blocking"]
      );
    });
  } else {
    chrome.webRequest.onBeforeRequest.removeListener(_BlacklistListener);
  }
}

function setHTTPS(status) {
  if (status) {
    console.log("HTTPS Listener Activated!");
    chrome.webRequest.onBeforeRequest.addListener(
      _HTTPSListener,
      { urls: ["http://*/"], types: ["main_frame", "sub_frame"] },
      ["blocking"]
    );
  } else {
    console.log("HTTPS Listener Dectivated!");
    chrome.webRequest.onBeforeRequest.removeListener(_HTTPSListener);
  }
}

function setObfuscated(status) {
  if (status) {
    chrome.storage.local.get(["data"], (result) => {
      chrome.webRequest.onBeforeRequest.addListener(
        _ObfuscatedListenerRedirect,
        {
          urls: result.data.obfuscated.map((website) => `*://*.${website}/*`),
          types: ["main_frame", "sub_frame"],
        },
        ["blocking"]
      );
    });
  } else {
    chrome.webRequest.onBeforeRequest.removeListener(
      _ObfuscatedListenerRedirect
    );
  }
}

function equalArrays(arr1, arr2){
  if (arr1.length != arr2.length)
    return false;

  for (let i = 0; i < arr1.length; i++)
    if (!arr2.includes(arr1[i]))
      return false;
  
  return true;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Background: I have received a message - ", message);
  if (message.action == "Activate") {
    setHTTPS(true);
    setBlacklist(true);
    setObfuscated(true);
    chrome.runtime.sendMessage({ mesaj: "salut" });
  } else if (message.action == "Deactivate") {
    setHTTPS(false);
    setBlacklist(false);
    setObfuscated(false);
  }
});

setInterval(heartbeat, 5000);

function heartbeat() {
  chrome.storage.local.get(["data"], (result) => {
    if (result.data !== undefined) {
      if (result.data.logged_in) {
        console.log("I am logged in! Fetching!");
        fetch(`http://${result.data.server}:3001/heartbeat`, { method: "POST" })
          .then(async (res) => {
            if (res.status !== 200 && result.data.backendUp) {
              result.data.backendUp = false;
              console.log("Backend is offline!");
              chrome.storage.local.set({ data: result.data }, () => console.log("Storage updated!"));
            } else if (res.status === 200) {
              if (!result.data.backendUp) {
                result.data.backendUp = true;
                console.log("Backend is online!");
              }
              res = await res.json();

              var reset_blacklist = false,
                reset_obfuscated = false;
              
              if (!equalArrays(res.blacklist, result.data.blacklist)) {
                console.log("old: ", result.data.blacklist, "new: ", res.blacklist);
                reset_blacklist = true;
                result.data.blacklist = res.blacklist;
              }
              
              if (!equalArrays(res.obfuscated, result.data.obfuscated)) {
                console.log("old: ", result.data.obfuscated, "new: ", res.obfuscated);
                reset_obfuscated = true;
                result.data.obfuscated = res.obfuscated;
              }

              chrome.storage.local.set({ data: result.data }, () => {
                if (reset_blacklist) {
                  setBlacklist(false);
                  setBlacklist(true);
                  console.log("Blacklist updated!");
                }

                if (reset_obfuscated){
                  setObfuscated(false);
                  setObfuscated(true);
                  console.log("Obfuscated updated!");
                } 
                
              });
            }
          })
          .catch((res) => {
            if (res.status !== 200 && result.data.backendUp) {
              result.data.backendUp = false;
              console.log("Backend is offline!");
              chrome.storage.local.set({ data: result.data }, () =>
                console.log("Storage updated!")
              );
            }
          });
      }
    }
  });
}
