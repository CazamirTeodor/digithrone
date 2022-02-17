const env = process.env;

const config = {
    SERVER_PORT: env.SERVER_PORT || 3001,
    DB_IP: env.DB_IP || 'localhost',
    DB_PORT: env.DB_PORT || 6379, // Redis DB port
}

module.exports = config;