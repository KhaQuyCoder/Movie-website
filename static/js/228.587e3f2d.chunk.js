"use strict";(self.webpackChunkmovie_app=self.webpackChunkmovie_app||[]).push([[228],{228:(t,a,e)=>{e.r(a),e.d(a,{default:()=>m});var s=e(43),i=e(213),n=e(534),o=e(668),c=e(775),r=e(244),h=e(191),p=e(465),l=e(579);const m=()=>{const[t,a]=(0,s.useState)([]),[e,m]=(0,s.useState)(0),{timeLoad:d,setTimeload:u}=(0,s.useContext)(h.S),{total:v}=(0,s.useContext)(h.S);if((0,s.useEffect)((()=>{(async()=>{try{if(v)var t=await i.A.get(`https://phimapi.com/v1/api/danh-sach/tv-shows?page=${v}&limit=40`);else t=await i.A.get("https://phimapi.com/v1/api/danh-sach/tv-shows?page=1&limit=40");t&&(m(t.data.data.params.pagination.totalPages),a(t.data.data.items))}catch(e){alert(e)}})()}),[v]),(0,s.useEffect)((()=>{const t=setTimeout((()=>{u(!1)}),1e3);return()=>clearTimeout(t)})),d)return(0,l.jsx)(r.A,{});const f=Array.from({length:e},((t,a)=>a+1));return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(n.A,{}),!1===d&&(0,l.jsx)("div",{className:o.A.cartoon,children:(0,l.jsx)("div",{className:o.A.container,children:(0,l.jsx)(c.A,{thumb:!0,data:t,title:"Tv-Shows",pages:f,path:"Tv-Shows"})})}),(0,l.jsx)(p.A,{})]})}},668:(t,a,e)=>{e.d(a,{A:()=>s});const s={container:"Series_container__+OWIx",title:"Series_title__fwHCM"}}}]);
//# sourceMappingURL=228.587e3f2d.chunk.js.map