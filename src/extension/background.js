var heartbeatFunctionId;
var visited_platforms = [];
var opened_tabs = {};
setRequestBlocker(true);

// function _HTTPSListenerRequest(details) {
//   console.log("_HTTPSListenerRequest Triggered ", details);
//   if (
//     details.initiator === "chrome-extension://lgfhjciihpoeejbcfcmehckhpmpkgfbp"
//   )
//     return;
//   return { redirectUrl: details.url.replace("http://", "https://") };
// }

function _HTTPRedirectBlocker(details) {
  // if (
  //   details.redirectUrl === "javascript:" ||
  //   details.initiator === "chrome-extension://lgfhjciihpoeejbcfcmehckhpmpkgfbp"
  // )
  //   return;

  if (details.statusCode === 301 || details.statusCode === 302) {
    for (var header of details.responseHeaders) {
      if (header.name.toLowerCase() === "location") {
        if (header.value.startsWith("http://")) {
          console.log("_HTTPRedirectBlocker Triggered ", details);
          displayPopup({ type: "no-https" });
          return {
            redirectUrl: "javascript:",
          };
        }
      }
    }
  }
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
  console.log("_StorageListener Triggered");

  if (data.backendUp) {
    if (data.backendUp.oldValue !== data.backendUp.newValue) {
      if (data.backendUp.newValue) {
        console.log("Backend went online!");
        displayPopup({ type: "backend-online" });
        clearInterval(heartbeatFunctionId);
      } else {
        console.log("Backend went offline!");
        displayPopup({ type: "backend-offline" });
        heartbeatFunctionId = setInterval(heartbeat, 5000);
      }
    }
  }

  // When user enables/disables an option
  if (data.prefferences) {
    console.log(data);

    for (const [platform, attrs] of Object.entries(
      data.prefferences.newValue.cookies.platforms
    )) {
      if (
        attrs.active !==
        data.prefferences.oldValue.cookies.platforms[platform].active
      ) {
        let index = visited_platforms.indexOf(platform);
        if (index != -1) visited_platforms.splice(index, 1);

        if (attrs.active) {
        } else {
          // Add platform cookies to be synchronized
        }

        removeCookiesForPlatform(platform);
      }
    }

    // Sync with backend on cookies
    if (
      data.prefferences.oldValue.cookies.active !==
      data.prefferences.newValue.cookies.active
    ) {
      visited_platforms = [];
      console.log("Cookies set to:", data.prefferences.newValue.cookies.active);
      if (data.prefferences.newValue.cookies.active) clearData("cookies");
      else {
        getBrowserData((data) => {
          chrome.tabs.query({}, (tabs) => {
            chrome.storage.local.get(["server", "prefferences"], (res) => {
              if (res.server) {
                var cookies = {};
                console.log("Prefferences are ", res.prefferences);

                // Filter by unique platforms
                opened_tabs_platforms = Object.values(opened_tabs).filter(
                  (value, index, self) => self.indexOf(value) === index
                );

                Object.keys(data.cookies).forEach((platform) => {
                  if (
                    (res.prefferences.cookies.platforms[platform].active ||
                      res.prefferences.cookies.platforms[platform].forced) &&
                    opened_tabs_platforms.includes(platform)
                  ) {
                    console.log("Appended platform ", platform);
                    cookies[platform] = data.cookies[platform];
                  }
                });
                if (Object.keys(cookies).length > 0)
                  sendRequest(
                    {
                      route: "/user/sync",
                      server: res.server,
                      body: {
                        prefferences: res.prefferences,
                        data: {
                          cookies: cookies,
                        },
                      },
                    },
                    (res) => {
                      if (res) {
                        for (let platform of Object.keys(cookies))
                          removeCookiesForPlatform(platform);
                      }
                    }
                  );
              }
            });
          });
        });
      }
    }

    // Wipe browsing history
    if (
      data.prefferences.oldValue.history.browsing !==
      data.prefferences.newValue.history.browsing
    ) {
      console.log(
        "Browsing history set to:",
        data.prefferences.newValue.history.browsing
      );
      if (data.prefferences.newValue.history.browsing) clearData("browsing");
    }

    // Wipe downloads history
    if (
      data.prefferences.oldValue.history.downloads !==
      data.prefferences.newValue.history.downloads
    ) {
      console.log(
        "Downloads history set to:",
        data.prefferences.newValue.history.downloads
      );
      if (data.prefferences.newValue.history.downloads) clearData("downloads");
    }
  }
}

