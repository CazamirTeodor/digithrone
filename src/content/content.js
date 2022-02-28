/*global chrome*/

chrome.storage.local.get(['data'], (result) => {
    if (result.data){
        console.log(result.data.blacklist);
    }
});