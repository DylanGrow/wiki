var Sa=Object.defineProperty;var qs=s=>{throw TypeError(s)};var Ta=(s,e,t)=>e in s?Sa(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var de=(s,e,t)=>Ta(s,typeof e!="symbol"?e+"":e,t),Ia=(s,e,t)=>e.has(s)||qs("Cannot "+t);var Gs=(s,e,t)=>e.has(s)?qs("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(s):e.set(s,t);var sn=(s,e,t)=>(Ia(s,e,"access private method"),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function t(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(o){if(o.ep)return;o.ep=!0;const a=t(o);fetch(o.href,a)}})();if(self!==top)try{window.top&&(window.top.location.href=window.location.href)}catch{window.location.href="about:blank"}else document.documentElement.classList.remove("clickjack-lock");const La="secops-wiki-db",He="pages",Fe="revisions",Aa=5;function we(){return new Promise((s,e)=>{const t=indexedDB.open(La,Aa);t.onerror=()=>e(t.error),t.onsuccess=()=>{const n=t.result;n.onversionchange=()=>{n.close(),alert("SECURITY NOTICE: The database schema is being updated by another active session. This connection has been closed to prevent blocking. Please reload to resume."),window.location.reload()},s(n)},t.onupgradeneeded=()=>{const n=t.result;n.objectStoreNames.contains(He)||n.createObjectStore(He,{keyPath:"slug"}),n.objectStoreNames.contains(Fe)||n.createObjectStore(Fe,{keyPath:"id"}).createIndex("slug","slug",{unique:!1}),n.objectStoreNames.contains("tagColors")||n.createObjectStore("tagColors",{keyPath:"tag"}),n.objectStoreNames.contains("attachments")||n.createObjectStore("attachments",{keyPath:"id"}),n.objectStoreNames.contains("auditLogs")||n.createObjectStore("auditLogs",{keyPath:"id"}),n.objectStoreNames.contains("templates")||n.createObjectStore("templates",{keyPath:"id"}),n.objectStoreNames.contains("backups")||n.createObjectStore("backups",{keyPath:"id"})}})}async function Ca(s){const e=await we();return new Promise((t,n)=>{const r=e.transaction(He,"readonly").objectStore(He).get(s);r.onerror=()=>n(r.error),r.onsuccess=()=>t(r.result||null)})}async function gn(s){const e=await we();return new Promise((t,n)=>{const r=e.transaction(He,"readwrite").objectStore(He).put(s);r.onerror=()=>n(r.error),r.onsuccess=()=>t()})}async function ko(s){await Ra(s);const e=await we();return new Promise((t,n)=>{const r=e.transaction(He,"readwrite").objectStore(He).delete(s);r.onerror=()=>n(r.error),r.onsuccess=()=>t()})}async function Vt(){const s=await we();return new Promise((e,t)=>{const a=s.transaction(He,"readonly").objectStore(He).getAll();a.onerror=()=>t(a.error),a.onsuccess=()=>e(a.result||[])})}async function Vs(s){const e=await we();return new Promise((t,n)=>{const r=e.transaction(Fe,"readwrite").objectStore(Fe).put(s);r.onerror=()=>n(r.error),r.onsuccess=()=>t()})}async function So(s){const e=await we();return new Promise((t,n)=>{const l=e.transaction(Fe,"readonly").objectStore(Fe).index("slug").getAll(s);l.onerror=()=>n(l.error),l.onsuccess=()=>{const i=l.result||[];i.sort((c,p)=>p.updatedAt-c.updatedAt),t(i)}})}async function Ra(s){const e=await we();return new Promise((t,n)=>{const l=e.transaction(Fe,"readwrite").objectStore(Fe).index("slug").openCursor(s);l.onerror=()=>n(l.error),l.onsuccess=()=>{const i=l.result;i?(i.delete(),i.continue()):t()}})}async function To(s){const e=await we();return new Promise((t,n)=>{const r=e.transaction(Fe,"readwrite").objectStore(Fe).delete(s);r.onerror=()=>n(r.error),r.onsuccess=()=>t()})}const Da=[{slug:"home",title:"Operations Dashboard",content:`# Secure Operations Center (SOC) Wiki

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
* Raw input strings are escaped to prevent Cross-Site Scripting (XSS).`,updatedAt:Date.now(),tags:["security","hardening"],isSystem:!0}];async function fs(){if((await Vt()).length===0)for(const e of Da)await gn(e)}async function Io(){const s=await we();return new Promise((e,t)=>{const n=[He,Fe,"tagColors","attachments","auditLogs"],o=s.transaction(n,"readwrite"),a=o.objectStore(He),r=o.objectStore(Fe),l=o.objectStore("tagColors"),i=o.objectStore("attachments"),c=o.objectStore("auditLogs");a.clear(),r.clear(),l.clear(),i.clear(),c.clear(),o.oncomplete=()=>e(),o.onerror=()=>t(o.error)})}async function ms(){const s=await we();return new Promise((e,t)=>{try{const a=s.transaction("tagColors","readonly").objectStore("tagColors").getAll();a.onerror=()=>t(a.error),a.onsuccess=()=>e(a.result||[])}catch{e([])}})}async function $a(s){const e=await we();return new Promise((t,n)=>{const r=e.transaction("tagColors","readwrite").objectStore("tagColors").put(s);r.onerror=()=>n(r.error),r.onsuccess=()=>t()})}async function Na(s){const e=await we();return new Promise((t,n)=>{const r=e.transaction("attachments","readwrite").objectStore("attachments").put(s);r.onerror=()=>n(r.error),r.onsuccess=()=>t()})}async function Ks(s){const e=await we();return new Promise((t,n)=>{try{const r=e.transaction("attachments","readonly").objectStore("attachments").get(s);r.onerror=()=>n(r.error),r.onsuccess=()=>t(r.result||null)}catch{t(null)}})}async function Oa(){const s=await we();return new Promise((e,t)=>{try{const a=s.transaction("attachments","readonly").objectStore("attachments").getAll();a.onerror=()=>t(a.error),a.onsuccess=()=>e(a.result||[])}catch{e([])}})}async function Ba(s){const e=await we();return new Promise((t,n)=>{try{const r=e.transaction("auditLogs","readwrite").objectStore("auditLogs").put(s);r.onerror=()=>n(r.error),r.onsuccess=()=>t()}catch(o){console.error("Audit logging transaction failed:",o),t()}})}async function bn(){const s=await we();return new Promise((e,t)=>{try{const a=s.transaction("auditLogs","readonly").objectStore("auditLogs").getAll();a.onerror=()=>t(a.error),a.onsuccess=()=>{const r=a.result||[];r.sort((l,i)=>i.timestamp-l.timestamp),e(r)}}catch{e([])}})}async function Lo(){const s=await we();return new Promise((e,t)=>{const a=s.transaction("auditLogs","readwrite").objectStore("auditLogs").clear();a.onerror=()=>t(a.error),a.onsuccess=()=>e()})}async function Ao(s){const e=await we(),t=Date.now()-s*24*60*60*1e3;return new Promise((n,o)=>{try{const l=e.transaction("auditLogs","readwrite").objectStore("auditLogs").openCursor();l.onerror=()=>o(l.error),l.onsuccess=()=>{const i=l.result;i?(i.value.timestamp<t&&i.delete(),i.continue()):n()}}catch(a){o(a)}})}async function Co(s){const e=await we();return new Promise((t,n)=>{const r=e.transaction("backups","readwrite").objectStore("backups").put(s);r.onerror=()=>n(r.error),r.onsuccess=()=>t()})}async function ts(){const s=await we();return new Promise((e,t)=>{const a=s.transaction("backups","readonly").objectStore("backups").getAll();a.onerror=()=>t(a.error),a.onsuccess=()=>e(a.result||[])})}async function _a(s){const e=await we();return new Promise((t,n)=>{const r=e.transaction("backups","readwrite").objectStore("backups").delete(s);r.onerror=()=>n(r.error),r.onsuccess=()=>t()})}/*! @license DOMPurify 3.4.11 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.4.11/LICENSE */function Ys(s,e){(e==null||e>s.length)&&(e=s.length);for(var t=0,n=Array(e);t<e;t++)n[t]=s[t];return n}function Pa(s){if(Array.isArray(s))return s}function Ma(s,e){var t=s==null?null:typeof Symbol<"u"&&s[Symbol.iterator]||s["@@iterator"];if(t!=null){var n,o,a,r,l=[],i=!0,c=!1;try{if(a=(t=t.call(s)).next,e!==0)for(;!(i=(n=a.call(t)).done)&&(l.push(n.value),l.length!==e);i=!0);}catch(p){c=!0,o=p}finally{try{if(!i&&t.return!=null&&(r=t.return(),Object(r)!==r))return}finally{if(c)throw o}}return l}}function Ua(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function ja(s,e){return Pa(s)||Ma(s,e)||za(s,e)||Ua()}function za(s,e){if(s){if(typeof s=="string")return Ys(s,e);var t={}.toString.call(s).slice(8,-1);return t==="Object"&&s.constructor&&(t=s.constructor.name),t==="Map"||t==="Set"?Array.from(s):t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?Ys(s,e):void 0}}const Ro=Object.entries,Zs=Object.setPrototypeOf,Ha=Object.isFrozen,Fa=Object.getPrototypeOf,Wa=Object.getOwnPropertyDescriptor;let De=Object.freeze,$e=Object.seal,Lt=Object.create,Do=typeof Reflect<"u"&&Reflect,ns=Do.apply,ss=Do.construct;De||(De=function(e){return e});$e||($e=function(e){return e});ns||(ns=function(e,t){for(var n=arguments.length,o=new Array(n>2?n-2:0),a=2;a<n;a++)o[a-2]=arguments[a];return e.apply(t,o)});ss||(ss=function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),o=1;o<t;o++)n[o-1]=arguments[o];return new e(...n)});const Ot=ke(Array.prototype.forEach),qa=ke(Array.prototype.lastIndexOf),Xs=ke(Array.prototype.pop),It=ke(Array.prototype.push),Ga=ke(Array.prototype.splice),lt=Array.isArray,Ut=ke(String.prototype.toLowerCase),jn=ke(String.prototype.toString),Js=ke(String.prototype.match),Bt=ke(String.prototype.replace),Qs=ke(String.prototype.indexOf),Va=ke(String.prototype.trim),Ka=ke(Number.prototype.toString),Ya=ke(Boolean.prototype.toString),eo=typeof BigInt>"u"?null:ke(BigInt.prototype.toString),to=typeof Symbol>"u"?null:ke(Symbol.prototype.toString),Ie=ke(Object.prototype.hasOwnProperty),_t=ke(Object.prototype.toString),Re=ke(RegExp.prototype.test),pt=Za(TypeError);function ke(s){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var t=arguments.length,n=new Array(t>1?t-1:0),o=1;o<t;o++)n[o-1]=arguments[o];return ns(s,e,n)}}function Za(s){return function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return ss(s,t)}}function ne(s,e){let t=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Ut;if(Zs&&Zs(s,null),!lt(e))return s;let n=e.length;for(;n--;){let o=e[n];if(typeof o=="string"){const a=t(o);a!==o&&(Ha(e)||(e[n]=a),o=a)}s[o]=!0}return s}function Xa(s){for(let e=0;e<s.length;e++)Ie(s,e)||(s[e]=null);return s}function Oe(s){const e=Lt(null);for(const n of Ro(s)){var t=ja(n,2);const o=t[0],a=t[1];Ie(s,o)&&(lt(a)?e[o]=Xa(a):a&&typeof a=="object"&&a.constructor===Object?e[o]=Oe(a):e[o]=a)}return e}function Ja(s){switch(typeof s){case"string":return s;case"number":return Ka(s);case"boolean":return Ya(s);case"bigint":return eo?eo(s):"0";case"symbol":return to?to(s):"Symbol()";case"undefined":return _t(s);case"function":case"object":{if(s===null)return _t(s);const e=s,t=Je(e,"toString");if(typeof t=="function"){const n=t(e);return typeof n=="string"?n:_t(n)}return _t(s)}default:return _t(s)}}function Je(s,e){for(;s!==null;){const n=Wa(s,e);if(n){if(n.get)return ke(n.get);if(typeof n.value=="function")return ke(n.value)}s=Fa(s)}function t(){return null}return t}function Qa(s){try{return Re(s,""),!0}catch{return!1}}const no=De(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),zn=De(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Hn=De(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),er=De(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Fn=De(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),tr=De(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),so=De(["#text"]),oo=De(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","command","commandfor","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns"]),Wn=De(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),ao=De(["accent","accentunder","align","bevelled","close","columnalign","columnlines","columnspacing","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lquote","lspace","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),on=De(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),nr=$e(/{{[\w\W]*|^[\w\W]*}}/g),sr=$e(/<%[\w\W]*|^[\w\W]*%>/g),or=$e(/\${[\w\W]*/g),ar=$e(/^data-[\-\w.\u00B7-\uFFFF]+$/),rr=$e(/^aria-[\-\w]+$/),ro=$e(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),ir=$e(/^(?:\w+script|data):/i),lr=$e(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),cr=$e(/^html$/i),dr=$e(/^[a-z][.\w]*(-[.\w]+)+$/i),io=$e(/<[/\w!]/g),pr=$e(/<[/\w]/g),ur=$e(/<\/no(script|embed|frames)/i),fr=$e(/\/>/i),Xe={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,processingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},mr=function(){return typeof window>"u"?null:window},gr=function(e,t){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let n=null;const o="data-tt-policy-suffix";t&&t.hasAttribute(o)&&(n=t.getAttribute(o));const a="dompurify"+(n?"#"+n:"");try{return e.createPolicy(a,{createHTML(r){return r},createScriptURL(r){return r}})}catch{return console.warn("TrustedTypes policy "+a+" could not be created."),null}},lo=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}},it=function(e,t,n,o){return Ie(e,t)&&lt(e[t])?ne(o.base?Oe(o.base):{},e[t],o.transform):n};function $o(){let s=arguments.length>0&&arguments[0]!==void 0?arguments[0]:mr();const e=$=>$o($);if(e.version="3.4.11",e.removed=[],!s||!s.document||s.document.nodeType!==Xe.document||!s.Element)return e.isSupported=!1,e;let t=s.document;const n=t,o=n.currentScript;s.DocumentFragment;const a=s.HTMLTemplateElement,r=s.Node,l=s.Element,i=s.NodeFilter,c=s.NamedNodeMap;c===void 0&&(s.NamedNodeMap||s.MozNamedAttrMap),s.HTMLFormElement;const p=s.DOMParser,m=s.trustedTypes,u=l.prototype,f=Je(u,"cloneNode"),x=Je(u,"remove"),w=Je(u,"nextSibling"),h=Je(u,"childNodes"),R=Je(u,"parentNode"),M=Je(u,"shadowRoot"),E=Je(u,"attributes"),v=r&&r.prototype?Je(r.prototype,"nodeType"):null,L=r&&r.prototype?Je(r.prototype,"nodeName"):null;if(typeof a=="function"){const $=t.createElement("template");$.content&&$.content.ownerDocument&&(t=$.content.ownerDocument)}let P,j="",ae,J=!1,Q=0;const le=function(){if(Q>0)throw pt('A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted Types" section of the README.')},xe=function(d){le(),Q++;try{return P.createHTML(d)}finally{Q--}},Be=function(d){le(),Q++;try{return P.createScriptURL(d)}finally{Q--}},_=function(){return J||(ae=gr(m,o),J=!0),ae},N=t,k=N.implementation,g=N.createNodeIterator,A=N.createDocumentFragment,C=N.getElementsByTagName,F=n.importNode;let B=lo();e.isSupported=typeof Ro=="function"&&typeof R=="function"&&k&&k.createHTMLDocument!==void 0;const re=nr,S=sr,V=or,W=ar,Z=rr,G=ir,q=lr,K=dr;let te=ro,y=null;const O=ne({},[...no,...zn,...Hn,...Fn,...so]);let T=null;const H=ne({},[...oo,...Wn,...ao,...on]);let U=Object.seal(Lt(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),se=null,ge=null;const be=Object.seal(Lt(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let Ce=!0,Se=!0,nt=!1,Me=!0,fe=!1,We=!0,Ke=!1,Dt=!1,Tn=null,In=null,Ln=!1,vt=!1,Zt=!1,Xt=!1,Ls=!0,As=!1;const Cs="user-content-";let An=!0,Cn=!1,Et={},Ye=null;const Rn=ne({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","selectedcontent","style","svg","template","thead","title","video","xmp"]);let Rs=null;const Ds=ne({},["audio","video","img","source","image","track"]);let Dn=null;const $s=ne({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Jt="http://www.w3.org/1998/Math/MathML",Qt="http://www.w3.org/2000/svg",Ze="http://www.w3.org/1999/xhtml";let kt=Ze,$n=!1,Nn=null;const la=ne({},[Jt,Qt,Ze],jn),Ns=De(["mi","mo","mn","ms","mtext"]);let On=ne({},Ns);const Os=De(["annotation-xml"]);let Bn=ne({},Os);const ca=ne({},["title","style","font","a","script"]);let $t=null;const da=["application/xhtml+xml","text/html"],pa="text/html";let he=null,St=null;const ua=t.createElement("form"),Bs=function(d){return d instanceof RegExp||d instanceof Function},_n=function(){let d=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(St&&St===d)return;(!d||typeof d!="object")&&(d={}),d=Oe(d),$t=da.indexOf(d.PARSER_MEDIA_TYPE)===-1?pa:d.PARSER_MEDIA_TYPE,he=$t==="application/xhtml+xml"?jn:Ut,y=it(d,"ALLOWED_TAGS",O,{transform:he}),T=it(d,"ALLOWED_ATTR",H,{transform:he}),Nn=it(d,"ALLOWED_NAMESPACES",la,{transform:jn}),Dn=it(d,"ADD_URI_SAFE_ATTR",$s,{transform:he,base:$s}),Rs=it(d,"ADD_DATA_URI_TAGS",Ds,{transform:he,base:Ds}),Ye=it(d,"FORBID_CONTENTS",Rn,{transform:he}),se=it(d,"FORBID_TAGS",Oe({}),{transform:he}),ge=it(d,"FORBID_ATTR",Oe({}),{transform:he}),Et=Ie(d,"USE_PROFILES")?d.USE_PROFILES&&typeof d.USE_PROFILES=="object"?Oe(d.USE_PROFILES):d.USE_PROFILES:!1,Ce=d.ALLOW_ARIA_ATTR!==!1,Se=d.ALLOW_DATA_ATTR!==!1,nt=d.ALLOW_UNKNOWN_PROTOCOLS||!1,Me=d.ALLOW_SELF_CLOSE_IN_ATTR!==!1,fe=d.SAFE_FOR_TEMPLATES||!1,We=d.SAFE_FOR_XML!==!1,Ke=d.WHOLE_DOCUMENT||!1,vt=d.RETURN_DOM||!1,Zt=d.RETURN_DOM_FRAGMENT||!1,Xt=d.RETURN_TRUSTED_TYPE||!1,Ln=d.FORCE_BODY||!1,Ls=d.SANITIZE_DOM!==!1,As=d.SANITIZE_NAMED_PROPS||!1,An=d.KEEP_CONTENT!==!1,Cn=d.IN_PLACE||!1,te=Qa(d.ALLOWED_URI_REGEXP)?d.ALLOWED_URI_REGEXP:ro,kt=typeof d.NAMESPACE=="string"?d.NAMESPACE:Ze,On=Ie(d,"MATHML_TEXT_INTEGRATION_POINTS")&&d.MATHML_TEXT_INTEGRATION_POINTS&&typeof d.MATHML_TEXT_INTEGRATION_POINTS=="object"?Oe(d.MATHML_TEXT_INTEGRATION_POINTS):ne({},Ns),Bn=Ie(d,"HTML_INTEGRATION_POINTS")&&d.HTML_INTEGRATION_POINTS&&typeof d.HTML_INTEGRATION_POINTS=="object"?Oe(d.HTML_INTEGRATION_POINTS):ne({},Os);const b=Ie(d,"CUSTOM_ELEMENT_HANDLING")&&d.CUSTOM_ELEMENT_HANDLING&&typeof d.CUSTOM_ELEMENT_HANDLING=="object"?Oe(d.CUSTOM_ELEMENT_HANDLING):Lt(null);if(U=Lt(null),Ie(b,"tagNameCheck")&&Bs(b.tagNameCheck)&&(U.tagNameCheck=b.tagNameCheck),Ie(b,"attributeNameCheck")&&Bs(b.attributeNameCheck)&&(U.attributeNameCheck=b.attributeNameCheck),Ie(b,"allowCustomizedBuiltInElements")&&typeof b.allowCustomizedBuiltInElements=="boolean"&&(U.allowCustomizedBuiltInElements=b.allowCustomizedBuiltInElements),$e(U),fe&&(Se=!1),Zt&&(vt=!0),Et&&(y=ne({},so),T=Lt(null),Et.html===!0&&(ne(y,no),ne(T,oo)),Et.svg===!0&&(ne(y,zn),ne(T,Wn),ne(T,on)),Et.svgFilters===!0&&(ne(y,Hn),ne(T,Wn),ne(T,on)),Et.mathMl===!0&&(ne(y,Fn),ne(T,ao),ne(T,on))),be.tagCheck=null,be.attributeCheck=null,Ie(d,"ADD_TAGS")&&(typeof d.ADD_TAGS=="function"?be.tagCheck=d.ADD_TAGS:lt(d.ADD_TAGS)&&(y===O&&(y=Oe(y)),ne(y,d.ADD_TAGS,he))),Ie(d,"ADD_ATTR")&&(typeof d.ADD_ATTR=="function"?be.attributeCheck=d.ADD_ATTR:lt(d.ADD_ATTR)&&(T===H&&(T=Oe(T)),ne(T,d.ADD_ATTR,he))),Ie(d,"ADD_URI_SAFE_ATTR")&&lt(d.ADD_URI_SAFE_ATTR)&&ne(Dn,d.ADD_URI_SAFE_ATTR,he),Ie(d,"FORBID_CONTENTS")&&lt(d.FORBID_CONTENTS)&&(Ye===Rn&&(Ye=Oe(Ye)),ne(Ye,d.FORBID_CONTENTS,he)),Ie(d,"ADD_FORBID_CONTENTS")&&lt(d.ADD_FORBID_CONTENTS)&&(Ye===Rn&&(Ye=Oe(Ye)),ne(Ye,d.ADD_FORBID_CONTENTS,he)),An&&(y["#text"]=!0),Ke&&ne(y,["html","head","body"]),y.table&&(ne(y,["tbody"]),delete se.tbody),d.TRUSTED_TYPES_POLICY){if(typeof d.TRUSTED_TYPES_POLICY.createHTML!="function")throw pt('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof d.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw pt('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');const D=P;P=d.TRUSTED_TYPES_POLICY;try{j=xe("")}catch(z){throw P=D,z}}else d.TRUSTED_TYPES_POLICY===null?(P=void 0,j=""):(P===void 0&&(P=_()),P&&typeof j=="string"&&(j=xe("")));De&&De(d),St=d},_s=ne({},[...zn,...Hn,...er]),Ps=ne({},[...Fn,...tr]),fa=function(d,b,D){return b.namespaceURI===Ze?d==="svg":b.namespaceURI===Jt?d==="svg"&&(D==="annotation-xml"||On[D]):!!_s[d]},ma=function(d,b,D){return b.namespaceURI===Ze?d==="math":b.namespaceURI===Qt?d==="math"&&Bn[D]:!!Ps[d]},ga=function(d,b,D){return b.namespaceURI===Qt&&!Bn[D]||b.namespaceURI===Jt&&!On[D]?!1:!Ps[d]&&(ca[d]||!_s[d])},ba=function(d){let b=R(d);(!b||!b.tagName)&&(b={namespaceURI:kt,tagName:"template"});const D=Ut(d.tagName),z=Ut(b.tagName);return Nn[d.namespaceURI]?d.namespaceURI===Qt?fa(D,b,z):d.namespaceURI===Jt?ma(D,b,z):d.namespaceURI===Ze?ga(D,b,z):!!($t==="application/xhtml+xml"&&Nn[d.namespaceURI]):!1},rt=function(d){It(e.removed,{element:d});try{R(d).removeChild(d)}catch{if(x(d),!R(d))throw pt("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place")}},Ms=function(d){const b=h(d);if(b){const z=[];Ot(b,X=>{It(z,X)}),Ot(z,X=>{try{x(X)}catch{}})}const D=E(d);if(D)for(let z=D.length-1;z>=0;--z){const X=D[z],oe=X&&X.name;if(typeof oe=="string")try{d.removeAttribute(oe)}catch{}}},dt=function(d,b){try{It(e.removed,{attribute:b.getAttributeNode(d),from:b})}catch{It(e.removed,{attribute:null,from:b})}if(b.removeAttribute(d),d==="is")if(vt||Zt)try{rt(b)}catch{}else try{b.setAttribute(d,"")}catch{}},ha=function(d){const b=E(d);if(b)for(let D=b.length-1;D>=0;--D){const z=b[D],X=z&&z.name;if(!(typeof X!="string"||T[he(X)]))try{d.removeAttribute(X)}catch{}}},xa=function(d){const b=[d];for(;b.length>0;){const D=b.pop();(v?v(D):D.nodeType)===Xe.element&&ha(D);const X=h(D);if(X)for(let oe=X.length-1;oe>=0;--oe)b.push(X[oe])}},Us=function(d){let b=null,D=null;if(Ln)d="<remove></remove>"+d;else{const oe=Js(d,/^[\r\n\t ]+/);D=oe&&oe[0]}$t==="application/xhtml+xml"&&kt===Ze&&(d='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+d+"</body></html>");const z=P?xe(d):d;if(kt===Ze)try{b=new p().parseFromString(z,$t)}catch{}if(!b||!b.documentElement){b=k.createDocument(kt,"template",null);try{b.documentElement.innerHTML=$n?j:z}catch{}}const X=b.body||b.documentElement;return d&&D&&X.insertBefore(t.createTextNode(D),X.childNodes[0]||null),kt===Ze?C.call(b,Ke?"html":"body")[0]:Ke?b.documentElement:X},js=function(d){return g.call(d.ownerDocument||d,d,i.SHOW_ELEMENT|i.SHOW_COMMENT|i.SHOW_TEXT|i.SHOW_PROCESSING_INSTRUCTION|i.SHOW_CDATA_SECTION,null)},en=function(d){return d=Bt(d,re," "),d=Bt(d,S," "),d=Bt(d,V," "),d},Pn=function(d){var b;d.normalize();const D=g.call(d.ownerDocument||d,d,i.SHOW_TEXT|i.SHOW_COMMENT|i.SHOW_CDATA_SECTION|i.SHOW_PROCESSING_INSTRUCTION,null);let z=D.nextNode();for(;z;)z.data=en(z.data),z=D.nextNode();const X=(b=d.querySelectorAll)===null||b===void 0?void 0:b.call(d,"template");X&&Ot(X,oe=>{Tt(oe.content)&&Pn(oe.content)})},tn=function(d){const b=L?L(d):null;return typeof b!="string"||he(b)!=="form"?!1:typeof d.nodeName!="string"||typeof d.textContent!="string"||typeof d.removeChild!="function"||d.attributes!==E(d)||typeof d.removeAttribute!="function"||typeof d.setAttribute!="function"||typeof d.namespaceURI!="string"||typeof d.insertBefore!="function"||typeof d.hasChildNodes!="function"||d.nodeType!==v(d)||d.childNodes!==h(d)},Tt=function(d){if(!v||typeof d!="object"||d===null)return!1;try{return v(d)===Xe.documentFragment}catch{return!1}},Nt=function(d){if(!v||typeof d!="object"||d===null)return!1;try{return typeof v(d)=="number"}catch{return!1}};function st($,d,b){$.length!==0&&Ot($,D=>{D.call(e,d,b,St)})}const ya=function(d,b){return!!(We&&d.hasChildNodes()&&!Nt(d.firstElementChild)&&Re(io,d.textContent)&&Re(io,d.innerHTML)||We&&d.namespaceURI===Ze&&b==="style"&&Nt(d.firstElementChild)||d.nodeType===Xe.processingInstruction||We&&d.nodeType===Xe.comment&&Re(pr,d.data))},wa=function(d,b){if(!se[b]&&Fs(b)&&(U.tagNameCheck instanceof RegExp&&Re(U.tagNameCheck,b)||U.tagNameCheck instanceof Function&&U.tagNameCheck(b)))return!1;if(An&&!Ye[b]){const D=R(d),z=h(d);if(z&&D){const X=z.length;for(let oe=X-1;oe>=0;--oe){const Te=Cn?z[oe]:f(z[oe],!0);D.insertBefore(Te,w(d))}}}return rt(d),!0},zs=function(d){if(st(B.beforeSanitizeElements,d,null),tn(d))return rt(d),!0;const b=he(L?L(d):d.nodeName);if(st(B.uponSanitizeElement,d,{tagName:b,allowedTags:y}),ya(d,b))return rt(d),!0;if(se[b]||!(be.tagCheck instanceof Function&&be.tagCheck(b))&&!y[b])return wa(d,b);if((v?v(d):d.nodeType)===Xe.element&&!ba(d)||(b==="noscript"||b==="noembed"||b==="noframes")&&Re(ur,d.innerHTML))return rt(d),!0;if(fe&&d.nodeType===Xe.text){const z=en(d.textContent);d.textContent!==z&&(It(e.removed,{element:d.cloneNode()}),d.textContent=z)}return st(B.afterSanitizeElements,d,null),!1},Hs=function(d,b,D){if(ge[b]||Ls&&(b==="id"||b==="name")&&(D in t||D in ua))return!1;const z=T[b]||be.attributeCheck instanceof Function&&be.attributeCheck(b,d);if(!(Se&&Re(W,b))){if(!(Ce&&Re(Z,b))){if(z){if(!Dn[b]){if(!Re(te,Bt(D,q,""))){if(!((b==="src"||b==="xlink:href"||b==="href")&&d!=="script"&&Qs(D,"data:")===0&&Rs[d])){if(!(nt&&!Re(G,Bt(D,q,"")))){if(D)return!1}}}}}else if(!(Fs(d)&&(U.tagNameCheck instanceof RegExp&&Re(U.tagNameCheck,d)||U.tagNameCheck instanceof Function&&U.tagNameCheck(d))&&(U.attributeNameCheck instanceof RegExp&&Re(U.attributeNameCheck,b)||U.attributeNameCheck instanceof Function&&U.attributeNameCheck(b,d))||b==="is"&&U.allowCustomizedBuiltInElements&&(U.tagNameCheck instanceof RegExp&&Re(U.tagNameCheck,D)||U.tagNameCheck instanceof Function&&U.tagNameCheck(D))))return!1}}return!0},va=ne({},["annotation-xml","color-profile","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","missing-glyph"]),Fs=function(d){return!va[Ut(d)]&&Re(K,d)},Ea=function(d,b,D,z){if(P&&typeof m=="object"&&typeof m.getAttributeType=="function"&&!D)switch(m.getAttributeType(d,b)){case"TrustedHTML":return xe(z);case"TrustedScriptURL":return Be(z)}return z},ka=function(d,b,D,z){try{D?d.setAttributeNS(D,b,z):d.setAttribute(b,z),tn(d)?rt(d):Xs(e.removed)}catch{dt(b,d)}},Ws=function(d){st(B.beforeSanitizeAttributes,d,null);const b=d.attributes;if(!b||tn(d))return;const D={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:T,forceKeepAttr:void 0};let z=b.length;const X=he(d.nodeName);for(;z--;){const oe=b[z],Te=oe.name,ve=oe.namespaceURI,Ue=oe.value,qe=he(Te),Un=Ue;let Ne=Te==="value"?Un:Va(Un);if(D.attrName=qe,D.attrValue=Ne,D.keepAttr=!0,D.forceKeepAttr=void 0,st(B.uponSanitizeAttribute,d,D),Ne=D.attrValue,As&&(qe==="id"||qe==="name")&&Qs(Ne,Cs)!==0&&(dt(Te,d),Ne=Cs+Ne),We&&Re(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i,Ne)){dt(Te,d);continue}if(qe==="attributename"&&Js(Ne,"href")){dt(Te,d);continue}if(!D.forceKeepAttr){if(!D.keepAttr){dt(Te,d);continue}if(!Me&&Re(fr,Ne)){dt(Te,d);continue}if(fe&&(Ne=en(Ne)),!Hs(X,qe,Ne)){dt(Te,d);continue}Ne=Ea(X,qe,ve,Ne),Ne!==Un&&ka(d,Te,ve,Ne)}}st(B.afterSanitizeAttributes,d,null)},nn=function(d){let b=null;const D=js(d);for(st(B.beforeSanitizeShadowDOM,d,null);b=D.nextNode();)if(st(B.uponSanitizeShadowNode,b,null),zs(b),Ws(b),Tt(b.content)&&nn(b.content),(v?v(b):b.nodeType)===Xe.element){const X=M(b);Tt(X)&&(Mn(X),nn(X))}st(B.afterSanitizeShadowDOM,d,null)},Mn=function(d){const b=[{node:d,shadow:null}];for(;b.length>0;){const D=b.pop();if(D.shadow){nn(D.shadow);continue}const z=D.node,oe=(v?v(z):z.nodeType)===Xe.element,Te=h(z);if(Te)for(let ve=Te.length-1;ve>=0;--ve)b.push({node:Te[ve],shadow:null});if(oe){const ve=L?L(z):null;if(typeof ve=="string"&&he(ve)==="template"){const Ue=z.content;Tt(Ue)&&b.push({node:Ue,shadow:null})}}if(oe){const ve=M(z);Tt(ve)&&b.push({node:null,shadow:ve},{node:ve,shadow:null})}}};return e.sanitize=function($){let d=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},b=null,D=null,z=null,X=null;if($n=!$,$n&&($="<!-->"),typeof $!="string"&&!Nt($)&&($=Ja($),typeof $!="string"))throw pt("dirty is not a string, aborting");if(!e.isSupported)return $;Dt?(y=Tn,T=In):_n(d),(B.uponSanitizeElement.length>0||B.uponSanitizeAttribute.length>0)&&(y=Oe(y)),B.uponSanitizeAttribute.length>0&&(T=Oe(T)),e.removed=[];const oe=Cn&&typeof $!="string"&&Nt($);if(oe){const Ue=L?L($):$.nodeName;if(typeof Ue=="string"){const qe=he(Ue);if(!y[qe]||se[qe])throw pt("root node is forbidden and cannot be sanitized in-place")}if(tn($))throw pt("root node is clobbered and cannot be sanitized in-place");try{Mn($)}catch(qe){throw Ms($),qe}}else if(Nt($))b=Us("<!---->"),D=b.ownerDocument.importNode($,!0),D.nodeType===Xe.element&&D.nodeName==="BODY"||D.nodeName==="HTML"?b=D:b.appendChild(D),Mn(D);else{if(!vt&&!fe&&!Ke&&$.indexOf("<")===-1)return P&&Xt?xe($):$;if(b=Us($),!b)return vt?null:Xt?j:""}b&&Ln&&rt(b.firstChild);const Te=js(oe?$:b);try{for(;z=Te.nextNode();)zs(z),Ws(z),Tt(z.content)&&nn(z.content)}catch(Ue){throw oe&&Ms($),Ue}if(oe)return Ot(e.removed,Ue=>{Ue.element&&xa(Ue.element)}),fe&&Pn($),$;if(vt){if(fe&&Pn(b),Zt)for(X=A.call(b.ownerDocument);b.firstChild;)X.appendChild(b.firstChild);else X=b;return(T.shadowroot||T.shadowrootmode)&&(X=F.call(n,X,!0)),X}let ve=Ke?b.outerHTML:b.innerHTML;return Ke&&y["!doctype"]&&b.ownerDocument&&b.ownerDocument.doctype&&b.ownerDocument.doctype.name&&Re(cr,b.ownerDocument.doctype.name)&&(ve="<!DOCTYPE "+b.ownerDocument.doctype.name+`>
`+ve),fe&&(ve=en(ve)),P&&Xt?xe(ve):ve},e.setConfig=function(){let $=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};_n($),Dt=!0,Tn=y,In=T},e.clearConfig=function(){St=null,Dt=!1,Tn=null,In=null,P=ae,j=""},e.isValidAttribute=function($,d,b){St||_n({});const D=he($),z=he(d);return Hs(D,z,b)},e.addHook=function($,d){typeof d=="function"&&Ie(B,$)&&It(B[$],d)},e.removeHook=function($,d){if(Ie(B,$)){if(d!==void 0){const b=qa(B[$],d);return b===-1?void 0:Ga(B[$],b,1)[0]}return Xs(B[$])}},e.removeHooks=function($){Ie(B,$)&&(B[$]=[])},e.removeAllHooks=function(){B=lo()},e}var zt=$o();function gs(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}let yt=gs();function No(s){yt=s}const Oo=/[&<>"']/,br=new RegExp(Oo.source,"g"),Bo=/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,hr=new RegExp(Bo.source,"g"),xr={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},co=s=>xr[s];function Pe(s,e){if(e){if(Oo.test(s))return s.replace(br,co)}else if(Bo.test(s))return s.replace(hr,co);return s}const yr=/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;function wr(s){return s.replace(yr,(e,t)=>(t=t.toLowerCase(),t==="colon"?":":t.charAt(0)==="#"?t.charAt(1)==="x"?String.fromCharCode(parseInt(t.substring(2),16)):String.fromCharCode(+t.substring(1)):""))}const vr=/(^|[^\[])\^/g;function ce(s,e){let t=typeof s=="string"?s:s.source;e=e||"";const n={replace:(o,a)=>{let r=typeof a=="string"?a:a.source;return r=r.replace(vr,"$1"),t=t.replace(o,r),n},getRegex:()=>new RegExp(t,e)};return n}function po(s){try{s=encodeURI(s).replace(/%25/g,"%")}catch{return null}return s}const Ht={exec:()=>null};function uo(s,e){const t=s.replace(/\|/g,(a,r,l)=>{let i=!1,c=r;for(;--c>=0&&l[c]==="\\";)i=!i;return i?"|":" |"}),n=t.split(/ \|/);let o=0;if(n[0].trim()||n.shift(),n.length>0&&!n[n.length-1].trim()&&n.pop(),e)if(n.length>e)n.splice(e);else for(;n.length<e;)n.push("");for(;o<n.length;o++)n[o]=n[o].trim().replace(/\\\|/g,"|");return n}function an(s,e,t){const n=s.length;if(n===0)return"";let o=0;for(;o<n&&s.charAt(n-o-1)===e;)o++;return s.slice(0,n-o)}function Er(s,e){if(s.indexOf(e[1])===-1)return-1;let t=0;for(let n=0;n<s.length;n++)if(s[n]==="\\")n++;else if(s[n]===e[0])t++;else if(s[n]===e[1]&&(t--,t<0))return n;return-1}function fo(s,e,t,n){const o=e.href,a=e.title?Pe(e.title):null,r=s[1].replace(/\\([\[\]])/g,"$1");if(s[0].charAt(0)!=="!"){n.state.inLink=!0;const l={type:"link",raw:t,href:o,title:a,text:r,tokens:n.inlineTokens(r)};return n.state.inLink=!1,l}return{type:"image",raw:t,href:o,title:a,text:Pe(r)}}function kr(s,e){const t=s.match(/^(\s+)(?:```)/);if(t===null)return e;const n=t[1];return e.split(`
`).map(o=>{const a=o.match(/^\s+/);if(a===null)return o;const[r]=a;return r.length>=n.length?o.slice(n.length):o}).join(`
`)}class hn{constructor(e){de(this,"options");de(this,"rules");de(this,"lexer");this.options=e||yt}space(e){const t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){const t=this.rules.block.code.exec(e);if(t){const n=t[0].replace(/^ {1,4}/gm,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:an(n,`
`)}}}fences(e){const t=this.rules.block.fences.exec(e);if(t){const n=t[0],o=kr(n,t[3]||"");return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:o}}}heading(e){const t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(/#$/.test(n)){const o=an(n,"#");(this.options.pedantic||!o||/ $/.test(o))&&(n=o.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){const t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:t[0]}}blockquote(e){const t=this.rules.block.blockquote.exec(e);if(t){let n=t[0].replace(/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,`
    $1`);n=an(n.replace(/^ *>[ \t]?/gm,""),`
`);const o=this.lexer.state.top;this.lexer.state.top=!0;const a=this.lexer.blockTokens(n);return this.lexer.state.top=o,{type:"blockquote",raw:t[0],tokens:a,text:n}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim();const o=n.length>1,a={type:"list",raw:"",ordered:o,start:o?+n.slice(0,-1):"",loose:!1,items:[]};n=o?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=o?n:"[*+-]");const r=new RegExp(`^( {0,3}${n})((?:[	 ][^\\n]*)?(?:\\n|$))`);let l="",i="",c=!1;for(;e;){let p=!1;if(!(t=r.exec(e))||this.rules.block.hr.test(e))break;l=t[0],e=e.substring(l.length);let m=t[2].split(`
`,1)[0].replace(/^\t+/,R=>" ".repeat(3*R.length)),u=e.split(`
`,1)[0],f=0;this.options.pedantic?(f=2,i=m.trimStart()):(f=t[2].search(/[^ ]/),f=f>4?1:f,i=m.slice(f),f+=t[1].length);let x=!1;if(!m&&/^ *$/.test(u)&&(l+=u+`
`,e=e.substring(u.length+1),p=!0),!p){const R=new RegExp(`^ {0,${Math.min(3,f-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),M=new RegExp(`^ {0,${Math.min(3,f-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),E=new RegExp(`^ {0,${Math.min(3,f-1)}}(?:\`\`\`|~~~)`),v=new RegExp(`^ {0,${Math.min(3,f-1)}}#`);for(;e;){const L=e.split(`
`,1)[0];if(u=L,this.options.pedantic&&(u=u.replace(/^ {1,4}(?=( {4})*[^ ])/g,"  ")),E.test(u)||v.test(u)||R.test(u)||M.test(e))break;if(u.search(/[^ ]/)>=f||!u.trim())i+=`
`+u.slice(f);else{if(x||m.search(/[^ ]/)>=4||E.test(m)||v.test(m)||M.test(m))break;i+=`
`+u}!x&&!u.trim()&&(x=!0),l+=L+`
`,e=e.substring(L.length+1),m=u.slice(f)}}a.loose||(c?a.loose=!0:/\n *\n *$/.test(l)&&(c=!0));let w=null,h;this.options.gfm&&(w=/^\[[ xX]\] /.exec(i),w&&(h=w[0]!=="[ ] ",i=i.replace(/^\[[ xX]\] +/,""))),a.items.push({type:"list_item",raw:l,task:!!w,checked:h,loose:!1,text:i,tokens:[]}),a.raw+=l}a.items[a.items.length-1].raw=l.trimEnd(),a.items[a.items.length-1].text=i.trimEnd(),a.raw=a.raw.trimEnd();for(let p=0;p<a.items.length;p++)if(this.lexer.state.top=!1,a.items[p].tokens=this.lexer.blockTokens(a.items[p].text,[]),!a.loose){const m=a.items[p].tokens.filter(f=>f.type==="space"),u=m.length>0&&m.some(f=>/\n.*\n/.test(f.raw));a.loose=u}if(a.loose)for(let p=0;p<a.items.length;p++)a.items[p].loose=!0;return a}}html(e){const t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){const t=this.rules.block.def.exec(e);if(t){const n=t[1].toLowerCase().replace(/\s+/g," "),o=t[2]?t[2].replace(/^<(.*)>$/,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",a=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:o,title:a}}}table(e){const t=this.rules.block.table.exec(e);if(!t||!/[:|]/.test(t[2]))return;const n=uo(t[1]),o=t[2].replace(/^\||\| *$/g,"").split("|"),a=t[3]&&t[3].trim()?t[3].replace(/\n[ \t]*$/,"").split(`
`):[],r={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===o.length){for(const l of o)/^ *-+: *$/.test(l)?r.align.push("right"):/^ *:-+: *$/.test(l)?r.align.push("center"):/^ *:-+ *$/.test(l)?r.align.push("left"):r.align.push(null);for(const l of n)r.header.push({text:l,tokens:this.lexer.inline(l)});for(const l of a)r.rows.push(uo(l,r.header.length).map(i=>({text:i,tokens:this.lexer.inline(i)})));return r}}lheading(e){const t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){const t=this.rules.block.paragraph.exec(e);if(t){const n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){const t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){const t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:Pe(t[1])}}tag(e){const t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&/^<a /i.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&/^<\/a>/i.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&/^<(pre|code|kbd|script)(\s|>)/i.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&/^<\/(pre|code|kbd|script)(\s|>)/i.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){const t=this.rules.inline.link.exec(e);if(t){const n=t[2].trim();if(!this.options.pedantic&&/^</.test(n)){if(!/>$/.test(n))return;const r=an(n.slice(0,-1),"\\");if((n.length-r.length)%2===0)return}else{const r=Er(t[2],"()");if(r>-1){const i=(t[0].indexOf("!")===0?5:4)+t[1].length+r;t[2]=t[2].substring(0,r),t[0]=t[0].substring(0,i).trim(),t[3]=""}}let o=t[2],a="";if(this.options.pedantic){const r=/^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(o);r&&(o=r[1],a=r[3])}else a=t[3]?t[3].slice(1,-1):"";return o=o.trim(),/^</.test(o)&&(this.options.pedantic&&!/>$/.test(n)?o=o.slice(1):o=o.slice(1,-1)),fo(t,{href:o&&o.replace(this.rules.inline.anyPunctuation,"$1"),title:a&&a.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){const o=(n[2]||n[1]).replace(/\s+/g," "),a=t[o.toLowerCase()];if(!a){const r=n[0].charAt(0);return{type:"text",raw:r,text:r}}return fo(n,a,n[0],this.lexer)}}emStrong(e,t,n=""){let o=this.rules.inline.emStrongLDelim.exec(e);if(!o||o[3]&&n.match(/[\p{L}\p{N}]/u))return;if(!(o[1]||o[2]||"")||!n||this.rules.inline.punctuation.exec(n)){const r=[...o[0]].length-1;let l,i,c=r,p=0;const m=o[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(m.lastIndex=0,t=t.slice(-1*e.length+r);(o=m.exec(t))!=null;){if(l=o[1]||o[2]||o[3]||o[4]||o[5]||o[6],!l)continue;if(i=[...l].length,o[3]||o[4]){c+=i;continue}else if((o[5]||o[6])&&r%3&&!((r+i)%3)){p+=i;continue}if(c-=i,c>0)continue;i=Math.min(i,i+c+p);const u=[...o[0]][0].length,f=e.slice(0,r+o.index+u+i);if(Math.min(r,i)%2){const w=f.slice(1,-1);return{type:"em",raw:f,text:w,tokens:this.lexer.inlineTokens(w)}}const x=f.slice(2,-2);return{type:"strong",raw:f,text:x,tokens:this.lexer.inlineTokens(x)}}}}codespan(e){const t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(/\n/g," ");const o=/[^ ]/.test(n),a=/^ /.test(n)&&/ $/.test(n);return o&&a&&(n=n.substring(1,n.length-1)),n=Pe(n,!0),{type:"codespan",raw:t[0],text:n}}}br(e){const t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){const t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){const t=this.rules.inline.autolink.exec(e);if(t){let n,o;return t[2]==="@"?(n=Pe(t[1]),o="mailto:"+n):(n=Pe(t[1]),o=n),{type:"link",raw:t[0],text:n,href:o,tokens:[{type:"text",raw:n,text:n}]}}}url(e){var n;let t;if(t=this.rules.inline.url.exec(e)){let o,a;if(t[2]==="@")o=Pe(t[0]),a="mailto:"+o;else{let r;do r=t[0],t[0]=((n=this.rules.inline._backpedal.exec(t[0]))==null?void 0:n[0])??"";while(r!==t[0]);o=Pe(t[0]),t[1]==="www."?a="http://"+t[0]:a=t[0]}return{type:"link",raw:t[0],text:o,href:a,tokens:[{type:"text",raw:o,text:o}]}}}inlineText(e){const t=this.rules.inline.text.exec(e);if(t){let n;return this.lexer.state.inRawBlock?n=t[0]:n=Pe(t[0]),{type:"text",raw:t[0],text:n}}}}const Sr=/^(?: *(?:\n|$))+/,Tr=/^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,Ir=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Kt=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Lr=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,_o=/(?:[*+-]|\d{1,9}[.)])/,Po=ce(/^(?!bull |blockCode|fences|blockquote|heading|html)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html))+?)\n {0,3}(=+|-+) *(?:\n+|$)/).replace(/bull/g,_o).replace(/blockCode/g,/ {4}/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).getRegex(),bs=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Ar=/^[^\n]+/,hs=/(?!\s*\])(?:\\.|[^\[\]\\])+/,Cr=ce(/^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/).replace("label",hs).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Rr=ce(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,_o).getRegex(),Sn="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",xs=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Dr=ce("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))","i").replace("comment",xs).replace("tag",Sn).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Mo=ce(bs).replace("hr",Kt).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Sn).getRegex(),$r=ce(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Mo).getRegex(),ys={blockquote:$r,code:Tr,def:Cr,fences:Ir,heading:Lr,hr:Kt,html:Dr,lheading:Po,list:Rr,newline:Sr,paragraph:Mo,table:Ht,text:Ar},mo=ce("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Kt).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code"," {4}[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Sn).getRegex(),Nr={...ys,table:mo,paragraph:ce(bs).replace("hr",Kt).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",mo).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Sn).getRegex()},Or={...ys,html:ce(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",xs).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Ht,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:ce(bs).replace("hr",Kt).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Po).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Uo=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Br=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,jo=/^( {2,}|\\)\n(?!\s*$)/,_r=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Yt="\\p{P}\\p{S}",Pr=ce(/^((?![*_])[\spunctuation])/,"u").replace(/punctuation/g,Yt).getRegex(),Mr=/\[[^[\]]*?\]\([^\(\)]*?\)|`[^`]*?`|<[^<>]*?>/g,Ur=ce(/^(?:\*+(?:((?!\*)[punct])|[^\s*]))|^_+(?:((?!_)[punct])|([^\s_]))/,"u").replace(/punct/g,Yt).getRegex(),jr=ce("^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)[punct](\\*+)(?=[\\s]|$)|[^punct\\s](\\*+)(?!\\*)(?=[punct\\s]|$)|(?!\\*)[punct\\s](\\*+)(?=[^punct\\s])|[\\s](\\*+)(?!\\*)(?=[punct])|(?!\\*)[punct](\\*+)(?!\\*)(?=[punct])|[^punct\\s](\\*+)(?=[^punct\\s])","gu").replace(/punct/g,Yt).getRegex(),zr=ce("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)[punct](_+)(?=[\\s]|$)|[^punct\\s](_+)(?!_)(?=[punct\\s]|$)|(?!_)[punct\\s](_+)(?=[^punct\\s])|[\\s](_+)(?!_)(?=[punct])|(?!_)[punct](_+)(?!_)(?=[punct])","gu").replace(/punct/g,Yt).getRegex(),Hr=ce(/\\([punct])/,"gu").replace(/punct/g,Yt).getRegex(),Fr=ce(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Wr=ce(xs).replace("(?:-->|$)","-->").getRegex(),qr=ce("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Wr).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),xn=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,Gr=ce(/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/).replace("label",xn).replace("href",/<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),zo=ce(/^!?\[(label)\]\[(ref)\]/).replace("label",xn).replace("ref",hs).getRegex(),Ho=ce(/^!?\[(ref)\](?:\[\])?/).replace("ref",hs).getRegex(),Vr=ce("reflink|nolink(?!\\()","g").replace("reflink",zo).replace("nolink",Ho).getRegex(),ws={_backpedal:Ht,anyPunctuation:Hr,autolink:Fr,blockSkip:Mr,br:jo,code:Br,del:Ht,emStrongLDelim:Ur,emStrongRDelimAst:jr,emStrongRDelimUnd:zr,escape:Uo,link:Gr,nolink:Ho,punctuation:Pr,reflink:zo,reflinkSearch:Vr,tag:qr,text:_r,url:Ht},Kr={...ws,link:ce(/^!?\[(label)\]\((.*?)\)/).replace("label",xn).getRegex(),reflink:ce(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",xn).getRegex()},os={...ws,escape:ce(Uo).replace("])","~|])").getRegex(),url:ce(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},Yr={...os,br:ce(jo).replace("{2,}","*").getRegex(),text:ce(os.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},rn={normal:ys,gfm:Nr,pedantic:Or},Pt={normal:ws,gfm:os,breaks:Yr,pedantic:Kr};class Qe{constructor(e){de(this,"tokens");de(this,"options");de(this,"state");de(this,"tokenizer");de(this,"inlineQueue");this.tokens=[],this.tokens.links=Object.create(null),this.options=e||yt,this.options.tokenizer=this.options.tokenizer||new hn,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const t={block:rn.normal,inline:Pt.normal};this.options.pedantic?(t.block=rn.pedantic,t.inline=Pt.pedantic):this.options.gfm&&(t.block=rn.gfm,this.options.breaks?t.inline=Pt.breaks:t.inline=Pt.gfm),this.tokenizer.rules=t}static get rules(){return{block:rn,inline:Pt}}static lex(e,t){return new Qe(t).lex(e)}static lexInline(e,t){return new Qe(t).inlineTokens(e)}lex(e){e=e.replace(/\r\n|\r/g,`
`),this.blockTokens(e,this.tokens);for(let t=0;t<this.inlineQueue.length;t++){const n=this.inlineQueue[t];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,t=[]){this.options.pedantic?e=e.replace(/\t/g,"    ").replace(/^ +$/gm,""):e=e.replace(/^( *)(\t+)/gm,(l,i,c)=>i+"    ".repeat(c.length));let n,o,a,r;for(;e;)if(!(this.options.extensions&&this.options.extensions.block&&this.options.extensions.block.some(l=>(n=l.call({lexer:this},e,t))?(e=e.substring(n.raw.length),t.push(n),!0):!1))){if(n=this.tokenizer.space(e)){e=e.substring(n.raw.length),n.raw.length===1&&t.length>0?t[t.length-1].raw+=`
`:t.push(n);continue}if(n=this.tokenizer.code(e)){e=e.substring(n.raw.length),o=t[t.length-1],o&&(o.type==="paragraph"||o.type==="text")?(o.raw+=`
`+n.raw,o.text+=`
`+n.text,this.inlineQueue[this.inlineQueue.length-1].src=o.text):t.push(n);continue}if(n=this.tokenizer.fences(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.heading(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.hr(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.blockquote(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.list(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.html(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.def(e)){e=e.substring(n.raw.length),o=t[t.length-1],o&&(o.type==="paragraph"||o.type==="text")?(o.raw+=`
`+n.raw,o.text+=`
`+n.raw,this.inlineQueue[this.inlineQueue.length-1].src=o.text):this.tokens.links[n.tag]||(this.tokens.links[n.tag]={href:n.href,title:n.title});continue}if(n=this.tokenizer.table(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.lheading(e)){e=e.substring(n.raw.length),t.push(n);continue}if(a=e,this.options.extensions&&this.options.extensions.startBlock){let l=1/0;const i=e.slice(1);let c;this.options.extensions.startBlock.forEach(p=>{c=p.call({lexer:this},i),typeof c=="number"&&c>=0&&(l=Math.min(l,c))}),l<1/0&&l>=0&&(a=e.substring(0,l+1))}if(this.state.top&&(n=this.tokenizer.paragraph(a))){o=t[t.length-1],r&&o.type==="paragraph"?(o.raw+=`
`+n.raw,o.text+=`
`+n.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=o.text):t.push(n),r=a.length!==e.length,e=e.substring(n.raw.length);continue}if(n=this.tokenizer.text(e)){e=e.substring(n.raw.length),o=t[t.length-1],o&&o.type==="text"?(o.raw+=`
`+n.raw,o.text+=`
`+n.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=o.text):t.push(n);continue}if(e){const l="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(l);break}else throw new Error(l)}}return this.state.top=!0,t}inline(e,t=[]){return this.inlineQueue.push({src:e,tokens:t}),t}inlineTokens(e,t=[]){let n,o,a,r=e,l,i,c;if(this.tokens.links){const p=Object.keys(this.tokens.links);if(p.length>0)for(;(l=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)p.includes(l[0].slice(l[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,l.index)+"["+"a".repeat(l[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(l=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)r=r.slice(0,l.index)+"["+"a".repeat(l[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);for(;(l=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,l.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;e;)if(i||(c=""),i=!1,!(this.options.extensions&&this.options.extensions.inline&&this.options.extensions.inline.some(p=>(n=p.call({lexer:this},e,t))?(e=e.substring(n.raw.length),t.push(n),!0):!1))){if(n=this.tokenizer.escape(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.tag(e)){e=e.substring(n.raw.length),o=t[t.length-1],o&&n.type==="text"&&o.type==="text"?(o.raw+=n.raw,o.text+=n.text):t.push(n);continue}if(n=this.tokenizer.link(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(n.raw.length),o=t[t.length-1],o&&n.type==="text"&&o.type==="text"?(o.raw+=n.raw,o.text+=n.text):t.push(n);continue}if(n=this.tokenizer.emStrong(e,r,c)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.codespan(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.br(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.del(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.autolink(e)){e=e.substring(n.raw.length),t.push(n);continue}if(!this.state.inLink&&(n=this.tokenizer.url(e))){e=e.substring(n.raw.length),t.push(n);continue}if(a=e,this.options.extensions&&this.options.extensions.startInline){let p=1/0;const m=e.slice(1);let u;this.options.extensions.startInline.forEach(f=>{u=f.call({lexer:this},m),typeof u=="number"&&u>=0&&(p=Math.min(p,u))}),p<1/0&&p>=0&&(a=e.substring(0,p+1))}if(n=this.tokenizer.inlineText(a)){e=e.substring(n.raw.length),n.raw.slice(-1)!=="_"&&(c=n.raw.slice(-1)),i=!0,o=t[t.length-1],o&&o.type==="text"?(o.raw+=n.raw,o.text+=n.text):t.push(n);continue}if(e){const p="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(p);break}else throw new Error(p)}}return t}}class yn{constructor(e){de(this,"options");this.options=e||yt}code(e,t,n){var a;const o=(a=(t||"").match(/^\S*/))==null?void 0:a[0];return e=e.replace(/\n$/,"")+`
`,o?'<pre><code class="language-'+Pe(o)+'">'+(n?e:Pe(e,!0))+`</code></pre>
`:"<pre><code>"+(n?e:Pe(e,!0))+`</code></pre>
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
`}strong(e){return`<strong>${e}</strong>`}em(e){return`<em>${e}</em>`}codespan(e){return`<code>${e}</code>`}br(){return"<br>"}del(e){return`<del>${e}</del>`}link(e,t,n){const o=po(e);if(o===null)return n;e=o;let a='<a href="'+e+'"';return t&&(a+=' title="'+t+'"'),a+=">"+n+"</a>",a}image(e,t,n){const o=po(e);if(o===null)return n;e=o;let a=`<img src="${e}" alt="${n}"`;return t&&(a+=` title="${t}"`),a+=">",a}text(e){return e}}class vs{strong(e){return e}em(e){return e}codespan(e){return e}del(e){return e}html(e){return e}text(e){return e}link(e,t,n){return""+n}image(e,t,n){return""+n}br(){return""}}class et{constructor(e){de(this,"options");de(this,"renderer");de(this,"textRenderer");this.options=e||yt,this.options.renderer=this.options.renderer||new yn,this.renderer=this.options.renderer,this.renderer.options=this.options,this.textRenderer=new vs}static parse(e,t){return new et(t).parse(e)}static parseInline(e,t){return new et(t).parseInline(e)}parse(e,t=!0){let n="";for(let o=0;o<e.length;o++){const a=e[o];if(this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[a.type]){const r=a,l=this.options.extensions.renderers[r.type].call({parser:this},r);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(r.type)){n+=l||"";continue}}switch(a.type){case"space":continue;case"hr":{n+=this.renderer.hr();continue}case"heading":{const r=a;n+=this.renderer.heading(this.parseInline(r.tokens),r.depth,wr(this.parseInline(r.tokens,this.textRenderer)));continue}case"code":{const r=a;n+=this.renderer.code(r.text,r.lang,!!r.escaped);continue}case"table":{const r=a;let l="",i="";for(let p=0;p<r.header.length;p++)i+=this.renderer.tablecell(this.parseInline(r.header[p].tokens),{header:!0,align:r.align[p]});l+=this.renderer.tablerow(i);let c="";for(let p=0;p<r.rows.length;p++){const m=r.rows[p];i="";for(let u=0;u<m.length;u++)i+=this.renderer.tablecell(this.parseInline(m[u].tokens),{header:!1,align:r.align[u]});c+=this.renderer.tablerow(i)}n+=this.renderer.table(l,c);continue}case"blockquote":{const r=a,l=this.parse(r.tokens);n+=this.renderer.blockquote(l);continue}case"list":{const r=a,l=r.ordered,i=r.start,c=r.loose;let p="";for(let m=0;m<r.items.length;m++){const u=r.items[m],f=u.checked,x=u.task;let w="";if(u.task){const h=this.renderer.checkbox(!!f);c?u.tokens.length>0&&u.tokens[0].type==="paragraph"?(u.tokens[0].text=h+" "+u.tokens[0].text,u.tokens[0].tokens&&u.tokens[0].tokens.length>0&&u.tokens[0].tokens[0].type==="text"&&(u.tokens[0].tokens[0].text=h+" "+u.tokens[0].tokens[0].text)):u.tokens.unshift({type:"text",text:h+" "}):w+=h+" "}w+=this.parse(u.tokens,c),p+=this.renderer.listitem(w,x,!!f)}n+=this.renderer.list(p,l,i);continue}case"html":{const r=a;n+=this.renderer.html(r.text,r.block);continue}case"paragraph":{const r=a;n+=this.renderer.paragraph(this.parseInline(r.tokens));continue}case"text":{let r=a,l=r.tokens?this.parseInline(r.tokens):r.text;for(;o+1<e.length&&e[o+1].type==="text";)r=e[++o],l+=`
`+(r.tokens?this.parseInline(r.tokens):r.text);n+=t?this.renderer.paragraph(l):l;continue}default:{const r='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(r),"";throw new Error(r)}}}return n}parseInline(e,t){t=t||this.renderer;let n="";for(let o=0;o<e.length;o++){const a=e[o];if(this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[a.type]){const r=this.options.extensions.renderers[a.type].call({parser:this},a);if(r!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(a.type)){n+=r||"";continue}}switch(a.type){case"escape":{const r=a;n+=t.text(r.text);break}case"html":{const r=a;n+=t.html(r.text);break}case"link":{const r=a;n+=t.link(r.href,r.title,this.parseInline(r.tokens,t));break}case"image":{const r=a;n+=t.image(r.href,r.title,r.text);break}case"strong":{const r=a;n+=t.strong(this.parseInline(r.tokens,t));break}case"em":{const r=a;n+=t.em(this.parseInline(r.tokens,t));break}case"codespan":{const r=a;n+=t.codespan(r.text);break}case"br":{n+=t.br();break}case"del":{const r=a;n+=t.del(this.parseInline(r.tokens,t));break}case"text":{const r=a;n+=t.text(r.text);break}default:{const r='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(r),"";throw new Error(r)}}}return n}}class Ft{constructor(e){de(this,"options");this.options=e||yt}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}}de(Ft,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens"]));var xt,as,Fo;class Zr{constructor(...e){Gs(this,xt);de(this,"defaults",gs());de(this,"options",this.setOptions);de(this,"parse",sn(this,xt,as).call(this,Qe.lex,et.parse));de(this,"parseInline",sn(this,xt,as).call(this,Qe.lexInline,et.parseInline));de(this,"Parser",et);de(this,"Renderer",yn);de(this,"TextRenderer",vs);de(this,"Lexer",Qe);de(this,"Tokenizer",hn);de(this,"Hooks",Ft);this.use(...e)}walkTokens(e,t){var o,a;let n=[];for(const r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{const l=r;for(const i of l.header)n=n.concat(this.walkTokens(i.tokens,t));for(const i of l.rows)for(const c of i)n=n.concat(this.walkTokens(c.tokens,t));break}case"list":{const l=r;n=n.concat(this.walkTokens(l.items,t));break}default:{const l=r;(a=(o=this.defaults.extensions)==null?void 0:o.childTokens)!=null&&a[l.type]?this.defaults.extensions.childTokens[l.type].forEach(i=>{const c=l[i].flat(1/0);n=n.concat(this.walkTokens(c,t))}):l.tokens&&(n=n.concat(this.walkTokens(l.tokens,t)))}}return n}use(...e){const t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{const o={...n};if(o.async=this.defaults.async||o.async||!1,n.extensions&&(n.extensions.forEach(a=>{if(!a.name)throw new Error("extension name required");if("renderer"in a){const r=t.renderers[a.name];r?t.renderers[a.name]=function(...l){let i=a.renderer.apply(this,l);return i===!1&&(i=r.apply(this,l)),i}:t.renderers[a.name]=a.renderer}if("tokenizer"in a){if(!a.level||a.level!=="block"&&a.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");const r=t[a.level];r?r.unshift(a.tokenizer):t[a.level]=[a.tokenizer],a.start&&(a.level==="block"?t.startBlock?t.startBlock.push(a.start):t.startBlock=[a.start]:a.level==="inline"&&(t.startInline?t.startInline.push(a.start):t.startInline=[a.start]))}"childTokens"in a&&a.childTokens&&(t.childTokens[a.name]=a.childTokens)}),o.extensions=t),n.renderer){const a=this.defaults.renderer||new yn(this.defaults);for(const r in n.renderer){if(!(r in a))throw new Error(`renderer '${r}' does not exist`);if(r==="options")continue;const l=r,i=n.renderer[l],c=a[l];a[l]=(...p)=>{let m=i.apply(a,p);return m===!1&&(m=c.apply(a,p)),m||""}}o.renderer=a}if(n.tokenizer){const a=this.defaults.tokenizer||new hn(this.defaults);for(const r in n.tokenizer){if(!(r in a))throw new Error(`tokenizer '${r}' does not exist`);if(["options","rules","lexer"].includes(r))continue;const l=r,i=n.tokenizer[l],c=a[l];a[l]=(...p)=>{let m=i.apply(a,p);return m===!1&&(m=c.apply(a,p)),m}}o.tokenizer=a}if(n.hooks){const a=this.defaults.hooks||new Ft;for(const r in n.hooks){if(!(r in a))throw new Error(`hook '${r}' does not exist`);if(r==="options")continue;const l=r,i=n.hooks[l],c=a[l];Ft.passThroughHooks.has(r)?a[l]=p=>{if(this.defaults.async)return Promise.resolve(i.call(a,p)).then(u=>c.call(a,u));const m=i.call(a,p);return c.call(a,m)}:a[l]=(...p)=>{let m=i.apply(a,p);return m===!1&&(m=c.apply(a,p)),m}}o.hooks=a}if(n.walkTokens){const a=this.defaults.walkTokens,r=n.walkTokens;o.walkTokens=function(l){let i=[];return i.push(r.call(this,l)),a&&(i=i.concat(a.call(this,l))),i}}this.defaults={...this.defaults,...o}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Qe.lex(e,t??this.defaults)}parser(e,t){return et.parse(e,t??this.defaults)}}xt=new WeakSet,as=function(e,t){return(n,o)=>{const a={...o},r={...this.defaults,...a};this.defaults.async===!0&&a.async===!1&&(r.silent||console.warn("marked(): The async option was set to true by an extension. The async: false option sent to parse will be ignored."),r.async=!0);const l=sn(this,xt,Fo).call(this,!!r.silent,!!r.async);if(typeof n>"u"||n===null)return l(new Error("marked(): input parameter is undefined or null"));if(typeof n!="string")return l(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(n)+", string expected"));if(r.hooks&&(r.hooks.options=r),r.async)return Promise.resolve(r.hooks?r.hooks.preprocess(n):n).then(i=>e(i,r)).then(i=>r.hooks?r.hooks.processAllTokens(i):i).then(i=>r.walkTokens?Promise.all(this.walkTokens(i,r.walkTokens)).then(()=>i):i).then(i=>t(i,r)).then(i=>r.hooks?r.hooks.postprocess(i):i).catch(l);try{r.hooks&&(n=r.hooks.preprocess(n));let i=e(n,r);r.hooks&&(i=r.hooks.processAllTokens(i)),r.walkTokens&&this.walkTokens(i,r.walkTokens);let c=t(i,r);return r.hooks&&(c=r.hooks.postprocess(c)),c}catch(i){return l(i)}}},Fo=function(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){const o="<p>An error occurred:</p><pre>"+Pe(n.message+"",!0)+"</pre>";return t?Promise.resolve(o):o}if(t)return Promise.reject(n);throw n}};const mt=new Zr;function ie(s,e){return mt.parse(s,e)}ie.options=ie.setOptions=function(s){return mt.setOptions(s),ie.defaults=mt.defaults,No(ie.defaults),ie};ie.getDefaults=gs;ie.defaults=yt;ie.use=function(...s){return mt.use(...s),ie.defaults=mt.defaults,No(ie.defaults),ie};ie.walkTokens=function(s,e){return mt.walkTokens(s,e)};ie.parseInline=mt.parseInline;ie.Parser=et;ie.parser=et.parse;ie.Renderer=yn;ie.TextRenderer=vs;ie.Lexer=Qe;ie.lexer=Qe.lex;ie.Tokenizer=hn;ie.Hooks=Ft;ie.parse=ie;ie.options;ie.setOptions;ie.use;ie.walkTokens;ie.parseInline;et.parse;Qe.lex;const gt=new ie.Renderer,Xr=gt.link.bind(gt);gt.code=(s,e)=>{const t=e||"";if(t==="mermaid"){const o=s.split(`
`);let a='<div class="flex flex-col items-center gap-4 bg-slate-950 p-6 rounded-lg border border-slate-800/80 my-4 select-none">';const r=new Map,l=[];if(o.forEach(i=>{const c=i.trim();if(!c)return;const p=c.match(/^([A-Za-z0-9_-]+)\[(.*?)\]$/);if(p){r.set(p[1],p[2]);return}const m=c.match(/^([A-Za-z0-9_-]+)\s*-->\s*(?:\|(.*?)\|)?\s*([A-Za-z0-9_-]+)$/);if(m){const u=m[1],f=m[2]||"",x=m[3];l.push({from:u,to:x,label:f}),r.has(u)||r.set(u,u),r.has(x)||r.set(x,x)}}),r.size>0){a+='<div class="space-y-4 w-full flex flex-col items-center">';const i=new Set(l.map(u=>u.to)),c=Array.from(r.keys()).filter(u=>!i.has(u)),p=Array.from(r.keys()).filter(u=>i.has(u)),m=u=>{const f=r.get(u)||u;return`<div class="px-4 py-2 bg-teal-950/40 text-teal-400 border border-teal-800 rounded font-mono text-xs shadow-[0_0_10px_rgba(20,184,166,0.15)]">${I(f)}</div>`};return c.length>0&&(a+='<div class="flex flex-wrap gap-4 justify-center">',a+=c.map(m).join(""),a+="</div>"),l.length>0&&(a+='<div class="text-slate-650 text-xs">↓</div>'),p.length>0&&(a+='<div class="flex flex-wrap gap-4 justify-center">',a+=p.map(m).join(""),a+="</div>"),a+="</div></div>",a}}if(t==="gantt"||t==="timeline"){const o=s.split(`
`);let a='<div class="bg-slate-950 p-5 rounded-lg border border-slate-800 my-4 space-y-3 font-mono text-xs select-none">';return a+='<div class="text-[10px] font-bold text-teal-400 uppercase tracking-widest border-b border-slate-800 pb-2 flex items-center justify-between"><span>📅 Operational Timeline & Milestones</span></div>',a+='<div class="space-y-2 pt-1">',o.forEach(r=>{const l=r.trim();if(!l)return;const i=l.split("|");let c="",p=l,m="Pending";i.length>=2&&(c=i[0].trim(),p=i[1].trim(),m=i[2]?i[2].trim():"Pending");let u="bg-slate-900 text-slate-400 border-slate-800";const f=m.toLowerCase();f.includes("complete")?u="bg-emerald-950/60 text-emerald-400 border-emerald-800":f.includes("progress")?u="bg-teal-950/60 text-teal-400 border-teal-800":f.includes("delay")?u="bg-amber-950/60 text-amber-400 border-amber-800":f.includes("critical")&&(u="bg-red-950/60 text-red-400 border-red-800"),a+=`
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2.5 bg-slate-900/40 border border-slate-850 rounded-lg">
          <div class="flex items-center gap-3">
            <span class="w-2 h-2 rounded-full bg-teal-400 shrink-0"></span>
            <span class="font-bold text-slate-200">${I(p)}</span>
          </div>
          <div class="flex items-center gap-3 shrink-0">
            ${c?`<span class="text-[10px] text-slate-400 font-mono">${I(c)}</span>`:""}
            <span class="px-2 py-0.5 border rounded text-[9px] uppercase font-bold ${u}">${I(m)}</span>
          </div>
        </div>
      `}),a+="</div></div>",a}if(t==="risk-matrix"){const o=s.split(`
`),a=[];o.forEach(l=>{const i=l.trim();if(!i)return;let c=1,p=1,m="Risk Item",u="Medium";i.split("|").forEach(f=>{const[x,w]=f.split(":").map(h=>h.trim());if(x&&w){const h=x.toLowerCase();h.includes("like")?c=Math.min(5,Math.max(1,parseInt(w,10)||1)):h.includes("imp")?p=Math.min(5,Math.max(1,parseInt(w,10)||1)):h.includes("title")?m=w:h.includes("status")&&(u=w)}}),a.push({l:c,i:p,title:m,status:u})});let r='<div class="bg-slate-950 p-5 rounded-lg border border-slate-800 my-4 select-none font-mono text-xs">';r+='<div class="text-[10px] font-bold text-teal-400 uppercase tracking-widest border-b border-slate-800 pb-3 mb-4 flex items-center justify-between"><span>🎯 5x5 Tactical Risk & Threat Heatmap</span><span class="text-[9px] text-slate-400">Likelihood vs Impact</span></div>',r+='<div class="grid grid-cols-6 gap-1.5 text-center text-[10px] font-mono">',r+='<div class="p-1 font-bold text-slate-400">I \\ L</div>';for(let l=1;l<=5;l++)r+=`<div class="p-1 font-bold text-slate-300">L${l}</div>`;for(let l=5;l>=1;l--){r+=`<div class="p-1 font-bold text-slate-300 flex items-center justify-center">I${l}</div>`;for(let i=1;i<=5;i++){const c=l*i;let p="bg-emerald-950/20 border-emerald-900/30 text-emerald-400";c>=15?p="bg-red-950/50 border-red-900/50 text-red-400 font-bold":c>=9?p="bg-amber-950/40 border-amber-900/40 text-amber-400":c>=5&&(p="bg-teal-950/30 border-teal-900/30 text-teal-400");const u=a.filter(f=>f.l===i&&f.i===l).map(f=>`<div class="truncate px-1 py-0.5 bg-slate-900/90 rounded text-[9px] border border-slate-700 my-0.5" title="${I(f.title)} (${I(f.status)})">${I(f.title)}</div>`).join("");r+=`
          <div class="min-h-[44px] p-1 border rounded flex flex-col justify-center items-center ${p}">
            <span class="text-[8px] opacity-40 mb-0.5">${c}</span>
            ${u}
          </div>
        `}}return r+="</div></div>",r}if(t==="runbook"||t==="incident"){const o=s.split(`
`);let a='<div class="bg-slate-950 p-5 rounded-lg border border-slate-800 my-4 space-y-3 font-mono text-xs select-none">';return a+='<div class="text-[10px] font-bold text-teal-400 uppercase tracking-widest border-b border-slate-800 pb-2 flex items-center justify-between"><span>🚨 Executable Incident Response Runbook</span><span class="text-[9px] text-slate-400">Step Checklist</span></div>',a+='<div class="space-y-2 pt-1">',o.forEach((r,l)=>{const i=r.trim();if(!i)return;const c=i.split("|");let p=`Step ${l+1}`,m=i,u="Pending";c.length>=2&&(p=c[0].trim(),m=c[1].trim(),u=c[2]?c[2].trim():"Pending");let f="bg-slate-900 text-slate-400 border-slate-800";const x=u.toLowerCase();x.includes("complete")||x.includes("done")?f="bg-emerald-950/60 text-emerald-400 border-emerald-800":x.includes("progress")||x.includes("active")?f="bg-teal-950/60 text-teal-400 border-teal-800":(x.includes("fail")||x.includes("block"))&&(f="bg-red-950/60 text-red-400 border-red-800");const w=x.includes("complete")||x.includes("done");a+=`
        <div class="flex items-center justify-between gap-3 p-2.5 bg-slate-900/40 border border-slate-850 rounded-lg">
          <div class="flex items-center gap-3">
            <input type="checkbox" ${w?"checked":""} class="w-4 h-4 rounded border-slate-700 bg-slate-950 text-teal-500 cursor-pointer">
            <span class="text-[10px] text-teal-400 font-bold">${I(p)}:</span>
            <span class="font-bold text-slate-200">${I(m)}</span>
          </div>
          <span class="px-2 py-0.5 border rounded text-[9px] uppercase font-bold shrink-0 ${f}">${I(u)}</span>
        </div>
      `}),a+="</div></div>",a}if(t==="intel-summary"){const o=s.split(`
`),a=[];o.forEach(l=>{const i=l.trim();i&&i.split("|").forEach(c=>{const[p,m]=c.split(":").map(u=>u.trim());p&&m&&a.push({label:p,value:m})})});let r='<div class="bg-slate-950 p-5 rounded-lg border border-slate-800 my-4 select-none font-mono text-xs">';return r+='<div class="text-[10px] font-bold text-teal-400 uppercase tracking-widest border-b border-slate-800 pb-3 mb-4 flex items-center justify-between"><span>📊 Executive Intelligence Summary Dashboard</span></div>',r+='<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">',a.forEach(l=>{let i="text-slate-200";const c=l.value.toUpperCase();c.includes("CRITICAL")||c.includes("HIGH")?i="text-red-400 font-bold":c.includes("SECRET")||c.includes("CONFIDENTIAL")?i="text-amber-400 font-bold":(c.includes("CONTAINED")||c.includes("CLEARED")||c.includes("OK"))&&(i="text-emerald-400 font-bold"),r+=`
        <div class="bg-slate-900/60 border border-slate-800 p-3 rounded-lg flex flex-col justify-between">
          <span class="text-[9px] text-slate-400 uppercase font-bold mb-1">${I(l.label)}</span>
          <span class="text-sm font-extrabold ${i} break-words">${I(l.value)}</span>
        </div>
      `}),r+="</div></div>",r}let n=s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;");if(t){const o=/\b(const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|import|export|class|extends|new|try|catch|finally|throw|def|print|elif|in|is|not|and|or|lambda|as|with|pass|public|private|protected|static|void|int|string|boolean|select|from|where|insert|update|delete|create|table|drop|values|into|join|on|group|by|order|true|false|null|None)\b/g,a=/(["'`])(.*?)\1/g,r=/(\/\/.*|#.*)/g;n=n.replace(r,'<span class="text-slate-500">$1</span>'),n=n.replace(a,'<span class="text-amber-400">$0</span>'),n=n.replace(o,'<span class="text-teal-400 font-bold">$1</span>')}return`<pre class="bg-slate-950 p-4 rounded-lg overflow-x-auto border border-slate-800/80 my-4 text-xs font-mono"><code class="language-${t}">${n}</code></pre>`};gt.link=(s,e,t)=>Xr(s,e,t).replace("<a ",'<a target="_blank" rel="noopener noreferrer" class="text-teal-400 hover:underline" ');gt.heading=(s,e)=>{const t=s.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");return`<h${e} id="${t}">${s}</h${e}>`};gt.table=(s,e)=>`<div class="overflow-x-auto my-4 max-w-full"><table class="w-full">${s}${e}</table></div>`;ie.setOptions({renderer:gt,gfm:!0,breaks:!0});function Wo(){try{return parseInt(localStorage.getItem("secops-sanitize-count")||"0",10)}catch{return 0}}function qo(){try{const s=Wo();localStorage.setItem("secops-sanitize-count",(s+1).toString())}catch{}}function Ct(s){qo();const e=ie.parse(s);zt.addHook("uponSanitizeElement",n=>{if(n instanceof Element){const o=n.tagName.toLowerCase();if(o==="video"||o==="audio"||o==="iframe"||o==="source"||o==="img"){const a=n.getAttribute("src");if(a){const r=a.trim().toLowerCase();r.startsWith("data:")||r.startsWith("blob:")||r.startsWith("attachment:")||r.startsWith("/")||r.startsWith("./")||r.startsWith("../")||(n.setAttribute("src","#"),console.warn("SECURITY BLOCK: Prevented connection to remote source URL:",a))}o==="iframe"&&n.setAttribute("sandbox","allow-scripts")}}});const t=zt.sanitize(e,{ALLOWED_TAGS:["h1","h2","h3","h4","h5","h6","p","br","hr","a","span","ul","ol","li","strong","em","code","pre","blockquote","table","thead","tbody","tr","th","td","div","img","input","video","audio","iframe","source"],ALLOWED_ATTR:["href","target","rel","class","id","align","src","alt","type","checked","disabled","controls","sandbox","width","height"]});return zt.removeHook("uponSanitizeElement"),t}function dn(s){return s.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F\u200B-\u200D\uFEFF\u202A-\u202E]/g,"")}function I(s){return s.replace(/[&<>"']/g,e=>{switch(e){case"&":return"&amp;";case"<":return"&lt;";case">":return"&gt;";case'"':return"&quot;";case"'":return"&#039;";default:return e}})}function Jr(s){if(qo(),typeof s!="object"||s===null)throw new Error("Invalid backup structure: Root must be an object.");const{slug:e,title:t,content:n,updatedAt:o,tags:a}=s;if(typeof e!="string"||!/^[a-z0-9-_]+$/.test(e))throw new Error("Invalid slug format: Slugs must contain only lowercase alphanumeric characters, hyphens, and underscores.");const r=dn(e);if(typeof t!="string"||t.trim().length===0||t.length>100)throw new Error("Invalid title format: Must be a non-empty string under 100 characters.");const l=dn(t);if(typeof n!="string"||n.length>5e4)throw new Error("Invalid content format: Must be a string under 50,000 characters.");if(typeof o!="number"||isNaN(o))throw new Error("Invalid updated timestamp format.");if(!Array.isArray(a))throw new Error("Tags must be an array of strings.");const i=a.map(c=>{if(typeof c!="string")throw new Error("Tags must be strings.");return dn(zt.sanitize(c)).slice(0,30)});return{slug:r,title:zt.sanitize(l),content:n,updatedAt:o,tags:i,isSystem:!!s.isSystem}}async function Ae(s){const e=new TextEncoder,t=e.encode("secops-intel-salt-2026"),n=await window.crypto.subtle.importKey("raw",e.encode(s),{name:"PBKDF2"},!1,["deriveKey"]);return window.crypto.subtle.deriveKey({name:"PBKDF2",salt:t,iterations:1e5,hash:"SHA-256"},n,{name:"AES-GCM",length:256},!1,["encrypt","decrypt"])}async function at(s,e){const t=new TextEncoder,n=window.crypto.getRandomValues(new Uint8Array(12)),o=await window.crypto.subtle.encrypt({name:"AES-GCM",iv:n},e,t.encode(s)),a=Array.from(n).map(c=>c.toString(16).padStart(2,"0")).join(""),r=new Uint8Array(o);let l="";for(let c=0;c<r.byteLength;c++)l+=String.fromCharCode(r[c]);const i=btoa(l);return`${a}:${i}`}async function Ee(s,e){const t=s.split(":");if(t.length!==2)throw new Error("Invalid cipher format");const[n,o]=t,a=new Uint8Array(n.match(/.{1,2}/g).map(c=>parseInt(c,16))),r=atob(o),l=new Uint8Array(r.length);for(let c=0;c<r.length;c++)l[c]=r.charCodeAt(c);const i=await window.crypto.subtle.decrypt({name:"AES-GCM",iv:a},e,l);return new TextDecoder().decode(i)}async function tt(s){const e=`${s.slug}|${s.title}|${s.content}|${s.updatedAt}|${s.tags.join(",")}|secops-integrity-salt-2026`,t=new TextEncoder().encode(e),n=await crypto.subtle.digest("SHA-256",t);return Array.from(new Uint8Array(n)).map(a=>a.toString(16).padStart(2,"0")).join("")}let ee="home",ot=!1,je=!1,Ge="",Mt="",me=[],jt=null,Go=navigator.onLine?"SECURE_LINK":"OFFLINE_CACHE",ft=localStorage.getItem("secops-wiki-theme")||(window.matchMedia&&window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark");window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",s=>{localStorage.getItem("secops-wiki-theme")||(ft=s.matches?"dark":"light",Ts())});let ct=localStorage.getItem("secops-wiki-mask-encrypted")==="true",ln=localStorage.getItem("secops-wiki-split-screen")!=="false",pn={},ye=null;async function pe(s,e){const t={id:`${Date.now()}-${Math.random().toString(36).substring(2,11)}`,timestamp:Date.now(),event:s,details:e};await Ba(t)}async function Ve(s){const e=await Ca(s);if(!e)return null;if(e.isEncryptedAtRest&&e.encryptedData){if(!ye)return{slug:e.slug,title:"[DATABASE LOCKED]",content:"Master passphrase required to unlock this database record.",tags:[],isSystem:e.isSystem,isEncrypted:!1,updatedAt:e.updatedAt};try{const t=await Ee(e.encryptedData,ye),n=JSON.parse(t);return{slug:e.slug,title:n.title,content:n.content,tags:n.tags,isSystem:e.isSystem,isEncrypted:n.isEncrypted,signature:n.signature,updatedAt:n.updatedAt}}catch(t){return console.error("Failed to decrypt page at rest:",t),null}}return e}async function _e(s){if(localStorage.getItem("secops-wiki-db-encrypted")==="true"&&ye){const t={title:s.title,content:s.content,tags:s.tags,isEncrypted:s.isEncrypted,signature:s.signature,updatedAt:s.updatedAt},n=await at(JSON.stringify(t),ye),o={slug:s.slug,title:"[REDACTED AT REST]",content:"[REDACTED AT REST]",tags:[],isSystem:s.isSystem,isEncryptedAtRest:!0,encryptedData:n,updatedAt:s.updatedAt};await gn(o)}else await gn(s);localStorage.setItem("secops-wiki-last-update",Date.now().toString())}async function Rt(){const s=await Vt(),e=[];for(const t of s){const n=await Ve(t.slug);n&&e.push(n)}return e}async function Es(){try{const s=await ms();pn={},s.forEach(e=>{pn[e.tag]=e.color})}catch{pn={}}}function Qr(s){const e=pn[s]||"slate";let t="bg-slate-950/20 text-slate-400 border-slate-900/30";return e==="emerald"?t="bg-emerald-950/20 text-emerald-400 border-emerald-900/30":e==="blue"?t="bg-blue-950/20 text-blue-400 border-blue-900/30":e==="red"?t="bg-red-950/20 text-red-400 border-red-900/30":e==="amber"&&(t="bg-amber-950/20 text-amber-400 border-amber-900/30"),`
    <span class="text-[10px] font-mono px-2 py-0.5 rounded border ${t}">#${I(s)}</span>
  `}function ei(s){const e=me.filter(r=>r.slug!==ee);if(e.length===0)return;e.sort((r,l)=>l.title.length-r.title.length);const t=r=>r.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"),n=[],o=document.createTreeWalker(s,NodeFilter.SHOW_TEXT,{acceptNode:r=>{let l=r.parentElement;for(;l&&l!==s;){const i=l.tagName.toLowerCase();if(i==="a"||i==="code"||i==="pre")return NodeFilter.FILTER_REJECT;l=l.parentElement}return NodeFilter.FILTER_ACCEPT}});let a=o.nextNode();for(;a;)n.push(a),a=o.nextNode();for(const r of n){const l=r.parentNode;if(!l)continue;let i=r.nodeValue||"";for(const c of e){if(c.isEncrypted&&!Y&&ct)continue;const m=t(c.title),u=t(c.slug),x=new RegExp(`\\b(${m}|${u})\\b`,"i").exec(i);if(x){const w=x[0],h=x.index,R=i.substring(0,h),M=i.substring(h+w.length),E=document.createTextNode(R),v=document.createElement("a");v.href=`#/page/${c.slug}`,v.className="autolink text-teal-400 hover:text-teal-350 underline decoration-dotted transition",v.textContent=w;const L=document.createTextNode(M);l.insertBefore(E,r),l.insertBefore(v,r),l.insertBefore(L,r),l.removeChild(r);break}}}}function ti(s){if(!s||s==="system"||s==="graph")return;let e=[];try{e=JSON.parse(sessionStorage.getItem("secops-wiki-breadcrumbs")||"[]")}catch{}Array.isArray(e)||(e=[]),e=e.filter(t=>t!==s),e.unshift(s),e.length>5&&(e=e.slice(0,5)),sessionStorage.setItem("secops-wiki-breadcrumbs",JSON.stringify(e))}function ni(s){const e=me.find(n=>n.slug===s);return e?e.isEncrypted&&!Y&&ct?"[REDACTED CORE]":e.title:s}let Y=null,qn=!1,ze=0,un=!1,fn=-1,rs="";function si(){return parseInt(localStorage.getItem("secops-decrypt-failed-attempts")||"0",10)}function Vo(s){localStorage.setItem("secops-decrypt-failed-attempts",s.toString())}function is(){return parseInt(localStorage.getItem("secops-decrypt-lockout-until")||"0",10)}function ks(s){localStorage.setItem("secops-decrypt-lockout-until",s.toString())}function ls(){return Date.now()<is()}function oi(){const s=si()+1;if(Vo(s),s>=3){const e=3e5*Math.pow(2,s-3);ks(Date.now()+e)}}function ai(){Vo(0),ks(0)}let Gn=null;function Ss(){Gn&&clearTimeout(Gn);const s=parseInt(localStorage.getItem("secops-wiki-session-timeout")||"15",10);s!==0&&(Gn=setTimeout(()=>{Y&&(Y=null,alert(`SECURITY TIMEOUT: Session idle for ${s} minutes. Passphrase keys wiped from memory.`),window.location.hash.startsWith("#/page/")?window.location.hash="#/page/home":ue())},s*60*1e3))}["mousedown","mousemove","keydown","scroll","touchstart"].forEach(s=>{window.addEventListener(s,Ss,{passive:!0})});Ss();let ut=null;document.addEventListener("copy",()=>{var e;document.body.classList.contains("encrypted-page-active")?(e=window.getSelection())!=null&&e.toString()&&Ko():ut&&(clearTimeout(ut),ut=null)});function Ko(){ut&&clearTimeout(ut),ut=setTimeout(async()=>{try{await navigator.clipboard.writeText("[SECURE WIPE: Decrypted secret cleared from clipboard]"),ri(),await pe("CLIPBOARD_WIPE","Automatically cleared decrypted secret from clipboard.")}catch(s){console.warn("Clipboard wipe failed:",s)}ut=null},3e4)}function ri(){const s=document.getElementById("clipboard-wipe-toast");s&&s.remove();const e=document.createElement("div");e.id="clipboard-wipe-toast",e.className="fixed bottom-4 left-4 z-50 glass-panel border border-red-500/30 p-3 rounded-xl shadow-xl font-mono text-[10px] text-red-400 select-none animate-fade-in",e.innerHTML="⚠️ SECURITY WIPE: Decrypted secret cleared from clipboard.",document.body.appendChild(e),setTimeout(()=>{e.classList.add("opacity-0","transition-opacity","duration-500"),setTimeout(()=>e.remove(),500)},3e3)}function Yo(s){if(s.length<8)return{valid:!1,message:"Password must be at least 8 characters long."};let e=!1,t=!1,n=!1,o=!1;const a=/[!@#$%^&*(),.?":{}|<>_+\\-]/;for(const r of s)r>="A"&&r<="Z"?e=!0:r>="a"&&r<="z"?t=!0:r>="0"&&r<="9"?n=!0:a.test(r)&&(o=!0);return!e||!t||!n||!o?{valid:!1,message:"Password must include uppercase, lowercase, numbers, and special symbols (!@#$%^&*, etc.)."}:{valid:!0,message:""}}function go(){Y&&(Y=null,alert("QUICK LOCK: In-memory session keys cleared. Documents locked."),window.location.hash="#/page/home",ue())}let cn=0,Vn=null;window.addEventListener("keydown",s=>{s.key==="Escape"&&(cn++,Vn&&clearTimeout(Vn),cn>=3?(cn=0,go()):Vn=setTimeout(()=>{cn=0},1e3)),s.ctrlKey&&s.shiftKey&&s.key.toLowerCase()==="l"&&(s.preventDefault(),go())});function Ts(){const s=document.documentElement,e=document.getElementById("theme-icon-path");ft==="light"?(s.classList.add("light-theme"),e&&e.setAttribute("d","M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z")):(s.classList.remove("light-theme"),e&&e.setAttribute("d","M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z"))}function Zo(){ft=ft==="dark"?"light":"dark",localStorage.setItem("secops-wiki-theme",ft),Ts()}function ii(s,e){if(!e||e.trim().length===0)return s;const t=e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"),n=new RegExp(`(?![^<>]*>)(${t})`,"gi");return s.replace(n,'<mark class="bg-teal-500/30 text-teal-300 px-0.5 rounded font-medium">$1</mark>')}function li(s){const e=s.toLowerCase().trim();return/(sec|security|critical|panic|destruct|lock|key|auth)/.test(e)?{bg:"rgba(239, 68, 68, 0.15)",text:"#f87171",border:"rgba(239, 68, 68, 0.3)",className:"tag-color-red"}:/(doc|manual|wiki|guide|system|dashboard|home)/.test(e)?{bg:"rgba(20, 184, 166, 0.15)",text:"#2dd4bf",border:"rgba(20, 184, 166, 0.3)",className:"tag-color-teal"}:/(config|settings|sys|admin|db|telemetry)/.test(e)?{bg:"rgba(59, 130, 246, 0.15)",text:"#60a5fa",border:"rgba(59, 130, 246, 0.3)",className:"tag-color-blue"}:/(warning|caution|issue|bug|fix)/.test(e)?{bg:"rgba(245, 158, 11, 0.15)",text:"#fbbf24",border:"rgba(245, 158, 11, 0.3)",className:"tag-color-amber"}:{bg:"rgba(148, 163, 184, 0.15)",text:"#cbd5e1",border:"rgba(148, 163, 184, 0.3)",className:"tag-color-slate"}}function Xo(s,e){const t=e.toLowerCase().trim();if(!t)return 0;let n=0;const o=s.title.toLowerCase(),a=s.content.toLowerCase(),r=s.tags.map(l=>l.toLowerCase());if(o===t?n+=100:o.startsWith(t)?n+=80:o.includes(t)&&(n+=50),r.forEach(l=>{l===t?n+=30:l.includes(t)&&(n+=15)}),a.includes(t)){n+=10;const l=a.split(t).length-1;n+=Math.min(10,l)}return n}function bo(s){const e=new Uint32Array(256);for(let n=0;n<256;n++){let o=n;for(let a=0;a<8;a++)o=o&1?3988292384^o>>>1:o>>>1;e[n]=o}let t=4294967295;for(let n=0;n<s.length;n++)t=e[(t^s[n])&255]^t>>>8;return(t^4294967295)>>>0}function Jo(s){const e=new TextEncoder,t=[],n=[];let o=0;s.forEach(c=>{n.push(o);const p=e.encode(c.name),m=e.encode(c.content),u=bo(m),f=new ArrayBuffer(30),x=new DataView(f);x.setUint32(0,67324752,!0),x.setUint16(4,10,!0),x.setUint16(6,0,!0),x.setUint16(8,0,!0),x.setUint16(10,0,!0),x.setUint16(12,0,!0),x.setUint32(14,u,!0),x.setUint32(18,m.length,!0),x.setUint32(22,m.length,!0),x.setUint16(26,p.length,!0),x.setUint16(28,0,!0);const w=new Uint8Array(f);t.push(w),t.push(p),t.push(m),o+=w.length+p.length+m.length});const a=o;let r=0;s.forEach((c,p)=>{const m=e.encode(c.name),u=e.encode(c.content),f=bo(u),x=n[p],w=new ArrayBuffer(46),h=new DataView(w);h.setUint32(0,33639248,!0),h.setUint16(4,20,!0),h.setUint16(6,10,!0),h.setUint16(8,0,!0),h.setUint16(10,0,!0),h.setUint16(12,0,!0),h.setUint16(14,0,!0),h.setUint32(16,f,!0),h.setUint32(20,u.length,!0),h.setUint32(24,u.length,!0),h.setUint16(28,m.length,!0),h.setUint16(30,0,!0),h.setUint16(32,0,!0),h.setUint16(34,0,!0),h.setUint16(36,0,!0),h.setUint32(38,32,!0),h.setUint32(42,x,!0);const R=new Uint8Array(w);t.push(R),t.push(m),r+=R.length+m.length,o+=R.length+m.length});const l=new ArrayBuffer(22),i=new DataView(l);return i.setUint32(0,101010256,!0),i.setUint16(4,0,!0),i.setUint16(6,0,!0),i.setUint16(8,s.length,!0),i.setUint16(10,s.length,!0),i.setUint32(12,r,!0),i.setUint32(16,a,!0),i.setUint16(20,0,!0),t.push(new Uint8Array(l)),new Blob(t,{type:"application/zip"})}const wt=new BroadcastChannel("wiki-db-sync");wt.onmessage=async s=>{s.data==="refresh"&&(await Le(),await ue())};let cs=localStorage.getItem("secops-wiki-last-update")||"0";window.addEventListener("focus",async()=>{const s=localStorage.getItem("secops-wiki-last-update")||"0";s!==cs&&(cs=s,await Le(),await ue())});let Kn=null;const ci=15*60*1e3;let Qo;async function di(){Ts(),Qo=document.getElementById("app"),await fs(),await Es();try{await ds()}catch(e){console.warn("Failed to purge expired pages on init:",e)}try{await Ao(30)}catch(e){console.warn("Failed to auto-prune audit logs on init:",e)}ui(),localStorage.getItem("secops-wiki-db-encrypted")==="true"&&!ye?Ni():(await Le(),ea(),na(),window.addEventListener("hashchange",vn),window.addEventListener("online",wn),window.addEventListener("offline",wn),window.addEventListener("beforeinstallprompt",e=>{e.preventDefault(),jt=e;const t=document.getElementById("pwa-install-btn");t&&t.classList.remove("hidden")}),window.addEventListener("keydown",e=>{var t,n;if(e.ctrlKey&&(e.key==="k"||e.key==="K"||e.key==="p"||e.key==="P")&&(e.preventDefault(),qt()),e.ctrlKey&&(e.key==="n"||e.key==="N")&&!e.shiftKey&&(e.preventDefault(),window.location.hash="#/new"),e.key==="/"&&((t=document.activeElement)==null?void 0:t.tagName)!=="INPUT"&&((n=document.activeElement)==null?void 0:n.tagName)!=="TEXTAREA"&&(e.preventDefault(),qt()),e.ctrlKey&&e.altKey&&(e.key==="e"||e.key==="E"))if(e.preventDefault(),ot){const o=document.getElementById("edit-page-form");o&&o.requestSubmit()}else ee&&ee!=="home"&&ee!=="system"&&(window.location.hash=`#/edit/${ee}`)}),vn(),setInterval(async()=>{try{await ds()}catch(e){console.warn("Failed periodic expired page purge:",e)}},3e4))}function At(){Kn&&clearTimeout(Kn),Kn=setTimeout(pi,ci),window.lastHeartbeat||(window.lastHeartbeat=Date.now()),Date.now()-window.lastHeartbeat>5*60*1e3&&(pe("SESSION_HEARTBEAT","User activity heartbeat"),window.lastHeartbeat=Date.now())}function pi(){const s=document.getElementById("idle-lock-screen");if(!s)return;const e=localStorage.getItem("secops-wiki-db-encrypted")==="true";e&&(ye=null,Y=null,ue().catch(()=>{}));const t=localStorage.getItem("secops-wiki-webauthn-gate")==="true";if(e){s.innerHTML=`
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
    `;const n=s.querySelector("#idle-unlock-form"),o=s.querySelector("#idle-unlock-password-input"),a=s.querySelector("#idle-lock-error"),r=s.querySelector("#idle-unlock-biometric-btn");setTimeout(()=>o==null?void 0:o.focus(),50),n.addEventListener("submit",async l=>{if(l.preventDefault(),ls()){alert("Lockout Alert: Too many failed attempts. Cooldown active.");return}a.classList.add("hidden");const i=o.value;try{const c=await Ae(i);await ht(c)?(ye=c,await Le(),Yn(),await ue(),await pe("SESSION_RESTORE","Restored session via master passphrase.")):(a.classList.remove("hidden"),wo(),ue())}catch{a.classList.remove("hidden"),wo(),ue()}}),r&&r.addEventListener("click",async()=>{a.classList.add("hidden");try{const l=localStorage.getItem("secops-wiki-webauthn-payload")||"",i=crypto.getRandomValues(new Uint8Array(32)),c=await navigator.credentials.get({publicKey:{challenge:i,rpId:window.location.hostname||"localhost",userVerification:"required",timeout:6e4}});if(c){const p=new Uint8Array(c.rawId),m=Array.from(p).map(M=>M.toString(16).padStart(2,"0")).join(""),u=localStorage.getItem("secops-wiki-webauthn-salt")||"";if(!u)throw new Error("Biometric salt missing.");const f=`${m}:${u}`,x=await Ae(f),w=await Ee(l,x),h=await Ae(w);await ht(h)?(ye=h,await Le(),Yn(),await ue(),await pe("SESSION_RESTORE_BIOMETRIC","Restored session via biometric WebAuthn verification.")):a.classList.remove("hidden")}}catch(l){alert(`Biometric verification failed: ${l.message}`),await pe("WEBAUTHN_FAIL",`Idle lock biometric unlock failed: ${l.message}`)}})}else s.innerHTML=`
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
    `,s.querySelector("#idle-unlock-btn").addEventListener("click",()=>{Yn()});s.classList.remove("hidden")}function Yn(){const s=document.getElementById("idle-lock-screen");s&&s.classList.add("hidden"),At()}function ea(){let s=document.getElementById("idle-lock-screen");s||(s=document.createElement("div"),s.id="idle-lock-screen",s.className="fixed inset-0 bg-[#090d16]/95 backdrop-blur-md z-50 flex flex-col items-center justify-center hidden",document.body.appendChild(s)),At(),window.addEventListener("mousemove",At,{passive:!0}),window.addEventListener("keydown",At,{passive:!0}),window.addEventListener("click",At,{passive:!0}),window.addEventListener("scroll",At,{passive:!0})}function ho(){if(document.getElementById("pwa-update-toast"))return;const s=document.createElement("div");s.id="pwa-update-toast",s.className="fixed bottom-4 right-4 z-50 max-w-sm glass-panel border border-teal-500/30 p-4 rounded-xl shadow-2xl glow-border flex items-center justify-between gap-4 font-mono text-xs select-none",s.innerHTML=`
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
  `,document.body.appendChild(s);const e=document.getElementById("pwa-update-reload-btn");e&&e.addEventListener("click",()=>{window.location.reload()})}function ui(){"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/wiki/sw.js").then(s=>{console.log("ServiceWorker registered successfully with scope: ",s.scope),s.waiting&&ho(),s.addEventListener("updatefound",()=>{const e=s.installing;e&&e.addEventListener("statechange",()=>{e.state==="installed"&&navigator.serviceWorker.controller&&ho()})})}).catch(s=>{console.error("ServiceWorker registration failed: ",s)})})}function wn(){Go=navigator.onLine?"SECURE_LINK":"OFFLINE_CACHE";const s=document.getElementById("system-status-indicator"),e=document.getElementById("system-status-label");s&&e&&(navigator.onLine?(s.className="w-2 h-2 rounded-full bg-emerald-400 glow-text-emerald pulse-indicator",e.innerText="SECURE_LINK",e.className="text-xs text-emerald-400 font-mono tracking-wider"):(s.className="w-2 h-2 rounded-full bg-amber-500 pulse-indicator",e.innerText="OFFLINE_CACHE",e.className="text-xs text-amber-500 font-mono tracking-wider"))}async function Le(){me=await Rt(),await $i(),cs=localStorage.getItem("secops-wiki-last-update")||"0"}async function ds(){const s=await Vt(),e=Date.now();let t=!1;for(const n of s)n.expiresAt&&e>n.expiresAt&&(await ko(n.slug),await pe("SELF_DESTRUCT_EXPIRY",`Intel Entry "${n.title}" (slug: ${n.slug}) has self-destructed due to lease expiration.`),t=!0,ee===n.slug&&(ee="home",window.location.hash="#/page/home"));t&&(await Le(),await ue(),wt.postMessage("refresh"))}async function vn(){await ds();const s=window.location.hash||"#/page/home";ot=!1,je=!1;let e="";if(s.startsWith("#/page/")){const n=s.replace("#/page/","").split("#");ee=n[0],n.length>1&&(e=n[1])}else s.startsWith("#/edit/")?(ee=s.replace("#/edit/",""),ot=!0):s==="#/new"?(ot=!0,je=!0,ee=""):s==="#/system"?ee="system":s==="#/graph"?ee="graph":s.startsWith("#/import-p2p")?ee="import-p2p":s==="#/audit-logs"?ee="audit-logs":ee="home";!ot&&ee&&ee!=="system"&&ee!=="graph"&&ee!=="import-p2p"&&ee!=="audit-logs"&&(ti(ee),Fi(ee)),await ue(),e&&setTimeout(()=>{const t=document.getElementById(e);t&&t.scrollIntoView({behavior:"smooth"})},50)}function Zn(s){const e=s.filter(a=>a.isSystem),t=s.filter(a=>!a.isSystem&&a.isEncrypted),n=s.filter(a=>!a.isSystem&&!a.isEncrypted);let o="";return e.length>0&&(o+=`
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
    `),o}function Xn(s){const e=ee===s.slug&&!ot,t=s.isEncrypted&&!Y&&ct,n=t?"[REDACTED CORE]":s.title,o=t?"javascript:void(0)":`#/page/${s.slug}`,a=t?`onclick="alert('SECURITY WARNING: Document is locked. Enter passphrase to decrypt cores first.');"`:"";let r="";if(Ge.trim().length>0){const l=s.isEncrypted&&!Y,i=bt.find(c=>c.slug===s.slug)||s;if(!l&&i.content){const c=i.content.toLowerCase().indexOf(Ge.toLowerCase());if(c!==-1){const p=Math.max(0,c-20),m=Math.min(i.content.length,c+Ge.length+30);let u=i.content.substring(p,m);p>0&&(u="..."+u),m<i.content.length&&(u=u+"...");const f=I(u),x=new RegExp(`(${Ge.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")})`,"gi");r=`<div class="text-[10px] text-slate-500 font-mono mt-1 pl-4 break-all whitespace-normal leading-normal">${f.replace(x,'<span class="bg-teal-950 text-teal-350 px-0.5 rounded font-bold">$1</span>')}</div>`}}}return`
    <a href="${o}" ${a} class="block px-3 py-2 rounded-lg text-xs font-mono transition group ${e?"bg-teal-950/30 text-teal-400 font-bold border-l-2 border-teal-500":"text-slate-450 hover:bg-slate-900/40 hover:text-slate-200"}">
      <div class="flex items-center justify-between">
        <span class="truncate flex items-center gap-1.5">
          ${s.isEncrypted?'<span class="text-red-450 text-[9px]">🔒</span>':'<span class="text-slate-650 group-hover:text-slate-500 text-[9px]">⊙</span>'}
          ${I(n)}
        </span>
      </div>
      ${r}
    </a>
  `}async function ue(){var h,R,M;await Le();let s=me;Ge.trim().length>0&&(s=s.map(E=>({page:E,score:Xo(bt.find(v=>v.slug===E.slug)||E,Ge)})).filter(E=>E.score>0).sort((E,v)=>v.score-E.score).map(E=>E.page)),Mt&&(s=s.filter(E=>E.tags.includes(Mt)));const e=Array.from(new Set(me.flatMap(E=>E.tags)));Qo.innerHTML=`
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
            <span id="system-status-label" class="text-xs ${navigator.onLine?"text-emerald-400":"text-amber-500"} font-mono tracking-wider">${Go}</span>
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
        ${(()=>{const E=JSON.parse(localStorage.getItem("pinned_docs")||"[]"),v=me.filter(L=>E.includes(L.slug));return v.length>0?`
            <div class="px-2 py-4 border-b border-slate-800/80 shrink-0">
              <div class="px-3 mb-2 flex items-center justify-between">
                <span class="text-xs font-semibold text-amber-500 uppercase tracking-widest font-mono flex items-center gap-1">? Pinned Docs</span>
              </div>
              <div class="space-y-1">
                ${Zn(v)}
              </div>
            </div>`:""})()}
        
        <!-- Tag Filter Cloud -->
        ${e.length>0?`
          <div class="px-4 py-2 border-b border-slate-800/80 flex flex-wrap gap-1 max-h-24 overflow-y-auto shrink-0 select-none">
            <button class="tag-badge px-1.5 py-0.5 text-[9px] rounded-full font-mono transition ${Mt?"bg-slate-900 text-slate-400 hover:bg-slate-850":"bg-teal-500 text-slate-950 font-bold shadow-[0_0_8px_rgba(20,184,166,0.3)]"}" data-tag="">#ALL</button>
            ${e.map(E=>{const v=li(E);return`
                <button class="tag-badge px-1.5 py-0.5 text-[9px] rounded-full font-mono transition ${Mt===E?"bg-teal-500 text-slate-950 font-bold shadow-[0_0_8px_rgba(20,184,166,0.3)]":`${v.className} hover:opacity-85`}" data-tag="${I(E)}">#${I(E.toUpperCase())}</button>
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
            ${ia(Ui(s))}
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
  `;const t=document.getElementById("wiki-search-input");t&&t.addEventListener("input",E=>{Ge=E.target.value;const v=bt.filter(P=>P.title.toLowerCase().includes(Ge.toLowerCase())||P.content.toLowerCase().includes(Ge.toLowerCase())||P.tags.some(j=>j.toLowerCase().includes(Ge.toLowerCase()))),L=document.getElementById("pages-list");L.innerHTML=Zn(v),v.length===0&&(L.innerHTML='<div class="text-center py-6 text-xs text-slate-650 font-mono">No entries found</div>')});const n=document.getElementById("pwa-install-btn");n&&n.addEventListener("click",async()=>{if(jt){jt.prompt();const{outcome:E}=await jt.userChoice;E==="accepted"&&console.log("User accepted the PWA install prompt"),jt=null,n.classList.add("hidden")}});const o=document.getElementById("system-panic-btn");o&&o.addEventListener("click",async()=>{if(!await Gt("EXECUTE SYSTEM PANIC PURGE")){alert("Verification Failed: Consent signature rejected.");return}if(confirm("CRITICAL SYSTEM COMPROMISE PROTOCOL: Purge entire local database, clear all service worker caches, unregister service workers, and force self-destruct reload immediately?")){if(indexedDB.deleteDatabase("secops-wiki-db"),"caches"in window){const v=await caches.keys();await Promise.all(v.map(L=>caches.delete(L)))}if("serviceWorker"in navigator){const v=await navigator.serviceWorker.getRegistrations();await Promise.all(v.map(L=>L.unregister()))}localStorage.clear(),sessionStorage.clear(),Y=null,window.history.replaceState(null,"","about:blank"),window.location.replace("about:blank")}});const a=document.getElementById("sidebar-toggle-btn"),r=document.getElementById("sidebar-close-btn"),l=document.getElementById("sidebar-backdrop"),i=()=>{const E=document.getElementById("sidebar"),v=document.getElementById("sidebar-backdrop");E&&v&&(E.classList.add("-translate-x-full"),v.classList.add("hidden"))},c=()=>{const E=document.getElementById("sidebar"),v=document.getElementById("sidebar-backdrop");E&&v&&(E.classList.remove("-translate-x-full"),v.classList.remove("hidden"))};a&&a.addEventListener("click",c),r&&r.addEventListener("click",i),l&&l.addEventListener("click",i),document.querySelectorAll("#sidebar a").forEach(E=>{E.addEventListener("click",()=>{window.innerWidth<768&&i()})});const m=document.getElementById("theme-toggle-btn");m&&m.addEventListener("click",Zo);const u=[12,13,14,15,16,18,20];let f=parseInt(localStorage.getItem("secops-wiki-font-size-idx")||"2",10);const x=()=>{document.documentElement.style.setProperty("--wiki-font-size",u[f]+"px"),localStorage.setItem("secops-wiki-font-size-idx",f.toString())};x(),(h=document.getElementById("font-size-increase-btn"))==null||h.addEventListener("click",()=>{f<u.length-1&&(f++,x())}),(R=document.getElementById("font-size-decrease-btn"))==null||R.addEventListener("click",()=>{f>0&&(f--,x())}),(M=document.getElementById("font-size-reset-btn"))==null||M.addEventListener("click",()=>{f=2,x()}),document.querySelectorAll(".tag-badge").forEach(E=>{E.addEventListener("click",async v=>{Mt=v.currentTarget.getAttribute("data-tag")||"",await ue()})});const w=document.getElementById("tag-tree-container");w&&(w.addEventListener("click",E=>{const v=E.target.closest(".tree-folder-header");if(v){const L=v.nextElementSibling,P=v.querySelector(".tree-folder-icon");if(L){const j=L.classList.toggle("hidden");P&&(P.style.transform=j?"rotate(0deg)":"rotate(90deg)")}}}),w.addEventListener("keydown",E=>{var ae,J;const v=document.activeElement;if(!v||!w.contains(v))return;const P=Array.from(w.querySelectorAll(".tree-folder-header, .tree-folder-children a")).filter(Q=>{let le=Q.parentElement;for(;le&&le!==w;){if(le.classList.contains("tree-folder-children")&&le.classList.contains("hidden"))return!1;le=le.parentElement}return!0}),j=P.indexOf(v);if(j!==-1){if(E.key==="ArrowDown"){E.preventDefault();const Q=(j+1)%P.length;(ae=P[Q])==null||ae.focus()}else if(E.key==="ArrowUp"){E.preventDefault();const Q=(j-1+P.length)%P.length;(J=P[Q])==null||J.focus()}else if(E.key==="Enter")E.preventDefault(),v.click();else if(E.key==="ArrowRight"){if(E.preventDefault(),v.classList.contains("tree-folder-header")){const Q=v.nextElementSibling,le=v.querySelector(".tree-folder-icon");Q&&Q.classList.contains("hidden")&&(Q.classList.remove("hidden"),le&&(le.style.transform="rotate(90deg)"))}}else if(E.key==="ArrowLeft"&&(E.preventDefault(),v.classList.contains("tree-folder-header"))){const Q=v.nextElementSibling,le=v.querySelector(".tree-folder-icon");Q&&!Q.classList.contains("hidden")&&(Q.classList.add("hidden"),le&&(le.style.transform="rotate(0deg)"))}}})),await fi()}async function fi(){const s=document.getElementById("main-content");if(ee==="graph"){await Ri(s);return}if(ee==="system"){Wt(s);return}if(ee==="import-p2p"){await zi(s);return}if(ee==="audit-logs"){await qi(s);return}if(ot){await ta(s);return}await En(s)}async function En(s){const e=await Ve(ee);if(!e){s.innerHTML=`
      <div class="text-center py-20 bg-slate-950/40 border border-red-950/20 rounded-xl px-6 glow-border">
        <svg class="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
        </svg>
        <h2 class="text-2xl font-bold font-mono text-white mb-2 uppercase">DATA_MISSING</h2>
        <p class="text-slate-400 text-sm max-w-md mx-auto mb-6">Requested intel document slug "${I(ee)}" is not registered in index database.</p>
        <a href="#/new" class="px-4 py-2 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 font-mono text-xs uppercase rounded transition hover:text-white">
          Create New Document
        </a>
      </div>
    `;return}const t=await aa(e.slug);let n=e.content,o=!1;if(e.isEncrypted)if(Y)try{n=await Ee(e.content,Y)}catch{o=!0}else o=!0;if(o){const g=ls();let A="";if(g&&(A=`<p class="text-red-500 text-xs font-mono font-bold mt-2 animate-pulse uppercase">SECURITY LOCKOUT: Too many failures. Locked out for ${Math.ceil((is()-Date.now())/1e3)}s.</p>`),s.innerHTML=`
      <div class="max-w-md mx-auto my-20 p-6 glass-panel border border-teal-900/30 rounded-xl text-center glow-border select-none">
        <svg class="w-16 h-16 text-teal-500 mx-auto mb-4 animate-pulse" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        <h2 class="text-xl font-bold font-mono text-white mb-2 uppercase">DECRYPT_REQUIRED</h2>
        <p class="text-slate-400 text-xs font-mono mb-6">This document payload is encrypted. Enter passphrase to decrypt.</p>
        <form id="decrypt-doc-form" class="space-y-4">
          <input type="password" id="decrypt-password-input" aria-label="Security key passphrase" placeholder="Enter security passphrase..." ${g?"disabled":""} class="w-full bg-slate-950/80 border border-slate-800 focus:border-teal-500/50 rounded-lg p-2.5 text-base text-slate-200 focus:outline-none transition font-mono text-center disabled:opacity-40 disabled:cursor-not-allowed">
          <button type="submit" ${g?"disabled":""} class="w-full py-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-mono text-xs uppercase rounded font-bold transition shadow-[0_0_10px_rgba(20,184,166,0.2)] disabled:opacity-40 disabled:cursor-not-allowed">
            DECRYPT IN-MEMORY
          </button>
        </form>
        <div id="decrypt-lockout-timer">${A}</div>
      </div>
    `,g){const F=setInterval(async()=>{const B=Math.ceil((is()-Date.now())/1e3),re=document.getElementById("decrypt-lockout-timer");B<=0?(clearInterval(F),await En(s)):re&&(re.innerHTML=`<p class="text-red-500 text-xs font-mono font-bold mt-2 animate-pulse uppercase">SECURITY LOCKOUT: Too many failures. Locked out for ${B}s.</p>`)},1e3)}setTimeout(()=>{const F=document.getElementById("decrypt-password-input");F==null||F.focus()},50),document.getElementById("decrypt-doc-form").addEventListener("submit",async F=>{if(F.preventDefault(),ls()){alert("Security Lockout active.");return}const B=document.getElementById("decrypt-password-input").value;try{const re=await Ae(B);await Ee(e.content,re),ai(),Y=re,await ue()}catch{oi(),alert("Security Alert: Authentication failed. Invalid security passphrase."),await En(s)}});return}const a=n.split(/\s+/).filter(g=>g.length>0).length,r=Math.max(1,Math.round(a/200)),l=Ct(n),i=new Date(e.updatedAt).toLocaleString(),c=document.createElement("div");c.innerHTML=l,ei(c);const p=c.innerHTML,m=ii(p,Ge),u=c.querySelectorAll("h1, h2, h3");let f="";u.length>0&&(f=`
      <div class="hidden lg:block w-60 shrink-0 self-start sticky top-8">
        <div class="glass-panel border border-slate-800/80 rounded-xl p-4">
          <h4 class="text-xs font-bold font-mono text-slate-400 uppercase tracking-widest border-b border-slate-800/60 pb-2 mb-3">Outline</h4>
          <nav class="space-y-2 text-xs font-mono max-h-[350px] overflow-y-auto pr-1">
            ${Array.from(u).map(g=>{const A=g.textContent||"",C=g.id||A.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,""),F=g.tagName.toLowerCase(),B=F==="h1"?"pl-0 font-semibold":F==="h2"?"pl-3 border-l border-slate-800":"pl-6 border-l border-slate-800";return`
                <a href="#/page/${e.slug}#${C}" class="block text-slate-500 hover:text-teal-400 transition truncate ${B}" title="${I(A)}">
                  ${I(A)}
                </a>
              `}).join("")}
          </nav>
        </div>
      </div>
    `);const x=n.match(/^(\s*[-*] )\[ \]/gm)||[],w=n.match(/^(\s*[-*] )\[[xX]\]/gm)||[],h=x.length+w.length;let R="";if(h>0){const g=w.length,A=Math.round(g/h*100),C=10,F=Math.round(g/h*C),B=C-F;R=`
      <div class="glass-panel border border-slate-800/80 p-3 rounded-lg flex items-center justify-between mb-6 text-[10px] sm:text-xs font-mono select-none">
        <div class="flex items-center gap-2 sm:gap-3">
          <span class="text-teal-400 font-bold">📋 TASK STATUS:</span>
          <span class="text-slate-400 font-bold">${"█".repeat(F)+"░".repeat(B)}</span>
          <span class="text-teal-400 font-bold">${A}%</span>
        </div>
        <div class="text-slate-500">
          ${g}/${h} COMPLETED
        </div>
      </div>
    `}let M="";try{const g=JSON.parse(sessionStorage.getItem("secops-wiki-breadcrumbs")||"[]");g.length>1&&(M=`
        <div class="flex items-center gap-1.5 text-[10px] font-mono text-slate-500 mb-3 select-none overflow-x-auto whitespace-nowrap pb-1">
          <span class="text-slate-600 uppercase">RECENT:</span>
          ${g.map((A,C)=>{const F=ni(A),re=A===e.slug?"text-teal-400 font-bold":"text-slate-450 hover:text-slate-350 transition",S=C<g.length-1?'<span class="text-slate-850">/</span>':"";return`
              <a href="#/page/${A}" class="${re}">${I(F)}</a>
              ${S}
            `}).join("")}
        </div>
      `)}catch{}let E="";e.signature?await tt(e)!==e.signature?E=`<span class="px-2 py-0.5 bg-red-950/40 text-red-400 border border-red-900/30 rounded text-[9px] font-mono font-bold animate-pulse">⚠️ INTEGRITY FAIL</span>
                            <button id="reconcile-integrity-btn" class="ml-1.5 px-2 py-0.5 bg-red-950/50 hover:bg-red-900/40 text-red-400 hover:text-white border border-red-900/30 hover:border-red-700 rounded text-[9px] font-mono font-bold uppercase transition">Reconcile</button>`:E='<span class="px-2 py-0.5 bg-emerald-950/40 text-emerald-400 border border-emerald-900/30 rounded text-[9px] font-mono font-bold">✓ INTEGRITY OK</span>':E=`<span class="px-2 py-0.5 bg-amber-950/40 text-amber-400 border border-amber-900/30 rounded text-[9px] font-mono font-bold">⚠️ UNSIGNED</span>
                          <button id="sign-page-btn" class="ml-1.5 px-2 py-0.5 bg-amber-950/50 hover:bg-amber-900/40 text-amber-400 hover:text-white border border-amber-900/30 hover:border-amber-700 rounded text-[9px] font-mono font-bold uppercase transition">Sign Intel</button>`,e.isEncrypted?document.body.classList.add("encrypted-page-active"):document.body.classList.remove("encrypted-page-active");const v=e.classification||"UNCLASSIFIED";let L="border-emerald-500/20 text-emerald-400 bg-emerald-950/10",P="classification-glow-unclassified";v==="CONFIDENTIAL"?(L="border-blue-500/20 text-blue-400 bg-blue-950/10",P="classification-glow-confidential"):v==="SECRET"?(L="border-amber-500/20 text-amber-500 bg-amber-950/10",P="classification-glow-secret"):v==="TOP SECRET"&&(L="border-red-500/30 text-red-500 bg-red-950/10 animate-pulse",P="classification-glow-topsecret");const j=`
    <div class="border ${L} px-4 py-1.5 rounded-lg text-center text-[10px] font-bold font-mono uppercase tracking-widest select-none mb-6">
      ✦ ${v} ✦
    </div>
  `,ae=`
    <div class="border ${L} px-4 py-1.5 rounded-lg text-center text-[10px] font-bold font-mono uppercase tracking-widest select-none mt-8">
      ✦ ${v} ✦
    </div>
  `;s.innerHTML=`
    <div class="flex flex-col lg:flex-row gap-4 lg:gap-8 items-start">
      <!-- Main Content Area -->
      <div class="flex-1 min-w-0 glass-panel border rounded-xl p-5 md:p-6 shadow-xl ${P}">
        <!-- Breadcrumb navigation trail -->
        ${M}
        
        <!-- Top Classification Banner -->
        ${j}
        <!-- Page Header telemetry -->
        <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between border-b border-slate-800 pb-6 mb-6 gap-4">
          <div>
            <h2 class="text-xl sm:text-2xl md:text-3xl font-extrabold text-white font-mono tracking-tight leading-tight break-words">${I(e.title)}</h2>
            <div class="flex flex-wrap items-center gap-3 mt-3">
              <span class="hidden sm:inline text-xs font-mono text-slate-500 uppercase">SYS_REF: ${I(e.slug)}</span>
              <span class="h-3 w-px bg-slate-800"></span>
              <span class="text-xs font-mono text-slate-500 uppercase">UPDATED: ${i}</span>
              <span class="h-3 w-px bg-slate-800"></span>
              <span class="text-xs font-mono text-teal-400 uppercase">⏱️ ${r} MIN READ</span>
              ${E}
              <span class="h-3 w-px bg-slate-800"></span>
              ${e.tags.map(g=>Qr(g)).join("")}
              ${e.expiresAt?`
                <span class="h-3 w-px bg-slate-800"></span>
                <span id="page-expiry-countdown" class="text-xs font-mono text-red-400 font-bold uppercase tracking-wider animate-pulse">SELF-DESTRUCT: CALCULATING...</span>
              `:""}
            </div>
            ${(()=>{const g=Wi(e.content);return g.length>0?`
                  <div class="flex flex-wrap items-center gap-1.5 mt-2">
                    <span class="text-[9px] font-mono text-slate-500 uppercase font-bold">Key Terms:</span>
                    ${g.map(A=>`<span class="px-1.5 py-0.5 bg-slate-900 border border-slate-800 text-slate-400 rounded text-[9px] font-mono">${I(A)}</span>`).join("")}
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

            
            <button id="qr-page-btn" class="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 bg-slate-900 border border-slate-800 hover:border-teal-500/50 hover:text-teal-400 text-slate-300 font-mono text-xs rounded transition uppercase" title="Share via QR Code">
              <span>📱</span> QR
            </button>
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
        ${R}
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
              ${t.map((g,A)=>`
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-3 first:pt-0">
                  <div class="min-w-0">
                    <p class="text-xs font-mono text-slate-300 break-words">REV_${t.length-A} // ${I(g.title)}</p>
                    <p class="text-[10px] font-mono text-slate-500">${new Date(g.updatedAt).toLocaleString()}</p>
                  </div>
                  <button class="restore-rev-btn px-2.5 py-1 bg-slate-900 border border-slate-800 hover:border-slate-700 text-teal-400 hover:text-teal-300 font-mono text-[10px] rounded transition uppercase shrink-0 self-start sm:self-auto" data-rev-id="${I(g.id)}">
                    ROLLBACK
                  </button>
                  <button class="view-rev-diff-btn px-2.5 py-1 bg-slate-900 border border-slate-800 hover:border-slate-700 text-blue-400 hover:text-blue-300 font-mono text-[10px] rounded transition uppercase shrink-0 self-start sm:self-auto" data-rev-id="${I(g.id)}" data-rev-content="${I(g.content)}" data-rev-title="${I(g.title)}">
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
        ${ae}
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
  `;const J=document.getElementById("pin-page-btn"),Q=document.getElementById("pin-page-text");if(J&&Q){let g=JSON.parse(localStorage.getItem("pinned_docs")||"[]");g.includes(e.slug)&&(J.classList.add("text-amber-400"),Q.innerText="Unpin"),J.addEventListener("click",()=>{g=JSON.parse(localStorage.getItem("pinned_docs")||"[]"),g.includes(e.slug)?(g=g.filter(A=>A!==e.slug),J.classList.remove("text-amber-400"),Q.innerText="Pin"):(g.push(e.slug),J.classList.add("text-amber-400"),Q.innerText="Unpin"),localStorage.setItem("pinned_docs",JSON.stringify(g)),ue()})}const le=document.getElementById("page-export-dropdown-btn"),xe=document.getElementById("page-export-menu");if(le&&xe){le.addEventListener("click",G=>{G.stopPropagation(),xe.classList.toggle("hidden")}),document.addEventListener("click",()=>{xe.classList.add("hidden")});const g=document.getElementById("clone-page-btn");g&&g.addEventListener("click",async()=>{const G=e.slug+"-copy",q={...e,slug:G,title:"Copy of "+e.title,id:crypto.randomUUID(),createdAt:Date.now(),updatedAt:Date.now()};await _e(q),window.location.hash=`#/edit/${G}`});const A=document.querySelectorAll(".toc-link");if(A.length>0){const G=new IntersectionObserver(q=>{q.forEach(K=>{K.isIntersecting&&A.forEach(te=>{te.classList.remove("text-teal-400","font-bold"),te.getAttribute("data-id")===K.target.id&&te.classList.add("text-teal-400","font-bold")})})},{rootMargin:"0px 0px -80% 0px"});document.querySelectorAll("h1, h2, h3").forEach(q=>G.observe(q))}const C=document.getElementById("read-progress");if(C){const G=()=>{const q=document.documentElement.scrollHeight-document.documentElement.clientHeight;if(q>0){const K=window.scrollY/q*100;C.style.width=K+"%"}};window.addEventListener("scroll",G)}document.getElementById("export-single-md").addEventListener("click",async()=>{let G=e.content;if(e.isEncrypted&&Y)try{G=await Ee(e.content,Y)}catch{}const q=`---
title: ${e.title}
slug: ${e.slug}
tags: ${e.tags.join(", ")}
updated: ${new Date(e.updatedAt).toISOString()}
encrypted: ${!!e.isEncrypted}
---

`,K=new Blob([q+G],{type:"text/markdown;charset=utf-8;"}),te=URL.createObjectURL(K),y=document.createElement("a");y.href=te,y.download=`${e.slug}.md`,document.body.appendChild(y),y.click(),document.body.removeChild(y),URL.revokeObjectURL(te)}),document.getElementById("export-single-html").addEventListener("click",async()=>{let G=e.content;if(e.isEncrypted&&Y)try{G=await Ee(e.content,Y)}catch{}const q=Ct(G),K=`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${I(e.title)} - SecOps Wiki Offline</title>
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
  <h1>${I(e.title)}</h1>
  <div class="metadata">
    Slug: ${e.slug} &nbsp;|&nbsp; 
    Updated: ${new Date(e.updatedAt).toLocaleString()} &nbsp;|&nbsp;
    Tags: ${e.tags.map(T=>`<span class="badge">#${I(T)}</span>`).join("")}
  </div>
  <article>
    ${q}
  </article>
</body>
</html>`,te=new Blob([K],{type:"text/html;charset=utf-8;"}),y=URL.createObjectURL(te),O=document.createElement("a");O.href=y,O.download=`${e.slug}.html`,document.body.appendChild(O),O.click(),document.body.removeChild(O),URL.revokeObjectURL(y)}),document.getElementById("export-single-print").addEventListener("click",()=>{window.print()});const S=document.getElementById("export-single-p2p");S&&S.addEventListener("click",async()=>{let G=e.content;if(e.isEncrypted&&Y)try{G=await Ee(e.content,Y)}catch{}const q=prompt("Create a secure sharing passphrase for this peer link (min 4 characters):");if(q){if(q.length<4){alert("Security Requirement: Passphrase must be at least 4 characters long.");return}try{const K=await Ae(q),te={title:e.title,content:G,tags:e.tags,classification:e.classification||"UNCLASSIFIED"},y=await at(JSON.stringify(te),K),O=btoa(y),T=`${window.location.origin}${window.location.pathname}#/import-p2p?data=${encodeURIComponent(O)}&key=${encodeURIComponent(q)}`;await navigator.clipboard.writeText(T),alert("✓ SECURE P2P LINK GENERATED: The encrypted link has been copied to your clipboard. Share it securely with your peer."),await pe("P2P_LINK_EXPORT",`Generated secure share link for document: ${e.title}`)}catch(K){alert(`Encryption error: Failed to generate sharing link - ${K.message}`)}}});const V=document.getElementById("sign-page-btn");V&&V.addEventListener("click",async()=>{if(confirm(`SIGNING NOTICE: Generate a cryptographic integrity signature for "${e.title}" and save it?`))try{const q=await tt(e),K={...e,signature:q};await _e(K),await pe("PAGE_SIGNED",`Cryptographically signed document: ${e.slug}`),alert("✓ SIGNATURE COMMITTED: Cryptographic integrity signature saved to database."),await Le(),await ue()}catch(q){alert("Signing failed: "+q.message)}});const W=document.getElementById("qr-page-btn");W&&W.addEventListener("click",()=>{ol(window.location.href)});const Z=document.getElementById("reconcile-integrity-btn");Z&&Z.addEventListener("click",async()=>{if(!confirm(`RECONCILIATION NOTICE: Confirm restoration of document "${e.title}" to its last cryptographically verified historical revision? Unverified changes will be discarded.`))return;let q=!1;for(const K of t)if(K.signature&&await tt({slug:K.slug,title:K.title,content:K.content,updatedAt:K.updatedAt,tags:K.tags||[]})===K.signature){await _e({slug:K.slug,title:K.title,content:K.content,updatedAt:Date.now(),tags:K.tags||[],classification:K.classification||"UNCLASSIFIED",isSystem:e.isSystem,isEncrypted:K.isEncrypted}),q=!0;break}q?(alert("✓ RECONCILIATION COMPLETED: The document has been restored to its last verified authentic state."),await Le(),await ue()):(alert("⚠️ RECONCILIATION FAILED: No historical revision could be cryptographically verified. Check audit logs."),await pe("RECONCILE_FAILED",`Reconciliation failed for "${e.title}". No authentic revisions found.`))})}const Be=document.getElementById("delete-page-btn");Be&&Be.addEventListener("click",async()=>{confirm(`CRITICAL SYSTEM NOTICE: Confirm total purge of intel document "${e.title}"? This action is irreversible.`)&&(await ko(e.slug),localStorage.setItem("secops-wiki-last-update",Date.now().toString()),wt.postMessage("refresh"),window.location.hash="#/page/home")}),s.querySelectorAll("pre").forEach(g=>{const A=document.createElement("div");A.className="relative group",g.parentNode.insertBefore(A,g),A.appendChild(g);const C=document.createElement("button");C.className="absolute top-2 right-2 px-2 py-1 bg-slate-900/80 hover:bg-slate-800 text-[10px] text-slate-400 hover:text-white font-mono rounded opacity-0 group-hover:opacity-100 transition focus:opacity-100 border border-slate-800 focus:outline-none",C.textContent="COPY",C.addEventListener("click",()=>{var B;const F=((B=g.querySelector("code"))==null?void 0:B.textContent)||g.textContent||"";navigator.clipboard.writeText(F).then(()=>{C.textContent="COPIED",setTimeout(()=>C.textContent="COPY",2e3),document.body.classList.contains("encrypted-page-active")&&Ko()})}),A.appendChild(C)}),s.querySelectorAll(".restore-rev-btn").forEach(g=>{g.addEventListener("click",async A=>{const C=A.currentTarget.getAttribute("data-rev-id"),F=t.find(B=>B.id===C);if(F&&confirm(`ROLLBACK COMMAND: Revert current page content to revision state "${F.title}" saved on ${new Date(F.updatedAt).toLocaleString()}?`)){const B=await Ve(e.slug);B&&await Is({id:`${B.slug}-${Date.now()}`,slug:B.slug,title:B.title,content:B.content,updatedAt:Date.now(),tags:B.tags,classification:B.classification,signature:B.signature}),await _e({slug:F.slug,title:F.title,content:F.content,updatedAt:Date.now(),tags:e.tags,isSystem:e.isSystem}),alert("Revision successfully restored."),await Le(),await ue()}})}),s.querySelectorAll(".view-rev-diff-btn").forEach(g=>{g.addEventListener("click",A=>{const C=A.currentTarget,F=C.getAttribute("data-rev-title")||"Revision",B=C.getAttribute("data-rev-content")||"";rl(F,e.content,B)})}),s.querySelectorAll('.wiki-content input[type="checkbox"]').forEach((g,A)=>{const C=g;C.removeAttribute("disabled"),C.classList.add("cursor-pointer","accent-teal-500"),C.addEventListener("change",async F=>{const B=F.target;await Ci(e.slug,A,B.checked)})});const _=document.getElementById("page-expiry-countdown");if(_&&e.expiresAt){const g=()=>{const F=Date.now(),B=e.expiresAt-F;if(B<=0)_.textContent="SELF-DESTRUCT: EXPIRED",ue();else{const re=Math.floor(B/36e5),S=Math.floor(B%(3600*1e3)/(60*1e3)),V=Math.floor(B%(60*1e3)/1e3),W=re>0?`${re}H `:"",Z=S>0||re>0?`${S}M `:"";_.textContent=`SELF-DESTRUCT: ${W}${Z}${V}S`}};g();const A=setInterval(g,1e3),C=()=>{clearInterval(A),window.removeEventListener("hashchange",C)};window.addEventListener("hashchange",C)}await Bi(s),Zi(s),ji(s);try{window.Prism&&window.Prism.highlightAllUnder(s)}catch{}const N=document.getElementById("copy-page-link-btn");N&&N.addEventListener("click",async()=>{const g=window.location.origin+window.location.pathname+"#/page/"+e.slug;try{await navigator.clipboard.writeText(g),N.textContent="✓ Copied!",setTimeout(()=>{N.textContent="🔗 Copy Link"},2e3)}catch{prompt("Copy this link:",g)}});const k=document.getElementById("related-pages-panel");if(k){let g=Yi(e,5);g.length===0&&e.tags.length>0&&(g=me.filter(C=>C.slug!==e.slug&&C.tags.some(F=>e.tags.includes(F))).slice(0,5).map(C=>({page:C,score:0}))),g.length>0&&(k.innerHTML=`
        <div class="border-t border-slate-800 mt-8 pt-6">
          <p class="text-xs font-bold font-mono text-slate-400 uppercase tracking-widest mb-3">Related Intel (Content Similarity)</p>
          <div class="flex flex-wrap gap-2">
            ${g.map(A=>{const C=A.page,F=A.score>0?` (${Math.round(Math.min(100,A.score*100))}% MATCH)`:"";return`
                <a href="#/page/${C.slug}" class="px-3 py-1.5 bg-slate-900/60 border border-slate-800 hover:border-teal-500/50 hover:text-teal-400 text-slate-400 font-mono text-xs rounded-lg transition flex items-center gap-1.5">
                  <span class="text-[9px]">${C.isEncrypted?"🔒":"⊙"}</span>
                  ${I(C.title)}${F}
                </a>
              `}).join("")}
          </div>
        </div>
      `)}}async function ta(s){let e="",t="",n="",o=[],a=!1,r=!1,l="UNCLASSIFIED",i=0;if(!je){const y=await Ve(ee);if(y&&(e=y.title,t=y.slug,n=y.content,o=[...y.tags],a=!!y.isSystem,r=!!y.isEncrypted,l=y.classification||"UNCLASSIFIED",y.expiresAt&&y.updatedAt&&(i=Math.round((y.expiresAt-y.updatedAt)/6e4)),y.isEncrypted))if(Y)try{n=await Ee(y.content,Y)}catch{n="ERROR: Decryption key mismatch. Please go back and re-decrypt."}else n="ERROR: This page is encrypted. Decrypt it in the reader view first."}const c=`secops-wiki-draft-${je?"new":ee}`;let p="";const m=localStorage.getItem(c);if(m)try{const y=JSON.parse(m);p=`
        <div id="draft-restore-banner" class="bg-amber-950/40 border border-amber-800 text-amber-400 p-3 rounded-lg text-xs font-mono mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <span>UNSAVED CHANGES: A local draft from ${new Date(y.updatedAt).toLocaleTimeString()} was found.</span>
          <div class="flex gap-2 shrink-0">
            <button type="button" id="restore-draft-btn" class="px-2 py-1 bg-amber-600 text-slate-950 hover:bg-amber-500 rounded font-bold uppercase tracking-wider text-[10px] transition">Restore</button>
            <button type="button" id="discard-draft-btn" class="px-2 py-1 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white rounded uppercase tracking-wider text-[10px] transition">Discard</button>
          </div>
        </div>
      `}catch{}s.innerHTML=`
    <div class="glass-panel border border-slate-800 rounded-xl p-4 md:p-6 glow-border">
      <div class="border-b border-slate-800 pb-4 mb-6">
        <h2 class="text-xl font-bold font-mono text-white uppercase">${je?"Establish New Intel Entry":"Update Intel Entry"}</h2>
        <p class="text-xs text-slate-500 font-mono">All text payloads are sanitized client-side against XSS vectors.</p>
      </div>

      ${p}

      <form id="edit-page-form" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Title Input -->
          <div>
            <label for="edit-title" class="block text-xs font-semibold text-slate-400 uppercase tracking-widest font-mono mb-2">Document Title</label>
            <input type="text" id="edit-title" value="${I(e)}" required maxlength="100" class="w-full bg-slate-950/80 border border-slate-800 focus:border-teal-500/50 rounded-lg p-2.5 text-base md:text-sm text-slate-200 focus:outline-none transition font-mono">
          </div>

          <!-- Slug Input -->
          <div>
            <label for="edit-slug" class="block text-xs font-semibold text-slate-400 uppercase tracking-widest font-mono mb-2">Index Slug ID</label>
            <input type="text" id="edit-slug" value="${I(t)}" ${je?"":"disabled"} required pattern="^[a-z0-9-_]+$" placeholder="e.g. operational-manual" class="w-full bg-slate-950/80 border border-slate-800 focus:border-teal-500/50 rounded-lg p-2.5 text-base md:text-sm text-slate-200 focus:outline-none transition font-mono disabled:opacity-40 disabled:cursor-not-allowed">
            ${je?'<p class="text-[10px] text-slate-500 mt-1 font-mono">Only lowercase letters, numbers, hyphens, and underscores are allowed.</p>':""}
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Security Classification dropdown select -->
          <div>
            <label for="edit-classification" class="block text-xs font-semibold text-slate-400 uppercase tracking-widest font-mono mb-2">Security Classification</label>
            <select id="edit-classification" class="w-full bg-slate-950/80 border border-slate-800 focus:border-teal-500/50 rounded-lg p-2.5 text-base md:text-sm text-slate-200 focus:outline-none transition font-mono cursor-pointer">
              <option value="UNCLASSIFIED" ${l==="UNCLASSIFIED"?"selected":""}>UNCLASSIFIED</option>
              <option value="CONFIDENTIAL" ${l==="CONFIDENTIAL"?"selected":""}>CONFIDENTIAL</option>
              <option value="SECRET" ${l==="SECRET"?"selected":""}>SECRET</option>
              <option value="TOP SECRET" ${l==="TOP SECRET"?"selected":""}>TOP SECRET</option>
            </select>
          </div>
          <!-- Document Expiry Timer -->
          <div>
            <label for="edit-expiry" class="block text-xs font-semibold text-slate-400 uppercase tracking-widest font-mono mb-2">Intel Expiry Timer (Self-Destruct)</label>
            <select id="edit-expiry" class="w-full bg-slate-950/80 border border-slate-800 focus:border-teal-500/50 rounded-lg p-2.5 text-base md:text-sm text-slate-200 focus:outline-none transition font-mono cursor-pointer">
              <option value="0" ${i===0?"selected":""}>NEVER</option>
              <option value="60" ${i===60?"selected":""}>1 HOUR</option>
              <option value="720" ${i===720?"selected":""}>12 HOURS</option>
              <option value="1440" ${i===1440?"selected":""}>24 HOURS</option>
              <option value="10080" ${i===10080?"selected":""}>7 DAYS</option>
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
              <button type="button" id="toolbar-audio-btn" class="px-2 py-1 bg-slate-900 border border-slate-850 hover:border-slate-700 text-slate-400 font-mono text-[10px] rounded hover:text-white transition uppercase font-bold">🎙️ Voice Note</button>
              <button type="button" id="toolbar-net-btn" class="px-2 py-1 bg-slate-900 border border-slate-850 hover:border-slate-700 text-slate-400 font-mono text-[10px] rounded hover:text-white transition uppercase font-bold">🌐 Topology</button>
              <button type="button" id="toolbar-classify-btn" class="px-2 py-1 bg-slate-900 border border-slate-850 hover:border-slate-700 text-slate-400 font-mono text-[10px] rounded hover:text-white transition uppercase font-bold">🧠 Auto-Classify</button>
            </div>
            <button type="button" id="toggle-split-btn" class="hidden md:inline-block px-2.5 py-1 bg-slate-900 border border-slate-850 hover:border-slate-700 text-teal-400 hover:text-teal-300 font-mono text-[10px] rounded transition uppercase font-bold">Toggle Split</button>
          </div>
          <div id="editor-layout-grid" class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div id="edit-content-container" class="block relative">
              <textarea id="edit-content" rows="16" required class="w-full bg-slate-950/80 border border-slate-800 focus:border-teal-500/50 rounded-b-lg p-4 text-base md:text-sm text-slate-200 focus:outline-none transition font-mono border-t-0" placeholder="Enter markdown payload here...">${I(n)}</textarea>
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
            <a href="${je?"#/page/home":`#/page/${ee}`}" id="cancel-edit-btn" class="px-4 py-2 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 font-mono text-xs uppercase rounded transition hover:text-white">
              Cancel
            </a>
            <button type="submit" class="px-4 py-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-mono text-xs uppercase rounded font-bold transition shadow-[0_0_10px_rgba(20,184,166,0.15)]">
              Commit Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  `;const u=document.getElementById("edit-page-form"),f=document.getElementById("edit-content"),x=document.getElementById("live-preview-box"),w=document.getElementById("cancel-edit-btn"),h=document.getElementById("discard-draft-btn"),R=document.getElementById("edit-tab-write"),M=document.getElementById("edit-tab-preview"),E=document.getElementById("edit-content-container"),v=document.getElementById("live-preview-container");R&&M&&E&&v&&(R.addEventListener("click",()=>{R.className="flex-1 py-2 text-center text-xs font-mono font-bold border-b-2 border-teal-500 text-teal-400",M.className="flex-1 py-2 text-center text-xs font-mono font-bold border-b-2 border-transparent text-slate-500",E.className="block",v.className="hidden md:block"}),M.addEventListener("click",()=>{M.className="flex-1 py-2 text-center text-xs font-mono font-bold border-b-2 border-teal-500 text-teal-400",R.className="flex-1 py-2 text-center text-xs font-mono font-bold border-b-2 border-transparent text-slate-500",v.className="block",E.className="hidden md:block"}));const L=()=>{const y=f.value,O=document.getElementById("editor-stats");if(O){const T=y.split(/\s+/).filter(se=>se.length>0).length,H=y.length,U=y.split(`
`).length;O.innerText=`Words: ${T} | Chars: ${H} | Lines: ${U}`}if(y.trim().length===0){x.innerHTML='<span class="text-slate-600 font-mono text-xs">No input content.</span>';return}x.innerHTML=Ct(y)};function P(y){const O=y.trim().split(`
`);if(O.length<2)return y;const T=O.map(ge=>{let be=ge.trim();return be.startsWith("|")&&(be=be.slice(1)),be.endsWith("|")&&(be=be.slice(0,-1)),be.split("|").map(Ce=>Ce.trim())}),H=Math.max(...T.map(ge=>ge.length));if(H===0)return y;const U=Array(H).fill(0);for(let ge=0;ge<T.length;ge++){const be=ge===1&&T[ge].every(Ce=>/^:-*-*:?$/.test(Ce)||/^-+$/.test(Ce));for(let Ce=0;Ce<H;Ce++){const Se=T[ge][Ce]||"";!be&&Se.length>U[Ce]&&(U[Ce]=Se.length)}}for(let ge=0;ge<H;ge++)U[ge]=Math.max(U[ge],3);return T.map((ge,be)=>{const Ce=be===1&&ge.every(nt=>/^:-*-*:?$/.test(nt)||/^-+$/.test(nt));return`| ${Array(H).fill("").map((nt,Me)=>{const fe=ge[Me]||"";if(Ce){const We=fe.startsWith(":"),Ke=fe.endsWith(":"),Dt=U[Me]-(We?1:0)-(Ke?1:0);return(We?":":"")+"-".repeat(Math.max(1,Dt))+(Ke?":":"")}else return fe.padEnd(U[Me]," ")}).join(" | ")} |`}).join(`
`)}const j=document.getElementById("toolbar-sketch-btn");j&&j.addEventListener("click",()=>{_i(f)});const ae=document.getElementById("toolbar-audio-btn");ae&&ae.addEventListener("click",()=>{Ji(f)});const J=document.getElementById("toolbar-net-btn");J&&J.addEventListener("click",()=>{sl(f)});const Q=document.getElementById("toolbar-classify-btn");Q&&Q.addEventListener("click",()=>{const y=document.getElementById("edit-title"),O=document.getElementById("edit-classification"),T=document.getElementById("edit-tags"),H=nl(y?y.value:"",f.value);if(O&&(O.value=H.classification),T){const U=new Set(T.value.split(",").map(se=>se.trim()).filter(Boolean));H.suggestedTags.forEach(se=>U.add(se)),T.value=Array.from(U).join(", ")}alert(`✓ SMART ANALYSIS: Document classified as ${H.classification}. Tags updated.`)}),Oi(f);const le=y=>{const O=f.selectionStart,T=f.selectionEnd,H=f.value,U=H.substring(O,T);let se="";switch(y){case"bold":se=`**${U||"bold_text"}**`;break;case"italic":se=`*${U||"italic_text"}*`;break;case"header":se=`
### ${U||"Header text"}
`;break;case"code":se=`
\`\`\`javascript
${U||"// code here"}
\`\`\`
`;break;case"link":se=`[${U||"Link text"}](url)`;break;case"table":if(U&&U.includes("|")&&U.includes(`
`))try{se=`
`+P(U)+`
`}catch{se=`
| Header 1 | Header 2 |
| -------- | -------- |
| Cell 1   | Cell 2   |
`}else se=`
| Header 1 | Header 2 |
| -------- | -------- |
| Cell 1   | Cell 2   |
`;break;case"checklist":se=`
- [ ] ${U||"Task description"}
`;break}f.value=H.substring(0,O)+se+H.substring(T),f.focus(),f.selectionStart=O+se.length,f.selectionEnd=O+se.length,L()};s.querySelectorAll(".format-btn").forEach(y=>{y.addEventListener("click",O=>{const T=O.currentTarget.getAttribute("data-format")||"";le(T)})}),f.addEventListener("keyup",y=>{const O=f.value,T=f.selectionStart;if(O.substring(T-2,T)==="[[")un=!0,fn=T,rs="",Ii(f);else if(un){if(y.key==="Escape"||y.key==="ArrowUp"||y.key==="ArrowDown"||y.key==="Enter")return;const U=O.substring(fn,T);U.includes(`
`)||T<fn?mn():(rs=U,sa(f))}}),f.addEventListener("keydown",y=>{if(un){const O=document.getElementById("autocomplete-popup");if(!O)return;const T=O.querySelectorAll(".editor-autocomplete-item");let H=Array.from(T).findIndex(U=>U.classList.contains("active"));y.key==="ArrowDown"?(y.preventDefault(),T.length>0&&(H>=0&&T[H].classList.remove("active","bg-teal-950/20","text-teal-400"),H=(H+1)%T.length,T[H].classList.add("active","bg-teal-950/20","text-teal-400"),T[H].scrollIntoView({block:"nearest"}))):y.key==="ArrowUp"?(y.preventDefault(),T.length>0&&(H>=0&&T[H].classList.remove("active","bg-teal-950/20","text-teal-400"),H=(H-1+T.length)%T.length,T[H].classList.add("active","bg-teal-950/20","text-teal-400"),T[H].scrollIntoView({block:"nearest"}))):y.key==="Enter"?(y.preventDefault(),H>=0?T[H].click():T.length>0&&T[0].click()):y.key==="Escape"&&(y.preventDefault(),mn())}}),f.addEventListener("input",()=>{L(),W()}),f.addEventListener("keydown",y=>{if(y.ctrlKey&&(y.key==="s"||y.key==="S")){y.preventDefault();const O=document.getElementById("edit-page-form");O&&O.requestSubmit();return}if(y.key==="Tab"){y.preventDefault();const O=f.selectionStart,T=f.selectionEnd;f.value=f.value.substring(0,O)+"  "+f.value.substring(T),f.selectionStart=f.selectionEnd=O+2,L();return}if(y.ctrlKey&&(y.key==="b"||y.key==="B")){y.preventDefault();const O=f.selectionStart,T=f.selectionEnd,H=f.value.substring(O,T),U=`**${H||"bold"}**`;f.value=f.value.substring(0,O)+U+f.value.substring(T),f.selectionStart=O+2,f.selectionEnd=O+2+(H||"bold").length,L();return}if(y.ctrlKey&&(y.key==="i"||y.key==="I")){y.preventDefault();const O=f.selectionStart,T=f.selectionEnd,H=f.value.substring(O,T),U=`*${H||"italic"}*`;f.value=f.value.substring(0,O)+U+f.value.substring(T),f.selectionStart=O+1,f.selectionEnd=O+1+(H||"italic").length,L();return}}),L();const xe=document.getElementById("restore-draft-btn"),Be=document.getElementById("discard-draft-btn"),_=document.getElementById("draft-restore-banner");if(m&&xe&&Be)try{const y=JSON.parse(m);xe.addEventListener("click",()=>{const O=document.getElementById("edit-title"),T=document.getElementById("edit-content");O&&(O.value=y.title||""),T&&(T.value=y.content||"",L()),Array.isArray(y.tags)&&(o=y.tags,C()),_==null||_.remove()}),Be.addEventListener("click",()=>{localStorage.removeItem(c),_==null||_.remove()})}catch{}const N=document.getElementById("tag-pills-container"),k=document.getElementById("tag-pill-input"),g=document.getElementById("tag-pill-dropdown"),A=Array.from(new Set(me.flatMap(y=>y.tags)));function C(){if(!N||!k)return;N.querySelectorAll(".tag-badge-pill").forEach(T=>T.remove()),o.forEach(T=>{const H=document.createElement("span");H.className="tag-badge-pill flex items-center gap-1 text-[10px] font-mono bg-teal-950/40 text-teal-400 px-2 py-1 rounded border border-teal-900/30 select-none",H.innerHTML=`
        #${I(T)}
        <button type="button" class="tag-remove-btn hover:text-red-400 font-bold transition focus:outline-none" data-tag="${I(T)}">×</button>
      `,N.insertBefore(H,k)}),N.querySelectorAll(".tag-remove-btn").forEach(T=>{T.addEventListener("click",H=>{const U=H.currentTarget.getAttribute("data-tag");U&&(o=o.filter(se=>se!==U),C(),W())})})}function F(){if(!g||!k)return;const y=k.value.trim().toLowerCase(),O=A.filter(H=>H.includes(y)&&!o.includes(H));if(O.length===0){g.classList.add("hidden");return}g.innerHTML=O.map(H=>`
      <div class="tag-dropdown-item px-3 py-2 cursor-pointer hover:bg-slate-900 hover:text-white text-slate-350 transition" data-tag="${I(H)}">
        #${I(H)}
      </div>
    `).join(""),g.classList.remove("hidden"),g.querySelectorAll(".tag-dropdown-item").forEach(H=>{H.addEventListener("click",U=>{const se=U.currentTarget.getAttribute("data-tag");se&&!o.includes(se)&&(o.push(se),C(),W()),k.value="",g.classList.add("hidden"),k.focus()})})}k&&(k.addEventListener("keydown",y=>{if(y.key==="Enter"||y.key===","){y.preventDefault();const O=k.value.trim().toLowerCase().replace(/[^a-z0-9-_]/g,"");O&&!o.includes(O)&&(o.push(O),C(),W()),k.value="",g&&g.classList.add("hidden")}else y.key==="Backspace"&&k.value===""&&(o.pop(),C(),W())}),k.addEventListener("input",F),k.addEventListener("focus",F)),C();const B=document.getElementById("editor-layout-grid"),re=document.getElementById("live-preview-container"),S=document.getElementById("toggle-split-btn");function V(){!B||!re||!S||(ln?(B.classList.remove("md:grid-cols-1"),B.classList.add("md:grid-cols-2"),re.classList.remove("md:hidden"),re.classList.add("md:block"),S.textContent="Full Width",S.classList.remove("text-slate-450"),S.classList.add("text-teal-400")):(B.classList.remove("md:grid-cols-2"),B.classList.add("md:grid-cols-1"),re.classList.remove("md:block"),re.classList.add("md:hidden"),S.textContent="Split Screen",S.classList.remove("text-teal-400"),S.classList.add("text-slate-450")))}S&&S.addEventListener("click",()=>{ln=!ln,localStorage.setItem("secops-wiki-split-screen",ln.toString()),V()}),V();const W=()=>{var T;const y=(T=document.getElementById("edit-title"))==null?void 0:T.value,O=f.value;(y||O||o.length>0)&&localStorage.setItem(c,JSON.stringify({title:y,content:O,tags:o,updatedAt:Date.now()}))},Z=setInterval(W,5e3),G=()=>{clearInterval(Z),window.removeEventListener("hashchange",G)};window.addEventListener("hashchange",G);const q=()=>{clearInterval(Z),window.removeEventListener("hashchange",G),localStorage.removeItem(c),mn()};w.addEventListener("click",q),h&&h.addEventListener("click",()=>{var y;q(),(y=document.getElementById("draft-restore-banner"))==null||y.remove(),ta(s)});const K=y=>{g&&!g.contains(y.target)&&y.target!==k&&g.classList.add("hidden")};document.addEventListener("click",K);const te=()=>{document.removeEventListener("click",K),window.removeEventListener("hashchange",te)};window.addEventListener("hashchange",te),u.addEventListener("submit",async y=>{y.preventDefault();const O=document.getElementById("edit-title").value.trim(),T=je?document.getElementById("edit-slug").value.trim().toLowerCase():t,H=f.value,U=document.getElementById("edit-encrypt").checked,se=document.getElementById("edit-classification").value,ge=document.getElementById("edit-expiry"),be=ge?parseInt(ge.value,10):0;if(je&&!/^[a-z0-9-_]+$/.test(T)){alert("Security Alert: Slug contains illegal characters. Use alphanumeric, hyphens, and underscores only.");return}const Ce=o.map(fe=>dn(fe.trim()).toLowerCase()).filter(fe=>fe.length>0),Se=await Ve(T);Se&&await Is({id:`${Se.slug}-${Date.now()}`,slug:Se.slug,title:Se.title,content:Se.content,updatedAt:Se.updatedAt,isEncrypted:Se.isEncrypted,tags:Se.tags,classification:Se.classification,signature:Se.signature});let nt=H;if(U){if(!Y){const fe=prompt("Enter a security passphrase to encrypt this document (min 8 chars, mixed case, numbers, symbols):");if(!fe){alert("Encryption Aborted: A security passphrase is required to save an encrypted document.");return}const We=Yo(fe);if(!We.valid){alert(`SECURITY ERROR: Passphrase too weak.

${We.message}`);return}Y=await Ae(fe)}try{nt=await at(H,Y)}catch(fe){alert(`Encryption failure: ${fe.message}`);return}}const Me={slug:T,title:O,content:nt,updatedAt:Date.now(),tags:Ce,isSystem:a,isEncrypted:U,classification:se};be>0&&(Me.expiresAt=Me.updatedAt+be*60*1e3),Me.signature=await tt(Me);try{await _e(Me),q(),wt.postMessage("refresh"),window.location.hash=`#/page/${T}`}catch(fe){alert(`Database transaction error: ${fe.message}`)}})}function mi(s,e){let t=s.replace(/\.md$/i,"").replace(/[-_]+/g," ");t=t.split(" ").map(r=>r.charAt(0).toUpperCase()+r.slice(1)).join(" ");let n=s.replace(/\.md$/i,"").toLowerCase().replace(/[^a-z0-9-_]+/g,"-"),o=e,a=["imported"];if(e.startsWith("---")){const r=e.indexOf("---",3);if(r!==-1){const l=e.substring(3,r);o=e.substring(r+3).trim(),l.split(`
`).forEach(c=>{const p=c.indexOf(":");if(p!==-1){const m=c.substring(0,p).trim().toLowerCase(),u=c.substring(p+1).trim();m==="title"?t=u.replace(/^["']|["']$/g,""):m==="slug"?n=u.replace(/[^a-z0-9-_]+/g,"-").toLowerCase():m==="tags"&&(a=u.split(",").map(f=>f.trim().replace(/^["']|["']$/g,"")).filter(f=>f.length>0))}})}}return{slug:n,title:t,content:o,updatedAt:Date.now(),tags:a,isSystem:!1}}function gi(s){const e=["Title","Slug","Tags","Word Count","Encrypted","Last Updated"],t=s.map(n=>{const o=n.content.split(/\s+/).filter(a=>a.length>0).length;return[`"${n.title.replace(/"/g,'""')}"`,`"${n.slug}"`,`"${n.tags.join(", ")}"`,o,n.isEncrypted?"TRUE":"FALSE",`"${new Date(n.updatedAt).toISOString()}"`]});return[e.join(","),...t.map(n=>n.join(","))].join(`
`)}function bi(s){let e="";for(const t of s){let n=t.content;if(t.isEncrypted&&Y)try{n=t.content.includes(":")?"🔒 [Encrypted Document: Passphrase Required]":t.content}catch{n="🔒 [Encrypted Document: Passphrase Required]"}const o=Ct(n);e+=`
      <section style="page-break-after: always; margin-bottom: 3rem; border-bottom: 2px solid #e2e8f0; padding-bottom: 2rem;">
        <h1 style="font-size: 2.25rem; font-family: monospace; margin-bottom: 0.5rem; color: #1a202c;">${I(t.title)}</h1>
        <div style="font-size: 0.75rem; color: #718096; font-family: monospace; margin-bottom: 1.5rem;">
          SLUG: ${t.slug} | TAGS: #${t.tags.map(a=>I(a)).join(", #")} | UPDATED: ${new Date(t.updatedAt).toLocaleString()}
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
</html>`}function hi(s){const e=[],t=s.map(o=>`<a href="${o.slug}.html" style="display: block; padding: 0.5rem; color: #94a3b8; text-decoration: none; font-family: monospace; font-size: 0.8rem; border-radius: 4px; transition: background 0.2s;" onmouseover="this.style.background='#1e293b'; this.style.color='#2dd4bf'" onmouseout="this.style.background='transparent'; this.style.color='#94a3b8'">${I(o.title)}</a>`).join(`
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
          <a class="page-title" href="${o.slug}.html">${I(o.title)}</a>
          <div class="metadata">
            SLUG: ${o.slug} | TAGS: #${o.tags.map(a=>I(a)).join(", #")} | UPDATED: ${new Date(o.updatedAt).toLocaleString()}
          </div>
        </div>
      `).join("")}
    </div>
  </main>
</body>
</html>`;return e.push({name:"index.html",content:n}),s.forEach(o=>{let a=o.content;if(o.isEncrypted&&Y)try{a=o.content.includes(":")?"🔒 [Encrypted Document: Decrypted view not exported]":o.content}catch{a="🔒 [Encrypted Document: Decrypted view not exported]"}let r=Ct(a);r=r.replace(/href="#\/page\/([a-z0-9-_]+)"/g,'href="$1.html"');const l=`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${I(o.title)} - SecOps Static Wiki</title>
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
    <h1>${I(o.title)}</h1>
    <div class="metadata">
      Slug: ${o.slug} &nbsp;|&nbsp; 
      Updated: ${new Date(o.updatedAt).toLocaleString()} &nbsp;|&nbsp;
      Tags: ${o.tags.map(i=>`<span class="badge">#${I(i)}</span>`).join("")}
    </div>
    <article class="wiki-content">
      ${r}
    </article>
  </main>
</body>
</html>`;e.push({name:`${o.slug}.html`,content:l})}),Jo(e)}function xi(s){const e=[];let t="",n=!1;for(let i=0;i<s.length;i++){const c=s[i];c==='"'?(n=!n,t+=c):c===`
`&&!n?(e.push(t),t=""):t+=c}if(t&&e.push(t),e.length<2)return[];const o=i=>{const c=[];let p="",m=!1;for(let u=0;u<i.length;u++){const f=i[u];f==='"'?m=!m:f===","&&!m?(c.push(a(p)),p=""):p+=f}return c.push(a(p)),c},a=i=>(i=i.trim(),i.startsWith('"')&&i.endsWith('"')&&(i=i.substring(1,i.length-1)),i.replace(/""/g,'"')),r=o(e[0]).map(i=>i.toLowerCase()),l=[];for(let i=1;i<e.length;i++){if(!e[i].trim())continue;const c=o(e[i]),p={};r.forEach((m,u)=>{p[m]=c[u]||""}),l.push(p)}return l}function yi(s){var l;const e=s.title||"Untitled CSV Import",t=s.content||"";let n=s.slug||e.toLowerCase().replace(/[^a-z0-9-_]+/g,"-");n=n.toLowerCase().replace(/[^a-z0-9-_]+/g,"-"),n||(n=`imported-${Date.now()}`);const a=(s.tags||"imported, csv").split(/[,;|]+/).map(i=>i.trim().toLowerCase()).filter(i=>i.length>0),r=s.updatedat?parseInt(s.updatedat):Date.now();return{slug:n,title:e,content:t,updatedAt:isNaN(r)?Date.now():r,tags:a,isSystem:!1,isEncrypted:((l=s.encrypted)==null?void 0:l.toLowerCase())==="true"}}function wi(s,e){const t=s.split(`
`),n=e.split(`
`),o=Array(t.length+1).fill(0).map(()=>Array(n.length+1).fill(0));for(let i=1;i<=t.length;i++)for(let c=1;c<=n.length;c++)t[i-1]===n[c-1]?o[i][c]=o[i-1][c-1]+1:o[i][c]=Math.max(o[i-1][c],o[i][c-1]);const a=[];let r=t.length,l=n.length;for(;r>0||l>0;)r>0&&l>0&&t[r-1]===n[l-1]?(a.unshift({type:"unchanged",text:t[r-1]}),r--,l--):l>0&&(r===0||o[r][l-1]>=o[r-1][l])?(a.unshift({type:"added",text:n[l-1]}),l--):(a.unshift({type:"removed",text:t[r-1]}),r--);return a}function vi(s,e){return new Promise(t=>{let n=document.getElementById("conflict-diff-modal");n||(n=document.createElement("div"),n.id="conflict-diff-modal",n.className="fixed inset-0 bg-[#090d16]/90 backdrop-blur-md z-[100] flex items-center justify-center p-4",document.body.appendChild(n)),n.classList.remove("hidden");const a=wi(s.content,e.content).map(r=>{let l="diff-line-unchanged",i=" ";return r.type==="added"?(l="diff-line-added px-1 rounded",i="+"):r.type==="removed"&&(l="diff-line-removed px-1 rounded",i="-"),`<div class="font-mono text-xs whitespace-pre-wrap ${l}">${i} ${I(r.text)}</div>`}).join(`
`);n.innerHTML=`
      <div class="glass-panel border border-teal-900/30 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col glow-border shadow-2xl">
        <div class="p-4 border-b border-slate-800 flex items-center justify-between shrink-0">
          <h3 class="text-sm font-bold font-mono text-white uppercase tracking-wider">Conflict Detected: ${I(s.slug)}</h3>
          <span class="text-[10px] font-mono bg-red-950/40 text-red-400 border border-red-900/30 px-2 py-0.5 rounded">SLUG DUP_WARN</span>
        </div>
        
        <div class="p-4 overflow-y-auto space-y-4 flex-1">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-slate-950/50 border border-slate-850 p-3 rounded-lg space-y-2">
              <h4 class="text-xs font-bold font-mono text-teal-400 uppercase">Existing Document</h4>
              <p class="text-xs font-mono text-white"><span class="text-slate-500">TITLE:</span> ${I(s.title)}</p>
              <p class="text-xs font-mono text-white"><span class="text-slate-500">TAGS:</span> ${s.tags.map(r=>`#${r}`).join(", ")}</p>
              <p class="text-[10px] font-mono text-slate-500"><span class="text-slate-500">MODIFIED:</span> ${new Date(s.updatedAt).toLocaleString()}</p>
            </div>
            
            <div class="bg-slate-950/50 border border-slate-850 p-3 rounded-lg space-y-2">
              <h4 class="text-xs font-bold font-mono text-teal-450 uppercase">Imported Document</h4>
              <p class="text-xs font-mono text-white"><span class="text-slate-500">TITLE:</span> ${I(e.title)}</p>
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
    `,document.getElementById("diff-opt-skip").addEventListener("click",()=>{n.classList.add("hidden"),t("SKIP")}),document.getElementById("diff-opt-rename").addEventListener("click",()=>{n.classList.add("hidden"),t("MERGE_RENAME")}),document.getElementById("diff-opt-overwrite").addEventListener("click",()=>{n.classList.add("hidden"),t("OVERWRITE")}),document.getElementById("diff-opt-archive").addEventListener("click",()=>{n.classList.add("hidden"),t("REVISION")})})}async function Jn(s,e){const t=Jr(s),n=await Ve(t.slug);if(n){let o=e;if(e==="ASK"&&(o=await vi(n,t)),o==="SKIP")return!1;if(o==="REVISION")await Is({id:`${n.slug}-${Date.now()}`,slug:n.slug,title:n.title,content:n.content,updatedAt:n.updatedAt,isEncrypted:n.isEncrypted,tags:n.tags,classification:n.classification,signature:n.signature}),t.signature=await tt(t),await _e(t);else if(o==="OVERWRITE")t.signature=await tt(t),await _e(t);else if(o==="MERGE_RENAME"){let a=`${t.slug}-imported`,r=await Ve(a),l=1;for(;r;)a=`${t.slug}-imported-${l}`,r=await Ve(a),l++;t.slug=a,t.title=`${t.title} (Imported)`,t.signature=await tt(t),await _e(t)}}else t.signature=await tt(t),await _e(t);return!0}async function xo(s){var m,u;if(!s||s.length===0)return;const e=((m=document.getElementById("import-conflict-resolution"))==null?void 0:m.value)||"REVISION";let t=0,n=0,o=0,a=0,r=0,l=0,i=0,c=0,p=0;for(let f=0;f<s.length;f++){const x=s[f],w=(u=x.name.split(".").pop())==null?void 0:u.toLowerCase();w==="md"?await new Promise(h=>{const R=new FileReader;R.onload=async M=>{var E;try{const v=(E=M.target)==null?void 0:E.result,L=mi(x.name,v);await Jn(L,e)?t++:a++}catch{i++}h()},R.readAsText(x)}):w==="csv"?await new Promise(h=>{const R=new FileReader;R.onload=async M=>{var E;try{const v=(E=M.target)==null?void 0:E.result,L=xi(v);for(const P of L)try{const j=yi(P);await Jn(j,e)?n++:r++}catch{c++}}catch{c++}h()},R.readAsText(x)}):w==="json"&&await new Promise(h=>{const R=new FileReader;R.onload=async M=>{var E;try{const v=JSON.parse((E=M.target)==null?void 0:E.result);let L=v;if(v&&v.encrypted===!0&&v.payload){const j=prompt("Secure Backup: Enter password to decrypt database backup file:");if(j===null){p++,h();return}try{const ae=await Ae(j),J=await Ee(v.payload,ae);L=JSON.parse(J)}catch{alert("Backup Decryption Alert: Authentication failed. Invalid backup passphrase."),p++,h();return}}else v&&v.encrypted===!1&&v.payload&&(L=v.payload);const P=Array.isArray(L)?L:[L];for(const j of P)try{!j.slug&&j.title&&(j.slug=j.title.toLowerCase().replace(/[^a-z0-9-_]+/g,"-")),j.slug||(j.slug=`imported-item-${Date.now()}-${Math.floor(Math.random()*1e3)}`),j.title||(j.title=j.slug.replace(/[-_]+/g," ")),typeof j.tags=="string"&&(j.tags=j.tags.split(",").map(J=>J.trim()).filter(J=>J.length>0)),Array.isArray(j.tags)||(j.tags=[]),j.classification||(j.classification="UNCLASSIFIED"),typeof j.updatedAt!="number"&&(j.updatedAt=Date.now()),await Jn(j,e)?o++:l++}catch{p++}}catch{p++}h()},R.readAsText(x)})}alert(`INGESTION COMPLETED (Conflict resolution: ${e.toUpperCase()}):

Markdown (.md) files:
- Ingested: ${t}
- Skipped: ${a}
- Failed: ${i}

CSV files (rows):
- Ingested: ${n}
- Skipped: ${r}
- Failed: ${c}

JSON files (records):
- Ingested: ${o}
- Skipped: ${l}
- Failed: ${p}`),wt.postMessage("refresh"),await Le(),await ue()}async function Ei(){const s=document.getElementById("tag-color-palette-manager");if(!s)return;const e=Array.from(new Set(me.flatMap(r=>r.tags))),t=await ms();if(e.length===0){s.innerHTML='<p class="text-xs font-mono text-slate-500">No active document tags registered.</p>';return}let n='<div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">';for(const r of e){const l=t.find(c=>c.tag===r),i=l?l.color:"slate";n+=`
      <div class="flex items-center justify-between p-2 bg-slate-950/40 border border-slate-800 rounded">
        <span class="text-xs font-mono text-slate-400">#${I(r)}</span>
        <div class="flex gap-2 items-center">
          <button class="rename-tag-btn px-2 py-1 bg-slate-900 border border-slate-700 text-xs text-blue-400 hover:text-blue-300 rounded" data-tag="${I(r)}">Rename</button>
          <select class="tag-color-select bg-slate-900 border border-slate-850 text-xs font-mono text-slate-300 rounded px-2 py-1 focus:outline-none focus:border-teal-500 cursor-pointer" aria-label="Select color for tag" aria-label="Select color for tag ${I(r)}" data-tag="${I(r)}">
          <option value="slate" ${i==="slate"?"selected":""}>SLATE GREY</option>
          <option value="emerald" ${i==="emerald"?"selected":""}>EMERALD GREEN</option>
          <option value="blue" ${i==="blue"?"selected":""}>BLUE TEAM</option>
          <option value="red" ${i==="red"?"selected":""}>RED TEAM</option>
          <option value="amber" ${i==="amber"?"selected":""}>AMBER CAUTION</option>
        </select>
        </div>
      </div>
    `}n+="</div>",s.innerHTML=n,s.querySelectorAll(".rename-tag-btn").forEach(r=>{r.addEventListener("click",async l=>{const i=l.currentTarget.getAttribute("data-tag"),c=prompt(`Rename tag "#${i}" to:`);if(c&&c.trim()&&c!==i){const p=c.trim().toLowerCase().replace(/[^a-z0-9-]/g,"");if(p.length>0){for(const m of me)m.tags.includes(i)&&(m.tags=m.tags.map(u=>u===i?p:u),await _e(m));pe("TAG_RENAME",`Renamed tag ${i} to ${p}`),await ue()}}})}),s.querySelectorAll(".tag-color-select").forEach(r=>{r.addEventListener("change",async l=>{const i=l.currentTarget.getAttribute("data-tag"),c=l.currentTarget.value;await $a({tag:i,color:c}),await Es(),await ue()})})}function Wt(s){const e=Array.from(new Set(me.flatMap(_=>_.tags)));s.innerHTML=`
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
              <span class="text-emerald-400 font-bold">${Wo()}</span>
            </li>
            <li class="flex justify-between">
              <span class="text-slate-500">ACTIVE VISUAL THEME:</span>
              <span class="text-emerald-400 font-bold">${ft.toUpperCase()}</span>
            </li>
            <li class="flex justify-between items-center py-0.5">
              <span class="text-slate-500">MASK ENCRYPTED CORES:</span>
              <label class="relative inline-flex items-center cursor-pointer select-none">
                <input type="checkbox" id="system-mask-encrypted-checkbox" aria-label="Mask Encrypted Cores" class="sr-only peer" ${ct?"checked":""}>
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

        <!-- Phase 13 Tools: Steganography & Snapshot Comparer -->
        <div class="glass-panel border border-slate-800 rounded-xl p-5 space-y-4">
          <h3 class="text-sm font-bold font-mono text-white uppercase tracking-wider border-b border-slate-800 pb-2">Tactical Utilities</h3>
          <div class="space-y-2.5">
            <button id="system-snap-btn" class="w-full py-2 bg-slate-900 border border-slate-800 hover:border-teal-500/50 text-teal-400 font-mono text-xs uppercase rounded transition flex items-center justify-center gap-2">
              <span>📸</span> Snapshots & History Diff
            </button>
            <button id="system-steg-btn" class="w-full py-2 bg-slate-900 border border-slate-800 hover:border-teal-500/50 text-teal-400 font-mono text-xs uppercase rounded transition flex items-center justify-center gap-2">
              <span>🖼️</span> Steganography Payload Tool
            </button>
            <button id="system-keychain-btn" class="w-full py-2 bg-slate-900 border border-slate-800 hover:border-teal-500/50 text-teal-400 font-mono text-xs uppercase rounded transition flex items-center justify-center gap-2">
              <span>🔐</span> Encrypted Keychain Vault Export
            </button>
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
              ${e.map(_=>`
                <option value="${I(_)}">#${I(_)}</option>
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
  `;const t=document.getElementById("system-export-btn"),n=document.getElementById("system-export-zip-btn"),o=document.getElementById("system-export-web-zip-btn"),a=document.getElementById("system-export-csv-btn"),r=document.getElementById("system-export-html-btn"),l=document.getElementById("system-unified-import-file"),i=document.getElementById("system-reset-btn"),c=document.getElementById("total-articles-telemetry"),p=document.getElementById("db-health-diagnostics"),m=document.getElementById("system-drop-zone");c.textContent=me.length.toString();const u=document.getElementById("total-tags-telemetry"),f=document.getElementById("total-words-telemetry");if(u){const _=new Set(me.flatMap(N=>N.tags));u.textContent=_.size.toString()}if(f){const _=me.reduce((N,k)=>N+k.content.split(/\s+/).filter(g=>g.length>0).length,0);f.textContent=_.toLocaleString()}const x=document.getElementById("system-telemetry-canvas"),w=document.getElementById("storage-usage-telemetry"),h=document.getElementById("storage-quota-telemetry");navigator.storage&&navigator.storage.estimate?navigator.storage.estimate().then(_=>{const N=_.usage||0,k=_.quota||1;w&&(w.textContent=N<1024?`${N} B`:N<1024*1024?`${(N/1024).toFixed(1)} KB`:`${(N/(1024*1024)).toFixed(1)} MB`),h&&(h.textContent=k<1024*1024*1024?`${(k/(1024*1024)).toFixed(0)} MB`:`${(k/(1024*1024*1024)).toFixed(1)} GB`),x&&bn().then(g=>{Eo(x,g,N,k)})}):(w&&(w.textContent="N/A"),h&&(h.textContent="N/A"),x&&bn().then(_=>{Eo(x,_,0,1)}));const R=document.getElementById("system-compact-btn");R&&R.addEventListener("click",async()=>{if(confirm("STORAGE OPTIMIZATION: This will delete older historical revisions, keeping only the single most recent revision for each page. Proceed?")){let _=0;const N=await Rt();for(const k of N){const g=await aa(k.slug);if(g.length>1)for(let A=1;A<g.length;A++)await To(g[A].id),_++}await pe("REVISION_COMPACT",`Compacted revision history, purged ${_} historical entries.`),alert(`Revision compaction complete. Purged ${_} older revision logs.`),ue()}}),p&&Di(p),Ei();const M=()=>{const _=document.getElementById("export-tag-filter"),N=(_==null?void 0:_.value)||"ALL";return N==="ALL"?me:me.filter(k=>k.tags.includes(N))};t.addEventListener("click",async()=>{const _=M(),N=await Oa(),k={pages:_,attachments:N},g=prompt("Secure Backup: Enter a password to encrypt this database backup file (leave blank for plain JSON):");let A,C=`secops-wiki-backup-${Date.now()}.json`;if(g)try{const re=await Ae(g),S=JSON.stringify(k,null,2),W={encrypted:!0,schemaVersion:4,payload:await at(S,re)};A=new Blob([JSON.stringify(W,null,2)],{type:"application/json"}),C=`secops-wiki-encrypted-backup-${Date.now()}.json`}catch(re){alert(`Backup encryption failed: ${re.message}`);return}else{if(g===null)return;const re={encrypted:!1,schemaVersion:4,payload:k};A=new Blob([JSON.stringify(re,null,2)],{type:"application/json"})}const F=URL.createObjectURL(A),B=document.createElement("a");B.href=F,B.download=C,document.body.appendChild(B),B.click(),document.body.removeChild(B),URL.revokeObjectURL(F)}),n.addEventListener("click",async()=>{const _=M(),N=[];for(const C of _){let F=C.content;if(C.isEncrypted&&Y)try{F=await Ee(C.content,Y)}catch{}const B=`---
title: ${C.title}
slug: ${C.slug}
tags: ${C.tags.join(", ")}
updated: ${new Date(C.updatedAt).toISOString()}
encrypted: ${!!C.isEncrypted}
---

`;N.push({name:`${C.slug}.md`,content:B+F})}const k=Jo(N),g=URL.createObjectURL(k),A=document.createElement("a");A.href=g,A.download=`secops-wiki-backup-${Date.now()}.zip`,document.body.appendChild(A),A.click(),document.body.removeChild(A),URL.revokeObjectURL(g)}),o.addEventListener("click",()=>{const _=M(),N=hi(_),k=URL.createObjectURL(N),g=document.createElement("a");g.href=k,g.download=`secops-wiki-web-${Date.now()}.zip`,document.body.appendChild(g),g.click(),document.body.removeChild(g),URL.revokeObjectURL(k)}),a.addEventListener("click",()=>{const _=M(),N=gi(_),k=new Blob([N],{type:"text/csv;charset=utf-8;"}),g=URL.createObjectURL(k),A=document.createElement("a");A.href=g,A.download=`secops-wiki-report-${Date.now()}.csv`,document.body.appendChild(A),A.click(),document.body.removeChild(A),URL.revokeObjectURL(g)}),r.addEventListener("click",()=>{const _=M(),N=bi(_),k=new Blob([N],{type:"text/html;charset=utf-8;"}),g=URL.createObjectURL(k),A=document.createElement("a");A.href=g,A.download=`secops-wiki-book-${Date.now()}.html`,document.body.appendChild(A),A.click(),document.body.removeChild(A),URL.revokeObjectURL(g)}),l&&l.addEventListener("change",async _=>{const N=_.target.files;N&&N.length>0&&await xo(N)}),["dragenter","dragover","dragleave","drop"].forEach(_=>{m.addEventListener(_,N=>{N.preventDefault(),N.stopPropagation()},!1)}),["dragenter","dragover"].forEach(_=>{m.addEventListener(_,()=>{m.classList.add("border-teal-500","bg-teal-950/10")},!1)}),["dragleave","drop"].forEach(_=>{m.addEventListener(_,()=>{m.classList.remove("border-teal-500","bg-teal-950/10")},!1)}),m.addEventListener("drop",async _=>{const N=_.dataTransfer,k=N==null?void 0:N.files;k&&k.length>0&&await xo(k)}),m.addEventListener("click",()=>{l&&l.click()}),i.addEventListener("click",async()=>{if(!await Gt("HARD WIPING DATABASE AND ALL DOCUMENTS")){alert("Verification Failed: Consent signature rejected.");return}const N=prompt('CRITICAL SECURITY WARNING: Type "WIPE" to verify you want to delete ALL wiki pages and custom documents:');if(N==="WIPE")try{if(await Io(),"caches"in window)try{const k=await caches.keys();for(const g of k)await caches.delete(g)}catch(k){console.warn("Failed to clear caches: ",k)}await fs(),await Es(),alert("Database successfully wiped, caches invalidated, and seeded with standard operating defaults."),localStorage.setItem("secops-wiki-last-update",Date.now().toString()),wt.postMessage("refresh"),await Le(),window.location.hash="#/page/home"}catch(k){alert(`Reset failed: ${k.message}`)}else N!==null&&alert("Sanitization aborted. Confirmation keyword mismatch.")});const E=document.getElementById("system-session-timeout-select");E&&E.addEventListener("change",()=>{localStorage.setItem("secops-wiki-session-timeout",E.value),Ss()});const v=document.getElementById("system-snap-btn");v&&v.addEventListener("click",()=>{us()});const L=document.getElementById("system-steg-btn");L&&L.addEventListener("click",()=>{Qi()});const P=document.getElementById("system-keychain-btn");P&&P.addEventListener("click",()=>{il()});const j=document.getElementById("system-cache-bust-btn");j&&j.addEventListener("click",async()=>{if(confirm("CRITICAL DIAGNOSTICS: Purge cached service worker registrations and static asset cache buckets? This triggers an immediate application reload.")){if("serviceWorker"in navigator){const _=await navigator.serviceWorker.getRegistrations();for(const N of _)await N.unregister()}if("caches"in window){const _=await caches.keys();for(const N of _)await caches.delete(N)}alert("CACHE WIPE COMPLETED. Reloading system..."),window.location.reload()}});const ae=document.getElementById("system-mask-encrypted-checkbox");ae&&ae.addEventListener("change",()=>{ct=ae.checked,localStorage.setItem("secops-wiki-mask-encrypted",ct.toString()),Le().then(()=>{ue()})});const J=document.getElementById("system-db-encrypted-checkbox");J&&J.addEventListener("change",async()=>{if(J.checked){const N=await vo("activate");if(!N){J.checked=!1;return}const k=Yo(N);if(!k.valid){alert(`SECURITY ERROR: Passphrase too weak.

${k.message}`),J.checked=!1;return}try{ye=await Ae(N),localStorage.setItem("secops-wiki-db-encrypted","true");const A=await Vt();for(const C of A)C.isEncryptedAtRest||await _e(C);alert("Database encryption successfully activated. All records are encrypted at rest."),await pe("DB_ENCRYPTION_ENABLED","Activated database encryption-at-rest."),await Le(),Wt(s)}catch(g){alert(`Activation failed: ${g.message}`),J.checked=!1}}else{const N=await vo("deactivate");if(!N){J.checked=!0;return}try{const k=await Ae(N);if(!await ht(k)){alert("Verification Failed: Incorrect master passphrase."),J.checked=!0;return}const A=await Rt();localStorage.setItem("secops-wiki-db-encrypted","false"),localStorage.removeItem("secops-wiki-webauthn-gate"),localStorage.removeItem("secops-wiki-webauthn-payload"),localStorage.removeItem("secops-wiki-webauthn-salt"),ye=null;for(const C of A){const F={slug:C.slug,title:C.title,content:C.content,tags:C.tags,isSystem:C.isSystem,isEncrypted:C.isEncrypted,signature:C.signature,updatedAt:C.updatedAt};await gn(F)}alert("Database encryption-at-rest successfully deactivated."),await pe("DB_ENCRYPTION_DISABLED","Deactivated database encryption-at-rest."),await Le(),Wt(s)}catch(k){alert(`Deactivation failed: ${k.message}`),J.checked=!0}}});const Q=document.getElementById("system-webauthn-register-btn");Q&&Q.addEventListener("click",async()=>{localStorage.getItem("secops-wiki-webauthn-gate")==="true"?confirm("Are you sure you want to deregister biometric credentials?")&&(localStorage.removeItem("secops-wiki-webauthn-gate"),localStorage.removeItem("secops-wiki-webauthn-payload"),localStorage.removeItem("secops-wiki-webauthn-salt"),alert("Biometric unlock credentials removed."),await pe("WEBAUTHN_DEREGISTER","Removed biometric credentials."),Wt(s)):await Pi()}),Qn();const le=document.getElementById("system-prune-audit-btn");le&&le.addEventListener("click",async()=>{confirm("Audit Log Pruning: Confirm deletion of security logs older than 30 days?")&&(await Ao(30),await pe("AUDIT_LOG_PRUNED","Manually pruned audit logs older than 30 days."),await Qn(),alert("Audit logs successfully pruned."))});const xe=document.getElementById("system-wipe-audit-btn");xe&&xe.addEventListener("click",async()=>{if(!await Gt("PURGING AUDIT LOG REGISTERS")){alert("Verification Failed: Consent signature rejected.");return}confirm("CRITICAL ACTION: Are you sure you want to purge the security audit log registers?")&&(await Lo(),await pe("AUDIT_LOG_CLEARED","Security audit log register cleared."),await Qn())}),ps();const Be=document.getElementById("system-wipe-all-drafts-btn");Be&&Be.addEventListener("click",()=>{if(confirm("CRITICAL WARN: Purge all unsaved document draft fragments in local storage?")){const _=[];for(let N=0;N<localStorage.length;N++){const k=localStorage.key(N)||"";k.startsWith("secops-wiki-draft-")&&_.push(k)}_.forEach(N=>localStorage.removeItem(N)),ps()}})}function ps(){const s=document.getElementById("system-drafts-recovery-list");if(!s)return;const e=[];for(let n=0;n<localStorage.length;n++){const o=localStorage.key(n)||"";o.startsWith("secops-wiki-draft-")&&e.push(o)}const t=e.map(n=>{try{const o=localStorage.getItem(n)||"",a=JSON.parse(o),r=n.substring(18);return{key:n,slug:r,title:a.title||"(Untitled)",updatedAt:a.updatedAt||Date.now(),size:o.length}}catch{return null}}).filter(n=>n!==null);if(t.length===0){s.innerHTML='<p class="text-xs font-mono text-slate-500">No unsaved drafts found in local storage.</p>';return}s.innerHTML=t.map(n=>`
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 first:pt-0">
      <div class="min-w-0">
        <p class="text-xs font-mono text-slate-350 truncate">DRAFT // ${I(n.title)}</p>
        <div class="flex items-center gap-2 mt-1 text-[9px] font-mono text-slate-500 uppercase">
          <span>SLUG: ${I(n.slug)}</span>
          <span>•</span>
          <span>SIZE: ${n.size} B</span>
          <span>•</span>
          <span>SAVED: ${new Date(n.updatedAt).toLocaleString()}</span>
        </div>
      </div>
      <div class="flex gap-2 shrink-0 self-start sm:self-auto">
        <button class="draft-action-restore px-2 py-1 bg-slate-900 border border-slate-800 hover:border-slate-700 text-teal-400 hover:text-teal-300 font-mono text-[10px] rounded transition uppercase" data-slug="${I(n.slug)}">
          Restore
        </button>
        <button class="draft-action-wipe px-2 py-1 bg-red-950/20 border border-red-900/30 hover:bg-red-900/30 text-red-400 hover:text-red-300 font-mono text-[10px] rounded transition uppercase" data-key="${I(n.key)}">
          Wipe
        </button>
      </div>
    </div>
  `).join(""),s.querySelectorAll(".draft-action-restore").forEach(n=>{n.addEventListener("click",o=>{const a=o.currentTarget.getAttribute("data-slug");ot=!0,je=a==="new",ee=a,window.location.hash=je?"#/new":`#/edit/${a}`})}),s.querySelectorAll(".draft-action-wipe").forEach(n=>{n.addEventListener("click",o=>{const a=o.currentTarget.getAttribute("data-key");localStorage.removeItem(a),ps()})})}function qt(){const s=document.getElementById("command-palette-backdrop");if(s)if(qn=!qn,qn){s.classList.remove("hidden");const e=document.getElementById("command-palette-input");e&&(e.value="",e.focus()),ze=0,kn()}else s.classList.add("hidden")}function na(){if(document.getElementById("command-palette-backdrop"))return;const s=document.createElement("div");s.id="command-palette-backdrop",s.className="fixed inset-0 bg-[#090d16]/85 backdrop-blur-md z-50 flex items-start justify-center pt-20 hidden",s.innerHTML=`
    <div class="glass-panel border border-teal-900/30 rounded-xl w-full max-w-lg overflow-hidden shadow-2xl mx-4 glow-border">
      <input type="text" id="command-palette-input" aria-label="Search pages or run system commands" placeholder="Search pages or run system commands..." class="w-full bg-slate-950/80 text-white font-mono text-sm p-4 outline-none border-b border-slate-800 focus:border-teal-500/30 placeholder-slate-500 transition">
      <div id="command-palette-results" class="max-h-80 overflow-y-auto divide-y divide-slate-850/40 p-2 space-y-1"></div>
    </div>
  `,document.body.appendChild(s);const e=document.getElementById("command-palette-input");e.addEventListener("input",()=>{ze=0,kn()}),e.addEventListener("keydown",Si),s.addEventListener("click",t=>{t.target===s&&qt()})}function kn(){const s=document.getElementById("command-palette-input"),e=document.getElementById("command-palette-results");if(!e)return;const t=s?s.value.trim().toLowerCase():"",n=[{title:"CREATE NEW PAGE",subtitle:"Open the editor to establish a new document",icon:"➕",action:()=>{window.location.hash="#/new"}},{title:"TOGGLE THEME",subtitle:`Switch visual style (currently ${ft})`,icon:"🌓",action:()=>{Zo()}},{title:"SYSTEM ADMIN",subtitle:"Access operations console and db diagnostics",icon:"⚙️",action:()=>{window.location.hash="#/system"}},{title:"TACTICAL MAP VIEW",subtitle:"Display interactive node relationship map",icon:"🗺️",action:()=>{window.location.hash="#/graph"}},{title:"PANIC PURGE PROTOCOL",subtitle:"Emergency self-destruct - wipes all data",icon:"🚨",action:()=>{const p=document.getElementById("system-panic-btn");p&&p.click()}}];let o="",a=0;const r=n.filter(p=>p.title.toLowerCase().includes(t)||p.subtitle.toLowerCase().includes(t));let l=[];t?l=me.map(p=>({page:p,score:Xo(bt.find(m=>m.slug===p.slug)||p,t)})).filter(p=>p.score>0).sort((p,m)=>m.score-p.score):l=me.slice(0,5).map(p=>({page:p,score:0}));const i=r.length+l.length;ze>=i?ze=0:ze<0&&(ze=i-1),r.forEach(p=>{o+=`
      <div class="command-palette-item p-3 rounded-lg flex items-center justify-between cursor-pointer font-mono text-xs transition-all ${a===ze?"command-item-active bg-teal-950/20 text-teal-400 border-l-2 border-teal-500":"text-slate-400 hover:bg-slate-900/40 hover:text-slate-200"}" data-index="${a}">
        <div class="flex items-center gap-3">
          <span class="text-base">${p.icon}</span>
          <div>
            <div class="font-bold text-white uppercase">${p.title}</div>
            <div class="text-[10px] text-slate-500">${p.subtitle}</div>
          </div>
        </div>
        <span class="text-[10px] text-slate-650 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-900 uppercase">CMD</span>
      </div>
    `,a++}),l.forEach(p=>{const m=a===ze,u=p.page,f=bt.find(h=>h.slug===u.slug)||u,x=t?Vi(f.content,t):"",w=x?`<div class="text-[9px] text-teal-400/80 font-mono mt-0.5 max-w-md truncate">${I(x)}</div>`:"";o+=`
      <div class="command-palette-item p-3 rounded-lg flex items-center justify-between cursor-pointer font-mono text-xs transition-all ${m?"command-item-active bg-teal-950/20 text-teal-400 border-l-2 border-teal-500":"text-slate-400 hover:bg-slate-900/40 hover:text-slate-200"}" data-index="${a}">
        <div class="flex items-center gap-3 min-w-0">
          <span class="text-base shrink-0">${u.isEncrypted?"🔒":"📄"}</span>
          <div class="min-w-0">
            <div class="font-bold text-white truncate">${I(u.title)}</div>
            <div class="text-[10px] text-slate-500 truncate">Slug: ${I(u.slug)} ${u.tags.length?`• tags: #${u.tags.map(h=>I(h)).join(", #")}`:""}</div>
            ${w}
          </div>
        </div>
        <span class="text-[10px] text-slate-650 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-900 uppercase shrink-0">PAGE</span>
      </div>
    `,a++}),i===0&&(o='<div class="text-center py-6 text-xs text-slate-600 font-mono">No matching commands or pages found.</div>'),e.innerHTML=o,e.querySelectorAll(".command-palette-item").forEach(p=>{p.addEventListener("click",()=>{const m=parseInt(p.getAttribute("data-index")||"0",10);ki(m,r,l)})}),Ti()}function ki(s,e,t){if(qt(),s<e.length)e[s].action();else{const n=s-e.length;n<t.length&&(window.location.hash=`#/page/${t[n].page.slug}`)}}function Si(s){const e=document.getElementById("command-palette-results");if(!e)return;const t=e.querySelectorAll(".command-palette-item");if(t.length!==0)if(s.key==="ArrowDown")s.preventDefault(),ze=(ze+1)%t.length,kn();else if(s.key==="ArrowUp")s.preventDefault(),ze=(ze-1+t.length)%t.length,kn();else if(s.key==="Enter"){s.preventDefault();const n=e.querySelector(".command-item-active");n&&n.click()}else s.key==="Escape"&&(s.preventDefault(),qt())}function Ti(){const s=document.getElementById("command-palette-results");if(!s)return;const e=s.querySelector(".command-item-active");e&&e.scrollIntoView({block:"nearest"})}function Ii(s){const e=document.getElementById("autocomplete-popup");e&&(e.classList.remove("hidden"),sa(s))}function mn(){const s=document.getElementById("autocomplete-popup");s&&(s.classList.add("hidden"),un=!1)}function sa(s){const e=document.getElementById("autocomplete-popup");if(!e)return;const t=rs.toLowerCase().trim(),n=me.filter(a=>a.title.toLowerCase().includes(t)||a.slug.toLowerCase().includes(t));if(n.length===0){e.innerHTML='<div class="p-2 text-slate-500 italic">No matches found</div>';return}e.innerHTML=n.map((a,r)=>`
    <div class="editor-autocomplete-item p-2 cursor-pointer transition ${r===0?"active bg-teal-950/20 text-teal-400":"text-slate-400 hover:bg-slate-900/40 hover:text-slate-200"}" data-slug="${I(a.slug)}" data-title="${I(a.title)}">
      <span class="font-bold">${I(a.title)}</span>
      <span class="text-[9px] text-slate-500 block truncate">Slug: ${I(a.slug)}</span>
    </div>
  `).join(""),e.querySelectorAll(".editor-autocomplete-item").forEach(a=>{a.addEventListener("click",r=>{const l=r.currentTarget,i=l.getAttribute("data-slug")||"",c=l.getAttribute("data-title")||"";Ai(s,c,i)})});const o=Li(s,s.selectionStart);e.style.left=`${Math.min(s.clientWidth-260,Math.max(16,o.left))}px`,e.style.top=`${Math.min(s.clientHeight-100,Math.max(40,o.top+20))}px`}function Li(s,e){const n=s.value.substring(0,e).split(`
`),o=n.length-1,a=n[o],r=8,l=20,i=16+a.length*r%(s.clientWidth-40),c=12+o*l-s.scrollTop;return{left:i,top:c}}function Ai(s,e,t){const n=fn-2,o=s.selectionStart,a=s.value,r=`[${e}](#/page/${t})`;s.value=a.substring(0,n)+r+a.substring(o),s.focus(),s.selectionStart=n+r.length,s.selectionEnd=n+r.length,mn();const l=document.getElementById("live-preview-box");l&&(l.innerHTML=Ct(s.value))}async function Ci(s,e,t){const n=await Ve(s);if(!n)return;let o=n.content;const a=!!n.isEncrypted;if(a){if(!Y){alert("Authentication Error: Decryption key is missing. Re-decrypt page first.");return}try{o=await Ee(o,Y)}catch{alert("Decryption failure.");return}}let r=0;const l=/([-*+]\s+\[)([ xX])(\])/g,i=o.replace(l,(m,u,f,x)=>r===e?(r++,`${u}${t?"x":" "}${x}`):(r++,m));let c=i;a&&Y&&(c=await at(i,Y)),n.content=c,n.updatedAt=Date.now(),n.signature=await tt(n),await _e(n),wt.postMessage("refresh"),await Le();const p=document.getElementById("main-content");p&&await En(p)}function oa(s){const e=[],t=/(?:\(|"|^|\s)#\/page\/([a-z0-9-_]+)/g;let n;for(;(n=t.exec(s))!==null;)e.push(n[1].toLowerCase());return Array.from(new Set(e))}async function Ri(s){s.innerHTML=`
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
  `;const e=document.getElementById("tactical-map-canvas");if(!e)return;const t=e.getContext("2d");if(!t)return;const n=window.devicePixelRatio||1,o=e.getBoundingClientRect();e.width=o.width*n,e.height=500*n,t.scale(n,n);const a=o.width,r=500;let l=1,i=0,c=0,p=!1,m=0,u=0;const f=me.map(S=>{const V=a/2+(Math.random()-.5)*100,W=r/2+(Math.random()-.5)*100;return{id:S.slug,title:S.title,x:V,y:W,vx:0,vy:0,radius:S.slug==="home"?14:10,isEncrypted:!!S.isEncrypted,isSystem:!!S.isSystem}}),x=[],w=new Set(f.map(S=>S.id));for(const S of me){let V=S.content;if(S.isEncrypted&&Y)try{V=await Ee(S.content,Y)}catch{}oa(V).forEach(Z=>{w.has(Z)&&Z!==S.slug&&x.push({source:S.slug,target:Z})})}let h=null,R=null,M=0,E=0,v=0,L="";const P=document.getElementById("map-search-input");P&&P.addEventListener("input",S=>{L=S.target.value.trim().toLowerCase()});const j=.02,ae=1200,J=.85,Q=.02;function le(S,V){const W=(S-a/2-i)/l+a/2,Z=(V-r/2-c)/l+r/2;return{x:W,y:Z}}function xe(){for(let S=0;S<f.length;S++){const V=f[S];for(let W=S+1;W<f.length;W++){const Z=f[W],G=Z.x-V.x,q=Z.y-V.y,K=G*G+q*q+.1,te=Math.sqrt(K);if(te<250){const y=ae/K,O=G/te*y,T=q/te*y;V!==h&&(V.vx-=O,V.vy-=T),Z!==h&&(Z.vx+=O,Z.vy+=T)}}}x.forEach(S=>{const V=f.find(O=>O.id===S.source),W=f.find(O=>O.id===S.target);if(!V||!W)return;const Z=W.x-V.x,G=W.y-V.y,q=Math.sqrt(Z*Z+G*G)||.1,K=(q-100)*j,te=Z/q*K,y=G/q*K;V!==h&&(V.vx+=te,V.vy+=y),W!==h&&(W.vx-=te,W.vy-=y)}),f.forEach(S=>{if(S===h)return;const V=a/2-S.x,W=r/2-S.y;S.vx+=V*Q,S.vy+=W*Q,S.x+=S.vx,S.y+=S.vy,S.vx*=J,S.vy*=J,S.x=Math.max(S.radius,Math.min(a-S.radius,S.x)),S.y=Math.max(S.radius,Math.min(r-S.radius,S.y))})}function Be(){t.clearRect(0,0,a,r),t.save(),t.translate(a/2+i,r/2+c),t.scale(l,l),t.translate(-a/2,-r/2),t.lineWidth=1,x.forEach(S=>{const V=f.find(y=>y.id===S.source),W=f.find(y=>y.id===S.target);if(!V||!W)return;const Z=L.length>0,G=Z&&V.title.toLowerCase().includes(L),q=Z&&W.title.toLowerCase().includes(L),K=R&&(R.id===V.id||R.id===W.id);let te=.4;Z&&(te=G&&q?.6:.05),t.strokeStyle=K?"rgba(20, 184, 166, 0.6)":`rgba(30, 41, 59, ${te})`,t.lineWidth=K?1.5/l:1/l,t.beginPath(),t.moveTo(V.x,V.y),t.lineTo(W.x,W.y),t.stroke()}),f.forEach(S=>{t.beginPath();const V=L.length>0,W=V&&S.title.toLowerCase().includes(L);let Z=S.radius,G=1,q=0;if(V)if(W){const T=Math.sin(Date.now()/150)*2+3;Z=S.radius+T,q=15,G=1}else G=.2;t.arc(S.x,S.y,Z,0,2*Math.PI);let K="#14b8a6",te="rgba(20, 184, 166, 0.4)";S.isEncrypted?(K="#ef4444",te="rgba(239, 68, 68, 0.4)"):S.isSystem&&(K="#3b82f6",te="rgba(59, 130, 246, 0.4)"),t.fillStyle=K,t.globalAlpha=G,t.shadowColor=te,t.shadowBlur=R===S?12:q||6,t.fill(),t.shadowBlur=0,t.strokeStyle=`rgba(255, 255, 255, ${.1*G})`,t.lineWidth=1.5/l,t.stroke();const O=S.isEncrypted&&!Y&&ct?"[REDACTED CORE]":S.title;t.fillStyle=R===S||W?`rgba(255, 255, 255, ${G})`:`rgba(148, 163, 184, ${G})`,t.font=R===S||W?`bold ${10/l}px monospace`:`${9/l}px monospace`,t.textAlign="center",t.fillText(O,S.x,S.y-Z-5/l)}),t.restore(),t.globalAlpha=1}function _(){xe(),Be(),v=requestAnimationFrame(_)}e.addEventListener("mousemove",S=>{const V=e.getBoundingClientRect(),W=S.clientX-V.left,Z=S.clientY-V.top,G=le(W,Z);if(M=G.x,E=G.y,h){(Math.abs(S.clientX-k)>4||Math.abs(S.clientY-g)>4)&&(N=!0),h.x=M,h.y=E,h.vx=0,h.vy=0;return}if(p){i=W-m,c=Z-u;return}R=null;for(const q of f){const K=q.x-M,te=q.y-E;if(K*K+te*te<(q.radius+5)*(q.radius+5)){R=q;break}}});let N=!1,k=0,g=0;e.addEventListener("mousedown",S=>{const V=e.getBoundingClientRect(),W=S.clientX-V.left,Z=S.clientY-V.top;if(R){h=R,N=!1,k=S.clientX,g=S.clientY;const G=le(W,Z);h.x=G.x,h.y=G.y}else p=!0,m=W-i,u=Z-c}),e.addEventListener("wheel",S=>{S.preventDefault();const V=e.getBoundingClientRect(),W=S.clientX-V.left,Z=S.clientY-V.top,G=le(W,Z),q=S.deltaY<0?1.1:.9;l=Math.max(.2,Math.min(4,l*q)),i=W-(G.x-a/2)*l-a/2,c=Z-(G.y-r/2)*l-r/2},{passive:!1});const A=()=>{h=null,p=!1};window.addEventListener("mouseup",A),e.addEventListener("click",()=>{R&&!N&&!p&&(cancelAnimationFrame(v),window.location.hash=`#/page/${R.id}`)});const C=document.getElementById("map-zoom-in"),F=document.getElementById("map-zoom-out"),B=document.getElementById("map-zoom-reset");C.addEventListener("click",()=>{l=Math.min(4,l*1.2)}),F.addEventListener("click",()=>{l=Math.max(.2,l/1.2)}),B.addEventListener("click",()=>{l=1,i=0,c=0}),_();const re=()=>{cancelAnimationFrame(v),window.removeEventListener("mouseup",A),window.removeEventListener("hashchange",re)};window.addEventListener("hashchange",re)}async function Di(s){s.innerHTML=`
    <div class="text-xs font-mono text-slate-500 animate-pulse">Running security & link integrity scan...</div>
  `;const e=await Rt();let t=0;const n=new TextEncoder;e.forEach(c=>{const p=JSON.stringify(c);t+=n.encode(p).length});const o=t<1024?`${t} Bytes`:t<1024*1024?`${(t/1024).toFixed(2)} KB`:`${(t/(1024*1024)).toFixed(2)} MB`,a=new Set(e.map(c=>c.slug)),r={};e.forEach(c=>{r[c.slug]=[]});const l=[];for(const c of e){let p=c.content;if(c.isEncrypted&&Y)try{p=await Ee(c.content,Y)}catch{}oa(p).forEach(u=>{a.has(u)?u!==c.slug&&r[u].push(c.slug):l.push({source:c.slug,target:u})})}const i=e.filter(c=>c.slug!=="home"&&r[c.slug].length===0);s.innerHTML=`
    <div class="glass-panel border border-slate-800 rounded-xl p-5 space-y-4 font-mono text-xs">
      <h3 class="text-sm font-bold font-mono text-white uppercase tracking-wider border-b border-slate-800 pb-2">Database Integrity Report</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-slate-950/50 border border-slate-850 p-3 rounded-lg text-center">
          <div class="text-[10px] text-slate-500 font-mono uppercase">Total Database Footprint</div>
          <div class="text-base font-bold text-teal-400 font-mono mt-1">${o}</div>
        </div>
        <div class="bg-slate-950/50 border border-slate-850 p-3 rounded-lg text-center">
          <div class="text-[10px] text-slate-500 font-mono uppercase">Broken Reference Citations</div>
          <div class="text-base font-bold font-mono mt-1 ${l.length>0?"text-red-400 animate-pulse":"text-emerald-400"}">${l.length}</div>
        </div>
        <div class="bg-slate-950/50 border border-slate-850 p-3 rounded-lg text-center">
          <div class="text-[10px] text-slate-500 font-mono uppercase">Orphaned Intel Documents</div>
          <div class="text-base font-bold font-mono mt-1 ${i.length>0?"text-amber-500":"text-emerald-400"}">${i.length}</div>
        </div>
      </div>

      <!-- Details -->
      <div class="space-y-3 pt-2 text-xs font-mono">
        <!-- Broken Links Details -->
        <div>
          <span class="text-slate-400 font-bold uppercase block mb-1">Broken Links Analysis:</span>
          ${l.length===0?`
            <span class="text-emerald-400 text-[10px]">✓ All internal page link references verified intact.</span>
          `:`
            <div class="max-h-24 overflow-y-auto space-y-1 pr-1">
              ${l.map(c=>`
                <div class="text-[10px] text-red-400/80">📄 [${I(c.source)}] references non-existent [${I(c.target)}]</div>
              `).join("")}
            </div>
          `}
        </div>

        <!-- Orphan Details -->
        <div>
          <span class="text-slate-400 font-bold uppercase block mb-1">Orphaned Documents (No incoming links):</span>
          ${i.length===0?`
            <span class="text-emerald-400 text-[10px]">✓ All custom documents linked to operational flows.</span>
          `:`
            <div class="max-h-24 overflow-y-auto space-y-1 pr-1">
              ${i.map(c=>`
                <div class="text-[10px] text-amber-500/80">📄 [${I(c.title)}] (slug: ${I(c.slug)}) has zero citations</div>
              `).join("")}
            </div>
          `}
        </div>
      </div>
    </div>
  `}let bt=[];async function $i(){bt=[];for(const s of me){let e=s.content,t=s.title;if(s.isEncrypted&&Y&&s.slug===ee)try{e=await Ee(s.content,Y)}catch{}bt.push({...s,content:e,title:t})}}async function Is(s){if(localStorage.getItem("secops-wiki-db-encrypted")==="true"&&ye){const t={title:s.title,content:s.content,isEncrypted:s.isEncrypted,updatedAt:s.updatedAt,tags:s.tags,classification:s.classification,signature:s.signature},n=await at(JSON.stringify(t),ye),o={id:s.id,slug:s.slug,title:"[REDACTED AT REST]",content:"[REDACTED AT REST]",updatedAt:s.updatedAt,isEncryptedAtRest:!0,encryptedData:n};await Vs(o)}else await Vs(s);try{const t=await So(s.slug);if(t.length>20)for(let n=20;n<t.length;n++)await To(t[n].id)}catch(t){console.warn("Failed to compact revisions for slug:",s.slug,t)}}async function aa(s){const e=await So(s),t=[];for(const n of e)if(n.isEncryptedAtRest&&n.encryptedData){if(!ye){t.push({id:n.id,slug:n.slug,title:"[DATABASE LOCKED]",content:"Master passphrase required to unlock this database record.",updatedAt:n.updatedAt,isEncrypted:!1});continue}try{const o=await Ee(n.encryptedData,ye),a=JSON.parse(o);t.push({id:n.id,slug:n.slug,title:a.title,content:a.content,updatedAt:a.updatedAt,isEncrypted:a.isEncrypted,tags:a.tags,classification:a.classification,signature:a.signature})}catch(o){console.error("Failed to decrypt revision at rest:",o)}}else t.push(n);return t}async function ht(s){const e=await Vt();for(const t of e)if(t.isEncryptedAtRest&&t.encryptedData)try{return await Ee(t.encryptedData,s),!0}catch{return!1}return!0}function Ni(){let s=document.getElementById("master-unlock-overlay");s||(s=document.createElement("div"),s.id="master-unlock-overlay",s.className="fixed inset-0 bg-[#060814]/98 backdrop-blur-xl z-[100] flex items-center justify-center p-4",document.body.appendChild(s));const t=localStorage.getItem("secops-wiki-webauthn-gate")==="true"?`
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
  `;const n=document.getElementById("master-unlock-form"),o=document.getElementById("master-unlock-input"),a=document.getElementById("master-unlock-error"),r=document.getElementById("master-unlock-wipe-btn"),l=document.getElementById("master-unlock-biometric-btn");setTimeout(()=>o==null?void 0:o.focus(),50),n.addEventListener("submit",async i=>{i.preventDefault(),a.classList.add("hidden");const c=o.value;try{const p=await Ae(c);await ht(p)?(ye=p,ra()):(a.classList.remove("hidden"),o.value="",o.focus(),await pe("DECRYPT_FAIL","Master database unlock attempt with invalid passphrase."))}catch(p){a.textContent=`ERROR: ${p.message.toUpperCase()}`,a.classList.remove("hidden")}}),r.addEventListener("click",async()=>{if(!await Gt("WIPING THE ENTIRE DATABASE")){alert("Verification Failed: Consent signature rejected.");return}confirm("CRITICAL ACTION: Are you sure you want to completely wipe this database? All encrypted records and system procedures will be permanently deleted.")&&prompt('Type "WIPE" to confirm sanitization:')==="WIPE"&&(await Io(),await fs(),localStorage.removeItem("secops-wiki-db-encrypted"),localStorage.removeItem("secops-wiki-webauthn-gate"),localStorage.removeItem("secops-wiki-webauthn-payload"),localStorage.removeItem("secops-wiki-webauthn-salt"),ye=null,s.remove(),alert("Database successfully wiped and reset to default plaintext configuration."),window.location.reload())}),l&&l.addEventListener("click",async()=>{await Mi()})}function ra(){const s=document.getElementById("master-unlock-overlay");s&&s.remove(),pe("SESSION_UNLOCK","Database session unlocked and decrypted at rest."),Le().then(()=>{ea(),na(),window.addEventListener("hashchange",vn),window.addEventListener("online",wn),window.addEventListener("offline",wn),vn()})}function Oi(s){const e=async t=>{const n=new FileReader;n.onload=async()=>{const o=n.result.split(",")[1],a=`att-${Date.now()}-${Math.random().toString(36).substring(2,9)}`;let r=Y||ye,l=o;if(r)try{l=await at(o,r)}catch(u){console.error("Failed to encrypt attachment:",u)}const i={id:a,name:t.name,mimeType:t.type,data:l};await Na(i),await pe("ATTACHMENT_SAVE",`Saved attachment ${t.name} (ID: ${a}, size: ${t.size} bytes).`);const c=t.type.startsWith("image/")?`![${t.name}](attachment://${a})`:`[Attachment: ${t.name}](attachment://${a})`,p=s.selectionStart,m=s.selectionEnd;s.value=s.value.substring(0,p)+c+s.value.substring(m),s.selectionStart=s.selectionEnd=p+c.length,s.dispatchEvent(new Event("input"))},n.readAsDataURL(t)};s.addEventListener("dragover",t=>{t.preventDefault()}),s.addEventListener("drop",async t=>{var o;t.preventDefault();const n=(o=t.dataTransfer)==null?void 0:o.files;if(n&&n.length>0)for(let a=0;a<n.length;a++)await e(n[a])}),s.addEventListener("paste",async t=>{var o;const n=(o=t.clipboardData)==null?void 0:o.items;if(n){for(let a=0;a<n.length;a++)if(n[a].kind==="file"){const r=n[a].getAsFile();r&&await e(r)}}})}async function Bi(s){const e=s.querySelectorAll('img[src^="attachment://"]');for(const n of Array.from(e)){const o=n.src.replace("attachment://","").split("/").pop()||"",a=await Ks(o);if(a){const r=await yo(a);r&&(n.src=r)}}const t=s.querySelectorAll('a[href^="attachment://"]');for(const n of Array.from(t)){const o=n.href.replace("attachment://","").split("/").pop()||"",a=await Ks(o);if(a){const r=await yo(a);r&&(n.href=r,n.download=a.name)}}}async function yo(s){let e=s.data;if(e.includes(":")){let t=null;if(Y)try{t=await Ee(e,Y)}catch{}if(!t&&ye)try{t=await Ee(e,ye)}catch{}if(!t)return null;e=t}try{const t=atob(e),n=new Uint8Array(t.length);for(let a=0;a<t.length;a++)n[a]=t.charCodeAt(a);const o=new Blob([n],{type:s.mimeType});return URL.createObjectURL(o)}catch(t){return console.error("Failed to parse base64 for attachment:",t),null}}async function Qn(){const s=document.getElementById("system-audit-logs-list");if(!s)return;const e=await bn();if(e.length===0){s.innerHTML='<p class="text-xs font-mono text-slate-500">No security audit logs found.</p>';return}s.innerHTML=`
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
            <td class="py-1.5 font-bold ${t.event.includes("FAIL")||t.event.includes("DELETE")||t.event.includes("WIPE")?"text-red-400":"text-teal-400"}">${I(t.event)}</td>
            <td class="py-1.5 text-slate-400 max-w-xs truncate" title="${I(t.details)}">${I(t.details)}</td>
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
  `,e.classList.remove("hidden");const t=document.getElementById("sketch-canvas"),n=t.getContext("2d"),o=window.devicePixelRatio||1,a=600,r=350;t.width=a*o,t.height=r*o,t.style.width=`${a}px`,t.style.height=`${r}px`,n.scale(o,o),n.lineCap="round",n.lineJoin="round",n.strokeStyle="#ffffff",n.lineWidth=5,n.fillStyle="#060814",n.fillRect(0,0,a,r);let l=!1,i="pen",c="#ffffff",p=0,m=0,u;const f=[],x=[];f.push(n.getImageData(0,0,t.width,t.height));const w=k=>{const g=t.getBoundingClientRect(),A="touches"in k?k.touches[0].clientX:k.clientX,C="touches"in k?k.touches[0].clientY:k.clientY;return{x:(A-g.left)*(a/g.width),y:(C-g.top)*(r/g.height)}},h=k=>{l=!0;const g=w(k);p=g.x,m=g.y,u=n.getImageData(0,0,t.width,t.height),(i==="pen"||i==="eraser")&&(n.beginPath(),n.moveTo(p,m)),k.preventDefault()},R=k=>{if(!l)return;const g=w(k),A=parseInt(ae.value,10);if(i==="pen"||i==="eraser")n.lineTo(g.x,g.y),n.strokeStyle=i==="eraser"?"#060814":c,n.lineWidth=A,n.stroke();else if(n.putImageData(u,0,0),n.beginPath(),n.strokeStyle=c,n.lineWidth=A,i==="line")n.moveTo(p,m),n.lineTo(g.x,g.y),n.stroke();else if(i==="arrow"){n.moveTo(p,m),n.lineTo(g.x,g.y),n.stroke();const C=Math.atan2(g.y-m,g.x-p),F=Math.max(10,A*2.5);n.beginPath(),n.moveTo(g.x,g.y),n.lineTo(g.x-F*Math.cos(C-Math.PI/6),g.y-F*Math.sin(C-Math.PI/6)),n.lineTo(g.x-F*Math.cos(C+Math.PI/6),g.y-F*Math.sin(C+Math.PI/6)),n.closePath(),n.fillStyle=c,n.fill()}else if(i==="rect")n.rect(p,m,g.x-p,g.y-m),n.stroke();else if(i==="circle"){const C=Math.sqrt(Math.pow(g.x-p,2)+Math.pow(g.y-m,2));n.arc(p,m,C,0,2*Math.PI),n.stroke()}k.preventDefault()},M=()=>{l&&((i==="pen"||i==="eraser")&&n.closePath(),l=!1,f.push(n.getImageData(0,0,t.width,t.height)),x.length=0)},E=()=>{if(f.length>1){const k=f.pop();x.push(k);const g=f[f.length-1];n.putImageData(g,0,0)}},v=()=>{if(x.length>0){const k=x.pop();f.push(k),n.putImageData(k,0,0)}};t.addEventListener("mousedown",h),t.addEventListener("mousemove",R),window.addEventListener("mouseup",M),t.addEventListener("touchstart",h,{passive:!1}),t.addEventListener("touchmove",R,{passive:!1}),window.addEventListener("touchend",M);const L=k=>{k.ctrlKey&&k.key==="z"?(k.preventDefault(),E()):k.ctrlKey&&k.key==="y"&&(k.preventDefault(),v())};window.addEventListener("keydown",L);const P=["pen","eraser","line","arrow","rect","circle"],j=k=>{i=k,P.forEach(g=>{const A=document.getElementById(`draw-tool-${g}`);g===k?A.className="px-2 py-1 bg-teal-950/40 border border-teal-800 text-teal-400 font-mono text-[10px] rounded font-bold uppercase":A.className="px-2 py-1 bg-slate-900 border border-slate-850 text-slate-400 font-mono text-[10px] rounded hover:text-white uppercase"})};P.forEach(k=>{document.getElementById(`draw-tool-${k}`).addEventListener("click",()=>j(k))});const ae=document.getElementById("draw-brush-size"),J=document.getElementById("draw-clear-btn"),Q=document.getElementById("draw-cancel-btn"),le=document.getElementById("draw-save-btn"),xe=document.getElementById("draw-color-palette"),Be=document.getElementById("draw-undo-btn"),_=document.getElementById("draw-redo-btn");xe.addEventListener("click",k=>{const g=k.target.closest("button");g&&(c=g.getAttribute("data-color")||"#ffffff",xe.querySelectorAll("button").forEach(A=>A.classList.replace("border-white","border-transparent")),g.classList.replace("border-transparent","border-white"))}),J.addEventListener("click",()=>{confirm("Clear the canvas drawing?")&&(n.fillStyle="#060814",n.fillRect(0,0,a,r),f.push(n.getImageData(0,0,t.width,t.height)),x.length=0)}),Be.addEventListener("click",E),_.addEventListener("click",v);const N=()=>{window.removeEventListener("mouseup",M),window.removeEventListener("touchend",M),window.removeEventListener("keydown",L),e.classList.add("hidden")};Q.addEventListener("click",N),le.addEventListener("click",()=>{const g=`![Tactical Sketch](${t.toDataURL("image/png")})`,A=s.selectionStart,C=s.selectionEnd;s.value=s.value.substring(0,A)+g+s.value.substring(C),s.selectionStart=s.selectionEnd=A+g.length,s.dispatchEvent(new Event("input")),N()})}async function Pi(){if(!ye){alert("Unlock Required: Unlock the database using your passphrase before registering biometric lock.");return}const s=prompt("Verify Identity: Enter your current master passphrase to bind to biometric unlock:");if(!s)return;const e=await Ae(s);if(!await ht(e)){alert("Verification Failed: Incorrect passphrase.");return}try{const n=crypto.getRandomValues(new Uint8Array(32)),o=await navigator.credentials.create({publicKey:{challenge:n,rp:{name:"SecOps Wiki",id:window.location.hostname||"localhost"},user:{id:crypto.getRandomValues(new Uint8Array(16)),name:"operator@secops.local",displayName:"SecOps Operator"},pubKeyCredParams:[{type:"public-key",alg:-7},{type:"public-key",alg:-257}],authenticatorSelection:{authenticatorAttachment:"platform",userVerification:"required"},timeout:6e4}});if(o){const a=new Uint8Array(o.rawId),r=Array.from(a).map(u=>u.toString(16).padStart(2,"0")).join(""),l=crypto.getRandomValues(new Uint8Array(32)),i=Array.from(l).map(u=>u.toString(16).padStart(2,"0")).join("");localStorage.setItem("secops-wiki-webauthn-salt",i);const c=`${r}:${i}`,p=await Ae(c),m=await at(s,p);localStorage.setItem("secops-wiki-webauthn-payload",m),localStorage.setItem("secops-wiki-webauthn-gate","true"),alert("Biometric credential successfully registered with WebAuthn platform gate."),await pe("WEBAUTHN_REGISTER","Biometric credentials registered successfully."),Wt(document.getElementById("main-content"))}}catch(n){alert(`Biometric registration failed: ${n.message}`),await pe("WEBAUTHN_FAIL",`Biometric registration failed: ${n.message}`)}}async function Mi(){const s=localStorage.getItem("secops-wiki-webauthn-gate")==="true",e=localStorage.getItem("secops-wiki-webauthn-payload");if(!s||!e){alert("Biometric Unlock is not registered. Setup biometric credentials in settings first.");return}try{const t=crypto.getRandomValues(new Uint8Array(32)),n=await navigator.credentials.get({publicKey:{challenge:t,rpId:window.location.hostname||"localhost",userVerification:"required",timeout:6e4}});if(n){const o=new Uint8Array(n.rawId),a=Array.from(o).map(u=>u.toString(16).padStart(2,"0")).join(""),r=localStorage.getItem("secops-wiki-webauthn-salt")||"";if(!r)throw new Error("Biometric decryption salt is missing from storage.");const l=`${a}:${r}`,i=await Ae(l),c=await Ee(e,i),p=await Ae(c);await ht(p)?(ye=p,ra()):alert("Biometric validation failed: Stored credentials mismatch.")}}catch(t){alert(`Biometric verification failed: ${t.message}`),await pe("WEBAUTHN_FAIL",`Biometric unlock failed: ${t.message}`)}}function Ui(s){const e={name:"Root",fullPath:"",children:{},pages:[]};for(const t of s)for(const n of t.tags){const o=n.split("/");let a=e,r="";for(let l=0;l<o.length;l++){const i=o[l].trim();i&&(r=r?`${r}/${i}`:i,a.children[i]||(a.children[i]={name:i,fullPath:r,children:{},pages:[]}),a=a.children[i])}a.pages.push(t)}return e}function ia(s,e=0){let t="";const n=Object.keys(s.children).sort();for(const o of n){const a=s.children[o];if(!(Object.keys(a.children).length>0||a.pages.length>0))continue;const l=a.fullPath;t+=`
      <div class="tree-folder">
        <div class="tree-folder-header flex items-center gap-1.5 px-3 py-1 cursor-pointer hover:bg-slate-900/40 text-xs font-mono text-slate-450 select-none rounded-lg" data-path="${I(l)}" tabindex="0">
          <span class="tree-folder-icon text-[9px] transition-transform duration-200 text-slate-600" style="display: inline-block;">▶</span>
          <span>📁 ${I(a.name)}</span>
        </div>
        <div class="tree-folder-children hidden pl-3.5 space-y-0.5 animate-fade-in" data-path="${I(l)}">
          ${ia(a,e+1)}
          ${a.pages.map(i=>{const c=ee===i.slug&&!ot,p=i.isEncrypted&&!Y&&ct,m=p?"[REDACTED CORE]":i.title;return`
              <a href="${p?"javascript:void(0)":`#/page/${i.slug}`}" ${p?`onclick="alert('SECURITY WARNING: Document is locked. Enter passphrase to decrypt cores first.');"`:""} class="flex items-center justify-between px-3 py-1 rounded-lg text-[11px] font-mono transition ${c?"bg-teal-950/20 text-teal-400 font-bold border-l border-teal-500":"text-slate-450 hover:bg-slate-900/30 hover:text-slate-200"}" tabindex="0">
                <span class="truncate flex items-center gap-1">
                  ${i.isEncrypted?"🔒":"⊙"} ${I(m)}
                </span>
              </a>
            `}).join("")}
        </div>
      </div>
    `}return t}function ji(s){s.querySelectorAll("code.language-javascript-sandbox, code.language-html-sandbox").forEach(t=>{const n=t.parentElement;if(!n||n.tagName.toLowerCase()!=="pre"||n.querySelector(".sandbox-run-btn"))return;const o=t.classList.contains("language-html-sandbox"),a=t.textContent||"",r=document.createElement("button");r.className="sandbox-run-btn absolute top-2 right-12 px-2 py-0.5 bg-teal-950/40 border border-teal-800 text-teal-400 hover:text-teal-300 font-mono text-[9px] rounded uppercase font-bold transition z-10",r.textContent="Run Sandbox",n.classList.add("relative"),n.appendChild(r);const l=document.createElement("div");l.className="sandbox-iframe-wrapper mt-2 hidden border border-slate-800 rounded-lg overflow-hidden bg-slate-950",n.after(l),r.addEventListener("click",()=>{var c;if(l.classList.toggle("hidden"))r.textContent="Run Sandbox",l.innerHTML="";else{r.textContent="Close Sandbox",l.innerHTML=`
          <div class="bg-slate-900 px-3 py-1 border-b border-slate-800 flex justify-between items-center text-[10px] font-mono text-slate-400 select-none">
            <span>LIVE ISO-SANDBOX CONSOLE</span>
            <button class="sandbox-close-inner-btn text-red-400 hover:text-red-300 font-bold">CLOSE</button>
          </div>
          <iframe sandbox="allow-scripts" class="w-full h-64 bg-slate-950" id="sandbox-frame-${Date.now()}"></iframe>
        `;const p=l.querySelector("iframe");let m="";o?m=a:m=`
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
          `,p.srcdoc=m,(c=l.querySelector(".sandbox-close-inner-btn"))==null||c.addEventListener("click",()=>{l.classList.add("hidden"),r.textContent="Run Sandbox",l.innerHTML=""})}})})}async function zi(s){var r;const e=window.location.hash,t=e.indexOf("?");if(t===-1){s.innerHTML='<div class="glass-panel border border-red-950 p-6 rounded-xl text-center font-mono text-xs text-red-400">P2P IMPORT ERROR: Missing decryption parameters in link.</div>';return}const n=new URLSearchParams(e.substring(t)),o=n.get("data"),a=n.get("key");if(!o||!a){s.innerHTML='<div class="glass-panel border border-red-950 p-6 rounded-xl text-center font-mono text-xs text-red-400">P2P IMPORT ERROR: Invalid parameters.</div>';return}try{const l=await Ae(a),i=atob(decodeURIComponent(o)),c=await Ee(i,l),p=JSON.parse(c);s.innerHTML=`
      <div class="glass-panel border border-teal-905 rounded-xl p-6 space-y-6 glow-border">
        <div class="border-b border-slate-800 pb-4">
          <h2 class="text-xl font-bold font-mono text-white uppercase">Secure P2P Page Import</h2>
          <p class="text-xs text-slate-500 font-mono">Verify and import the decrypted document below into your offline storage.</p>
        </div>
        
        <div class="space-y-4">
          <div>
            <label class="block text-[10px] font-mono text-slate-500 uppercase">Document Title:</label>
            <div class="text-white font-mono text-sm font-bold mt-1">${I(p.title)}</div>
          </div>
          
          <div>
            <label class="block text-[10px] font-mono text-slate-500 uppercase">Associated Tags:</label>
            <div class="flex gap-1.5 mt-1">
              ${p.tags.map(m=>`<span class="bg-slate-900/60 text-slate-400 border border-slate-850 px-2 py-0.5 rounded text-[10px] font-mono">#${I(m)}</span>`).join("")}
            </div>
          </div>
          
          <div>
            <label class="block text-[10px] font-mono text-slate-500 uppercase">Decrypted Content Preview:</label>
            <div class="bg-slate-950/60 p-4 border border-slate-850 rounded-lg max-h-60 overflow-y-auto text-xs font-mono text-slate-350 wiki-content whitespace-pre-wrap mt-1">${I(p.content)}</div>
          </div>
        </div>
        
        <div class="flex justify-end gap-3 pt-4 border-t border-slate-800">
          <a href="#/page/home" class="px-4 py-2 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-350 font-mono text-xs uppercase rounded transition hover:text-white">Cancel</a>
          <button id="p2p-import-confirm-btn" class="px-4 py-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-mono text-xs uppercase rounded font-bold transition shadow-[0_0_10px_rgba(20,184,166,0.15)]">Import to Database</button>
        </div>
      </div>
    `,(r=document.getElementById("p2p-import-confirm-btn"))==null||r.addEventListener("click",async()=>{let m=p.title.toLowerCase().replace(/[^a-z0-9-_]+/g,"-");m||(m=`p2p-import-${Date.now()}`);let u=m,f=await Ve(u);if(f&&!confirm(`CONFLICT ALERT: A document with slug "${u}" already exists in your wiki database.

Click OK to overwrite the existing document.
Click Cancel to import it as a duplicate under an auto-generated title.`)){let h=1;for(;f;)u=`${m}-${h}`,f=await Ve(u),h++}const x={slug:u,title:p.title,content:p.content,tags:p.tags,updatedAt:Date.now()};x.signature=await tt(x),await _e(x),await pe("P2P_IMPORT_SUCCESS",`Imported decrypted page: ${p.title} (slug: ${u})`),alert("Intel Entry imported successfully."),window.location.hash=`#/page/${u}`})}catch(l){s.innerHTML=`<div class="glass-panel border border-red-950 p-6 rounded-xl text-center font-mono text-xs text-red-400">P2P DECRYPTION ERROR: ${I(l.message)}</div>`}}document.addEventListener("DOMContentLoaded",di);async function Hi(){setInterval(async()=>{try{const s=me;await Co({id:Date.now().toString(),timestamp:Date.now(),data:JSON.stringify(s)}),console.log("Background backup created")}catch(s){console.error("Backup failed",s)}},24*60*60*1e3)}Hi();window.renderKnowledgeGraph=function(s){const e=document.getElementById(s);if(!e)return;const t=e.getContext("2d");t&&(t.fillStyle="#fff",t.fillText("Knowledge Graph (Mock)",10,20))};function Fi(s){let e=JSON.parse(localStorage.getItem("secops-recent-pages")||"[]");e=e.filter(t=>t!==s),e.unshift(s),e=e.slice(0,5),localStorage.setItem("secops-recent-pages",JSON.stringify(e))}function Wi(s){const e=s.replace(/[#*`_\[\]()\-+]/g," ").replace(/<[^>]*>/g," ").toLowerCase(),t=new Set(["the","a","an","and","or","but","is","are","was","were","to","for","in","on","at","by","of","with","from","this","that","these","those","it","its","they","them","their","we","us","our","you","your","i","my","me","he","him","his","she","her","has","have","had","do","does","did","as","if","then","else","when","where","how","why","who","which","what","not","no","yes","can","will","should","would","could","may","might","must","about","into","than","also","some","any","all","more","most","other","been","being"]),n=e.split(/\s+/),o={};return n.forEach(a=>{const r=a.replace(/[^a-z0-9-]/g,"");r.length>3&&!t.has(r)&&!/^\d+$/.test(r)&&(o[r]=(o[r]||0)+1)}),Object.entries(o).sort((a,r)=>r[1]-a[1]).slice(0,5).map(a=>`${a[0]} (${a[1]})`)}async function qi(s){var t;const e=await bn();e.sort((n,o)=>o.timestamp-n.timestamp),s.innerHTML=`
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
                <td class="py-2.5 px-4 font-bold text-teal-400 whitespace-nowrap">${I(n.event)}</td>
                <td class="py-2.5 px-4 text-slate-400 break-all">${I(n.details)}</td>
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
  `,(t=document.getElementById("clear-audit-logs-btn"))==null||t.addEventListener("click",async()=>{confirm("AUDIT WARNING: This will permanently delete the forensic audit trail. Continue?")&&(await Lo(),pe("AUDIT_CLEAR","Forensic audit trail manually cleared"),ue())})}function Gi(){var e;if(document.getElementById("shortcut-cheat-sheet-modal"))return;const s=document.createElement("div");s.id="shortcut-cheat-sheet-modal",s.className="fixed inset-0 bg-black/85 z-[100] flex items-center justify-center p-4",s.innerHTML=`
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
  `,document.body.appendChild(s),(e=s.querySelector("#close-shortcuts-modal"))==null||e.addEventListener("click",()=>s.remove()),s.addEventListener("click",t=>{t.target===s&&s.remove()})}window.addEventListener("keydown",s=>{var e,t;s.key==="?"&&((e=document.activeElement)==null?void 0:e.tagName)!=="INPUT"&&((t=document.activeElement)==null?void 0:t.tagName)!=="TEXTAREA"&&(s.preventDefault(),Gi())});function Vi(s,e){const t=s.toLowerCase().indexOf(e.toLowerCase());if(t===-1)return"";const n=Math.max(0,t-30),o=Math.min(s.length,t+e.length+40);let a=s.substring(n,o);return n>0&&(a="..."+a),o<s.length&&(a=a+"..."),a}let es=0;function wo(){es++,es>=3&&(es=0,ks(Date.now()+30*1e3),pe("SECURITY_LOCKOUT","Too many failed decryption attempts. Cooldown enforced."))}function Ki(s){const e=[];if(!s)return{score:0,feedback:["Enter password"]};let t=0;s.length>=8&&(t+=20),s.length>=12&&(t+=15),s.length>=16&&(t+=15);const n=/[a-z]/.test(s),o=/[A-Z]/.test(s),a=/[0-9]/.test(s),r=/[^A-Za-z0-9]/.test(s);return n?t+=10:e.push("Add lowercase letters"),o?t+=15:e.push("Add uppercase letters"),a?t+=10:e.push("Add numbers"),r?t+=15:e.push("Add special characters"),s.length<8&&(e.push("Must be at least 8 characters long"),t=Math.min(15,t)),{score:Math.min(100,t),feedback:e}}function vo(s){return new Promise(e=>{const t=document.createElement("div");t.className="fixed inset-0 bg-[#090d16]/90 backdrop-blur-md z-[100] flex items-center justify-center p-4";const n=s==="activate",o=n?"Derive Master Security Key":"Deactivate Database Encryption",a=n?"Establish a master password. This will be used to derive a strong AES-256 session key.":"Verify your master password to decrypt all records stored at rest.";t.innerHTML=`
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
    `,document.body.appendChild(t);const r=t.querySelector("#passphrase-modal-input"),l=t.querySelector("#passphrase-modal-form"),i=t.querySelector("#passphrase-modal-cancel");if(setTimeout(()=>r.focus(),50),n){const c=t.querySelector("#passphrase-strength-label"),p=t.querySelector("#passphrase-strength-bar"),m=t.querySelector("#passphrase-suggestions");r.addEventListener("input",()=>{const u=r.value,f=Ki(u);let x="bg-red-500",w="text-red-400",h="WEAK";f.score>=80?(x="bg-emerald-500",w="text-emerald-400",h="EXCELLENT"):f.score>=50?(x="bg-amber-500",w="text-amber-400",h="GOOD"):f.score>=25&&(x="bg-yellow-500",w="text-yellow-400",h="FAIR"),p.className=`h-full ${x} transition-all duration-300`,p.style.width=`${f.score}%`,c.className=`${w} font-bold`,c.textContent=`${h} (${f.score}%)`,m.innerHTML=f.feedback.map(R=>`<div>• ${I(R)}</div>`).join("")})}i.addEventListener("click",()=>{t.remove(),e(null)}),l.addEventListener("submit",c=>{c.preventDefault();const p=r.value;t.remove(),e(p)})})}async function Gt(s){if(localStorage.getItem("secops-wiki-webauthn-gate")==="true")try{const n=crypto.getRandomValues(new Uint8Array(32));if(await navigator.credentials.get({publicKey:{challenge:n,rpId:window.location.hostname||"localhost",userVerification:"required",timeout:1e4}}))return!0}catch(n){console.warn("Biometric consent failed: "+n.message)}if(localStorage.getItem("secops-wiki-db-encrypted")==="true"){const n=prompt(`CRITICAL ACTION REQUESTED: ${s.toUpperCase()}

Enter your master passphrase to confirm this action:`);if(!n)return!1;try{const o=await Ae(n);return await ht(o)}catch{return!1}}return confirm(`CONFIRM CRITICAL ACTION: ${s}`)}function Eo(s,e,t,n){const o=s.getContext("2d"),a=window.devicePixelRatio||1,r=400,l=180;s.width=r*a,s.height=l*a,s.style.width=`${r}px`,s.style.height=`${l}px`,o.scale(a,a),o.fillStyle="#060814",o.fillRect(0,0,r,l);const i=new Array(7).fill(0),c=new Array(7),p=new Date;for(let L=6;L>=0;L--){const P=new Date;P.setDate(p.getDate()-L),c[6-L]=P.toLocaleDateString(void 0,{weekday:"short"}).toUpperCase();const j=new Date(P.getFullYear(),P.getMonth(),P.getDate()).getTime(),ae=j+24*60*60*1e3;i[6-L]=e.filter(J=>J.timestamp>=j&&J.timestamp<ae).length}const m=40,u=20,f=30,x=30,w=r-m-u,h=l-f-x,R=Math.max(...i,5);o.strokeStyle="#1e293b",o.lineWidth=1;for(let L=0;L<=4;L++){const P=f+h/4*L;o.beginPath(),o.moveTo(m,P),o.lineTo(r-u,P),o.stroke(),o.fillStyle="#cbd5e1",o.font="10px monospace",o.textAlign="right",o.fillText(Math.round(R-R/4*L).toString(),m-8,P+3.5)}o.beginPath();const M=L=>m+w/6*L,E=L=>f+h-L/R*h;e.length>0&&i.forEach((L,P)=>{const j=M(P),ae=E(L);P===0?o.moveTo(j,ae):o.lineTo(j,ae)});const v=o.createLinearGradient(0,0,r,0);if(v.addColorStop(0,"#2dd4bf"),v.addColorStop(1,"#60a5fa"),o.strokeStyle=v,o.lineWidth=2.5,o.stroke(),e.length>0){o.lineTo(M(6),E(0)),o.lineTo(M(0),E(0)),o.closePath();const L=o.createLinearGradient(0,f,0,f+h);L.addColorStop(0,"rgba(45, 212, 191, 0.15)"),L.addColorStop(1,"rgba(6, 8, 20, 0)"),o.fillStyle=L,o.fill()}i.forEach((L,P)=>{const j=M(P),ae=E(L);o.fillStyle="#2dd4bf",o.beginPath(),o.arc(j,ae,3,0,2*Math.PI),o.fill(),o.fillStyle="#cbd5e1",o.font="10px monospace",o.textAlign="center",o.fillText(c[P],j,l-8)}),o.fillStyle="#f8fafc",o.font="bold 11px monospace",o.textAlign="left",o.fillText("AUDIT TELEMETRY (LOGS FREQUENCY)",m,15),o.fillStyle="#94a3b8",o.font="10px monospace",o.textAlign="right",o.fillText(`DB: ${(t/(1024*1024)).toFixed(1)}MB / ${(n/(1024*1024*1024)).toFixed(1)}GB`,r-u,15)}function Yi(s,e=5){const t=me;if(t.length<=1)return[];const n=new Set(["the","a","and","or","in","on","of","to","is","for","with","that","this","at","by","from","it","an","as","are","was","were","be","been","which","has","have","had","but","not"]),o=u=>u.toLowerCase().replace(/[^\w\s]/g," ").split(/\s+/).filter(f=>f.length>2&&!n.has(f)),a=t.map(u=>({slug:u.slug,tokens:o(u.title+" "+u.content)})),r=t.length,l=new Map;a.forEach(u=>{new Set(u.tokens).forEach(x=>{l.set(x,(l.get(x)||0)+1)})});const i=u=>{const f=new Map;u.forEach(h=>{f.set(h,(f.get(h)||0)+1)});const x=u.length||1,w=new Map;return f.forEach((h,R)=>{w.set(R,h/x)}),w},c=o(s.title+" "+s.content);if(c.length===0)return[];const p=i(c),m=[];return t.forEach((u,f)=>{if(u.slug===s.slug)return;const x=i(a[f].tokens);let w=0;p.forEach((h,R)=>{if(x.has(R)){const M=x.get(R),E=l.get(R)||1,v=Math.log(r/E)+1;w+=h*M*v*v}}),w>0&&m.push({page:u,score:w})}),m.sort((u,f)=>f.score-u.score),m.slice(0,e)}function Zi(s){s.querySelectorAll(".wiki-content table").forEach(t=>{const n=t.parentElement;if(t.classList.contains("enhanced-table"))return;t.classList.add("enhanced-table","w-full","border-collapse");const o=document.createElement("div");o.className="flex items-center justify-between gap-4 p-2 bg-slate-950/60 border border-slate-800 border-b-0 rounded-t-lg select-none text-[10px] font-mono text-slate-400 mt-4",o.innerHTML=`
      <div class="flex items-center gap-1.5">
        <span>🔍</span>
        <input type="text" placeholder="Filter table rows..." aria-label="Filter table rows" class="table-filter-input bg-slate-900 border border-slate-800 rounded px-2 py-0.5 text-xs text-slate-200 focus:outline-none focus:border-teal-500/50 w-48 font-mono">
      </div>
      <div class="flex items-center gap-2">
        <button class="table-calc-btn px-2 py-0.5 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded text-slate-400 hover:text-white uppercase transition">Toggle Calculations</button>
      </div>
    `,n.insertBefore(o,t),t.classList.add("border","border-slate-800","rounded-b-lg");const a=t.querySelectorAll("th");a.forEach((c,p)=>{c.classList.add("cursor-pointer","hover:bg-slate-900/50","transition-colors","select-none"),c.innerHTML+=' <span class="sort-indicator text-slate-600 text-[9px]">↕</span>';let m=!0;c.addEventListener("click",()=>{Xi(t,p,m),m=!m,a.forEach((u,f)=>{const x=u.querySelector(".sort-indicator");f===p?(x.textContent=m?"↓":"↑",x.classList.remove("text-slate-600"),x.classList.add("text-teal-400","font-bold")):(x.textContent="↕",x.className="sort-indicator text-slate-600 text-[9px]")})})});const r=o.querySelector(".table-filter-input");r.addEventListener("input",()=>{const c=r.value.toLowerCase();t.querySelectorAll("tbody tr").forEach(m=>{var f;(((f=m.textContent)==null?void 0:f.toLowerCase())||"").includes(c)?m.style.display="":m.style.display="none"})});const l=o.querySelector(".table-calc-btn");let i=null;l.addEventListener("click",()=>{if(i){i.remove(),i=null;return}const c=t.querySelector("tbody"),p=Array.from(c.querySelectorAll("tr"));if(p.length===0)return;const m=a.length,u=new Array(m).fill(0),f=new Array(m).fill(0),x=new Array(m).fill(!0);p.forEach(w=>{w.querySelectorAll("td").forEach((R,M)=>{var L;const E=((L=R.textContent)==null?void 0:L.trim().replace(/[\$,]/g,""))||"";if(E==="")return;const v=parseFloat(E);isNaN(v)?x[M]=!1:(u[M]+=v,f[M]++)})}),i=document.createElement("tr"),i.className="bg-slate-950/80 font-bold border-t border-slate-800 text-[10px] font-mono text-teal-400";for(let w=0;w<m;w++){const h=document.createElement("td");if(h.className="p-2 text-right",w===0)h.textContent="CALCULATIONS",h.className="p-2 text-left";else if(x[w]&&f[w]>0){const R=u[w],M=R/f[w];h.innerHTML=`<div>SUM: ${R.toLocaleString(void 0,{maximumFractionDigits:2})}</div>
                          <div class="text-slate-400 font-normal">AVG: ${M.toLocaleString(void 0,{maximumFractionDigits:2})}</div>`}else h.textContent="—";i.appendChild(h)}c.appendChild(i)})})}function Xi(s,e,t){const n=s.querySelector("tbody"),o=Array.from(n.querySelectorAll("tr")),a=o.filter(l=>!l.classList.contains("bg-slate-950/80")),r=o.find(l=>l.classList.contains("bg-slate-950/80"));a.sort((l,i)=>{var f,x,w,h;const c=((x=(f=l.querySelectorAll("td")[e])==null?void 0:f.textContent)==null?void 0:x.trim())||"",p=((h=(w=i.querySelectorAll("td")[e])==null?void 0:w.textContent)==null?void 0:h.trim())||"",m=parseFloat(c.replace(/[\$,]/g,"")),u=parseFloat(p.replace(/[\$,]/g,""));return!isNaN(m)&&!isNaN(u)?t?m-u:u-m:t?c.localeCompare(p):p.localeCompare(c)}),a.forEach(l=>n.appendChild(l)),r&&n.appendChild(r)}function Ji(s){let e=document.getElementById("audio-recorder-modal");e||(e=document.createElement("div"),e.id="audio-recorder-modal",e.className="fixed inset-0 bg-[#090d16]/90 backdrop-blur-md z-50 flex items-center justify-center p-4",document.body.appendChild(e)),e.innerHTML=`
    <div class="glass-panel border border-slate-800 rounded-xl w-full max-w-md p-5 space-y-4 glow-border shadow-2xl flex flex-col font-mono text-xs">
      <div class="flex items-center justify-between border-b border-slate-800 pb-2">
        <h3 class="text-sm font-bold text-white uppercase tracking-wider">🎙️ Audio Intel Voice Recorder</h3>
        <span class="text-[10px] text-slate-500">Record briefing memo</span>
      </div>

      <div class="flex flex-col items-center justify-center bg-slate-950 p-6 rounded-lg border border-slate-800 space-y-4 text-center">
        <div id="audio-timer" class="text-2xl font-bold text-teal-400 tracking-wider">00:00</div>
        <div id="audio-status" class="text-[10px] text-slate-500 uppercase">Ready to record</div>
        <audio id="audio-preview" controls class="hidden w-full mt-2 rounded border border-slate-800 bg-slate-900"></audio>
      </div>

      <div class="flex justify-between items-center gap-2 pt-2 border-t border-slate-800">
        <div class="flex gap-2">
          <button id="audio-rec-btn" class="px-3 py-1.5 bg-red-950/40 border border-red-900/50 text-red-400 hover:bg-red-900/40 rounded uppercase font-bold text-[10px]">● Record</button>
          <button id="audio-stop-btn" disabled class="px-3 py-1.5 bg-slate-900 border border-slate-800 text-slate-500 rounded uppercase font-bold text-[10px]">■ Stop</button>
        </div>
        <div class="flex gap-2">
          <button id="audio-cancel-btn" class="px-3 py-1.5 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white rounded uppercase text-[10px]">Cancel</button>
          <button id="audio-save-btn" disabled class="px-3 py-1.5 bg-teal-600 hover:bg-teal-500 text-slate-950 font-bold rounded uppercase text-[10px]">Embed Memo</button>
        </div>
      </div>
    </div>
  `,e.classList.remove("hidden");const t=document.getElementById("audio-timer"),n=document.getElementById("audio-status"),o=document.getElementById("audio-preview"),a=document.getElementById("audio-rec-btn"),r=document.getElementById("audio-stop-btn"),l=document.getElementById("audio-cancel-btn"),i=document.getElementById("audio-save-btn");let c=null,p=[],m=0,u=null,f=null;const x=()=>{u&&clearInterval(u),c&&c.state!=="inactive"&&c.stop(),e.classList.add("hidden")};l.addEventListener("click",x),a.addEventListener("click",async()=>{try{const w=await navigator.mediaDevices.getUserMedia({audio:!0});p=[],c=new MediaRecorder(w),c.ondataavailable=h=>{h.data.size>0&&p.push(h.data)},c.onstop=()=>{f=new Blob(p,{type:"audio/webm"});const h=URL.createObjectURL(f);o.src=h,o.classList.remove("hidden"),i.disabled=!1,i.classList.replace("bg-slate-900","bg-teal-600"),n.textContent="Recording complete. Preview available.",w.getTracks().forEach(R=>R.stop())},c.start(),m=Date.now(),u=setInterval(()=>{const h=Math.floor((Date.now()-m)/1e3),R=String(Math.floor(h/60)).padStart(2,"0"),M=String(h%60).padStart(2,"0");t.textContent=`${R}:${M}`},1e3),a.disabled=!0,r.disabled=!1,r.classList.replace("text-slate-500","text-amber-400"),n.textContent="RECORDING AUDIO BRIEFING..."}catch(w){alert("Microphone access denied or unavailble: "+w.message)}}),r.addEventListener("click",()=>{u&&clearInterval(u),c&&c.state!=="inactive"&&c.stop(),a.disabled=!1,r.disabled=!0}),i.addEventListener("click",()=>{if(!f)return;const w=new FileReader;w.onloadend=()=>{const R=`

![Voice Briefing Memo](${w.result})

`,M=s.selectionStart,E=s.selectionEnd;s.value=s.value.substring(0,M)+R+s.value.substring(E),s.dispatchEvent(new Event("input")),x()},w.readAsDataURL(f)})}function Qi(){let s=document.getElementById("steganography-modal");s||(s=document.createElement("div"),s.id="steganography-modal",s.className="fixed inset-0 bg-[#090d16]/90 backdrop-blur-md z-50 flex items-center justify-center p-4",document.body.appendChild(s)),s.innerHTML=`
    <div class="glass-panel border border-slate-800 rounded-xl w-full max-w-lg p-5 space-y-4 glow-border shadow-2xl flex flex-col font-mono text-xs">
      <div class="flex items-center justify-between border-b border-slate-800 pb-2">
        <h3 class="text-sm font-bold text-white uppercase tracking-wider">🖼️ Steganographic Payload Encoder/Decoder</h3>
        <span class="text-[10px] text-slate-500">LSB Image Encryption</span>
      </div>

      <div class="flex gap-2 border-b border-slate-800 pb-2">
        <button id="steg-tab-hide" class="px-3 py-1.5 bg-teal-950/40 border border-teal-800 text-teal-400 font-bold rounded uppercase text-[10px]">Hide Intel</button>
        <button id="steg-tab-extract" class="px-3 py-1.5 bg-slate-900 border border-slate-850 text-slate-400 font-bold rounded uppercase text-[10px]">Extract Intel</button>
      </div>

      <!-- Hide Tab Panel -->
      <div id="steg-panel-hide" class="space-y-3">
        <div>
          <label class="block text-[10px] text-slate-400 uppercase mb-1">Select PNG Cover Image:</label>
          <input type="file" id="steg-hide-file" accept="image/png,image/jpeg" class="w-full bg-slate-950 border border-slate-800 rounded p-2 text-[10px] text-slate-300">
        </div>
        <div>
          <label class="block text-[10px] text-slate-400 uppercase mb-1">Secret Text Payload to Hide:</label>
          <textarea id="steg-hide-text" rows="3" placeholder="Enter confidential message..." class="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-slate-200 font-mono focus:outline-none"></textarea>
        </div>
        <button id="steg-encode-btn" class="w-full py-2 bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-bold rounded uppercase">Encode & Download Steg PNG</button>
      </div>

      <!-- Extract Tab Panel -->
      <div id="steg-panel-extract" class="hidden space-y-3">
        <div>
          <label class="block text-[10px] text-slate-400 uppercase mb-1">Select Steg PNG Image:</label>
          <input type="file" id="steg-extract-file" accept="image/png" class="w-full bg-slate-950 border border-slate-800 rounded p-2 text-[10px] text-slate-300">
        </div>
        <button id="steg-decode-btn" class="w-full py-2 bg-slate-900 border border-slate-800 hover:border-teal-500 text-teal-400 font-bold rounded uppercase">Extract Hidden Payload</button>
        <div id="steg-result-box" class="hidden p-3 bg-slate-950 border border-slate-800 rounded text-slate-200 text-xs font-mono break-all max-h-32 overflow-y-auto"></div>
      </div>

      <div class="flex justify-end pt-2 border-t border-slate-800">
        <button id="steg-close-btn" class="px-4 py-1.5 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white rounded uppercase text-[10px]">Close</button>
      </div>
    </div>
  `,s.classList.remove("hidden");const e=document.getElementById("steg-tab-hide"),t=document.getElementById("steg-tab-extract"),n=document.getElementById("steg-panel-hide"),o=document.getElementById("steg-panel-extract");document.getElementById("steg-close-btn").addEventListener("click",()=>s.classList.add("hidden")),e.addEventListener("click",()=>{e.className="px-3 py-1.5 bg-teal-950/40 border border-teal-800 text-teal-400 font-bold rounded uppercase text-[10px]",t.className="px-3 py-1.5 bg-slate-900 border border-slate-850 text-slate-400 font-bold rounded uppercase text-[10px]",n.classList.remove("hidden"),o.classList.add("hidden")}),t.addEventListener("click",()=>{t.className="px-3 py-1.5 bg-teal-950/40 border border-teal-800 text-teal-400 font-bold rounded uppercase text-[10px]",e.className="px-3 py-1.5 bg-slate-900 border border-slate-850 text-slate-400 font-bold rounded uppercase text-[10px]",o.classList.remove("hidden"),n.classList.add("hidden")});const r=document.getElementById("steg-encode-btn"),l=document.getElementById("steg-hide-file"),i=document.getElementById("steg-hide-text");r.addEventListener("click",()=>{var w;const u=(w=l.files)==null?void 0:w[0],f=i.value.trim();if(!u||!f){alert("Please select an image file and enter secret text payload.");return}const x=new Image;x.onload=()=>{const h=document.createElement("canvas");h.width=x.width,h.height=x.height;const R=h.getContext("2d");R.drawImage(x,0,0);const M=R.getImageData(0,0,h.width,h.height);try{const E=el(M,f);R.putImageData(E,0,0);const v=document.createElement("a");v.href=h.toDataURL("image/png"),v.download=`steg-intel-${Date.now()}.png`,v.click(),alert("✓ STEGANOGRAPHY SUCCESS: Payload encoded into PNG pixels and downloaded.")}catch(E){alert("Steganography encoding failed: "+E.message)}},x.src=URL.createObjectURL(u)});const c=document.getElementById("steg-decode-btn"),p=document.getElementById("steg-extract-file"),m=document.getElementById("steg-result-box");c.addEventListener("click",()=>{var x;const u=(x=p.files)==null?void 0:x[0];if(!u){alert("Please select a steg PNG image file.");return}const f=new Image;f.onload=()=>{const w=document.createElement("canvas");w.width=f.width,w.height=f.height;const h=w.getContext("2d");h.drawImage(f,0,0);const R=h.getImageData(0,0,w.width,w.height),M=tl(R);M?(m.innerHTML=`<span class="text-teal-400 font-bold block mb-1">✓ EXTRACTED HIDDEN INTEL:</span>${I(M)}`,m.classList.remove("hidden")):alert("No steganographic payload signature detected in this image.")},f.src=URL.createObjectURL(u)})}function el(s,e){const t=s.data,o="STEG"+e,r=new TextEncoder().encode(o);if(r.length*8+32>t.length/4)throw new Error("Image dimensions are too small to encode this message length.");const l=r.length;for(let c=0;c<32;c++){const p=l>>31-c&1,m=c*4;t[m]=t[m]&254|p}let i=0;for(let c=0;c<r.length;c++){const p=r[c];for(let m=7;m>=0;m--){const u=p>>m&1,f=(32+i)*4;t[f]=t[f]&254|u,i++}}return s}function tl(s){const e=s.data;let t=0;for(let l=0;l<32;l++){const i=l*4,c=e[i]&1;t=t<<1|c}if(t<=0||t>e.length/4-32)return null;const n=new Uint8Array(t);let o=0;for(let l=0;l<t;l++){let i=0;for(let c=7;c>=0;c--){const p=(32+o)*4,m=e[p]&1;i=i<<1|m,o++}n[l]=i}const r=new TextDecoder().decode(n);return r.startsWith("STEG")?r.substring(4):null}async function us(){let s=document.getElementById("snapshot-modal");s||(s=document.createElement("div"),s.id="snapshot-modal",s.className="fixed inset-0 bg-[#090d16]/90 backdrop-blur-md z-50 flex items-center justify-center p-4",document.body.appendChild(s));const e=await ts();s.innerHTML=`
    <div class="glass-panel border border-slate-800 rounded-xl w-full max-w-xl p-5 space-y-4 glow-border shadow-2xl flex flex-col font-mono text-xs">
      <div class="flex items-center justify-between border-b border-slate-800 pb-2">
        <h3 class="text-sm font-bold text-white uppercase tracking-wider">📸 Database Snapshot History & Comparer</h3>
        <span class="text-[10px] text-slate-500">IndexedDB Snapshots</span>
      </div>

      <div class="flex justify-between items-center">
        <button id="snap-create-btn" class="px-3 py-1.5 bg-teal-600 hover:bg-teal-500 text-slate-950 font-bold rounded uppercase text-[10px]">Create New Snapshot</button>
        <span class="text-[10px] text-slate-400">Total Snapshots: ${e.length}</span>
      </div>

      <div class="border border-slate-800 rounded-lg p-3 bg-slate-950 max-h-60 overflow-y-auto space-y-2">
        ${e.length===0?'<p class="text-slate-500 text-[10px] italic">No database snapshots archived.</p>':""}
        ${e.map(o=>`
          <div class="flex items-center justify-between p-2 bg-slate-900/60 border border-slate-800 rounded">
            <div>
              <p class="font-bold text-slate-200">${I(o.name||"Snapshot "+o.id)}</p>
              <p class="text-[9px] text-slate-500">${new Date(o.timestamp).toLocaleString()} • ${o.pageCount||0} pages</p>
            </div>
            <div class="flex gap-2">
              <button class="snap-restore-btn px-2 py-1 bg-teal-950/40 border border-teal-800 text-teal-400 rounded text-[9px] font-bold uppercase" data-id="${o.id}">Restore</button>
              <button class="snap-del-btn px-2 py-1 bg-red-950/40 border border-red-900/40 text-red-400 rounded text-[9px] font-bold uppercase" data-id="${o.id}">Delete</button>
            </div>
          </div>
        `).join("")}
      </div>

      <div class="flex justify-end pt-2 border-t border-slate-800">
        <button id="snap-close-btn" class="px-4 py-1.5 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white rounded uppercase text-[10px]">Close</button>
      </div>
    </div>
  `,s.classList.remove("hidden"),document.getElementById("snap-close-btn").addEventListener("click",()=>s.classList.add("hidden")),document.getElementById("snap-create-btn").addEventListener("click",async()=>{const o=prompt("Snapshot Name:",`Snapshot-${new Date().toLocaleDateString()}`);if(!o)return;const a=await Rt(),r={id:`snap-${Date.now()}`,name:o,timestamp:Date.now(),pageCount:a.length,data:JSON.stringify(a)};await Co(r),alert("✓ SNAPSHOT COMMITTED: Database state archived."),us()}),s.querySelectorAll(".snap-del-btn").forEach(o=>{o.addEventListener("click",async()=>{const a=o.getAttribute("data-id");confirm("Delete this database snapshot?")&&(await _a(a),us())})}),s.querySelectorAll(".snap-restore-btn").forEach(o=>{o.addEventListener("click",async()=>{const a=o.getAttribute("data-id");if(!await Gt("RESTORE DATABASE SNAPSHOT"))return;const i=(await ts()).find(c=>c.id===a);if(i)try{const c=JSON.parse(i.data);for(const p of c)await _e(p);alert("✓ RESTORE COMPLETE: Database pages restored from snapshot."),s.classList.add("hidden"),await Le(),await ue()}catch(c){alert("Restore failed: "+c.message)}})})}function nl(s,e){const t=(s+" "+e).toLowerCase();let n="UNCLASSIFIED";const o=["nuclear","zero-day","covert","top secret","rootkit","exploit","payload","classified"],a=["vulnerability","credentials","session key","firewall bypass","malware","auth token","backdoor"],r=["internal","config","audit log","architecture","policy","restricted"];o.some(u=>t.includes(u))?n="TOP SECRET":a.some(u=>t.includes(u))?n="SECRET":r.some(u=>t.includes(u))&&(n="CONFIDENTIAL");const l=new Set(["the","a","and","or","in","on","of","to","is","for","with","that","this","at","by","from","it","an","as","are","was","were","be","been"]),i=t.replace(/[^\w\s]/g," ").split(/\s+/).filter(u=>u.length>3&&!l.has(u)),c=new Map;i.forEach(u=>c.set(u,(c.get(u)||0)+1));const m=Array.from(c.entries()).sort((u,f)=>f[1]-u[1]).slice(0,4).map(u=>u[0]);return{classification:n,suggestedTags:m}}function sl(s){let e=document.getElementById("network-canvas-modal");e||(e=document.createElement("div"),e.id="network-canvas-modal",e.className="fixed inset-0 bg-[#090d16]/90 backdrop-blur-md z-50 flex items-center justify-center p-4",document.body.appendChild(e)),e.innerHTML=`
    <div class="glass-panel border border-slate-800 rounded-xl w-full max-w-2xl p-5 space-y-4 glow-border shadow-2xl flex flex-col font-mono text-xs">
      <div class="flex items-center justify-between border-b border-slate-800 pb-2">
        <h3 class="text-sm font-bold text-white uppercase tracking-wider">🌐 Network Topology & Infrastructure Canvas</h3>
        <span class="text-[10px] text-slate-500">Draw Nodes & Connections</span>
      </div>

      <div class="flex flex-wrap items-center justify-between gap-3 bg-slate-950 p-2 border border-slate-850 rounded-lg select-none">
        <div class="flex items-center gap-2">
          <span class="text-[10px] text-slate-500 uppercase">Node Type:</span>
          <select id="net-node-type" class="bg-slate-900 border border-slate-800 rounded px-2 py-1 text-[10px] text-slate-300">
            <option value="💻 Server">💻 Server</option>
            <option value="🛡️ Firewall">🛡️ Firewall</option>
            <option value="🌐 Router">🌐 Router</option>
            <option value="🗄️ Database">🗄️ Database</option>
            <option value="🎯 Target">🎯 Target Asset</option>
          </select>
        </div>
        <div class="flex items-center gap-2">
          <input type="text" id="net-node-label" placeholder="Node Name / IP (e.g. 192.168.1.1)" class="bg-slate-900 border border-slate-800 rounded px-2 py-1 text-[10px] text-slate-200 w-48">
          <button id="net-add-node-btn" class="px-2.5 py-1 bg-teal-950/40 border border-teal-800 text-teal-400 font-bold rounded uppercase text-[10px]">Add Node</button>
        </div>
        <button id="net-clear-btn" class="px-2 py-1 bg-red-950/20 border border-red-900/30 text-red-400 rounded uppercase text-[10px]">Clear</button>
      </div>

      <div class="bg-slate-950 border border-slate-850 rounded-lg overflow-hidden flex items-center justify-center p-2 min-h-[280px] flex-1 relative">
        <canvas id="network-topology-canvas" width="600" height="320" class="bg-slate-950 border border-slate-900 cursor-pointer rounded shadow-inner block max-w-full"></canvas>
      </div>

      <div class="flex justify-end gap-3 pt-2 border-t border-slate-800">
        <button id="net-cancel-btn" class="px-4 py-2 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white uppercase rounded">Cancel</button>
        <button id="net-save-btn" class="px-4 py-2 bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-bold uppercase rounded shadow">Embed Diagram</button>
      </div>
    </div>
  `,e.classList.remove("hidden");const t=document.getElementById("network-topology-canvas"),n=t.getContext("2d"),o=document.getElementById("net-node-type"),a=document.getElementById("net-node-label"),r=document.getElementById("net-add-node-btn"),l=document.getElementById("net-clear-btn"),i=document.getElementById("net-cancel-btn"),c=document.getElementById("net-save-btn"),p=[];function m(){n.fillStyle="#060814",n.fillRect(0,0,t.width,t.height),p.length>1&&(n.strokeStyle="#1e293b",n.lineWidth=2,n.setLineDash([4,4]),n.beginPath(),p.forEach((u,f)=>{f===0?n.moveTo(u.x,u.y):n.lineTo(u.x,u.y)}),n.stroke(),n.setLineDash([])),p.forEach(u=>{n.fillStyle="#0f172a",n.strokeStyle="#0d9488",n.lineWidth=1.5,n.beginPath(),n.roundRect(u.x-50,u.y-20,100,40,6),n.fill(),n.stroke(),n.fillStyle="#f8fafc",n.font="10px monospace",n.textAlign="center",n.fillText(`${u.type}`,u.x,u.y-4),n.fillStyle="#2dd4bf",n.font="9px monospace",n.fillText(u.label,u.x,u.y+10)})}m(),r.addEventListener("click",()=>{const u=a.value.trim()||"192.168.1.1",f=o.value,x=80+p.length%4*140,w=80+Math.floor(p.length/4)*80;p.push({x,y:w,type:f,label:u}),a.value="",m()}),l.addEventListener("click",()=>{p.length=0,m()}),i.addEventListener("click",()=>e.classList.add("hidden")),c.addEventListener("click",()=>{const f=`

![Network Topology](${t.toDataURL("image/png")})

`,x=s.selectionStart,w=s.selectionEnd;s.value=s.value.substring(0,x)+f+s.value.substring(w),s.dispatchEvent(new Event("input")),e.classList.add("hidden")})}function ol(s){let e=document.getElementById("qr-code-modal");e||(e=document.createElement("div"),e.id="qr-code-modal",e.className="fixed inset-0 bg-[#090d16]/90 backdrop-blur-md z-50 flex items-center justify-center p-4",document.body.appendChild(e)),e.innerHTML=`
    <div class="glass-panel border border-slate-800 rounded-xl w-full max-w-sm p-5 space-y-4 glow-border shadow-2xl flex flex-col items-center font-mono text-xs">
      <div class="flex items-center justify-between w-full border-b border-slate-800 pb-2">
        <h3 class="text-sm font-bold text-white uppercase tracking-wider">📱 Offline QR Intel Transceiver</h3>
        <span class="text-[10px] text-slate-500">QR Payload</span>
      </div>

      <div class="bg-white p-4 rounded-xl border border-slate-800 shadow-inner">
        <canvas id="qr-canvas" width="200" height="200"></canvas>
      </div>
      <p class="text-[10px] text-slate-400 break-all text-center max-w-full truncate">${I(s)}</p>

      <div class="flex justify-between w-full pt-2 border-t border-slate-800">
        <button id="qr-scan-camera-btn" class="px-3 py-1.5 bg-teal-950/40 border border-teal-800 text-teal-400 rounded uppercase font-bold text-[10px]">📷 Camera Scan</button>
        <button id="qr-close-btn" class="px-4 py-1.5 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white rounded uppercase text-[10px]">Close</button>
      </div>
    </div>
  `,e.classList.remove("hidden");const n=document.getElementById("qr-canvas").getContext("2d");n.fillStyle="#ffffff",n.fillRect(0,0,200,200),n.fillStyle="#000000";const o=20,a=10;for(let i=0;i<o;i++)for(let c=0;c<o;c++)if(i<6&&c<6||i<6&&c>=o-6||i>=o-6&&c<6)(i===0||i===5||c===0||c===5||i>=2&&i<=3&&c>=2&&c<=3)&&n.fillRect(c*a,i*a,a,a);else{const p=s.charCodeAt((i*o+c)%s.length)||0;(i*c+p)%2===0&&n.fillRect(c*a,i*a,a,a)}document.getElementById("qr-close-btn").addEventListener("click",()=>e.classList.add("hidden")),document.getElementById("qr-scan-camera-btn").addEventListener("click",()=>{e.classList.add("hidden"),al()})}function al(){let s=document.getElementById("qr-scanner-modal");s||(s=document.createElement("div"),s.id="qr-scanner-modal",s.className="fixed inset-0 bg-[#090d16]/90 backdrop-blur-md z-50 flex items-center justify-center p-4",document.body.appendChild(s)),s.innerHTML=`
    <div class="glass-panel border border-slate-800 rounded-xl w-full max-w-md p-5 space-y-4 glow-border shadow-2xl flex flex-col font-mono text-xs">
      <div class="flex items-center justify-between border-b border-slate-800 pb-2">
        <h3 class="text-sm font-bold text-white uppercase tracking-wider">📷 Camera QR Code Scanner</h3>
        <span class="text-[10px] text-slate-500">Scan QR Code</span>
      </div>

      <div class="bg-slate-950 border border-slate-800 rounded-lg p-2 flex items-center justify-center min-h-[220px]">
        <video id="qr-video-stream" autoplay playsinline class="w-full rounded border border-slate-900"></video>
      </div>

      <div class="flex justify-end pt-2 border-t border-slate-800">
        <button id="qr-scanner-close" class="px-4 py-1.5 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white rounded uppercase text-[10px]">Close</button>
      </div>
    </div>
  `,s.classList.remove("hidden");const e=document.getElementById("qr-video-stream"),t=document.getElementById("qr-scanner-close");let n=null;navigator.mediaDevices.getUserMedia({video:{facingMode:"environment"}}).then(o=>{n=o,e.srcObject=n}).catch(o=>{alert("Camera access denied or unavailable: "+o.message)}),t.addEventListener("click",()=>{n&&n.getTracks().forEach(o=>o.stop()),s.classList.add("hidden")})}function rl(s,e,t){let n=document.getElementById("revision-diff-modal");n||(n=document.createElement("div"),n.id="revision-diff-modal",n.className="fixed inset-0 bg-[#090d16]/90 backdrop-blur-md z-50 flex items-center justify-center p-4",document.body.appendChild(n));const o=e.split(`
`),a=t.split(`
`);let r='<div class="space-y-1 font-mono text-xs">';const l=Math.max(o.length,a.length);for(let c=0;c<l;c++){const p=o[c],m=a[c];p===m?r+=`<div class="p-1 text-slate-400 bg-slate-950/50 break-all">${I(p||"")}</div>`:(m!==void 0&&(r+=`<div class="p-1 text-red-400 bg-red-950/40 border-l-2 border-red-500 break-all">- ${I(m)}</div>`),p!==void 0&&(r+=`<div class="p-1 text-emerald-400 bg-emerald-950/40 border-l-2 border-emerald-500 break-all">+ ${I(p)}</div>`))}r+="</div>",n.innerHTML=`
    <div class="glass-panel border border-slate-800 rounded-xl w-full max-w-2xl p-5 space-y-4 glow-border shadow-2xl flex flex-col font-mono text-xs">
      <div class="flex items-center justify-between border-b border-slate-800 pb-2">
        <h3 class="text-sm font-bold text-white uppercase tracking-wider">🔍 Revision Diff Inspector: ${I(s)}</h3>
        <span class="text-[10px] text-slate-500">Side-by-Side Line Comparison</span>
      </div>

      <div class="border border-slate-800 rounded-lg p-3 bg-slate-950 max-h-80 overflow-y-auto space-y-1">
        ${r}
      </div>

      <div class="flex justify-end pt-2 border-t border-slate-800">
        <button id="diff-close-btn" class="px-4 py-1.5 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white rounded uppercase text-[10px]">Close</button>
      </div>
    </div>
  `,n.classList.remove("hidden"),document.getElementById("diff-close-btn").addEventListener("click",()=>n.classList.add("hidden"))}async function il(){const s=prompt("Keychain Passphrase Protection: Enter a passphrase to encrypt this vault archive:");if(!s)return;const e=await Ae(s),t=await Rt(),n=await ts(),o=ms(),a={pages:t,backups:n,tagColors:o,exportedAt:Date.now()},r=await at(JSON.stringify(a),e),l=new Blob([r],{type:"application/octet-stream"}),i=document.createElement("a");i.href=URL.createObjectURL(l),i.download=`secops-vault-${Date.now()}.keychain`,i.click(),alert("✓ KEYCHAIN EXPORT COMPLETE: Encrypted vault saved.")}
