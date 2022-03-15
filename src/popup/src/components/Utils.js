/*global chrome*/
var data = {
}

function setCookies(cookies, status) {
    Object.keys(cookies).forEach((platform) => {
        if (status) {
            cookies[platform].cookies.forEach((value) => {
                // Here 'value' is the whole cookie string. We have to split it 
                var fields = value.split(';');
                if (chrome.cookies !== undefined){
                    chrome.cookies.set({
                        domain: fields[0],
                        expirationDate: parseInt(fields[1]),
                        httpOnly: Boolean(fields[2]),
                        name: fields[3],
                        path: fields[4],
                        sameSite: fields[5],
                        secure: Boolean(fields[6]),
                        value: fields[7],
                        url: fields[8]
                    }, (cookie) => console.log(cookie));
                }
                else{
                    data.cookies[platform][value] = true;
                }
            })
        }
        else {
            Object.keys(cookies).forEach((platform) => {
                cookies[platform].cookies.forEach((value) => {
                    // Here 'value' is the whole cookie string. We have to split it 
                    var fields = value.split(';');
                    if (chrome.cookies !== undefined){
                        chrome.cookies.remove({
                            name: fields[3],
                            url: fields[8]
                        });
                    }
                    else{
                        data.cookies[platform][value] = false;
                    }
                })
            })
        }
    });
}


function getData(callback){
    if (chrome.storage !== undefined){
        chrome.storage.local.get(['data'], result => callback(result.data));
    }
    else {
        callback(data);
    }
}

function setData(newData, callback){
    if (chrome.storage !== undefined){
        chrome.storage.local.set({data : newData}, callback);
    }
    else {
        data = newData;
        callback();
    }
}

function sendMessage(message, callback){
    if (chrome.runtime !== undefined){
        chrome.runtime.sendMessage(message, callback);
    }
}

export { setCookies, getData, setData, sendMessage};