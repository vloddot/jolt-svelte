import{s as Z,f as D,a as A,l as E,g as U,h as C,c as K,m as P,d as u,j as m,I as J,i as k,z as b,n as q,u as h,e as w,r as L,K as ae}from"../chunks/scheduler.fede8105.js";import{S as x,i as ee,a as v,t as $,c as R,b as te,d as se,m as ne,g as z,e as ie}from"../chunks/index.257844fa.js";import{p as oe}from"../chunks/stores.70d07f98.js";import{T as ce}from"../chunks/TextChat.bccbe706.js";import{h as B,u as fe}from"../chunks/await_block.ecc72e0a.js";import{g as H,c as le}from"../chunks/context.682cab63.js";import{g as F,a as O,b as re}from"../chunks/util.883c3f21.js";import{r as ue}from"../chunks/index.5e2a9a64.js";import{g as me}from"../chunks/chunk-NMUKSDLG.3f77d6f4.js";import{s as de}from"../chunks/context.fa34f1f8.js";function pe(l){return{c:h,l:h,m:h,p:h,d:h}}function _e(l){var t;let n,s=((t=l[2])==null?void 0:t.content)!=null&&Q(l);return{c(){s&&s.c(),n=w()},l(e){s&&s.l(e),n=w()},m(e,i){s&&s.m(e,i),k(e,n,i)},p(e,i){var r;((r=e[2])==null?void 0:r.content)!=null?s?s.p(e,i):(s=Q(e),s.c(),s.m(n.parentNode,n)):s&&(s.d(1),s=null)},d(e){e&&u(n),s&&s.d(e)}}}function Q(l){let n,s=l[2].content+"",t;return{c(){n=D("p"),t=E(s),this.h()},l(e){n=U(e,"P",{class:!0});var i=C(n);t=P(i,s),i.forEach(u),this.h()},h(){m(n,"class","profile-content svelte-1osmnj4")},m(e,i){k(e,n,i),b(n,t)},p(e,i){i&1&&s!==(s=e[2].content+"")&&q(t,s)},d(e){e&&u(n)}}}function he(l){return{c:h,l:h,m:h,p:h,d:h}}function ve(l){let n,s,t,e,i,r,a,c,g=l[0].username+"",M,S,o=l[0].discriminator+"",_,I,N,y,T,p={ctx:l,current:null,token:null,hasCatch:!1,pending:he,then:_e,catch:pe,value:2};return B(T=l[3].api.fetchUserProfile(l[0]._id),p),{c(){n=D("div"),s=D("img"),e=A(),i=D("h1"),r=E(l[1]),a=A(),c=D("h2"),M=E(g),S=E("#"),_=E(o),N=A(),y=D("div"),p.block.c(),this.h()},l(d){n=U(d,"DIV",{class:!0,style:!0});var f=C(n);s=U(f,"IMG",{class:!0,width:!0,height:!0,src:!0,alt:!0}),e=K(f),i=U(f,"H1",{class:!0});var j=C(i);r=P(j,l[1]),j.forEach(u),a=K(f),c=U(f,"H2",{class:!0});var V=C(c);M=P(V,g),S=P(V,"#"),_=P(V,o),V.forEach(u),f.forEach(u),N=K(d),y=U(d,"DIV",{class:!0});var G=C(y);p.block.l(G),G.forEach(u),this.h()},h(){var d;m(s,"class","cover"),m(s,"width","64px"),m(s,"height","64px"),J(s.src,t=F(l[0]))||m(s,"src",t),m(s,"alt",l[1]),m(i,"class","secondary-fg svelte-1osmnj4"),m(c,"class","secondary-fg svelte-1osmnj4"),m(n,"class","user-detail svelte-1osmnj4"),m(n,"style",I=((d=l[2])==null?void 0:d.background)!=null?`background-image: url(${O(l[2].background)})`:void 0),m(y,"class","profile svelte-1osmnj4")},m(d,f){k(d,n,f),b(n,s),b(n,e),b(n,i),b(i,r),b(n,a),b(n,c),b(c,M),b(c,S),b(c,_),k(d,N,f),k(d,y,f),p.block.m(y,p.anchor=null),p.mount=()=>y,p.anchor=null},p(d,[f]){var j;l=d,f&1&&!J(s.src,t=F(l[0]))&&m(s,"src",t),f&2&&m(s,"alt",l[1]),f&2&&q(r,l[1]),f&1&&g!==(g=l[0].username+"")&&q(M,g),f&1&&o!==(o=l[0].discriminator+"")&&q(_,o),f&4&&I!==(I=((j=l[2])==null?void 0:j.background)!=null?`background-image: url(${O(l[2].background)})`:void 0)&&m(n,"style",I),p.ctx=l,f&1&&T!==(T=l[3].api.fetchUserProfile(l[0]._id))&&B(T,p)||fe(p,l,f)},i:h,o:h,d(d){d&&(u(n),u(N),u(y)),p.block.d(),p.token=null,p=null}}}function ge(l,n,s){let t,{user:e}=n;const i=H(le);let r;return l.$$set=a=>{"user"in a&&s(0,e=a.user)},l.$$.update=()=>{l.$$.dirty&1&&s(1,t=re(e)),l.$$.dirty&1&&i.api.fetchUserProfile(e._id).then(a=>s(2,r=a))},[e,t,r,i]}class be extends x{constructor(n){super(),ee(this,n,ge,ve,Z,{user:0})}}function W(l){let n,s,t,e;n=new ce({props:{channel:l[0]}});let i=l[0].channel_type!="SavedMessages"&&X(l);return{c(){te(n.$$.fragment),s=A(),i&&i.c(),t=w()},l(r){se(n.$$.fragment,r),s=K(r),i&&i.l(r),t=w()},m(r,a){ne(n,r,a),k(r,s,a),i&&i.m(r,a),k(r,t,a),e=!0},p(r,a){const c={};a&1&&(c.channel=r[0]),n.$set(c),r[0].channel_type!="SavedMessages"?i?(i.p(r,a),a&1&&v(i,1)):(i=X(r),i.c(),v(i,1),i.m(t.parentNode,t)):i&&(z(),$(i,1,1,()=>{i=null}),R())},i(r){e||(v(n.$$.fragment,r),v(i),e=!0)},o(r){$(n.$$.fragment,r),$(i),e=!1},d(r){r&&(u(s),u(t)),ie(n,r),i&&i.d(r)}}}function X(l){let n,s,t=l[1]!=null&&Y(l);return{c(){t&&t.c(),n=w()},l(e){t&&t.l(e),n=w()},m(e,i){t&&t.m(e,i),k(e,n,i),s=!0},p(e,i){e[1]!=null?t?(t.p(e,i),i&2&&v(t,1)):(t=Y(e),t.c(),v(t,1),t.m(n.parentNode,n)):t&&(z(),$(t,1,1,()=>{t=null}),R())},i(e){s||(v(t),s=!0)},o(e){$(t),s=!1},d(e){e&&u(n),t&&t.d(e)}}}function Y(l){let n,s,t;return s=new be({props:{user:l[1]}}),{c(){n=D("div"),te(s.$$.fragment),this.h()},l(e){n=U(e,"DIV",{class:!0});var i=C(n);se(s.$$.fragment,i),i.forEach(u),this.h()},h(){m(n,"class","members-list-container")},m(e,i){k(e,n,i),ne(s,n,null),t=!0},p(e,i){const r={};i&2&&(r.user=e[1]),s.$set(r)},i(e){t||(v(s.$$.fragment,e),t=!0)},o(e){$(s.$$.fragment,e),t=!1},d(e){e&&u(n),ie(s)}}}function ke(l){let n,s,t=l[0]!=null&&W(l);return{c(){t&&t.c(),n=w()},l(e){t&&t.l(e),n=w()},m(e,i){t&&t.m(e,i),k(e,n,i),s=!0},p(e,[i]){e[0]!=null?t?(t.p(e,i),i&1&&v(t,1)):(t=W(e),t.c(),v(t,1),t.m(n.parentNode,n)):t&&(z(),$(t,1,1,()=>{t=null}),R())},i(e){s||(v(t),s=!0)},o(e){$(t),s=!1},d(e){e&&u(n),t&&t.d(e)}}}function ye(l,n,s){let t,e,i;L(l,oe,o=>s(5,i=o));const r=H(le),a=H(de);L(l,a,o=>s(4,e=o));let c,g;async function M(o){const _=await r.api.fetchChannel(o);if(_.channel_type=="TextChannel"||_.channel_type=="VoiceChannel")throw ue(302,`/servers/${_.server}/channels/${t.id}`);s(0,c=_)}async function S(o){var _;s(1,g=await r.api.fetchUser(o.recipients[0]==((_=r.user)==null?void 0:_._id)?o.recipients[1]:o.recipients[0]))}return ae(()=>{a==null||a.set(void 0)}),l.$$.update=()=>{if(l.$$.dirty&32&&s(3,t=i.params),l.$$.dirty&8&&(a==null||a.set(t.id)),l.$$.dirty&16&&e&&M(e),l.$$.dirty&1&&c!=null&&c.channel_type!="SavedMessages"&&S(c),l.$$.dirty&3){let o="Jolt - ";(c==null?void 0:c.channel_type)=="SavedMessages"?o+="Saved Messages":g==null?o+="DM":o+=`DM with ${re(g)}`,"__TAURI__"in window?me.setTitle(o):document.title=o}},[c,g,a,t,e,i]}class Ie extends x{constructor(n){super(),ee(this,n,ye,ke,Z,{})}}export{Ie as component};