function _OnBeforeRequestListener(details) {
  if (details.url.startsWith("http://") && !details.url.includes("localhost")) {
    console.log(details, "redirected to https beforeRequest");
    return { redirectUrl: details.url.replace("http://", "https://") };
  }

  if (
    details.initiator ==
      "chrome-extension://lgfhjciihpoeejbcfcmehckhpmpkgfbp" ||
    details.url.startsWith(
      "chrome-extension://lgfhjciihpoeejbcfcmehckhpmpkgfbp"
    ) ||
    details.method !== "GET"
  )
    return {};

  console.log("Request to " + details.url + "... started!");

  chrome.windows.getCurrent({ windowTypes: ["normal"] }, (currentWindow) => {
    chrome.tabs.query({}, (tabs) => {
      chrome.storage.local.get(
        ["server", "prefferences", "backendUp"],
        (result) => {
          getBrowserData((data) => {
            var sync_data = {
              prefferences: result.prefferences,
              data: {
                cookies: {},
                history: {},
              },
            };

            let platforms = result.prefferences.cookies.platforms; // Create a copy

            // Establish all details (START)
            var active_platforms = [],
              disabled_platforms = [],
              forced_platforms = [],
              opened_tabs_platforms = [],
              current_tab_platform,
              next_request_platform;

            Object.keys(platforms).forEach((platform) => {
              if (platforms[platform].forced) {
                forced_platforms.push(platform);
                //sync_data.data.cookies[platform] = data.cookies[platform]; // Append forced cookies
                return;
              } else if (platforms[platform].active) {
                // if (result.prefferences.cookies.active)
                //   if (visited_platforms.includes(platform))
                //     sync_data.data.cookies[platform] = data.cookies[platform]; // Apend active cookies
                active_platforms.push(platform);
                return;
              } else if (!platforms[platform].active) {
                disabled_platforms.push(platform);
                return;
              }
            });

            opened_tabs_platforms = tabs
              .map((tab) => getPlatformFromUrl(tab.url))
              .filter((platform) => platform)
              .filter(
                (platform, index, self) => self.indexOf(platform) === index
              );

            current_tab_platform = getPlatformFromUrl(
              tabs.filter((tab) => tab.id === details.tabId)[0].url
            );
            next_request_platform = getPlatformFromUrl(details.url);
            // Establish all details (END)

            if (
              forced_platforms.includes(current_tab_platform) ||
              (result.prefferences.cookies.active &&
                active_platforms.includes(current_tab_platform) &&
                visited_platforms.includes(current_tab_platform))
            )
              sync_data.data.cookies[current_tab_platform] =
                data.cookies[current_tab_platform];

            // Append browsing history (START)
            if (result.prefferences.history.browsing) {
              sync_data.data.history.browsing = data.history.browsing;
            }
            // Append browsing history (END)

            // Append downloads history (START)
            if (result.prefferences.history.downloads) {
              sync_data.data.history.downloads = data.history.downloads;
            }
            // Append downloads history (END)

            details.sync_data = sync_data;
            console.log(
              "Appending synchronization data to request: ",
              sync_data
            );

            // Get active tab
            let activeTab, activeTabId;
            console.log(tabs);
            for (let tab of tabs) {
              if (tab.active && tab.windowId === currentWindow.id) {
                activeTab = tab;
                activeTabId = tab.id;
                break;
              }
            }

            // console.log("Forced platforms:", forced_platforms);
            // console.log("Active platforms:", active_platforms);
            // console.log("Disabled platforms:", disabled_platforms);
            // console.log("Opened tabs platforms:", opened_tabs_platforms);
            // console.log("Current tab platform:", current_tab_platform);
            // console.log("Next request platform:", next_request_platform);
            sendRequest(
              { server: result.server, route: "/request", body: details },
              (res) => {
                if (res) {
                  if ("message" in res) {
                    if (
                      res.message ===
                        "Session cookie is not valid! Please reauthenticate!" ||
                      res.message === "No session cookie provided!"
                    ) {
                      chrome.storage.local.set({ logged_in: false }, () => {
                        setListeners(false);
                        setRequestBlocker(true);
                        clearData("all", () =>
                          removeSessionCookie(() => {
                            displayPopup({ type: "session-invalid" });
                          })
                        );
                      });
                      return;
                    }
                  }

                  let cookies_to_remove = [];
                  if (result.prefferences.cookies.delete_policy === "tab close")
                    if (Object.keys(sync_data.data.cookies).length > 0) {
                      const [platform, cookies] = Object.entries(
                        sync_data.data.cookies
                      )[0];
                      if (platform !== next_request_platform) {
                        var tabs_nb = tabs.filter(
                          (tab) => getPlatformFromUrl(tab.url) === platform
                        ).length;
                        console.log(
                          "There are %d tabs for platform %s",
                          tabs_nb,
                          platform
                        );
                        if (tabs_nb === 1) {
                          const index = visited_platforms.indexOf(platform);
                          if (index !== -1) visited_platforms.splice(index, 1);
                          cookies_to_remove = cookies_to_remove.concat(cookies);
                        }
                      }
                    }
                  console.log("visited_platforms :>> ", visited_platforms);

                  removeCookies(cookies_to_remove, () => {
                    if (details.sync_data.prefferences.history.browsing)
                      clearData("browsing");

                    if (details.sync_data.prefferences.history.downloads)
                      clearData("downloads");

                    console.log("Received response from backend: ", res);
                    switch (res.status) {
                      case "Allow":
                        let platform = getPlatformFromUrl(details.url);
                        if ("cookies" in res) {
                          if (result.prefferences.cookies.active)
                            if (
                              active_platforms.includes(platform) ||
                              forced_platforms.includes(platform)
                            ) {
                              if (!visited_platforms.includes(platform)) {
                                visited_platforms.push(platform);
                                setCookies(res.cookies, () => {
                                  console.log("All cookies have been set!");
                                  chrome.tabs.update(
                                    details.tabId,
                                    { url: details.url },
                                    () =>
                                      console.log(
                                        `Made request to ${details.url} with backend cookies!`
                                      )
                                  );
                                });
                              } else {
                                chrome.tabs.update(
                                  details.tabId,
                                  { url: details.url },
                                  () =>
                                    console.log(
                                      `Made request to ${details.url} with local cookies!`
                                    )
                                );
                              }
                            }
                        } else {
                          if (!visited_platforms.includes(platform))
                            visited_platforms.push(platform);
                          chrome.tabs.update(
                            details.tabId,
                            { url: details.url },
                            () =>
                              console.log(
                                `Made request to ${details.url} with no backend cookies!`
                              )
                          );
                        }
                        break;
                      case "Blacklisted":
                        displayPopup({ type: "page-blacklisted" });
                        break;
                      case "Invalid-certificate":
                        displayPopup({ type: "invalid-certificate" });
                        break;
                      case "Reported":
                        displayPopup({ type: "page-reported" });
                        break;
                      case "Obfuscated":
                        var path = details.url.replace(/^[a-z]+:\/\//, "");
                        chrome.tabs.update(
                          details.tabId,
                          {
                            url: `http://${result.server}/3001/obfuscated/${path}`,
                          },
                          () => console.log("Redirected!")
                        );
                        break;
                    }
                  });
                } else {
                  if (result.backendUp) {
                    chrome.storage.local.set({ backendUp: false });
                  } else {
                    displayPopup({ type: "backend-offline" });
                  }
                }
              }
            );
          });
        }
      );
    });
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

  console.log("Request to " + details.url + " completed!");

  updateOpenedTabs();
  updateCookiePrefferences(details.url);
}

function _OnClosedTabListener(tabId, removeInfo) {
  chrome.storage.local.get(["prefferences", "server"], (result) => {
    var sync_data = {
      prefferences: result.prefferences,
      data: {
        cookies: {},
      },
    };
    if (!removeInfo.isWindowClosing)
      if (result.prefferences.cookies.active)
        if (result.prefferences.cookies.delete_policy === "tab close") {
          closed_tab_platform = opened_tabs[tabId];
          if (closed_tab_platform) {
            delete opened_tabs[tabId];
            if (
              visited_platforms.includes(closed_tab_platform) &&
              result.prefferences.cookies.platforms[closed_tab_platform]
            ) {
              if (Object.values(opened_tabs).includes(closed_tab_platform)) {
                console.log(
                  "There is still a tab opened on platform",
                  closed_tab_platform,
                  opened_tabs
                );
              } else {
                console.log("There is no more tabs opened on this platform");
                console.log("Synchronizing...");
                chrome.cookies.getAll({}, (cookies) => {
                  sync_data.data.cookies[closed_tab_platform] = cookies.filter(
                    (cookie) =>
                      getPlatformFromUrl(cookie.domain) === closed_tab_platform
                  );

                  sendRequest(
                    {
                      server: result.server,
                      route: "/user/sync",
                      body: sync_data,
                    },
                    (res) => {
                      if (res) {
                        removeCookiesForPlatform(closed_tab_platform);
                        visited_platforms = visited_platforms.filter(
                          (platform) => platform !== closed_tab_platform
                        );
                      } else {
                        // ! Redirect to page that says that backend is offline
                        chrome.tabs.create({
                          url: chrome.runtime.getURL(
                            "/pages/blocked/blocked.html"
                          ),
                        });
                      }
                    }
                  );
                });
              }
            }
          }
        }
    //synchronizeUser();
  });
}

function _OnClosedWindowListener(windowId) {
  console.log("You closed window", windowId);

  getBrowserData((data) => {
    chrome.storage.local.get(["server", "prefferences"], (result) => {
      chrome.tabs.query({}, (tabs) => {
        var sync_data = {
          prefferences: result.prefferences,
          data: {
            cookies: {},
            history: {},
          },
        };

        if (result.prefferences.cookies.active) {
          // Get opened tabs platforms
          var new_opened_tabs_platforms = tabs
            .map((tab) => getPlatformFromUrl(tab.url)) // Extract platform from url
            .filter((platform) => platform) // Filter for undefined
            .filter((value, index, self) => self.indexOf(value) === index); // Filter for unique

          // Get tabs platforms before the window close
          var old_opened_tabs_platforms = Object.values(opened_tabs).filter(
            (value, index, self) => self.indexOf(value) === index // Filter for unique
          );

          // Get platforms that have to be synced
          var platforms_to_sync = old_opened_tabs_platforms.filter(
            (platform) =>
              !new_opened_tabs_platforms.includes(platform) &&
              visited_platforms.includes(platform)
          );
          console.log("Platforms_to_sync", platforms_to_sync);

          // Append them to the sync data
          for (platform of platforms_to_sync) {
            if (
              result.prefferences.cookies.platforms[platform] ||
              result.prefferences.cookies.platforms[platform].forced
            ) {
              sync_data.data.cookies[platform] = data.cookies[platform];

              // Remove platfrom from visited platforms
              const index = visited_platforms.indexOf(platform);
              if (index > -1) {
                visited_platforms.splice(index, 1);
              }
            }
          }
        }

        // Update opened tabs state
        console.log("Tabs: ", tabs);
        console.log("Old opened tabs state: ", opened_tabs);
        const tabIds = tabs.map((tab) => tab.id);
        for (var tabId of Object.keys(opened_tabs)) {
          if (!tabIds.includes(parseInt(tabId))) {
            console.log(tabIds, "does not include", tabId);
            delete opened_tabs[tabId];
          }
        }
        console.log("New opened tabs state: ", opened_tabs);

        // Append browsing history to the sync data
        sync_data.data.history.browsing = result.prefferences.history.browsing
          ? data.history.browsing
          : null;

        // Append downloads history to the sync data
        sync_data.data.history.downloads = result.prefferences.history.downloads
          ? data.history.downloads
          : null;

        sendRequest(
          {
            route: "/user/sync",
            server: result.server,
            body: sync_data,
          },
          (res) => {
            ////d/as/d/a/sd/as/d
            if (res) {
              // It means we have closed the last window
              if (tabs.length === 0) {
                chrome.storage.local.set({ logged_in: false }, () => {
                  setListeners(false);
                  setRequestBlocker(true);
                  clearData("all", () =>
                    removeSessionCookie(() => console.log("User logged out!"))
                  );
                });
              } else {
                // Remove browsing history if true
                if (result.prefferences.history.browsing) clearData("browsing");

                // Remove downloads history if true
                if (result.prefferences.history.downloads)
                  clearData("downloads");

                // Remove cookies if any sent
                for (platform of platforms_to_sync) {
                  removeCookiesForPlatform(platform);
                }
              }
            } else {
              // ! Redirect to page that says that backend is offline
              chrome.tabs.create({
                url: chrome.runtime.getURL("/pages/blocked/blocked.html"),
              });
            }
          }
        );
      });
    });
  });
}

function _OnCreatedTabListener(tab) {
  // For history and downloads tabs
  if (
    tab.pendingUrl === "chrome://downloads/" ||
    tab.pendingUrl === "chrome://history/"
  ) {
    console.log("History or downloads opened!");

    chrome.tabs.update(
      tab.id,
      { url: chrome.runtime.getURL("/pages/stats/build/index.html") },
      () => {
        console.log("Updated tab!");
      }
    );
  } else {
    console.log(tab);
    if ("pendingUrl" in tab)
      if (!tab.pendingUrl.startsWith("chrome://"))
        opened_tabs[tab.id] = getPlatformFromUrl(tab.pendingUrl);
  }
}

function _RequestBlocker(details) {
  if (
    details.initiator === "chrome-extension://lgfhjciihpoeejbcfcmehckhpmpkgfbp"
  ) {
    return { cancel: false };
  }
  console.log("_RequestBlocker Triggered");
  displayPopup({ type: "must-login" });
  return { cancel: true };
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
      if (tries === 1 && route === "/request")
        displayPopup({ type: "page-loading" });

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
        // console.log(e);
        await new Promise((r) => setTimeout(r, timeout));
        tries += 1;
      }
    }
    chrome.storage.local.set({ backendUp: false }, () => {
      callback(null);
    });
  });
}

