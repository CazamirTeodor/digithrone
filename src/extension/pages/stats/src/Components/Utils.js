/*global chrome*/

function solveResourceURL(resource) {
  if (chrome?.runtime) {
    return window.chrome.runtime.getURL("/pages/stats/build" + resource);
  } else {
    return resource;
  }
}

export { solveResourceURL };
