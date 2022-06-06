"use strict";

const https = require("https");
const validator = require("validator");

const getSSLCertificateInfo = (host) => {
  if (!validator.isFQDN(host)) {
    return Promise.reject(new Error("Invalid host."));
  }
  const options = {
    method: "HEAD",
    port: 443,
    rejectUnauthorized: true,
    hostname: host,
  };

  return new Promise((resolve, reject) => {
    try {
      const req = https.request(options, (res) => {
        resolve();
      });
      req.on("error", reject);
      req.end();
    } catch (e) {
      reject();
    }
  });
};

const checkCertificateValidity = async (hostname) => {
    var valid = false;
  try {
    await getSSLCertificateInfo(hostname)
      .then(() => {
          valid = true;
      })
      .catch(() => {
          valid = false;
      });
  } catch (err) {
    valid = false;
  }
  return valid;
};

module.exports = {
    checkCertificateValidity,
}