function setHTTPS(status) {
  if (status) {
    console.log("HTTP Redirect Blocker activated!");

    chrome.webRequest.onHeadersReceived.addListener(
      _HTTPRedirectBlocker,
      { urls: ["*://*/*"] },
      ["blocking", "responseHeaders"]
    );
  } else {
    console.log("HTTP Redirect Blocker deactivated!");
    chrome.webRequest.onHeadersReceived.removeListener(_HTTPRedirectBlocker);
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
  // For when window is closed or history/downloads tab is opened

  if (status) {
    console.log("TabsListener activated!");
    chrome.tabs.onRemoved.addListener(_OnClosedTabListener);
    chrome.tabs.onCreated.addListener(_OnCreatedTabListener);
  } else {
    console.log("TabsListener deactivated!");
    chrome.tabs.onRemoved.removeListener(_OnClosedTabListener);
    chrome.tabs.onCreated.removeListener(_OnCreatedTabListener);
  }
}

function setWindowListener(status) {
  if (status) {
    console.log("WindowListener activated!");
    chrome.windows.onRemoved.addListener(_OnClosedWindowListener, {
      windowTypes: ["normal"],
    });
  } else {
    console.log("WindowListener deactivated!");
    chrome.windows.onRemoved.removeListener(_OnClosedWindowListener, {
      windowTypes: ["normal"],
    });
  }
}

function setReportPage(status) {
  if (status) {
    console.log("Report page option activated!");
    chrome.contextMenus.create({
      title: "Report page as malicious!",
      onclick: report_url,
      documentUrlPatterns: ["https://*/*", "http://*/*", "ftp://*/*"],
    });
  } else {
    console.log("Report page option deactivated!");
    chrome.contextMenus.removeAll();
  }
}

function setStorageListener(status) {
  // Listens to changes in the prefferences (especially cookies option)
  if (status) {
    chrome.storage.onChanged.addListener(_StorageListener);
    console.log("Storage listener activated!");
  } else {
    console.log("Storage listener deactivated!");
    chrome.storage.onChanged.removeListener(_StorageListener);
  }
}

function setListeners(status) {
  if (status) {
    console.log("Listeners activated!");
    setHTTPS(true);
    setRequestListener(true);
    setTabsListeners(true);
    setWindowListener(true);
    setReportPage(true);
    setStorageListener(true);
  } else {
    console.log("Listeners deactivated!");
    setHTTPS(false);
    setRequestListener(false);
    setTabsListeners(false);
    setWindowListener(false);
    setReportPage(false);
    setStorageListener(false);
  }
}

function setRequestBlocker(status) {
  if (status) {
    console.log("RequestBlocker activated!");
    chrome.webRequest.onBeforeRequest.addListener(
      _RequestBlocker,
      { urls: ["http://*/*", "https://*/*"] },
      ["blocking"]
    );
  } else {
    console.log("RequestBlocker deactivated!");
    chrome.webRequest.onBeforeRequest.removeListener(_RequestBlocker);
  }
}

function heartbeat() {
  console.log("Heartbeat");
  chrome.storage.local.get(["server"], (res) => {
    const server = res.server;

    console.log("Trying to connect to server...");
    fetch(`http://${server}:3001/heartbeat`, { method: "POST" })
      .then(async (res) => {
        if (res.status === 200) {
          chrome.storage.local.set({ backendUp: true }, () => {
            clearInterval(heartbeatFunctionId);
            heartbeatFunctionId = null;
          });
        }
      })
      .catch((err) => {
        // console.log("heartbeat: ", err);
      });
  });
}

function report_url(data, tab) {
  displayPopup({ type: "report-page" });
}

function setCookies(cookies, callback = () => {}) {
  // Recursively set cookies so that we can call
  // the callback after setting the last cookie

  if (cookies.length === 0) {
    callback();
  } else {
    var cookie = cookies.pop();
    cookie.url = `https://${cookie.domain.replace(/^\./, "")}${cookie.path}`;

    if (cookie.name.startsWith("__Host")) delete cookie.domain;

    delete cookie.session;
    delete cookie.hostOnly;

    console.log("Setting cookie for domain", cookie.domain);
    chrome.cookies.set(cookie, () => setCookies(cookies, callback));
  }
}

function removeCookies(cookies, callback = () => {}) {
  // Recursively remove cookies so that we can call
  // the callback after setting the last cookie

  if (!cookies || cookies.length === 0) {
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

function removeCookiesForPlatform(platform, callback = () => {}) {
  var cookies_to_remove = [];
  console.log("Removing local cookies for platform", platform);
  chrome.cookies.getAll({}, (cookies) => {
    cookies.forEach((cookie) => {
      if (platform === getPlatformFromUrl(cookie.domain)) {
        cookies_to_remove.push(cookie);
      }
    });

    removeCookies(cookies_to_remove, callback);
  });
}

function removeSessionCookie(callback = () => {}) {
  // Removes session cookie
  // Used when logged out

  chrome.storage.local.get("server", (res) => {
    const protocol = "http";
    const server = "localhost";
    const port = "3001";

    chrome.cookies.remove(
      {
        name: "digithrone-session-cookie",
        storeId: "0",
        url: `${protocol}://${server}:${port}`,
      },
      () => {
        console.log("Session cookie removed!");
        callback();
      }
    );
  });
}

function clearData(type, callback = () => {}) {
  switch (type) {
    case "cookies":
      chrome.cookies.getAll({}, (cookies) => {
        // Ignore digithrone-session-cookie
        cookies = cookies.filter(
          (cookie) => cookie.name !== "digithrone-session-cookie"
        );
        removeCookies(cookies, () => {
          console.log("Cookies cleared!");
          callback();
        });
      });
      break;
    case "downloads":
      chrome.browsingData.removeDownloads({}, () => {
        console.log("Downloads history cleared!");
        callback();
      });
      break;
    case "browsing":
      chrome.browsingData.removeHistory({}, () => {
        console.log("Browsing history cleared!");
        callback();
      });
      break;
    case "all":
      clearData("cookies", () => {
        clearData("downloads", () => {
          clearData("browsing", () => {
            callback();
          });
        });
      });
      break;
  }
}

function getPlatformFromUrl(url) {
  // Url should not start with chrome://, etc.
  if (url.search(/^chrome/) !== -1) return undefined;
  if (url.search(/^file:\/\//) !== -1) return undefined;
  if (url.search(/\./) === -1) return undefined;
  if (url.search(/(^https*:\/\/)*([a-zA-Z0-9-]*\.{0,1})*/) === -1)
    return undefined;

  // Remove scheme if any
  url = url.match(/(^https*:\/\/)*([a-zA-Z0-9-]*\.{0,1})*/)[0];
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

function getBrowserData(callback) {
  console.log("Getting browser data...");
  chrome.storage.local.get(["prefferences"], (res) => {
    chrome.cookies.getAll({}, (cookies) => {
      chrome.history.search({ text: "", maxResults: 10000 }, (visits) => {
        chrome.downloads.search({}, (downloads) => {
          var data = {
            cookies: {},
            history: {
              browsing: [],
              downloads: [],
            },
          };

          // Append browsing history
          data.history.browsing = visits.filter((visit) => {
            if (visit.url.search(/^chrome/) !== -1) return false;
            if (visit.url.search(/^file:\/\//) !== -1) return false;
            return true;
          });

          // Append downloads history
          data.history.downloads = downloads;

          // Append cookies
          // Exclude session cookie
          cookies = cookies.filter(
            (cookie) => cookie.name !== "digithrone-session-cookie"
          );
          cookies.forEach((cookie) => {
            let platform = getPlatformFromUrl(cookie.domain);
            if (
              !Object.keys(res.prefferences.cookies.platforms).includes(
                platform
              )
            )
              return;
            if (!(platform in data.cookies)) data.cookies[platform] = [];
            data.cookies[platform].push(cookie);
          });

          console.log("Browser data: ", data);
          callback(data);
        });
      });
    });
  });
}

function updateCookiePrefferences(url, callback = (_) => {}) {
  // Take into account only cookies for the current platform
  // Ignore 3rd party cookies

  chrome.storage.local.get(["prefferences"], (data) => {
    var { new_platforms_policy, platforms } = data.prefferences.cookies;

    chrome.cookies.getAll({ url: url }, (cookies) => {
      if (cookies.length > 0) {
        let platform = getPlatformFromUrl(url);
        if (platform) {
          if (platform in platforms) return;

          platforms[platform] = {
            active: new_platforms_policy === "store" ? true : false,
            domain: cookies[0].domain,
          };
          console.log(
            "Added platform " + platform + " to prefferences. Set it to: ",
            platforms[platform]
          );
        }
      }

      data.prefferences.cookies.platforms = platforms;
      chrome.storage.local.set(data, () => {
        callback(data.prefferences);
      });
    });
  });
}

function updateOpenedTabs() {
  chrome.tabs.query({}, (tabs) => {
    for (var tab of tabs) {
      if (tab.url.search(/^chrome/) !== -1) continue;
      opened_tabs[tab.id] = getPlatformFromUrl(tab.url);
    }
    console.log("Opened tabs: ", opened_tabs);
  });
}

function displayPopup(info) {
  chrome.windows.getCurrent((window) => {
    chrome.tabs.query({ active: true, windowId: window.id }, (tabs) => {
      var activeTab = tabs[0];
      var injectable = activeTab.url.startsWith("chrome") ? false : true;

      switch (info.type) {
        case "page-loading":
          console.log("Displaying that page is loading...");
          if (injectable) {
            chrome.tabs.executeScript(activeTab.id, {
              code: `console.log("Waiting for the page to load..."); document.body.innerHTML = '';`,
            });
          } else {
            chrome.tabs.create({ url: chrome.runtime });
          }
          break;
        case "backend-offline":
          console.log("Displaying page that backend is offline...");
          break;
        case "backend-online":
          console.log("Displaying page that backend is online...");
          break;
        case "must-login":
          console.log("Displaying page that user must login...");
          break;
        case "session-invalid":
          console.log("Displaying page that session is invalid...");
          break;
        case "report-page":
          console.log("Displaying report page...");
          break;
        case "page-blacklisted":
          console.log("Displaying page that is blacklisted...");
          break;
        case "page-reported":
          console.log("Displaying page that is already reported...");
          break;
        case "invalid-certificate":
          console.log("Displaying page that has invalid certificate...");
          break;
        case "no-https":
          console.log("Displaying page that has no https variant...");
          break;
      }
    });
  });
}

chrome.downloads.onCreated.addListener((downloadItem) => {
  // Pause the download and send a request to the backend so
  // it can be checked
  // Remove item from history after it is complete
});

// chrome.history.onVisited.addListener((historyItem) => {
//   // console.log("History listener", historyItem);
// });

// chrome.tabs.onActivated.addListener((activeInfo) => {
//   // console.log("You are on tab ", activeInfo.tabId);
// });

chrome.runtime.onInstalled.addListener((reason) => {
  //Tutorial;
  console.log("Extension installed!");
  // if (reason === chrome.runtime.OnInstalledReason.INSTALL) {
  //   chrome.tabs.create({
  //     url: "onboarding.html",
  //   });
  // }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.action) {
    case "LoggedIn": {
      visited_platforms = [];
      setRequestBlocker(false);
      clearData("all", () => setListeners(true));
      updateOpenedTabs();
      break;
    }
    case "LoggedOut": {
      setListeners(false);
      setRequestBlocker(true);
      clearData("all", () =>
        removeSessionCookie(() => console.log("User logged out!"))
      );
      break;
    }
  }
});
