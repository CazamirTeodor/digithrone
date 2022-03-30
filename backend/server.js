const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const redis = require('redis');
const app = express();

const config = require('./config');
const login_route = require('./routes/user/login');
const obfuscated_route = require('./routes/obfuscated');
const servers_route = require('./routes/servers');
const heartbeat_route = require('./routes/heartbeat');




app.use(cors());
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({ extended: true })
);


app.use('/login', login_route);
app.use('/obfuscated', obfuscated_route);
app.use('/servers', servers_route);
app.use('/heartbeat', heartbeat_route);


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ 'message': err.message });
    return;
});

app.listen(config['SERVER_PORT'] , () => {
    console.log(config);
    console.log(`Server listening on ${config['SERVER_PORT']}`);
});