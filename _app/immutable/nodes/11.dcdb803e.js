import{s as L,n as j,j as Q}from"../chunks/scheduler.0beedca7.js";import{S as q,i as z,z as D,A as N,j as B,f as g,k as a,a as O,x as b,g as M,h as y,d as k,b as C,t as w,B as oe,e as W,p as T,m as S,s as F,n as V,c as A,o as H,r as K,u as P,v as R,y as J,w as X}from"../chunks/index.433d2ede.js";import{e as G}from"../chunks/each.e59479a4.js";import{g as se}from"../chunks/navigation.38c89109.js";import{e as ae}from"../chunks/singletons.1d633bf7.js";import{g as ce,c as ue}from"../chunks/context.62a025aa.js";import{a as fe,b as he}from"../chunks/util.68b48a6c.js";import{G as _e}from"../chunks/GenericUserCircleIcon.e3ed4165.js";function me(o){let e,l;return{c(){e=D("svg"),l=D("path"),this.h()},l(t){e=N(t,"svg",{xmlns:!0,fill:!0,viewBox:!0,"stroke-width":!0,stroke:!0,width:!0,height:!0});var n=B(e);l=N(n,"path",{"stroke-linecap":!0,"stroke-linejoin":!0,d:!0}),B(l).forEach(g),n.forEach(g),this.h()},h(){a(l,"stroke-linecap","round"),a(l,"stroke-linejoin","round"),a(l,"d","M4.5 12.75l6 6 9-13.5"),a(e,"xmlns","http://www.w3.org/2000/svg"),a(e,"fill","none"),a(e,"viewBox","0 0 24 24"),a(e,"stroke-width","1.5"),a(e,"stroke","currentColor"),a(e,"width","24px"),a(e,"height","24px")},m(t,n){O(t,e,n),b(e,l)},p:j,i:j,o:j,d(t){t&&g(e)}}}class pe extends q{constructor(e){super(),z(this,e,null,me,L,{})}}function de(o){let e,l;return{c(){e=D("svg"),l=D("path"),this.h()},l(t){e=N(t,"svg",{xmlns:!0,fill:!0,viewBox:!0,"stroke-width":!0,stroke:!0,width:!0,height:!0});var n=B(e);l=N(n,"path",{"stroke-linecap":!0,"stroke-linejoin":!0,d:!0}),B(l).forEach(g),n.forEach(g),this.h()},h(){a(l,"stroke-linecap","round"),a(l,"stroke-linejoin","round"),a(l,"d","M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"),a(e,"xmlns","http://www.w3.org/2000/svg"),a(e,"fill","none"),a(e,"viewBox","0 0 24 24"),a(e,"stroke-width","1.5"),a(e,"stroke","currentColor"),a(e,"width","24px"),a(e,"height","24px")},m(t,n){O(t,e,n),b(e,l)},p:j,i:j,o:j,d(t){t&&g(e)}}}class ge extends q{constructor(e){super(),z(this,e,null,de,L,{})}}function ke(o){let e,l;return{c(){e=D("svg"),l=D("path"),this.h()},l(t){e=N(t,"svg",{xmlns:!0,fill:!0,viewBox:!0,"stroke-width":!0,stroke:!0,width:!0,height:!0});var n=B(e);l=N(n,"path",{"stroke-linecap":!0,"stroke-linejoin":!0,d:!0}),B(l).forEach(g),n.forEach(g),this.h()},h(){a(l,"stroke-linecap","round"),a(l,"stroke-linejoin","round"),a(l,"d","M6 18L18 6M6 6l12 12"),a(e,"xmlns","http://www.w3.org/2000/svg"),a(e,"fill","none"),a(e,"viewBox","0 0 24 24"),a(e,"stroke-width","1.5"),a(e,"stroke","currentColor"),a(e,"width","24px"),a(e,"height","24px")},m(t,n){O(t,e,n),b(e,l)},p:j,i:j,o:j,d(t){t&&g(e)}}}class ve extends q{constructor(e){super(),z(this,e,null,ke,L,{})}}function Z(o,e,l){const t=o.slice();return t[6]=e[l].title,t[2]=e[l].list,t}function x(o,e,l){const t=o.slice();t[9]=e[l];const n=fe(t[9]);t[10]=n;const u=he(t[9]);return t[11]=u,t}function ee(o){let e,l,t=o[6]+"",n,u,c=o[2].length+"",i,r,h,E,I=G(o[2]),_=[];for(let f=0;f<I.length;f+=1)_[f]=ie(x(o,I,f));const U=f=>w(_[f],1,1,()=>{_[f]=null});return{c(){e=M("details"),l=M("summary"),n=S(t),u=S(" -- "),i=S(c),r=F();for(let f=0;f<_.length;f+=1)_[f].c();h=F(),this.h()},l(f){e=y(f,"DETAILS",{});var v=B(e);l=y(v,"SUMMARY",{});var s=B(l);n=V(s,t),u=V(s," -- "),i=V(s,c),s.forEach(g),r=A(v);for(let m=0;m<_.length;m+=1)_[m].l(v);h=A(v),v.forEach(g),this.h()},h(){e.open=!0},m(f,v){O(f,e,v),b(e,l),b(l,n),b(l,u),b(l,i),b(e,r);for(let s=0;s<_.length;s+=1)_[s]&&_[s].m(e,null);b(e,h),E=!0},p(f,v){if((!E||v&1)&&t!==(t=f[6]+"")&&H(n,t),(!E||v&1)&&c!==(c=f[2].length+"")&&H(i,c),v&3){I=G(f[2]);let s;for(s=0;s<I.length;s+=1){const m=x(f,I,s);_[s]?(_[s].p(m,v),k(_[s],1)):(_[s]=ie(m),_[s].c(),k(_[s],1),_[s].m(e,h))}for(T(),s=I.length;s<_.length;s+=1)U(s);C()}},i(f){if(!E){for(let v=0;v<I.length;v+=1)k(_[v]);E=!0}},o(f){_=_.filter(Boolean);for(let v=0;v<_.length;v+=1)w(_[v]);E=!1},d(f){f&&g(e),oe(_,f)}}}function $e(o){let e,l;return e=new _e({}),{c(){K(e.$$.fragment)},l(t){P(e.$$.fragment,t)},m(t,n){R(e,t,n),l=!0},p:j,i(t){l||(k(e.$$.fragment,t),l=!0)},o(t){w(e.$$.fragment,t),l=!1},d(t){X(e,t)}}}function we(o){let e,l,t;return{c(){e=M("img"),this.h()},l(n){e=y(n,"IMG",{class:!0,alt:!0,src:!0,width:!0,height:!0}),this.h()},h(){a(e,"class","cover"),a(e,"alt",l=o[10]),Q(e.src,t=o[11])||a(e,"src",t),a(e,"width","32px"),a(e,"height","32px")},m(n,u){O(n,e,u)},p(n,u){u&1&&l!==(l=n[10])&&a(e,"alt",l),u&1&&!Q(e.src,t=n[11])&&a(e,"src",t)},i:j,o:j,d(n){n&&g(e)}}}function te(o){let e,l,t,n,u;l=new ge({});function c(){return o[3](o[9])}return{c(){e=M("button"),K(l.$$.fragment),this.h()},l(i){e=y(i,"BUTTON",{class:!0});var r=B(e);P(l.$$.fragment,r),r.forEach(g),this.h()},h(){a(e,"class","svelte-2al06j")},m(i,r){O(i,e,r),R(l,e,null),t=!0,n||(u=J(e,"click",c),n=!0)},p(i,r){o=i},i(i){t||(k(l.$$.fragment,i),t=!0)},o(i){w(l.$$.fragment,i),t=!1},d(i){i&&g(e),X(l),n=!1,u()}}}function le(o){let e,l,t,n,u;l=new pe({});function c(){return o[4](o[9])}return{c(){e=M("button"),K(l.$$.fragment),this.h()},l(i){e=y(i,"BUTTON",{class:!0});var r=B(e);P(l.$$.fragment,r),r.forEach(g),this.h()},h(){a(e,"class","svelte-2al06j")},m(i,r){O(i,e,r),R(l,e,null),t=!0,n||(u=J(e,"click",c),n=!0)},p(i,r){o=i},i(i){t||(k(l.$$.fragment,i),t=!0)},o(i){w(l.$$.fragment,i),t=!1},d(i){i&&g(e),X(l),n=!1,u()}}}function ne(o){let e,l,t,n,u;l=new ve({});function c(){return o[5](o[9])}return{c(){e=M("button"),K(l.$$.fragment),this.h()},l(i){e=y(i,"BUTTON",{class:!0});var r=B(e);P(l.$$.fragment,r),r.forEach(g),this.h()},h(){a(e,"class","svelte-2al06j")},m(i,r){O(i,e,r),R(l,e,null),t=!0,n||(u=J(e,"click",c),n=!0)},p(i,r){o=i},i(i){t||(k(l.$$.fragment,i),t=!0)},o(i){w(l.$$.fragment,i),t=!1},d(i){i&&g(e),X(l),n=!1,u()}}}function ie(o){let e,l,t,n,u=o[10]+"",c,i,r,h,E,I,_;const U=[we,$e],f=[];function v(p,d){return p[11]!=null?0:1}l=v(o),t=f[l]=U[l](o);let s=o[9].relationship=="Friend"&&te(o),m=o[9].relationship=="Incoming"&&le(o),$=(o[9].relationship=="Outgoing"||o[9].relationship=="Friend"||o[9].relationship=="Incoming")&&ne(o);return{c(){e=M("div"),t.c(),n=F(),c=S(u),i=F(),r=M("div"),h=F(),s&&s.c(),E=F(),m&&m.c(),I=F(),$&&$.c(),this.h()},l(p){e=y(p,"DIV",{class:!0});var d=B(e);t.l(d),n=A(d),c=V(d,u),i=A(d),r=y(d,"DIV",{class:!0}),B(r).forEach(g),h=A(d),s&&s.l(d),E=A(d),m&&m.l(d),I=A(d),$&&$.l(d),d.forEach(g),this.h()},h(){a(r,"class","flex-divider"),a(e,"class","friend-item svelte-2al06j")},m(p,d){O(p,e,d),f[l].m(e,null),b(e,n),b(e,c),b(e,i),b(e,r),b(e,h),s&&s.m(e,null),b(e,E),m&&m.m(e,null),b(e,I),$&&$.m(e,null),_=!0},p(p,d){let Y=l;l=v(p),l===Y?f[l].p(p,d):(T(),w(f[Y],1,1,()=>{f[Y]=null}),C(),t=f[l],t?t.p(p,d):(t=f[l]=U[l](p),t.c()),k(t,1),t.m(e,n)),(!_||d&1)&&u!==(u=p[10]+"")&&H(c,u),p[9].relationship=="Friend"?s?(s.p(p,d),d&1&&k(s,1)):(s=te(p),s.c(),k(s,1),s.m(e,E)):s&&(T(),w(s,1,1,()=>{s=null}),C()),p[9].relationship=="Incoming"?m?(m.p(p,d),d&1&&k(m,1)):(m=le(p),m.c(),k(m,1),m.m(e,I)):m&&(T(),w(m,1,1,()=>{m=null}),C()),p[9].relationship=="Outgoing"||p[9].relationship=="Friend"||p[9].relationship=="Incoming"?$?($.p(p,d),d&1&&k($,1)):($=ne(p),$.c(),k($,1),$.m(e,null)):$&&(T(),w($,1,1,()=>{$=null}),C())},i(p){_||(k(t),k(s),k(m),k($),_=!0)},o(p){w(t),w(s),w(m),w($),_=!1},d(p){p&&g(e),f[l].d(),s&&s.d(),m&&m.d(),$&&$.d()}}}function re(o){let e,l,t=o[2].length!=0&&ee(o);return{c(){t&&t.c(),e=W()},l(n){t&&t.l(n),e=W()},m(n,u){t&&t.m(n,u),O(n,e,u),l=!0},p(n,u){n[2].length!=0?t?(t.p(n,u),u&1&&k(t,1)):(t=ee(n),t.c(),k(t,1),t.m(e.parentNode,e)):t&&(T(),w(t,1,1,()=>{t=null}),C())},i(n){l||(k(t),l=!0)},o(n){w(t),l=!1},d(n){n&&g(e),t&&t.d(n)}}}function be(o){let e,l,t=G(o[0]),n=[];for(let c=0;c<t.length;c+=1)n[c]=re(Z(o,t,c));const u=c=>w(n[c],1,1,()=>{n[c]=null});return{c(){e=M("main");for(let c=0;c<n.length;c+=1)n[c].c();this.h()},l(c){e=y(c,"MAIN",{class:!0});var i=B(e);for(let r=0;r<n.length;r+=1)n[r].l(i);i.forEach(g),this.h()},h(){a(e,"class","main-content-container")},m(c,i){O(c,e,i);for(let r=0;r<n.length;r+=1)n[r]&&n[r].m(e,null);l=!0},p(c,[i]){if(i&3){t=G(c[0]);let r;for(r=0;r<t.length;r+=1){const h=Z(c,t,r);n[r]?(n[r].p(h,i),k(n[r],1)):(n[r]=re(h),n[r].c(),k(n[r],1),n[r].m(e,null))}for(T(),r=t.length;r<n.length;r+=1)u(r);C()}},i(c){if(!l){for(let i=0;i<t.length;i+=1)k(n[i]);l=!0}},o(c){n=n.filter(Boolean);for(let i=0;i<n.length;i+=1)w(n[i]);l=!1},d(c){c&&g(e),oe(n,c)}}}function Be(o,e,l){let t;const n=ce(ue);let u=Array.from(n.cache.users.values()).filter(h=>h.relationship!=null&&["Outgoing","Incoming","Blocked","BlockedOther","Friend"].includes(h.relationship));const c=async h=>{const{_id:E}=await n.openDM(h._id);await se(`${ae}/channels/${E}`)},i=h=>n.acceptFriend(h._id),r=h=>n.removeFriend(h._id);return l(0,t=[{title:"Outgoing",list:u.filter(h=>h.relationship=="Outgoing")},{title:"Incoming",list:u.filter(h=>h.relationship=="Incoming")},{title:"Online",list:u.filter(h=>h.relationship=="Friend"&&h.online)},{title:"Offline",list:u.filter(h=>h.relationship=="Friend"&&!h.online)},{title:"Blocked",list:u.filter(h=>h.relationship=="Blocked")}]),[t,n,u,c,i,r]}class Ce extends q{constructor(e){super(),z(this,e,Be,be,L,{})}}export{Ce as component};
