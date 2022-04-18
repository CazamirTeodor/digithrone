/*global chrome*/

var data = {};

function setCookies(cookies, status) {
  Object.keys(cookies).forEach((platform) => {
    if (status) {
      cookies[platform].cookies.forEach((value) => {
        // Here 'value' is the whole cookie string. We have to split it
        var fields = value.split(";");
        if (chrome.cookies !== undefined) {
          chrome.cookies.set(
            {
              domain: fields[0],
              expirationDate: parseInt(fields[1]),
              httpOnly: Boolean(fields[2]),
              name: fields[3],
              path: fields[4],
              sameSite: fields[5],
              secure: Boolean(fields[6]),
              value: fields[7],
              url: fields[8],
            },
            (cookie) => console.log(cookie)
          );
        } else {
          data.cookies[platform][value] = true;
        }
      });
    } else {
      Object.keys(cookies).forEach((platform) => {
        cookies[platform].cookies.forEach((value) => {
          // Here 'value' is the whole cookie string. We have to split it
          var fields = value.split(";");
          if (chrome.cookies !== undefined) {
            chrome.cookies.remove({
              name: fields[3],
              url: fields[8],
            });
          } else {
            data.cookies[platform][value] = false;
          }
        });
      });
    }
  });
}

function getData(keys, callback) {
  if (chrome.storage) {
    chrome.storage.local.get(keys, (result) => callback(result));
  } else {
    callback(data);
  }
}

function setData(items, callback) {
  if (chrome.storage) {
    chrome.storage.local.set(items, callback);
  } else {
    for (const key of Object.keys(items)) {
      data[key] = items[key];
    }
  }
}

function parseCookie(cookie) {
  let fields = cookie.domain.split(".");
  var host;

  if (fields.slice(-2).join(".") === "co.uk") {
    host = fields[fields.length - 3];
  } else {
    host = fields[fields.length - 2];
  }

  return {
    host: host,
    tld: fields[fields.length - 1],
    domain: fields.join("."),
  };
}

function getCookies(callback) {
  if (chrome.cookies) {
    //chrome.cookies.getAllCookieStores((result) => console.log('All Cookie Stores: ', result));
    chrome.cookies.getAll({ storeId: "0" }, (result) => callback(result));
  } else {
    callback([{ domain: "google.com", enabled: false }]);
  }
}

function getCookie(name, url, callback) {
  chrome?.cookies.get({ name: name, url: url }, (cookie) => {
    callback(cookie);
  });
}


// function getSessionCookie(callback) {
//   getData(['server'], (data) => {
//     const port = 3001;
//     const server = data.server;
//     const scheme = "http";

//     getCookie(
//       "digithrone-auth-cookie",
//       `${scheme}://${server}:${port}`,
//       (cookie) => callback(cookie)
//     );
//   });
//}

function sendMessage(message, callback) {
  chrome?.runtime.sendMessage(message, callback);
}

// Sends request to the backend server
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
  getData(['server'], async (data) => {
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
            callback(res);
            return;
          default:
            console.log("Trying...");
            tries += 1;
        }
      } catch (e) {
        clearTimeout(id);
        console.log("Trying...");
        //console.log(e);
        await new Promise((r) => setTimeout(r, timeout));
        tries += 1;
      }
    }
    callback(null);
  });
}

export {
  getCookies,
  getCookie,
  setCookies,
  parseCookie,
  getData,
  setData,
  sendMessage,
  sendRequest,
};
