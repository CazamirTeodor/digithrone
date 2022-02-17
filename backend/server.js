const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const config = require('./config');
const login_route = require('./routes/login');


app.get('/', (req, res) => {
    console.log('Accessing /');
    res.send('Salut');
});


app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
    })
);

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({ extended: true })
);


app.use('/login', login_route);


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