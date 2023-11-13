import{s as E,d as F,u as K,g as L,e as P,c as R,o as U,n as V}from"../chunks/scheduler.0beedca7.js";import{S as z,i as H,g as B,r as v,s as $,h as j,j as J,u as C,c as g,f as p,k as O,a as _,v as M,x as Q,d as c,t as m,b as d,w as y,C as T,e as b,p as k,B as W}from"../chunks/index.433d2ede.js";import{e as w}from"../chunks/each.e59479a4.js";import{p as X}from"../chunks/stores.24c0b35f.js";import{g as Y,c as Z}from"../chunks/context.62a025aa.js";import{C as q}from"../chunks/Channel.b37d7ceb.js";import{C as x}from"../chunks/ChannelItem.1dd92b36.js";import{e as S}from"../chunks/singletons.77a13cb3.js";import{G as ee}from"../chunks/GenericUserCircleIcon.e3ed4165.js";function D(i,n,o){const e=i.slice();return e[7]=n[o],e}function te(i){let n,o,e,s="Friends",f;return n=new ee({}),{c(){v(n.$$.fragment),o=$(),e=B("span"),e.textContent=s},l(t){C(n.$$.fragment,t),o=g(t),e=j(t,"SPAN",{"data-svelte-h":!0}),T(e)!=="svelte-98g2g1"&&(e.textContent=s)},m(t,u){M(n,t,u),_(t,o,u),_(t,e,u),f=!0},p:V,i(t){f||(c(n.$$.fragment,t),f=!0)},o(t){m(n.$$.fragment,t),f=!1},d(t){t&&(p(o),p(e)),y(n,t)}}}function N(i){let n,o,e,s=i[1]!=null&&G(i),f=w(i[0]),t=[];for(let l=0;l<f.length;l+=1)t[l]=A(D(i,f,l));const u=l=>m(t[l],1,1,()=>{t[l]=null});return{c(){s&&s.c(),n=$();for(let l=0;l<t.length;l+=1)t[l].c();o=b()},l(l){s&&s.l(l),n=g(l);for(let a=0;a<t.length;a+=1)t[a].l(l);o=b()},m(l,a){s&&s.m(l,a),_(l,n,a);for(let r=0;r<t.length;r+=1)t[r]&&t[r].m(l,a);_(l,o,a),e=!0},p(l,a){if(l[1]!=null?s?(s.p(l,a),a&2&&c(s,1)):(s=G(l),s.c(),c(s,1),s.m(n.parentNode,n)):s&&(k(),m(s,1,1,()=>{s=null}),d()),a&1){f=w(l[0]);let r;for(r=0;r<f.length;r+=1){const h=D(l,f,r);t[r]?(t[r].p(h,a),c(t[r],1)):(t[r]=A(h),t[r].c(),c(t[r],1),t[r].m(o.parentNode,o))}for(k(),r=f.length;r<t.length;r+=1)u(r);d()}},i(l){if(!e){c(s);for(let a=0;a<f.length;a+=1)c(t[a]);e=!0}},o(l){m(s),t=t.filter(Boolean);for(let a=0;a<t.length;a+=1)m(t[a]);e=!1},d(l){l&&(p(n),p(o)),s&&s.d(l),W(t,l)}}}function G(i){let n,o;return n=new q({props:{channel:i[1]}}),{c(){v(n.$$.fragment)},l(e){C(n.$$.fragment,e)},m(e,s){M(n,e,s),o=!0},p(e,s){const f={};s&2&&(f.channel=e[1]),n.$set(f)},i(e){o||(c(n.$$.fragment,e),o=!0)},o(e){m(n.$$.fragment,e),o=!1},d(e){y(n,e)}}}function I(i){let n,o;return n=new q({props:{channel:i[7]}}),{c(){v(n.$$.fragment)},l(e){C(n.$$.fragment,e)},m(e,s){M(n,e,s),o=!0},p(e,s){const f={};s&1&&(f.channel=e[7]),n.$set(f)},i(e){o||(c(n.$$.fragment,e),o=!0)},o(e){m(n.$$.fragment,e),o=!1},d(e){y(n,e)}}}function A(i){let n,o,e=i[7].channel_type!="SavedMessages"&&I(i);return{c(){e&&e.c(),n=b()},l(s){e&&e.l(s),n=b()},m(s,f){e&&e.m(s,f),_(s,n,f),o=!0},p(s,f){s[7].channel_type!="SavedMessages"?e?(e.p(s,f),f&1&&c(e,1)):(e=I(s),e.c(),c(e,1),e.m(n.parentNode,n)):e&&(k(),m(e,1,1,()=>{e=null}),d())},i(s){o||(c(e),o=!0)},o(s){m(e),o=!1},d(s){s&&p(n),e&&e.d(s)}}}function ne(i){let n,o,e,s,f;o=new x({props:{href:S+"/friends",selected:i[2].url.pathname==`${S}/friends`,$$slots:{default:[te]},$$scope:{ctx:i}}});let t=i[0]!=null&&N(i);const u=i[3].default,l=F(u,i,i[4],null);return{c(){n=B("div"),v(o.$$.fragment),e=$(),t&&t.c(),s=$(),l&&l.c(),this.h()},l(a){n=j(a,"DIV",{class:!0});var r=J(n);C(o.$$.fragment,r),e=g(r),t&&t.l(r),r.forEach(p),s=g(a),l&&l.l(a),this.h()},h(){O(n,"class","channel-bar-container")},m(a,r){_(a,n,r),M(o,n,null),Q(n,e),t&&t.m(n,null),_(a,s,r),l&&l.m(a,r),f=!0},p(a,[r]){const h={};r&4&&(h.selected=a[2].url.pathname==`${S}/friends`),r&16&&(h.$$scope={dirty:r,ctx:a}),o.$set(h),a[0]!=null?t?(t.p(a,r),r&1&&c(t,1)):(t=N(a),t.c(),c(t,1),t.m(n,null)):t&&(k(),m(t,1,1,()=>{t=null}),d()),l&&l.p&&(!f||r&16)&&K(l,u,a,a[4],f?P(u,a[4],r,null):L(a[4]),null)},i(a){f||(c(o.$$.fragment,a),c(t),c(l,a),f=!0)},o(a){m(o.$$.fragment,a),m(t),m(l,a),f=!1},d(a){a&&(p(n),p(s)),y(o),t&&t.d(),l&&l.d(a)}}}function le(i,n,o){let e,s;R(i,X,r=>o(2,s=r));let{$$slots:f={},$$scope:t}=n;const u=Y(Z);let l=[];function a(){o(0,l=Array.from(u.cache.channels.values()).filter(r=>["DirectMessage","Group","SavedMessages"].includes(r.channel_type))),(l.length??0)==0&&u.ready&&u.fetchDirectMessages().then(r=>o(0,l=r))}return u.on("Ready",a),U(a),i.$$set=r=>{"$$scope"in r&&o(4,t=r.$$scope)},i.$$.update=()=>{i.$$.dirty&1&&o(1,e=l==null?void 0:l.find(r=>r.channel_type=="SavedMessages"))},[l,e,s,f,t]}class pe extends z{constructor(n){super(),H(this,n,le,ne,E,{})}}export{pe as component};