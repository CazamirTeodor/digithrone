const database = require('../middlewares/database');


// Verifies the email + password and sends back users data and settings
async function authenticate(email, hashed_password){
    // const redis_client = redis.createClient();
    // redis_client.on('error', (err) => console.log('Redis Client Error', err));
    // await redis_client.connect();
    // const password = await redis_client.HGET(email, 'password');

    
    const user = database.getUser(email);
    if (user){
        if (hashed_password == user['pass'])
            return true
    }
    return false;
}

module.exports = { authenticate };