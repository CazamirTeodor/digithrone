const { v1: uuidv1 } = require("uuid");
const fs = require("fs");
const fetch = require("node-fetch");
const { MongoClient, ServerApiVersion } = require("mongodb");

async function getDatabase() {
  const uri = "mongodb://localhost:27017/";
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();
  const db = client.db("digithrone");
  return db;
}

async function getUser(email) {
  const database = await getDatabase();
  return database
    .collection("users")
    .findOne({ email }, { projection: { _id: 0 } });
}

async function generateSession(email) {
  const database = await getDatabase();
  const existing_uuid = await database
    .collection("sessions")
    .find({ user: email });

  var uuid = uuidv1();
  if (existing_uuid) {
    while (uuid in existing_uuid) {
      uuid = uuidv1();
    }
    console.log("New session generated: ", uuid);
    await database
      .collection("sessions")
      .updateOne({ user: email }, { $set: { value: uuid } });
  } else {
    await database
      .collection("sessions")
      .insertOne({ user: email, value: uuid });
  }
  return uuid;
}

async function validateCredentials(email, password) {
  console.log(`${email} is trying to log in...`);

  const database = await getDatabase();
  const user = await database.collection("users").findOne({ email });
  if (user) {
    if (user.pass === password) {
      console.log(`Succes!`);
      return true;
    }
  }
  console.log(`Failed!`);
  return false;
}

// Returns the user's id if session is valid
async function validateSession(session_cookie) {
  let decoded_cookie = Buffer.from(session_cookie, "base64").toString("ascii");
  let parts = decoded_cookie.split(":");
  const [UserID, SessionUUID] = parts;

  const database = await getDatabase();
  const session = await database.collection("sessions").findOne({
    user: UserID,
    value: SessionUUID,
  });
  if (session) {
    return UserID;
  }
  return null;
}

// Checks if the provided session exists and returns the id of the user
// making the request (pass it in res.locals)
// OBS: Used as a middleware
async function authenticate(req, res, next) {
  if (req.cookies["digithrone-session-cookie"]) {
    let user = await validateSession(req.cookies["digithrone-session-cookie"]);

    if (user) {
      res.locals.user = user;
      next();
    } else {
      res.send({
        message: "Session cookie is not valid! Please reauthenticate!",
      });
    }
  } else {
    res.send({ message: "No session cookie provided!" });
  }
}

async function isBlacklisted(domain) {
  const database = await getDatabase();
  var entry = await database
    .collection("blackweb")
    .findOne({ domain: { $regex: domain } });

  if (entry) return true;
  return false;
}

async function isReported(domain, user) {
  const database = await getDatabase();
  var entry = await database
    .collection("reports")
    .findOne({ domain: domain, reporter: user });

  if (entry) return true;
  return false;
}

async function getCookies(user, platform) {
  const user_from_database = await getUser(user);
  try {
    if (user_from_database) {
      platform = platform.charAt(0).toUpperCase() + platform.slice(1);
      if (!user_from_database.data.cookies)
        user_from_database.data.cookies = {};

      if (platform in user_from_database.data.cookies)
        if (
          user_from_database.prefferences.cookies.platforms[platform].active
        ) {
          return user_from_database.data.cookies[platform];
        }
    }
  } catch (exc) {
    console.log("getCookies: ", exc, platform);
  }
  return null;
}

