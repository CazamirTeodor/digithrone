const config = require("./config");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const redis = require("redis");
const app = express();
const cookie_parser = require("cookie-parser");
const { authenticate, updateTSP } = require("./middlewares/database");

const login_route = require("./routes/login");
const heartbeat_route = require("./routes/heartbeat");
const user_route = require("./routes/user/index");
const admin_route = require("./routes/admin/index");

app.use(cors({ credentials: true }));
app.use(cookie_parser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/login", login_route);
app.use("/heartbeat", heartbeat_route);

app.use(authenticate);

app.use("/user", user_route);
app.use("/admin", admin_route);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.listen(config.SERVER_PORT, () => {
  console.log(`Server listening on ${config.SERVER_PORT}`);
  setInterval(updateTSP, config.TSP_UPDATE_INTERVAL);
});
