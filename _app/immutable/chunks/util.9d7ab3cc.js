const d="https://autumn.revolt.chat",v="https://api.revolt.chat",u={ordering:{},"jolt:low-data-mode":!1,"jolt:compact-mode":!1,"jolt:receive-typing-indicators":!0,"jolt:send-typing-indicators":!0};function r(a,n){return`${d}/${a.tag}/${a._id}?${new URLSearchParams(n)}`}function c(a){return`${v}/users/${a}/default_avatar`}function f(a,n,t){var i;return(t==null?void 0:t.system)==null?((i=t==null?void 0:t.masquerade)==null?void 0:i.name)??(n==null?void 0:n.nickname)??(a==null?void 0:a.display_name)??(a==null?void 0:a.username)??"Unknown User":"System Message"}function l(a,n,t){var i,o;if(((i=t==null?void 0:t.webhook)==null?void 0:i.avatar)!=null)return t.webhook.avatar;if(((o=t==null?void 0:t.masquerade)==null?void 0:o.avatar)!=null)return t.masquerade.avatar;if((n==null?void 0:n.avatar)!=null)return`${r(n.avatar,{max_side:"256"})}`;if(!(a==null||(t==null?void 0:t.system)!=null))return a.avatar==null?c(a._id):`${r(a.avatar,{max_side:"256"})}`}export{u as D,r as a,f as b,l as g};
