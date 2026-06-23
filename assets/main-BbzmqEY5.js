var yo=Object.defineProperty;var Vn=s=>{throw TypeError(s)};var wo=(s,e,t)=>e in s?yo(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var P=(s,e,t)=>wo(s,typeof e!="symbol"?e+"":e,t),ko=(s,e,t)=>e.has(s)||Vn("Cannot "+t);var Yn=(s,e,t)=>e.has(s)?Vn("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(s):e.set(s,t);var vt=(s,e,t)=>(ko(s,e,"access private method"),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function t(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(o){if(o.ep)return;o.ep=!0;const i=t(o);fetch(o.href,i)}})();if(self!==top)try{window.top&&(window.top.location.href=window.location.href)}catch{window.location.href="about:blank"}else document.documentElement.classList.remove("clickjack-lock");const vo="secops-wiki-db",ye="pages",Ie="revisions",Eo=2;function Pe(){return new Promise((s,e)=>{const t=indexedDB.open(vo,Eo);t.onerror=()=>e(t.error),t.onsuccess=()=>s(t.result),t.onupgradeneeded=()=>{const n=t.result;n.objectStoreNames.contains(ye)||n.createObjectStore(ye,{keyPath:"slug"}),n.objectStoreNames.contains(Ie)||n.createObjectStore(Ie,{keyPath:"id"}).createIndex("slug","slug",{unique:!1})}})}async function ct(s){const e=await Pe();return new Promise((t,n)=>{const r=e.transaction(ye,"readonly").objectStore(ye).get(s);r.onerror=()=>n(r.error),r.onsuccess=()=>t(r.result||null)})}async function pt(s){const e=await Pe();return new Promise((t,n)=>{const r=e.transaction(ye,"readwrite").objectStore(ye).put(s);r.onerror=()=>n(r.error),r.onsuccess=()=>t()})}async function To(s){await Ao(s);const e=await Pe();return new Promise((t,n)=>{const r=e.transaction(ye,"readwrite").objectStore(ye).delete(s);r.onerror=()=>n(r.error),r.onsuccess=()=>t()})}async function pn(){const s=await Pe();return new Promise((e,t)=>{const i=s.transaction(ye,"readonly").objectStore(ye).getAll();i.onerror=()=>t(i.error),i.onsuccess=()=>e(i.result||[])})}async function bs(s){const e=await Pe();return new Promise((t,n)=>{const r=e.transaction(Ie,"readwrite").objectStore(Ie).put(s);r.onerror=()=>n(r.error),r.onsuccess=()=>t()})}async function So(s){const e=await Pe();return new Promise((t,n)=>{const l=e.transaction(Ie,"readonly").objectStore(Ie).index("slug").getAll(s);l.onerror=()=>n(l.error),l.onsuccess=()=>{const c=l.result||[];c.sort((f,u)=>u.updatedAt-f.updatedAt),t(c)}})}async function Ao(s){const e=await Pe();return new Promise((t,n)=>{const l=e.transaction(Ie,"readwrite").objectStore(Ie).index("slug").openCursor(s);l.onerror=()=>n(l.error),l.onsuccess=()=>{const c=l.result;c?(c.delete(),c.continue()):t()}})}const _o=[{slug:"home",title:"Operations Dashboard",content:`# Secure Operations Center (SOC) Wiki

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
* Raw input strings are escaped to prevent Cross-Site Scripting (XSS).`,updatedAt:Date.now(),tags:["security","hardening"],isSystem:!0}];async function xs(){if((await pn()).length===0)for(const e of _o)await pt(e)}/*! @license DOMPurify 3.4.11 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.4.11/LICENSE */function Zn(s,e){(e==null||e>s.length)&&(e=s.length);for(var t=0,n=Array(e);t<e;t++)n[t]=s[t];return n}function Io(s){if(Array.isArray(s))return s}function Lo(s,e){var t=s==null?null:typeof Symbol<"u"&&s[Symbol.iterator]||s["@@iterator"];if(t!=null){var n,o,i,r,l=[],c=!0,f=!1;try{if(i=(t=t.call(s)).next,e!==0)for(;!(c=(n=i.call(t)).done)&&(l.push(n.value),l.length!==e);c=!0);}catch(u){f=!0,o=u}finally{try{if(!c&&t.return!=null&&(r=t.return(),Object(r)!==r))return}finally{if(f)throw o}}return l}}function Co(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Ro(s,e){return Io(s)||Lo(s,e)||Oo(s,e)||Co()}function Oo(s,e){if(s){if(typeof s=="string")return Zn(s,e);var t={}.toString.call(s).slice(8,-1);return t==="Object"&&s.constructor&&(t=s.constructor.name),t==="Map"||t==="Set"?Array.from(s):t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?Zn(s,e):void 0}}const ys=Object.entries,Kn=Object.setPrototypeOf,Do=Object.isFrozen,No=Object.getPrototypeOf,Mo=Object.getOwnPropertyDescriptor;let X=Object.freeze,Q=Object.seal,We=Object.create,ws=typeof Reflect<"u"&&Reflect,rn=ws.apply,an=ws.construct;X||(X=function(e){return e});Q||(Q=function(e){return e});rn||(rn=function(e,t){for(var n=arguments.length,o=new Array(n>2?n-2:0),i=2;i<n;i++)o[i-2]=arguments[i];return e.apply(t,o)});an||(an=function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),o=1;o<t;o++)n[o-1]=arguments[o];return new e(...n)});const et=G(Array.prototype.forEach),Po=G(Array.prototype.lastIndexOf),Xn=G(Array.prototype.pop),je=G(Array.prototype.push),$o=G(Array.prototype.splice),_e=Array.isArray,rt=G(String.prototype.toLowerCase),Qt=G(String.prototype.toString),Qn=G(String.prototype.match),tt=G(String.prototype.replace),Jn=G(String.prototype.indexOf),Bo=G(String.prototype.trim),zo=G(Number.prototype.toString),Uo=G(Boolean.prototype.toString),es=typeof BigInt>"u"?null:G(BigInt.prototype.toString),ts=typeof Symbol>"u"?null:G(Symbol.prototype.toString),V=G(Object.prototype.hasOwnProperty),nt=G(Object.prototype.toString),K=G(RegExp.prototype.test),Re=Fo(TypeError);function G(s){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var t=arguments.length,n=new Array(t>1?t-1:0),o=1;o<t;o++)n[o-1]=arguments[o];return rn(s,e,n)}}function Fo(s){return function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return an(s,t)}}function L(s,e){let t=arguments.length>2&&arguments[2]!==void 0?arguments[2]:rt;if(Kn&&Kn(s,null),!_e(e))return s;let n=e.length;for(;n--;){let o=e[n];if(typeof o=="string"){const i=t(o);i!==o&&(Do(e)||(e[n]=i),o=i)}s[o]=!0}return s}function Ho(s){for(let e=0;e<s.length;e++)V(s,e)||(s[e]=null);return s}function ne(s){const e=We(null);for(const n of ys(s)){var t=Ro(n,2);const o=t[0],i=t[1];V(s,o)&&(_e(i)?e[o]=Ho(i):i&&typeof i=="object"&&i.constructor===Object?e[o]=ne(i):e[o]=i)}return e}function jo(s){switch(typeof s){case"string":return s;case"number":return zo(s);case"boolean":return Uo(s);case"bigint":return es?es(s):"0";case"symbol":return ts?ts(s):"Symbol()";case"undefined":return nt(s);case"function":case"object":{if(s===null)return nt(s);const e=s,t=me(e,"toString");if(typeof t=="function"){const n=t(e);return typeof n=="string"?n:nt(n)}return nt(s)}default:return nt(s)}}function me(s,e){for(;s!==null;){const n=Mo(s,e);if(n){if(n.get)return G(n.get);if(typeof n.value=="function")return G(n.value)}s=No(s)}function t(){return null}return t}function Wo(s){try{return K(s,""),!0}catch{return!1}}const ns=X(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Jt=X(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),en=X(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Go=X(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),tn=X(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),qo=X(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),ss=X(["#text"]),os=X(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","command","commandfor","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns"]),nn=X(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),rs=X(["accent","accentunder","align","bevelled","close","columnalign","columnlines","columnspacing","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lquote","lspace","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Et=X(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Vo=Q(/{{[\w\W]*|^[\w\W]*}}/g),Yo=Q(/<%[\w\W]*|^[\w\W]*%>/g),Zo=Q(/\${[\w\W]*/g),Ko=Q(/^data-[\-\w.\u00B7-\uFFFF]+$/),Xo=Q(/^aria-[\-\w]+$/),is=Q(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Qo=Q(/^(?:\w+script|data):/i),Jo=Q(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),er=Q(/^html$/i),tr=Q(/^[a-z][.\w]*(-[.\w]+)+$/i),as=Q(/<[/\w!]/g),nr=Q(/<[/\w]/g),sr=Q(/<\/no(script|embed|frames)/i),or=Q(/\/>/i),he={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,processingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},rr=function(){return typeof window>"u"?null:window},ir=function(e,t){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let n=null;const o="data-tt-policy-suffix";t&&t.hasAttribute(o)&&(n=t.getAttribute(o));const i="dompurify"+(n?"#"+n:"");try{return e.createPolicy(i,{createHTML(r){return r},createScriptURL(r){return r}})}catch{return console.warn("TrustedTypes policy "+i+" could not be created."),null}},ls=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}},Se=function(e,t,n,o){return V(e,t)&&_e(e[t])?L(o.base?ne(o.base):{},e[t],o.transform):n};function ks(){let s=arguments.length>0&&arguments[0]!==void 0?arguments[0]:rr();const e=b=>ks(b);if(e.version="3.4.11",e.removed=[],!s||!s.document||s.document.nodeType!==he.document||!s.Element)return e.isSupported=!1,e;let t=s.document;const n=t,o=n.currentScript;s.DocumentFragment;const i=s.HTMLTemplateElement,r=s.Node,l=s.Element,c=s.NodeFilter,f=s.NamedNodeMap;f===void 0&&(s.NamedNodeMap||s.MozNamedAttrMap),s.HTMLFormElement;const u=s.DOMParser,h=s.trustedTypes,p=l.prototype,x=me(p,"cloneNode"),w=me(p,"remove"),E=me(p,"nextSibling"),v=me(p,"childNodes"),_=me(p,"parentNode"),N=me(p,"shadowRoot"),ie=me(p,"attributes"),j=r&&r.prototype?me(r.prototype,"nodeType"):null,Z=r&&r.prototype?me(r.prototype,"nodeName"):null;if(typeof i=="function"){const b=t.createElement("template");b.content&&b.content.ownerDocument&&(t=b.content.ownerDocument)}let F,m="",T,y=!1,S=0;const I=function(){if(S>0)throw Re('A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted Types" section of the README.')},O=function(a){I(),S++;try{return F.createHTML(a)}finally{S--}},we=function(a){I(),S++;try{return F.createScriptURL(a)}finally{S--}},J=function(){return y||(T=ir(h,o),y=!0),T},oe=t,ae=oe.implementation,ee=oe.createNodeIterator,qs=oe.createDocumentFragment,Vs=oe.getElementsByTagName,Ys=n.importNode;let H=ls();e.isSupported=typeof ys=="function"&&typeof _=="function"&&ae&&ae.createHTMLDocument!==void 0;const Zs=Vo,Ks=Yo,Xs=Zo,Qs=Ko,Js=Xo,eo=Qo,kn=Jo,to=tr;let vn=is,$=null;const En=L({},[...ns,...Jt,...en,...tn,...ss]);let B=null;const Tn=L({},[...os,...nn,...rs,...Et]);let z=Object.seal(We(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Ke=null,Sn=null;const ve=Object.seal(We(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let An=!0,Mt=!0,_n=!1,In=!0,Ee=!1,Xe=!0,Le=!1,Pt=!1,$t=null,Bt=null,zt=!1,Be=!1,mt=!1,gt=!1,Ln=!0,Cn=!1;const Rn="user-content-";let Ut=!0,Ft=!1,ze={},pe=null;const Ht=L({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","selectedcontent","style","svg","template","thead","title","video","xmp"]);let On=null;const Dn=L({},["audio","video","img","source","image","track"]);let jt=null;const Nn=L({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),bt="http://www.w3.org/1998/Math/MathML",xt="http://www.w3.org/2000/svg",fe="http://www.w3.org/1999/xhtml";let Ue=fe,Wt=!1,Gt=null;const no=L({},[bt,xt,fe],Qt),Mn=X(["mi","mo","mn","ms","mtext"]);let qt=L({},Mn);const Pn=X(["annotation-xml"]);let Vt=L({},Pn);const so=L({},["title","style","font","a","script"]);let Qe=null;const oo=["application/xhtml+xml","text/html"],ro="text/html";let U=null,Fe=null;const io=t.createElement("form"),$n=function(a){return a instanceof RegExp||a instanceof Function},Yt=function(){let a=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(Fe&&Fe===a)return;(!a||typeof a!="object")&&(a={}),a=ne(a),Qe=oo.indexOf(a.PARSER_MEDIA_TYPE)===-1?ro:a.PARSER_MEDIA_TYPE,U=Qe==="application/xhtml+xml"?Qt:rt,$=Se(a,"ALLOWED_TAGS",En,{transform:U}),B=Se(a,"ALLOWED_ATTR",Tn,{transform:U}),Gt=Se(a,"ALLOWED_NAMESPACES",no,{transform:Qt}),jt=Se(a,"ADD_URI_SAFE_ATTR",Nn,{transform:U,base:Nn}),On=Se(a,"ADD_DATA_URI_TAGS",Dn,{transform:U,base:Dn}),pe=Se(a,"FORBID_CONTENTS",Ht,{transform:U}),Ke=Se(a,"FORBID_TAGS",ne({}),{transform:U}),Sn=Se(a,"FORBID_ATTR",ne({}),{transform:U}),ze=V(a,"USE_PROFILES")?a.USE_PROFILES&&typeof a.USE_PROFILES=="object"?ne(a.USE_PROFILES):a.USE_PROFILES:!1,An=a.ALLOW_ARIA_ATTR!==!1,Mt=a.ALLOW_DATA_ATTR!==!1,_n=a.ALLOW_UNKNOWN_PROTOCOLS||!1,In=a.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Ee=a.SAFE_FOR_TEMPLATES||!1,Xe=a.SAFE_FOR_XML!==!1,Le=a.WHOLE_DOCUMENT||!1,Be=a.RETURN_DOM||!1,mt=a.RETURN_DOM_FRAGMENT||!1,gt=a.RETURN_TRUSTED_TYPE||!1,zt=a.FORCE_BODY||!1,Ln=a.SANITIZE_DOM!==!1,Cn=a.SANITIZE_NAMED_PROPS||!1,Ut=a.KEEP_CONTENT!==!1,Ft=a.IN_PLACE||!1,vn=Wo(a.ALLOWED_URI_REGEXP)?a.ALLOWED_URI_REGEXP:is,Ue=typeof a.NAMESPACE=="string"?a.NAMESPACE:fe,qt=V(a,"MATHML_TEXT_INTEGRATION_POINTS")&&a.MATHML_TEXT_INTEGRATION_POINTS&&typeof a.MATHML_TEXT_INTEGRATION_POINTS=="object"?ne(a.MATHML_TEXT_INTEGRATION_POINTS):L({},Mn),Vt=V(a,"HTML_INTEGRATION_POINTS")&&a.HTML_INTEGRATION_POINTS&&typeof a.HTML_INTEGRATION_POINTS=="object"?ne(a.HTML_INTEGRATION_POINTS):L({},Pn);const d=V(a,"CUSTOM_ELEMENT_HANDLING")&&a.CUSTOM_ELEMENT_HANDLING&&typeof a.CUSTOM_ELEMENT_HANDLING=="object"?ne(a.CUSTOM_ELEMENT_HANDLING):We(null);if(z=We(null),V(d,"tagNameCheck")&&$n(d.tagNameCheck)&&(z.tagNameCheck=d.tagNameCheck),V(d,"attributeNameCheck")&&$n(d.attributeNameCheck)&&(z.attributeNameCheck=d.attributeNameCheck),V(d,"allowCustomizedBuiltInElements")&&typeof d.allowCustomizedBuiltInElements=="boolean"&&(z.allowCustomizedBuiltInElements=d.allowCustomizedBuiltInElements),Q(z),Ee&&(Mt=!1),mt&&(Be=!0),ze&&($=L({},ss),B=We(null),ze.html===!0&&(L($,ns),L(B,os)),ze.svg===!0&&(L($,Jt),L(B,nn),L(B,Et)),ze.svgFilters===!0&&(L($,en),L(B,nn),L(B,Et)),ze.mathMl===!0&&(L($,tn),L(B,rs),L(B,Et))),ve.tagCheck=null,ve.attributeCheck=null,V(a,"ADD_TAGS")&&(typeof a.ADD_TAGS=="function"?ve.tagCheck=a.ADD_TAGS:_e(a.ADD_TAGS)&&($===En&&($=ne($)),L($,a.ADD_TAGS,U))),V(a,"ADD_ATTR")&&(typeof a.ADD_ATTR=="function"?ve.attributeCheck=a.ADD_ATTR:_e(a.ADD_ATTR)&&(B===Tn&&(B=ne(B)),L(B,a.ADD_ATTR,U))),V(a,"ADD_URI_SAFE_ATTR")&&_e(a.ADD_URI_SAFE_ATTR)&&L(jt,a.ADD_URI_SAFE_ATTR,U),V(a,"FORBID_CONTENTS")&&_e(a.FORBID_CONTENTS)&&(pe===Ht&&(pe=ne(pe)),L(pe,a.FORBID_CONTENTS,U)),V(a,"ADD_FORBID_CONTENTS")&&_e(a.ADD_FORBID_CONTENTS)&&(pe===Ht&&(pe=ne(pe)),L(pe,a.ADD_FORBID_CONTENTS,U)),Ut&&($["#text"]=!0),Le&&L($,["html","head","body"]),$.table&&(L($,["tbody"]),delete Ke.tbody),a.TRUSTED_TYPES_POLICY){if(typeof a.TRUSTED_TYPES_POLICY.createHTML!="function")throw Re('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof a.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Re('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');const g=F;F=a.TRUSTED_TYPES_POLICY;try{m=O("")}catch(k){throw F=g,k}}else a.TRUSTED_TYPES_POLICY===null?(F=void 0,m=""):(F===void 0&&(F=J()),F&&typeof m=="string"&&(m=O("")));X&&X(a),Fe=a},Bn=L({},[...Jt,...en,...Go]),zn=L({},[...tn,...qo]),ao=function(a,d,g){return d.namespaceURI===fe?a==="svg":d.namespaceURI===bt?a==="svg"&&(g==="annotation-xml"||qt[g]):!!Bn[a]},lo=function(a,d,g){return d.namespaceURI===fe?a==="math":d.namespaceURI===xt?a==="math"&&Vt[g]:!!zn[a]},co=function(a,d,g){return d.namespaceURI===xt&&!Vt[g]||d.namespaceURI===bt&&!qt[g]?!1:!zn[a]&&(so[a]||!Bn[a])},uo=function(a){let d=_(a);(!d||!d.tagName)&&(d={namespaceURI:Ue,tagName:"template"});const g=rt(a.tagName),k=rt(d.tagName);return Gt[a.namespaceURI]?a.namespaceURI===xt?ao(g,d,k):a.namespaceURI===bt?lo(g,d,k):a.namespaceURI===fe?co(g,d,k):!!(Qe==="application/xhtml+xml"&&Gt[a.namespaceURI]):!1},Te=function(a){je(e.removed,{element:a});try{_(a).removeChild(a)}catch{if(w(a),!_(a))throw Re("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place")}},Un=function(a){const d=v(a);if(d){const k=[];et(d,A=>{je(k,A)}),et(k,A=>{try{w(A)}catch{}})}const g=ie(a);if(g)for(let k=g.length-1;k>=0;--k){const A=g[k],C=A&&A.name;if(typeof C=="string")try{a.removeAttribute(C)}catch{}}},Ce=function(a,d){try{je(e.removed,{attribute:d.getAttributeNode(a),from:d})}catch{je(e.removed,{attribute:null,from:d})}if(d.removeAttribute(a),a==="is")if(Be||mt)try{Te(d)}catch{}else try{d.setAttribute(a,"")}catch{}},po=function(a){const d=ie(a);if(d)for(let g=d.length-1;g>=0;--g){const k=d[g],A=k&&k.name;if(!(typeof A!="string"||B[U(A)]))try{a.removeAttribute(A)}catch{}}},fo=function(a){const d=[a];for(;d.length>0;){const g=d.pop();(j?j(g):g.nodeType)===he.element&&po(g);const A=v(g);if(A)for(let C=A.length-1;C>=0;--C)d.push(A[C])}},Fn=function(a){let d=null,g=null;if(zt)a="<remove></remove>"+a;else{const C=Qn(a,/^[\r\n\t ]+/);g=C&&C[0]}Qe==="application/xhtml+xml"&&Ue===fe&&(a='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+a+"</body></html>");const k=F?O(a):a;if(Ue===fe)try{d=new u().parseFromString(k,Qe)}catch{}if(!d||!d.documentElement){d=ae.createDocument(Ue,"template",null);try{d.documentElement.innerHTML=Wt?m:k}catch{}}const A=d.body||d.documentElement;return a&&g&&A.insertBefore(t.createTextNode(g),A.childNodes[0]||null),Ue===fe?Vs.call(d,Le?"html":"body")[0]:Le?d.documentElement:A},Hn=function(a){return ee.call(a.ownerDocument||a,a,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},yt=function(a){return a=tt(a,Zs," "),a=tt(a,Ks," "),a=tt(a,Xs," "),a},Zt=function(a){var d;a.normalize();const g=ee.call(a.ownerDocument||a,a,c.SHOW_TEXT|c.SHOW_COMMENT|c.SHOW_CDATA_SECTION|c.SHOW_PROCESSING_INSTRUCTION,null);let k=g.nextNode();for(;k;)k.data=yt(k.data),k=g.nextNode();const A=(d=a.querySelectorAll)===null||d===void 0?void 0:d.call(a,"template");A&&et(A,C=>{He(C.content)&&Zt(C.content)})},wt=function(a){const d=Z?Z(a):null;return typeof d!="string"||U(d)!=="form"?!1:typeof a.nodeName!="string"||typeof a.textContent!="string"||typeof a.removeChild!="function"||a.attributes!==ie(a)||typeof a.removeAttribute!="function"||typeof a.setAttribute!="function"||typeof a.namespaceURI!="string"||typeof a.insertBefore!="function"||typeof a.hasChildNodes!="function"||a.nodeType!==j(a)||a.childNodes!==v(a)},He=function(a){if(!j||typeof a!="object"||a===null)return!1;try{return j(a)===he.documentFragment}catch{return!1}},Je=function(a){if(!j||typeof a!="object"||a===null)return!1;try{return typeof j(a)=="number"}catch{return!1}};function ke(b,a,d){b.length!==0&&et(b,g=>{g.call(e,a,d,Fe)})}const ho=function(a,d){return!!(Xe&&a.hasChildNodes()&&!Je(a.firstElementChild)&&K(as,a.textContent)&&K(as,a.innerHTML)||Xe&&a.namespaceURI===fe&&d==="style"&&Je(a.firstElementChild)||a.nodeType===he.processingInstruction||Xe&&a.nodeType===he.comment&&K(nr,a.data))},mo=function(a,d){if(!Ke[d]&&Gn(d)&&(z.tagNameCheck instanceof RegExp&&K(z.tagNameCheck,d)||z.tagNameCheck instanceof Function&&z.tagNameCheck(d)))return!1;if(Ut&&!pe[d]){const g=_(a),k=v(a);if(k&&g){const A=k.length;for(let C=A-1;C>=0;--C){const q=Ft?k[C]:x(k[C],!0);g.insertBefore(q,E(a))}}}return Te(a),!0},jn=function(a){if(ke(H.beforeSanitizeElements,a,null),wt(a))return Te(a),!0;const d=U(Z?Z(a):a.nodeName);if(ke(H.uponSanitizeElement,a,{tagName:d,allowedTags:$}),ho(a,d))return Te(a),!0;if(Ke[d]||!(ve.tagCheck instanceof Function&&ve.tagCheck(d))&&!$[d])return mo(a,d);if((j?j(a):a.nodeType)===he.element&&!uo(a)||(d==="noscript"||d==="noembed"||d==="noframes")&&K(sr,a.innerHTML))return Te(a),!0;if(Ee&&a.nodeType===he.text){const k=yt(a.textContent);a.textContent!==k&&(je(e.removed,{element:a.cloneNode()}),a.textContent=k)}return ke(H.afterSanitizeElements,a,null),!1},Wn=function(a,d,g){if(Sn[d]||Ln&&(d==="id"||d==="name")&&(g in t||g in io))return!1;const k=B[d]||ve.attributeCheck instanceof Function&&ve.attributeCheck(d,a);if(!(Mt&&K(Qs,d))){if(!(An&&K(Js,d))){if(k){if(!jt[d]){if(!K(vn,tt(g,kn,""))){if(!((d==="src"||d==="xlink:href"||d==="href")&&a!=="script"&&Jn(g,"data:")===0&&On[a])){if(!(_n&&!K(eo,tt(g,kn,"")))){if(g)return!1}}}}}else if(!(Gn(a)&&(z.tagNameCheck instanceof RegExp&&K(z.tagNameCheck,a)||z.tagNameCheck instanceof Function&&z.tagNameCheck(a))&&(z.attributeNameCheck instanceof RegExp&&K(z.attributeNameCheck,d)||z.attributeNameCheck instanceof Function&&z.attributeNameCheck(d,a))||d==="is"&&z.allowCustomizedBuiltInElements&&(z.tagNameCheck instanceof RegExp&&K(z.tagNameCheck,g)||z.tagNameCheck instanceof Function&&z.tagNameCheck(g))))return!1}}return!0},go=L({},["annotation-xml","color-profile","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","missing-glyph"]),Gn=function(a){return!go[rt(a)]&&K(to,a)},bo=function(a,d,g,k){if(F&&typeof h=="object"&&typeof h.getAttributeType=="function"&&!g)switch(h.getAttributeType(a,d)){case"TrustedHTML":return O(k);case"TrustedScriptURL":return we(k)}return k},xo=function(a,d,g,k){try{g?a.setAttributeNS(g,d,k):a.setAttribute(d,k),wt(a)?Te(a):Xn(e.removed)}catch{Ce(d,a)}},qn=function(a){ke(H.beforeSanitizeAttributes,a,null);const d=a.attributes;if(!d||wt(a))return;const g={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:B,forceKeepAttr:void 0};let k=d.length;const A=U(a.nodeName);for(;k--;){const C=d[k],q=C.name,W=C.namespaceURI,le=C.value,ue=U(q),Xt=le;let te=q==="value"?Xt:Bo(Xt);if(g.attrName=ue,g.attrValue=te,g.keepAttr=!0,g.forceKeepAttr=void 0,ke(H.uponSanitizeAttribute,a,g),te=g.attrValue,Cn&&(ue==="id"||ue==="name")&&Jn(te,Rn)!==0&&(Ce(q,a),te=Rn+te),Xe&&K(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i,te)){Ce(q,a);continue}if(ue==="attributename"&&Qn(te,"href")){Ce(q,a);continue}if(!g.forceKeepAttr){if(!g.keepAttr){Ce(q,a);continue}if(!In&&K(or,te)){Ce(q,a);continue}if(Ee&&(te=yt(te)),!Wn(A,ue,te)){Ce(q,a);continue}te=bo(A,ue,W,te),te!==Xt&&xo(a,q,W,te)}}ke(H.afterSanitizeAttributes,a,null)},kt=function(a){let d=null;const g=Hn(a);for(ke(H.beforeSanitizeShadowDOM,a,null);d=g.nextNode();)if(ke(H.uponSanitizeShadowNode,d,null),jn(d),qn(d),He(d.content)&&kt(d.content),(j?j(d):d.nodeType)===he.element){const A=N(d);He(A)&&(Kt(A),kt(A))}ke(H.afterSanitizeShadowDOM,a,null)},Kt=function(a){const d=[{node:a,shadow:null}];for(;d.length>0;){const g=d.pop();if(g.shadow){kt(g.shadow);continue}const k=g.node,C=(j?j(k):k.nodeType)===he.element,q=v(k);if(q)for(let W=q.length-1;W>=0;--W)d.push({node:q[W],shadow:null});if(C){const W=Z?Z(k):null;if(typeof W=="string"&&U(W)==="template"){const le=k.content;He(le)&&d.push({node:le,shadow:null})}}if(C){const W=N(k);He(W)&&d.push({node:null,shadow:W},{node:W,shadow:null})}}};return e.sanitize=function(b){let a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},d=null,g=null,k=null,A=null;if(Wt=!b,Wt&&(b="<!-->"),typeof b!="string"&&!Je(b)&&(b=jo(b),typeof b!="string"))throw Re("dirty is not a string, aborting");if(!e.isSupported)return b;Pt?($=$t,B=Bt):Yt(a),(H.uponSanitizeElement.length>0||H.uponSanitizeAttribute.length>0)&&($=ne($)),H.uponSanitizeAttribute.length>0&&(B=ne(B)),e.removed=[];const C=Ft&&typeof b!="string"&&Je(b);if(C){const le=Z?Z(b):b.nodeName;if(typeof le=="string"){const ue=U(le);if(!$[ue]||Ke[ue])throw Re("root node is forbidden and cannot be sanitized in-place")}if(wt(b))throw Re("root node is clobbered and cannot be sanitized in-place");try{Kt(b)}catch(ue){throw Un(b),ue}}else if(Je(b))d=Fn("<!---->"),g=d.ownerDocument.importNode(b,!0),g.nodeType===he.element&&g.nodeName==="BODY"||g.nodeName==="HTML"?d=g:d.appendChild(g),Kt(g);else{if(!Be&&!Ee&&!Le&&b.indexOf("<")===-1)return F&&gt?O(b):b;if(d=Fn(b),!d)return Be?null:gt?m:""}d&&zt&&Te(d.firstChild);const q=Hn(C?b:d);try{for(;k=q.nextNode();)jn(k),qn(k),He(k.content)&&kt(k.content)}catch(le){throw C&&Un(b),le}if(C)return et(e.removed,le=>{le.element&&fo(le.element)}),Ee&&Zt(b),b;if(Be){if(Ee&&Zt(d),mt)for(A=qs.call(d.ownerDocument);d.firstChild;)A.appendChild(d.firstChild);else A=d;return(B.shadowroot||B.shadowrootmode)&&(A=Ys.call(n,A,!0)),A}let W=Le?d.outerHTML:d.innerHTML;return Le&&$["!doctype"]&&d.ownerDocument&&d.ownerDocument.doctype&&d.ownerDocument.doctype.name&&K(er,d.ownerDocument.doctype.name)&&(W="<!DOCTYPE "+d.ownerDocument.doctype.name+`>
`+W),Ee&&(W=yt(W)),F&&gt?O(W):W},e.setConfig=function(){let b=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Yt(b),Pt=!0,$t=$,Bt=B},e.clearConfig=function(){Fe=null,Pt=!1,$t=null,Bt=null,F=T,m=""},e.isValidAttribute=function(b,a,d){Fe||Yt({});const g=U(b),k=U(a);return Wn(g,k,d)},e.addHook=function(b,a){typeof a=="function"&&V(H,b)&&je(H[b],a)},e.removeHook=function(b,a){if(V(H,b)){if(a!==void 0){const d=Po(H[b],a);return d===-1?void 0:$o(H[b],d,1)[0]}return Xn(H[b])}},e.removeHooks=function(b){V(H,b)&&(H[b]=[])},e.removeAllHooks=function(){H=ls()},e}var ln=ks();function fn(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}let $e=fn();function vs(s){$e=s}const Es=/[&<>"']/,ar=new RegExp(Es.source,"g"),Ts=/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,lr=new RegExp(Ts.source,"g"),cr={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},cs=s=>cr[s];function re(s,e){if(e){if(Es.test(s))return s.replace(ar,cs)}else if(Ts.test(s))return s.replace(lr,cs);return s}const dr=/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;function ur(s){return s.replace(dr,(e,t)=>(t=t.toLowerCase(),t==="colon"?":":t.charAt(0)==="#"?t.charAt(1)==="x"?String.fromCharCode(parseInt(t.substring(2),16)):String.fromCharCode(+t.substring(1)):""))}const pr=/(^|[^\[])\^/g;function D(s,e){let t=typeof s=="string"?s:s.source;e=e||"";const n={replace:(o,i)=>{let r=typeof i=="string"?i:i.source;return r=r.replace(pr,"$1"),t=t.replace(o,r),n},getRegex:()=>new RegExp(t,e)};return n}function ds(s){try{s=encodeURI(s).replace(/%25/g,"%")}catch{return null}return s}const at={exec:()=>null};function us(s,e){const t=s.replace(/\|/g,(i,r,l)=>{let c=!1,f=r;for(;--f>=0&&l[f]==="\\";)c=!c;return c?"|":" |"}),n=t.split(/ \|/);let o=0;if(n[0].trim()||n.shift(),n.length>0&&!n[n.length-1].trim()&&n.pop(),e)if(n.length>e)n.splice(e);else for(;n.length<e;)n.push("");for(;o<n.length;o++)n[o]=n[o].trim().replace(/\\\|/g,"|");return n}function Tt(s,e,t){const n=s.length;if(n===0)return"";let o=0;for(;o<n&&s.charAt(n-o-1)===e;)o++;return s.slice(0,n-o)}function fr(s,e){if(s.indexOf(e[1])===-1)return-1;let t=0;for(let n=0;n<s.length;n++)if(s[n]==="\\")n++;else if(s[n]===e[0])t++;else if(s[n]===e[1]&&(t--,t<0))return n;return-1}function ps(s,e,t,n){const o=e.href,i=e.title?re(e.title):null,r=s[1].replace(/\\([\[\]])/g,"$1");if(s[0].charAt(0)!=="!"){n.state.inLink=!0;const l={type:"link",raw:t,href:o,title:i,text:r,tokens:n.inlineTokens(r)};return n.state.inLink=!1,l}return{type:"image",raw:t,href:o,title:i,text:re(r)}}function hr(s,e){const t=s.match(/^(\s+)(?:```)/);if(t===null)return e;const n=t[1];return e.split(`
`).map(o=>{const i=o.match(/^\s+/);if(i===null)return o;const[r]=i;return r.length>=n.length?o.slice(n.length):o}).join(`
`)}class Ct{constructor(e){P(this,"options");P(this,"rules");P(this,"lexer");this.options=e||$e}space(e){const t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){const t=this.rules.block.code.exec(e);if(t){const n=t[0].replace(/^ {1,4}/gm,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:Tt(n,`
`)}}}fences(e){const t=this.rules.block.fences.exec(e);if(t){const n=t[0],o=hr(n,t[3]||"");return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:o}}}heading(e){const t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(/#$/.test(n)){const o=Tt(n,"#");(this.options.pedantic||!o||/ $/.test(o))&&(n=o.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){const t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:t[0]}}blockquote(e){const t=this.rules.block.blockquote.exec(e);if(t){let n=t[0].replace(/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,`
    $1`);n=Tt(n.replace(/^ *>[ \t]?/gm,""),`
`);const o=this.lexer.state.top;this.lexer.state.top=!0;const i=this.lexer.blockTokens(n);return this.lexer.state.top=o,{type:"blockquote",raw:t[0],tokens:i,text:n}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim();const o=n.length>1,i={type:"list",raw:"",ordered:o,start:o?+n.slice(0,-1):"",loose:!1,items:[]};n=o?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=o?n:"[*+-]");const r=new RegExp(`^( {0,3}${n})((?:[	 ][^\\n]*)?(?:\\n|$))`);let l="",c="",f=!1;for(;e;){let u=!1;if(!(t=r.exec(e))||this.rules.block.hr.test(e))break;l=t[0],e=e.substring(l.length);let h=t[2].split(`
`,1)[0].replace(/^\t+/,_=>" ".repeat(3*_.length)),p=e.split(`
`,1)[0],x=0;this.options.pedantic?(x=2,c=h.trimStart()):(x=t[2].search(/[^ ]/),x=x>4?1:x,c=h.slice(x),x+=t[1].length);let w=!1;if(!h&&/^ *$/.test(p)&&(l+=p+`
`,e=e.substring(p.length+1),u=!0),!u){const _=new RegExp(`^ {0,${Math.min(3,x-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),N=new RegExp(`^ {0,${Math.min(3,x-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),ie=new RegExp(`^ {0,${Math.min(3,x-1)}}(?:\`\`\`|~~~)`),j=new RegExp(`^ {0,${Math.min(3,x-1)}}#`);for(;e;){const Z=e.split(`
`,1)[0];if(p=Z,this.options.pedantic&&(p=p.replace(/^ {1,4}(?=( {4})*[^ ])/g,"  ")),ie.test(p)||j.test(p)||_.test(p)||N.test(e))break;if(p.search(/[^ ]/)>=x||!p.trim())c+=`
`+p.slice(x);else{if(w||h.search(/[^ ]/)>=4||ie.test(h)||j.test(h)||N.test(h))break;c+=`
`+p}!w&&!p.trim()&&(w=!0),l+=Z+`
`,e=e.substring(Z.length+1),h=p.slice(x)}}i.loose||(f?i.loose=!0:/\n *\n *$/.test(l)&&(f=!0));let E=null,v;this.options.gfm&&(E=/^\[[ xX]\] /.exec(c),E&&(v=E[0]!=="[ ] ",c=c.replace(/^\[[ xX]\] +/,""))),i.items.push({type:"list_item",raw:l,task:!!E,checked:v,loose:!1,text:c,tokens:[]}),i.raw+=l}i.items[i.items.length-1].raw=l.trimEnd(),i.items[i.items.length-1].text=c.trimEnd(),i.raw=i.raw.trimEnd();for(let u=0;u<i.items.length;u++)if(this.lexer.state.top=!1,i.items[u].tokens=this.lexer.blockTokens(i.items[u].text,[]),!i.loose){const h=i.items[u].tokens.filter(x=>x.type==="space"),p=h.length>0&&h.some(x=>/\n.*\n/.test(x.raw));i.loose=p}if(i.loose)for(let u=0;u<i.items.length;u++)i.items[u].loose=!0;return i}}html(e){const t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){const t=this.rules.block.def.exec(e);if(t){const n=t[1].toLowerCase().replace(/\s+/g," "),o=t[2]?t[2].replace(/^<(.*)>$/,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",i=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:o,title:i}}}table(e){const t=this.rules.block.table.exec(e);if(!t||!/[:|]/.test(t[2]))return;const n=us(t[1]),o=t[2].replace(/^\||\| *$/g,"").split("|"),i=t[3]&&t[3].trim()?t[3].replace(/\n[ \t]*$/,"").split(`
`):[],r={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===o.length){for(const l of o)/^ *-+: *$/.test(l)?r.align.push("right"):/^ *:-+: *$/.test(l)?r.align.push("center"):/^ *:-+ *$/.test(l)?r.align.push("left"):r.align.push(null);for(const l of n)r.header.push({text:l,tokens:this.lexer.inline(l)});for(const l of i)r.rows.push(us(l,r.header.length).map(c=>({text:c,tokens:this.lexer.inline(c)})));return r}}lheading(e){const t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){const t=this.rules.block.paragraph.exec(e);if(t){const n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){const t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){const t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:re(t[1])}}tag(e){const t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&/^<a /i.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&/^<\/a>/i.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&/^<(pre|code|kbd|script)(\s|>)/i.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&/^<\/(pre|code|kbd|script)(\s|>)/i.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){const t=this.rules.inline.link.exec(e);if(t){const n=t[2].trim();if(!this.options.pedantic&&/^</.test(n)){if(!/>$/.test(n))return;const r=Tt(n.slice(0,-1),"\\");if((n.length-r.length)%2===0)return}else{const r=fr(t[2],"()");if(r>-1){const c=(t[0].indexOf("!")===0?5:4)+t[1].length+r;t[2]=t[2].substring(0,r),t[0]=t[0].substring(0,c).trim(),t[3]=""}}let o=t[2],i="";if(this.options.pedantic){const r=/^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(o);r&&(o=r[1],i=r[3])}else i=t[3]?t[3].slice(1,-1):"";return o=o.trim(),/^</.test(o)&&(this.options.pedantic&&!/>$/.test(n)?o=o.slice(1):o=o.slice(1,-1)),ps(t,{href:o&&o.replace(this.rules.inline.anyPunctuation,"$1"),title:i&&i.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){const o=(n[2]||n[1]).replace(/\s+/g," "),i=t[o.toLowerCase()];if(!i){const r=n[0].charAt(0);return{type:"text",raw:r,text:r}}return ps(n,i,n[0],this.lexer)}}emStrong(e,t,n=""){let o=this.rules.inline.emStrongLDelim.exec(e);if(!o||o[3]&&n.match(/[\p{L}\p{N}]/u))return;if(!(o[1]||o[2]||"")||!n||this.rules.inline.punctuation.exec(n)){const r=[...o[0]].length-1;let l,c,f=r,u=0;const h=o[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(h.lastIndex=0,t=t.slice(-1*e.length+r);(o=h.exec(t))!=null;){if(l=o[1]||o[2]||o[3]||o[4]||o[5]||o[6],!l)continue;if(c=[...l].length,o[3]||o[4]){f+=c;continue}else if((o[5]||o[6])&&r%3&&!((r+c)%3)){u+=c;continue}if(f-=c,f>0)continue;c=Math.min(c,c+f+u);const p=[...o[0]][0].length,x=e.slice(0,r+o.index+p+c);if(Math.min(r,c)%2){const E=x.slice(1,-1);return{type:"em",raw:x,text:E,tokens:this.lexer.inlineTokens(E)}}const w=x.slice(2,-2);return{type:"strong",raw:x,text:w,tokens:this.lexer.inlineTokens(w)}}}}codespan(e){const t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(/\n/g," ");const o=/[^ ]/.test(n),i=/^ /.test(n)&&/ $/.test(n);return o&&i&&(n=n.substring(1,n.length-1)),n=re(n,!0),{type:"codespan",raw:t[0],text:n}}}br(e){const t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){const t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){const t=this.rules.inline.autolink.exec(e);if(t){let n,o;return t[2]==="@"?(n=re(t[1]),o="mailto:"+n):(n=re(t[1]),o=n),{type:"link",raw:t[0],text:n,href:o,tokens:[{type:"text",raw:n,text:n}]}}}url(e){var n;let t;if(t=this.rules.inline.url.exec(e)){let o,i;if(t[2]==="@")o=re(t[0]),i="mailto:"+o;else{let r;do r=t[0],t[0]=((n=this.rules.inline._backpedal.exec(t[0]))==null?void 0:n[0])??"";while(r!==t[0]);o=re(t[0]),t[1]==="www."?i="http://"+t[0]:i=t[0]}return{type:"link",raw:t[0],text:o,href:i,tokens:[{type:"text",raw:o,text:o}]}}}inlineText(e){const t=this.rules.inline.text.exec(e);if(t){let n;return this.lexer.state.inRawBlock?n=t[0]:n=re(t[0]),{type:"text",raw:t[0],text:n}}}}const mr=/^(?: *(?:\n|$))+/,gr=/^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,br=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,ft=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,xr=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Ss=/(?:[*+-]|\d{1,9}[.)])/,As=D(/^(?!bull |blockCode|fences|blockquote|heading|html)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html))+?)\n {0,3}(=+|-+) *(?:\n+|$)/).replace(/bull/g,Ss).replace(/blockCode/g,/ {4}/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).getRegex(),hn=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,yr=/^[^\n]+/,mn=/(?!\s*\])(?:\\.|[^\[\]\\])+/,wr=D(/^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/).replace("label",mn).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),kr=D(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Ss).getRegex(),Nt="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",gn=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,vr=D("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))","i").replace("comment",gn).replace("tag",Nt).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),_s=D(hn).replace("hr",ft).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Nt).getRegex(),Er=D(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",_s).getRegex(),bn={blockquote:Er,code:gr,def:wr,fences:br,heading:xr,hr:ft,html:vr,lheading:As,list:kr,newline:mr,paragraph:_s,table:at,text:yr},fs=D("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",ft).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code"," {4}[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Nt).getRegex(),Tr={...bn,table:fs,paragraph:D(hn).replace("hr",ft).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",fs).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Nt).getRegex()},Sr={...bn,html:D(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",gn).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:at,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:D(hn).replace("hr",ft).replace("heading",` *#{1,6} *[^
]`).replace("lheading",As).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Is=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Ar=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Ls=/^( {2,}|\\)\n(?!\s*$)/,_r=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,ht="\\p{P}\\p{S}",Ir=D(/^((?![*_])[\spunctuation])/,"u").replace(/punctuation/g,ht).getRegex(),Lr=/\[[^[\]]*?\]\([^\(\)]*?\)|`[^`]*?`|<[^<>]*?>/g,Cr=D(/^(?:\*+(?:((?!\*)[punct])|[^\s*]))|^_+(?:((?!_)[punct])|([^\s_]))/,"u").replace(/punct/g,ht).getRegex(),Rr=D("^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)[punct](\\*+)(?=[\\s]|$)|[^punct\\s](\\*+)(?!\\*)(?=[punct\\s]|$)|(?!\\*)[punct\\s](\\*+)(?=[^punct\\s])|[\\s](\\*+)(?!\\*)(?=[punct])|(?!\\*)[punct](\\*+)(?!\\*)(?=[punct])|[^punct\\s](\\*+)(?=[^punct\\s])","gu").replace(/punct/g,ht).getRegex(),Or=D("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)[punct](_+)(?=[\\s]|$)|[^punct\\s](_+)(?!_)(?=[punct\\s]|$)|(?!_)[punct\\s](_+)(?=[^punct\\s])|[\\s](_+)(?!_)(?=[punct])|(?!_)[punct](_+)(?!_)(?=[punct])","gu").replace(/punct/g,ht).getRegex(),Dr=D(/\\([punct])/,"gu").replace(/punct/g,ht).getRegex(),Nr=D(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Mr=D(gn).replace("(?:-->|$)","-->").getRegex(),Pr=D("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Mr).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Rt=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,$r=D(/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/).replace("label",Rt).replace("href",/<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Cs=D(/^!?\[(label)\]\[(ref)\]/).replace("label",Rt).replace("ref",mn).getRegex(),Rs=D(/^!?\[(ref)\](?:\[\])?/).replace("ref",mn).getRegex(),Br=D("reflink|nolink(?!\\()","g").replace("reflink",Cs).replace("nolink",Rs).getRegex(),xn={_backpedal:at,anyPunctuation:Dr,autolink:Nr,blockSkip:Lr,br:Ls,code:Ar,del:at,emStrongLDelim:Cr,emStrongRDelimAst:Rr,emStrongRDelimUnd:Or,escape:Is,link:$r,nolink:Rs,punctuation:Ir,reflink:Cs,reflinkSearch:Br,tag:Pr,text:_r,url:at},zr={...xn,link:D(/^!?\[(label)\]\((.*?)\)/).replace("label",Rt).getRegex(),reflink:D(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Rt).getRegex()},cn={...xn,escape:D(Is).replace("])","~|])").getRegex(),url:D(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},Ur={...cn,br:D(Ls).replace("{2,}","*").getRegex(),text:D(cn.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},St={normal:bn,gfm:Tr,pedantic:Sr},st={normal:xn,gfm:cn,breaks:Ur,pedantic:zr};class be{constructor(e){P(this,"tokens");P(this,"options");P(this,"state");P(this,"tokenizer");P(this,"inlineQueue");this.tokens=[],this.tokens.links=Object.create(null),this.options=e||$e,this.options.tokenizer=this.options.tokenizer||new Ct,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const t={block:St.normal,inline:st.normal};this.options.pedantic?(t.block=St.pedantic,t.inline=st.pedantic):this.options.gfm&&(t.block=St.gfm,this.options.breaks?t.inline=st.breaks:t.inline=st.gfm),this.tokenizer.rules=t}static get rules(){return{block:St,inline:st}}static lex(e,t){return new be(t).lex(e)}static lexInline(e,t){return new be(t).inlineTokens(e)}lex(e){e=e.replace(/\r\n|\r/g,`
`),this.blockTokens(e,this.tokens);for(let t=0;t<this.inlineQueue.length;t++){const n=this.inlineQueue[t];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,t=[]){this.options.pedantic?e=e.replace(/\t/g,"    ").replace(/^ +$/gm,""):e=e.replace(/^( *)(\t+)/gm,(l,c,f)=>c+"    ".repeat(f.length));let n,o,i,r;for(;e;)if(!(this.options.extensions&&this.options.extensions.block&&this.options.extensions.block.some(l=>(n=l.call({lexer:this},e,t))?(e=e.substring(n.raw.length),t.push(n),!0):!1))){if(n=this.tokenizer.space(e)){e=e.substring(n.raw.length),n.raw.length===1&&t.length>0?t[t.length-1].raw+=`
`:t.push(n);continue}if(n=this.tokenizer.code(e)){e=e.substring(n.raw.length),o=t[t.length-1],o&&(o.type==="paragraph"||o.type==="text")?(o.raw+=`
`+n.raw,o.text+=`
`+n.text,this.inlineQueue[this.inlineQueue.length-1].src=o.text):t.push(n);continue}if(n=this.tokenizer.fences(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.heading(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.hr(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.blockquote(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.list(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.html(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.def(e)){e=e.substring(n.raw.length),o=t[t.length-1],o&&(o.type==="paragraph"||o.type==="text")?(o.raw+=`
`+n.raw,o.text+=`
`+n.raw,this.inlineQueue[this.inlineQueue.length-1].src=o.text):this.tokens.links[n.tag]||(this.tokens.links[n.tag]={href:n.href,title:n.title});continue}if(n=this.tokenizer.table(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.lheading(e)){e=e.substring(n.raw.length),t.push(n);continue}if(i=e,this.options.extensions&&this.options.extensions.startBlock){let l=1/0;const c=e.slice(1);let f;this.options.extensions.startBlock.forEach(u=>{f=u.call({lexer:this},c),typeof f=="number"&&f>=0&&(l=Math.min(l,f))}),l<1/0&&l>=0&&(i=e.substring(0,l+1))}if(this.state.top&&(n=this.tokenizer.paragraph(i))){o=t[t.length-1],r&&o.type==="paragraph"?(o.raw+=`
`+n.raw,o.text+=`
`+n.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=o.text):t.push(n),r=i.length!==e.length,e=e.substring(n.raw.length);continue}if(n=this.tokenizer.text(e)){e=e.substring(n.raw.length),o=t[t.length-1],o&&o.type==="text"?(o.raw+=`
`+n.raw,o.text+=`
`+n.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=o.text):t.push(n);continue}if(e){const l="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(l);break}else throw new Error(l)}}return this.state.top=!0,t}inline(e,t=[]){return this.inlineQueue.push({src:e,tokens:t}),t}inlineTokens(e,t=[]){let n,o,i,r=e,l,c,f;if(this.tokens.links){const u=Object.keys(this.tokens.links);if(u.length>0)for(;(l=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)u.includes(l[0].slice(l[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,l.index)+"["+"a".repeat(l[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(l=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)r=r.slice(0,l.index)+"["+"a".repeat(l[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);for(;(l=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,l.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;e;)if(c||(f=""),c=!1,!(this.options.extensions&&this.options.extensions.inline&&this.options.extensions.inline.some(u=>(n=u.call({lexer:this},e,t))?(e=e.substring(n.raw.length),t.push(n),!0):!1))){if(n=this.tokenizer.escape(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.tag(e)){e=e.substring(n.raw.length),o=t[t.length-1],o&&n.type==="text"&&o.type==="text"?(o.raw+=n.raw,o.text+=n.text):t.push(n);continue}if(n=this.tokenizer.link(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(n.raw.length),o=t[t.length-1],o&&n.type==="text"&&o.type==="text"?(o.raw+=n.raw,o.text+=n.text):t.push(n);continue}if(n=this.tokenizer.emStrong(e,r,f)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.codespan(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.br(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.del(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.autolink(e)){e=e.substring(n.raw.length),t.push(n);continue}if(!this.state.inLink&&(n=this.tokenizer.url(e))){e=e.substring(n.raw.length),t.push(n);continue}if(i=e,this.options.extensions&&this.options.extensions.startInline){let u=1/0;const h=e.slice(1);let p;this.options.extensions.startInline.forEach(x=>{p=x.call({lexer:this},h),typeof p=="number"&&p>=0&&(u=Math.min(u,p))}),u<1/0&&u>=0&&(i=e.substring(0,u+1))}if(n=this.tokenizer.inlineText(i)){e=e.substring(n.raw.length),n.raw.slice(-1)!=="_"&&(f=n.raw.slice(-1)),c=!0,o=t[t.length-1],o&&o.type==="text"?(o.raw+=n.raw,o.text+=n.text):t.push(n);continue}if(e){const u="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(u);break}else throw new Error(u)}}return t}}class Ot{constructor(e){P(this,"options");this.options=e||$e}code(e,t,n){var i;const o=(i=(t||"").match(/^\S*/))==null?void 0:i[0];return e=e.replace(/\n$/,"")+`
`,o?'<pre><code class="language-'+re(o)+'">'+(n?e:re(e,!0))+`</code></pre>
`:"<pre><code>"+(n?e:re(e,!0))+`</code></pre>
`}blockquote(e){return`<blockquote>
${e}</blockquote>
`}html(e,t){return e}heading(e,t,n){return`<h${t}>${e}</h${t}>
`}hr(){return`<hr>
`}list(e,t,n){const o=t?"ol":"ul",i=t&&n!==1?' start="'+n+'"':"";return"<"+o+i+`>
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
`}strong(e){return`<strong>${e}</strong>`}em(e){return`<em>${e}</em>`}codespan(e){return`<code>${e}</code>`}br(){return"<br>"}del(e){return`<del>${e}</del>`}link(e,t,n){const o=ds(e);if(o===null)return n;e=o;let i='<a href="'+e+'"';return t&&(i+=' title="'+t+'"'),i+=">"+n+"</a>",i}image(e,t,n){const o=ds(e);if(o===null)return n;e=o;let i=`<img src="${e}" alt="${n}"`;return t&&(i+=` title="${t}"`),i+=">",i}text(e){return e}}class yn{strong(e){return e}em(e){return e}codespan(e){return e}del(e){return e}html(e){return e}text(e){return e}link(e,t,n){return""+n}image(e,t,n){return""+n}br(){return""}}class xe{constructor(e){P(this,"options");P(this,"renderer");P(this,"textRenderer");this.options=e||$e,this.options.renderer=this.options.renderer||new Ot,this.renderer=this.options.renderer,this.renderer.options=this.options,this.textRenderer=new yn}static parse(e,t){return new xe(t).parse(e)}static parseInline(e,t){return new xe(t).parseInline(e)}parse(e,t=!0){let n="";for(let o=0;o<e.length;o++){const i=e[o];if(this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[i.type]){const r=i,l=this.options.extensions.renderers[r.type].call({parser:this},r);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(r.type)){n+=l||"";continue}}switch(i.type){case"space":continue;case"hr":{n+=this.renderer.hr();continue}case"heading":{const r=i;n+=this.renderer.heading(this.parseInline(r.tokens),r.depth,ur(this.parseInline(r.tokens,this.textRenderer)));continue}case"code":{const r=i;n+=this.renderer.code(r.text,r.lang,!!r.escaped);continue}case"table":{const r=i;let l="",c="";for(let u=0;u<r.header.length;u++)c+=this.renderer.tablecell(this.parseInline(r.header[u].tokens),{header:!0,align:r.align[u]});l+=this.renderer.tablerow(c);let f="";for(let u=0;u<r.rows.length;u++){const h=r.rows[u];c="";for(let p=0;p<h.length;p++)c+=this.renderer.tablecell(this.parseInline(h[p].tokens),{header:!1,align:r.align[p]});f+=this.renderer.tablerow(c)}n+=this.renderer.table(l,f);continue}case"blockquote":{const r=i,l=this.parse(r.tokens);n+=this.renderer.blockquote(l);continue}case"list":{const r=i,l=r.ordered,c=r.start,f=r.loose;let u="";for(let h=0;h<r.items.length;h++){const p=r.items[h],x=p.checked,w=p.task;let E="";if(p.task){const v=this.renderer.checkbox(!!x);f?p.tokens.length>0&&p.tokens[0].type==="paragraph"?(p.tokens[0].text=v+" "+p.tokens[0].text,p.tokens[0].tokens&&p.tokens[0].tokens.length>0&&p.tokens[0].tokens[0].type==="text"&&(p.tokens[0].tokens[0].text=v+" "+p.tokens[0].tokens[0].text)):p.tokens.unshift({type:"text",text:v+" "}):E+=v+" "}E+=this.parse(p.tokens,f),u+=this.renderer.listitem(E,w,!!x)}n+=this.renderer.list(u,l,c);continue}case"html":{const r=i;n+=this.renderer.html(r.text,r.block);continue}case"paragraph":{const r=i;n+=this.renderer.paragraph(this.parseInline(r.tokens));continue}case"text":{let r=i,l=r.tokens?this.parseInline(r.tokens):r.text;for(;o+1<e.length&&e[o+1].type==="text";)r=e[++o],l+=`
`+(r.tokens?this.parseInline(r.tokens):r.text);n+=t?this.renderer.paragraph(l):l;continue}default:{const r='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(r),"";throw new Error(r)}}}return n}parseInline(e,t){t=t||this.renderer;let n="";for(let o=0;o<e.length;o++){const i=e[o];if(this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[i.type]){const r=this.options.extensions.renderers[i.type].call({parser:this},i);if(r!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(i.type)){n+=r||"";continue}}switch(i.type){case"escape":{const r=i;n+=t.text(r.text);break}case"html":{const r=i;n+=t.html(r.text);break}case"link":{const r=i;n+=t.link(r.href,r.title,this.parseInline(r.tokens,t));break}case"image":{const r=i;n+=t.image(r.href,r.title,r.text);break}case"strong":{const r=i;n+=t.strong(this.parseInline(r.tokens,t));break}case"em":{const r=i;n+=t.em(this.parseInline(r.tokens,t));break}case"codespan":{const r=i;n+=t.codespan(r.text);break}case"br":{n+=t.br();break}case"del":{const r=i;n+=t.del(this.parseInline(r.tokens,t));break}case"text":{const r=i;n+=t.text(r.text);break}default:{const r='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(r),"";throw new Error(r)}}}return n}}class lt{constructor(e){P(this,"options");this.options=e||$e}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}}P(lt,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens"]));var Me,dn,Os;class Fr{constructor(...e){Yn(this,Me);P(this,"defaults",fn());P(this,"options",this.setOptions);P(this,"parse",vt(this,Me,dn).call(this,be.lex,xe.parse));P(this,"parseInline",vt(this,Me,dn).call(this,be.lexInline,xe.parseInline));P(this,"Parser",xe);P(this,"Renderer",Ot);P(this,"TextRenderer",yn);P(this,"Lexer",be);P(this,"Tokenizer",Ct);P(this,"Hooks",lt);this.use(...e)}walkTokens(e,t){var o,i;let n=[];for(const r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{const l=r;for(const c of l.header)n=n.concat(this.walkTokens(c.tokens,t));for(const c of l.rows)for(const f of c)n=n.concat(this.walkTokens(f.tokens,t));break}case"list":{const l=r;n=n.concat(this.walkTokens(l.items,t));break}default:{const l=r;(i=(o=this.defaults.extensions)==null?void 0:o.childTokens)!=null&&i[l.type]?this.defaults.extensions.childTokens[l.type].forEach(c=>{const f=l[c].flat(1/0);n=n.concat(this.walkTokens(f,t))}):l.tokens&&(n=n.concat(this.walkTokens(l.tokens,t)))}}return n}use(...e){const t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{const o={...n};if(o.async=this.defaults.async||o.async||!1,n.extensions&&(n.extensions.forEach(i=>{if(!i.name)throw new Error("extension name required");if("renderer"in i){const r=t.renderers[i.name];r?t.renderers[i.name]=function(...l){let c=i.renderer.apply(this,l);return c===!1&&(c=r.apply(this,l)),c}:t.renderers[i.name]=i.renderer}if("tokenizer"in i){if(!i.level||i.level!=="block"&&i.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");const r=t[i.level];r?r.unshift(i.tokenizer):t[i.level]=[i.tokenizer],i.start&&(i.level==="block"?t.startBlock?t.startBlock.push(i.start):t.startBlock=[i.start]:i.level==="inline"&&(t.startInline?t.startInline.push(i.start):t.startInline=[i.start]))}"childTokens"in i&&i.childTokens&&(t.childTokens[i.name]=i.childTokens)}),o.extensions=t),n.renderer){const i=this.defaults.renderer||new Ot(this.defaults);for(const r in n.renderer){if(!(r in i))throw new Error(`renderer '${r}' does not exist`);if(r==="options")continue;const l=r,c=n.renderer[l],f=i[l];i[l]=(...u)=>{let h=c.apply(i,u);return h===!1&&(h=f.apply(i,u)),h||""}}o.renderer=i}if(n.tokenizer){const i=this.defaults.tokenizer||new Ct(this.defaults);for(const r in n.tokenizer){if(!(r in i))throw new Error(`tokenizer '${r}' does not exist`);if(["options","rules","lexer"].includes(r))continue;const l=r,c=n.tokenizer[l],f=i[l];i[l]=(...u)=>{let h=c.apply(i,u);return h===!1&&(h=f.apply(i,u)),h}}o.tokenizer=i}if(n.hooks){const i=this.defaults.hooks||new lt;for(const r in n.hooks){if(!(r in i))throw new Error(`hook '${r}' does not exist`);if(r==="options")continue;const l=r,c=n.hooks[l],f=i[l];lt.passThroughHooks.has(r)?i[l]=u=>{if(this.defaults.async)return Promise.resolve(c.call(i,u)).then(p=>f.call(i,p));const h=c.call(i,u);return f.call(i,h)}:i[l]=(...u)=>{let h=c.apply(i,u);return h===!1&&(h=f.apply(i,u)),h}}o.hooks=i}if(n.walkTokens){const i=this.defaults.walkTokens,r=n.walkTokens;o.walkTokens=function(l){let c=[];return c.push(r.call(this,l)),i&&(c=c.concat(i.call(this,l))),c}}this.defaults={...this.defaults,...o}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return be.lex(e,t??this.defaults)}parser(e,t){return xe.parse(e,t??this.defaults)}}Me=new WeakSet,dn=function(e,t){return(n,o)=>{const i={...o},r={...this.defaults,...i};this.defaults.async===!0&&i.async===!1&&(r.silent||console.warn("marked(): The async option was set to true by an extension. The async: false option sent to parse will be ignored."),r.async=!0);const l=vt(this,Me,Os).call(this,!!r.silent,!!r.async);if(typeof n>"u"||n===null)return l(new Error("marked(): input parameter is undefined or null"));if(typeof n!="string")return l(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(n)+", string expected"));if(r.hooks&&(r.hooks.options=r),r.async)return Promise.resolve(r.hooks?r.hooks.preprocess(n):n).then(c=>e(c,r)).then(c=>r.hooks?r.hooks.processAllTokens(c):c).then(c=>r.walkTokens?Promise.all(this.walkTokens(c,r.walkTokens)).then(()=>c):c).then(c=>t(c,r)).then(c=>r.hooks?r.hooks.postprocess(c):c).catch(l);try{r.hooks&&(n=r.hooks.preprocess(n));let c=e(n,r);r.hooks&&(c=r.hooks.processAllTokens(c)),r.walkTokens&&this.walkTokens(c,r.walkTokens);let f=t(c,r);return r.hooks&&(f=r.hooks.postprocess(f)),f}catch(c){return l(c)}}},Os=function(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){const o="<p>An error occurred:</p><pre>"+re(n.message+"",!0)+"</pre>";return t?Promise.resolve(o):o}if(t)return Promise.reject(n);throw n}};const Oe=new Fr;function R(s,e){return Oe.parse(s,e)}R.options=R.setOptions=function(s){return Oe.setOptions(s),R.defaults=Oe.defaults,vs(R.defaults),R};R.getDefaults=fn;R.defaults=$e;R.use=function(...s){return Oe.use(...s),R.defaults=Oe.defaults,vs(R.defaults),R};R.walkTokens=function(s,e){return Oe.walkTokens(s,e)};R.parseInline=Oe.parseInline;R.Parser=xe;R.parser=xe.parse;R.Renderer=Ot;R.TextRenderer=yn;R.Lexer=be;R.lexer=be.lex;R.Tokenizer=Ct;R.Hooks=lt;R.parse=R;R.options;R.setOptions;R.use;R.walkTokens;R.parseInline;xe.parse;be.lex;const Ye=new R.Renderer,Hr=Ye.link.bind(Ye);Ye.link=(s,e,t)=>Hr(s,e,t).replace("<a ",'<a target="_blank" rel="noopener noreferrer" class="text-teal-400 hover:underline" ');Ye.heading=(s,e)=>{const t=s.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");return`<h${e} id="${t}">${s}</h${e}>`};Ye.table=(s,e)=>`<div class="overflow-x-auto my-4 max-w-full"><table class="w-full">${s}${e}</table></div>`;R.setOptions({renderer:Ye,gfm:!0,breaks:!0});function Ds(){try{return parseInt(localStorage.getItem("secops-sanitize-count")||"0",10)}catch{return 0}}function Ns(){try{const s=Ds();localStorage.setItem("secops-sanitize-count",(s+1).toString())}catch{}}function wn(s){Ns();const e=R.parse(s);return ln.sanitize(e,{ALLOWED_TAGS:["h1","h2","h3","h4","h5","h6","p","br","hr","a","span","ul","ol","li","strong","em","code","pre","blockquote","table","thead","tbody","tr","th","td","div"],ALLOWED_ATTR:["href","target","rel","class","id","align"]})}function At(s){return s.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F\u200B-\u200D\uFEFF\u202A-\u202E]/g,"")}function M(s){return s.replace(/[&<>"']/g,e=>{switch(e){case"&":return"&amp;";case"<":return"&lt;";case">":return"&gt;";case'"':return"&quot;";case"'":return"&#039;";default:return e}})}function jr(s){if(Ns(),typeof s!="object"||s===null)throw new Error("Invalid backup structure: Root must be an object.");const{slug:e,title:t,content:n,updatedAt:o,tags:i}=s;if(typeof e!="string"||!/^[a-z0-9-_]+$/.test(e))throw new Error("Invalid slug format: Slugs must contain only lowercase alphanumeric characters, hyphens, and underscores.");const r=At(e);if(typeof t!="string"||t.trim().length===0||t.length>100)throw new Error("Invalid title format: Must be a non-empty string under 100 characters.");const l=At(t);if(typeof n!="string"||n.length>5e4)throw new Error("Invalid content format: Must be a string under 50,000 characters.");if(typeof o!="number"||isNaN(o))throw new Error("Invalid updated timestamp format.");if(!Array.isArray(i))throw new Error("Tags must be an array of strings.");const c=i.map(f=>{if(typeof f!="string")throw new Error("Tags must be strings.");return At(ln.sanitize(f)).slice(0,30)});return{slug:r,title:ln.sanitize(l),content:n,updatedAt:o,tags:c,isSystem:!!s.isSystem}}async function Ms(s){const e=new TextEncoder,t=e.encode("secops-intel-salt-2026"),n=await window.crypto.subtle.importKey("raw",e.encode(s),{name:"PBKDF2"},!1,["deriveKey"]);return window.crypto.subtle.deriveKey({name:"PBKDF2",salt:t,iterations:1e5,hash:"SHA-256"},n,{name:"AES-GCM",length:256},!1,["encrypt","decrypt"])}async function Ps(s,e){const t=new TextEncoder,n=window.crypto.getRandomValues(new Uint8Array(12)),o=await window.crypto.subtle.encrypt({name:"AES-GCM",iv:n},e,t.encode(s)),i=Array.from(n).map(f=>f.toString(16).padStart(2,"0")).join(""),r=new Uint8Array(o);let l="";for(let f=0;f<r.byteLength;f++)l+=String.fromCharCode(r[f]);const c=btoa(l);return`${i}:${c}`}async function De(s,e){const t=s.split(":");if(t.length!==2)throw new Error("Invalid cipher format");const[n,o]=t,i=new Uint8Array(n.match(/.{1,2}/g).map(f=>parseInt(f,16))),r=atob(o),l=new Uint8Array(r.length);for(let f=0;f<r.length;f++)l[f]=r.charCodeAt(f);const c=await window.crypto.subtle.decrypt({name:"AES-GCM",iv:i},e,l);return new TextDecoder().decode(c)}let se="home",qe=!1,ge=!1,Ae="",ot="",de=[],it=null,$s=navigator.onLine?"SECURE_LINK":"OFFLINE_CACHE",Ve=localStorage.getItem("secops-wiki-theme")||"dark",Y=null,sn=!1,ce=0,_t=!1,It=-1,un="";function Bs(){const s=document.documentElement,e=document.getElementById("theme-icon-path");Ve==="light"?(s.classList.add("light-theme"),e&&e.setAttribute("d","M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z")):(s.classList.remove("light-theme"),e&&e.setAttribute("d","M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z"))}function zs(){Ve=Ve==="dark"?"light":"dark",localStorage.setItem("secops-wiki-theme",Ve),Bs()}function Wr(s,e){if(!e||e.trim().length===0)return s;const t=e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"),n=new RegExp(`(?![^<>]*>)(${t})`,"gi");return s.replace(n,'<mark class="bg-teal-500/30 text-teal-300 px-0.5 rounded font-medium">$1</mark>')}function Gr(s){const e=s.toLowerCase().trim();return/(sec|security|critical|panic|destruct|lock|key|auth)/.test(e)?{bg:"rgba(239, 68, 68, 0.15)",text:"#f87171",border:"rgba(239, 68, 68, 0.3)",className:"tag-color-red"}:/(doc|manual|wiki|guide|system|dashboard|home)/.test(e)?{bg:"rgba(20, 184, 166, 0.15)",text:"#2dd4bf",border:"rgba(20, 184, 166, 0.3)",className:"tag-color-teal"}:/(config|settings|sys|admin|db|telemetry)/.test(e)?{bg:"rgba(59, 130, 246, 0.15)",text:"#60a5fa",border:"rgba(59, 130, 246, 0.3)",className:"tag-color-blue"}:/(warning|caution|issue|bug|fix)/.test(e)?{bg:"rgba(245, 158, 11, 0.15)",text:"#fbbf24",border:"rgba(245, 158, 11, 0.3)",className:"tag-color-amber"}:{bg:"rgba(148, 163, 184, 0.15)",text:"#cbd5e1",border:"rgba(148, 163, 184, 0.3)",className:"tag-color-slate"}}function Us(s,e){const t=e.toLowerCase().trim();if(!t)return 0;let n=0;const o=s.title.toLowerCase(),i=s.content.toLowerCase(),r=s.tags.map(l=>l.toLowerCase());if(o===t?n+=100:o.startsWith(t)?n+=80:o.includes(t)&&(n+=50),r.forEach(l=>{l===t?n+=30:l.includes(t)&&(n+=15)}),i.includes(t)){n+=10;const l=i.split(t).length-1;n+=Math.min(10,l)}return n}function hs(s){const e=new Uint32Array(256);for(let n=0;n<256;n++){let o=n;for(let i=0;i<8;i++)o=o&1?3988292384^o>>>1:o>>>1;e[n]=o}let t=4294967295;for(let n=0;n<s.length;n++)t=e[(t^s[n])&255]^t>>>8;return(t^4294967295)>>>0}function qr(s){const e=new TextEncoder,t=[],n=[];let o=0;s.forEach(f=>{n.push(o);const u=e.encode(f.name),h=e.encode(f.content),p=hs(h),x=new ArrayBuffer(30),w=new DataView(x);w.setUint32(0,67324752,!0),w.setUint16(4,10,!0),w.setUint16(6,0,!0),w.setUint16(8,0,!0),w.setUint16(10,0,!0),w.setUint16(12,0,!0),w.setUint32(14,p,!0),w.setUint32(18,h.length,!0),w.setUint32(22,h.length,!0),w.setUint16(26,u.length,!0),w.setUint16(28,0,!0);const E=new Uint8Array(x);t.push(E),t.push(u),t.push(h),o+=E.length+u.length+h.length});const i=o;let r=0;s.forEach((f,u)=>{const h=e.encode(f.name),p=e.encode(f.content),x=hs(p),w=n[u],E=new ArrayBuffer(46),v=new DataView(E);v.setUint32(0,33639248,!0),v.setUint16(4,20,!0),v.setUint16(6,10,!0),v.setUint16(8,0,!0),v.setUint16(10,0,!0),v.setUint16(12,0,!0),v.setUint16(14,0,!0),v.setUint32(16,x,!0),v.setUint32(20,p.length,!0),v.setUint32(24,p.length,!0),v.setUint16(28,h.length,!0),v.setUint16(30,0,!0),v.setUint16(32,0,!0),v.setUint16(34,0,!0),v.setUint16(36,0,!0),v.setUint32(38,32,!0),v.setUint32(42,w,!0);const _=new Uint8Array(E);t.push(_),t.push(h),r+=_.length+h.length,o+=_.length+h.length});const l=new ArrayBuffer(22),c=new DataView(l);return c.setUint32(0,101010256,!0),c.setUint16(4,0,!0),c.setUint16(6,0,!0),c.setUint16(8,s.length,!0),c.setUint16(10,s.length,!0),c.setUint32(12,r,!0),c.setUint32(16,i,!0),c.setUint16(20,0,!0),t.push(new Uint8Array(l)),new Blob(t,{type:"application/zip"})}const Ze=new BroadcastChannel("wiki-db-sync");Ze.onmessage=async s=>{s.data==="refresh"&&(await Ne(),await dt())};let on=null;const Vr=15*60*1e3;let Fs;async function Yr(){Bs(),Fs=document.getElementById("app"),await xs(),Qr(),await Ne(),Xr(),ti(),window.addEventListener("hashchange",gs),window.addEventListener("online",ms),window.addEventListener("offline",ms),window.addEventListener("beforeinstallprompt",s=>{s.preventDefault(),it=s;const e=document.getElementById("pwa-install-btn");e&&e.classList.remove("hidden")}),window.addEventListener("keydown",s=>{var e,t;(s.ctrlKey&&s.key==="k"||s.ctrlKey&&s.key==="K")&&(s.preventDefault(),ut()),s.key==="/"&&((e=document.activeElement)==null?void 0:e.tagName)!=="INPUT"&&((t=document.activeElement)==null?void 0:t.tagName)!=="TEXTAREA"&&(s.preventDefault(),ut())}),gs()}function Ge(){on&&clearTimeout(on),on=setTimeout(Zr,Vr)}function Zr(){const s=document.getElementById("idle-lock-screen");s&&s.classList.remove("hidden")}function Kr(){const s=document.getElementById("idle-lock-screen");s&&s.classList.add("hidden"),Ge()}function Xr(){const s=document.createElement("div");s.id="idle-lock-screen",s.className="fixed inset-0 bg-[#090d16]/95 backdrop-blur-md z-50 flex flex-col items-center justify-center hidden",s.innerHTML=`
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
  `,document.body.appendChild(s),Ge(),window.addEventListener("mousemove",Ge),window.addEventListener("keydown",Ge),window.addEventListener("click",Ge),window.addEventListener("scroll",Ge),document.addEventListener("click",e=>{e.target.closest("#idle-unlock-btn")&&Kr()})}function Qr(){"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/wiki/sw.js").then(s=>{console.log("ServiceWorker registered successfully with scope: ",s.scope)}).catch(s=>{console.error("ServiceWorker registration failed: ",s)})})}function ms(){$s=navigator.onLine?"SECURE_LINK":"OFFLINE_CACHE";const s=document.getElementById("system-status-indicator"),e=document.getElementById("system-status-label");s&&e&&(navigator.onLine?(s.className="w-2 h-2 rounded-full bg-emerald-400 glow-text-emerald pulse-indicator",e.innerText="SECURE_LINK",e.className="text-xs text-emerald-400 font-mono tracking-wider"):(s.className="w-2 h-2 rounded-full bg-amber-500 pulse-indicator",e.innerText="OFFLINE_CACHE",e.className="text-xs text-amber-500 font-mono tracking-wider"))}async function Ne(){de=await pn()}async function gs(){const s=window.location.hash||"#/page/home";qe=!1,ge=!1;let e="";if(s.startsWith("#/page/")){const n=s.replace("#/page/","").split("#");se=n[0],n.length>1&&(e=n[1])}else s.startsWith("#/edit/")?(se=s.replace("#/edit/",""),qe=!0):s==="#/new"?(qe=!0,ge=!0,se=""):s==="#/system"?se="system":s==="#/graph"?se="graph":se="home";await dt(),e&&setTimeout(()=>{const t=document.getElementById(e);t&&t.scrollIntoView({behavior:"smooth"})},50)}async function dt(){await Ne();let s=de;Ae.trim().length>0&&(s=s.map(p=>({page:p,score:Us(p,Ae)})).filter(p=>p.score>0).sort((p,x)=>x.score-p.score).map(p=>p.page)),ot&&(s=s.filter(p=>p.tags.includes(ot)));const e=Array.from(new Set(de.flatMap(p=>p.tags)));Fs.innerHTML=`
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
        <!-- Search -->
        <div class="p-4 border-b border-slate-800/80 shrink-0">
          <div class="relative">
            <input type="text" id="wiki-search-input" value="${M(Ae)}" placeholder="Search index database..." class="w-full bg-slate-950/80 border border-slate-800 focus:border-teal-500/50 rounded-lg py-2 pl-9 pr-4 text-base md:text-sm text-slate-200 placeholder-slate-500 focus:outline-none transition font-mono">
            <svg class="w-4 h-4 text-slate-500 absolute left-3 top-2.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </div>
        </div>

        <!-- Tag Filter Cloud -->
        ${e.length>0?`
          <div class="px-4 py-2 border-b border-slate-800/80 flex flex-wrap gap-1 max-h-24 overflow-y-auto shrink-0 select-none">
            <button class="tag-badge px-1.5 py-0.5 text-[9px] rounded-full font-mono transition ${ot?"bg-slate-900 text-slate-400 hover:bg-slate-850":"bg-teal-500 text-slate-950 font-bold shadow-[0_0_8px_rgba(20,184,166,0.3)]"}" data-tag="">#ALL</button>
            ${e.map(p=>{const x=Gr(p);return`
                <button class="tag-badge px-1.5 py-0.5 text-[9px] rounded-full font-mono transition ${ot===p?"bg-teal-500 text-slate-950 font-bold shadow-[0_0_8px_rgba(20,184,166,0.3)]":`${x.className} hover:opacity-85`}" data-tag="${M(p)}">#${M(p.toUpperCase())}</button>
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
            ${s.map(p=>`
              <a href="#/page/${p.slug}" class="flex items-center justify-between px-3 py-2 rounded-lg text-sm transition group ${se===p.slug&&!qe?"bg-teal-950/30 text-teal-400 font-medium border-l-2 border-teal-500":"text-slate-400 hover:bg-slate-900/50 hover:text-slate-200"}">
                <span class="truncate font-mono flex items-center gap-1">
                  ${p.isEncrypted?'<span class="text-red-400">🔒</span>':""}
                  ${M(p.title)}
                </span>
                ${p.isSystem?`
                  <span class="text-[9px] bg-slate-800 text-slate-400 px-1 py-0.5 rounded font-mono uppercase scale-90">SYS</span>
                `:""}
              </a>
            `).join("")}
            ${s.length===0?`
              <div class="text-center py-6 text-xs text-slate-600 font-mono">No entries found</div>
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
  `,document.getElementById("wiki-search-input").addEventListener("input",p=>{Ae=p.target.value;const x=de.filter(E=>E.title.toLowerCase().includes(Ae.toLowerCase())||E.content.toLowerCase().includes(Ae.toLowerCase())||E.tags.some(v=>v.toLowerCase().includes(Ae.toLowerCase()))),w=document.getElementById("pages-list");w.innerHTML=x.map(E=>`
      <a href="#/page/${E.slug}" class="flex items-center justify-between px-3 py-2 rounded-lg text-sm transition group ${se===E.slug&&!qe?"bg-teal-950/30 text-teal-400 font-medium border-l-2 border-teal-500":"text-slate-400 hover:bg-slate-900/50 hover:text-slate-200"}">
        <span class="truncate font-mono">${M(E.title)}</span>
        ${E.isSystem?`
          <span class="text-[9px] bg-slate-800 text-slate-400 px-1 py-0.5 rounded font-mono uppercase scale-90">SYS</span>
        `:""}
      </a>
    `).join("")});const n=document.getElementById("pwa-install-btn");n&&n.addEventListener("click",async()=>{if(it){it.prompt();const{outcome:p}=await it.userChoice;p==="accepted"&&console.log("User accepted the PWA install prompt"),it=null,n.classList.add("hidden")}});const o=document.getElementById("system-panic-btn");o&&o.addEventListener("click",async()=>{if(confirm("CRITICAL SYSTEM COMPROMISE PROTOCOL: Purge entire local database, clear all service worker caches, unregister service workers, and force self-destruct reload immediately?")){if(indexedDB.deleteDatabase("secops-wiki-db"),"caches"in window){const p=await caches.keys();await Promise.all(p.map(x=>caches.delete(x)))}if("serviceWorker"in navigator){const p=await navigator.serviceWorker.getRegistrations();await Promise.all(p.map(x=>x.unregister()))}window.location.href="/wiki/"}});const i=document.getElementById("sidebar-toggle-btn"),r=document.getElementById("sidebar-close-btn"),l=document.getElementById("sidebar-backdrop"),c=()=>{const p=document.getElementById("sidebar"),x=document.getElementById("sidebar-backdrop");p&&x&&(p.classList.add("-translate-x-full"),x.classList.add("hidden"))},f=()=>{const p=document.getElementById("sidebar"),x=document.getElementById("sidebar-backdrop");p&&x&&(p.classList.remove("-translate-x-full"),x.classList.remove("hidden"))};i&&i.addEventListener("click",f),r&&r.addEventListener("click",c),l&&l.addEventListener("click",c),document.querySelectorAll("#sidebar a").forEach(p=>{p.addEventListener("click",()=>{window.innerWidth<768&&c()})});const h=document.getElementById("theme-toggle-btn");h&&h.addEventListener("click",zs),document.querySelectorAll(".tag-badge").forEach(p=>{p.addEventListener("click",async x=>{ot=x.currentTarget.getAttribute("data-tag")||"",await dt()})}),await Jr()}async function Jr(){const s=document.getElementById("main-content");if(se==="graph"){await ci(s);return}if(se==="system"){ei(s);return}if(qe){await js(s);return}await Hs(s)}async function Hs(s){const e=await ct(se);if(!e){s.innerHTML=`
      <div class="text-center py-20 bg-slate-950/40 border border-red-950/20 rounded-xl px-6 glow-border">
        <svg class="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
        </svg>
        <h2 class="text-2xl font-bold font-mono text-white mb-2 uppercase">DATA_MISSING</h2>
        <p class="text-slate-400 text-sm max-w-md mx-auto mb-6">Requested intel document slug "${M(se)}" is not registered in index database.</p>
        <a href="#/new" class="px-4 py-2 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 font-mono text-xs uppercase rounded transition hover:text-white">
          Create New Document
        </a>
      </div>
    `;return}const t=await So(e.slug);let n=e.content,o=!1;if(e.isEncrypted)if(Y)try{n=await De(e.content,Y)}catch{o=!0}else o=!0;if(o){s.innerHTML=`
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
    `,document.getElementById("decrypt-doc-form").addEventListener("submit",async E=>{E.preventDefault();const v=document.getElementById("decrypt-password-input").value;try{const _=await Ms(v);await De(e.content,_),Y=_,await dt()}catch{alert("Security Alert: Authentication failed. Invalid security passphrase.")}});return}const i=n.split(/\s+/).filter(w=>w.length>0).length,r=Math.max(1,Math.round(i/200)),l=wn(n),c=Wr(l,Ae),f=new Date(e.updatedAt).toLocaleString(),u=document.createElement("div");u.innerHTML=l;const h=u.querySelectorAll("h1, h2, h3");let p="";h.length>0&&(p=`
      <div class="hidden lg:block w-60 shrink-0 self-start sticky top-8">
        <div class="glass-panel border border-slate-800/80 rounded-xl p-4">
          <h4 class="text-xs font-bold font-mono text-slate-400 uppercase tracking-widest border-b border-slate-800/60 pb-2 mb-3">Outline</h4>
          <nav class="space-y-2 text-xs font-mono max-h-[350px] overflow-y-auto pr-1">
            ${Array.from(h).map(w=>{const E=w.textContent||"",v=w.id||E.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,""),_=w.tagName.toLowerCase(),N=_==="h1"?"pl-0 font-semibold":_==="h2"?"pl-3 border-l border-slate-800":"pl-6 border-l border-slate-800";return`
                <a href="#/page/${e.slug}#${v}" class="block text-slate-500 hover:text-teal-400 transition truncate ${N}" title="${M(E)}">
                  ${M(E)}
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
              <span class="text-xs font-mono text-teal-400 uppercase">⏱️ ${r} MIN READ</span>
              ${e.tags.map(w=>`
                <span class="text-[10px] font-mono bg-teal-950/20 text-teal-400 px-2 py-0.5 rounded border border-teal-900/30">#${M(w)}</span>
              `).join("")}
            </div>
          </div>
          
          <div class="flex items-center gap-2 shrink-0 self-start sm:self-auto">
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
              ${t.map((w,E)=>`
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-3 first:pt-0">
                  <div class="min-w-0">
                    <p class="text-xs font-mono text-slate-300 break-words">REV_${t.length-E} // ${M(w.title)}</p>
                    <p class="text-[10px] font-mono text-slate-500">${new Date(w.updatedAt).toLocaleString()}</p>
                  </div>
                  <button class="restore-rev-btn px-2.5 py-1 bg-slate-900 border border-slate-800 hover:border-slate-700 text-teal-400 hover:text-teal-300 font-mono text-[10px] rounded transition uppercase shrink-0 self-start sm:self-auto" data-rev-id="${M(w.id)}">
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
      ${p}
    </div>
  `;const x=document.getElementById("delete-page-btn");x&&x.addEventListener("click",async()=>{confirm(`CRITICAL SYSTEM NOTICE: Confirm total purge of intel document "${e.title}"? This action is irreversible.`)&&(await To(e.slug),Ze.postMessage("refresh"),window.location.hash="#/page/home")}),s.querySelectorAll("pre").forEach(w=>{const E=document.createElement("div");E.className="relative group",w.parentNode.insertBefore(E,w),E.appendChild(w);const v=document.createElement("button");v.className="absolute top-2 right-2 px-2 py-1 bg-slate-900/80 hover:bg-slate-800 text-[10px] text-slate-400 hover:text-white font-mono rounded opacity-0 group-hover:opacity-100 transition focus:opacity-100 border border-slate-800 focus:outline-none",v.textContent="COPY",v.addEventListener("click",()=>{var N;const _=((N=w.querySelector("code"))==null?void 0:N.textContent)||w.textContent||"";navigator.clipboard.writeText(_).then(()=>{v.textContent="COPIED",setTimeout(()=>v.textContent="COPY",2e3)})}),E.appendChild(v)}),s.querySelectorAll(".restore-rev-btn").forEach(w=>{w.addEventListener("click",async E=>{const v=E.currentTarget.getAttribute("data-rev-id"),_=t.find(N=>N.id===v);if(_&&confirm(`ROLLBACK COMMAND: Revert current page content to revision state "${_.title}" saved on ${new Date(_.updatedAt).toLocaleString()}?`)){const N=await ct(e.slug);N&&await bs({id:`${N.slug}-${Date.now()}`,slug:N.slug,title:N.title,content:N.content,updatedAt:Date.now()}),await pt({slug:_.slug,title:_.title,content:_.content,updatedAt:Date.now(),tags:e.tags,isSystem:e.isSystem}),alert("Revision successfully restored."),await Ne(),await dt()}})}),s.querySelectorAll('.wiki-content input[type="checkbox"]').forEach((w,E)=>{const v=w;v.removeAttribute("disabled"),v.classList.add("cursor-pointer","accent-teal-500"),v.addEventListener("change",async _=>{const N=_.target;await li(e.slug,E,N.checked)})})}async function js(s){let e="",t="",n="",o="",i=!1,r=!1;if(!ge){const m=await ct(se);if(m&&(e=m.title,t=m.slug,n=m.content,o=m.tags.join(", "),i=!!m.isSystem,r=!!m.isEncrypted,m.isEncrypted))if(Y)try{n=await De(m.content,Y)}catch{n="ERROR: Decryption key mismatch. Please go back and re-decrypt."}else n="ERROR: This page is encrypted. Decrypt it in the reader view first."}const l=`secops-wiki-draft-${ge?"new":se}`;let c="";const f=localStorage.getItem(l);if(f)try{const m=JSON.parse(f);e=m.title||e,n=m.content||n,o=m.tags||o,c=`
        <div id="draft-restore-banner" class="bg-teal-950/40 border border-teal-800 text-teal-400 p-3 rounded-lg text-xs font-mono mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <span>RESTORED DRAFT: Unsaved changes restored (${new Date(m.updatedAt).toLocaleTimeString()})</span>
          <button type="button" id="discard-draft-btn" class="underline hover:text-teal-300 font-bold shrink-0">DISCARD</button>
        </div>
      `}catch{}s.innerHTML=`
    <div class="glass-panel border border-slate-800 rounded-xl p-4 md:p-6 glow-border">
      <div class="border-b border-slate-800 pb-4 mb-6">
        <h2 class="text-xl font-bold font-mono text-white uppercase">${ge?"Establish New Intel Entry":"Update Intel Entry"}</h2>
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
            <input type="text" id="edit-slug" value="${M(t)}" ${ge?"":"disabled"} required pattern="^[a-z0-9-_]+$" placeholder="e.g. operational-manual" class="w-full bg-slate-950/80 border border-slate-800 focus:border-teal-500/50 rounded-lg p-2.5 text-base md:text-sm text-slate-200 focus:outline-none transition font-mono disabled:opacity-40 disabled:cursor-not-allowed">
            ${ge?'<p class="text-[10px] text-slate-500 mt-1 font-mono">Only lowercase letters, numbers, hyphens, and underscores are allowed.</p>':""}
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
            <input type="checkbox" id="edit-encrypt" ${r?"checked":""} class="w-4 h-4 rounded border-slate-850 bg-slate-950 text-teal-500 focus:ring-teal-500/50 cursor-pointer">
            <label for="edit-encrypt" class="text-xs font-semibold text-slate-400 uppercase tracking-widest font-mono cursor-pointer select-none">Encrypt Document (AES-GCM)</label>
          </div>
          <div class="flex gap-3 justify-end self-end sm:self-auto">
            <a href="${ge?"#/page/home":`#/page/${se}`}" id="cancel-edit-btn" class="px-4 py-2 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 font-mono text-xs uppercase rounded transition hover:text-white">
              Cancel
            </a>
            <button type="submit" class="px-4 py-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-mono text-xs uppercase rounded font-bold transition shadow-[0_0_10px_rgba(20,184,166,0.15)]">
              Commit Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  `;const u=document.getElementById("edit-page-form"),h=document.getElementById("edit-content"),p=document.getElementById("live-preview-box"),x=document.getElementById("cancel-edit-btn"),w=document.getElementById("discard-draft-btn"),E=document.getElementById("edit-tab-write"),v=document.getElementById("edit-tab-preview"),_=document.getElementById("edit-content-container"),N=document.getElementById("live-preview-container");E&&v&&_&&N&&(E.addEventListener("click",()=>{E.className="flex-1 py-2 text-center text-xs font-mono font-bold border-b-2 border-teal-500 text-teal-400",v.className="flex-1 py-2 text-center text-xs font-mono font-bold border-b-2 border-transparent text-slate-500",_.className="block",N.className="hidden md:block"}),v.addEventListener("click",()=>{v.className="flex-1 py-2 text-center text-xs font-mono font-bold border-b-2 border-teal-500 text-teal-400",E.className="flex-1 py-2 text-center text-xs font-mono font-bold border-b-2 border-transparent text-slate-500",N.className="block",_.className="hidden md:block"}));const ie=()=>{const m=h.value;if(m.trim().length===0){p.innerHTML='<span class="text-slate-600 font-mono text-xs">No input content.</span>';return}p.innerHTML=wn(m)},j=m=>{const T=h.selectionStart,y=h.selectionEnd,S=h.value,I=S.substring(T,y);let O="";switch(m){case"bold":O=`**${I||"bold_text"}**`;break;case"italic":O=`*${I||"italic_text"}*`;break;case"header":O=`
### ${I||"Header text"}
`;break;case"code":O=`
\`\`\`javascript
${I||"// code here"}
\`\`\`
`;break;case"link":O=`[${I||"Link text"}](url)`;break;case"table":O=`
| Header 1 | Header 2 |
| -------- | -------- |
| Cell 1   | Cell 2   |
`;break;case"checklist":O=`
- [ ] ${I||"Task description"}
`;break}h.value=S.substring(0,T)+O+S.substring(y),h.focus(),h.selectionStart=T+O.length,h.selectionEnd=T+O.length,ie()};s.querySelectorAll(".format-btn").forEach(m=>{m.addEventListener("click",T=>{const y=T.currentTarget.getAttribute("data-format")||"";j(y)})}),h.addEventListener("keyup",m=>{const T=h.value,y=h.selectionStart;if(T.substring(y-2,y)==="[[")_t=!0,It=y,un="",ri(h);else if(_t){if(m.key==="Escape"||m.key==="ArrowUp"||m.key==="ArrowDown"||m.key==="Enter")return;const I=T.substring(It,y);I.includes(`
`)||y<It?Lt():(un=I,Ws(h))}}),h.addEventListener("keydown",m=>{if(_t){const T=document.getElementById("autocomplete-popup");if(!T)return;const y=T.querySelectorAll(".editor-autocomplete-item");let S=Array.from(y).findIndex(I=>I.classList.contains("active"));m.key==="ArrowDown"?(m.preventDefault(),y.length>0&&(S>=0&&y[S].classList.remove("active","bg-teal-950/20","text-teal-400"),S=(S+1)%y.length,y[S].classList.add("active","bg-teal-950/20","text-teal-400"),y[S].scrollIntoView({block:"nearest"}))):m.key==="ArrowUp"?(m.preventDefault(),y.length>0&&(S>=0&&y[S].classList.remove("active","bg-teal-950/20","text-teal-400"),S=(S-1+y.length)%y.length,y[S].classList.add("active","bg-teal-950/20","text-teal-400"),y[S].scrollIntoView({block:"nearest"}))):m.key==="Enter"?(m.preventDefault(),S>=0?y[S].click():y.length>0&&y[0].click()):m.key==="Escape"&&(m.preventDefault(),Lt())}}),h.addEventListener("input",ie),ie();const Z=setInterval(()=>{var S,I;const m=(S=document.getElementById("edit-title"))==null?void 0:S.value,T=h.value,y=(I=document.getElementById("edit-tags"))==null?void 0:I.value;(m||T)&&localStorage.setItem(l,JSON.stringify({title:m,content:T,tags:y,updatedAt:Date.now()}))},5e3),F=()=>{clearInterval(Z),localStorage.removeItem(l),Lt()};x.addEventListener("click",F),w&&w.addEventListener("click",()=>{var m;F(),(m=document.getElementById("draft-restore-banner"))==null||m.remove(),js(s)}),u.addEventListener("submit",async m=>{m.preventDefault();const T=document.getElementById("edit-title").value.trim(),y=ge?document.getElementById("edit-slug").value.trim().toLowerCase():t,S=document.getElementById("edit-tags").value,I=h.value,O=document.getElementById("edit-encrypt").checked;if(ge&&!/^[a-z0-9-_]+$/.test(y)){alert("Security Alert: Slug contains illegal characters. Use alphanumeric, hyphens, and underscores only.");return}const we=S.split(",").map(ee=>At(ee.trim())).filter(ee=>ee.length>0),J=await ct(y);J&&await bs({id:`${J.slug}-${Date.now()}`,slug:J.slug,title:J.title,content:J.content,updatedAt:J.updatedAt,isEncrypted:J.isEncrypted});let oe=I;if(O){if(!Y){const ee=prompt("Enter a security passphrase to encrypt this document:");if(!ee){alert("Encryption Aborted: A security passphrase is required to save an encrypted document.");return}Y=await Ms(ee)}try{oe=await Ps(I,Y)}catch(ee){alert(`Encryption failure: ${ee.message}`);return}}const ae={slug:y,title:T,content:oe,updatedAt:Date.now(),tags:we,isSystem:i,isEncrypted:O};try{await pt(ae),F(),Ze.postMessage("refresh"),window.location.hash=`#/page/${y}`}catch(ee){alert(`Database transaction error: ${ee.message}`)}})}function ei(s){s.innerHTML=`
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
              <span class="text-emerald-400 font-bold">${Ve.toUpperCase()}</span>
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
        <h3 class="text-sm font-bold font-mono text-white uppercase tracking-wider border-b border-slate-800 pb-2">Data Operations & Backups</h3>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <!-- Export Database JSON -->
          <div class="bg-slate-950/40 border border-slate-800 p-4 rounded-lg flex flex-col justify-between">
            <div>
              <h4 class="text-xs font-bold font-mono text-white uppercase">Export Database JSON</h4>
              <p class="text-[10px] text-slate-500 font-mono mt-1 mb-4">Export all wiki contents to a validated JSON payload file.</p>
            </div>
            <button id="system-export-btn" class="w-full py-2 bg-slate-900 border border-slate-850 hover:border-slate-700 text-slate-300 font-mono text-xs uppercase rounded transition hover:text-white">
              Download JSON
            </button>
          </div>

          <!-- Export Markdown ZIP -->
          <div class="bg-slate-950/40 border border-slate-800 p-4 rounded-lg flex flex-col justify-between">
            <div>
              <h4 class="text-xs font-bold font-mono text-white uppercase">Export Markdown ZIP</h4>
              <p class="text-[10px] text-slate-500 font-mono mt-1 mb-4">Export all articles as separate .md documents inside a ZIP container.</p>
            </div>
            <button id="system-export-zip-btn" class="w-full py-2 bg-slate-900 border border-slate-850 hover:border-slate-700 text-slate-300 font-mono text-xs uppercase rounded transition hover:text-white">
              Download ZIP
            </button>
          </div>

          <!-- Import Backup -->
          <div class="bg-slate-950/40 border border-slate-800 p-4 rounded-lg flex flex-col justify-between">
            <div>
              <h4 class="text-xs font-bold font-mono text-white uppercase">Import Payload</h4>
              <p class="text-[10px] text-slate-500 font-mono mt-1 mb-4">Upload and ingest a validated JSON file to the local database.</p>
            </div>
            <label class="w-full text-center py-2 bg-slate-900 border border-slate-850 hover:border-slate-700 text-slate-300 font-mono text-xs uppercase rounded cursor-pointer transition hover:text-white block">
              Load Payload
              <input type="file" id="system-import-file" accept=".json" class="hidden">
            </label>
          </div>

          <!-- Reset Default Database -->
          <div class="bg-slate-950/40 border border-slate-800 p-4 rounded-lg flex flex-col justify-between">
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
  `;const e=document.getElementById("system-export-btn"),t=document.getElementById("system-export-zip-btn"),n=document.getElementById("system-import-file"),o=document.getElementById("system-reset-btn"),i=document.getElementById("total-articles-telemetry"),r=document.getElementById("db-health-diagnostics");i.textContent=de.length.toString(),r&&di(r),e.addEventListener("click",()=>{const l=JSON.stringify(de,null,2),c=new Blob([l],{type:"application/json"}),f=URL.createObjectURL(c),u=document.createElement("a");u.href=f,u.download=`secops-wiki-backup-${Date.now()}.json`,document.body.appendChild(u),u.click(),document.body.removeChild(u),URL.revokeObjectURL(f)}),t.addEventListener("click",async()=>{const l=[];for(const h of de){let p=h.content;if(h.isEncrypted&&Y)try{p=await De(h.content,Y)}catch{}const x=`---
title: ${h.title}
slug: ${h.slug}
tags: ${h.tags.join(", ")}
updated: ${new Date(h.updatedAt).toISOString()}
encrypted: ${!!h.isEncrypted}
---

`;l.push({name:`${h.slug}.md`,content:x+p})}const c=qr(l),f=URL.createObjectURL(c),u=document.createElement("a");u.href=f,u.download=`secops-wiki-backup-${Date.now()}.zip`,document.body.appendChild(u),u.click(),document.body.removeChild(u),URL.revokeObjectURL(f)}),n.addEventListener("change",l=>{var u;const c=(u=l.target.files)==null?void 0:u[0];if(!c)return;if(c.size>1024*1024){alert("Ingestion failed: File size exceeds the secure ceiling of 1MB.");return}const f=new FileReader;f.onload=async h=>{var p;try{const x=JSON.parse((p=h.target)==null?void 0:p.result);if(!Array.isArray(x))throw new Error("Payload root structure must be an array of page objects.");const w=[];for(const E of x){const v=jr(E);w.push(v)}if(confirm(`SYSTEM INGESTION PROTOCOL: Import ${w.length} validated articles? This may overwrite conflicting entries.`)){for(const E of w)await pt(E);alert("Ingestion completed successfully."),Ze.postMessage("refresh"),await Ne(),window.location.hash="#/page/home"}}catch(x){alert(`Ingestion failed: Schema violation. ${x.message}`)}},f.readAsText(c)}),o.addEventListener("click",async()=>{if(confirm("CRITICAL WARPING WARNING: Reset and delete ALL wiki pages? Custom user documents will be permanently deleted.")){const l=indexedDB.open("secops-wiki-db",2);l.onsuccess=async()=>{const u=l.result.transaction("pages","readwrite").objectStore("pages");u.clear().onsuccess=async()=>{await xs(),alert("Database successfully wiped and seeded with standard operating defaults."),Ze.postMessage("refresh"),await Ne(),window.location.hash="#/page/home"}}}})}function ut(){const s=document.getElementById("command-palette-backdrop");if(s)if(sn=!sn,sn){s.classList.remove("hidden");const e=document.getElementById("command-palette-input");e&&(e.value="",e.focus()),ce=0,Dt()}else s.classList.add("hidden")}function ti(){if(document.getElementById("command-palette-backdrop"))return;const s=document.createElement("div");s.id="command-palette-backdrop",s.className="fixed inset-0 bg-[#090d16]/85 backdrop-blur-md z-50 flex items-start justify-center pt-20 hidden",s.innerHTML=`
    <div class="glass-panel border border-teal-900/30 rounded-xl w-full max-w-lg overflow-hidden shadow-2xl mx-4 glow-border">
      <input type="text" id="command-palette-input" placeholder="Search pages or run system commands..." class="w-full bg-slate-950/80 text-white font-mono text-sm p-4 outline-none border-b border-slate-800 focus:border-teal-500/30 placeholder-slate-500 transition">
      <div id="command-palette-results" class="max-h-80 overflow-y-auto divide-y divide-slate-850/40 p-2 space-y-1"></div>
    </div>
  `,document.body.appendChild(s);const e=document.getElementById("command-palette-input");e.addEventListener("input",()=>{ce=0,Dt()}),e.addEventListener("keydown",si),s.addEventListener("click",t=>{t.target===s&&ut()})}function Dt(){const s=document.getElementById("command-palette-input"),e=document.getElementById("command-palette-results");if(!e)return;const t=s?s.value.trim().toLowerCase():"",n=[{title:"CREATE NEW PAGE",subtitle:"Open the editor to establish a new document",icon:"➕",action:()=>{window.location.hash="#/new"}},{title:"TOGGLE THEME",subtitle:`Switch visual style (currently ${Ve})`,icon:"🌓",action:()=>{zs()}},{title:"SYSTEM ADMIN",subtitle:"Access operations console and db diagnostics",icon:"⚙️",action:()=>{window.location.hash="#/system"}},{title:"TACTICAL MAP VIEW",subtitle:"Display interactive node relationship map",icon:"🗺️",action:()=>{window.location.hash="#/graph"}},{title:"PANIC PURGE PROTOCOL",subtitle:"Emergency self-destruct - wipes all data",icon:"🚨",action:()=>{const u=document.getElementById("system-panic-btn");u&&u.click()}}];let o="",i=0;const r=n.filter(u=>u.title.toLowerCase().includes(t)||u.subtitle.toLowerCase().includes(t));let l=[];t?l=de.map(u=>({page:u,score:Us(u,t)})).filter(u=>u.score>0).sort((u,h)=>h.score-u.score):l=de.slice(0,5).map(u=>({page:u,score:0}));const c=r.length+l.length;ce>=c?ce=0:ce<0&&(ce=c-1),r.forEach(u=>{o+=`
      <div class="command-palette-item p-3 rounded-lg flex items-center justify-between cursor-pointer font-mono text-xs transition-all ${i===ce?"command-item-active bg-teal-950/20 text-teal-400 border-l-2 border-teal-500":"text-slate-400 hover:bg-slate-900/40 hover:text-slate-200"}" data-index="${i}">
        <div class="flex items-center gap-3">
          <span class="text-base">${u.icon}</span>
          <div>
            <div class="font-bold text-white uppercase">${u.title}</div>
            <div class="text-[10px] text-slate-500">${u.subtitle}</div>
          </div>
        </div>
        <span class="text-[10px] text-slate-650 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-900 uppercase">CMD</span>
      </div>
    `,i++}),l.forEach(u=>{const h=i===ce,p=u.page;o+=`
      <div class="command-palette-item p-3 rounded-lg flex items-center justify-between cursor-pointer font-mono text-xs transition-all ${h?"command-item-active bg-teal-950/20 text-teal-400 border-l-2 border-teal-500":"text-slate-400 hover:bg-slate-900/40 hover:text-slate-200"}" data-index="${i}">
        <div class="flex items-center gap-3">
          <span class="text-base">${p.isEncrypted?"🔒":"📄"}</span>
          <div>
            <div class="font-bold text-white">${M(p.title)}</div>
            <div class="text-[10px] text-slate-500">Slug: ${M(p.slug)} ${p.tags.length?`• tags: #${p.tags.join(", #")}`:""}</div>
          </div>
        </div>
        <span class="text-[10px] text-slate-650 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-900 uppercase">PAGE</span>
      </div>
    `,i++}),c===0&&(o='<div class="text-center py-6 text-xs text-slate-600 font-mono">No matching commands or pages found.</div>'),e.innerHTML=o,e.querySelectorAll(".command-palette-item").forEach(u=>{u.addEventListener("click",()=>{const h=parseInt(u.getAttribute("data-index")||"0",10);ni(h,r,l)})}),oi()}function ni(s,e,t){if(ut(),s<e.length)e[s].action();else{const n=s-e.length;n<t.length&&(window.location.hash=`#/page/${t[n].page.slug}`)}}function si(s){const e=document.getElementById("command-palette-results");if(!e)return;const t=e.querySelectorAll(".command-palette-item");if(t.length!==0)if(s.key==="ArrowDown")s.preventDefault(),ce=(ce+1)%t.length,Dt();else if(s.key==="ArrowUp")s.preventDefault(),ce=(ce-1+t.length)%t.length,Dt();else if(s.key==="Enter"){s.preventDefault();const n=e.querySelector(".command-item-active");n&&n.click()}else s.key==="Escape"&&(s.preventDefault(),ut())}function oi(){const s=document.getElementById("command-palette-results");if(!s)return;const e=s.querySelector(".command-item-active");e&&e.scrollIntoView({block:"nearest"})}function ri(s){const e=document.getElementById("autocomplete-popup");e&&(e.classList.remove("hidden"),Ws(s))}function Lt(){const s=document.getElementById("autocomplete-popup");s&&(s.classList.add("hidden"),_t=!1)}function Ws(s){const e=document.getElementById("autocomplete-popup");if(!e)return;const t=un.toLowerCase().trim(),n=de.filter(i=>i.title.toLowerCase().includes(t)||i.slug.toLowerCase().includes(t));if(n.length===0){e.innerHTML='<div class="p-2 text-slate-500 italic">No matches found</div>';return}e.innerHTML=n.map((i,r)=>`
    <div class="editor-autocomplete-item p-2 cursor-pointer transition ${r===0?"active bg-teal-950/20 text-teal-400":"text-slate-400 hover:bg-slate-900/40 hover:text-slate-200"}" data-slug="${M(i.slug)}" data-title="${M(i.title)}">
      <span class="font-bold">${M(i.title)}</span>
      <span class="text-[9px] text-slate-500 block truncate">Slug: ${M(i.slug)}</span>
    </div>
  `).join(""),e.querySelectorAll(".editor-autocomplete-item").forEach(i=>{i.addEventListener("click",r=>{const l=r.currentTarget,c=l.getAttribute("data-slug")||"",f=l.getAttribute("data-title")||"";ai(s,f,c)})});const o=ii(s,s.selectionStart);e.style.left=`${Math.min(s.clientWidth-260,Math.max(16,o.left))}px`,e.style.top=`${Math.min(s.clientHeight-100,Math.max(40,o.top+20))}px`}function ii(s,e){const n=s.value.substring(0,e).split(`
`),o=n.length-1,i=n[o],r=8,l=20,c=16+i.length*r%(s.clientWidth-40),f=12+o*l-s.scrollTop;return{left:c,top:f}}function ai(s,e,t){const n=It-2,o=s.selectionStart,i=s.value,r=`[${e}](#/page/${t})`;s.value=i.substring(0,n)+r+i.substring(o),s.focus(),s.selectionStart=n+r.length,s.selectionEnd=n+r.length,Lt();const l=document.getElementById("live-preview-box");l&&(l.innerHTML=wn(s.value))}async function li(s,e,t){const n=await ct(s);if(!n)return;let o=n.content;const i=!!n.isEncrypted;if(i){if(!Y){alert("Authentication Error: Decryption key is missing. Re-decrypt page first.");return}try{o=await De(o,Y)}catch{alert("Decryption failure.");return}}let r=0;const l=/([-*+]\s+\[)([ xX])(\])/g,c=o.replace(l,(h,p,x,w)=>r===e?(r++,`${p}${t?"x":" "}${w}`):(r++,h));let f=c;i&&Y&&(f=await Ps(c,Y)),n.content=f,n.updatedAt=Date.now(),await pt(n),Ze.postMessage("refresh"),await Ne();const u=document.getElementById("main-content");u&&await Hs(u)}function Gs(s){const e=[],t=/#\/page\/([a-z0-9-_]+)/g;let n;for(;(n=t.exec(s))!==null;)e.push(n[1]);return Array.from(new Set(e))}async function ci(s){s.innerHTML=`
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
  `;const e=document.getElementById("tactical-map-canvas");if(!e)return;const t=e.getContext("2d");if(!t)return;const n=window.devicePixelRatio||1,o=e.getBoundingClientRect();e.width=o.width*n,e.height=500*n,t.scale(n,n);const i=o.width,r=500,l=de.map(m=>{const T=i/2+(Math.random()-.5)*100,y=r/2+(Math.random()-.5)*100;return{id:m.slug,title:m.title,x:T,y,vx:0,vy:0,radius:m.slug==="home"?14:10,isEncrypted:!!m.isEncrypted,isSystem:!!m.isSystem}}),c=[],f=new Set(l.map(m=>m.id));for(const m of de){let T=m.content;if(m.isEncrypted&&Y)try{T=await De(m.content,Y)}catch{}Gs(T).forEach(S=>{f.has(S)&&S!==m.slug&&c.push({source:m.slug,target:S})})}let u=null,h=null,p=0,x=0,w=0;const E=.02,v=1200,_=.85,N=.02;function ie(){for(let m=0;m<l.length;m++){const T=l[m];for(let y=m+1;y<l.length;y++){const S=l[y],I=S.x-T.x,O=S.y-T.y,we=I*I+O*O+.1,J=Math.sqrt(we);if(J<250){const oe=v/we,ae=I/J*oe,ee=O/J*oe;T!==u&&(T.vx-=ae,T.vy-=ee),S!==u&&(S.vx+=ae,S.vy+=ee)}}}c.forEach(m=>{const T=l.find(ae=>ae.id===m.source),y=l.find(ae=>ae.id===m.target);if(!T||!y)return;const S=y.x-T.x,I=y.y-T.y,O=Math.sqrt(S*S+I*I)||.1,we=(O-100)*E,J=S/O*we,oe=I/O*we;T!==u&&(T.vx+=J,T.vy+=oe),y!==u&&(y.vx-=J,y.vy-=oe)}),l.forEach(m=>{if(m===u)return;const T=i/2-m.x,y=r/2-m.y;m.vx+=T*N,m.vy+=y*N,m.x+=m.vx,m.y+=m.vy,m.vx*=_,m.vy*=_,m.x=Math.max(m.radius,Math.min(i-m.radius,m.x)),m.y=Math.max(m.radius,Math.min(r-m.radius,m.y))})}function j(){t.clearRect(0,0,i,r),t.lineWidth=1,c.forEach(m=>{const T=l.find(I=>I.id===m.source),y=l.find(I=>I.id===m.target);if(!T||!y)return;const S=h&&(h.id===T.id||h.id===y.id);t.strokeStyle=S?"rgba(20, 184, 166, 0.6)":"rgba(30, 41, 59, 0.4)",t.lineWidth=S?1.5:1,t.beginPath(),t.moveTo(T.x,T.y),t.lineTo(y.x,y.y),t.stroke()}),l.forEach(m=>{t.beginPath(),t.arc(m.x,m.y,m.radius,0,2*Math.PI);let T="#14b8a6",y="rgba(20, 184, 166, 0.4)";m.isEncrypted?(T="#ef4444",y="rgba(239, 68, 68, 0.4)"):m.isSystem&&(T="#3b82f6",y="rgba(59, 130, 246, 0.4)"),t.fillStyle=T,t.shadowColor=y,t.shadowBlur=h===m?12:6,t.fill(),t.shadowBlur=0,t.strokeStyle="rgba(255, 255, 255, 0.1)",t.lineWidth=1.5,t.stroke(),t.fillStyle=h===m?"#ffffff":"#94a3b8",t.font=h===m?"bold 10px monospace":"9px monospace",t.textAlign="center",t.fillText(m.title,m.x,m.y-m.radius-5)})}function Z(){ie(),j(),w=requestAnimationFrame(Z)}e.addEventListener("mousemove",m=>{const T=e.getBoundingClientRect();if(p=m.clientX-T.left,x=m.clientY-T.top,u){u.x=p,u.y=x,u.vx=0,u.vy=0;return}h=null;for(const y of l){const S=y.x-p,I=y.y-x;if(S*S+I*I<(y.radius+5)*(y.radius+5)){h=y;break}}}),e.addEventListener("mousedown",()=>{h&&(u=h,u.x=p,u.y=x)}),window.addEventListener("mouseup",()=>{u=null}),e.addEventListener("click",()=>{h&&!u&&(cancelAnimationFrame(w),window.location.hash=`#/page/${h.id}`)}),Z();const F=()=>{cancelAnimationFrame(w),window.removeEventListener("hashchange",F)};window.addEventListener("hashchange",F)}async function di(s){s.innerHTML=`
    <div class="text-xs font-mono text-slate-500 animate-pulse">Running security & link integrity scan...</div>
  `;const e=await pn();let t=0;const n=new TextEncoder;e.forEach(f=>{const u=JSON.stringify(f);t+=n.encode(u).length});const o=t<1024?`${t} Bytes`:t<1024*1024?`${(t/1024).toFixed(2)} KB`:`${(t/(1024*1024)).toFixed(2)} MB`,i=new Set(e.map(f=>f.slug)),r={};e.forEach(f=>{r[f.slug]=[]});const l=[];for(const f of e){let u=f.content;if(f.isEncrypted&&Y)try{u=await De(f.content,Y)}catch{}Gs(u).forEach(p=>{i.has(p)?p!==f.slug&&r[p].push(f.slug):l.push({source:f.slug,target:p})})}const c=e.filter(f=>f.slug!=="home"&&r[f.slug].length===0);s.innerHTML=`
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
  `}document.addEventListener("DOMContentLoaded",Yr);
