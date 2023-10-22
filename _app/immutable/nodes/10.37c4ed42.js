import{s as Q,f as P,a as E,l as C,g as S,h as V,c as I,m as D,d,j as p,I as R,i as y,z as b,n as A,u as m,e as w,k as ne,r as j,J as re}from"../chunks/scheduler.693b9c9b.js";import{S as W,i as X,a as h,t as v,c as J,b as Y,d as Z,m as x,g as K,e as ee}from"../chunks/index.bb1ba657.js";import{p as se}from"../chunks/stores.07428380.js";import{T as ae}from"../chunks/TextChat.fec04e4a.js";import{h as z,u as le}from"../chunks/await_block.1641c5fa.js";import{g as q,c as te}from"../chunks/context.ca3e4b8d.js";import{g as G,a as L,b as ie}from"../chunks/util.883c3f21.js";import{r as oe}from"../chunks/index.5e2a9a64.js";import{g as fe}from"../chunks/chunk-NMUKSDLG.3f77d6f4.js";import{s as ce}from"../chunks/context.fa34f1f8.js";function ue(s){return{c:m,l:m,m,p:m,d:m}}function pe(s){var t;let i,n=((t=s[2])==null?void 0:t.content)!=null&&B(s);return{c(){n&&n.c(),i=w()},l(e){n&&n.l(e),i=w()},m(e,r){n&&n.m(e,r),y(e,i,r)},p(e,r){var a;((a=e[2])==null?void 0:a.content)!=null?n?n.p(e,r):(n=B(e),n.c(),n.m(i.parentNode,i)):n&&(n.d(1),n=null)},d(e){e&&d(i),n&&n.d(e)}}}function B(s){let i,n=s[2].content+"",t;return{c(){i=P("p"),t=C(n),this.h()},l(e){i=S(e,"P",{style:!0,class:!0});var r=V(i);t=D(r,n),r.forEach(d),this.h()},h(){ne(i,"overflow-wrap","break-word"),p(i,"class","whitespace-pre-wrap")},m(e,r){y(e,i,r),b(i,t)},p(e,r){r&1&&n!==(n=e[2].content+"")&&A(t,n)},d(e){e&&d(i)}}}function me(s){return{c:m,l:m,m,p:m,d:m}}function de(s){let i,n,t,e,r,a,l,c=s[0].username+"",k,U,$=s[0].discriminator+"",o,_,N,T,u={ctx:s,current:null,token:null,hasCatch:!1,pending:me,then:pe,catch:ue,value:2};return z(N=s[3].api.fetchUserProfile(s[0]._id),u),{c(){i=P("div"),n=P("img"),e=E(),r=C(s[1]),a=E(),l=P("p"),k=C(c),U=C("#"),o=C($),_=E(),u.block.c(),this.h()},l(g){i=S(g,"DIV",{style:!0});var f=V(i);n=S(f,"IMG",{class:!0,width:!0,height:!0,src:!0,alt:!0}),e=I(f),r=D(f,s[1]),a=I(f),l=S(f,"P",{class:!0});var M=V(l);k=D(M,c),U=D(M,"#"),o=D(M,$),M.forEach(d),_=I(f),u.block.l(f),f.forEach(d),this.h()},h(){var g;p(n,"class","cover"),p(n,"width","64px"),p(n,"height","64px"),R(n.src,t=G(s[0]))||p(n,"src",t),p(n,"alt",s[1]),p(l,"class","text-sm text-gray-600"),p(i,"style",T=((g=s[2])==null?void 0:g.background)!=null?`background-image: url(${L(s[2].background)})`:void 0)},m(g,f){y(g,i,f),b(i,n),b(i,e),b(i,r),b(i,a),b(i,l),b(l,k),b(l,U),b(l,o),b(i,_),u.block.m(i,u.anchor=null),u.mount=()=>i,u.anchor=null},p(g,[f]){var M;s=g,f&1&&!R(n.src,t=G(s[0]))&&p(n,"src",t),f&2&&p(n,"alt",s[1]),f&2&&A(r,s[1]),f&1&&c!==(c=s[0].username+"")&&A(k,c),f&1&&$!==($=s[0].discriminator+"")&&A(o,$),u.ctx=s,f&1&&N!==(N=s[3].api.fetchUserProfile(s[0]._id))&&z(N,u)||le(u,s,f),f&4&&T!==(T=((M=s[2])==null?void 0:M.background)!=null?`background-image: url(${L(s[2].background)})`:void 0)&&p(i,"style",T)},i:m,o:m,d(g){g&&d(i),u.block.d(),u.token=null,u=null}}}function _e(s,i,n){let t,{user:e}=i;const r=q(te);let a;return s.$$set=l=>{"user"in l&&n(0,e=l.user)},s.$$.update=()=>{s.$$.dirty&1&&n(1,t=ie(e)),s.$$.dirty&1&&r.api.fetchUserProfile(e._id).then(l=>n(2,a=l))},[e,t,a,r]}class he extends W{constructor(i){super(),X(this,i,_e,de,Q,{user:0})}}function F(s){let i,n,t,e;i=new ae({props:{channel:s[0]}});let r=s[0].channel_type!="SavedMessages"&&H(s);return{c(){Y(i.$$.fragment),n=E(),r&&r.c(),t=w()},l(a){Z(i.$$.fragment,a),n=I(a),r&&r.l(a),t=w()},m(a,l){x(i,a,l),y(a,n,l),r&&r.m(a,l),y(a,t,l),e=!0},p(a,l){const c={};l&1&&(c.channel=a[0]),i.$set(c),a[0].channel_type!="SavedMessages"?r?(r.p(a,l),l&1&&h(r,1)):(r=H(a),r.c(),h(r,1),r.m(t.parentNode,t)):r&&(K(),v(r,1,1,()=>{r=null}),J())},i(a){e||(h(i.$$.fragment,a),h(r),e=!0)},o(a){v(i.$$.fragment,a),v(r),e=!1},d(a){a&&(d(n),d(t)),ee(i,a),r&&r.d(a)}}}function H(s){let i,n,t=s[1]!=null&&O(s);return{c(){t&&t.c(),i=w()},l(e){t&&t.l(e),i=w()},m(e,r){t&&t.m(e,r),y(e,i,r),n=!0},p(e,r){e[1]!=null?t?(t.p(e,r),r&2&&h(t,1)):(t=O(e),t.c(),h(t,1),t.m(i.parentNode,i)):t&&(K(),v(t,1,1,()=>{t=null}),J())},i(e){n||(h(t),n=!0)},o(e){v(t),n=!1},d(e){e&&d(i),t&&t.d(e)}}}function O(s){let i,n,t;return n=new he({props:{user:s[1]}}),{c(){i=P("div"),Y(n.$$.fragment),this.h()},l(e){i=S(e,"DIV",{class:!0});var r=V(i);Z(n.$$.fragment,r),r.forEach(d),this.h()},h(){p(i,"class","members-list-container")},m(e,r){y(e,i,r),x(n,i,null),t=!0},p(e,r){const a={};r&2&&(a.user=e[1]),n.$set(a)},i(e){t||(h(n.$$.fragment,e),t=!0)},o(e){v(n.$$.fragment,e),t=!1},d(e){e&&d(i),ee(n)}}}function ge(s){let i,n,t=s[0]!=null&&F(s);return{c(){t&&t.c(),i=w()},l(e){t&&t.l(e),i=w()},m(e,r){t&&t.m(e,r),y(e,i,r),n=!0},p(e,[r]){e[0]!=null?t?(t.p(e,r),r&1&&h(t,1)):(t=F(e),t.c(),h(t,1),t.m(i.parentNode,i)):t&&(K(),v(t,1,1,()=>{t=null}),J())},i(e){n||(h(t),n=!0)},o(e){v(t),n=!1},d(e){e&&d(i),t&&t.d(e)}}}function be(s,i,n){let t,e,r;j(s,se,o=>n(5,r=o));const a=q(te),l=q(ce);j(s,l,o=>n(4,e=o));let c,k;async function U(o){const _=await a.api.fetchChannel(o);if(_.channel_type=="TextChannel"||_.channel_type=="VoiceChannel")throw oe(302,`/servers/${_.server}/channels/${t.id}`);n(0,c=_)}async function $(o){var _;n(1,k=await a.api.fetchUser(o.recipients[0]==((_=a.user)==null?void 0:_._id)?o.recipients[1]:o.recipients[0]))}return re(()=>{l==null||l.set(void 0)}),s.$$.update=()=>{if(s.$$.dirty&32&&n(3,t=r.params),s.$$.dirty&8&&(l==null||l.set(t.id)),s.$$.dirty&16&&e&&U(e),s.$$.dirty&1&&c!=null&&c.channel_type!="SavedMessages"&&$(c),s.$$.dirty&3){let o="";(c==null?void 0:c.channel_type)=="SavedMessages"?o+="Saved Messages":k==null?o+="DM":o+=`DM with ${ie(k)}`,o+=" - Jolt","__TAURI__"in window?fe.setTitle(o):document.title=o}},[c,k,l,t,e,r]}class Se extends W{constructor(i){super(),X(this,i,be,ge,Q,{})}}export{Se as component};