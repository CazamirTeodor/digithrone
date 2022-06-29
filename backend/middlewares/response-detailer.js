"use strict";

const https = require("https");
const validator = require("validator");
const { getDatabase } = require("../middlewares/database");

const getSSLCertificateInfo = (host) => {
  if (!validator.isFQDN(host)) {
    return Promise.reject(new Error("Invalid host."));
  }
  const options = {
    method: "HEAD",
    port: 443,
    rejectUnauthorized: true,
    hostname: host,
    requestCert: true,
    agent: new https.Agent({
      maxCachedSessions: 0,
    }),
  };

  return new Promise((resolve, reject) => {
    try {
      const req = https.request(options);
      req
        .on("response", (res) => {
          resolve({
            contentType: res.headers["content-type"],
            certificate: res.socket.getPeerCertificate(),
          });
        })
        .on("error", reject);
      req.end();
    } catch (e) {
      console.log("e: ", e);
      reject();
    }
  });
};

const getResponseDetails = async (hostname) => {
  var details = {
    validCertificate: false,
  };
  try {
    await getSSLCertificateInfo(hostname)
      .then(async (res) => {
        details.contentType = res.contentType;
        details.certificateInfo = {
          valid: true,
          issuer: res.certificate.issuer.O,
          type: getCertType(res.certificate.subject),
          isQWAC: await isQWAC(res.certificate.issuer),
        };
      })
      .catch((e) => {
        console.log("Invalid certificate: ", e);
        details.validCertificate = false;
      });
  } catch (err) {
    console.log("Invalid certificate: ", e);
    details.validCertificate = false;
  }
  return details;
};

const isQWAC = async (issuer) => {
  const db = await getDatabase();
  const issuer_data = await db.collection("trusted_service_providers").findOne({
    name: { $regex: issuer.O, $options: "i" },
    serviceName: { $regex: issuer.CN, $options: "i" },
  });

  if (issuer_data) return true;
  return false;
};

const getCertType = (subject) => {
  var fields_nb = Object.keys(subject).length;

  if ("CN" in subject && fields_nb === 1) return "Domain Validated";
  if ("O" in subject && fields_nb === 2) return "Organisation Validated";
  if ("CN" in subject && "O" in subject && fields_nb > 2)
    return "Extended Validation";

  return "UNKNOWN";
};

module.exports = {
  getResponseDetails,
};
