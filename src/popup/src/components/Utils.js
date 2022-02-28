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

function setBlacklist(urls, status) {
    var rules = []
    var ids = []
    for (let i = 0; i < urls.length; i++)
    {
        rules.push(
            {
                id: i + 1,
                action: { type : "redirect", "redirect" : { "extensionPath" : "/blocked.html"}},
                condition : {
                    urlFilter: urls[i], resourceTypes : ["main_frame"]
                }
            }
        );
        ids.push(i + 1);
    }

    if (status){
        chrome.declarativeNetRequest.updateDynamicRules({
            addRules : rules,
            removeRuleIds: ids
        })
    }
    else{
        chrome.declarativeNetRequest.updateDynamicRules({
            removeRuleIds: ids
        })
    }

}


export { setCookies, setBlacklist };