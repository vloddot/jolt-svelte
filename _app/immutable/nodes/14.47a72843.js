import{s as L,p as W,f as h,a as v,g as b,h as Q,K,c as $,d as j,j as C,i as V,z as c,A as X,N as Y,O as q,r as Z}from"../chunks/scheduler.693b9c9b.js";import{S as tt,i as et,f as A,b as B,d as D,m as E,a as F,t as M,e as P}from"../chunks/index.bb1ba657.js";import{g as R,c as nt}from"../chunks/context.ca3e4b8d.js";import{I as U}from"../chunks/InputSetting.f967fb36.js";import{s as st}from"../chunks/context.c622ed87.js";function at(i){var H;let t,a,p="Server Name",m,r,o,u,l,g="Server Description",_,e,x,y,f,N="Submit",d,S,O;function G(n){i[5](n)}let w={type:"text"};i[0]!==void 0&&(w.value=i[0]),r=new U({props:w}),W.push(()=>A(r,"value",G));function J(n){i[6](n)}let z={type:"textarea",placeholder:"Write something about "+(((H=i[2])==null?void 0:H.name)??"this server")+"..."};return i[1]!==void 0&&(z.value=i[1]),e=new U({props:z}),W.push(()=>A(e,"value",J)),{c(){t=h("form"),a=h("h1"),a.textContent=p,m=v(),B(r.$$.fragment),u=v(),l=h("h1"),l.textContent=g,_=v(),B(e.$$.fragment),y=v(),f=h("button"),f.textContent=N,this.h()},l(n){t=b(n,"FORM",{id:!0});var s=Q(t);a=b(s,"H1",{class:!0,"data-svelte-h":!0}),K(a)!=="svelte-16fp491"&&(a.textContent=p),m=$(s),D(r.$$.fragment,s),u=$(s),l=b(s,"H1",{class:!0,"data-svelte-h":!0}),K(l)!=="svelte-1ygkrx4"&&(l.textContent=g),_=$(s),D(e.$$.fragment,s),y=$(s),f=b(s,"BUTTON",{type:!0,"data-svelte-h":!0}),K(f)!=="svelte-1ou7dtz"&&(f.textContent=N),s.forEach(j),this.h()},h(){C(a,"class","text-xl uppercase"),C(l,"class","text-xl uppercase"),C(f,"type","submit"),C(t,"id","edit-server-form")},m(n,s){V(n,t,s),c(t,a),c(t,m),E(r,t,null),c(t,u),c(t,l),c(t,_),E(e,t,null),c(t,y),c(t,f),d=!0,S||(O=X(t,"submit",Y(i[4])),S=!0)},p(n,[s]){var T;const I={};!o&&s&1&&(o=!0,I.value=n[0],q(()=>o=!1)),r.$set(I);const k={};s&4&&(k.placeholder="Write something about "+(((T=n[2])==null?void 0:T.name)??"this server")+"..."),!x&&s&2&&(x=!0,k.value=n[1],q(()=>x=!1)),e.$set(k)},i(n){d||(F(r.$$.fragment,n),F(e.$$.fragment,n),d=!0)},o(n){M(r.$$.fragment,n),M(e.$$.fragment,n),d=!1},d(n){n&&j(t),P(r),P(e),S=!1,O()}}}function it(i,t,a){let p;const m=R(st);Z(i,m,e=>a(2,p=e));const r=R(nt);let o,u;m.subscribe(e=>{e!=null&&(a(0,o=e.name),a(1,u=e.description??""))});function l(){p!=null&&r.api.editServer(p._id,{name:o,description:u})}function g(e){o=e,a(0,o)}function _(e){u=e,a(1,u)}return[o,u,p,m,l,g,_]}class mt extends tt{constructor(t){super(),et(this,t,it,at,L,{})}}export{mt as component};