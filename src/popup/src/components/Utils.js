/*global chrome*/

var data = {
  logged_in: true,
  active: true,
  name: "C. Teodor",
  backendUp: true,
  server: "localhost",
  prefferences: {
    cookies: {
      Linkedin: {
        active: true,
        domain: "linkedin.com",
        force: true,
      },
      Google: {
        active: true,
        domain: "google.com",
      },
      dasdasd: {
        active: true,
        domain: "google.com",
      },
      asddasd: {
        active: true,
        domain: "google.com",
      },
      dddsadasd: {
        active: true,
        domain: "google.com",
      },
      dasdasdasd: {
        active: true,
        domain: "google.com",
      },
      Googldddsade: {
        active: true,
        domain: "google.com",
      },
      Googld23ddsade: {
        active: true,
        domain: "google.com",
      },
      Googlddd13sade: {
        active: true,
        domain: "google.com",
      },
      Googld2ddsade: {
        active: true,
        domain: "google.com",
      },
      Googl4dddsade: {
        active: true,
        domain: "google.com",
      },
      Goog2ldddsade: {
        active: true,
        domain: "google.com",
      },
      Googldd2dsade: {
        active: true,
        domain: "google.com",
      },
      Googld3ddsade: {
        active: true,
        domain: "google.com",
      },
    },
    history: {
      browsing: true,
      downloads: true,
    },
  },
};

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
    const selected = {};
    for (var key of keys) {
      selected[key] = data[key];
    }
    callback(selected);
  }
}

