var ya=Object.defineProperty;var zs=s=>{throw TypeError(s)};var wa=(s,e,t)=>e in s?ya(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var ce=(s,e,t)=>wa(s,typeof e!="symbol"?e+"":e,t),va=(s,e,t)=>e.has(s)||zs("Cannot "+t);var js=(s,e,t)=>e.has(s)?zs("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(s):e.set(s,t);var en=(s,e,t)=>(va(s,e,"access private method"),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(r){if(r.ep)return;r.ep=!0;const o=t(r);fetch(r.href,o)}})();if(self!==top)try{window.top&&(window.top.location.href=window.location.href)}catch{window.location.href="about:blank"}else document.documentElement.classList.remove("clickjack-lock");const Ea="secops-wiki-db",ze="pages",je="revisions",ka=5;function Ee(){return new Promise((s,e)=>{const t=indexedDB.open(Ea,ka);t.onerror=()=>e(t.error),t.onsuccess=()=>{const n=t.result;n.onversionchange=()=>{n.close(),alert("SECURITY NOTICE: The database schema is being updated by another active session. This connection has been closed to prevent blocking. Please reload to resume."),window.location.reload()},s(n)},t.onupgradeneeded=()=>{const n=t.result;n.objectStoreNames.contains(ze)||n.createObjectStore(ze,{keyPath:"slug"}),n.objectStoreNames.contains(je)||n.createObjectStore(je,{keyPath:"id"}).createIndex("slug","slug",{unique:!1}),n.objectStoreNames.contains("tagColors")||n.createObjectStore("tagColors",{keyPath:"tag"}),n.objectStoreNames.contains("attachments")||n.createObjectStore("attachments",{keyPath:"id"}),n.objectStoreNames.contains("auditLogs")||n.createObjectStore("auditLogs",{keyPath:"id"}),n.objectStoreNames.contains("templates")||n.createObjectStore("templates",{keyPath:"id"}),n.objectStoreNames.contains("backups")||n.createObjectStore("backups",{keyPath:"id"})}})}async function Sa(s){const e=await Ee();return new Promise((t,n)=>{const a=e.transaction(ze,"readonly").objectStore(ze).get(s);a.onerror=()=>n(a.error),a.onsuccess=()=>t(a.result||null)})}async function un(s){const e=await Ee();return new Promise((t,n)=>{const a=e.transaction(ze,"readwrite").objectStore(ze).put(s);a.onerror=()=>n(a.error),a.onsuccess=()=>t()})}async function bo(s){await Ta(s);const e=await Ee();return new Promise((t,n)=>{const a=e.transaction(ze,"readwrite").objectStore(ze).delete(s);a.onerror=()=>n(a.error),a.onsuccess=()=>t()})}async function Wt(){const s=await Ee();return new Promise((e,t)=>{const o=s.transaction(ze,"readonly").objectStore(ze).getAll();o.onerror=()=>t(o.error),o.onsuccess=()=>e(o.result||[])})}async function Hs(s){const e=await Ee();return new Promise((t,n)=>{const a=e.transaction(je,"readwrite").objectStore(je).put(s);a.onerror=()=>n(a.error),a.onsuccess=()=>t()})}async function xo(s){const e=await Ee();return new Promise((t,n)=>{const i=e.transaction(je,"readonly").objectStore(je).index("slug").getAll(s);i.onerror=()=>n(i.error),i.onsuccess=()=>{const l=i.result||[];l.sort((d,p)=>p.updatedAt-d.updatedAt),t(l)}})}async function Ta(s){const e=await Ee();return new Promise((t,n)=>{const i=e.transaction(je,"readwrite").objectStore(je).index("slug").openCursor(s);i.onerror=()=>n(i.error),i.onsuccess=()=>{const l=i.result;l?(l.delete(),l.continue()):t()}})}async function yo(s){const e=await Ee();return new Promise((t,n)=>{const a=e.transaction(je,"readwrite").objectStore(je).delete(s);a.onerror=()=>n(a.error),a.onsuccess=()=>t()})}const Aa=[{slug:"home",title:"Operations Dashboard",content:`# Secure Operations Center (SOC) Wiki

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
* Raw input strings are escaped to prevent Cross-Site Scripting (XSS).`,updatedAt:Date.now(),tags:["security","hardening"],isSystem:!0}];async function cs(){if((await Wt()).length===0)for(const e of Aa)await un(e)}async function wo(){const s=await Ee();return new Promise((e,t)=>{const n=[ze,je,"tagColors","attachments","auditLogs"],r=s.transaction(n,"readwrite"),o=r.objectStore(ze),a=r.objectStore(je),i=r.objectStore("tagColors"),l=r.objectStore("attachments"),d=r.objectStore("auditLogs");o.clear(),a.clear(),i.clear(),l.clear(),d.clear(),r.oncomplete=()=>e(),r.onerror=()=>t(r.error)})}async function vo(){const s=await Ee();return new Promise((e,t)=>{try{const o=s.transaction("tagColors","readonly").objectStore("tagColors").getAll();o.onerror=()=>t(o.error),o.onsuccess=()=>e(o.result||[])}catch{e([])}})}async function Ia(s){const e=await Ee();return new Promise((t,n)=>{const a=e.transaction("tagColors","readwrite").objectStore("tagColors").put(s);a.onerror=()=>n(a.error),a.onsuccess=()=>t()})}async function La(s){const e=await Ee();return new Promise((t,n)=>{const a=e.transaction("attachments","readwrite").objectStore("attachments").put(s);a.onerror=()=>n(a.error),a.onsuccess=()=>t()})}async function Fs(s){const e=await Ee();return new Promise((t,n)=>{try{const a=e.transaction("attachments","readonly").objectStore("attachments").get(s);a.onerror=()=>n(a.error),a.onsuccess=()=>t(a.result||null)}catch{t(null)}})}async function Ca(){const s=await Ee();return new Promise((e,t)=>{try{const o=s.transaction("attachments","readonly").objectStore("attachments").getAll();o.onerror=()=>t(o.error),o.onsuccess=()=>e(o.result||[])}catch{e([])}})}async function Ra(s){const e=await Ee();return new Promise((t,n)=>{try{const a=e.transaction("auditLogs","readwrite").objectStore("auditLogs").put(s);a.onerror=()=>n(a.error),a.onsuccess=()=>t()}catch(r){console.error("Audit logging transaction failed:",r),t()}})}async function Eo(){const s=await Ee();return new Promise((e,t)=>{try{const o=s.transaction("auditLogs","readonly").objectStore("auditLogs").getAll();o.onerror=()=>t(o.error),o.onsuccess=()=>{const a=o.result||[];a.sort((i,l)=>l.timestamp-i.timestamp),e(a)}}catch{e([])}})}async function ko(){const s=await Ee();return new Promise((e,t)=>{const o=s.transaction("auditLogs","readwrite").objectStore("auditLogs").clear();o.onerror=()=>t(o.error),o.onsuccess=()=>e()})}async function So(s){const e=await Ee(),t=Date.now()-s*24*60*60*1e3;return new Promise((n,r)=>{try{const i=e.transaction("auditLogs","readwrite").objectStore("auditLogs").openCursor();i.onerror=()=>r(i.error),i.onsuccess=()=>{const l=i.result;l?(l.value.timestamp<t&&l.delete(),l.continue()):n()}}catch(o){r(o)}})}async function Da(s){const e=await Ee();return new Promise((t,n)=>{const a=e.transaction("backups","readwrite").objectStore("backups").put(s);a.onerror=()=>n(a.error),a.onsuccess=()=>t()})}/*! @license DOMPurify 3.4.11 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.4.11/LICENSE */function Ws(s,e){(e==null||e>s.length)&&(e=s.length);for(var t=0,n=Array(e);t<e;t++)n[t]=s[t];return n}function $a(s){if(Array.isArray(s))return s}function _a(s,e){var t=s==null?null:typeof Symbol<"u"&&s[Symbol.iterator]||s["@@iterator"];if(t!=null){var n,r,o,a,i=[],l=!0,d=!1;try{if(o=(t=t.call(s)).next,e!==0)for(;!(l=(n=o.call(t)).done)&&(i.push(n.value),i.length!==e);l=!0);}catch(p){d=!0,r=p}finally{try{if(!l&&t.return!=null&&(a=t.return(),Object(a)!==a))return}finally{if(d)throw r}}return i}}function Oa(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Na(s,e){return $a(s)||_a(s,e)||Pa(s,e)||Oa()}function Pa(s,e){if(s){if(typeof s=="string")return Ws(s,e);var t={}.toString.call(s).slice(8,-1);return t==="Object"&&s.constructor&&(t=s.constructor.name),t==="Map"||t==="Set"?Array.from(s):t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?Ws(s,e):void 0}}const To=Object.entries,qs=Object.setPrototypeOf,Ma=Object.isFrozen,Ba=Object.getPrototypeOf,Ua=Object.getOwnPropertyDescriptor;let Ie=Object.freeze,Le=Object.seal,St=Object.create,Ao=typeof Reflect<"u"&&Reflect,Qn=Ao.apply,es=Ao.construct;Ie||(Ie=function(e){return e});Le||(Le=function(e){return e});Qn||(Qn=function(e,t){for(var n=arguments.length,r=new Array(n>2?n-2:0),o=2;o<n;o++)r[o-2]=arguments[o];return e.apply(t,r)});es||(es=function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return new e(...n)});const $t=we(Array.prototype.forEach),za=we(Array.prototype.lastIndexOf),Gs=we(Array.prototype.pop),kt=we(Array.prototype.push),ja=we(Array.prototype.splice),ot=Array.isArray,Mt=we(String.prototype.toLowerCase),Bn=we(String.prototype.toString),Ks=we(String.prototype.match),_t=we(String.prototype.replace),Vs=we(String.prototype.indexOf),Ha=we(String.prototype.trim),Fa=we(Number.prototype.toString),Wa=we(Boolean.prototype.toString),Ys=typeof BigInt>"u"?null:we(BigInt.prototype.toString),Zs=typeof Symbol>"u"?null:we(Symbol.prototype.toString),Se=we(Object.prototype.hasOwnProperty),Ot=we(Object.prototype.toString),Ae=we(RegExp.prototype.test),ct=qa(TypeError);function we(s){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return Qn(s,e,n)}}function qa(s){return function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return es(s,t)}}function te(s,e){let t=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Mt;if(qs&&qs(s,null),!ot(e))return s;let n=e.length;for(;n--;){let r=e[n];if(typeof r=="string"){const o=t(r);o!==r&&(Ma(e)||(e[n]=o),r=o)}s[r]=!0}return s}function Ga(s){for(let e=0;e<s.length;e++)Se(s,e)||(s[e]=null);return s}function _e(s){const e=St(null);for(const n of To(s)){var t=Na(n,2);const r=t[0],o=t[1];Se(s,r)&&(ot(o)?e[r]=Ga(o):o&&typeof o=="object"&&o.constructor===Object?e[r]=_e(o):e[r]=o)}return e}function Ka(s){switch(typeof s){case"string":return s;case"number":return Fa(s);case"boolean":return Wa(s);case"bigint":return Ys?Ys(s):"0";case"symbol":return Zs?Zs(s):"Symbol()";case"undefined":return Ot(s);case"function":case"object":{if(s===null)return Ot(s);const e=s,t=Ye(e,"toString");if(typeof t=="function"){const n=t(e);return typeof n=="string"?n:Ot(n)}return Ot(s)}default:return Ot(s)}}function Ye(s,e){for(;s!==null;){const n=Ua(s,e);if(n){if(n.get)return we(n.get);if(typeof n.value=="function")return we(n.value)}s=Ba(s)}function t(){return null}return t}function Va(s){try{return Ae(s,""),!0}catch{return!1}}const Xs=Ie(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Un=Ie(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),zn=Ie(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Ya=Ie(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),jn=Ie(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Za=Ie(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Js=Ie(["#text"]),Qs=Ie(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","command","commandfor","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns"]),Hn=Ie(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),eo=Ie(["accent","accentunder","align","bevelled","close","columnalign","columnlines","columnspacing","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lquote","lspace","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),tn=Ie(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Xa=Le(/{{[\w\W]*|^[\w\W]*}}/g),Ja=Le(/<%[\w\W]*|^[\w\W]*%>/g),Qa=Le(/\${[\w\W]*/g),er=Le(/^data-[\-\w.\u00B7-\uFFFF]+$/),tr=Le(/^aria-[\-\w]+$/),to=Le(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),nr=Le(/^(?:\w+script|data):/i),sr=Le(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),or=Le(/^html$/i),ar=Le(/^[a-z][.\w]*(-[.\w]+)+$/i),no=Le(/<[/\w!]/g),rr=Le(/<[/\w]/g),ir=Le(/<\/no(script|embed|frames)/i),lr=Le(/\/>/i),Ve={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,processingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},cr=function(){return typeof window>"u"?null:window},dr=function(e,t){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let n=null;const r="data-tt-policy-suffix";t&&t.hasAttribute(r)&&(n=t.getAttribute(r));const o="dompurify"+(n?"#"+n:"");try{return e.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},so=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}},st=function(e,t,n,r){return Se(e,t)&&ot(e[t])?te(r.base?_e(r.base):{},e[t],r.transform):n};function Io(){let s=arguments.length>0&&arguments[0]!==void 0?arguments[0]:cr();const e=L=>Io(L);if(e.version="3.4.11",e.removed=[],!s||!s.document||s.document.nodeType!==Ve.document||!s.Element)return e.isSupported=!1,e;let t=s.document;const n=t,r=n.currentScript;s.DocumentFragment;const o=s.HTMLTemplateElement,a=s.Node,i=s.Element,l=s.NodeFilter,d=s.NamedNodeMap;d===void 0&&(s.NamedNodeMap||s.MozNamedAttrMap),s.HTMLFormElement;const p=s.DOMParser,g=s.trustedTypes,m=i.prototype,u=Ye(m,"cloneNode"),A=Ye(m,"remove"),U=Ye(m,"nextSibling"),E=Ye(m,"childNodes"),D=Ye(m,"parentNode"),J=Ye(m,"shadowRoot"),S=Ye(m,"attributes"),y=a&&a.prototype?Ye(a.prototype,"nodeType"):null,N=a&&a.prototype?Ye(a.prototype,"nodeName"):null;if(typeof o=="function"){const L=t.createElement("template");L.content&&L.content.ownerDocument&&(t=L.content.ownerDocument)}let w,x="",F,H=!1,O=0;const j=function(){if(O>0)throw ct('A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted Types" section of the README.')},ae=function(c){j(),O++;try{return w.createHTML(c)}finally{O--}},se=function(c){j(),O++;try{return w.createScriptURL(c)}finally{O--}},re=function(){return H||(F=dr(g,r),H=!0),F},he=t,W=he.implementation,b=he.createNodeIterator,$=he.createDocumentFragment,K=he.getElementsByTagName,V=n.importNode;let B=so();e.isSupported=typeof To=="function"&&typeof D=="function"&&W&&W.createHTMLDocument!==void 0;const le=Xa,v=Ja,G=Qa,_=er,P=tr,z=nr,h=sr,C=ar;let k=to,T=null;const Y=te({},[...Xs,...Un,...zn,...jn,...Js]);let q=null;const pe=te({},[...Qs,...Hn,...eo,...tn]);let Q=Object.seal(St(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),be=null,Te=null;const De=Object.seal(St(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let Ne=!0,ve=!0,tt=!1,Lt=!0,qe=!1,Ct=!0,it=!1,En=!1,kn=null,Sn=null,Tn=!1,xt=!1,Kt=!1,Vt=!1,Es=!0,ks=!1;const Ss="user-content-";let An=!0,In=!1,yt={},Ge=null;const Ln=te({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","selectedcontent","style","svg","template","thead","title","video","xmp"]);let Ts=null;const As=te({},["audio","video","img","source","image","track"]);let Cn=null;const Is=te({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Yt="http://www.w3.org/1998/Math/MathML",Zt="http://www.w3.org/2000/svg",Ke="http://www.w3.org/1999/xhtml";let wt=Ke,Rn=!1,Dn=null;const sa=te({},[Yt,Zt,Ke],Bn),Ls=Ie(["mi","mo","mn","ms","mtext"]);let $n=te({},Ls);const Cs=Ie(["annotation-xml"]);let _n=te({},Cs);const oa=te({},["title","style","font","a","script"]);let Rt=null;const aa=["application/xhtml+xml","text/html"],ra="text/html";let fe=null,vt=null;const ia=t.createElement("form"),Rs=function(c){return c instanceof RegExp||c instanceof Function},On=function(){let c=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(vt&&vt===c)return;(!c||typeof c!="object")&&(c={}),c=_e(c),Rt=aa.indexOf(c.PARSER_MEDIA_TYPE)===-1?ra:c.PARSER_MEDIA_TYPE,fe=Rt==="application/xhtml+xml"?Bn:Mt,T=st(c,"ALLOWED_TAGS",Y,{transform:fe}),q=st(c,"ALLOWED_ATTR",pe,{transform:fe}),Dn=st(c,"ALLOWED_NAMESPACES",sa,{transform:Bn}),Cn=st(c,"ADD_URI_SAFE_ATTR",Is,{transform:fe,base:Is}),Ts=st(c,"ADD_DATA_URI_TAGS",As,{transform:fe,base:As}),Ge=st(c,"FORBID_CONTENTS",Ln,{transform:fe}),be=st(c,"FORBID_TAGS",_e({}),{transform:fe}),Te=st(c,"FORBID_ATTR",_e({}),{transform:fe}),yt=Se(c,"USE_PROFILES")?c.USE_PROFILES&&typeof c.USE_PROFILES=="object"?_e(c.USE_PROFILES):c.USE_PROFILES:!1,Ne=c.ALLOW_ARIA_ATTR!==!1,ve=c.ALLOW_DATA_ATTR!==!1,tt=c.ALLOW_UNKNOWN_PROTOCOLS||!1,Lt=c.ALLOW_SELF_CLOSE_IN_ATTR!==!1,qe=c.SAFE_FOR_TEMPLATES||!1,Ct=c.SAFE_FOR_XML!==!1,it=c.WHOLE_DOCUMENT||!1,xt=c.RETURN_DOM||!1,Kt=c.RETURN_DOM_FRAGMENT||!1,Vt=c.RETURN_TRUSTED_TYPE||!1,Tn=c.FORCE_BODY||!1,Es=c.SANITIZE_DOM!==!1,ks=c.SANITIZE_NAMED_PROPS||!1,An=c.KEEP_CONTENT!==!1,In=c.IN_PLACE||!1,k=Va(c.ALLOWED_URI_REGEXP)?c.ALLOWED_URI_REGEXP:to,wt=typeof c.NAMESPACE=="string"?c.NAMESPACE:Ke,$n=Se(c,"MATHML_TEXT_INTEGRATION_POINTS")&&c.MATHML_TEXT_INTEGRATION_POINTS&&typeof c.MATHML_TEXT_INTEGRATION_POINTS=="object"?_e(c.MATHML_TEXT_INTEGRATION_POINTS):te({},Ls),_n=Se(c,"HTML_INTEGRATION_POINTS")&&c.HTML_INTEGRATION_POINTS&&typeof c.HTML_INTEGRATION_POINTS=="object"?_e(c.HTML_INTEGRATION_POINTS):te({},Cs);const f=Se(c,"CUSTOM_ELEMENT_HANDLING")&&c.CUSTOM_ELEMENT_HANDLING&&typeof c.CUSTOM_ELEMENT_HANDLING=="object"?_e(c.CUSTOM_ELEMENT_HANDLING):St(null);if(Q=St(null),Se(f,"tagNameCheck")&&Rs(f.tagNameCheck)&&(Q.tagNameCheck=f.tagNameCheck),Se(f,"attributeNameCheck")&&Rs(f.attributeNameCheck)&&(Q.attributeNameCheck=f.attributeNameCheck),Se(f,"allowCustomizedBuiltInElements")&&typeof f.allowCustomizedBuiltInElements=="boolean"&&(Q.allowCustomizedBuiltInElements=f.allowCustomizedBuiltInElements),Le(Q),qe&&(ve=!1),Kt&&(xt=!0),yt&&(T=te({},Js),q=St(null),yt.html===!0&&(te(T,Xs),te(q,Qs)),yt.svg===!0&&(te(T,Un),te(q,Hn),te(q,tn)),yt.svgFilters===!0&&(te(T,zn),te(q,Hn),te(q,tn)),yt.mathMl===!0&&(te(T,jn),te(q,eo),te(q,tn))),De.tagCheck=null,De.attributeCheck=null,Se(c,"ADD_TAGS")&&(typeof c.ADD_TAGS=="function"?De.tagCheck=c.ADD_TAGS:ot(c.ADD_TAGS)&&(T===Y&&(T=_e(T)),te(T,c.ADD_TAGS,fe))),Se(c,"ADD_ATTR")&&(typeof c.ADD_ATTR=="function"?De.attributeCheck=c.ADD_ATTR:ot(c.ADD_ATTR)&&(q===pe&&(q=_e(q)),te(q,c.ADD_ATTR,fe))),Se(c,"ADD_URI_SAFE_ATTR")&&ot(c.ADD_URI_SAFE_ATTR)&&te(Cn,c.ADD_URI_SAFE_ATTR,fe),Se(c,"FORBID_CONTENTS")&&ot(c.FORBID_CONTENTS)&&(Ge===Ln&&(Ge=_e(Ge)),te(Ge,c.FORBID_CONTENTS,fe)),Se(c,"ADD_FORBID_CONTENTS")&&ot(c.ADD_FORBID_CONTENTS)&&(Ge===Ln&&(Ge=_e(Ge)),te(Ge,c.ADD_FORBID_CONTENTS,fe)),An&&(T["#text"]=!0),it&&te(T,["html","head","body"]),T.table&&(te(T,["tbody"]),delete be.tbody),c.TRUSTED_TYPES_POLICY){if(typeof c.TRUSTED_TYPES_POLICY.createHTML!="function")throw ct('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof c.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw ct('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');const I=w;w=c.TRUSTED_TYPES_POLICY;try{x=ae("")}catch(M){throw w=I,M}}else c.TRUSTED_TYPES_POLICY===null?(w=void 0,x=""):(w===void 0&&(w=re()),w&&typeof x=="string"&&(x=ae("")));Ie&&Ie(c),vt=c},Ds=te({},[...Un,...zn,...Ya]),$s=te({},[...jn,...Za]),la=function(c,f,I){return f.namespaceURI===Ke?c==="svg":f.namespaceURI===Yt?c==="svg"&&(I==="annotation-xml"||$n[I]):!!Ds[c]},ca=function(c,f,I){return f.namespaceURI===Ke?c==="math":f.namespaceURI===Zt?c==="math"&&_n[I]:!!$s[c]},da=function(c,f,I){return f.namespaceURI===Zt&&!_n[I]||f.namespaceURI===Yt&&!$n[I]?!1:!$s[c]&&(oa[c]||!Ds[c])},pa=function(c){let f=D(c);(!f||!f.tagName)&&(f={namespaceURI:wt,tagName:"template"});const I=Mt(c.tagName),M=Mt(f.tagName);return Dn[c.namespaceURI]?c.namespaceURI===Zt?la(I,f,M):c.namespaceURI===Yt?ca(I,f,M):c.namespaceURI===Ke?da(I,f,M):!!(Rt==="application/xhtml+xml"&&Dn[c.namespaceURI]):!1},nt=function(c){kt(e.removed,{element:c});try{D(c).removeChild(c)}catch{if(A(c),!D(c))throw ct("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place")}},_s=function(c){const f=E(c);if(f){const M=[];$t(f,X=>{kt(M,X)}),$t(M,X=>{try{A(X)}catch{}})}const I=S(c);if(I)for(let M=I.length-1;M>=0;--M){const X=I[M],ne=X&&X.name;if(typeof ne=="string")try{c.removeAttribute(ne)}catch{}}},lt=function(c,f){try{kt(e.removed,{attribute:f.getAttributeNode(c),from:f})}catch{kt(e.removed,{attribute:null,from:f})}if(f.removeAttribute(c),c==="is")if(xt||Kt)try{nt(f)}catch{}else try{f.setAttribute(c,"")}catch{}},ua=function(c){const f=S(c);if(f)for(let I=f.length-1;I>=0;--I){const M=f[I],X=M&&M.name;if(!(typeof X!="string"||q[fe(X)]))try{c.removeAttribute(X)}catch{}}},fa=function(c){const f=[c];for(;f.length>0;){const I=f.pop();(y?y(I):I.nodeType)===Ve.element&&ua(I);const X=E(I);if(X)for(let ne=X.length-1;ne>=0;--ne)f.push(X[ne])}},Os=function(c){let f=null,I=null;if(Tn)c="<remove></remove>"+c;else{const ne=Ks(c,/^[\r\n\t ]+/);I=ne&&ne[0]}Rt==="application/xhtml+xml"&&wt===Ke&&(c='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+c+"</body></html>");const M=w?ae(c):c;if(wt===Ke)try{f=new p().parseFromString(M,Rt)}catch{}if(!f||!f.documentElement){f=W.createDocument(wt,"template",null);try{f.documentElement.innerHTML=Rn?x:M}catch{}}const X=f.body||f.documentElement;return c&&I&&X.insertBefore(t.createTextNode(I),X.childNodes[0]||null),wt===Ke?K.call(f,it?"html":"body")[0]:it?f.documentElement:X},Ns=function(c){return b.call(c.ownerDocument||c,c,l.SHOW_ELEMENT|l.SHOW_COMMENT|l.SHOW_TEXT|l.SHOW_PROCESSING_INSTRUCTION|l.SHOW_CDATA_SECTION,null)},Xt=function(c){return c=_t(c,le," "),c=_t(c,v," "),c=_t(c,G," "),c},Nn=function(c){var f;c.normalize();const I=b.call(c.ownerDocument||c,c,l.SHOW_TEXT|l.SHOW_COMMENT|l.SHOW_CDATA_SECTION|l.SHOW_PROCESSING_INSTRUCTION,null);let M=I.nextNode();for(;M;)M.data=Xt(M.data),M=I.nextNode();const X=(f=c.querySelectorAll)===null||f===void 0?void 0:f.call(c,"template");X&&$t(X,ne=>{Et(ne.content)&&Nn(ne.content)})},Jt=function(c){const f=N?N(c):null;return typeof f!="string"||fe(f)!=="form"?!1:typeof c.nodeName!="string"||typeof c.textContent!="string"||typeof c.removeChild!="function"||c.attributes!==S(c)||typeof c.removeAttribute!="function"||typeof c.setAttribute!="function"||typeof c.namespaceURI!="string"||typeof c.insertBefore!="function"||typeof c.hasChildNodes!="function"||c.nodeType!==y(c)||c.childNodes!==E(c)},Et=function(c){if(!y||typeof c!="object"||c===null)return!1;try{return y(c)===Ve.documentFragment}catch{return!1}},Dt=function(c){if(!y||typeof c!="object"||c===null)return!1;try{return typeof y(c)=="number"}catch{return!1}};function Je(L,c,f){L.length!==0&&$t(L,I=>{I.call(e,c,f,vt)})}const ma=function(c,f){return!!(Ct&&c.hasChildNodes()&&!Dt(c.firstElementChild)&&Ae(no,c.textContent)&&Ae(no,c.innerHTML)||Ct&&c.namespaceURI===Ke&&f==="style"&&Dt(c.firstElementChild)||c.nodeType===Ve.processingInstruction||Ct&&c.nodeType===Ve.comment&&Ae(rr,c.data))},ga=function(c,f){if(!be[f]&&Bs(f)&&(Q.tagNameCheck instanceof RegExp&&Ae(Q.tagNameCheck,f)||Q.tagNameCheck instanceof Function&&Q.tagNameCheck(f)))return!1;if(An&&!Ge[f]){const I=D(c),M=E(c);if(M&&I){const X=M.length;for(let ne=X-1;ne>=0;--ne){const ke=In?M[ne]:u(M[ne],!0);I.insertBefore(ke,U(c))}}}return nt(c),!0},Ps=function(c){if(Je(B.beforeSanitizeElements,c,null),Jt(c))return nt(c),!0;const f=fe(N?N(c):c.nodeName);if(Je(B.uponSanitizeElement,c,{tagName:f,allowedTags:T}),ma(c,f))return nt(c),!0;if(be[f]||!(De.tagCheck instanceof Function&&De.tagCheck(f))&&!T[f])return ga(c,f);if((y?y(c):c.nodeType)===Ve.element&&!pa(c)||(f==="noscript"||f==="noembed"||f==="noframes")&&Ae(ir,c.innerHTML))return nt(c),!0;if(qe&&c.nodeType===Ve.text){const M=Xt(c.textContent);c.textContent!==M&&(kt(e.removed,{element:c.cloneNode()}),c.textContent=M)}return Je(B.afterSanitizeElements,c,null),!1},Ms=function(c,f,I){if(Te[f]||Es&&(f==="id"||f==="name")&&(I in t||I in ia))return!1;const M=q[f]||De.attributeCheck instanceof Function&&De.attributeCheck(f,c);if(!(ve&&Ae(_,f))){if(!(Ne&&Ae(P,f))){if(M){if(!Cn[f]){if(!Ae(k,_t(I,h,""))){if(!((f==="src"||f==="xlink:href"||f==="href")&&c!=="script"&&Vs(I,"data:")===0&&Ts[c])){if(!(tt&&!Ae(z,_t(I,h,"")))){if(I)return!1}}}}}else if(!(Bs(c)&&(Q.tagNameCheck instanceof RegExp&&Ae(Q.tagNameCheck,c)||Q.tagNameCheck instanceof Function&&Q.tagNameCheck(c))&&(Q.attributeNameCheck instanceof RegExp&&Ae(Q.attributeNameCheck,f)||Q.attributeNameCheck instanceof Function&&Q.attributeNameCheck(f,c))||f==="is"&&Q.allowCustomizedBuiltInElements&&(Q.tagNameCheck instanceof RegExp&&Ae(Q.tagNameCheck,I)||Q.tagNameCheck instanceof Function&&Q.tagNameCheck(I))))return!1}}return!0},ha=te({},["annotation-xml","color-profile","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","missing-glyph"]),Bs=function(c){return!ha[Mt(c)]&&Ae(C,c)},ba=function(c,f,I,M){if(w&&typeof g=="object"&&typeof g.getAttributeType=="function"&&!I)switch(g.getAttributeType(c,f)){case"TrustedHTML":return ae(M);case"TrustedScriptURL":return se(M)}return M},xa=function(c,f,I,M){try{I?c.setAttributeNS(I,f,M):c.setAttribute(f,M),Jt(c)?nt(c):Gs(e.removed)}catch{lt(f,c)}},Us=function(c){Je(B.beforeSanitizeAttributes,c,null);const f=c.attributes;if(!f||Jt(c))return;const I={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:q,forceKeepAttr:void 0};let M=f.length;const X=fe(c.nodeName);for(;M--;){const ne=f[M],ke=ne.name,xe=ne.namespaceURI,Pe=ne.value,He=fe(ke),Mn=Pe;let $e=ke==="value"?Mn:Ha(Mn);if(I.attrName=He,I.attrValue=$e,I.keepAttr=!0,I.forceKeepAttr=void 0,Je(B.uponSanitizeAttribute,c,I),$e=I.attrValue,ks&&(He==="id"||He==="name")&&Vs($e,Ss)!==0&&(lt(ke,c),$e=Ss+$e),Ct&&Ae(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i,$e)){lt(ke,c);continue}if(He==="attributename"&&Ks($e,"href")){lt(ke,c);continue}if(!I.forceKeepAttr){if(!I.keepAttr){lt(ke,c);continue}if(!Lt&&Ae(lr,$e)){lt(ke,c);continue}if(qe&&($e=Xt($e)),!Ms(X,He,$e)){lt(ke,c);continue}$e=ba(X,He,xe,$e),$e!==Mn&&xa(c,ke,xe,$e)}}Je(B.afterSanitizeAttributes,c,null)},Qt=function(c){let f=null;const I=Ns(c);for(Je(B.beforeSanitizeShadowDOM,c,null);f=I.nextNode();)if(Je(B.uponSanitizeShadowNode,f,null),Ps(f),Us(f),Et(f.content)&&Qt(f.content),(y?y(f):f.nodeType)===Ve.element){const X=J(f);Et(X)&&(Pn(X),Qt(X))}Je(B.afterSanitizeShadowDOM,c,null)},Pn=function(c){const f=[{node:c,shadow:null}];for(;f.length>0;){const I=f.pop();if(I.shadow){Qt(I.shadow);continue}const M=I.node,ne=(y?y(M):M.nodeType)===Ve.element,ke=E(M);if(ke)for(let xe=ke.length-1;xe>=0;--xe)f.push({node:ke[xe],shadow:null});if(ne){const xe=N?N(M):null;if(typeof xe=="string"&&fe(xe)==="template"){const Pe=M.content;Et(Pe)&&f.push({node:Pe,shadow:null})}}if(ne){const xe=J(M);Et(xe)&&f.push({node:null,shadow:xe},{node:xe,shadow:null})}}};return e.sanitize=function(L){let c=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},f=null,I=null,M=null,X=null;if(Rn=!L,Rn&&(L="<!-->"),typeof L!="string"&&!Dt(L)&&(L=Ka(L),typeof L!="string"))throw ct("dirty is not a string, aborting");if(!e.isSupported)return L;En?(T=kn,q=Sn):On(c),(B.uponSanitizeElement.length>0||B.uponSanitizeAttribute.length>0)&&(T=_e(T)),B.uponSanitizeAttribute.length>0&&(q=_e(q)),e.removed=[];const ne=In&&typeof L!="string"&&Dt(L);if(ne){const Pe=N?N(L):L.nodeName;if(typeof Pe=="string"){const He=fe(Pe);if(!T[He]||be[He])throw ct("root node is forbidden and cannot be sanitized in-place")}if(Jt(L))throw ct("root node is clobbered and cannot be sanitized in-place");try{Pn(L)}catch(He){throw _s(L),He}}else if(Dt(L))f=Os("<!---->"),I=f.ownerDocument.importNode(L,!0),I.nodeType===Ve.element&&I.nodeName==="BODY"||I.nodeName==="HTML"?f=I:f.appendChild(I),Pn(I);else{if(!xt&&!qe&&!it&&L.indexOf("<")===-1)return w&&Vt?ae(L):L;if(f=Os(L),!f)return xt?null:Vt?x:""}f&&Tn&&nt(f.firstChild);const ke=Ns(ne?L:f);try{for(;M=ke.nextNode();)Ps(M),Us(M),Et(M.content)&&Qt(M.content)}catch(Pe){throw ne&&_s(L),Pe}if(ne)return $t(e.removed,Pe=>{Pe.element&&fa(Pe.element)}),qe&&Nn(L),L;if(xt){if(qe&&Nn(f),Kt)for(X=$.call(f.ownerDocument);f.firstChild;)X.appendChild(f.firstChild);else X=f;return(q.shadowroot||q.shadowrootmode)&&(X=V.call(n,X,!0)),X}let xe=it?f.outerHTML:f.innerHTML;return it&&T["!doctype"]&&f.ownerDocument&&f.ownerDocument.doctype&&f.ownerDocument.doctype.name&&Ae(or,f.ownerDocument.doctype.name)&&(xe="<!DOCTYPE "+f.ownerDocument.doctype.name+`>
`+xe),qe&&(xe=Xt(xe)),w&&Vt?ae(xe):xe},e.setConfig=function(){let L=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};On(L),En=!0,kn=T,Sn=q},e.clearConfig=function(){vt=null,En=!1,kn=null,Sn=null,w=F,x=""},e.isValidAttribute=function(L,c,f){vt||On({});const I=fe(L),M=fe(c);return Ms(I,M,f)},e.addHook=function(L,c){typeof c=="function"&&Se(B,L)&&kt(B[L],c)},e.removeHook=function(L,c){if(Se(B,L)){if(c!==void 0){const f=za(B[L],c);return f===-1?void 0:ja(B[L],f,1)[0]}return Gs(B[L])}},e.removeHooks=function(L){Se(B,L)&&(B[L]=[])},e.removeAllHooks=function(){B=so()},e}var Ut=Io();function ds(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}let ht=ds();function Lo(s){ht=s}const Co=/[&<>"']/,pr=new RegExp(Co.source,"g"),Ro=/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,ur=new RegExp(Ro.source,"g"),fr={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},oo=s=>fr[s];function Oe(s,e){if(e){if(Co.test(s))return s.replace(pr,oo)}else if(Ro.test(s))return s.replace(ur,oo);return s}const mr=/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;function gr(s){return s.replace(mr,(e,t)=>(t=t.toLowerCase(),t==="colon"?":":t.charAt(0)==="#"?t.charAt(1)==="x"?String.fromCharCode(parseInt(t.substring(2),16)):String.fromCharCode(+t.substring(1)):""))}const hr=/(^|[^\[])\^/g;function ie(s,e){let t=typeof s=="string"?s:s.source;e=e||"";const n={replace:(r,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(hr,"$1"),t=t.replace(r,a),n},getRegex:()=>new RegExp(t,e)};return n}function ao(s){try{s=encodeURI(s).replace(/%25/g,"%")}catch{return null}return s}const zt={exec:()=>null};function ro(s,e){const t=s.replace(/\|/g,(o,a,i)=>{let l=!1,d=a;for(;--d>=0&&i[d]==="\\";)l=!l;return l?"|":" |"}),n=t.split(/ \|/);let r=0;if(n[0].trim()||n.shift(),n.length>0&&!n[n.length-1].trim()&&n.pop(),e)if(n.length>e)n.splice(e);else for(;n.length<e;)n.push("");for(;r<n.length;r++)n[r]=n[r].trim().replace(/\\\|/g,"|");return n}function nn(s,e,t){const n=s.length;if(n===0)return"";let r=0;for(;r<n&&s.charAt(n-r-1)===e;)r++;return s.slice(0,n-r)}function br(s,e){if(s.indexOf(e[1])===-1)return-1;let t=0;for(let n=0;n<s.length;n++)if(s[n]==="\\")n++;else if(s[n]===e[0])t++;else if(s[n]===e[1]&&(t--,t<0))return n;return-1}function io(s,e,t,n){const r=e.href,o=e.title?Oe(e.title):null,a=s[1].replace(/\\([\[\]])/g,"$1");if(s[0].charAt(0)!=="!"){n.state.inLink=!0;const i={type:"link",raw:t,href:r,title:o,text:a,tokens:n.inlineTokens(a)};return n.state.inLink=!1,i}return{type:"image",raw:t,href:r,title:o,text:Oe(a)}}function xr(s,e){const t=s.match(/^(\s+)(?:```)/);if(t===null)return e;const n=t[1];return e.split(`
`).map(r=>{const o=r.match(/^\s+/);if(o===null)return r;const[a]=o;return a.length>=n.length?r.slice(n.length):r}).join(`
`)}class fn{constructor(e){ce(this,"options");ce(this,"rules");ce(this,"lexer");this.options=e||ht}space(e){const t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){const t=this.rules.block.code.exec(e);if(t){const n=t[0].replace(/^ {1,4}/gm,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:nn(n,`
`)}}}fences(e){const t=this.rules.block.fences.exec(e);if(t){const n=t[0],r=xr(n,t[3]||"");return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){const t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(/#$/.test(n)){const r=nn(n,"#");(this.options.pedantic||!r||/ $/.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){const t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:t[0]}}blockquote(e){const t=this.rules.block.blockquote.exec(e);if(t){let n=t[0].replace(/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,`
    $1`);n=nn(n.replace(/^ *>[ \t]?/gm,""),`
`);const r=this.lexer.state.top;this.lexer.state.top=!0;const o=this.lexer.blockTokens(n);return this.lexer.state.top=r,{type:"blockquote",raw:t[0],tokens:o,text:n}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim();const r=n.length>1,o={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");const a=new RegExp(`^( {0,3}${n})((?:[	 ][^\\n]*)?(?:\\n|$))`);let i="",l="",d=!1;for(;e;){let p=!1;if(!(t=a.exec(e))||this.rules.block.hr.test(e))break;i=t[0],e=e.substring(i.length);let g=t[2].split(`
`,1)[0].replace(/^\t+/,D=>" ".repeat(3*D.length)),m=e.split(`
`,1)[0],u=0;this.options.pedantic?(u=2,l=g.trimStart()):(u=t[2].search(/[^ ]/),u=u>4?1:u,l=g.slice(u),u+=t[1].length);let A=!1;if(!g&&/^ *$/.test(m)&&(i+=m+`
`,e=e.substring(m.length+1),p=!0),!p){const D=new RegExp(`^ {0,${Math.min(3,u-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),J=new RegExp(`^ {0,${Math.min(3,u-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),S=new RegExp(`^ {0,${Math.min(3,u-1)}}(?:\`\`\`|~~~)`),y=new RegExp(`^ {0,${Math.min(3,u-1)}}#`);for(;e;){const N=e.split(`
`,1)[0];if(m=N,this.options.pedantic&&(m=m.replace(/^ {1,4}(?=( {4})*[^ ])/g,"  ")),S.test(m)||y.test(m)||D.test(m)||J.test(e))break;if(m.search(/[^ ]/)>=u||!m.trim())l+=`
`+m.slice(u);else{if(A||g.search(/[^ ]/)>=4||S.test(g)||y.test(g)||J.test(g))break;l+=`
`+m}!A&&!m.trim()&&(A=!0),i+=N+`
`,e=e.substring(N.length+1),g=m.slice(u)}}o.loose||(d?o.loose=!0:/\n *\n *$/.test(i)&&(d=!0));let U=null,E;this.options.gfm&&(U=/^\[[ xX]\] /.exec(l),U&&(E=U[0]!=="[ ] ",l=l.replace(/^\[[ xX]\] +/,""))),o.items.push({type:"list_item",raw:i,task:!!U,checked:E,loose:!1,text:l,tokens:[]}),o.raw+=i}o.items[o.items.length-1].raw=i.trimEnd(),o.items[o.items.length-1].text=l.trimEnd(),o.raw=o.raw.trimEnd();for(let p=0;p<o.items.length;p++)if(this.lexer.state.top=!1,o.items[p].tokens=this.lexer.blockTokens(o.items[p].text,[]),!o.loose){const g=o.items[p].tokens.filter(u=>u.type==="space"),m=g.length>0&&g.some(u=>/\n.*\n/.test(u.raw));o.loose=m}if(o.loose)for(let p=0;p<o.items.length;p++)o.items[p].loose=!0;return o}}html(e){const t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){const t=this.rules.block.def.exec(e);if(t){const n=t[1].toLowerCase().replace(/\s+/g," "),r=t[2]?t[2].replace(/^<(.*)>$/,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",o=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:o}}}table(e){const t=this.rules.block.table.exec(e);if(!t||!/[:|]/.test(t[2]))return;const n=ro(t[1]),r=t[2].replace(/^\||\| *$/g,"").split("|"),o=t[3]&&t[3].trim()?t[3].replace(/\n[ \t]*$/,"").split(`
`):[],a={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(const i of r)/^ *-+: *$/.test(i)?a.align.push("right"):/^ *:-+: *$/.test(i)?a.align.push("center"):/^ *:-+ *$/.test(i)?a.align.push("left"):a.align.push(null);for(const i of n)a.header.push({text:i,tokens:this.lexer.inline(i)});for(const i of o)a.rows.push(ro(i,a.header.length).map(l=>({text:l,tokens:this.lexer.inline(l)})));return a}}lheading(e){const t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){const t=this.rules.block.paragraph.exec(e);if(t){const n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){const t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){const t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:Oe(t[1])}}tag(e){const t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&/^<a /i.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&/^<\/a>/i.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&/^<(pre|code|kbd|script)(\s|>)/i.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&/^<\/(pre|code|kbd|script)(\s|>)/i.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){const t=this.rules.inline.link.exec(e);if(t){const n=t[2].trim();if(!this.options.pedantic&&/^</.test(n)){if(!/>$/.test(n))return;const a=nn(n.slice(0,-1),"\\");if((n.length-a.length)%2===0)return}else{const a=br(t[2],"()");if(a>-1){const l=(t[0].indexOf("!")===0?5:4)+t[1].length+a;t[2]=t[2].substring(0,a),t[0]=t[0].substring(0,l).trim(),t[3]=""}}let r=t[2],o="";if(this.options.pedantic){const a=/^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(r);a&&(r=a[1],o=a[3])}else o=t[3]?t[3].slice(1,-1):"";return r=r.trim(),/^</.test(r)&&(this.options.pedantic&&!/>$/.test(n)?r=r.slice(1):r=r.slice(1,-1)),io(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:o&&o.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){const r=(n[2]||n[1]).replace(/\s+/g," "),o=t[r.toLowerCase()];if(!o){const a=n[0].charAt(0);return{type:"text",raw:a,text:a}}return io(n,o,n[0],this.lexer)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!r||r[3]&&n.match(/[\p{L}\p{N}]/u))return;if(!(r[1]||r[2]||"")||!n||this.rules.inline.punctuation.exec(n)){const a=[...r[0]].length-1;let i,l,d=a,p=0;const g=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(g.lastIndex=0,t=t.slice(-1*e.length+a);(r=g.exec(t))!=null;){if(i=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!i)continue;if(l=[...i].length,r[3]||r[4]){d+=l;continue}else if((r[5]||r[6])&&a%3&&!((a+l)%3)){p+=l;continue}if(d-=l,d>0)continue;l=Math.min(l,l+d+p);const m=[...r[0]][0].length,u=e.slice(0,a+r.index+m+l);if(Math.min(a,l)%2){const U=u.slice(1,-1);return{type:"em",raw:u,text:U,tokens:this.lexer.inlineTokens(U)}}const A=u.slice(2,-2);return{type:"strong",raw:u,text:A,tokens:this.lexer.inlineTokens(A)}}}}codespan(e){const t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(/\n/g," ");const r=/[^ ]/.test(n),o=/^ /.test(n)&&/ $/.test(n);return r&&o&&(n=n.substring(1,n.length-1)),n=Oe(n,!0),{type:"codespan",raw:t[0],text:n}}}br(e){const t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){const t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){const t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=Oe(t[1]),r="mailto:"+n):(n=Oe(t[1]),r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){var n;let t;if(t=this.rules.inline.url.exec(e)){let r,o;if(t[2]==="@")r=Oe(t[0]),o="mailto:"+r;else{let a;do a=t[0],t[0]=((n=this.rules.inline._backpedal.exec(t[0]))==null?void 0:n[0])??"";while(a!==t[0]);r=Oe(t[0]),t[1]==="www."?o="http://"+t[0]:o=t[0]}return{type:"link",raw:t[0],text:r,href:o,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e){const t=this.rules.inline.text.exec(e);if(t){let n;return this.lexer.state.inRawBlock?n=t[0]:n=Oe(t[0]),{type:"text",raw:t[0],text:n}}}}const yr=/^(?: *(?:\n|$))+/,wr=/^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,vr=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,qt=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Er=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Do=/(?:[*+-]|\d{1,9}[.)])/,$o=ie(/^(?!bull |blockCode|fences|blockquote|heading|html)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html))+?)\n {0,3}(=+|-+) *(?:\n+|$)/).replace(/bull/g,Do).replace(/blockCode/g,/ {4}/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).getRegex(),ps=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,kr=/^[^\n]+/,us=/(?!\s*\])(?:\\.|[^\[\]\\])+/,Sr=ie(/^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/).replace("label",us).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Tr=ie(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Do).getRegex(),vn="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",fs=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Ar=ie("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))","i").replace("comment",fs).replace("tag",vn).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),_o=ie(ps).replace("hr",qt).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",vn).getRegex(),Ir=ie(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",_o).getRegex(),ms={blockquote:Ir,code:wr,def:Sr,fences:vr,heading:Er,hr:qt,html:Ar,lheading:$o,list:Tr,newline:yr,paragraph:_o,table:zt,text:kr},lo=ie("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",qt).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code"," {4}[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",vn).getRegex(),Lr={...ms,table:lo,paragraph:ie(ps).replace("hr",qt).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",lo).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",vn).getRegex()},Cr={...ms,html:ie(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",fs).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:zt,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:ie(ps).replace("hr",qt).replace("heading",` *#{1,6} *[^
]`).replace("lheading",$o).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Oo=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Rr=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,No=/^( {2,}|\\)\n(?!\s*$)/,Dr=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Gt="\\p{P}\\p{S}",$r=ie(/^((?![*_])[\spunctuation])/,"u").replace(/punctuation/g,Gt).getRegex(),_r=/\[[^[\]]*?\]\([^\(\)]*?\)|`[^`]*?`|<[^<>]*?>/g,Or=ie(/^(?:\*+(?:((?!\*)[punct])|[^\s*]))|^_+(?:((?!_)[punct])|([^\s_]))/,"u").replace(/punct/g,Gt).getRegex(),Nr=ie("^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)[punct](\\*+)(?=[\\s]|$)|[^punct\\s](\\*+)(?!\\*)(?=[punct\\s]|$)|(?!\\*)[punct\\s](\\*+)(?=[^punct\\s])|[\\s](\\*+)(?!\\*)(?=[punct])|(?!\\*)[punct](\\*+)(?!\\*)(?=[punct])|[^punct\\s](\\*+)(?=[^punct\\s])","gu").replace(/punct/g,Gt).getRegex(),Pr=ie("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)[punct](_+)(?=[\\s]|$)|[^punct\\s](_+)(?!_)(?=[punct\\s]|$)|(?!_)[punct\\s](_+)(?=[^punct\\s])|[\\s](_+)(?!_)(?=[punct])|(?!_)[punct](_+)(?!_)(?=[punct])","gu").replace(/punct/g,Gt).getRegex(),Mr=ie(/\\([punct])/,"gu").replace(/punct/g,Gt).getRegex(),Br=ie(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Ur=ie(fs).replace("(?:-->|$)","-->").getRegex(),zr=ie("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Ur).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),mn=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,jr=ie(/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/).replace("label",mn).replace("href",/<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Po=ie(/^!?\[(label)\]\[(ref)\]/).replace("label",mn).replace("ref",us).getRegex(),Mo=ie(/^!?\[(ref)\](?:\[\])?/).replace("ref",us).getRegex(),Hr=ie("reflink|nolink(?!\\()","g").replace("reflink",Po).replace("nolink",Mo).getRegex(),gs={_backpedal:zt,anyPunctuation:Mr,autolink:Br,blockSkip:_r,br:No,code:Rr,del:zt,emStrongLDelim:Or,emStrongRDelimAst:Nr,emStrongRDelimUnd:Pr,escape:Oo,link:jr,nolink:Mo,punctuation:$r,reflink:Po,reflinkSearch:Hr,tag:zr,text:Dr,url:zt},Fr={...gs,link:ie(/^!?\[(label)\]\((.*?)\)/).replace("label",mn).getRegex(),reflink:ie(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",mn).getRegex()},ts={...gs,escape:ie(Oo).replace("])","~|])").getRegex(),url:ie(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},Wr={...ts,br:ie(No).replace("{2,}","*").getRegex(),text:ie(ts.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},sn={normal:ms,gfm:Lr,pedantic:Cr},Nt={normal:gs,gfm:ts,breaks:Wr,pedantic:Fr};class Ze{constructor(e){ce(this,"tokens");ce(this,"options");ce(this,"state");ce(this,"tokenizer");ce(this,"inlineQueue");this.tokens=[],this.tokens.links=Object.create(null),this.options=e||ht,this.options.tokenizer=this.options.tokenizer||new fn,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const t={block:sn.normal,inline:Nt.normal};this.options.pedantic?(t.block=sn.pedantic,t.inline=Nt.pedantic):this.options.gfm&&(t.block=sn.gfm,this.options.breaks?t.inline=Nt.breaks:t.inline=Nt.gfm),this.tokenizer.rules=t}static get rules(){return{block:sn,inline:Nt}}static lex(e,t){return new Ze(t).lex(e)}static lexInline(e,t){return new Ze(t).inlineTokens(e)}lex(e){e=e.replace(/\r\n|\r/g,`
`),this.blockTokens(e,this.tokens);for(let t=0;t<this.inlineQueue.length;t++){const n=this.inlineQueue[t];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,t=[]){this.options.pedantic?e=e.replace(/\t/g,"    ").replace(/^ +$/gm,""):e=e.replace(/^( *)(\t+)/gm,(i,l,d)=>l+"    ".repeat(d.length));let n,r,o,a;for(;e;)if(!(this.options.extensions&&this.options.extensions.block&&this.options.extensions.block.some(i=>(n=i.call({lexer:this},e,t))?(e=e.substring(n.raw.length),t.push(n),!0):!1))){if(n=this.tokenizer.space(e)){e=e.substring(n.raw.length),n.raw.length===1&&t.length>0?t[t.length-1].raw+=`
`:t.push(n);continue}if(n=this.tokenizer.code(e)){e=e.substring(n.raw.length),r=t[t.length-1],r&&(r.type==="paragraph"||r.type==="text")?(r.raw+=`
`+n.raw,r.text+=`
`+n.text,this.inlineQueue[this.inlineQueue.length-1].src=r.text):t.push(n);continue}if(n=this.tokenizer.fences(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.heading(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.hr(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.blockquote(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.list(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.html(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.def(e)){e=e.substring(n.raw.length),r=t[t.length-1],r&&(r.type==="paragraph"||r.type==="text")?(r.raw+=`
`+n.raw,r.text+=`
`+n.raw,this.inlineQueue[this.inlineQueue.length-1].src=r.text):this.tokens.links[n.tag]||(this.tokens.links[n.tag]={href:n.href,title:n.title});continue}if(n=this.tokenizer.table(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.lheading(e)){e=e.substring(n.raw.length),t.push(n);continue}if(o=e,this.options.extensions&&this.options.extensions.startBlock){let i=1/0;const l=e.slice(1);let d;this.options.extensions.startBlock.forEach(p=>{d=p.call({lexer:this},l),typeof d=="number"&&d>=0&&(i=Math.min(i,d))}),i<1/0&&i>=0&&(o=e.substring(0,i+1))}if(this.state.top&&(n=this.tokenizer.paragraph(o))){r=t[t.length-1],a&&r.type==="paragraph"?(r.raw+=`
`+n.raw,r.text+=`
`+n.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=r.text):t.push(n),a=o.length!==e.length,e=e.substring(n.raw.length);continue}if(n=this.tokenizer.text(e)){e=e.substring(n.raw.length),r=t[t.length-1],r&&r.type==="text"?(r.raw+=`
`+n.raw,r.text+=`
`+n.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=r.text):t.push(n);continue}if(e){const i="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(i);break}else throw new Error(i)}}return this.state.top=!0,t}inline(e,t=[]){return this.inlineQueue.push({src:e,tokens:t}),t}inlineTokens(e,t=[]){let n,r,o,a=e,i,l,d;if(this.tokens.links){const p=Object.keys(this.tokens.links);if(p.length>0)for(;(i=this.tokenizer.rules.inline.reflinkSearch.exec(a))!=null;)p.includes(i[0].slice(i[0].lastIndexOf("[")+1,-1))&&(a=a.slice(0,i.index)+"["+"a".repeat(i[0].length-2)+"]"+a.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(i=this.tokenizer.rules.inline.blockSkip.exec(a))!=null;)a=a.slice(0,i.index)+"["+"a".repeat(i[0].length-2)+"]"+a.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);for(;(i=this.tokenizer.rules.inline.anyPunctuation.exec(a))!=null;)a=a.slice(0,i.index)+"++"+a.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;e;)if(l||(d=""),l=!1,!(this.options.extensions&&this.options.extensions.inline&&this.options.extensions.inline.some(p=>(n=p.call({lexer:this},e,t))?(e=e.substring(n.raw.length),t.push(n),!0):!1))){if(n=this.tokenizer.escape(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.tag(e)){e=e.substring(n.raw.length),r=t[t.length-1],r&&n.type==="text"&&r.type==="text"?(r.raw+=n.raw,r.text+=n.text):t.push(n);continue}if(n=this.tokenizer.link(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(n.raw.length),r=t[t.length-1],r&&n.type==="text"&&r.type==="text"?(r.raw+=n.raw,r.text+=n.text):t.push(n);continue}if(n=this.tokenizer.emStrong(e,a,d)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.codespan(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.br(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.del(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.autolink(e)){e=e.substring(n.raw.length),t.push(n);continue}if(!this.state.inLink&&(n=this.tokenizer.url(e))){e=e.substring(n.raw.length),t.push(n);continue}if(o=e,this.options.extensions&&this.options.extensions.startInline){let p=1/0;const g=e.slice(1);let m;this.options.extensions.startInline.forEach(u=>{m=u.call({lexer:this},g),typeof m=="number"&&m>=0&&(p=Math.min(p,m))}),p<1/0&&p>=0&&(o=e.substring(0,p+1))}if(n=this.tokenizer.inlineText(o)){e=e.substring(n.raw.length),n.raw.slice(-1)!=="_"&&(d=n.raw.slice(-1)),l=!0,r=t[t.length-1],r&&r.type==="text"?(r.raw+=n.raw,r.text+=n.text):t.push(n);continue}if(e){const p="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(p);break}else throw new Error(p)}}return t}}class gn{constructor(e){ce(this,"options");this.options=e||ht}code(e,t,n){var o;const r=(o=(t||"").match(/^\S*/))==null?void 0:o[0];return e=e.replace(/\n$/,"")+`
`,r?'<pre><code class="language-'+Oe(r)+'">'+(n?e:Oe(e,!0))+`</code></pre>
`:"<pre><code>"+(n?e:Oe(e,!0))+`</code></pre>
`}blockquote(e){return`<blockquote>
${e}</blockquote>
`}html(e,t){return e}heading(e,t,n){return`<h${t}>${e}</h${t}>
`}hr(){return`<hr>
`}list(e,t,n){const r=t?"ol":"ul",o=t&&n!==1?' start="'+n+'"':"";return"<"+r+o+`>
`+e+"</"+r+`>
`}listitem(e,t,n){return`<li>${e}</li>
`}checkbox(e){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph(e){return`<p>${e}</p>
`}table(e,t){return t&&(t=`<tbody>${t}</tbody>`),`<table>
<thead>
`+e+`</thead>
`+t+`</table>
`}tablerow(e){return`<tr>
${e}</tr>
`}tablecell(e,t){const n=t.header?"th":"td";return(t.align?`<${n} align="${t.align}">`:`<${n}>`)+e+`</${n}>
`}strong(e){return`<strong>${e}</strong>`}em(e){return`<em>${e}</em>`}codespan(e){return`<code>${e}</code>`}br(){return"<br>"}del(e){return`<del>${e}</del>`}link(e,t,n){const r=ao(e);if(r===null)return n;e=r;let o='<a href="'+e+'"';return t&&(o+=' title="'+t+'"'),o+=">"+n+"</a>",o}image(e,t,n){const r=ao(e);if(r===null)return n;e=r;let o=`<img src="${e}" alt="${n}"`;return t&&(o+=` title="${t}"`),o+=">",o}text(e){return e}}class hs{strong(e){return e}em(e){return e}codespan(e){return e}del(e){return e}html(e){return e}text(e){return e}link(e,t,n){return""+n}image(e,t,n){return""+n}br(){return""}}class Xe{constructor(e){ce(this,"options");ce(this,"renderer");ce(this,"textRenderer");this.options=e||ht,this.options.renderer=this.options.renderer||new gn,this.renderer=this.options.renderer,this.renderer.options=this.options,this.textRenderer=new hs}static parse(e,t){return new Xe(t).parse(e)}static parseInline(e,t){return new Xe(t).parseInline(e)}parse(e,t=!0){let n="";for(let r=0;r<e.length;r++){const o=e[r];if(this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[o.type]){const a=o,i=this.options.extensions.renderers[a.type].call({parser:this},a);if(i!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(a.type)){n+=i||"";continue}}switch(o.type){case"space":continue;case"hr":{n+=this.renderer.hr();continue}case"heading":{const a=o;n+=this.renderer.heading(this.parseInline(a.tokens),a.depth,gr(this.parseInline(a.tokens,this.textRenderer)));continue}case"code":{const a=o;n+=this.renderer.code(a.text,a.lang,!!a.escaped);continue}case"table":{const a=o;let i="",l="";for(let p=0;p<a.header.length;p++)l+=this.renderer.tablecell(this.parseInline(a.header[p].tokens),{header:!0,align:a.align[p]});i+=this.renderer.tablerow(l);let d="";for(let p=0;p<a.rows.length;p++){const g=a.rows[p];l="";for(let m=0;m<g.length;m++)l+=this.renderer.tablecell(this.parseInline(g[m].tokens),{header:!1,align:a.align[m]});d+=this.renderer.tablerow(l)}n+=this.renderer.table(i,d);continue}case"blockquote":{const a=o,i=this.parse(a.tokens);n+=this.renderer.blockquote(i);continue}case"list":{const a=o,i=a.ordered,l=a.start,d=a.loose;let p="";for(let g=0;g<a.items.length;g++){const m=a.items[g],u=m.checked,A=m.task;let U="";if(m.task){const E=this.renderer.checkbox(!!u);d?m.tokens.length>0&&m.tokens[0].type==="paragraph"?(m.tokens[0].text=E+" "+m.tokens[0].text,m.tokens[0].tokens&&m.tokens[0].tokens.length>0&&m.tokens[0].tokens[0].type==="text"&&(m.tokens[0].tokens[0].text=E+" "+m.tokens[0].tokens[0].text)):m.tokens.unshift({type:"text",text:E+" "}):U+=E+" "}U+=this.parse(m.tokens,d),p+=this.renderer.listitem(U,A,!!u)}n+=this.renderer.list(p,i,l);continue}case"html":{const a=o;n+=this.renderer.html(a.text,a.block);continue}case"paragraph":{const a=o;n+=this.renderer.paragraph(this.parseInline(a.tokens));continue}case"text":{let a=o,i=a.tokens?this.parseInline(a.tokens):a.text;for(;r+1<e.length&&e[r+1].type==="text";)a=e[++r],i+=`
`+(a.tokens?this.parseInline(a.tokens):a.text);n+=t?this.renderer.paragraph(i):i;continue}default:{const a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return n}parseInline(e,t){t=t||this.renderer;let n="";for(let r=0;r<e.length;r++){const o=e[r];if(this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[o.type]){const a=this.options.extensions.renderers[o.type].call({parser:this},o);if(a!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=a||"";continue}}switch(o.type){case"escape":{const a=o;n+=t.text(a.text);break}case"html":{const a=o;n+=t.html(a.text);break}case"link":{const a=o;n+=t.link(a.href,a.title,this.parseInline(a.tokens,t));break}case"image":{const a=o;n+=t.image(a.href,a.title,a.text);break}case"strong":{const a=o;n+=t.strong(this.parseInline(a.tokens,t));break}case"em":{const a=o;n+=t.em(this.parseInline(a.tokens,t));break}case"codespan":{const a=o;n+=t.codespan(a.text);break}case"br":{n+=t.br();break}case"del":{const a=o;n+=t.del(this.parseInline(a.tokens,t));break}case"text":{const a=o;n+=t.text(a.text);break}default:{const a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return n}}class jt{constructor(e){ce(this,"options");this.options=e||ht}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}}ce(jt,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens"]));var gt,ns,Bo;class qr{constructor(...e){js(this,gt);ce(this,"defaults",ds());ce(this,"options",this.setOptions);ce(this,"parse",en(this,gt,ns).call(this,Ze.lex,Xe.parse));ce(this,"parseInline",en(this,gt,ns).call(this,Ze.lexInline,Xe.parseInline));ce(this,"Parser",Xe);ce(this,"Renderer",gn);ce(this,"TextRenderer",hs);ce(this,"Lexer",Ze);ce(this,"Tokenizer",fn);ce(this,"Hooks",jt);this.use(...e)}walkTokens(e,t){var r,o;let n=[];for(const a of e)switch(n=n.concat(t.call(this,a)),a.type){case"table":{const i=a;for(const l of i.header)n=n.concat(this.walkTokens(l.tokens,t));for(const l of i.rows)for(const d of l)n=n.concat(this.walkTokens(d.tokens,t));break}case"list":{const i=a;n=n.concat(this.walkTokens(i.items,t));break}default:{const i=a;(o=(r=this.defaults.extensions)==null?void 0:r.childTokens)!=null&&o[i.type]?this.defaults.extensions.childTokens[i.type].forEach(l=>{const d=i[l].flat(1/0);n=n.concat(this.walkTokens(d,t))}):i.tokens&&(n=n.concat(this.walkTokens(i.tokens,t)))}}return n}use(...e){const t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{const r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(o=>{if(!o.name)throw new Error("extension name required");if("renderer"in o){const a=t.renderers[o.name];a?t.renderers[o.name]=function(...i){let l=o.renderer.apply(this,i);return l===!1&&(l=a.apply(this,i)),l}:t.renderers[o.name]=o.renderer}if("tokenizer"in o){if(!o.level||o.level!=="block"&&o.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");const a=t[o.level];a?a.unshift(o.tokenizer):t[o.level]=[o.tokenizer],o.start&&(o.level==="block"?t.startBlock?t.startBlock.push(o.start):t.startBlock=[o.start]:o.level==="inline"&&(t.startInline?t.startInline.push(o.start):t.startInline=[o.start]))}"childTokens"in o&&o.childTokens&&(t.childTokens[o.name]=o.childTokens)}),r.extensions=t),n.renderer){const o=this.defaults.renderer||new gn(this.defaults);for(const a in n.renderer){if(!(a in o))throw new Error(`renderer '${a}' does not exist`);if(a==="options")continue;const i=a,l=n.renderer[i],d=o[i];o[i]=(...p)=>{let g=l.apply(o,p);return g===!1&&(g=d.apply(o,p)),g||""}}r.renderer=o}if(n.tokenizer){const o=this.defaults.tokenizer||new fn(this.defaults);for(const a in n.tokenizer){if(!(a in o))throw new Error(`tokenizer '${a}' does not exist`);if(["options","rules","lexer"].includes(a))continue;const i=a,l=n.tokenizer[i],d=o[i];o[i]=(...p)=>{let g=l.apply(o,p);return g===!1&&(g=d.apply(o,p)),g}}r.tokenizer=o}if(n.hooks){const o=this.defaults.hooks||new jt;for(const a in n.hooks){if(!(a in o))throw new Error(`hook '${a}' does not exist`);if(a==="options")continue;const i=a,l=n.hooks[i],d=o[i];jt.passThroughHooks.has(a)?o[i]=p=>{if(this.defaults.async)return Promise.resolve(l.call(o,p)).then(m=>d.call(o,m));const g=l.call(o,p);return d.call(o,g)}:o[i]=(...p)=>{let g=l.apply(o,p);return g===!1&&(g=d.apply(o,p)),g}}r.hooks=o}if(n.walkTokens){const o=this.defaults.walkTokens,a=n.walkTokens;r.walkTokens=function(i){let l=[];return l.push(a.call(this,i)),o&&(l=l.concat(o.call(this,i))),l}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Ze.lex(e,t??this.defaults)}parser(e,t){return Xe.parse(e,t??this.defaults)}}gt=new WeakSet,ns=function(e,t){return(n,r)=>{const o={...r},a={...this.defaults,...o};this.defaults.async===!0&&o.async===!1&&(a.silent||console.warn("marked(): The async option was set to true by an extension. The async: false option sent to parse will be ignored."),a.async=!0);const i=en(this,gt,Bo).call(this,!!a.silent,!!a.async);if(typeof n>"u"||n===null)return i(new Error("marked(): input parameter is undefined or null"));if(typeof n!="string")return i(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(n)+", string expected"));if(a.hooks&&(a.hooks.options=a),a.async)return Promise.resolve(a.hooks?a.hooks.preprocess(n):n).then(l=>e(l,a)).then(l=>a.hooks?a.hooks.processAllTokens(l):l).then(l=>a.walkTokens?Promise.all(this.walkTokens(l,a.walkTokens)).then(()=>l):l).then(l=>t(l,a)).then(l=>a.hooks?a.hooks.postprocess(l):l).catch(i);try{a.hooks&&(n=a.hooks.preprocess(n));let l=e(n,a);a.hooks&&(l=a.hooks.processAllTokens(l)),a.walkTokens&&this.walkTokens(l,a.walkTokens);let d=t(l,a);return a.hooks&&(d=a.hooks.postprocess(d)),d}catch(l){return i(l)}}},Bo=function(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){const r="<p>An error occurred:</p><pre>"+Oe(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}};const ut=new qr;function oe(s,e){return ut.parse(s,e)}oe.options=oe.setOptions=function(s){return ut.setOptions(s),oe.defaults=ut.defaults,Lo(oe.defaults),oe};oe.getDefaults=ds;oe.defaults=ht;oe.use=function(...s){return ut.use(...s),oe.defaults=ut.defaults,Lo(oe.defaults),oe};oe.walkTokens=function(s,e){return ut.walkTokens(s,e)};oe.parseInline=ut.parseInline;oe.Parser=Xe;oe.parser=Xe.parse;oe.Renderer=gn;oe.TextRenderer=hs;oe.Lexer=Ze;oe.lexer=Ze.lex;oe.Tokenizer=fn;oe.Hooks=jt;oe.parse=oe;oe.options;oe.setOptions;oe.use;oe.walkTokens;oe.parseInline;Xe.parse;Ze.lex;const ft=new oe.Renderer,Gr=ft.link.bind(ft);ft.code=(s,e)=>{const t=e||"";if(t==="mermaid"){const r=s.split(`
`);let o='<div class="flex flex-col items-center gap-4 bg-slate-950 p-6 rounded-lg border border-slate-800/80 my-4 select-none">';const a=new Map,i=[];if(r.forEach(l=>{const d=l.trim();if(!d)return;const p=d.match(/^([A-Za-z0-9_-]+)\[(.*?)\]$/);if(p){a.set(p[1],p[2]);return}const g=d.match(/^([A-Za-z0-9_-]+)\s*-->\s*(?:\|(.*?)\|)?\s*([A-Za-z0-9_-]+)$/);if(g){const m=g[1],u=g[2]||"",A=g[3];i.push({from:m,to:A,label:u}),a.has(m)||a.set(m,m),a.has(A)||a.set(A,A)}}),a.size>0){o+='<div class="space-y-4 w-full flex flex-col items-center">';const l=new Set(i.map(m=>m.to)),d=Array.from(a.keys()).filter(m=>!l.has(m)),p=Array.from(a.keys()).filter(m=>l.has(m)),g=m=>{const u=a.get(m)||m;return`<div class="px-4 py-2 bg-teal-950/40 text-teal-400 border border-teal-800 rounded font-mono text-xs shadow-[0_0_10px_rgba(20,184,166,0.15)]">${R(u)}</div>`};return d.length>0&&(o+='<div class="flex flex-wrap gap-4 justify-center">',o+=d.map(g).join(""),o+="</div>"),i.length>0&&(o+='<div class="text-slate-650 text-xs">↓</div>'),p.length>0&&(o+='<div class="flex flex-wrap gap-4 justify-center">',o+=p.map(g).join(""),o+="</div>"),o+="</div></div>",o}}let n=s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;");if(t){const r=/\b(const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|import|export|class|extends|new|try|catch|finally|throw|def|print|elif|in|is|not|and|or|lambda|as|with|pass|public|private|protected|static|void|int|string|boolean|select|from|where|insert|update|delete|create|table|drop|values|into|join|on|group|by|order|true|false|null|None)\b/g,o=/(["'`])(.*?)\1/g,a=/(\/\/.*|#.*)/g;n=n.replace(a,'<span class="text-slate-500">$1</span>'),n=n.replace(o,'<span class="text-amber-400">$0</span>'),n=n.replace(r,'<span class="text-teal-400 font-bold">$1</span>')}return`<pre class="bg-slate-950 p-4 rounded-lg overflow-x-auto border border-slate-800/80 my-4 text-xs font-mono"><code class="language-${t}">${n}</code></pre>`};ft.link=(s,e,t)=>Gr(s,e,t).replace("<a ",'<a target="_blank" rel="noopener noreferrer" class="text-teal-400 hover:underline" ');ft.heading=(s,e)=>{const t=s.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");return`<h${e} id="${t}">${s}</h${e}>`};ft.table=(s,e)=>`<div class="overflow-x-auto my-4 max-w-full"><table class="w-full">${s}${e}</table></div>`;oe.setOptions({renderer:ft,gfm:!0,breaks:!0});function Uo(){try{return parseInt(localStorage.getItem("secops-sanitize-count")||"0",10)}catch{return 0}}function zo(){try{const s=Uo();localStorage.setItem("secops-sanitize-count",(s+1).toString())}catch{}}function At(s){zo();const e=oe.parse(s);Ut.addHook("uponSanitizeElement",n=>{if(n instanceof Element){const r=n.tagName.toLowerCase();if(r==="video"||r==="audio"||r==="iframe"||r==="source"||r==="img"){const o=n.getAttribute("src");if(o){const a=o.trim().toLowerCase();a.startsWith("data:")||a.startsWith("blob:")||a.startsWith("attachment:")||a.startsWith("/")||a.startsWith("./")||a.startsWith("../")||(n.setAttribute("src","#"),console.warn("SECURITY BLOCK: Prevented connection to remote source URL:",o))}r==="iframe"&&n.setAttribute("sandbox","allow-scripts")}}});const t=Ut.sanitize(e,{ALLOWED_TAGS:["h1","h2","h3","h4","h5","h6","p","br","hr","a","span","ul","ol","li","strong","em","code","pre","blockquote","table","thead","tbody","tr","th","td","div","img","input","video","audio","iframe","source"],ALLOWED_ATTR:["href","target","rel","class","id","align","src","alt","type","checked","disabled","controls","sandbox","width","height"]});return Ut.removeHook("uponSanitizeElement"),t}function rn(s){return s.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F\u200B-\u200D\uFEFF\u202A-\u202E]/g,"")}function R(s){return s.replace(/[&<>"']/g,e=>{switch(e){case"&":return"&amp;";case"<":return"&lt;";case">":return"&gt;";case'"':return"&quot;";case"'":return"&#039;";default:return e}})}function Kr(s){if(zo(),typeof s!="object"||s===null)throw new Error("Invalid backup structure: Root must be an object.");const{slug:e,title:t,content:n,updatedAt:r,tags:o}=s;if(typeof e!="string"||!/^[a-z0-9-_]+$/.test(e))throw new Error("Invalid slug format: Slugs must contain only lowercase alphanumeric characters, hyphens, and underscores.");const a=rn(e);if(typeof t!="string"||t.trim().length===0||t.length>100)throw new Error("Invalid title format: Must be a non-empty string under 100 characters.");const i=rn(t);if(typeof n!="string"||n.length>5e4)throw new Error("Invalid content format: Must be a string under 50,000 characters.");if(typeof r!="number"||isNaN(r))throw new Error("Invalid updated timestamp format.");if(!Array.isArray(o))throw new Error("Tags must be an array of strings.");const l=o.map(d=>{if(typeof d!="string")throw new Error("Tags must be strings.");return rn(Ut.sanitize(d)).slice(0,30)});return{slug:a,title:Ut.sanitize(i),content:n,updatedAt:r,tags:l,isSystem:!!s.isSystem}}async function Re(s){const e=new TextEncoder,t=e.encode("secops-intel-salt-2026"),n=await window.crypto.subtle.importKey("raw",e.encode(s),{name:"PBKDF2"},!1,["deriveKey"]);return window.crypto.subtle.deriveKey({name:"PBKDF2",salt:t,iterations:1e5,hash:"SHA-256"},n,{name:"AES-GCM",length:256},!1,["encrypt","decrypt"])}async function rt(s,e){const t=new TextEncoder,n=window.crypto.getRandomValues(new Uint8Array(12)),r=await window.crypto.subtle.encrypt({name:"AES-GCM",iv:n},e,t.encode(s)),o=Array.from(n).map(d=>d.toString(16).padStart(2,"0")).join(""),a=new Uint8Array(r);let i="";for(let d=0;d<a.byteLength;d++)i+=String.fromCharCode(a[d]);const l=btoa(i);return`${o}:${l}`}async function ye(s,e){const t=s.split(":");if(t.length!==2)throw new Error("Invalid cipher format");const[n,r]=t,o=new Uint8Array(n.match(/.{1,2}/g).map(d=>parseInt(d,16))),a=atob(r),i=new Uint8Array(a.length);for(let d=0;d<a.length;d++)i[d]=a.charCodeAt(d);const l=await window.crypto.subtle.decrypt({name:"AES-GCM",iv:o},e,i);return new TextDecoder().decode(l)}async function Qe(s){const e=`${s.slug}|${s.title}|${s.content}|${s.updatedAt}|${s.tags.join(",")}|secops-integrity-salt-2026`,t=new TextEncoder().encode(e),n=await crypto.subtle.digest("SHA-256",t);return Array.from(new Uint8Array(n)).map(o=>o.toString(16).padStart(2,"0")).join("")}let ee="home",et=!1,Me=!1,Fe="",Pt="",me=[],Bt=null,jo=navigator.onLine?"SECURE_LINK":"OFFLINE_CACHE",pt=localStorage.getItem("secops-wiki-theme")||(window.matchMedia&&window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark");window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",s=>{localStorage.getItem("secops-wiki-theme")||(pt=s.matches?"dark":"light",ws())});let at=localStorage.getItem("secops-wiki-mask-encrypted")==="true",on=localStorage.getItem("secops-wiki-split-screen")!=="false",ln={},ge=null;async function de(s,e){const t={id:`${Date.now()}-${Math.random().toString(36).substring(2,11)}`,timestamp:Date.now(),event:s,details:e};await Ra(t)}async function We(s){const e=await Sa(s);if(!e)return null;if(e.isEncryptedAtRest&&e.encryptedData){if(!ge)return{slug:e.slug,title:"[DATABASE LOCKED]",content:"Master passphrase required to unlock this database record.",tags:[],isSystem:e.isSystem,isEncrypted:!1,updatedAt:e.updatedAt};try{const t=await ye(e.encryptedData,ge),n=JSON.parse(t);return{slug:e.slug,title:n.title,content:n.content,tags:n.tags,isSystem:e.isSystem,isEncrypted:n.isEncrypted,signature:n.signature,updatedAt:n.updatedAt}}catch(t){return console.error("Failed to decrypt page at rest:",t),null}}return e}async function Ue(s){if(localStorage.getItem("secops-wiki-db-encrypted")==="true"&&ge){const t={title:s.title,content:s.content,tags:s.tags,isEncrypted:s.isEncrypted,signature:s.signature,updatedAt:s.updatedAt},n=await rt(JSON.stringify(t),ge),r={slug:s.slug,title:"[REDACTED AT REST]",content:"[REDACTED AT REST]",tags:[],isSystem:s.isSystem,isEncryptedAtRest:!0,encryptedData:n,updatedAt:s.updatedAt};await un(r)}else await un(s);localStorage.setItem("secops-wiki-last-update",Date.now().toString())}async function hn(){const s=await Wt(),e=[];for(const t of s){const n=await We(t.slug);n&&e.push(n)}return e}async function bs(){try{const s=await vo();ln={},s.forEach(e=>{ln[e.tag]=e.color})}catch{ln={}}}function Vr(s){const e=ln[s]||"slate";let t="bg-slate-950/20 text-slate-400 border-slate-900/30";return e==="emerald"?t="bg-emerald-950/20 text-emerald-400 border-emerald-900/30":e==="blue"?t="bg-blue-950/20 text-blue-400 border-blue-900/30":e==="red"?t="bg-red-950/20 text-red-400 border-red-900/30":e==="amber"&&(t="bg-amber-950/20 text-amber-400 border-amber-900/30"),`
    <span class="text-[10px] font-mono px-2 py-0.5 rounded border ${t}">#${R(s)}</span>
  `}function Yr(s){const e=me.filter(a=>a.slug!==ee);if(e.length===0)return;e.sort((a,i)=>i.title.length-a.title.length);const t=a=>a.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"),n=[],r=document.createTreeWalker(s,NodeFilter.SHOW_TEXT,{acceptNode:a=>{let i=a.parentElement;for(;i&&i!==s;){const l=i.tagName.toLowerCase();if(l==="a"||l==="code"||l==="pre")return NodeFilter.FILTER_REJECT;i=i.parentElement}return NodeFilter.FILTER_ACCEPT}});let o=r.nextNode();for(;o;)n.push(o),o=r.nextNode();for(const a of n){const i=a.parentNode;if(!i)continue;let l=a.nodeValue||"";for(const d of e){if(d.isEncrypted&&!Z&&at)continue;const g=t(d.title),m=t(d.slug),A=new RegExp(`\\b(${g}|${m})\\b`,"i").exec(l);if(A){const U=A[0],E=A.index,D=l.substring(0,E),J=l.substring(E+U.length),S=document.createTextNode(D),y=document.createElement("a");y.href=`#/page/${d.slug}`,y.className="autolink text-teal-400 hover:text-teal-350 underline decoration-dotted transition",y.textContent=U;const N=document.createTextNode(J);i.insertBefore(S,a),i.insertBefore(y,a),i.insertBefore(N,a),i.removeChild(a);break}}}}function Zr(s){if(!s||s==="system"||s==="graph")return;let e=[];try{e=JSON.parse(sessionStorage.getItem("secops-wiki-breadcrumbs")||"[]")}catch{}Array.isArray(e)||(e=[]),e=e.filter(t=>t!==s),e.unshift(s),e.length>5&&(e=e.slice(0,5)),sessionStorage.setItem("secops-wiki-breadcrumbs",JSON.stringify(e))}function Xr(s){const e=me.find(n=>n.slug===s);return e?e.isEncrypted&&!Z&&at?"[REDACTED CORE]":e.title:s}let Z=null,Fn=!1,Be=0,cn=!1,dn=-1,ss="";function Jr(){return parseInt(localStorage.getItem("secops-decrypt-failed-attempts")||"0",10)}function Ho(s){localStorage.setItem("secops-decrypt-failed-attempts",s.toString())}function os(){return parseInt(localStorage.getItem("secops-decrypt-lockout-until")||"0",10)}function xs(s){localStorage.setItem("secops-decrypt-lockout-until",s.toString())}function as(){return Date.now()<os()}function Qr(){const s=Jr()+1;if(Ho(s),s>=3){const e=3e5*Math.pow(2,s-3);xs(Date.now()+e)}}function ei(){Ho(0),xs(0)}let Wn=null;function ys(){Wn&&clearTimeout(Wn);const s=parseInt(localStorage.getItem("secops-wiki-session-timeout")||"15",10);s!==0&&(Wn=setTimeout(()=>{Z&&(Z=null,alert(`SECURITY TIMEOUT: Session idle for ${s} minutes. Passphrase keys wiped from memory.`),window.location.hash.startsWith("#/page/")?window.location.hash="#/page/home":ue())},s*60*1e3))}["mousedown","mousemove","keydown","scroll","touchstart"].forEach(s=>{window.addEventListener(s,ys,{passive:!0})});ys();let dt=null;document.addEventListener("copy",()=>{var e;document.body.classList.contains("encrypted-page-active")?(e=window.getSelection())!=null&&e.toString()&&Fo():dt&&(clearTimeout(dt),dt=null)});function Fo(){dt&&clearTimeout(dt),dt=setTimeout(async()=>{try{await navigator.clipboard.writeText("[SECURE WIPE: Decrypted secret cleared from clipboard]"),ti(),await de("CLIPBOARD_WIPE","Automatically cleared decrypted secret from clipboard.")}catch(s){console.warn("Clipboard wipe failed:",s)}dt=null},3e4)}function ti(){const s=document.getElementById("clipboard-wipe-toast");s&&s.remove();const e=document.createElement("div");e.id="clipboard-wipe-toast",e.className="fixed bottom-4 left-4 z-50 glass-panel border border-red-500/30 p-3 rounded-xl shadow-xl font-mono text-[10px] text-red-400 select-none animate-fade-in",e.innerHTML="⚠️ SECURITY WIPE: Decrypted secret cleared from clipboard.",document.body.appendChild(e),setTimeout(()=>{e.classList.add("opacity-0","transition-opacity","duration-500"),setTimeout(()=>e.remove(),500)},3e3)}function Wo(s){if(s.length<8)return{valid:!1,message:"Password must be at least 8 characters long."};let e=!1,t=!1,n=!1,r=!1;const o=/[!@#$%^&*(),.?":{}|<>_+\\-]/;for(const a of s)a>="A"&&a<="Z"?e=!0:a>="a"&&a<="z"?t=!0:a>="0"&&a<="9"?n=!0:o.test(a)&&(r=!0);return!e||!t||!n||!r?{valid:!1,message:"Password must include uppercase, lowercase, numbers, and special symbols (!@#$%^&*, etc.)."}:{valid:!0,message:""}}function co(){Z&&(Z=null,alert("QUICK LOCK: In-memory session keys cleared. Documents locked."),window.location.hash="#/page/home",ue())}let an=0,qn=null;window.addEventListener("keydown",s=>{s.key==="Escape"&&(an++,qn&&clearTimeout(qn),an>=3?(an=0,co()):qn=setTimeout(()=>{an=0},1e3)),s.ctrlKey&&s.shiftKey&&s.key.toLowerCase()==="l"&&(s.preventDefault(),co())});function ws(){const s=document.documentElement,e=document.getElementById("theme-icon-path");pt==="light"?(s.classList.add("light-theme"),e&&e.setAttribute("d","M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z")):(s.classList.remove("light-theme"),e&&e.setAttribute("d","M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z"))}function qo(){pt=pt==="dark"?"light":"dark",localStorage.setItem("secops-wiki-theme",pt),ws()}function ni(s,e){if(!e||e.trim().length===0)return s;const t=e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"),n=new RegExp(`(?![^<>]*>)(${t})`,"gi");return s.replace(n,'<mark class="bg-teal-500/30 text-teal-300 px-0.5 rounded font-medium">$1</mark>')}function si(s){const e=s.toLowerCase().trim();return/(sec|security|critical|panic|destruct|lock|key|auth)/.test(e)?{bg:"rgba(239, 68, 68, 0.15)",text:"#f87171",border:"rgba(239, 68, 68, 0.3)",className:"tag-color-red"}:/(doc|manual|wiki|guide|system|dashboard|home)/.test(e)?{bg:"rgba(20, 184, 166, 0.15)",text:"#2dd4bf",border:"rgba(20, 184, 166, 0.3)",className:"tag-color-teal"}:/(config|settings|sys|admin|db|telemetry)/.test(e)?{bg:"rgba(59, 130, 246, 0.15)",text:"#60a5fa",border:"rgba(59, 130, 246, 0.3)",className:"tag-color-blue"}:/(warning|caution|issue|bug|fix)/.test(e)?{bg:"rgba(245, 158, 11, 0.15)",text:"#fbbf24",border:"rgba(245, 158, 11, 0.3)",className:"tag-color-amber"}:{bg:"rgba(148, 163, 184, 0.15)",text:"#cbd5e1",border:"rgba(148, 163, 184, 0.3)",className:"tag-color-slate"}}function Go(s,e){const t=e.toLowerCase().trim();if(!t)return 0;let n=0;const r=s.title.toLowerCase(),o=s.content.toLowerCase(),a=s.tags.map(i=>i.toLowerCase());if(r===t?n+=100:r.startsWith(t)?n+=80:r.includes(t)&&(n+=50),a.forEach(i=>{i===t?n+=30:i.includes(t)&&(n+=15)}),o.includes(t)){n+=10;const i=o.split(t).length-1;n+=Math.min(10,i)}return n}function po(s){const e=new Uint32Array(256);for(let n=0;n<256;n++){let r=n;for(let o=0;o<8;o++)r=r&1?3988292384^r>>>1:r>>>1;e[n]=r}let t=4294967295;for(let n=0;n<s.length;n++)t=e[(t^s[n])&255]^t>>>8;return(t^4294967295)>>>0}function Ko(s){const e=new TextEncoder,t=[],n=[];let r=0;s.forEach(d=>{n.push(r);const p=e.encode(d.name),g=e.encode(d.content),m=po(g),u=new ArrayBuffer(30),A=new DataView(u);A.setUint32(0,67324752,!0),A.setUint16(4,10,!0),A.setUint16(6,0,!0),A.setUint16(8,0,!0),A.setUint16(10,0,!0),A.setUint16(12,0,!0),A.setUint32(14,m,!0),A.setUint32(18,g.length,!0),A.setUint32(22,g.length,!0),A.setUint16(26,p.length,!0),A.setUint16(28,0,!0);const U=new Uint8Array(u);t.push(U),t.push(p),t.push(g),r+=U.length+p.length+g.length});const o=r;let a=0;s.forEach((d,p)=>{const g=e.encode(d.name),m=e.encode(d.content),u=po(m),A=n[p],U=new ArrayBuffer(46),E=new DataView(U);E.setUint32(0,33639248,!0),E.setUint16(4,20,!0),E.setUint16(6,10,!0),E.setUint16(8,0,!0),E.setUint16(10,0,!0),E.setUint16(12,0,!0),E.setUint16(14,0,!0),E.setUint32(16,u,!0),E.setUint32(20,m.length,!0),E.setUint32(24,m.length,!0),E.setUint16(28,g.length,!0),E.setUint16(30,0,!0),E.setUint16(32,0,!0),E.setUint16(34,0,!0),E.setUint16(36,0,!0),E.setUint32(38,32,!0),E.setUint32(42,A,!0);const D=new Uint8Array(U);t.push(D),t.push(g),a+=D.length+g.length,r+=D.length+g.length});const i=new ArrayBuffer(22),l=new DataView(i);return l.setUint32(0,101010256,!0),l.setUint16(4,0,!0),l.setUint16(6,0,!0),l.setUint16(8,s.length,!0),l.setUint16(10,s.length,!0),l.setUint32(12,a,!0),l.setUint32(16,o,!0),l.setUint16(20,0,!0),t.push(new Uint8Array(i)),new Blob(t,{type:"application/zip"})}const bt=new BroadcastChannel("wiki-db-sync");bt.onmessage=async s=>{s.data==="refresh"&&(await Ce(),await ue())};let rs=localStorage.getItem("secops-wiki-last-update")||"0";window.addEventListener("focus",async()=>{const s=localStorage.getItem("secops-wiki-last-update")||"0";s!==rs&&(rs=s,await Ce(),await ue())});let Gn=null;const oi=15*60*1e3;let Vo;async function ai(){ws(),Vo=document.getElementById("app"),await cs(),await bs();try{await is()}catch(e){console.warn("Failed to purge expired pages on init:",e)}try{await So(30)}catch(e){console.warn("Failed to auto-prune audit logs on init:",e)}ii(),localStorage.getItem("secops-wiki-db-encrypted")==="true"&&!ge?Li():(await Ce(),Yo(),Xo(),window.addEventListener("hashchange",xn),window.addEventListener("online",bn),window.addEventListener("offline",bn),window.addEventListener("beforeinstallprompt",e=>{e.preventDefault(),Bt=e;const t=document.getElementById("pwa-install-btn");t&&t.classList.remove("hidden")}),window.addEventListener("keydown",e=>{var t,n;if(e.ctrlKey&&(e.key==="k"||e.key==="K"||e.key==="p"||e.key==="P")&&(e.preventDefault(),Ft()),e.ctrlKey&&(e.key==="n"||e.key==="N")&&!e.shiftKey&&(e.preventDefault(),window.location.hash="#/new"),e.key==="/"&&((t=document.activeElement)==null?void 0:t.tagName)!=="INPUT"&&((n=document.activeElement)==null?void 0:n.tagName)!=="TEXTAREA"&&(e.preventDefault(),Ft()),e.ctrlKey&&e.altKey&&(e.key==="e"||e.key==="E"))if(e.preventDefault(),et){const r=document.getElementById("edit-page-form");r&&r.requestSubmit()}else ee&&ee!=="home"&&ee!=="system"&&(window.location.hash=`#/edit/${ee}`)}),xn(),setInterval(async()=>{try{await is()}catch(e){console.warn("Failed periodic expired page purge:",e)}},3e4))}function Tt(){Gn&&clearTimeout(Gn),Gn=setTimeout(ri,oi),window.lastHeartbeat||(window.lastHeartbeat=Date.now()),Date.now()-window.lastHeartbeat>5*60*1e3&&(de("SESSION_HEARTBEAT","User activity heartbeat"),window.lastHeartbeat=Date.now())}function ri(){const s=document.getElementById("idle-lock-screen");if(!s)return;const e=localStorage.getItem("secops-wiki-db-encrypted")==="true";e&&(ge=null,Z=null,ue().catch(()=>{}));const t=localStorage.getItem("secops-wiki-webauthn-gate")==="true";if(e){s.innerHTML=`
      <div class="glass-panel border border-slate-800 p-8 rounded-xl max-w-sm w-full text-center glow-border shadow-2xl">
        <svg class="w-12 h-12 text-red-500 mx-auto mb-4 animate-pulse" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
        <h2 class="text-lg font-bold font-mono text-white mb-2 uppercase tracking-wide">TERMINAL_LOCKED</h2>
        <p class="text-slate-400 text-[10px] font-mono mb-6 leading-relaxed">System locked due to inactivity.<br>Enter master passphrase or use biometrics.</p>
        
        <form id="idle-unlock-form" class="space-y-4">
          <input type="password" id="idle-unlock-password-input" placeholder="ENTER MASTER KEY..." required class="w-full bg-slate-950/80 border border-slate-800 focus:border-teal-500/50 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none transition font-mono text-center">
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
    `;const n=s.querySelector("#idle-unlock-form"),r=s.querySelector("#idle-unlock-password-input"),o=s.querySelector("#idle-lock-error"),a=s.querySelector("#idle-unlock-biometric-btn");setTimeout(()=>r==null?void 0:r.focus(),50),n.addEventListener("submit",async i=>{if(i.preventDefault(),as()){alert("Lockout Alert: Too many failed attempts. Cooldown active.");return}o.classList.add("hidden");const l=r.value;try{const d=await Re(l);await It(d)?(ge=d,await Ce(),Kn(),await ue(),await de("SESSION_RESTORE","Restored session via master passphrase.")):(o.classList.remove("hidden"),go(),ue())}catch{o.classList.remove("hidden"),go(),ue()}}),a&&a.addEventListener("click",async()=>{o.classList.add("hidden");try{const i=localStorage.getItem("secops-wiki-webauthn-payload")||"",l=crypto.getRandomValues(new Uint8Array(32)),d=await navigator.credentials.get({publicKey:{challenge:l,rpId:window.location.hostname||"localhost",userVerification:"required",timeout:6e4}});if(d){const p=new Uint8Array(d.rawId),g=Array.from(p).map(J=>J.toString(16).padStart(2,"0")).join(""),m=localStorage.getItem("secops-wiki-webauthn-salt")||"";if(!m)throw new Error("Biometric salt missing.");const u=`${g}:${m}`,A=await Re(u),U=await ye(i,A),E=await Re(U);await It(E)?(ge=E,await Ce(),Kn(),await ue(),await de("SESSION_RESTORE_BIOMETRIC","Restored session via biometric WebAuthn verification.")):o.classList.remove("hidden")}}catch(i){alert(`Biometric verification failed: ${i.message}`),await de("WEBAUTHN_FAIL",`Idle lock biometric unlock failed: ${i.message}`)}})}else s.innerHTML=`
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
    `,s.querySelector("#idle-unlock-btn").addEventListener("click",()=>{Kn()});s.classList.remove("hidden")}function Kn(){const s=document.getElementById("idle-lock-screen");s&&s.classList.add("hidden"),Tt()}function Yo(){let s=document.getElementById("idle-lock-screen");s||(s=document.createElement("div"),s.id="idle-lock-screen",s.className="fixed inset-0 bg-[#090d16]/95 backdrop-blur-md z-50 flex flex-col items-center justify-center hidden",document.body.appendChild(s)),Tt(),window.addEventListener("mousemove",Tt,{passive:!0}),window.addEventListener("keydown",Tt,{passive:!0}),window.addEventListener("click",Tt,{passive:!0}),window.addEventListener("scroll",Tt,{passive:!0})}function uo(){if(document.getElementById("pwa-update-toast"))return;const s=document.createElement("div");s.id="pwa-update-toast",s.className="fixed bottom-4 right-4 z-50 max-w-sm glass-panel border border-teal-500/30 p-4 rounded-xl shadow-2xl glow-border flex items-center justify-between gap-4 font-mono text-xs select-none",s.innerHTML=`
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
  `,document.body.appendChild(s);const e=document.getElementById("pwa-update-reload-btn");e&&e.addEventListener("click",()=>{window.location.reload()})}function ii(){"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/wiki/sw.js").then(s=>{console.log("ServiceWorker registered successfully with scope: ",s.scope),s.waiting&&uo(),s.addEventListener("updatefound",()=>{const e=s.installing;e&&e.addEventListener("statechange",()=>{e.state==="installed"&&navigator.serviceWorker.controller&&uo()})})}).catch(s=>{console.error("ServiceWorker registration failed: ",s)})})}function bn(){jo=navigator.onLine?"SECURE_LINK":"OFFLINE_CACHE";const s=document.getElementById("system-status-indicator"),e=document.getElementById("system-status-label");s&&e&&(navigator.onLine?(s.className="w-2 h-2 rounded-full bg-emerald-400 glow-text-emerald pulse-indicator",e.innerText="SECURE_LINK",e.className="text-xs text-emerald-400 font-mono tracking-wider"):(s.className="w-2 h-2 rounded-full bg-amber-500 pulse-indicator",e.innerText="OFFLINE_CACHE",e.className="text-xs text-amber-500 font-mono tracking-wider"))}async function Ce(){me=await hn(),await Ii(),rs=localStorage.getItem("secops-wiki-last-update")||"0"}async function is(){const s=await Wt(),e=Date.now();let t=!1;for(const n of s)n.expiresAt&&e>n.expiresAt&&(await bo(n.slug),await de("SELF_DESTRUCT_EXPIRY",`Intel Entry "${n.title}" (slug: ${n.slug}) has self-destructed due to lease expiration.`),t=!0,ee===n.slug&&(ee="home",window.location.hash="#/page/home"));t&&(await Ce(),await ue(),bt.postMessage("refresh"))}async function xn(){await is();const s=window.location.hash||"#/page/home";et=!1,Me=!1;let e="";if(s.startsWith("#/page/")){const n=s.replace("#/page/","").split("#");ee=n[0],n.length>1&&(e=n[1])}else s.startsWith("#/edit/")?(ee=s.replace("#/edit/",""),et=!0):s==="#/new"?(et=!0,Me=!0,ee=""):s==="#/system"?ee="system":s==="#/graph"?ee="graph":s.startsWith("#/import-p2p")?ee="import-p2p":s==="#/audit-logs"?ee="audit-logs":ee="home";!et&&ee&&ee!=="system"&&ee!=="graph"&&ee!=="import-p2p"&&ee!=="audit-logs"&&(Zr(ee),Bi(ee)),await ue(),e&&setTimeout(()=>{const t=document.getElementById(e);t&&t.scrollIntoView({behavior:"smooth"})},50)}function Vn(s){const e=s.filter(o=>o.isSystem),t=s.filter(o=>!o.isSystem&&o.isEncrypted),n=s.filter(o=>!o.isSystem&&!o.isEncrypted);let r="";return e.length>0&&(r+=`
      <div class="mb-4">
        <div class="px-3 mb-1.5 text-[9px] font-bold text-slate-500 uppercase tracking-widest font-mono flex items-center gap-1 select-none">
          ⚙️ SYSTEM PROCEDURES
        </div>
        <div class="space-y-0.5">
          ${e.map(o=>Yn(o)).join("")}
        </div>
      </div>
    `),t.length>0&&(r+=`
      <div class="mb-4">
        <div class="px-3 mb-1.5 text-[9px] font-bold text-red-400/80 uppercase tracking-widest font-mono flex items-center gap-1 select-none">
          🔒 SECURE CORES
        </div>
        <div class="space-y-0.5">
          ${t.map(o=>Yn(o)).join("")}
        </div>
      </div>
    `),n.length>0&&(r+=`
      <div class="mb-4">
        <div class="px-3 mb-1.5 text-[9px] font-bold text-teal-400/80 uppercase tracking-widest font-mono flex items-center gap-1 select-none">
          📄 OPERATIONAL INTEL
        </div>
        <div class="space-y-0.5">
          ${n.map(o=>Yn(o)).join("")}
        </div>
      </div>
    `),r}function Yn(s){const e=ee===s.slug&&!et,t=s.isEncrypted&&!Z&&at,n=t?"[REDACTED CORE]":s.title,r=t?"javascript:void(0)":`#/page/${s.slug}`,o=t?`onclick="alert('SECURITY WARNING: Document is locked. Enter passphrase to decrypt cores first.');"`:"";let a="";if(Fe.trim().length>0){const i=s.isEncrypted&&!Z,l=mt.find(d=>d.slug===s.slug)||s;if(!i&&l.content){const d=l.content.toLowerCase().indexOf(Fe.toLowerCase());if(d!==-1){const p=Math.max(0,d-20),g=Math.min(l.content.length,d+Fe.length+30);let m=l.content.substring(p,g);p>0&&(m="..."+m),g<l.content.length&&(m=m+"...");const u=R(m),A=new RegExp(`(${Fe.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")})`,"gi");a=`<div class="text-[10px] text-slate-500 font-mono mt-1 pl-4 break-all whitespace-normal leading-normal">${u.replace(A,'<span class="bg-teal-950 text-teal-350 px-0.5 rounded font-bold">$1</span>')}</div>`}}}return`
    <a href="${r}" ${o} class="block px-3 py-2 rounded-lg text-xs font-mono transition group ${e?"bg-teal-950/30 text-teal-400 font-bold border-l-2 border-teal-500":"text-slate-450 hover:bg-slate-900/40 hover:text-slate-200"}">
      <div class="flex items-center justify-between">
        <span class="truncate flex items-center gap-1.5">
          ${s.isEncrypted?'<span class="text-red-450 text-[9px]">🔒</span>':'<span class="text-slate-650 group-hover:text-slate-500 text-[9px]">⊙</span>'}
          ${R(n)}
        </span>
      </div>
      ${a}
    </a>
  `}async function ue(){var E,D,J;await Ce();let s=me;Fe.trim().length>0&&(s=s.map(S=>({page:S,score:Go(mt.find(y=>y.slug===S.slug)||S,Fe)})).filter(S=>S.score>0).sort((S,y)=>y.score-S.score).map(S=>S.page)),Pt&&(s=s.filter(S=>S.tags.includes(Pt)));const e=Array.from(new Set(me.flatMap(S=>S.tags)));Vo.innerHTML=`
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
            <span id="system-status-label" class="text-xs ${navigator.onLine?"text-emerald-400":"text-amber-500"} font-mono tracking-wider">${jo}</span>
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
        ${(()=>{const S=JSON.parse(localStorage.getItem("pinned_docs")||"[]"),y=me.filter(N=>S.includes(N.slug));return y.length>0?`
            <div class="px-2 py-4 border-b border-slate-800/80 shrink-0">
              <div class="px-3 mb-2 flex items-center justify-between">
                <span class="text-xs font-semibold text-amber-500 uppercase tracking-widest font-mono flex items-center gap-1">? Pinned Docs</span>
              </div>
              <div class="space-y-1">
                ${Vn(y)}
              </div>
            </div>`:""})()}
        
        <!-- Tag Filter Cloud -->
        ${e.length>0?`
          <div class="px-4 py-2 border-b border-slate-800/80 flex flex-wrap gap-1 max-h-24 overflow-y-auto shrink-0 select-none">
            <button class="tag-badge px-1.5 py-0.5 text-[9px] rounded-full font-mono transition ${Pt?"bg-slate-900 text-slate-400 hover:bg-slate-850":"bg-teal-500 text-slate-950 font-bold shadow-[0_0_8px_rgba(20,184,166,0.3)]"}" data-tag="">#ALL</button>
            ${e.map(S=>{const y=si(S);return`
                <button class="tag-badge px-1.5 py-0.5 text-[9px] rounded-full font-mono transition ${Pt===S?"bg-teal-500 text-slate-950 font-bold shadow-[0_0_8px_rgba(20,184,166,0.3)]":`${y.className} hover:opacity-85`}" data-tag="${R(S)}">#${R(S.toUpperCase())}</button>
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
            ${Vn(s)}
            ${s.length===0?`
              <div class="text-center py-6 text-xs text-slate-650 font-mono">No entries found</div>
            `:""}
          </div>

          <div class="px-3 mb-2 mt-6 flex items-center justify-between border-t border-slate-900/60 pt-4 select-none shrink-0">
            <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">🏷️ Tag Explorer</span>
          </div>
          <div id="tag-tree-container" class="space-y-1 px-1 max-h-48 overflow-y-auto pr-1">
            ${na(Oi(s))}
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
      <textarea id="floating-scratchpad-content" placeholder="Type temporary notes here... Persisted locally." class="flex-1 bg-transparent p-3 outline-none text-xs font-mono text-slate-200 resize-none placeholder-slate-600 leading-relaxed"></textarea>
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
  `;const t=document.getElementById("wiki-search-input");t&&t.addEventListener("input",S=>{Fe=S.target.value;const y=mt.filter(w=>w.title.toLowerCase().includes(Fe.toLowerCase())||w.content.toLowerCase().includes(Fe.toLowerCase())||w.tags.some(x=>x.toLowerCase().includes(Fe.toLowerCase()))),N=document.getElementById("pages-list");N.innerHTML=Vn(y),y.length===0&&(N.innerHTML='<div class="text-center py-6 text-xs text-slate-650 font-mono">No entries found</div>')});const n=document.getElementById("pwa-install-btn");n&&n.addEventListener("click",async()=>{if(Bt){Bt.prompt();const{outcome:S}=await Bt.userChoice;S==="accepted"&&console.log("User accepted the PWA install prompt"),Bt=null,n.classList.add("hidden")}});const r=document.getElementById("system-panic-btn");r&&r.addEventListener("click",async()=>{if(confirm("CRITICAL SYSTEM COMPROMISE PROTOCOL: Purge entire local database, clear all service worker caches, unregister service workers, and force self-destruct reload immediately?")){if(indexedDB.deleteDatabase("secops-wiki-db"),"caches"in window){const S=await caches.keys();await Promise.all(S.map(y=>caches.delete(y)))}if("serviceWorker"in navigator){const S=await navigator.serviceWorker.getRegistrations();await Promise.all(S.map(y=>y.unregister()))}localStorage.clear(),sessionStorage.clear(),Z=null,window.history.replaceState(null,"","about:blank"),window.location.replace("about:blank")}});const o=document.getElementById("sidebar-toggle-btn"),a=document.getElementById("sidebar-close-btn"),i=document.getElementById("sidebar-backdrop"),l=()=>{const S=document.getElementById("sidebar"),y=document.getElementById("sidebar-backdrop");S&&y&&(S.classList.add("-translate-x-full"),y.classList.add("hidden"))},d=()=>{const S=document.getElementById("sidebar"),y=document.getElementById("sidebar-backdrop");S&&y&&(S.classList.remove("-translate-x-full"),y.classList.remove("hidden"))};o&&o.addEventListener("click",d),a&&a.addEventListener("click",l),i&&i.addEventListener("click",l),document.querySelectorAll("#sidebar a").forEach(S=>{S.addEventListener("click",()=>{window.innerWidth<768&&l()})});const g=document.getElementById("theme-toggle-btn");g&&g.addEventListener("click",qo);const m=[12,13,14,15,16,18,20];let u=parseInt(localStorage.getItem("secops-wiki-font-size-idx")||"2",10);const A=()=>{document.documentElement.style.setProperty("--wiki-font-size",m[u]+"px"),localStorage.setItem("secops-wiki-font-size-idx",u.toString())};A(),(E=document.getElementById("font-size-increase-btn"))==null||E.addEventListener("click",()=>{u<m.length-1&&(u++,A())}),(D=document.getElementById("font-size-decrease-btn"))==null||D.addEventListener("click",()=>{u>0&&(u--,A())}),(J=document.getElementById("font-size-reset-btn"))==null||J.addEventListener("click",()=>{u=2,A()}),document.querySelectorAll(".tag-badge").forEach(S=>{S.addEventListener("click",async y=>{Pt=y.currentTarget.getAttribute("data-tag")||"",await ue()})});const U=document.getElementById("tag-tree-container");U&&(U.addEventListener("click",S=>{const y=S.target.closest(".tree-folder-header");if(y){const N=y.nextElementSibling,w=y.querySelector(".tree-folder-icon");if(N){const x=N.classList.toggle("hidden");w&&(w.style.transform=x?"rotate(0deg)":"rotate(90deg)")}}}),U.addEventListener("keydown",S=>{var F,H;const y=document.activeElement;if(!y||!U.contains(y))return;const w=Array.from(U.querySelectorAll(".tree-folder-header, .tree-folder-children a")).filter(O=>{let j=O.parentElement;for(;j&&j!==U;){if(j.classList.contains("tree-folder-children")&&j.classList.contains("hidden"))return!1;j=j.parentElement}return!0}),x=w.indexOf(y);if(x!==-1){if(S.key==="ArrowDown"){S.preventDefault();const O=(x+1)%w.length;(F=w[O])==null||F.focus()}else if(S.key==="ArrowUp"){S.preventDefault();const O=(x-1+w.length)%w.length;(H=w[O])==null||H.focus()}else if(S.key==="Enter")S.preventDefault(),y.click();else if(S.key==="ArrowRight"){if(S.preventDefault(),y.classList.contains("tree-folder-header")){const O=y.nextElementSibling,j=y.querySelector(".tree-folder-icon");O&&O.classList.contains("hidden")&&(O.classList.remove("hidden"),j&&(j.style.transform="rotate(90deg)"))}}else if(S.key==="ArrowLeft"&&(S.preventDefault(),y.classList.contains("tree-folder-header"))){const O=y.nextElementSibling,j=y.querySelector(".tree-folder-icon");O&&!O.classList.contains("hidden")&&(O.classList.add("hidden"),j&&(j.style.transform="rotate(0deg)"))}}})),await li()}async function li(){const s=document.getElementById("main-content");if(ee==="graph"){await Ti(s);return}if(ee==="system"){Ht(s);return}if(ee==="import-p2p"){await Pi(s);return}if(ee==="audit-logs"){await zi(s);return}if(et){await Zo(s);return}await yn(s)}async function yn(s){const e=await We(ee);if(!e){s.innerHTML=`
      <div class="text-center py-20 bg-slate-950/40 border border-red-950/20 rounded-xl px-6 glow-border">
        <svg class="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
        </svg>
        <h2 class="text-2xl font-bold font-mono text-white mb-2 uppercase">DATA_MISSING</h2>
        <p class="text-slate-400 text-sm max-w-md mx-auto mb-6">Requested intel document slug "${R(ee)}" is not registered in index database.</p>
        <a href="#/new" class="px-4 py-2 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 font-mono text-xs uppercase rounded transition hover:text-white">
          Create New Document
        </a>
      </div>
    `;return}const t=await ea(e.slug);let n=e.content,r=!1;if(e.isEncrypted)if(Z)try{n=await ye(e.content,Z)}catch{r=!0}else r=!0;if(r){const b=as();let $="";if(b&&($=`<p class="text-red-500 text-xs font-mono font-bold mt-2 animate-pulse uppercase">SECURITY LOCKOUT: Too many failures. Locked out for ${Math.ceil((os()-Date.now())/1e3)}s.</p>`),s.innerHTML=`
      <div class="max-w-md mx-auto my-20 p-6 glass-panel border border-teal-900/30 rounded-xl text-center glow-border select-none">
        <svg class="w-16 h-16 text-teal-500 mx-auto mb-4 animate-pulse" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        <h2 class="text-xl font-bold font-mono text-white mb-2 uppercase">DECRYPT_REQUIRED</h2>
        <p class="text-slate-400 text-xs font-mono mb-6">This document payload is encrypted. Enter passphrase to decrypt.</p>
        <form id="decrypt-doc-form" class="space-y-4">
          <input type="password" id="decrypt-password-input" placeholder="Enter security passphrase..." ${b?"disabled":""} class="w-full bg-slate-950/80 border border-slate-800 focus:border-teal-500/50 rounded-lg p-2.5 text-base text-slate-200 focus:outline-none transition font-mono text-center disabled:opacity-40 disabled:cursor-not-allowed">
          <button type="submit" ${b?"disabled":""} class="w-full py-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-mono text-xs uppercase rounded font-bold transition shadow-[0_0_10px_rgba(20,184,166,0.2)] disabled:opacity-40 disabled:cursor-not-allowed">
            DECRYPT IN-MEMORY
          </button>
        </form>
        <div id="decrypt-lockout-timer">${$}</div>
      </div>
    `,b){const V=setInterval(async()=>{const B=Math.ceil((os()-Date.now())/1e3),le=document.getElementById("decrypt-lockout-timer");B<=0?(clearInterval(V),await yn(s)):le&&(le.innerHTML=`<p class="text-red-500 text-xs font-mono font-bold mt-2 animate-pulse uppercase">SECURITY LOCKOUT: Too many failures. Locked out for ${B}s.</p>`)},1e3)}setTimeout(()=>{const V=document.getElementById("decrypt-password-input");V==null||V.focus()},50),document.getElementById("decrypt-doc-form").addEventListener("submit",async V=>{if(V.preventDefault(),as()){alert("Security Lockout active.");return}const B=document.getElementById("decrypt-password-input").value;try{const le=await Re(B);await ye(e.content,le),ei(),Z=le,await ue()}catch{Qr(),alert("Security Alert: Authentication failed. Invalid security passphrase."),await yn(s)}});return}const o=n.split(/\s+/).filter(b=>b.length>0).length,a=Math.max(1,Math.round(o/200)),i=At(n),l=new Date(e.updatedAt).toLocaleString(),d=document.createElement("div");d.innerHTML=i,Yr(d);const p=d.innerHTML,g=ni(p,Fe),m=d.querySelectorAll("h1, h2, h3");let u="";m.length>0&&(u=`
      <div class="hidden lg:block w-60 shrink-0 self-start sticky top-8">
        <div class="glass-panel border border-slate-800/80 rounded-xl p-4">
          <h4 class="text-xs font-bold font-mono text-slate-400 uppercase tracking-widest border-b border-slate-800/60 pb-2 mb-3">Outline</h4>
          <nav class="space-y-2 text-xs font-mono max-h-[350px] overflow-y-auto pr-1">
            ${Array.from(m).map(b=>{const $=b.textContent||"",K=b.id||$.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,""),V=b.tagName.toLowerCase(),B=V==="h1"?"pl-0 font-semibold":V==="h2"?"pl-3 border-l border-slate-800":"pl-6 border-l border-slate-800";return`
                <a href="#/page/${e.slug}#${K}" class="block text-slate-500 hover:text-teal-400 transition truncate ${B}" title="${R($)}">
                  ${R($)}
                </a>
              `}).join("")}
          </nav>
        </div>
      </div>
    `);const A=n.match(/^(\s*[-*] )\[ \]/gm)||[],U=n.match(/^(\s*[-*] )\[[xX]\]/gm)||[],E=A.length+U.length;let D="";if(E>0){const b=U.length,$=Math.round(b/E*100),K=10,V=Math.round(b/E*K),B=K-V;D=`
      <div class="glass-panel border border-slate-800/80 p-3 rounded-lg flex items-center justify-between mb-6 text-[10px] sm:text-xs font-mono select-none">
        <div class="flex items-center gap-2 sm:gap-3">
          <span class="text-teal-400 font-bold">📋 TASK STATUS:</span>
          <span class="text-slate-400 font-bold">${"█".repeat(V)+"░".repeat(B)}</span>
          <span class="text-teal-400 font-bold">${$}%</span>
        </div>
        <div class="text-slate-500">
          ${b}/${E} COMPLETED
        </div>
      </div>
    `}let J="";try{const b=JSON.parse(sessionStorage.getItem("secops-wiki-breadcrumbs")||"[]");b.length>1&&(J=`
        <div class="flex items-center gap-1.5 text-[10px] font-mono text-slate-500 mb-3 select-none overflow-x-auto whitespace-nowrap pb-1">
          <span class="text-slate-600 uppercase">RECENT:</span>
          ${b.map(($,K)=>{const V=Xr($),le=$===e.slug?"text-teal-400 font-bold":"text-slate-450 hover:text-slate-350 transition",v=K<b.length-1?'<span class="text-slate-850">/</span>':"";return`
              <a href="#/page/${$}" class="${le}">${R(V)}</a>
              ${v}
            `}).join("")}
        </div>
      `)}catch{}let S="";e.signature?await Qe(e)!==e.signature?S=`<span class="px-2 py-0.5 bg-red-950/40 text-red-400 border border-red-900/30 rounded text-[9px] font-mono font-bold animate-pulse">⚠️ INTEGRITY FAIL</span>
                            <button id="reconcile-integrity-btn" class="ml-1.5 px-2 py-0.5 bg-red-950/50 hover:bg-red-900/40 text-red-400 hover:text-white border border-red-900/30 hover:border-red-700 rounded text-[9px] font-mono font-bold uppercase transition">Reconcile</button>`:S='<span class="px-2 py-0.5 bg-emerald-950/40 text-emerald-400 border border-emerald-900/30 rounded text-[9px] font-mono font-bold">✓ INTEGRITY OK</span>':S='<span class="px-2 py-0.5 bg-amber-950/40 text-amber-400 border border-amber-900/30 rounded text-[9px] font-mono font-bold">⚠️ UNSIGNED</span>',e.isEncrypted?document.body.classList.add("encrypted-page-active"):document.body.classList.remove("encrypted-page-active");const y=e.classification||"UNCLASSIFIED";let N="border-emerald-500/20 text-emerald-400 bg-emerald-950/10",w="classification-glow-unclassified";y==="CONFIDENTIAL"?(N="border-blue-500/20 text-blue-400 bg-blue-950/10",w="classification-glow-confidential"):y==="SECRET"?(N="border-amber-500/20 text-amber-500 bg-amber-950/10",w="classification-glow-secret"):y==="TOP SECRET"&&(N="border-red-500/30 text-red-500 bg-red-950/10 animate-pulse",w="classification-glow-topsecret");const x=`
    <div class="border ${N} px-4 py-1.5 rounded-lg text-center text-[10px] font-bold font-mono uppercase tracking-widest select-none mb-6">
      ✦ ${y} ✦
    </div>
  `,F=`
    <div class="border ${N} px-4 py-1.5 rounded-lg text-center text-[10px] font-bold font-mono uppercase tracking-widest select-none mt-8">
      ✦ ${y} ✦
    </div>
  `;s.innerHTML=`
    <div class="flex flex-col lg:flex-row gap-4 lg:gap-8 items-start">
      <!-- Main Content Area -->
      <div class="flex-1 min-w-0 glass-panel border rounded-xl p-5 md:p-6 shadow-xl ${w}">
        <!-- Breadcrumb navigation trail -->
        ${J}
        
        <!-- Top Classification Banner -->
        ${x}
        <!-- Page Header telemetry -->
        <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between border-b border-slate-800 pb-6 mb-6 gap-4">
          <div>
            <h2 class="text-xl sm:text-2xl md:text-3xl font-extrabold text-white font-mono tracking-tight leading-tight break-words">${R(e.title)}</h2>
            <div class="flex flex-wrap items-center gap-3 mt-3">
              <span class="hidden sm:inline text-xs font-mono text-slate-500 uppercase">SYS_REF: ${R(e.slug)}</span>
              <span class="h-3 w-px bg-slate-800"></span>
              <span class="text-xs font-mono text-slate-500 uppercase">UPDATED: ${l}</span>
              <span class="h-3 w-px bg-slate-800"></span>
              <span class="text-xs font-mono text-teal-400 uppercase">⏱️ ${a} MIN READ</span>
              ${S}
              <span class="h-3 w-px bg-slate-800"></span>
              ${e.tags.map(b=>Vr(b)).join("")}
              ${e.expiresAt?`
                <span class="h-3 w-px bg-slate-800"></span>
                <span id="page-expiry-countdown" class="text-xs font-mono text-red-400 font-bold uppercase tracking-wider animate-pulse">SELF-DESTRUCT: CALCULATING...</span>
              `:""}
            </div>
            ${(()=>{const b=Ui(e.content);return b.length>0?`
                  <div class="flex flex-wrap items-center gap-1.5 mt-2">
                    <span class="text-[9px] font-mono text-slate-500 uppercase font-bold">Key Terms:</span>
                    ${b.map($=>`<span class="px-1.5 py-0.5 bg-slate-900 border border-slate-800 text-slate-400 rounded text-[9px] font-mono">${R($)}</span>`).join("")}
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
        ${D}
        <article class="wiki-content prose prose-invert max-w-none">
          ${g}
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
              ${t.map((b,$)=>`
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-3 first:pt-0">
                  <div class="min-w-0">
                    <p class="text-xs font-mono text-slate-300 break-words">REV_${t.length-$} // ${R(b.title)}</p>
                    <p class="text-[10px] font-mono text-slate-500">${new Date(b.updatedAt).toLocaleString()}</p>
                  </div>
                  <button class="restore-rev-btn px-2.5 py-1 bg-slate-900 border border-slate-800 hover:border-slate-700 text-teal-400 hover:text-teal-300 font-mono text-[10px] rounded transition uppercase shrink-0 self-start sm:self-auto" data-rev-id="${R(b.id)}">
                    ROLLBACK
                  </button>
                  <button class="view-rev-diff-btn px-2.5 py-1 bg-slate-900 border border-slate-800 hover:border-slate-700 text-blue-400 hover:text-blue-300 font-mono text-[10px] rounded transition uppercase shrink-0 self-start sm:self-auto" data-rev-id="${R(b.id)}">
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
        ${F}
      </div>

      <!-- Outline / TOC (Desktop only) -->
      ${u}
    </div>
    <!-- Print elements for security marking -->
    ${e.isEncrypted?`
      <div class="print-watermark">[CLASSIFIED - SECURE OPS]</div>
      <div class="print-banner-top">[CLASSIFIED - SECURE OPS]</div>
      <div class="print-banner-bottom">[CLASSIFIED - SECURE OPS]</div>
    `:""}
  `;const H=document.getElementById("pin-page-btn"),O=document.getElementById("pin-page-text");if(H&&O){let b=JSON.parse(localStorage.getItem("pinned_docs")||"[]");b.includes(e.slug)&&(H.classList.add("text-amber-400"),O.innerText="Unpin"),H.addEventListener("click",()=>{b=JSON.parse(localStorage.getItem("pinned_docs")||"[]"),b.includes(e.slug)?(b=b.filter($=>$!==e.slug),H.classList.remove("text-amber-400"),O.innerText="Pin"):(b.push(e.slug),H.classList.add("text-amber-400"),O.innerText="Unpin"),localStorage.setItem("pinned_docs",JSON.stringify(b)),ue()})}const j=document.getElementById("page-export-dropdown-btn"),ae=document.getElementById("page-export-menu");if(j&&ae){j.addEventListener("click",_=>{_.stopPropagation(),ae.classList.toggle("hidden")}),document.addEventListener("click",()=>{ae.classList.add("hidden")});const b=document.getElementById("clone-page-btn");b&&b.addEventListener("click",async()=>{const _=e.slug+"-copy",P={...e,slug:_,title:"Copy of "+e.title,id:crypto.randomUUID(),createdAt:Date.now(),updatedAt:Date.now()};await Ue(P),window.location.hash=`#/edit/${_}`});const $=document.querySelectorAll(".toc-link");if($.length>0){const _=new IntersectionObserver(P=>{P.forEach(z=>{z.isIntersecting&&$.forEach(h=>{h.classList.remove("text-teal-400","font-bold"),h.getAttribute("data-id")===z.target.id&&h.classList.add("text-teal-400","font-bold")})})},{rootMargin:"0px 0px -80% 0px"});document.querySelectorAll("h1, h2, h3").forEach(P=>_.observe(P))}const K=document.getElementById("read-progress");if(K){const _=()=>{const P=document.documentElement.scrollHeight-document.documentElement.clientHeight;if(P>0){const z=window.scrollY/P*100;K.style.width=z+"%"}};window.addEventListener("scroll",_)}document.getElementById("export-single-md").addEventListener("click",async()=>{let _=e.content;if(e.isEncrypted&&Z)try{_=await ye(e.content,Z)}catch{}const P=`---
title: ${e.title}
slug: ${e.slug}
tags: ${e.tags.join(", ")}
updated: ${new Date(e.updatedAt).toISOString()}
encrypted: ${!!e.isEncrypted}
---

`,z=new Blob([P+_],{type:"text/markdown;charset=utf-8;"}),h=URL.createObjectURL(z),C=document.createElement("a");C.href=h,C.download=`${e.slug}.md`,document.body.appendChild(C),C.click(),document.body.removeChild(C),URL.revokeObjectURL(h)}),document.getElementById("export-single-html").addEventListener("click",async()=>{let _=e.content;if(e.isEncrypted&&Z)try{_=await ye(e.content,Z)}catch{}const P=At(_),z=`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${R(e.title)} - SecOps Wiki Offline</title>
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
  <h1>${R(e.title)}</h1>
  <div class="metadata">
    Slug: ${e.slug} &nbsp;|&nbsp; 
    Updated: ${new Date(e.updatedAt).toLocaleString()} &nbsp;|&nbsp;
    Tags: ${e.tags.map(T=>`<span class="badge">#${R(T)}</span>`).join("")}
  </div>
  <article>
    ${P}
  </article>
</body>
</html>`,h=new Blob([z],{type:"text/html;charset=utf-8;"}),C=URL.createObjectURL(h),k=document.createElement("a");k.href=C,k.download=`${e.slug}.html`,document.body.appendChild(k),k.click(),document.body.removeChild(k),URL.revokeObjectURL(C)}),document.getElementById("export-single-print").addEventListener("click",()=>{window.print()});const v=document.getElementById("export-single-p2p");v&&v.addEventListener("click",async()=>{let _=e.content;if(e.isEncrypted&&Z)try{_=await ye(e.content,Z)}catch{}const P=prompt("Create a secure sharing passphrase for this peer link (min 4 characters):");if(P){if(P.length<4){alert("Security Requirement: Passphrase must be at least 4 characters long.");return}try{const z=await Re(P),h={title:e.title,content:_,tags:e.tags,classification:e.classification||"UNCLASSIFIED"},C=await rt(JSON.stringify(h),z),k=btoa(C),T=`${window.location.origin}${window.location.pathname}#/import-p2p?data=${encodeURIComponent(k)}&key=${encodeURIComponent(P)}`;await navigator.clipboard.writeText(T),alert("✓ SECURE P2P LINK GENERATED: The encrypted link has been copied to your clipboard. Share it securely with your peer."),await de("P2P_LINK_EXPORT",`Generated secure share link for document: ${e.title}`)}catch(z){alert(`Encryption error: Failed to generate sharing link - ${z.message}`)}}});const G=document.getElementById("reconcile-integrity-btn");G&&G.addEventListener("click",async()=>{if(!confirm(`RECONCILIATION NOTICE: Confirm restoration of document "${e.title}" to its last cryptographically verified historical revision? Unverified changes will be discarded.`))return;let P=!1;for(const z of t)if(z.signature&&await Qe({slug:z.slug,title:z.title,content:z.content,updatedAt:z.updatedAt,tags:z.tags||[]})===z.signature){await Ue({slug:z.slug,title:z.title,content:z.content,updatedAt:Date.now(),tags:z.tags||[],classification:z.classification||"UNCLASSIFIED",isSystem:e.isSystem,isEncrypted:z.isEncrypted}),P=!0;break}P?(alert("✓ RECONCILIATION COMPLETED: The document has been restored to its last verified authentic state."),await Ce(),await ue()):(alert("⚠️ RECONCILIATION FAILED: No historical revision could be cryptographically verified. Check audit logs."),await de("RECONCILE_FAILED",`Reconciliation failed for "${e.title}". No authentic revisions found.`))})}const se=document.getElementById("delete-page-btn");se&&se.addEventListener("click",async()=>{confirm(`CRITICAL SYSTEM NOTICE: Confirm total purge of intel document "${e.title}"? This action is irreversible.`)&&(await bo(e.slug),localStorage.setItem("secops-wiki-last-update",Date.now().toString()),bt.postMessage("refresh"),window.location.hash="#/page/home")}),s.querySelectorAll("pre").forEach(b=>{const $=document.createElement("div");$.className="relative group",b.parentNode.insertBefore($,b),$.appendChild(b);const K=document.createElement("button");K.className="absolute top-2 right-2 px-2 py-1 bg-slate-900/80 hover:bg-slate-800 text-[10px] text-slate-400 hover:text-white font-mono rounded opacity-0 group-hover:opacity-100 transition focus:opacity-100 border border-slate-800 focus:outline-none",K.textContent="COPY",K.addEventListener("click",()=>{var B;const V=((B=b.querySelector("code"))==null?void 0:B.textContent)||b.textContent||"";navigator.clipboard.writeText(V).then(()=>{K.textContent="COPIED",setTimeout(()=>K.textContent="COPY",2e3),document.body.classList.contains("encrypted-page-active")&&Fo()})}),$.appendChild(K)}),s.querySelectorAll(".restore-rev-btn").forEach(b=>{b.addEventListener("click",async $=>{const K=$.currentTarget.getAttribute("data-rev-id"),V=t.find(B=>B.id===K);if(V&&confirm(`ROLLBACK COMMAND: Revert current page content to revision state "${V.title}" saved on ${new Date(V.updatedAt).toLocaleString()}?`)){const B=await We(e.slug);B&&await vs({id:`${B.slug}-${Date.now()}`,slug:B.slug,title:B.title,content:B.content,updatedAt:Date.now(),tags:B.tags,classification:B.classification,signature:B.signature}),await Ue({slug:V.slug,title:V.title,content:V.content,updatedAt:Date.now(),tags:e.tags,isSystem:e.isSystem}),alert("Revision successfully restored."),await Ce(),await ue()}})}),s.querySelectorAll('.wiki-content input[type="checkbox"]').forEach((b,$)=>{const K=b;K.removeAttribute("disabled"),K.classList.add("cursor-pointer","accent-teal-500"),K.addEventListener("change",async V=>{const B=V.target;await Si(e.slug,$,B.checked)})});const re=document.getElementById("page-expiry-countdown");if(re&&e.expiresAt){const b=()=>{const V=Date.now(),B=e.expiresAt-V;if(B<=0)re.textContent="SELF-DESTRUCT: EXPIRED",ue();else{const le=Math.floor(B/36e5),v=Math.floor(B%(3600*1e3)/(60*1e3)),G=Math.floor(B%(60*1e3)/1e3),_=le>0?`${le}H `:"",P=v>0||le>0?`${v}M `:"";re.textContent=`SELF-DESTRUCT: ${_}${P}${G}S`}};b();const $=setInterval(b,1e3),K=()=>{clearInterval($),window.removeEventListener("hashchange",K)};window.addEventListener("hashchange",K)}await Ri(s),Ni(s);try{window.Prism&&window.Prism.highlightAllUnder(s)}catch{}const he=document.getElementById("copy-page-link-btn");he&&he.addEventListener("click",async()=>{const b=window.location.origin+window.location.pathname+"#/page/"+e.slug;try{await navigator.clipboard.writeText(b),he.textContent="✓ Copied!",setTimeout(()=>{he.textContent="🔗 Copy Link"},2e3)}catch{prompt("Copy this link:",b)}});const W=document.getElementById("related-pages-panel");if(W&&e.tags.length>0){const b=me.filter($=>$.slug!==e.slug&&$.tags.some(K=>e.tags.includes(K))).slice(0,5);b.length>0&&(W.innerHTML=`
        <div class="border-t border-slate-800 mt-8 pt-6">
          <p class="text-xs font-bold font-mono text-slate-400 uppercase tracking-widest mb-3">Related Intel</p>
          <div class="flex flex-wrap gap-2">
            ${b.map($=>`
              <a href="#/page/${$.slug}" class="px-3 py-1.5 bg-slate-900/60 border border-slate-800 hover:border-teal-500/50 hover:text-teal-400 text-slate-400 font-mono text-xs rounded-lg transition flex items-center gap-1.5">
                <span class="text-[9px]">${$.isEncrypted?"🔒":"⊙"}</span>
                ${R($.title)}
              </a>
            `).join("")}
          </div>
        </div>
      `)}}async function Zo(s){let e="",t="",n="",r=[],o=!1,a=!1,i="UNCLASSIFIED",l=0;if(!Me){const h=await We(ee);if(h&&(e=h.title,t=h.slug,n=h.content,r=[...h.tags],o=!!h.isSystem,a=!!h.isEncrypted,i=h.classification||"UNCLASSIFIED",h.expiresAt&&h.updatedAt&&(l=Math.round((h.expiresAt-h.updatedAt)/6e4)),h.isEncrypted))if(Z)try{n=await ye(h.content,Z)}catch{n="ERROR: Decryption key mismatch. Please go back and re-decrypt."}else n="ERROR: This page is encrypted. Decrypt it in the reader view first."}const d=`secops-wiki-draft-${Me?"new":ee}`;let p="";const g=localStorage.getItem(d);if(g)try{const h=JSON.parse(g);p=`
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
        <h2 class="text-xl font-bold font-mono text-white uppercase">${Me?"Establish New Intel Entry":"Update Intel Entry"}</h2>
        <p class="text-xs text-slate-500 font-mono">All text payloads are sanitized client-side against XSS vectors.</p>
      </div>

      ${p}

      <form id="edit-page-form" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Title Input -->
          <div>
            <label class="block text-xs font-semibold text-slate-400 uppercase tracking-widest font-mono mb-2">Document Title</label>
            <input type="text" id="edit-title" value="${R(e)}" required maxlength="100" class="w-full bg-slate-950/80 border border-slate-800 focus:border-teal-500/50 rounded-lg p-2.5 text-base md:text-sm text-slate-200 focus:outline-none transition font-mono">
          </div>

          <!-- Slug Input -->
          <div>
            <label class="block text-xs font-semibold text-slate-400 uppercase tracking-widest font-mono mb-2">Index Slug ID</label>
            <input type="text" id="edit-slug" value="${R(t)}" ${Me?"":"disabled"} required pattern="^[a-z0-9-_]+$" placeholder="e.g. operational-manual" class="w-full bg-slate-950/80 border border-slate-800 focus:border-teal-500/50 rounded-lg p-2.5 text-base md:text-sm text-slate-200 focus:outline-none transition font-mono disabled:opacity-40 disabled:cursor-not-allowed">
            ${Me?'<p class="text-[10px] text-slate-500 mt-1 font-mono">Only lowercase letters, numbers, hyphens, and underscores are allowed.</p>':""}
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Security Classification dropdown select -->
          <div>
            <label class="block text-xs font-semibold text-slate-400 uppercase tracking-widest font-mono mb-2">Security Classification</label>
            <select id="edit-classification" class="w-full bg-slate-950/80 border border-slate-800 focus:border-teal-500/50 rounded-lg p-2.5 text-base md:text-sm text-slate-200 focus:outline-none transition font-mono cursor-pointer">
              <option value="UNCLASSIFIED" ${i==="UNCLASSIFIED"?"selected":""}>UNCLASSIFIED</option>
              <option value="CONFIDENTIAL" ${i==="CONFIDENTIAL"?"selected":""}>CONFIDENTIAL</option>
              <option value="SECRET" ${i==="SECRET"?"selected":""}>SECRET</option>
              <option value="TOP SECRET" ${i==="TOP SECRET"?"selected":""}>TOP SECRET</option>
            </select>
          </div>
          <!-- Document Expiry Timer -->
          <div>
            <label class="block text-xs font-semibold text-slate-400 uppercase tracking-widest font-mono mb-2">Intel Expiry Timer (Self-Destruct)</label>
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
          <label class="block text-xs font-semibold text-slate-400 uppercase tracking-widest font-mono mb-2">Associated Tags</label>
          <div id="tag-pills-container" class="flex flex-wrap items-center gap-2 w-full bg-slate-950/80 border border-slate-800 focus-within:border-teal-500/50 rounded-lg p-2 min-h-[42px] transition font-mono">
            <!-- Dynamic pills go here -->
            <input type="text" id="tag-pill-input" placeholder="Type tag and press Enter..." class="bg-transparent border-0 text-base md:text-sm text-slate-200 focus:outline-none flex-1 min-w-[120px] p-0.5">
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
            <label class="text-xs font-semibold text-slate-400 uppercase tracking-widest font-mono">Markdown Content payload</label>
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
              <textarea id="edit-content" rows="16" required class="w-full bg-slate-950/80 border border-slate-800 focus:border-teal-500/50 rounded-b-lg p-4 text-base md:text-sm text-slate-200 focus:outline-none transition font-mono border-t-0" placeholder="Enter markdown payload here...">${R(n)}</textarea>
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
            <input type="checkbox" id="edit-encrypt" ${a?"checked":""} class="w-4 h-4 rounded border-slate-850 bg-slate-950 text-teal-500 focus:ring-teal-500/50 cursor-pointer">
            <label for="edit-encrypt" class="text-xs font-semibold text-slate-400 uppercase tracking-widest font-mono cursor-pointer select-none">Encrypt Document (AES-GCM)</label>
          </div>
          <div class="flex gap-3 justify-end self-end sm:self-auto">
            <a href="${Me?"#/page/home":`#/page/${ee}`}" id="cancel-edit-btn" class="px-4 py-2 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 font-mono text-xs uppercase rounded transition hover:text-white">
              Cancel
            </a>
            <button type="submit" class="px-4 py-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-mono text-xs uppercase rounded font-bold transition shadow-[0_0_10px_rgba(20,184,166,0.15)]">
              Commit Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  `;const m=document.getElementById("edit-page-form"),u=document.getElementById("edit-content"),A=document.getElementById("live-preview-box"),U=document.getElementById("cancel-edit-btn"),E=document.getElementById("discard-draft-btn"),D=document.getElementById("edit-tab-write"),J=document.getElementById("edit-tab-preview"),S=document.getElementById("edit-content-container"),y=document.getElementById("live-preview-container");D&&J&&S&&y&&(D.addEventListener("click",()=>{D.className="flex-1 py-2 text-center text-xs font-mono font-bold border-b-2 border-teal-500 text-teal-400",J.className="flex-1 py-2 text-center text-xs font-mono font-bold border-b-2 border-transparent text-slate-500",S.className="block",y.className="hidden md:block"}),J.addEventListener("click",()=>{J.className="flex-1 py-2 text-center text-xs font-mono font-bold border-b-2 border-teal-500 text-teal-400",D.className="flex-1 py-2 text-center text-xs font-mono font-bold border-b-2 border-transparent text-slate-500",y.className="block",S.className="hidden md:block"}));const N=()=>{const h=u.value,C=document.getElementById("editor-stats");if(C){const k=h.split(/\s+/).filter(q=>q.length>0).length,T=h.length,Y=h.split(`
`).length;C.innerText=`Words: ${k} | Chars: ${T} | Lines: ${Y}`}if(h.trim().length===0){A.innerHTML='<span class="text-slate-600 font-mono text-xs">No input content.</span>';return}A.innerHTML=At(h)};function w(h){const C=h.trim().split(`
`);if(C.length<2)return h;const k=C.map(pe=>{let Q=pe.trim();return Q.startsWith("|")&&(Q=Q.slice(1)),Q.endsWith("|")&&(Q=Q.slice(0,-1)),Q.split("|").map(be=>be.trim())}),T=Math.max(...k.map(pe=>pe.length));if(T===0)return h;const Y=Array(T).fill(0);for(let pe=0;pe<k.length;pe++){const Q=pe===1&&k[pe].every(be=>/^:-*-*:?$/.test(be)||/^-+$/.test(be));for(let be=0;be<T;be++){const Te=k[pe][be]||"";!Q&&Te.length>Y[be]&&(Y[be]=Te.length)}}for(let pe=0;pe<T;pe++)Y[pe]=Math.max(Y[pe],3);return k.map((pe,Q)=>{const be=Q===1&&pe.every(De=>/^:-*-*:?$/.test(De)||/^-+$/.test(De));return`| ${Array(T).fill("").map((De,Ne)=>{const ve=pe[Ne]||"";if(be){const tt=ve.startsWith(":"),Lt=ve.endsWith(":"),qe=Y[Ne]-(tt?1:0)-(Lt?1:0);return(tt?":":"")+"-".repeat(Math.max(1,qe))+(Lt?":":"")}else return ve.padEnd(Y[Ne]," ")}).join(" | ")} |`}).join(`
`)}const x=document.getElementById("toolbar-sketch-btn");x&&x.addEventListener("click",()=>{Di(u)}),Ci(u);const F=h=>{const C=u.selectionStart,k=u.selectionEnd,T=u.value,Y=T.substring(C,k);let q="";switch(h){case"bold":q=`**${Y||"bold_text"}**`;break;case"italic":q=`*${Y||"italic_text"}*`;break;case"header":q=`
### ${Y||"Header text"}
`;break;case"code":q=`
\`\`\`javascript
${Y||"// code here"}
\`\`\`
`;break;case"link":q=`[${Y||"Link text"}](url)`;break;case"table":if(Y&&Y.includes("|")&&Y.includes(`
`))try{q=`
`+w(Y)+`
`}catch{q=`
| Header 1 | Header 2 |
| -------- | -------- |
| Cell 1   | Cell 2   |
`}else q=`
| Header 1 | Header 2 |
| -------- | -------- |
| Cell 1   | Cell 2   |
`;break;case"checklist":q=`
- [ ] ${Y||"Task description"}
`;break}u.value=T.substring(0,C)+q+T.substring(k),u.focus(),u.selectionStart=C+q.length,u.selectionEnd=C+q.length,N()};s.querySelectorAll(".format-btn").forEach(h=>{h.addEventListener("click",C=>{const k=C.currentTarget.getAttribute("data-format")||"";F(k)})}),u.addEventListener("keyup",h=>{const C=u.value,k=u.selectionStart;if(C.substring(k-2,k)==="[[")cn=!0,dn=k,ss="",vi(u);else if(cn){if(h.key==="Escape"||h.key==="ArrowUp"||h.key==="ArrowDown"||h.key==="Enter")return;const Y=C.substring(dn,k);Y.includes(`
`)||k<dn?pn():(ss=Y,Jo(u))}}),u.addEventListener("keydown",h=>{if(cn){const C=document.getElementById("autocomplete-popup");if(!C)return;const k=C.querySelectorAll(".editor-autocomplete-item");let T=Array.from(k).findIndex(Y=>Y.classList.contains("active"));h.key==="ArrowDown"?(h.preventDefault(),k.length>0&&(T>=0&&k[T].classList.remove("active","bg-teal-950/20","text-teal-400"),T=(T+1)%k.length,k[T].classList.add("active","bg-teal-950/20","text-teal-400"),k[T].scrollIntoView({block:"nearest"}))):h.key==="ArrowUp"?(h.preventDefault(),k.length>0&&(T>=0&&k[T].classList.remove("active","bg-teal-950/20","text-teal-400"),T=(T-1+k.length)%k.length,k[T].classList.add("active","bg-teal-950/20","text-teal-400"),k[T].scrollIntoView({block:"nearest"}))):h.key==="Enter"?(h.preventDefault(),T>=0?k[T].click():k.length>0&&k[0].click()):h.key==="Escape"&&(h.preventDefault(),pn())}}),u.addEventListener("input",()=>{N(),le()}),u.addEventListener("keydown",h=>{if(h.ctrlKey&&(h.key==="s"||h.key==="S")){h.preventDefault();const C=document.getElementById("edit-page-form");C&&C.requestSubmit();return}if(h.key==="Tab"){h.preventDefault();const C=u.selectionStart,k=u.selectionEnd;u.value=u.value.substring(0,C)+"  "+u.value.substring(k),u.selectionStart=u.selectionEnd=C+2,N();return}if(h.ctrlKey&&(h.key==="b"||h.key==="B")){h.preventDefault();const C=u.selectionStart,k=u.selectionEnd,T=u.value.substring(C,k),Y=`**${T||"bold"}**`;u.value=u.value.substring(0,C)+Y+u.value.substring(k),u.selectionStart=C+2,u.selectionEnd=C+2+(T||"bold").length,N();return}if(h.ctrlKey&&(h.key==="i"||h.key==="I")){h.preventDefault();const C=u.selectionStart,k=u.selectionEnd,T=u.value.substring(C,k),Y=`*${T||"italic"}*`;u.value=u.value.substring(0,C)+Y+u.value.substring(k),u.selectionStart=C+1,u.selectionEnd=C+1+(T||"italic").length,N();return}}),N();const H=document.getElementById("restore-draft-btn"),O=document.getElementById("discard-draft-btn"),j=document.getElementById("draft-restore-banner");if(g&&H&&O)try{const h=JSON.parse(g);H.addEventListener("click",()=>{const C=document.getElementById("edit-title"),k=document.getElementById("edit-content");C&&(C.value=h.title||""),k&&(k.value=h.content||"",N()),Array.isArray(h.tags)&&(r=h.tags,W()),j==null||j.remove()}),O.addEventListener("click",()=>{localStorage.removeItem(d),j==null||j.remove()})}catch{}const ae=document.getElementById("tag-pills-container"),se=document.getElementById("tag-pill-input"),re=document.getElementById("tag-pill-dropdown"),he=Array.from(new Set(me.flatMap(h=>h.tags)));function W(){if(!ae||!se)return;ae.querySelectorAll(".tag-badge-pill").forEach(k=>k.remove()),r.forEach(k=>{const T=document.createElement("span");T.className="tag-badge-pill flex items-center gap-1 text-[10px] font-mono bg-teal-950/40 text-teal-400 px-2 py-1 rounded border border-teal-900/30 select-none",T.innerHTML=`
        #${R(k)}
        <button type="button" class="tag-remove-btn hover:text-red-400 font-bold transition focus:outline-none" data-tag="${R(k)}">×</button>
      `,ae.insertBefore(T,se)}),ae.querySelectorAll(".tag-remove-btn").forEach(k=>{k.addEventListener("click",T=>{const Y=T.currentTarget.getAttribute("data-tag");Y&&(r=r.filter(q=>q!==Y),W(),le())})})}function b(){if(!re||!se)return;const h=se.value.trim().toLowerCase(),C=he.filter(T=>T.includes(h)&&!r.includes(T));if(C.length===0){re.classList.add("hidden");return}re.innerHTML=C.map(T=>`
      <div class="tag-dropdown-item px-3 py-2 cursor-pointer hover:bg-slate-900 hover:text-white text-slate-350 transition" data-tag="${R(T)}">
        #${R(T)}
      </div>
    `).join(""),re.classList.remove("hidden"),re.querySelectorAll(".tag-dropdown-item").forEach(T=>{T.addEventListener("click",Y=>{const q=Y.currentTarget.getAttribute("data-tag");q&&!r.includes(q)&&(r.push(q),W(),le()),se.value="",re.classList.add("hidden"),se.focus()})})}se&&(se.addEventListener("keydown",h=>{if(h.key==="Enter"||h.key===","){h.preventDefault();const C=se.value.trim().toLowerCase().replace(/[^a-z0-9-_]/g,"");C&&!r.includes(C)&&(r.push(C),W(),le()),se.value="",re&&re.classList.add("hidden")}else h.key==="Backspace"&&se.value===""&&(r.pop(),W(),le())}),se.addEventListener("input",b),se.addEventListener("focus",b)),W();const $=document.getElementById("editor-layout-grid"),K=document.getElementById("live-preview-container"),V=document.getElementById("toggle-split-btn");function B(){!$||!K||!V||(on?($.classList.remove("md:grid-cols-1"),$.classList.add("md:grid-cols-2"),K.classList.remove("md:hidden"),K.classList.add("md:block"),V.textContent="Full Width",V.classList.remove("text-slate-450"),V.classList.add("text-teal-400")):($.classList.remove("md:grid-cols-2"),$.classList.add("md:grid-cols-1"),K.classList.remove("md:block"),K.classList.add("md:hidden"),V.textContent="Split Screen",V.classList.remove("text-teal-400"),V.classList.add("text-slate-450")))}V&&V.addEventListener("click",()=>{on=!on,localStorage.setItem("secops-wiki-split-screen",on.toString()),B()}),B();const le=()=>{var k;const h=(k=document.getElementById("edit-title"))==null?void 0:k.value,C=u.value;(h||C||r.length>0)&&localStorage.setItem(d,JSON.stringify({title:h,content:C,tags:r,updatedAt:Date.now()}))},v=setInterval(le,5e3),G=()=>{clearInterval(v),window.removeEventListener("hashchange",G)};window.addEventListener("hashchange",G);const _=()=>{clearInterval(v),window.removeEventListener("hashchange",G),localStorage.removeItem(d),pn()};U.addEventListener("click",_),E&&E.addEventListener("click",()=>{var h;_(),(h=document.getElementById("draft-restore-banner"))==null||h.remove(),Zo(s)});const P=h=>{re&&!re.contains(h.target)&&h.target!==se&&re.classList.add("hidden")};document.addEventListener("click",P);const z=()=>{document.removeEventListener("click",P),window.removeEventListener("hashchange",z)};window.addEventListener("hashchange",z),m.addEventListener("submit",async h=>{h.preventDefault();const C=document.getElementById("edit-title").value.trim(),k=Me?document.getElementById("edit-slug").value.trim().toLowerCase():t,T=u.value,Y=document.getElementById("edit-encrypt").checked,q=document.getElementById("edit-classification").value,pe=document.getElementById("edit-expiry"),Q=pe?parseInt(pe.value,10):0;if(Me&&!/^[a-z0-9-_]+$/.test(k)){alert("Security Alert: Slug contains illegal characters. Use alphanumeric, hyphens, and underscores only.");return}const be=r.map(ve=>rn(ve.trim()).toLowerCase()).filter(ve=>ve.length>0),Te=await We(k);Te&&await vs({id:`${Te.slug}-${Date.now()}`,slug:Te.slug,title:Te.title,content:Te.content,updatedAt:Te.updatedAt,isEncrypted:Te.isEncrypted,tags:Te.tags,classification:Te.classification,signature:Te.signature});let De=T;if(Y){if(!Z){const ve=prompt("Enter a security passphrase to encrypt this document (min 8 chars, mixed case, numbers, symbols):");if(!ve){alert("Encryption Aborted: A security passphrase is required to save an encrypted document.");return}const tt=Wo(ve);if(!tt.valid){alert(`SECURITY ERROR: Passphrase too weak.

${tt.message}`);return}Z=await Re(ve)}try{De=await rt(T,Z)}catch(ve){alert(`Encryption failure: ${ve.message}`);return}}const Ne={slug:k,title:C,content:De,updatedAt:Date.now(),tags:be,isSystem:o,isEncrypted:Y,classification:q};Q>0&&(Ne.expiresAt=Ne.updatedAt+Q*60*1e3),Ne.signature=await Qe(Ne);try{await Ue(Ne),_(),bt.postMessage("refresh"),window.location.hash=`#/page/${k}`}catch(ve){alert(`Database transaction error: ${ve.message}`)}})}function ci(s,e){let t=s.replace(/\.md$/i,"").replace(/[-_]+/g," ");t=t.split(" ").map(a=>a.charAt(0).toUpperCase()+a.slice(1)).join(" ");let n=s.replace(/\.md$/i,"").toLowerCase().replace(/[^a-z0-9-_]+/g,"-"),r=e,o=["imported"];if(e.startsWith("---")){const a=e.indexOf("---",3);if(a!==-1){const i=e.substring(3,a);r=e.substring(a+3).trim(),i.split(`
`).forEach(d=>{const p=d.indexOf(":");if(p!==-1){const g=d.substring(0,p).trim().toLowerCase(),m=d.substring(p+1).trim();g==="title"?t=m.replace(/^["']|["']$/g,""):g==="slug"?n=m.replace(/[^a-z0-9-_]+/g,"-").toLowerCase():g==="tags"&&(o=m.split(",").map(u=>u.trim().replace(/^["']|["']$/g,"")).filter(u=>u.length>0))}})}}return{slug:n,title:t,content:r,updatedAt:Date.now(),tags:o,isSystem:!1}}function di(s){const e=["Title","Slug","Tags","Word Count","Encrypted","Last Updated"],t=s.map(n=>{const r=n.content.split(/\s+/).filter(o=>o.length>0).length;return[`"${n.title.replace(/"/g,'""')}"`,`"${n.slug}"`,`"${n.tags.join(", ")}"`,r,n.isEncrypted?"TRUE":"FALSE",`"${new Date(n.updatedAt).toISOString()}"`]});return[e.join(","),...t.map(n=>n.join(","))].join(`
`)}function pi(s){let e="";for(const t of s){let n=t.content;if(t.isEncrypted&&Z)try{n=t.content.includes(":")?"🔒 [Encrypted Document: Passphrase Required]":t.content}catch{n="🔒 [Encrypted Document: Passphrase Required]"}const r=At(n);e+=`
      <section style="page-break-after: always; margin-bottom: 3rem; border-bottom: 2px solid #e2e8f0; padding-bottom: 2rem;">
        <h1 style="font-size: 2.25rem; font-family: monospace; margin-bottom: 0.5rem; color: #1a202c;">${R(t.title)}</h1>
        <div style="font-size: 0.75rem; color: #718096; font-family: monospace; margin-bottom: 1.5rem;">
          SLUG: ${t.slug} | TAGS: #${t.tags.map(o=>R(o)).join(", #")} | UPDATED: ${new Date(t.updatedAt).toLocaleString()}
        </div>
        <div style="line-height: 1.6; color: #2d3748;">
          ${r}
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
</html>`}function ui(s){const e=[],t=s.map(r=>`<a href="${r.slug}.html" style="display: block; padding: 0.5rem; color: #94a3b8; text-decoration: none; font-family: monospace; font-size: 0.8rem; border-radius: 4px; transition: background 0.2s;" onmouseover="this.style.background='#1e293b'; this.style.color='#2dd4bf'" onmouseout="this.style.background='transparent'; this.style.color='#94a3b8'">${R(r.title)}</a>`).join(`
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
      <textarea id="floating-scratchpad-content" placeholder="Type temporary notes here... Persisted locally." class="flex-1 bg-transparent p-3 outline-none text-xs font-mono text-slate-200 resize-none placeholder-slate-600 leading-relaxed"></textarea>
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
      ${s.map(r=>`
        <div class="page-card">
          <a class="page-title" href="${r.slug}.html">${R(r.title)}</a>
          <div class="metadata">
            SLUG: ${r.slug} | TAGS: #${r.tags.map(o=>R(o)).join(", #")} | UPDATED: ${new Date(r.updatedAt).toLocaleString()}
          </div>
        </div>
      `).join("")}
    </div>
  </main>
</body>
</html>`;return e.push({name:"index.html",content:n}),s.forEach(r=>{let o=r.content;if(r.isEncrypted&&Z)try{o=r.content.includes(":")?"🔒 [Encrypted Document: Decrypted view not exported]":r.content}catch{o="🔒 [Encrypted Document: Decrypted view not exported]"}let a=At(o);a=a.replace(/href="#\/page\/([a-z0-9-_]+)"/g,'href="$1.html"');const i=`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${R(r.title)} - SecOps Static Wiki</title>
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
      <textarea id="floating-scratchpad-content" placeholder="Type temporary notes here... Persisted locally." class="flex-1 bg-transparent p-3 outline-none text-xs font-mono text-slate-200 resize-none placeholder-slate-600 leading-relaxed"></textarea>
    </div>

    <!-- Toggle button for Scratchpad -->
    <button id="floating-scratchpad-toggle-btn" class="fixed bottom-4 right-4 z-40 p-3 bg-teal-600 hover:bg-teal-500 border border-teal-500 hover:border-teal-400 text-slate-950 hover:text-white rounded-full shadow-[0_0_15px_rgba(20,184,166,0.3)] transition focus:outline-none flex items-center justify-center" aria-label="Toggle scratchpad" title="Toggle scratchpad">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    </button>
  <main>
    <h1>${R(r.title)}</h1>
    <div class="metadata">
      Slug: ${r.slug} &nbsp;|&nbsp; 
      Updated: ${new Date(r.updatedAt).toLocaleString()} &nbsp;|&nbsp;
      Tags: ${r.tags.map(l=>`<span class="badge">#${R(l)}</span>`).join("")}
    </div>
    <article class="wiki-content">
      ${a}
    </article>
  </main>
</body>
</html>`;e.push({name:`${r.slug}.html`,content:i})}),Ko(e)}function fi(s){const e=[];let t="",n=!1;for(let l=0;l<s.length;l++){const d=s[l];d==='"'?(n=!n,t+=d):d===`
`&&!n?(e.push(t),t=""):t+=d}if(t&&e.push(t),e.length<2)return[];const r=l=>{const d=[];let p="",g=!1;for(let m=0;m<l.length;m++){const u=l[m];u==='"'?g=!g:u===","&&!g?(d.push(o(p)),p=""):p+=u}return d.push(o(p)),d},o=l=>(l=l.trim(),l.startsWith('"')&&l.endsWith('"')&&(l=l.substring(1,l.length-1)),l.replace(/""/g,'"')),a=r(e[0]).map(l=>l.toLowerCase()),i=[];for(let l=1;l<e.length;l++){if(!e[l].trim())continue;const d=r(e[l]),p={};a.forEach((g,m)=>{p[g]=d[m]||""}),i.push(p)}return i}function mi(s){var i;const e=s.title||"Untitled CSV Import",t=s.content||"";let n=s.slug||e.toLowerCase().replace(/[^a-z0-9-_]+/g,"-");n=n.toLowerCase().replace(/[^a-z0-9-_]+/g,"-"),n||(n=`imported-${Date.now()}`);const o=(s.tags||"imported, csv").split(/[,;|]+/).map(l=>l.trim().toLowerCase()).filter(l=>l.length>0),a=s.updatedat?parseInt(s.updatedat):Date.now();return{slug:n,title:e,content:t,updatedAt:isNaN(a)?Date.now():a,tags:o,isSystem:!1,isEncrypted:((i=s.encrypted)==null?void 0:i.toLowerCase())==="true"}}function gi(s,e){const t=s.split(`
`),n=e.split(`
`),r=Array(t.length+1).fill(0).map(()=>Array(n.length+1).fill(0));for(let l=1;l<=t.length;l++)for(let d=1;d<=n.length;d++)t[l-1]===n[d-1]?r[l][d]=r[l-1][d-1]+1:r[l][d]=Math.max(r[l-1][d],r[l][d-1]);const o=[];let a=t.length,i=n.length;for(;a>0||i>0;)a>0&&i>0&&t[a-1]===n[i-1]?(o.unshift({type:"unchanged",text:t[a-1]}),a--,i--):i>0&&(a===0||r[a][i-1]>=r[a-1][i])?(o.unshift({type:"added",text:n[i-1]}),i--):(o.unshift({type:"removed",text:t[a-1]}),a--);return o}function hi(s,e){return new Promise(t=>{let n=document.getElementById("conflict-diff-modal");n||(n=document.createElement("div"),n.id="conflict-diff-modal",n.className="fixed inset-0 bg-[#090d16]/90 backdrop-blur-md z-[100] flex items-center justify-center p-4",document.body.appendChild(n)),n.classList.remove("hidden");const o=gi(s.content,e.content).map(a=>{let i="diff-line-unchanged",l=" ";return a.type==="added"?(i="diff-line-added px-1 rounded",l="+"):a.type==="removed"&&(i="diff-line-removed px-1 rounded",l="-"),`<div class="font-mono text-xs whitespace-pre-wrap ${i}">${l} ${R(a.text)}</div>`}).join(`
`);n.innerHTML=`
      <div class="glass-panel border border-teal-900/30 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col glow-border shadow-2xl">
        <div class="p-4 border-b border-slate-800 flex items-center justify-between shrink-0">
          <h3 class="text-sm font-bold font-mono text-white uppercase tracking-wider">Conflict Detected: ${R(s.slug)}</h3>
          <span class="text-[10px] font-mono bg-red-950/40 text-red-400 border border-red-900/30 px-2 py-0.5 rounded">SLUG DUP_WARN</span>
        </div>
        
        <div class="p-4 overflow-y-auto space-y-4 flex-1">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-slate-950/50 border border-slate-850 p-3 rounded-lg space-y-2">
              <h4 class="text-xs font-bold font-mono text-teal-400 uppercase">Existing Document</h4>
              <p class="text-xs font-mono text-white"><span class="text-slate-500">TITLE:</span> ${R(s.title)}</p>
              <p class="text-xs font-mono text-white"><span class="text-slate-500">TAGS:</span> ${s.tags.map(a=>`#${a}`).join(", ")}</p>
              <p class="text-[10px] font-mono text-slate-500"><span class="text-slate-500">MODIFIED:</span> ${new Date(s.updatedAt).toLocaleString()}</p>
            </div>
            
            <div class="bg-slate-950/50 border border-slate-850 p-3 rounded-lg space-y-2">
              <h4 class="text-xs font-bold font-mono text-teal-450 uppercase">Imported Document</h4>
              <p class="text-xs font-mono text-white"><span class="text-slate-500">TITLE:</span> ${R(e.title)}</p>
              <p class="text-xs font-mono text-white"><span class="text-slate-500">TAGS:</span> ${e.tags.map(a=>`#${a}`).join(", ")}</p>
              <p class="text-[10px] font-mono text-slate-500"><span class="text-slate-500">MODIFIED:</span> ${new Date(e.updatedAt).toLocaleString()}</p>
            </div>
          </div>
          
          <div class="space-y-1">
            <h4 class="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-wider">Line-by-line Content Diff (- Existing, + Imported)</h4>
            <div class="bg-slate-950 border border-slate-850 p-3 rounded-lg max-h-60 overflow-y-auto space-y-0.5">
              ${o}
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
    `,document.getElementById("diff-opt-skip").addEventListener("click",()=>{n.classList.add("hidden"),t("SKIP")}),document.getElementById("diff-opt-rename").addEventListener("click",()=>{n.classList.add("hidden"),t("MERGE_RENAME")}),document.getElementById("diff-opt-overwrite").addEventListener("click",()=>{n.classList.add("hidden"),t("OVERWRITE")}),document.getElementById("diff-opt-archive").addEventListener("click",()=>{n.classList.add("hidden"),t("REVISION")})})}async function Zn(s,e){const t=Kr(s),n=await We(t.slug);if(n){let r=e;if(e==="ASK"&&(r=await hi(n,t)),r==="SKIP")return!1;if(r==="REVISION")await vs({id:`${n.slug}-${Date.now()}`,slug:n.slug,title:n.title,content:n.content,updatedAt:n.updatedAt,isEncrypted:n.isEncrypted,tags:n.tags,classification:n.classification,signature:n.signature}),t.signature=await Qe(t),await Ue(t);else if(r==="OVERWRITE")t.signature=await Qe(t),await Ue(t);else if(r==="MERGE_RENAME"){let o=`${t.slug}-imported`,a=await We(o),i=1;for(;a;)o=`${t.slug}-imported-${i}`,a=await We(o),i++;t.slug=o,t.title=`${t.title} (Imported)`,t.signature=await Qe(t),await Ue(t)}}else t.signature=await Qe(t),await Ue(t);return!0}async function fo(s){var g,m;if(!s||s.length===0)return;const e=((g=document.getElementById("import-conflict-resolution"))==null?void 0:g.value)||"REVISION";let t=0,n=0,r=0,o=0,a=0,i=0,l=0,d=0,p=0;for(let u=0;u<s.length;u++){const A=s[u],U=(m=A.name.split(".").pop())==null?void 0:m.toLowerCase();U==="md"?await new Promise(E=>{const D=new FileReader;D.onload=async J=>{var S;try{const y=(S=J.target)==null?void 0:S.result,N=ci(A.name,y);await Zn(N,e)?t++:o++}catch{l++}E()},D.readAsText(A)}):U==="csv"?await new Promise(E=>{const D=new FileReader;D.onload=async J=>{var S;try{const y=(S=J.target)==null?void 0:S.result,N=fi(y);for(const w of N)try{const x=mi(w);await Zn(x,e)?n++:a++}catch{d++}}catch{d++}E()},D.readAsText(A)}):U==="json"&&await new Promise(E=>{const D=new FileReader;D.onload=async J=>{var S;try{const y=JSON.parse((S=J.target)==null?void 0:S.result);let N=y;if(y&&y.encrypted===!0&&y.payload){const x=prompt("Secure Backup: Enter password to decrypt database backup file:");if(x===null){p++,E();return}try{const F=await Re(x),H=await ye(y.payload,F);N=JSON.parse(H)}catch{alert("Backup Decryption Alert: Authentication failed. Invalid backup passphrase."),p++,E();return}}else y&&y.encrypted===!1&&y.payload&&(N=y.payload);const w=Array.isArray(N)?N:[N];for(const x of w)try{!x.slug&&x.title&&(x.slug=x.title.toLowerCase().replace(/[^a-z0-9-_]+/g,"-")),x.slug||(x.slug=`imported-item-${Date.now()}-${Math.floor(Math.random()*1e3)}`),x.title||(x.title=x.slug.replace(/[-_]+/g," ")),typeof x.tags=="string"&&(x.tags=x.tags.split(",").map(H=>H.trim()).filter(H=>H.length>0)),Array.isArray(x.tags)||(x.tags=[]),x.classification||(x.classification="UNCLASSIFIED"),typeof x.updatedAt!="number"&&(x.updatedAt=Date.now()),await Zn(x,e)?r++:i++}catch{p++}}catch{p++}E()},D.readAsText(A)})}alert(`INGESTION COMPLETED (Conflict resolution: ${e.toUpperCase()}):

Markdown (.md) files:
- Ingested: ${t}
- Skipped: ${o}
- Failed: ${l}

CSV files (rows):
- Ingested: ${n}
- Skipped: ${a}
- Failed: ${d}

JSON files (records):
- Ingested: ${r}
- Skipped: ${i}
- Failed: ${p}`),bt.postMessage("refresh"),await Ce(),await ue()}async function bi(){const s=document.getElementById("tag-color-palette-manager");if(!s)return;const e=Array.from(new Set(me.flatMap(a=>a.tags))),t=await vo();if(e.length===0){s.innerHTML='<p class="text-xs font-mono text-slate-500">No active document tags registered.</p>';return}let n='<div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">';for(const a of e){const i=t.find(d=>d.tag===a),l=i?i.color:"slate";n+=`
      <div class="flex items-center justify-between p-2 bg-slate-950/40 border border-slate-800 rounded">
        <span class="text-xs font-mono text-slate-400">#${R(a)}</span>
        <div class="flex gap-2 items-center">
          <button class="rename-tag-btn px-2 py-1 bg-slate-900 border border-slate-700 text-xs text-blue-400 hover:text-blue-300 rounded" data-tag="${R(a)}">Rename</button>
          <select class="tag-color-select bg-slate-900 border border-slate-850 text-xs font-mono text-slate-300 rounded px-2 py-1 focus:outline-none focus:border-teal-500 cursor-pointer" data-tag="${R(a)}"> border border-slate-850 text-xs font-mono text-slate-300 rounded px-2 py-1 focus:outline-none focus:border-teal-500 cursor-pointer" data-tag="${R(a)}">
          <option value="slate" ${l==="slate"?"selected":""}>SLATE GREY</option>
          <option value="emerald" ${l==="emerald"?"selected":""}>EMERALD GREEN</option>
          <option value="blue" ${l==="blue"?"selected":""}>BLUE TEAM</option>
          <option value="red" ${l==="red"?"selected":""}>RED TEAM</option>
          <option value="amber" ${l==="amber"?"selected":""}>AMBER CAUTION</option>
        </select>
        </div>
      </div>
    `}n+="</div>",s.innerHTML=n,s.querySelectorAll(".rename-tag-btn").forEach(a=>{a.addEventListener("click",async i=>{const l=i.currentTarget.getAttribute("data-tag"),d=prompt(`Rename tag "#${l}" to:`);if(d&&d.trim()&&d!==l){const p=d.trim().toLowerCase().replace(/[^a-z0-9-]/g,"");if(p.length>0){for(const g of me)g.tags.includes(l)&&(g.tags=g.tags.map(m=>m===l?p:m),await Ue(g));de("TAG_RENAME",`Renamed tag ${l} to ${p}`),await ue()}}})}),s.querySelectorAll(".tag-color-select").forEach(a=>{a.addEventListener("change",async i=>{const l=i.currentTarget.getAttribute("data-tag"),d=i.currentTarget.value;await Ia({tag:l,color:d}),await bs(),await ue()})})}function Ht(s){const e=Array.from(new Set(me.flatMap(w=>w.tags)));s.innerHTML=`
    <div class="space-y-6">
      <!-- Title -->
      <div class="border-b border-slate-800 pb-4">
        <h2 class="text-2xl font-bold font-mono text-white uppercase">System Operations Admin Console</h2>
        <p class="text-xs text-slate-500 font-mono">Diagnostic logs, backups, state sanitization, and security parameters.</p>
      </div>

      <!-- System Diagnostic Panel -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <span class="text-emerald-400 font-bold">${Uo()}</span>
            </li>
            <li class="flex justify-between">
              <span class="text-slate-500">ACTIVE VISUAL THEME:</span>
              <span class="text-emerald-400 font-bold">${pt.toUpperCase()}</span>
            </li>
            <li class="flex justify-between items-center py-0.5">
              <span class="text-slate-500">MASK ENCRYPTED CORES:</span>
              <label class="relative inline-flex items-center cursor-pointer select-none">
                <input type="checkbox" id="system-mask-encrypted-checkbox" class="sr-only peer" ${at?"checked":""}>
                <div class="w-7 h-4 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-450 after:border-slate-350 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-teal-600 peer-checked:after:bg-white"></div>
              </label>
            </li>
            <li class="flex justify-between items-center py-0.5">
              <span class="text-slate-500">DATABASE ENCRYPTION:</span>
              <label class="relative inline-flex items-center cursor-pointer select-none">
                <input type="checkbox" id="system-db-encrypted-checkbox" class="sr-only peer" ${localStorage.getItem("secops-wiki-db-encrypted")==="true"?"checked":""}>
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
              <select id="system-session-timeout-select" class="bg-slate-900 border border-slate-800 rounded px-1.5 py-0.5 text-[10px] font-mono text-slate-300 focus:outline-none focus:border-teal-500 cursor-pointer">
                <option value="5" ${parseInt(localStorage.getItem("secops-wiki-session-timeout")||"15",10)===5?"selected":""}>5 MIN</option>
                <option value="15" ${parseInt(localStorage.getItem("secops-wiki-session-timeout")||"15",10)===15?"selected":""}>15 MIN</option>
                <option value="30" ${parseInt(localStorage.getItem("secops-wiki-session-timeout")||"15",10)===30?"selected":""}>30 MIN</option>
                <option value="60" ${parseInt(localStorage.getItem("secops-wiki-session-timeout")||"15",10)===60?"selected":""}>1 HOUR</option>
                <option value="0" ${parseInt(localStorage.getItem("secops-wiki-session-timeout")||"15",10)===0?"selected":""}>NEVER</option>
              </select>
            </li>
          </ul>
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
            <select id="export-tag-filter" class="bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs font-mono text-slate-300 focus:outline-none focus:border-teal-500">
              <option value="ALL">ALL ARTICLES</option>
              ${e.map(w=>`
                <option value="${R(w)}">#${R(w)}</option>
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
            <select id="import-conflict-resolution" class="w-full py-2 bg-slate-900 border border-slate-850 hover:border-slate-700 text-slate-300 font-mono text-xs uppercase rounded transition focus:outline-none focus:border-teal-500 text-center cursor-pointer">
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
                <input type="file" id="system-unified-import-file" accept=".json,.md,.csv" multiple class="hidden">
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
  `;const t=document.getElementById("system-export-btn"),n=document.getElementById("system-export-zip-btn"),r=document.getElementById("system-export-web-zip-btn"),o=document.getElementById("system-export-csv-btn"),a=document.getElementById("system-export-html-btn"),i=document.getElementById("system-unified-import-file"),l=document.getElementById("system-reset-btn"),d=document.getElementById("total-articles-telemetry"),p=document.getElementById("db-health-diagnostics"),g=document.getElementById("system-drop-zone");d.textContent=me.length.toString();const m=document.getElementById("system-compact-btn");m&&m.addEventListener("click",async()=>{if(confirm("STORAGE OPTIMIZATION: This will delete older historical revisions, keeping only the single most recent revision for each page. Proceed?")){let w=0;const x=await hn();for(const F of x){const H=await ea(F.slug);if(H.length>1)for(let O=1;O<H.length;O++)await yo(H[O].id),w++}await de("REVISION_COMPACT",`Compacted revision history, purged ${w} historical entries.`),alert(`Revision compaction complete. Purged ${w} older revision logs.`),ue()}}),p&&Ai(p),bi();const u=()=>{const w=document.getElementById("export-tag-filter"),x=(w==null?void 0:w.value)||"ALL";return x==="ALL"?me:me.filter(F=>F.tags.includes(x))};t.addEventListener("click",async()=>{const w=u(),x=await Ca(),F={pages:w,attachments:x},H=prompt("Secure Backup: Enter a password to encrypt this database backup file (leave blank for plain JSON):");let O,j=`secops-wiki-backup-${Date.now()}.json`;if(H)try{const re=await Re(H),he=JSON.stringify(F,null,2),b={encrypted:!0,schemaVersion:4,payload:await rt(he,re)};O=new Blob([JSON.stringify(b,null,2)],{type:"application/json"}),j=`secops-wiki-encrypted-backup-${Date.now()}.json`}catch(re){alert(`Backup encryption failed: ${re.message}`);return}else{if(H===null)return;const re={encrypted:!1,schemaVersion:4,payload:F};O=new Blob([JSON.stringify(re,null,2)],{type:"application/json"})}const ae=URL.createObjectURL(O),se=document.createElement("a");se.href=ae,se.download=j,document.body.appendChild(se),se.click(),document.body.removeChild(se),URL.revokeObjectURL(ae)}),n.addEventListener("click",async()=>{const w=u(),x=[];for(const j of w){let ae=j.content;if(j.isEncrypted&&Z)try{ae=await ye(j.content,Z)}catch{}const se=`---
title: ${j.title}
slug: ${j.slug}
tags: ${j.tags.join(", ")}
updated: ${new Date(j.updatedAt).toISOString()}
encrypted: ${!!j.isEncrypted}
---

`;x.push({name:`${j.slug}.md`,content:se+ae})}const F=Ko(x),H=URL.createObjectURL(F),O=document.createElement("a");O.href=H,O.download=`secops-wiki-backup-${Date.now()}.zip`,document.body.appendChild(O),O.click(),document.body.removeChild(O),URL.revokeObjectURL(H)}),r.addEventListener("click",()=>{const w=u(),x=ui(w),F=URL.createObjectURL(x),H=document.createElement("a");H.href=F,H.download=`secops-wiki-web-${Date.now()}.zip`,document.body.appendChild(H),H.click(),document.body.removeChild(H),URL.revokeObjectURL(F)}),o.addEventListener("click",()=>{const w=u(),x=di(w),F=new Blob([x],{type:"text/csv;charset=utf-8;"}),H=URL.createObjectURL(F),O=document.createElement("a");O.href=H,O.download=`secops-wiki-report-${Date.now()}.csv`,document.body.appendChild(O),O.click(),document.body.removeChild(O),URL.revokeObjectURL(H)}),a.addEventListener("click",()=>{const w=u(),x=pi(w),F=new Blob([x],{type:"text/html;charset=utf-8;"}),H=URL.createObjectURL(F),O=document.createElement("a");O.href=H,O.download=`secops-wiki-book-${Date.now()}.html`,document.body.appendChild(O),O.click(),document.body.removeChild(O),URL.revokeObjectURL(H)}),i&&i.addEventListener("change",async w=>{const x=w.target.files;x&&x.length>0&&await fo(x)}),["dragenter","dragover","dragleave","drop"].forEach(w=>{g.addEventListener(w,x=>{x.preventDefault(),x.stopPropagation()},!1)}),["dragenter","dragover"].forEach(w=>{g.addEventListener(w,()=>{g.classList.add("border-teal-500","bg-teal-950/10")},!1)}),["dragleave","drop"].forEach(w=>{g.addEventListener(w,()=>{g.classList.remove("border-teal-500","bg-teal-950/10")},!1)}),g.addEventListener("drop",async w=>{const x=w.dataTransfer,F=x==null?void 0:x.files;F&&F.length>0&&await fo(F)}),g.addEventListener("click",()=>{i&&i.click()}),l.addEventListener("click",async()=>{const w=prompt('CRITICAL SECURITY WARNING: Type "WIPE" to verify you want to delete ALL wiki pages and custom documents:');if(w==="WIPE")try{if(await wo(),"caches"in window)try{const x=await caches.keys();for(const F of x)await caches.delete(F)}catch(x){console.warn("Failed to clear caches: ",x)}await cs(),await bs(),alert("Database successfully wiped, caches invalidated, and seeded with standard operating defaults."),localStorage.setItem("secops-wiki-last-update",Date.now().toString()),bt.postMessage("refresh"),await Ce(),window.location.hash="#/page/home"}catch(x){alert(`Reset failed: ${x.message}`)}else w!==null&&alert("Sanitization aborted. Confirmation keyword mismatch.")});const A=document.getElementById("system-session-timeout-select");A&&A.addEventListener("change",()=>{localStorage.setItem("secops-wiki-session-timeout",A.value),ys()});const U=document.getElementById("system-cache-bust-btn");U&&U.addEventListener("click",async()=>{if(confirm("CRITICAL DIAGNOSTICS: Purge cached service worker registrations and static asset cache buckets? This triggers an immediate application reload.")){if("serviceWorker"in navigator){const w=await navigator.serviceWorker.getRegistrations();for(const x of w)await x.unregister()}if("caches"in window){const w=await caches.keys();for(const x of w)await caches.delete(x)}alert("CACHE WIPE COMPLETED. Reloading system..."),window.location.reload()}});const E=document.getElementById("system-mask-encrypted-checkbox");E&&E.addEventListener("change",()=>{at=E.checked,localStorage.setItem("secops-wiki-mask-encrypted",at.toString()),Ce().then(()=>{ue()})});const D=document.getElementById("system-db-encrypted-checkbox");D&&D.addEventListener("change",async()=>{if(D.checked){const x=await ho("activate");if(!x){D.checked=!1;return}const F=Wo(x);if(!F.valid){alert(`SECURITY ERROR: Passphrase too weak.

${F.message}`),D.checked=!1;return}try{ge=await Re(x),localStorage.setItem("secops-wiki-db-encrypted","true");const O=await Wt();for(const j of O)j.isEncryptedAtRest||await Ue(j);alert("Database encryption successfully activated. All records are encrypted at rest."),await de("DB_ENCRYPTION_ENABLED","Activated database encryption-at-rest."),await Ce(),Ht(s)}catch(H){alert(`Activation failed: ${H.message}`),D.checked=!1}}else{const x=await ho("deactivate");if(!x){D.checked=!0;return}try{const F=await Re(x);if(!await It(F)){alert("Verification Failed: Incorrect master passphrase."),D.checked=!0;return}const O=await hn();localStorage.setItem("secops-wiki-db-encrypted","false"),localStorage.removeItem("secops-wiki-webauthn-gate"),localStorage.removeItem("secops-wiki-webauthn-payload"),localStorage.removeItem("secops-wiki-webauthn-salt"),ge=null;for(const j of O){const ae={slug:j.slug,title:j.title,content:j.content,tags:j.tags,isSystem:j.isSystem,isEncrypted:j.isEncrypted,signature:j.signature,updatedAt:j.updatedAt};await un(ae)}alert("Database encryption-at-rest successfully deactivated."),await de("DB_ENCRYPTION_DISABLED","Deactivated database encryption-at-rest."),await Ce(),Ht(s)}catch(F){alert(`Deactivation failed: ${F.message}`),D.checked=!0}}});const J=document.getElementById("system-webauthn-register-btn");J&&J.addEventListener("click",async()=>{localStorage.getItem("secops-wiki-webauthn-gate")==="true"?confirm("Are you sure you want to deregister biometric credentials?")&&(localStorage.removeItem("secops-wiki-webauthn-gate"),localStorage.removeItem("secops-wiki-webauthn-payload"),localStorage.removeItem("secops-wiki-webauthn-salt"),alert("Biometric unlock credentials removed."),await de("WEBAUTHN_DEREGISTER","Removed biometric credentials."),Ht(s)):await $i()}),Xn();const S=document.getElementById("system-prune-audit-btn");S&&S.addEventListener("click",async()=>{confirm("Audit Log Pruning: Confirm deletion of security logs older than 30 days?")&&(await So(30),await de("AUDIT_LOG_PRUNED","Manually pruned audit logs older than 30 days."),await Xn(),alert("Audit logs successfully pruned."))});const y=document.getElementById("system-wipe-audit-btn");y&&y.addEventListener("click",async()=>{confirm("CRITICAL ACTION: Are you sure you want to purge the security audit log registers?")&&(await ko(),await de("AUDIT_LOG_CLEARED","Security audit log register cleared."),await Xn())}),ls();const N=document.getElementById("system-wipe-all-drafts-btn");N&&N.addEventListener("click",()=>{if(confirm("CRITICAL WARN: Purge all unsaved document draft fragments in local storage?")){const w=[];for(let x=0;x<localStorage.length;x++){const F=localStorage.key(x)||"";F.startsWith("secops-wiki-draft-")&&w.push(F)}w.forEach(x=>localStorage.removeItem(x)),ls()}})}function ls(){const s=document.getElementById("system-drafts-recovery-list");if(!s)return;const e=[];for(let n=0;n<localStorage.length;n++){const r=localStorage.key(n)||"";r.startsWith("secops-wiki-draft-")&&e.push(r)}const t=e.map(n=>{try{const r=localStorage.getItem(n)||"",o=JSON.parse(r),a=n.substring(18);return{key:n,slug:a,title:o.title||"(Untitled)",updatedAt:o.updatedAt||Date.now(),size:r.length}}catch{return null}}).filter(n=>n!==null);if(t.length===0){s.innerHTML='<p class="text-xs font-mono text-slate-500">No unsaved drafts found in local storage.</p>';return}s.innerHTML=t.map(n=>`
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 first:pt-0">
      <div class="min-w-0">
        <p class="text-xs font-mono text-slate-350 truncate">DRAFT // ${R(n.title)}</p>
        <div class="flex items-center gap-2 mt-1 text-[9px] font-mono text-slate-500 uppercase">
          <span>SLUG: ${R(n.slug)}</span>
          <span>•</span>
          <span>SIZE: ${n.size} B</span>
          <span>•</span>
          <span>SAVED: ${new Date(n.updatedAt).toLocaleString()}</span>
        </div>
      </div>
      <div class="flex gap-2 shrink-0 self-start sm:self-auto">
        <button class="draft-action-restore px-2 py-1 bg-slate-900 border border-slate-800 hover:border-slate-700 text-teal-400 hover:text-teal-300 font-mono text-[10px] rounded transition uppercase" data-slug="${R(n.slug)}">
          Restore
        </button>
        <button class="draft-action-wipe px-2 py-1 bg-red-950/20 border border-red-900/30 hover:bg-red-900/30 text-red-400 hover:text-red-300 font-mono text-[10px] rounded transition uppercase" data-key="${R(n.key)}">
          Wipe
        </button>
      </div>
    </div>
  `).join(""),s.querySelectorAll(".draft-action-restore").forEach(n=>{n.addEventListener("click",r=>{const o=r.currentTarget.getAttribute("data-slug");et=!0,Me=o==="new",ee=o,window.location.hash=Me?"#/new":`#/edit/${o}`})}),s.querySelectorAll(".draft-action-wipe").forEach(n=>{n.addEventListener("click",r=>{const o=r.currentTarget.getAttribute("data-key");localStorage.removeItem(o),ls()})})}function Ft(){const s=document.getElementById("command-palette-backdrop");if(s)if(Fn=!Fn,Fn){s.classList.remove("hidden");const e=document.getElementById("command-palette-input");e&&(e.value="",e.focus()),Be=0,wn()}else s.classList.add("hidden")}function Xo(){if(document.getElementById("command-palette-backdrop"))return;const s=document.createElement("div");s.id="command-palette-backdrop",s.className="fixed inset-0 bg-[#090d16]/85 backdrop-blur-md z-50 flex items-start justify-center pt-20 hidden",s.innerHTML=`
    <div class="glass-panel border border-teal-900/30 rounded-xl w-full max-w-lg overflow-hidden shadow-2xl mx-4 glow-border">
      <input type="text" id="command-palette-input" placeholder="Search pages or run system commands..." class="w-full bg-slate-950/80 text-white font-mono text-sm p-4 outline-none border-b border-slate-800 focus:border-teal-500/30 placeholder-slate-500 transition">
      <div id="command-palette-results" class="max-h-80 overflow-y-auto divide-y divide-slate-850/40 p-2 space-y-1"></div>
    </div>
  `,document.body.appendChild(s);const e=document.getElementById("command-palette-input");e.addEventListener("input",()=>{Be=0,wn()}),e.addEventListener("keydown",yi),s.addEventListener("click",t=>{t.target===s&&Ft()})}function wn(){const s=document.getElementById("command-palette-input"),e=document.getElementById("command-palette-results");if(!e)return;const t=s?s.value.trim().toLowerCase():"",n=[{title:"CREATE NEW PAGE",subtitle:"Open the editor to establish a new document",icon:"➕",action:()=>{window.location.hash="#/new"}},{title:"TOGGLE THEME",subtitle:`Switch visual style (currently ${pt})`,icon:"🌓",action:()=>{qo()}},{title:"SYSTEM ADMIN",subtitle:"Access operations console and db diagnostics",icon:"⚙️",action:()=>{window.location.hash="#/system"}},{title:"TACTICAL MAP VIEW",subtitle:"Display interactive node relationship map",icon:"🗺️",action:()=>{window.location.hash="#/graph"}},{title:"PANIC PURGE PROTOCOL",subtitle:"Emergency self-destruct - wipes all data",icon:"🚨",action:()=>{const p=document.getElementById("system-panic-btn");p&&p.click()}}];let r="",o=0;const a=n.filter(p=>p.title.toLowerCase().includes(t)||p.subtitle.toLowerCase().includes(t));let i=[];t?i=me.map(p=>({page:p,score:Go(mt.find(g=>g.slug===p.slug)||p,t)})).filter(p=>p.score>0).sort((p,g)=>g.score-p.score):i=me.slice(0,5).map(p=>({page:p,score:0}));const l=a.length+i.length;Be>=l?Be=0:Be<0&&(Be=l-1),a.forEach(p=>{r+=`
      <div class="command-palette-item p-3 rounded-lg flex items-center justify-between cursor-pointer font-mono text-xs transition-all ${o===Be?"command-item-active bg-teal-950/20 text-teal-400 border-l-2 border-teal-500":"text-slate-400 hover:bg-slate-900/40 hover:text-slate-200"}" data-index="${o}">
        <div class="flex items-center gap-3">
          <span class="text-base">${p.icon}</span>
          <div>
            <div class="font-bold text-white uppercase">${p.title}</div>
            <div class="text-[10px] text-slate-500">${p.subtitle}</div>
          </div>
        </div>
        <span class="text-[10px] text-slate-650 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-900 uppercase">CMD</span>
      </div>
    `,o++}),i.forEach(p=>{const g=o===Be,m=p.page,u=mt.find(E=>E.slug===m.slug)||m,A=t?Hi(u.content,t):"",U=A?`<div class="text-[9px] text-teal-400/80 font-mono mt-0.5 max-w-md truncate">${R(A)}</div>`:"";r+=`
      <div class="command-palette-item p-3 rounded-lg flex items-center justify-between cursor-pointer font-mono text-xs transition-all ${g?"command-item-active bg-teal-950/20 text-teal-400 border-l-2 border-teal-500":"text-slate-400 hover:bg-slate-900/40 hover:text-slate-200"}" data-index="${o}">
        <div class="flex items-center gap-3 min-w-0">
          <span class="text-base shrink-0">${m.isEncrypted?"🔒":"📄"}</span>
          <div class="min-w-0">
            <div class="font-bold text-white truncate">${R(m.title)}</div>
            <div class="text-[10px] text-slate-500 truncate">Slug: ${R(m.slug)} ${m.tags.length?`• tags: #${m.tags.map(E=>R(E)).join(", #")}`:""}</div>
            ${U}
          </div>
        </div>
        <span class="text-[10px] text-slate-650 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-900 uppercase shrink-0">PAGE</span>
      </div>
    `,o++}),l===0&&(r='<div class="text-center py-6 text-xs text-slate-600 font-mono">No matching commands or pages found.</div>'),e.innerHTML=r,e.querySelectorAll(".command-palette-item").forEach(p=>{p.addEventListener("click",()=>{const g=parseInt(p.getAttribute("data-index")||"0",10);xi(g,a,i)})}),wi()}function xi(s,e,t){if(Ft(),s<e.length)e[s].action();else{const n=s-e.length;n<t.length&&(window.location.hash=`#/page/${t[n].page.slug}`)}}function yi(s){const e=document.getElementById("command-palette-results");if(!e)return;const t=e.querySelectorAll(".command-palette-item");if(t.length!==0)if(s.key==="ArrowDown")s.preventDefault(),Be=(Be+1)%t.length,wn();else if(s.key==="ArrowUp")s.preventDefault(),Be=(Be-1+t.length)%t.length,wn();else if(s.key==="Enter"){s.preventDefault();const n=e.querySelector(".command-item-active");n&&n.click()}else s.key==="Escape"&&(s.preventDefault(),Ft())}function wi(){const s=document.getElementById("command-palette-results");if(!s)return;const e=s.querySelector(".command-item-active");e&&e.scrollIntoView({block:"nearest"})}function vi(s){const e=document.getElementById("autocomplete-popup");e&&(e.classList.remove("hidden"),Jo(s))}function pn(){const s=document.getElementById("autocomplete-popup");s&&(s.classList.add("hidden"),cn=!1)}function Jo(s){const e=document.getElementById("autocomplete-popup");if(!e)return;const t=ss.toLowerCase().trim(),n=me.filter(o=>o.title.toLowerCase().includes(t)||o.slug.toLowerCase().includes(t));if(n.length===0){e.innerHTML='<div class="p-2 text-slate-500 italic">No matches found</div>';return}e.innerHTML=n.map((o,a)=>`
    <div class="editor-autocomplete-item p-2 cursor-pointer transition ${a===0?"active bg-teal-950/20 text-teal-400":"text-slate-400 hover:bg-slate-900/40 hover:text-slate-200"}" data-slug="${R(o.slug)}" data-title="${R(o.title)}">
      <span class="font-bold">${R(o.title)}</span>
      <span class="text-[9px] text-slate-500 block truncate">Slug: ${R(o.slug)}</span>
    </div>
  `).join(""),e.querySelectorAll(".editor-autocomplete-item").forEach(o=>{o.addEventListener("click",a=>{const i=a.currentTarget,l=i.getAttribute("data-slug")||"",d=i.getAttribute("data-title")||"";ki(s,d,l)})});const r=Ei(s,s.selectionStart);e.style.left=`${Math.min(s.clientWidth-260,Math.max(16,r.left))}px`,e.style.top=`${Math.min(s.clientHeight-100,Math.max(40,r.top+20))}px`}function Ei(s,e){const n=s.value.substring(0,e).split(`
`),r=n.length-1,o=n[r],a=8,i=20,l=16+o.length*a%(s.clientWidth-40),d=12+r*i-s.scrollTop;return{left:l,top:d}}function ki(s,e,t){const n=dn-2,r=s.selectionStart,o=s.value,a=`[${e}](#/page/${t})`;s.value=o.substring(0,n)+a+o.substring(r),s.focus(),s.selectionStart=n+a.length,s.selectionEnd=n+a.length,pn();const i=document.getElementById("live-preview-box");i&&(i.innerHTML=At(s.value))}async function Si(s,e,t){const n=await We(s);if(!n)return;let r=n.content;const o=!!n.isEncrypted;if(o){if(!Z){alert("Authentication Error: Decryption key is missing. Re-decrypt page first.");return}try{r=await ye(r,Z)}catch{alert("Decryption failure.");return}}let a=0;const i=/([-*+]\s+\[)([ xX])(\])/g,l=r.replace(i,(g,m,u,A)=>a===e?(a++,`${m}${t?"x":" "}${A}`):(a++,g));let d=l;o&&Z&&(d=await rt(l,Z)),n.content=d,n.updatedAt=Date.now(),n.signature=await Qe(n),await Ue(n),bt.postMessage("refresh"),await Ce();const p=document.getElementById("main-content");p&&await yn(p)}function Qo(s){const e=[],t=/(?:\(|"|^|\s)#\/page\/([a-z0-9-_]+)/g;let n;for(;(n=t.exec(s))!==null;)e.push(n[1].toLowerCase());return Array.from(new Set(e))}async function Ti(s){s.innerHTML=`
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
          <input type="text" id="map-search-input" placeholder="Search map nodes..." class="w-full bg-slate-950/90 border border-slate-800 focus:border-teal-500/50 hover:border-slate-700 rounded-lg py-1.5 px-3 text-xs text-slate-200 focus:outline-none transition font-mono shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
        </div>
        
        <!-- Controls Overlay -->
        <div class="absolute top-6 right-6 flex flex-col gap-2 z-10 select-none">
          <button id="map-zoom-in" title="Zoom In" class="w-8 h-8 flex items-center justify-center bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-teal-400 text-slate-400 font-bold rounded shadow transition focus:outline-none">＋</button>
          <button id="map-zoom-out" title="Zoom Out" class="w-8 h-8 flex items-center justify-center bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-teal-400 text-slate-400 font-bold rounded shadow transition focus:outline-none">－</button>
          <button id="map-zoom-reset" title="Reset View" class="w-8 h-8 flex items-center justify-center bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-teal-400 text-slate-400 text-[10px] font-mono rounded shadow transition focus:outline-none uppercase">RST</button>
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
  `;const e=document.getElementById("tactical-map-canvas");if(!e)return;const t=e.getContext("2d");if(!t)return;const n=window.devicePixelRatio||1,r=e.getBoundingClientRect();e.width=r.width*n,e.height=500*n,t.scale(n,n);const o=r.width,a=500;let i=1,l=0,d=0,p=!1,g=0,m=0;const u=me.map(v=>{const G=o/2+(Math.random()-.5)*100,_=a/2+(Math.random()-.5)*100;return{id:v.slug,title:v.title,x:G,y:_,vx:0,vy:0,radius:v.slug==="home"?14:10,isEncrypted:!!v.isEncrypted,isSystem:!!v.isSystem}}),A=[],U=new Set(u.map(v=>v.id));for(const v of me){let G=v.content;if(v.isEncrypted&&Z)try{G=await ye(v.content,Z)}catch{}Qo(G).forEach(P=>{U.has(P)&&P!==v.slug&&A.push({source:v.slug,target:P})})}let E=null,D=null,J=0,S=0,y=0,N="";const w=document.getElementById("map-search-input");w&&w.addEventListener("input",v=>{N=v.target.value.trim().toLowerCase()});const x=.02,F=1200,H=.85,O=.02;function j(v,G){const _=(v-o/2-l)/i+o/2,P=(G-a/2-d)/i+a/2;return{x:_,y:P}}function ae(){for(let v=0;v<u.length;v++){const G=u[v];for(let _=v+1;_<u.length;_++){const P=u[_],z=P.x-G.x,h=P.y-G.y,C=z*z+h*h+.1,k=Math.sqrt(C);if(k<250){const T=F/C,Y=z/k*T,q=h/k*T;G!==E&&(G.vx-=Y,G.vy-=q),P!==E&&(P.vx+=Y,P.vy+=q)}}}A.forEach(v=>{const G=u.find(Y=>Y.id===v.source),_=u.find(Y=>Y.id===v.target);if(!G||!_)return;const P=_.x-G.x,z=_.y-G.y,h=Math.sqrt(P*P+z*z)||.1,C=(h-100)*x,k=P/h*C,T=z/h*C;G!==E&&(G.vx+=k,G.vy+=T),_!==E&&(_.vx-=k,_.vy-=T)}),u.forEach(v=>{if(v===E)return;const G=o/2-v.x,_=a/2-v.y;v.vx+=G*O,v.vy+=_*O,v.x+=v.vx,v.y+=v.vy,v.vx*=H,v.vy*=H,v.x=Math.max(v.radius,Math.min(o-v.radius,v.x)),v.y=Math.max(v.radius,Math.min(a-v.radius,v.y))})}function se(){t.clearRect(0,0,o,a),t.save(),t.translate(o/2+l,a/2+d),t.scale(i,i),t.translate(-o/2,-a/2),t.lineWidth=1,A.forEach(v=>{const G=u.find(T=>T.id===v.source),_=u.find(T=>T.id===v.target);if(!G||!_)return;const P=N.length>0,z=P&&G.title.toLowerCase().includes(N),h=P&&_.title.toLowerCase().includes(N),C=D&&(D.id===G.id||D.id===_.id);let k=.4;P&&(k=z&&h?.6:.05),t.strokeStyle=C?"rgba(20, 184, 166, 0.6)":`rgba(30, 41, 59, ${k})`,t.lineWidth=C?1.5/i:1/i,t.beginPath(),t.moveTo(G.x,G.y),t.lineTo(_.x,_.y),t.stroke()}),u.forEach(v=>{t.beginPath();const G=N.length>0,_=G&&v.title.toLowerCase().includes(N);let P=v.radius,z=1,h=0;if(G)if(_){const q=Math.sin(Date.now()/150)*2+3;P=v.radius+q,h=15,z=1}else z=.2;t.arc(v.x,v.y,P,0,2*Math.PI);let C="#14b8a6",k="rgba(20, 184, 166, 0.4)";v.isEncrypted?(C="#ef4444",k="rgba(239, 68, 68, 0.4)"):v.isSystem&&(C="#3b82f6",k="rgba(59, 130, 246, 0.4)"),t.fillStyle=C,t.globalAlpha=z,t.shadowColor=k,t.shadowBlur=D===v?12:h||6,t.fill(),t.shadowBlur=0,t.strokeStyle=`rgba(255, 255, 255, ${.1*z})`,t.lineWidth=1.5/i,t.stroke();const Y=v.isEncrypted&&!Z&&at?"[REDACTED CORE]":v.title;t.fillStyle=D===v||_?`rgba(255, 255, 255, ${z})`:`rgba(148, 163, 184, ${z})`,t.font=D===v||_?`bold ${10/i}px monospace`:`${9/i}px monospace`,t.textAlign="center",t.fillText(Y,v.x,v.y-P-5/i)}),t.restore(),t.globalAlpha=1}function re(){ae(),se(),y=requestAnimationFrame(re)}e.addEventListener("mousemove",v=>{const G=e.getBoundingClientRect(),_=v.clientX-G.left,P=v.clientY-G.top,z=j(_,P);if(J=z.x,S=z.y,E){(Math.abs(v.clientX-W)>4||Math.abs(v.clientY-b)>4)&&(he=!0),E.x=J,E.y=S,E.vx=0,E.vy=0;return}if(p){l=_-g,d=P-m;return}D=null;for(const h of u){const C=h.x-J,k=h.y-S;if(C*C+k*k<(h.radius+5)*(h.radius+5)){D=h;break}}});let he=!1,W=0,b=0;e.addEventListener("mousedown",v=>{const G=e.getBoundingClientRect(),_=v.clientX-G.left,P=v.clientY-G.top;if(D){E=D,he=!1,W=v.clientX,b=v.clientY;const z=j(_,P);E.x=z.x,E.y=z.y}else p=!0,g=_-l,m=P-d}),e.addEventListener("wheel",v=>{v.preventDefault();const G=e.getBoundingClientRect(),_=v.clientX-G.left,P=v.clientY-G.top,z=j(_,P),h=v.deltaY<0?1.1:.9;i=Math.max(.2,Math.min(4,i*h)),l=_-(z.x-o/2)*i-o/2,d=P-(z.y-a/2)*i-a/2},{passive:!1});const $=()=>{E=null,p=!1};window.addEventListener("mouseup",$),e.addEventListener("click",()=>{D&&!he&&!p&&(cancelAnimationFrame(y),window.location.hash=`#/page/${D.id}`)});const K=document.getElementById("map-zoom-in"),V=document.getElementById("map-zoom-out"),B=document.getElementById("map-zoom-reset");K.addEventListener("click",()=>{i=Math.min(4,i*1.2)}),V.addEventListener("click",()=>{i=Math.max(.2,i/1.2)}),B.addEventListener("click",()=>{i=1,l=0,d=0}),re();const le=()=>{cancelAnimationFrame(y),window.removeEventListener("mouseup",$),window.removeEventListener("hashchange",le)};window.addEventListener("hashchange",le)}async function Ai(s){s.innerHTML=`
    <div class="text-xs font-mono text-slate-500 animate-pulse">Running security & link integrity scan...</div>
  `;const e=await hn();let t=0;const n=new TextEncoder;e.forEach(d=>{const p=JSON.stringify(d);t+=n.encode(p).length});const r=t<1024?`${t} Bytes`:t<1024*1024?`${(t/1024).toFixed(2)} KB`:`${(t/(1024*1024)).toFixed(2)} MB`,o=new Set(e.map(d=>d.slug)),a={};e.forEach(d=>{a[d.slug]=[]});const i=[];for(const d of e){let p=d.content;if(d.isEncrypted&&Z)try{p=await ye(d.content,Z)}catch{}Qo(p).forEach(m=>{o.has(m)?m!==d.slug&&a[m].push(d.slug):i.push({source:d.slug,target:m})})}const l=e.filter(d=>d.slug!=="home"&&a[d.slug].length===0);s.innerHTML=`
    <div class="glass-panel border border-slate-800 rounded-xl p-5 space-y-4 font-mono text-xs">
      <h3 class="text-sm font-bold font-mono text-white uppercase tracking-wider border-b border-slate-800 pb-2">Database Integrity Report</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-slate-950/50 border border-slate-850 p-3 rounded-lg text-center">
          <div class="text-[10px] text-slate-500 font-mono uppercase">Total Database Footprint</div>
          <div class="text-base font-bold text-teal-400 font-mono mt-1">${r}</div>
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
                <div class="text-[10px] text-red-400/80">📄 [${R(d.source)}] references non-existent [${R(d.target)}]</div>
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
                <div class="text-[10px] text-amber-500/80">📄 [${R(d.title)}] (slug: ${R(d.slug)}) has zero citations</div>
              `).join("")}
            </div>
          `}
        </div>
      </div>
    </div>
  `}let mt=[];async function Ii(){mt=[];for(const s of me){let e=s.content,t=s.title;if(s.isEncrypted&&Z&&s.slug===ee)try{e=await ye(s.content,Z)}catch{}mt.push({...s,content:e,title:t})}}async function vs(s){if(localStorage.getItem("secops-wiki-db-encrypted")==="true"&&ge){const t={title:s.title,content:s.content,isEncrypted:s.isEncrypted,updatedAt:s.updatedAt,tags:s.tags,classification:s.classification,signature:s.signature},n=await rt(JSON.stringify(t),ge),r={id:s.id,slug:s.slug,title:"[REDACTED AT REST]",content:"[REDACTED AT REST]",updatedAt:s.updatedAt,isEncryptedAtRest:!0,encryptedData:n};await Hs(r)}else await Hs(s);try{const t=await xo(s.slug);if(t.length>20)for(let n=20;n<t.length;n++)await yo(t[n].id)}catch(t){console.warn("Failed to compact revisions for slug:",s.slug,t)}}async function ea(s){const e=await xo(s),t=[];for(const n of e)if(n.isEncryptedAtRest&&n.encryptedData){if(!ge){t.push({id:n.id,slug:n.slug,title:"[DATABASE LOCKED]",content:"Master passphrase required to unlock this database record.",updatedAt:n.updatedAt,isEncrypted:!1});continue}try{const r=await ye(n.encryptedData,ge),o=JSON.parse(r);t.push({id:n.id,slug:n.slug,title:o.title,content:o.content,updatedAt:o.updatedAt,isEncrypted:o.isEncrypted,tags:o.tags,classification:o.classification,signature:o.signature})}catch(r){console.error("Failed to decrypt revision at rest:",r)}}else t.push(n);return t}async function It(s){const e=await Wt();for(const t of e)if(t.isEncryptedAtRest&&t.encryptedData)try{return await ye(t.encryptedData,s),!0}catch{return!1}return!0}function Li(){let s=document.getElementById("master-unlock-overlay");s||(s=document.createElement("div"),s.id="master-unlock-overlay",s.className="fixed inset-0 bg-[#060814]/98 backdrop-blur-xl z-[100] flex items-center justify-center p-4",document.body.appendChild(s));const t=localStorage.getItem("secops-wiki-webauthn-gate")==="true"?`
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
        <input type="password" id="master-unlock-input" placeholder="Enter Master Passphrase..." required class="w-full bg-slate-950/80 border border-slate-800 focus:border-red-500/50 rounded-lg p-3 text-sm text-slate-200 focus:outline-none transition font-mono text-center">
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
  `;const n=document.getElementById("master-unlock-form"),r=document.getElementById("master-unlock-input"),o=document.getElementById("master-unlock-error"),a=document.getElementById("master-unlock-wipe-btn"),i=document.getElementById("master-unlock-biometric-btn");setTimeout(()=>r==null?void 0:r.focus(),50),n.addEventListener("submit",async l=>{l.preventDefault(),o.classList.add("hidden");const d=r.value;try{const p=await Re(d);await It(p)?(ge=p,ta()):(o.classList.remove("hidden"),r.value="",r.focus(),await de("DECRYPT_FAIL","Master database unlock attempt with invalid passphrase."))}catch(p){o.textContent=`ERROR: ${p.message.toUpperCase()}`,o.classList.remove("hidden")}}),a.addEventListener("click",async()=>{confirm("CRITICAL ACTION: Are you sure you want to completely wipe this database? All encrypted records and system procedures will be permanently deleted.")&&prompt('Type "WIPE" to confirm sanitization:')==="WIPE"&&(await wo(),await cs(),localStorage.removeItem("secops-wiki-db-encrypted"),localStorage.removeItem("secops-wiki-webauthn-gate"),localStorage.removeItem("secops-wiki-webauthn-payload"),localStorage.removeItem("secops-wiki-webauthn-salt"),ge=null,s.remove(),alert("Database successfully wiped and reset to default plaintext configuration."),window.location.reload())}),i&&i.addEventListener("click",async()=>{await _i()})}function ta(){const s=document.getElementById("master-unlock-overlay");s&&s.remove(),de("SESSION_UNLOCK","Database session unlocked and decrypted at rest."),Ce().then(()=>{Yo(),Xo(),window.addEventListener("hashchange",xn),window.addEventListener("online",bn),window.addEventListener("offline",bn),xn()})}function Ci(s){const e=async t=>{const n=new FileReader;n.onload=async()=>{const r=n.result.split(",")[1],o=`att-${Date.now()}-${Math.random().toString(36).substring(2,9)}`;let a=Z||ge,i=r;if(a)try{i=await rt(r,a)}catch(m){console.error("Failed to encrypt attachment:",m)}const l={id:o,name:t.name,mimeType:t.type,data:i};await La(l),await de("ATTACHMENT_SAVE",`Saved attachment ${t.name} (ID: ${o}, size: ${t.size} bytes).`);const d=t.type.startsWith("image/")?`![${t.name}](attachment://${o})`:`[Attachment: ${t.name}](attachment://${o})`,p=s.selectionStart,g=s.selectionEnd;s.value=s.value.substring(0,p)+d+s.value.substring(g),s.selectionStart=s.selectionEnd=p+d.length,s.dispatchEvent(new Event("input"))},n.readAsDataURL(t)};s.addEventListener("dragover",t=>{t.preventDefault()}),s.addEventListener("drop",async t=>{var r;t.preventDefault();const n=(r=t.dataTransfer)==null?void 0:r.files;if(n&&n.length>0)for(let o=0;o<n.length;o++)await e(n[o])}),s.addEventListener("paste",async t=>{var r;const n=(r=t.clipboardData)==null?void 0:r.items;if(n){for(let o=0;o<n.length;o++)if(n[o].kind==="file"){const a=n[o].getAsFile();a&&await e(a)}}})}async function Ri(s){const e=s.querySelectorAll('img[src^="attachment://"]');for(const n of Array.from(e)){const r=n.src.replace("attachment://","").split("/").pop()||"",o=await Fs(r);if(o){const a=await mo(o);a&&(n.src=a)}}const t=s.querySelectorAll('a[href^="attachment://"]');for(const n of Array.from(t)){const r=n.href.replace("attachment://","").split("/").pop()||"",o=await Fs(r);if(o){const a=await mo(o);a&&(n.href=a,n.download=o.name)}}}async function mo(s){let e=s.data;if(e.includes(":")){let t=null;if(Z)try{t=await ye(e,Z)}catch{}if(!t&&ge)try{t=await ye(e,ge)}catch{}if(!t)return null;e=t}try{const t=atob(e),n=new Uint8Array(t.length);for(let o=0;o<t.length;o++)n[o]=t.charCodeAt(o);const r=new Blob([n],{type:s.mimeType});return URL.createObjectURL(r)}catch(t){return console.error("Failed to parse base64 for attachment:",t),null}}async function Xn(){const s=document.getElementById("system-audit-logs-list");if(!s)return;const e=await Eo();if(e.length===0){s.innerHTML='<p class="text-xs font-mono text-slate-500">No security audit logs found.</p>';return}s.innerHTML=`
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
            <td class="py-1.5 font-bold ${t.event.includes("FAIL")||t.event.includes("DELETE")||t.event.includes("WIPE")?"text-red-400":"text-teal-400"}">${R(t.event)}</td>
            <td class="py-1.5 text-slate-400 max-w-xs truncate" title="${R(t.details)}">${R(t.details)}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `}function Di(s){let e=document.getElementById("drawing-canvas-modal");e||(e=document.createElement("div"),e.id="drawing-canvas-modal",e.className="fixed inset-0 bg-[#090d16]/90 backdrop-blur-md z-50 flex items-center justify-center p-4",document.body.appendChild(e)),e.innerHTML=`
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
          <select id="draw-brush-size" class="bg-slate-900 border border-slate-800 rounded px-1.5 py-0.5 text-[10px] font-mono text-slate-300 focus:outline-none cursor-pointer">
            <option value="2">Thin (2px)</option>
            <option value="5" selected>Medium (5px)</option>
            <option value="10">Thick (10px)</option>
            <option value="20">Marker (20px)</option>
          </select>
        </div>
        
        <div class="flex items-center gap-2">
          <span class="text-[10px] font-mono text-slate-500 uppercase">Color:</span>
          <div class="flex gap-1" id="draw-color-palette">
            <button class="w-4 h-4 rounded-full border border-white bg-white" data-color="#ffffff"></button>
            <button class="w-4 h-4 rounded-full border border-transparent bg-teal-400" data-color="#2dd4bf"></button>
            <button class="w-4 h-4 rounded-full border border-transparent bg-emerald-400" data-color="#34d399"></button>
            <button class="w-4 h-4 rounded-full border border-transparent bg-blue-400" data-color="#60a5fa"></button>
            <button class="w-4 h-4 rounded-full border border-transparent bg-amber-400" data-color="#fbbf24"></button>
            <button class="w-4 h-4 rounded-full border border-transparent bg-red-400" data-color="#f87171"></button>
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
  `,e.classList.remove("hidden");const t=document.getElementById("sketch-canvas"),n=t.getContext("2d"),r=window.devicePixelRatio||1,o=600,a=350;t.width=o*r,t.height=a*r,t.style.width=`${o}px`,t.style.height=`${a}px`,n.scale(r,r),n.lineCap="round",n.lineJoin="round",n.strokeStyle="#ffffff",n.lineWidth=5,n.fillStyle="#060814",n.fillRect(0,0,o,a);let i=!1,l="pen",d="#ffffff",p=0,g=0,m;const u=[],A=[];u.push(n.getImageData(0,0,t.width,t.height));const U=W=>{const b=t.getBoundingClientRect(),$="touches"in W?W.touches[0].clientX:W.clientX,K="touches"in W?W.touches[0].clientY:W.clientY;return{x:($-b.left)*(o/b.width),y:(K-b.top)*(a/b.height)}},E=W=>{i=!0;const b=U(W);p=b.x,g=b.y,m=n.getImageData(0,0,t.width,t.height),(l==="pen"||l==="eraser")&&(n.beginPath(),n.moveTo(p,g)),W.preventDefault()},D=W=>{if(!i)return;const b=U(W),$=parseInt(F.value,10);if(l==="pen"||l==="eraser")n.lineTo(b.x,b.y),n.strokeStyle=l==="eraser"?"#060814":d,n.lineWidth=$,n.stroke();else if(n.putImageData(m,0,0),n.beginPath(),n.strokeStyle=d,n.lineWidth=$,l==="line")n.moveTo(p,g),n.lineTo(b.x,b.y),n.stroke();else if(l==="arrow"){n.moveTo(p,g),n.lineTo(b.x,b.y),n.stroke();const K=Math.atan2(b.y-g,b.x-p),V=Math.max(10,$*2.5);n.beginPath(),n.moveTo(b.x,b.y),n.lineTo(b.x-V*Math.cos(K-Math.PI/6),b.y-V*Math.sin(K-Math.PI/6)),n.lineTo(b.x-V*Math.cos(K+Math.PI/6),b.y-V*Math.sin(K+Math.PI/6)),n.closePath(),n.fillStyle=d,n.fill()}else if(l==="rect")n.rect(p,g,b.x-p,b.y-g),n.stroke();else if(l==="circle"){const K=Math.sqrt(Math.pow(b.x-p,2)+Math.pow(b.y-g,2));n.arc(p,g,K,0,2*Math.PI),n.stroke()}W.preventDefault()},J=()=>{i&&((l==="pen"||l==="eraser")&&n.closePath(),i=!1,u.push(n.getImageData(0,0,t.width,t.height)),A.length=0)},S=()=>{if(u.length>1){const W=u.pop();A.push(W);const b=u[u.length-1];n.putImageData(b,0,0)}},y=()=>{if(A.length>0){const W=A.pop();u.push(W),n.putImageData(W,0,0)}};t.addEventListener("mousedown",E),t.addEventListener("mousemove",D),window.addEventListener("mouseup",J),t.addEventListener("touchstart",E,{passive:!1}),t.addEventListener("touchmove",D,{passive:!1}),window.addEventListener("touchend",J);const N=W=>{W.ctrlKey&&W.key==="z"?(W.preventDefault(),S()):W.ctrlKey&&W.key==="y"&&(W.preventDefault(),y())};window.addEventListener("keydown",N);const w=["pen","eraser","line","arrow","rect","circle"],x=W=>{l=W,w.forEach(b=>{const $=document.getElementById(`draw-tool-${b}`);b===W?$.className="px-2 py-1 bg-teal-950/40 border border-teal-800 text-teal-400 font-mono text-[10px] rounded font-bold uppercase":$.className="px-2 py-1 bg-slate-900 border border-slate-850 text-slate-400 font-mono text-[10px] rounded hover:text-white uppercase"})};w.forEach(W=>{document.getElementById(`draw-tool-${W}`).addEventListener("click",()=>x(W))});const F=document.getElementById("draw-brush-size"),H=document.getElementById("draw-clear-btn"),O=document.getElementById("draw-cancel-btn"),j=document.getElementById("draw-save-btn"),ae=document.getElementById("draw-color-palette"),se=document.getElementById("draw-undo-btn"),re=document.getElementById("draw-redo-btn");ae.addEventListener("click",W=>{const b=W.target.closest("button");b&&(d=b.getAttribute("data-color")||"#ffffff",ae.querySelectorAll("button").forEach($=>$.classList.replace("border-white","border-transparent")),b.classList.replace("border-transparent","border-white"))}),H.addEventListener("click",()=>{confirm("Clear the canvas drawing?")&&(n.fillStyle="#060814",n.fillRect(0,0,o,a),u.push(n.getImageData(0,0,t.width,t.height)),A.length=0)}),se.addEventListener("click",S),re.addEventListener("click",y);const he=()=>{window.removeEventListener("mouseup",J),window.removeEventListener("touchend",J),window.removeEventListener("keydown",N),e.classList.add("hidden")};O.addEventListener("click",he),j.addEventListener("click",()=>{const b=`![Tactical Sketch](${t.toDataURL("image/png")})`,$=s.selectionStart,K=s.selectionEnd;s.value=s.value.substring(0,$)+b+s.value.substring(K),s.selectionStart=s.selectionEnd=$+b.length,s.dispatchEvent(new Event("input")),he()})}async function $i(){if(!ge){alert("Unlock Required: Unlock the database using your passphrase before registering biometric lock.");return}const s=prompt("Verify Identity: Enter your current master passphrase to bind to biometric unlock:");if(!s)return;const e=await Re(s);if(!await It(e)){alert("Verification Failed: Incorrect passphrase.");return}try{const n=crypto.getRandomValues(new Uint8Array(32)),r=await navigator.credentials.create({publicKey:{challenge:n,rp:{name:"SecOps Wiki",id:window.location.hostname||"localhost"},user:{id:crypto.getRandomValues(new Uint8Array(16)),name:"operator@secops.local",displayName:"SecOps Operator"},pubKeyCredParams:[{type:"public-key",alg:-7},{type:"public-key",alg:-257}],authenticatorSelection:{authenticatorAttachment:"platform",userVerification:"required"},timeout:6e4}});if(r){const o=new Uint8Array(r.rawId),a=Array.from(o).map(m=>m.toString(16).padStart(2,"0")).join(""),i=crypto.getRandomValues(new Uint8Array(32)),l=Array.from(i).map(m=>m.toString(16).padStart(2,"0")).join("");localStorage.setItem("secops-wiki-webauthn-salt",l);const d=`${a}:${l}`,p=await Re(d),g=await rt(s,p);localStorage.setItem("secops-wiki-webauthn-payload",g),localStorage.setItem("secops-wiki-webauthn-gate","true"),alert("Biometric credential successfully registered with WebAuthn platform gate."),await de("WEBAUTHN_REGISTER","Biometric credentials registered successfully."),Ht(document.getElementById("main-content"))}}catch(n){alert(`Biometric registration failed: ${n.message}`),await de("WEBAUTHN_FAIL",`Biometric registration failed: ${n.message}`)}}async function _i(){const s=localStorage.getItem("secops-wiki-webauthn-gate")==="true",e=localStorage.getItem("secops-wiki-webauthn-payload");if(!s||!e){alert("Biometric Unlock is not registered. Setup biometric credentials in settings first.");return}try{const t=crypto.getRandomValues(new Uint8Array(32)),n=await navigator.credentials.get({publicKey:{challenge:t,rpId:window.location.hostname||"localhost",userVerification:"required",timeout:6e4}});if(n){const r=new Uint8Array(n.rawId),o=Array.from(r).map(m=>m.toString(16).padStart(2,"0")).join(""),a=localStorage.getItem("secops-wiki-webauthn-salt")||"";if(!a)throw new Error("Biometric decryption salt is missing from storage.");const i=`${o}:${a}`,l=await Re(i),d=await ye(e,l),p=await Re(d);await It(p)?(ge=p,ta()):alert("Biometric validation failed: Stored credentials mismatch.")}}catch(t){alert(`Biometric verification failed: ${t.message}`),await de("WEBAUTHN_FAIL",`Biometric unlock failed: ${t.message}`)}}function Oi(s){const e={name:"Root",fullPath:"",children:{},pages:[]};for(const t of s)for(const n of t.tags){const r=n.split("/");let o=e,a="";for(let i=0;i<r.length;i++){const l=r[i].trim();l&&(a=a?`${a}/${l}`:l,o.children[l]||(o.children[l]={name:l,fullPath:a,children:{},pages:[]}),o=o.children[l])}o.pages.push(t)}return e}function na(s,e=0){let t="";const n=Object.keys(s.children).sort();for(const r of n){const o=s.children[r];if(!(Object.keys(o.children).length>0||o.pages.length>0))continue;const i=o.fullPath;t+=`
      <div class="tree-folder">
        <div class="tree-folder-header flex items-center gap-1.5 px-3 py-1 cursor-pointer hover:bg-slate-900/40 text-xs font-mono text-slate-450 select-none rounded-lg" data-path="${R(i)}" tabindex="0">
          <span class="tree-folder-icon text-[9px] transition-transform duration-200 text-slate-600" style="display: inline-block;">▶</span>
          <span>📁 ${R(o.name)}</span>
        </div>
        <div class="tree-folder-children hidden pl-3.5 space-y-0.5 animate-fade-in" data-path="${R(i)}">
          ${na(o,e+1)}
          ${o.pages.map(l=>{const d=ee===l.slug&&!et,p=l.isEncrypted&&!Z&&at,g=p?"[REDACTED CORE]":l.title;return`
              <a href="${p?"javascript:void(0)":`#/page/${l.slug}`}" ${p?`onclick="alert('SECURITY WARNING: Document is locked. Enter passphrase to decrypt cores first.');"`:""} class="flex items-center justify-between px-3 py-1 rounded-lg text-[11px] font-mono transition ${d?"bg-teal-950/20 text-teal-400 font-bold border-l border-teal-500":"text-slate-450 hover:bg-slate-900/30 hover:text-slate-200"}" tabindex="0">
                <span class="truncate flex items-center gap-1">
                  ${l.isEncrypted?"🔒":"⊙"} ${R(g)}
                </span>
              </a>
            `}).join("")}
        </div>
      </div>
    `}return t}function Ni(s){s.querySelectorAll("code.language-javascript-sandbox, code.language-html-sandbox").forEach(t=>{const n=t.parentElement;if(!n||n.tagName.toLowerCase()!=="pre"||n.querySelector(".sandbox-run-btn"))return;const r=t.classList.contains("language-html-sandbox"),o=t.textContent||"",a=document.createElement("button");a.className="sandbox-run-btn absolute top-2 right-12 px-2 py-0.5 bg-teal-950/40 border border-teal-800 text-teal-400 hover:text-teal-300 font-mono text-[9px] rounded uppercase font-bold transition z-10",a.textContent="Run Sandbox",n.classList.add("relative"),n.appendChild(a);const i=document.createElement("div");i.className="sandbox-iframe-wrapper mt-2 hidden border border-slate-800 rounded-lg overflow-hidden bg-slate-950",n.after(i),a.addEventListener("click",()=>{var d;if(i.classList.toggle("hidden"))a.textContent="Run Sandbox",i.innerHTML="";else{a.textContent="Close Sandbox",i.innerHTML=`
          <div class="bg-slate-900 px-3 py-1 border-b border-slate-800 flex justify-between items-center text-[10px] font-mono text-slate-400 select-none">
            <span>LIVE ISO-SANDBOX CONSOLE</span>
            <button class="sandbox-close-inner-btn text-red-400 hover:text-red-300 font-bold">CLOSE</button>
          </div>
          <iframe sandbox="allow-scripts" class="w-full h-64 bg-slate-950" id="sandbox-frame-${Date.now()}"></iframe>
        `;const p=i.querySelector("iframe");let g="";r?g=o:g=`
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
                    ${o}
                  } catch (err) {
                    log('ERROR:', err.message);
                  }
                <\/script>
              </body>
            </html>
          `,p.srcdoc=g,(d=i.querySelector(".sandbox-close-inner-btn"))==null||d.addEventListener("click",()=>{i.classList.add("hidden"),a.textContent="Run Sandbox",i.innerHTML=""})}})})}async function Pi(s){var a;const e=window.location.hash,t=e.indexOf("?");if(t===-1){s.innerHTML='<div class="glass-panel border border-red-950 p-6 rounded-xl text-center font-mono text-xs text-red-400">P2P IMPORT ERROR: Missing decryption parameters in link.</div>';return}const n=new URLSearchParams(e.substring(t)),r=n.get("data"),o=n.get("key");if(!r||!o){s.innerHTML='<div class="glass-panel border border-red-950 p-6 rounded-xl text-center font-mono text-xs text-red-400">P2P IMPORT ERROR: Invalid parameters.</div>';return}try{const i=await Re(o),l=atob(decodeURIComponent(r)),d=await ye(l,i),p=JSON.parse(d);s.innerHTML=`
      <div class="glass-panel border border-teal-905 rounded-xl p-6 space-y-6 glow-border">
        <div class="border-b border-slate-800 pb-4">
          <h2 class="text-xl font-bold font-mono text-white uppercase">Secure P2P Page Import</h2>
          <p class="text-xs text-slate-500 font-mono">Verify and import the decrypted document below into your offline storage.</p>
        </div>
        
        <div class="space-y-4">
          <div>
            <label class="block text-[10px] font-mono text-slate-500 uppercase">Document Title:</label>
            <div class="text-white font-mono text-sm font-bold mt-1">${R(p.title)}</div>
          </div>
          
          <div>
            <label class="block text-[10px] font-mono text-slate-500 uppercase">Associated Tags:</label>
            <div class="flex gap-1.5 mt-1">
              ${p.tags.map(g=>`<span class="bg-slate-900/60 text-slate-400 border border-slate-850 px-2 py-0.5 rounded text-[10px] font-mono">#${R(g)}</span>`).join("")}
            </div>
          </div>
          
          <div>
            <label class="block text-[10px] font-mono text-slate-500 uppercase">Decrypted Content Preview:</label>
            <div class="bg-slate-950/60 p-4 border border-slate-850 rounded-lg max-h-60 overflow-y-auto text-xs font-mono text-slate-350 wiki-content whitespace-pre-wrap mt-1">${R(p.content)}</div>
          </div>
        </div>
        
        <div class="flex justify-end gap-3 pt-4 border-t border-slate-800">
          <a href="#/page/home" class="px-4 py-2 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-350 font-mono text-xs uppercase rounded transition hover:text-white">Cancel</a>
          <button id="p2p-import-confirm-btn" class="px-4 py-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-mono text-xs uppercase rounded font-bold transition shadow-[0_0_10px_rgba(20,184,166,0.15)]">Import to Database</button>
        </div>
      </div>
    `,(a=document.getElementById("p2p-import-confirm-btn"))==null||a.addEventListener("click",async()=>{let g=p.title.toLowerCase().replace(/[^a-z0-9-_]+/g,"-");g||(g=`p2p-import-${Date.now()}`);let m=g,u=await We(m);if(u&&!confirm(`CONFLICT ALERT: A document with slug "${m}" already exists in your wiki database.

Click OK to overwrite the existing document.
Click Cancel to import it as a duplicate under an auto-generated title.`)){let E=1;for(;u;)m=`${g}-${E}`,u=await We(m),E++}const A={slug:m,title:p.title,content:p.content,tags:p.tags,updatedAt:Date.now()};A.signature=await Qe(A),await Ue(A),await de("P2P_IMPORT_SUCCESS",`Imported decrypted page: ${p.title} (slug: ${m})`),alert("Intel Entry imported successfully."),window.location.hash=`#/page/${m}`})}catch(i){s.innerHTML=`<div class="glass-panel border border-red-950 p-6 rounded-xl text-center font-mono text-xs text-red-400">P2P DECRYPTION ERROR: ${R(i.message)}</div>`}}document.addEventListener("DOMContentLoaded",ai);async function Mi(){setInterval(async()=>{try{const s=me;await Da({id:Date.now().toString(),timestamp:Date.now(),data:JSON.stringify(s)}),console.log("Background backup created")}catch(s){console.error("Backup failed",s)}},24*60*60*1e3)}Mi();window.renderKnowledgeGraph=function(s){const e=document.getElementById(s);if(!e)return;const t=e.getContext("2d");t&&(t.fillStyle="#fff",t.fillText("Knowledge Graph (Mock)",10,20))};function Bi(s){let e=JSON.parse(localStorage.getItem("secops-recent-pages")||"[]");e=e.filter(t=>t!==s),e.unshift(s),e=e.slice(0,5),localStorage.setItem("secops-recent-pages",JSON.stringify(e))}function Ui(s){const e=s.replace(/[#*`_\[\]()\-+]/g," ").replace(/<[^>]*>/g," ").toLowerCase(),t=new Set(["the","a","an","and","or","but","is","are","was","were","to","for","in","on","at","by","of","with","from","this","that","these","those","it","its","they","them","their","we","us","our","you","your","i","my","me","he","him","his","she","her","has","have","had","do","does","did","as","if","then","else","when","where","how","why","who","which","what","not","no","yes","can","will","should","would","could","may","might","must","about","into","than","also","some","any","all","more","most","other","been","being"]),n=e.split(/\s+/),r={};return n.forEach(o=>{const a=o.replace(/[^a-z0-9-]/g,"");a.length>3&&!t.has(a)&&!/^\d+$/.test(a)&&(r[a]=(r[a]||0)+1)}),Object.entries(r).sort((o,a)=>a[1]-o[1]).slice(0,5).map(o=>`${o[0]} (${o[1]})`)}async function zi(s){var t;const e=await Eo();e.sort((n,r)=>r.timestamp-n.timestamp),s.innerHTML=`
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
                <td class="py-2.5 px-4 font-bold text-teal-400 whitespace-nowrap">${R(n.event)}</td>
                <td class="py-2.5 px-4 text-slate-400 break-all">${R(n.details)}</td>
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
  `,(t=document.getElementById("clear-audit-logs-btn"))==null||t.addEventListener("click",async()=>{confirm("AUDIT WARNING: This will permanently delete the forensic audit trail. Continue?")&&(await ko(),de("AUDIT_CLEAR","Forensic audit trail manually cleared"),ue())})}function ji(){var e;if(document.getElementById("shortcut-cheat-sheet-modal"))return;const s=document.createElement("div");s.id="shortcut-cheat-sheet-modal",s.className="fixed inset-0 bg-black/85 z-[100] flex items-center justify-center p-4",s.innerHTML=`
    <div class="bg-slate-950 border border-slate-800 rounded-xl p-6 w-full max-w-md shadow-2xl glow-border">
      <div class="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
        <h3 class="text-sm font-bold font-mono text-white uppercase tracking-wider flex items-center gap-1.5">⌨️ Terminal Hotkeys</h3>
        <button id="close-shortcuts-modal" class="text-slate-500 hover:text-white font-bold font-mono text-xs focus:outline-none">✕</button>
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
  `,document.body.appendChild(s),(e=s.querySelector("#close-shortcuts-modal"))==null||e.addEventListener("click",()=>s.remove()),s.addEventListener("click",t=>{t.target===s&&s.remove()})}window.addEventListener("keydown",s=>{var e,t;s.key==="?"&&((e=document.activeElement)==null?void 0:e.tagName)!=="INPUT"&&((t=document.activeElement)==null?void 0:t.tagName)!=="TEXTAREA"&&(s.preventDefault(),ji())});function Hi(s,e){const t=s.toLowerCase().indexOf(e.toLowerCase());if(t===-1)return"";const n=Math.max(0,t-30),r=Math.min(s.length,t+e.length+40);let o=s.substring(n,r);return n>0&&(o="..."+o),r<s.length&&(o=o+"..."),o}let Jn=0;function go(){Jn++,Jn>=3&&(Jn=0,xs(Date.now()+30*1e3),de("SECURITY_LOCKOUT","Too many failed decryption attempts. Cooldown enforced."))}function Fi(s){const e=[];if(!s)return{score:0,feedback:["Enter password"]};let t=0;s.length>=8&&(t+=20),s.length>=12&&(t+=15),s.length>=16&&(t+=15);const n=/[a-z]/.test(s),r=/[A-Z]/.test(s),o=/[0-9]/.test(s),a=/[^A-Za-z0-9]/.test(s);return n?t+=10:e.push("Add lowercase letters"),r?t+=15:e.push("Add uppercase letters"),o?t+=10:e.push("Add numbers"),a?t+=15:e.push("Add special characters"),s.length<8&&(e.push("Must be at least 8 characters long"),t=Math.min(15,t)),{score:Math.min(100,t),feedback:e}}function ho(s){return new Promise(e=>{const t=document.createElement("div");t.className="fixed inset-0 bg-[#090d16]/90 backdrop-blur-md z-[100] flex items-center justify-center p-4";const n=s==="activate",r=n?"Derive Master Security Key":"Deactivate Database Encryption",o=n?"Establish a master password. This will be used to derive a strong AES-256 session key.":"Verify your master password to decrypt all records stored at rest.";t.innerHTML=`
      <div class="glass-panel border border-teal-900/30 rounded-xl w-full max-w-md p-6 space-y-6 glow-border shadow-2xl">
        <div class="space-y-2 text-center">
          <h3 class="text-lg font-bold font-mono text-white uppercase tracking-wider">${r}</h3>
          <p class="text-[10px] text-slate-500 font-mono">${o}</p>
        </div>
        
        <form id="passphrase-modal-form" class="space-y-4">
          <div>
            <input type="password" id="passphrase-modal-input" placeholder="ENTER PASSPHRASE..." required class="w-full bg-slate-950/80 border border-slate-800 focus:border-teal-500/50 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none transition font-mono text-center">
            
            ${n?`
              <!-- Passphrase strength indicator -->
              <div class="mt-3 space-y-2">
                <div class="flex justify-between items-center text-[9px] font-mono">
                  <span class="text-slate-505 text-slate-500">STRENGTH:</span>
                  <span id="passphrase-strength-label" class="text-red-400 font-bold">WEAK (0%)</span>
                </div>
                <div class="w-full h-1 bg-slate-900 rounded-full overflow-hidden">
                  <div id="passphrase-strength-bar" class="w-0 h-full bg-red-500 transition-all duration-300"></div>
                </div>
                <div id="passphrase-suggestions" class="text-[9px] font-mono text-slate-500 leading-relaxed list-disc pl-3 space-y-0.5"></div>
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
    `,document.body.appendChild(t);const a=t.querySelector("#passphrase-modal-input"),i=t.querySelector("#passphrase-modal-form"),l=t.querySelector("#passphrase-modal-cancel");if(setTimeout(()=>a.focus(),50),n){const d=t.querySelector("#passphrase-strength-label"),p=t.querySelector("#passphrase-strength-bar"),g=t.querySelector("#passphrase-suggestions");a.addEventListener("input",()=>{const m=a.value,u=Fi(m);let A="bg-red-500",U="text-red-400",E="WEAK";u.score>=80?(A="bg-emerald-500",U="text-emerald-400",E="EXCELLENT"):u.score>=50?(A="bg-amber-500",U="text-amber-400",E="GOOD"):u.score>=25&&(A="bg-yellow-500",U="text-yellow-400",E="FAIR"),p.className=`h-full ${A} transition-all duration-300`,p.style.width=`${u.score}%`,d.className=`${U} font-bold`,d.textContent=`${E} (${u.score}%)`,g.innerHTML=u.feedback.map(D=>`<div>• ${R(D)}</div>`).join("")})}l.addEventListener("click",()=>{t.remove(),e(null)}),i.addEventListener("submit",d=>{d.preventDefault();const p=a.value;t.remove(),e(p)})})}
