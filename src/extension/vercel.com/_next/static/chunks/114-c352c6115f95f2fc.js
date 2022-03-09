"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[114],{10114:function(a,b,c){c.r(b),c.d(b,{ResizeObserver:function(){return R},ResizeObserverEntry:function(){return y}});var d,e,f,g=[],h="ResizeObserver loop completed with undelivered notifications.",i=function(){var a;"function"==typeof ErrorEvent?a=new ErrorEvent("error",{message:h}):((a=document.createEvent("Event")).initEvent("error",!1,!1),a.message=h),window.dispatchEvent(a)};(f=d||(d={})).BORDER_BOX="border-box",f.CONTENT_BOX="content-box",f.DEVICE_PIXEL_CONTENT_BOX="device-pixel-content-box";var j=function(){function a(a,b,c,d){return this.x=a,this.y=b,this.width=c,this.height=d,this.top=this.y,this.left=this.x,this.bottom=this.top+this.height,this.right=this.left+this.width,Object.freeze(this)}return a.prototype.toJSON=function(){return{x:this.x,y:this.y,top:this.top,right:this.right,bottom:this.bottom,left:this.left,width:this.width,height:this.height}},a.fromRect=function(b){return new a(b.x,b.y,b.width,b.height)},a}(),k=function(a){return a instanceof SVGElement&&"getBBox"in a},l=function(a){if(k(a)){var b=a.getBBox(),c=b.width,d=b.height;return!c&&!d}var e=a,f=e.offsetWidth,g=e.offsetHeight;return!(f||g||a.getClientRects().length)},m=function(a){var b,c,d=null===(c=null===(b=a)|| void 0===b?void 0:b.ownerDocument)|| void 0===c?void 0:c.defaultView;return!!(d&&a instanceof d.Element)},n=function(a){switch(a.tagName){case"INPUT":if("image"!==a.type)break;case"VIDEO":case"AUDIO":case"EMBED":case"OBJECT":case"CANVAS":case"IFRAME":case"IMG":return!0}return!1},o="undefined"!=typeof window?window:{},p=new Map(),q=/auto|scroll/,r=/^tb|vertical/,s=/msie|trident/i.test(o.navigator&&o.navigator.userAgent),t=function(a){return parseFloat(a||"0")},u=function(a,b,c){return void 0===a&&(a=0),void 0===b&&(b=0),void 0===c&&(c=!1),Object.freeze({inlineSize:(c?b:a)||0,blockSize:(c?a:b)||0})},v=Object.freeze({devicePixelContentBoxSize:u(),borderBoxSize:u(),contentBoxSize:u(),contentRect:new j(0,0,0,0)}),w=function(a){if(p.has(a))return p.get(a);if(l(a))return p.set(a,v),v;var b=getComputedStyle(a),c=k(a)&&a.ownerSVGElement&&a.getBBox(),d=!s&&"border-box"===b.boxSizing,e=r.test(b.writingMode||""),f=!c&&q.test(b.overflowY||""),g=!c&&q.test(b.overflowX||""),h=c?0:t(b.paddingTop),i=c?0:t(b.paddingRight),m=c?0:t(b.paddingBottom),n=c?0:t(b.paddingLeft),o=c?0:t(b.borderTopWidth),w=c?0:t(b.borderRightWidth),x=c?0:t(b.borderBottomWidth),y=c?0:t(b.borderLeftWidth),z=n+i,A=h+m,B=y+w,C=o+x,D=g?a.offsetHeight-C-a.clientHeight:0,E=f?a.offsetWidth-B-a.clientWidth:0,F=c?c.width:t(b.width)-(d?z+B:0)-E,G=c?c.height:t(b.height)-(d?A+C:0)-D,H=Object.freeze({devicePixelContentBoxSize:u(Math.round(F*devicePixelRatio),Math.round(G*devicePixelRatio),e),borderBoxSize:u(F+z+E+B,G+A+D+C,e),contentBoxSize:u(F,G,e),contentRect:new j(n,h,F,G)});return p.set(a,H),H},x=function(a,b){var c=w(a),e=c.borderBoxSize,f=c.contentBoxSize,g=c.devicePixelContentBoxSize;switch(b){case d.DEVICE_PIXEL_CONTENT_BOX:return g;case d.BORDER_BOX:return e;default:return f}},y=function(a){var b=w(a);this.target=a,this.contentRect=b.contentRect,this.borderBoxSize=[b.borderBoxSize],this.contentBoxSize=[b.contentBoxSize],this.devicePixelContentBoxSize=[b.devicePixelContentBoxSize]},z=function(a){if(l(a))return 1/0;for(var b=0,c=a.parentNode;c;)b+=1,c=c.parentNode;return b},A=function(){var a=1/0,b=[];g.forEach(function(c){if(0!==c.activeTargets.length){var d=[];c.activeTargets.forEach(function(b){var c=new y(b.target),e=z(b.target);d.push(c),b.lastReportedSize=x(b.target,b.observedBox),e<a&&(a=e)}),b.push(function(){c.callback.call(c.observer,d,c.observer)}),c.activeTargets.splice(0,c.activeTargets.length)}});for(var c=0,d=b;c<d.length;c++)(0,d[c])();return a},B=function(a){p.clear(),g.forEach(function(b){b.activeTargets.splice(0,b.activeTargets.length),b.skippedTargets.splice(0,b.skippedTargets.length),b.observationTargets.forEach(function(c){c.isActive()&&(z(c.target)>a?b.activeTargets.push(c):b.skippedTargets.push(c))})})},C=function(){var a=0;for(B(a);g.some(function(a){return a.activeTargets.length>0});)B(a=A());return g.some(function(a){return a.skippedTargets.length>0})&&i(),a>0},D=[],E=function(a){if(!e){var b=document.createTextNode(""),c={characterData:!0};new MutationObserver(function(){return D.splice(0).forEach(function(a){return a()})}).observe(b,c),e=function(){b.textContent=""}}D.push(a),e()},F=function(a){E(function(){requestAnimationFrame(a)})},G=0,H={attributes:!0,characterData:!0,childList:!0,subtree:!0},I=["resize","load","transitionend","animationend","animationstart","animationiteration","keyup","keydown","mouseup","mousedown","mouseover","mouseout","blur","focus"],J=!1,K=new(function(){function a(){var a=this;this.stopped=!0,this.listener=function(){return a.schedule()}}return a.prototype.run=function(a){var b=this;J||(J=!0,F(function(){var c=!1;try{c=C()}finally{if(J=!1,!G)return;c?b.run(60):a?b.run(a-1):b.start()}}))},a.prototype.schedule=function(){this.stop(),this.run(12)},a.prototype.observe=function(){var a=this,b=function(){return a.observer&&a.observer.observe(document.body,H)};document.body?b():o.addEventListener("DOMContentLoaded",b)},a.prototype.start=function(){var a=this;this.stopped&&(this.stopped=!1,this.observer=new MutationObserver(this.listener),this.observe(),I.forEach(function(b){return o.addEventListener(b,a.listener,!0)}))},a.prototype.stop=function(){var a=this;this.stopped||(this.observer&&this.observer.disconnect(),I.forEach(function(b){return o.removeEventListener(b,a.listener,!0)}),this.stopped=!0)},a}())(),L=function(a){!G&&a>0&&K.start(),(G+=a)||K.stop()},M=function(){function a(a,b){this.target=a,this.observedBox=b||d.CONTENT_BOX,this.lastReportedSize={inlineSize:0,blockSize:0}}return a.prototype.isActive=function(){var a,b=x(this.target,this.observedBox);return k(a=this.target)||n(a)||"inline"!==getComputedStyle(a).display||(this.lastReportedSize=b),this.lastReportedSize.inlineSize!==b.inlineSize||this.lastReportedSize.blockSize!==b.blockSize},a}(),N=function(a,b){this.activeTargets=[],this.skippedTargets=[],this.observationTargets=[],this.observer=a,this.callback=b},O=new Map(),P=function(a,b){for(var c=0;c<a.length;c+=1)if(a[c].target===b)return c;return -1},Q=function(){function a(){}return a.connect=function(a,b){var c=new N(a,b);g.push(c),O.set(a,c)},a.observe=function(a,b,c){if(O.has(a)){var d=O.get(a);0>P(d.observationTargets,b)&&(d.observationTargets.push(new M(b,c&&c.box)),L(1),K.schedule())}},a.unobserve=function(a,b){if(O.has(a)){var c=O.get(a),d=P(c.observationTargets,b);d>=0&&(c.observationTargets.splice(d,1),L(-1))}},a.disconnect=function(a){if(O.has(a)){var b=O.get(a);g.splice(g.indexOf(b),1),O.delete(a),L(-b.observationTargets.length)}},a}(),R=function(){function a(a){if(0===arguments.length)throw new TypeError("Failed to construct 'ResizeObserver': 1 argument required, but only 0 present.");if("function"!=typeof a)throw new TypeError("Failed to construct 'ResizeObserver': The callback provided as parameter 1 is not a function.");Q.connect(this,a)}return a.prototype.observe=function(a,b){if(0===arguments.length)throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': 1 argument required, but only 0 present.");if(!m(a))throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': parameter 1 is not of type 'Element");Q.observe(this,a,b)},a.prototype.unobserve=function(a){if(0===arguments.length)throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': 1 argument required, but only 0 present.");if(!m(a))throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': parameter 1 is not of type 'Element");Q.unobserve(this,a)},a.prototype.disconnect=function(){Q.disconnect(this)},a.toString=function(){return"function ResizeObserver () { [polyfill code] }"},a}()}}])