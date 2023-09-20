import{s as P,d as R,u as V,g as z,e as A,c as F,o as H}from"../chunks/scheduler.a21a5cad.js";import{S as J,i as O,g as Q,s as N,h as T,j as U,f as h,c as j,k as v,a as d,d as u,t as _,b as g,e as b,p as $,y as W,r as q,u as B,v as E,w as G}from"../chunks/index.4419476b.js";import{e as M}from"../chunks/each.e59479a4.js";import{p as X}from"../chunks/stores.91e800d7.js";import{g as y,c as Y}from"../chunks/context.898bb4a8.js";/* empty css                      */import{C as L}from"../chunks/Channel.938c66ce.js";import{s as Z,a as x}from"../chunks/context.fa34f1f8.js";import{w as D}from"../chunks/index.d8292243.js";function S(o,l,a){const t=o.slice();return t[10]=l[a],t}function C(o){let l,a,t,e=o[1]!=null&&w(o),r=M(o[0]),s=[];for(let n=0;n<r.length;n+=1)s[n]=K(S(o,r,n));const i=n=>_(s[n],1,1,()=>{s[n]=null});return{c(){e&&e.c(),l=N();for(let n=0;n<s.length;n+=1)s[n].c();a=b()},l(n){e&&e.l(n),l=j(n);for(let c=0;c<s.length;c+=1)s[c].l(n);a=b()},m(n,c){e&&e.m(n,c),d(n,l,c);for(let f=0;f<s.length;f+=1)s[f]&&s[f].m(n,c);d(n,a,c),t=!0},p(n,c){if(n[1]!=null?e?(e.p(n,c),c&2&&u(e,1)):(e=w(n),e.c(),u(e,1),e.m(l.parentNode,l)):e&&($(),_(e,1,1,()=>{e=null}),g()),c&1){r=M(n[0]);let f;for(f=0;f<r.length;f+=1){const p=S(n,r,f);s[f]?(s[f].p(p,c),u(s[f],1)):(s[f]=K(p),s[f].c(),u(s[f],1),s[f].m(a.parentNode,a))}for($(),f=r.length;f<s.length;f+=1)i(f);g()}},i(n){if(!t){u(e);for(let c=0;c<r.length;c+=1)u(s[c]);t=!0}},o(n){_(e),s=s.filter(Boolean);for(let c=0;c<s.length;c+=1)_(s[c]);t=!1},d(n){n&&(h(l),h(a)),e&&e.d(n),W(s,n)}}}function w(o){let l,a;return l=new L({props:{channel:o[1]}}),{c(){q(l.$$.fragment)},l(t){B(l.$$.fragment,t)},m(t,e){E(l,t,e),a=!0},p(t,e){const r={};e&2&&(r.channel=t[1]),l.$set(r)},i(t){a||(u(l.$$.fragment,t),a=!0)},o(t){_(l.$$.fragment,t),a=!1},d(t){G(l,t)}}}function I(o){let l,a;return l=new L({props:{channel:o[10]}}),{c(){q(l.$$.fragment)},l(t){B(l.$$.fragment,t)},m(t,e){E(l,t,e),a=!0},p(t,e){const r={};e&1&&(r.channel=t[10]),l.$set(r)},i(t){a||(u(l.$$.fragment,t),a=!0)},o(t){_(l.$$.fragment,t),a=!1},d(t){G(l,t)}}}function K(o){let l,a,t=o[10].channel_type!="SavedMessages"&&I(o);return{c(){t&&t.c(),l=b()},l(e){t&&t.l(e),l=b()},m(e,r){t&&t.m(e,r),d(e,l,r),a=!0},p(e,r){e[10].channel_type!="SavedMessages"?t?(t.p(e,r),r&1&&u(t,1)):(t=I(e),t.c(),u(t,1),t.m(l.parentNode,l)):t&&($(),_(t,1,1,()=>{t=null}),g())},i(e){a||(u(t),a=!0)},o(e){_(t),a=!1},d(e){e&&h(l),t&&t.d(e)}}}function ee(o){let l,a,t,e=o[0]!=null&&C(o);const r=o[5].default,s=R(r,o,o[4],null);return{c(){l=Q("div"),e&&e.c(),a=N(),s&&s.c(),this.h()},l(i){l=T(i,"DIV",{role:!0,class:!0});var n=U(l);e&&e.l(n),n.forEach(h),a=j(i),s&&s.l(i),this.h()},h(){v(l,"role","list"),v(l,"class","channel-bar-container")},m(i,n){d(i,l,n),e&&e.m(l,null),d(i,a,n),s&&s.m(i,n),t=!0},p(i,[n]){i[0]!=null?e?(e.p(i,n),n&1&&u(e,1)):(e=C(i),e.c(),u(e,1),e.m(l,null)):e&&($(),_(e,1,1,()=>{e=null}),g()),s&&s.p&&(!t||n&16)&&V(s,r,i,i[4],t?A(r,i[4],n,null):z(i[4]),null)},i(i){t||(u(e),u(s,i),t=!0)},o(i){_(e),_(s,i),t=!1},d(i){i&&(h(l),h(a)),e&&e.d(),s&&s.d(i)}}}function te(o,l,a){let t,e,r;F(o,X,m=>a(3,r=m));let{$$slots:s={},$$scope:i}=l;const n=y(Y),c=y(Z)??D(),f=y(x)??D();let p;function k(){a(0,p=n.api.cache.channels.filter(m=>["DirectMessage","Group","SavedMessages"].includes(m.channel_type))),((p==null?void 0:p.length)??0)==0&&n.ready&&n.api.fetchDirectMessages().then(m=>a(0,p=m))}return n.on("Ready",k),H(k),o.$$set=m=>{"$$scope"in m&&a(4,i=m.$$scope)},o.$$.update=()=>{o.$$.dirty&8&&a(2,t=r.params),o.$$.dirty&4&&c.set(t.id),o.$$.dirty&1&&a(1,e=p==null?void 0:p.find(m=>m.channel_type=="SavedMessages"))},f.set(void 0),[p,e,t,r,i,s]}class ue extends J{constructor(l){super(),O(this,l,te,ee,P,{})}}export{ue as component};
