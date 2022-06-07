
function solveResourceURL(resource) {
  if (window?.chrome) {
      return window.chrome.runtime.getURL("/pages/content/build" + resource);
  } else {
    return resource;
  }
}


export {
    solveResourceURL,
};
