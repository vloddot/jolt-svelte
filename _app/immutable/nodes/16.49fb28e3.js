import"../chunks/paths.280ab84c.js";import{e as i,r as a}from"../chunks/index.5e2a9a64.js";const s=async({parent:t,url:e})=>{const{sections:r}=await t(),o=r.find(n=>n.type=="link");throw o==null?i(404,"Not Found"):a(302,`${e.pathname}/${o.id}`)},l=Object.freeze(Object.defineProperty({__proto__:null,load:s},Symbol.toStringTag,{value:"Module"}));export{l as universal};
