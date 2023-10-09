import{s as L,b as l,l as _,c as M}from"../chunks/scheduler.88206625.js";import{S as P,i as z,E as f,r as m,s as C,u as h,c as D,v as k,a as I,d as u,t as b,f as R,w as $}from"../chunks/index.3c623ae9.js";import{g as A,a as B}from"../chunks/context.3d02589b.js";import{C as y}from"../chunks/CheckboxSetting.224d5115.js";function F(n){let c,r,t,i,g,d,o,s,p;function T(e){n[2](e)}let j={title:"Low Data Mode",description:"Disables user images entirely and replaces then with low data usage custom icons.",id:"jolt:low-data-mode"};n[0]["jolt:low-data-mode"]!==void 0&&(j.checked=n[0]["jolt:low-data-mode"]),c=new y({props:j}),l.push(()=>f(c,"checked",T));function E(e){n[3](e)}let w={title:"Send Typing Indicators",description:"Send typing indicators (e.g. <user> is typing...)",id:"jolt:send-typing-indicators"};n[0]["jolt:send-typing-indicators"]!==void 0&&(w.checked=n[0]["jolt:send-typing-indicators"]),i=new y({props:w}),l.push(()=>f(i,"checked",E));function K(e){n[4](e)}let v={title:"Receive Typing Indicators",description:"Receive typing indicators (e.g. <user> is typing...)",id:"jolt:receive-typing-indicators"};return n[0]["jolt:receive-typing-indicators"]!==void 0&&(v.checked=n[0]["jolt:receive-typing-indicators"]),o=new y({props:v}),l.push(()=>f(o,"checked",K)),{c(){m(c.$$.fragment),t=C(),m(i.$$.fragment),d=C(),m(o.$$.fragment)},l(e){h(c.$$.fragment,e),t=D(e),h(i.$$.fragment,e),d=D(e),h(o.$$.fragment,e)},m(e,a){k(c,e,a),I(e,t,a),k(i,e,a),I(e,d,a),k(o,e,a),p=!0},p(e,[a]){const x={};!r&&a&1&&(r=!0,x.checked=e[0]["jolt:low-data-mode"],_(()=>r=!1)),c.$set(x);const S={};!g&&a&1&&(g=!0,S.checked=e[0]["jolt:send-typing-indicators"],_(()=>g=!1)),i.$set(S);const q={};!s&&a&1&&(s=!0,q.checked=e[0]["jolt:receive-typing-indicators"],_(()=>s=!1)),o.$set(q)},i(e){p||(u(c.$$.fragment,e),u(i.$$.fragment,e),u(o.$$.fragment,e),p=!0)},o(e){b(c.$$.fragment,e),b(i.$$.fragment,e),b(o.$$.fragment,e),p=!1},d(e){e&&(R(t),R(d)),$(c,e),$(i,e),$(o,e)}}}function G(n,c,r){let t;const i=A(B);M(n,i,s=>r(0,t=s));function g(s){n.$$.not_equal(t["jolt:low-data-mode"],s)&&(t["jolt:low-data-mode"]=s,i.set(t))}function d(s){n.$$.not_equal(t["jolt:send-typing-indicators"],s)&&(t["jolt:send-typing-indicators"]=s,i.set(t))}function o(s){n.$$.not_equal(t["jolt:receive-typing-indicators"],s)&&(t["jolt:receive-typing-indicators"]=s,i.set(t))}return[t,i,g,d,o]}class Q extends P{constructor(c){super(),z(this,c,G,F,L,{})}}export{Q as component};
