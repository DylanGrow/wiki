var Ao=Object.defineProperty;var as=s=>{throw TypeError(s)};var Io=(s,e,t)=>e in s?Ao(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var W=(s,e,t)=>Io(s,typeof e!="symbol"?e+"":e,t),Lo=(s,e,t)=>e.has(s)||as("Cannot "+t);var is=(s,e,t)=>e.has(s)?as("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(s):e.set(s,t);var _t=(s,e,t)=>(Lo(s,e,"access private method"),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(o){if(o.ep)return;o.ep=!0;const r=t(o);fetch(o.href,r)}})();if(self!==top)try{window.top&&(window.top.location.href=window.location.href)}catch{window.location.href="about:blank"}else document.documentElement.classList.remove("clickjack-lock");const Co="secops-wiki-db",Le="pages",ze="revisions",_o=2;function qe(){return new Promise((s,e)=>{const t=indexedDB.open(Co,_o);t.onerror=()=>e(t.error),t.onsuccess=()=>s(t.result),t.onupgradeneeded=()=>{const n=t.result;n.objectStoreNames.contains(Le)||n.createObjectStore(Le,{keyPath:"slug"}),n.objectStoreNames.contains(ze)||n.createObjectStore(ze,{keyPath:"id"}).createIndex("slug","slug",{unique:!1})}})}async function Be(s){const e=await qe();return new Promise((t,n)=>{const a=e.transaction(Le,"readonly").objectStore(Le).get(s);a.onerror=()=>n(a.error),a.onsuccess=()=>t(a.result||null)})}async function Pe(s){const e=await qe();return new Promise((t,n)=>{const a=e.transaction(Le,"readwrite").objectStore(Le).put(s);a.onerror=()=>n(a.error),a.onsuccess=()=>t()})}async function Ro(s){await Do(s);const e=await qe();return new Promise((t,n)=>{const a=e.transaction(Le,"readwrite").objectStore(Le).delete(s);a.onerror=()=>n(a.error),a.onsuccess=()=>t()})}async function Sn(){const s=await qe();return new Promise((e,t)=>{const r=s.transaction(Le,"readonly").objectStore(Le).getAll();r.onerror=()=>t(r.error),r.onsuccess=()=>e(r.result||[])})}async function An(s){const e=await qe();return new Promise((t,n)=>{const a=e.transaction(ze,"readwrite").objectStore(ze).put(s);a.onerror=()=>n(a.error),a.onsuccess=()=>t()})}async function Oo(s){const e=await qe();return new Promise((t,n)=>{const l=e.transaction(ze,"readonly").objectStore(ze).index("slug").getAll(s);l.onerror=()=>n(l.error),l.onsuccess=()=>{const c=l.result||[];c.sort((f,p)=>p.updatedAt-f.updatedAt),t(c)}})}async function Do(s){const e=await qe();return new Promise((t,n)=>{const l=e.transaction(ze,"readwrite").objectStore(ze).index("slug").openCursor(s);l.onerror=()=>n(l.error),l.onsuccess=()=>{const c=l.result;c?(c.delete(),c.continue()):t()}})}const $o=[{slug:"home",title:"Operations Dashboard",content:`# Secure Operations Center (SOC) Wiki

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
* Raw input strings are escaped to prevent Cross-Site Scripting (XSS).`,updatedAt:Date.now(),tags:["security","hardening"],isSystem:!0}];async function Rs(){if((await Sn()).length===0)for(const e of $o)await Pe(e)}/*! @license DOMPurify 3.4.11 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.4.11/LICENSE */function ls(s,e){(e==null||e>s.length)&&(e=s.length);for(var t=0,n=Array(e);t<e;t++)n[t]=s[t];return n}function No(s){if(Array.isArray(s))return s}function Mo(s,e){var t=s==null?null:typeof Symbol<"u"&&s[Symbol.iterator]||s["@@iterator"];if(t!=null){var n,o,r,a,l=[],c=!0,f=!1;try{if(r=(t=t.call(s)).next,e!==0)for(;!(c=(n=r.call(t)).done)&&(l.push(n.value),l.length!==e);c=!0);}catch(p){f=!0,o=p}finally{try{if(!c&&t.return!=null&&(a=t.return(),Object(a)!==a))return}finally{if(f)throw o}}return l}}function Po(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Bo(s,e){return No(s)||Mo(s,e)||zo(s,e)||Po()}function zo(s,e){if(s){if(typeof s=="string")return ls(s,e);var t={}.toString.call(s).slice(8,-1);return t==="Object"&&s.constructor&&(t=s.constructor.name),t==="Map"||t==="Set"?Array.from(s):t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?ls(s,e):void 0}}const Os=Object.entries,cs=Object.setPrototypeOf,Uo=Object.isFrozen,Fo=Object.getPrototypeOf,jo=Object.getOwnPropertyDescriptor;let re=Object.freeze,ae=Object.seal,tt=Object.create,Ds=typeof Reflect<"u"&&Reflect,yn=Ds.apply,wn=Ds.construct;re||(re=function(e){return e});ae||(ae=function(e){return e});yn||(yn=function(e,t){for(var n=arguments.length,o=new Array(n>2?n-2:0),r=2;r<n;r++)o[r-2]=arguments[r];return e.apply(t,o)});wn||(wn=function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),o=1;o<t;o++)n[o-1]=arguments[o];return new e(...n)});const pt=J(Array.prototype.forEach),Ho=J(Array.prototype.lastIndexOf),ds=J(Array.prototype.pop),et=J(Array.prototype.push),Wo=J(Array.prototype.splice),Me=Array.isArray,gt=J(String.prototype.toLowerCase),ln=J(String.prototype.toString),ps=J(String.prototype.match),ut=J(String.prototype.replace),us=J(String.prototype.indexOf),Go=J(String.prototype.trim),Vo=J(Number.prototype.toString),qo=J(Boolean.prototype.toString),fs=typeof BigInt>"u"?null:J(BigInt.prototype.toString),ms=typeof Symbol>"u"?null:J(Symbol.prototype.toString),se=J(Object.prototype.hasOwnProperty),ft=J(Object.prototype.toString),oe=J(RegExp.prototype.test),He=Yo(TypeError);function J(s){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var t=arguments.length,n=new Array(t>1?t-1:0),o=1;o<t;o++)n[o-1]=arguments[o];return yn(s,e,n)}}function Yo(s){return function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return wn(s,t)}}function P(s,e){let t=arguments.length>2&&arguments[2]!==void 0?arguments[2]:gt;if(cs&&cs(s,null),!Me(e))return s;let n=e.length;for(;n--;){let o=e[n];if(typeof o=="string"){const r=t(o);r!==o&&(Uo(e)||(e[n]=r),o=r)}s[o]=!0}return s}function Zo(s){for(let e=0;e<s.length;e++)se(s,e)||(s[e]=null);return s}function le(s){const e=tt(null);for(const n of Os(s)){var t=Bo(n,2);const o=t[0],r=t[1];se(s,o)&&(Me(r)?e[o]=Zo(r):r&&typeof r=="object"&&r.constructor===Object?e[o]=le(r):e[o]=r)}return e}function Ko(s){switch(typeof s){case"string":return s;case"number":return Vo(s);case"boolean":return qo(s);case"bigint":return fs?fs(s):"0";case"symbol":return ms?ms(s):"Symbol()";case"undefined":return ft(s);case"function":case"object":{if(s===null)return ft(s);const e=s,t=ke(e,"toString");if(typeof t=="function"){const n=t(e);return typeof n=="string"?n:ft(n)}return ft(s)}default:return ft(s)}}function ke(s,e){for(;s!==null;){const n=jo(s,e);if(n){if(n.get)return J(n.get);if(typeof n.value=="function")return J(n.value)}s=Fo(s)}function t(){return null}return t}function Xo(s){try{return oe(s,""),!0}catch{return!1}}const hs=re(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),cn=re(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),dn=re(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Qo=re(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),pn=re(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Jo=re(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),gs=re(["#text"]),bs=re(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","command","commandfor","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns"]),un=re(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),xs=re(["accent","accentunder","align","bevelled","close","columnalign","columnlines","columnspacing","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lquote","lspace","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Rt=re(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),er=ae(/{{[\w\W]*|^[\w\W]*}}/g),tr=ae(/<%[\w\W]*|^[\w\W]*%>/g),nr=ae(/\${[\w\W]*/g),sr=ae(/^data-[\-\w.\u00B7-\uFFFF]+$/),or=ae(/^aria-[\-\w]+$/),ys=ae(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),rr=ae(/^(?:\w+script|data):/i),ar=ae(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),ir=ae(/^html$/i),lr=ae(/^[a-z][.\w]*(-[.\w]+)+$/i),ws=ae(/<[/\w!]/g),cr=ae(/<[/\w]/g),dr=ae(/<\/no(script|embed|frames)/i),pr=ae(/\/>/i),ve={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,processingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},ur=function(){return typeof window>"u"?null:window},fr=function(e,t){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let n=null;const o="data-tt-policy-suffix";t&&t.hasAttribute(o)&&(n=t.getAttribute(o));const r="dompurify"+(n?"#"+n:"");try{return e.createPolicy(r,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+r+" could not be created."),null}},vs=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}},Ne=function(e,t,n,o){return se(e,t)&&Me(e[t])?P(o.base?le(o.base):{},e[t],o.transform):n};function $s(){let s=arguments.length>0&&arguments[0]!==void 0?arguments[0]:ur();const e=w=>$s(w);if(e.version="3.4.11",e.removed=[],!s||!s.document||s.document.nodeType!==ve.document||!s.Element)return e.isSupported=!1,e;let t=s.document;const n=t,o=n.currentScript;s.DocumentFragment;const r=s.HTMLTemplateElement,a=s.Node,l=s.Element,c=s.NodeFilter,f=s.NamedNodeMap;f===void 0&&(s.NamedNodeMap||s.MozNamedAttrMap),s.HTMLFormElement;const p=s.DOMParser,m=s.trustedTypes,u=l.prototype,v=ke(u,"cloneNode"),_=ke(u,"remove"),k=ke(u,"nextSibling"),g=ke(u,"childNodes"),S=ke(u,"parentNode"),A=ke(u,"shadowRoot"),E=ke(u,"attributes"),I=a&&a.prototype?ke(a.prototype,"nodeType"):null,$=a&&a.prototype?ke(a.prototype,"nodeName"):null;if(typeof r=="function"){const w=t.createElement("template");w.content&&w.content.ownerDocument&&(t=w.content.ownerDocument)}let O,x="",h,b=!1,T=0;const C=function(){if(T>0)throw He('A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted Types" section of the README.')},R=function(i){C(),T++;try{return O.createHTML(i)}finally{T--}},V=function(i){C(),T++;try{return O.createScriptURL(i)}finally{T--}},H=function(){return b||(h=fr(m,o),b=!0),h},j=t,ee=j.implementation,z=j.createNodeIterator,q=j.createDocumentFragment,de=j.getElementsByTagName,te=n.importNode;let N=vs();e.isSupported=typeof Os=="function"&&typeof S=="function"&&ee&&ee.createHTMLDocument!==void 0;const pe=er,ge=tr,Ue=nr,Ht=sr,ao=or,io=rr,$n=ar,lo=lr;let Nn=ys,Y=null;const Mn=P({},[...hs,...cn,...dn,...pn,...gs]);let Z=null;const Pn=P({},[...bs,...un,...xs,...Rt]);let K=Object.seal(tt(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),it=null,Bn=null;const Oe=Object.seal(tt(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let zn=!0,Wt=!0,Un=!1,Fn=!0,De=!1,lt=!0,Fe=!1,Gt=!1,Vt=null,qt=null,Yt=!1,Ze=!1,Et=!1,Tt=!1,jn=!0,Hn=!1;const Wn="user-content-";let Zt=!0,Kt=!1,Ke={},ye=null;const Xt=P({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","selectedcontent","style","svg","template","thead","title","video","xmp"]);let Gn=null;const Vn=P({},["audio","video","img","source","image","track"]);let Qt=null;const qn=P({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),St="http://www.w3.org/1998/Math/MathML",At="http://www.w3.org/2000/svg",we="http://www.w3.org/1999/xhtml";let Xe=we,Jt=!1,en=null;const co=P({},[St,At,we],ln),Yn=re(["mi","mo","mn","ms","mtext"]);let tn=P({},Yn);const Zn=re(["annotation-xml"]);let nn=P({},Zn);const po=P({},["title","style","font","a","script"]);let ct=null;const uo=["application/xhtml+xml","text/html"],fo="text/html";let X=null,Qe=null;const mo=t.createElement("form"),Kn=function(i){return i instanceof RegExp||i instanceof Function},sn=function(){let i=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(Qe&&Qe===i)return;(!i||typeof i!="object")&&(i={}),i=le(i),ct=uo.indexOf(i.PARSER_MEDIA_TYPE)===-1?fo:i.PARSER_MEDIA_TYPE,X=ct==="application/xhtml+xml"?ln:gt,Y=Ne(i,"ALLOWED_TAGS",Mn,{transform:X}),Z=Ne(i,"ALLOWED_ATTR",Pn,{transform:X}),en=Ne(i,"ALLOWED_NAMESPACES",co,{transform:ln}),Qt=Ne(i,"ADD_URI_SAFE_ATTR",qn,{transform:X,base:qn}),Gn=Ne(i,"ADD_DATA_URI_TAGS",Vn,{transform:X,base:Vn}),ye=Ne(i,"FORBID_CONTENTS",Xt,{transform:X}),it=Ne(i,"FORBID_TAGS",le({}),{transform:X}),Bn=Ne(i,"FORBID_ATTR",le({}),{transform:X}),Ke=se(i,"USE_PROFILES")?i.USE_PROFILES&&typeof i.USE_PROFILES=="object"?le(i.USE_PROFILES):i.USE_PROFILES:!1,zn=i.ALLOW_ARIA_ATTR!==!1,Wt=i.ALLOW_DATA_ATTR!==!1,Un=i.ALLOW_UNKNOWN_PROTOCOLS||!1,Fn=i.ALLOW_SELF_CLOSE_IN_ATTR!==!1,De=i.SAFE_FOR_TEMPLATES||!1,lt=i.SAFE_FOR_XML!==!1,Fe=i.WHOLE_DOCUMENT||!1,Ze=i.RETURN_DOM||!1,Et=i.RETURN_DOM_FRAGMENT||!1,Tt=i.RETURN_TRUSTED_TYPE||!1,Yt=i.FORCE_BODY||!1,jn=i.SANITIZE_DOM!==!1,Hn=i.SANITIZE_NAMED_PROPS||!1,Zt=i.KEEP_CONTENT!==!1,Kt=i.IN_PLACE||!1,Nn=Xo(i.ALLOWED_URI_REGEXP)?i.ALLOWED_URI_REGEXP:ys,Xe=typeof i.NAMESPACE=="string"?i.NAMESPACE:we,tn=se(i,"MATHML_TEXT_INTEGRATION_POINTS")&&i.MATHML_TEXT_INTEGRATION_POINTS&&typeof i.MATHML_TEXT_INTEGRATION_POINTS=="object"?le(i.MATHML_TEXT_INTEGRATION_POINTS):P({},Yn),nn=se(i,"HTML_INTEGRATION_POINTS")&&i.HTML_INTEGRATION_POINTS&&typeof i.HTML_INTEGRATION_POINTS=="object"?le(i.HTML_INTEGRATION_POINTS):P({},Zn);const d=se(i,"CUSTOM_ELEMENT_HANDLING")&&i.CUSTOM_ELEMENT_HANDLING&&typeof i.CUSTOM_ELEMENT_HANDLING=="object"?le(i.CUSTOM_ELEMENT_HANDLING):tt(null);if(K=tt(null),se(d,"tagNameCheck")&&Kn(d.tagNameCheck)&&(K.tagNameCheck=d.tagNameCheck),se(d,"attributeNameCheck")&&Kn(d.attributeNameCheck)&&(K.attributeNameCheck=d.attributeNameCheck),se(d,"allowCustomizedBuiltInElements")&&typeof d.allowCustomizedBuiltInElements=="boolean"&&(K.allowCustomizedBuiltInElements=d.allowCustomizedBuiltInElements),ae(K),De&&(Wt=!1),Et&&(Ze=!0),Ke&&(Y=P({},gs),Z=tt(null),Ke.html===!0&&(P(Y,hs),P(Z,bs)),Ke.svg===!0&&(P(Y,cn),P(Z,un),P(Z,Rt)),Ke.svgFilters===!0&&(P(Y,dn),P(Z,un),P(Z,Rt)),Ke.mathMl===!0&&(P(Y,pn),P(Z,xs),P(Z,Rt))),Oe.tagCheck=null,Oe.attributeCheck=null,se(i,"ADD_TAGS")&&(typeof i.ADD_TAGS=="function"?Oe.tagCheck=i.ADD_TAGS:Me(i.ADD_TAGS)&&(Y===Mn&&(Y=le(Y)),P(Y,i.ADD_TAGS,X))),se(i,"ADD_ATTR")&&(typeof i.ADD_ATTR=="function"?Oe.attributeCheck=i.ADD_ATTR:Me(i.ADD_ATTR)&&(Z===Pn&&(Z=le(Z)),P(Z,i.ADD_ATTR,X))),se(i,"ADD_URI_SAFE_ATTR")&&Me(i.ADD_URI_SAFE_ATTR)&&P(Qt,i.ADD_URI_SAFE_ATTR,X),se(i,"FORBID_CONTENTS")&&Me(i.FORBID_CONTENTS)&&(ye===Xt&&(ye=le(ye)),P(ye,i.FORBID_CONTENTS,X)),se(i,"ADD_FORBID_CONTENTS")&&Me(i.ADD_FORBID_CONTENTS)&&(ye===Xt&&(ye=le(ye)),P(ye,i.ADD_FORBID_CONTENTS,X)),Zt&&(Y["#text"]=!0),Fe&&P(Y,["html","head","body"]),Y.table&&(P(Y,["tbody"]),delete it.tbody),i.TRUSTED_TYPES_POLICY){if(typeof i.TRUSTED_TYPES_POLICY.createHTML!="function")throw He('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof i.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw He('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');const y=O;O=i.TRUSTED_TYPES_POLICY;try{x=R("")}catch(L){throw O=y,L}}else i.TRUSTED_TYPES_POLICY===null?(O=void 0,x=""):(O===void 0&&(O=H()),O&&typeof x=="string"&&(x=R("")));re&&re(i),Qe=i},Xn=P({},[...cn,...dn,...Qo]),Qn=P({},[...pn,...Jo]),ho=function(i,d,y){return d.namespaceURI===we?i==="svg":d.namespaceURI===St?i==="svg"&&(y==="annotation-xml"||tn[y]):!!Xn[i]},go=function(i,d,y){return d.namespaceURI===we?i==="math":d.namespaceURI===At?i==="math"&&nn[y]:!!Qn[i]},bo=function(i,d,y){return d.namespaceURI===At&&!nn[y]||d.namespaceURI===St&&!tn[y]?!1:!Qn[i]&&(po[i]||!Xn[i])},xo=function(i){let d=S(i);(!d||!d.tagName)&&(d={namespaceURI:Xe,tagName:"template"});const y=gt(i.tagName),L=gt(d.tagName);return en[i.namespaceURI]?i.namespaceURI===At?ho(y,d,L):i.namespaceURI===St?go(y,d,L):i.namespaceURI===we?bo(y,d,L):!!(ct==="application/xhtml+xml"&&en[i.namespaceURI]):!1},$e=function(i){et(e.removed,{element:i});try{S(i).removeChild(i)}catch{if(_(i),!S(i))throw He("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place")}},Jn=function(i){const d=g(i);if(d){const L=[];pt(d,D=>{et(L,D)}),pt(L,D=>{try{_(D)}catch{}})}const y=E(i);if(y)for(let L=y.length-1;L>=0;--L){const D=y[L],B=D&&D.name;if(typeof B=="string")try{i.removeAttribute(B)}catch{}}},je=function(i,d){try{et(e.removed,{attribute:d.getAttributeNode(i),from:d})}catch{et(e.removed,{attribute:null,from:d})}if(d.removeAttribute(i),i==="is")if(Ze||Et)try{$e(d)}catch{}else try{d.setAttribute(i,"")}catch{}},yo=function(i){const d=E(i);if(d)for(let y=d.length-1;y>=0;--y){const L=d[y],D=L&&L.name;if(!(typeof D!="string"||Z[X(D)]))try{i.removeAttribute(D)}catch{}}},wo=function(i){const d=[i];for(;d.length>0;){const y=d.pop();(I?I(y):y.nodeType)===ve.element&&yo(y);const D=g(y);if(D)for(let B=D.length-1;B>=0;--B)d.push(D[B])}},es=function(i){let d=null,y=null;if(Yt)i="<remove></remove>"+i;else{const B=ps(i,/^[\r\n\t ]+/);y=B&&B[0]}ct==="application/xhtml+xml"&&Xe===we&&(i='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+i+"</body></html>");const L=O?R(i):i;if(Xe===we)try{d=new p().parseFromString(L,ct)}catch{}if(!d||!d.documentElement){d=ee.createDocument(Xe,"template",null);try{d.documentElement.innerHTML=Jt?x:L}catch{}}const D=d.body||d.documentElement;return i&&y&&D.insertBefore(t.createTextNode(y),D.childNodes[0]||null),Xe===we?de.call(d,Fe?"html":"body")[0]:Fe?d.documentElement:D},ts=function(i){return z.call(i.ownerDocument||i,i,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},It=function(i){return i=ut(i,pe," "),i=ut(i,ge," "),i=ut(i,Ue," "),i},on=function(i){var d;i.normalize();const y=z.call(i.ownerDocument||i,i,c.SHOW_TEXT|c.SHOW_COMMENT|c.SHOW_CDATA_SECTION|c.SHOW_PROCESSING_INSTRUCTION,null);let L=y.nextNode();for(;L;)L.data=It(L.data),L=y.nextNode();const D=(d=i.querySelectorAll)===null||d===void 0?void 0:d.call(i,"template");D&&pt(D,B=>{Je(B.content)&&on(B.content)})},Lt=function(i){const d=$?$(i):null;return typeof d!="string"||X(d)!=="form"?!1:typeof i.nodeName!="string"||typeof i.textContent!="string"||typeof i.removeChild!="function"||i.attributes!==E(i)||typeof i.removeAttribute!="function"||typeof i.setAttribute!="function"||typeof i.namespaceURI!="string"||typeof i.insertBefore!="function"||typeof i.hasChildNodes!="function"||i.nodeType!==I(i)||i.childNodes!==g(i)},Je=function(i){if(!I||typeof i!="object"||i===null)return!1;try{return I(i)===ve.documentFragment}catch{return!1}},dt=function(i){if(!I||typeof i!="object"||i===null)return!1;try{return typeof I(i)=="number"}catch{return!1}};function Ce(w,i,d){w.length!==0&&pt(w,y=>{y.call(e,i,d,Qe)})}const vo=function(i,d){return!!(lt&&i.hasChildNodes()&&!dt(i.firstElementChild)&&oe(ws,i.textContent)&&oe(ws,i.innerHTML)||lt&&i.namespaceURI===we&&d==="style"&&dt(i.firstElementChild)||i.nodeType===ve.processingInstruction||lt&&i.nodeType===ve.comment&&oe(cr,i.data))},ko=function(i,d){if(!it[d]&&os(d)&&(K.tagNameCheck instanceof RegExp&&oe(K.tagNameCheck,d)||K.tagNameCheck instanceof Function&&K.tagNameCheck(d)))return!1;if(Zt&&!ye[d]){const y=S(i),L=g(i);if(L&&y){const D=L.length;for(let B=D-1;B>=0;--B){const ne=Kt?L[B]:v(L[B],!0);y.insertBefore(ne,k(i))}}}return $e(i),!0},ns=function(i){if(Ce(N.beforeSanitizeElements,i,null),Lt(i))return $e(i),!0;const d=X($?$(i):i.nodeName);if(Ce(N.uponSanitizeElement,i,{tagName:d,allowedTags:Y}),vo(i,d))return $e(i),!0;if(it[d]||!(Oe.tagCheck instanceof Function&&Oe.tagCheck(d))&&!Y[d])return ko(i,d);if((I?I(i):i.nodeType)===ve.element&&!xo(i)||(d==="noscript"||d==="noembed"||d==="noframes")&&oe(dr,i.innerHTML))return $e(i),!0;if(De&&i.nodeType===ve.text){const L=It(i.textContent);i.textContent!==L&&(et(e.removed,{element:i.cloneNode()}),i.textContent=L)}return Ce(N.afterSanitizeElements,i,null),!1},ss=function(i,d,y){if(Bn[d]||jn&&(d==="id"||d==="name")&&(y in t||y in mo))return!1;const L=Z[d]||Oe.attributeCheck instanceof Function&&Oe.attributeCheck(d,i);if(!(Wt&&oe(Ht,d))){if(!(zn&&oe(ao,d))){if(L){if(!Qt[d]){if(!oe(Nn,ut(y,$n,""))){if(!((d==="src"||d==="xlink:href"||d==="href")&&i!=="script"&&us(y,"data:")===0&&Gn[i])){if(!(Un&&!oe(io,ut(y,$n,"")))){if(y)return!1}}}}}else if(!(os(i)&&(K.tagNameCheck instanceof RegExp&&oe(K.tagNameCheck,i)||K.tagNameCheck instanceof Function&&K.tagNameCheck(i))&&(K.attributeNameCheck instanceof RegExp&&oe(K.attributeNameCheck,d)||K.attributeNameCheck instanceof Function&&K.attributeNameCheck(d,i))||d==="is"&&K.allowCustomizedBuiltInElements&&(K.tagNameCheck instanceof RegExp&&oe(K.tagNameCheck,y)||K.tagNameCheck instanceof Function&&K.tagNameCheck(y))))return!1}}return!0},Eo=P({},["annotation-xml","color-profile","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","missing-glyph"]),os=function(i){return!Eo[gt(i)]&&oe(lo,i)},To=function(i,d,y,L){if(O&&typeof m=="object"&&typeof m.getAttributeType=="function"&&!y)switch(m.getAttributeType(i,d)){case"TrustedHTML":return R(L);case"TrustedScriptURL":return V(L)}return L},So=function(i,d,y,L){try{y?i.setAttributeNS(y,d,L):i.setAttribute(d,L),Lt(i)?$e(i):ds(e.removed)}catch{je(d,i)}},rs=function(i){Ce(N.beforeSanitizeAttributes,i,null);const d=i.attributes;if(!d||Lt(i))return;const y={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:Z,forceKeepAttr:void 0};let L=d.length;const D=X(i.nodeName);for(;L--;){const B=d[L],ne=B.name,Q=B.namespaceURI,me=B.value,be=X(ne),an=me;let ie=ne==="value"?an:Go(an);if(y.attrName=be,y.attrValue=ie,y.keepAttr=!0,y.forceKeepAttr=void 0,Ce(N.uponSanitizeAttribute,i,y),ie=y.attrValue,Hn&&(be==="id"||be==="name")&&us(ie,Wn)!==0&&(je(ne,i),ie=Wn+ie),lt&&oe(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i,ie)){je(ne,i);continue}if(be==="attributename"&&ps(ie,"href")){je(ne,i);continue}if(!y.forceKeepAttr){if(!y.keepAttr){je(ne,i);continue}if(!Fn&&oe(pr,ie)){je(ne,i);continue}if(De&&(ie=It(ie)),!ss(D,be,ie)){je(ne,i);continue}ie=To(D,be,Q,ie),ie!==an&&So(i,ne,Q,ie)}}Ce(N.afterSanitizeAttributes,i,null)},Ct=function(i){let d=null;const y=ts(i);for(Ce(N.beforeSanitizeShadowDOM,i,null);d=y.nextNode();)if(Ce(N.uponSanitizeShadowNode,d,null),ns(d),rs(d),Je(d.content)&&Ct(d.content),(I?I(d):d.nodeType)===ve.element){const D=A(d);Je(D)&&(rn(D),Ct(D))}Ce(N.afterSanitizeShadowDOM,i,null)},rn=function(i){const d=[{node:i,shadow:null}];for(;d.length>0;){const y=d.pop();if(y.shadow){Ct(y.shadow);continue}const L=y.node,B=(I?I(L):L.nodeType)===ve.element,ne=g(L);if(ne)for(let Q=ne.length-1;Q>=0;--Q)d.push({node:ne[Q],shadow:null});if(B){const Q=$?$(L):null;if(typeof Q=="string"&&X(Q)==="template"){const me=L.content;Je(me)&&d.push({node:me,shadow:null})}}if(B){const Q=A(L);Je(Q)&&d.push({node:null,shadow:Q},{node:Q,shadow:null})}}};return e.sanitize=function(w){let i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},d=null,y=null,L=null,D=null;if(Jt=!w,Jt&&(w="<!-->"),typeof w!="string"&&!dt(w)&&(w=Ko(w),typeof w!="string"))throw He("dirty is not a string, aborting");if(!e.isSupported)return w;Gt?(Y=Vt,Z=qt):sn(i),(N.uponSanitizeElement.length>0||N.uponSanitizeAttribute.length>0)&&(Y=le(Y)),N.uponSanitizeAttribute.length>0&&(Z=le(Z)),e.removed=[];const B=Kt&&typeof w!="string"&&dt(w);if(B){const me=$?$(w):w.nodeName;if(typeof me=="string"){const be=X(me);if(!Y[be]||it[be])throw He("root node is forbidden and cannot be sanitized in-place")}if(Lt(w))throw He("root node is clobbered and cannot be sanitized in-place");try{rn(w)}catch(be){throw Jn(w),be}}else if(dt(w))d=es("<!---->"),y=d.ownerDocument.importNode(w,!0),y.nodeType===ve.element&&y.nodeName==="BODY"||y.nodeName==="HTML"?d=y:d.appendChild(y),rn(y);else{if(!Ze&&!De&&!Fe&&w.indexOf("<")===-1)return O&&Tt?R(w):w;if(d=es(w),!d)return Ze?null:Tt?x:""}d&&Yt&&$e(d.firstChild);const ne=ts(B?w:d);try{for(;L=ne.nextNode();)ns(L),rs(L),Je(L.content)&&Ct(L.content)}catch(me){throw B&&Jn(w),me}if(B)return pt(e.removed,me=>{me.element&&wo(me.element)}),De&&on(w),w;if(Ze){if(De&&on(d),Et)for(D=q.call(d.ownerDocument);d.firstChild;)D.appendChild(d.firstChild);else D=d;return(Z.shadowroot||Z.shadowrootmode)&&(D=te.call(n,D,!0)),D}let Q=Fe?d.outerHTML:d.innerHTML;return Fe&&Y["!doctype"]&&d.ownerDocument&&d.ownerDocument.doctype&&d.ownerDocument.doctype.name&&oe(ir,d.ownerDocument.doctype.name)&&(Q="<!DOCTYPE "+d.ownerDocument.doctype.name+`>
`+Q),De&&(Q=It(Q)),O&&Tt?R(Q):Q},e.setConfig=function(){let w=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};sn(w),Gt=!0,Vt=Y,qt=Z},e.clearConfig=function(){Qe=null,Gt=!1,Vt=null,qt=null,O=h,x=""},e.isValidAttribute=function(w,i,d){Qe||sn({});const y=X(w),L=X(i);return ss(y,L,d)},e.addHook=function(w,i){typeof i=="function"&&se(N,w)&&et(N[w],i)},e.removeHook=function(w,i){if(se(N,w)){if(i!==void 0){const d=Ho(N[w],i);return d===-1?void 0:Wo(N[w],d,1)[0]}return ds(N[w])}},e.removeHooks=function(w){se(N,w)&&(N[w]=[])},e.removeAllHooks=function(){N=vs()},e}var vn=$s();function In(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}let Ye=In();function Ns(s){Ye=s}const Ms=/[&<>"']/,mr=new RegExp(Ms.source,"g"),Ps=/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,hr=new RegExp(Ps.source,"g"),gr={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},ks=s=>gr[s];function ue(s,e){if(e){if(Ms.test(s))return s.replace(mr,ks)}else if(Ps.test(s))return s.replace(hr,ks);return s}const br=/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;function xr(s){return s.replace(br,(e,t)=>(t=t.toLowerCase(),t==="colon"?":":t.charAt(0)==="#"?t.charAt(1)==="x"?String.fromCharCode(parseInt(t.substring(2),16)):String.fromCharCode(+t.substring(1)):""))}const yr=/(^|[^\[])\^/g;function F(s,e){let t=typeof s=="string"?s:s.source;e=e||"";const n={replace:(o,r)=>{let a=typeof r=="string"?r:r.source;return a=a.replace(yr,"$1"),t=t.replace(o,a),n},getRegex:()=>new RegExp(t,e)};return n}function Es(s){try{s=encodeURI(s).replace(/%25/g,"%")}catch{return null}return s}const xt={exec:()=>null};function Ts(s,e){const t=s.replace(/\|/g,(r,a,l)=>{let c=!1,f=a;for(;--f>=0&&l[f]==="\\";)c=!c;return c?"|":" |"}),n=t.split(/ \|/);let o=0;if(n[0].trim()||n.shift(),n.length>0&&!n[n.length-1].trim()&&n.pop(),e)if(n.length>e)n.splice(e);else for(;n.length<e;)n.push("");for(;o<n.length;o++)n[o]=n[o].trim().replace(/\\\|/g,"|");return n}function Ot(s,e,t){const n=s.length;if(n===0)return"";let o=0;for(;o<n&&s.charAt(n-o-1)===e;)o++;return s.slice(0,n-o)}function wr(s,e){if(s.indexOf(e[1])===-1)return-1;let t=0;for(let n=0;n<s.length;n++)if(s[n]==="\\")n++;else if(s[n]===e[0])t++;else if(s[n]===e[1]&&(t--,t<0))return n;return-1}function Ss(s,e,t,n){const o=e.href,r=e.title?ue(e.title):null,a=s[1].replace(/\\([\[\]])/g,"$1");if(s[0].charAt(0)!=="!"){n.state.inLink=!0;const l={type:"link",raw:t,href:o,title:r,text:a,tokens:n.inlineTokens(a)};return n.state.inLink=!1,l}return{type:"image",raw:t,href:o,title:r,text:ue(a)}}function vr(s,e){const t=s.match(/^(\s+)(?:```)/);if(t===null)return e;const n=t[1];return e.split(`
`).map(o=>{const r=o.match(/^\s+/);if(r===null)return o;const[a]=r;return a.length>=n.length?o.slice(n.length):o}).join(`
`)}class Bt{constructor(e){W(this,"options");W(this,"rules");W(this,"lexer");this.options=e||Ye}space(e){const t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){const t=this.rules.block.code.exec(e);if(t){const n=t[0].replace(/^ {1,4}/gm,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:Ot(n,`
`)}}}fences(e){const t=this.rules.block.fences.exec(e);if(t){const n=t[0],o=vr(n,t[3]||"");return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:o}}}heading(e){const t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(/#$/.test(n)){const o=Ot(n,"#");(this.options.pedantic||!o||/ $/.test(o))&&(n=o.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){const t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:t[0]}}blockquote(e){const t=this.rules.block.blockquote.exec(e);if(t){let n=t[0].replace(/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,`
    $1`);n=Ot(n.replace(/^ *>[ \t]?/gm,""),`
`);const o=this.lexer.state.top;this.lexer.state.top=!0;const r=this.lexer.blockTokens(n);return this.lexer.state.top=o,{type:"blockquote",raw:t[0],tokens:r,text:n}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim();const o=n.length>1,r={type:"list",raw:"",ordered:o,start:o?+n.slice(0,-1):"",loose:!1,items:[]};n=o?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=o?n:"[*+-]");const a=new RegExp(`^( {0,3}${n})((?:[	 ][^\\n]*)?(?:\\n|$))`);let l="",c="",f=!1;for(;e;){let p=!1;if(!(t=a.exec(e))||this.rules.block.hr.test(e))break;l=t[0],e=e.substring(l.length);let m=t[2].split(`
`,1)[0].replace(/^\t+/,S=>" ".repeat(3*S.length)),u=e.split(`
`,1)[0],v=0;this.options.pedantic?(v=2,c=m.trimStart()):(v=t[2].search(/[^ ]/),v=v>4?1:v,c=m.slice(v),v+=t[1].length);let _=!1;if(!m&&/^ *$/.test(u)&&(l+=u+`
`,e=e.substring(u.length+1),p=!0),!p){const S=new RegExp(`^ {0,${Math.min(3,v-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),A=new RegExp(`^ {0,${Math.min(3,v-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),E=new RegExp(`^ {0,${Math.min(3,v-1)}}(?:\`\`\`|~~~)`),I=new RegExp(`^ {0,${Math.min(3,v-1)}}#`);for(;e;){const $=e.split(`
`,1)[0];if(u=$,this.options.pedantic&&(u=u.replace(/^ {1,4}(?=( {4})*[^ ])/g,"  ")),E.test(u)||I.test(u)||S.test(u)||A.test(e))break;if(u.search(/[^ ]/)>=v||!u.trim())c+=`
`+u.slice(v);else{if(_||m.search(/[^ ]/)>=4||E.test(m)||I.test(m)||A.test(m))break;c+=`
`+u}!_&&!u.trim()&&(_=!0),l+=$+`
`,e=e.substring($.length+1),m=u.slice(v)}}r.loose||(f?r.loose=!0:/\n *\n *$/.test(l)&&(f=!0));let k=null,g;this.options.gfm&&(k=/^\[[ xX]\] /.exec(c),k&&(g=k[0]!=="[ ] ",c=c.replace(/^\[[ xX]\] +/,""))),r.items.push({type:"list_item",raw:l,task:!!k,checked:g,loose:!1,text:c,tokens:[]}),r.raw+=l}r.items[r.items.length-1].raw=l.trimEnd(),r.items[r.items.length-1].text=c.trimEnd(),r.raw=r.raw.trimEnd();for(let p=0;p<r.items.length;p++)if(this.lexer.state.top=!1,r.items[p].tokens=this.lexer.blockTokens(r.items[p].text,[]),!r.loose){const m=r.items[p].tokens.filter(v=>v.type==="space"),u=m.length>0&&m.some(v=>/\n.*\n/.test(v.raw));r.loose=u}if(r.loose)for(let p=0;p<r.items.length;p++)r.items[p].loose=!0;return r}}html(e){const t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){const t=this.rules.block.def.exec(e);if(t){const n=t[1].toLowerCase().replace(/\s+/g," "),o=t[2]?t[2].replace(/^<(.*)>$/,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",r=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:o,title:r}}}table(e){const t=this.rules.block.table.exec(e);if(!t||!/[:|]/.test(t[2]))return;const n=Ts(t[1]),o=t[2].replace(/^\||\| *$/g,"").split("|"),r=t[3]&&t[3].trim()?t[3].replace(/\n[ \t]*$/,"").split(`
`):[],a={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===o.length){for(const l of o)/^ *-+: *$/.test(l)?a.align.push("right"):/^ *:-+: *$/.test(l)?a.align.push("center"):/^ *:-+ *$/.test(l)?a.align.push("left"):a.align.push(null);for(const l of n)a.header.push({text:l,tokens:this.lexer.inline(l)});for(const l of r)a.rows.push(Ts(l,a.header.length).map(c=>({text:c,tokens:this.lexer.inline(c)})));return a}}lheading(e){const t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){const t=this.rules.block.paragraph.exec(e);if(t){const n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){const t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){const t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:ue(t[1])}}tag(e){const t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&/^<a /i.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&/^<\/a>/i.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&/^<(pre|code|kbd|script)(\s|>)/i.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&/^<\/(pre|code|kbd|script)(\s|>)/i.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){const t=this.rules.inline.link.exec(e);if(t){const n=t[2].trim();if(!this.options.pedantic&&/^</.test(n)){if(!/>$/.test(n))return;const a=Ot(n.slice(0,-1),"\\");if((n.length-a.length)%2===0)return}else{const a=wr(t[2],"()");if(a>-1){const c=(t[0].indexOf("!")===0?5:4)+t[1].length+a;t[2]=t[2].substring(0,a),t[0]=t[0].substring(0,c).trim(),t[3]=""}}let o=t[2],r="";if(this.options.pedantic){const a=/^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(o);a&&(o=a[1],r=a[3])}else r=t[3]?t[3].slice(1,-1):"";return o=o.trim(),/^</.test(o)&&(this.options.pedantic&&!/>$/.test(n)?o=o.slice(1):o=o.slice(1,-1)),Ss(t,{href:o&&o.replace(this.rules.inline.anyPunctuation,"$1"),title:r&&r.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){const o=(n[2]||n[1]).replace(/\s+/g," "),r=t[o.toLowerCase()];if(!r){const a=n[0].charAt(0);return{type:"text",raw:a,text:a}}return Ss(n,r,n[0],this.lexer)}}emStrong(e,t,n=""){let o=this.rules.inline.emStrongLDelim.exec(e);if(!o||o[3]&&n.match(/[\p{L}\p{N}]/u))return;if(!(o[1]||o[2]||"")||!n||this.rules.inline.punctuation.exec(n)){const a=[...o[0]].length-1;let l,c,f=a,p=0;const m=o[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(m.lastIndex=0,t=t.slice(-1*e.length+a);(o=m.exec(t))!=null;){if(l=o[1]||o[2]||o[3]||o[4]||o[5]||o[6],!l)continue;if(c=[...l].length,o[3]||o[4]){f+=c;continue}else if((o[5]||o[6])&&a%3&&!((a+c)%3)){p+=c;continue}if(f-=c,f>0)continue;c=Math.min(c,c+f+p);const u=[...o[0]][0].length,v=e.slice(0,a+o.index+u+c);if(Math.min(a,c)%2){const k=v.slice(1,-1);return{type:"em",raw:v,text:k,tokens:this.lexer.inlineTokens(k)}}const _=v.slice(2,-2);return{type:"strong",raw:v,text:_,tokens:this.lexer.inlineTokens(_)}}}}codespan(e){const t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(/\n/g," ");const o=/[^ ]/.test(n),r=/^ /.test(n)&&/ $/.test(n);return o&&r&&(n=n.substring(1,n.length-1)),n=ue(n,!0),{type:"codespan",raw:t[0],text:n}}}br(e){const t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){const t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){const t=this.rules.inline.autolink.exec(e);if(t){let n,o;return t[2]==="@"?(n=ue(t[1]),o="mailto:"+n):(n=ue(t[1]),o=n),{type:"link",raw:t[0],text:n,href:o,tokens:[{type:"text",raw:n,text:n}]}}}url(e){var n;let t;if(t=this.rules.inline.url.exec(e)){let o,r;if(t[2]==="@")o=ue(t[0]),r="mailto:"+o;else{let a;do a=t[0],t[0]=((n=this.rules.inline._backpedal.exec(t[0]))==null?void 0:n[0])??"";while(a!==t[0]);o=ue(t[0]),t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:o,href:r,tokens:[{type:"text",raw:o,text:o}]}}}inlineText(e){const t=this.rules.inline.text.exec(e);if(t){let n;return this.lexer.state.inRawBlock?n=t[0]:n=ue(t[0]),{type:"text",raw:t[0],text:n}}}}const kr=/^(?: *(?:\n|$))+/,Er=/^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,Tr=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,vt=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Sr=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Bs=/(?:[*+-]|\d{1,9}[.)])/,zs=F(/^(?!bull |blockCode|fences|blockquote|heading|html)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html))+?)\n {0,3}(=+|-+) *(?:\n+|$)/).replace(/bull/g,Bs).replace(/blockCode/g,/ {4}/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).getRegex(),Ln=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Ar=/^[^\n]+/,Cn=/(?!\s*\])(?:\\.|[^\[\]\\])+/,Ir=F(/^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/).replace("label",Cn).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Lr=F(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Bs).getRegex(),jt="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",_n=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Cr=F("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))","i").replace("comment",_n).replace("tag",jt).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Us=F(Ln).replace("hr",vt).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",jt).getRegex(),_r=F(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Us).getRegex(),Rn={blockquote:_r,code:Er,def:Ir,fences:Tr,heading:Sr,hr:vt,html:Cr,lheading:zs,list:Lr,newline:kr,paragraph:Us,table:xt,text:Ar},As=F("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",vt).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code"," {4}[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",jt).getRegex(),Rr={...Rn,table:As,paragraph:F(Ln).replace("hr",vt).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",As).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",jt).getRegex()},Or={...Rn,html:F(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",_n).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:xt,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:F(Ln).replace("hr",vt).replace("heading",` *#{1,6} *[^
]`).replace("lheading",zs).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Fs=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Dr=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,js=/^( {2,}|\\)\n(?!\s*$)/,$r=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,kt="\\p{P}\\p{S}",Nr=F(/^((?![*_])[\spunctuation])/,"u").replace(/punctuation/g,kt).getRegex(),Mr=/\[[^[\]]*?\]\([^\(\)]*?\)|`[^`]*?`|<[^<>]*?>/g,Pr=F(/^(?:\*+(?:((?!\*)[punct])|[^\s*]))|^_+(?:((?!_)[punct])|([^\s_]))/,"u").replace(/punct/g,kt).getRegex(),Br=F("^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)[punct](\\*+)(?=[\\s]|$)|[^punct\\s](\\*+)(?!\\*)(?=[punct\\s]|$)|(?!\\*)[punct\\s](\\*+)(?=[^punct\\s])|[\\s](\\*+)(?!\\*)(?=[punct])|(?!\\*)[punct](\\*+)(?!\\*)(?=[punct])|[^punct\\s](\\*+)(?=[^punct\\s])","gu").replace(/punct/g,kt).getRegex(),zr=F("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)[punct](_+)(?=[\\s]|$)|[^punct\\s](_+)(?!_)(?=[punct\\s]|$)|(?!_)[punct\\s](_+)(?=[^punct\\s])|[\\s](_+)(?!_)(?=[punct])|(?!_)[punct](_+)(?!_)(?=[punct])","gu").replace(/punct/g,kt).getRegex(),Ur=F(/\\([punct])/,"gu").replace(/punct/g,kt).getRegex(),Fr=F(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),jr=F(_n).replace("(?:-->|$)","-->").getRegex(),Hr=F("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",jr).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),zt=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,Wr=F(/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/).replace("label",zt).replace("href",/<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Hs=F(/^!?\[(label)\]\[(ref)\]/).replace("label",zt).replace("ref",Cn).getRegex(),Ws=F(/^!?\[(ref)\](?:\[\])?/).replace("ref",Cn).getRegex(),Gr=F("reflink|nolink(?!\\()","g").replace("reflink",Hs).replace("nolink",Ws).getRegex(),On={_backpedal:xt,anyPunctuation:Ur,autolink:Fr,blockSkip:Mr,br:js,code:Dr,del:xt,emStrongLDelim:Pr,emStrongRDelimAst:Br,emStrongRDelimUnd:zr,escape:Fs,link:Wr,nolink:Ws,punctuation:Nr,reflink:Hs,reflinkSearch:Gr,tag:Hr,text:$r,url:xt},Vr={...On,link:F(/^!?\[(label)\]\((.*?)\)/).replace("label",zt).getRegex(),reflink:F(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",zt).getRegex()},kn={...On,escape:F(Fs).replace("])","~|])").getRegex(),url:F(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},qr={...kn,br:F(js).replace("{2,}","*").getRegex(),text:F(kn.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Dt={normal:Rn,gfm:Rr,pedantic:Or},mt={normal:On,gfm:kn,breaks:qr,pedantic:Vr};class Ae{constructor(e){W(this,"tokens");W(this,"options");W(this,"state");W(this,"tokenizer");W(this,"inlineQueue");this.tokens=[],this.tokens.links=Object.create(null),this.options=e||Ye,this.options.tokenizer=this.options.tokenizer||new Bt,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const t={block:Dt.normal,inline:mt.normal};this.options.pedantic?(t.block=Dt.pedantic,t.inline=mt.pedantic):this.options.gfm&&(t.block=Dt.gfm,this.options.breaks?t.inline=mt.breaks:t.inline=mt.gfm),this.tokenizer.rules=t}static get rules(){return{block:Dt,inline:mt}}static lex(e,t){return new Ae(t).lex(e)}static lexInline(e,t){return new Ae(t).inlineTokens(e)}lex(e){e=e.replace(/\r\n|\r/g,`
`),this.blockTokens(e,this.tokens);for(let t=0;t<this.inlineQueue.length;t++){const n=this.inlineQueue[t];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,t=[]){this.options.pedantic?e=e.replace(/\t/g,"    ").replace(/^ +$/gm,""):e=e.replace(/^( *)(\t+)/gm,(l,c,f)=>c+"    ".repeat(f.length));let n,o,r,a;for(;e;)if(!(this.options.extensions&&this.options.extensions.block&&this.options.extensions.block.some(l=>(n=l.call({lexer:this},e,t))?(e=e.substring(n.raw.length),t.push(n),!0):!1))){if(n=this.tokenizer.space(e)){e=e.substring(n.raw.length),n.raw.length===1&&t.length>0?t[t.length-1].raw+=`
`:t.push(n);continue}if(n=this.tokenizer.code(e)){e=e.substring(n.raw.length),o=t[t.length-1],o&&(o.type==="paragraph"||o.type==="text")?(o.raw+=`
`+n.raw,o.text+=`
`+n.text,this.inlineQueue[this.inlineQueue.length-1].src=o.text):t.push(n);continue}if(n=this.tokenizer.fences(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.heading(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.hr(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.blockquote(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.list(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.html(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.def(e)){e=e.substring(n.raw.length),o=t[t.length-1],o&&(o.type==="paragraph"||o.type==="text")?(o.raw+=`
`+n.raw,o.text+=`
`+n.raw,this.inlineQueue[this.inlineQueue.length-1].src=o.text):this.tokens.links[n.tag]||(this.tokens.links[n.tag]={href:n.href,title:n.title});continue}if(n=this.tokenizer.table(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.lheading(e)){e=e.substring(n.raw.length),t.push(n);continue}if(r=e,this.options.extensions&&this.options.extensions.startBlock){let l=1/0;const c=e.slice(1);let f;this.options.extensions.startBlock.forEach(p=>{f=p.call({lexer:this},c),typeof f=="number"&&f>=0&&(l=Math.min(l,f))}),l<1/0&&l>=0&&(r=e.substring(0,l+1))}if(this.state.top&&(n=this.tokenizer.paragraph(r))){o=t[t.length-1],a&&o.type==="paragraph"?(o.raw+=`
`+n.raw,o.text+=`
`+n.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=o.text):t.push(n),a=r.length!==e.length,e=e.substring(n.raw.length);continue}if(n=this.tokenizer.text(e)){e=e.substring(n.raw.length),o=t[t.length-1],o&&o.type==="text"?(o.raw+=`
`+n.raw,o.text+=`
`+n.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=o.text):t.push(n);continue}if(e){const l="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(l);break}else throw new Error(l)}}return this.state.top=!0,t}inline(e,t=[]){return this.inlineQueue.push({src:e,tokens:t}),t}inlineTokens(e,t=[]){let n,o,r,a=e,l,c,f;if(this.tokens.links){const p=Object.keys(this.tokens.links);if(p.length>0)for(;(l=this.tokenizer.rules.inline.reflinkSearch.exec(a))!=null;)p.includes(l[0].slice(l[0].lastIndexOf("[")+1,-1))&&(a=a.slice(0,l.index)+"["+"a".repeat(l[0].length-2)+"]"+a.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(l=this.tokenizer.rules.inline.blockSkip.exec(a))!=null;)a=a.slice(0,l.index)+"["+"a".repeat(l[0].length-2)+"]"+a.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);for(;(l=this.tokenizer.rules.inline.anyPunctuation.exec(a))!=null;)a=a.slice(0,l.index)+"++"+a.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;e;)if(c||(f=""),c=!1,!(this.options.extensions&&this.options.extensions.inline&&this.options.extensions.inline.some(p=>(n=p.call({lexer:this},e,t))?(e=e.substring(n.raw.length),t.push(n),!0):!1))){if(n=this.tokenizer.escape(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.tag(e)){e=e.substring(n.raw.length),o=t[t.length-1],o&&n.type==="text"&&o.type==="text"?(o.raw+=n.raw,o.text+=n.text):t.push(n);continue}if(n=this.tokenizer.link(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(n.raw.length),o=t[t.length-1],o&&n.type==="text"&&o.type==="text"?(o.raw+=n.raw,o.text+=n.text):t.push(n);continue}if(n=this.tokenizer.emStrong(e,a,f)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.codespan(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.br(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.del(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.autolink(e)){e=e.substring(n.raw.length),t.push(n);continue}if(!this.state.inLink&&(n=this.tokenizer.url(e))){e=e.substring(n.raw.length),t.push(n);continue}if(r=e,this.options.extensions&&this.options.extensions.startInline){let p=1/0;const m=e.slice(1);let u;this.options.extensions.startInline.forEach(v=>{u=v.call({lexer:this},m),typeof u=="number"&&u>=0&&(p=Math.min(p,u))}),p<1/0&&p>=0&&(r=e.substring(0,p+1))}if(n=this.tokenizer.inlineText(r)){e=e.substring(n.raw.length),n.raw.slice(-1)!=="_"&&(f=n.raw.slice(-1)),c=!0,o=t[t.length-1],o&&o.type==="text"?(o.raw+=n.raw,o.text+=n.text):t.push(n);continue}if(e){const p="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(p);break}else throw new Error(p)}}return t}}class Ut{constructor(e){W(this,"options");this.options=e||Ye}code(e,t,n){var r;const o=(r=(t||"").match(/^\S*/))==null?void 0:r[0];return e=e.replace(/\n$/,"")+`
`,o?'<pre><code class="language-'+ue(o)+'">'+(n?e:ue(e,!0))+`</code></pre>
`:"<pre><code>"+(n?e:ue(e,!0))+`</code></pre>
`}blockquote(e){return`<blockquote>
${e}</blockquote>
`}html(e,t){return e}heading(e,t,n){return`<h${t}>${e}</h${t}>
`}hr(){return`<hr>
`}list(e,t,n){const o=t?"ol":"ul",r=t&&n!==1?' start="'+n+'"':"";return"<"+o+r+`>
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
`}strong(e){return`<strong>${e}</strong>`}em(e){return`<em>${e}</em>`}codespan(e){return`<code>${e}</code>`}br(){return"<br>"}del(e){return`<del>${e}</del>`}link(e,t,n){const o=Es(e);if(o===null)return n;e=o;let r='<a href="'+e+'"';return t&&(r+=' title="'+t+'"'),r+=">"+n+"</a>",r}image(e,t,n){const o=Es(e);if(o===null)return n;e=o;let r=`<img src="${e}" alt="${n}"`;return t&&(r+=` title="${t}"`),r+=">",r}text(e){return e}}class Dn{strong(e){return e}em(e){return e}codespan(e){return e}del(e){return e}html(e){return e}text(e){return e}link(e,t,n){return""+n}image(e,t,n){return""+n}br(){return""}}class Ie{constructor(e){W(this,"options");W(this,"renderer");W(this,"textRenderer");this.options=e||Ye,this.options.renderer=this.options.renderer||new Ut,this.renderer=this.options.renderer,this.renderer.options=this.options,this.textRenderer=new Dn}static parse(e,t){return new Ie(t).parse(e)}static parseInline(e,t){return new Ie(t).parseInline(e)}parse(e,t=!0){let n="";for(let o=0;o<e.length;o++){const r=e[o];if(this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[r.type]){const a=r,l=this.options.extensions.renderers[a.type].call({parser:this},a);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(a.type)){n+=l||"";continue}}switch(r.type){case"space":continue;case"hr":{n+=this.renderer.hr();continue}case"heading":{const a=r;n+=this.renderer.heading(this.parseInline(a.tokens),a.depth,xr(this.parseInline(a.tokens,this.textRenderer)));continue}case"code":{const a=r;n+=this.renderer.code(a.text,a.lang,!!a.escaped);continue}case"table":{const a=r;let l="",c="";for(let p=0;p<a.header.length;p++)c+=this.renderer.tablecell(this.parseInline(a.header[p].tokens),{header:!0,align:a.align[p]});l+=this.renderer.tablerow(c);let f="";for(let p=0;p<a.rows.length;p++){const m=a.rows[p];c="";for(let u=0;u<m.length;u++)c+=this.renderer.tablecell(this.parseInline(m[u].tokens),{header:!1,align:a.align[u]});f+=this.renderer.tablerow(c)}n+=this.renderer.table(l,f);continue}case"blockquote":{const a=r,l=this.parse(a.tokens);n+=this.renderer.blockquote(l);continue}case"list":{const a=r,l=a.ordered,c=a.start,f=a.loose;let p="";for(let m=0;m<a.items.length;m++){const u=a.items[m],v=u.checked,_=u.task;let k="";if(u.task){const g=this.renderer.checkbox(!!v);f?u.tokens.length>0&&u.tokens[0].type==="paragraph"?(u.tokens[0].text=g+" "+u.tokens[0].text,u.tokens[0].tokens&&u.tokens[0].tokens.length>0&&u.tokens[0].tokens[0].type==="text"&&(u.tokens[0].tokens[0].text=g+" "+u.tokens[0].tokens[0].text)):u.tokens.unshift({type:"text",text:g+" "}):k+=g+" "}k+=this.parse(u.tokens,f),p+=this.renderer.listitem(k,_,!!v)}n+=this.renderer.list(p,l,c);continue}case"html":{const a=r;n+=this.renderer.html(a.text,a.block);continue}case"paragraph":{const a=r;n+=this.renderer.paragraph(this.parseInline(a.tokens));continue}case"text":{let a=r,l=a.tokens?this.parseInline(a.tokens):a.text;for(;o+1<e.length&&e[o+1].type==="text";)a=e[++o],l+=`
`+(a.tokens?this.parseInline(a.tokens):a.text);n+=t?this.renderer.paragraph(l):l;continue}default:{const a='Token with "'+r.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return n}parseInline(e,t){t=t||this.renderer;let n="";for(let o=0;o<e.length;o++){const r=e[o];if(this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[r.type]){const a=this.options.extensions.renderers[r.type].call({parser:this},r);if(a!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(r.type)){n+=a||"";continue}}switch(r.type){case"escape":{const a=r;n+=t.text(a.text);break}case"html":{const a=r;n+=t.html(a.text);break}case"link":{const a=r;n+=t.link(a.href,a.title,this.parseInline(a.tokens,t));break}case"image":{const a=r;n+=t.image(a.href,a.title,a.text);break}case"strong":{const a=r;n+=t.strong(this.parseInline(a.tokens,t));break}case"em":{const a=r;n+=t.em(this.parseInline(a.tokens,t));break}case"codespan":{const a=r;n+=t.codespan(a.text);break}case"br":{n+=t.br();break}case"del":{const a=r;n+=t.del(this.parseInline(a.tokens,t));break}case"text":{const a=r;n+=t.text(a.text);break}default:{const a='Token with "'+r.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return n}}class yt{constructor(e){W(this,"options");this.options=e||Ye}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}}W(yt,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens"]));var Ve,En,Gs;class Yr{constructor(...e){is(this,Ve);W(this,"defaults",In());W(this,"options",this.setOptions);W(this,"parse",_t(this,Ve,En).call(this,Ae.lex,Ie.parse));W(this,"parseInline",_t(this,Ve,En).call(this,Ae.lexInline,Ie.parseInline));W(this,"Parser",Ie);W(this,"Renderer",Ut);W(this,"TextRenderer",Dn);W(this,"Lexer",Ae);W(this,"Tokenizer",Bt);W(this,"Hooks",yt);this.use(...e)}walkTokens(e,t){var o,r;let n=[];for(const a of e)switch(n=n.concat(t.call(this,a)),a.type){case"table":{const l=a;for(const c of l.header)n=n.concat(this.walkTokens(c.tokens,t));for(const c of l.rows)for(const f of c)n=n.concat(this.walkTokens(f.tokens,t));break}case"list":{const l=a;n=n.concat(this.walkTokens(l.items,t));break}default:{const l=a;(r=(o=this.defaults.extensions)==null?void 0:o.childTokens)!=null&&r[l.type]?this.defaults.extensions.childTokens[l.type].forEach(c=>{const f=l[c].flat(1/0);n=n.concat(this.walkTokens(f,t))}):l.tokens&&(n=n.concat(this.walkTokens(l.tokens,t)))}}return n}use(...e){const t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{const o={...n};if(o.async=this.defaults.async||o.async||!1,n.extensions&&(n.extensions.forEach(r=>{if(!r.name)throw new Error("extension name required");if("renderer"in r){const a=t.renderers[r.name];a?t.renderers[r.name]=function(...l){let c=r.renderer.apply(this,l);return c===!1&&(c=a.apply(this,l)),c}:t.renderers[r.name]=r.renderer}if("tokenizer"in r){if(!r.level||r.level!=="block"&&r.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");const a=t[r.level];a?a.unshift(r.tokenizer):t[r.level]=[r.tokenizer],r.start&&(r.level==="block"?t.startBlock?t.startBlock.push(r.start):t.startBlock=[r.start]:r.level==="inline"&&(t.startInline?t.startInline.push(r.start):t.startInline=[r.start]))}"childTokens"in r&&r.childTokens&&(t.childTokens[r.name]=r.childTokens)}),o.extensions=t),n.renderer){const r=this.defaults.renderer||new Ut(this.defaults);for(const a in n.renderer){if(!(a in r))throw new Error(`renderer '${a}' does not exist`);if(a==="options")continue;const l=a,c=n.renderer[l],f=r[l];r[l]=(...p)=>{let m=c.apply(r,p);return m===!1&&(m=f.apply(r,p)),m||""}}o.renderer=r}if(n.tokenizer){const r=this.defaults.tokenizer||new Bt(this.defaults);for(const a in n.tokenizer){if(!(a in r))throw new Error(`tokenizer '${a}' does not exist`);if(["options","rules","lexer"].includes(a))continue;const l=a,c=n.tokenizer[l],f=r[l];r[l]=(...p)=>{let m=c.apply(r,p);return m===!1&&(m=f.apply(r,p)),m}}o.tokenizer=r}if(n.hooks){const r=this.defaults.hooks||new yt;for(const a in n.hooks){if(!(a in r))throw new Error(`hook '${a}' does not exist`);if(a==="options")continue;const l=a,c=n.hooks[l],f=r[l];yt.passThroughHooks.has(a)?r[l]=p=>{if(this.defaults.async)return Promise.resolve(c.call(r,p)).then(u=>f.call(r,u));const m=c.call(r,p);return f.call(r,m)}:r[l]=(...p)=>{let m=c.apply(r,p);return m===!1&&(m=f.apply(r,p)),m}}o.hooks=r}if(n.walkTokens){const r=this.defaults.walkTokens,a=n.walkTokens;o.walkTokens=function(l){let c=[];return c.push(a.call(this,l)),r&&(c=c.concat(r.call(this,l))),c}}this.defaults={...this.defaults,...o}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Ae.lex(e,t??this.defaults)}parser(e,t){return Ie.parse(e,t??this.defaults)}}Ve=new WeakSet,En=function(e,t){return(n,o)=>{const r={...o},a={...this.defaults,...r};this.defaults.async===!0&&r.async===!1&&(a.silent||console.warn("marked(): The async option was set to true by an extension. The async: false option sent to parse will be ignored."),a.async=!0);const l=_t(this,Ve,Gs).call(this,!!a.silent,!!a.async);if(typeof n>"u"||n===null)return l(new Error("marked(): input parameter is undefined or null"));if(typeof n!="string")return l(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(n)+", string expected"));if(a.hooks&&(a.hooks.options=a),a.async)return Promise.resolve(a.hooks?a.hooks.preprocess(n):n).then(c=>e(c,a)).then(c=>a.hooks?a.hooks.processAllTokens(c):c).then(c=>a.walkTokens?Promise.all(this.walkTokens(c,a.walkTokens)).then(()=>c):c).then(c=>t(c,a)).then(c=>a.hooks?a.hooks.postprocess(c):c).catch(l);try{a.hooks&&(n=a.hooks.preprocess(n));let c=e(n,a);a.hooks&&(c=a.hooks.processAllTokens(c)),a.walkTokens&&this.walkTokens(c,a.walkTokens);let f=t(c,a);return a.hooks&&(f=a.hooks.postprocess(f)),f}catch(c){return l(c)}}},Gs=function(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){const o="<p>An error occurred:</p><pre>"+ue(n.message+"",!0)+"</pre>";return t?Promise.resolve(o):o}if(t)return Promise.reject(n);throw n}};const Ge=new Yr;function U(s,e){return Ge.parse(s,e)}U.options=U.setOptions=function(s){return Ge.setOptions(s),U.defaults=Ge.defaults,Ns(U.defaults),U};U.getDefaults=In;U.defaults=Ye;U.use=function(...s){return Ge.use(...s),U.defaults=Ge.defaults,Ns(U.defaults),U};U.walkTokens=function(s,e){return Ge.walkTokens(s,e)};U.parseInline=Ge.parseInline;U.Parser=Ie;U.parser=Ie.parse;U.Renderer=Ut;U.TextRenderer=Dn;U.Lexer=Ae;U.lexer=Ae.lex;U.Tokenizer=Bt;U.Hooks=yt;U.parse=U;U.options;U.setOptions;U.use;U.walkTokens;U.parseInline;Ie.parse;Ae.lex;const rt=new U.Renderer,Zr=rt.link.bind(rt);rt.link=(s,e,t)=>Zr(s,e,t).replace("<a ",'<a target="_blank" rel="noopener noreferrer" class="text-teal-400 hover:underline" ');rt.heading=(s,e)=>{const t=s.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");return`<h${e} id="${t}">${s}</h${e}>`};rt.table=(s,e)=>`<div class="overflow-x-auto my-4 max-w-full"><table class="w-full">${s}${e}</table></div>`;U.setOptions({renderer:rt,gfm:!0,breaks:!0});function Vs(){try{return parseInt(localStorage.getItem("secops-sanitize-count")||"0",10)}catch{return 0}}function qs(){try{const s=Vs();localStorage.setItem("secops-sanitize-count",(s+1).toString())}catch{}}function at(s){qs();const e=U.parse(s);return vn.sanitize(e,{ALLOWED_TAGS:["h1","h2","h3","h4","h5","h6","p","br","hr","a","span","ul","ol","li","strong","em","code","pre","blockquote","table","thead","tbody","tr","th","td","div"],ALLOWED_ATTR:["href","target","rel","class","id","align"]})}function $t(s){return s.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F\u200B-\u200D\uFEFF\u202A-\u202E]/g,"")}function M(s){return s.replace(/[&<>"']/g,e=>{switch(e){case"&":return"&amp;";case"<":return"&lt;";case">":return"&gt;";case'"':return"&quot;";case"'":return"&#039;";default:return e}})}function Kr(s){if(qs(),typeof s!="object"||s===null)throw new Error("Invalid backup structure: Root must be an object.");const{slug:e,title:t,content:n,updatedAt:o,tags:r}=s;if(typeof e!="string"||!/^[a-z0-9-_]+$/.test(e))throw new Error("Invalid slug format: Slugs must contain only lowercase alphanumeric characters, hyphens, and underscores.");const a=$t(e);if(typeof t!="string"||t.trim().length===0||t.length>100)throw new Error("Invalid title format: Must be a non-empty string under 100 characters.");const l=$t(t);if(typeof n!="string"||n.length>5e4)throw new Error("Invalid content format: Must be a string under 50,000 characters.");if(typeof o!="number"||isNaN(o))throw new Error("Invalid updated timestamp format.");if(!Array.isArray(r))throw new Error("Tags must be an array of strings.");const c=r.map(f=>{if(typeof f!="string")throw new Error("Tags must be strings.");return $t(vn.sanitize(f)).slice(0,30)});return{slug:a,title:vn.sanitize(l),content:n,updatedAt:o,tags:c,isSystem:!!s.isSystem}}async function Ys(s){const e=new TextEncoder,t=e.encode("secops-intel-salt-2026"),n=await window.crypto.subtle.importKey("raw",e.encode(s),{name:"PBKDF2"},!1,["deriveKey"]);return window.crypto.subtle.deriveKey({name:"PBKDF2",salt:t,iterations:1e5,hash:"SHA-256"},n,{name:"AES-GCM",length:256},!1,["encrypt","decrypt"])}async function Zs(s,e){const t=new TextEncoder,n=window.crypto.getRandomValues(new Uint8Array(12)),o=await window.crypto.subtle.encrypt({name:"AES-GCM",iv:n},e,t.encode(s)),r=Array.from(n).map(f=>f.toString(16).padStart(2,"0")).join(""),a=new Uint8Array(o);let l="";for(let f=0;f<a.byteLength;f++)l+=String.fromCharCode(a[f]);const c=btoa(l);return`${r}:${c}`}async function Re(s,e){const t=s.split(":");if(t.length!==2)throw new Error("Invalid cipher format");const[n,o]=t,r=new Uint8Array(n.match(/.{1,2}/g).map(f=>parseInt(f,16))),a=atob(o),l=new Uint8Array(a.length);for(let f=0;f<a.length;f++)l[f]=a.charCodeAt(f);const c=await window.crypto.subtle.decrypt({name:"AES-GCM",iv:r},e,l);return new TextDecoder().decode(c)}let ce="home",st=!1,Ee=!1,We="",ht="",fe=[],bt=null,Ks=navigator.onLine?"SECURE_LINK":"OFFLINE_CACHE",ot=localStorage.getItem("secops-wiki-theme")||"dark",G=null,fn=!1,he=0,Nt=!1,Mt=-1,Tn="";function Xs(){const s=document.documentElement,e=document.getElementById("theme-icon-path");ot==="light"?(s.classList.add("light-theme"),e&&e.setAttribute("d","M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z")):(s.classList.remove("light-theme"),e&&e.setAttribute("d","M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z"))}function Qs(){ot=ot==="dark"?"light":"dark",localStorage.setItem("secops-wiki-theme",ot),Xs()}function Xr(s,e){if(!e||e.trim().length===0)return s;const t=e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"),n=new RegExp(`(?![^<>]*>)(${t})`,"gi");return s.replace(n,'<mark class="bg-teal-500/30 text-teal-300 px-0.5 rounded font-medium">$1</mark>')}function Qr(s){const e=s.toLowerCase().trim();return/(sec|security|critical|panic|destruct|lock|key|auth)/.test(e)?{bg:"rgba(239, 68, 68, 0.15)",text:"#f87171",border:"rgba(239, 68, 68, 0.3)",className:"tag-color-red"}:/(doc|manual|wiki|guide|system|dashboard|home)/.test(e)?{bg:"rgba(20, 184, 166, 0.15)",text:"#2dd4bf",border:"rgba(20, 184, 166, 0.3)",className:"tag-color-teal"}:/(config|settings|sys|admin|db|telemetry)/.test(e)?{bg:"rgba(59, 130, 246, 0.15)",text:"#60a5fa",border:"rgba(59, 130, 246, 0.3)",className:"tag-color-blue"}:/(warning|caution|issue|bug|fix)/.test(e)?{bg:"rgba(245, 158, 11, 0.15)",text:"#fbbf24",border:"rgba(245, 158, 11, 0.3)",className:"tag-color-amber"}:{bg:"rgba(148, 163, 184, 0.15)",text:"#cbd5e1",border:"rgba(148, 163, 184, 0.3)",className:"tag-color-slate"}}function Js(s,e){const t=e.toLowerCase().trim();if(!t)return 0;let n=0;const o=s.title.toLowerCase(),r=s.content.toLowerCase(),a=s.tags.map(l=>l.toLowerCase());if(o===t?n+=100:o.startsWith(t)?n+=80:o.includes(t)&&(n+=50),a.forEach(l=>{l===t?n+=30:l.includes(t)&&(n+=15)}),r.includes(t)){n+=10;const l=r.split(t).length-1;n+=Math.min(10,l)}return n}function Is(s){const e=new Uint32Array(256);for(let n=0;n<256;n++){let o=n;for(let r=0;r<8;r++)o=o&1?3988292384^o>>>1:o>>>1;e[n]=o}let t=4294967295;for(let n=0;n<s.length;n++)t=e[(t^s[n])&255]^t>>>8;return(t^4294967295)>>>0}function eo(s){const e=new TextEncoder,t=[],n=[];let o=0;s.forEach(f=>{n.push(o);const p=e.encode(f.name),m=e.encode(f.content),u=Is(m),v=new ArrayBuffer(30),_=new DataView(v);_.setUint32(0,67324752,!0),_.setUint16(4,10,!0),_.setUint16(6,0,!0),_.setUint16(8,0,!0),_.setUint16(10,0,!0),_.setUint16(12,0,!0),_.setUint32(14,u,!0),_.setUint32(18,m.length,!0),_.setUint32(22,m.length,!0),_.setUint16(26,p.length,!0),_.setUint16(28,0,!0);const k=new Uint8Array(v);t.push(k),t.push(p),t.push(m),o+=k.length+p.length+m.length});const r=o;let a=0;s.forEach((f,p)=>{const m=e.encode(f.name),u=e.encode(f.content),v=Is(u),_=n[p],k=new ArrayBuffer(46),g=new DataView(k);g.setUint32(0,33639248,!0),g.setUint16(4,20,!0),g.setUint16(6,10,!0),g.setUint16(8,0,!0),g.setUint16(10,0,!0),g.setUint16(12,0,!0),g.setUint16(14,0,!0),g.setUint32(16,v,!0),g.setUint32(20,u.length,!0),g.setUint32(24,u.length,!0),g.setUint16(28,m.length,!0),g.setUint16(30,0,!0),g.setUint16(32,0,!0),g.setUint16(34,0,!0),g.setUint16(36,0,!0),g.setUint32(38,32,!0),g.setUint32(42,_,!0);const S=new Uint8Array(k);t.push(S),t.push(m),a+=S.length+m.length,o+=S.length+m.length});const l=new ArrayBuffer(22),c=new DataView(l);return c.setUint32(0,101010256,!0),c.setUint16(4,0,!0),c.setUint16(6,0,!0),c.setUint16(8,s.length,!0),c.setUint16(10,s.length,!0),c.setUint32(12,a,!0),c.setUint32(16,r,!0),c.setUint16(20,0,!0),t.push(new Uint8Array(l)),new Blob(t,{type:"application/zip"})}const Te=new BroadcastChannel("wiki-db-sync");Te.onmessage=async s=>{s.data==="refresh"&&(await xe(),await Se())};let mn=null;const Jr=15*60*1e3;let to;async function ea(){Xs(),to=document.getElementById("app"),await Rs(),oa(),await xe(),sa(),pa(),window.addEventListener("hashchange",_s),window.addEventListener("online",Cs),window.addEventListener("offline",Cs),window.addEventListener("beforeinstallprompt",s=>{s.preventDefault(),bt=s;const e=document.getElementById("pwa-install-btn");e&&e.classList.remove("hidden")}),window.addEventListener("keydown",s=>{var e,t;(s.ctrlKey&&s.key==="k"||s.ctrlKey&&s.key==="K")&&(s.preventDefault(),wt()),s.key==="/"&&((e=document.activeElement)==null?void 0:e.tagName)!=="INPUT"&&((t=document.activeElement)==null?void 0:t.tagName)!=="TEXTAREA"&&(s.preventDefault(),wt())}),_s()}function nt(){mn&&clearTimeout(mn),mn=setTimeout(ta,Jr)}function ta(){const s=document.getElementById("idle-lock-screen");s&&s.classList.remove("hidden")}function na(){const s=document.getElementById("idle-lock-screen");s&&s.classList.add("hidden"),nt()}function sa(){const s=document.createElement("div");s.id="idle-lock-screen",s.className="fixed inset-0 bg-[#090d16]/95 backdrop-blur-md z-50 flex flex-col items-center justify-center hidden",s.innerHTML=`
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
  `,document.body.appendChild(s),nt(),window.addEventListener("mousemove",nt),window.addEventListener("keydown",nt),window.addEventListener("click",nt),window.addEventListener("scroll",nt),document.addEventListener("click",e=>{e.target.closest("#idle-unlock-btn")&&na()})}function Ls(){if(document.getElementById("pwa-update-toast"))return;const s=document.createElement("div");s.id="pwa-update-toast",s.className="fixed bottom-4 right-4 z-50 max-w-sm glass-panel border border-teal-500/30 p-4 rounded-xl shadow-2xl glow-border flex items-center justify-between gap-4 font-mono text-xs select-none",s.innerHTML=`
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
  `,document.body.appendChild(s);const e=document.getElementById("pwa-update-reload-btn");e&&e.addEventListener("click",()=>{window.location.reload()})}function oa(){"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/wiki/sw.js").then(s=>{console.log("ServiceWorker registered successfully with scope: ",s.scope),s.waiting&&Ls(),s.addEventListener("updatefound",()=>{const e=s.installing;e&&e.addEventListener("statechange",()=>{e.state==="installed"&&navigator.serviceWorker.controller&&Ls()})})}).catch(s=>{console.error("ServiceWorker registration failed: ",s)})})}function Cs(){Ks=navigator.onLine?"SECURE_LINK":"OFFLINE_CACHE";const s=document.getElementById("system-status-indicator"),e=document.getElementById("system-status-label");s&&e&&(navigator.onLine?(s.className="w-2 h-2 rounded-full bg-emerald-400 glow-text-emerald pulse-indicator",e.innerText="SECURE_LINK",e.className="text-xs text-emerald-400 font-mono tracking-wider"):(s.className="w-2 h-2 rounded-full bg-amber-500 pulse-indicator",e.innerText="OFFLINE_CACHE",e.className="text-xs text-amber-500 font-mono tracking-wider"))}async function xe(){fe=await Sn()}async function _s(){const s=window.location.hash||"#/page/home";st=!1,Ee=!1;let e="";if(s.startsWith("#/page/")){const n=s.replace("#/page/","").split("#");ce=n[0],n.length>1&&(e=n[1])}else s.startsWith("#/edit/")?(ce=s.replace("#/edit/",""),st=!0):s==="#/new"?(st=!0,Ee=!0,ce=""):s==="#/system"?ce="system":s==="#/graph"?ce="graph":ce="home";await Se(),e&&setTimeout(()=>{const t=document.getElementById(e);t&&t.scrollIntoView({behavior:"smooth"})},50)}function ra(s){const e=s.filter(r=>r.isSystem),t=s.filter(r=>!r.isSystem&&r.isEncrypted),n=s.filter(r=>!r.isSystem&&!r.isEncrypted);let o="";return e.length>0&&(o+=`
      <div class="mb-4">
        <div class="px-3 mb-1.5 text-[9px] font-bold text-slate-500 uppercase tracking-widest font-mono flex items-center gap-1 select-none">
          ⚙️ SYSTEM PROCEDURES
        </div>
        <div class="space-y-0.5">
          ${e.map(r=>hn(r)).join("")}
        </div>
      </div>
    `),t.length>0&&(o+=`
      <div class="mb-4">
        <div class="px-3 mb-1.5 text-[9px] font-bold text-red-400/80 uppercase tracking-widest font-mono flex items-center gap-1 select-none">
          🔒 SECURE CORES
        </div>
        <div class="space-y-0.5">
          ${t.map(r=>hn(r)).join("")}
        </div>
      </div>
    `),n.length>0&&(o+=`
      <div class="mb-4">
        <div class="px-3 mb-1.5 text-[9px] font-bold text-teal-400/80 uppercase tracking-widest font-mono flex items-center gap-1 select-none">
          📄 OPERATIONAL INTEL
        </div>
        <div class="space-y-0.5">
          ${n.map(r=>hn(r)).join("")}
        </div>
      </div>
    `),o}function hn(s){const e=ce===s.slug&&!st;return`
    <a href="#/page/${s.slug}" class="flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-mono transition group ${e?"bg-teal-950/30 text-teal-400 font-bold border-l-2 border-teal-500":"text-slate-450 hover:bg-slate-900/40 hover:text-slate-200"}">
      <span class="truncate flex items-center gap-1.5">
        ${s.isEncrypted?'<span class="text-red-450 text-[9px]">🔒</span>':'<span class="text-slate-650 group-hover:text-slate-500 text-[9px]">⊙</span>'}
        ${M(s.title)}
      </span>
    </a>
  `}async function Se(){await xe();let s=fe;We.trim().length>0&&(s=s.map(u=>({page:u,score:Js(u,We)})).filter(u=>u.score>0).sort((u,v)=>v.score-u.score).map(u=>u.page)),ht&&(s=s.filter(u=>u.tags.includes(ht)));const e=Array.from(new Set(fe.flatMap(u=>u.tags)));to.innerHTML=`
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
            <span id="system-status-label" class="text-xs ${navigator.onLine?"text-emerald-400":"text-amber-500"} font-mono tracking-wider">${Ks}</span>
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
            <button class="tag-badge px-1.5 py-0.5 text-[9px] rounded-full font-mono transition ${ht?"bg-slate-900 text-slate-400 hover:bg-slate-850":"bg-teal-500 text-slate-950 font-bold shadow-[0_0_8px_rgba(20,184,166,0.3)]"}" data-tag="">#ALL</button>
            ${e.map(u=>{const v=Qr(u);return`
                <button class="tag-badge px-1.5 py-0.5 text-[9px] rounded-full font-mono transition ${ht===u?"bg-teal-500 text-slate-950 font-bold shadow-[0_0_8px_rgba(20,184,166,0.3)]":`${v.className} hover:opacity-85`}" data-tag="${M(u)}">#${M(u.toUpperCase())}</button>
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
            ${ra(s)}
            ${s.length===0?`
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
  `,document.getElementById("wiki-search-input").addEventListener("input",u=>{We=u.target.value;const v=fe.filter(k=>k.title.toLowerCase().includes(We.toLowerCase())||k.content.toLowerCase().includes(We.toLowerCase())||k.tags.some(g=>g.toLowerCase().includes(We.toLowerCase()))),_=document.getElementById("pages-list");_.innerHTML=v.map(k=>`
      <a href="#/page/${k.slug}" class="flex items-center justify-between px-3 py-2 rounded-lg text-sm transition group ${ce===k.slug&&!st?"bg-teal-950/30 text-teal-400 font-medium border-l-2 border-teal-500":"text-slate-400 hover:bg-slate-900/50 hover:text-slate-200"}">
        <span class="truncate font-mono">${M(k.title)}</span>
        ${k.isSystem?`
          <span class="text-[9px] bg-slate-800 text-slate-400 px-1 py-0.5 rounded font-mono uppercase scale-90">SYS</span>
        `:""}
      </a>
    `).join("")});const n=document.getElementById("pwa-install-btn");n&&n.addEventListener("click",async()=>{if(bt){bt.prompt();const{outcome:u}=await bt.userChoice;u==="accepted"&&console.log("User accepted the PWA install prompt"),bt=null,n.classList.add("hidden")}});const o=document.getElementById("system-panic-btn");o&&o.addEventListener("click",async()=>{if(confirm("CRITICAL SYSTEM COMPROMISE PROTOCOL: Purge entire local database, clear all service worker caches, unregister service workers, and force self-destruct reload immediately?")){if(indexedDB.deleteDatabase("secops-wiki-db"),"caches"in window){const u=await caches.keys();await Promise.all(u.map(v=>caches.delete(v)))}if("serviceWorker"in navigator){const u=await navigator.serviceWorker.getRegistrations();await Promise.all(u.map(v=>v.unregister()))}window.location.href="/wiki/"}});const r=document.getElementById("sidebar-toggle-btn"),a=document.getElementById("sidebar-close-btn"),l=document.getElementById("sidebar-backdrop"),c=()=>{const u=document.getElementById("sidebar"),v=document.getElementById("sidebar-backdrop");u&&v&&(u.classList.add("-translate-x-full"),v.classList.add("hidden"))},f=()=>{const u=document.getElementById("sidebar"),v=document.getElementById("sidebar-backdrop");u&&v&&(u.classList.remove("-translate-x-full"),v.classList.remove("hidden"))};r&&r.addEventListener("click",f),a&&a.addEventListener("click",c),l&&l.addEventListener("click",c),document.querySelectorAll("#sidebar a").forEach(u=>{u.addEventListener("click",()=>{window.innerWidth<768&&c()})});const m=document.getElementById("theme-toggle-btn");m&&m.addEventListener("click",Qs),document.querySelectorAll(".tag-badge").forEach(u=>{u.addEventListener("click",async v=>{ht=v.currentTarget.getAttribute("data-tag")||"",await Se()})}),await aa()}async function aa(){const s=document.getElementById("main-content");if(ce==="graph"){await ya(s);return}if(ce==="system"){da(s);return}if(st){await so(s);return}await no(s)}async function no(s){const e=await Be(ce);if(!e){s.innerHTML=`
      <div class="text-center py-20 bg-slate-950/40 border border-red-950/20 rounded-xl px-6 glow-border">
        <svg class="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
        </svg>
        <h2 class="text-2xl font-bold font-mono text-white mb-2 uppercase">DATA_MISSING</h2>
        <p class="text-slate-400 text-sm max-w-md mx-auto mb-6">Requested intel document slug "${M(ce)}" is not registered in index database.</p>
        <a href="#/new" class="px-4 py-2 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 font-mono text-xs uppercase rounded transition hover:text-white">
          Create New Document
        </a>
      </div>
    `;return}const t=await Oo(e.slug);let n=e.content,o=!1;if(e.isEncrypted)if(G)try{n=await Re(e.content,G)}catch{o=!0}else o=!0;if(o){s.innerHTML=`
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
    `,document.getElementById("decrypt-doc-form").addEventListener("submit",async S=>{S.preventDefault();const A=document.getElementById("decrypt-password-input").value;try{const E=await Ys(A);await Re(e.content,E),G=E,await Se()}catch{alert("Security Alert: Authentication failed. Invalid security passphrase.")}});return}const r=n.split(/\s+/).filter(g=>g.length>0).length,a=Math.max(1,Math.round(r/200)),l=at(n),c=Xr(l,We),f=new Date(e.updatedAt).toLocaleString(),p=document.createElement("div");p.innerHTML=l;const m=p.querySelectorAll("h1, h2, h3");let u="";m.length>0&&(u=`
      <div class="hidden lg:block w-60 shrink-0 self-start sticky top-8">
        <div class="glass-panel border border-slate-800/80 rounded-xl p-4">
          <h4 class="text-xs font-bold font-mono text-slate-400 uppercase tracking-widest border-b border-slate-800/60 pb-2 mb-3">Outline</h4>
          <nav class="space-y-2 text-xs font-mono max-h-[350px] overflow-y-auto pr-1">
            ${Array.from(m).map(g=>{const S=g.textContent||"",A=g.id||S.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,""),E=g.tagName.toLowerCase(),I=E==="h1"?"pl-0 font-semibold":E==="h2"?"pl-3 border-l border-slate-800":"pl-6 border-l border-slate-800";return`
                <a href="#/page/${e.slug}#${A}" class="block text-slate-500 hover:text-teal-400 transition truncate ${I}" title="${M(S)}">
                  ${M(S)}
                </a>
              `}).join("")}
          </nav>
        </div>
      </div>
    `),s.innerHTML=`
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
              <span class="text-xs font-mono text-slate-500 uppercase">UPDATED: ${f}</span>
              <span class="h-3 w-px bg-slate-800"></span>
              <span class="text-xs font-mono text-teal-400 uppercase">⏱️ ${a} MIN READ</span>
              ${e.tags.map(g=>`
                <span class="text-[10px] font-mono bg-teal-950/20 text-teal-400 px-2 py-0.5 rounded border border-teal-900/30">#${M(g)}</span>
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
              ${t.map((g,S)=>`
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-3 first:pt-0">
                  <div class="min-w-0">
                    <p class="text-xs font-mono text-slate-300 break-words">REV_${t.length-S} // ${M(g.title)}</p>
                    <p class="text-[10px] font-mono text-slate-500">${new Date(g.updatedAt).toLocaleString()}</p>
                  </div>
                  <button class="restore-rev-btn px-2.5 py-1 bg-slate-900 border border-slate-800 hover:border-slate-700 text-teal-400 hover:text-teal-300 font-mono text-[10px] rounded transition uppercase shrink-0 self-start sm:self-auto" data-rev-id="${M(g.id)}">
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
  `;const v=document.getElementById("page-export-dropdown-btn"),_=document.getElementById("page-export-menu");v&&_&&(v.addEventListener("click",E=>{E.stopPropagation(),_.classList.toggle("hidden")}),document.addEventListener("click",()=>{_.classList.add("hidden")}),document.getElementById("export-single-md").addEventListener("click",async()=>{let E=e.content;if(e.isEncrypted&&G)try{E=await Re(e.content,G)}catch{}const I=`---
title: ${e.title}
slug: ${e.slug}
tags: ${e.tags.join(", ")}
updated: ${new Date(e.updatedAt).toISOString()}
encrypted: ${!!e.isEncrypted}
---

`,$=new Blob([I+E],{type:"text/markdown;charset=utf-8;"}),O=URL.createObjectURL($),x=document.createElement("a");x.href=O,x.download=`${e.slug}.md`,document.body.appendChild(x),x.click(),document.body.removeChild(x),URL.revokeObjectURL(O)}),document.getElementById("export-single-html").addEventListener("click",async()=>{let E=e.content;if(e.isEncrypted&&G)try{E=await Re(e.content,G)}catch{}const I=at(E),$=`<!DOCTYPE html>
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
    Tags: ${e.tags.map(b=>`<span class="badge">#${M(b)}</span>`).join("")}
  </div>
  <article>
    ${I}
  </article>
</body>
</html>`,O=new Blob([$],{type:"text/html;charset=utf-8;"}),x=URL.createObjectURL(O),h=document.createElement("a");h.href=x,h.download=`${e.slug}.html`,document.body.appendChild(h),h.click(),document.body.removeChild(h),URL.revokeObjectURL(x)}),document.getElementById("export-single-print").addEventListener("click",()=>{window.print()}));const k=document.getElementById("delete-page-btn");k&&k.addEventListener("click",async()=>{confirm(`CRITICAL SYSTEM NOTICE: Confirm total purge of intel document "${e.title}"? This action is irreversible.`)&&(await Ro(e.slug),Te.postMessage("refresh"),window.location.hash="#/page/home")}),s.querySelectorAll("pre").forEach(g=>{const S=document.createElement("div");S.className="relative group",g.parentNode.insertBefore(S,g),S.appendChild(g);const A=document.createElement("button");A.className="absolute top-2 right-2 px-2 py-1 bg-slate-900/80 hover:bg-slate-800 text-[10px] text-slate-400 hover:text-white font-mono rounded opacity-0 group-hover:opacity-100 transition focus:opacity-100 border border-slate-800 focus:outline-none",A.textContent="COPY",A.addEventListener("click",()=>{var I;const E=((I=g.querySelector("code"))==null?void 0:I.textContent)||g.textContent||"";navigator.clipboard.writeText(E).then(()=>{A.textContent="COPIED",setTimeout(()=>A.textContent="COPY",2e3)})}),S.appendChild(A)}),s.querySelectorAll(".restore-rev-btn").forEach(g=>{g.addEventListener("click",async S=>{const A=S.currentTarget.getAttribute("data-rev-id"),E=t.find(I=>I.id===A);if(E&&confirm(`ROLLBACK COMMAND: Revert current page content to revision state "${E.title}" saved on ${new Date(E.updatedAt).toLocaleString()}?`)){const I=await Be(e.slug);I&&await An({id:`${I.slug}-${Date.now()}`,slug:I.slug,title:I.title,content:I.content,updatedAt:Date.now()}),await Pe({slug:E.slug,title:E.title,content:E.content,updatedAt:Date.now(),tags:e.tags,isSystem:e.isSystem}),alert("Revision successfully restored."),await xe(),await Se()}})}),s.querySelectorAll('.wiki-content input[type="checkbox"]').forEach((g,S)=>{const A=g;A.removeAttribute("disabled"),A.classList.add("cursor-pointer","accent-teal-500"),A.addEventListener("change",async E=>{const I=E.target;await xa(e.slug,S,I.checked)})})}async function so(s){let e="",t="",n="",o="",r=!1,a=!1;if(!Ee){const x=await Be(ce);if(x&&(e=x.title,t=x.slug,n=x.content,o=x.tags.join(", "),r=!!x.isSystem,a=!!x.isEncrypted,x.isEncrypted))if(G)try{n=await Re(x.content,G)}catch{n="ERROR: Decryption key mismatch. Please go back and re-decrypt."}else n="ERROR: This page is encrypted. Decrypt it in the reader view first."}const l=`secops-wiki-draft-${Ee?"new":ce}`;let c="";const f=localStorage.getItem(l);if(f)try{const x=JSON.parse(f);e=x.title||e,n=x.content||n,o=x.tags||o,c=`
        <div id="draft-restore-banner" class="bg-teal-950/40 border border-teal-800 text-teal-400 p-3 rounded-lg text-xs font-mono mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <span>RESTORED DRAFT: Unsaved changes restored (${new Date(x.updatedAt).toLocaleTimeString()})</span>
          <button type="button" id="discard-draft-btn" class="underline hover:text-teal-300 font-bold shrink-0">DISCARD</button>
        </div>
      `}catch{}s.innerHTML=`
    <div class="glass-panel border border-slate-800 rounded-xl p-4 md:p-6 glow-border">
      <div class="border-b border-slate-800 pb-4 mb-6">
        <h2 class="text-xl font-bold font-mono text-white uppercase">${Ee?"Establish New Intel Entry":"Update Intel Entry"}</h2>
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
            <input type="text" id="edit-slug" value="${M(t)}" ${Ee?"":"disabled"} required pattern="^[a-z0-9-_]+$" placeholder="e.g. operational-manual" class="w-full bg-slate-950/80 border border-slate-800 focus:border-teal-500/50 rounded-lg p-2.5 text-base md:text-sm text-slate-200 focus:outline-none transition font-mono disabled:opacity-40 disabled:cursor-not-allowed">
            ${Ee?'<p class="text-[10px] text-slate-500 mt-1 font-mono">Only lowercase letters, numbers, hyphens, and underscores are allowed.</p>':""}
          </div>
        </div>

        <!-- Tags Input -->
        <div>
          <label class="block text-xs font-semibold text-slate-400 uppercase tracking-widest font-mono mb-2">Associated Tags</label>
          <input type="text" id="edit-tags" value="${M(o)}" placeholder="e.g. system, security, quickstart" class="w-full bg-slate-950/80 border border-slate-800 focus:border-teal-500/50 rounded-lg p-2.5 text-base md:text-sm text-slate-200 focus:outline-none transition font-mono">
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
            <a href="${Ee?"#/page/home":`#/page/${ce}`}" id="cancel-edit-btn" class="px-4 py-2 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 font-mono text-xs uppercase rounded transition hover:text-white">
              Cancel
            </a>
            <button type="submit" class="px-4 py-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-mono text-xs uppercase rounded font-bold transition shadow-[0_0_10px_rgba(20,184,166,0.15)]">
              Commit Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  `;const p=document.getElementById("edit-page-form"),m=document.getElementById("edit-content"),u=document.getElementById("live-preview-box"),v=document.getElementById("cancel-edit-btn"),_=document.getElementById("discard-draft-btn"),k=document.getElementById("edit-tab-write"),g=document.getElementById("edit-tab-preview"),S=document.getElementById("edit-content-container"),A=document.getElementById("live-preview-container");k&&g&&S&&A&&(k.addEventListener("click",()=>{k.className="flex-1 py-2 text-center text-xs font-mono font-bold border-b-2 border-teal-500 text-teal-400",g.className="flex-1 py-2 text-center text-xs font-mono font-bold border-b-2 border-transparent text-slate-500",S.className="block",A.className="hidden md:block"}),g.addEventListener("click",()=>{g.className="flex-1 py-2 text-center text-xs font-mono font-bold border-b-2 border-teal-500 text-teal-400",k.className="flex-1 py-2 text-center text-xs font-mono font-bold border-b-2 border-transparent text-slate-500",A.className="block",S.className="hidden md:block"}));const E=()=>{const x=m.value;if(x.trim().length===0){u.innerHTML='<span class="text-slate-600 font-mono text-xs">No input content.</span>';return}u.innerHTML=at(x)},I=x=>{const h=m.selectionStart,b=m.selectionEnd,T=m.value,C=T.substring(h,b);let R="";switch(x){case"bold":R=`**${C||"bold_text"}**`;break;case"italic":R=`*${C||"italic_text"}*`;break;case"header":R=`
### ${C||"Header text"}
`;break;case"code":R=`
\`\`\`javascript
${C||"// code here"}
\`\`\`
`;break;case"link":R=`[${C||"Link text"}](url)`;break;case"table":R=`
| Header 1 | Header 2 |
| -------- | -------- |
| Cell 1   | Cell 2   |
`;break;case"checklist":R=`
- [ ] ${C||"Task description"}
`;break}m.value=T.substring(0,h)+R+T.substring(b),m.focus(),m.selectionStart=h+R.length,m.selectionEnd=h+R.length,E()};s.querySelectorAll(".format-btn").forEach(x=>{x.addEventListener("click",h=>{const b=h.currentTarget.getAttribute("data-format")||"";I(b)})}),m.addEventListener("keyup",x=>{const h=m.value,b=m.selectionStart;if(h.substring(b-2,b)==="[[")Nt=!0,Mt=b,Tn="",ha(m);else if(Nt){if(x.key==="Escape"||x.key==="ArrowUp"||x.key==="ArrowDown"||x.key==="Enter")return;const C=h.substring(Mt,b);C.includes(`
`)||b<Mt?Pt():(Tn=C,oo(m))}}),m.addEventListener("keydown",x=>{if(Nt){const h=document.getElementById("autocomplete-popup");if(!h)return;const b=h.querySelectorAll(".editor-autocomplete-item");let T=Array.from(b).findIndex(C=>C.classList.contains("active"));x.key==="ArrowDown"?(x.preventDefault(),b.length>0&&(T>=0&&b[T].classList.remove("active","bg-teal-950/20","text-teal-400"),T=(T+1)%b.length,b[T].classList.add("active","bg-teal-950/20","text-teal-400"),b[T].scrollIntoView({block:"nearest"}))):x.key==="ArrowUp"?(x.preventDefault(),b.length>0&&(T>=0&&b[T].classList.remove("active","bg-teal-950/20","text-teal-400"),T=(T-1+b.length)%b.length,b[T].classList.add("active","bg-teal-950/20","text-teal-400"),b[T].scrollIntoView({block:"nearest"}))):x.key==="Enter"?(x.preventDefault(),T>=0?b[T].click():b.length>0&&b[0].click()):x.key==="Escape"&&(x.preventDefault(),Pt())}}),m.addEventListener("input",E),E();const $=setInterval(()=>{var T,C;const x=(T=document.getElementById("edit-title"))==null?void 0:T.value,h=m.value,b=(C=document.getElementById("edit-tags"))==null?void 0:C.value;(x||h)&&localStorage.setItem(l,JSON.stringify({title:x,content:h,tags:b,updatedAt:Date.now()}))},5e3),O=()=>{clearInterval($),localStorage.removeItem(l),Pt()};v.addEventListener("click",O),_&&_.addEventListener("click",()=>{var x;O(),(x=document.getElementById("draft-restore-banner"))==null||x.remove(),so(s)}),p.addEventListener("submit",async x=>{x.preventDefault();const h=document.getElementById("edit-title").value.trim(),b=Ee?document.getElementById("edit-slug").value.trim().toLowerCase():t,T=document.getElementById("edit-tags").value,C=m.value,R=document.getElementById("edit-encrypt").checked;if(Ee&&!/^[a-z0-9-_]+$/.test(b)){alert("Security Alert: Slug contains illegal characters. Use alphanumeric, hyphens, and underscores only.");return}const V=T.split(",").map(z=>$t(z.trim())).filter(z=>z.length>0),H=await Be(b);H&&await An({id:`${H.slug}-${Date.now()}`,slug:H.slug,title:H.title,content:H.content,updatedAt:H.updatedAt,isEncrypted:H.isEncrypted});let j=C;if(R){if(!G){const z=prompt("Enter a security passphrase to encrypt this document:");if(!z){alert("Encryption Aborted: A security passphrase is required to save an encrypted document.");return}G=await Ys(z)}try{j=await Zs(C,G)}catch(z){alert(`Encryption failure: ${z.message}`);return}}const ee={slug:b,title:h,content:j,updatedAt:Date.now(),tags:V,isSystem:r,isEncrypted:R};try{await Pe(ee),O(),Te.postMessage("refresh"),window.location.hash=`#/page/${b}`}catch(z){alert(`Database transaction error: ${z.message}`)}})}function gn(s,e){let t=s.replace(/\.md$/i,"").replace(/[-_]+/g," ");t=t.split(" ").map(a=>a.charAt(0).toUpperCase()+a.slice(1)).join(" ");let n=s.replace(/\.md$/i,"").toLowerCase().replace(/[^a-z0-9-_]+/g,"-"),o=e,r=["imported"];if(e.startsWith("---")){const a=e.indexOf("---",3);if(a!==-1){const l=e.substring(3,a);o=e.substring(a+3).trim(),l.split(`
`).forEach(f=>{const p=f.indexOf(":");if(p!==-1){const m=f.substring(0,p).trim().toLowerCase(),u=f.substring(p+1).trim();m==="title"?t=u.replace(/^["']|["']$/g,""):m==="slug"?n=u.replace(/[^a-z0-9-_]+/g,"-").toLowerCase():m==="tags"&&(r=u.split(",").map(v=>v.trim().replace(/^["']|["']$/g,"")).filter(v=>v.length>0))}})}}return{slug:n,title:t,content:o,updatedAt:Date.now(),tags:r,isSystem:!1}}function ia(s){const e=["Title","Slug","Tags","Word Count","Encrypted","Last Updated"],t=s.map(n=>{const o=n.content.split(/\s+/).filter(r=>r.length>0).length;return[`"${n.title.replace(/"/g,'""')}"`,`"${n.slug}"`,`"${n.tags.join(", ")}"`,o,n.isEncrypted?"TRUE":"FALSE",`"${new Date(n.updatedAt).toISOString()}"`]});return[e.join(","),...t.map(n=>n.join(","))].join(`
`)}function la(s){let e="";for(const t of s){let n=t.content;if(t.isEncrypted&&G)try{n=t.content.includes(":")?"🔒 [Encrypted Document: Passphrase Required]":t.content}catch{n="🔒 [Encrypted Document: Passphrase Required]"}const o=at(n);e+=`
      <section style="page-break-after: always; margin-bottom: 3rem; border-bottom: 2px solid #e2e8f0; padding-bottom: 2rem;">
        <h1 style="font-size: 2.25rem; font-family: monospace; margin-bottom: 0.5rem; color: #1a202c;">${M(t.title)}</h1>
        <div style="font-size: 0.75rem; color: #718096; font-family: monospace; margin-bottom: 1.5rem;">
          SLUG: ${t.slug} | TAGS: #${t.tags.join(", #")} | UPDATED: ${new Date(t.updatedAt).toLocaleString()}
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
</html>`}function ca(s){const e=[],t=s.map(o=>`<a href="${o.slug}.html" style="display: block; padding: 0.5rem; color: #94a3b8; text-decoration: none; font-family: monospace; font-size: 0.8rem; border-radius: 4px; transition: background 0.2s;" onmouseover="this.style.background='#1e293b'; this.style.color='#2dd4bf'" onmouseout="this.style.background='transparent'; this.style.color='#94a3b8'">${M(o.title)}</a>`).join(`
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
      ${s.map(o=>`
        <div class="page-card">
          <a class="page-title" href="${o.slug}.html">${M(o.title)}</a>
          <div class="metadata">
            SLUG: ${o.slug} | TAGS: #${o.tags.join(", #")} | UPDATED: ${new Date(o.updatedAt).toLocaleString()}
          </div>
        </div>
      `).join("")}
    </div>
  </main>
</body>
</html>`;return e.push({name:"index.html",content:n}),s.forEach(o=>{let r=o.content;if(o.isEncrypted&&G)try{r=o.content.includes(":")?"🔒 [Encrypted Document: Decrypted view not exported]":o.content}catch{r="🔒 [Encrypted Document: Decrypted view not exported]"}let a=at(r);a=a.replace(/href="#\/page\/([a-z0-9-_]+)"/g,'href="$1.html"');const l=`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${M(o.title)} - SecOps Static Wiki</title>
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
    <h1>${M(o.title)}</h1>
    <div class="metadata">
      Slug: ${o.slug} &nbsp;|&nbsp; 
      Updated: ${new Date(o.updatedAt).toLocaleString()} &nbsp;|&nbsp;
      Tags: ${o.tags.map(c=>`<span class="badge">#${M(c)}</span>`).join("")}
    </div>
    <article class="wiki-content">
      ${a}
    </article>
  </main>
</body>
</html>`;e.push({name:`${o.slug}.html`,content:l})}),eo(e)}function bn(s){const e=[];let t="",n=!1;for(let c=0;c<s.length;c++){const f=s[c];f==='"'?(n=!n,t+=f):f===`
`&&!n?(e.push(t),t=""):t+=f}if(t&&e.push(t),e.length<2)return[];const o=c=>{const f=[];let p="",m=!1;for(let u=0;u<c.length;u++){const v=c[u];v==='"'?m=!m:v===","&&!m?(f.push(r(p)),p=""):p+=v}return f.push(r(p)),f},r=c=>(c=c.trim(),c.startsWith('"')&&c.endsWith('"')&&(c=c.substring(1,c.length-1)),c.replace(/""/g,'"')),a=o(e[0]).map(c=>c.toLowerCase()),l=[];for(let c=1;c<e.length;c++){if(!e[c].trim())continue;const f=o(e[c]),p={};a.forEach((m,u)=>{p[m]=f[u]||""}),l.push(p)}return l}function xn(s){var l;const e=s.title||"Untitled CSV Import",t=s.content||"";let n=s.slug||e.toLowerCase().replace(/[^a-z0-9-_]+/g,"-");n=n.toLowerCase().replace(/[^a-z0-9-_]+/g,"-"),n||(n=`imported-${Date.now()}`);const r=(s.tags||"imported, csv").split(/[,;|]+/).map(c=>c.trim().toLowerCase()).filter(c=>c.length>0),a=s.updatedat?parseInt(s.updatedat):Date.now();return{slug:n,title:e,content:t,updatedAt:isNaN(a)?Date.now():a,tags:r,isSystem:!1,isEncrypted:((l=s.encrypted)==null?void 0:l.toLowerCase())==="true"}}async function _e(s,e){const t=Kr(s),n=await Be(t.slug);if(n){if(e==="SKIP")return!1;if(e==="REVISION")await An({id:`${n.slug}-${Date.now()}`,slug:n.slug,title:n.title,content:n.content,updatedAt:n.updatedAt,isEncrypted:n.isEncrypted}),await Pe(t);else if(e==="OVERWRITE")await Pe(t);else if(e==="MERGE_RENAME"){let o=`${t.slug}-imported`,r=await Be(o),a=1;for(;r;)o=`${t.slug}-imported-${a}`,r=await Be(o),a++;t.slug=o,t.title=`${t.title} (Imported)`,await Pe(t)}}else await Pe(t);return!0}function da(s){const e=Array.from(new Set(fe.flatMap(k=>k.tags)));s.innerHTML=`
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
              <span class="text-emerald-400 font-bold">${Vs()}</span>
            </li>
            <li class="flex justify-between">
              <span class="text-slate-500">ACTIVE VISUAL THEME:</span>
              <span class="text-emerald-400 font-bold">${ot.toUpperCase()}</span>
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
              ${e.map(k=>`
                <option value="${M(k)}">#${M(k)}</option>
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
  `;const t=document.getElementById("system-export-btn"),n=document.getElementById("system-export-zip-btn"),o=document.getElementById("system-export-web-zip-btn"),r=document.getElementById("system-export-csv-btn"),a=document.getElementById("system-export-html-btn"),l=document.getElementById("system-import-file"),c=document.getElementById("system-import-md-files"),f=document.getElementById("system-import-csv-file"),p=document.getElementById("system-reset-btn"),m=document.getElementById("total-articles-telemetry"),u=document.getElementById("db-health-diagnostics"),v=document.getElementById("system-drop-zone");m.textContent=fe.length.toString(),u&&wa(u);const _=()=>{const k=document.getElementById("export-tag-filter"),g=(k==null?void 0:k.value)||"ALL";return g==="ALL"?fe:fe.filter(S=>S.tags.includes(g))};t.addEventListener("click",()=>{const k=_(),g=JSON.stringify(k,null,2),S=new Blob([g],{type:"application/json"}),A=URL.createObjectURL(S),E=document.createElement("a");E.href=A,E.download=`secops-wiki-backup-${Date.now()}.json`,document.body.appendChild(E),E.click(),document.body.removeChild(E),URL.revokeObjectURL(A)}),n.addEventListener("click",async()=>{const k=_(),g=[];for(const I of k){let $=I.content;if(I.isEncrypted&&G)try{$=await Re(I.content,G)}catch{}const O=`---
title: ${I.title}
slug: ${I.slug}
tags: ${I.tags.join(", ")}
updated: ${new Date(I.updatedAt).toISOString()}
encrypted: ${!!I.isEncrypted}
---

`;g.push({name:`${I.slug}.md`,content:O+$})}const S=eo(g),A=URL.createObjectURL(S),E=document.createElement("a");E.href=A,E.download=`secops-wiki-backup-${Date.now()}.zip`,document.body.appendChild(E),E.click(),document.body.removeChild(E),URL.revokeObjectURL(A)}),o.addEventListener("click",()=>{const k=_(),g=ca(k),S=URL.createObjectURL(g),A=document.createElement("a");A.href=S,A.download=`secops-wiki-web-${Date.now()}.zip`,document.body.appendChild(A),A.click(),document.body.removeChild(A),URL.revokeObjectURL(S)}),r.addEventListener("click",()=>{const k=_(),g=ia(k),S=new Blob([g],{type:"text/csv;charset=utf-8;"}),A=URL.createObjectURL(S),E=document.createElement("a");E.href=A,E.download=`secops-wiki-report-${Date.now()}.csv`,document.body.appendChild(E),E.click(),document.body.removeChild(E),URL.revokeObjectURL(A)}),a.addEventListener("click",()=>{const k=_(),g=la(k),S=new Blob([g],{type:"text/html;charset=utf-8;"}),A=URL.createObjectURL(S),E=document.createElement("a");E.href=A,E.download=`secops-wiki-book-${Date.now()}.html`,document.body.appendChild(E),E.click(),document.body.removeChild(E),URL.revokeObjectURL(A)}),l.addEventListener("change",k=>{var E,I;const g=(E=k.target.files)==null?void 0:E[0];if(!g)return;if(g.size>100*1024*1024){alert("Ingestion failed: File size exceeds the secure ceiling of 100MB.");return}const S=((I=document.getElementById("import-conflict-resolution"))==null?void 0:I.value)||"REVISION",A=new FileReader;A.onload=async $=>{var O;try{const x=JSON.parse((O=$.target)==null?void 0:O.result),h=Array.isArray(x)?x:[x];let b=0,T=0,C=0;if(confirm(`SYSTEM INGESTION PROTOCOL: Import ${h.length} articles from JSON backup? Conflict mode: ${S.toUpperCase()}`)){for(const R of h)try{await _e(R,S)?b++:T++}catch{C++}alert(`JSON INGESTION RESULTS:
- Imported: ${b}
- Skipped: ${T}
- Failed: ${C}`),Te.postMessage("refresh"),await xe(),await Se()}}catch(x){alert(`Ingestion failed: Schema violation. ${x.message}`)}},A.readAsText(g)}),c.addEventListener("change",async k=>{var $;const g=k.target.files;if(!g||g.length===0)return;const S=(($=document.getElementById("import-conflict-resolution"))==null?void 0:$.value)||"REVISION";let A=0,E=0,I=0;for(let O=0;O<g.length;O++){const x=g[O];if(x.size>10*1024*1024){I++;continue}await new Promise(h=>{const b=new FileReader;b.onload=async T=>{var C;try{const R=(C=T.target)==null?void 0:C.result,V=gn(x.name,R);await _e(V,S)?A++:E++}catch{I++}h()},b.readAsText(x)})}alert(`MARKDOWN IMPORT RESULTS:
- Imported: ${A}
- Skipped: ${E}
- Failed: ${I}`),Te.postMessage("refresh"),await xe(),await Se()}),f.addEventListener("change",async k=>{var E,I;const g=(E=k.target.files)==null?void 0:E[0];if(!g)return;if(g.size>10*1024*1024){alert("Ingestion failed: CSV File exceeds secure limit of 10MB.");return}const S=((I=document.getElementById("import-conflict-resolution"))==null?void 0:I.value)||"REVISION",A=new FileReader;A.onload=async $=>{var O;try{const x=(O=$.target)==null?void 0:O.result,h=bn(x);if(h.length===0)throw new Error("No rows found in CSV file.");let b=0,T=0,C=0;if(confirm(`SYSTEM INGESTION PROTOCOL: Import ${h.length} records from CSV? Conflict mode: ${S.toUpperCase()}`)){for(const R of h)try{const V=xn(R);await _e(V,S)?b++:T++}catch{C++}alert(`CSV IMPORT RESULTS:
- Imported: ${b}
- Skipped: ${T}
- Failed: ${C}`),Te.postMessage("refresh"),await xe(),await Se()}}catch(x){alert(`CSV Ingestion failed: ${x.message}`)}},A.readAsText(g)}),["dragenter","dragover","dragleave","drop"].forEach(k=>{v.addEventListener(k,g=>{g.preventDefault(),g.stopPropagation()},!1)}),["dragenter","dragover"].forEach(k=>{v.addEventListener(k,()=>{v.classList.add("border-teal-500","bg-teal-950/10")},!1)}),["dragleave","drop"].forEach(k=>{v.addEventListener(k,()=>{v.classList.remove("border-teal-500","bg-teal-950/10")},!1)}),v.addEventListener("drop",async k=>{var R,V;const g=k.dataTransfer,S=g==null?void 0:g.files;if(!S||S.length===0)return;const A=((R=document.getElementById("import-conflict-resolution"))==null?void 0:R.value)||"REVISION";let E=0,I=0,$=0,O=0,x=0,h=0,b=0,T=0,C=0;for(let H=0;H<S.length;H++){const j=S[H],ee=(V=j.name.split(".").pop())==null?void 0:V.toLowerCase();ee==="md"?await new Promise(z=>{const q=new FileReader;q.onload=async de=>{var te;try{const N=(te=de.target)==null?void 0:te.result,pe=gn(j.name,N);await _e(pe,A)?E++:O++}catch{b++}z()},q.readAsText(j)}):ee==="csv"?await new Promise(z=>{const q=new FileReader;q.onload=async de=>{var te;try{const N=(te=de.target)==null?void 0:te.result,pe=bn(N);for(const ge of pe)try{const Ue=xn(ge);await _e(Ue,A)?I++:x++}catch{T++}}catch{T++}z()},q.readAsText(j)}):ee==="json"&&await new Promise(z=>{const q=new FileReader;q.onload=async de=>{var te;try{const N=JSON.parse((te=de.target)==null?void 0:te.result),pe=Array.isArray(N)?N:[N];for(const ge of pe)try{await _e(ge,A)?$++:h++}catch{C++}}catch{C++}z()},q.readAsText(j)})}alert(`DRAG & DROP IMPORT COMPLETED (Conflict resolution: ${A.toUpperCase()}):

Markdown (.md) files:
- Ingested: ${E}
- Skipped: ${O}
- Failed: ${b}

CSV files (rows):
- Ingested: ${I}
- Skipped: ${x}
- Failed: ${T}

JSON files (records):
- Ingested: ${$}
- Skipped: ${h}
- Failed: ${C}`),Te.postMessage("refresh"),await xe(),await Se()}),v.addEventListener("click",()=>{const k=document.createElement("input");k.type="file",k.multiple=!0,k.accept=".md,.csv,.json",k.onchange=async g=>{var R,V;const S=g.target.files;if(!S||S.length===0)return;const A=((R=document.getElementById("import-conflict-resolution"))==null?void 0:R.value)||"REVISION";let E=0,I=0,$=0,O=0,x=0,h=0,b=0,T=0,C=0;for(let H=0;H<S.length;H++){const j=S[H],ee=(V=j.name.split(".").pop())==null?void 0:V.toLowerCase();ee==="md"?await new Promise(z=>{const q=new FileReader;q.onload=async de=>{var te;try{const N=(te=de.target)==null?void 0:te.result,pe=gn(j.name,N);await _e(pe,A)?E++:O++}catch{b++}z()},q.readAsText(j)}):ee==="csv"?await new Promise(z=>{const q=new FileReader;q.onload=async de=>{var te;try{const N=(te=de.target)==null?void 0:te.result,pe=bn(N);for(const ge of pe)try{const Ue=xn(ge);await _e(Ue,A)?I++:x++}catch{T++}}catch{T++}z()},q.readAsText(j)}):ee==="json"&&await new Promise(z=>{const q=new FileReader;q.onload=async de=>{var te;try{const N=JSON.parse((te=de.target)==null?void 0:te.result),pe=Array.isArray(N)?N:[N];for(const ge of pe)try{await _e(ge,A)?$++:h++}catch{C++}}catch{C++}z()},q.readAsText(j)})}alert(`FILE SELECTION IMPORT COMPLETED (Conflict resolution: ${A.toUpperCase()}):

Markdown (.md) files:
- Ingested: ${E}
- Skipped: ${O}
- Failed: ${b}

CSV files (rows):
- Ingested: ${I}
- Skipped: ${x}
- Failed: ${T}

JSON files (records):
- Ingested: ${$}
- Skipped: ${h}
- Failed: ${C}`),Te.postMessage("refresh"),await xe(),await Se()},k.click()}),p.addEventListener("click",async()=>{if(confirm("CRITICAL WARPING WARNING: Reset and delete ALL wiki pages? Custom user documents will be permanently deleted.")){const k=indexedDB.open("secops-wiki-db",2);k.onsuccess=async()=>{const A=k.result.transaction("pages","readwrite").objectStore("pages");A.clear().onsuccess=async()=>{await Rs(),alert("Database successfully wiped and seeded with standard operating defaults."),Te.postMessage("refresh"),await xe(),window.location.hash="#/page/home"}}}})}function wt(){const s=document.getElementById("command-palette-backdrop");if(s)if(fn=!fn,fn){s.classList.remove("hidden");const e=document.getElementById("command-palette-input");e&&(e.value="",e.focus()),he=0,Ft()}else s.classList.add("hidden")}function pa(){if(document.getElementById("command-palette-backdrop"))return;const s=document.createElement("div");s.id="command-palette-backdrop",s.className="fixed inset-0 bg-[#090d16]/85 backdrop-blur-md z-50 flex items-start justify-center pt-20 hidden",s.innerHTML=`
    <div class="glass-panel border border-teal-900/30 rounded-xl w-full max-w-lg overflow-hidden shadow-2xl mx-4 glow-border">
      <input type="text" id="command-palette-input" placeholder="Search pages or run system commands..." class="w-full bg-slate-950/80 text-white font-mono text-sm p-4 outline-none border-b border-slate-800 focus:border-teal-500/30 placeholder-slate-500 transition">
      <div id="command-palette-results" class="max-h-80 overflow-y-auto divide-y divide-slate-850/40 p-2 space-y-1"></div>
    </div>
  `,document.body.appendChild(s);const e=document.getElementById("command-palette-input");e.addEventListener("input",()=>{he=0,Ft()}),e.addEventListener("keydown",fa),s.addEventListener("click",t=>{t.target===s&&wt()})}function Ft(){const s=document.getElementById("command-palette-input"),e=document.getElementById("command-palette-results");if(!e)return;const t=s?s.value.trim().toLowerCase():"",n=[{title:"CREATE NEW PAGE",subtitle:"Open the editor to establish a new document",icon:"➕",action:()=>{window.location.hash="#/new"}},{title:"TOGGLE THEME",subtitle:`Switch visual style (currently ${ot})`,icon:"🌓",action:()=>{Qs()}},{title:"SYSTEM ADMIN",subtitle:"Access operations console and db diagnostics",icon:"⚙️",action:()=>{window.location.hash="#/system"}},{title:"TACTICAL MAP VIEW",subtitle:"Display interactive node relationship map",icon:"🗺️",action:()=>{window.location.hash="#/graph"}},{title:"PANIC PURGE PROTOCOL",subtitle:"Emergency self-destruct - wipes all data",icon:"🚨",action:()=>{const p=document.getElementById("system-panic-btn");p&&p.click()}}];let o="",r=0;const a=n.filter(p=>p.title.toLowerCase().includes(t)||p.subtitle.toLowerCase().includes(t));let l=[];t?l=fe.map(p=>({page:p,score:Js(p,t)})).filter(p=>p.score>0).sort((p,m)=>m.score-p.score):l=fe.slice(0,5).map(p=>({page:p,score:0}));const c=a.length+l.length;he>=c?he=0:he<0&&(he=c-1),a.forEach(p=>{o+=`
      <div class="command-palette-item p-3 rounded-lg flex items-center justify-between cursor-pointer font-mono text-xs transition-all ${r===he?"command-item-active bg-teal-950/20 text-teal-400 border-l-2 border-teal-500":"text-slate-400 hover:bg-slate-900/40 hover:text-slate-200"}" data-index="${r}">
        <div class="flex items-center gap-3">
          <span class="text-base">${p.icon}</span>
          <div>
            <div class="font-bold text-white uppercase">${p.title}</div>
            <div class="text-[10px] text-slate-500">${p.subtitle}</div>
          </div>
        </div>
        <span class="text-[10px] text-slate-650 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-900 uppercase">CMD</span>
      </div>
    `,r++}),l.forEach(p=>{const m=r===he,u=p.page;o+=`
      <div class="command-palette-item p-3 rounded-lg flex items-center justify-between cursor-pointer font-mono text-xs transition-all ${m?"command-item-active bg-teal-950/20 text-teal-400 border-l-2 border-teal-500":"text-slate-400 hover:bg-slate-900/40 hover:text-slate-200"}" data-index="${r}">
        <div class="flex items-center gap-3">
          <span class="text-base">${u.isEncrypted?"🔒":"📄"}</span>
          <div>
            <div class="font-bold text-white">${M(u.title)}</div>
            <div class="text-[10px] text-slate-500">Slug: ${M(u.slug)} ${u.tags.length?`• tags: #${u.tags.join(", #")}`:""}</div>
          </div>
        </div>
        <span class="text-[10px] text-slate-650 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-900 uppercase">PAGE</span>
      </div>
    `,r++}),c===0&&(o='<div class="text-center py-6 text-xs text-slate-600 font-mono">No matching commands or pages found.</div>'),e.innerHTML=o,e.querySelectorAll(".command-palette-item").forEach(p=>{p.addEventListener("click",()=>{const m=parseInt(p.getAttribute("data-index")||"0",10);ua(m,a,l)})}),ma()}function ua(s,e,t){if(wt(),s<e.length)e[s].action();else{const n=s-e.length;n<t.length&&(window.location.hash=`#/page/${t[n].page.slug}`)}}function fa(s){const e=document.getElementById("command-palette-results");if(!e)return;const t=e.querySelectorAll(".command-palette-item");if(t.length!==0)if(s.key==="ArrowDown")s.preventDefault(),he=(he+1)%t.length,Ft();else if(s.key==="ArrowUp")s.preventDefault(),he=(he-1+t.length)%t.length,Ft();else if(s.key==="Enter"){s.preventDefault();const n=e.querySelector(".command-item-active");n&&n.click()}else s.key==="Escape"&&(s.preventDefault(),wt())}function ma(){const s=document.getElementById("command-palette-results");if(!s)return;const e=s.querySelector(".command-item-active");e&&e.scrollIntoView({block:"nearest"})}function ha(s){const e=document.getElementById("autocomplete-popup");e&&(e.classList.remove("hidden"),oo(s))}function Pt(){const s=document.getElementById("autocomplete-popup");s&&(s.classList.add("hidden"),Nt=!1)}function oo(s){const e=document.getElementById("autocomplete-popup");if(!e)return;const t=Tn.toLowerCase().trim(),n=fe.filter(r=>r.title.toLowerCase().includes(t)||r.slug.toLowerCase().includes(t));if(n.length===0){e.innerHTML='<div class="p-2 text-slate-500 italic">No matches found</div>';return}e.innerHTML=n.map((r,a)=>`
    <div class="editor-autocomplete-item p-2 cursor-pointer transition ${a===0?"active bg-teal-950/20 text-teal-400":"text-slate-400 hover:bg-slate-900/40 hover:text-slate-200"}" data-slug="${M(r.slug)}" data-title="${M(r.title)}">
      <span class="font-bold">${M(r.title)}</span>
      <span class="text-[9px] text-slate-500 block truncate">Slug: ${M(r.slug)}</span>
    </div>
  `).join(""),e.querySelectorAll(".editor-autocomplete-item").forEach(r=>{r.addEventListener("click",a=>{const l=a.currentTarget,c=l.getAttribute("data-slug")||"",f=l.getAttribute("data-title")||"";ba(s,f,c)})});const o=ga(s,s.selectionStart);e.style.left=`${Math.min(s.clientWidth-260,Math.max(16,o.left))}px`,e.style.top=`${Math.min(s.clientHeight-100,Math.max(40,o.top+20))}px`}function ga(s,e){const n=s.value.substring(0,e).split(`
`),o=n.length-1,r=n[o],a=8,l=20,c=16+r.length*a%(s.clientWidth-40),f=12+o*l-s.scrollTop;return{left:c,top:f}}function ba(s,e,t){const n=Mt-2,o=s.selectionStart,r=s.value,a=`[${e}](#/page/${t})`;s.value=r.substring(0,n)+a+r.substring(o),s.focus(),s.selectionStart=n+a.length,s.selectionEnd=n+a.length,Pt();const l=document.getElementById("live-preview-box");l&&(l.innerHTML=at(s.value))}async function xa(s,e,t){const n=await Be(s);if(!n)return;let o=n.content;const r=!!n.isEncrypted;if(r){if(!G){alert("Authentication Error: Decryption key is missing. Re-decrypt page first.");return}try{o=await Re(o,G)}catch{alert("Decryption failure.");return}}let a=0;const l=/([-*+]\s+\[)([ xX])(\])/g,c=o.replace(l,(m,u,v,_)=>a===e?(a++,`${u}${t?"x":" "}${_}`):(a++,m));let f=c;r&&G&&(f=await Zs(c,G)),n.content=f,n.updatedAt=Date.now(),await Pe(n),Te.postMessage("refresh"),await xe();const p=document.getElementById("main-content");p&&await no(p)}function ro(s){const e=[],t=/#\/page\/([a-z0-9-_]+)/g;let n;for(;(n=t.exec(s))!==null;)e.push(n[1]);return Array.from(new Set(e))}async function ya(s){s.innerHTML=`
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
          <div class="text-slate-500">Drag to re-arrange nodes. Click to read page.</div>
        </div>
      </div>
    </div>
  `;const e=document.getElementById("tactical-map-canvas");if(!e)return;const t=e.getContext("2d");if(!t)return;const n=window.devicePixelRatio||1,o=e.getBoundingClientRect();e.width=o.width*n,e.height=500*n,t.scale(n,n);const r=o.width,a=500,l=fe.map(h=>{const b=r/2+(Math.random()-.5)*100,T=a/2+(Math.random()-.5)*100;return{id:h.slug,title:h.title,x:b,y:T,vx:0,vy:0,radius:h.slug==="home"?14:10,isEncrypted:!!h.isEncrypted,isSystem:!!h.isSystem}}),c=[],f=new Set(l.map(h=>h.id));for(const h of fe){let b=h.content;if(h.isEncrypted&&G)try{b=await Re(h.content,G)}catch{}ro(b).forEach(C=>{f.has(C)&&C!==h.slug&&c.push({source:h.slug,target:C})})}let p=null,m=null,u=0,v=0,_=0;const k=.02,g=1200,S=.85,A=.02;function E(){for(let h=0;h<l.length;h++){const b=l[h];for(let T=h+1;T<l.length;T++){const C=l[T],R=C.x-b.x,V=C.y-b.y,H=R*R+V*V+.1,j=Math.sqrt(H);if(j<250){const ee=g/H,z=R/j*ee,q=V/j*ee;b!==p&&(b.vx-=z,b.vy-=q),C!==p&&(C.vx+=z,C.vy+=q)}}}c.forEach(h=>{const b=l.find(z=>z.id===h.source),T=l.find(z=>z.id===h.target);if(!b||!T)return;const C=T.x-b.x,R=T.y-b.y,V=Math.sqrt(C*C+R*R)||.1,H=(V-100)*k,j=C/V*H,ee=R/V*H;b!==p&&(b.vx+=j,b.vy+=ee),T!==p&&(T.vx-=j,T.vy-=ee)}),l.forEach(h=>{if(h===p)return;const b=r/2-h.x,T=a/2-h.y;h.vx+=b*A,h.vy+=T*A,h.x+=h.vx,h.y+=h.vy,h.vx*=S,h.vy*=S,h.x=Math.max(h.radius,Math.min(r-h.radius,h.x)),h.y=Math.max(h.radius,Math.min(a-h.radius,h.y))})}function I(){t.clearRect(0,0,r,a),t.lineWidth=1,c.forEach(h=>{const b=l.find(R=>R.id===h.source),T=l.find(R=>R.id===h.target);if(!b||!T)return;const C=m&&(m.id===b.id||m.id===T.id);t.strokeStyle=C?"rgba(20, 184, 166, 0.6)":"rgba(30, 41, 59, 0.4)",t.lineWidth=C?1.5:1,t.beginPath(),t.moveTo(b.x,b.y),t.lineTo(T.x,T.y),t.stroke()}),l.forEach(h=>{t.beginPath(),t.arc(h.x,h.y,h.radius,0,2*Math.PI);let b="#14b8a6",T="rgba(20, 184, 166, 0.4)";h.isEncrypted?(b="#ef4444",T="rgba(239, 68, 68, 0.4)"):h.isSystem&&(b="#3b82f6",T="rgba(59, 130, 246, 0.4)"),t.fillStyle=b,t.shadowColor=T,t.shadowBlur=m===h?12:6,t.fill(),t.shadowBlur=0,t.strokeStyle="rgba(255, 255, 255, 0.1)",t.lineWidth=1.5,t.stroke(),t.fillStyle=m===h?"#ffffff":"#94a3b8",t.font=m===h?"bold 10px monospace":"9px monospace",t.textAlign="center",t.fillText(h.title,h.x,h.y-h.radius-5)})}function $(){E(),I(),_=requestAnimationFrame($)}e.addEventListener("mousemove",h=>{const b=e.getBoundingClientRect();if(u=h.clientX-b.left,v=h.clientY-b.top,p){p.x=u,p.y=v,p.vx=0,p.vy=0;return}m=null;for(const T of l){const C=T.x-u,R=T.y-v;if(C*C+R*R<(T.radius+5)*(T.radius+5)){m=T;break}}}),e.addEventListener("mousedown",()=>{m&&(p=m,p.x=u,p.y=v)});const O=()=>{p=null};window.addEventListener("mouseup",O),e.addEventListener("click",()=>{m&&!p&&(cancelAnimationFrame(_),window.location.hash=`#/page/${m.id}`)}),$();const x=()=>{cancelAnimationFrame(_),window.removeEventListener("mouseup",O),window.removeEventListener("hashchange",x)};window.addEventListener("hashchange",x)}async function wa(s){s.innerHTML=`
    <div class="text-xs font-mono text-slate-500 animate-pulse">Running security & link integrity scan...</div>
  `;const e=await Sn();let t=0;const n=new TextEncoder;e.forEach(f=>{const p=JSON.stringify(f);t+=n.encode(p).length});const o=t<1024?`${t} Bytes`:t<1024*1024?`${(t/1024).toFixed(2)} KB`:`${(t/(1024*1024)).toFixed(2)} MB`,r=new Set(e.map(f=>f.slug)),a={};e.forEach(f=>{a[f.slug]=[]});const l=[];for(const f of e){let p=f.content;if(f.isEncrypted&&G)try{p=await Re(f.content,G)}catch{}ro(p).forEach(u=>{r.has(u)?u!==f.slug&&a[u].push(f.slug):l.push({source:f.slug,target:u})})}const c=e.filter(f=>f.slug!=="home"&&a[f.slug].length===0);s.innerHTML=`
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
              ${l.map(f=>`
                <div class="text-[10px] text-red-400/80">📄 [${M(f.source)}] references non-existent [${M(f.target)}]</div>
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
              ${c.map(f=>`
                <div class="text-[10px] text-amber-500/80">📄 [${M(f.title)}] (slug: ${M(f.slug)}) has zero citations</div>
              `).join("")}
            </div>
          `}
        </div>
      </div>
    </div>
  `}document.addEventListener("DOMContentLoaded",ea);
