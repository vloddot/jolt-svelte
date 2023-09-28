import{s as ee,n as p,f as G,d as le,u as ie,g as ae,e as ce,c as z,o as fe}from"../chunks/scheduler.236f7e20.js";import{S as re,i as te,g as O,m as ne,s as K,h as j,j as U,n as se,f as h,c as R,k as b,a as A,x as D,o as oe,r as V,u as H,v as J,t as $,b as P,d,w as q,e as L,p as B,y as ue}from"../chunks/index.bae008e4.js";import{h as _e,u as me}from"../chunks/await_block.16e956eb.js";import{e as F}from"../chunks/each.e59479a4.js";import{g as de}from"../chunks/navigation.c0db8a8e.js";import{b as N}from"../chunks/paths.280ab84c.js";import{g as Q,s as T,a as pe,c as he}from"../chunks/context.0e1cc50f.js";/* empty css                      */import{g as ge,a as W}from"../chunks/util.7d991f80.js";import{s as be,a as ve}from"../chunks/context.fa34f1f8.js";import{w as X}from"../chunks/index.96f01ed2.js";function ke(l){let r,n;return{c(){r=O("img"),this.h()},l(e){r=j(e,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){b(r,"class","sidebar-icon group-hover:rounded-xl group-hover:bg-blue-500 group-hover:text-white"),G(r.src,n=l[2])||b(r,"src",n),b(r,"alt",l[1])},m(e,t){A(e,r,t)},p(e,t){t&4&&!G(r.src,n=e[2])&&b(r,"src",n),t&2&&b(r,"alt",e[1])},d(e){e&&h(r)}}}function $e(l){let r,n;return{c(){r=O("span"),n=ne(l[3]),this.h()},l(e){r=j(e,"SPAN",{class:!0});var t=U(r);n=se(t,l[3]),t.forEach(h),this.h()},h(){b(r,"class","sidebar-icon group-hover:rounded-xl group-hover:bg-blue-500 overflow-ellipsis")},m(e,t){A(e,r,t),D(r,n)},p(e,t){t&8&&oe(n,e[3])},d(e){e&&h(r)}}}function Se(l){let r,n,e,t,s;function i(c,m){return c[2]==null?$e:ke}let a=i(l),o=a(l);return{c(){r=O("div"),n=O("span"),e=ne(l[1]),t=K(),s=O("a"),o.c(),this.h()},l(c){r=j(c,"DIV",{class:!0});var m=U(r);n=j(m,"SPAN",{class:!0});var g=U(n);e=se(g,l[1]),g.forEach(h),t=R(m),s=j(m,"A",{href:!0,"aria-label":!0});var _=U(s);o.l(_),_.forEach(h),m.forEach(h),this.h()},h(){b(n,"class","sidebar-tooltip group-hover:scale-100"),b(s,"href",l[0]),b(s,"aria-label",l[1]),b(r,"class","group m-0")},m(c,m){A(c,r,m),D(r,n),D(n,e),D(r,t),D(r,s),o.m(s,null)},p(c,[m]){m&2&&oe(e,c[1]),a===(a=i(c))&&o?o.p(c,m):(o.d(1),o=a(c),o&&(o.c(),o.m(s,null))),m&1&&b(s,"href",c[0]),m&2&&b(s,"aria-label",c[1])},i:p,o:p,d(c){c&&h(r),o.d()}}}function ye(l,r,n){let e,{href:t}=r,{tooltip:s}=r,{icon:i=void 0}=r;return l.$$set=a=>{"href"in a&&n(0,t=a.href),"tooltip"in a&&n(1,s=a.tooltip),"icon"in a&&n(2,i=a.icon)},l.$$.update=()=>{l.$$.dirty&2&&n(3,e=s.split(" ").map(a=>a[0]).join(""))},[t,s,i,e]}class M extends re{constructor(r){super(),te(this,r,ye,Se,ee,{href:0,tooltip:1,icon:2})}}function Y(l,r,n){const e=l.slice();return e[9]=r[n],e}function Ie(l){let r,n,e={ctx:l,current:null,token:null,hasCatch:!1,pending:Ae,then:Ne,catch:De,value:12,blocks:[,,,]};return _e(l[3].user??l[3].api.fetchUser("@me"),e),{c(){r=L(),e.block.c()},l(t){r=L(),e.block.l(t)},m(t,s){A(t,r,s),e.block.m(t,e.anchor=s),e.mount=()=>r.parentNode,e.anchor=r,n=!0},p(t,s){l=t,me(e,l,s)},i(t){n||(d(e.block),n=!0)},o(t){for(let s=0;s<3;s+=1){const i=e.blocks[s];$(i)}n=!1},d(t){t&&h(r),e.block.d(t),e.token=null,e=null}}}function we(l){let r,n,e,t;return r=new M({props:{href:N,tooltip:"Home",icon:N+"/home.svg"}}),{c(){V(r.$$.fragment),n=K(),e=O("hr"),this.h()},l(s){H(r.$$.fragment,s),n=R(s),e=j(s,"HR",{class:!0}),this.h()},h(){b(e,"class","border-gray-600 mx-4")},m(s,i){J(r,s,i),A(s,n,i),A(s,e,i),t=!0},p,i(s){t||(d(r.$$.fragment,s),t=!0)},o(s){$(r.$$.fragment,s),t=!1},d(s){s&&(h(n),h(e)),q(r,s)}}}function De(l){return{c:p,l:p,m:p,p,i:p,o:p,d:p}}function Ne(l){let r,n,e,t;return r=new M({props:{href:N+"/",tooltip:l[12].username+"#"+l[12].discriminator,icon:ge(l[3].user)}}),{c(){V(r.$$.fragment),n=K(),e=O("hr"),this.h()},l(s){H(r.$$.fragment,s),n=R(s),e=j(s,"HR",{class:!0}),this.h()},h(){b(e,"class","border-gray-600 mx-4")},m(s,i){J(r,s,i),A(s,n,i),A(s,e,i),t=!0},p,i(s){t||(d(r.$$.fragment,s),t=!0)},o(s){$(r.$$.fragment,s),t=!1},d(s){s&&(h(n),h(e)),q(r,s)}}}function Ae(l){return{c:p,l:p,m:p,p,i:p,o:p,d:p}}function Z(l){let r,n,e=F(l[0]),t=[];for(let i=0;i<e.length;i+=1)t[i]=x(Y(l,e,i));const s=i=>$(t[i],1,1,()=>{t[i]=null});return{c(){for(let i=0;i<t.length;i+=1)t[i].c();r=L()},l(i){for(let a=0;a<t.length;a+=1)t[a].l(i);r=L()},m(i,a){for(let o=0;o<t.length;o+=1)t[o]&&t[o].m(i,a);A(i,r,a),n=!0},p(i,a){if(a&3){e=F(i[0]);let o;for(o=0;o<e.length;o+=1){const c=Y(i,e,o);t[o]?(t[o].p(c,a),d(t[o],1)):(t[o]=x(c),t[o].c(),d(t[o],1),t[o].m(r.parentNode,r))}for(B(),o=e.length;o<t.length;o+=1)s(o);P()}},i(i){if(!n){for(let a=0;a<e.length;a+=1)d(t[a]);n=!0}},o(i){t=t.filter(Boolean);for(let a=0;a<t.length;a+=1)$(t[a]);n=!1},d(i){i&&h(r),ue(t,i)}}}function Ce(l){let r,n;return r=new M({props:{href:N+"/servers/"+l[9]._id+"/channels/"+l[9].channels[0],tooltip:l[9].name,icon:l[9].icon==null?void 0:`${W(l[9].icon,{max_side:"256"})}`}}),{c(){V(r.$$.fragment)},l(e){H(r.$$.fragment,e)},m(e,t){J(r,e,t),n=!0},p(e,t){const s={};t&1&&(s.href=N+"/servers/"+e[9]._id+"/channels/"+e[9].channels[0]),t&1&&(s.tooltip=e[9].name),t&1&&(s.icon=e[9].icon==null?void 0:`${W(e[9].icon,{max_side:"256"})}`),r.$set(s)},i(e){n||(d(r.$$.fragment,e),n=!0)},o(e){$(r.$$.fragment,e),n=!1},d(e){q(r,e)}}}function Ee(l){let r,n;return r=new M({props:{href:N+"/servers/"+l[9]._id+"/channels/"+l[9].channels[0],tooltip:l[9].name}}),{c(){V(r.$$.fragment)},l(e){H(r.$$.fragment,e)},m(e,t){J(r,e,t),n=!0},p(e,t){const s={};t&1&&(s.href=N+"/servers/"+e[9]._id+"/channels/"+e[9].channels[0]),t&1&&(s.tooltip=e[9].name),r.$set(s)},i(e){n||(d(r.$$.fragment,e),n=!0)},o(e){$(r.$$.fragment,e),n=!1},d(e){q(r,e)}}}function x(l){let r,n,e,t;const s=[Ee,Ce],i=[];function a(o,c){return o[1]["jolt:low-data-mode"]?0:1}return r=a(l),n=i[r]=s[r](l),{c(){n.c(),e=L()},l(o){n.l(o),e=L()},m(o,c){i[r].m(o,c),A(o,e,c),t=!0},p(o,c){let m=r;r=a(o),r===m?i[r].p(o,c):(B(),$(i[m],1,1,()=>{i[m]=null}),P(),n=i[r],n?n.p(o,c):(n=i[r]=s[r](o),n.c()),d(n,1),n.m(e.parentNode,e))},i(o){t||(d(n),t=!0)},o(o){$(n),t=!1},d(o){o&&h(e),i[r].d(o)}}}function Oe(l){let r,n,e,t,s,i,a,o,c,m,g,_,S;const C=[we,Ie],v=[];function w(u,y){return u[1]["jolt:low-data-mode"]?0:1}e=w(l),t=v[e]=C[e](l);let f=l[0]!=null&&Z(l);a=new M({props:{href:N+"/servers/create",icon:N+"/plus.svg",tooltip:"Create Server"}}),g=new M({props:{href:N+"/settings",icon:N+"/gears.svg",tooltip:"Settings"}});const E=l[6].default,k=le(E,l,l[5],null);return{c(){r=O("div"),n=O("div"),t.c(),s=K(),f&&f.c(),i=K(),V(a.$$.fragment),o=K(),c=O("div"),m=K(),V(g.$$.fragment),_=K(),k&&k.c(),this.h()},l(u){r=j(u,"DIV",{class:!0});var y=U(r);n=j(y,"DIV",{class:!0});var I=U(n);t.l(I),s=R(I),f&&f.l(I),i=R(I),H(a.$$.fragment,I),o=R(I),c=j(I,"DIV",{class:!0}),U(c).forEach(h),m=R(I),H(g.$$.fragment,I),I.forEach(h),_=R(y),k&&k.l(y),y.forEach(h),this.h()},h(){b(c,"class","flex-1"),b(n,"class","server-sidebar-container"),b(r,"class","grid-container")},m(u,y){A(u,r,y),D(r,n),v[e].m(n,null),D(n,s),f&&f.m(n,null),D(n,i),J(a,n,null),D(n,o),D(n,c),D(n,m),J(g,n,null),D(r,_),k&&k.m(r,null),S=!0},p(u,[y]){let I=e;e=w(u),e===I?v[e].p(u,y):(B(),$(v[I],1,1,()=>{v[I]=null}),P(),t=v[e],t?t.p(u,y):(t=v[e]=C[e](u),t.c()),d(t,1),t.m(n,s)),u[0]!=null?f?(f.p(u,y),y&1&&d(f,1)):(f=Z(u),f.c(),d(f,1),f.m(n,i)):f&&(B(),$(f,1,1,()=>{f=null}),P()),k&&k.p&&(!S||y&32)&&ie(k,E,u,u[5],S?ce(E,u[5],y,null):ae(u[5]),null)},i(u){S||(d(t),d(f),d(a.$$.fragment,u),d(g.$$.fragment,u),d(k,u),S=!0)},o(u){$(t),$(f),$(a.$$.fragment,u),$(g.$$.fragment,u),$(k,u),S=!1},d(u){u&&h(r),v[e].d(),f&&f.d(),q(a),q(g),k&&k.d(u)}}}function je(l,r,n){let e,t,{$$slots:s={},$$scope:i}=r;const a=Q(pe);z(l,a,_=>n(1,t=_));const o=Q(he),c=X();z(l,c,_=>n(7,e=_));const m=X();T(be,m),T(ve,c);let g=Array.from(o.api.cache.servers.values());return a.subscribe(_=>{n(0,g=g.sort((S,C)=>{var f,E;const v=((f=_.ordering.servers)==null?void 0:f.indexOf(S._id))??-1,w=((E=_.ordering.servers)==null?void 0:E.indexOf(C._id))??-1;return w==-1?-1:v==-1?1:v-w}))}),o.on("ServerCreate",()=>{n(0,g=Array.from(o.api.cache.servers.values()))}),o.on("ServerDelete",async({id:_})=>{n(0,g=Array.from(o.api.cache.servers.values())),e==_&&await de(`${N}/`)}),o.on("Ready",async _=>{n(0,g=_.servers);const S=await o.api.fetchSettings(["ordering"]);if(S.ordering==null)return;const[C,v]=S.ordering;C>Number(localStorage.getItem("revision:ordering"))&&(localStorage.setItem("revision:ordering",C.toString()),a.update(w=>w.ordering=JSON.parse(v).servers))}),o.on("UserSettingsUpdate",({id:_,update:S})=>{var v;if(_!=((v=o.user)==null?void 0:v._id))return;let C={};for(const[w,[f,E]]of Object.entries(S)){const k=`revision:${w}`;f>Number(localStorage.getItem(k))&&(localStorage.setItem(k,f.toString()),C[w]=E)}a.update(w=>{for(const[f,E]of Object.entries(C))w[f]=E;return w})}),fe(()=>{const _=localStorage.getItem("settings");_!=null&&a.set(JSON.parse(_)),a.subscribe(S=>{localStorage.setItem("settings",JSON.stringify(S))})}),l.$$set=_=>{"$$scope"in _&&n(5,i=_.$$scope)},[g,t,a,o,c,i,s]}class Ge extends re{constructor(r){super(),te(this,r,je,Oe,ee,{})}}export{Ge as component};
