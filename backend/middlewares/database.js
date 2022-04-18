const fs = require("fs");
const { v1: uuidv1, v4: uuidv4 } = require("uuid");

function get() {
  const raw_data = fs.readFileSync(
    "/Users/teodorcazamir/Desktop/digithrone/backend/data/database.json"
  );
  const json_data = JSON.parse(raw_data);
  return json_data;
}

function getUser(email) {
  let db = get();
  return db.users[email];
}

function invalidateSession(UserID) {
  let db = get();
  delete db.sessions[UserID];
  fs.writeFileSync(
    "/Users/teodorcazamir/Desktop/digithrone/backend/data/database.json",
    JSON.stringify(db)
  );
}

function generateSession(email) {
  let db = get();
  let uuid = uuidv1();

  while (true) {
    if (Object.values(db.sessions).includes(uuid)) uuid = uuidv1();
    else {
      let db = get();
      db.sessions[email] = uuid;
      fs.writeFileSync(
        "/Users/teodorcazamir/Desktop/digithrone/backend/data/database.json",
        JSON.stringify(db)
      );
      return uuid;
    }
  }
}

function validateCredentials(email, password) {
  console.log("email :>> ", email);
  console.log("password :>> ", password);
  const db = get();
  if (db.users?.[email].pass === password) return true;
  return false;
}

// Returns the user's id if session is valid
function validateSession(session_cookie) {
  let decoded_cookie = Buffer.from(session_cookie, "base64").toString("ascii");
  let parts = decoded_cookie.split(":");
  const [UserID, SessionUUID] = parts;

  const db = get();
  if (Object.keys(db.sessions).includes(UserID)) {
    if (db.sessions[UserID] === SessionUUID) return UserID;
    else invalidateSession(UserID);
  }
  return null;
}

// Checks if the provided session exists and returns the id of the user
// making the request (pass it in res.locals)
// OBS: Used as a middleware
function authenticate(req, res, next) {
  if (req.cookies["digithrone-session-cookie"]) {
    let user = validateSession(req.cookies["digithrone-session-cookie"]);

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

function getBlacklist() {
  return get()["blacklist"];
}

function getObfuscated() {
  return get()["obfuscated"];
}

module.exports = {
  authenticate,
  generateSession,
  validateSession,
  validateCredentials,
  getUser,
  getBlacklist,
  getObfuscated,
  get,
};
