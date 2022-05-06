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

  if (data?.prefferences) console.log("Prefferences updated!");

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

function _OnBeforeRequestListener(details) {
  if (
    details.initiator ==
      "chrome-extension://lgfhjciihpoeejbcfcmehckhpmpkgfbp" ||
    details.url.startsWith(
      "chrome-extension://lgfhjciihpoeejbcfcmehckhpmpkgfbp"
    )
  )
    return {};

  console.log("Request has started! Details: ", details);
  setCookiesListener(false);
  chrome.storage.local.get(["server"], async (result) => {
    // Also get the historyItem and attach it to the body

    sendRequest(
      { server: result.server, route: "/request", body: details },
      async (res) => {
        console.log("Received response from backend: ", res);
        if (res) {
          switch (res.status) {
            case "Allow":
              if ("cookies" in res) {
                replaceCookies({
                  cookies: res.cookies,
                  callback: () => {
                    console.log("All cookies have been set!");
                    chrome.tabs.update(
                      details.tabId,
                      { url: details.url },
                      () => console.log("Made request with backend cookies!")
                    );
                  },
                });
              } else {
                chrome.tabs.update(details.tabId, { url: details.url }, () =>
                  console.log("Made request with no backend cookies!")
                );
              }
              break;
            case "Deny":
              chrome.tabs.update(
                details.tabId,
                { url: chrome.runtime.getURL("/pages/blocked/blocked.html") },
                () => console.log("Redirected!")
              );
              break;
            case "Obfuscated":
              var path = details.url.replace(/^[a-z]+:\/\//, "");
              chrome.tabs.update(
                details.tabId,
                { url: `http://${result.server}/3001/obfuscated/${path}` },
                () => console.log("Redirected!")
              );
              break;
          }
        } else {
          // Redirect to page that says that backend is offline
          chrome.tabs.update(
            details.tabId,
            { url: chrome.runtime.getURL("/pages/blocked/blocked.html") },
            () => console.log("Redirected!")
          );
        }
      }
    );
  });

  return { redirectUrl: "javascript:" };
  // Get all prefferences

  // Get all cookies that match that domain from the backend

  // Apply them to the request headers
}

function _OnCompletedRequestListener(details) {
  if (
    details.url.startsWith(
      "chrome-extension://lgfhjciihpoeejbcfcmehckhpmpkgfbp"
    )
  )
    return;

  console.log("Request has completed! Details: ", details);
  updateCookiePrefferences({
    callback: () => {
      synchronizeUser({
        callback: () => {
          console.log("All selected cookies have been removed!");
          setCookiesListener(true);
        },
      });
    },
  });
}

var _OnCookieChangedFunctionID;
function _OnCookieChangedListener(changeInfo) {
  console.log("Cookie changed! Details: ", changeInfo);

  // Most platforms continuously set the consent
  // cookie even though the user has already consented

  if (_OnCookieChangedFunctionID) {
    clearTimeout(_OnCookieChangedFunctionID);
    _OnCookieChangedFunctionID = null;
  }

  _OnCookieChangedFunctionID = setTimeout(() => {
    setCookiesListener(false);
    synchronizeUser({
      callback: () => {
        _OnCookieChangedFunctionID = null;
        setCookiesListener(true);
        console.log("Cookies sent to backend!");
      },
    });
  }, 2000);
}

function sendRequest(
  {
    route = "/",
    server = null,
    body = {},
    method = "POST",
    maxTries = 3,
    timeout = 3000,
  },
  callback
) {
  chrome.storage.local.get(["server"], async (data) => {
    const backend_port = 3001;
    const backend_ip = server ?? data.server;
    const scheme = "http";

    const controller = new AbortController();

    var tries = 0;
    while (tries < maxTries) {
      try {
        var id = setTimeout(() => controller.abort(), timeout);
        const res = await fetch(
          `${scheme}://${backend_ip}:${backend_port}${route}`,
          {
            method: method,
            credentials: "include",
            timeout: timeout,
            signal: controller.signal,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          }
        );

        clearTimeout(id);
        switch (res.status) {
          case 200:
            callback(await res.json());
            return;
          default:
            console.log("Trying...");
            tries += 1;
        }
      } catch (e) {
        clearTimeout(id);
        console.log("Trying...");
        console.log(e);
        await new Promise((r) => setTimeout(r, timeout));
        tries += 1;
      }
    }
    callback(null);
  });
}

function setHTTPS(status) {
  if (status) {
    console.log("HTTPS Listener activated!");

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
    console.log("HTTPS Listener deactivated!");
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

function setRequestListener(status) {
  if (status) {
    console.log("RequestListener activated!");
    chrome.webRequest.onBeforeRequest.addListener(
      _OnBeforeRequestListener,
      { urls: ["<all_urls>"], types: ["main_frame"] },
      ["blocking"]
    );
    chrome.webRequest.onCompleted.addListener(
      _OnCompletedRequestListener,
      { urls: ["<all_urls>"], types: ["main_frame"] },
      ["responseHeaders", "extraHeaders"]
    );
  } else {
    console.log("RequestListener deactivated!");
    chrome.webRequest.onBeforeRequest.removeListener(_OnBeforeRequestListener);
    chrome.webRequest.onCompleted.removeListener(_OnCompletedRequestListener);
  }
}

function setCookiesListener(status) {
  if (status) {
    console.log("CookiesListener activated!");
    chrome.cookies.onChanged.addListener(_OnCookieChangedListener);
  } else {
    console.log("CookiesListener deactivated!");
    chrome.cookies.onChanged.removeListener(_OnCookieChangedListener);
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
    ["data", "logged_in", "server", "backendUp", "obfuscated"],
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

function setCookies({ cookies, callback = null }) {
  // Recursively set cookies so that we can call
  // the callback after setting the last cookie

  var cookie = cookies.pop();
  console.log("Setting cookie ", cookie);
  cookie.url = `https://${cookie.domain.replace(/^\./, "")}${cookie.path}`;
  if (cookies.length > 0) {
    chrome.cookies.set(cookie, () =>
      setCookies({ cookies: cookies, callback: callback })
    );
  } else {
    chrome.cookies.set(cookie, callback);
  }
}

function removeCookies({ cookies, callback = null }) {
  // Recursively remove cookies so that we can call
  // the callback after setting the last cookie

  if (cookies.length === 0) {
    callback();
  } else {
    var cookie = cookies.pop();
    const details = {
      name: cookie.name,
      url: `https://${cookie.domain.replace(/^\./, "")}${cookie.path}`,
      storeId: cookie.storeId,
    };

    if (cookie.name.search(/consent/i) !== -1) {
      removeCookies({ cookies: cookies, callback: callback });
    } else {
      console.log("Removing cookie ", cookie);
      chrome.cookies.remove(details, () =>
        removeCookies({ cookies: cookies, callback: callback })
      );
    }
  }
}

function replaceCookies({ cookies, fake_data = false, callback = null }) {
  if (cookies.length === 0) {
    callback();
  } else {
    var cookie = cookies.pop();
    cookie.url = `https://${cookie.domain.replace(/^\./, "")}${cookie.path}`;

    if (fake_data) {
      console.log("Faking cookie ", cookie);
      cookie.value = "x".repeat(cookie.value.length);
    }
    else{
      console.log("Replacing cookie ", cookie);
    }
    try {
      chrome.cookies.set(cookie, () =>
        replaceCookies({
          cookies: cookies,
          fake_data: fake_data,
          callback: callback,
        })
      );
    } catch (e) {
      console.log("Error :>> ", e);
    }
  }
}

function synchronizeUser({ callback = null }) {
  console.log("Synchronizing user...");

  // Cancel call if we already do this here
  if (_OnCookieChangedFunctionID) {
    clearInterval(_OnCookieChangedFunctionID);
    _OnCookieChangedFunctionID = null;
  }

  chrome.storage.local.get(["prefferences", "server"], async (res) => {
    // Create template
    var sync_data = {
      prefferences: {
        cookies: res.prefferences.cookies,
        history: res.prefferences.history,
      },
      data: {
        cookies: {},
        history: {
          browsing: [],
          download: [],
        },
      },
    };
    const prefferences = res.prefferences;

    // Attach cookies from active/forced platforms to sync_data
    chrome.cookies.getAll({}, (cookies) => {
      console.log(
        "All the cookies BEFORE adding them to sync_data :>> ",
        cookies
      );
      let active_platforms = [];
      Object.keys(prefferences.cookies).forEach((platform) => {
        if (
          prefferences.cookies[platform].forced ||
          prefferences.cookies[platform]["active"] === true
        )
          active_platforms.push(platform);
      });

      for (cookie of cookies) {
        // Get platform of cookie
        var fields = cookie.domain.split(".");
        var platform;
        if (fields.slice(-2).join(".") === "co.uk") {
          platform = fields[fields.length - 3];
        } else {
          platform = fields[fields.length - 2];
        }

        if (!platform) continue;

        // Capitalize first letter
        platform = platform.charAt(0).toUpperCase() + platform.slice(1);

        // Check if platform is active
        if (active_platforms.includes(platform)) {
          delete cookie.session;
          delete cookie.hostOnly;

          if (!sync_data.data.cookies[platform])
            sync_data.data.cookies[platform] = [];
          sync_data.data.cookies[platform].push(cookie);
        }
      }

      console.log("Sending data to backend... ", sync_data);
      sendRequest(
        { server: res.server, route: "/user/sync", body: sync_data },
        () => {
          console.log("User synchronized!");

          // Delete sent cookies from local
          if (Object.keys(sync_data.data.cookies).length > 0) {
            let cookies_to_replace = [];
            for (platform in sync_data.data.cookies) {
              cookies_to_replace = cookies_to_replace.concat(
                sync_data.data.cookies[platform]
              );
            }
            replaceCookies({
              cookies: cookies_to_replace,
              fake_data: true,
              callback: callback,
            });
          }
        }
      );
    });

    // Attach history to sync_data
    //await chrome.history.search({ text: "" }, (res) => {});

    //await chrome.downloads.search({ query: "" }, (res) => {});

    // Send request
  });
}

function updateCookiePrefferences({ callback = null }) {
  // Called after login
  // Gets all available cookies and adds prefferences for all new cookies
  chrome.storage.local.get(["prefferences"], (data) => {
    chrome.cookies.getAll({}, async (result) => {
      result.forEach((cookie) => {
        let fields = cookie.domain.split(".");
        var host;

        if (fields.slice(-2).join(".") === "co.uk") {
          host = fields[fields.length - 3];
        } else {
          host = fields[fields.length - 2];
        }
        var domain = fields.join(".");

        if (host) {
          host = host.charAt(0).toUpperCase() + host.substring(1).toLowerCase();
          if (host in data.prefferences.cookies) return;

          data.prefferences.cookies[host] = {
            domain: domain,
            active: true,
          };
        }
      });
      console.log("Prefferences updated!");
      chrome.storage.local.set({ prefferences: data.prefferences }, callback);
    });
  });
}

//setInterval(heartbeat, 5000);

chrome.tabs.onCreated.addListener((tab) => {
  if (tab.pendingUrl === "chrome://downloads/")
    console.log("Downloads opened!");
  if (tab.pendingUrl === "chrome://history/") console.log("History opened!");
});

chrome.downloads.onCreated.addListener((downloadItem) => {
  // Pause the download and send a request to the backend so
  // it can be checked
  // Remove item from history after it is complete
});

chrome.history.onVisited.addListener((historyItem) => {
  //console.log("History listener");
  // Remove item
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.action) {
    case "Activate": {
      setHTTPS(true);
      setRequestListener(true);
      synchronizeUser({
        callback: () => {
          setCookiesListener(true);
        },
      });
      break;
    }
    case "Deactivate": {
      setHTTPS(false);
      setRequestListener(false);
      setCookiesListener(false);
      break;
    }
    case "LoggedIn": {
      chrome.contextMenus.create({
        title: "Report page as malicious!",
        onclick: report_url,
        documentUrlPatterns: ["https://*/*", "http://*/*", "ftp://*/*"],
      });
      updateCookiePrefferences({});
      break;
    }
    case "LoggedOut": {
      setHTTPS(false);
      setRequestListener(false);
      setCookiesListener(false);
      chrome.contextMenus.removeAll();
      break;
    }
  }
});
