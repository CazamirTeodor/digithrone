function _BlacklistListener(details) {
    return { redirectUrl: chrome.runtime.getURL("blocked.html") };
}


function _HTTPSListener(details) {
    console.log("_HTTPSListener");
    return { redirectUrl: details.url.replace('http://', "https://") }
}


function _ObfuscatedListenerRedirect(details) {
    console.log("_ObfuscatedListenerRedirect");
    chrome.storage.local.get(['data'], result => {
        var url = details.url.replace(/^[a-z]+:\/\//, '');
        result.data.website_path = url;
        chrome.storage.local.set({ data: result.data })
    })
    return {
        redirectUrl: `http://localhost:3001/obfuscated/${details.url.replace(/^https?:\/\//, '')}`
    }
}

/*
function _ObfuscatedListenerInject(details) {
    console.log("_ObfuscatedListenerInject");
    console.log(details)
    chrome.tabs.executeScript(
        details.tabId,
        { file: 'obfuscated.js', runAt: 'document_end' }, result => console.log(result));
}
*/

function _ObfuscatedListenerChangeHeaders(details){
    console.log('_ObfuscatedListenerChangeHeaders', details);
}


function setBlacklist(status) {
    if (status) {
        chrome.storage.local.get(['data'], result => {
            chrome.webRequest.onBeforeRequest.addListener(
                _BlacklistListener,
                { urls: result.data.blacklist.map(website => `*://*.${website}/*`), types: ["main_frame", "sub_frame"] },
                ["blocking"]);

        });
    }
    else {
        chrome.webRequest.onBeforeRequest.removeListener(_BlacklistListener);
    }
}


function setHTTPS(status) {
    if (status) {
        chrome.webRequest.onBeforeRequest.addListener(
            _HTTPSListener,
            { urls: ['http://*/'], types: ["main_frame", "sub_frame"] },
            ["blocking"]);
    }
    else {
        chrome.webRequest.onBeforeRequest.removeListener(_HTTPSListener);
    }
}


function setObfuscated(status) {

    if (status) {
        chrome.storage.local.get(['data'], result => {
            console.log(result.data.obfuscated)


            chrome.webRequest.onBeforeRequest.addListener(
                _ObfuscatedListenerRedirect,
                { urls: result.data.obfuscated.map(website => `*://*.${website}/*`), types: ["main_frame", "sub_frame"] },
                ["blocking"]);

            chrome.webRequest.onHeadersReceived.addListener(
                _ObfuscatedListenerChangeHeaders,
                { urls : ['http://localhost:3001/obfuscated/*']},
                ['responseHeaders', 'extraHeaders']
            );
            /*
            chrome.webRequest.onCompleted.addListener(
                _ObfuscatedListenerInject, 
                { urls: ["http://localhost:3001/obfuscated"]},
                );
            */
        });


    }
    else {
        chrome.webRequest.onBeforeRequest.removeListener(_ObfuscatedListenerRedirect);
        chrome.webRequest.onHeadersReceived.removeListener(_ObfuscatedListenerChangeHeaders);
        //chrome.webRequest.onCompleted.removeListener(_ObfuscatedListenerInject);
    }
}


function updatePlatformIcons() {
    chrome.storage.local.get(['data'], result => {
        // TODO
    })
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Background: I have received a message - ", message);
    if (message.action == "Activate") {
        setHTTPS(true);
        setBlacklist(true);
        setObfuscated(true);
    }
    else if (message.action == "Deactivate") {
        setHTTPS(false);
        setBlacklist(false);
        setObfuscated(false);
    }
})