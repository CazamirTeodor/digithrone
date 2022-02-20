const redis = require('redis');
const fs = require('fs');


// Verifies the email+password and sends back users data and settings
async function authenticate(email, hashed_password){
    const redis_client = redis.createClient();
    redis_client.on('error', (err) => console.log('Redis Client Error', err));
    await redis_client.connect();
    //const password = await redis_client.HGET(email, 'password');

    const raw_data = fs.readFileSync('/Users/teodorcazamir/Desktop/digithrone/backend/data/database.json');
    const json_data = JSON.parse(raw_data);

    if (email in json_data['users']){
        if (hashed_password == json_data['users'][email]['pass'])
            {
                const user_data = json_data['users'][email];
                delete user_data['pass'];
                console.log(user_data);
                return user_data;
            }
    }
    return null;
}

module.exports = { authenticate };