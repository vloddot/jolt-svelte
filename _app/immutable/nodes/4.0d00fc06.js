import{s as B,v as E,f as j,a as $,g as q,h as F,c as d,d as _,j as J,i as h,z as L,w as P,x as R,y as U,r as V,o as H,J as O,u as Q,e as g,G as T}from"../chunks/scheduler.7420d6ca.js";import{S as W,i as X,b as k,d as C,m as y,a as u,t as p,c as b,e as M,g as v}from"../chunks/index.637134e4.js";import{e as w}from"../chunks/each.e59479a4.js";import{p as Y}from"../chunks/stores.25a77f8c.js";import{g as D}from"../chunks/context.92045884.js";import{C as z}from"../chunks/Channel.8297c014.js";import{s as Z}from"../chunks/context.c622ed87.js";import{c as x}from"../chunks/context.645f4abc.js";import{w as ee}from"../chunks/index.5b89e149.js";import{C as te}from"../chunks/ChannelItem.808dcd4a.js";import{e as S}from"../chunks/singletons.084b249e.js";import{G as ne}from"../chunks/GenericUserCircleIcon.cf1ebf73.js";function I(i,n,r){const e=i.slice();return e[8]=n[r],e}function le(i){let n,r,e,s="Friends",f;return n=new ne({}),{c(){k(n.$$.fragment),r=$(),e=j("span"),e.textContent=s},l(t){C(n.$$.fragment,t),r=d(t),e=q(t,"SPAN",{"data-svelte-h":!0}),O(e)!=="svelte-98g2g1"&&(e.textContent=s)},m(t,m){y(n,t,m),h(t,r,m),h(t,e,m),f=!0},p:Q,i(t){f||(u(n.$$.fragment,t),f=!0)},o(t){p(n.$$.fragment,t),f=!1},d(t){t&&(_(r),_(e)),M(n,t)}}}function G(i){let n,r,e,s=i[1]!=null&&N(i),f=w(i[0]),t=[];for(let a=0;a<f.length;a+=1)t[a]=K(I(i,f,a));const m=a=>p(t[a],1,1,()=>{t[a]=null});return{c(){s&&s.c(),n=$();for(let a=0;a<t.length;a+=1)t[a].c();r=g()},l(a){s&&s.l(a),n=d(a);for(let l=0;l<t.length;l+=1)t[l].l(a);r=g()},m(a,l){s&&s.m(a,l),h(a,n,l);for(let o=0;o<t.length;o+=1)t[o]&&t[o].m(a,l);h(a,r,l),e=!0},p(a,l){if(a[1]!=null?s?(s.p(a,l),l&2&&u(s,1)):(s=N(a),s.c(),u(s,1),s.m(n.parentNode,n)):s&&(v(),p(s,1,1,()=>{s=null}),b()),l&1){f=w(a[0]);let o;for(o=0;o<f.length;o+=1){const c=I(a,f,o);t[o]?(t[o].p(c,l),u(t[o],1)):(t[o]=K(c),t[o].c(),u(t[o],1),t[o].m(r.parentNode,r))}for(v(),o=f.length;o<t.length;o+=1)m(o);b()}},i(a){if(!e){u(s);for(let l=0;l<f.length;l+=1)u(t[l]);e=!0}},o(a){p(s),t=t.filter(Boolean);for(let l=0;l<t.length;l+=1)p(t[l]);e=!1},d(a){a&&(_(n),_(r)),s&&s.d(a),T(t,a)}}}function N(i){let n,r;return n=new z({props:{channel:i[1]}}),{c(){k(n.$$.fragment)},l(e){C(n.$$.fragment,e)},m(e,s){y(n,e,s),r=!0},p(e,s){const f={};s&2&&(f.channel=e[1]),n.$set(f)},i(e){r||(u(n.$$.fragment,e),r=!0)},o(e){p(n.$$.fragment,e),r=!1},d(e){M(n,e)}}}function A(i){let n,r;return n=new z({props:{channel:i[8]}}),{c(){k(n.$$.fragment)},l(e){C(n.$$.fragment,e)},m(e,s){y(n,e,s),r=!0},p(e,s){const f={};s&1&&(f.channel=e[8]),n.$set(f)},i(e){r||(u(n.$$.fragment,e),r=!0)},o(e){p(n.$$.fragment,e),r=!1},d(e){M(n,e)}}}function K(i){let n,r,e=i[8].channel_type!="SavedMessages"&&A(i);return{c(){e&&e.c(),n=g()},l(s){e&&e.l(s),n=g()},m(s,f){e&&e.m(s,f),h(s,n,f),r=!0},p(s,f){s[8].channel_type!="SavedMessages"?e?(e.p(s,f),f&1&&u(e,1)):(e=A(s),e.c(),u(e,1),e.m(n.parentNode,n)):e&&(v(),p(e,1,1,()=>{e=null}),b())},i(s){r||(u(e),r=!0)},o(s){p(e),r=!1},d(s){s&&_(n),e&&e.d(s)}}}function se(i){let n,r,e,s,f;r=new te({props:{href:S+"/friends",selected:i[2].url.pathname==`${S}/friends`,$$slots:{default:[le]},$$scope:{ctx:i}}});let t=i[0]!=null&&G(i);const m=i[3].default,a=E(m,i,i[4],null);return{c(){n=j("div"),k(r.$$.fragment),e=$(),t&&t.c(),s=$(),a&&a.c(),this.h()},l(l){n=q(l,"DIV",{class:!0});var o=F(n);C(r.$$.fragment,o),e=d(o),t&&t.l(o),o.forEach(_),s=d(l),a&&a.l(l),this.h()},h(){J(n,"class","channel-bar-container")},m(l,o){h(l,n,o),y(r,n,null),L(n,e),t&&t.m(n,null),h(l,s,o),a&&a.m(l,o),f=!0},p(l,[o]){const c={};o&4&&(c.selected=l[2].url.pathname==`${S}/friends`),o&16&&(c.$$scope={dirty:o,ctx:l}),r.$set(c),l[0]!=null?t?(t.p(l,o),o&1&&u(t,1)):(t=G(l),t.c(),u(t,1),t.m(n,null)):t&&(v(),p(t,1,1,()=>{t=null}),b()),a&&a.p&&(!f||o&16)&&P(a,m,l,l[4],f?U(m,l[4],o,null):R(l[4]),null)},i(l){f||(u(r.$$.fragment,l),u(t),u(a,l),f=!0)},o(l){p(r.$$.fragment,l),p(t),p(a,l),f=!1},d(l){l&&(_(n),_(s)),M(r),t&&t.d(),a&&a.d(l)}}}function ae(i,n,r){let e,s;V(i,Y,c=>r(2,s=c));let{$$slots:f={},$$scope:t}=n;const m=D(x),a=D(Z)??ee();let l=[];function o(){r(0,l=Array.from(m.api.cache.channels.values()).filter(c=>["DirectMessage","Group","SavedMessages"].includes(c.channel_type))),(l.length??0)==0&&m.ready&&m.api.fetchDirectMessages().then(c=>r(0,l=c))}return m.on("Ready",o),H(o),i.$$set=c=>{"$$scope"in c&&r(4,t=c.$$scope)},i.$$.update=()=>{i.$$.dirty&1&&r(1,e=l==null?void 0:l.find(c=>c.channel_type=="SavedMessages"))},a.set(void 0),[l,e,s,f,t]}class ge extends W{constructor(n){super(),X(this,n,ae,se,B,{})}}export{ge as component};
