import{s as De,n as be,r as Ne,c as Be}from"../chunks/scheduler.a21a5cad.js";import{S as Le,i as ze,g as M,s as z,m as K,h as A,j as $,A as Ue,c as U,n as Q,f as j,B as $e,k as h,a as re,x as f,E as J,z as Z,D as We,o as ue,y as Ve}from"../chunks/index.4419476b.js";import{e as we}from"../chunks/each.e59479a4.js";/* empty css                      */import{X as Xe}from"../chunks/runtime.esm.252c27a7.js";import{g as qe}from"../chunks/navigation.35ae3c77.js";import{g as ye,b as Ge,c as He}from"../chunks/context.898bb4a8.js";import{g as Je}from"../chunks/chunk-NMUKSDLG.3f77d6f4.js";import{b as Ke}from"../chunks/paths.49a0c291.js";/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */var Qe=Object.assign||function(r){for(var t,n=1,o=arguments.length;n<o;n++){t=arguments[n];for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(r[a]=t[a])}return r},Ze=[["firefox",/Firefox\/([0-9\.]+)(?:\s|$)/],["opera",/Opera\/([0-9\.]+)(?:\s|$)/],["opera",/OPR\/([0-9\.]+)(:?\s|$)$/],["edge",/Edge\/([0-9\._]+)/],["ie",/Trident\/7\.0.*rv\:([0-9\.]+)\).*Gecko$/],["ie",/MSIE\s([0-9\.]+);.*Trident\/[4-7].0/],["ie",/MSIE\s(7\.0)/],["safari",/Version\/([0-9\._]+).*Safari/],["chrome",/(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],["bb10",/BB10;\sTouch.*Version\/([0-9\.]+)/],["android",/Android\s([0-9\.]+)/],["ios",/Version\/([0-9\._]+).*Mobile.*Safari.*/],["yandexbrowser",/YaBrowser\/([0-9\._]+)/],["crios",/CriOS\/([0-9\.]+)(:?\s|$)/]],Ye=["Windows Phone","Android","CentOS",{name:"Chrome OS",pattern:"CrOS"},"Debian","Fedora","FreeBSD","Gentoo","Haiku","Kubuntu","Linux Mint","OpenBSD","Red Hat","SuSE","Ubuntu","Xubuntu","Cygwin","Symbian OS","hpwOS","webOS ","webOS","Tablet OS","Tizen","Linux","Mac OS X","Macintosh","Mac","Windows 98;","Windows "],er={"10.0":"10","6.4":"10 Technical Preview","6.3":"8.1","6.2":"8","6.1":"Server 2008 R2 / 7","6.0":"Server 2008 / Vista","5.2":"Server 2003 / XP 64-bit","5.1":"XP","5.01":"2000 SP1","5.0":"2000","4.0":"NT","4.90":"ME"},rr=new RegExp(["(android|bb\\d+|meego).+mobile|avantgo|bada\\/|blackberry|blazer|","compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|","midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)","\\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\\.(browser|link)|vodafone|","wap|windows ce|xda|xiino"].join(""),"i"),tr=new RegExp(["1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\\-)|","ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\\-m|r |s )|","avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\\-(n|u)|c55\\/|capi|ccwa|cdm\\-|","cell|chtm|cldc|cmd\\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\\-s|devi|dica|dmob|do(c|p)o|","ds(12|\\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\\-|_)|","g1 u|g560|gene|gf\\-5|g\\-mo|go(\\.w|od)|gr(ad|un)|haie|hcit|hd\\-(m|p|t)|hei\\-|","hi(pt|ta)|hp( i|ip)|hs\\-c|ht(c(\\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\\-(20|go|ma)|","i230|iac( |\\-|\\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|","kddi|keji|kgt( |\\/)|klon|kpt |kwc\\-|kyo(c|k)|le(no|xi)|lg( g|\\/(k|l|u)|50|54|\\-[a-w])","|libw|lynx|m1\\-w|m3ga|m50\\/|ma(te|ui|xo)|mc(01|21|ca)|m\\-cr|me(rc|ri)|mi(o8|oa|ts)|","mmef|mo(01|02|bi|de|do|t(\\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|","n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|","op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\\-2|","po(ck|rt|se)|prox|psio|pt\\-g|qa\\-a|qc(07|12|21|32|60|\\-[2-7]|i\\-)|qtek|r380|r600|","raks|rim9|ro(ve|zo)|s55\\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\\-|oo|p\\-)|sdk\\/|","se(c(\\-|0|1)|47|mc|nd|ri)|sgh\\-|shar|sie(\\-|m)|k\\-0|sl(45|id)|sm(al|ar|b3|it|t5)|","so(ft|ny)|sp(01|h\\-|v\\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\\-|tdg\\-|","tel(i|m)|tim\\-|t\\-mo|to(pl|sh)|ts(70|m\\-|m3|m5)|tx\\-9|up(\\.b|g1|si)|utst|v400|v750|","veri|vi(rg|te)|vk(40|5[0-3]|\\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|","w3c(\\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\\-|your|zeto|zte\\-"].join(""),"i"),nr=function(){function e(r,t,n){this.navigator=t,this.process=n,this.userAgent=r||(this.navigator?t.userAgent||t.vendor:"")}return e.prototype.detect=function(){if(this.process&&!this.userAgent){var r=this.process.version.slice(1).split(".").slice(0,3),t=Array.prototype.slice.call(r,1).join("")||"0";return{name:"node",version:r.join("."),versionNumber:parseFloat(r[0]+"."+t),mobile:!1,os:this.process.platform}}return this.userAgent||this.handleMissingError(),Qe({},this.checkBrowser(),this.checkMobile(),this.checkOs())},e.prototype.checkBrowser=function(){var r=this;return Ze.filter(function(t){return t[1].test(r.userAgent)}).map(function(t){var n=t[1].exec(r.userAgent),o=n&&n[1].split(/[._]/).slice(0,3),a=Array.prototype.slice.call(o,1).join("")||"0";return o&&o.length<3&&Array.prototype.push.apply(o,o.length===1?[0,0]:[0]),{name:String(t[0]),version:o.join("."),versionNumber:+(o[0]+"."+a)}}).shift()},e.prototype.checkMobile=function(){var r=this.userAgent.substr(0,4),t=rr.test(this.userAgent)||tr.test(r);return{mobile:t}},e.prototype.checkOs=function(){var r=this;return Ye.map(function(t){var n=t.name||t,o=r.getOsPattern(t);return{name:n,pattern:o,value:RegExp("\\b"+o.replace(/([ -])(?!$)/g,"$1?")+"(?:x?[\\d._]+|[ \\w.]*)","i").exec(r.userAgent)}}).filter(function(t){return t.value}).map(function(t){var n=t.value[0]||"",o;return t.pattern&&t.name&&/^Win/i.test(n)&&!/^Windows Phone /i.test(n)&&(o=er[n.replace(/[^\d.]/g,"")])&&(n="Windows "+o),t.pattern&&t.name&&(n=n.replace(RegExp(t.pattern,"i"),t.name)),n=n.replace(/ ce$/i," CE").replace(/\bhpw/i,"web").replace(/\bMacintosh\b/,"Mac OS").replace(/_PowerPC\b/i," OS").replace(/\b(OS X) [^ \d]+/i,"$1").replace(/\bMac (OS X)\b/,"$1").replace(/\/(\d)/," $1").replace(/_/g,".").replace(/(?: BePC|[ .]*fc[ \d.]+)$/i,"").replace(/\bx86\.64\b/gi,"x86_64").replace(/\b(Windows Phone) OS\b/,"$1").replace(/\b(Chrome OS \w+) [\d.]+\b/,"$1").split(" on ")[0].trim(),n=/^(?:webOS|i(?:OS|P))/.test(n)?n:n.charAt(0).toUpperCase()+n.slice(1),{os:n}}).shift()},e.prototype.getOsPattern=function(r){var t=r;return(typeof r=="string"?r:void 0)||t.pattern||t.name},e.prototype.handleMissingError=function(){throw new Error(`Please give user-agent.
> browser(navigator.userAgent or res.headers['user-agent']).`)},e}();function ee(e,r){return r={exports:{}},e(r,r.exports),r.exports}var F=ee(function(e){var r=e.exports=typeof window<"u"&&window.Math==Math?window:typeof self<"u"&&self.Math==Math?self:Function("return this")();typeof __g=="number"&&(__g=r)}),D=ee(function(e){var r=e.exports={version:"2.5.7"};typeof __e=="number"&&(__e=r)});D.version;var W=function(e){return typeof e=="object"?e!==null:typeof e=="function"},Se=function(e){if(!W(e))throw TypeError(e+" is not an object!");return e},ne=function(e){try{return!!e()}catch{return!0}},me=!ne(function(){return Object.defineProperty({},"a",{get:function(){return 7}}).a!=7}),le=F.document,or=W(le)&&W(le.createElement),ar=function(e){return or?le.createElement(e):{}},ir=!me&&!ne(function(){return Object.defineProperty(ar("div"),"a",{get:function(){return 7}}).a!=7}),sr=function(e,r){if(!W(e))return e;var t,n;if(r&&typeof(t=e.toString)=="function"&&!W(n=t.call(e))||typeof(t=e.valueOf)=="function"&&!W(n=t.call(e))||!r&&typeof(t=e.toString)=="function"&&!W(n=t.call(e)))return n;throw TypeError("Can't convert object to primitive value")},cr=Object.defineProperty,ur=me?Object.defineProperty:function(r,t,n){if(Se(r),t=sr(t,!0),Se(n),ir)try{return cr(r,t,n)}catch{}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(r[t]=n.value),r},lr={f:ur},fr=function(e,r){return{enumerable:!(e&1),configurable:!(e&2),writable:!(e&4),value:r}},Y=me?function(e,r,t){return lr.f(e,r,fr(1,t))}:function(e,r,t){return e[r]=t,e},pr={}.hasOwnProperty,xe=function(e,r){return pr.call(e,r)},dr=0,mr=Math.random(),je=function(e){return"Symbol(".concat(e===void 0?"":e,")_",(++dr+mr).toString(36))},vr=ee(function(e){var r=je("src"),t="toString",n=Function[t],o=(""+n).split(t);D.inspectSource=function(a){return n.call(a)},(e.exports=function(a,i,s,d){var l=typeof s=="function";l&&(xe(s,"name")||Y(s,"name",i)),a[i]!==s&&(l&&(xe(s,r)||Y(s,r,a[i]?""+a[i]:o.join(String(i)))),a===F?a[i]=s:d?a[i]?a[i]=s:Y(a,i,s):(delete a[i],Y(a,i,s)))})(Function.prototype,t,function(){return typeof this=="function"&&this[r]||n.call(this)})}),hr=function(e){if(typeof e!="function")throw TypeError(e+" is not a function!");return e},fe=function(e,r,t){if(hr(e),r===void 0)return e;switch(t){case 1:return function(n){return e.call(r,n)};case 2:return function(n,o){return e.call(r,n,o)};case 3:return function(n,o,a){return e.call(r,n,o,a)}}return function(){return e.apply(r,arguments)}},ce="prototype",P=function(e,r,t){var n=e&P.F,o=e&P.G,a=e&P.S,i=e&P.P,s=e&P.B,d=o?F:a?F[r]||(F[r]={}):(F[r]||{})[ce],l=o?D:D[r]||(D[r]={}),k=l[ce]||(l[ce]={}),m,S,v,I;o&&(t=r);for(m in t)S=!n&&d&&d[m]!==void 0,v=(S?d:t)[m],I=s&&S?fe(v,F):i&&typeof v=="function"?fe(Function.call,v):v,d&&vr(d,m,v,e&P.U),l[m]!=v&&Y(l,m,I),i&&k[m]!=v&&(k[m]=v)};F.core=D;P.F=1;P.G=2;P.S=4;P.P=8;P.B=16;P.W=32;P.U=64;P.R=128;var B=P,_r={}.toString,Re=function(e){return _r.call(e).slice(8,-1)},gr=Object("z").propertyIsEnumerable(0)?Object:function(e){return Re(e)=="String"?e.split(""):Object(e)},Fe=function(e){if(e==null)throw TypeError("Can't call method on  "+e);return e},br=function(e){return Object(Fe(e))},wr=Math.ceil,yr=Math.floor,Sr=function(e){return isNaN(e=+e)?0:(e>0?yr:wr)(e)},xr=Math.min,Or=function(e){return e>0?xr(Sr(e),9007199254740991):0},Oe=Array.isArray||function(r){return Re(r)=="Array"},Pr=ee(function(e){var r="__core-js_shared__",t=F[r]||(F[r]={});(e.exports=function(n,o){return t[n]||(t[n]=o!==void 0?o:{})})("versions",[]).push({version:D.version,mode:"global",copyright:"© 2018 Denis Pushkarev (zloirock.ru)"})}),kr=ee(function(e){var r=Pr("wks"),t=F.Symbol,n=typeof t=="function",o=e.exports=function(a){return r[a]||(r[a]=n&&t[a]||(n?t:je)("Symbol."+a))};o.store=r}),Er=kr("species"),Mr=function(e){var r;return Oe(e)&&(r=e.constructor,typeof r=="function"&&(r===Array||Oe(r.prototype))&&(r=void 0),W(r)&&(r=r[Er],r===null&&(r=void 0))),r===void 0?Array:r},Ar=function(e,r){return new(Mr(e))(r)},Ie=function(e,r){var t=e==1,n=e==2,o=e==3,a=e==4,i=e==6,s=e==5||i,d=r||Ar;return function(l,k,m){for(var S=br(l),v=gr(S),I=fe(k,m,3),L=Or(v.length),E=0,R=t?d(l,L):n?d(l,0):void 0,u,w;L>E;E++)if((s||E in v)&&(u=v[E],w=I(u,E,S),e)){if(t)R[E]=w;else if(w)switch(e){case 3:return!0;case 5:return u;case 6:return E;case 2:R.push(u)}else if(a)return!1}return i?-1:o||a?a:R}},Te=function(e,r){return!!e&&ne(function(){r?e.call(null,function(){},1):e.call(null)})},jr=Ie(2);B(B.P+B.F*!Te([].filter,!0),"Array",{filter:function(r){return jr(this,r,arguments[1])}});D.Array.filter;var Rr=Ie(1);B(B.P+B.F*!Te([].map,!0),"Array",{map:function(r){return Rr(this,r,arguments[1])}});D.Array.map;var pe=`	
\v\f\r   ᠎             　\u2028\u2029\uFEFF`,te="["+pe+"]",Pe="​",Fr=RegExp("^"+te+te+"*"),Ir=RegExp(te+te+"*$"),Ce=function(e,r,t){var n={},o=ne(function(){return!!pe[e]()||Pe[e]()!=Pe}),a=n[e]=o?r(Tr):pe[e];t&&(n[t]=a),B(B.P+B.F*o,"String",n)},Tr=Ce.trim=function(e,r){return e=String(Fe(e)),r&1&&(e=e.replace(Fr,"")),r&2&&(e=e.replace(Ir,"")),e},Cr=Ce;Cr("trim",function(e){return function(){return e(this,3)}});D.String.trim;var Dr=typeof window<"u"?window.navigator:void 0,Nr=typeof process<"u"?process:void 0;function Br(e){var r=new nr(e,Dr,Nr);return r.detect()}function ke(e,r,t){const n=e.slice();return n[15]=r[t][0],n[16]=r[t][1],n[17]=r,n[18]=t,n}function Ee(e){let r,t,n,o;function a(){e[9].call(r,e[17],e[18])}return{c(){r=M("input"),this.h()},l(i){r=A(i,"INPUT",{type:!0,placeholder:!0}),this.h()},h(){h(r,"type","text"),h(r,"placeholder",t=Ae(e[15]))},m(i,s){re(i,r,s),J(r,e[16]),n||(o=Z(r,"input",a),n=!0)},p(i,s){e=i,s&4&&t!==(t=Ae(e[15]))&&h(r,"placeholder",t),s&4&&r.value!==e[16]&&J(r,e[16])},d(i){i&&j(r),n=!1,o()}}}function Me(e){let r,t;return{c(){r=M("p"),t=K(e[4])},l(n){r=A(n,"P",{});var o=$(r);t=Q(o,e[4]),o.forEach(j)},m(n,o){re(n,r,o),f(r,t)},p(n,o){o&16&&ue(t,n[4])},d(n){n&&j(r)}}}function Lr(e){let r,t,n,o,a="Jolt",i,s,d,l,k,m,S=e[5]("mfa.notice")+"",v,I,L,E,R,u,w,x,V,N,T=e[5]("login")+"",X,G,q,_,C,oe,ve,H=we(e[2]),g=[];for(let c=0;c<H.length;c+=1)g[c]=Ee(ke(e,H,c));let y=e[4]&&Me(e);return document.title=_=de,{c(){r=M("div"),t=M("div"),n=M("form"),o=M("h1"),o.textContent=a,i=z(),s=M("input"),d=z(),l=M("input"),k=z(),m=M("p"),v=K(S),I=K(":"),L=z();for(let c=0;c<g.length;c+=1)g[c].c();E=z(),R=M("span"),u=M("label"),w=K("Remember me "),x=M("input"),V=z(),N=M("button"),X=K(T),G=z(),y&&y.c(),q=z(),C=M("meta"),this.h()},l(c){r=A(c,"DIV",{class:!0});var O=$(r);t=A(O,"DIV",{class:!0});var p=$(t);n=A(p,"FORM",{class:!0});var b=$(n);o=A(b,"H1",{class:!0,"data-svelte-h":!0}),Ue(o)!=="svelte-77qeyh"&&(o.textContent=a),i=U(b),s=A(b,"INPUT",{type:!0,placeholder:!0}),d=U(b),l=A(b,"INPUT",{type:!0,placeholder:!0}),k=U(b),m=A(b,"P",{class:!0});var ae=$(m);v=Q(ae,S),I=Q(ae,":"),ae.forEach(j),L=U(b);for(let se=0;se<g.length;se+=1)g[se].l(b);E=U(b),R=A(b,"SPAN",{class:!0});var he=$(R);u=A(he,"LABEL",{});var ie=$(u);w=Q(ie,"Remember me "),x=A(ie,"INPUT",{type:!0,name:!0}),ie.forEach(j),he.forEach(j),V=U(b),N=A(b,"BUTTON",{type:!0});var _e=$(N);X=Q(_e,T),_e.forEach(j),b.forEach(j),G=U(p),y&&y.l(p),p.forEach(j),O.forEach(j),q=U(c);const ge=$e("svelte-1g26ixu",document.head);C=A(ge,"META",{name:!0,content:!0}),ge.forEach(j),this.h()},h(){h(o,"class","text-3xl"),h(s,"type","email"),h(s,"placeholder","Email"),h(l,"type","password"),h(l,"placeholder","Password"),h(m,"class","text-xs text-gray-500"),h(x,"type","checkbox"),h(x,"name","remember-me"),h(R,"class","flex justify-center"),h(N,"type","submit"),h(n,"class","flex flex-col"),h(t,"class","rounded-xl relative items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm px-6 py-12 max-w-[90%] mb-auto"),h(r,"class","w-full h-full flex items-center flex-col justify-center relative"),h(C,"name","description"),h(C,"content","Jolt - Login")},m(c,O){re(c,r,O),f(r,t),f(t,n),f(n,o),f(n,i),f(n,s),J(s,e[0]),f(n,d),f(n,l),J(l,e[1]),f(n,k),f(n,m),f(m,v),f(m,I),f(n,L);for(let p=0;p<g.length;p+=1)g[p]&&g[p].m(n,null);f(n,E),f(n,R),f(R,u),f(u,w),f(u,x),x.checked=e[3],f(n,V),f(n,N),f(N,X),f(t,G),y&&y.m(t,null),re(c,q,O),f(document.head,C),oe||(ve=[Z(s,"input",e[7]),Z(l,"input",e[8]),Z(x,"change",e[10]),Z(n,"submit",We(e[6]))],oe=!0)},p(c,[O]){if(O&1&&s.value!==c[0]&&J(s,c[0]),O&2&&l.value!==c[1]&&J(l,c[1]),O&32&&S!==(S=c[5]("mfa.notice")+"")&&ue(v,S),O&4){H=we(c[2]);let p;for(p=0;p<H.length;p+=1){const b=ke(c,H,p);g[p]?g[p].p(b,O):(g[p]=Ee(b),g[p].c(),g[p].m(n,E))}for(;p<g.length;p+=1)g[p].d(1);g.length=H.length}O&8&&(x.checked=c[3]),O&32&&T!==(T=c[5]("login")+"")&&ue(X,T),c[4]?y?y.p(c,O):(y=Me(c),y.c(),y.m(t,null)):y&&(y.d(1),y=null),O&0&&_!==(_=de)&&(document.title=_)},i:be,o:be,d(c){c&&(j(r),j(q)),Ve(g,c),y&&y.d(),j(C),oe=!1,Ne(ve)}}}const de="Jolt - Login";function Ae(e){return{Totp:"MFA TOTP",Recovery:"MFA Recovery Code",Password:"Password"}[e]??"Unknown MFA Method"}function zr(e,r,t){let n;Be(e,Xe,u=>t(5,n=u));const o=ye(Ge),a=ye(He);let i="",s="",d=[["Totp",""],["Recovery",""],["Password",""]],l=!0,k;function m(){const{mobile:u,os:w,name:x}=Br();return`Jolt ${u?"mobile":"desktop"} on ${("__TAURI__"in window?w??x:x??w)??"Unknown Platform"}`}async function S(u){if(u.result=="Disabled"){t(4,k=`Account ${u.user_id} is disabled.`);return}if(u.result=="Success"){o.set(u),l&&localStorage.setItem("session",JSON.stringify(u)),await qe(Ke);return}}async function v(){var X,G,q;let u;const w=(X=d.find(([_])=>_=="Totp"))==null?void 0:X[1].trim(),x=(G=d.find(([_])=>_=="Recovery"))==null?void 0:G[1].trim(),V=(q=d.find(([_])=>_=="Password"))==null?void 0:q[1].trim();w!=null&&w!=""?u={totp_code:w}:x!=null&&x!=""?u={recovery_code:x}:V!=null&&V!=""&&(u={password:V});const N=m(),T=await a.api.login({email:i,password:s,friendly_name:N}).catch(_=>{t(4,k=_)});if(T!=null){if(T.result=="MFA"){const _=await a.api.login({mfa_ticket:T.ticket,mfa_response:u,friendly_name:N}).catch(C=>{t(4,k=C)});if(_==null)return;if(_.result=="MFA"){t(4,k="Invalid MFA method or code."),t(2,d=_.allowed_methods.map(C=>[C,""]));return}await S(_);return}await S(T)}}function I(){i=this.value,t(0,i)}function L(){s=this.value,t(1,s)}function E(u,w){u[w][1]=this.value,t(2,d)}function R(){l=this.checked,t(3,l)}return"__TAURI__"in window&&Je.setTitle(de),[i,s,d,l,k,n,v,I,L,E,R]}class Kr extends Le{constructor(r){super(),ze(this,r,zr,Lr,De,{})}}export{Kr as component};