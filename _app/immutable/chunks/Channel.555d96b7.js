import{s as T,c as v,n as g}from"./scheduler.a21a5cad.js";import{S as q,i as L,g as U,r as w,s as z,m as B,h as j,j as N,u as C,c as F,n as H,f as p,k as d,a as y,x as S,v as D,o as J,d as m,t as _,w as I,e as b,p as R,b as X}from"./index.4419476b.js";import{h as A,u as O}from"./await_block.7ed97119.js";import{g as k,a as Q,b as W,c as Y}from"./context.898bb4a8.js";import{a as Z,g as V,b as E}from"./util.c62b600d.js";import{X as $}from"./runtime.esm.252c27a7.js";import{b as G}from"./paths.360ae9bd.js";import{U as x}from"./UserProfilePicture.f3e5cd2d.js";import{a as ee,s as ne}from"./context.fa34f1f8.js";function te(r){let n,t,e,a,l,o,c,i;return e=new x({props:{src:r[0],name:r[2],width:r[3],height:r[4]}}),{c(){n=U("div"),t=U("a"),w(e.$$.fragment),a=z(),l=B(r[1]),this.h()},l(s){n=j(s,"DIV",{role:!0,class:!0});var f=N(n);t=j(f,"A",{class:!0,href:!0});var h=N(t);C(e.$$.fragment,h),a=F(h),l=H(h,r[1]),h.forEach(p),f.forEach(p),this.h()},h(){d(t,"class","p-2 block"),d(t,"href",o=G+"/"+(r[7]==null?`channels/${r[5]}`:`servers/${r[7]}/channels/${r[5]}`)),d(n,"role","listitem"),d(n,"class",c=r[6]==r[5]?"bg-gray-400":"hover:bg-gray-600")},m(s,f){y(s,n,f),S(n,t),D(e,t,null),S(t,a),S(t,l),i=!0},p(s,[f]){const h={};f&1&&(h.src=s[0]),f&4&&(h.name=s[2]),f&8&&(h.width=s[3]),f&16&&(h.height=s[4]),e.$set(h),(!i||f&2)&&J(l,s[1]),(!i||f&160&&o!==(o=G+"/"+(s[7]==null?`channels/${s[5]}`:`servers/${s[7]}/channels/${s[5]}`)))&&d(t,"href",o),(!i||f&96&&c!==(c=s[6]==s[5]?"bg-gray-400":"hover:bg-gray-600"))&&d(n,"class",c)},i(s){i||(m(e.$$.fragment,s),i=!0)},o(s){_(e.$$.fragment,s),i=!1},d(s){s&&p(n),I(e)}}}function ae(r,n,t){let e,a,{src:l}=n,{name:o}=n,{alt:c=o}=n,{width:i}=n,{height:s}=n,{id:f}=n;const h=k(ee);v(r,h,u=>t(7,a=u));const M=k(ne);return v(r,M,u=>t(6,e=u)),r.$$set=u=>{"src"in u&&t(0,l=u.src),"name"in u&&t(1,o=u.name),"alt"in u&&t(2,c=u.alt),"width"in u&&t(3,i=u.width),"height"in u&&t(4,s=u.height),"id"in u&&t(5,f=u.id)},[l,o,c,i,s,f,e,a,h,M]}class K extends q{constructor(n){super(),L(this,n,ae,te,T,{src:0,name:1,alt:2,width:3,height:4,id:5})}}function re(r){let n,t;return n=new K({props:{src:r[5](r[0]),name:r[0].channel_type=="SavedMessages"?r[2]("channel.notes"):r[0].name,width:24,height:24,id:r[0]._id}}),{c(){w(n.$$.fragment)},l(e){C(n.$$.fragment,e)},m(e,a){D(n,e,a),t=!0},p(e,a){const l={};a&1&&(l.src=e[5](e[0])),a&5&&(l.name=e[0].channel_type=="SavedMessages"?e[2]("channel.notes"):e[0].name),a&1&&(l.id=e[0]._id),n.$set(l)},i(e){t||(m(n.$$.fragment,e),t=!0)},o(e){_(n.$$.fragment,e),t=!1},d(e){I(n,e)}}}function se(r){let n,t,e=r[0].active&&P(r);return{c(){e&&e.c(),n=b()},l(a){e&&e.l(a),n=b()},m(a,l){e&&e.m(a,l),y(a,n,l),t=!0},p(a,l){a[0].active?e?(e.p(a,l),l&1&&m(e,1)):(e=P(a),e.c(),m(e,1),e.m(n.parentNode,n)):e&&(R(),_(e,1,1,()=>{e=null}),X())},i(a){t||(m(e),t=!0)},o(a){_(e),t=!1},d(a){a&&p(n),e&&e.d(a)}}}function P(r){var l;let n,t,e,a={ctx:r,current:null,token:null,hasCatch:!0,pending:oe,then:le,catch:ie,value:7,blocks:[,,,]};return A(t=r[4].api.fetchUser(r[0].recipients[0]==((l=r[4].user)==null?void 0:l._id)?r[0].recipients[1]:r[0].recipients[0]),a),{c(){n=b(),a.block.c()},l(o){n=b(),a.block.l(o)},m(o,c){y(o,n,c),a.block.m(o,a.anchor=c),a.mount=()=>n.parentNode,a.anchor=n,e=!0},p(o,c){var i;r=o,a.ctx=r,c&1&&t!==(t=r[4].api.fetchUser(r[0].recipients[0]==((i=r[4].user)==null?void 0:i._id)?r[0].recipients[1]:r[0].recipients[0]))&&A(t,a)||O(a,r,c)},i(o){e||(m(a.block),e=!0)},o(o){for(let c=0;c<3;c+=1){const i=a.blocks[c];_(i)}e=!1},d(o){o&&p(n),a.block.d(o),a.token=null,a=null}}}function ie(r){let n,t;return n=new K({props:{src:"/user.svg",name:"<"+r[2]("user.unknown")+">",alt:r[2]("user.unknown"),width:32,height:32,id:r[0]._id}}),{c(){w(n.$$.fragment)},l(e){C(n.$$.fragment,e)},m(e,a){D(n,e,a),t=!0},p(e,a){const l={};a&4&&(l.name="<"+e[2]("user.unknown")+">"),a&4&&(l.alt=e[2]("user.unknown")),a&1&&(l.id=e[0]._id),n.$set(l)},i(e){t||(m(n.$$.fragment,e),t=!0)},o(e){_(n.$$.fragment,e),t=!1},d(e){I(n,e)}}}function le(r){let n,t;return n=new K({props:{src:r[1]["jolt:low-data-mode"]?"/user.svg":V(r[7]),name:E(r[7]),width:32,height:32,id:r[0]._id}}),{c(){w(n.$$.fragment)},l(e){C(n.$$.fragment,e)},m(e,a){D(n,e,a),t=!0},p(e,a){const l={};a&3&&(l.src=e[1]["jolt:low-data-mode"]?"/user.svg":V(e[7])),a&1&&(l.name=E(e[7])),a&1&&(l.id=e[0]._id),n.$set(l)},i(e){t||(m(n.$$.fragment,e),t=!0)},o(e){_(n.$$.fragment,e),t=!1},d(e){I(n,e)}}}function oe(r){return{c:g,l:g,m:g,p:g,i:g,o:g,d:g}}function ce(r){let n,t,e,a;const l=[se,re],o=[];function c(i,s){return i[0].channel_type=="DirectMessage"?0:i[0].channel_type=="TextChannel"||i[0].channel_type=="VoiceChannel"||i[0].channel_type=="Group"||i[0].channel_type=="SavedMessages"?1:-1}return~(n=c(r))&&(t=o[n]=l[n](r)),{c(){t&&t.c(),e=b()},l(i){t&&t.l(i),e=b()},m(i,s){~n&&o[n].m(i,s),y(i,e,s),a=!0},p(i,[s]){let f=n;n=c(i),n===f?~n&&o[n].p(i,s):(t&&(R(),_(o[f],1,1,()=>{o[f]=null}),X()),~n?(t=o[n],t?t.p(i,s):(t=o[n]=l[n](i),t.c()),m(t,1),t.m(e.parentNode,e)):t=null)},i(i){a||(m(t),a=!0)},o(i){_(t),a=!1},d(i){i&&p(e),~n&&o[n].d(i)}}}function fe(r,n,t){let e,a;v(r,$,s=>t(2,a=s));const l=k(Q);v(r,l,s=>t(1,e=s)),k(W);const o=k(Y);function c(s){if(s.channel_type=="SavedMessages")return"/note.svg";if(s.icon!=null&&!e["jolt:low-data-mode"])return`${Z(s.icon,{max_side:"256"})}`;switch(s.channel_type){case"Group":return"/group.svg";case"TextChannel":return"/hash.svg";case"VoiceChannel":return"/volume.svg"}}let{channel:i}=n;return r.$$set=s=>{"channel"in s&&t(0,i=s.channel)},[i,e,a,l,o,c]}class ve extends q{constructor(n){super(),L(this,n,fe,ce,T,{channel:0})}}export{ve as C};
