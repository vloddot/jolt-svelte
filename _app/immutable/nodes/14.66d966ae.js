import{s as M,b as l,i as _,c as P}from"../chunks/scheduler.236f7e20.js";import{S as z,i as A,C as f,r as m,s as q,u as h,c as D,v as k,a as I,d as u,t as b,f as R,w as $}from"../chunks/index.bae008e4.js";import{g as B,a as E}from"../chunks/context.0e1cc50f.js";import{C as y}from"../chunks/CheckboxSetting.356c86c0.js";function F(i){let c,r,t,n,g,d,o,s,p;function T(e){i[2](e)}let j={title:"Low Data Mode",description:"Disables user images entirely and replaces then with low data usage custom icons.",id:"jolt:low-data-mode"};i[0]["jolt:low-data-mode"]!==void 0&&(j.checked=i[0]["jolt:low-data-mode"]),c=new y({props:j}),l.push(()=>f(c,"checked",T));function K(e){i[3](e)}let w={title:"Send Typing Indicators",description:"Send typing indicators (e.g. <user> is typing...)",id:"jolt:send-typing-indicators"};i[0]["jolt:send-typing-indicators"]!==void 0&&(w.checked=i[0]["jolt:send-typing-indicators"]),n=new y({props:w}),l.push(()=>f(n,"checked",K));function L(e){i[4](e)}let v={title:"Receive Typing Indicators",description:"Receive typing indicators (e.g. <user> is typing...)",id:"jolt:receive-typing-indicators"};return i[0]["jolt:receive-typing-indicators"]!==void 0&&(v.checked=i[0]["jolt:receive-typing-indicators"]),o=new y({props:v}),l.push(()=>f(o,"checked",L)),{c(){m(c.$$.fragment),t=q(),m(n.$$.fragment),d=q(),m(o.$$.fragment)},l(e){h(c.$$.fragment,e),t=D(e),h(n.$$.fragment,e),d=D(e),h(o.$$.fragment,e)},m(e,a){k(c,e,a),I(e,t,a),k(n,e,a),I(e,d,a),k(o,e,a),p=!0},p(e,[a]){const x={};!r&&a&1&&(r=!0,x.checked=e[0]["jolt:low-data-mode"],_(()=>r=!1)),c.$set(x);const C={};!g&&a&1&&(g=!0,C.checked=e[0]["jolt:send-typing-indicators"],_(()=>g=!1)),n.$set(C);const S={};!s&&a&1&&(s=!0,S.checked=e[0]["jolt:receive-typing-indicators"],_(()=>s=!1)),o.$set(S)},i(e){p||(u(c.$$.fragment,e),u(n.$$.fragment,e),u(o.$$.fragment,e),p=!0)},o(e){b(c.$$.fragment,e),b(n.$$.fragment,e),b(o.$$.fragment,e),p=!1},d(e){e&&(R(t),R(d)),$(c,e),$(n,e),$(o,e)}}}function G(i,c,r){let t;const n=B(E);P(i,n,s=>r(0,t=s));function g(s){i.$$.not_equal(t["jolt:low-data-mode"],s)&&(t["jolt:low-data-mode"]=s,n.set(t))}function d(s){i.$$.not_equal(t["jolt:send-typing-indicators"],s)&&(t["jolt:send-typing-indicators"]=s,n.set(t))}function o(s){i.$$.not_equal(t["jolt:receive-typing-indicators"],s)&&(t["jolt:receive-typing-indicators"]=s,n.set(t))}return[t,n,g,d,o]}class Q extends z{constructor(c){super(),A(this,c,G,F,M,{})}}export{Q as component};