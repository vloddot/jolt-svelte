import{s as N,d as U,u as q,g as H,e as P}from"../chunks/scheduler.bc65eea2.js";import{S as R,i as F,g as v,s as T,h as y,j as w,c as x,z as G,f as p,k as b,a as D,x as k,A as J,d as $,b as Q,t as I,y as W,r as X,u as Y,v as Z,w as tt,p as et}from"../chunks/index.cf715be0.js";import{e as z}from"../chunks/each.e59479a4.js";import{S as st}from"../chunks/Section.bb21ee41.js";import{g as B,c as nt,b as at}from"../chunks/context.90bee080.js";/* empty css                      */const lt=[{type:"header",title:"User Settings"},{type:"link",title:"Account",id:"account"},{type:"link",title:"Sessions",id:"sessions"},{type:"header",title:"Client Settings"},{type:"link",title:"Text & Images",id:"text"},{type:"link",title:"Appearence",id:"appearence"}],ot=()=>({sections:lt}),ht=Object.freeze(Object.defineProperty({__proto__:null,load:ot},Symbol.toStringTag,{value:"Module"}));function K(i,n,a){const l=i.slice();return l[6]=n[a],l}function L(i){let n,a;return n=new st({props:{section:i[6]}}),{c(){X(n.$$.fragment)},l(l){Y(n.$$.fragment,l)},m(l,c){Z(n,l,c),a=!0},p(l,c){const f={};c&1&&(f.section=l[6]),n.$set(f)},i(l){a||($(n.$$.fragment,l),a=!0)},o(l){I(n.$$.fragment,l),a=!1},d(l){tt(n,l)}}}function it(i){let n,a,l,c,f,_,u,C="Logout",d,m,g,j,O,h=z(i[0].sections),s=[];for(let t=0;t<h.length;t+=1)s[t]=L(K(i,h,t));const M=t=>I(s[t],1,1,()=>{s[t]=null}),A=i[4].default,r=U(A,i,i[3],null);return{c(){n=v("div"),a=v("div");for(let t=0;t<s.length;t+=1)s[t].c();l=T(),c=v("hr"),f=T(),_=v("div"),u=v("button"),u.textContent=C,d=T(),m=v("main"),r&&r.c(),this.h()},l(t){n=y(t,"DIV",{class:!0});var o=w(n);a=y(o,"DIV",{class:!0});var e=w(a);for(let E=0;E<s.length;E+=1)s[E].l(e);l=x(e),c=y(e,"HR",{class:!0}),f=x(e),_=y(e,"DIV",{class:!0});var S=w(_);u=y(S,"BUTTON",{class:!0,"data-svelte-h":!0}),G(u)!=="svelte-1dwjcig"&&(u.textContent=C),S.forEach(p),e.forEach(p),o.forEach(p),d=x(t),m=y(t,"MAIN",{class:!0});var V=w(m);r&&r.l(V),V.forEach(p),this.h()},h(){b(c,"class","my-2 mr-2 border-gray-500"),b(u,"class","w-full text-start"),b(_,"class","hover:bg-gray-600"),b(a,"class","ml-2"),b(n,"class","channel-bar-container"),b(m,"class","main-content-container")},m(t,o){D(t,n,o),k(n,a);for(let e=0;e<s.length;e+=1)s[e]&&s[e].m(a,null);k(a,l),k(a,c),k(a,f),k(a,_),k(_,u),D(t,d,o),D(t,m,o),r&&r.m(m,null),g=!0,j||(O=J(u,"click",i[5]),j=!0)},p(t,[o]){if(o&1){h=z(t[0].sections);let e;for(e=0;e<h.length;e+=1){const S=K(t,h,e);s[e]?(s[e].p(S,o),$(s[e],1)):(s[e]=L(S),s[e].c(),$(s[e],1),s[e].m(a,l))}for(et(),e=h.length;e<s.length;e+=1)M(e);Q()}r&&r.p&&(!g||o&8)&&q(r,A,t,t[3],g?P(A,t[3],o,null):H(t[3]),null)},i(t){if(!g){for(let o=0;o<h.length;o+=1)$(s[o]);$(r,t),g=!0}},o(t){s=s.filter(Boolean);for(let o=0;o<s.length;o+=1)I(s[o]);I(r,t),g=!1},d(t){t&&(p(n),p(d),p(m)),W(s,t),r&&r.d(t),j=!1,O()}}}function rt(i,n,a){let{$$slots:l={},$$scope:c}=n,{data:f}=n;const _=B(nt),u=B(at),C=async()=>{await _.destroy(),u.set(null)};return i.$$set=d=>{"data"in d&&a(0,f=d.data),"$$scope"in d&&a(3,c=d.$$scope)},[f,_,u,c,l,C]}class pt extends R{constructor(n){super(),F(this,n,rt,it,N,{data:0})}}export{pt as component,ht as universal};
