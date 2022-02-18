const redis = require('redis');


async function authenticate(email, hashed_password){
    const redis_client = redis.createClient();
    redis_client.on('error', (err) => console.log('Redis Client Error', err));
    await redis_client.connect();
    const password = await redis_client.HGET(email, 'password');
    console.log(password);
    if (hashed_password == password)
        return true;
    return false;
    

    
}

module.exports = { authenticate };