(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7827],{17827:function(){!function(){"use strict";if("object"==typeof window){if("IntersectionObserver"in window&&"IntersectionObserverEntry"in window&&"intersectionRatio"in window.IntersectionObserverEntry.prototype){"isIntersecting"in window.IntersectionObserverEntry.prototype||Object.defineProperty(window.IntersectionObserverEntry.prototype,"isIntersecting",{get:function(){return this.intersectionRatio>0}});return}var a=window.document,b=[];d.prototype.THROTTLE_TIMEOUT=100,d.prototype.POLL_INTERVAL=null,d.prototype.USE_MUTATION_OBSERVER=!0,d.prototype.observe=function(a){if(!this._observationTargets.some(function(b){return b.element==a})){if(!(a&&1==a.nodeType))throw new Error("target must be an Element");this._registerInstance(),this._observationTargets.push({element:a,entry:null}),this._monitorIntersections(),this._checkForIntersections()}},d.prototype.unobserve=function(a){this._observationTargets=this._observationTargets.filter(function(b){return b.element!=a}),this._observationTargets.length||(this._unmonitorIntersections(),this._unregisterInstance())},d.prototype.disconnect=function(){this._observationTargets=[],this._unmonitorIntersections(),this._unregisterInstance()},d.prototype.takeRecords=function(){var a=this._queuedEntries.slice();return this._queuedEntries=[],a},d.prototype._initThresholds=function(a){var b=a||[0];return Array.isArray(b)||(b=[b]),b.sort().filter(function(a,b,c){if("number"!=typeof a||isNaN(a)||a<0||a>1)throw new Error("threshold must be a number between 0 and 1 inclusively");return a!==c[b-1]})},d.prototype._parseRootMargin=function(a){var b=(a||"0px").split(/\s+/).map(function(a){var b=/^(-?\d*\.?\d+)(px|%)$/.exec(a);if(!b)throw new Error("rootMargin must be specified in pixels or percent");return{value:parseFloat(b[1]),unit:b[2]}});return b[1]=b[1]||b[0],b[2]=b[2]||b[0],b[3]=b[3]||b[1],b},d.prototype._monitorIntersections=function(){!this._monitoringIntersections&&(this._monitoringIntersections=!0,this.POLL_INTERVAL?this._monitoringInterval=setInterval(this._checkForIntersections,this.POLL_INTERVAL):(g(window,"resize",this._checkForIntersections,!0),g(a,"scroll",this._checkForIntersections,!0),this.USE_MUTATION_OBSERVER&&"MutationObserver"in window&&(this._domObserver=new MutationObserver(this._checkForIntersections),this._domObserver.observe(a,{attributes:!0,childList:!0,characterData:!0,subtree:!0}))))},d.prototype._unmonitorIntersections=function(){this._monitoringIntersections&&(this._monitoringIntersections=!1,clearInterval(this._monitoringInterval),this._monitoringInterval=null,h(window,"resize",this._checkForIntersections,!0),h(a,"scroll",this._checkForIntersections,!0),this._domObserver&&(this._domObserver.disconnect(),this._domObserver=null))},d.prototype._checkForIntersections=function(){var a=this._rootIsInDom(),b=a?this._getRootRect():k();this._observationTargets.forEach(function(d){var f=d.element,g=j(f),h=this._rootContainsTarget(f),i=d.entry,k=a&&h&&this._computeTargetAndRootIntersection(f,b),l=d.entry=new c({time:e(),target:f,boundingClientRect:g,rootBounds:b,intersectionRect:k});i?a&&h?this._hasCrossedThreshold(i,l)&&this._queuedEntries.push(l):i&&i.isIntersecting&&this._queuedEntries.push(l):this._queuedEntries.push(l)},this),this._queuedEntries.length&&this._callback(this.takeRecords(),this)},d.prototype._computeTargetAndRootIntersection=function(b,c){if("none"!=window.getComputedStyle(b).display){for(var d=j(b),e=m(b),f=!1;!f;){var g=null,h=1==e.nodeType?window.getComputedStyle(e):{};if("none"==h.display)return;if(e==this.root||e==a?(f=!0,g=c):e!=a.body&&e!=a.documentElement&&"visible"!=h.overflow&&(g=j(e)),g&&!(d=i(g,d)))break;e=m(e)}return d}},d.prototype._getRootRect=function(){var b;if(this.root)b=j(this.root);else{var c=a.documentElement,d=a.body;b={top:0,left:0,right:c.clientWidth||d.clientWidth,width:c.clientWidth||d.clientWidth,bottom:c.clientHeight||d.clientHeight,height:c.clientHeight||d.clientHeight}}return this._expandRectByRootMargin(b)},d.prototype._expandRectByRootMargin=function(a){var b=this._rootMarginValues.map(function(b,c){return"px"==b.unit?b.value:b.value*(c%2?a.width:a.height)/100}),c={top:a.top-b[0],right:a.right+b[1],bottom:a.bottom+b[2],left:a.left-b[3]};return c.width=c.right-c.left,c.height=c.bottom-c.top,c},d.prototype._hasCrossedThreshold=function(a,b){var c=a&&a.isIntersecting?a.intersectionRatio||0:-1,d=b.isIntersecting?b.intersectionRatio||0:-1;if(c!==d)for(var e=0;e<this.thresholds.length;e++){var f=this.thresholds[e];if(f==c||f==d||f<c!=f<d)return!0}},d.prototype._rootIsInDom=function(){return!this.root||l(a,this.root)},d.prototype._rootContainsTarget=function(b){return l(this.root||a,b)},d.prototype._registerInstance=function(){0>b.indexOf(this)&&b.push(this)},d.prototype._unregisterInstance=function(){var a=b.indexOf(this);-1!=a&&b.splice(a,1)},window.IntersectionObserver=d,window.IntersectionObserverEntry=c}function c(a){this.time=a.time,this.target=a.target,this.rootBounds=a.rootBounds,this.boundingClientRect=a.boundingClientRect,this.intersectionRect=a.intersectionRect||k(),this.isIntersecting=!!a.intersectionRect;var b=this.boundingClientRect,c=b.width*b.height,d=this.intersectionRect,e=d.width*d.height;c?this.intersectionRatio=Number((e/c).toFixed(4)):this.intersectionRatio=this.isIntersecting?1:0}function d(a,b){var c=b||{};if("function"!=typeof a)throw new Error("callback must be a function");if(c.root&&1!=c.root.nodeType)throw new Error("root must be an Element");this._checkForIntersections=f(this._checkForIntersections.bind(this),this.THROTTLE_TIMEOUT),this._callback=a,this._observationTargets=[],this._queuedEntries=[],this._rootMarginValues=this._parseRootMargin(c.rootMargin),this.thresholds=this._initThresholds(c.threshold),this.root=c.root||null,this.rootMargin=this._rootMarginValues.map(function(a){return a.value+a.unit}).join(" ")}function e(){return window.performance&&performance.now&&performance.now()}function f(a,b){var c=null;return function(){c||(c=setTimeout(function(){a(),c=null},b))}}function g(a,b,c,d){"function"==typeof a.addEventListener?a.addEventListener(b,c,d||!1):"function"==typeof a.attachEvent&&a.attachEvent("on"+b,c)}function h(a,b,c,d){"function"==typeof a.removeEventListener?a.removeEventListener(b,c,d||!1):"function"==typeof a.detatchEvent&&a.detatchEvent("on"+b,c)}function i(a,b){var c=Math.max(a.top,b.top),d=Math.min(a.bottom,b.bottom),e=Math.max(a.left,b.left),f=Math.min(a.right,b.right),g=f-e,h=d-c;return g>=0&&h>=0&&{top:c,bottom:d,left:e,right:f,width:g,height:h}}function j(a){var b;try{b=a.getBoundingClientRect()}catch(c){}return b?(b.width&&b.height||(b={top:b.top,right:b.right,bottom:b.bottom,left:b.left,width:b.right-b.left,height:b.bottom-b.top}),b):k()}function k(){return{top:0,bottom:0,left:0,right:0,width:0,height:0}}function l(a,b){for(var c=b;c;){if(c==a)return!0;c=m(c)}return!1}function m(a){var b=a.parentNode;return b&&11==b.nodeType&&b.host?b.host:b&&b.assignedSlot?b.assignedSlot.parentNode:b}}()}}])