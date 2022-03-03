function _BlacklistListener(details){
    console.log("_BlacklistListener");
    return { redirectUrl : chrome.runtime.getURL("blocked.html") };
}

function _HTTPSListener(details){
  console.log("_HTTPSListener");
    return { redirectUrl : details.url.replace('http://', "https://")}
}

function setBlacklist(status){
    if (status){
        chrome.storage.local.get(['data'], result => {
            chrome.webRequest.onBeforeRequest.addListener(
                _BlacklistListener, 
                { urls : result.data.blacklist.map( website => `*://*.${website}/*`), types: ["main_frame", "sub_frame"]},
                ["blocking"]);
        });
    }
    else{
        chrome.webRequest.onBeforeRequest.removeListener(_BlacklistListener);
    }
}


function setHTTPS(status){
    if (status){
            chrome.webRequest.onBeforeRequest.addListener(
                _HTTPSListener, 
                { urls : ['http://*/'], types: ["main_frame", "sub_frame"]},
                ["blocking"]);
    }
    else{
        chrome.webRequest.onBeforeRequest.removeListener(_HTTPSListener);
    }

}


function updatePlatformIcons(){
  chrome.storage.local.get(['data'], result => {
    // TODO
  })
}

chrome.runtime.onMessage.addListener(message => {
  console.log("Background: I have received a message - ", message);
  if (message.action == "Activate"){
    setHTTPS(true);
    setBlacklist(true);
  }
  else if (message.action == "Deactivate"){
    setHTTPS(false);
    setBlacklist(false);

  }
})