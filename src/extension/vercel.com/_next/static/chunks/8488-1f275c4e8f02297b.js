"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8488,4941],{80154:function(a,b,c){c.d(b,{Z:function(){return f}});var d=c(40821),e=function(){return(e=Object.assign||function(a){for(var b,c=1,d=arguments.length;c<d;c++)for(var e in b=arguments[c])Object.prototype.hasOwnProperty.call(b,e)&&(a[e]=b[e]);return a}).apply(this,arguments)},f=function(a,b){return function(){for(var c=[],d=0;d<arguments.length;d++)c[d]=arguments[d];var f,g="function"==typeof(f=c)[1]?[f[0],f[1],f[2]||{}]:[f[0],null,(null===f[1]?f[2]:f[1])||{}],h=g[0],i=g[1],j=g[2],k=(j.use||[]).concat(b);return a(h,i,e(e({},j),{use:k}))}}(d.ZP,function(a){return function(b,c,d){return d.revalidateOnFocus=!1,d.revalidateIfStale=!1,d.revalidateOnReconnect=!1,a(b,c,d)}})},20958:function(a,b,c){c.d(b,{ZP:function(){return s}});var d=c(27378),e=c(40821),f=function(){},g=f(),h=Object,i=function(a){return a===g},j=function(a){return"function"==typeof a},k=!("undefined"!=typeof window)||"Deno"in window,l=k?d.useEffect:d.useLayoutEffect,m="undefined"!=typeof navigator&&navigator.connection;!k&&m&&(["slow-2g","2g"].includes(m.effectiveType)||m.saveData);var n=new WeakMap(),o=0,p=function(a){var b,c,d=typeof a,e=a&&a.constructor,f=e==Date;if(h(a)!==a||f||e==RegExp)b=f?a.toJSON():"symbol"==d?a.toString():"string"==d?JSON.stringify(a):""+a;else{if(b=n.get(a))return b;if(b=++o+"~",n.set(a,b),e==Array){for(c=0,b="@";c<a.length;c++)b+=p(a[c])+",";n.set(a,b)}if(e==h){b="#";for(var g=h.keys(a).sort();!i(c=g.pop());)i(a[c])||(b+=c+":"+p(a[c])+",");n.set(a,b)}}return b},q=function(a){if(j(a))try{a=a()}catch(b){a=""}var c=[].concat(a);return[a="string"==typeof a?a:(Array.isArray(a)?a.length:a)?p(a):"",c,a?"$err$"+a:"",a?"$req$"+a:""]},r=function(){return(r=Object.assign||function(a){for(var b,c=1,d=arguments.length;c<d;c++)for(var e in b=arguments[c])Object.prototype.hasOwnProperty.call(b,e)&&(a[e]=b[e]);return a}).apply(this,arguments)},s=function(a,b){return function(){for(var c=[],d=0;d<arguments.length;d++)c[d]=arguments[d];var e,f=j((e=c)[1])?[e[0],e[1],e[2]||{}]:[e[0],null,(null===e[1]?e[2]:e[1])||{}],g=f[0],h=f[1],i=f[2],k=(i.use||[]).concat(b);return a(g,h,r(r({},i),{use:k}))}}(e.ZP,function(a){return function(b,c,e){var f,h=(0,d.useState)({})[1],k=(0,d.useRef)(!1),m=(0,d.useRef)(),n=e.cache,o=e.initialSize,p=void 0===o?1:o,r=e.revalidateAll,s=void 0!==r&&r,t=e.persistSize,u=void 0!==t&&t,v=e.revalidateFirstPage,w=void 0===v||v,x=null;try{x=(f=b,q(f?f(0,null):null)[0])}catch(y){}var z=null,A=null;x&&(z="$ctx$"+x,A="$len$"+x);var B=(0,d.useCallback)(function(){var a=n.get(A);return i(a)?p:a},[A,p]),C=(0,d.useRef)(B());l(function(){if(!k.current){k.current=!0;return}x&&n.set(A,u?C.current:p)},[x]);var D=a(x?"$inf$"+x:null,function(){return(function(a,b,c,d){return new(c||(c=Promise))(function(e,f){function g(a){try{i(d.next(a))}catch(b){f(b)}}function h(a){try{i(d.throw(a))}catch(b){f(b)}}function i(a){var b;a.done?e(a.value):((b=a.value)instanceof c?b:new c(function(a){a(b)})).then(g,h)}i((d=d.apply(a,b||[])).next())})})(void 0,void 0,void 0,function(){var a,d,f,g,h,j,k,l,o,p,r,t;return(function(a,b){var c,d,e,f,g={label:0,sent:function(){if(1&e[0])throw e[1];return e[1]},trys:[],ops:[]};return f={next:h(0),"throw":h(1),"return":h(2)},"function"==typeof Symbol&&(f[Symbol.iterator]=function(){return this}),f;function h(a){return function(b){return i([a,b])}}function i(f){if(c)throw new TypeError("Generator is already executing.");for(;g;)try{if(c=1,d&&(e=2&f[0]?d.return:f[0]?d.throw||((e=d.return)&&e.call(d),0):d.next)&&!(e=e.call(d,f[1])).done)return e;switch(d=0,e&&(f=[2&f[0],e.value]),f[0]){case 0:case 1:e=f;break;case 4:return g.label++,{value:f[1],done:!1};case 5:g.label++,d=f[1],f=[0];continue;case 7:f=g.ops.pop(),g.trys.pop();continue;default:if(!(e=(e=g.trys).length>0&&e[e.length-1])&&(6===f[0]||2===f[0])){g=0;continue}if(3===f[0]&&(!e||f[1]>e[0]&&f[1]<e[3])){g.label=f[1];break}if(6===f[0]&&g.label<e[1]){g.label=e[1],e=f;break}if(e&&g.label<e[2]){g.label=e[2],g.ops.push(f);break}e[2]&&g.ops.pop(),g.trys.pop();continue}f=b.call(a,g)}catch(h){f=[6,h],d=0}finally{c=e=0}if(5&f[0])throw f[1];return{value:f[0]?f[1]:void 0,done:!0}}})(this,function(u){switch(u.label){case 0:d=(a=n.get(z)||[])[0],f=a[1],g=[],h=B(),j=null,k=0,u.label=1;case 1:if(!(k<h))return[3,5];if(o=(l=q(b?b(k,j):null))[0],p=l[1],!o)return[3,5];if(r=n.get(o),t=s||d||i(r)||w&&!k&&!i(m.current)||f&&!i(f[k])&&!e.compare(f[k],r),!(c&&t))return[3,3];return[4,c.apply(void 0,p)];case 2:r=u.sent(),n.set(o,r),u.label=3;case 3:g.push(r),j=r,u.label=4;case 4:return++k,[3,1];case 5:return n.delete(z),[2,g]}})})},e);l(function(){m.current=D.data},[D.data]);var E=(0,d.useCallback)(function(){for(var a=[],b=0;b<arguments.length;b++)a[b]=arguments[b];var c=a[0],d=!1!==a[1];if(z){if(d)if(i(c))n.set(z,[!0]);else{var e=m.current;n.set(z,[!1,e])}return a.length?D.mutate(c,d):D.mutate()}},[z]),F=function(a){for(var c=[],d=null,e=0;e<a;++e){var f=q(b?b(e,d):null)[0],h=f?n.get(f):g;if(i(h))return m.current;c.push(h),d=h}return c},G=(0,d.useCallback)(function(a){var b;if(A&&(j(a)?b=a(B()):"number"==typeof a&&(b=a),"number"==typeof b))return n.set(A,b),C.current=b,h({}),E(F(b))},[A,B,E]);return{size:B(),setSize:G,mutate:E,get error(){return D.error},get data(){return D.data},get isValidating(){return D.isValidating}}}})},44090:function(a,b,c){c.d(b,{fC:function(){return F},aV:function(){return G},VY:function(){return H}});var d=c(25699),e=c(65147),f=c(63170),g=c(33919),h=c(25574),i=c(75288),j=c(48586),k=c(92646),l=c(25425),m=c(32420),n=c(58560),o=c(9111),p=c(46718),q=c(27378),r=c(25773);const[s,t]=(0,n.b)("Dialog"),[u,v]=s("Dialog"),w=q.forwardRef((a,b)=>{const{forceMount:c,...d}=a,e=v("DialogOverlay",a.__scopeDialog);return e.modal?q.createElement(h.z,{present:c||e.open},q.createElement(x,(0,r.Z)({},d,{ref:b}))):null}),x=q.forwardRef((a,b)=>{const{__scopeDialog:c,...d}=a,e=v("DialogOverlay",c);return q.createElement(i.h,null,q.createElement(g.W.div,(0,r.Z)({"data-state":C(e.open)},d,{ref:b})))}),y=q.forwardRef((a,b)=>{const{forceMount:c,...d}=a,e=v("DialogContent",a.__scopeDialog);return q.createElement(h.z,{present:c||e.open},e.modal?q.createElement(z,(0,r.Z)({},d,{ref:b})):q.createElement(A,(0,r.Z)({},d,{ref:b})))}),z=q.forwardRef((a,b)=>{const{allowPinchZoom:c,...f}=a,g=v("DialogContent",a.__scopeDialog),h=q.useRef(null),j=(0,o.e)(b,h);return q.useEffect(()=>{const a=h.current;if(a)return(0,d.R)(a)},[]),q.createElement(i.h,null,q.createElement(e.Z,{allowPinchZoom:c},q.createElement(B,(0,r.Z)({},f,{ref:j,trapFocus:g.open,disableOutsidePointerEvents:!0,onCloseAutoFocus:(0,p.M)(a.onCloseAutoFocus,a=>{var b;a.preventDefault(),null===(b=g.triggerRef.current)|| void 0===b||b.focus()}),onPointerDownOutside:(0,p.M)(a.onPointerDownOutside,a=>{const b=a.detail.originalEvent,c=0===b.button&& !0===b.ctrlKey;(2===b.button||c)&&a.preventDefault()}),onFocusOutside:(0,p.M)(a.onFocusOutside,a=>a.preventDefault())}))))}),A=q.forwardRef((a,b)=>{const c=v("DialogContent",a.__scopeDialog),d=q.useRef(!1);return q.createElement(i.h,null,q.createElement(B,(0,r.Z)({},a,{ref:b,trapFocus:!1,disableOutsidePointerEvents:!1,onCloseAutoFocus:b=>{var e,f;null===(e=a.onCloseAutoFocus)|| void 0===e||e.call(a,b),b.defaultPrevented||(d.current||null===(f=c.triggerRef.current)|| void 0===f||f.focus(),b.preventDefault()),d.current=!1},onInteractOutside:b=>{var e,f;null===(e=a.onInteractOutside)|| void 0===e||e.call(a,b),b.defaultPrevented||(d.current=!0);const g=b.target;(null===(f=c.triggerRef.current)|| void 0===f?void 0:f.contains(g))&&b.preventDefault()}})))}),B=q.forwardRef((a,b)=>{const{__scopeDialog:c,"aria-label":d,"aria-labelledby":e,"aria-describedby":g,trapFocus:h,onOpenAutoFocus:i,onCloseAutoFocus:l,...m}=a,n=v("DialogContent",c),p=q.useRef(null),s=(0,o.e)(b,p);return(0,f.EW)(),q.createElement(q.Fragment,null,q.createElement(j.M,{asChild:!0,loop:!0,trapped:h,onMountAutoFocus:i,onUnmountAutoFocus:l},q.createElement(k.X,(0,r.Z)({role:"dialog",id:n.contentId,"aria-describedby":g||n.descriptionId,"aria-labelledby":d?void 0:e||n.titleId,"aria-label":d||void 0,"data-state":C(n.open)},m,{ref:s,onDismiss:()=>n.onOpenChange(!1)}))),!1)});function C(a){return a?"open":"closed"}const[D,E]=(0,n.k)("DialogLabelWarning",{contentName:"DialogContent",titleName:"DialogTitle",docsSlug:"dialog"}),F=a=>{const{__scopeDialog:b,children:c,open:d,defaultOpen:e,onOpenChange:f,modal:g=!0}=a,h=q.useRef(null),[i=!1,j]=(0,l.T)({prop:d,defaultProp:e,onChange:f});return q.createElement(u,{scope:b,triggerRef:h,contentId:(0,m.M)(),titleId:(0,m.M)(),descriptionId:(0,m.M)(),open:i,onOpenChange:j,onOpenToggle:q.useCallback(()=>j(a=>!a),[j]),modal:g},c)},G=w,H=y},10611:function(a,b,c){const d=c(761);function e(a){return/^[a-f0-9]{40}$/i.test(a)}b.Z=function(a){if("string"!=typeof a||!a.length)return null;let b,c;if(a.startsWith("git@"))switch(!0){case a.startsWith("git@github.com:"):b="github",c=a.replace("git@github.com:","");break;case a.startsWith("git@gitlab.com:"):b="gitlab",c=a.replace("git@gitlab.com:","");break;case a.startsWith("git@bitbucket.org:"):b="bitbucket",c=a.replace("git@bitbucket.org:","");break;default:return null}else{const f=d.parse(a);if(!f.pathname)return null;switch(f.hostname){case"github.com":case"www.github.com":b="github";break;case"gitlab.com":case"www.gitlab.com":b="gitlab";break;case"bitbucket.org":case"www.bitbucket.org":b="bitbucket";break;default:return null}c=f.pathname.replace(/(^\/|\/$)/g,"")}c=c.replace(/\.git$/,"");const g=c.split("/").filter(Boolean);if(g.length<2)return null;if(2===g.length)return{type:b,owner:g[0],name:g[1],branch:"",sha:"",subdir:""};let h="",i="",j="",k=g[0],l=g[1];if("github"===b){if("blob"!==g[2]&&"tree"!==g[2]&&"commit"!==g[2])return null;e(g[3])?i=g[3]:h=g[3],j=g.slice(4).join("/")}else if("gitlab"===b)if("-"===g[2])("blob"===g[3]||"tree"===g[3]||"commit"===g[3])&&(e(g[4])?i=g[4]:h=g[4],j=g.slice(5).join("/"));else{const m=g.indexOf("-");-1===m?l=g.slice(1).join("/"):(l=g.slice(1,m).join("/"),("blob"===g[m+1]||"tree"===g[m+1]||"commit"===g[m+1])&&(e(g[m+2])?i=g[m+2]:h=g[m+2],j=g.slice(m+3).join("/")))}else if("bitbucket"===b){if("src"!==g[2])return null;e(g[3])?i=g[3]:h=g[3],j=g.slice(4).join("/")}return{type:b,owner:k,name:l,branch:h,sha:i,subdir:j}}}}])