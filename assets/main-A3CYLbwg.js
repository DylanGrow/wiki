var Ls=Object.defineProperty;var co=o=>{throw TypeError(o)};var Cs=(o,e,t)=>e in o?Ls(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t;var Z=(o,e,t)=>Cs(o,typeof e!="symbol"?e+"":e,t),_s=(o,e,t)=>e.has(o)||co("Cannot "+t);var po=(o,e,t)=>e.has(o)?co("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(o):e.set(o,t);var $t=(o,e,t)=>(_s(o,e,"access private method"),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();if(self!==top)try{window.top&&(window.top.location.href=window.location.href)}catch{window.location.href="about:blank"}else document.documentElement.classList.remove("clickjack-lock");const Rs="secops-wiki-db",_e="pages",je="revisions",Os=2;function Ke(){return new Promise((o,e)=>{const t=indexedDB.open(Rs,Os);t.onerror=()=>e(t.error),t.onsuccess=()=>o(t.result),t.onupgradeneeded=()=>{const n=t.result;n.objectStoreNames.contains(_e)||n.createObjectStore(_e,{keyPath:"slug"}),n.objectStoreNames.contains(je)||n.createObjectStore(je,{keyPath:"id"}).createIndex("slug","slug",{unique:!1})}})}async function Fe(o){const e=await Ke();return new Promise((t,n)=>{const a=e.transaction(_e,"readonly").objectStore(_e).get(o);a.onerror=()=>n(a.error),a.onsuccess=()=>t(a.result||null)})}async function Ue(o){const e=await Ke();return new Promise((t,n)=>{const a=e.transaction(_e,"readwrite").objectStore(_e).put(o);a.onerror=()=>n(a.error),a.onsuccess=()=>t()})}async function Ds(o){await Ns(o);const e=await Ke();return new Promise((t,n)=>{const a=e.transaction(_e,"readwrite").objectStore(_e).delete(o);a.onerror=()=>n(a.error),a.onsuccess=()=>t()})}async function Cn(){const o=await Ke();return new Promise((e,t)=>{const r=o.transaction(_e,"readonly").objectStore(_e).getAll();r.onerror=()=>t(r.error),r.onsuccess=()=>e(r.result||[])})}async function _n(o){const e=await Ke();return new Promise((t,n)=>{const a=e.transaction(je,"readwrite").objectStore(je).put(o);a.onerror=()=>n(a.error),a.onsuccess=()=>t()})}async function $s(o){const e=await Ke();return new Promise((t,n)=>{const l=e.transaction(je,"readonly").objectStore(je).index("slug").getAll(o);l.onerror=()=>n(l.error),l.onsuccess=()=>{const c=l.result||[];c.sort((p,f)=>f.updatedAt-p.updatedAt),t(c)}})}async function Ns(o){const e=await Ke();return new Promise((t,n)=>{const l=e.transaction(je,"readwrite").objectStore(je).index("slug").openCursor(o);l.onerror=()=>n(l.error),l.onsuccess=()=>{const c=l.result;c?(c.delete(),c.continue()):t()}})}const Ms=[{slug:"home",title:"Operations Dashboard",content:`# Secure Operations Center (SOC) Wiki

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
* Raw input strings are escaped to prevent Cross-Site Scripting (XSS).`,updatedAt:Date.now(),tags:["security","hardening"],isSystem:!0}];async function No(){if((await Cn()).length===0)for(const e of Ms)await Ue(e)}/*! @license DOMPurify 3.4.11 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.4.11/LICENSE */function uo(o,e){(e==null||e>o.length)&&(e=o.length);for(var t=0,n=Array(e);t<e;t++)n[t]=o[t];return n}function Ps(o){if(Array.isArray(o))return o}function Bs(o,e){var t=o==null?null:typeof Symbol<"u"&&o[Symbol.iterator]||o["@@iterator"];if(t!=null){var n,s,r,a,l=[],c=!0,p=!1;try{if(r=(t=t.call(o)).next,e!==0)for(;!(c=(n=r.call(t)).done)&&(l.push(n.value),l.length!==e);c=!0);}catch(f){p=!0,s=f}finally{try{if(!c&&t.return!=null&&(a=t.return(),Object(a)!==a))return}finally{if(p)throw s}}return l}}function zs(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Us(o,e){return Ps(o)||Bs(o,e)||Fs(o,e)||zs()}function Fs(o,e){if(o){if(typeof o=="string")return uo(o,e);var t={}.toString.call(o).slice(8,-1);return t==="Object"&&o.constructor&&(t=o.constructor.name),t==="Map"||t==="Set"?Array.from(o):t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?uo(o,e):void 0}}const Mo=Object.entries,fo=Object.setPrototypeOf,js=Object.isFrozen,Hs=Object.getPrototypeOf,Ws=Object.getOwnPropertyDescriptor;let ae=Object.freeze,ie=Object.seal,st=Object.create,Po=typeof Reflect<"u"&&Reflect,En=Po.apply,Tn=Po.construct;ae||(ae=function(e){return e});ie||(ie=function(e){return e});En||(En=function(e,t){for(var n=arguments.length,s=new Array(n>2?n-2:0),r=2;r<n;r++)s[r-2]=arguments[r];return e.apply(t,s)});Tn||(Tn=function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),s=1;s<t;s++)n[s-1]=arguments[s];return new e(...n)});const ht=te(Array.prototype.forEach),Gs=te(Array.prototype.lastIndexOf),mo=te(Array.prototype.pop),ot=te(Array.prototype.push),Vs=te(Array.prototype.splice),ze=Array.isArray,wt=te(String.prototype.toLowerCase),pn=te(String.prototype.toString),ho=te(String.prototype.match),gt=te(String.prototype.replace),go=te(String.prototype.indexOf),qs=te(String.prototype.trim),Ys=te(Number.prototype.toString),Zs=te(Boolean.prototype.toString),bo=typeof BigInt>"u"?null:te(BigInt.prototype.toString),xo=typeof Symbol>"u"?null:te(Symbol.prototype.toString),se=te(Object.prototype.hasOwnProperty),bt=te(Object.prototype.toString),re=te(RegExp.prototype.test),Ve=Ks(TypeError);function te(o){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var t=arguments.length,n=new Array(t>1?t-1:0),s=1;s<t;s++)n[s-1]=arguments[s];return En(o,e,n)}}function Ks(o){return function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return Tn(o,t)}}function F(o,e){let t=arguments.length>2&&arguments[2]!==void 0?arguments[2]:wt;if(fo&&fo(o,null),!ze(e))return o;let n=e.length;for(;n--;){let s=e[n];if(typeof s=="string"){const r=t(s);r!==s&&(js(e)||(e[n]=r),s=r)}o[s]=!0}return o}function Xs(o){for(let e=0;e<o.length;e++)se(o,e)||(o[e]=null);return o}function ue(o){const e=st(null);for(const n of Mo(o)){var t=Us(n,2);const s=t[0],r=t[1];se(o,s)&&(ze(r)?e[s]=Xs(r):r&&typeof r=="object"&&r.constructor===Object?e[s]=ue(r):e[s]=r)}return e}function Qs(o){switch(typeof o){case"string":return o;case"number":return Ys(o);case"boolean":return Zs(o);case"bigint":return bo?bo(o):"0";case"symbol":return xo?xo(o):"Symbol()";case"undefined":return bt(o);case"function":case"object":{if(o===null)return bt(o);const e=o,t=Se(e,"toString");if(typeof t=="function"){const n=t(e);return typeof n=="string"?n:bt(n)}return bt(o)}default:return bt(o)}}function Se(o,e){for(;o!==null;){const n=Ws(o,e);if(n){if(n.get)return te(n.get);if(typeof n.value=="function")return te(n.value)}o=Hs(o)}function t(){return null}return t}function Js(o){try{return re(o,""),!0}catch{return!1}}const yo=ae(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),un=ae(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),fn=ae(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),er=ae(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),mn=ae(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),tr=ae(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),wo=ae(["#text"]),vo=ae(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","command","commandfor","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns"]),hn=ae(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),ko=ae(["accent","accentunder","align","bevelled","close","columnalign","columnlines","columnspacing","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lquote","lspace","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Nt=ae(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),nr=ie(/{{[\w\W]*|^[\w\W]*}}/g),or=ie(/<%[\w\W]*|^[\w\W]*%>/g),sr=ie(/\${[\w\W]*/g),rr=ie(/^data-[\-\w.\u00B7-\uFFFF]+$/),ar=ie(/^aria-[\-\w]+$/),Eo=ie(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),ir=ie(/^(?:\w+script|data):/i),lr=ie(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),cr=ie(/^html$/i),dr=ie(/^[a-z][.\w]*(-[.\w]+)+$/i),To=ie(/<[/\w!]/g),pr=ie(/<[/\w]/g),ur=ie(/<\/no(script|embed|frames)/i),fr=ie(/\/>/i),Te={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,processingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},mr=function(){return typeof window>"u"?null:window},hr=function(e,t){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let n=null;const s="data-tt-policy-suffix";t&&t.hasAttribute(s)&&(n=t.getAttribute(s));const r="dompurify"+(n?"#"+n:"");try{return e.createPolicy(r,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+r+" could not be created."),null}},So=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}},Be=function(e,t,n,s){return se(e,t)&&ze(e[t])?F(s.base?ue(s.base):{},e[t],s.transform):n};function Bo(){let o=arguments.length>0&&arguments[0]!==void 0?arguments[0]:mr();const e=w=>Bo(w);if(e.version="3.4.11",e.removed=[],!o||!o.document||o.document.nodeType!==Te.document||!o.Element)return e.isSupported=!1,e;let t=o.document;const n=t,s=n.currentScript;o.DocumentFragment;const r=o.HTMLTemplateElement,a=o.Node,l=o.Element,c=o.NodeFilter,p=o.NamedNodeMap;p===void 0&&(o.NamedNodeMap||o.MozNamedAttrMap),o.HTMLFormElement;const f=o.DOMParser,h=o.trustedTypes,u=l.prototype,b=Se(u,"cloneNode"),R=Se(u,"remove"),v=Se(u,"nextSibling"),m=Se(u,"childNodes"),k=Se(u,"parentNode"),S=Se(u,"shadowRoot"),y=Se(u,"attributes"),E=a&&a.prototype?Se(a.prototype,"nodeType"):null,P=a&&a.prototype?Se(a.prototype,"nodeName"):null;if(typeof r=="function"){const w=t.createElement("template");w.content&&w.content.ownerDocument&&(t=w.content.ownerDocument)}let D,$="",T,N=!1,L=0;const O=function(){if(L>0)throw Ve('A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted Types" section of the README.')},B=function(i){O(),L++;try{return D.createHTML(i)}finally{L--}},W=function(i){O(),L++;try{return D.createScriptURL(i)}finally{L--}},de=function(){return N||(T=hr(h,s),N=!0),T},q=t,le=q.implementation,ne=q.createNodeIterator,g=q.createDocumentFragment,_=q.getElementsByTagName,C=n.importNode;let A=So();e.isSupported=typeof Mo=="function"&&typeof k=="function"&&le&&le.createHTMLDocument!==void 0;const U=nr,V=or,ce=sr,me=rr,He=ar,$e=ir,dt=lr,ps=dr;let Bn=Eo,K=null;const zn=F({},[...yo,...un,...fn,...mn,...wo]);let X=null;const Un=F({},[...vo,...hn,...ko,...Nt]);let Q=Object.seal(st(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),pt=null,Fn=null;const Ne=Object.seal(st(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let jn=!0,qt=!0,Hn=!1,Wn=!0,Me=!1,ut=!0,We=!1,Yt=!1,Zt=null,Kt=null,Xt=!1,Qe=!1,It=!1,Lt=!1,Gn=!0,Vn=!1;const qn="user-content-";let Qt=!0,Jt=!1,Je={},ke=null;const en=F({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","selectedcontent","style","svg","template","thead","title","video","xmp"]);let Yn=null;const Zn=F({},["audio","video","img","source","image","track"]);let tn=null;const Kn=F({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Ct="http://www.w3.org/1998/Math/MathML",_t="http://www.w3.org/2000/svg",Ee="http://www.w3.org/1999/xhtml";let et=Ee,nn=!1,on=null;const us=F({},[Ct,_t,Ee],pn),Xn=ae(["mi","mo","mn","ms","mtext"]);let sn=F({},Xn);const Qn=ae(["annotation-xml"]);let rn=F({},Qn);const fs=F({},["title","style","font","a","script"]);let ft=null;const ms=["application/xhtml+xml","text/html"],hs="text/html";let J=null,tt=null;const gs=t.createElement("form"),Jn=function(i){return i instanceof RegExp||i instanceof Function},an=function(){let i=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(tt&&tt===i)return;(!i||typeof i!="object")&&(i={}),i=ue(i),ft=ms.indexOf(i.PARSER_MEDIA_TYPE)===-1?hs:i.PARSER_MEDIA_TYPE,J=ft==="application/xhtml+xml"?pn:wt,K=Be(i,"ALLOWED_TAGS",zn,{transform:J}),X=Be(i,"ALLOWED_ATTR",Un,{transform:J}),on=Be(i,"ALLOWED_NAMESPACES",us,{transform:pn}),tn=Be(i,"ADD_URI_SAFE_ATTR",Kn,{transform:J,base:Kn}),Yn=Be(i,"ADD_DATA_URI_TAGS",Zn,{transform:J,base:Zn}),ke=Be(i,"FORBID_CONTENTS",en,{transform:J}),pt=Be(i,"FORBID_TAGS",ue({}),{transform:J}),Fn=Be(i,"FORBID_ATTR",ue({}),{transform:J}),Je=se(i,"USE_PROFILES")?i.USE_PROFILES&&typeof i.USE_PROFILES=="object"?ue(i.USE_PROFILES):i.USE_PROFILES:!1,jn=i.ALLOW_ARIA_ATTR!==!1,qt=i.ALLOW_DATA_ATTR!==!1,Hn=i.ALLOW_UNKNOWN_PROTOCOLS||!1,Wn=i.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Me=i.SAFE_FOR_TEMPLATES||!1,ut=i.SAFE_FOR_XML!==!1,We=i.WHOLE_DOCUMENT||!1,Qe=i.RETURN_DOM||!1,It=i.RETURN_DOM_FRAGMENT||!1,Lt=i.RETURN_TRUSTED_TYPE||!1,Xt=i.FORCE_BODY||!1,Gn=i.SANITIZE_DOM!==!1,Vn=i.SANITIZE_NAMED_PROPS||!1,Qt=i.KEEP_CONTENT!==!1,Jt=i.IN_PLACE||!1,Bn=Js(i.ALLOWED_URI_REGEXP)?i.ALLOWED_URI_REGEXP:Eo,et=typeof i.NAMESPACE=="string"?i.NAMESPACE:Ee,sn=se(i,"MATHML_TEXT_INTEGRATION_POINTS")&&i.MATHML_TEXT_INTEGRATION_POINTS&&typeof i.MATHML_TEXT_INTEGRATION_POINTS=="object"?ue(i.MATHML_TEXT_INTEGRATION_POINTS):F({},Xn),rn=se(i,"HTML_INTEGRATION_POINTS")&&i.HTML_INTEGRATION_POINTS&&typeof i.HTML_INTEGRATION_POINTS=="object"?ue(i.HTML_INTEGRATION_POINTS):F({},Qn);const d=se(i,"CUSTOM_ELEMENT_HANDLING")&&i.CUSTOM_ELEMENT_HANDLING&&typeof i.CUSTOM_ELEMENT_HANDLING=="object"?ue(i.CUSTOM_ELEMENT_HANDLING):st(null);if(Q=st(null),se(d,"tagNameCheck")&&Jn(d.tagNameCheck)&&(Q.tagNameCheck=d.tagNameCheck),se(d,"attributeNameCheck")&&Jn(d.attributeNameCheck)&&(Q.attributeNameCheck=d.attributeNameCheck),se(d,"allowCustomizedBuiltInElements")&&typeof d.allowCustomizedBuiltInElements=="boolean"&&(Q.allowCustomizedBuiltInElements=d.allowCustomizedBuiltInElements),ie(Q),Me&&(qt=!1),It&&(Qe=!0),Je&&(K=F({},wo),X=st(null),Je.html===!0&&(F(K,yo),F(X,vo)),Je.svg===!0&&(F(K,un),F(X,hn),F(X,Nt)),Je.svgFilters===!0&&(F(K,fn),F(X,hn),F(X,Nt)),Je.mathMl===!0&&(F(K,mn),F(X,ko),F(X,Nt))),Ne.tagCheck=null,Ne.attributeCheck=null,se(i,"ADD_TAGS")&&(typeof i.ADD_TAGS=="function"?Ne.tagCheck=i.ADD_TAGS:ze(i.ADD_TAGS)&&(K===zn&&(K=ue(K)),F(K,i.ADD_TAGS,J))),se(i,"ADD_ATTR")&&(typeof i.ADD_ATTR=="function"?Ne.attributeCheck=i.ADD_ATTR:ze(i.ADD_ATTR)&&(X===Un&&(X=ue(X)),F(X,i.ADD_ATTR,J))),se(i,"ADD_URI_SAFE_ATTR")&&ze(i.ADD_URI_SAFE_ATTR)&&F(tn,i.ADD_URI_SAFE_ATTR,J),se(i,"FORBID_CONTENTS")&&ze(i.FORBID_CONTENTS)&&(ke===en&&(ke=ue(ke)),F(ke,i.FORBID_CONTENTS,J)),se(i,"ADD_FORBID_CONTENTS")&&ze(i.ADD_FORBID_CONTENTS)&&(ke===en&&(ke=ue(ke)),F(ke,i.ADD_FORBID_CONTENTS,J)),Qt&&(K["#text"]=!0),We&&F(K,["html","head","body"]),K.table&&(F(K,["tbody"]),delete pt.tbody),i.TRUSTED_TYPES_POLICY){if(typeof i.TRUSTED_TYPES_POLICY.createHTML!="function")throw Ve('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof i.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Ve('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');const x=D;D=i.TRUSTED_TYPES_POLICY;try{$=B("")}catch(I){throw D=x,I}}else i.TRUSTED_TYPES_POLICY===null?(D=void 0,$=""):(D===void 0&&(D=de()),D&&typeof $=="string"&&($=B("")));ae&&ae(i),tt=i},eo=F({},[...un,...fn,...er]),to=F({},[...mn,...tr]),bs=function(i,d,x){return d.namespaceURI===Ee?i==="svg":d.namespaceURI===Ct?i==="svg"&&(x==="annotation-xml"||sn[x]):!!eo[i]},xs=function(i,d,x){return d.namespaceURI===Ee?i==="math":d.namespaceURI===_t?i==="math"&&rn[x]:!!to[i]},ys=function(i,d,x){return d.namespaceURI===_t&&!rn[x]||d.namespaceURI===Ct&&!sn[x]?!1:!to[i]&&(fs[i]||!eo[i])},ws=function(i){let d=k(i);(!d||!d.tagName)&&(d={namespaceURI:et,tagName:"template"});const x=wt(i.tagName),I=wt(d.tagName);return on[i.namespaceURI]?i.namespaceURI===_t?bs(x,d,I):i.namespaceURI===Ct?xs(x,d,I):i.namespaceURI===Ee?ys(x,d,I):!!(ft==="application/xhtml+xml"&&on[i.namespaceURI]):!1},Pe=function(i){ot(e.removed,{element:i});try{k(i).removeChild(i)}catch{if(R(i),!k(i))throw Ve("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place")}},no=function(i){const d=m(i);if(d){const I=[];ht(d,z=>{ot(I,z)}),ht(I,z=>{try{R(z)}catch{}})}const x=y(i);if(x)for(let I=x.length-1;I>=0;--I){const z=x[I],j=z&&z.name;if(typeof j=="string")try{i.removeAttribute(j)}catch{}}},Ge=function(i,d){try{ot(e.removed,{attribute:d.getAttributeNode(i),from:d})}catch{ot(e.removed,{attribute:null,from:d})}if(d.removeAttribute(i),i==="is")if(Qe||It)try{Pe(d)}catch{}else try{d.setAttribute(i,"")}catch{}},vs=function(i){const d=y(i);if(d)for(let x=d.length-1;x>=0;--x){const I=d[x],z=I&&I.name;if(!(typeof z!="string"||X[J(z)]))try{i.removeAttribute(z)}catch{}}},ks=function(i){const d=[i];for(;d.length>0;){const x=d.pop();(E?E(x):x.nodeType)===Te.element&&vs(x);const z=m(x);if(z)for(let j=z.length-1;j>=0;--j)d.push(z[j])}},oo=function(i){let d=null,x=null;if(Xt)i="<remove></remove>"+i;else{const j=ho(i,/^[\r\n\t ]+/);x=j&&j[0]}ft==="application/xhtml+xml"&&et===Ee&&(i='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+i+"</body></html>");const I=D?B(i):i;if(et===Ee)try{d=new f().parseFromString(I,ft)}catch{}if(!d||!d.documentElement){d=le.createDocument(et,"template",null);try{d.documentElement.innerHTML=nn?$:I}catch{}}const z=d.body||d.documentElement;return i&&x&&z.insertBefore(t.createTextNode(x),z.childNodes[0]||null),et===Ee?_.call(d,We?"html":"body")[0]:We?d.documentElement:z},so=function(i){return ne.call(i.ownerDocument||i,i,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},Rt=function(i){return i=gt(i,U," "),i=gt(i,V," "),i=gt(i,ce," "),i},ln=function(i){var d;i.normalize();const x=ne.call(i.ownerDocument||i,i,c.SHOW_TEXT|c.SHOW_COMMENT|c.SHOW_CDATA_SECTION|c.SHOW_PROCESSING_INSTRUCTION,null);let I=x.nextNode();for(;I;)I.data=Rt(I.data),I=x.nextNode();const z=(d=i.querySelectorAll)===null||d===void 0?void 0:d.call(i,"template");z&&ht(z,j=>{nt(j.content)&&ln(j.content)})},Ot=function(i){const d=P?P(i):null;return typeof d!="string"||J(d)!=="form"?!1:typeof i.nodeName!="string"||typeof i.textContent!="string"||typeof i.removeChild!="function"||i.attributes!==y(i)||typeof i.removeAttribute!="function"||typeof i.setAttribute!="function"||typeof i.namespaceURI!="string"||typeof i.insertBefore!="function"||typeof i.hasChildNodes!="function"||i.nodeType!==E(i)||i.childNodes!==m(i)},nt=function(i){if(!E||typeof i!="object"||i===null)return!1;try{return E(i)===Te.documentFragment}catch{return!1}},mt=function(i){if(!E||typeof i!="object"||i===null)return!1;try{return typeof E(i)=="number"}catch{return!1}};function Re(w,i,d){w.length!==0&&ht(w,x=>{x.call(e,i,d,tt)})}const Es=function(i,d){return!!(ut&&i.hasChildNodes()&&!mt(i.firstElementChild)&&re(To,i.textContent)&&re(To,i.innerHTML)||ut&&i.namespaceURI===Ee&&d==="style"&&mt(i.firstElementChild)||i.nodeType===Te.processingInstruction||ut&&i.nodeType===Te.comment&&re(pr,i.data))},Ts=function(i,d){if(!pt[d]&&io(d)&&(Q.tagNameCheck instanceof RegExp&&re(Q.tagNameCheck,d)||Q.tagNameCheck instanceof Function&&Q.tagNameCheck(d)))return!1;if(Qt&&!ke[d]){const x=k(i),I=m(i);if(I&&x){const z=I.length;for(let j=z-1;j>=0;--j){const oe=Jt?I[j]:b(I[j],!0);x.insertBefore(oe,v(i))}}}return Pe(i),!0},ro=function(i){if(Re(A.beforeSanitizeElements,i,null),Ot(i))return Pe(i),!0;const d=J(P?P(i):i.nodeName);if(Re(A.uponSanitizeElement,i,{tagName:d,allowedTags:K}),Es(i,d))return Pe(i),!0;if(pt[d]||!(Ne.tagCheck instanceof Function&&Ne.tagCheck(d))&&!K[d])return Ts(i,d);if((E?E(i):i.nodeType)===Te.element&&!ws(i)||(d==="noscript"||d==="noembed"||d==="noframes")&&re(ur,i.innerHTML))return Pe(i),!0;if(Me&&i.nodeType===Te.text){const I=Rt(i.textContent);i.textContent!==I&&(ot(e.removed,{element:i.cloneNode()}),i.textContent=I)}return Re(A.afterSanitizeElements,i,null),!1},ao=function(i,d,x){if(Fn[d]||Gn&&(d==="id"||d==="name")&&(x in t||x in gs))return!1;const I=X[d]||Ne.attributeCheck instanceof Function&&Ne.attributeCheck(d,i);if(!(qt&&re(me,d))){if(!(jn&&re(He,d))){if(I){if(!tn[d]){if(!re(Bn,gt(x,dt,""))){if(!((d==="src"||d==="xlink:href"||d==="href")&&i!=="script"&&go(x,"data:")===0&&Yn[i])){if(!(Hn&&!re($e,gt(x,dt,"")))){if(x)return!1}}}}}else if(!(io(i)&&(Q.tagNameCheck instanceof RegExp&&re(Q.tagNameCheck,i)||Q.tagNameCheck instanceof Function&&Q.tagNameCheck(i))&&(Q.attributeNameCheck instanceof RegExp&&re(Q.attributeNameCheck,d)||Q.attributeNameCheck instanceof Function&&Q.attributeNameCheck(d,i))||d==="is"&&Q.allowCustomizedBuiltInElements&&(Q.tagNameCheck instanceof RegExp&&re(Q.tagNameCheck,x)||Q.tagNameCheck instanceof Function&&Q.tagNameCheck(x))))return!1}}return!0},Ss=F({},["annotation-xml","color-profile","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","missing-glyph"]),io=function(i){return!Ss[wt(i)]&&re(ps,i)},As=function(i,d,x,I){if(D&&typeof h=="object"&&typeof h.getAttributeType=="function"&&!x)switch(h.getAttributeType(i,d)){case"TrustedHTML":return B(I);case"TrustedScriptURL":return W(I)}return I},Is=function(i,d,x,I){try{x?i.setAttributeNS(x,d,I):i.setAttribute(d,I),Ot(i)?Pe(i):mo(e.removed)}catch{Ge(d,i)}},lo=function(i){Re(A.beforeSanitizeAttributes,i,null);const d=i.attributes;if(!d||Ot(i))return;const x={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:X,forceKeepAttr:void 0};let I=d.length;const z=J(i.nodeName);for(;I--;){const j=d[I],oe=j.name,ee=j.namespaceURI,be=j.value,ye=J(oe),dn=be;let pe=oe==="value"?dn:qs(dn);if(x.attrName=ye,x.attrValue=pe,x.keepAttr=!0,x.forceKeepAttr=void 0,Re(A.uponSanitizeAttribute,i,x),pe=x.attrValue,Vn&&(ye==="id"||ye==="name")&&go(pe,qn)!==0&&(Ge(oe,i),pe=qn+pe),ut&&re(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i,pe)){Ge(oe,i);continue}if(ye==="attributename"&&ho(pe,"href")){Ge(oe,i);continue}if(!x.forceKeepAttr){if(!x.keepAttr){Ge(oe,i);continue}if(!Wn&&re(fr,pe)){Ge(oe,i);continue}if(Me&&(pe=Rt(pe)),!ao(z,ye,pe)){Ge(oe,i);continue}pe=As(z,ye,ee,pe),pe!==dn&&Is(i,oe,ee,pe)}}Re(A.afterSanitizeAttributes,i,null)},Dt=function(i){let d=null;const x=so(i);for(Re(A.beforeSanitizeShadowDOM,i,null);d=x.nextNode();)if(Re(A.uponSanitizeShadowNode,d,null),ro(d),lo(d),nt(d.content)&&Dt(d.content),(E?E(d):d.nodeType)===Te.element){const z=S(d);nt(z)&&(cn(z),Dt(z))}Re(A.afterSanitizeShadowDOM,i,null)},cn=function(i){const d=[{node:i,shadow:null}];for(;d.length>0;){const x=d.pop();if(x.shadow){Dt(x.shadow);continue}const I=x.node,j=(E?E(I):I.nodeType)===Te.element,oe=m(I);if(oe)for(let ee=oe.length-1;ee>=0;--ee)d.push({node:oe[ee],shadow:null});if(j){const ee=P?P(I):null;if(typeof ee=="string"&&J(ee)==="template"){const be=I.content;nt(be)&&d.push({node:be,shadow:null})}}if(j){const ee=S(I);nt(ee)&&d.push({node:null,shadow:ee},{node:ee,shadow:null})}}};return e.sanitize=function(w){let i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},d=null,x=null,I=null,z=null;if(nn=!w,nn&&(w="<!-->"),typeof w!="string"&&!mt(w)&&(w=Qs(w),typeof w!="string"))throw Ve("dirty is not a string, aborting");if(!e.isSupported)return w;Yt?(K=Zt,X=Kt):an(i),(A.uponSanitizeElement.length>0||A.uponSanitizeAttribute.length>0)&&(K=ue(K)),A.uponSanitizeAttribute.length>0&&(X=ue(X)),e.removed=[];const j=Jt&&typeof w!="string"&&mt(w);if(j){const be=P?P(w):w.nodeName;if(typeof be=="string"){const ye=J(be);if(!K[ye]||pt[ye])throw Ve("root node is forbidden and cannot be sanitized in-place")}if(Ot(w))throw Ve("root node is clobbered and cannot be sanitized in-place");try{cn(w)}catch(ye){throw no(w),ye}}else if(mt(w))d=oo("<!---->"),x=d.ownerDocument.importNode(w,!0),x.nodeType===Te.element&&x.nodeName==="BODY"||x.nodeName==="HTML"?d=x:d.appendChild(x),cn(x);else{if(!Qe&&!Me&&!We&&w.indexOf("<")===-1)return D&&Lt?B(w):w;if(d=oo(w),!d)return Qe?null:Lt?$:""}d&&Xt&&Pe(d.firstChild);const oe=so(j?w:d);try{for(;I=oe.nextNode();)ro(I),lo(I),nt(I.content)&&Dt(I.content)}catch(be){throw j&&no(w),be}if(j)return ht(e.removed,be=>{be.element&&ks(be.element)}),Me&&ln(w),w;if(Qe){if(Me&&ln(d),It)for(z=g.call(d.ownerDocument);d.firstChild;)z.appendChild(d.firstChild);else z=d;return(X.shadowroot||X.shadowrootmode)&&(z=C.call(n,z,!0)),z}let ee=We?d.outerHTML:d.innerHTML;return We&&K["!doctype"]&&d.ownerDocument&&d.ownerDocument.doctype&&d.ownerDocument.doctype.name&&re(cr,d.ownerDocument.doctype.name)&&(ee="<!DOCTYPE "+d.ownerDocument.doctype.name+`>
`+ee),Me&&(ee=Rt(ee)),D&&Lt?B(ee):ee},e.setConfig=function(){let w=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};an(w),Yt=!0,Zt=K,Kt=X},e.clearConfig=function(){tt=null,Yt=!1,Zt=null,Kt=null,D=T,$=""},e.isValidAttribute=function(w,i,d){tt||an({});const x=J(w),I=J(i);return ao(x,I,d)},e.addHook=function(w,i){typeof i=="function"&&se(A,w)&&ot(A[w],i)},e.removeHook=function(w,i){if(se(A,w)){if(i!==void 0){const d=Gs(A[w],i);return d===-1?void 0:Vs(A[w],d,1)[0]}return mo(A[w])}},e.removeHooks=function(w){se(A,w)&&(A[w]=[])},e.removeAllHooks=function(){A=So()},e}var Sn=Bo();function Rn(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}let Xe=Rn();function zo(o){Xe=o}const Uo=/[&<>"']/,gr=new RegExp(Uo.source,"g"),Fo=/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,br=new RegExp(Fo.source,"g"),xr={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Ao=o=>xr[o];function he(o,e){if(e){if(Uo.test(o))return o.replace(gr,Ao)}else if(Fo.test(o))return o.replace(br,Ao);return o}const yr=/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;function wr(o){return o.replace(yr,(e,t)=>(t=t.toLowerCase(),t==="colon"?":":t.charAt(0)==="#"?t.charAt(1)==="x"?String.fromCharCode(parseInt(t.substring(2),16)):String.fromCharCode(+t.substring(1)):""))}const vr=/(^|[^\[])\^/g;function G(o,e){let t=typeof o=="string"?o:o.source;e=e||"";const n={replace:(s,r)=>{let a=typeof r=="string"?r:r.source;return a=a.replace(vr,"$1"),t=t.replace(s,a),n},getRegex:()=>new RegExp(t,e)};return n}function Io(o){try{o=encodeURI(o).replace(/%25/g,"%")}catch{return null}return o}const kt={exec:()=>null};function Lo(o,e){const t=o.replace(/\|/g,(r,a,l)=>{let c=!1,p=a;for(;--p>=0&&l[p]==="\\";)c=!c;return c?"|":" |"}),n=t.split(/ \|/);let s=0;if(n[0].trim()||n.shift(),n.length>0&&!n[n.length-1].trim()&&n.pop(),e)if(n.length>e)n.splice(e);else for(;n.length<e;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(/\\\|/g,"|");return n}function Mt(o,e,t){const n=o.length;if(n===0)return"";let s=0;for(;s<n&&o.charAt(n-s-1)===e;)s++;return o.slice(0,n-s)}function kr(o,e){if(o.indexOf(e[1])===-1)return-1;let t=0;for(let n=0;n<o.length;n++)if(o[n]==="\\")n++;else if(o[n]===e[0])t++;else if(o[n]===e[1]&&(t--,t<0))return n;return-1}function Co(o,e,t,n){const s=e.href,r=e.title?he(e.title):null,a=o[1].replace(/\\([\[\]])/g,"$1");if(o[0].charAt(0)!=="!"){n.state.inLink=!0;const l={type:"link",raw:t,href:s,title:r,text:a,tokens:n.inlineTokens(a)};return n.state.inLink=!1,l}return{type:"image",raw:t,href:s,title:r,text:he(a)}}function Er(o,e){const t=o.match(/^(\s+)(?:```)/);if(t===null)return e;const n=t[1];return e.split(`
`).map(s=>{const r=s.match(/^\s+/);if(r===null)return s;const[a]=r;return a.length>=n.length?s.slice(n.length):s}).join(`
`)}class jt{constructor(e){Z(this,"options");Z(this,"rules");Z(this,"lexer");this.options=e||Xe}space(e){const t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){const t=this.rules.block.code.exec(e);if(t){const n=t[0].replace(/^ {1,4}/gm,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:Mt(n,`
`)}}}fences(e){const t=this.rules.block.fences.exec(e);if(t){const n=t[0],s=Er(n,t[3]||"");return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:s}}}heading(e){const t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(/#$/.test(n)){const s=Mt(n,"#");(this.options.pedantic||!s||/ $/.test(s))&&(n=s.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){const t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:t[0]}}blockquote(e){const t=this.rules.block.blockquote.exec(e);if(t){let n=t[0].replace(/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,`
    $1`);n=Mt(n.replace(/^ *>[ \t]?/gm,""),`
`);const s=this.lexer.state.top;this.lexer.state.top=!0;const r=this.lexer.blockTokens(n);return this.lexer.state.top=s,{type:"blockquote",raw:t[0],tokens:r,text:n}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim();const s=n.length>1,r={type:"list",raw:"",ordered:s,start:s?+n.slice(0,-1):"",loose:!1,items:[]};n=s?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=s?n:"[*+-]");const a=new RegExp(`^( {0,3}${n})((?:[	 ][^\\n]*)?(?:\\n|$))`);let l="",c="",p=!1;for(;e;){let f=!1;if(!(t=a.exec(e))||this.rules.block.hr.test(e))break;l=t[0],e=e.substring(l.length);let h=t[2].split(`
`,1)[0].replace(/^\t+/,k=>" ".repeat(3*k.length)),u=e.split(`
`,1)[0],b=0;this.options.pedantic?(b=2,c=h.trimStart()):(b=t[2].search(/[^ ]/),b=b>4?1:b,c=h.slice(b),b+=t[1].length);let R=!1;if(!h&&/^ *$/.test(u)&&(l+=u+`
`,e=e.substring(u.length+1),f=!0),!f){const k=new RegExp(`^ {0,${Math.min(3,b-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),S=new RegExp(`^ {0,${Math.min(3,b-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),y=new RegExp(`^ {0,${Math.min(3,b-1)}}(?:\`\`\`|~~~)`),E=new RegExp(`^ {0,${Math.min(3,b-1)}}#`);for(;e;){const P=e.split(`
`,1)[0];if(u=P,this.options.pedantic&&(u=u.replace(/^ {1,4}(?=( {4})*[^ ])/g,"  ")),y.test(u)||E.test(u)||k.test(u)||S.test(e))break;if(u.search(/[^ ]/)>=b||!u.trim())c+=`
`+u.slice(b);else{if(R||h.search(/[^ ]/)>=4||y.test(h)||E.test(h)||S.test(h))break;c+=`
`+u}!R&&!u.trim()&&(R=!0),l+=P+`
`,e=e.substring(P.length+1),h=u.slice(b)}}r.loose||(p?r.loose=!0:/\n *\n *$/.test(l)&&(p=!0));let v=null,m;this.options.gfm&&(v=/^\[[ xX]\] /.exec(c),v&&(m=v[0]!=="[ ] ",c=c.replace(/^\[[ xX]\] +/,""))),r.items.push({type:"list_item",raw:l,task:!!v,checked:m,loose:!1,text:c,tokens:[]}),r.raw+=l}r.items[r.items.length-1].raw=l.trimEnd(),r.items[r.items.length-1].text=c.trimEnd(),r.raw=r.raw.trimEnd();for(let f=0;f<r.items.length;f++)if(this.lexer.state.top=!1,r.items[f].tokens=this.lexer.blockTokens(r.items[f].text,[]),!r.loose){const h=r.items[f].tokens.filter(b=>b.type==="space"),u=h.length>0&&h.some(b=>/\n.*\n/.test(b.raw));r.loose=u}if(r.loose)for(let f=0;f<r.items.length;f++)r.items[f].loose=!0;return r}}html(e){const t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){const t=this.rules.block.def.exec(e);if(t){const n=t[1].toLowerCase().replace(/\s+/g," "),s=t[2]?t[2].replace(/^<(.*)>$/,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",r=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:s,title:r}}}table(e){const t=this.rules.block.table.exec(e);if(!t||!/[:|]/.test(t[2]))return;const n=Lo(t[1]),s=t[2].replace(/^\||\| *$/g,"").split("|"),r=t[3]&&t[3].trim()?t[3].replace(/\n[ \t]*$/,"").split(`
`):[],a={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===s.length){for(const l of s)/^ *-+: *$/.test(l)?a.align.push("right"):/^ *:-+: *$/.test(l)?a.align.push("center"):/^ *:-+ *$/.test(l)?a.align.push("left"):a.align.push(null);for(const l of n)a.header.push({text:l,tokens:this.lexer.inline(l)});for(const l of r)a.rows.push(Lo(l,a.header.length).map(c=>({text:c,tokens:this.lexer.inline(c)})));return a}}lheading(e){const t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){const t=this.rules.block.paragraph.exec(e);if(t){const n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){const t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){const t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:he(t[1])}}tag(e){const t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&/^<a /i.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&/^<\/a>/i.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&/^<(pre|code|kbd|script)(\s|>)/i.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&/^<\/(pre|code|kbd|script)(\s|>)/i.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){const t=this.rules.inline.link.exec(e);if(t){const n=t[2].trim();if(!this.options.pedantic&&/^</.test(n)){if(!/>$/.test(n))return;const a=Mt(n.slice(0,-1),"\\");if((n.length-a.length)%2===0)return}else{const a=kr(t[2],"()");if(a>-1){const c=(t[0].indexOf("!")===0?5:4)+t[1].length+a;t[2]=t[2].substring(0,a),t[0]=t[0].substring(0,c).trim(),t[3]=""}}let s=t[2],r="";if(this.options.pedantic){const a=/^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(s);a&&(s=a[1],r=a[3])}else r=t[3]?t[3].slice(1,-1):"";return s=s.trim(),/^</.test(s)&&(this.options.pedantic&&!/>$/.test(n)?s=s.slice(1):s=s.slice(1,-1)),Co(t,{href:s&&s.replace(this.rules.inline.anyPunctuation,"$1"),title:r&&r.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){const s=(n[2]||n[1]).replace(/\s+/g," "),r=t[s.toLowerCase()];if(!r){const a=n[0].charAt(0);return{type:"text",raw:a,text:a}}return Co(n,r,n[0],this.lexer)}}emStrong(e,t,n=""){let s=this.rules.inline.emStrongLDelim.exec(e);if(!s||s[3]&&n.match(/[\p{L}\p{N}]/u))return;if(!(s[1]||s[2]||"")||!n||this.rules.inline.punctuation.exec(n)){const a=[...s[0]].length-1;let l,c,p=a,f=0;const h=s[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(h.lastIndex=0,t=t.slice(-1*e.length+a);(s=h.exec(t))!=null;){if(l=s[1]||s[2]||s[3]||s[4]||s[5]||s[6],!l)continue;if(c=[...l].length,s[3]||s[4]){p+=c;continue}else if((s[5]||s[6])&&a%3&&!((a+c)%3)){f+=c;continue}if(p-=c,p>0)continue;c=Math.min(c,c+p+f);const u=[...s[0]][0].length,b=e.slice(0,a+s.index+u+c);if(Math.min(a,c)%2){const v=b.slice(1,-1);return{type:"em",raw:b,text:v,tokens:this.lexer.inlineTokens(v)}}const R=b.slice(2,-2);return{type:"strong",raw:b,text:R,tokens:this.lexer.inlineTokens(R)}}}}codespan(e){const t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(/\n/g," ");const s=/[^ ]/.test(n),r=/^ /.test(n)&&/ $/.test(n);return s&&r&&(n=n.substring(1,n.length-1)),n=he(n,!0),{type:"codespan",raw:t[0],text:n}}}br(e){const t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){const t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){const t=this.rules.inline.autolink.exec(e);if(t){let n,s;return t[2]==="@"?(n=he(t[1]),s="mailto:"+n):(n=he(t[1]),s=n),{type:"link",raw:t[0],text:n,href:s,tokens:[{type:"text",raw:n,text:n}]}}}url(e){var n;let t;if(t=this.rules.inline.url.exec(e)){let s,r;if(t[2]==="@")s=he(t[0]),r="mailto:"+s;else{let a;do a=t[0],t[0]=((n=this.rules.inline._backpedal.exec(t[0]))==null?void 0:n[0])??"";while(a!==t[0]);s=he(t[0]),t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:s,href:r,tokens:[{type:"text",raw:s,text:s}]}}}inlineText(e){const t=this.rules.inline.text.exec(e);if(t){let n;return this.lexer.state.inRawBlock?n=t[0]:n=he(t[0]),{type:"text",raw:t[0],text:n}}}}const Tr=/^(?: *(?:\n|$))+/,Sr=/^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,Ar=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,St=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Ir=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,jo=/(?:[*+-]|\d{1,9}[.)])/,Ho=G(/^(?!bull |blockCode|fences|blockquote|heading|html)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html))+?)\n {0,3}(=+|-+) *(?:\n+|$)/).replace(/bull/g,jo).replace(/blockCode/g,/ {4}/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).getRegex(),On=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Lr=/^[^\n]+/,Dn=/(?!\s*\])(?:\\.|[^\[\]\\])+/,Cr=G(/^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/).replace("label",Dn).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),_r=G(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,jo).getRegex(),Vt="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",$n=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Rr=G("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))","i").replace("comment",$n).replace("tag",Vt).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Wo=G(On).replace("hr",St).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Vt).getRegex(),Or=G(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Wo).getRegex(),Nn={blockquote:Or,code:Sr,def:Cr,fences:Ar,heading:Ir,hr:St,html:Rr,lheading:Ho,list:_r,newline:Tr,paragraph:Wo,table:kt,text:Lr},_o=G("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",St).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code"," {4}[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Vt).getRegex(),Dr={...Nn,table:_o,paragraph:G(On).replace("hr",St).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",_o).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Vt).getRegex()},$r={...Nn,html:G(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",$n).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:kt,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:G(On).replace("hr",St).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Ho).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Go=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Nr=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Vo=/^( {2,}|\\)\n(?!\s*$)/,Mr=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,At="\\p{P}\\p{S}",Pr=G(/^((?![*_])[\spunctuation])/,"u").replace(/punctuation/g,At).getRegex(),Br=/\[[^[\]]*?\]\([^\(\)]*?\)|`[^`]*?`|<[^<>]*?>/g,zr=G(/^(?:\*+(?:((?!\*)[punct])|[^\s*]))|^_+(?:((?!_)[punct])|([^\s_]))/,"u").replace(/punct/g,At).getRegex(),Ur=G("^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)[punct](\\*+)(?=[\\s]|$)|[^punct\\s](\\*+)(?!\\*)(?=[punct\\s]|$)|(?!\\*)[punct\\s](\\*+)(?=[^punct\\s])|[\\s](\\*+)(?!\\*)(?=[punct])|(?!\\*)[punct](\\*+)(?!\\*)(?=[punct])|[^punct\\s](\\*+)(?=[^punct\\s])","gu").replace(/punct/g,At).getRegex(),Fr=G("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)[punct](_+)(?=[\\s]|$)|[^punct\\s](_+)(?!_)(?=[punct\\s]|$)|(?!_)[punct\\s](_+)(?=[^punct\\s])|[\\s](_+)(?!_)(?=[punct])|(?!_)[punct](_+)(?!_)(?=[punct])","gu").replace(/punct/g,At).getRegex(),jr=G(/\\([punct])/,"gu").replace(/punct/g,At).getRegex(),Hr=G(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Wr=G($n).replace("(?:-->|$)","-->").getRegex(),Gr=G("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Wr).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Ht=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,Vr=G(/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/).replace("label",Ht).replace("href",/<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),qo=G(/^!?\[(label)\]\[(ref)\]/).replace("label",Ht).replace("ref",Dn).getRegex(),Yo=G(/^!?\[(ref)\](?:\[\])?/).replace("ref",Dn).getRegex(),qr=G("reflink|nolink(?!\\()","g").replace("reflink",qo).replace("nolink",Yo).getRegex(),Mn={_backpedal:kt,anyPunctuation:jr,autolink:Hr,blockSkip:Br,br:Vo,code:Nr,del:kt,emStrongLDelim:zr,emStrongRDelimAst:Ur,emStrongRDelimUnd:Fr,escape:Go,link:Vr,nolink:Yo,punctuation:Pr,reflink:qo,reflinkSearch:qr,tag:Gr,text:Mr,url:kt},Yr={...Mn,link:G(/^!?\[(label)\]\((.*?)\)/).replace("label",Ht).getRegex(),reflink:G(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Ht).getRegex()},An={...Mn,escape:G(Go).replace("])","~|])").getRegex(),url:G(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},Zr={...An,br:G(Vo).replace("{2,}","*").getRegex(),text:G(An.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Pt={normal:Nn,gfm:Dr,pedantic:$r},xt={normal:Mn,gfm:An,breaks:Zr,pedantic:Yr};class Le{constructor(e){Z(this,"tokens");Z(this,"options");Z(this,"state");Z(this,"tokenizer");Z(this,"inlineQueue");this.tokens=[],this.tokens.links=Object.create(null),this.options=e||Xe,this.options.tokenizer=this.options.tokenizer||new jt,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const t={block:Pt.normal,inline:xt.normal};this.options.pedantic?(t.block=Pt.pedantic,t.inline=xt.pedantic):this.options.gfm&&(t.block=Pt.gfm,this.options.breaks?t.inline=xt.breaks:t.inline=xt.gfm),this.tokenizer.rules=t}static get rules(){return{block:Pt,inline:xt}}static lex(e,t){return new Le(t).lex(e)}static lexInline(e,t){return new Le(t).inlineTokens(e)}lex(e){e=e.replace(/\r\n|\r/g,`
`),this.blockTokens(e,this.tokens);for(let t=0;t<this.inlineQueue.length;t++){const n=this.inlineQueue[t];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,t=[]){this.options.pedantic?e=e.replace(/\t/g,"    ").replace(/^ +$/gm,""):e=e.replace(/^( *)(\t+)/gm,(l,c,p)=>c+"    ".repeat(p.length));let n,s,r,a;for(;e;)if(!(this.options.extensions&&this.options.extensions.block&&this.options.extensions.block.some(l=>(n=l.call({lexer:this},e,t))?(e=e.substring(n.raw.length),t.push(n),!0):!1))){if(n=this.tokenizer.space(e)){e=e.substring(n.raw.length),n.raw.length===1&&t.length>0?t[t.length-1].raw+=`
`:t.push(n);continue}if(n=this.tokenizer.code(e)){e=e.substring(n.raw.length),s=t[t.length-1],s&&(s.type==="paragraph"||s.type==="text")?(s.raw+=`
`+n.raw,s.text+=`
`+n.text,this.inlineQueue[this.inlineQueue.length-1].src=s.text):t.push(n);continue}if(n=this.tokenizer.fences(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.heading(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.hr(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.blockquote(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.list(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.html(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.def(e)){e=e.substring(n.raw.length),s=t[t.length-1],s&&(s.type==="paragraph"||s.type==="text")?(s.raw+=`
`+n.raw,s.text+=`
`+n.raw,this.inlineQueue[this.inlineQueue.length-1].src=s.text):this.tokens.links[n.tag]||(this.tokens.links[n.tag]={href:n.href,title:n.title});continue}if(n=this.tokenizer.table(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.lheading(e)){e=e.substring(n.raw.length),t.push(n);continue}if(r=e,this.options.extensions&&this.options.extensions.startBlock){let l=1/0;const c=e.slice(1);let p;this.options.extensions.startBlock.forEach(f=>{p=f.call({lexer:this},c),typeof p=="number"&&p>=0&&(l=Math.min(l,p))}),l<1/0&&l>=0&&(r=e.substring(0,l+1))}if(this.state.top&&(n=this.tokenizer.paragraph(r))){s=t[t.length-1],a&&s.type==="paragraph"?(s.raw+=`
`+n.raw,s.text+=`
`+n.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=s.text):t.push(n),a=r.length!==e.length,e=e.substring(n.raw.length);continue}if(n=this.tokenizer.text(e)){e=e.substring(n.raw.length),s=t[t.length-1],s&&s.type==="text"?(s.raw+=`
`+n.raw,s.text+=`
`+n.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=s.text):t.push(n);continue}if(e){const l="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(l);break}else throw new Error(l)}}return this.state.top=!0,t}inline(e,t=[]){return this.inlineQueue.push({src:e,tokens:t}),t}inlineTokens(e,t=[]){let n,s,r,a=e,l,c,p;if(this.tokens.links){const f=Object.keys(this.tokens.links);if(f.length>0)for(;(l=this.tokenizer.rules.inline.reflinkSearch.exec(a))!=null;)f.includes(l[0].slice(l[0].lastIndexOf("[")+1,-1))&&(a=a.slice(0,l.index)+"["+"a".repeat(l[0].length-2)+"]"+a.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(l=this.tokenizer.rules.inline.blockSkip.exec(a))!=null;)a=a.slice(0,l.index)+"["+"a".repeat(l[0].length-2)+"]"+a.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);for(;(l=this.tokenizer.rules.inline.anyPunctuation.exec(a))!=null;)a=a.slice(0,l.index)+"++"+a.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;e;)if(c||(p=""),c=!1,!(this.options.extensions&&this.options.extensions.inline&&this.options.extensions.inline.some(f=>(n=f.call({lexer:this},e,t))?(e=e.substring(n.raw.length),t.push(n),!0):!1))){if(n=this.tokenizer.escape(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.tag(e)){e=e.substring(n.raw.length),s=t[t.length-1],s&&n.type==="text"&&s.type==="text"?(s.raw+=n.raw,s.text+=n.text):t.push(n);continue}if(n=this.tokenizer.link(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(n.raw.length),s=t[t.length-1],s&&n.type==="text"&&s.type==="text"?(s.raw+=n.raw,s.text+=n.text):t.push(n);continue}if(n=this.tokenizer.emStrong(e,a,p)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.codespan(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.br(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.del(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.autolink(e)){e=e.substring(n.raw.length),t.push(n);continue}if(!this.state.inLink&&(n=this.tokenizer.url(e))){e=e.substring(n.raw.length),t.push(n);continue}if(r=e,this.options.extensions&&this.options.extensions.startInline){let f=1/0;const h=e.slice(1);let u;this.options.extensions.startInline.forEach(b=>{u=b.call({lexer:this},h),typeof u=="number"&&u>=0&&(f=Math.min(f,u))}),f<1/0&&f>=0&&(r=e.substring(0,f+1))}if(n=this.tokenizer.inlineText(r)){e=e.substring(n.raw.length),n.raw.slice(-1)!=="_"&&(p=n.raw.slice(-1)),c=!0,s=t[t.length-1],s&&s.type==="text"?(s.raw+=n.raw,s.text+=n.text):t.push(n);continue}if(e){const f="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(f);break}else throw new Error(f)}}return t}}class Wt{constructor(e){Z(this,"options");this.options=e||Xe}code(e,t,n){var r;const s=(r=(t||"").match(/^\S*/))==null?void 0:r[0];return e=e.replace(/\n$/,"")+`
`,s?'<pre><code class="language-'+he(s)+'">'+(n?e:he(e,!0))+`</code></pre>
`:"<pre><code>"+(n?e:he(e,!0))+`</code></pre>
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
`}strong(e){return`<strong>${e}</strong>`}em(e){return`<em>${e}</em>`}codespan(e){return`<code>${e}</code>`}br(){return"<br>"}del(e){return`<del>${e}</del>`}link(e,t,n){const s=Io(e);if(s===null)return n;e=s;let r='<a href="'+e+'"';return t&&(r+=' title="'+t+'"'),r+=">"+n+"</a>",r}image(e,t,n){const s=Io(e);if(s===null)return n;e=s;let r=`<img src="${e}" alt="${n}"`;return t&&(r+=` title="${t}"`),r+=">",r}text(e){return e}}class Pn{strong(e){return e}em(e){return e}codespan(e){return e}del(e){return e}html(e){return e}text(e){return e}link(e,t,n){return""+n}image(e,t,n){return""+n}br(){return""}}class Ce{constructor(e){Z(this,"options");Z(this,"renderer");Z(this,"textRenderer");this.options=e||Xe,this.options.renderer=this.options.renderer||new Wt,this.renderer=this.options.renderer,this.renderer.options=this.options,this.textRenderer=new Pn}static parse(e,t){return new Ce(t).parse(e)}static parseInline(e,t){return new Ce(t).parseInline(e)}parse(e,t=!0){let n="";for(let s=0;s<e.length;s++){const r=e[s];if(this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[r.type]){const a=r,l=this.options.extensions.renderers[a.type].call({parser:this},a);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(a.type)){n+=l||"";continue}}switch(r.type){case"space":continue;case"hr":{n+=this.renderer.hr();continue}case"heading":{const a=r;n+=this.renderer.heading(this.parseInline(a.tokens),a.depth,wr(this.parseInline(a.tokens,this.textRenderer)));continue}case"code":{const a=r;n+=this.renderer.code(a.text,a.lang,!!a.escaped);continue}case"table":{const a=r;let l="",c="";for(let f=0;f<a.header.length;f++)c+=this.renderer.tablecell(this.parseInline(a.header[f].tokens),{header:!0,align:a.align[f]});l+=this.renderer.tablerow(c);let p="";for(let f=0;f<a.rows.length;f++){const h=a.rows[f];c="";for(let u=0;u<h.length;u++)c+=this.renderer.tablecell(this.parseInline(h[u].tokens),{header:!1,align:a.align[u]});p+=this.renderer.tablerow(c)}n+=this.renderer.table(l,p);continue}case"blockquote":{const a=r,l=this.parse(a.tokens);n+=this.renderer.blockquote(l);continue}case"list":{const a=r,l=a.ordered,c=a.start,p=a.loose;let f="";for(let h=0;h<a.items.length;h++){const u=a.items[h],b=u.checked,R=u.task;let v="";if(u.task){const m=this.renderer.checkbox(!!b);p?u.tokens.length>0&&u.tokens[0].type==="paragraph"?(u.tokens[0].text=m+" "+u.tokens[0].text,u.tokens[0].tokens&&u.tokens[0].tokens.length>0&&u.tokens[0].tokens[0].type==="text"&&(u.tokens[0].tokens[0].text=m+" "+u.tokens[0].tokens[0].text)):u.tokens.unshift({type:"text",text:m+" "}):v+=m+" "}v+=this.parse(u.tokens,p),f+=this.renderer.listitem(v,R,!!b)}n+=this.renderer.list(f,l,c);continue}case"html":{const a=r;n+=this.renderer.html(a.text,a.block);continue}case"paragraph":{const a=r;n+=this.renderer.paragraph(this.parseInline(a.tokens));continue}case"text":{let a=r,l=a.tokens?this.parseInline(a.tokens):a.text;for(;s+1<e.length&&e[s+1].type==="text";)a=e[++s],l+=`
`+(a.tokens?this.parseInline(a.tokens):a.text);n+=t?this.renderer.paragraph(l):l;continue}default:{const a='Token with "'+r.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return n}parseInline(e,t){t=t||this.renderer;let n="";for(let s=0;s<e.length;s++){const r=e[s];if(this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[r.type]){const a=this.options.extensions.renderers[r.type].call({parser:this},r);if(a!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(r.type)){n+=a||"";continue}}switch(r.type){case"escape":{const a=r;n+=t.text(a.text);break}case"html":{const a=r;n+=t.html(a.text);break}case"link":{const a=r;n+=t.link(a.href,a.title,this.parseInline(a.tokens,t));break}case"image":{const a=r;n+=t.image(a.href,a.title,a.text);break}case"strong":{const a=r;n+=t.strong(this.parseInline(a.tokens,t));break}case"em":{const a=r;n+=t.em(this.parseInline(a.tokens,t));break}case"codespan":{const a=r;n+=t.codespan(a.text);break}case"br":{n+=t.br();break}case"del":{const a=r;n+=t.del(this.parseInline(a.tokens,t));break}case"text":{const a=r;n+=t.text(a.text);break}default:{const a='Token with "'+r.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return n}}class Et{constructor(e){Z(this,"options");this.options=e||Xe}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}}Z(Et,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens"]));var Ze,In,Zo;class Kr{constructor(...e){po(this,Ze);Z(this,"defaults",Rn());Z(this,"options",this.setOptions);Z(this,"parse",$t(this,Ze,In).call(this,Le.lex,Ce.parse));Z(this,"parseInline",$t(this,Ze,In).call(this,Le.lexInline,Ce.parseInline));Z(this,"Parser",Ce);Z(this,"Renderer",Wt);Z(this,"TextRenderer",Pn);Z(this,"Lexer",Le);Z(this,"Tokenizer",jt);Z(this,"Hooks",Et);this.use(...e)}walkTokens(e,t){var s,r;let n=[];for(const a of e)switch(n=n.concat(t.call(this,a)),a.type){case"table":{const l=a;for(const c of l.header)n=n.concat(this.walkTokens(c.tokens,t));for(const c of l.rows)for(const p of c)n=n.concat(this.walkTokens(p.tokens,t));break}case"list":{const l=a;n=n.concat(this.walkTokens(l.items,t));break}default:{const l=a;(r=(s=this.defaults.extensions)==null?void 0:s.childTokens)!=null&&r[l.type]?this.defaults.extensions.childTokens[l.type].forEach(c=>{const p=l[c].flat(1/0);n=n.concat(this.walkTokens(p,t))}):l.tokens&&(n=n.concat(this.walkTokens(l.tokens,t)))}}return n}use(...e){const t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{const s={...n};if(s.async=this.defaults.async||s.async||!1,n.extensions&&(n.extensions.forEach(r=>{if(!r.name)throw new Error("extension name required");if("renderer"in r){const a=t.renderers[r.name];a?t.renderers[r.name]=function(...l){let c=r.renderer.apply(this,l);return c===!1&&(c=a.apply(this,l)),c}:t.renderers[r.name]=r.renderer}if("tokenizer"in r){if(!r.level||r.level!=="block"&&r.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");const a=t[r.level];a?a.unshift(r.tokenizer):t[r.level]=[r.tokenizer],r.start&&(r.level==="block"?t.startBlock?t.startBlock.push(r.start):t.startBlock=[r.start]:r.level==="inline"&&(t.startInline?t.startInline.push(r.start):t.startInline=[r.start]))}"childTokens"in r&&r.childTokens&&(t.childTokens[r.name]=r.childTokens)}),s.extensions=t),n.renderer){const r=this.defaults.renderer||new Wt(this.defaults);for(const a in n.renderer){if(!(a in r))throw new Error(`renderer '${a}' does not exist`);if(a==="options")continue;const l=a,c=n.renderer[l],p=r[l];r[l]=(...f)=>{let h=c.apply(r,f);return h===!1&&(h=p.apply(r,f)),h||""}}s.renderer=r}if(n.tokenizer){const r=this.defaults.tokenizer||new jt(this.defaults);for(const a in n.tokenizer){if(!(a in r))throw new Error(`tokenizer '${a}' does not exist`);if(["options","rules","lexer"].includes(a))continue;const l=a,c=n.tokenizer[l],p=r[l];r[l]=(...f)=>{let h=c.apply(r,f);return h===!1&&(h=p.apply(r,f)),h}}s.tokenizer=r}if(n.hooks){const r=this.defaults.hooks||new Et;for(const a in n.hooks){if(!(a in r))throw new Error(`hook '${a}' does not exist`);if(a==="options")continue;const l=a,c=n.hooks[l],p=r[l];Et.passThroughHooks.has(a)?r[l]=f=>{if(this.defaults.async)return Promise.resolve(c.call(r,f)).then(u=>p.call(r,u));const h=c.call(r,f);return p.call(r,h)}:r[l]=(...f)=>{let h=c.apply(r,f);return h===!1&&(h=p.apply(r,f)),h}}s.hooks=r}if(n.walkTokens){const r=this.defaults.walkTokens,a=n.walkTokens;s.walkTokens=function(l){let c=[];return c.push(a.call(this,l)),r&&(c=c.concat(r.call(this,l))),c}}this.defaults={...this.defaults,...s}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Le.lex(e,t??this.defaults)}parser(e,t){return Ce.parse(e,t??this.defaults)}}Ze=new WeakSet,In=function(e,t){return(n,s)=>{const r={...s},a={...this.defaults,...r};this.defaults.async===!0&&r.async===!1&&(a.silent||console.warn("marked(): The async option was set to true by an extension. The async: false option sent to parse will be ignored."),a.async=!0);const l=$t(this,Ze,Zo).call(this,!!a.silent,!!a.async);if(typeof n>"u"||n===null)return l(new Error("marked(): input parameter is undefined or null"));if(typeof n!="string")return l(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(n)+", string expected"));if(a.hooks&&(a.hooks.options=a),a.async)return Promise.resolve(a.hooks?a.hooks.preprocess(n):n).then(c=>e(c,a)).then(c=>a.hooks?a.hooks.processAllTokens(c):c).then(c=>a.walkTokens?Promise.all(this.walkTokens(c,a.walkTokens)).then(()=>c):c).then(c=>t(c,a)).then(c=>a.hooks?a.hooks.postprocess(c):c).catch(l);try{a.hooks&&(n=a.hooks.preprocess(n));let c=e(n,a);a.hooks&&(c=a.hooks.processAllTokens(c)),a.walkTokens&&this.walkTokens(c,a.walkTokens);let p=t(c,a);return a.hooks&&(p=a.hooks.postprocess(p)),p}catch(c){return l(c)}}},Zo=function(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){const s="<p>An error occurred:</p><pre>"+he(n.message+"",!0)+"</pre>";return t?Promise.resolve(s):s}if(t)return Promise.reject(n);throw n}};const Ye=new Kr;function H(o,e){return Ye.parse(o,e)}H.options=H.setOptions=function(o){return Ye.setOptions(o),H.defaults=Ye.defaults,zo(H.defaults),H};H.getDefaults=Rn;H.defaults=Xe;H.use=function(...o){return Ye.use(...o),H.defaults=Ye.defaults,zo(H.defaults),H};H.walkTokens=function(o,e){return Ye.walkTokens(o,e)};H.parseInline=Ye.parseInline;H.Parser=Ce;H.parser=Ce.parse;H.Renderer=Wt;H.TextRenderer=Pn;H.Lexer=Le;H.lexer=Le.lex;H.Tokenizer=jt;H.Hooks=Et;H.parse=H;H.options;H.setOptions;H.use;H.walkTokens;H.parseInline;Ce.parse;Le.lex;const lt=new H.Renderer,Xr=lt.link.bind(lt);lt.link=(o,e,t)=>Xr(o,e,t).replace("<a ",'<a target="_blank" rel="noopener noreferrer" class="text-teal-400 hover:underline" ');lt.heading=(o,e)=>{const t=o.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");return`<h${e} id="${t}">${o}</h${e}>`};lt.table=(o,e)=>`<div class="overflow-x-auto my-4 max-w-full"><table class="w-full">${o}${e}</table></div>`;H.setOptions({renderer:lt,gfm:!0,breaks:!0});function Ko(){try{return parseInt(localStorage.getItem("secops-sanitize-count")||"0",10)}catch{return 0}}function Xo(){try{const o=Ko();localStorage.setItem("secops-sanitize-count",(o+1).toString())}catch{}}function ct(o){Xo();const e=H.parse(o);return Sn.sanitize(e,{ALLOWED_TAGS:["h1","h2","h3","h4","h5","h6","p","br","hr","a","span","ul","ol","li","strong","em","code","pre","blockquote","table","thead","tbody","tr","th","td","div"],ALLOWED_ATTR:["href","target","rel","class","id","align"]})}function Bt(o){return o.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F\u200B-\u200D\uFEFF\u202A-\u202E]/g,"")}function M(o){return o.replace(/[&<>"']/g,e=>{switch(e){case"&":return"&amp;";case"<":return"&lt;";case">":return"&gt;";case'"':return"&quot;";case"'":return"&#039;";default:return e}})}function Qr(o){if(Xo(),typeof o!="object"||o===null)throw new Error("Invalid backup structure: Root must be an object.");const{slug:e,title:t,content:n,updatedAt:s,tags:r}=o;if(typeof e!="string"||!/^[a-z0-9-_]+$/.test(e))throw new Error("Invalid slug format: Slugs must contain only lowercase alphanumeric characters, hyphens, and underscores.");const a=Bt(e);if(typeof t!="string"||t.trim().length===0||t.length>100)throw new Error("Invalid title format: Must be a non-empty string under 100 characters.");const l=Bt(t);if(typeof n!="string"||n.length>5e4)throw new Error("Invalid content format: Must be a string under 50,000 characters.");if(typeof s!="number"||isNaN(s))throw new Error("Invalid updated timestamp format.");if(!Array.isArray(r))throw new Error("Tags must be an array of strings.");const c=r.map(p=>{if(typeof p!="string")throw new Error("Tags must be strings.");return Bt(Sn.sanitize(p)).slice(0,30)});return{slug:a,title:Sn.sanitize(l),content:n,updatedAt:s,tags:c,isSystem:!!o.isSystem}}async function Qo(o){const e=new TextEncoder,t=e.encode("secops-intel-salt-2026"),n=await window.crypto.subtle.importKey("raw",e.encode(o),{name:"PBKDF2"},!1,["deriveKey"]);return window.crypto.subtle.deriveKey({name:"PBKDF2",salt:t,iterations:1e5,hash:"SHA-256"},n,{name:"AES-GCM",length:256},!1,["encrypt","decrypt"])}async function Jo(o,e){const t=new TextEncoder,n=window.crypto.getRandomValues(new Uint8Array(12)),s=await window.crypto.subtle.encrypt({name:"AES-GCM",iv:n},e,t.encode(o)),r=Array.from(n).map(p=>p.toString(16).padStart(2,"0")).join(""),a=new Uint8Array(s);let l="";for(let p=0;p<a.byteLength;p++)l+=String.fromCharCode(a[p]);const c=btoa(l);return`${r}:${c}`}async function De(o,e){const t=o.split(":");if(t.length!==2)throw new Error("Invalid cipher format");const[n,s]=t,r=new Uint8Array(n.match(/.{1,2}/g).map(p=>parseInt(p,16))),a=atob(s),l=new Uint8Array(a.length);for(let p=0;p<a.length;p++)l[p]=a.charCodeAt(p);const c=await window.crypto.subtle.decrypt({name:"AES-GCM",iv:r},e,l);return new TextDecoder().decode(c)}let fe="home",at=!1,Ae=!1,qe="",yt="",ge=[],vt=null,es=navigator.onLine?"SECURE_LINK":"OFFLINE_CACHE",it=localStorage.getItem("secops-wiki-theme")||"dark",Y=null,gn=!1,xe=0,zt=!1,Ut=-1,Ln="",bn=null;function ts(){bn&&clearTimeout(bn),bn=setTimeout(()=>{Y&&(Y=null,alert("SECURITY TIMEOUT: Session idle for 15 minutes. Passphrase keys wiped from memory."),window.location.hash.startsWith("#/page/")?window.location.hash="#/page/home":ve())},15*60*1e3)}["mousedown","mousemove","keydown","scroll","touchstart"].forEach(o=>{window.addEventListener(o,ts,{passive:!0})});ts();function ns(){const o=document.documentElement,e=document.getElementById("theme-icon-path");it==="light"?(o.classList.add("light-theme"),e&&e.setAttribute("d","M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z")):(o.classList.remove("light-theme"),e&&e.setAttribute("d","M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z"))}function os(){it=it==="dark"?"light":"dark",localStorage.setItem("secops-wiki-theme",it),ns()}function Jr(o,e){if(!e||e.trim().length===0)return o;const t=e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"),n=new RegExp(`(?![^<>]*>)(${t})`,"gi");return o.replace(n,'<mark class="bg-teal-500/30 text-teal-300 px-0.5 rounded font-medium">$1</mark>')}function ea(o){const e=o.toLowerCase().trim();return/(sec|security|critical|panic|destruct|lock|key|auth)/.test(e)?{bg:"rgba(239, 68, 68, 0.15)",text:"#f87171",border:"rgba(239, 68, 68, 0.3)",className:"tag-color-red"}:/(doc|manual|wiki|guide|system|dashboard|home)/.test(e)?{bg:"rgba(20, 184, 166, 0.15)",text:"#2dd4bf",border:"rgba(20, 184, 166, 0.3)",className:"tag-color-teal"}:/(config|settings|sys|admin|db|telemetry)/.test(e)?{bg:"rgba(59, 130, 246, 0.15)",text:"#60a5fa",border:"rgba(59, 130, 246, 0.3)",className:"tag-color-blue"}:/(warning|caution|issue|bug|fix)/.test(e)?{bg:"rgba(245, 158, 11, 0.15)",text:"#fbbf24",border:"rgba(245, 158, 11, 0.3)",className:"tag-color-amber"}:{bg:"rgba(148, 163, 184, 0.15)",text:"#cbd5e1",border:"rgba(148, 163, 184, 0.3)",className:"tag-color-slate"}}function ss(o,e){const t=e.toLowerCase().trim();if(!t)return 0;let n=0;const s=o.title.toLowerCase(),r=o.content.toLowerCase(),a=o.tags.map(l=>l.toLowerCase());if(s===t?n+=100:s.startsWith(t)?n+=80:s.includes(t)&&(n+=50),a.forEach(l=>{l===t?n+=30:l.includes(t)&&(n+=15)}),r.includes(t)){n+=10;const l=r.split(t).length-1;n+=Math.min(10,l)}return n}function Ro(o){const e=new Uint32Array(256);for(let n=0;n<256;n++){let s=n;for(let r=0;r<8;r++)s=s&1?3988292384^s>>>1:s>>>1;e[n]=s}let t=4294967295;for(let n=0;n<o.length;n++)t=e[(t^o[n])&255]^t>>>8;return(t^4294967295)>>>0}function rs(o){const e=new TextEncoder,t=[],n=[];let s=0;o.forEach(p=>{n.push(s);const f=e.encode(p.name),h=e.encode(p.content),u=Ro(h),b=new ArrayBuffer(30),R=new DataView(b);R.setUint32(0,67324752,!0),R.setUint16(4,10,!0),R.setUint16(6,0,!0),R.setUint16(8,0,!0),R.setUint16(10,0,!0),R.setUint16(12,0,!0),R.setUint32(14,u,!0),R.setUint32(18,h.length,!0),R.setUint32(22,h.length,!0),R.setUint16(26,f.length,!0),R.setUint16(28,0,!0);const v=new Uint8Array(b);t.push(v),t.push(f),t.push(h),s+=v.length+f.length+h.length});const r=s;let a=0;o.forEach((p,f)=>{const h=e.encode(p.name),u=e.encode(p.content),b=Ro(u),R=n[f],v=new ArrayBuffer(46),m=new DataView(v);m.setUint32(0,33639248,!0),m.setUint16(4,20,!0),m.setUint16(6,10,!0),m.setUint16(8,0,!0),m.setUint16(10,0,!0),m.setUint16(12,0,!0),m.setUint16(14,0,!0),m.setUint32(16,b,!0),m.setUint32(20,u.length,!0),m.setUint32(24,u.length,!0),m.setUint16(28,h.length,!0),m.setUint16(30,0,!0),m.setUint16(32,0,!0),m.setUint16(34,0,!0),m.setUint16(36,0,!0),m.setUint32(38,32,!0),m.setUint32(42,R,!0);const k=new Uint8Array(v);t.push(k),t.push(h),a+=k.length+h.length,s+=k.length+h.length});const l=new ArrayBuffer(22),c=new DataView(l);return c.setUint32(0,101010256,!0),c.setUint16(4,0,!0),c.setUint16(6,0,!0),c.setUint16(8,o.length,!0),c.setUint16(10,o.length,!0),c.setUint32(12,a,!0),c.setUint32(16,r,!0),c.setUint16(20,0,!0),t.push(new Uint8Array(l)),new Blob(t,{type:"application/zip"})}const Ie=new BroadcastChannel("wiki-db-sync");Ie.onmessage=async o=>{o.data==="refresh"&&(await we(),await ve())};let xn=null;const ta=15*60*1e3;let as;async function na(){ns(),as=document.getElementById("app"),await No(),aa(),await we(),ra(),fa(),window.addEventListener("hashchange",$o),window.addEventListener("online",Do),window.addEventListener("offline",Do),window.addEventListener("beforeinstallprompt",o=>{o.preventDefault(),vt=o;const e=document.getElementById("pwa-install-btn");e&&e.classList.remove("hidden")}),window.addEventListener("keydown",o=>{var e,t;(o.ctrlKey&&o.key==="k"||o.ctrlKey&&o.key==="K")&&(o.preventDefault(),Tt()),o.key==="/"&&((e=document.activeElement)==null?void 0:e.tagName)!=="INPUT"&&((t=document.activeElement)==null?void 0:t.tagName)!=="TEXTAREA"&&(o.preventDefault(),Tt())}),$o()}function rt(){xn&&clearTimeout(xn),xn=setTimeout(oa,ta)}function oa(){const o=document.getElementById("idle-lock-screen");o&&o.classList.remove("hidden")}function sa(){const o=document.getElementById("idle-lock-screen");o&&o.classList.add("hidden"),rt()}function ra(){const o=document.createElement("div");o.id="idle-lock-screen",o.className="fixed inset-0 bg-[#090d16]/95 backdrop-blur-md z-50 flex flex-col items-center justify-center hidden",o.innerHTML=`
    <div class="glass-panel border border-teal-900/30 p-8 rounded-xl max-w-md text-center glow-border">
      <svg class="w-16 h-16 text-red-500 mx-auto mb-4 animate-pulse" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
      <h2 class="text-xl font-bold font-mono text-white mb-2 uppercase">TERMINAL_LOCKED</h2>
      <p class="text-slate-400 text-xs font-mono mb-6">Session locked due to inactivity. Click unlock to restore secure interface access.</p>
      <button id="idle-unlock-btn" class="px-6 py-2.5 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-mono text-xs uppercase rounded font-bold transition shadow-[0_0_10px_rgba(20,184,166,0.2)]">
        RESTORE SESSION
      </button>
    </div>
  `,document.body.appendChild(o),rt(),window.addEventListener("mousemove",rt),window.addEventListener("keydown",rt),window.addEventListener("click",rt),window.addEventListener("scroll",rt),document.addEventListener("click",e=>{e.target.closest("#idle-unlock-btn")&&sa()})}function Oo(){if(document.getElementById("pwa-update-toast"))return;const o=document.createElement("div");o.id="pwa-update-toast",o.className="fixed bottom-4 right-4 z-50 max-w-sm glass-panel border border-teal-500/30 p-4 rounded-xl shadow-2xl glow-border flex items-center justify-between gap-4 font-mono text-xs select-none",o.innerHTML=`
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
  `,document.body.appendChild(o);const e=document.getElementById("pwa-update-reload-btn");e&&e.addEventListener("click",()=>{window.location.reload()})}function aa(){"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/wiki/sw.js").then(o=>{console.log("ServiceWorker registered successfully with scope: ",o.scope),o.waiting&&Oo(),o.addEventListener("updatefound",()=>{const e=o.installing;e&&e.addEventListener("statechange",()=>{e.state==="installed"&&navigator.serviceWorker.controller&&Oo()})})}).catch(o=>{console.error("ServiceWorker registration failed: ",o)})})}function Do(){es=navigator.onLine?"SECURE_LINK":"OFFLINE_CACHE";const o=document.getElementById("system-status-indicator"),e=document.getElementById("system-status-label");o&&e&&(navigator.onLine?(o.className="w-2 h-2 rounded-full bg-emerald-400 glow-text-emerald pulse-indicator",e.innerText="SECURE_LINK",e.className="text-xs text-emerald-400 font-mono tracking-wider"):(o.className="w-2 h-2 rounded-full bg-amber-500 pulse-indicator",e.innerText="OFFLINE_CACHE",e.className="text-xs text-amber-500 font-mono tracking-wider"))}async function we(){ge=await Cn()}async function $o(){const o=window.location.hash||"#/page/home";at=!1,Ae=!1;let e="";if(o.startsWith("#/page/")){const n=o.replace("#/page/","").split("#");fe=n[0],n.length>1&&(e=n[1])}else o.startsWith("#/edit/")?(fe=o.replace("#/edit/",""),at=!0):o==="#/new"?(at=!0,Ae=!0,fe=""):o==="#/system"?fe="system":o==="#/graph"?fe="graph":fe="home";await ve(),e&&setTimeout(()=>{const t=document.getElementById(e);t&&t.scrollIntoView({behavior:"smooth"})},50)}function ia(o){const e=o.filter(r=>r.isSystem),t=o.filter(r=>!r.isSystem&&r.isEncrypted),n=o.filter(r=>!r.isSystem&&!r.isEncrypted);let s="";return e.length>0&&(s+=`
      <div class="mb-4">
        <div class="px-3 mb-1.5 text-[9px] font-bold text-slate-500 uppercase tracking-widest font-mono flex items-center gap-1 select-none">
          ⚙️ SYSTEM PROCEDURES
        </div>
        <div class="space-y-0.5">
          ${e.map(r=>yn(r)).join("")}
        </div>
      </div>
    `),t.length>0&&(s+=`
      <div class="mb-4">
        <div class="px-3 mb-1.5 text-[9px] font-bold text-red-400/80 uppercase tracking-widest font-mono flex items-center gap-1 select-none">
          🔒 SECURE CORES
        </div>
        <div class="space-y-0.5">
          ${t.map(r=>yn(r)).join("")}
        </div>
      </div>
    `),n.length>0&&(s+=`
      <div class="mb-4">
        <div class="px-3 mb-1.5 text-[9px] font-bold text-teal-400/80 uppercase tracking-widest font-mono flex items-center gap-1 select-none">
          📄 OPERATIONAL INTEL
        </div>
        <div class="space-y-0.5">
          ${n.map(r=>yn(r)).join("")}
        </div>
      </div>
    `),s}function yn(o){const e=fe===o.slug&&!at;return`
    <a href="#/page/${o.slug}" class="flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-mono transition group ${e?"bg-teal-950/30 text-teal-400 font-bold border-l-2 border-teal-500":"text-slate-450 hover:bg-slate-900/40 hover:text-slate-200"}">
      <span class="truncate flex items-center gap-1.5">
        ${o.isEncrypted?'<span class="text-red-450 text-[9px]">🔒</span>':'<span class="text-slate-650 group-hover:text-slate-500 text-[9px]">⊙</span>'}
        ${M(o.title)}
      </span>
    </a>
  `}async function ve(){await we();let o=ge;qe.trim().length>0&&(o=o.map(u=>({page:u,score:ss(u,qe)})).filter(u=>u.score>0).sort((u,b)=>b.score-u.score).map(u=>u.page)),yt&&(o=o.filter(u=>u.tags.includes(yt)));const e=Array.from(new Set(ge.flatMap(u=>u.tags)));as.innerHTML=`
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
            <span id="system-status-label" class="text-xs ${navigator.onLine?"text-emerald-400":"text-amber-500"} font-mono tracking-wider">${es}</span>
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
            <button class="tag-badge px-1.5 py-0.5 text-[9px] rounded-full font-mono transition ${yt?"bg-slate-900 text-slate-400 hover:bg-slate-850":"bg-teal-500 text-slate-950 font-bold shadow-[0_0_8px_rgba(20,184,166,0.3)]"}" data-tag="">#ALL</button>
            ${e.map(u=>{const b=ea(u);return`
                <button class="tag-badge px-1.5 py-0.5 text-[9px] rounded-full font-mono transition ${yt===u?"bg-teal-500 text-slate-950 font-bold shadow-[0_0_8px_rgba(20,184,166,0.3)]":`${b.className} hover:opacity-85`}" data-tag="${M(u)}">#${M(u.toUpperCase())}</button>
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
            ${ia(o)}
            ${o.length===0?`
              <div class="text-center py-6 text-xs text-slate-650 font-mono">No entries found</div>
            `:""}
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
  `;const t=document.getElementById("wiki-search-input");t&&t.addEventListener("input",u=>{qe=u.target.value;const b=ge.filter(v=>v.title.toLowerCase().includes(qe.toLowerCase())||v.content.toLowerCase().includes(qe.toLowerCase())||v.tags.some(m=>m.toLowerCase().includes(qe.toLowerCase()))),R=document.getElementById("pages-list");R.innerHTML=b.map(v=>`
        <a href="#/page/${v.slug}" class="flex items-center justify-between px-3 py-2 rounded-lg text-sm transition group ${fe===v.slug&&!at?"bg-teal-950/30 text-teal-400 font-medium border-l-2 border-teal-500":"text-slate-400 hover:bg-slate-900/50 hover:text-slate-200"}">
          <span class="truncate font-mono">${M(v.title)}</span>
          ${v.isSystem?`
            <span class="text-[9px] bg-slate-800 text-slate-400 px-1 py-0.5 rounded font-mono uppercase scale-90">SYS</span>
          `:""}
        </a>
      `).join("")});const n=document.getElementById("pwa-install-btn");n&&n.addEventListener("click",async()=>{if(vt){vt.prompt();const{outcome:u}=await vt.userChoice;u==="accepted"&&console.log("User accepted the PWA install prompt"),vt=null,n.classList.add("hidden")}});const s=document.getElementById("system-panic-btn");s&&s.addEventListener("click",async()=>{if(confirm("CRITICAL SYSTEM COMPROMISE PROTOCOL: Purge entire local database, clear all service worker caches, unregister service workers, and force self-destruct reload immediately?")){if(indexedDB.deleteDatabase("secops-wiki-db"),"caches"in window){const u=await caches.keys();await Promise.all(u.map(b=>caches.delete(b)))}if("serviceWorker"in navigator){const u=await navigator.serviceWorker.getRegistrations();await Promise.all(u.map(b=>b.unregister()))}window.location.href="/wiki/"}});const r=document.getElementById("sidebar-toggle-btn"),a=document.getElementById("sidebar-close-btn"),l=document.getElementById("sidebar-backdrop"),c=()=>{const u=document.getElementById("sidebar"),b=document.getElementById("sidebar-backdrop");u&&b&&(u.classList.add("-translate-x-full"),b.classList.add("hidden"))},p=()=>{const u=document.getElementById("sidebar"),b=document.getElementById("sidebar-backdrop");u&&b&&(u.classList.remove("-translate-x-full"),b.classList.remove("hidden"))};r&&r.addEventListener("click",p),a&&a.addEventListener("click",c),l&&l.addEventListener("click",c),document.querySelectorAll("#sidebar a").forEach(u=>{u.addEventListener("click",()=>{window.innerWidth<768&&c()})});const h=document.getElementById("theme-toggle-btn");h&&h.addEventListener("click",os),document.querySelectorAll(".tag-badge").forEach(u=>{u.addEventListener("click",async b=>{yt=b.currentTarget.getAttribute("data-tag")||"",await ve()})}),await la()}async function la(){const o=document.getElementById("main-content");if(fe==="graph"){await va(o);return}if(fe==="system"){ua(o);return}if(at){await ls(o);return}await is(o)}async function is(o){const e=await Fe(fe);if(!e){o.innerHTML=`
      <div class="text-center py-20 bg-slate-950/40 border border-red-950/20 rounded-xl px-6 glow-border">
        <svg class="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
        </svg>
        <h2 class="text-2xl font-bold font-mono text-white mb-2 uppercase">DATA_MISSING</h2>
        <p class="text-slate-400 text-sm max-w-md mx-auto mb-6">Requested intel document slug "${M(fe)}" is not registered in index database.</p>
        <a href="#/new" class="px-4 py-2 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 font-mono text-xs uppercase rounded transition hover:text-white">
          Create New Document
        </a>
      </div>
    `;return}const t=await $s(e.slug);let n=e.content,s=!1;if(e.isEncrypted)if(Y)try{n=await De(e.content,Y)}catch{s=!0}else s=!0;if(s){o.innerHTML=`
      <div class="max-w-md mx-auto my-20 p-6 glass-panel border border-teal-900/30 rounded-xl text-center glow-border select-none">
        <svg class="w-16 h-16 text-teal-500 mx-auto mb-4 animate-pulse" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        <h2 class="text-xl font-bold font-mono text-white mb-2 uppercase">DECRYPT_REQUIRED</h2>
        <p class="text-slate-400 text-xs font-mono mb-6">This document payload is encrypted. Enter passphrase to decrypt.</p>
        <form id="decrypt-doc-form" class="space-y-4">
          <input type="password" id="decrypt-password-input" placeholder="Enter security passphrase..." class="w-full bg-slate-950/80 border border-slate-800 focus:border-teal-500/50 rounded-lg p-2.5 text-base text-slate-200 focus:outline-none transition font-mono text-center">
          <button type="submit" class="w-full py-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-mono text-xs uppercase rounded font-bold transition shadow-[0_0_10px_rgba(20,184,166,0.2)]">
            DECRYPT IN-MEMORY
          </button>
        </form>
      </div>
    `,document.getElementById("decrypt-doc-form").addEventListener("submit",async k=>{k.preventDefault();const S=document.getElementById("decrypt-password-input").value;try{const y=await Qo(S);await De(e.content,y),Y=y,await ve()}catch{alert("Security Alert: Authentication failed. Invalid security passphrase.")}});return}const r=n.split(/\s+/).filter(m=>m.length>0).length,a=Math.max(1,Math.round(r/200)),l=ct(n),c=Jr(l,qe),p=new Date(e.updatedAt).toLocaleString(),f=document.createElement("div");f.innerHTML=l;const h=f.querySelectorAll("h1, h2, h3");let u="";h.length>0&&(u=`
      <div class="hidden lg:block w-60 shrink-0 self-start sticky top-8">
        <div class="glass-panel border border-slate-800/80 rounded-xl p-4">
          <h4 class="text-xs font-bold font-mono text-slate-400 uppercase tracking-widest border-b border-slate-800/60 pb-2 mb-3">Outline</h4>
          <nav class="space-y-2 text-xs font-mono max-h-[350px] overflow-y-auto pr-1">
            ${Array.from(h).map(m=>{const k=m.textContent||"",S=m.id||k.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,""),y=m.tagName.toLowerCase(),E=y==="h1"?"pl-0 font-semibold":y==="h2"?"pl-3 border-l border-slate-800":"pl-6 border-l border-slate-800";return`
                <a href="#/page/${e.slug}#${S}" class="block text-slate-500 hover:text-teal-400 transition truncate ${E}" title="${M(k)}">
                  ${M(k)}
                </a>
              `}).join("")}
          </nav>
        </div>
      </div>
    `),o.innerHTML=`
    <div class="flex gap-8 items-start">
      <!-- Main Content Area -->
      <div class="flex-1 min-w-0">
        <!-- Page Header telemetry -->
        <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between border-b border-slate-800 pb-6 mb-6 gap-4">
          <div>
            <h2 class="text-2xl md:text-3xl font-extrabold text-white font-mono tracking-tight">${M(e.title)}</h2>
            <div class="flex flex-wrap items-center gap-3 mt-3">
              <span class="text-xs font-mono text-slate-500 uppercase">SYS_REF: ${M(e.slug)}</span>
              <span class="h-3 w-px bg-slate-800"></span>
              <span class="text-xs font-mono text-slate-500 uppercase">UPDATED: ${p}</span>
              <span class="h-3 w-px bg-slate-800"></span>
              <span class="text-xs font-mono text-teal-400 uppercase">⏱️ ${a} MIN READ</span>
              ${e.tags.map(m=>`
                <span class="text-[10px] font-mono bg-teal-950/20 text-teal-400 px-2 py-0.5 rounded border border-teal-900/30">#${M(m)}</span>
              `).join("")}
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
        <article class="wiki-content prose prose-invert max-w-none">
          ${c}
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
              ${t.map((m,k)=>`
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-3 first:pt-0">
                  <div class="min-w-0">
                    <p class="text-xs font-mono text-slate-300 break-words">REV_${t.length-k} // ${M(m.title)}</p>
                    <p class="text-[10px] font-mono text-slate-500">${new Date(m.updatedAt).toLocaleString()}</p>
                  </div>
                  <button class="restore-rev-btn px-2.5 py-1 bg-slate-900 border border-slate-800 hover:border-slate-700 text-teal-400 hover:text-teal-300 font-mono text-[10px] rounded transition uppercase shrink-0 self-start sm:self-auto" data-rev-id="${M(m.id)}">
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
      </div>

      <!-- Outline / TOC (Desktop only) -->
      ${u}
    </div>
  `;const b=document.getElementById("page-export-dropdown-btn"),R=document.getElementById("page-export-menu");b&&R&&(b.addEventListener("click",y=>{y.stopPropagation(),R.classList.toggle("hidden")}),document.addEventListener("click",()=>{R.classList.add("hidden")}),document.getElementById("export-single-md").addEventListener("click",async()=>{let y=e.content;if(e.isEncrypted&&Y)try{y=await De(e.content,Y)}catch{}const E=`---
title: ${e.title}
slug: ${e.slug}
tags: ${e.tags.join(", ")}
updated: ${new Date(e.updatedAt).toISOString()}
encrypted: ${!!e.isEncrypted}
---

`,P=new Blob([E+y],{type:"text/markdown;charset=utf-8;"}),D=URL.createObjectURL(P),$=document.createElement("a");$.href=D,$.download=`${e.slug}.md`,document.body.appendChild($),$.click(),document.body.removeChild($),URL.revokeObjectURL(D)}),document.getElementById("export-single-html").addEventListener("click",async()=>{let y=e.content;if(e.isEncrypted&&Y)try{y=await De(e.content,Y)}catch{}const E=ct(y),P=`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${M(e.title)} - SecOps Wiki Offline</title>
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
  <h1>${M(e.title)}</h1>
  <div class="metadata">
    Slug: ${e.slug} &nbsp;|&nbsp; 
    Updated: ${new Date(e.updatedAt).toLocaleString()} &nbsp;|&nbsp;
    Tags: ${e.tags.map(N=>`<span class="badge">#${M(N)}</span>`).join("")}
  </div>
  <article>
    ${E}
  </article>
</body>
</html>`,D=new Blob([P],{type:"text/html;charset=utf-8;"}),$=URL.createObjectURL(D),T=document.createElement("a");T.href=$,T.download=`${e.slug}.html`,document.body.appendChild(T),T.click(),document.body.removeChild(T),URL.revokeObjectURL($)}),document.getElementById("export-single-print").addEventListener("click",()=>{window.print()}));const v=document.getElementById("delete-page-btn");v&&v.addEventListener("click",async()=>{confirm(`CRITICAL SYSTEM NOTICE: Confirm total purge of intel document "${e.title}"? This action is irreversible.`)&&(await Ds(e.slug),Ie.postMessage("refresh"),window.location.hash="#/page/home")}),o.querySelectorAll("pre").forEach(m=>{const k=document.createElement("div");k.className="relative group",m.parentNode.insertBefore(k,m),k.appendChild(m);const S=document.createElement("button");S.className="absolute top-2 right-2 px-2 py-1 bg-slate-900/80 hover:bg-slate-800 text-[10px] text-slate-400 hover:text-white font-mono rounded opacity-0 group-hover:opacity-100 transition focus:opacity-100 border border-slate-800 focus:outline-none",S.textContent="COPY",S.addEventListener("click",()=>{var E;const y=((E=m.querySelector("code"))==null?void 0:E.textContent)||m.textContent||"";navigator.clipboard.writeText(y).then(()=>{S.textContent="COPIED",setTimeout(()=>S.textContent="COPY",2e3)})}),k.appendChild(S)}),o.querySelectorAll(".restore-rev-btn").forEach(m=>{m.addEventListener("click",async k=>{const S=k.currentTarget.getAttribute("data-rev-id"),y=t.find(E=>E.id===S);if(y&&confirm(`ROLLBACK COMMAND: Revert current page content to revision state "${y.title}" saved on ${new Date(y.updatedAt).toLocaleString()}?`)){const E=await Fe(e.slug);E&&await _n({id:`${E.slug}-${Date.now()}`,slug:E.slug,title:E.title,content:E.content,updatedAt:Date.now()}),await Ue({slug:y.slug,title:y.title,content:y.content,updatedAt:Date.now(),tags:e.tags,isSystem:e.isSystem}),alert("Revision successfully restored."),await we(),await ve()}})}),o.querySelectorAll('.wiki-content input[type="checkbox"]').forEach((m,k)=>{const S=m;S.removeAttribute("disabled"),S.classList.add("cursor-pointer","accent-teal-500"),S.addEventListener("change",async y=>{const E=y.target;await wa(e.slug,k,E.checked)})})}async function ls(o){let e="",t="",n="",s="",r=!1,a=!1;if(!Ae){const T=await Fe(fe);if(T&&(e=T.title,t=T.slug,n=T.content,s=T.tags.join(", "),r=!!T.isSystem,a=!!T.isEncrypted,T.isEncrypted))if(Y)try{n=await De(T.content,Y)}catch{n="ERROR: Decryption key mismatch. Please go back and re-decrypt."}else n="ERROR: This page is encrypted. Decrypt it in the reader view first."}const l=`secops-wiki-draft-${Ae?"new":fe}`;let c="";const p=localStorage.getItem(l);if(p)try{const T=JSON.parse(p);e=T.title||e,n=T.content||n,s=T.tags||s,c=`
        <div id="draft-restore-banner" class="bg-teal-950/40 border border-teal-800 text-teal-400 p-3 rounded-lg text-xs font-mono mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <span>RESTORED DRAFT: Unsaved changes restored (${new Date(T.updatedAt).toLocaleTimeString()})</span>
          <button type="button" id="discard-draft-btn" class="underline hover:text-teal-300 font-bold shrink-0">DISCARD</button>
        </div>
      `}catch{}o.innerHTML=`
    <div class="glass-panel border border-slate-800 rounded-xl p-4 md:p-6 glow-border">
      <div class="border-b border-slate-800 pb-4 mb-6">
        <h2 class="text-xl font-bold font-mono text-white uppercase">${Ae?"Establish New Intel Entry":"Update Intel Entry"}</h2>
        <p class="text-xs text-slate-500 font-mono">All text payloads are sanitized client-side against XSS vectors.</p>
      </div>

      ${c}

      <form id="edit-page-form" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Title Input -->
          <div>
            <label class="block text-xs font-semibold text-slate-400 uppercase tracking-widest font-mono mb-2">Document Title</label>
            <input type="text" id="edit-title" value="${M(e)}" required maxlength="100" class="w-full bg-slate-950/80 border border-slate-800 focus:border-teal-500/50 rounded-lg p-2.5 text-base md:text-sm text-slate-200 focus:outline-none transition font-mono">
          </div>

          <!-- Slug Input -->
          <div>
            <label class="block text-xs font-semibold text-slate-400 uppercase tracking-widest font-mono mb-2">Index Slug ID</label>
            <input type="text" id="edit-slug" value="${M(t)}" ${Ae?"":"disabled"} required pattern="^[a-z0-9-_]+$" placeholder="e.g. operational-manual" class="w-full bg-slate-950/80 border border-slate-800 focus:border-teal-500/50 rounded-lg p-2.5 text-base md:text-sm text-slate-200 focus:outline-none transition font-mono disabled:opacity-40 disabled:cursor-not-allowed">
            ${Ae?'<p class="text-[10px] text-slate-500 mt-1 font-mono">Only lowercase letters, numbers, hyphens, and underscores are allowed.</p>':""}
          </div>
        </div>

        <!-- Tags Input -->
        <div>
          <label class="block text-xs font-semibold text-slate-400 uppercase tracking-widest font-mono mb-2">Associated Tags</label>
          <input type="text" id="edit-tags" value="${M(s)}" placeholder="e.g. system, security, quickstart" class="w-full bg-slate-950/80 border border-slate-800 focus:border-teal-500/50 rounded-lg p-2.5 text-base md:text-sm text-slate-200 focus:outline-none transition font-mono">
          <p class="text-[10px] text-slate-500 mt-1 font-mono">Comma-separated tags list.</p>
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
          <div class="flex flex-wrap gap-1 p-2 bg-slate-950/80 border border-slate-800 border-b-0 rounded-t-lg select-none">
            <button type="button" class="format-btn px-2 py-1 bg-slate-900 border border-slate-850 hover:border-slate-700 text-slate-400 font-mono text-[10px] rounded hover:text-white transition uppercase font-bold" data-format="bold">B</button>
            <button type="button" class="format-btn px-2 py-1 bg-slate-900 border border-slate-850 hover:border-slate-700 text-slate-400 font-mono text-[10px] rounded hover:text-white transition uppercase font-bold" data-format="italic">I</button>
            <button type="button" class="format-btn px-2 py-1 bg-slate-900 border border-slate-850 hover:border-slate-700 text-slate-400 font-mono text-[10px] rounded hover:text-white transition uppercase font-bold" data-format="header">H3</button>
            <button type="button" class="format-btn px-2 py-1 bg-slate-900 border border-slate-850 hover:border-slate-700 text-slate-400 font-mono text-[10px] rounded hover:text-white transition uppercase font-bold" data-format="code">Code</button>
            <button type="button" class="format-btn px-2 py-1 bg-slate-900 border border-slate-850 hover:border-slate-700 text-slate-400 font-mono text-[10px] rounded hover:text-white transition uppercase font-bold" data-format="link">Link</button>
            <button type="button" class="format-btn px-2 py-1 bg-slate-900 border border-slate-850 hover:border-slate-700 text-slate-400 font-mono text-[10px] rounded hover:text-white transition uppercase font-bold" data-format="table">Table</button>
            <button type="button" class="format-btn px-2 py-1 bg-slate-900 border border-slate-850 hover:border-slate-700 text-slate-400 font-mono text-[10px] rounded hover:text-white transition uppercase font-bold" data-format="checklist">Todo</button>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div id="edit-content-container" class="block relative">
              <textarea id="edit-content" rows="16" required class="w-full bg-slate-950/80 border border-slate-800 focus:border-teal-500/50 rounded-b-lg p-4 text-base md:text-sm text-slate-200 focus:outline-none transition font-mono border-t-0" placeholder="Enter markdown payload here...">${M(n)}</textarea>
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
            <a href="${Ae?"#/page/home":`#/page/${fe}`}" id="cancel-edit-btn" class="px-4 py-2 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 font-mono text-xs uppercase rounded transition hover:text-white">
              Cancel
            </a>
            <button type="submit" class="px-4 py-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-mono text-xs uppercase rounded font-bold transition shadow-[0_0_10px_rgba(20,184,166,0.15)]">
              Commit Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  `;const f=document.getElementById("edit-page-form"),h=document.getElementById("edit-content"),u=document.getElementById("live-preview-box"),b=document.getElementById("cancel-edit-btn"),R=document.getElementById("discard-draft-btn"),v=document.getElementById("edit-tab-write"),m=document.getElementById("edit-tab-preview"),k=document.getElementById("edit-content-container"),S=document.getElementById("live-preview-container");v&&m&&k&&S&&(v.addEventListener("click",()=>{v.className="flex-1 py-2 text-center text-xs font-mono font-bold border-b-2 border-teal-500 text-teal-400",m.className="flex-1 py-2 text-center text-xs font-mono font-bold border-b-2 border-transparent text-slate-500",k.className="block",S.className="hidden md:block"}),m.addEventListener("click",()=>{m.className="flex-1 py-2 text-center text-xs font-mono font-bold border-b-2 border-teal-500 text-teal-400",v.className="flex-1 py-2 text-center text-xs font-mono font-bold border-b-2 border-transparent text-slate-500",S.className="block",k.className="hidden md:block"}));const y=()=>{const T=h.value;if(T.trim().length===0){u.innerHTML='<span class="text-slate-600 font-mono text-xs">No input content.</span>';return}u.innerHTML=ct(T)},E=T=>{const N=h.selectionStart,L=h.selectionEnd,O=h.value,B=O.substring(N,L);let W="";switch(T){case"bold":W=`**${B||"bold_text"}**`;break;case"italic":W=`*${B||"italic_text"}*`;break;case"header":W=`
### ${B||"Header text"}
`;break;case"code":W=`
\`\`\`javascript
${B||"// code here"}
\`\`\`
`;break;case"link":W=`[${B||"Link text"}](url)`;break;case"table":W=`
| Header 1 | Header 2 |
| -------- | -------- |
| Cell 1   | Cell 2   |
`;break;case"checklist":W=`
- [ ] ${B||"Task description"}
`;break}h.value=O.substring(0,N)+W+O.substring(L),h.focus(),h.selectionStart=N+W.length,h.selectionEnd=N+W.length,y()};o.querySelectorAll(".format-btn").forEach(T=>{T.addEventListener("click",N=>{const L=N.currentTarget.getAttribute("data-format")||"";E(L)})}),h.addEventListener("keyup",T=>{const N=h.value,L=h.selectionStart;if(N.substring(L-2,L)==="[[")zt=!0,Ut=L,Ln="",ba(h);else if(zt){if(T.key==="Escape"||T.key==="ArrowUp"||T.key==="ArrowDown"||T.key==="Enter")return;const B=N.substring(Ut,L);B.includes(`
`)||L<Ut?Ft():(Ln=B,cs(h))}}),h.addEventListener("keydown",T=>{if(zt){const N=document.getElementById("autocomplete-popup");if(!N)return;const L=N.querySelectorAll(".editor-autocomplete-item");let O=Array.from(L).findIndex(B=>B.classList.contains("active"));T.key==="ArrowDown"?(T.preventDefault(),L.length>0&&(O>=0&&L[O].classList.remove("active","bg-teal-950/20","text-teal-400"),O=(O+1)%L.length,L[O].classList.add("active","bg-teal-950/20","text-teal-400"),L[O].scrollIntoView({block:"nearest"}))):T.key==="ArrowUp"?(T.preventDefault(),L.length>0&&(O>=0&&L[O].classList.remove("active","bg-teal-950/20","text-teal-400"),O=(O-1+L.length)%L.length,L[O].classList.add("active","bg-teal-950/20","text-teal-400"),L[O].scrollIntoView({block:"nearest"}))):T.key==="Enter"?(T.preventDefault(),O>=0?L[O].click():L.length>0&&L[0].click()):T.key==="Escape"&&(T.preventDefault(),Ft())}}),h.addEventListener("input",y),y();const P=setInterval(()=>{var O,B;const T=(O=document.getElementById("edit-title"))==null?void 0:O.value,N=h.value,L=(B=document.getElementById("edit-tags"))==null?void 0:B.value;(T||N)&&localStorage.setItem(l,JSON.stringify({title:T,content:N,tags:L,updatedAt:Date.now()}))},5e3),D=()=>{clearInterval(P),window.removeEventListener("hashchange",D)};window.addEventListener("hashchange",D);const $=()=>{clearInterval(P),window.removeEventListener("hashchange",D),localStorage.removeItem(l),Ft()};b.addEventListener("click",$),R&&R.addEventListener("click",()=>{var T;$(),(T=document.getElementById("draft-restore-banner"))==null||T.remove(),ls(o)}),f.addEventListener("submit",async T=>{T.preventDefault();const N=document.getElementById("edit-title").value.trim(),L=Ae?document.getElementById("edit-slug").value.trim().toLowerCase():t,O=document.getElementById("edit-tags").value,B=h.value,W=document.getElementById("edit-encrypt").checked;if(Ae&&!/^[a-z0-9-_]+$/.test(L)){alert("Security Alert: Slug contains illegal characters. Use alphanumeric, hyphens, and underscores only.");return}const de=O.split(",").map(g=>Bt(g.trim()).toLowerCase()).filter(g=>g.length>0),q=await Fe(L);q&&await _n({id:`${q.slug}-${Date.now()}`,slug:q.slug,title:q.title,content:q.content,updatedAt:q.updatedAt,isEncrypted:q.isEncrypted});let le=B;if(W){if(!Y){const g=prompt("Enter a security passphrase to encrypt this document:");if(!g){alert("Encryption Aborted: A security passphrase is required to save an encrypted document.");return}Y=await Qo(g)}try{le=await Jo(B,Y)}catch(g){alert(`Encryption failure: ${g.message}`);return}}const ne={slug:L,title:N,content:le,updatedAt:Date.now(),tags:de,isSystem:r,isEncrypted:W};try{await Ue(ne),$(),Ie.postMessage("refresh"),window.location.hash=`#/page/${L}`}catch(g){alert(`Database transaction error: ${g.message}`)}})}function wn(o,e){let t=o.replace(/\.md$/i,"").replace(/[-_]+/g," ");t=t.split(" ").map(a=>a.charAt(0).toUpperCase()+a.slice(1)).join(" ");let n=o.replace(/\.md$/i,"").toLowerCase().replace(/[^a-z0-9-_]+/g,"-"),s=e,r=["imported"];if(e.startsWith("---")){const a=e.indexOf("---",3);if(a!==-1){const l=e.substring(3,a);s=e.substring(a+3).trim(),l.split(`
`).forEach(p=>{const f=p.indexOf(":");if(f!==-1){const h=p.substring(0,f).trim().toLowerCase(),u=p.substring(f+1).trim();h==="title"?t=u.replace(/^["']|["']$/g,""):h==="slug"?n=u.replace(/[^a-z0-9-_]+/g,"-").toLowerCase():h==="tags"&&(r=u.split(",").map(b=>b.trim().replace(/^["']|["']$/g,"")).filter(b=>b.length>0))}})}}return{slug:n,title:t,content:s,updatedAt:Date.now(),tags:r,isSystem:!1}}function ca(o){const e=["Title","Slug","Tags","Word Count","Encrypted","Last Updated"],t=o.map(n=>{const s=n.content.split(/\s+/).filter(r=>r.length>0).length;return[`"${n.title.replace(/"/g,'""')}"`,`"${n.slug}"`,`"${n.tags.join(", ")}"`,s,n.isEncrypted?"TRUE":"FALSE",`"${new Date(n.updatedAt).toISOString()}"`]});return[e.join(","),...t.map(n=>n.join(","))].join(`
`)}function da(o){let e="";for(const t of o){let n=t.content;if(t.isEncrypted&&Y)try{n=t.content.includes(":")?"🔒 [Encrypted Document: Passphrase Required]":t.content}catch{n="🔒 [Encrypted Document: Passphrase Required]"}const s=ct(n);e+=`
      <section style="page-break-after: always; margin-bottom: 3rem; border-bottom: 2px solid #e2e8f0; padding-bottom: 2rem;">
        <h1 style="font-size: 2.25rem; font-family: monospace; margin-bottom: 0.5rem; color: #1a202c;">${M(t.title)}</h1>
        <div style="font-size: 0.75rem; color: #718096; font-family: monospace; margin-bottom: 1.5rem;">
          SLUG: ${t.slug} | TAGS: #${t.tags.map(r=>M(r)).join(", #")} | UPDATED: ${new Date(t.updatedAt).toLocaleString()}
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
</html>`}function pa(o){const e=[],t=o.map(s=>`<a href="${s.slug}.html" style="display: block; padding: 0.5rem; color: #94a3b8; text-decoration: none; font-family: monospace; font-size: 0.8rem; border-radius: 4px; transition: background 0.2s;" onmouseover="this.style.background='#1e293b'; this.style.color='#2dd4bf'" onmouseout="this.style.background='transparent'; this.style.color='#94a3b8'">${M(s.title)}</a>`).join(`
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
          <a class="page-title" href="${s.slug}.html">${M(s.title)}</a>
          <div class="metadata">
            SLUG: ${s.slug} | TAGS: #${s.tags.map(r=>M(r)).join(", #")} | UPDATED: ${new Date(s.updatedAt).toLocaleString()}
          </div>
        </div>
      `).join("")}
    </div>
  </main>
</body>
</html>`;return e.push({name:"index.html",content:n}),o.forEach(s=>{let r=s.content;if(s.isEncrypted&&Y)try{r=s.content.includes(":")?"🔒 [Encrypted Document: Decrypted view not exported]":s.content}catch{r="🔒 [Encrypted Document: Decrypted view not exported]"}let a=ct(r);a=a.replace(/href="#\/page\/([a-z0-9-_]+)"/g,'href="$1.html"');const l=`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${M(s.title)} - SecOps Static Wiki</title>
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
    <h1>${M(s.title)}</h1>
    <div class="metadata">
      Slug: ${s.slug} &nbsp;|&nbsp; 
      Updated: ${new Date(s.updatedAt).toLocaleString()} &nbsp;|&nbsp;
      Tags: ${s.tags.map(c=>`<span class="badge">#${M(c)}</span>`).join("")}
    </div>
    <article class="wiki-content">
      ${a}
    </article>
  </main>
</body>
</html>`;e.push({name:`${s.slug}.html`,content:l})}),rs(e)}function vn(o){const e=[];let t="",n=!1;for(let c=0;c<o.length;c++){const p=o[c];p==='"'?(n=!n,t+=p):p===`
`&&!n?(e.push(t),t=""):t+=p}if(t&&e.push(t),e.length<2)return[];const s=c=>{const p=[];let f="",h=!1;for(let u=0;u<c.length;u++){const b=c[u];b==='"'?h=!h:b===","&&!h?(p.push(r(f)),f=""):f+=b}return p.push(r(f)),p},r=c=>(c=c.trim(),c.startsWith('"')&&c.endsWith('"')&&(c=c.substring(1,c.length-1)),c.replace(/""/g,'"')),a=s(e[0]).map(c=>c.toLowerCase()),l=[];for(let c=1;c<e.length;c++){if(!e[c].trim())continue;const p=s(e[c]),f={};a.forEach((h,u)=>{f[h]=p[u]||""}),l.push(f)}return l}function kn(o){var l;const e=o.title||"Untitled CSV Import",t=o.content||"";let n=o.slug||e.toLowerCase().replace(/[^a-z0-9-_]+/g,"-");n=n.toLowerCase().replace(/[^a-z0-9-_]+/g,"-"),n||(n=`imported-${Date.now()}`);const r=(o.tags||"imported, csv").split(/[,;|]+/).map(c=>c.trim().toLowerCase()).filter(c=>c.length>0),a=o.updatedat?parseInt(o.updatedat):Date.now();return{slug:n,title:e,content:t,updatedAt:isNaN(a)?Date.now():a,tags:r,isSystem:!1,isEncrypted:((l=o.encrypted)==null?void 0:l.toLowerCase())==="true"}}async function Oe(o,e){const t=Qr(o),n=await Fe(t.slug);if(n){if(e==="SKIP")return!1;if(e==="REVISION")await _n({id:`${n.slug}-${Date.now()}`,slug:n.slug,title:n.title,content:n.content,updatedAt:n.updatedAt,isEncrypted:n.isEncrypted}),await Ue(t);else if(e==="OVERWRITE")await Ue(t);else if(e==="MERGE_RENAME"){let s=`${t.slug}-imported`,r=await Fe(s),a=1;for(;r;)s=`${t.slug}-imported-${a}`,r=await Fe(s),a++;t.slug=s,t.title=`${t.title} (Imported)`,await Ue(t)}}else await Ue(t);return!0}function ua(o){const e=Array.from(new Set(ge.flatMap(v=>v.tags)));o.innerHTML=`
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
              <span class="text-emerald-400 font-bold">${Ko()}</span>
            </li>
            <li class="flex justify-between">
              <span class="text-slate-500">ACTIVE VISUAL THEME:</span>
              <span class="text-emerald-400 font-bold">${it.toUpperCase()}</span>
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
              ${e.map(v=>`
                <option value="${M(v)}">#${M(v)}</option>
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

          <!-- Import JSON Payload -->
          <div class="bg-slate-950/40 border border-slate-800 p-4 rounded-lg flex flex-col justify-between">
            <div>
              <h4 class="text-xs font-bold font-mono text-white uppercase">Import JSON Payload</h4>
              <p class="text-[10px] text-slate-500 font-mono mt-1 mb-4">Ingest a JSON backup payload into the database (up to 100MB).</p>
            </div>
            <label class="w-full text-center py-2 bg-slate-900 border border-slate-850 hover:border-slate-700 text-slate-300 font-mono text-xs uppercase rounded cursor-pointer transition hover:text-white block select-none">
              Load JSON
              <input type="file" id="system-import-file" accept=".json" class="hidden">
            </label>
          </div>

          <!-- Import Markdown Files -->
          <div class="bg-slate-950/40 border border-slate-800 p-4 rounded-lg flex flex-col justify-between">
            <div>
              <h4 class="text-xs font-bold font-mono text-white uppercase">Import Markdown Files</h4>
              <p class="text-[10px] text-slate-500 font-mono mt-1 mb-4">Load one or more raw markdown (.md) documents. Frontmatter supported.</p>
            </div>
            <label class="w-full text-center py-2 bg-slate-900 border border-slate-850 hover:border-slate-700 text-slate-300 font-mono text-xs uppercase rounded cursor-pointer transition hover:text-white block select-none">
              Load .MD Files
              <input type="file" id="system-import-md-files" accept=".md" multiple class="hidden">
            </label>
          </div>

          <!-- Import CSV Registry -->
          <div class="bg-slate-950/40 border border-slate-800 p-4 rounded-lg flex flex-col justify-between">
            <div>
              <h4 class="text-xs font-bold font-mono text-white uppercase">Import CSV Registry</h4>
              <p class="text-[10px] text-slate-500 font-mono mt-1 mb-4">Load page logs from CSV spreadsheet format. Column headers required.</p>
            </div>
            <label class="w-full text-center py-2 bg-slate-900 border border-slate-850 hover:border-slate-700 text-slate-300 font-mono text-xs uppercase rounded cursor-pointer transition hover:text-white block select-none">
              Load CSV
              <input type="file" id="system-import-csv-file" accept=".csv" class="hidden">
            </label>
          </div>

          <!-- Drag & Drop Zone -->
          <div id="system-drop-zone" class="glass-panel border-2 border-dashed border-slate-800 hover:border-teal-500/60 p-5 rounded-lg flex flex-col items-center justify-center text-center transition-all cursor-pointer sm:col-span-2 lg:col-span-3 min-h-[100px] bg-slate-950/20">
            <svg class="w-8 h-8 text-slate-500 mb-2" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"/>
            </svg>
            <span class="text-[10px] font-mono text-slate-300 uppercase font-semibold">Bulk Drag & Drop Terminal</span>
            <span class="text-[9px] font-mono text-slate-500 mt-0.5">Drop JSON, Markdown (.md), or CSV files here to ingest automatically.</span>
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
    </div>
  `;const t=document.getElementById("system-export-btn"),n=document.getElementById("system-export-zip-btn"),s=document.getElementById("system-export-web-zip-btn"),r=document.getElementById("system-export-csv-btn"),a=document.getElementById("system-export-html-btn"),l=document.getElementById("system-import-file"),c=document.getElementById("system-import-md-files"),p=document.getElementById("system-import-csv-file"),f=document.getElementById("system-reset-btn"),h=document.getElementById("total-articles-telemetry"),u=document.getElementById("db-health-diagnostics"),b=document.getElementById("system-drop-zone");h.textContent=ge.length.toString(),u&&ka(u);const R=()=>{const v=document.getElementById("export-tag-filter"),m=(v==null?void 0:v.value)||"ALL";return m==="ALL"?ge:ge.filter(k=>k.tags.includes(m))};t.addEventListener("click",()=>{const v=R(),m=JSON.stringify(v,null,2),k=new Blob([m],{type:"application/json"}),S=URL.createObjectURL(k),y=document.createElement("a");y.href=S,y.download=`secops-wiki-backup-${Date.now()}.json`,document.body.appendChild(y),y.click(),document.body.removeChild(y),URL.revokeObjectURL(S)}),n.addEventListener("click",async()=>{const v=R(),m=[];for(const E of v){let P=E.content;if(E.isEncrypted&&Y)try{P=await De(E.content,Y)}catch{}const D=`---
title: ${E.title}
slug: ${E.slug}
tags: ${E.tags.join(", ")}
updated: ${new Date(E.updatedAt).toISOString()}
encrypted: ${!!E.isEncrypted}
---

`;m.push({name:`${E.slug}.md`,content:D+P})}const k=rs(m),S=URL.createObjectURL(k),y=document.createElement("a");y.href=S,y.download=`secops-wiki-backup-${Date.now()}.zip`,document.body.appendChild(y),y.click(),document.body.removeChild(y),URL.revokeObjectURL(S)}),s.addEventListener("click",()=>{const v=R(),m=pa(v),k=URL.createObjectURL(m),S=document.createElement("a");S.href=k,S.download=`secops-wiki-web-${Date.now()}.zip`,document.body.appendChild(S),S.click(),document.body.removeChild(S),URL.revokeObjectURL(k)}),r.addEventListener("click",()=>{const v=R(),m=ca(v),k=new Blob([m],{type:"text/csv;charset=utf-8;"}),S=URL.createObjectURL(k),y=document.createElement("a");y.href=S,y.download=`secops-wiki-report-${Date.now()}.csv`,document.body.appendChild(y),y.click(),document.body.removeChild(y),URL.revokeObjectURL(S)}),a.addEventListener("click",()=>{const v=R(),m=da(v),k=new Blob([m],{type:"text/html;charset=utf-8;"}),S=URL.createObjectURL(k),y=document.createElement("a");y.href=S,y.download=`secops-wiki-book-${Date.now()}.html`,document.body.appendChild(y),y.click(),document.body.removeChild(y),URL.revokeObjectURL(S)}),l.addEventListener("change",v=>{var y,E;const m=(y=v.target.files)==null?void 0:y[0];if(!m)return;if(m.size>100*1024*1024){alert("Ingestion failed: File size exceeds the secure ceiling of 100MB.");return}const k=((E=document.getElementById("import-conflict-resolution"))==null?void 0:E.value)||"REVISION",S=new FileReader;S.onload=async P=>{var D;try{const $=JSON.parse((D=P.target)==null?void 0:D.result),T=Array.isArray($)?$:[$];let N=0,L=0,O=0;if(confirm(`SYSTEM INGESTION PROTOCOL: Import ${T.length} articles from JSON backup? Conflict mode: ${k.toUpperCase()}`)){for(const B of T)try{await Oe(B,k)?N++:L++}catch{O++}alert(`JSON INGESTION RESULTS:
- Imported: ${N}
- Skipped: ${L}
- Failed: ${O}`),Ie.postMessage("refresh"),await we(),await ve()}}catch($){alert(`Ingestion failed: Schema violation. ${$.message}`)}},S.readAsText(m)}),c.addEventListener("change",async v=>{var P;const m=v.target.files;if(!m||m.length===0)return;const k=((P=document.getElementById("import-conflict-resolution"))==null?void 0:P.value)||"REVISION";let S=0,y=0,E=0;for(let D=0;D<m.length;D++){const $=m[D];if($.size>10*1024*1024){E++;continue}await new Promise(T=>{const N=new FileReader;N.onload=async L=>{var O;try{const B=(O=L.target)==null?void 0:O.result,W=wn($.name,B);await Oe(W,k)?S++:y++}catch{E++}T()},N.readAsText($)})}alert(`MARKDOWN IMPORT RESULTS:
- Imported: ${S}
- Skipped: ${y}
- Failed: ${E}`),Ie.postMessage("refresh"),await we(),await ve()}),p.addEventListener("change",async v=>{var y,E;const m=(y=v.target.files)==null?void 0:y[0];if(!m)return;if(m.size>10*1024*1024){alert("Ingestion failed: CSV File exceeds secure limit of 10MB.");return}const k=((E=document.getElementById("import-conflict-resolution"))==null?void 0:E.value)||"REVISION",S=new FileReader;S.onload=async P=>{var D;try{const $=(D=P.target)==null?void 0:D.result,T=vn($);if(T.length===0)throw new Error("No rows found in CSV file.");let N=0,L=0,O=0;if(confirm(`SYSTEM INGESTION PROTOCOL: Import ${T.length} records from CSV? Conflict mode: ${k.toUpperCase()}`)){for(const B of T)try{const W=kn(B);await Oe(W,k)?N++:L++}catch{O++}alert(`CSV IMPORT RESULTS:
- Imported: ${N}
- Skipped: ${L}
- Failed: ${O}`),Ie.postMessage("refresh"),await we(),await ve()}}catch($){alert(`CSV Ingestion failed: ${$.message}`)}},S.readAsText(m)}),["dragenter","dragover","dragleave","drop"].forEach(v=>{b.addEventListener(v,m=>{m.preventDefault(),m.stopPropagation()},!1)}),["dragenter","dragover"].forEach(v=>{b.addEventListener(v,()=>{b.classList.add("border-teal-500","bg-teal-950/10")},!1)}),["dragleave","drop"].forEach(v=>{b.addEventListener(v,()=>{b.classList.remove("border-teal-500","bg-teal-950/10")},!1)}),b.addEventListener("drop",async v=>{var B,W;const m=v.dataTransfer,k=m==null?void 0:m.files;if(!k||k.length===0)return;const S=((B=document.getElementById("import-conflict-resolution"))==null?void 0:B.value)||"REVISION";let y=0,E=0,P=0,D=0,$=0,T=0,N=0,L=0,O=0;for(let de=0;de<k.length;de++){const q=k[de],le=(W=q.name.split(".").pop())==null?void 0:W.toLowerCase();le==="md"?await new Promise(ne=>{const g=new FileReader;g.onload=async _=>{var C;try{const A=(C=_.target)==null?void 0:C.result,U=wn(q.name,A);await Oe(U,S)?y++:D++}catch{N++}ne()},g.readAsText(q)}):le==="csv"?await new Promise(ne=>{const g=new FileReader;g.onload=async _=>{var C;try{const A=(C=_.target)==null?void 0:C.result,U=vn(A);for(const V of U)try{const ce=kn(V);await Oe(ce,S)?E++:$++}catch{L++}}catch{L++}ne()},g.readAsText(q)}):le==="json"&&await new Promise(ne=>{const g=new FileReader;g.onload=async _=>{var C;try{const A=JSON.parse((C=_.target)==null?void 0:C.result),U=Array.isArray(A)?A:[A];for(const V of U)try{await Oe(V,S)?P++:T++}catch{O++}}catch{O++}ne()},g.readAsText(q)})}alert(`DRAG & DROP IMPORT COMPLETED (Conflict resolution: ${S.toUpperCase()}):

Markdown (.md) files:
- Ingested: ${y}
- Skipped: ${D}
- Failed: ${N}

CSV files (rows):
- Ingested: ${E}
- Skipped: ${$}
- Failed: ${L}

JSON files (records):
- Ingested: ${P}
- Skipped: ${T}
- Failed: ${O}`),Ie.postMessage("refresh"),await we(),await ve()}),b.addEventListener("click",()=>{const v=document.createElement("input");v.type="file",v.multiple=!0,v.accept=".md,.csv,.json",v.onchange=async m=>{var B,W;const k=m.target.files;if(!k||k.length===0)return;const S=((B=document.getElementById("import-conflict-resolution"))==null?void 0:B.value)||"REVISION";let y=0,E=0,P=0,D=0,$=0,T=0,N=0,L=0,O=0;for(let de=0;de<k.length;de++){const q=k[de],le=(W=q.name.split(".").pop())==null?void 0:W.toLowerCase();le==="md"?await new Promise(ne=>{const g=new FileReader;g.onload=async _=>{var C;try{const A=(C=_.target)==null?void 0:C.result,U=wn(q.name,A);await Oe(U,S)?y++:D++}catch{N++}ne()},g.readAsText(q)}):le==="csv"?await new Promise(ne=>{const g=new FileReader;g.onload=async _=>{var C;try{const A=(C=_.target)==null?void 0:C.result,U=vn(A);for(const V of U)try{const ce=kn(V);await Oe(ce,S)?E++:$++}catch{L++}}catch{L++}ne()},g.readAsText(q)}):le==="json"&&await new Promise(ne=>{const g=new FileReader;g.onload=async _=>{var C;try{const A=JSON.parse((C=_.target)==null?void 0:C.result),U=Array.isArray(A)?A:[A];for(const V of U)try{await Oe(V,S)?P++:T++}catch{O++}}catch{O++}ne()},g.readAsText(q)})}alert(`FILE SELECTION IMPORT COMPLETED (Conflict resolution: ${S.toUpperCase()}):

Markdown (.md) files:
- Ingested: ${y}
- Skipped: ${D}
- Failed: ${N}

CSV files (rows):
- Ingested: ${E}
- Skipped: ${$}
- Failed: ${L}

JSON files (records):
- Ingested: ${P}
- Skipped: ${T}
- Failed: ${O}`),Ie.postMessage("refresh"),await we(),await ve()},v.click()}),f.addEventListener("click",async()=>{const v=prompt('CRITICAL SECURITY WARNING: Type "WIPE" to verify you want to delete ALL wiki pages and custom documents:');if(v==="WIPE"){const m=indexedDB.open("secops-wiki-db",2);m.onsuccess=async()=>{const y=m.result.transaction("pages","readwrite").objectStore("pages");y.clear().onsuccess=async()=>{if("caches"in window)try{const E=await caches.keys();for(const P of E)await caches.delete(P)}catch(E){console.warn("Failed to clear caches: ",E)}await No(),alert("Database successfully wiped, caches invalidated, and seeded with standard operating defaults."),Ie.postMessage("refresh"),await we(),window.location.hash="#/page/home"}}}else v!==null&&alert("Sanitization aborted. Confirmation keyword mismatch.")})}function Tt(){const o=document.getElementById("command-palette-backdrop");if(o)if(gn=!gn,gn){o.classList.remove("hidden");const e=document.getElementById("command-palette-input");e&&(e.value="",e.focus()),xe=0,Gt()}else o.classList.add("hidden")}function fa(){if(document.getElementById("command-palette-backdrop"))return;const o=document.createElement("div");o.id="command-palette-backdrop",o.className="fixed inset-0 bg-[#090d16]/85 backdrop-blur-md z-50 flex items-start justify-center pt-20 hidden",o.innerHTML=`
    <div class="glass-panel border border-teal-900/30 rounded-xl w-full max-w-lg overflow-hidden shadow-2xl mx-4 glow-border">
      <input type="text" id="command-palette-input" placeholder="Search pages or run system commands..." class="w-full bg-slate-950/80 text-white font-mono text-sm p-4 outline-none border-b border-slate-800 focus:border-teal-500/30 placeholder-slate-500 transition">
      <div id="command-palette-results" class="max-h-80 overflow-y-auto divide-y divide-slate-850/40 p-2 space-y-1"></div>
    </div>
  `,document.body.appendChild(o);const e=document.getElementById("command-palette-input");e.addEventListener("input",()=>{xe=0,Gt()}),e.addEventListener("keydown",ha),o.addEventListener("click",t=>{t.target===o&&Tt()})}function Gt(){const o=document.getElementById("command-palette-input"),e=document.getElementById("command-palette-results");if(!e)return;const t=o?o.value.trim().toLowerCase():"",n=[{title:"CREATE NEW PAGE",subtitle:"Open the editor to establish a new document",icon:"➕",action:()=>{window.location.hash="#/new"}},{title:"TOGGLE THEME",subtitle:`Switch visual style (currently ${it})`,icon:"🌓",action:()=>{os()}},{title:"SYSTEM ADMIN",subtitle:"Access operations console and db diagnostics",icon:"⚙️",action:()=>{window.location.hash="#/system"}},{title:"TACTICAL MAP VIEW",subtitle:"Display interactive node relationship map",icon:"🗺️",action:()=>{window.location.hash="#/graph"}},{title:"PANIC PURGE PROTOCOL",subtitle:"Emergency self-destruct - wipes all data",icon:"🚨",action:()=>{const f=document.getElementById("system-panic-btn");f&&f.click()}}];let s="",r=0;const a=n.filter(f=>f.title.toLowerCase().includes(t)||f.subtitle.toLowerCase().includes(t));let l=[];t?l=ge.map(f=>({page:f,score:ss(f,t)})).filter(f=>f.score>0).sort((f,h)=>h.score-f.score):l=ge.slice(0,5).map(f=>({page:f,score:0}));const c=a.length+l.length;xe>=c?xe=0:xe<0&&(xe=c-1),a.forEach(f=>{s+=`
      <div class="command-palette-item p-3 rounded-lg flex items-center justify-between cursor-pointer font-mono text-xs transition-all ${r===xe?"command-item-active bg-teal-950/20 text-teal-400 border-l-2 border-teal-500":"text-slate-400 hover:bg-slate-900/40 hover:text-slate-200"}" data-index="${r}">
        <div class="flex items-center gap-3">
          <span class="text-base">${f.icon}</span>
          <div>
            <div class="font-bold text-white uppercase">${f.title}</div>
            <div class="text-[10px] text-slate-500">${f.subtitle}</div>
          </div>
        </div>
        <span class="text-[10px] text-slate-650 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-900 uppercase">CMD</span>
      </div>
    `,r++}),l.forEach(f=>{const h=r===xe,u=f.page;s+=`
      <div class="command-palette-item p-3 rounded-lg flex items-center justify-between cursor-pointer font-mono text-xs transition-all ${h?"command-item-active bg-teal-950/20 text-teal-400 border-l-2 border-teal-500":"text-slate-400 hover:bg-slate-900/40 hover:text-slate-200"}" data-index="${r}">
        <div class="flex items-center gap-3">
          <span class="text-base">${u.isEncrypted?"🔒":"📄"}</span>
          <div>
            <div class="font-bold text-white">${M(u.title)}</div>
            <div class="text-[10px] text-slate-500">Slug: ${M(u.slug)} ${u.tags.length?`• tags: #${u.tags.map(b=>M(b)).join(", #")}`:""}</div>
          </div>
        </div>
        <span class="text-[10px] text-slate-650 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-900 uppercase">PAGE</span>
      </div>
    `,r++}),c===0&&(s='<div class="text-center py-6 text-xs text-slate-600 font-mono">No matching commands or pages found.</div>'),e.innerHTML=s,e.querySelectorAll(".command-palette-item").forEach(f=>{f.addEventListener("click",()=>{const h=parseInt(f.getAttribute("data-index")||"0",10);ma(h,a,l)})}),ga()}function ma(o,e,t){if(Tt(),o<e.length)e[o].action();else{const n=o-e.length;n<t.length&&(window.location.hash=`#/page/${t[n].page.slug}`)}}function ha(o){const e=document.getElementById("command-palette-results");if(!e)return;const t=e.querySelectorAll(".command-palette-item");if(t.length!==0)if(o.key==="ArrowDown")o.preventDefault(),xe=(xe+1)%t.length,Gt();else if(o.key==="ArrowUp")o.preventDefault(),xe=(xe-1+t.length)%t.length,Gt();else if(o.key==="Enter"){o.preventDefault();const n=e.querySelector(".command-item-active");n&&n.click()}else o.key==="Escape"&&(o.preventDefault(),Tt())}function ga(){const o=document.getElementById("command-palette-results");if(!o)return;const e=o.querySelector(".command-item-active");e&&e.scrollIntoView({block:"nearest"})}function ba(o){const e=document.getElementById("autocomplete-popup");e&&(e.classList.remove("hidden"),cs(o))}function Ft(){const o=document.getElementById("autocomplete-popup");o&&(o.classList.add("hidden"),zt=!1)}function cs(o){const e=document.getElementById("autocomplete-popup");if(!e)return;const t=Ln.toLowerCase().trim(),n=ge.filter(r=>r.title.toLowerCase().includes(t)||r.slug.toLowerCase().includes(t));if(n.length===0){e.innerHTML='<div class="p-2 text-slate-500 italic">No matches found</div>';return}e.innerHTML=n.map((r,a)=>`
    <div class="editor-autocomplete-item p-2 cursor-pointer transition ${a===0?"active bg-teal-950/20 text-teal-400":"text-slate-400 hover:bg-slate-900/40 hover:text-slate-200"}" data-slug="${M(r.slug)}" data-title="${M(r.title)}">
      <span class="font-bold">${M(r.title)}</span>
      <span class="text-[9px] text-slate-500 block truncate">Slug: ${M(r.slug)}</span>
    </div>
  `).join(""),e.querySelectorAll(".editor-autocomplete-item").forEach(r=>{r.addEventListener("click",a=>{const l=a.currentTarget,c=l.getAttribute("data-slug")||"",p=l.getAttribute("data-title")||"";ya(o,p,c)})});const s=xa(o,o.selectionStart);e.style.left=`${Math.min(o.clientWidth-260,Math.max(16,s.left))}px`,e.style.top=`${Math.min(o.clientHeight-100,Math.max(40,s.top+20))}px`}function xa(o,e){const n=o.value.substring(0,e).split(`
`),s=n.length-1,r=n[s],a=8,l=20,c=16+r.length*a%(o.clientWidth-40),p=12+s*l-o.scrollTop;return{left:c,top:p}}function ya(o,e,t){const n=Ut-2,s=o.selectionStart,r=o.value,a=`[${e}](#/page/${t})`;o.value=r.substring(0,n)+a+r.substring(s),o.focus(),o.selectionStart=n+a.length,o.selectionEnd=n+a.length,Ft();const l=document.getElementById("live-preview-box");l&&(l.innerHTML=ct(o.value))}async function wa(o,e,t){const n=await Fe(o);if(!n)return;let s=n.content;const r=!!n.isEncrypted;if(r){if(!Y){alert("Authentication Error: Decryption key is missing. Re-decrypt page first.");return}try{s=await De(s,Y)}catch{alert("Decryption failure.");return}}let a=0;const l=/([-*+]\s+\[)([ xX])(\])/g,c=s.replace(l,(h,u,b,R)=>a===e?(a++,`${u}${t?"x":" "}${R}`):(a++,h));let p=c;r&&Y&&(p=await Jo(c,Y)),n.content=p,n.updatedAt=Date.now(),await Ue(n),Ie.postMessage("refresh"),await we();const f=document.getElementById("main-content");f&&await is(f)}function ds(o){const e=[],t=/(?:\(|"|^|\s)#\/page\/([a-z0-9-_]+)/g;let n;for(;(n=t.exec(o))!==null;)e.push(n[1].toLowerCase());return Array.from(new Set(e))}async function va(o){o.innerHTML=`
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
  `;const e=document.getElementById("tactical-map-canvas");if(!e)return;const t=e.getContext("2d");if(!t)return;const n=window.devicePixelRatio||1,s=e.getBoundingClientRect();e.width=s.width*n,e.height=500*n,t.scale(n,n);const r=s.width,a=500;let l=1,c=0,p=0,f=!1,h=0,u=0;const b=ge.map(g=>{const _=r/2+(Math.random()-.5)*100,C=a/2+(Math.random()-.5)*100;return{id:g.slug,title:g.title,x:_,y:C,vx:0,vy:0,radius:g.slug==="home"?14:10,isEncrypted:!!g.isEncrypted,isSystem:!!g.isSystem}}),R=[],v=new Set(b.map(g=>g.id));for(const g of ge){let _=g.content;if(g.isEncrypted&&Y)try{_=await De(g.content,Y)}catch{}ds(_).forEach(A=>{v.has(A)&&A!==g.slug&&R.push({source:g.slug,target:A})})}let m=null,k=null,S=0,y=0,E=0;const P=.02,D=1200,$=.85,T=.02;function N(g,_){const C=(g-r/2-c)/l+r/2,A=(_-a/2-p)/l+a/2;return{x:C,y:A}}function L(){for(let g=0;g<b.length;g++){const _=b[g];for(let C=g+1;C<b.length;C++){const A=b[C],U=A.x-_.x,V=A.y-_.y,ce=U*U+V*V+.1,me=Math.sqrt(ce);if(me<250){const He=D/ce,$e=U/me*He,dt=V/me*He;_!==m&&(_.vx-=$e,_.vy-=dt),A!==m&&(A.vx+=$e,A.vy+=dt)}}}R.forEach(g=>{const _=b.find($e=>$e.id===g.source),C=b.find($e=>$e.id===g.target);if(!_||!C)return;const A=C.x-_.x,U=C.y-_.y,V=Math.sqrt(A*A+U*U)||.1,ce=(V-100)*P,me=A/V*ce,He=U/V*ce;_!==m&&(_.vx+=me,_.vy+=He),C!==m&&(C.vx-=me,C.vy-=He)}),b.forEach(g=>{if(g===m)return;const _=r/2-g.x,C=a/2-g.y;g.vx+=_*T,g.vy+=C*T,g.x+=g.vx,g.y+=g.vy,g.vx*=$,g.vy*=$,g.x=Math.max(g.radius,Math.min(r-g.radius,g.x)),g.y=Math.max(g.radius,Math.min(a-g.radius,g.y))})}function O(){t.clearRect(0,0,r,a),t.save(),t.translate(r/2+c,a/2+p),t.scale(l,l),t.translate(-r/2,-a/2),t.lineWidth=1,R.forEach(g=>{const _=b.find(U=>U.id===g.source),C=b.find(U=>U.id===g.target);if(!_||!C)return;const A=k&&(k.id===_.id||k.id===C.id);t.strokeStyle=A?"rgba(20, 184, 166, 0.6)":"rgba(30, 41, 59, 0.4)",t.lineWidth=A?1.5/l:1/l,t.beginPath(),t.moveTo(_.x,_.y),t.lineTo(C.x,C.y),t.stroke()}),b.forEach(g=>{t.beginPath(),t.arc(g.x,g.y,g.radius,0,2*Math.PI);let _="#14b8a6",C="rgba(20, 184, 166, 0.4)";g.isEncrypted?(_="#ef4444",C="rgba(239, 68, 68, 0.4)"):g.isSystem&&(_="#3b82f6",C="rgba(59, 130, 246, 0.4)"),t.fillStyle=_,t.shadowColor=C,t.shadowBlur=k===g?12:6,t.fill(),t.shadowBlur=0,t.strokeStyle="rgba(255, 255, 255, 0.1)",t.lineWidth=1.5/l,t.stroke(),t.fillStyle=k===g?"#ffffff":"#94a3b8",t.font=k===g?`bold ${10/l}px monospace`:`${9/l}px monospace`,t.textAlign="center",t.fillText(g.title,g.x,g.y-g.radius-5/l)}),t.restore()}function B(){L(),O(),E=requestAnimationFrame(B)}e.addEventListener("mousemove",g=>{const _=e.getBoundingClientRect(),C=g.clientX-_.left,A=g.clientY-_.top,U=N(C,A);if(S=U.x,y=U.y,m){m.x=S,m.y=y,m.vx=0,m.vy=0;return}if(f){c=C-h,p=A-u;return}k=null;for(const V of b){const ce=V.x-S,me=V.y-y;if(ce*ce+me*me<(V.radius+5)*(V.radius+5)){k=V;break}}}),e.addEventListener("mousedown",g=>{const _=e.getBoundingClientRect(),C=g.clientX-_.left,A=g.clientY-_.top;if(k){m=k;const U=N(C,A);m.x=U.x,m.y=U.y}else f=!0,h=C-c,u=A-p}),e.addEventListener("wheel",g=>{g.preventDefault();const _=e.getBoundingClientRect(),C=g.clientX-_.left,A=g.clientY-_.top,U=N(C,A),V=g.deltaY<0?1.1:.9;l=Math.max(.2,Math.min(4,l*V)),c=C-(U.x-r/2)*l-r/2,p=A-(U.y-a/2)*l-a/2},{passive:!1});const W=()=>{m=null,f=!1};window.addEventListener("mouseup",W),e.addEventListener("click",()=>{k&&!f&&(cancelAnimationFrame(E),window.location.hash=`#/page/${k.id}`)});const de=document.getElementById("map-zoom-in"),q=document.getElementById("map-zoom-out"),le=document.getElementById("map-zoom-reset");de.addEventListener("click",()=>{l=Math.min(4,l*1.2)}),q.addEventListener("click",()=>{l=Math.max(.2,l/1.2)}),le.addEventListener("click",()=>{l=1,c=0,p=0}),B();const ne=()=>{cancelAnimationFrame(E),window.removeEventListener("mouseup",W),window.removeEventListener("hashchange",ne)};window.addEventListener("hashchange",ne)}async function ka(o){o.innerHTML=`
    <div class="text-xs font-mono text-slate-500 animate-pulse">Running security & link integrity scan...</div>
  `;const e=await Cn();let t=0;const n=new TextEncoder;e.forEach(p=>{const f=JSON.stringify(p);t+=n.encode(f).length});const s=t<1024?`${t} Bytes`:t<1024*1024?`${(t/1024).toFixed(2)} KB`:`${(t/(1024*1024)).toFixed(2)} MB`,r=new Set(e.map(p=>p.slug)),a={};e.forEach(p=>{a[p.slug]=[]});const l=[];for(const p of e){let f=p.content;if(p.isEncrypted&&Y)try{f=await De(p.content,Y)}catch{}ds(f).forEach(u=>{r.has(u)?u!==p.slug&&a[u].push(p.slug):l.push({source:p.slug,target:u})})}const c=e.filter(p=>p.slug!=="home"&&a[p.slug].length===0);o.innerHTML=`
    <div class="glass-panel border border-slate-800 rounded-xl p-5 space-y-4 font-mono text-xs">
      <h3 class="text-sm font-bold font-mono text-white uppercase tracking-wider border-b border-slate-800 pb-2">Database Integrity Report</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-slate-950/50 border border-slate-850 p-3 rounded-lg text-center">
          <div class="text-[10px] text-slate-500 font-mono uppercase">Total Database Footprint</div>
          <div class="text-base font-bold text-teal-400 font-mono mt-1">${s}</div>
        </div>
        <div class="bg-slate-950/50 border border-slate-850 p-3 rounded-lg text-center">
          <div class="text-[10px] text-slate-500 font-mono uppercase">Broken Reference Citations</div>
          <div class="text-base font-bold font-mono mt-1 ${l.length>0?"text-red-400 animate-pulse":"text-emerald-400"}">${l.length}</div>
        </div>
        <div class="bg-slate-950/50 border border-slate-850 p-3 rounded-lg text-center">
          <div class="text-[10px] text-slate-500 font-mono uppercase">Orphaned Intel Documents</div>
          <div class="text-base font-bold font-mono mt-1 ${c.length>0?"text-amber-500":"text-emerald-400"}">${c.length}</div>
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
              ${l.map(p=>`
                <div class="text-[10px] text-red-400/80">📄 [${M(p.source)}] references non-existent [${M(p.target)}]</div>
              `).join("")}
            </div>
          `}
        </div>

        <!-- Orphan Details -->
        <div>
          <span class="text-slate-400 font-bold uppercase block mb-1">Orphaned Documents (No incoming links):</span>
          ${c.length===0?`
            <span class="text-emerald-400 text-[10px]">✓ All custom documents linked to operational flows.</span>
          `:`
            <div class="max-h-24 overflow-y-auto space-y-1 pr-1">
              ${c.map(p=>`
                <div class="text-[10px] text-amber-500/80">📄 [${M(p.title)}] (slug: ${M(p.slug)}) has zero citations</div>
              `).join("")}
            </div>
          `}
        </div>
      </div>
    </div>
  `}document.addEventListener("DOMContentLoaded",na);
