"use strict";(self.webpackChunkmovie_app=self.webpackChunkmovie_app||[]).push([[451],{451:(e,t,a)=>{a.r(t),a.d(t,{default:()=>h});var i=a(43),s=a(534),n=a(213),c=a(668),o=a(775),r=a(244),l=a(191),m=a(465),p=a(579);const h=()=>{const[e,t]=(0,i.useState)([]),[a,h]=(0,i.useState)(0),{timeLoad:u,setTimeload:d}=(0,i.useContext)(l.S),{total:g}=(0,i.useContext)(l.S),{converLanguage:f}=(0,i.useContext)(l.S);if((0,i.useEffect)((()=>{(async()=>{try{if(g)var e=await n.A.get(`https://phimapi.com/v1/api/danh-sach/phim-le?page=${g}&limit=40`);else e=await n.A.get("https://phimapi.com/v1/api/danh-sach/phim-le?page=1&limit=40");e&&(h(e.data.data.params.pagination.totalPages),t(e.data.data.items))}catch(a){alert(a)}})()}),[g]),(0,i.useEffect)((()=>{const e=setTimeout((()=>{d(!1)}),1e3);return()=>clearTimeout(e)})),u)return(0,p.jsx)(r.A,{});const v=Array.from({length:a},((e,t)=>t+1));return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(s.A,{}),!1===u&&(0,p.jsx)("div",{className:c.A.cartoon,children:(0,p.jsx)("div",{className:c.A.container,children:(0,p.jsx)(o.A,{thumb:!0,data:e,title:f?"Single movie":"Phim l\u1ebb",pages:v,path:"Single-Movie"})})}),(0,p.jsx)(m.A,{})]})}},668:(e,t,a)=>{a.d(t,{A:()=>i});const i={container:"Series_container__+OWIx",title:"Series_title__fwHCM"}}}]);
//# sourceMappingURL=451.7606ae3b.chunk.js.map