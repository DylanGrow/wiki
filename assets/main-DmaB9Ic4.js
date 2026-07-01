var ua=Object.defineProperty;var Mo=o=>{throw TypeError(o)};var fa=(o,e,t)=>e in o?ua(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t;var le=(o,e,t)=>fa(o,typeof e!="symbol"?e+"":e,t),ma=(o,e,t)=>e.has(o)||Mo("Cannot "+t);var Bo=(o,e,t)=>e.has(o)?Mo("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(o):e.set(o,t);var Jt=(o,e,t)=>(ma(o,e,"access private method"),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function t(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(s){if(s.ep)return;s.ep=!0;const a=t(s);fetch(s.href,a)}})();if(self!==top)try{window.top&&(window.top.location.href=window.location.href)}catch{window.location.href="about:blank"}else document.documentElement.classList.remove("clickjack-lock");const ga="secops-wiki-db",Be="pages",Ue="revisions",ha=5;function be(){return new Promise((o,e)=>{const t=indexedDB.open(ga,ha);t.onerror=()=>e(t.error),t.onsuccess=()=>{const n=t.result;n.onversionchange=()=>{n.close(),alert("SECURITY NOTICE: The database schema is being updated by another active session. This connection has been closed to prevent blocking. Please reload to resume."),window.location.reload()},o(n)},t.onupgradeneeded=()=>{const n=t.result;n.objectStoreNames.contains(Be)||n.createObjectStore(Be,{keyPath:"slug"}),n.objectStoreNames.contains(Ue)||n.createObjectStore(Ue,{keyPath:"id"}).createIndex("slug","slug",{unique:!1}),n.objectStoreNames.contains("tagColors")||n.createObjectStore("tagColors",{keyPath:"tag"}),n.objectStoreNames.contains("attachments")||n.createObjectStore("attachments",{keyPath:"id"}),n.objectStoreNames.contains("auditLogs")||n.createObjectStore("auditLogs",{keyPath:"id"}),n.objectStoreNames.contains("templates")||n.createObjectStore("templates",{keyPath:"id"}),n.objectStoreNames.contains("backups")||n.createObjectStore("backups",{keyPath:"id"})}})}async function ba(o){const e=await be();return new Promise((t,n)=>{const r=e.transaction(Be,"readonly").objectStore(Be).get(o);r.onerror=()=>n(r.error),r.onsuccess=()=>t(r.result||null)})}async function dn(o){const e=await be();return new Promise((t,n)=>{const r=e.transaction(Be,"readwrite").objectStore(Be).put(o);r.onerror=()=>n(r.error),r.onsuccess=()=>t()})}async function us(o){await xa(o);const e=await be();return new Promise((t,n)=>{const r=e.transaction(Be,"readwrite").objectStore(Be).delete(o);r.onerror=()=>n(r.error),r.onsuccess=()=>t()})}async function Ht(){const o=await be();return new Promise((e,t)=>{const a=o.transaction(Be,"readonly").objectStore(Be).getAll();a.onerror=()=>t(a.error),a.onsuccess=()=>e(a.result||[])})}async function Uo(o){const e=await be();return new Promise((t,n)=>{const r=e.transaction(Ue,"readwrite").objectStore(Ue).put(o);r.onerror=()=>n(r.error),r.onsuccess=()=>t()})}async function fs(o){const e=await be();return new Promise((t,n)=>{const i=e.transaction(Ue,"readonly").objectStore(Ue).index("slug").getAll(o);i.onerror=()=>n(i.error),i.onsuccess=()=>{const l=i.result||[];l.sort((d,p)=>p.updatedAt-d.updatedAt),t(l)}})}async function xa(o){const e=await be();return new Promise((t,n)=>{const i=e.transaction(Ue,"readwrite").objectStore(Ue).index("slug").openCursor(o);i.onerror=()=>n(i.error),i.onsuccess=()=>{const l=i.result;l?(l.delete(),l.continue()):t()}})}async function ya(o){const e=await be();return new Promise((t,n)=>{const r=e.transaction(Ue,"readwrite").objectStore(Ue).delete(o);r.onerror=()=>n(r.error),r.onsuccess=()=>t()})}const wa=[{slug:"home",title:"Operations Dashboard",content:`# Secure Operations Center (SOC) Wiki

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
* Raw input strings are escaped to prevent Cross-Site Scripting (XSS).`,updatedAt:Date.now(),tags:["security","hardening"],isSystem:!0}];async function so(){if((await Ht()).length===0)for(const e of wa)await dn(e)}async function ms(){const o=await be();return new Promise((e,t)=>{const n=[Be,Ue,"tagColors","attachments","auditLogs"],s=o.transaction(n,"readwrite"),a=s.objectStore(Be),r=s.objectStore(Ue),i=s.objectStore("tagColors"),l=s.objectStore("attachments"),d=s.objectStore("auditLogs");a.clear(),r.clear(),i.clear(),l.clear(),d.clear(),s.oncomplete=()=>e(),s.onerror=()=>t(s.error)})}async function gs(){const o=await be();return new Promise((e,t)=>{try{const a=o.transaction("tagColors","readonly").objectStore("tagColors").getAll();a.onerror=()=>t(a.error),a.onsuccess=()=>e(a.result||[])}catch{e([])}})}async function va(o){const e=await be();return new Promise((t,n)=>{const r=e.transaction("tagColors","readwrite").objectStore("tagColors").put(o);r.onerror=()=>n(r.error),r.onsuccess=()=>t()})}async function Ea(o){const e=await be();return new Promise((t,n)=>{const r=e.transaction("attachments","readwrite").objectStore("attachments").put(o);r.onerror=()=>n(r.error),r.onsuccess=()=>t()})}async function zo(o){const e=await be();return new Promise((t,n)=>{try{const r=e.transaction("attachments","readonly").objectStore("attachments").get(o);r.onerror=()=>n(r.error),r.onsuccess=()=>t(r.result||null)}catch{t(null)}})}async function ka(){const o=await be();return new Promise((e,t)=>{try{const a=o.transaction("attachments","readonly").objectStore("attachments").getAll();a.onerror=()=>t(a.error),a.onsuccess=()=>e(a.result||[])}catch{e([])}})}async function Sa(o){const e=await be();return new Promise((t,n)=>{try{const r=e.transaction("auditLogs","readwrite").objectStore("auditLogs").put(o);r.onerror=()=>n(r.error),r.onsuccess=()=>t()}catch(s){console.error("Audit logging transaction failed:",s),t()}})}async function Ta(){const o=await be();return new Promise((e,t)=>{try{const a=o.transaction("auditLogs","readonly").objectStore("auditLogs").getAll();a.onerror=()=>t(a.error),a.onsuccess=()=>{const r=a.result||[];r.sort((i,l)=>l.timestamp-i.timestamp),e(r)}}catch{e([])}})}async function Aa(){const o=await be();return new Promise((e,t)=>{const a=o.transaction("auditLogs","readwrite").objectStore("auditLogs").clear();a.onerror=()=>t(a.error),a.onsuccess=()=>e()})}async function hs(o){const e=await be(),t=Date.now()-o*24*60*60*1e3;return new Promise((n,s)=>{try{const i=e.transaction("auditLogs","readwrite").objectStore("auditLogs").openCursor();i.onerror=()=>s(i.error),i.onsuccess=()=>{const l=i.result;l?(l.value.timestamp<t&&l.delete(),l.continue()):n()}}catch(a){s(a)}})}async function Ia(o){const e=await be();return new Promise((t,n)=>{const r=e.transaction("backups","readwrite").objectStore("backups").put(o);r.onerror=()=>n(r.error),r.onsuccess=()=>t()})}/*! @license DOMPurify 3.4.11 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.4.11/LICENSE */function jo(o,e){(e==null||e>o.length)&&(e=o.length);for(var t=0,n=Array(e);t<e;t++)n[t]=o[t];return n}function La(o){if(Array.isArray(o))return o}function Ca(o,e){var t=o==null?null:typeof Symbol<"u"&&o[Symbol.iterator]||o["@@iterator"];if(t!=null){var n,s,a,r,i=[],l=!0,d=!1;try{if(a=(t=t.call(o)).next,e!==0)for(;!(l=(n=a.call(t)).done)&&(i.push(n.value),i.length!==e);l=!0);}catch(p){d=!0,s=p}finally{try{if(!l&&t.return!=null&&(r=t.return(),Object(r)!==r))return}finally{if(d)throw s}}return i}}function Ra(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Da(o,e){return La(o)||Ca(o,e)||$a(o,e)||Ra()}function $a(o,e){if(o){if(typeof o=="string")return jo(o,e);var t={}.toString.call(o).slice(8,-1);return t==="Object"&&o.constructor&&(t=o.constructor.name),t==="Map"||t==="Set"?Array.from(o):t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?jo(o,e):void 0}}const bs=Object.entries,Ho=Object.setPrototypeOf,_a=Object.isFrozen,Oa=Object.getPrototypeOf,Na=Object.getOwnPropertyDescriptor;let Te=Object.freeze,Ae=Object.seal,xt=Object.create,xs=typeof Reflect<"u"&&Reflect,Yn=xs.apply,Zn=xs.construct;Te||(Te=function(e){return e});Ae||(Ae=function(e){return e});Yn||(Yn=function(e,t){for(var n=arguments.length,s=new Array(n>2?n-2:0),a=2;a<n;a++)s[a-2]=arguments[a];return e.apply(t,s)});Zn||(Zn=function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),s=1;s<t;s++)n[s-1]=arguments[s];return new e(...n)});const Rt=he(Array.prototype.forEach),Pa=he(Array.prototype.lastIndexOf),Fo=he(Array.prototype.pop),bt=he(Array.prototype.push),Ma=he(Array.prototype.splice),tt=Array.isArray,Nt=he(String.prototype.toLowerCase),Nn=he(String.prototype.toString),Wo=he(String.prototype.match),Dt=he(String.prototype.replace),qo=he(String.prototype.indexOf),Ba=he(String.prototype.trim),Ua=he(Number.prototype.toString),za=he(Boolean.prototype.toString),Go=typeof BigInt>"u"?null:he(BigInt.prototype.toString),Vo=typeof Symbol>"u"?null:he(Symbol.prototype.toString),we=he(Object.prototype.hasOwnProperty),$t=he(Object.prototype.toString),Se=he(RegExp.prototype.test),rt=ja(TypeError);function he(o){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var t=arguments.length,n=new Array(t>1?t-1:0),s=1;s<t;s++)n[s-1]=arguments[s];return Yn(o,e,n)}}function ja(o){return function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return Zn(o,t)}}function J(o,e){let t=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Nt;if(Ho&&Ho(o,null),!tt(e))return o;let n=e.length;for(;n--;){let s=e[n];if(typeof s=="string"){const a=t(s);a!==s&&(_a(e)||(e[n]=a),s=a)}o[s]=!0}return o}function Ha(o){for(let e=0;e<o.length;e++)we(o,e)||(o[e]=null);return o}function De(o){const e=xt(null);for(const n of bs(o)){var t=Da(n,2);const s=t[0],a=t[1];we(o,s)&&(tt(a)?e[s]=Ha(a):a&&typeof a=="object"&&a.constructor===Object?e[s]=De(a):e[s]=a)}return e}function Fa(o){switch(typeof o){case"string":return o;case"number":return Ua(o);case"boolean":return za(o);case"bigint":return Go?Go(o):"0";case"symbol":return Vo?Vo(o):"Symbol()";case"undefined":return $t(o);case"function":case"object":{if(o===null)return $t(o);const e=o,t=Ge(e,"toString");if(typeof t=="function"){const n=t(e);return typeof n=="string"?n:$t(n)}return $t(o)}default:return $t(o)}}function Ge(o,e){for(;o!==null;){const n=Na(o,e);if(n){if(n.get)return he(n.get);if(typeof n.value=="function")return he(n.value)}o=Oa(o)}function t(){return null}return t}function Wa(o){try{return Se(o,""),!0}catch{return!1}}const Ko=Te(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Pn=Te(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Mn=Te(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),qa=Te(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Bn=Te(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Ga=Te(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Yo=Te(["#text"]),Zo=Te(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","command","commandfor","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns"]),Un=Te(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Xo=Te(["accent","accentunder","align","bevelled","close","columnalign","columnlines","columnspacing","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lquote","lspace","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Qt=Te(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Va=Ae(/{{[\w\W]*|^[\w\W]*}}/g),Ka=Ae(/<%[\w\W]*|^[\w\W]*%>/g),Ya=Ae(/\${[\w\W]*/g),Za=Ae(/^data-[\-\w.\u00B7-\uFFFF]+$/),Xa=Ae(/^aria-[\-\w]+$/),Jo=Ae(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Ja=Ae(/^(?:\w+script|data):/i),Qa=Ae(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),er=Ae(/^html$/i),tr=Ae(/^[a-z][.\w]*(-[.\w]+)+$/i),Qo=Ae(/<[/\w!]/g),nr=Ae(/<[/\w]/g),or=Ae(/<\/no(script|embed|frames)/i),sr=Ae(/\/>/i),qe={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,processingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},ar=function(){return typeof window>"u"?null:window},rr=function(e,t){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let n=null;const s="data-tt-policy-suffix";t&&t.hasAttribute(s)&&(n=t.getAttribute(s));const a="dompurify"+(n?"#"+n:"");try{return e.createPolicy(a,{createHTML(r){return r},createScriptURL(r){return r}})}catch{return console.warn("TrustedTypes policy "+a+" could not be created."),null}},es=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}},et=function(e,t,n,s){return we(e,t)&&tt(e[t])?J(s.base?De(s.base):{},e[t],s.transform):n};function ys(){let o=arguments.length>0&&arguments[0]!==void 0?arguments[0]:ar();const e=k=>ys(k);if(e.version="3.4.11",e.removed=[],!o||!o.document||o.document.nodeType!==qe.document||!o.Element)return e.isSupported=!1,e;let t=o.document;const n=t,s=n.currentScript;o.DocumentFragment;const a=o.HTMLTemplateElement,r=o.Node,i=o.Element,l=o.NodeFilter,d=o.NamedNodeMap;d===void 0&&(o.NamedNodeMap||o.MozNamedAttrMap),o.HTMLFormElement;const p=o.DOMParser,g=o.trustedTypes,m=i.prototype,u=Ge(m,"cloneNode"),b=Ge(m,"remove"),z=Ge(m,"nextSibling"),x=Ge(m,"childNodes"),O=Ge(m,"parentNode"),Z=Ge(m,"shadowRoot"),V=Ge(m,"attributes"),L=r&&r.prototype?Ge(r.prototype,"nodeType"):null,y=r&&r.prototype?Ge(r.prototype,"nodeName"):null;if(typeof a=="function"){const k=t.createElement("template");k.content&&k.content.ownerDocument&&(t=k.content.ownerDocument)}let S,A="",K,j=!1,U=0;const te=function(){if(U>0)throw rt('A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted Types" section of the README.')},ie=function(c){te(),U++;try{return S.createHTML(c)}finally{U--}},ue=function(c){te(),U++;try{return S.createScriptURL(c)}finally{U--}},N=function(){return j||(K=rr(g,s),j=!0),K},F=t,I=F.implementation,v=F.createNodeIterator,H=F.createDocumentFragment,Q=F.getElementsByTagName,w=n.importNode;let C=es();e.isSupported=typeof bs=="function"&&typeof O=="function"&&I&&I.createHTMLDocument!==void 0;const _=Va,M=Ka,B=Ya,h=Za,D=Xa,T=Ja,$=Qa,W=tr;let ne=Jo,q=null;const Ee=J({},[...Ko,...Pn,...Mn,...Bn,...Yo]);let X=null;const ke=J({},[...Zo,...Un,...Xo,...Qt]);let ae=Object.seal(xt(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Ce=null,xe=null;const $e=Object.seal(xt(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let Tt=!0,At=!0,bo=!1,xo=!0,Je=!1,It=!0,st=!1,yn=!1,wn=null,vn=null,En=!1,ut=!1,qt=!1,Gt=!1,yo=!0,wo=!1;const vo="user-content-";let kn=!0,Sn=!1,ft={},Fe=null;const Tn=J({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","selectedcontent","style","svg","template","thead","title","video","xmp"]);let Eo=null;const ko=J({},["audio","video","img","source","image","track"]);let An=null;const So=J({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Vt="http://www.w3.org/1998/Math/MathML",Kt="http://www.w3.org/2000/svg",We="http://www.w3.org/1999/xhtml";let mt=We,In=!1,Ln=null;const Zs=J({},[Vt,Kt,We],Nn),To=Te(["mi","mo","mn","ms","mtext"]);let Cn=J({},To);const Ao=Te(["annotation-xml"]);let Rn=J({},Ao);const Xs=J({},["title","style","font","a","script"]);let Lt=null;const Js=["application/xhtml+xml","text/html"],Qs="text/html";let ce=null,gt=null;const ea=t.createElement("form"),Io=function(c){return c instanceof RegExp||c instanceof Function},Dn=function(){let c=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(gt&&gt===c)return;(!c||typeof c!="object")&&(c={}),c=De(c),Lt=Js.indexOf(c.PARSER_MEDIA_TYPE)===-1?Qs:c.PARSER_MEDIA_TYPE,ce=Lt==="application/xhtml+xml"?Nn:Nt,q=et(c,"ALLOWED_TAGS",Ee,{transform:ce}),X=et(c,"ALLOWED_ATTR",ke,{transform:ce}),Ln=et(c,"ALLOWED_NAMESPACES",Zs,{transform:Nn}),An=et(c,"ADD_URI_SAFE_ATTR",So,{transform:ce,base:So}),Eo=et(c,"ADD_DATA_URI_TAGS",ko,{transform:ce,base:ko}),Fe=et(c,"FORBID_CONTENTS",Tn,{transform:ce}),Ce=et(c,"FORBID_TAGS",De({}),{transform:ce}),xe=et(c,"FORBID_ATTR",De({}),{transform:ce}),ft=we(c,"USE_PROFILES")?c.USE_PROFILES&&typeof c.USE_PROFILES=="object"?De(c.USE_PROFILES):c.USE_PROFILES:!1,Tt=c.ALLOW_ARIA_ATTR!==!1,At=c.ALLOW_DATA_ATTR!==!1,bo=c.ALLOW_UNKNOWN_PROTOCOLS||!1,xo=c.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Je=c.SAFE_FOR_TEMPLATES||!1,It=c.SAFE_FOR_XML!==!1,st=c.WHOLE_DOCUMENT||!1,ut=c.RETURN_DOM||!1,qt=c.RETURN_DOM_FRAGMENT||!1,Gt=c.RETURN_TRUSTED_TYPE||!1,En=c.FORCE_BODY||!1,yo=c.SANITIZE_DOM!==!1,wo=c.SANITIZE_NAMED_PROPS||!1,kn=c.KEEP_CONTENT!==!1,Sn=c.IN_PLACE||!1,ne=Wa(c.ALLOWED_URI_REGEXP)?c.ALLOWED_URI_REGEXP:Jo,mt=typeof c.NAMESPACE=="string"?c.NAMESPACE:We,Cn=we(c,"MATHML_TEXT_INTEGRATION_POINTS")&&c.MATHML_TEXT_INTEGRATION_POINTS&&typeof c.MATHML_TEXT_INTEGRATION_POINTS=="object"?De(c.MATHML_TEXT_INTEGRATION_POINTS):J({},To),Rn=we(c,"HTML_INTEGRATION_POINTS")&&c.HTML_INTEGRATION_POINTS&&typeof c.HTML_INTEGRATION_POINTS=="object"?De(c.HTML_INTEGRATION_POINTS):J({},Ao);const f=we(c,"CUSTOM_ELEMENT_HANDLING")&&c.CUSTOM_ELEMENT_HANDLING&&typeof c.CUSTOM_ELEMENT_HANDLING=="object"?De(c.CUSTOM_ELEMENT_HANDLING):xt(null);if(ae=xt(null),we(f,"tagNameCheck")&&Io(f.tagNameCheck)&&(ae.tagNameCheck=f.tagNameCheck),we(f,"attributeNameCheck")&&Io(f.attributeNameCheck)&&(ae.attributeNameCheck=f.attributeNameCheck),we(f,"allowCustomizedBuiltInElements")&&typeof f.allowCustomizedBuiltInElements=="boolean"&&(ae.allowCustomizedBuiltInElements=f.allowCustomizedBuiltInElements),Ae(ae),Je&&(At=!1),qt&&(ut=!0),ft&&(q=J({},Yo),X=xt(null),ft.html===!0&&(J(q,Ko),J(X,Zo)),ft.svg===!0&&(J(q,Pn),J(X,Un),J(X,Qt)),ft.svgFilters===!0&&(J(q,Mn),J(X,Un),J(X,Qt)),ft.mathMl===!0&&(J(q,Bn),J(X,Xo),J(X,Qt))),$e.tagCheck=null,$e.attributeCheck=null,we(c,"ADD_TAGS")&&(typeof c.ADD_TAGS=="function"?$e.tagCheck=c.ADD_TAGS:tt(c.ADD_TAGS)&&(q===Ee&&(q=De(q)),J(q,c.ADD_TAGS,ce))),we(c,"ADD_ATTR")&&(typeof c.ADD_ATTR=="function"?$e.attributeCheck=c.ADD_ATTR:tt(c.ADD_ATTR)&&(X===ke&&(X=De(X)),J(X,c.ADD_ATTR,ce))),we(c,"ADD_URI_SAFE_ATTR")&&tt(c.ADD_URI_SAFE_ATTR)&&J(An,c.ADD_URI_SAFE_ATTR,ce),we(c,"FORBID_CONTENTS")&&tt(c.FORBID_CONTENTS)&&(Fe===Tn&&(Fe=De(Fe)),J(Fe,c.FORBID_CONTENTS,ce)),we(c,"ADD_FORBID_CONTENTS")&&tt(c.ADD_FORBID_CONTENTS)&&(Fe===Tn&&(Fe=De(Fe)),J(Fe,c.ADD_FORBID_CONTENTS,ce)),kn&&(q["#text"]=!0),st&&J(q,["html","head","body"]),q.table&&(J(q,["tbody"]),delete Ce.tbody),c.TRUSTED_TYPES_POLICY){if(typeof c.TRUSTED_TYPES_POLICY.createHTML!="function")throw rt('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof c.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw rt('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');const E=S;S=c.TRUSTED_TYPES_POLICY;try{A=ie("")}catch(P){throw S=E,P}}else c.TRUSTED_TYPES_POLICY===null?(S=void 0,A=""):(S===void 0&&(S=N()),S&&typeof A=="string"&&(A=ie("")));Te&&Te(c),gt=c},Lo=J({},[...Pn,...Mn,...qa]),Co=J({},[...Bn,...Ga]),ta=function(c,f,E){return f.namespaceURI===We?c==="svg":f.namespaceURI===Vt?c==="svg"&&(E==="annotation-xml"||Cn[E]):!!Lo[c]},na=function(c,f,E){return f.namespaceURI===We?c==="math":f.namespaceURI===Kt?c==="math"&&Rn[E]:!!Co[c]},oa=function(c,f,E){return f.namespaceURI===Kt&&!Rn[E]||f.namespaceURI===Vt&&!Cn[E]?!1:!Co[c]&&(Xs[c]||!Lo[c])},sa=function(c){let f=O(c);(!f||!f.tagName)&&(f={namespaceURI:mt,tagName:"template"});const E=Nt(c.tagName),P=Nt(f.tagName);return Ln[c.namespaceURI]?c.namespaceURI===Kt?ta(E,f,P):c.namespaceURI===Vt?na(E,f,P):c.namespaceURI===We?oa(E,f,P):!!(Lt==="application/xhtml+xml"&&Ln[c.namespaceURI]):!1},Qe=function(c){bt(e.removed,{element:c});try{O(c).removeChild(c)}catch{if(b(c),!O(c))throw rt("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place")}},Ro=function(c){const f=x(c);if(f){const P=[];Rt(f,Y=>{bt(P,Y)}),Rt(P,Y=>{try{b(Y)}catch{}})}const E=V(c);if(E)for(let P=E.length-1;P>=0;--P){const Y=E[P],ee=Y&&Y.name;if(typeof ee=="string")try{c.removeAttribute(ee)}catch{}}},at=function(c,f){try{bt(e.removed,{attribute:f.getAttributeNode(c),from:f})}catch{bt(e.removed,{attribute:null,from:f})}if(f.removeAttribute(c),c==="is")if(ut||qt)try{Qe(f)}catch{}else try{f.setAttribute(c,"")}catch{}},aa=function(c){const f=V(c);if(f)for(let E=f.length-1;E>=0;--E){const P=f[E],Y=P&&P.name;if(!(typeof Y!="string"||X[ce(Y)]))try{c.removeAttribute(Y)}catch{}}},ra=function(c){const f=[c];for(;f.length>0;){const E=f.pop();(L?L(E):E.nodeType)===qe.element&&aa(E);const Y=x(E);if(Y)for(let ee=Y.length-1;ee>=0;--ee)f.push(Y[ee])}},Do=function(c){let f=null,E=null;if(En)c="<remove></remove>"+c;else{const ee=Wo(c,/^[\r\n\t ]+/);E=ee&&ee[0]}Lt==="application/xhtml+xml"&&mt===We&&(c='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+c+"</body></html>");const P=S?ie(c):c;if(mt===We)try{f=new p().parseFromString(P,Lt)}catch{}if(!f||!f.documentElement){f=I.createDocument(mt,"template",null);try{f.documentElement.innerHTML=In?A:P}catch{}}const Y=f.body||f.documentElement;return c&&E&&Y.insertBefore(t.createTextNode(E),Y.childNodes[0]||null),mt===We?Q.call(f,st?"html":"body")[0]:st?f.documentElement:Y},$o=function(c){return v.call(c.ownerDocument||c,c,l.SHOW_ELEMENT|l.SHOW_COMMENT|l.SHOW_TEXT|l.SHOW_PROCESSING_INSTRUCTION|l.SHOW_CDATA_SECTION,null)},Yt=function(c){return c=Dt(c,_," "),c=Dt(c,M," "),c=Dt(c,B," "),c},$n=function(c){var f;c.normalize();const E=v.call(c.ownerDocument||c,c,l.SHOW_TEXT|l.SHOW_COMMENT|l.SHOW_CDATA_SECTION|l.SHOW_PROCESSING_INSTRUCTION,null);let P=E.nextNode();for(;P;)P.data=Yt(P.data),P=E.nextNode();const Y=(f=c.querySelectorAll)===null||f===void 0?void 0:f.call(c,"template");Y&&Rt(Y,ee=>{ht(ee.content)&&$n(ee.content)})},Zt=function(c){const f=y?y(c):null;return typeof f!="string"||ce(f)!=="form"?!1:typeof c.nodeName!="string"||typeof c.textContent!="string"||typeof c.removeChild!="function"||c.attributes!==V(c)||typeof c.removeAttribute!="function"||typeof c.setAttribute!="function"||typeof c.namespaceURI!="string"||typeof c.insertBefore!="function"||typeof c.hasChildNodes!="function"||c.nodeType!==L(c)||c.childNodes!==x(c)},ht=function(c){if(!L||typeof c!="object"||c===null)return!1;try{return L(c)===qe.documentFragment}catch{return!1}},Ct=function(c){if(!L||typeof c!="object"||c===null)return!1;try{return typeof L(c)=="number"}catch{return!1}};function Ye(k,c,f){k.length!==0&&Rt(k,E=>{E.call(e,c,f,gt)})}const ia=function(c,f){return!!(It&&c.hasChildNodes()&&!Ct(c.firstElementChild)&&Se(Qo,c.textContent)&&Se(Qo,c.innerHTML)||It&&c.namespaceURI===We&&f==="style"&&Ct(c.firstElementChild)||c.nodeType===qe.processingInstruction||It&&c.nodeType===qe.comment&&Se(nr,c.data))},la=function(c,f){if(!Ce[f]&&No(f)&&(ae.tagNameCheck instanceof RegExp&&Se(ae.tagNameCheck,f)||ae.tagNameCheck instanceof Function&&ae.tagNameCheck(f)))return!1;if(kn&&!Fe[f]){const E=O(c),P=x(c);if(P&&E){const Y=P.length;for(let ee=Y-1;ee>=0;--ee){const ye=Sn?P[ee]:u(P[ee],!0);E.insertBefore(ye,z(c))}}}return Qe(c),!0},_o=function(c){if(Ye(C.beforeSanitizeElements,c,null),Zt(c))return Qe(c),!0;const f=ce(y?y(c):c.nodeName);if(Ye(C.uponSanitizeElement,c,{tagName:f,allowedTags:q}),ia(c,f))return Qe(c),!0;if(Ce[f]||!($e.tagCheck instanceof Function&&$e.tagCheck(f))&&!q[f])return la(c,f);if((L?L(c):c.nodeType)===qe.element&&!sa(c)||(f==="noscript"||f==="noembed"||f==="noframes")&&Se(or,c.innerHTML))return Qe(c),!0;if(Je&&c.nodeType===qe.text){const P=Yt(c.textContent);c.textContent!==P&&(bt(e.removed,{element:c.cloneNode()}),c.textContent=P)}return Ye(C.afterSanitizeElements,c,null),!1},Oo=function(c,f,E){if(xe[f]||yo&&(f==="id"||f==="name")&&(E in t||E in ea))return!1;const P=X[f]||$e.attributeCheck instanceof Function&&$e.attributeCheck(f,c);if(!(At&&Se(h,f))){if(!(Tt&&Se(D,f))){if(P){if(!An[f]){if(!Se(ne,Dt(E,$,""))){if(!((f==="src"||f==="xlink:href"||f==="href")&&c!=="script"&&qo(E,"data:")===0&&Eo[c])){if(!(bo&&!Se(T,Dt(E,$,"")))){if(E)return!1}}}}}else if(!(No(c)&&(ae.tagNameCheck instanceof RegExp&&Se(ae.tagNameCheck,c)||ae.tagNameCheck instanceof Function&&ae.tagNameCheck(c))&&(ae.attributeNameCheck instanceof RegExp&&Se(ae.attributeNameCheck,f)||ae.attributeNameCheck instanceof Function&&ae.attributeNameCheck(f,c))||f==="is"&&ae.allowCustomizedBuiltInElements&&(ae.tagNameCheck instanceof RegExp&&Se(ae.tagNameCheck,E)||ae.tagNameCheck instanceof Function&&ae.tagNameCheck(E))))return!1}}return!0},ca=J({},["annotation-xml","color-profile","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","missing-glyph"]),No=function(c){return!ca[Nt(c)]&&Se(W,c)},da=function(c,f,E,P){if(S&&typeof g=="object"&&typeof g.getAttributeType=="function"&&!E)switch(g.getAttributeType(c,f)){case"TrustedHTML":return ie(P);case"TrustedScriptURL":return ue(P)}return P},pa=function(c,f,E,P){try{E?c.setAttributeNS(E,f,P):c.setAttribute(f,P),Zt(c)?Qe(c):Fo(e.removed)}catch{at(f,c)}},Po=function(c){Ye(C.beforeSanitizeAttributes,c,null);const f=c.attributes;if(!f||Zt(c))return;const E={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:X,forceKeepAttr:void 0};let P=f.length;const Y=ce(c.nodeName);for(;P--;){const ee=f[P],ye=ee.name,fe=ee.namespaceURI,Oe=ee.value,ze=ce(ye),On=Oe;let Re=ye==="value"?On:Ba(On);if(E.attrName=ze,E.attrValue=Re,E.keepAttr=!0,E.forceKeepAttr=void 0,Ye(C.uponSanitizeAttribute,c,E),Re=E.attrValue,wo&&(ze==="id"||ze==="name")&&qo(Re,vo)!==0&&(at(ye,c),Re=vo+Re),It&&Se(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i,Re)){at(ye,c);continue}if(ze==="attributename"&&Wo(Re,"href")){at(ye,c);continue}if(!E.forceKeepAttr){if(!E.keepAttr){at(ye,c);continue}if(!xo&&Se(sr,Re)){at(ye,c);continue}if(Je&&(Re=Yt(Re)),!Oo(Y,ze,Re)){at(ye,c);continue}Re=da(Y,ze,fe,Re),Re!==On&&pa(c,ye,fe,Re)}}Ye(C.afterSanitizeAttributes,c,null)},Xt=function(c){let f=null;const E=$o(c);for(Ye(C.beforeSanitizeShadowDOM,c,null);f=E.nextNode();)if(Ye(C.uponSanitizeShadowNode,f,null),_o(f),Po(f),ht(f.content)&&Xt(f.content),(L?L(f):f.nodeType)===qe.element){const Y=Z(f);ht(Y)&&(_n(Y),Xt(Y))}Ye(C.afterSanitizeShadowDOM,c,null)},_n=function(c){const f=[{node:c,shadow:null}];for(;f.length>0;){const E=f.pop();if(E.shadow){Xt(E.shadow);continue}const P=E.node,ee=(L?L(P):P.nodeType)===qe.element,ye=x(P);if(ye)for(let fe=ye.length-1;fe>=0;--fe)f.push({node:ye[fe],shadow:null});if(ee){const fe=y?y(P):null;if(typeof fe=="string"&&ce(fe)==="template"){const Oe=P.content;ht(Oe)&&f.push({node:Oe,shadow:null})}}if(ee){const fe=Z(P);ht(fe)&&f.push({node:null,shadow:fe},{node:fe,shadow:null})}}};return e.sanitize=function(k){let c=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},f=null,E=null,P=null,Y=null;if(In=!k,In&&(k="<!-->"),typeof k!="string"&&!Ct(k)&&(k=Fa(k),typeof k!="string"))throw rt("dirty is not a string, aborting");if(!e.isSupported)return k;yn?(q=wn,X=vn):Dn(c),(C.uponSanitizeElement.length>0||C.uponSanitizeAttribute.length>0)&&(q=De(q)),C.uponSanitizeAttribute.length>0&&(X=De(X)),e.removed=[];const ee=Sn&&typeof k!="string"&&Ct(k);if(ee){const Oe=y?y(k):k.nodeName;if(typeof Oe=="string"){const ze=ce(Oe);if(!q[ze]||Ce[ze])throw rt("root node is forbidden and cannot be sanitized in-place")}if(Zt(k))throw rt("root node is clobbered and cannot be sanitized in-place");try{_n(k)}catch(ze){throw Ro(k),ze}}else if(Ct(k))f=Do("<!---->"),E=f.ownerDocument.importNode(k,!0),E.nodeType===qe.element&&E.nodeName==="BODY"||E.nodeName==="HTML"?f=E:f.appendChild(E),_n(E);else{if(!ut&&!Je&&!st&&k.indexOf("<")===-1)return S&&Gt?ie(k):k;if(f=Do(k),!f)return ut?null:Gt?A:""}f&&En&&Qe(f.firstChild);const ye=$o(ee?k:f);try{for(;P=ye.nextNode();)_o(P),Po(P),ht(P.content)&&Xt(P.content)}catch(Oe){throw ee&&Ro(k),Oe}if(ee)return Rt(e.removed,Oe=>{Oe.element&&ra(Oe.element)}),Je&&$n(k),k;if(ut){if(Je&&$n(f),qt)for(Y=H.call(f.ownerDocument);f.firstChild;)Y.appendChild(f.firstChild);else Y=f;return(X.shadowroot||X.shadowrootmode)&&(Y=w.call(n,Y,!0)),Y}let fe=st?f.outerHTML:f.innerHTML;return st&&q["!doctype"]&&f.ownerDocument&&f.ownerDocument.doctype&&f.ownerDocument.doctype.name&&Se(er,f.ownerDocument.doctype.name)&&(fe="<!DOCTYPE "+f.ownerDocument.doctype.name+`>
`+fe),Je&&(fe=Yt(fe)),S&&Gt?ie(fe):fe},e.setConfig=function(){let k=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Dn(k),yn=!0,wn=q,vn=X},e.clearConfig=function(){gt=null,yn=!1,wn=null,vn=null,S=K,A=""},e.isValidAttribute=function(k,c,f){gt||Dn({});const E=ce(k),P=ce(c);return Oo(E,P,f)},e.addHook=function(k,c){typeof c=="function"&&we(C,k)&&bt(C[k],c)},e.removeHook=function(k,c){if(we(C,k)){if(c!==void 0){const f=Pa(C[k],c);return f===-1?void 0:Ma(C[k],f,1)[0]}return Fo(C[k])}},e.removeHooks=function(k){we(C,k)&&(C[k]=[])},e.removeAllHooks=function(){C=es()},e}var Mt=ys();function ao(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}let dt=ao();function ws(o){dt=o}const vs=/[&<>"']/,ir=new RegExp(vs.source,"g"),Es=/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,lr=new RegExp(Es.source,"g"),cr={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},ts=o=>cr[o];function _e(o,e){if(e){if(vs.test(o))return o.replace(ir,ts)}else if(Es.test(o))return o.replace(lr,ts);return o}const dr=/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;function pr(o){return o.replace(dr,(e,t)=>(t=t.toLowerCase(),t==="colon"?":":t.charAt(0)==="#"?t.charAt(1)==="x"?String.fromCharCode(parseInt(t.substring(2),16)):String.fromCharCode(+t.substring(1)):""))}const ur=/(^|[^\[])\^/g;function re(o,e){let t=typeof o=="string"?o:o.source;e=e||"";const n={replace:(s,a)=>{let r=typeof a=="string"?a:a.source;return r=r.replace(ur,"$1"),t=t.replace(s,r),n},getRegex:()=>new RegExp(t,e)};return n}function ns(o){try{o=encodeURI(o).replace(/%25/g,"%")}catch{return null}return o}const Bt={exec:()=>null};function os(o,e){const t=o.replace(/\|/g,(a,r,i)=>{let l=!1,d=r;for(;--d>=0&&i[d]==="\\";)l=!l;return l?"|":" |"}),n=t.split(/ \|/);let s=0;if(n[0].trim()||n.shift(),n.length>0&&!n[n.length-1].trim()&&n.pop(),e)if(n.length>e)n.splice(e);else for(;n.length<e;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(/\\\|/g,"|");return n}function en(o,e,t){const n=o.length;if(n===0)return"";let s=0;for(;s<n&&o.charAt(n-s-1)===e;)s++;return o.slice(0,n-s)}function fr(o,e){if(o.indexOf(e[1])===-1)return-1;let t=0;for(let n=0;n<o.length;n++)if(o[n]==="\\")n++;else if(o[n]===e[0])t++;else if(o[n]===e[1]&&(t--,t<0))return n;return-1}function ss(o,e,t,n){const s=e.href,a=e.title?_e(e.title):null,r=o[1].replace(/\\([\[\]])/g,"$1");if(o[0].charAt(0)!=="!"){n.state.inLink=!0;const i={type:"link",raw:t,href:s,title:a,text:r,tokens:n.inlineTokens(r)};return n.state.inLink=!1,i}return{type:"image",raw:t,href:s,title:a,text:_e(r)}}function mr(o,e){const t=o.match(/^(\s+)(?:```)/);if(t===null)return e;const n=t[1];return e.split(`
`).map(s=>{const a=s.match(/^\s+/);if(a===null)return s;const[r]=a;return r.length>=n.length?s.slice(n.length):s}).join(`
`)}class pn{constructor(e){le(this,"options");le(this,"rules");le(this,"lexer");this.options=e||dt}space(e){const t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){const t=this.rules.block.code.exec(e);if(t){const n=t[0].replace(/^ {1,4}/gm,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:en(n,`
`)}}}fences(e){const t=this.rules.block.fences.exec(e);if(t){const n=t[0],s=mr(n,t[3]||"");return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:s}}}heading(e){const t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(/#$/.test(n)){const s=en(n,"#");(this.options.pedantic||!s||/ $/.test(s))&&(n=s.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){const t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:t[0]}}blockquote(e){const t=this.rules.block.blockquote.exec(e);if(t){let n=t[0].replace(/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,`
    $1`);n=en(n.replace(/^ *>[ \t]?/gm,""),`
`);const s=this.lexer.state.top;this.lexer.state.top=!0;const a=this.lexer.blockTokens(n);return this.lexer.state.top=s,{type:"blockquote",raw:t[0],tokens:a,text:n}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim();const s=n.length>1,a={type:"list",raw:"",ordered:s,start:s?+n.slice(0,-1):"",loose:!1,items:[]};n=s?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=s?n:"[*+-]");const r=new RegExp(`^( {0,3}${n})((?:[	 ][^\\n]*)?(?:\\n|$))`);let i="",l="",d=!1;for(;e;){let p=!1;if(!(t=r.exec(e))||this.rules.block.hr.test(e))break;i=t[0],e=e.substring(i.length);let g=t[2].split(`
`,1)[0].replace(/^\t+/,O=>" ".repeat(3*O.length)),m=e.split(`
`,1)[0],u=0;this.options.pedantic?(u=2,l=g.trimStart()):(u=t[2].search(/[^ ]/),u=u>4?1:u,l=g.slice(u),u+=t[1].length);let b=!1;if(!g&&/^ *$/.test(m)&&(i+=m+`
`,e=e.substring(m.length+1),p=!0),!p){const O=new RegExp(`^ {0,${Math.min(3,u-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),Z=new RegExp(`^ {0,${Math.min(3,u-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),V=new RegExp(`^ {0,${Math.min(3,u-1)}}(?:\`\`\`|~~~)`),L=new RegExp(`^ {0,${Math.min(3,u-1)}}#`);for(;e;){const y=e.split(`
`,1)[0];if(m=y,this.options.pedantic&&(m=m.replace(/^ {1,4}(?=( {4})*[^ ])/g,"  ")),V.test(m)||L.test(m)||O.test(m)||Z.test(e))break;if(m.search(/[^ ]/)>=u||!m.trim())l+=`
`+m.slice(u);else{if(b||g.search(/[^ ]/)>=4||V.test(g)||L.test(g)||Z.test(g))break;l+=`
`+m}!b&&!m.trim()&&(b=!0),i+=y+`
`,e=e.substring(y.length+1),g=m.slice(u)}}a.loose||(d?a.loose=!0:/\n *\n *$/.test(i)&&(d=!0));let z=null,x;this.options.gfm&&(z=/^\[[ xX]\] /.exec(l),z&&(x=z[0]!=="[ ] ",l=l.replace(/^\[[ xX]\] +/,""))),a.items.push({type:"list_item",raw:i,task:!!z,checked:x,loose:!1,text:l,tokens:[]}),a.raw+=i}a.items[a.items.length-1].raw=i.trimEnd(),a.items[a.items.length-1].text=l.trimEnd(),a.raw=a.raw.trimEnd();for(let p=0;p<a.items.length;p++)if(this.lexer.state.top=!1,a.items[p].tokens=this.lexer.blockTokens(a.items[p].text,[]),!a.loose){const g=a.items[p].tokens.filter(u=>u.type==="space"),m=g.length>0&&g.some(u=>/\n.*\n/.test(u.raw));a.loose=m}if(a.loose)for(let p=0;p<a.items.length;p++)a.items[p].loose=!0;return a}}html(e){const t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){const t=this.rules.block.def.exec(e);if(t){const n=t[1].toLowerCase().replace(/\s+/g," "),s=t[2]?t[2].replace(/^<(.*)>$/,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",a=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:s,title:a}}}table(e){const t=this.rules.block.table.exec(e);if(!t||!/[:|]/.test(t[2]))return;const n=os(t[1]),s=t[2].replace(/^\||\| *$/g,"").split("|"),a=t[3]&&t[3].trim()?t[3].replace(/\n[ \t]*$/,"").split(`
`):[],r={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===s.length){for(const i of s)/^ *-+: *$/.test(i)?r.align.push("right"):/^ *:-+: *$/.test(i)?r.align.push("center"):/^ *:-+ *$/.test(i)?r.align.push("left"):r.align.push(null);for(const i of n)r.header.push({text:i,tokens:this.lexer.inline(i)});for(const i of a)r.rows.push(os(i,r.header.length).map(l=>({text:l,tokens:this.lexer.inline(l)})));return r}}lheading(e){const t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){const t=this.rules.block.paragraph.exec(e);if(t){const n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){const t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){const t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:_e(t[1])}}tag(e){const t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&/^<a /i.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&/^<\/a>/i.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&/^<(pre|code|kbd|script)(\s|>)/i.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&/^<\/(pre|code|kbd|script)(\s|>)/i.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){const t=this.rules.inline.link.exec(e);if(t){const n=t[2].trim();if(!this.options.pedantic&&/^</.test(n)){if(!/>$/.test(n))return;const r=en(n.slice(0,-1),"\\");if((n.length-r.length)%2===0)return}else{const r=fr(t[2],"()");if(r>-1){const l=(t[0].indexOf("!")===0?5:4)+t[1].length+r;t[2]=t[2].substring(0,r),t[0]=t[0].substring(0,l).trim(),t[3]=""}}let s=t[2],a="";if(this.options.pedantic){const r=/^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(s);r&&(s=r[1],a=r[3])}else a=t[3]?t[3].slice(1,-1):"";return s=s.trim(),/^</.test(s)&&(this.options.pedantic&&!/>$/.test(n)?s=s.slice(1):s=s.slice(1,-1)),ss(t,{href:s&&s.replace(this.rules.inline.anyPunctuation,"$1"),title:a&&a.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){const s=(n[2]||n[1]).replace(/\s+/g," "),a=t[s.toLowerCase()];if(!a){const r=n[0].charAt(0);return{type:"text",raw:r,text:r}}return ss(n,a,n[0],this.lexer)}}emStrong(e,t,n=""){let s=this.rules.inline.emStrongLDelim.exec(e);if(!s||s[3]&&n.match(/[\p{L}\p{N}]/u))return;if(!(s[1]||s[2]||"")||!n||this.rules.inline.punctuation.exec(n)){const r=[...s[0]].length-1;let i,l,d=r,p=0;const g=s[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(g.lastIndex=0,t=t.slice(-1*e.length+r);(s=g.exec(t))!=null;){if(i=s[1]||s[2]||s[3]||s[4]||s[5]||s[6],!i)continue;if(l=[...i].length,s[3]||s[4]){d+=l;continue}else if((s[5]||s[6])&&r%3&&!((r+l)%3)){p+=l;continue}if(d-=l,d>0)continue;l=Math.min(l,l+d+p);const m=[...s[0]][0].length,u=e.slice(0,r+s.index+m+l);if(Math.min(r,l)%2){const z=u.slice(1,-1);return{type:"em",raw:u,text:z,tokens:this.lexer.inlineTokens(z)}}const b=u.slice(2,-2);return{type:"strong",raw:u,text:b,tokens:this.lexer.inlineTokens(b)}}}}codespan(e){const t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(/\n/g," ");const s=/[^ ]/.test(n),a=/^ /.test(n)&&/ $/.test(n);return s&&a&&(n=n.substring(1,n.length-1)),n=_e(n,!0),{type:"codespan",raw:t[0],text:n}}}br(e){const t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){const t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){const t=this.rules.inline.autolink.exec(e);if(t){let n,s;return t[2]==="@"?(n=_e(t[1]),s="mailto:"+n):(n=_e(t[1]),s=n),{type:"link",raw:t[0],text:n,href:s,tokens:[{type:"text",raw:n,text:n}]}}}url(e){var n;let t;if(t=this.rules.inline.url.exec(e)){let s,a;if(t[2]==="@")s=_e(t[0]),a="mailto:"+s;else{let r;do r=t[0],t[0]=((n=this.rules.inline._backpedal.exec(t[0]))==null?void 0:n[0])??"";while(r!==t[0]);s=_e(t[0]),t[1]==="www."?a="http://"+t[0]:a=t[0]}return{type:"link",raw:t[0],text:s,href:a,tokens:[{type:"text",raw:s,text:s}]}}}inlineText(e){const t=this.rules.inline.text.exec(e);if(t){let n;return this.lexer.state.inRawBlock?n=t[0]:n=_e(t[0]),{type:"text",raw:t[0],text:n}}}}const gr=/^(?: *(?:\n|$))+/,hr=/^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,br=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Ft=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,xr=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,ks=/(?:[*+-]|\d{1,9}[.)])/,Ss=re(/^(?!bull |blockCode|fences|blockquote|heading|html)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html))+?)\n {0,3}(=+|-+) *(?:\n+|$)/).replace(/bull/g,ks).replace(/blockCode/g,/ {4}/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).getRegex(),ro=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,yr=/^[^\n]+/,io=/(?!\s*\])(?:\\.|[^\[\]\\])+/,wr=re(/^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/).replace("label",io).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),vr=re(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,ks).getRegex(),xn="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",lo=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Er=re("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))","i").replace("comment",lo).replace("tag",xn).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Ts=re(ro).replace("hr",Ft).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",xn).getRegex(),kr=re(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Ts).getRegex(),co={blockquote:kr,code:hr,def:wr,fences:br,heading:xr,hr:Ft,html:Er,lheading:Ss,list:vr,newline:gr,paragraph:Ts,table:Bt,text:yr},as=re("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Ft).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code"," {4}[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",xn).getRegex(),Sr={...co,table:as,paragraph:re(ro).replace("hr",Ft).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",as).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",xn).getRegex()},Tr={...co,html:re(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",lo).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Bt,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:re(ro).replace("hr",Ft).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Ss).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},As=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Ar=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Is=/^( {2,}|\\)\n(?!\s*$)/,Ir=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Wt="\\p{P}\\p{S}",Lr=re(/^((?![*_])[\spunctuation])/,"u").replace(/punctuation/g,Wt).getRegex(),Cr=/\[[^[\]]*?\]\([^\(\)]*?\)|`[^`]*?`|<[^<>]*?>/g,Rr=re(/^(?:\*+(?:((?!\*)[punct])|[^\s*]))|^_+(?:((?!_)[punct])|([^\s_]))/,"u").replace(/punct/g,Wt).getRegex(),Dr=re("^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)[punct](\\*+)(?=[\\s]|$)|[^punct\\s](\\*+)(?!\\*)(?=[punct\\s]|$)|(?!\\*)[punct\\s](\\*+)(?=[^punct\\s])|[\\s](\\*+)(?!\\*)(?=[punct])|(?!\\*)[punct](\\*+)(?!\\*)(?=[punct])|[^punct\\s](\\*+)(?=[^punct\\s])","gu").replace(/punct/g,Wt).getRegex(),$r=re("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)[punct](_+)(?=[\\s]|$)|[^punct\\s](_+)(?!_)(?=[punct\\s]|$)|(?!_)[punct\\s](_+)(?=[^punct\\s])|[\\s](_+)(?!_)(?=[punct])|(?!_)[punct](_+)(?!_)(?=[punct])","gu").replace(/punct/g,Wt).getRegex(),_r=re(/\\([punct])/,"gu").replace(/punct/g,Wt).getRegex(),Or=re(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Nr=re(lo).replace("(?:-->|$)","-->").getRegex(),Pr=re("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Nr).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),un=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,Mr=re(/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/).replace("label",un).replace("href",/<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Ls=re(/^!?\[(label)\]\[(ref)\]/).replace("label",un).replace("ref",io).getRegex(),Cs=re(/^!?\[(ref)\](?:\[\])?/).replace("ref",io).getRegex(),Br=re("reflink|nolink(?!\\()","g").replace("reflink",Ls).replace("nolink",Cs).getRegex(),po={_backpedal:Bt,anyPunctuation:_r,autolink:Or,blockSkip:Cr,br:Is,code:Ar,del:Bt,emStrongLDelim:Rr,emStrongRDelimAst:Dr,emStrongRDelimUnd:$r,escape:As,link:Mr,nolink:Cs,punctuation:Lr,reflink:Ls,reflinkSearch:Br,tag:Pr,text:Ir,url:Bt},Ur={...po,link:re(/^!?\[(label)\]\((.*?)\)/).replace("label",un).getRegex(),reflink:re(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",un).getRegex()},Xn={...po,escape:re(As).replace("])","~|])").getRegex(),url:re(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},zr={...Xn,br:re(Is).replace("{2,}","*").getRegex(),text:re(Xn.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},tn={normal:co,gfm:Sr,pedantic:Tr},_t={normal:po,gfm:Xn,breaks:zr,pedantic:Ur};class Ve{constructor(e){le(this,"tokens");le(this,"options");le(this,"state");le(this,"tokenizer");le(this,"inlineQueue");this.tokens=[],this.tokens.links=Object.create(null),this.options=e||dt,this.options.tokenizer=this.options.tokenizer||new pn,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const t={block:tn.normal,inline:_t.normal};this.options.pedantic?(t.block=tn.pedantic,t.inline=_t.pedantic):this.options.gfm&&(t.block=tn.gfm,this.options.breaks?t.inline=_t.breaks:t.inline=_t.gfm),this.tokenizer.rules=t}static get rules(){return{block:tn,inline:_t}}static lex(e,t){return new Ve(t).lex(e)}static lexInline(e,t){return new Ve(t).inlineTokens(e)}lex(e){e=e.replace(/\r\n|\r/g,`
`),this.blockTokens(e,this.tokens);for(let t=0;t<this.inlineQueue.length;t++){const n=this.inlineQueue[t];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,t=[]){this.options.pedantic?e=e.replace(/\t/g,"    ").replace(/^ +$/gm,""):e=e.replace(/^( *)(\t+)/gm,(i,l,d)=>l+"    ".repeat(d.length));let n,s,a,r;for(;e;)if(!(this.options.extensions&&this.options.extensions.block&&this.options.extensions.block.some(i=>(n=i.call({lexer:this},e,t))?(e=e.substring(n.raw.length),t.push(n),!0):!1))){if(n=this.tokenizer.space(e)){e=e.substring(n.raw.length),n.raw.length===1&&t.length>0?t[t.length-1].raw+=`
`:t.push(n);continue}if(n=this.tokenizer.code(e)){e=e.substring(n.raw.length),s=t[t.length-1],s&&(s.type==="paragraph"||s.type==="text")?(s.raw+=`
`+n.raw,s.text+=`
`+n.text,this.inlineQueue[this.inlineQueue.length-1].src=s.text):t.push(n);continue}if(n=this.tokenizer.fences(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.heading(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.hr(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.blockquote(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.list(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.html(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.def(e)){e=e.substring(n.raw.length),s=t[t.length-1],s&&(s.type==="paragraph"||s.type==="text")?(s.raw+=`
`+n.raw,s.text+=`
`+n.raw,this.inlineQueue[this.inlineQueue.length-1].src=s.text):this.tokens.links[n.tag]||(this.tokens.links[n.tag]={href:n.href,title:n.title});continue}if(n=this.tokenizer.table(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.lheading(e)){e=e.substring(n.raw.length),t.push(n);continue}if(a=e,this.options.extensions&&this.options.extensions.startBlock){let i=1/0;const l=e.slice(1);let d;this.options.extensions.startBlock.forEach(p=>{d=p.call({lexer:this},l),typeof d=="number"&&d>=0&&(i=Math.min(i,d))}),i<1/0&&i>=0&&(a=e.substring(0,i+1))}if(this.state.top&&(n=this.tokenizer.paragraph(a))){s=t[t.length-1],r&&s.type==="paragraph"?(s.raw+=`
`+n.raw,s.text+=`
`+n.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=s.text):t.push(n),r=a.length!==e.length,e=e.substring(n.raw.length);continue}if(n=this.tokenizer.text(e)){e=e.substring(n.raw.length),s=t[t.length-1],s&&s.type==="text"?(s.raw+=`
`+n.raw,s.text+=`
`+n.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=s.text):t.push(n);continue}if(e){const i="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(i);break}else throw new Error(i)}}return this.state.top=!0,t}inline(e,t=[]){return this.inlineQueue.push({src:e,tokens:t}),t}inlineTokens(e,t=[]){let n,s,a,r=e,i,l,d;if(this.tokens.links){const p=Object.keys(this.tokens.links);if(p.length>0)for(;(i=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)p.includes(i[0].slice(i[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,i.index)+"["+"a".repeat(i[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(i=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)r=r.slice(0,i.index)+"["+"a".repeat(i[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);for(;(i=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,i.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;e;)if(l||(d=""),l=!1,!(this.options.extensions&&this.options.extensions.inline&&this.options.extensions.inline.some(p=>(n=p.call({lexer:this},e,t))?(e=e.substring(n.raw.length),t.push(n),!0):!1))){if(n=this.tokenizer.escape(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.tag(e)){e=e.substring(n.raw.length),s=t[t.length-1],s&&n.type==="text"&&s.type==="text"?(s.raw+=n.raw,s.text+=n.text):t.push(n);continue}if(n=this.tokenizer.link(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(n.raw.length),s=t[t.length-1],s&&n.type==="text"&&s.type==="text"?(s.raw+=n.raw,s.text+=n.text):t.push(n);continue}if(n=this.tokenizer.emStrong(e,r,d)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.codespan(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.br(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.del(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.autolink(e)){e=e.substring(n.raw.length),t.push(n);continue}if(!this.state.inLink&&(n=this.tokenizer.url(e))){e=e.substring(n.raw.length),t.push(n);continue}if(a=e,this.options.extensions&&this.options.extensions.startInline){let p=1/0;const g=e.slice(1);let m;this.options.extensions.startInline.forEach(u=>{m=u.call({lexer:this},g),typeof m=="number"&&m>=0&&(p=Math.min(p,m))}),p<1/0&&p>=0&&(a=e.substring(0,p+1))}if(n=this.tokenizer.inlineText(a)){e=e.substring(n.raw.length),n.raw.slice(-1)!=="_"&&(d=n.raw.slice(-1)),l=!0,s=t[t.length-1],s&&s.type==="text"?(s.raw+=n.raw,s.text+=n.text):t.push(n);continue}if(e){const p="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(p);break}else throw new Error(p)}}return t}}class fn{constructor(e){le(this,"options");this.options=e||dt}code(e,t,n){var a;const s=(a=(t||"").match(/^\S*/))==null?void 0:a[0];return e=e.replace(/\n$/,"")+`
`,s?'<pre><code class="language-'+_e(s)+'">'+(n?e:_e(e,!0))+`</code></pre>
`:"<pre><code>"+(n?e:_e(e,!0))+`</code></pre>
`}blockquote(e){return`<blockquote>
${e}</blockquote>
`}html(e,t){return e}heading(e,t,n){return`<h${t}>${e}</h${t}>
`}hr(){return`<hr>
`}list(e,t,n){const s=t?"ol":"ul",a=t&&n!==1?' start="'+n+'"':"";return"<"+s+a+`>
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
`}strong(e){return`<strong>${e}</strong>`}em(e){return`<em>${e}</em>`}codespan(e){return`<code>${e}</code>`}br(){return"<br>"}del(e){return`<del>${e}</del>`}link(e,t,n){const s=ns(e);if(s===null)return n;e=s;let a='<a href="'+e+'"';return t&&(a+=' title="'+t+'"'),a+=">"+n+"</a>",a}image(e,t,n){const s=ns(e);if(s===null)return n;e=s;let a=`<img src="${e}" alt="${n}"`;return t&&(a+=` title="${t}"`),a+=">",a}text(e){return e}}class uo{strong(e){return e}em(e){return e}codespan(e){return e}del(e){return e}html(e){return e}text(e){return e}link(e,t,n){return""+n}image(e,t,n){return""+n}br(){return""}}class Ke{constructor(e){le(this,"options");le(this,"renderer");le(this,"textRenderer");this.options=e||dt,this.options.renderer=this.options.renderer||new fn,this.renderer=this.options.renderer,this.renderer.options=this.options,this.textRenderer=new uo}static parse(e,t){return new Ke(t).parse(e)}static parseInline(e,t){return new Ke(t).parseInline(e)}parse(e,t=!0){let n="";for(let s=0;s<e.length;s++){const a=e[s];if(this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[a.type]){const r=a,i=this.options.extensions.renderers[r.type].call({parser:this},r);if(i!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(r.type)){n+=i||"";continue}}switch(a.type){case"space":continue;case"hr":{n+=this.renderer.hr();continue}case"heading":{const r=a;n+=this.renderer.heading(this.parseInline(r.tokens),r.depth,pr(this.parseInline(r.tokens,this.textRenderer)));continue}case"code":{const r=a;n+=this.renderer.code(r.text,r.lang,!!r.escaped);continue}case"table":{const r=a;let i="",l="";for(let p=0;p<r.header.length;p++)l+=this.renderer.tablecell(this.parseInline(r.header[p].tokens),{header:!0,align:r.align[p]});i+=this.renderer.tablerow(l);let d="";for(let p=0;p<r.rows.length;p++){const g=r.rows[p];l="";for(let m=0;m<g.length;m++)l+=this.renderer.tablecell(this.parseInline(g[m].tokens),{header:!1,align:r.align[m]});d+=this.renderer.tablerow(l)}n+=this.renderer.table(i,d);continue}case"blockquote":{const r=a,i=this.parse(r.tokens);n+=this.renderer.blockquote(i);continue}case"list":{const r=a,i=r.ordered,l=r.start,d=r.loose;let p="";for(let g=0;g<r.items.length;g++){const m=r.items[g],u=m.checked,b=m.task;let z="";if(m.task){const x=this.renderer.checkbox(!!u);d?m.tokens.length>0&&m.tokens[0].type==="paragraph"?(m.tokens[0].text=x+" "+m.tokens[0].text,m.tokens[0].tokens&&m.tokens[0].tokens.length>0&&m.tokens[0].tokens[0].type==="text"&&(m.tokens[0].tokens[0].text=x+" "+m.tokens[0].tokens[0].text)):m.tokens.unshift({type:"text",text:x+" "}):z+=x+" "}z+=this.parse(m.tokens,d),p+=this.renderer.listitem(z,b,!!u)}n+=this.renderer.list(p,i,l);continue}case"html":{const r=a;n+=this.renderer.html(r.text,r.block);continue}case"paragraph":{const r=a;n+=this.renderer.paragraph(this.parseInline(r.tokens));continue}case"text":{let r=a,i=r.tokens?this.parseInline(r.tokens):r.text;for(;s+1<e.length&&e[s+1].type==="text";)r=e[++s],i+=`
`+(r.tokens?this.parseInline(r.tokens):r.text);n+=t?this.renderer.paragraph(i):i;continue}default:{const r='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(r),"";throw new Error(r)}}}return n}parseInline(e,t){t=t||this.renderer;let n="";for(let s=0;s<e.length;s++){const a=e[s];if(this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[a.type]){const r=this.options.extensions.renderers[a.type].call({parser:this},a);if(r!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(a.type)){n+=r||"";continue}}switch(a.type){case"escape":{const r=a;n+=t.text(r.text);break}case"html":{const r=a;n+=t.html(r.text);break}case"link":{const r=a;n+=t.link(r.href,r.title,this.parseInline(r.tokens,t));break}case"image":{const r=a;n+=t.image(r.href,r.title,r.text);break}case"strong":{const r=a;n+=t.strong(this.parseInline(r.tokens,t));break}case"em":{const r=a;n+=t.em(this.parseInline(r.tokens,t));break}case"codespan":{const r=a;n+=t.codespan(r.text);break}case"br":{n+=t.br();break}case"del":{const r=a;n+=t.del(this.parseInline(r.tokens,t));break}case"text":{const r=a;n+=t.text(r.text);break}default:{const r='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(r),"";throw new Error(r)}}}return n}}class Ut{constructor(e){le(this,"options");this.options=e||dt}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}}le(Ut,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens"]));var ct,Jn,Rs;class jr{constructor(...e){Bo(this,ct);le(this,"defaults",ao());le(this,"options",this.setOptions);le(this,"parse",Jt(this,ct,Jn).call(this,Ve.lex,Ke.parse));le(this,"parseInline",Jt(this,ct,Jn).call(this,Ve.lexInline,Ke.parseInline));le(this,"Parser",Ke);le(this,"Renderer",fn);le(this,"TextRenderer",uo);le(this,"Lexer",Ve);le(this,"Tokenizer",pn);le(this,"Hooks",Ut);this.use(...e)}walkTokens(e,t){var s,a;let n=[];for(const r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{const i=r;for(const l of i.header)n=n.concat(this.walkTokens(l.tokens,t));for(const l of i.rows)for(const d of l)n=n.concat(this.walkTokens(d.tokens,t));break}case"list":{const i=r;n=n.concat(this.walkTokens(i.items,t));break}default:{const i=r;(a=(s=this.defaults.extensions)==null?void 0:s.childTokens)!=null&&a[i.type]?this.defaults.extensions.childTokens[i.type].forEach(l=>{const d=i[l].flat(1/0);n=n.concat(this.walkTokens(d,t))}):i.tokens&&(n=n.concat(this.walkTokens(i.tokens,t)))}}return n}use(...e){const t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{const s={...n};if(s.async=this.defaults.async||s.async||!1,n.extensions&&(n.extensions.forEach(a=>{if(!a.name)throw new Error("extension name required");if("renderer"in a){const r=t.renderers[a.name];r?t.renderers[a.name]=function(...i){let l=a.renderer.apply(this,i);return l===!1&&(l=r.apply(this,i)),l}:t.renderers[a.name]=a.renderer}if("tokenizer"in a){if(!a.level||a.level!=="block"&&a.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");const r=t[a.level];r?r.unshift(a.tokenizer):t[a.level]=[a.tokenizer],a.start&&(a.level==="block"?t.startBlock?t.startBlock.push(a.start):t.startBlock=[a.start]:a.level==="inline"&&(t.startInline?t.startInline.push(a.start):t.startInline=[a.start]))}"childTokens"in a&&a.childTokens&&(t.childTokens[a.name]=a.childTokens)}),s.extensions=t),n.renderer){const a=this.defaults.renderer||new fn(this.defaults);for(const r in n.renderer){if(!(r in a))throw new Error(`renderer '${r}' does not exist`);if(r==="options")continue;const i=r,l=n.renderer[i],d=a[i];a[i]=(...p)=>{let g=l.apply(a,p);return g===!1&&(g=d.apply(a,p)),g||""}}s.renderer=a}if(n.tokenizer){const a=this.defaults.tokenizer||new pn(this.defaults);for(const r in n.tokenizer){if(!(r in a))throw new Error(`tokenizer '${r}' does not exist`);if(["options","rules","lexer"].includes(r))continue;const i=r,l=n.tokenizer[i],d=a[i];a[i]=(...p)=>{let g=l.apply(a,p);return g===!1&&(g=d.apply(a,p)),g}}s.tokenizer=a}if(n.hooks){const a=this.defaults.hooks||new Ut;for(const r in n.hooks){if(!(r in a))throw new Error(`hook '${r}' does not exist`);if(r==="options")continue;const i=r,l=n.hooks[i],d=a[i];Ut.passThroughHooks.has(r)?a[i]=p=>{if(this.defaults.async)return Promise.resolve(l.call(a,p)).then(m=>d.call(a,m));const g=l.call(a,p);return d.call(a,g)}:a[i]=(...p)=>{let g=l.apply(a,p);return g===!1&&(g=d.apply(a,p)),g}}s.hooks=a}if(n.walkTokens){const a=this.defaults.walkTokens,r=n.walkTokens;s.walkTokens=function(i){let l=[];return l.push(r.call(this,i)),a&&(l=l.concat(a.call(this,i))),l}}this.defaults={...this.defaults,...s}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Ve.lex(e,t??this.defaults)}parser(e,t){return Ke.parse(e,t??this.defaults)}}ct=new WeakSet,Jn=function(e,t){return(n,s)=>{const a={...s},r={...this.defaults,...a};this.defaults.async===!0&&a.async===!1&&(r.silent||console.warn("marked(): The async option was set to true by an extension. The async: false option sent to parse will be ignored."),r.async=!0);const i=Jt(this,ct,Rs).call(this,!!r.silent,!!r.async);if(typeof n>"u"||n===null)return i(new Error("marked(): input parameter is undefined or null"));if(typeof n!="string")return i(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(n)+", string expected"));if(r.hooks&&(r.hooks.options=r),r.async)return Promise.resolve(r.hooks?r.hooks.preprocess(n):n).then(l=>e(l,r)).then(l=>r.hooks?r.hooks.processAllTokens(l):l).then(l=>r.walkTokens?Promise.all(this.walkTokens(l,r.walkTokens)).then(()=>l):l).then(l=>t(l,r)).then(l=>r.hooks?r.hooks.postprocess(l):l).catch(i);try{r.hooks&&(n=r.hooks.preprocess(n));let l=e(n,r);r.hooks&&(l=r.hooks.processAllTokens(l)),r.walkTokens&&this.walkTokens(l,r.walkTokens);let d=t(l,r);return r.hooks&&(d=r.hooks.postprocess(d)),d}catch(l){return i(l)}}},Rs=function(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){const s="<p>An error occurred:</p><pre>"+_e(n.message+"",!0)+"</pre>";return t?Promise.resolve(s):s}if(t)return Promise.reject(n);throw n}};const lt=new jr;function oe(o,e){return lt.parse(o,e)}oe.options=oe.setOptions=function(o){return lt.setOptions(o),oe.defaults=lt.defaults,ws(oe.defaults),oe};oe.getDefaults=ao;oe.defaults=dt;oe.use=function(...o){return lt.use(...o),oe.defaults=lt.defaults,ws(oe.defaults),oe};oe.walkTokens=function(o,e){return lt.walkTokens(o,e)};oe.parseInline=lt.parseInline;oe.Parser=Ke;oe.parser=Ke.parse;oe.Renderer=fn;oe.TextRenderer=uo;oe.Lexer=Ve;oe.lexer=Ve.lex;oe.Tokenizer=pn;oe.Hooks=Ut;oe.parse=oe;oe.options;oe.setOptions;oe.use;oe.walkTokens;oe.parseInline;Ke.parse;Ve.lex;const vt=new oe.Renderer,Hr=vt.link.bind(vt);vt.link=(o,e,t)=>Hr(o,e,t).replace("<a ",'<a target="_blank" rel="noopener noreferrer" class="text-teal-400 hover:underline" ');vt.heading=(o,e)=>{const t=o.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");return`<h${e} id="${t}">${o}</h${e}>`};vt.table=(o,e)=>`<div class="overflow-x-auto my-4 max-w-full"><table class="w-full">${o}${e}</table></div>`;oe.setOptions({renderer:vt,gfm:!0,breaks:!0});function Ds(){try{return parseInt(localStorage.getItem("secops-sanitize-count")||"0",10)}catch{return 0}}function $s(){try{const o=Ds();localStorage.setItem("secops-sanitize-count",(o+1).toString())}catch{}}function Et(o){$s();const e=oe.parse(o);Mt.addHook("uponSanitizeElement",n=>{if(n instanceof Element){const s=n.tagName.toLowerCase();if(s==="video"||s==="audio"||s==="iframe"||s==="source"||s==="img"){const a=n.getAttribute("src");if(a){const r=a.trim().toLowerCase();r.startsWith("data:")||r.startsWith("blob:")||r.startsWith("attachment:")||r.startsWith("/")||r.startsWith("./")||r.startsWith("../")||(n.setAttribute("src","#"),console.warn("SECURITY BLOCK: Prevented connection to remote source URL:",a))}s==="iframe"&&n.setAttribute("sandbox","allow-scripts")}}});const t=Mt.sanitize(e,{ALLOWED_TAGS:["h1","h2","h3","h4","h5","h6","p","br","hr","a","span","ul","ol","li","strong","em","code","pre","blockquote","table","thead","tbody","tr","th","td","div","img","input","video","audio","iframe","source"],ALLOWED_ATTR:["href","target","rel","class","id","align","src","alt","type","checked","disabled","controls","sandbox","width","height"]});return Mt.removeHook("uponSanitizeElement"),t}function sn(o){return o.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F\u200B-\u200D\uFEFF\u202A-\u202E]/g,"")}function R(o){return o.replace(/[&<>"']/g,e=>{switch(e){case"&":return"&amp;";case"<":return"&lt;";case">":return"&gt;";case'"':return"&quot;";case"'":return"&#039;";default:return e}})}function Fr(o){if($s(),typeof o!="object"||o===null)throw new Error("Invalid backup structure: Root must be an object.");const{slug:e,title:t,content:n,updatedAt:s,tags:a}=o;if(typeof e!="string"||!/^[a-z0-9-_]+$/.test(e))throw new Error("Invalid slug format: Slugs must contain only lowercase alphanumeric characters, hyphens, and underscores.");const r=sn(e);if(typeof t!="string"||t.trim().length===0||t.length>100)throw new Error("Invalid title format: Must be a non-empty string under 100 characters.");const i=sn(t);if(typeof n!="string"||n.length>5e4)throw new Error("Invalid content format: Must be a string under 50,000 characters.");if(typeof s!="number"||isNaN(s))throw new Error("Invalid updated timestamp format.");if(!Array.isArray(a))throw new Error("Tags must be an array of strings.");const l=a.map(d=>{if(typeof d!="string")throw new Error("Tags must be strings.");return sn(Mt.sanitize(d)).slice(0,30)});return{slug:r,title:Mt.sanitize(i),content:n,updatedAt:s,tags:l,isSystem:!!o.isSystem}}async function Le(o){const e=new TextEncoder,t=e.encode("secops-intel-salt-2026"),n=await window.crypto.subtle.importKey("raw",e.encode(o),{name:"PBKDF2"},!1,["deriveKey"]);return window.crypto.subtle.deriveKey({name:"PBKDF2",salt:t,iterations:1e5,hash:"SHA-256"},n,{name:"AES-GCM",length:256},!1,["encrypt","decrypt"])}async function ot(o,e){const t=new TextEncoder,n=window.crypto.getRandomValues(new Uint8Array(12)),s=await window.crypto.subtle.encrypt({name:"AES-GCM",iv:n},e,t.encode(o)),a=Array.from(n).map(d=>d.toString(16).padStart(2,"0")).join(""),r=new Uint8Array(s);let i="";for(let d=0;d<r.byteLength;d++)i+=String.fromCharCode(r[d]);const l=btoa(i);return`${a}:${l}`}async function me(o,e){const t=o.split(":");if(t.length!==2)throw new Error("Invalid cipher format");const[n,s]=t,a=new Uint8Array(n.match(/.{1,2}/g).map(d=>parseInt(d,16))),r=atob(s),i=new Uint8Array(r.length);for(let d=0;d<r.length;d++)i[d]=r.charCodeAt(d);const l=await window.crypto.subtle.decrypt({name:"AES-GCM",iv:a},e,i);return new TextDecoder().decode(l)}async function Ze(o){const e=`${o.slug}|${o.title}|${o.content}|${o.updatedAt}|${o.tags.join(",")}|secops-integrity-salt-2026`,t=new TextEncoder().encode(e),n=await crypto.subtle.digest("SHA-256",t);return Array.from(new Uint8Array(n)).map(a=>a.toString(16).padStart(2,"0")).join("")}let se="home",Xe=!1,Ne=!1,je="",Ot="",ge=[],Pt=null,_s=navigator.onLine?"SECURE_LINK":"OFFLINE_CACHE",wt=localStorage.getItem("secops-wiki-theme")||"dark",nt=localStorage.getItem("secops-wiki-mask-encrypted")==="true",nn=localStorage.getItem("secops-wiki-split-screen")!=="false",an={},pe=null;async function de(o,e){const t={id:`${Date.now()}-${Math.random().toString(36).substring(2,11)}`,timestamp:Date.now(),event:o,details:e};await Sa(t)}async function He(o){const e=await ba(o);if(!e)return null;if(e.isEncryptedAtRest&&e.encryptedData){if(!pe)return{slug:e.slug,title:"[DATABASE LOCKED]",content:"Master passphrase required to unlock this database record.",tags:[],isSystem:e.isSystem,isEncrypted:!1,updatedAt:e.updatedAt};try{const t=await me(e.encryptedData,pe),n=JSON.parse(t);return{slug:e.slug,title:n.title,content:n.content,tags:n.tags,isSystem:e.isSystem,isEncrypted:n.isEncrypted,signature:n.signature,updatedAt:n.updatedAt}}catch(t){return console.error("Failed to decrypt page at rest:",t),null}}return e}async function Me(o){if(localStorage.getItem("secops-wiki-db-encrypted")==="true"&&pe){const t={title:o.title,content:o.content,tags:o.tags,isEncrypted:o.isEncrypted,signature:o.signature,updatedAt:o.updatedAt},n=await ot(JSON.stringify(t),pe),s={slug:o.slug,title:"[REDACTED AT REST]",content:"[REDACTED AT REST]",tags:[],isSystem:o.isSystem,isEncryptedAtRest:!0,encryptedData:n,updatedAt:o.updatedAt};await dn(s)}else await dn(o);localStorage.setItem("secops-wiki-last-update",Date.now().toString())}async function fo(){const o=await Ht(),e=[];for(const t of o){const n=await He(t.slug);n&&e.push(n)}return e}async function mo(){try{const o=await gs();an={},o.forEach(e=>{an[e.tag]=e.color})}catch{an={}}}function Wr(o){const e=an[o]||"slate";let t="bg-slate-950/20 text-slate-400 border-slate-900/30";return e==="emerald"?t="bg-emerald-950/20 text-emerald-400 border-emerald-900/30":e==="blue"?t="bg-blue-950/20 text-blue-400 border-blue-900/30":e==="red"?t="bg-red-950/20 text-red-400 border-red-900/30":e==="amber"&&(t="bg-amber-950/20 text-amber-400 border-amber-900/30"),`
    <span class="text-[10px] font-mono px-2 py-0.5 rounded border ${t}">#${R(o)}</span>
  `}function qr(o){const e=ge.filter(r=>r.slug!==se);if(e.length===0)return;e.sort((r,i)=>i.title.length-r.title.length);const t=r=>r.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"),n=[],s=document.createTreeWalker(o,NodeFilter.SHOW_TEXT,{acceptNode:r=>{let i=r.parentElement;for(;i&&i!==o;){const l=i.tagName.toLowerCase();if(l==="a"||l==="code"||l==="pre")return NodeFilter.FILTER_REJECT;i=i.parentElement}return NodeFilter.FILTER_ACCEPT}});let a=s.nextNode();for(;a;)n.push(a),a=s.nextNode();for(const r of n){const i=r.parentNode;if(!i)continue;let l=r.nodeValue||"";for(const d of e){if(d.isEncrypted&&!G&&nt)continue;const g=t(d.title),m=t(d.slug),b=new RegExp(`\\b(${g}|${m})\\b`,"i").exec(l);if(b){const z=b[0],x=b.index,O=l.substring(0,x),Z=l.substring(x+z.length),V=document.createTextNode(O),L=document.createElement("a");L.href=`#/page/${d.slug}`,L.className="autolink text-teal-400 hover:text-teal-350 underline decoration-dotted transition",L.textContent=z;const y=document.createTextNode(Z);i.insertBefore(V,r),i.insertBefore(L,r),i.insertBefore(y,r),i.removeChild(r);break}}}}function Gr(o){if(!o||o==="system"||o==="graph")return;let e=[];try{e=JSON.parse(sessionStorage.getItem("secops-wiki-breadcrumbs")||"[]")}catch{}Array.isArray(e)||(e=[]),e=e.filter(t=>t!==o),e.unshift(o),e.length>5&&(e=e.slice(0,5)),sessionStorage.setItem("secops-wiki-breadcrumbs",JSON.stringify(e))}function Vr(o){const e=ge.find(n=>n.slug===o);return e?e.isEncrypted&&!G&&nt?"[REDACTED CORE]":e.title:o}let G=null,zn=!1,Pe=0,rn=!1,ln=-1,Qn="";function Kr(){return parseInt(localStorage.getItem("secops-decrypt-failed-attempts")||"0",10)}function Os(o){localStorage.setItem("secops-decrypt-failed-attempts",o.toString())}function eo(){return parseInt(localStorage.getItem("secops-decrypt-lockout-until")||"0",10)}function Ns(o){localStorage.setItem("secops-decrypt-lockout-until",o.toString())}function rs(){return Date.now()<eo()}function Yr(){const o=Kr()+1;if(Os(o),o>=3){const e=3e5*Math.pow(2,o-3);Ns(Date.now()+e)}}function Zr(){Os(0),Ns(0)}let jn=null;function go(){jn&&clearTimeout(jn);const o=parseInt(localStorage.getItem("secops-wiki-session-timeout")||"15",10);o!==0&&(jn=setTimeout(()=>{G&&(G=null,alert(`SECURITY TIMEOUT: Session idle for ${o} minutes. Passphrase keys wiped from memory.`),window.location.hash.startsWith("#/page/")?window.location.hash="#/page/home":ve())},o*60*1e3))}["mousedown","mousemove","keydown","scroll","touchstart"].forEach(o=>{window.addEventListener(o,go,{passive:!0})});go();let it=null;document.addEventListener("copy",()=>{var e;document.body.classList.contains("encrypted-page-active")?(e=window.getSelection())!=null&&e.toString()&&Ps():it&&(clearTimeout(it),it=null)});function Ps(){it&&clearTimeout(it),it=setTimeout(async()=>{try{await navigator.clipboard.writeText("[SECURE WIPE: Decrypted secret cleared from clipboard]"),Xr(),await de("CLIPBOARD_WIPE","Automatically cleared decrypted secret from clipboard.")}catch(o){console.warn("Clipboard wipe failed:",o)}it=null},3e4)}function Xr(){const o=document.getElementById("clipboard-wipe-toast");o&&o.remove();const e=document.createElement("div");e.id="clipboard-wipe-toast",e.className="fixed bottom-4 left-4 z-50 glass-panel border border-red-500/30 p-3 rounded-xl shadow-xl font-mono text-[10px] text-red-400 select-none animate-fade-in",e.innerHTML="⚠️ SECURITY WIPE: Decrypted secret cleared from clipboard.",document.body.appendChild(e),setTimeout(()=>{e.classList.add("opacity-0","transition-opacity","duration-500"),setTimeout(()=>e.remove(),500)},3e3)}function Ms(o){if(o.length<8)return{valid:!1,message:"Password must be at least 8 characters long."};let e=!1,t=!1,n=!1,s=!1;const a=/[!@#$%^&*(),.?":{}|<>_+\\-]/;for(const r of o)r>="A"&&r<="Z"?e=!0:r>="a"&&r<="z"?t=!0:r>="0"&&r<="9"?n=!0:a.test(r)&&(s=!0);return!e||!t||!n||!s?{valid:!1,message:"Password must include uppercase, lowercase, numbers, and special symbols (!@#$%^&*, etc.)."}:{valid:!0,message:""}}function is(){G&&(G=null,alert("QUICK LOCK: In-memory session keys cleared. Documents locked."),window.location.hash="#/page/home",ve())}let on=0,Hn=null;window.addEventListener("keydown",o=>{o.key==="Escape"&&(on++,Hn&&clearTimeout(Hn),on>=3?(on=0,is()):Hn=setTimeout(()=>{on=0},1e3)),o.ctrlKey&&o.shiftKey&&o.key.toLowerCase()==="l"&&(o.preventDefault(),is())});function Bs(){const o=document.documentElement,e=document.getElementById("theme-icon-path");wt==="light"?(o.classList.add("light-theme"),e&&e.setAttribute("d","M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z")):(o.classList.remove("light-theme"),e&&e.setAttribute("d","M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z"))}function Us(){wt=wt==="dark"?"light":"dark",localStorage.setItem("secops-wiki-theme",wt),Bs()}function Jr(o,e){if(!e||e.trim().length===0)return o;const t=e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"),n=new RegExp(`(?![^<>]*>)(${t})`,"gi");return o.replace(n,'<mark class="bg-teal-500/30 text-teal-300 px-0.5 rounded font-medium">$1</mark>')}function Qr(o){const e=o.toLowerCase().trim();return/(sec|security|critical|panic|destruct|lock|key|auth)/.test(e)?{bg:"rgba(239, 68, 68, 0.15)",text:"#f87171",border:"rgba(239, 68, 68, 0.3)",className:"tag-color-red"}:/(doc|manual|wiki|guide|system|dashboard|home)/.test(e)?{bg:"rgba(20, 184, 166, 0.15)",text:"#2dd4bf",border:"rgba(20, 184, 166, 0.3)",className:"tag-color-teal"}:/(config|settings|sys|admin|db|telemetry)/.test(e)?{bg:"rgba(59, 130, 246, 0.15)",text:"#60a5fa",border:"rgba(59, 130, 246, 0.3)",className:"tag-color-blue"}:/(warning|caution|issue|bug|fix)/.test(e)?{bg:"rgba(245, 158, 11, 0.15)",text:"#fbbf24",border:"rgba(245, 158, 11, 0.3)",className:"tag-color-amber"}:{bg:"rgba(148, 163, 184, 0.15)",text:"#cbd5e1",border:"rgba(148, 163, 184, 0.3)",className:"tag-color-slate"}}function zs(o,e){const t=e.toLowerCase().trim();if(!t)return 0;let n=0;const s=o.title.toLowerCase(),a=o.content.toLowerCase(),r=o.tags.map(i=>i.toLowerCase());if(s===t?n+=100:s.startsWith(t)?n+=80:s.includes(t)&&(n+=50),r.forEach(i=>{i===t?n+=30:i.includes(t)&&(n+=15)}),a.includes(t)){n+=10;const i=a.split(t).length-1;n+=Math.min(10,i)}return n}function ls(o){const e=new Uint32Array(256);for(let n=0;n<256;n++){let s=n;for(let a=0;a<8;a++)s=s&1?3988292384^s>>>1:s>>>1;e[n]=s}let t=4294967295;for(let n=0;n<o.length;n++)t=e[(t^o[n])&255]^t>>>8;return(t^4294967295)>>>0}function js(o){const e=new TextEncoder,t=[],n=[];let s=0;o.forEach(d=>{n.push(s);const p=e.encode(d.name),g=e.encode(d.content),m=ls(g),u=new ArrayBuffer(30),b=new DataView(u);b.setUint32(0,67324752,!0),b.setUint16(4,10,!0),b.setUint16(6,0,!0),b.setUint16(8,0,!0),b.setUint16(10,0,!0),b.setUint16(12,0,!0),b.setUint32(14,m,!0),b.setUint32(18,g.length,!0),b.setUint32(22,g.length,!0),b.setUint16(26,p.length,!0),b.setUint16(28,0,!0);const z=new Uint8Array(u);t.push(z),t.push(p),t.push(g),s+=z.length+p.length+g.length});const a=s;let r=0;o.forEach((d,p)=>{const g=e.encode(d.name),m=e.encode(d.content),u=ls(m),b=n[p],z=new ArrayBuffer(46),x=new DataView(z);x.setUint32(0,33639248,!0),x.setUint16(4,20,!0),x.setUint16(6,10,!0),x.setUint16(8,0,!0),x.setUint16(10,0,!0),x.setUint16(12,0,!0),x.setUint16(14,0,!0),x.setUint32(16,u,!0),x.setUint32(20,m.length,!0),x.setUint32(24,m.length,!0),x.setUint16(28,g.length,!0),x.setUint16(30,0,!0),x.setUint16(32,0,!0),x.setUint16(34,0,!0),x.setUint16(36,0,!0),x.setUint32(38,32,!0),x.setUint32(42,b,!0);const O=new Uint8Array(z);t.push(O),t.push(g),r+=O.length+g.length,s+=O.length+g.length});const i=new ArrayBuffer(22),l=new DataView(i);return l.setUint32(0,101010256,!0),l.setUint16(4,0,!0),l.setUint16(6,0,!0),l.setUint16(8,o.length,!0),l.setUint16(10,o.length,!0),l.setUint32(12,r,!0),l.setUint32(16,a,!0),l.setUint16(20,0,!0),t.push(new Uint8Array(i)),new Blob(t,{type:"application/zip"})}const pt=new BroadcastChannel("wiki-db-sync");pt.onmessage=async o=>{o.data==="refresh"&&(await Ie(),await ve())};let to=localStorage.getItem("secops-wiki-last-update")||"0";window.addEventListener("focus",async()=>{const o=localStorage.getItem("secops-wiki-last-update")||"0";o!==to&&(to=o,await Ie(),await ve())});let Fn=null;const ei=15*60*1e3;let Hs;async function ti(){Bs(),Hs=document.getElementById("app"),await so(),await mo();try{await no()}catch(e){console.warn("Failed to purge expired pages on init:",e)}try{await hs(30)}catch(e){console.warn("Failed to auto-prune audit logs on init:",e)}oi(),localStorage.getItem("secops-wiki-db-encrypted")==="true"&&!pe?Ti():(await Ie(),Fs(),qs(),window.addEventListener("hashchange",gn),window.addEventListener("online",mn),window.addEventListener("offline",mn),window.addEventListener("beforeinstallprompt",e=>{e.preventDefault(),Pt=e;const t=document.getElementById("pwa-install-btn");t&&t.classList.remove("hidden")}),window.addEventListener("keydown",e=>{var t,n;if((e.ctrlKey&&e.key==="k"||e.ctrlKey&&e.key==="K")&&(e.preventDefault(),jt()),e.key==="/"&&((t=document.activeElement)==null?void 0:t.tagName)!=="INPUT"&&((n=document.activeElement)==null?void 0:n.tagName)!=="TEXTAREA"&&(e.preventDefault(),jt()),e.ctrlKey&&e.altKey&&(e.key==="e"||e.key==="E"))if(e.preventDefault(),Xe){const s=document.getElementById("edit-page-form");s&&s.requestSubmit()}else se&&se!=="home"&&se!=="system"&&(window.location.hash=`#/edit/${se}`)}),gn(),setInterval(async()=>{try{await no()}catch(e){console.warn("Failed periodic expired page purge:",e)}},3e4))}function yt(){Fn&&clearTimeout(Fn),Fn=setTimeout(ni,ei),window.lastHeartbeat||(window.lastHeartbeat=Date.now()),Date.now()-window.lastHeartbeat>5*60*1e3&&(de("SESSION_HEARTBEAT","User activity heartbeat"),window.lastHeartbeat=Date.now())}function ni(){const o=document.getElementById("idle-lock-screen");if(!o)return;const e=localStorage.getItem("secops-wiki-db-encrypted")==="true";e&&(pe=null,G=null,ve().catch(()=>{}));const t=localStorage.getItem("secops-wiki-webauthn-gate")==="true";if(e){o.innerHTML=`
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
    `;const n=o.querySelector("#idle-unlock-form"),s=o.querySelector("#idle-unlock-password-input"),a=o.querySelector("#idle-lock-error"),r=o.querySelector("#idle-unlock-biometric-btn");setTimeout(()=>s==null?void 0:s.focus(),50),n.addEventListener("submit",async i=>{i.preventDefault(),a.classList.add("hidden");const l=s.value;try{const d=await Le(l);await St(d)?(pe=d,await Ie(),Wn(),await ve(),await de("SESSION_RESTORE","Restored session via master passphrase.")):a.classList.remove("hidden")}catch{a.classList.remove("hidden")}}),r&&r.addEventListener("click",async()=>{a.classList.add("hidden");try{const i=localStorage.getItem("secops-wiki-webauthn-payload")||"",l=crypto.getRandomValues(new Uint8Array(32)),d=await navigator.credentials.get({publicKey:{challenge:l,rpId:window.location.hostname||"localhost",userVerification:"required",timeout:6e4}});if(d){const p=new Uint8Array(d.rawId),g=Array.from(p).map(Z=>Z.toString(16).padStart(2,"0")).join(""),m=localStorage.getItem("secops-wiki-webauthn-salt")||"";if(!m)throw new Error("Biometric salt missing.");const u=`${g}:${m}`,b=await Le(u),z=await me(i,b),x=await Le(z);await St(x)?(pe=x,await Ie(),Wn(),await ve(),await de("SESSION_RESTORE_BIOMETRIC","Restored session via biometric WebAuthn verification.")):a.classList.remove("hidden")}}catch(i){alert(`Biometric verification failed: ${i.message}`),await de("WEBAUTHN_FAIL",`Idle lock biometric unlock failed: ${i.message}`)}})}else o.innerHTML=`
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
    `,o.querySelector("#idle-unlock-btn").addEventListener("click",()=>{Wn()});o.classList.remove("hidden")}function Wn(){const o=document.getElementById("idle-lock-screen");o&&o.classList.add("hidden"),yt()}function Fs(){let o=document.getElementById("idle-lock-screen");o||(o=document.createElement("div"),o.id="idle-lock-screen",o.className="fixed inset-0 bg-[#090d16]/95 backdrop-blur-md z-50 flex flex-col items-center justify-center hidden",document.body.appendChild(o)),yt(),window.addEventListener("mousemove",yt,{passive:!0}),window.addEventListener("keydown",yt,{passive:!0}),window.addEventListener("click",yt,{passive:!0}),window.addEventListener("scroll",yt,{passive:!0})}function cs(){if(document.getElementById("pwa-update-toast"))return;const o=document.createElement("div");o.id="pwa-update-toast",o.className="fixed bottom-4 right-4 z-50 max-w-sm glass-panel border border-teal-500/30 p-4 rounded-xl shadow-2xl glow-border flex items-center justify-between gap-4 font-mono text-xs select-none",o.innerHTML=`
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
  `,document.body.appendChild(o);const e=document.getElementById("pwa-update-reload-btn");e&&e.addEventListener("click",()=>{window.location.reload()})}function oi(){"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/wiki/sw.js").then(o=>{console.log("ServiceWorker registered successfully with scope: ",o.scope),o.waiting&&cs(),o.addEventListener("updatefound",()=>{const e=o.installing;e&&e.addEventListener("statechange",()=>{e.state==="installed"&&navigator.serviceWorker.controller&&cs()})})}).catch(o=>{console.error("ServiceWorker registration failed: ",o)})})}function mn(){_s=navigator.onLine?"SECURE_LINK":"OFFLINE_CACHE";const o=document.getElementById("system-status-indicator"),e=document.getElementById("system-status-label");o&&e&&(navigator.onLine?(o.className="w-2 h-2 rounded-full bg-emerald-400 glow-text-emerald pulse-indicator",e.innerText="SECURE_LINK",e.className="text-xs text-emerald-400 font-mono tracking-wider"):(o.className="w-2 h-2 rounded-full bg-amber-500 pulse-indicator",e.innerText="OFFLINE_CACHE",e.className="text-xs text-amber-500 font-mono tracking-wider"))}async function Ie(){ge=await fo(),await ki(),to=localStorage.getItem("secops-wiki-last-update")||"0"}async function no(){const o=await Ht(),e=Date.now();let t=!1;for(const n of o)n.expiresAt&&e>n.expiresAt&&(await us(n.slug),await de("SELF_DESTRUCT_EXPIRY",`Intel Entry "${n.title}" (slug: ${n.slug}) has self-destructed due to lease expiration.`),t=!0,se===n.slug&&(se="home",window.location.hash="#/page/home"));t&&(await Ie(),await ve(),pt.postMessage("refresh"))}async function gn(){await no();const o=window.location.hash||"#/page/home";Xe=!1,Ne=!1;let e="";if(o.startsWith("#/page/")){const n=o.replace("#/page/","").split("#");se=n[0],n.length>1&&(e=n[1])}else o.startsWith("#/edit/")?(se=o.replace("#/edit/",""),Xe=!0):o==="#/new"?(Xe=!0,Ne=!0,se=""):o==="#/system"?se="system":o==="#/graph"?se="graph":o.startsWith("#/import-p2p")?se="import-p2p":se="home";!Xe&&se&&se!=="system"&&se!=="graph"&&Gr(se),await ve(),e&&setTimeout(()=>{const t=document.getElementById(e);t&&t.scrollIntoView({behavior:"smooth"})},50)}function qn(o){const e=o.filter(a=>a.isSystem),t=o.filter(a=>!a.isSystem&&a.isEncrypted),n=o.filter(a=>!a.isSystem&&!a.isEncrypted);let s="";return e.length>0&&(s+=`
      <div class="mb-4">
        <div class="px-3 mb-1.5 text-[9px] font-bold text-slate-500 uppercase tracking-widest font-mono flex items-center gap-1 select-none">
          ⚙️ SYSTEM PROCEDURES
        </div>
        <div class="space-y-0.5">
          ${e.map(a=>Gn(a)).join("")}
        </div>
      </div>
    `),t.length>0&&(s+=`
      <div class="mb-4">
        <div class="px-3 mb-1.5 text-[9px] font-bold text-red-400/80 uppercase tracking-widest font-mono flex items-center gap-1 select-none">
          🔒 SECURE CORES
        </div>
        <div class="space-y-0.5">
          ${t.map(a=>Gn(a)).join("")}
        </div>
      </div>
    `),n.length>0&&(s+=`
      <div class="mb-4">
        <div class="px-3 mb-1.5 text-[9px] font-bold text-teal-400/80 uppercase tracking-widest font-mono flex items-center gap-1 select-none">
          📄 OPERATIONAL INTEL
        </div>
        <div class="space-y-0.5">
          ${n.map(a=>Gn(a)).join("")}
        </div>
      </div>
    `),s}function Gn(o){const e=se===o.slug&&!Xe,t=o.isEncrypted&&!G&&nt,n=t?"[REDACTED CORE]":o.title,s=t?"javascript:void(0)":`#/page/${o.slug}`,a=t?`onclick="alert('SECURITY WARNING: Document is locked. Enter passphrase to decrypt cores first.');"`:"";let r="";if(je.trim().length>0){const i=o.isEncrypted&&!G,l=kt.find(d=>d.slug===o.slug)||o;if(!i&&l.content){const d=l.content.toLowerCase().indexOf(je.toLowerCase());if(d!==-1){const p=Math.max(0,d-20),g=Math.min(l.content.length,d+je.length+30);let m=l.content.substring(p,g);p>0&&(m="..."+m),g<l.content.length&&(m=m+"...");const u=R(m),b=new RegExp(`(${je.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")})`,"gi");r=`<div class="text-[10px] text-slate-500 font-mono mt-1 pl-4 break-all whitespace-normal leading-normal">${u.replace(b,'<span class="bg-teal-950 text-teal-350 px-0.5 rounded font-bold">$1</span>')}</div>`}}}return`
    <a href="${s}" ${a} class="block px-3 py-2 rounded-lg text-xs font-mono transition group ${e?"bg-teal-950/30 text-teal-400 font-bold border-l-2 border-teal-500":"text-slate-450 hover:bg-slate-900/40 hover:text-slate-200"}">
      <div class="flex items-center justify-between">
        <span class="truncate flex items-center gap-1.5">
          ${o.isEncrypted?'<span class="text-red-450 text-[9px]">🔒</span>':'<span class="text-slate-650 group-hover:text-slate-500 text-[9px]">⊙</span>'}
          ${R(n)}
        </span>
      </div>
      ${r}
    </a>
  `}async function ve(){await Ie();let o=ge;je.trim().length>0&&(o=o.map(u=>({page:u,score:zs(kt.find(b=>b.slug===u.slug)||u,je)})).filter(u=>u.score>0).sort((u,b)=>b.score-u.score).map(u=>u.page)),Ot&&(o=o.filter(u=>u.tags.includes(Ot)));const e=Array.from(new Set(ge.flatMap(u=>u.tags)));Hs.innerHTML=`
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
            <span id="system-status-label" class="text-xs ${navigator.onLine?"text-emerald-400":"text-amber-500"} font-mono tracking-wider">${_s}</span>
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
            <kbd class="text-[9px] bg-slate-900 border border-slate-800 text-slate-400 px-1.5 py-0.5 rounded font-mono select-none uppercase scale-90">Ctrl+K</kbd>
          </button>
        </div>

        
        <!-- Pinned Docs -->
        ${(()=>{const u=JSON.parse(localStorage.getItem("pinned_docs")||"[]"),b=ge.filter(z=>u.includes(z.slug));return b.length>0?`
            <div class="px-2 py-4 border-b border-slate-800/80 shrink-0">
              <div class="px-3 mb-2 flex items-center justify-between">
                <span class="text-xs font-semibold text-amber-500 uppercase tracking-widest font-mono flex items-center gap-1">? Pinned Docs</span>
              </div>
              <div class="space-y-1">
                ${qn(b)}
              </div>
            </div>`:""})()}
        
        <!-- Tag Filter Cloud -->
        ${e.length>0?`
          <div class="px-4 py-2 border-b border-slate-800/80 flex flex-wrap gap-1 max-h-24 overflow-y-auto shrink-0 select-none">
            <button class="tag-badge px-1.5 py-0.5 text-[9px] rounded-full font-mono transition ${Ot?"bg-slate-900 text-slate-400 hover:bg-slate-850":"bg-teal-500 text-slate-950 font-bold shadow-[0_0_8px_rgba(20,184,166,0.3)]"}" data-tag="">#ALL</button>
            ${e.map(u=>{const b=Qr(u);return`
                <button class="tag-badge px-1.5 py-0.5 text-[9px] rounded-full font-mono transition ${Ot===u?"bg-teal-500 text-slate-950 font-bold shadow-[0_0_8px_rgba(20,184,166,0.3)]":`${b.className} hover:opacity-85`}" data-tag="${R(u)}">#${R(u.toUpperCase())}</button>
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
            ${qn(o)}
            ${o.length===0?`
              <div class="text-center py-6 text-xs text-slate-650 font-mono">No entries found</div>
            `:""}
          </div>

          <div class="px-3 mb-2 mt-6 flex items-center justify-between border-t border-slate-900/60 pt-4 select-none shrink-0">
            <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">🏷️ Tag Explorer</span>
          </div>
          <div id="tag-tree-container" class="space-y-1 px-1 max-h-48 overflow-y-auto pr-1">
            ${Ys(Di(o))}
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
  `;const t=document.getElementById("wiki-search-input");t&&t.addEventListener("input",u=>{je=u.target.value;const b=kt.filter(x=>x.title.toLowerCase().includes(je.toLowerCase())||x.content.toLowerCase().includes(je.toLowerCase())||x.tags.some(O=>O.toLowerCase().includes(je.toLowerCase()))),z=document.getElementById("pages-list");z.innerHTML=qn(b),b.length===0&&(z.innerHTML='<div class="text-center py-6 text-xs text-slate-650 font-mono">No entries found</div>')});const n=document.getElementById("pwa-install-btn");n&&n.addEventListener("click",async()=>{if(Pt){Pt.prompt();const{outcome:u}=await Pt.userChoice;u==="accepted"&&console.log("User accepted the PWA install prompt"),Pt=null,n.classList.add("hidden")}});const s=document.getElementById("system-panic-btn");s&&s.addEventListener("click",async()=>{if(confirm("CRITICAL SYSTEM COMPROMISE PROTOCOL: Purge entire local database, clear all service worker caches, unregister service workers, and force self-destruct reload immediately?")){if(indexedDB.deleteDatabase("secops-wiki-db"),"caches"in window){const u=await caches.keys();await Promise.all(u.map(b=>caches.delete(b)))}if("serviceWorker"in navigator){const u=await navigator.serviceWorker.getRegistrations();await Promise.all(u.map(b=>b.unregister()))}localStorage.clear(),sessionStorage.clear(),G=null,window.history.replaceState(null,"","about:blank"),window.location.replace("about:blank")}});const a=document.getElementById("sidebar-toggle-btn"),r=document.getElementById("sidebar-close-btn"),i=document.getElementById("sidebar-backdrop"),l=()=>{const u=document.getElementById("sidebar"),b=document.getElementById("sidebar-backdrop");u&&b&&(u.classList.add("-translate-x-full"),b.classList.add("hidden"))},d=()=>{const u=document.getElementById("sidebar"),b=document.getElementById("sidebar-backdrop");u&&b&&(u.classList.remove("-translate-x-full"),b.classList.remove("hidden"))};a&&a.addEventListener("click",d),r&&r.addEventListener("click",l),i&&i.addEventListener("click",l),document.querySelectorAll("#sidebar a").forEach(u=>{u.addEventListener("click",()=>{window.innerWidth<768&&l()})});const g=document.getElementById("theme-toggle-btn");g&&g.addEventListener("click",Us),document.querySelectorAll(".tag-badge").forEach(u=>{u.addEventListener("click",async b=>{Ot=b.currentTarget.getAttribute("data-tag")||"",await ve()})});const m=document.getElementById("tag-tree-container");m&&(m.addEventListener("click",u=>{const b=u.target.closest(".tree-folder-header");if(b){const z=b.nextElementSibling,x=b.querySelector(".tree-folder-icon");if(z){const O=z.classList.toggle("hidden");x&&(x.style.transform=O?"rotate(0deg)":"rotate(90deg)")}}}),m.addEventListener("keydown",u=>{var Z,V;const b=document.activeElement;if(!b||!m.contains(b))return;const x=Array.from(m.querySelectorAll(".tree-folder-header, .tree-folder-children a")).filter(L=>{let y=L.parentElement;for(;y&&y!==m;){if(y.classList.contains("tree-folder-children")&&y.classList.contains("hidden"))return!1;y=y.parentElement}return!0}),O=x.indexOf(b);if(O!==-1){if(u.key==="ArrowDown"){u.preventDefault();const L=(O+1)%x.length;(Z=x[L])==null||Z.focus()}else if(u.key==="ArrowUp"){u.preventDefault();const L=(O-1+x.length)%x.length;(V=x[L])==null||V.focus()}else if(u.key==="Enter")u.preventDefault(),b.click();else if(u.key==="ArrowRight"){if(u.preventDefault(),b.classList.contains("tree-folder-header")){const L=b.nextElementSibling,y=b.querySelector(".tree-folder-icon");L&&L.classList.contains("hidden")&&(L.classList.remove("hidden"),y&&(y.style.transform="rotate(90deg)"))}}else if(u.key==="ArrowLeft"&&(u.preventDefault(),b.classList.contains("tree-folder-header"))){const L=b.nextElementSibling,y=b.querySelector(".tree-folder-icon");L&&!L.classList.contains("hidden")&&(L.classList.add("hidden"),y&&(y.style.transform="rotate(0deg)"))}}})),await si()}async function si(){const o=document.getElementById("main-content");if(se==="graph"){await vi(o);return}if(se==="system"){zt(o);return}if(se==="import-p2p"){await _i(o);return}if(Xe){await Ws(o);return}await hn(o)}async function hn(o){const e=await He(se);if(!e){o.innerHTML=`
      <div class="text-center py-20 bg-slate-950/40 border border-red-950/20 rounded-xl px-6 glow-border">
        <svg class="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
        </svg>
        <h2 class="text-2xl font-bold font-mono text-white mb-2 uppercase">DATA_MISSING</h2>
        <p class="text-slate-400 text-sm max-w-md mx-auto mb-6">Requested intel document slug "${R(se)}" is not registered in index database.</p>
        <a href="#/new" class="px-4 py-2 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 font-mono text-xs uppercase rounded transition hover:text-white">
          Create New Document
        </a>
      </div>
    `;return}const t=await Si(e.slug);let n=e.content,s=!1;if(e.isEncrypted)if(G)try{n=await me(e.content,G)}catch{s=!0}else s=!0;if(s){const N=rs();let F="";if(N&&(F=`<p class="text-red-500 text-xs font-mono font-bold mt-2 animate-pulse uppercase">SECURITY LOCKOUT: Too many failures. Locked out for ${Math.ceil((eo()-Date.now())/1e3)}s.</p>`),o.innerHTML=`
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
        <div id="decrypt-lockout-timer">${F}</div>
      </div>
    `,N){const v=setInterval(async()=>{const H=Math.ceil((eo()-Date.now())/1e3),Q=document.getElementById("decrypt-lockout-timer");H<=0?(clearInterval(v),await hn(o)):Q&&(Q.innerHTML=`<p class="text-red-500 text-xs font-mono font-bold mt-2 animate-pulse uppercase">SECURITY LOCKOUT: Too many failures. Locked out for ${H}s.</p>`)},1e3)}setTimeout(()=>{const v=document.getElementById("decrypt-password-input");v==null||v.focus()},50),document.getElementById("decrypt-doc-form").addEventListener("submit",async v=>{if(v.preventDefault(),rs()){alert("Security Lockout active.");return}const H=document.getElementById("decrypt-password-input").value;try{const Q=await Le(H);await me(e.content,Q),Zr(),G=Q,await ve()}catch{Yr(),alert("Security Alert: Authentication failed. Invalid security passphrase."),await hn(o)}});return}const a=n.split(/\s+/).filter(N=>N.length>0).length,r=Math.max(1,Math.round(a/200)),i=Et(n),l=new Date(e.updatedAt).toLocaleString(),d=document.createElement("div");d.innerHTML=i,qr(d);const p=d.innerHTML,g=Jr(p,je),m=d.querySelectorAll("h1, h2, h3");let u="";m.length>0&&(u=`
      <div class="hidden lg:block w-60 shrink-0 self-start sticky top-8">
        <div class="glass-panel border border-slate-800/80 rounded-xl p-4">
          <h4 class="text-xs font-bold font-mono text-slate-400 uppercase tracking-widest border-b border-slate-800/60 pb-2 mb-3">Outline</h4>
          <nav class="space-y-2 text-xs font-mono max-h-[350px] overflow-y-auto pr-1">
            ${Array.from(m).map(N=>{const F=N.textContent||"",I=N.id||F.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,""),v=N.tagName.toLowerCase(),H=v==="h1"?"pl-0 font-semibold":v==="h2"?"pl-3 border-l border-slate-800":"pl-6 border-l border-slate-800";return`
                <a href="#/page/${e.slug}#${I}" class="block text-slate-500 hover:text-teal-400 transition truncate ${H}" title="${R(F)}">
                  ${R(F)}
                </a>
              `}).join("")}
          </nav>
        </div>
      </div>
    `);const b=n.match(/^(\s*[-*] )\[ \]/gm)||[],z=n.match(/^(\s*[-*] )\[[xX]\]/gm)||[],x=b.length+z.length;let O="";if(x>0){const N=z.length,F=Math.round(N/x*100),I=10,v=Math.round(N/x*I),H=I-v;O=`
      <div class="glass-panel border border-slate-800/80 p-3 rounded-lg flex items-center justify-between mb-6 text-[10px] sm:text-xs font-mono select-none">
        <div class="flex items-center gap-2 sm:gap-3">
          <span class="text-teal-400 font-bold">📋 TASK STATUS:</span>
          <span class="text-slate-400 font-bold">${"█".repeat(v)+"░".repeat(H)}</span>
          <span class="text-teal-400 font-bold">${F}%</span>
        </div>
        <div class="text-slate-500">
          ${N}/${x} COMPLETED
        </div>
      </div>
    `}let Z="";try{const N=JSON.parse(sessionStorage.getItem("secops-wiki-breadcrumbs")||"[]");N.length>1&&(Z=`
        <div class="flex items-center gap-1.5 text-[10px] font-mono text-slate-500 mb-3 select-none overflow-x-auto whitespace-nowrap pb-1">
          <span class="text-slate-600 uppercase">RECENT:</span>
          ${N.map((F,I)=>{const v=Vr(F),Q=F===e.slug?"text-teal-400 font-bold":"text-slate-450 hover:text-slate-350 transition",w=I<N.length-1?'<span class="text-slate-850">/</span>':"";return`
              <a href="#/page/${F}" class="${Q}">${R(v)}</a>
              ${w}
            `}).join("")}
        </div>
      `)}catch{}let V="";e.signature?await Ze(e)!==e.signature?V=`<span class="px-2 py-0.5 bg-red-950/40 text-red-400 border border-red-900/30 rounded text-[9px] font-mono font-bold animate-pulse">⚠️ INTEGRITY FAIL</span>
                            <button id="reconcile-integrity-btn" class="ml-1.5 px-2 py-0.5 bg-red-950/50 hover:bg-red-900/40 text-red-400 hover:text-white border border-red-900/30 hover:border-red-700 rounded text-[9px] font-mono font-bold uppercase transition">Reconcile</button>`:V='<span class="px-2 py-0.5 bg-emerald-950/40 text-emerald-400 border border-emerald-900/30 rounded text-[9px] font-mono font-bold">✓ INTEGRITY OK</span>':V='<span class="px-2 py-0.5 bg-amber-950/40 text-amber-400 border border-amber-900/30 rounded text-[9px] font-mono font-bold">⚠️ UNSIGNED</span>',e.isEncrypted?document.body.classList.add("encrypted-page-active"):document.body.classList.remove("encrypted-page-active");const L=e.classification||"UNCLASSIFIED";let y="border-emerald-500/20 text-emerald-400 bg-emerald-950/10",S="classification-glow-unclassified";L==="CONFIDENTIAL"?(y="border-blue-500/20 text-blue-400 bg-blue-950/10",S="classification-glow-confidential"):L==="SECRET"?(y="border-amber-500/20 text-amber-500 bg-amber-950/10",S="classification-glow-secret"):L==="TOP SECRET"&&(y="border-red-500/30 text-red-500 bg-red-950/10 animate-pulse",S="classification-glow-topsecret");const A=`
    <div class="border ${y} px-4 py-1.5 rounded-lg text-center text-[10px] font-bold font-mono uppercase tracking-widest select-none mb-6">
      ✦ ${L} ✦
    </div>
  `,K=`
    <div class="border ${y} px-4 py-1.5 rounded-lg text-center text-[10px] font-bold font-mono uppercase tracking-widest select-none mt-8">
      ✦ ${L} ✦
    </div>
  `;o.innerHTML=`
    <div class="flex gap-8 items-start">
      <!-- Main Content Area -->
      <div class="flex-1 min-w-0 glass-panel border rounded-xl p-5 md:p-6 shadow-xl ${S}">
        <!-- Breadcrumb navigation trail -->
        ${Z}
        
        <!-- Top Classification Banner -->
        ${A}
        <!-- Page Header telemetry -->
        <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between border-b border-slate-800 pb-6 mb-6 gap-4">
          <div>
            <h2 class="text-2xl md:text-3xl font-extrabold text-white font-mono tracking-tight">${R(e.title)}</h2>
            <div class="flex flex-wrap items-center gap-3 mt-3">
              <span class="text-xs font-mono text-slate-500 uppercase">SYS_REF: ${R(e.slug)}</span>
              <span class="h-3 w-px bg-slate-800"></span>
              <span class="text-xs font-mono text-slate-500 uppercase">UPDATED: ${l}</span>
              <span class="h-3 w-px bg-slate-800"></span>
              <span class="text-xs font-mono text-teal-400 uppercase">⏱️ ${r} MIN READ</span>
              ${V}
              <span class="h-3 w-px bg-slate-800"></span>
              ${e.tags.map(N=>Wr(N)).join("")}
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

            
            <button id="pin-page-btn" class="flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-slate-800 hover:border-amber-500/50 hover:text-amber-400 text-slate-300 font-mono text-xs rounded transition uppercase">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              <span id="pin-page-text">Pin</span>
            </button>
            <button id="clone-page-btn" class="flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-white text-slate-300 font-mono text-xs rounded transition uppercase">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path>
              </svg>
              Clone
            </button>
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
        ${O}
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
              ${t.map((N,F)=>`
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-3 first:pt-0">
                  <div class="min-w-0">
                    <p class="text-xs font-mono text-slate-300 break-words">REV_${t.length-F} // ${R(N.title)}</p>
                    <p class="text-[10px] font-mono text-slate-500">${new Date(N.updatedAt).toLocaleString()}</p>
                  </div>
                  <button class="restore-rev-btn px-2.5 py-1 bg-slate-900 border border-slate-800 hover:border-slate-700 text-teal-400 hover:text-teal-300 font-mono text-[10px] rounded transition uppercase shrink-0 self-start sm:self-auto" data-rev-id="${R(N.id)}">
                    ROLLBACK
                  </button>
                  <button class="view-rev-diff-btn px-2.5 py-1 bg-slate-900 border border-slate-800 hover:border-slate-700 text-blue-400 hover:text-blue-300 font-mono text-[10px] rounded transition uppercase shrink-0 self-start sm:self-auto" data-rev-id="${R(N.id)}">
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
        ${K}
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
  `;const j=document.getElementById("pin-page-btn"),U=document.getElementById("pin-page-text");if(j&&U){let N=JSON.parse(localStorage.getItem("pinned_docs")||"[]");N.includes(e.slug)&&(j.classList.add("text-amber-400"),U.innerText="Unpin"),j.addEventListener("click",()=>{N=JSON.parse(localStorage.getItem("pinned_docs")||"[]"),N.includes(e.slug)?(N=N.filter(F=>F!==e.slug),j.classList.remove("text-amber-400"),U.innerText="Pin"):(N.push(e.slug),j.classList.add("text-amber-400"),U.innerText="Unpin"),localStorage.setItem("pinned_docs",JSON.stringify(N)),ve()})}const te=document.getElementById("page-export-dropdown-btn"),ie=document.getElementById("page-export-menu");if(te&&ie){te.addEventListener("click",_=>{_.stopPropagation(),ie.classList.toggle("hidden")}),document.addEventListener("click",()=>{ie.classList.add("hidden")});const N=document.getElementById("clone-page-btn");N&&N.addEventListener("click",async()=>{const _=e.slug+"-copy",M={...e,slug:_,title:"Copy of "+e.title,id:crypto.randomUUID(),createdAt:Date.now(),updatedAt:Date.now()};await Me(M),window.location.hash=`#/edit/${_}`});const F=document.querySelectorAll(".toc-link");if(F.length>0){const _=new IntersectionObserver(M=>{M.forEach(B=>{B.isIntersecting&&F.forEach(h=>{h.classList.remove("text-teal-400","font-bold"),h.getAttribute("data-id")===B.target.id&&h.classList.add("text-teal-400","font-bold")})})},{rootMargin:"0px 0px -80% 0px"});document.querySelectorAll("h1, h2, h3").forEach(M=>_.observe(M))}const I=document.getElementById("read-progress");if(I){const _=()=>{const M=document.documentElement.scrollHeight-document.documentElement.clientHeight;if(M>0){const B=window.scrollY/M*100;I.style.width=B+"%"}};window.addEventListener("scroll",_)}document.getElementById("export-single-md").addEventListener("click",async()=>{let _=e.content;if(e.isEncrypted&&G)try{_=await me(e.content,G)}catch{}const M=`---
title: ${e.title}
slug: ${e.slug}
tags: ${e.tags.join(", ")}
updated: ${new Date(e.updatedAt).toISOString()}
encrypted: ${!!e.isEncrypted}
---

`,B=new Blob([M+_],{type:"text/markdown;charset=utf-8;"}),h=URL.createObjectURL(B),D=document.createElement("a");D.href=h,D.download=`${e.slug}.md`,document.body.appendChild(D),D.click(),document.body.removeChild(D),URL.revokeObjectURL(h)}),document.getElementById("export-single-html").addEventListener("click",async()=>{let _=e.content;if(e.isEncrypted&&G)try{_=await me(e.content,G)}catch{}const M=Et(_),B=`<!DOCTYPE html>
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
    Tags: ${e.tags.map($=>`<span class="badge">#${R($)}</span>`).join("")}
  </div>
  <article>
    ${M}
  </article>
</body>
</html>`,h=new Blob([B],{type:"text/html;charset=utf-8;"}),D=URL.createObjectURL(h),T=document.createElement("a");T.href=D,T.download=`${e.slug}.html`,document.body.appendChild(T),T.click(),document.body.removeChild(T),URL.revokeObjectURL(D)}),document.getElementById("export-single-print").addEventListener("click",()=>{window.print()});const w=document.getElementById("export-single-p2p");w&&w.addEventListener("click",async()=>{let _=e.content;if(e.isEncrypted&&G)try{_=await me(e.content,G)}catch{}const M=prompt("Create a secure sharing passphrase for this peer link (min 4 characters):");if(M){if(M.length<4){alert("Security Requirement: Passphrase must be at least 4 characters long.");return}try{const B=await Le(M),h={title:e.title,content:_,tags:e.tags,classification:e.classification||"UNCLASSIFIED"},D=await ot(JSON.stringify(h),B),T=btoa(D),$=`${window.location.origin}${window.location.pathname}#/import-p2p?data=${encodeURIComponent(T)}&key=${encodeURIComponent(M)}`;await navigator.clipboard.writeText($),alert("✓ SECURE P2P LINK GENERATED: The encrypted link has been copied to your clipboard. Share it securely with your peer."),await de("P2P_LINK_EXPORT",`Generated secure share link for document: ${e.title}`)}catch(B){alert(`Encryption error: Failed to generate sharing link - ${B.message}`)}}});const C=document.getElementById("reconcile-integrity-btn");C&&C.addEventListener("click",async()=>{if(!confirm(`RECONCILIATION NOTICE: Confirm restoration of document "${e.title}" to its last cryptographically verified historical revision? Unverified changes will be discarded.`))return;let M=!1;for(const B of t)if(B.signature&&await Ze({slug:B.slug,title:B.title,content:B.content,updatedAt:B.updatedAt,tags:B.tags||[]})===B.signature){await Me({slug:B.slug,title:B.title,content:B.content,updatedAt:Date.now(),tags:B.tags||[],classification:B.classification||"UNCLASSIFIED",isSystem:e.isSystem,isEncrypted:B.isEncrypted}),M=!0;break}M?(alert("✓ RECONCILIATION COMPLETED: The document has been restored to its last verified authentic state."),await Ie(),await ve()):(alert("⚠️ RECONCILIATION FAILED: No historical revision could be cryptographically verified. Check audit logs."),await de("RECONCILE_FAILED",`Reconciliation failed for "${e.title}". No authentic revisions found.`))})}const ue=document.getElementById("delete-page-btn");ue&&ue.addEventListener("click",async()=>{confirm(`CRITICAL SYSTEM NOTICE: Confirm total purge of intel document "${e.title}"? This action is irreversible.`)&&(await us(e.slug),localStorage.setItem("secops-wiki-last-update",Date.now().toString()),pt.postMessage("refresh"),window.location.hash="#/page/home")}),o.querySelectorAll("pre").forEach(N=>{const F=document.createElement("div");F.className="relative group",N.parentNode.insertBefore(F,N),F.appendChild(N);const I=document.createElement("button");I.className="absolute top-2 right-2 px-2 py-1 bg-slate-900/80 hover:bg-slate-800 text-[10px] text-slate-400 hover:text-white font-mono rounded opacity-0 group-hover:opacity-100 transition focus:opacity-100 border border-slate-800 focus:outline-none",I.textContent="COPY",I.addEventListener("click",()=>{var H;const v=((H=N.querySelector("code"))==null?void 0:H.textContent)||N.textContent||"";navigator.clipboard.writeText(v).then(()=>{I.textContent="COPIED",setTimeout(()=>I.textContent="COPY",2e3),document.body.classList.contains("encrypted-page-active")&&Ps()})}),F.appendChild(I)}),o.querySelectorAll(".restore-rev-btn").forEach(N=>{N.addEventListener("click",async F=>{const I=F.currentTarget.getAttribute("data-rev-id"),v=t.find(H=>H.id===I);if(v&&confirm(`ROLLBACK COMMAND: Revert current page content to revision state "${v.title}" saved on ${new Date(v.updatedAt).toLocaleString()}?`)){const H=await He(e.slug);H&&await ho({id:`${H.slug}-${Date.now()}`,slug:H.slug,title:H.title,content:H.content,updatedAt:Date.now(),tags:H.tags,classification:H.classification,signature:H.signature}),await Me({slug:v.slug,title:v.title,content:v.content,updatedAt:Date.now(),tags:e.tags,isSystem:e.isSystem}),alert("Revision successfully restored."),await Ie(),await ve()}})}),o.querySelectorAll('.wiki-content input[type="checkbox"]').forEach((N,F)=>{const I=N;I.removeAttribute("disabled"),I.classList.add("cursor-pointer","accent-teal-500"),I.addEventListener("change",async v=>{const H=v.target;await wi(e.slug,F,H.checked)})}),await Ii(o),$i(o)}async function Ws(o){let e="",t="",n="",s=[],a=!1,r=!1,i="UNCLASSIFIED",l=0;if(!Ne){const h=await He(se);if(h&&(e=h.title,t=h.slug,n=h.content,s=[...h.tags],a=!!h.isSystem,r=!!h.isEncrypted,i=h.classification||"UNCLASSIFIED",h.expiresAt&&h.updatedAt&&(l=Math.round((h.expiresAt-h.updatedAt)/6e4)),h.isEncrypted))if(G)try{n=await me(h.content,G)}catch{n="ERROR: Decryption key mismatch. Please go back and re-decrypt."}else n="ERROR: This page is encrypted. Decrypt it in the reader view first."}const d=`secops-wiki-draft-${Ne?"new":se}`;let p="";const g=localStorage.getItem(d);if(g)try{const h=JSON.parse(g);e=h.title||e,n=h.content||n,Array.isArray(h.tags)?s=h.tags:typeof h.tags=="string"&&(s=h.tags.split(",").map(D=>D.trim()).filter(D=>D.length>0)),p=`
        <div id="draft-restore-banner" class="bg-teal-950/40 border border-teal-800 text-teal-400 p-3 rounded-lg text-xs font-mono mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <span>RESTORED DRAFT: Unsaved changes restored (${new Date(h.updatedAt).toLocaleTimeString()})</span>
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
            <input type="checkbox" id="edit-encrypt" ${r?"checked":""} class="w-4 h-4 rounded border-slate-850 bg-slate-950 text-teal-500 focus:ring-teal-500/50 cursor-pointer">
            <label for="edit-encrypt" class="text-xs font-semibold text-slate-400 uppercase tracking-widest font-mono cursor-pointer select-none">Encrypt Document (AES-GCM)</label>
          </div>
          <div class="flex gap-3 justify-end self-end sm:self-auto">
            <a href="${Ne?"#/page/home":`#/page/${se}`}" id="cancel-edit-btn" class="px-4 py-2 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 font-mono text-xs uppercase rounded transition hover:text-white">
              Cancel
            </a>
            <button type="submit" class="px-4 py-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-mono text-xs uppercase rounded font-bold transition shadow-[0_0_10px_rgba(20,184,166,0.15)]">
              Commit Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  `;const m=document.getElementById("edit-page-form"),u=document.getElementById("edit-content"),b=document.getElementById("live-preview-box"),z=document.getElementById("cancel-edit-btn"),x=document.getElementById("discard-draft-btn"),O=document.getElementById("edit-tab-write"),Z=document.getElementById("edit-tab-preview"),V=document.getElementById("edit-content-container"),L=document.getElementById("live-preview-container");O&&Z&&V&&L&&(O.addEventListener("click",()=>{O.className="flex-1 py-2 text-center text-xs font-mono font-bold border-b-2 border-teal-500 text-teal-400",Z.className="flex-1 py-2 text-center text-xs font-mono font-bold border-b-2 border-transparent text-slate-500",V.className="block",L.className="hidden md:block"}),Z.addEventListener("click",()=>{Z.className="flex-1 py-2 text-center text-xs font-mono font-bold border-b-2 border-teal-500 text-teal-400",O.className="flex-1 py-2 text-center text-xs font-mono font-bold border-b-2 border-transparent text-slate-500",L.className="block",V.className="hidden md:block"}));const y=()=>{const h=u.value,D=document.getElementById("editor-stats");if(D){const T=h.split(/\s+/).filter(ne=>ne.length>0).length,$=h.length,W=h.split(`
`).length;D.innerText=`Words: ${T} | Chars: ${$} | Lines: ${W}`}if(h.trim().length===0){b.innerHTML='<span class="text-slate-600 font-mono text-xs">No input content.</span>';return}b.innerHTML=Et(h)};function S(h){const D=h.trim().split(`
`);if(D.length<2)return h;const T=D.map(q=>{let Ee=q.trim();return Ee.startsWith("|")&&(Ee=Ee.slice(1)),Ee.endsWith("|")&&(Ee=Ee.slice(0,-1)),Ee.split("|").map(X=>X.trim())}),$=Math.max(...T.map(q=>q.length));if($===0)return h;const W=Array($).fill(0);for(let q=0;q<T.length;q++){const Ee=q===1&&T[q].every(X=>/^:-*-*:?$/.test(X)||/^-+$/.test(X));for(let X=0;X<$;X++){const ke=T[q][X]||"";!Ee&&ke.length>W[X]&&(W[X]=ke.length)}}for(let q=0;q<$;q++)W[q]=Math.max(W[q],3);return T.map((q,Ee)=>{const X=Ee===1&&q.every(ae=>/^:-*-*:?$/.test(ae)||/^-+$/.test(ae));return`| ${Array($).fill("").map((ae,Ce)=>{const xe=q[Ce]||"";if(X){const $e=xe.startsWith(":"),Tt=xe.endsWith(":"),At=W[Ce]-($e?1:0)-(Tt?1:0);return($e?":":"")+"-".repeat(Math.max(1,At))+(Tt?":":"")}else return xe.padEnd(W[Ce]," ")}).join(" | ")} |`}).join(`
`)}const A=document.getElementById("toolbar-sketch-btn");A&&A.addEventListener("click",()=>{Li(u)}),Ai(u);const K=h=>{const D=u.selectionStart,T=u.selectionEnd,$=u.value,W=$.substring(D,T);let ne="";switch(h){case"bold":ne=`**${W||"bold_text"}**`;break;case"italic":ne=`*${W||"italic_text"}*`;break;case"header":ne=`
### ${W||"Header text"}
`;break;case"code":ne=`
\`\`\`javascript
${W||"// code here"}
\`\`\`
`;break;case"link":ne=`[${W||"Link text"}](url)`;break;case"table":if(W&&W.includes("|")&&W.includes(`
`))try{ne=`
`+S(W)+`
`}catch{ne=`
| Header 1 | Header 2 |
| -------- | -------- |
| Cell 1   | Cell 2   |
`}else ne=`
| Header 1 | Header 2 |
| -------- | -------- |
| Cell 1   | Cell 2   |
`;break;case"checklist":ne=`
- [ ] ${W||"Task description"}
`;break}u.value=$.substring(0,D)+ne+$.substring(T),u.focus(),u.selectionStart=D+ne.length,u.selectionEnd=D+ne.length,y()};o.querySelectorAll(".format-btn").forEach(h=>{h.addEventListener("click",D=>{const T=D.currentTarget.getAttribute("data-format")||"";K(T)})}),u.addEventListener("keyup",h=>{const D=u.value,T=u.selectionStart;if(D.substring(T-2,T)==="[[")rn=!0,ln=T,Qn="",bi(u);else if(rn){if(h.key==="Escape"||h.key==="ArrowUp"||h.key==="ArrowDown"||h.key==="Enter")return;const W=D.substring(ln,T);W.includes(`
`)||T<ln?cn():(Qn=W,Gs(u))}}),u.addEventListener("keydown",h=>{if(rn){const D=document.getElementById("autocomplete-popup");if(!D)return;const T=D.querySelectorAll(".editor-autocomplete-item");let $=Array.from(T).findIndex(W=>W.classList.contains("active"));h.key==="ArrowDown"?(h.preventDefault(),T.length>0&&($>=0&&T[$].classList.remove("active","bg-teal-950/20","text-teal-400"),$=($+1)%T.length,T[$].classList.add("active","bg-teal-950/20","text-teal-400"),T[$].scrollIntoView({block:"nearest"}))):h.key==="ArrowUp"?(h.preventDefault(),T.length>0&&($>=0&&T[$].classList.remove("active","bg-teal-950/20","text-teal-400"),$=($-1+T.length)%T.length,T[$].classList.add("active","bg-teal-950/20","text-teal-400"),T[$].scrollIntoView({block:"nearest"}))):h.key==="Enter"?(h.preventDefault(),$>=0?T[$].click():T.length>0&&T[0].click()):h.key==="Escape"&&(h.preventDefault(),cn())}}),u.addEventListener("input",()=>{y(),Q()}),y();const j=document.getElementById("tag-pills-container"),U=document.getElementById("tag-pill-input"),te=document.getElementById("tag-pill-dropdown"),ie=Array.from(new Set(ge.flatMap(h=>h.tags)));function ue(){if(!j||!U)return;j.querySelectorAll(".tag-badge-pill").forEach(T=>T.remove()),s.forEach(T=>{const $=document.createElement("span");$.className="tag-badge-pill flex items-center gap-1 text-[10px] font-mono bg-teal-950/40 text-teal-400 px-2 py-1 rounded border border-teal-900/30 select-none",$.innerHTML=`
        #${R(T)}
        <button type="button" class="tag-remove-btn hover:text-red-400 font-bold transition focus:outline-none" data-tag="${R(T)}">×</button>
      `,j.insertBefore($,U)}),j.querySelectorAll(".tag-remove-btn").forEach(T=>{T.addEventListener("click",$=>{const W=$.currentTarget.getAttribute("data-tag");W&&(s=s.filter(ne=>ne!==W),ue(),Q())})})}function N(){if(!te||!U)return;const h=U.value.trim().toLowerCase(),D=ie.filter($=>$.includes(h)&&!s.includes($));if(D.length===0){te.classList.add("hidden");return}te.innerHTML=D.map($=>`
      <div class="tag-dropdown-item px-3 py-2 cursor-pointer hover:bg-slate-900 hover:text-white text-slate-350 transition" data-tag="${R($)}">
        #${R($)}
      </div>
    `).join(""),te.classList.remove("hidden"),te.querySelectorAll(".tag-dropdown-item").forEach($=>{$.addEventListener("click",W=>{const ne=W.currentTarget.getAttribute("data-tag");ne&&!s.includes(ne)&&(s.push(ne),ue(),Q()),U.value="",te.classList.add("hidden"),U.focus()})})}U&&(U.addEventListener("keydown",h=>{if(h.key==="Enter"||h.key===","){h.preventDefault();const D=U.value.trim().toLowerCase().replace(/[^a-z0-9-_]/g,"");D&&!s.includes(D)&&(s.push(D),ue(),Q()),U.value="",te&&te.classList.add("hidden")}else h.key==="Backspace"&&U.value===""&&(s.pop(),ue(),Q())}),U.addEventListener("input",N),U.addEventListener("focus",N)),ue();const F=document.getElementById("editor-layout-grid"),I=document.getElementById("live-preview-container"),v=document.getElementById("toggle-split-btn");function H(){!F||!I||!v||(nn?(F.classList.remove("md:grid-cols-1"),F.classList.add("md:grid-cols-2"),I.classList.remove("md:hidden"),I.classList.add("md:block"),v.textContent="Full Width",v.classList.remove("text-slate-450"),v.classList.add("text-teal-400")):(F.classList.remove("md:grid-cols-2"),F.classList.add("md:grid-cols-1"),I.classList.remove("md:block"),I.classList.add("md:hidden"),v.textContent="Split Screen",v.classList.remove("text-teal-400"),v.classList.add("text-slate-450")))}v&&v.addEventListener("click",()=>{nn=!nn,localStorage.setItem("secops-wiki-split-screen",nn.toString()),H()}),H();const Q=()=>{var T;const h=(T=document.getElementById("edit-title"))==null?void 0:T.value,D=u.value;(h||D||s.length>0)&&localStorage.setItem(d,JSON.stringify({title:h,content:D,tags:s,updatedAt:Date.now()}))},w=setInterval(Q,5e3),C=()=>{clearInterval(w),window.removeEventListener("hashchange",C)};window.addEventListener("hashchange",C);const _=()=>{clearInterval(w),window.removeEventListener("hashchange",C),localStorage.removeItem(d),cn()};z.addEventListener("click",_),x&&x.addEventListener("click",()=>{var h;_(),(h=document.getElementById("draft-restore-banner"))==null||h.remove(),Ws(o)});const M=h=>{te&&!te.contains(h.target)&&h.target!==U&&te.classList.add("hidden")};document.addEventListener("click",M);const B=()=>{document.removeEventListener("click",M),window.removeEventListener("hashchange",B)};window.addEventListener("hashchange",B),m.addEventListener("submit",async h=>{h.preventDefault();const D=document.getElementById("edit-title").value.trim(),T=Ne?document.getElementById("edit-slug").value.trim().toLowerCase():t,$=u.value,W=document.getElementById("edit-encrypt").checked,ne=document.getElementById("edit-classification").value,q=document.getElementById("edit-expiry"),Ee=q?parseInt(q.value,10):0;if(Ne&&!/^[a-z0-9-_]+$/.test(T)){alert("Security Alert: Slug contains illegal characters. Use alphanumeric, hyphens, and underscores only.");return}const X=s.map(xe=>sn(xe.trim()).toLowerCase()).filter(xe=>xe.length>0),ke=await He(T);ke&&await ho({id:`${ke.slug}-${Date.now()}`,slug:ke.slug,title:ke.title,content:ke.content,updatedAt:ke.updatedAt,isEncrypted:ke.isEncrypted,tags:ke.tags,classification:ke.classification,signature:ke.signature});let ae=$;if(W){if(!G){const xe=prompt("Enter a security passphrase to encrypt this document (min 8 chars, mixed case, numbers, symbols):");if(!xe){alert("Encryption Aborted: A security passphrase is required to save an encrypted document.");return}const $e=Ms(xe);if(!$e.valid){alert(`SECURITY ERROR: Passphrase too weak.

${$e.message}`);return}G=await Le(xe)}try{ae=await ot($,G)}catch(xe){alert(`Encryption failure: ${xe.message}`);return}}const Ce={slug:T,title:D,content:ae,updatedAt:Date.now(),tags:X,isSystem:a,isEncrypted:W,classification:ne};Ee>0&&(Ce.expiresAt=Ce.updatedAt+Ee*60*1e3),Ce.signature=await Ze(Ce);try{await Me(Ce),_(),pt.postMessage("refresh"),window.location.hash=`#/page/${T}`}catch(xe){alert(`Database transaction error: ${xe.message}`)}})}function ai(o,e){let t=o.replace(/\.md$/i,"").replace(/[-_]+/g," ");t=t.split(" ").map(r=>r.charAt(0).toUpperCase()+r.slice(1)).join(" ");let n=o.replace(/\.md$/i,"").toLowerCase().replace(/[^a-z0-9-_]+/g,"-"),s=e,a=["imported"];if(e.startsWith("---")){const r=e.indexOf("---",3);if(r!==-1){const i=e.substring(3,r);s=e.substring(r+3).trim(),i.split(`
`).forEach(d=>{const p=d.indexOf(":");if(p!==-1){const g=d.substring(0,p).trim().toLowerCase(),m=d.substring(p+1).trim();g==="title"?t=m.replace(/^["']|["']$/g,""):g==="slug"?n=m.replace(/[^a-z0-9-_]+/g,"-").toLowerCase():g==="tags"&&(a=m.split(",").map(u=>u.trim().replace(/^["']|["']$/g,"")).filter(u=>u.length>0))}})}}return{slug:n,title:t,content:s,updatedAt:Date.now(),tags:a,isSystem:!1}}function ri(o){const e=["Title","Slug","Tags","Word Count","Encrypted","Last Updated"],t=o.map(n=>{const s=n.content.split(/\s+/).filter(a=>a.length>0).length;return[`"${n.title.replace(/"/g,'""')}"`,`"${n.slug}"`,`"${n.tags.join(", ")}"`,s,n.isEncrypted?"TRUE":"FALSE",`"${new Date(n.updatedAt).toISOString()}"`]});return[e.join(","),...t.map(n=>n.join(","))].join(`
`)}function ii(o){let e="";for(const t of o){let n=t.content;if(t.isEncrypted&&G)try{n=t.content.includes(":")?"🔒 [Encrypted Document: Passphrase Required]":t.content}catch{n="🔒 [Encrypted Document: Passphrase Required]"}const s=Et(n);e+=`
      <section style="page-break-after: always; margin-bottom: 3rem; border-bottom: 2px solid #e2e8f0; padding-bottom: 2rem;">
        <h1 style="font-size: 2.25rem; font-family: monospace; margin-bottom: 0.5rem; color: #1a202c;">${R(t.title)}</h1>
        <div style="font-size: 0.75rem; color: #718096; font-family: monospace; margin-bottom: 1.5rem;">
          SLUG: ${t.slug} | TAGS: #${t.tags.map(a=>R(a)).join(", #")} | UPDATED: ${new Date(t.updatedAt).toLocaleString()}
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
</html>`}function li(o){const e=[],t=o.map(s=>`<a href="${s.slug}.html" style="display: block; padding: 0.5rem; color: #94a3b8; text-decoration: none; font-family: monospace; font-size: 0.8rem; border-radius: 4px; transition: background 0.2s;" onmouseover="this.style.background='#1e293b'; this.style.color='#2dd4bf'" onmouseout="this.style.background='transparent'; this.style.color='#94a3b8'">${R(s.title)}</a>`).join(`
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
            SLUG: ${s.slug} | TAGS: #${s.tags.map(a=>R(a)).join(", #")} | UPDATED: ${new Date(s.updatedAt).toLocaleString()}
          </div>
        </div>
      `).join("")}
    </div>
  </main>
</body>
</html>`;return e.push({name:"index.html",content:n}),o.forEach(s=>{let a=s.content;if(s.isEncrypted&&G)try{a=s.content.includes(":")?"🔒 [Encrypted Document: Decrypted view not exported]":s.content}catch{a="🔒 [Encrypted Document: Decrypted view not exported]"}let r=Et(a);r=r.replace(/href="#\/page\/([a-z0-9-_]+)"/g,'href="$1.html"');const i=`<!DOCTYPE html>
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
      ${r}
    </article>
  </main>
</body>
</html>`;e.push({name:`${s.slug}.html`,content:i})}),js(e)}function ci(o){const e=[];let t="",n=!1;for(let l=0;l<o.length;l++){const d=o[l];d==='"'?(n=!n,t+=d):d===`
`&&!n?(e.push(t),t=""):t+=d}if(t&&e.push(t),e.length<2)return[];const s=l=>{const d=[];let p="",g=!1;for(let m=0;m<l.length;m++){const u=l[m];u==='"'?g=!g:u===","&&!g?(d.push(a(p)),p=""):p+=u}return d.push(a(p)),d},a=l=>(l=l.trim(),l.startsWith('"')&&l.endsWith('"')&&(l=l.substring(1,l.length-1)),l.replace(/""/g,'"')),r=s(e[0]).map(l=>l.toLowerCase()),i=[];for(let l=1;l<e.length;l++){if(!e[l].trim())continue;const d=s(e[l]),p={};r.forEach((g,m)=>{p[g]=d[m]||""}),i.push(p)}return i}function di(o){var i;const e=o.title||"Untitled CSV Import",t=o.content||"";let n=o.slug||e.toLowerCase().replace(/[^a-z0-9-_]+/g,"-");n=n.toLowerCase().replace(/[^a-z0-9-_]+/g,"-"),n||(n=`imported-${Date.now()}`);const a=(o.tags||"imported, csv").split(/[,;|]+/).map(l=>l.trim().toLowerCase()).filter(l=>l.length>0),r=o.updatedat?parseInt(o.updatedat):Date.now();return{slug:n,title:e,content:t,updatedAt:isNaN(r)?Date.now():r,tags:a,isSystem:!1,isEncrypted:((i=o.encrypted)==null?void 0:i.toLowerCase())==="true"}}function pi(o,e){const t=o.split(`
`),n=e.split(`
`),s=Array(t.length+1).fill(0).map(()=>Array(n.length+1).fill(0));for(let l=1;l<=t.length;l++)for(let d=1;d<=n.length;d++)t[l-1]===n[d-1]?s[l][d]=s[l-1][d-1]+1:s[l][d]=Math.max(s[l-1][d],s[l][d-1]);const a=[];let r=t.length,i=n.length;for(;r>0||i>0;)r>0&&i>0&&t[r-1]===n[i-1]?(a.unshift({type:"unchanged",text:t[r-1]}),r--,i--):i>0&&(r===0||s[r][i-1]>=s[r-1][i])?(a.unshift({type:"added",text:n[i-1]}),i--):(a.unshift({type:"removed",text:t[r-1]}),r--);return a}function ui(o,e){return new Promise(t=>{let n=document.getElementById("conflict-diff-modal");n||(n=document.createElement("div"),n.id="conflict-diff-modal",n.className="fixed inset-0 bg-[#090d16]/90 backdrop-blur-md z-[100] flex items-center justify-center p-4",document.body.appendChild(n)),n.classList.remove("hidden");const a=pi(o.content,e.content).map(r=>{let i="diff-line-unchanged",l=" ";return r.type==="added"?(i="diff-line-added px-1 rounded",l="+"):r.type==="removed"&&(i="diff-line-removed px-1 rounded",l="-"),`<div class="font-mono text-xs whitespace-pre-wrap ${i}">${l} ${R(r.text)}</div>`}).join(`
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
              <p class="text-xs font-mono text-white"><span class="text-slate-500">TAGS:</span> ${o.tags.map(r=>`#${r}`).join(", ")}</p>
              <p class="text-[10px] font-mono text-slate-500"><span class="text-slate-500">MODIFIED:</span> ${new Date(o.updatedAt).toLocaleString()}</p>
            </div>
            
            <div class="bg-slate-950/50 border border-slate-850 p-3 rounded-lg space-y-2">
              <h4 class="text-xs font-bold font-mono text-teal-450 uppercase">Imported Document</h4>
              <p class="text-xs font-mono text-white"><span class="text-slate-500">TITLE:</span> ${R(e.title)}</p>
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
    `,document.getElementById("diff-opt-skip").addEventListener("click",()=>{n.classList.add("hidden"),t("SKIP")}),document.getElementById("diff-opt-rename").addEventListener("click",()=>{n.classList.add("hidden"),t("MERGE_RENAME")}),document.getElementById("diff-opt-overwrite").addEventListener("click",()=>{n.classList.add("hidden"),t("OVERWRITE")}),document.getElementById("diff-opt-archive").addEventListener("click",()=>{n.classList.add("hidden"),t("REVISION")})})}async function Vn(o,e){const t=Fr(o),n=await He(t.slug);if(n){let s=e;if(e==="ASK"&&(s=await ui(n,t)),s==="SKIP")return!1;if(s==="REVISION")await ho({id:`${n.slug}-${Date.now()}`,slug:n.slug,title:n.title,content:n.content,updatedAt:n.updatedAt,isEncrypted:n.isEncrypted,tags:n.tags,classification:n.classification,signature:n.signature}),t.signature=await Ze(t),await Me(t);else if(s==="OVERWRITE")t.signature=await Ze(t),await Me(t);else if(s==="MERGE_RENAME"){let a=`${t.slug}-imported`,r=await He(a),i=1;for(;r;)a=`${t.slug}-imported-${i}`,r=await He(a),i++;t.slug=a,t.title=`${t.title} (Imported)`,t.signature=await Ze(t),await Me(t)}}else t.signature=await Ze(t),await Me(t);return!0}async function ds(o){var g,m;if(!o||o.length===0)return;const e=((g=document.getElementById("import-conflict-resolution"))==null?void 0:g.value)||"REVISION";let t=0,n=0,s=0,a=0,r=0,i=0,l=0,d=0,p=0;for(let u=0;u<o.length;u++){const b=o[u],z=(m=b.name.split(".").pop())==null?void 0:m.toLowerCase();z==="md"?await new Promise(x=>{const O=new FileReader;O.onload=async Z=>{var V;try{const L=(V=Z.target)==null?void 0:V.result,y=ai(b.name,L);await Vn(y,e)?t++:a++}catch{l++}x()},O.readAsText(b)}):z==="csv"?await new Promise(x=>{const O=new FileReader;O.onload=async Z=>{var V;try{const L=(V=Z.target)==null?void 0:V.result,y=ci(L);for(const S of y)try{const A=di(S);await Vn(A,e)?n++:r++}catch{d++}}catch{d++}x()},O.readAsText(b)}):z==="json"&&await new Promise(x=>{const O=new FileReader;O.onload=async Z=>{var V;try{const L=JSON.parse((V=Z.target)==null?void 0:V.result);let y=L;if(L&&L.encrypted===!0&&L.payload){const A=prompt("Secure Backup: Enter password to decrypt database backup file:");if(A===null){p++,x();return}try{const K=await Le(A),j=await me(L.payload,K);y=JSON.parse(j)}catch{alert("Backup Decryption Alert: Authentication failed. Invalid backup passphrase."),p++,x();return}}else L&&L.encrypted===!1&&L.payload&&(y=L.payload);const S=Array.isArray(y)?y:[y];for(const A of S)try{!A.slug&&A.title&&(A.slug=A.title.toLowerCase().replace(/[^a-z0-9-_]+/g,"-")),A.slug||(A.slug=`imported-item-${Date.now()}-${Math.floor(Math.random()*1e3)}`),A.title||(A.title=A.slug.replace(/[-_]+/g," ")),typeof A.tags=="string"&&(A.tags=A.tags.split(",").map(j=>j.trim()).filter(j=>j.length>0)),Array.isArray(A.tags)||(A.tags=[]),A.classification||(A.classification="UNCLASSIFIED"),typeof A.updatedAt!="number"&&(A.updatedAt=Date.now()),await Vn(A,e)?s++:i++}catch{p++}}catch{p++}x()},O.readAsText(b)})}alert(`INGESTION COMPLETED (Conflict resolution: ${e.toUpperCase()}):

Markdown (.md) files:
- Ingested: ${t}
- Skipped: ${a}
- Failed: ${l}

CSV files (rows):
- Ingested: ${n}
- Skipped: ${r}
- Failed: ${d}

JSON files (records):
- Ingested: ${s}
- Skipped: ${i}
- Failed: ${p}`),pt.postMessage("refresh"),await Ie(),await ve()}async function fi(){const o=document.getElementById("tag-color-palette-manager");if(!o)return;const e=Array.from(new Set(ge.flatMap(r=>r.tags))),t=await gs();if(e.length===0){o.innerHTML='<p class="text-xs font-mono text-slate-500">No active document tags registered.</p>';return}let n='<div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">';for(const r of e){const i=t.find(d=>d.tag===r),l=i?i.color:"slate";n+=`
      <div class="flex items-center justify-between p-2 bg-slate-950/40 border border-slate-800 rounded">
        <span class="text-xs font-mono text-slate-400">#${R(r)}</span>
        <div class="flex gap-2 items-center">
          <button class="rename-tag-btn px-2 py-1 bg-slate-900 border border-slate-700 text-xs text-blue-400 hover:text-blue-300 rounded" data-tag="${R(r)}">Rename</button>
          <select class="tag-color-select bg-slate-900 border border-slate-850 text-xs font-mono text-slate-300 rounded px-2 py-1 focus:outline-none focus:border-teal-500 cursor-pointer" data-tag="${R(r)}"> border border-slate-850 text-xs font-mono text-slate-300 rounded px-2 py-1 focus:outline-none focus:border-teal-500 cursor-pointer" data-tag="${R(r)}">
          <option value="slate" ${l==="slate"?"selected":""}>SLATE GREY</option>
          <option value="emerald" ${l==="emerald"?"selected":""}>EMERALD GREEN</option>
          <option value="blue" ${l==="blue"?"selected":""}>BLUE TEAM</option>
          <option value="red" ${l==="red"?"selected":""}>RED TEAM</option>
          <option value="amber" ${l==="amber"?"selected":""}>AMBER CAUTION</option>
        </select>
        </div>
      </div>
    `}n+="</div>",o.innerHTML=n,o.querySelectorAll(".rename-tag-btn").forEach(r=>{r.addEventListener("click",async i=>{const l=i.currentTarget.getAttribute("data-tag"),d=prompt(`Rename tag "#${l}" to:`);if(d&&d.trim()&&d!==l){const p=d.trim().toLowerCase().replace(/[^a-z0-9-]/g,"");if(p.length>0){for(const g of ge)g.tags.includes(l)&&(g.tags=g.tags.map(m=>m===l?p:m),await Me(g));de("TAG_RENAME",`Renamed tag ${l} to ${p}`),await ve()}}})}),o.querySelectorAll(".tag-color-select").forEach(r=>{r.addEventListener("change",async i=>{const l=i.currentTarget.getAttribute("data-tag"),d=i.currentTarget.value;await va({tag:l,color:d}),await mo(),await ve()})})}function zt(o){const e=Array.from(new Set(ge.flatMap(y=>y.tags)));o.innerHTML=`
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
              ${e.map(y=>`
                <option value="${R(y)}">#${R(y)}</option>
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
  `;const t=document.getElementById("system-export-btn"),n=document.getElementById("system-export-zip-btn"),s=document.getElementById("system-export-web-zip-btn"),a=document.getElementById("system-export-csv-btn"),r=document.getElementById("system-export-html-btn"),i=document.getElementById("system-unified-import-file"),l=document.getElementById("system-reset-btn"),d=document.getElementById("total-articles-telemetry"),p=document.getElementById("db-health-diagnostics"),g=document.getElementById("system-drop-zone");d.textContent=ge.length.toString(),p&&Ei(p),fi();const m=()=>{const y=document.getElementById("export-tag-filter"),S=(y==null?void 0:y.value)||"ALL";return S==="ALL"?ge:ge.filter(A=>A.tags.includes(S))};t.addEventListener("click",async()=>{const y=m(),S=await ka(),A={pages:y,attachments:S},K=prompt("Secure Backup: Enter a password to encrypt this database backup file (leave blank for plain JSON):");let j,U=`secops-wiki-backup-${Date.now()}.json`;if(K)try{const ue=await Le(K),N=JSON.stringify(A,null,2),I={encrypted:!0,schemaVersion:4,payload:await ot(N,ue)};j=new Blob([JSON.stringify(I,null,2)],{type:"application/json"}),U=`secops-wiki-encrypted-backup-${Date.now()}.json`}catch(ue){alert(`Backup encryption failed: ${ue.message}`);return}else{if(K===null)return;const ue={encrypted:!1,schemaVersion:4,payload:A};j=new Blob([JSON.stringify(ue,null,2)],{type:"application/json"})}const te=URL.createObjectURL(j),ie=document.createElement("a");ie.href=te,ie.download=U,document.body.appendChild(ie),ie.click(),document.body.removeChild(ie),URL.revokeObjectURL(te)}),n.addEventListener("click",async()=>{const y=m(),S=[];for(const U of y){let te=U.content;if(U.isEncrypted&&G)try{te=await me(U.content,G)}catch{}const ie=`---
title: ${U.title}
slug: ${U.slug}
tags: ${U.tags.join(", ")}
updated: ${new Date(U.updatedAt).toISOString()}
encrypted: ${!!U.isEncrypted}
---

`;S.push({name:`${U.slug}.md`,content:ie+te})}const A=js(S),K=URL.createObjectURL(A),j=document.createElement("a");j.href=K,j.download=`secops-wiki-backup-${Date.now()}.zip`,document.body.appendChild(j),j.click(),document.body.removeChild(j),URL.revokeObjectURL(K)}),s.addEventListener("click",()=>{const y=m(),S=li(y),A=URL.createObjectURL(S),K=document.createElement("a");K.href=A,K.download=`secops-wiki-web-${Date.now()}.zip`,document.body.appendChild(K),K.click(),document.body.removeChild(K),URL.revokeObjectURL(A)}),a.addEventListener("click",()=>{const y=m(),S=ri(y),A=new Blob([S],{type:"text/csv;charset=utf-8;"}),K=URL.createObjectURL(A),j=document.createElement("a");j.href=K,j.download=`secops-wiki-report-${Date.now()}.csv`,document.body.appendChild(j),j.click(),document.body.removeChild(j),URL.revokeObjectURL(K)}),r.addEventListener("click",()=>{const y=m(),S=ii(y),A=new Blob([S],{type:"text/html;charset=utf-8;"}),K=URL.createObjectURL(A),j=document.createElement("a");j.href=K,j.download=`secops-wiki-book-${Date.now()}.html`,document.body.appendChild(j),j.click(),document.body.removeChild(j),URL.revokeObjectURL(K)}),i&&i.addEventListener("change",async y=>{const S=y.target.files;S&&S.length>0&&await ds(S)}),["dragenter","dragover","dragleave","drop"].forEach(y=>{g.addEventListener(y,S=>{S.preventDefault(),S.stopPropagation()},!1)}),["dragenter","dragover"].forEach(y=>{g.addEventListener(y,()=>{g.classList.add("border-teal-500","bg-teal-950/10")},!1)}),["dragleave","drop"].forEach(y=>{g.addEventListener(y,()=>{g.classList.remove("border-teal-500","bg-teal-950/10")},!1)}),g.addEventListener("drop",async y=>{const S=y.dataTransfer,A=S==null?void 0:S.files;A&&A.length>0&&await ds(A)}),g.addEventListener("click",()=>{i&&i.click()}),l.addEventListener("click",async()=>{const y=prompt('CRITICAL SECURITY WARNING: Type "WIPE" to verify you want to delete ALL wiki pages and custom documents:');if(y==="WIPE")try{if(await ms(),"caches"in window)try{const S=await caches.keys();for(const A of S)await caches.delete(A)}catch(S){console.warn("Failed to clear caches: ",S)}await so(),await mo(),alert("Database successfully wiped, caches invalidated, and seeded with standard operating defaults."),localStorage.setItem("secops-wiki-last-update",Date.now().toString()),pt.postMessage("refresh"),await Ie(),window.location.hash="#/page/home"}catch(S){alert(`Reset failed: ${S.message}`)}else y!==null&&alert("Sanitization aborted. Confirmation keyword mismatch.")});const u=document.getElementById("system-session-timeout-select");u&&u.addEventListener("change",()=>{localStorage.setItem("secops-wiki-session-timeout",u.value),go()});const b=document.getElementById("system-cache-bust-btn");b&&b.addEventListener("click",async()=>{if(confirm("CRITICAL DIAGNOSTICS: Purge cached service worker registrations and static asset cache buckets? This triggers an immediate application reload.")){if("serviceWorker"in navigator){const y=await navigator.serviceWorker.getRegistrations();for(const S of y)await S.unregister()}if("caches"in window){const y=await caches.keys();for(const S of y)await caches.delete(S)}alert("CACHE WIPE COMPLETED. Reloading system..."),window.location.reload()}});const z=document.getElementById("system-mask-encrypted-checkbox");z&&z.addEventListener("change",()=>{nt=z.checked,localStorage.setItem("secops-wiki-mask-encrypted",nt.toString()),Ie().then(()=>{ve()})});const x=document.getElementById("system-db-encrypted-checkbox");x&&x.addEventListener("change",async()=>{if(x.checked){const S=prompt("Enter a new Master Passphrase to secure the database (min 8 chars, mixed case, numbers, symbols):");if(!S){x.checked=!1;return}const A=Ms(S);if(!A.valid){alert(`SECURITY ERROR: Passphrase too weak.

${A.message}`),x.checked=!1;return}try{pe=await Le(S),localStorage.setItem("secops-wiki-db-encrypted","true");const j=await Ht();for(const U of j)U.isEncryptedAtRest||await Me(U);alert("Database encryption successfully activated. All records are encrypted at rest."),await de("DB_ENCRYPTION_ENABLED","Activated database encryption-at-rest."),await Ie(),zt(o)}catch(K){alert(`Activation failed: ${K.message}`),x.checked=!1}}else{const S=prompt("Enter the current Master Passphrase to confirm decryption:");if(!S){x.checked=!0;return}try{const A=await Le(S);if(!await St(A)){alert("Verification Failed: Incorrect master passphrase."),x.checked=!0;return}const j=await fo();localStorage.setItem("secops-wiki-db-encrypted","false"),localStorage.removeItem("secops-wiki-webauthn-gate"),localStorage.removeItem("secops-wiki-webauthn-payload"),localStorage.removeItem("secops-wiki-webauthn-salt"),pe=null;for(const U of j){const te={slug:U.slug,title:U.title,content:U.content,tags:U.tags,isSystem:U.isSystem,isEncrypted:U.isEncrypted,signature:U.signature,updatedAt:U.updatedAt};await dn(te)}alert("Database encryption-at-rest successfully deactivated."),await de("DB_ENCRYPTION_DISABLED","Deactivated database encryption-at-rest."),await Ie(),zt(o)}catch(A){alert(`Deactivation failed: ${A.message}`),x.checked=!0}}});const O=document.getElementById("system-webauthn-register-btn");O&&O.addEventListener("click",async()=>{localStorage.getItem("secops-wiki-webauthn-gate")==="true"?confirm("Are you sure you want to deregister biometric credentials?")&&(localStorage.removeItem("secops-wiki-webauthn-gate"),localStorage.removeItem("secops-wiki-webauthn-payload"),localStorage.removeItem("secops-wiki-webauthn-salt"),alert("Biometric unlock credentials removed."),await de("WEBAUTHN_DEREGISTER","Removed biometric credentials."),zt(o)):await Ci()}),Kn();const Z=document.getElementById("system-prune-audit-btn");Z&&Z.addEventListener("click",async()=>{confirm("Audit Log Pruning: Confirm deletion of security logs older than 30 days?")&&(await hs(30),await de("AUDIT_LOG_PRUNED","Manually pruned audit logs older than 30 days."),await Kn(),alert("Audit logs successfully pruned."))});const V=document.getElementById("system-wipe-audit-btn");V&&V.addEventListener("click",async()=>{confirm("CRITICAL ACTION: Are you sure you want to purge the security audit log registers?")&&(await Aa(),await de("AUDIT_LOG_CLEARED","Security audit log register cleared."),await Kn())}),oo();const L=document.getElementById("system-wipe-all-drafts-btn");L&&L.addEventListener("click",()=>{if(confirm("CRITICAL WARN: Purge all unsaved document draft fragments in local storage?")){const y=[];for(let S=0;S<localStorage.length;S++){const A=localStorage.key(S)||"";A.startsWith("secops-wiki-draft-")&&y.push(A)}y.forEach(S=>localStorage.removeItem(S)),oo()}})}function oo(){const o=document.getElementById("system-drafts-recovery-list");if(!o)return;const e=[];for(let n=0;n<localStorage.length;n++){const s=localStorage.key(n)||"";s.startsWith("secops-wiki-draft-")&&e.push(s)}const t=e.map(n=>{try{const s=localStorage.getItem(n)||"",a=JSON.parse(s),r=n.substring(18);return{key:n,slug:r,title:a.title||"(Untitled)",updatedAt:a.updatedAt||Date.now(),size:s.length}}catch{return null}}).filter(n=>n!==null);if(t.length===0){o.innerHTML='<p class="text-xs font-mono text-slate-500">No unsaved drafts found in local storage.</p>';return}o.innerHTML=t.map(n=>`
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
  `).join(""),o.querySelectorAll(".draft-action-restore").forEach(n=>{n.addEventListener("click",s=>{const a=s.currentTarget.getAttribute("data-slug");Xe=!0,Ne=a==="new",se=a,window.location.hash=Ne?"#/new":`#/edit/${a}`})}),o.querySelectorAll(".draft-action-wipe").forEach(n=>{n.addEventListener("click",s=>{const a=s.currentTarget.getAttribute("data-key");localStorage.removeItem(a),oo()})})}function jt(){const o=document.getElementById("command-palette-backdrop");if(o)if(zn=!zn,zn){o.classList.remove("hidden");const e=document.getElementById("command-palette-input");e&&(e.value="",e.focus()),Pe=0,bn()}else o.classList.add("hidden")}function qs(){if(document.getElementById("command-palette-backdrop"))return;const o=document.createElement("div");o.id="command-palette-backdrop",o.className="fixed inset-0 bg-[#090d16]/85 backdrop-blur-md z-50 flex items-start justify-center pt-20 hidden",o.innerHTML=`
    <div class="glass-panel border border-teal-900/30 rounded-xl w-full max-w-lg overflow-hidden shadow-2xl mx-4 glow-border">
      <input type="text" id="command-palette-input" placeholder="Search pages or run system commands..." class="w-full bg-slate-950/80 text-white font-mono text-sm p-4 outline-none border-b border-slate-800 focus:border-teal-500/30 placeholder-slate-500 transition">
      <div id="command-palette-results" class="max-h-80 overflow-y-auto divide-y divide-slate-850/40 p-2 space-y-1"></div>
    </div>
  `,document.body.appendChild(o);const e=document.getElementById("command-palette-input");e.addEventListener("input",()=>{Pe=0,bn()}),e.addEventListener("keydown",gi),o.addEventListener("click",t=>{t.target===o&&jt()})}function bn(){const o=document.getElementById("command-palette-input"),e=document.getElementById("command-palette-results");if(!e)return;const t=o?o.value.trim().toLowerCase():"",n=[{title:"CREATE NEW PAGE",subtitle:"Open the editor to establish a new document",icon:"➕",action:()=>{window.location.hash="#/new"}},{title:"TOGGLE THEME",subtitle:`Switch visual style (currently ${wt})`,icon:"🌓",action:()=>{Us()}},{title:"SYSTEM ADMIN",subtitle:"Access operations console and db diagnostics",icon:"⚙️",action:()=>{window.location.hash="#/system"}},{title:"TACTICAL MAP VIEW",subtitle:"Display interactive node relationship map",icon:"🗺️",action:()=>{window.location.hash="#/graph"}},{title:"PANIC PURGE PROTOCOL",subtitle:"Emergency self-destruct - wipes all data",icon:"🚨",action:()=>{const p=document.getElementById("system-panic-btn");p&&p.click()}}];let s="",a=0;const r=n.filter(p=>p.title.toLowerCase().includes(t)||p.subtitle.toLowerCase().includes(t));let i=[];t?i=ge.map(p=>({page:p,score:zs(kt.find(g=>g.slug===p.slug)||p,t)})).filter(p=>p.score>0).sort((p,g)=>g.score-p.score):i=ge.slice(0,5).map(p=>({page:p,score:0}));const l=r.length+i.length;Pe>=l?Pe=0:Pe<0&&(Pe=l-1),r.forEach(p=>{s+=`
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
    `,a++}),i.forEach(p=>{const g=a===Pe,m=p.page;s+=`
      <div class="command-palette-item p-3 rounded-lg flex items-center justify-between cursor-pointer font-mono text-xs transition-all ${g?"command-item-active bg-teal-950/20 text-teal-400 border-l-2 border-teal-500":"text-slate-400 hover:bg-slate-900/40 hover:text-slate-200"}" data-index="${a}">
        <div class="flex items-center gap-3">
          <span class="text-base">${m.isEncrypted?"🔒":"📄"}</span>
          <div>
            <div class="font-bold text-white">${R(m.title)}</div>
            <div class="text-[10px] text-slate-500">Slug: ${R(m.slug)} ${m.tags.length?`• tags: #${m.tags.map(u=>R(u)).join(", #")}`:""}</div>
          </div>
        </div>
        <span class="text-[10px] text-slate-650 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-900 uppercase">PAGE</span>
      </div>
    `,a++}),l===0&&(s='<div class="text-center py-6 text-xs text-slate-600 font-mono">No matching commands or pages found.</div>'),e.innerHTML=s,e.querySelectorAll(".command-palette-item").forEach(p=>{p.addEventListener("click",()=>{const g=parseInt(p.getAttribute("data-index")||"0",10);mi(g,r,i)})}),hi()}function mi(o,e,t){if(jt(),o<e.length)e[o].action();else{const n=o-e.length;n<t.length&&(window.location.hash=`#/page/${t[n].page.slug}`)}}function gi(o){const e=document.getElementById("command-palette-results");if(!e)return;const t=e.querySelectorAll(".command-palette-item");if(t.length!==0)if(o.key==="ArrowDown")o.preventDefault(),Pe=(Pe+1)%t.length,bn();else if(o.key==="ArrowUp")o.preventDefault(),Pe=(Pe-1+t.length)%t.length,bn();else if(o.key==="Enter"){o.preventDefault();const n=e.querySelector(".command-item-active");n&&n.click()}else o.key==="Escape"&&(o.preventDefault(),jt())}function hi(){const o=document.getElementById("command-palette-results");if(!o)return;const e=o.querySelector(".command-item-active");e&&e.scrollIntoView({block:"nearest"})}function bi(o){const e=document.getElementById("autocomplete-popup");e&&(e.classList.remove("hidden"),Gs(o))}function cn(){const o=document.getElementById("autocomplete-popup");o&&(o.classList.add("hidden"),rn=!1)}function Gs(o){const e=document.getElementById("autocomplete-popup");if(!e)return;const t=Qn.toLowerCase().trim(),n=ge.filter(a=>a.title.toLowerCase().includes(t)||a.slug.toLowerCase().includes(t));if(n.length===0){e.innerHTML='<div class="p-2 text-slate-500 italic">No matches found</div>';return}e.innerHTML=n.map((a,r)=>`
    <div class="editor-autocomplete-item p-2 cursor-pointer transition ${r===0?"active bg-teal-950/20 text-teal-400":"text-slate-400 hover:bg-slate-900/40 hover:text-slate-200"}" data-slug="${R(a.slug)}" data-title="${R(a.title)}">
      <span class="font-bold">${R(a.title)}</span>
      <span class="text-[9px] text-slate-500 block truncate">Slug: ${R(a.slug)}</span>
    </div>
  `).join(""),e.querySelectorAll(".editor-autocomplete-item").forEach(a=>{a.addEventListener("click",r=>{const i=r.currentTarget,l=i.getAttribute("data-slug")||"",d=i.getAttribute("data-title")||"";yi(o,d,l)})});const s=xi(o,o.selectionStart);e.style.left=`${Math.min(o.clientWidth-260,Math.max(16,s.left))}px`,e.style.top=`${Math.min(o.clientHeight-100,Math.max(40,s.top+20))}px`}function xi(o,e){const n=o.value.substring(0,e).split(`
`),s=n.length-1,a=n[s],r=8,i=20,l=16+a.length*r%(o.clientWidth-40),d=12+s*i-o.scrollTop;return{left:l,top:d}}function yi(o,e,t){const n=ln-2,s=o.selectionStart,a=o.value,r=`[${e}](#/page/${t})`;o.value=a.substring(0,n)+r+a.substring(s),o.focus(),o.selectionStart=n+r.length,o.selectionEnd=n+r.length,cn();const i=document.getElementById("live-preview-box");i&&(i.innerHTML=Et(o.value))}async function wi(o,e,t){const n=await He(o);if(!n)return;let s=n.content;const a=!!n.isEncrypted;if(a){if(!G){alert("Authentication Error: Decryption key is missing. Re-decrypt page first.");return}try{s=await me(s,G)}catch{alert("Decryption failure.");return}}let r=0;const i=/([-*+]\s+\[)([ xX])(\])/g,l=s.replace(i,(g,m,u,b)=>r===e?(r++,`${m}${t?"x":" "}${b}`):(r++,g));let d=l;a&&G&&(d=await ot(l,G)),n.content=d,n.updatedAt=Date.now(),n.signature=await Ze(n),await Me(n),pt.postMessage("refresh"),await Ie();const p=document.getElementById("main-content");p&&await hn(p)}function Vs(o){const e=[],t=/(?:\(|"|^|\s)#\/page\/([a-z0-9-_]+)/g;let n;for(;(n=t.exec(o))!==null;)e.push(n[1].toLowerCase());return Array.from(new Set(e))}async function vi(o){o.innerHTML=`
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
  `;const e=document.getElementById("tactical-map-canvas");if(!e)return;const t=e.getContext("2d");if(!t)return;const n=window.devicePixelRatio||1,s=e.getBoundingClientRect();e.width=s.width*n,e.height=500*n,t.scale(n,n);const a=s.width,r=500;let i=1,l=0,d=0,p=!1,g=0,m=0;const u=ge.map(w=>{const C=a/2+(Math.random()-.5)*100,_=r/2+(Math.random()-.5)*100;return{id:w.slug,title:w.title,x:C,y:_,vx:0,vy:0,radius:w.slug==="home"?14:10,isEncrypted:!!w.isEncrypted,isSystem:!!w.isSystem}}),b=[],z=new Set(u.map(w=>w.id));for(const w of ge){let C=w.content;if(w.isEncrypted&&G)try{C=await me(w.content,G)}catch{}Vs(C).forEach(M=>{z.has(M)&&M!==w.slug&&b.push({source:w.slug,target:M})})}let x=null,O=null,Z=0,V=0,L=0,y="";const S=document.getElementById("map-search-input");S&&S.addEventListener("input",w=>{y=w.target.value.trim().toLowerCase()});const A=.02,K=1200,j=.85,U=.02;function te(w,C){const _=(w-a/2-l)/i+a/2,M=(C-r/2-d)/i+r/2;return{x:_,y:M}}function ie(){for(let w=0;w<u.length;w++){const C=u[w];for(let _=w+1;_<u.length;_++){const M=u[_],B=M.x-C.x,h=M.y-C.y,D=B*B+h*h+.1,T=Math.sqrt(D);if(T<250){const $=K/D,W=B/T*$,ne=h/T*$;C!==x&&(C.vx-=W,C.vy-=ne),M!==x&&(M.vx+=W,M.vy+=ne)}}}b.forEach(w=>{const C=u.find(W=>W.id===w.source),_=u.find(W=>W.id===w.target);if(!C||!_)return;const M=_.x-C.x,B=_.y-C.y,h=Math.sqrt(M*M+B*B)||.1,D=(h-100)*A,T=M/h*D,$=B/h*D;C!==x&&(C.vx+=T,C.vy+=$),_!==x&&(_.vx-=T,_.vy-=$)}),u.forEach(w=>{if(w===x)return;const C=a/2-w.x,_=r/2-w.y;w.vx+=C*U,w.vy+=_*U,w.x+=w.vx,w.y+=w.vy,w.vx*=j,w.vy*=j,w.x=Math.max(w.radius,Math.min(a-w.radius,w.x)),w.y=Math.max(w.radius,Math.min(r-w.radius,w.y))})}function ue(){t.clearRect(0,0,a,r),t.save(),t.translate(a/2+l,r/2+d),t.scale(i,i),t.translate(-a/2,-r/2),t.lineWidth=1,b.forEach(w=>{const C=u.find($=>$.id===w.source),_=u.find($=>$.id===w.target);if(!C||!_)return;const M=y.length>0,B=M&&C.title.toLowerCase().includes(y),h=M&&_.title.toLowerCase().includes(y),D=O&&(O.id===C.id||O.id===_.id);let T=.4;M&&(T=B&&h?.6:.05),t.strokeStyle=D?"rgba(20, 184, 166, 0.6)":`rgba(30, 41, 59, ${T})`,t.lineWidth=D?1.5/i:1/i,t.beginPath(),t.moveTo(C.x,C.y),t.lineTo(_.x,_.y),t.stroke()}),u.forEach(w=>{t.beginPath();const C=y.length>0,_=C&&w.title.toLowerCase().includes(y);let M=w.radius,B=1,h=0;if(C)if(_){const ne=Math.sin(Date.now()/150)*2+3;M=w.radius+ne,h=15,B=1}else B=.2;t.arc(w.x,w.y,M,0,2*Math.PI);let D="#14b8a6",T="rgba(20, 184, 166, 0.4)";w.isEncrypted?(D="#ef4444",T="rgba(239, 68, 68, 0.4)"):w.isSystem&&(D="#3b82f6",T="rgba(59, 130, 246, 0.4)"),t.fillStyle=D,t.globalAlpha=B,t.shadowColor=T,t.shadowBlur=O===w?12:h||6,t.fill(),t.shadowBlur=0,t.strokeStyle=`rgba(255, 255, 255, ${.1*B})`,t.lineWidth=1.5/i,t.stroke();const W=w.isEncrypted&&!G&&nt?"[REDACTED CORE]":w.title;t.fillStyle=O===w||_?`rgba(255, 255, 255, ${B})`:`rgba(148, 163, 184, ${B})`,t.font=O===w||_?`bold ${10/i}px monospace`:`${9/i}px monospace`,t.textAlign="center",t.fillText(W,w.x,w.y-M-5/i)}),t.restore(),t.globalAlpha=1}function N(){ie(),ue(),L=requestAnimationFrame(N)}e.addEventListener("mousemove",w=>{const C=e.getBoundingClientRect(),_=w.clientX-C.left,M=w.clientY-C.top,B=te(_,M);if(Z=B.x,V=B.y,x){x.x=Z,x.y=V,x.vx=0,x.vy=0;return}if(p){l=_-g,d=M-m;return}O=null;for(const h of u){const D=h.x-Z,T=h.y-V;if(D*D+T*T<(h.radius+5)*(h.radius+5)){O=h;break}}}),e.addEventListener("mousedown",w=>{const C=e.getBoundingClientRect(),_=w.clientX-C.left,M=w.clientY-C.top;if(O){x=O;const B=te(_,M);x.x=B.x,x.y=B.y}else p=!0,g=_-l,m=M-d}),e.addEventListener("wheel",w=>{w.preventDefault();const C=e.getBoundingClientRect(),_=w.clientX-C.left,M=w.clientY-C.top,B=te(_,M),h=w.deltaY<0?1.1:.9;i=Math.max(.2,Math.min(4,i*h)),l=_-(B.x-a/2)*i-a/2,d=M-(B.y-r/2)*i-r/2},{passive:!1});const F=()=>{x=null,p=!1};window.addEventListener("mouseup",F),e.addEventListener("click",()=>{O&&!p&&(cancelAnimationFrame(L),window.location.hash=`#/page/${O.id}`)});const I=document.getElementById("map-zoom-in"),v=document.getElementById("map-zoom-out"),H=document.getElementById("map-zoom-reset");I.addEventListener("click",()=>{i=Math.min(4,i*1.2)}),v.addEventListener("click",()=>{i=Math.max(.2,i/1.2)}),H.addEventListener("click",()=>{i=1,l=0,d=0}),N();const Q=()=>{cancelAnimationFrame(L),window.removeEventListener("mouseup",F),window.removeEventListener("hashchange",Q)};window.addEventListener("hashchange",Q)}async function Ei(o){o.innerHTML=`
    <div class="text-xs font-mono text-slate-500 animate-pulse">Running security & link integrity scan...</div>
  `;const e=await fo();let t=0;const n=new TextEncoder;e.forEach(d=>{const p=JSON.stringify(d);t+=n.encode(p).length});const s=t<1024?`${t} Bytes`:t<1024*1024?`${(t/1024).toFixed(2)} KB`:`${(t/(1024*1024)).toFixed(2)} MB`,a=new Set(e.map(d=>d.slug)),r={};e.forEach(d=>{r[d.slug]=[]});const i=[];for(const d of e){let p=d.content;if(d.isEncrypted&&G)try{p=await me(d.content,G)}catch{}Vs(p).forEach(m=>{a.has(m)?m!==d.slug&&r[m].push(d.slug):i.push({source:d.slug,target:m})})}const l=e.filter(d=>d.slug!=="home"&&r[d.slug].length===0);o.innerHTML=`
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
  `}let kt=[];async function ki(){kt=[];for(const o of ge){let e=o.content,t=o.title;if(o.isEncrypted&&G&&o.slug===se)try{e=await me(o.content,G)}catch{}kt.push({...o,content:e,title:t})}}async function ho(o){if(localStorage.getItem("secops-wiki-db-encrypted")==="true"&&pe){const t={title:o.title,content:o.content,isEncrypted:o.isEncrypted,updatedAt:o.updatedAt,tags:o.tags,classification:o.classification,signature:o.signature},n=await ot(JSON.stringify(t),pe),s={id:o.id,slug:o.slug,title:"[REDACTED AT REST]",content:"[REDACTED AT REST]",updatedAt:o.updatedAt,isEncryptedAtRest:!0,encryptedData:n};await Uo(s)}else await Uo(o);try{const t=await fs(o.slug);if(t.length>20)for(let n=20;n<t.length;n++)await ya(t[n].id)}catch(t){console.warn("Failed to compact revisions for slug:",o.slug,t)}}async function Si(o){const e=await fs(o),t=[];for(const n of e)if(n.isEncryptedAtRest&&n.encryptedData){if(!pe){t.push({id:n.id,slug:n.slug,title:"[DATABASE LOCKED]",content:"Master passphrase required to unlock this database record.",updatedAt:n.updatedAt,isEncrypted:!1});continue}try{const s=await me(n.encryptedData,pe),a=JSON.parse(s);t.push({id:n.id,slug:n.slug,title:a.title,content:a.content,updatedAt:a.updatedAt,isEncrypted:a.isEncrypted,tags:a.tags,classification:a.classification,signature:a.signature})}catch(s){console.error("Failed to decrypt revision at rest:",s)}}else t.push(n);return t}async function St(o){const e=await Ht();for(const t of e)if(t.isEncryptedAtRest&&t.encryptedData)try{return await me(t.encryptedData,o),!0}catch{return!1}return!0}function Ti(){let o=document.getElementById("master-unlock-overlay");o||(o=document.createElement("div"),o.id="master-unlock-overlay",o.className="fixed inset-0 bg-[#060814]/98 backdrop-blur-xl z-[100] flex items-center justify-center p-4",document.body.appendChild(o));const t=localStorage.getItem("secops-wiki-webauthn-gate")==="true"?`
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
  `;const n=document.getElementById("master-unlock-form"),s=document.getElementById("master-unlock-input"),a=document.getElementById("master-unlock-error"),r=document.getElementById("master-unlock-wipe-btn"),i=document.getElementById("master-unlock-biometric-btn");setTimeout(()=>s==null?void 0:s.focus(),50),n.addEventListener("submit",async l=>{l.preventDefault(),a.classList.add("hidden");const d=s.value;try{const p=await Le(d);await St(p)?(pe=p,Ks()):(a.classList.remove("hidden"),s.value="",s.focus(),await de("DECRYPT_FAIL","Master database unlock attempt with invalid passphrase."))}catch(p){a.textContent=`ERROR: ${p.message.toUpperCase()}`,a.classList.remove("hidden")}}),r.addEventListener("click",async()=>{confirm("CRITICAL ACTION: Are you sure you want to completely wipe this database? All encrypted records and system procedures will be permanently deleted.")&&prompt('Type "WIPE" to confirm sanitization:')==="WIPE"&&(await ms(),await so(),localStorage.removeItem("secops-wiki-db-encrypted"),localStorage.removeItem("secops-wiki-webauthn-gate"),localStorage.removeItem("secops-wiki-webauthn-payload"),localStorage.removeItem("secops-wiki-webauthn-salt"),pe=null,o.remove(),alert("Database successfully wiped and reset to default plaintext configuration."),window.location.reload())}),i&&i.addEventListener("click",async()=>{await Ri()})}function Ks(){const o=document.getElementById("master-unlock-overlay");o&&o.remove(),de("SESSION_UNLOCK","Database session unlocked and decrypted at rest."),Ie().then(()=>{Fs(),qs(),window.addEventListener("hashchange",gn),window.addEventListener("online",mn),window.addEventListener("offline",mn),gn()})}function Ai(o){const e=async t=>{const n=new FileReader;n.onload=async()=>{const s=n.result.split(",")[1],a=`att-${Date.now()}-${Math.random().toString(36).substring(2,9)}`;let r=G||pe,i=s;if(r)try{i=await ot(s,r)}catch(m){console.error("Failed to encrypt attachment:",m)}const l={id:a,name:t.name,mimeType:t.type,data:i};await Ea(l),await de("ATTACHMENT_SAVE",`Saved attachment ${t.name} (ID: ${a}, size: ${t.size} bytes).`);const d=t.type.startsWith("image/")?`![${t.name}](attachment://${a})`:`[Attachment: ${t.name}](attachment://${a})`,p=o.selectionStart,g=o.selectionEnd;o.value=o.value.substring(0,p)+d+o.value.substring(g),o.selectionStart=o.selectionEnd=p+d.length,o.dispatchEvent(new Event("input"))},n.readAsDataURL(t)};o.addEventListener("dragover",t=>{t.preventDefault()}),o.addEventListener("drop",async t=>{var s;t.preventDefault();const n=(s=t.dataTransfer)==null?void 0:s.files;if(n&&n.length>0)for(let a=0;a<n.length;a++)await e(n[a])}),o.addEventListener("paste",async t=>{var s;const n=(s=t.clipboardData)==null?void 0:s.items;if(n){for(let a=0;a<n.length;a++)if(n[a].kind==="file"){const r=n[a].getAsFile();r&&await e(r)}}})}async function Ii(o){const e=o.querySelectorAll('img[src^="attachment://"]');for(const n of Array.from(e)){const s=n.src.replace("attachment://","").split("/").pop()||"",a=await zo(s);if(a){const r=await ps(a);r&&(n.src=r)}}const t=o.querySelectorAll('a[href^="attachment://"]');for(const n of Array.from(t)){const s=n.href.replace("attachment://","").split("/").pop()||"",a=await zo(s);if(a){const r=await ps(a);r&&(n.href=r,n.download=a.name)}}}async function ps(o){let e=o.data;if(e.includes(":")){let t=null;if(G)try{t=await me(e,G)}catch{}if(!t&&pe)try{t=await me(e,pe)}catch{}if(!t)return null;e=t}try{const t=atob(e),n=new Uint8Array(t.length);for(let a=0;a<t.length;a++)n[a]=t.charCodeAt(a);const s=new Blob([n],{type:o.mimeType});return URL.createObjectURL(s)}catch(t){return console.error("Failed to parse base64 for attachment:",t),null}}async function Kn(){const o=document.getElementById("system-audit-logs-list");if(!o)return;const e=await Ta();if(e.length===0){o.innerHTML='<p class="text-xs font-mono text-slate-500">No security audit logs found.</p>';return}o.innerHTML=`
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
  `}function Li(o){let e=document.getElementById("drawing-canvas-modal");e||(e=document.createElement("div"),e.id="drawing-canvas-modal",e.className="fixed inset-0 bg-[#090d16]/90 backdrop-blur-md z-50 flex items-center justify-center p-4",document.body.appendChild(e)),e.innerHTML=`
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
  `,e.classList.remove("hidden");const t=document.getElementById("sketch-canvas"),n=t.getContext("2d"),s=window.devicePixelRatio||1,a=600,r=350;t.width=a*s,t.height=r*s,t.style.width=`${a}px`,t.style.height=`${r}px`,n.scale(s,s),n.lineCap="round",n.lineJoin="round",n.strokeStyle="#ffffff",n.lineWidth=5,n.fillStyle="#060814",n.fillRect(0,0,a,r);let i=!1,l="pen",d="#ffffff",p=0,g=0,m;const u=[],b=[];u.push(n.getImageData(0,0,t.width,t.height));const z=I=>{const v=t.getBoundingClientRect(),H="touches"in I?I.touches[0].clientX:I.clientX,Q="touches"in I?I.touches[0].clientY:I.clientY;return{x:(H-v.left)*(a/v.width),y:(Q-v.top)*(r/v.height)}},x=I=>{i=!0;const v=z(I);p=v.x,g=v.y,m=n.getImageData(0,0,t.width,t.height),(l==="pen"||l==="eraser")&&(n.beginPath(),n.moveTo(p,g)),I.preventDefault()},O=I=>{if(!i)return;const v=z(I),H=parseInt(K.value,10);if(l==="pen"||l==="eraser")n.lineTo(v.x,v.y),n.strokeStyle=l==="eraser"?"#060814":d,n.lineWidth=H,n.stroke();else if(n.putImageData(m,0,0),n.beginPath(),n.strokeStyle=d,n.lineWidth=H,l==="line")n.moveTo(p,g),n.lineTo(v.x,v.y),n.stroke();else if(l==="arrow"){n.moveTo(p,g),n.lineTo(v.x,v.y),n.stroke();const Q=Math.atan2(v.y-g,v.x-p),w=Math.max(10,H*2.5);n.beginPath(),n.moveTo(v.x,v.y),n.lineTo(v.x-w*Math.cos(Q-Math.PI/6),v.y-w*Math.sin(Q-Math.PI/6)),n.lineTo(v.x-w*Math.cos(Q+Math.PI/6),v.y-w*Math.sin(Q+Math.PI/6)),n.closePath(),n.fillStyle=d,n.fill()}else if(l==="rect")n.rect(p,g,v.x-p,v.y-g),n.stroke();else if(l==="circle"){const Q=Math.sqrt(Math.pow(v.x-p,2)+Math.pow(v.y-g,2));n.arc(p,g,Q,0,2*Math.PI),n.stroke()}I.preventDefault()},Z=()=>{i&&((l==="pen"||l==="eraser")&&n.closePath(),i=!1,u.push(n.getImageData(0,0,t.width,t.height)),b.length=0)},V=()=>{if(u.length>1){const I=u.pop();b.push(I);const v=u[u.length-1];n.putImageData(v,0,0)}},L=()=>{if(b.length>0){const I=b.pop();u.push(I),n.putImageData(I,0,0)}};t.addEventListener("mousedown",x),t.addEventListener("mousemove",O),window.addEventListener("mouseup",Z),t.addEventListener("touchstart",x,{passive:!1}),t.addEventListener("touchmove",O,{passive:!1}),window.addEventListener("touchend",Z);const y=I=>{I.ctrlKey&&I.key==="z"?(I.preventDefault(),V()):I.ctrlKey&&I.key==="y"&&(I.preventDefault(),L())};window.addEventListener("keydown",y);const S=["pen","eraser","line","arrow","rect","circle"],A=I=>{l=I,S.forEach(v=>{const H=document.getElementById(`draw-tool-${v}`);v===I?H.className="px-2 py-1 bg-teal-950/40 border border-teal-800 text-teal-400 font-mono text-[10px] rounded font-bold uppercase":H.className="px-2 py-1 bg-slate-900 border border-slate-850 text-slate-400 font-mono text-[10px] rounded hover:text-white uppercase"})};S.forEach(I=>{document.getElementById(`draw-tool-${I}`).addEventListener("click",()=>A(I))});const K=document.getElementById("draw-brush-size"),j=document.getElementById("draw-clear-btn"),U=document.getElementById("draw-cancel-btn"),te=document.getElementById("draw-save-btn"),ie=document.getElementById("draw-color-palette"),ue=document.getElementById("draw-undo-btn"),N=document.getElementById("draw-redo-btn");ie.addEventListener("click",I=>{const v=I.target.closest("button");v&&(d=v.getAttribute("data-color")||"#ffffff",ie.querySelectorAll("button").forEach(H=>H.classList.replace("border-white","border-transparent")),v.classList.replace("border-transparent","border-white"))}),j.addEventListener("click",()=>{confirm("Clear the canvas drawing?")&&(n.fillStyle="#060814",n.fillRect(0,0,a,r),u.push(n.getImageData(0,0,t.width,t.height)),b.length=0)}),ue.addEventListener("click",V),N.addEventListener("click",L);const F=()=>{window.removeEventListener("mouseup",Z),window.removeEventListener("touchend",Z),window.removeEventListener("keydown",y),e.classList.add("hidden")};U.addEventListener("click",F),te.addEventListener("click",()=>{const v=`![Tactical Sketch](${t.toDataURL("image/png")})`,H=o.selectionStart,Q=o.selectionEnd;o.value=o.value.substring(0,H)+v+o.value.substring(Q),o.selectionStart=o.selectionEnd=H+v.length,o.dispatchEvent(new Event("input")),F()})}async function Ci(){if(!pe){alert("Unlock Required: Unlock the database using your passphrase before registering biometric lock.");return}const o=prompt("Verify Identity: Enter your current master passphrase to bind to biometric unlock:");if(!o)return;const e=await Le(o);if(!await St(e)){alert("Verification Failed: Incorrect passphrase.");return}try{const n=crypto.getRandomValues(new Uint8Array(32)),s=await navigator.credentials.create({publicKey:{challenge:n,rp:{name:"SecOps Wiki",id:window.location.hostname||"localhost"},user:{id:crypto.getRandomValues(new Uint8Array(16)),name:"operator@secops.local",displayName:"SecOps Operator"},pubKeyCredParams:[{type:"public-key",alg:-7},{type:"public-key",alg:-257}],authenticatorSelection:{authenticatorAttachment:"platform",userVerification:"required"},timeout:6e4}});if(s){const a=new Uint8Array(s.rawId),r=Array.from(a).map(m=>m.toString(16).padStart(2,"0")).join(""),i=crypto.getRandomValues(new Uint8Array(32)),l=Array.from(i).map(m=>m.toString(16).padStart(2,"0")).join("");localStorage.setItem("secops-wiki-webauthn-salt",l);const d=`${r}:${l}`,p=await Le(d),g=await ot(o,p);localStorage.setItem("secops-wiki-webauthn-payload",g),localStorage.setItem("secops-wiki-webauthn-gate","true"),alert("Biometric credential successfully registered with WebAuthn platform gate."),await de("WEBAUTHN_REGISTER","Biometric credentials registered successfully."),zt(document.getElementById("main-content"))}}catch(n){alert(`Biometric registration failed: ${n.message}`),await de("WEBAUTHN_FAIL",`Biometric registration failed: ${n.message}`)}}async function Ri(){const o=localStorage.getItem("secops-wiki-webauthn-gate")==="true",e=localStorage.getItem("secops-wiki-webauthn-payload");if(!o||!e){alert("Biometric Unlock is not registered. Setup biometric credentials in settings first.");return}try{const t=crypto.getRandomValues(new Uint8Array(32)),n=await navigator.credentials.get({publicKey:{challenge:t,rpId:window.location.hostname||"localhost",userVerification:"required",timeout:6e4}});if(n){const s=new Uint8Array(n.rawId),a=Array.from(s).map(m=>m.toString(16).padStart(2,"0")).join(""),r=localStorage.getItem("secops-wiki-webauthn-salt")||"";if(!r)throw new Error("Biometric decryption salt is missing from storage.");const i=`${a}:${r}`,l=await Le(i),d=await me(e,l),p=await Le(d);await St(p)?(pe=p,Ks()):alert("Biometric validation failed: Stored credentials mismatch.")}}catch(t){alert(`Biometric verification failed: ${t.message}`),await de("WEBAUTHN_FAIL",`Biometric unlock failed: ${t.message}`)}}function Di(o){const e={name:"Root",fullPath:"",children:{},pages:[]};for(const t of o)for(const n of t.tags){const s=n.split("/");let a=e,r="";for(let i=0;i<s.length;i++){const l=s[i].trim();l&&(r=r?`${r}/${l}`:l,a.children[l]||(a.children[l]={name:l,fullPath:r,children:{},pages:[]}),a=a.children[l])}a.pages.push(t)}return e}function Ys(o,e=0){let t="";const n=Object.keys(o.children).sort();for(const s of n){const a=o.children[s];if(!(Object.keys(a.children).length>0||a.pages.length>0))continue;const i=a.fullPath;t+=`
      <div class="tree-folder">
        <div class="tree-folder-header flex items-center gap-1.5 px-3 py-1 cursor-pointer hover:bg-slate-900/40 text-xs font-mono text-slate-450 select-none rounded-lg" data-path="${R(i)}" tabindex="0">
          <span class="tree-folder-icon text-[9px] transition-transform duration-200 text-slate-600" style="display: inline-block;">▶</span>
          <span>📁 ${R(a.name)}</span>
        </div>
        <div class="tree-folder-children hidden pl-3.5 space-y-0.5 animate-fade-in" data-path="${R(i)}">
          ${Ys(a,e+1)}
          ${a.pages.map(l=>{const d=se===l.slug&&!Xe,p=l.isEncrypted&&!G&&nt,g=p?"[REDACTED CORE]":l.title;return`
              <a href="${p?"javascript:void(0)":`#/page/${l.slug}`}" ${p?`onclick="alert('SECURITY WARNING: Document is locked. Enter passphrase to decrypt cores first.');"`:""} class="flex items-center justify-between px-3 py-1 rounded-lg text-[11px] font-mono transition ${d?"bg-teal-950/20 text-teal-400 font-bold border-l border-teal-500":"text-slate-450 hover:bg-slate-900/30 hover:text-slate-200"}" tabindex="0">
                <span class="truncate flex items-center gap-1">
                  ${l.isEncrypted?"🔒":"⊙"} ${R(g)}
                </span>
              </a>
            `}).join("")}
        </div>
      </div>
    `}return t}function $i(o){o.querySelectorAll("code.language-javascript-sandbox, code.language-html-sandbox").forEach(t=>{const n=t.parentElement;if(!n||n.tagName.toLowerCase()!=="pre"||n.querySelector(".sandbox-run-btn"))return;const s=t.classList.contains("language-html-sandbox"),a=t.textContent||"",r=document.createElement("button");r.className="sandbox-run-btn absolute top-2 right-12 px-2 py-0.5 bg-teal-950/40 border border-teal-800 text-teal-400 hover:text-teal-300 font-mono text-[9px] rounded uppercase font-bold transition z-10",r.textContent="Run Sandbox",n.classList.add("relative"),n.appendChild(r);const i=document.createElement("div");i.className="sandbox-iframe-wrapper mt-2 hidden border border-slate-800 rounded-lg overflow-hidden bg-slate-950",n.after(i),r.addEventListener("click",()=>{var d;if(i.classList.toggle("hidden"))r.textContent="Run Sandbox",i.innerHTML="";else{r.textContent="Close Sandbox",i.innerHTML=`
          <div class="bg-slate-900 px-3 py-1 border-b border-slate-800 flex justify-between items-center text-[10px] font-mono text-slate-400 select-none">
            <span>LIVE ISO-SANDBOX CONSOLE</span>
            <button class="sandbox-close-inner-btn text-red-400 hover:text-red-300 font-bold">CLOSE</button>
          </div>
          <iframe sandbox="allow-scripts" class="w-full h-64 bg-slate-950" id="sandbox-frame-${Date.now()}"></iframe>
        `;const p=i.querySelector("iframe");let g="";s?g=a:g=`
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
          `,p.srcdoc=g,(d=i.querySelector(".sandbox-close-inner-btn"))==null||d.addEventListener("click",()=>{i.classList.add("hidden"),r.textContent="Run Sandbox",i.innerHTML=""})}})})}async function _i(o){var r;const e=window.location.hash,t=e.indexOf("?");if(t===-1){o.innerHTML='<div class="glass-panel border border-red-950 p-6 rounded-xl text-center font-mono text-xs text-red-400">P2P IMPORT ERROR: Missing decryption parameters in link.</div>';return}const n=new URLSearchParams(e.substring(t)),s=n.get("data"),a=n.get("key");if(!s||!a){o.innerHTML='<div class="glass-panel border border-red-950 p-6 rounded-xl text-center font-mono text-xs text-red-400">P2P IMPORT ERROR: Invalid parameters.</div>';return}try{const i=await Le(a),l=atob(decodeURIComponent(s)),d=await me(l,i),p=JSON.parse(d);o.innerHTML=`
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
    `,(r=document.getElementById("p2p-import-confirm-btn"))==null||r.addEventListener("click",async()=>{let g=p.title.toLowerCase().replace(/[^a-z0-9-_]+/g,"-");g||(g=`p2p-import-${Date.now()}`);let m=g,u=await He(m);if(u&&!confirm(`CONFLICT ALERT: A document with slug "${m}" already exists in your wiki database.

Click OK to overwrite the existing document.
Click Cancel to import it as a duplicate under an auto-generated title.`)){let x=1;for(;u;)m=`${g}-${x}`,u=await He(m),x++}const b={slug:m,title:p.title,content:p.content,tags:p.tags,updatedAt:Date.now()};b.signature=await Ze(b),await Me(b),await de("P2P_IMPORT_SUCCESS",`Imported decrypted page: ${p.title} (slug: ${m})`),alert("Intel Entry imported successfully."),window.location.hash=`#/page/${m}`})}catch(i){o.innerHTML=`<div class="glass-panel border border-red-950 p-6 rounded-xl text-center font-mono text-xs text-red-400">P2P DECRYPTION ERROR: ${R(i.message)}</div>`}}document.addEventListener("DOMContentLoaded",ti);async function Oi(){setInterval(async()=>{try{const o=ge;await Ia({id:Date.now().toString(),timestamp:Date.now(),data:JSON.stringify(o)}),console.log("Background backup created")}catch(o){console.error("Backup failed",o)}},24*60*60*1e3)}Oi();window.renderKnowledgeGraph=function(o){const e=document.getElementById(o);if(!e)return;const t=e.getContext("2d");t&&(t.fillStyle="#fff",t.fillText("Knowledge Graph (Mock)",10,20))};