function setData(items, callback) {
  if (chrome.storage) {
    chrome.storage.local.set(items, callback);
  } else {
    for (const key of Object.keys(items)) {
      data[key] = items[key];
      callback();
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
    var cookies = [
      {
        domain: ".linkedin.com",
        hostOnly: false,
        httpOnly: false,
        name: "AMCVS_14215E3D5995C57C0A495C55%40AdobeOrg",
        path: "/",
        sameSite: "unspecified",
        secure: false,
        session: true,
        storeId: "0",
        value: "1",
      },
      {
        domain: ".linkedin.com",
        hostOnly: false,
        httpOnly: false,
        name: "lang",
        path: "/",
        sameSite: "no_restriction",
        secure: true,
        session: true,
        storeId: "0",
        value: "v=2&lang=en-us",
      },
      {
        domain: ".linkedin.com",
        expirationDate: 1655010330,
        hostOnly: false,
        httpOnly: false,
        name: "aam_uuid",
        path: "/",
        sameSite: "unspecified",
        secure: false,
        session: false,
        storeId: "0",
        value: "19388084261586386624514870823537348650",
      },
      {
        domain: ".linkedin.com",
        expirationDate: 1667970307,
        hostOnly: false,
        httpOnly: false,
        name: "AMCV_14215E3D5995C57C0A495C55%40AdobeOrg",
        path: "/",
        sameSite: "unspecified",
        secure: false,
        session: false,
        storeId: "0",
        value:
          "-637568504%7CMCIDTS%7C19126%7CMCMID%7C18845197804226942854496602521787884513%7CMCAAMLH-1653023107%7C6%7CMCAAMB-1653023107%7C6G1ynYcLPuiQxYZrsz_pkqfLG9yMXBpb2zX5dvJdYQJzPXImdj0y%7CMCOPTOUT-1652425507s%7CNONE%7CMCCIDH%7C-668467861%7CvVersion%7C5.1.1",
      },
      {
        domain: ".www.linkedin.com",
        expirationDate: 1667973929,
        hostOnly: false,
        httpOnly: false,
        name: "li_theme_set",
        path: "/",
        sameSite: "unspecified",
        secure: true,
        session: false,
        storeId: "0",
        value: "app",
      },
      {
        domain: ".www.linkedin.com",
        expirationDate: 1667973929,
        hostOnly: false,
        httpOnly: false,
        name: "li_theme",
        path: "/",
        sameSite: "unspecified",
        secure: true,
        session: false,
        storeId: "0",
        value: "light",
      },
      {
        domain: ".www.linkedin.com",
        expirationDate: 1653627929,
        hostOnly: false,
        httpOnly: false,
        name: "timezone",
        path: "/",
        sameSite: "unspecified",
        secure: true,
        session: false,
        storeId: "0",
        value: "Europe/Bucharest",
      },
      {
        domain: ".linkedin.com",
        expirationDate: 1652452833.966135,
        hostOnly: false,
        httpOnly: false,
        name: "lidc",
        path: "/",
        sameSite: "no_restriction",
        secure: true,
        session: false,
        storeId: "0",
        value:
          '"b=VB68:s=V:r=V:a=V:p=V:g=2904:u=288:x=1:i=1652418302:t=1652452833:v=2:sig=AQEVFDms7JAW5NLxShSJeTxhi0tew_-D"',
      },
      {
        domain: ".linkedin.com",
        expirationDate: 1715465631.966029,
        hostOnly: false,
        httpOnly: false,
        name: "li_mc",
        path: "/",
        sameSite: "no_restriction",
        secure: true,
        session: false,
        storeId: "0",
        value:
          "MTsyMTsxNjUyNDE4MzAyOzI7MDIxpDIqYwmFc8evywXnv7neU37Bx+JCrWWbogBhD76853M=",
      },
      {
        domain: ".www.linkedin.com",
        expirationDate: 1660194302.45603,
        hostOnly: false,
        httpOnly: false,
        name: "JSESSIONID",
        path: "/",
        sameSite: "no_restriction",
        secure: true,
        session: false,
        storeId: "0",
        value: '"ajax:3668356693162711009"',
      },
      {
        domain: ".www.linkedin.com",
        expirationDate: 1683954302.455983,
        hostOnly: false,
        httpOnly: true,
        name: "li_at",
        path: "/",
        sameSite: "no_restriction",
        secure: true,
        session: false,
        storeId: "0",
        value:
          "AQEDASImLrQDQYf2AAABgLvOUT4AAAGA39rVPk4APsTfr_xCNAva3Q3GtnmIU6WRsNnffCAgxkJSUi6f9wyt4ws0L8VpFwJGIjqkKe8kn77rt4Gs_-dCUg9Sw7KgzT4k9DrUvgmv_LdQXAqZM4hoEwtr",
      },
      {
        domain: ".linkedin.com",
        expirationDate: 1660194302.455923,
        hostOnly: false,
        httpOnly: false,
        name: "liap",
        path: "/",
        sameSite: "no_restriction",
        secure: true,
        session: false,
        storeId: "0",
        value: "true",
      },
      {
        domain: ".www.linkedin.com",
        expirationDate: 1715490285,
        hostOnly: false,
        httpOnly: false,
        name: "G_ENABLED_IDPS",
        path: "/",
        sameSite: "unspecified",
        secure: false,
        session: false,
        storeId: "0",
        value: "google",
      },
      {
        domain: ".www.linkedin.com",
        expirationDate: 1683954285,
        hostOnly: false,
        httpOnly: false,
        name: "li_alerts",
        path: "/",
        sameSite: "no_restriction",
        secure: true,
        session: false,
        storeId: "0",
        value: "e30=",
      },
      {
        domain: ".ads.linkedin.com",
        hostOnly: false,
        httpOnly: false,
        name: "lang",
        path: "/",
        sameSite: "no_restriction",
        secure: true,
        session: true,
        storeId: "0",
        value: "v=2&lang=en-us",
      },
      {
        domain: ".linkedin.com",
        expirationDate: 1715326214.055368,
        hostOnly: false,
        httpOnly: false,
        name: "bcookie",
        path: "/",
        sameSite: "no_restriction",
        secure: true,
        session: false,
        storeId: "0",
        value: '"v=2&3dd7e27d-5a51-4dca-848f-806b1d76d68f"',
      },
      {
        domain: ".linkedin.com",
        expirationDate: 1714591191.055392,
        hostOnly: false,
        httpOnly: false,
        name: "li_gc",
        path: "/",
        sameSite: "no_restriction",
        secure: true,
        session: false,
        storeId: "0",
        value:
          "MTswOzE2NTIyMTIzNjE7MjswMjGboBEUK5/N631g/AMvBpGzu8p9AUqzJZ3W2C2rMwtekQ==",
      },
      {
        domain: ".www.linkedin.com",
        expirationDate: 1715326436.336187,
        hostOnly: false,
        httpOnly: true,
        name: "bscookie",
        path: "/",
        sameSite: "no_restriction",
        secure: true,
        session: false,
        storeId: "0",
        value:
          '"v=1&2022051019562497aaa6a7-563f-448a-8103-45cd651b0347AQHej5NdLWKeh_-v4N6g34Co_vOBZvkP"',
      },
    ];
    callback(cookies);
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
  getData(["server"], async (data) => {
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
