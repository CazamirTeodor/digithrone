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

var platforms_accessed = [];
function _OnBeforeRequestListener(details) {
  if (
    details.initiator ==
      "chrome-extension://lgfhjciihpoeejbcfcmehckhpmpkgfbp" ||
    details.url.startsWith(
      "chrome-extension://lgfhjciihpoeejbcfcmehckhpmpkgfbp"
    ) ||
    details.method !== "GET"
  )
    return {};

  console.log("Request has started! Details: ", details);
  chrome.storage.local.get(["server"], (result) => {
    sendRequest(
      { server: result.server, route: "/request", body: details },
      (res) => {
        console.log("Received response from backend: ", res);
        if (res) {
          switch (res.status) {
            case "Allow":
              let platform = getPlatformFromUrl(details.url);
              if ("cookies" in res) {
                chrome.cookies.getAll({ url: details.url }, (cookies) => {
                  if (
                    cookies.length === 0 ||
                    !platforms_accessed.includes(platform)
                  ) {
                    setCookies(res.cookies, () => {
                      console.log("All cookies have been set!");
                      chrome.tabs.update(
                        details.tabId,
                        { url: details.url },
                        () => {
                          platforms_accessed.push(platform);
                          console.log(
                            "Made request to " +
                              details.url +
                              " with backend cookies!"
                          );
                        }
                      );
                    });
                  } else {
                    chrome.tabs.update(
                      details.tabId,
                      { url: details.url },
                      () => {
                        platforms_accessed.push(platform);
                        console.log(
                          "Made request to" +
                            details.url +
                            " with local cookies!"
                        );
                      }
                    );
                  }
                });
              } else {
                console.log(platform + " has been accessed!");
                chrome.tabs.update(details.tabId, { url: details.url }, () => {
                  platforms_accessed.push(platform);
                  console.log(
                    "Made request to " +
                      details.url +
                      " with no backend cookies!"
                  );
                });
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
}

function _OnCompletedRequestListener(details) {
  if (
    details.url.startsWith(
      "chrome-extension://lgfhjciihpoeejbcfcmehckhpmpkgfbp"
    )
  )
    return;

  console.log("Request has completed! Details: ", details);
  updateCookiePrefferences(synchronizeUser);
}

function _OnRemovedTabListener(tabId, removeInfo) {
  if (removeInfo.isWindowClosing)
    console.log(
      "You closed tab %d by closing the window %d",
      tabId,
      removeInfo.windowId
    );
  else {
    console.log("You closed tab %d by clicking the x button", tabId);
  }
  chrome.storage.local.get(["prefferences", "server"], (res) => {
    chrome.tabs.query({}, (openedTabs) => {
      chrome.cookies.getAll({}, (cookies) => {
        const prefferences = res.prefferences;

        let prefferences_active_platforms = Object.keys(prefferences.cookies)
          .map((platform) => {
            if (
              prefferences.cookies[platform].forced ||
              prefferences.cookies[platform]["active"]
            )
              return platform;
          })
          .filter((platform) => platform !== undefined);

        let opened_tabs_platforms = openedTabs
          .map((tab) => {
            let platform = getPlatformFromUrl(tab.url);
            if (platform && platform in prefferences.cookies)
              if (prefferences.cookies[platform]["active"]) return platform;
          })
          .filter((platform) => platform !== undefined);

        let platforms_to_attach = prefferences_active_platforms.filter(
          (platform) =>
            !opened_tabs_platforms.includes(platform) &&
            prefferences.cookies[platform]["active"]
        );

        // console.log(
        //   "prefferences_active_platforms :>> ",
        //   prefferences_active_platforms.length
        // );
        // console.log("opened_tabs_platforms :>> ", opened_tabs_platforms);
        // console.log("platforms_to_attach :>> ", platforms_to_attach.length);

        let cookies_to_remove = [];
        cookies.forEach((cookie) => {
          let platform = getPlatformFromUrl(cookie.domain);
          if (platforms_to_attach.includes(platform)) {
            cookies_to_remove.push(cookie);
          }
        });
        if (cookies_to_remove.length > 0) synchronizeUser();
      });
    });
  });
}

function _OnCreatedTabListener(tab) {
  // For history and downloads tabs
  
  if (tab.pendingUrl === "chrome://downloads/")
    console.log("Downloads opened!");
  if (tab.pendingUrl === "chrome://history/") console.log("History opened!");
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
      ["blocking", "requestBody", "extraHeaders"]
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

function setTabsListeners(status) {
  if (status) {
    console.log("TabsListener activated!");
    chrome.tabs.onRemoved.addListener(_OnRemovedTabListener);
    chrome.tabs.onCreated.addListener(_OnCreatedTabListener);
  } else {
    console.log("TabsListener deactivated!");
    chrome.tabs.onRemoved.removeListener(_OnRemovedTabListener);
    chrome.tabs.onCreated.removeListener(_OnCreatedTabListener);
  }
}

function setListeners(status) {
  if (status) {
    console.log("Listeners activated!");
    setHTTPS(true);
    setRequestListener(true);
    setTabsListeners(true);
  } else {
    console.log("Listeners deactivated!");
    setHTTPS(false);
    setRequestListener(false);
    setTabsListeners(false);
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

function setCookies(cookies, callback = () => {}) {
  // Recursively set cookies so that we can call
  // the callback after setting the last cookie

  if (cookies.length === 0) {
    callback();
  } else {
    var cookie = cookies.pop();
    cookie.url = `https://${cookie.domain.replace(/^\./, "")}${cookie.path}`;

    delete cookie.session;
    delete cookie.hostOnly;

    console.log("Setting cookie for domain", cookie.domain);
    chrome.cookies.set(cookie, () => setCookies(cookies, callback));
  }
}

function removeCookies(cookies, callback = () => {}) {
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

    console.log("Removing cookie for domain", cookie.domain);
    chrome.cookies.remove(details, () => removeCookies(cookies, callback));
  }
}

function removeStartingCookies(callback = () => {}) {
  chrome.storage.local.get(["prefferences"], (res) => {
    chrome.cookies.getAll({}, (cookies) => {
      const prefferences = res.prefferences;
      let prefferences_active_platforms = Object.keys(prefferences.cookies)
        .map((platform) => {
          if (
            prefferences.cookies[platform].forced ||
            prefferences.cookies[platform]["active"]
          )
            return platform;
        })
        .filter((platform) => platform !== undefined);

      let cookies_to_remove = [];
      cookies.forEach((cookie) => {
        let platform = getPlatformFromUrl(cookie.domain);
        if (prefferences_active_platforms.includes(platform)) {
          cookies_to_remove.push(cookie);
        }
      });
      console.log("Cookies to remove :>> ", cookies_to_remove);
      removeCookies(cookies_to_remove, callback);
    });
  });
}

function getPlatformFromUrl(url) {
  // Url should not start with chrome://, etc.
  if (url.search(/^chrome/) !== -1) return undefined;
  if (url.search(/^file:\/\//) !== -1) return undefined;
  if (url.search(/\./) === -1) return undefined;
  if (url.search(/(^https*:\/\/)*([a-zA-Z0-9]*\.{0,1})*/) === -1)
    return undefined;

  // Remove scheme if any
  url = url.match(/(^https*:\/\/)*([a-zA-Z0-9]*\.{0,1})*/)[0];
  url = url.replace(/^https*:\/\//, "");
  if (url) {
    var platform;
    let hostname_fields = url.split(".");
    if (hostname_fields.slice(-2).join(".") === "co.uk") {
      platform = hostname_fields[hostname_fields.length - 3];
    } else {
      platform = hostname_fields[hostname_fields.length - 2];
    }

    return platform.charAt(0).toUpperCase() + platform.slice(1);
  }

  return undefined;
}

function synchronizeUser(callback = () => {}) {
  console.log("Synchronizing user...");

  chrome.storage.local.get(["prefferences", "server"], async (res) => {
    chrome.tabs.query({}, (openedTabs) => {
      chrome.cookies.getAll({}, (cookies) => {
        chrome.history.search({ text: "", maxResults: 10000 }, (visits) => {
          chrome.downloads.search({}, (downloads) => {
            const prefferences = res.prefferences;
            const server = res.server;

            var sync_data = {
              prefferences: {
                cookies: prefferences.cookies,
                history: prefferences.history,
              },
              data: {
                cookies: {},
                history: {
                  browsing: [],
                  download: [],
                },
              },
            };

            const browsing_days = prefferences.history.browsing;
            const downloads_days = prefferences.history.downloads;
            const now_time = new Date().getTime();

            // Attach browsing history
            if (browsing_days >= 0) {
              if (browsing_days == 0)
                sync_data.data.history.browsing.concat(visits);
              else {
                const browsing_start_time =
                  now_time - browsing_days * 24 * 60 * 60 * 1000;
                visits.forEach((visit) => {
                  if (visit.visitTime > browsing_start_time) {
                    sync_data.data.history.browsing.push(visit);
                  }
                });
              }
            }

            // Attach downloads history
            if (downloads_days >= 0) {
              if (downloads_days == 0)
                sync_data.data.history.download.concat(downloads);
              else {
                const downloads_start_time =
                  now_time - downloads_days * 24 * 60 * 60 * 1000;
                downloads.forEach((download) => {
                  if (download.startTime > downloads_start_time) {
                    sync_data.data.history.download.push(download);
                  }
                });
              }
            }

            // Attach cookies
            let prefferences_active_platforms = Object.keys(
              prefferences.cookies
            )
              .map((platform) => {
                if (
                  prefferences.cookies[platform].forced ||
                  prefferences.cookies[platform]["active"]
                )
                  return platform;
              })
              .filter((platform) => platform !== undefined);

            let opened_tabs_platforms = [
              ...new Set(
                openedTabs
                  .map((tab) => {
                    let platform = getPlatformFromUrl(tab.url);
                    return platform;
                  })
                  .filter((platform) => platform !== undefined)
              ),
            ];

            let platforms_to_attach = prefferences_active_platforms.filter(
              (platform) =>
                !opened_tabs_platforms.includes(platform) &&
                prefferences.cookies[platform]["active"]
            );

            console.log(
              "prefferences_active_platforms :>> ",
              prefferences_active_platforms.length
            );
            console.log("opened_tabs_platforms :>> ", opened_tabs_platforms);
            console.log("platforms_to_attach :>> ", platforms_to_attach.length);

            let cookies_to_remove = [];
            cookies.forEach((cookie) => {
              let platform = getPlatformFromUrl(cookie.domain);

              if (opened_tabs_platforms.includes(platform)) {
                if (!sync_data.data.cookies[platform])
                  sync_data.data.cookies[platform] = [];
                sync_data.data.cookies[platform].push(cookie);
              } else if (platforms_to_attach.includes(platform)) {
                cookies_to_remove.push(cookie);
                if (!sync_data.data.cookies[platform])
                  sync_data.data.cookies[platform] = [];
                sync_data.data.cookies[platform].push(cookie);
              }
            });

            console.log("Sending data to backend... ", sync_data);
            console.log("Cookies to remove ", cookies_to_remove);
            if (platforms_to_attach.length > 0)
              sendRequest(
                { server: server, route: "/user/sync", body: sync_data },
                () => {
                  console.log("User synchronized!");

                  // Delete browsing history
                  if (browsing_days >= 0)
                    chrome.history.deleteAll(() =>
                      console.log("Browsing deleted!")
                    );

                  // Delete downloads history
                  if (downloads_days >= 0)
                    chrome.downloads.erase({}, () =>
                      console.log("Downloads deleted!")
                    );

                  // Delete cookies sent
                  removeCookies(cookies_to_remove, callback);
                }
              );
          });
        });
      });
    });
  });
}

function updateCookiePrefferences(callback = () => {}) {
  // Called after login
  // Gets all available cookies and adds prefferences for all new cookies
  chrome.storage.local.get(["prefferences"], (data) => {
    chrome.cookies.getAll({}, (cookies) => {
      cookies.forEach((cookie) => {
        let platform = getPlatformFromUrl(cookie.domain);
        if (platform) {
          if (platform in data.prefferences.cookies) return;

          data.prefferences.cookies[platform] = {
            active: true,
            domain: cookie.domain,
          };
        }
      });
      console.log("Prefferences updated!");
      chrome.storage.local.set(data, callback);
    });
  });
}

//setInterval(heartbeat, 5000);

chrome.downloads.onCreated.addListener((downloadItem) => {
  // Pause the download and send a request to the backend so
  // it can be checked
  // Remove item from history after it is complete
});

chrome.history.onVisited.addListener((historyItem) => {
  // console.log("History listener", historyItem);
});

chrome.tabs.onActivated.addListener((activeInfo) => {
  // console.log("You are on tab ", activeInfo.tabId);
});

// Tutorial
// chrome.runtime.onInstalled.addListener((reason) => {
//   if (reason === chrome.runtime.OnInstalledReason.INSTALL) {
//     chrome.tabs.create({
//       url: 'onboarding.html'
//     });
//   }
// });

// Should remove cookies and sync when closing a tab/window
// Should get platform cookies and sync when navigating to another platform

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.action) {
    case "Activate": {
      setListeners(true);
      removeStartingCookies(synchronizeUser);
      platforms_accessed = [];
      break;
    }
    case "Deactivate": {
      setListeners(false);
      synchronizeUser(removeStartingCookies);
      platforms_accessed = [];
      break;
    }
    case "LoggedIn": {
      chrome.contextMenus.create({
        title: "Report page as malicious!",
        onclick: report_url,
        documentUrlPatterns: ["https://*/*", "http://*/*", "ftp://*/*"],
      });
      updateCookiePrefferences();
      break;
    }
    case "LoggedOut": {
      setListeners(false);
      synchronizeUser();
      chrome.contextMenus.removeAll();
      break;
    }
  }
});
