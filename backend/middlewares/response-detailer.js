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
          console.log("Res cert is");
          resolve(res);
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
        const cert = res.connection.getPeerCertificate();
        details.contentType = res.headers["content-type"];
        details.certificateSubject = cert ? cert.subject : null;
        details.certificateIssuer = cert ? cert.issuer : null;
        details.validCertificate = true;
        await getIssuerInfo(details.certificateIssuer);
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

const getIssuerInfo = async (issuer) => {
  const db = await getDatabase();
  const issuer_data = await db.collection("trusted_service_providers").findOne({
    name: { $regex: issuer.O, $options: "i" },
    serviceName: { $regex: issuer.CN, $options: "i" },
  });
  console.log("Issuer data: ", issuer_data);
};

const getCertType = (subject) => {};

module.exports = {
  getResponseDetails,
};
