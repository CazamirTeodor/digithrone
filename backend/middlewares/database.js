const express = require('express');
const router = express.Router();
const fs = require('fs');


function get(){
    const raw_data = fs.readFileSync('/Users/teodorcazamir/Desktop/digithrone/backend/data/database.json');
    const json_data = JSON.parse(raw_data);
    return json_data;
}

function getUser(email){
    const data = get()['users'];
    if (email in data)
        return data[email];
    return null;
}

function getBlacklist(){
    return get()['blacklist']
}

function getObfuscated(){
    return get()['obfuscated'];
}


module.exports = {
    getUser , getBlacklist, getObfuscated, get
}