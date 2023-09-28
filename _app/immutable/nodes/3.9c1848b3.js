import{s as L,d as P,u as R,g as V,e as z,c as H,o as J}from"../chunks/scheduler.236f7e20.js";import{S as O,i as Q,g as T,r as C,s as k,h as U,j as W,u as D,c as M,f as h,k as K,a as d,v as S,x as X,d as c,t as m,b as $,w,e as b,p as y,y as Y}from"../chunks/index.bae008e4.js";import{e as N}from"../chunks/each.e59479a4.js";import{p as Z}from"../chunks/stores.84f1534e.js";import{g as v,c as x}from"../chunks/context.0e1cc50f.js";/* empty css                      */import{C as ee,a as G}from"../chunks/Channel.7da200c4.js";import{s as ne,a as te}from"../chunks/context.fa34f1f8.js";import{w as j}from"../chunks/index.96f01ed2.js";import{b as g}from"../chunks/paths.280ab84c.js";function q(f,l,r){const e=f.slice();return e[10]=l[r],e}function A(f){let l,r,e,t=f[2]!=null&&B(f),i=N(f[0]),a=[];for(let n=0;n<i.length;n+=1)a[n]=F(q(f,i,n));const _=n=>m(a[n],1,1,()=>{a[n]=null});return{c(){t&&t.c(),l=k();for(let n=0;n<a.length;n+=1)a[n].c();r=b()},l(n){t&&t.l(n),l=M(n);for(let s=0;s<a.length;s+=1)a[s].l(n);r=b()},m(n,s){t&&t.m(n,s),d(n,l,s);for(let o=0;o<a.length;o+=1)a[o]&&a[o].m(n,s);d(n,r,s),e=!0},p(n,s){if(n[2]!=null?t?(t.p(n,s),s&4&&c(t,1)):(t=B(n),t.c(),c(t,1),t.m(l.parentNode,l)):t&&(y(),m(t,1,1,()=>{t=null}),$()),s&1){i=N(n[0]);let o;for(o=0;o<i.length;o+=1){const u=q(n,i,o);a[o]?(a[o].p(u,s),c(a[o],1)):(a[o]=F(u),a[o].c(),c(a[o],1),a[o].m(r.parentNode,r))}for(y(),o=i.length;o<a.length;o+=1)_(o);$()}},i(n){if(!e){c(t);for(let s=0;s<i.length;s+=1)c(a[s]);e=!0}},o(n){m(t),a=a.filter(Boolean);for(let s=0;s<a.length;s+=1)m(a[s]);e=!1},d(n){n&&(h(l),h(r)),t&&t.d(n),Y(a,n)}}}function B(f){let l,r;return l=new G({props:{channel:f[2]}}),{c(){C(l.$$.fragment)},l(e){D(l.$$.fragment,e)},m(e,t){S(l,e,t),r=!0},p(e,t){const i={};t&4&&(i.channel=e[2]),l.$set(i)},i(e){r||(c(l.$$.fragment,e),r=!0)},o(e){m(l.$$.fragment,e),r=!1},d(e){w(l,e)}}}function E(f){let l,r;return l=new G({props:{channel:f[10]}}),{c(){C(l.$$.fragment)},l(e){D(l.$$.fragment,e)},m(e,t){S(l,e,t),r=!0},p(e,t){const i={};t&1&&(i.channel=e[10]),l.$set(i)},i(e){r||(c(l.$$.fragment,e),r=!0)},o(e){m(l.$$.fragment,e),r=!1},d(e){w(l,e)}}}function F(f){let l,r,e=f[10].channel_type!="SavedMessages"&&E(f);return{c(){e&&e.c(),l=b()},l(t){e&&e.l(t),l=b()},m(t,i){e&&e.m(t,i),d(t,l,i),r=!0},p(t,i){t[10].channel_type!="SavedMessages"?e?(e.p(t,i),i&1&&c(e,1)):(e=E(t),e.c(),c(e,1),e.m(l.parentNode,l)):e&&(y(),m(e,1,1,()=>{e=null}),$())},i(t){r||(c(e),r=!0)},o(t){m(e),r=!1},d(t){t&&h(l),e&&e.d(t)}}}function le(f){let l,r,e,t,i;r=new ee({props:{name:"Friends",src:g+"/user-heart.svg",width:24,height:24,href:g+"/friends",selected:f[1].url.pathname==`${g}/friends`}});let a=f[0]!=null&&A(f);const _=f[5].default,n=P(_,f,f[4],null);return{c(){l=T("div"),C(r.$$.fragment),e=k(),a&&a.c(),t=k(),n&&n.c(),this.h()},l(s){l=U(s,"DIV",{role:!0,class:!0});var o=W(l);D(r.$$.fragment,o),e=M(o),a&&a.l(o),o.forEach(h),t=M(s),n&&n.l(s),this.h()},h(){K(l,"role","list"),K(l,"class","channel-bar-container")},m(s,o){d(s,l,o),S(r,l,null),X(l,e),a&&a.m(l,null),d(s,t,o),n&&n.m(s,o),i=!0},p(s,[o]){const u={};o&2&&(u.selected=s[1].url.pathname==`${g}/friends`),r.$set(u),s[0]!=null?a?(a.p(s,o),o&1&&c(a,1)):(a=A(s),a.c(),c(a,1),a.m(l,null)):a&&(y(),m(a,1,1,()=>{a=null}),$()),n&&n.p&&(!i||o&16)&&R(n,_,s,s[4],i?z(_,s[4],o,null):V(s[4]),null)},i(s){i||(c(r.$$.fragment,s),c(a),c(n,s),i=!0)},o(s){m(r.$$.fragment,s),m(a),m(n,s),i=!1},d(s){s&&(h(l),h(t)),w(r),a&&a.d(),n&&n.d(s)}}}function se(f,l,r){let e,t,i;H(f,Z,p=>r(1,i=p));let{$$slots:a={},$$scope:_}=l;const n=v(x),s=v(ne)??j(),o=v(te)??j();let u;function I(){r(0,u=Array.from(n.api.cache.channels.values()).filter(p=>["DirectMessage","Group","SavedMessages"].includes(p.channel_type))),((u==null?void 0:u.length)??0)==0&&n.ready&&n.api.fetchDirectMessages().then(p=>r(0,u=p))}return n.on("Ready",I),J(I),f.$$set=p=>{"$$scope"in p&&r(4,_=p.$$scope)},f.$$.update=()=>{f.$$.dirty&2&&r(3,e=i.params),f.$$.dirty&8&&s.set(e.id),f.$$.dirty&1&&r(2,t=u==null?void 0:u.find(p=>p.channel_type=="SavedMessages"))},o.set(void 0),[u,i,t,e,_,a]}class he extends O{constructor(l){super(),Q(this,l,se,le,L,{})}}export{he as component};
