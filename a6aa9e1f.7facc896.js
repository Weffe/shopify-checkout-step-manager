(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{170:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),l=t(175),m=t(177),c=t(172);var i=function(e){var a=e.metadata,t=a.previousPage,n=a.nextPage;return r.a.createElement("nav",{className:"pagination-nav"},r.a.createElement("div",{className:"pagination-nav__item"},t&&r.a.createElement(c.a,{className:"pagination-nav__link",to:t},r.a.createElement("h4",{className:"pagination-nav__link--label"},"\xab Newer Entries"))),r.a.createElement("div",{className:"pagination-nav__item pagination-nav__item--next"},n&&r.a.createElement(c.a,{className:"pagination-nav__link",to:n},r.a.createElement("h4",{className:"pagination-nav__link--label"},"Older Entries \xbb"))))};a.default=function(e){var a=e.metadata,t=e.items;return r.a.createElement(l.a,{title:"Blog",description:"Blog"},r.a.createElement("div",{className:"container margin-vert--xl"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col col--8 col--offset-2"},t.map((function(e){var a=e.content,t=e.metadata;return r.a.createElement("div",{className:"margin-bottom--xl",key:t.permalink},r.a.createElement(m.a,{frontMatter:a.frontMatter,metadata:t,truncated:!0},r.a.createElement(a,null)))})),r.a.createElement(i,{metadata:a})))))}},177:function(e,a,t){"use strict";t(93);var n=t(0),r=t.n(n),l=t(174),m=t.n(l),c=t(171),i=t(172),o=t(179),s=t(178),u=t.n(s);a.a=function(e){var a,t,n,l,s,E=e.children,v=e.frontMatter,g=e.metadata,p=e.truncated,d=g.date,_=g.permalink,N=g.tags,h=v.author,b=v.authorURL,f=v.authorTitle,k=v.authorFBID,w=v.title;return r.a.createElement("div",null,(a=d.substring(0,10).split("-"),t=a[0],n=["January","February","March","April","May","June","July","August","September","October","November","December"][parseInt(a[1],10)-1],l=parseInt(a[2],10),s=k?"https://graph.facebook.com/"+k+"/picture/?height=200&width=200":v.authorImageURL,r.a.createElement("header",null,r.a.createElement("h1",{className:m()("margin-bottom--sm",u.a.blogPostTitle)},r.a.createElement(i.a,{to:_},w)),r.a.createElement("div",{className:"margin-bottom--sm"},r.a.createElement("small",null,n," ",l,", ",t)),r.a.createElement("div",{className:"avatar margin-bottom--md"},s&&r.a.createElement("a",{className:"avatar__photo-link",href:b,target:"_blank",rel:"noreferrer noopener"},r.a.createElement("img",{className:"avatar__photo",src:s,alt:h})),r.a.createElement("div",{className:"avatar__intro"},h&&r.a.createElement(r.a.Fragment,null,r.a.createElement("h4",{className:"avatar__name"},r.a.createElement("a",{href:b,target:"_blank",rel:"noreferrer noopener"},h)),r.a.createElement("small",{className:"avatar__subtitle"},f)))))),r.a.createElement("article",{className:"markdown"},r.a.createElement(c.a,{components:o.a},E)),r.a.createElement("div",{className:"row margin-vert--lg"},r.a.createElement("div",{className:"col"},N.length>0&&r.a.createElement(r.a.Fragment,null,r.a.createElement("strong",null,"Tags:"),N.map((function(e){var a=e.label,t=e.permalink;return r.a.createElement(i.a,{key:t,className:"margin-horiz--sm",to:t},a)})))),r.a.createElement("div",{className:"col text--right"},p&&r.a.createElement(i.a,{to:g.permalink},r.a.createElement("strong",null,"Read More")))))}},178:function(e,a,t){e.exports={blogPostTitle:"blogPostTitle_2RZH"}}}]);