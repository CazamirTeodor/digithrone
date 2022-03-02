/*global chrome*/

function setCookies(cookies, status) {
    Object.keys(cookies).forEach((platform) => {
        if (status) {
            cookies[platform].cookies.forEach((value) => {
                // Here 'value' is the whole cookie string. We have to split it 
                var fields = value.split(';');
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
            })
        }
        else {
            Object.keys(cookies).forEach((platform) => {
                cookies[platform].cookies.forEach((value) => {
                    // Here 'value' is the whole cookie string. We have to split it 
                    var fields = value.split(';');
                    chrome.cookies.remove({
                        name: fields[3],
                        url: fields[8]
                    });
                })
            })
        }
    });
}

export { setCookies };