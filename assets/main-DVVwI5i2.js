var ur=Object.defineProperty;var Po=o=>{throw TypeError(o)};var fr=(o,e,t)=>e in o?ur(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t;var ce=(o,e,t)=>fr(o,typeof e!="symbol"?e+"":e,t),mr=(o,e,t)=>e.has(o)||Po("Cannot "+t);var Mo=(o,e,t)=>e.has(o)?Po("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(o):e.set(o,t);var Jt=(o,e,t)=>(mr(o,e,"access private method"),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();if(self!==top)try{window.top&&(window.top.location.href=window.location.href)}catch{window.location.href="about:blank"}else document.documentElement.classList.remove("clickjack-lock");const gr="secops-wiki-db",Me="pages",Be="revisions",hr=4;function Te(){return new Promise((o,e)=>{const t=indexedDB.open(gr,hr);t.onerror=()=>e(t.error),t.onsuccess=()=>{const n=t.result;n.onversionchange=()=>{n.close(),alert("SECURITY NOTICE: The database schema is being updated by another active session. This connection has been closed to prevent blocking. Please reload to resume."),window.location.reload()},o(n)},t.onupgradeneeded=()=>{const n=t.result;n.objectStoreNames.contains(Me)||n.createObjectStore(Me,{keyPath:"slug"}),n.objectStoreNames.contains(Be)||n.createObjectStore(Be,{keyPath:"id"}).createIndex("slug","slug",{unique:!1}),n.objectStoreNames.contains("tagColors")||n.createObjectStore("tagColors",{keyPath:"tag"}),n.objectStoreNames.contains("attachments")||n.createObjectStore("attachments",{keyPath:"id"}),n.objectStoreNames.contains("auditLogs")||n.createObjectStore("auditLogs",{keyPath:"id"})}})}async function br(o){const e=await Te();return new Promise((t,n)=>{const a=e.transaction(Me,"readonly").objectStore(Me).get(o);a.onerror=()=>n(a.error),a.onsuccess=()=>t(a.result||null)})}async function dn(o){const e=await Te();return new Promise((t,n)=>{const a=e.transaction(Me,"readwrite").objectStore(Me).put(o);a.onerror=()=>n(a.error),a.onsuccess=()=>t()})}async function us(o){await xr(o);const e=await Te();return new Promise((t,n)=>{const a=e.transaction(Me,"readwrite").objectStore(Me).delete(o);a.onerror=()=>n(a.error),a.onsuccess=()=>t()})}async function Ht(){const o=await Te();return new Promise((e,t)=>{const r=o.transaction(Me,"readonly").objectStore(Me).getAll();r.onerror=()=>t(r.error),r.onsuccess=()=>e(r.result||[])})}async function Bo(o){const e=await Te();return new Promise((t,n)=>{const a=e.transaction(Be,"readwrite").objectStore(Be).put(o);a.onerror=()=>n(a.error),a.onsuccess=()=>t()})}async function fs(o){const e=await Te();return new Promise((t,n)=>{const i=e.transaction(Be,"readonly").objectStore(Be).index("slug").getAll(o);i.onerror=()=>n(i.error),i.onsuccess=()=>{const l=i.result||[];l.sort((d,p)=>p.updatedAt-d.updatedAt),t(l)}})}async function xr(o){const e=await Te();return new Promise((t,n)=>{const i=e.transaction(Be,"readwrite").objectStore(Be).index("slug").openCursor(o);i.onerror=()=>n(i.error),i.onsuccess=()=>{const l=i.result;l?(l.delete(),l.continue()):t()}})}async function yr(o){const e=await Te();return new Promise((t,n)=>{const a=e.transaction(Be,"readwrite").objectStore(Be).delete(o);a.onerror=()=>n(a.error),a.onsuccess=()=>t()})}const wr=[{slug:"home",title:"Operations Dashboard",content:`# Secure Operations Center (SOC) Wiki

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
* Raw input strings are escaped to prevent Cross-Site Scripting (XSS).`,updatedAt:Date.now(),tags:["security","hardening"],isSystem:!0}];async function oo(){if((await Ht()).length===0)for(const e of wr)await dn(e)}async function ms(){const o=await Te();return new Promise((e,t)=>{const n=[Me,Be,"tagColors","attachments","auditLogs"],s=o.transaction(n,"readwrite"),r=s.objectStore(Me),a=s.objectStore(Be),i=s.objectStore("tagColors"),l=s.objectStore("attachments"),d=s.objectStore("auditLogs");r.clear(),a.clear(),i.clear(),l.clear(),d.clear(),s.oncomplete=()=>e(),s.onerror=()=>t(s.error)})}async function gs(){const o=await Te();return new Promise((e,t)=>{try{const r=o.transaction("tagColors","readonly").objectStore("tagColors").getAll();r.onerror=()=>t(r.error),r.onsuccess=()=>e(r.result||[])}catch{e([])}})}async function vr(o){const e=await Te();return new Promise((t,n)=>{const a=e.transaction("tagColors","readwrite").objectStore("tagColors").put(o);a.onerror=()=>n(a.error),a.onsuccess=()=>t()})}async function Er(o){const e=await Te();return new Promise((t,n)=>{const a=e.transaction("attachments","readwrite").objectStore("attachments").put(o);a.onerror=()=>n(a.error),a.onsuccess=()=>t()})}async function Uo(o){const e=await Te();return new Promise((t,n)=>{try{const a=e.transaction("attachments","readonly").objectStore("attachments").get(o);a.onerror=()=>n(a.error),a.onsuccess=()=>t(a.result||null)}catch{t(null)}})}async function kr(o){const e=await Te();return new Promise((t,n)=>{try{const a=e.transaction("auditLogs","readwrite").objectStore("auditLogs").put(o);a.onerror=()=>n(a.error),a.onsuccess=()=>t()}catch(s){console.error("Audit logging transaction failed:",s),t()}})}async function Sr(){const o=await Te();return new Promise((e,t)=>{try{const r=o.transaction("auditLogs","readonly").objectStore("auditLogs").getAll();r.onerror=()=>t(r.error),r.onsuccess=()=>{const a=r.result||[];a.sort((i,l)=>l.timestamp-i.timestamp),e(a)}}catch{e([])}})}async function Tr(){const o=await Te();return new Promise((e,t)=>{const r=o.transaction("auditLogs","readwrite").objectStore("auditLogs").clear();r.onerror=()=>t(r.error),r.onsuccess=()=>e()})}async function hs(o){const e=await Te(),t=Date.now()-o*24*60*60*1e3;return new Promise((n,s)=>{try{const i=e.transaction("auditLogs","readwrite").objectStore("auditLogs").openCursor();i.onerror=()=>s(i.error),i.onsuccess=()=>{const l=i.result;l?(l.value.timestamp<t&&l.delete(),l.continue()):n()}}catch(r){s(r)}})}/*! @license DOMPurify 3.4.11 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.4.11/LICENSE */function zo(o,e){(e==null||e>o.length)&&(e=o.length);for(var t=0,n=Array(e);t<e;t++)n[t]=o[t];return n}function Ar(o){if(Array.isArray(o))return o}function Ir(o,e){var t=o==null?null:typeof Symbol<"u"&&o[Symbol.iterator]||o["@@iterator"];if(t!=null){var n,s,r,a,i=[],l=!0,d=!1;try{if(r=(t=t.call(o)).next,e!==0)for(;!(l=(n=r.call(t)).done)&&(i.push(n.value),i.length!==e);l=!0);}catch(p){d=!0,s=p}finally{try{if(!l&&t.return!=null&&(a=t.return(),Object(a)!==a))return}finally{if(d)throw s}}return i}}function Lr(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Cr(o,e){return Ar(o)||Ir(o,e)||Rr(o,e)||Lr()}function Rr(o,e){if(o){if(typeof o=="string")return zo(o,e);var t={}.toString.call(o).slice(8,-1);return t==="Object"&&o.constructor&&(t=o.constructor.name),t==="Map"||t==="Set"?Array.from(o):t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?zo(o,e):void 0}}const bs=Object.entries,jo=Object.setPrototypeOf,Dr=Object.isFrozen,_r=Object.getPrototypeOf,$r=Object.getOwnPropertyDescriptor;let Ee=Object.freeze,Se=Object.seal,xt=Object.create,xs=typeof Reflect<"u"&&Reflect,Kn=xs.apply,Yn=xs.construct;Ee||(Ee=function(e){return e});Se||(Se=function(e){return e});Kn||(Kn=function(e,t){for(var n=arguments.length,s=new Array(n>2?n-2:0),r=2;r<n;r++)s[r-2]=arguments[r];return e.apply(t,s)});Yn||(Yn=function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),s=1;s<t;s++)n[s-1]=arguments[s];return new e(...n)});const Rt=me(Array.prototype.forEach),Or=me(Array.prototype.lastIndexOf),Ho=me(Array.prototype.pop),bt=me(Array.prototype.push),Nr=me(Array.prototype.splice),tt=Array.isArray,Nt=me(String.prototype.toLowerCase),Nn=me(String.prototype.toString),Fo=me(String.prototype.match),Dt=me(String.prototype.replace),Wo=me(String.prototype.indexOf),Pr=me(String.prototype.trim),Mr=me(Number.prototype.toString),Br=me(Boolean.prototype.toString),qo=typeof BigInt>"u"?null:me(BigInt.prototype.toString),Go=typeof Symbol>"u"?null:me(Symbol.prototype.toString),xe=me(Object.prototype.hasOwnProperty),_t=me(Object.prototype.toString),ve=me(RegExp.prototype.test),at=Ur(TypeError);function me(o){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var t=arguments.length,n=new Array(t>1?t-1:0),s=1;s<t;s++)n[s-1]=arguments[s];return Kn(o,e,n)}}function Ur(o){return function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return Yn(o,t)}}function ee(o,e){let t=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Nt;if(jo&&jo(o,null),!tt(e))return o;let n=e.length;for(;n--;){let s=e[n];if(typeof s=="string"){const r=t(s);r!==s&&(Dr(e)||(e[n]=r),s=r)}o[s]=!0}return o}function zr(o){for(let e=0;e<o.length;e++)xe(o,e)||(o[e]=null);return o}function De(o){const e=xt(null);for(const n of bs(o)){var t=Cr(n,2);const s=t[0],r=t[1];xe(o,s)&&(tt(r)?e[s]=zr(r):r&&typeof r=="object"&&r.constructor===Object?e[s]=De(r):e[s]=r)}return e}function jr(o){switch(typeof o){case"string":return o;case"number":return Mr(o);case"boolean":return Br(o);case"bigint":return qo?qo(o):"0";case"symbol":return Go?Go(o):"Symbol()";case"undefined":return _t(o);case"function":case"object":{if(o===null)return _t(o);const e=o,t=qe(e,"toString");if(typeof t=="function"){const n=t(e);return typeof n=="string"?n:_t(n)}return _t(o)}default:return _t(o)}}function qe(o,e){for(;o!==null;){const n=$r(o,e);if(n){if(n.get)return me(n.get);if(typeof n.value=="function")return me(n.value)}o=_r(o)}function t(){return null}return t}function Hr(o){try{return ve(o,""),!0}catch{return!1}}const Vo=Ee(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Pn=Ee(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Mn=Ee(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Fr=Ee(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Bn=Ee(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Wr=Ee(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Ko=Ee(["#text"]),Yo=Ee(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","command","commandfor","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns"]),Un=Ee(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Zo=Ee(["accent","accentunder","align","bevelled","close","columnalign","columnlines","columnspacing","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lquote","lspace","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Qt=Ee(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),qr=Se(/{{[\w\W]*|^[\w\W]*}}/g),Gr=Se(/<%[\w\W]*|^[\w\W]*%>/g),Vr=Se(/\${[\w\W]*/g),Kr=Se(/^data-[\-\w.\u00B7-\uFFFF]+$/),Yr=Se(/^aria-[\-\w]+$/),Xo=Se(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Zr=Se(/^(?:\w+script|data):/i),Xr=Se(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Jr=Se(/^html$/i),Qr=Se(/^[a-z][.\w]*(-[.\w]+)+$/i),Jo=Se(/<[/\w!]/g),ea=Se(/<[/\w]/g),ta=Se(/<\/no(script|embed|frames)/i),na=Se(/\/>/i),We={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,processingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},oa=function(){return typeof window>"u"?null:window},sa=function(e,t){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let n=null;const s="data-tt-policy-suffix";t&&t.hasAttribute(s)&&(n=t.getAttribute(s));const r="dompurify"+(n?"#"+n:"");try{return e.createPolicy(r,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+r+" could not be created."),null}},Qo=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}},et=function(e,t,n,s){return xe(e,t)&&tt(e[t])?ee(s.base?De(s.base):{},e[t],s.transform):n};function ys(){let o=arguments.length>0&&arguments[0]!==void 0?arguments[0]:oa();const e=k=>ys(k);if(e.version="3.4.11",e.removed=[],!o||!o.document||o.document.nodeType!==We.document||!o.Element)return e.isSupported=!1,e;let t=o.document;const n=t,s=n.currentScript;o.DocumentFragment;const r=o.HTMLTemplateElement,a=o.Node,i=o.Element,l=o.NodeFilter,d=o.NamedNodeMap;d===void 0&&(o.NamedNodeMap||o.MozNamedAttrMap),o.HTMLFormElement;const p=o.DOMParser,g=o.trustedTypes,m=i.prototype,u=qe(m,"cloneNode"),h=qe(m,"remove"),P=qe(m,"nextSibling"),x=qe(m,"childNodes"),D=qe(m,"parentNode"),K=qe(m,"shadowRoot"),G=qe(m,"attributes"),L=a&&a.prototype?qe(a.prototype,"nodeType"):null,b=a&&a.prototype?qe(a.prototype,"nodeName"):null;if(typeof r=="function"){const k=t.createElement("template");k.content&&k.content.ownerDocument&&(t=k.content.ownerDocument)}let v,I="",Y,z=!1,$=0;const J=function(){if($>0)throw at('A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted Types" section of the README.')},N=function(c){J(),$++;try{return v.createHTML(c)}finally{$--}},Z=function(c){J(),$++;try{return v.createScriptURL(c)}finally{$--}},te=function(){return z||(Y=sa(g,s),z=!0),Y},U=t,A=U.implementation,S=U.createNodeIterator,Q=U.createDocumentFragment,j=U.getElementsByTagName,y=n.importNode;let T=Qo();e.isSupported=typeof bs=="function"&&typeof D=="function"&&A&&A.createHTMLDocument!==void 0;const B=qr,W=Gr,se=Vr,w=Kr,M=Yr,C=Zr,O=Xr,q=Qr;let ae=Xo,H=null;const ye=ee({},[...Vo,...Pn,...Mn,...Bn,...Ko]);let X=null;const we=ee({},[...Yo,...Un,...Zo,...Qt]);let ie=Object.seal(xt(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Ce=null,he=null;const _e=Object.seal(xt(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let Tt=!0,At=!0,ho=!1,bo=!0,Je=!1,It=!0,st=!1,yn=!1,wn=null,vn=null,En=!1,ut=!1,qt=!1,Gt=!1,xo=!0,yo=!1;const wo="user-content-";let kn=!0,Sn=!1,ft={},He=null;const Tn=ee({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","selectedcontent","style","svg","template","thead","title","video","xmp"]);let vo=null;const Eo=ee({},["audio","video","img","source","image","track"]);let An=null;const ko=ee({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Vt="http://www.w3.org/1998/Math/MathML",Kt="http://www.w3.org/2000/svg",Fe="http://www.w3.org/1999/xhtml";let mt=Fe,In=!1,Ln=null;const Zs=ee({},[Vt,Kt,Fe],Nn),So=Ee(["mi","mo","mn","ms","mtext"]);let Cn=ee({},So);const To=Ee(["annotation-xml"]);let Rn=ee({},To);const Xs=ee({},["title","style","font","a","script"]);let Lt=null;const Js=["application/xhtml+xml","text/html"],Qs="text/html";let de=null,gt=null;const er=t.createElement("form"),Ao=function(c){return c instanceof RegExp||c instanceof Function},Dn=function(){let c=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(gt&&gt===c)return;(!c||typeof c!="object")&&(c={}),c=De(c),Lt=Js.indexOf(c.PARSER_MEDIA_TYPE)===-1?Qs:c.PARSER_MEDIA_TYPE,de=Lt==="application/xhtml+xml"?Nn:Nt,H=et(c,"ALLOWED_TAGS",ye,{transform:de}),X=et(c,"ALLOWED_ATTR",we,{transform:de}),Ln=et(c,"ALLOWED_NAMESPACES",Zs,{transform:Nn}),An=et(c,"ADD_URI_SAFE_ATTR",ko,{transform:de,base:ko}),vo=et(c,"ADD_DATA_URI_TAGS",Eo,{transform:de,base:Eo}),He=et(c,"FORBID_CONTENTS",Tn,{transform:de}),Ce=et(c,"FORBID_TAGS",De({}),{transform:de}),he=et(c,"FORBID_ATTR",De({}),{transform:de}),ft=xe(c,"USE_PROFILES")?c.USE_PROFILES&&typeof c.USE_PROFILES=="object"?De(c.USE_PROFILES):c.USE_PROFILES:!1,Tt=c.ALLOW_ARIA_ATTR!==!1,At=c.ALLOW_DATA_ATTR!==!1,ho=c.ALLOW_UNKNOWN_PROTOCOLS||!1,bo=c.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Je=c.SAFE_FOR_TEMPLATES||!1,It=c.SAFE_FOR_XML!==!1,st=c.WHOLE_DOCUMENT||!1,ut=c.RETURN_DOM||!1,qt=c.RETURN_DOM_FRAGMENT||!1,Gt=c.RETURN_TRUSTED_TYPE||!1,En=c.FORCE_BODY||!1,xo=c.SANITIZE_DOM!==!1,yo=c.SANITIZE_NAMED_PROPS||!1,kn=c.KEEP_CONTENT!==!1,Sn=c.IN_PLACE||!1,ae=Hr(c.ALLOWED_URI_REGEXP)?c.ALLOWED_URI_REGEXP:Xo,mt=typeof c.NAMESPACE=="string"?c.NAMESPACE:Fe,Cn=xe(c,"MATHML_TEXT_INTEGRATION_POINTS")&&c.MATHML_TEXT_INTEGRATION_POINTS&&typeof c.MATHML_TEXT_INTEGRATION_POINTS=="object"?De(c.MATHML_TEXT_INTEGRATION_POINTS):ee({},So),Rn=xe(c,"HTML_INTEGRATION_POINTS")&&c.HTML_INTEGRATION_POINTS&&typeof c.HTML_INTEGRATION_POINTS=="object"?De(c.HTML_INTEGRATION_POINTS):ee({},To);const f=xe(c,"CUSTOM_ELEMENT_HANDLING")&&c.CUSTOM_ELEMENT_HANDLING&&typeof c.CUSTOM_ELEMENT_HANDLING=="object"?De(c.CUSTOM_ELEMENT_HANDLING):xt(null);if(ie=xt(null),xe(f,"tagNameCheck")&&Ao(f.tagNameCheck)&&(ie.tagNameCheck=f.tagNameCheck),xe(f,"attributeNameCheck")&&Ao(f.attributeNameCheck)&&(ie.attributeNameCheck=f.attributeNameCheck),xe(f,"allowCustomizedBuiltInElements")&&typeof f.allowCustomizedBuiltInElements=="boolean"&&(ie.allowCustomizedBuiltInElements=f.allowCustomizedBuiltInElements),Se(ie),Je&&(At=!1),qt&&(ut=!0),ft&&(H=ee({},Ko),X=xt(null),ft.html===!0&&(ee(H,Vo),ee(X,Yo)),ft.svg===!0&&(ee(H,Pn),ee(X,Un),ee(X,Qt)),ft.svgFilters===!0&&(ee(H,Mn),ee(X,Un),ee(X,Qt)),ft.mathMl===!0&&(ee(H,Bn),ee(X,Zo),ee(X,Qt))),_e.tagCheck=null,_e.attributeCheck=null,xe(c,"ADD_TAGS")&&(typeof c.ADD_TAGS=="function"?_e.tagCheck=c.ADD_TAGS:tt(c.ADD_TAGS)&&(H===ye&&(H=De(H)),ee(H,c.ADD_TAGS,de))),xe(c,"ADD_ATTR")&&(typeof c.ADD_ATTR=="function"?_e.attributeCheck=c.ADD_ATTR:tt(c.ADD_ATTR)&&(X===we&&(X=De(X)),ee(X,c.ADD_ATTR,de))),xe(c,"ADD_URI_SAFE_ATTR")&&tt(c.ADD_URI_SAFE_ATTR)&&ee(An,c.ADD_URI_SAFE_ATTR,de),xe(c,"FORBID_CONTENTS")&&tt(c.FORBID_CONTENTS)&&(He===Tn&&(He=De(He)),ee(He,c.FORBID_CONTENTS,de)),xe(c,"ADD_FORBID_CONTENTS")&&tt(c.ADD_FORBID_CONTENTS)&&(He===Tn&&(He=De(He)),ee(He,c.ADD_FORBID_CONTENTS,de)),kn&&(H["#text"]=!0),st&&ee(H,["html","head","body"]),H.table&&(ee(H,["tbody"]),delete Ce.tbody),c.TRUSTED_TYPES_POLICY){if(typeof c.TRUSTED_TYPES_POLICY.createHTML!="function")throw at('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof c.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw at('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');const E=v;v=c.TRUSTED_TYPES_POLICY;try{I=N("")}catch(_){throw v=E,_}}else c.TRUSTED_TYPES_POLICY===null?(v=void 0,I=""):(v===void 0&&(v=te()),v&&typeof I=="string"&&(I=N("")));Ee&&Ee(c),gt=c},Io=ee({},[...Pn,...Mn,...Fr]),Lo=ee({},[...Bn,...Wr]),tr=function(c,f,E){return f.namespaceURI===Fe?c==="svg":f.namespaceURI===Vt?c==="svg"&&(E==="annotation-xml"||Cn[E]):!!Io[c]},nr=function(c,f,E){return f.namespaceURI===Fe?c==="math":f.namespaceURI===Kt?c==="math"&&Rn[E]:!!Lo[c]},or=function(c,f,E){return f.namespaceURI===Kt&&!Rn[E]||f.namespaceURI===Vt&&!Cn[E]?!1:!Lo[c]&&(Xs[c]||!Io[c])},sr=function(c){let f=D(c);(!f||!f.tagName)&&(f={namespaceURI:mt,tagName:"template"});const E=Nt(c.tagName),_=Nt(f.tagName);return Ln[c.namespaceURI]?c.namespaceURI===Kt?tr(E,f,_):c.namespaceURI===Vt?nr(E,f,_):c.namespaceURI===Fe?or(E,f,_):!!(Lt==="application/xhtml+xml"&&Ln[c.namespaceURI]):!1},Qe=function(c){bt(e.removed,{element:c});try{D(c).removeChild(c)}catch{if(h(c),!D(c))throw at("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place")}},Co=function(c){const f=x(c);if(f){const _=[];Rt(f,V=>{bt(_,V)}),Rt(_,V=>{try{h(V)}catch{}})}const E=G(c);if(E)for(let _=E.length-1;_>=0;--_){const V=E[_],ne=V&&V.name;if(typeof ne=="string")try{c.removeAttribute(ne)}catch{}}},rt=function(c,f){try{bt(e.removed,{attribute:f.getAttributeNode(c),from:f})}catch{bt(e.removed,{attribute:null,from:f})}if(f.removeAttribute(c),c==="is")if(ut||qt)try{Qe(f)}catch{}else try{f.setAttribute(c,"")}catch{}},rr=function(c){const f=G(c);if(f)for(let E=f.length-1;E>=0;--E){const _=f[E],V=_&&_.name;if(!(typeof V!="string"||X[de(V)]))try{c.removeAttribute(V)}catch{}}},ar=function(c){const f=[c];for(;f.length>0;){const E=f.pop();(L?L(E):E.nodeType)===We.element&&rr(E);const V=x(E);if(V)for(let ne=V.length-1;ne>=0;--ne)f.push(V[ne])}},Ro=function(c){let f=null,E=null;if(En)c="<remove></remove>"+c;else{const ne=Fo(c,/^[\r\n\t ]+/);E=ne&&ne[0]}Lt==="application/xhtml+xml"&&mt===Fe&&(c='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+c+"</body></html>");const _=v?N(c):c;if(mt===Fe)try{f=new p().parseFromString(_,Lt)}catch{}if(!f||!f.documentElement){f=A.createDocument(mt,"template",null);try{f.documentElement.innerHTML=In?I:_}catch{}}const V=f.body||f.documentElement;return c&&E&&V.insertBefore(t.createTextNode(E),V.childNodes[0]||null),mt===Fe?j.call(f,st?"html":"body")[0]:st?f.documentElement:V},Do=function(c){return S.call(c.ownerDocument||c,c,l.SHOW_ELEMENT|l.SHOW_COMMENT|l.SHOW_TEXT|l.SHOW_PROCESSING_INSTRUCTION|l.SHOW_CDATA_SECTION,null)},Yt=function(c){return c=Dt(c,B," "),c=Dt(c,W," "),c=Dt(c,se," "),c},_n=function(c){var f;c.normalize();const E=S.call(c.ownerDocument||c,c,l.SHOW_TEXT|l.SHOW_COMMENT|l.SHOW_CDATA_SECTION|l.SHOW_PROCESSING_INSTRUCTION,null);let _=E.nextNode();for(;_;)_.data=Yt(_.data),_=E.nextNode();const V=(f=c.querySelectorAll)===null||f===void 0?void 0:f.call(c,"template");V&&Rt(V,ne=>{ht(ne.content)&&_n(ne.content)})},Zt=function(c){const f=b?b(c):null;return typeof f!="string"||de(f)!=="form"?!1:typeof c.nodeName!="string"||typeof c.textContent!="string"||typeof c.removeChild!="function"||c.attributes!==G(c)||typeof c.removeAttribute!="function"||typeof c.setAttribute!="function"||typeof c.namespaceURI!="string"||typeof c.insertBefore!="function"||typeof c.hasChildNodes!="function"||c.nodeType!==L(c)||c.childNodes!==x(c)},ht=function(c){if(!L||typeof c!="object"||c===null)return!1;try{return L(c)===We.documentFragment}catch{return!1}},Ct=function(c){if(!L||typeof c!="object"||c===null)return!1;try{return typeof L(c)=="number"}catch{return!1}};function Ye(k,c,f){k.length!==0&&Rt(k,E=>{E.call(e,c,f,gt)})}const ir=function(c,f){return!!(It&&c.hasChildNodes()&&!Ct(c.firstElementChild)&&ve(Jo,c.textContent)&&ve(Jo,c.innerHTML)||It&&c.namespaceURI===Fe&&f==="style"&&Ct(c.firstElementChild)||c.nodeType===We.processingInstruction||It&&c.nodeType===We.comment&&ve(ea,c.data))},lr=function(c,f){if(!Ce[f]&&Oo(f)&&(ie.tagNameCheck instanceof RegExp&&ve(ie.tagNameCheck,f)||ie.tagNameCheck instanceof Function&&ie.tagNameCheck(f)))return!1;if(kn&&!He[f]){const E=D(c),_=x(c);if(_&&E){const V=_.length;for(let ne=V-1;ne>=0;--ne){const be=Sn?_[ne]:u(_[ne],!0);E.insertBefore(be,P(c))}}}return Qe(c),!0},_o=function(c){if(Ye(T.beforeSanitizeElements,c,null),Zt(c))return Qe(c),!0;const f=de(b?b(c):c.nodeName);if(Ye(T.uponSanitizeElement,c,{tagName:f,allowedTags:H}),ir(c,f))return Qe(c),!0;if(Ce[f]||!(_e.tagCheck instanceof Function&&_e.tagCheck(f))&&!H[f])return lr(c,f);if((L?L(c):c.nodeType)===We.element&&!sr(c)||(f==="noscript"||f==="noembed"||f==="noframes")&&ve(ta,c.innerHTML))return Qe(c),!0;if(Je&&c.nodeType===We.text){const _=Yt(c.textContent);c.textContent!==_&&(bt(e.removed,{element:c.cloneNode()}),c.textContent=_)}return Ye(T.afterSanitizeElements,c,null),!1},$o=function(c,f,E){if(he[f]||xo&&(f==="id"||f==="name")&&(E in t||E in er))return!1;const _=X[f]||_e.attributeCheck instanceof Function&&_e.attributeCheck(f,c);if(!(At&&ve(w,f))){if(!(Tt&&ve(M,f))){if(_){if(!An[f]){if(!ve(ae,Dt(E,O,""))){if(!((f==="src"||f==="xlink:href"||f==="href")&&c!=="script"&&Wo(E,"data:")===0&&vo[c])){if(!(ho&&!ve(C,Dt(E,O,"")))){if(E)return!1}}}}}else if(!(Oo(c)&&(ie.tagNameCheck instanceof RegExp&&ve(ie.tagNameCheck,c)||ie.tagNameCheck instanceof Function&&ie.tagNameCheck(c))&&(ie.attributeNameCheck instanceof RegExp&&ve(ie.attributeNameCheck,f)||ie.attributeNameCheck instanceof Function&&ie.attributeNameCheck(f,c))||f==="is"&&ie.allowCustomizedBuiltInElements&&(ie.tagNameCheck instanceof RegExp&&ve(ie.tagNameCheck,E)||ie.tagNameCheck instanceof Function&&ie.tagNameCheck(E))))return!1}}return!0},cr=ee({},["annotation-xml","color-profile","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","missing-glyph"]),Oo=function(c){return!cr[Nt(c)]&&ve(q,c)},dr=function(c,f,E,_){if(v&&typeof g=="object"&&typeof g.getAttributeType=="function"&&!E)switch(g.getAttributeType(c,f)){case"TrustedHTML":return N(_);case"TrustedScriptURL":return Z(_)}return _},pr=function(c,f,E,_){try{E?c.setAttributeNS(E,f,_):c.setAttribute(f,_),Zt(c)?Qe(c):Ho(e.removed)}catch{rt(f,c)}},No=function(c){Ye(T.beforeSanitizeAttributes,c,null);const f=c.attributes;if(!f||Zt(c))return;const E={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:X,forceKeepAttr:void 0};let _=f.length;const V=de(c.nodeName);for(;_--;){const ne=f[_],be=ne.name,ue=ne.namespaceURI,Oe=ne.value,Ue=de(be),On=Oe;let Re=be==="value"?On:Pr(On);if(E.attrName=Ue,E.attrValue=Re,E.keepAttr=!0,E.forceKeepAttr=void 0,Ye(T.uponSanitizeAttribute,c,E),Re=E.attrValue,yo&&(Ue==="id"||Ue==="name")&&Wo(Re,wo)!==0&&(rt(be,c),Re=wo+Re),It&&ve(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i,Re)){rt(be,c);continue}if(Ue==="attributename"&&Fo(Re,"href")){rt(be,c);continue}if(!E.forceKeepAttr){if(!E.keepAttr){rt(be,c);continue}if(!bo&&ve(na,Re)){rt(be,c);continue}if(Je&&(Re=Yt(Re)),!$o(V,Ue,Re)){rt(be,c);continue}Re=dr(V,Ue,ue,Re),Re!==On&&pr(c,be,ue,Re)}}Ye(T.afterSanitizeAttributes,c,null)},Xt=function(c){let f=null;const E=Do(c);for(Ye(T.beforeSanitizeShadowDOM,c,null);f=E.nextNode();)if(Ye(T.uponSanitizeShadowNode,f,null),_o(f),No(f),ht(f.content)&&Xt(f.content),(L?L(f):f.nodeType)===We.element){const V=K(f);ht(V)&&($n(V),Xt(V))}Ye(T.afterSanitizeShadowDOM,c,null)},$n=function(c){const f=[{node:c,shadow:null}];for(;f.length>0;){const E=f.pop();if(E.shadow){Xt(E.shadow);continue}const _=E.node,ne=(L?L(_):_.nodeType)===We.element,be=x(_);if(be)for(let ue=be.length-1;ue>=0;--ue)f.push({node:be[ue],shadow:null});if(ne){const ue=b?b(_):null;if(typeof ue=="string"&&de(ue)==="template"){const Oe=_.content;ht(Oe)&&f.push({node:Oe,shadow:null})}}if(ne){const ue=K(_);ht(ue)&&f.push({node:null,shadow:ue},{node:ue,shadow:null})}}};return e.sanitize=function(k){let c=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},f=null,E=null,_=null,V=null;if(In=!k,In&&(k="<!-->"),typeof k!="string"&&!Ct(k)&&(k=jr(k),typeof k!="string"))throw at("dirty is not a string, aborting");if(!e.isSupported)return k;yn?(H=wn,X=vn):Dn(c),(T.uponSanitizeElement.length>0||T.uponSanitizeAttribute.length>0)&&(H=De(H)),T.uponSanitizeAttribute.length>0&&(X=De(X)),e.removed=[];const ne=Sn&&typeof k!="string"&&Ct(k);if(ne){const Oe=b?b(k):k.nodeName;if(typeof Oe=="string"){const Ue=de(Oe);if(!H[Ue]||Ce[Ue])throw at("root node is forbidden and cannot be sanitized in-place")}if(Zt(k))throw at("root node is clobbered and cannot be sanitized in-place");try{$n(k)}catch(Ue){throw Co(k),Ue}}else if(Ct(k))f=Ro("<!---->"),E=f.ownerDocument.importNode(k,!0),E.nodeType===We.element&&E.nodeName==="BODY"||E.nodeName==="HTML"?f=E:f.appendChild(E),$n(E);else{if(!ut&&!Je&&!st&&k.indexOf("<")===-1)return v&&Gt?N(k):k;if(f=Ro(k),!f)return ut?null:Gt?I:""}f&&En&&Qe(f.firstChild);const be=Do(ne?k:f);try{for(;_=be.nextNode();)_o(_),No(_),ht(_.content)&&Xt(_.content)}catch(Oe){throw ne&&Co(k),Oe}if(ne)return Rt(e.removed,Oe=>{Oe.element&&ar(Oe.element)}),Je&&_n(k),k;if(ut){if(Je&&_n(f),qt)for(V=Q.call(f.ownerDocument);f.firstChild;)V.appendChild(f.firstChild);else V=f;return(X.shadowroot||X.shadowrootmode)&&(V=y.call(n,V,!0)),V}let ue=st?f.outerHTML:f.innerHTML;return st&&H["!doctype"]&&f.ownerDocument&&f.ownerDocument.doctype&&f.ownerDocument.doctype.name&&ve(Jr,f.ownerDocument.doctype.name)&&(ue="<!DOCTYPE "+f.ownerDocument.doctype.name+`>
`+ue),Je&&(ue=Yt(ue)),v&&Gt?N(ue):ue},e.setConfig=function(){let k=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Dn(k),yn=!0,wn=H,vn=X},e.clearConfig=function(){gt=null,yn=!1,wn=null,vn=null,v=Y,I=""},e.isValidAttribute=function(k,c,f){gt||Dn({});const E=de(k),_=de(c);return $o(E,_,f)},e.addHook=function(k,c){typeof c=="function"&&xe(T,k)&&bt(T[k],c)},e.removeHook=function(k,c){if(xe(T,k)){if(c!==void 0){const f=Or(T[k],c);return f===-1?void 0:Nr(T[k],f,1)[0]}return Ho(T[k])}},e.removeHooks=function(k){xe(T,k)&&(T[k]=[])},e.removeAllHooks=function(){T=Qo()},e}var Mt=ys();function so(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}let dt=so();function ws(o){dt=o}const vs=/[&<>"']/,ra=new RegExp(vs.source,"g"),Es=/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,aa=new RegExp(Es.source,"g"),ia={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},es=o=>ia[o];function $e(o,e){if(e){if(vs.test(o))return o.replace(ra,es)}else if(Es.test(o))return o.replace(aa,es);return o}const la=/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;function ca(o){return o.replace(la,(e,t)=>(t=t.toLowerCase(),t==="colon"?":":t.charAt(0)==="#"?t.charAt(1)==="x"?String.fromCharCode(parseInt(t.substring(2),16)):String.fromCharCode(+t.substring(1)):""))}const da=/(^|[^\[])\^/g;function le(o,e){let t=typeof o=="string"?o:o.source;e=e||"";const n={replace:(s,r)=>{let a=typeof r=="string"?r:r.source;return a=a.replace(da,"$1"),t=t.replace(s,a),n},getRegex:()=>new RegExp(t,e)};return n}function ts(o){try{o=encodeURI(o).replace(/%25/g,"%")}catch{return null}return o}const Bt={exec:()=>null};function ns(o,e){const t=o.replace(/\|/g,(r,a,i)=>{let l=!1,d=a;for(;--d>=0&&i[d]==="\\";)l=!l;return l?"|":" |"}),n=t.split(/ \|/);let s=0;if(n[0].trim()||n.shift(),n.length>0&&!n[n.length-1].trim()&&n.pop(),e)if(n.length>e)n.splice(e);else for(;n.length<e;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(/\\\|/g,"|");return n}function en(o,e,t){const n=o.length;if(n===0)return"";let s=0;for(;s<n&&o.charAt(n-s-1)===e;)s++;return o.slice(0,n-s)}function pa(o,e){if(o.indexOf(e[1])===-1)return-1;let t=0;for(let n=0;n<o.length;n++)if(o[n]==="\\")n++;else if(o[n]===e[0])t++;else if(o[n]===e[1]&&(t--,t<0))return n;return-1}function os(o,e,t,n){const s=e.href,r=e.title?$e(e.title):null,a=o[1].replace(/\\([\[\]])/g,"$1");if(o[0].charAt(0)!=="!"){n.state.inLink=!0;const i={type:"link",raw:t,href:s,title:r,text:a,tokens:n.inlineTokens(a)};return n.state.inLink=!1,i}return{type:"image",raw:t,href:s,title:r,text:$e(a)}}function ua(o,e){const t=o.match(/^(\s+)(?:```)/);if(t===null)return e;const n=t[1];return e.split(`
`).map(s=>{const r=s.match(/^\s+/);if(r===null)return s;const[a]=r;return a.length>=n.length?s.slice(n.length):s}).join(`
`)}class pn{constructor(e){ce(this,"options");ce(this,"rules");ce(this,"lexer");this.options=e||dt}space(e){const t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){const t=this.rules.block.code.exec(e);if(t){const n=t[0].replace(/^ {1,4}/gm,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:en(n,`
`)}}}fences(e){const t=this.rules.block.fences.exec(e);if(t){const n=t[0],s=ua(n,t[3]||"");return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:s}}}heading(e){const t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(/#$/.test(n)){const s=en(n,"#");(this.options.pedantic||!s||/ $/.test(s))&&(n=s.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){const t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:t[0]}}blockquote(e){const t=this.rules.block.blockquote.exec(e);if(t){let n=t[0].replace(/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,`
    $1`);n=en(n.replace(/^ *>[ \t]?/gm,""),`
`);const s=this.lexer.state.top;this.lexer.state.top=!0;const r=this.lexer.blockTokens(n);return this.lexer.state.top=s,{type:"blockquote",raw:t[0],tokens:r,text:n}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim();const s=n.length>1,r={type:"list",raw:"",ordered:s,start:s?+n.slice(0,-1):"",loose:!1,items:[]};n=s?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=s?n:"[*+-]");const a=new RegExp(`^( {0,3}${n})((?:[	 ][^\\n]*)?(?:\\n|$))`);let i="",l="",d=!1;for(;e;){let p=!1;if(!(t=a.exec(e))||this.rules.block.hr.test(e))break;i=t[0],e=e.substring(i.length);let g=t[2].split(`
`,1)[0].replace(/^\t+/,D=>" ".repeat(3*D.length)),m=e.split(`
`,1)[0],u=0;this.options.pedantic?(u=2,l=g.trimStart()):(u=t[2].search(/[^ ]/),u=u>4?1:u,l=g.slice(u),u+=t[1].length);let h=!1;if(!g&&/^ *$/.test(m)&&(i+=m+`
`,e=e.substring(m.length+1),p=!0),!p){const D=new RegExp(`^ {0,${Math.min(3,u-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),K=new RegExp(`^ {0,${Math.min(3,u-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),G=new RegExp(`^ {0,${Math.min(3,u-1)}}(?:\`\`\`|~~~)`),L=new RegExp(`^ {0,${Math.min(3,u-1)}}#`);for(;e;){const b=e.split(`
`,1)[0];if(m=b,this.options.pedantic&&(m=m.replace(/^ {1,4}(?=( {4})*[^ ])/g,"  ")),G.test(m)||L.test(m)||D.test(m)||K.test(e))break;if(m.search(/[^ ]/)>=u||!m.trim())l+=`
`+m.slice(u);else{if(h||g.search(/[^ ]/)>=4||G.test(g)||L.test(g)||K.test(g))break;l+=`
`+m}!h&&!m.trim()&&(h=!0),i+=b+`
`,e=e.substring(b.length+1),g=m.slice(u)}}r.loose||(d?r.loose=!0:/\n *\n *$/.test(i)&&(d=!0));let P=null,x;this.options.gfm&&(P=/^\[[ xX]\] /.exec(l),P&&(x=P[0]!=="[ ] ",l=l.replace(/^\[[ xX]\] +/,""))),r.items.push({type:"list_item",raw:i,task:!!P,checked:x,loose:!1,text:l,tokens:[]}),r.raw+=i}r.items[r.items.length-1].raw=i.trimEnd(),r.items[r.items.length-1].text=l.trimEnd(),r.raw=r.raw.trimEnd();for(let p=0;p<r.items.length;p++)if(this.lexer.state.top=!1,r.items[p].tokens=this.lexer.blockTokens(r.items[p].text,[]),!r.loose){const g=r.items[p].tokens.filter(u=>u.type==="space"),m=g.length>0&&g.some(u=>/\n.*\n/.test(u.raw));r.loose=m}if(r.loose)for(let p=0;p<r.items.length;p++)r.items[p].loose=!0;return r}}html(e){const t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){const t=this.rules.block.def.exec(e);if(t){const n=t[1].toLowerCase().replace(/\s+/g," "),s=t[2]?t[2].replace(/^<(.*)>$/,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",r=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:s,title:r}}}table(e){const t=this.rules.block.table.exec(e);if(!t||!/[:|]/.test(t[2]))return;const n=ns(t[1]),s=t[2].replace(/^\||\| *$/g,"").split("|"),r=t[3]&&t[3].trim()?t[3].replace(/\n[ \t]*$/,"").split(`
`):[],a={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===s.length){for(const i of s)/^ *-+: *$/.test(i)?a.align.push("right"):/^ *:-+: *$/.test(i)?a.align.push("center"):/^ *:-+ *$/.test(i)?a.align.push("left"):a.align.push(null);for(const i of n)a.header.push({text:i,tokens:this.lexer.inline(i)});for(const i of r)a.rows.push(ns(i,a.header.length).map(l=>({text:l,tokens:this.lexer.inline(l)})));return a}}lheading(e){const t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){const t=this.rules.block.paragraph.exec(e);if(t){const n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){const t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){const t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:$e(t[1])}}tag(e){const t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&/^<a /i.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&/^<\/a>/i.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&/^<(pre|code|kbd|script)(\s|>)/i.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&/^<\/(pre|code|kbd|script)(\s|>)/i.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){const t=this.rules.inline.link.exec(e);if(t){const n=t[2].trim();if(!this.options.pedantic&&/^</.test(n)){if(!/>$/.test(n))return;const a=en(n.slice(0,-1),"\\");if((n.length-a.length)%2===0)return}else{const a=pa(t[2],"()");if(a>-1){const l=(t[0].indexOf("!")===0?5:4)+t[1].length+a;t[2]=t[2].substring(0,a),t[0]=t[0].substring(0,l).trim(),t[3]=""}}let s=t[2],r="";if(this.options.pedantic){const a=/^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(s);a&&(s=a[1],r=a[3])}else r=t[3]?t[3].slice(1,-1):"";return s=s.trim(),/^</.test(s)&&(this.options.pedantic&&!/>$/.test(n)?s=s.slice(1):s=s.slice(1,-1)),os(t,{href:s&&s.replace(this.rules.inline.anyPunctuation,"$1"),title:r&&r.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){const s=(n[2]||n[1]).replace(/\s+/g," "),r=t[s.toLowerCase()];if(!r){const a=n[0].charAt(0);return{type:"text",raw:a,text:a}}return os(n,r,n[0],this.lexer)}}emStrong(e,t,n=""){let s=this.rules.inline.emStrongLDelim.exec(e);if(!s||s[3]&&n.match(/[\p{L}\p{N}]/u))return;if(!(s[1]||s[2]||"")||!n||this.rules.inline.punctuation.exec(n)){const a=[...s[0]].length-1;let i,l,d=a,p=0;const g=s[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(g.lastIndex=0,t=t.slice(-1*e.length+a);(s=g.exec(t))!=null;){if(i=s[1]||s[2]||s[3]||s[4]||s[5]||s[6],!i)continue;if(l=[...i].length,s[3]||s[4]){d+=l;continue}else if((s[5]||s[6])&&a%3&&!((a+l)%3)){p+=l;continue}if(d-=l,d>0)continue;l=Math.min(l,l+d+p);const m=[...s[0]][0].length,u=e.slice(0,a+s.index+m+l);if(Math.min(a,l)%2){const P=u.slice(1,-1);return{type:"em",raw:u,text:P,tokens:this.lexer.inlineTokens(P)}}const h=u.slice(2,-2);return{type:"strong",raw:u,text:h,tokens:this.lexer.inlineTokens(h)}}}}codespan(e){const t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(/\n/g," ");const s=/[^ ]/.test(n),r=/^ /.test(n)&&/ $/.test(n);return s&&r&&(n=n.substring(1,n.length-1)),n=$e(n,!0),{type:"codespan",raw:t[0],text:n}}}br(e){const t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){const t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){const t=this.rules.inline.autolink.exec(e);if(t){let n,s;return t[2]==="@"?(n=$e(t[1]),s="mailto:"+n):(n=$e(t[1]),s=n),{type:"link",raw:t[0],text:n,href:s,tokens:[{type:"text",raw:n,text:n}]}}}url(e){var n;let t;if(t=this.rules.inline.url.exec(e)){let s,r;if(t[2]==="@")s=$e(t[0]),r="mailto:"+s;else{let a;do a=t[0],t[0]=((n=this.rules.inline._backpedal.exec(t[0]))==null?void 0:n[0])??"";while(a!==t[0]);s=$e(t[0]),t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:s,href:r,tokens:[{type:"text",raw:s,text:s}]}}}inlineText(e){const t=this.rules.inline.text.exec(e);if(t){let n;return this.lexer.state.inRawBlock?n=t[0]:n=$e(t[0]),{type:"text",raw:t[0],text:n}}}}const fa=/^(?: *(?:\n|$))+/,ma=/^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,ga=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Ft=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,ha=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,ks=/(?:[*+-]|\d{1,9}[.)])/,Ss=le(/^(?!bull |blockCode|fences|blockquote|heading|html)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html))+?)\n {0,3}(=+|-+) *(?:\n+|$)/).replace(/bull/g,ks).replace(/blockCode/g,/ {4}/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).getRegex(),ro=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,ba=/^[^\n]+/,ao=/(?!\s*\])(?:\\.|[^\[\]\\])+/,xa=le(/^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/).replace("label",ao).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),ya=le(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,ks).getRegex(),xn="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",io=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,wa=le("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))","i").replace("comment",io).replace("tag",xn).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Ts=le(ro).replace("hr",Ft).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",xn).getRegex(),va=le(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Ts).getRegex(),lo={blockquote:va,code:ma,def:xa,fences:ga,heading:ha,hr:Ft,html:wa,lheading:Ss,list:ya,newline:fa,paragraph:Ts,table:Bt,text:ba},ss=le("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Ft).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code"," {4}[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",xn).getRegex(),Ea={...lo,table:ss,paragraph:le(ro).replace("hr",Ft).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",ss).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",xn).getRegex()},ka={...lo,html:le(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",io).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Bt,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:le(ro).replace("hr",Ft).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Ss).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},As=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Sa=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Is=/^( {2,}|\\)\n(?!\s*$)/,Ta=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Wt="\\p{P}\\p{S}",Aa=le(/^((?![*_])[\spunctuation])/,"u").replace(/punctuation/g,Wt).getRegex(),Ia=/\[[^[\]]*?\]\([^\(\)]*?\)|`[^`]*?`|<[^<>]*?>/g,La=le(/^(?:\*+(?:((?!\*)[punct])|[^\s*]))|^_+(?:((?!_)[punct])|([^\s_]))/,"u").replace(/punct/g,Wt).getRegex(),Ca=le("^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)[punct](\\*+)(?=[\\s]|$)|[^punct\\s](\\*+)(?!\\*)(?=[punct\\s]|$)|(?!\\*)[punct\\s](\\*+)(?=[^punct\\s])|[\\s](\\*+)(?!\\*)(?=[punct])|(?!\\*)[punct](\\*+)(?!\\*)(?=[punct])|[^punct\\s](\\*+)(?=[^punct\\s])","gu").replace(/punct/g,Wt).getRegex(),Ra=le("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)[punct](_+)(?=[\\s]|$)|[^punct\\s](_+)(?!_)(?=[punct\\s]|$)|(?!_)[punct\\s](_+)(?=[^punct\\s])|[\\s](_+)(?!_)(?=[punct])|(?!_)[punct](_+)(?!_)(?=[punct])","gu").replace(/punct/g,Wt).getRegex(),Da=le(/\\([punct])/,"gu").replace(/punct/g,Wt).getRegex(),_a=le(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),$a=le(io).replace("(?:-->|$)","-->").getRegex(),Oa=le("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",$a).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),un=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,Na=le(/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/).replace("label",un).replace("href",/<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Ls=le(/^!?\[(label)\]\[(ref)\]/).replace("label",un).replace("ref",ao).getRegex(),Cs=le(/^!?\[(ref)\](?:\[\])?/).replace("ref",ao).getRegex(),Pa=le("reflink|nolink(?!\\()","g").replace("reflink",Ls).replace("nolink",Cs).getRegex(),co={_backpedal:Bt,anyPunctuation:Da,autolink:_a,blockSkip:Ia,br:Is,code:Sa,del:Bt,emStrongLDelim:La,emStrongRDelimAst:Ca,emStrongRDelimUnd:Ra,escape:As,link:Na,nolink:Cs,punctuation:Aa,reflink:Ls,reflinkSearch:Pa,tag:Oa,text:Ta,url:Bt},Ma={...co,link:le(/^!?\[(label)\]\((.*?)\)/).replace("label",un).getRegex(),reflink:le(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",un).getRegex()},Zn={...co,escape:le(As).replace("])","~|])").getRegex(),url:le(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},Ba={...Zn,br:le(Is).replace("{2,}","*").getRegex(),text:le(Zn.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},tn={normal:lo,gfm:Ea,pedantic:ka},$t={normal:co,gfm:Zn,breaks:Ba,pedantic:Ma};class Ge{constructor(e){ce(this,"tokens");ce(this,"options");ce(this,"state");ce(this,"tokenizer");ce(this,"inlineQueue");this.tokens=[],this.tokens.links=Object.create(null),this.options=e||dt,this.options.tokenizer=this.options.tokenizer||new pn,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const t={block:tn.normal,inline:$t.normal};this.options.pedantic?(t.block=tn.pedantic,t.inline=$t.pedantic):this.options.gfm&&(t.block=tn.gfm,this.options.breaks?t.inline=$t.breaks:t.inline=$t.gfm),this.tokenizer.rules=t}static get rules(){return{block:tn,inline:$t}}static lex(e,t){return new Ge(t).lex(e)}static lexInline(e,t){return new Ge(t).inlineTokens(e)}lex(e){e=e.replace(/\r\n|\r/g,`
`),this.blockTokens(e,this.tokens);for(let t=0;t<this.inlineQueue.length;t++){const n=this.inlineQueue[t];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,t=[]){this.options.pedantic?e=e.replace(/\t/g,"    ").replace(/^ +$/gm,""):e=e.replace(/^( *)(\t+)/gm,(i,l,d)=>l+"    ".repeat(d.length));let n,s,r,a;for(;e;)if(!(this.options.extensions&&this.options.extensions.block&&this.options.extensions.block.some(i=>(n=i.call({lexer:this},e,t))?(e=e.substring(n.raw.length),t.push(n),!0):!1))){if(n=this.tokenizer.space(e)){e=e.substring(n.raw.length),n.raw.length===1&&t.length>0?t[t.length-1].raw+=`
`:t.push(n);continue}if(n=this.tokenizer.code(e)){e=e.substring(n.raw.length),s=t[t.length-1],s&&(s.type==="paragraph"||s.type==="text")?(s.raw+=`
`+n.raw,s.text+=`
`+n.text,this.inlineQueue[this.inlineQueue.length-1].src=s.text):t.push(n);continue}if(n=this.tokenizer.fences(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.heading(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.hr(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.blockquote(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.list(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.html(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.def(e)){e=e.substring(n.raw.length),s=t[t.length-1],s&&(s.type==="paragraph"||s.type==="text")?(s.raw+=`
`+n.raw,s.text+=`
`+n.raw,this.inlineQueue[this.inlineQueue.length-1].src=s.text):this.tokens.links[n.tag]||(this.tokens.links[n.tag]={href:n.href,title:n.title});continue}if(n=this.tokenizer.table(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.lheading(e)){e=e.substring(n.raw.length),t.push(n);continue}if(r=e,this.options.extensions&&this.options.extensions.startBlock){let i=1/0;const l=e.slice(1);let d;this.options.extensions.startBlock.forEach(p=>{d=p.call({lexer:this},l),typeof d=="number"&&d>=0&&(i=Math.min(i,d))}),i<1/0&&i>=0&&(r=e.substring(0,i+1))}if(this.state.top&&(n=this.tokenizer.paragraph(r))){s=t[t.length-1],a&&s.type==="paragraph"?(s.raw+=`
`+n.raw,s.text+=`
`+n.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=s.text):t.push(n),a=r.length!==e.length,e=e.substring(n.raw.length);continue}if(n=this.tokenizer.text(e)){e=e.substring(n.raw.length),s=t[t.length-1],s&&s.type==="text"?(s.raw+=`
`+n.raw,s.text+=`
`+n.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=s.text):t.push(n);continue}if(e){const i="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(i);break}else throw new Error(i)}}return this.state.top=!0,t}inline(e,t=[]){return this.inlineQueue.push({src:e,tokens:t}),t}inlineTokens(e,t=[]){let n,s,r,a=e,i,l,d;if(this.tokens.links){const p=Object.keys(this.tokens.links);if(p.length>0)for(;(i=this.tokenizer.rules.inline.reflinkSearch.exec(a))!=null;)p.includes(i[0].slice(i[0].lastIndexOf("[")+1,-1))&&(a=a.slice(0,i.index)+"["+"a".repeat(i[0].length-2)+"]"+a.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(i=this.tokenizer.rules.inline.blockSkip.exec(a))!=null;)a=a.slice(0,i.index)+"["+"a".repeat(i[0].length-2)+"]"+a.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);for(;(i=this.tokenizer.rules.inline.anyPunctuation.exec(a))!=null;)a=a.slice(0,i.index)+"++"+a.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;e;)if(l||(d=""),l=!1,!(this.options.extensions&&this.options.extensions.inline&&this.options.extensions.inline.some(p=>(n=p.call({lexer:this},e,t))?(e=e.substring(n.raw.length),t.push(n),!0):!1))){if(n=this.tokenizer.escape(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.tag(e)){e=e.substring(n.raw.length),s=t[t.length-1],s&&n.type==="text"&&s.type==="text"?(s.raw+=n.raw,s.text+=n.text):t.push(n);continue}if(n=this.tokenizer.link(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(n.raw.length),s=t[t.length-1],s&&n.type==="text"&&s.type==="text"?(s.raw+=n.raw,s.text+=n.text):t.push(n);continue}if(n=this.tokenizer.emStrong(e,a,d)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.codespan(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.br(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.del(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.autolink(e)){e=e.substring(n.raw.length),t.push(n);continue}if(!this.state.inLink&&(n=this.tokenizer.url(e))){e=e.substring(n.raw.length),t.push(n);continue}if(r=e,this.options.extensions&&this.options.extensions.startInline){let p=1/0;const g=e.slice(1);let m;this.options.extensions.startInline.forEach(u=>{m=u.call({lexer:this},g),typeof m=="number"&&m>=0&&(p=Math.min(p,m))}),p<1/0&&p>=0&&(r=e.substring(0,p+1))}if(n=this.tokenizer.inlineText(r)){e=e.substring(n.raw.length),n.raw.slice(-1)!=="_"&&(d=n.raw.slice(-1)),l=!0,s=t[t.length-1],s&&s.type==="text"?(s.raw+=n.raw,s.text+=n.text):t.push(n);continue}if(e){const p="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(p);break}else throw new Error(p)}}return t}}class fn{constructor(e){ce(this,"options");this.options=e||dt}code(e,t,n){var r;const s=(r=(t||"").match(/^\S*/))==null?void 0:r[0];return e=e.replace(/\n$/,"")+`
`,s?'<pre><code class="language-'+$e(s)+'">'+(n?e:$e(e,!0))+`</code></pre>
`:"<pre><code>"+(n?e:$e(e,!0))+`</code></pre>
`}blockquote(e){return`<blockquote>
${e}</blockquote>
`}html(e,t){return e}heading(e,t,n){return`<h${t}>${e}</h${t}>
`}hr(){return`<hr>
`}list(e,t,n){const s=t?"ol":"ul",r=t&&n!==1?' start="'+n+'"':"";return"<"+s+r+`>
`+e+"</"+s+`>
`}listitem(e,t,n){return`<li>${e}</li>
`}checkbox(e){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph(e){return`<p>${e}</p>
`}table(e,t){return t&&(t=`<tbody>${t}</tbody>`),`<table>
<thead>
`+e+`</thead>
`+t+`</table>
`}tablerow(e){return`<tr>
${e}</tr>
`}tablecell(e,t){const n=t.header?"th":"td";return(t.align?`<${n} align="${t.align}">`:`<${n}>`)+e+`</${n}>
`}strong(e){return`<strong>${e}</strong>`}em(e){return`<em>${e}</em>`}codespan(e){return`<code>${e}</code>`}br(){return"<br>"}del(e){return`<del>${e}</del>`}link(e,t,n){const s=ts(e);if(s===null)return n;e=s;let r='<a href="'+e+'"';return t&&(r+=' title="'+t+'"'),r+=">"+n+"</a>",r}image(e,t,n){const s=ts(e);if(s===null)return n;e=s;let r=`<img src="${e}" alt="${n}"`;return t&&(r+=` title="${t}"`),r+=">",r}text(e){return e}}class po{strong(e){return e}em(e){return e}codespan(e){return e}del(e){return e}html(e){return e}text(e){return e}link(e,t,n){return""+n}image(e,t,n){return""+n}br(){return""}}class Ve{constructor(e){ce(this,"options");ce(this,"renderer");ce(this,"textRenderer");this.options=e||dt,this.options.renderer=this.options.renderer||new fn,this.renderer=this.options.renderer,this.renderer.options=this.options,this.textRenderer=new po}static parse(e,t){return new Ve(t).parse(e)}static parseInline(e,t){return new Ve(t).parseInline(e)}parse(e,t=!0){let n="";for(let s=0;s<e.length;s++){const r=e[s];if(this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[r.type]){const a=r,i=this.options.extensions.renderers[a.type].call({parser:this},a);if(i!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(a.type)){n+=i||"";continue}}switch(r.type){case"space":continue;case"hr":{n+=this.renderer.hr();continue}case"heading":{const a=r;n+=this.renderer.heading(this.parseInline(a.tokens),a.depth,ca(this.parseInline(a.tokens,this.textRenderer)));continue}case"code":{const a=r;n+=this.renderer.code(a.text,a.lang,!!a.escaped);continue}case"table":{const a=r;let i="",l="";for(let p=0;p<a.header.length;p++)l+=this.renderer.tablecell(this.parseInline(a.header[p].tokens),{header:!0,align:a.align[p]});i+=this.renderer.tablerow(l);let d="";for(let p=0;p<a.rows.length;p++){const g=a.rows[p];l="";for(let m=0;m<g.length;m++)l+=this.renderer.tablecell(this.parseInline(g[m].tokens),{header:!1,align:a.align[m]});d+=this.renderer.tablerow(l)}n+=this.renderer.table(i,d);continue}case"blockquote":{const a=r,i=this.parse(a.tokens);n+=this.renderer.blockquote(i);continue}case"list":{const a=r,i=a.ordered,l=a.start,d=a.loose;let p="";for(let g=0;g<a.items.length;g++){const m=a.items[g],u=m.checked,h=m.task;let P="";if(m.task){const x=this.renderer.checkbox(!!u);d?m.tokens.length>0&&m.tokens[0].type==="paragraph"?(m.tokens[0].text=x+" "+m.tokens[0].text,m.tokens[0].tokens&&m.tokens[0].tokens.length>0&&m.tokens[0].tokens[0].type==="text"&&(m.tokens[0].tokens[0].text=x+" "+m.tokens[0].tokens[0].text)):m.tokens.unshift({type:"text",text:x+" "}):P+=x+" "}P+=this.parse(m.tokens,d),p+=this.renderer.listitem(P,h,!!u)}n+=this.renderer.list(p,i,l);continue}case"html":{const a=r;n+=this.renderer.html(a.text,a.block);continue}case"paragraph":{const a=r;n+=this.renderer.paragraph(this.parseInline(a.tokens));continue}case"text":{let a=r,i=a.tokens?this.parseInline(a.tokens):a.text;for(;s+1<e.length&&e[s+1].type==="text";)a=e[++s],i+=`
`+(a.tokens?this.parseInline(a.tokens):a.text);n+=t?this.renderer.paragraph(i):i;continue}default:{const a='Token with "'+r.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return n}parseInline(e,t){t=t||this.renderer;let n="";for(let s=0;s<e.length;s++){const r=e[s];if(this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[r.type]){const a=this.options.extensions.renderers[r.type].call({parser:this},r);if(a!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(r.type)){n+=a||"";continue}}switch(r.type){case"escape":{const a=r;n+=t.text(a.text);break}case"html":{const a=r;n+=t.html(a.text);break}case"link":{const a=r;n+=t.link(a.href,a.title,this.parseInline(a.tokens,t));break}case"image":{const a=r;n+=t.image(a.href,a.title,a.text);break}case"strong":{const a=r;n+=t.strong(this.parseInline(a.tokens,t));break}case"em":{const a=r;n+=t.em(this.parseInline(a.tokens,t));break}case"codespan":{const a=r;n+=t.codespan(a.text);break}case"br":{n+=t.br();break}case"del":{const a=r;n+=t.del(this.parseInline(a.tokens,t));break}case"text":{const a=r;n+=t.text(a.text);break}default:{const a='Token with "'+r.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return n}}class Ut{constructor(e){ce(this,"options");this.options=e||dt}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}}ce(Ut,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens"]));var ct,Xn,Rs;class Ua{constructor(...e){Mo(this,ct);ce(this,"defaults",so());ce(this,"options",this.setOptions);ce(this,"parse",Jt(this,ct,Xn).call(this,Ge.lex,Ve.parse));ce(this,"parseInline",Jt(this,ct,Xn).call(this,Ge.lexInline,Ve.parseInline));ce(this,"Parser",Ve);ce(this,"Renderer",fn);ce(this,"TextRenderer",po);ce(this,"Lexer",Ge);ce(this,"Tokenizer",pn);ce(this,"Hooks",Ut);this.use(...e)}walkTokens(e,t){var s,r;let n=[];for(const a of e)switch(n=n.concat(t.call(this,a)),a.type){case"table":{const i=a;for(const l of i.header)n=n.concat(this.walkTokens(l.tokens,t));for(const l of i.rows)for(const d of l)n=n.concat(this.walkTokens(d.tokens,t));break}case"list":{const i=a;n=n.concat(this.walkTokens(i.items,t));break}default:{const i=a;(r=(s=this.defaults.extensions)==null?void 0:s.childTokens)!=null&&r[i.type]?this.defaults.extensions.childTokens[i.type].forEach(l=>{const d=i[l].flat(1/0);n=n.concat(this.walkTokens(d,t))}):i.tokens&&(n=n.concat(this.walkTokens(i.tokens,t)))}}return n}use(...e){const t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{const s={...n};if(s.async=this.defaults.async||s.async||!1,n.extensions&&(n.extensions.forEach(r=>{if(!r.name)throw new Error("extension name required");if("renderer"in r){const a=t.renderers[r.name];a?t.renderers[r.name]=function(...i){let l=r.renderer.apply(this,i);return l===!1&&(l=a.apply(this,i)),l}:t.renderers[r.name]=r.renderer}if("tokenizer"in r){if(!r.level||r.level!=="block"&&r.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");const a=t[r.level];a?a.unshift(r.tokenizer):t[r.level]=[r.tokenizer],r.start&&(r.level==="block"?t.startBlock?t.startBlock.push(r.start):t.startBlock=[r.start]:r.level==="inline"&&(t.startInline?t.startInline.push(r.start):t.startInline=[r.start]))}"childTokens"in r&&r.childTokens&&(t.childTokens[r.name]=r.childTokens)}),s.extensions=t),n.renderer){const r=this.defaults.renderer||new fn(this.defaults);for(const a in n.renderer){if(!(a in r))throw new Error(`renderer '${a}' does not exist`);if(a==="options")continue;const i=a,l=n.renderer[i],d=r[i];r[i]=(...p)=>{let g=l.apply(r,p);return g===!1&&(g=d.apply(r,p)),g||""}}s.renderer=r}if(n.tokenizer){const r=this.defaults.tokenizer||new pn(this.defaults);for(const a in n.tokenizer){if(!(a in r))throw new Error(`tokenizer '${a}' does not exist`);if(["options","rules","lexer"].includes(a))continue;const i=a,l=n.tokenizer[i],d=r[i];r[i]=(...p)=>{let g=l.apply(r,p);return g===!1&&(g=d.apply(r,p)),g}}s.tokenizer=r}if(n.hooks){const r=this.defaults.hooks||new Ut;for(const a in n.hooks){if(!(a in r))throw new Error(`hook '${a}' does not exist`);if(a==="options")continue;const i=a,l=n.hooks[i],d=r[i];Ut.passThroughHooks.has(a)?r[i]=p=>{if(this.defaults.async)return Promise.resolve(l.call(r,p)).then(m=>d.call(r,m));const g=l.call(r,p);return d.call(r,g)}:r[i]=(...p)=>{let g=l.apply(r,p);return g===!1&&(g=d.apply(r,p)),g}}s.hooks=r}if(n.walkTokens){const r=this.defaults.walkTokens,a=n.walkTokens;s.walkTokens=function(i){let l=[];return l.push(a.call(this,i)),r&&(l=l.concat(r.call(this,i))),l}}this.defaults={...this.defaults,...s}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Ge.lex(e,t??this.defaults)}parser(e,t){return Ve.parse(e,t??this.defaults)}}ct=new WeakSet,Xn=function(e,t){return(n,s)=>{const r={...s},a={...this.defaults,...r};this.defaults.async===!0&&r.async===!1&&(a.silent||console.warn("marked(): The async option was set to true by an extension. The async: false option sent to parse will be ignored."),a.async=!0);const i=Jt(this,ct,Rs).call(this,!!a.silent,!!a.async);if(typeof n>"u"||n===null)return i(new Error("marked(): input parameter is undefined or null"));if(typeof n!="string")return i(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(n)+", string expected"));if(a.hooks&&(a.hooks.options=a),a.async)return Promise.resolve(a.hooks?a.hooks.preprocess(n):n).then(l=>e(l,a)).then(l=>a.hooks?a.hooks.processAllTokens(l):l).then(l=>a.walkTokens?Promise.all(this.walkTokens(l,a.walkTokens)).then(()=>l):l).then(l=>t(l,a)).then(l=>a.hooks?a.hooks.postprocess(l):l).catch(i);try{a.hooks&&(n=a.hooks.preprocess(n));let l=e(n,a);a.hooks&&(l=a.hooks.processAllTokens(l)),a.walkTokens&&this.walkTokens(l,a.walkTokens);let d=t(l,a);return a.hooks&&(d=a.hooks.postprocess(d)),d}catch(l){return i(l)}}},Rs=function(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){const s="<p>An error occurred:</p><pre>"+$e(n.message+"",!0)+"</pre>";return t?Promise.resolve(s):s}if(t)return Promise.reject(n);throw n}};const lt=new Ua;function oe(o,e){return lt.parse(o,e)}oe.options=oe.setOptions=function(o){return lt.setOptions(o),oe.defaults=lt.defaults,ws(oe.defaults),oe};oe.getDefaults=so;oe.defaults=dt;oe.use=function(...o){return lt.use(...o),oe.defaults=lt.defaults,ws(oe.defaults),oe};oe.walkTokens=function(o,e){return lt.walkTokens(o,e)};oe.parseInline=lt.parseInline;oe.Parser=Ve;oe.parser=Ve.parse;oe.Renderer=fn;oe.TextRenderer=po;oe.Lexer=Ge;oe.lexer=Ge.lex;oe.Tokenizer=pn;oe.Hooks=Ut;oe.parse=oe;oe.options;oe.setOptions;oe.use;oe.walkTokens;oe.parseInline;Ve.parse;Ge.lex;const vt=new oe.Renderer,za=vt.link.bind(vt);vt.link=(o,e,t)=>za(o,e,t).replace("<a ",'<a target="_blank" rel="noopener noreferrer" class="text-teal-400 hover:underline" ');vt.heading=(o,e)=>{const t=o.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");return`<h${e} id="${t}">${o}</h${e}>`};vt.table=(o,e)=>`<div class="overflow-x-auto my-4 max-w-full"><table class="w-full">${o}${e}</table></div>`;oe.setOptions({renderer:vt,gfm:!0,breaks:!0});function Ds(){try{return parseInt(localStorage.getItem("secops-sanitize-count")||"0",10)}catch{return 0}}function _s(){try{const o=Ds();localStorage.setItem("secops-sanitize-count",(o+1).toString())}catch{}}function Et(o){_s();const e=oe.parse(o);Mt.addHook("uponSanitizeElement",n=>{if(n instanceof Element){const s=n.tagName.toLowerCase();if(s==="video"||s==="audio"||s==="iframe"||s==="source"||s==="img"){const r=n.getAttribute("src");if(r){const a=r.trim().toLowerCase();a.startsWith("data:")||a.startsWith("blob:")||a.startsWith("attachment:")||a.startsWith("/")||a.startsWith("./")||a.startsWith("../")||(n.setAttribute("src","#"),console.warn("SECURITY BLOCK: Prevented connection to remote source URL:",r))}s==="iframe"&&n.setAttribute("sandbox","allow-scripts")}}});const t=Mt.sanitize(e,{ALLOWED_TAGS:["h1","h2","h3","h4","h5","h6","p","br","hr","a","span","ul","ol","li","strong","em","code","pre","blockquote","table","thead","tbody","tr","th","td","div","img","input","video","audio","iframe","source"],ALLOWED_ATTR:["href","target","rel","class","id","align","src","alt","type","checked","disabled","controls","sandbox","width","height"]});return Mt.removeHook("uponSanitizeElement"),t}function sn(o){return o.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F\u200B-\u200D\uFEFF\u202A-\u202E]/g,"")}function R(o){return o.replace(/[&<>"']/g,e=>{switch(e){case"&":return"&amp;";case"<":return"&lt;";case">":return"&gt;";case'"':return"&quot;";case"'":return"&#039;";default:return e}})}function ja(o){if(_s(),typeof o!="object"||o===null)throw new Error("Invalid backup structure: Root must be an object.");const{slug:e,title:t,content:n,updatedAt:s,tags:r}=o;if(typeof e!="string"||!/^[a-z0-9-_]+$/.test(e))throw new Error("Invalid slug format: Slugs must contain only lowercase alphanumeric characters, hyphens, and underscores.");const a=sn(e);if(typeof t!="string"||t.trim().length===0||t.length>100)throw new Error("Invalid title format: Must be a non-empty string under 100 characters.");const i=sn(t);if(typeof n!="string"||n.length>5e4)throw new Error("Invalid content format: Must be a string under 50,000 characters.");if(typeof s!="number"||isNaN(s))throw new Error("Invalid updated timestamp format.");if(!Array.isArray(r))throw new Error("Tags must be an array of strings.");const l=r.map(d=>{if(typeof d!="string")throw new Error("Tags must be strings.");return sn(Mt.sanitize(d)).slice(0,30)});return{slug:a,title:Mt.sanitize(i),content:n,updatedAt:s,tags:l,isSystem:!!o.isSystem}}async function Ie(o){const e=new TextEncoder,t=e.encode("secops-intel-salt-2026"),n=await window.crypto.subtle.importKey("raw",e.encode(o),{name:"PBKDF2"},!1,["deriveKey"]);return window.crypto.subtle.deriveKey({name:"PBKDF2",salt:t,iterations:1e5,hash:"SHA-256"},n,{name:"AES-GCM",length:256},!1,["encrypt","decrypt"])}async function ot(o,e){const t=new TextEncoder,n=window.crypto.getRandomValues(new Uint8Array(12)),s=await window.crypto.subtle.encrypt({name:"AES-GCM",iv:n},e,t.encode(o)),r=Array.from(n).map(d=>d.toString(16).padStart(2,"0")).join(""),a=new Uint8Array(s);let i="";for(let d=0;d<a.byteLength;d++)i+=String.fromCharCode(a[d]);const l=btoa(i);return`${r}:${l}`}async function fe(o,e){const t=o.split(":");if(t.length!==2)throw new Error("Invalid cipher format");const[n,s]=t,r=new Uint8Array(n.match(/.{1,2}/g).map(d=>parseInt(d,16))),a=atob(s),i=new Uint8Array(a.length);for(let d=0;d<a.length;d++)i[d]=a.charCodeAt(d);const l=await window.crypto.subtle.decrypt({name:"AES-GCM",iv:r},e,i);return new TextDecoder().decode(l)}async function Ze(o){const e=`${o.slug}|${o.title}|${o.content}|${o.updatedAt}|${o.tags.join(",")}|secops-integrity-salt-2026`,t=new TextEncoder().encode(e),n=await crypto.subtle.digest("SHA-256",t);return Array.from(new Uint8Array(n)).map(r=>r.toString(16).padStart(2,"0")).join("")}let re="home",Xe=!1,Ne=!1,ze="",Ot="",ke=[],Pt=null,$s=navigator.onLine?"SECURE_LINK":"OFFLINE_CACHE",wt=localStorage.getItem("secops-wiki-theme")||"dark",nt=localStorage.getItem("secops-wiki-mask-encrypted")==="true",nn=localStorage.getItem("secops-wiki-split-screen")!=="false",rn={},pe=null;async function ge(o,e){const t={id:`${Date.now()}-${Math.random().toString(36).substring(2,11)}`,timestamp:Date.now(),event:o,details:e};await kr(t)}async function je(o){const e=await br(o);if(!e)return null;if(e.isEncryptedAtRest&&e.encryptedData){if(!pe)return{slug:e.slug,title:"[DATABASE LOCKED]",content:"Master passphrase required to unlock this database record.",tags:[],isSystem:e.isSystem,isEncrypted:!1,updatedAt:e.updatedAt};try{const t=await fe(e.encryptedData,pe),n=JSON.parse(t);return{slug:e.slug,title:n.title,content:n.content,tags:n.tags,isSystem:e.isSystem,isEncrypted:n.isEncrypted,signature:n.signature,updatedAt:n.updatedAt}}catch(t){return console.error("Failed to decrypt page at rest:",t),null}}return e}async function Ke(o){if(localStorage.getItem("secops-wiki-db-encrypted")==="true"&&pe){const t={title:o.title,content:o.content,tags:o.tags,isEncrypted:o.isEncrypted,signature:o.signature,updatedAt:o.updatedAt},n=await ot(JSON.stringify(t),pe),s={slug:o.slug,title:"[REDACTED AT REST]",content:"[REDACTED AT REST]",tags:[],isSystem:o.isSystem,isEncryptedAtRest:!0,encryptedData:n,updatedAt:o.updatedAt};await dn(s)}else await dn(o);localStorage.setItem("secops-wiki-last-update",Date.now().toString())}async function uo(){const o=await Ht(),e=[];for(const t of o){const n=await je(t.slug);n&&e.push(n)}return e}async function fo(){try{const o=await gs();rn={},o.forEach(e=>{rn[e.tag]=e.color})}catch{rn={}}}function Ha(o){const e=rn[o]||"slate";let t="bg-slate-950/20 text-slate-400 border-slate-900/30";return e==="emerald"?t="bg-emerald-950/20 text-emerald-400 border-emerald-900/30":e==="blue"?t="bg-blue-950/20 text-blue-400 border-blue-900/30":e==="red"?t="bg-red-950/20 text-red-400 border-red-900/30":e==="amber"&&(t="bg-amber-950/20 text-amber-400 border-amber-900/30"),`
    <span class="text-[10px] font-mono px-2 py-0.5 rounded border ${t}">#${R(o)}</span>
  `}function Fa(o){const e=ke.filter(a=>a.slug!==re);if(e.length===0)return;e.sort((a,i)=>i.title.length-a.title.length);const t=a=>a.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"),n=[],s=document.createTreeWalker(o,NodeFilter.SHOW_TEXT,{acceptNode:a=>{let i=a.parentElement;for(;i&&i!==o;){const l=i.tagName.toLowerCase();if(l==="a"||l==="code"||l==="pre")return NodeFilter.FILTER_REJECT;i=i.parentElement}return NodeFilter.FILTER_ACCEPT}});let r=s.nextNode();for(;r;)n.push(r),r=s.nextNode();for(const a of n){const i=a.parentNode;if(!i)continue;let l=a.nodeValue||"";for(const d of e){if(d.isEncrypted&&!F&&nt)continue;const g=t(d.title),m=t(d.slug),h=new RegExp(`\\b(${g}|${m})\\b`,"i").exec(l);if(h){const P=h[0],x=h.index,D=l.substring(0,x),K=l.substring(x+P.length),G=document.createTextNode(D),L=document.createElement("a");L.href=`#/page/${d.slug}`,L.className="autolink text-teal-400 hover:text-teal-350 underline decoration-dotted transition",L.textContent=P;const b=document.createTextNode(K);i.insertBefore(G,a),i.insertBefore(L,a),i.insertBefore(b,a),i.removeChild(a);break}}}}function Wa(o){if(!o||o==="system"||o==="graph")return;let e=[];try{e=JSON.parse(sessionStorage.getItem("secops-wiki-breadcrumbs")||"[]")}catch{}Array.isArray(e)||(e=[]),e=e.filter(t=>t!==o),e.unshift(o),e.length>5&&(e=e.slice(0,5)),sessionStorage.setItem("secops-wiki-breadcrumbs",JSON.stringify(e))}function qa(o){const e=ke.find(n=>n.slug===o);return e?e.isEncrypted&&!F&&nt?"[REDACTED CORE]":e.title:o}let F=null,zn=!1,Pe=0,an=!1,ln=-1,Jn="";function Ga(){return parseInt(localStorage.getItem("secops-decrypt-failed-attempts")||"0",10)}function Os(o){localStorage.setItem("secops-decrypt-failed-attempts",o.toString())}function Qn(){return parseInt(localStorage.getItem("secops-decrypt-lockout-until")||"0",10)}function Ns(o){localStorage.setItem("secops-decrypt-lockout-until",o.toString())}function rs(){return Date.now()<Qn()}function Va(){const o=Ga()+1;if(Os(o),o>=3){const e=3e5*Math.pow(2,o-3);Ns(Date.now()+e)}}function Ka(){Os(0),Ns(0)}let jn=null;function mo(){jn&&clearTimeout(jn);const o=parseInt(localStorage.getItem("secops-wiki-session-timeout")||"15",10);o!==0&&(jn=setTimeout(()=>{F&&(F=null,alert(`SECURITY TIMEOUT: Session idle for ${o} minutes. Passphrase keys wiped from memory.`),window.location.hash.startsWith("#/page/")?window.location.hash="#/page/home":Le())},o*60*1e3))}["mousedown","mousemove","keydown","scroll","touchstart"].forEach(o=>{window.addEventListener(o,mo,{passive:!0})});mo();let it=null;document.addEventListener("copy",()=>{var e;document.body.classList.contains("encrypted-page-active")?(e=window.getSelection())!=null&&e.toString()&&Ps():it&&(clearTimeout(it),it=null)});function Ps(){it&&clearTimeout(it),it=setTimeout(async()=>{try{await navigator.clipboard.writeText("[SECURE WIPE: Decrypted secret cleared from clipboard]"),Ya(),await ge("CLIPBOARD_WIPE","Automatically cleared decrypted secret from clipboard.")}catch(o){console.warn("Clipboard wipe failed:",o)}it=null},3e4)}function Ya(){const o=document.getElementById("clipboard-wipe-toast");o&&o.remove();const e=document.createElement("div");e.id="clipboard-wipe-toast",e.className="fixed bottom-4 left-4 z-50 glass-panel border border-red-500/30 p-3 rounded-xl shadow-xl font-mono text-[10px] text-red-400 select-none animate-fade-in",e.innerHTML="⚠️ SECURITY WIPE: Decrypted secret cleared from clipboard.",document.body.appendChild(e),setTimeout(()=>{e.classList.add("opacity-0","transition-opacity","duration-500"),setTimeout(()=>e.remove(),500)},3e3)}function Ms(o){if(o.length<8)return{valid:!1,message:"Password must be at least 8 characters long."};let e=!1,t=!1,n=!1,s=!1;const r=/[!@#$%^&*(),.?":{}|<>_+\\-]/;for(const a of o)a>="A"&&a<="Z"?e=!0:a>="a"&&a<="z"?t=!0:a>="0"&&a<="9"?n=!0:r.test(a)&&(s=!0);return!e||!t||!n||!s?{valid:!1,message:"Password must include uppercase, lowercase, numbers, and special symbols (!@#$%^&*, etc.)."}:{valid:!0,message:""}}function as(){F&&(F=null,alert("QUICK LOCK: In-memory session keys cleared. Documents locked."),window.location.hash="#/page/home",Le())}let on=0,Hn=null;window.addEventListener("keydown",o=>{o.key==="Escape"&&(on++,Hn&&clearTimeout(Hn),on>=3?(on=0,as()):Hn=setTimeout(()=>{on=0},1e3)),o.ctrlKey&&o.shiftKey&&o.key.toLowerCase()==="l"&&(o.preventDefault(),as())});function Bs(){const o=document.documentElement,e=document.getElementById("theme-icon-path");wt==="light"?(o.classList.add("light-theme"),e&&e.setAttribute("d","M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z")):(o.classList.remove("light-theme"),e&&e.setAttribute("d","M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z"))}function Us(){wt=wt==="dark"?"light":"dark",localStorage.setItem("secops-wiki-theme",wt),Bs()}function Za(o,e){if(!e||e.trim().length===0)return o;const t=e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"),n=new RegExp(`(?![^<>]*>)(${t})`,"gi");return o.replace(n,'<mark class="bg-teal-500/30 text-teal-300 px-0.5 rounded font-medium">$1</mark>')}function Xa(o){const e=o.toLowerCase().trim();return/(sec|security|critical|panic|destruct|lock|key|auth)/.test(e)?{bg:"rgba(239, 68, 68, 0.15)",text:"#f87171",border:"rgba(239, 68, 68, 0.3)",className:"tag-color-red"}:/(doc|manual|wiki|guide|system|dashboard|home)/.test(e)?{bg:"rgba(20, 184, 166, 0.15)",text:"#2dd4bf",border:"rgba(20, 184, 166, 0.3)",className:"tag-color-teal"}:/(config|settings|sys|admin|db|telemetry)/.test(e)?{bg:"rgba(59, 130, 246, 0.15)",text:"#60a5fa",border:"rgba(59, 130, 246, 0.3)",className:"tag-color-blue"}:/(warning|caution|issue|bug|fix)/.test(e)?{bg:"rgba(245, 158, 11, 0.15)",text:"#fbbf24",border:"rgba(245, 158, 11, 0.3)",className:"tag-color-amber"}:{bg:"rgba(148, 163, 184, 0.15)",text:"#cbd5e1",border:"rgba(148, 163, 184, 0.3)",className:"tag-color-slate"}}function zs(o,e){const t=e.toLowerCase().trim();if(!t)return 0;let n=0;const s=o.title.toLowerCase(),r=o.content.toLowerCase(),a=o.tags.map(i=>i.toLowerCase());if(s===t?n+=100:s.startsWith(t)?n+=80:s.includes(t)&&(n+=50),a.forEach(i=>{i===t?n+=30:i.includes(t)&&(n+=15)}),r.includes(t)){n+=10;const i=r.split(t).length-1;n+=Math.min(10,i)}return n}function is(o){const e=new Uint32Array(256);for(let n=0;n<256;n++){let s=n;for(let r=0;r<8;r++)s=s&1?3988292384^s>>>1:s>>>1;e[n]=s}let t=4294967295;for(let n=0;n<o.length;n++)t=e[(t^o[n])&255]^t>>>8;return(t^4294967295)>>>0}function js(o){const e=new TextEncoder,t=[],n=[];let s=0;o.forEach(d=>{n.push(s);const p=e.encode(d.name),g=e.encode(d.content),m=is(g),u=new ArrayBuffer(30),h=new DataView(u);h.setUint32(0,67324752,!0),h.setUint16(4,10,!0),h.setUint16(6,0,!0),h.setUint16(8,0,!0),h.setUint16(10,0,!0),h.setUint16(12,0,!0),h.setUint32(14,m,!0),h.setUint32(18,g.length,!0),h.setUint32(22,g.length,!0),h.setUint16(26,p.length,!0),h.setUint16(28,0,!0);const P=new Uint8Array(u);t.push(P),t.push(p),t.push(g),s+=P.length+p.length+g.length});const r=s;let a=0;o.forEach((d,p)=>{const g=e.encode(d.name),m=e.encode(d.content),u=is(m),h=n[p],P=new ArrayBuffer(46),x=new DataView(P);x.setUint32(0,33639248,!0),x.setUint16(4,20,!0),x.setUint16(6,10,!0),x.setUint16(8,0,!0),x.setUint16(10,0,!0),x.setUint16(12,0,!0),x.setUint16(14,0,!0),x.setUint32(16,u,!0),x.setUint32(20,m.length,!0),x.setUint32(24,m.length,!0),x.setUint16(28,g.length,!0),x.setUint16(30,0,!0),x.setUint16(32,0,!0),x.setUint16(34,0,!0),x.setUint16(36,0,!0),x.setUint32(38,32,!0),x.setUint32(42,h,!0);const D=new Uint8Array(P);t.push(D),t.push(g),a+=D.length+g.length,s+=D.length+g.length});const i=new ArrayBuffer(22),l=new DataView(i);return l.setUint32(0,101010256,!0),l.setUint16(4,0,!0),l.setUint16(6,0,!0),l.setUint16(8,o.length,!0),l.setUint16(10,o.length,!0),l.setUint32(12,a,!0),l.setUint32(16,r,!0),l.setUint16(20,0,!0),t.push(new Uint8Array(i)),new Blob(t,{type:"application/zip"})}const pt=new BroadcastChannel("wiki-db-sync");pt.onmessage=async o=>{o.data==="refresh"&&(await Ae(),await Le())};let eo=localStorage.getItem("secops-wiki-last-update")||"0";window.addEventListener("focus",async()=>{const o=localStorage.getItem("secops-wiki-last-update")||"0";o!==eo&&(eo=o,await Ae(),await Le())});let Fn=null;const Ja=15*60*1e3;let Hs;async function Qa(){Bs(),Hs=document.getElementById("app"),await oo(),await fo();try{await to()}catch(e){console.warn("Failed to purge expired pages on init:",e)}try{await hs(30)}catch(e){console.warn("Failed to auto-prune audit logs on init:",e)}ti(),localStorage.getItem("secops-wiki-db-encrypted")==="true"&&!pe?ki():(await Ae(),Fs(),qs(),window.addEventListener("hashchange",gn),window.addEventListener("online",mn),window.addEventListener("offline",mn),window.addEventListener("beforeinstallprompt",e=>{e.preventDefault(),Pt=e;const t=document.getElementById("pwa-install-btn");t&&t.classList.remove("hidden")}),window.addEventListener("keydown",e=>{var t,n;if((e.ctrlKey&&e.key==="k"||e.ctrlKey&&e.key==="K")&&(e.preventDefault(),jt()),e.key==="/"&&((t=document.activeElement)==null?void 0:t.tagName)!=="INPUT"&&((n=document.activeElement)==null?void 0:n.tagName)!=="TEXTAREA"&&(e.preventDefault(),jt()),e.ctrlKey&&e.altKey&&(e.key==="e"||e.key==="E"))if(e.preventDefault(),Xe){const s=document.getElementById("edit-page-form");s&&s.requestSubmit()}else re&&re!=="home"&&re!=="system"&&(window.location.hash=`#/edit/${re}`)}),gn(),setInterval(async()=>{try{await to()}catch(e){console.warn("Failed periodic expired page purge:",e)}},3e4))}function yt(){Fn&&clearTimeout(Fn),Fn=setTimeout(ei,Ja)}function ei(){const o=document.getElementById("idle-lock-screen");if(!o)return;const e=localStorage.getItem("secops-wiki-db-encrypted")==="true";e&&(pe=null,F=null,Le().catch(()=>{}));const t=localStorage.getItem("secops-wiki-webauthn-gate")==="true";if(e){o.innerHTML=`
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
    `;const n=o.querySelector("#idle-unlock-form"),s=o.querySelector("#idle-unlock-password-input"),r=o.querySelector("#idle-lock-error"),a=o.querySelector("#idle-unlock-biometric-btn");setTimeout(()=>s==null?void 0:s.focus(),50),n.addEventListener("submit",async i=>{i.preventDefault(),r.classList.add("hidden");const l=s.value;try{const d=await Ie(l);await St(d)?(pe=d,await Ae(),Wn(),await Le(),await ge("SESSION_RESTORE","Restored session via master passphrase.")):r.classList.remove("hidden")}catch{r.classList.remove("hidden")}}),a&&a.addEventListener("click",async()=>{r.classList.add("hidden");try{const i=localStorage.getItem("secops-wiki-webauthn-payload")||"",l=crypto.getRandomValues(new Uint8Array(32)),d=await navigator.credentials.get({publicKey:{challenge:l,rpId:window.location.hostname||"localhost",userVerification:"required",timeout:6e4}});if(d){const p=new Uint8Array(d.rawId),g=Array.from(p).map(K=>K.toString(16).padStart(2,"0")).join(""),m=localStorage.getItem("secops-wiki-webauthn-salt")||"";if(!m)throw new Error("Biometric salt missing.");const u=`${g}:${m}`,h=await Ie(u),P=await fe(i,h),x=await Ie(P);await St(x)?(pe=x,await Ae(),Wn(),await Le(),await ge("SESSION_RESTORE_BIOMETRIC","Restored session via biometric WebAuthn verification.")):r.classList.remove("hidden")}}catch(i){alert(`Biometric verification failed: ${i.message}`),await ge("WEBAUTHN_FAIL",`Idle lock biometric unlock failed: ${i.message}`)}})}else o.innerHTML=`
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
    `,o.querySelector("#idle-unlock-btn").addEventListener("click",()=>{Wn()});o.classList.remove("hidden")}function Wn(){const o=document.getElementById("idle-lock-screen");o&&o.classList.add("hidden"),yt()}function Fs(){let o=document.getElementById("idle-lock-screen");o||(o=document.createElement("div"),o.id="idle-lock-screen",o.className="fixed inset-0 bg-[#090d16]/95 backdrop-blur-md z-50 flex flex-col items-center justify-center hidden",document.body.appendChild(o)),yt(),window.addEventListener("mousemove",yt,{passive:!0}),window.addEventListener("keydown",yt,{passive:!0}),window.addEventListener("click",yt,{passive:!0}),window.addEventListener("scroll",yt,{passive:!0})}function ls(){if(document.getElementById("pwa-update-toast"))return;const o=document.createElement("div");o.id="pwa-update-toast",o.className="fixed bottom-4 right-4 z-50 max-w-sm glass-panel border border-teal-500/30 p-4 rounded-xl shadow-2xl glow-border flex items-center justify-between gap-4 font-mono text-xs select-none",o.innerHTML=`
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
  `,document.body.appendChild(o);const e=document.getElementById("pwa-update-reload-btn");e&&e.addEventListener("click",()=>{window.location.reload()})}function ti(){"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/wiki/sw.js").then(o=>{console.log("ServiceWorker registered successfully with scope: ",o.scope),o.waiting&&ls(),o.addEventListener("updatefound",()=>{const e=o.installing;e&&e.addEventListener("statechange",()=>{e.state==="installed"&&navigator.serviceWorker.controller&&ls()})})}).catch(o=>{console.error("ServiceWorker registration failed: ",o)})})}function mn(){$s=navigator.onLine?"SECURE_LINK":"OFFLINE_CACHE";const o=document.getElementById("system-status-indicator"),e=document.getElementById("system-status-label");o&&e&&(navigator.onLine?(o.className="w-2 h-2 rounded-full bg-emerald-400 glow-text-emerald pulse-indicator",e.innerText="SECURE_LINK",e.className="text-xs text-emerald-400 font-mono tracking-wider"):(o.className="w-2 h-2 rounded-full bg-amber-500 pulse-indicator",e.innerText="OFFLINE_CACHE",e.className="text-xs text-amber-500 font-mono tracking-wider"))}async function Ae(){ke=await uo(),await vi(),eo=localStorage.getItem("secops-wiki-last-update")||"0"}async function to(){const o=await Ht(),e=Date.now();let t=!1;for(const n of o)n.expiresAt&&e>n.expiresAt&&(await us(n.slug),await ge("SELF_DESTRUCT_EXPIRY",`Intel Entry "${n.title}" (slug: ${n.slug}) has self-destructed due to lease expiration.`),t=!0,re===n.slug&&(re="home",window.location.hash="#/page/home"));t&&(await Ae(),await Le(),pt.postMessage("refresh"))}async function gn(){await to();const o=window.location.hash||"#/page/home";Xe=!1,Ne=!1;let e="";if(o.startsWith("#/page/")){const n=o.replace("#/page/","").split("#");re=n[0],n.length>1&&(e=n[1])}else o.startsWith("#/edit/")?(re=o.replace("#/edit/",""),Xe=!0):o==="#/new"?(Xe=!0,Ne=!0,re=""):o==="#/system"?re="system":o==="#/graph"?re="graph":o.startsWith("#/import-p2p")?re="import-p2p":re="home";!Xe&&re&&re!=="system"&&re!=="graph"&&Wa(re),await Le(),e&&setTimeout(()=>{const t=document.getElementById(e);t&&t.scrollIntoView({behavior:"smooth"})},50)}function cs(o){const e=o.filter(r=>r.isSystem),t=o.filter(r=>!r.isSystem&&r.isEncrypted),n=o.filter(r=>!r.isSystem&&!r.isEncrypted);let s="";return e.length>0&&(s+=`
      <div class="mb-4">
        <div class="px-3 mb-1.5 text-[9px] font-bold text-slate-500 uppercase tracking-widest font-mono flex items-center gap-1 select-none">
          ⚙️ SYSTEM PROCEDURES
        </div>
        <div class="space-y-0.5">
          ${e.map(r=>qn(r)).join("")}
        </div>
      </div>
    `),t.length>0&&(s+=`
      <div class="mb-4">
        <div class="px-3 mb-1.5 text-[9px] font-bold text-red-400/80 uppercase tracking-widest font-mono flex items-center gap-1 select-none">
          🔒 SECURE CORES
        </div>
        <div class="space-y-0.5">
          ${t.map(r=>qn(r)).join("")}
        </div>
      </div>
    `),n.length>0&&(s+=`
      <div class="mb-4">
        <div class="px-3 mb-1.5 text-[9px] font-bold text-teal-400/80 uppercase tracking-widest font-mono flex items-center gap-1 select-none">
          📄 OPERATIONAL INTEL
        </div>
        <div class="space-y-0.5">
          ${n.map(r=>qn(r)).join("")}
        </div>
      </div>
    `),s}function qn(o){const e=re===o.slug&&!Xe,t=o.isEncrypted&&!F&&nt,n=t?"[REDACTED CORE]":o.title,s=t?"javascript:void(0)":`#/page/${o.slug}`,r=t?`onclick="alert('SECURITY WARNING: Document is locked. Enter passphrase to decrypt cores first.');"`:"";let a="";if(ze.trim().length>0){const i=o.isEncrypted&&!F,l=kt.find(d=>d.slug===o.slug)||o;if(!i&&l.content){const d=l.content.toLowerCase().indexOf(ze.toLowerCase());if(d!==-1){const p=Math.max(0,d-20),g=Math.min(l.content.length,d+ze.length+30);let m=l.content.substring(p,g);p>0&&(m="..."+m),g<l.content.length&&(m=m+"...");const u=R(m),h=new RegExp(`(${ze.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")})`,"gi");a=`<div class="text-[10px] text-slate-500 font-mono mt-1 pl-4 break-all whitespace-normal leading-normal">${u.replace(h,'<span class="bg-teal-950 text-teal-350 px-0.5 rounded font-bold">$1</span>')}</div>`}}}return`
    <a href="${s}" ${r} class="block px-3 py-2 rounded-lg text-xs font-mono transition group ${e?"bg-teal-950/30 text-teal-400 font-bold border-l-2 border-teal-500":"text-slate-450 hover:bg-slate-900/40 hover:text-slate-200"}">
      <div class="flex items-center justify-between">
        <span class="truncate flex items-center gap-1.5">
          ${o.isEncrypted?'<span class="text-red-450 text-[9px]">🔒</span>':'<span class="text-slate-650 group-hover:text-slate-500 text-[9px]">⊙</span>'}
          ${R(n)}
        </span>
      </div>
      ${a}
    </a>
  `}async function Le(){await Ae();let o=ke;ze.trim().length>0&&(o=o.map(u=>({page:u,score:zs(kt.find(h=>h.slug===u.slug)||u,ze)})).filter(u=>u.score>0).sort((u,h)=>h.score-u.score).map(u=>u.page)),Ot&&(o=o.filter(u=>u.tags.includes(Ot)));const e=Array.from(new Set(ke.flatMap(u=>u.tags)));Hs.innerHTML=`
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
            <span id="system-status-label" class="text-xs ${navigator.onLine?"text-emerald-400":"text-amber-500"} font-mono tracking-wider">${$s}</span>
          </div>
          <div class="h-4 w-px bg-slate-800"></div>
          <div class="flex items-center gap-2">
            <span class="text-xs text-slate-500 font-mono">CSP INTEGRITY:</span>
            <span class="text-xs text-teal-400 font-mono glow-text-cyan">ENFORCED</span>
          </div>
        </div>

        <!-- Theme Toggle Button -->
        <button id="theme-toggle-btn" class="p-1.5 text-slate-400 hover:text-white rounded-lg focus:outline-none hover:bg-slate-900/50 transition" aria-label="Toggle Theme">
          <svg class="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path id="theme-icon-path" stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
          </svg>
        </button>

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
            <kbd class="text-[9px] bg-slate-900 border border-slate-800 text-slate-400 px-1.5 py-0.5 rounded font-mono select-none uppercase scale-90">Ctrl+K</kbd>
          </button>
        </div>

        <!-- Tag Filter Cloud -->
        ${e.length>0?`
          <div class="px-4 py-2 border-b border-slate-800/80 flex flex-wrap gap-1 max-h-24 overflow-y-auto shrink-0 select-none">
            <button class="tag-badge px-1.5 py-0.5 text-[9px] rounded-full font-mono transition ${Ot?"bg-slate-900 text-slate-400 hover:bg-slate-850":"bg-teal-500 text-slate-950 font-bold shadow-[0_0_8px_rgba(20,184,166,0.3)]"}" data-tag="">#ALL</button>
            ${e.map(u=>{const h=Xa(u);return`
                <button class="tag-badge px-1.5 py-0.5 text-[9px] rounded-full font-mono transition ${Ot===u?"bg-teal-500 text-slate-950 font-bold shadow-[0_0_8px_rgba(20,184,166,0.3)]":`${h.className} hover:opacity-85`}" data-tag="${R(u)}">#${R(u.toUpperCase())}</button>
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
            ${cs(o)}
            ${o.length===0?`
              <div class="text-center py-6 text-xs text-slate-650 font-mono">No entries found</div>
            `:""}
          </div>

          <div class="px-3 mb-2 mt-6 flex items-center justify-between border-t border-slate-900/60 pt-4 select-none shrink-0">
            <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">🏷️ Tag Explorer</span>
          </div>
          <div id="tag-tree-container" class="space-y-1 px-1 max-h-48 overflow-y-auto pr-1">
            ${Ys(Ci(o))}
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

      <!-- Center content portal -->
      <main class="flex-1 overflow-y-auto bg-gradient-to-b from-[#0a0f1d] to-[#090d16] p-4 md:p-8">
        <div class="max-w-4xl mx-auto">
          <div id="main-content">
            <!-- Loading placeholder resolved dynamically -->
          </div>
        </div>
      </main>
    </div>
  `;const t=document.getElementById("wiki-search-input");t&&t.addEventListener("input",u=>{ze=u.target.value;const h=kt.filter(x=>x.title.toLowerCase().includes(ze.toLowerCase())||x.content.toLowerCase().includes(ze.toLowerCase())||x.tags.some(D=>D.toLowerCase().includes(ze.toLowerCase()))),P=document.getElementById("pages-list");P.innerHTML=cs(h),h.length===0&&(P.innerHTML='<div class="text-center py-6 text-xs text-slate-650 font-mono">No entries found</div>')});const n=document.getElementById("pwa-install-btn");n&&n.addEventListener("click",async()=>{if(Pt){Pt.prompt();const{outcome:u}=await Pt.userChoice;u==="accepted"&&console.log("User accepted the PWA install prompt"),Pt=null,n.classList.add("hidden")}});const s=document.getElementById("system-panic-btn");s&&s.addEventListener("click",async()=>{if(confirm("CRITICAL SYSTEM COMPROMISE PROTOCOL: Purge entire local database, clear all service worker caches, unregister service workers, and force self-destruct reload immediately?")){if(indexedDB.deleteDatabase("secops-wiki-db"),"caches"in window){const u=await caches.keys();await Promise.all(u.map(h=>caches.delete(h)))}if("serviceWorker"in navigator){const u=await navigator.serviceWorker.getRegistrations();await Promise.all(u.map(h=>h.unregister()))}localStorage.clear(),sessionStorage.clear(),F=null,window.history.replaceState(null,"","about:blank"),window.location.replace("about:blank")}});const r=document.getElementById("sidebar-toggle-btn"),a=document.getElementById("sidebar-close-btn"),i=document.getElementById("sidebar-backdrop"),l=()=>{const u=document.getElementById("sidebar"),h=document.getElementById("sidebar-backdrop");u&&h&&(u.classList.add("-translate-x-full"),h.classList.add("hidden"))},d=()=>{const u=document.getElementById("sidebar"),h=document.getElementById("sidebar-backdrop");u&&h&&(u.classList.remove("-translate-x-full"),h.classList.remove("hidden"))};r&&r.addEventListener("click",d),a&&a.addEventListener("click",l),i&&i.addEventListener("click",l),document.querySelectorAll("#sidebar a").forEach(u=>{u.addEventListener("click",()=>{window.innerWidth<768&&l()})});const g=document.getElementById("theme-toggle-btn");g&&g.addEventListener("click",Us),document.querySelectorAll(".tag-badge").forEach(u=>{u.addEventListener("click",async h=>{Ot=h.currentTarget.getAttribute("data-tag")||"",await Le()})});const m=document.getElementById("tag-tree-container");m&&(m.addEventListener("click",u=>{const h=u.target.closest(".tree-folder-header");if(h){const P=h.nextElementSibling,x=h.querySelector(".tree-folder-icon");if(P){const D=P.classList.toggle("hidden");x&&(x.style.transform=D?"rotate(0deg)":"rotate(90deg)")}}}),m.addEventListener("keydown",u=>{var K,G;const h=document.activeElement;if(!h||!m.contains(h))return;const x=Array.from(m.querySelectorAll(".tree-folder-header, .tree-folder-children a")).filter(L=>{let b=L.parentElement;for(;b&&b!==m;){if(b.classList.contains("tree-folder-children")&&b.classList.contains("hidden"))return!1;b=b.parentElement}return!0}),D=x.indexOf(h);if(D!==-1){if(u.key==="ArrowDown"){u.preventDefault();const L=(D+1)%x.length;(K=x[L])==null||K.focus()}else if(u.key==="ArrowUp"){u.preventDefault();const L=(D-1+x.length)%x.length;(G=x[L])==null||G.focus()}else if(u.key==="Enter")u.preventDefault(),h.click();else if(u.key==="ArrowRight"){if(u.preventDefault(),h.classList.contains("tree-folder-header")){const L=h.nextElementSibling,b=h.querySelector(".tree-folder-icon");L&&L.classList.contains("hidden")&&(L.classList.remove("hidden"),b&&(b.style.transform="rotate(90deg)"))}}else if(u.key==="ArrowLeft"&&(u.preventDefault(),h.classList.contains("tree-folder-header"))){const L=h.nextElementSibling,b=h.querySelector(".tree-folder-icon");L&&!L.classList.contains("hidden")&&(L.classList.add("hidden"),b&&(b.style.transform="rotate(0deg)"))}}})),await ni()}async function ni(){const o=document.getElementById("main-content");if(re==="graph"){await yi(o);return}if(re==="system"){zt(o);return}if(re==="import-p2p"){await Di(o);return}if(Xe){await Ws(o);return}await hn(o)}async function hn(o){const e=await je(re);if(!e){o.innerHTML=`
      <div class="text-center py-20 bg-slate-950/40 border border-red-950/20 rounded-xl px-6 glow-border">
        <svg class="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
        </svg>
        <h2 class="text-2xl font-bold font-mono text-white mb-2 uppercase">DATA_MISSING</h2>
        <p class="text-slate-400 text-sm max-w-md mx-auto mb-6">Requested intel document slug "${R(re)}" is not registered in index database.</p>
        <a href="#/new" class="px-4 py-2 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 font-mono text-xs uppercase rounded transition hover:text-white">
          Create New Document
        </a>
      </div>
    `;return}const t=await Ei(e.slug);let n=e.content,s=!1;if(e.isEncrypted)if(F)try{n=await fe(e.content,F)}catch{s=!0}else s=!0;if(s){const N=rs();let Z="";if(N&&(Z=`<p class="text-red-500 text-xs font-mono font-bold mt-2 animate-pulse uppercase">SECURITY LOCKOUT: Too many failures. Locked out for ${Math.ceil((Qn()-Date.now())/1e3)}s.</p>`),o.innerHTML=`
      <div class="max-w-md mx-auto my-20 p-6 glass-panel border border-teal-900/30 rounded-xl text-center glow-border select-none">
        <svg class="w-16 h-16 text-teal-500 mx-auto mb-4 animate-pulse" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        <h2 class="text-xl font-bold font-mono text-white mb-2 uppercase">DECRYPT_REQUIRED</h2>
        <p class="text-slate-400 text-xs font-mono mb-6">This document payload is encrypted. Enter passphrase to decrypt.</p>
        <form id="decrypt-doc-form" class="space-y-4">
          <input type="password" id="decrypt-password-input" placeholder="Enter security passphrase..." ${N?"disabled":""} class="w-full bg-slate-950/80 border border-slate-800 focus:border-teal-500/50 rounded-lg p-2.5 text-base text-slate-200 focus:outline-none transition font-mono text-center disabled:opacity-40 disabled:cursor-not-allowed">
          <button type="submit" ${N?"disabled":""} class="w-full py-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-mono text-xs uppercase rounded font-bold transition shadow-[0_0_10px_rgba(20,184,166,0.2)] disabled:opacity-40 disabled:cursor-not-allowed">
            DECRYPT IN-MEMORY
          </button>
        </form>
        <div id="decrypt-lockout-timer">${Z}</div>
      </div>
    `,N){const U=setInterval(async()=>{const A=Math.ceil((Qn()-Date.now())/1e3),S=document.getElementById("decrypt-lockout-timer");A<=0?(clearInterval(U),await hn(o)):S&&(S.innerHTML=`<p class="text-red-500 text-xs font-mono font-bold mt-2 animate-pulse uppercase">SECURITY LOCKOUT: Too many failures. Locked out for ${A}s.</p>`)},1e3)}setTimeout(()=>{const U=document.getElementById("decrypt-password-input");U==null||U.focus()},50),document.getElementById("decrypt-doc-form").addEventListener("submit",async U=>{if(U.preventDefault(),rs()){alert("Security Lockout active.");return}const A=document.getElementById("decrypt-password-input").value;try{const S=await Ie(A);await fe(e.content,S),Ka(),F=S,await Le()}catch{Va(),alert("Security Alert: Authentication failed. Invalid security passphrase."),await hn(o)}});return}const r=n.split(/\s+/).filter(N=>N.length>0).length,a=Math.max(1,Math.round(r/200)),i=Et(n),l=new Date(e.updatedAt).toLocaleString(),d=document.createElement("div");d.innerHTML=i,Fa(d);const p=d.innerHTML,g=Za(p,ze),m=d.querySelectorAll("h1, h2, h3");let u="";m.length>0&&(u=`
      <div class="hidden lg:block w-60 shrink-0 self-start sticky top-8">
        <div class="glass-panel border border-slate-800/80 rounded-xl p-4">
          <h4 class="text-xs font-bold font-mono text-slate-400 uppercase tracking-widest border-b border-slate-800/60 pb-2 mb-3">Outline</h4>
          <nav class="space-y-2 text-xs font-mono max-h-[350px] overflow-y-auto pr-1">
            ${Array.from(m).map(N=>{const Z=N.textContent||"",te=N.id||Z.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,""),U=N.tagName.toLowerCase(),A=U==="h1"?"pl-0 font-semibold":U==="h2"?"pl-3 border-l border-slate-800":"pl-6 border-l border-slate-800";return`
                <a href="#/page/${e.slug}#${te}" class="block text-slate-500 hover:text-teal-400 transition truncate ${A}" title="${R(Z)}">
                  ${R(Z)}
                </a>
              `}).join("")}
          </nav>
        </div>
      </div>
    `);const h=n.match(/^(\s*[-*] )\[ \]/gm)||[],P=n.match(/^(\s*[-*] )\[[xX]\]/gm)||[],x=h.length+P.length;let D="";if(x>0){const N=P.length,Z=Math.round(N/x*100),te=10,U=Math.round(N/x*te),A=te-U;D=`
      <div class="glass-panel border border-slate-800/80 p-3 rounded-lg flex items-center justify-between mb-6 text-[10px] sm:text-xs font-mono select-none">
        <div class="flex items-center gap-2 sm:gap-3">
          <span class="text-teal-400 font-bold">📋 TASK STATUS:</span>
          <span class="text-slate-400 font-bold">${"█".repeat(U)+"░".repeat(A)}</span>
          <span class="text-teal-400 font-bold">${Z}%</span>
        </div>
        <div class="text-slate-500">
          ${N}/${x} COMPLETED
        </div>
      </div>
    `}let K="";try{const N=JSON.parse(sessionStorage.getItem("secops-wiki-breadcrumbs")||"[]");N.length>1&&(K=`
        <div class="flex items-center gap-1.5 text-[10px] font-mono text-slate-500 mb-3 select-none overflow-x-auto whitespace-nowrap pb-1">
          <span class="text-slate-600 uppercase">RECENT:</span>
          ${N.map((Z,te)=>{const U=qa(Z),S=Z===e.slug?"text-teal-400 font-bold":"text-slate-450 hover:text-slate-350 transition",Q=te<N.length-1?'<span class="text-slate-850">/</span>':"";return`
              <a href="#/page/${Z}" class="${S}">${R(U)}</a>
              ${Q}
            `}).join("")}
        </div>
      `)}catch{}let G="";e.signature?await Ze(e)!==e.signature?G=`<span class="px-2 py-0.5 bg-red-950/40 text-red-400 border border-red-900/30 rounded text-[9px] font-mono font-bold animate-pulse">⚠️ INTEGRITY FAIL</span>
                            <button id="reconcile-integrity-btn" class="ml-1.5 px-2 py-0.5 bg-red-950/50 hover:bg-red-900/40 text-red-400 hover:text-white border border-red-900/30 hover:border-red-700 rounded text-[9px] font-mono font-bold uppercase transition">Reconcile</button>`:G='<span class="px-2 py-0.5 bg-emerald-950/40 text-emerald-400 border border-emerald-900/30 rounded text-[9px] font-mono font-bold">✓ INTEGRITY OK</span>':G='<span class="px-2 py-0.5 bg-amber-950/40 text-amber-400 border border-amber-900/30 rounded text-[9px] font-mono font-bold">⚠️ UNSIGNED</span>',e.isEncrypted?document.body.classList.add("encrypted-page-active"):document.body.classList.remove("encrypted-page-active");const L=e.classification||"UNCLASSIFIED";let b="border-emerald-500/20 text-emerald-400 bg-emerald-950/10",v="classification-glow-unclassified";L==="CONFIDENTIAL"?(b="border-blue-500/20 text-blue-400 bg-blue-950/10",v="classification-glow-confidential"):L==="SECRET"?(b="border-amber-500/20 text-amber-500 bg-amber-950/10",v="classification-glow-secret"):L==="TOP SECRET"&&(b="border-red-500/30 text-red-500 bg-red-950/10 animate-pulse",v="classification-glow-topsecret");const I=`
    <div class="border ${b} px-4 py-1.5 rounded-lg text-center text-[10px] font-bold font-mono uppercase tracking-widest select-none mb-6">
      ✦ ${L} ✦
    </div>
  `,Y=`
    <div class="border ${b} px-4 py-1.5 rounded-lg text-center text-[10px] font-bold font-mono uppercase tracking-widest select-none mt-8">
      ✦ ${L} ✦
    </div>
  `;o.innerHTML=`
    <div class="flex gap-8 items-start">
      <!-- Main Content Area -->
      <div class="flex-1 min-w-0 glass-panel border rounded-xl p-5 md:p-6 shadow-xl ${v}">
        <!-- Breadcrumb navigation trail -->
        ${K}
        
        <!-- Top Classification Banner -->
        ${I}
        <!-- Page Header telemetry -->
        <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between border-b border-slate-800 pb-6 mb-6 gap-4">
          <div>
            <h2 class="text-2xl md:text-3xl font-extrabold text-white font-mono tracking-tight">${R(e.title)}</h2>
            <div class="flex flex-wrap items-center gap-3 mt-3">
              <span class="text-xs font-mono text-slate-500 uppercase">SYS_REF: ${R(e.slug)}</span>
              <span class="h-3 w-px bg-slate-800"></span>
              <span class="text-xs font-mono text-slate-500 uppercase">UPDATED: ${l}</span>
              <span class="h-3 w-px bg-slate-800"></span>
              <span class="text-xs font-mono text-teal-400 uppercase">⏱️ ${a} MIN READ</span>
              ${G}
              <span class="h-3 w-px bg-slate-800"></span>
              ${e.tags.map(N=>Ha(N)).join("")}
            </div>
          </div>
          
          <div class="flex items-center gap-2 shrink-0 self-start sm:self-auto">
            <div class="relative inline-block text-left" id="page-export-dropdown-wrapper">
              <button id="page-export-dropdown-btn" class="flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-white text-slate-300 font-mono text-xs rounded transition uppercase">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                </svg>
                Export
              </button>
              <div id="page-export-menu" class="hidden absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-slate-950 border border-slate-800 ring-1 ring-black ring-opacity-5 z-20 divide-y divide-slate-800">
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

            <a href="#/edit/${e.slug}" class="flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-white text-slate-300 font-mono text-xs rounded transition uppercase">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
              </svg>
              Modify
            </a>
            ${e.isSystem?"":`
              <button id="delete-page-btn" class="flex items-center gap-2 px-3 py-1.5 bg-red-950/20 border border-red-900/30 hover:bg-red-900/30 text-red-400 hover:text-red-300 font-mono text-xs rounded transition uppercase">
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
              ${t.map((N,Z)=>`
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-3 first:pt-0">
                  <div class="min-w-0">
                    <p class="text-xs font-mono text-slate-300 break-words">REV_${t.length-Z} // ${R(N.title)}</p>
                    <p class="text-[10px] font-mono text-slate-500">${new Date(N.updatedAt).toLocaleString()}</p>
                  </div>
                  <button class="restore-rev-btn px-2.5 py-1 bg-slate-900 border border-slate-800 hover:border-slate-700 text-teal-400 hover:text-teal-300 font-mono text-[10px] rounded transition uppercase shrink-0 self-start sm:self-auto" data-rev-id="${R(N.id)}">
                    ROLLBACK
                  </button>
                </div>
              `).join("")}
              ${t.length===0?`
                <p class="text-[10px] font-mono text-slate-600">No revisions archived.</p>
              `:""}
            </div>
          </details>
        </div>
        ${Y}
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
  `;const z=document.getElementById("page-export-dropdown-btn"),$=document.getElementById("page-export-menu");if(z&&$){z.addEventListener("click",S=>{S.stopPropagation(),$.classList.toggle("hidden")}),document.addEventListener("click",()=>{$.classList.add("hidden")}),document.getElementById("export-single-md").addEventListener("click",async()=>{let S=e.content;if(e.isEncrypted&&F)try{S=await fe(e.content,F)}catch{}const Q=`---
title: ${e.title}
slug: ${e.slug}
tags: ${e.tags.join(", ")}
updated: ${new Date(e.updatedAt).toISOString()}
encrypted: ${!!e.isEncrypted}
---

`,j=new Blob([Q+S],{type:"text/markdown;charset=utf-8;"}),y=URL.createObjectURL(j),T=document.createElement("a");T.href=y,T.download=`${e.slug}.md`,document.body.appendChild(T),T.click(),document.body.removeChild(T),URL.revokeObjectURL(y)}),document.getElementById("export-single-html").addEventListener("click",async()=>{let S=e.content;if(e.isEncrypted&&F)try{S=await fe(e.content,F)}catch{}const Q=Et(S),j=`<!DOCTYPE html>
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
    Tags: ${e.tags.map(W=>`<span class="badge">#${R(W)}</span>`).join("")}
  </div>
  <article>
    ${Q}
  </article>
</body>
</html>`,y=new Blob([j],{type:"text/html;charset=utf-8;"}),T=URL.createObjectURL(y),B=document.createElement("a");B.href=T,B.download=`${e.slug}.html`,document.body.appendChild(B),B.click(),document.body.removeChild(B),URL.revokeObjectURL(T)}),document.getElementById("export-single-print").addEventListener("click",()=>{window.print()});const U=document.getElementById("export-single-p2p");U&&U.addEventListener("click",async()=>{let S=e.content;if(e.isEncrypted&&F)try{S=await fe(e.content,F)}catch{}const Q=prompt("Create a secure sharing passphrase for this peer link (min 4 characters):");if(Q){if(Q.length<4){alert("Security Requirement: Passphrase must be at least 4 characters long.");return}try{const j=await Ie(Q),y={title:e.title,content:S,tags:e.tags,classification:e.classification||"UNCLASSIFIED"},T=await ot(JSON.stringify(y),j),B=btoa(T),W=`${window.location.origin}${window.location.pathname}#/import-p2p?data=${encodeURIComponent(B)}&key=${encodeURIComponent(Q)}`;await navigator.clipboard.writeText(W),alert("✓ SECURE P2P LINK GENERATED: The encrypted link has been copied to your clipboard. Share it securely with your peer."),await ge("P2P_LINK_EXPORT",`Generated secure share link for document: ${e.title}`)}catch(j){alert(`Encryption error: Failed to generate sharing link - ${j.message}`)}}});const A=document.getElementById("reconcile-integrity-btn");A&&A.addEventListener("click",async()=>{if(!confirm(`RECONCILIATION NOTICE: Confirm restoration of document "${e.title}" to its last cryptographically verified historical revision? Unverified changes will be discarded.`))return;let Q=!1;for(const j of t)if(j.signature&&await Ze({slug:j.slug,title:j.title,content:j.content,updatedAt:j.updatedAt,tags:j.tags||[]})===j.signature){await Ke({slug:j.slug,title:j.title,content:j.content,updatedAt:Date.now(),tags:j.tags||[],classification:j.classification||"UNCLASSIFIED",isSystem:e.isSystem,isEncrypted:j.isEncrypted}),Q=!0;break}Q?(alert("✓ RECONCILIATION COMPLETED: The document has been restored to its last verified authentic state."),await Ae(),await Le()):(alert("⚠️ RECONCILIATION FAILED: No historical revision could be cryptographically verified. Check audit logs."),await ge("RECONCILE_FAILED",`Reconciliation failed for "${e.title}". No authentic revisions found.`))})}const J=document.getElementById("delete-page-btn");J&&J.addEventListener("click",async()=>{confirm(`CRITICAL SYSTEM NOTICE: Confirm total purge of intel document "${e.title}"? This action is irreversible.`)&&(await us(e.slug),localStorage.setItem("secops-wiki-last-update",Date.now().toString()),pt.postMessage("refresh"),window.location.hash="#/page/home")}),o.querySelectorAll("pre").forEach(N=>{const Z=document.createElement("div");Z.className="relative group",N.parentNode.insertBefore(Z,N),Z.appendChild(N);const te=document.createElement("button");te.className="absolute top-2 right-2 px-2 py-1 bg-slate-900/80 hover:bg-slate-800 text-[10px] text-slate-400 hover:text-white font-mono rounded opacity-0 group-hover:opacity-100 transition focus:opacity-100 border border-slate-800 focus:outline-none",te.textContent="COPY",te.addEventListener("click",()=>{var A;const U=((A=N.querySelector("code"))==null?void 0:A.textContent)||N.textContent||"";navigator.clipboard.writeText(U).then(()=>{te.textContent="COPIED",setTimeout(()=>te.textContent="COPY",2e3),document.body.classList.contains("encrypted-page-active")&&Ps()})}),Z.appendChild(te)}),o.querySelectorAll(".restore-rev-btn").forEach(N=>{N.addEventListener("click",async Z=>{const te=Z.currentTarget.getAttribute("data-rev-id"),U=t.find(A=>A.id===te);if(U&&confirm(`ROLLBACK COMMAND: Revert current page content to revision state "${U.title}" saved on ${new Date(U.updatedAt).toLocaleString()}?`)){const A=await je(e.slug);A&&await go({id:`${A.slug}-${Date.now()}`,slug:A.slug,title:A.title,content:A.content,updatedAt:Date.now(),tags:A.tags,classification:A.classification,signature:A.signature}),await Ke({slug:U.slug,title:U.title,content:U.content,updatedAt:Date.now(),tags:e.tags,isSystem:e.isSystem}),alert("Revision successfully restored."),await Ae(),await Le()}})}),o.querySelectorAll('.wiki-content input[type="checkbox"]').forEach((N,Z)=>{const te=N;te.removeAttribute("disabled"),te.classList.add("cursor-pointer","accent-teal-500"),te.addEventListener("change",async U=>{const A=U.target;await xi(e.slug,Z,A.checked)})}),await Ti(o),Ri(o)}async function Ws(o){let e="",t="",n="",s=[],r=!1,a=!1,i="UNCLASSIFIED",l=0;if(!Ne){const w=await je(re);if(w&&(e=w.title,t=w.slug,n=w.content,s=[...w.tags],r=!!w.isSystem,a=!!w.isEncrypted,i=w.classification||"UNCLASSIFIED",w.expiresAt&&w.updatedAt&&(l=Math.round((w.expiresAt-w.updatedAt)/6e4)),w.isEncrypted))if(F)try{n=await fe(w.content,F)}catch{n="ERROR: Decryption key mismatch. Please go back and re-decrypt."}else n="ERROR: This page is encrypted. Decrypt it in the reader view first."}const d=`secops-wiki-draft-${Ne?"new":re}`;let p="";const g=localStorage.getItem(d);if(g)try{const w=JSON.parse(g);e=w.title||e,n=w.content||n,Array.isArray(w.tags)?s=w.tags:typeof w.tags=="string"&&(s=w.tags.split(",").map(M=>M.trim()).filter(M=>M.length>0)),p=`
        <div id="draft-restore-banner" class="bg-teal-950/40 border border-teal-800 text-teal-400 p-3 rounded-lg text-xs font-mono mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <span>RESTORED DRAFT: Unsaved changes restored (${new Date(w.updatedAt).toLocaleTimeString()})</span>
          <button type="button" id="discard-draft-btn" class="underline hover:text-teal-300 font-bold shrink-0">DISCARD</button>
        </div>
      `}catch{}o.innerHTML=`
    <div class="glass-panel border border-slate-800 rounded-xl p-4 md:p-6 glow-border">
      <div class="border-b border-slate-800 pb-4 mb-6">
        <h2 class="text-xl font-bold font-mono text-white uppercase">${Ne?"Establish New Intel Entry":"Update Intel Entry"}</h2>
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
            <input type="text" id="edit-slug" value="${R(t)}" ${Ne?"":"disabled"} required pattern="^[a-z0-9-_]+$" placeholder="e.g. operational-manual" class="w-full bg-slate-950/80 border border-slate-800 focus:border-teal-500/50 rounded-lg p-2.5 text-base md:text-sm text-slate-200 focus:outline-none transition font-mono disabled:opacity-40 disabled:cursor-not-allowed">
            ${Ne?'<p class="text-[10px] text-slate-500 mt-1 font-mono">Only lowercase letters, numbers, hyphens, and underscores are allowed.</p>':""}
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
          <div class="flex flex-wrap gap-1 p-2 bg-slate-950/80 border border-slate-800 border-b-0 rounded-t-lg select-none items-center justify-between">
            <div class="flex flex-wrap gap-1">
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
            <a href="${Ne?"#/page/home":`#/page/${re}`}" id="cancel-edit-btn" class="px-4 py-2 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 font-mono text-xs uppercase rounded transition hover:text-white">
              Cancel
            </a>
            <button type="submit" class="px-4 py-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-mono text-xs uppercase rounded font-bold transition shadow-[0_0_10px_rgba(20,184,166,0.15)]">
              Commit Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  `;const m=document.getElementById("edit-page-form"),u=document.getElementById("edit-content"),h=document.getElementById("live-preview-box"),P=document.getElementById("cancel-edit-btn"),x=document.getElementById("discard-draft-btn"),D=document.getElementById("edit-tab-write"),K=document.getElementById("edit-tab-preview"),G=document.getElementById("edit-content-container"),L=document.getElementById("live-preview-container");D&&K&&G&&L&&(D.addEventListener("click",()=>{D.className="flex-1 py-2 text-center text-xs font-mono font-bold border-b-2 border-teal-500 text-teal-400",K.className="flex-1 py-2 text-center text-xs font-mono font-bold border-b-2 border-transparent text-slate-500",G.className="block",L.className="hidden md:block"}),K.addEventListener("click",()=>{K.className="flex-1 py-2 text-center text-xs font-mono font-bold border-b-2 border-teal-500 text-teal-400",D.className="flex-1 py-2 text-center text-xs font-mono font-bold border-b-2 border-transparent text-slate-500",L.className="block",G.className="hidden md:block"}));const b=()=>{const w=u.value;if(w.trim().length===0){h.innerHTML='<span class="text-slate-600 font-mono text-xs">No input content.</span>';return}h.innerHTML=Et(w)};function v(w){const M=w.trim().split(`
`);if(M.length<2)return w;const C=M.map(H=>{let ye=H.trim();return ye.startsWith("|")&&(ye=ye.slice(1)),ye.endsWith("|")&&(ye=ye.slice(0,-1)),ye.split("|").map(X=>X.trim())}),O=Math.max(...C.map(H=>H.length));if(O===0)return w;const q=Array(O).fill(0);for(let H=0;H<C.length;H++){const ye=H===1&&C[H].every(X=>/^:-*-*:?$/.test(X)||/^-+$/.test(X));for(let X=0;X<O;X++){const we=C[H][X]||"";!ye&&we.length>q[X]&&(q[X]=we.length)}}for(let H=0;H<O;H++)q[H]=Math.max(q[H],3);return C.map((H,ye)=>{const X=ye===1&&H.every(ie=>/^:-*-*:?$/.test(ie)||/^-+$/.test(ie));return`| ${Array(O).fill("").map((ie,Ce)=>{const he=H[Ce]||"";if(X){const _e=he.startsWith(":"),Tt=he.endsWith(":"),At=q[Ce]-(_e?1:0)-(Tt?1:0);return(_e?":":"")+"-".repeat(Math.max(1,At))+(Tt?":":"")}else return he.padEnd(q[Ce]," ")}).join(" | ")} |`}).join(`
`)}const I=document.getElementById("toolbar-sketch-btn");I&&I.addEventListener("click",()=>{Ai(u)}),Si(u);const Y=w=>{const M=u.selectionStart,C=u.selectionEnd,O=u.value,q=O.substring(M,C);let ae="";switch(w){case"bold":ae=`**${q||"bold_text"}**`;break;case"italic":ae=`*${q||"italic_text"}*`;break;case"header":ae=`
### ${q||"Header text"}
`;break;case"code":ae=`
\`\`\`javascript
${q||"// code here"}
\`\`\`
`;break;case"link":ae=`[${q||"Link text"}](url)`;break;case"table":if(q&&q.includes("|")&&q.includes(`
`))try{ae=`
`+v(q)+`
`}catch{ae=`
| Header 1 | Header 2 |
| -------- | -------- |
| Cell 1   | Cell 2   |
`}else ae=`
| Header 1 | Header 2 |
| -------- | -------- |
| Cell 1   | Cell 2   |
`;break;case"checklist":ae=`
- [ ] ${q||"Task description"}
`;break}u.value=O.substring(0,M)+ae+O.substring(C),u.focus(),u.selectionStart=M+ae.length,u.selectionEnd=M+ae.length,b()};o.querySelectorAll(".format-btn").forEach(w=>{w.addEventListener("click",M=>{const C=M.currentTarget.getAttribute("data-format")||"";Y(C)})}),u.addEventListener("keyup",w=>{const M=u.value,C=u.selectionStart;if(M.substring(C-2,C)==="[[")an=!0,ln=C,Jn="",gi(u);else if(an){if(w.key==="Escape"||w.key==="ArrowUp"||w.key==="ArrowDown"||w.key==="Enter")return;const q=M.substring(ln,C);q.includes(`
`)||C<ln?cn():(Jn=q,Gs(u))}}),u.addEventListener("keydown",w=>{if(an){const M=document.getElementById("autocomplete-popup");if(!M)return;const C=M.querySelectorAll(".editor-autocomplete-item");let O=Array.from(C).findIndex(q=>q.classList.contains("active"));w.key==="ArrowDown"?(w.preventDefault(),C.length>0&&(O>=0&&C[O].classList.remove("active","bg-teal-950/20","text-teal-400"),O=(O+1)%C.length,C[O].classList.add("active","bg-teal-950/20","text-teal-400"),C[O].scrollIntoView({block:"nearest"}))):w.key==="ArrowUp"?(w.preventDefault(),C.length>0&&(O>=0&&C[O].classList.remove("active","bg-teal-950/20","text-teal-400"),O=(O-1+C.length)%C.length,C[O].classList.add("active","bg-teal-950/20","text-teal-400"),C[O].scrollIntoView({block:"nearest"}))):w.key==="Enter"?(w.preventDefault(),O>=0?C[O].click():C.length>0&&C[0].click()):w.key==="Escape"&&(w.preventDefault(),cn())}}),u.addEventListener("input",()=>{b(),j()}),b();const z=document.getElementById("tag-pills-container"),$=document.getElementById("tag-pill-input"),J=document.getElementById("tag-pill-dropdown"),N=Array.from(new Set(ke.flatMap(w=>w.tags)));function Z(){if(!z||!$)return;z.querySelectorAll(".tag-badge-pill").forEach(C=>C.remove()),s.forEach(C=>{const O=document.createElement("span");O.className="tag-badge-pill flex items-center gap-1 text-[10px] font-mono bg-teal-950/40 text-teal-400 px-2 py-1 rounded border border-teal-900/30 select-none",O.innerHTML=`
        #${R(C)}
        <button type="button" class="tag-remove-btn hover:text-red-400 font-bold transition focus:outline-none" data-tag="${R(C)}">×</button>
      `,z.insertBefore(O,$)}),z.querySelectorAll(".tag-remove-btn").forEach(C=>{C.addEventListener("click",O=>{const q=O.currentTarget.getAttribute("data-tag");q&&(s=s.filter(ae=>ae!==q),Z(),j())})})}function te(){if(!J||!$)return;const w=$.value.trim().toLowerCase(),M=N.filter(O=>O.includes(w)&&!s.includes(O));if(M.length===0){J.classList.add("hidden");return}J.innerHTML=M.map(O=>`
      <div class="tag-dropdown-item px-3 py-2 cursor-pointer hover:bg-slate-900 hover:text-white text-slate-350 transition" data-tag="${R(O)}">
        #${R(O)}
      </div>
    `).join(""),J.classList.remove("hidden"),J.querySelectorAll(".tag-dropdown-item").forEach(O=>{O.addEventListener("click",q=>{const ae=q.currentTarget.getAttribute("data-tag");ae&&!s.includes(ae)&&(s.push(ae),Z(),j()),$.value="",J.classList.add("hidden"),$.focus()})})}$&&($.addEventListener("keydown",w=>{if(w.key==="Enter"||w.key===","){w.preventDefault();const M=$.value.trim().toLowerCase().replace(/[^a-z0-9-_]/g,"");M&&!s.includes(M)&&(s.push(M),Z(),j()),$.value="",J&&J.classList.add("hidden")}else w.key==="Backspace"&&$.value===""&&(s.pop(),Z(),j())}),$.addEventListener("input",te),$.addEventListener("focus",te)),Z();const U=document.getElementById("editor-layout-grid"),A=document.getElementById("live-preview-container"),S=document.getElementById("toggle-split-btn");function Q(){!U||!A||!S||(nn?(U.classList.remove("md:grid-cols-1"),U.classList.add("md:grid-cols-2"),A.classList.remove("md:hidden"),A.classList.add("md:block"),S.textContent="Full Width",S.classList.remove("text-slate-450"),S.classList.add("text-teal-400")):(U.classList.remove("md:grid-cols-2"),U.classList.add("md:grid-cols-1"),A.classList.remove("md:block"),A.classList.add("md:hidden"),S.textContent="Split Screen",S.classList.remove("text-teal-400"),S.classList.add("text-slate-450")))}S&&S.addEventListener("click",()=>{nn=!nn,localStorage.setItem("secops-wiki-split-screen",nn.toString()),Q()}),Q();const j=()=>{var C;const w=(C=document.getElementById("edit-title"))==null?void 0:C.value,M=u.value;(w||M||s.length>0)&&localStorage.setItem(d,JSON.stringify({title:w,content:M,tags:s,updatedAt:Date.now()}))},y=setInterval(j,5e3),T=()=>{clearInterval(y),window.removeEventListener("hashchange",T)};window.addEventListener("hashchange",T);const B=()=>{clearInterval(y),window.removeEventListener("hashchange",T),localStorage.removeItem(d),cn()};P.addEventListener("click",B),x&&x.addEventListener("click",()=>{var w;B(),(w=document.getElementById("draft-restore-banner"))==null||w.remove(),Ws(o)});const W=w=>{J&&!J.contains(w.target)&&w.target!==$&&J.classList.add("hidden")};document.addEventListener("click",W);const se=()=>{document.removeEventListener("click",W),window.removeEventListener("hashchange",se)};window.addEventListener("hashchange",se),m.addEventListener("submit",async w=>{w.preventDefault();const M=document.getElementById("edit-title").value.trim(),C=Ne?document.getElementById("edit-slug").value.trim().toLowerCase():t,O=u.value,q=document.getElementById("edit-encrypt").checked,ae=document.getElementById("edit-classification").value,H=document.getElementById("edit-expiry"),ye=H?parseInt(H.value,10):0;if(Ne&&!/^[a-z0-9-_]+$/.test(C)){alert("Security Alert: Slug contains illegal characters. Use alphanumeric, hyphens, and underscores only.");return}const X=s.map(he=>sn(he.trim()).toLowerCase()).filter(he=>he.length>0),we=await je(C);we&&await go({id:`${we.slug}-${Date.now()}`,slug:we.slug,title:we.title,content:we.content,updatedAt:we.updatedAt,isEncrypted:we.isEncrypted,tags:we.tags,classification:we.classification,signature:we.signature});let ie=O;if(q){if(!F){const he=prompt("Enter a security passphrase to encrypt this document (min 8 chars, mixed case, numbers, symbols):");if(!he){alert("Encryption Aborted: A security passphrase is required to save an encrypted document.");return}const _e=Ms(he);if(!_e.valid){alert(`SECURITY ERROR: Passphrase too weak.

${_e.message}`);return}F=await Ie(he)}try{ie=await ot(O,F)}catch(he){alert(`Encryption failure: ${he.message}`);return}}const Ce={slug:C,title:M,content:ie,updatedAt:Date.now(),tags:X,isSystem:r,isEncrypted:q,classification:ae};ye>0&&(Ce.expiresAt=Ce.updatedAt+ye*60*1e3),Ce.signature=await Ze(Ce);try{await Ke(Ce),B(),pt.postMessage("refresh"),window.location.hash=`#/page/${C}`}catch(he){alert(`Database transaction error: ${he.message}`)}})}function oi(o,e){let t=o.replace(/\.md$/i,"").replace(/[-_]+/g," ");t=t.split(" ").map(a=>a.charAt(0).toUpperCase()+a.slice(1)).join(" ");let n=o.replace(/\.md$/i,"").toLowerCase().replace(/[^a-z0-9-_]+/g,"-"),s=e,r=["imported"];if(e.startsWith("---")){const a=e.indexOf("---",3);if(a!==-1){const i=e.substring(3,a);s=e.substring(a+3).trim(),i.split(`
`).forEach(d=>{const p=d.indexOf(":");if(p!==-1){const g=d.substring(0,p).trim().toLowerCase(),m=d.substring(p+1).trim();g==="title"?t=m.replace(/^["']|["']$/g,""):g==="slug"?n=m.replace(/[^a-z0-9-_]+/g,"-").toLowerCase():g==="tags"&&(r=m.split(",").map(u=>u.trim().replace(/^["']|["']$/g,"")).filter(u=>u.length>0))}})}}return{slug:n,title:t,content:s,updatedAt:Date.now(),tags:r,isSystem:!1}}function si(o){const e=["Title","Slug","Tags","Word Count","Encrypted","Last Updated"],t=o.map(n=>{const s=n.content.split(/\s+/).filter(r=>r.length>0).length;return[`"${n.title.replace(/"/g,'""')}"`,`"${n.slug}"`,`"${n.tags.join(", ")}"`,s,n.isEncrypted?"TRUE":"FALSE",`"${new Date(n.updatedAt).toISOString()}"`]});return[e.join(","),...t.map(n=>n.join(","))].join(`
`)}function ri(o){let e="";for(const t of o){let n=t.content;if(t.isEncrypted&&F)try{n=t.content.includes(":")?"🔒 [Encrypted Document: Passphrase Required]":t.content}catch{n="🔒 [Encrypted Document: Passphrase Required]"}const s=Et(n);e+=`
      <section style="page-break-after: always; margin-bottom: 3rem; border-bottom: 2px solid #e2e8f0; padding-bottom: 2rem;">
        <h1 style="font-size: 2.25rem; font-family: monospace; margin-bottom: 0.5rem; color: #1a202c;">${R(t.title)}</h1>
        <div style="font-size: 0.75rem; color: #718096; font-family: monospace; margin-bottom: 1.5rem;">
          SLUG: ${t.slug} | TAGS: #${t.tags.map(r=>R(r)).join(", #")} | UPDATED: ${new Date(t.updatedAt).toLocaleString()}
        </div>
        <div style="line-height: 1.6; color: #2d3748;">
          ${s}
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
</html>`}function ai(o){const e=[],t=o.map(s=>`<a href="${s.slug}.html" style="display: block; padding: 0.5rem; color: #94a3b8; text-decoration: none; font-family: monospace; font-size: 0.8rem; border-radius: 4px; transition: background 0.2s;" onmouseover="this.style.background='#1e293b'; this.style.color='#2dd4bf'" onmouseout="this.style.background='transparent'; this.style.color='#94a3b8'">${R(s.title)}</a>`).join(`
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
  <main>
    <h1>SecOps Static Wiki Register</h1>
    <p style="margin-bottom: 2rem; color: #94a3b8; font-size: 0.85rem;">This is an offline-friendly static compilation of the active wiki database. Double-click any page in the sidebar or below to navigate.</p>
    <div>
      ${o.map(s=>`
        <div class="page-card">
          <a class="page-title" href="${s.slug}.html">${R(s.title)}</a>
          <div class="metadata">
            SLUG: ${s.slug} | TAGS: #${s.tags.map(r=>R(r)).join(", #")} | UPDATED: ${new Date(s.updatedAt).toLocaleString()}
          </div>
        </div>
      `).join("")}
    </div>
  </main>
</body>
</html>`;return e.push({name:"index.html",content:n}),o.forEach(s=>{let r=s.content;if(s.isEncrypted&&F)try{r=s.content.includes(":")?"🔒 [Encrypted Document: Decrypted view not exported]":s.content}catch{r="🔒 [Encrypted Document: Decrypted view not exported]"}let a=Et(r);a=a.replace(/href="#\/page\/([a-z0-9-_]+)"/g,'href="$1.html"');const i=`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${R(s.title)} - SecOps Static Wiki</title>
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
  <main>
    <h1>${R(s.title)}</h1>
    <div class="metadata">
      Slug: ${s.slug} &nbsp;|&nbsp; 
      Updated: ${new Date(s.updatedAt).toLocaleString()} &nbsp;|&nbsp;
      Tags: ${s.tags.map(l=>`<span class="badge">#${R(l)}</span>`).join("")}
    </div>
    <article class="wiki-content">
      ${a}
    </article>
  </main>
</body>
</html>`;e.push({name:`${s.slug}.html`,content:i})}),js(e)}function ii(o){const e=[];let t="",n=!1;for(let l=0;l<o.length;l++){const d=o[l];d==='"'?(n=!n,t+=d):d===`
`&&!n?(e.push(t),t=""):t+=d}if(t&&e.push(t),e.length<2)return[];const s=l=>{const d=[];let p="",g=!1;for(let m=0;m<l.length;m++){const u=l[m];u==='"'?g=!g:u===","&&!g?(d.push(r(p)),p=""):p+=u}return d.push(r(p)),d},r=l=>(l=l.trim(),l.startsWith('"')&&l.endsWith('"')&&(l=l.substring(1,l.length-1)),l.replace(/""/g,'"')),a=s(e[0]).map(l=>l.toLowerCase()),i=[];for(let l=1;l<e.length;l++){if(!e[l].trim())continue;const d=s(e[l]),p={};a.forEach((g,m)=>{p[g]=d[m]||""}),i.push(p)}return i}function li(o){var i;const e=o.title||"Untitled CSV Import",t=o.content||"";let n=o.slug||e.toLowerCase().replace(/[^a-z0-9-_]+/g,"-");n=n.toLowerCase().replace(/[^a-z0-9-_]+/g,"-"),n||(n=`imported-${Date.now()}`);const r=(o.tags||"imported, csv").split(/[,;|]+/).map(l=>l.trim().toLowerCase()).filter(l=>l.length>0),a=o.updatedat?parseInt(o.updatedat):Date.now();return{slug:n,title:e,content:t,updatedAt:isNaN(a)?Date.now():a,tags:r,isSystem:!1,isEncrypted:((i=o.encrypted)==null?void 0:i.toLowerCase())==="true"}}function ci(o,e){const t=o.split(`
`),n=e.split(`
`),s=Array(t.length+1).fill(0).map(()=>Array(n.length+1).fill(0));for(let l=1;l<=t.length;l++)for(let d=1;d<=n.length;d++)t[l-1]===n[d-1]?s[l][d]=s[l-1][d-1]+1:s[l][d]=Math.max(s[l-1][d],s[l][d-1]);const r=[];let a=t.length,i=n.length;for(;a>0||i>0;)a>0&&i>0&&t[a-1]===n[i-1]?(r.unshift({type:"unchanged",text:t[a-1]}),a--,i--):i>0&&(a===0||s[a][i-1]>=s[a-1][i])?(r.unshift({type:"added",text:n[i-1]}),i--):(r.unshift({type:"removed",text:t[a-1]}),a--);return r}function di(o,e){return new Promise(t=>{let n=document.getElementById("conflict-diff-modal");n||(n=document.createElement("div"),n.id="conflict-diff-modal",n.className="fixed inset-0 bg-[#090d16]/90 backdrop-blur-md z-[100] flex items-center justify-center p-4",document.body.appendChild(n)),n.classList.remove("hidden");const r=ci(o.content,e.content).map(a=>{let i="diff-line-unchanged",l=" ";return a.type==="added"?(i="diff-line-added px-1 rounded",l="+"):a.type==="removed"&&(i="diff-line-removed px-1 rounded",l="-"),`<div class="font-mono text-xs whitespace-pre-wrap ${i}">${l} ${R(a.text)}</div>`}).join(`
`);n.innerHTML=`
      <div class="glass-panel border border-teal-900/30 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col glow-border shadow-2xl">
        <div class="p-4 border-b border-slate-800 flex items-center justify-between shrink-0">
          <h3 class="text-sm font-bold font-mono text-white uppercase tracking-wider">Conflict Detected: ${R(o.slug)}</h3>
          <span class="text-[10px] font-mono bg-red-950/40 text-red-400 border border-red-900/30 px-2 py-0.5 rounded">SLUG DUP_WARN</span>
        </div>
        
        <div class="p-4 overflow-y-auto space-y-4 flex-1">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-slate-950/50 border border-slate-850 p-3 rounded-lg space-y-2">
              <h4 class="text-xs font-bold font-mono text-teal-400 uppercase">Existing Document</h4>
              <p class="text-xs font-mono text-white"><span class="text-slate-500">TITLE:</span> ${R(o.title)}</p>
              <p class="text-xs font-mono text-white"><span class="text-slate-500">TAGS:</span> ${o.tags.map(a=>`#${a}`).join(", ")}</p>
              <p class="text-[10px] font-mono text-slate-500"><span class="text-slate-500">MODIFIED:</span> ${new Date(o.updatedAt).toLocaleString()}</p>
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
              ${r}
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
    `,document.getElementById("diff-opt-skip").addEventListener("click",()=>{n.classList.add("hidden"),t("SKIP")}),document.getElementById("diff-opt-rename").addEventListener("click",()=>{n.classList.add("hidden"),t("MERGE_RENAME")}),document.getElementById("diff-opt-overwrite").addEventListener("click",()=>{n.classList.add("hidden"),t("OVERWRITE")}),document.getElementById("diff-opt-archive").addEventListener("click",()=>{n.classList.add("hidden"),t("REVISION")})})}async function Gn(o,e){const t=ja(o),n=await je(t.slug);if(n){let s=e;if(e==="ASK"&&(s=await di(n,t)),s==="SKIP")return!1;if(s==="REVISION")await go({id:`${n.slug}-${Date.now()}`,slug:n.slug,title:n.title,content:n.content,updatedAt:n.updatedAt,isEncrypted:n.isEncrypted,tags:n.tags,classification:n.classification,signature:n.signature}),t.signature=await Ze(t),await Ke(t);else if(s==="OVERWRITE")t.signature=await Ze(t),await Ke(t);else if(s==="MERGE_RENAME"){let r=`${t.slug}-imported`,a=await je(r),i=1;for(;a;)r=`${t.slug}-imported-${i}`,a=await je(r),i++;t.slug=r,t.title=`${t.title} (Imported)`,t.signature=await Ze(t),await Ke(t)}}else t.signature=await Ze(t),await Ke(t);return!0}async function ds(o){var g,m;if(!o||o.length===0)return;const e=((g=document.getElementById("import-conflict-resolution"))==null?void 0:g.value)||"REVISION";let t=0,n=0,s=0,r=0,a=0,i=0,l=0,d=0,p=0;for(let u=0;u<o.length;u++){const h=o[u],P=(m=h.name.split(".").pop())==null?void 0:m.toLowerCase();P==="md"?await new Promise(x=>{const D=new FileReader;D.onload=async K=>{var G;try{const L=(G=K.target)==null?void 0:G.result,b=oi(h.name,L);await Gn(b,e)?t++:r++}catch{l++}x()},D.readAsText(h)}):P==="csv"?await new Promise(x=>{const D=new FileReader;D.onload=async K=>{var G;try{const L=(G=K.target)==null?void 0:G.result,b=ii(L);for(const v of b)try{const I=li(v);await Gn(I,e)?n++:a++}catch{d++}}catch{d++}x()},D.readAsText(h)}):P==="json"&&await new Promise(x=>{const D=new FileReader;D.onload=async K=>{var G;try{const L=JSON.parse((G=K.target)==null?void 0:G.result);let b=L;if(L&&L.encrypted===!0&&L.payload){const I=prompt("Secure Backup: Enter password to decrypt database backup file:");if(I===null){p++,x();return}try{const Y=await Ie(I),z=await fe(L.payload,Y);b=JSON.parse(z)}catch{alert("Backup Decryption Alert: Authentication failed. Invalid backup passphrase."),p++,x();return}}else L&&L.encrypted===!1&&L.payload&&(b=L.payload);const v=Array.isArray(b)?b:[b];for(const I of v)try{!I.slug&&I.title&&(I.slug=I.title.toLowerCase().replace(/[^a-z0-9-_]+/g,"-")),I.slug||(I.slug=`imported-item-${Date.now()}-${Math.floor(Math.random()*1e3)}`),I.title||(I.title=I.slug.replace(/[-_]+/g," ")),typeof I.tags=="string"&&(I.tags=I.tags.split(",").map(z=>z.trim()).filter(z=>z.length>0)),Array.isArray(I.tags)||(I.tags=[]),I.classification||(I.classification="UNCLASSIFIED"),typeof I.updatedAt!="number"&&(I.updatedAt=Date.now()),await Gn(I,e)?s++:i++}catch{p++}}catch{p++}x()},D.readAsText(h)})}alert(`INGESTION COMPLETED (Conflict resolution: ${e.toUpperCase()}):

Markdown (.md) files:
- Ingested: ${t}
- Skipped: ${r}
- Failed: ${l}

CSV files (rows):
- Ingested: ${n}
- Skipped: ${a}
- Failed: ${d}

JSON files (records):
- Ingested: ${s}
- Skipped: ${i}
- Failed: ${p}`),pt.postMessage("refresh"),await Ae(),await Le()}async function pi(){const o=document.getElementById("tag-color-palette-manager");if(!o)return;const e=Array.from(new Set(ke.flatMap(r=>r.tags))),t=await gs();if(e.length===0){o.innerHTML='<p class="text-xs font-mono text-slate-500">No active document tags registered.</p>';return}let n='<div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">';for(const r of e){const a=t.find(l=>l.tag===r),i=a?a.color:"slate";n+=`
      <div class="flex items-center justify-between p-2 bg-slate-950/40 border border-slate-800 rounded">
        <span class="text-xs font-mono text-slate-400">#${R(r)}</span>
        <select class="tag-color-select bg-slate-900 border border-slate-850 text-xs font-mono text-slate-300 rounded px-2 py-1 focus:outline-none focus:border-teal-500 cursor-pointer" data-tag="${R(r)}">
          <option value="slate" ${i==="slate"?"selected":""}>SLATE GREY</option>
          <option value="emerald" ${i==="emerald"?"selected":""}>EMERALD GREEN</option>
          <option value="blue" ${i==="blue"?"selected":""}>BLUE TEAM</option>
          <option value="red" ${i==="red"?"selected":""}>RED TEAM</option>
          <option value="amber" ${i==="amber"?"selected":""}>AMBER CAUTION</option>
        </select>
      </div>
    `}n+="</div>",o.innerHTML=n,o.querySelectorAll(".tag-color-select").forEach(r=>{r.addEventListener("change",async a=>{const i=a.currentTarget.getAttribute("data-tag"),l=a.currentTarget.value;await vr({tag:i,color:l}),await fo(),await Le()})})}function zt(o){const e=Array.from(new Set(ke.flatMap(b=>b.tags)));o.innerHTML=`
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
              <span class="text-emerald-400 font-bold">${Ds()}</span>
            </li>
            <li class="flex justify-between">
              <span class="text-slate-500">ACTIVE VISUAL THEME:</span>
              <span class="text-emerald-400 font-bold">${wt.toUpperCase()}</span>
            </li>
            <li class="flex justify-between items-center py-0.5">
              <span class="text-slate-500">MASK ENCRYPTED CORES:</span>
              <label class="relative inline-flex items-center cursor-pointer select-none">
                <input type="checkbox" id="system-mask-encrypted-checkbox" class="sr-only peer" ${nt?"checked":""}>
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
              ${e.map(b=>`
                <option value="${R(b)}">#${R(b)}</option>
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
  `;const t=document.getElementById("system-export-btn"),n=document.getElementById("system-export-zip-btn"),s=document.getElementById("system-export-web-zip-btn"),r=document.getElementById("system-export-csv-btn"),a=document.getElementById("system-export-html-btn"),i=document.getElementById("system-unified-import-file"),l=document.getElementById("system-reset-btn"),d=document.getElementById("total-articles-telemetry"),p=document.getElementById("db-health-diagnostics"),g=document.getElementById("system-drop-zone");d.textContent=ke.length.toString(),p&&wi(p),pi();const m=()=>{const b=document.getElementById("export-tag-filter"),v=(b==null?void 0:b.value)||"ALL";return v==="ALL"?ke:ke.filter(I=>I.tags.includes(v))};t.addEventListener("click",async()=>{const b=m(),v=prompt("Secure Backup: Enter a password to encrypt this database backup file (leave blank for plain JSON):");let I,Y=`secops-wiki-backup-${Date.now()}.json`;if(v)try{const J=await Ie(v),N=JSON.stringify(b,null,2),te={encrypted:!0,schemaVersion:4,payload:await ot(N,J)};I=new Blob([JSON.stringify(te,null,2)],{type:"application/json"}),Y=`secops-wiki-encrypted-backup-${Date.now()}.json`}catch(J){alert(`Backup encryption failed: ${J.message}`);return}else{if(v===null)return;const J={encrypted:!1,schemaVersion:4,payload:b};I=new Blob([JSON.stringify(J,null,2)],{type:"application/json"})}const z=URL.createObjectURL(I),$=document.createElement("a");$.href=z,$.download=Y,document.body.appendChild($),$.click(),document.body.removeChild($),URL.revokeObjectURL(z)}),n.addEventListener("click",async()=>{const b=m(),v=[];for(const $ of b){let J=$.content;if($.isEncrypted&&F)try{J=await fe($.content,F)}catch{}const N=`---
title: ${$.title}
slug: ${$.slug}
tags: ${$.tags.join(", ")}
updated: ${new Date($.updatedAt).toISOString()}
encrypted: ${!!$.isEncrypted}
---

`;v.push({name:`${$.slug}.md`,content:N+J})}const I=js(v),Y=URL.createObjectURL(I),z=document.createElement("a");z.href=Y,z.download=`secops-wiki-backup-${Date.now()}.zip`,document.body.appendChild(z),z.click(),document.body.removeChild(z),URL.revokeObjectURL(Y)}),s.addEventListener("click",()=>{const b=m(),v=ai(b),I=URL.createObjectURL(v),Y=document.createElement("a");Y.href=I,Y.download=`secops-wiki-web-${Date.now()}.zip`,document.body.appendChild(Y),Y.click(),document.body.removeChild(Y),URL.revokeObjectURL(I)}),r.addEventListener("click",()=>{const b=m(),v=si(b),I=new Blob([v],{type:"text/csv;charset=utf-8;"}),Y=URL.createObjectURL(I),z=document.createElement("a");z.href=Y,z.download=`secops-wiki-report-${Date.now()}.csv`,document.body.appendChild(z),z.click(),document.body.removeChild(z),URL.revokeObjectURL(Y)}),a.addEventListener("click",()=>{const b=m(),v=ri(b),I=new Blob([v],{type:"text/html;charset=utf-8;"}),Y=URL.createObjectURL(I),z=document.createElement("a");z.href=Y,z.download=`secops-wiki-book-${Date.now()}.html`,document.body.appendChild(z),z.click(),document.body.removeChild(z),URL.revokeObjectURL(Y)}),i&&i.addEventListener("change",async b=>{const v=b.target.files;v&&v.length>0&&await ds(v)}),["dragenter","dragover","dragleave","drop"].forEach(b=>{g.addEventListener(b,v=>{v.preventDefault(),v.stopPropagation()},!1)}),["dragenter","dragover"].forEach(b=>{g.addEventListener(b,()=>{g.classList.add("border-teal-500","bg-teal-950/10")},!1)}),["dragleave","drop"].forEach(b=>{g.addEventListener(b,()=>{g.classList.remove("border-teal-500","bg-teal-950/10")},!1)}),g.addEventListener("drop",async b=>{const v=b.dataTransfer,I=v==null?void 0:v.files;I&&I.length>0&&await ds(I)}),g.addEventListener("click",()=>{i&&i.click()}),l.addEventListener("click",async()=>{const b=prompt('CRITICAL SECURITY WARNING: Type "WIPE" to verify you want to delete ALL wiki pages and custom documents:');if(b==="WIPE")try{if(await ms(),"caches"in window)try{const v=await caches.keys();for(const I of v)await caches.delete(I)}catch(v){console.warn("Failed to clear caches: ",v)}await oo(),await fo(),alert("Database successfully wiped, caches invalidated, and seeded with standard operating defaults."),localStorage.setItem("secops-wiki-last-update",Date.now().toString()),pt.postMessage("refresh"),await Ae(),window.location.hash="#/page/home"}catch(v){alert(`Reset failed: ${v.message}`)}else b!==null&&alert("Sanitization aborted. Confirmation keyword mismatch.")});const u=document.getElementById("system-session-timeout-select");u&&u.addEventListener("change",()=>{localStorage.setItem("secops-wiki-session-timeout",u.value),mo()});const h=document.getElementById("system-cache-bust-btn");h&&h.addEventListener("click",async()=>{if(confirm("CRITICAL DIAGNOSTICS: Purge cached service worker registrations and static asset cache buckets? This triggers an immediate application reload.")){if("serviceWorker"in navigator){const b=await navigator.serviceWorker.getRegistrations();for(const v of b)await v.unregister()}if("caches"in window){const b=await caches.keys();for(const v of b)await caches.delete(v)}alert("CACHE WIPE COMPLETED. Reloading system..."),window.location.reload()}});const P=document.getElementById("system-mask-encrypted-checkbox");P&&P.addEventListener("change",()=>{nt=P.checked,localStorage.setItem("secops-wiki-mask-encrypted",nt.toString()),Ae().then(()=>{Le()})});const x=document.getElementById("system-db-encrypted-checkbox");x&&x.addEventListener("change",async()=>{if(x.checked){const v=prompt("Enter a new Master Passphrase to secure the database (min 8 chars, mixed case, numbers, symbols):");if(!v){x.checked=!1;return}const I=Ms(v);if(!I.valid){alert(`SECURITY ERROR: Passphrase too weak.

${I.message}`),x.checked=!1;return}try{pe=await Ie(v),localStorage.setItem("secops-wiki-db-encrypted","true");const z=await Ht();for(const $ of z)$.isEncryptedAtRest||await Ke($);alert("Database encryption successfully activated. All records are encrypted at rest."),await ge("DB_ENCRYPTION_ENABLED","Activated database encryption-at-rest."),await Ae(),zt(o)}catch(Y){alert(`Activation failed: ${Y.message}`),x.checked=!1}}else{const v=prompt("Enter the current Master Passphrase to confirm decryption:");if(!v){x.checked=!0;return}try{const I=await Ie(v);if(!await St(I)){alert("Verification Failed: Incorrect master passphrase."),x.checked=!0;return}const z=await uo();localStorage.setItem("secops-wiki-db-encrypted","false"),localStorage.removeItem("secops-wiki-webauthn-gate"),localStorage.removeItem("secops-wiki-webauthn-payload"),localStorage.removeItem("secops-wiki-webauthn-salt"),pe=null;for(const $ of z){const J={slug:$.slug,title:$.title,content:$.content,tags:$.tags,isSystem:$.isSystem,isEncrypted:$.isEncrypted,signature:$.signature,updatedAt:$.updatedAt};await dn(J)}alert("Database encryption-at-rest successfully deactivated."),await ge("DB_ENCRYPTION_DISABLED","Deactivated database encryption-at-rest."),await Ae(),zt(o)}catch(I){alert(`Deactivation failed: ${I.message}`),x.checked=!0}}});const D=document.getElementById("system-webauthn-register-btn");D&&D.addEventListener("click",async()=>{localStorage.getItem("secops-wiki-webauthn-gate")==="true"?confirm("Are you sure you want to deregister biometric credentials?")&&(localStorage.removeItem("secops-wiki-webauthn-gate"),localStorage.removeItem("secops-wiki-webauthn-payload"),localStorage.removeItem("secops-wiki-webauthn-salt"),alert("Biometric unlock credentials removed."),await ge("WEBAUTHN_DEREGISTER","Removed biometric credentials."),zt(o)):await Ii()}),Vn();const K=document.getElementById("system-prune-audit-btn");K&&K.addEventListener("click",async()=>{confirm("Audit Log Pruning: Confirm deletion of security logs older than 30 days?")&&(await hs(30),await ge("AUDIT_LOG_PRUNED","Manually pruned audit logs older than 30 days."),await Vn(),alert("Audit logs successfully pruned."))});const G=document.getElementById("system-wipe-audit-btn");G&&G.addEventListener("click",async()=>{confirm("CRITICAL ACTION: Are you sure you want to purge the security audit log registers?")&&(await Tr(),await ge("AUDIT_LOG_CLEARED","Security audit log register cleared."),await Vn())}),no();const L=document.getElementById("system-wipe-all-drafts-btn");L&&L.addEventListener("click",()=>{if(confirm("CRITICAL WARN: Purge all unsaved document draft fragments in local storage?")){const b=[];for(let v=0;v<localStorage.length;v++){const I=localStorage.key(v)||"";I.startsWith("secops-wiki-draft-")&&b.push(I)}b.forEach(v=>localStorage.removeItem(v)),no()}})}function no(){const o=document.getElementById("system-drafts-recovery-list");if(!o)return;const e=[];for(let n=0;n<localStorage.length;n++){const s=localStorage.key(n)||"";s.startsWith("secops-wiki-draft-")&&e.push(s)}const t=e.map(n=>{try{const s=localStorage.getItem(n)||"",r=JSON.parse(s),a=n.substring(18);return{key:n,slug:a,title:r.title||"(Untitled)",updatedAt:r.updatedAt||Date.now(),size:s.length}}catch{return null}}).filter(n=>n!==null);if(t.length===0){o.innerHTML='<p class="text-xs font-mono text-slate-500">No unsaved drafts found in local storage.</p>';return}o.innerHTML=t.map(n=>`
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
  `).join(""),o.querySelectorAll(".draft-action-restore").forEach(n=>{n.addEventListener("click",s=>{const r=s.currentTarget.getAttribute("data-slug");Xe=!0,Ne=r==="new",re=r,window.location.hash=Ne?"#/new":`#/edit/${r}`})}),o.querySelectorAll(".draft-action-wipe").forEach(n=>{n.addEventListener("click",s=>{const r=s.currentTarget.getAttribute("data-key");localStorage.removeItem(r),no()})})}function jt(){const o=document.getElementById("command-palette-backdrop");if(o)if(zn=!zn,zn){o.classList.remove("hidden");const e=document.getElementById("command-palette-input");e&&(e.value="",e.focus()),Pe=0,bn()}else o.classList.add("hidden")}function qs(){if(document.getElementById("command-palette-backdrop"))return;const o=document.createElement("div");o.id="command-palette-backdrop",o.className="fixed inset-0 bg-[#090d16]/85 backdrop-blur-md z-50 flex items-start justify-center pt-20 hidden",o.innerHTML=`
    <div class="glass-panel border border-teal-900/30 rounded-xl w-full max-w-lg overflow-hidden shadow-2xl mx-4 glow-border">
      <input type="text" id="command-palette-input" placeholder="Search pages or run system commands..." class="w-full bg-slate-950/80 text-white font-mono text-sm p-4 outline-none border-b border-slate-800 focus:border-teal-500/30 placeholder-slate-500 transition">
      <div id="command-palette-results" class="max-h-80 overflow-y-auto divide-y divide-slate-850/40 p-2 space-y-1"></div>
    </div>
  `,document.body.appendChild(o);const e=document.getElementById("command-palette-input");e.addEventListener("input",()=>{Pe=0,bn()}),e.addEventListener("keydown",fi),o.addEventListener("click",t=>{t.target===o&&jt()})}function bn(){const o=document.getElementById("command-palette-input"),e=document.getElementById("command-palette-results");if(!e)return;const t=o?o.value.trim().toLowerCase():"",n=[{title:"CREATE NEW PAGE",subtitle:"Open the editor to establish a new document",icon:"➕",action:()=>{window.location.hash="#/new"}},{title:"TOGGLE THEME",subtitle:`Switch visual style (currently ${wt})`,icon:"🌓",action:()=>{Us()}},{title:"SYSTEM ADMIN",subtitle:"Access operations console and db diagnostics",icon:"⚙️",action:()=>{window.location.hash="#/system"}},{title:"TACTICAL MAP VIEW",subtitle:"Display interactive node relationship map",icon:"🗺️",action:()=>{window.location.hash="#/graph"}},{title:"PANIC PURGE PROTOCOL",subtitle:"Emergency self-destruct - wipes all data",icon:"🚨",action:()=>{const p=document.getElementById("system-panic-btn");p&&p.click()}}];let s="",r=0;const a=n.filter(p=>p.title.toLowerCase().includes(t)||p.subtitle.toLowerCase().includes(t));let i=[];t?i=ke.map(p=>({page:p,score:zs(kt.find(g=>g.slug===p.slug)||p,t)})).filter(p=>p.score>0).sort((p,g)=>g.score-p.score):i=ke.slice(0,5).map(p=>({page:p,score:0}));const l=a.length+i.length;Pe>=l?Pe=0:Pe<0&&(Pe=l-1),a.forEach(p=>{s+=`
      <div class="command-palette-item p-3 rounded-lg flex items-center justify-between cursor-pointer font-mono text-xs transition-all ${r===Pe?"command-item-active bg-teal-950/20 text-teal-400 border-l-2 border-teal-500":"text-slate-400 hover:bg-slate-900/40 hover:text-slate-200"}" data-index="${r}">
        <div class="flex items-center gap-3">
          <span class="text-base">${p.icon}</span>
          <div>
            <div class="font-bold text-white uppercase">${p.title}</div>
            <div class="text-[10px] text-slate-500">${p.subtitle}</div>
          </div>
        </div>
        <span class="text-[10px] text-slate-650 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-900 uppercase">CMD</span>
      </div>
    `,r++}),i.forEach(p=>{const g=r===Pe,m=p.page;s+=`
      <div class="command-palette-item p-3 rounded-lg flex items-center justify-between cursor-pointer font-mono text-xs transition-all ${g?"command-item-active bg-teal-950/20 text-teal-400 border-l-2 border-teal-500":"text-slate-400 hover:bg-slate-900/40 hover:text-slate-200"}" data-index="${r}">
        <div class="flex items-center gap-3">
          <span class="text-base">${m.isEncrypted?"🔒":"📄"}</span>
          <div>
            <div class="font-bold text-white">${R(m.title)}</div>
            <div class="text-[10px] text-slate-500">Slug: ${R(m.slug)} ${m.tags.length?`• tags: #${m.tags.map(u=>R(u)).join(", #")}`:""}</div>
          </div>
        </div>
        <span class="text-[10px] text-slate-650 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-900 uppercase">PAGE</span>
      </div>
    `,r++}),l===0&&(s='<div class="text-center py-6 text-xs text-slate-600 font-mono">No matching commands or pages found.</div>'),e.innerHTML=s,e.querySelectorAll(".command-palette-item").forEach(p=>{p.addEventListener("click",()=>{const g=parseInt(p.getAttribute("data-index")||"0",10);ui(g,a,i)})}),mi()}function ui(o,e,t){if(jt(),o<e.length)e[o].action();else{const n=o-e.length;n<t.length&&(window.location.hash=`#/page/${t[n].page.slug}`)}}function fi(o){const e=document.getElementById("command-palette-results");if(!e)return;const t=e.querySelectorAll(".command-palette-item");if(t.length!==0)if(o.key==="ArrowDown")o.preventDefault(),Pe=(Pe+1)%t.length,bn();else if(o.key==="ArrowUp")o.preventDefault(),Pe=(Pe-1+t.length)%t.length,bn();else if(o.key==="Enter"){o.preventDefault();const n=e.querySelector(".command-item-active");n&&n.click()}else o.key==="Escape"&&(o.preventDefault(),jt())}function mi(){const o=document.getElementById("command-palette-results");if(!o)return;const e=o.querySelector(".command-item-active");e&&e.scrollIntoView({block:"nearest"})}function gi(o){const e=document.getElementById("autocomplete-popup");e&&(e.classList.remove("hidden"),Gs(o))}function cn(){const o=document.getElementById("autocomplete-popup");o&&(o.classList.add("hidden"),an=!1)}function Gs(o){const e=document.getElementById("autocomplete-popup");if(!e)return;const t=Jn.toLowerCase().trim(),n=ke.filter(r=>r.title.toLowerCase().includes(t)||r.slug.toLowerCase().includes(t));if(n.length===0){e.innerHTML='<div class="p-2 text-slate-500 italic">No matches found</div>';return}e.innerHTML=n.map((r,a)=>`
    <div class="editor-autocomplete-item p-2 cursor-pointer transition ${a===0?"active bg-teal-950/20 text-teal-400":"text-slate-400 hover:bg-slate-900/40 hover:text-slate-200"}" data-slug="${R(r.slug)}" data-title="${R(r.title)}">
      <span class="font-bold">${R(r.title)}</span>
      <span class="text-[9px] text-slate-500 block truncate">Slug: ${R(r.slug)}</span>
    </div>
  `).join(""),e.querySelectorAll(".editor-autocomplete-item").forEach(r=>{r.addEventListener("click",a=>{const i=a.currentTarget,l=i.getAttribute("data-slug")||"",d=i.getAttribute("data-title")||"";bi(o,d,l)})});const s=hi(o,o.selectionStart);e.style.left=`${Math.min(o.clientWidth-260,Math.max(16,s.left))}px`,e.style.top=`${Math.min(o.clientHeight-100,Math.max(40,s.top+20))}px`}function hi(o,e){const n=o.value.substring(0,e).split(`
`),s=n.length-1,r=n[s],a=8,i=20,l=16+r.length*a%(o.clientWidth-40),d=12+s*i-o.scrollTop;return{left:l,top:d}}function bi(o,e,t){const n=ln-2,s=o.selectionStart,r=o.value,a=`[${e}](#/page/${t})`;o.value=r.substring(0,n)+a+r.substring(s),o.focus(),o.selectionStart=n+a.length,o.selectionEnd=n+a.length,cn();const i=document.getElementById("live-preview-box");i&&(i.innerHTML=Et(o.value))}async function xi(o,e,t){const n=await je(o);if(!n)return;let s=n.content;const r=!!n.isEncrypted;if(r){if(!F){alert("Authentication Error: Decryption key is missing. Re-decrypt page first.");return}try{s=await fe(s,F)}catch{alert("Decryption failure.");return}}let a=0;const i=/([-*+]\s+\[)([ xX])(\])/g,l=s.replace(i,(g,m,u,h)=>a===e?(a++,`${m}${t?"x":" "}${h}`):(a++,g));let d=l;r&&F&&(d=await ot(l,F)),n.content=d,n.updatedAt=Date.now(),n.signature=await Ze(n),await Ke(n),pt.postMessage("refresh"),await Ae();const p=document.getElementById("main-content");p&&await hn(p)}function Vs(o){const e=[],t=/(?:\(|"|^|\s)#\/page\/([a-z0-9-_]+)/g;let n;for(;(n=t.exec(o))!==null;)e.push(n[1].toLowerCase());return Array.from(new Set(e))}async function yi(o){o.innerHTML=`
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
  `;const e=document.getElementById("tactical-map-canvas");if(!e)return;const t=e.getContext("2d");if(!t)return;const n=window.devicePixelRatio||1,s=e.getBoundingClientRect();e.width=s.width*n,e.height=500*n,t.scale(n,n);const r=s.width,a=500;let i=1,l=0,d=0,p=!1,g=0,m=0;const u=ke.map(y=>{const T=r/2+(Math.random()-.5)*100,B=a/2+(Math.random()-.5)*100;return{id:y.slug,title:y.title,x:T,y:B,vx:0,vy:0,radius:y.slug==="home"?14:10,isEncrypted:!!y.isEncrypted,isSystem:!!y.isSystem}}),h=[],P=new Set(u.map(y=>y.id));for(const y of ke){let T=y.content;if(y.isEncrypted&&F)try{T=await fe(y.content,F)}catch{}Vs(T).forEach(W=>{P.has(W)&&W!==y.slug&&h.push({source:y.slug,target:W})})}let x=null,D=null,K=0,G=0,L=0,b="";const v=document.getElementById("map-search-input");v&&v.addEventListener("input",y=>{b=y.target.value.trim().toLowerCase()});const I=.02,Y=1200,z=.85,$=.02;function J(y,T){const B=(y-r/2-l)/i+r/2,W=(T-a/2-d)/i+a/2;return{x:B,y:W}}function N(){for(let y=0;y<u.length;y++){const T=u[y];for(let B=y+1;B<u.length;B++){const W=u[B],se=W.x-T.x,w=W.y-T.y,M=se*se+w*w+.1,C=Math.sqrt(M);if(C<250){const O=Y/M,q=se/C*O,ae=w/C*O;T!==x&&(T.vx-=q,T.vy-=ae),W!==x&&(W.vx+=q,W.vy+=ae)}}}h.forEach(y=>{const T=u.find(q=>q.id===y.source),B=u.find(q=>q.id===y.target);if(!T||!B)return;const W=B.x-T.x,se=B.y-T.y,w=Math.sqrt(W*W+se*se)||.1,M=(w-100)*I,C=W/w*M,O=se/w*M;T!==x&&(T.vx+=C,T.vy+=O),B!==x&&(B.vx-=C,B.vy-=O)}),u.forEach(y=>{if(y===x)return;const T=r/2-y.x,B=a/2-y.y;y.vx+=T*$,y.vy+=B*$,y.x+=y.vx,y.y+=y.vy,y.vx*=z,y.vy*=z,y.x=Math.max(y.radius,Math.min(r-y.radius,y.x)),y.y=Math.max(y.radius,Math.min(a-y.radius,y.y))})}function Z(){t.clearRect(0,0,r,a),t.save(),t.translate(r/2+l,a/2+d),t.scale(i,i),t.translate(-r/2,-a/2),t.lineWidth=1,h.forEach(y=>{const T=u.find(O=>O.id===y.source),B=u.find(O=>O.id===y.target);if(!T||!B)return;const W=b.length>0,se=W&&T.title.toLowerCase().includes(b),w=W&&B.title.toLowerCase().includes(b),M=D&&(D.id===T.id||D.id===B.id);let C=.4;W&&(C=se&&w?.6:.05),t.strokeStyle=M?"rgba(20, 184, 166, 0.6)":`rgba(30, 41, 59, ${C})`,t.lineWidth=M?1.5/i:1/i,t.beginPath(),t.moveTo(T.x,T.y),t.lineTo(B.x,B.y),t.stroke()}),u.forEach(y=>{t.beginPath();const T=b.length>0,B=T&&y.title.toLowerCase().includes(b);let W=y.radius,se=1,w=0;if(T)if(B){const ae=Math.sin(Date.now()/150)*2+3;W=y.radius+ae,w=15,se=1}else se=.2;t.arc(y.x,y.y,W,0,2*Math.PI);let M="#14b8a6",C="rgba(20, 184, 166, 0.4)";y.isEncrypted?(M="#ef4444",C="rgba(239, 68, 68, 0.4)"):y.isSystem&&(M="#3b82f6",C="rgba(59, 130, 246, 0.4)"),t.fillStyle=M,t.globalAlpha=se,t.shadowColor=C,t.shadowBlur=D===y?12:w||6,t.fill(),t.shadowBlur=0,t.strokeStyle=`rgba(255, 255, 255, ${.1*se})`,t.lineWidth=1.5/i,t.stroke();const q=y.isEncrypted&&!F&&nt?"[REDACTED CORE]":y.title;t.fillStyle=D===y||B?`rgba(255, 255, 255, ${se})`:`rgba(148, 163, 184, ${se})`,t.font=D===y||B?`bold ${10/i}px monospace`:`${9/i}px monospace`,t.textAlign="center",t.fillText(q,y.x,y.y-W-5/i)}),t.restore(),t.globalAlpha=1}function te(){N(),Z(),L=requestAnimationFrame(te)}e.addEventListener("mousemove",y=>{const T=e.getBoundingClientRect(),B=y.clientX-T.left,W=y.clientY-T.top,se=J(B,W);if(K=se.x,G=se.y,x){x.x=K,x.y=G,x.vx=0,x.vy=0;return}if(p){l=B-g,d=W-m;return}D=null;for(const w of u){const M=w.x-K,C=w.y-G;if(M*M+C*C<(w.radius+5)*(w.radius+5)){D=w;break}}}),e.addEventListener("mousedown",y=>{const T=e.getBoundingClientRect(),B=y.clientX-T.left,W=y.clientY-T.top;if(D){x=D;const se=J(B,W);x.x=se.x,x.y=se.y}else p=!0,g=B-l,m=W-d}),e.addEventListener("wheel",y=>{y.preventDefault();const T=e.getBoundingClientRect(),B=y.clientX-T.left,W=y.clientY-T.top,se=J(B,W),w=y.deltaY<0?1.1:.9;i=Math.max(.2,Math.min(4,i*w)),l=B-(se.x-r/2)*i-r/2,d=W-(se.y-a/2)*i-a/2},{passive:!1});const U=()=>{x=null,p=!1};window.addEventListener("mouseup",U),e.addEventListener("click",()=>{D&&!p&&(cancelAnimationFrame(L),window.location.hash=`#/page/${D.id}`)});const A=document.getElementById("map-zoom-in"),S=document.getElementById("map-zoom-out"),Q=document.getElementById("map-zoom-reset");A.addEventListener("click",()=>{i=Math.min(4,i*1.2)}),S.addEventListener("click",()=>{i=Math.max(.2,i/1.2)}),Q.addEventListener("click",()=>{i=1,l=0,d=0}),te();const j=()=>{cancelAnimationFrame(L),window.removeEventListener("mouseup",U),window.removeEventListener("hashchange",j)};window.addEventListener("hashchange",j)}async function wi(o){o.innerHTML=`
    <div class="text-xs font-mono text-slate-500 animate-pulse">Running security & link integrity scan...</div>
  `;const e=await uo();let t=0;const n=new TextEncoder;e.forEach(d=>{const p=JSON.stringify(d);t+=n.encode(p).length});const s=t<1024?`${t} Bytes`:t<1024*1024?`${(t/1024).toFixed(2)} KB`:`${(t/(1024*1024)).toFixed(2)} MB`,r=new Set(e.map(d=>d.slug)),a={};e.forEach(d=>{a[d.slug]=[]});const i=[];for(const d of e){let p=d.content;if(d.isEncrypted&&F)try{p=await fe(d.content,F)}catch{}Vs(p).forEach(m=>{r.has(m)?m!==d.slug&&a[m].push(d.slug):i.push({source:d.slug,target:m})})}const l=e.filter(d=>d.slug!=="home"&&a[d.slug].length===0);o.innerHTML=`
    <div class="glass-panel border border-slate-800 rounded-xl p-5 space-y-4 font-mono text-xs">
      <h3 class="text-sm font-bold font-mono text-white uppercase tracking-wider border-b border-slate-800 pb-2">Database Integrity Report</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-slate-950/50 border border-slate-850 p-3 rounded-lg text-center">
          <div class="text-[10px] text-slate-500 font-mono uppercase">Total Database Footprint</div>
          <div class="text-base font-bold text-teal-400 font-mono mt-1">${s}</div>
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
  `}let kt=[];async function vi(){kt=[];for(const o of ke){let e=o.content,t=o.title;if(o.isEncrypted&&F&&o.slug===re)try{e=await fe(o.content,F)}catch{}kt.push({...o,content:e,title:t})}}async function go(o){if(localStorage.getItem("secops-wiki-db-encrypted")==="true"&&pe){const t={title:o.title,content:o.content,isEncrypted:o.isEncrypted,updatedAt:o.updatedAt,tags:o.tags,classification:o.classification,signature:o.signature},n=await ot(JSON.stringify(t),pe),s={id:o.id,slug:o.slug,title:"[REDACTED AT REST]",content:"[REDACTED AT REST]",updatedAt:o.updatedAt,isEncryptedAtRest:!0,encryptedData:n};await Bo(s)}else await Bo(o);try{const t=await fs(o.slug);if(t.length>20)for(let n=20;n<t.length;n++)await yr(t[n].id)}catch(t){console.warn("Failed to compact revisions for slug:",o.slug,t)}}async function Ei(o){const e=await fs(o),t=[];for(const n of e)if(n.isEncryptedAtRest&&n.encryptedData){if(!pe){t.push({id:n.id,slug:n.slug,title:"[DATABASE LOCKED]",content:"Master passphrase required to unlock this database record.",updatedAt:n.updatedAt,isEncrypted:!1});continue}try{const s=await fe(n.encryptedData,pe),r=JSON.parse(s);t.push({id:n.id,slug:n.slug,title:r.title,content:r.content,updatedAt:r.updatedAt,isEncrypted:r.isEncrypted,tags:r.tags,classification:r.classification,signature:r.signature})}catch(s){console.error("Failed to decrypt revision at rest:",s)}}else t.push(n);return t}async function St(o){const e=await Ht();for(const t of e)if(t.isEncryptedAtRest&&t.encryptedData)try{return await fe(t.encryptedData,o),!0}catch{return!1}return!0}function ki(){let o=document.getElementById("master-unlock-overlay");o||(o=document.createElement("div"),o.id="master-unlock-overlay",o.className="fixed inset-0 bg-[#060814]/98 backdrop-blur-xl z-[100] flex items-center justify-center p-4",document.body.appendChild(o));const t=localStorage.getItem("secops-wiki-webauthn-gate")==="true"?`
    <button type="button" id="master-unlock-biometric-btn" class="flex-1 py-2.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-350 font-mono text-xs uppercase rounded transition hover:text-white flex items-center justify-center gap-1.5">
      <span>👤 TouchID/Hello</span>
    </button>
  `:"";o.innerHTML=`
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
  `;const n=document.getElementById("master-unlock-form"),s=document.getElementById("master-unlock-input"),r=document.getElementById("master-unlock-error"),a=document.getElementById("master-unlock-wipe-btn"),i=document.getElementById("master-unlock-biometric-btn");setTimeout(()=>s==null?void 0:s.focus(),50),n.addEventListener("submit",async l=>{l.preventDefault(),r.classList.add("hidden");const d=s.value;try{const p=await Ie(d);await St(p)?(pe=p,Ks()):(r.classList.remove("hidden"),s.value="",s.focus(),await ge("DECRYPT_FAIL","Master database unlock attempt with invalid passphrase."))}catch(p){r.textContent=`ERROR: ${p.message.toUpperCase()}`,r.classList.remove("hidden")}}),a.addEventListener("click",async()=>{confirm("CRITICAL ACTION: Are you sure you want to completely wipe this database? All encrypted records and system procedures will be permanently deleted.")&&prompt('Type "WIPE" to confirm sanitization:')==="WIPE"&&(await ms(),await oo(),localStorage.removeItem("secops-wiki-db-encrypted"),localStorage.removeItem("secops-wiki-webauthn-gate"),localStorage.removeItem("secops-wiki-webauthn-payload"),localStorage.removeItem("secops-wiki-webauthn-salt"),pe=null,o.remove(),alert("Database successfully wiped and reset to default plaintext configuration."),window.location.reload())}),i&&i.addEventListener("click",async()=>{await Li()})}function Ks(){const o=document.getElementById("master-unlock-overlay");o&&o.remove(),ge("SESSION_UNLOCK","Database session unlocked and decrypted at rest."),Ae().then(()=>{Fs(),qs(),window.addEventListener("hashchange",gn),window.addEventListener("online",mn),window.addEventListener("offline",mn),gn()})}function Si(o){const e=async t=>{const n=new FileReader;n.onload=async()=>{const s=n.result.split(",")[1],r=`att-${Date.now()}-${Math.random().toString(36).substring(2,9)}`;let a=F||pe,i=s;if(a)try{i=await ot(s,a)}catch(m){console.error("Failed to encrypt attachment:",m)}const l={id:r,name:t.name,mimeType:t.type,data:i};await Er(l),await ge("ATTACHMENT_SAVE",`Saved attachment ${t.name} (ID: ${r}, size: ${t.size} bytes).`);const d=t.type.startsWith("image/")?`![${t.name}](attachment://${r})`:`[Attachment: ${t.name}](attachment://${r})`,p=o.selectionStart,g=o.selectionEnd;o.value=o.value.substring(0,p)+d+o.value.substring(g),o.selectionStart=o.selectionEnd=p+d.length,o.dispatchEvent(new Event("input"))},n.readAsDataURL(t)};o.addEventListener("dragover",t=>{t.preventDefault()}),o.addEventListener("drop",async t=>{var s;t.preventDefault();const n=(s=t.dataTransfer)==null?void 0:s.files;if(n&&n.length>0)for(let r=0;r<n.length;r++)await e(n[r])}),o.addEventListener("paste",async t=>{var s;const n=(s=t.clipboardData)==null?void 0:s.items;if(n){for(let r=0;r<n.length;r++)if(n[r].kind==="file"){const a=n[r].getAsFile();a&&await e(a)}}})}async function Ti(o){const e=o.querySelectorAll('img[src^="attachment://"]');for(const n of Array.from(e)){const s=n.src.replace("attachment://","").split("/").pop()||"",r=await Uo(s);if(r){const a=await ps(r);a&&(n.src=a)}}const t=o.querySelectorAll('a[href^="attachment://"]');for(const n of Array.from(t)){const s=n.href.replace("attachment://","").split("/").pop()||"",r=await Uo(s);if(r){const a=await ps(r);a&&(n.href=a,n.download=r.name)}}}async function ps(o){let e=o.data;if(e.includes(":")){let t=null;if(F)try{t=await fe(e,F)}catch{}if(!t&&pe)try{t=await fe(e,pe)}catch{}if(!t)return null;e=t}try{const t=atob(e),n=new Uint8Array(t.length);for(let r=0;r<t.length;r++)n[r]=t.charCodeAt(r);const s=new Blob([n],{type:o.mimeType});return URL.createObjectURL(s)}catch(t){return console.error("Failed to parse base64 for attachment:",t),null}}async function Vn(){const o=document.getElementById("system-audit-logs-list");if(!o)return;const e=await Sr();if(e.length===0){o.innerHTML='<p class="text-xs font-mono text-slate-500">No security audit logs found.</p>';return}o.innerHTML=`
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
  `}function Ai(o){let e=document.getElementById("drawing-canvas-modal");e||(e=document.createElement("div"),e.id="drawing-canvas-modal",e.className="fixed inset-0 bg-[#090d16]/90 backdrop-blur-md z-50 flex items-center justify-center p-4",document.body.appendChild(e)),e.innerHTML=`
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
  `,e.classList.remove("hidden");const t=document.getElementById("sketch-canvas"),n=t.getContext("2d"),s=window.devicePixelRatio||1,r=600,a=350;t.width=r*s,t.height=a*s,t.style.width=`${r}px`,t.style.height=`${a}px`,n.scale(s,s),n.lineCap="round",n.lineJoin="round",n.strokeStyle="#ffffff",n.lineWidth=5,n.fillStyle="#060814",n.fillRect(0,0,r,a);let i=!1,l="pen",d="#ffffff",p=0,g=0,m;const u=[],h=[];u.push(n.getImageData(0,0,t.width,t.height));const P=A=>{const S=t.getBoundingClientRect(),Q="touches"in A?A.touches[0].clientX:A.clientX,j="touches"in A?A.touches[0].clientY:A.clientY;return{x:(Q-S.left)*(r/S.width),y:(j-S.top)*(a/S.height)}},x=A=>{i=!0;const S=P(A);p=S.x,g=S.y,m=n.getImageData(0,0,t.width,t.height),(l==="pen"||l==="eraser")&&(n.beginPath(),n.moveTo(p,g)),A.preventDefault()},D=A=>{if(!i)return;const S=P(A),Q=parseInt(Y.value,10);if(l==="pen"||l==="eraser")n.lineTo(S.x,S.y),n.strokeStyle=l==="eraser"?"#060814":d,n.lineWidth=Q,n.stroke();else if(n.putImageData(m,0,0),n.beginPath(),n.strokeStyle=d,n.lineWidth=Q,l==="line")n.moveTo(p,g),n.lineTo(S.x,S.y),n.stroke();else if(l==="arrow"){n.moveTo(p,g),n.lineTo(S.x,S.y),n.stroke();const j=Math.atan2(S.y-g,S.x-p),y=Math.max(10,Q*2.5);n.beginPath(),n.moveTo(S.x,S.y),n.lineTo(S.x-y*Math.cos(j-Math.PI/6),S.y-y*Math.sin(j-Math.PI/6)),n.lineTo(S.x-y*Math.cos(j+Math.PI/6),S.y-y*Math.sin(j+Math.PI/6)),n.closePath(),n.fillStyle=d,n.fill()}else if(l==="rect")n.rect(p,g,S.x-p,S.y-g),n.stroke();else if(l==="circle"){const j=Math.sqrt(Math.pow(S.x-p,2)+Math.pow(S.y-g,2));n.arc(p,g,j,0,2*Math.PI),n.stroke()}A.preventDefault()},K=()=>{i&&((l==="pen"||l==="eraser")&&n.closePath(),i=!1,u.push(n.getImageData(0,0,t.width,t.height)),h.length=0)},G=()=>{if(u.length>1){const A=u.pop();h.push(A);const S=u[u.length-1];n.putImageData(S,0,0)}},L=()=>{if(h.length>0){const A=h.pop();u.push(A),n.putImageData(A,0,0)}};t.addEventListener("mousedown",x),t.addEventListener("mousemove",D),window.addEventListener("mouseup",K),t.addEventListener("touchstart",x,{passive:!1}),t.addEventListener("touchmove",D,{passive:!1}),window.addEventListener("touchend",K);const b=A=>{A.ctrlKey&&A.key==="z"?(A.preventDefault(),G()):A.ctrlKey&&A.key==="y"&&(A.preventDefault(),L())};window.addEventListener("keydown",b);const v=["pen","eraser","line","arrow","rect","circle"],I=A=>{l=A,v.forEach(S=>{const Q=document.getElementById(`draw-tool-${S}`);S===A?Q.className="px-2 py-1 bg-teal-950/40 border border-teal-800 text-teal-400 font-mono text-[10px] rounded font-bold uppercase":Q.className="px-2 py-1 bg-slate-900 border border-slate-850 text-slate-400 font-mono text-[10px] rounded hover:text-white uppercase"})};v.forEach(A=>{document.getElementById(`draw-tool-${A}`).addEventListener("click",()=>I(A))});const Y=document.getElementById("draw-brush-size"),z=document.getElementById("draw-clear-btn"),$=document.getElementById("draw-cancel-btn"),J=document.getElementById("draw-save-btn"),N=document.getElementById("draw-color-palette"),Z=document.getElementById("draw-undo-btn"),te=document.getElementById("draw-redo-btn");N.addEventListener("click",A=>{const S=A.target.closest("button");S&&(d=S.getAttribute("data-color")||"#ffffff",N.querySelectorAll("button").forEach(Q=>Q.classList.replace("border-white","border-transparent")),S.classList.replace("border-transparent","border-white"))}),z.addEventListener("click",()=>{confirm("Clear the canvas drawing?")&&(n.fillStyle="#060814",n.fillRect(0,0,r,a),u.push(n.getImageData(0,0,t.width,t.height)),h.length=0)}),Z.addEventListener("click",G),te.addEventListener("click",L);const U=()=>{window.removeEventListener("mouseup",K),window.removeEventListener("touchend",K),window.removeEventListener("keydown",b),e.classList.add("hidden")};$.addEventListener("click",U),J.addEventListener("click",()=>{const S=`![Tactical Sketch](${t.toDataURL("image/png")})`,Q=o.selectionStart,j=o.selectionEnd;o.value=o.value.substring(0,Q)+S+o.value.substring(j),o.selectionStart=o.selectionEnd=Q+S.length,o.dispatchEvent(new Event("input")),U()})}async function Ii(){if(!pe){alert("Unlock Required: Unlock the database using your passphrase before registering biometric lock.");return}const o=prompt("Verify Identity: Enter your current master passphrase to bind to biometric unlock:");if(!o)return;const e=await Ie(o);if(!await St(e)){alert("Verification Failed: Incorrect passphrase.");return}try{const n=crypto.getRandomValues(new Uint8Array(32)),s=await navigator.credentials.create({publicKey:{challenge:n,rp:{name:"SecOps Wiki",id:window.location.hostname||"localhost"},user:{id:crypto.getRandomValues(new Uint8Array(16)),name:"operator@secops.local",displayName:"SecOps Operator"},pubKeyCredParams:[{type:"public-key",alg:-7},{type:"public-key",alg:-257}],authenticatorSelection:{authenticatorAttachment:"platform",userVerification:"required"},timeout:6e4}});if(s){const r=new Uint8Array(s.rawId),a=Array.from(r).map(m=>m.toString(16).padStart(2,"0")).join(""),i=crypto.getRandomValues(new Uint8Array(32)),l=Array.from(i).map(m=>m.toString(16).padStart(2,"0")).join("");localStorage.setItem("secops-wiki-webauthn-salt",l);const d=`${a}:${l}`,p=await Ie(d),g=await ot(o,p);localStorage.setItem("secops-wiki-webauthn-payload",g),localStorage.setItem("secops-wiki-webauthn-gate","true"),alert("Biometric credential successfully registered with WebAuthn platform gate."),await ge("WEBAUTHN_REGISTER","Biometric credentials registered successfully."),zt(document.getElementById("main-content"))}}catch(n){alert(`Biometric registration failed: ${n.message}`),await ge("WEBAUTHN_FAIL",`Biometric registration failed: ${n.message}`)}}async function Li(){const o=localStorage.getItem("secops-wiki-webauthn-gate")==="true",e=localStorage.getItem("secops-wiki-webauthn-payload");if(!o||!e){alert("Biometric Unlock is not registered. Setup biometric credentials in settings first.");return}try{const t=crypto.getRandomValues(new Uint8Array(32)),n=await navigator.credentials.get({publicKey:{challenge:t,rpId:window.location.hostname||"localhost",userVerification:"required",timeout:6e4}});if(n){const s=new Uint8Array(n.rawId),r=Array.from(s).map(m=>m.toString(16).padStart(2,"0")).join(""),a=localStorage.getItem("secops-wiki-webauthn-salt")||"";if(!a)throw new Error("Biometric decryption salt is missing from storage.");const i=`${r}:${a}`,l=await Ie(i),d=await fe(e,l),p=await Ie(d);await St(p)?(pe=p,Ks()):alert("Biometric validation failed: Stored credentials mismatch.")}}catch(t){alert(`Biometric verification failed: ${t.message}`),await ge("WEBAUTHN_FAIL",`Biometric unlock failed: ${t.message}`)}}function Ci(o){const e={name:"Root",fullPath:"",children:{},pages:[]};for(const t of o)for(const n of t.tags){const s=n.split("/");let r=e,a="";for(let i=0;i<s.length;i++){const l=s[i].trim();l&&(a=a?`${a}/${l}`:l,r.children[l]||(r.children[l]={name:l,fullPath:a,children:{},pages:[]}),r=r.children[l])}r.pages.push(t)}return e}function Ys(o,e=0){let t="";const n=Object.keys(o.children).sort();for(const s of n){const r=o.children[s];if(!(Object.keys(r.children).length>0||r.pages.length>0))continue;const i=r.fullPath;t+=`
      <div class="tree-folder">
        <div class="tree-folder-header flex items-center gap-1.5 px-3 py-1 cursor-pointer hover:bg-slate-900/40 text-xs font-mono text-slate-450 select-none rounded-lg" data-path="${R(i)}" tabindex="0">
          <span class="tree-folder-icon text-[9px] transition-transform duration-200 text-slate-600" style="display: inline-block;">▶</span>
          <span>📁 ${R(r.name)}</span>
        </div>
        <div class="tree-folder-children hidden pl-3.5 space-y-0.5 animate-fade-in" data-path="${R(i)}">
          ${Ys(r,e+1)}
          ${r.pages.map(l=>{const d=re===l.slug&&!Xe,p=l.isEncrypted&&!F&&nt,g=p?"[REDACTED CORE]":l.title;return`
              <a href="${p?"javascript:void(0)":`#/page/${l.slug}`}" ${p?`onclick="alert('SECURITY WARNING: Document is locked. Enter passphrase to decrypt cores first.');"`:""} class="flex items-center justify-between px-3 py-1 rounded-lg text-[11px] font-mono transition ${d?"bg-teal-950/20 text-teal-400 font-bold border-l border-teal-500":"text-slate-450 hover:bg-slate-900/30 hover:text-slate-200"}" tabindex="0">
                <span class="truncate flex items-center gap-1">
                  ${l.isEncrypted?"🔒":"⊙"} ${R(g)}
                </span>
              </a>
            `}).join("")}
        </div>
      </div>
    `}return t}function Ri(o){o.querySelectorAll("code.language-javascript-sandbox, code.language-html-sandbox").forEach(t=>{const n=t.parentElement;if(!n||n.tagName.toLowerCase()!=="pre"||n.querySelector(".sandbox-run-btn"))return;const s=t.classList.contains("language-html-sandbox"),r=t.textContent||"",a=document.createElement("button");a.className="sandbox-run-btn absolute top-2 right-12 px-2 py-0.5 bg-teal-950/40 border border-teal-800 text-teal-400 hover:text-teal-300 font-mono text-[9px] rounded uppercase font-bold transition z-10",a.textContent="Run Sandbox",n.classList.add("relative"),n.appendChild(a);const i=document.createElement("div");i.className="sandbox-iframe-wrapper mt-2 hidden border border-slate-800 rounded-lg overflow-hidden bg-slate-950",n.after(i),a.addEventListener("click",()=>{var d;if(i.classList.toggle("hidden"))a.textContent="Run Sandbox",i.innerHTML="";else{a.textContent="Close Sandbox",i.innerHTML=`
          <div class="bg-slate-900 px-3 py-1 border-b border-slate-800 flex justify-between items-center text-[10px] font-mono text-slate-400 select-none">
            <span>LIVE ISO-SANDBOX CONSOLE</span>
            <button class="sandbox-close-inner-btn text-red-400 hover:text-red-300 font-bold">CLOSE</button>
          </div>
          <iframe sandbox="allow-scripts" class="w-full h-64 bg-slate-950" id="sandbox-frame-${Date.now()}"></iframe>
        `;const p=i.querySelector("iframe");let g="";s?g=r:g=`
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
                    ${r}
                  } catch (err) {
                    log('ERROR:', err.message);
                  }
                <\/script>
              </body>
            </html>
          `,p.srcdoc=g,(d=i.querySelector(".sandbox-close-inner-btn"))==null||d.addEventListener("click",()=>{i.classList.add("hidden"),a.textContent="Run Sandbox",i.innerHTML=""})}})})}async function Di(o){var a;const e=window.location.hash,t=e.indexOf("?");if(t===-1){o.innerHTML='<div class="glass-panel border border-red-950 p-6 rounded-xl text-center font-mono text-xs text-red-400">P2P IMPORT ERROR: Missing decryption parameters in link.</div>';return}const n=new URLSearchParams(e.substring(t)),s=n.get("data"),r=n.get("key");if(!s||!r){o.innerHTML='<div class="glass-panel border border-red-950 p-6 rounded-xl text-center font-mono text-xs text-red-400">P2P IMPORT ERROR: Invalid parameters.</div>';return}try{const i=await Ie(r),l=atob(decodeURIComponent(s)),d=await fe(l,i),p=JSON.parse(d);o.innerHTML=`
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
    `,(a=document.getElementById("p2p-import-confirm-btn"))==null||a.addEventListener("click",async()=>{let g=p.title.toLowerCase().replace(/[^a-z0-9-_]+/g,"-");g||(g=`p2p-import-${Date.now()}`);let m=g,u=await je(m);if(u&&!confirm(`CONFLICT ALERT: A document with slug "${m}" already exists in your wiki database.

Click OK to overwrite the existing document.
Click Cancel to import it as a duplicate under an auto-generated title.`)){let x=1;for(;u;)m=`${g}-${x}`,u=await je(m),x++}const h={slug:m,title:p.title,content:p.content,tags:p.tags,updatedAt:Date.now()};h.signature=await Ze(h),await Ke(h),await ge("P2P_IMPORT_SUCCESS",`Imported decrypted page: ${p.title} (slug: ${m})`),alert("Intel Entry imported successfully."),window.location.hash=`#/page/${m}`})}catch(i){o.innerHTML=`<div class="glass-panel border border-red-950 p-6 rounded-xl text-center font-mono text-xs text-red-400">P2P DECRYPTION ERROR: ${R(i.message)}</div>`}}document.addEventListener("DOMContentLoaded",Qa);
