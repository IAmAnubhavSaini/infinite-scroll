(this["webpackJsonpreact-material-app"]=this["webpackJsonpreact-material-app"]||[]).push([[0],{90:function(e,t,c){},91:function(e,t,c){},98:function(e,t,c){"use strict";c.r(t);var n=c(0),r=c.n(n),o=c(30),a=c.n(o),i=(c(90),c(14)),s=c(16),l=c(11),u=c(147),j=(c(91),"_n"),h="_c";function d(e){return{small:"https://farm".concat(e.farm,".static.flickr.com/").concat(e.server,"/").concat(e.id,"_").concat(e.secret).concat(j,".jpg"),medium:"https://farm".concat(e.farm,".static.flickr.com/").concat(e.server,"/").concat(e.id,"_").concat(e.secret).concat(h,".jpg")}}function b(e){return e.map((function(e){return{url:d(e),alt:e.title,title:"".concat(e.title)}}))}var f=c(5),O=c(158),m=c(157),p=c(154),g=c(145),v=c(150),x=c(155),S=c(156),I=c(2);var C=function(e){var t=e.url,c=Object(n.useState)(e.open),r=Object(l.a)(c,2),o=r[0],a=r[1];return Object(I.jsx)("div",{onClick:function(e){return e.stopPropagation()},style:{position:"relative",margin:"5vh"},children:Object(I.jsx)(v.a,{open:o,onClose:e.handleClose,"aria-labelledby":"modal-modal-title",children:Object(I.jsxs)("div",{style:{textAlign:"center",height:"100%",width:"100%",border:"thick solid white",top:"50%",left:"50%",transform:"translate(-50%, -50%)",position:"absolute",boxShadow:"2px 2px 5px black",color:"white",borderRadius:"4px"},children:[Object(I.jsxs)(x.a,{id:"modal-modal-title",variant:"h6",component:"h2",children:[Object(I.jsx)("div",{style:{backgroundColor:"rgba(32,32,32,0.82)",padding:"0.5rem"},children:e.title}),Object(I.jsx)(S.a,{onClick:function(){return a(!1)},variant:"contained",color:"error",style:{width:"100%"},size:"large",children:"close"})]}),Object(I.jsx)("div",{children:Object(I.jsx)("img",{src:t,alt:"".concat(e.title," at ").concat(t),height:"100%",style:{maxHeight:"90vh"}})})]})})})},k=Object(f.a)(m.a)((function(e){var t=e.theme;return Object(s.a)(Object(s.a)({},t.typography.body2),{},{padding:t.spacing(2),textAlign:"center",color:t.palette.text.secondary})}));var w=function(e){var t=e.photos,c=[t.filter((function(e,t){return t%4===0})),t.filter((function(e,t){return t%4===1})),t.filter((function(e,t){return t%4===2})),t.filter((function(e,t){return t%4===3}))];return Object(I.jsx)(O.a,{sx:{flexGrow:1},children:Object(I.jsx)(p.a,{container:!0,spacing:2,children:c.map((function(e,t){return Object(I.jsx)(p.a,{item:!0,xs:3,children:Object(I.jsx)(g.a,{spacing:2,children:e.map((function(e,t){return Object(I.jsx)(y,{photo:e,index:t})}))},"photos-stack-".concat(t))},"photos-grid-".concat(t))}))})})};function y(e){var t=n.useState(!1),c=Object(l.a)(t,2),r=c[0],o=c[1],a=e.photo,i=e.index;return Object(I.jsxs)(k,{children:[Object(I.jsx)("img",{src:a.url.small,alt:a.alt,title:"".concat(a.title," at ").concat(a.url.small),style:{width:"100%"},onClick:function(){return o(!0)}}),r&&Object(I.jsx)(C,{open:r,handleClose:function(){return o(!1)},alt:a.alt,url:a.url.medium,title:a.title})]},"image-container-".concat(i))}var T=c(160),_=c(161),E=c(162),P=c(148),R=c(149),N=c(51);function L(e){var t=e.searchTerms.reverse();function c(t,c,n){console.log(t,c,n),"input"===n&&e.activateSearch(c),"clear"===n&&e.deactivateSearch(),"selectOption"===n&&(console.log(c),e.activateSearch(c))}return Object(I.jsx)(P.a,{disablePortal:!0,className:"search-autocomplete",id:"search-bar-input",options:t,sx:{width:400},renderInput:function(e){return Object(I.jsx)(R.a,Object(s.a)(Object(s.a)({},e),{},{label:"Search"}))},onInputChange:Object(N.a)(c,400),noOptionsText:"",onChange:function(e,t,n){return c(e,t,n)},selectOnFocus:!0})}function A(e){return Object(I.jsx)(O.a,{sx:{flexGrow:1},className:"topbar-box",children:Object(I.jsx)(T.a,{position:"fixed",children:Object(I.jsxs)(_.a,{children:[Object(I.jsx)(x.a,{variant:"h6",component:"div",sx:{flexGrow:1},children:Object(I.jsx)(E.a,{href:"/infinite-scroll",underline:"none",color:"white",children:"Infinite Scroll"})}),Object(I.jsx)(L,Object(s.a)({},e.searchProps))]})})})}var F="SEARCH_TERMS",J="COOKIES_CONSENT",H="cookie_consent_accepted",W="cookie_consent_rejected",G="VIEWERS_WARNING",M="viewers_warning_accepted";function B(){if("undefined"===typeof localStorage)return!1;try{return localStorage.setItem("feature_test","yes"),"yes"===localStorage.getItem("feature_test")&&(localStorage.removeItem("feature_test"),!0)}catch(e){return!1}}function z(e,t){if(B())if(function(e){if(B())return null!==localStorage.getItem(e)}(e)){var c=JSON.parse(localStorage.getItem(e));c.includes(t)?c=[].concat(Object(i.a)(c.slice(0,c.indexOf(t))),Object(i.a)(c.slice(c.indexOf(t)+1)),[t]):c.push(t),localStorage.setItem(e,JSON.stringify(c))}else{var n=[t];localStorage.setItem(e,JSON.stringify(n))}}var D="84bf9b29bce8db001d1e58dbec8a5770",K="format=json",U="nojsoncallback=1",V="https://api.flickr.com/services/rest/",q=c(164),Q=c(152),X=c(163);function Y(){var e={saveConsent:function(){localStorage.setItem(J,H)},fetchConsent:function(){return localStorage.getItem(J)},clearConsent:function(){localStorage.removeItem(J)},rejectConsent:function(){localStorage.setItem(J,W)},isRejected:function(){return localStorage.getItem(J)===W},isAccepted:function(){return localStorage.getItem(J)===H}},t=e.saveConsent,c=e.rejectConsent,r=e.isRejected,o=e.clearConsent,a=e.isAccepted,i=Object(n.useState)(a()),s=Object(l.a)(i,2),u=s[0],j=s[1],h=Object(n.useState)(r()),d=Object(l.a)(h,2),b=d[0],f=d[1];return Object(I.jsx)("div",{className:"cookie-consent-container",children:!u&&Object(I.jsx)("div",{children:Object(I.jsxs)(Q.a,{severity:b?"warning":"info",variant:"outlined",children:[Object(I.jsx)(X.a,{children:"Cookies Consent"}),"We use necessary cookies, localStorage for site to function. \u2014 ",Object(I.jsx)("strong",{children:"We don't track users or behavior."}),Object(I.jsxs)("div",{className:"button-container",children:[Object(I.jsx)(S.a,{variant:"contained",color:"success",onClick:function(){a()||(j(!0),f(!1),o(),t())},children:"Accept"}),Object(I.jsx)(S.a,{onClick:function(){r()||(j(!1),f(!0),o(),c(),window.close())},variant:"outlined",color:"error",children:"Reject"}),Object(I.jsx)(S.a,{onClick:function(){f(!1),j(!1),o()},variant:"outlined",children:"Clear consent"})]})]})})})}var Z=function(){var e={accept:function(){localStorage.setItem(G,M)},reject:function(){localStorage.setItem(G,"viewers_warning_rejected")},isAccepted:function(){return localStorage.getItem(G)===M}},t=e.accept,c=e.reject,r=e.isAccepted,o=Object(n.useState)(r()),a=Object(l.a)(o,2),i=a[0],s=a[1];return Object(I.jsx)("div",{className:"viewers-warning-container",children:!i&&Object(I.jsx)("div",{children:Object(I.jsxs)(Q.a,{severity:"error",variant:"outlined",children:[Object(I.jsx)(X.a,{children:"Warning: Unfiltered content."}),"This application fetches images from public service.",Object(I.jsx)("br",{}),"People may choose to upload disturbing content, containing but not limited to:",Object(I.jsx)("br",{}),Object(I.jsx)("strong",{children:"sexual, child abuse, self-harm, gore, mutilation etc."}),Object(I.jsx)("br",{}),"Continue only if you are okay with this.",Object(I.jsxs)("div",{className:"button-container",children:[Object(I.jsx)(S.a,{variant:"contained",color:"success",onClick:function(){s(!0),t()},children:"I understand. Let me continue to app anyway."}),Object(I.jsx)(S.a,{variant:"outlined",color:"error",onClick:function(){s(!1),c(),window.close()},children:"Close the browser tab/window."})]})]})})})};var $={isLoading:!0,loadingMessage:"",hasError:!1,errorMessage:"",error:void 0,recentPhotos:[],searchPhotos:[],isInSearch:!1,isInRecent:!1,searchTerms:[],currentSearchTerm:"",page:1,perPage:52};var ee=function(){var e=Object(n.useState)($),t=Object(l.a)(e,2),c=t[0],o=t[1],a={saveSearchTerm:function(e){e&&e.length>=3&&z(F,e)},fetchSearchTerms:function(){return JSON.parse(localStorage.getItem(F))},clearSearchTerms:function(){localStorage.removeItem(F)}},j=a.saveSearchTerm,h=a.fetchSearchTerms,d=function(){var e=Object(n.useState)(0),t=Object(l.a)(e,2),c=t[0],r=t[1],o=Object(n.useState)(document.documentElement.scrollHeight),a=Object(l.a)(o,2),i=a[0],s=a[1];return Object(n.useEffect)((function(){var e=Object(N.a)((function(){var e=document.documentElement.scrollTop,t=document.documentElement.scrollHeight;r(e),s(t)}),400);return document.addEventListener("scroll",e),function(){return document.removeEventListener("scroll",e)}}),[c]),{scrollTop:c,scrollHeight:i}}().scrollTop;function f(e,t){fetch(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:52;return"".concat(V,"?method=flickr.photos.getRecent&api_key=").concat(D,"&per_page=").concat(t,"&page=").concat(e,"&").concat(K,"&").concat(U)}(e,t)).then((function(e){return e.json()})).then((function(t){o((function(n){return Object(s.a)(Object(s.a)({},n),{},{isLoading:!1,recentPhotos:[].concat(Object(i.a)(c.recentPhotos),Object(i.a)(b(t.photos.photo))),isInSearch:!1,isInRecent:!0,page:e+1})}))})).catch((function(e){o((function(t){return Object(s.a)(Object(s.a)({},t),{},{error:e,hasError:!0,isLoading:!1})}))}))}return Object(n.useEffect)((function(){f(c.page,c.perPage),o((function(e){return Object(s.a)(Object(s.a)({},e),{},{searchTerms:h()||[]})}))}),[]),Object(n.useEffect)((function(){var e=h()||[];o((function(t){return Object(s.a)(Object(s.a)({},t),{},{searchTerms:e})}))}),[c.isInSearch]),Object(n.useEffect)((function(){c.isInRecent&&f(c.page,c.perPage)}),[d]),Object(I.jsxs)(r.a.Fragment,{children:[Object(I.jsx)(u.a,{}),Object(I.jsxs)("div",{className:"App",children:[Object(I.jsx)(A,{searchProps:{isInSearch:c.isInSearch,searchTerms:c.searchTerms,searchPhotos:c.searchPhotos,activateSearch:function(e){var t;e&&(j(e),o((function(t){return Object(s.a)(Object(s.a)({},t),{},{isLoading:!0,isInSearch:!0,isInRecent:!1,currentSearchTerm:e})})),fetch((t=e,"".concat(V,"?method=flickr.photos.search&api_key=").concat(D,"&text=").concat(t,"&").concat(K,"&").concat(U))).then((function(e){return e.json()})).then((function(e){console.log(e),o((function(t){return Object(s.a)(Object(s.a)({},t),{},{isLoading:!1,searchPhotos:b(e.photos.photo),isInSearch:!0,isInRecent:!1})}))})).catch((function(e){o((function(t){return Object(s.a)(Object(s.a)({},t),{},{error:e,hasError:!0,isLoading:!1})}))})))},deactivateSearch:function(){o((function(e){return Object(s.a)(Object(s.a)({},e),{},{isInSearch:!1,isInRecent:!0})}))},currentSearchTerm:c.currentSearchTerm}}),Object(I.jsx)(Y,{}),Object(I.jsx)(Z,{}),!c.isInSearch&&c.isInRecent&&Object(I.jsx)(w,{photos:c.recentPhotos}),c.isInSearch&&!c.isInRecent&&Object(I.jsx)(w,{photos:c.searchPhotos}),c.isLoading&&Object(I.jsx)(q.a,{})]})]})},te=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,166)).then((function(t){var c=t.getCLS,n=t.getFID,r=t.getFCP,o=t.getLCP,a=t.getTTFB;c(e),n(e),r(e),o(e),a(e)}))};a.a.render(Object(I.jsx)(r.a.StrictMode,{children:Object(I.jsx)(ee,{})}),document.getElementById("root")),te()}},[[98,1,2]]]);
//# sourceMappingURL=main.8ada97b2.chunk.js.map