"use strict";var WORKER_DOM_DEBUG=/log|development/i.test(location.hash),WorkerThread=function(e){function t(e){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function o(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e}function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e){return v.has(e)?v.get(e):(v.set(e,y),p.push(e),y++)}function c(e,t){0<h&&e[58]&&(g=!0,E=E.concat(t),Promise.resolve().then((function(t){if(g){var n;t=new Uint16Array(function(){var e=b;return b=[],e}().reduce((function(e,t){return e.concat(t[8])}),[])).buffer;var r=new Uint16Array(E).buffer;e.postMessage((a(n={},54,h),a(n,12,2===h?3:2),a(n,37,t),a(n,41,function(){var e=p;return p=[],e}()),a(n,36,r),n),[t,r]),E=[],g=!1,h=2}})))}var u,s,f,l,d,m,y=0,p=[],v=new Map,h=0,b=[],g=!1,E=[],w=function(){function e(t){n(this,e),this.document=t}return o(e,[{key:"getState",value:function(e){var t=this;return new Promise((function(n){t.document.addGlobalEventListener("message",(function r(o){11===(o=o.data)[12]&&o[74]===e&&(t.document.removeGlobalEventListener("message",r),n(o[21]))})),c(t.document,[12,1,2,i(e),0]),setTimeout(n,500,null)}))}},{key:"setState",value:function(e){try{var t=JSON.stringify(e)}catch(e){throw Error("AMP.setState only accepts valid JSON as input.")}c(this.document,[12,2,2,0,i(t)])}}]),e}(),A={},S=function(){function e(){n(this,e),this[u]=!0,this[s]=-1,this.defaultView={document:this}}return o(e,[{key:(u=58,s=7,59),value:function(){h=2}}]),e}(),O={Array:!0,ArrayBuffer:!0,BigInt:!0,BigInt64Array:!0,BigUint64Array:!0,Boolean:!0,Cache:!0,CustomEvent:!0,DataView:!0,Date:!0,Error:!0,EvalError:!0,Event:!0,EventTarget:!0,Float32Array:!0,Float64Array:!0,Function:!0,Infinity:!0,Int16Array:!0,Int32Array:!0,Int8Array:!0,Intl:!0,JSON:!0,Map:!0,Math:!0,NaN:!0,Number:!0,Object:!0,Promise:!0,Proxy:!0,RangeError:!0,ReferenceError:!0,Reflect:!0,RegExp:!0,Set:!0,String:!0,Symbol:!0,SyntaxError:!0,TextDecoder:!0,TextEncoder:!0,TypeError:!0,URIError:!0,URL:!0,Uint16Array:!0,Uint32Array:!0,Uint8Array:!0,Uint8ClampedArray:!0,WeakMap:!0,WeakSet:!0,WebAssembly:!0,WebSocket:!0,XMLHttpRequest:!0,atob:!0,addEventListener:!0,removeEventListener:!0,btoa:!0,caches:!0,clearInterval:!0,clearTimeout:!0,console:!0,decodeURI:!0,decodeURIComponent:!0,document:!0,encodeURI:!0,encodeURIComponent:!0,escape:!0,fetch:!0,indexedDB:!0,isFinite:!0,isNaN:!0,location:!0,navigator:!0,onerror:!0,onrejectionhandled:!0,onunhandledrejection:!0,parseFloat:!0,parseInt:!0,performance:!0,requestAnimationFrame:!0,cancelAnimationFrame:!0,self:!0,setTimeout:!0,setInterval:!0,unescape:!0},k=function(){},I=(f=postMessage.bind(self)||k,l=addEventListener.bind(self)||k,d=removeEventListener.bind(self)||k,(m=new S).postMessage=f,m.addGlobalEventListener=l,m.removeGlobalEventListener=d,{document:m});return function(e){var t=e;for(e=function(){var e=[],n=[];Object.getOwnPropertyNames(t).forEach((function(r){e:{var o=t;if(!O.hasOwnProperty(r))try{delete o[r];var a=!0;break e}catch(e){}a=!1}a?e.push(r):n.push(r)})),console.info("Removed ".concat(e.length," references from"),t,":",e),n.length&&console.info("Failed to remove ".concat(n.length," references from"),t,":",n),t=Object.getPrototypeOf(t)};t&&t.constructor!==EventTarget;)e()}(self),self.AMP=new w(I.document),self.exportFunction=function(e,n){if(!e||""===e)throw Error("[worker-dom]: Attempt to export function was missing an identifier.");if("function"!=typeof n)throw Error('[worker-dom]: Attempt to export non-function failed: ("'.concat(e,'", ').concat(t(n),")."));if(e in A)throw Error('[worker-dom]: Attempt to re-export function failed: "'.concat(e,'".'));A[e]=n},addEventListener("message",(function(e){return function(e,t){if(12===(e=e.data)[12]){var n=e[77],r=JSON.parse(e[78]),o=e[7];(e=A[n])?Promise.resolve(e).then((function(e){return e.apply(null,r)})).then((function(e){c(t,[13,1,o,i(JSON.stringify(e))])}),(function(e){e=JSON.stringify(e.message||e),c(t,[13,2,o,i(JSON.stringify('[worker-dom]: Function "'.concat(n,'" threw: "').concat(e,'"')))])})):c(t,[13,2,o,i(JSON.stringify('[worker-dom]: Exported function "'.concat(n,'" could not be found.')))])}}(e,I.document)})),e.hydrate=k,e.workerDOM=I,e}({});
//# sourceMappingURL=worker.nodom.js.map