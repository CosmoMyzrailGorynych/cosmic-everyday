// PouchDB 6.1.2
//
// (c) 2012-2017 Dale Harvey and the PouchDB team
// PouchDB may be freely distributed under the Apache license, version 2.0.
// For all details and documentation:
// http://pouchdb.com
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.PouchDB=e()}}(function(){var e;return function e(t,n,r){function o(a,s){if(!n[a]){if(!t[a]){var u="function"==typeof require&&require;if(!s&&u)return u(a,!0);if(i)return i(a,!0);var c=new Error("Cannot find module '"+a+"'");throw c.code="MODULE_NOT_FOUND",c}var f=n[a]={exports:{}};t[a][0].call(f.exports,function(e){var n=t[a][1][e];return o(n?n:e)},f,f.exports,e,t,n,r)}return n[a].exports}for(var i="function"==typeof require&&require,a=0;a<r.length;a++)o(r[a]);return o}({1:[function(e,t,n){"use strict";function r(e){return function(){var t=arguments.length;if(t){for(var n=[],r=-1;++r<t;)n[r]=arguments[r];return e.call(this,n)}return e.call(this,[])}}t.exports=r},{}],2:[function(e,t,n){(function(r){function o(){return!("undefined"==typeof window||!window||"undefined"==typeof window.process||"renderer"!==window.process.type)||("undefined"!=typeof document&&document&&"WebkitAppearance"in document.documentElement.style||"undefined"!=typeof window&&window&&window.console&&(console.firebug||console.exception&&console.table)||"undefined"!=typeof navigator&&navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31||"undefined"!=typeof navigator&&navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))}function i(e){var t=this.useColors;if(e[0]=(t?"%c":"")+this.namespace+(t?" %c":" ")+e[0]+(t?"%c ":" ")+"+"+n.humanize(this.diff),t){var r="color: "+this.color;e.splice(1,0,r,"color: inherit");var o=0,i=0;e[0].replace(/%[a-zA-Z%]/g,function(e){"%%"!==e&&(o++,"%c"===e&&(i=o))}),e.splice(i,0,r)}}function a(){return"object"==typeof console&&console.log&&Function.prototype.apply.call(console.log,console,arguments)}function s(e){try{null==e?n.storage.removeItem("debug"):n.storage.debug=e}catch(e){}}function u(){try{return n.storage.debug}catch(e){}if("undefined"!=typeof r&&"env"in r)return r.env.DEBUG}function c(){try{return window.localStorage}catch(e){}}n=t.exports=e(3),n.log=a,n.formatArgs=i,n.save=s,n.load=u,n.useColors=o,n.storage="undefined"!=typeof chrome&&"undefined"!=typeof chrome.storage?chrome.storage.local:c(),n.colors=["lightseagreen","forestgreen","goldenrod","dodgerblue","darkorchid","crimson"],n.formatters.j=function(e){try{return JSON.stringify(e)}catch(e){return"[UnexpectedJSONParseError]: "+e.message}},n.enable(u())}).call(this,e(9))},{3:3,9:9}],3:[function(e,t,n){function r(e){var t,r=0;for(t in e)r=(r<<5)-r+e.charCodeAt(t),r|=0;return n.colors[Math.abs(r)%n.colors.length]}function o(e){function t(){if(t.enabled){var e=t,r=+new Date,o=r-(c||r);e.diff=o,e.prev=c,e.curr=r,c=r;for(var i=new Array(arguments.length),a=0;a<i.length;a++)i[a]=arguments[a];i[0]=n.coerce(i[0]),"string"!=typeof i[0]&&i.unshift("%O");var s=0;i[0]=i[0].replace(/%([a-zA-Z%])/g,function(t,r){if("%%"===t)return t;s++;var o=n.formatters[r];if("function"==typeof o){var a=i[s];t=o.call(e,a),i.splice(s,1),s--}return t}),n.formatArgs.call(e,i);var u=t.log||n.log||console.log.bind(console);u.apply(e,i)}}return t.namespace=e,t.enabled=n.enabled(e),t.useColors=n.useColors(),t.color=r(e),"function"==typeof n.init&&n.init(t),t}function i(e){n.save(e);for(var t=(e||"").split(/[\s,]+/),r=t.length,o=0;o<r;o++)t[o]&&(e=t[o].replace(/\*/g,".*?"),"-"===e[0]?n.skips.push(new RegExp("^"+e.substr(1)+"$")):n.names.push(new RegExp("^"+e+"$")))}function a(){n.enable("")}function s(e){var t,r;for(t=0,r=n.skips.length;t<r;t++)if(n.skips[t].test(e))return!1;for(t=0,r=n.names.length;t<r;t++)if(n.names[t].test(e))return!0;return!1}function u(e){return e instanceof Error?e.stack||e.message:e}n=t.exports=o.debug=o.default=o,n.coerce=u,n.disable=a,n.enable=i,n.enabled=s,n.humanize=e(8),n.names=[],n.skips=[],n.formatters={};var c},{8:8}],4:[function(e,t,n){function r(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}function o(e){return"function"==typeof e}function i(e){return"number"==typeof e}function a(e){return"object"==typeof e&&null!==e}function s(e){return void 0===e}t.exports=r,r.EventEmitter=r,r.prototype._events=void 0,r.prototype._maxListeners=void 0,r.defaultMaxListeners=10,r.prototype.setMaxListeners=function(e){if(!i(e)||e<0||isNaN(e))throw TypeError("n must be a positive number");return this._maxListeners=e,this},r.prototype.emit=function(e){var t,n,r,i,u,c;if(this._events||(this._events={}),"error"===e&&(!this._events.error||a(this._events.error)&&!this._events.error.length)){if(t=arguments[1],t instanceof Error)throw t;var f=new Error('Uncaught, unspecified "error" event. ('+t+")");throw f.context=t,f}if(n=this._events[e],s(n))return!1;if(o(n))switch(arguments.length){case 1:n.call(this);break;case 2:n.call(this,arguments[1]);break;case 3:n.call(this,arguments[1],arguments[2]);break;default:i=Array.prototype.slice.call(arguments,1),n.apply(this,i)}else if(a(n))for(i=Array.prototype.slice.call(arguments,1),c=n.slice(),r=c.length,u=0;u<r;u++)c[u].apply(this,i);return!0},r.prototype.addListener=function(e,t){var n;if(!o(t))throw TypeError("listener must be a function");return this._events||(this._events={}),this._events.newListener&&this.emit("newListener",e,o(t.listener)?t.listener:t),this._events[e]?a(this._events[e])?this._events[e].push(t):this._events[e]=[this._events[e],t]:this._events[e]=t,a(this._events[e])&&!this._events[e].warned&&(n=s(this._maxListeners)?r.defaultMaxListeners:this._maxListeners,n&&n>0&&this._events[e].length>n&&(this._events[e].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[e].length),"function"==typeof console.trace&&console.trace())),this},r.prototype.on=r.prototype.addListener,r.prototype.once=function(e,t){function n(){this.removeListener(e,n),r||(r=!0,t.apply(this,arguments))}if(!o(t))throw TypeError("listener must be a function");var r=!1;return n.listener=t,this.on(e,n),this},r.prototype.removeListener=function(e,t){var n,r,i,s;if(!o(t))throw TypeError("listener must be a function");if(!this._events||!this._events[e])return this;if(n=this._events[e],i=n.length,r=-1,n===t||o(n.listener)&&n.listener===t)delete this._events[e],this._events.removeListener&&this.emit("removeListener",e,t);else if(a(n)){for(s=i;s-- >0;)if(n[s]===t||n[s].listener&&n[s].listener===t){r=s;break}if(r<0)return this;1===n.length?(n.length=0,delete this._events[e]):n.splice(r,1),this._events.removeListener&&this.emit("removeListener",e,t)}return this},r.prototype.removeAllListeners=function(e){var t,n;if(!this._events)return this;if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[e]&&delete this._events[e],this;if(0===arguments.length){for(t in this._events)"removeListener"!==t&&this.removeAllListeners(t);return this.removeAllListeners("removeListener"),this._events={},this}if(n=this._events[e],o(n))this.removeListener(e,n);else if(n)for(;n.length;)this.removeListener(e,n[n.length-1]);return delete this._events[e],this},r.prototype.listeners=function(e){var t;return t=this._events&&this._events[e]?o(this._events[e])?[this._events[e]]:this._events[e].slice():[]},r.prototype.listenerCount=function(e){if(this._events){var t=this._events[e];if(o(t))return 1;if(t)return t.length}return 0},r.listenerCount=function(e,t){return e.listenerCount(t)}},{}],5:[function(e,t,n){(function(e){"use strict";function n(){f=!0;for(var e,t,n=l.length;n;){for(t=l,l=[],e=-1;++e<n;)t[e]();n=l.length}f=!1}function r(e){1!==l.push(e)||f||o()}var o,i=e.MutationObserver||e.WebKitMutationObserver;if(i){var a=0,s=new i(n),u=e.document.createTextNode("");s.observe(u,{characterData:!0}),o=function(){u.data=a=++a%2}}else if(e.setImmediate||"undefined"==typeof e.MessageChannel)o="document"in e&&"onreadystatechange"in e.document.createElement("script")?function(){var t=e.document.createElement("script");t.onreadystatechange=function(){n(),t.onreadystatechange=null,t.parentNode.removeChild(t),t=null},e.document.documentElement.appendChild(t)}:function(){setTimeout(n,0)};else{var c=new e.MessageChannel;c.port1.onmessage=n,o=function(){c.port2.postMessage(0)}}var f,l=[];t.exports=r}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],6:[function(e,t,n){"function"==typeof Object.create?t.exports=function(e,t){e.super_=t,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}})}:t.exports=function(e,t){e.super_=t;var n=function(){};n.prototype=t.prototype,e.prototype=new n,e.prototype.constructor=e}},{}],7:[function(e,t,n){"use strict";function r(){}function o(e){if("function"!=typeof e)throw new TypeError("resolver must be a function");this.state=m,this.queue=[],this.outcome=void 0,e!==r&&u(this,e)}function i(e,t,n){this.promise=e,"function"==typeof t&&(this.onFulfilled=t,this.callFulfilled=this.otherCallFulfilled),"function"==typeof n&&(this.onRejected=n,this.callRejected=this.otherCallRejected)}function a(e,t,n){p(function(){var r;try{r=t(n)}catch(t){return v.reject(e,t)}r===e?v.reject(e,new TypeError("Cannot resolve promise with itself")):v.resolve(e,r)})}function s(e){var t=e&&e.then;if(e&&"object"==typeof e&&"function"==typeof t)return function(){t.apply(e,arguments)}}function u(e,t){function n(t){i||(i=!0,v.reject(e,t))}function r(t){i||(i=!0,v.resolve(e,t))}function o(){t(r,n)}var i=!1,a=c(o);"error"===a.status&&n(a.value)}function c(e,t){var n={};try{n.value=e(t),n.status="success"}catch(e){n.status="error",n.value=e}return n}function f(e){return e instanceof this?e:v.resolve(new this(r),e)}function l(e){var t=new this(r);return v.reject(t,e)}function d(e){function t(e,t){function r(e){a[t]=e,++s!==o||i||(i=!0,v.resolve(c,a))}n.resolve(e).then(r,function(e){i||(i=!0,v.reject(c,e))})}var n=this;if("[object Array]"!==Object.prototype.toString.call(e))return this.reject(new TypeError("must be an array"));var o=e.length,i=!1;if(!o)return this.resolve([]);for(var a=new Array(o),s=0,u=-1,c=new this(r);++u<o;)t(e[u],u);return c}function h(e){function t(e){n.resolve(e).then(function(e){i||(i=!0,v.resolve(s,e))},function(e){i||(i=!0,v.reject(s,e))})}var n=this;if("[object Array]"!==Object.prototype.toString.call(e))return this.reject(new TypeError("must be an array"));var o=e.length,i=!1;if(!o)return this.resolve([]);for(var a=-1,s=new this(r);++a<o;)t(e[a]);return s}var p=e(5),v={},y=["REJECTED"],_=["FULFILLED"],m=["PENDING"];t.exports=o,o.prototype.catch=function(e){return this.then(null,e)},o.prototype.then=function(e,t){if("function"!=typeof e&&this.state===_||"function"!=typeof t&&this.state===y)return this;var n=new this.constructor(r);if(this.state!==m){var o=this.state===_?e:t;a(n,o,this.outcome)}else this.queue.push(new i(n,e,t));return n},i.prototype.callFulfilled=function(e){v.resolve(this.promise,e)},i.prototype.otherCallFulfilled=function(e){a(this.promise,this.onFulfilled,e)},i.prototype.callRejected=function(e){v.reject(this.promise,e)},i.prototype.otherCallRejected=function(e){a(this.promise,this.onRejected,e)},v.resolve=function(e,t){var n=c(s,t);if("error"===n.status)return v.reject(e,n.value);var r=n.value;if(r)u(e,r);else{e.state=_,e.outcome=t;for(var o=-1,i=e.queue.length;++o<i;)e.queue[o].callFulfilled(t)}return e},v.reject=function(e,t){e.state=y,e.outcome=t;for(var n=-1,r=e.queue.length;++n<r;)e.queue[n].callRejected(t);return e},o.resolve=f,o.reject=l,o.all=d,o.race=h},{5:5}],8:[function(e,t,n){function r(e){if(e=String(e),!(e.length>1e4)){var t=/^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*l;case"days":case"day":case"d":return n*f;case"hours":case"hour":case"hrs":case"hr":case"h":return n*c;case"minutes":case"minute":case"mins":case"min":case"m":return n*u;case"seconds":case"second":case"secs":case"sec":case"s":return n*s;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function o(e){return e>=f?Math.round(e/f)+"d":e>=c?Math.round(e/c)+"h":e>=u?Math.round(e/u)+"m":e>=s?Math.round(e/s)+"s":e+"ms"}function i(e){return a(e,f,"day")||a(e,c,"hour")||a(e,u,"minute")||a(e,s,"second")||e+" ms"}function a(e,t,n){if(!(e<t))return e<1.5*t?Math.floor(e/t)+" "+n:Math.ceil(e/t)+" "+n+"s"}var s=1e3,u=60*s,c=60*u,f=24*c,l=365.25*f;t.exports=function(e,t){t=t||{};var n=typeof e;if("string"===n&&e.length>0)return r(e);if("number"===n&&isNaN(e)===!1)return t.long?i(e):o(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))}},{}],9:[function(e,t,n){function r(){throw new Error("setTimeout has not been defined")}function o(){throw new Error("clearTimeout has not been defined")}function i(e){if(l===setTimeout)return setTimeout(e,0);if((l===r||!l)&&setTimeout)return l=setTimeout,setTimeout(e,0);try{return l(e,0)}catch(t){try{return l.call(null,e,0)}catch(t){return l.call(this,e,0)}}}function a(e){if(d===clearTimeout)return clearTimeout(e);if((d===o||!d)&&clearTimeout)return d=clearTimeout,clearTimeout(e);try{return d(e)}catch(t){try{return d.call(null,e)}catch(t){return d.call(this,e)}}}function s(){y&&p&&(y=!1,p.length?v=p.concat(v):_=-1,v.length&&u())}function u(){if(!y){var e=i(s);y=!0;for(var t=v.length;t;){for(p=v,v=[];++_<t;)p&&p[_].run();_=-1,t=v.length}p=null,y=!1,a(e)}}function c(e,t){this.fun=e,this.array=t}function f(){}var l,d,h=t.exports={};!function(){try{l="function"==typeof setTimeout?setTimeout:r}catch(e){l=r}try{d="function"==typeof clearTimeout?clearTimeout:o}catch(e){d=o}}();var p,v=[],y=!1,_=-1;h.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];v.push(new c(e,t)),1!==v.length||y||i(u)},c.prototype.run=function(){this.fun.apply(null,this.array)},h.title="browser",h.browser=!0,h.env={},h.argv=[],h.version="",h.versions={},h.on=f,h.addListener=f,h.once=f,h.off=f,h.removeListener=f,h.removeAllListeners=f,h.emit=f,h.binding=function(e){throw new Error("process.binding is not supported")},h.cwd=function(){return"/"},h.chdir=function(e){throw new Error("process.chdir is not supported")},h.umask=function(){return 0}},{}],10:[function(e,t,n){(function(){var e={}.hasOwnProperty,n=[].slice;t.exports=function(t,r){var o,i,a,s;i=[],s=[];for(o in r)e.call(r,o)&&(a=r[o],"this"!==o&&(i.push(o),s.push(a)));return Function.apply(null,n.call(i).concat([t])).apply(r.this,s)}}).call(this)},{}],11:[function(t,n,r){!function(t){if("object"==typeof r)n.exports=t();else if("function"==typeof e&&e.amd)e(t);else{var o;try{o=window}catch(e){o=self}o.SparkMD5=t()}}(function(e){"use strict";function t(e,t){var n=e[0],r=e[1],o=e[2],i=e[3];n+=(r&o|~r&i)+t[0]-680876936|0,n=(n<<7|n>>>25)+r|0,i+=(n&r|~n&o)+t[1]-389564586|0,i=(i<<12|i>>>20)+n|0,o+=(i&n|~i&r)+t[2]+606105819|0,o=(o<<17|o>>>15)+i|0,r+=(o&i|~o&n)+t[3]-1044525330|0,r=(r<<22|r>>>10)+o|0,n+=(r&o|~r&i)+t[4]-176418897|0,n=(n<<7|n>>>25)+r|0,i+=(n&r|~n&o)+t[5]+1200080426|0,i=(i<<12|i>>>20)+n|0,o+=(i&n|~i&r)+t[6]-1473231341|0,o=(o<<17|o>>>15)+i|0,r+=(o&i|~o&n)+t[7]-45705983|0,r=(r<<22|r>>>10)+o|0,n+=(r&o|~r&i)+t[8]+1770035416|0,n=(n<<7|n>>>25)+r|0,i+=(n&r|~n&o)+t[9]-1958414417|0,i=(i<<12|i>>>20)+n|0,o+=(i&n|~i&r)+t[10]-42063|0,o=(o<<17|o>>>15)+i|0,r+=(o&i|~o&n)+t[11]-1990404162|0,r=(r<<22|r>>>10)+o|0,n+=(r&o|~r&i)+t[12]+1804603682|0,n=(n<<7|n>>>25)+r|0,i+=(n&r|~n&o)+t[13]-40341101|0,i=(i<<12|i>>>20)+n|0,o+=(i&n|~i&r)+t[14]-1502002290|0,o=(o<<17|o>>>15)+i|0,r+=(o&i|~o&n)+t[15]+1236535329|0,r=(r<<22|r>>>10)+o|0,n+=(r&i|o&~i)+t[1]-165796510|0,n=(n<<5|n>>>27)+r|0,i+=(n&o|r&~o)+t[6]-1069501632|0,i=(i<<9|i>>>23)+n|0,o+=(i&r|n&~r)+t[11]+643717713|0,o=(o<<14|o>>>18)+i|0,r+=(o&n|i&~n)+t[0]-373897302|0,r=(r<<20|r>>>12)+o|0,n+=(r&i|o&~i)+t[5]-701558691|0,n=(n<<5|n>>>27)+r|0,i+=(n&o|r&~o)+t[10]+38016083|0,i=(i<<9|i>>>23)+n|0,o+=(i&r|n&~r)+t[15]-660478335|0,o=(o<<14|o>>>18)+i|0,r+=(o&n|i&~n)+t[4]-405537848|0,r=(r<<20|r>>>12)+o|0,n+=(r&i|o&~i)+t[9]+568446438|0,n=(n<<5|n>>>27)+r|0,i+=(n&o|r&~o)+t[14]-1019803690|0,i=(i<<9|i>>>23)+n|0,o+=(i&r|n&~r)+t[3]-187363961|0,o=(o<<14|o>>>18)+i|0,r+=(o&n|i&~n)+t[8]+1163531501|0,r=(r<<20|r>>>12)+o|0,n+=(r&i|o&~i)+t[13]-1444681467|0,n=(n<<5|n>>>27)+r|0,i+=(n&o|r&~o)+t[2]-51403784|0,i=(i<<9|i>>>23)+n|0,o+=(i&r|n&~r)+t[7]+1735328473|0,o=(o<<14|o>>>18)+i|0,r+=(o&n|i&~n)+t[12]-1926607734|0,r=(r<<20|r>>>12)+o|0,n+=(r^o^i)+t[5]-378558|0,n=(n<<4|n>>>28)+r|0,i+=(n^r^o)+t[8]-2022574463|0,i=(i<<11|i>>>21)+n|0,o+=(i^n^r)+t[11]+1839030562|0,o=(o<<16|o>>>16)+i|0,r+=(o^i^n)+t[14]-35309556|0,r=(r<<23|r>>>9)+o|0,n+=(r^o^i)+t[1]-1530992060|0,n=(n<<4|n>>>28)+r|0,i+=(n^r^o)+t[4]+1272893353|0,i=(i<<11|i>>>21)+n|0,o+=(i^n^r)+t[7]-155497632|0,o=(o<<16|o>>>16)+i|0,r+=(o^i^n)+t[10]-1094730640|0,r=(r<<23|r>>>9)+o|0,n+=(r^o^i)+t[13]+681279174|0,n=(n<<4|n>>>28)+r|0,i+=(n^r^o)+t[0]-358537222|0,i=(i<<11|i>>>21)+n|0,o+=(i^n^r)+t[3]-722521979|0,o=(o<<16|o>>>16)+i|0,r+=(o^i^n)+t[6]+76029189|0,r=(r<<23|r>>>9)+o|0,n+=(r^o^i)+t[9]-640364487|0,n=(n<<4|n>>>28)+r|0,i+=(n^r^o)+t[12]-421815835|0,i=(i<<11|i>>>21)+n|0,o+=(i^n^r)+t[15]+530742520|0,o=(o<<16|o>>>16)+i|0,r+=(o^i^n)+t[2]-995338651|0,r=(r<<23|r>>>9)+o|0,n+=(o^(r|~i))+t[0]-198630844|0,n=(n<<6|n>>>26)+r|0,i+=(r^(n|~o))+t[7]+1126891415|0,i=(i<<10|i>>>22)+n|0,o+=(n^(i|~r))+t[14]-1416354905|0,o=(o<<15|o>>>17)+i|0,r+=(i^(o|~n))+t[5]-57434055|0,r=(r<<21|r>>>11)+o|0,n+=(o^(r|~i))+t[12]+1700485571|0,n=(n<<6|n>>>26)+r|0,i+=(r^(n|~o))+t[3]-1894986606|0,i=(i<<10|i>>>22)+n|0,o+=(n^(i|~r))+t[10]-1051523|0,o=(o<<15|o>>>17)+i|0,r+=(i^(o|~n))+t[1]-2054922799|0,r=(r<<21|r>>>11)+o|0,n+=(o^(r|~i))+t[8]+1873313359|0,n=(n<<6|n>>>26)+r|0,i+=(r^(n|~o))+t[15]-30611744|0,i=(i<<10|i>>>22)+n|0,o+=(n^(i|~r))+t[6]-1560198380|0,o=(o<<15|o>>>17)+i|0,r+=(i^(o|~n))+t[13]+1309151649|0,r=(r<<21|r>>>11)+o|0,n+=(o^(r|~i))+t[4]-145523070|0,n=(n<<6|n>>>26)+r|0,i+=(r^(n|~o))+t[11]-1120210379|0,i=(i<<10|i>>>22)+n|0,o+=(n^(i|~r))+t[2]+718787259|0,o=(o<<15|o>>>17)+i|0,r+=(i^(o|~n))+t[9]-343485551|0,r=(r<<21|r>>>11)+o|0,e[0]=n+e[0]|0,e[1]=r+e[1]|0,e[2]=o+e[2]|0,e[3]=i+e[3]|0}function n(e){var t,n=[];for(t=0;t<64;t+=4)n[t>>2]=e.charCodeAt(t)+(e.charCodeAt(t+1)<<8)+(e.charCodeAt(t+2)<<16)+(e.charCodeAt(t+3)<<24);return n}function r(e){var t,n=[];for(t=0;t<64;t+=4)n[t>>2]=e[t]+(e[t+1]<<8)+(e[t+2]<<16)+(e[t+3]<<24);return n}function o(e){var r,o,i,a,s,u,c=e.length,f=[1732584193,-271733879,-1732584194,271733878];for(r=64;r<=c;r+=64)t(f,n(e.substring(r-64,r)));for(e=e.substring(r-64),o=e.length,i=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],r=0;r<o;r+=1)i[r>>2]|=e.charCodeAt(r)<<(r%4<<3);if(i[r>>2]|=128<<(r%4<<3),r>55)for(t(f,i),r=0;r<16;r+=1)i[r]=0;return a=8*c,a=a.toString(16).match(/(.*?)(.{0,8})$/),s=parseInt(a[2],16),u=parseInt(a[1],16)||0,i[14]=s,i[15]=u,t(f,i),f}function i(e){var n,o,i,a,s,u,c=e.length,f=[1732584193,-271733879,-1732584194,271733878];for(n=64;n<=c;n+=64)t(f,r(e.subarray(n-64,n)));for(e=n-64<c?e.subarray(n-64):new Uint8Array(0),o=e.length,i=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],n=0;n<o;n+=1)i[n>>2]|=e[n]<<(n%4<<3);if(i[n>>2]|=128<<(n%4<<3),n>55)for(t(f,i),n=0;n<16;n+=1)i[n]=0;return a=8*c,a=a.toString(16).match(/(.*?)(.{0,8})$/),s=parseInt(a[2],16),u=parseInt(a[1],16)||0,i[14]=s,i[15]=u,t(f,i),f}function a(e){var t,n="";for(t=0;t<4;t+=1)n+=v[e>>8*t+4&15]+v[e>>8*t&15];return n}function s(e){var t;for(t=0;t<e.length;t+=1)e[t]=a(e[t]);return e.join("")}function u(e){return/[\u0080-\uFFFF]/.test(e)&&(e=unescape(encodeURIComponent(e))),e}function c(e,t){var n,r=e.length,o=new ArrayBuffer(r),i=new Uint8Array(o);for(n=0;n<r;n+=1)i[n]=e.charCodeAt(n);return t?i:o}function f(e){return String.fromCharCode.apply(null,new Uint8Array(e))}function l(e,t,n){var r=new Uint8Array(e.byteLength+t.byteLength);return r.set(new Uint8Array(e)),r.set(new Uint8Array(t),e.byteLength),n?r:r.buffer}function d(e){var t,n=[],r=e.length;for(t=0;t<r-1;t+=2)n.push(parseInt(e.substr(t,2),16));return String.fromCharCode.apply(String,n)}function h(){this.reset()}var p=function(e,t){return e+t&4294967295},v=["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];return"5d41402abc4b2a76b9719d911017c592"!==s(o("hello"))&&(p=function(e,t){var n=(65535&e)+(65535&t),r=(e>>16)+(t>>16)+(n>>16);return r<<16|65535&n}),"undefined"==typeof ArrayBuffer||ArrayBuffer.prototype.slice||!function(){function t(e,t){return e=0|e||0,e<0?Math.max(e+t,0):Math.min(e,t)}ArrayBuffer.prototype.slice=function(n,r){var o,i,a,s,u=this.byteLength,c=t(n,u),f=u;return r!==e&&(f=t(r,u)),c>f?new ArrayBuffer(0):(o=f-c,i=new ArrayBuffer(o),a=new Uint8Array(i),s=new Uint8Array(this,c,o),a.set(s),i)}}(),h.prototype.append=function(e){return this.appendBinary(u(e)),this},h.prototype.appendBinary=function(e){this._buff+=e,this._length+=e.length;var r,o=this._buff.length;for(r=64;r<=o;r+=64)t(this._hash,n(this._buff.substring(r-64,r)));return this._buff=this._buff.substring(r-64),this},h.prototype.end=function(e){var t,n,r=this._buff,o=r.length,i=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];for(t=0;t<o;t+=1)i[t>>2]|=r.charCodeAt(t)<<(t%4<<3);return this._finish(i,o),n=s(this._hash),e&&(n=d(n)),this.reset(),n},h.prototype.reset=function(){return this._buff="",this._length=0,this._hash=[1732584193,-271733879,-1732584194,271733878],this},h.prototype.getState=function(){return{buff:this._buff,length:this._length,hash:this._hash}},h.prototype.setState=function(e){return this._buff=e.buff,this._length=e.length,this._hash=e.hash,this},h.prototype.destroy=function(){delete this._hash,delete this._buff,delete this._length},h.prototype._finish=function(e,n){var r,o,i,a=n;if(e[a>>2]|=128<<(a%4<<3),a>55)for(t(this._hash,e),a=0;a<16;a+=1)e[a]=0;r=8*this._length,r=r.toString(16).match(/(.*?)(.{0,8})$/),o=parseInt(r[2],16),i=parseInt(r[1],16)||0,e[14]=o,e[15]=i,t(this._hash,e)},h.hash=function(e,t){return h.hashBinary(u(e),t)},h.hashBinary=function(e,t){var n=o(e),r=s(n);return t?d(r):r},h.ArrayBuffer=function(){this.reset()},h.ArrayBuffer.prototype.append=function(e){var n,o=l(this._buff.buffer,e,!0),i=o.length;for(this._length+=e.byteLength,n=64;n<=i;n+=64)t(this._hash,r(o.subarray(n-64,n)));return this._buff=n-64<i?new Uint8Array(o.buffer.slice(n-64)):new Uint8Array(0),this},h.ArrayBuffer.prototype.end=function(e){var t,n,r=this._buff,o=r.length,i=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];for(t=0;t<o;t+=1)i[t>>2]|=r[t]<<(t%4<<3);return this._finish(i,o),n=s(this._hash),e&&(n=d(n)),this.reset(),n},h.ArrayBuffer.prototype.reset=function(){return this._buff=new Uint8Array(0),this._length=0,this._hash=[1732584193,-271733879,-1732584194,271733878],this},h.ArrayBuffer.prototype.getState=function(){var e=h.prototype.getState.call(this);return e.buff=f(e.buff),e},h.ArrayBuffer.prototype.setState=function(e){return e.buff=c(e.buff,!0),h.prototype.setState.call(this,e)},h.ArrayBuffer.prototype.destroy=h.prototype.destroy,h.ArrayBuffer.prototype._finish=h.prototype._finish,h.ArrayBuffer.hash=function(e,t){var n=i(new Uint8Array(e)),r=s(n);return t?d(r):r},h})},{}],12:[function(e,t,n){"use strict";function r(e,t,n){var r=n[n.length-1];e===r.element&&(n.pop(),r=n[n.length-1]);var o=r.element,i=r.index;if(Array.isArray(o))o.push(e);else if(i===t.length-2){var a=t.pop();o[a]=e}else t.push(e)}n.stringify=function(e){var t=[];t.push({obj:e});for(var n,r,o,i,a,s,u,c,f,l,d,h="";n=t.pop();)if(r=n.obj,o=n.prefix||"",i=n.val||"",h+=o,i)h+=i;else if("object"!=typeof r)h+="undefined"==typeof r?null:JSON.stringify(r);else if(null===r)h+="null";else if(Array.isArray(r)){for(t.push({val:"]"}),a=r.length-1;a>=0;a--)s=0===a?"":",",t.push({obj:r[a],prefix:s});t.push({val:"["})}else{u=[];for(c in r)r.hasOwnProperty(c)&&u.push(c);for(t.push({val:"}"}),a=u.length-1;a>=0;a--)f=u[a],l=r[f],d=a>0?",":"",d+=JSON.stringify(f)+":",t.push({obj:l,prefix:d});t.push({val:"{"})}return h},n.parse=function(e){for(var t,n,o,i,a,s,u,c,f,l=[],d=[],h=0;;)if(t=e[h++],"}"!==t&&"]"!==t&&"undefined"!=typeof t)switch(t){case" ":case"\t":case"\n":case":":case",":break;case"n":h+=3,r(null,l,d);break;case"t":h+=3,r(!0,l,d);break;case"f":h+=4,r(!1,l,d);break;case"0":case"1":case"2":case"3":case"4":case"5":case"6":case"7":case"8":case"9":case"-":for(n="",h--;;){if(o=e[h++],!/[\d\.\-e\+]/.test(o)){h--;break}n+=o}r(parseFloat(n),l,d);break;case'"':for(i="",a=void 0,s=0;;){if(u=e[h++],'"'===u&&("\\"!==a||s%2!==1))break;i+=u,a=u,"\\"===a?s++:s=0}r(JSON.parse('"'+i+'"'),l,d);break;case"[":c={element:[],index:l.length},l.push(c.element),d.push(c);break;case"{":f={element:{},index:l.length},l.push(f.element),d.push(f);break;default:throw new Error("unexpectedly reached end of input: "+t)}else{if(1===l.length)return l.pop();r(l.pop(),l,d)}}},{}],13:[function(e,t,n){(function(n){"use strict";function r(e){return e&&"object"==typeof e&&"default"in e?e.default:e}function o(e){return"undefined"!=typeof ArrayBuffer&&e instanceof ArrayBuffer||"undefined"!=typeof Blob&&e instanceof Blob}function i(e){if("function"==typeof e.slice)return e.slice(0);var t=new ArrayBuffer(e.byteLength),n=new Uint8Array(t),r=new Uint8Array(e);return n.set(r),t}function a(e){if(e instanceof ArrayBuffer)return i(e);var t=e.size,n=e.type;return"function"==typeof e.slice?e.slice(0,t,n):e.webkitSlice(0,t,n)}function s(e){var t=Object.getPrototypeOf(e);if(null===t)return!0;var n=t.constructor;return"function"==typeof n&&n instanceof n&&Rr.call(n)==Nr}function u(e){var t,n,r;if(!e||"object"!=typeof e)return e;if(Array.isArray(e)){for(t=[],n=0,r=e.length;n<r;n++)t[n]=u(e[n]);return t}if(e instanceof Date)return e.toISOString();if(o(e))return a(e);if(!s(e))return e;t={};for(n in e)if(Object.prototype.hasOwnProperty.call(e,n)){var i=u(e[n]);"undefined"!=typeof i&&(t[n]=i)}return t}function c(e){var t=!1;return Ar(function(n){if(t)throw new Error("once called more than once");t=!0,e.apply(this,n)})}function f(e){return Ar(function(t){t=u(t);var n=this,r="function"==typeof t[t.length-1]&&t.pop(),o=new Dr(function(r,o){var i;try{var a=c(function(e,t){e?o(e):r(t)});t.push(a),i=e.apply(n,t),i&&"function"==typeof i.then&&r(i)}catch(e){o(e)}});return r&&o.then(function(e){r(null,e)},r),o})}function l(e,t){function n(e,t,n){if(Br.enabled){for(var r=[e.name,t],o=0;o<n.length-1;o++)r.push(n[o]);Br.apply(null,r);var i=n[n.length-1];n[n.length-1]=function(n,r){var o=[e.name,t];o=o.concat(n?["error",n]:["success",r]),Br.apply(null,o),i(n,r)}}}return f(Ar(function(r){if(this._closed)return Dr.reject(new Error("database is closed"));if(this._destroyed)return Dr.reject(new Error("database is destroyed"));var o=this;return n(o,e,r),this.taskqueue.isReady?t.apply(this,r):new Dr(function(t,n){o.taskqueue.addTask(function(i){i?n(i):t(o[e].apply(o,r))})})}))}function d(e){return"$"+e}function h(e){return e.substring(1)}function p(){this._store={}}function v(e){if(this._store=new p,e&&Array.isArray(e))for(var t=0,n=e.length;t<n;t++)this.add(e[t])}function y(){if("undefined"==typeof Symbol||"undefined"==typeof Map||"undefined"==typeof Set)return!1;var e=Object.getOwnPropertyDescriptor(Map,Symbol.species);return e&&"get"in e&&Map[Symbol.species]===Map}function _(e,t){for(var n={},r=0,o=t.length;r<o;r++){var i=t[r];i in e&&(n[i]=e[i])}return n}function m(e){return e}function g(e){return[{ok:e}]}function b(e,t,n){function r(){var e=[];d.forEach(function(t){t.docs.forEach(function(n){e.push({id:t.id,docs:[n]})})}),n(null,{results:e})}function o(){++l===f&&r()}function i(e,t,n){d[e]={id:t,docs:n},o()}function a(){if(!(p>=h.length)){var e=Math.min(p+Pr,h.length),t=h.slice(p,e);s(t,p),p+=t.length}}function s(n,r){n.forEach(function(n,o){var s=r+o,u=c.get(n),f=_(u[0],["atts_since","attachments"]);f.open_revs=u.map(function(e){return e.rev}),f.open_revs=f.open_revs.filter(m);var l=m;0===f.open_revs.length&&(delete f.open_revs,l=g),["revs","attachments","binary","ajax","latest"].forEach(function(e){e in t&&(f[e]=t[e])}),e.get(n,f,function(e,t){var r;r=e?[{error:e}]:l(t),i(s,n,r),a()})})}var u=t.docs,c=new Mr;u.forEach(function(e){c.has(e.id)?c.get(e.id).push(e):c.set(e.id,[e])});var f=c.size,l=0,d=new Array(f),h=[];c.forEach(function(e,t){h.push(t)});var p=0;a()}function w(){return"undefined"!=typeof chrome&&"undefined"!=typeof chrome.storage&&"undefined"!=typeof chrome.storage.local}function E(){return Ur}function S(e){w()?chrome.storage.onChanged.addListener(function(t){null!=t.db_name&&e.emit(t.dbName.newValue)}):E()&&("undefined"!=typeof addEventListener?addEventListener("storage",function(t){e.emit(t.key)}):window.attachEvent("storage",function(t){e.emit(t.key)}))}function k(){Tr.EventEmitter.call(this),this._listeners={},S(this)}function q(e){if("undefined"!==console&&e in console){var t=Array.prototype.slice.call(arguments,1);console[e].apply(console,t)}}function A(e,t){var n=6e5;e=parseInt(e,10)||0,t=parseInt(t,10),t!==t||t<=e?t=(e||1)<<1:t+=1,t>n&&(e=n>>1,t=n);var r=Math.random(),o=t-e;return~~(o*r+e)}function x(e){var t=0;return e||(t=2e3),A(e,t)}function T(e,t){q("info","The above "+e+" is totally normal. "+t)}function O(e,t,n){Error.call(this,n),this.status=e,this.name=t,this.message=n,this.error=!0}function j(e,t){function n(t){for(var n in e)"function"!=typeof e[n]&&(this[n]=e[n]);void 0!==t&&(this.reason=t)}return n.prototype=O.prototype,new n(t)}function C(e){if("object"!=typeof e){var t=e;e=$r,e.data=t}return"error"in e&&"conflict"===e.error&&(e.name="conflict",e.status=409),"name"in e||(e.name=e.error||"unknown"),"status"in e||(e.status=500),"message"in e||(e.message=e.message||e.reason),e}function L(e,t,n){try{return!e(t,n)}catch(e){var r="Filter function threw: "+e.toString();return j(to,r)}}function I(e){var t={},n=e.filter&&"function"==typeof e.filter;return t.query=e.query_params,function(r){r.doc||(r.doc={});var o=n&&L(e.filter,r.doc,t);if("object"==typeof o)return o;if(o)return!1;if(e.include_docs){if(!e.attachments)for(var i in r.doc._attachments)r.doc._attachments.hasOwnProperty(i)&&(r.doc._attachments[i].stub=!0)}else delete r.doc;return!0}}function D(e){for(var t=[],n=0,r=e.length;n<r;n++)t=t.concat(e[n]);return t}function R(){}function N(e){var t;if(e?"string"!=typeof e?t=j(Gr):/^_/.test(e)&&!/^_(design|local)/.test(e)&&(t=j(Qr)):t=j(Vr),t)throw t}function B(e,t){return"listenerCount"in e?e.listenerCount(t):Tr.EventEmitter.listenerCount(e,t)}function F(e){if(!e)return null;var t=e.split("/");return 2===t.length?t:1===t.length?[e,e]:null}function M(e){var t=F(e);return t?t.join("/"):null}function U(e){for(var t=lo.exec(e),n={},r=14;r--;){var o=uo[r],i=t[r]||"",a=["user","password"].indexOf(o)!==-1;n[o]=a?decodeURIComponent(i):i}return n[co]={},n[uo[12]].replace(fo,function(e,t,r){t&&(n[co][t]=r)}),n}function P(e,t,n){return new Dr(function(r,o){e.get(t,function(i,a){if(i){if(404!==i.status)return o(i);a={}}var s=a._rev,u=n(a);return u?(u._id=t,u._rev=s,void r(H(e,u,n))):r({updated:!1,rev:s})})})}function H(e,t,n){return e.put(t).then(function(e){return{updated:!0,rev:e.rev}},function(r){if(409!==r.status)throw r;return P(e,t._id,n)})}function W(e){return 0|Math.random()*e}function J(e,t){t=t||ho.length;var n="",r=-1;if(e){for(;++r<e;)n+=ho[W(t)];return n}for(;++r<36;)switch(r){case 8:case 13:case 18:case 23:n+="-";break;case 19:n+=ho[3&W(16)|8];break;default:n+=ho[W(16)]}return n}function K(e){for(var t,n,r,o,i=e.rev_tree.slice();o=i.pop();){var a=o.ids,s=a[2],u=o.pos;if(s.length)for(var c=0,f=s.length;c<f;c++)i.push({pos:u+1,ids:s[c]});else{var l=!!a[1].deleted,d=a[0];t&&!(r!==l?r:n!==u?n<u:t<d)||(t=d,n=u,r=l)}}return n+"-"+t}function z(e,t){for(var n,r=e.slice();n=r.pop();)for(var o=n.pos,i=n.ids,a=i[2],s=t(0===a.length,o,i[0],n.ctx,i[1]),u=0,c=a.length;u<c;u++)r.push({pos:o+1,ids:a[u],ctx:s})}function X(e,t){return e.pos-t.pos}function G(e){var t=[];z(e,function(e,n,r,o,i){e&&t.push({rev:n+"-"+r,pos:n,
opts:i})}),t.sort(X).reverse();for(var n=0,r=t.length;n<r;n++)delete t[n].pos;return t}function V(e){for(var t=K(e),n=G(e.rev_tree),r=[],o=0,i=n.length;o<i;o++){var a=n[o];a.rev===t||a.opts.deleted||r.push(a.rev)}return r}function Q(e){var t=[];return z(e.rev_tree,function(e,n,r,o,i){"available"!==i.status||e||(t.push(n+"-"+r),i.status="missing")}),t}function $(e){for(var t,n=[],r=e.slice();t=r.pop();){var o=t.pos,i=t.ids,a=i[0],s=i[1],u=i[2],c=0===u.length,f=t.history?t.history.slice():[];f.push({id:a,opts:s}),c&&n.push({pos:o+1-f.length,ids:f});for(var l=0,d=u.length;l<d;l++)r.push({pos:o+1,ids:u[l],history:f})}return n.reverse()}function Y(e,t){return e.pos-t.pos}function Z(e,t,n){for(var r,o=0,i=e.length;o<i;)r=o+i>>>1,n(e[r],t)<0?o=r+1:i=r;return o}function ee(e,t,n){var r=Z(e,t,n);e.splice(r,0,t)}function te(e,t){for(var n,r,o=t,i=e.length;o<i;o++){var a=e[o],s=[a.id,a.opts,[]];r?(r[2].push(s),r=s):n=r=s}return n}function ne(e,t){return e[0]<t[0]?-1:1}function re(e,t){for(var n=[{tree1:e,tree2:t}],r=!1;n.length>0;){var o=n.pop(),i=o.tree1,a=o.tree2;(i[1].status||a[1].status)&&(i[1].status="available"===i[1].status||"available"===a[1].status?"available":"missing");for(var s=0;s<a[2].length;s++)if(i[2][0]){for(var u=!1,c=0;c<i[2].length;c++)i[2][c][0]===a[2][s][0]&&(n.push({tree1:i[2][c],tree2:a[2][s]}),u=!0);u||(r="new_branch",ee(i[2],a[2][s],ne))}else r="new_leaf",i[2][0]=a[2][s]}return{conflicts:r,tree:e}}function oe(e,t,n){var r,o=[],i=!1,a=!1;if(!e.length)return{tree:[t],conflicts:"new_leaf"};for(var s=0,u=e.length;s<u;s++){var c=e[s];if(c.pos===t.pos&&c.ids[0]===t.ids[0])r=re(c.ids,t.ids),o.push({pos:c.pos,ids:r.tree}),i=i||r.conflicts,a=!0;else if(n!==!0){var f=c.pos<t.pos?c:t,l=c.pos<t.pos?t:c,d=l.pos-f.pos,h=[],p=[];for(p.push({ids:f.ids,diff:d,parent:null,parentIdx:null});p.length>0;){var v=p.pop();if(0!==v.diff)for(var y=v.ids[2],_=0,m=y.length;_<m;_++)p.push({ids:y[_],diff:v.diff-1,parent:v.ids,parentIdx:_});else v.ids[0]===l.ids[0]&&h.push(v)}var g=h[0];g?(r=re(g.ids,l.ids),g.parent[2][g.parentIdx]=r.tree,o.push({pos:f.pos,ids:f.ids}),i=i||r.conflicts,a=!0):o.push(c)}else o.push(c)}return a||o.push(t),o.sort(Y),{tree:o,conflicts:i||"internal_node"}}function ie(e,t){for(var n,r,o=$(e),i=0,a=o.length;i<a;i++){var s,u=o[i],c=u.ids;if(c.length>t){n||(n={});var f=c.length-t;s={pos:u.pos+f,ids:te(c,f)};for(var l=0;l<f;l++){var d=u.pos+l+"-"+c[l].id;n[d]=!0}}else s={pos:u.pos,ids:te(c,0)};r=r?oe(r,s,!0).tree:[s]}return n&&z(r,function(e,t,r){delete n[t+"-"+r]}),{tree:r,revs:n?Object.keys(n):[]}}function ae(e,t,n){var r=oe(e,t),o=ie(r.tree,n);return{tree:o.tree,stemmedRevs:o.revs,conflicts:r.conflicts}}function se(e,t){for(var n,r=e.slice(),o=t.split("-"),i=parseInt(o[0],10),a=o[1];n=r.pop();){if(n.pos===i&&n.ids[0]===a)return!0;for(var s=n.ids[2],u=0,c=s.length;u<c;u++)r.push({pos:n.pos+1,ids:s[u]})}return!1}function ue(e){return e.ids}function ce(e,t){t||(t=K(e));for(var n,r=t.substring(t.indexOf("-")+1),o=e.rev_tree.map(ue);n=o.pop();){if(n[0]===r)return!!n[1].deleted;o=o.concat(n[2])}}function fe(e){return/^_local/.test(e)}function le(e,t){for(var n,r=t.rev_tree.slice();n=r.pop();){var o=n.pos,i=n.ids,a=i[0],s=i[1],u=i[2],c=0===u.length,f=n.history?n.history.slice():[];if(f.push({id:a,pos:o,opts:s}),c)for(var l=0,d=f.length;l<d;l++){var h=f[l],p=h.pos+"-"+h.id;if(p===e)return o+"-"+a}for(var v=0,y=u.length;v<y;v++)r.push({pos:o+1,ids:u[v],history:f})}throw new Error("Unable to resolve latest revision for id "+t.id+", rev "+e)}function de(e){return Cr('"use strict";\nreturn '+e+";",{})}function he(e){var t=["return function(doc) {",'  "use strict";',"  var emitted = false;","  var emit = function (a, b) {","    emitted = true;","  };","  var view = "+e+";","  view(doc);","  if (emitted) {","    return true;","  }","};"].join("\n");return Cr(t,{})}function pe(e,t){try{e.emit("change",t)}catch(e){q("error",'Error in .on("change", function):',e)}}function ve(e,t,n){function r(){o.cancel()}Tr.EventEmitter.call(this);var o=this;this.db=e,t=t?u(t):{};var i=t.complete=c(function(t,n){t?B(o,"error")>0&&o.emit("error",t):o.emit("complete",n),o.removeAllListeners(),e.removeListener("destroyed",r)});n&&(o.on("complete",function(e){n(null,e)}),o.on("error",n)),e.once("destroyed",r),t.onChange=function(e){o.isCancelled||pe(o,e)};var a=new Dr(function(e,n){t.complete=function(t,r){t?n(t):e(r)}});o.once("cancel",function(){e.removeListener("destroyed",r),t.complete(null,{status:"cancelled"})}),this.then=a.then.bind(a),this.catch=a.catch.bind(a),this.then(function(e){i(null,e)},i),e.taskqueue.isReady?o.doChanges(t):e.taskqueue.addTask(function(e){e?t.complete(e):o.isCancelled?o.emit("cancel"):o.doChanges(t)})}function ye(e,t,n){var r=[{rev:e._rev}];"all_docs"===n.style&&(r=G(t.rev_tree).map(function(e){return{rev:e.rev}}));var o={id:t.id,changes:r,doc:e};return ce(t,e._rev)&&(o.deleted=!0),n.conflicts&&(o.doc._conflicts=V(t),o.doc._conflicts.length||delete o.doc._conflicts),o}function _e(e,t){return e<t?-1:e>t?1:0}function me(e){return function(t,n){t||n[0]&&n[0].error?e(t||n[0]):e(null,n.length?n[0]:n)}}function ge(e){for(var t=0;t<e.length;t++){var n=e[t];if(n._deleted)delete n._attachments;else if(n._attachments)for(var r=Object.keys(n._attachments),o=0;o<r.length;o++){var i=r[o];n._attachments[i]=_(n._attachments[i],["data","digest","content_type","length","revpos","stub"])}}}function be(e,t){var n=_e(e._id,t._id);if(0!==n)return n;var r=e._revisions?e._revisions.start:0,o=t._revisions?t._revisions.start:0;return _e(r,o)}function we(e){var t={},n=[];return z(e,function(e,r,o,i){var a=r+"-"+o;return e&&(t[a]=0),void 0!==i&&n.push({from:i,to:a}),a}),n.reverse(),n.forEach(function(e){void 0===t[e.from]?t[e.from]=1+t[e.to]:t[e.from]=Math.min(t[e.from],1+t[e.to])}),t}function Ee(e,t,n){var r="limit"in t?t.keys.slice(t.skip,t.limit+t.skip):t.skip>0?t.keys.slice(t.skip):t.keys;if(t.descending&&r.reverse(),!r.length)return e._allDocs({limit:0},n);var o={offset:t.skip};return Dr.all(r.map(function(n){var r=Wr({key:n,deleted:"ok"},t);return["limit","skip","keys"].forEach(function(e){delete r[e]}),new Dr(function(t,i){e._allDocs(r,function(e,r){return e?i(e):(o.total_rows=r.total_rows,void t(r.rows[0]||{key:n,error:"not_found"}))})})})).then(function(e){return o.rows=e,o})}function Se(e){var t=e._compactionQueue[0],n=t.opts,r=t.callback;e.get("_local/compaction").catch(function(){return!1}).then(function(t){t&&t.last_seq&&(n.last_seq=t.last_seq),e._compact(n,function(t,n){t?r(t):r(null,n),jr(function(){e._compactionQueue.shift(),e._compactionQueue.length&&Se(e)})})})}function ke(e){return"_"===e.charAt(0)&&e+" is not a valid attachment name, attachment names cannot start with '_'"}function qe(){Tr.EventEmitter.call(this)}function Ae(){this.isReady=!1,this.failed=!1,this.queue=[]}function xe(e,t){var n=e.match(/([a-z\-]*):\/\/(.*)/);if(n)return{name:/https?/.test(n[1])?n[1]+"://"+n[2]:n[2],adapter:n[1]};var r=Oe.adapters,o=Oe.preferredAdapters,i=Oe.prefix,a=t.adapter;if(!a)for(var s=0;s<o.length;++s){a=o[s];{if(!("idb"===a&&"websql"in r&&E()&&localStorage["_pouch__websqldb_"+i+e]))break;q("log",'PouchDB is downgrading "'+e+'" to WebSQL to avoid data loss, because it was already opened with WebSQL.')}}var u=r[a],c=!(u&&"use_prefix"in u)||u.use_prefix;return{name:c?i+e:e,adapter:a}}function Te(e){function t(){e.removeListener("closed",r),e.constructor.emit("destroyed",e.name)}function n(){e.removeListener("destroyed",t),e.removeListener("closed",r),e.emit("destroyed")}function r(){e.removeListener("destroyed",t),o.delete(e.name)}var o=e.constructor._destructionListeners;e.once("destroyed",t),e.once("closed",r),o.has(e.name)||o.set(e.name,[]),o.get(e.name).push(n)}function Oe(e,t){if(!(this instanceof Oe))return new Oe(e,t);var n=this;if(t=t||{},e&&"object"==typeof e&&(t=e,e=t.name,delete t.name),this.__opts=t=u(t),n.auto_compaction=t.auto_compaction,n.prefix=Oe.prefix,"string"!=typeof e)throw new Error("Missing/invalid DB name");var r=(t.prefix||"")+e,o=xe(r,t);if(t.name=o.name,t.adapter=t.adapter||o.adapter,n.name=e,n._adapter=t.adapter,xr("pouchdb:adapter")("Picked adapter: "+t.adapter),!Oe.adapters[t.adapter]||!Oe.adapters[t.adapter].valid())throw new Error("Invalid Adapter: "+t.adapter);qe.call(n),n.taskqueue=new Ae,n.adapter=t.adapter,Oe.adapters[t.adapter].call(n,t,function(e){return e?n.taskqueue.fail(e):(Te(n),n.emit("created",n),Oe.emit("created",n.name),void n.taskqueue.ready(n))})}function je(e){Object.keys(Tr.EventEmitter.prototype).forEach(function(t){"function"==typeof Tr.EventEmitter.prototype[t]&&(e[t]=po[t].bind(po))});var t=e._destructionListeners=new Mr;e.on("destroyed",function(e){t.get(e).forEach(function(e){e()}),t.delete(e)})}function Ce(e){return e.reduce(function(e,t){return e[t]=!0,e},{})}function Le(e){if(!/^\d+\-./.test(e))return j(io);var t=e.indexOf("-"),n=e.substring(0,t),r=e.substring(t+1);return{prefix:parseInt(n,10),id:r}}function Ie(e,t){for(var n=e.start-e.ids.length+1,r=e.ids,o=[r[0],t,[]],i=1,a=r.length;i<a;i++)o=[r[i],{status:"missing"},[o]];return[{pos:n,ids:o}]}function De(e,t){var n,r,o,i={status:"available"};if(e._deleted&&(i.deleted=!0),t)if(e._id||(e._id=J()),r=J(32,16).toLowerCase(),e._rev){if(o=Le(e._rev),o.error)return o;e._rev_tree=[{pos:o.prefix,ids:[o.id,{status:"missing"},[[r,i,[]]]]}],n=o.prefix+1}else e._rev_tree=[{pos:1,ids:[r,i,[]]}],n=1;else if(e._revisions&&(e._rev_tree=Ie(e._revisions,i),n=e._revisions.start,r=e._revisions.ids[0]),!e._rev_tree){if(o=Le(e._rev),o.error)return o;n=o.prefix,r=o.id,e._rev_tree=[{pos:n,ids:[r,i,[]]}]}N(e._id),e._rev=n+"-"+r;var a={metadata:{},data:{}};for(var s in e)if(Object.prototype.hasOwnProperty.call(e,s)){var u="_"===s[0];if(u&&!_o[s]){var c=j(eo,s);throw c.message=eo.message+": "+s,c}u&&!mo[s]?a.metadata[s.slice(1)]=e[s]:a.data[s]=e[s]}return a}function Re(e,t){e=e||[],t=t||{};try{return new Blob(e,t)}catch(i){if("TypeError"!==i.name)throw i;for(var n="undefined"!=typeof BlobBuilder?BlobBuilder:"undefined"!=typeof MSBlobBuilder?MSBlobBuilder:"undefined"!=typeof MozBlobBuilder?MozBlobBuilder:WebKitBlobBuilder,r=new n,o=0;o<e.length;o+=1)r.append(e[o]);return r.getBlob(t.type)}}function Ne(e){for(var t=e.length,n=new ArrayBuffer(t),r=new Uint8Array(n),o=0;o<t;o++)r[o]=e.charCodeAt(o);return n}function Be(e,t){return Re([Ne(e)],{type:t})}function Fe(e,t){return Be(go(e),t)}function Me(e){for(var t="",n=new Uint8Array(e),r=n.byteLength,o=0;o<r;o++)t+=String.fromCharCode(n[o]);return t}function Ue(e,t){if("undefined"==typeof FileReader)return t(Me((new FileReaderSync).readAsArrayBuffer(e)));var n=new FileReader,r="function"==typeof n.readAsBinaryString;n.onloadend=function(e){var n=e.target.result||"";return r?t(n):void t(Me(n))},r?n.readAsBinaryString(e):n.readAsArrayBuffer(e)}function Pe(e,t){Ue(e,function(e){t(e)})}function He(e,t){Pe(e,function(e){t(bo(e))})}function We(e,t){if("undefined"==typeof FileReader)return t((new FileReaderSync).readAsArrayBuffer(e));var n=new FileReader;n.onloadend=function(e){var n=e.target.result||new ArrayBuffer(0);t(n)},n.readAsArrayBuffer(e)}function Je(e){return bo(e)}function Ke(e,t,n){return e.webkitSlice?e.webkitSlice(t,n):e.slice(t,n)}function ze(e,t,n,r,o){(n>0||r<t.size)&&(t=Ke(t,n,r)),We(t,function(t){e.append(t),o()})}function Xe(e,t,n,r,o){(n>0||r<t.length)&&(t=t.substring(n,r)),e.appendBinary(t),o()}function Ge(e,t){function n(){wo(o)}function r(){var e=f.end(!0),n=Je(e);t(n),f.destroy()}function o(){var t=c*s,o=t+s;c++,c<u?l(f,e,t,o,n):l(f,e,t,o,r)}var i="string"==typeof e,a=i?e.length:e.size,s=Math.min(Eo,a),u=Math.ceil(a/s),c=0,f=i?new Lr:new Lr.ArrayBuffer,l=i?Xe:ze;o()}function Ve(e){return Lr.hash(e)}function Qe(e){try{return go(e)}catch(e){var t=j(Yr,"Attachment is not a valid base64 string");return{error:t}}}function $e(e,t,n){var r=Qe(e.data);return r.error?n(r.error):(e.length=r.length,"blob"===t?e.data=Be(r,e.content_type):"base64"===t?e.data=bo(r):e.data=r,void Ge(r,function(t){e.digest="md5-"+t,n()}))}function Ye(e,t,n){Ge(e.data,function(r){e.digest="md5-"+r,e.length=e.data.size||e.data.length||0,"binary"===t?Pe(e.data,function(t){e.data=t,n()}):"base64"===t?He(e.data,function(t){e.data=t,n()}):n()})}function Ze(e,t,n){return e.stub?n():void("string"==typeof e.data?$e(e,t,n):Ye(e,t,n))}function et(e,t,n){function r(){i++,e.length===i&&(o?n(o):n())}if(!e.length)return n();var o,i=0;e.forEach(function(e){function n(e){o=e,a++,a===i.length&&r()}var i=e.data&&e.data._attachments?Object.keys(e.data._attachments):[],a=0;if(!i.length)return r();for(var s in e.data._attachments)e.data._attachments.hasOwnProperty(s)&&Ze(e.data._attachments[s],t,n)})}function tt(e,t,n,r,o,i,a,s){if(se(t.rev_tree,n.metadata.rev))return r[o]=n,i();var u=t.winningRev||K(t),c="deleted"in t?t.deleted:ce(t,u),f="deleted"in n.metadata?n.metadata.deleted:ce(n.metadata),l=/^1-/.test(n.metadata.rev);if(c&&!f&&s&&l){var d=n.data;d._rev=u,d._id=n.metadata.id,n=De(d,s)}var h=ae(t.rev_tree,n.metadata.rev_tree[0],e),p=s&&(c&&f&&"new_leaf"!==h.conflicts||!c&&"new_leaf"!==h.conflicts||c&&!f&&"new_branch"===h.conflicts);if(p){var v=j(Xr);return r[o]=v,i()}var y=n.metadata.rev;n.metadata.rev_tree=h.tree,n.stemmedRevs=h.stemmedRevs||[],t.rev_map&&(n.metadata.rev_map=t.rev_map);var _,m=K(n.metadata),g=ce(n.metadata,m),b=c===g?0:c<g?-1:1;_=y===m?g:ce(n.metadata,y),a(n,m,g,_,!0,b,o,i)}function nt(e){return"missing"===e.metadata.rev_tree[0].ids[1].status}function rt(e,t,n,r,o,i,a,s,u){function c(e,t,n){var r=K(e.metadata),o=ce(e.metadata,r);if("was_delete"in s&&o)return i[t]=j(zr,"deleted"),n();var u=l&&nt(e);if(u){var c=j(Xr);return i[t]=c,n()}var f=o?0:1;a(e,r,o,o,!1,f,t,n)}function f(){++h===p&&u&&u()}e=e||1e3;var l=s.new_edits,d=new Mr,h=0,p=t.length;t.forEach(function(e,t){if(e._id&&fe(e._id)){var r=e._deleted?"_removeLocal":"_putLocal";return void n[r](e,{ctx:o},function(e,n){i[t]=e||n,f()})}var a=e.metadata.id;d.has(a)?(p--,d.get(a).push([e,t])):d.set(a,[[e,t]])}),d.forEach(function(t,n){function o(){++u<t.length?s():f()}function s(){var s=t[u],f=s[0],d=s[1];if(r.has(n))tt(e,r.get(n),f,i,d,o,a,l);else{var h=ae([],f.metadata.rev_tree[0],e);f.metadata.rev_tree=h.tree,f.stemmedRevs=h.stemmedRevs||[],c(f,d,o)}}var u=0;s()})}function ot(e){try{return JSON.parse(e)}catch(t){return Ir.parse(e)}}function it(e){try{return JSON.stringify(e)}catch(t){return Ir.stringify(e)}}function at(e){return function(t){var n="unknown_error";t.target&&t.target.error&&(n=t.target.error.name||t.target.error.message),e(j(ro,n,t.type))}}function st(e,t,n){return{data:it(e),winningRev:t,deletedOrLocal:n?"1":"0",seq:e.seq,id:e.id}}function ut(e){if(!e)return null;var t=ot(e.data);return t.winningRev=e.winningRev,t.deleted="1"===e.deletedOrLocal,t.seq=e.seq,t}function ct(e){if(!e)return e;var t=e._doc_id_rev.lastIndexOf(":");return e._id=e._doc_id_rev.substring(0,t-1),e._rev=e._doc_id_rev.substring(t+1),delete e._doc_id_rev,e}function ft(e,t,n,r){n?r(e?"string"!=typeof e?e:Fe(e,t):Re([""],{type:t})):e?"string"!=typeof e?Ue(e,function(e){r(bo(e))}):r(e):r("")}function lt(e,t,n,r){function o(){++s===a.length&&r&&r()}function i(e,t){var r=e._attachments[t],i=r.digest,a=n.objectStore(Ao).get(i);a.onsuccess=function(e){r.body=e.target.result.body,o()}}var a=Object.keys(e._attachments||{});if(!a.length)return r&&r();var s=0;a.forEach(function(n){t.attachments&&t.include_docs?i(e,n):(e._attachments[n].stub=!0,o())})}function dt(e,t){return Dr.all(e.map(function(e){if(e.doc&&e.doc._attachments){var n=Object.keys(e.doc._attachments);return Dr.all(n.map(function(n){var r=e.doc._attachments[n];if("body"in r){var o=r.body,i=r.content_type;return new Dr(function(a){ft(o,i,t,function(t){e.doc._attachments[n]=Wr(_(r,["digest","content_type"]),{data:t}),a()})})}}))}}))}function ht(e,t,n){function r(){c--,c||o()}function o(){i.length&&i.forEach(function(e){var t=u.index("digestSeq").count(IDBKeyRange.bound(e+"::",e+"::￿",!1,!1));t.onsuccess=function(t){var n=t.target.result;n||s.delete(e)}})}var i=[],a=n.objectStore(qo),s=n.objectStore(Ao),u=n.objectStore(xo),c=e.length;e.forEach(function(e){var n=a.index("_doc_id_rev"),o=t+"::"+e;n.getKey(o).onsuccess=function(e){var t=e.target.result;if("number"!=typeof t)return r();a.delete(t);var n=u.index("seq").openCursor(IDBKeyRange.only(t));n.onsuccess=function(e){var t=e.target.result;if(t){var n=t.value.digestSeq.split("::")[0];i.push(n),u.delete(t.primaryKey),t.continue()}else r()}}})}function pt(e,t,n){try{return{txn:e.transaction(t,n)}}catch(e){return{error:e}}}function vt(e,t,n,r,o,i){function a(){var e=[ko,qo,Ao,Oo,xo,To],t=pt(o,e,"readwrite");return t.error?i(t.error):(g=t.txn,g.onabort=at(i),g.ontimeout=at(i),g.oncomplete=l,b=g.objectStore(ko),w=g.objectStore(qo),E=g.objectStore(Ao),S=g.objectStore(xo),k=g.objectStore(To),k.get(To).onsuccess=function(e){A=e.target.result,c()},void h(function(e){return e?(N=!0,i(e)):void f()}))}function s(){L=!0,c()}function u(){rt(e.revs_limit,x,r,R,g,D,p,n,s)}function c(){A&&L&&(A.docCount+=I,k.put(A))}function f(){function e(){++n===x.length&&u()}function t(t){var n=ut(t.target.result);n&&R.set(n.id,n),e()}if(x.length)for(var n=0,r=0,o=x.length;r<o;r++){var i=x[r];if(i._id&&fe(i._id))e();else{var a=b.get(i.metadata.id);a.onsuccess=t}}}function l(){N||(Co.notify(r._meta.name),i(null,D))}function d(e,t){var n=E.get(e);n.onsuccess=function(n){if(n.target.result)t();else{var r=j(ao,"unknown stub attachment with digest "+e);r.status=412,t(r)}}}function h(e){function t(){++o===n.length&&e(r)}var n=[];if(x.forEach(function(e){e.data&&e.data._attachments&&Object.keys(e.data._attachments).forEach(function(t){var r=e.data._attachments[t];r.stub&&n.push(r.digest)})}),!n.length)return e();var r,o=0;n.forEach(function(e){d(e,function(e){e&&!r&&(r=e),t()})})}function p(e,t,n,r,o,i,a,s){e.metadata.winningRev=t,e.metadata.deleted=n;var u=e.data;u._id=e.metadata.id,u._rev=e.metadata.rev,r&&(u._deleted=!0);var f=u._attachments&&Object.keys(u._attachments).length;return f?y(e,t,n,o,a,s):(I+=i,c(),void v(e,t,n,o,a,s))}function v(e,t,n,o,i,a){function s(i){var a=e.stemmedRevs||[];o&&r.auto_compaction&&(a=a.concat(Q(e.metadata))),a&&a.length&&ht(a,e.metadata.id,g),l.seq=i.target.result;var s=st(l,t,n),u=b.put(s);u.onsuccess=c}function u(e){e.preventDefault(),e.stopPropagation();var t=w.index("_doc_id_rev"),n=t.getKey(f._doc_id_rev);n.onsuccess=function(e){var t=w.put(f,e.target.result);t.onsuccess=s}}function c(){D[i]={ok:!0,id:l.id,rev:l.rev},R.set(e.metadata.id,e.metadata),_(e,l.seq,a)}var f=e.data,l=e.metadata;f._doc_id_rev=l.id+"::"+l.rev,delete f._id,delete f._rev;var d=w.put(f);d.onsuccess=s,d.onerror=u}function y(e,t,n,r,o,i){function a(){c===f.length&&v(e,t,n,r,o,i)}function s(){c++,a()}var u=e.data,c=0,f=Object.keys(u._attachments);f.forEach(function(n){var r=e.data._attachments[n];if(r.stub)c++,a();else{var o=r.data;delete r.data,r.revpos=parseInt(t,10);var i=r.digest;m(i,o,s)}})}function _(e,t,n){function r(){++i===a.length&&n()}function o(n){var o=e.data._attachments[n].digest,i=S.put({seq:t,digestSeq:o+"::"+t});i.onsuccess=r,i.onerror=function(e){e.preventDefault(),e.stopPropagation(),r()}}var i=0,a=Object.keys(e.data._attachments||{});if(!a.length)return n();for(var s=0;s<a.length;s++)o(a[s])}function m(e,t,n){var r=E.count(e);r.onsuccess=function(r){var o=r.target.result;if(o)return n();var i={digest:e,body:t},a=E.put(i);a.onsuccess=n}}for(var g,b,w,E,S,k,q,A,x=t.docs,T=0,O=x.length;T<O;T++){var C=x[T];C._id&&fe(C._id)||(C=x[T]=De(C,n.new_edits),C.error&&!q&&(q=C))}if(q)return i(q);var L=!1,I=0,D=new Array(x.length),R=new Mr,N=!1,B=r._meta.blobSupport?"blob":"base64";et(x,B,function(e){return e?i(e):void a()})}function yt(e,t,n,r,o){function i(e){f=e.target.result,c&&o(c,f,l)}function a(e){c=e.target.result,f&&o(c,f,l)}function s(){if(!c.length)return o();var n,s=c[c.length-1];if(t&&t.upper)try{n=IDBKeyRange.bound(s,t.upper,!0,t.upperOpen)}catch(e){if("DataError"===e.name&&0===e.code)return o()}else n=IDBKeyRange.lowerBound(s,!0);t=n,c=null,f=null,e.getAll(t,r).onsuccess=i,e.getAllKeys(t,r).onsuccess=a}function u(e){var t=e.target.result;return t?void o([t.key],[t.value],t):o()}var c,f,l,d="function"==typeof e.getAll&&"function"==typeof e.getAllKeys&&r>1&&!n;d?(l={continue:s},e.getAll(t,r).onsuccess=i,e.getAllKeys(t,r).onsuccess=a):n?e.openCursor(t,"prev").onsuccess=u:e.openCursor(t).onsuccess=u}function _t(e,t,n){function r(e){var t=e.target.result;t?(o.push(t.value),t.continue()):n({target:{result:o}})}if("function"==typeof e.getAll)return void(e.getAll(t).onsuccess=n);var o=[];e.openCursor(t).onsuccess=r}function mt(e,t,n,r,o){try{if(e&&t)return o?IDBKeyRange.bound(t,e,!n,!1):IDBKeyRange.bound(e,t,!1,!n);if(e)return o?IDBKeyRange.upperBound(e):IDBKeyRange.lowerBound(e);if(t)return o?IDBKeyRange.lowerBound(t,!n):IDBKeyRange.upperBound(t,!n);if(r)return IDBKeyRange.only(r)}catch(e){return{error:e}}return null}function gt(e,t,n){function r(t,n,r){var o=t.id+"::"+r;q.get(o).onsuccess=function(r){if(n.doc=ct(r.target.result),e.conflicts){var o=V(t);o.length&&(n.doc._conflicts=o)}lt(n.doc,e,b)}}function o(t,n){var o={id:n.id,key:n.id,value:{rev:t}},i=n.deleted;"ok"===e.deleted?(A.push(o),i?(o.value.deleted=!0,o.doc=null):e.include_docs&&r(n,o,t)):!i&&h--<=0&&(A.push(o),e.include_docs&&r(n,o,t))}function i(e){for(var t=0,n=e.length;t<n&&A.length!==p;t++){var r=e[t],i=ut(r),a=i.winningRev;o(a,i)}}function a(e,t,n){n&&(i(t),A.length<p&&n.continue())}function s(t){var n=t.target.result;e.descending&&(n=n.reverse()),i(n)}function u(){n(null,{total_rows:w,offset:e.skip,rows:A})}function c(){e.attachments?dt(A,e.binary).then(u):u()}var f="startkey"in e&&e.startkey,l="endkey"in e&&e.endkey,d="key"in e&&e.key,h=e.skip||0,p="number"==typeof e.limit?e.limit:-1,v=e.inclusive_end!==!1,y=mt(f,l,v,d,e.descending),_=y&&y.error;if(_&&("DataError"!==_.name||0!==_.code))return n(j(ro,_.name,_.message));var m=[ko,qo,To];e.attachments&&m.push(Ao);var g=pt(t,m,"readonly");if(g.error)return n(g.error);var b=g.txn;b.oncomplete=c,b.onabort=at(n);var w,E=b.objectStore(ko),S=b.objectStore(qo),k=b.objectStore(To),q=S.index("_doc_id_rev"),A=[];return k.get(To).onsuccess=function(e){w=e.target.result.docCount},_||0===p?void 0:p===-1?_t(E,y,s):void yt(E,y,e.descending,p+h,a)}function bt(e){return new Dr(function(t){var n=Re([""]),r=e.objectStore(jo).put(n,"key");r.onsuccess=function(){var e=navigator.userAgent.match(/Chrome\/(\d+)/),n=navigator.userAgent.match(/Edge\//);t(n||!e||parseInt(e[1],10)>=43)},e.onabort=function(e){e.preventDefault(),e.stopPropagation(),t(!1)}}).catch(function(){return!1})}function wt(e,t){var n=e.objectStore(ko).index("deletedOrLocal");n.count(IDBKeyRange.only("0")).onsuccess=function(e){t(e.target.result)}}function Et(e,t,n,r){try{e(t,n)}catch(e){r.emit("error",e)}}function St(){!Lo&&Io.length&&(Lo=!0,Io.shift()())}function kt(e,t,n){Io.push(function(){e(function(e,r){Et(t,e,r,n),Lo=!1,jr(function(){St(n)})})}),St()}function qt(e,t,n,r){function o(t,n,r){function o(t,n){var r=e.processChange(n,t,e);d=r.seq=t.seq;var o=w(r);return"object"==typeof o?e.complete(o):void(o&&(b++,p&&g.push(r),e.attachments&&e.include_docs?lt(n,e,v,function(){dt([r],e.binary).then(function(){e.onChange(r)})}):e.onChange(r)))}function i(){for(var e=0,t=s.length;e<t&&b!==h;e++){var n=s[e];if(n){var i=u[e];o(i,n)}}b!==h&&r.continue()}if(r&&t.length){var s=new Array(t.length),u=new Array(t.length),c=0;n.forEach(function(e,n){var r=ct(e),o=t[n];a(r,o,function(e,r){u[n]=e,s[n]=r,++c===t.length&&i()})})}}function i(e,t,n,r){if(n.seq!==t)return r();if(n.winningRev===e._rev)return r(n,e);var o=e._id+"::"+n.winningRev,i=m.get(o);i.onsuccess=function(e){r(n,ct(e.target.result))}}function a(e,t,n){if(l&&!l.has(e._id))return n();var r=E.get(e._id);return r?i(e,t,r,n):void(_.get(e._id).onsuccess=function(o){r=ut(o.target.result),E.set(e._id,r),i(e,t,r,n)})}function s(){e.complete(null,{results:g,last_seq:d})}function c(){!e.continuous&&e.attachments?dt(g).then(s):s()}if(e=u(e),e.continuous){var f=n+":"+J();return Co.addListener(n,f,t,e),Co.notify(n),{cancel:function(){Co.removeListener(n,f)}}}var l=e.doc_ids&&new Fr(e.doc_ids);e.since=e.since||0;var d=e.since,h="limit"in e?e.limit:-1;0===h&&(h=1);var p;p="return_docs"in e?e.return_docs:!("returnDocs"in e)||e.returnDocs;var v,y,_,m,g=[],b=0,w=I(e),E=new Mr,S=[ko,qo];e.attachments&&S.push(Ao);var k=pt(r,S,"readonly");if(k.error)return e.complete(k.error);v=k.txn,v.onabort=at(e.complete),v.oncomplete=c,y=v.objectStore(qo),_=v.objectStore(ko),m=y.index("_doc_id_rev");var q=e.since&&!e.descending?IDBKeyRange.lowerBound(e.since,!0):null;yt(y,q,e.descending,h,o)}function At(e,t){var n=this;kt(function(t){xt(n,e,t)},t,n.constructor)}function xt(e,t,n){function r(e){var t=e.createObjectStore(ko,{keyPath:"id"});e.createObjectStore(qo,{autoIncrement:!0}).createIndex("_doc_id_rev","_doc_id_rev",{unique:!0}),e.createObjectStore(Ao,{keyPath:"digest"}),e.createObjectStore(To,{keyPath:"id",autoIncrement:!1}),e.createObjectStore(jo),t.createIndex("deletedOrLocal","deletedOrLocal",{unique:!1}),e.createObjectStore(Oo,{keyPath:"_id"});var n=e.createObjectStore(xo,{autoIncrement:!0});n.createIndex("seq","seq"),n.createIndex("digestSeq","digestSeq",{unique:!0})}function o(e,t){var n=e.objectStore(ko);n.createIndex("deletedOrLocal","deletedOrLocal",{unique:!1}),n.openCursor().onsuccess=function(e){var r=e.target.result;if(r){var o=r.value,i=ce(o);o.deletedOrLocal=i?"1":"0",n.put(o),r.continue()}else t()}}function i(e){e.createObjectStore(Oo,{keyPath:"_id"}).createIndex("_doc_id_rev","_doc_id_rev",{unique:!0})}function a(e,t){var n=e.objectStore(Oo),r=e.objectStore(ko),o=e.objectStore(qo),i=r.openCursor();i.onsuccess=function(e){var i=e.target.result;if(i){var a=i.value,s=a.id,u=fe(s),c=K(a);if(u){var f=s+"::"+c,l=s+"::",d=s+"::~",h=o.index("_doc_id_rev"),p=IDBKeyRange.bound(l,d,!1,!1),v=h.openCursor(p);v.onsuccess=function(e){if(v=e.target.result){var t=v.value;t._doc_id_rev===f&&n.put(t),o.delete(v.primaryKey),v.continue()}else r.delete(i.primaryKey),i.continue()}}else i.continue()}else t&&t()}}function s(e){var t=e.createObjectStore(xo,{autoIncrement:!0});t.createIndex("seq","seq"),t.createIndex("digestSeq","digestSeq",{unique:!0})}function u(e,t){var n=e.objectStore(qo),r=e.objectStore(Ao),o=e.objectStore(xo),i=r.count();i.onsuccess=function(e){var r=e.target.result;return r?void(n.openCursor().onsuccess=function(e){var n=e.target.result;if(!n)return t();for(var r=n.value,i=n.primaryKey,a=Object.keys(r._attachments||{}),s={},u=0;u<a.length;u++){var c=r._attachments[a[u]];s[c.digest]=!0}var f=Object.keys(s);for(u=0;u<f.length;u++){var l=f[u];o.put({seq:i,digestSeq:l+"::"+i})}n.continue()}):t()}}function c(e){function t(e){return e.data?ut(e):(e.deleted="1"===e.deletedOrLocal,e)}var n=e.objectStore(qo),r=e.objectStore(ko),o=r.openCursor();o.onsuccess=function(e){function o(){var e=s.id+"::",t=s.id+"::￿",r=n.index("_doc_id_rev").openCursor(IDBKeyRange.bound(e,t)),o=0;r.onsuccess=function(e){var t=e.target.result;if(!t)return s.seq=o,i();var n=t.primaryKey;n>o&&(o=n),t.continue()}}function i(){var e=st(s,s.winningRev,s.deleted),t=r.put(e);t.onsuccess=function(){a.continue()}}var a=e.target.result;if(a){var s=t(a.value);return s.winningRev=s.winningRev||K(s),s.seq?i():void o()}}}var l=t.name,d=null;e._meta=null,e.type=function(){return"idb"},e._id=f(function(t){t(null,e._meta.instanceId)}),e._bulkDocs=function(n,r,o){vt(t,n,r,e,d,o)},e._get=function(e,t,n){function r(){n(a,{doc:o,metadata:i,ctx:s})}var o,i,a,s=t.ctx;if(!s){var u=pt(d,[ko,qo,Ao],"readonly");if(u.error)return n(u.error);s=u.txn}s.objectStore(ko).get(e).onsuccess=function(e){if(i=ut(e.target.result),!i)return a=j(zr,"missing"),r();var n;if(t.rev)n=t.latest?le(t.rev,i):t.rev;else{n=i.winningRev;var u=ce(i);if(u)return a=j(zr,"deleted"),r()}var c=s.objectStore(qo),f=i.id+"::"+n;c.index("_doc_id_rev").get(f).onsuccess=function(e){return o=e.target.result,o&&(o=ct(o)),o?void r():(a=j(zr,"missing"),r())}}},e._getAttachment=function(e,t,n,r,o){var i;if(r.ctx)i=r.ctx;else{var a=pt(d,[ko,qo,Ao],"readonly");if(a.error)return o(a.error);i=a.txn}var s=n.digest,u=n.content_type;i.objectStore(Ao).get(s).onsuccess=function(e){var t=e.target.result.body;ft(t,u,r.binary,function(e){o(null,e)})}},e._info=function(t){var n,r,o=pt(d,[To,qo],"readonly");if(o.error)return t(o.error);var i=o.txn;i.objectStore(To).get(To).onsuccess=function(e){r=e.target.result.docCount},i.objectStore(qo).openCursor(null,"prev").onsuccess=function(e){var t=e.target.result;n=t?t.key:0},i.oncomplete=function(){t(null,{doc_count:r,update_seq:n,idb_attachment_format:e._meta.blobSupport?"binary":"base64"})}},e._allDocs=function(e,t){gt(e,d,t)},e._changes=function(t){qt(t,e,l,d)},e._close=function(e){d.close(),Do.delete(l),e()},e._getRevisionTree=function(e,t){var n=pt(d,[ko],"readonly");if(n.error)return t(n.error);var r=n.txn,o=r.objectStore(ko).get(e);o.onsuccess=function(e){var n=ut(e.target.result);n?t(null,n.rev_tree):t(j(zr))}},e._doCompaction=function(e,t,n){var r=[ko,qo,Ao,xo],o=pt(d,r,"readwrite");if(o.error)return n(o.error);var i=o.txn,a=i.objectStore(ko);a.get(e).onsuccess=function(n){var r=ut(n.target.result);z(r.rev_tree,function(e,n,r,o,i){var a=n+"-"+r;t.indexOf(a)!==-1&&(i.status="missing")}),ht(t,e,i);var o=r.winningRev,a=r.deleted;i.objectStore(ko).put(st(r,o,a))},i.onabort=at(n),i.oncomplete=function(){n()}},e._getLocal=function(e,t){var n=pt(d,[Oo],"readonly");if(n.error)return t(n.error);var r=n.txn,o=r.objectStore(Oo).get(e);o.onerror=at(t),o.onsuccess=function(e){var n=e.target.result;n?(delete n._doc_id_rev,t(null,n)):t(j(zr))}},e._putLocal=function(e,t,n){"function"==typeof t&&(n=t,t={}),delete e._revisions;var r=e._rev,o=e._id;r?e._rev="0-"+(parseInt(r.split("-")[1],10)+1):e._rev="0-1";var i,a=t.ctx;if(!a){var s=pt(d,[Oo],"readwrite");if(s.error)return n(s.error);a=s.txn,a.onerror=at(n),a.oncomplete=function(){i&&n(null,i)}}var u,c=a.objectStore(Oo);r?(u=c.get(o),u.onsuccess=function(o){var a=o.target.result;if(a&&a._rev===r){var s=c.put(e);s.onsuccess=function(){i={ok:!0,id:e._id,rev:e._rev},t.ctx&&n(null,i)}}else n(j(Xr))}):(u=c.add(e),u.onerror=function(e){n(j(Xr)),e.preventDefault(),e.stopPropagation()},u.onsuccess=function(){i={ok:!0,id:e._id,rev:e._rev},t.ctx&&n(null,i)})},e._removeLocal=function(e,t,n){"function"==typeof t&&(n=t,t={});var r=t.ctx;if(!r){var o=pt(d,[Oo],"readwrite");if(o.error)return n(o.error);r=o.txn,r.oncomplete=function(){i&&n(null,i)}}var i,a=e._id,s=r.objectStore(Oo),u=s.get(a);u.onerror=at(n),u.onsuccess=function(r){var o=r.target.result;o&&o._rev===e._rev?(s.delete(a),i={ok:!0,id:a,rev:"0-0"},t.ctx&&n(null,i)):n(j(zr))}},e._destroy=function(e,t){Co.removeAllListeners(l);var n=Ro.get(l);n&&n.result&&(n.result.close(),Do.delete(l));var r=indexedDB.deleteDatabase(l);r.onsuccess=function(){Ro.delete(l),E()&&l in localStorage&&delete localStorage[l],t(null,{ok:!0})},r.onerror=at(t)};var h=Do.get(l);if(h)return d=h.idb,e._meta=h.global,jr(function(){n(null,e)});var p;p=t.storage?Tt(l,t.storage):indexedDB.open(l,So),Ro.set(l,p),p.onupgradeneeded=function(e){function t(){var e=l[d-1];d++,e&&e(f,t)}var n=e.target.result;if(e.oldVersion<1)return r(n);var f=e.currentTarget.transaction;e.oldVersion<3&&i(n),e.oldVersion<4&&s(n);var l=[o,a,u,c],d=e.oldVersion;t()},p.onsuccess=function(t){function r(){"undefined"!=typeof s&&f&&(e._meta={name:l,instanceId:u,blobSupport:s},Do.set(l,{idb:d,global:e._meta}),n(null,e))}function o(){if("undefined"!=typeof a&&"undefined"!=typeof i){var e=l+"_id";e in i?u=i[e]:i[e]=u=J(),i.docCount=a,c.objectStore(To).put(i)}}d=t.target.result,d.onversionchange=function(){d.close(),Do.delete(l)},d.onabort=function(e){q("error","Database has a global failure",e.target.error),d.close(),Do.delete(l)};var i,a,s,u,c=d.transaction([To,jo,ko],"readwrite"),f=!1;c.objectStore(To).get(To).onsuccess=function(e){i=e.target.result||{id:To},o()},wt(c,function(e){a=e,o()}),yo||(yo=bt(c)),yo.then(function(e){s=e,r()}),c.oncomplete=function(){f=!0,r()}},p.onerror=function(){var e="Failed to open indexedDB, are you in private browsing mode?";
q("error",e),n(j(ro,e))}}function Tt(e,t){try{return indexedDB.open(e,{version:So,storage:t})}catch(t){return indexedDB.open(e,So)}}function Ot(e){return decodeURIComponent(escape(e))}function jt(e){return e<65?e-48:e-55}function Ct(e,t,n){for(var r="";t<n;)r+=String.fromCharCode(jt(e.charCodeAt(t++))<<4|jt(e.charCodeAt(t++)));return r}function Lt(e,t,n){for(var r="";t<n;)r+=String.fromCharCode(jt(e.charCodeAt(t+2))<<12|jt(e.charCodeAt(t+3))<<8|jt(e.charCodeAt(t))<<4|jt(e.charCodeAt(t+1))),t+=4;return r}function It(e,t){return"UTF-8"===t?Ot(Ct(e,0,e.length)):Lt(e,0,e.length)}function Dt(e){return"'"+e+"'"}function Rt(e){return e.replace(/\u0002/g,"").replace(/\u0001/g,"").replace(/\u0000/g,"")}function Nt(e){return e.replace(/\u0001\u0001/g,"\0").replace(/\u0001\u0002/g,"").replace(/\u0002\u0002/g,"")}function Bt(e){return delete e._id,delete e._rev,JSON.stringify(e)}function Ft(e,t,n){return e=JSON.parse(e),e._id=t,e._rev=n,e}function Mt(e){for(var t="(";e--;)t+="?",e&&(t+=",");return t+")"}function Ut(e,t,n,r,o){return"SELECT "+e+" FROM "+("string"==typeof t?t:t.join(" JOIN "))+(n?" ON "+n:"")+(r?" WHERE "+("string"==typeof r?r:r.join(" AND ")):"")+(o?" ORDER BY "+o:"")}function Pt(e,t,n){function r(){++i===e.length&&o()}function o(){if(a.length){var e="SELECT DISTINCT digest AS digest FROM "+Wo+" WHERE seq IN "+Mt(a.length);n.executeSql(e,a,function(e,t){for(var n=[],r=0;r<t.rows.length;r++)n.push(t.rows.item(r).digest);if(n.length){var o="DELETE FROM "+Wo+" WHERE seq IN ("+a.map(function(){return"?"}).join(",")+")";e.executeSql(o,a,function(e){var t="SELECT digest FROM "+Wo+" WHERE digest IN ("+n.map(function(){return"?"}).join(",")+")";e.executeSql(t,n,function(e,t){for(var r=new Fr,o=0;o<t.rows.length;o++)r.add(t.rows.item(o).digest);n.forEach(function(t){r.has(t)||(e.executeSql("DELETE FROM "+Wo+" WHERE digest=?",[t]),e.executeSql("DELETE FROM "+Uo+" WHERE digest=?",[t]))})})})}})}}if(e.length){var i=0,a=[];e.forEach(function(e){var o="SELECT seq FROM "+Mo+" WHERE doc_id=? AND rev=?";n.executeSql(o,[t,e],function(e,t){if(!t.rows.length)return r();var n=t.rows.item(0).seq;a.push(n),e.executeSql("DELETE FROM "+Mo+" WHERE seq=?",[n],r)})})}}function Ht(e){return function(t){q("error","WebSQL threw an error",t);var n=t&&t.constructor.toString().match(/function ([^\(]+)/),r=n&&n[1]||t.type,o=t.target||t.message;e(j(oo,o,r))}}function Wt(e){if("size"in e)return 1e6*e.size;var t="undefined"!=typeof navigator&&/Android/.test(navigator.userAgent);return t?5e6:1}function Jt(e,t,n,r,o,i,a){function s(){return g?a(g):(i.notify(r._name),void a(null,b))}function u(e,t){var n="SELECT count(*) as cnt FROM "+Uo+" WHERE digest=?";m.executeSql(n,[e],function(n,r){if(0===r.rows.item(0).cnt){var o=j(ao,"unknown stub attachment with digest "+e);t(o)}else t()})}function c(e){function t(){++o===n.length&&e(r)}var n=[];if(y.forEach(function(e){e.data&&e.data._attachments&&Object.keys(e.data._attachments).forEach(function(t){var r=e.data._attachments[t];r.stub&&n.push(r.digest)})}),!n.length)return e();var r,o=0;n.forEach(function(e){u(e,function(e){e&&!r&&(r=e),t()})})}function f(e,t,n,o,i,a,s,u){function c(){function t(e,t){function r(){return++i===a.length&&t(),!1}function o(t){var o="INSERT INTO "+Wo+" (digest, seq) VALUES (?,?)",i=[n._attachments[t].digest,e];m.executeSql(o,i,r,r)}var i=0,a=Object.keys(n._attachments||{});if(!a.length)return t();for(var s=0;s<a.length;s++)o(a[s])}var n=e.data,r=o?1:0,i=n._id,a=n._rev,s=Bt(n),u="INSERT INTO "+Mo+" (doc_id, rev, json, deleted) VALUES (?, ?, ?, ?);",c=[i,a,s,r];m.executeSql(u,c,function(e,n){var r=n.insertId;t(r,function(){d(e,r)})},function(){var e=Ut("seq",Mo,null,"doc_id=? AND rev=?");return m.executeSql(e,[i,a],function(e,n){var o=n.rows.item(0).seq,u="UPDATE "+Mo+" SET json=?, deleted=? WHERE doc_id=? AND rev=?;",c=[s,r,i,a];e.executeSql(u,c,function(e){t(o,function(){d(e,o)})})}),!1})}function f(e){p||(e?(p=e,u(p)):v===y.length&&c())}function l(e){v++,f(e)}function d(n,o){var a=e.metadata.id,c=e.stemmedRevs||[];i&&r.auto_compaction&&(c=Q(e.metadata).concat(c)),c.length&&Pt(c,a,n),e.metadata.seq=o;var f=e.metadata.rev;delete e.metadata.rev;var l=i?"UPDATE "+Fo+" SET json=?, max_seq=?, winningseq=(SELECT seq FROM "+Mo+" WHERE doc_id="+Fo+".id AND rev=?) WHERE id=?":"INSERT INTO "+Fo+" (id, winningseq, max_seq, json) VALUES (?,?,?,?);",d=it(e.metadata),h=i?[d,o,t,a]:[a,o,o,d];n.executeSql(l,h,function(){b[s]={ok:!0,id:e.metadata.id,rev:f},w.set(a,e.metadata),u()})}var p=null,v=0;e.data._id=e.metadata.id,e.data._rev=e.metadata.rev;var y=Object.keys(e.data._attachments||{});o&&(e.data._deleted=!0),y.forEach(function(n){var r=e.data._attachments[n];if(r.stub)v++,f();else{var o=r.data;delete r.data,r.revpos=parseInt(t,10);var i=r.digest;h(i,o,l)}}),y.length||c()}function l(){rt(e.revs_limit,y,r,w,m,b,f,n)}function d(e){function t(){++n===y.length&&e()}if(!y.length)return e();var n=0;y.forEach(function(e){if(e._id&&fe(e._id))return t();var n=e.metadata.id;m.executeSql("SELECT json FROM "+Fo+" WHERE id = ?",[n],function(e,r){if(r.rows.length){var o=ot(r.rows.item(0).json);w.set(n,o)}t()})})}function h(e,t,n){var r="SELECT digest FROM "+Uo+" WHERE digest=?";m.executeSql(r,[e],function(o,i){return i.rows.length?n():(r="INSERT INTO "+Uo+" (digest, body, escaped) VALUES (?,?,1)",void o.executeSql(r,[e,Rt(t)],function(){n()},function(){return n(),!1}))})}var p=n.new_edits,v=t.docs,y=v.map(function(e){if(e._id&&fe(e._id))return e;var t=De(e,p);return t}),_=y.filter(function(e){return e.error});if(_.length)return a(_[0]);var m,g,b=new Array(y.length),w=new Mr;et(y,"binary",function(e){return e?a(e):void o.transaction(function(e){m=e,c(function(e){e?g=e:d(l)})},Ht(a),s)})}function Kt(e){return e.websql(e.name,e.version,e.description,e.size)}function zt(e){try{return{db:Kt(e)}}catch(e){return{error:e}}}function Xt(e){var t=Jo.get(e.name);return t||(t=zt(e),Jo.set(e.name,t)),t}function Gt(e,t,n,r,o){function i(){++u===s.length&&o&&o()}function a(e,o){var a=e._attachments[o],s={binary:t.binary,ctx:r};n._getAttachment(e._id,o,a,s,function(t,n){e._attachments[o]=Wr(_(a,["digest","content_type"]),{data:n}),i()})}var s=Object.keys(e._attachments||{});if(!s.length)return o&&o();var u=0;s.forEach(function(n){t.attachments&&t.include_docs?a(e,n):(e._attachments[n].stub=!0,i())})}function Vt(e,t){function n(){E()&&(window.localStorage["_pouch__websqldb_"+b._name]=!0),t(null,b)}function r(e,t){e.executeSql(Vo),e.executeSql("ALTER TABLE "+Mo+" ADD COLUMN deleted TINYINT(1) DEFAULT 0",[],function(){e.executeSql(Xo),e.executeSql("ALTER TABLE "+Fo+" ADD COLUMN local TINYINT(1) DEFAULT 0",[],function(){e.executeSql("CREATE INDEX IF NOT EXISTS 'doc-store-local-idx' ON "+Fo+" (local, id)");var n="SELECT "+Fo+".winningseq AS seq, "+Fo+".json AS metadata FROM "+Mo+" JOIN "+Fo+" ON "+Mo+".seq = "+Fo+".winningseq";e.executeSql(n,[],function(e,n){for(var r=[],o=[],i=0;i<n.rows.length;i++){var a=n.rows.item(i),s=a.seq,u=JSON.parse(a.metadata);ce(u)&&r.push(s),fe(u.id)&&o.push(u.id)}e.executeSql("UPDATE "+Fo+"SET local = 1 WHERE id IN "+Mt(o.length),o,function(){e.executeSql("UPDATE "+Mo+" SET deleted = 1 WHERE seq IN "+Mt(r.length),r,t)})})})})}function o(e,t){var n="CREATE TABLE IF NOT EXISTS "+Po+" (id UNIQUE, rev, json)";e.executeSql(n,[],function(){var n="SELECT "+Fo+".id AS id, "+Mo+".json AS data FROM "+Mo+" JOIN "+Fo+" ON "+Mo+".seq = "+Fo+".winningseq WHERE local = 1";e.executeSql(n,[],function(e,n){function r(){if(!o.length)return t(e);var n=o.shift(),i=JSON.parse(n.data)._rev;e.executeSql("INSERT INTO "+Po+" (id, rev, json) VALUES (?,?,?)",[n.id,i,n.data],function(e){e.executeSql("DELETE FROM "+Fo+" WHERE id=?",[n.id],function(e){e.executeSql("DELETE FROM "+Mo+" WHERE seq=?",[n.seq],function(){r()})})})}for(var o=[],i=0;i<n.rows.length;i++)o.push(n.rows.item(i));r()})})}function i(e,t){function n(n){function r(){if(!n.length)return t(e);var o=n.shift(),i=It(o.hex,g),a=i.lastIndexOf("::"),s=i.substring(0,a),u=i.substring(a+2),c="UPDATE "+Mo+" SET doc_id=?, rev=? WHERE doc_id_rev=?";e.executeSql(c,[s,u,i],function(){r()})}r()}var r="ALTER TABLE "+Mo+" ADD COLUMN doc_id";e.executeSql(r,[],function(e){var t="ALTER TABLE "+Mo+" ADD COLUMN rev";e.executeSql(t,[],function(e){e.executeSql(Go,[],function(e){var t="SELECT hex(doc_id_rev) as hex FROM "+Mo;e.executeSql(t,[],function(e,t){for(var r=[],o=0;o<t.rows.length;o++)r.push(t.rows.item(o));n(r)})})})})}function a(e,t){function n(e){var n="SELECT COUNT(*) AS cnt FROM "+Uo;e.executeSql(n,[],function(e,n){function r(){var n=Ut(Zo+", "+Fo+".id AS id",[Fo,Mo],Yo,null,Fo+".id ");n+=" LIMIT "+a+" OFFSET "+i,i+=a,e.executeSql(n,[],function(e,n){function o(e,t){var n=i[e]=i[e]||[];n.indexOf(t)===-1&&n.push(t)}if(!n.rows.length)return t(e);for(var i={},a=0;a<n.rows.length;a++)for(var s=n.rows.item(a),u=Ft(s.data,s.id,s.rev),c=Object.keys(u._attachments||{}),f=0;f<c.length;f++){var l=u._attachments[c[f]];o(l.digest,s.seq)}var d=[];if(Object.keys(i).forEach(function(e){var t=i[e];t.forEach(function(t){d.push([e,t])})}),!d.length)return r();var h=0;d.forEach(function(t){var n="INSERT INTO "+Wo+" (digest, seq) VALUES (?,?)";e.executeSql(n,t,function(){++h===d.length&&r()})})})}var o=n.rows.item(0).cnt;if(!o)return t(e);var i=0,a=10;r()})}var r="CREATE TABLE IF NOT EXISTS "+Wo+" (digest, seq INTEGER)";e.executeSql(r,[],function(e){e.executeSql($o,[],function(e){e.executeSql(Qo,[],n)})})}function s(e,t){var n="ALTER TABLE "+Uo+" ADD COLUMN escaped TINYINT(1) DEFAULT 0";e.executeSql(n,[],t)}function c(e,t){var n="ALTER TABLE "+Fo+" ADD COLUMN max_seq INTEGER";e.executeSql(n,[],function(e){var n="UPDATE "+Fo+" SET max_seq=(SELECT MAX(seq) FROM "+Mo+" WHERE doc_id=id)";e.executeSql(n,[],function(e){var n="CREATE UNIQUE INDEX IF NOT EXISTS 'doc-max-seq-idx' ON "+Fo+" (max_seq)";e.executeSql(n,[],t)})})}function l(e,t){e.executeSql('SELECT HEX("a") AS hex',[],function(e,n){var r=n.rows.item(0).hex;g=2===r.length?"UTF-8":"UTF-16",t()})}function d(){for(;k.length>0;){var e=k.pop();e(null,w)}}function h(e,t){if(0===t){var n="CREATE TABLE IF NOT EXISTS "+Ho+" (dbid, db_version INTEGER)",u="CREATE TABLE IF NOT EXISTS "+Uo+" (digest UNIQUE, escaped TINYINT(1), body BLOB)",f="CREATE TABLE IF NOT EXISTS "+Wo+" (digest, seq INTEGER)",l="CREATE TABLE IF NOT EXISTS "+Fo+" (id unique, json, winningseq, max_seq INTEGER UNIQUE)",h="CREATE TABLE IF NOT EXISTS "+Mo+" (seq INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, json, deleted TINYINT(1), doc_id, rev)",p="CREATE TABLE IF NOT EXISTS "+Po+" (id UNIQUE, rev, json)";e.executeSql(u),e.executeSql(p),e.executeSql(f,[],function(){e.executeSql(Qo),e.executeSql($o)}),e.executeSql(l,[],function(){e.executeSql(Vo),e.executeSql(h,[],function(){e.executeSql(Xo),e.executeSql(Go),e.executeSql(n,[],function(){var t="INSERT INTO "+Ho+" (db_version, dbid) VALUES (?,?)";w=J();var n=[Bo,w];e.executeSql(t,n,function(){d()})})})})}else{var v=function(){var n=t<Bo;n&&e.executeSql("UPDATE "+Ho+" SET db_version = "+Bo);var r="SELECT dbid FROM "+Ho;e.executeSql(r,[],function(e,t){w=t.rows.item(0).dbid,d()})},y=[r,o,i,a,s,c,v],_=t,m=function(e){y[_-1](e,m),_++};m(e)}}function p(){x.transaction(function(e){l(e,function(){v(e)})},Ht(t),n)}function v(e){var t="SELECT sql FROM sqlite_master WHERE tbl_name = "+Ho;e.executeSql(t,[],function(e,t){t.rows.length?/db_version/.test(t.rows.item(0).sql)?e.executeSql("SELECT db_version FROM "+Ho,[],function(e,t){var n=t.rows.item(0).db_version;h(e,n)}):e.executeSql("ALTER TABLE "+Ho+" ADD COLUMN db_version INTEGER",[],function(){h(e,1)}):h(e,0)})}function y(e,t){var n="SELECT MAX(seq) AS seq FROM "+Mo;e.executeSql(n,[],function(e,n){var r=n.rows.item(0).seq||0;t(r)})}function _(e,t){var n=Ut("COUNT("+Fo+".id) AS 'num'",[Fo,Mo],Yo,Mo+".deleted=0");e.executeSql(n,[],function(e,n){t(n.rows.item(0).num)})}function m(e,t,n,r,o){var i=Ut(Zo,[Fo,Mo],Yo,Fo+".id=?"),a=[t];e.executeSql(i,a,function(e,t){if(!t.rows.length){var i=j(zr,"missing");return o(i)}var a=t.rows.item(0),s=ot(a.metadata);r(le(n,s))})}var g,b=this,w=null,S=Wt(e),k=[];b._name=e.name;var q=Wr({},e,{version:zo,description:e.name,size:S}),A=Xt(q);if(A.error)return Ht(t)(A.error);var x=A.db;"function"!=typeof x.readTransaction&&(x.readTransaction=x.transaction),p(),b.type=function(){return"websql"},b._id=f(function(e){e(null,w)}),b._info=function(e){var t,n;x.readTransaction(function(e){y(e,function(e){t=e}),_(e,function(e){n=e})},Ht(e),function(){e(null,{doc_count:n,update_seq:t,websql_encoding:g})})},b._bulkDocs=function(t,n,r){Jt(e,t,n,b,x,Ko,r)},b._get=function(e,t,n){function r(e){n(e,{doc:o,metadata:i,ctx:a})}var o,i,a=t.ctx;if(!a)return x.readTransaction(function(r){b._get(e,Wr({ctx:r},t),n)});var s,u;if(t.rev){if(t.latest)return void m(a,e,t.rev,function(r){t.latest=!1,t.rev=r,b._get(e,t,n)},r);s=Ut(Zo,[Fo,Mo],Fo+".id="+Mo+".doc_id",[Mo+".doc_id=?",Mo+".rev=?"]),u=[e,t.rev]}else s=Ut(Zo,[Fo,Mo],Yo,Fo+".id=?"),u=[e];a.executeSql(s,u,function(e,n){if(!n.rows.length){var a=j(zr,"missing");return r(a)}var s=n.rows.item(0);if(i=ot(s.metadata),s.deleted&&!t.rev){var u=j(zr,"deleted");return r(u)}o=Ft(s.data,i.id,s.rev),r()})},b._allDocs=function(e,t){var n,r=[],o="startkey"in e&&e.startkey,i="endkey"in e&&e.endkey,a="key"in e&&e.key,s="descending"in e&&e.descending,u="limit"in e?e.limit:-1,c="skip"in e?e.skip:0,f=e.inclusive_end!==!1,l=[],d=[];if(a!==!1)d.push(Fo+".id = ?"),l.push(a);else if(o!==!1||i!==!1){if(o!==!1&&(d.push(Fo+".id "+(s?"<=":">=")+" ?"),l.push(o)),i!==!1){var h=s?">":"<";f&&(h+="="),d.push(Fo+".id "+h+" ?"),l.push(i)}a!==!1&&(d.push(Fo+".id = ?"),l.push(a))}"ok"!==e.deleted&&d.push(Mo+".deleted = 0"),x.readTransaction(function(t){if(_(t,function(e){n=e}),0!==u){var o=Ut(Zo,[Fo,Mo],Yo,d,Fo+".id "+(s?"DESC":"ASC"));o+=" LIMIT "+u+" OFFSET "+c,t.executeSql(o,l,function(t,n){for(var o=0,i=n.rows.length;o<i;o++){var a=n.rows.item(o),s=ot(a.metadata),u=s.id,c=Ft(a.data,u,a.rev),f=c._rev,l={id:u,key:u,value:{rev:f}};if(e.include_docs){if(l.doc=c,l.doc._rev=f,e.conflicts){var d=V(s);d.length&&(l.doc._conflicts=d)}Gt(l.doc,e,b,t)}if(a.deleted){if("ok"!==e.deleted)continue;l.value.deleted=!0,l.doc=null}r.push(l)}})}},Ht(t),function(){t(null,{total_rows:n,offset:e.skip,rows:r})})},b._changes=function(e){function t(){var t=Fo+".json AS metadata, "+Fo+".max_seq AS maxSeq, "+Mo+".json AS winningDoc, "+Mo+".rev AS winningRev ",n=Fo+" JOIN "+Mo,u=Fo+".id="+Mo+".doc_id AND "+Fo+".winningseq="+Mo+".seq",c=["maxSeq > ?"],f=[e.since];e.doc_ids&&(c.push(Fo+".id IN "+Mt(e.doc_ids.length)),f=f.concat(e.doc_ids));var l="maxSeq "+(r?"DESC":"ASC"),d=Ut(t,n,u,c,l),h=I(e);e.view||e.filter||(d+=" LIMIT "+o);var p=e.since||0;x.readTransaction(function(t){t.executeSql(d,f,function(t,n){function r(t){return function(){e.onChange(t)}}for(var u=0,c=n.rows.length;u<c;u++){var f=n.rows.item(u),l=ot(f.metadata);p=f.maxSeq;var d=Ft(f.winningDoc,l.id,f.winningRev),v=e.processChange(d,l,e);v.seq=f.maxSeq;var y=h(v);if("object"==typeof y)return e.complete(y);if(y&&(s++,i&&a.push(v),e.attachments&&e.include_docs?Gt(d,e,b,t,r(v)):r(v)()),s===o)break}})},Ht(e.complete),function(){e.continuous||e.complete(null,{results:a,last_seq:p})})}if(e=u(e),e.continuous){var n=b._name+":"+J();return Ko.addListener(b._name,n,b,e),Ko.notify(b._name),{cancel:function(){Ko.removeListener(b._name,n)}}}var r=e.descending;e.since=e.since&&!r?e.since:0;var o="limit"in e?e.limit:-1;0===o&&(o=1);var i;i="return_docs"in e?e.return_docs:!("returnDocs"in e)||e.returnDocs;var a=[],s=0;t()},b._close=function(e){e()},b._getAttachment=function(e,t,n,r,o){var i,a=r.ctx,s=n.digest,u=n.content_type,c="SELECT escaped, CASE WHEN escaped = 1 THEN body ELSE HEX(body) END AS body FROM "+Uo+" WHERE digest=?";a.executeSql(c,[s],function(e,t){var n=t.rows.item(0),a=n.escaped?Nt(n.body):It(n.body,g);i=r.binary?Be(a,u):bo(a),o(null,i)})},b._getRevisionTree=function(e,t){x.readTransaction(function(n){var r="SELECT json AS metadata FROM "+Fo+" WHERE id = ?";n.executeSql(r,[e],function(e,n){if(n.rows.length){var r=ot(n.rows.item(0).metadata);t(null,r.rev_tree)}else t(j(zr))})})},b._doCompaction=function(e,t,n){return t.length?void x.transaction(function(n){var r="SELECT json AS metadata FROM "+Fo+" WHERE id = ?";n.executeSql(r,[e],function(n,r){var o=ot(r.rows.item(0).metadata);z(o.rev_tree,function(e,n,r,o,i){var a=n+"-"+r;t.indexOf(a)!==-1&&(i.status="missing")});var i="UPDATE "+Fo+" SET json = ? WHERE id = ?";n.executeSql(i,[it(o),e])}),Pt(t,e,n)},Ht(n),function(){n()}):n()},b._getLocal=function(e,t){x.readTransaction(function(n){var r="SELECT json, rev FROM "+Po+" WHERE id=?";n.executeSql(r,[e],function(n,r){if(r.rows.length){var o=r.rows.item(0),i=Ft(o.json,e,o.rev);t(null,i)}else t(j(zr))})})},b._putLocal=function(e,t,n){function r(e){var r,c;i?(r="UPDATE "+Po+" SET rev=?, json=? WHERE id=? AND rev=?",c=[o,u,a,i]):(r="INSERT INTO "+Po+" (id, rev, json) VALUES (?,?,?)",c=[a,o,u]),e.executeSql(r,c,function(e,r){r.rowsAffected?(s={ok:!0,id:a,rev:o},t.ctx&&n(null,s)):n(j(Xr))},function(){return n(j(Xr)),!1})}"function"==typeof t&&(n=t,t={}),delete e._revisions;var o,i=e._rev,a=e._id;o=i?e._rev="0-"+(parseInt(i.split("-")[1],10)+1):e._rev="0-1";var s,u=Bt(e);t.ctx?r(t.ctx):x.transaction(r,Ht(n),function(){s&&n(null,s)})},b._removeLocal=function(e,t,n){function r(r){var i="DELETE FROM "+Po+" WHERE id=? AND rev=?",a=[e._id,e._rev];r.executeSql(i,a,function(r,i){return i.rowsAffected?(o={ok:!0,id:e._id,rev:"0-0"},void(t.ctx&&n(null,o))):n(j(zr))})}"function"==typeof t&&(n=t,t={});var o;t.ctx?r(t.ctx):x.transaction(r,Ht(n),function(){o&&n(null,o)})},b._destroy=function(e,t){Ko.removeAllListeners(b._name),x.transaction(function(e){var t=[Fo,Mo,Uo,Ho,Po,Wo];t.forEach(function(t){e.executeSql("DROP TABLE IF EXISTS "+t,[])})},Ht(t),function(){E()&&(delete window.localStorage["_pouch__websqldb_"+b._name],delete window.localStorage[b._name]),t(null,{ok:!0})})}}function Qt(){try{return openDatabase("_pouch_validate_websql",1,"",1),!0}catch(e){return!1}}function $t(){if("undefined"==typeof indexedDB||null===indexedDB||!/iP(hone|od|ad)/.test(navigator.userAgent))return!0;var e=E(),t="_pouch__websqldb_valid_"+navigator.userAgent;if(e&&localStorage[t])return"1"===localStorage[t];var n=Qt();return e&&(localStorage[t]=n?"1":"0"),n}function Yt(){return"function"==typeof openDatabase&&$t()}function Zt(e,t,n,r){return openDatabase(e,t,n,r)}function en(e,t){var n=Wr({websql:Zt},e);Vt.call(this,n,t)}function tn(){for(var e={},t=new Dr(function(t,n){e.resolve=t,e.reject=n}),n=new Array(arguments.length),r=0;r<n.length;r++)n[r]=arguments[r];return e.promise=t,Dr.resolve().then(function(){return fetch.apply(null,n)}).then(function(t){e.resolve(t)}).catch(function(t){e.reject(t)}),e}function nn(e,t){var n,r,o,i=new Headers,a={method:e.method,credentials:"include",headers:i};return e.json&&(i.set("Accept","application/json"),i.set("Content-Type",e.headers["Content-Type"]||"application/json")),e.body&&e.processData&&"string"!=typeof e.body?a.body=JSON.stringify(e.body):"body"in e?a.body=e.body:a.body=null,Object.keys(e.headers).forEach(function(t){e.headers.hasOwnProperty(t)&&i.set(t,e.headers[t])}),n=tn(e.url,a),e.timeout>0&&(r=setTimeout(function(){n.reject(new Error("Load timeout for resource: "+e.url))},e.timeout)),n.promise.then(function(t){return o={statusCode:t.status},e.timeout>0&&clearTimeout(r),o.statusCode>=200&&o.statusCode<300?e.binary?t.blob():t.text():t.json()}).then(function(e){o.statusCode>=200&&o.statusCode<300?t(null,o,e):(e.status=o.statusCode,t(e))}).catch(function(e){e||(e=new Error("canceled")),t(e)}),{abort:n.reject}}function rn(e,t){var n,r,o=!1,i=function(){n.abort(),u()},a=function(){o=!0,n.abort(),u()},s={abort:i},u=function(){clearTimeout(r),s.abort=function(){},n&&(n.onprogress=void 0,n.upload&&(n.upload.onprogress=void 0),n.onreadystatechange=void 0,n=void 0)};n=e.xhr?new e.xhr:new XMLHttpRequest;try{n.open(e.method,e.url)}catch(e){return t(new Error(e.name||"Url is invalid"))}n.withCredentials=!("withCredentials"in e)||e.withCredentials,"GET"===e.method?delete e.headers["Content-Type"]:e.json&&(e.headers.Accept="application/json",e.headers["Content-Type"]=e.headers["Content-Type"]||"application/json",e.body&&e.processData&&"string"!=typeof e.body&&(e.body=JSON.stringify(e.body))),e.binary&&(n.responseType="arraybuffer"),"body"in e||(e.body=null);for(var c in e.headers)e.headers.hasOwnProperty(c)&&n.setRequestHeader(c,e.headers[c]);return e.timeout>0&&(r=setTimeout(a,e.timeout),n.onprogress=function(){clearTimeout(r),4!==n.readyState&&(r=setTimeout(a,e.timeout))},"undefined"!=typeof n.upload&&(n.upload.onprogress=n.onprogress)),n.onreadystatechange=function(){if(4===n.readyState){var r={statusCode:n.status};if(n.status>=200&&n.status<300){var i;i=e.binary?Re([n.response||""],{type:n.getResponseHeader("Content-Type")}):n.responseText,t(null,r,i)}else{var a={};if(o)a=new Error("ETIMEDOUT"),a.code="ETIMEDOUT";else if("string"==typeof n.response)try{a=JSON.parse(n.response)}catch(e){}a.status=n.status,t(a)}u()}},e.body&&e.body instanceof Blob?We(e.body,function(e){n.send(e)}):n.send(e.body),s}function on(){try{return new XMLHttpRequest,!0}catch(e){return!1}}function an(e,t){return ti||e.xhr?rn(e,t):nn(e,t)}function sn(){return""}function un(e,t){function n(t,n,r){if(!e.binary&&e.json&&"string"==typeof t)try{t=JSON.parse(t)}catch(e){return r(e)}Array.isArray(t)&&(t=t.map(function(e){return e.error||e.missing?C(e):e})),e.binary&&ni(t,n),r(null,t,n)}e=u(e);var r={method:"GET",headers:{},json:!0,processData:!0,timeout:1e4,cache:!1};return e=Wr(r,e),e.json&&(e.binary||(e.headers.Accept="application/json"),e.headers["Content-Type"]=e.headers["Content-Type"]||"application/json"),e.binary&&(e.encoding=null,e.json=!1),e.processData||(e.json=!1),an(e,function(r,o,i){if(r)return t(C(r));var a,s=o.headers&&o.headers["content-type"],u=i||sn();if(!e.binary&&(e.json||!e.processData)&&"object"!=typeof u&&(/json/.test(s)||/^[\s]*\{/.test(u)&&/\}[\s]*$/.test(u)))try{u=JSON.parse(u.toString())}catch(e){}o.statusCode>=200&&o.statusCode<300?n(u,o,t):(a=C(u),a.status=o.statusCode,t(a))})}function cn(e,t){var n=navigator&&navigator.userAgent?navigator.userAgent.toLowerCase():"",r=n.indexOf("safari")!==-1&&n.indexOf("chrome")===-1,o=n.indexOf("msie")!==-1,i=n.indexOf("edge")!==-1,a=r||(o||i)&&"GET"===e.method,s=!("cache"in e)||e.cache,u=/^blob:/.test(e.url);if(!u&&(a||!s)){var c=e.url.indexOf("?")!==-1;e.url+=(c?"&":"?")+"_nonce="+Date.now()}return un(e,t)}function fn(e,t){return new Dr(function(n,r){function o(){f++,e[l++]().then(a,s)}function i(){++d===h?c?r(c):n():u()}function a(){f--,i()}function s(e){f--,c=c||e,i()}function u(){for(;f<t&&l<h;)o()}var c,f=0,l=0,d=0,h=e.length;u()})}function ln(e){var t=e.doc&&e.doc._attachments;t&&Object.keys(t).forEach(function(e){var n=t[e];n.data=Fe(n.data,n.content_type)})}function dn(e){return/^_design/.test(e)?"_design/"+encodeURIComponent(e.slice(8)):/^_local/.test(e)?"_local/"+encodeURIComponent(e.slice(7)):encodeURIComponent(e)}function hn(e){return e._attachments&&Object.keys(e._attachments)?Dr.all(Object.keys(e._attachments).map(function(t){var n=e._attachments[t];if(n.data&&"string"!=typeof n.data)return new Dr(function(e){He(n.data,e)}).then(function(e){n.data=e})})):Dr.resolve()}function pn(e){if(!e.prefix)return!1;var t=U(e.prefix).protocol;return"http"===t||"https"===t}function vn(e,t){if(pn(t)){var n=t.name.substr(t.prefix.length);e=t.prefix+encodeURIComponent(n)}var r=U(e);(r.user||r.password)&&(r.auth={username:r.user,password:r.password});var o=r.path.replace(/(^\/|\/$)/g,"").split("/");return r.db=o.pop(),r.db.indexOf("%")===-1&&(r.db=encodeURIComponent(r.db)),r.path=o.join("/"),r}function yn(e,t){return _n(e,e.db+"/"+t)}function _n(e,t){var n=e.path?"/":"";return e.protocol+"://"+e.host+(e.port?":"+e.port:"")+"/"+e.path+n+t}function mn(e){return"?"+Object.keys(e).map(function(t){return t+"="+encodeURIComponent(e[t])}).join("&")}function gn(e,t){function n(e,t,n){var r=e.ajax||{},o=Wr(u(d),r,t),i=u(d.headers||{});return o.headers=Wr(i,r.headers,t.headers||{}),ai(o.method+" "+o.url),s._ajax(o,n)}function r(e,t){return new Dr(function(r,o){n(e,t,function(e,t){return e?o(e):void r(t)})})}function o(e,t){return l(e,Ar(function(e){i().then(function(){return t.apply(this,e)}).catch(function(t){var n=e.pop();n(t)})}))}function i(){if(e.skipSetup||e.skip_setup)return Dr.resolve();if(y)return y;var t={method:"GET",url:f};return y=r({},t).catch(function(e){return e&&e.status&&404===e.status?(T(404,"PouchDB is just detecting if the remote exists."),r({},{method:"PUT",url:f})):Dr.reject(e)}).catch(function(e){return!(!e||!e.status||412!==e.status)||Dr.reject(e)}),y.catch(function(){y=null}),y}function a(e){return e.split("/").map(encodeURIComponent).join("/")}var s=this,c=vn(e.name,e),f=yn(c,"");e=u(e);var d=e.ajax||{};if(e.auth||c.auth){var h=e.auth||c.auth,p=h.username+":"+h.password,v=bo(unescape(encodeURIComponent(p)));d.headers=d.headers||{},d.headers.Authorization="Basic "+v}s._ajax=cn;var y;jr(function(){t(null,s)}),s.type=function(){return"http"},s.id=o("id",function(e){n({},{method:"GET",url:_n(c,"")},function(t,n){var r=n&&n.uuid?n.uuid+c.db:yn(c,"");e(null,r)})}),s.request=o("request",function(e,t){e.url=yn(c,e.url),n({},e,t)}),s.compact=o("compact",function(e,t){"function"==typeof e&&(t=e,e={}),e=u(e),n(e,{url:yn(c,"_compact"),method:"POST"},function(){function n(){s.info(function(r,o){o&&!o.compact_running?t(null,{ok:!0}):setTimeout(n,e.interval||200)})}n()})}),s.bulkGet=l("bulkGet",function(e,t){function r(t){var r={};e.revs&&(r.revs=!0),e.attachments&&(r.attachments=!0),e.latest&&(r.latest=!0),n(e,{url:yn(c,"_bulk_get"+mn(r)),method:"POST",body:{docs:e.docs}},t)}function o(){function n(e){return function(n,r){s[e]=r.results,++a===o&&t(null,{results:D(s)})}}for(var r=oi,o=Math.ceil(e.docs.length/r),a=0,s=new Array(o),u=0;u<o;u++){var c=_(e,["revs","attachments","latest"]);c.ajax=d,c.docs=e.docs.slice(u*r,Math.min(e.docs.length,(u+1)*r)),b(i,c,n(u))}}var i=this,a=_n(c,""),s=ii[a];"boolean"!=typeof s?r(function(e,n){e?(ii[a]=!1,T(e.status,"PouchDB is just detecting if the remote supports the _bulk_get API."),o()):(ii[a]=!0,t(null,n))}):s?r(t):o()}),s._info=function(e){i().then(function(){n({},{method:"GET",url:yn(c,"")},function(t,n){return t?e(t):(n.host=yn(c,""),void e(null,n))})}).catch(e)},s.get=o("get",function(e,t,n){function o(e){function n(n){var i=o[n],s=dn(e._id)+"/"+a(n)+"?rev="+e._rev;return r(t,{method:"GET",url:yn(c,s),binary:!0}).then(function(e){return t.binary?e:new Dr(function(t){He(e,t)})}).then(function(e){delete i.stub,delete i.length,i.data=e})}var o=e._attachments,i=o&&Object.keys(o);if(o&&i.length){var s=i.map(function(e){return function(){return n(e)}});return fn(s,5)}}function i(e){return Array.isArray(e)?Dr.all(e.map(function(e){if(e.ok)return o(e.ok)})):o(e)}"function"==typeof t&&(n=t,t={}),t=u(t);var s={};t.revs&&(s.revs=!0),t.revs_info&&(s.revs_info=!0),t.latest&&(s.latest=!0),t.open_revs&&("all"!==t.open_revs&&(t.open_revs=JSON.stringify(t.open_revs)),s.open_revs=t.open_revs),t.rev&&(s.rev=t.rev),t.conflicts&&(s.conflicts=t.conflicts),e=dn(e);var f={method:"GET",url:yn(c,e+mn(s))};r(t,f).then(function(e){return Dr.resolve().then(function(){if(t.attachments)return i(e)}).then(function(){n(null,e)})}).catch(n)}),s.remove=o("remove",function(e,t,r,o){var i;"string"==typeof t?(i={_id:e,_rev:t},"function"==typeof r&&(o=r,r={})):(i=e,"function"==typeof t?(o=t,r={}):(o=r,r=t));var a=i._rev||r.rev;n(r,{method:"DELETE",url:yn(c,dn(i._id))+"?rev="+a},o)}),s.getAttachment=o("getAttachment",function(e,t,r,o){"function"==typeof r&&(o=r,r={});var i=r.rev?"?rev="+r.rev:"",s=yn(c,dn(e))+"/"+a(t)+i;n(r,{method:"GET",url:s,binary:!0},o)}),s.removeAttachment=o("removeAttachment",function(e,t,r,o){var i=yn(c,dn(e)+"/"+a(t))+"?rev="+r;n({},{method:"DELETE",url:i},o)}),s.putAttachment=o("putAttachment",function(e,t,r,o,i,s){"function"==typeof i&&(s=i,i=o,o=r,r=null);var u=dn(e)+"/"+a(t),f=yn(c,u);if(r&&(f+="?rev="+r),"string"==typeof o){var l;try{l=go(o)}catch(e){return s(j(Yr,"Attachment is not a valid base64 string"))}o=l?Be(l,i):""}var h={headers:{"Content-Type":i},method:"PUT",url:f,processData:!1,body:o,timeout:d.timeout||6e4};n({},h,s)}),s._bulkDocs=function(e,t,r){e.new_edits=t.new_edits,i().then(function(){return Dr.all(e.docs.map(hn))}).then(function(){n(t,{method:"POST",url:yn(c,"_bulk_docs"),timeout:t.timeout,body:e},function(e,t){return e?r(e):(t.forEach(function(e){e.ok=!0}),void r(null,t))})}).catch(r)},s._put=function(e,t,r){i().then(function(){return hn(e)}).then(function(){n(t,{method:"PUT",url:yn(c,dn(e._id)),body:e},function(e,t){return e?r(e):void r(null,t)})}).catch(r)},s.allDocs=o("allDocs",function(e,t){"function"==typeof e&&(t=e,e={}),e=u(e);var n,o={},i="GET";e.conflicts&&(o.conflicts=!0),e.descending&&(o.descending=!0),e.include_docs&&(o.include_docs=!0),e.attachments&&(o.attachments=!0),e.key&&(o.key=JSON.stringify(e.key)),e.start_key&&(e.startkey=e.start_key),e.startkey&&(o.startkey=JSON.stringify(e.startkey)),e.end_key&&(e.endkey=e.end_key),e.endkey&&(o.endkey=JSON.stringify(e.endkey)),"undefined"!=typeof e.inclusive_end&&(o.inclusive_end=!!e.inclusive_end),"undefined"!=typeof e.limit&&(o.limit=e.limit),"undefined"!=typeof e.skip&&(o.skip=e.skip);var a=mn(o);"undefined"!=typeof e.keys&&(i="POST",n={keys:e.keys}),r(e,{method:i,url:yn(c,"_all_docs"+a),body:n}).then(function(n){e.include_docs&&e.attachments&&e.binary&&n.rows.forEach(ln),t(null,n)}).catch(t)}),s._changes=function(e){var t="batch_size"in e?e.batch_size:ri;e=u(e),e.timeout="timeout"in e?e.timeout:"timeout"in d?d.timeout:3e4;var r,o=e.timeout?{timeout:e.timeout-5e3}:{},a="undefined"!=typeof e.limit&&e.limit;r="return_docs"in e?e.return_docs:!("returnDocs"in e)||e.returnDocs;var s=a;if(e.style&&(o.style=e.style),(e.include_docs||e.filter&&"function"==typeof e.filter)&&(o.include_docs=!0),e.attachments&&(o.attachments=!0),e.continuous&&(o.feed="longpoll"),e.conflicts&&(o.conflicts=!0),e.descending&&(o.descending=!0),"heartbeat"in e?e.heartbeat&&(o.heartbeat=e.heartbeat):e.continuous&&(o.heartbeat=1e4),e.filter&&"string"==typeof e.filter&&(o.filter=e.filter),e.view&&"string"==typeof e.view&&(o.filter="_view",o.view=e.view),e.query_params&&"object"==typeof e.query_params)for(var f in e.query_params)e.query_params.hasOwnProperty(f)&&(o[f]=e.query_params[f]);var l,h="GET";e.doc_ids&&(o.filter="_doc_ids",h="POST",l={doc_ids:e.doc_ids});var p,v,y=function(r,u){if(!e.aborted){o.since=r,"object"==typeof o.since&&(o.since=JSON.stringify(o.since)),e.descending?a&&(o.limit=s):o.limit=!a||s>t?t:s;var f={method:h,url:yn(c,"_changes"+mn(o)),timeout:e.timeout,body:l};v=r,e.aborted||i().then(function(){p=n(e,f,u)}).catch(u)}},_={results:[]},m=function(n,o){if(!e.aborted){var i=0;if(o&&o.results){i=o.results.length,_.last_seq=o.last_seq;var u={};u.query=e.query_params,o.results=o.results.filter(function(t){s--;var n=I(e)(t);return n&&(e.include_docs&&e.attachments&&e.binary&&ln(t),r&&_.results.push(t),e.onChange(t)),n})}else if(n)return e.aborted=!0,void e.complete(n);o&&o.last_seq&&(v=o.last_seq);var c=a&&s<=0||o&&i<t||e.descending;(!e.continuous||a&&s<=0)&&c?e.complete(null,_):jr(function(){y(v,m)})}};return y(e.since||0,m),{cancel:function(){e.aborted=!0,p&&p.abort()}}},s.revsDiff=o("revsDiff",function(e,t,r){"function"==typeof t&&(r=t,t={}),n(t,{method:"POST",url:yn(c,"_revs_diff"),body:e},r)}),s._close=function(e){e()},s._destroy=function(e,t){n(e,{url:yn(c,""),method:"DELETE"},function(e,n){return e&&e.status&&404!==e.status?t(e):void t(null,n)})}}function bn(e){this.status=400,this.name="query_parse_error",this.message=e,this.error=!0;try{Error.captureStackTrace(this,bn)}catch(e){}}function wn(e){this.status=404,this.name="not_found",this.message=e,this.error=!0;try{Error.captureStackTrace(this,wn)}catch(e){}}function En(e){this.status=500,this.name="invalid_value",this.message=e,this.error=!0;try{Error.captureStackTrace(this,En)}catch(e){}}function Sn(e,t){return t&&e.then(function(e){
jr(function(){t(null,e)})},function(e){jr(function(){t(e)})}),e}function kn(e){return Ar(function(t){var n=t.pop(),r=e.apply(this,t);return"function"==typeof n&&Sn(r,n),r})}function qn(e,t){return e.then(function(e){return t().then(function(){return e})},function(e){return t().then(function(){throw e})})}function An(e,t){return function(){var n=arguments,r=this;return e.add(function(){return t.apply(r,n)})}}function xn(e){var t=new Fr(e),n=new Array(t.size),r=-1;return t.forEach(function(e){n[++r]=e}),n}function Tn(e){var t=new Array(e.size),n=-1;return e.forEach(function(e,r){t[++n]=r}),t}function On(e){var t="builtin "+e+" function requires map values to be numbers or number arrays";return new En(t)}function jn(e){for(var t=0,n=0,r=e.length;n<r;n++){var o=e[n];if("number"!=typeof o){if(!Array.isArray(o))throw On("_sum");t="number"==typeof t?[t]:t;for(var i=0,a=o.length;i<a;i++){var s=o[i];if("number"!=typeof s)throw On("_sum");"undefined"==typeof t[i]?t.push(s):t[i]+=s}}else"number"==typeof t?t+=o:t[0]+=o}return t}function Cn(e,t){return Cr("return ("+e.replace(/;\s*$/,"")+");",{emit:t,sum:jn,log:ui,isArray:ci,toJSON:fi})}function Ln(e,t,n){for(var r="",o=n-e.length;r.length<o;)r+=t;return r}function In(e,t,n){var r=Ln(e,t,n);return r+e}function Dn(e,t){if(e===t)return 0;e=Rn(e),t=Rn(t);var n=Jn(e),r=Jn(t);if(n-r!==0)return n-r;switch(typeof e){case"number":return e-t;case"boolean":return e<t?-1:1;case"string":return Hn(e,t)}return Array.isArray(e)?Pn(e,t):Wn(e,t)}function Rn(e){switch(typeof e){case"undefined":return null;case"number":return e===1/0||e===-(1/0)||isNaN(e)?null:e;case"object":var t=e;if(Array.isArray(e)){var n=e.length;e=new Array(n);for(var r=0;r<n;r++)e[r]=Rn(t[r])}else{if(e instanceof Date)return e.toJSON();if(null!==e){e={};for(var o in t)if(t.hasOwnProperty(o)){var i=t[o];"undefined"!=typeof i&&(e[o]=Rn(i))}}}}return e}function Nn(e){if(null!==e)switch(typeof e){case"boolean":return e?1:0;case"number":return Kn(e);case"string":return e.replace(/\u0002/g,"").replace(/\u0001/g,"").replace(/\u0000/g,"");case"object":var t=Array.isArray(e),n=t?e:Object.keys(e),r=-1,o=n.length,i="";if(t)for(;++r<o;)i+=Bn(n[r]);else for(;++r<o;){var a=n[r];i+=Bn(a)+Bn(e[a])}return i}return""}function Bn(e){var t="\0";return e=Rn(e),Jn(e)+hi+Nn(e)+t}function Fn(e,t){var n,r=t,o="1"===e[t];if(o)n=0,t++;else{var i="0"===e[t];t++;var a="",s=e.substring(t,t+di),u=parseInt(s,10)+li;for(i&&(u=-u),t+=di;;){var c=e[t];if("\0"===c)break;a+=c,t++}a=a.split("."),n=1===a.length?parseInt(a,10):parseFloat(a[0]+"."+a[1]),i&&(n-=10),0!==u&&(n=parseFloat(n+"e"+u))}return{num:n,length:t-r}}function Mn(e,t){var n=e.pop();if(t.length){var r=t[t.length-1];n===r.element&&(t.pop(),r=t[t.length-1]);var o=r.element,i=r.index;if(Array.isArray(o))o.push(n);else if(i===e.length-2){var a=e.pop();o[a]=n}else e.push(n)}}function Un(e){for(var t=[],n=[],r=0;;){var o=e[r++];if("\0"!==o)switch(o){case"1":t.push(null);break;case"2":t.push("1"===e[r]),r++;break;case"3":var i=Fn(e,r);t.push(i.num),r+=i.length;break;case"4":for(var a="";;){var s=e[r];if("\0"===s)break;a+=s,r++}a=a.replace(/\u0001\u0001/g,"\0").replace(/\u0001\u0002/g,"").replace(/\u0002\u0002/g,""),t.push(a);break;case"5":var u={element:[],index:t.length};t.push(u.element),n.push(u);break;case"6":var c={element:{},index:t.length};t.push(c.element),n.push(c);break;default:throw new Error("bad collationIndex or unexpectedly reached end of input: "+o)}else{if(1===t.length)return t.pop();Mn(t,n)}}}function Pn(e,t){for(var n=Math.min(e.length,t.length),r=0;r<n;r++){var o=Dn(e[r],t[r]);if(0!==o)return o}return e.length===t.length?0:e.length>t.length?1:-1}function Hn(e,t){return e===t?0:e>t?1:-1}function Wn(e,t){for(var n=Object.keys(e),r=Object.keys(t),o=Math.min(n.length,r.length),i=0;i<o;i++){var a=Dn(n[i],r[i]);if(0!==a)return a;if(a=Dn(e[n[i]],t[r[i]]),0!==a)return a}return n.length===r.length?0:n.length>r.length?1:-1}function Jn(e){var t=["boolean","number","string","object"],n=t.indexOf(typeof e);return~n?null===e?1:Array.isArray(e)?5:n<3?n+2:n+3:Array.isArray(e)?5:void 0}function Kn(e){if(0===e)return"1";var t=e.toExponential().split(/e\+?/),n=parseInt(t[1],10),r=e<0,o=r?"0":"2",i=(r?-n:n)-li,a=In(i.toString(),"0",di);o+=hi+a;var s=Math.abs(parseFloat(t[0]));r&&(s=10-s);var u=s.toFixed(20);return u=u.replace(/\.?0+$/,""),o+=hi+u}function zn(){this.promise=new Dr(function(e){e()})}function Xn(e,t,n,r,o,i){var a,s=n.toString()+(r&&r.toString())+"undefined";if(!o&&(a=e._cachedViews=e._cachedViews||{},a[s]))return a[s];var u=e.info().then(function(u){function c(e){e.views=e.views||{};var n=t;n.indexOf("/")===-1&&(n=t+"/"+t);var r=e.views[n]=e.views[n]||{};if(!r[f])return r[f]=!0,e}var f=u.db_name+"-mrview-"+(o?"temp":Ve(s));return P(e,"_local/"+i,c).then(function(){return e.registerDependentDatabase(f).then(function(t){var o=t.db;o.auto_compaction=!0;var i={name:f,db:o,sourceDB:e,adapter:e.adapter,mapFun:n,reduceFun:r};return i.db.get("_local/lastSeq").catch(function(e){if(404!==e.status)throw e}).then(function(e){return i.seq=e?e.seq:0,a&&i.db.once("destroyed",function(){delete a[s]}),i})})})});return a&&(a[s]=u),u}function Gn(e){return e.indexOf("/")===-1?[e,e]:e.split("/")}function Vn(e){return 1===e.length&&/^1-/.test(e[0].rev)}function Qn(e,t){try{e.emit("error",t)}catch(e){q("error","The user's map/reduce function threw an uncaught error.\nYou can debug this error by doing:\nmyDatabase.on('error', function (err) { debugger; });\nPlease double-check your map/reduce function."),q("error",t)}}function $n(e,t,n,r){function o(e,t,n){try{t(n)}catch(t){Qn(e,t)}}function i(e,t,n,r,o){try{return{output:t(n,r,o)}}catch(t){return Qn(e,t),{error:t}}}function a(e,t){var n=Dn(e.key,t.key);return 0!==n?n:Dn(e.value,t.value)}function s(e,t,n){return n=n||0,"number"==typeof t?e.slice(n,t+n):n>0?e.slice(n):e}function u(e){var t=e.value,n=t&&"object"==typeof t&&t._id||e.id;return n}function c(e){e.rows.forEach(function(e){var t=e.doc&&e.doc._attachments;t&&Object.keys(t).forEach(function(e){var n=t[e];t[e].data=Fe(n.data,n.content_type)})})}function f(e){return function(t){return e.include_docs&&e.attachments&&e.binary&&c(t),t}}function l(e,t,n,r){var o=t[e];"undefined"!=typeof o&&(r&&(o=encodeURIComponent(JSON.stringify(o))),n.push(e+"="+o))}function d(e){if("undefined"!=typeof e){var t=Number(e);return isNaN(t)||t!==parseInt(e,10)?e:t}}function h(e){return e.group_level=d(e.group_level),e.limit=d(e.limit),e.skip=d(e.skip),e}function p(e){if(e){if("number"!=typeof e)return new bn('Invalid value for integer: "'+e+'"');if(e<0)return new bn('Invalid value for positive integer: "'+e+'"')}}function v(e,t){var n=e.descending?"endkey":"startkey",r=e.descending?"startkey":"endkey";if("undefined"!=typeof e[n]&&"undefined"!=typeof e[r]&&Dn(e[n],e[r])>0)throw new bn("No rows can match your key range, reverse your start_key and end_key or set {descending : true}");if(t.reduce&&e.reduce!==!1){if(e.include_docs)throw new bn("{include_docs:true} is invalid for reduce");if(e.keys&&e.keys.length>1&&!e.group&&!e.group_level)throw new bn("Multi-key fetches for reduce views must use {group: true}")}["group_level","limit","skip"].forEach(function(t){var n=p(e[t]);if(n)throw n})}function y(e,t,n){var r,o=[],i="GET";if(l("reduce",n,o),l("include_docs",n,o),l("attachments",n,o),l("limit",n,o),l("descending",n,o),l("group",n,o),l("group_level",n,o),l("skip",n,o),l("stale",n,o),l("conflicts",n,o),l("startkey",n,o,!0),l("start_key",n,o,!0),l("endkey",n,o,!0),l("end_key",n,o,!0),l("inclusive_end",n,o),l("key",n,o,!0),o=o.join("&"),o=""===o?"":"?"+o,"undefined"!=typeof n.keys){var a=2e3,s="keys="+encodeURIComponent(JSON.stringify(n.keys));s.length+o.length+1<=a?o+=("?"===o[0]?"&":"?")+s:(i="POST","string"==typeof t?r={keys:n.keys}:t.keys=n.keys)}if("string"==typeof t){var u=Gn(t);return e.request({method:i,url:"_design/"+u[0]+"/_view/"+u[1]+o,body:r}).then(f(n))}return r=r||{},Object.keys(t).forEach(function(e){Array.isArray(t[e])?r[e]=t[e]:r[e]=t[e].toString()}),e.request({method:"POST",url:"_temp_view"+o,body:r}).then(f(n))}function _(e,t,n){return new Dr(function(r,o){e._query(t,n,function(e,t){return e?o(e):void r(t)})})}function m(e){return new Dr(function(t,n){e._viewCleanup(function(e,r){return e?n(e):void t(r)})})}function g(e){return function(t){if(404===t.status)return e;throw t}}function b(e,t,n){function r(){return Vn(f)?Dr.resolve(s):t.db.get(a).catch(g(s))}function o(e){return e.keys.length?t.db.allDocs({keys:e.keys,include_docs:!0}):Dr.resolve({rows:[]})}function i(e,t){for(var n=[],r=new Fr,o=0,i=t.rows.length;o<i;o++){var a=t.rows[o],s=a.doc;if(s&&(n.push(s),r.add(s._id),s._deleted=!c.has(s._id),!s._deleted)){var u=c.get(s._id);"value"in u&&(s.value=u.value)}}var f=Tn(c);return f.forEach(function(e){if(!r.has(e)){var t={_id:e},o=c.get(e);"value"in o&&(t.value=o.value),n.push(t)}}),e.keys=xn(f.concat(e.keys)),n.push(e),n}var a="_local/doc_"+e,s={_id:a,keys:[]},u=n.get(e),c=u[0],f=u[1];return r().then(function(e){return o(e).then(function(t){return i(e,t)})})}function w(e,t,n){var r="_local/lastSeq";return e.db.get(r).catch(g({_id:r,seq:0})).then(function(r){var o=Tn(t);return Dr.all(o.map(function(n){return b(n,e,t)})).then(function(t){var o=D(t);return r.seq=n,o.push(r),e.db.bulkDocs({docs:o})})})}function E(e){var t="string"==typeof e?e:e.name,n=pi[t];return n||(n=pi[t]=new zn),n}function S(e){return An(E(e),function(){return k(e)})()}function k(e){function n(e,t){var n={id:l._id,key:Rn(e)};"undefined"!=typeof t&&null!==t&&(n.value=Rn(t)),f.push(n)}function r(t,n){return function(){return w(e,t,n)}}function i(){return e.sourceDB.changes({conflicts:!0,include_docs:!0,style:"all_docs",since:h,limit:yi}).then(s)}function s(e){var t=e.results;if(t.length){var n=u(t);if(p.add(r(n,h)),!(t.length<yi))return i()}}function u(t){for(var n=new Mr,r=0,i=t.length;r<i;r++){var s=t[r];if("_"!==s.doc._id[0]){f=[],l=s.doc,l._deleted||o(e.sourceDB,d,l),f.sort(a);var u=c(f);n.set(s.doc._id,[u,s.changes])}h=s.seq}return n}function c(e){for(var t,n=new Mr,r=0,o=e.length;r<o;r++){var i=e[r],a=[i.key,i.id];r>0&&0===Dn(i.key,t)&&a.push(r),n.set(Bn(a),i),t=i.key}return n}var f,l,d=t(e.mapFun,n),h=e.seq||0,p=new zn;return i().then(function(){return p.finish()}).then(function(){e.seq=h})}function q(e,t,r){0===r.group_level&&delete r.group_level;var o=r.group||r.group_level,a=n(e.reduceFun),u=[],c=isNaN(r.group_level)?Number.POSITIVE_INFINITY:r.group_level;t.forEach(function(e){var t=u[u.length-1],n=o?e.key:null;return o&&Array.isArray(n)&&(n=n.slice(0,c)),t&&0===Dn(t.groupKey,n)?(t.keys.push([e.key,e.id]),void t.values.push(e.value)):void u.push({keys:[[e.key,e.id]],values:[e.value],groupKey:n})}),t=[];for(var f=0,l=u.length;f<l;f++){var d=u[f],h=i(e.sourceDB,a,d.keys,d.values,!1);if(h.error&&h.error instanceof En)throw h.error;t.push({value:h.error?null:h.output,key:d.groupKey})}return{rows:s(t,r.limit,r.skip)}}function A(e,t){return An(E(e),function(){return x(e,t)})()}function x(e,t){function n(t){return t.include_docs=!0,e.db.allDocs(t).then(function(e){return o=e.total_rows,e.rows.map(function(e){if("value"in e.doc&&"object"==typeof e.doc.value&&null!==e.doc.value){var t=Object.keys(e.doc.value).sort(),n=["id","key","value"];if(!(t<n||t>n))return e.doc.value}var r=Un(e.doc._id);return{key:r[0],id:r[1],value:"value"in e.doc?e.doc.value:null}})})}function r(n){var r;if(r=i?q(e,n,t):{total_rows:o,offset:a,rows:n},t.include_docs){var s=xn(n.map(u));return e.sourceDB.allDocs({keys:s,include_docs:!0,conflicts:t.conflicts,attachments:t.attachments,binary:t.binary}).then(function(e){var t=new Mr;return e.rows.forEach(function(e){t.set(e.id,e.doc)}),n.forEach(function(e){var n=u(e),r=t.get(n);r&&(e.doc=r)}),r})}return r}var o,i=e.reduceFun&&t.reduce!==!1,a=t.skip||0;if("undefined"==typeof t.keys||t.keys.length||(t.limit=0,delete t.keys),"undefined"!=typeof t.keys){var s=t.keys,c=s.map(function(e){var t={startkey:Bn([e]),endkey:Bn([e,{}])};return n(t)});return Dr.all(c).then(D).then(r)}var f={descending:t.descending};if(t.start_key&&(t.startkey=t.start_key),t.end_key&&(t.endkey=t.end_key),"undefined"!=typeof t.startkey&&(f.startkey=Bn(t.descending?[t.startkey,{}]:[t.startkey])),"undefined"!=typeof t.endkey){var l=t.inclusive_end!==!1;t.descending&&(l=!l),f.endkey=Bn(l?[t.endkey,{}]:[t.endkey])}if("undefined"!=typeof t.key){var d=Bn([t.key]),h=Bn([t.key,{}]);f.descending?(f.endkey=d,f.startkey=h):(f.startkey=d,f.endkey=h)}return i||("number"==typeof t.limit&&(f.limit=t.limit),f.skip=a),n(f).then(r)}function T(e){return e.request({method:"POST",url:"_view_cleanup"})}function O(t){return t.get("_local/"+e).then(function(e){var n=new Mr;Object.keys(e.views).forEach(function(e){var t=Gn(e),r="_design/"+t[0],o=t[1],i=n.get(r);i||(i=new Fr,n.set(r,i)),i.add(o)});var r={keys:Tn(n),include_docs:!0};return t.allDocs(r).then(function(r){var o={};r.rows.forEach(function(t){var r=t.key.substring(8);n.get(t.key).forEach(function(n){var i=r+"/"+n;e.views[i]||(i=n);var a=Object.keys(e.views[i]),s=t.doc&&t.doc.views&&t.doc.views[n];a.forEach(function(e){o[e]=o[e]||s})})});var i=Object.keys(o).filter(function(e){return!o[e]}),a=i.map(function(e){return An(E(e),function(){return new t.constructor(e,t.__opts).destroy()})()});return Dr.all(a).then(function(){return{ok:!0}})})},g({ok:!0}))}function j(t,n,o){if("http"===t.type())return y(t,n,o);if("function"==typeof t._query)return _(t,n,o);if("string"!=typeof n)return v(o,n),vi.add(function(){var r=Xn(t,"temp_view/temp_view",n.map,n.reduce,!0,e);return r.then(function(e){return qn(S(e).then(function(){return A(e,o)}),function(){return e.db.destroy()})})}),vi.finish();var i=n,a=Gn(i),s=a[0],u=a[1];return t.get("_design/"+s).then(function(n){var a=n.views&&n.views[u];if(!a)throw new wn("ddoc "+n._id+" has no view named "+u);r(n,u),v(o,a);var s=Xn(t,i,a.map,a.reduce,!1,e);return s.then(function(e){return"ok"===o.stale||"update_after"===o.stale?("update_after"===o.stale&&jr(function(){S(e)}),A(e,o)):S(e).then(function(){return A(e,o)})})})}function C(e,t,n){var r=this;"function"==typeof t&&(n=t,t={}),t=t?h(t):{},"function"==typeof e&&(e={map:e});var o=Dr.resolve().then(function(){return j(r,e,t)});return Sn(o,n),o}var L=kn(function(){var e=this;return"http"===e.type()?T(e):"function"==typeof e._viewCleanup?m(e):O(e)});return{query:C,viewCleanup:L}}function Yn(e,t){if("function"==typeof e&&2===e.length){var n=e;return function(e){return n(e,t)}}return Cn(e.toString(),t)}function Zn(e){return _i[e]?_i[e]:Cn(e.toString())}function er(e,t){var n=e.views&&e.views[t];if("string"!=typeof n.map)throw new wn("ddoc "+e._id+" has no string view named "+t+", instead found object of type: "+typeof n.map)}function tr(e,t,n){return gi.query.call(this,e,t,n)}function nr(e){return gi.viewCleanup.call(this,e)}function rr(e){return/^1-/.test(e)}function or(e,t,n){return!e._attachments||!e._attachments[n]||e._attachments[n].digest!==t._attachments[n].digest}function ir(e,t){var n=Object.keys(t._attachments);return Dr.all(n.map(function(n){return e.getAttachment(t._id,n,{rev:t._rev})}))}function ar(e,t,n){var r="http"===t.type()&&"http"!==e.type(),o=Object.keys(n._attachments);return r?e.get(n._id).then(function(r){return Dr.all(o.map(function(o){return or(r,n,o)?t.getAttachment(n._id,o):e.getAttachment(r._id,o)}))}).catch(function(e){if(404!==e.status)throw e;return ir(t,n)}):ir(t,n)}function sr(e){var t=[];return Object.keys(e).forEach(function(n){var r=e[n].missing;r.forEach(function(e){t.push({id:n,rev:e})})}),{docs:t,revs:!0,latest:!0}}function ur(e,t,n,r){function o(){var o=sr(n);if(o.docs.length)return e.bulkGet(o).then(function(n){if(r.cancelled)throw new Error("cancelled");return Dr.all(n.results.map(function(n){return Dr.all(n.docs.map(function(n){var r=n.ok;return n.error&&(d=!1),r&&r._attachments?ar(t,e,r).then(function(e){var t=Object.keys(r._attachments);return e.forEach(function(e,n){var o=r._attachments[t[n]];delete o.stub,delete o.length,o.data=e}),r}):r}))})).then(function(e){l=l.concat(D(e).filter(Boolean))})})}function i(e){return e._attachments&&Object.keys(e._attachments).length>0}function a(e){return e._conflicts&&e._conflicts.length>0}function s(t){return e.allDocs({keys:t,include_docs:!0,conflicts:!0}).then(function(e){if(r.cancelled)throw new Error("cancelled");e.rows.forEach(function(e){e.deleted||!e.doc||!rr(e.value.rev)||i(e.doc)||a(e.doc)||(e.doc._conflicts&&delete e.doc._conflicts,l.push(e.doc),delete n[e.id])})})}function c(){var e=Object.keys(n).filter(function(e){var t=n[e].missing;return 1===t.length&&rr(t[0])});if(e.length>0)return s(e)}function f(){return{ok:d,docs:l}}n=u(n);var l=[],d=!0;return Dr.resolve().then(c).then(o).then(f)}function cr(e,t,n,r,o){return e.get(t).catch(function(n){if(404===n.status)return"http"===e.type()&&T(404,"PouchDB is just checking if a remote checkpoint exists."),{session_id:r,_id:t,history:[],replicator:Ei,version:wi};throw n}).then(function(i){if(!o.cancelled&&i.last_seq!==n)return i.history=(i.history||[]).filter(function(e){return e.session_id!==r}),i.history.unshift({last_seq:n,session_id:r}),i.history=i.history.slice(0,Si),i.version=wi,i.replicator=Ei,i.session_id=r,i.last_seq=n,e.put(i).catch(function(i){if(409===i.status)return cr(e,t,n,r,o);throw i})})}function fr(e,t,n,r){this.src=e,this.target=t,this.id=n,this.returnValue=r}function lr(e,t){return e.session_id===t.session_id?{last_seq:e.last_seq,history:e.history}:dr(e.history,t.history)}function dr(e,t){var n=e[0],r=e.slice(1),o=t[0],i=t.slice(1);if(!n||0===t.length)return{last_seq:ki,history:[]};var a=n.session_id;if(hr(a,t))return{last_seq:n.last_seq,history:e};var s=o.session_id;return hr(s,r)?{last_seq:o.last_seq,history:i}:dr(r,i)}function hr(e,t){var n=t[0],r=t.slice(1);return!(!e||0===t.length)&&(e===n.session_id||hr(e,r))}function pr(e){return"number"==typeof e.status&&4===Math.floor(e.status/100)}function vr(e,t,n,r){if(e.retry===!1)return t.emit("error",n),void t.removeAllListeners();if("function"!=typeof e.back_off_function&&(e.back_off_function=x),t.emit("requestError",n),"active"===t.state||"pending"===t.state){t.emit("paused",n),t.state="stopped";var o=function(){e.current_back_off=Ai},i=function(){t.removeListener("active",o)};t.once("paused",i),t.once("active",o)}e.current_back_off=e.current_back_off||Ai,e.current_back_off=e.back_off_function(e.current_back_off),setTimeout(r,e.current_back_off)}function yr(e){return Object.keys(e).sort(Dn).reduce(function(t,n){return t[n]=e[n],t},{})}function _r(e,t,n){var r=n.doc_ids?n.doc_ids.sort(Dn):"",o=n.filter?n.filter.toString():"",i="",a="";return n.filter&&n.query_params&&(i=JSON.stringify(yr(n.query_params))),n.filter&&"_view"===n.filter&&(a=n.view.toString()),Dr.all([e.id(),t.id()]).then(function(e){var t=e[0]+e[1]+o+a+i+r;return new Dr(function(e){Ge(t,e)})}).then(function(e){return e=e.replace(/\//g,".").replace(/\+/g,"_"),"_local/"+e})}function mr(e,t,n,r,o){function i(){return S?Dr.resolve():_r(e,t,n).then(function(n){E=n,S=new fr(e,t,E,r)})}function a(){if(N=[],0!==w.docs.length){var e=w.docs,i={timeout:n.timeout};return t.bulkDocs({docs:e,new_edits:!1},i).then(function(t){if(r.cancelled)throw p(),new Error("cancelled");var n=Object.create(null);t.forEach(function(e){e.error&&(n[e.id]=e)});var i=Object.keys(n).length;o.doc_write_failures+=i,o.docs_written+=e.length-i,e.forEach(function(e){var t=n[e._id];if(t){if(o.errors.push(t),"unauthorized"!==t.name&&"forbidden"!==t.name)throw t;r.emit("denied",u(t))}else N.push(e)})},function(t){throw o.doc_write_failures+=e.length,t})}}function s(){if(w.error)throw new Error("There was a problem getting docs.");o.last_seq=O=w.seq;var e=u(o);return N.length&&(e.docs=N,r.emit("change",e)),A=!0,S.writeCheckpoint(w.seq,B).then(function(){if(A=!1,r.cancelled)throw p(),new Error("cancelled");w=void 0,m()}).catch(function(e){throw b(e),e})}function c(){var e={};return w.changes.forEach(function(t){"_user/"!==t.id&&(e[t.id]=t.changes.map(function(e){return e.rev}))}),t.revsDiff(e).then(function(e){if(r.cancelled)throw p(),new Error("cancelled");w.diffs=e})}function f(){return ur(e,t,w.diffs,r).then(function(e){w.error=!e.ok,e.docs.forEach(function(e){delete w.diffs[e._id],o.docs_read++,w.docs.push(e)})})}function l(){if(!r.cancelled&&!w){if(0===k.length)return void d(!0);w=k.shift(),c().then(f).then(a).then(s).then(l).catch(function(e){h("batch processing terminated with error",e)})}}function d(e){return 0===q.changes.length?void(0!==k.length||w||((j&&F.live||x)&&(r.state="pending",r.emit("paused")),x&&p())):void((e||x||q.changes.length>=C)&&(k.push(q),q={seq:0,changes:[],docs:[]},"pending"!==r.state&&"stopped"!==r.state||(r.state="active",r.emit("active")),l()))}function h(e,t){T||(t.message||(t.message=e),o.ok=!1,o.status="aborting",k=[],q={seq:0,changes:[],docs:[]},p(t))}function p(i){T||r.cancelled&&(o.status="cancelled",A)||(o.status=o.status||"complete",o.end_time=new Date,o.last_seq=O,T=!0,i?(i.result=o,"unauthorized"===i.name||"forbidden"===i.name?(r.emit("error",i),r.removeAllListeners()):vr(n,r,i,function(){mr(e,t,n,r)})):(r.emit("complete",o),r.removeAllListeners()))}function v(e){if(r.cancelled)return p();var t=I(n)(e);t&&(q.seq=e.seq,q.changes.push(e),d(0===k.length&&F.live))}function y(e){if(D=!1,r.cancelled)return p();if(e.results.length>0)F.since=e.last_seq,m(),d(!0);else{var t=function(){j?(F.live=!0,m()):x=!0,d(!0)};w||0!==e.results.length?t():(A=!0,S.writeCheckpoint(e.last_seq,B).then(function(){A=!1,o.last_seq=O=e.last_seq,t()}).catch(b))}}function _(e){return D=!1,r.cancelled?p():void h("changes rejected",e)}function m(){function t(){i.cancel()}function o(){r.removeListener("cancel",t)}if(!D&&!x&&k.length<L){D=!0,r._changes&&(r.removeListener("cancel",r._abortChanges),r._changes.cancel()),r.once("cancel",t);var i=e.changes(F).on("change",v);i.then(o,o),i.then(y).catch(_),n.retry&&(r._changes=i,r._abortChanges=t)}}function g(){i().then(function(){return r.cancelled?void p():S.getCheckpoint().then(function(e){O=e,F={since:O,limit:C,batch_size:C,style:"all_docs",doc_ids:R,return_docs:!0},n.filter&&("string"!=typeof n.filter?F.include_docs=!0:F.filter=n.filter),"heartbeat"in n&&(F.heartbeat=n.heartbeat),"timeout"in n&&(F.timeout=n.timeout),n.query_params&&(F.query_params=n.query_params),n.view&&(F.view=n.view),m()})}).catch(function(e){h("getCheckpoint rejected with ",e)})}function b(e){A=!1,h("writeCheckpoint completed with error",e)}var w,E,S,k=[],q={seq:0,changes:[],docs:[]},A=!1,x=!1,T=!1,O=0,j=n.continuous||n.live||!1,C=n.batch_size||100,L=n.batches_limit||10,D=!1,R=n.doc_ids,N=[],B=J();o=o||{ok:!0,start_time:new Date,docs_read:0,docs_written:0,doc_write_failures:0,errors:[]};var F={};return r.ready(e,t),r.cancelled?void p():(r._addedListeners||(r.once("cancel",p),"function"==typeof n.complete&&(r.once("error",n.complete),r.once("complete",function(e){n.complete(null,e)})),r._addedListeners=!0),void("undefined"==typeof n.since?g():i().then(function(){return A=!0,S.writeCheckpoint(n.since,B)}).then(function(){return A=!1,r.cancelled?void p():(O=n.since,void g())}).catch(b)))}function gr(){Tr.EventEmitter.call(this),this.cancelled=!1,this.state="pending";var e=this,t=new Dr(function(t,n){e.once("complete",t),e.once("error",n)});e.then=function(e,n){return t.then(e,n)},e.catch=function(e){return t.catch(e)},e.catch(function(){})}function br(e,t){var n=t.PouchConstructor;return"string"==typeof e?new n(e,t):e}function wr(e,t,n,r){if("function"==typeof n&&(r=n,n={}),"undefined"==typeof n&&(n={}),n.doc_ids&&!Array.isArray(n.doc_ids))throw j(to,"`doc_ids` filter parameter is not a list.");n.complete=r,n=u(n),n.continuous=n.continuous||n.live,n.retry="retry"in n&&n.retry,n.PouchConstructor=n.PouchConstructor||this;var o=new gr(n),i=br(e,n),a=br(t,n);return mr(i,a,n,o),o}function Er(e,t,n,r){return"function"==typeof n&&(r=n,n={}),"undefined"==typeof n&&(n={}),n=u(n),n.PouchConstructor=n.PouchConstructor||this,e=br(e,n),t=br(t,n),new Sr(e,t,n,r)}function Sr(e,t,n,r){function o(e){p.emit("change",{direction:"pull",change:e})}function i(e){p.emit("change",{direction:"push",change:e})}function a(e){p.emit("denied",{direction:"push",doc:e})}function s(e){p.emit("denied",{direction:"pull",doc:e})}function u(){p.pushPaused=!0,p.pullPaused&&p.emit("paused")}function c(){p.pullPaused=!0,p.pushPaused&&p.emit("paused")}function f(){p.pushPaused=!1,p.pullPaused&&p.emit("active",{direction:"push"})}function l(){p.pullPaused=!1,p.pushPaused&&p.emit("active",{direction:"pull"})}function d(e){return function(t,n){var r="change"===t&&(n===o||n===i),d="denied"===t&&(n===s||n===a),h="paused"===t&&(n===c||n===u),v="active"===t&&(n===l||n===f);(r||d||h||v)&&(t in _||(_[t]={}),_[t][e]=!0,2===Object.keys(_[t]).length&&p.removeAllListeners(t))}}function h(e,t,n){e.listeners(t).indexOf(n)==-1&&e.on(t,n)}var p=this;this.canceled=!1;var v=n.push?Wr({},n,n.push):n,y=n.pull?Wr({},n,n.pull):n;this.push=wr(e,t,v),this.pull=wr(t,e,y),this.pushPaused=!0,this.pullPaused=!0;var _={};n.live&&(this.push.on("complete",p.pull.cancel.bind(p.pull)),this.pull.on("complete",p.push.cancel.bind(p.push))),this.on("newListener",function(e){"change"===e?(h(p.pull,"change",o),h(p.push,"change",i)):"denied"===e?(h(p.pull,"denied",s),h(p.push,"denied",a)):"active"===e?(h(p.pull,"active",l),h(p.push,"active",f)):"paused"===e&&(h(p.pull,"paused",c),h(p.push,"paused",u))}),this.on("removeListener",function(e){"change"===e?(p.pull.removeListener("change",o),p.push.removeListener("change",i)):"denied"===e?(p.pull.removeListener("denied",s),p.push.removeListener("denied",a)):"active"===e?(p.pull.removeListener("active",l),p.push.removeListener("active",f)):"paused"===e&&(p.pull.removeListener("paused",c),p.push.removeListener("paused",u))}),this.pull.on("removeListener",d("pull")),this.push.on("removeListener",d("push"));var m=Dr.all([this.push,this.pull]).then(function(e){var t={push:e[0],pull:e[1]};return p.emit("complete",t),r&&r(null,t),p.removeAllListeners(),t},function(e){if(p.cancel(),r?r(e):p.emit("error",e),p.removeAllListeners(),r)throw e});this.then=function(e,t){return m.then(e,t)},this.catch=function(e){return m.catch(e)}}function kr(e){e.replicate=wr,e.sync=Er,Object.defineProperty(e.prototype,"replicate",{get:function(){var e=this;return{from:function(t,n,r){return e.constructor.replicate(t,e,n,r)},to:function(t,n,r){return e.constructor.replicate(e,t,n,r)}}}}),e.prototype.sync=function(e,t,n){return this.constructor.sync(this,e,t,n)}}var qr=r(e(7)),Ar=r(e(1)),xr=r(e(2)),Tr=e(4),Or=r(e(6)),jr=r(e(5)),Cr=r(e(10)),Lr=r(e(11)),Ir=r(e(12)),Dr="function"==typeof Promise?Promise:qr,Rr=Function.prototype.toString,Nr=Rr.call(Object),Br=xr("pouchdb:api");p.prototype.get=function(e){var t=d(e);return this._store[t]},p.prototype.set=function(e,t){var n=d(e);return this._store[n]=t,!0},p.prototype.has=function(e){var t=d(e);return t in this._store},p.prototype.delete=function(e){var t=d(e),n=t in this._store;return delete this._store[t],n},p.prototype.forEach=function(e){for(var t=Object.keys(this._store),n=0,r=t.length;n<r;n++){var o=t[n],i=this._store[o];o=h(o),e(i,o)}},Object.defineProperty(p.prototype,"size",{get:function(){return Object.keys(this._store).length}}),v.prototype.add=function(e){return this._store.set(e,!0)},v.prototype.has=function(e){return this._store.has(e)},v.prototype.forEach=function(e){this._store.forEach(function(t,n){e(n)})},Object.defineProperty(v.prototype,"size",{get:function(){return this._store.size}});var Fr,Mr;y()?(Fr=Set,Mr=Map):(Fr=v,Mr=p);var Ur,Pr=6;if(w())Ur=!1;else try{localStorage.setItem("_pouch_check_localstorage",1),Ur=!!localStorage.getItem("_pouch_check_localstorage")}catch(e){Ur=!1}Or(k,Tr.EventEmitter),k.prototype.addListener=function(e,t,n,r){function o(){function e(){a=!1}if(i._listeners[t]){if(a)return void(a="waiting");a=!0;var s=_(r,["style","include_docs","attachments","conflicts","filter","doc_ids","view","since","query_params","binary"]);n.changes(s).on("change",function(e){e.seq>r.since&&!r.cancelled&&(r.since=e.seq,r.onChange(e))}).on("complete",function(){"waiting"===a&&jr(o),a=!1}).on("error",e)}}if(!this._listeners[t]){var i=this,a=!1;this._listeners[t]=o,this.on(e,o)}},k.prototype.removeListener=function(e,t){t in this._listeners&&(Tr.EventEmitter.prototype.removeListener.call(this,e,this._listeners[t]),delete this._listeners[t])},k.prototype.notifyLocalWindows=function(e){w()?chrome.storage.local.set({dbName:e}):E()&&(localStorage[e]="a"===localStorage[e]?"b":"a")},k.prototype.notify=function(e){this.emit(e),this.notifyLocalWindows(e)};var Hr;Hr="function"==typeof Object.assign?Object.assign:function(e){for(var t=Object(e),n=1;n<arguments.length;n++){var r=arguments[n];if(null!=r)for(var o in r)Object.prototype.hasOwnProperty.call(r,o)&&(t[o]=r[o])}return t};var Wr=Hr;Or(O,Error),O.prototype.toString=function(){return JSON.stringify({status:this.status,name:this.name,message:this.message,reason:this.reason})};var Jr,Kr=(new O(401,"unauthorized","Name or password is incorrect."),new O(400,"bad_request","Missing JSON list of 'docs'")),zr=new O(404,"not_found","missing"),Xr=new O(409,"conflict","Document update conflict"),Gr=new O(400,"bad_request","_id field must contain a string"),Vr=new O(412,"missing_id","_id is required for puts"),Qr=new O(400,"bad_request","Only reserved document ids may start with underscore."),$r=(new O(412,"precondition_failed","Database not open"),new O(500,"unknown_error","Database encountered an unknown error")),Yr=new O(500,"badarg","Some query argument is invalid"),Zr=(new O(400,"invalid_request","Request was invalid"),new O(400,"query_parse_error","Some query parameter is invalid")),eo=new O(500,"doc_validation","Bad special document member"),to=new O(400,"bad_request","Something wrong with the request"),no=new O(400,"bad_request","Document must be a JSON object"),ro=(new O(404,"not_found","Database not found"),new O(500,"indexed_db_went_bad","unknown")),oo=new O(500,"web_sql_went_bad","unknown"),io=(new O(500,"levelDB_went_went_bad","unknown"),new O(403,"forbidden","Forbidden by design doc validate_doc_update function"),new O(400,"bad_request","Invalid rev format")),ao=(new O(412,"file_exists","The database could not be created, the file already exists."),new O(412,"missing_stub","A pre-existing attachment stub wasn't found")),so=(new O(413,"invalid_url","Provided URL is invalid"),R.name);Jr=so?function(e){return e.name}:function(e){return e.toString().match(/^\s*function\s*(\S*)\s*\(/)[1]};var uo=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],co="queryKey",fo=/(?:^|&)([^&=]*)=?([^&]*)/g,lo=/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,ho="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");Or(ve,Tr.EventEmitter),ve.prototype.cancel=function(){this.isCancelled=!0,this.db.taskqueue.isReady&&this.emit("cancel")},ve.prototype.doChanges=function(e){var t=this,n=e.complete;if(e=u(e),"live"in e&&!("continuous"in e)&&(e.continuous=e.live),e.processChange=ye,"latest"===e.since&&(e.since="now"),e.since||(e.since=0),"now"===e.since)return void this.db.info().then(function(r){return t.isCancelled?void n(null,{status:"cancelled"}):(e.since=r.update_seq,void t.doChanges(e))},n);if(e.view&&!e.filter&&(e.filter="_view"),e.filter&&"string"==typeof e.filter&&("_view"===e.filter?e.view=M(e.view):e.filter=M(e.filter),"http"!==this.db.type()&&!e.doc_ids))return this.filterChanges(e);"descending"in e||(e.descending=!1),e.limit=0===e.limit?1:e.limit,e.complete=n;var r=this.db._changes(e);if(r&&"function"==typeof r.cancel){var o=t.cancel;t.cancel=Ar(function(e){r.cancel(),o.apply(this,e)})}},ve.prototype.filterChanges=function(e){var t=this,n=e.complete;if("_view"===e.filter){if(!e.view||"string"!=typeof e.view){var r=j(to,"`view` filter parameter not found or invalid.");return n(r)}var o=F(e.view);
this.db.get("_design/"+o[0],function(r,i){if(t.isCancelled)return n(null,{status:"cancelled"});if(r)return n(C(r));var a=i&&i.views&&i.views[o[1]]&&i.views[o[1]].map;return a?(e.filter=he(a),void t.doChanges(e)):n(j(zr,i.views?"missing json key: "+o[1]:"missing json key: views"))})}else{var i=F(e.filter);if(!i)return t.doChanges(e);this.db.get("_design/"+i[0],function(r,o){if(t.isCancelled)return n(null,{status:"cancelled"});if(r)return n(C(r));var a=o&&o.filters&&o.filters[i[1]];return a?(e.filter=de(a),void t.doChanges(e)):n(j(zr,o&&o.filters?"missing json key: "+i[1]:"missing json key: filters"))})}},Or(qe,Tr.EventEmitter),qe.prototype.post=l("post",function(e,t,n){return"function"==typeof t&&(n=t,t={}),"object"!=typeof e||Array.isArray(e)?n(j(no)):void this.bulkDocs({docs:[e]},t,me(n))}),qe.prototype.put=l("put",function(e,t,n){return"function"==typeof t&&(n=t,t={}),"object"!=typeof e||Array.isArray(e)?n(j(no)):(N(e._id),fe(e._id)&&"function"==typeof this._putLocal?e._deleted?this._removeLocal(e,n):this._putLocal(e,n):void("function"==typeof this._put&&t.new_edits!==!1?this._put(e,t,n):this.bulkDocs({docs:[e]},t,me(n))))}),qe.prototype.putAttachment=l("putAttachment",function(e,t,n,r,o){function i(e){var n="_rev"in e?parseInt(e._rev,10):0;return e._attachments=e._attachments||{},e._attachments[t]={content_type:o,data:r,revpos:++n},a.put(e)}var a=this;return"function"==typeof o&&(o=r,r=n,n=null),"undefined"==typeof o&&(o=r,r=n,n=null),o||q("warn","Attachment",t,"on document",e,"is missing content_type"),a.get(e).then(function(e){if(e._rev!==n)throw j(Xr);return i(e)},function(t){if(t.reason===zr.message)return i({_id:e});throw t})}),qe.prototype.removeAttachment=l("removeAttachment",function(e,t,n,r){var o=this;o.get(e,function(e,i){return e?void r(e):i._rev!==n?void r(j(Xr)):i._attachments?(delete i._attachments[t],0===Object.keys(i._attachments).length&&delete i._attachments,void o.put(i,r)):r()})}),qe.prototype.remove=l("remove",function(e,t,n,r){var o;"string"==typeof t?(o={_id:e,_rev:t},"function"==typeof n&&(r=n,n={})):(o=e,"function"==typeof t?(r=t,n={}):(r=n,n=t)),n=n||{},n.was_delete=!0;var i={_id:o._id,_rev:o._rev||n.rev};return i._deleted=!0,fe(i._id)&&"function"==typeof this._removeLocal?this._removeLocal(o,r):void this.bulkDocs({docs:[i]},n,me(r))}),qe.prototype.revsDiff=l("revsDiff",function(e,t,n){function r(e,t){s.has(e)||s.set(e,{missing:[]}),s.get(e).missing.push(t)}function o(t,n){var o=e[t].slice(0);z(n,function(e,n,i,a,s){var u=n+"-"+i,c=o.indexOf(u);c!==-1&&(o.splice(c,1),"available"!==s.status&&r(t,u))}),o.forEach(function(e){r(t,e)})}"function"==typeof t&&(n=t,t={});var i=Object.keys(e);if(!i.length)return n(null,{});var a=0,s=new Mr;i.map(function(t){this._getRevisionTree(t,function(r,u){if(r&&404===r.status&&"missing"===r.message)s.set(t,{missing:e[t]});else{if(r)return n(r);o(t,u)}if(++a===i.length){var c={};return s.forEach(function(e,t){c[t]=e}),n(null,c)}})},this)}),qe.prototype.bulkGet=l("bulkGet",function(e,t){b(this,e,t)}),qe.prototype.compactDocument=l("compactDocument",function(e,t,n){var r=this;this._getRevisionTree(e,function(o,i){if(o)return n(o);var a=we(i),s=[],u=[];Object.keys(a).forEach(function(e){a[e]>t&&s.push(e)}),z(i,function(e,t,n,r,o){var i=t+"-"+n;"available"===o.status&&s.indexOf(i)!==-1&&u.push(i)}),r._doCompaction(e,u,n)})}),qe.prototype.compact=l("compact",function(e,t){"function"==typeof e&&(t=e,e={});var n=this;e=e||{},n._compactionQueue=n._compactionQueue||[],n._compactionQueue.push({opts:e,callback:t}),1===n._compactionQueue.length&&Se(n)}),qe.prototype._compact=function(e,t){function n(e){a.push(o.compactDocument(e.id,0))}function r(e){var n=e.last_seq;Dr.all(a).then(function(){return P(o,"_local/compaction",function(e){return(!e.last_seq||e.last_seq<n)&&(e.last_seq=n,e)})}).then(function(){t(null,{ok:!0})}).catch(t)}var o=this,i={return_docs:!1,last_seq:e.last_seq||0},a=[];o.changes(i).on("change",n).on("complete",r).on("error",t)},qe.prototype.get=l("get",function(e,t,n){function r(){var r=[],a=o.length;return a?void o.forEach(function(o){i.get(e,{rev:o,revs:t.revs,latest:t.latest,attachments:t.attachments},function(e,t){if(e)r.push({missing:o});else{for(var i,s=0,u=r.length;s<u;s++)if(r[s].ok&&r[s].ok._rev===t._rev){i=!0;break}i||r.push({ok:t})}a--,a||n(null,r)})}):n(null,r)}if("function"==typeof t&&(n=t,t={}),"string"!=typeof e)return n(j(Gr));if(fe(e)&&"function"==typeof this._getLocal)return this._getLocal(e,n);var o=[],i=this;if(!t.open_revs)return this._get(e,t,function(e,r){if(e)return n(e);var o=r.doc,a=r.metadata,s=r.ctx;if(t.conflicts){var u=V(a);u.length&&(o._conflicts=u)}if(ce(a,o._rev)&&(o._deleted=!0),t.revs||t.revs_info){for(var c=o._rev.split("-"),f=parseInt(c[0],10),l=c[1],d=$(a.rev_tree),h=null,p=0;p<d.length;p++){var v=d[p],y=v.ids.map(function(e){return e.id}).indexOf(l),_=y===f-1;(_||!h&&y!==-1)&&(h=v)}var m=h.ids.map(function(e){return e.id}).indexOf(o._rev.split("-")[1])+1,g=h.ids.length-m;if(h.ids.splice(m,g),h.ids.reverse(),t.revs&&(o._revisions={start:h.pos+h.ids.length-1,ids:h.ids.map(function(e){return e.id})}),t.revs_info){var b=h.pos+h.ids.length;o._revs_info=h.ids.map(function(e){return b--,{rev:b+"-"+e.id,status:e.opts.status}})}}if(t.attachments&&o._attachments){var w=o._attachments,E=Object.keys(w).length;if(0===E)return n(null,o);Object.keys(w).forEach(function(e){this._getAttachment(o._id,e,w[e],{rev:o._rev,binary:t.binary,ctx:s},function(t,r){var i=o._attachments[e];i.data=r,delete i.stub,delete i.length,--E||n(null,o)})},i)}else{if(o._attachments)for(var S in o._attachments)o._attachments.hasOwnProperty(S)&&(o._attachments[S].stub=!0);n(null,o)}});if("all"===t.open_revs)this._getRevisionTree(e,function(e,t){return e?n(e):(o=G(t).map(function(e){return e.rev}),void r())});else{if(!Array.isArray(t.open_revs))return n(j($r,"function_clause"));o=t.open_revs;for(var a=0;a<o.length;a++){var s=o[a];if("string"!=typeof s||!/^\d+-/.test(s))return n(j(io))}r()}}),qe.prototype.getAttachment=l("getAttachment",function(e,t,n,r){var o=this;n instanceof Function&&(r=n,n={}),this._get(e,n,function(i,a){return i?r(i):a.doc._attachments&&a.doc._attachments[t]?(n.ctx=a.ctx,n.binary=!0,o._getAttachment(e,t,a.doc._attachments[t],n,r),void 0):r(j(zr))})}),qe.prototype.allDocs=l("allDocs",function(e,t){if("function"==typeof e&&(t=e,e={}),e.skip="undefined"!=typeof e.skip?e.skip:0,e.start_key&&(e.startkey=e.start_key),e.end_key&&(e.endkey=e.end_key),"keys"in e){if(!Array.isArray(e.keys))return t(new TypeError("options.keys must be an array"));var n=["startkey","endkey","key"].filter(function(t){return t in e})[0];if(n)return void t(j(Zr,"Query parameter `"+n+"` is not compatible with multi-get"));if("http"!==this.type())return Ee(this,e,t)}return this._allDocs(e,t)}),qe.prototype.changes=function(e,t){return"function"==typeof e&&(t=e,e={}),new ve(this,e,t)},qe.prototype.close=l("close",function(e){return this._closed=!0,this.emit("closed"),this._close(e)}),qe.prototype.info=l("info",function(e){var t=this;this._info(function(n,r){return n?e(n):(r.db_name=r.db_name||t.name,r.auto_compaction=!(!t.auto_compaction||"http"===t.type()),r.adapter=t.type(),void e(null,r))})}),qe.prototype.id=l("id",function(e){return this._id(e)}),qe.prototype.type=function(){return"function"==typeof this._type?this._type():this.adapter},qe.prototype.bulkDocs=l("bulkDocs",function(e,t,n){if("function"==typeof t&&(n=t,t={}),t=t||{},Array.isArray(e)&&(e={docs:e}),!e||!e.docs||!Array.isArray(e.docs))return n(j(Kr));for(var r=0;r<e.docs.length;++r)if("object"!=typeof e.docs[r]||Array.isArray(e.docs[r]))return n(j(no));var o;if(e.docs.forEach(function(e){e._attachments&&Object.keys(e._attachments).forEach(function(t){o=o||ke(t),e._attachments[t].content_type||q("warn","Attachment",t,"on document",e._id,"is missing content_type")})}),o)return n(j(to,o));"new_edits"in t||("new_edits"in e?t.new_edits=e.new_edits:t.new_edits=!0);var i=this;t.new_edits||"http"===i.type()||e.docs.sort(be),ge(e.docs);var a=e.docs.map(function(e){return e._id});return this._bulkDocs(e,t,function(e,r){if(e)return n(e);if(t.new_edits||(r=r.filter(function(e){return e.error})),"http"!==i.type())for(var o=0,s=r.length;o<s;o++)r[o].id=r[o].id||a[o];n(null,r)})}),qe.prototype.registerDependentDatabase=l("registerDependentDatabase",function(e,t){function n(t){return t.dependentDbs=t.dependentDbs||{},!t.dependentDbs[e]&&(t.dependentDbs[e]=!0,t)}var r=new this.constructor(e,this.__opts);P(this,"_local/_pouch_dependentDbs",n).then(function(){t(null,{db:r})}).catch(t)}),qe.prototype.destroy=l("destroy",function(e,t){function n(){r._destroy(e,function(e,n){return e?t(e):(r._destroyed=!0,r.emit("destroyed"),void t(null,n||{ok:!0}))})}"function"==typeof e&&(t=e,e={});var r=this,o=!("use_prefix"in r)||r.use_prefix;return"http"===r.type()?n():void r.get("_local/_pouch_dependentDbs",function(e,i){if(e)return 404!==e.status?t(e):n();var a=i.dependentDbs,s=r.constructor,u=Object.keys(a).map(function(e){var t=o?e.replace(new RegExp("^"+s.prefix),""):e;return new s(t,r.__opts).destroy()});Dr.all(u).then(n,t)})}),Ae.prototype.execute=function(){var e;if(this.failed)for(;e=this.queue.shift();)e(this.failed);else for(;e=this.queue.shift();)e()},Ae.prototype.fail=function(e){this.failed=e,this.execute()},Ae.prototype.ready=function(e){this.isReady=!0,this.db=e,this.execute()},Ae.prototype.addTask=function(e){this.queue.push(e),this.failed&&this.execute()},Or(Oe,qe),Oe.debug=xr,Oe.adapters={},Oe.preferredAdapters=[],Oe.prefix="_pouch_";var po=new Tr.EventEmitter;je(Oe),Oe.adapter=function(e,t,n){t.valid()&&(Oe.adapters[e]=t,n&&Oe.preferredAdapters.push(e))},Oe.plugin=function(e){if("function"==typeof e)e(Oe);else{if("object"!=typeof e||0===Object.keys(e).length)throw new Error('Invalid plugin: got "'+e+'", expected an object or a function');Object.keys(e).forEach(function(t){Oe.prototype[t]=e[t]})}return this.__defaults&&(Oe.__defaults=Wr({},this.__defaults)),Oe},Oe.defaults=function(e){function t(e,n){return this instanceof t?(n=n||{},e&&"object"==typeof e&&(n=e,e=n.name,delete n.name),n=Wr({},t.__defaults,n),void Oe.call(this,e,n)):new t(e,n)}return Or(t,Oe),t.preferredAdapters=Oe.preferredAdapters.slice(),Object.keys(Oe).forEach(function(e){e in t||(t[e]=Oe[e])}),t.__defaults=Wr({},this.__defaults,e),t};var vo="6.1.2";Oe.version=vo;var yo,_o=Ce(["_id","_rev","_attachments","_deleted","_revisions","_revs_info","_conflicts","_deleted_conflicts","_local_seq","_rev_tree","_replication_id","_replication_state","_replication_state_time","_replication_state_reason","_replication_stats","_removed"]),mo=Ce(["_attachments","_replication_id","_replication_state","_replication_state_time","_replication_state_reason","_replication_stats"]),go=function(e){return atob(e)},bo=function(e){return btoa(e)},wo=n.setImmediate||n.setTimeout,Eo=32768,So=5,ko="document-store",qo="by-sequence",Ao="attach-store",xo="attach-seq-store",To="meta-store",Oo="local-store",jo="detect-blob-support",Co=new k,Lo=!1,Io=[],Do=new Mr,Ro=new Mr;At.valid=function(){var e="undefined"!=typeof openDatabase&&/(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent)&&!/Chrome/.test(navigator.userAgent)&&!/BlackBerry/.test(navigator.platform);return!e&&"undefined"!=typeof indexedDB&&"undefined"!=typeof IDBKeyRange};var No=function(e){e.adapter("idb",At,!0)},Bo=7,Fo=Dt("document-store"),Mo=Dt("by-sequence"),Uo=Dt("attach-store"),Po=Dt("local-store"),Ho=Dt("metadata-store"),Wo=Dt("attach-seq-store"),Jo=new Mr,Ko=new k,zo=1,Xo="CREATE INDEX IF NOT EXISTS 'by-seq-deleted-idx' ON "+Mo+" (seq, deleted)",Go="CREATE UNIQUE INDEX IF NOT EXISTS 'by-seq-doc-id-rev' ON "+Mo+" (doc_id, rev)",Vo="CREATE INDEX IF NOT EXISTS 'doc-winningseq-idx' ON "+Fo+" (winningseq)",Qo="CREATE INDEX IF NOT EXISTS 'attach-seq-seq-idx' ON "+Wo+" (seq)",$o="CREATE UNIQUE INDEX IF NOT EXISTS 'attach-seq-digest-idx' ON "+Wo+" (digest, seq)",Yo=Mo+".seq = "+Fo+".winningseq",Zo=Mo+".seq AS seq, "+Mo+".deleted AS deleted, "+Mo+".json AS data, "+Mo+".rev AS rev, "+Fo+".json AS metadata";en.valid=Yt,en.use_prefix=!0;var ei=function(e){e.adapter("websql",en,!0)},ti=on(),ni=function(){},ri=25,oi=50,ii={},ai=xr("pouchdb:http");gn.valid=function(){return!0};var si=function(e){e.adapter("http",gn,!1),e.adapter("https",gn,!1)};Or(bn,Error),Or(wn,Error),Or(En,Error);var ui=q.bind(null,"log"),ci=Array.isArray,fi=JSON.parse,li=-324,di=3,hi="";zn.prototype.add=function(e){return this.promise=this.promise.catch(function(){}).then(function(){return e()}),this.promise},zn.prototype.finish=function(){return this.promise};var pi={},vi=new zn,yi=50,_i={_sum:function(e,t){return jn(t)},_count:function(e,t){return t.length},_stats:function(e,t){function n(e){for(var t=0,n=0,r=e.length;n<r;n++){var o=e[n];t+=o*o}return t}return{sum:jn(t),min:Math.min.apply(null,t),max:Math.max.apply(null,t),count:t.length,sumsqr:n(t)}}},mi="mrviews",gi=$n(mi,Yn,Zn,er),bi={query:tr,viewCleanup:nr},wi=1,Ei="pouchdb",Si=5,ki=0;fr.prototype.writeCheckpoint=function(e,t){var n=this;return this.updateTarget(e,t).then(function(){return n.updateSource(e,t)})},fr.prototype.updateTarget=function(e,t){return cr(this.target,this.id,e,t,this.returnValue)},fr.prototype.updateSource=function(e,t){var n=this;return this.readOnlySource?Dr.resolve(!0):cr(this.src,this.id,e,t,this.returnValue).catch(function(e){if(pr(e))return n.readOnlySource=!0,!0;throw e})};var qi={undefined:function(e,t){return 0===Dn(e.last_seq,t.last_seq)?t.last_seq:0},1:function(e,t){return lr(t,e).last_seq}};fr.prototype.getCheckpoint=function(){var e=this;return e.target.get(e.id).then(function(t){return e.readOnlySource?Dr.resolve(t.last_seq):e.src.get(e.id).then(function(e){if(t.version!==e.version)return ki;var n;return n=t.version?t.version.toString():"undefined",n in qi?qi[n](t,e):ki},function(n){if(404===n.status&&t.last_seq)return e.src.put({_id:e.id,last_seq:ki}).then(function(){return ki},function(n){return pr(n)?(e.readOnlySource=!0,t.last_seq):ki});throw n})}).catch(function(e){if(404!==e.status)throw e;return ki})};var Ai=0;Or(gr,Tr.EventEmitter),gr.prototype.cancel=function(){this.cancelled=!0,this.state="cancelled",this.emit("cancel")},gr.prototype.ready=function(e,t){function n(){o.cancel()}function r(){e.removeListener("destroyed",n),t.removeListener("destroyed",n)}var o=this;o._readyCalled||(o._readyCalled=!0,e.once("destroyed",n),t.once("destroyed",n),o.once("complete",r))},Or(Sr,Tr.EventEmitter),Sr.prototype.cancel=function(){this.canceled||(this.canceled=!0,this.push.cancel(),this.pull.cancel())},Oe.plugin(No).plugin(ei).plugin(si).plugin(bi).plugin(kr),t.exports=Oe}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{1:1,10:10,11:11,12:12,2:2,4:4,5:5,6:6,7:7}]},{},[13])(13)});

!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.pouchdbFind=e()}}(function(){var e;return function t(e,n,r){function o(u,a){if(!n[u]){if(!e[u]){var c="function"==typeof require&&require;if(!a&&c)return c(u,!0);if(i)return i(u,!0);var s=new Error("Cannot find module '"+u+"'");throw s.code="MODULE_NOT_FOUND",s}var f=n[u]={exports:{}};e[u][0].call(f.exports,function(t){var n=e[u][1][t];return o(n?n:t)},f,f.exports,t,e,n,r)}return n[u].exports}for(var i="function"==typeof require&&require,u=0;u<r.length;u++)o(r[u]);return o}({1:[function(e,t,n){"use strict";function r(e){if(!e)return"undefined";switch(typeof e){case"function":return e.toString();case"string":return e.toString();default:return JSON.stringify(e)}}var o=e(4),i=e(5),u=i.Promise;t.exports=function(e){var t=e.db,n=e.viewName,a=e.map,c=e.reduce,s=e.temporary,f=e.pluginName,l=r(a)+r(c)+"undefined";if(!s&&t._cachedViews){var d=t._cachedViews[l];if(d)return u.resolve(d)}return t.info().then(function(e){function r(e){e.views=e.views||{};var t=n;-1===t.indexOf("/")&&(t=n+"/"+n);var r=e.views[t]=e.views[t]||{};if(!r[u])return r[u]=!0,e}var u=e.db_name+"-mrview-"+(s?"temp":i.MD5(l));return o(t,"_local/"+f,r).then(function(){return t.registerDependentDatabase(u).then(function(e){var n=e.db;n.auto_compaction=!0;var r={name:u,db:n,sourceDB:t,adapter:t.adapter,mapFun:a,reduceFun:c};return r.db.get("_local/lastSeq")["catch"](function(e){if(404!==e.status)throw e}).then(function(e){return r.seq=e?e.seq:0,s||(t._cachedViews=t._cachedViews||{},t._cachedViews[l]=r,r.db.on("destroyed",function(){delete t._cachedViews[l]})),r})})})})}},{4:4,5:5}],2:[function(e,t,n){(function(n){"use strict";function r(e){this.status=400,this.name="query_parse_error",this.message=e,this.error=!0;try{Error.captureStackTrace(this,r)}catch(t){}}function o(e){this.status=404,this.name="not_found",this.message=e,this.error=!0;try{Error.captureStackTrace(this,o)}catch(t){}}function i(e){return-1===e.indexOf("/")?[e,e]:e.split("/")}function u(e){return 1===e.length&&/^1-/.test(e[0].rev)}function a(e,t){var n=m(e.key,t.key);return 0!==n?n:m(e.value,t.value)}function c(e,t,n){return n=n||0,"number"==typeof t?e.slice(n,t+n):n>0?e.slice(n):e}function s(e){var t=e.value,n=t&&"object"==typeof t&&t._id||e.id;return n}function f(e,t){try{e.emit("error",t)}catch(n){console.error("The user's map/reduce function threw an uncaught error.\nYou can debug this error by doing:\nmyDatabase.on('error', function (err) { debugger; });\nPlease double-check your map/reduce function."),console.error(t)}}function l(e,t,n){try{return{output:t.apply(null,n)}}catch(r){return f(e,r),{error:r}}}function d(e,t){var n=e.descending?"endkey":"startkey",o=e.descending?"startkey":"endkey";if("undefined"!=typeof e[n]&&"undefined"!=typeof e[o]&&m(e[n],e[o])>0)throw new r("No rows can match your key range, reverse your start_key and end_key or set {descending : true}");if(t.reduce&&e.reduce!==!1){if(e.include_docs)throw new r("{include_docs:true} is invalid for reduce");if(e.keys&&e.keys.length>1&&!e.group&&!e.group_level)throw new r("Multi-key fetches for reduce views must use {group: true}")}if(e.group_level){if("number"!=typeof e.group_level)throw new r('Invalid value for integer: "'+e.group_level+'"');if(e.group_level<0)throw new r('Invalid value for positive integer: "'+e.group_level+'"')}}function h(e){return function(t){if(404===t.status)return e;throw t}}function p(e){function t(e,t,n){function r(){return u(l)?x.resolve(c):t.db.get(a)["catch"](h(c))}function o(e){return e.keys.length?t.db.allDocs({keys:e.keys,include_docs:!0}):x.resolve({rows:[]})}function i(e,t){for(var n=[],r={},o=0,i=t.rows.length;i>o;o++){var u=t.rows[o],a=u.doc;if(a&&(n.push(a),r[a._id]=!0,a._deleted=!f[a._id],!a._deleted)){var c=f[a._id];"value"in c&&(a.value=c.value)}}var s=Object.keys(f);return s.forEach(function(e){if(!r[e]){var t={_id:e},o=f[e];"value"in o&&(t.value=o.value),n.push(t)}}),e.keys=_.uniq(s.concat(e.keys)),n.push(e),n}var a="_local/doc_"+e,c={_id:a,keys:[]},s=n[e],f=s.indexableKeysToKeyValues,l=s.changes;return r().then(function(e){return o(e).then(function(t){return i(e,t)})})}function r(e,n,r){var o="_local/lastSeq";return e.db.get(o)["catch"](h({_id:o,seq:0})).then(function(o){var i=Object.keys(n);return x.all(i.map(function(r){return t(r,e,n)})).then(function(t){var n=_.flatten(t);return o.seq=r,n.push(o),e.db.bulkDocs({docs:n})})})}function f(e){var t="string"==typeof e?e:e.name,n=$[t];return n||(n=$[t]=new g),n}function p(e){return _.sequentialize(f(e),function(){return y(e)})()}function y(e){function t(e,t){var n={id:i._id,key:w(e)};"undefined"!=typeof t&&null!==t&&(n.value=w(t)),o.push(n)}function n(t,n){return function(){return r(e,t,n)}}var o,i,u=D(e.mapFun,t),c=e.seq||0,s=new g;return new x(function(t,r){function f(){s.finish().then(function(){e.seq=c,t()})}function d(){function t(e){r(e)}e.sourceDB.changes({conflicts:!0,include_docs:!0,style:"all_docs",since:c,limit:O}).on("complete",function(t){var r=t.results;if(!r.length)return f();for(var h={},p=0,y=r.length;y>p;p++){var v=r[p];if("_"!==v.doc._id[0]){o=[],i=v.doc,i._deleted||l(e.sourceDB,u,[i]),o.sort(a);for(var g,w={},k=0,_=o.length;_>k;k++){var x=o[k],$=[x.key,x.id];0===m(x.key,g)&&$.push(k);var j=b($);w[j]=x,g=x.key}h[v.doc._id]={indexableKeysToKeyValues:w,changes:v.changes}}c=v.seq}return s.add(n(h,c)),r.length<O?f():d()}).on("error",t)}d()})}function A(e,t,n){0===n.group_level&&delete n.group_level;var r=n.group||n.group_level,o=M(e.reduceFun),i=[],u=n.group_level;t.forEach(function(e){var t=i[i.length-1],n=r?e.key:null;return r&&Array.isArray(n)&&"number"==typeof u&&(n=n.length>u?n.slice(0,u):n),t&&0===m(t.key[0][0],n)?(t.key.push([n,e.id]),void t.value.push(e.value)):void i.push({key:[[n,e.id]],value:[e.value]})});for(var a=0,s=i.length;s>a;a++){var f=i[a],d=l(e.sourceDB,o,[f.key,f.value,!1]);if(d.error&&/BuiltInError/.test(d.error.constructor))throw d.error;f.value=d.error?null:d.output,f.key=f.key[0][0]}return{rows:c(i,n.limit,n.skip)}}function E(e,t){return _.sequentialize(f(e),function(){return q(e,t)})()}function q(e,t){function n(t){return t.include_docs=!0,e.db.allDocs(t).then(function(e){return o=e.total_rows,e.rows.map(function(e){if("value"in e.doc&&"object"==typeof e.doc.value&&null!==e.doc.value){var t=Object.keys(e.doc.value).sort(),n=["id","key","value"];if(!(n>t||t>n))return e.doc.value}var r=v.parseIndexableString(e.doc._id);return{key:r[0],id:r[1],value:"value"in e.doc?e.doc.value:null}})})}function r(n){var r;if(r=i?A(e,n,t):{total_rows:o,offset:u,rows:n},t.include_docs){var a=_.uniq(n.map(s));return e.sourceDB.allDocs({keys:a,include_docs:!0,conflicts:t.conflicts,attachments:t.attachments,binary:t.binary}).then(function(e){var t={};return e.rows.forEach(function(e){e.doc&&(t["$"+e.id]=e.doc)}),n.forEach(function(e){var n=s(e),r=t["$"+n];r&&(e.doc=r)}),r})}return r}var o,i=e.reduceFun&&t.reduce!==!1,u=t.skip||0;"undefined"==typeof t.keys||t.keys.length||(t.limit=0,delete t.keys);var a=function(e){return e.reduce(function(e,t){return e.concat(t)})};if("undefined"!=typeof t.keys){var c=t.keys,f=c.map(function(e){var t={startkey:b([e]),endkey:b([e,{}])};return n(t)});return x.all(f).then(a).then(r)}var l={descending:t.descending};if("undefined"!=typeof t.startkey&&(l.startkey=b(t.descending?[t.startkey,{}]:[t.startkey])),"undefined"!=typeof t.endkey){var d=t.inclusive_end!==!1;t.descending&&(d=!d),l.endkey=b(d?[t.endkey,{}]:[t.endkey])}if("undefined"!=typeof t.key){var h=b([t.key]),p=b([t.key,{}]);l.descending?(l.endkey=h,l.startkey=p):(l.startkey=h,l.endkey=p)}return i||("number"==typeof t.limit&&(l.limit=t.limit),l.skip=u),n(l).then(r)}function F(e){return e.get("_local/"+S).then(function(t){var n={};Object.keys(t.views).forEach(function(e){var t=i(e),r="_design/"+t[0],o=t[1];n[r]=n[r]||{},n[r][o]=!0});var r={keys:Object.keys(n),include_docs:!0};return e.allDocs(r).then(function(r){var o={};r.rows.forEach(function(e){var r=e.key.substring(8);Object.keys(n[e.key]).forEach(function(n){var i=r+"/"+n;t.views[i]||(i=n);var u=Object.keys(t.views[i]),a=e.doc&&e.doc.views&&e.doc.views[n];u.forEach(function(e){o[e]=o[e]||a})})});var i=Object.keys(o).filter(function(e){return!o[e]}),u=i.map(function(t){return _.sequentialize(f(t),function(){return new e.constructor(t,e.__opts).destroy()})()});return x.all(u).then(function(){return{ok:!0}})})},h({ok:!0}))}function I(e,t,r){if("string"!=typeof t){d(r,t);var u={db:e,viewName:"temp_view/temp_view",map:t.map,reduce:t.reduce,temporary:!0,pluginName:S};return j.add(function(){return k(u).then(function(e){function t(){return e.db.destroy()}return _.fin(p(e).then(function(){return E(e,r)}),t)})}),j.finish()}var a=t,c=i(a),s=c[0],f=c[1];return e.get("_design/"+s).then(function(t){var i=t.views&&t.views[f];if(!i)throw new o("ddoc "+t._id+" has no view named "+f);C(t,f),d(r,i);var u={db:e,viewName:a,map:i.map,reduce:i.reduce,pluginName:S};return k(u).then(function(e){return"ok"===r.stale||"update_after"===r.stale?("update_after"===r.stale&&n.nextTick(function(){p(e)}),E(e,r)):p(e).then(function(){return E(e,r)})})})}var S=e.name,D=e.mapper,M=e.reducer,C=e.ddocValidator,T=function(e,t,n){var r=this;"function"==typeof t&&(n=t,t={}),t=_.extend(!0,{},t),"function"==typeof e&&(e={map:e});var o=x.resolve().then(function(){return I(r,e,t)});return _.promisedCallback(o,n),o},B=_.callbackify(function(){var e=this;return F(e)});return{query:T,viewCleanup:B}}var y,v=e(26),g=e(3),m=v.collate,b=v.toIndexableString,w=v.normalizeKey,k=e(1);y="undefined"!=typeof console&&"function"==typeof console.log?Function.prototype.bind.call(console.log,console):function(){};var _=e(5),x=_.Promise,$={},j=new g,O=50;_.inherits(r,Error),_.inherits(o,Error),t.exports=p}).call(this,e(34))},{1:1,26:26,3:3,34:34,5:5}],3:[function(e,t,n){"use strict";function r(){this.promise=new o(function(e){e()})}var o=e(5).Promise;r.prototype.add=function(e){return this.promise=this.promise["catch"](function(){}).then(function(){return e()}),this.promise},r.prototype.finish=function(){return this.promise},t.exports=r},{5:5}],4:[function(e,t,n){"use strict";var r=e(31).upsert;t.exports=function(e,t,n){return r.apply(e,[t,n])}},{31:31}],5:[function(e,t,n){(function(t){"use strict";n.Promise=e(29),n.inherits=e(23),n.extend=e(28);var r=e(18);n.promisedCallback=function(e,n){return n&&e.then(function(e){t.nextTick(function(){n(null,e)})},function(e){t.nextTick(function(){n(e)})}),e},n.callbackify=function(e){return r(function(t){var r=t.pop(),o=e.apply(this,t);return"function"==typeof r&&n.promisedCallback(o,r),o})},n.fin=function(e,t){return e.then(function(e){var n=t();return"function"==typeof n.then?n.then(function(){return e}):e},function(e){var n=t();if("function"==typeof n.then)return n.then(function(){throw e});throw e})},n.sequentialize=function(e,t){return function(){var n=arguments,r=this;return e.add(function(){return t.apply(r,n)})}},n.flatten=function(e){for(var t=[],n=0,r=e.length;r>n;n++)t=t.concat(e[n]);return t},n.uniq=function(e){for(var t={},n=0,r=e.length;r>n;n++)t["$"+e[n]]=!0;var o=Object.keys(t),i=new Array(o.length);for(n=0,r=o.length;r>n;n++)i[n]=o[n].substring(1);return i};var o=e(19),i=e(35);n.MD5=function(e){return t.browser?i.hash(e):o.createHash("md5").update(e).digest("hex")}}).call(this,e(34))},{18:18,19:19,23:23,28:28,29:29,34:34,35:35}],6:[function(e,t,n){"use strict";function r(e,t,n){t=a(t),e.request({method:"POST",url:"_index",body:t},n)}function o(e,t,n){e.request({method:"POST",url:"_find",body:t},n)}function i(e,t){e.request({method:"GET",url:"_index"},t)}function u(e,t,n){var r=t.ddoc,o=t.type||"json",i=t.name;if(!r)return n(new Error("you must provide an index's ddoc"));if(!i)return n(new Error("you must provide an index's name"));var u="_index/"+[r,o,i].map(encodeURIComponent).join("/");e.request({method:"DELETE",url:u},n)}var a=e(16);n.createIndex=r,n.find=o,n.getIndexes=i,n.deleteIndex=u},{16:16}],7:[function(e,t,n){"use strict";function r(e,t){return function(n){for(var r=[],o=0,i=e.length;i>o;o++){for(var u=p(e[o]),a=n,c=0,s=u.length;s>c;c++){var f=u[c];if(a=a[f],!a)break}r.push(a)}t(r)}}function o(e,t){var n=p(e);return function(e){for(var r=e,o=0,i=n.length;i>o;o++){var u=n[o];if(r=r[u],!r)return}t(r)}}function i(e,t){return function(n){t(n[e])}}function u(e,t){return function(n){for(var r=[],o=0,i=e.length;i>o;o++)r.push(n[e[o]]);t(r)}}function a(e){for(var t=0,n=e.length;n>t;t++){var r=e[t];if(-1!==r.indexOf("."))return!1}return!0}function c(e,t){var n=a(e),c=1===e.length;return n?c?i(e[0],t):u(e,t):c?o(e[0],t):r(e,t)}function s(e,t){var n=Object.keys(e.fields);return c(n,t)}function f(){throw new Error("reduce not supported")}function l(e,t){var n=e.views[t];if(!n.map||!n.map.fields)throw new Error("ddoc "+e._id+" with view "+t+" doesn't have map.fields defined. maybe it wasn't created by this plugin?")}var d=e(15),h=e(2),p=d.parseField,y=h({name:"indexes",mapper:s,reducer:f,ddocValidator:l});t.exports=y},{15:15,2:2}],8:[function(e,t,n){"use strict";function r(e,t,n){return a.upsert.call(e,t,n)}function o(e,t){function n(e){return e._rev&&"query"!==e.language&&(y=!0),e.language="query",e.views=e.views||{},(v=!!e.views[s])?!1:(e.views[s]={map:{fields:i.mergeObjects(t.index.fields)},reduce:"_count",options:{def:o}},e)}t=d(t);var o=i.clone(t.index);t.index=l(t.index),f(t.index);var a=i.MD5(JSON.stringify(t)),s=t.name||"idx-"+a,h=t.ddoc||"idx-"+a,p="_design/"+h,y=!1,v=!1;return u("creating index",p),r(e,p,n).then(function(){if(y)throw new Error('invalid language for ddoc with id "'+p+'" (should be "query")')}).then(function(){var t=h+"/"+s;return c.query.call(e,t,{limit:0,reduce:!1}).then(function(){return{id:p,name:s,result:v?"exists":"created"}})})}var i=e(17),u=i.log,a=e(31),c=e(7),s=e(15),f=s.validateIndex,l=s.massageIndexDef,d=e(16);t.exports=o},{15:15,16:16,17:17,31:31,7:7}],9:[function(e,t,n){"use strict";function r(e,t){function n(e){return 1===Object.keys(e.views).length&&e.views[u]?{_id:r,_deleted:!0}:(delete e.views[u],e)}if(!t.ddoc)throw new Error("you must supply an index.ddoc when deleting");if(!t.name)throw new Error("you must supply an index.name when deleting");var r=t.ddoc,u=t.name;return i(e,r,n).then(function(){return o.viewCleanup.apply(e)}).then(function(){return{ok:!0}})}var o=e(7),i=e(4);t.exports=r},{4:4,7:7}],10:[function(e,t,n){"use strict";function r(e){function t(t){return e.map(function(e){var n=k(e),r=x(n),o=j(t,r);return o})}return function(e,n){var r=t(e.doc),o=t(n.doc),i=m(r,o);return 0!==i?i:$.compare(e.doc._id,n.doc._id)}}function o(e,t,n){if(e=e.filter(function(e){return i(e.doc,t.selector,n)}),t.sort){var o=r(t.sort);e=e.sort(o),"string"!=typeof t.sort[0]&&"desc"===_(t.sort[0])&&(e=e.reverse())}if("limit"in t||"skip"in t){var u=t.skip||0,a=("limit"in t?t.limit:e.length)+u;e=e.slice(u,a)}return e}function i(e,t,n){return n.every(function(n){var r=t[n],o=x(n),i=j(e,o);return w(n)?a(n,r,e):u(r,e,o,i)})}function u(e,t,n,r){return e?Object.keys(e).every(function(o){var i=e[o];return c(o,t,i,n,r)}):!0}function a(e,t,n){return"$or"===e?t.some(function(e){return i(n,e,Object.keys(e))}):"$not"===e?!i(n,t,Object.keys(t)):!t.find(function(e){return i(n,e,Object.keys(e))})}function c(e,t,n,r,o){if(!O[e])throw new Error('unknown operator "'+e+'" - should be one of $eq, $lte, $lt, $gt, $gte, $exists, $ne, $in, $nin, $size, $mod, $regex, $elemMatch, $type or $all');return O[e](t,n,r,o)}function s(e){return"undefined"!=typeof e&&null!==e}function f(e){return"undefined"!=typeof e}function l(e,t){var n=t[0],r=t[1];if(0===n)throw new Error("Bad divisor, cannot divide by zero");if(parseInt(n,10)!==n)throw new Error("Divisor is not an integer");if(parseInt(r,10)!==r)throw new Error("Modulus is not an integer");return parseInt(e,10)!==e?!1:e%n===r}function d(e,t){return t.some(function(t){return e instanceof Array?e.indexOf(t)>-1:e===t})}function h(e,t){return t.every(function(t){return e.indexOf(t)>-1})}function p(e,t){return e.length===t}function y(e,t){var n=new RegExp(t);return n.test(e)}function v(e,t){switch(t){case"null":return null===e;case"boolean":return"boolean"==typeof e;case"number":return"number"==typeof e;case"string":return"string"==typeof e;case"array":return e instanceof Array;case"object":return"[object Object]"==={}.toString.call(e)}throw new Error(t+" not supported as a type.Please use one of object, string, array, number, boolean or null.")}var g=e(24),m=e(26).collate,b=e(15),w=b.isCombinationalField,k=b.getKey,_=b.getValue,x=b.parseField,$=e(17),j=$.getFieldFromDoc,O={$elemMatch:function(e,t,n,r){return g(r)?0===r.length?!1:"object"==typeof r[0]?r.some(function(e){return i(e,t,Object.keys(t))}):r.some(function(r){return u(t,e,n,r)}):!1},$eq:function(e,t,n,r){return f(r)&&0===m(r,t)},$gte:function(e,t,n,r){return f(r)&&m(r,t)>=0},$gt:function(e,t,n,r){return f(r)&&m(r,t)>0},$lte:function(e,t,n,r){return f(r)&&m(r,t)<=0},$lt:function(e,t,n,r){return f(r)&&m(r,t)<0},$exists:function(e,t,n,r){return t?f(r):!f(r)},$mod:function(e,t,n,r){return s(r)&&l(r,t)},$ne:function(e,t,n,r){return t.every(function(e){return 0!==m(r,e)})},$in:function(e,t,n,r){return s(r)&&d(r,t)},$nin:function(e,t,n,r){return s(r)&&!d(r,t)},$size:function(e,t,n,r){return s(r)&&p(r,t)},$all:function(e,t,n,r){return g(r)&&h(r,t)},$regex:function(e,t,n,r){return s(r)&&y(r,t)},$type:function(e,t,n,r){return v(r,t)}};t.exports=o},{15:15,17:17,24:24,26:26}],11:[function(e,t,n){"use strict";function r(e){return e.ddoc.substring(8)+"/"+e.name}function o(e,t){var n=a(t);return n.descending?("endkey"in n&&"string"!=typeof n.endkey&&(n.endkey=""),"startkey"in n&&"string"!=typeof n.startkey&&(n.limit=0)):("startkey"in n&&"string"!=typeof n.startkey&&(n.startkey=""),"endkey"in n&&"string"!=typeof n.endkey&&(n.limit=0)),"key"in n&&"string"!=typeof n.key&&(n.limit=0),e.allDocs(n)}function i(e,t){return t.selector&&(t.selector=p(t.selector)),t.sort&&(t.sort=y(t.sort)),g(t),c(e).then(function(n){var i=l(t,n.indexes),a=i.index;m(t,a);var c=u.extend(!0,{include_docs:!0,reduce:!1},i.queryOpts);if("startkey"in c&&"endkey"in c&&s(c.startkey,c.endkey)>0)return{docs:[]};var d=t.sort&&"string"!=typeof t.sort[0]&&"desc"===v(t.sort[0]);return d&&(c.descending=!0,c=b(c)),i.inMemoryFields.length||("limit"in t&&(c.limit=t.limit),"skip"in t&&(c.skip=t.skip)),k.resolve().then(function(){if("_all_docs"===a.name)return o(e,c);var t=r(a);return f.query.call(e,t,c)}).then(function(e){c.inclusive_start===!1&&(e.rows=w(e.rows,c.startkey,a)),i.inMemoryFields.length&&(e.rows=h(e.rows,t,i.inMemoryFields));var n={docs:e.rows.map(function(e){var n=e.doc;return t.fields?u.pick(n,t.fields):n})};return a.defaultUsed&&(n.warning="no matching index found, create an index to optimize query time"),n})})}var u=e(17),a=u.clone,c=e(13),s=e(26).collate,f=e(7),l=e(12),d=e(15),h=e(10),p=d.massageSelector,y=d.massageSort,v=d.getValue,g=d.validateFindRequest,m=d.validateSort,b=d.reverseOptions,w=d.filterInclusiveStart,k=u.Promise;t.exports=i},{10:10,12:12,13:13,15:15,17:17,26:26,7:7}],12:[function(e,t,n){"use strict";function r(e,t){for(var n=e.def.fields.map(j),r=0,o=n.length;o>r;r++){var i=n[r];if(t===i)return!0}return!1}function o(e,t){var n=e[t],r=j(n);return"$eq"!==r}function i(e,t){var n=t.def.fields.map(j);return e.slice().sort(function(e,t){var r=n.indexOf(e),o=n.indexOf(t);return-1===r&&(r=Number.MAX_VALUE),-1===o&&(o=Number.MAX_VALUE),_.compare(r,o)})}function u(e,t,n){n=i(n,e);for(var u=!1,a=0,c=n.length;c>a;a++){var s=n[a];if(u||!r(e,s))return n.slice(a);c-1>a&&o(t,s)&&(u=!0)}return[]}function a(e){var t=[];return Object.keys(e).forEach(function(n){var r=e[n];Object.keys(r).forEach(function(e){"$ne"===e&&t.push(n)})}),t}function c(e,t,n,r){var o=_.flatten(e,u(t,n,r),a(n));return i(_.uniq(o),t)}function s(e,t,n){if(t){var r=_.oneArrayIsStrictSubArrayOfOther(t,e),o=_.oneArrayIsSubArrayOfOther(n,e);return r&&o}return _.oneSetIsSubArrayOfOther(n,e)}function f(e){return-1===q.indexOf(e)}function l(e,t){var n=e[0],r=t[n],o=Object.keys(r).some(function(e){return!f(e)});if(!o)return!1;var i=1===Object.keys(r).length&&"$ne"===j(r);return!i}function d(e,t,n,r){var o=e.def.fields.map(j),i=s(o,t,n);return i?l(o,r):!1}function h(e,t,n,r){return r.reduce(function(r,o){var i=d(o,n,t,e);return i&&r.push(o),r},[])}function p(e,t,n,r){function o(e){for(var t=e.def.fields.map(j),n=0,r=0,o=t.length;o>r;r++){var i=t[r];a[i]&&n++}return n}var i=h(e,t,n,r);if(0===i.length){var u=r[0];return u.defaultUsed=!0,u}if(1===i.length)return i[0];var a=_.arrayToObject(t);return _.max(i,o)}function y(e,t){switch(e){case"$eq":return{key:t};case"$lte":return{endkey:t};case"$gte":return{startkey:t};case"$lt":return{endkey:t,inclusive_end:!1};case"$gt":return{startkey:t,inclusive_start:!1}}}function v(e,t){var n,r=j(t.def.fields[0]),o=e[r],i=[],u=Object.keys(o);return u.forEach(function(e){if(f(e))return void i.push(r);var t=o[e],u=y(e,t);n=n?_.mergeObjects([n,u]):u}),{queryOpts:n,inMemoryFields:i}}function g(e,t){switch(e){case"$eq":return{startkey:t,endkey:t};case"$lte":return{endkey:t};case"$gte":return{startkey:t};case"$lt":return{endkey:t,inclusive_end:!1};case"$gt":return{startkey:t,inclusive_start:!1}}}function m(e,t){function n(e){r!==!1&&a.push(A),o!==!1&&c.push(E),u=i.slice(e)}for(var r,o,i=t.def.fields.map(j),u=[],a=[],c=[],s=0,f=i.length;f>s;s++){var l=i[s],d=e[l];if(!d){n(s);break}if(s>0){if("$ne"in d){n(s);break}var h="$gt"in d||"$gte"in d||"$lt"in d||"$lte"in d,p=Object.keys(e[i[s-1]]),y=_.arrayEquals(p,["$eq"]),v=_.arrayEquals(p,Object.keys(d)),m=h&&!y&&!v;if(m){n(s);break}}for(var b=Object.keys(d),w=null,k=0;k<b.length;k++){var x=b[k],$=d[x],O=g(x,$);w=w?_.mergeObjects([w,O]):O}a.push("startkey"in w?w.startkey:A),c.push("endkey"in w?w.endkey:E),"inclusive_start"in w&&(r=w.inclusive_start),"inclusive_end"in w&&(o=w.inclusive_end)}var q={startkey:a,endkey:c};return"undefined"!=typeof r&&(q.inclusive_start=r),"undefined"!=typeof o&&(q.inclusive_end=o),{queryOpts:q,inMemoryFields:u}}function b(){return{queryOpts:{startkey:null},inMemoryFields:[]}}function w(e,t){return t.defaultUsed?b(e,t):1===t.def.fields.length?v(e,t):m(e,t)}function k(e,t){x("planning query",e);var n=e.selector,r=e.sort,o=O(n,r),i=o.fields,u=o.sortOrder,a=p(n,i,u,t),s=w(n,a),f=s.queryOpts,l=s.inMemoryFields,d=c(l,a,n,i),h={queryOpts:f,index:a,inMemoryFields:d};return x("query plan",h),h}var _=e(17),x=_.log,$=e(15),j=$.getKey,O=$.getUserFields,A=null,E={"￿":{}},q=["$eq","$gt","$gte","$lt","$lte"];t.exports=k},{15:15,17:17}],13:[function(e,t,n){"use strict";function r(e){return e.allDocs({startkey:"_design/",endkey:"_design/￿",include_docs:!0}).then(function(e){var t={indexes:[{ddoc:null,name:"_all_docs",type:"special",def:{fields:[{_id:"asc"}]}}]};return t.indexes=o.flatten(t.indexes,e.rows.filter(function(e){return"query"===e.doc.language}).map(function(e){var t=void 0!==e.doc.views?Object.keys(e.doc.views):[];return t.map(function(t){var n=e.doc.views[t];return{ddoc:e.id,name:t,type:"json",def:u(n.options.def)}})})),t.indexes.sort(function(e,t){return o.compare(e.name,t.name)}),t.total_rows=t.indexes.length,t})}var o=e(17),i=e(15),u=i.massageIndexDef;t.exports=r},{15:15,17:17}],14:[function(e,t,n){"use strict";var r=e(17),o=r.callbackify;n.createIndex=o(e(8)),n.find=o(e(11)),n.getIndexes=o(e(13)),n.deleteIndex=o(e(9))},{11:11,13:13,17:17,8:8,9:9}],15:[function(e,t,n){"use strict";function r(e){return Object.keys(e)[0]}function o(e){return e[r(e)]}function i(e){if(!Array.isArray(e))throw new Error("invalid sort json - should be an array");return e.map(function(e){if("string"==typeof e){var t={};return t[e]="asc",t}return e})}function u(e){return x.indexOf(e)>-1}function a(e,t,n){"undefined"==typeof n.$eq&&("undefined"!=typeof n.$gte?"$gte"===e?t>n.$gte&&(n.$gte=t):t>=n.$gte&&(delete n.$gte,n.$gt=t):"undefined"!=typeof n.$gt?"$gte"===e?t>n.$gt&&(delete n.$gt,n.$gte=t):t>n.$gt&&(n.$gt=t):n[e]=t)}function c(e,t,n){"undefined"==typeof n.$eq&&("undefined"!=typeof n.$lte?"$lte"===e?t<n.$lte&&(n.$lte=t):t<=n.$lte&&(delete n.$lte,n.$lt=t):"undefined"!=typeof n.$lt?"$lte"===e?t<n.$lt&&(delete n.$lt,n.$lte=t):t<n.$lt&&(n.$lt=t):n[e]=t)}function s(e,t){"$ne"in t?t.$ne.push(e):t.$ne=[e]}function f(e,t){delete t.$gt,delete t.$gte,delete t.$lt,delete t.$lte,delete t.$ne,t.$eq=e}function l(e){var t={};return e.forEach(function(e){Object.keys(e).forEach(function(n){var r=e[n];if("object"!=typeof r&&(r={$eq:r}),u(n))r instanceof Array?t[n]=r.map(function(e){return l([e])}):t[n]=l([r]);else{var o=t[n]=t[n]||{};Object.keys(r).forEach(function(e){var t=r[e];return"$gt"===e||"$gte"===e?a(e,t,o):"$lt"===e||"$lte"===e?c(e,t,o):"$ne"===e?s(t,o):"$eq"===e?f(t,o):void(o[e]=t)})}})}),t}function d(e){var t=k.clone(e),n=!1;"$and"in t&&(t=l(t.$and),n=!0),"$not"in t&&(t.$not=l([t.$not]));for(var r=Object.keys(t),o=0;o<r.length;o++){var i=r[o],u=t[i];"object"!=typeof u||null===u?u={$eq:u}:"$ne"in u&&!n&&(u.$ne=[u.$ne]),t[i]=u}return t}function h(e){return e.fields=e.fields.map(function(e){if("string"==typeof e){var t={};return t[e]="asc",t}return e}),e}function p(e,t){for(var n=[],o=0;o<t.def.fields.length;o++){var i=r(t.def.fields[o]);n.push(e[i])}return n}function y(e,t,n){for(var r=n.def.fields,o=0,i=e.length;i>o;o++){var u=e[o],a=p(u.doc,n);if(1===r.length)a=a[0];else for(;a.length>t.length;)a.pop();if(Math.abs(_.collate(a,t))>0)break}return o>0?e.slice(o):e}function v(e){var t=k.clone(e);return delete t.startkey,delete t.endkey,delete t.inclusive_start,delete t.inclusive_end,"endkey"in e&&(t.startkey=e.endkey),"startkey"in e&&(t.endkey=e.startkey),"inclusive_start"in e&&(t.inclusive_end=e.inclusive_start),"inclusive_end"in e&&(t.inclusive_start=e.inclusive_end),t}function g(e){var t=e.fields.filter(function(e){return"asc"===o(e)});if(0!==t.length&&t.length!==e.fields.length)throw new Error("unsupported mixed sorting")}function m(e,t){if(t.defaultUsed&&e.sort){var n=e.sort.filter(function(e){return"_id"!==Object.keys(e)[0]}).map(function(e){return Object.keys(e)[0]});if(n.length>0)throw new Error('Cannot sort on field(s) "'+n.join(",")+'" when using the default index')}t.defaultUsed}function b(e){if("object"!=typeof e.selector)throw new Error("you must provide a selector when you find()")}function w(e,t){var n,o=Object.keys(e),i=t?t.map(r):[];return n=o.length>=i.length?o:i,0===i.length?{fields:n}:(n=n.sort(function(e,t){var n=i.indexOf(e);-1===n&&(n=Number.MAX_VALUE);var r=i.indexOf(t);return-1===r&&(r=Number.MAX_VALUE),r>n?-1:n>r?1:0}),{fields:n,sortOrder:t.map(r)})}var k=e(17),_=e(26),x=["$or","$nor","$not"];t.exports={getKey:r,getValue:o,massageSort:i,massageSelector:d,validateIndex:g,validateFindRequest:b,validateSort:m,reverseOptions:v,filterInclusiveStart:y,massageIndexDef:h,parseField:k.parseField,getUserFields:w,isCombinationalField:u}},{17:17,26:26}],16:[function(e,t,n){"use strict";var r=e(17),o=r.clone;t.exports=function(e){return e=o(e),e.index||(e.index={}),["type","name","ddoc"].forEach(function(t){e.index[t]&&(e[t]=e.index[t],delete e.index[t])}),e.fields&&(e.index.fields=e.fields,delete e.fields),e.type||(e.type="json"),e}},{17:17}],17:[function(e,t,n){(function(t){"use strict";var r=e(29);n.once=function(e){var t=!1;return n.getArguments(function(n){if(t)throw console.trace(),new Error("once called  more than once");t=!0,e.apply(this,n)})},n.getArguments=function(e){return function(){for(var t=arguments.length,n=new Array(t),r=-1;++r<t;)n[r]=arguments[r];return e.call(this,n)}},n.toPromise=function(e){return n.getArguments(function(o){var i,u=this,a="function"==typeof o[o.length-1]?o.pop():!1;a&&(i=function(e,n){t.nextTick(function(){a(e,n)})});var c=new r(function(t,r){try{var i=n.once(function(e,n){e?r(e):t(n)});o.push(i),e.apply(u,o)}catch(a){r(a)}});return i&&c.then(function(e){i(null,e)},i),c.cancel=function(){return this},c})},n.inherits=e(23),n.Promise=r,n.clone=function(e){return n.extend(!0,{},e)},n.extend=e(28),n.callbackify=function(e){return n.getArguments(function(t){var r=t.pop(),o=e.apply(this,t);return n.promisedCallback(o,r),o})},n.promisedCallback=function(e,n){return e.then(function(e){t.nextTick(function(){n(null,e)})},function(e){t.nextTick(function(){n(e)})}),e};var o=e(19),i=e(35);n.MD5=function(e){return t.browser?i.hash(e):o.createHash("md5").update(e).digest("hex")},n.flatten=n.getArguments(function(e){for(var t=[],r=0,o=e.length;o>r;r++){var i=e[r];Array.isArray(i)?t=t.concat(n.flatten.apply(null,i)):t.push(i)}return t}),n.mergeObjects=function(e){for(var t={},r=0,o=e.length;o>r;r++)t=n.extend(!0,t,e[r]);return t},n.getFieldFromDoc=function(e,t){for(var n=e,r=0,o=t.length;o>r;r++){var i=t[r];if(n=n[i],!n)break}return n},n.setFieldInDoc=function(e,t,n){for(var r=0,o=t.length;o-1>r;r++){var i=t[r];e=e[i]={}}e[t[o-1]]=n},n.parseField=function(e){for(var t=[],n="",r=0,o=e.length;o>r;r++){var i=e[r];"."===i?r>0&&"\\"===e[r-1]?n=n.substring(0,n.length-1)+".":(t.push(n),n=""):n+=i}return t.push(n),t},n.pick=function(e,t){for(var r={},o=0,i=t.length;i>o;o++){var u=n.parseField(t[o]),a=n.getFieldFromDoc(e,u);"undefined"!=typeof a&&n.setFieldInDoc(r,u,a)}return r},n.oneArrayIsSubArrayOfOther=function(e,t){for(var n=0,r=Math.min(e.length,t.length);r>n;n++)if(e[n]!==t[n])return!1;return!0},n.oneArrayIsStrictSubArrayOfOther=function(e,t){return e.length>t.length?!1:n.oneArrayIsSubArrayOfOther(e,t)},n.oneSetIsSubArrayOfOther=function(e,t){e=e.slice();for(var n=0,r=t.length;r>n;n++){var o=t[n];if(!e.length)break;var i=e.indexOf(o);if(-1===i)return!1;e.splice(i,1)}return!0},n.compare=function(e,t){return t>e?-1:e>t?1:0},n.arrayToObject=function(e){for(var t={},n=0,r=e.length;r>n;n++)t[e[n]]=!0;return t},n.max=function(e,t){for(var n=null,r=-1,o=0,i=e.length;i>o;o++){var u=e[o],a=t(u);a>r&&(r=a,n=u)}return n},n.arrayEquals=function(e,t){if(e.length!==t.length)return!1;for(var n=0,r=e.length;r>n;n++)if(e[n]!==t[n])return!1;return!0},n.uniq=function(e){for(var t={},n=0;n<e.length;n++)t["$"+e[n]]=!0;return Object.keys(t).map(function(e){return e.substring(1)})},n.log=e(20)("pouchdb:find")}).call(this,e(34))},{19:19,20:20,23:23,28:28,29:29,34:34,35:35}],18:[function(e,t,n){"use strict";function r(e){return function(){var t=arguments.length;if(t){for(var n=[],r=-1;++r<t;)n[r]=arguments[r];return e.call(this,n)}return e.call(this,[])}}t.exports=r},{}],19:[function(e,t,n){},{}],20:[function(e,t,n){function r(){return"WebkitAppearance"in document.documentElement.style||window.console&&(console.firebug||console.exception&&console.table)||navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31}function o(){var e=arguments,t=this.useColors;if(e[0]=(t?"%c":"")+this.namespace+(t?" %c":" ")+e[0]+(t?"%c ":" ")+"+"+n.humanize(this.diff),!t)return e;var r="color: "+this.color;e=[e[0],r,"color: inherit"].concat(Array.prototype.slice.call(e,1));var o=0,i=0;return e[0].replace(/%[a-z%]/g,function(e){"%%"!==e&&(o++,"%c"===e&&(i=o))}),e.splice(i,0,r),e}function i(){return"object"==typeof console&&console.log&&Function.prototype.apply.call(console.log,console,arguments)}function u(e){try{null==e?n.storage.removeItem("debug"):n.storage.debug=e}catch(t){}}function a(){var e;try{e=n.storage.debug}catch(t){}return e}function c(){try{return window.localStorage}catch(e){}}n=t.exports=e(21),n.log=i,n.formatArgs=o,n.save=u,n.load=a,n.useColors=r,n.storage="undefined"!=typeof chrome&&"undefined"!=typeof chrome.storage?chrome.storage.local:c(),n.colors=["lightseagreen","forestgreen","goldenrod","dodgerblue","darkorchid","crimson"],n.formatters.j=function(e){return JSON.stringify(e)},n.enable(a())},{21:21}],21:[function(e,t,n){function r(){return n.colors[f++%n.colors.length]}function o(e){function t(){}function o(){var e=o,t=+new Date,i=t-(s||t);e.diff=i,e.prev=s,e.curr=t,s=t,null==e.useColors&&(e.useColors=n.useColors()),null==e.color&&e.useColors&&(e.color=r());var u=Array.prototype.slice.call(arguments);
u[0]=n.coerce(u[0]),"string"!=typeof u[0]&&(u=["%o"].concat(u));var a=0;u[0]=u[0].replace(/%([a-z%])/g,function(t,r){if("%%"===t)return t;a++;var o=n.formatters[r];if("function"==typeof o){var i=u[a];t=o.call(e,i),u.splice(a,1),a--}return t}),"function"==typeof n.formatArgs&&(u=n.formatArgs.apply(e,u));var c=o.log||n.log||console.log.bind(console);c.apply(e,u)}t.enabled=!1,o.enabled=!0;var i=n.enabled(e)?o:t;return i.namespace=e,i}function i(e){n.save(e);for(var t=(e||"").split(/[\s,]+/),r=t.length,o=0;r>o;o++)t[o]&&(e=t[o].replace(/\*/g,".*?"),"-"===e[0]?n.skips.push(new RegExp("^"+e.substr(1)+"$")):n.names.push(new RegExp("^"+e+"$")))}function u(){n.enable("")}function a(e){var t,r;for(t=0,r=n.skips.length;r>t;t++)if(n.skips[t].test(e))return!1;for(t=0,r=n.names.length;r>t;t++)if(n.names[t].test(e))return!0;return!1}function c(e){return e instanceof Error?e.stack||e.message:e}n=t.exports=o,n.coerce=c,n.disable=u,n.enable=i,n.enabled=a,n.humanize=e(25),n.names=[],n.skips=[],n.formatters={};var s,f=0},{25:25}],22:[function(e,t,n){(function(e){"use strict";function n(){f=!0;for(var e,t,n=l.length;n;){for(t=l,l=[],e=-1;++e<n;)t[e]();n=l.length}f=!1}function r(e){1!==l.push(e)||f||o()}var o,i=e.MutationObserver||e.WebKitMutationObserver;if(i){var u=0,a=new i(n),c=e.document.createTextNode("");a.observe(c,{characterData:!0}),o=function(){c.data=u=++u%2}}else if(e.setImmediate||"undefined"==typeof e.MessageChannel)o="document"in e&&"onreadystatechange"in e.document.createElement("script")?function(){var t=e.document.createElement("script");t.onreadystatechange=function(){n(),t.onreadystatechange=null,t.parentNode.removeChild(t),t=null},e.document.documentElement.appendChild(t)}:function(){setTimeout(n,0)};else{var s=new e.MessageChannel;s.port1.onmessage=n,o=function(){s.port2.postMessage(0)}}var f,l=[];t.exports=r}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],23:[function(e,t,n){"function"==typeof Object.create?t.exports=function(e,t){e.super_=t,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}})}:t.exports=function(e,t){e.super_=t;var n=function(){};n.prototype=t.prototype,e.prototype=new n,e.prototype.constructor=e}},{}],24:[function(e,t,n){var r=Array.isArray,o=Object.prototype.toString;t.exports=r||function(e){return!!e&&"[object Array]"==o.call(e)}},{}],25:[function(e,t,n){function r(e){if(e=""+e,!(e.length>1e4)){var t=/^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*l;case"days":case"day":case"d":return n*f;case"hours":case"hour":case"hrs":case"hr":case"h":return n*s;case"minutes":case"minute":case"mins":case"min":case"m":return n*c;case"seconds":case"second":case"secs":case"sec":case"s":return n*a;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n}}}}function o(e){return e>=f?Math.round(e/f)+"d":e>=s?Math.round(e/s)+"h":e>=c?Math.round(e/c)+"m":e>=a?Math.round(e/a)+"s":e+"ms"}function i(e){return u(e,f,"day")||u(e,s,"hour")||u(e,c,"minute")||u(e,a,"second")||e+" ms"}function u(e,t,n){return t>e?void 0:1.5*t>e?Math.floor(e/t)+" "+n:Math.ceil(e/t)+" "+n+"s"}var a=1e3,c=60*a,s=60*c,f=24*s,l=365.25*f;t.exports=function(e,t){return t=t||{},"string"==typeof e?r(e):t["long"]?i(e):o(e)}},{}],26:[function(e,t,n){"use strict";function r(e){if(null!==e)switch(typeof e){case"boolean":return e?1:0;case"number":return f(e);case"string":return e.replace(/\u0002/g,"").replace(/\u0001/g,"").replace(/\u0000/g,"");case"object":var t=Array.isArray(e),r=t?e:Object.keys(e),o=-1,i=r.length,u="";if(t)for(;++o<i;)u+=n.toIndexableString(r[o]);else for(;++o<i;){var a=r[o];u+=n.toIndexableString(a)+n.toIndexableString(e[a])}return u}return""}function o(e,t){var n,r=t,o="1"===e[t];if(o)n=0,t++;else{var i="0"===e[t];t++;var u="",a=e.substring(t,t+d),c=parseInt(a,10)+l;for(i&&(c=-c),t+=d;;){var s=e[t];if("\x00"===s)break;u+=s,t++}u=u.split("."),n=1===u.length?parseInt(u,10):parseFloat(u[0]+"."+u[1]),i&&(n-=10),0!==c&&(n=parseFloat(n+"e"+c))}return{num:n,length:t-r}}function i(e,t){var n=e.pop();if(t.length){var r=t[t.length-1];n===r.element&&(t.pop(),r=t[t.length-1]);var o=r.element,i=r.index;if(Array.isArray(o))o.push(n);else if(i===e.length-2){var u=e.pop();o[u]=n}else e.push(n)}}function u(e,t){for(var r=Math.min(e.length,t.length),o=0;r>o;o++){var i=n.collate(e[o],t[o]);if(0!==i)return i}return e.length===t.length?0:e.length>t.length?1:-1}function a(e,t){return e===t?0:e>t?1:-1}function c(e,t){for(var r=Object.keys(e),o=Object.keys(t),i=Math.min(r.length,o.length),u=0;i>u;u++){var a=n.collate(r[u],o[u]);if(0!==a)return a;if(a=n.collate(e[r[u]],t[o[u]]),0!==a)return a}return r.length===o.length?0:r.length>o.length?1:-1}function s(e){var t=["boolean","number","string","object"],n=t.indexOf(typeof e);return~n?null===e?1:Array.isArray(e)?5:3>n?n+2:n+3:Array.isArray(e)?5:void 0}function f(e){if(0===e)return"1";var t=e.toExponential().split(/e\+?/),n=parseInt(t[1],10),r=0>e,o=r?"0":"2",i=(r?-n:n)-l,u=p.padLeft(i.toString(),"0",d);o+=h+u;var a=Math.abs(parseFloat(t[0]));r&&(a=10-a);var c=a.toFixed(20);return c=c.replace(/\.?0+$/,""),o+=h+c}var l=-324,d=3,h="",p=e(27);n.collate=function(e,t){if(e===t)return 0;e=n.normalizeKey(e),t=n.normalizeKey(t);var r=s(e),o=s(t);if(r-o!==0)return r-o;if(null===e)return 0;switch(typeof e){case"number":return e-t;case"boolean":return e===t?0:t>e?-1:1;case"string":return a(e,t)}return Array.isArray(e)?u(e,t):c(e,t)},n.normalizeKey=function(e){switch(typeof e){case"undefined":return null;case"number":return e===1/0||e===-(1/0)||isNaN(e)?null:e;case"object":var t=e;if(Array.isArray(e)){var r=e.length;e=new Array(r);for(var o=0;r>o;o++)e[o]=n.normalizeKey(t[o])}else{if(e instanceof Date)return e.toJSON();if(null!==e){e={};for(var i in t)if(t.hasOwnProperty(i)){var u=t[i];"undefined"!=typeof u&&(e[i]=n.normalizeKey(u))}}}}return e},n.toIndexableString=function(e){var t="\x00";return e=n.normalizeKey(e),s(e)+h+r(e)+t},n.parseIndexableString=function(e){for(var t=[],n=[],r=0;;){var u=e[r++];if("\x00"!==u)switch(u){case"1":t.push(null);break;case"2":t.push("1"===e[r]),r++;break;case"3":var a=o(e,r);t.push(a.num),r+=a.length;break;case"4":for(var c="";;){var s=e[r];if("\x00"===s)break;c+=s,r++}c=c.replace(/\u0001\u0001/g,"\x00").replace(/\u0001\u0002/g,"").replace(/\u0002\u0002/g,""),t.push(c);break;case"5":var f={element:[],index:t.length};t.push(f.element),n.push(f);break;case"6":var l={element:{},index:t.length};t.push(l.element),n.push(l);break;default:throw new Error("bad collationIndex or unexpectedly reached end of input: "+u)}else{if(1===t.length)return t.pop();i(t,n)}}}},{27:27}],27:[function(e,t,n){"use strict";function r(e,t,n){for(var r="",o=n-e.length;r.length<o;)r+=t;return r}n.padLeft=function(e,t,n){var o=r(e,t,n);return o+e},n.padRight=function(e,t,n){var o=r(e,t,n);return e+o},n.stringLexCompare=function(e,t){var n,r=e.length,o=t.length;for(n=0;r>n;n++){if(n===o)return 1;var i=e.charAt(n),u=t.charAt(n);if(i!==u)return u>i?-1:1}return o>r?-1:0},n.intToDecimalForm=function(e){var t=0>e,n="";do{var r=t?-Math.ceil(e%10):Math.floor(e%10);n=r+n,e=t?Math.ceil(e/10):Math.floor(e/10)}while(e);return t&&"0"!==n&&(n="-"+n),n}},{}],28:[function(e,t,n){"use strict";function r(e){return null===e?String(e):"object"==typeof e||"function"==typeof e?s[h.call(e)]||"object":typeof e}function o(e){return null!==e&&e===e.window}function i(e){if(!e||"object"!==r(e)||e.nodeType||o(e))return!1;try{if(e.constructor&&!p.call(e,"constructor")&&!p.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(t){return!1}var n;for(n in e);return void 0===n||p.call(e,n)}function u(e){return"function"===r(e)}function a(){for(var e=[],t=-1,n=arguments.length,r=new Array(n);++t<n;)r[t]=arguments[t];var o={};e.push({args:r,result:{container:o,key:"key"}});for(var i;i=e.pop();)c(e,i.args,i.result);return o.key}function c(e,t,n){var r,o,a,c,s,f,l,d=t[0]||{},h=1,p=t.length,v=!1,g=/\d+/;for("boolean"==typeof d&&(v=d,d=t[1]||{},h=2),"object"==typeof d||u(d)||(d={}),p===h&&(d=this,--h);p>h;h++)if(null!=(r=t[h])){l=y(r);for(o in r)if(!(o in Object.prototype)){if(l&&!g.test(o))continue;if(a=d[o],c=r[o],d===c)continue;v&&c&&(i(c)||(s=y(c)))?(s?(s=!1,f=a&&y(a)?a:[]):f=a&&i(a)?a:{},e.push({args:[v,f,c],result:{container:d,key:o}})):void 0!==c&&(y(r)&&u(c)||(d[o]=c))}}n.container[n.key]=d}for(var s={},f=["Boolean","Number","String","Function","Array","Date","RegExp","Object","Error"],l=0;l<f.length;l++){var d=f[l];s["[object "+d+"]"]=d.toLowerCase()}var h=s.toString,p=s.hasOwnProperty,y=Array.isArray||function(e){return"array"===r(e)};t.exports=a},{}],29:[function(e,t,n){"use strict";function r(e){return e&&"object"==typeof e&&"default"in e?e["default"]:e}var o=r(e(30)),i="function"==typeof Promise?Promise:o;t.exports=i},{30:30}],30:[function(e,t,n){"use strict";function r(){}function o(e){if("function"!=typeof e)throw new TypeError("resolver must be a function");this.state=m,this.queue=[],this.outcome=void 0,e!==r&&c(this,e)}function i(e,t,n){this.promise=e,"function"==typeof t&&(this.onFulfilled=t,this.callFulfilled=this.otherCallFulfilled),"function"==typeof n&&(this.onRejected=n,this.callRejected=this.otherCallRejected)}function u(e,t,n){p(function(){var r;try{r=t(n)}catch(o){return y.reject(e,o)}r===e?y.reject(e,new TypeError("Cannot resolve promise with itself")):y.resolve(e,r)})}function a(e){var t=e&&e.then;return e&&"object"==typeof e&&"function"==typeof t?function(){t.apply(e,arguments)}:void 0}function c(e,t){function n(t){i||(i=!0,y.reject(e,t))}function r(t){i||(i=!0,y.resolve(e,t))}function o(){t(r,n)}var i=!1,u=s(o);"error"===u.status&&n(u.value)}function s(e,t){var n={};try{n.value=e(t),n.status="success"}catch(r){n.status="error",n.value=r}return n}function f(e){return e instanceof this?e:y.resolve(new this(r),e)}function l(e){var t=new this(r);return y.reject(t,e)}function d(e){function t(e,t){function r(e){u[t]=e,++a!==o||i||(i=!0,y.resolve(s,u))}n.resolve(e).then(r,function(e){i||(i=!0,y.reject(s,e))})}var n=this;if("[object Array]"!==Object.prototype.toString.call(e))return this.reject(new TypeError("must be an array"));var o=e.length,i=!1;if(!o)return this.resolve([]);for(var u=new Array(o),a=0,c=-1,s=new this(r);++c<o;)t(e[c],c);return s}function h(e){function t(e){n.resolve(e).then(function(e){i||(i=!0,y.resolve(a,e))},function(e){i||(i=!0,y.reject(a,e))})}var n=this;if("[object Array]"!==Object.prototype.toString.call(e))return this.reject(new TypeError("must be an array"));var o=e.length,i=!1;if(!o)return this.resolve([]);for(var u=-1,a=new this(r);++u<o;)t(e[u]);return a}var p=e(22),y={},v=["REJECTED"],g=["FULFILLED"],m=["PENDING"];t.exports=o,o.prototype["catch"]=function(e){return this.then(null,e)},o.prototype.then=function(e,t){if("function"!=typeof e&&this.state===g||"function"!=typeof t&&this.state===v)return this;var n=new this.constructor(r);if(this.state!==m){var o=this.state===g?e:t;u(n,o,this.outcome)}else this.queue.push(new i(n,e,t));return n},i.prototype.callFulfilled=function(e){y.resolve(this.promise,e)},i.prototype.otherCallFulfilled=function(e){u(this.promise,this.onFulfilled,e)},i.prototype.callRejected=function(e){y.reject(this.promise,e)},i.prototype.otherCallRejected=function(e){u(this.promise,this.onRejected,e)},y.resolve=function(e,t){var n=s(a,t);if("error"===n.status)return y.reject(e,n.value);var r=n.value;if(r)c(e,r);else{e.state=g,e.outcome=t;for(var o=-1,i=e.queue.length;++o<i;)e.queue[o].callFulfilled(t)}return e},y.reject=function(e,t){e.state=v,e.outcome=t;for(var n=-1,r=e.queue.length;++n<r;)e.queue[n].callRejected(t);return e},o.resolve=f,o.reject=l,o.all=d,o.race=h},{22:22}],31:[function(e,t,n){"use strict";function r(e,t,n){return"string"!=typeof t?i.reject(new Error("doc id is required")):e.get(t)["catch"](function(e){if(404!==e.status)throw e;return{}}).then(function(r){var i=r._rev,u=n(r);return u?(u._id=t,u._rev=i,o(e,u,n)):{updated:!1,rev:i}})}function o(e,t,n){return e.put(t).then(function(e){return{updated:!0,rev:e.rev}},function(o){if(409!==o.status)throw o;return r(e,t._id,n)})}var i=e(33);n.upsert=function(e,t,n){var o=this,i=r(o,e,t);return"function"!=typeof n?i:void i.then(function(e){n(null,e)},n)},n.putIfNotExists=function(e,t,n){var o=this;"string"!=typeof e&&(n=t,t=e,e=t._id);var i=function(e){return e._rev?!1:t},u=r(o,e,i);return"function"!=typeof n?u:void u.then(function(e){n(null,e)},n)},"undefined"!=typeof window&&window.PouchDB&&window.PouchDB.plugin(n)},{33:33}],32:[function(e,t,n){arguments[4][30][0].apply(n,arguments)},{22:22,30:30}],33:[function(e,t,n){arguments[4][29][0].apply(n,arguments)},{29:29,32:32}],34:[function(e,t,n){function r(){f&&a&&(f=!1,a.length?s=a.concat(s):l=-1,s.length&&o())}function o(){if(!f){var e=setTimeout(r);f=!0;for(var t=s.length;t;){for(a=s,s=[];++l<t;)a&&a[l].run();l=-1,t=s.length}a=null,f=!1,clearTimeout(e)}}function i(e,t){this.fun=e,this.array=t}function u(){}var a,c=t.exports={},s=[],f=!1,l=-1;c.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];s.push(new i(e,t)),1!==s.length||f||setTimeout(o,0)},i.prototype.run=function(){this.fun.apply(null,this.array)},c.title="browser",c.browser=!0,c.env={},c.argv=[],c.version="",c.versions={},c.on=u,c.addListener=u,c.once=u,c.off=u,c.removeListener=u,c.removeAllListeners=u,c.emit=u,c.binding=function(e){throw new Error("process.binding is not supported")},c.cwd=function(){return"/"},c.chdir=function(e){throw new Error("process.chdir is not supported")},c.umask=function(){return 0}},{}],35:[function(t,n,r){!function(t){if("object"==typeof r)n.exports=t();else if("function"==typeof e&&e.amd)e(t);else{var o;try{o=window}catch(i){o=self}o.SparkMD5=t()}}(function(e){"use strict";var t=function(e,t){return e+t&4294967295},n=function(e,n,r,o,i,u){return n=t(t(n,e),t(o,u)),t(n<<i|n>>>32-i,r)},r=function(e,t,r,o,i,u,a){return n(t&r|~t&o,e,t,i,u,a)},o=function(e,t,r,o,i,u,a){return n(t&o|r&~o,e,t,i,u,a)},i=function(e,t,r,o,i,u,a){return n(t^r^o,e,t,i,u,a)},u=function(e,t,r,o,i,u,a){return n(r^(t|~o),e,t,i,u,a)},a=function(e,n){var a=e[0],c=e[1],s=e[2],f=e[3];a=r(a,c,s,f,n[0],7,-680876936),f=r(f,a,c,s,n[1],12,-389564586),s=r(s,f,a,c,n[2],17,606105819),c=r(c,s,f,a,n[3],22,-1044525330),a=r(a,c,s,f,n[4],7,-176418897),f=r(f,a,c,s,n[5],12,1200080426),s=r(s,f,a,c,n[6],17,-1473231341),c=r(c,s,f,a,n[7],22,-45705983),a=r(a,c,s,f,n[8],7,1770035416),f=r(f,a,c,s,n[9],12,-1958414417),s=r(s,f,a,c,n[10],17,-42063),c=r(c,s,f,a,n[11],22,-1990404162),a=r(a,c,s,f,n[12],7,1804603682),f=r(f,a,c,s,n[13],12,-40341101),s=r(s,f,a,c,n[14],17,-1502002290),c=r(c,s,f,a,n[15],22,1236535329),a=o(a,c,s,f,n[1],5,-165796510),f=o(f,a,c,s,n[6],9,-1069501632),s=o(s,f,a,c,n[11],14,643717713),c=o(c,s,f,a,n[0],20,-373897302),a=o(a,c,s,f,n[5],5,-701558691),f=o(f,a,c,s,n[10],9,38016083),s=o(s,f,a,c,n[15],14,-660478335),c=o(c,s,f,a,n[4],20,-405537848),a=o(a,c,s,f,n[9],5,568446438),f=o(f,a,c,s,n[14],9,-1019803690),s=o(s,f,a,c,n[3],14,-187363961),c=o(c,s,f,a,n[8],20,1163531501),a=o(a,c,s,f,n[13],5,-1444681467),f=o(f,a,c,s,n[2],9,-51403784),s=o(s,f,a,c,n[7],14,1735328473),c=o(c,s,f,a,n[12],20,-1926607734),a=i(a,c,s,f,n[5],4,-378558),f=i(f,a,c,s,n[8],11,-2022574463),s=i(s,f,a,c,n[11],16,1839030562),c=i(c,s,f,a,n[14],23,-35309556),a=i(a,c,s,f,n[1],4,-1530992060),f=i(f,a,c,s,n[4],11,1272893353),s=i(s,f,a,c,n[7],16,-155497632),c=i(c,s,f,a,n[10],23,-1094730640),a=i(a,c,s,f,n[13],4,681279174),f=i(f,a,c,s,n[0],11,-358537222),s=i(s,f,a,c,n[3],16,-722521979),c=i(c,s,f,a,n[6],23,76029189),a=i(a,c,s,f,n[9],4,-640364487),f=i(f,a,c,s,n[12],11,-421815835),s=i(s,f,a,c,n[15],16,530742520),c=i(c,s,f,a,n[2],23,-995338651),a=u(a,c,s,f,n[0],6,-198630844),f=u(f,a,c,s,n[7],10,1126891415),s=u(s,f,a,c,n[14],15,-1416354905),c=u(c,s,f,a,n[5],21,-57434055),a=u(a,c,s,f,n[12],6,1700485571),f=u(f,a,c,s,n[3],10,-1894986606),s=u(s,f,a,c,n[10],15,-1051523),c=u(c,s,f,a,n[1],21,-2054922799),a=u(a,c,s,f,n[8],6,1873313359),f=u(f,a,c,s,n[15],10,-30611744),s=u(s,f,a,c,n[6],15,-1560198380),c=u(c,s,f,a,n[13],21,1309151649),a=u(a,c,s,f,n[4],6,-145523070),f=u(f,a,c,s,n[11],10,-1120210379),s=u(s,f,a,c,n[2],15,718787259),c=u(c,s,f,a,n[9],21,-343485551),e[0]=t(a,e[0]),e[1]=t(c,e[1]),e[2]=t(s,e[2]),e[3]=t(f,e[3])},c=function(e){var t,n=[];for(t=0;64>t;t+=4)n[t>>2]=e.charCodeAt(t)+(e.charCodeAt(t+1)<<8)+(e.charCodeAt(t+2)<<16)+(e.charCodeAt(t+3)<<24);return n},s=function(e){var t,n=[];for(t=0;64>t;t+=4)n[t>>2]=e[t]+(e[t+1]<<8)+(e[t+2]<<16)+(e[t+3]<<24);return n},f=function(e){var t,n,r,o,i,u,s=e.length,f=[1732584193,-271733879,-1732584194,271733878];for(t=64;s>=t;t+=64)a(f,c(e.substring(t-64,t)));for(e=e.substring(t-64),n=e.length,r=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],t=0;n>t;t+=1)r[t>>2]|=e.charCodeAt(t)<<(t%4<<3);if(r[t>>2]|=128<<(t%4<<3),t>55)for(a(f,r),t=0;16>t;t+=1)r[t]=0;return o=8*s,o=o.toString(16).match(/(.*?)(.{0,8})$/),i=parseInt(o[2],16),u=parseInt(o[1],16)||0,r[14]=i,r[15]=u,a(f,r),f},l=function(e){var t,n,r,o,i,u,c=e.length,f=[1732584193,-271733879,-1732584194,271733878];for(t=64;c>=t;t+=64)a(f,s(e.subarray(t-64,t)));for(e=c>t-64?e.subarray(t-64):new Uint8Array(0),n=e.length,r=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],t=0;n>t;t+=1)r[t>>2]|=e[t]<<(t%4<<3);if(r[t>>2]|=128<<(t%4<<3),t>55)for(a(f,r),t=0;16>t;t+=1)r[t]=0;return o=8*c,o=o.toString(16).match(/(.*?)(.{0,8})$/),i=parseInt(o[2],16),u=parseInt(o[1],16)||0,r[14]=i,r[15]=u,a(f,r),f},d=["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"],h=function(e){var t,n="";for(t=0;4>t;t+=1)n+=d[e>>8*t+4&15]+d[e>>8*t&15];return n},p=function(e){var t;for(t=0;t<e.length;t+=1)e[t]=h(e[t]);return e.join("")},y=function(e){return p(f(e))},v=function(){this.reset()};return"5d41402abc4b2a76b9719d911017c592"!==y("hello")&&(t=function(e,t){var n=(65535&e)+(65535&t),r=(e>>16)+(t>>16)+(n>>16);return r<<16|65535&n}),v.prototype.append=function(e){return/[\u0080-\uFFFF]/.test(e)&&(e=unescape(encodeURIComponent(e))),this.appendBinary(e),this},v.prototype.appendBinary=function(e){this._buff+=e,this._length+=e.length;var t,n=this._buff.length;for(t=64;n>=t;t+=64)a(this._state,c(this._buff.substring(t-64,t)));return this._buff=this._buff.substr(t-64),this},v.prototype.end=function(e){var t,n,r=this._buff,o=r.length,i=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];for(t=0;o>t;t+=1)i[t>>2]|=r.charCodeAt(t)<<(t%4<<3);return this._finish(i,o),n=e?this._state:p(this._state),this.reset(),n},v.prototype._finish=function(e,t){var n,r,o,i=t;if(e[i>>2]|=128<<(i%4<<3),i>55)for(a(this._state,e),i=0;16>i;i+=1)e[i]=0;n=8*this._length,n=n.toString(16).match(/(.*?)(.{0,8})$/),r=parseInt(n[2],16),o=parseInt(n[1],16)||0,e[14]=r,e[15]=o,a(this._state,e)},v.prototype.reset=function(){return this._buff="",this._length=0,this._state=[1732584193,-271733879,-1732584194,271733878],this},v.prototype.destroy=function(){delete this._state,delete this._buff,delete this._length},v.hash=function(e,t){/[\u0080-\uFFFF]/.test(e)&&(e=unescape(encodeURIComponent(e)));var n=f(e);return t?n:p(n)},v.hashBinary=function(e,t){var n=f(e);return t?n:p(n)},v.ArrayBuffer=function(){this.reset()},v.ArrayBuffer.prototype.append=function(e){var t,n=this._concatArrayBuffer(this._buff,e),r=n.length;for(this._length+=e.byteLength,t=64;r>=t;t+=64)a(this._state,s(n.subarray(t-64,t)));return this._buff=r>t-64?n.subarray(t-64):new Uint8Array(0),this},v.ArrayBuffer.prototype.end=function(e){var t,n,r=this._buff,o=r.length,i=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];for(t=0;o>t;t+=1)i[t>>2]|=r[t]<<(t%4<<3);return this._finish(i,o),n=e?this._state:p(this._state),this.reset(),n},v.ArrayBuffer.prototype._finish=v.prototype._finish,v.ArrayBuffer.prototype.reset=function(){return this._buff=new Uint8Array(0),this._length=0,this._state=[1732584193,-271733879,-1732584194,271733878],this},v.ArrayBuffer.prototype.destroy=v.prototype.destroy,v.ArrayBuffer.prototype._concatArrayBuffer=function(e,t){var n=e.length,r=new Uint8Array(n+t.byteLength);return r.set(e),r.set(new Uint8Array(t),n),r},v.ArrayBuffer.hash=function(e,t){var n=l(new Uint8Array(e));return t?n:p(n)},v})},{}],36:[function(e,t,n){"use strict";var r=e(17),o=e(6),i=e(14),u={};u.createIndex=r.toPromise(function(e,t){if("object"!=typeof e)return t(new Error("you must provide an index to create"));var n="http"===this.type()?o:i;n.createIndex(this,e,t)}),u.find=r.toPromise(function(e,t){if("undefined"==typeof t&&(t=e,e=void 0),"object"!=typeof e)return t(new Error("you must provide search parameters to find()"));var n="http"===this.type()?o:i;n.find(this,e,t)}),u.getIndexes=r.toPromise(function(e){var t="http"===this.type()?o:i;t.getIndexes(this,e)}),u.deleteIndex=r.toPromise(function(e,t){if("object"!=typeof e)return t(new Error("you must provide an index to delete"));var n="http"===this.type()?o:i;n.deleteIndex(this,e,t)}),t.exports=u,"undefined"!=typeof window&&window.PouchDB&&window.PouchDB.plugin(u)},{14:14,17:17,6:6}]},{},[36])(36)});

// pouchdb-find plugin 7.0.0
// Based on Mango: https://github.com/cloudant/mango
// 
// (c) 2012-2018 Dale Harvey and the PouchDB team
// PouchDB may be freely distributed under the Apache license, version 2.0.
// For all details and documentation:
// http://pouchdb.com
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(_dereq_,module,exports){
    'use strict';
    
    module.exports = argsArray;
    
    function argsArray(fun) {
      return function () {
        var len = arguments.length;
        if (len) {
          var args = [];
          var i = -1;
          while (++i < len) {
            args[i] = arguments[i];
          }
          return fun.call(this, args);
        } else {
          return fun.call(this, []);
        }
      };
    }
    },{}],2:[function(_dereq_,module,exports){
    // Copyright Joyent, Inc. and other Node contributors.
    //
    // Permission is hereby granted, free of charge, to any person obtaining a
    // copy of this software and associated documentation files (the
    // "Software"), to deal in the Software without restriction, including
    // without limitation the rights to use, copy, modify, merge, publish,
    // distribute, sublicense, and/or sell copies of the Software, and to permit
    // persons to whom the Software is furnished to do so, subject to the
    // following conditions:
    //
    // The above copyright notice and this permission notice shall be included
    // in all copies or substantial portions of the Software.
    //
    // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
    // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
    // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
    // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
    // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
    // USE OR OTHER DEALINGS IN THE SOFTWARE.
    
    var objectCreate = Object.create || objectCreatePolyfill
    var objectKeys = Object.keys || objectKeysPolyfill
    var bind = Function.prototype.bind || functionBindPolyfill
    
    function EventEmitter() {
      if (!this._events || !Object.prototype.hasOwnProperty.call(this, '_events')) {
        this._events = objectCreate(null);
        this._eventsCount = 0;
      }
    
      this._maxListeners = this._maxListeners || undefined;
    }
    module.exports = EventEmitter;
    
    // Backwards-compat with node 0.10.x
    EventEmitter.EventEmitter = EventEmitter;
    
    EventEmitter.prototype._events = undefined;
    EventEmitter.prototype._maxListeners = undefined;
    
    // By default EventEmitters will print a warning if more than 10 listeners are
    // added to it. This is a useful default which helps finding memory leaks.
    var defaultMaxListeners = 10;
    
    var hasDefineProperty;
    try {
      var o = {};
      if (Object.defineProperty) Object.defineProperty(o, 'x', { value: 0 });
      hasDefineProperty = o.x === 0;
    } catch (err) { hasDefineProperty = false }
    if (hasDefineProperty) {
      Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
        enumerable: true,
        get: function() {
          return defaultMaxListeners;
        },
        set: function(arg) {
          // check whether the input is a positive number (whose value is zero or
          // greater and not a NaN).
          if (typeof arg !== 'number' || arg < 0 || arg !== arg)
            throw new TypeError('"defaultMaxListeners" must be a positive number');
          defaultMaxListeners = arg;
        }
      });
    } else {
      EventEmitter.defaultMaxListeners = defaultMaxListeners;
    }
    
    // Obviously not all Emitters should be limited to 10. This function allows
    // that to be increased. Set to zero for unlimited.
    EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
      if (typeof n !== 'number' || n < 0 || isNaN(n))
        throw new TypeError('"n" argument must be a positive number');
      this._maxListeners = n;
      return this;
    };
    
    function $getMaxListeners(that) {
      if (that._maxListeners === undefined)
        return EventEmitter.defaultMaxListeners;
      return that._maxListeners;
    }
    
    EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
      return $getMaxListeners(this);
    };
    
    // These standalone emit* functions are used to optimize calling of event
    // handlers for fast cases because emit() itself often has a variable number of
    // arguments and can be deoptimized because of that. These functions always have
    // the same number of arguments and thus do not get deoptimized, so the code
    // inside them can execute faster.
    function emitNone(handler, isFn, self) {
      if (isFn)
        handler.call(self);
      else {
        var len = handler.length;
        var listeners = arrayClone(handler, len);
        for (var i = 0; i < len; ++i)
          listeners[i].call(self);
      }
    }
    function emitOne(handler, isFn, self, arg1) {
      if (isFn)
        handler.call(self, arg1);
      else {
        var len = handler.length;
        var listeners = arrayClone(handler, len);
        for (var i = 0; i < len; ++i)
          listeners[i].call(self, arg1);
      }
    }
    function emitTwo(handler, isFn, self, arg1, arg2) {
      if (isFn)
        handler.call(self, arg1, arg2);
      else {
        var len = handler.length;
        var listeners = arrayClone(handler, len);
        for (var i = 0; i < len; ++i)
          listeners[i].call(self, arg1, arg2);
      }
    }
    function emitThree(handler, isFn, self, arg1, arg2, arg3) {
      if (isFn)
        handler.call(self, arg1, arg2, arg3);
      else {
        var len = handler.length;
        var listeners = arrayClone(handler, len);
        for (var i = 0; i < len; ++i)
          listeners[i].call(self, arg1, arg2, arg3);
      }
    }
    
    function emitMany(handler, isFn, self, args) {
      if (isFn)
        handler.apply(self, args);
      else {
        var len = handler.length;
        var listeners = arrayClone(handler, len);
        for (var i = 0; i < len; ++i)
          listeners[i].apply(self, args);
      }
    }
    
    EventEmitter.prototype.emit = function emit(type) {
      var er, handler, len, args, i, events;
      var doError = (type === 'error');
    
      events = this._events;
      if (events)
        doError = (doError && events.error == null);
      else if (!doError)
        return false;
    
      // If there is no 'error' event listener then throw.
      if (doError) {
        if (arguments.length > 1)
          er = arguments[1];
        if (er instanceof Error) {
          throw er; // Unhandled 'error' event
        } else {
          // At least give some kind of context to the user
          var err = new Error('Unhandled "error" event. (' + er + ')');
          err.context = er;
          throw err;
        }
        return false;
      }
    
      handler = events[type];
    
      if (!handler)
        return false;
    
      var isFn = typeof handler === 'function';
      len = arguments.length;
      switch (len) {
          // fast cases
        case 1:
          emitNone(handler, isFn, this);
          break;
        case 2:
          emitOne(handler, isFn, this, arguments[1]);
          break;
        case 3:
          emitTwo(handler, isFn, this, arguments[1], arguments[2]);
          break;
        case 4:
          emitThree(handler, isFn, this, arguments[1], arguments[2], arguments[3]);
          break;
          // slower
        default:
          args = new Array(len - 1);
          for (i = 1; i < len; i++)
            args[i - 1] = arguments[i];
          emitMany(handler, isFn, this, args);
      }
    
      return true;
    };
    
    function _addListener(target, type, listener, prepend) {
      var m;
      var events;
      var existing;
    
      if (typeof listener !== 'function')
        throw new TypeError('"listener" argument must be a function');
    
      events = target._events;
      if (!events) {
        events = target._events = objectCreate(null);
        target._eventsCount = 0;
      } else {
        // To avoid recursion in the case that type === "newListener"! Before
        // adding it to the listeners, first emit "newListener".
        if (events.newListener) {
          target.emit('newListener', type,
              listener.listener ? listener.listener : listener);
    
          // Re-assign `events` because a newListener handler could have caused the
          // this._events to be assigned to a new object
          events = target._events;
        }
        existing = events[type];
      }
    
      if (!existing) {
        // Optimize the case of one listener. Don't need the extra array object.
        existing = events[type] = listener;
        ++target._eventsCount;
      } else {
        if (typeof existing === 'function') {
          // Adding the second element, need to change to array.
          existing = events[type] =
              prepend ? [listener, existing] : [existing, listener];
        } else {
          // If we've already got an array, just append.
          if (prepend) {
            existing.unshift(listener);
          } else {
            existing.push(listener);
          }
        }
    
        // Check for listener leak
        if (!existing.warned) {
          m = $getMaxListeners(target);
          if (m && m > 0 && existing.length > m) {
            existing.warned = true;
            var w = new Error('Possible EventEmitter memory leak detected. ' +
                existing.length + ' "' + String(type) + '" listeners ' +
                'added. Use emitter.setMaxListeners() to ' +
                'increase limit.');
            w.name = 'MaxListenersExceededWarning';
            w.emitter = target;
            w.type = type;
            w.count = existing.length;
            if (typeof console === 'object' && console.warn) {
              console.warn('%s: %s', w.name, w.message);
            }
          }
        }
      }
    
      return target;
    }
    
    EventEmitter.prototype.addListener = function addListener(type, listener) {
      return _addListener(this, type, listener, false);
    };
    
    EventEmitter.prototype.on = EventEmitter.prototype.addListener;
    
    EventEmitter.prototype.prependListener =
        function prependListener(type, listener) {
          return _addListener(this, type, listener, true);
        };
    
    function onceWrapper() {
      if (!this.fired) {
        this.target.removeListener(this.type, this.wrapFn);
        this.fired = true;
        switch (arguments.length) {
          case 0:
            return this.listener.call(this.target);
          case 1:
            return this.listener.call(this.target, arguments[0]);
          case 2:
            return this.listener.call(this.target, arguments[0], arguments[1]);
          case 3:
            return this.listener.call(this.target, arguments[0], arguments[1],
                arguments[2]);
          default:
            var args = new Array(arguments.length);
            for (var i = 0; i < args.length; ++i)
              args[i] = arguments[i];
            this.listener.apply(this.target, args);
        }
      }
    }
    
    function _onceWrap(target, type, listener) {
      var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
      var wrapped = bind.call(onceWrapper, state);
      wrapped.listener = listener;
      state.wrapFn = wrapped;
      return wrapped;
    }
    
    EventEmitter.prototype.once = function once(type, listener) {
      if (typeof listener !== 'function')
        throw new TypeError('"listener" argument must be a function');
      this.on(type, _onceWrap(this, type, listener));
      return this;
    };
    
    EventEmitter.prototype.prependOnceListener =
        function prependOnceListener(type, listener) {
          if (typeof listener !== 'function')
            throw new TypeError('"listener" argument must be a function');
          this.prependListener(type, _onceWrap(this, type, listener));
          return this;
        };
    
    // Emits a 'removeListener' event if and only if the listener was removed.
    EventEmitter.prototype.removeListener =
        function removeListener(type, listener) {
          var list, events, position, i, originalListener;
    
          if (typeof listener !== 'function')
            throw new TypeError('"listener" argument must be a function');
    
          events = this._events;
          if (!events)
            return this;
    
          list = events[type];
          if (!list)
            return this;
    
          if (list === listener || list.listener === listener) {
            if (--this._eventsCount === 0)
              this._events = objectCreate(null);
            else {
              delete events[type];
              if (events.removeListener)
                this.emit('removeListener', type, list.listener || listener);
            }
          } else if (typeof list !== 'function') {
            position = -1;
    
            for (i = list.length - 1; i >= 0; i--) {
              if (list[i] === listener || list[i].listener === listener) {
                originalListener = list[i].listener;
                position = i;
                break;
              }
            }
    
            if (position < 0)
              return this;
    
            if (position === 0)
              list.shift();
            else
              spliceOne(list, position);
    
            if (list.length === 1)
              events[type] = list[0];
    
            if (events.removeListener)
              this.emit('removeListener', type, originalListener || listener);
          }
    
          return this;
        };
    
    EventEmitter.prototype.removeAllListeners =
        function removeAllListeners(type) {
          var listeners, events, i;
    
          events = this._events;
          if (!events)
            return this;
    
          // not listening for removeListener, no need to emit
          if (!events.removeListener) {
            if (arguments.length === 0) {
              this._events = objectCreate(null);
              this._eventsCount = 0;
            } else if (events[type]) {
              if (--this._eventsCount === 0)
                this._events = objectCreate(null);
              else
                delete events[type];
            }
            return this;
          }
    
          // emit removeListener for all listeners on all events
          if (arguments.length === 0) {
            var keys = objectKeys(events);
            var key;
            for (i = 0; i < keys.length; ++i) {
              key = keys[i];
              if (key === 'removeListener') continue;
              this.removeAllListeners(key);
            }
            this.removeAllListeners('removeListener');
            this._events = objectCreate(null);
            this._eventsCount = 0;
            return this;
          }
    
          listeners = events[type];
    
          if (typeof listeners === 'function') {
            this.removeListener(type, listeners);
          } else if (listeners) {
            // LIFO order
            for (i = listeners.length - 1; i >= 0; i--) {
              this.removeListener(type, listeners[i]);
            }
          }
    
          return this;
        };
    
    function _listeners(target, type, unwrap) {
      var events = target._events;
    
      if (!events)
        return [];
    
      var evlistener = events[type];
      if (!evlistener)
        return [];
    
      if (typeof evlistener === 'function')
        return unwrap ? [evlistener.listener || evlistener] : [evlistener];
    
      return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
    }
    
    EventEmitter.prototype.listeners = function listeners(type) {
      return _listeners(this, type, true);
    };
    
    EventEmitter.prototype.rawListeners = function rawListeners(type) {
      return _listeners(this, type, false);
    };
    
    EventEmitter.listenerCount = function(emitter, type) {
      if (typeof emitter.listenerCount === 'function') {
        return emitter.listenerCount(type);
      } else {
        return listenerCount.call(emitter, type);
      }
    };
    
    EventEmitter.prototype.listenerCount = listenerCount;
    function listenerCount(type) {
      var events = this._events;
    
      if (events) {
        var evlistener = events[type];
    
        if (typeof evlistener === 'function') {
          return 1;
        } else if (evlistener) {
          return evlistener.length;
        }
      }
    
      return 0;
    }
    
    EventEmitter.prototype.eventNames = function eventNames() {
      return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
    };
    
    // About 1.5x faster than the two-arg version of Array#splice().
    function spliceOne(list, index) {
      for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1)
        list[i] = list[k];
      list.pop();
    }
    
    function arrayClone(arr, n) {
      var copy = new Array(n);
      for (var i = 0; i < n; ++i)
        copy[i] = arr[i];
      return copy;
    }
    
    function unwrapListeners(arr) {
      var ret = new Array(arr.length);
      for (var i = 0; i < ret.length; ++i) {
        ret[i] = arr[i].listener || arr[i];
      }
      return ret;
    }
    
    function objectCreatePolyfill(proto) {
      var F = function() {};
      F.prototype = proto;
      return new F;
    }
    function objectKeysPolyfill(obj) {
      var keys = [];
      for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k)) {
        keys.push(k);
      }
      return k;
    }
    function functionBindPolyfill(context) {
      var fn = this;
      return function () {
        return fn.apply(context, arguments);
      };
    }
    
    },{}],3:[function(_dereq_,module,exports){
    (function (global){
    'use strict';
    var Mutation = global.MutationObserver || global.WebKitMutationObserver;
    
    var scheduleDrain;
    
    {
      if (Mutation) {
        var called = 0;
        var observer = new Mutation(nextTick);
        var element = global.document.createTextNode('');
        observer.observe(element, {
          characterData: true
        });
        scheduleDrain = function () {
          element.data = (called = ++called % 2);
        };
      } else if (!global.setImmediate && typeof global.MessageChannel !== 'undefined') {
        var channel = new global.MessageChannel();
        channel.port1.onmessage = nextTick;
        scheduleDrain = function () {
          channel.port2.postMessage(0);
        };
      } else if ('document' in global && 'onreadystatechange' in global.document.createElement('script')) {
        scheduleDrain = function () {
    
          // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
          // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
          var scriptEl = global.document.createElement('script');
          scriptEl.onreadystatechange = function () {
            nextTick();
    
            scriptEl.onreadystatechange = null;
            scriptEl.parentNode.removeChild(scriptEl);
            scriptEl = null;
          };
          global.document.documentElement.appendChild(scriptEl);
        };
      } else {
        scheduleDrain = function () {
          setTimeout(nextTick, 0);
        };
      }
    }
    
    var draining;
    var queue = [];
    //named nextTick for less confusing stack traces
    function nextTick() {
      draining = true;
      var i, oldQueue;
      var len = queue.length;
      while (len) {
        oldQueue = queue;
        queue = [];
        i = -1;
        while (++i < len) {
          oldQueue[i]();
        }
        len = queue.length;
      }
      draining = false;
    }
    
    module.exports = immediate;
    function immediate(task) {
      if (queue.push(task) === 1 && !draining) {
        scheduleDrain();
      }
    }
    
    }).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    },{}],4:[function(_dereq_,module,exports){
    if (typeof Object.create === 'function') {
      // implementation from standard node.js 'util' module
      module.exports = function inherits(ctor, superCtor) {
        ctor.super_ = superCtor
        ctor.prototype = Object.create(superCtor.prototype, {
          constructor: {
            value: ctor,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
      };
    } else {
      // old school shim for old browsers
      module.exports = function inherits(ctor, superCtor) {
        ctor.super_ = superCtor
        var TempCtor = function () {}
        TempCtor.prototype = superCtor.prototype
        ctor.prototype = new TempCtor()
        ctor.prototype.constructor = ctor
      }
    }
    
    },{}],5:[function(_dereq_,module,exports){
    (function (factory) {
        if (typeof exports === 'object') {
            // Node/CommonJS
            module.exports = factory();
        } else if (typeof define === 'function' && define.amd) {
            // AMD
            define(factory);
        } else {
            // Browser globals (with support for web workers)
            var glob;
    
            try {
                glob = window;
            } catch (e) {
                glob = self;
            }
    
            glob.SparkMD5 = factory();
        }
    }(function (undefined) {
    
        'use strict';
    
        /*
         * Fastest md5 implementation around (JKM md5).
         * Credits: Joseph Myers
         *
         * @see http://www.myersdaily.org/joseph/javascript/md5-text.html
         * @see http://jsperf.com/md5-shootout/7
         */
    
        /* this function is much faster,
          so if possible we use it. Some IEs
          are the only ones I know of that
          need the idiotic second function,
          generated by an if clause.  */
        var add32 = function (a, b) {
            return (a + b) & 0xFFFFFFFF;
        },
            hex_chr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
    
    
        function cmn(q, a, b, x, s, t) {
            a = add32(add32(a, q), add32(x, t));
            return add32((a << s) | (a >>> (32 - s)), b);
        }
    
        function md5cycle(x, k) {
            var a = x[0],
                b = x[1],
                c = x[2],
                d = x[3];
    
            a += (b & c | ~b & d) + k[0] - 680876936 | 0;
            a  = (a << 7 | a >>> 25) + b | 0;
            d += (a & b | ~a & c) + k[1] - 389564586 | 0;
            d  = (d << 12 | d >>> 20) + a | 0;
            c += (d & a | ~d & b) + k[2] + 606105819 | 0;
            c  = (c << 17 | c >>> 15) + d | 0;
            b += (c & d | ~c & a) + k[3] - 1044525330 | 0;
            b  = (b << 22 | b >>> 10) + c | 0;
            a += (b & c | ~b & d) + k[4] - 176418897 | 0;
            a  = (a << 7 | a >>> 25) + b | 0;
            d += (a & b | ~a & c) + k[5] + 1200080426 | 0;
            d  = (d << 12 | d >>> 20) + a | 0;
            c += (d & a | ~d & b) + k[6] - 1473231341 | 0;
            c  = (c << 17 | c >>> 15) + d | 0;
            b += (c & d | ~c & a) + k[7] - 45705983 | 0;
            b  = (b << 22 | b >>> 10) + c | 0;
            a += (b & c | ~b & d) + k[8] + 1770035416 | 0;
            a  = (a << 7 | a >>> 25) + b | 0;
            d += (a & b | ~a & c) + k[9] - 1958414417 | 0;
            d  = (d << 12 | d >>> 20) + a | 0;
            c += (d & a | ~d & b) + k[10] - 42063 | 0;
            c  = (c << 17 | c >>> 15) + d | 0;
            b += (c & d | ~c & a) + k[11] - 1990404162 | 0;
            b  = (b << 22 | b >>> 10) + c | 0;
            a += (b & c | ~b & d) + k[12] + 1804603682 | 0;
            a  = (a << 7 | a >>> 25) + b | 0;
            d += (a & b | ~a & c) + k[13] - 40341101 | 0;
            d  = (d << 12 | d >>> 20) + a | 0;
            c += (d & a | ~d & b) + k[14] - 1502002290 | 0;
            c  = (c << 17 | c >>> 15) + d | 0;
            b += (c & d | ~c & a) + k[15] + 1236535329 | 0;
            b  = (b << 22 | b >>> 10) + c | 0;
    
            a += (b & d | c & ~d) + k[1] - 165796510 | 0;
            a  = (a << 5 | a >>> 27) + b | 0;
            d += (a & c | b & ~c) + k[6] - 1069501632 | 0;
            d  = (d << 9 | d >>> 23) + a | 0;
            c += (d & b | a & ~b) + k[11] + 643717713 | 0;
            c  = (c << 14 | c >>> 18) + d | 0;
            b += (c & a | d & ~a) + k[0] - 373897302 | 0;
            b  = (b << 20 | b >>> 12) + c | 0;
            a += (b & d | c & ~d) + k[5] - 701558691 | 0;
            a  = (a << 5 | a >>> 27) + b | 0;
            d += (a & c | b & ~c) + k[10] + 38016083 | 0;
            d  = (d << 9 | d >>> 23) + a | 0;
            c += (d & b | a & ~b) + k[15] - 660478335 | 0;
            c  = (c << 14 | c >>> 18) + d | 0;
            b += (c & a | d & ~a) + k[4] - 405537848 | 0;
            b  = (b << 20 | b >>> 12) + c | 0;
            a += (b & d | c & ~d) + k[9] + 568446438 | 0;
            a  = (a << 5 | a >>> 27) + b | 0;
            d += (a & c | b & ~c) + k[14] - 1019803690 | 0;
            d  = (d << 9 | d >>> 23) + a | 0;
            c += (d & b | a & ~b) + k[3] - 187363961 | 0;
            c  = (c << 14 | c >>> 18) + d | 0;
            b += (c & a | d & ~a) + k[8] + 1163531501 | 0;
            b  = (b << 20 | b >>> 12) + c | 0;
            a += (b & d | c & ~d) + k[13] - 1444681467 | 0;
            a  = (a << 5 | a >>> 27) + b | 0;
            d += (a & c | b & ~c) + k[2] - 51403784 | 0;
            d  = (d << 9 | d >>> 23) + a | 0;
            c += (d & b | a & ~b) + k[7] + 1735328473 | 0;
            c  = (c << 14 | c >>> 18) + d | 0;
            b += (c & a | d & ~a) + k[12] - 1926607734 | 0;
            b  = (b << 20 | b >>> 12) + c | 0;
    
            a += (b ^ c ^ d) + k[5] - 378558 | 0;
            a  = (a << 4 | a >>> 28) + b | 0;
            d += (a ^ b ^ c) + k[8] - 2022574463 | 0;
            d  = (d << 11 | d >>> 21) + a | 0;
            c += (d ^ a ^ b) + k[11] + 1839030562 | 0;
            c  = (c << 16 | c >>> 16) + d | 0;
            b += (c ^ d ^ a) + k[14] - 35309556 | 0;
            b  = (b << 23 | b >>> 9) + c | 0;
            a += (b ^ c ^ d) + k[1] - 1530992060 | 0;
            a  = (a << 4 | a >>> 28) + b | 0;
            d += (a ^ b ^ c) + k[4] + 1272893353 | 0;
            d  = (d << 11 | d >>> 21) + a | 0;
            c += (d ^ a ^ b) + k[7] - 155497632 | 0;
            c  = (c << 16 | c >>> 16) + d | 0;
            b += (c ^ d ^ a) + k[10] - 1094730640 | 0;
            b  = (b << 23 | b >>> 9) + c | 0;
            a += (b ^ c ^ d) + k[13] + 681279174 | 0;
            a  = (a << 4 | a >>> 28) + b | 0;
            d += (a ^ b ^ c) + k[0] - 358537222 | 0;
            d  = (d << 11 | d >>> 21) + a | 0;
            c += (d ^ a ^ b) + k[3] - 722521979 | 0;
            c  = (c << 16 | c >>> 16) + d | 0;
            b += (c ^ d ^ a) + k[6] + 76029189 | 0;
            b  = (b << 23 | b >>> 9) + c | 0;
            a += (b ^ c ^ d) + k[9] - 640364487 | 0;
            a  = (a << 4 | a >>> 28) + b | 0;
            d += (a ^ b ^ c) + k[12] - 421815835 | 0;
            d  = (d << 11 | d >>> 21) + a | 0;
            c += (d ^ a ^ b) + k[15] + 530742520 | 0;
            c  = (c << 16 | c >>> 16) + d | 0;
            b += (c ^ d ^ a) + k[2] - 995338651 | 0;
            b  = (b << 23 | b >>> 9) + c | 0;
    
            a += (c ^ (b | ~d)) + k[0] - 198630844 | 0;
            a  = (a << 6 | a >>> 26) + b | 0;
            d += (b ^ (a | ~c)) + k[7] + 1126891415 | 0;
            d  = (d << 10 | d >>> 22) + a | 0;
            c += (a ^ (d | ~b)) + k[14] - 1416354905 | 0;
            c  = (c << 15 | c >>> 17) + d | 0;
            b += (d ^ (c | ~a)) + k[5] - 57434055 | 0;
            b  = (b << 21 |b >>> 11) + c | 0;
            a += (c ^ (b | ~d)) + k[12] + 1700485571 | 0;
            a  = (a << 6 | a >>> 26) + b | 0;
            d += (b ^ (a | ~c)) + k[3] - 1894986606 | 0;
            d  = (d << 10 | d >>> 22) + a | 0;
            c += (a ^ (d | ~b)) + k[10] - 1051523 | 0;
            c  = (c << 15 | c >>> 17) + d | 0;
            b += (d ^ (c | ~a)) + k[1] - 2054922799 | 0;
            b  = (b << 21 |b >>> 11) + c | 0;
            a += (c ^ (b | ~d)) + k[8] + 1873313359 | 0;
            a  = (a << 6 | a >>> 26) + b | 0;
            d += (b ^ (a | ~c)) + k[15] - 30611744 | 0;
            d  = (d << 10 | d >>> 22) + a | 0;
            c += (a ^ (d | ~b)) + k[6] - 1560198380 | 0;
            c  = (c << 15 | c >>> 17) + d | 0;
            b += (d ^ (c | ~a)) + k[13] + 1309151649 | 0;
            b  = (b << 21 |b >>> 11) + c | 0;
            a += (c ^ (b | ~d)) + k[4] - 145523070 | 0;
            a  = (a << 6 | a >>> 26) + b | 0;
            d += (b ^ (a | ~c)) + k[11] - 1120210379 | 0;
            d  = (d << 10 | d >>> 22) + a | 0;
            c += (a ^ (d | ~b)) + k[2] + 718787259 | 0;
            c  = (c << 15 | c >>> 17) + d | 0;
            b += (d ^ (c | ~a)) + k[9] - 343485551 | 0;
            b  = (b << 21 | b >>> 11) + c | 0;
    
            x[0] = a + x[0] | 0;
            x[1] = b + x[1] | 0;
            x[2] = c + x[2] | 0;
            x[3] = d + x[3] | 0;
        }
    
        function md5blk(s) {
            var md5blks = [],
                i; /* Andy King said do it this way. */
    
            for (i = 0; i < 64; i += 4) {
                md5blks[i >> 2] = s.charCodeAt(i) + (s.charCodeAt(i + 1) << 8) + (s.charCodeAt(i + 2) << 16) + (s.charCodeAt(i + 3) << 24);
            }
            return md5blks;
        }
    
        function md5blk_array(a) {
            var md5blks = [],
                i; /* Andy King said do it this way. */
    
            for (i = 0; i < 64; i += 4) {
                md5blks[i >> 2] = a[i] + (a[i + 1] << 8) + (a[i + 2] << 16) + (a[i + 3] << 24);
            }
            return md5blks;
        }
    
        function md51(s) {
            var n = s.length,
                state = [1732584193, -271733879, -1732584194, 271733878],
                i,
                length,
                tail,
                tmp,
                lo,
                hi;
    
            for (i = 64; i <= n; i += 64) {
                md5cycle(state, md5blk(s.substring(i - 64, i)));
            }
            s = s.substring(i - 64);
            length = s.length;
            tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            for (i = 0; i < length; i += 1) {
                tail[i >> 2] |= s.charCodeAt(i) << ((i % 4) << 3);
            }
            tail[i >> 2] |= 0x80 << ((i % 4) << 3);
            if (i > 55) {
                md5cycle(state, tail);
                for (i = 0; i < 16; i += 1) {
                    tail[i] = 0;
                }
            }
    
            // Beware that the final length might not fit in 32 bits so we take care of that
            tmp = n * 8;
            tmp = tmp.toString(16).match(/(.*?)(.{0,8})$/);
            lo = parseInt(tmp[2], 16);
            hi = parseInt(tmp[1], 16) || 0;
    
            tail[14] = lo;
            tail[15] = hi;
    
            md5cycle(state, tail);
            return state;
        }
    
        function md51_array(a) {
            var n = a.length,
                state = [1732584193, -271733879, -1732584194, 271733878],
                i,
                length,
                tail,
                tmp,
                lo,
                hi;
    
            for (i = 64; i <= n; i += 64) {
                md5cycle(state, md5blk_array(a.subarray(i - 64, i)));
            }
    
            // Not sure if it is a bug, however IE10 will always produce a sub array of length 1
            // containing the last element of the parent array if the sub array specified starts
            // beyond the length of the parent array - weird.
            // https://connect.microsoft.com/IE/feedback/details/771452/typed-array-subarray-issue
            a = (i - 64) < n ? a.subarray(i - 64) : new Uint8Array(0);
    
            length = a.length;
            tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            for (i = 0; i < length; i += 1) {
                tail[i >> 2] |= a[i] << ((i % 4) << 3);
            }
    
            tail[i >> 2] |= 0x80 << ((i % 4) << 3);
            if (i > 55) {
                md5cycle(state, tail);
                for (i = 0; i < 16; i += 1) {
                    tail[i] = 0;
                }
            }
    
            // Beware that the final length might not fit in 32 bits so we take care of that
            tmp = n * 8;
            tmp = tmp.toString(16).match(/(.*?)(.{0,8})$/);
            lo = parseInt(tmp[2], 16);
            hi = parseInt(tmp[1], 16) || 0;
    
            tail[14] = lo;
            tail[15] = hi;
    
            md5cycle(state, tail);
    
            return state;
        }
    
        function rhex(n) {
            var s = '',
                j;
            for (j = 0; j < 4; j += 1) {
                s += hex_chr[(n >> (j * 8 + 4)) & 0x0F] + hex_chr[(n >> (j * 8)) & 0x0F];
            }
            return s;
        }
    
        function hex(x) {
            var i;
            for (i = 0; i < x.length; i += 1) {
                x[i] = rhex(x[i]);
            }
            return x.join('');
        }
    
        // In some cases the fast add32 function cannot be used..
        if (hex(md51('hello')) !== '5d41402abc4b2a76b9719d911017c592') {
            add32 = function (x, y) {
                var lsw = (x & 0xFFFF) + (y & 0xFFFF),
                    msw = (x >> 16) + (y >> 16) + (lsw >> 16);
                return (msw << 16) | (lsw & 0xFFFF);
            };
        }
    
        // ---------------------------------------------------
    
        /**
         * ArrayBuffer slice polyfill.
         *
         * @see https://github.com/ttaubert/node-arraybuffer-slice
         */
    
        if (typeof ArrayBuffer !== 'undefined' && !ArrayBuffer.prototype.slice) {
            (function () {
                function clamp(val, length) {
                    val = (val | 0) || 0;
    
                    if (val < 0) {
                        return Math.max(val + length, 0);
                    }
    
                    return Math.min(val, length);
                }
    
                ArrayBuffer.prototype.slice = function (from, to) {
                    var length = this.byteLength,
                        begin = clamp(from, length),
                        end = length,
                        num,
                        target,
                        targetArray,
                        sourceArray;
    
                    if (to !== undefined) {
                        end = clamp(to, length);
                    }
    
                    if (begin > end) {
                        return new ArrayBuffer(0);
                    }
    
                    num = end - begin;
                    target = new ArrayBuffer(num);
                    targetArray = new Uint8Array(target);
    
                    sourceArray = new Uint8Array(this, begin, num);
                    targetArray.set(sourceArray);
    
                    return target;
                };
            })();
        }
    
        // ---------------------------------------------------
    
        /**
         * Helpers.
         */
    
        function toUtf8(str) {
            if (/[\u0080-\uFFFF]/.test(str)) {
                str = unescape(encodeURIComponent(str));
            }
    
            return str;
        }
    
        function utf8Str2ArrayBuffer(str, returnUInt8Array) {
            var length = str.length,
               buff = new ArrayBuffer(length),
               arr = new Uint8Array(buff),
               i;
    
            for (i = 0; i < length; i += 1) {
                arr[i] = str.charCodeAt(i);
            }
    
            return returnUInt8Array ? arr : buff;
        }
    
        function arrayBuffer2Utf8Str(buff) {
            return String.fromCharCode.apply(null, new Uint8Array(buff));
        }
    
        function concatenateArrayBuffers(first, second, returnUInt8Array) {
            var result = new Uint8Array(first.byteLength + second.byteLength);
    
            result.set(new Uint8Array(first));
            result.set(new Uint8Array(second), first.byteLength);
    
            return returnUInt8Array ? result : result.buffer;
        }
    
        function hexToBinaryString(hex) {
            var bytes = [],
                length = hex.length,
                x;
    
            for (x = 0; x < length - 1; x += 2) {
                bytes.push(parseInt(hex.substr(x, 2), 16));
            }
    
            return String.fromCharCode.apply(String, bytes);
        }
    
        // ---------------------------------------------------
    
        /**
         * SparkMD5 OOP implementation.
         *
         * Use this class to perform an incremental md5, otherwise use the
         * static methods instead.
         */
    
        function SparkMD5() {
            // call reset to init the instance
            this.reset();
        }
    
        /**
         * Appends a string.
         * A conversion will be applied if an utf8 string is detected.
         *
         * @param {String} str The string to be appended
         *
         * @return {SparkMD5} The instance itself
         */
        SparkMD5.prototype.append = function (str) {
            // Converts the string to utf8 bytes if necessary
            // Then append as binary
            this.appendBinary(toUtf8(str));
    
            return this;
        };
    
        /**
         * Appends a binary string.
         *
         * @param {String} contents The binary string to be appended
         *
         * @return {SparkMD5} The instance itself
         */
        SparkMD5.prototype.appendBinary = function (contents) {
            this._buff += contents;
            this._length += contents.length;
    
            var length = this._buff.length,
                i;
    
            for (i = 64; i <= length; i += 64) {
                md5cycle(this._hash, md5blk(this._buff.substring(i - 64, i)));
            }
    
            this._buff = this._buff.substring(i - 64);
    
            return this;
        };
    
        /**
         * Finishes the incremental computation, reseting the internal state and
         * returning the result.
         *
         * @param {Boolean} raw True to get the raw string, false to get the hex string
         *
         * @return {String} The result
         */
        SparkMD5.prototype.end = function (raw) {
            var buff = this._buff,
                length = buff.length,
                i,
                tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                ret;
    
            for (i = 0; i < length; i += 1) {
                tail[i >> 2] |= buff.charCodeAt(i) << ((i % 4) << 3);
            }
    
            this._finish(tail, length);
            ret = hex(this._hash);
    
            if (raw) {
                ret = hexToBinaryString(ret);
            }
    
            this.reset();
    
            return ret;
        };
    
        /**
         * Resets the internal state of the computation.
         *
         * @return {SparkMD5} The instance itself
         */
        SparkMD5.prototype.reset = function () {
            this._buff = '';
            this._length = 0;
            this._hash = [1732584193, -271733879, -1732584194, 271733878];
    
            return this;
        };
    
        /**
         * Gets the internal state of the computation.
         *
         * @return {Object} The state
         */
        SparkMD5.prototype.getState = function () {
            return {
                buff: this._buff,
                length: this._length,
                hash: this._hash
            };
        };
    
        /**
         * Gets the internal state of the computation.
         *
         * @param {Object} state The state
         *
         * @return {SparkMD5} The instance itself
         */
        SparkMD5.prototype.setState = function (state) {
            this._buff = state.buff;
            this._length = state.length;
            this._hash = state.hash;
    
            return this;
        };
    
        /**
         * Releases memory used by the incremental buffer and other additional
         * resources. If you plan to use the instance again, use reset instead.
         */
        SparkMD5.prototype.destroy = function () {
            delete this._hash;
            delete this._buff;
            delete this._length;
        };
    
        /**
         * Finish the final calculation based on the tail.
         *
         * @param {Array}  tail   The tail (will be modified)
         * @param {Number} length The length of the remaining buffer
         */
        SparkMD5.prototype._finish = function (tail, length) {
            var i = length,
                tmp,
                lo,
                hi;
    
            tail[i >> 2] |= 0x80 << ((i % 4) << 3);
            if (i > 55) {
                md5cycle(this._hash, tail);
                for (i = 0; i < 16; i += 1) {
                    tail[i] = 0;
                }
            }
    
            // Do the final computation based on the tail and length
            // Beware that the final length may not fit in 32 bits so we take care of that
            tmp = this._length * 8;
            tmp = tmp.toString(16).match(/(.*?)(.{0,8})$/);
            lo = parseInt(tmp[2], 16);
            hi = parseInt(tmp[1], 16) || 0;
    
            tail[14] = lo;
            tail[15] = hi;
            md5cycle(this._hash, tail);
        };
    
        /**
         * Performs the md5 hash on a string.
         * A conversion will be applied if utf8 string is detected.
         *
         * @param {String}  str The string
         * @param {Boolean} raw True to get the raw string, false to get the hex string
         *
         * @return {String} The result
         */
        SparkMD5.hash = function (str, raw) {
            // Converts the string to utf8 bytes if necessary
            // Then compute it using the binary function
            return SparkMD5.hashBinary(toUtf8(str), raw);
        };
    
        /**
         * Performs the md5 hash on a binary string.
         *
         * @param {String}  content The binary string
         * @param {Boolean} raw     True to get the raw string, false to get the hex string
         *
         * @return {String} The result
         */
        SparkMD5.hashBinary = function (content, raw) {
            var hash = md51(content),
                ret = hex(hash);
    
            return raw ? hexToBinaryString(ret) : ret;
        };
    
        // ---------------------------------------------------
    
        /**
         * SparkMD5 OOP implementation for array buffers.
         *
         * Use this class to perform an incremental md5 ONLY for array buffers.
         */
        SparkMD5.ArrayBuffer = function () {
            // call reset to init the instance
            this.reset();
        };
    
        /**
         * Appends an array buffer.
         *
         * @param {ArrayBuffer} arr The array to be appended
         *
         * @return {SparkMD5.ArrayBuffer} The instance itself
         */
        SparkMD5.ArrayBuffer.prototype.append = function (arr) {
            var buff = concatenateArrayBuffers(this._buff.buffer, arr, true),
                length = buff.length,
                i;
    
            this._length += arr.byteLength;
    
            for (i = 64; i <= length; i += 64) {
                md5cycle(this._hash, md5blk_array(buff.subarray(i - 64, i)));
            }
    
            this._buff = (i - 64) < length ? new Uint8Array(buff.buffer.slice(i - 64)) : new Uint8Array(0);
    
            return this;
        };
    
        /**
         * Finishes the incremental computation, reseting the internal state and
         * returning the result.
         *
         * @param {Boolean} raw True to get the raw string, false to get the hex string
         *
         * @return {String} The result
         */
        SparkMD5.ArrayBuffer.prototype.end = function (raw) {
            var buff = this._buff,
                length = buff.length,
                tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                i,
                ret;
    
            for (i = 0; i < length; i += 1) {
                tail[i >> 2] |= buff[i] << ((i % 4) << 3);
            }
    
            this._finish(tail, length);
            ret = hex(this._hash);
    
            if (raw) {
                ret = hexToBinaryString(ret);
            }
    
            this.reset();
    
            return ret;
        };
    
        /**
         * Resets the internal state of the computation.
         *
         * @return {SparkMD5.ArrayBuffer} The instance itself
         */
        SparkMD5.ArrayBuffer.prototype.reset = function () {
            this._buff = new Uint8Array(0);
            this._length = 0;
            this._hash = [1732584193, -271733879, -1732584194, 271733878];
    
            return this;
        };
    
        /**
         * Gets the internal state of the computation.
         *
         * @return {Object} The state
         */
        SparkMD5.ArrayBuffer.prototype.getState = function () {
            var state = SparkMD5.prototype.getState.call(this);
    
            // Convert buffer to a string
            state.buff = arrayBuffer2Utf8Str(state.buff);
    
            return state;
        };
    
        /**
         * Gets the internal state of the computation.
         *
         * @param {Object} state The state
         *
         * @return {SparkMD5.ArrayBuffer} The instance itself
         */
        SparkMD5.ArrayBuffer.prototype.setState = function (state) {
            // Convert string to buffer
            state.buff = utf8Str2ArrayBuffer(state.buff, true);
    
            return SparkMD5.prototype.setState.call(this, state);
        };
    
        SparkMD5.ArrayBuffer.prototype.destroy = SparkMD5.prototype.destroy;
    
        SparkMD5.ArrayBuffer.prototype._finish = SparkMD5.prototype._finish;
    
        /**
         * Performs the md5 hash on an array buffer.
         *
         * @param {ArrayBuffer} arr The array buffer
         * @param {Boolean}     raw True to get the raw string, false to get the hex one
         *
         * @return {String} The result
         */
        SparkMD5.ArrayBuffer.hash = function (arr, raw) {
            var hash = md51_array(new Uint8Array(arr)),
                ret = hex(hash);
    
            return raw ? hexToBinaryString(ret) : ret;
        };
    
        return SparkMD5;
    }));
    
    },{}],6:[function(_dereq_,module,exports){
    var v1 = _dereq_(9);
    var v4 = _dereq_(10);
    
    var uuid = v4;
    uuid.v1 = v1;
    uuid.v4 = v4;
    
    module.exports = uuid;
    
    },{"10":10,"9":9}],7:[function(_dereq_,module,exports){
    /**
     * Convert array of 16 byte values to UUID string format of the form:
     * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
     */
    var byteToHex = [];
    for (var i = 0; i < 256; ++i) {
      byteToHex[i] = (i + 0x100).toString(16).substr(1);
    }
    
    function bytesToUuid(buf, offset) {
      var i = offset || 0;
      var bth = byteToHex;
      return bth[buf[i++]] + bth[buf[i++]] +
              bth[buf[i++]] + bth[buf[i++]] + '-' +
              bth[buf[i++]] + bth[buf[i++]] + '-' +
              bth[buf[i++]] + bth[buf[i++]] + '-' +
              bth[buf[i++]] + bth[buf[i++]] + '-' +
              bth[buf[i++]] + bth[buf[i++]] +
              bth[buf[i++]] + bth[buf[i++]] +
              bth[buf[i++]] + bth[buf[i++]];
    }
    
    module.exports = bytesToUuid;
    
    },{}],8:[function(_dereq_,module,exports){
    // Unique ID creation requires a high quality random # generator.  In the
    // browser this is a little complicated due to unknown quality of Math.random()
    // and inconsistent support for the `crypto` API.  We do the best we can via
    // feature-detection
    
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
    var getRandomValues = (typeof(crypto) != 'undefined' && crypto.getRandomValues.bind(crypto)) ||
                          (typeof(msCrypto) != 'undefined' && msCrypto.getRandomValues.bind(msCrypto));
    if (getRandomValues) {
      // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
      var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef
    
      module.exports = function whatwgRNG() {
        getRandomValues(rnds8);
        return rnds8;
      };
    } else {
      // Math.random()-based (RNG)
      //
      // If all else fails, use Math.random().  It's fast, but is of unspecified
      // quality.
      var rnds = new Array(16);
    
      module.exports = function mathRNG() {
        for (var i = 0, r; i < 16; i++) {
          if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
          rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
        }
    
        return rnds;
      };
    }
    
    },{}],9:[function(_dereq_,module,exports){
    var rng = _dereq_(8);
    var bytesToUuid = _dereq_(7);
    
    // **`v1()` - Generate time-based UUID**
    //
    // Inspired by https://github.com/LiosK/UUID.js
    // and http://docs.python.org/library/uuid.html
    
    var _nodeId;
    var _clockseq;
    
    // Previous uuid creation time
    var _lastMSecs = 0;
    var _lastNSecs = 0;
    
    // See https://github.com/broofa/node-uuid for API details
    function v1(options, buf, offset) {
      var i = buf && offset || 0;
      var b = buf || [];
    
      options = options || {};
      var node = options.node || _nodeId;
      var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;
    
      // node and clockseq need to be initialized to random values if they're not
      // specified.  We do this lazily to minimize issues related to insufficient
      // system entropy.  See #189
      if (node == null || clockseq == null) {
        var seedBytes = rng();
        if (node == null) {
          // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
          node = _nodeId = [
            seedBytes[0] | 0x01,
            seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]
          ];
        }
        if (clockseq == null) {
          // Per 4.2.2, randomize (14 bit) clockseq
          clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
        }
      }
    
      // UUID timestamps are 100 nano-second units since the Gregorian epoch,
      // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
      // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
      // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
      var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();
    
      // Per 4.2.1.2, use count of uuid's generated during the current clock
      // cycle to simulate higher resolution clock
      var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;
    
      // Time since last uuid creation (in msecs)
      var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;
    
      // Per 4.2.1.2, Bump clockseq on clock regression
      if (dt < 0 && options.clockseq === undefined) {
        clockseq = clockseq + 1 & 0x3fff;
      }
    
      // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
      // time interval
      if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
        nsecs = 0;
      }
    
      // Per 4.2.1.2 Throw error if too many uuids are requested
      if (nsecs >= 10000) {
        throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
      }
    
      _lastMSecs = msecs;
      _lastNSecs = nsecs;
      _clockseq = clockseq;
    
      // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
      msecs += 12219292800000;
    
      // `time_low`
      var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
      b[i++] = tl >>> 24 & 0xff;
      b[i++] = tl >>> 16 & 0xff;
      b[i++] = tl >>> 8 & 0xff;
      b[i++] = tl & 0xff;
    
      // `time_mid`
      var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
      b[i++] = tmh >>> 8 & 0xff;
      b[i++] = tmh & 0xff;
    
      // `time_high_and_version`
      b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
      b[i++] = tmh >>> 16 & 0xff;
    
      // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
      b[i++] = clockseq >>> 8 | 0x80;
    
      // `clock_seq_low`
      b[i++] = clockseq & 0xff;
    
      // `node`
      for (var n = 0; n < 6; ++n) {
        b[i + n] = node[n];
      }
    
      return buf ? buf : bytesToUuid(b);
    }
    
    module.exports = v1;
    
    },{"7":7,"8":8}],10:[function(_dereq_,module,exports){
    var rng = _dereq_(8);
    var bytesToUuid = _dereq_(7);
    
    function v4(options, buf, offset) {
      var i = buf && offset || 0;
    
      if (typeof(options) == 'string') {
        buf = options === 'binary' ? new Array(16) : null;
        options = null;
      }
      options = options || {};
    
      var rnds = options.random || (options.rng || rng)();
    
      // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
      rnds[6] = (rnds[6] & 0x0f) | 0x40;
      rnds[8] = (rnds[8] & 0x3f) | 0x80;
    
      // Copy bytes to buffer, if provided
      if (buf) {
        for (var ii = 0; ii < 16; ++ii) {
          buf[i + ii] = rnds[ii];
        }
      }
    
      return buf || bytesToUuid(rnds);
    }
    
    module.exports = v4;
    
    },{"7":7,"8":8}],11:[function(_dereq_,module,exports){
    (function (global){
    'use strict';
    
    function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }
    
    var getArguments = _interopDefault(_dereq_(1));
    var nextTick = _interopDefault(_dereq_(3));
    var events = _dereq_(2);
    var inherits = _interopDefault(_dereq_(4));
    var Md5 = _interopDefault(_dereq_(5));
    var uuidV4 = _interopDefault(_dereq_(6));
    
    function isBinaryObject(object) {
      return (typeof ArrayBuffer !== 'undefined' && object instanceof ArrayBuffer) ||
        (typeof Blob !== 'undefined' && object instanceof Blob);
    }
    
    function cloneArrayBuffer(buff) {
      if (typeof buff.slice === 'function') {
        return buff.slice(0);
      }
      // IE10-11 slice() polyfill
      var target = new ArrayBuffer(buff.byteLength);
      var targetArray = new Uint8Array(target);
      var sourceArray = new Uint8Array(buff);
      targetArray.set(sourceArray);
      return target;
    }
    
    function cloneBinaryObject(object) {
      if (object instanceof ArrayBuffer) {
        return cloneArrayBuffer(object);
      }
      var size = object.size;
      var type = object.type;
      // Blob
      if (typeof object.slice === 'function') {
        return object.slice(0, size, type);
      }
      // PhantomJS slice() replacement
      return object.webkitSlice(0, size, type);
    }
    
    // most of this is borrowed from lodash.isPlainObject:
    // https://github.com/fis-components/lodash.isplainobject/
    // blob/29c358140a74f252aeb08c9eb28bef86f2217d4a/index.js
    
    var funcToString = Function.prototype.toString;
    var objectCtorString = funcToString.call(Object);
    
    function isPlainObject(value) {
      var proto = Object.getPrototypeOf(value);
      /* istanbul ignore if */
      if (proto === null) { // not sure when this happens, but I guess it can
        return true;
      }
      var Ctor = proto.constructor;
      return (typeof Ctor == 'function' &&
        Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString);
    }
    
    function clone(object) {
      var newObject;
      var i;
      var len;
    
      if (!object || typeof object !== 'object') {
        return object;
      }
    
      if (Array.isArray(object)) {
        newObject = [];
        for (i = 0, len = object.length; i < len; i++) {
          newObject[i] = clone(object[i]);
        }
        return newObject;
      }
    
      // special case: to avoid inconsistencies between IndexedDB
      // and other backends, we automatically stringify Dates
      if (object instanceof Date) {
        return object.toISOString();
      }
    
      if (isBinaryObject(object)) {
        return cloneBinaryObject(object);
      }
    
      if (!isPlainObject(object)) {
        return object; // don't clone objects like Workers
      }
    
      newObject = {};
      for (i in object) {
        /* istanbul ignore else */
        if (Object.prototype.hasOwnProperty.call(object, i)) {
          var value = clone(object[i]);
          if (typeof value !== 'undefined') {
            newObject[i] = value;
          }
        }
      }
      return newObject;
    }
    
    function once(fun) {
      var called = false;
      return getArguments(function (args) {
        /* istanbul ignore if */
        if (called) {
          // this is a smoke test and should never actually happen
          throw new Error('once called more than once');
        } else {
          called = true;
          fun.apply(this, args);
        }
      });
    }
    
    function toPromise(func) {
      //create the function we will be returning
      return getArguments(function (args) {
        // Clone arguments
        args = clone(args);
        var self = this;
        // if the last argument is a function, assume its a callback
        var usedCB = (typeof args[args.length - 1] === 'function') ? args.pop() : false;
        var promise = new Promise(function (fulfill, reject) {
          var resp;
          try {
            var callback = once(function (err, mesg) {
              if (err) {
                reject(err);
              } else {
                fulfill(mesg);
              }
            });
            // create a callback for this invocation
            // apply the function in the orig context
            args.push(callback);
            resp = func.apply(self, args);
            if (resp && typeof resp.then === 'function') {
              fulfill(resp);
            }
          } catch (e) {
            reject(e);
          }
        });
        // if there is a callback, call it back
        if (usedCB) {
          promise.then(function (result) {
            usedCB(null, result);
          }, usedCB);
        }
        return promise;
      });
    }
    
    function mangle(key) {
      return '$' + key;
    }
    function unmangle(key) {
      return key.substring(1);
    }
    function Map$1() {
      this._store = {};
    }
    Map$1.prototype.get = function (key) {
      var mangled = mangle(key);
      return this._store[mangled];
    };
    Map$1.prototype.set = function (key, value) {
      var mangled = mangle(key);
      this._store[mangled] = value;
      return true;
    };
    Map$1.prototype.has = function (key) {
      var mangled = mangle(key);
      return mangled in this._store;
    };
    Map$1.prototype["delete"] = function (key) {
      var mangled = mangle(key);
      var res = mangled in this._store;
      delete this._store[mangled];
      return res;
    };
    Map$1.prototype.forEach = function (cb) {
      var keys = Object.keys(this._store);
      for (var i = 0, len = keys.length; i < len; i++) {
        var key = keys[i];
        var value = this._store[key];
        key = unmangle(key);
        cb(value, key);
      }
    };
    Object.defineProperty(Map$1.prototype, 'size', {
      get: function () {
        return Object.keys(this._store).length;
      }
    });
    
    function Set$1(array) {
      this._store = new Map$1();
    
      // init with an array
      if (array && Array.isArray(array)) {
        for (var i = 0, len = array.length; i < len; i++) {
          this.add(array[i]);
        }
      }
    }
    Set$1.prototype.add = function (key) {
      return this._store.set(key, true);
    };
    Set$1.prototype.has = function (key) {
      return this._store.has(key);
    };
    Set$1.prototype.forEach = function (cb) {
      this._store.forEach(function (value, key) {
        cb(key);
      });
    };
    Object.defineProperty(Set$1.prototype, 'size', {
      get: function () {
        return this._store.size;
      }
    });
    
    /* global Map,Set,Symbol */
    // Based on https://kangax.github.io/compat-table/es6/ we can sniff out
    // incomplete Map/Set implementations which would otherwise cause our tests to fail.
    // Notably they fail in IE11 and iOS 8.4, which this prevents.
    function supportsMapAndSet() {
      if (typeof Symbol === 'undefined' || typeof Map === 'undefined' || typeof Set === 'undefined') {
        return false;
      }
      var prop = Object.getOwnPropertyDescriptor(Map, Symbol.species);
      return prop && 'get' in prop && Map[Symbol.species] === Map;
    }
    
    // based on https://github.com/montagejs/collections
    
    var ExportedSet;
    var ExportedMap;
    
    {
      if (supportsMapAndSet()) { // prefer built-in Map/Set
        ExportedSet = Set;
        ExportedMap = Map;
      } else { // fall back to our polyfill
        ExportedSet = Set$1;
        ExportedMap = Map$1;
      }
    }
    
    // like underscore/lodash _.pick()
    function pick(obj, arr) {
      var res = {};
      for (var i = 0, len = arr.length; i < len; i++) {
        var prop = arr[i];
        if (prop in obj) {
          res[prop] = obj[prop];
        }
      }
      return res;
    }
    
    var hasLocal;
    
    try {
      localStorage.setItem('_pouch_check_localstorage', 1);
      hasLocal = !!localStorage.getItem('_pouch_check_localstorage');
    } catch (e) {
      hasLocal = false;
    }
    
    function hasLocalStorage() {
      return hasLocal;
    }
    
    // Custom nextTick() shim for browsers. In node, this will just be process.nextTick(). We
    
    inherits(Changes, events.EventEmitter);
    
    /* istanbul ignore next */
    function attachBrowserEvents(self) {
      if (hasLocalStorage()) {
        addEventListener("storage", function (e) {
          self.emit(e.key);
        });
      }
    }
    
    function Changes() {
      events.EventEmitter.call(this);
      this._listeners = {};
    
      attachBrowserEvents(this);
    }
    Changes.prototype.addListener = function (dbName, id, db, opts) {
      /* istanbul ignore if */
      if (this._listeners[id]) {
        return;
      }
      var self = this;
      var inprogress = false;
      function eventFunction() {
        /* istanbul ignore if */
        if (!self._listeners[id]) {
          return;
        }
        if (inprogress) {
          inprogress = 'waiting';
          return;
        }
        inprogress = true;
        var changesOpts = pick(opts, [
          'style', 'include_docs', 'attachments', 'conflicts', 'filter',
          'doc_ids', 'view', 'since', 'query_params', 'binary', 'return_docs'
        ]);
    
        /* istanbul ignore next */
        function onError() {
          inprogress = false;
        }
    
        db.changes(changesOpts).on('change', function (c) {
          if (c.seq > opts.since && !opts.cancelled) {
            opts.since = c.seq;
            opts.onChange(c);
          }
        }).on('complete', function () {
          if (inprogress === 'waiting') {
            nextTick(eventFunction);
          }
          inprogress = false;
        }).on('error', onError);
      }
      this._listeners[id] = eventFunction;
      this.on(dbName, eventFunction);
    };
    
    Changes.prototype.removeListener = function (dbName, id) {
      /* istanbul ignore if */
      if (!(id in this._listeners)) {
        return;
      }
      events.EventEmitter.prototype.removeListener.call(this, dbName,
        this._listeners[id]);
      delete this._listeners[id];
    };
    
    
    /* istanbul ignore next */
    Changes.prototype.notifyLocalWindows = function (dbName) {
      //do a useless change on a storage thing
      //in order to get other windows's listeners to activate
      if (hasLocalStorage()) {
        localStorage[dbName] = (localStorage[dbName] === "a") ? "b" : "a";
      }
    };
    
    Changes.prototype.notify = function (dbName) {
      this.emit(dbName);
      this.notifyLocalWindows(dbName);
    };
    
    function guardedConsole(method) {
      /* istanbul ignore else */
      if (typeof console !== 'undefined' && typeof console[method] === 'function') {
        var args = Array.prototype.slice.call(arguments, 1);
        console[method].apply(console, args);
      }
    }
    
    var assign;
    {
      if (typeof Object.assign === 'function') {
        assign = Object.assign;
      } else {
        // lite Object.assign polyfill based on
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
        assign = function (target) {
          var to = Object(target);
    
          for (var index = 1; index < arguments.length; index++) {
            var nextSource = arguments[index];
    
            if (nextSource != null) { // Skip over if undefined or null
              for (var nextKey in nextSource) {
                // Avoid bugs when hasOwnProperty is shadowed
                if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                  to[nextKey] = nextSource[nextKey];
                }
              }
            }
          }
          return to;
        };
      }
    }
    
    var $inject_Object_assign = assign;
    
    inherits(PouchError, Error);
    
    function PouchError(status, error, reason) {
      Error.call(this, reason);
      this.status = status;
      this.name = error;
      this.message = reason;
      this.error = true;
    }
    
    PouchError.prototype.toString = function () {
      return JSON.stringify({
        status: this.status,
        name: this.name,
        message: this.message,
        reason: this.reason
      });
    };
    
    var UNAUTHORIZED = new PouchError(401, 'unauthorized', "Name or password is incorrect.");
    var MISSING_BULK_DOCS = new PouchError(400, 'bad_request', "Missing JSON list of 'docs'");
    var MISSING_DOC = new PouchError(404, 'not_found', 'missing');
    var REV_CONFLICT = new PouchError(409, 'conflict', 'Document update conflict');
    var INVALID_ID = new PouchError(400, 'bad_request', '_id field must contain a string');
    var MISSING_ID = new PouchError(412, 'missing_id', '_id is required for puts');
    var RESERVED_ID = new PouchError(400, 'bad_request', 'Only reserved document ids may start with underscore.');
    var NOT_OPEN = new PouchError(412, 'precondition_failed', 'Database not open');
    var UNKNOWN_ERROR = new PouchError(500, 'unknown_error', 'Database encountered an unknown error');
    var BAD_ARG = new PouchError(500, 'badarg', 'Some query argument is invalid');
    var INVALID_REQUEST = new PouchError(400, 'invalid_request', 'Request was invalid');
    var QUERY_PARSE_ERROR = new PouchError(400, 'query_parse_error', 'Some query parameter is invalid');
    var DOC_VALIDATION = new PouchError(500, 'doc_validation', 'Bad special document member');
    var BAD_REQUEST = new PouchError(400, 'bad_request', 'Something wrong with the request');
    var NOT_AN_OBJECT = new PouchError(400, 'bad_request', 'Document must be a JSON object');
    var DB_MISSING = new PouchError(404, 'not_found', 'Database not found');
    var IDB_ERROR = new PouchError(500, 'indexed_db_went_bad', 'unknown');
    var WSQ_ERROR = new PouchError(500, 'web_sql_went_bad', 'unknown');
    var LDB_ERROR = new PouchError(500, 'levelDB_went_went_bad', 'unknown');
    var FORBIDDEN = new PouchError(403, 'forbidden', 'Forbidden by design doc validate_doc_update function');
    var INVALID_REV = new PouchError(400, 'bad_request', 'Invalid rev format');
    var FILE_EXISTS = new PouchError(412, 'file_exists', 'The database could not be created, the file already exists.');
    var MISSING_STUB = new PouchError(412, 'missing_stub', 'A pre-existing attachment stub wasn\'t found');
    var INVALID_URL = new PouchError(413, 'invalid_url', 'Provided URL is invalid');
    
    function generateErrorFromResponse(err) {
    
      if (typeof err !== 'object') {
        var data = err;
        err = UNKNOWN_ERROR;
        err.data = data;
      }
    
      if ('error' in err && err.error === 'conflict') {
        err.name = 'conflict';
        err.status = 409;
      }
    
      if (!('name' in err)) {
        err.name = err.error || 'unknown';
      }
    
      if (!('status' in err)) {
        err.status = 500;
      }
    
      if (!('message' in err)) {
        err.message = err.message || err.reason;
      }
    
      return err;
    }
    
    function flatten(arrs) {
      var res = [];
      for (var i = 0, len = arrs.length; i < len; i++) {
        res = res.concat(arrs[i]);
      }
      return res;
    }
    
    // shim for Function.prototype.name,
    
    // Checks if a PouchDB object is "remote" or not. This is
    
    function isRemote(db) {
      if (typeof db._remote === 'boolean') {
        return db._remote;
      }
      /* istanbul ignore next */
      if (typeof db.type === 'function') {
        guardedConsole('warn',
          'db.type() is deprecated and will be removed in ' +
          'a future version of PouchDB');
        return db.type() === 'http';
      }
      /* istanbul ignore next */
      return false;
    }
    
    // originally parseUri 1.2.2, now patched by us
    
    // Based on https://github.com/alexdavid/scope-eval v0.0.3
    
    // this is essentially the "update sugar" function from daleharvey/pouchdb#1388
    // the diffFun tells us what delta to apply to the doc.  it either returns
    // the doc, or false if it doesn't need to do an update after all
    function upsert(db, docId, diffFun) {
      return new Promise(function (fulfill, reject) {
        db.get(docId, function (err, doc) {
          if (err) {
            /* istanbul ignore next */
            if (err.status !== 404) {
              return reject(err);
            }
            doc = {};
          }
    
          // the user might change the _rev, so save it for posterity
          var docRev = doc._rev;
          var newDoc = diffFun(doc);
    
          if (!newDoc) {
            // if the diffFun returns falsy, we short-circuit as
            // an optimization
            return fulfill({updated: false, rev: docRev});
          }
    
          // users aren't allowed to modify these values,
          // so reset them here
          newDoc._id = docId;
          newDoc._rev = docRev;
          fulfill(tryAndPut(db, newDoc, diffFun));
        });
      });
    }
    
    function tryAndPut(db, doc, diffFun) {
      return db.put(doc).then(function (res) {
        return {
          updated: true,
          rev: res.rev
        };
      }, function (err) {
        /* istanbul ignore next */
        if (err.status !== 409) {
          throw err;
        }
        return upsert(db, doc._id, diffFun);
      });
    }
    
    var thisAtob = function (str) {
      return atob(str);
    };
    
    // Abstracts constructing a Blob object, so it also works in older
    // browsers that don't support the native Blob constructor (e.g.
    // old QtWebKit versions, Android < 4.4).
    function createBlob(parts, properties) {
      /* global BlobBuilder,MSBlobBuilder,MozBlobBuilder,WebKitBlobBuilder */
      parts = parts || [];
      properties = properties || {};
      try {
        return new Blob(parts, properties);
      } catch (e) {
        if (e.name !== "TypeError") {
          throw e;
        }
        var Builder = typeof BlobBuilder !== 'undefined' ? BlobBuilder :
                      typeof MSBlobBuilder !== 'undefined' ? MSBlobBuilder :
                      typeof MozBlobBuilder !== 'undefined' ? MozBlobBuilder :
                      WebKitBlobBuilder;
        var builder = new Builder();
        for (var i = 0; i < parts.length; i += 1) {
          builder.append(parts[i]);
        }
        return builder.getBlob(properties.type);
      }
    }
    
    // From http://stackoverflow.com/questions/14967647/ (continues on next line)
    // encode-decode-image-with-base64-breaks-image (2013-04-21)
    function binaryStringToArrayBuffer(bin) {
      var length = bin.length;
      var buf = new ArrayBuffer(length);
      var arr = new Uint8Array(buf);
      for (var i = 0; i < length; i++) {
        arr[i] = bin.charCodeAt(i);
      }
      return buf;
    }
    
    function binStringToBluffer(binString, type) {
      return createBlob([binaryStringToArrayBuffer(binString)], {type: type});
    }
    
    function b64ToBluffer(b64, type) {
      return binStringToBluffer(thisAtob(b64), type);
    }
    
    //Can't find original post, but this is close
    
    // simplified API. universal browser support is assumed
    
    // this is not used in the browser
    
    var setImmediateShim = global.setImmediate || global.setTimeout;
    
    function stringMd5(string) {
      return Md5.hash(string);
    }
    
    var uuid = uuidV4.v4;
    
    var h = Headers;
    
    // we restucture the supplied JSON considerably, because the official
    // Mango API is very particular about a lot of this stuff, but we like
    // to be liberal with what we accept in order to prevent mental
    // breakdowns in our users
    function massageCreateIndexRequest(requestDef) {
      requestDef = clone(requestDef);
    
      if (!requestDef.index) {
        requestDef.index = {};
      }
    
      ['type', 'name', 'ddoc'].forEach(function (key) {
        if (requestDef.index[key]) {
          requestDef[key] = requestDef.index[key];
          delete requestDef.index[key];
        }
      });
    
      if (requestDef.fields) {
        requestDef.index.fields = requestDef.fields;
        delete requestDef.fields;
      }
    
      if (!requestDef.type) {
        requestDef.type = 'json';
      }
      return requestDef;
    }
    
    function dbFetch(db, path, opts, callback) {
      var status, ok;
      opts.headers = new h({'Content-type': 'application/json'});
      db.fetch(path, opts).then(function (response) {
        status = response.status;
        ok = response.ok;
        return response.json();
      }).then(function (json) {
        if (!ok) {
          json.status = status;
          var err = generateErrorFromResponse(json);
          callback(err);
        } else {
          callback(null, json);
        }
      })["catch"](callback);
    }
    
    function createIndex(db, requestDef, callback) {
      requestDef = massageCreateIndexRequest(requestDef);
      dbFetch(db, '_index', {
        method: 'POST',
        body: JSON.stringify(requestDef)
      }, callback);
    }
    
    function find(db, requestDef, callback) {
      dbFetch(db, '_find', {
        method: 'POST',
        body: JSON.stringify(requestDef)
      }, callback);
    }
    
    function explain(db, requestDef, callback) {
      dbFetch(db, '_explain', {
        method: 'POST',
        body: JSON.stringify(requestDef)
      }, callback);
    }
    
    function getIndexes(db, callback) {
      dbFetch(db, '_index', {
        method: 'GET'
      }, callback);
    }
    
    function deleteIndex(db, indexDef, callback) {
    
    
      var ddoc = indexDef.ddoc;
      var type = indexDef.type || 'json';
      var name = indexDef.name;
    
      if (!ddoc) {
        return callback(new Error('you must provide an index\'s ddoc'));
      }
    
      if (!name) {
        return callback(new Error('you must provide an index\'s name'));
      }
    
      var url = '_index/' + [ddoc, type, name].map(encodeURIComponent).join('/');
    
      dbFetch(db, url, {method: 'DELETE'}, callback);
    }
    
    // this would just be "return doc[field]", but fields
    // can be "deep" due to dot notation
    function getFieldFromDoc(doc, parsedField) {
      var value = doc;
      for (var i = 0, len = parsedField.length; i < len; i++) {
        var key = parsedField[i];
        value = value[key];
        if (!value) {
          break;
        }
      }
      return value;
    }
    
    function setFieldInDoc(doc, parsedField, value) {
      for (var i = 0, len = parsedField.length; i < len-1; i++) {
        var elem = parsedField[i];
        doc = doc[elem] = {};
      }
      doc[parsedField[len-1]] = value;
    }
    
    function compare(left, right) {
      return left < right ? -1 : left > right ? 1 : 0;
    }
    
    // Converts a string in dot notation to an array of its components, with backslash escaping
    function parseField(fieldName) {
      // fields may be deep (e.g. "foo.bar.baz"), so parse
      var fields = [];
      var current = '';
      for (var i = 0, len = fieldName.length; i < len; i++) {
        var ch = fieldName[i];
        if (ch === '.') {
          if (i > 0 && fieldName[i - 1] === '\\') { // escaped delimiter
            current = current.substring(0, current.length - 1) + '.';
          } else { // not escaped, so delimiter
            fields.push(current);
            current = '';
          }
        } else { // normal character
          current += ch;
        }
      }
      fields.push(current);
      return fields;
    }
    
    var combinationFields = ['$or', '$nor', '$not'];
    function isCombinationalField(field) {
      return combinationFields.indexOf(field) > -1;
    }
    
    function getKey(obj) {
      return Object.keys(obj)[0];
    }
    
    function getValue(obj) {
      return obj[getKey(obj)];
    }
    
    
    // flatten an array of selectors joined by an $and operator
    function mergeAndedSelectors(selectors) {
    
      // sort to ensure that e.g. if the user specified
      // $and: [{$gt: 'a'}, {$gt: 'b'}], then it's collapsed into
      // just {$gt: 'b'}
      var res = {};
    
      selectors.forEach(function (selector) {
        Object.keys(selector).forEach(function (field) {
          var matcher = selector[field];
          if (typeof matcher !== 'object') {
            matcher = {$eq: matcher};
          }
    
          if (isCombinationalField(field)) {
            if (matcher instanceof Array) {
              res[field] = matcher.map(function (m) {
                return mergeAndedSelectors([m]);
              });
            } else {
              res[field] = mergeAndedSelectors([matcher]);
            }
          } else {
            var fieldMatchers = res[field] = res[field] || {};
            Object.keys(matcher).forEach(function (operator) {
              var value = matcher[operator];
    
              if (operator === '$gt' || operator === '$gte') {
                return mergeGtGte(operator, value, fieldMatchers);
              } else if (operator === '$lt' || operator === '$lte') {
                return mergeLtLte(operator, value, fieldMatchers);
              } else if (operator === '$ne') {
                return mergeNe(value, fieldMatchers);
              } else if (operator === '$eq') {
                return mergeEq(value, fieldMatchers);
              }
              fieldMatchers[operator] = value;
            });
          }
        });
      });
    
      return res;
    }
    
    
    
    // collapse logically equivalent gt/gte values
    function mergeGtGte(operator, value, fieldMatchers) {
      if (typeof fieldMatchers.$eq !== 'undefined') {
        return; // do nothing
      }
      if (typeof fieldMatchers.$gte !== 'undefined') {
        if (operator === '$gte') {
          if (value > fieldMatchers.$gte) { // more specificity
            fieldMatchers.$gte = value;
          }
        } else { // operator === '$gt'
          if (value >= fieldMatchers.$gte) { // more specificity
            delete fieldMatchers.$gte;
            fieldMatchers.$gt = value;
          }
        }
      } else if (typeof fieldMatchers.$gt !== 'undefined') {
        if (operator === '$gte') {
          if (value > fieldMatchers.$gt) { // more specificity
            delete fieldMatchers.$gt;
            fieldMatchers.$gte = value;
          }
        } else { // operator === '$gt'
          if (value > fieldMatchers.$gt) { // more specificity
            fieldMatchers.$gt = value;
          }
        }
      } else {
        fieldMatchers[operator] = value;
      }
    }
    
    // collapse logically equivalent lt/lte values
    function mergeLtLte(operator, value, fieldMatchers) {
      if (typeof fieldMatchers.$eq !== 'undefined') {
        return; // do nothing
      }
      if (typeof fieldMatchers.$lte !== 'undefined') {
        if (operator === '$lte') {
          if (value < fieldMatchers.$lte) { // more specificity
            fieldMatchers.$lte = value;
          }
        } else { // operator === '$gt'
          if (value <= fieldMatchers.$lte) { // more specificity
            delete fieldMatchers.$lte;
            fieldMatchers.$lt = value;
          }
        }
      } else if (typeof fieldMatchers.$lt !== 'undefined') {
        if (operator === '$lte') {
          if (value < fieldMatchers.$lt) { // more specificity
            delete fieldMatchers.$lt;
            fieldMatchers.$lte = value;
          }
        } else { // operator === '$gt'
          if (value < fieldMatchers.$lt) { // more specificity
            fieldMatchers.$lt = value;
          }
        }
      } else {
        fieldMatchers[operator] = value;
      }
    }
    
    // combine $ne values into one array
    function mergeNe(value, fieldMatchers) {
      if ('$ne' in fieldMatchers) {
        // there are many things this could "not" be
        fieldMatchers.$ne.push(value);
      } else { // doesn't exist yet
        fieldMatchers.$ne = [value];
      }
    }
    
    // add $eq into the mix
    function mergeEq(value, fieldMatchers) {
      // these all have less specificity than the $eq
      // TODO: check for user errors here
      delete fieldMatchers.$gt;
      delete fieldMatchers.$gte;
      delete fieldMatchers.$lt;
      delete fieldMatchers.$lte;
      delete fieldMatchers.$ne;
      fieldMatchers.$eq = value;
    }
    
    
    //
    // normalize the selector
    //
    function massageSelector(input) {
      var result = clone(input);
      var wasAnded = false;
      if ('$and' in result) {
        result = mergeAndedSelectors(result['$and']);
        wasAnded = true;
      }
    
      ['$or', '$nor'].forEach(function (orOrNor) {
        if (orOrNor in result) {
          // message each individual selector
          // e.g. {foo: 'bar'} becomes {foo: {$eq: 'bar'}}
          result[orOrNor].forEach(function (subSelector) {
            var fields = Object.keys(subSelector);
            for (var i = 0; i < fields.length; i++) {
              var field = fields[i];
              var matcher = subSelector[field];
              if (typeof matcher !== 'object' || matcher === null) {
                subSelector[field] = {$eq: matcher};
              }
            }
          });
        }
      });
    
      if ('$not' in result) {
        //This feels a little like forcing, but it will work for now,
        //I would like to come back to this and make the merging of selectors a little more generic
        result['$not'] = mergeAndedSelectors([result['$not']]);
      }
    
      var fields = Object.keys(result);
    
      for (var i = 0; i < fields.length; i++) {
        var field = fields[i];
        var matcher = result[field];
    
        if (typeof matcher !== 'object' || matcher === null) {
          matcher = {$eq: matcher};
        } else if ('$ne' in matcher && !wasAnded) {
          // I put these in an array, since there may be more than one
          // but in the "mergeAnded" operation, I already take care of that
          matcher.$ne = [matcher.$ne];
        }
        result[field] = matcher;
      }
    
      return result;
    }
    
    function pad(str, padWith, upToLength) {
      var padding = '';
      var targetLength = upToLength - str.length;
      /* istanbul ignore next */
      while (padding.length < targetLength) {
        padding += padWith;
      }
      return padding;
    }
    
    function padLeft(str, padWith, upToLength) {
      var padding = pad(str, padWith, upToLength);
      return padding + str;
    }
    
    var MIN_MAGNITUDE = -324; // verified by -Number.MIN_VALUE
    var MAGNITUDE_DIGITS = 3; // ditto
    var SEP = ''; // set to '_' for easier debugging 
    
    function collate(a, b) {
    
      if (a === b) {
        return 0;
      }
    
      a = normalizeKey(a);
      b = normalizeKey(b);
    
      var ai = collationIndex(a);
      var bi = collationIndex(b);
      if ((ai - bi) !== 0) {
        return ai - bi;
      }
      switch (typeof a) {
        case 'number':
          return a - b;
        case 'boolean':
          return a < b ? -1 : 1;
        case 'string':
          return stringCollate(a, b);
      }
      return Array.isArray(a) ? arrayCollate(a, b) : objectCollate(a, b);
    }
    
    // couch considers null/NaN/Infinity/-Infinity === undefined,
    // for the purposes of mapreduce indexes. also, dates get stringified.
    function normalizeKey(key) {
      switch (typeof key) {
        case 'undefined':
          return null;
        case 'number':
          if (key === Infinity || key === -Infinity || isNaN(key)) {
            return null;
          }
          return key;
        case 'object':
          var origKey = key;
          if (Array.isArray(key)) {
            var len = key.length;
            key = new Array(len);
            for (var i = 0; i < len; i++) {
              key[i] = normalizeKey(origKey[i]);
            }
          /* istanbul ignore next */
          } else if (key instanceof Date) {
            return key.toJSON();
          } else if (key !== null) { // generic object
            key = {};
            for (var k in origKey) {
              if (origKey.hasOwnProperty(k)) {
                var val = origKey[k];
                if (typeof val !== 'undefined') {
                  key[k] = normalizeKey(val);
                }
              }
            }
          }
      }
      return key;
    }
    
    function indexify(key) {
      if (key !== null) {
        switch (typeof key) {
          case 'boolean':
            return key ? 1 : 0;
          case 'number':
            return numToIndexableString(key);
          case 'string':
            // We've to be sure that key does not contain \u0000
            // Do order-preserving replacements:
            // 0 -> 1, 1
            // 1 -> 1, 2
            // 2 -> 2, 2
            /* eslint-disable no-control-regex */
            return key
              .replace(/\u0002/g, '\u0002\u0002')
              .replace(/\u0001/g, '\u0001\u0002')
              .replace(/\u0000/g, '\u0001\u0001');
            /* eslint-enable no-control-regex */
          case 'object':
            var isArray = Array.isArray(key);
            var arr = isArray ? key : Object.keys(key);
            var i = -1;
            var len = arr.length;
            var result = '';
            if (isArray) {
              while (++i < len) {
                result += toIndexableString(arr[i]);
              }
            } else {
              while (++i < len) {
                var objKey = arr[i];
                result += toIndexableString(objKey) +
                    toIndexableString(key[objKey]);
              }
            }
            return result;
        }
      }
      return '';
    }
    
    // convert the given key to a string that would be appropriate
    // for lexical sorting, e.g. within a database, where the
    // sorting is the same given by the collate() function.
    function toIndexableString(key) {
      var zero = '\u0000';
      key = normalizeKey(key);
      return collationIndex(key) + SEP + indexify(key) + zero;
    }
    
    function parseNumber(str, i) {
      var originalIdx = i;
      var num;
      var zero = str[i] === '1';
      if (zero) {
        num = 0;
        i++;
      } else {
        var neg = str[i] === '0';
        i++;
        var numAsString = '';
        var magAsString = str.substring(i, i + MAGNITUDE_DIGITS);
        var magnitude = parseInt(magAsString, 10) + MIN_MAGNITUDE;
        /* istanbul ignore next */
        if (neg) {
          magnitude = -magnitude;
        }
        i += MAGNITUDE_DIGITS;
        while (true) {
          var ch = str[i];
          if (ch === '\u0000') {
            break;
          } else {
            numAsString += ch;
          }
          i++;
        }
        numAsString = numAsString.split('.');
        if (numAsString.length === 1) {
          num = parseInt(numAsString, 10);
        } else {
          /* istanbul ignore next */
          num = parseFloat(numAsString[0] + '.' + numAsString[1]);
        }
        /* istanbul ignore next */
        if (neg) {
          num = num - 10;
        }
        /* istanbul ignore next */
        if (magnitude !== 0) {
          // parseFloat is more reliable than pow due to rounding errors
          // e.g. Number.MAX_VALUE would return Infinity if we did
          // num * Math.pow(10, magnitude);
          num = parseFloat(num + 'e' + magnitude);
        }
      }
      return {num: num, length : i - originalIdx};
    }
    
    // move up the stack while parsing
    // this function moved outside of parseIndexableString for performance
    function pop(stack, metaStack) {
      var obj = stack.pop();
    
      if (metaStack.length) {
        var lastMetaElement = metaStack[metaStack.length - 1];
        if (obj === lastMetaElement.element) {
          // popping a meta-element, e.g. an object whose value is another object
          metaStack.pop();
          lastMetaElement = metaStack[metaStack.length - 1];
        }
        var element = lastMetaElement.element;
        var lastElementIndex = lastMetaElement.index;
        if (Array.isArray(element)) {
          element.push(obj);
        } else if (lastElementIndex === stack.length - 2) { // obj with key+value
          var key = stack.pop();
          element[key] = obj;
        } else {
          stack.push(obj); // obj with key only
        }
      }
    }
    
    function parseIndexableString(str) {
      var stack = [];
      var metaStack = []; // stack for arrays and objects
      var i = 0;
    
      /*eslint no-constant-condition: ["error", { "checkLoops": false }]*/
      while (true) {
        var collationIndex = str[i++];
        if (collationIndex === '\u0000') {
          if (stack.length === 1) {
            return stack.pop();
          } else {
            pop(stack, metaStack);
            continue;
          }
        }
        switch (collationIndex) {
          case '1':
            stack.push(null);
            break;
          case '2':
            stack.push(str[i] === '1');
            i++;
            break;
          case '3':
            var parsedNum = parseNumber(str, i);
            stack.push(parsedNum.num);
            i += parsedNum.length;
            break;
          case '4':
            var parsedStr = '';
            /*eslint no-constant-condition: ["error", { "checkLoops": false }]*/
            while (true) {
              var ch = str[i];
              if (ch === '\u0000') {
                break;
              }
              parsedStr += ch;
              i++;
            }
            // perform the reverse of the order-preserving replacement
            // algorithm (see above)
            /* eslint-disable no-control-regex */
            parsedStr = parsedStr.replace(/\u0001\u0001/g, '\u0000')
              .replace(/\u0001\u0002/g, '\u0001')
              .replace(/\u0002\u0002/g, '\u0002');
            /* eslint-enable no-control-regex */
            stack.push(parsedStr);
            break;
          case '5':
            var arrayElement = { element: [], index: stack.length };
            stack.push(arrayElement.element);
            metaStack.push(arrayElement);
            break;
          case '6':
            var objElement = { element: {}, index: stack.length };
            stack.push(objElement.element);
            metaStack.push(objElement);
            break;
          /* istanbul ignore next */
          default:
            throw new Error(
              'bad collationIndex or unexpectedly reached end of input: ' +
                collationIndex);
        }
      }
    }
    
    function arrayCollate(a, b) {
      var len = Math.min(a.length, b.length);
      for (var i = 0; i < len; i++) {
        var sort = collate(a[i], b[i]);
        if (sort !== 0) {
          return sort;
        }
      }
      return (a.length === b.length) ? 0 :
        (a.length > b.length) ? 1 : -1;
    }
    function stringCollate(a, b) {
      // See: https://github.com/daleharvey/pouchdb/issues/40
      // This is incompatible with the CouchDB implementation, but its the
      // best we can do for now
      return (a === b) ? 0 : ((a > b) ? 1 : -1);
    }
    function objectCollate(a, b) {
      var ak = Object.keys(a), bk = Object.keys(b);
      var len = Math.min(ak.length, bk.length);
      for (var i = 0; i < len; i++) {
        // First sort the keys
        var sort = collate(ak[i], bk[i]);
        if (sort !== 0) {
          return sort;
        }
        // if the keys are equal sort the values
        sort = collate(a[ak[i]], b[bk[i]]);
        if (sort !== 0) {
          return sort;
        }
    
      }
      return (ak.length === bk.length) ? 0 :
        (ak.length > bk.length) ? 1 : -1;
    }
    // The collation is defined by erlangs ordered terms
    // the atoms null, true, false come first, then numbers, strings,
    // arrays, then objects
    // null/undefined/NaN/Infinity/-Infinity are all considered null
    function collationIndex(x) {
      var id = ['boolean', 'number', 'string', 'object'];
      var idx = id.indexOf(typeof x);
      //false if -1 otherwise true, but fast!!!!1
      if (~idx) {
        if (x === null) {
          return 1;
        }
        if (Array.isArray(x)) {
          return 5;
        }
        return idx < 3 ? (idx + 2) : (idx + 3);
      }
      /* istanbul ignore next */
      if (Array.isArray(x)) {
        return 5;
      }
    }
    
    // conversion:
    // x yyy zz...zz
    // x = 0 for negative, 1 for 0, 2 for positive
    // y = exponent (for negative numbers negated) moved so that it's >= 0
    // z = mantisse
    function numToIndexableString(num) {
    
      if (num === 0) {
        return '1';
      }
    
      // convert number to exponential format for easier and
      // more succinct string sorting
      var expFormat = num.toExponential().split(/e\+?/);
      var magnitude = parseInt(expFormat[1], 10);
    
      var neg = num < 0;
    
      var result = neg ? '0' : '2';
    
      // first sort by magnitude
      // it's easier if all magnitudes are positive
      var magForComparison = ((neg ? -magnitude : magnitude) - MIN_MAGNITUDE);
      var magString = padLeft((magForComparison).toString(), '0', MAGNITUDE_DIGITS);
    
      result += SEP + magString;
    
      // then sort by the factor
      var factor = Math.abs(parseFloat(expFormat[0])); // [1..10)
      /* istanbul ignore next */
      if (neg) { // for negative reverse ordering
        factor = 10 - factor;
      }
    
      var factorStr = factor.toFixed(20);
    
      // strip zeros from the end
      factorStr = factorStr.replace(/\.?0+$/, '');
    
      result += SEP + factorStr;
    
      return result;
    }
    
    // create a comparator based on the sort object
    function createFieldSorter(sort) {
    
      function getFieldValuesAsArray(doc) {
        return sort.map(function (sorting) {
          var fieldName = getKey(sorting);
          var parsedField = parseField(fieldName);
          var docFieldValue = getFieldFromDoc(doc, parsedField);
          return docFieldValue;
        });
      }
    
      return function (aRow, bRow) {
        var aFieldValues = getFieldValuesAsArray(aRow.doc);
        var bFieldValues = getFieldValuesAsArray(bRow.doc);
        var collation = collate(aFieldValues, bFieldValues);
        if (collation !== 0) {
          return collation;
        }
        // this is what mango seems to do
        return compare(aRow.doc._id, bRow.doc._id);
      };
    }
    
    function filterInMemoryFields(rows, requestDef, inMemoryFields) {
      rows = rows.filter(function (row) {
        return rowFilter(row.doc, requestDef.selector, inMemoryFields);
      });
    
      if (requestDef.sort) {
        // in-memory sort
        var fieldSorter = createFieldSorter(requestDef.sort);
        rows = rows.sort(fieldSorter);
        if (typeof requestDef.sort[0] !== 'string' &&
            getValue(requestDef.sort[0]) === 'desc') {
          rows = rows.reverse();
        }
      }
    
      if ('limit' in requestDef || 'skip' in requestDef) {
        // have to do the limit in-memory
        var skip = requestDef.skip || 0;
        var limit = ('limit' in requestDef ? requestDef.limit : rows.length) + skip;
        rows = rows.slice(skip, limit);
      }
      return rows;
    }
    
    function rowFilter(doc, selector, inMemoryFields) {
      return inMemoryFields.every(function (field) {
        var matcher = selector[field];
        var parsedField = parseField(field);
        var docFieldValue = getFieldFromDoc(doc, parsedField);
        if (isCombinationalField(field)) {
          return matchCominationalSelector(field, matcher, doc);
        }
    
        return matchSelector(matcher, doc, parsedField, docFieldValue);
      });
    }
    
    function matchSelector(matcher, doc, parsedField, docFieldValue) {
      if (!matcher) {
        // no filtering necessary; this field is just needed for sorting
        return true;
      }
    
      return Object.keys(matcher).every(function (userOperator) {
        var userValue = matcher[userOperator];
        return match(userOperator, doc, userValue, parsedField, docFieldValue);
      });
    }
    
    function matchCominationalSelector(field, matcher, doc) {
    
      if (field === '$or') {
        return matcher.some(function (orMatchers) {
          return rowFilter(doc, orMatchers, Object.keys(orMatchers));
        });
      }
    
      if (field === '$not') {
        return !rowFilter(doc, matcher, Object.keys(matcher));
      }
    
      //`$nor`
      return !matcher.find(function (orMatchers) {
        return rowFilter(doc, orMatchers, Object.keys(orMatchers));
      });
    
    }
    
    function match(userOperator, doc, userValue, parsedField, docFieldValue) {
      if (!matchers[userOperator]) {
        throw new Error('unknown operator "' + userOperator +
          '" - should be one of $eq, $lte, $lt, $gt, $gte, $exists, $ne, $in, ' +
          '$nin, $size, $mod, $regex, $elemMatch, $type, $allMatch or $all');
      }
      return matchers[userOperator](doc, userValue, parsedField, docFieldValue);
    }
    
    function fieldExists(docFieldValue) {
      return typeof docFieldValue !== 'undefined' && docFieldValue !== null;
    }
    
    function fieldIsNotUndefined(docFieldValue) {
      return typeof docFieldValue !== 'undefined';
    }
    
    function modField(docFieldValue, userValue) {
      var divisor = userValue[0];
      var mod = userValue[1];
      if (divisor === 0) {
        throw new Error('Bad divisor, cannot divide by zero');
      }
    
      if (parseInt(divisor, 10) !== divisor ) {
        throw new Error('Divisor is not an integer');
      }
    
      if (parseInt(mod, 10) !== mod ) {
        throw new Error('Modulus is not an integer');
      }
    
      if (parseInt(docFieldValue, 10) !== docFieldValue) {
        return false;
      }
    
      return docFieldValue % divisor === mod;
    }
    
    function arrayContainsValue(docFieldValue, userValue) {
      return userValue.some(function (val) {
        if (docFieldValue instanceof Array) {
          return docFieldValue.indexOf(val) > -1;
        }
    
        return docFieldValue === val;
      });
    }
    
    function arrayContainsAllValues(docFieldValue, userValue) {
      return userValue.every(function (val) {
        return docFieldValue.indexOf(val) > -1;
      });
    }
    
    function arraySize(docFieldValue, userValue) {
      return docFieldValue.length === userValue;
    }
    
    function regexMatch(docFieldValue, userValue) {
      var re = new RegExp(userValue);
    
      return re.test(docFieldValue);
    }
    
    function typeMatch(docFieldValue, userValue) {
    
      switch (userValue) {
        case 'null':
          return docFieldValue === null;
        case 'boolean':
          return typeof (docFieldValue) === 'boolean';
        case 'number':
          return typeof (docFieldValue) === 'number';
        case 'string':
          return typeof (docFieldValue) === 'string';
        case 'array':
          return docFieldValue instanceof Array;
        case 'object':
          return ({}).toString.call(docFieldValue) === '[object Object]';
      }
    
      throw new Error(userValue + ' not supported as a type.' +
                      'Please use one of object, string, array, number, boolean or null.');
    
    }
    
    var matchers = {
    
      '$elemMatch': function (doc, userValue, parsedField, docFieldValue) {
        if (!Array.isArray(docFieldValue)) {
          return false;
        }
    
        if (docFieldValue.length === 0) {
          return false;
        }
    
        if (typeof docFieldValue[0] === 'object') {
          return docFieldValue.some(function (val) {
            return rowFilter(val, userValue, Object.keys(userValue));
          });
        }
    
        return docFieldValue.some(function (val) {
          return matchSelector(userValue, doc, parsedField, val);
        });
      },
    
      '$allMatch': function (doc, userValue, parsedField, docFieldValue) {
        if (!Array.isArray(docFieldValue)) {
          return false;
        }
    
        /* istanbul ignore next */
        if (docFieldValue.length === 0) {
          return false;
        }
    
        if (typeof docFieldValue[0] === 'object') {
          return docFieldValue.every(function (val) {
            return rowFilter(val, userValue, Object.keys(userValue));
          });
        }
    
        return docFieldValue.every(function (val) {
          return matchSelector(userValue, doc, parsedField, val);
        });
      },
    
      '$eq': function (doc, userValue, parsedField, docFieldValue) {
        return fieldIsNotUndefined(docFieldValue) && collate(docFieldValue, userValue) === 0;
      },
    
      '$gte': function (doc, userValue, parsedField, docFieldValue) {
        return fieldIsNotUndefined(docFieldValue) && collate(docFieldValue, userValue) >= 0;
      },
    
      '$gt': function (doc, userValue, parsedField, docFieldValue) {
        return fieldIsNotUndefined(docFieldValue) && collate(docFieldValue, userValue) > 0;
      },
    
      '$lte': function (doc, userValue, parsedField, docFieldValue) {
        return fieldIsNotUndefined(docFieldValue) && collate(docFieldValue, userValue) <= 0;
      },
    
      '$lt': function (doc, userValue, parsedField, docFieldValue) {
        return fieldIsNotUndefined(docFieldValue) && collate(docFieldValue, userValue) < 0;
      },
    
      '$exists': function (doc, userValue, parsedField, docFieldValue) {
        //a field that is null is still considered to exist
        if (userValue) {
          return fieldIsNotUndefined(docFieldValue);
        }
    
        return !fieldIsNotUndefined(docFieldValue);
      },
    
      '$mod': function (doc, userValue, parsedField, docFieldValue) {
        return fieldExists(docFieldValue) && modField(docFieldValue, userValue);
      },
    
      '$ne': function (doc, userValue, parsedField, docFieldValue) {
        return userValue.every(function (neValue) {
          return collate(docFieldValue, neValue) !== 0;
        });
      },
      '$in': function (doc, userValue, parsedField, docFieldValue) {
        return fieldExists(docFieldValue) && arrayContainsValue(docFieldValue, userValue);
      },
    
      '$nin': function (doc, userValue, parsedField, docFieldValue) {
        return fieldExists(docFieldValue) && !arrayContainsValue(docFieldValue, userValue);
      },
    
      '$size': function (doc, userValue, parsedField, docFieldValue) {
        return fieldExists(docFieldValue) && arraySize(docFieldValue, userValue);
      },
    
      '$all': function (doc, userValue, parsedField, docFieldValue) {
        return Array.isArray(docFieldValue) && arrayContainsAllValues(docFieldValue, userValue);
      },
    
      '$regex': function (doc, userValue, parsedField, docFieldValue) {
        return fieldExists(docFieldValue) && regexMatch(docFieldValue, userValue);
      },
    
      '$type': function (doc, userValue, parsedField, docFieldValue) {
        return typeMatch(docFieldValue, userValue);
      }
    };
    
    function getArguments$1(fun) {
      return function () {
        var len = arguments.length;
        var args = new Array(len);
        var i = -1;
        while (++i < len) {
          args[i] = arguments[i];
        }
        return fun.call(this, args);
      };
    }
    
    function callbackify(fun) {
      return getArguments$1(function (args) {
        var cb = args.pop();
        var promise = fun.apply(this, args);
        promisedCallback(promise, cb);
        return promise;
      });
    }
    
    function promisedCallback(promise, callback) {
      promise.then(function (res) {
        nextTick(function () {
          callback(null, res);
        });
      }, function (reason) {
        nextTick(function () {
          callback(reason);
        });
      });
      return promise;
    }
    
    var flatten$1 = getArguments$1(function (args) {
      var res = [];
      for (var i = 0, len = args.length; i < len; i++) {
        var subArr = args[i];
        if (Array.isArray(subArr)) {
          res = res.concat(flatten$1.apply(null, subArr));
        } else {
          res.push(subArr);
        }
      }
      return res;
    });
    
    function mergeObjects(arr) {
      var res = {};
      for (var i = 0, len = arr.length; i < len; i++) {
        res = $inject_Object_assign(res, arr[i]);
      }
      return res;
    }
    
    // Selects a list of fields defined in dot notation from one doc
    // and copies them to a new doc. Like underscore _.pick but supports nesting.
    function pick$1(obj, arr) {
      var res = {};
      for (var i = 0, len = arr.length; i < len; i++) {
        var parsedField = parseField(arr[i]);
        var value = getFieldFromDoc(obj, parsedField);
        if (typeof value !== 'undefined') {
          setFieldInDoc(res, parsedField, value);
        }
      }
      return res;
    }
    
    // e.g. ['a'], ['a', 'b'] is true, but ['b'], ['a', 'b'] is false
    function oneArrayIsSubArrayOfOther(left, right) {
    
      for (var i = 0, len = Math.min(left.length, right.length); i < len; i++) {
        if (left[i] !== right[i]) {
          return false;
        }
      }
      return true;
    }
    
    // e.g.['a', 'b', 'c'], ['a', 'b'] is false
    function oneArrayIsStrictSubArrayOfOther(left, right) {
    
      if (left.length > right.length) {
        return false;
      }
    
      return oneArrayIsSubArrayOfOther(left, right);
    }
    
    // same as above, but treat the left array as an unordered set
    // e.g. ['b', 'a'], ['a', 'b', 'c'] is true, but ['c'], ['a', 'b', 'c'] is false
    function oneSetIsSubArrayOfOther(left, right) {
      left = left.slice();
      for (var i = 0, len = right.length; i < len; i++) {
        var field = right[i];
        if (!left.length) {
          break;
        }
        var leftIdx = left.indexOf(field);
        if (leftIdx === -1) {
          return false;
        } else {
          left.splice(leftIdx, 1);
        }
      }
      return true;
    }
    
    function arrayToObject(arr) {
      var res = {};
      for (var i = 0, len = arr.length; i < len; i++) {
        res[arr[i]] = true;
      }
      return res;
    }
    
    function max(arr, fun) {
      var max = null;
      var maxScore = -1;
      for (var i = 0, len = arr.length; i < len; i++) {
        var element = arr[i];
        var score = fun(element);
        if (score > maxScore) {
          maxScore = score;
          max = element;
        }
      }
      return max;
    }
    
    function arrayEquals(arr1, arr2) {
      if (arr1.length !== arr2.length) {
        return false;
      }
      for (var i = 0, len = arr1.length; i < len; i++) {
        if (arr1[i] !== arr2[i]) {
          return false;
        }
      }
      return true;
    }
    
    function uniq(arr) {
      var obj = {};
      for (var i = 0; i < arr.length; i++) {
        obj['$' + arr[i]] = true;
      }
      return Object.keys(obj).map(function (key) {
        return key.substring(1);
      });
    }
    
    /*
     * Simple task queue to sequentialize actions. Assumes
     * callbacks will eventually fire (once).
     */
    
    
    function TaskQueue() {
      this.promise = new Promise(function (fulfill) {fulfill(); });
    }
    TaskQueue.prototype.add = function (promiseFactory) {
      this.promise = this.promise["catch"](function () {
        // just recover
      }).then(function () {
        return promiseFactory();
      });
      return this.promise;
    };
    TaskQueue.prototype.finish = function () {
      return this.promise;
    };
    
    function stringify(input) {
      if (!input) {
        return 'undefined'; // backwards compat for empty reduce
      }
      // for backwards compat with mapreduce, functions/strings are stringified
      // as-is. everything else is JSON-stringified.
      switch (typeof input) {
        case 'function':
          // e.g. a mapreduce map
          return input.toString();
        case 'string':
          // e.g. a mapreduce built-in _reduce function
          return input.toString();
        default:
          // e.g. a JSON object in the case of mango queries
          return JSON.stringify(input);
      }
    }
    
    /* create a string signature for a view so we can cache it and uniq it */
    function createViewSignature(mapFun, reduceFun) {
      // the "undefined" part is for backwards compatibility
      return stringify(mapFun) + stringify(reduceFun) + 'undefined';
    }
    
    function createView(sourceDB, viewName, mapFun, reduceFun, temporary, localDocName) {
      var viewSignature = createViewSignature(mapFun, reduceFun);
    
      var cachedViews;
      if (!temporary) {
        // cache this to ensure we don't try to update the same view twice
        cachedViews = sourceDB._cachedViews = sourceDB._cachedViews || {};
        if (cachedViews[viewSignature]) {
          return cachedViews[viewSignature];
        }
      }
    
      var promiseForView = sourceDB.info().then(function (info) {
    
        var depDbName = info.db_name + '-mrview-' +
          (temporary ? 'temp' : stringMd5(viewSignature));
    
        // save the view name in the source db so it can be cleaned up if necessary
        // (e.g. when the _design doc is deleted, remove all associated view data)
        function diffFunction(doc) {
          doc.views = doc.views || {};
          var fullViewName = viewName;
          if (fullViewName.indexOf('/') === -1) {
            fullViewName = viewName + '/' + viewName;
          }
          var depDbs = doc.views[fullViewName] = doc.views[fullViewName] || {};
          /* istanbul ignore if */
          if (depDbs[depDbName]) {
            return; // no update necessary
          }
          depDbs[depDbName] = true;
          return doc;
        }
        return upsert(sourceDB, '_local/' + localDocName, diffFunction).then(function () {
          return sourceDB.registerDependentDatabase(depDbName).then(function (res) {
            var db = res.db;
            db.auto_compaction = true;
            var view = {
              name: depDbName,
              db: db,
              sourceDB: sourceDB,
              adapter: sourceDB.adapter,
              mapFun: mapFun,
              reduceFun: reduceFun
            };
            return view.db.get('_local/lastSeq')["catch"](function (err) {
              /* istanbul ignore if */
              if (err.status !== 404) {
                throw err;
              }
            }).then(function (lastSeqDoc) {
              view.seq = lastSeqDoc ? lastSeqDoc.seq : 0;
              if (cachedViews) {
                view.db.once('destroyed', function () {
                  delete cachedViews[viewSignature];
                });
              }
              return view;
            });
          });
        });
      });
    
      if (cachedViews) {
        cachedViews[viewSignature] = promiseForView;
      }
      return promiseForView;
    }
    
    function QueryParseError(message) {
      this.status = 400;
      this.name = 'query_parse_error';
      this.message = message;
      this.error = true;
      try {
        Error.captureStackTrace(this, QueryParseError);
      } catch (e) {}
    }
    
    inherits(QueryParseError, Error);
    
    function NotFoundError(message) {
      this.status = 404;
      this.name = 'not_found';
      this.message = message;
      this.error = true;
      try {
        Error.captureStackTrace(this, NotFoundError);
      } catch (e) {}
    }
    
    inherits(NotFoundError, Error);
    
    function BuiltInError(message) {
      this.status = 500;
      this.name = 'invalid_value';
      this.message = message;
      this.error = true;
      try {
        Error.captureStackTrace(this, BuiltInError);
      } catch (e) {}
    }
    
    inherits(BuiltInError, Error);
    
    function promisedCallback$1(promise, callback) {
      if (callback) {
        promise.then(function (res) {
          nextTick(function () {
            callback(null, res);
          });
        }, function (reason) {
          nextTick(function () {
            callback(reason);
          });
        });
      }
      return promise;
    }
    
    function callbackify$1(fun) {
      return getArguments(function (args) {
        var cb = args.pop();
        var promise = fun.apply(this, args);
        if (typeof cb === 'function') {
          promisedCallback$1(promise, cb);
        }
        return promise;
      });
    }
    
    // Promise finally util similar to Q.finally
    function fin(promise, finalPromiseFactory) {
      return promise.then(function (res) {
        return finalPromiseFactory().then(function () {
          return res;
        });
      }, function (reason) {
        return finalPromiseFactory().then(function () {
          throw reason;
        });
      });
    }
    
    function sequentialize(queue, promiseFactory) {
      return function () {
        var args = arguments;
        var that = this;
        return queue.add(function () {
          return promiseFactory.apply(that, args);
        });
      };
    }
    
    // uniq an array of strings, order not guaranteed
    // similar to underscore/lodash _.uniq
    function uniq$1(arr) {
      var theSet = new ExportedSet(arr);
      var result = new Array(theSet.size);
      var index = -1;
      theSet.forEach(function (value) {
        result[++index] = value;
      });
      return result;
    }
    
    function mapToKeysArray(map) {
      var result = new Array(map.size);
      var index = -1;
      map.forEach(function (value, key) {
        result[++index] = key;
      });
      return result;
    }
    
    var persistentQueues = {};
    var tempViewQueue = new TaskQueue();
    var CHANGES_BATCH_SIZE = 50;
    
    function parseViewName(name) {
      // can be either 'ddocname/viewname' or just 'viewname'
      // (where the ddoc name is the same)
      return name.indexOf('/') === -1 ? [name, name] : name.split('/');
    }
    
    function isGenOne(changes) {
      // only return true if the current change is 1-
      // and there are no other leafs
      return changes.length === 1 && /^1-/.test(changes[0].rev);
    }
    
    function emitError(db, e) {
      try {
        db.emit('error', e);
      } catch (err) {
        guardedConsole('error',
          'The user\'s map/reduce function threw an uncaught error.\n' +
          'You can debug this error by doing:\n' +
          'myDatabase.on(\'error\', function (err) { debugger; });\n' +
          'Please double-check your map/reduce function.');
        guardedConsole('error', e);
      }
    }
    
    /**
     * Returns an "abstract" mapreduce object of the form:
     *
     *   {
     *     query: queryFun,
     *     viewCleanup: viewCleanupFun
     *   }
     *
     * Arguments are:
     *
     * localDoc: string
     *   This is for the local doc that gets saved in order to track the
     *   "dependent" DBs and clean them up for viewCleanup. It should be
     *   unique, so that indexer plugins don't collide with each other.
     * mapper: function (mapFunDef, emit)
     *   Returns a map function based on the mapFunDef, which in the case of
     *   normal map/reduce is just the de-stringified function, but may be
     *   something else, such as an object in the case of pouchdb-find.
     * reducer: function (reduceFunDef)
     *   Ditto, but for reducing. Modules don't have to support reducing
     *   (e.g. pouchdb-find).
     * ddocValidator: function (ddoc, viewName)
     *   Throws an error if the ddoc or viewName is not valid.
     *   This could be a way to communicate to the user that the configuration for the
     *   indexer is invalid.
     */
    function createAbstractMapReduce(localDocName, mapper, reducer, ddocValidator) {
    
      function tryMap(db, fun, doc) {
        // emit an event if there was an error thrown by a map function.
        // putting try/catches in a single function also avoids deoptimizations.
        try {
          fun(doc);
        } catch (e) {
          emitError(db, e);
        }
      }
    
      function tryReduce(db, fun, keys, values, rereduce) {
        // same as above, but returning the result or an error. there are two separate
        // functions to avoid extra memory allocations since the tryCode() case is used
        // for custom map functions (common) vs this function, which is only used for
        // custom reduce functions (rare)
        try {
          return {output : fun(keys, values, rereduce)};
        } catch (e) {
          emitError(db, e);
          return {error: e};
        }
      }
    
      function sortByKeyThenValue(x, y) {
        var keyCompare = collate(x.key, y.key);
        return keyCompare !== 0 ? keyCompare : collate(x.value, y.value);
      }
    
      function sliceResults(results, limit, skip) {
        skip = skip || 0;
        if (typeof limit === 'number') {
          return results.slice(skip, limit + skip);
        } else if (skip > 0) {
          return results.slice(skip);
        }
        return results;
      }
    
      function rowToDocId(row) {
        var val = row.value;
        // Users can explicitly specify a joined doc _id, or it
        // defaults to the doc _id that emitted the key/value.
        var docId = (val && typeof val === 'object' && val._id) || row.id;
        return docId;
      }
    
      function readAttachmentsAsBlobOrBuffer(res) {
        res.rows.forEach(function (row) {
          var atts = row.doc && row.doc._attachments;
          if (!atts) {
            return;
          }
          Object.keys(atts).forEach(function (filename) {
            var att = atts[filename];
            atts[filename].data = b64ToBluffer(att.data, att.content_type);
          });
        });
      }
    
      function postprocessAttachments(opts) {
        return function (res) {
          if (opts.include_docs && opts.attachments && opts.binary) {
            readAttachmentsAsBlobOrBuffer(res);
          }
          return res;
        };
      }
    
      function addHttpParam(paramName, opts, params, asJson) {
        // add an http param from opts to params, optionally json-encoded
        var val = opts[paramName];
        if (typeof val !== 'undefined') {
          if (asJson) {
            val = encodeURIComponent(JSON.stringify(val));
          }
          params.push(paramName + '=' + val);
        }
      }
    
      function coerceInteger(integerCandidate) {
        if (typeof integerCandidate !== 'undefined') {
          var asNumber = Number(integerCandidate);
          // prevents e.g. '1foo' or '1.1' being coerced to 1
          if (!isNaN(asNumber) && asNumber === parseInt(integerCandidate, 10)) {
            return asNumber;
          } else {
            return integerCandidate;
          }
        }
      }
    
      function coerceOptions(opts) {
        opts.group_level = coerceInteger(opts.group_level);
        opts.limit = coerceInteger(opts.limit);
        opts.skip = coerceInteger(opts.skip);
        return opts;
      }
    
      function checkPositiveInteger(number) {
        if (number) {
          if (typeof number !== 'number') {
            return  new QueryParseError('Invalid value for integer: "' +
              number + '"');
          }
          if (number < 0) {
            return new QueryParseError('Invalid value for positive integer: ' +
              '"' + number + '"');
          }
        }
      }
    
      function checkQueryParseError(options, fun) {
        var startkeyName = options.descending ? 'endkey' : 'startkey';
        var endkeyName = options.descending ? 'startkey' : 'endkey';
    
        if (typeof options[startkeyName] !== 'undefined' &&
          typeof options[endkeyName] !== 'undefined' &&
          collate(options[startkeyName], options[endkeyName]) > 0) {
          throw new QueryParseError('No rows can match your key range, ' +
            'reverse your start_key and end_key or set {descending : true}');
        } else if (fun.reduce && options.reduce !== false) {
          if (options.include_docs) {
            throw new QueryParseError('{include_docs:true} is invalid for reduce');
          } else if (options.keys && options.keys.length > 1 &&
            !options.group && !options.group_level) {
            throw new QueryParseError('Multi-key fetches for reduce views must use ' +
              '{group: true}');
          }
        }
        ['group_level', 'limit', 'skip'].forEach(function (optionName) {
          var error = checkPositiveInteger(options[optionName]);
          if (error) {
            throw error;
          }
        });
      }
    
      function httpQuery(db, fun, opts) {
        // List of parameters to add to the PUT request
        var params = [];
        var body;
        var method = 'GET';
        var ok, status;
    
        // If opts.reduce exists and is defined, then add it to the list
        // of parameters.
        // If reduce=false then the results are that of only the map function
        // not the final result of map and reduce.
        addHttpParam('reduce', opts, params);
        addHttpParam('include_docs', opts, params);
        addHttpParam('attachments', opts, params);
        addHttpParam('limit', opts, params);
        addHttpParam('descending', opts, params);
        addHttpParam('group', opts, params);
        addHttpParam('group_level', opts, params);
        addHttpParam('skip', opts, params);
        addHttpParam('stale', opts, params);
        addHttpParam('conflicts', opts, params);
        addHttpParam('startkey', opts, params, true);
        addHttpParam('start_key', opts, params, true);
        addHttpParam('endkey', opts, params, true);
        addHttpParam('end_key', opts, params, true);
        addHttpParam('inclusive_end', opts, params);
        addHttpParam('key', opts, params, true);
        addHttpParam('update_seq', opts, params);
    
        // Format the list of parameters into a valid URI query string
        params = params.join('&');
        params = params === '' ? '' : '?' + params;
    
        // If keys are supplied, issue a POST to circumvent GET query string limits
        // see http://wiki.apache.org/couchdb/HTTP_view_API#Querying_Options
        if (typeof opts.keys !== 'undefined') {
          var MAX_URL_LENGTH = 2000;
          // according to http://stackoverflow.com/a/417184/680742,
          // the de facto URL length limit is 2000 characters
    
          var keysAsString =
            'keys=' + encodeURIComponent(JSON.stringify(opts.keys));
          if (keysAsString.length + params.length + 1 <= MAX_URL_LENGTH) {
            // If the keys are short enough, do a GET. we do this to work around
            // Safari not understanding 304s on POSTs (see pouchdb/pouchdb#1239)
            params += (params[0] === '?' ? '&' : '?') + keysAsString;
          } else {
            method = 'POST';
            if (typeof fun === 'string') {
              body = {keys: opts.keys};
            } else { // fun is {map : mapfun}, so append to this
              fun.keys = opts.keys;
            }
          }
        }
    
        // We are referencing a query defined in the design doc
        if (typeof fun === 'string') {
          var parts = parseViewName(fun);
          return db.fetch('_design/' + parts[0] + '/_view/' + parts[1] + params, {
            headers: new h({'Content-Type': 'application/json'}),
            method: method,
            body: JSON.stringify(body)
          }).then(function (response) {
            ok = response.ok;
            status = response.status;
            return response.json();
          }).then(function (result) {
            if (!ok) {
              result.status = status;
              throw generateErrorFromResponse(result);
            }
            // fail the entire request if the result contains an error
            result.rows.forEach(function (row) {
              /* istanbul ignore if */
              if (row.value && row.value.error && row.value.error === "builtin_reduce_error") {
                throw new Error(row.reason);
              }
            });
            return result;
          }).then(postprocessAttachments(opts));
        }
    
        // We are using a temporary view, terrible for performance, good for testing
        body = body || {};
        Object.keys(fun).forEach(function (key) {
          if (Array.isArray(fun[key])) {
            body[key] = fun[key];
          } else {
            body[key] = fun[key].toString();
          }
        });
    
        return db.fetch('_temp_view' + params, {
          headers: new h({'Content-Type': 'application/json'}),
          method: 'POST',
          body: JSON.stringify(body)
        }).then(function (response) {
            ok = response.ok;
            status = response.status;
          return response.json();
        }).then(function (result) {
          if (!ok) {
            result.status = status;
            throw generateErrorFromResponse(result);
          }
          return result;
        }).then(postprocessAttachments(opts));
      }
    
      // custom adapters can define their own api._query
      // and override the default behavior
      /* istanbul ignore next */
      function customQuery(db, fun, opts) {
        return new Promise(function (resolve, reject) {
          db._query(fun, opts, function (err, res) {
            if (err) {
              return reject(err);
            }
            resolve(res);
          });
        });
      }
    
      // custom adapters can define their own api._viewCleanup
      // and override the default behavior
      /* istanbul ignore next */
      function customViewCleanup(db) {
        return new Promise(function (resolve, reject) {
          db._viewCleanup(function (err, res) {
            if (err) {
              return reject(err);
            }
            resolve(res);
          });
        });
      }
    
      function defaultsTo(value) {
        return function (reason) {
          /* istanbul ignore else */
          if (reason.status === 404) {
            return value;
          } else {
            throw reason;
          }
        };
      }
    
      // returns a promise for a list of docs to update, based on the input docId.
      // the order doesn't matter, because post-3.2.0, bulkDocs
      // is an atomic operation in all three adapters.
      function getDocsToPersist(docId, view, docIdsToChangesAndEmits) {
        var metaDocId = '_local/doc_' + docId;
        var defaultMetaDoc = {_id: metaDocId, keys: []};
        var docData = docIdsToChangesAndEmits.get(docId);
        var indexableKeysToKeyValues = docData[0];
        var changes = docData[1];
    
        function getMetaDoc() {
          if (isGenOne(changes)) {
            // generation 1, so we can safely assume initial state
            // for performance reasons (avoids unnecessary GETs)
            return Promise.resolve(defaultMetaDoc);
          }
          return view.db.get(metaDocId)["catch"](defaultsTo(defaultMetaDoc));
        }
    
        function getKeyValueDocs(metaDoc) {
          if (!metaDoc.keys.length) {
            // no keys, no need for a lookup
            return Promise.resolve({rows: []});
          }
          return view.db.allDocs({
            keys: metaDoc.keys,
            include_docs: true
          });
        }
    
        function processKeyValueDocs(metaDoc, kvDocsRes) {
          var kvDocs = [];
          var oldKeys = new ExportedSet();
    
          for (var i = 0, len = kvDocsRes.rows.length; i < len; i++) {
            var row = kvDocsRes.rows[i];
            var doc = row.doc;
            if (!doc) { // deleted
              continue;
            }
            kvDocs.push(doc);
            oldKeys.add(doc._id);
            doc._deleted = !indexableKeysToKeyValues.has(doc._id);
            if (!doc._deleted) {
              var keyValue = indexableKeysToKeyValues.get(doc._id);
              if ('value' in keyValue) {
                doc.value = keyValue.value;
              }
            }
          }
          var newKeys = mapToKeysArray(indexableKeysToKeyValues);
          newKeys.forEach(function (key) {
            if (!oldKeys.has(key)) {
              // new doc
              var kvDoc = {
                _id: key
              };
              var keyValue = indexableKeysToKeyValues.get(key);
              if ('value' in keyValue) {
                kvDoc.value = keyValue.value;
              }
              kvDocs.push(kvDoc);
            }
          });
          metaDoc.keys = uniq$1(newKeys.concat(metaDoc.keys));
          kvDocs.push(metaDoc);
    
          return kvDocs;
        }
    
        return getMetaDoc().then(function (metaDoc) {
          return getKeyValueDocs(metaDoc).then(function (kvDocsRes) {
            return processKeyValueDocs(metaDoc, kvDocsRes);
          });
        });
      }
    
      // updates all emitted key/value docs and metaDocs in the mrview database
      // for the given batch of documents from the source database
      function saveKeyValues(view, docIdsToChangesAndEmits, seq) {
        var seqDocId = '_local/lastSeq';
        return view.db.get(seqDocId)[
          "catch"](defaultsTo({_id: seqDocId, seq: 0}))
          .then(function (lastSeqDoc) {
            var docIds = mapToKeysArray(docIdsToChangesAndEmits);
            return Promise.all(docIds.map(function (docId) {
              return getDocsToPersist(docId, view, docIdsToChangesAndEmits);
            })).then(function (listOfDocsToPersist) {
              var docsToPersist = flatten(listOfDocsToPersist);
              lastSeqDoc.seq = seq;
              docsToPersist.push(lastSeqDoc);
              // write all docs in a single operation, update the seq once
              return view.db.bulkDocs({docs : docsToPersist});
            });
          });
      }
    
      function getQueue(view) {
        var viewName = typeof view === 'string' ? view : view.name;
        var queue = persistentQueues[viewName];
        if (!queue) {
          queue = persistentQueues[viewName] = new TaskQueue();
        }
        return queue;
      }
    
      function updateView(view) {
        return sequentialize(getQueue(view), function () {
          return updateViewInQueue(view);
        })();
      }
    
      function updateViewInQueue(view) {
        // bind the emit function once
        var mapResults;
        var doc;
    
        function emit(key, value) {
          var output = {id: doc._id, key: normalizeKey(key)};
          // Don't explicitly store the value unless it's defined and non-null.
          // This saves on storage space, because often people don't use it.
          if (typeof value !== 'undefined' && value !== null) {
            output.value = normalizeKey(value);
          }
          mapResults.push(output);
        }
    
        var mapFun = mapper(view.mapFun, emit);
    
        var currentSeq = view.seq || 0;
    
        function processChange(docIdsToChangesAndEmits, seq) {
          return function () {
            return saveKeyValues(view, docIdsToChangesAndEmits, seq);
          };
        }
    
        var queue = new TaskQueue();
    
        function processNextBatch() {
          return view.sourceDB.changes({
            return_docs: true,
            conflicts: true,
            include_docs: true,
            style: 'all_docs',
            since: currentSeq,
            limit: CHANGES_BATCH_SIZE
          }).then(processBatch);
        }
    
        function processBatch(response) {
          var results = response.results;
          if (!results.length) {
            return;
          }
          var docIdsToChangesAndEmits = createDocIdsToChangesAndEmits(results);
          queue.add(processChange(docIdsToChangesAndEmits, currentSeq));
          if (results.length < CHANGES_BATCH_SIZE) {
            return;
          }
          return processNextBatch();
        }
    
        function createDocIdsToChangesAndEmits(results) {
          var docIdsToChangesAndEmits = new ExportedMap();
          for (var i = 0, len = results.length; i < len; i++) {
            var change = results[i];
            if (change.doc._id[0] !== '_') {
              mapResults = [];
              doc = change.doc;
    
              if (!doc._deleted) {
                tryMap(view.sourceDB, mapFun, doc);
              }
              mapResults.sort(sortByKeyThenValue);
    
              var indexableKeysToKeyValues = createIndexableKeysToKeyValues(mapResults);
              docIdsToChangesAndEmits.set(change.doc._id, [
                indexableKeysToKeyValues,
                change.changes
              ]);
            }
            currentSeq = change.seq;
          }
          return docIdsToChangesAndEmits;
        }
    
        function createIndexableKeysToKeyValues(mapResults) {
          var indexableKeysToKeyValues = new ExportedMap();
          var lastKey;
          for (var i = 0, len = mapResults.length; i < len; i++) {
            var emittedKeyValue = mapResults[i];
            var complexKey = [emittedKeyValue.key, emittedKeyValue.id];
            if (i > 0 && collate(emittedKeyValue.key, lastKey) === 0) {
              complexKey.push(i); // dup key+id, so make it unique
            }
            indexableKeysToKeyValues.set(toIndexableString(complexKey), emittedKeyValue);
            lastKey = emittedKeyValue.key;
          }
          return indexableKeysToKeyValues;
        }
    
        return processNextBatch().then(function () {
          return queue.finish();
        }).then(function () {
          view.seq = currentSeq;
        });
      }
    
      function reduceView(view, results, options) {
        if (options.group_level === 0) {
          delete options.group_level;
        }
    
        var shouldGroup = options.group || options.group_level;
    
        var reduceFun = reducer(view.reduceFun);
    
        var groups = [];
        var lvl = isNaN(options.group_level) ? Number.POSITIVE_INFINITY :
          options.group_level;
        results.forEach(function (e) {
          var last = groups[groups.length - 1];
          var groupKey = shouldGroup ? e.key : null;
    
          // only set group_level for array keys
          if (shouldGroup && Array.isArray(groupKey)) {
            groupKey = groupKey.slice(0, lvl);
          }
    
          if (last && collate(last.groupKey, groupKey) === 0) {
            last.keys.push([e.key, e.id]);
            last.values.push(e.value);
            return;
          }
          groups.push({
            keys: [[e.key, e.id]],
            values: [e.value],
            groupKey: groupKey
          });
        });
        results = [];
        for (var i = 0, len = groups.length; i < len; i++) {
          var e = groups[i];
          var reduceTry = tryReduce(view.sourceDB, reduceFun, e.keys, e.values, false);
          if (reduceTry.error && reduceTry.error instanceof BuiltInError) {
            // CouchDB returns an error if a built-in errors out
            throw reduceTry.error;
          }
          results.push({
            // CouchDB just sets the value to null if a non-built-in errors out
            value: reduceTry.error ? null : reduceTry.output,
            key: e.groupKey
          });
        }
        // no total_rows/offset when reducing
        return {rows: sliceResults(results, options.limit, options.skip)};
      }
    
      function queryView(view, opts) {
        return sequentialize(getQueue(view), function () {
          return queryViewInQueue(view, opts);
        })();
      }
    
      function queryViewInQueue(view, opts) {
        var totalRows;
        var shouldReduce = view.reduceFun && opts.reduce !== false;
        var skip = opts.skip || 0;
        if (typeof opts.keys !== 'undefined' && !opts.keys.length) {
          // equivalent query
          opts.limit = 0;
          delete opts.keys;
        }
    
        function fetchFromView(viewOpts) {
          viewOpts.include_docs = true;
          return view.db.allDocs(viewOpts).then(function (res) {
            totalRows = res.total_rows;
            return res.rows.map(function (result) {
    
              // implicit migration - in older versions of PouchDB,
              // we explicitly stored the doc as {id: ..., key: ..., value: ...}
              // this is tested in a migration test
              /* istanbul ignore next */
              if ('value' in result.doc && typeof result.doc.value === 'object' &&
                result.doc.value !== null) {
                var keys = Object.keys(result.doc.value).sort();
                // this detection method is not perfect, but it's unlikely the user
                // emitted a value which was an object with these 3 exact keys
                var expectedKeys = ['id', 'key', 'value'];
                if (!(keys < expectedKeys || keys > expectedKeys)) {
                  return result.doc.value;
                }
              }
    
              var parsedKeyAndDocId = parseIndexableString(result.doc._id);
              return {
                key: parsedKeyAndDocId[0],
                id: parsedKeyAndDocId[1],
                value: ('value' in result.doc ? result.doc.value : null)
              };
            });
          });
        }
    
        function onMapResultsReady(rows) {
          var finalResults;
          if (shouldReduce) {
            finalResults = reduceView(view, rows, opts);
          } else {
            finalResults = {
              total_rows: totalRows,
              offset: skip,
              rows: rows
            };
          }
          /* istanbul ignore if */
          if (opts.update_seq) {
            finalResults.update_seq = view.seq;
          }
          if (opts.include_docs) {
            var docIds = uniq$1(rows.map(rowToDocId));
    
            return view.sourceDB.allDocs({
              keys: docIds,
              include_docs: true,
              conflicts: opts.conflicts,
              attachments: opts.attachments,
              binary: opts.binary
            }).then(function (allDocsRes) {
              var docIdsToDocs = new ExportedMap();
              allDocsRes.rows.forEach(function (row) {
                docIdsToDocs.set(row.id, row.doc);
              });
              rows.forEach(function (row) {
                var docId = rowToDocId(row);
                var doc = docIdsToDocs.get(docId);
                if (doc) {
                  row.doc = doc;
                }
              });
              return finalResults;
            });
          } else {
            return finalResults;
          }
        }
    
        if (typeof opts.keys !== 'undefined') {
          var keys = opts.keys;
          var fetchPromises = keys.map(function (key) {
            var viewOpts = {
              startkey : toIndexableString([key]),
              endkey   : toIndexableString([key, {}])
            };
            /* istanbul ignore if */
            if (opts.update_seq) {
              viewOpts.update_seq = true;
            }
            return fetchFromView(viewOpts);
          });
          return Promise.all(fetchPromises).then(flatten).then(onMapResultsReady);
        } else { // normal query, no 'keys'
          var viewOpts = {
            descending : opts.descending
          };
          /* istanbul ignore if */
          if (opts.update_seq) {
            viewOpts.update_seq = true;
          }
          var startkey;
          var endkey;
          if ('start_key' in opts) {
            startkey = opts.start_key;
          }
          if ('startkey' in opts) {
            startkey = opts.startkey;
          }
          if ('end_key' in opts) {
            endkey = opts.end_key;
          }
          if ('endkey' in opts) {
            endkey = opts.endkey;
          }
          if (typeof startkey !== 'undefined') {
            viewOpts.startkey = opts.descending ?
              toIndexableString([startkey, {}]) :
              toIndexableString([startkey]);
          }
          if (typeof endkey !== 'undefined') {
            var inclusiveEnd = opts.inclusive_end !== false;
            if (opts.descending) {
              inclusiveEnd = !inclusiveEnd;
            }
    
            viewOpts.endkey = toIndexableString(
              inclusiveEnd ? [endkey, {}] : [endkey]);
          }
          if (typeof opts.key !== 'undefined') {
            var keyStart = toIndexableString([opts.key]);
            var keyEnd = toIndexableString([opts.key, {}]);
            if (viewOpts.descending) {
              viewOpts.endkey = keyStart;
              viewOpts.startkey = keyEnd;
            } else {
              viewOpts.startkey = keyStart;
              viewOpts.endkey = keyEnd;
            }
          }
          if (!shouldReduce) {
            if (typeof opts.limit === 'number') {
              viewOpts.limit = opts.limit;
            }
            viewOpts.skip = skip;
          }
          return fetchFromView(viewOpts).then(onMapResultsReady);
        }
      }
    
      function httpViewCleanup(db) {
        return db.fetch('_view_cleanup', {
          headers: new h({'Content-Type': 'application/json'}),
          method: 'POST'
        }).then(function (response) {
          return response.json();
        });
      }
    
      function localViewCleanup(db) {
        return db.get('_local/' + localDocName).then(function (metaDoc) {
          var docsToViews = new ExportedMap();
          Object.keys(metaDoc.views).forEach(function (fullViewName) {
            var parts = parseViewName(fullViewName);
            var designDocName = '_design/' + parts[0];
            var viewName = parts[1];
            var views = docsToViews.get(designDocName);
            if (!views) {
              views = new ExportedSet();
              docsToViews.set(designDocName, views);
            }
            views.add(viewName);
          });
          var opts = {
            keys : mapToKeysArray(docsToViews),
            include_docs : true
          };
          return db.allDocs(opts).then(function (res) {
            var viewsToStatus = {};
            res.rows.forEach(function (row) {
              var ddocName = row.key.substring(8); // cuts off '_design/'
              docsToViews.get(row.key).forEach(function (viewName) {
                var fullViewName = ddocName + '/' + viewName;
                /* istanbul ignore if */
                if (!metaDoc.views[fullViewName]) {
                  // new format, without slashes, to support PouchDB 2.2.0
                  // migration test in pouchdb's browser.migration.js verifies this
                  fullViewName = viewName;
                }
                var viewDBNames = Object.keys(metaDoc.views[fullViewName]);
                // design doc deleted, or view function nonexistent
                var statusIsGood = row.doc && row.doc.views &&
                  row.doc.views[viewName];
                viewDBNames.forEach(function (viewDBName) {
                  viewsToStatus[viewDBName] =
                    viewsToStatus[viewDBName] || statusIsGood;
                });
              });
            });
            var dbsToDelete = Object.keys(viewsToStatus).filter(
              function (viewDBName) { return !viewsToStatus[viewDBName]; });
            var destroyPromises = dbsToDelete.map(function (viewDBName) {
              return sequentialize(getQueue(viewDBName), function () {
                return new db.constructor(viewDBName, db.__opts).destroy();
              })();
            });
            return Promise.all(destroyPromises).then(function () {
              return {ok: true};
            });
          });
        }, defaultsTo({ok: true}));
      }
    
      function queryPromised(db, fun, opts) {
        /* istanbul ignore next */
        if (typeof db._query === 'function') {
          return customQuery(db, fun, opts);
        }
        if (isRemote(db)) {
          return httpQuery(db, fun, opts);
        }
    
        if (typeof fun !== 'string') {
          // temp_view
          checkQueryParseError(opts, fun);
    
          tempViewQueue.add(function () {
            var createViewPromise = createView(
              /* sourceDB */ db,
              /* viewName */ 'temp_view/temp_view',
              /* mapFun */ fun.map,
              /* reduceFun */ fun.reduce,
              /* temporary */ true,
              /* localDocName */ localDocName);
            return createViewPromise.then(function (view) {
              return fin(updateView(view).then(function () {
                return queryView(view, opts);
              }), function () {
                return view.db.destroy();
              });
            });
          });
          return tempViewQueue.finish();
        } else {
          // persistent view
          var fullViewName = fun;
          var parts = parseViewName(fullViewName);
          var designDocName = parts[0];
          var viewName = parts[1];
          return db.get('_design/' + designDocName).then(function (doc) {
            var fun = doc.views && doc.views[viewName];
    
            if (!fun) {
              // basic validator; it's assumed that every subclass would want this
              throw new NotFoundError('ddoc ' + doc._id + ' has no view named ' +
                viewName);
            }
    
            ddocValidator(doc, viewName);
            checkQueryParseError(opts, fun);
    
            var createViewPromise = createView(
              /* sourceDB */ db,
              /* viewName */ fullViewName,
              /* mapFun */ fun.map,
              /* reduceFun */ fun.reduce,
              /* temporary */ false,
              /* localDocName */ localDocName);
            return createViewPromise.then(function (view) {
              if (opts.stale === 'ok' || opts.stale === 'update_after') {
                if (opts.stale === 'update_after') {
                  nextTick(function () {
                    updateView(view);
                  });
                }
                return queryView(view, opts);
              } else { // stale not ok
                return updateView(view).then(function () {
                  return queryView(view, opts);
                });
              }
            });
          });
        }
      }
    
      function abstractQuery(fun, opts, callback) {
        var db = this;
        if (typeof opts === 'function') {
          callback = opts;
          opts = {};
        }
        opts = opts ? coerceOptions(opts) : {};
    
        if (typeof fun === 'function') {
          fun = {map : fun};
        }
    
        var promise = Promise.resolve().then(function () {
          return queryPromised(db, fun, opts);
        });
        promisedCallback$1(promise, callback);
        return promise;
      }
    
      var abstractViewCleanup = callbackify$1(function () {
        var db = this;
        /* istanbul ignore next */
        if (typeof db._viewCleanup === 'function') {
          return customViewCleanup(db);
        }
        if (isRemote(db)) {
          return httpViewCleanup(db);
        }
        return localViewCleanup(db);
      });
    
      return {
        query: abstractQuery,
        viewCleanup: abstractViewCleanup
      };
    }
    
    //
    // One thing about these mappers:
    //
    // Per the advice of John-David Dalton (http://youtu.be/NthmeLEhDDM),
    // what you want to do in this case is optimize for the smallest possible
    // function, since that's the thing that gets run over and over again.
    //
    // This code would be a lot simpler if all the if/elses were inside
    // the function, but it would also be a lot less performant.
    //
    
    
    function createDeepMultiMapper(fields, emit) {
      return function (doc) {
        var toEmit = [];
        for (var i = 0, iLen = fields.length; i < iLen; i++) {
          var parsedField = parseField(fields[i]);
          var value = doc;
          for (var j = 0, jLen = parsedField.length; j < jLen; j++) {
            var key = parsedField[j];
            value = value[key];
            if (typeof value === 'undefined') {
              return; // don't emit
            }
          }
          toEmit.push(value);
        }
        emit(toEmit);
      };
    }
    
    function createDeepSingleMapper(field, emit) {
      var parsedField = parseField(field);
      return function (doc) {
        var value = doc;
        for (var i = 0, len = parsedField.length; i < len; i++) {
          var key = parsedField[i];
          value = value[key];
          if (typeof value === 'undefined') {
            return; // do nothing
          }
        }
        emit(value);
      };
    }
    
    function createShallowSingleMapper(field, emit) {
      return function (doc) {
        emit(doc[field]);
      };
    }
    
    function createShallowMultiMapper(fields, emit) {
      return function (doc) {
        var toEmit = [];
        for (var i = 0, len = fields.length; i < len; i++) {
          toEmit.push(doc[fields[i]]);
        }
        emit(toEmit);
      };
    }
    
    function checkShallow(fields) {
      for (var i = 0, len = fields.length; i < len; i++) {
        var field = fields[i];
        if (field.indexOf('.') !== -1) {
          return false;
        }
      }
      return true;
    }
    
    function createMapper(fields, emit) {
      var isShallow = checkShallow(fields);
      var isSingle = fields.length === 1;
    
      // notice we try to optimize for the most common case,
      // i.e. single shallow indexes
      if (isShallow) {
        if (isSingle) {
          return createShallowSingleMapper(fields[0], emit);
        } else { // multi
          return createShallowMultiMapper(fields, emit);
        }
      } else { // deep
        if (isSingle) {
          return createDeepSingleMapper(fields[0], emit);
        } else { // multi
          return createDeepMultiMapper(fields, emit);
        }
      }
    }
    
    function mapper(mapFunDef, emit) {
      // mapFunDef is a list of fields
    
      var fields = Object.keys(mapFunDef.fields);
    
      return createMapper(fields, emit);
    }
    
    /* istanbul ignore next */
    function reducer(/*reduceFunDef*/) {
      throw new Error('reduce not supported');
    }
    
    function ddocValidator(ddoc, viewName) {
      var view = ddoc.views[viewName];
      // This doesn't actually need to be here apparently, but
      // I feel safer keeping it.
      /* istanbul ignore if */
      if (!view.map || !view.map.fields) {
        throw new Error('ddoc ' + ddoc._id +' with view ' + viewName +
          ' doesn\'t have map.fields defined. ' +
          'maybe it wasn\'t created by this plugin?');
      }
    }
    
    var abstractMapper = createAbstractMapReduce(
      /* localDocName */ 'indexes',
      mapper,
      reducer,
      ddocValidator
    );
    
    // normalize the "sort" value
    function massageSort(sort) {
      if (!Array.isArray(sort)) {
        throw new Error('invalid sort json - should be an array');
      }
      return sort.map(function (sorting) {
        if (typeof sorting === 'string') {
          var obj = {};
          obj[sorting] = 'asc';
          return obj;
        } else {
          return sorting;
        }
      });
    }
    
    function massageUseIndex(useIndex) {
      var cleanedUseIndex = [];
      if (typeof useIndex === 'string') {
        cleanedUseIndex.push(useIndex);
      } else {
        cleanedUseIndex = useIndex;
      }
    
      return cleanedUseIndex.map(function (name) {
        return name.replace('_design/', '');
      });
    }
    
    function massageIndexDef(indexDef) {
      indexDef.fields = indexDef.fields.map(function (field) {
        if (typeof field === 'string') {
          var obj = {};
          obj[field] = 'asc';
          return obj;
        }
        return field;
      });
      return indexDef;
    }
    
    function getKeyFromDoc(doc, index) {
      var res = [];
      for (var i = 0; i < index.def.fields.length; i++) {
        var field = getKey(index.def.fields[i]);
        res.push(doc[field]);
      }
      return res;
    }
    
    // have to do this manually because REASONS. I don't know why
    // CouchDB didn't implement inclusive_start
    function filterInclusiveStart(rows, targetValue, index) {
      var indexFields = index.def.fields;
      for (var i = 0, len = rows.length; i < len; i++) {
        var row = rows[i];
    
        // shave off any docs at the beginning that are <= the
        // target value
    
        var docKey = getKeyFromDoc(row.doc, index);
        if (indexFields.length === 1) {
          docKey = docKey[0]; // only one field, not multi-field
        } else { // more than one field in index
          // in the case where e.g. the user is searching {$gt: {a: 1}}
          // but the index is [a, b], then we need to shorten the doc key
          while (docKey.length > targetValue.length) {
            docKey.pop();
          }
        }
        //ABS as we just looking for values that don't match
        if (Math.abs(collate(docKey, targetValue)) > 0) {
          // no need to filter any further; we're past the key
          break;
        }
      }
      return i > 0 ? rows.slice(i) : rows;
    }
    
    function reverseOptions(opts) {
      var newOpts = clone(opts);
      delete newOpts.startkey;
      delete newOpts.endkey;
      delete newOpts.inclusive_start;
      delete newOpts.inclusive_end;
    
      if ('endkey' in opts) {
        newOpts.startkey = opts.endkey;
      }
      if ('startkey' in opts) {
        newOpts.endkey = opts.startkey;
      }
      if ('inclusive_start' in opts) {
        newOpts.inclusive_end = opts.inclusive_start;
      }
      if ('inclusive_end' in opts) {
        newOpts.inclusive_start = opts.inclusive_end;
      }
      return newOpts;
    }
    
    function validateIndex(index) {
      var ascFields = index.fields.filter(function (field) {
        return getValue(field) === 'asc';
      });
      if (ascFields.length !== 0 && ascFields.length !== index.fields.length) {
        throw new Error('unsupported mixed sorting');
      }
    }
    
    function validateSort(requestDef, index) {
      if (index.defaultUsed && requestDef.sort) {
        var noneIdSorts = requestDef.sort.filter(function (sortItem) {
          return Object.keys(sortItem)[0] !== '_id';
        }).map(function (sortItem) {
          return Object.keys(sortItem)[0];
        });
    
        if (noneIdSorts.length > 0) {
          throw new Error('Cannot sort on field(s) "' + noneIdSorts.join(',') +
          '" when using the default index');
        }
      }
    
      if (index.defaultUsed) {
        return;
      }
    }
    
    function validateFindRequest(requestDef) {
      if (typeof requestDef.selector !== 'object') {
        throw new Error('you must provide a selector when you find()');
      }
    
      /*var selectors = requestDef.selector['$and'] || [requestDef.selector];
      for (var i = 0; i < selectors.length; i++) {
        var selector = selectors[i];
        var keys = Object.keys(selector);
        if (keys.length === 0) {
          throw new Error('invalid empty selector');
        }
        //var selection = selector[keys[0]];
        /*if (Object.keys(selection).length !== 1) {
          throw new Error('invalid selector: ' + JSON.stringify(selection) +
            ' - it must have exactly one key/value');
        }
      }*/
    }
    
    // determine the maximum number of fields
    // we're going to need to query, e.g. if the user
    // has selection ['a'] and sorting ['a', 'b'], then we
    // need to use the longer of the two: ['a', 'b']
    function getUserFields(selector, sort) {
      var selectorFields = Object.keys(selector);
      var sortFields = sort? sort.map(getKey) : [];
      var userFields;
      if (selectorFields.length >= sortFields.length) {
        userFields = selectorFields;
      } else {
        userFields = sortFields;
      }
    
      if (sortFields.length === 0) {
        return {
          fields: userFields
        };
      }
    
      // sort according to the user's preferred sorting
      userFields = userFields.sort(function (left, right) {
        var leftIdx = sortFields.indexOf(left);
        if (leftIdx === -1) {
          leftIdx = Number.MAX_VALUE;
        }
        var rightIdx = sortFields.indexOf(right);
        if (rightIdx === -1) {
          rightIdx = Number.MAX_VALUE;
        }
        return leftIdx < rightIdx ? -1 : leftIdx > rightIdx ? 1 : 0;
      });
    
      return {
        fields: userFields,
        sortOrder: sort.map(getKey)
      };
    }
    
    function createIndex$1(db, requestDef) {
      requestDef = massageCreateIndexRequest(requestDef);
      var originalIndexDef = clone(requestDef.index);
      requestDef.index = massageIndexDef(requestDef.index);
    
      validateIndex(requestDef.index);
    
      // calculating md5 is expensive - memoize and only
      // run if required
      var md5;
      function getMd5() {
        return md5 || (md5 = stringMd5(JSON.stringify(requestDef)));
      }
    
      var viewName = requestDef.name || ('idx-' + getMd5());
    
      var ddocName = requestDef.ddoc || ('idx-' + getMd5());
      var ddocId = '_design/' + ddocName;
    
      var hasInvalidLanguage = false;
      var viewExists = false;
    
      function updateDdoc(doc) {
        if (doc._rev && doc.language !== 'query') {
          hasInvalidLanguage = true;
        }
        doc.language = 'query';
        doc.views = doc.views || {};
    
        viewExists = !!doc.views[viewName];
    
        if (viewExists) {
          return false;
        }
    
        doc.views[viewName] = {
          map: {
            fields: mergeObjects(requestDef.index.fields)
          },
          reduce: '_count',
          options: {
            def: originalIndexDef
          }
        };
    
        return doc;
      }
    
      db.constructor.emit('debug', ['find', 'creating index', ddocId]);
    
      return upsert(db, ddocId, updateDdoc).then(function () {
        if (hasInvalidLanguage) {
          throw new Error('invalid language for ddoc with id "' +
          ddocId +
          '" (should be "query")');
        }
      }).then(function () {
        // kick off a build
        // TODO: abstract-pouchdb-mapreduce should support auto-updating
        // TODO: should also use update_after, but pouchdb/pouchdb#3415 blocks me
        var signature = ddocName + '/' + viewName;
        return abstractMapper.query.call(db, signature, {
          limit: 0,
          reduce: false
        }).then(function () {
          return {
            id: ddocId,
            name: viewName,
            result: viewExists ? 'exists' : 'created'
          };
        });
      });
    }
    
    function getIndexes$1(db) {
      // just search through all the design docs and filter in-memory.
      // hopefully there aren't that many ddocs.
      return db.allDocs({
        startkey: '_design/',
        endkey: '_design/\uffff',
        include_docs: true
      }).then(function (allDocsRes) {
        var res = {
          indexes: [{
            ddoc: null,
            name: '_all_docs',
            type: 'special',
            def: {
              fields: [{_id: 'asc'}]
            }
          }]
        };
    
        res.indexes = flatten$1(res.indexes, allDocsRes.rows.filter(function (row) {
          return row.doc.language === 'query';
        }).map(function (row) {
          var viewNames = row.doc.views !== undefined ? Object.keys(row.doc.views) : [];
    
          return viewNames.map(function (viewName) {
            var view = row.doc.views[viewName];
            return {
              ddoc: row.id,
              name: viewName,
              type: 'json',
              def: massageIndexDef(view.options.def)
            };
          });
        }));
    
        // these are sorted by view name for some reason
        res.indexes.sort(function (left, right) {
          return compare(left.name, right.name);
        });
        res.total_rows = res.indexes.length;
        return res;
      });
    }
    
    // couchdb lowest collation value
    var COLLATE_LO = null;
    
    // couchdb highest collation value (TODO: well not really, but close enough amirite)
    var COLLATE_HI = {"\uffff": {}};
    
    // couchdb second-lowest collation value
    
    function checkFieldInIndex(index, field) {
      var indexFields = index.def.fields.map(getKey);
      for (var i = 0, len = indexFields.length; i < len; i++) {
        var indexField = indexFields[i];
        if (field === indexField) {
          return true;
        }
      }
      return false;
    }
    
    // so when you do e.g. $eq/$eq, we can do it entirely in the database.
    // but when you do e.g. $gt/$eq, the first part can be done
    // in the database, but the second part has to be done in-memory,
    // because $gt has forced us to lose precision.
    // so that's what this determines
    function userOperatorLosesPrecision(selector, field) {
      var matcher = selector[field];
      var userOperator = getKey(matcher);
    
      return userOperator !== '$eq';
    }
    
    // sort the user fields by their position in the index,
    // if they're in the index
    function sortFieldsByIndex(userFields, index) {
      var indexFields = index.def.fields.map(getKey);
    
      return userFields.slice().sort(function (a, b) {
        var aIdx = indexFields.indexOf(a);
        var bIdx = indexFields.indexOf(b);
        if (aIdx === -1) {
          aIdx = Number.MAX_VALUE;
        }
        if (bIdx === -1) {
          bIdx = Number.MAX_VALUE;
        }
        return compare(aIdx, bIdx);
      });
    }
    
    // first pass to try to find fields that will need to be sorted in-memory
    function getBasicInMemoryFields(index, selector, userFields) {
    
      userFields = sortFieldsByIndex(userFields, index);
    
      // check if any of the user selectors lose precision
      var needToFilterInMemory = false;
      for (var i = 0, len = userFields.length; i < len; i++) {
        var field = userFields[i];
        if (needToFilterInMemory || !checkFieldInIndex(index, field)) {
          return userFields.slice(i);
        }
        if (i < len - 1 && userOperatorLosesPrecision(selector, field)) {
          needToFilterInMemory = true;
        }
      }
      return [];
    }
    
    function getInMemoryFieldsFromNe(selector) {
      var fields = [];
      Object.keys(selector).forEach(function (field) {
        var matcher = selector[field];
        Object.keys(matcher).forEach(function (operator) {
          if (operator === '$ne') {
            fields.push(field);
          }
        });
      });
      return fields;
    }
    
    function getInMemoryFields(coreInMemoryFields, index, selector, userFields) {
      var result = flatten$1(
        // in-memory fields reported as necessary by the query planner
        coreInMemoryFields,
        // combine with another pass that checks for any we may have missed
        getBasicInMemoryFields(index, selector, userFields),
        // combine with another pass that checks for $ne's
        getInMemoryFieldsFromNe(selector)
      );
    
      return sortFieldsByIndex(uniq(result), index);
    }
    
    // check that at least one field in the user's query is represented
    // in the index. order matters in the case of sorts
    function checkIndexFieldsMatch(indexFields, sortOrder, fields) {
      if (sortOrder) {
        // array has to be a strict subarray of index array. furthermore,
        // the sortOrder fields need to all be represented in the index
        var sortMatches = oneArrayIsStrictSubArrayOfOther(sortOrder, indexFields);
        var selectorMatches = oneArrayIsSubArrayOfOther(fields, indexFields);
    
        return sortMatches && selectorMatches;
      }
    
      // all of the user's specified fields still need to be
      // on the left side of the index array, although the order
      // doesn't matter
      return oneSetIsSubArrayOfOther(fields, indexFields);
    }
    
    var logicalMatchers = ['$eq', '$gt', '$gte', '$lt', '$lte'];
    function isNonLogicalMatcher(matcher) {
      return logicalMatchers.indexOf(matcher) === -1;
    }
    
    // check all the index fields for usages of '$ne'
    // e.g. if the user queries {foo: {$ne: 'foo'}, bar: {$eq: 'bar'}},
    // then we can neither use an index on ['foo'] nor an index on
    // ['foo', 'bar'], but we can use an index on ['bar'] or ['bar', 'foo']
    function checkFieldsLogicallySound(indexFields, selector) {
      var firstField = indexFields[0];
      var matcher = selector[firstField];
    
      if (typeof matcher === 'undefined') {
        /* istanbul ignore next */
        return true;
      }
    
      var hasLogicalOperator = Object.keys(matcher).some(function (matcherKey) {
        return !(isNonLogicalMatcher(matcherKey));
      });
    
      if (!hasLogicalOperator) {
        return false;
      }
    
      var isInvalidNe = Object.keys(matcher).length === 1 &&
        getKey(matcher) === '$ne';
    
      return !isInvalidNe;
    }
    
    function checkIndexMatches(index, sortOrder, fields, selector) {
    
      var indexFields = index.def.fields.map(getKey);
    
      var fieldsMatch = checkIndexFieldsMatch(indexFields, sortOrder, fields);
    
      if (!fieldsMatch) {
        return false;
      }
    
      return checkFieldsLogicallySound(indexFields, selector);
    }
    
    //
    // the algorithm is very simple:
    // take all the fields the user supplies, and if those fields
    // are a strict subset of the fields in some index,
    // then use that index
    //
    //
    function findMatchingIndexes(selector, userFields, sortOrder, indexes) {
    
      return indexes.reduce(function (res, index) {
        var indexMatches = checkIndexMatches(index, sortOrder, userFields, selector);
        if (indexMatches) {
          res.push(index);
        }
        return res;
      }, []);
    }
    
    // find the best index, i.e. the one that matches the most fields
    // in the user's query
    function findBestMatchingIndex(selector, userFields, sortOrder, indexes, useIndex) {
    
      var matchingIndexes = findMatchingIndexes(selector, userFields, sortOrder, indexes);
    
      if (matchingIndexes.length === 0) {
        if (useIndex) {
          throw {
            error: "no_usable_index",
            message: "There is no index available for this selector."
          };
        }
        //return `all_docs` as a default index;
        //I'm assuming that _all_docs is always first
        var defaultIndex = indexes[0];
        defaultIndex.defaultUsed = true;
        return defaultIndex;
      }
      if (matchingIndexes.length === 1 && !useIndex) {
        return matchingIndexes[0];
      }
    
      var userFieldsMap = arrayToObject(userFields);
    
      function scoreIndex(index) {
        var indexFields = index.def.fields.map(getKey);
        var score = 0;
        for (var i = 0, len = indexFields.length; i < len; i++) {
          var indexField = indexFields[i];
          if (userFieldsMap[indexField]) {
            score++;
          }
        }
        return score;
      }
    
      if (useIndex) {
        var useIndexDdoc = '_design/' + useIndex[0];
        var useIndexName = useIndex.length === 2 ? useIndex[1] : false;
        var index = matchingIndexes.find(function (index) {
          if (useIndexName && index.ddoc === useIndexDdoc && useIndexName === index.name) {
            return true;
          }
    
          if (index.ddoc === useIndexDdoc) {
            /* istanbul ignore next */
            return true;
          }
    
          return false;
        });
    
        if (!index) {
          throw {
            error: "unknown_error",
            message: "Could not find that index or could not use that index for the query"
          };
        }
        return index;
      }
    
      return max(matchingIndexes, scoreIndex);
    }
    
    function getSingleFieldQueryOptsFor(userOperator, userValue) {
      switch (userOperator) {
        case '$eq':
          return {key: userValue};
        case '$lte':
          return {endkey: userValue};
        case '$gte':
          return {startkey: userValue};
        case '$lt':
          return {
            endkey: userValue,
            inclusive_end: false
          };
        case '$gt':
          return {
            startkey: userValue,
            inclusive_start: false
          };
      }
    }
    
    function getSingleFieldCoreQueryPlan(selector, index) {
      var field = getKey(index.def.fields[0]);
      //ignoring this because the test to exercise the branch is skipped at the moment
      /* istanbul ignore next */
      var matcher = selector[field] || {};
      var inMemoryFields = [];
    
      var userOperators = Object.keys(matcher);
    
      var combinedOpts;
    
      userOperators.forEach(function (userOperator) {
    
        if (isNonLogicalMatcher(userOperator)) {
          inMemoryFields.push(field);
          return;
        }
    
        var userValue = matcher[userOperator];
    
        var newQueryOpts = getSingleFieldQueryOptsFor(userOperator, userValue);
    
        if (combinedOpts) {
          combinedOpts = mergeObjects([combinedOpts, newQueryOpts]);
        } else {
          combinedOpts = newQueryOpts;
        }
      });
    
      return {
        queryOpts: combinedOpts,
        inMemoryFields: inMemoryFields
      };
    }
    
    function getMultiFieldCoreQueryPlan(userOperator, userValue) {
      switch (userOperator) {
        case '$eq':
          return {
            startkey: userValue,
            endkey: userValue
          };
        case '$lte':
          return {
            endkey: userValue
          };
        case '$gte':
          return {
            startkey: userValue
          };
        case '$lt':
          return {
            endkey: userValue,
            inclusive_end: false
          };
        case '$gt':
          return {
            startkey: userValue,
            inclusive_start: false
          };
      }
    }
    
    function getMultiFieldQueryOpts(selector, index) {
    
      var indexFields = index.def.fields.map(getKey);
    
      var inMemoryFields = [];
      var startkey = [];
      var endkey = [];
      var inclusiveStart;
      var inclusiveEnd;
    
    
      function finish(i) {
    
        if (inclusiveStart !== false) {
          startkey.push(COLLATE_LO);
        }
        if (inclusiveEnd !== false) {
          endkey.push(COLLATE_HI);
        }
        // keep track of the fields where we lost specificity,
        // and therefore need to filter in-memory
        inMemoryFields = indexFields.slice(i);
      }
    
      for (var i = 0, len = indexFields.length; i < len; i++) {
        var indexField = indexFields[i];
    
        var matcher = selector[indexField];
    
        if (!matcher || !Object.keys(matcher).length) { // fewer fields in user query than in index
          finish(i);
          break;
        } else if (i > 0) {
          if (Object.keys(matcher).some(isNonLogicalMatcher)) { // non-logical are ignored
            finish(i);
            break;
          }
          var usingGtlt = (
            '$gt' in matcher || '$gte' in matcher ||
            '$lt' in matcher || '$lte' in matcher);
          var previousKeys = Object.keys(selector[indexFields[i - 1]]);
          var previousWasEq = arrayEquals(previousKeys, ['$eq']);
          var previousWasSame = arrayEquals(previousKeys, Object.keys(matcher));
          var gtltLostSpecificity = usingGtlt && !previousWasEq && !previousWasSame;
          if (gtltLostSpecificity) {
            finish(i);
            break;
          }
        }
    
        var userOperators = Object.keys(matcher);
    
        var combinedOpts = null;
    
        for (var j = 0; j < userOperators.length; j++) {
          var userOperator = userOperators[j];
          var userValue = matcher[userOperator];
    
          var newOpts = getMultiFieldCoreQueryPlan(userOperator, userValue);
    
          if (combinedOpts) {
            combinedOpts = mergeObjects([combinedOpts, newOpts]);
          } else {
            combinedOpts = newOpts;
          }
        }
    
        startkey.push('startkey' in combinedOpts ? combinedOpts.startkey : COLLATE_LO);
        endkey.push('endkey' in combinedOpts ? combinedOpts.endkey : COLLATE_HI);
        if ('inclusive_start' in combinedOpts) {
          inclusiveStart = combinedOpts.inclusive_start;
        }
        if ('inclusive_end' in combinedOpts) {
          inclusiveEnd = combinedOpts.inclusive_end;
        }
      }
    
      var res = {
        startkey: startkey,
        endkey: endkey
      };
    
      if (typeof inclusiveStart !== 'undefined') {
        res.inclusive_start = inclusiveStart;
      }
      if (typeof inclusiveEnd !== 'undefined') {
        res.inclusive_end = inclusiveEnd;
      }
    
      return {
        queryOpts: res,
        inMemoryFields: inMemoryFields
      };
    }
    
    function getDefaultQueryPlan(selector) {
      //using default index, so all fields need to be done in memory
      return {
        queryOpts: {startkey: null},
        inMemoryFields: [Object.keys(selector)]
      };
    }
    
    function getCoreQueryPlan(selector, index) {
      if (index.defaultUsed) {
        return getDefaultQueryPlan(selector, index);
      }
    
      if (index.def.fields.length === 1) {
        // one field in index, so the value was indexed as a singleton
        return getSingleFieldCoreQueryPlan(selector, index);
      }
      // else index has multiple fields, so the value was indexed as an array
      return getMultiFieldQueryOpts(selector, index);
    }
    
    function planQuery(request, indexes) {
    
      var selector = request.selector;
      var sort = request.sort;
    
      var userFieldsRes = getUserFields(selector, sort);
    
      var userFields = userFieldsRes.fields;
      var sortOrder = userFieldsRes.sortOrder;
      var index = findBestMatchingIndex(selector, userFields, sortOrder, indexes, request.use_index);
    
      var coreQueryPlan = getCoreQueryPlan(selector, index);
      var queryOpts = coreQueryPlan.queryOpts;
      var coreInMemoryFields = coreQueryPlan.inMemoryFields;
    
      var inMemoryFields = getInMemoryFields(coreInMemoryFields, index, selector, userFields);
    
      var res = {
        queryOpts: queryOpts,
        index: index,
        inMemoryFields: inMemoryFields
      };
      return res;
    }
    
    function indexToSignature(index) {
      // remove '_design/'
      return index.ddoc.substring(8) + '/' + index.name;
    }
    
    function doAllDocs(db, originalOpts) {
      var opts = clone(originalOpts);
    
      // CouchDB responds in weird ways when you provide a non-string to _id;
      // we mimic the behavior for consistency. See issue66 tests for details.
    
      if (opts.descending) {
        if ('endkey' in opts && typeof opts.endkey !== 'string') {
          opts.endkey = '';
        }
        if ('startkey' in opts && typeof opts.startkey !== 'string') {
          opts.limit = 0;
        }
      } else {
        if ('startkey' in opts && typeof opts.startkey !== 'string') {
          opts.startkey = '';
        }
        if ('endkey' in opts && typeof opts.endkey !== 'string') {
          opts.limit = 0;
        }
      }
      if ('key' in opts && typeof opts.key !== 'string') {
        opts.limit = 0;
      }
    
      return db.allDocs(opts)
      .then(function (res) {
        // filter out any design docs that _all_docs might return
        res.rows = res.rows.filter(function (row) {
          return !/^_design\//.test(row.id);
        });
        return res;
      });
    }
    
    function find$1(db, requestDef, explain) {
      if (requestDef.selector) {
        requestDef.selector = massageSelector(requestDef.selector);
      }
    
      if (requestDef.sort) {
        requestDef.sort = massageSort(requestDef.sort);
      }
    
      if (requestDef.use_index) {
        requestDef.use_index = massageUseIndex(requestDef.use_index);
      }
    
      validateFindRequest(requestDef);
    
      return getIndexes$1(db).then(function (getIndexesRes) {
    
        db.constructor.emit('debug', ['find', 'planning query', requestDef]);
        var queryPlan = planQuery(requestDef, getIndexesRes.indexes);
        db.constructor.emit('debug', ['find', 'query plan', queryPlan]);
    
        var indexToUse = queryPlan.index;
    
        validateSort(requestDef, indexToUse);
    
        var opts = $inject_Object_assign({
          include_docs: true,
          reduce: false
        }, queryPlan.queryOpts);
    
        if ('startkey' in opts && 'endkey' in opts &&
            collate(opts.startkey, opts.endkey) > 0) {
          // can't possibly return any results, startkey > endkey
          /* istanbul ignore next */
          return {docs: []};
        }
    
        var isDescending = requestDef.sort &&
          typeof requestDef.sort[0] !== 'string' &&
          getValue(requestDef.sort[0]) === 'desc';
    
        if (isDescending) {
          // either all descending or all ascending
          opts.descending = true;
          opts = reverseOptions(opts);
        }
    
        if (!queryPlan.inMemoryFields.length) {
          // no in-memory filtering necessary, so we can let the
          // database do the limit/skip for us
          if ('limit' in requestDef) {
            opts.limit = requestDef.limit;
          }
          if ('skip' in requestDef) {
            opts.skip = requestDef.skip;
          }
        }
    
        if (explain) {
          return Promise.resolve(queryPlan, opts);
        }
    
        return Promise.resolve().then(function () {
          if (indexToUse.name === '_all_docs') {
            return doAllDocs(db, opts);
          } else {
            var signature = indexToSignature(indexToUse);
            return abstractMapper.query.call(db, signature, opts);
          }
        }).then(function (res) {
          if (opts.inclusive_start === false) {
            // may have to manually filter the first one,
            // since couchdb has no true inclusive_start option
            res.rows = filterInclusiveStart(res.rows, opts.startkey, indexToUse);
          }
    
          if (queryPlan.inMemoryFields.length) {
            // need to filter some stuff in-memory
            res.rows = filterInMemoryFields(res.rows, requestDef, queryPlan.inMemoryFields);
          }
    
          var resp = {
            docs: res.rows.map(function (row) {
              var doc = row.doc;
              if (requestDef.fields) {
                return pick$1(doc, requestDef.fields);
              }
              return doc;
            })
          };
    
          if (indexToUse.defaultUsed) {
            resp.warning = 'no matching index found, create an index to optimize query time';
          }
    
          return resp;
        });
      });
    }
    
    function explain$1(db, requestDef) {
      return find$1(db, requestDef, true)
      .then(function (queryPlan) {
        return {
          dbname: db.name,
          index: queryPlan.index,
          selector: requestDef.selector,
          range: {
            start_key: queryPlan.queryOpts.startkey,
            end_key: queryPlan.queryOpts.endkey
          },
          opts: {
            use_index: requestDef.use_index || [],
            bookmark: "nil", //hardcoded to match CouchDB since its not supported,
            limit: requestDef.limit,
            skip: requestDef.skip,
            sort: requestDef.sort || {},
            fields: requestDef.fields,
            conflicts: false, //hardcoded to match CouchDB since its not supported,
            r: [49] // hardcoded to match CouchDB since its not support
          },
          limit: requestDef.limit,
          skip: requestDef.skip || 0,
          fields: requestDef.fields
        };
      });
    }
    
    function deleteIndex$1(db, index) {
    
      if (!index.ddoc) {
        throw new Error('you must supply an index.ddoc when deleting');
      }
    
      if (!index.name) {
        throw new Error('you must supply an index.name when deleting');
      }
    
      var docId = index.ddoc;
      var viewName = index.name;
    
      function deltaFun(doc) {
        if (Object.keys(doc.views).length === 1 && doc.views[viewName]) {
          // only one view in this ddoc, delete the whole ddoc
          return {_id: docId, _deleted: true};
        }
        // more than one view here, just remove the view
        delete doc.views[viewName];
        return doc;
      }
    
      return upsert(db, docId, deltaFun).then(function () {
        return abstractMapper.viewCleanup.apply(db);
      }).then(function () {
        return {ok: true};
      });
    }
    
    var createIndexAsCallback = callbackify(createIndex$1);
    var findAsCallback = callbackify(find$1);
    var explainAsCallback = callbackify(explain$1);
    var getIndexesAsCallback = callbackify(getIndexes$1);
    var deleteIndexAsCallback = callbackify(deleteIndex$1);
    
    var plugin = {};
    plugin.createIndex = toPromise(function (requestDef, callback) {
    
      if (typeof requestDef !== 'object') {
        return callback(new Error('you must provide an index to create'));
      }
    
      var createIndex$$1 = isRemote(this) ?
        createIndex : createIndexAsCallback;
      createIndex$$1(this, requestDef, callback);
    });
    
    plugin.find = toPromise(function (requestDef, callback) {
    
      if (typeof callback === 'undefined') {
        callback = requestDef;
        requestDef = undefined;
      }
    
      if (typeof requestDef !== 'object') {
        return callback(new Error('you must provide search parameters to find()'));
      }
    
      var find$$1 = isRemote(this) ? find : findAsCallback;
      find$$1(this, requestDef, callback);
    });
    
    plugin.explain = toPromise(function (requestDef, callback) {
    
      if (typeof callback === 'undefined') {
        callback = requestDef;
        requestDef = undefined;
      }
    
      if (typeof requestDef !== 'object') {
        return callback(new Error('you must provide search parameters to explain()'));
      }
    
      var find$$1 = isRemote(this) ? explain : explainAsCallback;
      find$$1(this, requestDef, callback);
    });
    
    plugin.getIndexes = toPromise(function (callback) {
    
      var getIndexes$$1 = isRemote(this) ? getIndexes : getIndexesAsCallback;
      getIndexes$$1(this, callback);
    });
    
    plugin.deleteIndex = toPromise(function (indexDef, callback) {
    
      if (typeof indexDef !== 'object') {
        return callback(new Error('you must provide an index to delete'));
      }
    
      var deleteIndex$$1 = isRemote(this) ?
        deleteIndex : deleteIndexAsCallback;
      deleteIndex$$1(this, indexDef, callback);
    });
    
    /* global PouchDB */
    
    if (typeof PouchDB === 'undefined') {
      guardedConsole('error', 'pouchdb-find plugin error: ' +
        'Cannot find global "PouchDB" object! ' +
        'Did you remember to include pouchdb.js?');
    } else {
      PouchDB.plugin(plugin);
    }
    
    }).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    },{"1":1,"2":2,"3":3,"4":4,"5":5,"6":6}]},{},[11]);
    

(function (window) {
    'use strict';
    const path = require('path'),
          nwGUI = require('nw.gui'),
          fs = require('fs-extra'),
          pouchDBStreams = require('./other_modules/pouchdb-replication-stream');

    PouchDB.plugin(pouchDBStreams.plugin);
    PouchDB.adapter('writableStream', pouchDBStreams.adapters.writableStream);
    
    const db = window.db || {};
    window.db = db;
})(this);