async function synchronizeUser(user, sync_data) {
  console.log("Synchronizing user...");
  const user_data = await getUser(user);
  // console.log(sync_data);

  user_data.prefferences = sync_data.prefferences;

  let new_history_browsing = sync_data?.data?.history?.browsing;
  let new_history_downloads = sync_data?.data?.history?.downloads;

  if (sync_data?.data?.cookies)
    var new_cookies_platforms = Object.keys(sync_data.data.cookies);

  if (new_cookies_platforms)
    for (let platf of new_cookies_platforms) {
      if (!user_data.data.cookies) user_data.data.cookies = {};

      user_data.data.cookies[platf] = sync_data.data.cookies[platf];
      console.log(
        "Synchronized cookies for platform:",
        platf,
        user_data.data.cookies[platf].length,
        "cookies"
      );
      // if (
      //   !(platf in user_data.data.cookies) ||
      //   user_data.data.cookies[platf].length == 0
      // ) {
      //   user_data.data.cookies[platf] = sync_data.data.cookies[platf];
      //   console.log("One platform with cookies added: ", platf);
      // } else {
      //   for (new_cookie of sync_data.data.cookies[platf]) {
      //     let unique = true;
      //     for (old_cookie of user_data.data.cookies[platf]) {
      //       if (
      //         old_cookie.name === new_cookie.name &&
      //         old_cookie.domain === new_cookie.domain
      //       ) {
      //         if (old_cookie?.expirationDate < new_cookie?.expirationDate) {
      //           let index = user_data.data.cookies[platf].indexOf(old_cookie);
      //           user_data.data.cookies[platf][index] = new_cookie;
      //           console.log(
      //             "One cookie updated:\t",
      //             new_cookie.name,
      //             "\t----->\t",
      //             new_cookie.value.slice(0, 10) + "..."
      //           );
      //         }
      //         unique = false;
      //         break;
      //       }
      //     }
      //     if (unique) {
      //       user_data.data.cookies[platf].push(new_cookie);
      //       console.log(
      //         "One cookie added:\t",
      //         new_cookie.name,
      //         "\t----->\t",
      //         new_cookie.value
      //       );
      //     }
      //   }
      // }
    }

  // Insert new history browsing in the database if it doesn't exist, based on timestamp
  if (!user_data.data.history.browsing) user_data.data.history.browsing = [];
  if (new_history_browsing) {
    for (let new_item of new_history_browsing) {
      if (
        user_data.data.history.browsing.find(
          (item) => item.lastVisitTime === new_item.lastVisitTime
        ) ||
        new_item.url === "https://blank.org/"
      ) {
        continue;
      } else {
        user_data.data.history.browsing.push(new_item);
      }
    }
  }

  // Insert new history browsing in the database if it doesn't exist, based on timestamp
  if (!user_data.data.history.downloads) user_data.data.history.downloads = [];
  if (new_history_downloads) {
    for (let new_item of new_history_downloads) {
      if (
        user_data.data.history.downloads.find(
          (item) => item.startTime === new_item.startTime
        )
      ) {
        continue;
      } else {
        user_data.data.history.downloads.push(new_item);
      }
    }
  }
  const database = await getDatabase();
  await database.collection("users").replaceOne({ email: user }, user_data);

  console.log("User synchronized!");
}

async function addBlockedVisit(email, url) {
  let database = await getDatabase();
  let user = await getUser(email);
  user.data.history.browsing.push({
    lastVisitTime: Date.now(),
    url: url,
    title: "Blocked website",
    canceled: true,
  });
  await database.collection("users").replaceOne({ email: email }, user);
}

async function addReport(user, reportData) {
  const database = await getDatabase();
  reportData.reporter = user;
  var existing_report = await database
    .collection("reports")
    .findOne({ domain: reportData.domain, reporter: reportData.user });
  if (existing_report) {
    reportData.id = existing_report.id;
    await database
      .collection("reports")
      .replaceOne(
        { domain: reportData.domain, reporter: reportData.user },
        reportData
      );
    console.log("Report updated!", reportData);
  } else {
    console.log("Added new report", reportData);
    reportData.id = await database.collection("reports").insertOne(reportData);
  }
}

async function cancelReport(user, domain) {
  const database = await getDatabase();
  console.log("Deleting report for domain: ", domain, user);
  var info = await database
    .collection("reports")
    .deleteOne({ domain: domain, reporter: user });

  if (info.deletedCount > 0) console.log("Report canceled!");
  else console.log("Error happened during deletion!");
}

async function updateTSP() {
  const db = await getDatabase();
  var data = [];
  fetch(
    "https://esignature.ec.europa.eu/efda/tl-browser/api/v1/search/tsp_list"
  )
    .then((res) => res.json())
    .then((json) => {
      for (const tsp of json) {
        tsp.services.forEach((service) =>
          data.push({
            name: tsp.name,
            serviceName: service.serviceName,
            qServiceTypes: service.qServiceTypes,
          })
        );
      }
      
      // Replace wholte trusted_service_providers collection with data
      db.collection("trusted_service_providers").deleteMany({});
      db.collection("trusted_service_providers").insertMany(data);
      console.log("TSPs updated!");
    });
}

module.exports = {
  synchronizeUser,
  authenticate,
  generateSession,
  validateSession,
  validateCredentials,
  getDatabase,
  getCookies,
  getUser,
  isBlacklisted,
  isReported,
  addReport,
  addBlockedVisit,
  cancelReport,
  updateTSP,
};
