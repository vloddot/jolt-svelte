import{s as J}from"../chunks/sections.16b6b1a3.js";import{f as K}from"../chunks/index.1d6e502d.js";import{s as L,n as S,c as M,w as R}from"../chunks/scheduler.9b2bc230.js";import{S as N,i as O,g as p,m as U,s as T,h as g,j as k,n as q,f as d,c as P,k as m,a as v,x as h,o as H,z as F,e as D,d as b,b as G,t as w,y as Q,r as W,u as X,v as Y,w as Z,p as x}from"../chunks/index.6c81ac7e.js";import{e as V}from"../chunks/each.e59479a4.js";import{g as $}from"../chunks/chunk-NMUKSDLG.3f77d6f4.js";import{g as ee,a as te}from"../chunks/context.3f5e8c52.js";function ne(n,t){const i={},o={},e={$$scope:1};let a=n.length;for(;a--;){const l=n[a],r=t[a];if(r){for(const s in l)s in r||(o[s]=1);for(const s in r)e[s]||(i[s]=r[s],e[s]=1);n[a]=r}else for(const s in l)e[s]=1}for(const l in o)l in i||(i[l]=void 0);return i}function ie(n){return typeof n=="object"&&n!==null?n:{}}const oe=async({params:n,parent:t})=>{const{sections:i}=await t(),o=i.find(({id:e})=>n.section==e);if(o==null)throw K(404);return{section:o}},se=()=>J.map(n=>({section:n.id})),ke=Object.freeze(Object.defineProperty({__proto__:null,entries:se,load:oe},Symbol.toStringTag,{value:"Module"}));function z(n){let t,i;return{c(){t=p("p"),i=U(n[1]),this.h()},l(o){t=g(o,"P",{class:!0});var e=k(t);i=q(e,n[1]),e.forEach(d),this.h()},h(){m(t,"class","ml-4 whitespace-pre-wrap")},m(o,e){v(o,t,e),h(t,i)},p(o,e){e&2&&H(i,o[1])},d(o){o&&d(t)}}}function A(n){let t,i,o;return{c(){t=p("input"),this.h()},l(e){t=g(e,"INPUT",{id:!0,type:!0}),this.h()},h(){m(t,"id",n[2]),t.checked=n[4],m(t,"type","checkbox")},m(e,a){v(e,t,a),i||(o=F(t,"input",n[6]),i=!0)},p(e,a){a&4&&m(t,"id",e[2]),a&16&&(t.checked=e[4])},d(e){e&&d(t),i=!1,o()}}}function le(n){let t,i,o,e,a,l,r,s,f=n[1]&&z(n),c=typeof n[4]=="boolean"&&A(n);return{c(){t=p("div"),i=p("div"),o=p("h2"),e=p("label"),a=U(n[0]),l=T(),f&&f.c(),r=T(),s=p("div"),c&&c.c(),this.h()},l(u){t=g(u,"DIV",{class:!0});var _=k(t);i=g(_,"DIV",{});var y=k(i);o=g(y,"H2",{});var E=k(o);e=g(E,"LABEL",{for:!0});var j=k(e);a=q(j,n[0]),j.forEach(d),E.forEach(d),l=P(y),f&&f.l(y),y.forEach(d),r=P(_),s=g(_,"DIV",{class:!0});var I=k(s);c&&c.l(I),I.forEach(d),_.forEach(d),this.h()},h(){m(e,"for",n[2]),m(s,"class","flex-1"),m(t,"class","flex ml-4")},m(u,_){v(u,t,_),h(t,i),h(i,o),h(o,e),h(e,a),h(i,l),f&&f.m(i,null),h(t,r),h(t,s),c&&c.m(s,null)},p(u,[_]){_&1&&H(a,u[0]),_&4&&m(e,"for",u[2]),u[1]?f?f.p(u,_):(f=z(u),f.c(),f.m(i,null)):f&&(f.d(1),f=null),typeof u[4]=="boolean"?c?c.p(u,_):(c=A(u),c.c(),c.m(s,null)):c&&(c.d(1),c=null)},i:S,o:S,d(u){u&&d(t),f&&f.d(),c&&c.d()}}}function ae(n,t,i){let o,e,{title:a}=t,{description:l=void 0}=t,{key:r}=t;const s=ee(te);M(n,s,c=>i(5,e=c));const f=c=>{s==null||s.update(u=>(u[r]=c.currentTarget.checked,u))};return n.$$set=c=>{"title"in c&&i(0,a=c.title),"description"in c&&i(1,l=c.description),"key"in c&&i(2,r=c.key)},n.$$.update=()=>{n.$$.dirty&36&&i(4,o=e[r])},[a,l,r,s,o,e,f]}class re extends N{constructor(t){super(),O(this,t,ae,le,L,{title:0,description:1,key:2})}}function B(n,t,i){const o=n.slice();return o[1]=t[i],o}function C(n){let t,i;const o=[n[1]];let e={};for(let a=0;a<o.length;a+=1)e=R(e,o[a]);return t=new re({props:e}),{c(){W(t.$$.fragment)},l(a){X(t.$$.fragment,a)},m(a,l){Y(t,a,l),i=!0},p(a,l){const r=l&1?ne(o,[ie(a[1])]):{};t.$set(r)},i(a){i||(b(t.$$.fragment,a),i=!0)},o(a){w(t.$$.fragment,a),i=!1},d(a){Z(t,a)}}}function ce(n){let t,i,o=V(n[0].section.settings),e=[];for(let l=0;l<o.length;l+=1)e[l]=C(B(n,o,l));const a=l=>w(e[l],1,1,()=>{e[l]=null});return{c(){for(let l=0;l<e.length;l+=1)e[l].c();t=D()},l(l){for(let r=0;r<e.length;r+=1)e[r].l(l);t=D()},m(l,r){for(let s=0;s<e.length;s+=1)e[s]&&e[s].m(l,r);v(l,t,r),i=!0},p(l,[r]){if(r&1){o=V(l[0].section.settings);let s;for(s=0;s<o.length;s+=1){const f=B(l,o,s);e[s]?(e[s].p(f,r),b(e[s],1)):(e[s]=C(f),e[s].c(),b(e[s],1),e[s].m(t.parentNode,t))}for(x(),s=o.length;s<e.length;s+=1)a(s);G()}},i(l){if(!i){for(let r=0;r<o.length;r+=1)b(e[r]);i=!0}},o(l){e=e.filter(Boolean);for(let r=0;r<e.length;r+=1)w(e[r]);i=!1},d(l){l&&d(t),Q(e,l)}}}function fe(n,t,i){let{data:o}=t;return n.$$set=e=>{"data"in e&&i(0,o=e.data)},n.$$.update=()=>{if(n.$$.dirty&1){const e=`${o.section.title} - Jolt`;"__TAURI__"in window?$.setTitle(e):document.title=e}},[o]}class ye extends N{constructor(t){super(),O(this,t,fe,ce,L,{data:0})}}export{ye as component,ke as universal};
