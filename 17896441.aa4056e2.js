(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{167:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(60),l=a(173),c=a(176),o=a(172);var s=function(e){var t=e.metadata;return r.a.createElement("nav",{className:"pagination-nav"},r.a.createElement("div",{className:"pagination-nav__item"},t.previous&&r.a.createElement(o.a,{className:"pagination-nav__link",to:t.previous.permalink},r.a.createElement("h5",{className:"pagination-nav__link--sublabel"},"Previous"),r.a.createElement("h4",{className:"pagination-nav__link--label"},"\xab ",t.previous.title))),r.a.createElement("div",{className:"pagination-nav__item pagination-nav__item--next"},t.next&&r.a.createElement(o.a,{className:"pagination-nav__link",to:t.next.permalink},r.a.createElement("h5",{className:"pagination-nav__link--sublabel"},"Next"),r.a.createElement("h4",{className:"pagination-nav__link--label"},t.next.title," \xbb"))))};var m=function(e,t,a){var r=Object(n.useState)(void 0),i=r[0],l=r[1];Object(n.useEffect)((function(){var n=[],r=[];function c(){var c=function(){var e=0,t=null;for(n=document.getElementsByClassName("anchor");e<n.length&&!t;){var r=n[e],i=r.getBoundingClientRect().top;i>=0&&i<=a&&(t=r),e+=1}return t}();if(c){var o=0,s=!1;for(r=document.getElementsByClassName(e);o<r.length&&!s;){var m=r[o],u=m.href,d=decodeURIComponent(u.substring(u.indexOf("#")+1));c.id===d&&(i&&i.classList.remove(t),m.classList.add(t),l(m),s=!0),o+=1}}}return document.addEventListener("scroll",c),document.addEventListener("resize",c),c(),function(){document.removeEventListener("scroll",c),document.removeEventListener("resize",c)}}))},u=a(192),d=a.n(u),v="contents__link",g="contents__link--active",E=100;function f(e){var t=e.headings;return m(v,g,E),r.a.createElement("div",{className:"col col--3"},r.a.createElement("div",{className:d.a.tableOfContents},r.a.createElement(p,{headings:t})))}function p(e){var t=e.headings,a=e.isChild;return t.length?r.a.createElement("ul",{className:a?"":"contents contents__left-border"},t.map((function(e){return r.a.createElement("li",{key:e.id},r.a.createElement("a",{href:"#"+e.id,className:v},e.value),r.a.createElement(p,{isChild:!0,headings:e.children}))}))):null}t.default=function(e){var t=Object(l.a)().siteConfig,a=(void 0===t?{}:t).url,n=e.metadata,o=e.content,m=n.description,u=n.title,v=n.permalink,g=n.image,E=n.editUrl,p=n.lastUpdatedAt,h=n.lastUpdatedBy,b=n.keywords,w=a+Object(c.a)(g);return r.a.createElement(r.a.Fragment,null,r.a.createElement(i.a,null,u&&r.a.createElement("title",null,u),m&&r.a.createElement("meta",{name:"description",content:m}),m&&r.a.createElement("meta",{property:"og:description",content:m}),b&&b.length&&r.a.createElement("meta",{name:"keywords",content:b.join(",")}),g&&r.a.createElement("meta",{property:"og:image",content:w}),g&&r.a.createElement("meta",{property:"twitter:image",content:w}),g&&r.a.createElement("meta",{name:"twitter:image:alt",content:"Image for "+u}),v&&r.a.createElement("meta",{property:"og:url",content:a+v})),r.a.createElement("div",{className:"padding-vert--lg"},r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col"},r.a.createElement("div",{className:d.a.docItemContainer},!n.hide_title&&r.a.createElement("header",null,r.a.createElement("h1",{className:d.a.docTitle},n.title)),r.a.createElement("article",null,r.a.createElement("div",{className:"markdown"},r.a.createElement(o,null))),(E||p||h)&&r.a.createElement("div",{className:"margin-vert--xl"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col"},E&&r.a.createElement("a",{href:E,target:"_blank",rel:"noreferrer noopener"},r.a.createElement("svg",{fill:"currentColor",height:"1.2em",width:"1.2em",preserveAspectRatio:"xMidYMid meet",viewBox:"0 0 40 40",style:{marginRight:"0.3em",verticalAlign:"sub"}},r.a.createElement("g",null,r.a.createElement("path",{d:"m34.5 11.7l-3 3.1-6.3-6.3 3.1-3q0.5-0.5 1.2-0.5t1.1 0.5l3.9 3.9q0.5 0.4 0.5 1.1t-0.5 1.2z m-29.5 17.1l18.4-18.5 6.3 6.3-18.4 18.4h-6.3v-6.2z"}))),"Edit this page")),(p||h)&&r.a.createElement("div",{className:"col text--right"},r.a.createElement("em",null,r.a.createElement("small",null,"Last updated"," ",p&&r.a.createElement(r.a.Fragment,null,"on"," ",r.a.createElement("strong",null,new Date(1e3*p).toLocaleDateString()),h&&" "),h&&r.a.createElement(r.a.Fragment,null,"by ",r.a.createElement("strong",null,h)),!1))))),r.a.createElement("div",{className:"margin-vert--lg"},r.a.createElement(s,{metadata:n})))),o.rightToc&&r.a.createElement(f,{headings:o.rightToc})))))}},172:function(e,t,a){"use strict";a(58);var n=a(0),r=a.n(n),i=a(40);function l(){return(l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}var c=/^\/(?!\/)/;t.a=function(e){var t,a=e.to,o=e.href,s=a||o,m=c.test(s),u=!1,d="undefined"!=typeof window&&"IntersectionObserver"in window;return Object(n.useEffect)((function(){return!d&&m&&window.docusaurus.prefetch(s),function(){d&&t&&t.disconnect()}}),[s,d,m]),s&&m?r.a.createElement(i.b,l({},e,{onMouseEnter:function(){u||(window.docusaurus.preload(s),u=!0)},innerRef:function(e){var a,n;d&&e&&m&&(a=e,n=function(){window.docusaurus.prefetch(s)},(t=new window.IntersectionObserver((function(e){e.forEach((function(e){a===e.target&&(e.isIntersecting||e.intersectionRatio>0)&&(t.unobserve(a),t.disconnect(),n())}))}))).observe(a))},to:s})):r.a.createElement("a",l({},e,{href:s}))}},173:function(e,t,a){"use strict";var n=a(0),r=a(64);t.a=function(){return Object(n.useContext)(r.a)}},176:function(e,t,a){"use strict";a.d(t,"a",(function(){return r}));a(180);var n=a(173);function r(e){var t=(Object(n.a)().siteConfig||{}).baseUrl,a=void 0===t?"/":t;if(!e)return e;return/^(https?:|\/\/)/.test(e)?e:e.startsWith("/")?a+e.slice(1):a+e}},180:function(e,t,a){"use strict";var n=a(9),r=a(24),i=a(95),l="".startsWith;n(n.P+n.F*a(96)("startsWith"),"String",{startsWith:function(e){var t=i(this,e,"startsWith"),a=r(Math.min(arguments.length>1?arguments[1]:void 0,t.length)),n=String(e);return l?l.call(t,n,a):t.slice(a,a+n.length)===n}})},192:function(e,t,a){e.exports={docTitle:"docTitle_1vWb",docItemContainer:"docItemContainer_2cwg",tableOfContents:"tableOfContents_TbNY"}}}]);