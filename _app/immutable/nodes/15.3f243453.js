import{s as L,p as W,f as h,a as v,g as b,h as Q,J as N,c as $,d as j,j as C,i as V,z as c,A as X,N as Y,O as q,r as Z}from"../chunks/scheduler.7420d6ca.js";import{S as tt,i as et,f as A,b as B,d as D,m as E,a as F,t as J,e as M}from"../chunks/index.637134e4.js";import{g as P}from"../chunks/context.92045884.js";import{I as R}from"../chunks/InputSetting.af4eb715.js";import{s as nt}from"../chunks/context.9abfb385.js";import{c as st}from"../chunks/context.645f4abc.js";function at(i){var I;let t,a,p="Server Name",m,r,o,u,l,g="Server Description",_,e,x,y,f,O="Submit",d,S,w;function U(n){i[5](n)}let z={type:"text"};i[0]!==void 0&&(z.value=i[0]),r=new R({props:z}),W.push(()=>A(r,"value",U));function G(n){i[6](n)}let H={type:"textarea",placeholder:"Write something about "+(((I=i[2])==null?void 0:I.name)??"this server")+"..."};return i[1]!==void 0&&(H.value=i[1]),e=new R({props:H}),W.push(()=>A(e,"value",G)),{c(){t=h("form"),a=h("h1"),a.textContent=p,m=v(),B(r.$$.fragment),u=v(),l=h("h1"),l.textContent=g,_=v(),B(e.$$.fragment),y=v(),f=h("button"),f.textContent=O,this.h()},l(n){t=b(n,"FORM",{id:!0});var s=Q(t);a=b(s,"H1",{class:!0,"data-svelte-h":!0}),N(a)!=="svelte-16fp491"&&(a.textContent=p),m=$(s),D(r.$$.fragment,s),u=$(s),l=b(s,"H1",{class:!0,"data-svelte-h":!0}),N(l)!=="svelte-1ygkrx4"&&(l.textContent=g),_=$(s),D(e.$$.fragment,s),y=$(s),f=b(s,"BUTTON",{type:!0,"data-svelte-h":!0}),N(f)!=="svelte-1ou7dtz"&&(f.textContent=O),s.forEach(j),this.h()},h(){C(a,"class","text-xl uppercase"),C(l,"class","text-xl uppercase"),C(f,"type","submit"),C(t,"id","edit-server-form")},m(n,s){V(n,t,s),c(t,a),c(t,m),E(r,t,null),c(t,u),c(t,l),c(t,_),E(e,t,null),c(t,y),c(t,f),d=!0,S||(w=X(t,"submit",Y(i[4])),S=!0)},p(n,[s]){var T;const K={};!o&&s&1&&(o=!0,K.value=n[0],q(()=>o=!1)),r.$set(K);const k={};s&4&&(k.placeholder="Write something about "+(((T=n[2])==null?void 0:T.name)??"this server")+"..."),!x&&s&2&&(x=!0,k.value=n[1],q(()=>x=!1)),e.$set(k)},i(n){d||(F(r.$$.fragment,n),F(e.$$.fragment,n),d=!0)},o(n){J(r.$$.fragment,n),J(e.$$.fragment,n),d=!1},d(n){n&&j(t),M(r),M(e),S=!1,w()}}}function it(i,t,a){let p;const m=P(nt);Z(i,m,e=>a(2,p=e));const r=P(st);let o,u;m.subscribe(e=>{e!=null&&(a(0,o=e.name),a(1,u=e.description??""))});function l(){p!=null&&r.api.editServer(p._id,{name:o,description:u})}function g(e){o=e,a(0,o)}function _(e){u=e,a(1,u)}return[o,u,p,m,l,g,_]}class ft extends tt{constructor(t){super(),et(this,t,it,at,L,{})}}export{ft as component};
