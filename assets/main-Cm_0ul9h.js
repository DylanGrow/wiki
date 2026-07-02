var ma=Object.defineProperty;var Ms=s=>{throw TypeError(s)};var ga=(s,e,t)=>e in s?ma(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var re=(s,e,t)=>ga(s,typeof e!="symbol"?e+"":e,t),ha=(s,e,t)=>e.has(s)||Ms("Cannot "+t);var Bs=(s,e,t)=>e.has(s)?Ms("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(s):e.set(s,t);var Jt=(s,e,t)=>(ha(s,e,"access private method"),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function t(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(o){if(o.ep)return;o.ep=!0;const a=t(o);fetch(o.href,a)}})();if(self!==top)try{window.top&&(window.top.location.href=window.location.href)}catch{window.location.href="about:blank"}else document.documentElement.classList.remove("clickjack-lock");const ba="secops-wiki-db",Be="pages",Ue="revisions",xa=5;function be(){return new Promise((s,e)=>{const t=indexedDB.open(ba,xa);t.onerror=()=>e(t.error),t.onsuccess=()=>{const n=t.result;n.onversionchange=()=>{n.close(),alert("SECURITY NOTICE: The database schema is being updated by another active session. This connection has been closed to prevent blocking. Please reload to resume."),window.location.reload()},s(n)},t.onupgradeneeded=()=>{const n=t.result;n.objectStoreNames.contains(Be)||n.createObjectStore(Be,{keyPath:"slug"}),n.objectStoreNames.contains(Ue)||n.createObjectStore(Ue,{keyPath:"id"}).createIndex("slug","slug",{unique:!1}),n.objectStoreNames.contains("tagColors")||n.createObjectStore("tagColors",{keyPath:"tag"}),n.objectStoreNames.contains("attachments")||n.createObjectStore("attachments",{keyPath:"id"}),n.objectStoreNames.contains("auditLogs")||n.createObjectStore("auditLogs",{keyPath:"id"}),n.objectStoreNames.contains("templates")||n.createObjectStore("templates",{keyPath:"id"}),n.objectStoreNames.contains("backups")||n.createObjectStore("backups",{keyPath:"id"})}})}async function ya(s){const e=await be();return new Promise((t,n)=>{const r=e.transaction(Be,"readonly").objectStore(Be).get(s);r.onerror=()=>n(r.error),r.onsuccess=()=>t(r.result||null)})}async function dn(s){const e=await be();return new Promise((t,n)=>{const r=e.transaction(Be,"readwrite").objectStore(Be).put(s);r.onerror=()=>n(r.error),r.onsuccess=()=>t()})}async function fo(s){await wa(s);const e=await be();return new Promise((t,n)=>{const r=e.transaction(Be,"readwrite").objectStore(Be).delete(s);r.onerror=()=>n(r.error),r.onsuccess=()=>t()})}async function Ht(){const s=await be();return new Promise((e,t)=>{const a=s.transaction(Be,"readonly").objectStore(Be).getAll();a.onerror=()=>t(a.error),a.onsuccess=()=>e(a.result||[])})}async function Us(s){const e=await be();return new Promise((t,n)=>{const r=e.transaction(Ue,"readwrite").objectStore(Ue).put(s);r.onerror=()=>n(r.error),r.onsuccess=()=>t()})}async function mo(s){const e=await be();return new Promise((t,n)=>{const i=e.transaction(Ue,"readonly").objectStore(Ue).index("slug").getAll(s);i.onerror=()=>n(i.error),i.onsuccess=()=>{const l=i.result||[];l.sort((d,p)=>p.updatedAt-d.updatedAt),t(l)}})}async function wa(s){const e=await be();return new Promise((t,n)=>{const i=e.transaction(Ue,"readwrite").objectStore(Ue).index("slug").openCursor(s);i.onerror=()=>n(i.error),i.onsuccess=()=>{const l=i.result;l?(l.delete(),l.continue()):t()}})}async function va(s){const e=await be();return new Promise((t,n)=>{const r=e.transaction(Ue,"readwrite").objectStore(Ue).delete(s);r.onerror=()=>n(r.error),r.onsuccess=()=>t()})}const ka=[{slug:"home",title:"Operations Dashboard",content:`# Secure Operations Center (SOC) Wiki

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
* Raw input strings are escaped to prevent Cross-Site Scripting (XSS).`,updatedAt:Date.now(),tags:["security","hardening"],isSystem:!0}];async function os(){if((await Ht()).length===0)for(const e of ka)await dn(e)}async function go(){const s=await be();return new Promise((e,t)=>{const n=[Be,Ue,"tagColors","attachments","auditLogs"],o=s.transaction(n,"readwrite"),a=o.objectStore(Be),r=o.objectStore(Ue),i=o.objectStore("tagColors"),l=o.objectStore("attachments"),d=o.objectStore("auditLogs");a.clear(),r.clear(),i.clear(),l.clear(),d.clear(),o.oncomplete=()=>e(),o.onerror=()=>t(o.error)})}async function ho(){const s=await be();return new Promise((e,t)=>{try{const a=s.transaction("tagColors","readonly").objectStore("tagColors").getAll();a.onerror=()=>t(a.error),a.onsuccess=()=>e(a.result||[])}catch{e([])}})}async function Ea(s){const e=await be();return new Promise((t,n)=>{const r=e.transaction("tagColors","readwrite").objectStore("tagColors").put(s);r.onerror=()=>n(r.error),r.onsuccess=()=>t()})}async function Sa(s){const e=await be();return new Promise((t,n)=>{const r=e.transaction("attachments","readwrite").objectStore("attachments").put(s);r.onerror=()=>n(r.error),r.onsuccess=()=>t()})}async function zs(s){const e=await be();return new Promise((t,n)=>{try{const r=e.transaction("attachments","readonly").objectStore("attachments").get(s);r.onerror=()=>n(r.error),r.onsuccess=()=>t(r.result||null)}catch{t(null)}})}async function Ta(){const s=await be();return new Promise((e,t)=>{try{const a=s.transaction("attachments","readonly").objectStore("attachments").getAll();a.onerror=()=>t(a.error),a.onsuccess=()=>e(a.result||[])}catch{e([])}})}async function Ia(s){const e=await be();return new Promise((t,n)=>{try{const r=e.transaction("auditLogs","readwrite").objectStore("auditLogs").put(s);r.onerror=()=>n(r.error),r.onsuccess=()=>t()}catch(o){console.error("Audit logging transaction failed:",o),t()}})}async function bo(){const s=await be();return new Promise((e,t)=>{try{const a=s.transaction("auditLogs","readonly").objectStore("auditLogs").getAll();a.onerror=()=>t(a.error),a.onsuccess=()=>{const r=a.result||[];r.sort((i,l)=>l.timestamp-i.timestamp),e(r)}}catch{e([])}})}async function xo(){const s=await be();return new Promise((e,t)=>{const a=s.transaction("auditLogs","readwrite").objectStore("auditLogs").clear();a.onerror=()=>t(a.error),a.onsuccess=()=>e()})}async function yo(s){const e=await be(),t=Date.now()-s*24*60*60*1e3;return new Promise((n,o)=>{try{const i=e.transaction("auditLogs","readwrite").objectStore("auditLogs").openCursor();i.onerror=()=>o(i.error),i.onsuccess=()=>{const l=i.result;l?(l.value.timestamp<t&&l.delete(),l.continue()):n()}}catch(a){o(a)}})}async function Aa(s){const e=await be();return new Promise((t,n)=>{const r=e.transaction("backups","readwrite").objectStore("backups").put(s);r.onerror=()=>n(r.error),r.onsuccess=()=>t()})}/*! @license DOMPurify 3.4.11 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.4.11/LICENSE */function js(s,e){(e==null||e>s.length)&&(e=s.length);for(var t=0,n=Array(e);t<e;t++)n[t]=s[t];return n}function La(s){if(Array.isArray(s))return s}function Ca(s,e){var t=s==null?null:typeof Symbol<"u"&&s[Symbol.iterator]||s["@@iterator"];if(t!=null){var n,o,a,r,i=[],l=!0,d=!1;try{if(a=(t=t.call(s)).next,e!==0)for(;!(l=(n=a.call(t)).done)&&(i.push(n.value),i.length!==e);l=!0);}catch(p){d=!0,o=p}finally{try{if(!l&&t.return!=null&&(r=t.return(),Object(r)!==r))return}finally{if(d)throw o}}return i}}function Ra(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Da(s,e){return La(s)||Ca(s,e)||$a(s,e)||Ra()}function $a(s,e){if(s){if(typeof s=="string")return js(s,e);var t={}.toString.call(s).slice(8,-1);return t==="Object"&&s.constructor&&(t=s.constructor.name),t==="Map"||t==="Set"?Array.from(s):t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?js(s,e):void 0}}const wo=Object.entries,Hs=Object.setPrototypeOf,_a=Object.isFrozen,Oa=Object.getPrototypeOf,Na=Object.getOwnPropertyDescriptor;let Se=Object.freeze,Te=Object.seal,wt=Object.create,vo=typeof Reflect<"u"&&Reflect,Yn=vo.apply,Zn=vo.construct;Se||(Se=function(e){return e});Te||(Te=function(e){return e});Yn||(Yn=function(e,t){for(var n=arguments.length,o=new Array(n>2?n-2:0),a=2;a<n;a++)o[a-2]=arguments[a];return e.apply(t,o)});Zn||(Zn=function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),o=1;o<t;o++)n[o-1]=arguments[o];return new e(...n)});const Rt=ge(Array.prototype.forEach),Pa=ge(Array.prototype.lastIndexOf),Fs=ge(Array.prototype.pop),yt=ge(Array.prototype.push),Ma=ge(Array.prototype.splice),tt=Array.isArray,Nt=ge(String.prototype.toLowerCase),Nn=ge(String.prototype.toString),Ws=ge(String.prototype.match),Dt=ge(String.prototype.replace),qs=ge(String.prototype.indexOf),Ba=ge(String.prototype.trim),Ua=ge(Number.prototype.toString),za=ge(Boolean.prototype.toString),Gs=typeof BigInt>"u"?null:ge(BigInt.prototype.toString),Vs=typeof Symbol>"u"?null:ge(Symbol.prototype.toString),we=ge(Object.prototype.hasOwnProperty),$t=ge(Object.prototype.toString),Ee=ge(RegExp.prototype.test),rt=ja(TypeError);function ge(s){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var t=arguments.length,n=new Array(t>1?t-1:0),o=1;o<t;o++)n[o-1]=arguments[o];return Yn(s,e,n)}}function ja(s){return function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return Zn(s,t)}}function ee(s,e){let t=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Nt;if(Hs&&Hs(s,null),!tt(e))return s;let n=e.length;for(;n--;){let o=e[n];if(typeof o=="string"){const a=t(o);a!==o&&(_a(e)||(e[n]=a),o=a)}s[o]=!0}return s}function Ha(s){for(let e=0;e<s.length;e++)we(s,e)||(s[e]=null);return s}function De(s){const e=wt(null);for(const n of wo(s)){var t=Da(n,2);const o=t[0],a=t[1];we(s,o)&&(tt(a)?e[o]=Ha(a):a&&typeof a=="object"&&a.constructor===Object?e[o]=De(a):e[o]=a)}return e}function Fa(s){switch(typeof s){case"string":return s;case"number":return Ua(s);case"boolean":return za(s);case"bigint":return Gs?Gs(s):"0";case"symbol":return Vs?Vs(s):"Symbol()";case"undefined":return $t(s);case"function":case"object":{if(s===null)return $t(s);const e=s,t=Ge(e,"toString");if(typeof t=="function"){const n=t(e);return typeof n=="string"?n:$t(n)}return $t(s)}default:return $t(s)}}function Ge(s,e){for(;s!==null;){const n=Na(s,e);if(n){if(n.get)return ge(n.get);if(typeof n.value=="function")return ge(n.value)}s=Oa(s)}function t(){return null}return t}function Wa(s){try{return Ee(s,""),!0}catch{return!1}}const Ks=Se(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Pn=Se(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Mn=Se(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),qa=Se(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Bn=Se(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Ga=Se(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Ys=Se(["#text"]),Zs=Se(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","command","commandfor","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns"]),Un=Se(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Xs=Se(["accent","accentunder","align","bevelled","close","columnalign","columnlines","columnspacing","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lquote","lspace","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Qt=Se(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Va=Te(/{{[\w\W]*|^[\w\W]*}}/g),Ka=Te(/<%[\w\W]*|^[\w\W]*%>/g),Ya=Te(/\${[\w\W]*/g),Za=Te(/^data-[\-\w.\u00B7-\uFFFF]+$/),Xa=Te(/^aria-[\-\w]+$/),Js=Te(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Ja=Te(/^(?:\w+script|data):/i),Qa=Te(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),er=Te(/^html$/i),tr=Te(/^[a-z][.\w]*(-[.\w]+)+$/i),Qs=Te(/<[/\w!]/g),nr=Te(/<[/\w]/g),sr=Te(/<\/no(script|embed|frames)/i),or=Te(/\/>/i),qe={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,processingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},ar=function(){return typeof window>"u"?null:window},rr=function(e,t){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let n=null;const o="data-tt-policy-suffix";t&&t.hasAttribute(o)&&(n=t.getAttribute(o));const a="dompurify"+(n?"#"+n:"");try{return e.createPolicy(a,{createHTML(r){return r},createScriptURL(r){return r}})}catch{return console.warn("TrustedTypes policy "+a+" could not be created."),null}},eo=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}},et=function(e,t,n,o){return we(e,t)&&tt(e[t])?ee(o.base?De(o.base):{},e[t],o.transform):n};function ko(){let s=arguments.length>0&&arguments[0]!==void 0?arguments[0]:ar();const e=L=>ko(L);if(e.version="3.4.11",e.removed=[],!s||!s.document||s.document.nodeType!==qe.document||!s.Element)return e.isSupported=!1,e;let t=s.document;const n=t,o=n.currentScript;s.DocumentFragment;const a=s.HTMLTemplateElement,r=s.Node,i=s.Element,l=s.NodeFilter,d=s.NamedNodeMap;d===void 0&&(s.NamedNodeMap||s.MozNamedAttrMap),s.HTMLFormElement;const p=s.DOMParser,m=s.trustedTypes,g=i.prototype,f=Ge(g,"cloneNode"),O=Ge(g,"remove"),U=Ge(g,"nextSibling"),I=Ge(g,"childNodes"),P=Ge(g,"parentNode"),Z=Ge(g,"shadowRoot"),T=Ge(g,"attributes"),v=r&&r.prototype?Ge(r.prototype,"nodeType"):null,y=r&&r.prototype?Ge(r.prototype,"nodeName"):null;if(typeof a=="function"){const L=t.createElement("template");L.content&&L.content.ownerDocument&&(t=L.content.ownerDocument)}let k,C="",V,B=!1,_=0;const W=function(){if(_>0)throw rt('A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted Types" section of the README.')},ae=function(c){W(),_++;try{return k.createHTML(c)}finally{_--}},pe=function(c){W(),_++;try{return k.createScriptURL(c)}finally{_--}},Ie=function(){return B||(V=rr(m,o),B=!0),V},ue=t,x=ue.implementation,E=ue.createNodeIterator,F=ue.createDocumentFragment,z=ue.getElementsByTagName,b=n.importNode;let R=eo();e.isSupported=typeof wo=="function"&&typeof P=="function"&&x&&x.createHTMLDocument!==void 0;const H=Va,K=Ka,j=Ya,h=Za,w=Xa,S=Ja,D=Qa,M=tr;let J=Js,q=null;const ve=ee({},[...Ks,...Pn,...Mn,...Bn,...Ys]);let X=null;const ke=ee({},[...Zs,...Un,...Xs,...Qt]);let se=Object.seal(wt(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Ce=null,xe=null;const $e=Object.seal(wt(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let Tt=!0,It=!0,bs=!1,xs=!0,Je=!1,At=!0,ot=!1,yn=!1,wn=null,vn=null,kn=!1,mt=!1,qt=!1,Gt=!1,ys=!0,ws=!1;const vs="user-content-";let En=!0,Sn=!1,gt={},Fe=null;const Tn=ee({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","selectedcontent","style","svg","template","thead","title","video","xmp"]);let ks=null;const Es=ee({},["audio","video","img","source","image","track"]);let In=null;const Ss=ee({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Vt="http://www.w3.org/1998/Math/MathML",Kt="http://www.w3.org/2000/svg",We="http://www.w3.org/1999/xhtml";let ht=We,An=!1,Ln=null;const Jo=ee({},[Vt,Kt,We],Nn),Ts=Se(["mi","mo","mn","ms","mtext"]);let Cn=ee({},Ts);const Is=Se(["annotation-xml"]);let Rn=ee({},Is);const Qo=ee({},["title","style","font","a","script"]);let Lt=null;const ea=["application/xhtml+xml","text/html"],ta="text/html";let ie=null,bt=null;const na=t.createElement("form"),As=function(c){return c instanceof RegExp||c instanceof Function},Dn=function(){let c=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(bt&&bt===c)return;(!c||typeof c!="object")&&(c={}),c=De(c),Lt=ea.indexOf(c.PARSER_MEDIA_TYPE)===-1?ta:c.PARSER_MEDIA_TYPE,ie=Lt==="application/xhtml+xml"?Nn:Nt,q=et(c,"ALLOWED_TAGS",ve,{transform:ie}),X=et(c,"ALLOWED_ATTR",ke,{transform:ie}),Ln=et(c,"ALLOWED_NAMESPACES",Jo,{transform:Nn}),In=et(c,"ADD_URI_SAFE_ATTR",Ss,{transform:ie,base:Ss}),ks=et(c,"ADD_DATA_URI_TAGS",Es,{transform:ie,base:Es}),Fe=et(c,"FORBID_CONTENTS",Tn,{transform:ie}),Ce=et(c,"FORBID_TAGS",De({}),{transform:ie}),xe=et(c,"FORBID_ATTR",De({}),{transform:ie}),gt=we(c,"USE_PROFILES")?c.USE_PROFILES&&typeof c.USE_PROFILES=="object"?De(c.USE_PROFILES):c.USE_PROFILES:!1,Tt=c.ALLOW_ARIA_ATTR!==!1,It=c.ALLOW_DATA_ATTR!==!1,bs=c.ALLOW_UNKNOWN_PROTOCOLS||!1,xs=c.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Je=c.SAFE_FOR_TEMPLATES||!1,At=c.SAFE_FOR_XML!==!1,ot=c.WHOLE_DOCUMENT||!1,mt=c.RETURN_DOM||!1,qt=c.RETURN_DOM_FRAGMENT||!1,Gt=c.RETURN_TRUSTED_TYPE||!1,kn=c.FORCE_BODY||!1,ys=c.SANITIZE_DOM!==!1,ws=c.SANITIZE_NAMED_PROPS||!1,En=c.KEEP_CONTENT!==!1,Sn=c.IN_PLACE||!1,J=Wa(c.ALLOWED_URI_REGEXP)?c.ALLOWED_URI_REGEXP:Js,ht=typeof c.NAMESPACE=="string"?c.NAMESPACE:We,Cn=we(c,"MATHML_TEXT_INTEGRATION_POINTS")&&c.MATHML_TEXT_INTEGRATION_POINTS&&typeof c.MATHML_TEXT_INTEGRATION_POINTS=="object"?De(c.MATHML_TEXT_INTEGRATION_POINTS):ee({},Ts),Rn=we(c,"HTML_INTEGRATION_POINTS")&&c.HTML_INTEGRATION_POINTS&&typeof c.HTML_INTEGRATION_POINTS=="object"?De(c.HTML_INTEGRATION_POINTS):ee({},Is);const u=we(c,"CUSTOM_ELEMENT_HANDLING")&&c.CUSTOM_ELEMENT_HANDLING&&typeof c.CUSTOM_ELEMENT_HANDLING=="object"?De(c.CUSTOM_ELEMENT_HANDLING):wt(null);if(se=wt(null),we(u,"tagNameCheck")&&As(u.tagNameCheck)&&(se.tagNameCheck=u.tagNameCheck),we(u,"attributeNameCheck")&&As(u.attributeNameCheck)&&(se.attributeNameCheck=u.attributeNameCheck),we(u,"allowCustomizedBuiltInElements")&&typeof u.allowCustomizedBuiltInElements=="boolean"&&(se.allowCustomizedBuiltInElements=u.allowCustomizedBuiltInElements),Te(se),Je&&(It=!1),qt&&(mt=!0),gt&&(q=ee({},Ys),X=wt(null),gt.html===!0&&(ee(q,Ks),ee(X,Zs)),gt.svg===!0&&(ee(q,Pn),ee(X,Un),ee(X,Qt)),gt.svgFilters===!0&&(ee(q,Mn),ee(X,Un),ee(X,Qt)),gt.mathMl===!0&&(ee(q,Bn),ee(X,Xs),ee(X,Qt))),$e.tagCheck=null,$e.attributeCheck=null,we(c,"ADD_TAGS")&&(typeof c.ADD_TAGS=="function"?$e.tagCheck=c.ADD_TAGS:tt(c.ADD_TAGS)&&(q===ve&&(q=De(q)),ee(q,c.ADD_TAGS,ie))),we(c,"ADD_ATTR")&&(typeof c.ADD_ATTR=="function"?$e.attributeCheck=c.ADD_ATTR:tt(c.ADD_ATTR)&&(X===ke&&(X=De(X)),ee(X,c.ADD_ATTR,ie))),we(c,"ADD_URI_SAFE_ATTR")&&tt(c.ADD_URI_SAFE_ATTR)&&ee(In,c.ADD_URI_SAFE_ATTR,ie),we(c,"FORBID_CONTENTS")&&tt(c.FORBID_CONTENTS)&&(Fe===Tn&&(Fe=De(Fe)),ee(Fe,c.FORBID_CONTENTS,ie)),we(c,"ADD_FORBID_CONTENTS")&&tt(c.ADD_FORBID_CONTENTS)&&(Fe===Tn&&(Fe=De(Fe)),ee(Fe,c.ADD_FORBID_CONTENTS,ie)),En&&(q["#text"]=!0),ot&&ee(q,["html","head","body"]),q.table&&(ee(q,["tbody"]),delete Ce.tbody),c.TRUSTED_TYPES_POLICY){if(typeof c.TRUSTED_TYPES_POLICY.createHTML!="function")throw rt('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof c.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw rt('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');const A=k;k=c.TRUSTED_TYPES_POLICY;try{C=ae("")}catch(N){throw k=A,N}}else c.TRUSTED_TYPES_POLICY===null?(k=void 0,C=""):(k===void 0&&(k=Ie()),k&&typeof C=="string"&&(C=ae("")));Se&&Se(c),bt=c},Ls=ee({},[...Pn,...Mn,...qa]),Cs=ee({},[...Bn,...Ga]),sa=function(c,u,A){return u.namespaceURI===We?c==="svg":u.namespaceURI===Vt?c==="svg"&&(A==="annotation-xml"||Cn[A]):!!Ls[c]},oa=function(c,u,A){return u.namespaceURI===We?c==="math":u.namespaceURI===Kt?c==="math"&&Rn[A]:!!Cs[c]},aa=function(c,u,A){return u.namespaceURI===Kt&&!Rn[A]||u.namespaceURI===Vt&&!Cn[A]?!1:!Cs[c]&&(Qo[c]||!Ls[c])},ra=function(c){let u=P(c);(!u||!u.tagName)&&(u={namespaceURI:ht,tagName:"template"});const A=Nt(c.tagName),N=Nt(u.tagName);return Ln[c.namespaceURI]?c.namespaceURI===Kt?sa(A,u,N):c.namespaceURI===Vt?oa(A,u,N):c.namespaceURI===We?aa(A,u,N):!!(Lt==="application/xhtml+xml"&&Ln[c.namespaceURI]):!1},Qe=function(c){yt(e.removed,{element:c});try{P(c).removeChild(c)}catch{if(O(c),!P(c))throw rt("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place")}},Rs=function(c){const u=I(c);if(u){const N=[];Rt(u,Y=>{yt(N,Y)}),Rt(N,Y=>{try{O(Y)}catch{}})}const A=T(c);if(A)for(let N=A.length-1;N>=0;--N){const Y=A[N],te=Y&&Y.name;if(typeof te=="string")try{c.removeAttribute(te)}catch{}}},at=function(c,u){try{yt(e.removed,{attribute:u.getAttributeNode(c),from:u})}catch{yt(e.removed,{attribute:null,from:u})}if(u.removeAttribute(c),c==="is")if(mt||qt)try{Qe(u)}catch{}else try{u.setAttribute(c,"")}catch{}},ia=function(c){const u=T(c);if(u)for(let A=u.length-1;A>=0;--A){const N=u[A],Y=N&&N.name;if(!(typeof Y!="string"||X[ie(Y)]))try{c.removeAttribute(Y)}catch{}}},la=function(c){const u=[c];for(;u.length>0;){const A=u.pop();(v?v(A):A.nodeType)===qe.element&&ia(A);const Y=I(A);if(Y)for(let te=Y.length-1;te>=0;--te)u.push(Y[te])}},Ds=function(c){let u=null,A=null;if(kn)c="<remove></remove>"+c;else{const te=Ws(c,/^[\r\n\t ]+/);A=te&&te[0]}Lt==="application/xhtml+xml"&&ht===We&&(c='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+c+"</body></html>");const N=k?ae(c):c;if(ht===We)try{u=new p().parseFromString(N,Lt)}catch{}if(!u||!u.documentElement){u=x.createDocument(ht,"template",null);try{u.documentElement.innerHTML=An?C:N}catch{}}const Y=u.body||u.documentElement;return c&&A&&Y.insertBefore(t.createTextNode(A),Y.childNodes[0]||null),ht===We?z.call(u,ot?"html":"body")[0]:ot?u.documentElement:Y},$s=function(c){return E.call(c.ownerDocument||c,c,l.SHOW_ELEMENT|l.SHOW_COMMENT|l.SHOW_TEXT|l.SHOW_PROCESSING_INSTRUCTION|l.SHOW_CDATA_SECTION,null)},Yt=function(c){return c=Dt(c,H," "),c=Dt(c,K," "),c=Dt(c,j," "),c},$n=function(c){var u;c.normalize();const A=E.call(c.ownerDocument||c,c,l.SHOW_TEXT|l.SHOW_COMMENT|l.SHOW_CDATA_SECTION|l.SHOW_PROCESSING_INSTRUCTION,null);let N=A.nextNode();for(;N;)N.data=Yt(N.data),N=A.nextNode();const Y=(u=c.querySelectorAll)===null||u===void 0?void 0:u.call(c,"template");Y&&Rt(Y,te=>{xt(te.content)&&$n(te.content)})},Zt=function(c){const u=y?y(c):null;return typeof u!="string"||ie(u)!=="form"?!1:typeof c.nodeName!="string"||typeof c.textContent!="string"||typeof c.removeChild!="function"||c.attributes!==T(c)||typeof c.removeAttribute!="function"||typeof c.setAttribute!="function"||typeof c.namespaceURI!="string"||typeof c.insertBefore!="function"||typeof c.hasChildNodes!="function"||c.nodeType!==v(c)||c.childNodes!==I(c)},xt=function(c){if(!v||typeof c!="object"||c===null)return!1;try{return v(c)===qe.documentFragment}catch{return!1}},Ct=function(c){if(!v||typeof c!="object"||c===null)return!1;try{return typeof v(c)=="number"}catch{return!1}};function Ye(L,c,u){L.length!==0&&Rt(L,A=>{A.call(e,c,u,bt)})}const ca=function(c,u){return!!(At&&c.hasChildNodes()&&!Ct(c.firstElementChild)&&Ee(Qs,c.textContent)&&Ee(Qs,c.innerHTML)||At&&c.namespaceURI===We&&u==="style"&&Ct(c.firstElementChild)||c.nodeType===qe.processingInstruction||At&&c.nodeType===qe.comment&&Ee(nr,c.data))},da=function(c,u){if(!Ce[u]&&Ns(u)&&(se.tagNameCheck instanceof RegExp&&Ee(se.tagNameCheck,u)||se.tagNameCheck instanceof Function&&se.tagNameCheck(u)))return!1;if(En&&!Fe[u]){const A=P(c),N=I(c);if(N&&A){const Y=N.length;for(let te=Y-1;te>=0;--te){const ye=Sn?N[te]:f(N[te],!0);A.insertBefore(ye,U(c))}}}return Qe(c),!0},_s=function(c){if(Ye(R.beforeSanitizeElements,c,null),Zt(c))return Qe(c),!0;const u=ie(y?y(c):c.nodeName);if(Ye(R.uponSanitizeElement,c,{tagName:u,allowedTags:q}),ca(c,u))return Qe(c),!0;if(Ce[u]||!($e.tagCheck instanceof Function&&$e.tagCheck(u))&&!q[u])return da(c,u);if((v?v(c):c.nodeType)===qe.element&&!ra(c)||(u==="noscript"||u==="noembed"||u==="noframes")&&Ee(sr,c.innerHTML))return Qe(c),!0;if(Je&&c.nodeType===qe.text){const N=Yt(c.textContent);c.textContent!==N&&(yt(e.removed,{element:c.cloneNode()}),c.textContent=N)}return Ye(R.afterSanitizeElements,c,null),!1},Os=function(c,u,A){if(xe[u]||ys&&(u==="id"||u==="name")&&(A in t||A in na))return!1;const N=X[u]||$e.attributeCheck instanceof Function&&$e.attributeCheck(u,c);if(!(It&&Ee(h,u))){if(!(Tt&&Ee(w,u))){if(N){if(!In[u]){if(!Ee(J,Dt(A,D,""))){if(!((u==="src"||u==="xlink:href"||u==="href")&&c!=="script"&&qs(A,"data:")===0&&ks[c])){if(!(bs&&!Ee(S,Dt(A,D,"")))){if(A)return!1}}}}}else if(!(Ns(c)&&(se.tagNameCheck instanceof RegExp&&Ee(se.tagNameCheck,c)||se.tagNameCheck instanceof Function&&se.tagNameCheck(c))&&(se.attributeNameCheck instanceof RegExp&&Ee(se.attributeNameCheck,u)||se.attributeNameCheck instanceof Function&&se.attributeNameCheck(u,c))||u==="is"&&se.allowCustomizedBuiltInElements&&(se.tagNameCheck instanceof RegExp&&Ee(se.tagNameCheck,A)||se.tagNameCheck instanceof Function&&se.tagNameCheck(A))))return!1}}return!0},pa=ee({},["annotation-xml","color-profile","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","missing-glyph"]),Ns=function(c){return!pa[Nt(c)]&&Ee(M,c)},ua=function(c,u,A,N){if(k&&typeof m=="object"&&typeof m.getAttributeType=="function"&&!A)switch(m.getAttributeType(c,u)){case"TrustedHTML":return ae(N);case"TrustedScriptURL":return pe(N)}return N},fa=function(c,u,A,N){try{A?c.setAttributeNS(A,u,N):c.setAttribute(u,N),Zt(c)?Qe(c):Fs(e.removed)}catch{at(u,c)}},Ps=function(c){Ye(R.beforeSanitizeAttributes,c,null);const u=c.attributes;if(!u||Zt(c))return;const A={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:X,forceKeepAttr:void 0};let N=u.length;const Y=ie(c.nodeName);for(;N--;){const te=u[N],ye=te.name,fe=te.namespaceURI,Oe=te.value,ze=ie(ye),On=Oe;let Re=ye==="value"?On:Ba(On);if(A.attrName=ze,A.attrValue=Re,A.keepAttr=!0,A.forceKeepAttr=void 0,Ye(R.uponSanitizeAttribute,c,A),Re=A.attrValue,ws&&(ze==="id"||ze==="name")&&qs(Re,vs)!==0&&(at(ye,c),Re=vs+Re),At&&Ee(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i,Re)){at(ye,c);continue}if(ze==="attributename"&&Ws(Re,"href")){at(ye,c);continue}if(!A.forceKeepAttr){if(!A.keepAttr){at(ye,c);continue}if(!xs&&Ee(or,Re)){at(ye,c);continue}if(Je&&(Re=Yt(Re)),!Os(Y,ze,Re)){at(ye,c);continue}Re=ua(Y,ze,fe,Re),Re!==On&&fa(c,ye,fe,Re)}}Ye(R.afterSanitizeAttributes,c,null)},Xt=function(c){let u=null;const A=$s(c);for(Ye(R.beforeSanitizeShadowDOM,c,null);u=A.nextNode();)if(Ye(R.uponSanitizeShadowNode,u,null),_s(u),Ps(u),xt(u.content)&&Xt(u.content),(v?v(u):u.nodeType)===qe.element){const Y=Z(u);xt(Y)&&(_n(Y),Xt(Y))}Ye(R.afterSanitizeShadowDOM,c,null)},_n=function(c){const u=[{node:c,shadow:null}];for(;u.length>0;){const A=u.pop();if(A.shadow){Xt(A.shadow);continue}const N=A.node,te=(v?v(N):N.nodeType)===qe.element,ye=I(N);if(ye)for(let fe=ye.length-1;fe>=0;--fe)u.push({node:ye[fe],shadow:null});if(te){const fe=y?y(N):null;if(typeof fe=="string"&&ie(fe)==="template"){const Oe=N.content;xt(Oe)&&u.push({node:Oe,shadow:null})}}if(te){const fe=Z(N);xt(fe)&&u.push({node:null,shadow:fe},{node:fe,shadow:null})}}};return e.sanitize=function(L){let c=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},u=null,A=null,N=null,Y=null;if(An=!L,An&&(L="<!-->"),typeof L!="string"&&!Ct(L)&&(L=Fa(L),typeof L!="string"))throw rt("dirty is not a string, aborting");if(!e.isSupported)return L;yn?(q=wn,X=vn):Dn(c),(R.uponSanitizeElement.length>0||R.uponSanitizeAttribute.length>0)&&(q=De(q)),R.uponSanitizeAttribute.length>0&&(X=De(X)),e.removed=[];const te=Sn&&typeof L!="string"&&Ct(L);if(te){const Oe=y?y(L):L.nodeName;if(typeof Oe=="string"){const ze=ie(Oe);if(!q[ze]||Ce[ze])throw rt("root node is forbidden and cannot be sanitized in-place")}if(Zt(L))throw rt("root node is clobbered and cannot be sanitized in-place");try{_n(L)}catch(ze){throw Rs(L),ze}}else if(Ct(L))u=Ds("<!---->"),A=u.ownerDocument.importNode(L,!0),A.nodeType===qe.element&&A.nodeName==="BODY"||A.nodeName==="HTML"?u=A:u.appendChild(A),_n(A);else{if(!mt&&!Je&&!ot&&L.indexOf("<")===-1)return k&&Gt?ae(L):L;if(u=Ds(L),!u)return mt?null:Gt?C:""}u&&kn&&Qe(u.firstChild);const ye=$s(te?L:u);try{for(;N=ye.nextNode();)_s(N),Ps(N),xt(N.content)&&Xt(N.content)}catch(Oe){throw te&&Rs(L),Oe}if(te)return Rt(e.removed,Oe=>{Oe.element&&la(Oe.element)}),Je&&$n(L),L;if(mt){if(Je&&$n(u),qt)for(Y=F.call(u.ownerDocument);u.firstChild;)Y.appendChild(u.firstChild);else Y=u;return(X.shadowroot||X.shadowrootmode)&&(Y=b.call(n,Y,!0)),Y}let fe=ot?u.outerHTML:u.innerHTML;return ot&&q["!doctype"]&&u.ownerDocument&&u.ownerDocument.doctype&&u.ownerDocument.doctype.name&&Ee(er,u.ownerDocument.doctype.name)&&(fe="<!DOCTYPE "+u.ownerDocument.doctype.name+`>
`+fe),Je&&(fe=Yt(fe)),k&&Gt?ae(fe):fe},e.setConfig=function(){let L=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Dn(L),yn=!0,wn=q,vn=X},e.clearConfig=function(){bt=null,yn=!1,wn=null,vn=null,k=V,C=""},e.isValidAttribute=function(L,c,u){bt||Dn({});const A=ie(L),N=ie(c);return Os(A,N,u)},e.addHook=function(L,c){typeof c=="function"&&we(R,L)&&yt(R[L],c)},e.removeHook=function(L,c){if(we(R,L)){if(c!==void 0){const u=Pa(R[L],c);return u===-1?void 0:Ma(R[L],u,1)[0]}return Fs(R[L])}},e.removeHooks=function(L){we(R,L)&&(R[L]=[])},e.removeAllHooks=function(){R=eo()},e}var Mt=ko();function as(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}let ut=as();function Eo(s){ut=s}const So=/[&<>"']/,ir=new RegExp(So.source,"g"),To=/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,lr=new RegExp(To.source,"g"),cr={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},to=s=>cr[s];function _e(s,e){if(e){if(So.test(s))return s.replace(ir,to)}else if(To.test(s))return s.replace(lr,to);return s}const dr=/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;function pr(s){return s.replace(dr,(e,t)=>(t=t.toLowerCase(),t==="colon"?":":t.charAt(0)==="#"?t.charAt(1)==="x"?String.fromCharCode(parseInt(t.substring(2),16)):String.fromCharCode(+t.substring(1)):""))}const ur=/(^|[^\[])\^/g;function oe(s,e){let t=typeof s=="string"?s:s.source;e=e||"";const n={replace:(o,a)=>{let r=typeof a=="string"?a:a.source;return r=r.replace(ur,"$1"),t=t.replace(o,r),n},getRegex:()=>new RegExp(t,e)};return n}function no(s){try{s=encodeURI(s).replace(/%25/g,"%")}catch{return null}return s}const Bt={exec:()=>null};function so(s,e){const t=s.replace(/\|/g,(a,r,i)=>{let l=!1,d=r;for(;--d>=0&&i[d]==="\\";)l=!l;return l?"|":" |"}),n=t.split(/ \|/);let o=0;if(n[0].trim()||n.shift(),n.length>0&&!n[n.length-1].trim()&&n.pop(),e)if(n.length>e)n.splice(e);else for(;n.length<e;)n.push("");for(;o<n.length;o++)n[o]=n[o].trim().replace(/\\\|/g,"|");return n}function en(s,e,t){const n=s.length;if(n===0)return"";let o=0;for(;o<n&&s.charAt(n-o-1)===e;)o++;return s.slice(0,n-o)}function fr(s,e){if(s.indexOf(e[1])===-1)return-1;let t=0;for(let n=0;n<s.length;n++)if(s[n]==="\\")n++;else if(s[n]===e[0])t++;else if(s[n]===e[1]&&(t--,t<0))return n;return-1}function oo(s,e,t,n){const o=e.href,a=e.title?_e(e.title):null,r=s[1].replace(/\\([\[\]])/g,"$1");if(s[0].charAt(0)!=="!"){n.state.inLink=!0;const i={type:"link",raw:t,href:o,title:a,text:r,tokens:n.inlineTokens(r)};return n.state.inLink=!1,i}return{type:"image",raw:t,href:o,title:a,text:_e(r)}}function mr(s,e){const t=s.match(/^(\s+)(?:```)/);if(t===null)return e;const n=t[1];return e.split(`
`).map(o=>{const a=o.match(/^\s+/);if(a===null)return o;const[r]=a;return r.length>=n.length?o.slice(n.length):o}).join(`
`)}class pn{constructor(e){re(this,"options");re(this,"rules");re(this,"lexer");this.options=e||ut}space(e){const t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){const t=this.rules.block.code.exec(e);if(t){const n=t[0].replace(/^ {1,4}/gm,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:en(n,`
`)}}}fences(e){const t=this.rules.block.fences.exec(e);if(t){const n=t[0],o=mr(n,t[3]||"");return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:o}}}heading(e){const t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(/#$/.test(n)){const o=en(n,"#");(this.options.pedantic||!o||/ $/.test(o))&&(n=o.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){const t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:t[0]}}blockquote(e){const t=this.rules.block.blockquote.exec(e);if(t){let n=t[0].replace(/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,`
    $1`);n=en(n.replace(/^ *>[ \t]?/gm,""),`
`);const o=this.lexer.state.top;this.lexer.state.top=!0;const a=this.lexer.blockTokens(n);return this.lexer.state.top=o,{type:"blockquote",raw:t[0],tokens:a,text:n}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim();const o=n.length>1,a={type:"list",raw:"",ordered:o,start:o?+n.slice(0,-1):"",loose:!1,items:[]};n=o?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=o?n:"[*+-]");const r=new RegExp(`^( {0,3}${n})((?:[	 ][^\\n]*)?(?:\\n|$))`);let i="",l="",d=!1;for(;e;){let p=!1;if(!(t=r.exec(e))||this.rules.block.hr.test(e))break;i=t[0],e=e.substring(i.length);let m=t[2].split(`
`,1)[0].replace(/^\t+/,P=>" ".repeat(3*P.length)),g=e.split(`
`,1)[0],f=0;this.options.pedantic?(f=2,l=m.trimStart()):(f=t[2].search(/[^ ]/),f=f>4?1:f,l=m.slice(f),f+=t[1].length);let O=!1;if(!m&&/^ *$/.test(g)&&(i+=g+`
`,e=e.substring(g.length+1),p=!0),!p){const P=new RegExp(`^ {0,${Math.min(3,f-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),Z=new RegExp(`^ {0,${Math.min(3,f-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),T=new RegExp(`^ {0,${Math.min(3,f-1)}}(?:\`\`\`|~~~)`),v=new RegExp(`^ {0,${Math.min(3,f-1)}}#`);for(;e;){const y=e.split(`
`,1)[0];if(g=y,this.options.pedantic&&(g=g.replace(/^ {1,4}(?=( {4})*[^ ])/g,"  ")),T.test(g)||v.test(g)||P.test(g)||Z.test(e))break;if(g.search(/[^ ]/)>=f||!g.trim())l+=`
`+g.slice(f);else{if(O||m.search(/[^ ]/)>=4||T.test(m)||v.test(m)||Z.test(m))break;l+=`
`+g}!O&&!g.trim()&&(O=!0),i+=y+`
`,e=e.substring(y.length+1),m=g.slice(f)}}a.loose||(d?a.loose=!0:/\n *\n *$/.test(i)&&(d=!0));let U=null,I;this.options.gfm&&(U=/^\[[ xX]\] /.exec(l),U&&(I=U[0]!=="[ ] ",l=l.replace(/^\[[ xX]\] +/,""))),a.items.push({type:"list_item",raw:i,task:!!U,checked:I,loose:!1,text:l,tokens:[]}),a.raw+=i}a.items[a.items.length-1].raw=i.trimEnd(),a.items[a.items.length-1].text=l.trimEnd(),a.raw=a.raw.trimEnd();for(let p=0;p<a.items.length;p++)if(this.lexer.state.top=!1,a.items[p].tokens=this.lexer.blockTokens(a.items[p].text,[]),!a.loose){const m=a.items[p].tokens.filter(f=>f.type==="space"),g=m.length>0&&m.some(f=>/\n.*\n/.test(f.raw));a.loose=g}if(a.loose)for(let p=0;p<a.items.length;p++)a.items[p].loose=!0;return a}}html(e){const t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){const t=this.rules.block.def.exec(e);if(t){const n=t[1].toLowerCase().replace(/\s+/g," "),o=t[2]?t[2].replace(/^<(.*)>$/,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",a=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:o,title:a}}}table(e){const t=this.rules.block.table.exec(e);if(!t||!/[:|]/.test(t[2]))return;const n=so(t[1]),o=t[2].replace(/^\||\| *$/g,"").split("|"),a=t[3]&&t[3].trim()?t[3].replace(/\n[ \t]*$/,"").split(`
`):[],r={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===o.length){for(const i of o)/^ *-+: *$/.test(i)?r.align.push("right"):/^ *:-+: *$/.test(i)?r.align.push("center"):/^ *:-+ *$/.test(i)?r.align.push("left"):r.align.push(null);for(const i of n)r.header.push({text:i,tokens:this.lexer.inline(i)});for(const i of a)r.rows.push(so(i,r.header.length).map(l=>({text:l,tokens:this.lexer.inline(l)})));return r}}lheading(e){const t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){const t=this.rules.block.paragraph.exec(e);if(t){const n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){const t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){const t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:_e(t[1])}}tag(e){const t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&/^<a /i.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&/^<\/a>/i.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&/^<(pre|code|kbd|script)(\s|>)/i.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&/^<\/(pre|code|kbd|script)(\s|>)/i.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){const t=this.rules.inline.link.exec(e);if(t){const n=t[2].trim();if(!this.options.pedantic&&/^</.test(n)){if(!/>$/.test(n))return;const r=en(n.slice(0,-1),"\\");if((n.length-r.length)%2===0)return}else{const r=fr(t[2],"()");if(r>-1){const l=(t[0].indexOf("!")===0?5:4)+t[1].length+r;t[2]=t[2].substring(0,r),t[0]=t[0].substring(0,l).trim(),t[3]=""}}let o=t[2],a="";if(this.options.pedantic){const r=/^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(o);r&&(o=r[1],a=r[3])}else a=t[3]?t[3].slice(1,-1):"";return o=o.trim(),/^</.test(o)&&(this.options.pedantic&&!/>$/.test(n)?o=o.slice(1):o=o.slice(1,-1)),oo(t,{href:o&&o.replace(this.rules.inline.anyPunctuation,"$1"),title:a&&a.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){const o=(n[2]||n[1]).replace(/\s+/g," "),a=t[o.toLowerCase()];if(!a){const r=n[0].charAt(0);return{type:"text",raw:r,text:r}}return oo(n,a,n[0],this.lexer)}}emStrong(e,t,n=""){let o=this.rules.inline.emStrongLDelim.exec(e);if(!o||o[3]&&n.match(/[\p{L}\p{N}]/u))return;if(!(o[1]||o[2]||"")||!n||this.rules.inline.punctuation.exec(n)){const r=[...o[0]].length-1;let i,l,d=r,p=0;const m=o[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(m.lastIndex=0,t=t.slice(-1*e.length+r);(o=m.exec(t))!=null;){if(i=o[1]||o[2]||o[3]||o[4]||o[5]||o[6],!i)continue;if(l=[...i].length,o[3]||o[4]){d+=l;continue}else if((o[5]||o[6])&&r%3&&!((r+l)%3)){p+=l;continue}if(d-=l,d>0)continue;l=Math.min(l,l+d+p);const g=[...o[0]][0].length,f=e.slice(0,r+o.index+g+l);if(Math.min(r,l)%2){const U=f.slice(1,-1);return{type:"em",raw:f,text:U,tokens:this.lexer.inlineTokens(U)}}const O=f.slice(2,-2);return{type:"strong",raw:f,text:O,tokens:this.lexer.inlineTokens(O)}}}}codespan(e){const t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(/\n/g," ");const o=/[^ ]/.test(n),a=/^ /.test(n)&&/ $/.test(n);return o&&a&&(n=n.substring(1,n.length-1)),n=_e(n,!0),{type:"codespan",raw:t[0],text:n}}}br(e){const t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){const t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){const t=this.rules.inline.autolink.exec(e);if(t){let n,o;return t[2]==="@"?(n=_e(t[1]),o="mailto:"+n):(n=_e(t[1]),o=n),{type:"link",raw:t[0],text:n,href:o,tokens:[{type:"text",raw:n,text:n}]}}}url(e){var n;let t;if(t=this.rules.inline.url.exec(e)){let o,a;if(t[2]==="@")o=_e(t[0]),a="mailto:"+o;else{let r;do r=t[0],t[0]=((n=this.rules.inline._backpedal.exec(t[0]))==null?void 0:n[0])??"";while(r!==t[0]);o=_e(t[0]),t[1]==="www."?a="http://"+t[0]:a=t[0]}return{type:"link",raw:t[0],text:o,href:a,tokens:[{type:"text",raw:o,text:o}]}}}inlineText(e){const t=this.rules.inline.text.exec(e);if(t){let n;return this.lexer.state.inRawBlock?n=t[0]:n=_e(t[0]),{type:"text",raw:t[0],text:n}}}}const gr=/^(?: *(?:\n|$))+/,hr=/^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,br=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Ft=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,xr=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Io=/(?:[*+-]|\d{1,9}[.)])/,Ao=oe(/^(?!bull |blockCode|fences|blockquote|heading|html)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html))+?)\n {0,3}(=+|-+) *(?:\n+|$)/).replace(/bull/g,Io).replace(/blockCode/g,/ {4}/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).getRegex(),rs=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,yr=/^[^\n]+/,is=/(?!\s*\])(?:\\.|[^\[\]\\])+/,wr=oe(/^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/).replace("label",is).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),vr=oe(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Io).getRegex(),xn="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",ls=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,kr=oe("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))","i").replace("comment",ls).replace("tag",xn).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Lo=oe(rs).replace("hr",Ft).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",xn).getRegex(),Er=oe(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Lo).getRegex(),cs={blockquote:Er,code:hr,def:wr,fences:br,heading:xr,hr:Ft,html:kr,lheading:Ao,list:vr,newline:gr,paragraph:Lo,table:Bt,text:yr},ao=oe("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Ft).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code"," {4}[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",xn).getRegex(),Sr={...cs,table:ao,paragraph:oe(rs).replace("hr",Ft).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",ao).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",xn).getRegex()},Tr={...cs,html:oe(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",ls).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Bt,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:oe(rs).replace("hr",Ft).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Ao).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Co=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Ir=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Ro=/^( {2,}|\\)\n(?!\s*$)/,Ar=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Wt="\\p{P}\\p{S}",Lr=oe(/^((?![*_])[\spunctuation])/,"u").replace(/punctuation/g,Wt).getRegex(),Cr=/\[[^[\]]*?\]\([^\(\)]*?\)|`[^`]*?`|<[^<>]*?>/g,Rr=oe(/^(?:\*+(?:((?!\*)[punct])|[^\s*]))|^_+(?:((?!_)[punct])|([^\s_]))/,"u").replace(/punct/g,Wt).getRegex(),Dr=oe("^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)[punct](\\*+)(?=[\\s]|$)|[^punct\\s](\\*+)(?!\\*)(?=[punct\\s]|$)|(?!\\*)[punct\\s](\\*+)(?=[^punct\\s])|[\\s](\\*+)(?!\\*)(?=[punct])|(?!\\*)[punct](\\*+)(?!\\*)(?=[punct])|[^punct\\s](\\*+)(?=[^punct\\s])","gu").replace(/punct/g,Wt).getRegex(),$r=oe("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)[punct](_+)(?=[\\s]|$)|[^punct\\s](_+)(?!_)(?=[punct\\s]|$)|(?!_)[punct\\s](_+)(?=[^punct\\s])|[\\s](_+)(?!_)(?=[punct])|(?!_)[punct](_+)(?!_)(?=[punct])","gu").replace(/punct/g,Wt).getRegex(),_r=oe(/\\([punct])/,"gu").replace(/punct/g,Wt).getRegex(),Or=oe(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Nr=oe(ls).replace("(?:-->|$)","-->").getRegex(),Pr=oe("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Nr).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),un=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,Mr=oe(/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/).replace("label",un).replace("href",/<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Do=oe(/^!?\[(label)\]\[(ref)\]/).replace("label",un).replace("ref",is).getRegex(),$o=oe(/^!?\[(ref)\](?:\[\])?/).replace("ref",is).getRegex(),Br=oe("reflink|nolink(?!\\()","g").replace("reflink",Do).replace("nolink",$o).getRegex(),ds={_backpedal:Bt,anyPunctuation:_r,autolink:Or,blockSkip:Cr,br:Ro,code:Ir,del:Bt,emStrongLDelim:Rr,emStrongRDelimAst:Dr,emStrongRDelimUnd:$r,escape:Co,link:Mr,nolink:$o,punctuation:Lr,reflink:Do,reflinkSearch:Br,tag:Pr,text:Ar,url:Bt},Ur={...ds,link:oe(/^!?\[(label)\]\((.*?)\)/).replace("label",un).getRegex(),reflink:oe(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",un).getRegex()},Xn={...ds,escape:oe(Co).replace("])","~|])").getRegex(),url:oe(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},zr={...Xn,br:oe(Ro).replace("{2,}","*").getRegex(),text:oe(Xn.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},tn={normal:cs,gfm:Sr,pedantic:Tr},_t={normal:ds,gfm:Xn,breaks:zr,pedantic:Ur};class Ve{constructor(e){re(this,"tokens");re(this,"options");re(this,"state");re(this,"tokenizer");re(this,"inlineQueue");this.tokens=[],this.tokens.links=Object.create(null),this.options=e||ut,this.options.tokenizer=this.options.tokenizer||new pn,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const t={block:tn.normal,inline:_t.normal};this.options.pedantic?(t.block=tn.pedantic,t.inline=_t.pedantic):this.options.gfm&&(t.block=tn.gfm,this.options.breaks?t.inline=_t.breaks:t.inline=_t.gfm),this.tokenizer.rules=t}static get rules(){return{block:tn,inline:_t}}static lex(e,t){return new Ve(t).lex(e)}static lexInline(e,t){return new Ve(t).inlineTokens(e)}lex(e){e=e.replace(/\r\n|\r/g,`
`),this.blockTokens(e,this.tokens);for(let t=0;t<this.inlineQueue.length;t++){const n=this.inlineQueue[t];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,t=[]){this.options.pedantic?e=e.replace(/\t/g,"    ").replace(/^ +$/gm,""):e=e.replace(/^( *)(\t+)/gm,(i,l,d)=>l+"    ".repeat(d.length));let n,o,a,r;for(;e;)if(!(this.options.extensions&&this.options.extensions.block&&this.options.extensions.block.some(i=>(n=i.call({lexer:this},e,t))?(e=e.substring(n.raw.length),t.push(n),!0):!1))){if(n=this.tokenizer.space(e)){e=e.substring(n.raw.length),n.raw.length===1&&t.length>0?t[t.length-1].raw+=`
`:t.push(n);continue}if(n=this.tokenizer.code(e)){e=e.substring(n.raw.length),o=t[t.length-1],o&&(o.type==="paragraph"||o.type==="text")?(o.raw+=`
`+n.raw,o.text+=`
`+n.text,this.inlineQueue[this.inlineQueue.length-1].src=o.text):t.push(n);continue}if(n=this.tokenizer.fences(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.heading(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.hr(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.blockquote(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.list(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.html(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.def(e)){e=e.substring(n.raw.length),o=t[t.length-1],o&&(o.type==="paragraph"||o.type==="text")?(o.raw+=`
`+n.raw,o.text+=`
`+n.raw,this.inlineQueue[this.inlineQueue.length-1].src=o.text):this.tokens.links[n.tag]||(this.tokens.links[n.tag]={href:n.href,title:n.title});continue}if(n=this.tokenizer.table(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.lheading(e)){e=e.substring(n.raw.length),t.push(n);continue}if(a=e,this.options.extensions&&this.options.extensions.startBlock){let i=1/0;const l=e.slice(1);let d;this.options.extensions.startBlock.forEach(p=>{d=p.call({lexer:this},l),typeof d=="number"&&d>=0&&(i=Math.min(i,d))}),i<1/0&&i>=0&&(a=e.substring(0,i+1))}if(this.state.top&&(n=this.tokenizer.paragraph(a))){o=t[t.length-1],r&&o.type==="paragraph"?(o.raw+=`
`+n.raw,o.text+=`
`+n.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=o.text):t.push(n),r=a.length!==e.length,e=e.substring(n.raw.length);continue}if(n=this.tokenizer.text(e)){e=e.substring(n.raw.length),o=t[t.length-1],o&&o.type==="text"?(o.raw+=`
`+n.raw,o.text+=`
`+n.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=o.text):t.push(n);continue}if(e){const i="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(i);break}else throw new Error(i)}}return this.state.top=!0,t}inline(e,t=[]){return this.inlineQueue.push({src:e,tokens:t}),t}inlineTokens(e,t=[]){let n,o,a,r=e,i,l,d;if(this.tokens.links){const p=Object.keys(this.tokens.links);if(p.length>0)for(;(i=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)p.includes(i[0].slice(i[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,i.index)+"["+"a".repeat(i[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(i=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)r=r.slice(0,i.index)+"["+"a".repeat(i[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);for(;(i=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,i.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;e;)if(l||(d=""),l=!1,!(this.options.extensions&&this.options.extensions.inline&&this.options.extensions.inline.some(p=>(n=p.call({lexer:this},e,t))?(e=e.substring(n.raw.length),t.push(n),!0):!1))){if(n=this.tokenizer.escape(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.tag(e)){e=e.substring(n.raw.length),o=t[t.length-1],o&&n.type==="text"&&o.type==="text"?(o.raw+=n.raw,o.text+=n.text):t.push(n);continue}if(n=this.tokenizer.link(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(n.raw.length),o=t[t.length-1],o&&n.type==="text"&&o.type==="text"?(o.raw+=n.raw,o.text+=n.text):t.push(n);continue}if(n=this.tokenizer.emStrong(e,r,d)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.codespan(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.br(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.del(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.autolink(e)){e=e.substring(n.raw.length),t.push(n);continue}if(!this.state.inLink&&(n=this.tokenizer.url(e))){e=e.substring(n.raw.length),t.push(n);continue}if(a=e,this.options.extensions&&this.options.extensions.startInline){let p=1/0;const m=e.slice(1);let g;this.options.extensions.startInline.forEach(f=>{g=f.call({lexer:this},m),typeof g=="number"&&g>=0&&(p=Math.min(p,g))}),p<1/0&&p>=0&&(a=e.substring(0,p+1))}if(n=this.tokenizer.inlineText(a)){e=e.substring(n.raw.length),n.raw.slice(-1)!=="_"&&(d=n.raw.slice(-1)),l=!0,o=t[t.length-1],o&&o.type==="text"?(o.raw+=n.raw,o.text+=n.text):t.push(n);continue}if(e){const p="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(p);break}else throw new Error(p)}}return t}}class fn{constructor(e){re(this,"options");this.options=e||ut}code(e,t,n){var a;const o=(a=(t||"").match(/^\S*/))==null?void 0:a[0];return e=e.replace(/\n$/,"")+`
`,o?'<pre><code class="language-'+_e(o)+'">'+(n?e:_e(e,!0))+`</code></pre>
`:"<pre><code>"+(n?e:_e(e,!0))+`</code></pre>
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
`}strong(e){return`<strong>${e}</strong>`}em(e){return`<em>${e}</em>`}codespan(e){return`<code>${e}</code>`}br(){return"<br>"}del(e){return`<del>${e}</del>`}link(e,t,n){const o=no(e);if(o===null)return n;e=o;let a='<a href="'+e+'"';return t&&(a+=' title="'+t+'"'),a+=">"+n+"</a>",a}image(e,t,n){const o=no(e);if(o===null)return n;e=o;let a=`<img src="${e}" alt="${n}"`;return t&&(a+=` title="${t}"`),a+=">",a}text(e){return e}}class ps{strong(e){return e}em(e){return e}codespan(e){return e}del(e){return e}html(e){return e}text(e){return e}link(e,t,n){return""+n}image(e,t,n){return""+n}br(){return""}}class Ke{constructor(e){re(this,"options");re(this,"renderer");re(this,"textRenderer");this.options=e||ut,this.options.renderer=this.options.renderer||new fn,this.renderer=this.options.renderer,this.renderer.options=this.options,this.textRenderer=new ps}static parse(e,t){return new Ke(t).parse(e)}static parseInline(e,t){return new Ke(t).parseInline(e)}parse(e,t=!0){let n="";for(let o=0;o<e.length;o++){const a=e[o];if(this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[a.type]){const r=a,i=this.options.extensions.renderers[r.type].call({parser:this},r);if(i!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(r.type)){n+=i||"";continue}}switch(a.type){case"space":continue;case"hr":{n+=this.renderer.hr();continue}case"heading":{const r=a;n+=this.renderer.heading(this.parseInline(r.tokens),r.depth,pr(this.parseInline(r.tokens,this.textRenderer)));continue}case"code":{const r=a;n+=this.renderer.code(r.text,r.lang,!!r.escaped);continue}case"table":{const r=a;let i="",l="";for(let p=0;p<r.header.length;p++)l+=this.renderer.tablecell(this.parseInline(r.header[p].tokens),{header:!0,align:r.align[p]});i+=this.renderer.tablerow(l);let d="";for(let p=0;p<r.rows.length;p++){const m=r.rows[p];l="";for(let g=0;g<m.length;g++)l+=this.renderer.tablecell(this.parseInline(m[g].tokens),{header:!1,align:r.align[g]});d+=this.renderer.tablerow(l)}n+=this.renderer.table(i,d);continue}case"blockquote":{const r=a,i=this.parse(r.tokens);n+=this.renderer.blockquote(i);continue}case"list":{const r=a,i=r.ordered,l=r.start,d=r.loose;let p="";for(let m=0;m<r.items.length;m++){const g=r.items[m],f=g.checked,O=g.task;let U="";if(g.task){const I=this.renderer.checkbox(!!f);d?g.tokens.length>0&&g.tokens[0].type==="paragraph"?(g.tokens[0].text=I+" "+g.tokens[0].text,g.tokens[0].tokens&&g.tokens[0].tokens.length>0&&g.tokens[0].tokens[0].type==="text"&&(g.tokens[0].tokens[0].text=I+" "+g.tokens[0].tokens[0].text)):g.tokens.unshift({type:"text",text:I+" "}):U+=I+" "}U+=this.parse(g.tokens,d),p+=this.renderer.listitem(U,O,!!f)}n+=this.renderer.list(p,i,l);continue}case"html":{const r=a;n+=this.renderer.html(r.text,r.block);continue}case"paragraph":{const r=a;n+=this.renderer.paragraph(this.parseInline(r.tokens));continue}case"text":{let r=a,i=r.tokens?this.parseInline(r.tokens):r.text;for(;o+1<e.length&&e[o+1].type==="text";)r=e[++o],i+=`
`+(r.tokens?this.parseInline(r.tokens):r.text);n+=t?this.renderer.paragraph(i):i;continue}default:{const r='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(r),"";throw new Error(r)}}}return n}parseInline(e,t){t=t||this.renderer;let n="";for(let o=0;o<e.length;o++){const a=e[o];if(this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[a.type]){const r=this.options.extensions.renderers[a.type].call({parser:this},a);if(r!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(a.type)){n+=r||"";continue}}switch(a.type){case"escape":{const r=a;n+=t.text(r.text);break}case"html":{const r=a;n+=t.html(r.text);break}case"link":{const r=a;n+=t.link(r.href,r.title,this.parseInline(r.tokens,t));break}case"image":{const r=a;n+=t.image(r.href,r.title,r.text);break}case"strong":{const r=a;n+=t.strong(this.parseInline(r.tokens,t));break}case"em":{const r=a;n+=t.em(this.parseInline(r.tokens,t));break}case"codespan":{const r=a;n+=t.codespan(r.text);break}case"br":{n+=t.br();break}case"del":{const r=a;n+=t.del(this.parseInline(r.tokens,t));break}case"text":{const r=a;n+=t.text(r.text);break}default:{const r='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(r),"";throw new Error(r)}}}return n}}class Ut{constructor(e){re(this,"options");this.options=e||ut}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}}re(Ut,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens"]));var pt,Jn,_o;class jr{constructor(...e){Bs(this,pt);re(this,"defaults",as());re(this,"options",this.setOptions);re(this,"parse",Jt(this,pt,Jn).call(this,Ve.lex,Ke.parse));re(this,"parseInline",Jt(this,pt,Jn).call(this,Ve.lexInline,Ke.parseInline));re(this,"Parser",Ke);re(this,"Renderer",fn);re(this,"TextRenderer",ps);re(this,"Lexer",Ve);re(this,"Tokenizer",pn);re(this,"Hooks",Ut);this.use(...e)}walkTokens(e,t){var o,a;let n=[];for(const r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{const i=r;for(const l of i.header)n=n.concat(this.walkTokens(l.tokens,t));for(const l of i.rows)for(const d of l)n=n.concat(this.walkTokens(d.tokens,t));break}case"list":{const i=r;n=n.concat(this.walkTokens(i.items,t));break}default:{const i=r;(a=(o=this.defaults.extensions)==null?void 0:o.childTokens)!=null&&a[i.type]?this.defaults.extensions.childTokens[i.type].forEach(l=>{const d=i[l].flat(1/0);n=n.concat(this.walkTokens(d,t))}):i.tokens&&(n=n.concat(this.walkTokens(i.tokens,t)))}}return n}use(...e){const t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{const o={...n};if(o.async=this.defaults.async||o.async||!1,n.extensions&&(n.extensions.forEach(a=>{if(!a.name)throw new Error("extension name required");if("renderer"in a){const r=t.renderers[a.name];r?t.renderers[a.name]=function(...i){let l=a.renderer.apply(this,i);return l===!1&&(l=r.apply(this,i)),l}:t.renderers[a.name]=a.renderer}if("tokenizer"in a){if(!a.level||a.level!=="block"&&a.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");const r=t[a.level];r?r.unshift(a.tokenizer):t[a.level]=[a.tokenizer],a.start&&(a.level==="block"?t.startBlock?t.startBlock.push(a.start):t.startBlock=[a.start]:a.level==="inline"&&(t.startInline?t.startInline.push(a.start):t.startInline=[a.start]))}"childTokens"in a&&a.childTokens&&(t.childTokens[a.name]=a.childTokens)}),o.extensions=t),n.renderer){const a=this.defaults.renderer||new fn(this.defaults);for(const r in n.renderer){if(!(r in a))throw new Error(`renderer '${r}' does not exist`);if(r==="options")continue;const i=r,l=n.renderer[i],d=a[i];a[i]=(...p)=>{let m=l.apply(a,p);return m===!1&&(m=d.apply(a,p)),m||""}}o.renderer=a}if(n.tokenizer){const a=this.defaults.tokenizer||new pn(this.defaults);for(const r in n.tokenizer){if(!(r in a))throw new Error(`tokenizer '${r}' does not exist`);if(["options","rules","lexer"].includes(r))continue;const i=r,l=n.tokenizer[i],d=a[i];a[i]=(...p)=>{let m=l.apply(a,p);return m===!1&&(m=d.apply(a,p)),m}}o.tokenizer=a}if(n.hooks){const a=this.defaults.hooks||new Ut;for(const r in n.hooks){if(!(r in a))throw new Error(`hook '${r}' does not exist`);if(r==="options")continue;const i=r,l=n.hooks[i],d=a[i];Ut.passThroughHooks.has(r)?a[i]=p=>{if(this.defaults.async)return Promise.resolve(l.call(a,p)).then(g=>d.call(a,g));const m=l.call(a,p);return d.call(a,m)}:a[i]=(...p)=>{let m=l.apply(a,p);return m===!1&&(m=d.apply(a,p)),m}}o.hooks=a}if(n.walkTokens){const a=this.defaults.walkTokens,r=n.walkTokens;o.walkTokens=function(i){let l=[];return l.push(r.call(this,i)),a&&(l=l.concat(a.call(this,i))),l}}this.defaults={...this.defaults,...o}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Ve.lex(e,t??this.defaults)}parser(e,t){return Ke.parse(e,t??this.defaults)}}pt=new WeakSet,Jn=function(e,t){return(n,o)=>{const a={...o},r={...this.defaults,...a};this.defaults.async===!0&&a.async===!1&&(r.silent||console.warn("marked(): The async option was set to true by an extension. The async: false option sent to parse will be ignored."),r.async=!0);const i=Jt(this,pt,_o).call(this,!!r.silent,!!r.async);if(typeof n>"u"||n===null)return i(new Error("marked(): input parameter is undefined or null"));if(typeof n!="string")return i(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(n)+", string expected"));if(r.hooks&&(r.hooks.options=r),r.async)return Promise.resolve(r.hooks?r.hooks.preprocess(n):n).then(l=>e(l,r)).then(l=>r.hooks?r.hooks.processAllTokens(l):l).then(l=>r.walkTokens?Promise.all(this.walkTokens(l,r.walkTokens)).then(()=>l):l).then(l=>t(l,r)).then(l=>r.hooks?r.hooks.postprocess(l):l).catch(i);try{r.hooks&&(n=r.hooks.preprocess(n));let l=e(n,r);r.hooks&&(l=r.hooks.processAllTokens(l)),r.walkTokens&&this.walkTokens(l,r.walkTokens);let d=t(l,r);return r.hooks&&(d=r.hooks.postprocess(d)),d}catch(l){return i(l)}}},_o=function(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){const o="<p>An error occurred:</p><pre>"+_e(n.message+"",!0)+"</pre>";return t?Promise.resolve(o):o}if(t)return Promise.reject(n);throw n}};const ct=new jr;function ne(s,e){return ct.parse(s,e)}ne.options=ne.setOptions=function(s){return ct.setOptions(s),ne.defaults=ct.defaults,Eo(ne.defaults),ne};ne.getDefaults=as;ne.defaults=ut;ne.use=function(...s){return ct.use(...s),ne.defaults=ct.defaults,Eo(ne.defaults),ne};ne.walkTokens=function(s,e){return ct.walkTokens(s,e)};ne.parseInline=ct.parseInline;ne.Parser=Ke;ne.parser=Ke.parse;ne.Renderer=fn;ne.TextRenderer=ps;ne.Lexer=Ve;ne.lexer=Ve.lex;ne.Tokenizer=pn;ne.Hooks=Ut;ne.parse=ne;ne.options;ne.setOptions;ne.use;ne.walkTokens;ne.parseInline;Ke.parse;Ve.lex;const dt=new ne.Renderer,Hr=dt.link.bind(dt);dt.code=(s,e)=>{const t=e||"";let n=s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;");if(t){const o=/\b(const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|import|export|class|extends|new|try|catch|finally|throw|def|print|elif|in|is|not|and|or|lambda|as|with|pass|public|private|protected|static|void|int|string|boolean|select|from|where|insert|update|delete|create|table|drop|values|into|join|on|group|by|order|true|false|null|None)\b/g,a=/(["'`])(.*?)\1/g,r=/(\/\/.*|#.*)/g;n=n.replace(r,'<span class="text-slate-500">$1</span>'),n=n.replace(a,'<span class="text-amber-400">$0</span>'),n=n.replace(o,'<span class="text-teal-400 font-bold">$1</span>')}return`<pre class="bg-slate-950 p-4 rounded-lg overflow-x-auto border border-slate-800/80 my-4 text-xs font-mono"><code class="language-${t}">${n}</code></pre>`};dt.link=(s,e,t)=>Hr(s,e,t).replace("<a ",'<a target="_blank" rel="noopener noreferrer" class="text-teal-400 hover:underline" ');dt.heading=(s,e)=>{const t=s.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");return`<h${e} id="${t}">${s}</h${e}>`};dt.table=(s,e)=>`<div class="overflow-x-auto my-4 max-w-full"><table class="w-full">${s}${e}</table></div>`;ne.setOptions({renderer:dt,gfm:!0,breaks:!0});function Oo(){try{return parseInt(localStorage.getItem("secops-sanitize-count")||"0",10)}catch{return 0}}function No(){try{const s=Oo();localStorage.setItem("secops-sanitize-count",(s+1).toString())}catch{}}function kt(s){No();const e=ne.parse(s);Mt.addHook("uponSanitizeElement",n=>{if(n instanceof Element){const o=n.tagName.toLowerCase();if(o==="video"||o==="audio"||o==="iframe"||o==="source"||o==="img"){const a=n.getAttribute("src");if(a){const r=a.trim().toLowerCase();r.startsWith("data:")||r.startsWith("blob:")||r.startsWith("attachment:")||r.startsWith("/")||r.startsWith("./")||r.startsWith("../")||(n.setAttribute("src","#"),console.warn("SECURITY BLOCK: Prevented connection to remote source URL:",a))}o==="iframe"&&n.setAttribute("sandbox","allow-scripts")}}});const t=Mt.sanitize(e,{ALLOWED_TAGS:["h1","h2","h3","h4","h5","h6","p","br","hr","a","span","ul","ol","li","strong","em","code","pre","blockquote","table","thead","tbody","tr","th","td","div","img","input","video","audio","iframe","source"],ALLOWED_ATTR:["href","target","rel","class","id","align","src","alt","type","checked","disabled","controls","sandbox","width","height"]});return Mt.removeHook("uponSanitizeElement"),t}function on(s){return s.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F\u200B-\u200D\uFEFF\u202A-\u202E]/g,"")}function $(s){return s.replace(/[&<>"']/g,e=>{switch(e){case"&":return"&amp;";case"<":return"&lt;";case">":return"&gt;";case'"':return"&quot;";case"'":return"&#039;";default:return e}})}function Fr(s){if(No(),typeof s!="object"||s===null)throw new Error("Invalid backup structure: Root must be an object.");const{slug:e,title:t,content:n,updatedAt:o,tags:a}=s;if(typeof e!="string"||!/^[a-z0-9-_]+$/.test(e))throw new Error("Invalid slug format: Slugs must contain only lowercase alphanumeric characters, hyphens, and underscores.");const r=on(e);if(typeof t!="string"||t.trim().length===0||t.length>100)throw new Error("Invalid title format: Must be a non-empty string under 100 characters.");const i=on(t);if(typeof n!="string"||n.length>5e4)throw new Error("Invalid content format: Must be a string under 50,000 characters.");if(typeof o!="number"||isNaN(o))throw new Error("Invalid updated timestamp format.");if(!Array.isArray(a))throw new Error("Tags must be an array of strings.");const l=a.map(d=>{if(typeof d!="string")throw new Error("Tags must be strings.");return on(Mt.sanitize(d)).slice(0,30)});return{slug:r,title:Mt.sanitize(i),content:n,updatedAt:o,tags:l,isSystem:!!s.isSystem}}async function Le(s){const e=new TextEncoder,t=e.encode("secops-intel-salt-2026"),n=await window.crypto.subtle.importKey("raw",e.encode(s),{name:"PBKDF2"},!1,["deriveKey"]);return window.crypto.subtle.deriveKey({name:"PBKDF2",salt:t,iterations:1e5,hash:"SHA-256"},n,{name:"AES-GCM",length:256},!1,["encrypt","decrypt"])}async function st(s,e){const t=new TextEncoder,n=window.crypto.getRandomValues(new Uint8Array(12)),o=await window.crypto.subtle.encrypt({name:"AES-GCM",iv:n},e,t.encode(s)),a=Array.from(n).map(d=>d.toString(16).padStart(2,"0")).join(""),r=new Uint8Array(o);let i="";for(let d=0;d<r.byteLength;d++)i+=String.fromCharCode(r[d]);const l=btoa(i);return`${a}:${l}`}async function me(s,e){const t=s.split(":");if(t.length!==2)throw new Error("Invalid cipher format");const[n,o]=t,a=new Uint8Array(n.match(/.{1,2}/g).map(d=>parseInt(d,16))),r=atob(o),i=new Uint8Array(r.length);for(let d=0;d<r.length;d++)i[d]=r.charCodeAt(d);const l=await window.crypto.subtle.decrypt({name:"AES-GCM",iv:a},e,i);return new TextDecoder().decode(l)}async function Ze(s){const e=`${s.slug}|${s.title}|${s.content}|${s.updatedAt}|${s.tags.join(",")}|secops-integrity-salt-2026`,t=new TextEncoder().encode(e),n=await crypto.subtle.digest("SHA-256",t);return Array.from(new Uint8Array(n)).map(a=>a.toString(16).padStart(2,"0")).join("")}let Q="home",Xe=!1,Ne=!1,je="",Ot="",ce=[],Pt=null,Po=navigator.onLine?"SECURE_LINK":"OFFLINE_CACHE",lt=localStorage.getItem("secops-wiki-theme")||(window.matchMedia&&window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark");window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",s=>{localStorage.getItem("secops-wiki-theme")||(lt=s.matches?"dark":"light",gs())});let nt=localStorage.getItem("secops-wiki-mask-encrypted")==="true",nn=localStorage.getItem("secops-wiki-split-screen")!=="false",an={},de=null;async function le(s,e){const t={id:`${Date.now()}-${Math.random().toString(36).substring(2,11)}`,timestamp:Date.now(),event:s,details:e};await Ia(t)}async function He(s){const e=await ya(s);if(!e)return null;if(e.isEncryptedAtRest&&e.encryptedData){if(!de)return{slug:e.slug,title:"[DATABASE LOCKED]",content:"Master passphrase required to unlock this database record.",tags:[],isSystem:e.isSystem,isEncrypted:!1,updatedAt:e.updatedAt};try{const t=await me(e.encryptedData,de),n=JSON.parse(t);return{slug:e.slug,title:n.title,content:n.content,tags:n.tags,isSystem:e.isSystem,isEncrypted:n.isEncrypted,signature:n.signature,updatedAt:n.updatedAt}}catch(t){return console.error("Failed to decrypt page at rest:",t),null}}return e}async function Me(s){if(localStorage.getItem("secops-wiki-db-encrypted")==="true"&&de){const t={title:s.title,content:s.content,tags:s.tags,isEncrypted:s.isEncrypted,signature:s.signature,updatedAt:s.updatedAt},n=await st(JSON.stringify(t),de),o={slug:s.slug,title:"[REDACTED AT REST]",content:"[REDACTED AT REST]",tags:[],isSystem:s.isSystem,isEncryptedAtRest:!0,encryptedData:n,updatedAt:s.updatedAt};await dn(o)}else await dn(s);localStorage.setItem("secops-wiki-last-update",Date.now().toString())}async function us(){const s=await Ht(),e=[];for(const t of s){const n=await He(t.slug);n&&e.push(n)}return e}async function fs(){try{const s=await ho();an={},s.forEach(e=>{an[e.tag]=e.color})}catch{an={}}}function Wr(s){const e=an[s]||"slate";let t="bg-slate-950/20 text-slate-400 border-slate-900/30";return e==="emerald"?t="bg-emerald-950/20 text-emerald-400 border-emerald-900/30":e==="blue"?t="bg-blue-950/20 text-blue-400 border-blue-900/30":e==="red"?t="bg-red-950/20 text-red-400 border-red-900/30":e==="amber"&&(t="bg-amber-950/20 text-amber-400 border-amber-900/30"),`
    <span class="text-[10px] font-mono px-2 py-0.5 rounded border ${t}">#${$(s)}</span>
  `}function qr(s){const e=ce.filter(r=>r.slug!==Q);if(e.length===0)return;e.sort((r,i)=>i.title.length-r.title.length);const t=r=>r.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"),n=[],o=document.createTreeWalker(s,NodeFilter.SHOW_TEXT,{acceptNode:r=>{let i=r.parentElement;for(;i&&i!==s;){const l=i.tagName.toLowerCase();if(l==="a"||l==="code"||l==="pre")return NodeFilter.FILTER_REJECT;i=i.parentElement}return NodeFilter.FILTER_ACCEPT}});let a=o.nextNode();for(;a;)n.push(a),a=o.nextNode();for(const r of n){const i=r.parentNode;if(!i)continue;let l=r.nodeValue||"";for(const d of e){if(d.isEncrypted&&!G&&nt)continue;const m=t(d.title),g=t(d.slug),O=new RegExp(`\\b(${m}|${g})\\b`,"i").exec(l);if(O){const U=O[0],I=O.index,P=l.substring(0,I),Z=l.substring(I+U.length),T=document.createTextNode(P),v=document.createElement("a");v.href=`#/page/${d.slug}`,v.className="autolink text-teal-400 hover:text-teal-350 underline decoration-dotted transition",v.textContent=U;const y=document.createTextNode(Z);i.insertBefore(T,r),i.insertBefore(v,r),i.insertBefore(y,r),i.removeChild(r);break}}}}function Gr(s){if(!s||s==="system"||s==="graph")return;let e=[];try{e=JSON.parse(sessionStorage.getItem("secops-wiki-breadcrumbs")||"[]")}catch{}Array.isArray(e)||(e=[]),e=e.filter(t=>t!==s),e.unshift(s),e.length>5&&(e=e.slice(0,5)),sessionStorage.setItem("secops-wiki-breadcrumbs",JSON.stringify(e))}function Vr(s){const e=ce.find(n=>n.slug===s);return e?e.isEncrypted&&!G&&nt?"[REDACTED CORE]":e.title:s}let G=null,zn=!1,Pe=0,rn=!1,ln=-1,Qn="";function Kr(){return parseInt(localStorage.getItem("secops-decrypt-failed-attempts")||"0",10)}function Mo(s){localStorage.setItem("secops-decrypt-failed-attempts",s.toString())}function es(){return parseInt(localStorage.getItem("secops-decrypt-lockout-until")||"0",10)}function Bo(s){localStorage.setItem("secops-decrypt-lockout-until",s.toString())}function ro(){return Date.now()<es()}function Yr(){const s=Kr()+1;if(Mo(s),s>=3){const e=3e5*Math.pow(2,s-3);Bo(Date.now()+e)}}function Zr(){Mo(0),Bo(0)}let jn=null;function ms(){jn&&clearTimeout(jn);const s=parseInt(localStorage.getItem("secops-wiki-session-timeout")||"15",10);s!==0&&(jn=setTimeout(()=>{G&&(G=null,alert(`SECURITY TIMEOUT: Session idle for ${s} minutes. Passphrase keys wiped from memory.`),window.location.hash.startsWith("#/page/")?window.location.hash="#/page/home":he())},s*60*1e3))}["mousedown","mousemove","keydown","scroll","touchstart"].forEach(s=>{window.addEventListener(s,ms,{passive:!0})});ms();let it=null;document.addEventListener("copy",()=>{var e;document.body.classList.contains("encrypted-page-active")?(e=window.getSelection())!=null&&e.toString()&&Uo():it&&(clearTimeout(it),it=null)});function Uo(){it&&clearTimeout(it),it=setTimeout(async()=>{try{await navigator.clipboard.writeText("[SECURE WIPE: Decrypted secret cleared from clipboard]"),Xr(),await le("CLIPBOARD_WIPE","Automatically cleared decrypted secret from clipboard.")}catch(s){console.warn("Clipboard wipe failed:",s)}it=null},3e4)}function Xr(){const s=document.getElementById("clipboard-wipe-toast");s&&s.remove();const e=document.createElement("div");e.id="clipboard-wipe-toast",e.className="fixed bottom-4 left-4 z-50 glass-panel border border-red-500/30 p-3 rounded-xl shadow-xl font-mono text-[10px] text-red-400 select-none animate-fade-in",e.innerHTML="⚠️ SECURITY WIPE: Decrypted secret cleared from clipboard.",document.body.appendChild(e),setTimeout(()=>{e.classList.add("opacity-0","transition-opacity","duration-500"),setTimeout(()=>e.remove(),500)},3e3)}function zo(s){if(s.length<8)return{valid:!1,message:"Password must be at least 8 characters long."};let e=!1,t=!1,n=!1,o=!1;const a=/[!@#$%^&*(),.?":{}|<>_+\\-]/;for(const r of s)r>="A"&&r<="Z"?e=!0:r>="a"&&r<="z"?t=!0:r>="0"&&r<="9"?n=!0:a.test(r)&&(o=!0);return!e||!t||!n||!o?{valid:!1,message:"Password must include uppercase, lowercase, numbers, and special symbols (!@#$%^&*, etc.)."}:{valid:!0,message:""}}function io(){G&&(G=null,alert("QUICK LOCK: In-memory session keys cleared. Documents locked."),window.location.hash="#/page/home",he())}let sn=0,Hn=null;window.addEventListener("keydown",s=>{s.key==="Escape"&&(sn++,Hn&&clearTimeout(Hn),sn>=3?(sn=0,io()):Hn=setTimeout(()=>{sn=0},1e3)),s.ctrlKey&&s.shiftKey&&s.key.toLowerCase()==="l"&&(s.preventDefault(),io())});function gs(){const s=document.documentElement,e=document.getElementById("theme-icon-path");lt==="light"?(s.classList.add("light-theme"),e&&e.setAttribute("d","M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z")):(s.classList.remove("light-theme"),e&&e.setAttribute("d","M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z"))}function jo(){lt=lt==="dark"?"light":"dark",localStorage.setItem("secops-wiki-theme",lt),gs()}function Jr(s,e){if(!e||e.trim().length===0)return s;const t=e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"),n=new RegExp(`(?![^<>]*>)(${t})`,"gi");return s.replace(n,'<mark class="bg-teal-500/30 text-teal-300 px-0.5 rounded font-medium">$1</mark>')}function Qr(s){const e=s.toLowerCase().trim();return/(sec|security|critical|panic|destruct|lock|key|auth)/.test(e)?{bg:"rgba(239, 68, 68, 0.15)",text:"#f87171",border:"rgba(239, 68, 68, 0.3)",className:"tag-color-red"}:/(doc|manual|wiki|guide|system|dashboard|home)/.test(e)?{bg:"rgba(20, 184, 166, 0.15)",text:"#2dd4bf",border:"rgba(20, 184, 166, 0.3)",className:"tag-color-teal"}:/(config|settings|sys|admin|db|telemetry)/.test(e)?{bg:"rgba(59, 130, 246, 0.15)",text:"#60a5fa",border:"rgba(59, 130, 246, 0.3)",className:"tag-color-blue"}:/(warning|caution|issue|bug|fix)/.test(e)?{bg:"rgba(245, 158, 11, 0.15)",text:"#fbbf24",border:"rgba(245, 158, 11, 0.3)",className:"tag-color-amber"}:{bg:"rgba(148, 163, 184, 0.15)",text:"#cbd5e1",border:"rgba(148, 163, 184, 0.3)",className:"tag-color-slate"}}function Ho(s,e){const t=e.toLowerCase().trim();if(!t)return 0;let n=0;const o=s.title.toLowerCase(),a=s.content.toLowerCase(),r=s.tags.map(i=>i.toLowerCase());if(o===t?n+=100:o.startsWith(t)?n+=80:o.includes(t)&&(n+=50),r.forEach(i=>{i===t?n+=30:i.includes(t)&&(n+=15)}),a.includes(t)){n+=10;const i=a.split(t).length-1;n+=Math.min(10,i)}return n}function lo(s){const e=new Uint32Array(256);for(let n=0;n<256;n++){let o=n;for(let a=0;a<8;a++)o=o&1?3988292384^o>>>1:o>>>1;e[n]=o}let t=4294967295;for(let n=0;n<s.length;n++)t=e[(t^s[n])&255]^t>>>8;return(t^4294967295)>>>0}function Fo(s){const e=new TextEncoder,t=[],n=[];let o=0;s.forEach(d=>{n.push(o);const p=e.encode(d.name),m=e.encode(d.content),g=lo(m),f=new ArrayBuffer(30),O=new DataView(f);O.setUint32(0,67324752,!0),O.setUint16(4,10,!0),O.setUint16(6,0,!0),O.setUint16(8,0,!0),O.setUint16(10,0,!0),O.setUint16(12,0,!0),O.setUint32(14,g,!0),O.setUint32(18,m.length,!0),O.setUint32(22,m.length,!0),O.setUint16(26,p.length,!0),O.setUint16(28,0,!0);const U=new Uint8Array(f);t.push(U),t.push(p),t.push(m),o+=U.length+p.length+m.length});const a=o;let r=0;s.forEach((d,p)=>{const m=e.encode(d.name),g=e.encode(d.content),f=lo(g),O=n[p],U=new ArrayBuffer(46),I=new DataView(U);I.setUint32(0,33639248,!0),I.setUint16(4,20,!0),I.setUint16(6,10,!0),I.setUint16(8,0,!0),I.setUint16(10,0,!0),I.setUint16(12,0,!0),I.setUint16(14,0,!0),I.setUint32(16,f,!0),I.setUint32(20,g.length,!0),I.setUint32(24,g.length,!0),I.setUint16(28,m.length,!0),I.setUint16(30,0,!0),I.setUint16(32,0,!0),I.setUint16(34,0,!0),I.setUint16(36,0,!0),I.setUint32(38,32,!0),I.setUint32(42,O,!0);const P=new Uint8Array(U);t.push(P),t.push(m),r+=P.length+m.length,o+=P.length+m.length});const i=new ArrayBuffer(22),l=new DataView(i);return l.setUint32(0,101010256,!0),l.setUint16(4,0,!0),l.setUint16(6,0,!0),l.setUint16(8,s.length,!0),l.setUint16(10,s.length,!0),l.setUint32(12,r,!0),l.setUint32(16,a,!0),l.setUint16(20,0,!0),t.push(new Uint8Array(i)),new Blob(t,{type:"application/zip"})}const ft=new BroadcastChannel("wiki-db-sync");ft.onmessage=async s=>{s.data==="refresh"&&(await Ae(),await he())};let ts=localStorage.getItem("secops-wiki-last-update")||"0";window.addEventListener("focus",async()=>{const s=localStorage.getItem("secops-wiki-last-update")||"0";s!==ts&&(ts=s,await Ae(),await he())});let Fn=null;const ei=15*60*1e3;let Wo;async function ti(){gs(),Wo=document.getElementById("app"),await os(),await fs();try{await ns()}catch(e){console.warn("Failed to purge expired pages on init:",e)}try{await yo(30)}catch(e){console.warn("Failed to auto-prune audit logs on init:",e)}si(),localStorage.getItem("secops-wiki-db-encrypted")==="true"&&!de?Ti():(await Ae(),qo(),Vo(),window.addEventListener("hashchange",gn),window.addEventListener("online",mn),window.addEventListener("offline",mn),window.addEventListener("beforeinstallprompt",e=>{e.preventDefault(),Pt=e;const t=document.getElementById("pwa-install-btn");t&&t.classList.remove("hidden")}),window.addEventListener("keydown",e=>{var t,n;if(e.ctrlKey&&(e.key==="k"||e.key==="K"||e.key==="p"||e.key==="P")&&(e.preventDefault(),jt()),e.ctrlKey&&(e.key==="n"||e.key==="N")&&!e.shiftKey&&(e.preventDefault(),window.location.hash="#/new"),e.key==="/"&&((t=document.activeElement)==null?void 0:t.tagName)!=="INPUT"&&((n=document.activeElement)==null?void 0:n.tagName)!=="TEXTAREA"&&(e.preventDefault(),jt()),e.ctrlKey&&e.altKey&&(e.key==="e"||e.key==="E"))if(e.preventDefault(),Xe){const o=document.getElementById("edit-page-form");o&&o.requestSubmit()}else Q&&Q!=="home"&&Q!=="system"&&(window.location.hash=`#/edit/${Q}`)}),gn(),setInterval(async()=>{try{await ns()}catch(e){console.warn("Failed periodic expired page purge:",e)}},3e4))}function vt(){Fn&&clearTimeout(Fn),Fn=setTimeout(ni,ei),window.lastHeartbeat||(window.lastHeartbeat=Date.now()),Date.now()-window.lastHeartbeat>5*60*1e3&&(le("SESSION_HEARTBEAT","User activity heartbeat"),window.lastHeartbeat=Date.now())}function ni(){const s=document.getElementById("idle-lock-screen");if(!s)return;const e=localStorage.getItem("secops-wiki-db-encrypted")==="true";e&&(de=null,G=null,he().catch(()=>{}));const t=localStorage.getItem("secops-wiki-webauthn-gate")==="true";if(e){s.innerHTML=`
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
    `;const n=s.querySelector("#idle-unlock-form"),o=s.querySelector("#idle-unlock-password-input"),a=s.querySelector("#idle-lock-error"),r=s.querySelector("#idle-unlock-biometric-btn");setTimeout(()=>o==null?void 0:o.focus(),50),n.addEventListener("submit",async i=>{i.preventDefault(),a.classList.add("hidden");const l=o.value;try{const d=await Le(l);await St(d)?(de=d,await Ae(),Wn(),await he(),await le("SESSION_RESTORE","Restored session via master passphrase.")):a.classList.remove("hidden")}catch{a.classList.remove("hidden")}}),r&&r.addEventListener("click",async()=>{a.classList.add("hidden");try{const i=localStorage.getItem("secops-wiki-webauthn-payload")||"",l=crypto.getRandomValues(new Uint8Array(32)),d=await navigator.credentials.get({publicKey:{challenge:l,rpId:window.location.hostname||"localhost",userVerification:"required",timeout:6e4}});if(d){const p=new Uint8Array(d.rawId),m=Array.from(p).map(Z=>Z.toString(16).padStart(2,"0")).join(""),g=localStorage.getItem("secops-wiki-webauthn-salt")||"";if(!g)throw new Error("Biometric salt missing.");const f=`${m}:${g}`,O=await Le(f),U=await me(i,O),I=await Le(U);await St(I)?(de=I,await Ae(),Wn(),await he(),await le("SESSION_RESTORE_BIOMETRIC","Restored session via biometric WebAuthn verification.")):a.classList.remove("hidden")}}catch(i){alert(`Biometric verification failed: ${i.message}`),await le("WEBAUTHN_FAIL",`Idle lock biometric unlock failed: ${i.message}`)}})}else s.innerHTML=`
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
    `,s.querySelector("#idle-unlock-btn").addEventListener("click",()=>{Wn()});s.classList.remove("hidden")}function Wn(){const s=document.getElementById("idle-lock-screen");s&&s.classList.add("hidden"),vt()}function qo(){let s=document.getElementById("idle-lock-screen");s||(s=document.createElement("div"),s.id="idle-lock-screen",s.className="fixed inset-0 bg-[#090d16]/95 backdrop-blur-md z-50 flex flex-col items-center justify-center hidden",document.body.appendChild(s)),vt(),window.addEventListener("mousemove",vt,{passive:!0}),window.addEventListener("keydown",vt,{passive:!0}),window.addEventListener("click",vt,{passive:!0}),window.addEventListener("scroll",vt,{passive:!0})}function co(){if(document.getElementById("pwa-update-toast"))return;const s=document.createElement("div");s.id="pwa-update-toast",s.className="fixed bottom-4 right-4 z-50 max-w-sm glass-panel border border-teal-500/30 p-4 rounded-xl shadow-2xl glow-border flex items-center justify-between gap-4 font-mono text-xs select-none",s.innerHTML=`
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
  `,document.body.appendChild(s);const e=document.getElementById("pwa-update-reload-btn");e&&e.addEventListener("click",()=>{window.location.reload()})}function si(){"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/wiki/sw.js").then(s=>{console.log("ServiceWorker registered successfully with scope: ",s.scope),s.waiting&&co(),s.addEventListener("updatefound",()=>{const e=s.installing;e&&e.addEventListener("statechange",()=>{e.state==="installed"&&navigator.serviceWorker.controller&&co()})})}).catch(s=>{console.error("ServiceWorker registration failed: ",s)})})}function mn(){Po=navigator.onLine?"SECURE_LINK":"OFFLINE_CACHE";const s=document.getElementById("system-status-indicator"),e=document.getElementById("system-status-label");s&&e&&(navigator.onLine?(s.className="w-2 h-2 rounded-full bg-emerald-400 glow-text-emerald pulse-indicator",e.innerText="SECURE_LINK",e.className="text-xs text-emerald-400 font-mono tracking-wider"):(s.className="w-2 h-2 rounded-full bg-amber-500 pulse-indicator",e.innerText="OFFLINE_CACHE",e.className="text-xs text-amber-500 font-mono tracking-wider"))}async function Ae(){ce=await us(),await Ei(),ts=localStorage.getItem("secops-wiki-last-update")||"0"}async function ns(){const s=await Ht(),e=Date.now();let t=!1;for(const n of s)n.expiresAt&&e>n.expiresAt&&(await fo(n.slug),await le("SELF_DESTRUCT_EXPIRY",`Intel Entry "${n.title}" (slug: ${n.slug}) has self-destructed due to lease expiration.`),t=!0,Q===n.slug&&(Q="home",window.location.hash="#/page/home"));t&&(await Ae(),await he(),ft.postMessage("refresh"))}async function gn(){await ns();const s=window.location.hash||"#/page/home";Xe=!1,Ne=!1;let e="";if(s.startsWith("#/page/")){const n=s.replace("#/page/","").split("#");Q=n[0],n.length>1&&(e=n[1])}else s.startsWith("#/edit/")?(Q=s.replace("#/edit/",""),Xe=!0):s==="#/new"?(Xe=!0,Ne=!0,Q=""):s==="#/system"?Q="system":s==="#/graph"?Q="graph":s.startsWith("#/import-p2p")?Q="import-p2p":s==="#/audit-logs"?Q="audit-logs":Q="home";!Xe&&Q&&Q!=="system"&&Q!=="graph"&&Q!=="import-p2p"&&Q!=="audit-logs"&&(Gr(Q),Ni(Q)),await he(),e&&setTimeout(()=>{const t=document.getElementById(e);t&&t.scrollIntoView({behavior:"smooth"})},50)}function qn(s){const e=s.filter(a=>a.isSystem),t=s.filter(a=>!a.isSystem&&a.isEncrypted),n=s.filter(a=>!a.isSystem&&!a.isEncrypted);let o="";return e.length>0&&(o+=`
      <div class="mb-4">
        <div class="px-3 mb-1.5 text-[9px] font-bold text-slate-500 uppercase tracking-widest font-mono flex items-center gap-1 select-none">
          ⚙️ SYSTEM PROCEDURES
        </div>
        <div class="space-y-0.5">
          ${e.map(a=>Gn(a)).join("")}
        </div>
      </div>
    `),t.length>0&&(o+=`
      <div class="mb-4">
        <div class="px-3 mb-1.5 text-[9px] font-bold text-red-400/80 uppercase tracking-widest font-mono flex items-center gap-1 select-none">
          🔒 SECURE CORES
        </div>
        <div class="space-y-0.5">
          ${t.map(a=>Gn(a)).join("")}
        </div>
      </div>
    `),n.length>0&&(o+=`
      <div class="mb-4">
        <div class="px-3 mb-1.5 text-[9px] font-bold text-teal-400/80 uppercase tracking-widest font-mono flex items-center gap-1 select-none">
          📄 OPERATIONAL INTEL
        </div>
        <div class="space-y-0.5">
          ${n.map(a=>Gn(a)).join("")}
        </div>
      </div>
    `),o}function Gn(s){const e=Q===s.slug&&!Xe,t=s.isEncrypted&&!G&&nt,n=t?"[REDACTED CORE]":s.title,o=t?"javascript:void(0)":`#/page/${s.slug}`,a=t?`onclick="alert('SECURITY WARNING: Document is locked. Enter passphrase to decrypt cores first.');"`:"";let r="";if(je.trim().length>0){const i=s.isEncrypted&&!G,l=Et.find(d=>d.slug===s.slug)||s;if(!i&&l.content){const d=l.content.toLowerCase().indexOf(je.toLowerCase());if(d!==-1){const p=Math.max(0,d-20),m=Math.min(l.content.length,d+je.length+30);let g=l.content.substring(p,m);p>0&&(g="..."+g),m<l.content.length&&(g=g+"...");const f=$(g),O=new RegExp(`(${je.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")})`,"gi");r=`<div class="text-[10px] text-slate-500 font-mono mt-1 pl-4 break-all whitespace-normal leading-normal">${f.replace(O,'<span class="bg-teal-950 text-teal-350 px-0.5 rounded font-bold">$1</span>')}</div>`}}}return`
    <a href="${o}" ${a} class="block px-3 py-2 rounded-lg text-xs font-mono transition group ${e?"bg-teal-950/30 text-teal-400 font-bold border-l-2 border-teal-500":"text-slate-450 hover:bg-slate-900/40 hover:text-slate-200"}">
      <div class="flex items-center justify-between">
        <span class="truncate flex items-center gap-1.5">
          ${s.isEncrypted?'<span class="text-red-450 text-[9px]">🔒</span>':'<span class="text-slate-650 group-hover:text-slate-500 text-[9px]">⊙</span>'}
          ${$(n)}
        </span>
      </div>
      ${r}
    </a>
  `}async function he(){var I,P,Z;await Ae();let s=ce;je.trim().length>0&&(s=s.map(T=>({page:T,score:Ho(Et.find(v=>v.slug===T.slug)||T,je)})).filter(T=>T.score>0).sort((T,v)=>v.score-T.score).map(T=>T.page)),Ot&&(s=s.filter(T=>T.tags.includes(Ot)));const e=Array.from(new Set(ce.flatMap(T=>T.tags)));Wo.innerHTML=`
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
            <span id="system-status-label" class="text-xs ${navigator.onLine?"text-emerald-400":"text-amber-500"} font-mono tracking-wider">${Po}</span>
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
        ${(()=>{const T=JSON.parse(localStorage.getItem("pinned_docs")||"[]"),v=ce.filter(y=>T.includes(y.slug));return v.length>0?`
            <div class="px-2 py-4 border-b border-slate-800/80 shrink-0">
              <div class="px-3 mb-2 flex items-center justify-between">
                <span class="text-xs font-semibold text-amber-500 uppercase tracking-widest font-mono flex items-center gap-1">? Pinned Docs</span>
              </div>
              <div class="space-y-1">
                ${qn(v)}
              </div>
            </div>`:""})()}
        
        <!-- Tag Filter Cloud -->
        ${e.length>0?`
          <div class="px-4 py-2 border-b border-slate-800/80 flex flex-wrap gap-1 max-h-24 overflow-y-auto shrink-0 select-none">
            <button class="tag-badge px-1.5 py-0.5 text-[9px] rounded-full font-mono transition ${Ot?"bg-slate-900 text-slate-400 hover:bg-slate-850":"bg-teal-500 text-slate-950 font-bold shadow-[0_0_8px_rgba(20,184,166,0.3)]"}" data-tag="">#ALL</button>
            ${e.map(T=>{const v=Qr(T);return`
                <button class="tag-badge px-1.5 py-0.5 text-[9px] rounded-full font-mono transition ${Ot===T?"bg-teal-500 text-slate-950 font-bold shadow-[0_0_8px_rgba(20,184,166,0.3)]":`${v.className} hover:opacity-85`}" data-tag="${$(T)}">#${$(T.toUpperCase())}</button>
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
            ${qn(s)}
            ${s.length===0?`
              <div class="text-center py-6 text-xs text-slate-650 font-mono">No entries found</div>
            `:""}
          </div>

          <div class="px-3 mb-2 mt-6 flex items-center justify-between border-t border-slate-900/60 pt-4 select-none shrink-0">
            <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">🏷️ Tag Explorer</span>
          </div>
          <div id="tag-tree-container" class="space-y-1 px-1 max-h-48 overflow-y-auto pr-1">
            ${Xo(Di(s))}
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
  `;const t=document.getElementById("wiki-search-input");t&&t.addEventListener("input",T=>{je=T.target.value;const v=Et.filter(k=>k.title.toLowerCase().includes(je.toLowerCase())||k.content.toLowerCase().includes(je.toLowerCase())||k.tags.some(C=>C.toLowerCase().includes(je.toLowerCase()))),y=document.getElementById("pages-list");y.innerHTML=qn(v),v.length===0&&(y.innerHTML='<div class="text-center py-6 text-xs text-slate-650 font-mono">No entries found</div>')});const n=document.getElementById("pwa-install-btn");n&&n.addEventListener("click",async()=>{if(Pt){Pt.prompt();const{outcome:T}=await Pt.userChoice;T==="accepted"&&console.log("User accepted the PWA install prompt"),Pt=null,n.classList.add("hidden")}});const o=document.getElementById("system-panic-btn");o&&o.addEventListener("click",async()=>{if(confirm("CRITICAL SYSTEM COMPROMISE PROTOCOL: Purge entire local database, clear all service worker caches, unregister service workers, and force self-destruct reload immediately?")){if(indexedDB.deleteDatabase("secops-wiki-db"),"caches"in window){const T=await caches.keys();await Promise.all(T.map(v=>caches.delete(v)))}if("serviceWorker"in navigator){const T=await navigator.serviceWorker.getRegistrations();await Promise.all(T.map(v=>v.unregister()))}localStorage.clear(),sessionStorage.clear(),G=null,window.history.replaceState(null,"","about:blank"),window.location.replace("about:blank")}});const a=document.getElementById("sidebar-toggle-btn"),r=document.getElementById("sidebar-close-btn"),i=document.getElementById("sidebar-backdrop"),l=()=>{const T=document.getElementById("sidebar"),v=document.getElementById("sidebar-backdrop");T&&v&&(T.classList.add("-translate-x-full"),v.classList.add("hidden"))},d=()=>{const T=document.getElementById("sidebar"),v=document.getElementById("sidebar-backdrop");T&&v&&(T.classList.remove("-translate-x-full"),v.classList.remove("hidden"))};a&&a.addEventListener("click",d),r&&r.addEventListener("click",l),i&&i.addEventListener("click",l),document.querySelectorAll("#sidebar a").forEach(T=>{T.addEventListener("click",()=>{window.innerWidth<768&&l()})});const m=document.getElementById("theme-toggle-btn");m&&m.addEventListener("click",jo);const g=[12,13,14,15,16,18,20];let f=parseInt(localStorage.getItem("secops-wiki-font-size-idx")||"2",10);const O=()=>{document.documentElement.style.setProperty("--wiki-font-size",g[f]+"px"),localStorage.setItem("secops-wiki-font-size-idx",f.toString())};O(),(I=document.getElementById("font-size-increase-btn"))==null||I.addEventListener("click",()=>{f<g.length-1&&(f++,O())}),(P=document.getElementById("font-size-decrease-btn"))==null||P.addEventListener("click",()=>{f>0&&(f--,O())}),(Z=document.getElementById("font-size-reset-btn"))==null||Z.addEventListener("click",()=>{f=2,O()}),document.querySelectorAll(".tag-badge").forEach(T=>{T.addEventListener("click",async v=>{Ot=v.currentTarget.getAttribute("data-tag")||"",await he()})});const U=document.getElementById("tag-tree-container");U&&(U.addEventListener("click",T=>{const v=T.target.closest(".tree-folder-header");if(v){const y=v.nextElementSibling,k=v.querySelector(".tree-folder-icon");if(y){const C=y.classList.toggle("hidden");k&&(k.style.transform=C?"rotate(0deg)":"rotate(90deg)")}}}),U.addEventListener("keydown",T=>{var V,B;const v=document.activeElement;if(!v||!U.contains(v))return;const k=Array.from(U.querySelectorAll(".tree-folder-header, .tree-folder-children a")).filter(_=>{let W=_.parentElement;for(;W&&W!==U;){if(W.classList.contains("tree-folder-children")&&W.classList.contains("hidden"))return!1;W=W.parentElement}return!0}),C=k.indexOf(v);if(C!==-1){if(T.key==="ArrowDown"){T.preventDefault();const _=(C+1)%k.length;(V=k[_])==null||V.focus()}else if(T.key==="ArrowUp"){T.preventDefault();const _=(C-1+k.length)%k.length;(B=k[_])==null||B.focus()}else if(T.key==="Enter")T.preventDefault(),v.click();else if(T.key==="ArrowRight"){if(T.preventDefault(),v.classList.contains("tree-folder-header")){const _=v.nextElementSibling,W=v.querySelector(".tree-folder-icon");_&&_.classList.contains("hidden")&&(_.classList.remove("hidden"),W&&(W.style.transform="rotate(90deg)"))}}else if(T.key==="ArrowLeft"&&(T.preventDefault(),v.classList.contains("tree-folder-header"))){const _=v.nextElementSibling,W=v.querySelector(".tree-folder-icon");_&&!_.classList.contains("hidden")&&(_.classList.add("hidden"),W&&(W.style.transform="rotate(0deg)"))}}})),await oi()}async function oi(){const s=document.getElementById("main-content");if(Q==="graph"){await vi(s);return}if(Q==="system"){zt(s);return}if(Q==="import-p2p"){await _i(s);return}if(Q==="audit-logs"){await Mi(s);return}if(Xe){await Go(s);return}await hn(s)}async function hn(s){const e=await He(Q);if(!e){s.innerHTML=`
      <div class="text-center py-20 bg-slate-950/40 border border-red-950/20 rounded-xl px-6 glow-border">
        <svg class="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
        </svg>
        <h2 class="text-2xl font-bold font-mono text-white mb-2 uppercase">DATA_MISSING</h2>
        <p class="text-slate-400 text-sm max-w-md mx-auto mb-6">Requested intel document slug "${$(Q)}" is not registered in index database.</p>
        <a href="#/new" class="px-4 py-2 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 font-mono text-xs uppercase rounded transition hover:text-white">
          Create New Document
        </a>
      </div>
    `;return}const t=await Si(e.slug);let n=e.content,o=!1;if(e.isEncrypted)if(G)try{n=await me(e.content,G)}catch{o=!0}else o=!0;if(o){const x=ro();let E="";if(x&&(E=`<p class="text-red-500 text-xs font-mono font-bold mt-2 animate-pulse uppercase">SECURITY LOCKOUT: Too many failures. Locked out for ${Math.ceil((es()-Date.now())/1e3)}s.</p>`),s.innerHTML=`
      <div class="max-w-md mx-auto my-20 p-6 glass-panel border border-teal-900/30 rounded-xl text-center glow-border select-none">
        <svg class="w-16 h-16 text-teal-500 mx-auto mb-4 animate-pulse" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        <h2 class="text-xl font-bold font-mono text-white mb-2 uppercase">DECRYPT_REQUIRED</h2>
        <p class="text-slate-400 text-xs font-mono mb-6">This document payload is encrypted. Enter passphrase to decrypt.</p>
        <form id="decrypt-doc-form" class="space-y-4">
          <input type="password" id="decrypt-password-input" placeholder="Enter security passphrase..." ${x?"disabled":""} class="w-full bg-slate-950/80 border border-slate-800 focus:border-teal-500/50 rounded-lg p-2.5 text-base text-slate-200 focus:outline-none transition font-mono text-center disabled:opacity-40 disabled:cursor-not-allowed">
          <button type="submit" ${x?"disabled":""} class="w-full py-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-mono text-xs uppercase rounded font-bold transition shadow-[0_0_10px_rgba(20,184,166,0.2)] disabled:opacity-40 disabled:cursor-not-allowed">
            DECRYPT IN-MEMORY
          </button>
        </form>
        <div id="decrypt-lockout-timer">${E}</div>
      </div>
    `,x){const z=setInterval(async()=>{const b=Math.ceil((es()-Date.now())/1e3),R=document.getElementById("decrypt-lockout-timer");b<=0?(clearInterval(z),await hn(s)):R&&(R.innerHTML=`<p class="text-red-500 text-xs font-mono font-bold mt-2 animate-pulse uppercase">SECURITY LOCKOUT: Too many failures. Locked out for ${b}s.</p>`)},1e3)}setTimeout(()=>{const z=document.getElementById("decrypt-password-input");z==null||z.focus()},50),document.getElementById("decrypt-doc-form").addEventListener("submit",async z=>{if(z.preventDefault(),ro()){alert("Security Lockout active.");return}const b=document.getElementById("decrypt-password-input").value;try{const R=await Le(b);await me(e.content,R),Zr(),G=R,await he()}catch{Yr(),alert("Security Alert: Authentication failed. Invalid security passphrase."),await hn(s)}});return}const a=n.split(/\s+/).filter(x=>x.length>0).length,r=Math.max(1,Math.round(a/200)),i=kt(n),l=new Date(e.updatedAt).toLocaleString(),d=document.createElement("div");d.innerHTML=i,qr(d);const p=d.innerHTML,m=Jr(p,je),g=d.querySelectorAll("h1, h2, h3");let f="";g.length>0&&(f=`
      <div class="hidden lg:block w-60 shrink-0 self-start sticky top-8">
        <div class="glass-panel border border-slate-800/80 rounded-xl p-4">
          <h4 class="text-xs font-bold font-mono text-slate-400 uppercase tracking-widest border-b border-slate-800/60 pb-2 mb-3">Outline</h4>
          <nav class="space-y-2 text-xs font-mono max-h-[350px] overflow-y-auto pr-1">
            ${Array.from(g).map(x=>{const E=x.textContent||"",F=x.id||E.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,""),z=x.tagName.toLowerCase(),b=z==="h1"?"pl-0 font-semibold":z==="h2"?"pl-3 border-l border-slate-800":"pl-6 border-l border-slate-800";return`
                <a href="#/page/${e.slug}#${F}" class="block text-slate-500 hover:text-teal-400 transition truncate ${b}" title="${$(E)}">
                  ${$(E)}
                </a>
              `}).join("")}
          </nav>
        </div>
      </div>
    `);const O=n.match(/^(\s*[-*] )\[ \]/gm)||[],U=n.match(/^(\s*[-*] )\[[xX]\]/gm)||[],I=O.length+U.length;let P="";if(I>0){const x=U.length,E=Math.round(x/I*100),F=10,z=Math.round(x/I*F),b=F-z;P=`
      <div class="glass-panel border border-slate-800/80 p-3 rounded-lg flex items-center justify-between mb-6 text-[10px] sm:text-xs font-mono select-none">
        <div class="flex items-center gap-2 sm:gap-3">
          <span class="text-teal-400 font-bold">📋 TASK STATUS:</span>
          <span class="text-slate-400 font-bold">${"█".repeat(z)+"░".repeat(b)}</span>
          <span class="text-teal-400 font-bold">${E}%</span>
        </div>
        <div class="text-slate-500">
          ${x}/${I} COMPLETED
        </div>
      </div>
    `}let Z="";try{const x=JSON.parse(sessionStorage.getItem("secops-wiki-breadcrumbs")||"[]");x.length>1&&(Z=`
        <div class="flex items-center gap-1.5 text-[10px] font-mono text-slate-500 mb-3 select-none overflow-x-auto whitespace-nowrap pb-1">
          <span class="text-slate-600 uppercase">RECENT:</span>
          ${x.map((E,F)=>{const z=Vr(E),R=E===e.slug?"text-teal-400 font-bold":"text-slate-450 hover:text-slate-350 transition",H=F<x.length-1?'<span class="text-slate-850">/</span>':"";return`
              <a href="#/page/${E}" class="${R}">${$(z)}</a>
              ${H}
            `}).join("")}
        </div>
      `)}catch{}let T="";e.signature?await Ze(e)!==e.signature?T=`<span class="px-2 py-0.5 bg-red-950/40 text-red-400 border border-red-900/30 rounded text-[9px] font-mono font-bold animate-pulse">⚠️ INTEGRITY FAIL</span>
                            <button id="reconcile-integrity-btn" class="ml-1.5 px-2 py-0.5 bg-red-950/50 hover:bg-red-900/40 text-red-400 hover:text-white border border-red-900/30 hover:border-red-700 rounded text-[9px] font-mono font-bold uppercase transition">Reconcile</button>`:T='<span class="px-2 py-0.5 bg-emerald-950/40 text-emerald-400 border border-emerald-900/30 rounded text-[9px] font-mono font-bold">✓ INTEGRITY OK</span>':T='<span class="px-2 py-0.5 bg-amber-950/40 text-amber-400 border border-amber-900/30 rounded text-[9px] font-mono font-bold">⚠️ UNSIGNED</span>',e.isEncrypted?document.body.classList.add("encrypted-page-active"):document.body.classList.remove("encrypted-page-active");const v=e.classification||"UNCLASSIFIED";let y="border-emerald-500/20 text-emerald-400 bg-emerald-950/10",k="classification-glow-unclassified";v==="CONFIDENTIAL"?(y="border-blue-500/20 text-blue-400 bg-blue-950/10",k="classification-glow-confidential"):v==="SECRET"?(y="border-amber-500/20 text-amber-500 bg-amber-950/10",k="classification-glow-secret"):v==="TOP SECRET"&&(y="border-red-500/30 text-red-500 bg-red-950/10 animate-pulse",k="classification-glow-topsecret");const C=`
    <div class="border ${y} px-4 py-1.5 rounded-lg text-center text-[10px] font-bold font-mono uppercase tracking-widest select-none mb-6">
      ✦ ${v} ✦
    </div>
  `,V=`
    <div class="border ${y} px-4 py-1.5 rounded-lg text-center text-[10px] font-bold font-mono uppercase tracking-widest select-none mt-8">
      ✦ ${v} ✦
    </div>
  `;s.innerHTML=`
    <div class="flex flex-col lg:flex-row gap-4 lg:gap-8 items-start">
      <!-- Main Content Area -->
      <div class="flex-1 min-w-0 glass-panel border rounded-xl p-5 md:p-6 shadow-xl ${k}">
        <!-- Breadcrumb navigation trail -->
        ${Z}
        
        <!-- Top Classification Banner -->
        ${C}
        <!-- Page Header telemetry -->
        <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between border-b border-slate-800 pb-6 mb-6 gap-4">
          <div>
            <h2 class="text-xl sm:text-2xl md:text-3xl font-extrabold text-white font-mono tracking-tight leading-tight break-words">${$(e.title)}</h2>
            <div class="flex flex-wrap items-center gap-3 mt-3">
              <span class="hidden sm:inline text-xs font-mono text-slate-500 uppercase">SYS_REF: ${$(e.slug)}</span>
              <span class="h-3 w-px bg-slate-800"></span>
              <span class="text-xs font-mono text-slate-500 uppercase">UPDATED: ${l}</span>
              <span class="h-3 w-px bg-slate-800"></span>
              <span class="text-xs font-mono text-teal-400 uppercase">⏱️ ${r} MIN READ</span>
              ${T}
              <span class="h-3 w-px bg-slate-800"></span>
              ${e.tags.map(x=>Wr(x)).join("")}
            </div>
            ${(()=>{const x=Pi(e.content);return x.length>0?`
                  <div class="flex flex-wrap items-center gap-1.5 mt-2">
                    <span class="text-[9px] font-mono text-slate-500 uppercase font-bold">Key Terms:</span>
                    ${x.map(E=>`<span class="px-1.5 py-0.5 bg-slate-900 border border-slate-800 text-slate-400 rounded text-[9px] font-mono">${$(E)}</span>`).join("")}
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
        ${P}
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
              ${t.map((x,E)=>`
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-3 first:pt-0">
                  <div class="min-w-0">
                    <p class="text-xs font-mono text-slate-300 break-words">REV_${t.length-E} // ${$(x.title)}</p>
                    <p class="text-[10px] font-mono text-slate-500">${new Date(x.updatedAt).toLocaleString()}</p>
                  </div>
                  <button class="restore-rev-btn px-2.5 py-1 bg-slate-900 border border-slate-800 hover:border-slate-700 text-teal-400 hover:text-teal-300 font-mono text-[10px] rounded transition uppercase shrink-0 self-start sm:self-auto" data-rev-id="${$(x.id)}">
                    ROLLBACK
                  </button>
                  <button class="view-rev-diff-btn px-2.5 py-1 bg-slate-900 border border-slate-800 hover:border-slate-700 text-blue-400 hover:text-blue-300 font-mono text-[10px] rounded transition uppercase shrink-0 self-start sm:self-auto" data-rev-id="${$(x.id)}">
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
        ${V}
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
  `;const B=document.getElementById("pin-page-btn"),_=document.getElementById("pin-page-text");if(B&&_){let x=JSON.parse(localStorage.getItem("pinned_docs")||"[]");x.includes(e.slug)&&(B.classList.add("text-amber-400"),_.innerText="Unpin"),B.addEventListener("click",()=>{x=JSON.parse(localStorage.getItem("pinned_docs")||"[]"),x.includes(e.slug)?(x=x.filter(E=>E!==e.slug),B.classList.remove("text-amber-400"),_.innerText="Pin"):(x.push(e.slug),B.classList.add("text-amber-400"),_.innerText="Unpin"),localStorage.setItem("pinned_docs",JSON.stringify(x)),he()})}const W=document.getElementById("page-export-dropdown-btn"),ae=document.getElementById("page-export-menu");if(W&&ae){W.addEventListener("click",j=>{j.stopPropagation(),ae.classList.toggle("hidden")}),document.addEventListener("click",()=>{ae.classList.add("hidden")});const x=document.getElementById("clone-page-btn");x&&x.addEventListener("click",async()=>{const j=e.slug+"-copy",h={...e,slug:j,title:"Copy of "+e.title,id:crypto.randomUUID(),createdAt:Date.now(),updatedAt:Date.now()};await Me(h),window.location.hash=`#/edit/${j}`});const E=document.querySelectorAll(".toc-link");if(E.length>0){const j=new IntersectionObserver(h=>{h.forEach(w=>{w.isIntersecting&&E.forEach(S=>{S.classList.remove("text-teal-400","font-bold"),S.getAttribute("data-id")===w.target.id&&S.classList.add("text-teal-400","font-bold")})})},{rootMargin:"0px 0px -80% 0px"});document.querySelectorAll("h1, h2, h3").forEach(h=>j.observe(h))}const F=document.getElementById("read-progress");if(F){const j=()=>{const h=document.documentElement.scrollHeight-document.documentElement.clientHeight;if(h>0){const w=window.scrollY/h*100;F.style.width=w+"%"}};window.addEventListener("scroll",j)}document.getElementById("export-single-md").addEventListener("click",async()=>{let j=e.content;if(e.isEncrypted&&G)try{j=await me(e.content,G)}catch{}const h=`---
title: ${e.title}
slug: ${e.slug}
tags: ${e.tags.join(", ")}
updated: ${new Date(e.updatedAt).toISOString()}
encrypted: ${!!e.isEncrypted}
---

`,w=new Blob([h+j],{type:"text/markdown;charset=utf-8;"}),S=URL.createObjectURL(w),D=document.createElement("a");D.href=S,D.download=`${e.slug}.md`,document.body.appendChild(D),D.click(),document.body.removeChild(D),URL.revokeObjectURL(S)}),document.getElementById("export-single-html").addEventListener("click",async()=>{let j=e.content;if(e.isEncrypted&&G)try{j=await me(e.content,G)}catch{}const h=kt(j),w=`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${$(e.title)} - SecOps Wiki Offline</title>
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
  <h1>${$(e.title)}</h1>
  <div class="metadata">
    Slug: ${e.slug} &nbsp;|&nbsp; 
    Updated: ${new Date(e.updatedAt).toLocaleString()} &nbsp;|&nbsp;
    Tags: ${e.tags.map(J=>`<span class="badge">#${$(J)}</span>`).join("")}
  </div>
  <article>
    ${h}
  </article>
</body>
</html>`,S=new Blob([w],{type:"text/html;charset=utf-8;"}),D=URL.createObjectURL(S),M=document.createElement("a");M.href=D,M.download=`${e.slug}.html`,document.body.appendChild(M),M.click(),document.body.removeChild(M),URL.revokeObjectURL(D)}),document.getElementById("export-single-print").addEventListener("click",()=>{window.print()});const H=document.getElementById("export-single-p2p");H&&H.addEventListener("click",async()=>{let j=e.content;if(e.isEncrypted&&G)try{j=await me(e.content,G)}catch{}const h=prompt("Create a secure sharing passphrase for this peer link (min 4 characters):");if(h){if(h.length<4){alert("Security Requirement: Passphrase must be at least 4 characters long.");return}try{const w=await Le(h),S={title:e.title,content:j,tags:e.tags,classification:e.classification||"UNCLASSIFIED"},D=await st(JSON.stringify(S),w),M=btoa(D),J=`${window.location.origin}${window.location.pathname}#/import-p2p?data=${encodeURIComponent(M)}&key=${encodeURIComponent(h)}`;await navigator.clipboard.writeText(J),alert("✓ SECURE P2P LINK GENERATED: The encrypted link has been copied to your clipboard. Share it securely with your peer."),await le("P2P_LINK_EXPORT",`Generated secure share link for document: ${e.title}`)}catch(w){alert(`Encryption error: Failed to generate sharing link - ${w.message}`)}}});const K=document.getElementById("reconcile-integrity-btn");K&&K.addEventListener("click",async()=>{if(!confirm(`RECONCILIATION NOTICE: Confirm restoration of document "${e.title}" to its last cryptographically verified historical revision? Unverified changes will be discarded.`))return;let h=!1;for(const w of t)if(w.signature&&await Ze({slug:w.slug,title:w.title,content:w.content,updatedAt:w.updatedAt,tags:w.tags||[]})===w.signature){await Me({slug:w.slug,title:w.title,content:w.content,updatedAt:Date.now(),tags:w.tags||[],classification:w.classification||"UNCLASSIFIED",isSystem:e.isSystem,isEncrypted:w.isEncrypted}),h=!0;break}h?(alert("✓ RECONCILIATION COMPLETED: The document has been restored to its last verified authentic state."),await Ae(),await he()):(alert("⚠️ RECONCILIATION FAILED: No historical revision could be cryptographically verified. Check audit logs."),await le("RECONCILE_FAILED",`Reconciliation failed for "${e.title}". No authentic revisions found.`))})}const pe=document.getElementById("delete-page-btn");pe&&pe.addEventListener("click",async()=>{confirm(`CRITICAL SYSTEM NOTICE: Confirm total purge of intel document "${e.title}"? This action is irreversible.`)&&(await fo(e.slug),localStorage.setItem("secops-wiki-last-update",Date.now().toString()),ft.postMessage("refresh"),window.location.hash="#/page/home")}),s.querySelectorAll("pre").forEach(x=>{const E=document.createElement("div");E.className="relative group",x.parentNode.insertBefore(E,x),E.appendChild(x);const F=document.createElement("button");F.className="absolute top-2 right-2 px-2 py-1 bg-slate-900/80 hover:bg-slate-800 text-[10px] text-slate-400 hover:text-white font-mono rounded opacity-0 group-hover:opacity-100 transition focus:opacity-100 border border-slate-800 focus:outline-none",F.textContent="COPY",F.addEventListener("click",()=>{var b;const z=((b=x.querySelector("code"))==null?void 0:b.textContent)||x.textContent||"";navigator.clipboard.writeText(z).then(()=>{F.textContent="COPIED",setTimeout(()=>F.textContent="COPY",2e3),document.body.classList.contains("encrypted-page-active")&&Uo()})}),E.appendChild(F)}),s.querySelectorAll(".restore-rev-btn").forEach(x=>{x.addEventListener("click",async E=>{const F=E.currentTarget.getAttribute("data-rev-id"),z=t.find(b=>b.id===F);if(z&&confirm(`ROLLBACK COMMAND: Revert current page content to revision state "${z.title}" saved on ${new Date(z.updatedAt).toLocaleString()}?`)){const b=await He(e.slug);b&&await hs({id:`${b.slug}-${Date.now()}`,slug:b.slug,title:b.title,content:b.content,updatedAt:Date.now(),tags:b.tags,classification:b.classification,signature:b.signature}),await Me({slug:z.slug,title:z.title,content:z.content,updatedAt:Date.now(),tags:e.tags,isSystem:e.isSystem}),alert("Revision successfully restored."),await Ae(),await he()}})}),s.querySelectorAll('.wiki-content input[type="checkbox"]').forEach((x,E)=>{const F=x;F.removeAttribute("disabled"),F.classList.add("cursor-pointer","accent-teal-500"),F.addEventListener("change",async z=>{const b=z.target;await wi(e.slug,E,b.checked)})}),await Ai(s),$i(s);try{window.Prism&&window.Prism.highlightAllUnder(s)}catch{}const Ie=document.getElementById("copy-page-link-btn");Ie&&Ie.addEventListener("click",async()=>{const x=window.location.origin+window.location.pathname+"#/page/"+e.slug;try{await navigator.clipboard.writeText(x),Ie.textContent="✓ Copied!",setTimeout(()=>{Ie.textContent="🔗 Copy Link"},2e3)}catch{prompt("Copy this link:",x)}});const ue=document.getElementById("related-pages-panel");if(ue&&e.tags.length>0){const x=ce.filter(E=>E.slug!==e.slug&&E.tags.some(F=>e.tags.includes(F))).slice(0,5);x.length>0&&(ue.innerHTML=`
        <div class="border-t border-slate-800 mt-8 pt-6">
          <p class="text-xs font-bold font-mono text-slate-400 uppercase tracking-widest mb-3">Related Intel</p>
          <div class="flex flex-wrap gap-2">
            ${x.map(E=>`
              <a href="#/page/${E.slug}" class="px-3 py-1.5 bg-slate-900/60 border border-slate-800 hover:border-teal-500/50 hover:text-teal-400 text-slate-400 font-mono text-xs rounded-lg transition flex items-center gap-1.5">
                <span class="text-[9px]">${E.isEncrypted?"🔒":"⊙"}</span>
                ${$(E.title)}
              </a>
            `).join("")}
          </div>
        </div>
      `)}}async function Go(s){let e="",t="",n="",o=[],a=!1,r=!1,i="UNCLASSIFIED",l=0;if(!Ne){const h=await He(Q);if(h&&(e=h.title,t=h.slug,n=h.content,o=[...h.tags],a=!!h.isSystem,r=!!h.isEncrypted,i=h.classification||"UNCLASSIFIED",h.expiresAt&&h.updatedAt&&(l=Math.round((h.expiresAt-h.updatedAt)/6e4)),h.isEncrypted))if(G)try{n=await me(h.content,G)}catch{n="ERROR: Decryption key mismatch. Please go back and re-decrypt."}else n="ERROR: This page is encrypted. Decrypt it in the reader view first."}const d=`secops-wiki-draft-${Ne?"new":Q}`;let p="";const m=localStorage.getItem(d);if(m)try{const h=JSON.parse(m);e=h.title||e,n=h.content||n,Array.isArray(h.tags)?o=h.tags:typeof h.tags=="string"&&(o=h.tags.split(",").map(w=>w.trim()).filter(w=>w.length>0)),p=`
        <div id="draft-restore-banner" class="bg-teal-950/40 border border-teal-800 text-teal-400 p-3 rounded-lg text-xs font-mono mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <span>RESTORED DRAFT: Unsaved changes restored (${new Date(h.updatedAt).toLocaleTimeString()})</span>
          <button type="button" id="discard-draft-btn" class="underline hover:text-teal-300 font-bold shrink-0">DISCARD</button>
        </div>
      `}catch{}s.innerHTML=`
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
            <input type="text" id="edit-title" value="${$(e)}" required maxlength="100" class="w-full bg-slate-950/80 border border-slate-800 focus:border-teal-500/50 rounded-lg p-2.5 text-base md:text-sm text-slate-200 focus:outline-none transition font-mono">
          </div>

          <!-- Slug Input -->
          <div>
            <label class="block text-xs font-semibold text-slate-400 uppercase tracking-widest font-mono mb-2">Index Slug ID</label>
            <input type="text" id="edit-slug" value="${$(t)}" ${Ne?"":"disabled"} required pattern="^[a-z0-9-_]+$" placeholder="e.g. operational-manual" class="w-full bg-slate-950/80 border border-slate-800 focus:border-teal-500/50 rounded-lg p-2.5 text-base md:text-sm text-slate-200 focus:outline-none transition font-mono disabled:opacity-40 disabled:cursor-not-allowed">
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
              <textarea id="edit-content" rows="16" required class="w-full bg-slate-950/80 border border-slate-800 focus:border-teal-500/50 rounded-b-lg p-4 text-base md:text-sm text-slate-200 focus:outline-none transition font-mono border-t-0" placeholder="Enter markdown payload here...">${$(n)}</textarea>
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
            <input type="checkbox" id="edit-encrypt" ${r?"checked":""} class="w-4 h-4 rounded border-slate-850 bg-slate-950 text-teal-500 focus:ring-teal-500/50 cursor-pointer">
            <label for="edit-encrypt" class="text-xs font-semibold text-slate-400 uppercase tracking-widest font-mono cursor-pointer select-none">Encrypt Document (AES-GCM)</label>
          </div>
          <div class="flex gap-3 justify-end self-end sm:self-auto">
            <a href="${Ne?"#/page/home":`#/page/${Q}`}" id="cancel-edit-btn" class="px-4 py-2 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 font-mono text-xs uppercase rounded transition hover:text-white">
              Cancel
            </a>
            <button type="submit" class="px-4 py-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-mono text-xs uppercase rounded font-bold transition shadow-[0_0_10px_rgba(20,184,166,0.15)]">
              Commit Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  `;const g=document.getElementById("edit-page-form"),f=document.getElementById("edit-content"),O=document.getElementById("live-preview-box"),U=document.getElementById("cancel-edit-btn"),I=document.getElementById("discard-draft-btn"),P=document.getElementById("edit-tab-write"),Z=document.getElementById("edit-tab-preview"),T=document.getElementById("edit-content-container"),v=document.getElementById("live-preview-container");P&&Z&&T&&v&&(P.addEventListener("click",()=>{P.className="flex-1 py-2 text-center text-xs font-mono font-bold border-b-2 border-teal-500 text-teal-400",Z.className="flex-1 py-2 text-center text-xs font-mono font-bold border-b-2 border-transparent text-slate-500",T.className="block",v.className="hidden md:block"}),Z.addEventListener("click",()=>{Z.className="flex-1 py-2 text-center text-xs font-mono font-bold border-b-2 border-teal-500 text-teal-400",P.className="flex-1 py-2 text-center text-xs font-mono font-bold border-b-2 border-transparent text-slate-500",v.className="block",T.className="hidden md:block"}));const y=()=>{const h=f.value,w=document.getElementById("editor-stats");if(w){const S=h.split(/\s+/).filter(J=>J.length>0).length,D=h.length,M=h.split(`
`).length;w.innerText=`Words: ${S} | Chars: ${D} | Lines: ${M}`}if(h.trim().length===0){O.innerHTML='<span class="text-slate-600 font-mono text-xs">No input content.</span>';return}O.innerHTML=kt(h)};function k(h){const w=h.trim().split(`
`);if(w.length<2)return h;const S=w.map(q=>{let ve=q.trim();return ve.startsWith("|")&&(ve=ve.slice(1)),ve.endsWith("|")&&(ve=ve.slice(0,-1)),ve.split("|").map(X=>X.trim())}),D=Math.max(...S.map(q=>q.length));if(D===0)return h;const M=Array(D).fill(0);for(let q=0;q<S.length;q++){const ve=q===1&&S[q].every(X=>/^:-*-*:?$/.test(X)||/^-+$/.test(X));for(let X=0;X<D;X++){const ke=S[q][X]||"";!ve&&ke.length>M[X]&&(M[X]=ke.length)}}for(let q=0;q<D;q++)M[q]=Math.max(M[q],3);return S.map((q,ve)=>{const X=ve===1&&q.every(se=>/^:-*-*:?$/.test(se)||/^-+$/.test(se));return`| ${Array(D).fill("").map((se,Ce)=>{const xe=q[Ce]||"";if(X){const $e=xe.startsWith(":"),Tt=xe.endsWith(":"),It=M[Ce]-($e?1:0)-(Tt?1:0);return($e?":":"")+"-".repeat(Math.max(1,It))+(Tt?":":"")}else return xe.padEnd(M[Ce]," ")}).join(" | ")} |`}).join(`
`)}const C=document.getElementById("toolbar-sketch-btn");C&&C.addEventListener("click",()=>{Li(f)}),Ii(f);const V=h=>{const w=f.selectionStart,S=f.selectionEnd,D=f.value,M=D.substring(w,S);let J="";switch(h){case"bold":J=`**${M||"bold_text"}**`;break;case"italic":J=`*${M||"italic_text"}*`;break;case"header":J=`
### ${M||"Header text"}
`;break;case"code":J=`
\`\`\`javascript
${M||"// code here"}
\`\`\`
`;break;case"link":J=`[${M||"Link text"}](url)`;break;case"table":if(M&&M.includes("|")&&M.includes(`
`))try{J=`
`+k(M)+`
`}catch{J=`
| Header 1 | Header 2 |
| -------- | -------- |
| Cell 1   | Cell 2   |
`}else J=`
| Header 1 | Header 2 |
| -------- | -------- |
| Cell 1   | Cell 2   |
`;break;case"checklist":J=`
- [ ] ${M||"Task description"}
`;break}f.value=D.substring(0,w)+J+D.substring(S),f.focus(),f.selectionStart=w+J.length,f.selectionEnd=w+J.length,y()};s.querySelectorAll(".format-btn").forEach(h=>{h.addEventListener("click",w=>{const S=w.currentTarget.getAttribute("data-format")||"";V(S)})}),f.addEventListener("keyup",h=>{const w=f.value,S=f.selectionStart;if(w.substring(S-2,S)==="[[")rn=!0,ln=S,Qn="",bi(f);else if(rn){if(h.key==="Escape"||h.key==="ArrowUp"||h.key==="ArrowDown"||h.key==="Enter")return;const M=w.substring(ln,S);M.includes(`
`)||S<ln?cn():(Qn=M,Ko(f))}}),f.addEventListener("keydown",h=>{if(rn){const w=document.getElementById("autocomplete-popup");if(!w)return;const S=w.querySelectorAll(".editor-autocomplete-item");let D=Array.from(S).findIndex(M=>M.classList.contains("active"));h.key==="ArrowDown"?(h.preventDefault(),S.length>0&&(D>=0&&S[D].classList.remove("active","bg-teal-950/20","text-teal-400"),D=(D+1)%S.length,S[D].classList.add("active","bg-teal-950/20","text-teal-400"),S[D].scrollIntoView({block:"nearest"}))):h.key==="ArrowUp"?(h.preventDefault(),S.length>0&&(D>=0&&S[D].classList.remove("active","bg-teal-950/20","text-teal-400"),D=(D-1+S.length)%S.length,S[D].classList.add("active","bg-teal-950/20","text-teal-400"),S[D].scrollIntoView({block:"nearest"}))):h.key==="Enter"?(h.preventDefault(),D>=0?S[D].click():S.length>0&&S[0].click()):h.key==="Escape"&&(h.preventDefault(),cn())}}),f.addEventListener("input",()=>{y(),z()}),f.addEventListener("keydown",h=>{if(h.ctrlKey&&(h.key==="s"||h.key==="S")){h.preventDefault();const w=document.getElementById("edit-page-form");w&&w.requestSubmit();return}if(h.key==="Tab"){h.preventDefault();const w=f.selectionStart,S=f.selectionEnd;f.value=f.value.substring(0,w)+"  "+f.value.substring(S),f.selectionStart=f.selectionEnd=w+2,y();return}if(h.ctrlKey&&(h.key==="b"||h.key==="B")){h.preventDefault();const w=f.selectionStart,S=f.selectionEnd,D=f.value.substring(w,S),M=`**${D||"bold"}**`;f.value=f.value.substring(0,w)+M+f.value.substring(S),f.selectionStart=w+2,f.selectionEnd=w+2+(D||"bold").length,y();return}if(h.ctrlKey&&(h.key==="i"||h.key==="I")){h.preventDefault();const w=f.selectionStart,S=f.selectionEnd,D=f.value.substring(w,S),M=`*${D||"italic"}*`;f.value=f.value.substring(0,w)+M+f.value.substring(S),f.selectionStart=w+1,f.selectionEnd=w+1+(D||"italic").length,y();return}}),y();const B=document.getElementById("tag-pills-container"),_=document.getElementById("tag-pill-input"),W=document.getElementById("tag-pill-dropdown"),ae=Array.from(new Set(ce.flatMap(h=>h.tags)));function pe(){if(!B||!_)return;B.querySelectorAll(".tag-badge-pill").forEach(S=>S.remove()),o.forEach(S=>{const D=document.createElement("span");D.className="tag-badge-pill flex items-center gap-1 text-[10px] font-mono bg-teal-950/40 text-teal-400 px-2 py-1 rounded border border-teal-900/30 select-none",D.innerHTML=`
        #${$(S)}
        <button type="button" class="tag-remove-btn hover:text-red-400 font-bold transition focus:outline-none" data-tag="${$(S)}">×</button>
      `,B.insertBefore(D,_)}),B.querySelectorAll(".tag-remove-btn").forEach(S=>{S.addEventListener("click",D=>{const M=D.currentTarget.getAttribute("data-tag");M&&(o=o.filter(J=>J!==M),pe(),z())})})}function Ie(){if(!W||!_)return;const h=_.value.trim().toLowerCase(),w=ae.filter(D=>D.includes(h)&&!o.includes(D));if(w.length===0){W.classList.add("hidden");return}W.innerHTML=w.map(D=>`
      <div class="tag-dropdown-item px-3 py-2 cursor-pointer hover:bg-slate-900 hover:text-white text-slate-350 transition" data-tag="${$(D)}">
        #${$(D)}
      </div>
    `).join(""),W.classList.remove("hidden"),W.querySelectorAll(".tag-dropdown-item").forEach(D=>{D.addEventListener("click",M=>{const J=M.currentTarget.getAttribute("data-tag");J&&!o.includes(J)&&(o.push(J),pe(),z()),_.value="",W.classList.add("hidden"),_.focus()})})}_&&(_.addEventListener("keydown",h=>{if(h.key==="Enter"||h.key===","){h.preventDefault();const w=_.value.trim().toLowerCase().replace(/[^a-z0-9-_]/g,"");w&&!o.includes(w)&&(o.push(w),pe(),z()),_.value="",W&&W.classList.add("hidden")}else h.key==="Backspace"&&_.value===""&&(o.pop(),pe(),z())}),_.addEventListener("input",Ie),_.addEventListener("focus",Ie)),pe();const ue=document.getElementById("editor-layout-grid"),x=document.getElementById("live-preview-container"),E=document.getElementById("toggle-split-btn");function F(){!ue||!x||!E||(nn?(ue.classList.remove("md:grid-cols-1"),ue.classList.add("md:grid-cols-2"),x.classList.remove("md:hidden"),x.classList.add("md:block"),E.textContent="Full Width",E.classList.remove("text-slate-450"),E.classList.add("text-teal-400")):(ue.classList.remove("md:grid-cols-2"),ue.classList.add("md:grid-cols-1"),x.classList.remove("md:block"),x.classList.add("md:hidden"),E.textContent="Split Screen",E.classList.remove("text-teal-400"),E.classList.add("text-slate-450")))}E&&E.addEventListener("click",()=>{nn=!nn,localStorage.setItem("secops-wiki-split-screen",nn.toString()),F()}),F();const z=()=>{var S;const h=(S=document.getElementById("edit-title"))==null?void 0:S.value,w=f.value;(h||w||o.length>0)&&localStorage.setItem(d,JSON.stringify({title:h,content:w,tags:o,updatedAt:Date.now()}))},b=setInterval(z,5e3),R=()=>{clearInterval(b),window.removeEventListener("hashchange",R)};window.addEventListener("hashchange",R);const H=()=>{clearInterval(b),window.removeEventListener("hashchange",R),localStorage.removeItem(d),cn()};U.addEventListener("click",H),I&&I.addEventListener("click",()=>{var h;H(),(h=document.getElementById("draft-restore-banner"))==null||h.remove(),Go(s)});const K=h=>{W&&!W.contains(h.target)&&h.target!==_&&W.classList.add("hidden")};document.addEventListener("click",K);const j=()=>{document.removeEventListener("click",K),window.removeEventListener("hashchange",j)};window.addEventListener("hashchange",j),g.addEventListener("submit",async h=>{h.preventDefault();const w=document.getElementById("edit-title").value.trim(),S=Ne?document.getElementById("edit-slug").value.trim().toLowerCase():t,D=f.value,M=document.getElementById("edit-encrypt").checked,J=document.getElementById("edit-classification").value,q=document.getElementById("edit-expiry"),ve=q?parseInt(q.value,10):0;if(Ne&&!/^[a-z0-9-_]+$/.test(S)){alert("Security Alert: Slug contains illegal characters. Use alphanumeric, hyphens, and underscores only.");return}const X=o.map(xe=>on(xe.trim()).toLowerCase()).filter(xe=>xe.length>0),ke=await He(S);ke&&await hs({id:`${ke.slug}-${Date.now()}`,slug:ke.slug,title:ke.title,content:ke.content,updatedAt:ke.updatedAt,isEncrypted:ke.isEncrypted,tags:ke.tags,classification:ke.classification,signature:ke.signature});let se=D;if(M){if(!G){const xe=prompt("Enter a security passphrase to encrypt this document (min 8 chars, mixed case, numbers, symbols):");if(!xe){alert("Encryption Aborted: A security passphrase is required to save an encrypted document.");return}const $e=zo(xe);if(!$e.valid){alert(`SECURITY ERROR: Passphrase too weak.

${$e.message}`);return}G=await Le(xe)}try{se=await st(D,G)}catch(xe){alert(`Encryption failure: ${xe.message}`);return}}const Ce={slug:S,title:w,content:se,updatedAt:Date.now(),tags:X,isSystem:a,isEncrypted:M,classification:J};ve>0&&(Ce.expiresAt=Ce.updatedAt+ve*60*1e3),Ce.signature=await Ze(Ce);try{await Me(Ce),H(),ft.postMessage("refresh"),window.location.hash=`#/page/${S}`}catch(xe){alert(`Database transaction error: ${xe.message}`)}})}function ai(s,e){let t=s.replace(/\.md$/i,"").replace(/[-_]+/g," ");t=t.split(" ").map(r=>r.charAt(0).toUpperCase()+r.slice(1)).join(" ");let n=s.replace(/\.md$/i,"").toLowerCase().replace(/[^a-z0-9-_]+/g,"-"),o=e,a=["imported"];if(e.startsWith("---")){const r=e.indexOf("---",3);if(r!==-1){const i=e.substring(3,r);o=e.substring(r+3).trim(),i.split(`
`).forEach(d=>{const p=d.indexOf(":");if(p!==-1){const m=d.substring(0,p).trim().toLowerCase(),g=d.substring(p+1).trim();m==="title"?t=g.replace(/^["']|["']$/g,""):m==="slug"?n=g.replace(/[^a-z0-9-_]+/g,"-").toLowerCase():m==="tags"&&(a=g.split(",").map(f=>f.trim().replace(/^["']|["']$/g,"")).filter(f=>f.length>0))}})}}return{slug:n,title:t,content:o,updatedAt:Date.now(),tags:a,isSystem:!1}}function ri(s){const e=["Title","Slug","Tags","Word Count","Encrypted","Last Updated"],t=s.map(n=>{const o=n.content.split(/\s+/).filter(a=>a.length>0).length;return[`"${n.title.replace(/"/g,'""')}"`,`"${n.slug}"`,`"${n.tags.join(", ")}"`,o,n.isEncrypted?"TRUE":"FALSE",`"${new Date(n.updatedAt).toISOString()}"`]});return[e.join(","),...t.map(n=>n.join(","))].join(`
`)}function ii(s){let e="";for(const t of s){let n=t.content;if(t.isEncrypted&&G)try{n=t.content.includes(":")?"🔒 [Encrypted Document: Passphrase Required]":t.content}catch{n="🔒 [Encrypted Document: Passphrase Required]"}const o=kt(n);e+=`
      <section style="page-break-after: always; margin-bottom: 3rem; border-bottom: 2px solid #e2e8f0; padding-bottom: 2rem;">
        <h1 style="font-size: 2.25rem; font-family: monospace; margin-bottom: 0.5rem; color: #1a202c;">${$(t.title)}</h1>
        <div style="font-size: 0.75rem; color: #718096; font-family: monospace; margin-bottom: 1.5rem;">
          SLUG: ${t.slug} | TAGS: #${t.tags.map(a=>$(a)).join(", #")} | UPDATED: ${new Date(t.updatedAt).toLocaleString()}
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
</html>`}function li(s){const e=[],t=s.map(o=>`<a href="${o.slug}.html" style="display: block; padding: 0.5rem; color: #94a3b8; text-decoration: none; font-family: monospace; font-size: 0.8rem; border-radius: 4px; transition: background 0.2s;" onmouseover="this.style.background='#1e293b'; this.style.color='#2dd4bf'" onmouseout="this.style.background='transparent'; this.style.color='#94a3b8'">${$(o.title)}</a>`).join(`
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
      ${s.map(o=>`
        <div class="page-card">
          <a class="page-title" href="${o.slug}.html">${$(o.title)}</a>
          <div class="metadata">
            SLUG: ${o.slug} | TAGS: #${o.tags.map(a=>$(a)).join(", #")} | UPDATED: ${new Date(o.updatedAt).toLocaleString()}
          </div>
        </div>
      `).join("")}
    </div>
  </main>
</body>
</html>`;return e.push({name:"index.html",content:n}),s.forEach(o=>{let a=o.content;if(o.isEncrypted&&G)try{a=o.content.includes(":")?"🔒 [Encrypted Document: Decrypted view not exported]":o.content}catch{a="🔒 [Encrypted Document: Decrypted view not exported]"}let r=kt(a);r=r.replace(/href="#\/page\/([a-z0-9-_]+)"/g,'href="$1.html"');const i=`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${$(o.title)} - SecOps Static Wiki</title>
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
    <h1>${$(o.title)}</h1>
    <div class="metadata">
      Slug: ${o.slug} &nbsp;|&nbsp; 
      Updated: ${new Date(o.updatedAt).toLocaleString()} &nbsp;|&nbsp;
      Tags: ${o.tags.map(l=>`<span class="badge">#${$(l)}</span>`).join("")}
    </div>
    <article class="wiki-content">
      ${r}
    </article>
  </main>
</body>
</html>`;e.push({name:`${o.slug}.html`,content:i})}),Fo(e)}function ci(s){const e=[];let t="",n=!1;for(let l=0;l<s.length;l++){const d=s[l];d==='"'?(n=!n,t+=d):d===`
`&&!n?(e.push(t),t=""):t+=d}if(t&&e.push(t),e.length<2)return[];const o=l=>{const d=[];let p="",m=!1;for(let g=0;g<l.length;g++){const f=l[g];f==='"'?m=!m:f===","&&!m?(d.push(a(p)),p=""):p+=f}return d.push(a(p)),d},a=l=>(l=l.trim(),l.startsWith('"')&&l.endsWith('"')&&(l=l.substring(1,l.length-1)),l.replace(/""/g,'"')),r=o(e[0]).map(l=>l.toLowerCase()),i=[];for(let l=1;l<e.length;l++){if(!e[l].trim())continue;const d=o(e[l]),p={};r.forEach((m,g)=>{p[m]=d[g]||""}),i.push(p)}return i}function di(s){var i;const e=s.title||"Untitled CSV Import",t=s.content||"";let n=s.slug||e.toLowerCase().replace(/[^a-z0-9-_]+/g,"-");n=n.toLowerCase().replace(/[^a-z0-9-_]+/g,"-"),n||(n=`imported-${Date.now()}`);const a=(s.tags||"imported, csv").split(/[,;|]+/).map(l=>l.trim().toLowerCase()).filter(l=>l.length>0),r=s.updatedat?parseInt(s.updatedat):Date.now();return{slug:n,title:e,content:t,updatedAt:isNaN(r)?Date.now():r,tags:a,isSystem:!1,isEncrypted:((i=s.encrypted)==null?void 0:i.toLowerCase())==="true"}}function pi(s,e){const t=s.split(`
`),n=e.split(`
`),o=Array(t.length+1).fill(0).map(()=>Array(n.length+1).fill(0));for(let l=1;l<=t.length;l++)for(let d=1;d<=n.length;d++)t[l-1]===n[d-1]?o[l][d]=o[l-1][d-1]+1:o[l][d]=Math.max(o[l-1][d],o[l][d-1]);const a=[];let r=t.length,i=n.length;for(;r>0||i>0;)r>0&&i>0&&t[r-1]===n[i-1]?(a.unshift({type:"unchanged",text:t[r-1]}),r--,i--):i>0&&(r===0||o[r][i-1]>=o[r-1][i])?(a.unshift({type:"added",text:n[i-1]}),i--):(a.unshift({type:"removed",text:t[r-1]}),r--);return a}function ui(s,e){return new Promise(t=>{let n=document.getElementById("conflict-diff-modal");n||(n=document.createElement("div"),n.id="conflict-diff-modal",n.className="fixed inset-0 bg-[#090d16]/90 backdrop-blur-md z-[100] flex items-center justify-center p-4",document.body.appendChild(n)),n.classList.remove("hidden");const a=pi(s.content,e.content).map(r=>{let i="diff-line-unchanged",l=" ";return r.type==="added"?(i="diff-line-added px-1 rounded",l="+"):r.type==="removed"&&(i="diff-line-removed px-1 rounded",l="-"),`<div class="font-mono text-xs whitespace-pre-wrap ${i}">${l} ${$(r.text)}</div>`}).join(`
`);n.innerHTML=`
      <div class="glass-panel border border-teal-900/30 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col glow-border shadow-2xl">
        <div class="p-4 border-b border-slate-800 flex items-center justify-between shrink-0">
          <h3 class="text-sm font-bold font-mono text-white uppercase tracking-wider">Conflict Detected: ${$(s.slug)}</h3>
          <span class="text-[10px] font-mono bg-red-950/40 text-red-400 border border-red-900/30 px-2 py-0.5 rounded">SLUG DUP_WARN</span>
        </div>
        
        <div class="p-4 overflow-y-auto space-y-4 flex-1">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-slate-950/50 border border-slate-850 p-3 rounded-lg space-y-2">
              <h4 class="text-xs font-bold font-mono text-teal-400 uppercase">Existing Document</h4>
              <p class="text-xs font-mono text-white"><span class="text-slate-500">TITLE:</span> ${$(s.title)}</p>
              <p class="text-xs font-mono text-white"><span class="text-slate-500">TAGS:</span> ${s.tags.map(r=>`#${r}`).join(", ")}</p>
              <p class="text-[10px] font-mono text-slate-500"><span class="text-slate-500">MODIFIED:</span> ${new Date(s.updatedAt).toLocaleString()}</p>
            </div>
            
            <div class="bg-slate-950/50 border border-slate-850 p-3 rounded-lg space-y-2">
              <h4 class="text-xs font-bold font-mono text-teal-450 uppercase">Imported Document</h4>
              <p class="text-xs font-mono text-white"><span class="text-slate-500">TITLE:</span> ${$(e.title)}</p>
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
    `,document.getElementById("diff-opt-skip").addEventListener("click",()=>{n.classList.add("hidden"),t("SKIP")}),document.getElementById("diff-opt-rename").addEventListener("click",()=>{n.classList.add("hidden"),t("MERGE_RENAME")}),document.getElementById("diff-opt-overwrite").addEventListener("click",()=>{n.classList.add("hidden"),t("OVERWRITE")}),document.getElementById("diff-opt-archive").addEventListener("click",()=>{n.classList.add("hidden"),t("REVISION")})})}async function Vn(s,e){const t=Fr(s),n=await He(t.slug);if(n){let o=e;if(e==="ASK"&&(o=await ui(n,t)),o==="SKIP")return!1;if(o==="REVISION")await hs({id:`${n.slug}-${Date.now()}`,slug:n.slug,title:n.title,content:n.content,updatedAt:n.updatedAt,isEncrypted:n.isEncrypted,tags:n.tags,classification:n.classification,signature:n.signature}),t.signature=await Ze(t),await Me(t);else if(o==="OVERWRITE")t.signature=await Ze(t),await Me(t);else if(o==="MERGE_RENAME"){let a=`${t.slug}-imported`,r=await He(a),i=1;for(;r;)a=`${t.slug}-imported-${i}`,r=await He(a),i++;t.slug=a,t.title=`${t.title} (Imported)`,t.signature=await Ze(t),await Me(t)}}else t.signature=await Ze(t),await Me(t);return!0}async function po(s){var m,g;if(!s||s.length===0)return;const e=((m=document.getElementById("import-conflict-resolution"))==null?void 0:m.value)||"REVISION";let t=0,n=0,o=0,a=0,r=0,i=0,l=0,d=0,p=0;for(let f=0;f<s.length;f++){const O=s[f],U=(g=O.name.split(".").pop())==null?void 0:g.toLowerCase();U==="md"?await new Promise(I=>{const P=new FileReader;P.onload=async Z=>{var T;try{const v=(T=Z.target)==null?void 0:T.result,y=ai(O.name,v);await Vn(y,e)?t++:a++}catch{l++}I()},P.readAsText(O)}):U==="csv"?await new Promise(I=>{const P=new FileReader;P.onload=async Z=>{var T;try{const v=(T=Z.target)==null?void 0:T.result,y=ci(v);for(const k of y)try{const C=di(k);await Vn(C,e)?n++:r++}catch{d++}}catch{d++}I()},P.readAsText(O)}):U==="json"&&await new Promise(I=>{const P=new FileReader;P.onload=async Z=>{var T;try{const v=JSON.parse((T=Z.target)==null?void 0:T.result);let y=v;if(v&&v.encrypted===!0&&v.payload){const C=prompt("Secure Backup: Enter password to decrypt database backup file:");if(C===null){p++,I();return}try{const V=await Le(C),B=await me(v.payload,V);y=JSON.parse(B)}catch{alert("Backup Decryption Alert: Authentication failed. Invalid backup passphrase."),p++,I();return}}else v&&v.encrypted===!1&&v.payload&&(y=v.payload);const k=Array.isArray(y)?y:[y];for(const C of k)try{!C.slug&&C.title&&(C.slug=C.title.toLowerCase().replace(/[^a-z0-9-_]+/g,"-")),C.slug||(C.slug=`imported-item-${Date.now()}-${Math.floor(Math.random()*1e3)}`),C.title||(C.title=C.slug.replace(/[-_]+/g," ")),typeof C.tags=="string"&&(C.tags=C.tags.split(",").map(B=>B.trim()).filter(B=>B.length>0)),Array.isArray(C.tags)||(C.tags=[]),C.classification||(C.classification="UNCLASSIFIED"),typeof C.updatedAt!="number"&&(C.updatedAt=Date.now()),await Vn(C,e)?o++:i++}catch{p++}}catch{p++}I()},P.readAsText(O)})}alert(`INGESTION COMPLETED (Conflict resolution: ${e.toUpperCase()}):

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
- Failed: ${p}`),ft.postMessage("refresh"),await Ae(),await he()}async function fi(){const s=document.getElementById("tag-color-palette-manager");if(!s)return;const e=Array.from(new Set(ce.flatMap(r=>r.tags))),t=await ho();if(e.length===0){s.innerHTML='<p class="text-xs font-mono text-slate-500">No active document tags registered.</p>';return}let n='<div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">';for(const r of e){const i=t.find(d=>d.tag===r),l=i?i.color:"slate";n+=`
      <div class="flex items-center justify-between p-2 bg-slate-950/40 border border-slate-800 rounded">
        <span class="text-xs font-mono text-slate-400">#${$(r)}</span>
        <div class="flex gap-2 items-center">
          <button class="rename-tag-btn px-2 py-1 bg-slate-900 border border-slate-700 text-xs text-blue-400 hover:text-blue-300 rounded" data-tag="${$(r)}">Rename</button>
          <select class="tag-color-select bg-slate-900 border border-slate-850 text-xs font-mono text-slate-300 rounded px-2 py-1 focus:outline-none focus:border-teal-500 cursor-pointer" data-tag="${$(r)}"> border border-slate-850 text-xs font-mono text-slate-300 rounded px-2 py-1 focus:outline-none focus:border-teal-500 cursor-pointer" data-tag="${$(r)}">
          <option value="slate" ${l==="slate"?"selected":""}>SLATE GREY</option>
          <option value="emerald" ${l==="emerald"?"selected":""}>EMERALD GREEN</option>
          <option value="blue" ${l==="blue"?"selected":""}>BLUE TEAM</option>
          <option value="red" ${l==="red"?"selected":""}>RED TEAM</option>
          <option value="amber" ${l==="amber"?"selected":""}>AMBER CAUTION</option>
        </select>
        </div>
      </div>
    `}n+="</div>",s.innerHTML=n,s.querySelectorAll(".rename-tag-btn").forEach(r=>{r.addEventListener("click",async i=>{const l=i.currentTarget.getAttribute("data-tag"),d=prompt(`Rename tag "#${l}" to:`);if(d&&d.trim()&&d!==l){const p=d.trim().toLowerCase().replace(/[^a-z0-9-]/g,"");if(p.length>0){for(const m of ce)m.tags.includes(l)&&(m.tags=m.tags.map(g=>g===l?p:g),await Me(m));le("TAG_RENAME",`Renamed tag ${l} to ${p}`),await he()}}})}),s.querySelectorAll(".tag-color-select").forEach(r=>{r.addEventListener("change",async i=>{const l=i.currentTarget.getAttribute("data-tag"),d=i.currentTarget.value;await Ea({tag:l,color:d}),await fs(),await he()})})}function zt(s){const e=Array.from(new Set(ce.flatMap(y=>y.tags)));s.innerHTML=`
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
              <span class="text-emerald-400 font-bold">${Oo()}</span>
            </li>
            <li class="flex justify-between">
              <span class="text-slate-500">ACTIVE VISUAL THEME:</span>
              <span class="text-emerald-400 font-bold">${lt.toUpperCase()}</span>
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
              ${e.map(y=>`
                <option value="${$(y)}">#${$(y)}</option>
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
  `;const t=document.getElementById("system-export-btn"),n=document.getElementById("system-export-zip-btn"),o=document.getElementById("system-export-web-zip-btn"),a=document.getElementById("system-export-csv-btn"),r=document.getElementById("system-export-html-btn"),i=document.getElementById("system-unified-import-file"),l=document.getElementById("system-reset-btn"),d=document.getElementById("total-articles-telemetry"),p=document.getElementById("db-health-diagnostics"),m=document.getElementById("system-drop-zone");d.textContent=ce.length.toString(),p&&ki(p),fi();const g=()=>{const y=document.getElementById("export-tag-filter"),k=(y==null?void 0:y.value)||"ALL";return k==="ALL"?ce:ce.filter(C=>C.tags.includes(k))};t.addEventListener("click",async()=>{const y=g(),k=await Ta(),C={pages:y,attachments:k},V=prompt("Secure Backup: Enter a password to encrypt this database backup file (leave blank for plain JSON):");let B,_=`secops-wiki-backup-${Date.now()}.json`;if(V)try{const pe=await Le(V),Ie=JSON.stringify(C,null,2),x={encrypted:!0,schemaVersion:4,payload:await st(Ie,pe)};B=new Blob([JSON.stringify(x,null,2)],{type:"application/json"}),_=`secops-wiki-encrypted-backup-${Date.now()}.json`}catch(pe){alert(`Backup encryption failed: ${pe.message}`);return}else{if(V===null)return;const pe={encrypted:!1,schemaVersion:4,payload:C};B=new Blob([JSON.stringify(pe,null,2)],{type:"application/json"})}const W=URL.createObjectURL(B),ae=document.createElement("a");ae.href=W,ae.download=_,document.body.appendChild(ae),ae.click(),document.body.removeChild(ae),URL.revokeObjectURL(W)}),n.addEventListener("click",async()=>{const y=g(),k=[];for(const _ of y){let W=_.content;if(_.isEncrypted&&G)try{W=await me(_.content,G)}catch{}const ae=`---
title: ${_.title}
slug: ${_.slug}
tags: ${_.tags.join(", ")}
updated: ${new Date(_.updatedAt).toISOString()}
encrypted: ${!!_.isEncrypted}
---

`;k.push({name:`${_.slug}.md`,content:ae+W})}const C=Fo(k),V=URL.createObjectURL(C),B=document.createElement("a");B.href=V,B.download=`secops-wiki-backup-${Date.now()}.zip`,document.body.appendChild(B),B.click(),document.body.removeChild(B),URL.revokeObjectURL(V)}),o.addEventListener("click",()=>{const y=g(),k=li(y),C=URL.createObjectURL(k),V=document.createElement("a");V.href=C,V.download=`secops-wiki-web-${Date.now()}.zip`,document.body.appendChild(V),V.click(),document.body.removeChild(V),URL.revokeObjectURL(C)}),a.addEventListener("click",()=>{const y=g(),k=ri(y),C=new Blob([k],{type:"text/csv;charset=utf-8;"}),V=URL.createObjectURL(C),B=document.createElement("a");B.href=V,B.download=`secops-wiki-report-${Date.now()}.csv`,document.body.appendChild(B),B.click(),document.body.removeChild(B),URL.revokeObjectURL(V)}),r.addEventListener("click",()=>{const y=g(),k=ii(y),C=new Blob([k],{type:"text/html;charset=utf-8;"}),V=URL.createObjectURL(C),B=document.createElement("a");B.href=V,B.download=`secops-wiki-book-${Date.now()}.html`,document.body.appendChild(B),B.click(),document.body.removeChild(B),URL.revokeObjectURL(V)}),i&&i.addEventListener("change",async y=>{const k=y.target.files;k&&k.length>0&&await po(k)}),["dragenter","dragover","dragleave","drop"].forEach(y=>{m.addEventListener(y,k=>{k.preventDefault(),k.stopPropagation()},!1)}),["dragenter","dragover"].forEach(y=>{m.addEventListener(y,()=>{m.classList.add("border-teal-500","bg-teal-950/10")},!1)}),["dragleave","drop"].forEach(y=>{m.addEventListener(y,()=>{m.classList.remove("border-teal-500","bg-teal-950/10")},!1)}),m.addEventListener("drop",async y=>{const k=y.dataTransfer,C=k==null?void 0:k.files;C&&C.length>0&&await po(C)}),m.addEventListener("click",()=>{i&&i.click()}),l.addEventListener("click",async()=>{const y=prompt('CRITICAL SECURITY WARNING: Type "WIPE" to verify you want to delete ALL wiki pages and custom documents:');if(y==="WIPE")try{if(await go(),"caches"in window)try{const k=await caches.keys();for(const C of k)await caches.delete(C)}catch(k){console.warn("Failed to clear caches: ",k)}await os(),await fs(),alert("Database successfully wiped, caches invalidated, and seeded with standard operating defaults."),localStorage.setItem("secops-wiki-last-update",Date.now().toString()),ft.postMessage("refresh"),await Ae(),window.location.hash="#/page/home"}catch(k){alert(`Reset failed: ${k.message}`)}else y!==null&&alert("Sanitization aborted. Confirmation keyword mismatch.")});const f=document.getElementById("system-session-timeout-select");f&&f.addEventListener("change",()=>{localStorage.setItem("secops-wiki-session-timeout",f.value),ms()});const O=document.getElementById("system-cache-bust-btn");O&&O.addEventListener("click",async()=>{if(confirm("CRITICAL DIAGNOSTICS: Purge cached service worker registrations and static asset cache buckets? This triggers an immediate application reload.")){if("serviceWorker"in navigator){const y=await navigator.serviceWorker.getRegistrations();for(const k of y)await k.unregister()}if("caches"in window){const y=await caches.keys();for(const k of y)await caches.delete(k)}alert("CACHE WIPE COMPLETED. Reloading system..."),window.location.reload()}});const U=document.getElementById("system-mask-encrypted-checkbox");U&&U.addEventListener("change",()=>{nt=U.checked,localStorage.setItem("secops-wiki-mask-encrypted",nt.toString()),Ae().then(()=>{he()})});const I=document.getElementById("system-db-encrypted-checkbox");I&&I.addEventListener("change",async()=>{if(I.checked){const k=prompt("Enter a new Master Passphrase to secure the database (min 8 chars, mixed case, numbers, symbols):");if(!k){I.checked=!1;return}const C=zo(k);if(!C.valid){alert(`SECURITY ERROR: Passphrase too weak.

${C.message}`),I.checked=!1;return}try{de=await Le(k),localStorage.setItem("secops-wiki-db-encrypted","true");const B=await Ht();for(const _ of B)_.isEncryptedAtRest||await Me(_);alert("Database encryption successfully activated. All records are encrypted at rest."),await le("DB_ENCRYPTION_ENABLED","Activated database encryption-at-rest."),await Ae(),zt(s)}catch(V){alert(`Activation failed: ${V.message}`),I.checked=!1}}else{const k=prompt("Enter the current Master Passphrase to confirm decryption:");if(!k){I.checked=!0;return}try{const C=await Le(k);if(!await St(C)){alert("Verification Failed: Incorrect master passphrase."),I.checked=!0;return}const B=await us();localStorage.setItem("secops-wiki-db-encrypted","false"),localStorage.removeItem("secops-wiki-webauthn-gate"),localStorage.removeItem("secops-wiki-webauthn-payload"),localStorage.removeItem("secops-wiki-webauthn-salt"),de=null;for(const _ of B){const W={slug:_.slug,title:_.title,content:_.content,tags:_.tags,isSystem:_.isSystem,isEncrypted:_.isEncrypted,signature:_.signature,updatedAt:_.updatedAt};await dn(W)}alert("Database encryption-at-rest successfully deactivated."),await le("DB_ENCRYPTION_DISABLED","Deactivated database encryption-at-rest."),await Ae(),zt(s)}catch(C){alert(`Deactivation failed: ${C.message}`),I.checked=!0}}});const P=document.getElementById("system-webauthn-register-btn");P&&P.addEventListener("click",async()=>{localStorage.getItem("secops-wiki-webauthn-gate")==="true"?confirm("Are you sure you want to deregister biometric credentials?")&&(localStorage.removeItem("secops-wiki-webauthn-gate"),localStorage.removeItem("secops-wiki-webauthn-payload"),localStorage.removeItem("secops-wiki-webauthn-salt"),alert("Biometric unlock credentials removed."),await le("WEBAUTHN_DEREGISTER","Removed biometric credentials."),zt(s)):await Ci()}),Kn();const Z=document.getElementById("system-prune-audit-btn");Z&&Z.addEventListener("click",async()=>{confirm("Audit Log Pruning: Confirm deletion of security logs older than 30 days?")&&(await yo(30),await le("AUDIT_LOG_PRUNED","Manually pruned audit logs older than 30 days."),await Kn(),alert("Audit logs successfully pruned."))});const T=document.getElementById("system-wipe-audit-btn");T&&T.addEventListener("click",async()=>{confirm("CRITICAL ACTION: Are you sure you want to purge the security audit log registers?")&&(await xo(),await le("AUDIT_LOG_CLEARED","Security audit log register cleared."),await Kn())}),ss();const v=document.getElementById("system-wipe-all-drafts-btn");v&&v.addEventListener("click",()=>{if(confirm("CRITICAL WARN: Purge all unsaved document draft fragments in local storage?")){const y=[];for(let k=0;k<localStorage.length;k++){const C=localStorage.key(k)||"";C.startsWith("secops-wiki-draft-")&&y.push(C)}y.forEach(k=>localStorage.removeItem(k)),ss()}})}function ss(){const s=document.getElementById("system-drafts-recovery-list");if(!s)return;const e=[];for(let n=0;n<localStorage.length;n++){const o=localStorage.key(n)||"";o.startsWith("secops-wiki-draft-")&&e.push(o)}const t=e.map(n=>{try{const o=localStorage.getItem(n)||"",a=JSON.parse(o),r=n.substring(18);return{key:n,slug:r,title:a.title||"(Untitled)",updatedAt:a.updatedAt||Date.now(),size:o.length}}catch{return null}}).filter(n=>n!==null);if(t.length===0){s.innerHTML='<p class="text-xs font-mono text-slate-500">No unsaved drafts found in local storage.</p>';return}s.innerHTML=t.map(n=>`
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 first:pt-0">
      <div class="min-w-0">
        <p class="text-xs font-mono text-slate-350 truncate">DRAFT // ${$(n.title)}</p>
        <div class="flex items-center gap-2 mt-1 text-[9px] font-mono text-slate-500 uppercase">
          <span>SLUG: ${$(n.slug)}</span>
          <span>•</span>
          <span>SIZE: ${n.size} B</span>
          <span>•</span>
          <span>SAVED: ${new Date(n.updatedAt).toLocaleString()}</span>
        </div>
      </div>
      <div class="flex gap-2 shrink-0 self-start sm:self-auto">
        <button class="draft-action-restore px-2 py-1 bg-slate-900 border border-slate-800 hover:border-slate-700 text-teal-400 hover:text-teal-300 font-mono text-[10px] rounded transition uppercase" data-slug="${$(n.slug)}">
          Restore
        </button>
        <button class="draft-action-wipe px-2 py-1 bg-red-950/20 border border-red-900/30 hover:bg-red-900/30 text-red-400 hover:text-red-300 font-mono text-[10px] rounded transition uppercase" data-key="${$(n.key)}">
          Wipe
        </button>
      </div>
    </div>
  `).join(""),s.querySelectorAll(".draft-action-restore").forEach(n=>{n.addEventListener("click",o=>{const a=o.currentTarget.getAttribute("data-slug");Xe=!0,Ne=a==="new",Q=a,window.location.hash=Ne?"#/new":`#/edit/${a}`})}),s.querySelectorAll(".draft-action-wipe").forEach(n=>{n.addEventListener("click",o=>{const a=o.currentTarget.getAttribute("data-key");localStorage.removeItem(a),ss()})})}function jt(){const s=document.getElementById("command-palette-backdrop");if(s)if(zn=!zn,zn){s.classList.remove("hidden");const e=document.getElementById("command-palette-input");e&&(e.value="",e.focus()),Pe=0,bn()}else s.classList.add("hidden")}function Vo(){if(document.getElementById("command-palette-backdrop"))return;const s=document.createElement("div");s.id="command-palette-backdrop",s.className="fixed inset-0 bg-[#090d16]/85 backdrop-blur-md z-50 flex items-start justify-center pt-20 hidden",s.innerHTML=`
    <div class="glass-panel border border-teal-900/30 rounded-xl w-full max-w-lg overflow-hidden shadow-2xl mx-4 glow-border">
      <input type="text" id="command-palette-input" placeholder="Search pages or run system commands..." class="w-full bg-slate-950/80 text-white font-mono text-sm p-4 outline-none border-b border-slate-800 focus:border-teal-500/30 placeholder-slate-500 transition">
      <div id="command-palette-results" class="max-h-80 overflow-y-auto divide-y divide-slate-850/40 p-2 space-y-1"></div>
    </div>
  `,document.body.appendChild(s);const e=document.getElementById("command-palette-input");e.addEventListener("input",()=>{Pe=0,bn()}),e.addEventListener("keydown",gi),s.addEventListener("click",t=>{t.target===s&&jt()})}function bn(){const s=document.getElementById("command-palette-input"),e=document.getElementById("command-palette-results");if(!e)return;const t=s?s.value.trim().toLowerCase():"",n=[{title:"CREATE NEW PAGE",subtitle:"Open the editor to establish a new document",icon:"➕",action:()=>{window.location.hash="#/new"}},{title:"TOGGLE THEME",subtitle:`Switch visual style (currently ${lt})`,icon:"🌓",action:()=>{jo()}},{title:"SYSTEM ADMIN",subtitle:"Access operations console and db diagnostics",icon:"⚙️",action:()=>{window.location.hash="#/system"}},{title:"TACTICAL MAP VIEW",subtitle:"Display interactive node relationship map",icon:"🗺️",action:()=>{window.location.hash="#/graph"}},{title:"PANIC PURGE PROTOCOL",subtitle:"Emergency self-destruct - wipes all data",icon:"🚨",action:()=>{const p=document.getElementById("system-panic-btn");p&&p.click()}}];let o="",a=0;const r=n.filter(p=>p.title.toLowerCase().includes(t)||p.subtitle.toLowerCase().includes(t));let i=[];t?i=ce.map(p=>({page:p,score:Ho(Et.find(m=>m.slug===p.slug)||p,t)})).filter(p=>p.score>0).sort((p,m)=>m.score-p.score):i=ce.slice(0,5).map(p=>({page:p,score:0}));const l=r.length+i.length;Pe>=l?Pe=0:Pe<0&&(Pe=l-1),r.forEach(p=>{o+=`
      <div class="command-palette-item p-3 rounded-lg flex items-center justify-between cursor-pointer font-mono text-xs transition-all ${a===Pe?"command-item-active bg-teal-950/20 text-teal-400 border-l-2 border-teal-500":"text-slate-400 hover:bg-slate-900/40 hover:text-slate-200"}" data-index="${a}">
        <div class="flex items-center gap-3">
          <span class="text-base">${p.icon}</span>
          <div>
            <div class="font-bold text-white uppercase">${p.title}</div>
            <div class="text-[10px] text-slate-500">${p.subtitle}</div>
          </div>
        </div>
        <span class="text-[10px] text-slate-650 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-900 uppercase">CMD</span>
      </div>
    `,a++}),i.forEach(p=>{const m=a===Pe,g=p.page;o+=`
      <div class="command-palette-item p-3 rounded-lg flex items-center justify-between cursor-pointer font-mono text-xs transition-all ${m?"command-item-active bg-teal-950/20 text-teal-400 border-l-2 border-teal-500":"text-slate-400 hover:bg-slate-900/40 hover:text-slate-200"}" data-index="${a}">
        <div class="flex items-center gap-3">
          <span class="text-base">${g.isEncrypted?"🔒":"📄"}</span>
          <div>
            <div class="font-bold text-white">${$(g.title)}</div>
            <div class="text-[10px] text-slate-500">Slug: ${$(g.slug)} ${g.tags.length?`• tags: #${g.tags.map(f=>$(f)).join(", #")}`:""}</div>
          </div>
        </div>
        <span class="text-[10px] text-slate-650 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-900 uppercase">PAGE</span>
      </div>
    `,a++}),l===0&&(o='<div class="text-center py-6 text-xs text-slate-600 font-mono">No matching commands or pages found.</div>'),e.innerHTML=o,e.querySelectorAll(".command-palette-item").forEach(p=>{p.addEventListener("click",()=>{const m=parseInt(p.getAttribute("data-index")||"0",10);mi(m,r,i)})}),hi()}function mi(s,e,t){if(jt(),s<e.length)e[s].action();else{const n=s-e.length;n<t.length&&(window.location.hash=`#/page/${t[n].page.slug}`)}}function gi(s){const e=document.getElementById("command-palette-results");if(!e)return;const t=e.querySelectorAll(".command-palette-item");if(t.length!==0)if(s.key==="ArrowDown")s.preventDefault(),Pe=(Pe+1)%t.length,bn();else if(s.key==="ArrowUp")s.preventDefault(),Pe=(Pe-1+t.length)%t.length,bn();else if(s.key==="Enter"){s.preventDefault();const n=e.querySelector(".command-item-active");n&&n.click()}else s.key==="Escape"&&(s.preventDefault(),jt())}function hi(){const s=document.getElementById("command-palette-results");if(!s)return;const e=s.querySelector(".command-item-active");e&&e.scrollIntoView({block:"nearest"})}function bi(s){const e=document.getElementById("autocomplete-popup");e&&(e.classList.remove("hidden"),Ko(s))}function cn(){const s=document.getElementById("autocomplete-popup");s&&(s.classList.add("hidden"),rn=!1)}function Ko(s){const e=document.getElementById("autocomplete-popup");if(!e)return;const t=Qn.toLowerCase().trim(),n=ce.filter(a=>a.title.toLowerCase().includes(t)||a.slug.toLowerCase().includes(t));if(n.length===0){e.innerHTML='<div class="p-2 text-slate-500 italic">No matches found</div>';return}e.innerHTML=n.map((a,r)=>`
    <div class="editor-autocomplete-item p-2 cursor-pointer transition ${r===0?"active bg-teal-950/20 text-teal-400":"text-slate-400 hover:bg-slate-900/40 hover:text-slate-200"}" data-slug="${$(a.slug)}" data-title="${$(a.title)}">
      <span class="font-bold">${$(a.title)}</span>
      <span class="text-[9px] text-slate-500 block truncate">Slug: ${$(a.slug)}</span>
    </div>
  `).join(""),e.querySelectorAll(".editor-autocomplete-item").forEach(a=>{a.addEventListener("click",r=>{const i=r.currentTarget,l=i.getAttribute("data-slug")||"",d=i.getAttribute("data-title")||"";yi(s,d,l)})});const o=xi(s,s.selectionStart);e.style.left=`${Math.min(s.clientWidth-260,Math.max(16,o.left))}px`,e.style.top=`${Math.min(s.clientHeight-100,Math.max(40,o.top+20))}px`}function xi(s,e){const n=s.value.substring(0,e).split(`
`),o=n.length-1,a=n[o],r=8,i=20,l=16+a.length*r%(s.clientWidth-40),d=12+o*i-s.scrollTop;return{left:l,top:d}}function yi(s,e,t){const n=ln-2,o=s.selectionStart,a=s.value,r=`[${e}](#/page/${t})`;s.value=a.substring(0,n)+r+a.substring(o),s.focus(),s.selectionStart=n+r.length,s.selectionEnd=n+r.length,cn();const i=document.getElementById("live-preview-box");i&&(i.innerHTML=kt(s.value))}async function wi(s,e,t){const n=await He(s);if(!n)return;let o=n.content;const a=!!n.isEncrypted;if(a){if(!G){alert("Authentication Error: Decryption key is missing. Re-decrypt page first.");return}try{o=await me(o,G)}catch{alert("Decryption failure.");return}}let r=0;const i=/([-*+]\s+\[)([ xX])(\])/g,l=o.replace(i,(m,g,f,O)=>r===e?(r++,`${g}${t?"x":" "}${O}`):(r++,m));let d=l;a&&G&&(d=await st(l,G)),n.content=d,n.updatedAt=Date.now(),n.signature=await Ze(n),await Me(n),ft.postMessage("refresh"),await Ae();const p=document.getElementById("main-content");p&&await hn(p)}function Yo(s){const e=[],t=/(?:\(|"|^|\s)#\/page\/([a-z0-9-_]+)/g;let n;for(;(n=t.exec(s))!==null;)e.push(n[1].toLowerCase());return Array.from(new Set(e))}async function vi(s){s.innerHTML=`
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
  `;const e=document.getElementById("tactical-map-canvas");if(!e)return;const t=e.getContext("2d");if(!t)return;const n=window.devicePixelRatio||1,o=e.getBoundingClientRect();e.width=o.width*n,e.height=500*n,t.scale(n,n);const a=o.width,r=500;let i=1,l=0,d=0,p=!1,m=0,g=0;const f=ce.map(b=>{const R=a/2+(Math.random()-.5)*100,H=r/2+(Math.random()-.5)*100;return{id:b.slug,title:b.title,x:R,y:H,vx:0,vy:0,radius:b.slug==="home"?14:10,isEncrypted:!!b.isEncrypted,isSystem:!!b.isSystem}}),O=[],U=new Set(f.map(b=>b.id));for(const b of ce){let R=b.content;if(b.isEncrypted&&G)try{R=await me(b.content,G)}catch{}Yo(R).forEach(K=>{U.has(K)&&K!==b.slug&&O.push({source:b.slug,target:K})})}let I=null,P=null,Z=0,T=0,v=0,y="";const k=document.getElementById("map-search-input");k&&k.addEventListener("input",b=>{y=b.target.value.trim().toLowerCase()});const C=.02,V=1200,B=.85,_=.02;function W(b,R){const H=(b-a/2-l)/i+a/2,K=(R-r/2-d)/i+r/2;return{x:H,y:K}}function ae(){for(let b=0;b<f.length;b++){const R=f[b];for(let H=b+1;H<f.length;H++){const K=f[H],j=K.x-R.x,h=K.y-R.y,w=j*j+h*h+.1,S=Math.sqrt(w);if(S<250){const D=V/w,M=j/S*D,J=h/S*D;R!==I&&(R.vx-=M,R.vy-=J),K!==I&&(K.vx+=M,K.vy+=J)}}}O.forEach(b=>{const R=f.find(M=>M.id===b.source),H=f.find(M=>M.id===b.target);if(!R||!H)return;const K=H.x-R.x,j=H.y-R.y,h=Math.sqrt(K*K+j*j)||.1,w=(h-100)*C,S=K/h*w,D=j/h*w;R!==I&&(R.vx+=S,R.vy+=D),H!==I&&(H.vx-=S,H.vy-=D)}),f.forEach(b=>{if(b===I)return;const R=a/2-b.x,H=r/2-b.y;b.vx+=R*_,b.vy+=H*_,b.x+=b.vx,b.y+=b.vy,b.vx*=B,b.vy*=B,b.x=Math.max(b.radius,Math.min(a-b.radius,b.x)),b.y=Math.max(b.radius,Math.min(r-b.radius,b.y))})}function pe(){t.clearRect(0,0,a,r),t.save(),t.translate(a/2+l,r/2+d),t.scale(i,i),t.translate(-a/2,-r/2),t.lineWidth=1,O.forEach(b=>{const R=f.find(D=>D.id===b.source),H=f.find(D=>D.id===b.target);if(!R||!H)return;const K=y.length>0,j=K&&R.title.toLowerCase().includes(y),h=K&&H.title.toLowerCase().includes(y),w=P&&(P.id===R.id||P.id===H.id);let S=.4;K&&(S=j&&h?.6:.05),t.strokeStyle=w?"rgba(20, 184, 166, 0.6)":`rgba(30, 41, 59, ${S})`,t.lineWidth=w?1.5/i:1/i,t.beginPath(),t.moveTo(R.x,R.y),t.lineTo(H.x,H.y),t.stroke()}),f.forEach(b=>{t.beginPath();const R=y.length>0,H=R&&b.title.toLowerCase().includes(y);let K=b.radius,j=1,h=0;if(R)if(H){const J=Math.sin(Date.now()/150)*2+3;K=b.radius+J,h=15,j=1}else j=.2;t.arc(b.x,b.y,K,0,2*Math.PI);let w="#14b8a6",S="rgba(20, 184, 166, 0.4)";b.isEncrypted?(w="#ef4444",S="rgba(239, 68, 68, 0.4)"):b.isSystem&&(w="#3b82f6",S="rgba(59, 130, 246, 0.4)"),t.fillStyle=w,t.globalAlpha=j,t.shadowColor=S,t.shadowBlur=P===b?12:h||6,t.fill(),t.shadowBlur=0,t.strokeStyle=`rgba(255, 255, 255, ${.1*j})`,t.lineWidth=1.5/i,t.stroke();const M=b.isEncrypted&&!G&&nt?"[REDACTED CORE]":b.title;t.fillStyle=P===b||H?`rgba(255, 255, 255, ${j})`:`rgba(148, 163, 184, ${j})`,t.font=P===b||H?`bold ${10/i}px monospace`:`${9/i}px monospace`,t.textAlign="center",t.fillText(M,b.x,b.y-K-5/i)}),t.restore(),t.globalAlpha=1}function Ie(){ae(),pe(),v=requestAnimationFrame(Ie)}e.addEventListener("mousemove",b=>{const R=e.getBoundingClientRect(),H=b.clientX-R.left,K=b.clientY-R.top,j=W(H,K);if(Z=j.x,T=j.y,I){I.x=Z,I.y=T,I.vx=0,I.vy=0;return}if(p){l=H-m,d=K-g;return}P=null;for(const h of f){const w=h.x-Z,S=h.y-T;if(w*w+S*S<(h.radius+5)*(h.radius+5)){P=h;break}}}),e.addEventListener("mousedown",b=>{const R=e.getBoundingClientRect(),H=b.clientX-R.left,K=b.clientY-R.top;if(P){I=P;const j=W(H,K);I.x=j.x,I.y=j.y}else p=!0,m=H-l,g=K-d}),e.addEventListener("wheel",b=>{b.preventDefault();const R=e.getBoundingClientRect(),H=b.clientX-R.left,K=b.clientY-R.top,j=W(H,K),h=b.deltaY<0?1.1:.9;i=Math.max(.2,Math.min(4,i*h)),l=H-(j.x-a/2)*i-a/2,d=K-(j.y-r/2)*i-r/2},{passive:!1});const ue=()=>{I=null,p=!1};window.addEventListener("mouseup",ue),e.addEventListener("click",()=>{P&&!p&&(cancelAnimationFrame(v),window.location.hash=`#/page/${P.id}`)});const x=document.getElementById("map-zoom-in"),E=document.getElementById("map-zoom-out"),F=document.getElementById("map-zoom-reset");x.addEventListener("click",()=>{i=Math.min(4,i*1.2)}),E.addEventListener("click",()=>{i=Math.max(.2,i/1.2)}),F.addEventListener("click",()=>{i=1,l=0,d=0}),Ie();const z=()=>{cancelAnimationFrame(v),window.removeEventListener("mouseup",ue),window.removeEventListener("hashchange",z)};window.addEventListener("hashchange",z)}async function ki(s){s.innerHTML=`
    <div class="text-xs font-mono text-slate-500 animate-pulse">Running security & link integrity scan...</div>
  `;const e=await us();let t=0;const n=new TextEncoder;e.forEach(d=>{const p=JSON.stringify(d);t+=n.encode(p).length});const o=t<1024?`${t} Bytes`:t<1024*1024?`${(t/1024).toFixed(2)} KB`:`${(t/(1024*1024)).toFixed(2)} MB`,a=new Set(e.map(d=>d.slug)),r={};e.forEach(d=>{r[d.slug]=[]});const i=[];for(const d of e){let p=d.content;if(d.isEncrypted&&G)try{p=await me(d.content,G)}catch{}Yo(p).forEach(g=>{a.has(g)?g!==d.slug&&r[g].push(d.slug):i.push({source:d.slug,target:g})})}const l=e.filter(d=>d.slug!=="home"&&r[d.slug].length===0);s.innerHTML=`
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
                <div class="text-[10px] text-red-400/80">📄 [${$(d.source)}] references non-existent [${$(d.target)}]</div>
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
                <div class="text-[10px] text-amber-500/80">📄 [${$(d.title)}] (slug: ${$(d.slug)}) has zero citations</div>
              `).join("")}
            </div>
          `}
        </div>
      </div>
    </div>
  `}let Et=[];async function Ei(){Et=[];for(const s of ce){let e=s.content,t=s.title;if(s.isEncrypted&&G&&s.slug===Q)try{e=await me(s.content,G)}catch{}Et.push({...s,content:e,title:t})}}async function hs(s){if(localStorage.getItem("secops-wiki-db-encrypted")==="true"&&de){const t={title:s.title,content:s.content,isEncrypted:s.isEncrypted,updatedAt:s.updatedAt,tags:s.tags,classification:s.classification,signature:s.signature},n=await st(JSON.stringify(t),de),o={id:s.id,slug:s.slug,title:"[REDACTED AT REST]",content:"[REDACTED AT REST]",updatedAt:s.updatedAt,isEncryptedAtRest:!0,encryptedData:n};await Us(o)}else await Us(s);try{const t=await mo(s.slug);if(t.length>20)for(let n=20;n<t.length;n++)await va(t[n].id)}catch(t){console.warn("Failed to compact revisions for slug:",s.slug,t)}}async function Si(s){const e=await mo(s),t=[];for(const n of e)if(n.isEncryptedAtRest&&n.encryptedData){if(!de){t.push({id:n.id,slug:n.slug,title:"[DATABASE LOCKED]",content:"Master passphrase required to unlock this database record.",updatedAt:n.updatedAt,isEncrypted:!1});continue}try{const o=await me(n.encryptedData,de),a=JSON.parse(o);t.push({id:n.id,slug:n.slug,title:a.title,content:a.content,updatedAt:a.updatedAt,isEncrypted:a.isEncrypted,tags:a.tags,classification:a.classification,signature:a.signature})}catch(o){console.error("Failed to decrypt revision at rest:",o)}}else t.push(n);return t}async function St(s){const e=await Ht();for(const t of e)if(t.isEncryptedAtRest&&t.encryptedData)try{return await me(t.encryptedData,s),!0}catch{return!1}return!0}function Ti(){let s=document.getElementById("master-unlock-overlay");s||(s=document.createElement("div"),s.id="master-unlock-overlay",s.className="fixed inset-0 bg-[#060814]/98 backdrop-blur-xl z-[100] flex items-center justify-center p-4",document.body.appendChild(s));const t=localStorage.getItem("secops-wiki-webauthn-gate")==="true"?`
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
  `;const n=document.getElementById("master-unlock-form"),o=document.getElementById("master-unlock-input"),a=document.getElementById("master-unlock-error"),r=document.getElementById("master-unlock-wipe-btn"),i=document.getElementById("master-unlock-biometric-btn");setTimeout(()=>o==null?void 0:o.focus(),50),n.addEventListener("submit",async l=>{l.preventDefault(),a.classList.add("hidden");const d=o.value;try{const p=await Le(d);await St(p)?(de=p,Zo()):(a.classList.remove("hidden"),o.value="",o.focus(),await le("DECRYPT_FAIL","Master database unlock attempt with invalid passphrase."))}catch(p){a.textContent=`ERROR: ${p.message.toUpperCase()}`,a.classList.remove("hidden")}}),r.addEventListener("click",async()=>{confirm("CRITICAL ACTION: Are you sure you want to completely wipe this database? All encrypted records and system procedures will be permanently deleted.")&&prompt('Type "WIPE" to confirm sanitization:')==="WIPE"&&(await go(),await os(),localStorage.removeItem("secops-wiki-db-encrypted"),localStorage.removeItem("secops-wiki-webauthn-gate"),localStorage.removeItem("secops-wiki-webauthn-payload"),localStorage.removeItem("secops-wiki-webauthn-salt"),de=null,s.remove(),alert("Database successfully wiped and reset to default plaintext configuration."),window.location.reload())}),i&&i.addEventListener("click",async()=>{await Ri()})}function Zo(){const s=document.getElementById("master-unlock-overlay");s&&s.remove(),le("SESSION_UNLOCK","Database session unlocked and decrypted at rest."),Ae().then(()=>{qo(),Vo(),window.addEventListener("hashchange",gn),window.addEventListener("online",mn),window.addEventListener("offline",mn),gn()})}function Ii(s){const e=async t=>{const n=new FileReader;n.onload=async()=>{const o=n.result.split(",")[1],a=`att-${Date.now()}-${Math.random().toString(36).substring(2,9)}`;let r=G||de,i=o;if(r)try{i=await st(o,r)}catch(g){console.error("Failed to encrypt attachment:",g)}const l={id:a,name:t.name,mimeType:t.type,data:i};await Sa(l),await le("ATTACHMENT_SAVE",`Saved attachment ${t.name} (ID: ${a}, size: ${t.size} bytes).`);const d=t.type.startsWith("image/")?`![${t.name}](attachment://${a})`:`[Attachment: ${t.name}](attachment://${a})`,p=s.selectionStart,m=s.selectionEnd;s.value=s.value.substring(0,p)+d+s.value.substring(m),s.selectionStart=s.selectionEnd=p+d.length,s.dispatchEvent(new Event("input"))},n.readAsDataURL(t)};s.addEventListener("dragover",t=>{t.preventDefault()}),s.addEventListener("drop",async t=>{var o;t.preventDefault();const n=(o=t.dataTransfer)==null?void 0:o.files;if(n&&n.length>0)for(let a=0;a<n.length;a++)await e(n[a])}),s.addEventListener("paste",async t=>{var o;const n=(o=t.clipboardData)==null?void 0:o.items;if(n){for(let a=0;a<n.length;a++)if(n[a].kind==="file"){const r=n[a].getAsFile();r&&await e(r)}}})}async function Ai(s){const e=s.querySelectorAll('img[src^="attachment://"]');for(const n of Array.from(e)){const o=n.src.replace("attachment://","").split("/").pop()||"",a=await zs(o);if(a){const r=await uo(a);r&&(n.src=r)}}const t=s.querySelectorAll('a[href^="attachment://"]');for(const n of Array.from(t)){const o=n.href.replace("attachment://","").split("/").pop()||"",a=await zs(o);if(a){const r=await uo(a);r&&(n.href=r,n.download=a.name)}}}async function uo(s){let e=s.data;if(e.includes(":")){let t=null;if(G)try{t=await me(e,G)}catch{}if(!t&&de)try{t=await me(e,de)}catch{}if(!t)return null;e=t}try{const t=atob(e),n=new Uint8Array(t.length);for(let a=0;a<t.length;a++)n[a]=t.charCodeAt(a);const o=new Blob([n],{type:s.mimeType});return URL.createObjectURL(o)}catch(t){return console.error("Failed to parse base64 for attachment:",t),null}}async function Kn(){const s=document.getElementById("system-audit-logs-list");if(!s)return;const e=await bo();if(e.length===0){s.innerHTML='<p class="text-xs font-mono text-slate-500">No security audit logs found.</p>';return}s.innerHTML=`
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
            <td class="py-1.5 font-bold ${t.event.includes("FAIL")||t.event.includes("DELETE")||t.event.includes("WIPE")?"text-red-400":"text-teal-400"}">${$(t.event)}</td>
            <td class="py-1.5 text-slate-400 max-w-xs truncate" title="${$(t.details)}">${$(t.details)}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `}function Li(s){let e=document.getElementById("drawing-canvas-modal");e||(e=document.createElement("div"),e.id="drawing-canvas-modal",e.className="fixed inset-0 bg-[#090d16]/90 backdrop-blur-md z-50 flex items-center justify-center p-4",document.body.appendChild(e)),e.innerHTML=`
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
  `,e.classList.remove("hidden");const t=document.getElementById("sketch-canvas"),n=t.getContext("2d"),o=window.devicePixelRatio||1,a=600,r=350;t.width=a*o,t.height=r*o,t.style.width=`${a}px`,t.style.height=`${r}px`,n.scale(o,o),n.lineCap="round",n.lineJoin="round",n.strokeStyle="#ffffff",n.lineWidth=5,n.fillStyle="#060814",n.fillRect(0,0,a,r);let i=!1,l="pen",d="#ffffff",p=0,m=0,g;const f=[],O=[];f.push(n.getImageData(0,0,t.width,t.height));const U=x=>{const E=t.getBoundingClientRect(),F="touches"in x?x.touches[0].clientX:x.clientX,z="touches"in x?x.touches[0].clientY:x.clientY;return{x:(F-E.left)*(a/E.width),y:(z-E.top)*(r/E.height)}},I=x=>{i=!0;const E=U(x);p=E.x,m=E.y,g=n.getImageData(0,0,t.width,t.height),(l==="pen"||l==="eraser")&&(n.beginPath(),n.moveTo(p,m)),x.preventDefault()},P=x=>{if(!i)return;const E=U(x),F=parseInt(V.value,10);if(l==="pen"||l==="eraser")n.lineTo(E.x,E.y),n.strokeStyle=l==="eraser"?"#060814":d,n.lineWidth=F,n.stroke();else if(n.putImageData(g,0,0),n.beginPath(),n.strokeStyle=d,n.lineWidth=F,l==="line")n.moveTo(p,m),n.lineTo(E.x,E.y),n.stroke();else if(l==="arrow"){n.moveTo(p,m),n.lineTo(E.x,E.y),n.stroke();const z=Math.atan2(E.y-m,E.x-p),b=Math.max(10,F*2.5);n.beginPath(),n.moveTo(E.x,E.y),n.lineTo(E.x-b*Math.cos(z-Math.PI/6),E.y-b*Math.sin(z-Math.PI/6)),n.lineTo(E.x-b*Math.cos(z+Math.PI/6),E.y-b*Math.sin(z+Math.PI/6)),n.closePath(),n.fillStyle=d,n.fill()}else if(l==="rect")n.rect(p,m,E.x-p,E.y-m),n.stroke();else if(l==="circle"){const z=Math.sqrt(Math.pow(E.x-p,2)+Math.pow(E.y-m,2));n.arc(p,m,z,0,2*Math.PI),n.stroke()}x.preventDefault()},Z=()=>{i&&((l==="pen"||l==="eraser")&&n.closePath(),i=!1,f.push(n.getImageData(0,0,t.width,t.height)),O.length=0)},T=()=>{if(f.length>1){const x=f.pop();O.push(x);const E=f[f.length-1];n.putImageData(E,0,0)}},v=()=>{if(O.length>0){const x=O.pop();f.push(x),n.putImageData(x,0,0)}};t.addEventListener("mousedown",I),t.addEventListener("mousemove",P),window.addEventListener("mouseup",Z),t.addEventListener("touchstart",I,{passive:!1}),t.addEventListener("touchmove",P,{passive:!1}),window.addEventListener("touchend",Z);const y=x=>{x.ctrlKey&&x.key==="z"?(x.preventDefault(),T()):x.ctrlKey&&x.key==="y"&&(x.preventDefault(),v())};window.addEventListener("keydown",y);const k=["pen","eraser","line","arrow","rect","circle"],C=x=>{l=x,k.forEach(E=>{const F=document.getElementById(`draw-tool-${E}`);E===x?F.className="px-2 py-1 bg-teal-950/40 border border-teal-800 text-teal-400 font-mono text-[10px] rounded font-bold uppercase":F.className="px-2 py-1 bg-slate-900 border border-slate-850 text-slate-400 font-mono text-[10px] rounded hover:text-white uppercase"})};k.forEach(x=>{document.getElementById(`draw-tool-${x}`).addEventListener("click",()=>C(x))});const V=document.getElementById("draw-brush-size"),B=document.getElementById("draw-clear-btn"),_=document.getElementById("draw-cancel-btn"),W=document.getElementById("draw-save-btn"),ae=document.getElementById("draw-color-palette"),pe=document.getElementById("draw-undo-btn"),Ie=document.getElementById("draw-redo-btn");ae.addEventListener("click",x=>{const E=x.target.closest("button");E&&(d=E.getAttribute("data-color")||"#ffffff",ae.querySelectorAll("button").forEach(F=>F.classList.replace("border-white","border-transparent")),E.classList.replace("border-transparent","border-white"))}),B.addEventListener("click",()=>{confirm("Clear the canvas drawing?")&&(n.fillStyle="#060814",n.fillRect(0,0,a,r),f.push(n.getImageData(0,0,t.width,t.height)),O.length=0)}),pe.addEventListener("click",T),Ie.addEventListener("click",v);const ue=()=>{window.removeEventListener("mouseup",Z),window.removeEventListener("touchend",Z),window.removeEventListener("keydown",y),e.classList.add("hidden")};_.addEventListener("click",ue),W.addEventListener("click",()=>{const E=`![Tactical Sketch](${t.toDataURL("image/png")})`,F=s.selectionStart,z=s.selectionEnd;s.value=s.value.substring(0,F)+E+s.value.substring(z),s.selectionStart=s.selectionEnd=F+E.length,s.dispatchEvent(new Event("input")),ue()})}async function Ci(){if(!de){alert("Unlock Required: Unlock the database using your passphrase before registering biometric lock.");return}const s=prompt("Verify Identity: Enter your current master passphrase to bind to biometric unlock:");if(!s)return;const e=await Le(s);if(!await St(e)){alert("Verification Failed: Incorrect passphrase.");return}try{const n=crypto.getRandomValues(new Uint8Array(32)),o=await navigator.credentials.create({publicKey:{challenge:n,rp:{name:"SecOps Wiki",id:window.location.hostname||"localhost"},user:{id:crypto.getRandomValues(new Uint8Array(16)),name:"operator@secops.local",displayName:"SecOps Operator"},pubKeyCredParams:[{type:"public-key",alg:-7},{type:"public-key",alg:-257}],authenticatorSelection:{authenticatorAttachment:"platform",userVerification:"required"},timeout:6e4}});if(o){const a=new Uint8Array(o.rawId),r=Array.from(a).map(g=>g.toString(16).padStart(2,"0")).join(""),i=crypto.getRandomValues(new Uint8Array(32)),l=Array.from(i).map(g=>g.toString(16).padStart(2,"0")).join("");localStorage.setItem("secops-wiki-webauthn-salt",l);const d=`${r}:${l}`,p=await Le(d),m=await st(s,p);localStorage.setItem("secops-wiki-webauthn-payload",m),localStorage.setItem("secops-wiki-webauthn-gate","true"),alert("Biometric credential successfully registered with WebAuthn platform gate."),await le("WEBAUTHN_REGISTER","Biometric credentials registered successfully."),zt(document.getElementById("main-content"))}}catch(n){alert(`Biometric registration failed: ${n.message}`),await le("WEBAUTHN_FAIL",`Biometric registration failed: ${n.message}`)}}async function Ri(){const s=localStorage.getItem("secops-wiki-webauthn-gate")==="true",e=localStorage.getItem("secops-wiki-webauthn-payload");if(!s||!e){alert("Biometric Unlock is not registered. Setup biometric credentials in settings first.");return}try{const t=crypto.getRandomValues(new Uint8Array(32)),n=await navigator.credentials.get({publicKey:{challenge:t,rpId:window.location.hostname||"localhost",userVerification:"required",timeout:6e4}});if(n){const o=new Uint8Array(n.rawId),a=Array.from(o).map(g=>g.toString(16).padStart(2,"0")).join(""),r=localStorage.getItem("secops-wiki-webauthn-salt")||"";if(!r)throw new Error("Biometric decryption salt is missing from storage.");const i=`${a}:${r}`,l=await Le(i),d=await me(e,l),p=await Le(d);await St(p)?(de=p,Zo()):alert("Biometric validation failed: Stored credentials mismatch.")}}catch(t){alert(`Biometric verification failed: ${t.message}`),await le("WEBAUTHN_FAIL",`Biometric unlock failed: ${t.message}`)}}function Di(s){const e={name:"Root",fullPath:"",children:{},pages:[]};for(const t of s)for(const n of t.tags){const o=n.split("/");let a=e,r="";for(let i=0;i<o.length;i++){const l=o[i].trim();l&&(r=r?`${r}/${l}`:l,a.children[l]||(a.children[l]={name:l,fullPath:r,children:{},pages:[]}),a=a.children[l])}a.pages.push(t)}return e}function Xo(s,e=0){let t="";const n=Object.keys(s.children).sort();for(const o of n){const a=s.children[o];if(!(Object.keys(a.children).length>0||a.pages.length>0))continue;const i=a.fullPath;t+=`
      <div class="tree-folder">
        <div class="tree-folder-header flex items-center gap-1.5 px-3 py-1 cursor-pointer hover:bg-slate-900/40 text-xs font-mono text-slate-450 select-none rounded-lg" data-path="${$(i)}" tabindex="0">
          <span class="tree-folder-icon text-[9px] transition-transform duration-200 text-slate-600" style="display: inline-block;">▶</span>
          <span>📁 ${$(a.name)}</span>
        </div>
        <div class="tree-folder-children hidden pl-3.5 space-y-0.5 animate-fade-in" data-path="${$(i)}">
          ${Xo(a,e+1)}
          ${a.pages.map(l=>{const d=Q===l.slug&&!Xe,p=l.isEncrypted&&!G&&nt,m=p?"[REDACTED CORE]":l.title;return`
              <a href="${p?"javascript:void(0)":`#/page/${l.slug}`}" ${p?`onclick="alert('SECURITY WARNING: Document is locked. Enter passphrase to decrypt cores first.');"`:""} class="flex items-center justify-between px-3 py-1 rounded-lg text-[11px] font-mono transition ${d?"bg-teal-950/20 text-teal-400 font-bold border-l border-teal-500":"text-slate-450 hover:bg-slate-900/30 hover:text-slate-200"}" tabindex="0">
                <span class="truncate flex items-center gap-1">
                  ${l.isEncrypted?"🔒":"⊙"} ${$(m)}
                </span>
              </a>
            `}).join("")}
        </div>
      </div>
    `}return t}function $i(s){s.querySelectorAll("code.language-javascript-sandbox, code.language-html-sandbox").forEach(t=>{const n=t.parentElement;if(!n||n.tagName.toLowerCase()!=="pre"||n.querySelector(".sandbox-run-btn"))return;const o=t.classList.contains("language-html-sandbox"),a=t.textContent||"",r=document.createElement("button");r.className="sandbox-run-btn absolute top-2 right-12 px-2 py-0.5 bg-teal-950/40 border border-teal-800 text-teal-400 hover:text-teal-300 font-mono text-[9px] rounded uppercase font-bold transition z-10",r.textContent="Run Sandbox",n.classList.add("relative"),n.appendChild(r);const i=document.createElement("div");i.className="sandbox-iframe-wrapper mt-2 hidden border border-slate-800 rounded-lg overflow-hidden bg-slate-950",n.after(i),r.addEventListener("click",()=>{var d;if(i.classList.toggle("hidden"))r.textContent="Run Sandbox",i.innerHTML="";else{r.textContent="Close Sandbox",i.innerHTML=`
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
          `,p.srcdoc=m,(d=i.querySelector(".sandbox-close-inner-btn"))==null||d.addEventListener("click",()=>{i.classList.add("hidden"),r.textContent="Run Sandbox",i.innerHTML=""})}})})}async function _i(s){var r;const e=window.location.hash,t=e.indexOf("?");if(t===-1){s.innerHTML='<div class="glass-panel border border-red-950 p-6 rounded-xl text-center font-mono text-xs text-red-400">P2P IMPORT ERROR: Missing decryption parameters in link.</div>';return}const n=new URLSearchParams(e.substring(t)),o=n.get("data"),a=n.get("key");if(!o||!a){s.innerHTML='<div class="glass-panel border border-red-950 p-6 rounded-xl text-center font-mono text-xs text-red-400">P2P IMPORT ERROR: Invalid parameters.</div>';return}try{const i=await Le(a),l=atob(decodeURIComponent(o)),d=await me(l,i),p=JSON.parse(d);s.innerHTML=`
      <div class="glass-panel border border-teal-905 rounded-xl p-6 space-y-6 glow-border">
        <div class="border-b border-slate-800 pb-4">
          <h2 class="text-xl font-bold font-mono text-white uppercase">Secure P2P Page Import</h2>
          <p class="text-xs text-slate-500 font-mono">Verify and import the decrypted document below into your offline storage.</p>
        </div>
        
        <div class="space-y-4">
          <div>
            <label class="block text-[10px] font-mono text-slate-500 uppercase">Document Title:</label>
            <div class="text-white font-mono text-sm font-bold mt-1">${$(p.title)}</div>
          </div>
          
          <div>
            <label class="block text-[10px] font-mono text-slate-500 uppercase">Associated Tags:</label>
            <div class="flex gap-1.5 mt-1">
              ${p.tags.map(m=>`<span class="bg-slate-900/60 text-slate-400 border border-slate-850 px-2 py-0.5 rounded text-[10px] font-mono">#${$(m)}</span>`).join("")}
            </div>
          </div>
          
          <div>
            <label class="block text-[10px] font-mono text-slate-500 uppercase">Decrypted Content Preview:</label>
            <div class="bg-slate-950/60 p-4 border border-slate-850 rounded-lg max-h-60 overflow-y-auto text-xs font-mono text-slate-350 wiki-content whitespace-pre-wrap mt-1">${$(p.content)}</div>
          </div>
        </div>
        
        <div class="flex justify-end gap-3 pt-4 border-t border-slate-800">
          <a href="#/page/home" class="px-4 py-2 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-350 font-mono text-xs uppercase rounded transition hover:text-white">Cancel</a>
          <button id="p2p-import-confirm-btn" class="px-4 py-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-mono text-xs uppercase rounded font-bold transition shadow-[0_0_10px_rgba(20,184,166,0.15)]">Import to Database</button>
        </div>
      </div>
    `,(r=document.getElementById("p2p-import-confirm-btn"))==null||r.addEventListener("click",async()=>{let m=p.title.toLowerCase().replace(/[^a-z0-9-_]+/g,"-");m||(m=`p2p-import-${Date.now()}`);let g=m,f=await He(g);if(f&&!confirm(`CONFLICT ALERT: A document with slug "${g}" already exists in your wiki database.

Click OK to overwrite the existing document.
Click Cancel to import it as a duplicate under an auto-generated title.`)){let I=1;for(;f;)g=`${m}-${I}`,f=await He(g),I++}const O={slug:g,title:p.title,content:p.content,tags:p.tags,updatedAt:Date.now()};O.signature=await Ze(O),await Me(O),await le("P2P_IMPORT_SUCCESS",`Imported decrypted page: ${p.title} (slug: ${g})`),alert("Intel Entry imported successfully."),window.location.hash=`#/page/${g}`})}catch(i){s.innerHTML=`<div class="glass-panel border border-red-950 p-6 rounded-xl text-center font-mono text-xs text-red-400">P2P DECRYPTION ERROR: ${$(i.message)}</div>`}}document.addEventListener("DOMContentLoaded",ti);async function Oi(){setInterval(async()=>{try{const s=ce;await Aa({id:Date.now().toString(),timestamp:Date.now(),data:JSON.stringify(s)}),console.log("Background backup created")}catch(s){console.error("Backup failed",s)}},24*60*60*1e3)}Oi();window.renderKnowledgeGraph=function(s){const e=document.getElementById(s);if(!e)return;const t=e.getContext("2d");t&&(t.fillStyle="#fff",t.fillText("Knowledge Graph (Mock)",10,20))};function Ni(s){let e=JSON.parse(localStorage.getItem("secops-recent-pages")||"[]");e=e.filter(t=>t!==s),e.unshift(s),e=e.slice(0,5),localStorage.setItem("secops-recent-pages",JSON.stringify(e))}function Pi(s){const e=s.replace(/[#*`_\[\]()\-+]/g," ").replace(/<[^>]*>/g," ").toLowerCase(),t=new Set(["the","a","an","and","or","but","is","are","was","were","to","for","in","on","at","by","of","with","from","this","that","these","those","it","its","they","them","their","we","us","our","you","your","i","my","me","he","him","his","she","her","has","have","had","do","does","did","as","if","then","else","when","where","how","why","who","which","what","not","no","yes","can","will","should","would","could","may","might","must","about","into","than","also","some","any","all","more","most","other","been","being"]),n=e.split(/\s+/),o={};return n.forEach(a=>{const r=a.replace(/[^a-z0-9-]/g,"");r.length>3&&!t.has(r)&&!/^\d+$/.test(r)&&(o[r]=(o[r]||0)+1)}),Object.entries(o).sort((a,r)=>r[1]-a[1]).slice(0,5).map(a=>`${a[0]} (${a[1]})`)}async function Mi(s){var t;const e=await bo();e.sort((n,o)=>o.timestamp-n.timestamp),s.innerHTML=`
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
                <td class="py-2.5 px-4 font-bold text-teal-400 whitespace-nowrap">${$(n.event)}</td>
                <td class="py-2.5 px-4 text-slate-400 break-all">${$(n.details)}</td>
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
  `,(t=document.getElementById("clear-audit-logs-btn"))==null||t.addEventListener("click",async()=>{confirm("AUDIT WARNING: This will permanently delete the forensic audit trail. Continue?")&&(await xo(),le("AUDIT_CLEAR","Forensic audit trail manually cleared"),he())})}function Bi(){var e;if(document.getElementById("shortcut-cheat-sheet-modal"))return;const s=document.createElement("div");s.id="shortcut-cheat-sheet-modal",s.className="fixed inset-0 bg-black/85 z-[100] flex items-center justify-center p-4",s.innerHTML=`
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
  `,document.body.appendChild(s),(e=s.querySelector("#close-shortcuts-modal"))==null||e.addEventListener("click",()=>s.remove()),s.addEventListener("click",t=>{t.target===s&&s.remove()})}window.addEventListener("keydown",s=>{var e,t;s.key==="?"&&((e=document.activeElement)==null?void 0:e.tagName)!=="INPUT"&&((t=document.activeElement)==null?void 0:t.tagName)!=="TEXTAREA"&&(s.preventDefault(),Bi())});
