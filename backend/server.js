const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const redis = require("redis");
const app = express();
const cookie_parser = require("cookie-parser");

const config = require("./config");
const login_route = require("./routes/login");
const obfuscated_route = require("./routes/obfuscated");
const heartbeat_route = require("./routes/heartbeat");
const report_route = require("./routes/report");
const user_route = require("./routes/user/index");
const { authenticate } = require("./middlewares/database");

app.use(cors({ credentials: true }));
app.use(cookie_parser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/login", login_route);

app.use(authenticate);
app.use("/user", user_route);
app.use("/heartbeat", heartbeat_route);

// app.use() // Limit so only the extension can do these requests
app.use("/obfuscated", obfuscated_route);
app.use("/report", report_route);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.listen(config["SERVER_PORT"], () => {
  console.log(config);
  console.log(`Server listening on ${config["SERVER_PORT"]}`);
});
