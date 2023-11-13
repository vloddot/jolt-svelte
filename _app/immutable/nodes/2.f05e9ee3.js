import{s as X,d as pe,f as we,u as ve,g as be,e as ke,i as Se,r as ye,n as W,c as ee,o as Ie,h as je,j as ae}from"../chunks/scheduler.0beedca7.js";import{S as Y,i as Z,g as A,h as B,j as V,f as b,k as o,a as N,x as I,y as G,d as O,t as C,z as P,A as q,r as D,s as J,u as K,c as U,v as R,b as Oe,w as H,B as Ce,p as Ee,e as Q,m as te,n as re,o as $e}from"../chunks/index.433d2ede.js";import{e as oe}from"../chunks/each.e59479a4.js";import{g as Ve}from"../chunks/navigation.892b9afd.js";import{e as z}from"../chunks/singletons.77a13cb3.js";import{g as ie,s as ce,a as Ne,c as Le}from"../chunks/context.62a025aa.js";import{g as ue}from"../chunks/util.68b48a6c.js";import{t as Me,P as Ae}from"../chunks/PlusIcon.cd0b51e5.js";import{w as fe}from"../chunks/index.2a8de96f.js";import{p as Be}from"../chunks/stores.24c0b35f.js";import{s as De,a as Ke}from"../chunks/context.4d0298a0.js";function Re(n){let e,t,r,s,l,c,g;const $=n[7].default,h=pe($,n,n[6],null);return{c(){e=A("div"),t=A("a"),h&&h.c(),this.h()},l(a){e=B(a,"DIV",{class:!0,"data-focused":!0,"data-selected":!0,"data-unread":!0,"aria-selected":!0});var m=V(e);t=B(m,"A",{href:!0,tabindex:!0,"aria-label":!0,class:!0});var k=V(t);h&&h.l(k),k.forEach(b),m.forEach(b),this.h()},h(){o(t,"href",n[0]),o(t,"tabindex","0"),o(t,"aria-label",r=typeof n[1]=="string"&&n[2]!=null?n[1]:n[2]),o(t,"class","server-sidebar-icon svelte-1avlg8k"),o(e,"class","server-sidebar-icon-base svelte-1avlg8k"),o(e,"data-focused",n[5]),o(e,"data-selected",n[3]),o(e,"data-unread",n[4]),o(e,"aria-selected",n[3])},m(a,m){N(a,e,m),I(e,t),h&&h.m(t,null),l=!0,c||(g=[G(t,"mouseenter",n[8]),G(t,"mouseleave",n[9]),G(t,"focus",n[10]),G(t,"blur",n[11]),we(s=Me.call(null,t,{placement:"right",content:n[1],theme:"right-tooltip",animation:"scale-subtle",duration:100}))],c=!0)},p(a,[m]){h&&h.p&&(!l||m&64)&&ve(h,$,a,a[6],l?ke($,a[6],m,null):be(a[6]),null),(!l||m&1)&&o(t,"href",a[0]),(!l||m&6&&r!==(r=typeof a[1]=="string"&&a[2]!=null?a[1]:a[2]))&&o(t,"aria-label",r),s&&Se(s.update)&&m&2&&s.update.call(null,{placement:"right",content:a[1],theme:"right-tooltip",animation:"scale-subtle",duration:100}),(!l||m&32)&&o(e,"data-focused",a[5]),(!l||m&8)&&o(e,"data-selected",a[3]),(!l||m&16)&&o(e,"data-unread",a[4]),(!l||m&8)&&o(e,"aria-selected",a[3])},i(a){l||(O(h,a),l=!0)},o(a){C(h,a),l=!1},d(a){a&&b(e),h&&h.d(a),c=!1,ye(g)}}}function He(n,e,t){let{$$slots:r={},$$scope:s}=e,{href:l}=e,{tooltip:c}=e,{ariaLabel:g=void 0}=e,{selected:$}=e,{unread:h=!1}=e,a=!1;const m=()=>t(5,a=!0),k=()=>t(5,a=!1),j=()=>t(5,a=!0),u=()=>t(5,a=!1);return n.$$set=_=>{"href"in _&&t(0,l=_.href),"tooltip"in _&&t(1,c=_.tooltip),"ariaLabel"in _&&t(2,g=_.ariaLabel),"selected"in _&&t(3,$=_.selected),"unread"in _&&t(4,h=_.unread),"$$scope"in _&&t(6,s=_.$$scope)},[l,c,g,$,h,a,s,r,m,k,j,u]}class F extends Y{constructor(e){super(),Z(this,e,He,Re,X,{href:0,tooltip:1,ariaLabel:2,selected:3,unread:4})}}function Je(n){let e,t;return{c(){e=P("svg"),t=P("path"),this.h()},l(r){e=q(r,"svg",{xmlns:!0,fill:!0,viewBox:!0,"stroke-width":!0,stroke:!0,width:!0,height:!0});var s=V(e);t=q(s,"path",{"stroke-linecap":!0,"stroke-linejoin":!0,d:!0}),V(t).forEach(b),s.forEach(b),this.h()},h(){o(t,"stroke-linecap","round"),o(t,"stroke-linejoin","round"),o(t,"d","M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"),o(e,"xmlns","http://www.w3.org/2000/svg"),o(e,"fill","none"),o(e,"viewBox","0 0 24 24"),o(e,"stroke-width","1.5"),o(e,"stroke","currentColor"),o(e,"width","24px"),o(e,"height","24px")},m(r,s){N(r,e,s),I(e,t)},p:W,i:W,o:W,d(r){r&&b(e)}}}class Ue extends Y{constructor(e){super(),Z(this,e,null,Je,X,{})}}function We(n){let e,t,r;return{c(){e=P("svg"),t=P("path"),r=P("path"),this.h()},l(s){e=q(s,"svg",{xmlns:!0,fill:!0,viewBox:!0,"stroke-width":!0,stroke:!0,width:!0,height:!0});var l=V(e);t=q(l,"path",{"stroke-linecap":!0,"stroke-linejoin":!0,d:!0}),V(t).forEach(b),r=q(l,"path",{"stroke-linecap":!0,"stroke-linejoin":!0,d:!0}),V(r).forEach(b),l.forEach(b),this.h()},h(){o(t,"stroke-linecap","round"),o(t,"stroke-linejoin","round"),o(t,"d","M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"),o(r,"stroke-linecap","round"),o(r,"stroke-linejoin","round"),o(r,"d","M15 12a3 3 0 11-6 0 3 3 0 016 0z"),o(e,"xmlns","http://www.w3.org/2000/svg"),o(e,"fill","none"),o(e,"viewBox","0 0 24 24"),o(e,"stroke-width","1.5"),o(e,"stroke","currentColor"),o(e,"width","24px"),o(e,"height","24px")},m(s,l){N(s,e,l),I(e,t),I(e,r)},p:W,i:W,o:W,d(s){s&&b(e)}}}class ze extends Y{constructor(e){super(),Z(this,e,null,We,X,{})}}function de(n,e,t){const r=n.slice();return r[11]=e[t].channels,r[12]=e[t]._id,r[13]=e[t].name,r[14]=e[t].icon,r}function Pe(n){const e=n.slice(),t=e[13].split(" ");return e[17]=t,e}function qe(n){let e,t;return e=new Ue({}),{c(){D(e.$$.fragment)},l(r){K(e.$$.fragment,r)},m(r,s){R(e,r,s),t=!0},i(r){t||(O(e.$$.fragment,r),t=!0)},o(r){C(e.$$.fragment,r),t=!1},d(r){H(e,r)}}}function Ge(n){let e,t,r;return{c(){e=A("img"),this.h()},l(s){e=B(s,"IMG",{class:!0,src:!0,alt:!0,width:!0,height:!0}),this.h()},h(){o(e,"class","cover"),ae(e.src,t=ue(n[14],{max_side:"256"}))||o(e,"src",t),o(e,"alt",r=n[13]),o(e,"width","42px"),o(e,"height","42px")},m(s,l){N(s,e,l)},p(s,l){l&2&&!ae(e.src,t=ue(s[14],{max_side:"256"}))&&o(e,"src",t),l&2&&r!==(r=s[13])&&o(e,"alt",r)},d(s){s&&b(e)}}}function he(n){let e;function t(l,c){return l[17].length>3?Fe:Te}let r=t(n),s=r(n);return{c(){s.c(),e=Q()},l(l){s.l(l),e=Q()},m(l,c){s.m(l,c),N(l,e,c)},p(l,c){r===(r=t(l))&&s?s.p(l,c):(s.d(1),s=r(l),s&&(s.c(),s.m(e.parentNode,e)))},d(l){l&&b(e),s.d(l)}}}function Te(n){let e=n[17].map(ge).join("")+"",t;return{c(){t=te(e)},l(r){t=re(r,e)},m(r,s){N(r,t,s)},p(r,s){s&2&&e!==(e=r[17].map(ge).join("")+"")&&$e(t,e)},d(r){r&&b(t)}}}function Fe(n){let e=n[17].slice(0,3).map(_e).join("")+"",t,r;return{c(){t=te(e),r=te("...")},l(s){t=re(s,e),r=re(s,"...")},m(s,l){N(s,t,l),N(s,r,l)},p(s,l){l&2&&e!==(e=s[17].slice(0,3).map(_e).join("")+"")&&$e(t,e)},d(s){s&&(b(t),b(r))}}}function Qe(n){let e;function t(c,g){return c[14]==null||c[2]["jolt:low-data-mode"]?he:Ge}function r(c,g){return g===he?Pe(c):c}let s=t(n),l=s(r(n,s));return{c(){l.c(),e=Q()},l(c){l.l(c),e=Q()},m(c,g){l.m(c,g),N(c,e,g)},p(c,g){s===(s=t(c))&&l?l.p(r(c,s),g):(l.d(1),l=s(r(c,s)),l&&(l.c(),l.m(e.parentNode,e)))},d(c){c&&b(e),l.d(c)}}}function me(n){var r;let e,t;return e=new F({props:{href:z+"/servers/"+n[12]+"/channels/"+n[11][0],tooltip:n[13],selected:((r=n[3])==null?void 0:r._id)==n[12],$$slots:{default:[Qe]},$$scope:{ctx:n}}}),{c(){D(e.$$.fragment)},l(s){K(e.$$.fragment,s)},m(s,l){R(e,s,l),t=!0},p(s,l){var g;const c={};l&2&&(c.href=z+"/servers/"+s[12]+"/channels/"+s[11][0]),l&2&&(c.tooltip=s[13]),l&10&&(c.selected=((g=s[3])==null?void 0:g._id)==s[12]),l&262&&(c.$$scope={dirty:l,ctx:s}),e.$set(c)},i(s){t||(O(e.$$.fragment,s),t=!0)},o(s){C(e.$$.fragment,s),t=!1},d(s){H(e,s)}}}function Xe(n){let e,t;return e=new Ae({}),{c(){D(e.$$.fragment)},l(r){K(e.$$.fragment,r)},m(r,s){R(e,r,s),t=!0},i(r){t||(O(e.$$.fragment,r),t=!0)},o(r){C(e.$$.fragment,r),t=!1},d(r){H(e,r)}}}function Ye(n){let e,t;return e=new ze({}),{c(){D(e.$$.fragment)},l(r){K(e.$$.fragment,r)},m(r,s){R(e,r,s),t=!0},i(r){t||(O(e.$$.fragment,r),t=!0)},o(r){C(e.$$.fragment,r),t=!1},d(r){H(e,r)}}}function Ze(n){var E,L;let e,t,r,s,l,c,g,$,h,a,m,k,j,u;r=new F({props:{selected:((E=n[0].route.id)==null?void 0:E.startsWith("/(app)/(chat)/(home)"))??!1,href:z+"/",tooltip:"Home",$$slots:{default:[qe]},$$scope:{ctx:n}}});let _=oe(n[1]),f=[];for(let i=0;i<_.length;i+=1)f[i]=me(de(n,_,i));const S=i=>C(f[i],1,1,()=>{f[i]=null});$=new F({props:{selected:n[0].route.id=="/(app)/servers/create",href:z+"/servers/create",tooltip:"Create Server",$$slots:{default:[Xe]},$$scope:{ctx:n}}}),k=new F({props:{selected:((L=n[0].route.id)==null?void 0:L.startsWith("/(app)/settings"))??!1,href:z+"/settings",tooltip:"Settings",$$slots:{default:[Ye]},$$scope:{ctx:n}}});const w=n[7].default,p=pe(w,n,n[8],null);return{c(){e=A("div"),t=A("div"),D(r.$$.fragment),s=J(),l=A("hr"),c=J();for(let i=0;i<f.length;i+=1)f[i].c();g=J(),D($.$$.fragment),h=J(),a=A("div"),m=J(),D(k.$$.fragment),j=J(),p&&p.c(),this.h()},l(i){e=B(i,"DIV",{class:!0});var d=V(e);t=B(d,"DIV",{class:!0});var v=V(t);K(r.$$.fragment,v),s=U(v),l=B(v,"HR",{}),c=U(v);for(let M=0;M<f.length;M+=1)f[M].l(v);g=U(v),K($.$$.fragment,v),h=U(v),a=B(v,"DIV",{class:!0}),V(a).forEach(b),m=U(v),K(k.$$.fragment,v),v.forEach(b),j=U(d),p&&p.l(d),d.forEach(b),this.h()},h(){o(a,"class","flex-1"),o(t,"class","server-sidebar-container svelte-dknhv2"),o(e,"class","app-container svelte-dknhv2")},m(i,d){N(i,e,d),I(e,t),R(r,t,null),I(t,s),I(t,l),I(t,c);for(let v=0;v<f.length;v+=1)f[v]&&f[v].m(t,null);I(t,g),R($,t,null),I(t,h),I(t,a),I(t,m),R(k,t,null),I(e,j),p&&p.m(e,null),u=!0},p(i,[d]){var se,ne;const v={};if(d&1&&(v.selected=((se=i[0].route.id)==null?void 0:se.startsWith("/(app)/(chat)/(home)"))??!1),d&256&&(v.$$scope={dirty:d,ctx:i}),r.$set(v),d&14){_=oe(i[1]);let y;for(y=0;y<_.length;y+=1){const le=de(i,_,y);f[y]?(f[y].p(le,d),O(f[y],1)):(f[y]=me(le),f[y].c(),O(f[y],1),f[y].m(t,g))}for(Ee(),y=_.length;y<f.length;y+=1)S(y);Oe()}const M={};d&1&&(M.selected=i[0].route.id=="/(app)/servers/create"),d&256&&(M.$$scope={dirty:d,ctx:i}),$.$set(M);const x={};d&1&&(x.selected=((ne=i[0].route.id)==null?void 0:ne.startsWith("/(app)/settings"))??!1),d&256&&(x.$$scope={dirty:d,ctx:i}),k.$set(x),p&&p.p&&(!u||d&256)&&ve(p,w,i,i[8],u?ke(w,i[8],d,null):be(i[8]),null)},i(i){if(!u){O(r.$$.fragment,i);for(let d=0;d<_.length;d+=1)O(f[d]);O($.$$.fragment,i),O(k.$$.fragment,i),O(p,i),u=!0}},o(i){C(r.$$.fragment,i),f=f.filter(Boolean);for(let d=0;d<f.length;d+=1)C(f[d]);C($.$$.fragment,i),C(k.$$.fragment,i),C(p,i),u=!1},d(i){i&&b(e),H(r),Ce(f,i),H($),H(k),p&&p.d(i)}}}function T(n,e){return n.sort((t,r)=>{const s=e.indexOf(t._id)??-1,l=e.indexOf(r._id)??-1;return l==-1?-1:s==-1?1:s-l})}const _e=n=>n[0],ge=n=>n[0];function xe(n,e,t){let r,s,l,c;ee(n,Be,u=>t(0,c=u));let{$$slots:g={},$$scope:$}=e;const h=ie(Ne);ee(n,h,u=>t(2,s=u));const a=ie(Le);let m=fe();ce(De,m);let k=fe();ee(n,k,u=>t(3,l=u)),ce(Ke,k);let j=Array.from(a.cache.servers.values());return h.subscribe(u=>{t(1,j=T(j,u.ordering.servers??[]))}),a.on("ServerCreate",()=>{t(1,j=T(Array.from(a.cache.servers.values()),s.ordering.servers??[]))}),a.on("ServerDelete",({id:u})=>{t(1,j=T(Array.from(a.cache.servers.values()),s.ordering.servers??[])),(l==null?void 0:l._id)==u&&Ve(`${z}/`)}),a.on("Ready",u=>{t(1,j=T(u.servers,s.ordering.servers??[]))}),Ie(async()=>{const u=je(h);for(const S of Object.keys(u)){const w=localStorage.getItem(S);w!=null&&(u[S]=JSON.parse(w))}const _=await a.fetchSettings(Object.keys(u)),f={};for(const[S,w]of Object.entries(u)){const p=`revision:${S}`,E=_[S];if(E==null)continue;const[L,i]=E,d=Number(localStorage.getItem(p)??"0");L!=d&&(L>d?(localStorage.setItem(p,L.toString()),localStorage.setItem(S,i),u[S]=JSON.parse(i)):f[S]=w)}Object.keys(f).length!=0&&a.setSettings(f),h.set(u),h.subscribe(S=>{for(const[w,p]of Object.entries(S))localStorage.setItem(w,JSON.stringify(p))})}),a.on("UserSettingsUpdate",({id:u,update:_})=>{var S;if(u!=((S=a.user)==null?void 0:S._id))return;let f={};for(const[w,[p,E]]of Object.entries(_)){const L=`revision:${w}`;p>Number(localStorage.getItem(L))&&(localStorage.setItem(L,p.toString()),localStorage.setItem(w,E),f[w]=JSON.parse(E))}h.update(w=>{for(const[p,E]of Object.entries(f))w[p]=E;return w})}),n.$$set=u=>{"$$scope"in u&&t(8,$=u.$$scope)},n.$$.update=()=>{n.$$.dirty&1&&t(6,r=c.params),n.$$.dirty&64&&(r.cid==null?m.set(void 0):a.fetchChannel(r.cid).then(u=>m.set(u))),n.$$.dirty&64&&(r.sid==null?k.set(void 0):a.fetchServer(r.sid).then(u=>k.set(u)))},[c,j,s,l,h,k,r,g,$]}class ft extends Y{constructor(e){super(),Z(this,e,xe,Ze,X,{})}}export{ft as component};