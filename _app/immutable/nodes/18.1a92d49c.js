import{s as re,n as w,k as pe,c as ke}from"../chunks/scheduler.0beedca7.js";import{S as ae,i as ce,g as b,s as O,m as F,h as T,j as V,c as R,n as K,f as g,C as H,k as E,a as U,x as h,y as fe,o as L,d as C,t as N,b as Q,r as ue,u as de,v as he,w as me,p as W,e as G,B as ge}from"../chunks/index.433d2ede.js";import{h as Z,u as be}from"../chunks/await_block.05af08bd.js";import{e as ee}from"../chunks/each.e59479a4.js";import{g as te,c as Te,b as we}from"../chunks/context.62a025aa.js";import{d as Ce}from"../chunks/index.esm.4b6e8736.js";import{d as J,c as ye}from"../chunks/calendar.5942d46b.js";import{c as De,g as Ee}from"../chunks/_commonjsHelpers.725317a4.js";var _e={exports:{}};(function(l,e){(function(o,t){l.exports=t()})(De,function(){return function(o,t,s){o=o||{};var i=t.prototype,n={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"};function r(c,_,f,u){return i.fromToBase(c,_,f,u)}s.en.relativeTime=n,i.fromToBase=function(c,_,f,u,m){for(var d,p,S,B=f.$locale().relativeTime||n,I=o.thresholds||[{l:"s",r:44,d:"second"},{l:"m",r:89},{l:"mm",r:44,d:"minute"},{l:"h",r:89},{l:"hh",r:21,d:"hour"},{l:"d",r:35},{l:"dd",r:25,d:"day"},{l:"M",r:45},{l:"MM",r:10,d:"month"},{l:"y",r:17},{l:"yy",d:"year"}],P=I.length,$=0;$<P;$+=1){var v=I[$];v.d&&(d=u?s(c).diff(f,v.d,!0):f.diff(c,v.d,!0));var M=(o.rounding||Math.round)(Math.abs(d));if(S=d>0,M<=v.r||!v.r){M<=1&&$>0&&(v=I[$-1]);var j=B[v.l];m&&(M=m(""+M)),p=typeof j=="string"?j.replace("%d",M):j(M,_,v.l,S);break}}if(_)return p;var x=S?B.future:B.past;return typeof x=="function"?x(p):x.replace("%s",p)},i.to=function(c,_){return r(c,_,this,!0)},i.from=function(c,_){return r(c,_,this)};var a=function(c){return c.$u?s.utc():s()};i.toNow=function(c){return this.to(a(this),c)},i.fromNow=function(c){return this.from(a(this),c)}}})})(_e);var $e=_e.exports;const Me=Ee($e);function se(l){let e,o="This Device";return{c(){e=b("p"),e.textContent=o},l(t){e=T(t,"P",{"data-svelte-h":!0}),H(e)!=="svelte-8e6226"&&(e.textContent=o)},m(t,s){U(t,e,s)},d(t){t&&g(e)}}}function Ve(l){let e,o,t,s,i,n=l[0].name+"",r,a,c,_,f,u=l[2].calendar()+"",m,d,p=l[2].fromNow()+"",S,B,I,P,$,v,M="Revoke",j,x,k=l[1]&&se();return{c(){e=b("div"),k&&k.c(),o=O(),t=b("div"),s=b("div"),i=b("h3"),r=F(n),a=O(),c=b("p"),_=F("Created "),f=b("time"),m=F(u),d=F(" ("),S=F(p),B=F(")."),I=O(),P=b("div"),$=O(),v=b("button"),v.textContent=M,this.h()},l(y){e=T(y,"DIV",{class:!0,"data-this-device":!0});var D=V(e);k&&k.l(D),o=R(D),t=T(D,"DIV",{class:!0});var q=V(t);s=T(q,"DIV",{class:!0});var z=V(s);i=T(z,"H3",{class:!0});var X=V(i);r=K(X,n),X.forEach(g),a=R(z),c=T(z,"P",{class:!0});var A=V(c);_=K(A,"Created "),f=T(A,"TIME",{});var Y=V(f);m=K(Y,u),Y.forEach(g),d=K(A," ("),S=K(A,p),B=K(A,")."),A.forEach(g),z.forEach(g),I=R(q),P=T(q,"DIV",{class:!0}),V(P).forEach(g),$=R(q),v=T(q,"BUTTON",{"data-svelte-h":!0}),H(v)!=="svelte-a5hzw9"&&(v.textContent=M),q.forEach(g),D.forEach(g),this.h()},h(){E(i,"class","header svelte-tg9o64"),E(c,"class","indented svelte-tg9o64"),E(s,"class","session-info svelte-tg9o64"),E(P,"class","flex-divider"),E(t,"class","flex-container"),E(e,"class","container svelte-tg9o64"),E(e,"data-this-device",l[1])},m(y,D){U(y,e,D),k&&k.m(e,null),h(e,o),h(e,t),h(t,s),h(s,i),h(i,r),h(s,a),h(s,c),h(c,_),h(c,f),h(f,m),h(c,d),h(c,S),h(c,B),h(t,I),h(t,P),h(t,$),h(t,v),j||(x=fe(v,"click",l[3]),j=!0)},p(y,[D]){y[1]?k||(k=se(),k.c(),k.m(e,o)):k&&(k.d(1),k=null),D&1&&n!==(n=y[0].name+"")&&L(r,n),D&4&&u!==(u=y[2].calendar()+"")&&L(m,u),D&4&&p!==(p=y[2].fromNow()+"")&&L(S,p),D&2&&E(e,"data-this-device",y[1])},i:w,o:w,d(y){y&&g(e),k&&k.d(),j=!1,x()}}}function Ne(l,e,o){let t;J.extend(ye),J.extend(Me);let{session:s}=e,{isThisDevice:i=!1}=e;function n(r){pe.call(this,l,r)}return l.$$set=r=>{"session"in r&&o(0,s=r.session),"isThisDevice"in r&&o(1,i=r.isThisDevice)},l.$$.update=()=>{l.$$.dirty&1&&o(2,t=J(Ce(s._id)))},[s,i,t,n]}class ve extends ae{constructor(e){super(),ce(this,e,Ne,Ve,re,{session:0,isThisDevice:1})}}function ne(l,e,o){const t=l.slice();return t[9]=e[o],t}function oe(l){let e,o;return e=new ve({props:{session:l[2],isThisDevice:!0}}),e.$on("click",l[5]),{c(){ue(e.$$.fragment)},l(t){de(e.$$.fragment,t)},m(t,s){he(e,t,s),o=!0},p(t,s){const i={};s&4&&(i.session=t[2]),e.$set(i)},i(t){o||(C(e.$$.fragment,t),o=!0)},o(t){N(e.$$.fragment,t),o=!1},d(t){me(e,t)}}}function Se(l){return{c:w,l:w,m:w,p:w,i:w,o:w,d:w}}function Be(l){let e,o,t=ee(l[1]),s=[];for(let n=0;n<t.length;n+=1)s[n]=ie(ne(l,t,n));const i=n=>N(s[n],1,1,()=>{s[n]=null});return{c(){for(let n=0;n<s.length;n+=1)s[n].c();e=G()},l(n){for(let r=0;r<s.length;r+=1)s[r].l(n);e=G()},m(n,r){for(let a=0;a<s.length;a+=1)s[a]&&s[a].m(n,r);U(n,e,r),o=!0},p(n,r){if(r&14){t=ee(n[1]);let a;for(a=0;a<t.length;a+=1){const c=ne(n,t,a);s[a]?(s[a].p(c,r),C(s[a],1)):(s[a]=ie(c),s[a].c(),C(s[a],1),s[a].m(e.parentNode,e))}for(W(),a=t.length;a<s.length;a+=1)i(a);Q()}},i(n){if(!o){for(let r=0;r<t.length;r+=1)C(s[r]);o=!0}},o(n){s=s.filter(Boolean);for(let r=0;r<s.length;r+=1)N(s[r]);o=!1},d(n){n&&g(e),ge(s,n)}}}function le(l){let e,o;function t(){return l[6](l[9])}return e=new ve({props:{session:l[9]}}),e.$on("click",t),{c(){ue(e.$$.fragment)},l(s){de(e.$$.fragment,s)},m(s,i){he(e,s,i),o=!0},p(s,i){l=s;const n={};i&2&&(n.session=l[9]),e.$set(n)},i(s){o||(C(e.$$.fragment,s),o=!0)},o(s){N(e.$$.fragment,s),o=!1},d(s){me(e,s)}}}function ie(l){var s;let e,o,t=l[9]._id!=((s=l[2])==null?void 0:s._id)&&le(l);return{c(){t&&t.c(),e=G()},l(i){t&&t.l(i),e=G()},m(i,n){t&&t.m(i,n),U(i,e,n),o=!0},p(i,n){var r;i[9]._id!=((r=i[2])==null?void 0:r._id)?t?(t.p(i,n),n&6&&C(t,1)):(t=le(i),t.c(),C(t,1),t.m(e.parentNode,e)):t&&(W(),N(t,1,1,()=>{t=null}),Q())},i(i){o||(C(t),o=!0)},o(i){N(t),o=!1},d(i){i&&g(e),t&&t.d(i)}}}function Ie(l){let e,o="Loading...";return{c(){e=b("p"),e.textContent=o},l(t){e=T(t,"P",{"data-svelte-h":!0}),H(e)!=="svelte-qdsr2u"&&(e.textContent=o)},m(t,s){U(t,e,s)},p:w,i:w,o:w,d(t){t&&g(e)}}}function Pe(l){let e,o,t,s,i,n,r="Revoke all other sessions",a,c,_,f=l[2]!=null&&oe(l),u={ctx:l,current:null,token:null,hasCatch:!1,pending:Ie,then:Be,catch:Se,blocks:[,,,]};return Z(s=l[0],u),{c(){e=b("div"),o=b("div"),f&&f.c(),t=O(),u.block.c(),i=O(),n=b("button"),n.textContent=r,this.h()},l(m){e=T(m,"DIV",{class:!0});var d=V(e);o=T(d,"DIV",{class:!0});var p=V(o);f&&f.l(p),p.forEach(g),t=R(d),u.block.l(d),i=R(d),n=T(d,"BUTTON",{"data-svelte-h":!0}),H(n)!=="svelte-pf3f3"&&(n.textContent=r),d.forEach(g),this.h()},h(){E(o,"class","my-4"),E(e,"class","mr-2")},m(m,d){U(m,e,d),h(e,o),f&&f.m(o,null),h(e,t),u.block.m(e,u.anchor=null),u.mount=()=>e,u.anchor=i,h(e,i),h(e,n),a=!0,c||(_=fe(n,"click",l[7]),c=!0)},p(m,[d]){l=m,l[2]!=null?f?(f.p(l,d),d&4&&C(f,1)):(f=oe(l),f.c(),C(f,1),f.m(o,null)):f&&(W(),N(f,1,1,()=>{f=null}),Q()),u.ctx=l,d&1&&s!==(s=l[0])&&Z(s,u)||be(u,l,d)},i(m){a||(C(f),C(u.block),a=!0)},o(m){N(f);for(let d=0;d<3;d+=1){const p=u.blocks[d];N(p)}a=!1},d(m){m&&g(e),f&&f.d(),u.block.d(),u.token=null,u=null,c=!1,_()}}}function je(l,e,o){let t,s;const i=te(Te),n=te(we);ke(l,n,u=>o(2,s=u));let r=new Array;async function a(u){o(1,r=await u)}const c=()=>{i.destroy(),n.set(null)},_=u=>{i.revokeSession(u._id),o(1,r=r.filter(m=>m._id!=u._id))},f=()=>i.revokeAllSessions(!1);return l.$$.update=()=>{l.$$.dirty&1&&a(t)},o(0,t=i.fetchSessions()),[t,r,s,i,n,c,_,f]}class ze extends ae{constructor(e){super(),ce(this,e,je,Pe,re,{})}}export{ze as component};