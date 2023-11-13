import{s as V,n as J,r as X}from"../chunks/scheduler.0beedca7.js";import{S as $,i as Q,g as p,s as k,h as f,j as E,C as j,c as T,f as _,D as Y,k as i,a as R,x as r,G as q,y as U,F as Z,m as ee,n as te,o as ae}from"../chunks/index.433d2ede.js";import{g as re}from"../chunks/navigation.38c89109.js";import{e as se}from"../chunks/singletons.1d633bf7.js";import{g as ne,c as le}from"../chunks/context.62a025aa.js";import{g as oe}from"../chunks/chunk-NMUKSDLG.3f77d6f4.js";function K(o){let s,t;return{c(){s=p("p"),t=ee(o[3])},l(e){s=f(e,"P",{});var a=E(s);t=te(a,o[3]),a.forEach(_)},m(e,a){R(e,s,a),r(s,t)},p(e,a){a&8&&ae(t,e[3])},d(e){e&&_(s)}}}function ie(o){let s,t,e,a,m="Create Server",v,c,w,d,S,C,A=`Markdown in the server description is supported.
				<a href="https://developers.revolt.chat/markdown" target="_blank" rel="nonreferrer" class="svelte-1uprox0">Learn more here</a>.`,I,y,b,B="Is your server NSFW?",D,g,F,x,W="Create Server",H,L,N,O,G,n=o[3]&&K(o);return document.title=N=z,{c(){s=p("main"),t=p("div"),e=p("form"),a=p("h1"),a.textContent=m,v=k(),c=p("input"),w=k(),d=p("textarea"),S=k(),C=p("p"),C.innerHTML=A,I=k(),y=p("span"),b=p("label"),b.textContent=B,D=k(),g=p("input"),F=k(),x=p("button"),x.textContent=W,H=k(),n&&n.c(),L=k(),this.h()},l(l){s=f(l,"MAIN",{class:!0});var h=E(s);t=f(h,"DIV",{class:!0});var P=E(t);e=f(P,"FORM",{id:!0,class:!0});var u=E(e);a=f(u,"H1",{"data-svelte-h":!0}),j(a)!=="svelte-1r4xpqr"&&(a.textContent=m),v=T(u),c=f(u,"INPUT",{type:!0,placeholder:!0}),w=T(u),d=f(u,"TEXTAREA",{placeholder:!0,class:!0}),E(d).forEach(_),S=T(u),C=f(u,"P",{"data-svelte-h":!0}),j(C)!=="svelte-8izkyp"&&(C.innerHTML=A),I=T(u),y=f(u,"SPAN",{class:!0});var M=E(y);b=f(M,"LABEL",{class:!0,for:!0,"data-svelte-h":!0}),j(b)!=="svelte-1lqv1kj"&&(b.textContent=B),D=T(M),g=f(M,"INPUT",{type:!0,name:!0}),M.forEach(_),F=T(u),x=f(u,"BUTTON",{type:!0,"data-svelte-h":!0}),j(x)!=="svelte-sjlv6i"&&(x.textContent=W),u.forEach(_),H=T(P),n&&n.l(P),P.forEach(_),h.forEach(_),L=T(l),Y("svelte-1gb01zc",document.head).forEach(_),this.h()},h(){i(c,"type","text"),i(c,"placeholder","What do you want to name your server?"),i(d,"placeholder","Describe your server (Optional)"),i(d,"class","svelte-1uprox0"),i(b,"class","pr-2"),i(b,"for","nsfw"),i(g,"type","checkbox"),i(g,"name","nsfw"),i(y,"class","flex justify-center"),i(x,"type","submit"),i(e,"id","create-server-form"),i(e,"class","modal-base"),i(t,"class","modal"),i(s,"class","main-content-container svelte-1uprox0")},m(l,h){R(l,s,h),r(s,t),r(t,e),r(e,a),r(e,v),r(e,c),q(c,o[0]),r(e,w),r(e,d),q(d,o[1]),r(e,S),r(e,C),r(e,I),r(e,y),r(y,b),r(y,D),r(y,g),g.checked=o[2],r(e,F),r(e,x),r(t,H),n&&n.m(t,null),R(l,L,h),O||(G=[U(c,"input",o[5]),U(d,"input",o[6]),U(g,"change",o[7]),U(e,"submit",Z(o[4]))],O=!0)},p(l,[h]){h&1&&c.value!==l[0]&&q(c,l[0]),h&2&&q(d,l[1]),h&4&&(g.checked=l[2]),l[3]?n?n.p(l,h):(n=K(l),n.c(),n.m(t,null)):n&&(n.d(1),n=null),h&0&&N!==(N=z)&&(document.title=N)},i:J,o:J,d(l){l&&(_(s),_(L)),n&&n.d(),O=!1,X(G)}}}const z="Jolt - Create Server";function ce(o,s,t){const e=ne(le);let a="",m="",v=!1,c;async function w(){if(a==""){t(3,c="Server name is required.");return}const{server:A,channels:I}=await e.createServer({name:a,description:m==""?void 0:m,nsfw:v});await re(`${se}/servers/${A._id}/channels/${I[0]._id}`)}function d(){a=this.value,t(0,a)}function S(){m=this.value,t(1,m)}function C(){v=this.checked,t(2,v)}return"__TAURI__"in window&&oe.setTitle(z),[a,m,v,c,w,d,S,C]}class ve extends ${constructor(s){super(),Q(this,s,ce,ie,V,{})}}export{ve as component};
