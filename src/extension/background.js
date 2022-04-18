function _BlacklistListener(details) {
  return { redirectUrl: chrome.runtime.getURL("/pages/blocked/blocked.html") };
}

function _HTTPSListenerRequest(details) {
  //console.log("_HTTPSListenerRequest Triggered");
  return { redirectUrl: details.url.replace("http://", "https://") };
}

function _HTTPSListenerRedirect(details) {
  //console.log("_HTTPSListenerRedirect Triggered");
  if (details.redirectUrl.search(/^http:\/\//) != -1)
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

function _StorageListener(data, areaName) {
  console.log("data :>> ", data);
  // On logout
  if (!data?.logged_in?.newValue) {
    return;
  }

  if (data?.blacklist) {
    if (
      !equalArrays(
        data.blacklist.urls.newValue,
        data.blacklist.urls.oldValue
      ) ||
      !equalArrays(
        Object.keys(data.blacklist.reports.newValue),
        Object.keys(data.blacklist.reports.newValue)
      ) ||
      !data.blacklist.oldValue
    ) {
      setBlacklist(false);
      setBlacklist(true);
      console.log("Blacklist updated!");
    }
  }

  if (data?.obfuscated) {
    if (
      !equalArrays(data.obfuscated.newValue, data.obfuscated.obfuscated) ||
      !data.obfuscated.oldValue
    ) {
      setObfuscated(false);
      setObfuscated(true);
      console.log("Obfuscated updated!");
    }
  }
}

function setBlacklist(status) {
  if (status) {
    chrome.storage.local.get(["blacklist"], (result) => {
      var urls = [];

      var blacklist = result.blacklist;
      var url_arrays = [blacklist.urls, Object.keys(blacklist.reports)];

      for (var i = 0; i < url_arrays.length; i++) {
        url_arrays[i].forEach((url) => {
          urls.push(`*://*.${url}/*`);
        });
      }

      chrome.webRequest.onBeforeRequest.addListener(
        _BlacklistListener,
        {
          urls: urls,
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
      _HTTPSListenerRequest,
      { urls: ["http://*/"] },
      ["blocking"]
    );

    chrome.webRequest.onBeforeRedirect.addListener(
      _HTTPSListenerRedirect,
      { urls: ["*://*/"] },
      ["responseHeaders", "extraHeaders"]
    );
  } else {
    //console.log("HTTPS Listener Dectivated!");
    chrome.webRequest.onBeforeRequest.removeListener(_HTTPSListenerRequest);
    chrome.webRequest.onBeforeRedirect.removeListener(_HTTPSListenerRedirect);
  }
}

function setObfuscated(status) {
  if (status) {
    chrome.storage.local.get(["obfuscated"], (result) => {
      chrome.webRequest.onBeforeRequest.addListener(
        _ObfuscatedListenerRedirect,
        {
          urls: result.obfuscated.map((website) => `*://*.${website}/*`),
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

function equalArrays(arr1, arr2) {
  //console.log('arr1 :>> ', arr1);
  //console.log('arr2 :>> ', arr2);
  if (arr1.length != arr2.length) return false;
  for (let i = 0; i < arr1.length; i++)
    if (!arr2.includes(arr1[i])) return false;

  return true;
}

function heartbeat() {
  console.log("Heartbeat");
  chrome.storage.local.get(
    ["data", "logged_in", "server", "backendUp", "blacklist", "obfuscated"],
    (result) => {
      if (result) {
        if (result.logged_in) {
          fetch(`http://${result.server}:3001/heartbeat`, { method: "POST" })
            .then(async (res) => {
              if (res.status !== 200 && result.backendUp) {
                result.backendUp = false;
                console.log("Backend is offline!");
                chrome.storage.local.set(result);
              } else if (res.status === 200) {
                if (!result.backendUp) {
                  result.backendUp = true;
                  console.log("Backend is online!");
                }
                res = await res.json();

                if (!equalArrays(res.blacklist.urls, result.blacklist.urls)) {
                  result.blacklist.urls = res.blacklist.urls;
                }

                if (!equalArrays(res.obfuscated, result.obfuscated)) {
                  result.obfuscated = res.obfuscated;
                }

                chrome.storage.local.set(result);
              }
            })
            .catch((err) => {
              console.log("err :>> ", err);
              if (result.backendUp) {
                result.backendUp = false;
                console.log("Backend is offline!");
                chrome.storage.local.set(result, () =>
                  console.log("Storage updated!")
                );
              }
            });
        }
      }
    }
  );
}

function report_url(data, tab) {
  chrome.storage.local.get(["url"], (result) => {
    result.url = tab.url;
    chrome.storage.local.set(result, () => {
      chrome.tabs.update(tab.id, {
        url: chrome.runtime.getURL("/pages/report/build/index.html"),
      });
    });
  });
}

function updateUser() {
  console.log("User updated!");
}

var setUserAutoUpdaterFunctionID;
function setUserAutoUpdater(status) {
  console.log("setUserAutoUpdaterFunction :>> ", setUserAutoUpdaterFunctionID);
  if (status) {
    console.log("UserAutoUpdaterFunction enabled!");
    setUserAutoUpdaterFunctionID = setInterval(updateUser, 60000); // Update user each minute
  } else {
    if (setUserAutoUpdaterFunctionID) {
      console.log("UserAutoUpdaterFunction disabled!");
      clearInterval(setUserAutoUpdaterFunctionID);
    }
  }
}

setInterval(heartbeat, 5000);
chrome.cookies.onChanged.addListener((details) =>
  console.log("Cookie changed details :>> ", details)
);
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.action) {
    case "Activate": {
      setHTTPS(true);
      setBlacklist(true);
      setObfuscated(true);
      setUserAutoUpdater(true);
      break;
    }
    case "Deactivate": {
      setHTTPS(false);
      setBlacklist(false);
      setObfuscated(false);
      setUserAutoUpdater(false);
      break;
    }
    case "LoggedIn": {
      chrome.contextMenus.create({
        title: "Report page as malicious!",
        onclick: report_url,
        documentUrlPatterns: ["https://*/*", "http://*/*", "ftp://*/*"],
      });
      // Resets _BlacklistListener and _ObfuscatedListener on each update!
      chrome.storage.onChanged.addListener(_StorageListener);
      break;
    }
    case "LoggedOut": {
      setHTTPS(false);
      setBlacklist(false);
      setObfuscated(false);
      setUserAutoUpdater(false);
      chrome.contextMenus.removeAll();
      chrome.storage.onChanged.removeListener(_StorageListener);
      break;
    }
  }
});
