const d="https://autumn.revolt.chat",v="https://api.revolt.chat",c={ordering:{servers:[]},"jolt:low-data-mode":!1,"jolt:receive-typing-indicators":!0,"jolt:send-typing-indicators":!0};function o(a,n){return`${d}/${a.tag}/${a._id}?${new URLSearchParams(n)}`}function u(a){return`${v}/users/${a}/default_avatar`}function f(a,n,t){var r;return((r=t==null?void 0:t.masquerade)==null?void 0:r.name)??(n==null?void 0:n.nickname)??(a==null?void 0:a.display_name)??a.username}function l(a,n,t){var r,i;if(((r=t==null?void 0:t.webhook)==null?void 0:r.avatar)!=null)return t.webhook.avatar;if(((i=t==null?void 0:t.masquerade)==null?void 0:i.avatar)!=null)return t.masquerade.avatar;if((n==null?void 0:n.avatar)!=null)return`${o(n.avatar,{max_side:"256"})}`;if(!(a==null||(t==null?void 0:t.system)!=null))return a.avatar==null?u(a._id):`${o(a.avatar,{max_side:"256"})}`}export{c as D,o as a,f as b,l as g};
