import{b as r}from"./paths.425312ee.js";import{X as v}from"./runtime.esm.252c27a7.js";import{v as d}from"./scheduler.a21a5cad.js";const f="https://autumn.revolt.chat",p="https://api.revolt.chat",y={appearance:{},ordering:{},"jolt:low-data-mode":!1,"jolt:compact-mode":!1,"jolt:receive-typing-indicators":!0,"jolt:send-typing-indicators":!0};function c(t,o){return`${f}/${t.tag}/${t._id}?${new URLSearchParams(o)}`}function l(t){return`${p}/users/${t}/default_avatar`}function U(t,o,a){var n;return(a==null?void 0:a.system)==null?((n=a==null?void 0:a.masquerade)==null?void 0:n.name)??(o==null?void 0:o.nickname)??(t==null?void 0:t.display_name)??(t==null?void 0:t.username)??`<${d(v)("user.unknown")}>`:d(v)("message.system")}function h(t,o,a){var n,i;return(a==null?void 0:a.system)!=null?`${r}/user.svg`:((n=a==null?void 0:a.webhook)==null?void 0:n.avatar)!=null?a.webhook.avatar:((i=a==null?void 0:a.masquerade)==null?void 0:i.avatar)!=null?a.masquerade.avatar:(o==null?void 0:o.avatar)!=null?`${c(o.avatar,{max_side:"256"})}`:(t==null?void 0:t.avatar)==null?t==null?`${r}/user.svg`:l(t._id):`${c(t==null?void 0:t.avatar,{max_side:"256"})}`}export{y as D,c as a,U as b,h as g};
