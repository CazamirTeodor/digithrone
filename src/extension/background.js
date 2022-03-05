function _BlacklistListener(details){
    return { redirectUrl: chrome.runtime.getURL("blocked.html")};
}


function _HTTPSListener(details){
  	console.log("_HTTPSListener");
    return { redirectUrl : details.url.replace('http://', "https://")}
}


function _ObfuscatedListenerRedirect(details){
  console.log("_ObfuscatedListenerRedirect");
  return { redirectUrl : "http://google.com/gen_204" }
}

function _ObfuscatedListenerInject(details){
	if (details.frameId == 0){
		console.log("_ObfuscatedListenerInject")
		console.log(details)
	}
	
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


function setObfuscated(status){

    if (status){
        chrome.storage.local.get(['data'], result => {
        	console.log(result.data.obfuscated)
            chrome.webRequest.onBeforeRequest.addListener(
                _ObfuscatedListenerRedirect, 
                { urls : result.data.obfuscated.map( website => `*://*.${website}/*`), types: ["main_frame", "sub_frame"]},
                ["blocking"]);

            chrome.webNavigation.onCommitted.addListener(
            	_ObfuscatedListenerInject,
            	{ urlEquals : "http://google.com/gen_204"}
            	);
        });
    }
    else{
        chrome.webRequest.onBeforeRequest.removeListener(_ObfuscatedListenerRedirect);
        chrome.webNavigation.onCompleted.removeListener(_ObfuscatedListenerInject);
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
    setObfuscated(true);
  }
  else if (message.action == "Deactivate"){
    setHTTPS(false);
    setBlacklist(false);
	setObfuscated(false);
  }
})