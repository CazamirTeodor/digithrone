var heartbeatFunctionId;
setRequestBlocker(true);

function _HTTPSListenerRequest(details) {
  //console.log("_HTTPSListenerRequest Triggered ", details);
  if (
    details.initiator === "chrome-extension://lgfhjciihpoeejbcfcmehckhpmpkgfbp"
  )
    return;
  return { redirectUrl: details.url.replace("http://", "https://") };
}

function _HTTPSListenerRedirect(details) {
  //console.log("_HTTPSListenerRedirect Triggered ", details);
  if (
    details.redirectUrl === "javascript:" ||
    details.initiator === "chrome-extension://lgfhjciihpoeejbcfcmehckhpmpkgfbp"
  )
    return;

  if (details.redirectUrl.search(/^http:\/\//) != -1) {
    return { redirectUrl: details.url.replace("http://", "https://") };
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

  // When user logs out
  if (data?.logged_in?.newValue === false && data?.logged_in?.oldValue === true) {
    console.log("User logged out!");
    //synchronizeUser();
  }

  // When user enables/disables an option
  if (data.prefferences) {
    console.log(data);

    if (
      data.prefferences.oldValue.cookies.active !==
      data.prefferences.newValue.cookies.active
    ) {
      console.log("Cookies set to:", data.prefferences.newValue.cookies.active);
      if (data.prefferences.newValue.cookies.active) clearData("cookies");
      else {
        getBrowserData((data) => {
          chrome.storage.local.get(["server", "prefferences"], (res) => {
            if (res.server) {
              var cookies = [];
              Object.keys(res.prefferences.cookies.platforms).forEach(
                (platform) => {
                  if (
                    res.prefferences.cookies.platforms[platform].active ||
                    res.prefferences.cookies.platforms[platform].forced
                  ) {
                    cookies.push(data.cookies[platform]);
                  }
                }
              );
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
                  if (res) clearData("cookies"); // ! Should be changed to clear only sent cookies
                }
              );
            }
          });
        });
      }
    }

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
  if (
    details.initiator ==
      "chrome-extension://lgfhjciihpoeejbcfcmehckhpmpkgfbp" ||
    details.url.startsWith(
      "chrome-extension://lgfhjciihpoeejbcfcmehckhpmpkgfbp"
    ) ||
    details.method !== "GET"
  )
    return {};

  console.log("Request to " + details.url + " started!");

  chrome.tabs.query({}, (tabs) => {
    chrome.storage.local.get(["server", "prefferences"], (result) => {
      console.log("This is from the storage: ", result);
      getBrowserData((data) => {
        var sync_data = {
          prefferences: result.prefferences,
          data: {
            cookies: {},
            history: {},
          },
        };

        let platforms = result.prefferences.cookies.platforms; // Create a copy

        // Append forced cookies (START)
        let forced_platforms = Object.keys(
          result.prefferences.cookies.platforms
        )
          .map((platform) => {
            if (result.prefferences.cookies.platforms[platform].forced) {
              delete platforms[platform];
              sync_data.data.cookies[platform] = data.cookies[platform];
              return platform;
            }
          })
          .filter((platform) => platform);
        // Append forced cookies (END)

        // Verify if cookies is active and append those cookies
        // Make sure to also append cookies of the active platform
        // if the next platform is different and no opened tabs for this
        // platform are open
        if (result.prefferences.cookies.active) {
          var active_platforms,
            disabled_platforms,
            opened_tabs_platforms,
            current_tab_platform,
            next_request_platform;

          active_platforms = Object.keys(result.prefferences.cookies.platforms)
            .map((platform) => {
              if (result.prefferences.cookies.platforms[platform].active) {
                delete platforms[platform];
                return platform;
              }
            })
            .filter((platform) => platform);

          disabled_platforms = platforms; // Because we removed forced and active platforms

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

          // console.log("Forced platforms:", forced_platforms);
          // console.log("Active platforms:", active_platforms);
          // console.log("Disabled platforms:", disabled_platforms);
          // console.log("Opened tabs platforms:", opened_tabs_platforms);
          // console.log("Current tab platform:", current_tab_platform);
          // console.log("Next request platform:", next_request_platform);
        }

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
        console.log("Appending synchronization data to request: ", sync_data);
        sendRequest(
          { server: result.server, route: "/request", body: details },
          (res) => {
            if (res) {
              let cookies_to_remove = [];
              Object.keys(sync_data.data.cookies).forEach((platform) => {
                cookies_to_remove = cookies_to_remove.concat(
                  sync_data.data.cookies[platform]
                );
              });

              if (cookies_to_remove.length > 0)
                console.log("Should remove cookies: ", cookies_to_remove);
              else console.log("No cookies to remove.");
              removeCookies(cookies_to_remove, () => {
                if (details.sync_data.data.history.browsing !== {})
                  clearData("browsing");

                if (details.sync_data.data.history.downloads !== {})
                  clearData("downloads");

                console.log("Received response from backend: ", res);
                switch (res.status) {
                  case "Allow":
                    let platform = getPlatformFromUrl(details.url);
                    if ("cookies" in res) {
                      getBrowserData((data) => {
                        if (data.cookies[platform].length === 0) {
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
                      chrome.tabs.update(
                        details.tabId,
                        { url: details.url },
                        () => {
                          console.log(
                            "Made request to " +
                              details.url +
                              " with no backend cookies!"
                          );
                        }
                      );
                    }
                    break;
                  case "Deny":
                    chrome.tabs.update(
                      details.tabId,
                      {
                        url: chrome.runtime.getURL(
                          "/pages/blocked/blocked.html"
                        ),
                      },
                      () => console.log("Redirected!")
                    );
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
  updateCookiePrefferences();
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

  synchronizeUser();
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
  }
}

function _RequestBlocker(details) {
  if (
    details.initiator === "chrome-extension://lgfhjciihpoeejbcfcmehckhpmpkgfbp"
  ) {
    return { cancel: false };
  }
  console.log("_RequestBlocker Triggered");
  console.log("Please log in to make requests!");
  console.log(details);
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
    chrome.storage.local.set({ backendUp: false }, () => {
      heartbeatFunctionId = setInterval(heartbeat, 5000);
      callback(null);
    });
  });
}

function setHTTPS(status) {
  if (status) {
    console.log("HTTPS Listener activated!");

    chrome.webRequest.onBeforeRequest.addListener(
      _HTTPSListenerRequest,
      { urls: ["http://*/*"] },
      ["blocking"]
    );

    chrome.webRequest.onBeforeRedirect.addListener(
      _HTTPSListenerRedirect,
      { urls: ["*://*/*"] },
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
    setReportPage(true);
    setStorageListener(true);
  } else {
    console.log("Listeners deactivated!");
    setHTTPS(false);
    setRequestListener(false);
    setTabsListeners(false);
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

    fetch(`http://${server}:3001/heartbeat`, { method: "POST" })
      .then(async (res) => {
        if (res.status === 200) {
          chrome.storage.local.set({ backendUp: true }, () => {
            clearInterval(heartbeatFunctionId);
            heartbeatFunctionId = null;
            console.log("Backend went online!");
          });
        }
      })
      .catch((err) => {
        console.log("heartbeat: ", err);
      });
  });
}

function report_url(data, tab) {
  chrome.tabs.executeScript(
    tab.id,
    {
      file: "report.js",
    },
    () => {
      console.log("Code injected!");
    }
  );
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
        url: `${protocol}://${server}:3001`,
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
          if (!(platform in data.cookies)) data.cookies[platform] = [];
          data.cookies[platform].push(cookie);
        });

        // if (prefferences.cookies.active) {
        //   console.log("Adding cookies to synchronization data...");
        //   let prefferences_active_platforms = Object.keys(
        //     prefferences.cookies.platforms
        //   )
        //     .map((platform) => {
        //       if (prefferences.cookies.platforms[platform]["active"])
        //         return platform;
        //     })
        //     .filter((platform) => platform !== undefined);
        //   console.log("Active platforms:", prefferences_active_platforms);

        //   let opened_tabs_platforms = [
        //     ...new Set(
        //       openedTabs
        //         .map((tab) => {
        //           let platform = getPlatformFromUrl(tab.url);
        //           return platform;
        //         })
        //         .filter((platform) => platform !== undefined)
        //     ),
        //   ];
        //   console.log("Opened tabs platforms:", opened_tabs_platforms);

        //   let platforms_to_attach = prefferences_active_platforms.filter(
        //     (platform) =>
        //       !opened_tabs_platforms.includes(platform) &&
        //       prefferences.cookies.platforms[platform]["active"]
        //   );
        //   console.log("Platforms to attach:", platforms_to_attach);

        //   cookies.forEach((cookie) => {
        //     let platform = getPlatformFromUrl(cookie.domain);

        //     if (opened_tabs_platforms.includes(platform)) {
        //       if (!(platform in sync_data.data.cookies))
        //         sync_data.data.cookies[platform] = [];
        //       sync_data.data.cookies[platform].push(cookie);
        //       return;
        //     }
        //     if (platforms_to_attach.includes(platform)) {
        //       if (!sync_data.data.cookies[platform])
        //         sync_data.data.cookies[platform] = [];
        //       sync_data.data.cookies[platform].push(cookie);
        //     }
        //   });
        //   console.log(
        //     "Appended cookies to synchronization data. ",
        //     sync_data.data.cookies
        //   );
        // }

        console.log("Browser data: ", data);
        callback(data);
      });
    });
  });
}

function handleLogout(callback = () => {}) {
  getBrowserData((data) => {
    console.log("Logging user out...");
    chrome.storage.local.get(["server", "prefferences"], (res) => {
      const server = res.server;

      var sync_data = {
        prefferences: res.prefferences,
        data: {
          cookies: {},
          history: {
            browsing: [],
            downloads: [],
          },
        },
      };

      // Append forced cookies
      Object.keys(res.prefferences.cookies.platforms).forEach((platform) => {
        if (res.prefferences.cookies.platforms[platform].forced) {
          sync_data.data.cookies[platform] = data.cookies.platforms[platform];
        }
      });

      // Append active platforms cookies
      if (res.prefferences.cookies.active) {
        Object.keys(res.prefferences.cookies.platforms).forEach((platform) => {
          if (
            res.prefferences.cookies.platforms[platform].active &&
            !res.prefferences.cookies.platforms[platform].forced
          ) {
            sync_data.data.cookies[platform] = data.cookies.platforms[platform];
          }
        });
      }

      // Apend browsing history
      if (res.prefferences.history.browsing) {
        sync_data.data.history.browsing = data.history.browsing;
      }

      // Append downloads history
      if (res.prefferences.history.downloads) {
        sync_data.data.history.downloads = data.history.downloads;
      }

      sendRequest(
        { server: server, route: "/user/sync", body: sync_data },
        (res) => {
          if (res) {
            console.log("Sent synchronization data:", sync_data);

            setListeners(false);
            setRequestBlocker(true);
            clearData("all", () =>
              removeSessionCookie(() => {
                console.log("User logged out!");
                callback();
              })
            );
          } else {
            console.log("Logging out failed!");
          }
        }
      );
    });
  });
}

function updateCookiePrefferences(callback = (_) => {}) {
  // Take into account every new platform

  chrome.storage.local.get(["prefferences"], (data) => {
    var { new_platforms_policy, platforms } = data.prefferences.cookies;

    chrome.cookies.getAll({}, (cookies) => {
      cookies.forEach((cookie) => {
        let platform = getPlatformFromUrl(cookie.domain);
        if (platform) {
          if (platform in platforms) return;

          platforms[platform] = {
            active: new_platforms_policy === "store" ? true : false,
            domain: cookie.domain,
          };
          console.log(
            "Added platform " + platform + " to prefferences. Set it to: ",
            platforms[platform]
          );
        }
      });
      data.prefferences.cookies.platforms = platforms;
      chrome.storage.local.set(data, () => {
        callback(data.prefferences);
      });
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
      setRequestBlocker(false);
      clearData("all", () => setListeners(true));
      break;
    }
    case "LoggedOut": {
      handleLogout();
      break;
    }
  }
});
