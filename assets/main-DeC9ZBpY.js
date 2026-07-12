var va=Object.defineProperty;var Hs=s=>{throw TypeError(s)};var Ea=(s,e,t)=>e in s?va(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var de=(s,e,t)=>Ea(s,typeof e!="symbol"?e+"":e,t),ka=(s,e,t)=>e.has(s)||Hs("Cannot "+t);var Fs=(s,e,t)=>e.has(s)?Hs("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(s):e.set(s,t);var en=(s,e,t)=>(ka(s,e,"access private method"),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function t(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(o){if(o.ep)return;o.ep=!0;const a=t(o);fetch(o.href,a)}})();if(self!==top)try{window.top&&(window.top.location.href=window.location.href)}catch{window.location.href="about:blank"}else document.documentElement.classList.remove("clickjack-lock");const Sa="secops-wiki-db",ze="pages",je="revisions",Ta=5;function Ee(){return new Promise((s,e)=>{const t=indexedDB.open(Sa,Ta);t.onerror=()=>e(t.error),t.onsuccess=()=>{const n=t.result;n.onversionchange=()=>{n.close(),alert("SECURITY NOTICE: The database schema is being updated by another active session. This connection has been closed to prevent blocking. Please reload to resume."),window.location.reload()},s(n)},t.onupgradeneeded=()=>{const n=t.result;n.objectStoreNames.contains(ze)||n.createObjectStore(ze,{keyPath:"slug"}),n.objectStoreNames.contains(je)||n.createObjectStore(je,{keyPath:"id"}).createIndex("slug","slug",{unique:!1}),n.objectStoreNames.contains("tagColors")||n.createObjectStore("tagColors",{keyPath:"tag"}),n.objectStoreNames.contains("attachments")||n.createObjectStore("attachments",{keyPath:"id"}),n.objectStoreNames.contains("auditLogs")||n.createObjectStore("auditLogs",{keyPath:"id"}),n.objectStoreNames.contains("templates")||n.createObjectStore("templates",{keyPath:"id"}),n.objectStoreNames.contains("backups")||n.createObjectStore("backups",{keyPath:"id"})}})}async function Aa(s){const e=await Ee();return new Promise((t,n)=>{const r=e.transaction(ze,"readonly").objectStore(ze).get(s);r.onerror=()=>n(r.error),r.onsuccess=()=>t(r.result||null)})}async function un(s){const e=await Ee();return new Promise((t,n)=>{const r=e.transaction(ze,"readwrite").objectStore(ze).put(s);r.onerror=()=>n(r.error),r.onsuccess=()=>t()})}async function wo(s){await Ia(s);const e=await Ee();return new Promise((t,n)=>{const r=e.transaction(ze,"readwrite").objectStore(ze).delete(s);r.onerror=()=>n(r.error),r.onsuccess=()=>t()})}async function Wt(){const s=await Ee();return new Promise((e,t)=>{const a=s.transaction(ze,"readonly").objectStore(ze).getAll();a.onerror=()=>t(a.error),a.onsuccess=()=>e(a.result||[])})}async function Ws(s){const e=await Ee();return new Promise((t,n)=>{const r=e.transaction(je,"readwrite").objectStore(je).put(s);r.onerror=()=>n(r.error),r.onsuccess=()=>t()})}async function vo(s){const e=await Ee();return new Promise((t,n)=>{const i=e.transaction(je,"readonly").objectStore(je).index("slug").getAll(s);i.onerror=()=>n(i.error),i.onsuccess=()=>{const l=i.result||[];l.sort((d,p)=>p.updatedAt-d.updatedAt),t(l)}})}async function Ia(s){const e=await Ee();return new Promise((t,n)=>{const i=e.transaction(je,"readwrite").objectStore(je).index("slug").openCursor(s);i.onerror=()=>n(i.error),i.onsuccess=()=>{const l=i.result;l?(l.delete(),l.continue()):t()}})}async function Eo(s){const e=await Ee();return new Promise((t,n)=>{const r=e.transaction(je,"readwrite").objectStore(je).delete(s);r.onerror=()=>n(r.error),r.onsuccess=()=>t()})}const La=[{slug:"home",title:"Operations Dashboard",content:`# Secure Operations Center (SOC) Wiki

Welcome to the **SecOps Wiki Platform**. This is a secure, offline-capable knowledge base designed for critical operations.

### Platform Key Features
1. **Offline First (PWA)**: Works completely offline with cached assets and IndexedDB storage.
2. **Zero Trust Security**: Strict Content Security Policy (CSP), zero remote requests, and absolute XSS sanitization.
3. **Markdown Architecture**: Fast page creation and rich documentation support.
4. **Adblock Resilient**: Zero trackers, ads, or external scripts.

### Security Clearance Levels
* [Level 1 (Unclassified)](#/page/home) - Public system procedures.
* [Level 2 (Confidential)](#/page/security-protocols) - Internal system diagrams.
* [Level 3 (Secret)](#/page/home) - Critical infrastructure passwords/encryption keys (Strictly prohibited on this instance).

---
*Use the navigation panel on the left to browse and edit wiki pages, or import database templates.*`,updatedAt:Date.now(),tags:["dashboard","system"],isSystem:!0},{slug:"security-protocols",title:"Security Protocols",content:`# Security Protocols & Hardening Guidelines

This document details the mandatory configuration baseline for all hosts in the secure operations subnet.

### 1. Network Traffic Sanitization
* All incoming payloads must be validated against schemas.
* Outgoing connections to unverified domains are blocked by network firewalls.
* Service workers enforce client-side caching to prevent server resource exhaustion.

### 2. Encryption Keys
* Use SHA-256 for integrity verification.
* RSA keys must be minimum 4096-bit size.
* Under no circumstances should secrets be stored in plain text.

### 3. Content Validation
* Any user-input HTML is processed using \`DOMPurify\` before render.
* Raw input strings are escaped to prevent Cross-Site Scripting (XSS).`,updatedAt:Date.now(),tags:["security","hardening"],isSystem:!0}];async function ps(){if((await Wt()).length===0)for(const e of La)await un(e)}async function ko(){const s=await Ee();return new Promise((e,t)=>{const n=[ze,je,"tagColors","attachments","auditLogs"],o=s.transaction(n,"readwrite"),a=o.objectStore(ze),r=o.objectStore(je),i=o.objectStore("tagColors"),l=o.objectStore("attachments"),d=o.objectStore("auditLogs");a.clear(),r.clear(),i.clear(),l.clear(),d.clear(),o.oncomplete=()=>e(),o.onerror=()=>t(o.error)})}async function So(){const s=await Ee();return new Promise((e,t)=>{try{const a=s.transaction("tagColors","readonly").objectStore("tagColors").getAll();a.onerror=()=>t(a.error),a.onsuccess=()=>e(a.result||[])}catch{e([])}})}async function Ca(s){const e=await Ee();return new Promise((t,n)=>{const r=e.transaction("tagColors","readwrite").objectStore("tagColors").put(s);r.onerror=()=>n(r.error),r.onsuccess=()=>t()})}async function Ra(s){const e=await Ee();return new Promise((t,n)=>{const r=e.transaction("attachments","readwrite").objectStore("attachments").put(s);r.onerror=()=>n(r.error),r.onsuccess=()=>t()})}async function qs(s){const e=await Ee();return new Promise((t,n)=>{try{const r=e.transaction("attachments","readonly").objectStore("attachments").get(s);r.onerror=()=>n(r.error),r.onsuccess=()=>t(r.result||null)}catch{t(null)}})}async function Da(){const s=await Ee();return new Promise((e,t)=>{try{const a=s.transaction("attachments","readonly").objectStore("attachments").getAll();a.onerror=()=>t(a.error),a.onsuccess=()=>e(a.result||[])}catch{e([])}})}async function $a(s){const e=await Ee();return new Promise((t,n)=>{try{const r=e.transaction("auditLogs","readwrite").objectStore("auditLogs").put(s);r.onerror=()=>n(r.error),r.onsuccess=()=>t()}catch(o){console.error("Audit logging transaction failed:",o),t()}})}async function fn(){const s=await Ee();return new Promise((e,t)=>{try{const a=s.transaction("auditLogs","readonly").objectStore("auditLogs").getAll();a.onerror=()=>t(a.error),a.onsuccess=()=>{const r=a.result||[];r.sort((i,l)=>l.timestamp-i.timestamp),e(r)}}catch{e([])}})}async function To(){const s=await Ee();return new Promise((e,t)=>{const a=s.transaction("auditLogs","readwrite").objectStore("auditLogs").clear();a.onerror=()=>t(a.error),a.onsuccess=()=>e()})}async function Ao(s){const e=await Ee(),t=Date.now()-s*24*60*60*1e3;return new Promise((n,o)=>{try{const i=e.transaction("auditLogs","readwrite").objectStore("auditLogs").openCursor();i.onerror=()=>o(i.error),i.onsuccess=()=>{const l=i.result;l?(l.value.timestamp<t&&l.delete(),l.continue()):n()}}catch(a){o(a)}})}async function _a(s){const e=await Ee();return new Promise((t,n)=>{const r=e.transaction("backups","readwrite").objectStore("backups").put(s);r.onerror=()=>n(r.error),r.onsuccess=()=>t()})}/*! @license DOMPurify 3.4.11 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.4.11/LICENSE */function Gs(s,e){(e==null||e>s.length)&&(e=s.length);for(var t=0,n=Array(e);t<e;t++)n[t]=s[t];return n}function Na(s){if(Array.isArray(s))return s}function Oa(s,e){var t=s==null?null:typeof Symbol<"u"&&s[Symbol.iterator]||s["@@iterator"];if(t!=null){var n,o,a,r,i=[],l=!0,d=!1;try{if(a=(t=t.call(s)).next,e!==0)for(;!(l=(n=a.call(t)).done)&&(i.push(n.value),i.length!==e);l=!0);}catch(p){d=!0,o=p}finally{try{if(!l&&t.return!=null&&(r=t.return(),Object(r)!==r))return}finally{if(d)throw o}}return i}}function Pa(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Ma(s,e){return Na(s)||Oa(s,e)||Ba(s,e)||Pa()}function Ba(s,e){if(s){if(typeof s=="string")return Gs(s,e);var t={}.toString.call(s).slice(8,-1);return t==="Object"&&s.constructor&&(t=s.constructor.name),t==="Map"||t==="Set"?Array.from(s):t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?Gs(s,e):void 0}}const Io=Object.entries,Vs=Object.setPrototypeOf,Ua=Object.isFrozen,za=Object.getPrototypeOf,ja=Object.getOwnPropertyDescriptor;let Ie=Object.freeze,Re=Object.seal,Tt=Object.create,Lo=typeof Reflect<"u"&&Reflect,ts=Lo.apply,ns=Lo.construct;Ie||(Ie=function(e){return e});Re||(Re=function(e){return e});ts||(ts=function(e,t){for(var n=arguments.length,o=new Array(n>2?n-2:0),a=2;a<n;a++)o[a-2]=arguments[a];return e.apply(t,o)});ns||(ns=function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),o=1;o<t;o++)n[o-1]=arguments[o];return new e(...n)});const $t=we(Array.prototype.forEach),Ha=we(Array.prototype.lastIndexOf),Ks=we(Array.prototype.pop),St=we(Array.prototype.push),Fa=we(Array.prototype.splice),ot=Array.isArray,Mt=we(String.prototype.toLowerCase),zn=we(String.prototype.toString),Ys=we(String.prototype.match),_t=we(String.prototype.replace),Zs=we(String.prototype.indexOf),Wa=we(String.prototype.trim),qa=we(Number.prototype.toString),Ga=we(Boolean.prototype.toString),Xs=typeof BigInt>"u"?null:we(BigInt.prototype.toString),Js=typeof Symbol>"u"?null:we(Symbol.prototype.toString),Se=we(Object.prototype.hasOwnProperty),Nt=we(Object.prototype.toString),Ae=we(RegExp.prototype.test),ct=Va(TypeError);function we(s){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var t=arguments.length,n=new Array(t>1?t-1:0),o=1;o<t;o++)n[o-1]=arguments[o];return ts(s,e,n)}}function Va(s){return function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return ns(s,t)}}function se(s,e){let t=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Mt;if(Vs&&Vs(s,null),!ot(e))return s;let n=e.length;for(;n--;){let o=e[n];if(typeof o=="string"){const a=t(o);a!==o&&(Ua(e)||(e[n]=a),o=a)}s[o]=!0}return s}function Ka(s){for(let e=0;e<s.length;e++)Se(s,e)||(s[e]=null);return s}function _e(s){const e=Tt(null);for(const n of Io(s)){var t=Ma(n,2);const o=t[0],a=t[1];Se(s,o)&&(ot(a)?e[o]=Ka(a):a&&typeof a=="object"&&a.constructor===Object?e[o]=_e(a):e[o]=a)}return e}function Ya(s){switch(typeof s){case"string":return s;case"number":return qa(s);case"boolean":return Ga(s);case"bigint":return Xs?Xs(s):"0";case"symbol":return Js?Js(s):"Symbol()";case"undefined":return Nt(s);case"function":case"object":{if(s===null)return Nt(s);const e=s,t=Ye(e,"toString");if(typeof t=="function"){const n=t(e);return typeof n=="string"?n:Nt(n)}return Nt(s)}default:return Nt(s)}}function Ye(s,e){for(;s!==null;){const n=ja(s,e);if(n){if(n.get)return we(n.get);if(typeof n.value=="function")return we(n.value)}s=za(s)}function t(){return null}return t}function Za(s){try{return Ae(s,""),!0}catch{return!1}}const Qs=Ie(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),jn=Ie(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Hn=Ie(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Xa=Ie(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Fn=Ie(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Ja=Ie(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),eo=Ie(["#text"]),to=Ie(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","command","commandfor","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns"]),Wn=Ie(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),no=Ie(["accent","accentunder","align","bevelled","close","columnalign","columnlines","columnspacing","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lquote","lspace","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),tn=Ie(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Qa=Re(/{{[\w\W]*|^[\w\W]*}}/g),er=Re(/<%[\w\W]*|^[\w\W]*%>/g),tr=Re(/\${[\w\W]*/g),nr=Re(/^data-[\-\w.\u00B7-\uFFFF]+$/),sr=Re(/^aria-[\-\w]+$/),so=Re(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),or=Re(/^(?:\w+script|data):/i),ar=Re(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),rr=Re(/^html$/i),ir=Re(/^[a-z][.\w]*(-[.\w]+)+$/i),oo=Re(/<[/\w!]/g),lr=Re(/<[/\w]/g),cr=Re(/<\/no(script|embed|frames)/i),dr=Re(/\/>/i),Ke={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,processingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},pr=function(){return typeof window>"u"?null:window},ur=function(e,t){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let n=null;const o="data-tt-policy-suffix";t&&t.hasAttribute(o)&&(n=t.getAttribute(o));const a="dompurify"+(n?"#"+n:"");try{return e.createPolicy(a,{createHTML(r){return r},createScriptURL(r){return r}})}catch{return console.warn("TrustedTypes policy "+a+" could not be created."),null}},ao=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}},st=function(e,t,n,o){return Se(e,t)&&ot(e[t])?se(o.base?_e(o.base):{},e[t],o.transform):n};function Co(){let s=arguments.length>0&&arguments[0]!==void 0?arguments[0]:pr();const e=R=>Co(R);if(e.version="3.4.11",e.removed=[],!s||!s.document||s.document.nodeType!==Ke.document||!s.Element)return e.isSupported=!1,e;let t=s.document;const n=t,o=n.currentScript;s.DocumentFragment;const a=s.HTMLTemplateElement,r=s.Node,i=s.Element,l=s.NodeFilter,d=s.NamedNodeMap;d===void 0&&(s.NamedNodeMap||s.MozNamedAttrMap),s.HTMLFormElement;const p=s.DOMParser,m=s.trustedTypes,u=i.prototype,f=Ye(u,"cloneNode"),y=Ye(u,"remove"),L=Ye(u,"nextSibling"),x=Ye(u,"childNodes"),N=Ye(u,"parentNode"),G=Ye(u,"shadowRoot"),v=Ye(u,"attributes"),w=r&&r.prototype?Ye(r.prototype,"nodeType"):null,E=r&&r.prototype?Ye(r.prototype,"nodeName"):null;if(typeof a=="function"){const R=t.createElement("template");R.content&&R.content.ownerDocument&&(t=R.content.ownerDocument)}let O,U="",ie,ae=!1,te=0;const A=function(){if(te>0)throw ct('A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted Types" section of the README.')},D=function(c){A(),te++;try{return O.createHTML(c)}finally{te--}},M=function(c){A(),te++;try{return O.createScriptURL(c)}finally{te--}},F=function(){return ae||(ie=ur(m,o),ae=!0),ie},Z=t,$=Z.implementation,b=Z.createNodeIterator,P=Z.createDocumentFragment,B=Z.getElementsByTagName,W=n.importNode;let j=ao();e.isSupported=typeof Io=="function"&&typeof N=="function"&&$&&$.createHTMLDocument!==void 0;const le=Qa,T=er,Y=tr,X=nr,H=sr,q=or,h=ar,C=ir;let k=so,S=null;const V=se({},[...Qs,...jn,...Hn,...Fn,...eo]);let K=null;const me=se({},[...to,...Wn,...no,...tn]);let ee=Object.seal(Tt(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),be=null,Te=null;const De=Object.seal(Tt(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let Pe=!0,ve=!0,tt=!1,Lt=!0,qe=!1,Ct=!0,it=!1,Sn=!1,Tn=null,An=null,In=!1,yt=!1,Vt=!1,Kt=!1,Ss=!0,Ts=!1;const As="user-content-";let Ln=!0,Cn=!1,wt={},Ge=null;const Rn=se({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","selectedcontent","style","svg","template","thead","title","video","xmp"]);let Is=null;const Ls=se({},["audio","video","img","source","image","track"]);let Dn=null;const Cs=se({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Yt="http://www.w3.org/1998/Math/MathML",Zt="http://www.w3.org/2000/svg",Ve="http://www.w3.org/1999/xhtml";let vt=Ve,$n=!1,_n=null;const aa=se({},[Yt,Zt,Ve],zn),Rs=Ie(["mi","mo","mn","ms","mtext"]);let Nn=se({},Rs);const Ds=Ie(["annotation-xml"]);let On=se({},Ds);const ra=se({},["title","style","font","a","script"]);let Rt=null;const ia=["application/xhtml+xml","text/html"],la="text/html";let ge=null,Et=null;const ca=t.createElement("form"),$s=function(c){return c instanceof RegExp||c instanceof Function},Pn=function(){let c=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(Et&&Et===c)return;(!c||typeof c!="object")&&(c={}),c=_e(c),Rt=ia.indexOf(c.PARSER_MEDIA_TYPE)===-1?la:c.PARSER_MEDIA_TYPE,ge=Rt==="application/xhtml+xml"?zn:Mt,S=st(c,"ALLOWED_TAGS",V,{transform:ge}),K=st(c,"ALLOWED_ATTR",me,{transform:ge}),_n=st(c,"ALLOWED_NAMESPACES",aa,{transform:zn}),Dn=st(c,"ADD_URI_SAFE_ATTR",Cs,{transform:ge,base:Cs}),Is=st(c,"ADD_DATA_URI_TAGS",Ls,{transform:ge,base:Ls}),Ge=st(c,"FORBID_CONTENTS",Rn,{transform:ge}),be=st(c,"FORBID_TAGS",_e({}),{transform:ge}),Te=st(c,"FORBID_ATTR",_e({}),{transform:ge}),wt=Se(c,"USE_PROFILES")?c.USE_PROFILES&&typeof c.USE_PROFILES=="object"?_e(c.USE_PROFILES):c.USE_PROFILES:!1,Pe=c.ALLOW_ARIA_ATTR!==!1,ve=c.ALLOW_DATA_ATTR!==!1,tt=c.ALLOW_UNKNOWN_PROTOCOLS||!1,Lt=c.ALLOW_SELF_CLOSE_IN_ATTR!==!1,qe=c.SAFE_FOR_TEMPLATES||!1,Ct=c.SAFE_FOR_XML!==!1,it=c.WHOLE_DOCUMENT||!1,yt=c.RETURN_DOM||!1,Vt=c.RETURN_DOM_FRAGMENT||!1,Kt=c.RETURN_TRUSTED_TYPE||!1,In=c.FORCE_BODY||!1,Ss=c.SANITIZE_DOM!==!1,Ts=c.SANITIZE_NAMED_PROPS||!1,Ln=c.KEEP_CONTENT!==!1,Cn=c.IN_PLACE||!1,k=Za(c.ALLOWED_URI_REGEXP)?c.ALLOWED_URI_REGEXP:so,vt=typeof c.NAMESPACE=="string"?c.NAMESPACE:Ve,Nn=Se(c,"MATHML_TEXT_INTEGRATION_POINTS")&&c.MATHML_TEXT_INTEGRATION_POINTS&&typeof c.MATHML_TEXT_INTEGRATION_POINTS=="object"?_e(c.MATHML_TEXT_INTEGRATION_POINTS):se({},Rs),On=Se(c,"HTML_INTEGRATION_POINTS")&&c.HTML_INTEGRATION_POINTS&&typeof c.HTML_INTEGRATION_POINTS=="object"?_e(c.HTML_INTEGRATION_POINTS):se({},Ds);const g=Se(c,"CUSTOM_ELEMENT_HANDLING")&&c.CUSTOM_ELEMENT_HANDLING&&typeof c.CUSTOM_ELEMENT_HANDLING=="object"?_e(c.CUSTOM_ELEMENT_HANDLING):Tt(null);if(ee=Tt(null),Se(g,"tagNameCheck")&&$s(g.tagNameCheck)&&(ee.tagNameCheck=g.tagNameCheck),Se(g,"attributeNameCheck")&&$s(g.attributeNameCheck)&&(ee.attributeNameCheck=g.attributeNameCheck),Se(g,"allowCustomizedBuiltInElements")&&typeof g.allowCustomizedBuiltInElements=="boolean"&&(ee.allowCustomizedBuiltInElements=g.allowCustomizedBuiltInElements),Re(ee),qe&&(ve=!1),Vt&&(yt=!0),wt&&(S=se({},eo),K=Tt(null),wt.html===!0&&(se(S,Qs),se(K,to)),wt.svg===!0&&(se(S,jn),se(K,Wn),se(K,tn)),wt.svgFilters===!0&&(se(S,Hn),se(K,Wn),se(K,tn)),wt.mathMl===!0&&(se(S,Fn),se(K,no),se(K,tn))),De.tagCheck=null,De.attributeCheck=null,Se(c,"ADD_TAGS")&&(typeof c.ADD_TAGS=="function"?De.tagCheck=c.ADD_TAGS:ot(c.ADD_TAGS)&&(S===V&&(S=_e(S)),se(S,c.ADD_TAGS,ge))),Se(c,"ADD_ATTR")&&(typeof c.ADD_ATTR=="function"?De.attributeCheck=c.ADD_ATTR:ot(c.ADD_ATTR)&&(K===me&&(K=_e(K)),se(K,c.ADD_ATTR,ge))),Se(c,"ADD_URI_SAFE_ATTR")&&ot(c.ADD_URI_SAFE_ATTR)&&se(Dn,c.ADD_URI_SAFE_ATTR,ge),Se(c,"FORBID_CONTENTS")&&ot(c.FORBID_CONTENTS)&&(Ge===Rn&&(Ge=_e(Ge)),se(Ge,c.FORBID_CONTENTS,ge)),Se(c,"ADD_FORBID_CONTENTS")&&ot(c.ADD_FORBID_CONTENTS)&&(Ge===Rn&&(Ge=_e(Ge)),se(Ge,c.ADD_FORBID_CONTENTS,ge)),Ln&&(S["#text"]=!0),it&&se(S,["html","head","body"]),S.table&&(se(S,["tbody"]),delete be.tbody),c.TRUSTED_TYPES_POLICY){if(typeof c.TRUSTED_TYPES_POLICY.createHTML!="function")throw ct('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof c.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw ct('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');const I=O;O=c.TRUSTED_TYPES_POLICY;try{U=D("")}catch(z){throw O=I,z}}else c.TRUSTED_TYPES_POLICY===null?(O=void 0,U=""):(O===void 0&&(O=F()),O&&typeof U=="string"&&(U=D("")));Ie&&Ie(c),Et=c},_s=se({},[...jn,...Hn,...Xa]),Ns=se({},[...Fn,...Ja]),da=function(c,g,I){return g.namespaceURI===Ve?c==="svg":g.namespaceURI===Yt?c==="svg"&&(I==="annotation-xml"||Nn[I]):!!_s[c]},pa=function(c,g,I){return g.namespaceURI===Ve?c==="math":g.namespaceURI===Zt?c==="math"&&On[I]:!!Ns[c]},ua=function(c,g,I){return g.namespaceURI===Zt&&!On[I]||g.namespaceURI===Yt&&!Nn[I]?!1:!Ns[c]&&(ra[c]||!_s[c])},fa=function(c){let g=N(c);(!g||!g.tagName)&&(g={namespaceURI:vt,tagName:"template"});const I=Mt(c.tagName),z=Mt(g.tagName);return _n[c.namespaceURI]?c.namespaceURI===Zt?da(I,g,z):c.namespaceURI===Yt?pa(I,g,z):c.namespaceURI===Ve?ua(I,g,z):!!(Rt==="application/xhtml+xml"&&_n[c.namespaceURI]):!1},nt=function(c){St(e.removed,{element:c});try{N(c).removeChild(c)}catch{if(y(c),!N(c))throw ct("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place")}},Os=function(c){const g=x(c);if(g){const z=[];$t(g,Q=>{St(z,Q)}),$t(z,Q=>{try{y(Q)}catch{}})}const I=v(c);if(I)for(let z=I.length-1;z>=0;--z){const Q=I[z],oe=Q&&Q.name;if(typeof oe=="string")try{c.removeAttribute(oe)}catch{}}},lt=function(c,g){try{St(e.removed,{attribute:g.getAttributeNode(c),from:g})}catch{St(e.removed,{attribute:null,from:g})}if(g.removeAttribute(c),c==="is")if(yt||Vt)try{nt(g)}catch{}else try{g.setAttribute(c,"")}catch{}},ma=function(c){const g=v(c);if(g)for(let I=g.length-1;I>=0;--I){const z=g[I],Q=z&&z.name;if(!(typeof Q!="string"||K[ge(Q)]))try{c.removeAttribute(Q)}catch{}}},ga=function(c){const g=[c];for(;g.length>0;){const I=g.pop();(w?w(I):I.nodeType)===Ke.element&&ma(I);const Q=x(I);if(Q)for(let oe=Q.length-1;oe>=0;--oe)g.push(Q[oe])}},Ps=function(c){let g=null,I=null;if(In)c="<remove></remove>"+c;else{const oe=Ys(c,/^[\r\n\t ]+/);I=oe&&oe[0]}Rt==="application/xhtml+xml"&&vt===Ve&&(c='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+c+"</body></html>");const z=O?D(c):c;if(vt===Ve)try{g=new p().parseFromString(z,Rt)}catch{}if(!g||!g.documentElement){g=$.createDocument(vt,"template",null);try{g.documentElement.innerHTML=$n?U:z}catch{}}const Q=g.body||g.documentElement;return c&&I&&Q.insertBefore(t.createTextNode(I),Q.childNodes[0]||null),vt===Ve?B.call(g,it?"html":"body")[0]:it?g.documentElement:Q},Ms=function(c){return b.call(c.ownerDocument||c,c,l.SHOW_ELEMENT|l.SHOW_COMMENT|l.SHOW_TEXT|l.SHOW_PROCESSING_INSTRUCTION|l.SHOW_CDATA_SECTION,null)},Xt=function(c){return c=_t(c,le," "),c=_t(c,T," "),c=_t(c,Y," "),c},Mn=function(c){var g;c.normalize();const I=b.call(c.ownerDocument||c,c,l.SHOW_TEXT|l.SHOW_COMMENT|l.SHOW_CDATA_SECTION|l.SHOW_PROCESSING_INSTRUCTION,null);let z=I.nextNode();for(;z;)z.data=Xt(z.data),z=I.nextNode();const Q=(g=c.querySelectorAll)===null||g===void 0?void 0:g.call(c,"template");Q&&$t(Q,oe=>{kt(oe.content)&&Mn(oe.content)})},Jt=function(c){const g=E?E(c):null;return typeof g!="string"||ge(g)!=="form"?!1:typeof c.nodeName!="string"||typeof c.textContent!="string"||typeof c.removeChild!="function"||c.attributes!==v(c)||typeof c.removeAttribute!="function"||typeof c.setAttribute!="function"||typeof c.namespaceURI!="string"||typeof c.insertBefore!="function"||typeof c.hasChildNodes!="function"||c.nodeType!==w(c)||c.childNodes!==x(c)},kt=function(c){if(!w||typeof c!="object"||c===null)return!1;try{return w(c)===Ke.documentFragment}catch{return!1}},Dt=function(c){if(!w||typeof c!="object"||c===null)return!1;try{return typeof w(c)=="number"}catch{return!1}};function Qe(R,c,g){R.length!==0&&$t(R,I=>{I.call(e,c,g,Et)})}const ha=function(c,g){return!!(Ct&&c.hasChildNodes()&&!Dt(c.firstElementChild)&&Ae(oo,c.textContent)&&Ae(oo,c.innerHTML)||Ct&&c.namespaceURI===Ve&&g==="style"&&Dt(c.firstElementChild)||c.nodeType===Ke.processingInstruction||Ct&&c.nodeType===Ke.comment&&Ae(lr,c.data))},ba=function(c,g){if(!be[g]&&zs(g)&&(ee.tagNameCheck instanceof RegExp&&Ae(ee.tagNameCheck,g)||ee.tagNameCheck instanceof Function&&ee.tagNameCheck(g)))return!1;if(Ln&&!Ge[g]){const I=N(c),z=x(c);if(z&&I){const Q=z.length;for(let oe=Q-1;oe>=0;--oe){const ke=Cn?z[oe]:f(z[oe],!0);I.insertBefore(ke,L(c))}}}return nt(c),!0},Bs=function(c){if(Qe(j.beforeSanitizeElements,c,null),Jt(c))return nt(c),!0;const g=ge(E?E(c):c.nodeName);if(Qe(j.uponSanitizeElement,c,{tagName:g,allowedTags:S}),ha(c,g))return nt(c),!0;if(be[g]||!(De.tagCheck instanceof Function&&De.tagCheck(g))&&!S[g])return ba(c,g);if((w?w(c):c.nodeType)===Ke.element&&!fa(c)||(g==="noscript"||g==="noembed"||g==="noframes")&&Ae(cr,c.innerHTML))return nt(c),!0;if(qe&&c.nodeType===Ke.text){const z=Xt(c.textContent);c.textContent!==z&&(St(e.removed,{element:c.cloneNode()}),c.textContent=z)}return Qe(j.afterSanitizeElements,c,null),!1},Us=function(c,g,I){if(Te[g]||Ss&&(g==="id"||g==="name")&&(I in t||I in ca))return!1;const z=K[g]||De.attributeCheck instanceof Function&&De.attributeCheck(g,c);if(!(ve&&Ae(X,g))){if(!(Pe&&Ae(H,g))){if(z){if(!Dn[g]){if(!Ae(k,_t(I,h,""))){if(!((g==="src"||g==="xlink:href"||g==="href")&&c!=="script"&&Zs(I,"data:")===0&&Is[c])){if(!(tt&&!Ae(q,_t(I,h,"")))){if(I)return!1}}}}}else if(!(zs(c)&&(ee.tagNameCheck instanceof RegExp&&Ae(ee.tagNameCheck,c)||ee.tagNameCheck instanceof Function&&ee.tagNameCheck(c))&&(ee.attributeNameCheck instanceof RegExp&&Ae(ee.attributeNameCheck,g)||ee.attributeNameCheck instanceof Function&&ee.attributeNameCheck(g,c))||g==="is"&&ee.allowCustomizedBuiltInElements&&(ee.tagNameCheck instanceof RegExp&&Ae(ee.tagNameCheck,I)||ee.tagNameCheck instanceof Function&&ee.tagNameCheck(I))))return!1}}return!0},xa=se({},["annotation-xml","color-profile","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","missing-glyph"]),zs=function(c){return!xa[Mt(c)]&&Ae(C,c)},ya=function(c,g,I,z){if(O&&typeof m=="object"&&typeof m.getAttributeType=="function"&&!I)switch(m.getAttributeType(c,g)){case"TrustedHTML":return D(z);case"TrustedScriptURL":return M(z)}return z},wa=function(c,g,I,z){try{I?c.setAttributeNS(I,g,z):c.setAttribute(g,z),Jt(c)?nt(c):Ks(e.removed)}catch{lt(g,c)}},js=function(c){Qe(j.beforeSanitizeAttributes,c,null);const g=c.attributes;if(!g||Jt(c))return;const I={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:K,forceKeepAttr:void 0};let z=g.length;const Q=ge(c.nodeName);for(;z--;){const oe=g[z],ke=oe.name,xe=oe.namespaceURI,Me=oe.value,He=ge(ke),Un=Me;let $e=ke==="value"?Un:Wa(Un);if(I.attrName=He,I.attrValue=$e,I.keepAttr=!0,I.forceKeepAttr=void 0,Qe(j.uponSanitizeAttribute,c,I),$e=I.attrValue,Ts&&(He==="id"||He==="name")&&Zs($e,As)!==0&&(lt(ke,c),$e=As+$e),Ct&&Ae(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i,$e)){lt(ke,c);continue}if(He==="attributename"&&Ys($e,"href")){lt(ke,c);continue}if(!I.forceKeepAttr){if(!I.keepAttr){lt(ke,c);continue}if(!Lt&&Ae(dr,$e)){lt(ke,c);continue}if(qe&&($e=Xt($e)),!Us(Q,He,$e)){lt(ke,c);continue}$e=ya(Q,He,xe,$e),$e!==Un&&wa(c,ke,xe,$e)}}Qe(j.afterSanitizeAttributes,c,null)},Qt=function(c){let g=null;const I=Ms(c);for(Qe(j.beforeSanitizeShadowDOM,c,null);g=I.nextNode();)if(Qe(j.uponSanitizeShadowNode,g,null),Bs(g),js(g),kt(g.content)&&Qt(g.content),(w?w(g):g.nodeType)===Ke.element){const Q=G(g);kt(Q)&&(Bn(Q),Qt(Q))}Qe(j.afterSanitizeShadowDOM,c,null)},Bn=function(c){const g=[{node:c,shadow:null}];for(;g.length>0;){const I=g.pop();if(I.shadow){Qt(I.shadow);continue}const z=I.node,oe=(w?w(z):z.nodeType)===Ke.element,ke=x(z);if(ke)for(let xe=ke.length-1;xe>=0;--xe)g.push({node:ke[xe],shadow:null});if(oe){const xe=E?E(z):null;if(typeof xe=="string"&&ge(xe)==="template"){const Me=z.content;kt(Me)&&g.push({node:Me,shadow:null})}}if(oe){const xe=G(z);kt(xe)&&g.push({node:null,shadow:xe},{node:xe,shadow:null})}}};return e.sanitize=function(R){let c=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},g=null,I=null,z=null,Q=null;if($n=!R,$n&&(R="<!-->"),typeof R!="string"&&!Dt(R)&&(R=Ya(R),typeof R!="string"))throw ct("dirty is not a string, aborting");if(!e.isSupported)return R;Sn?(S=Tn,K=An):Pn(c),(j.uponSanitizeElement.length>0||j.uponSanitizeAttribute.length>0)&&(S=_e(S)),j.uponSanitizeAttribute.length>0&&(K=_e(K)),e.removed=[];const oe=Cn&&typeof R!="string"&&Dt(R);if(oe){const Me=E?E(R):R.nodeName;if(typeof Me=="string"){const He=ge(Me);if(!S[He]||be[He])throw ct("root node is forbidden and cannot be sanitized in-place")}if(Jt(R))throw ct("root node is clobbered and cannot be sanitized in-place");try{Bn(R)}catch(He){throw Os(R),He}}else if(Dt(R))g=Ps("<!---->"),I=g.ownerDocument.importNode(R,!0),I.nodeType===Ke.element&&I.nodeName==="BODY"||I.nodeName==="HTML"?g=I:g.appendChild(I),Bn(I);else{if(!yt&&!qe&&!it&&R.indexOf("<")===-1)return O&&Kt?D(R):R;if(g=Ps(R),!g)return yt?null:Kt?U:""}g&&In&&nt(g.firstChild);const ke=Ms(oe?R:g);try{for(;z=ke.nextNode();)Bs(z),js(z),kt(z.content)&&Qt(z.content)}catch(Me){throw oe&&Os(R),Me}if(oe)return $t(e.removed,Me=>{Me.element&&ga(Me.element)}),qe&&Mn(R),R;if(yt){if(qe&&Mn(g),Vt)for(Q=P.call(g.ownerDocument);g.firstChild;)Q.appendChild(g.firstChild);else Q=g;return(K.shadowroot||K.shadowrootmode)&&(Q=W.call(n,Q,!0)),Q}let xe=it?g.outerHTML:g.innerHTML;return it&&S["!doctype"]&&g.ownerDocument&&g.ownerDocument.doctype&&g.ownerDocument.doctype.name&&Ae(rr,g.ownerDocument.doctype.name)&&(xe="<!DOCTYPE "+g.ownerDocument.doctype.name+`>
`+xe),qe&&(xe=Xt(xe)),O&&Kt?D(xe):xe},e.setConfig=function(){let R=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Pn(R),Sn=!0,Tn=S,An=K},e.clearConfig=function(){Et=null,Sn=!1,Tn=null,An=null,O=ie,U=""},e.isValidAttribute=function(R,c,g){Et||Pn({});const I=ge(R),z=ge(c);return Us(I,z,g)},e.addHook=function(R,c){typeof c=="function"&&Se(j,R)&&St(j[R],c)},e.removeHook=function(R,c){if(Se(j,R)){if(c!==void 0){const g=Ha(j[R],c);return g===-1?void 0:Fa(j[R],g,1)[0]}return Ks(j[R])}},e.removeHooks=function(R){Se(j,R)&&(j[R]=[])},e.removeAllHooks=function(){j=ao()},e}var Ut=Co();function us(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}let bt=us();function Ro(s){bt=s}const Do=/[&<>"']/,fr=new RegExp(Do.source,"g"),$o=/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,mr=new RegExp($o.source,"g"),gr={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},ro=s=>gr[s];function Ne(s,e){if(e){if(Do.test(s))return s.replace(fr,ro)}else if($o.test(s))return s.replace(mr,ro);return s}const hr=/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;function br(s){return s.replace(hr,(e,t)=>(t=t.toLowerCase(),t==="colon"?":":t.charAt(0)==="#"?t.charAt(1)==="x"?String.fromCharCode(parseInt(t.substring(2),16)):String.fromCharCode(+t.substring(1)):""))}const xr=/(^|[^\[])\^/g;function ce(s,e){let t=typeof s=="string"?s:s.source;e=e||"";const n={replace:(o,a)=>{let r=typeof a=="string"?a:a.source;return r=r.replace(xr,"$1"),t=t.replace(o,r),n},getRegex:()=>new RegExp(t,e)};return n}function io(s){try{s=encodeURI(s).replace(/%25/g,"%")}catch{return null}return s}const zt={exec:()=>null};function lo(s,e){const t=s.replace(/\|/g,(a,r,i)=>{let l=!1,d=r;for(;--d>=0&&i[d]==="\\";)l=!l;return l?"|":" |"}),n=t.split(/ \|/);let o=0;if(n[0].trim()||n.shift(),n.length>0&&!n[n.length-1].trim()&&n.pop(),e)if(n.length>e)n.splice(e);else for(;n.length<e;)n.push("");for(;o<n.length;o++)n[o]=n[o].trim().replace(/\\\|/g,"|");return n}function nn(s,e,t){const n=s.length;if(n===0)return"";let o=0;for(;o<n&&s.charAt(n-o-1)===e;)o++;return s.slice(0,n-o)}function yr(s,e){if(s.indexOf(e[1])===-1)return-1;let t=0;for(let n=0;n<s.length;n++)if(s[n]==="\\")n++;else if(s[n]===e[0])t++;else if(s[n]===e[1]&&(t--,t<0))return n;return-1}function co(s,e,t,n){const o=e.href,a=e.title?Ne(e.title):null,r=s[1].replace(/\\([\[\]])/g,"$1");if(s[0].charAt(0)!=="!"){n.state.inLink=!0;const i={type:"link",raw:t,href:o,title:a,text:r,tokens:n.inlineTokens(r)};return n.state.inLink=!1,i}return{type:"image",raw:t,href:o,title:a,text:Ne(r)}}function wr(s,e){const t=s.match(/^(\s+)(?:```)/);if(t===null)return e;const n=t[1];return e.split(`
`).map(o=>{const a=o.match(/^\s+/);if(a===null)return o;const[r]=a;return r.length>=n.length?o.slice(n.length):o}).join(`
`)}class mn{constructor(e){de(this,"options");de(this,"rules");de(this,"lexer");this.options=e||bt}space(e){const t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){const t=this.rules.block.code.exec(e);if(t){const n=t[0].replace(/^ {1,4}/gm,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:nn(n,`
`)}}}fences(e){const t=this.rules.block.fences.exec(e);if(t){const n=t[0],o=wr(n,t[3]||"");return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:o}}}heading(e){const t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(/#$/.test(n)){const o=nn(n,"#");(this.options.pedantic||!o||/ $/.test(o))&&(n=o.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){const t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:t[0]}}blockquote(e){const t=this.rules.block.blockquote.exec(e);if(t){let n=t[0].replace(/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,`
    $1`);n=nn(n.replace(/^ *>[ \t]?/gm,""),`
`);const o=this.lexer.state.top;this.lexer.state.top=!0;const a=this.lexer.blockTokens(n);return this.lexer.state.top=o,{type:"blockquote",raw:t[0],tokens:a,text:n}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim();const o=n.length>1,a={type:"list",raw:"",ordered:o,start:o?+n.slice(0,-1):"",loose:!1,items:[]};n=o?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=o?n:"[*+-]");const r=new RegExp(`^( {0,3}${n})((?:[	 ][^\\n]*)?(?:\\n|$))`);let i="",l="",d=!1;for(;e;){let p=!1;if(!(t=r.exec(e))||this.rules.block.hr.test(e))break;i=t[0],e=e.substring(i.length);let m=t[2].split(`
`,1)[0].replace(/^\t+/,N=>" ".repeat(3*N.length)),u=e.split(`
`,1)[0],f=0;this.options.pedantic?(f=2,l=m.trimStart()):(f=t[2].search(/[^ ]/),f=f>4?1:f,l=m.slice(f),f+=t[1].length);let y=!1;if(!m&&/^ *$/.test(u)&&(i+=u+`
`,e=e.substring(u.length+1),p=!0),!p){const N=new RegExp(`^ {0,${Math.min(3,f-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),G=new RegExp(`^ {0,${Math.min(3,f-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),v=new RegExp(`^ {0,${Math.min(3,f-1)}}(?:\`\`\`|~~~)`),w=new RegExp(`^ {0,${Math.min(3,f-1)}}#`);for(;e;){const E=e.split(`
`,1)[0];if(u=E,this.options.pedantic&&(u=u.replace(/^ {1,4}(?=( {4})*[^ ])/g,"  ")),v.test(u)||w.test(u)||N.test(u)||G.test(e))break;if(u.search(/[^ ]/)>=f||!u.trim())l+=`
`+u.slice(f);else{if(y||m.search(/[^ ]/)>=4||v.test(m)||w.test(m)||G.test(m))break;l+=`
`+u}!y&&!u.trim()&&(y=!0),i+=E+`
`,e=e.substring(E.length+1),m=u.slice(f)}}a.loose||(d?a.loose=!0:/\n *\n *$/.test(i)&&(d=!0));let L=null,x;this.options.gfm&&(L=/^\[[ xX]\] /.exec(l),L&&(x=L[0]!=="[ ] ",l=l.replace(/^\[[ xX]\] +/,""))),a.items.push({type:"list_item",raw:i,task:!!L,checked:x,loose:!1,text:l,tokens:[]}),a.raw+=i}a.items[a.items.length-1].raw=i.trimEnd(),a.items[a.items.length-1].text=l.trimEnd(),a.raw=a.raw.trimEnd();for(let p=0;p<a.items.length;p++)if(this.lexer.state.top=!1,a.items[p].tokens=this.lexer.blockTokens(a.items[p].text,[]),!a.loose){const m=a.items[p].tokens.filter(f=>f.type==="space"),u=m.length>0&&m.some(f=>/\n.*\n/.test(f.raw));a.loose=u}if(a.loose)for(let p=0;p<a.items.length;p++)a.items[p].loose=!0;return a}}html(e){const t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){const t=this.rules.block.def.exec(e);if(t){const n=t[1].toLowerCase().replace(/\s+/g," "),o=t[2]?t[2].replace(/^<(.*)>$/,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",a=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:o,title:a}}}table(e){const t=this.rules.block.table.exec(e);if(!t||!/[:|]/.test(t[2]))return;const n=lo(t[1]),o=t[2].replace(/^\||\| *$/g,"").split("|"),a=t[3]&&t[3].trim()?t[3].replace(/\n[ \t]*$/,"").split(`
`):[],r={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===o.length){for(const i of o)/^ *-+: *$/.test(i)?r.align.push("right"):/^ *:-+: *$/.test(i)?r.align.push("center"):/^ *:-+ *$/.test(i)?r.align.push("left"):r.align.push(null);for(const i of n)r.header.push({text:i,tokens:this.lexer.inline(i)});for(const i of a)r.rows.push(lo(i,r.header.length).map(l=>({text:l,tokens:this.lexer.inline(l)})));return r}}lheading(e){const t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){const t=this.rules.block.paragraph.exec(e);if(t){const n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){const t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){const t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:Ne(t[1])}}tag(e){const t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&/^<a /i.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&/^<\/a>/i.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&/^<(pre|code|kbd|script)(\s|>)/i.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&/^<\/(pre|code|kbd|script)(\s|>)/i.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){const t=this.rules.inline.link.exec(e);if(t){const n=t[2].trim();if(!this.options.pedantic&&/^</.test(n)){if(!/>$/.test(n))return;const r=nn(n.slice(0,-1),"\\");if((n.length-r.length)%2===0)return}else{const r=yr(t[2],"()");if(r>-1){const l=(t[0].indexOf("!")===0?5:4)+t[1].length+r;t[2]=t[2].substring(0,r),t[0]=t[0].substring(0,l).trim(),t[3]=""}}let o=t[2],a="";if(this.options.pedantic){const r=/^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(o);r&&(o=r[1],a=r[3])}else a=t[3]?t[3].slice(1,-1):"";return o=o.trim(),/^</.test(o)&&(this.options.pedantic&&!/>$/.test(n)?o=o.slice(1):o=o.slice(1,-1)),co(t,{href:o&&o.replace(this.rules.inline.anyPunctuation,"$1"),title:a&&a.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){const o=(n[2]||n[1]).replace(/\s+/g," "),a=t[o.toLowerCase()];if(!a){const r=n[0].charAt(0);return{type:"text",raw:r,text:r}}return co(n,a,n[0],this.lexer)}}emStrong(e,t,n=""){let o=this.rules.inline.emStrongLDelim.exec(e);if(!o||o[3]&&n.match(/[\p{L}\p{N}]/u))return;if(!(o[1]||o[2]||"")||!n||this.rules.inline.punctuation.exec(n)){const r=[...o[0]].length-1;let i,l,d=r,p=0;const m=o[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(m.lastIndex=0,t=t.slice(-1*e.length+r);(o=m.exec(t))!=null;){if(i=o[1]||o[2]||o[3]||o[4]||o[5]||o[6],!i)continue;if(l=[...i].length,o[3]||o[4]){d+=l;continue}else if((o[5]||o[6])&&r%3&&!((r+l)%3)){p+=l;continue}if(d-=l,d>0)continue;l=Math.min(l,l+d+p);const u=[...o[0]][0].length,f=e.slice(0,r+o.index+u+l);if(Math.min(r,l)%2){const L=f.slice(1,-1);return{type:"em",raw:f,text:L,tokens:this.lexer.inlineTokens(L)}}const y=f.slice(2,-2);return{type:"strong",raw:f,text:y,tokens:this.lexer.inlineTokens(y)}}}}codespan(e){const t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(/\n/g," ");const o=/[^ ]/.test(n),a=/^ /.test(n)&&/ $/.test(n);return o&&a&&(n=n.substring(1,n.length-1)),n=Ne(n,!0),{type:"codespan",raw:t[0],text:n}}}br(e){const t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){const t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){const t=this.rules.inline.autolink.exec(e);if(t){let n,o;return t[2]==="@"?(n=Ne(t[1]),o="mailto:"+n):(n=Ne(t[1]),o=n),{type:"link",raw:t[0],text:n,href:o,tokens:[{type:"text",raw:n,text:n}]}}}url(e){var n;let t;if(t=this.rules.inline.url.exec(e)){let o,a;if(t[2]==="@")o=Ne(t[0]),a="mailto:"+o;else{let r;do r=t[0],t[0]=((n=this.rules.inline._backpedal.exec(t[0]))==null?void 0:n[0])??"";while(r!==t[0]);o=Ne(t[0]),t[1]==="www."?a="http://"+t[0]:a=t[0]}return{type:"link",raw:t[0],text:o,href:a,tokens:[{type:"text",raw:o,text:o}]}}}inlineText(e){const t=this.rules.inline.text.exec(e);if(t){let n;return this.lexer.state.inRawBlock?n=t[0]:n=Ne(t[0]),{type:"text",raw:t[0],text:n}}}}const vr=/^(?: *(?:\n|$))+/,Er=/^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,kr=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,qt=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Sr=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,_o=/(?:[*+-]|\d{1,9}[.)])/,No=ce(/^(?!bull |blockCode|fences|blockquote|heading|html)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html))+?)\n {0,3}(=+|-+) *(?:\n+|$)/).replace(/bull/g,_o).replace(/blockCode/g,/ {4}/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).getRegex(),fs=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Tr=/^[^\n]+/,ms=/(?!\s*\])(?:\\.|[^\[\]\\])+/,Ar=ce(/^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/).replace("label",ms).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Ir=ce(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,_o).getRegex(),kn="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",gs=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Lr=ce("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))","i").replace("comment",gs).replace("tag",kn).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Oo=ce(fs).replace("hr",qt).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",kn).getRegex(),Cr=ce(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Oo).getRegex(),hs={blockquote:Cr,code:Er,def:Ar,fences:kr,heading:Sr,hr:qt,html:Lr,lheading:No,list:Ir,newline:vr,paragraph:Oo,table:zt,text:Tr},po=ce("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",qt).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code"," {4}[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",kn).getRegex(),Rr={...hs,table:po,paragraph:ce(fs).replace("hr",qt).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",po).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",kn).getRegex()},Dr={...hs,html:ce(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",gs).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:zt,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:ce(fs).replace("hr",qt).replace("heading",` *#{1,6} *[^
]`).replace("lheading",No).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Po=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,$r=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Mo=/^( {2,}|\\)\n(?!\s*$)/,_r=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Gt="\\p{P}\\p{S}",Nr=ce(/^((?![*_])[\spunctuation])/,"u").replace(/punctuation/g,Gt).getRegex(),Or=/\[[^[\]]*?\]\([^\(\)]*?\)|`[^`]*?`|<[^<>]*?>/g,Pr=ce(/^(?:\*+(?:((?!\*)[punct])|[^\s*]))|^_+(?:((?!_)[punct])|([^\s_]))/,"u").replace(/punct/g,Gt).getRegex(),Mr=ce("^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)[punct](\\*+)(?=[\\s]|$)|[^punct\\s](\\*+)(?!\\*)(?=[punct\\s]|$)|(?!\\*)[punct\\s](\\*+)(?=[^punct\\s])|[\\s](\\*+)(?!\\*)(?=[punct])|(?!\\*)[punct](\\*+)(?!\\*)(?=[punct])|[^punct\\s](\\*+)(?=[^punct\\s])","gu").replace(/punct/g,Gt).getRegex(),Br=ce("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)[punct](_+)(?=[\\s]|$)|[^punct\\s](_+)(?!_)(?=[punct\\s]|$)|(?!_)[punct\\s](_+)(?=[^punct\\s])|[\\s](_+)(?!_)(?=[punct])|(?!_)[punct](_+)(?!_)(?=[punct])","gu").replace(/punct/g,Gt).getRegex(),Ur=ce(/\\([punct])/,"gu").replace(/punct/g,Gt).getRegex(),zr=ce(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),jr=ce(gs).replace("(?:-->|$)","-->").getRegex(),Hr=ce("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",jr).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),gn=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,Fr=ce(/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/).replace("label",gn).replace("href",/<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Bo=ce(/^!?\[(label)\]\[(ref)\]/).replace("label",gn).replace("ref",ms).getRegex(),Uo=ce(/^!?\[(ref)\](?:\[\])?/).replace("ref",ms).getRegex(),Wr=ce("reflink|nolink(?!\\()","g").replace("reflink",Bo).replace("nolink",Uo).getRegex(),bs={_backpedal:zt,anyPunctuation:Ur,autolink:zr,blockSkip:Or,br:Mo,code:$r,del:zt,emStrongLDelim:Pr,emStrongRDelimAst:Mr,emStrongRDelimUnd:Br,escape:Po,link:Fr,nolink:Uo,punctuation:Nr,reflink:Bo,reflinkSearch:Wr,tag:Hr,text:_r,url:zt},qr={...bs,link:ce(/^!?\[(label)\]\((.*?)\)/).replace("label",gn).getRegex(),reflink:ce(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",gn).getRegex()},ss={...bs,escape:ce(Po).replace("])","~|])").getRegex(),url:ce(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},Gr={...ss,br:ce(Mo).replace("{2,}","*").getRegex(),text:ce(ss.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},sn={normal:hs,gfm:Rr,pedantic:Dr},Ot={normal:bs,gfm:ss,breaks:Gr,pedantic:qr};class Ze{constructor(e){de(this,"tokens");de(this,"options");de(this,"state");de(this,"tokenizer");de(this,"inlineQueue");this.tokens=[],this.tokens.links=Object.create(null),this.options=e||bt,this.options.tokenizer=this.options.tokenizer||new mn,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const t={block:sn.normal,inline:Ot.normal};this.options.pedantic?(t.block=sn.pedantic,t.inline=Ot.pedantic):this.options.gfm&&(t.block=sn.gfm,this.options.breaks?t.inline=Ot.breaks:t.inline=Ot.gfm),this.tokenizer.rules=t}static get rules(){return{block:sn,inline:Ot}}static lex(e,t){return new Ze(t).lex(e)}static lexInline(e,t){return new Ze(t).inlineTokens(e)}lex(e){e=e.replace(/\r\n|\r/g,`
`),this.blockTokens(e,this.tokens);for(let t=0;t<this.inlineQueue.length;t++){const n=this.inlineQueue[t];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,t=[]){this.options.pedantic?e=e.replace(/\t/g,"    ").replace(/^ +$/gm,""):e=e.replace(/^( *)(\t+)/gm,(i,l,d)=>l+"    ".repeat(d.length));let n,o,a,r;for(;e;)if(!(this.options.extensions&&this.options.extensions.block&&this.options.extensions.block.some(i=>(n=i.call({lexer:this},e,t))?(e=e.substring(n.raw.length),t.push(n),!0):!1))){if(n=this.tokenizer.space(e)){e=e.substring(n.raw.length),n.raw.length===1&&t.length>0?t[t.length-1].raw+=`
`:t.push(n);continue}if(n=this.tokenizer.code(e)){e=e.substring(n.raw.length),o=t[t.length-1],o&&(o.type==="paragraph"||o.type==="text")?(o.raw+=`
`+n.raw,o.text+=`
`+n.text,this.inlineQueue[this.inlineQueue.length-1].src=o.text):t.push(n);continue}if(n=this.tokenizer.fences(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.heading(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.hr(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.blockquote(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.list(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.html(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.def(e)){e=e.substring(n.raw.length),o=t[t.length-1],o&&(o.type==="paragraph"||o.type==="text")?(o.raw+=`
`+n.raw,o.text+=`
`+n.raw,this.inlineQueue[this.inlineQueue.length-1].src=o.text):this.tokens.links[n.tag]||(this.tokens.links[n.tag]={href:n.href,title:n.title});continue}if(n=this.tokenizer.table(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.lheading(e)){e=e.substring(n.raw.length),t.push(n);continue}if(a=e,this.options.extensions&&this.options.extensions.startBlock){let i=1/0;const l=e.slice(1);let d;this.options.extensions.startBlock.forEach(p=>{d=p.call({lexer:this},l),typeof d=="number"&&d>=0&&(i=Math.min(i,d))}),i<1/0&&i>=0&&(a=e.substring(0,i+1))}if(this.state.top&&(n=this.tokenizer.paragraph(a))){o=t[t.length-1],r&&o.type==="paragraph"?(o.raw+=`
`+n.raw,o.text+=`
`+n.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=o.text):t.push(n),r=a.length!==e.length,e=e.substring(n.raw.length);continue}if(n=this.tokenizer.text(e)){e=e.substring(n.raw.length),o=t[t.length-1],o&&o.type==="text"?(o.raw+=`
`+n.raw,o.text+=`
`+n.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=o.text):t.push(n);continue}if(e){const i="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(i);break}else throw new Error(i)}}return this.state.top=!0,t}inline(e,t=[]){return this.inlineQueue.push({src:e,tokens:t}),t}inlineTokens(e,t=[]){let n,o,a,r=e,i,l,d;if(this.tokens.links){const p=Object.keys(this.tokens.links);if(p.length>0)for(;(i=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)p.includes(i[0].slice(i[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,i.index)+"["+"a".repeat(i[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(i=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)r=r.slice(0,i.index)+"["+"a".repeat(i[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);for(;(i=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,i.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;e;)if(l||(d=""),l=!1,!(this.options.extensions&&this.options.extensions.inline&&this.options.extensions.inline.some(p=>(n=p.call({lexer:this},e,t))?(e=e.substring(n.raw.length),t.push(n),!0):!1))){if(n=this.tokenizer.escape(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.tag(e)){e=e.substring(n.raw.length),o=t[t.length-1],o&&n.type==="text"&&o.type==="text"?(o.raw+=n.raw,o.text+=n.text):t.push(n);continue}if(n=this.tokenizer.link(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(n.raw.length),o=t[t.length-1],o&&n.type==="text"&&o.type==="text"?(o.raw+=n.raw,o.text+=n.text):t.push(n);continue}if(n=this.tokenizer.emStrong(e,r,d)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.codespan(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.br(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.del(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.autolink(e)){e=e.substring(n.raw.length),t.push(n);continue}if(!this.state.inLink&&(n=this.tokenizer.url(e))){e=e.substring(n.raw.length),t.push(n);continue}if(a=e,this.options.extensions&&this.options.extensions.startInline){let p=1/0;const m=e.slice(1);let u;this.options.extensions.startInline.forEach(f=>{u=f.call({lexer:this},m),typeof u=="number"&&u>=0&&(p=Math.min(p,u))}),p<1/0&&p>=0&&(a=e.substring(0,p+1))}if(n=this.tokenizer.inlineText(a)){e=e.substring(n.raw.length),n.raw.slice(-1)!=="_"&&(d=n.raw.slice(-1)),l=!0,o=t[t.length-1],o&&o.type==="text"?(o.raw+=n.raw,o.text+=n.text):t.push(n);continue}if(e){const p="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(p);break}else throw new Error(p)}}return t}}class hn{constructor(e){de(this,"options");this.options=e||bt}code(e,t,n){var a;const o=(a=(t||"").match(/^\S*/))==null?void 0:a[0];return e=e.replace(/\n$/,"")+`
`,o?'<pre><code class="language-'+Ne(o)+'">'+(n?e:Ne(e,!0))+`</code></pre>
`:"<pre><code>"+(n?e:Ne(e,!0))+`</code></pre>
`}blockquote(e){return`<blockquote>
${e}</blockquote>
`}html(e,t){return e}heading(e,t,n){return`<h${t}>${e}</h${t}>
`}hr(){return`<hr>
`}list(e,t,n){const o=t?"ol":"ul",a=t&&n!==1?' start="'+n+'"':"";return"<"+o+a+`>
`+e+"</"+o+`>
`}listitem(e,t,n){return`<li>${e}</li>
`}checkbox(e){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph(e){return`<p>${e}</p>
`}table(e,t){return t&&(t=`<tbody>${t}</tbody>`),`<table>
<thead>
`+e+`</thead>
`+t+`</table>
`}tablerow(e){return`<tr>
${e}</tr>
`}tablecell(e,t){const n=t.header?"th":"td";return(t.align?`<${n} align="${t.align}">`:`<${n}>`)+e+`</${n}>
`}strong(e){return`<strong>${e}</strong>`}em(e){return`<em>${e}</em>`}codespan(e){return`<code>${e}</code>`}br(){return"<br>"}del(e){return`<del>${e}</del>`}link(e,t,n){const o=io(e);if(o===null)return n;e=o;let a='<a href="'+e+'"';return t&&(a+=' title="'+t+'"'),a+=">"+n+"</a>",a}image(e,t,n){const o=io(e);if(o===null)return n;e=o;let a=`<img src="${e}" alt="${n}"`;return t&&(a+=` title="${t}"`),a+=">",a}text(e){return e}}class xs{strong(e){return e}em(e){return e}codespan(e){return e}del(e){return e}html(e){return e}text(e){return e}link(e,t,n){return""+n}image(e,t,n){return""+n}br(){return""}}class Xe{constructor(e){de(this,"options");de(this,"renderer");de(this,"textRenderer");this.options=e||bt,this.options.renderer=this.options.renderer||new hn,this.renderer=this.options.renderer,this.renderer.options=this.options,this.textRenderer=new xs}static parse(e,t){return new Xe(t).parse(e)}static parseInline(e,t){return new Xe(t).parseInline(e)}parse(e,t=!0){let n="";for(let o=0;o<e.length;o++){const a=e[o];if(this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[a.type]){const r=a,i=this.options.extensions.renderers[r.type].call({parser:this},r);if(i!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(r.type)){n+=i||"";continue}}switch(a.type){case"space":continue;case"hr":{n+=this.renderer.hr();continue}case"heading":{const r=a;n+=this.renderer.heading(this.parseInline(r.tokens),r.depth,br(this.parseInline(r.tokens,this.textRenderer)));continue}case"code":{const r=a;n+=this.renderer.code(r.text,r.lang,!!r.escaped);continue}case"table":{const r=a;let i="",l="";for(let p=0;p<r.header.length;p++)l+=this.renderer.tablecell(this.parseInline(r.header[p].tokens),{header:!0,align:r.align[p]});i+=this.renderer.tablerow(l);let d="";for(let p=0;p<r.rows.length;p++){const m=r.rows[p];l="";for(let u=0;u<m.length;u++)l+=this.renderer.tablecell(this.parseInline(m[u].tokens),{header:!1,align:r.align[u]});d+=this.renderer.tablerow(l)}n+=this.renderer.table(i,d);continue}case"blockquote":{const r=a,i=this.parse(r.tokens);n+=this.renderer.blockquote(i);continue}case"list":{const r=a,i=r.ordered,l=r.start,d=r.loose;let p="";for(let m=0;m<r.items.length;m++){const u=r.items[m],f=u.checked,y=u.task;let L="";if(u.task){const x=this.renderer.checkbox(!!f);d?u.tokens.length>0&&u.tokens[0].type==="paragraph"?(u.tokens[0].text=x+" "+u.tokens[0].text,u.tokens[0].tokens&&u.tokens[0].tokens.length>0&&u.tokens[0].tokens[0].type==="text"&&(u.tokens[0].tokens[0].text=x+" "+u.tokens[0].tokens[0].text)):u.tokens.unshift({type:"text",text:x+" "}):L+=x+" "}L+=this.parse(u.tokens,d),p+=this.renderer.listitem(L,y,!!f)}n+=this.renderer.list(p,i,l);continue}case"html":{const r=a;n+=this.renderer.html(r.text,r.block);continue}case"paragraph":{const r=a;n+=this.renderer.paragraph(this.parseInline(r.tokens));continue}case"text":{let r=a,i=r.tokens?this.parseInline(r.tokens):r.text;for(;o+1<e.length&&e[o+1].type==="text";)r=e[++o],i+=`
`+(r.tokens?this.parseInline(r.tokens):r.text);n+=t?this.renderer.paragraph(i):i;continue}default:{const r='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(r),"";throw new Error(r)}}}return n}parseInline(e,t){t=t||this.renderer;let n="";for(let o=0;o<e.length;o++){const a=e[o];if(this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[a.type]){const r=this.options.extensions.renderers[a.type].call({parser:this},a);if(r!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(a.type)){n+=r||"";continue}}switch(a.type){case"escape":{const r=a;n+=t.text(r.text);break}case"html":{const r=a;n+=t.html(r.text);break}case"link":{const r=a;n+=t.link(r.href,r.title,this.parseInline(r.tokens,t));break}case"image":{const r=a;n+=t.image(r.href,r.title,r.text);break}case"strong":{const r=a;n+=t.strong(this.parseInline(r.tokens,t));break}case"em":{const r=a;n+=t.em(this.parseInline(r.tokens,t));break}case"codespan":{const r=a;n+=t.codespan(r.text);break}case"br":{n+=t.br();break}case"del":{const r=a;n+=t.del(this.parseInline(r.tokens,t));break}case"text":{const r=a;n+=t.text(r.text);break}default:{const r='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(r),"";throw new Error(r)}}}return n}}class jt{constructor(e){de(this,"options");this.options=e||bt}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}}de(jt,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens"]));var ht,os,zo;class Vr{constructor(...e){Fs(this,ht);de(this,"defaults",us());de(this,"options",this.setOptions);de(this,"parse",en(this,ht,os).call(this,Ze.lex,Xe.parse));de(this,"parseInline",en(this,ht,os).call(this,Ze.lexInline,Xe.parseInline));de(this,"Parser",Xe);de(this,"Renderer",hn);de(this,"TextRenderer",xs);de(this,"Lexer",Ze);de(this,"Tokenizer",mn);de(this,"Hooks",jt);this.use(...e)}walkTokens(e,t){var o,a;let n=[];for(const r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{const i=r;for(const l of i.header)n=n.concat(this.walkTokens(l.tokens,t));for(const l of i.rows)for(const d of l)n=n.concat(this.walkTokens(d.tokens,t));break}case"list":{const i=r;n=n.concat(this.walkTokens(i.items,t));break}default:{const i=r;(a=(o=this.defaults.extensions)==null?void 0:o.childTokens)!=null&&a[i.type]?this.defaults.extensions.childTokens[i.type].forEach(l=>{const d=i[l].flat(1/0);n=n.concat(this.walkTokens(d,t))}):i.tokens&&(n=n.concat(this.walkTokens(i.tokens,t)))}}return n}use(...e){const t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{const o={...n};if(o.async=this.defaults.async||o.async||!1,n.extensions&&(n.extensions.forEach(a=>{if(!a.name)throw new Error("extension name required");if("renderer"in a){const r=t.renderers[a.name];r?t.renderers[a.name]=function(...i){let l=a.renderer.apply(this,i);return l===!1&&(l=r.apply(this,i)),l}:t.renderers[a.name]=a.renderer}if("tokenizer"in a){if(!a.level||a.level!=="block"&&a.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");const r=t[a.level];r?r.unshift(a.tokenizer):t[a.level]=[a.tokenizer],a.start&&(a.level==="block"?t.startBlock?t.startBlock.push(a.start):t.startBlock=[a.start]:a.level==="inline"&&(t.startInline?t.startInline.push(a.start):t.startInline=[a.start]))}"childTokens"in a&&a.childTokens&&(t.childTokens[a.name]=a.childTokens)}),o.extensions=t),n.renderer){const a=this.defaults.renderer||new hn(this.defaults);for(const r in n.renderer){if(!(r in a))throw new Error(`renderer '${r}' does not exist`);if(r==="options")continue;const i=r,l=n.renderer[i],d=a[i];a[i]=(...p)=>{let m=l.apply(a,p);return m===!1&&(m=d.apply(a,p)),m||""}}o.renderer=a}if(n.tokenizer){const a=this.defaults.tokenizer||new mn(this.defaults);for(const r in n.tokenizer){if(!(r in a))throw new Error(`tokenizer '${r}' does not exist`);if(["options","rules","lexer"].includes(r))continue;const i=r,l=n.tokenizer[i],d=a[i];a[i]=(...p)=>{let m=l.apply(a,p);return m===!1&&(m=d.apply(a,p)),m}}o.tokenizer=a}if(n.hooks){const a=this.defaults.hooks||new jt;for(const r in n.hooks){if(!(r in a))throw new Error(`hook '${r}' does not exist`);if(r==="options")continue;const i=r,l=n.hooks[i],d=a[i];jt.passThroughHooks.has(r)?a[i]=p=>{if(this.defaults.async)return Promise.resolve(l.call(a,p)).then(u=>d.call(a,u));const m=l.call(a,p);return d.call(a,m)}:a[i]=(...p)=>{let m=l.apply(a,p);return m===!1&&(m=d.apply(a,p)),m}}o.hooks=a}if(n.walkTokens){const a=this.defaults.walkTokens,r=n.walkTokens;o.walkTokens=function(i){let l=[];return l.push(r.call(this,i)),a&&(l=l.concat(a.call(this,i))),l}}this.defaults={...this.defaults,...o}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Ze.lex(e,t??this.defaults)}parser(e,t){return Xe.parse(e,t??this.defaults)}}ht=new WeakSet,os=function(e,t){return(n,o)=>{const a={...o},r={...this.defaults,...a};this.defaults.async===!0&&a.async===!1&&(r.silent||console.warn("marked(): The async option was set to true by an extension. The async: false option sent to parse will be ignored."),r.async=!0);const i=en(this,ht,zo).call(this,!!r.silent,!!r.async);if(typeof n>"u"||n===null)return i(new Error("marked(): input parameter is undefined or null"));if(typeof n!="string")return i(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(n)+", string expected"));if(r.hooks&&(r.hooks.options=r),r.async)return Promise.resolve(r.hooks?r.hooks.preprocess(n):n).then(l=>e(l,r)).then(l=>r.hooks?r.hooks.processAllTokens(l):l).then(l=>r.walkTokens?Promise.all(this.walkTokens(l,r.walkTokens)).then(()=>l):l).then(l=>t(l,r)).then(l=>r.hooks?r.hooks.postprocess(l):l).catch(i);try{r.hooks&&(n=r.hooks.preprocess(n));let l=e(n,r);r.hooks&&(l=r.hooks.processAllTokens(l)),r.walkTokens&&this.walkTokens(l,r.walkTokens);let d=t(l,r);return r.hooks&&(d=r.hooks.postprocess(d)),d}catch(l){return i(l)}}},zo=function(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){const o="<p>An error occurred:</p><pre>"+Ne(n.message+"",!0)+"</pre>";return t?Promise.resolve(o):o}if(t)return Promise.reject(n);throw n}};const ut=new Vr;function re(s,e){return ut.parse(s,e)}re.options=re.setOptions=function(s){return ut.setOptions(s),re.defaults=ut.defaults,Ro(re.defaults),re};re.getDefaults=us;re.defaults=bt;re.use=function(...s){return ut.use(...s),re.defaults=ut.defaults,Ro(re.defaults),re};re.walkTokens=function(s,e){return ut.walkTokens(s,e)};re.parseInline=ut.parseInline;re.Parser=Xe;re.parser=Xe.parse;re.Renderer=hn;re.TextRenderer=xs;re.Lexer=Ze;re.lexer=Ze.lex;re.Tokenizer=mn;re.Hooks=jt;re.parse=re;re.options;re.setOptions;re.use;re.walkTokens;re.parseInline;Xe.parse;Ze.lex;const ft=new re.Renderer,Kr=ft.link.bind(ft);ft.code=(s,e)=>{const t=e||"";if(t==="mermaid"){const o=s.split(`
`);let a='<div class="flex flex-col items-center gap-4 bg-slate-950 p-6 rounded-lg border border-slate-800/80 my-4 select-none">';const r=new Map,i=[];if(o.forEach(l=>{const d=l.trim();if(!d)return;const p=d.match(/^([A-Za-z0-9_-]+)\[(.*?)\]$/);if(p){r.set(p[1],p[2]);return}const m=d.match(/^([A-Za-z0-9_-]+)\s*-->\s*(?:\|(.*?)\|)?\s*([A-Za-z0-9_-]+)$/);if(m){const u=m[1],f=m[2]||"",y=m[3];i.push({from:u,to:y,label:f}),r.has(u)||r.set(u,u),r.has(y)||r.set(y,y)}}),r.size>0){a+='<div class="space-y-4 w-full flex flex-col items-center">';const l=new Set(i.map(u=>u.to)),d=Array.from(r.keys()).filter(u=>!l.has(u)),p=Array.from(r.keys()).filter(u=>l.has(u)),m=u=>{const f=r.get(u)||u;return`<div class="px-4 py-2 bg-teal-950/40 text-teal-400 border border-teal-800 rounded font-mono text-xs shadow-[0_0_10px_rgba(20,184,166,0.15)]">${_(f)}</div>`};return d.length>0&&(a+='<div class="flex flex-wrap gap-4 justify-center">',a+=d.map(m).join(""),a+="</div>"),i.length>0&&(a+='<div class="text-slate-650 text-xs">↓</div>'),p.length>0&&(a+='<div class="flex flex-wrap gap-4 justify-center">',a+=p.map(m).join(""),a+="</div>"),a+="</div></div>",a}}let n=s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;");if(t){const o=/\b(const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|import|export|class|extends|new|try|catch|finally|throw|def|print|elif|in|is|not|and|or|lambda|as|with|pass|public|private|protected|static|void|int|string|boolean|select|from|where|insert|update|delete|create|table|drop|values|into|join|on|group|by|order|true|false|null|None)\b/g,a=/(["'`])(.*?)\1/g,r=/(\/\/.*|#.*)/g;n=n.replace(r,'<span class="text-slate-500">$1</span>'),n=n.replace(a,'<span class="text-amber-400">$0</span>'),n=n.replace(o,'<span class="text-teal-400 font-bold">$1</span>')}return`<pre class="bg-slate-950 p-4 rounded-lg overflow-x-auto border border-slate-800/80 my-4 text-xs font-mono"><code class="language-${t}">${n}</code></pre>`};ft.link=(s,e,t)=>Kr(s,e,t).replace("<a ",'<a target="_blank" rel="noopener noreferrer" class="text-teal-400 hover:underline" ');ft.heading=(s,e)=>{const t=s.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");return`<h${e} id="${t}">${s}</h${e}>`};ft.table=(s,e)=>`<div class="overflow-x-auto my-4 max-w-full"><table class="w-full">${s}${e}</table></div>`;re.setOptions({renderer:ft,gfm:!0,breaks:!0});function jo(){try{return parseInt(localStorage.getItem("secops-sanitize-count")||"0",10)}catch{return 0}}function Ho(){try{const s=jo();localStorage.setItem("secops-sanitize-count",(s+1).toString())}catch{}}function It(s){Ho();const e=re.parse(s);Ut.addHook("uponSanitizeElement",n=>{if(n instanceof Element){const o=n.tagName.toLowerCase();if(o==="video"||o==="audio"||o==="iframe"||o==="source"||o==="img"){const a=n.getAttribute("src");if(a){const r=a.trim().toLowerCase();r.startsWith("data:")||r.startsWith("blob:")||r.startsWith("attachment:")||r.startsWith("/")||r.startsWith("./")||r.startsWith("../")||(n.setAttribute("src","#"),console.warn("SECURITY BLOCK: Prevented connection to remote source URL:",a))}o==="iframe"&&n.setAttribute("sandbox","allow-scripts")}}});const t=Ut.sanitize(e,{ALLOWED_TAGS:["h1","h2","h3","h4","h5","h6","p","br","hr","a","span","ul","ol","li","strong","em","code","pre","blockquote","table","thead","tbody","tr","th","td","div","img","input","video","audio","iframe","source"],ALLOWED_ATTR:["href","target","rel","class","id","align","src","alt","type","checked","disabled","controls","sandbox","width","height"]});return Ut.removeHook("uponSanitizeElement"),t}function rn(s){return s.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F\u200B-\u200D\uFEFF\u202A-\u202E]/g,"")}function _(s){return s.replace(/[&<>"']/g,e=>{switch(e){case"&":return"&amp;";case"<":return"&lt;";case">":return"&gt;";case'"':return"&quot;";case"'":return"&#039;";default:return e}})}function Yr(s){if(Ho(),typeof s!="object"||s===null)throw new Error("Invalid backup structure: Root must be an object.");const{slug:e,title:t,content:n,updatedAt:o,tags:a}=s;if(typeof e!="string"||!/^[a-z0-9-_]+$/.test(e))throw new Error("Invalid slug format: Slugs must contain only lowercase alphanumeric characters, hyphens, and underscores.");const r=rn(e);if(typeof t!="string"||t.trim().length===0||t.length>100)throw new Error("Invalid title format: Must be a non-empty string under 100 characters.");const i=rn(t);if(typeof n!="string"||n.length>5e4)throw new Error("Invalid content format: Must be a string under 50,000 characters.");if(typeof o!="number"||isNaN(o))throw new Error("Invalid updated timestamp format.");if(!Array.isArray(a))throw new Error("Tags must be an array of strings.");const l=a.map(d=>{if(typeof d!="string")throw new Error("Tags must be strings.");return rn(Ut.sanitize(d)).slice(0,30)});return{slug:r,title:Ut.sanitize(i),content:n,updatedAt:o,tags:l,isSystem:!!s.isSystem}}async function Ce(s){const e=new TextEncoder,t=e.encode("secops-intel-salt-2026"),n=await window.crypto.subtle.importKey("raw",e.encode(s),{name:"PBKDF2"},!1,["deriveKey"]);return window.crypto.subtle.deriveKey({name:"PBKDF2",salt:t,iterations:1e5,hash:"SHA-256"},n,{name:"AES-GCM",length:256},!1,["encrypt","decrypt"])}async function rt(s,e){const t=new TextEncoder,n=window.crypto.getRandomValues(new Uint8Array(12)),o=await window.crypto.subtle.encrypt({name:"AES-GCM",iv:n},e,t.encode(s)),a=Array.from(n).map(d=>d.toString(16).padStart(2,"0")).join(""),r=new Uint8Array(o);let i="";for(let d=0;d<r.byteLength;d++)i+=String.fromCharCode(r[d]);const l=btoa(i);return`${a}:${l}`}async function ye(s,e){const t=s.split(":");if(t.length!==2)throw new Error("Invalid cipher format");const[n,o]=t,a=new Uint8Array(n.match(/.{1,2}/g).map(d=>parseInt(d,16))),r=atob(o),i=new Uint8Array(r.length);for(let d=0;d<r.length;d++)i[d]=r.charCodeAt(d);const l=await window.crypto.subtle.decrypt({name:"AES-GCM",iv:a},e,i);return new TextDecoder().decode(l)}async function Je(s){const e=`${s.slug}|${s.title}|${s.content}|${s.updatedAt}|${s.tags.join(",")}|secops-integrity-salt-2026`,t=new TextEncoder().encode(e),n=await crypto.subtle.digest("SHA-256",t);return Array.from(new Uint8Array(n)).map(a=>a.toString(16).padStart(2,"0")).join("")}let ne="home",et=!1,Be=!1,Fe="",Pt="",ue=[],Bt=null,Fo=navigator.onLine?"SECURE_LINK":"OFFLINE_CACHE",pt=localStorage.getItem("secops-wiki-theme")||(window.matchMedia&&window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark");window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",s=>{localStorage.getItem("secops-wiki-theme")||(pt=s.matches?"dark":"light",Es())});let at=localStorage.getItem("secops-wiki-mask-encrypted")==="true",on=localStorage.getItem("secops-wiki-split-screen")!=="false",ln={},he=null;async function pe(s,e){const t={id:`${Date.now()}-${Math.random().toString(36).substring(2,11)}`,timestamp:Date.now(),event:s,details:e};await $a(t)}async function We(s){const e=await Aa(s);if(!e)return null;if(e.isEncryptedAtRest&&e.encryptedData){if(!he)return{slug:e.slug,title:"[DATABASE LOCKED]",content:"Master passphrase required to unlock this database record.",tags:[],isSystem:e.isSystem,isEncrypted:!1,updatedAt:e.updatedAt};try{const t=await ye(e.encryptedData,he),n=JSON.parse(t);return{slug:e.slug,title:n.title,content:n.content,tags:n.tags,isSystem:e.isSystem,isEncrypted:n.isEncrypted,signature:n.signature,updatedAt:n.updatedAt}}catch(t){return console.error("Failed to decrypt page at rest:",t),null}}return e}async function Oe(s){if(localStorage.getItem("secops-wiki-db-encrypted")==="true"&&he){const t={title:s.title,content:s.content,tags:s.tags,isEncrypted:s.isEncrypted,signature:s.signature,updatedAt:s.updatedAt},n=await rt(JSON.stringify(t),he),o={slug:s.slug,title:"[REDACTED AT REST]",content:"[REDACTED AT REST]",tags:[],isSystem:s.isSystem,isEncryptedAtRest:!0,encryptedData:n,updatedAt:s.updatedAt};await un(o)}else await un(s);localStorage.setItem("secops-wiki-last-update",Date.now().toString())}async function bn(){const s=await Wt(),e=[];for(const t of s){const n=await We(t.slug);n&&e.push(n)}return e}async function ys(){try{const s=await So();ln={},s.forEach(e=>{ln[e.tag]=e.color})}catch{ln={}}}function Zr(s){const e=ln[s]||"slate";let t="bg-slate-950/20 text-slate-400 border-slate-900/30";return e==="emerald"?t="bg-emerald-950/20 text-emerald-400 border-emerald-900/30":e==="blue"?t="bg-blue-950/20 text-blue-400 border-blue-900/30":e==="red"?t="bg-red-950/20 text-red-400 border-red-900/30":e==="amber"&&(t="bg-amber-950/20 text-amber-400 border-amber-900/30"),`
    <span class="text-[10px] font-mono px-2 py-0.5 rounded border ${t}">#${_(s)}</span>
  `}function Xr(s){const e=ue.filter(r=>r.slug!==ne);if(e.length===0)return;e.sort((r,i)=>i.title.length-r.title.length);const t=r=>r.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"),n=[],o=document.createTreeWalker(s,NodeFilter.SHOW_TEXT,{acceptNode:r=>{let i=r.parentElement;for(;i&&i!==s;){const l=i.tagName.toLowerCase();if(l==="a"||l==="code"||l==="pre")return NodeFilter.FILTER_REJECT;i=i.parentElement}return NodeFilter.FILTER_ACCEPT}});let a=o.nextNode();for(;a;)n.push(a),a=o.nextNode();for(const r of n){const i=r.parentNode;if(!i)continue;let l=r.nodeValue||"";for(const d of e){if(d.isEncrypted&&!J&&at)continue;const m=t(d.title),u=t(d.slug),y=new RegExp(`\\b(${m}|${u})\\b`,"i").exec(l);if(y){const L=y[0],x=y.index,N=l.substring(0,x),G=l.substring(x+L.length),v=document.createTextNode(N),w=document.createElement("a");w.href=`#/page/${d.slug}`,w.className="autolink text-teal-400 hover:text-teal-350 underline decoration-dotted transition",w.textContent=L;const E=document.createTextNode(G);i.insertBefore(v,r),i.insertBefore(w,r),i.insertBefore(E,r),i.removeChild(r);break}}}}function Jr(s){if(!s||s==="system"||s==="graph")return;let e=[];try{e=JSON.parse(sessionStorage.getItem("secops-wiki-breadcrumbs")||"[]")}catch{}Array.isArray(e)||(e=[]),e=e.filter(t=>t!==s),e.unshift(s),e.length>5&&(e=e.slice(0,5)),sessionStorage.setItem("secops-wiki-breadcrumbs",JSON.stringify(e))}function Qr(s){const e=ue.find(n=>n.slug===s);return e?e.isEncrypted&&!J&&at?"[REDACTED CORE]":e.title:s}let J=null,qn=!1,Ue=0,cn=!1,dn=-1,as="";function ei(){return parseInt(localStorage.getItem("secops-decrypt-failed-attempts")||"0",10)}function Wo(s){localStorage.setItem("secops-decrypt-failed-attempts",s.toString())}function rs(){return parseInt(localStorage.getItem("secops-decrypt-lockout-until")||"0",10)}function ws(s){localStorage.setItem("secops-decrypt-lockout-until",s.toString())}function is(){return Date.now()<rs()}function ti(){const s=ei()+1;if(Wo(s),s>=3){const e=3e5*Math.pow(2,s-3);ws(Date.now()+e)}}function ni(){Wo(0),ws(0)}let Gn=null;function vs(){Gn&&clearTimeout(Gn);const s=parseInt(localStorage.getItem("secops-wiki-session-timeout")||"15",10);s!==0&&(Gn=setTimeout(()=>{J&&(J=null,alert(`SECURITY TIMEOUT: Session idle for ${s} minutes. Passphrase keys wiped from memory.`),window.location.hash.startsWith("#/page/")?window.location.hash="#/page/home":fe())},s*60*1e3))}["mousedown","mousemove","keydown","scroll","touchstart"].forEach(s=>{window.addEventListener(s,vs,{passive:!0})});vs();let dt=null;document.addEventListener("copy",()=>{var e;document.body.classList.contains("encrypted-page-active")?(e=window.getSelection())!=null&&e.toString()&&qo():dt&&(clearTimeout(dt),dt=null)});function qo(){dt&&clearTimeout(dt),dt=setTimeout(async()=>{try{await navigator.clipboard.writeText("[SECURE WIPE: Decrypted secret cleared from clipboard]"),si(),await pe("CLIPBOARD_WIPE","Automatically cleared decrypted secret from clipboard.")}catch(s){console.warn("Clipboard wipe failed:",s)}dt=null},3e4)}function si(){const s=document.getElementById("clipboard-wipe-toast");s&&s.remove();const e=document.createElement("div");e.id="clipboard-wipe-toast",e.className="fixed bottom-4 left-4 z-50 glass-panel border border-red-500/30 p-3 rounded-xl shadow-xl font-mono text-[10px] text-red-400 select-none animate-fade-in",e.innerHTML="⚠️ SECURITY WIPE: Decrypted secret cleared from clipboard.",document.body.appendChild(e),setTimeout(()=>{e.classList.add("opacity-0","transition-opacity","duration-500"),setTimeout(()=>e.remove(),500)},3e3)}function Go(s){if(s.length<8)return{valid:!1,message:"Password must be at least 8 characters long."};let e=!1,t=!1,n=!1,o=!1;const a=/[!@#$%^&*(),.?":{}|<>_+\\-]/;for(const r of s)r>="A"&&r<="Z"?e=!0:r>="a"&&r<="z"?t=!0:r>="0"&&r<="9"?n=!0:a.test(r)&&(o=!0);return!e||!t||!n||!o?{valid:!1,message:"Password must include uppercase, lowercase, numbers, and special symbols (!@#$%^&*, etc.)."}:{valid:!0,message:""}}function uo(){J&&(J=null,alert("QUICK LOCK: In-memory session keys cleared. Documents locked."),window.location.hash="#/page/home",fe())}let an=0,Vn=null;window.addEventListener("keydown",s=>{s.key==="Escape"&&(an++,Vn&&clearTimeout(Vn),an>=3?(an=0,uo()):Vn=setTimeout(()=>{an=0},1e3)),s.ctrlKey&&s.shiftKey&&s.key.toLowerCase()==="l"&&(s.preventDefault(),uo())});function Es(){const s=document.documentElement,e=document.getElementById("theme-icon-path");pt==="light"?(s.classList.add("light-theme"),e&&e.setAttribute("d","M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z")):(s.classList.remove("light-theme"),e&&e.setAttribute("d","M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z"))}function Vo(){pt=pt==="dark"?"light":"dark",localStorage.setItem("secops-wiki-theme",pt),Es()}function oi(s,e){if(!e||e.trim().length===0)return s;const t=e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"),n=new RegExp(`(?![^<>]*>)(${t})`,"gi");return s.replace(n,'<mark class="bg-teal-500/30 text-teal-300 px-0.5 rounded font-medium">$1</mark>')}function ai(s){const e=s.toLowerCase().trim();return/(sec|security|critical|panic|destruct|lock|key|auth)/.test(e)?{bg:"rgba(239, 68, 68, 0.15)",text:"#f87171",border:"rgba(239, 68, 68, 0.3)",className:"tag-color-red"}:/(doc|manual|wiki|guide|system|dashboard|home)/.test(e)?{bg:"rgba(20, 184, 166, 0.15)",text:"#2dd4bf",border:"rgba(20, 184, 166, 0.3)",className:"tag-color-teal"}:/(config|settings|sys|admin|db|telemetry)/.test(e)?{bg:"rgba(59, 130, 246, 0.15)",text:"#60a5fa",border:"rgba(59, 130, 246, 0.3)",className:"tag-color-blue"}:/(warning|caution|issue|bug|fix)/.test(e)?{bg:"rgba(245, 158, 11, 0.15)",text:"#fbbf24",border:"rgba(245, 158, 11, 0.3)",className:"tag-color-amber"}:{bg:"rgba(148, 163, 184, 0.15)",text:"#cbd5e1",border:"rgba(148, 163, 184, 0.3)",className:"tag-color-slate"}}function Ko(s,e){const t=e.toLowerCase().trim();if(!t)return 0;let n=0;const o=s.title.toLowerCase(),a=s.content.toLowerCase(),r=s.tags.map(i=>i.toLowerCase());if(o===t?n+=100:o.startsWith(t)?n+=80:o.includes(t)&&(n+=50),r.forEach(i=>{i===t?n+=30:i.includes(t)&&(n+=15)}),a.includes(t)){n+=10;const i=a.split(t).length-1;n+=Math.min(10,i)}return n}function fo(s){const e=new Uint32Array(256);for(let n=0;n<256;n++){let o=n;for(let a=0;a<8;a++)o=o&1?3988292384^o>>>1:o>>>1;e[n]=o}let t=4294967295;for(let n=0;n<s.length;n++)t=e[(t^s[n])&255]^t>>>8;return(t^4294967295)>>>0}function Yo(s){const e=new TextEncoder,t=[],n=[];let o=0;s.forEach(d=>{n.push(o);const p=e.encode(d.name),m=e.encode(d.content),u=fo(m),f=new ArrayBuffer(30),y=new DataView(f);y.setUint32(0,67324752,!0),y.setUint16(4,10,!0),y.setUint16(6,0,!0),y.setUint16(8,0,!0),y.setUint16(10,0,!0),y.setUint16(12,0,!0),y.setUint32(14,u,!0),y.setUint32(18,m.length,!0),y.setUint32(22,m.length,!0),y.setUint16(26,p.length,!0),y.setUint16(28,0,!0);const L=new Uint8Array(f);t.push(L),t.push(p),t.push(m),o+=L.length+p.length+m.length});const a=o;let r=0;s.forEach((d,p)=>{const m=e.encode(d.name),u=e.encode(d.content),f=fo(u),y=n[p],L=new ArrayBuffer(46),x=new DataView(L);x.setUint32(0,33639248,!0),x.setUint16(4,20,!0),x.setUint16(6,10,!0),x.setUint16(8,0,!0),x.setUint16(10,0,!0),x.setUint16(12,0,!0),x.setUint16(14,0,!0),x.setUint32(16,f,!0),x.setUint32(20,u.length,!0),x.setUint32(24,u.length,!0),x.setUint16(28,m.length,!0),x.setUint16(30,0,!0),x.setUint16(32,0,!0),x.setUint16(34,0,!0),x.setUint16(36,0,!0),x.setUint32(38,32,!0),x.setUint32(42,y,!0);const N=new Uint8Array(L);t.push(N),t.push(m),r+=N.length+m.length,o+=N.length+m.length});const i=new ArrayBuffer(22),l=new DataView(i);return l.setUint32(0,101010256,!0),l.setUint16(4,0,!0),l.setUint16(6,0,!0),l.setUint16(8,s.length,!0),l.setUint16(10,s.length,!0),l.setUint32(12,r,!0),l.setUint32(16,a,!0),l.setUint16(20,0,!0),t.push(new Uint8Array(i)),new Blob(t,{type:"application/zip"})}const xt=new BroadcastChannel("wiki-db-sync");xt.onmessage=async s=>{s.data==="refresh"&&(await Le(),await fe())};let ls=localStorage.getItem("secops-wiki-last-update")||"0";window.addEventListener("focus",async()=>{const s=localStorage.getItem("secops-wiki-last-update")||"0";s!==ls&&(ls=s,await Le(),await fe())});let Kn=null;const ri=15*60*1e3;let Zo;async function ii(){Es(),Zo=document.getElementById("app"),await ps(),await ys();try{await cs()}catch(e){console.warn("Failed to purge expired pages on init:",e)}try{await Ao(30)}catch(e){console.warn("Failed to auto-prune audit logs on init:",e)}ci(),localStorage.getItem("secops-wiki-db-encrypted")==="true"&&!he?Ri():(await Le(),Xo(),Qo(),window.addEventListener("hashchange",yn),window.addEventListener("online",xn),window.addEventListener("offline",xn),window.addEventListener("beforeinstallprompt",e=>{e.preventDefault(),Bt=e;const t=document.getElementById("pwa-install-btn");t&&t.classList.remove("hidden")}),window.addEventListener("keydown",e=>{var t,n;if(e.ctrlKey&&(e.key==="k"||e.key==="K"||e.key==="p"||e.key==="P")&&(e.preventDefault(),Ft()),e.ctrlKey&&(e.key==="n"||e.key==="N")&&!e.shiftKey&&(e.preventDefault(),window.location.hash="#/new"),e.key==="/"&&((t=document.activeElement)==null?void 0:t.tagName)!=="INPUT"&&((n=document.activeElement)==null?void 0:n.tagName)!=="TEXTAREA"&&(e.preventDefault(),Ft()),e.ctrlKey&&e.altKey&&(e.key==="e"||e.key==="E"))if(e.preventDefault(),et){const o=document.getElementById("edit-page-form");o&&o.requestSubmit()}else ne&&ne!=="home"&&ne!=="system"&&(window.location.hash=`#/edit/${ne}`)}),yn(),setInterval(async()=>{try{await cs()}catch(e){console.warn("Failed periodic expired page purge:",e)}},3e4))}function At(){Kn&&clearTimeout(Kn),Kn=setTimeout(li,ri),window.lastHeartbeat||(window.lastHeartbeat=Date.now()),Date.now()-window.lastHeartbeat>5*60*1e3&&(pe("SESSION_HEARTBEAT","User activity heartbeat"),window.lastHeartbeat=Date.now())}function li(){const s=document.getElementById("idle-lock-screen");if(!s)return;const e=localStorage.getItem("secops-wiki-db-encrypted")==="true";e&&(he=null,J=null,fe().catch(()=>{}));const t=localStorage.getItem("secops-wiki-webauthn-gate")==="true";if(e){s.innerHTML=`
      <div class="glass-panel border border-slate-800 p-8 rounded-xl max-w-sm w-full text-center glow-border shadow-2xl">
        <svg class="w-12 h-12 text-red-500 mx-auto mb-4 animate-pulse" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
        <h2 class="text-lg font-bold font-mono text-white mb-2 uppercase tracking-wide">TERMINAL_LOCKED</h2>
        <p class="text-slate-400 text-[10px] font-mono mb-6 leading-relaxed">System locked due to inactivity.<br>Enter master passphrase or use biometrics.</p>
        
        <form id="idle-unlock-form" class="space-y-4">
          <input type="password" id="idle-unlock-password-input" aria-label="Master key passphrase" placeholder="ENTER MASTER KEY..." required class="w-full bg-slate-950/80 border border-slate-800 focus:border-teal-500/50 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none transition font-mono text-center">
          <div class="flex gap-2">
            ${t?`
              <button type="button" id="idle-unlock-biometric-btn" class="flex-1 py-2 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-350 font-mono text-[10px] uppercase rounded transition hover:text-white flex items-center justify-center gap-1">
                Biometric
              </button>
            `:""}
            <button type="submit" class="flex-1 py-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-mono text-[10px] uppercase rounded font-bold transition">
              Unlock
            </button>
          </div>
        </form>
        <div id="idle-lock-error" class="hidden mt-3 text-[9px] font-mono text-red-400 font-bold uppercase">Invalid credentials.</div>
      </div>
    `;const n=s.querySelector("#idle-unlock-form"),o=s.querySelector("#idle-unlock-password-input"),a=s.querySelector("#idle-lock-error"),r=s.querySelector("#idle-unlock-biometric-btn");setTimeout(()=>o==null?void 0:o.focus(),50),n.addEventListener("submit",async i=>{if(i.preventDefault(),is()){alert("Lockout Alert: Too many failed attempts. Cooldown active.");return}a.classList.add("hidden");const l=o.value;try{const d=await Ce(l);await gt(d)?(he=d,await Le(),Yn(),await fe(),await pe("SESSION_RESTORE","Restored session via master passphrase.")):(a.classList.remove("hidden"),bo(),fe())}catch{a.classList.remove("hidden"),bo(),fe()}}),r&&r.addEventListener("click",async()=>{a.classList.add("hidden");try{const i=localStorage.getItem("secops-wiki-webauthn-payload")||"",l=crypto.getRandomValues(new Uint8Array(32)),d=await navigator.credentials.get({publicKey:{challenge:l,rpId:window.location.hostname||"localhost",userVerification:"required",timeout:6e4}});if(d){const p=new Uint8Array(d.rawId),m=Array.from(p).map(G=>G.toString(16).padStart(2,"0")).join(""),u=localStorage.getItem("secops-wiki-webauthn-salt")||"";if(!u)throw new Error("Biometric salt missing.");const f=`${m}:${u}`,y=await Ce(f),L=await ye(i,y),x=await Ce(L);await gt(x)?(he=x,await Le(),Yn(),await fe(),await pe("SESSION_RESTORE_BIOMETRIC","Restored session via biometric WebAuthn verification.")):a.classList.remove("hidden")}}catch(i){alert(`Biometric verification failed: ${i.message}`),await pe("WEBAUTHN_FAIL",`Idle lock biometric unlock failed: ${i.message}`)}})}else s.innerHTML=`
      <div class="glass-panel border border-slate-800 p-8 rounded-xl max-w-sm w-full text-center glow-border shadow-2xl">
        <svg class="w-12 h-12 text-red-500 mx-auto mb-4 animate-pulse" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
        <h2 class="text-lg font-bold font-mono text-white mb-2 uppercase tracking-wide">TERMINAL_LOCKED</h2>
        <p class="text-slate-400 text-[10px] font-mono mb-6 leading-relaxed">System locked due to inactivity.<br>Click restore to resume your session.</p>
        <button id="idle-unlock-btn" class="w-full py-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-mono text-[10px] uppercase font-bold rounded transition">
          RESTORE SESSION
        </button>
      </div>
    `,s.querySelector("#idle-unlock-btn").addEventListener("click",()=>{Yn()});s.classList.remove("hidden")}function Yn(){const s=document.getElementById("idle-lock-screen");s&&s.classList.add("hidden"),At()}function Xo(){let s=document.getElementById("idle-lock-screen");s||(s=document.createElement("div"),s.id="idle-lock-screen",s.className="fixed inset-0 bg-[#090d16]/95 backdrop-blur-md z-50 flex flex-col items-center justify-center hidden",document.body.appendChild(s)),At(),window.addEventListener("mousemove",At,{passive:!0}),window.addEventListener("keydown",At,{passive:!0}),window.addEventListener("click",At,{passive:!0}),window.addEventListener("scroll",At,{passive:!0})}function mo(){if(document.getElementById("pwa-update-toast"))return;const s=document.createElement("div");s.id="pwa-update-toast",s.className="fixed bottom-4 right-4 z-50 max-w-sm glass-panel border border-teal-500/30 p-4 rounded-xl shadow-2xl glow-border flex items-center justify-between gap-4 font-mono text-xs select-none",s.innerHTML=`
    <div class="flex items-center gap-2 text-teal-400">
      <svg class="w-5 h-5 text-teal-400 animate-bounce shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
      </svg>
      <div>
        <div class="font-bold text-white uppercase">UPDATE_INGESTED</div>
        <div class="text-[10px] text-slate-500">Restart session to apply updates.</div>
      </div>
    </div>
    <button id="pwa-update-reload-btn" class="px-3 py-1.5 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-bold rounded shadow-[0_0_8px_rgba(20,184,166,0.2)] transition uppercase text-[10px] shrink-0">
      RESTART
    </button>
  `,document.body.appendChild(s);const e=document.getElementById("pwa-update-reload-btn");e&&e.addEventListener("click",()=>{window.location.reload()})}function ci(){"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/wiki/sw.js").then(s=>{console.log("ServiceWorker registered successfully with scope: ",s.scope),s.waiting&&mo(),s.addEventListener("updatefound",()=>{const e=s.installing;e&&e.addEventListener("statechange",()=>{e.state==="installed"&&navigator.serviceWorker.controller&&mo()})})}).catch(s=>{console.error("ServiceWorker registration failed: ",s)})})}function xn(){Fo=navigator.onLine?"SECURE_LINK":"OFFLINE_CACHE";const s=document.getElementById("system-status-indicator"),e=document.getElementById("system-status-label");s&&e&&(navigator.onLine?(s.className="w-2 h-2 rounded-full bg-emerald-400 glow-text-emerald pulse-indicator",e.innerText="SECURE_LINK",e.className="text-xs text-emerald-400 font-mono tracking-wider"):(s.className="w-2 h-2 rounded-full bg-amber-500 pulse-indicator",e.innerText="OFFLINE_CACHE",e.className="text-xs text-amber-500 font-mono tracking-wider"))}async function Le(){ue=await bn(),await Ci(),ls=localStorage.getItem("secops-wiki-last-update")||"0"}async function cs(){const s=await Wt(),e=Date.now();let t=!1;for(const n of s)n.expiresAt&&e>n.expiresAt&&(await wo(n.slug),await pe("SELF_DESTRUCT_EXPIRY",`Intel Entry "${n.title}" (slug: ${n.slug}) has self-destructed due to lease expiration.`),t=!0,ne===n.slug&&(ne="home",window.location.hash="#/page/home"));t&&(await Le(),await fe(),xt.postMessage("refresh"))}async function yn(){await cs();const s=window.location.hash||"#/page/home";et=!1,Be=!1;let e="";if(s.startsWith("#/page/")){const n=s.replace("#/page/","").split("#");ne=n[0],n.length>1&&(e=n[1])}else s.startsWith("#/edit/")?(ne=s.replace("#/edit/",""),et=!0):s==="#/new"?(et=!0,Be=!0,ne=""):s==="#/system"?ne="system":s==="#/graph"?ne="graph":s.startsWith("#/import-p2p")?ne="import-p2p":s==="#/audit-logs"?ne="audit-logs":ne="home";!et&&ne&&ne!=="system"&&ne!=="graph"&&ne!=="import-p2p"&&ne!=="audit-logs"&&(Jr(ne),zi(ne)),await fe(),e&&setTimeout(()=>{const t=document.getElementById(e);t&&t.scrollIntoView({behavior:"smooth"})},50)}function Zn(s){const e=s.filter(a=>a.isSystem),t=s.filter(a=>!a.isSystem&&a.isEncrypted),n=s.filter(a=>!a.isSystem&&!a.isEncrypted);let o="";return e.length>0&&(o+=`
      <div class="mb-4">
        <div class="px-3 mb-1.5 text-[9px] font-bold text-slate-500 uppercase tracking-widest font-mono flex items-center gap-1 select-none">
          ⚙️ SYSTEM PROCEDURES
        </div>
        <div class="space-y-0.5">
          ${e.map(a=>Xn(a)).join("")}
        </div>
      </div>
    `),t.length>0&&(o+=`
      <div class="mb-4">
        <div class="px-3 mb-1.5 text-[9px] font-bold text-red-400/80 uppercase tracking-widest font-mono flex items-center gap-1 select-none">
          🔒 SECURE CORES
        </div>
        <div class="space-y-0.5">
          ${t.map(a=>Xn(a)).join("")}
        </div>
      </div>
    `),n.length>0&&(o+=`
      <div class="mb-4">
        <div class="px-3 mb-1.5 text-[9px] font-bold text-teal-400/80 uppercase tracking-widest font-mono flex items-center gap-1 select-none">
          📄 OPERATIONAL INTEL
        </div>
        <div class="space-y-0.5">
          ${n.map(a=>Xn(a)).join("")}
        </div>
      </div>
    `),o}function Xn(s){const e=ne===s.slug&&!et,t=s.isEncrypted&&!J&&at,n=t?"[REDACTED CORE]":s.title,o=t?"javascript:void(0)":`#/page/${s.slug}`,a=t?`onclick="alert('SECURITY WARNING: Document is locked. Enter passphrase to decrypt cores first.');"`:"";let r="";if(Fe.trim().length>0){const i=s.isEncrypted&&!J,l=mt.find(d=>d.slug===s.slug)||s;if(!i&&l.content){const d=l.content.toLowerCase().indexOf(Fe.toLowerCase());if(d!==-1){const p=Math.max(0,d-20),m=Math.min(l.content.length,d+Fe.length+30);let u=l.content.substring(p,m);p>0&&(u="..."+u),m<l.content.length&&(u=u+"...");const f=_(u),y=new RegExp(`(${Fe.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")})`,"gi");r=`<div class="text-[10px] text-slate-500 font-mono mt-1 pl-4 break-all whitespace-normal leading-normal">${f.replace(y,'<span class="bg-teal-950 text-teal-350 px-0.5 rounded font-bold">$1</span>')}</div>`}}}return`
    <a href="${o}" ${a} class="block px-3 py-2 rounded-lg text-xs font-mono transition group ${e?"bg-teal-950/30 text-teal-400 font-bold border-l-2 border-teal-500":"text-slate-450 hover:bg-slate-900/40 hover:text-slate-200"}">
      <div class="flex items-center justify-between">
        <span class="truncate flex items-center gap-1.5">
          ${s.isEncrypted?'<span class="text-red-450 text-[9px]">🔒</span>':'<span class="text-slate-650 group-hover:text-slate-500 text-[9px]">⊙</span>'}
          ${_(n)}
        </span>
      </div>
      ${r}
    </a>
  `}async function fe(){var x,N,G;await Le();let s=ue;Fe.trim().length>0&&(s=s.map(v=>({page:v,score:Ko(mt.find(w=>w.slug===v.slug)||v,Fe)})).filter(v=>v.score>0).sort((v,w)=>w.score-v.score).map(v=>v.page)),Pt&&(s=s.filter(v=>v.tags.includes(Pt)));const e=Array.from(new Set(ue.flatMap(v=>v.tags)));Zo.innerHTML=`
    <!-- Top Secure Header Bar -->
    <header class="glass-panel border-b border-teal-900/30 px-4 md:px-6 py-4 flex items-center justify-between z-10 shrink-0">
      <div class="flex items-center gap-2 md:gap-3">
        <!-- Mobile Sidebar Toggle -->
        <button id="sidebar-toggle-btn" class="md:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-900/50 rounded-lg focus:outline-none" aria-label="Toggle Navigation Sidebar">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div class="w-8 h-8 md:w-10 md:h-10 glow-border rounded-lg flex items-center justify-center bg-slate-900/50 shrink-0">
          <svg class="w-5 h-5 md:w-6 md:h-6 text-teal-400" viewBox="0 0 512 512" fill="currentColor">
            <path d="M256 70 C198 70, 134 88, 115 140 C115 270, 205 375, 256 425 C307 375, 397 270, 397 140 C378 88, 314 70, 256 70 Z" fill="none" stroke="currentColor" stroke-width="32"/>
            <rect x="196" y="160" width="120" height="150" rx="8" fill="none" stroke="currentColor" stroke-width="24"/>
            <line x1="220" y1="210" x2="270" y2="210" stroke="currentColor" stroke-width="20" stroke-linecap="round"/>
            <line x1="220" y1="250" x2="290" y2="250" stroke="currentColor" stroke-width="20" stroke-linecap="round"/>
          </svg>
        </div>
        <div>
          <h1 class="text-sm md:text-lg font-bold tracking-tight text-white font-mono uppercase">SecOps Intel</h1>
          <p class="text-[10px] text-slate-500 font-mono hidden sm:block">CLASSIFICATION: CONFIDENTIAL // SYSTEM REVISION 1.4.0</p>
        </div>
      </div>

      <div class="flex items-center gap-2 md:gap-4">
        <!-- Telemetry Widget -->
        <div class="hidden sm:flex items-center gap-4 bg-slate-950/80 border border-slate-800 rounded-lg px-4 py-2">
          <div class="flex items-center gap-2">
            <div id="system-status-indicator" class="w-2 h-2 rounded-full ${navigator.onLine?"bg-emerald-400 glow-text-emerald":"bg-amber-500"} pulse-indicator"></div>
            <span id="system-status-label" class="text-xs ${navigator.onLine?"text-emerald-400":"text-amber-500"} font-mono tracking-wider">${Fo}</span>
          </div>
          <div class="h-4 w-px bg-slate-800"></div>
          <div class="flex items-center gap-2">
            <span class="text-xs text-slate-500 font-mono">CSP INTEGRITY:</span>
            <span class="text-xs text-teal-400 font-mono glow-text-cyan">ENFORCED</span>
          </div>
        </div>

        <!-- Recent Pages Dropdown -->
        <div class="relative inline-block text-left" id="recent-pages-dropdown-wrapper">
          <button id="recent-pages-dropdown-btn" class="p-1.5 text-slate-400 hover:text-white rounded-lg focus:outline-none hover:bg-slate-900/50 transition flex items-center gap-1" aria-label="Recent Pages" title="Recent Pages">
            <svg class="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
          <div id="recent-pages-menu" class="hidden absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-slate-950 border border-slate-800 ring-1 ring-black ring-opacity-5 z-25 divide-y divide-slate-800">
            <div class="py-1 px-3 text-[10px] font-mono text-slate-500 uppercase tracking-wider">Recently Visited</div>
            <div class="py-1" id="recent-pages-items-container"></div>
          </div>
        </div>

        <!-- Theme Toggle Button -->
        <button id="theme-toggle-btn" class="p-1.5 text-slate-400 hover:text-white rounded-lg focus:outline-none hover:bg-slate-900/50 transition" aria-label="Toggle Theme">
          <svg class="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path id="theme-icon-path" stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
          </svg>
        </button>

        <!-- Font Size Controls -->
        <div class="hidden sm:flex items-center gap-0.5 bg-slate-950/80 border border-slate-800 rounded-lg overflow-hidden">
          <button id="font-size-decrease-btn" class="px-2 py-1.5 text-slate-400 hover:text-white hover:bg-slate-900/50 transition text-xs font-mono font-bold" title="Decrease font size" aria-label="Decrease font size">A−</button>
          <button id="font-size-reset-btn" class="px-1.5 py-1.5 text-slate-500 hover:text-white hover:bg-slate-900/50 transition text-[9px] font-mono border-x border-slate-800" title="Reset font size" aria-label="Reset font size">↺</button>
          <button id="font-size-increase-btn" class="px-2 py-1.5 text-slate-400 hover:text-white hover:bg-slate-900/50 transition text-xs font-mono font-bold" title="Increase font size" aria-label="Increase font size">A+</button>
        </div>

        <!-- PWA Install Button -->
        <button id="pwa-install-btn" class="hidden px-2.5 py-1.5 bg-gradient-to-r from-teal-600 to-cyan-600 text-[10px] md:text-xs text-white font-mono uppercase font-bold rounded hover:from-teal-500 hover:to-cyan-500 transition shadow-[0_0_10px_rgba(20,184,166,0.2)]">
          INSTALL
        </button>

        <!-- Panic Button -->
        <button id="system-panic-btn" class="px-2.5 py-1.5 bg-red-950/40 border border-red-900/30 text-[10px] md:text-xs text-red-400 font-mono uppercase font-bold rounded hover:bg-red-905 hover:text-red-300 transition shadow-[0_0_10px_rgba(239,68,68,0.15)]">
          <span class="sm:inline hidden">PANIC PURGE</span>
          <span class="inline sm:hidden">PANIC</span>
        </button>
      </div>
    </header>

    <!-- Main Workspace -->
    <div id="read-progress" class="fixed top-0 left-0 h-1 bg-teal-500 z-[100] transition-all duration-150" style="width: 0%"></div>
    <div class="flex-1 flex overflow-hidden min-h-0 relative">
      <!-- Sidebar mobile backdrop overlay -->
      <div id="sidebar-backdrop" class="fixed inset-0 bg-black/60 z-20 hidden md:hidden"></div>

      <!-- Left Navigation Drawer -->
      <aside id="sidebar" class="fixed inset-y-0 left-0 z-30 w-72 glass-panel border-r border-slate-800/80 flex flex-col shrink-0 transform -translate-x-full md:translate-x-0 md:static transition-transform duration-300 ease-in-out">
        <!-- Search Launcher -->
        <div class="p-4 border-b border-slate-800/80 shrink-0">
          <button id="sidebar-search-trigger" class="w-full bg-slate-950/80 border border-slate-800 hover:border-slate-700/80 hover:bg-slate-900/20 rounded-lg py-2.5 px-3 flex items-center justify-between text-slate-500 transition font-mono focus:outline-none cursor-pointer">
            <div class="flex items-center gap-2 font-mono">
              <svg class="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <span class="text-xs text-slate-450">Search database...</span>
            </div>
            <kbd class="text-[9px] bg-slate-900 border border-slate-800 text-slate-400 px-1.5 py-0.5 rounded font-mono select-none uppercase scale-90">Ctrl+K/P</kbd>
          </button>
        </div>

        
        <!-- Pinned Docs -->
        ${(()=>{const v=JSON.parse(localStorage.getItem("pinned_docs")||"[]"),w=ue.filter(E=>v.includes(E.slug));return w.length>0?`
            <div class="px-2 py-4 border-b border-slate-800/80 shrink-0">
              <div class="px-3 mb-2 flex items-center justify-between">
                <span class="text-xs font-semibold text-amber-500 uppercase tracking-widest font-mono flex items-center gap-1">? Pinned Docs</span>
              </div>
              <div class="space-y-1">
                ${Zn(w)}
              </div>
            </div>`:""})()}
        
        <!-- Tag Filter Cloud -->
        ${e.length>0?`
          <div class="px-4 py-2 border-b border-slate-800/80 flex flex-wrap gap-1 max-h-24 overflow-y-auto shrink-0 select-none">
            <button class="tag-badge px-1.5 py-0.5 text-[9px] rounded-full font-mono transition ${Pt?"bg-slate-900 text-slate-400 hover:bg-slate-850":"bg-teal-500 text-slate-950 font-bold shadow-[0_0_8px_rgba(20,184,166,0.3)]"}" data-tag="">#ALL</button>
            ${e.map(v=>{const w=ai(v);return`
                <button class="tag-badge px-1.5 py-0.5 text-[9px] rounded-full font-mono transition ${Pt===v?"bg-teal-500 text-slate-950 font-bold shadow-[0_0_8px_rgba(20,184,166,0.3)]":`${w.className} hover:opacity-85`}" data-tag="${_(v)}">#${_(v.toUpperCase())}</button>
              `}).join("")}
          </div>
        `:""}

        <!-- Wiki Index List -->
        <div class="flex-1 overflow-y-auto px-2 py-4 space-y-1">
          <div class="px-3 mb-2 flex items-center justify-between">
            <span class="text-xs font-semibold text-slate-500 uppercase tracking-widest font-mono">Wiki Database</span>
            <div class="flex items-center gap-1">
              <a href="#/new" class="p-1 hover:bg-teal-950/30 rounded text-teal-400 hover:text-teal-300 transition" title="New Intel Document">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                  <line x1="12" y1="5" x2="12" y2="19"/>
                  <line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
              </a>
              <button id="sidebar-close-btn" class="md:hidden p-1 hover:bg-slate-900/50 rounded text-slate-400 hover:text-white transition" title="Close Panel">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          <div id="pages-list" class="space-y-1">
            ${Zn(s)}
            ${s.length===0?`
              <div class="text-center py-6 text-xs text-slate-650 font-mono">No entries found</div>
            `:""}
          </div>

          <div class="px-3 mb-2 mt-6 flex items-center justify-between border-t border-slate-900/60 pt-4 select-none shrink-0">
            <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">🏷️ Tag Explorer</span>
          </div>
          <div id="tag-tree-container" class="space-y-1 px-1 max-h-48 overflow-y-auto pr-1">
            ${oa(Pi(s))}
          </div>
        </div>

        <!-- Footer Control Center -->
        <div class="p-4 border-t border-slate-800/80 bg-slate-950/30 flex gap-2 shrink-0">
          <a href="#/graph" class="flex-1 text-center py-2 px-1.5 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-lg text-[10px] font-mono text-slate-300 uppercase hover:text-white transition">
            MAP VIEW
          </a>
          <a href="#/system" class="flex-1 text-center py-2 px-1.5 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-lg text-[10px] font-mono text-slate-300 uppercase hover:text-white transition">
            ADMIN
          </a>
        </div>
      </aside>

    <!-- Floating Scratchpad Notepad Widget -->
    <div id="floating-scratchpad" class="fixed bottom-4 right-4 z-40 bg-slate-950/95 border border-slate-800 rounded-xl shadow-2xl w-72 h-80 flex flex-col hidden transform transition-all duration-300 scale-95 opacity-0">
      <div class="px-3 py-2 bg-slate-900 border-b border-slate-800 rounded-t-xl flex items-center justify-between cursor-move select-none" id="floating-scratchpad-header">
        <span class="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">📋 Scratchpad</span>
        <button id="floating-scratchpad-close" class="text-slate-500 hover:text-white font-bold font-mono text-xs focus:outline-none">✕</button>
      </div>
      <textarea id="floating-scratchpad-content" aria-label="Scratchpad notes" placeholder="Type temporary notes here... Persisted locally." class="flex-1 bg-transparent p-3 outline-none text-xs font-mono text-slate-200 resize-none placeholder-slate-600 leading-relaxed"></textarea>
    </div>

    <!-- Toggle button for Scratchpad -->
    <button id="floating-scratchpad-toggle-btn" class="fixed bottom-4 right-4 z-40 p-3 bg-teal-600 hover:bg-teal-500 border border-teal-500 hover:border-teal-400 text-slate-950 hover:text-white rounded-full shadow-[0_0_15px_rgba(20,184,166,0.3)] transition focus:outline-none flex items-center justify-center" aria-label="Toggle scratchpad" title="Toggle scratchpad">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    </button>

      <!-- Center content portal -->
      <main class="flex-1 overflow-y-auto bg-gradient-to-b from-[#0a0f1d] to-[#090d16] p-4 md:p-8">
        <div class="max-w-4xl mx-auto">
          <div id="main-content">
            <!-- Loading placeholder resolved dynamically -->
          </div>
        </div>
      </main>
    </div>
  `;const t=document.getElementById("wiki-search-input");t&&t.addEventListener("input",v=>{Fe=v.target.value;const w=mt.filter(O=>O.title.toLowerCase().includes(Fe.toLowerCase())||O.content.toLowerCase().includes(Fe.toLowerCase())||O.tags.some(U=>U.toLowerCase().includes(Fe.toLowerCase()))),E=document.getElementById("pages-list");E.innerHTML=Zn(w),w.length===0&&(E.innerHTML='<div class="text-center py-6 text-xs text-slate-650 font-mono">No entries found</div>')});const n=document.getElementById("pwa-install-btn");n&&n.addEventListener("click",async()=>{if(Bt){Bt.prompt();const{outcome:v}=await Bt.userChoice;v==="accepted"&&console.log("User accepted the PWA install prompt"),Bt=null,n.classList.add("hidden")}});const o=document.getElementById("system-panic-btn");o&&o.addEventListener("click",async()=>{if(!await En("EXECUTE SYSTEM PANIC PURGE")){alert("Verification Failed: Consent signature rejected.");return}if(confirm("CRITICAL SYSTEM COMPROMISE PROTOCOL: Purge entire local database, clear all service worker caches, unregister service workers, and force self-destruct reload immediately?")){if(indexedDB.deleteDatabase("secops-wiki-db"),"caches"in window){const w=await caches.keys();await Promise.all(w.map(E=>caches.delete(E)))}if("serviceWorker"in navigator){const w=await navigator.serviceWorker.getRegistrations();await Promise.all(w.map(E=>E.unregister()))}localStorage.clear(),sessionStorage.clear(),J=null,window.history.replaceState(null,"","about:blank"),window.location.replace("about:blank")}});const a=document.getElementById("sidebar-toggle-btn"),r=document.getElementById("sidebar-close-btn"),i=document.getElementById("sidebar-backdrop"),l=()=>{const v=document.getElementById("sidebar"),w=document.getElementById("sidebar-backdrop");v&&w&&(v.classList.add("-translate-x-full"),w.classList.add("hidden"))},d=()=>{const v=document.getElementById("sidebar"),w=document.getElementById("sidebar-backdrop");v&&w&&(v.classList.remove("-translate-x-full"),w.classList.remove("hidden"))};a&&a.addEventListener("click",d),r&&r.addEventListener("click",l),i&&i.addEventListener("click",l),document.querySelectorAll("#sidebar a").forEach(v=>{v.addEventListener("click",()=>{window.innerWidth<768&&l()})});const m=document.getElementById("theme-toggle-btn");m&&m.addEventListener("click",Vo);const u=[12,13,14,15,16,18,20];let f=parseInt(localStorage.getItem("secops-wiki-font-size-idx")||"2",10);const y=()=>{document.documentElement.style.setProperty("--wiki-font-size",u[f]+"px"),localStorage.setItem("secops-wiki-font-size-idx",f.toString())};y(),(x=document.getElementById("font-size-increase-btn"))==null||x.addEventListener("click",()=>{f<u.length-1&&(f++,y())}),(N=document.getElementById("font-size-decrease-btn"))==null||N.addEventListener("click",()=>{f>0&&(f--,y())}),(G=document.getElementById("font-size-reset-btn"))==null||G.addEventListener("click",()=>{f=2,y()}),document.querySelectorAll(".tag-badge").forEach(v=>{v.addEventListener("click",async w=>{Pt=w.currentTarget.getAttribute("data-tag")||"",await fe()})});const L=document.getElementById("tag-tree-container");L&&(L.addEventListener("click",v=>{const w=v.target.closest(".tree-folder-header");if(w){const E=w.nextElementSibling,O=w.querySelector(".tree-folder-icon");if(E){const U=E.classList.toggle("hidden");O&&(O.style.transform=U?"rotate(0deg)":"rotate(90deg)")}}}),L.addEventListener("keydown",v=>{var ie,ae;const w=document.activeElement;if(!w||!L.contains(w))return;const O=Array.from(L.querySelectorAll(".tree-folder-header, .tree-folder-children a")).filter(te=>{let A=te.parentElement;for(;A&&A!==L;){if(A.classList.contains("tree-folder-children")&&A.classList.contains("hidden"))return!1;A=A.parentElement}return!0}),U=O.indexOf(w);if(U!==-1){if(v.key==="ArrowDown"){v.preventDefault();const te=(U+1)%O.length;(ie=O[te])==null||ie.focus()}else if(v.key==="ArrowUp"){v.preventDefault();const te=(U-1+O.length)%O.length;(ae=O[te])==null||ae.focus()}else if(v.key==="Enter")v.preventDefault(),w.click();else if(v.key==="ArrowRight"){if(v.preventDefault(),w.classList.contains("tree-folder-header")){const te=w.nextElementSibling,A=w.querySelector(".tree-folder-icon");te&&te.classList.contains("hidden")&&(te.classList.remove("hidden"),A&&(A.style.transform="rotate(90deg)"))}}else if(v.key==="ArrowLeft"&&(v.preventDefault(),w.classList.contains("tree-folder-header"))){const te=w.nextElementSibling,A=w.querySelector(".tree-folder-icon");te&&!te.classList.contains("hidden")&&(te.classList.add("hidden"),A&&(A.style.transform="rotate(0deg)"))}}})),await di()}async function di(){const s=document.getElementById("main-content");if(ne==="graph"){await Ii(s);return}if(ne==="system"){Ht(s);return}if(ne==="import-p2p"){await Bi(s);return}if(ne==="audit-logs"){await Hi(s);return}if(et){await Jo(s);return}await wn(s)}async function wn(s){const e=await We(ne);if(!e){s.innerHTML=`
      <div class="text-center py-20 bg-slate-950/40 border border-red-950/20 rounded-xl px-6 glow-border">
        <svg class="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
        </svg>
        <h2 class="text-2xl font-bold font-mono text-white mb-2 uppercase">DATA_MISSING</h2>
        <p class="text-slate-400 text-sm max-w-md mx-auto mb-6">Requested intel document slug "${_(ne)}" is not registered in index database.</p>
        <a href="#/new" class="px-4 py-2 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 font-mono text-xs uppercase rounded transition hover:text-white">
          Create New Document
        </a>
      </div>
    `;return}const t=await na(e.slug);let n=e.content,o=!1;if(e.isEncrypted)if(J)try{n=await ye(e.content,J)}catch{o=!0}else o=!0;if(o){const b=is();let P="";if(b&&(P=`<p class="text-red-500 text-xs font-mono font-bold mt-2 animate-pulse uppercase">SECURITY LOCKOUT: Too many failures. Locked out for ${Math.ceil((rs()-Date.now())/1e3)}s.</p>`),s.innerHTML=`
      <div class="max-w-md mx-auto my-20 p-6 glass-panel border border-teal-900/30 rounded-xl text-center glow-border select-none">
        <svg class="w-16 h-16 text-teal-500 mx-auto mb-4 animate-pulse" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        <h2 class="text-xl font-bold font-mono text-white mb-2 uppercase">DECRYPT_REQUIRED</h2>
        <p class="text-slate-400 text-xs font-mono mb-6">This document payload is encrypted. Enter passphrase to decrypt.</p>
        <form id="decrypt-doc-form" class="space-y-4">
          <input type="password" id="decrypt-password-input" aria-label="Security key passphrase" placeholder="Enter security passphrase..." ${b?"disabled":""} class="w-full bg-slate-950/80 border border-slate-800 focus:border-teal-500/50 rounded-lg p-2.5 text-base text-slate-200 focus:outline-none transition font-mono text-center disabled:opacity-40 disabled:cursor-not-allowed">
          <button type="submit" ${b?"disabled":""} class="w-full py-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-mono text-xs uppercase rounded font-bold transition shadow-[0_0_10px_rgba(20,184,166,0.2)] disabled:opacity-40 disabled:cursor-not-allowed">
            DECRYPT IN-MEMORY
          </button>
        </form>
        <div id="decrypt-lockout-timer">${P}</div>
      </div>
    `,b){const W=setInterval(async()=>{const j=Math.ceil((rs()-Date.now())/1e3),le=document.getElementById("decrypt-lockout-timer");j<=0?(clearInterval(W),await wn(s)):le&&(le.innerHTML=`<p class="text-red-500 text-xs font-mono font-bold mt-2 animate-pulse uppercase">SECURITY LOCKOUT: Too many failures. Locked out for ${j}s.</p>`)},1e3)}setTimeout(()=>{const W=document.getElementById("decrypt-password-input");W==null||W.focus()},50),document.getElementById("decrypt-doc-form").addEventListener("submit",async W=>{if(W.preventDefault(),is()){alert("Security Lockout active.");return}const j=document.getElementById("decrypt-password-input").value;try{const le=await Ce(j);await ye(e.content,le),ni(),J=le,await fe()}catch{ti(),alert("Security Alert: Authentication failed. Invalid security passphrase."),await wn(s)}});return}const a=n.split(/\s+/).filter(b=>b.length>0).length,r=Math.max(1,Math.round(a/200)),i=It(n),l=new Date(e.updatedAt).toLocaleString(),d=document.createElement("div");d.innerHTML=i,Xr(d);const p=d.innerHTML,m=oi(p,Fe),u=d.querySelectorAll("h1, h2, h3");let f="";u.length>0&&(f=`
      <div class="hidden lg:block w-60 shrink-0 self-start sticky top-8">
        <div class="glass-panel border border-slate-800/80 rounded-xl p-4">
          <h4 class="text-xs font-bold font-mono text-slate-400 uppercase tracking-widest border-b border-slate-800/60 pb-2 mb-3">Outline</h4>
          <nav class="space-y-2 text-xs font-mono max-h-[350px] overflow-y-auto pr-1">
            ${Array.from(u).map(b=>{const P=b.textContent||"",B=b.id||P.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,""),W=b.tagName.toLowerCase(),j=W==="h1"?"pl-0 font-semibold":W==="h2"?"pl-3 border-l border-slate-800":"pl-6 border-l border-slate-800";return`
                <a href="#/page/${e.slug}#${B}" class="block text-slate-500 hover:text-teal-400 transition truncate ${j}" title="${_(P)}">
                  ${_(P)}
                </a>
              `}).join("")}
          </nav>
        </div>
      </div>
    `);const y=n.match(/^(\s*[-*] )\[ \]/gm)||[],L=n.match(/^(\s*[-*] )\[[xX]\]/gm)||[],x=y.length+L.length;let N="";if(x>0){const b=L.length,P=Math.round(b/x*100),B=10,W=Math.round(b/x*B),j=B-W;N=`
      <div class="glass-panel border border-slate-800/80 p-3 rounded-lg flex items-center justify-between mb-6 text-[10px] sm:text-xs font-mono select-none">
        <div class="flex items-center gap-2 sm:gap-3">
          <span class="text-teal-400 font-bold">📋 TASK STATUS:</span>
          <span class="text-slate-400 font-bold">${"█".repeat(W)+"░".repeat(j)}</span>
          <span class="text-teal-400 font-bold">${P}%</span>
        </div>
        <div class="text-slate-500">
          ${b}/${x} COMPLETED
        </div>
      </div>
    `}let G="";try{const b=JSON.parse(sessionStorage.getItem("secops-wiki-breadcrumbs")||"[]");b.length>1&&(G=`
        <div class="flex items-center gap-1.5 text-[10px] font-mono text-slate-500 mb-3 select-none overflow-x-auto whitespace-nowrap pb-1">
          <span class="text-slate-600 uppercase">RECENT:</span>
          ${b.map((P,B)=>{const W=Qr(P),le=P===e.slug?"text-teal-400 font-bold":"text-slate-450 hover:text-slate-350 transition",T=B<b.length-1?'<span class="text-slate-850">/</span>':"";return`
              <a href="#/page/${P}" class="${le}">${_(W)}</a>
              ${T}
            `}).join("")}
        </div>
      `)}catch{}let v="";e.signature?await Je(e)!==e.signature?v=`<span class="px-2 py-0.5 bg-red-950/40 text-red-400 border border-red-900/30 rounded text-[9px] font-mono font-bold animate-pulse">⚠️ INTEGRITY FAIL</span>
                            <button id="reconcile-integrity-btn" class="ml-1.5 px-2 py-0.5 bg-red-950/50 hover:bg-red-900/40 text-red-400 hover:text-white border border-red-900/30 hover:border-red-700 rounded text-[9px] font-mono font-bold uppercase transition">Reconcile</button>`:v='<span class="px-2 py-0.5 bg-emerald-950/40 text-emerald-400 border border-emerald-900/30 rounded text-[9px] font-mono font-bold">✓ INTEGRITY OK</span>':v=`<span class="px-2 py-0.5 bg-amber-950/40 text-amber-400 border border-amber-900/30 rounded text-[9px] font-mono font-bold">⚠️ UNSIGNED</span>
                          <button id="sign-page-btn" class="ml-1.5 px-2 py-0.5 bg-amber-950/50 hover:bg-amber-900/40 text-amber-400 hover:text-white border border-amber-900/30 hover:border-amber-700 rounded text-[9px] font-mono font-bold uppercase transition">Sign Intel</button>`,e.isEncrypted?document.body.classList.add("encrypted-page-active"):document.body.classList.remove("encrypted-page-active");const w=e.classification||"UNCLASSIFIED";let E="border-emerald-500/20 text-emerald-400 bg-emerald-950/10",O="classification-glow-unclassified";w==="CONFIDENTIAL"?(E="border-blue-500/20 text-blue-400 bg-blue-950/10",O="classification-glow-confidential"):w==="SECRET"?(E="border-amber-500/20 text-amber-500 bg-amber-950/10",O="classification-glow-secret"):w==="TOP SECRET"&&(E="border-red-500/30 text-red-500 bg-red-950/10 animate-pulse",O="classification-glow-topsecret");const U=`
    <div class="border ${E} px-4 py-1.5 rounded-lg text-center text-[10px] font-bold font-mono uppercase tracking-widest select-none mb-6">
      ✦ ${w} ✦
    </div>
  `,ie=`
    <div class="border ${E} px-4 py-1.5 rounded-lg text-center text-[10px] font-bold font-mono uppercase tracking-widest select-none mt-8">
      ✦ ${w} ✦
    </div>
  `;s.innerHTML=`
    <div class="flex flex-col lg:flex-row gap-4 lg:gap-8 items-start">
      <!-- Main Content Area -->
      <div class="flex-1 min-w-0 glass-panel border rounded-xl p-5 md:p-6 shadow-xl ${O}">
        <!-- Breadcrumb navigation trail -->
        ${G}
        
        <!-- Top Classification Banner -->
        ${U}
        <!-- Page Header telemetry -->
        <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between border-b border-slate-800 pb-6 mb-6 gap-4">
          <div>
            <h2 class="text-xl sm:text-2xl md:text-3xl font-extrabold text-white font-mono tracking-tight leading-tight break-words">${_(e.title)}</h2>
            <div class="flex flex-wrap items-center gap-3 mt-3">
              <span class="hidden sm:inline text-xs font-mono text-slate-500 uppercase">SYS_REF: ${_(e.slug)}</span>
              <span class="h-3 w-px bg-slate-800"></span>
              <span class="text-xs font-mono text-slate-500 uppercase">UPDATED: ${l}</span>
              <span class="h-3 w-px bg-slate-800"></span>
              <span class="text-xs font-mono text-teal-400 uppercase">⏱️ ${r} MIN READ</span>
              ${v}
              <span class="h-3 w-px bg-slate-800"></span>
              ${e.tags.map(b=>Zr(b)).join("")}
              ${e.expiresAt?`
                <span class="h-3 w-px bg-slate-800"></span>
                <span id="page-expiry-countdown" class="text-xs font-mono text-red-400 font-bold uppercase tracking-wider animate-pulse">SELF-DESTRUCT: CALCULATING...</span>
              `:""}
            </div>
            ${(()=>{const b=ji(e.content);return b.length>0?`
                  <div class="flex flex-wrap items-center gap-1.5 mt-2">
                    <span class="text-[9px] font-mono text-slate-500 uppercase font-bold">Key Terms:</span>
                    ${b.map(P=>`<span class="px-1.5 py-0.5 bg-slate-900 border border-slate-800 text-slate-400 rounded text-[9px] font-mono">${_(P)}</span>`).join("")}
                  </div>
                `:""})()}
            </div>
          </div>
          
          <div class="flex flex-wrap sm:flex-nowrap items-center gap-2 shrink-0 self-start sm:self-auto w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
            <div class="relative inline-block text-left" id="page-export-dropdown-wrapper">
              <button id="page-export-dropdown-btn" class="flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-white text-slate-300 font-mono text-xs rounded transition uppercase">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                </svg>
                Export
              </button>
              <div id="page-export-menu" class="hidden absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-slate-950 border border-slate-800 ring-1 ring-black ring-opacity-5 z-20 divide-y divide-slate-800 max-h-[80vh] overflow-y-auto">
                <div class="py-1">
                  <button id="export-single-md" class="w-full text-left px-4 py-2 text-xs font-mono text-slate-300 hover:bg-slate-900 hover:text-white transition">
                    MARKDOWN (.MD)
                  </button>
                  <button id="export-single-html" class="w-full text-left px-4 py-2 text-xs font-mono text-slate-300 hover:bg-slate-900 hover:text-white transition">
                    OFFLINE HTML (.HTML)
                  </button>
                </div>
                <div class="py-1">
                  <button id="export-single-p2p" class="w-full text-left px-4 py-2 text-xs font-mono text-slate-300 hover:bg-slate-900 hover:text-white transition">
                    SHAREABLE P2P LINK
                  </button>
                  <button id="export-single-print" class="w-full text-left px-4 py-2 text-xs font-mono text-slate-300 hover:bg-slate-900 hover:text-white transition">
                    PRINT / PDF
                  </button>
                </div>
              </div>
            </div>

            
            <button id="pin-page-btn" class="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 bg-slate-900 border border-slate-800 hover:border-amber-500/50 hover:text-amber-400 text-slate-300 font-mono text-xs rounded transition uppercase" title="Pin page">
              <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              <span id="pin-page-text" class="hidden sm:inline">Pin</span>
            </button>
            <button id="clone-page-btn" class="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-white text-slate-300 font-mono text-xs rounded transition uppercase" title="Clone page">
              <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path>
              </svg>
              <span class="hidden sm:inline">Clone</span>
            </button>
            <a href="#/edit/${e.slug}" class="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-white text-slate-300 font-mono text-xs rounded transition uppercase" title="Modify page">
              <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
              </svg>
              <span class="hidden sm:inline">Modify</span>
            </a>
            <button id="copy-page-link-btn" class="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 bg-slate-900 border border-slate-800 hover:border-teal-500/50 hover:text-teal-400 text-slate-300 font-mono text-xs rounded transition uppercase" title="Copy page link">
              <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>
              <span class="hidden sm:inline">🔗 Copy Link</span>
            </button>
            ${e.isSystem?"":`
              <button id="delete-page-btn" class="flex items-center gap-1.5 px-3 py-1.5 bg-red-950/20 border border-red-900/30 hover:bg-red-900/30 text-red-400 hover:text-red-300 font-mono text-xs rounded transition uppercase">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
                Purge
              </button>
            `}
          </div>
        </div>

        <!-- Rendered Markdown Wiki Page -->
        ${N}
        <article class="wiki-content prose prose-invert max-w-none">
          ${m}
        </article>
        <!-- Related Pages (populated by JS) -->
        <div id="related-pages-panel"></div>

        <!-- Revision History Database Panel -->
        <div class="border-t border-slate-800 mt-12 pt-6">
          <details class="group glass-panel border border-slate-800/60 rounded-xl p-4 transition-all">
            <summary class="text-xs font-semibold text-slate-400 uppercase tracking-widest font-mono cursor-pointer list-none flex items-center justify-between">
              <span>Revision History Logs [${t.length}]</span>
              <svg class="w-4 h-4 text-slate-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div class="mt-4 space-y-3 divide-y divide-slate-800/60 max-h-48 overflow-y-auto pr-1">
              ${t.map((b,P)=>`
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-3 first:pt-0">
                  <div class="min-w-0">
                    <p class="text-xs font-mono text-slate-300 break-words">REV_${t.length-P} // ${_(b.title)}</p>
                    <p class="text-[10px] font-mono text-slate-500">${new Date(b.updatedAt).toLocaleString()}</p>
                  </div>
                  <button class="restore-rev-btn px-2.5 py-1 bg-slate-900 border border-slate-800 hover:border-slate-700 text-teal-400 hover:text-teal-300 font-mono text-[10px] rounded transition uppercase shrink-0 self-start sm:self-auto" data-rev-id="${_(b.id)}">
                    ROLLBACK
                  </button>
                  <button class="view-rev-diff-btn px-2.5 py-1 bg-slate-900 border border-slate-800 hover:border-slate-700 text-blue-400 hover:text-blue-300 font-mono text-[10px] rounded transition uppercase shrink-0 self-start sm:self-auto" data-rev-id="${_(b.id)}">
                    Diff
                  </button>
                </div>
              `).join("")}
              ${t.length===0?`
                <p class="text-[10px] font-mono text-slate-600">No revisions archived.</p>
              `:""}
            </div>
          </details>
        </div>
        ${ie}
      </div>

      <!-- Outline / TOC (Desktop only) -->
      ${f}
    </div>
    <!-- Print elements for security marking -->
    ${e.isEncrypted?`
      <div class="print-watermark">[CLASSIFIED - SECURE OPS]</div>
      <div class="print-banner-top">[CLASSIFIED - SECURE OPS]</div>
      <div class="print-banner-bottom">[CLASSIFIED - SECURE OPS]</div>
    `:""}
  `;const ae=document.getElementById("pin-page-btn"),te=document.getElementById("pin-page-text");if(ae&&te){let b=JSON.parse(localStorage.getItem("pinned_docs")||"[]");b.includes(e.slug)&&(ae.classList.add("text-amber-400"),te.innerText="Unpin"),ae.addEventListener("click",()=>{b=JSON.parse(localStorage.getItem("pinned_docs")||"[]"),b.includes(e.slug)?(b=b.filter(P=>P!==e.slug),ae.classList.remove("text-amber-400"),te.innerText="Pin"):(b.push(e.slug),ae.classList.add("text-amber-400"),te.innerText="Unpin"),localStorage.setItem("pinned_docs",JSON.stringify(b)),fe()})}const A=document.getElementById("page-export-dropdown-btn"),D=document.getElementById("page-export-menu");if(A&&D){A.addEventListener("click",H=>{H.stopPropagation(),D.classList.toggle("hidden")}),document.addEventListener("click",()=>{D.classList.add("hidden")});const b=document.getElementById("clone-page-btn");b&&b.addEventListener("click",async()=>{const H=e.slug+"-copy",q={...e,slug:H,title:"Copy of "+e.title,id:crypto.randomUUID(),createdAt:Date.now(),updatedAt:Date.now()};await Oe(q),window.location.hash=`#/edit/${H}`});const P=document.querySelectorAll(".toc-link");if(P.length>0){const H=new IntersectionObserver(q=>{q.forEach(h=>{h.isIntersecting&&P.forEach(C=>{C.classList.remove("text-teal-400","font-bold"),C.getAttribute("data-id")===h.target.id&&C.classList.add("text-teal-400","font-bold")})})},{rootMargin:"0px 0px -80% 0px"});document.querySelectorAll("h1, h2, h3").forEach(q=>H.observe(q))}const B=document.getElementById("read-progress");if(B){const H=()=>{const q=document.documentElement.scrollHeight-document.documentElement.clientHeight;if(q>0){const h=window.scrollY/q*100;B.style.width=h+"%"}};window.addEventListener("scroll",H)}document.getElementById("export-single-md").addEventListener("click",async()=>{let H=e.content;if(e.isEncrypted&&J)try{H=await ye(e.content,J)}catch{}const q=`---
title: ${e.title}
slug: ${e.slug}
tags: ${e.tags.join(", ")}
updated: ${new Date(e.updatedAt).toISOString()}
encrypted: ${!!e.isEncrypted}
---

`,h=new Blob([q+H],{type:"text/markdown;charset=utf-8;"}),C=URL.createObjectURL(h),k=document.createElement("a");k.href=C,k.download=`${e.slug}.md`,document.body.appendChild(k),k.click(),document.body.removeChild(k),URL.revokeObjectURL(C)}),document.getElementById("export-single-html").addEventListener("click",async()=>{let H=e.content;if(e.isEncrypted&&J)try{H=await ye(e.content,J)}catch{}const q=It(H),h=`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${_(e.title)} - SecOps Wiki Offline</title>
  <style>
    body {
      background-color: #0b0f19;
      color: #cbd5e1;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
      padding: 2rem;
      max-width: 800px;
      margin: 0 auto;
      line-height: 1.6;
    }
    h1 {
      font-size: 2.25rem;
      color: #f8fafc;
      border-bottom: 1px solid #1e293b;
      padding-bottom: 0.5rem;
      margin-bottom: 0.5rem;
    }
    h2 { font-size: 1.5rem; color: #f1f5f9; margin-top: 2rem; border-bottom: 1px solid #1e293b; padding-bottom: 0.3rem; }
    h3 { font-size: 1.25rem; color: #f1f5f9; margin-top: 1.5rem; }
    a { color: #2dd4bf; text-decoration: none; }
    a:hover { text-decoration: underline; }
    pre {
      background: #020617;
      border: 1px solid #1e293b;
      padding: 1rem;
      border-radius: 6px;
      overflow-x: auto;
    }
    code {
      font-family: ui-monospace, monospace;
      background: #1e293b;
      padding: 0.2rem 0.4rem;
      border-radius: 4px;
      font-size: 0.9em;
      color: #e2e8f0;
    }
    pre code { background: none; padding: 0; }
    table { width: 100%; border-collapse: collapse; margin: 1rem 0; }
    th, td { border: 1px solid #1e293b; padding: 0.5rem; text-align: left; }
    th { background: #0f172a; color: #f1f5f9; }
    blockquote {
      border-left: 4px solid #0d9488;
      padding-left: 1rem;
      margin-left: 0;
      color: #94a3b8;
      font-style: italic;
    }
    .metadata {
      font-size: 0.75rem;
      color: #64748b;
      margin-bottom: 2rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .badge {
      display: inline-block;
      background: #134e4a;
      color: #2dd4bf;
      padding: 0.1rem 0.4rem;
      border-radius: 4px;
      font-size: 0.7rem;
      margin-right: 0.5rem;
      border: 1px solid #115e59;
    }
  </style>
</head>
<body>
  <h1>${_(e.title)}</h1>
  <div class="metadata">
    Slug: ${e.slug} &nbsp;|&nbsp; 
    Updated: ${new Date(e.updatedAt).toLocaleString()} &nbsp;|&nbsp;
    Tags: ${e.tags.map(V=>`<span class="badge">#${_(V)}</span>`).join("")}
  </div>
  <article>
    ${q}
  </article>
</body>
</html>`,C=new Blob([h],{type:"text/html;charset=utf-8;"}),k=URL.createObjectURL(C),S=document.createElement("a");S.href=k,S.download=`${e.slug}.html`,document.body.appendChild(S),S.click(),document.body.removeChild(S),URL.revokeObjectURL(k)}),document.getElementById("export-single-print").addEventListener("click",()=>{window.print()});const T=document.getElementById("export-single-p2p");T&&T.addEventListener("click",async()=>{let H=e.content;if(e.isEncrypted&&J)try{H=await ye(e.content,J)}catch{}const q=prompt("Create a secure sharing passphrase for this peer link (min 4 characters):");if(q){if(q.length<4){alert("Security Requirement: Passphrase must be at least 4 characters long.");return}try{const h=await Ce(q),C={title:e.title,content:H,tags:e.tags,classification:e.classification||"UNCLASSIFIED"},k=await rt(JSON.stringify(C),h),S=btoa(k),V=`${window.location.origin}${window.location.pathname}#/import-p2p?data=${encodeURIComponent(S)}&key=${encodeURIComponent(q)}`;await navigator.clipboard.writeText(V),alert("✓ SECURE P2P LINK GENERATED: The encrypted link has been copied to your clipboard. Share it securely with your peer."),await pe("P2P_LINK_EXPORT",`Generated secure share link for document: ${e.title}`)}catch(h){alert(`Encryption error: Failed to generate sharing link - ${h.message}`)}}});const Y=document.getElementById("sign-page-btn");Y&&Y.addEventListener("click",async()=>{if(confirm(`SIGNING NOTICE: Generate a cryptographic integrity signature for "${e.title}" and save it?`))try{const q=await Je(e),h={...e,signature:q};await Oe(h),await pe("PAGE_SIGNED",`Cryptographically signed document: ${e.slug}`),alert("✓ SIGNATURE COMMITTED: Cryptographic integrity signature saved to database."),await Le(),await fe()}catch(q){alert("Signing failed: "+q.message)}});const X=document.getElementById("reconcile-integrity-btn");X&&X.addEventListener("click",async()=>{if(!confirm(`RECONCILIATION NOTICE: Confirm restoration of document "${e.title}" to its last cryptographically verified historical revision? Unverified changes will be discarded.`))return;let q=!1;for(const h of t)if(h.signature&&await Je({slug:h.slug,title:h.title,content:h.content,updatedAt:h.updatedAt,tags:h.tags||[]})===h.signature){await Oe({slug:h.slug,title:h.title,content:h.content,updatedAt:Date.now(),tags:h.tags||[],classification:h.classification||"UNCLASSIFIED",isSystem:e.isSystem,isEncrypted:h.isEncrypted}),q=!0;break}q?(alert("✓ RECONCILIATION COMPLETED: The document has been restored to its last verified authentic state."),await Le(),await fe()):(alert("⚠️ RECONCILIATION FAILED: No historical revision could be cryptographically verified. Check audit logs."),await pe("RECONCILE_FAILED",`Reconciliation failed for "${e.title}". No authentic revisions found.`))})}const M=document.getElementById("delete-page-btn");M&&M.addEventListener("click",async()=>{confirm(`CRITICAL SYSTEM NOTICE: Confirm total purge of intel document "${e.title}"? This action is irreversible.`)&&(await wo(e.slug),localStorage.setItem("secops-wiki-last-update",Date.now().toString()),xt.postMessage("refresh"),window.location.hash="#/page/home")}),s.querySelectorAll("pre").forEach(b=>{const P=document.createElement("div");P.className="relative group",b.parentNode.insertBefore(P,b),P.appendChild(b);const B=document.createElement("button");B.className="absolute top-2 right-2 px-2 py-1 bg-slate-900/80 hover:bg-slate-800 text-[10px] text-slate-400 hover:text-white font-mono rounded opacity-0 group-hover:opacity-100 transition focus:opacity-100 border border-slate-800 focus:outline-none",B.textContent="COPY",B.addEventListener("click",()=>{var j;const W=((j=b.querySelector("code"))==null?void 0:j.textContent)||b.textContent||"";navigator.clipboard.writeText(W).then(()=>{B.textContent="COPIED",setTimeout(()=>B.textContent="COPY",2e3),document.body.classList.contains("encrypted-page-active")&&qo()})}),P.appendChild(B)}),s.querySelectorAll(".restore-rev-btn").forEach(b=>{b.addEventListener("click",async P=>{const B=P.currentTarget.getAttribute("data-rev-id"),W=t.find(j=>j.id===B);if(W&&confirm(`ROLLBACK COMMAND: Revert current page content to revision state "${W.title}" saved on ${new Date(W.updatedAt).toLocaleString()}?`)){const j=await We(e.slug);j&&await ks({id:`${j.slug}-${Date.now()}`,slug:j.slug,title:j.title,content:j.content,updatedAt:Date.now(),tags:j.tags,classification:j.classification,signature:j.signature}),await Oe({slug:W.slug,title:W.title,content:W.content,updatedAt:Date.now(),tags:e.tags,isSystem:e.isSystem}),alert("Revision successfully restored."),await Le(),await fe()}})}),s.querySelectorAll('.wiki-content input[type="checkbox"]').forEach((b,P)=>{const B=b;B.removeAttribute("disabled"),B.classList.add("cursor-pointer","accent-teal-500"),B.addEventListener("change",async W=>{const j=W.target;await Ai(e.slug,P,j.checked)})});const F=document.getElementById("page-expiry-countdown");if(F&&e.expiresAt){const b=()=>{const W=Date.now(),j=e.expiresAt-W;if(j<=0)F.textContent="SELF-DESTRUCT: EXPIRED",fe();else{const le=Math.floor(j/36e5),T=Math.floor(j%(3600*1e3)/(60*1e3)),Y=Math.floor(j%(60*1e3)/1e3),X=le>0?`${le}H `:"",H=T>0||le>0?`${T}M `:"";F.textContent=`SELF-DESTRUCT: ${X}${H}${Y}S`}};b();const P=setInterval(b,1e3),B=()=>{clearInterval(P),window.removeEventListener("hashchange",B)};window.addEventListener("hashchange",B)}await $i(s),Vi(s),Mi(s);try{window.Prism&&window.Prism.highlightAllUnder(s)}catch{}const Z=document.getElementById("copy-page-link-btn");Z&&Z.addEventListener("click",async()=>{const b=window.location.origin+window.location.pathname+"#/page/"+e.slug;try{await navigator.clipboard.writeText(b),Z.textContent="✓ Copied!",setTimeout(()=>{Z.textContent="🔗 Copy Link"},2e3)}catch{prompt("Copy this link:",b)}});const $=document.getElementById("related-pages-panel");if($){let b=Gi(e,5);b.length===0&&e.tags.length>0&&(b=ue.filter(B=>B.slug!==e.slug&&B.tags.some(W=>e.tags.includes(W))).slice(0,5).map(B=>({page:B,score:0}))),b.length>0&&($.innerHTML=`
        <div class="border-t border-slate-800 mt-8 pt-6">
          <p class="text-xs font-bold font-mono text-slate-400 uppercase tracking-widest mb-3">Related Intel (Content Similarity)</p>
          <div class="flex flex-wrap gap-2">
            ${b.map(P=>{const B=P.page,W=P.score>0?` (${Math.round(Math.min(100,P.score*100))}% MATCH)`:"";return`
                <a href="#/page/${B.slug}" class="px-3 py-1.5 bg-slate-900/60 border border-slate-800 hover:border-teal-500/50 hover:text-teal-400 text-slate-400 font-mono text-xs rounded-lg transition flex items-center gap-1.5">
                  <span class="text-[9px]">${B.isEncrypted?"🔒":"⊙"}</span>
                  ${_(B.title)}${W}
                </a>
              `}).join("")}
          </div>
        </div>
      `)}}async function Jo(s){let e="",t="",n="",o=[],a=!1,r=!1,i="UNCLASSIFIED",l=0;if(!Be){const h=await We(ne);if(h&&(e=h.title,t=h.slug,n=h.content,o=[...h.tags],a=!!h.isSystem,r=!!h.isEncrypted,i=h.classification||"UNCLASSIFIED",h.expiresAt&&h.updatedAt&&(l=Math.round((h.expiresAt-h.updatedAt)/6e4)),h.isEncrypted))if(J)try{n=await ye(h.content,J)}catch{n="ERROR: Decryption key mismatch. Please go back and re-decrypt."}else n="ERROR: This page is encrypted. Decrypt it in the reader view first."}const d=`secops-wiki-draft-${Be?"new":ne}`;let p="";const m=localStorage.getItem(d);if(m)try{const h=JSON.parse(m);p=`
        <div id="draft-restore-banner" class="bg-amber-950/40 border border-amber-800 text-amber-400 p-3 rounded-lg text-xs font-mono mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <span>UNSAVED CHANGES: A local draft from ${new Date(h.updatedAt).toLocaleTimeString()} was found.</span>
          <div class="flex gap-2 shrink-0">
            <button type="button" id="restore-draft-btn" class="px-2 py-1 bg-amber-600 text-slate-950 hover:bg-amber-500 rounded font-bold uppercase tracking-wider text-[10px] transition">Restore</button>
            <button type="button" id="discard-draft-btn" class="px-2 py-1 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white rounded uppercase tracking-wider text-[10px] transition">Discard</button>
          </div>
        </div>
      `}catch{}s.innerHTML=`
    <div class="glass-panel border border-slate-800 rounded-xl p-4 md:p-6 glow-border">
      <div class="border-b border-slate-800 pb-4 mb-6">
        <h2 class="text-xl font-bold font-mono text-white uppercase">${Be?"Establish New Intel Entry":"Update Intel Entry"}</h2>
        <p class="text-xs text-slate-500 font-mono">All text payloads are sanitized client-side against XSS vectors.</p>
      </div>

      ${p}

      <form id="edit-page-form" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Title Input -->
          <div>
            <label for="edit-title" class="block text-xs font-semibold text-slate-400 uppercase tracking-widest font-mono mb-2">Document Title</label>
            <input type="text" id="edit-title" value="${_(e)}" required maxlength="100" class="w-full bg-slate-950/80 border border-slate-800 focus:border-teal-500/50 rounded-lg p-2.5 text-base md:text-sm text-slate-200 focus:outline-none transition font-mono">
          </div>

          <!-- Slug Input -->
          <div>
            <label for="edit-slug" class="block text-xs font-semibold text-slate-400 uppercase tracking-widest font-mono mb-2">Index Slug ID</label>
            <input type="text" id="edit-slug" value="${_(t)}" ${Be?"":"disabled"} required pattern="^[a-z0-9-_]+$" placeholder="e.g. operational-manual" class="w-full bg-slate-950/80 border border-slate-800 focus:border-teal-500/50 rounded-lg p-2.5 text-base md:text-sm text-slate-200 focus:outline-none transition font-mono disabled:opacity-40 disabled:cursor-not-allowed">
            ${Be?'<p class="text-[10px] text-slate-500 mt-1 font-mono">Only lowercase letters, numbers, hyphens, and underscores are allowed.</p>':""}
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Security Classification dropdown select -->
          <div>
            <label for="edit-classification" class="block text-xs font-semibold text-slate-400 uppercase tracking-widest font-mono mb-2">Security Classification</label>
            <select id="edit-classification" class="w-full bg-slate-950/80 border border-slate-800 focus:border-teal-500/50 rounded-lg p-2.5 text-base md:text-sm text-slate-200 focus:outline-none transition font-mono cursor-pointer">
              <option value="UNCLASSIFIED" ${i==="UNCLASSIFIED"?"selected":""}>UNCLASSIFIED</option>
              <option value="CONFIDENTIAL" ${i==="CONFIDENTIAL"?"selected":""}>CONFIDENTIAL</option>
              <option value="SECRET" ${i==="SECRET"?"selected":""}>SECRET</option>
              <option value="TOP SECRET" ${i==="TOP SECRET"?"selected":""}>TOP SECRET</option>
            </select>
          </div>
          <!-- Document Expiry Timer -->
          <div>
            <label for="edit-expiry" class="block text-xs font-semibold text-slate-400 uppercase tracking-widest font-mono mb-2">Intel Expiry Timer (Self-Destruct)</label>
            <select id="edit-expiry" class="w-full bg-slate-950/80 border border-slate-800 focus:border-teal-500/50 rounded-lg p-2.5 text-base md:text-sm text-slate-200 focus:outline-none transition font-mono cursor-pointer">
              <option value="0" ${l===0?"selected":""}>NEVER</option>
              <option value="60" ${l===60?"selected":""}>1 HOUR</option>
              <option value="720" ${l===720?"selected":""}>12 HOURS</option>
              <option value="1440" ${l===1440?"selected":""}>24 HOURS</option>
              <option value="10080" ${l===10080?"selected":""}>7 DAYS</option>
            </select>
          </div>
        </div>

        <!-- Tags Input -->
        <div>
          <label for="tag-pill-input" class="block text-xs font-semibold text-slate-400 uppercase tracking-widest font-mono mb-2">Associated Tags</label>
          <div id="tag-pills-container" class="flex flex-wrap items-center gap-2 w-full bg-slate-950/80 border border-slate-800 focus-within:border-teal-500/50 rounded-lg p-2 min-h-[42px] transition font-mono">
            <!-- Dynamic pills go here -->
            <input type="text" id="tag-pill-input" aria-label="Associated tag input" placeholder="Type tag and press Enter..." class="bg-transparent border-0 text-base md:text-sm text-slate-200 focus:outline-none flex-1 min-w-[120px] p-0.5">
          </div>
          <div class="relative mt-1">
            <div id="tag-pill-dropdown" class="absolute left-0 top-0 w-64 bg-slate-950 border border-slate-800 rounded-lg shadow-lg hidden font-mono text-xs max-h-40 overflow-y-auto z-20"></div>
          </div>
          <p class="text-[10px] text-slate-500 mt-1 font-mono">Type and press Enter, comma, or select from dropdown list.</p>
        </div>

        <!-- Mobile Tab Selector -->
        <div class="flex border-b border-slate-800/80 mb-4 md:hidden select-none shrink-0">
          <button type="button" id="edit-tab-write" class="flex-1 py-2 text-center text-xs font-mono font-bold border-b-2 border-teal-500 text-teal-400">WRITE_SOURCE</button>
          <button type="button" id="edit-tab-preview" class="flex-1 py-2 text-center text-xs font-mono font-bold border-b-2 border-transparent text-slate-500">PREVIEW_INGEST</button>
        </div>

        <!-- Content Area -->
        <div>
          <div class="flex items-center justify-between mb-2">
            <label for="edit-content" class="text-xs font-semibold text-slate-400 uppercase tracking-widest font-mono">Markdown Content payload</label>
            <span class="hidden md:inline text-[10px] text-slate-500 font-mono">Live editor preview enabled (Type [[ for page links)</span>
          </div>
          <!-- Formatting Toolbar -->
          <div class="flex flex-col sm:flex-row gap-2 p-2 bg-slate-950/80 border border-slate-800 border-b-0 rounded-t-lg select-none items-start sm:items-center justify-between">
            <div class="flex flex-wrap gap-1 w-full sm:w-auto">
              <button type="button" class="format-btn px-2 py-1 bg-slate-900 border border-slate-850 hover:border-slate-700 text-slate-400 font-mono text-[10px] rounded hover:text-white transition uppercase font-bold" data-format="bold">B</button>
              <button type="button" class="format-btn px-2 py-1 bg-slate-900 border border-slate-850 hover:border-slate-700 text-slate-400 font-mono text-[10px] rounded hover:text-white transition uppercase font-bold" data-format="italic">I</button>
              <button type="button" class="format-btn px-2 py-1 bg-slate-900 border border-slate-850 hover:border-slate-700 text-slate-400 font-mono text-[10px] rounded hover:text-white transition uppercase font-bold" data-format="header">H3</button>
              <button type="button" class="format-btn px-2 py-1 bg-slate-900 border border-slate-850 hover:border-slate-700 text-slate-400 font-mono text-[10px] rounded hover:text-white transition uppercase font-bold" data-format="code">Code</button>
              <button type="button" class="format-btn px-2 py-1 bg-slate-900 border border-slate-850 hover:border-slate-700 text-slate-400 font-mono text-[10px] rounded hover:text-white transition uppercase font-bold" data-format="link">Link</button>
              <button type="button" class="format-btn px-2 py-1 bg-slate-900 border border-slate-850 hover:border-slate-700 text-slate-400 font-mono text-[10px] rounded hover:text-white transition uppercase font-bold" data-format="table">Table</button>
              <button type="button" class="format-btn px-2 py-1 bg-slate-900 border border-slate-850 hover:border-slate-700 text-slate-400 font-mono text-[10px] rounded hover:text-white transition uppercase font-bold" data-format="checklist">Todo</button>
              <button type="button" id="toolbar-sketch-btn" class="px-2 py-1 bg-slate-900 border border-slate-850 hover:border-slate-700 text-slate-450 font-mono text-[10px] rounded hover:text-white transition uppercase font-bold">Sketch</button>
            </div>
            <button type="button" id="toggle-split-btn" class="hidden md:inline-block px-2.5 py-1 bg-slate-900 border border-slate-850 hover:border-slate-700 text-teal-400 hover:text-teal-300 font-mono text-[10px] rounded transition uppercase font-bold">Toggle Split</button>
          </div>
          <div id="editor-layout-grid" class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div id="edit-content-container" class="block relative">
              <textarea id="edit-content" rows="16" required class="w-full bg-slate-950/80 border border-slate-800 focus:border-teal-500/50 rounded-b-lg p-4 text-base md:text-sm text-slate-200 focus:outline-none transition font-mono border-t-0" placeholder="Enter markdown payload here...">${_(n)}</textarea>
              <div id="editor-stats" class="text-right text-[10px] text-slate-500 font-mono mt-1 pr-2">Words: 0 | Chars: 0 | Lines: 1</div>
              <!-- Auto-complete popup -->
              <div id="autocomplete-popup" class="absolute left-4 top-12 w-64 editor-autocomplete-list rounded-lg hidden font-mono text-xs max-h-40 overflow-y-auto"></div>
            </div>
            <div id="live-preview-container" class="hidden md:block">
              <div id="live-preview-box" class="w-full h-[375px] md:h-full min-h-[384px] overflow-y-auto bg-slate-950/30 border border-slate-800 rounded-lg p-4 wiki-content">
                <span class="text-xs text-slate-600 font-mono">Markdown preview updates in real-time...</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Encryption Option & Actions -->
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-slate-800">
          <div class="flex items-center gap-2">
            <input type="checkbox" id="edit-encrypt" aria-label="Encrypt document" ${r?"checked":""} class="w-4 h-4 rounded border-slate-850 bg-slate-950 text-teal-500 focus:ring-teal-500/50 cursor-pointer">
            <label for="edit-encrypt" class="text-xs font-semibold text-slate-400 uppercase tracking-widest font-mono cursor-pointer select-none">Encrypt Document (AES-GCM)</label>
          </div>
          <div class="flex gap-3 justify-end self-end sm:self-auto">
            <a href="${Be?"#/page/home":`#/page/${ne}`}" id="cancel-edit-btn" class="px-4 py-2 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 font-mono text-xs uppercase rounded transition hover:text-white">
              Cancel
            </a>
            <button type="submit" class="px-4 py-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-mono text-xs uppercase rounded font-bold transition shadow-[0_0_10px_rgba(20,184,166,0.15)]">
              Commit Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  `;const u=document.getElementById("edit-page-form"),f=document.getElementById("edit-content"),y=document.getElementById("live-preview-box"),L=document.getElementById("cancel-edit-btn"),x=document.getElementById("discard-draft-btn"),N=document.getElementById("edit-tab-write"),G=document.getElementById("edit-tab-preview"),v=document.getElementById("edit-content-container"),w=document.getElementById("live-preview-container");N&&G&&v&&w&&(N.addEventListener("click",()=>{N.className="flex-1 py-2 text-center text-xs font-mono font-bold border-b-2 border-teal-500 text-teal-400",G.className="flex-1 py-2 text-center text-xs font-mono font-bold border-b-2 border-transparent text-slate-500",v.className="block",w.className="hidden md:block"}),G.addEventListener("click",()=>{G.className="flex-1 py-2 text-center text-xs font-mono font-bold border-b-2 border-teal-500 text-teal-400",N.className="flex-1 py-2 text-center text-xs font-mono font-bold border-b-2 border-transparent text-slate-500",w.className="block",v.className="hidden md:block"}));const E=()=>{const h=f.value,C=document.getElementById("editor-stats");if(C){const k=h.split(/\s+/).filter(K=>K.length>0).length,S=h.length,V=h.split(`
`).length;C.innerText=`Words: ${k} | Chars: ${S} | Lines: ${V}`}if(h.trim().length===0){y.innerHTML='<span class="text-slate-600 font-mono text-xs">No input content.</span>';return}y.innerHTML=It(h)};function O(h){const C=h.trim().split(`
`);if(C.length<2)return h;const k=C.map(me=>{let ee=me.trim();return ee.startsWith("|")&&(ee=ee.slice(1)),ee.endsWith("|")&&(ee=ee.slice(0,-1)),ee.split("|").map(be=>be.trim())}),S=Math.max(...k.map(me=>me.length));if(S===0)return h;const V=Array(S).fill(0);for(let me=0;me<k.length;me++){const ee=me===1&&k[me].every(be=>/^:-*-*:?$/.test(be)||/^-+$/.test(be));for(let be=0;be<S;be++){const Te=k[me][be]||"";!ee&&Te.length>V[be]&&(V[be]=Te.length)}}for(let me=0;me<S;me++)V[me]=Math.max(V[me],3);return k.map((me,ee)=>{const be=ee===1&&me.every(De=>/^:-*-*:?$/.test(De)||/^-+$/.test(De));return`| ${Array(S).fill("").map((De,Pe)=>{const ve=me[Pe]||"";if(be){const tt=ve.startsWith(":"),Lt=ve.endsWith(":"),qe=V[Pe]-(tt?1:0)-(Lt?1:0);return(tt?":":"")+"-".repeat(Math.max(1,qe))+(Lt?":":"")}else return ve.padEnd(V[Pe]," ")}).join(" | ")} |`}).join(`
`)}const U=document.getElementById("toolbar-sketch-btn");U&&U.addEventListener("click",()=>{_i(f)}),Di(f);const ie=h=>{const C=f.selectionStart,k=f.selectionEnd,S=f.value,V=S.substring(C,k);let K="";switch(h){case"bold":K=`**${V||"bold_text"}**`;break;case"italic":K=`*${V||"italic_text"}*`;break;case"header":K=`
### ${V||"Header text"}
`;break;case"code":K=`
\`\`\`javascript
${V||"// code here"}
\`\`\`
`;break;case"link":K=`[${V||"Link text"}](url)`;break;case"table":if(V&&V.includes("|")&&V.includes(`
`))try{K=`
`+O(V)+`
`}catch{K=`
| Header 1 | Header 2 |
| -------- | -------- |
| Cell 1   | Cell 2   |
`}else K=`
| Header 1 | Header 2 |
| -------- | -------- |
| Cell 1   | Cell 2   |
`;break;case"checklist":K=`
- [ ] ${V||"Task description"}
`;break}f.value=S.substring(0,C)+K+S.substring(k),f.focus(),f.selectionStart=C+K.length,f.selectionEnd=C+K.length,E()};s.querySelectorAll(".format-btn").forEach(h=>{h.addEventListener("click",C=>{const k=C.currentTarget.getAttribute("data-format")||"";ie(k)})}),f.addEventListener("keyup",h=>{const C=f.value,k=f.selectionStart;if(C.substring(k-2,k)==="[[")cn=!0,dn=k,as="",ki(f);else if(cn){if(h.key==="Escape"||h.key==="ArrowUp"||h.key==="ArrowDown"||h.key==="Enter")return;const V=C.substring(dn,k);V.includes(`
`)||k<dn?pn():(as=V,ea(f))}}),f.addEventListener("keydown",h=>{if(cn){const C=document.getElementById("autocomplete-popup");if(!C)return;const k=C.querySelectorAll(".editor-autocomplete-item");let S=Array.from(k).findIndex(V=>V.classList.contains("active"));h.key==="ArrowDown"?(h.preventDefault(),k.length>0&&(S>=0&&k[S].classList.remove("active","bg-teal-950/20","text-teal-400"),S=(S+1)%k.length,k[S].classList.add("active","bg-teal-950/20","text-teal-400"),k[S].scrollIntoView({block:"nearest"}))):h.key==="ArrowUp"?(h.preventDefault(),k.length>0&&(S>=0&&k[S].classList.remove("active","bg-teal-950/20","text-teal-400"),S=(S-1+k.length)%k.length,k[S].classList.add("active","bg-teal-950/20","text-teal-400"),k[S].scrollIntoView({block:"nearest"}))):h.key==="Enter"?(h.preventDefault(),S>=0?k[S].click():k.length>0&&k[0].click()):h.key==="Escape"&&(h.preventDefault(),pn())}}),f.addEventListener("input",()=>{E(),le()}),f.addEventListener("keydown",h=>{if(h.ctrlKey&&(h.key==="s"||h.key==="S")){h.preventDefault();const C=document.getElementById("edit-page-form");C&&C.requestSubmit();return}if(h.key==="Tab"){h.preventDefault();const C=f.selectionStart,k=f.selectionEnd;f.value=f.value.substring(0,C)+"  "+f.value.substring(k),f.selectionStart=f.selectionEnd=C+2,E();return}if(h.ctrlKey&&(h.key==="b"||h.key==="B")){h.preventDefault();const C=f.selectionStart,k=f.selectionEnd,S=f.value.substring(C,k),V=`**${S||"bold"}**`;f.value=f.value.substring(0,C)+V+f.value.substring(k),f.selectionStart=C+2,f.selectionEnd=C+2+(S||"bold").length,E();return}if(h.ctrlKey&&(h.key==="i"||h.key==="I")){h.preventDefault();const C=f.selectionStart,k=f.selectionEnd,S=f.value.substring(C,k),V=`*${S||"italic"}*`;f.value=f.value.substring(0,C)+V+f.value.substring(k),f.selectionStart=C+1,f.selectionEnd=C+1+(S||"italic").length,E();return}}),E();const ae=document.getElementById("restore-draft-btn"),te=document.getElementById("discard-draft-btn"),A=document.getElementById("draft-restore-banner");if(m&&ae&&te)try{const h=JSON.parse(m);ae.addEventListener("click",()=>{const C=document.getElementById("edit-title"),k=document.getElementById("edit-content");C&&(C.value=h.title||""),k&&(k.value=h.content||"",E()),Array.isArray(h.tags)&&(o=h.tags,$()),A==null||A.remove()}),te.addEventListener("click",()=>{localStorage.removeItem(d),A==null||A.remove()})}catch{}const D=document.getElementById("tag-pills-container"),M=document.getElementById("tag-pill-input"),F=document.getElementById("tag-pill-dropdown"),Z=Array.from(new Set(ue.flatMap(h=>h.tags)));function $(){if(!D||!M)return;D.querySelectorAll(".tag-badge-pill").forEach(k=>k.remove()),o.forEach(k=>{const S=document.createElement("span");S.className="tag-badge-pill flex items-center gap-1 text-[10px] font-mono bg-teal-950/40 text-teal-400 px-2 py-1 rounded border border-teal-900/30 select-none",S.innerHTML=`
        #${_(k)}
        <button type="button" class="tag-remove-btn hover:text-red-400 font-bold transition focus:outline-none" data-tag="${_(k)}">×</button>
      `,D.insertBefore(S,M)}),D.querySelectorAll(".tag-remove-btn").forEach(k=>{k.addEventListener("click",S=>{const V=S.currentTarget.getAttribute("data-tag");V&&(o=o.filter(K=>K!==V),$(),le())})})}function b(){if(!F||!M)return;const h=M.value.trim().toLowerCase(),C=Z.filter(S=>S.includes(h)&&!o.includes(S));if(C.length===0){F.classList.add("hidden");return}F.innerHTML=C.map(S=>`
      <div class="tag-dropdown-item px-3 py-2 cursor-pointer hover:bg-slate-900 hover:text-white text-slate-350 transition" data-tag="${_(S)}">
        #${_(S)}
      </div>
    `).join(""),F.classList.remove("hidden"),F.querySelectorAll(".tag-dropdown-item").forEach(S=>{S.addEventListener("click",V=>{const K=V.currentTarget.getAttribute("data-tag");K&&!o.includes(K)&&(o.push(K),$(),le()),M.value="",F.classList.add("hidden"),M.focus()})})}M&&(M.addEventListener("keydown",h=>{if(h.key==="Enter"||h.key===","){h.preventDefault();const C=M.value.trim().toLowerCase().replace(/[^a-z0-9-_]/g,"");C&&!o.includes(C)&&(o.push(C),$(),le()),M.value="",F&&F.classList.add("hidden")}else h.key==="Backspace"&&M.value===""&&(o.pop(),$(),le())}),M.addEventListener("input",b),M.addEventListener("focus",b)),$();const P=document.getElementById("editor-layout-grid"),B=document.getElementById("live-preview-container"),W=document.getElementById("toggle-split-btn");function j(){!P||!B||!W||(on?(P.classList.remove("md:grid-cols-1"),P.classList.add("md:grid-cols-2"),B.classList.remove("md:hidden"),B.classList.add("md:block"),W.textContent="Full Width",W.classList.remove("text-slate-450"),W.classList.add("text-teal-400")):(P.classList.remove("md:grid-cols-2"),P.classList.add("md:grid-cols-1"),B.classList.remove("md:block"),B.classList.add("md:hidden"),W.textContent="Split Screen",W.classList.remove("text-teal-400"),W.classList.add("text-slate-450")))}W&&W.addEventListener("click",()=>{on=!on,localStorage.setItem("secops-wiki-split-screen",on.toString()),j()}),j();const le=()=>{var k;const h=(k=document.getElementById("edit-title"))==null?void 0:k.value,C=f.value;(h||C||o.length>0)&&localStorage.setItem(d,JSON.stringify({title:h,content:C,tags:o,updatedAt:Date.now()}))},T=setInterval(le,5e3),Y=()=>{clearInterval(T),window.removeEventListener("hashchange",Y)};window.addEventListener("hashchange",Y);const X=()=>{clearInterval(T),window.removeEventListener("hashchange",Y),localStorage.removeItem(d),pn()};L.addEventListener("click",X),x&&x.addEventListener("click",()=>{var h;X(),(h=document.getElementById("draft-restore-banner"))==null||h.remove(),Jo(s)});const H=h=>{F&&!F.contains(h.target)&&h.target!==M&&F.classList.add("hidden")};document.addEventListener("click",H);const q=()=>{document.removeEventListener("click",H),window.removeEventListener("hashchange",q)};window.addEventListener("hashchange",q),u.addEventListener("submit",async h=>{h.preventDefault();const C=document.getElementById("edit-title").value.trim(),k=Be?document.getElementById("edit-slug").value.trim().toLowerCase():t,S=f.value,V=document.getElementById("edit-encrypt").checked,K=document.getElementById("edit-classification").value,me=document.getElementById("edit-expiry"),ee=me?parseInt(me.value,10):0;if(Be&&!/^[a-z0-9-_]+$/.test(k)){alert("Security Alert: Slug contains illegal characters. Use alphanumeric, hyphens, and underscores only.");return}const be=o.map(ve=>rn(ve.trim()).toLowerCase()).filter(ve=>ve.length>0),Te=await We(k);Te&&await ks({id:`${Te.slug}-${Date.now()}`,slug:Te.slug,title:Te.title,content:Te.content,updatedAt:Te.updatedAt,isEncrypted:Te.isEncrypted,tags:Te.tags,classification:Te.classification,signature:Te.signature});let De=S;if(V){if(!J){const ve=prompt("Enter a security passphrase to encrypt this document (min 8 chars, mixed case, numbers, symbols):");if(!ve){alert("Encryption Aborted: A security passphrase is required to save an encrypted document.");return}const tt=Go(ve);if(!tt.valid){alert(`SECURITY ERROR: Passphrase too weak.

${tt.message}`);return}J=await Ce(ve)}try{De=await rt(S,J)}catch(ve){alert(`Encryption failure: ${ve.message}`);return}}const Pe={slug:k,title:C,content:De,updatedAt:Date.now(),tags:be,isSystem:a,isEncrypted:V,classification:K};ee>0&&(Pe.expiresAt=Pe.updatedAt+ee*60*1e3),Pe.signature=await Je(Pe);try{await Oe(Pe),X(),xt.postMessage("refresh"),window.location.hash=`#/page/${k}`}catch(ve){alert(`Database transaction error: ${ve.message}`)}})}function pi(s,e){let t=s.replace(/\.md$/i,"").replace(/[-_]+/g," ");t=t.split(" ").map(r=>r.charAt(0).toUpperCase()+r.slice(1)).join(" ");let n=s.replace(/\.md$/i,"").toLowerCase().replace(/[^a-z0-9-_]+/g,"-"),o=e,a=["imported"];if(e.startsWith("---")){const r=e.indexOf("---",3);if(r!==-1){const i=e.substring(3,r);o=e.substring(r+3).trim(),i.split(`
`).forEach(d=>{const p=d.indexOf(":");if(p!==-1){const m=d.substring(0,p).trim().toLowerCase(),u=d.substring(p+1).trim();m==="title"?t=u.replace(/^["']|["']$/g,""):m==="slug"?n=u.replace(/[^a-z0-9-_]+/g,"-").toLowerCase():m==="tags"&&(a=u.split(",").map(f=>f.trim().replace(/^["']|["']$/g,"")).filter(f=>f.length>0))}})}}return{slug:n,title:t,content:o,updatedAt:Date.now(),tags:a,isSystem:!1}}function ui(s){const e=["Title","Slug","Tags","Word Count","Encrypted","Last Updated"],t=s.map(n=>{const o=n.content.split(/\s+/).filter(a=>a.length>0).length;return[`"${n.title.replace(/"/g,'""')}"`,`"${n.slug}"`,`"${n.tags.join(", ")}"`,o,n.isEncrypted?"TRUE":"FALSE",`"${new Date(n.updatedAt).toISOString()}"`]});return[e.join(","),...t.map(n=>n.join(","))].join(`
`)}function fi(s){let e="";for(const t of s){let n=t.content;if(t.isEncrypted&&J)try{n=t.content.includes(":")?"🔒 [Encrypted Document: Passphrase Required]":t.content}catch{n="🔒 [Encrypted Document: Passphrase Required]"}const o=It(n);e+=`
      <section style="page-break-after: always; margin-bottom: 3rem; border-bottom: 2px solid #e2e8f0; padding-bottom: 2rem;">
        <h1 style="font-size: 2.25rem; font-family: monospace; margin-bottom: 0.5rem; color: #1a202c;">${_(t.title)}</h1>
        <div style="font-size: 0.75rem; color: #718096; font-family: monospace; margin-bottom: 1.5rem;">
          SLUG: ${t.slug} | TAGS: #${t.tags.map(a=>_(a)).join(", #")} | UPDATED: ${new Date(t.updatedAt).toLocaleString()}
        </div>
        <div style="line-height: 1.6; color: #2d3748;">
          ${o}
        </div>
      </section>
    `}return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>SecOps Wiki - Consolidated Document Register</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 2rem; max-width: 800px; margin: 0 auto; color: #1a202c; background-color: #fff; }
    h1, h2, h3 { color: #1a202c; }
    pre { background: #f7fafc; border: 1px solid #e2e8f0; padding: 1rem; border-radius: 4px; overflow-x: auto; }
    code { font-family: monospace; font-size: 0.9em; background: #edf2f7; padding: 0.2rem 0.4rem; border-radius: 3px; }
    table { width: 100%; border-collapse: collapse; margin: 1rem 0; }
    th, td { border: 1px solid #e2e8f0; padding: 0.5rem; text-align: left; }
    th { background: #f7fafc; }
    blockquote { border-left: 4px solid #4a5568; padding-left: 1rem; margin-left: 0; font-style: italic; color: #4a5568; }
    @media print {
      body { padding: 0; }
    }
  </style>
</head>
<body>
  <header style="text-align: center; margin-bottom: 4rem; border-bottom: 3px double #cbd5e0; padding-bottom: 2rem;">
    <h1 style="font-size: 2.5rem; margin-bottom: 0.5rem; font-family: monospace;">SECOPS INTEL REGISTER</h1>
    <p style="font-size: 0.875rem; color: #718096; font-family: monospace; text-transform: uppercase;">Consolidated Offline Backup File // Generated: ${new Date().toLocaleString()}</p>
  </header>
  ${e}
</body>
</html>`}function mi(s){const e=[],t=s.map(o=>`<a href="${o.slug}.html" style="display: block; padding: 0.5rem; color: #94a3b8; text-decoration: none; font-family: monospace; font-size: 0.8rem; border-radius: 4px; transition: background 0.2s;" onmouseover="this.style.background='#1e293b'; this.style.color='#2dd4bf'" onmouseout="this.style.background='transparent'; this.style.color='#94a3b8'">${_(o.title)}</a>`).join(`
`),n=`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>SecOps Static Wiki Index</title>
  <style>
    body {
      background-color: #0b0f19;
      color: #cbd5e1;
      font-family: ui-monospace, monospace;
      padding: 2rem;
      max-width: 1000px;
      margin: 0 auto;
      display: flex;
      gap: 2rem;
    }
    aside {
      width: 250px;
      border-right: 1px solid #1e293b;
      padding-right: 1.5rem;
      flex-shrink: 0;
    }
    main {
      flex-grow: 1;
    }
    h1 {
      font-size: 2rem;
      color: #f8fafc;
      margin-bottom: 1.5rem;
      border-bottom: 1px solid #1e293b;
      padding-bottom: 0.5rem;
    }
    .page-card {
      background: #0f172a;
      border: 1px solid #1e293b;
      border-radius: 8px;
      padding: 1.25rem;
      margin-bottom: 1rem;
    }
    .page-title {
      font-size: 1.25rem;
      font-weight: bold;
      color: #2dd4bf;
      text-decoration: none;
    }
    .page-title:hover {
      text-decoration: underline;
    }
    .metadata {
      font-size: 0.75rem;
      color: #64748b;
      margin-top: 0.5rem;
    }
  </style>
</head>
<body>
  <aside>
    <h3 style="color: #f8fafc; font-size: 0.9rem; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 1rem; font-family: monospace;">Pages Registry</h3>
    <div style="display: flex; flex-direction: column; gap: 0.25rem;">
      ${t}
    </div>
  </aside>

    <!-- Floating Scratchpad Notepad Widget -->
    <div id="floating-scratchpad" class="fixed bottom-4 right-4 z-40 bg-slate-950/95 border border-slate-800 rounded-xl shadow-2xl w-72 h-80 flex flex-col hidden transform transition-all duration-300 scale-95 opacity-0">
      <div class="px-3 py-2 bg-slate-900 border-b border-slate-800 rounded-t-xl flex items-center justify-between cursor-move select-none" id="floating-scratchpad-header">
        <span class="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">📋 Scratchpad</span>
        <button id="floating-scratchpad-close" class="text-slate-500 hover:text-white font-bold font-mono text-xs focus:outline-none">✕</button>
      </div>
      <textarea id="floating-scratchpad-content" aria-label="Scratchpad notes" placeholder="Type temporary notes here... Persisted locally." class="flex-1 bg-transparent p-3 outline-none text-xs font-mono text-slate-200 resize-none placeholder-slate-600 leading-relaxed"></textarea>
    </div>

    <!-- Toggle button for Scratchpad -->
    <button id="floating-scratchpad-toggle-btn" class="fixed bottom-4 right-4 z-40 p-3 bg-teal-600 hover:bg-teal-500 border border-teal-500 hover:border-teal-400 text-slate-950 hover:text-white rounded-full shadow-[0_0_15px_rgba(20,184,166,0.3)] transition focus:outline-none flex items-center justify-center" aria-label="Toggle scratchpad" title="Toggle scratchpad">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    </button>
  <main>
    <h1>SecOps Static Wiki Register</h1>
    <p style="margin-bottom: 2rem; color: #94a3b8; font-size: 0.85rem;">This is an offline-friendly static compilation of the active wiki database. Double-click any page in the sidebar or below to navigate.</p>
    <div>
      ${s.map(o=>`
        <div class="page-card">
          <a class="page-title" href="${o.slug}.html">${_(o.title)}</a>
          <div class="metadata">
            SLUG: ${o.slug} | TAGS: #${o.tags.map(a=>_(a)).join(", #")} | UPDATED: ${new Date(o.updatedAt).toLocaleString()}
          </div>
        </div>
      `).join("")}
    </div>
  </main>
</body>
</html>`;return e.push({name:"index.html",content:n}),s.forEach(o=>{let a=o.content;if(o.isEncrypted&&J)try{a=o.content.includes(":")?"🔒 [Encrypted Document: Decrypted view not exported]":o.content}catch{a="🔒 [Encrypted Document: Decrypted view not exported]"}let r=It(a);r=r.replace(/href="#\/page\/([a-z0-9-_]+)"/g,'href="$1.html"');const i=`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${_(o.title)} - SecOps Static Wiki</title>
  <style>
    body {
      background-color: #0b0f19;
      color: #cbd5e1;
      font-family: ui-monospace, monospace;
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      gap: 2rem;
    }
    aside {
      width: 250px;
      border-right: 1px solid #1e293b;
      padding-right: 1.5rem;
      flex-shrink: 0;
      overflow-y: auto;
      max-height: 90vh;
      position: sticky;
      top: 2rem;
    }
    main {
      flex-grow: 1;
      min-width: 0;
    }
    h1 {
      font-size: 2.25rem;
      color: #f8fafc;
      margin-bottom: 0.5rem;
      border-bottom: 1px solid #1e293b;
      padding-bottom: 0.5rem;
    }
    h2 { font-size: 1.5rem; color: #f1f5f9; margin-top: 2rem; border-bottom: 1px solid #1e293b; padding-bottom: 0.3rem; }
    h3 { font-size: 1.25rem; color: #f1f5f9; margin-top: 1.5rem; }
    a { color: #2dd4bf; text-decoration: none; }
    a:hover { text-decoration: underline; }
    pre {
      background: #020617;
      border: 1px solid #1e293b;
      padding: 1rem;
      border-radius: 6px;
      overflow-x: auto;
    }
    code {
      font-family: ui-monospace, monospace;
      background: #1e293b;
      padding: 0.2rem 0.4rem;
      border-radius: 4px;
      font-size: 0.9em;
      color: #e2e8f0;
    }
    pre code { background: none; padding: 0; }
    table { width: 100%; border-collapse: collapse; margin: 1rem 0; }
    th, td { border: 1px solid #1e293b; padding: 0.5rem; text-align: left; }
    th { background: #0f172a; color: #f1f5f9; }
    blockquote {
      border-left: 4px solid #0d9488;
      padding-left: 1rem;
      margin-left: 0;
      color: #94a3b8;
      font-style: italic;
    }
    .metadata {
      font-size: 0.75rem;
      color: #64748b;
      margin-bottom: 2rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .badge {
      display: inline-block;
      background: #134e4a;
      color: #2dd4bf;
      padding: 0.1rem 0.4rem;
      border-radius: 4px;
      font-size: 0.7rem;
      margin-right: 0.5rem;
      border: 1px solid #115e59;
    }
  </style>
</head>
<body>
  <aside>
    <a href="index.html" style="display: block; margin-bottom: 1.5rem; font-weight: bold; color: #f8fafc; text-decoration: none; font-size: 0.95rem;">← INDEX DIRECTORY</a>
    <h3 style="color: #f8fafc; font-size: 0.8rem; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 1rem;">Pages Registry</h3>
    <div style="display: flex; flex-direction: column; gap: 0.25rem;">
      ${t}
    </div>
  </aside>

    <!-- Floating Scratchpad Notepad Widget -->
    <div id="floating-scratchpad" class="fixed bottom-4 right-4 z-40 bg-slate-950/95 border border-slate-800 rounded-xl shadow-2xl w-72 h-80 flex flex-col hidden transform transition-all duration-300 scale-95 opacity-0">
      <div class="px-3 py-2 bg-slate-900 border-b border-slate-800 rounded-t-xl flex items-center justify-between cursor-move select-none" id="floating-scratchpad-header">
        <span class="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">📋 Scratchpad</span>
        <button id="floating-scratchpad-close" class="text-slate-500 hover:text-white font-bold font-mono text-xs focus:outline-none">✕</button>
      </div>
      <textarea id="floating-scratchpad-content" aria-label="Scratchpad notes" placeholder="Type temporary notes here... Persisted locally." class="flex-1 bg-transparent p-3 outline-none text-xs font-mono text-slate-200 resize-none placeholder-slate-600 leading-relaxed"></textarea>
    </div>

    <!-- Toggle button for Scratchpad -->
    <button id="floating-scratchpad-toggle-btn" class="fixed bottom-4 right-4 z-40 p-3 bg-teal-600 hover:bg-teal-500 border border-teal-500 hover:border-teal-400 text-slate-950 hover:text-white rounded-full shadow-[0_0_15px_rgba(20,184,166,0.3)] transition focus:outline-none flex items-center justify-center" aria-label="Toggle scratchpad" title="Toggle scratchpad">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    </button>
  <main>
    <h1>${_(o.title)}</h1>
    <div class="metadata">
      Slug: ${o.slug} &nbsp;|&nbsp; 
      Updated: ${new Date(o.updatedAt).toLocaleString()} &nbsp;|&nbsp;
      Tags: ${o.tags.map(l=>`<span class="badge">#${_(l)}</span>`).join("")}
    </div>
    <article class="wiki-content">
      ${r}
    </article>
  </main>
</body>
</html>`;e.push({name:`${o.slug}.html`,content:i})}),Yo(e)}function gi(s){const e=[];let t="",n=!1;for(let l=0;l<s.length;l++){const d=s[l];d==='"'?(n=!n,t+=d):d===`
`&&!n?(e.push(t),t=""):t+=d}if(t&&e.push(t),e.length<2)return[];const o=l=>{const d=[];let p="",m=!1;for(let u=0;u<l.length;u++){const f=l[u];f==='"'?m=!m:f===","&&!m?(d.push(a(p)),p=""):p+=f}return d.push(a(p)),d},a=l=>(l=l.trim(),l.startsWith('"')&&l.endsWith('"')&&(l=l.substring(1,l.length-1)),l.replace(/""/g,'"')),r=o(e[0]).map(l=>l.toLowerCase()),i=[];for(let l=1;l<e.length;l++){if(!e[l].trim())continue;const d=o(e[l]),p={};r.forEach((m,u)=>{p[m]=d[u]||""}),i.push(p)}return i}function hi(s){var i;const e=s.title||"Untitled CSV Import",t=s.content||"";let n=s.slug||e.toLowerCase().replace(/[^a-z0-9-_]+/g,"-");n=n.toLowerCase().replace(/[^a-z0-9-_]+/g,"-"),n||(n=`imported-${Date.now()}`);const a=(s.tags||"imported, csv").split(/[,;|]+/).map(l=>l.trim().toLowerCase()).filter(l=>l.length>0),r=s.updatedat?parseInt(s.updatedat):Date.now();return{slug:n,title:e,content:t,updatedAt:isNaN(r)?Date.now():r,tags:a,isSystem:!1,isEncrypted:((i=s.encrypted)==null?void 0:i.toLowerCase())==="true"}}function bi(s,e){const t=s.split(`
`),n=e.split(`
`),o=Array(t.length+1).fill(0).map(()=>Array(n.length+1).fill(0));for(let l=1;l<=t.length;l++)for(let d=1;d<=n.length;d++)t[l-1]===n[d-1]?o[l][d]=o[l-1][d-1]+1:o[l][d]=Math.max(o[l-1][d],o[l][d-1]);const a=[];let r=t.length,i=n.length;for(;r>0||i>0;)r>0&&i>0&&t[r-1]===n[i-1]?(a.unshift({type:"unchanged",text:t[r-1]}),r--,i--):i>0&&(r===0||o[r][i-1]>=o[r-1][i])?(a.unshift({type:"added",text:n[i-1]}),i--):(a.unshift({type:"removed",text:t[r-1]}),r--);return a}function xi(s,e){return new Promise(t=>{let n=document.getElementById("conflict-diff-modal");n||(n=document.createElement("div"),n.id="conflict-diff-modal",n.className="fixed inset-0 bg-[#090d16]/90 backdrop-blur-md z-[100] flex items-center justify-center p-4",document.body.appendChild(n)),n.classList.remove("hidden");const a=bi(s.content,e.content).map(r=>{let i="diff-line-unchanged",l=" ";return r.type==="added"?(i="diff-line-added px-1 rounded",l="+"):r.type==="removed"&&(i="diff-line-removed px-1 rounded",l="-"),`<div class="font-mono text-xs whitespace-pre-wrap ${i}">${l} ${_(r.text)}</div>`}).join(`
`);n.innerHTML=`
      <div class="glass-panel border border-teal-900/30 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col glow-border shadow-2xl">
        <div class="p-4 border-b border-slate-800 flex items-center justify-between shrink-0">
          <h3 class="text-sm font-bold font-mono text-white uppercase tracking-wider">Conflict Detected: ${_(s.slug)}</h3>
          <span class="text-[10px] font-mono bg-red-950/40 text-red-400 border border-red-900/30 px-2 py-0.5 rounded">SLUG DUP_WARN</span>
        </div>
        
        <div class="p-4 overflow-y-auto space-y-4 flex-1">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-slate-950/50 border border-slate-850 p-3 rounded-lg space-y-2">
              <h4 class="text-xs font-bold font-mono text-teal-400 uppercase">Existing Document</h4>
              <p class="text-xs font-mono text-white"><span class="text-slate-500">TITLE:</span> ${_(s.title)}</p>
              <p class="text-xs font-mono text-white"><span class="text-slate-500">TAGS:</span> ${s.tags.map(r=>`#${r}`).join(", ")}</p>
              <p class="text-[10px] font-mono text-slate-500"><span class="text-slate-500">MODIFIED:</span> ${new Date(s.updatedAt).toLocaleString()}</p>
            </div>
            
            <div class="bg-slate-950/50 border border-slate-850 p-3 rounded-lg space-y-2">
              <h4 class="text-xs font-bold font-mono text-teal-450 uppercase">Imported Document</h4>
              <p class="text-xs font-mono text-white"><span class="text-slate-500">TITLE:</span> ${_(e.title)}</p>
              <p class="text-xs font-mono text-white"><span class="text-slate-500">TAGS:</span> ${e.tags.map(r=>`#${r}`).join(", ")}</p>
              <p class="text-[10px] font-mono text-slate-500"><span class="text-slate-500">MODIFIED:</span> ${new Date(e.updatedAt).toLocaleString()}</p>
            </div>
          </div>
          
          <div class="space-y-1">
            <h4 class="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-wider">Line-by-line Content Diff (- Existing, + Imported)</h4>
            <div class="bg-slate-950 border border-slate-850 p-3 rounded-lg max-h-60 overflow-y-auto space-y-0.5">
              ${a}
            </div>
          </div>
        </div>
        
        <div class="p-4 border-t border-slate-800 bg-slate-950/50 flex flex-wrap gap-2 justify-end shrink-0">
          <button id="diff-opt-skip" class="px-3 py-1.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-350 hover:text-white font-mono text-xs uppercase rounded transition">
            Skip File
          </button>
          <button id="diff-opt-rename" class="px-3 py-1.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-350 hover:text-white font-mono text-xs uppercase rounded transition">
            Keep Both (Rename)
          </button>
          <button id="diff-opt-overwrite" class="px-3 py-1.5 bg-red-950/20 border border-red-900/30 hover:bg-red-900/30 text-red-400 hover:text-red-300 font-mono text-xs uppercase rounded transition">
            Overwrite
          </button>
          <button id="diff-opt-archive" class="px-3 py-1.5 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-mono text-xs uppercase rounded font-bold transition shadow-[0_0_10px_rgba(20,184,166,0.15)]">
            Archive & Replace
          </button>
        </div>
      </div>
    `,document.getElementById("diff-opt-skip").addEventListener("click",()=>{n.classList.add("hidden"),t("SKIP")}),document.getElementById("diff-opt-rename").addEventListener("click",()=>{n.classList.add("hidden"),t("MERGE_RENAME")}),document.getElementById("diff-opt-overwrite").addEventListener("click",()=>{n.classList.add("hidden"),t("OVERWRITE")}),document.getElementById("diff-opt-archive").addEventListener("click",()=>{n.classList.add("hidden"),t("REVISION")})})}async function Jn(s,e){const t=Yr(s),n=await We(t.slug);if(n){let o=e;if(e==="ASK"&&(o=await xi(n,t)),o==="SKIP")return!1;if(o==="REVISION")await ks({id:`${n.slug}-${Date.now()}`,slug:n.slug,title:n.title,content:n.content,updatedAt:n.updatedAt,isEncrypted:n.isEncrypted,tags:n.tags,classification:n.classification,signature:n.signature}),t.signature=await Je(t),await Oe(t);else if(o==="OVERWRITE")t.signature=await Je(t),await Oe(t);else if(o==="MERGE_RENAME"){let a=`${t.slug}-imported`,r=await We(a),i=1;for(;r;)a=`${t.slug}-imported-${i}`,r=await We(a),i++;t.slug=a,t.title=`${t.title} (Imported)`,t.signature=await Je(t),await Oe(t)}}else t.signature=await Je(t),await Oe(t);return!0}async function go(s){var m,u;if(!s||s.length===0)return;const e=((m=document.getElementById("import-conflict-resolution"))==null?void 0:m.value)||"REVISION";let t=0,n=0,o=0,a=0,r=0,i=0,l=0,d=0,p=0;for(let f=0;f<s.length;f++){const y=s[f],L=(u=y.name.split(".").pop())==null?void 0:u.toLowerCase();L==="md"?await new Promise(x=>{const N=new FileReader;N.onload=async G=>{var v;try{const w=(v=G.target)==null?void 0:v.result,E=pi(y.name,w);await Jn(E,e)?t++:a++}catch{l++}x()},N.readAsText(y)}):L==="csv"?await new Promise(x=>{const N=new FileReader;N.onload=async G=>{var v;try{const w=(v=G.target)==null?void 0:v.result,E=gi(w);for(const O of E)try{const U=hi(O);await Jn(U,e)?n++:r++}catch{d++}}catch{d++}x()},N.readAsText(y)}):L==="json"&&await new Promise(x=>{const N=new FileReader;N.onload=async G=>{var v;try{const w=JSON.parse((v=G.target)==null?void 0:v.result);let E=w;if(w&&w.encrypted===!0&&w.payload){const U=prompt("Secure Backup: Enter password to decrypt database backup file:");if(U===null){p++,x();return}try{const ie=await Ce(U),ae=await ye(w.payload,ie);E=JSON.parse(ae)}catch{alert("Backup Decryption Alert: Authentication failed. Invalid backup passphrase."),p++,x();return}}else w&&w.encrypted===!1&&w.payload&&(E=w.payload);const O=Array.isArray(E)?E:[E];for(const U of O)try{!U.slug&&U.title&&(U.slug=U.title.toLowerCase().replace(/[^a-z0-9-_]+/g,"-")),U.slug||(U.slug=`imported-item-${Date.now()}-${Math.floor(Math.random()*1e3)}`),U.title||(U.title=U.slug.replace(/[-_]+/g," ")),typeof U.tags=="string"&&(U.tags=U.tags.split(",").map(ae=>ae.trim()).filter(ae=>ae.length>0)),Array.isArray(U.tags)||(U.tags=[]),U.classification||(U.classification="UNCLASSIFIED"),typeof U.updatedAt!="number"&&(U.updatedAt=Date.now()),await Jn(U,e)?o++:i++}catch{p++}}catch{p++}x()},N.readAsText(y)})}alert(`INGESTION COMPLETED (Conflict resolution: ${e.toUpperCase()}):

Markdown (.md) files:
- Ingested: ${t}
- Skipped: ${a}
- Failed: ${l}

CSV files (rows):
- Ingested: ${n}
- Skipped: ${r}
- Failed: ${d}

JSON files (records):
- Ingested: ${o}
- Skipped: ${i}
- Failed: ${p}`),xt.postMessage("refresh"),await Le(),await fe()}async function yi(){const s=document.getElementById("tag-color-palette-manager");if(!s)return;const e=Array.from(new Set(ue.flatMap(r=>r.tags))),t=await So();if(e.length===0){s.innerHTML='<p class="text-xs font-mono text-slate-500">No active document tags registered.</p>';return}let n='<div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">';for(const r of e){const i=t.find(d=>d.tag===r),l=i?i.color:"slate";n+=`
      <div class="flex items-center justify-between p-2 bg-slate-950/40 border border-slate-800 rounded">
        <span class="text-xs font-mono text-slate-400">#${_(r)}</span>
        <div class="flex gap-2 items-center">
          <button class="rename-tag-btn px-2 py-1 bg-slate-900 border border-slate-700 text-xs text-blue-400 hover:text-blue-300 rounded" data-tag="${_(r)}">Rename</button>
          <select class="tag-color-select bg-slate-900 border border-slate-850 text-xs font-mono text-slate-300 rounded px-2 py-1 focus:outline-none focus:border-teal-500 cursor-pointer" aria-label="Select color for tag" aria-label="Select color for tag ${_(r)}" data-tag="${_(r)}">
          <option value="slate" ${l==="slate"?"selected":""}>SLATE GREY</option>
          <option value="emerald" ${l==="emerald"?"selected":""}>EMERALD GREEN</option>
          <option value="blue" ${l==="blue"?"selected":""}>BLUE TEAM</option>
          <option value="red" ${l==="red"?"selected":""}>RED TEAM</option>
          <option value="amber" ${l==="amber"?"selected":""}>AMBER CAUTION</option>
        </select>
        </div>
      </div>
    `}n+="</div>",s.innerHTML=n,s.querySelectorAll(".rename-tag-btn").forEach(r=>{r.addEventListener("click",async i=>{const l=i.currentTarget.getAttribute("data-tag"),d=prompt(`Rename tag "#${l}" to:`);if(d&&d.trim()&&d!==l){const p=d.trim().toLowerCase().replace(/[^a-z0-9-]/g,"");if(p.length>0){for(const m of ue)m.tags.includes(l)&&(m.tags=m.tags.map(u=>u===l?p:u),await Oe(m));pe("TAG_RENAME",`Renamed tag ${l} to ${p}`),await fe()}}})}),s.querySelectorAll(".tag-color-select").forEach(r=>{r.addEventListener("change",async i=>{const l=i.currentTarget.getAttribute("data-tag"),d=i.currentTarget.value;await Ca({tag:l,color:d}),await ys(),await fe()})})}function Ht(s){const e=Array.from(new Set(ue.flatMap(A=>A.tags)));s.innerHTML=`
    <div class="space-y-6">
      <!-- Title -->
      <div class="border-b border-slate-800 pb-4">
        <h2 class="text-2xl font-bold font-mono text-white uppercase">System Operations Admin Console</h2>
        <p class="text-xs text-slate-500 font-mono">Diagnostic logs, backups, state sanitization, and security parameters.</p>
      </div>

      <!-- System Diagnostic Panel -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Security Configurations -->
        <div class="glass-panel border border-slate-800 rounded-xl p-5 space-y-4">
          <h3 class="text-sm font-bold font-mono text-white uppercase tracking-wider border-b border-slate-800 pb-2">Active Security Parameters</h3>
          <ul class="space-y-2 text-xs font-mono">
            <li class="flex justify-between">
              <span class="text-slate-500">XSS SANITIZATION:</span>
              <span class="text-emerald-400">ACTIVE (DOMPurify v3.x)</span>
            </li>
            <li class="flex justify-between">
              <span class="text-slate-500">CSP SCRIPT EXECUTIONS:</span>
              <span class="text-emerald-400">RESTRICTED ('self' only)</span>
            </li>
            <li class="flex justify-between">
              <span class="text-slate-500">EXTERNAL CONNECTIONS:</span>
              <span class="text-emerald-400">BLOCKED (CSP rules)</span>
            </li>
            <li class="flex justify-between">
              <span class="text-slate-500">DATABASE INTEGRITY:</span>
              <span class="text-emerald-400">VERIFIED (IndexedDB)</span>
            </li>
            <li class="flex justify-between">
              <span class="text-slate-500">OFFLINE OPERATION:</span>
              <span class="text-emerald-400">ENABLED (PWA Cache v1)</span>
            </li>
            <li class="flex justify-between">
              <span class="text-slate-500">AUDIT SCANS RUN:</span>
              <span class="text-emerald-400 font-bold">${jo()}</span>
            </li>
            <li class="flex justify-between">
              <span class="text-slate-500">ACTIVE VISUAL THEME:</span>
              <span class="text-emerald-400 font-bold">${pt.toUpperCase()}</span>
            </li>
            <li class="flex justify-between items-center py-0.5">
              <span class="text-slate-500">MASK ENCRYPTED CORES:</span>
              <label class="relative inline-flex items-center cursor-pointer select-none">
                <input type="checkbox" id="system-mask-encrypted-checkbox" aria-label="Mask Encrypted Cores" class="sr-only peer" ${at?"checked":""}>
                <div class="w-7 h-4 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-450 after:border-slate-350 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-teal-600 peer-checked:after:bg-white"></div>
              </label>
            </li>
            <li class="flex justify-between items-center py-0.5">
              <span class="text-slate-500">DATABASE ENCRYPTION:</span>
              <label class="relative inline-flex items-center cursor-pointer select-none">
                <input type="checkbox" id="system-db-encrypted-checkbox" aria-label="Database Encryption" class="sr-only peer" ${localStorage.getItem("secops-wiki-db-encrypted")==="true"?"checked":""}>
                <div class="w-7 h-4 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-450 after:border-slate-350 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-teal-600 peer-checked:after:bg-white"></div>
              </label>
            </li>
            <li class="flex justify-between items-center py-0.5">
              <span class="text-slate-500">BIOMETRIC UNLOCK:</span>
              <button id="system-webauthn-register-btn" class="px-2 py-0.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-350 font-mono text-[9px] uppercase rounded transition">
                ${localStorage.getItem("secops-wiki-webauthn-gate")==="true"?"DEREGISTER":"REGISTER"}
              </button>
            </li>
            <li class="flex justify-between items-center py-0.5">
              <span class="text-slate-500">INACTIVITY TIMEOUT:</span>
              <select id="system-session-timeout-select" aria-label="Inactivity Timeout Select" class="bg-slate-900 border border-slate-800 rounded px-1.5 py-0.5 text-[10px] font-mono text-slate-300 focus:outline-none focus:border-teal-500 cursor-pointer">
                <option value="5" ${parseInt(localStorage.getItem("secops-wiki-session-timeout")||"15",10)===5?"selected":""}>5 MIN</option>
                <option value="15" ${parseInt(localStorage.getItem("secops-wiki-session-timeout")||"15",10)===15?"selected":""}>15 MIN</option>
                <option value="30" ${parseInt(localStorage.getItem("secops-wiki-session-timeout")||"15",10)===30?"selected":""}>30 MIN</option>
                <option value="60" ${parseInt(localStorage.getItem("secops-wiki-session-timeout")||"15",10)===60?"selected":""}>1 HOUR</option>
                <option value="0" ${parseInt(localStorage.getItem("secops-wiki-session-timeout")||"15",10)===0?"selected":""}>NEVER</option>
              </select>
            </li>
          </ul>
        </div>

        <!-- Resource Telemetry Chart -->
        <div class="glass-panel border border-slate-800 rounded-xl p-5 space-y-4">
          <h3 class="text-sm font-bold font-mono text-white uppercase tracking-wider border-b border-slate-800 pb-2">Resource Utilization</h3>
          <div class="flex flex-col items-center justify-center bg-slate-950/60 p-2 border border-slate-850 rounded-lg">
            <canvas id="system-telemetry-canvas" class="max-w-full"></canvas>
          </div>
          <div class="flex justify-between text-[10px] font-mono text-slate-500 pt-1">
            <span>STORAGE USAGE: <span id="storage-usage-telemetry" class="text-teal-400 font-bold">Calculating...</span></span>
            <span>QUOTA LIMIT: <span id="storage-quota-telemetry" class="text-slate-400">Calculating...</span></span>
          </div>
        </div>

        <!-- Database Telemetry -->
        <div class="glass-panel border border-slate-800 rounded-xl p-5 space-y-4">
          <h3 class="text-sm font-bold font-mono text-white uppercase tracking-wider border-b border-slate-800 pb-2">Database Stats</h3>
          <ul class="space-y-2 text-xs font-mono">
            <li class="flex justify-between">
              <span class="text-slate-500">TOTAL ARTICLES:</span>
              <span class="text-teal-400 font-bold" id="total-articles-telemetry">Calculating...</span>
            </li>
            <li class="flex justify-between">
              <span class="text-slate-500">TOTAL UNIQUE TAGS:</span>
              <span class="text-teal-400 font-bold" id="total-tags-telemetry">Calculating...</span>
            </li>
            <li class="flex justify-between">
              <span class="text-slate-500">TOTAL WORD COUNT:</span>
              <span class="text-teal-400 font-bold" id="total-words-telemetry">Calculating...</span>
            </li>
            <li class="flex justify-between">
              <span class="text-slate-500">INDEX DB ALLOCATION:</span>
              <span class="text-teal-400">UNRESTRICTED (IndexedDB limit)</span>
            </li>
            <li class="flex justify-between">
              <span class="text-slate-500">REVISION VERIFICATION:</span>
              <span class="text-teal-400">OK</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Actions Panel -->
      <div class="glass-panel border border-slate-800 rounded-xl p-5 space-y-5">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-2">
          <h3 class="text-sm font-bold font-mono text-white uppercase tracking-wider">Data Operations & Backups</h3>
          <div class="flex items-center gap-2">
            <span class="text-[10px] font-mono text-slate-500 uppercase">Export Scope Tag:</span>
            <select id="export-tag-filter" aria-label="Export scope tag filter" class="bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs font-mono text-slate-300 focus:outline-none focus:border-teal-500">
              <option value="ALL">ALL ARTICLES</option>
              ${e.map(A=>`
                <option value="${_(A)}">#${_(A)}</option>
              `).join("")}
            </select>
          </div>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <!-- Export Database JSON -->
          <div class="bg-slate-950/40 border border-slate-800 p-4 rounded-lg flex flex-col justify-between">
            <div>
              <h4 class="text-xs font-bold font-mono text-white uppercase">Export Database JSON</h4>
              <p class="text-[10px] text-slate-500 font-mono mt-1 mb-4">Export scoped wiki contents to a validated JSON payload file.</p>
            </div>
            <button id="system-export-btn" class="w-full py-2 bg-slate-900 border border-slate-850 hover:border-slate-700 text-slate-300 font-mono text-xs uppercase rounded transition hover:text-white">
              Download JSON
            </button>
          </div>

          <!-- Export Markdown ZIP -->
          <div class="bg-slate-950/40 border border-slate-800 p-4 rounded-lg flex flex-col justify-between">
            <div>
              <h4 class="text-xs font-bold font-mono text-white uppercase">Export Markdown ZIP</h4>
              <p class="text-[10px] text-slate-500 font-mono mt-1 mb-4">Export scoped articles as separate .md documents inside a ZIP container.</p>
            </div>
            <button id="system-export-zip-btn" class="w-full py-2 bg-slate-900 border border-slate-850 hover:border-slate-700 text-slate-300 font-mono text-xs uppercase rounded transition hover:text-white">
              Download ZIP
            </button>
          </div>

          <!-- Export Static Website HTML ZIP -->
          <div class="bg-slate-950/40 border border-slate-800 p-4 rounded-lg flex flex-col justify-between">
            <div>
              <h4 class="text-xs font-bold font-mono text-white uppercase">Static Web Book (ZIP)</h4>
              <p class="text-[10px] text-slate-500 font-mono mt-1 mb-4">Export scoped articles as fully-functional, hyperlinked offline .html documents in a ZIP.</p>
            </div>
            <button id="system-export-web-zip-btn" class="w-full py-2 bg-slate-900 border border-slate-850 hover:border-slate-700 text-slate-300 font-mono text-xs uppercase rounded transition hover:text-white">
              Download Web ZIP
            </button>
          </div>

          <!-- Export Consolidated HTML -->
          <div class="bg-slate-950/40 border border-slate-800 p-4 rounded-lg flex flex-col justify-between">
            <div>
              <h4 class="text-xs font-bold font-mono text-white uppercase">Consolidated HTML Book</h4>
              <p class="text-[10px] text-slate-500 font-mono mt-1 mb-4">Export scoped pages concatenated into a single styled, printable HTML file.</p>
            </div>
            <button id="system-export-html-btn" class="w-full py-2 bg-slate-900 border border-slate-850 hover:border-slate-700 text-slate-300 font-mono text-xs uppercase rounded transition hover:text-white">
              Download HTML
            </button>
          </div>

          <!-- Export CSV Report -->
          <div class="bg-slate-950/40 border border-slate-800 p-4 rounded-lg flex flex-col justify-between">
            <div>
              <h4 class="text-xs font-bold font-mono text-white uppercase">Export CSV Metadata</h4>
              <p class="text-[10px] text-slate-500 font-mono mt-1 mb-4">Download a metadata and audit log spreadsheet report in CSV format.</p>
            </div>
            <button id="system-export-csv-btn" class="w-full py-2 bg-slate-900 border border-slate-850 hover:border-slate-700 text-slate-300 font-mono text-xs uppercase rounded transition hover:text-white">
              Download CSV
            </button>
          </div>

          <!-- Conflict Resolution Options -->
          <div class="bg-slate-950/40 border border-slate-800 p-4 rounded-lg flex flex-col justify-between sm:col-span-2 lg:col-span-1">
            <div>
              <h4 class="text-xs font-bold font-mono text-white uppercase">Conflict Resolution</h4>
              <p class="text-[10px] text-slate-500 font-mono mt-1 mb-4">Select system behavior when importing existing page slugs.</p>
            </div>
            <select id="import-conflict-resolution" aria-label="Import conflict resolution strategy" class="w-full py-2 bg-slate-900 border border-slate-850 hover:border-slate-700 text-slate-300 font-mono text-xs uppercase rounded transition focus:outline-none focus:border-teal-500 text-center cursor-pointer">
              <option value="ASK" selected>PROMPT / COMPARE</option>
              <option value="REVISION">ARCHIVE OLD AS REV</option>
              <option value="OVERWRITE">DIRECT OVERWRITE</option>
              <option value="SKIP">SKIP DUPLICATE</option>
              <option value="MERGE_RENAME">KEEP BOTH (RENAME)</option>
            </select>
          </div>

          <!-- Unified Ingestion Loader -->
          <div class="bg-slate-950/40 border border-slate-800 p-4 rounded-lg flex flex-col justify-between sm:col-span-2 lg:col-span-3">
            <div>
              <h4 class="text-xs font-bold font-mono text-white uppercase">Unified Ingestion Loader</h4>
              <p class="text-[10px] text-slate-500 font-mono mt-1 mb-4">Ingest JSON backup, CSV spreadsheet, or Markdown files (.md). Extension auto-detection will route and parse automatically.</p>
            </div>
            <div class="flex flex-col sm:flex-row gap-3">
              <label class="flex-1 text-center py-2 bg-slate-900 border border-slate-850 hover:border-slate-700 text-slate-300 font-mono text-xs uppercase rounded cursor-pointer transition hover:text-white block select-none">
                Select File(s)
                <input type="file" id="system-unified-import-file" aria-label="Upload JSON, Markdown, or CSV backup files" accept=".json,.md,.csv" multiple class="hidden">
              </label>
              <div id="system-drop-zone" class="flex-[2] border-2 border-dashed border-slate-800 hover:border-teal-500/60 p-2 rounded flex items-center justify-center text-center transition-all cursor-pointer bg-slate-950/20 min-h-[38px]">
                <span class="text-[9px] font-mono text-slate-400 uppercase">Or Drag & Drop files here</span>
              </div>
            </div>
          </div>

          <!-- Tag Color Customization Palette -->
          <div class="bg-slate-950/40 border border-slate-800 p-4 rounded-lg flex flex-col justify-between sm:col-span-2 lg:col-span-3">
            <div>
              <h4 class="text-xs font-bold font-mono text-white uppercase">Tag Theme Palette Manager</h4>
              <p class="text-[10px] text-slate-500 font-mono mt-1 mb-4">Assign individual visual themes to active document tags.</p>
            </div>
            <div id="tag-color-palette-manager" class="mt-2 space-y-2">
              <!-- Tag manager dynamic elements will render here -->
            </div>
          </div>

          <!-- PWA Offline Cache Buster -->
          <div class="bg-slate-950/40 border border-slate-800 p-4 rounded-lg flex flex-col justify-between sm:col-span-2 lg:col-span-3">
            <div>
              <h4 class="text-xs font-bold font-mono text-amber-400 uppercase">PWA Offline Cache Buster</h4>
              <p class="text-[10px] text-slate-500 font-mono mt-1 mb-4">Purge cached service worker registrations and static asset cache buckets.</p>
            </div>
            <button id="system-cache-bust-btn" class="w-full py-2 bg-amber-950/20 border border-amber-900/30 hover:bg-amber-900/30 text-amber-400 hover:text-amber-300 font-mono text-xs uppercase rounded transition">
              Bust Cache
            </button>
          </div>

          <!-- Compact Revisions -->
          <div class="bg-slate-950/40 border border-slate-800 p-4 rounded-lg flex flex-col justify-between">
            <div>
              <h4 class="text-xs font-bold font-mono text-white uppercase">Compact Page Revisions</h4>
              <p class="text-[10px] text-slate-500 font-mono mt-1 mb-4">Merge multiple minor page revisions, leaving only the latest revision per page to optimize IndexedDB storage.</p>
            </div>
            <button id="system-compact-btn" class="w-full py-2 bg-slate-900 border border-slate-850 hover:border-slate-700 text-slate-350 font-mono text-xs uppercase rounded transition hover:text-white">
              Compact Logs
            </button>
          </div>

          <!-- Reset Default Database -->
          <div class="bg-slate-950/40 border border-slate-800 p-4 rounded-lg flex flex-col justify-between sm:col-span-2 lg:col-span-3">
            <div>
              <h4 class="text-xs font-bold font-mono text-red-400 uppercase">Sanitize Storage</h4>
              <p class="text-[10px] text-slate-500 font-mono mt-1 mb-4">Wipe all user edits and restore default template configuration.</p>
            </div>
            <button id="system-reset-btn" class="w-full py-2 bg-red-950/20 border border-red-900/30 hover:bg-red-900/30 text-red-400 hover:text-red-300 font-mono text-xs uppercase rounded transition">
              Perform Wipe
            </button>
          </div>
        </div>
      </div>

      <!-- Database Diagnostics Report Container -->
      <div id="db-health-diagnostics" class="mt-6"></div>

      <!-- Autosave Draft Recovery Console -->
      <div class="glass-panel border border-slate-800 rounded-xl p-5 mt-6 space-y-4">
        <div class="flex items-center justify-between border-b border-slate-800 pb-2">
          <h3 class="text-sm font-bold font-mono text-white uppercase tracking-wider">Autosave Draft Recovery Console</h3>
          <button id="system-wipe-all-drafts-btn" class="px-2.5 py-1 bg-red-950/20 border border-red-900/30 hover:bg-red-900/30 text-red-400 hover:text-red-300 font-mono text-[10px] rounded transition uppercase">
            Wipe All Drafts
          </button>
        </div>
        <div id="system-drafts-recovery-list" class="space-y-3 max-h-60 overflow-y-auto divide-y divide-slate-850/40 pr-1">
          <!-- Unsaved draft fragments will render dynamically -->
        </div>
      </div>

      <!-- Security Audit Log Console -->
      <div class="glass-panel border border-slate-800 rounded-xl p-5 mt-6 space-y-4">
        <div class="flex items-center justify-between border-b border-slate-800 pb-2">
          <h3 class="text-sm font-bold font-mono text-white uppercase tracking-wider">Security Event & Audit Log Console</h3>
          <div class="flex gap-2">
            <button id="system-prune-audit-btn" class="px-2.5 py-1 bg-slate-900 border border-slate-800 hover:border-slate-700 text-teal-400 hover:text-teal-300 font-mono text-[10px] rounded transition uppercase">
              Prune >30 Days
            </button>
            <button id="system-wipe-audit-btn" class="px-2.5 py-1 bg-red-950/20 border border-red-900/30 hover:bg-red-900/30 text-red-400 hover:text-red-300 font-mono text-[10px] rounded transition uppercase">
              Clear Audit Logs
            </button>
          </div>
        </div>
        <div id="system-audit-logs-list" class="space-y-2 max-h-60 overflow-y-auto divide-y divide-slate-850/40 pr-1">
          <!-- Dynamic audit logs will render here -->
        </div>
      </div>
    </div>
  `;const t=document.getElementById("system-export-btn"),n=document.getElementById("system-export-zip-btn"),o=document.getElementById("system-export-web-zip-btn"),a=document.getElementById("system-export-csv-btn"),r=document.getElementById("system-export-html-btn"),i=document.getElementById("system-unified-import-file"),l=document.getElementById("system-reset-btn"),d=document.getElementById("total-articles-telemetry"),p=document.getElementById("db-health-diagnostics"),m=document.getElementById("system-drop-zone");d.textContent=ue.length.toString();const u=document.getElementById("total-tags-telemetry"),f=document.getElementById("total-words-telemetry");if(u){const A=new Set(ue.flatMap(D=>D.tags));u.textContent=A.size.toString()}if(f){const A=ue.reduce((D,M)=>D+M.content.split(/\s+/).filter(F=>F.length>0).length,0);f.textContent=A.toLocaleString()}const y=document.getElementById("system-telemetry-canvas"),L=document.getElementById("storage-usage-telemetry"),x=document.getElementById("storage-quota-telemetry");navigator.storage&&navigator.storage.estimate?navigator.storage.estimate().then(A=>{const D=A.usage||0,M=A.quota||1;L&&(L.textContent=D<1024?`${D} B`:D<1024*1024?`${(D/1024).toFixed(1)} KB`:`${(D/(1024*1024)).toFixed(1)} MB`),x&&(x.textContent=M<1024*1024*1024?`${(M/(1024*1024)).toFixed(0)} MB`:`${(M/(1024*1024*1024)).toFixed(1)} GB`),y&&fn().then(F=>{yo(y,F,D,M)})}):(L&&(L.textContent="N/A"),x&&(x.textContent="N/A"),y&&fn().then(A=>{yo(y,A,0,1)}));const N=document.getElementById("system-compact-btn");N&&N.addEventListener("click",async()=>{if(confirm("STORAGE OPTIMIZATION: This will delete older historical revisions, keeping only the single most recent revision for each page. Proceed?")){let A=0;const D=await bn();for(const M of D){const F=await na(M.slug);if(F.length>1)for(let Z=1;Z<F.length;Z++)await Eo(F[Z].id),A++}await pe("REVISION_COMPACT",`Compacted revision history, purged ${A} historical entries.`),alert(`Revision compaction complete. Purged ${A} older revision logs.`),fe()}}),p&&Li(p),yi();const G=()=>{const A=document.getElementById("export-tag-filter"),D=(A==null?void 0:A.value)||"ALL";return D==="ALL"?ue:ue.filter(M=>M.tags.includes(D))};t.addEventListener("click",async()=>{const A=G(),D=await Da(),M={pages:A,attachments:D},F=prompt("Secure Backup: Enter a password to encrypt this database backup file (leave blank for plain JSON):");let Z,$=`secops-wiki-backup-${Date.now()}.json`;if(F)try{const B=await Ce(F),W=JSON.stringify(M,null,2),le={encrypted:!0,schemaVersion:4,payload:await rt(W,B)};Z=new Blob([JSON.stringify(le,null,2)],{type:"application/json"}),$=`secops-wiki-encrypted-backup-${Date.now()}.json`}catch(B){alert(`Backup encryption failed: ${B.message}`);return}else{if(F===null)return;const B={encrypted:!1,schemaVersion:4,payload:M};Z=new Blob([JSON.stringify(B,null,2)],{type:"application/json"})}const b=URL.createObjectURL(Z),P=document.createElement("a");P.href=b,P.download=$,document.body.appendChild(P),P.click(),document.body.removeChild(P),URL.revokeObjectURL(b)}),n.addEventListener("click",async()=>{const A=G(),D=[];for(const $ of A){let b=$.content;if($.isEncrypted&&J)try{b=await ye($.content,J)}catch{}const P=`---
title: ${$.title}
slug: ${$.slug}
tags: ${$.tags.join(", ")}
updated: ${new Date($.updatedAt).toISOString()}
encrypted: ${!!$.isEncrypted}
---

`;D.push({name:`${$.slug}.md`,content:P+b})}const M=Yo(D),F=URL.createObjectURL(M),Z=document.createElement("a");Z.href=F,Z.download=`secops-wiki-backup-${Date.now()}.zip`,document.body.appendChild(Z),Z.click(),document.body.removeChild(Z),URL.revokeObjectURL(F)}),o.addEventListener("click",()=>{const A=G(),D=mi(A),M=URL.createObjectURL(D),F=document.createElement("a");F.href=M,F.download=`secops-wiki-web-${Date.now()}.zip`,document.body.appendChild(F),F.click(),document.body.removeChild(F),URL.revokeObjectURL(M)}),a.addEventListener("click",()=>{const A=G(),D=ui(A),M=new Blob([D],{type:"text/csv;charset=utf-8;"}),F=URL.createObjectURL(M),Z=document.createElement("a");Z.href=F,Z.download=`secops-wiki-report-${Date.now()}.csv`,document.body.appendChild(Z),Z.click(),document.body.removeChild(Z),URL.revokeObjectURL(F)}),r.addEventListener("click",()=>{const A=G(),D=fi(A),M=new Blob([D],{type:"text/html;charset=utf-8;"}),F=URL.createObjectURL(M),Z=document.createElement("a");Z.href=F,Z.download=`secops-wiki-book-${Date.now()}.html`,document.body.appendChild(Z),Z.click(),document.body.removeChild(Z),URL.revokeObjectURL(F)}),i&&i.addEventListener("change",async A=>{const D=A.target.files;D&&D.length>0&&await go(D)}),["dragenter","dragover","dragleave","drop"].forEach(A=>{m.addEventListener(A,D=>{D.preventDefault(),D.stopPropagation()},!1)}),["dragenter","dragover"].forEach(A=>{m.addEventListener(A,()=>{m.classList.add("border-teal-500","bg-teal-950/10")},!1)}),["dragleave","drop"].forEach(A=>{m.addEventListener(A,()=>{m.classList.remove("border-teal-500","bg-teal-950/10")},!1)}),m.addEventListener("drop",async A=>{const D=A.dataTransfer,M=D==null?void 0:D.files;M&&M.length>0&&await go(M)}),m.addEventListener("click",()=>{i&&i.click()}),l.addEventListener("click",async()=>{if(!await En("HARD WIPING DATABASE AND ALL DOCUMENTS")){alert("Verification Failed: Consent signature rejected.");return}const D=prompt('CRITICAL SECURITY WARNING: Type "WIPE" to verify you want to delete ALL wiki pages and custom documents:');if(D==="WIPE")try{if(await ko(),"caches"in window)try{const M=await caches.keys();for(const F of M)await caches.delete(F)}catch(M){console.warn("Failed to clear caches: ",M)}await ps(),await ys(),alert("Database successfully wiped, caches invalidated, and seeded with standard operating defaults."),localStorage.setItem("secops-wiki-last-update",Date.now().toString()),xt.postMessage("refresh"),await Le(),window.location.hash="#/page/home"}catch(M){alert(`Reset failed: ${M.message}`)}else D!==null&&alert("Sanitization aborted. Confirmation keyword mismatch.")});const v=document.getElementById("system-session-timeout-select");v&&v.addEventListener("change",()=>{localStorage.setItem("secops-wiki-session-timeout",v.value),vs()});const w=document.getElementById("system-cache-bust-btn");w&&w.addEventListener("click",async()=>{if(confirm("CRITICAL DIAGNOSTICS: Purge cached service worker registrations and static asset cache buckets? This triggers an immediate application reload.")){if("serviceWorker"in navigator){const A=await navigator.serviceWorker.getRegistrations();for(const D of A)await D.unregister()}if("caches"in window){const A=await caches.keys();for(const D of A)await caches.delete(D)}alert("CACHE WIPE COMPLETED. Reloading system..."),window.location.reload()}});const E=document.getElementById("system-mask-encrypted-checkbox");E&&E.addEventListener("change",()=>{at=E.checked,localStorage.setItem("secops-wiki-mask-encrypted",at.toString()),Le().then(()=>{fe()})});const O=document.getElementById("system-db-encrypted-checkbox");O&&O.addEventListener("change",async()=>{if(O.checked){const D=await xo("activate");if(!D){O.checked=!1;return}const M=Go(D);if(!M.valid){alert(`SECURITY ERROR: Passphrase too weak.

${M.message}`),O.checked=!1;return}try{he=await Ce(D),localStorage.setItem("secops-wiki-db-encrypted","true");const Z=await Wt();for(const $ of Z)$.isEncryptedAtRest||await Oe($);alert("Database encryption successfully activated. All records are encrypted at rest."),await pe("DB_ENCRYPTION_ENABLED","Activated database encryption-at-rest."),await Le(),Ht(s)}catch(F){alert(`Activation failed: ${F.message}`),O.checked=!1}}else{const D=await xo("deactivate");if(!D){O.checked=!0;return}try{const M=await Ce(D);if(!await gt(M)){alert("Verification Failed: Incorrect master passphrase."),O.checked=!0;return}const Z=await bn();localStorage.setItem("secops-wiki-db-encrypted","false"),localStorage.removeItem("secops-wiki-webauthn-gate"),localStorage.removeItem("secops-wiki-webauthn-payload"),localStorage.removeItem("secops-wiki-webauthn-salt"),he=null;for(const $ of Z){const b={slug:$.slug,title:$.title,content:$.content,tags:$.tags,isSystem:$.isSystem,isEncrypted:$.isEncrypted,signature:$.signature,updatedAt:$.updatedAt};await un(b)}alert("Database encryption-at-rest successfully deactivated."),await pe("DB_ENCRYPTION_DISABLED","Deactivated database encryption-at-rest."),await Le(),Ht(s)}catch(M){alert(`Deactivation failed: ${M.message}`),O.checked=!0}}});const U=document.getElementById("system-webauthn-register-btn");U&&U.addEventListener("click",async()=>{localStorage.getItem("secops-wiki-webauthn-gate")==="true"?confirm("Are you sure you want to deregister biometric credentials?")&&(localStorage.removeItem("secops-wiki-webauthn-gate"),localStorage.removeItem("secops-wiki-webauthn-payload"),localStorage.removeItem("secops-wiki-webauthn-salt"),alert("Biometric unlock credentials removed."),await pe("WEBAUTHN_DEREGISTER","Removed biometric credentials."),Ht(s)):await Ni()}),Qn();const ie=document.getElementById("system-prune-audit-btn");ie&&ie.addEventListener("click",async()=>{confirm("Audit Log Pruning: Confirm deletion of security logs older than 30 days?")&&(await Ao(30),await pe("AUDIT_LOG_PRUNED","Manually pruned audit logs older than 30 days."),await Qn(),alert("Audit logs successfully pruned."))});const ae=document.getElementById("system-wipe-audit-btn");ae&&ae.addEventListener("click",async()=>{if(!await En("PURGING AUDIT LOG REGISTERS")){alert("Verification Failed: Consent signature rejected.");return}confirm("CRITICAL ACTION: Are you sure you want to purge the security audit log registers?")&&(await To(),await pe("AUDIT_LOG_CLEARED","Security audit log register cleared."),await Qn())}),ds();const te=document.getElementById("system-wipe-all-drafts-btn");te&&te.addEventListener("click",()=>{if(confirm("CRITICAL WARN: Purge all unsaved document draft fragments in local storage?")){const A=[];for(let D=0;D<localStorage.length;D++){const M=localStorage.key(D)||"";M.startsWith("secops-wiki-draft-")&&A.push(M)}A.forEach(D=>localStorage.removeItem(D)),ds()}})}function ds(){const s=document.getElementById("system-drafts-recovery-list");if(!s)return;const e=[];for(let n=0;n<localStorage.length;n++){const o=localStorage.key(n)||"";o.startsWith("secops-wiki-draft-")&&e.push(o)}const t=e.map(n=>{try{const o=localStorage.getItem(n)||"",a=JSON.parse(o),r=n.substring(18);return{key:n,slug:r,title:a.title||"(Untitled)",updatedAt:a.updatedAt||Date.now(),size:o.length}}catch{return null}}).filter(n=>n!==null);if(t.length===0){s.innerHTML='<p class="text-xs font-mono text-slate-500">No unsaved drafts found in local storage.</p>';return}s.innerHTML=t.map(n=>`
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 first:pt-0">
      <div class="min-w-0">
        <p class="text-xs font-mono text-slate-350 truncate">DRAFT // ${_(n.title)}</p>
        <div class="flex items-center gap-2 mt-1 text-[9px] font-mono text-slate-500 uppercase">
          <span>SLUG: ${_(n.slug)}</span>
          <span>•</span>
          <span>SIZE: ${n.size} B</span>
          <span>•</span>
          <span>SAVED: ${new Date(n.updatedAt).toLocaleString()}</span>
        </div>
      </div>
      <div class="flex gap-2 shrink-0 self-start sm:self-auto">
        <button class="draft-action-restore px-2 py-1 bg-slate-900 border border-slate-800 hover:border-slate-700 text-teal-400 hover:text-teal-300 font-mono text-[10px] rounded transition uppercase" data-slug="${_(n.slug)}">
          Restore
        </button>
        <button class="draft-action-wipe px-2 py-1 bg-red-950/20 border border-red-900/30 hover:bg-red-900/30 text-red-400 hover:text-red-300 font-mono text-[10px] rounded transition uppercase" data-key="${_(n.key)}">
          Wipe
        </button>
      </div>
    </div>
  `).join(""),s.querySelectorAll(".draft-action-restore").forEach(n=>{n.addEventListener("click",o=>{const a=o.currentTarget.getAttribute("data-slug");et=!0,Be=a==="new",ne=a,window.location.hash=Be?"#/new":`#/edit/${a}`})}),s.querySelectorAll(".draft-action-wipe").forEach(n=>{n.addEventListener("click",o=>{const a=o.currentTarget.getAttribute("data-key");localStorage.removeItem(a),ds()})})}function Ft(){const s=document.getElementById("command-palette-backdrop");if(s)if(qn=!qn,qn){s.classList.remove("hidden");const e=document.getElementById("command-palette-input");e&&(e.value="",e.focus()),Ue=0,vn()}else s.classList.add("hidden")}function Qo(){if(document.getElementById("command-palette-backdrop"))return;const s=document.createElement("div");s.id="command-palette-backdrop",s.className="fixed inset-0 bg-[#090d16]/85 backdrop-blur-md z-50 flex items-start justify-center pt-20 hidden",s.innerHTML=`
    <div class="glass-panel border border-teal-900/30 rounded-xl w-full max-w-lg overflow-hidden shadow-2xl mx-4 glow-border">
      <input type="text" id="command-palette-input" aria-label="Search pages or run system commands" placeholder="Search pages or run system commands..." class="w-full bg-slate-950/80 text-white font-mono text-sm p-4 outline-none border-b border-slate-800 focus:border-teal-500/30 placeholder-slate-500 transition">
      <div id="command-palette-results" class="max-h-80 overflow-y-auto divide-y divide-slate-850/40 p-2 space-y-1"></div>
    </div>
  `,document.body.appendChild(s);const e=document.getElementById("command-palette-input");e.addEventListener("input",()=>{Ue=0,vn()}),e.addEventListener("keydown",vi),s.addEventListener("click",t=>{t.target===s&&Ft()})}function vn(){const s=document.getElementById("command-palette-input"),e=document.getElementById("command-palette-results");if(!e)return;const t=s?s.value.trim().toLowerCase():"",n=[{title:"CREATE NEW PAGE",subtitle:"Open the editor to establish a new document",icon:"➕",action:()=>{window.location.hash="#/new"}},{title:"TOGGLE THEME",subtitle:`Switch visual style (currently ${pt})`,icon:"🌓",action:()=>{Vo()}},{title:"SYSTEM ADMIN",subtitle:"Access operations console and db diagnostics",icon:"⚙️",action:()=>{window.location.hash="#/system"}},{title:"TACTICAL MAP VIEW",subtitle:"Display interactive node relationship map",icon:"🗺️",action:()=>{window.location.hash="#/graph"}},{title:"PANIC PURGE PROTOCOL",subtitle:"Emergency self-destruct - wipes all data",icon:"🚨",action:()=>{const p=document.getElementById("system-panic-btn");p&&p.click()}}];let o="",a=0;const r=n.filter(p=>p.title.toLowerCase().includes(t)||p.subtitle.toLowerCase().includes(t));let i=[];t?i=ue.map(p=>({page:p,score:Ko(mt.find(m=>m.slug===p.slug)||p,t)})).filter(p=>p.score>0).sort((p,m)=>m.score-p.score):i=ue.slice(0,5).map(p=>({page:p,score:0}));const l=r.length+i.length;Ue>=l?Ue=0:Ue<0&&(Ue=l-1),r.forEach(p=>{o+=`
      <div class="command-palette-item p-3 rounded-lg flex items-center justify-between cursor-pointer font-mono text-xs transition-all ${a===Ue?"command-item-active bg-teal-950/20 text-teal-400 border-l-2 border-teal-500":"text-slate-400 hover:bg-slate-900/40 hover:text-slate-200"}" data-index="${a}">
        <div class="flex items-center gap-3">
          <span class="text-base">${p.icon}</span>
          <div>
            <div class="font-bold text-white uppercase">${p.title}</div>
            <div class="text-[10px] text-slate-500">${p.subtitle}</div>
          </div>
        </div>
        <span class="text-[10px] text-slate-650 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-900 uppercase">CMD</span>
      </div>
    `,a++}),i.forEach(p=>{const m=a===Ue,u=p.page,f=mt.find(x=>x.slug===u.slug)||u,y=t?Wi(f.content,t):"",L=y?`<div class="text-[9px] text-teal-400/80 font-mono mt-0.5 max-w-md truncate">${_(y)}</div>`:"";o+=`
      <div class="command-palette-item p-3 rounded-lg flex items-center justify-between cursor-pointer font-mono text-xs transition-all ${m?"command-item-active bg-teal-950/20 text-teal-400 border-l-2 border-teal-500":"text-slate-400 hover:bg-slate-900/40 hover:text-slate-200"}" data-index="${a}">
        <div class="flex items-center gap-3 min-w-0">
          <span class="text-base shrink-0">${u.isEncrypted?"🔒":"📄"}</span>
          <div class="min-w-0">
            <div class="font-bold text-white truncate">${_(u.title)}</div>
            <div class="text-[10px] text-slate-500 truncate">Slug: ${_(u.slug)} ${u.tags.length?`• tags: #${u.tags.map(x=>_(x)).join(", #")}`:""}</div>
            ${L}
          </div>
        </div>
        <span class="text-[10px] text-slate-650 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-900 uppercase shrink-0">PAGE</span>
      </div>
    `,a++}),l===0&&(o='<div class="text-center py-6 text-xs text-slate-600 font-mono">No matching commands or pages found.</div>'),e.innerHTML=o,e.querySelectorAll(".command-palette-item").forEach(p=>{p.addEventListener("click",()=>{const m=parseInt(p.getAttribute("data-index")||"0",10);wi(m,r,i)})}),Ei()}function wi(s,e,t){if(Ft(),s<e.length)e[s].action();else{const n=s-e.length;n<t.length&&(window.location.hash=`#/page/${t[n].page.slug}`)}}function vi(s){const e=document.getElementById("command-palette-results");if(!e)return;const t=e.querySelectorAll(".command-palette-item");if(t.length!==0)if(s.key==="ArrowDown")s.preventDefault(),Ue=(Ue+1)%t.length,vn();else if(s.key==="ArrowUp")s.preventDefault(),Ue=(Ue-1+t.length)%t.length,vn();else if(s.key==="Enter"){s.preventDefault();const n=e.querySelector(".command-item-active");n&&n.click()}else s.key==="Escape"&&(s.preventDefault(),Ft())}function Ei(){const s=document.getElementById("command-palette-results");if(!s)return;const e=s.querySelector(".command-item-active");e&&e.scrollIntoView({block:"nearest"})}function ki(s){const e=document.getElementById("autocomplete-popup");e&&(e.classList.remove("hidden"),ea(s))}function pn(){const s=document.getElementById("autocomplete-popup");s&&(s.classList.add("hidden"),cn=!1)}function ea(s){const e=document.getElementById("autocomplete-popup");if(!e)return;const t=as.toLowerCase().trim(),n=ue.filter(a=>a.title.toLowerCase().includes(t)||a.slug.toLowerCase().includes(t));if(n.length===0){e.innerHTML='<div class="p-2 text-slate-500 italic">No matches found</div>';return}e.innerHTML=n.map((a,r)=>`
    <div class="editor-autocomplete-item p-2 cursor-pointer transition ${r===0?"active bg-teal-950/20 text-teal-400":"text-slate-400 hover:bg-slate-900/40 hover:text-slate-200"}" data-slug="${_(a.slug)}" data-title="${_(a.title)}">
      <span class="font-bold">${_(a.title)}</span>
      <span class="text-[9px] text-slate-500 block truncate">Slug: ${_(a.slug)}</span>
    </div>
  `).join(""),e.querySelectorAll(".editor-autocomplete-item").forEach(a=>{a.addEventListener("click",r=>{const i=r.currentTarget,l=i.getAttribute("data-slug")||"",d=i.getAttribute("data-title")||"";Ti(s,d,l)})});const o=Si(s,s.selectionStart);e.style.left=`${Math.min(s.clientWidth-260,Math.max(16,o.left))}px`,e.style.top=`${Math.min(s.clientHeight-100,Math.max(40,o.top+20))}px`}function Si(s,e){const n=s.value.substring(0,e).split(`
`),o=n.length-1,a=n[o],r=8,i=20,l=16+a.length*r%(s.clientWidth-40),d=12+o*i-s.scrollTop;return{left:l,top:d}}function Ti(s,e,t){const n=dn-2,o=s.selectionStart,a=s.value,r=`[${e}](#/page/${t})`;s.value=a.substring(0,n)+r+a.substring(o),s.focus(),s.selectionStart=n+r.length,s.selectionEnd=n+r.length,pn();const i=document.getElementById("live-preview-box");i&&(i.innerHTML=It(s.value))}async function Ai(s,e,t){const n=await We(s);if(!n)return;let o=n.content;const a=!!n.isEncrypted;if(a){if(!J){alert("Authentication Error: Decryption key is missing. Re-decrypt page first.");return}try{o=await ye(o,J)}catch{alert("Decryption failure.");return}}let r=0;const i=/([-*+]\s+\[)([ xX])(\])/g,l=o.replace(i,(m,u,f,y)=>r===e?(r++,`${u}${t?"x":" "}${y}`):(r++,m));let d=l;a&&J&&(d=await rt(l,J)),n.content=d,n.updatedAt=Date.now(),n.signature=await Je(n),await Oe(n),xt.postMessage("refresh"),await Le();const p=document.getElementById("main-content");p&&await wn(p)}function ta(s){const e=[],t=/(?:\(|"|^|\s)#\/page\/([a-z0-9-_]+)/g;let n;for(;(n=t.exec(s))!==null;)e.push(n[1].toLowerCase());return Array.from(new Set(e))}async function Ii(s){s.innerHTML=`
    <div class="space-y-6">
      <div class="border-b border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 class="text-2xl font-bold font-mono text-white uppercase">Tactical Node Relationship Map</h2>
          <p class="text-xs text-slate-500 font-mono">Interactive force-directed graph visualizing document links and citation clusters.</p>
        </div>
        <a href="#/page/home" class="px-4 py-2 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 font-mono text-xs uppercase rounded transition hover:text-white self-start sm:self-auto">
          Back to Dashboard
        </a>
      </div>

      <!-- Canvas Panel -->
      <div class="glass-panel border border-slate-800 rounded-xl p-4 flex flex-col items-center justify-center relative min-h-[500px]">
        <canvas id="tactical-map-canvas" class="w-full h-[500px] bg-slate-950/40 rounded-lg"></canvas>
        
        <!-- Search Input Overlay -->
        <div class="absolute top-6 left-6 z-10 select-none max-w-[200px] sm:max-w-xs">
          <input type="text" id="map-search-input" aria-label="Search map nodes" placeholder="Search map nodes..." class="w-full bg-slate-950/90 border border-slate-800 focus:border-teal-500/50 hover:border-slate-700 rounded-lg py-1.5 px-3 text-xs text-slate-200 focus:outline-none transition font-mono shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
        </div>
        
        <!-- Controls Overlay -->
        <div class="absolute top-6 right-6 flex flex-col gap-2 z-10 select-none">
          <button id="map-zoom-in" title="Zoom In" aria-label="Zoom In" class="w-8 h-8 flex items-center justify-center bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-teal-400 text-slate-400 font-bold rounded shadow transition focus:outline-none">＋</button>
          <button id="map-zoom-out" title="Zoom Out" aria-label="Zoom Out" class="w-8 h-8 flex items-center justify-center bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-teal-400 text-slate-400 font-bold rounded shadow transition focus:outline-none">－</button>
          <button id="map-zoom-reset" title="Reset View" aria-label="Reset View" class="w-8 h-8 flex items-center justify-center bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-teal-400 text-slate-400 text-[10px] font-mono rounded shadow transition focus:outline-none uppercase">RST</button>
        </div>

        <!-- Legend Overlay -->
        <div class="absolute bottom-6 left-6 bg-slate-950/90 border border-slate-800 rounded-lg p-3 space-y-2 text-[10px] font-mono select-none pointer-events-none">
          <div class="text-xs font-bold text-white mb-1 uppercase tracking-wider">Map Legend</div>
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-teal-500 shadow-[0_0_8px_rgba(20,184,166,0.5)]"></span>
            <span class="text-slate-400">Standard Page</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></span>
            <span class="text-slate-400">System Document</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"></span>
            <span class="text-slate-400">Encrypted Page</span>
          </div>
          <div class="h-px bg-slate-800 my-1"></div>
          <div class="text-slate-500">Drag nodes or scroll to zoom. Drag background to pan.</div>
        </div>
      </div>
    </div>
  `;const e=document.getElementById("tactical-map-canvas");if(!e)return;const t=e.getContext("2d");if(!t)return;const n=window.devicePixelRatio||1,o=e.getBoundingClientRect();e.width=o.width*n,e.height=500*n,t.scale(n,n);const a=o.width,r=500;let i=1,l=0,d=0,p=!1,m=0,u=0;const f=ue.map(T=>{const Y=a/2+(Math.random()-.5)*100,X=r/2+(Math.random()-.5)*100;return{id:T.slug,title:T.title,x:Y,y:X,vx:0,vy:0,radius:T.slug==="home"?14:10,isEncrypted:!!T.isEncrypted,isSystem:!!T.isSystem}}),y=[],L=new Set(f.map(T=>T.id));for(const T of ue){let Y=T.content;if(T.isEncrypted&&J)try{Y=await ye(T.content,J)}catch{}ta(Y).forEach(H=>{L.has(H)&&H!==T.slug&&y.push({source:T.slug,target:H})})}let x=null,N=null,G=0,v=0,w=0,E="";const O=document.getElementById("map-search-input");O&&O.addEventListener("input",T=>{E=T.target.value.trim().toLowerCase()});const U=.02,ie=1200,ae=.85,te=.02;function A(T,Y){const X=(T-a/2-l)/i+a/2,H=(Y-r/2-d)/i+r/2;return{x:X,y:H}}function D(){for(let T=0;T<f.length;T++){const Y=f[T];for(let X=T+1;X<f.length;X++){const H=f[X],q=H.x-Y.x,h=H.y-Y.y,C=q*q+h*h+.1,k=Math.sqrt(C);if(k<250){const S=ie/C,V=q/k*S,K=h/k*S;Y!==x&&(Y.vx-=V,Y.vy-=K),H!==x&&(H.vx+=V,H.vy+=K)}}}y.forEach(T=>{const Y=f.find(V=>V.id===T.source),X=f.find(V=>V.id===T.target);if(!Y||!X)return;const H=X.x-Y.x,q=X.y-Y.y,h=Math.sqrt(H*H+q*q)||.1,C=(h-100)*U,k=H/h*C,S=q/h*C;Y!==x&&(Y.vx+=k,Y.vy+=S),X!==x&&(X.vx-=k,X.vy-=S)}),f.forEach(T=>{if(T===x)return;const Y=a/2-T.x,X=r/2-T.y;T.vx+=Y*te,T.vy+=X*te,T.x+=T.vx,T.y+=T.vy,T.vx*=ae,T.vy*=ae,T.x=Math.max(T.radius,Math.min(a-T.radius,T.x)),T.y=Math.max(T.radius,Math.min(r-T.radius,T.y))})}function M(){t.clearRect(0,0,a,r),t.save(),t.translate(a/2+l,r/2+d),t.scale(i,i),t.translate(-a/2,-r/2),t.lineWidth=1,y.forEach(T=>{const Y=f.find(S=>S.id===T.source),X=f.find(S=>S.id===T.target);if(!Y||!X)return;const H=E.length>0,q=H&&Y.title.toLowerCase().includes(E),h=H&&X.title.toLowerCase().includes(E),C=N&&(N.id===Y.id||N.id===X.id);let k=.4;H&&(k=q&&h?.6:.05),t.strokeStyle=C?"rgba(20, 184, 166, 0.6)":`rgba(30, 41, 59, ${k})`,t.lineWidth=C?1.5/i:1/i,t.beginPath(),t.moveTo(Y.x,Y.y),t.lineTo(X.x,X.y),t.stroke()}),f.forEach(T=>{t.beginPath();const Y=E.length>0,X=Y&&T.title.toLowerCase().includes(E);let H=T.radius,q=1,h=0;if(Y)if(X){const K=Math.sin(Date.now()/150)*2+3;H=T.radius+K,h=15,q=1}else q=.2;t.arc(T.x,T.y,H,0,2*Math.PI);let C="#14b8a6",k="rgba(20, 184, 166, 0.4)";T.isEncrypted?(C="#ef4444",k="rgba(239, 68, 68, 0.4)"):T.isSystem&&(C="#3b82f6",k="rgba(59, 130, 246, 0.4)"),t.fillStyle=C,t.globalAlpha=q,t.shadowColor=k,t.shadowBlur=N===T?12:h||6,t.fill(),t.shadowBlur=0,t.strokeStyle=`rgba(255, 255, 255, ${.1*q})`,t.lineWidth=1.5/i,t.stroke();const V=T.isEncrypted&&!J&&at?"[REDACTED CORE]":T.title;t.fillStyle=N===T||X?`rgba(255, 255, 255, ${q})`:`rgba(148, 163, 184, ${q})`,t.font=N===T||X?`bold ${10/i}px monospace`:`${9/i}px monospace`,t.textAlign="center",t.fillText(V,T.x,T.y-H-5/i)}),t.restore(),t.globalAlpha=1}function F(){D(),M(),w=requestAnimationFrame(F)}e.addEventListener("mousemove",T=>{const Y=e.getBoundingClientRect(),X=T.clientX-Y.left,H=T.clientY-Y.top,q=A(X,H);if(G=q.x,v=q.y,x){(Math.abs(T.clientX-$)>4||Math.abs(T.clientY-b)>4)&&(Z=!0),x.x=G,x.y=v,x.vx=0,x.vy=0;return}if(p){l=X-m,d=H-u;return}N=null;for(const h of f){const C=h.x-G,k=h.y-v;if(C*C+k*k<(h.radius+5)*(h.radius+5)){N=h;break}}});let Z=!1,$=0,b=0;e.addEventListener("mousedown",T=>{const Y=e.getBoundingClientRect(),X=T.clientX-Y.left,H=T.clientY-Y.top;if(N){x=N,Z=!1,$=T.clientX,b=T.clientY;const q=A(X,H);x.x=q.x,x.y=q.y}else p=!0,m=X-l,u=H-d}),e.addEventListener("wheel",T=>{T.preventDefault();const Y=e.getBoundingClientRect(),X=T.clientX-Y.left,H=T.clientY-Y.top,q=A(X,H),h=T.deltaY<0?1.1:.9;i=Math.max(.2,Math.min(4,i*h)),l=X-(q.x-a/2)*i-a/2,d=H-(q.y-r/2)*i-r/2},{passive:!1});const P=()=>{x=null,p=!1};window.addEventListener("mouseup",P),e.addEventListener("click",()=>{N&&!Z&&!p&&(cancelAnimationFrame(w),window.location.hash=`#/page/${N.id}`)});const B=document.getElementById("map-zoom-in"),W=document.getElementById("map-zoom-out"),j=document.getElementById("map-zoom-reset");B.addEventListener("click",()=>{i=Math.min(4,i*1.2)}),W.addEventListener("click",()=>{i=Math.max(.2,i/1.2)}),j.addEventListener("click",()=>{i=1,l=0,d=0}),F();const le=()=>{cancelAnimationFrame(w),window.removeEventListener("mouseup",P),window.removeEventListener("hashchange",le)};window.addEventListener("hashchange",le)}async function Li(s){s.innerHTML=`
    <div class="text-xs font-mono text-slate-500 animate-pulse">Running security & link integrity scan...</div>
  `;const e=await bn();let t=0;const n=new TextEncoder;e.forEach(d=>{const p=JSON.stringify(d);t+=n.encode(p).length});const o=t<1024?`${t} Bytes`:t<1024*1024?`${(t/1024).toFixed(2)} KB`:`${(t/(1024*1024)).toFixed(2)} MB`,a=new Set(e.map(d=>d.slug)),r={};e.forEach(d=>{r[d.slug]=[]});const i=[];for(const d of e){let p=d.content;if(d.isEncrypted&&J)try{p=await ye(d.content,J)}catch{}ta(p).forEach(u=>{a.has(u)?u!==d.slug&&r[u].push(d.slug):i.push({source:d.slug,target:u})})}const l=e.filter(d=>d.slug!=="home"&&r[d.slug].length===0);s.innerHTML=`
    <div class="glass-panel border border-slate-800 rounded-xl p-5 space-y-4 font-mono text-xs">
      <h3 class="text-sm font-bold font-mono text-white uppercase tracking-wider border-b border-slate-800 pb-2">Database Integrity Report</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-slate-950/50 border border-slate-850 p-3 rounded-lg text-center">
          <div class="text-[10px] text-slate-500 font-mono uppercase">Total Database Footprint</div>
          <div class="text-base font-bold text-teal-400 font-mono mt-1">${o}</div>
        </div>
        <div class="bg-slate-950/50 border border-slate-850 p-3 rounded-lg text-center">
          <div class="text-[10px] text-slate-500 font-mono uppercase">Broken Reference Citations</div>
          <div class="text-base font-bold font-mono mt-1 ${i.length>0?"text-red-400 animate-pulse":"text-emerald-400"}">${i.length}</div>
        </div>
        <div class="bg-slate-950/50 border border-slate-850 p-3 rounded-lg text-center">
          <div class="text-[10px] text-slate-500 font-mono uppercase">Orphaned Intel Documents</div>
          <div class="text-base font-bold font-mono mt-1 ${l.length>0?"text-amber-500":"text-emerald-400"}">${l.length}</div>
        </div>
      </div>

      <!-- Details -->
      <div class="space-y-3 pt-2 text-xs font-mono">
        <!-- Broken Links Details -->
        <div>
          <span class="text-slate-400 font-bold uppercase block mb-1">Broken Links Analysis:</span>
          ${i.length===0?`
            <span class="text-emerald-400 text-[10px]">✓ All internal page link references verified intact.</span>
          `:`
            <div class="max-h-24 overflow-y-auto space-y-1 pr-1">
              ${i.map(d=>`
                <div class="text-[10px] text-red-400/80">📄 [${_(d.source)}] references non-existent [${_(d.target)}]</div>
              `).join("")}
            </div>
          `}
        </div>

        <!-- Orphan Details -->
        <div>
          <span class="text-slate-400 font-bold uppercase block mb-1">Orphaned Documents (No incoming links):</span>
          ${l.length===0?`
            <span class="text-emerald-400 text-[10px]">✓ All custom documents linked to operational flows.</span>
          `:`
            <div class="max-h-24 overflow-y-auto space-y-1 pr-1">
              ${l.map(d=>`
                <div class="text-[10px] text-amber-500/80">📄 [${_(d.title)}] (slug: ${_(d.slug)}) has zero citations</div>
              `).join("")}
            </div>
          `}
        </div>
      </div>
    </div>
  `}let mt=[];async function Ci(){mt=[];for(const s of ue){let e=s.content,t=s.title;if(s.isEncrypted&&J&&s.slug===ne)try{e=await ye(s.content,J)}catch{}mt.push({...s,content:e,title:t})}}async function ks(s){if(localStorage.getItem("secops-wiki-db-encrypted")==="true"&&he){const t={title:s.title,content:s.content,isEncrypted:s.isEncrypted,updatedAt:s.updatedAt,tags:s.tags,classification:s.classification,signature:s.signature},n=await rt(JSON.stringify(t),he),o={id:s.id,slug:s.slug,title:"[REDACTED AT REST]",content:"[REDACTED AT REST]",updatedAt:s.updatedAt,isEncryptedAtRest:!0,encryptedData:n};await Ws(o)}else await Ws(s);try{const t=await vo(s.slug);if(t.length>20)for(let n=20;n<t.length;n++)await Eo(t[n].id)}catch(t){console.warn("Failed to compact revisions for slug:",s.slug,t)}}async function na(s){const e=await vo(s),t=[];for(const n of e)if(n.isEncryptedAtRest&&n.encryptedData){if(!he){t.push({id:n.id,slug:n.slug,title:"[DATABASE LOCKED]",content:"Master passphrase required to unlock this database record.",updatedAt:n.updatedAt,isEncrypted:!1});continue}try{const o=await ye(n.encryptedData,he),a=JSON.parse(o);t.push({id:n.id,slug:n.slug,title:a.title,content:a.content,updatedAt:a.updatedAt,isEncrypted:a.isEncrypted,tags:a.tags,classification:a.classification,signature:a.signature})}catch(o){console.error("Failed to decrypt revision at rest:",o)}}else t.push(n);return t}async function gt(s){const e=await Wt();for(const t of e)if(t.isEncryptedAtRest&&t.encryptedData)try{return await ye(t.encryptedData,s),!0}catch{return!1}return!0}function Ri(){let s=document.getElementById("master-unlock-overlay");s||(s=document.createElement("div"),s.id="master-unlock-overlay",s.className="fixed inset-0 bg-[#060814]/98 backdrop-blur-xl z-[100] flex items-center justify-center p-4",document.body.appendChild(s));const t=localStorage.getItem("secops-wiki-webauthn-gate")==="true"?`
    <button type="button" id="master-unlock-biometric-btn" class="flex-1 py-2.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-350 font-mono text-xs uppercase rounded transition hover:text-white flex items-center justify-center gap-1.5">
      <span>👤 TouchID/Hello</span>
    </button>
  `:"";s.innerHTML=`
    <div class="glass-panel border border-red-900/30 rounded-xl w-full max-w-md p-6 space-y-6 glow-border shadow-2xl text-center">
      <div class="space-y-2">
        <div class="w-16 h-16 bg-red-950/30 border border-red-900/50 rounded-full flex items-center justify-center mx-auto mb-2 text-red-500 animate-pulse">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
          </svg>
        </div>
        <h2 class="text-xl font-bold font-mono text-white uppercase tracking-wider">DATABASE LOCKED</h2>
        <p class="text-xs text-slate-500 font-mono">This SecOps Wiki instance enforces database encryption-at-rest. Enter the master passphrase to derive the AES-GCM session key.</p>
      </div>

      <form id="master-unlock-form" class="space-y-4">
        <input type="password" id="master-unlock-input" aria-label="Master Passphrase" placeholder="Enter Master Passphrase..." required class="w-full bg-slate-950/80 border border-slate-800 focus:border-red-500/50 rounded-lg p-3 text-sm text-slate-200 focus:outline-none transition font-mono text-center">
        <div id="master-unlock-error" class="text-[10px] text-red-400 font-mono hidden">INCORRECT PASSPHRASE - DECRYPTION KEY DERIVATION FAILED</div>
        
        <div class="flex gap-2 pt-2">
          ${t}
          <button type="submit" class="flex-[2] py-2.5 bg-gradient-to-r from-red-700 to-rose-700 hover:from-red-600 hover:to-rose-600 text-white font-mono text-xs uppercase rounded font-bold transition shadow-[0_0_15px_rgba(220,38,38,0.2)]">
            Decrypt Database
          </button>
        </div>
      </form>

      <div class="border-t border-slate-900 pt-4 flex flex-col items-center gap-2">
        <button id="master-unlock-wipe-btn" class="text-[10px] text-red-400 hover:text-red-300 font-mono uppercase underline">
          Sanitize & Wipe Database
        </button>
      </div>
    </div>
  `;const n=document.getElementById("master-unlock-form"),o=document.getElementById("master-unlock-input"),a=document.getElementById("master-unlock-error"),r=document.getElementById("master-unlock-wipe-btn"),i=document.getElementById("master-unlock-biometric-btn");setTimeout(()=>o==null?void 0:o.focus(),50),n.addEventListener("submit",async l=>{l.preventDefault(),a.classList.add("hidden");const d=o.value;try{const p=await Ce(d);await gt(p)?(he=p,sa()):(a.classList.remove("hidden"),o.value="",o.focus(),await pe("DECRYPT_FAIL","Master database unlock attempt with invalid passphrase."))}catch(p){a.textContent=`ERROR: ${p.message.toUpperCase()}`,a.classList.remove("hidden")}}),r.addEventListener("click",async()=>{if(!await En("WIPING THE ENTIRE DATABASE")){alert("Verification Failed: Consent signature rejected.");return}confirm("CRITICAL ACTION: Are you sure you want to completely wipe this database? All encrypted records and system procedures will be permanently deleted.")&&prompt('Type "WIPE" to confirm sanitization:')==="WIPE"&&(await ko(),await ps(),localStorage.removeItem("secops-wiki-db-encrypted"),localStorage.removeItem("secops-wiki-webauthn-gate"),localStorage.removeItem("secops-wiki-webauthn-payload"),localStorage.removeItem("secops-wiki-webauthn-salt"),he=null,s.remove(),alert("Database successfully wiped and reset to default plaintext configuration."),window.location.reload())}),i&&i.addEventListener("click",async()=>{await Oi()})}function sa(){const s=document.getElementById("master-unlock-overlay");s&&s.remove(),pe("SESSION_UNLOCK","Database session unlocked and decrypted at rest."),Le().then(()=>{Xo(),Qo(),window.addEventListener("hashchange",yn),window.addEventListener("online",xn),window.addEventListener("offline",xn),yn()})}function Di(s){const e=async t=>{const n=new FileReader;n.onload=async()=>{const o=n.result.split(",")[1],a=`att-${Date.now()}-${Math.random().toString(36).substring(2,9)}`;let r=J||he,i=o;if(r)try{i=await rt(o,r)}catch(u){console.error("Failed to encrypt attachment:",u)}const l={id:a,name:t.name,mimeType:t.type,data:i};await Ra(l),await pe("ATTACHMENT_SAVE",`Saved attachment ${t.name} (ID: ${a}, size: ${t.size} bytes).`);const d=t.type.startsWith("image/")?`![${t.name}](attachment://${a})`:`[Attachment: ${t.name}](attachment://${a})`,p=s.selectionStart,m=s.selectionEnd;s.value=s.value.substring(0,p)+d+s.value.substring(m),s.selectionStart=s.selectionEnd=p+d.length,s.dispatchEvent(new Event("input"))},n.readAsDataURL(t)};s.addEventListener("dragover",t=>{t.preventDefault()}),s.addEventListener("drop",async t=>{var o;t.preventDefault();const n=(o=t.dataTransfer)==null?void 0:o.files;if(n&&n.length>0)for(let a=0;a<n.length;a++)await e(n[a])}),s.addEventListener("paste",async t=>{var o;const n=(o=t.clipboardData)==null?void 0:o.items;if(n){for(let a=0;a<n.length;a++)if(n[a].kind==="file"){const r=n[a].getAsFile();r&&await e(r)}}})}async function $i(s){const e=s.querySelectorAll('img[src^="attachment://"]');for(const n of Array.from(e)){const o=n.src.replace("attachment://","").split("/").pop()||"",a=await qs(o);if(a){const r=await ho(a);r&&(n.src=r)}}const t=s.querySelectorAll('a[href^="attachment://"]');for(const n of Array.from(t)){const o=n.href.replace("attachment://","").split("/").pop()||"",a=await qs(o);if(a){const r=await ho(a);r&&(n.href=r,n.download=a.name)}}}async function ho(s){let e=s.data;if(e.includes(":")){let t=null;if(J)try{t=await ye(e,J)}catch{}if(!t&&he)try{t=await ye(e,he)}catch{}if(!t)return null;e=t}try{const t=atob(e),n=new Uint8Array(t.length);for(let a=0;a<t.length;a++)n[a]=t.charCodeAt(a);const o=new Blob([n],{type:s.mimeType});return URL.createObjectURL(o)}catch(t){return console.error("Failed to parse base64 for attachment:",t),null}}async function Qn(){const s=document.getElementById("system-audit-logs-list");if(!s)return;const e=await fn();if(e.length===0){s.innerHTML='<p class="text-xs font-mono text-slate-500">No security audit logs found.</p>';return}s.innerHTML=`
    <table class="w-full text-[10px] font-mono text-slate-350">
      <thead>
        <tr class="border-b border-slate-800 text-slate-500 text-left">
          <th class="py-1">TIMESTAMP</th>
          <th class="py-1">EVENT TYPE</th>
          <th class="py-1">DETAILS / DIAGNOSTICS</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-900/50">
        ${e.map(t=>`
          <tr class="hover:bg-slate-950/20">
            <td class="py-1.5 text-slate-500 select-none">${new Date(t.timestamp).toLocaleString()}</td>
            <td class="py-1.5 font-bold ${t.event.includes("FAIL")||t.event.includes("DELETE")||t.event.includes("WIPE")?"text-red-400":"text-teal-400"}">${_(t.event)}</td>
            <td class="py-1.5 text-slate-400 max-w-xs truncate" title="${_(t.details)}">${_(t.details)}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `}function _i(s){let e=document.getElementById("drawing-canvas-modal");e||(e=document.createElement("div"),e.id="drawing-canvas-modal",e.className="fixed inset-0 bg-[#090d16]/90 backdrop-blur-md z-50 flex items-center justify-center p-4",document.body.appendChild(e)),e.innerHTML=`
    <div class="glass-panel border border-slate-800 rounded-xl w-full max-w-2xl p-5 space-y-4 glow-border shadow-2xl flex flex-col">
      <div class="flex items-center justify-between border-b border-slate-800 pb-2 shrink-0">
        <h3 class="text-sm font-bold font-mono text-white uppercase tracking-wider">Tactical Drawing Canvas</h3>
        <span class="text-[10px] font-mono text-slate-500">Draw topologies, flows, or diagrams</span>
      </div>
      
      <div class="flex flex-wrap items-center justify-between gap-3 bg-slate-950/60 p-2 border border-slate-850 rounded-lg shrink-0 select-none">
        <div class="flex flex-wrap items-center gap-2">
          <span class="text-[10px] font-mono text-slate-500 uppercase">Tool:</span>
          <button id="draw-tool-pen" class="px-2 py-1 bg-teal-950/40 border border-teal-800 text-teal-400 font-mono text-[10px] rounded font-bold uppercase">Pen</button>
          <button id="draw-tool-eraser" class="px-2 py-1 bg-slate-900 border border-slate-850 text-slate-400 font-mono text-[10px] rounded hover:text-white uppercase">Eraser</button>
          <button id="draw-tool-line" class="px-2 py-1 bg-slate-900 border border-slate-850 text-slate-400 font-mono text-[10px] rounded hover:text-white uppercase">Line</button>
          <button id="draw-tool-arrow" class="px-2 py-1 bg-slate-900 border border-slate-850 text-slate-400 font-mono text-[10px] rounded hover:text-white uppercase">Arrow</button>
          <button id="draw-tool-rect" class="px-2 py-1 bg-slate-900 border border-slate-850 text-slate-400 font-mono text-[10px] rounded hover:text-white uppercase">Box</button>
          <button id="draw-tool-circle" class="px-2 py-1 bg-slate-900 border border-slate-850 text-slate-400 font-mono text-[10px] rounded hover:text-white uppercase">Circle</button>
        </div>
        
        <div class="flex items-center gap-2">
          <span class="text-[10px] font-mono text-slate-500 uppercase">Size:</span>
          <select id="draw-brush-size" aria-label="Brush size" class="bg-slate-900 border border-slate-800 rounded px-1.5 py-0.5 text-[10px] font-mono text-slate-300 focus:outline-none cursor-pointer">
            <option value="2">Thin (2px)</option>
            <option value="5" selected>Medium (5px)</option>
            <option value="10">Thick (10px)</option>
            <option value="20">Marker (20px)</option>
          </select>
        </div>
        
        <div class="flex items-center gap-2">
          <span class="text-[10px] font-mono text-slate-500 uppercase">Color:</span>
          <div class="flex gap-1" id="draw-color-palette">
            <button class="w-4 h-4 rounded-full border border-white bg-white" data-color="#ffffff" aria-label="Select color white"></button>
            <button class="w-4 h-4 rounded-full border border-transparent bg-teal-400" data-color="#2dd4bf" aria-label="Select color teal"></button>
            <button class="w-4 h-4 rounded-full border border-transparent bg-emerald-400" data-color="#34d399" aria-label="Select color emerald"></button>
            <button class="w-4 h-4 rounded-full border border-transparent bg-blue-400" data-color="#60a5fa" aria-label="Select color blue"></button>
            <button class="w-4 h-4 rounded-full border border-transparent bg-amber-400" data-color="#fbbf24" aria-label="Select color amber"></button>
            <button class="w-4 h-4 rounded-full border border-transparent bg-red-400" data-color="#f87171" aria-label="Select color red"></button>
          </div>
        </div>
        
        <div class="flex items-center gap-1.5">
          <button id="draw-undo-btn" class="px-2 py-1 bg-slate-900 border border-slate-850 text-slate-400 hover:text-white font-mono text-[10px] rounded uppercase">Undo</button>
          <button id="draw-redo-btn" class="px-2 py-1 bg-slate-900 border border-slate-850 text-slate-400 hover:text-white font-mono text-[10px] rounded uppercase">Redo</button>
          <button id="draw-clear-btn" class="px-2 py-1 bg-red-950/20 border border-red-900/30 text-red-400 hover:bg-red-900/30 font-mono text-[10px] rounded transition uppercase">Clear</button>
        </div>
      </div>
      
      <div class="bg-slate-950 border border-slate-850 rounded-lg overflow-hidden flex items-center justify-center p-2 min-h-[300px] flex-1 relative">
        <canvas id="sketch-canvas" width="600" height="350" class="bg-slate-950 border border-slate-900 cursor-crosshair rounded shadow-inner block max-w-full max-h-[350px]"></canvas>
      </div>
      
      <div class="flex justify-end gap-3 shrink-0 pt-2 border-t border-slate-800">
        <button id="draw-cancel-btn" class="px-4 py-2 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-350 font-mono text-xs uppercase rounded transition hover:text-white">Cancel</button>
        <button id="draw-save-btn" class="px-4 py-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-mono text-xs uppercase rounded font-bold transition shadow-[0_0_10px_rgba(20,184,166,0.15)]">Save & Embed</button>
      </div>
    </div>
  `,e.classList.remove("hidden");const t=document.getElementById("sketch-canvas"),n=t.getContext("2d"),o=window.devicePixelRatio||1,a=600,r=350;t.width=a*o,t.height=r*o,t.style.width=`${a}px`,t.style.height=`${r}px`,n.scale(o,o),n.lineCap="round",n.lineJoin="round",n.strokeStyle="#ffffff",n.lineWidth=5,n.fillStyle="#060814",n.fillRect(0,0,a,r);let i=!1,l="pen",d="#ffffff",p=0,m=0,u;const f=[],y=[];f.push(n.getImageData(0,0,t.width,t.height));const L=$=>{const b=t.getBoundingClientRect(),P="touches"in $?$.touches[0].clientX:$.clientX,B="touches"in $?$.touches[0].clientY:$.clientY;return{x:(P-b.left)*(a/b.width),y:(B-b.top)*(r/b.height)}},x=$=>{i=!0;const b=L($);p=b.x,m=b.y,u=n.getImageData(0,0,t.width,t.height),(l==="pen"||l==="eraser")&&(n.beginPath(),n.moveTo(p,m)),$.preventDefault()},N=$=>{if(!i)return;const b=L($),P=parseInt(ie.value,10);if(l==="pen"||l==="eraser")n.lineTo(b.x,b.y),n.strokeStyle=l==="eraser"?"#060814":d,n.lineWidth=P,n.stroke();else if(n.putImageData(u,0,0),n.beginPath(),n.strokeStyle=d,n.lineWidth=P,l==="line")n.moveTo(p,m),n.lineTo(b.x,b.y),n.stroke();else if(l==="arrow"){n.moveTo(p,m),n.lineTo(b.x,b.y),n.stroke();const B=Math.atan2(b.y-m,b.x-p),W=Math.max(10,P*2.5);n.beginPath(),n.moveTo(b.x,b.y),n.lineTo(b.x-W*Math.cos(B-Math.PI/6),b.y-W*Math.sin(B-Math.PI/6)),n.lineTo(b.x-W*Math.cos(B+Math.PI/6),b.y-W*Math.sin(B+Math.PI/6)),n.closePath(),n.fillStyle=d,n.fill()}else if(l==="rect")n.rect(p,m,b.x-p,b.y-m),n.stroke();else if(l==="circle"){const B=Math.sqrt(Math.pow(b.x-p,2)+Math.pow(b.y-m,2));n.arc(p,m,B,0,2*Math.PI),n.stroke()}$.preventDefault()},G=()=>{i&&((l==="pen"||l==="eraser")&&n.closePath(),i=!1,f.push(n.getImageData(0,0,t.width,t.height)),y.length=0)},v=()=>{if(f.length>1){const $=f.pop();y.push($);const b=f[f.length-1];n.putImageData(b,0,0)}},w=()=>{if(y.length>0){const $=y.pop();f.push($),n.putImageData($,0,0)}};t.addEventListener("mousedown",x),t.addEventListener("mousemove",N),window.addEventListener("mouseup",G),t.addEventListener("touchstart",x,{passive:!1}),t.addEventListener("touchmove",N,{passive:!1}),window.addEventListener("touchend",G);const E=$=>{$.ctrlKey&&$.key==="z"?($.preventDefault(),v()):$.ctrlKey&&$.key==="y"&&($.preventDefault(),w())};window.addEventListener("keydown",E);const O=["pen","eraser","line","arrow","rect","circle"],U=$=>{l=$,O.forEach(b=>{const P=document.getElementById(`draw-tool-${b}`);b===$?P.className="px-2 py-1 bg-teal-950/40 border border-teal-800 text-teal-400 font-mono text-[10px] rounded font-bold uppercase":P.className="px-2 py-1 bg-slate-900 border border-slate-850 text-slate-400 font-mono text-[10px] rounded hover:text-white uppercase"})};O.forEach($=>{document.getElementById(`draw-tool-${$}`).addEventListener("click",()=>U($))});const ie=document.getElementById("draw-brush-size"),ae=document.getElementById("draw-clear-btn"),te=document.getElementById("draw-cancel-btn"),A=document.getElementById("draw-save-btn"),D=document.getElementById("draw-color-palette"),M=document.getElementById("draw-undo-btn"),F=document.getElementById("draw-redo-btn");D.addEventListener("click",$=>{const b=$.target.closest("button");b&&(d=b.getAttribute("data-color")||"#ffffff",D.querySelectorAll("button").forEach(P=>P.classList.replace("border-white","border-transparent")),b.classList.replace("border-transparent","border-white"))}),ae.addEventListener("click",()=>{confirm("Clear the canvas drawing?")&&(n.fillStyle="#060814",n.fillRect(0,0,a,r),f.push(n.getImageData(0,0,t.width,t.height)),y.length=0)}),M.addEventListener("click",v),F.addEventListener("click",w);const Z=()=>{window.removeEventListener("mouseup",G),window.removeEventListener("touchend",G),window.removeEventListener("keydown",E),e.classList.add("hidden")};te.addEventListener("click",Z),A.addEventListener("click",()=>{const b=`![Tactical Sketch](${t.toDataURL("image/png")})`,P=s.selectionStart,B=s.selectionEnd;s.value=s.value.substring(0,P)+b+s.value.substring(B),s.selectionStart=s.selectionEnd=P+b.length,s.dispatchEvent(new Event("input")),Z()})}async function Ni(){if(!he){alert("Unlock Required: Unlock the database using your passphrase before registering biometric lock.");return}const s=prompt("Verify Identity: Enter your current master passphrase to bind to biometric unlock:");if(!s)return;const e=await Ce(s);if(!await gt(e)){alert("Verification Failed: Incorrect passphrase.");return}try{const n=crypto.getRandomValues(new Uint8Array(32)),o=await navigator.credentials.create({publicKey:{challenge:n,rp:{name:"SecOps Wiki",id:window.location.hostname||"localhost"},user:{id:crypto.getRandomValues(new Uint8Array(16)),name:"operator@secops.local",displayName:"SecOps Operator"},pubKeyCredParams:[{type:"public-key",alg:-7},{type:"public-key",alg:-257}],authenticatorSelection:{authenticatorAttachment:"platform",userVerification:"required"},timeout:6e4}});if(o){const a=new Uint8Array(o.rawId),r=Array.from(a).map(u=>u.toString(16).padStart(2,"0")).join(""),i=crypto.getRandomValues(new Uint8Array(32)),l=Array.from(i).map(u=>u.toString(16).padStart(2,"0")).join("");localStorage.setItem("secops-wiki-webauthn-salt",l);const d=`${r}:${l}`,p=await Ce(d),m=await rt(s,p);localStorage.setItem("secops-wiki-webauthn-payload",m),localStorage.setItem("secops-wiki-webauthn-gate","true"),alert("Biometric credential successfully registered with WebAuthn platform gate."),await pe("WEBAUTHN_REGISTER","Biometric credentials registered successfully."),Ht(document.getElementById("main-content"))}}catch(n){alert(`Biometric registration failed: ${n.message}`),await pe("WEBAUTHN_FAIL",`Biometric registration failed: ${n.message}`)}}async function Oi(){const s=localStorage.getItem("secops-wiki-webauthn-gate")==="true",e=localStorage.getItem("secops-wiki-webauthn-payload");if(!s||!e){alert("Biometric Unlock is not registered. Setup biometric credentials in settings first.");return}try{const t=crypto.getRandomValues(new Uint8Array(32)),n=await navigator.credentials.get({publicKey:{challenge:t,rpId:window.location.hostname||"localhost",userVerification:"required",timeout:6e4}});if(n){const o=new Uint8Array(n.rawId),a=Array.from(o).map(u=>u.toString(16).padStart(2,"0")).join(""),r=localStorage.getItem("secops-wiki-webauthn-salt")||"";if(!r)throw new Error("Biometric decryption salt is missing from storage.");const i=`${a}:${r}`,l=await Ce(i),d=await ye(e,l),p=await Ce(d);await gt(p)?(he=p,sa()):alert("Biometric validation failed: Stored credentials mismatch.")}}catch(t){alert(`Biometric verification failed: ${t.message}`),await pe("WEBAUTHN_FAIL",`Biometric unlock failed: ${t.message}`)}}function Pi(s){const e={name:"Root",fullPath:"",children:{},pages:[]};for(const t of s)for(const n of t.tags){const o=n.split("/");let a=e,r="";for(let i=0;i<o.length;i++){const l=o[i].trim();l&&(r=r?`${r}/${l}`:l,a.children[l]||(a.children[l]={name:l,fullPath:r,children:{},pages:[]}),a=a.children[l])}a.pages.push(t)}return e}function oa(s,e=0){let t="";const n=Object.keys(s.children).sort();for(const o of n){const a=s.children[o];if(!(Object.keys(a.children).length>0||a.pages.length>0))continue;const i=a.fullPath;t+=`
      <div class="tree-folder">
        <div class="tree-folder-header flex items-center gap-1.5 px-3 py-1 cursor-pointer hover:bg-slate-900/40 text-xs font-mono text-slate-450 select-none rounded-lg" data-path="${_(i)}" tabindex="0">
          <span class="tree-folder-icon text-[9px] transition-transform duration-200 text-slate-600" style="display: inline-block;">▶</span>
          <span>📁 ${_(a.name)}</span>
        </div>
        <div class="tree-folder-children hidden pl-3.5 space-y-0.5 animate-fade-in" data-path="${_(i)}">
          ${oa(a,e+1)}
          ${a.pages.map(l=>{const d=ne===l.slug&&!et,p=l.isEncrypted&&!J&&at,m=p?"[REDACTED CORE]":l.title;return`
              <a href="${p?"javascript:void(0)":`#/page/${l.slug}`}" ${p?`onclick="alert('SECURITY WARNING: Document is locked. Enter passphrase to decrypt cores first.');"`:""} class="flex items-center justify-between px-3 py-1 rounded-lg text-[11px] font-mono transition ${d?"bg-teal-950/20 text-teal-400 font-bold border-l border-teal-500":"text-slate-450 hover:bg-slate-900/30 hover:text-slate-200"}" tabindex="0">
                <span class="truncate flex items-center gap-1">
                  ${l.isEncrypted?"🔒":"⊙"} ${_(m)}
                </span>
              </a>
            `}).join("")}
        </div>
      </div>
    `}return t}function Mi(s){s.querySelectorAll("code.language-javascript-sandbox, code.language-html-sandbox").forEach(t=>{const n=t.parentElement;if(!n||n.tagName.toLowerCase()!=="pre"||n.querySelector(".sandbox-run-btn"))return;const o=t.classList.contains("language-html-sandbox"),a=t.textContent||"",r=document.createElement("button");r.className="sandbox-run-btn absolute top-2 right-12 px-2 py-0.5 bg-teal-950/40 border border-teal-800 text-teal-400 hover:text-teal-300 font-mono text-[9px] rounded uppercase font-bold transition z-10",r.textContent="Run Sandbox",n.classList.add("relative"),n.appendChild(r);const i=document.createElement("div");i.className="sandbox-iframe-wrapper mt-2 hidden border border-slate-800 rounded-lg overflow-hidden bg-slate-950",n.after(i),r.addEventListener("click",()=>{var d;if(i.classList.toggle("hidden"))r.textContent="Run Sandbox",i.innerHTML="";else{r.textContent="Close Sandbox",i.innerHTML=`
          <div class="bg-slate-900 px-3 py-1 border-b border-slate-800 flex justify-between items-center text-[10px] font-mono text-slate-400 select-none">
            <span>LIVE ISO-SANDBOX CONSOLE</span>
            <button class="sandbox-close-inner-btn text-red-400 hover:text-red-300 font-bold">CLOSE</button>
          </div>
          <iframe sandbox="allow-scripts" class="w-full h-64 bg-slate-950" id="sandbox-frame-${Date.now()}"></iframe>
        `;const p=i.querySelector("iframe");let m="";o?m=a:m=`
            <!DOCTYPE html>
            <html>
              <head>
                <style>
                  body {
                    background-color: #060814;
                    color: #cbd5e1;
                    font-family: monospace;
                    font-size: 12px;
                    padding: 12px;
                    margin: 0;
                  }
                  #console {
                    white-space: pre-wrap;
                  }
                </style>
              </head>
              <body>
                <div id="console"></div>
                <script>
                  const consoleDiv = document.getElementById('console');
                  const log = (...args) => {
                    consoleDiv.textContent += args.map(a => typeof a === 'object' ? JSON.stringify(a) : a).join(' ') + '\\n';
                  };
                  window.console = {
                    log: log,
                    info: log,
                    warn: log,
                    error: log
                  };
                  try {
                    ${a}
                  } catch (err) {
                    log('ERROR:', err.message);
                  }
                <\/script>
              </body>
            </html>
          `,p.srcdoc=m,(d=i.querySelector(".sandbox-close-inner-btn"))==null||d.addEventListener("click",()=>{i.classList.add("hidden"),r.textContent="Run Sandbox",i.innerHTML=""})}})})}async function Bi(s){var r;const e=window.location.hash,t=e.indexOf("?");if(t===-1){s.innerHTML='<div class="glass-panel border border-red-950 p-6 rounded-xl text-center font-mono text-xs text-red-400">P2P IMPORT ERROR: Missing decryption parameters in link.</div>';return}const n=new URLSearchParams(e.substring(t)),o=n.get("data"),a=n.get("key");if(!o||!a){s.innerHTML='<div class="glass-panel border border-red-950 p-6 rounded-xl text-center font-mono text-xs text-red-400">P2P IMPORT ERROR: Invalid parameters.</div>';return}try{const i=await Ce(a),l=atob(decodeURIComponent(o)),d=await ye(l,i),p=JSON.parse(d);s.innerHTML=`
      <div class="glass-panel border border-teal-905 rounded-xl p-6 space-y-6 glow-border">
        <div class="border-b border-slate-800 pb-4">
          <h2 class="text-xl font-bold font-mono text-white uppercase">Secure P2P Page Import</h2>
          <p class="text-xs text-slate-500 font-mono">Verify and import the decrypted document below into your offline storage.</p>
        </div>
        
        <div class="space-y-4">
          <div>
            <label class="block text-[10px] font-mono text-slate-500 uppercase">Document Title:</label>
            <div class="text-white font-mono text-sm font-bold mt-1">${_(p.title)}</div>
          </div>
          
          <div>
            <label class="block text-[10px] font-mono text-slate-500 uppercase">Associated Tags:</label>
            <div class="flex gap-1.5 mt-1">
              ${p.tags.map(m=>`<span class="bg-slate-900/60 text-slate-400 border border-slate-850 px-2 py-0.5 rounded text-[10px] font-mono">#${_(m)}</span>`).join("")}
            </div>
          </div>
          
          <div>
            <label class="block text-[10px] font-mono text-slate-500 uppercase">Decrypted Content Preview:</label>
            <div class="bg-slate-950/60 p-4 border border-slate-850 rounded-lg max-h-60 overflow-y-auto text-xs font-mono text-slate-350 wiki-content whitespace-pre-wrap mt-1">${_(p.content)}</div>
          </div>
        </div>
        
        <div class="flex justify-end gap-3 pt-4 border-t border-slate-800">
          <a href="#/page/home" class="px-4 py-2 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-350 font-mono text-xs uppercase rounded transition hover:text-white">Cancel</a>
          <button id="p2p-import-confirm-btn" class="px-4 py-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-mono text-xs uppercase rounded font-bold transition shadow-[0_0_10px_rgba(20,184,166,0.15)]">Import to Database</button>
        </div>
      </div>
    `,(r=document.getElementById("p2p-import-confirm-btn"))==null||r.addEventListener("click",async()=>{let m=p.title.toLowerCase().replace(/[^a-z0-9-_]+/g,"-");m||(m=`p2p-import-${Date.now()}`);let u=m,f=await We(u);if(f&&!confirm(`CONFLICT ALERT: A document with slug "${u}" already exists in your wiki database.

Click OK to overwrite the existing document.
Click Cancel to import it as a duplicate under an auto-generated title.`)){let x=1;for(;f;)u=`${m}-${x}`,f=await We(u),x++}const y={slug:u,title:p.title,content:p.content,tags:p.tags,updatedAt:Date.now()};y.signature=await Je(y),await Oe(y),await pe("P2P_IMPORT_SUCCESS",`Imported decrypted page: ${p.title} (slug: ${u})`),alert("Intel Entry imported successfully."),window.location.hash=`#/page/${u}`})}catch(i){s.innerHTML=`<div class="glass-panel border border-red-950 p-6 rounded-xl text-center font-mono text-xs text-red-400">P2P DECRYPTION ERROR: ${_(i.message)}</div>`}}document.addEventListener("DOMContentLoaded",ii);async function Ui(){setInterval(async()=>{try{const s=ue;await _a({id:Date.now().toString(),timestamp:Date.now(),data:JSON.stringify(s)}),console.log("Background backup created")}catch(s){console.error("Backup failed",s)}},24*60*60*1e3)}Ui();window.renderKnowledgeGraph=function(s){const e=document.getElementById(s);if(!e)return;const t=e.getContext("2d");t&&(t.fillStyle="#fff",t.fillText("Knowledge Graph (Mock)",10,20))};function zi(s){let e=JSON.parse(localStorage.getItem("secops-recent-pages")||"[]");e=e.filter(t=>t!==s),e.unshift(s),e=e.slice(0,5),localStorage.setItem("secops-recent-pages",JSON.stringify(e))}function ji(s){const e=s.replace(/[#*`_\[\]()\-+]/g," ").replace(/<[^>]*>/g," ").toLowerCase(),t=new Set(["the","a","an","and","or","but","is","are","was","were","to","for","in","on","at","by","of","with","from","this","that","these","those","it","its","they","them","their","we","us","our","you","your","i","my","me","he","him","his","she","her","has","have","had","do","does","did","as","if","then","else","when","where","how","why","who","which","what","not","no","yes","can","will","should","would","could","may","might","must","about","into","than","also","some","any","all","more","most","other","been","being"]),n=e.split(/\s+/),o={};return n.forEach(a=>{const r=a.replace(/[^a-z0-9-]/g,"");r.length>3&&!t.has(r)&&!/^\d+$/.test(r)&&(o[r]=(o[r]||0)+1)}),Object.entries(o).sort((a,r)=>r[1]-a[1]).slice(0,5).map(a=>`${a[0]} (${a[1]})`)}async function Hi(s){var t;const e=await fn();e.sort((n,o)=>o.timestamp-n.timestamp),s.innerHTML=`
    <div class="glass-panel border border-slate-800 rounded-xl p-6 shadow-xl max-w-6xl mx-auto">
      <div class="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
        <div>
          <h2 class="text-xl font-bold font-mono text-white uppercase tracking-wider">System Audit Logs</h2>
          <p class="text-[10px] text-slate-500 font-mono mt-1">FORENSIC MONITORING SYSTEM // ZERO TELEMETRY LOCAL AUDIT TRAIL</p>
        </div>
        <div class="flex gap-2">
          <button id="clear-audit-logs-btn" class="px-3 py-1.5 bg-red-950/20 border border-red-900/30 hover:bg-red-900/30 text-red-400 hover:text-red-300 font-mono text-xs rounded transition uppercase">Clear All</button>
          <a href="#/system" class="px-3 py-1.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-350 font-mono text-xs uppercase rounded transition hover:text-white">Back to Admin</a>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse font-mono text-xs">
          <thead>
            <tr class="border-b border-slate-800 text-slate-450 uppercase">
              <th class="py-3 px-4">Timestamp</th>
              <th class="py-3 px-4">Event Type</th>
              <th class="py-3 px-4">Details</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-850/40 text-slate-300">
            ${e.map(n=>`
              <tr class="hover:bg-slate-900/10">
                <td class="py-2.5 px-4 text-slate-500 whitespace-nowrap">${new Date(n.timestamp).toLocaleString()}</td>
                <td class="py-2.5 px-4 font-bold text-teal-400 whitespace-nowrap">${_(n.event)}</td>
                <td class="py-2.5 px-4 text-slate-400 break-all">${_(n.details)}</td>
              </tr>
            `).join("")}
            ${e.length===0?`
              <tr>
                <td colspan="3" class="py-8 text-center text-slate-500">No audit events recorded.</td>
              </tr>
            `:""}
          </tbody>
        </table>
      </div>
    </div>
  `,(t=document.getElementById("clear-audit-logs-btn"))==null||t.addEventListener("click",async()=>{confirm("AUDIT WARNING: This will permanently delete the forensic audit trail. Continue?")&&(await To(),pe("AUDIT_CLEAR","Forensic audit trail manually cleared"),fe())})}function Fi(){var e;if(document.getElementById("shortcut-cheat-sheet-modal"))return;const s=document.createElement("div");s.id="shortcut-cheat-sheet-modal",s.className="fixed inset-0 bg-black/85 z-[100] flex items-center justify-center p-4",s.innerHTML=`
    <div class="bg-slate-950 border border-slate-800 rounded-xl p-6 w-full max-w-md shadow-2xl glow-border">
      <div class="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
        <h3 class="text-sm font-bold font-mono text-white uppercase tracking-wider flex items-center gap-1.5">⌨️ Terminal Hotkeys</h3>
        <button id="close-shortcuts-modal" aria-label="Close shortcuts modal" class="text-slate-500 hover:text-white font-bold font-mono text-xs focus:outline-none">✕</button>
      </div>
      <div class="space-y-3 font-mono text-xs text-slate-300">
        <div class="flex justify-between items-center py-1 border-b border-slate-900/60">
          <span>Ctrl + P / K</span>
          <span class="text-teal-400">Search Command Palette</span>
        </div>
        <div class="flex justify-between items-center py-1 border-b border-slate-900/60">
          <span>Ctrl + N</span>
          <span class="text-teal-400">Create New Intel</span>
        </div>
        <div class="flex justify-between items-center py-1 border-b border-slate-900/60">
          <span>Ctrl + S</span>
          <span class="text-teal-400">Save Document (in Editor)</span>
        </div>
        <div class="flex justify-between items-center py-1 border-b border-slate-900/60">
          <span>Ctrl + Shift + L</span>
          <span class="text-teal-400">Lock Session Instantly</span>
        </div>
        <div class="flex justify-between items-center py-1 border-b border-slate-900/60">
          <span>Escape (3x fast)</span>
          <span class="text-teal-400">Emergency Session Lock</span>
        </div>
        <div class="flex justify-between items-center py-1 border-b border-slate-900/60">
          <span>Shift + ?</span>
          <span class="text-teal-400">Show Keyboard Shortcuts</span>
        </div>
      </div>
    </div>
  `,document.body.appendChild(s),(e=s.querySelector("#close-shortcuts-modal"))==null||e.addEventListener("click",()=>s.remove()),s.addEventListener("click",t=>{t.target===s&&s.remove()})}window.addEventListener("keydown",s=>{var e,t;s.key==="?"&&((e=document.activeElement)==null?void 0:e.tagName)!=="INPUT"&&((t=document.activeElement)==null?void 0:t.tagName)!=="TEXTAREA"&&(s.preventDefault(),Fi())});function Wi(s,e){const t=s.toLowerCase().indexOf(e.toLowerCase());if(t===-1)return"";const n=Math.max(0,t-30),o=Math.min(s.length,t+e.length+40);let a=s.substring(n,o);return n>0&&(a="..."+a),o<s.length&&(a=a+"..."),a}let es=0;function bo(){es++,es>=3&&(es=0,ws(Date.now()+30*1e3),pe("SECURITY_LOCKOUT","Too many failed decryption attempts. Cooldown enforced."))}function qi(s){const e=[];if(!s)return{score:0,feedback:["Enter password"]};let t=0;s.length>=8&&(t+=20),s.length>=12&&(t+=15),s.length>=16&&(t+=15);const n=/[a-z]/.test(s),o=/[A-Z]/.test(s),a=/[0-9]/.test(s),r=/[^A-Za-z0-9]/.test(s);return n?t+=10:e.push("Add lowercase letters"),o?t+=15:e.push("Add uppercase letters"),a?t+=10:e.push("Add numbers"),r?t+=15:e.push("Add special characters"),s.length<8&&(e.push("Must be at least 8 characters long"),t=Math.min(15,t)),{score:Math.min(100,t),feedback:e}}function xo(s){return new Promise(e=>{const t=document.createElement("div");t.className="fixed inset-0 bg-[#090d16]/90 backdrop-blur-md z-[100] flex items-center justify-center p-4";const n=s==="activate",o=n?"Derive Master Security Key":"Deactivate Database Encryption",a=n?"Establish a master password. This will be used to derive a strong AES-256 session key.":"Verify your master password to decrypt all records stored at rest.";t.innerHTML=`
      <div class="glass-panel border border-teal-900/30 rounded-xl w-full max-w-md p-6 space-y-6 glow-border shadow-2xl">
        <div class="space-y-2 text-center">
          <h3 class="text-lg font-bold font-mono text-white uppercase tracking-wider">${o}</h3>
          <p class="text-[10px] text-slate-500 font-mono">${a}</p>
        </div>
        
        <form id="passphrase-modal-form" class="space-y-4">
          <div>
            <input type="password" id="passphrase-modal-input" aria-label="Security Passphrase" placeholder="ENTER PASSPHRASE..." required class="w-full bg-slate-950/80 border border-slate-800 focus:border-teal-500/50 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none transition font-mono text-center">
            
            ${n?`
              <!-- Passphrase strength indicator -->
              <div class="mt-3 space-y-2">
                <div class="flex justify-between items-center text-[9px] font-mono">
                  <span class="text-slate-400">STRENGTH:</span>
                  <span id="passphrase-strength-label" class="text-red-400 font-bold">WEAK (0%)</span>
                </div>
                <div class="w-full h-1 bg-slate-900 rounded-full overflow-hidden">
                  <div id="passphrase-strength-bar" class="w-0 h-full bg-red-500 transition-all duration-300"></div>
                </div>
                <div id="passphrase-suggestions" class="text-[9px] font-mono text-slate-400 leading-relaxed list-disc pl-3 space-y-0.5"></div>
              </div>
            `:""}
          </div>
          
          <div class="flex gap-3 justify-end pt-2">
            <button type="button" id="passphrase-modal-cancel" class="px-4 py-2 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-350 hover:text-white font-mono text-xs uppercase rounded transition">
              Cancel
            </button>
            <button type="submit" id="passphrase-modal-submit" class="px-4 py-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-slate-950 hover:text-white font-mono text-xs uppercase rounded font-bold transition shadow-[0_0_10px_rgba(20,184,166,0.15)]">
              Confirm
            </button>
          </div>
        </form>
      </div>
    `,document.body.appendChild(t);const r=t.querySelector("#passphrase-modal-input"),i=t.querySelector("#passphrase-modal-form"),l=t.querySelector("#passphrase-modal-cancel");if(setTimeout(()=>r.focus(),50),n){const d=t.querySelector("#passphrase-strength-label"),p=t.querySelector("#passphrase-strength-bar"),m=t.querySelector("#passphrase-suggestions");r.addEventListener("input",()=>{const u=r.value,f=qi(u);let y="bg-red-500",L="text-red-400",x="WEAK";f.score>=80?(y="bg-emerald-500",L="text-emerald-400",x="EXCELLENT"):f.score>=50?(y="bg-amber-500",L="text-amber-400",x="GOOD"):f.score>=25&&(y="bg-yellow-500",L="text-yellow-400",x="FAIR"),p.className=`h-full ${y} transition-all duration-300`,p.style.width=`${f.score}%`,d.className=`${L} font-bold`,d.textContent=`${x} (${f.score}%)`,m.innerHTML=f.feedback.map(N=>`<div>• ${_(N)}</div>`).join("")})}l.addEventListener("click",()=>{t.remove(),e(null)}),i.addEventListener("submit",d=>{d.preventDefault();const p=r.value;t.remove(),e(p)})})}async function En(s){if(localStorage.getItem("secops-wiki-webauthn-gate")==="true")try{const n=crypto.getRandomValues(new Uint8Array(32));if(await navigator.credentials.get({publicKey:{challenge:n,rpId:window.location.hostname||"localhost",userVerification:"required",timeout:1e4}}))return!0}catch(n){console.warn("Biometric consent failed: "+n.message)}if(localStorage.getItem("secops-wiki-db-encrypted")==="true"){const n=prompt(`CRITICAL ACTION REQUESTED: ${s.toUpperCase()}

Enter your master passphrase to confirm this action:`);if(!n)return!1;try{const o=await Ce(n);return await gt(o)}catch{return!1}}return confirm(`CONFIRM CRITICAL ACTION: ${s}`)}function yo(s,e,t,n){const o=s.getContext("2d"),a=window.devicePixelRatio||1,r=400,i=180;s.width=r*a,s.height=i*a,s.style.width=`${r}px`,s.style.height=`${i}px`,o.scale(a,a),o.fillStyle="#060814",o.fillRect(0,0,r,i);const l=new Array(7).fill(0),d=new Array(7),p=new Date;for(let E=6;E>=0;E--){const O=new Date;O.setDate(p.getDate()-E),d[6-E]=O.toLocaleDateString(void 0,{weekday:"short"}).toUpperCase();const U=new Date(O.getFullYear(),O.getMonth(),O.getDate()).getTime(),ie=U+24*60*60*1e3;l[6-E]=e.filter(ae=>ae.timestamp>=U&&ae.timestamp<ie).length}const m=40,u=20,f=30,y=30,L=r-m-u,x=i-f-y,N=Math.max(...l,5);o.strokeStyle="#1e293b",o.lineWidth=1;for(let E=0;E<=4;E++){const O=f+x/4*E;o.beginPath(),o.moveTo(m,O),o.lineTo(r-u,O),o.stroke(),o.fillStyle="#cbd5e1",o.font="10px monospace",o.textAlign="right",o.fillText(Math.round(N-N/4*E).toString(),m-8,O+3.5)}o.beginPath();const G=E=>m+L/6*E,v=E=>f+x-E/N*x;e.length>0&&l.forEach((E,O)=>{const U=G(O),ie=v(E);O===0?o.moveTo(U,ie):o.lineTo(U,ie)});const w=o.createLinearGradient(0,0,r,0);if(w.addColorStop(0,"#2dd4bf"),w.addColorStop(1,"#60a5fa"),o.strokeStyle=w,o.lineWidth=2.5,o.stroke(),e.length>0){o.lineTo(G(6),v(0)),o.lineTo(G(0),v(0)),o.closePath();const E=o.createLinearGradient(0,f,0,f+x);E.addColorStop(0,"rgba(45, 212, 191, 0.15)"),E.addColorStop(1,"rgba(6, 8, 20, 0)"),o.fillStyle=E,o.fill()}l.forEach((E,O)=>{const U=G(O),ie=v(E);o.fillStyle="#2dd4bf",o.beginPath(),o.arc(U,ie,3,0,2*Math.PI),o.fill(),o.fillStyle="#cbd5e1",o.font="10px monospace",o.textAlign="center",o.fillText(d[O],U,i-8)}),o.fillStyle="#f8fafc",o.font="bold 11px monospace",o.textAlign="left",o.fillText("AUDIT TELEMETRY (LOGS FREQUENCY)",m,15),o.fillStyle="#94a3b8",o.font="10px monospace",o.textAlign="right",o.fillText(`DB: ${(t/(1024*1024)).toFixed(1)}MB / ${(n/(1024*1024*1024)).toFixed(1)}GB`,r-u,15)}function Gi(s,e=5){const t=ue;if(t.length<=1)return[];const n=new Set(["the","a","and","or","in","on","of","to","is","for","with","that","this","at","by","from","it","an","as","are","was","were","be","been","which","has","have","had","but","not"]),o=u=>u.toLowerCase().replace(/[^\w\s]/g," ").split(/\s+/).filter(f=>f.length>2&&!n.has(f)),a=t.map(u=>({slug:u.slug,tokens:o(u.title+" "+u.content)})),r=t.length,i=new Map;a.forEach(u=>{new Set(u.tokens).forEach(y=>{i.set(y,(i.get(y)||0)+1)})});const l=u=>{const f=new Map;u.forEach(x=>{f.set(x,(f.get(x)||0)+1)});const y=u.length||1,L=new Map;return f.forEach((x,N)=>{L.set(N,x/y)}),L},d=o(s.title+" "+s.content);if(d.length===0)return[];const p=l(d),m=[];return t.forEach((u,f)=>{if(u.slug===s.slug)return;const y=l(a[f].tokens);let L=0;p.forEach((x,N)=>{if(y.has(N)){const G=y.get(N),v=i.get(N)||1,w=Math.log(r/v)+1;L+=x*G*w*w}}),L>0&&m.push({page:u,score:L})}),m.sort((u,f)=>f.score-u.score),m.slice(0,e)}function Vi(s){s.querySelectorAll(".wiki-content table").forEach(t=>{const n=t.parentElement;if(t.classList.contains("enhanced-table"))return;t.classList.add("enhanced-table","w-full","border-collapse");const o=document.createElement("div");o.className="flex items-center justify-between gap-4 p-2 bg-slate-950/60 border border-slate-800 border-b-0 rounded-t-lg select-none text-[10px] font-mono text-slate-400 mt-4",o.innerHTML=`
      <div class="flex items-center gap-1.5">
        <span>🔍</span>
        <input type="text" placeholder="Filter table rows..." aria-label="Filter table rows" class="table-filter-input bg-slate-900 border border-slate-800 rounded px-2 py-0.5 text-xs text-slate-200 focus:outline-none focus:border-teal-500/50 w-48 font-mono">
      </div>
      <div class="flex items-center gap-2">
        <button class="table-calc-btn px-2 py-0.5 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded text-slate-400 hover:text-white uppercase transition">Toggle Calculations</button>
      </div>
    `,n.insertBefore(o,t),t.classList.add("border","border-slate-800","rounded-b-lg");const a=t.querySelectorAll("th");a.forEach((d,p)=>{d.classList.add("cursor-pointer","hover:bg-slate-900/50","transition-colors","select-none"),d.innerHTML+=' <span class="sort-indicator text-slate-600 text-[9px]">↕</span>';let m=!0;d.addEventListener("click",()=>{Ki(t,p,m),m=!m,a.forEach((u,f)=>{const y=u.querySelector(".sort-indicator");f===p?(y.textContent=m?"↓":"↑",y.classList.remove("text-slate-600"),y.classList.add("text-teal-400","font-bold")):(y.textContent="↕",y.className="sort-indicator text-slate-600 text-[9px]")})})});const r=o.querySelector(".table-filter-input");r.addEventListener("input",()=>{const d=r.value.toLowerCase();t.querySelectorAll("tbody tr").forEach(m=>{var f;(((f=m.textContent)==null?void 0:f.toLowerCase())||"").includes(d)?m.style.display="":m.style.display="none"})});const i=o.querySelector(".table-calc-btn");let l=null;i.addEventListener("click",()=>{if(l){l.remove(),l=null;return}const d=t.querySelector("tbody"),p=Array.from(d.querySelectorAll("tr"));if(p.length===0)return;const m=a.length,u=new Array(m).fill(0),f=new Array(m).fill(0),y=new Array(m).fill(!0);p.forEach(L=>{L.querySelectorAll("td").forEach((N,G)=>{var E;const v=((E=N.textContent)==null?void 0:E.trim().replace(/[\$,]/g,""))||"";if(v==="")return;const w=parseFloat(v);isNaN(w)?y[G]=!1:(u[G]+=w,f[G]++)})}),l=document.createElement("tr"),l.className="bg-slate-950/80 font-bold border-t border-slate-800 text-[10px] font-mono text-teal-400";for(let L=0;L<m;L++){const x=document.createElement("td");if(x.className="p-2 text-right",L===0)x.textContent="CALCULATIONS",x.className="p-2 text-left";else if(y[L]&&f[L]>0){const N=u[L],G=N/f[L];x.innerHTML=`<div>SUM: ${N.toLocaleString(void 0,{maximumFractionDigits:2})}</div>
                          <div class="text-slate-400 font-normal">AVG: ${G.toLocaleString(void 0,{maximumFractionDigits:2})}</div>`}else x.textContent="—";l.appendChild(x)}d.appendChild(l)})})}function Ki(s,e,t){const n=s.querySelector("tbody"),o=Array.from(n.querySelectorAll("tr")),a=o.filter(i=>!i.classList.contains("bg-slate-950/80")),r=o.find(i=>i.classList.contains("bg-slate-950/80"));a.sort((i,l)=>{var f,y,L,x;const d=((y=(f=i.querySelectorAll("td")[e])==null?void 0:f.textContent)==null?void 0:y.trim())||"",p=((x=(L=l.querySelectorAll("td")[e])==null?void 0:L.textContent)==null?void 0:x.trim())||"",m=parseFloat(d.replace(/[\$,]/g,"")),u=parseFloat(p.replace(/[\$,]/g,""));return!isNaN(m)&&!isNaN(u)?t?m-u:u-m:t?d.localeCompare(p):p.localeCompare(d)}),a.forEach(i=>n.appendChild(i)),r&&n.appendChild(r)}
