/*
 * Copyright (c) 2009 Simo Kinnunen.
 * Licensed under the MIT license.
 *
 * @version 1.09
 */
var Cufon=(function(){var m=function(){return m.replace.apply(null,arguments)};var x=m.DOM={ready:(function(){var C=false,E={loaded:1,complete:1};var B=[],D=function(){if(C){return}C=true;for(var F;F=B.shift();F()){}};if(document.addEventListener){document.addEventListener("DOMContentLoaded",D,false);window.addEventListener("pageshow",D,false)}if(!window.opera&&document.readyState){(function(){E[document.readyState]?D():setTimeout(arguments.callee,10)})()}if(document.readyState&&document.createStyleSheet){(function(){try{document.body.doScroll("left");D()}catch(F){setTimeout(arguments.callee,1)}})()}q(window,"load",D);return function(F){if(!arguments.length){D()}else{C?F():B.push(F)}}})(),root:function(){return document.documentElement||document.body}};var n=m.CSS={Size:function(C,B){this.value=parseFloat(C);this.unit=String(C).match(/[a-z%]*$/)[0]||"px";this.convert=function(D){return D/B*this.value};this.convertFrom=function(D){return D/this.value*B};this.toString=function(){return this.value+this.unit}},addClass:function(C,B){var D=C.className;C.className=D+(D&&" ")+B;return C},color:j(function(C){var B={};B.color=C.replace(/^rgba\((.*?),\s*([\d.]+)\)/,function(E,D,F){B.opacity=parseFloat(F);return"rgb("+D+")"});return B}),fontStretch:j(function(B){if(typeof B=="number"){return B}if(/%$/.test(B)){return parseFloat(B)/100}return{"ultra-condensed":0.5,"extra-condensed":0.625,condensed:0.75,"semi-condensed":0.875,"semi-expanded":1.125,expanded:1.25,"extra-expanded":1.5,"ultra-expanded":2}[B]||1}),getStyle:function(C){var B=document.defaultView;if(B&&B.getComputedStyle){return new a(B.getComputedStyle(C,null))}if(C.currentStyle){return new a(C.currentStyle)}return new a(C.style)},gradient:j(function(F){var G={id:F,type:F.match(/^-([a-z]+)-gradient\(/)[1],stops:[]},C=F.substr(F.indexOf("(")).match(/([\d.]+=)?(#[a-f0-9]+|[a-z]+\(.*?\)|[a-z]+)/ig);for(var E=0,B=C.length,D;E<B;++E){D=C[E].split("=",2).reverse();G.stops.push([D[1]||E/(B-1),D[0]])}return G}),quotedList:j(function(E){var D=[],C=/\s*((["'])([\s\S]*?[^\\])\2|[^,]+)\s*/g,B;while(B=C.exec(E)){D.push(B[3]||B[1])}return D}),recognizesMedia:j(function(G){var E=document.createElement("style"),D,C,B;E.type="text/css";E.media=G;try{E.appendChild(document.createTextNode("/**/"))}catch(F){}C=g("head")[0];C.insertBefore(E,C.firstChild);D=(E.sheet||E.styleSheet);B=D&&!D.disabled;C.removeChild(E);return B}),removeClass:function(D,C){var B=RegExp("(?:^|\\s+)"+C+"(?=\\s|$)","g");D.className=D.className.replace(B,"");return D},supports:function(D,C){var B=document.createElement("span").style;if(B[D]===undefined){return false}B[D]=C;return B[D]===C},textAlign:function(E,D,B,C){if(D.get("textAlign")=="right"){if(B>0){E=" "+E}}else{if(B<C-1){E+=" "}}return E},textShadow:j(function(F){if(F=="none"){return null}var E=[],G={},B,C=0;var D=/(#[a-f0-9]+|[a-z]+\(.*?\)|[a-z]+)|(-?[\d.]+[a-z%]*)|,/ig;while(B=D.exec(F)){if(B[0]==","){E.push(G);G={};C=0}else{if(B[1]){G.color=B[1]}else{G[["offX","offY","blur"][C++]]=B[2]}}}E.push(G);return E}),textTransform:(function(){var B={uppercase:function(C){return C.toUpperCase()},lowercase:function(C){return C.toLowerCase()},capitalize:function(C){return C.replace(/\b./g,function(D){return D.toUpperCase()})}};return function(E,D){var C=B[D.get("textTransform")];return C?C(E):E}})(),whiteSpace:(function(){var D={inline:1,"inline-block":1,"run-in":1};var C=/^\s+/,B=/\s+$/;return function(H,F,G,E){if(E){if(E.nodeName.toLowerCase()=="br"){H=H.replace(C,"")}}if(D[F.get("display")]){return H}if(!G.previousSibling){H=H.replace(C,"")}if(!G.nextSibling){H=H.replace(B,"")}return H}})()};n.ready=(function(){var B=!n.recognizesMedia("all"),E=false;var D=[],H=function(){B=true;for(var K;K=D.shift();K()){}};var I=g("link"),J=g("style");function C(K){return K.disabled||G(K.sheet,K.media||"screen")}function G(M,P){if(!n.recognizesMedia(P||"all")){return true}if(!M||M.disabled){return false}try{var Q=M.cssRules,O;if(Q){search:for(var L=0,K=Q.length;O=Q[L],L<K;++L){switch(O.type){case 2:break;case 3:if(!G(O.styleSheet,O.media.mediaText)){return false}break;default:break search}}}}catch(N){}return true}function F(){if(document.createStyleSheet){return true}var L,K;for(K=0;L=I[K];++K){if(L.rel.toLowerCase()=="stylesheet"&&!C(L)){return false}}for(K=0;L=J[K];++K){if(!C(L)){return false}}return true}x.ready(function(){if(!E){E=n.getStyle(document.body).isUsable()}if(B||(E&&F())){H()}else{setTimeout(arguments.callee,10)}});return function(K){if(B){K()}else{D.push(K)}}})();function s(D){var C=this.face=D.face,B={"\u0020":1,"\u00a0":1,"\u3000":1};this.glyphs=D.glyphs;this.w=D.w;this.baseSize=parseInt(C["units-per-em"],10);this.family=C["font-family"].toLowerCase();this.weight=C["font-weight"];this.style=C["font-style"]||"normal";this.viewBox=(function(){var F=C.bbox.split(/\s+/);var E={minX:parseInt(F[0],10),minY:parseInt(F[1],10),maxX:parseInt(F[2],10),maxY:parseInt(F[3],10)};E.width=E.maxX-E.minX;E.height=E.maxY-E.minY;E.toString=function(){return[this.minX,this.minY,this.width,this.height].join(" ")};return E})();this.ascent=-parseInt(C.ascent,10);this.descent=-parseInt(C.descent,10);this.height=-this.ascent+this.descent;this.spacing=function(L,N,E){var O=this.glyphs,M,K,G,P=[],F=0,J=-1,I=-1,H;while(H=L[++J]){M=O[H]||this.missingGlyph;if(!M){continue}if(K){F-=G=K[H]||0;P[I]-=G}F+=P[++I]=~~(M.w||this.w)+N+(B[H]?E:0);K=M.k}P.total=F;return P}}function f(){var C={},B={oblique:"italic",italic:"oblique"};this.add=function(D){(C[D.style]||(C[D.style]={}))[D.weight]=D};this.get=function(H,I){var G=C[H]||C[B[H]]||C.normal||C.italic||C.oblique;if(!G){return null}I={normal:400,bold:700}[I]||parseInt(I,10);if(G[I]){return G[I]}var E={1:1,99:0}[I%100],K=[],F,D;if(E===undefined){E=I>400}if(I==500){I=400}for(var J in G){if(!k(G,J)){continue}J=parseInt(J,10);if(!F||J<F){F=J}if(!D||J>D){D=J}K.push(J)}if(I<F){I=F}if(I>D){I=D}K.sort(function(M,L){return(E?(M>=I&&L>=I)?M<L:M>L:(M<=I&&L<=I)?M>L:M<L)?-1:1});return G[K[0]]}}function r(){function D(F,G){if(F.contains){return F.contains(G)}return F.compareDocumentPosition(G)&16}function B(G){var F=G.relatedTarget;if(!F||D(this,F)){return}C(this,G.type=="mouseover")}function E(F){C(this,F.type=="mouseenter")}function C(F,G){setTimeout(function(){var H=d.get(F).options;m.replace(F,G?h(H,H.hover):H,true)},10)}this.attach=function(F){if(F.onmouseenter===undefined){q(F,"mouseover",B);q(F,"mouseout",B)}else{q(F,"mouseenter",E);q(F,"mouseleave",E)}}}function u(){var C=[],D={};function B(H){var E=[],G;for(var F=0;G=H[F];++F){E[F]=C[D[G]]}return E}this.add=function(F,E){D[F]=C.push(E)-1};this.repeat=function(){var E=arguments.length?B(arguments):C,F;for(var G=0;F=E[G++];){m.replace(F[0],F[1],true)}}}function A(){var D={},B=0;function C(E){return E.cufid||(E.cufid=++B)}this.get=function(E){var F=C(E);return D[F]||(D[F]={})}}function a(B){var D={},C={};this.extend=function(E){for(var F in E){if(k(E,F)){D[F]=E[F]}}return this};this.get=function(E){return D[E]!=undefined?D[E]:B[E]};this.getSize=function(F,E){return C[F]||(C[F]=new n.Size(this.get(F),E))};this.isUsable=function(){return !!B}}function q(C,B,D){if(C.addEventListener){C.addEventListener(B,D,false)}else{if(C.attachEvent){C.attachEvent("on"+B,function(){return D.call(C,window.event)})}}}function v(C,B){var D=d.get(C);if(D.options){return C}if(B.hover&&B.hoverables[C.nodeName.toLowerCase()]){b.attach(C)}D.options=B;return C}function j(B){var C={};return function(D){if(!k(C,D)){C[D]=B.apply(null,arguments)}return C[D]}}function c(F,E){var B=n.quotedList(E.get("fontFamily").toLowerCase()),D;for(var C=0;D=B[C];++C){if(i[D]){return i[D].get(E.get("fontStyle"),E.get("fontWeight"))}}return null}function g(B){return document.getElementsByTagName(B)}function k(C,B){return C.hasOwnProperty(B)}function h(){var C={},B,F;for(var E=0,D=arguments.length;B=arguments[E],E<D;++E){for(F in B){if(k(B,F)){C[F]=B[F]}}}return C}function o(E,M,C,N,F,D){var K=document.createDocumentFragment(),H;if(M===""){return K}var L=N.separate;var I=M.split(p[L]),B=(L=="words");if(B&&t){if(/^\s/.test(M)){I.unshift("")}if(/\s$/.test(M)){I.push("")}}for(var J=0,G=I.length;J<G;++J){H=z[N.engine](E,B?n.textAlign(I[J],C,J,G):I[J],C,N,F,D,J<G-1);if(H){K.appendChild(H)}}return K}function l(D,M){var C=D.nodeName.toLowerCase();if(M.ignore[C]){return}var E=!M.textless[C];var B=n.getStyle(v(D,M)).extend(M);var F=c(D,B),G,K,I,H,L,J;if(!F){return}for(G=D.firstChild;G;G=I){K=G.nodeType;I=G.nextSibling;if(E&&K==3){if(H){H.appendData(G.data);D.removeChild(G)}else{H=G}if(I){continue}}if(H){D.replaceChild(o(F,n.whiteSpace(H.data,B,H,J),B,M,G,D),H);H=null}if(K==1){if(G.firstChild){if(G.nodeName.toLowerCase()=="cufon"){z[M.engine](F,null,B,M,G,D)}else{arguments.callee(G,M)}}J=G}}}var t=" ".split(/\s+/).length==0;var d=new A();var b=new r();var y=new u();var e=false;var z={},i={},w={autoDetect:false,engine:null,forceHitArea:false,hover:false,hoverables:{a:true},ignore:{applet:1,canvas:1,col:1,colgroup:1,head:1,iframe:1,map:1,optgroup:1,option:1,script:1,select:1,style:1,textarea:1,title:1,pre:1},printable:true,selector:(window.Sizzle||(window.jQuery&&function(B){return jQuery(B)})||(window.dojo&&dojo.query)||(window.Ext&&Ext.query)||(window.YAHOO&&YAHOO.util&&YAHOO.util.Selector&&YAHOO.util.Selector.query)||(window.$$&&function(B){return $$(B)})||(window.$&&function(B){return $(B)})||(document.querySelectorAll&&function(B){return document.querySelectorAll(B)})||g),separate:"words",textless:{dl:1,html:1,ol:1,table:1,tbody:1,thead:1,tfoot:1,tr:1,ul:1},textShadow:"none"};var p={words:/\s/.test("\u00a0")?/[^\S\u00a0]+/:/\s+/,characters:"",none:/^/};m.now=function(){x.ready();return m};m.refresh=function(){y.repeat.apply(y,arguments);return m};m.registerEngine=function(C,B){if(!B){return m}z[C]=B;return m.set("engine",C)};m.registerFont=function(D){if(!D){return m}var B=new s(D),C=B.family;if(!i[C]){i[C]=new f()}i[C].add(B);return m.set("fontFamily",'"'+C+'"')};m.replace=function(D,C,B){C=h(w,C);if(!C.engine){return m}if(!e){n.addClass(x.root(),"cufon-active cufon-loading");n.ready(function(){n.addClass(n.removeClass(x.root(),"cufon-loading"),"cufon-ready")});e=true}if(C.hover){C.forceHitArea=true}if(C.autoDetect){delete C.fontFamily}if(typeof C.textShadow=="string"){C.textShadow=n.textShadow(C.textShadow)}if(typeof C.color=="string"&&/^-/.test(C.color)){C.textGradient=n.gradient(C.color)}else{delete C.textGradient}if(!B){y.add(D,arguments)}if(D.nodeType||typeof D=="string"){D=[D]}n.ready(function(){for(var F=0,E=D.length;F<E;++F){var G=D[F];if(typeof G=="string"){m.replace(C.selector(G),C,true)}else{l(G,C)}}});return m};m.set=function(B,C){w[B]=C;return m};return m})();Cufon.registerEngine("canvas",(function(){var b=document.createElement("canvas");if(!b||!b.getContext||!b.getContext.apply){return}b=null;var a=Cufon.CSS.supports("display","inline-block");var e=!a&&(document.compatMode=="BackCompat"||/frameset|transitional/i.test(document.doctype.publicId));var f=document.createElement("style");f.type="text/css";f.appendChild(document.createTextNode(("cufon{text-indent:0;}@media screen,projection{cufon{display:inline;display:inline-block;position:relative;vertical-align:middle;"+(e?"":"font-size:1px;line-height:1px;")+"}cufon cufontext{display:-moz-inline-box;display:inline-block;width:0;height:0;overflow:hidden;text-indent:-10000in;}"+(a?"cufon canvas{position:relative;}":"cufon canvas{position:absolute;}")+"}@media print{cufon{padding:0;}cufon canvas{display:none;}}").replace(/;/g,"!important;")));document.getElementsByTagName("head")[0].appendChild(f);function d(p,h){var n=0,m=0;var g=[],o=/([mrvxe])([^a-z]*)/g,k;generate:for(var j=0;k=o.exec(p);++j){var l=k[2].split(",");switch(k[1]){case"v":g[j]={m:"bezierCurveTo",a:[n+~~l[0],m+~~l[1],n+~~l[2],m+~~l[3],n+=~~l[4],m+=~~l[5]]};break;case"r":g[j]={m:"lineTo",a:[n+=~~l[0],m+=~~l[1]]};break;case"m":g[j]={m:"moveTo",a:[n=~~l[0],m=~~l[1]]};break;case"x":g[j]={m:"closePath"};break;case"e":break generate}h[g[j].m].apply(h,g[j].a)}return g}function c(m,k){for(var j=0,h=m.length;j<h;++j){var g=m[j];k[g.m].apply(k,g.a)}}return function(V,w,P,t,C,W){var k=(w===null);if(k){w=C.getAttribute("alt")}var A=V.viewBox;var m=P.getSize("fontSize",V.baseSize);var B=0,O=0,N=0,u=0;var z=t.textShadow,L=[];if(z){for(var U=z.length;U--;){var F=z[U];var K=m.convertFrom(parseFloat(F.offX));var I=m.convertFrom(parseFloat(F.offY));L[U]=[K,I];if(I<B){B=I}if(K>O){O=K}if(I>N){N=I}if(K<u){u=K}}}var Z=Cufon.CSS.textTransform(w,P).split("");var E=V.spacing(Z,~~m.convertFrom(parseFloat(P.get("letterSpacing"))||0),~~m.convertFrom(parseFloat(P.get("wordSpacing"))||0));if(!E.length){return null}var h=E.total;O+=A.width-E[E.length-1];u+=A.minX;var s,n;if(k){s=C;n=C.firstChild}else{s=document.createElement("cufon");s.className="cufon cufon-canvas";s.setAttribute("alt",w);n=document.createElement("canvas");s.appendChild(n);if(t.printable){var S=document.createElement("cufontext");S.appendChild(document.createTextNode(w));s.appendChild(S)}}var aa=s.style;var H=n.style;var j=m.convert(A.height);var Y=Math.ceil(j);var M=Y/j;var G=M*Cufon.CSS.fontStretch(P.get("fontStretch"));var J=h*G;var Q=Math.ceil(m.convert(J+O-u));var o=Math.ceil(m.convert(A.height-B+N));n.width=Q;n.height=o;H.width=Q+"px";H.height=o+"px";B+=A.minY;H.top=Math.round(m.convert(B-V.ascent))+"px";H.left=Math.round(m.convert(u))+"px";var r=Math.max(Math.ceil(m.convert(J)),0)+"px";if(a){aa.width=r;aa.height=m.convert(V.height)+"px"}else{aa.paddingLeft=r;aa.paddingBottom=(m.convert(V.height)-1)+"px"}var X=n.getContext("2d"),D=j/A.height;X.scale(D,D*M);X.translate(-u,-B);X.save();function T(){var x=V.glyphs,ab,l=-1,g=-1,y;X.scale(G,1);while(y=Z[++l]){var ab=x[Z[l]]||V.missingGlyph;if(!ab){continue}if(ab.d){X.beginPath();if(ab.code){c(ab.code,X)}else{ab.code=d("m"+ab.d,X)}X.fill()}X.translate(E[++g],0)}X.restore()}if(z){for(var U=z.length;U--;){var F=z[U];X.save();X.fillStyle=F.color;X.translate.apply(X,L[U]);T()}}var q=t.textGradient;if(q){var v=q.stops,p=X.createLinearGradient(0,A.minY,0,A.maxY);for(var U=0,R=v.length;U<R;++U){p.addColorStop.apply(p,v[U])}X.fillStyle=p}else{X.fillStyle=P.get("color")}T();return s}})());Cufon.registerEngine("vml",(function(){var e=document.namespaces;if(!e){return}e.add("cvml","urn:schemas-microsoft-com:vml");e=null;var b=document.createElement("cvml:shape");b.style.behavior="url(#default#VML)";if(!b.coordsize){return}b=null;var h=(document.documentMode||0)<8;document.write(('<style type="text/css">cufoncanvas{text-indent:0;}@media screen{cvml\\:shape,cvml\\:rect,cvml\\:fill,cvml\\:shadow{behavior:url(#default#VML);display:block;antialias:true;position:absolute;}cufoncanvas{position:absolute;text-align:left;}cufon{display:inline-block;position:relative;vertical-align:'+(h?"middle":"text-bottom")+";}cufon cufontext{position:absolute;left:-10000in;font-size:1px;}a cufon{cursor:pointer}}@media print{cufon cufoncanvas{display:none;}}</style>").replace(/;/g,"!important;"));function c(i,j){return a(i,/(?:em|ex|%)$|^[a-z-]+$/i.test(j)?"1em":j)}function a(l,m){if(m==="0"){return 0}if(/px$/i.test(m)){return parseFloat(m)}var k=l.style.left,j=l.runtimeStyle.left;l.runtimeStyle.left=l.currentStyle.left;l.style.left=m.replace("%","em");var i=l.style.pixelLeft;l.style.left=k;l.runtimeStyle.left=j;return i}function f(l,k,j,n){var i="computed"+n,m=k[i];if(isNaN(m)){m=k.get(n);k[i]=m=(m=="normal")?0:~~j.convertFrom(a(l,m))}return m}var g={};function d(p){var q=p.id;if(!g[q]){var n=p.stops,o=document.createElement("cvml:fill"),i=[];o.type="gradient";o.angle=180;o.focus="0";o.method="sigma";o.color=n[0][1];for(var m=1,l=n.length-1;m<l;++m){i.push(n[m][0]*100+"% "+n[m][1])}o.colors=i.join(",");o.color2=n[l][1];g[q]=o}return g[q]}return function(ac,G,Y,C,K,ad,W){var n=(G===null);if(n){G=K.alt}var I=ac.viewBox;var p=Y.computedFontSize||(Y.computedFontSize=new Cufon.CSS.Size(c(ad,Y.get("fontSize"))+"px",ac.baseSize));var y,q;if(n){y=K;q=K.firstChild}else{y=document.createElement("cufon");y.className="cufon cufon-vml";y.alt=G;q=document.createElement("cufoncanvas");y.appendChild(q);if(C.printable){var Z=document.createElement("cufontext");Z.appendChild(document.createTextNode(G));y.appendChild(Z)}if(!W){y.appendChild(document.createElement("cvml:shape"))}}var ai=y.style;var R=q.style;var l=p.convert(I.height),af=Math.ceil(l);var V=af/l;var P=V*Cufon.CSS.fontStretch(Y.get("fontStretch"));var U=I.minX,T=I.minY;R.height=af;R.top=Math.round(p.convert(T-ac.ascent));R.left=Math.round(p.convert(U));ai.height=p.convert(ac.height)+"px";var F=Y.get("color");var ag=Cufon.CSS.textTransform(G,Y).split("");var L=ac.spacing(ag,f(ad,Y,p,"letterSpacing"),f(ad,Y,p,"wordSpacing"));if(!L.length){return null}var k=L.total;var x=-U+k+(I.width-L[L.length-1]);var ah=p.convert(x*P),X=Math.round(ah);var O=x+","+I.height,m;var J="r"+O+"ns";var u=C.textGradient&&d(C.textGradient);var o=ac.glyphs,S=0;var H=C.textShadow;var ab=-1,aa=0,w;while(w=ag[++ab]){var D=o[ag[ab]]||ac.missingGlyph,v;if(!D){continue}if(n){v=q.childNodes[aa];while(v.firstChild){v.removeChild(v.firstChild)}}else{v=document.createElement("cvml:shape");q.appendChild(v)}v.stroked="f";v.coordsize=O;v.coordorigin=m=(U-S)+","+T;v.path=(D.d?"m"+D.d+"xe":"")+"m"+m+J;v.fillcolor=F;if(u){v.appendChild(u.cloneNode(false))}var ae=v.style;ae.width=X;ae.height=af;if(H){var s=H[0],r=H[1];var B=Cufon.CSS.color(s.color),z;var N=document.createElement("cvml:shadow");N.on="t";N.color=B.color;N.offset=s.offX+","+s.offY;if(r){z=Cufon.CSS.color(r.color);N.type="double";N.color2=z.color;N.offset2=r.offX+","+r.offY}N.opacity=B.opacity||(z&&z.opacity)||1;v.appendChild(N)}S+=L[aa++]}var M=v.nextSibling,t,A;if(C.forceHitArea){if(!M){M=document.createElement("cvml:rect");M.stroked="f";M.className="cufon-vml-cover";t=document.createElement("cvml:fill");t.opacity=0;M.appendChild(t);q.appendChild(M)}A=M.style;A.width=X;A.height=af}else{if(M){q.removeChild(M)}}ai.width=Math.max(Math.ceil(p.convert(k*P)),0);if(h){var Q=Y.computedYAdjust;if(Q===undefined){var E=Y.get("lineHeight");if(E=="normal"){E="1em"}else{if(!isNaN(E)){E+="em"}}Y.computedYAdjust=Q=0.5*(a(ad,E)-parseFloat(ai.height))}if(Q){ai.marginTop=Math.ceil(Q)+"px";ai.marginBottom=Q+"px"}}return y}})());

/*!
 * The following copyright notice may not be removed under any circumstances.
 * 
 * Copyright:
 * Copyright (C) 2000, 2007 Hoefler & Frere-Jones. http://www.typography.com
 * 
 * Trademark:
 * Gotham is a trademark of Hoefler & Frere-Jones, which may be registered in
 * certain jurisdictions.
 * 
 * Full name:
 * Gotham-Book
 * 
 * Manufacturer:
 * Hoefler & Frere-Jones
 * 
 * Designer:
 * Tobias Frere-Jones
 * 
 * Vendor URL:
 * www.typography.com
 * 
 * License information:
 * http://www.typography.com/support/eula.html
 */
Cufon.registerFont({"w":239,"face":{"font-family":"Gotham Book","font-weight":325,"font-stretch":"normal","units-per-em":"360","panose-1":"2 0 6 4 4 0 0 2 0 4","ascent":"288","descent":"-72","x-height":"4","bbox":"-8 -287 383 59.1584","underline-thickness":"7.2","underline-position":"-40.68","stemh":"25","stemv":"28","unicode-range":"U+0020-U+2122"},"glyphs":{" ":{"w":108},"A":{"d":"14,0r115,-254r27,0r114,254r-30,0r-30,-67r-137,0r-30,67r-29,0xm84,-92r115,0r-57,-129","w":284},"B":{"d":"36,-252v81,2,188,-17,189,63v0,33,-20,50,-40,59v30,9,54,26,54,61v0,43,-36,69,-91,69r-112,0r0,-252xm64,-140v56,-1,132,11,132,-45v0,-50,-79,-41,-132,-41r0,86xm64,-26v59,-1,146,11,146,-45v0,-52,-89,-43,-146,-43r0,88","w":259,"k":{"?":2,"&":-1,"v":4,"X":7,"V":7,"T":6,"W":5,"Y":11,"w":4,"y":4}},"C":{"d":"151,4v-73,0,-127,-57,-127,-130v0,-71,54,-130,128,-130v46,0,73,16,98,40r-19,21v-21,-20,-45,-35,-79,-35v-56,0,-98,45,-98,104v0,97,122,138,179,68r19,18v-26,27,-55,44,-101,44","w":265,"k":{"X":4,"v":4,"x":4,"Y":4,"w":4,"y":4,"d":4,"g":4,"q":4,"c":4,"e":4,"o":4,"C":7,"G":7,"O":7,"Q":7,"-":4,"\u2013":4,"\u2014":4}},"D":{"d":"36,0r0,-252r87,0v79,0,134,54,134,126v0,71,-55,126,-134,126r-87,0xm64,-26v93,10,164,-21,164,-100v0,-56,-41,-100,-105,-100r-59,0r0,200","w":281,"k":{"V":16,"X":20,"\\":14,"?":7,"x":4,"J":14,"}":7,"]":7,")":11,"\/":14,"T":18,"W":13,"Y":23,"A":17,"Z":16,".":14,",":14,"\u2026":14,"S":4}},"E":{"d":"36,0r0,-252r182,0r0,26r-154,0r0,86r138,0r0,26r-138,0r0,88r156,0r0,26r-184,0","w":241,"k":{"v":4,"w":4,"y":4,"d":4,"g":4,"q":4,"c":4,"e":4,"o":4}},"F":{"d":"36,0r0,-252r181,0r0,26r-153,0r0,90r137,0r0,26r-137,0r0,110r-28,0","w":236,"k":{"\/":25,"?":-4,"&":9,"v":5,"J":40,"w":4,"y":5,"A":29,"Z":4,".":36,",":36,"\u2026":36,"\u201d":-7,"\u2019":-7,"a":9,"d":4,"g":4,"q":4,"c":5,"e":5,"o":5,"C":5,"G":5,"O":5,"Q":5,"s":4,"z":5}},"G":{"d":"153,4v-79,0,-129,-57,-129,-130v0,-69,51,-130,127,-130v42,0,69,12,94,33r-19,22v-19,-17,-40,-29,-76,-29v-56,0,-96,47,-96,104v0,60,39,105,100,105v29,0,55,-11,72,-25r0,-63r-76,0r0,-26r104,0r0,101v-23,21,-59,38,-101,38","w":282,"k":{"V":8,"X":4,"\\":5,"?":4,"v":2,"T":6,"W":6,"Y":11,"y":2,"a":-4}},"H":{"d":"36,0r0,-252r28,0r0,112r146,0r0,-112r28,0r0,252r-28,0r0,-113r-146,0r0,113r-28,0","w":273},"I":{"d":"38,0r0,-252r29,0r0,252r-29,0","w":104},"J":{"d":"167,-84v11,99,-124,112,-156,43r21,-18v25,51,107,51,107,-24r0,-169r28,0r0,168","w":199,"k":{"J":7,"A":9,".":5,",":5,"\u2026":5}},"K":{"d":"36,0r0,-252r28,0r0,150r145,-150r37,0r-108,110r112,142r-35,0r-97,-122r-54,54r0,68r-28,0","w":258,"k":{"V":11,"v":22,"&":3,"T":4,"W":11,"Y":13,"w":18,"y":18,"A":2,"a":4,"d":9,"g":9,"q":9,"c":11,"e":11,"o":11,"C":18,"G":18,"O":18,"Q":18,"f":7,"t":9,"u":7,"S":4,"-":18,"\u2013":18,"\u2014":18,"U":5}},"L":{"d":"36,0r0,-252r28,0r0,226r142,0r0,26r-170,0","w":222,"k":{"V":41,"*":29,"\\":43,"?":22,"v":22,"&":3,"T":36,"W":36,"Y":47,"w":18,"y":22,"\u201d":14,"\u2019":14,"d":2,"g":2,"q":2,"c":4,"e":4,"o":4,"C":14,"G":14,"O":14,"Q":14,"f":7,"t":7,"-":14,"\u2013":14,"\u2014":14,"U":7,"\u201c":14,"\u2018":14,"\u2122":32}},"M":{"d":"36,0r0,-252r28,0r92,138r92,-138r29,0r0,252r-29,0r0,-204r-91,135r-2,0r-92,-135r0,204r-27,0","w":312},"N":{"d":"36,0r0,-252r26,0r159,202r0,-202r28,0r0,252r-23,0r-163,-207r0,207r-27,0","w":284},"O":{"d":"153,4v-77,0,-129,-60,-129,-130v0,-69,52,-130,129,-130v77,0,129,60,129,130v0,69,-52,130,-129,130xm153,-22v58,0,99,-46,99,-104v0,-57,-41,-104,-99,-104v-58,0,-99,46,-99,104v0,57,41,104,99,104","w":306,"k":{"V":15,"X":18,"\\":14,"?":7,"x":2,"J":11,"}":7,"]":7,")":11,"\/":14,"T":17,"W":13,"Y":22,"A":15,"Z":14,".":14,",":14,"\u2026":14,"S":2}},"P":{"d":"36,0r0,-252r94,0v57,0,94,30,94,81v-1,76,-77,88,-160,82r0,89r-28,0xm64,-115v62,3,131,1,131,-56v0,-59,-69,-57,-131,-55r0,111","w":240,"k":{"\/":22,"&":5,"v":-4,"X":11,"V":4,"J":36,"W":2,"Y":4,"w":-4,"y":-4,"A":25,"Z":5,".":36,",":36,"\u2026":36,"\u201d":-7,"\u2019":-7,"a":4,"c":2,"e":2,"o":2,"f":-5,"t":-5,"u":-2}},"Q":{"d":"265,8r-33,-31v-21,17,-48,27,-79,27v-77,0,-129,-60,-129,-130v0,-69,52,-130,129,-130v114,0,167,136,98,215r34,27xm54,-127v0,82,93,135,157,86r-46,-40r19,-21r46,42v51,-62,8,-170,-77,-170v-58,0,-99,46,-99,103","w":306,"k":{")":4,"?":7,"V":15,"T":17,"W":13,"Y":23}},"R":{"d":"36,-252v90,0,200,-15,199,76v0,42,-28,66,-68,73r77,103r-35,0r-73,-98r-72,0r0,98r-28,0r0,-252xm64,-123v63,1,142,8,142,-53v0,-58,-81,-51,-142,-50r0,103","w":260,"k":{"V":7,"J":2,"T":3,"W":5,"Y":9,"d":2,"g":2,"q":2,"c":4,"e":4,"o":4,"f":-4,"t":-4}},"S":{"d":"208,-68v-2,89,-141,89,-189,31r18,-21v26,24,51,36,86,36v34,0,56,-18,56,-44v0,-23,-12,-35,-65,-47v-58,-13,-85,-32,-85,-74v0,-78,126,-88,172,-38r-17,22v-34,-36,-126,-39,-126,14v0,24,13,37,68,49v56,12,82,33,82,72","w":230,"k":{"V":11,"X":9,"\\":7,"?":4,"v":5,"x":5,"T":5,"W":9,"Y":11,"w":4,"y":5,"A":5,"Z":4,"z":2,"f":2,"t":2,"S":4}},"T":{"d":"102,0r0,-226r-84,0r0,-26r198,0r0,26r-85,0r0,226r-29,0","w":233,"k":{"v":31,"x":31,"J":40,"\/":32,"&":23,"j":12,"w":30,"y":31,"A":32,"Z":6,".":36,",":36,"\u2026":36,"a":46,"d":42,"g":42,"q":42,"c":46,"e":46,"o":46,"C":17,"G":17,"O":17,"Q":17,"s":39,"z":37,"f":16,"t":15,"u":31,"S":5,":":14,";":14,"-":32,"\u2013":32,"\u2014":32,"b":6,"h":6,"k":6,"l":6,"m":32,"n":32,"p":32,"r":32,"i":12}},"U":{"d":"136,4v-62,0,-104,-38,-104,-109r0,-147r28,0r0,145v0,54,29,85,77,85v46,0,76,-28,76,-83r0,-147r29,0r0,144v0,73,-43,112,-106,112","w":273,"k":{"X":4,"x":2,"J":7,"\/":5,"A":9,".":5,",":5,"\u2026":5}},"V":{"d":"122,2r-108,-254r32,0r89,217r90,-217r31,0r-108,254r-26,0","w":270,"k":{"\/":43,"&":18,"x":18,"v":14,"j":7,"X":7,"V":4,"J":43,"W":4,"Y":7,"w":13,"y":14,"A":36,"Z":4,".":43,",":43,"\u2026":43,"a":25,"d":23,"g":23,"q":23,"c":25,"e":25,"o":25,"C":15,"G":15,"O":15,"Q":15,"s":22,"z":20,"f":9,"t":7,"u":14,"S":9,":":7,";":7,"-":14,"\u2013":14,"\u2014":14,"b":4,"h":4,"k":4,"l":4,"m":14,"n":14,"p":14,"r":14,"i":7}},"W":{"d":"106,2r-90,-254r31,0r72,210r69,-211r24,0r69,211r72,-210r30,0r-90,254r-24,0r-70,-205r-69,205r-24,0","w":398,"k":{"V":4,"X":5,"v":13,"x":14,"J":38,"\/":36,"&":15,"j":5,"W":4,"Y":7,"w":13,"y":13,"A":32,"Z":4,".":36,",":36,"\u2026":36,"a":25,"d":22,"g":22,"q":22,"c":23,"e":23,"o":23,"C":13,"G":13,"O":13,"Q":13,"s":22,"z":20,"f":11,"t":9,"u":13,"S":7,":":5,";":5,"-":13,"\u2013":13,"\u2014":13,"b":4,"h":4,"k":4,"l":4,"m":13,"n":13,"p":13,"r":13,"i":5}},"X":{"d":"17,0r96,-129r-93,-123r34,0r77,103r77,-103r33,0r-93,123r96,129r-33,0r-81,-108r-81,108r-32,0","w":261,"k":{"?":5,"&":4,"v":18,"j":4,"V":7,"J":4,"W":5,"Y":8,"w":14,"y":14,"A":2,"a":4,"d":14,"g":14,"q":14,"c":16,"e":16,"o":16,"C":18,"G":18,"O":18,"Q":18,"f":7,"t":7,"u":7,"S":11,"-":18,"\u2013":18,"\u2014":18,"b":4,"h":4,"k":4,"l":4,"i":4,"U":4}},"Y":{"d":"114,0r0,-100r-104,-152r34,0r85,126r86,-126r33,0r-105,152r0,100r-29,0","w":257,"k":{"V":7,"X":8,"v":22,"x":25,"J":47,"\/":40,"&":24,"j":7,"W":7,"Y":2,"w":20,"y":22,"A":40,"Z":4,".":47,",":47,"\u2026":47,"a":36,"d":38,"g":38,"q":38,"c":40,"e":40,"o":40,"C":22,"G":22,"O":22,"Q":22,"s":36,"z":29,"f":14,"t":11,"u":27,"S":13,":":14,";":14,"-":29,"\u2013":29,"\u2014":29,"b":4,"h":4,"k":4,"l":4,"m":27,"n":27,"p":27,"r":27,"i":7}},"Z":{"d":"24,0r0,-19r163,-207r-157,0r0,-26r196,0r0,19r-163,207r163,0r0,26r-202,0","w":249,"k":{"v":7,"&":4,"w":5,"y":5,"Z":4,"d":7,"g":7,"q":7,"c":9,"e":9,"o":9,"C":14,"G":14,"O":14,"Q":14,"f":4,"S":4,"-":11,"\u2013":11,"\u2014":11}},"a":{"d":"33,-173v56,-30,148,-19,148,59r0,114r-28,0r0,-28v-24,45,-136,45,-136,-27v0,-61,84,-71,136,-53v8,-62,-71,-66,-111,-42xm45,-55v8,60,113,40,109,-13r0,-18v-32,-13,-115,-13,-109,31","w":208,"k":{"*":5,"\\":27,"?":13,"v":7,"w":7,"y":7,"t":2}},"b":{"d":"219,-94v0,101,-121,127,-160,58r0,36r-28,0r0,-263r28,0r0,114v38,-69,160,-46,160,55xm125,-21v36,0,65,-27,65,-72v0,-44,-30,-72,-65,-72v-35,0,-67,29,-67,72v0,43,32,72,67,72","k":{"*":5,"\\":25,"?":13,"v":9,"x":11,"}":5,"]":7,")":11,"w":7,"y":9,".":4,",":4,"\u2026":4,"z":5,"\u201c":4,"\u2018":4}},"c":{"d":"115,4v-54,0,-96,-44,-96,-97v0,-53,42,-97,96,-97v35,0,57,15,74,33r-18,19v-36,-49,-123,-27,-123,45v0,69,88,95,125,45r18,16v-19,21,-41,36,-76,36","w":205,"k":{"\\":14,"?":5,"v":2,"x":4,")":5,"w":2,"y":2,"\u201d":-5,"\u2019":-5,"d":4,"g":4,"q":4,"c":5,"e":5,"o":5,"\u201c":-4,"\u2018":-4}},"d":{"d":"180,-37v-39,69,-160,45,-160,-56v0,-100,121,-126,160,-57r0,-113r28,0r0,263r-28,0r0,-37xm114,-21v35,0,67,-29,67,-73v0,-43,-32,-71,-67,-71v-36,0,-65,26,-65,72v0,44,30,72,65,72"},"e":{"d":"48,-82v4,67,89,79,124,36r17,15v-49,64,-170,35,-170,-62v0,-54,39,-97,90,-97v58,1,89,47,86,108r-147,0xm48,-104r119,0v-3,-34,-22,-63,-59,-63v-32,0,-56,27,-60,63","w":213,"k":{"*":7,"\\":29,"?":14,"v":9,"x":11,"}":4,"]":7,")":11,"w":9,"y":9,".":4,",":4,"\u2026":4,"z":5}},"f":{"d":"41,-186v-8,-60,32,-90,87,-74r0,25v-37,-15,-66,2,-59,50r59,0r0,23r-59,0r0,162r-28,0r0,-162r-25,0r0,-24r25,0","w":132,"k":{"*":-11,"\\":-11,"?":-13,"}":-11,"]":-7,")":-11,"\/":16,".":16,",":16,"\u2026":16,"\u201d":-13,"\u2019":-13,"a":5,"d":4,"g":4,"q":4,"c":4,"e":4,"o":4,"z":4,"\u201c":-11,"\u2018":-11,"\u2122":-18}},"g":{"d":"208,-32v5,96,-116,111,-179,64r12,-21v53,43,157,30,140,-65v-37,66,-161,45,-161,-48v0,-91,122,-114,160,-51r0,-33r28,0r0,154xm113,-39v35,0,68,-26,68,-64v0,-38,-33,-63,-68,-63v-35,0,-64,25,-64,64v0,37,29,63,64,63","k":{"\\":18}},"h":{"d":"31,0r0,-263r28,0r0,109v12,-20,31,-36,63,-36v45,0,72,30,72,74r0,116r-28,0v-4,-67,21,-165,-52,-165v-32,0,-55,23,-55,58r0,107r-28,0","w":221,"k":{"*":5,"\\":27,"?":11,"v":7,"w":5,"y":5}},"i":{"d":"32,-227r0,-30r31,0r0,30r-31,0xm33,0r0,-186r28,0r0,186r-28,0","w":94},"j":{"d":"32,-227r0,-30r31,0r0,30r-31,0xm61,11v1,40,-26,54,-62,46r0,-23v20,4,34,-1,34,-24r0,-196r28,0r0,197","w":94},"k":{"d":"31,0r0,-263r28,0r0,182r100,-105r35,0r-78,80r80,106r-33,0r-67,-87r-37,38r0,49r-28,0","w":204,"k":{"\\":14,"v":7,"w":7,"y":5,"a":4,"d":9,"g":9,"q":9,"c":9,"e":9,"o":9,"t":4,"u":4,"-":7,"\u2013":7,"\u2014":7}},"l":{"d":"33,0r0,-263r28,0r0,263r-28,0","w":94},"m":{"d":"31,0r0,-186r28,0r0,31v12,-18,29,-35,60,-35v30,0,50,16,60,37v13,-21,33,-37,65,-37v43,0,69,29,69,75r0,115r-28,0v-4,-65,20,-167,-48,-165v-28,0,-51,21,-51,58r0,107r-28,0v-4,-64,20,-165,-47,-165v-68,0,-50,97,-52,165r-28,0","w":342,"k":{"*":5,"\\":27,"?":11,"v":7,"w":5,"y":5}},"n":{"d":"31,0r0,-186r28,0r0,32v12,-20,31,-36,63,-36v45,0,72,30,72,74r0,116r-28,0v-4,-67,21,-165,-52,-165v-32,0,-55,23,-55,58r0,107r-28,0","w":221,"k":{"*":5,"\\":27,"?":11,"v":7,"w":5,"y":5}},"o":{"d":"116,4v-56,0,-97,-43,-97,-97v0,-53,42,-97,98,-97v56,0,96,43,96,97v0,53,-41,97,-97,97xm117,-21v40,0,68,-32,68,-72v0,-40,-30,-73,-69,-73v-40,0,-68,33,-68,73v0,40,30,72,69,72","w":232,"k":{"*":7,"\\":29,"?":18,"v":11,"x":13,"}":5,"]":7,")":11,"w":9,"y":11,".":7,",":7,"\u2026":7,"z":7,"\u201c":7,"\u2018":7}},"p":{"d":"31,58r0,-244r28,0r0,37v38,-69,160,-46,160,56v0,100,-121,126,-160,57r0,94r-28,0xm125,-21v36,0,65,-27,65,-72v0,-44,-30,-72,-65,-72v-35,0,-67,29,-67,72v0,43,32,72,67,72","k":{"*":5,"\\":25,"?":13,"v":9,"x":11,"}":5,"]":7,")":11,"w":7,"y":9,".":4,",":4,"\u2026":4,"z":5,"\u201c":4,"\u2018":4}},"q":{"d":"180,58r0,-95v-39,69,-160,45,-160,-56v0,-100,121,-126,160,-57r0,-36r28,0r0,244r-28,0xm114,-21v35,0,67,-29,67,-73v0,-43,-32,-71,-67,-71v-36,0,-65,26,-65,72v0,44,30,72,65,72","k":{"\\":18}},"r":{"d":"31,0r0,-186r28,0r0,48v14,-31,41,-52,76,-51r0,30v-44,-1,-75,28,-76,85r0,74r-28,0","w":145,"k":{"*":-7,"\\":11,"\/":27,".":32,",":32,"\u2026":32,"\u201d":-13,"\u2019":-13,"a":9,"d":8,"g":8,"q":8,"c":8,"e":8,"o":8,"z":4,"\u201c":-7,"\u2018":-7}},"s":{"d":"51,-139v7,44,111,27,108,87v-4,70,-104,67,-144,28r15,-20v20,15,42,24,64,24v22,0,40,-11,38,-30v-5,-46,-108,-25,-108,-86v0,-60,90,-65,131,-33r-13,21v-26,-21,-87,-29,-91,9","w":179,"k":{"\\":27,"?":13,"v":7,"x":9,"}":4,"]":5,")":7,"w":5,"y":5,"s":4,"z":4,"t":4,"\u201c":4,"\u2018":4}},"t":{"d":"127,-5v-36,17,-86,9,-86,-44r0,-113r-26,0r0,-24r26,0r0,-56r27,0r0,56r59,0r0,24r-59,0r0,109v-1,34,34,36,59,25r0,23","w":145,"k":{"\\":14,"\u201d":-4,"\u2019":-4,"d":5,"g":5,"q":5,"c":5,"e":5,"o":5}},"u":{"d":"99,4v-45,0,-71,-31,-71,-75r0,-115r28,0v4,67,-21,167,51,165v32,0,56,-24,56,-59r0,-106r27,0r0,186r-27,0r0,-32v-13,20,-32,36,-64,36","w":221,"k":{"\\":18}},"v":{"d":"93,1r-80,-187r30,0r63,154r63,-154r30,0r-81,187r-25,0","w":211,"k":{"}":4,"]":7,"\\":18,"\/":25,"?":4,"x":4,"v":5,"w":5,"y":5,".":31,",":31,"\u2026":31,"a":9,"d":9,"g":9,"q":9,"c":11,"e":11,"o":11,"s":7,"z":2,"-":5,"\u2013":5,"\u2014":5}},"w":{"d":"80,1r-65,-187r30,0r49,149r50,-150r23,0r50,150r49,-149r29,0r-66,187r-24,0r-50,-146r-50,146r-25,0","w":309,"k":{"\\":18,"?":4,"v":5,"x":4,"}":4,"]":7,"\/":22,"w":4,"y":4,".":25,",":25,"\u2026":25,"a":7,"d":7,"g":7,"q":7,"c":9,"e":9,"o":9,"s":5,"z":2,"-":4,"\u2013":4,"\u2014":4}},"x":{"d":"14,0r73,-95r-70,-91r32,0r55,72r55,-72r31,0r-71,91r74,95r-32,0r-58,-76r-58,76r-31,0","w":206,"k":{"}":4,"]":4,"\\":18,"?":5,"v":4,"w":4,"y":4,"a":5,"d":11,"g":11,"q":11,"c":13,"e":13,"o":13,"s":7,"-":11,"\u2013":11,"\u2014":11}},"y":{"d":"122,6v-21,55,-55,63,-102,43r10,-22v30,13,54,10,67,-28r-85,-185r31,0r68,155r59,-155r30,0","w":212,"k":{"\\":18,"?":4,"v":5,"x":4,"}":4,"]":7,"\/":25,"w":4,"y":4,".":31,",":31,"\u2026":31,"a":9,"d":9,"g":9,"q":9,"c":11,"e":11,"o":11,"s":7,"z":2,"-":5,"\u2013":5,"\u2014":5}},"z":{"d":"20,0r0,-18r124,-145r-120,0r0,-23r157,0r0,18r-123,145r123,0r0,23r-161,0","w":200,"k":{"\\":16,"d":5,"g":5,"q":5,"c":5,"e":5,"o":5}},"0":{"d":"129,4v-65,0,-107,-58,-107,-130v0,-71,42,-130,107,-130v65,0,106,58,106,130v0,71,-41,130,-106,130xm129,-22v47,0,77,-48,77,-104v0,-55,-30,-104,-77,-104v-47,0,-77,48,-77,104v0,55,30,104,77,104","w":257,"k":{"\/":13,"7":10,"3":4,"2":4,"1":2,".":7,",":7,"\u2026":7}},"1":{"d":"64,0r0,-224r-47,14r-7,-23v28,-7,47,-23,83,-21r0,254r-29,0","w":128},"2":{"d":"17,0r0,-22v41,-42,144,-102,144,-160v0,-30,-23,-48,-50,-48v-29,0,-48,15,-68,43r-21,-15v23,-34,47,-54,91,-54v45,0,78,31,78,72v0,60,-91,116,-131,158r133,0r0,26r-176,0","w":215,"k":{"7":4,"4":9}},"3":{"d":"112,4v-42,0,-73,-18,-94,-45r21,-18v27,47,125,54,128,-12v1,-36,-39,-52,-86,-49r-6,-17r79,-89r-123,0r0,-26r161,0r0,21r-79,88v44,4,83,25,83,71v0,45,-37,76,-84,76","w":220,"k":{"\/":4,"9":2,"7":9,"5":2}},"4":{"d":"156,0r0,-60r-133,0r-8,-20r143,-174r25,0r0,170r39,0r0,24r-39,0r0,60r-27,0xm50,-84r106,0r0,-129","w":241,"k":{"\/":7,"9":4,"7":13,"1":7}},"5":{"d":"109,4v-36,0,-67,-17,-90,-40r19,-20v36,47,129,47,132,-22v3,-53,-77,-66,-115,-39r-19,-12r7,-123r145,0r0,26r-120,0r-6,81v56,-27,137,-1,137,67v0,49,-37,82,-90,82","w":220,"k":{"\/":7,"9":2,"7":11,"3":2,"2":4}},"6":{"d":"120,4v-70,0,-97,-42,-98,-124v0,-77,39,-136,105,-136v30,0,52,10,74,28r-16,22v-62,-55,-139,-10,-134,87v14,-20,35,-39,72,-39v47,0,87,31,87,78v0,49,-39,84,-90,84xm120,-21v37,0,61,-25,61,-58v0,-31,-25,-54,-61,-54v-38,0,-63,27,-63,56v0,32,26,56,63,56","w":232,"k":{"\/":4,"9":4,"7":8,"3":4,"1":6}},"7":{"d":"49,0r114,-226r-139,0r0,-26r171,0r0,21r-114,231r-32,0","w":214,"k":{"\/":50,"9":5,"8":4,"6":7,"5":9,"4":31,"3":7,"2":5,"1":-4,"0":7,".":36,",":36,"\u2026":36,"-":11,"\u2013":11,"\u2014":11}},"8":{"d":"113,4v-54,0,-94,-30,-94,-72v0,-30,22,-51,52,-62v-23,-11,-44,-29,-44,-59v0,-39,40,-67,86,-67v46,0,87,28,86,68v0,29,-20,47,-43,58v30,11,52,31,52,62v0,43,-41,72,-95,72xm113,-140v32,0,58,-19,58,-47v0,-25,-25,-44,-58,-44v-33,0,-57,19,-57,45v0,27,25,46,57,46xm113,-21v41,0,66,-21,66,-48v0,-28,-29,-48,-66,-48v-37,0,-65,20,-65,49v0,26,24,47,65,47","w":226,"k":{"9":2,"7":4}},"9":{"d":"113,-256v70,0,98,42,98,124v0,80,-43,136,-105,136v-33,0,-57,-13,-78,-31r17,-22v62,59,141,15,137,-83v-14,22,-36,40,-71,40v-52,0,-88,-33,-88,-79v0,-48,36,-85,90,-85xm114,-116v39,0,62,-28,62,-58v0,-32,-26,-57,-64,-57v-38,0,-60,28,-60,60v0,32,25,55,62,55","w":232,"k":{"\/":9,"7":8,"5":2,"3":4,"2":4,".":4,",":4,"\u2026":4}},".":{"d":"28,0r0,-38r33,0r0,38r-33,0","w":88,"k":{"V":43,"v":31,"j":-5,"1":18,"7":7,"0":7,"T":36,"W":36,"Y":47,"w":25,"y":22,"\u201d":14,"\u2019":14,"d":4,"g":4,"q":4,"c":7,"e":7,"o":7,"C":14,"G":14,"O":14,"Q":14,"f":5,"t":9,"U":5}},",":{"d":"21,44r-4,-13v18,-6,25,-16,24,-31r-13,0r0,-38r33,0v2,44,-1,76,-40,82","w":88,"k":{"y":22,"V":43,"v":31,"j":-5,"1":18,"7":7,"0":7,"T":36,"W":36,"Y":47,"w":25,"\u201d":14,"\u2019":14,"d":4,"g":4,"q":4,"c":7,"e":7,"o":7,"C":14,"G":14,"O":14,"Q":14,"f":5,"t":9,"U":5}},":":{"d":"30,-148r0,-38r33,0r0,38r-33,0xm30,0r0,-38r33,0r0,38r-33,0","w":91,"k":{"V":7,"T":14,"W":5,"Y":14}},";":{"d":"30,-148r0,-38r33,0r0,38r-33,0xm23,44r-5,-13v18,-6,25,-16,24,-31r-12,0r0,-38r33,0v2,44,-1,76,-40,82","w":91,"k":{"V":7,"T":14,"W":5,"Y":14}},"\u2026":{"d":"201,0r0,-37r32,0r0,37r-32,0xm114,0r0,-37r32,0r0,37r-32,0xm28,0r0,-37r32,0r0,37r-32,0","w":260,"k":{"V":43,"v":31,"j":-5,"1":18,"7":7,"0":7,"T":36,"W":36,"Y":47,"w":25,"y":22,"\u201d":14,"\u2019":14,"d":4,"g":4,"q":4,"c":7,"e":7,"o":7,"C":14,"G":14,"O":14,"Q":14,"f":5,"t":9,"U":5}},"&":{"d":"217,5r-39,-41v-41,60,-163,52,-162,-32v0,-33,22,-57,61,-72v-44,-42,-28,-115,41,-116v35,0,62,26,62,57v0,32,-23,53,-60,66r58,58v11,-16,21,-35,30,-56r23,11v-11,24,-22,45,-36,63r44,45xm104,-149v32,-11,49,-26,49,-49v0,-20,-15,-35,-36,-35v-48,0,-49,53,-13,84xm45,-69v1,59,88,60,116,16r-68,-70v-33,12,-48,33,-48,54","w":250,"k":{"V":21,"T":28,"W":18,"Y":24,"S":3}},"!":{"d":"41,-71r-8,-181r32,0r-8,181r-16,0xm32,0r0,-38r34,0r0,38r-34,0","w":97},"?":{"d":"74,-130v45,-4,73,-20,73,-53v0,-26,-20,-47,-52,-47v-27,0,-48,13,-66,34r-18,-17v21,-25,45,-42,84,-42v49,0,81,30,81,72v0,45,-34,67,-75,73r-3,39r-19,0xm72,0r0,-38r33,0r0,38r-33,0","w":193},"\u201c":{"d":"98,-172v-2,-44,1,-76,40,-82r4,13v-18,6,-25,16,-24,31r13,0r0,38r-33,0xm26,-172v-2,-44,1,-76,40,-82r4,13v-18,6,-25,16,-24,31r13,0r0,38r-33,0","w":160,"k":{"J":29,"A":32,"a":4,"d":5,"g":5,"q":5,"c":5,"e":5,"o":5,"s":4,"z":4,"t":-5}},"\u201d":{"d":"95,-170r-5,-13v18,-6,25,-16,24,-31r-12,0r0,-38r32,0v2,43,0,76,-39,82xm23,-170r-5,-13v18,-6,25,-16,24,-31r-12,0r0,-38r33,0v2,44,-1,76,-40,82","w":160,"k":{"J":36,"A":36,"a":7,"d":13,"g":13,"q":13,"c":15,"e":15,"o":15,"s":9}},"\u2018":{"d":"26,-172v-2,-44,1,-76,40,-82r4,13v-18,6,-25,16,-24,31r13,0r0,38r-33,0","w":88,"k":{"J":29,"A":32,"a":4,"d":5,"g":5,"q":5,"c":5,"e":5,"o":5,"s":4,"z":4,"t":-5}},"\u2019":{"d":"23,-170r-5,-13v18,-6,25,-16,24,-31r-12,0r0,-38r33,0v2,44,-1,76,-40,82","w":88,"k":{"J":36,"A":36,"a":7,"d":13,"g":13,"q":13,"c":15,"e":15,"o":15,"s":9}},"-":{"d":"23,-94r0,-29r100,0r0,29r-100,0","w":146,"k":{"V":14,"X":18,"v":5,"x":11,"1":11,"7":14,"3":4,"T":32,"W":13,"Y":29,"w":4,"y":5,"A":14,"Z":11,"z":4}},"\u2013":{"d":"23,-94r0,-28r144,0r0,28r-144,0","w":190,"k":{"V":14,"X":18,"v":5,"x":11,"1":11,"7":14,"3":4,"T":32,"W":13,"Y":29,"w":4,"y":5,"A":14,"Z":11,"z":4}},"\u2014":{"d":"23,-94r0,-28r277,0r0,28r-277,0","w":323,"k":{"V":14,"X":18,"v":5,"x":11,"1":11,"7":14,"3":4,"T":32,"W":13,"Y":29,"w":4,"y":5,"A":14,"Z":11,"z":4}},"_":{"d":"-1,58r0,-23r218,0r0,23r-218,0","w":216},"\/":{"d":"-8,46r167,-333r26,0r-167,333r-26,0","w":182,"k":{"\/":60,"9":7,"8":5,"7":4,"6":13,"5":7,"4":34,"3":4,"2":7,"1":-4,"0":13,"x":18,"v":18,"J":47,"w":18,"y":18,"A":43,"Z":7,"a":23,"d":25,"g":25,"q":25,"c":29,"e":29,"o":29,"C":14,"G":14,"O":14,"Q":14,"s":31,"z":22,"f":9,"t":7,"u":18,"S":11,"m":18,"n":18,"p":18,"r":18}},"\\":{"d":"165,46r-167,-333r25,0r167,333r-25,0","w":182,"k":{"v":25,"j":-11,"V":43,"T":32,"W":36,"Y":40,"w":22,"y":22,"C":14,"G":14,"O":14,"Q":14,"f":4,"t":11,"U":5}},"|":{"d":"43,46r0,-333r23,0r0,333r-23,0","w":109},"(":{"d":"124,51v-132,-65,-132,-244,0,-308r12,18v-110,62,-111,210,0,271","w":156,"k":{"j":-11,"g":11,"J":5,"d":11,"q":11,"c":11,"e":11,"o":11,"C":11,"G":11,"O":11,"Q":11,"s":5}},")":{"d":"32,51r-12,-19v112,-62,111,-209,0,-271r12,-18v132,65,132,244,0,308","w":156},"[":{"d":"34,47r0,-299r103,0r0,22r-77,0r0,255r77,0r0,22r-103,0","w":158,"k":{"x":4,"v":7,"j":-11,"J":4,"w":7,"y":4,"a":4,"d":7,"g":7,"q":7,"c":7,"e":7,"o":7,"C":7,"G":7,"O":7,"Q":7,"s":5}},"]":{"d":"21,47r0,-22r77,0r0,-255r-77,0r0,-22r103,0r0,299r-103,0","w":158},"{":{"d":"150,51v-77,-17,-80,-38,-78,-100v1,-32,-15,-47,-52,-44r0,-21v49,5,52,-24,52,-71v0,-37,13,-60,78,-72r4,18v-62,16,-56,32,-56,85v0,30,-14,44,-37,51v33,8,37,35,37,77v0,32,6,45,56,58","w":173,"k":{"x":4,"v":4,"j":-13,"g":5,"J":4,"w":4,"y":4,"d":5,"q":5,"c":5,"e":5,"o":5,"C":7,"G":7,"O":7,"Q":7,"s":4,"z":4}},"}":{"d":"24,51r-5,-19v63,-16,57,-32,57,-85v0,-30,14,-43,37,-50v-33,-8,-37,-36,-37,-78v0,-32,-6,-45,-57,-58r5,-18v78,17,80,38,78,100v-1,31,15,45,51,43r0,21v-48,-4,-51,25,-51,71v0,37,-13,61,-78,73","w":173},"@":{"d":"180,58v-92,0,-161,-71,-161,-157v0,-86,70,-157,158,-157v88,0,157,67,157,142v0,61,-35,88,-68,88v-26,0,-43,-12,-50,-30v-30,48,-124,36,-124,-35v0,-77,101,-121,136,-60r5,-25r24,4v-5,33,-17,68,-17,103v0,18,11,29,30,29v26,0,51,-23,51,-74v0,-66,-62,-130,-144,-130v-83,0,-145,65,-145,145v0,80,62,145,148,145v36,0,61,-8,89,-24r6,9v-28,17,-58,27,-95,27xm162,-48v58,0,87,-108,15,-110v-30,0,-59,28,-59,65v0,28,18,45,44,45","w":352},"\u2122":{"d":"121,-141r0,-111r17,0r39,61r40,-61r16,0r0,111r-15,0r0,-85v-15,19,-25,43,-42,60r-39,-60r0,85r-16,0xm45,-141r0,-96r-36,0r0,-15r87,0r0,15r-35,0r0,96r-16,0","w":248},"*":{"d":"68,-143r4,-45r-37,26r-10,-17r42,-19r-42,-19r10,-17r37,26r-4,-45r19,0r-4,45r37,-26r10,17r-42,19r42,19r-10,17r-37,-26r4,45r-19,0","w":154,"k":{"J":29,"A":36,"a":4,"d":5,"g":5,"q":5,"c":7,"e":7,"o":7,"s":4,"t":-4}},"$":{"d":"105,35r0,-36v-32,-3,-60,-15,-85,-37r16,-21v22,19,43,31,70,34r0,-90v-53,-13,-76,-33,-76,-71v0,-37,31,-64,75,-66r0,-21r23,0r0,22v27,3,48,13,69,29r-16,21v-17,-15,-35,-23,-54,-26r0,89v55,13,78,34,78,70v0,39,-32,65,-77,68r0,35r-23,0xm106,-143r0,-85v-30,1,-49,18,-49,41v0,20,9,34,49,44xm127,-24v31,-1,50,-19,50,-43v0,-21,-10,-33,-50,-43r0,86","w":228,"k":{"7":4}},"#":{"d":"45,0r10,-64r-39,0r0,-25r44,0r13,-76r-43,0r0,-25r47,0r11,-62r25,0r-10,62r68,0r11,-62r25,0r-10,62r38,0r0,25r-43,0r-13,76r42,0r0,25r-46,0r-11,64r-25,0r10,-64r-68,0r-11,64r-25,0xm85,-89r69,0r13,-76r-69,0","w":252},"%":{"d":"76,-126v-34,0,-57,-30,-57,-64v0,-34,22,-65,57,-65v34,0,57,30,57,65v0,34,-23,64,-57,64xm45,0r185,-252r25,0r-184,252r-26,0xm224,3v-34,0,-57,-30,-57,-65v0,-34,24,-64,58,-64v34,0,56,30,56,64v0,34,-22,65,-57,65xm76,-146v19,0,33,-20,33,-44v0,-25,-15,-45,-33,-45v-20,0,-33,20,-33,45v0,25,14,44,33,44xm225,-17v20,0,32,-20,32,-45v0,-25,-14,-44,-33,-44v-19,0,-33,20,-33,44v0,25,15,45,34,45","w":300},"\"":{"d":"94,-154r11,-98v10,2,27,-3,33,2r-29,96r-15,0xm23,-154r11,-98v10,2,27,-3,34,2r-29,96r-16,0","w":158},"'":{"d":"23,-154r11,-98v10,2,27,-3,34,2r-29,96r-16,0","w":88},"+":{"d":"99,-40r0,-74r-75,0r0,-26r75,0r0,-74r27,0r0,74r75,0r0,26r-75,0r0,74r-27,0","w":225},"=":{"d":"29,-156r0,-26r167,0r0,26r-167,0xm29,-71r0,-27r167,0r0,27r-167,0","w":225},"\u00d7":{"d":"175,-46r-63,-63r-62,63r-18,-18r63,-62r-63,-63r18,-19r63,64r63,-64r18,18r-64,63r64,63","w":225},"<":{"d":"192,-31r-169,-84r0,-24r169,-83r0,27r-139,68r139,68r0,28","w":225},">":{"d":"33,-31r0,-28r139,-67r-139,-68r0,-28r169,83r0,24","w":225},"^":{"d":"23,-177r56,-76r22,0r56,76r-25,0r-42,-56r-43,56r-24,0","w":180},"~":{"d":"43,-85r-17,-5v9,-56,50,-34,83,-23v9,0,13,-5,18,-18r17,4v-8,55,-50,34,-82,24v-9,0,-14,5,-19,18","w":170},"`":{"d":"93,-214r-41,-39r29,-13r33,52r-21,0","w":180},"\u00a0":{"w":108}}});

/*!
 * The following copyright notice may not be removed under any circumstances.
 * 
 * Copyright:
 * Copyright (C) 2000, 2007 Hoefler & Frere-Jones. http://www.typography.com
 * 
 * Trademark:
 * Gotham is a trademark of Hoefler & Frere-Jones, which may be registered in
 * certain jurisdictions.
 * 
 * Full name:
 * Gotham-Light
 * 
 * Manufacturer:
 * Hoefler & Frere-Jones
 * 
 * Designer:
 * Tobias Frere-Jones
 * 
 * Vendor URL:
 * www.typography.com
 * 
 * License information:
 * http://www.typography.com/support/eula.html
 */
Cufon.registerFont({"w":237,"face":{"font-family":"Gotham Light","font-weight":300,"font-stretch":"normal","units-per-em":"360","panose-1":"0 0 0 0 0 0 0 0 0 0","ascent":"288","descent":"-72","x-height":"4","bbox":"-6 -287 379 58.9833","underline-thickness":"18","underline-position":"-18","stemh":"17","stemv":"19","unicode-range":"U+0020-U+2122"},"glyphs":{" ":{"w":108},"A":{"d":"16,0r117,-254r18,0r118,254r-21,0r-32,-71r-149,0r-32,71r-19,0xm75,-87r133,0r-66,-146","w":284},"B":{"d":"37,-252v80,2,185,-17,186,63v0,34,-22,51,-43,59v30,8,57,26,57,61v0,42,-36,69,-90,69r-110,0r0,-252xm56,-136v64,0,148,11,148,-52v0,-56,-88,-47,-148,-47r0,99xm56,-17v67,0,162,11,162,-52v0,-57,-98,-50,-162,-49r0,101","w":259,"k":{"?":2,"v":4,"X":7,"V":7,"T":7,"W":5,"Y":11,"w":4,"y":4}},"C":{"d":"152,4v-72,0,-126,-57,-126,-130v0,-71,53,-130,126,-130v45,0,72,16,98,40r-13,14v-22,-21,-47,-37,-85,-37v-60,0,-106,49,-106,113v0,106,130,150,193,74r13,12v-27,26,-55,44,-100,44","w":265,"k":{"v":4,"X":4,"x":4,"Y":4,"w":4,"y":4,"d":4,"g":4,"q":4,"c":4,"e":4,"o":4,"C":7,"G":7,"O":7,"Q":7,"-":4,"\u2013":4,"\u2014":4}},"D":{"d":"37,0r0,-252r84,0v79,0,134,54,134,126v0,71,-55,126,-134,126r-84,0xm56,-17r65,0v70,0,115,-48,115,-109v0,-60,-45,-109,-115,-109r-65,0r0,218","w":281,"k":{"V":16,"\\":14,"?":7,"X":20,"x":4,"J":14,"}":7,"]":7,")":11,"\/":14,"T":20,"W":13,"Y":23,"A":16,"Z":16,".":14,",":14,"\u2026":14,"S":4}},"E":{"d":"37,0r0,-252r180,0r0,17r-161,0r0,99r145,0r0,18r-145,0r0,101r163,0r0,17r-182,0","w":241,"k":{"v":4,"w":4,"y":4,"d":4,"g":4,"q":4,"c":4,"e":4,"o":4}},"F":{"d":"37,0r0,-252r178,0r0,17r-159,0r0,104r143,0r0,17r-143,0r0,114r-19,0","w":236,"k":{"\/":25,"?":-4,"&":11,"v":5,"J":40,"w":4,"y":5,"A":29,"Z":4,".":36,",":36,"\u2026":36,"\u201d":-7,"\u2019":-7,"a":9,"d":4,"g":4,"q":4,"c":5,"e":5,"o":5,"C":7,"G":7,"O":7,"Q":7,"s":4,"z":5}},"G":{"d":"153,4v-80,0,-127,-58,-127,-130v0,-68,50,-130,125,-130v41,0,67,12,92,33r-12,14v-20,-17,-43,-30,-81,-30v-61,0,-104,51,-104,113v0,65,41,114,108,114v32,0,62,-14,80,-29r0,-72r-84,0r0,-18r102,0r0,98v-23,20,-58,37,-99,37","w":282,"k":{"V":7,"\\":5,"?":4,"v":2,"X":4,"T":7,"W":5,"Y":11,"y":2,"a":-4}},"H":{"d":"37,0r0,-252r19,0r0,117r161,0r0,-117r19,0r0,252r-19,0r0,-118r-161,0r0,118r-19,0","w":273},"I":{"d":"40,0r0,-252r19,0r0,252r-19,0","w":98},"J":{"d":"164,-82v9,97,-122,111,-151,38r16,-9v25,58,116,55,116,-28r0,-171r19,0r0,170","w":197,"k":{"J":7,"A":9,".":5,",":5,"\u2026":5}},"K":{"d":"37,0r0,-252r19,0r0,166r161,-166r25,0r-110,111r115,141r-25,0r-103,-127r-63,63r0,64r-19,0","w":257,"k":{"V":11,"v":22,"&":4,"T":4,"W":11,"Y":14,"w":18,"y":18,"a":4,"d":9,"g":9,"q":9,"c":11,"e":11,"o":11,"C":18,"G":18,"O":18,"Q":18,"f":7,"t":9,"u":7,"S":4,"-":18,"\u2013":18,"\u2014":18,"U":5}},"L":{"d":"37,0r0,-252r19,0r0,235r148,0r0,17r-167,0","w":222,"k":{"V":41,"*":29,"\\":43,"?":22,"v":22,"&":4,"T":36,"W":36,"Y":47,"w":18,"y":22,"\u201d":14,"\u2019":14,"d":2,"g":2,"q":2,"c":4,"e":4,"o":4,"C":14,"G":14,"O":14,"Q":14,"f":7,"t":7,"-":14,"\u2013":14,"\u2014":14,"U":7,"\u201c":14,"\u2018":14,"\u2122":32}},"M":{"d":"37,0r0,-252r18,0r101,149r101,-149r18,0r0,252r-19,0r0,-219r-99,145r-2,0r-100,-145r0,219r-18,0","w":312},"N":{"d":"37,0r0,-252r18,0r174,219r0,-219r18,0r0,252r-14,0r-178,-224r0,224r-18,0","w":284},"O":{"d":"153,4v-76,0,-127,-60,-127,-130v0,-69,51,-130,127,-130v76,0,127,60,127,130v0,69,-51,130,-127,130xm153,-13v62,0,107,-50,107,-113v0,-62,-45,-113,-107,-113v-62,0,-107,50,-107,113v0,62,45,113,107,113","w":306,"k":{"V":14,"\\":14,"?":7,"X":18,"x":2,"J":11,"}":7,"]":7,")":11,"\/":14,"T":20,"W":13,"Y":22,"A":14,"Z":14,".":14,",":14,"\u2026":14,"S":2}},"P":{"d":"37,0r0,-252r92,0v55,0,93,28,93,78v-1,78,-82,85,-166,80r0,94r-19,0xm56,-111v70,4,148,0,148,-63v0,-65,-79,-63,-148,-61r0,124","w":240,"k":{"\/":22,"&":7,"v":-4,"X":11,"V":4,"J":36,"W":2,"Y":4,"w":-4,"y":-4,"A":25,"Z":5,".":36,",":36,"\u2026":36,"\u201d":-7,"\u2019":-7,"a":4,"c":2,"e":2,"o":2,"f":-5,"t":-5,"u":-2}},"Q":{"d":"283,-7r-14,15r-35,-32v-21,18,-49,28,-81,28v-76,0,-127,-60,-127,-130v0,-69,51,-130,127,-130v115,0,165,141,94,219xm46,-127v0,91,105,148,174,91r-49,-42r14,-15r48,44v59,-66,14,-190,-80,-190v-62,0,-107,50,-107,112","w":306,"k":{")":4,"?":7,"V":14,"T":20,"W":13,"Y":23}},"R":{"d":"37,-252v88,0,195,-13,196,72v0,42,-32,66,-74,72r84,108r-24,0r-80,-104r-83,0r0,104r-19,0r0,-252xm56,-121v71,1,159,9,159,-59v0,-63,-91,-56,-159,-55r0,114","w":260,"k":{"V":7,"J":2,"T":4,"W":5,"Y":9,"d":2,"g":2,"q":2,"c":4,"e":4,"o":4,"f":-4,"t":-4}},"S":{"d":"123,4v-40,0,-72,-14,-102,-41r12,-14v28,26,54,38,91,38v38,0,64,-21,64,-51v0,-27,-15,-42,-72,-54v-60,-12,-85,-33,-85,-71v-2,-74,124,-86,168,-36r-12,15v-37,-43,-137,-38,-137,20v0,27,13,43,73,55v58,12,83,32,83,70v0,41,-34,69,-83,69","w":230,"k":{"V":11,"\\":7,"?":4,"v":5,"X":9,"x":5,"T":5,"W":9,"Y":11,"w":4,"y":5,"A":5,"Z":4,"z":2,"f":2,"t":2,"S":4}},"T":{"d":"107,0r0,-235r-88,0r0,-17r195,0r0,17r-88,0r0,235r-19,0","w":233,"k":{"v":36,"x":36,"J":40,"\/":32,"&":25,"j":14,"w":36,"y":36,"A":32,"Z":7,".":36,",":36,"\u2026":36,"a":49,"d":45,"g":45,"q":45,"c":49,"e":49,"o":49,"C":20,"G":20,"O":20,"Q":20,"s":41,"z":40,"f":18,"t":18,"u":36,"S":5,":":18,";":18,"-":32,"\u2013":32,"\u2014":32,"b":7,"h":7,"k":7,"l":7,"m":36,"n":36,"p":36,"r":36,"i":14}},"U":{"d":"137,4v-60,0,-104,-38,-104,-109r0,-147r19,0r0,145v0,59,33,94,86,94v51,0,83,-31,83,-92r0,-147r19,0r0,145v0,72,-42,111,-103,111","w":273,"k":{"X":4,"x":2,"J":7,"\/":5,"A":9,".":5,",":5,"\u2026":5}},"V":{"d":"127,2r-111,-254r21,0r98,232r99,-232r20,0r-111,254r-16,0","w":270,"k":{"\/":43,"&":20,"x":18,"v":14,"j":7,"X":7,"V":4,"J":43,"W":4,"Y":7,"w":13,"y":14,"A":36,"Z":4,".":43,",":43,"\u2026":43,"a":25,"d":23,"g":23,"q":23,"c":25,"e":25,"o":25,"C":14,"G":14,"O":14,"Q":14,"s":22,"z":20,"f":9,"t":7,"u":14,"S":9,":":7,";":7,"-":14,"\u2013":14,"\u2014":14,"b":4,"h":4,"k":4,"l":4,"m":14,"n":14,"p":14,"r":14,"i":7}},"W":{"d":"109,2r-91,-254r21,0r79,224r74,-225r14,0r74,225r79,-224r20,0r-92,254r-15,0r-74,-219r-73,219r-16,0","w":396,"k":{"V":4,"v":13,"X":5,"x":14,"J":38,"\/":36,"&":16,"j":5,"W":4,"Y":7,"w":13,"y":13,"A":32,"Z":4,".":36,",":36,"\u2026":36,"a":25,"d":22,"g":22,"q":22,"c":23,"e":23,"o":23,"C":13,"G":13,"O":13,"Q":13,"s":22,"z":20,"f":11,"t":9,"u":13,"S":7,":":5,";":5,"-":13,"\u2013":13,"\u2014":13,"b":4,"h":4,"k":4,"l":4,"m":13,"n":13,"p":13,"r":13,"i":5}},"X":{"d":"18,0r100,-129r-96,-123r22,0r86,111r86,-111r22,0r-97,123r101,129r-23,0r-89,-116r-90,116r-22,0","w":259,"k":{"?":5,"&":4,"v":18,"j":4,"V":7,"J":4,"W":5,"Y":7,"w":14,"y":14,"a":4,"d":14,"g":14,"q":14,"c":16,"e":16,"o":16,"C":18,"G":18,"O":18,"Q":18,"f":7,"t":7,"u":7,"S":11,"-":18,"\u2013":18,"\u2014":18,"b":4,"h":4,"k":4,"l":4,"i":4,"U":4}},"Y":{"d":"120,0r0,-100r-108,-152r23,0r94,135r95,-135r22,0r-108,152r0,100r-18,0","w":257,"k":{"V":7,"v":22,"X":7,"x":25,"J":47,"\/":40,"&":25,"j":7,"W":7,"w":20,"y":22,"A":40,"Z":4,".":47,",":47,"\u2026":47,"a":36,"d":38,"g":38,"q":38,"c":40,"e":40,"o":40,"C":22,"G":22,"O":22,"Q":22,"s":36,"z":29,"f":14,"t":11,"u":27,"S":13,":":14,";":14,"-":29,"\u2013":29,"\u2014":29,"b":4,"h":4,"k":4,"l":4,"m":27,"n":27,"p":27,"r":27,"i":7}},"Z":{"d":"24,0r0,-10r173,-225r-166,0r0,-17r193,0r0,10r-173,225r173,0r0,17r-200,0","w":247,"k":{"v":7,"&":5,"w":5,"y":5,"Z":4,"d":7,"g":7,"q":7,"c":9,"e":9,"o":9,"C":14,"G":14,"O":14,"Q":14,"f":4,"S":4,"-":11,"\u2013":11,"\u2014":11}},"a":{"d":"35,-171v54,-28,142,-19,142,57r0,114r-18,0r0,-31v-22,47,-141,50,-141,-23v0,-59,89,-70,141,-52v10,-69,-73,-76,-118,-49xm90,-12v45,0,77,-28,70,-78v-37,-13,-123,-14,-123,36v0,27,25,42,53,42","w":206,"k":{"*":5,"\\":27,"?":13,"v":7,"w":7,"y":7,"t":2}},"b":{"d":"216,-93v0,104,-128,125,-165,53r0,40r-18,0r0,-263r18,0r0,120v37,-72,165,-54,165,50xm125,-13v40,0,72,-29,72,-79v0,-48,-33,-79,-72,-79v-38,0,-75,32,-75,80v0,47,37,78,75,78","k":{"*":5,"\\":25,"?":13,"v":9,"x":11,"}":5,"]":7,")":11,"w":7,"y":9,".":4,",":4,"\u2026":4,"z":5,"\u201c":4,"\u2018":4}},"c":{"d":"114,4v-53,0,-93,-44,-93,-96v0,-51,40,-96,93,-96v35,0,57,16,74,34r-13,13v-39,-54,-135,-28,-135,49v0,75,98,107,137,49r12,11v-19,21,-41,36,-75,36","w":205,"k":{"\\":14,"?":5,"v":2,"x":4,")":5,"w":2,"y":2,"\u201d":-5,"\u2019":-5,"d":4,"g":4,"q":4,"c":5,"e":5,"o":5,"\u201c":-4,"\u2018":-4}},"d":{"d":"186,-41v-37,73,-164,53,-164,-51v0,-103,128,-124,164,-52r0,-119r18,0r0,263r-18,0r0,-41xm113,-13v38,0,75,-31,75,-79v0,-47,-37,-79,-75,-79v-40,0,-72,29,-72,79v0,48,33,79,72,79"},"e":{"d":"187,-30v-48,62,-166,34,-166,-62v0,-53,37,-96,87,-96v53,1,86,44,84,103r-152,0v2,78,97,93,135,44xm40,-100r133,0v-3,-37,-24,-72,-66,-72v-36,0,-64,31,-67,72","w":210,"k":{"*":7,"\\":29,"?":14,"v":9,"x":11,"}":4,"]":7,")":11,"w":9,"y":9,".":4,",":4,"\u2026":4,"z":5}},"f":{"d":"44,-184v-7,-59,28,-92,82,-76r0,17v-41,-16,-71,6,-64,59r64,0r0,17r-64,0r0,167r-18,0r0,-167r-26,0r0,-17r26,0","w":130,"k":{"*":-11,"\\":-11,"?":-13,"}":-11,"]":-7,")":-11,"\/":16,".":16,",":16,"\u2026":16,"\u201d":-13,"\u2019":-13,"a":5,"d":4,"g":4,"q":4,"c":4,"e":4,"o":4,"z":4,"\u201c":-11,"\u2018":-11,"\u2122":-20}},"g":{"d":"204,-28v5,92,-115,108,-174,58r10,-14v49,42,148,36,146,-46r0,-26v-36,67,-164,50,-164,-45v0,-93,129,-113,164,-46r0,-37r18,0r0,156xm112,-31v38,0,77,-27,76,-70v0,-42,-38,-70,-76,-70v-39,0,-71,26,-71,70v0,41,33,70,71,70","k":{"\\":18}},"h":{"d":"33,0r0,-263r18,0r0,114v12,-22,33,-39,66,-39v46,0,74,32,74,76r0,112r-18,0v-3,-73,19,-172,-58,-172v-36,0,-64,28,-64,66r0,106r-18,0","w":220,"k":{"*":5,"\\":27,"?":11,"v":7,"w":5,"y":5}},"i":{"d":"34,-231r0,-25r22,0r0,25r-22,0xm36,0r0,-184r18,0r0,184r-18,0","w":89},"j":{"d":"34,-231r0,-25r22,0r0,25r-22,0xm54,16v0,34,-24,48,-54,41r0,-15v21,4,36,-2,36,-25r0,-201r18,0r0,200","w":89},"k":{"d":"33,0r0,-263r18,0r0,197r114,-118r23,0r-80,82r83,102r-23,0r-72,-90r-45,45r0,45r-18,0","w":201,"k":{"\\":14,"v":7,"w":7,"y":5,"a":4,"d":9,"g":9,"q":9,"c":9,"e":9,"o":9,"t":4,"u":4,"-":7,"\u2013":7,"\u2014":7}},"l":{"d":"36,0r0,-263r18,0r0,263r-18,0","w":89},"m":{"d":"33,0r0,-184r18,0r0,33v12,-19,28,-37,61,-37v32,0,52,19,62,40v12,-21,31,-40,66,-40v44,0,71,31,71,77r0,111r-18,0v-3,-70,19,-172,-54,-172v-31,0,-58,24,-58,65r0,107r-18,0v-3,-70,19,-174,-53,-172v-33,0,-59,29,-59,66r0,106r-18,0","w":342,"k":{"*":5,"\\":27,"?":11,"v":7,"w":5,"y":5}},"n":{"d":"33,0r0,-184r18,0r0,35v12,-22,33,-39,66,-39v46,0,74,32,74,76r0,112r-18,0v-3,-73,19,-172,-58,-172v-36,0,-64,28,-64,66r0,106r-18,0","w":220,"k":{"*":5,"\\":27,"?":11,"v":7,"w":5,"y":5}},"o":{"d":"115,4v-54,0,-94,-44,-94,-96v0,-51,40,-96,95,-96v54,0,94,44,94,96v0,51,-40,96,-95,96xm116,-12v44,0,74,-36,74,-80v0,-44,-33,-79,-75,-79v-44,0,-75,35,-75,79v0,44,34,80,76,80","w":230,"k":{"*":7,"\\":29,"?":18,"v":11,"x":13,"}":5,"]":7,")":11,"w":9,"y":11,".":7,",":7,"\u2026":7,"z":7,"\u201c":7,"\u2018":7}},"p":{"d":"33,58r0,-242r18,0r0,41v38,-72,165,-53,165,51v0,103,-128,124,-165,52r0,98r-18,0xm125,-13v40,0,72,-29,72,-79v0,-48,-33,-79,-72,-79v-38,0,-75,32,-75,80v0,47,37,78,75,78","k":{"*":5,"\\":25,"?":13,"v":9,"x":11,"}":5,"]":7,")":11,"w":7,"y":9,".":4,",":4,"\u2026":4,"z":5,"\u201c":4,"\u2018":4}},"q":{"d":"186,58r0,-99v-37,73,-164,53,-164,-51v0,-103,128,-124,164,-52r0,-40r18,0r0,242r-18,0xm113,-13v38,0,75,-31,75,-79v0,-47,-37,-79,-75,-79v-40,0,-72,29,-72,79v0,48,33,79,72,79","k":{"\\":18}},"r":{"d":"33,0r0,-184r18,0r0,53v14,-33,45,-56,81,-55v-1,6,2,15,-1,19v-42,0,-80,32,-80,92r0,75r-18,0","w":144,"k":{"*":-7,"\\":11,"\/":27,".":32,",":32,"\u2026":32,"\u201d":-13,"\u2019":-13,"a":9,"d":9,"g":9,"q":9,"c":9,"e":9,"o":9,"z":4,"\u201c":-7,"\u2018":-7}},"s":{"d":"45,-139v0,50,114,27,111,89v-3,67,-101,65,-138,27r10,-14v20,15,43,24,66,24v25,0,46,-14,44,-36v-3,-50,-111,-28,-111,-87v0,-58,87,-62,125,-31r-9,15v-28,-23,-98,-30,-98,13","w":178,"k":{"\\":27,"?":13,"v":7,"x":9,"}":4,"]":5,")":7,"w":5,"y":5,"s":4,"z":4,"t":4,"\u201c":4,"\u2018":4}},"t":{"d":"125,-3v-36,15,-82,3,-82,-44r0,-120r-26,0r0,-17r26,0r0,-58r18,0r0,58r64,0r0,17r-64,0r0,118v0,38,37,43,64,29r0,17","w":144,"k":{"\\":14,"\u201d":-4,"\u2019":-4,"d":5,"g":5,"q":5,"c":5,"e":5,"o":5}},"u":{"d":"103,4v-46,0,-73,-31,-73,-75r0,-113r18,0v3,73,-19,172,58,172v36,0,64,-27,64,-65r0,-107r17,0r0,184r-17,0r0,-34v-12,22,-34,38,-67,38","w":220,"k":{"\\":18}},"v":{"d":"97,1r-82,-185r20,0r70,164r70,-164r20,0r-83,185r-15,0","w":209,"k":{"}":4,"]":7,"\\":18,"\/":25,"?":4,"x":4,"v":5,"w":5,"y":5,".":31,",":31,"\u2026":31,"a":9,"d":9,"g":9,"q":9,"c":11,"e":11,"o":11,"s":7,"z":2,"-":5,"\u2013":5,"\u2014":5}},"w":{"d":"85,1r-67,-185r19,0r56,162r55,-162r14,0r56,162r55,-162r19,0r-67,185r-15,0r-55,-157r-55,157r-15,0","w":309,"k":{"\\":18,"?":4,"v":5,"x":4,"}":4,"]":7,"\/":22,"w":4,"y":4,".":25,",":25,"\u2026":25,"a":7,"d":7,"g":7,"q":7,"c":9,"e":9,"o":9,"s":5,"z":2,"-":4,"\u2013":4,"\u2014":4}},"x":{"d":"167,0r-65,-82r-65,82r-21,0r75,-94r-72,-90r22,0r62,78r62,-78r21,0r-72,90r75,94r-22,0","w":205,"k":{"}":4,"]":4,"\\":18,"?":5,"v":4,"w":4,"y":4,"a":5,"d":11,"g":11,"q":11,"c":13,"e":13,"o":13,"s":7,"-":11,"\u2013":11,"\u2014":11}},"y":{"d":"117,6v-21,54,-51,62,-98,45r7,-16v36,15,59,9,76,-36r-88,-183r21,0r76,165r66,-165r20,0","w":211,"k":{"\\":18,"?":4,"v":5,"x":4,"}":4,"]":7,"\/":25,"w":4,"y":4,".":31,",":31,"\u2026":31,"a":9,"d":9,"g":9,"q":9,"c":11,"e":11,"o":11,"s":7,"z":2,"-":5,"\u2013":5,"\u2014":5}},"z":{"d":"21,0r0,-10r132,-158r-127,0r0,-16r154,0r0,10r-133,158r133,0r0,16r-159,0","w":199,"k":{"\\":16,"d":5,"g":5,"q":5,"c":5,"e":5,"o":5}},"0":{"d":"127,4v-64,0,-104,-60,-104,-130v0,-69,41,-130,105,-130v64,0,104,60,104,130v0,69,-41,130,-105,130xm128,-13v52,0,85,-54,85,-113v0,-59,-34,-113,-86,-113v-52,0,-84,53,-84,113v0,58,33,113,85,113","w":255,"k":{"\/":13,"7":11,"3":4,"2":4,"1":2,".":7,",":7,"\u2026":7}},"1":{"d":"64,0r0,-234r-48,16r-5,-15v24,-7,41,-21,72,-21r0,254r-19,0","w":120},"2":{"d":"17,0r0,-14v43,-45,150,-110,150,-171v0,-33,-27,-54,-57,-54v-32,0,-53,17,-74,47r-14,-10v22,-33,46,-54,90,-54v43,0,75,31,75,70v0,62,-99,124,-140,168r142,0r0,18r-172,0","w":212,"k":{"7":5,"4":11}},"3":{"d":"112,4v-41,0,-72,-18,-93,-45r15,-12v30,53,139,57,141,-16v1,-39,-42,-58,-93,-55r-4,-10r87,-100r-133,0r0,-18r158,0r0,13r-85,98v48,3,90,25,89,72v0,44,-38,73,-82,73","w":219,"k":{"\/":4,"9":2,"7":9,"5":2}},"4":{"d":"160,0r0,-62r-136,0r-7,-14r144,-178r17,0r0,176r41,0r0,16r-41,0r0,62r-18,0xm40,-78r120,0r0,-149","w":239,"k":{"\/":7,"9":4,"7":14,"1":7}},"5":{"d":"109,4v-34,0,-66,-18,-88,-40r13,-14v23,23,48,37,75,37v40,0,68,-28,68,-64v0,-58,-84,-74,-126,-44r-14,-9r7,-122r141,0r0,18r-125,0r-6,94v55,-31,143,-4,143,63v0,48,-37,81,-88,81","w":217,"k":{"\/":7,"9":2,"7":11,"3":2,"2":4}},"6":{"d":"119,4v-68,0,-96,-43,-96,-124v0,-76,40,-136,103,-136v29,0,50,11,72,29r-12,14v-68,-62,-152,-6,-144,104v14,-24,38,-47,79,-47v46,0,86,32,86,78v0,48,-38,82,-88,82xm121,-13v41,0,67,-29,67,-65v0,-35,-28,-61,-68,-61v-41,0,-71,31,-71,63v0,36,31,63,72,63","w":231,"k":{"\/":4,"9":4,"7":9,"3":4,"1":7}},"7":{"d":"56,0r115,-234r-147,0r0,-18r168,0r0,14r-115,238r-21,0","w":211,"k":{"\/":50,"9":5,"8":4,"6":7,"5":9,"4":31,"3":7,"2":5,"1":-4,"0":7,".":36,",":36,"\u2026":36,"-":11,"\u2013":11,"\u2014":11}},"8":{"d":"113,4v-53,0,-93,-29,-93,-72v0,-30,24,-52,56,-62v-25,-10,-48,-29,-48,-60v0,-39,41,-66,85,-66v44,0,86,27,85,67v0,30,-22,49,-47,59v32,10,56,32,56,63v0,42,-41,71,-94,71xm113,-137v36,0,66,-21,66,-53v0,-28,-29,-49,-66,-49v-37,0,-65,21,-65,50v0,31,29,52,65,52xm113,-13v46,0,75,-26,75,-54v0,-31,-34,-54,-75,-54v-41,0,-74,23,-74,54v0,28,28,54,74,54","w":226,"k":{"9":2,"7":4}},"9":{"d":"112,-256v69,0,93,43,96,124v5,117,-105,175,-178,105r11,-14v71,66,156,9,148,-102v-14,26,-38,49,-78,49v-51,0,-87,-34,-87,-78v0,-46,35,-84,88,-84xm112,-111v43,0,70,-32,70,-64v0,-36,-30,-64,-72,-64v-41,0,-67,32,-67,67v0,35,29,61,69,61","w":231,"k":{"\/":9,"7":9,"5":2,"3":4,"2":4,".":4,",":4,"\u2026":4}},".":{"d":"30,0r0,-31r23,0r0,31r-23,0","w":82,"k":{"V":43,"v":31,"j":-5,"1":18,"7":7,"0":7,"T":36,"W":36,"Y":47,"w":25,"y":22,"\u201d":14,"\u2019":14,"d":4,"g":4,"q":4,"c":7,"e":7,"o":7,"C":14,"G":14,"O":14,"Q":14,"f":5,"t":9,"U":5}},",":{"d":"23,39r-4,-9v15,-8,21,-16,20,-30r-9,0r0,-31r23,0v1,36,1,60,-30,70","w":82,"k":{"y":22,"V":43,"v":31,"j":-5,"1":18,"7":7,"0":7,"T":36,"W":36,"Y":47,"w":25,"\u201d":14,"\u2019":14,"d":4,"g":4,"q":4,"c":7,"e":7,"o":7,"C":14,"G":14,"O":14,"Q":14,"f":5,"t":9,"U":5}},":":{"d":"31,-153r0,-31r24,0r0,31r-24,0xm31,0r0,-31r24,0r0,31r-24,0","w":86,"k":{"V":7,"T":18,"W":5,"Y":14}},";":{"d":"31,-153r0,-31r24,0r0,31r-24,0xm25,39r-4,-9v15,-8,21,-16,20,-30r-10,0r0,-31r24,0v1,36,1,60,-30,70","w":86,"k":{"V":7,"T":18,"W":5,"Y":14}},"\u2026":{"d":"192,0r0,-30r23,0r0,30r-23,0xm111,0r0,-30r23,0r0,30r-23,0xm30,0r0,-30r23,0r0,30r-23,0","w":244,"k":{"V":43,"v":31,"j":-5,"1":18,"7":7,"0":7,"T":36,"W":36,"Y":47,"w":25,"y":22,"\u201d":14,"\u2019":14,"d":4,"g":4,"q":4,"c":7,"e":7,"o":7,"C":14,"G":14,"O":14,"Q":14,"f":5,"t":9,"U":5}},"&":{"d":"224,5r-44,-45v-24,28,-51,44,-85,44v-44,0,-77,-29,-77,-71v0,-34,24,-59,65,-74v-48,-40,-33,-114,35,-115v33,0,58,24,58,55v0,31,-23,52,-62,65r66,68v12,-17,23,-38,33,-61r17,7v-12,26,-24,49,-38,67r47,48xm103,-147v36,-12,54,-29,54,-54v0,-22,-17,-39,-40,-39v-55,0,-57,58,-14,93xm95,-13v28,0,52,-15,73,-39r-74,-77v-40,15,-58,37,-58,62v0,31,24,54,59,54","w":250,"k":{"V":22,"T":32,"W":18,"Y":25,"S":4}},"!":{"d":"40,-66r-5,-186r21,0r-6,186r-10,0xm33,0r0,-31r24,0r0,31r-24,0","w":90},"?":{"d":"78,-124v43,-6,76,-21,76,-60v0,-30,-22,-55,-59,-55v-29,0,-51,14,-70,37r-13,-10v21,-26,45,-43,83,-43v48,0,79,31,79,71v0,45,-35,68,-77,73r-3,45r-12,0xm76,0r0,-31r24,0r0,31r-24,0","w":192},"\u201c":{"d":"93,-185v-1,-35,-2,-59,29,-69r5,9v-15,8,-21,16,-20,30r9,0r0,30r-23,0xm28,-185v-1,-36,-1,-59,30,-69r4,9v-15,8,-21,16,-20,30r9,0r0,30r-23,0","w":147,"k":{"J":29,"A":32,"a":4,"d":5,"g":5,"q":5,"c":5,"e":5,"o":5,"s":4,"z":4,"t":-5}},"\u201d":{"d":"90,-183r-4,-9v15,-8,21,-15,20,-29r-10,0r0,-31r24,0v1,36,1,60,-30,69xm25,-183r-4,-9v15,-8,21,-15,20,-29r-10,0r0,-31r24,0v1,36,1,60,-30,69","w":147,"k":{"J":36,"A":36,"a":7,"d":14,"g":14,"q":14,"c":16,"e":16,"o":16,"s":11}},"\u2018":{"d":"28,-185v-1,-36,-1,-59,30,-69r4,9v-15,8,-21,16,-20,30r9,0r0,30r-23,0","w":82,"k":{"J":29,"A":32,"a":4,"d":5,"g":5,"q":5,"c":5,"e":5,"o":5,"s":4,"z":4,"t":-5}},"\u2019":{"d":"25,-183r-4,-9v15,-8,21,-15,20,-29r-10,0r0,-31r24,0v1,36,1,60,-30,69","w":82,"k":{"J":36,"A":36,"a":7,"d":14,"g":14,"q":14,"c":16,"e":16,"o":16,"s":11}},"-":{"d":"25,-97r0,-20r97,0r0,20r-97,0","w":146,"k":{"V":14,"v":5,"X":18,"x":11,"1":11,"7":14,"3":4,"T":32,"W":13,"Y":29,"w":4,"y":5,"A":14,"Z":11,"z":4}},"\u2013":{"d":"25,-98r0,-18r140,0r0,18r-140,0","w":190,"k":{"V":14,"v":5,"X":18,"x":11,"1":11,"7":14,"3":4,"T":32,"W":13,"Y":29,"w":4,"y":5,"A":14,"Z":11,"z":4}},"\u2014":{"d":"25,-98r0,-18r273,0r0,18r-273,0","w":323,"k":{"V":14,"v":5,"X":18,"x":11,"1":11,"7":14,"3":4,"T":32,"W":13,"Y":29,"w":4,"y":5,"A":14,"Z":11,"z":4}},"_":{"d":"-1,58r0,-16r218,0r0,16r-218,0","w":216},"\/":{"d":"-6,46r169,-333r18,0r-170,333r-17,0","w":180,"k":{"\/":61,"9":7,"8":5,"7":4,"6":13,"5":7,"4":34,"3":4,"2":7,"1":-4,"0":13,"x":18,"v":18,"J":47,"w":18,"y":18,"A":43,"Z":7,"a":23,"d":25,"g":25,"q":25,"c":29,"e":29,"o":29,"C":14,"G":14,"O":14,"Q":14,"s":31,"z":22,"f":9,"t":7,"u":18,"S":11,"m":18,"n":18,"p":18,"r":18}},"\\":{"d":"169,46r-170,-333r18,0r169,333r-17,0","w":180,"k":{"v":25,"j":-11,"V":43,"T":32,"W":36,"Y":40,"w":22,"y":22,"C":14,"G":14,"O":14,"Q":14,"f":4,"t":11,"U":5}},"|":{"d":"44,46r0,-333r15,0r0,333r-15,0","w":102},"(":{"d":"125,51v-130,-66,-131,-242,0,-308r8,11v-117,64,-118,222,0,285","w":154,"k":{"j":-11,"g":11,"J":5,"d":11,"q":11,"c":11,"e":11,"o":11,"C":11,"G":11,"O":11,"Q":11,"s":5}},")":{"d":"30,51r-8,-12v118,-63,117,-222,0,-285r8,-11v130,66,131,242,0,308","w":154},"[":{"d":"35,47r0,-299r99,0r0,14r-82,0r0,271r82,0r0,14r-99,0","w":154,"k":{"x":4,"v":7,"j":-11,"J":4,"w":7,"y":4,"a":4,"d":7,"g":7,"q":7,"c":7,"e":7,"o":7,"C":7,"G":7,"O":7,"Q":7,"s":5}},"]":{"d":"21,47r0,-14r82,0r0,-271r-82,0r0,-14r99,0r0,299r-99,0","w":154},"{":{"d":"150,51v-77,-17,-77,-39,-76,-102v1,-32,-15,-48,-53,-45r0,-14v51,4,53,-26,53,-74v0,-37,12,-61,76,-73r2,11v-67,17,-61,34,-61,91v0,32,-14,45,-37,52v33,7,37,36,37,79v0,36,6,49,61,63","w":172,"k":{"x":4,"v":4,"j":-13,"g":5,"J":4,"w":4,"y":4,"d":5,"q":5,"c":5,"e":5,"o":5,"C":7,"G":7,"O":7,"Q":7,"s":4,"z":4}},"}":{"d":"23,51r-2,-12v67,-16,60,-34,60,-90v0,-32,15,-45,38,-52v-33,-7,-38,-36,-38,-79v0,-36,-5,-50,-60,-64r2,-11v77,17,77,39,76,101v-1,32,14,49,53,46r0,14v-51,-4,-53,26,-53,74v0,37,-12,61,-76,73","w":172},"@":{"d":"180,58v-92,0,-161,-71,-161,-157v0,-86,70,-157,158,-157v88,0,157,66,157,142v0,62,-35,88,-66,88v-25,0,-43,-13,-49,-34v-15,18,-33,34,-61,34v-35,0,-64,-26,-64,-64v0,-78,105,-122,137,-58r6,-27r17,2r-17,102v0,21,12,32,33,32v25,0,51,-23,51,-75v0,-66,-61,-131,-144,-131v-83,0,-146,66,-146,146v0,81,62,146,149,146v36,0,62,-9,90,-25r5,9v-28,17,-58,27,-95,27xm161,-43v64,0,93,-120,17,-120v-33,0,-65,31,-65,71v0,31,20,49,48,49","w":352},"\u2122":{"d":"120,-141r0,-111r13,0r43,66r44,-66r13,0r0,111r-13,0r0,-89v-16,20,-27,46,-45,64r-43,-64r0,89r-12,0xm46,-141r0,-99r-37,0r0,-12r86,0r0,12r-37,0r0,99r-12,0","w":248},"*":{"d":"70,-146r3,-46r-38,26r-8,-13r42,-20r-42,-21r8,-13r38,26r-3,-46r15,0r-3,46r38,-26r8,13r-43,21r43,20r-8,13r-38,-26r3,46r-15,0","w":154,"k":{"J":29,"A":36,"a":4,"d":5,"g":5,"q":5,"c":7,"e":7,"o":7,"s":4,"t":-4}},"$":{"d":"107,35r0,-35v-33,-3,-59,-16,-85,-39r11,-14v22,21,45,33,75,36r0,-102v-54,-12,-77,-32,-77,-68v0,-36,32,-64,76,-65r0,-21r17,0r0,22v28,3,48,12,70,29r-12,14v-19,-17,-38,-24,-59,-27r0,101v55,12,78,32,78,67v0,38,-32,66,-77,67r0,35r-17,0xm183,-65v0,-24,-12,-40,-60,-51r0,100v36,-1,60,-22,60,-49xm50,-188v0,24,11,38,58,50r0,-98v-35,1,-58,22,-58,48","w":227,"k":{"7":4}},"#":{"d":"220,-84r0,17r-50,0r-11,67r-18,0r12,-67r-75,0r-11,67r-17,0r11,-67r-43,0r0,-17r46,0r14,-85r-46,0r0,-17r49,0r12,-66r17,0r-11,66r75,0r11,-66r17,0r-12,66r44,0r0,17r-46,0r-15,85r47,0xm96,-169r-15,85r75,0r14,-85r-74,0","w":252},"%":{"d":"75,-126v-33,0,-55,-31,-55,-64v0,-34,23,-65,56,-65v33,0,55,31,55,65v0,34,-23,64,-56,64xm112,-190v0,-28,-17,-49,-37,-49v-21,0,-36,22,-36,49v0,28,17,49,37,49v21,0,36,-22,36,-49xm46,0r185,-252r20,0r-185,252r-20,0xm221,3v-33,0,-55,-31,-55,-65v0,-34,23,-64,56,-64v33,0,55,31,55,64v0,34,-23,65,-56,65xm222,-13v21,0,36,-21,36,-49v0,-28,-17,-49,-37,-49v-21,0,-36,23,-36,49v0,28,17,49,37,49","w":296},"\"":{"d":"89,-161r13,-91v7,1,20,-3,23,2r-25,89r-11,0xm24,-161r13,-91v7,1,20,-3,23,2r-25,89r-11,0","w":147},"'":{"d":"24,-161r13,-91v7,1,20,-3,23,2r-25,89r-11,0","w":82},"+":{"d":"103,-41r0,-77r-79,0r0,-17r79,0r0,-78r18,0r0,78r78,0r0,17r-78,0r0,77r-18,0","w":223},"=":{"d":"30,-158r0,-18r163,0r0,18r-163,0xm30,-77r0,-18r163,0r0,18r-163,0","w":223},"\u00d7":{"d":"176,-49r-65,-66r-65,66r-12,-12r66,-65r-66,-66r13,-12r65,65r65,-65r12,12r-66,65r66,65","w":223},"<":{"d":"190,-33r-167,-87r0,-14r167,-87r0,20r-145,74r145,75r0,19","w":223},">":{"d":"33,-33r0,-19r146,-74r-146,-75r0,-20r168,87r0,14","w":223},"^":{"d":"25,-177r57,-76r16,0r57,76r-19,0r-46,-61r-46,61r-19,0","w":180},"~":{"d":"42,-87r-12,-3v10,-54,46,-27,76,-19v9,0,13,-4,18,-18r12,3v-10,54,-46,27,-76,19v-9,0,-13,4,-18,18","w":165},"`":{"d":"95,-214r-38,-37r21,-11r32,48r-15,0","w":180},"\u00a0":{"w":108}}});

/*!
 * The following copyright notice may not be removed under any circumstances.
 * 
 * Copyright:
 * Copyright (C) 2000, 2007 Hoefler & Frere-Jones. http://www.typography.com
 * 
 * Trademark:
 * Gotham is a trademark of Hoefler & Frere-Jones, which may be registered in
 * certain jurisdictions.
 * 
 * Full name:
 * Gotham-Bold
 * 
 * Manufacturer:
 * Hoefler & Frere-Jones
 * 
 * Designer:
 * Tobias Frere-Jones
 * 
 * Vendor URL:
 * www.typography.com
 * 
 * License information:
 * http://www.typography.com/support/eula.html
 */
Cufon.registerFont({"w":230,"face":{"font-family":"Gotham Bold","font-weight":400,"font-stretch":"normal","units-per-em":"360","panose-1":"0 0 0 0 0 0 0 0 0 0","ascent":"288","descent":"-72","x-height":"4","bbox":"-10 -287 393 59.223","underline-thickness":"18","underline-position":"-18","stemh":"58","stemv":"55","unicode-range":"U+0020-U+2122"},"glyphs":{" ":{"w":108},"A":{"d":"9,0r108,-254r51,0r108,254r-58,0r-23,-57r-107,0r-23,57r-56,0xm108,-105r67,0r-34,-82","w":284},"B":{"d":"30,-252v84,3,201,-20,200,66v0,28,-15,44,-33,54v29,11,47,28,47,63v0,86,-126,68,-214,69r0,-252xm84,-150v36,-1,91,8,91,-27v0,-35,-56,-25,-91,-26r0,53xm84,-49v40,-3,105,13,105,-28v0,-36,-67,-26,-105,-27r0,55","w":259,"k":{"?":2,"&":-5,"v":4,"X":7,"V":7,"T":4,"W":5,"Y":11,"w":4,"y":4}},"C":{"d":"148,4v-74,0,-129,-57,-129,-130v0,-72,54,-130,131,-130v48,0,77,16,100,39r-35,40v-46,-52,-138,-25,-138,51v0,43,30,79,73,79v29,0,46,-11,66,-29r36,35v-26,28,-55,45,-104,45","w":265,"k":{"V":2,"X":4,"v":4,"x":4,"W":2,"Y":4,"w":4,"y":4,"d":4,"g":4,"q":4,"c":4,"e":4,"o":4,"-":4,"\u2013":4,"\u2014":4,"C":7,"G":7,"O":7,"Q":7}},"D":{"d":"30,0r0,-252r99,0v79,0,133,54,133,126v0,71,-54,126,-133,126r-99,0xm86,-50v68,7,119,-13,118,-76v0,-61,-49,-84,-118,-76r0,152","w":281,"k":{"V":16,"X":20,"\\":14,"?":7,"x":4,"J":14,"}":7,"]":7,")":11,"\/":14,"T":14,"W":14,"Y":23,"A":18,"Z":14,".":14,",":14,"\u2026":14,"S":4}},"E":{"d":"30,0r0,-252r190,0r0,49r-135,0r0,51r119,0r0,50r-119,0r0,53r137,0r0,49r-192,0","w":241,"k":{"v":4,"w":4,"y":4,"d":4,"g":4,"q":4,"c":4,"e":4,"o":4}},"F":{"d":"30,0r0,-252r192,0r0,50r-136,0r0,54r120,0r0,50r-120,0r0,98r-56,0","w":236,"k":{"\/":25,"?":-4,"&":5,"v":5,"J":40,"w":4,"y":5,"A":29,"Z":4,".":36,",":36,"\u2026":36,"\u201d":-7,"\u2019":-7,"a":9,"d":4,"g":4,"q":4,"c":5,"e":5,"o":5,"s":4,"z":5}},"G":{"d":"152,4v-78,0,-133,-54,-133,-130v0,-72,56,-130,132,-130v45,0,73,12,99,34r-35,42v-45,-48,-138,-22,-138,54v0,68,76,101,129,65r0,-36r-56,0r0,-48r109,0r0,109v-26,22,-61,40,-107,40","w":282,"k":{"V":9,"X":4,"\\":5,"?":4,"v":2,"T":4,"W":7,"Y":11,"y":2,"a":-4}},"H":{"d":"30,0r0,-252r56,0r0,100r102,0r0,-100r55,0r0,252r-55,0r0,-101r-102,0r0,101r-56,0","w":273},"I":{"d":"33,0r0,-252r55,0r0,252r-55,0","w":120},"J":{"d":"177,-87v12,100,-132,114,-172,53r35,-39v23,32,80,40,80,-17r0,-162r57,0r0,165","w":203,"k":{"J":7,"A":9,".":5,",":5,"\u2026":5}},"K":{"d":"30,0r0,-252r56,0r0,110r102,-110r67,0r-103,107r108,145r-67,0r-78,-107r-29,30r0,77r-56,0","w":262,"k":{"V":11,"v":22,"T":4,"W":11,"Y":11,"w":18,"y":18,"A":7,"a":4,"d":9,"g":9,"q":9,"c":11,"e":11,"o":11,"f":7,"t":9,"u":7,"S":4,"-":18,"\u2013":18,"\u2014":18,"C":20,"G":20,"O":20,"Q":20,"U":5}},"L":{"d":"30,0r0,-252r56,0r0,202r125,0r0,50r-181,0","w":222,"k":{"V":41,"*":29,"\\":43,"?":22,"v":22,"T":36,"W":36,"Y":47,"w":18,"y":22,"\u201d":14,"\u2019":14,"d":2,"g":2,"q":2,"c":4,"e":4,"o":4,"f":7,"t":7,"-":14,"\u2013":14,"\u2014":14,"C":14,"G":14,"O":14,"Q":14,"U":7,"\u201c":14,"\u2018":14,"\u2122":32}},"M":{"d":"30,0r0,-252r60,0r66,107r66,-107r60,0r0,252r-55,0r0,-165r-72,108r-70,-106r0,163r-55,0","w":312},"N":{"d":"30,0r0,-252r51,0r118,155r0,-155r55,0r0,252r-47,0r-122,-160r0,160r-55,0","w":284},"O":{"d":"153,4v-78,0,-134,-57,-134,-130v0,-72,56,-130,134,-130v78,0,134,57,134,130v0,72,-56,130,-134,130xm153,-47v45,0,76,-35,76,-79v0,-43,-31,-79,-76,-79v-45,0,-76,35,-76,79v0,43,31,79,76,79","w":306,"k":{"V":16,"X":18,"\\":14,"?":7,"x":2,"J":11,"}":7,"]":7,")":11,"\/":14,"T":11,"W":14,"Y":22,"A":16,"Z":13,".":14,",":14,"\u2026":14,"S":2}},"P":{"d":"30,0r0,-252r103,0v60,0,97,36,97,88v-1,73,-64,94,-144,88r0,76r-56,0xm86,-125v42,2,88,1,88,-39v0,-41,-46,-39,-88,-38r0,77","w":240,"k":{"\/":22,"v":-4,"X":11,"V":4,"J":36,"W":2,"Y":4,"w":-4,"y":-4,"A":25,"Z":5,".":36,",":36,"\u2026":36,"\u201d":-7,"\u2019":-7,"a":4,"c":2,"e":2,"o":2,"f":-5,"t":-5,"u":-2}},"Q":{"d":"291,-32r-36,40r-27,-25v-87,56,-209,-7,-209,-109v0,-72,56,-130,134,-130v107,0,170,116,112,202xm77,-127v0,56,54,97,109,73r-41,-35r36,-39r41,37v22,-53,-11,-114,-69,-114v-45,0,-76,35,-76,78","w":306,"k":{")":4,"?":7,"V":16,"T":11,"W":14,"Y":23}},"R":{"d":"30,-252v97,0,210,-16,210,84v0,41,-22,66,-54,78r62,90r-65,0r-54,-81r-43,0r0,81r-56,0r0,-252xm86,-130v43,0,98,7,98,-36v0,-44,-55,-36,-98,-36r0,72","w":260,"k":{"V":7,"J":2,"W":5,"Y":9,"d":2,"g":2,"q":2,"c":4,"e":4,"o":4,"f":-4,"t":-4}},"S":{"d":"212,-75v0,98,-144,97,-199,38r33,-39v23,19,46,31,75,31v23,0,36,-9,36,-25v0,-14,-8,-21,-50,-32v-51,-13,-84,-27,-84,-78v0,-87,131,-95,182,-44r-29,42v-22,-15,-44,-25,-65,-25v-21,0,-33,10,-33,23v0,17,10,22,54,33v51,13,80,32,80,76","k":{"V":11,"X":9,"\\":7,"?":4,"v":5,"x":5,"T":5,"W":9,"Y":11,"w":4,"y":5,"A":5,"Z":4,"z":2,"f":2,"t":2,"S":4}},"T":{"d":"89,0r0,-201r-77,0r0,-51r209,0r0,51r-77,0r0,201r-55,0","w":233,"k":{"v":18,"x":18,"J":40,"\/":32,"&":16,"j":4,"w":14,"y":18,"A":32,"Z":4,".":36,",":36,"\u2026":36,"a":38,"d":34,"g":34,"q":34,"c":38,"e":38,"o":38,"s":32,"z":29,"f":11,"t":7,"u":18,"S":5,":":4,";":4,"-":32,"\u2013":32,"\u2014":32,"b":2,"h":2,"k":2,"l":2,"m":22,"n":22,"p":22,"r":22,"i":4,"C":11,"G":11,"O":11,"Q":11}},"U":{"d":"135,4v-68,0,-109,-38,-109,-112r0,-144r56,0v7,77,-28,205,54,205v82,0,47,-129,54,-205r56,0r0,142v0,76,-43,114,-111,114","w":272,"k":{"X":4,"x":2,"J":7,"\/":5,"A":9,".":5,",":5,"\u2026":5}},"V":{"d":"111,2r-102,-254r61,0r66,177r66,-177r59,0r-102,254r-48,0","w":270,"k":{"\/":43,"&":14,"x":18,"v":14,"j":7,"X":7,"V":4,"J":43,"W":4,"Y":7,"w":13,"y":14,"A":36,"Z":4,".":43,",":43,"\u2026":43,"a":25,"d":23,"g":23,"q":23,"c":25,"e":25,"o":25,"s":22,"z":20,"f":9,"t":7,"u":14,"S":9,":":7,";":7,"-":14,"\u2013":14,"\u2014":14,"b":4,"h":4,"k":4,"l":4,"m":14,"n":14,"p":14,"r":14,"i":7,"C":16,"G":16,"O":16,"Q":16}},"W":{"d":"97,2r-86,-254r59,0r52,171r57,-172r47,0r57,172r52,-171r58,0r-86,254r-48,0r-57,-165r-57,165r-48,0","w":403,"k":{"V":4,"X":5,"v":13,"x":14,"J":38,"\/":36,"&":11,"j":5,"W":4,"Y":7,"w":13,"y":13,"A":32,"Z":4,".":36,",":36,"\u2026":36,"a":25,"d":22,"g":22,"q":22,"c":23,"e":23,"o":23,"s":22,"z":20,"f":11,"t":9,"u":13,"S":7,":":5,";":5,"-":13,"\u2013":13,"\u2014":13,"b":4,"h":4,"k":4,"l":4,"m":13,"n":13,"p":13,"r":13,"i":5,"C":14,"G":14,"O":14,"Q":14}},"X":{"d":"11,0r88,-128r-84,-124r65,0r52,82r54,-82r63,0r-84,123r87,129r-64,0r-57,-86r-57,86r-63,0","w":263,"k":{"?":5,"&":4,"v":18,"j":4,"V":7,"J":4,"W":5,"Y":11,"w":14,"y":14,"A":7,"a":4,"d":14,"g":14,"q":14,"c":16,"e":16,"o":16,"f":7,"t":7,"u":7,"S":11,"-":18,"\u2013":18,"\u2014":18,"b":4,"h":4,"k":4,"l":4,"i":4,"C":18,"G":18,"O":18,"Q":18,"U":4}},"Y":{"d":"101,0r0,-99r-97,-153r65,0r60,101r61,-101r63,0r-96,152r0,100r-56,0","w":257,"k":{"V":7,"X":11,"v":22,"x":25,"J":47,"\/":40,"&":20,"j":7,"W":7,"Y":7,"w":20,"y":22,"A":40,"Z":4,".":47,",":47,"\u2026":47,"a":36,"d":38,"g":38,"q":38,"c":40,"e":40,"o":40,"s":36,"z":29,"f":14,"t":11,"u":27,"S":13,":":14,";":14,"-":29,"\u2013":29,"\u2014":29,"b":4,"h":4,"k":4,"l":4,"m":27,"n":27,"p":27,"r":27,"i":7,"C":22,"G":22,"O":22,"Q":22}},"Z":{"d":"23,0r0,-42r138,-161r-134,0r0,-49r206,0r0,42r-139,161r139,0r0,49r-210,0","w":254,"k":{"v":7,"w":5,"y":5,"Z":4,"d":7,"g":7,"q":7,"c":9,"e":9,"o":9,"f":4,"S":4,"-":11,"\u2013":11,"\u2014":11,"C":13,"G":13,"O":13,"Q":13}},"a":{"d":"104,-195v58,-1,86,27,86,83r0,112r-52,0r0,-21v-30,41,-125,32,-125,-35v0,-59,75,-73,125,-54v5,-47,-62,-42,-95,-28r-13,-42v21,-9,41,-15,74,-15xm96,-34v30,-1,46,-15,43,-44v-22,-12,-73,-10,-73,20v0,15,12,24,30,24","w":213,"k":{"*":5,"\\":27,"?":13,"v":7,"w":7,"y":7,"t":2}},"b":{"d":"227,-97v0,95,-101,130,-148,72r0,25r-55,0r0,-263r55,0r0,98v43,-62,148,-27,148,68xm125,-43v26,0,47,-21,47,-54v0,-32,-21,-53,-47,-53v-26,0,-47,21,-47,54v0,32,21,53,47,53","w":243,"k":{"*":5,"\\":25,"?":13,"v":9,"x":11,"}":5,"]":7,")":11,"w":7,"y":9,".":4,",":4,"\u2026":4,"z":5,"\u201c":4,"\u2018":4}},"c":{"d":"116,4v-58,0,-101,-44,-101,-100v0,-55,42,-101,101,-101v36,0,59,13,77,33r-33,36v-27,-38,-91,-20,-91,32v0,52,64,70,93,33r32,32v-19,21,-39,35,-78,35","w":205,"k":{"\\":14,"?":5,"v":2,"x":4,")":5,"w":2,"y":2,"\u201d":-5,"\u2019":-5,"d":4,"g":4,"q":4,"c":5,"e":5,"o":5,"\u201c":-4,"\u2018":-4}},"d":{"d":"164,-28v-44,62,-148,27,-148,-69v0,-95,101,-129,148,-71r0,-95r55,0r0,263r-55,0r0,-28xm118,-43v26,0,47,-21,47,-54v0,-32,-21,-53,-47,-53v-26,0,-47,21,-47,54v0,32,21,53,47,53","w":243},"e":{"d":"195,-32v-49,67,-180,34,-180,-64v0,-55,40,-101,96,-101v69,0,96,54,93,120r-135,0v9,44,66,48,94,18xm69,-112r82,0v-3,-24,-17,-41,-40,-41v-23,0,-38,16,-42,41","w":220,"k":{"*":7,"\\":29,"?":14,"v":9,"x":11,"}":4,"]":7,")":11,"w":9,"y":9,".":4,",":4,"\u2026":4,"z":5}},"f":{"d":"34,-191v-10,-65,44,-85,98,-69r0,45v-21,-8,-49,-6,-44,24r44,0r0,45r-43,0r0,146r-55,0r0,-146r-23,0r0,-45r23,0","w":137,"k":{"*":-11,"\\":-11,"?":-13,"}":-11,"]":-7,")":-11,"\/":16,".":16,",":16,"\u2026":16,"\u201d":-13,"\u2019":-13,"a":5,"d":4,"g":4,"q":4,"c":4,"e":4,"o":4,"z":4,"\u201c":-11,"\u2018":-11,"\u2122":-14}},"g":{"d":"219,-44v11,109,-118,120,-193,82r18,-41v42,28,132,29,121,-44v-44,59,-149,29,-149,-60v0,-89,105,-116,148,-61r0,-25r55,0r0,149xm117,-61v27,0,48,-19,48,-46v0,-26,-21,-44,-48,-44v-27,0,-46,18,-46,45v0,27,19,45,46,45","w":243,"k":{"\\":18}},"h":{"d":"24,0r0,-263r55,0r0,97v29,-50,122,-36,122,41r0,125r-54,0v-6,-52,21,-147,-34,-147v-55,0,-28,95,-34,147r-55,0","w":224,"k":{"*":5,"\\":27,"?":11,"v":7,"w":5,"y":5}},"i":{"d":"26,-214r0,-49r57,0r0,49r-57,0xm27,0r0,-193r55,0r0,193r-55,0","w":108},"j":{"d":"26,-214r0,-49r57,0r0,49r-57,0xm82,-3v2,51,-37,69,-86,60r0,-43v18,4,31,-1,31,-22r0,-185r55,0r0,190","w":108},"k":{"d":"24,0r0,-263r55,0r0,140r64,-70r66,0r-74,76r76,117r-62,0r-51,-79r-19,20r0,59r-55,0","w":213,"k":{"\\":14,"v":7,"w":7,"y":5,"a":4,"d":9,"g":9,"q":9,"c":9,"e":9,"o":9,"t":4,"u":4,"-":7,"\u2013":7,"\u2014":7}},"l":{"d":"27,0r0,-263r55,0r0,263r-55,0","w":108},"m":{"d":"24,0r0,-193r55,0r0,27v19,-36,93,-43,111,0v36,-50,129,-40,129,40r0,126r-55,0v-6,-51,21,-147,-32,-147v-54,0,-26,96,-33,147r-55,0v-6,-51,21,-147,-32,-147v-54,0,-26,96,-33,147r-55,0","w":342,"k":{"*":5,"\\":27,"?":11,"v":7,"w":5,"y":5}},"n":{"d":"24,0r0,-193r55,0r0,27v29,-50,122,-36,122,41r0,125r-54,0v-6,-52,21,-147,-34,-147v-55,0,-28,95,-34,147r-55,0","w":224,"k":{"*":5,"\\":27,"?":11,"v":7,"w":5,"y":5}},"o":{"d":"119,4v-60,0,-104,-44,-104,-100v0,-55,45,-101,105,-101v60,0,104,45,104,101v0,55,-45,100,-105,100xm120,-43v31,0,50,-24,50,-53v0,-28,-21,-53,-51,-53v-31,0,-50,24,-50,53v0,28,21,53,51,53","w":239,"k":{"*":7,"\\":29,"?":18,"v":11,"x":13,"}":5,"]":7,")":11,"w":9,"y":11,".":7,",":7,"\u2026":7,"z":7,"\u201c":7,"\u2018":7}},"p":{"d":"24,58r0,-251r55,0r0,28v44,-62,148,-27,148,69v0,95,-101,129,-148,71r0,83r-55,0xm125,-43v26,0,47,-21,47,-54v0,-32,-21,-53,-47,-53v-26,0,-47,21,-47,54v0,32,21,53,47,53","w":243,"k":{"*":5,"\\":25,"?":13,"v":9,"x":11,"}":5,"]":7,")":11,"w":7,"y":9,".":4,",":4,"\u2026":4,"z":5,"\u201c":4,"\u2018":4}},"q":{"d":"164,58r0,-86v-44,62,-148,27,-148,-69v0,-95,101,-129,148,-71r0,-25r55,0r0,251r-55,0xm118,-43v26,0,47,-21,47,-54v0,-32,-21,-53,-47,-53v-26,0,-47,21,-47,54v0,32,21,53,47,53","w":243,"k":{"\\":18}},"r":{"d":"24,0r0,-193r55,0r0,39v11,-27,30,-44,62,-43r0,58v-65,-8,-65,71,-62,139r-55,0","w":150,"k":{"*":-7,"\\":11,"\/":27,".":32,",":32,"\u2026":32,"\u201d":-13,"\u2019":-13,"a":9,"d":4,"g":4,"q":4,"c":5,"e":5,"o":5,"z":4,"\u201c":-7,"\u2018":-7}},"s":{"d":"166,-59v0,80,-108,76,-157,33r24,-36v21,15,43,23,61,23v16,0,23,-5,23,-15v0,-12,-19,-16,-40,-22v-27,-8,-59,-21,-58,-59v0,-70,96,-74,143,-39r-21,38v-19,-11,-38,-18,-52,-18v-13,0,-21,6,-21,14v0,11,19,16,40,23v27,9,58,23,58,58","w":180,"k":{"\\":27,"?":13,"v":7,"x":9,"}":4,"]":5,")":7,"w":5,"y":5,"s":4,"z":4,"t":4,"\u201c":4,"\u2018":4}},"t":{"d":"133,-8v-39,20,-100,18,-100,-47r0,-91r-23,0r0,-47r23,0r0,-49r55,0r0,49r46,0r0,47r-46,0r0,82v-2,26,30,20,45,12r0,44","w":149,"k":{"\\":14,"\u201d":-4,"\u2019":-4,"d":5,"g":5,"q":5,"c":5,"e":5,"o":5}},"u":{"d":"145,-27v-28,51,-122,35,-122,-41r0,-125r55,0v6,52,-21,147,33,147v55,0,28,-95,34,-147r55,0r0,193r-55,0r0,-27","w":224,"k":{"\\":18}},"v":{"d":"83,1r-76,-194r58,0r43,129r44,-129r57,0r-76,194r-50,0","w":216,"k":{"}":4,"]":7,"\\":18,"\/":25,"?":4,"x":4,"v":5,"w":5,"y":5,".":31,",":31,"\u2026":31,"a":9,"d":9,"g":9,"q":9,"c":11,"e":11,"o":11,"s":7,"z":2,"-":5,"\u2013":5,"\u2014":5}},"w":{"d":"68,1r-59,-194r55,0r31,117r36,-118r48,0r36,118r32,-117r54,0r-60,194r-49,0r-37,-118r-38,118r-49,0","w":309,"k":{"\\":18,"?":4,"v":5,"x":4,"}":4,"]":7,"\/":22,"w":4,"y":4,".":25,",":25,"\u2026":25,"a":7,"d":7,"g":7,"q":7,"c":9,"e":9,"o":9,"s":5,"z":2,"-":4,"\u2013":4,"\u2014":4}},"x":{"d":"143,0r-39,-60r-38,60r-58,0r68,-98r-65,-95r58,0r36,57r37,-57r57,0r-65,94r68,99r-59,0","w":210,"k":{"}":4,"]":4,"\\":18,"?":5,"v":4,"w":4,"y":4,"a":5,"d":11,"g":11,"q":11,"c":13,"e":13,"o":13,"s":7,"-":11,"\u2013":11,"\u2014":11}},"y":{"d":"134,5v-16,60,-67,64,-112,40r18,-39v15,7,35,14,43,-5r-76,-194r58,0r44,131r42,-131r57,0","w":216,"k":{"\\":18,"?":4,"v":5,"x":4,"}":4,"]":7,"\/":25,"w":4,"y":4,".":31,",":31,"\u2026":31,"a":9,"d":9,"g":9,"q":9,"c":11,"e":11,"o":11,"s":7,"z":2,"-":5,"\u2013":5,"\u2014":5}},"z":{"d":"18,0r0,-39r100,-110r-97,0r0,-44r165,0r0,39r-100,110r100,0r0,44r-168,0","w":202,"k":{"\\":16,"d":5,"g":5,"q":5,"c":5,"e":5,"o":5}},"0":{"d":"131,4v-67,0,-112,-56,-112,-130v0,-73,46,-130,113,-130v67,0,111,56,111,130v0,73,-45,130,-112,130xm132,-46v33,0,54,-34,54,-80v0,-46,-22,-80,-55,-80v-33,0,-55,34,-55,80v0,46,23,80,56,80","w":262,"k":{"\/":13,"7":9,"3":4,"2":4,"1":2,".":7,",":7,"\u2026":7}},"1":{"d":"64,0r0,-198r-44,11r-11,-45v35,-9,62,-26,110,-22r0,254r-55,0","w":151},"2":{"d":"18,0r0,-44r84,-69v31,-26,43,-39,43,-60v0,-21,-14,-33,-34,-33v-19,0,-32,11,-51,34r-39,-31v25,-34,49,-53,94,-53v52,0,87,31,87,79v0,55,-68,94,-108,129r110,0r0,48r-186,0","w":224,"k":{"7":2,"4":5}},"3":{"d":"112,4v-45,0,-76,-17,-98,-43r38,-37v17,19,35,31,61,31v21,0,35,-12,35,-32v0,-28,-36,-35,-72,-32r-9,-35r60,-60r-99,0r0,-48r171,0r0,42r-64,61v34,6,68,23,68,71v0,48,-35,82,-91,82","w":223,"k":{"\/":4,"9":2,"7":7,"5":2}},"4":{"d":"143,0r0,-54r-123,0r-9,-40r138,-160r47,0r0,155r34,0r0,45r-34,0r0,54r-53,0xm76,-99r67,0r0,-79","w":248,"k":{"\/":7,"9":4,"7":11,"1":7}},"5":{"d":"206,-84v0,98,-141,111,-191,51r34,-40v19,17,38,27,60,27v26,0,42,-13,42,-36v0,-39,-59,-40,-87,-25r-32,-21r8,-124r154,0r0,49r-107,0r-3,43v60,-14,122,7,122,76","w":226,"k":{"\/":7,"9":2,"7":11,"3":2,"2":4}},"6":{"d":"122,4v-74,0,-103,-38,-103,-123v0,-78,36,-137,111,-137v34,0,57,9,79,27r-29,43v-37,-36,-102,-22,-103,38v49,-34,141,-11,141,65v0,51,-41,87,-96,87xm120,-43v27,0,43,-15,43,-38v0,-21,-17,-37,-44,-37v-27,0,-43,16,-43,37v0,21,17,38,44,38","w":238,"k":{"\/":4,"9":4,"7":5,"3":4,"1":4}},"7":{"d":"30,0r113,-204r-119,0r0,-48r182,0r0,42r-113,210r-63,0","w":222,"k":{"\/":50,"9":5,"8":4,"6":7,"5":9,"4":31,"3":7,"2":5,"1":-4,"0":7,".":36,",":36,"\u2026":36,"-":11,"\u2013":11,"\u2014":11}},"8":{"d":"113,4v-56,0,-97,-29,-97,-74v0,-31,14,-49,41,-61v-60,-35,-29,-125,56,-125v84,0,118,89,57,125v26,13,41,30,41,60v0,47,-42,75,-98,75xm113,-149v22,0,36,-13,36,-31v0,-15,-13,-30,-36,-30v-23,0,-36,14,-36,30v0,18,14,31,36,31xm113,-42v27,0,44,-13,44,-32v0,-19,-19,-31,-44,-31v-25,0,-43,12,-43,32v0,17,16,31,43,31","w":226,"k":{"9":2,"7":4}},"9":{"d":"116,-256v74,0,103,38,103,123v0,82,-38,137,-110,137v-37,0,-62,-12,-83,-30r29,-42v38,37,104,27,106,-35v-49,39,-141,8,-141,-65v0,-51,39,-88,96,-88xm119,-132v27,0,43,-16,43,-38v0,-22,-16,-39,-44,-39v-27,0,-43,16,-43,39v0,22,17,38,44,38","w":238,"k":{"\/":9,"7":4,"5":2,"3":4,"2":4,".":4,",":4,"\u2026":4}},".":{"d":"22,0r0,-58r59,0r0,58r-59,0","w":102,"k":{"V":43,"v":31,"j":-5,"1":18,"7":7,"0":7,"T":36,"W":36,"Y":47,"w":25,"y":22,"\u201d":14,"\u2019":14,"d":4,"g":4,"q":4,"c":7,"e":7,"o":7,"f":5,"t":9,"C":14,"G":14,"O":14,"Q":14,"U":5}},",":{"d":"14,58r-5,-22v25,-3,38,-15,36,-36r-23,0r0,-58r59,0v5,66,-4,121,-67,116","w":102,"k":{"y":22,"V":43,"v":31,"j":-5,"1":18,"7":7,"0":7,"T":36,"W":36,"Y":47,"w":25,"\u201d":14,"\u2019":14,"d":4,"g":4,"q":4,"c":7,"e":7,"o":7,"f":5,"t":9,"C":14,"G":14,"O":14,"Q":14,"U":5}},":":{"d":"24,-135r0,-58r58,0r0,58r-58,0xm24,0r0,-58r58,0r0,58r-58,0","w":106,"k":{"V":7,"T":4,"W":5,"Y":14}},";":{"d":"24,-135r0,-58r58,0r0,58r-58,0xm16,58r-5,-22v25,-3,37,-15,35,-36r-22,0r0,-58r58,0v4,65,-3,121,-66,116","w":106,"k":{"V":7,"T":4,"W":5,"Y":14}},"\u2026":{"d":"223,0r0,-56r57,0r0,56r-57,0xm123,0r0,-56r57,0r0,56r-57,0xm22,0r0,-56r57,0r0,56r-57,0","w":302,"k":{"V":43,"v":31,"j":-5,"1":18,"7":7,"0":7,"T":36,"W":36,"Y":47,"w":25,"y":22,"\u201d":14,"\u2019":14,"d":4,"g":4,"q":4,"c":7,"e":7,"o":7,"f":5,"t":9,"C":14,"G":14,"O":14,"Q":14,"U":5}},"&":{"d":"200,5r-29,-29v-47,48,-159,33,-159,-46v0,-32,17,-55,49,-69v-36,-50,-14,-117,59,-117v43,0,71,28,71,64v0,34,-22,54,-53,66r33,33v8,-13,17,-28,25,-43r41,22v-10,18,-21,37,-34,54r37,37xm109,-156v22,-8,34,-17,34,-34v0,-14,-10,-23,-24,-23v-31,1,-31,39,-10,57xm68,-72v-1,35,50,37,72,16r-49,-49v-17,9,-23,21,-23,33","w":250,"k":{"V":20,"T":18,"W":16,"Y":22}},"!":{"d":"43,-86r-17,-166r64,0r-17,166r-30,0xm29,0r0,-58r58,0r0,58r-58,0","w":116},"?":{"d":"63,-144v38,-7,67,-13,64,-35v-6,-40,-67,-29,-87,-1r-33,-36v38,-57,176,-55,176,36v0,46,-32,64,-71,72r-4,22r-37,0xm59,0r0,-58r58,0r0,58r-58,0","w":195},"\u201c":{"d":"112,-138v-5,-66,5,-120,67,-116r4,23v-25,3,-37,15,-35,36r22,0r0,57r-58,0xm21,-138v-4,-65,4,-120,66,-116r5,23v-25,3,-37,15,-35,36r22,0r0,57r-58,0","w":194,"k":{"J":29,"A":32,"a":4,"d":5,"g":5,"q":5,"c":5,"e":5,"o":5,"s":4,"z":4,"t":-5}},"\u201d":{"d":"107,-136r-4,-23v25,-3,37,-14,35,-35r-22,0r0,-58r58,0v5,66,-4,121,-67,116xm16,-136r-5,-23v25,-3,37,-14,35,-35r-22,0r0,-58r58,0v4,65,-3,121,-66,116","w":194,"k":{"J":36,"A":36,"a":7,"d":11,"g":11,"q":11,"c":13,"e":13,"o":13,"s":5}},"\u2018":{"d":"21,-138v-4,-65,4,-120,66,-116r5,23v-25,3,-37,15,-35,36r22,0r0,57r-58,0","w":102,"k":{"J":29,"A":32,"a":4,"d":5,"g":5,"q":5,"c":5,"e":5,"o":5,"s":4,"z":4,"t":-5}},"\u2019":{"d":"16,-136r-5,-23v25,-3,37,-14,35,-35r-22,0r0,-58r58,0v4,65,-3,121,-66,116","w":102,"k":{"J":36,"A":36,"a":7,"d":11,"g":11,"q":11,"c":13,"e":13,"o":13,"s":5}},"-":{"d":"18,-85r0,-53r111,0r0,53r-111,0","w":146,"k":{"V":14,"X":18,"v":5,"x":11,"1":11,"7":14,"3":4,"T":32,"W":13,"Y":29,"w":4,"y":5,"A":14,"Z":11,"z":4}},"\u2013":{"d":"18,-86r0,-51r154,0r0,51r-154,0","w":190,"k":{"V":14,"X":18,"v":5,"x":11,"1":11,"7":14,"3":4,"T":32,"W":13,"Y":29,"w":4,"y":5,"A":14,"Z":11,"z":4}},"\u2014":{"d":"18,-86r0,-51r287,0r0,51r-287,0","w":323,"k":{"V":14,"X":18,"v":5,"x":11,"1":11,"7":14,"3":4,"T":32,"W":13,"Y":29,"w":4,"y":5,"A":14,"Z":11,"z":4}},"_":{"d":"-1,58r0,-42r218,0r0,42r-218,0","w":216},"\/":{"d":"-10,46r159,-333r47,0r-160,333r-46,0","w":190,"k":{"\/":58,"9":7,"8":5,"7":4,"6":13,"5":7,"4":34,"3":4,"2":7,"1":-4,"0":13,"x":18,"v":18,"J":47,"w":18,"y":18,"A":43,"Z":7,"a":23,"d":25,"g":25,"q":25,"c":29,"e":29,"o":29,"s":31,"z":22,"f":9,"t":7,"u":18,"S":11,"m":18,"n":18,"p":18,"r":18,"C":14,"G":14,"O":14,"Q":14}},"\\":{"d":"154,46r-159,-333r46,0r160,333r-47,0","w":190,"k":{"v":25,"j":-11,"V":43,"T":32,"W":36,"Y":40,"w":22,"y":22,"f":4,"t":11,"C":14,"G":14,"O":14,"Q":14,"U":5}},"|":{"d":"41,46r0,-333r44,0r0,333r-44,0","w":126},"(":{"d":"121,51v-133,-61,-133,-247,0,-308r24,36v-93,58,-93,177,0,235","w":160,"k":{"j":-11,"g":11,"J":5,"d":11,"q":11,"c":11,"e":11,"o":11,"s":5,"C":11,"G":11,"O":11,"Q":11}},")":{"d":"39,51r-24,-37v95,-58,94,-177,0,-235r24,-36v133,61,133,247,0,308","w":160},"[":{"d":"30,47r0,-299r116,0r0,43r-64,0r0,213r64,0r0,43r-116,0","w":167,"k":{"x":4,"v":7,"j":-11,"J":4,"w":7,"y":4,"a":4,"d":7,"g":7,"q":7,"c":7,"e":7,"o":7,"s":5,"C":7,"G":7,"O":7,"Q":7}},"]":{"d":"21,47r0,-43r64,0r0,-213r-64,0r0,-43r117,0r0,299r-117,0","w":167},"{":{"d":"150,51v-77,-17,-87,-36,-83,-96v2,-31,-17,-38,-49,-37r0,-42v44,6,48,-20,48,-62v0,-37,18,-59,84,-71r9,36v-50,14,-43,27,-42,69v0,26,-14,41,-38,49v33,9,37,35,37,75v0,22,5,31,43,42","w":176,"k":{"x":4,"v":4,"j":-13,"g":5,"J":4,"w":4,"y":4,"d":5,"q":5,"c":5,"e":5,"o":5,"s":4,"z":4,"C":7,"G":7,"O":7,"Q":7}},"}":{"d":"27,51r-10,-37v50,-14,44,-26,43,-69v0,-26,13,-40,37,-48v-33,-9,-36,-36,-36,-75v0,-22,-6,-32,-44,-43r10,-36v77,17,87,35,83,96v-2,32,17,38,49,37r0,42v-43,-6,-48,19,-48,61v0,37,-18,60,-84,72","w":176},"@":{"d":"180,58v-92,0,-161,-71,-161,-157v0,-86,70,-157,158,-157v88,0,157,68,157,142v0,90,-84,112,-127,69v-36,40,-119,22,-119,-48v0,-74,89,-120,130,-66r4,-19r43,7r-18,108v0,13,9,23,26,23v26,0,46,-26,46,-74v0,-67,-61,-128,-142,-128v-81,0,-143,64,-143,143v0,79,61,143,146,143v36,0,61,-8,88,-24r7,11v-28,17,-58,27,-95,27xm166,-60v23,0,43,-22,43,-52v0,-21,-14,-34,-33,-34v-23,0,-44,22,-44,51v0,22,14,35,34,35","w":352},"\u2122":{"d":"124,-141r0,-111r27,0r29,47r29,-47r26,0r0,111r-24,0r0,-75v-11,16,-18,36,-32,49r-31,-49r0,75r-24,0xm42,-141r0,-89r-33,0r0,-22r92,0r0,22r-33,0r0,89r-26,0","w":248},"*":{"d":"63,-134r5,-43r-35,27r-15,-26r41,-17r-41,-17r15,-26r35,26r-5,-43r29,0r-6,43r35,-26r15,26r-40,17r40,17r-15,26r-35,-27r6,43r-29,0","w":154,"k":{"J":29,"A":36,"a":4,"d":5,"g":5,"q":5,"c":7,"e":7,"o":7,"s":4,"t":-4}},"$":{"d":"101,35r0,-36v-31,-4,-61,-16,-85,-34r28,-41v19,15,38,25,59,29r0,-57v-52,-14,-78,-34,-78,-77v0,-40,31,-66,76,-71r0,-21r37,0r0,22v26,3,47,12,67,26r-24,42v-14,-10,-30,-17,-45,-21r0,55v55,15,79,37,79,78v0,40,-32,66,-77,71r0,35r-37,0xm136,-45v36,-5,35,-42,0,-51r0,51xm103,-207v-35,4,-34,41,0,49r0,-49","w":232,"k":{"7":4}},"#":{"d":"227,-100r0,46r-40,0r-9,54r-48,0r9,-54r-52,0r-9,54r-47,0r9,-54r-27,0r0,-46r35,0r9,-53r-32,0r0,-46r40,0r9,-53r47,0r-9,53r53,0r9,-53r47,0r-9,53r27,0r0,46r-35,0r-9,53r32,0xm103,-155r-9,56r54,0r10,-56r-55,0","w":252},"%":{"d":"77,-126v-36,0,-61,-29,-61,-64v0,-36,25,-65,62,-65v36,0,61,29,61,65v0,35,-25,64,-62,64xm101,-190v0,-17,-10,-32,-24,-32v-15,0,-23,14,-23,32v0,17,10,31,24,31v15,0,23,-15,23,-31xm41,0r184,-252r43,0r-184,252r-43,0xm232,3v-36,0,-61,-29,-61,-65v0,-36,25,-64,62,-64v36,0,60,29,60,64v0,35,-24,65,-61,65xm233,-30v15,0,23,-15,23,-32v0,-17,-10,-31,-24,-31v-15,0,-23,14,-23,31v0,17,10,32,24,32","w":309},"\"":{"d":"105,-137r7,-115v19,2,45,-4,60,2r-39,113r-28,0xm21,-137r6,-115v19,2,45,-4,60,2r-39,113r-27,0","w":187},"'":{"d":"21,-137r6,-115v19,2,46,-4,61,2r-39,113r-28,0","w":102},"+":{"d":"90,-37r0,-65r-66,0r0,-50r66,0r0,-64r51,0r0,64r65,0r0,50r-65,0r0,65r-51,0"},"=":{"d":"26,-149r0,-49r178,0r0,49r-178,0xm26,-55r0,-50r178,0r0,50r-178,0"},"\u00d7":{"d":"171,-37r-56,-57r-56,57r-33,-34r57,-55r-57,-56r34,-34r56,57r55,-57r34,33r-57,56r57,56"},"<":{"d":"199,-26r-175,-76r0,-50r175,-76r0,51r-122,50r122,50r0,51"},">":{"d":"32,-26r0,-50r121,-50r-121,-50r0,-52r174,76r0,50"},"^":{"d":"18,-177r53,-75r38,0r53,75r-40,0r-32,-43r-33,43r-39,0","w":180},"~":{"d":"47,-81r-29,-9v8,-30,19,-49,44,-49v34,1,61,33,75,-4r29,9v-8,30,-20,50,-45,50v-33,0,-61,-33,-74,3","w":183},"`":{"d":"86,-214r-46,-43r47,-21r40,64r-41,0","w":180},"\u00a0":{"w":108}}});

/*!
 * The following copyright notice may not be removed under any circumstances.
 * 
 * Copyright:
 * Copyright (C) 2000, 2007 Hoefler & Frere-Jones. http://www.typography.com
 * 
 * Trademark:
 * Gotham is a trademark of Hoefler & Frere-Jones, which may be registered in
 * certain jurisdictions.
 * 
 * Full name:
 * Gotham-BookItalic
 * 
 * Manufacturer:
 * Hoefler & Frere-Jones
 * 
 * Designer:
 * Tobias Frere-Jones
 * 
 * Vendor URL:
 * www.typography.com
 * 
 * License information:
 * http://www.typography.com/support/eula.html
 */
Cufon.registerFont({"w":237,"face":{"font-family":"Gotham Book","font-weight":325,"font-style":"italic","font-stretch":"normal","units-per-em":"360","panose-1":"2 0 6 3 4 0 0 2 0 4","ascent":"288","descent":"-72","x-height":"4","bbox":"-45 -287 419 59.0222","underline-thickness":"7.2","underline-position":"-40.68","slope":"-12","stemh":"24","stemv":"29","unicode-range":"U+0020-U+2122"},"glyphs":{" ":{"w":108},"A":{"d":"-14,0r182,-254r28,0r47,254r-30,0r-11,-67r-138,0r-47,67r-31,0xm82,-92r115,0r-22,-129","w":273},"B":{"d":"11,0r67,-252v73,-1,173,-10,173,59v0,36,-27,59,-63,66v25,8,45,24,45,52v0,44,-40,75,-106,75r-116,0xm76,-140v62,2,146,4,146,-50v0,-47,-75,-35,-123,-36xm46,-26v65,1,158,8,158,-50v0,-50,-83,-36,-135,-38","w":258,"k":{"?":2,"v":4,"X":2,"V":8,"T":13,"W":8,"Y":11,"a":-7,"s":-5,"w":4,"y":4}},"C":{"d":"138,5v-59,0,-107,-40,-107,-105v0,-81,67,-156,151,-156v47,0,78,23,95,54r-25,15v-15,-26,-36,-43,-73,-43v-66,0,-119,62,-119,129v0,88,114,100,157,45r20,19v-23,23,-54,42,-99,42","w":264,"k":{"V":4,"X":3,"v":4,"x":4,"T":4,"W":4,"Y":7,"w":4,"y":4,"d":4,"g":4,"q":4,"c":4,"e":4,"o":4,"C":9,"G":9,"O":9,"Q":9,"-":6,"\u2013":6,"\u2014":6,"U":5}},"D":{"d":"265,-146v-1,90,-75,146,-169,146r-85,0r67,-252v102,-6,188,11,187,106xm235,-144v1,-70,-60,-87,-135,-82r-54,200v104,9,187,-25,189,-118","w":278,"k":{"V":20,"X":11,"*":3,"\\":14,"?":7,"x":4,"J":4,"}":4,"]":4,")":4,"\/":14,"T":24,"W":17,"Y":24,"A":8,"Z":10,".":14,",":14,"\u2026":14,"S":3}},"E":{"d":"11,0r67,-252r181,0r-7,26r-152,0r-23,86r135,0r-7,26r-135,0r-24,88r154,0r-7,26r-182,0","w":235,"k":{"v":4,"w":4,"y":4,"d":4,"g":4,"q":4,"c":4,"e":4,"o":4}},"F":{"d":"11,0r67,-252r182,0r-7,26r-153,0r-24,90r136,0r-7,26r-136,0r-30,110r-28,0","w":236,"k":{"\/":25,"?":-4,"&":5,"x":16,"v":10,"J":37,"a":15,"s":13,"w":10,"y":10,"A":25,"Z":5,".":31,",":31,"\u2026":31,"\u201d":-7,"\u2019":-7,"d":8,"g":8,"q":8,"f":5,"m":6,"n":6,"p":6,"r":6,"c":8,"e":8,"o":8,"C":5,"G":5,"O":5,"Q":5,"t":5,"u":8,"z":13}},"G":{"d":"232,-22v-73,53,-201,26,-201,-81v0,-78,66,-153,155,-153v52,0,79,22,95,46r-22,17v-15,-21,-35,-37,-76,-37v-70,0,-122,62,-122,126v0,81,94,100,149,65r19,-70r-76,0r7,-26r104,0","w":282,"k":{"V":8,"\\":5,"?":4,"v":2,"T":13,"W":6,"Y":11,"a":-4,"y":2}},"H":{"d":"11,0r67,-252r29,0r-30,112r144,0r30,-112r28,0r-67,252r-29,0r30,-113r-143,0r-31,113r-28,0","w":272},"I":{"d":"13,0r68,-252r28,0r-67,252r-29,0","w":104},"J":{"d":"132,-21v-39,44,-125,26,-137,-29r23,-13v12,45,68,54,95,23v41,-46,45,-145,68,-212r29,0v-26,75,-32,178,-78,231","w":197,"k":{"X":1,"J":7,"A":4,".":5,",":5,"\u2026":5}},"K":{"d":"11,0r67,-252r29,0r-40,150r181,-150r40,0r-135,111r71,141r-32,0r-62,-125r-73,61r-18,64r-28,0","w":258,"k":{"V":9,"v":19,"&":2,"T":4,"W":7,"Y":7,"a":4,"s":5,"w":15,"y":14,"A":11,"d":9,"g":9,"q":9,"f":7,"c":11,"e":11,"o":11,"C":16,"G":16,"O":16,"Q":16,"t":9,"u":7,"S":5,"-":18,"\u2013":18,"\u2014":18,"U":9}},"L":{"d":"11,0r67,-252r29,0r-61,226r142,0r-7,26r-170,0","w":218,"k":{"g":18,"V":40,"*":29,"\\":43,"?":22,"v":27,"J":3,"&":5,"T":36,"W":34,"Y":40,"a":3,"w":25,"y":27,"\u201d":14,"\u2019":14,"d":18,"q":18,"f":7,"c":18,"e":18,"o":18,"C":27,"G":27,"O":27,"Q":27,"t":11,"u":9,"S":6,"-":24,"\u2013":24,"\u2014":24,"U":18,"\u201c":14,"\u2018":14,"\u2122":32}},"M":{"d":"11,0r67,-252r27,0r54,138r129,-138r32,0r-68,252r-29,0r55,-204r-129,135r-55,-135r-55,204r-28,0","w":312},"N":{"d":"11,0r67,-252r27,0r102,204r55,-204r28,0r-68,252r-22,0r-105,-209r-56,209r-28,0","w":282},"O":{"d":"142,5v-65,0,-110,-48,-110,-110v0,-78,64,-151,147,-151v65,0,110,48,110,109v0,78,-64,152,-147,152xm144,-22v66,0,115,-61,115,-124v0,-48,-32,-84,-82,-84v-66,0,-115,62,-115,125v0,48,32,83,82,83","w":303,"k":{"V":18,"X":9,"*":4,"\\":14,"?":7,"v":4,"x":2,"J":4,"}":4,"]":4,")":4,"\/":14,"T":26,"W":17,"Y":24,"y":4,"A":4,"Z":9,".":14,",":14,"\u2026":14,"S":3}},"P":{"d":"78,-252v80,-1,169,-8,169,70v0,79,-89,100,-184,92r-24,90r-28,0xm218,-180v0,-52,-64,-47,-118,-46r-30,111v72,5,148,-5,148,-65","w":240,"k":{"\/":22,"v":-4,"X":14,"V":5,"J":29,"T":7,"W":5,"Y":9,"a":4,"w":-4,"y":-4,"A":18,"Z":9,".":35,",":35,"\u2026":35,"\u201d":-7,"\u2019":-7,"f":-5,"c":2,"e":2,"o":2,"C":-2,"G":-2,"O":-2,"Q":-2,"t":-5,"u":-2}},"Q":{"d":"242,10r-23,-29v-73,55,-187,9,-187,-86v0,-78,64,-151,147,-151v65,0,110,48,110,109v0,42,-19,83,-50,112r25,29xm62,-105v0,73,85,106,140,65r-39,-46r22,-17r37,46v57,-49,49,-173,-45,-173v-66,0,-115,62,-115,125","w":303,"k":{"*":4,"\\":14,"?":7,"x":2,"V":18,"T":26,"W":17,"Y":24,".":14,",":14,"\u2026":14}},"R":{"d":"257,-185v-1,52,-42,77,-92,84r51,101r-32,0r-50,-98r-68,0r-27,98r-28,0r67,-252v81,0,181,-12,179,67xm228,-183v2,-54,-73,-42,-128,-43r-28,103v73,2,154,4,156,-60","w":258,"k":{"V":7,"J":4,"T":12,"W":5,"Y":9,"a":-3,"A":4,"f":-4,"C":1,"G":1,"O":1,"Q":1,"t":-4,"S":-2,"U":1}},"S":{"d":"107,4v-46,0,-81,-18,-103,-48r22,-17v21,26,46,39,83,39v36,0,64,-20,64,-47v0,-19,-13,-31,-52,-46v-46,-18,-69,-35,-69,-68v0,-42,39,-73,93,-73v39,0,70,17,89,39r-21,18v-25,-43,-131,-41,-131,13v0,21,16,32,56,47v43,17,65,34,65,66v0,44,-42,77,-96,77","w":229,"k":{"V":13,"X":4,"\\":7,"?":4,"v":5,"x":5,"T":12,"W":11,"Y":12,"w":4,"y":5,"A":2,"f":2,"C":5,"G":5,"O":5,"Q":5,"t":2,"z":2,"S":4,"U":7}},"T":{"d":"71,0r60,-226r-85,0r7,-26r199,0r-8,26r-85,0r-60,226r-28,0","w":221,"k":{"v":31,"x":31,"J":32,"\/":32,"&":15,"j":12,"a":37,"s":33,"w":30,"y":31,"A":29,"Z":6,".":29,",":29,"\u2026":29,"d":36,"g":36,"q":36,"f":16,"m":32,"n":32,"p":32,"r":32,"c":37,"e":37,"o":37,"C":10,"G":10,"O":10,"Q":10,"t":15,"u":31,"z":31,"S":-1,":":14,";":14,"-":31,"\u2013":31,"\u2014":31,"b":6,"h":6,"k":6,"l":6,"i":12}},"U":{"d":"203,-27v-49,55,-179,31,-170,-50v7,-64,29,-116,42,-175r28,0v-13,58,-33,108,-41,172v-7,58,86,76,122,35v40,-46,49,-141,71,-207r28,0v-25,75,-34,173,-80,225","w":272,"k":{"X":5,"x":2,"J":7,"\/":5,"A":7,".":5,",":5,"\u2026":5}},"V":{"d":"89,2r-40,-254r31,0r31,217r147,-217r32,0r-176,254r-25,0","w":258,"k":{"\/":38,"&":6,"x":15,"v":9,"j":7,"X":7,"V":7,"J":36,"G":4,"C":4,"W":7,"Y":5,"a":14,"s":13,"w":9,"y":9,"A":27,"Z":7,".":43,",":43,"\u2026":43,"d":14,"g":14,"q":14,"f":2,"m":13,"n":13,"p":13,"r":13,"c":14,"e":14,"o":14,"O":4,"Q":4,"t":2,"u":13,"z":11,"S":2,":":7,";":7,"-":14,"\u2013":14,"\u2014":14,"b":4,"h":4,"k":4,"l":4,"i":7}},"W":{"d":"74,2r-22,-254r30,0r16,210r124,-211r24,0r13,211r128,-210r32,0r-158,254r-24,0r-15,-204r-123,204r-25,0","w":389,"k":{"V":7,"X":5,"v":13,"x":14,"J":32,"\/":36,"&":8,"j":5,"W":4,"Y":4,"a":14,"s":13,"w":13,"y":13,"A":23,"Z":7,".":36,",":36,"\u2026":36,"d":15,"g":15,"q":15,"f":4,"m":11,"n":11,"p":11,"r":11,"c":14,"e":14,"o":14,"C":4,"G":4,"O":4,"Q":4,"t":4,"u":11,"z":9,"S":2,":":5,";":5,"-":13,"\u2013":13,"\u2014":13,"b":4,"h":4,"k":4,"l":4,"i":5}},"X":{"d":"-11,0r129,-130r-63,-122r31,0r53,103r100,-103r37,0r-125,126r66,126r-32,0r-54,-108r-105,108r-37,0","w":249,"k":{"?":5,"&":1,"v":18,"j":4,"g":10,"V":7,"J":4,"W":5,"Y":4,"a":4,"w":14,"y":14,"A":7,"d":10,"q":10,"f":7,"c":12,"e":12,"o":12,"C":13,"G":13,"O":13,"Q":13,"t":4,"u":9,"S":5,"-":18,"\u2013":18,"\u2014":18,"b":4,"h":4,"k":4,"l":4,"i":4,"U":7}},"Y":{"d":"78,0r27,-102r-62,-150r32,0r50,127r119,-127r36,0r-148,155r-25,97r-29,0","w":238,"k":{"V":5,"X":4,"v":16,"x":21,"J":40,"\/":34,"&":8,"j":7,"W":4,"a":23,"s":18,"w":16,"y":16,"A":27,"Z":4,".":37,",":37,"\u2026":37,"d":21,"g":21,"q":21,"f":5,"m":21,"n":21,"p":21,"r":21,"c":21,"e":21,"o":21,"C":5,"G":5,"O":5,"Q":5,"t":5,"u":21,"z":14,":":9,";":9,"-":26,"\u2013":26,"\u2014":26,"b":4,"h":4,"k":4,"l":4,"i":7}},"Z":{"d":"-7,0r5,-19r215,-207r-154,0r8,-26r195,0r-5,19r-216,207r161,0r-7,26r-202,0","w":240,"k":{"v":7,"J":5,"&":4,"a":3,"s":1,"w":5,"y":5,"Z":4,"d":7,"g":7,"q":7,"f":4,"c":9,"e":9,"o":9,"C":10,"G":10,"O":10,"Q":10,"S":4,"-":11,"\u2013":11,"\u2014":11}},"a":{"d":"135,-29v-28,44,-125,48,-128,-19v-3,-67,92,-78,149,-57v9,-35,-4,-60,-47,-59v-20,0,-35,4,-52,10r-6,-23v48,-23,141,-14,135,46v-5,48,-22,87,-31,131r-28,0xm75,-18v36,0,69,-29,76,-68v-39,-13,-116,-14,-116,35v0,20,16,33,40,33","w":207,"k":{"*":8,"\\":27,"?":13,"v":11,"w":7,"y":11,"t":4}},"b":{"d":"115,4v-38,0,-60,-22,-70,-46r-11,42r-28,0r71,-263r27,0r-29,109v38,-57,144,-44,144,43v0,66,-50,115,-104,115xm112,-20v75,0,115,-146,26,-146v-41,0,-83,43,-83,88v0,32,23,58,57,58","k":{"*":9,"\\":25,"?":13,"v":10,"x":9,"}":5,"]":7,")":11,"w":11,"y":7,".":4,",":4,"\u2026":4,"f":1,"z":4,"\u201c":4,"\u2018":4,"\u2122":1}},"c":{"d":"172,-27v-44,53,-155,36,-155,-50v0,-61,51,-113,110,-113v39,0,62,20,74,43r-22,15v-11,-18,-26,-34,-54,-34v-42,0,-79,42,-79,88v0,66,77,73,110,33","w":202,"k":{"*":1,"\\":14,"?":5,"v":4,"x":1,")":4,"w":4,"y":1,"\u201d":-5,"\u2019":-5,"d":2,"g":2,"q":2,"f":1,"c":4,"e":4,"o":4,"\u201c":-4,"\u2018":-4}},"d":{"d":"162,-32v-38,58,-144,43,-144,-43v0,-66,50,-115,104,-115v38,0,60,22,70,46r32,-119r28,0r-71,263r-27,0xm100,-20v41,0,83,-42,83,-88v0,-32,-24,-58,-58,-58v-76,0,-115,146,-25,146"},"e":{"d":"45,-82v-9,66,77,78,113,40r15,19v-44,47,-156,30,-156,-52v0,-57,47,-115,109,-115v62,-1,85,56,65,108r-146,0xm49,-105r120,0v8,-32,-8,-62,-45,-62v-37,0,-65,28,-75,62","w":212,"k":{"*":9,"\\":29,"?":14,"v":8,"x":11,"}":4,"]":7,")":11,"w":8,"y":5,".":4,",":4,"\u2026":4,"z":2,"\u2122":1}},"f":{"d":"17,0r43,-162r-25,0r6,-24r26,0v7,-57,50,-97,107,-70r-7,24v-39,-21,-69,4,-73,46r61,0r-7,24r-60,0r-44,162r-27,0","w":135,"k":{"*":-11,"\\":-11,"?":-13,"x":1,"}":-11,"]":-7,")":-11,"\/":16,"a":6,"s":4,".":16,",":16,"\u2026":16,"\u201d":-13,"\u2019":-13,"d":2,"g":2,"q":2,"c":4,"e":4,"o":4,"z":4,"\u201c":-11,"\u2018":-11,"\u2122":-18}},"g":{"d":"158,32v-36,41,-125,30,-163,-6r18,-20v46,48,143,32,149,-35r5,-19v-38,52,-147,45,-147,-37v0,-99,142,-142,173,-60r10,-41r28,0v-23,70,-30,170,-73,218xm103,-38v42,0,80,-37,80,-75v0,-27,-21,-53,-57,-53v-40,0,-77,33,-77,78v0,33,26,50,54,50","k":{"\\":18}},"h":{"d":"6,0r71,-263r27,0r-28,107v17,-19,36,-34,64,-34v47,-1,67,40,55,86r-27,104r-28,0v10,-42,31,-80,31,-126v0,-24,-16,-39,-42,-39v-69,2,-77,105,-95,165r-28,0","w":220,"k":{"*":8,"\\":27,"?":11,"v":11,"w":5,"y":11}},"i":{"d":"68,-227r8,-30r32,0r-9,30r-31,0xm9,0r50,-186r27,0r-50,186r-27,0","w":95},"j":{"d":"68,-227r8,-30r32,0r-9,30r-31,0xm33,12v-12,40,-37,55,-76,43r7,-23v21,7,35,0,42,-23r53,-195r27,0","w":94},"k":{"d":"6,0r71,-263r27,0r-47,179r125,-102r38,0r-100,80r51,106r-31,0r-44,-88r-49,39r-13,49r-28,0","w":204,"k":{"\\":14,"v":4,"a":4,"s":1,"w":4,"y":4,"d":9,"g":9,"q":9,"c":11,"e":11,"o":11,"t":4,"u":4,"-":7,"\u2013":7,"\u2014":7}},"l":{"d":"9,0r70,-263r28,0r-71,263r-27,0","w":95},"m":{"d":"6,0r50,-186r28,0r-8,30v17,-19,35,-34,62,-34v31,0,47,20,52,42v25,-54,132,-61,132,16v0,47,-23,88,-33,132r-27,0v10,-42,31,-80,31,-126v0,-24,-15,-39,-39,-39v-66,0,-74,106,-92,165r-28,0v10,-42,31,-80,31,-126v0,-24,-15,-39,-39,-39v-66,0,-74,106,-92,165r-28,0","w":342,"k":{"*":8,"\\":27,"?":11,"v":11,"w":5,"y":11}},"n":{"d":"6,0r50,-186r28,0r-8,30v17,-19,36,-34,64,-34v47,-1,67,40,55,86r-27,104r-28,0v10,-42,31,-80,31,-126v0,-24,-16,-39,-42,-39v-69,2,-77,105,-95,165r-28,0","w":220,"k":{"*":8,"\\":27,"?":11,"v":11,"w":5,"y":11}},"o":{"d":"102,4v-51,0,-84,-35,-84,-83v0,-58,50,-111,109,-111v51,0,85,35,85,83v0,59,-52,111,-110,111xm104,-21v42,0,80,-41,80,-85v0,-38,-24,-60,-59,-60v-78,0,-117,145,-21,145","w":229,"k":{"*":11,"\\":29,"?":18,"v":12,"x":11,"}":5,"]":7,")":11,"w":9,"y":9,".":7,",":7,"\u2026":7,"f":1,"z":2,"\u201c":7,"\u2018":7,"\u2122":3}},"p":{"d":"-9,58r65,-244r28,0r-9,32v38,-57,144,-44,144,43v0,66,-50,115,-104,115v-38,0,-60,-22,-70,-46r-27,100r-27,0xm112,-20v75,0,115,-146,26,-146v-41,0,-83,43,-83,88v0,32,23,58,57,58","k":{"*":9,"\\":25,"?":13,"v":10,"x":9,"}":5,"]":7,")":11,"w":11,"y":7,".":4,",":4,"\u2026":4,"f":1,"z":4,"\u201c":4,"\u2018":4,"\u2122":1}},"q":{"d":"139,58r23,-90v-38,58,-144,43,-144,-43v0,-66,50,-115,104,-115v38,0,60,22,70,46r11,-42r28,0r-65,244r-27,0xm100,-20v41,0,83,-43,83,-88v0,-32,-24,-58,-58,-58v-76,0,-115,146,-25,146","k":{"\\":18}},"r":{"d":"6,0r50,-186r28,0r-13,48v23,-32,51,-53,88,-51v-4,9,-2,24,-9,30v-41,0,-81,30,-96,86r-20,73r-28,0","w":144,"k":{"*":-7,"\\":11,"\/":26,"a":5,".":31,",":31,"\u2026":31,"\u201d":-13,"\u2019":-13,"d":2,"g":2,"q":2,"c":2,"e":2,"o":2,"z":4,"\u201c":-7,"\u2018":-7,"\u2122":-2}},"s":{"d":"149,-55v-1,70,-111,75,-151,27r18,-18v20,19,43,27,65,27v21,0,41,-12,41,-31v0,-12,-8,-25,-36,-32v-77,-20,-63,-108,18,-108v27,0,54,12,69,25r-16,20v-22,-27,-93,-32,-95,7v0,12,7,20,37,32v33,14,50,27,50,51","w":178,"k":{"\\":27,"?":13,"v":5,"x":9,"}":4,"]":5,")":7,"s":4,"w":6,"y":1,"t":4,"z":4,"\u201c":4,"\u2018":4}},"t":{"d":"102,-2v-39,16,-85,-2,-72,-51r29,-109r-26,0r7,-24r26,0r15,-56r27,0r-15,56r59,0r-7,24r-58,0v-9,41,-26,76,-30,121v-2,23,32,22,52,14","w":144,"k":{"\\":14,"\u201d":-4,"\u2019":-4,"d":2,"g":2,"q":2,"c":4,"e":4,"o":4}},"u":{"d":"80,4v-47,1,-66,-40,-54,-86r27,-104r28,0v-10,43,-31,78,-31,126v0,24,15,39,41,39v70,-1,76,-105,95,-165r28,0r-49,186r-28,0r8,-30v-17,19,-37,34,-65,34","w":220,"k":{"\\":18}},"v":{"d":"62,1r-30,-187r29,0r21,154r103,-154r31,0r-130,187r-24,0","w":203,"k":{"}":4,"]":7,"\\":18,"\/":25,"?":4,"x":4,"v":5,"a":9,"s":5,"w":5,"y":5,".":31,",":31,"\u2026":31,"d":5,"g":5,"q":5,"c":7,"e":7,"o":7,"z":4,"-":5,"\u2013":5,"\u2014":5}},"w":{"d":"49,1r-14,-187r28,0r9,148r90,-149r23,0r11,149r89,-148r29,0r-116,187r-24,0r-11,-146r-90,146r-24,0","w":305,"k":{"\\":18,"?":4,"v":5,"x":4,"}":4,"]":7,"\/":22,"a":7,"s":5,"w":4,"y":4,".":25,",":25,"\u2026":25,"d":5,"g":5,"q":5,"c":5,"e":5,"o":5,"z":2,"-":4,"\u2013":4,"\u2014":4}},"x":{"d":"-13,0r100,-96r-46,-90r30,0r36,71r70,-71r35,0r-94,92r48,94r-30,0r-37,-76r-77,76r-35,0","w":203,"k":{"}":4,"]":4,"\\":18,"?":5,"v":5,"a":5,"s":5,"w":4,"y":5,"d":10,"g":10,"q":10,"c":12,"e":12,"o":12,"-":11,"\u2013":11,"\u2014":11}},"y":{"d":"90,6v-35,53,-69,66,-117,40r15,-21v33,16,51,12,77,-25r-34,-186r29,0r26,155r100,-155r31,0","w":206,"k":{"\\":18,"?":4,"v":6,"x":4,"}":4,"]":7,"\/":25,"a":9,"s":7,"w":4,"y":4,".":31,",":31,"\u2026":31,"d":5,"g":5,"q":5,"c":7,"e":7,"o":7,"z":2,"-":5,"\u2013":5,"\u2014":5}},"z":{"d":"-7,0r5,-18r159,-145r-116,0r7,-23r155,0r-5,18r-159,145r122,0r-7,23r-161,0","w":197,"k":{"\\":16,"s":1,"d":3,"g":3,"q":3,"c":5,"e":5,"o":5}},"0":{"d":"116,4v-57,0,-88,-40,-88,-97v0,-80,54,-163,131,-163v56,0,88,40,88,97v0,80,-54,163,-131,163xm118,-22v55,0,99,-71,99,-137v0,-41,-20,-71,-60,-71v-55,0,-100,71,-100,137v0,41,21,71,61,71","w":257,"k":{"\/":7,"7":10,"3":4,"2":4,"1":2,".":7,",":7,"\u2026":7}},"1":{"d":"34,0r59,-222r-51,15r-1,-25v30,-7,51,-23,89,-22r-68,254r-28,0","w":129},"2":{"d":"-8,0r6,-22r144,-110v28,-21,42,-37,42,-59v0,-22,-18,-39,-48,-39v-28,0,-50,16,-69,35r-18,-18v23,-24,51,-43,89,-43v45,0,76,26,76,63v0,30,-18,52,-54,79r-116,88r134,0r-7,26r-179,0","w":214,"k":{"\/":-4,"7":4,"4":9}},"3":{"d":"190,-80v0,91,-161,113,-189,35r22,-14v20,54,137,46,137,-18v0,-32,-33,-45,-76,-43r-4,-16r102,-90r-124,0r7,-26r164,0r-6,21r-102,90v38,3,69,22,69,61","w":217,"k":{"\/":1,"9":2,"7":8,"5":2}},"4":{"d":"127,0r17,-60r-131,0r-4,-21r187,-173r27,0r-46,170r40,0r-7,24r-39,0r-16,60r-28,0xm46,-84r104,0r35,-128","w":233,"k":{"\/":2,"9":4,"7":13,"1":7}},"5":{"d":"90,4v-41,0,-70,-20,-87,-45r22,-16v16,22,38,36,68,36v82,0,102,-111,16,-110v-15,0,-34,4,-51,13r-17,-13r40,-121r141,0r-8,26r-115,0r-26,79v53,-24,122,2,122,62v0,48,-42,89,-105,89","w":217,"k":{"\/":2,"9":2,"7":11,"3":2,"2":4}},"6":{"d":"28,-89v1,-87,50,-167,133,-167v33,0,58,13,75,32r-19,20v-28,-33,-87,-35,-119,0v-18,20,-36,51,-39,82v14,-19,40,-36,73,-36v49,0,80,32,80,72v0,48,-42,90,-98,90v-55,0,-86,-35,-86,-93xm127,-134v-82,-5,-94,116,-13,113v75,4,100,-110,13,-113","w":230,"k":{"\/":1,"9":4,"7":8,"3":4,"1":6}},"7":{"d":"22,0r166,-226r-137,0r7,-26r171,0r-6,21r-168,231r-33,0","w":210,"k":{"\/":45,"9":5,"8":9,"6":7,"5":9,"4":31,"3":7,"2":5,"1":-4,"0":7,".":33,",":33,"\u2026":33,"-":11,"\u2013":11,"\u2014":11}},"8":{"d":"107,4v-54,0,-93,-30,-93,-68v0,-40,32,-63,73,-70v-70,-34,-29,-122,55,-122v50,0,85,28,85,66v0,35,-27,58,-62,65v80,38,35,129,-58,129xm135,-140v80,2,86,-93,6,-91v-76,-4,-84,92,-6,91xm108,-21v42,0,71,-20,71,-50v0,-24,-26,-46,-66,-46v-44,0,-71,23,-71,50v0,27,26,46,66,46","w":232,"k":{"9":2,"7":11}},"9":{"d":"220,-162v0,119,-124,222,-210,132r19,-20v30,37,87,38,121,2v19,-20,35,-51,38,-81v-13,18,-38,39,-73,39v-49,0,-79,-33,-79,-74v0,-50,42,-92,98,-92v54,0,86,33,86,94xm122,-115v80,4,92,-118,12,-116v-74,-4,-102,114,-12,116","w":230,"k":{"\/":9,"7":13,"5":2,"3":5,"2":4,".":4,",":4,"\u2026":4}},".":{"d":"4,0r11,-38r33,0r-11,38r-33,0","w":91,"k":{"g":22,"V":52,"v":33,"1":18,"7":11,"8":13,"4":5,"6":16,"0":20,"T":35,"W":45,"Y":46,"a":10,"w":27,"y":26,"\u201d":14,"\u2019":14,"d":22,"q":22,"f":5,"c":22,"e":22,"o":22,"C":29,"G":29,"O":29,"Q":29,"t":9,"U":18}},",":{"d":"-13,44r-3,-13v21,-5,31,-16,34,-31r-14,0r11,-38r33,0v-9,39,-20,80,-61,82","w":91,"k":{"V":52,"v":33,"1":18,"7":11,"8":13,"4":5,"6":16,"0":20,"T":35,"W":45,"Y":46,"a":10,"w":27,"y":26,"\u201d":14,"\u2019":14,"d":22,"g":22,"q":22,"f":5,"c":22,"e":22,"o":22,"C":29,"G":29,"O":29,"Q":29,"t":9,"U":18}},":":{"d":"45,-148r11,-38r33,0r-11,38r-33,0xm6,0r10,-38r33,0r-10,38r-33,0","w":94,"k":{"T":10}},";":{"d":"45,-148r11,-38r33,0r-11,38r-33,0xm-12,44r-3,-13v21,-5,31,-16,34,-31r-13,0r10,-38r33,0v-9,39,-20,80,-61,82","w":94,"k":{"T":10}},"\u2026":{"d":"177,0r11,-37r32,0r-10,37r-33,0xm91,0r10,-37r33,0r-11,37r-32,0xm4,0r10,-37r33,0r-10,37r-33,0","w":264,"k":{"g":22,"V":52,"v":33,"1":18,"7":11,"8":13,"4":5,"6":16,"0":20,"T":35,"W":45,"Y":46,"a":10,"w":27,"y":26,"\u201d":14,"\u2019":14,"d":22,"q":22,"f":5,"c":22,"e":22,"o":22,"C":29,"G":29,"O":29,"Q":29,"t":9,"U":18}},"&":{"d":"201,5r-29,-39v-43,53,-162,55,-162,-27v0,-37,28,-68,84,-83v-35,-47,-6,-112,54,-112v37,0,62,22,62,54v0,26,-18,53,-78,70r45,63v13,-15,27,-34,39,-55r19,12v-14,24,-29,44,-44,61r31,42xm120,-150v50,-14,63,-33,63,-51v0,-19,-14,-32,-36,-32v-41,2,-55,51,-27,83xm39,-63v0,59,89,49,120,10r-52,-73v-48,12,-68,37,-68,63","w":249,"k":{"v":3,"V":22,"T":22,"W":20,"Y":26,"w":2,"y":1}},"!":{"d":"35,-71r40,-181r33,0r-57,181r-16,0xm7,0r10,-38r33,0r-10,38r-33,0","w":97},"?":{"d":"68,-71v5,-19,4,-44,12,-60v51,-4,86,-24,86,-58v0,-57,-90,-43,-114,-12r-16,-18v35,-50,159,-49,159,27v0,46,-40,73,-94,81r-15,40r-18,0xm42,0r10,-38r33,0r-10,38r-33,0","w":193},"\u201c":{"d":"120,-172v8,-39,19,-79,60,-81r3,12v-21,5,-30,16,-33,31r13,0r-10,38r-33,0xm48,-172v8,-40,20,-79,61,-81r2,12v-21,5,-30,16,-33,31r13,0r-10,38r-33,0","w":163,"k":{"J":29,"a":3,"s":4,"A":29,"d":4,"g":4,"q":4,"c":4,"e":4,"o":4,"t":-5,"z":4}},"\u201d":{"d":"114,-171r-3,-12v21,-5,31,-16,34,-31r-13,0r10,-38r33,0v-10,38,-20,79,-61,81xm42,-171r-3,-12v21,-5,31,-16,34,-31r-13,0r10,-38r33,0v-10,38,-20,79,-61,81","w":163,"k":{"J":36,"a":7,"s":9,"A":36,"d":13,"g":13,"q":13,"c":15,"e":15,"o":15}},"\u2018":{"d":"48,-172v9,-39,19,-80,61,-82r3,13v-21,5,-31,15,-34,31r13,0r-10,38r-33,0","w":91,"k":{"J":29,"a":3,"s":4,"A":29,"d":4,"g":4,"q":4,"c":4,"e":4,"o":4,"t":-5,"z":4}},"\u2019":{"d":"45,-171r-3,-12v21,-5,31,-16,34,-31r-14,0r11,-38r33,0v-10,38,-20,79,-61,81","w":91,"k":{"J":36,"a":7,"s":9,"A":36,"d":13,"g":13,"q":13,"c":15,"e":15,"o":15}},"-":{"d":"24,-94r7,-29r101,0r-8,29r-100,0","w":147,"k":{"V":14,"X":18,"v":5,"x":11,"1":11,"7":14,"3":4,"T":31,"W":13,"Y":31,"w":4,"y":5,"A":14,"Z":11,"z":4}},"\u2013":{"d":"24,-94r7,-28r144,0r-8,28r-143,0","w":190,"k":{"V":14,"X":18,"v":5,"x":11,"1":11,"7":14,"3":4,"T":31,"W":13,"Y":31,"w":4,"y":5,"A":14,"Z":11,"z":4}},"\u2014":{"d":"24,-94r7,-28r277,0r-7,28r-277,0","w":323,"k":{"V":14,"X":18,"v":5,"x":11,"1":11,"7":14,"3":4,"T":31,"W":13,"Y":31,"w":4,"y":5,"A":14,"Z":11,"z":4}},"_":{"d":"-41,58r6,-23r218,0r-7,23r-217,0","w":216},"\/":{"d":"-45,46r255,-333r28,0r-255,333r-28,0","w":182,"k":{"\/":58,"9":5,"8":5,"7":1,"6":13,"5":7,"4":37,"3":1,"2":5,"1":-9,"0":7,"x":18,"v":18,"J":47,"a":23,"s":26,"w":18,"y":18,"A":38,"Z":7,"d":25,"g":25,"q":25,"f":9,"m":18,"n":18,"p":18,"r":18,"c":29,"e":29,"o":29,"C":14,"G":14,"O":14,"Q":14,"t":7,"u":18,"z":22,"S":4}},"\\":{"d":"129,46r-79,-333r24,0r78,333r-23,0","w":182,"k":{"v":25,"j":-11,"V":43,"T":32,"W":36,"Y":40,"w":22,"y":22,"f":4,"C":14,"G":14,"O":14,"Q":14,"t":11,"U":5}},"|":{"d":"50,46r0,-333r23,0r0,333r-23,0","w":109},"(":{"d":"95,51v-35,-31,-63,-73,-63,-129v0,-72,46,-141,142,-180r10,20v-136,56,-159,184,-72,271","w":156,"k":{"j":-11,"g":11,"J":5,"s":5,"d":11,"q":11,"c":11,"e":11,"o":11,"C":4,"G":4,"O":4,"Q":4}},")":{"d":"-12,50r-10,-21v137,-56,158,-183,72,-271r17,-17v106,92,73,255,-79,309","w":156},"[":{"d":"3,47r81,-299r102,0r-5,22r-77,0r-69,255r77,0r-6,22r-103,0","w":158,"k":{"x":4,"v":7,"j":-11,"J":5,"a":4,"s":5,"w":7,"y":4,"d":7,"g":7,"q":7,"c":7,"e":7,"o":7,"C":4,"G":4,"O":4,"Q":4}},"]":{"d":"-24,47r6,-22r77,0r69,-255r-77,0r6,-22r103,0r-80,299r-104,0","w":158},"{":{"d":"64,-102v46,9,15,58,15,90v0,21,11,36,42,45r-9,18v-75,-16,-61,-61,-48,-120v4,-18,-16,-26,-43,-24v4,-8,0,-24,16,-21v37,0,49,-16,58,-63v9,-49,32,-77,99,-80r0,19v-51,3,-66,26,-73,66v-8,50,-25,65,-57,70","w":173,"k":{"x":4,"v":4,"j":-13,"g":5,"J":5,"s":4,"w":4,"y":4,"d":5,"q":5,"c":5,"e":5,"o":5,"C":4,"G":4,"O":4,"Q":4,"z":4}},"}":{"d":"67,-257v75,16,61,61,48,119v-4,18,16,26,43,24v-4,8,0,24,-16,21v-37,0,-49,16,-58,63v-9,49,-31,78,-98,81r-1,-20v51,-3,67,-25,74,-65v9,-50,24,-66,56,-71v-46,-9,-15,-56,-15,-90v0,-21,-10,-36,-41,-45","w":173},"@":{"d":"253,40v-104,49,-230,-11,-230,-124v0,-93,78,-173,176,-173v90,0,142,58,142,127v0,70,-42,104,-77,104v-25,0,-41,-12,-45,-33v-33,49,-119,47,-122,-26v-3,-80,109,-133,142,-61r9,-32r24,6r-28,88v-8,25,1,44,24,44v24,0,60,-29,60,-90v0,-63,-48,-114,-129,-114v-90,0,-163,74,-163,160v0,104,116,158,212,113xm162,-47v33,0,67,-34,67,-70v0,-24,-16,-42,-42,-42v-34,0,-62,33,-62,72v0,25,15,40,37,40","w":352},"\u2122":{"d":"130,-141r31,-111r15,0r24,61r55,-61r19,0r-32,111r-15,0r24,-85v-20,19,-36,43,-58,60r-23,-60r-24,85r-16,0xm54,-141r27,-96r-36,0r5,-15r86,0r-4,15r-35,0r-27,96r-16,0","w":249},"*":{"d":"98,-142r-18,-5r15,-43r-43,16r-5,-19r46,-8r-36,-29r14,-14r29,35r8,-44r18,5r-15,42r43,-15r5,18r-46,8r36,29r-14,14r-29,-35","w":154,"k":{"J":29,"a":4,"s":4,"A":31,"d":5,"g":5,"q":5,"c":7,"e":7,"o":7,"t":-4}},"$":{"d":"66,35r10,-37v-32,-5,-59,-22,-77,-43r21,-17v16,18,38,31,65,35r24,-91v-42,-16,-63,-31,-63,-63v0,-44,44,-75,101,-71r6,-21r22,0r-6,25v25,5,45,17,60,32r-20,19v-13,-13,-29,-23,-49,-27r-24,86v41,15,62,33,62,65v0,44,-42,75,-100,73r-9,35r-23,0xm105,-25v64,3,92,-67,24,-86xm117,-145r23,-81v-37,-4,-64,16,-64,42v0,18,11,27,41,39","w":224,"k":{"7":4}},"#":{"d":"28,0r22,-64r-40,0r7,-25r42,0r26,-76r-44,0r7,-25r46,0r22,-62r25,0r-22,62r69,0r22,-62r25,0r-22,62r40,0r-6,25r-42,0r-27,76r44,0r-6,25r-47,0r-22,64r-25,0r22,-64r-69,0r-22,64r-25,0xm84,-89r68,0r27,-76r-68,0","w":245},"%":{"d":"84,-125v-30,0,-51,-22,-51,-52v0,-40,30,-78,69,-78v31,0,51,23,51,53v0,40,-29,77,-69,77xm23,0r244,-252r29,0r-245,252r-28,0xm217,3v-30,0,-51,-23,-51,-53v0,-39,29,-78,69,-78v30,0,51,23,51,53v0,40,-29,78,-69,78xm85,-144v42,4,68,-88,15,-91v-43,-4,-67,88,-15,91xm219,-17v43,4,67,-88,15,-91v-42,-4,-68,88,-15,91","w":301},"\"":{"d":"107,-154r33,-98r33,0r-51,98r-15,0xm36,-154r33,-98v10,2,27,-3,33,2r-51,96r-15,0","w":159},"'":{"d":"36,-154r33,-98v10,2,27,-3,33,2r-51,96r-15,0","w":88},"+":{"d":"85,-40r20,-74r-75,0r7,-26r75,0r20,-74r27,0r-20,74r74,0r-7,26r-74,0r-20,74r-27,0","w":225},"=":{"d":"47,-156r7,-26r165,0r-7,26r-165,0xm24,-71r7,-27r166,0r-8,27r-165,0","w":225},"\u00d7":{"d":"164,-46r-45,-63r-80,63r-15,-20r80,-63r-46,-61r22,-17r45,63r80,-64r15,20r-80,63r46,62","w":225},"<":{"d":"175,-31r-147,-84r7,-24r192,-83r-8,29r-157,68r121,68","w":225},">":{"d":"16,-31r8,-30r157,-68r-121,-68r7,-25r147,83r-6,24","w":225},"^":{"d":"42,-177r76,-76r22,0r36,76r-22,0r-28,-56r-57,56r-27,0","w":180},"~":{"d":"111,-85v-17,0,-29,-23,-43,-22v-9,0,-14,7,-22,21r-18,-8v12,-25,25,-38,43,-38v18,0,29,23,42,23v9,0,15,-8,23,-22r17,8v-12,25,-24,38,-42,38","w":170},"`":{"d":"130,-214r-30,-39r30,-13r20,52r-20,0","w":180},"\u00a0":{"w":108}}});

/**
*
* Color picker
* Author: Stefan Petre www.eyecon.ro
* 
* Dual licensed under the MIT and GPL licenses
* 
*/
(function ($) {
	var ColorPicker = function () {
		var
			ids = {},
			inAction,
			charMin = 65,
			visible,
			tpl = '<div class="colorpicker"><div class="colorpicker_color"><div><div></div></div></div><div class="colorpicker_hue"><div></div></div><div class="colorpicker_new_color"></div><div class="colorpicker_current_color"></div><div class="colorpicker_hex"><input type="text" maxlength="6" size="6" /></div><div class="colorpicker_rgb_r colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_rgb_g colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_rgb_b colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_hsb_h colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_hsb_s colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_hsb_b colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_submit"></div></div>',
			defaults = {
				eventName: 'click',
				onShow: function () {},
				onBeforeShow: function(){},
				onHide: function () {},
				onChange: function () {},
				onSubmit: function () {},
				color: 'ff0000',
				livePreview: true,
				flat: false
			},
			fillRGBFields = function  (hsb, cal) {
				var rgb = HSBToRGB(hsb);
				$(cal).data('colorpicker').fields
					.eq(1).val(rgb.r).end()
					.eq(2).val(rgb.g).end()
					.eq(3).val(rgb.b).end();
			},
			fillHSBFields = function  (hsb, cal) {
				$(cal).data('colorpicker').fields
					.eq(4).val(hsb.h).end()
					.eq(5).val(hsb.s).end()
					.eq(6).val(hsb.b).end();
			},
			fillHexFields = function (hsb, cal) {
				$(cal).data('colorpicker').fields
					.eq(0).val(HSBToHex(hsb)).end();
			},
			setSelector = function (hsb, cal) {
				$(cal).data('colorpicker').selector.css('backgroundColor', '#' + HSBToHex({h: hsb.h, s: 100, b: 100}));
				$(cal).data('colorpicker').selectorIndic.css({
					left: parseInt(150 * hsb.s/100, 10),
					top: parseInt(150 * (100-hsb.b)/100, 10)
				});
			},
			setHue = function (hsb, cal) {
				$(cal).data('colorpicker').hue.css('top', parseInt(150 - 150 * hsb.h/360, 10));
			},
			setCurrentColor = function (hsb, cal) {
				$(cal).data('colorpicker').currentColor.css('backgroundColor', '#' + HSBToHex(hsb));
			},
			setNewColor = function (hsb, cal) {
				$(cal).data('colorpicker').newColor.css('backgroundColor', '#' + HSBToHex(hsb));
			},
			keyDown = function (ev) {
				var pressedKey = ev.charCode || ev.keyCode || -1;
				if ((pressedKey > charMin && pressedKey <= 90) || pressedKey == 32) {
					return false;
				}
				var cal = $(this).parent().parent();
				if (cal.data('colorpicker').livePreview === true) {
					change.apply(this);
				}
			},
			change = function (ev) {
				var cal = $(this).parent().parent(), col;
				if (this.parentNode.className.indexOf('_hex') > 0) {
					cal.data('colorpicker').color = col = HexToHSB(fixHex(this.value));
				} else if (this.parentNode.className.indexOf('_hsb') > 0) {
					cal.data('colorpicker').color = col = fixHSB({
						h: parseInt(cal.data('colorpicker').fields.eq(4).val(), 10),
						s: parseInt(cal.data('colorpicker').fields.eq(5).val(), 10),
						b: parseInt(cal.data('colorpicker').fields.eq(6).val(), 10)
					});
				} else {
					cal.data('colorpicker').color = col = RGBToHSB(fixRGB({
						r: parseInt(cal.data('colorpicker').fields.eq(1).val(), 10),
						g: parseInt(cal.data('colorpicker').fields.eq(2).val(), 10),
						b: parseInt(cal.data('colorpicker').fields.eq(3).val(), 10)
					}));
				}
				if (ev) {
					fillRGBFields(col, cal.get(0));
					fillHexFields(col, cal.get(0));
					fillHSBFields(col, cal.get(0));
				}
				setSelector(col, cal.get(0));
				setHue(col, cal.get(0));
				setNewColor(col, cal.get(0));
				cal.data('colorpicker').onChange.apply(cal, [col, HSBToHex(col), HSBToRGB(col)]);
			},
			blur = function (ev) {
				var cal = $(this).parent().parent();
				cal.data('colorpicker').fields.parent().removeClass('colorpicker_focus');
			},
			focus = function () {
				charMin = this.parentNode.className.indexOf('_hex') > 0 ? 70 : 65;
				$(this).parent().parent().data('colorpicker').fields.parent().removeClass('colorpicker_focus');
				$(this).parent().addClass('colorpicker_focus');
			},
			downIncrement = function (ev) {
				var field = $(this).parent().find('input').focus();
				var current = {
					el: $(this).parent().addClass('colorpicker_slider'),
					max: this.parentNode.className.indexOf('_hsb_h') > 0 ? 360 : (this.parentNode.className.indexOf('_hsb') > 0 ? 100 : 255),
					y: ev.pageY,
					field: field,
					val: parseInt(field.val(), 10),
					preview: $(this).parent().parent().data('colorpicker').livePreview					
				};
				$(document).bind('mouseup', current, upIncrement);
				$(document).bind('mousemove', current, moveIncrement);
			},
			moveIncrement = function (ev) {
				ev.data.field.val(Math.max(0, Math.min(ev.data.max, parseInt(ev.data.val + ev.pageY - ev.data.y, 10))));
				if (ev.data.preview) {
					change.apply(ev.data.field.get(0), [true]);
				}
				return false;
			},
			upIncrement = function (ev) {
				change.apply(ev.data.field.get(0), [true]);
				ev.data.el.removeClass('colorpicker_slider').find('input').focus();
				$(document).unbind('mouseup', upIncrement);
				$(document).unbind('mousemove', moveIncrement);
				return false;
			},
			downHue = function (ev) {
				var current = {
					cal: $(this).parent(),
					y: $(this).offset().top
				};
				current.preview = current.cal.data('colorpicker').livePreview;
				$(document).bind('mouseup', current, upHue);
				$(document).bind('mousemove', current, moveHue);
			},
			moveHue = function (ev) {
				change.apply(
					ev.data.cal.data('colorpicker')
						.fields
						.eq(4)
						.val(parseInt(360*(150 - Math.max(0,Math.min(150,(ev.pageY - ev.data.y))))/150, 10))
						.get(0),
					[ev.data.preview]
				);
				return false;
			},
			upHue = function (ev) {
				fillRGBFields(ev.data.cal.data('colorpicker').color, ev.data.cal.get(0));
				fillHexFields(ev.data.cal.data('colorpicker').color, ev.data.cal.get(0));
				$(document).unbind('mouseup', upHue);
				$(document).unbind('mousemove', moveHue);
				return false;
			},
			downSelector = function (ev) {
				var current = {
					cal: $(this).parent(),
					pos: $(this).offset()
				};
				current.preview = current.cal.data('colorpicker').livePreview;
				$(document).bind('mouseup', current, upSelector);
				$(document).bind('mousemove', current, moveSelector);
			},
			moveSelector = function (ev) {
				change.apply(
					ev.data.cal.data('colorpicker')
						.fields
						.eq(6)
						.val(parseInt(100*(150 - Math.max(0,Math.min(150,(ev.pageY - ev.data.pos.top))))/150, 10))
						.end()
						.eq(5)
						.val(parseInt(100*(Math.max(0,Math.min(150,(ev.pageX - ev.data.pos.left))))/150, 10))
						.get(0),
					[ev.data.preview]
				);
				return false;
			},
			upSelector = function (ev) {
				fillRGBFields(ev.data.cal.data('colorpicker').color, ev.data.cal.get(0));
				fillHexFields(ev.data.cal.data('colorpicker').color, ev.data.cal.get(0));
				$(document).unbind('mouseup', upSelector);
				$(document).unbind('mousemove', moveSelector);
				return false;
			},
			enterSubmit = function (ev) {
				$(this).addClass('colorpicker_focus');
			},
			leaveSubmit = function (ev) {
				$(this).removeClass('colorpicker_focus');
			},
			clickSubmit = function (ev) {
				var cal = $(this).parent();
				var col = cal.data('colorpicker').color;
				cal.data('colorpicker').origColor = col;
				setCurrentColor(col, cal.get(0));
				cal.data('colorpicker').onSubmit(col, HSBToHex(col), HSBToRGB(col), cal.data('colorpicker').el);
			},
			show = function (ev) {
				var cal = $('#' + $(this).data('colorpickerId'));
				cal.data('colorpicker').onBeforeShow.apply(this, [cal.get(0)]);
				var pos = $(this).offset();
				var viewPort = getViewport();
				var top = pos.top + this.offsetHeight;
				var left = pos.left;
				if (top + 176 > viewPort.t + viewPort.h) {
					top -= this.offsetHeight + 176;
				}
				if (left + 356 > viewPort.l + viewPort.w) {
					left -= 356;
				}
				cal.css({left: left + 'px', top: top + 'px'});
				if (cal.data('colorpicker').onShow.apply(this, [cal.get(0)]) != false) {
					cal.show();
				}
				$(document).bind('mousedown', {cal: cal}, hide);
				return false;
			},
			hide = function (ev) {
				if (!isChildOf(ev.data.cal.get(0), ev.target, ev.data.cal.get(0))) {
					if (ev.data.cal.data('colorpicker').onHide.apply(this, [ev.data.cal.get(0)]) != false) {
						ev.data.cal.hide();
					}
					$(document).unbind('mousedown', hide);
				}
			},
			isChildOf = function(parentEl, el, container) {
				if (parentEl == el) {
					return true;
				}
				if (parentEl.contains) {
					return parentEl.contains(el);
				}
				if ( parentEl.compareDocumentPosition ) {
					return !!(parentEl.compareDocumentPosition(el) & 16);
				}
				var prEl = el.parentNode;
				while(prEl && prEl != container) {
					if (prEl == parentEl)
						return true;
					prEl = prEl.parentNode;
				}
				return false;
			},
			getViewport = function () {
				var m = document.compatMode == 'CSS1Compat';
				return {
					l : window.pageXOffset || (m ? document.documentElement.scrollLeft : document.body.scrollLeft),
					t : window.pageYOffset || (m ? document.documentElement.scrollTop : document.body.scrollTop),
					w : window.innerWidth || (m ? document.documentElement.clientWidth : document.body.clientWidth),
					h : window.innerHeight || (m ? document.documentElement.clientHeight : document.body.clientHeight)
				};
			},
			fixHSB = function (hsb) {
				return {
					h: Math.min(360, Math.max(0, hsb.h)),
					s: Math.min(100, Math.max(0, hsb.s)),
					b: Math.min(100, Math.max(0, hsb.b))
				};
			}, 
			fixRGB = function (rgb) {
				return {
					r: Math.min(255, Math.max(0, rgb.r)),
					g: Math.min(255, Math.max(0, rgb.g)),
					b: Math.min(255, Math.max(0, rgb.b))
				};
			},
			fixHex = function (hex) {
				var len = 6 - hex.length;
				if (len > 0) {
					var o = [];
					for (var i=0; i<len; i++) {
						o.push('0');
					}
					o.push(hex);
					hex = o.join('');
				}
				return hex;
			}, 
			HexToRGB = function (hex) {
				var hex = parseInt(((hex.indexOf('#') > -1) ? hex.substring(1) : hex), 16);
				return {r: hex >> 16, g: (hex & 0x00FF00) >> 8, b: (hex & 0x0000FF)};
			},
			HexToHSB = function (hex) {
				return RGBToHSB(HexToRGB(hex));
			},
			RGBToHSB = function (rgb) {
				var hsb = {
					h: 0,
					s: 0,
					b: 0
				};
				var min = Math.min(rgb.r, rgb.g, rgb.b);
				var max = Math.max(rgb.r, rgb.g, rgb.b);
				var delta = max - min;
				hsb.b = max;
				if (max != 0) {
					
				}
				hsb.s = max != 0 ? 255 * delta / max : 0;
				if (hsb.s != 0) {
					if (rgb.r == max) {
						hsb.h = (rgb.g - rgb.b) / delta;
					} else if (rgb.g == max) {
						hsb.h = 2 + (rgb.b - rgb.r) / delta;
					} else {
						hsb.h = 4 + (rgb.r - rgb.g) / delta;
					}
				} else {
					hsb.h = -1;
				}
				hsb.h *= 60;
				if (hsb.h < 0) {
					hsb.h += 360;
				}
				hsb.s *= 100/255;
				hsb.b *= 100/255;
				return hsb;
			},
			HSBToRGB = function (hsb) {
				var rgb = {};
				var h = Math.round(hsb.h);
				var s = Math.round(hsb.s*255/100);
				var v = Math.round(hsb.b*255/100);
				if(s == 0) {
					rgb.r = rgb.g = rgb.b = v;
				} else {
					var t1 = v;
					var t2 = (255-s)*v/255;
					var t3 = (t1-t2)*(h%60)/60;
					if(h==360) h = 0;
					if(h<60) {rgb.r=t1;	rgb.b=t2; rgb.g=t2+t3}
					else if(h<120) {rgb.g=t1; rgb.b=t2;	rgb.r=t1-t3}
					else if(h<180) {rgb.g=t1; rgb.r=t2;	rgb.b=t2+t3}
					else if(h<240) {rgb.b=t1; rgb.r=t2;	rgb.g=t1-t3}
					else if(h<300) {rgb.b=t1; rgb.g=t2;	rgb.r=t2+t3}
					else if(h<360) {rgb.r=t1; rgb.g=t2;	rgb.b=t1-t3}
					else {rgb.r=0; rgb.g=0;	rgb.b=0}
				}
				return {r:Math.round(rgb.r), g:Math.round(rgb.g), b:Math.round(rgb.b)};
			},
			RGBToHex = function (rgb) {
				var hex = [
					rgb.r.toString(16),
					rgb.g.toString(16),
					rgb.b.toString(16)
				];
				$.each(hex, function (nr, val) {
					if (val.length == 1) {
						hex[nr] = '0' + val;
					}
				});
				return hex.join('');
			},
			HSBToHex = function (hsb) {
				return RGBToHex(HSBToRGB(hsb));
			},
			restoreOriginal = function () {
				var cal = $(this).parent();
				var col = cal.data('colorpicker').origColor;
				cal.data('colorpicker').color = col;
				fillRGBFields(col, cal.get(0));
				fillHexFields(col, cal.get(0));
				fillHSBFields(col, cal.get(0));
				setSelector(col, cal.get(0));
				setHue(col, cal.get(0));
				setNewColor(col, cal.get(0));
			};
		return {
			init: function (opt) {
				opt = $.extend({}, defaults, opt||{});
				if (typeof opt.color == 'string') {
					opt.color = HexToHSB(opt.color);
				} else if (opt.color.r != undefined && opt.color.g != undefined && opt.color.b != undefined) {
					opt.color = RGBToHSB(opt.color);
				} else if (opt.color.h != undefined && opt.color.s != undefined && opt.color.b != undefined) {
					opt.color = fixHSB(opt.color);
				} else {
					return this;
				}
				return this.each(function () {
					if (!$(this).data('colorpickerId')) {
						var options = $.extend({}, opt);
						options.origColor = opt.color;
						var id = 'collorpicker_' + parseInt(Math.random() * 1000);
						$(this).data('colorpickerId', id);
						var cal = $(tpl).attr('id', id);
						if (options.flat) {
							cal.appendTo(this).show();
						} else {
							cal.appendTo(document.body);
						}
						options.fields = cal
											.find('input')
												.bind('keyup', keyDown)
												.bind('change', change)
												.bind('blur', blur)
												.bind('focus', focus);
						cal
							.find('span').bind('mousedown', downIncrement).end()
							.find('>div.colorpicker_current_color').bind('click', restoreOriginal);
						options.selector = cal.find('div.colorpicker_color').bind('mousedown', downSelector);
						options.selectorIndic = options.selector.find('div div');
						options.el = this;
						options.hue = cal.find('div.colorpicker_hue div');
						cal.find('div.colorpicker_hue').bind('mousedown', downHue);
						options.newColor = cal.find('div.colorpicker_new_color');
						options.currentColor = cal.find('div.colorpicker_current_color');
						cal.data('colorpicker', options);
						cal.find('div.colorpicker_submit')
							.bind('mouseenter', enterSubmit)
							.bind('mouseleave', leaveSubmit)
							.bind('click', clickSubmit);
						fillRGBFields(options.color, cal.get(0));
						fillHSBFields(options.color, cal.get(0));
						fillHexFields(options.color, cal.get(0));
						setHue(options.color, cal.get(0));
						setSelector(options.color, cal.get(0));
						setCurrentColor(options.color, cal.get(0));
						setNewColor(options.color, cal.get(0));
						if (options.flat) {
							cal.css({
								position: 'relative',
								display: 'block'
							});
						} else {
							$(this).bind(options.eventName, show);
						}
					}
				});
			},
			showPicker: function() {
				return this.each( function () {
					if ($(this).data('colorpickerId')) {
						show.apply(this);
					}
				});
			},
			hidePicker: function() {
				return this.each( function () {
					if ($(this).data('colorpickerId')) {
						$('#' + $(this).data('colorpickerId')).hide();
					}
				});
			},
			setColor: function(col) {
				if (typeof col == 'string') {
					col = HexToHSB(col);
				} else if (col.r != undefined && col.g != undefined && col.b != undefined) {
					col = RGBToHSB(col);
				} else if (col.h != undefined && col.s != undefined && col.b != undefined) {
					col = fixHSB(col);
				} else {
					return this;
				}
				return this.each(function(){
					if ($(this).data('colorpickerId')) {
						var cal = $('#' + $(this).data('colorpickerId'));
						cal.data('colorpicker').color = col;
						cal.data('colorpicker').origColor = col;
						fillRGBFields(col, cal.get(0));
						fillHSBFields(col, cal.get(0));
						fillHexFields(col, cal.get(0));
						setHue(col, cal.get(0));
						setSelector(col, cal.get(0));
						setCurrentColor(col, cal.get(0));
						setNewColor(col, cal.get(0));
					}
				});
			}
		};
	}();
	$.fn.extend({
		ColorPicker: ColorPicker.init,
		ColorPickerHide: ColorPicker.hidePicker,
		ColorPickerShow: ColorPicker.showPicker,
		ColorPickerSetColor: ColorPicker.setColor
	});
})(jQuery)

jQuery(document).ready(function($) {
	Cufon.replace('#ANNOtypeLogo h1, #ANNOtypeOptions #help strong, #ANNOtypeTab p', {fontFamily: 'Gotham Bold'});
	Cufon.replace('#ANNOtypeLogo h2, #visitANNOtype, #ANNOtypeOptions .radioBoxes span', { fontFamily: 'Gotham Book'});
	
	$('#ANNOtypeNav a').click(function() {
		var href = $(this).attr('href');
		var name = $(this).text();
		
		$('#ANNOtypeNav li').removeClass('currentTab');
		$(this).parent().addClass('currentTab');
		
		$('#general, #color, #advertising, #advanced, #help').hide();
		$('#ANNOtypeOptions').find(href).show();
		
		$('#ANNOtypeTab span').text(name);
		Cufon.replace('#ANNOtypeTab', {fontFamily: 'Gotham Bold'});
		
		return false;
	});
	
	$('#help .question').click(function() {
		if(!$(this).next().is(':visible')) {
			$(this).next().slideDown();
			$(this).find('span').html('&darr;');
		} else {
			$(this).next().slideUp();
			$(this).find('span').html('&rarr;');
		}	
	});
	
	$('#ANNOtypeOptions .main input:checkbox:checked').each(function() {
		$(this).parents('.option').find('.more').slideDown();
	});
	
	$('#ANNOtypeOptions input:checkbox').click(function() {
		if($(this).is(':checked')) {
			$(this).attr('value', 'On');
		}
		
		if($(this).parents('.main').length >= 1) {
			if($(this).is(':checked')) {
				$(this).attr('value', 'On');
				$(this).parents('.option').find('.more').slideDown();
			} else {
				$(this).parents('.option').find('.more').slideUp();
			}
		}
		
		$('#ANNOtypeOptions form').ajaxSubmit({
			url: ANNOVars.ajaxUrl,
			data: {action: 'ANNOtype_updateCP'},
			dataType: 'json',
			type: 'POST',
			success: function(data) {
			}
		});
	});
	
	$('#ANNOtypeOptions input[type=text]').blur(function() {
		$('#ANNOtypeOptions form').ajaxSubmit({
			url: ANNOVars.ajaxUrl,
			data: {action: 'ANNOtype_updateCP'},
			dataType: 'json',
			type: 'POST',
			success: function(data) {
			}
		});
	});
	
	$('#ANNOtypeOptions select').change(function() {
		$('#ANNOtypeOptions form').ajaxSubmit({
			url: ANNOVars.ajaxUrl,
			data: {action: 'ANNOtype_updateCP'},
			dataType: 'json',
			type: 'POST',
			success: function(data) {
			}
		});
	});
	
	$('#ANNOtype').find('.colorSelector').live('hover', function() {
		var field = $(this);
		var currentColor = $(field).parents().find('input').attr('value');
		var fieldName = $(field).parents().find('input').attr('name');
		
		$(this).ColorPicker({
			color: '#'+currentColor,
			onShow: function (colpkr) {
				$(colpkr).fadeIn(500);
				
				return false;
			},
			onHide: function (colpkr) {
				$(colpkr).fadeOut(500);
				
				$('#ANNOtypeOptions form').ajaxSubmit({
					url: ANNOVars.ajaxUrl,
					data: {action: 'ANNOtype_updateCP'},
					dataType: 'json',
					type: 'POST',
					success: function(data) {
					}
				});
				
				return false;
			},
			onChange: function (hsb, hex, rgb) {
				$(field).find('span').css('backgroundColor', '#' + hex);
				$(field).parent().find('input').attr('value', hex);
				
				if(fieldName == 'widgetTitleBarColor') {
					$('.ANNOWidgetLogo').css('background-color', '#' + hex);
					$('.ANNOWidgetDesc h3, .ANNOWidgetDesc ol').css('border-color', '#' + hex);
				} else if(fieldName == 'widgetShellColor') {
					$('.ANNOWidgetDesc').css('background-color', '#' + hex);
					$('.ANNOWidgetDesc, .ANNOWidgetLogo').css('border-color', '#' + hex);
				} else if(fieldName == 'widgetFontColor') {
					$('.ANNOWidgetDesc h3, .ANNOWidgetDesc li, .ANNOWidgetDesc .effects').css('color', '#' + hex);
				} else if(fieldName == 'bubbleTitleBarColor') {
					$('.ANNOtype_bubble .ANNOtype_bubbleTitle, .ANNOtype_bubble .getANNOtype, .ANNOtype_bubble .before').css('background-color', '#' + hex);
					$('.ANNOtype_bubble').css('border-color', '#' + hex);
				} else if(fieldName == 'bubbleShellColor') {
					$('.ANNOtype_bubbleContainer').css('background-color', '#' + hex);
					$('.ANNOtype_bubble .ANNOtype_bubbleSorting').css('border-color', '#' + hex);
				} else if(fieldName == 'bubbleFontColor') {
					$('.ANNOtype_bubble .name, .ANNOtype_bubble .date, .ANNOtype_bubble .ANNOresponseComment, .ANNOtype_bubble .count').css('color', '#' + hex);
				} else if(fieldName == 'bubbleLinkColor') {
				} else if(fieldName == 'bubbleCommentColor') {
					$('.ANNOtype_bubble .mainAnnoActualComment').css('background-color', '#' + hex);
				} else if(fieldName == 'bubbleSortColor') {
					$('.ANNOtype_bubble .ANNOtype_bubbleSorting').css('background-color', '#' + hex);
				} else if(fieldName == 'bubbleSortFontColor') {
					$('.ANNOtype_bubble .ANNOtype_bubbleSorting').css('color', '#' + hex);
					$('.ANNOtype_bubble .ANNOtype_bubbleSorting a').css('color', '#' + hex);
				} else if(fieldName == 'bubbleAltCommentColor') {
					$('.ANNOtype_bubble li.alt').css('background-color', '#' + hex);
				} else if(fieldName == 'bubbleButtonColor') {
					$('.ANNOtype_bubble .like').css('background-color', '#' + hex);
				} else if(fieldName == 'bubbleButtonFontColor') {
					$('.ANNOtype_bubble .like').css('color', '#' + hex);
				} else if(fieldName == 'bubbleCommentSepColor') {
					$('.ANNOtype_bubble li').css('border-color', '#' + hex);
				} else if(fieldName == 'highlightColor') {
					$('.annotation').css('background-color', '#' + hex);
				}
 			},
			onSubmit: function (hsb, hex, rgb) {
				$('#ANNOtypeOptions form').ajaxSubmit({
					url: ANNOVars.ajaxUrl,
					data: {action: 'ANNOtype_updateCP'},
					dataType: 'json',
					type: 'POST',
					success: function(data) {
					}
				});
			}
		});
	});
	
	$('.option .main .help').click(function() {
		return false;
	});
	
	
	$('.option .main .help').tipTip({
		attribute: 'href'
	});
	
	var chicletOption = $('#chiclet').find('option:selected').val();

	if(chicletOption == 'blue bar with bubble') {
		$('.blueBarBubble').hide();
		$('.blueBar').hide();
		$('.blueBubble').hide();
		$('.whiteBarBubble').hide();
		$('.whiteBar').hide();
		$('.whiteBubble').hide();
		
		$('.blueBarBubble').show();
	} else if(chicletOption == 'blue bar') {
		$('.blueBarBubble').hide();
		$('.blueBar').hide();
		$('.blueBubble').hide();
		$('.whiteBarBubble').hide();
		$('.whiteBar').hide();
		$('.whiteBubble').hide();
		
		$('.blueBar').show();
	} else if(chicletOption == 'blue bubble') {
		$('.blueBarBubble').hide();
		$('.blueBar').hide();
		$('.blueBubble').hide();
		$('.whiteBarBubble').hide();
		$('.whiteBar').hide();
		$('.whiteBubble').hide();
		
		$('.blueBubble').show();
	} else if(chicletOption == 'white bar with bubble') {
		$('.blueBarBubble').hide();
		$('.blueBar').hide();
		$('.blueBubble').hide();
		$('.whiteBarBubble').hide();
		$('.whiteBar').hide();
		$('.whiteBubble').hide();
		
		$('.whiteBarBubble').show();
	} else if(chicletOption == 'white bar') {
		$('.blueBarBubble').hide();
		$('.blueBar').hide();
		$('.blueBubble').hide();
		$('.whiteBarBubble').hide();
		$('.whiteBar').hide();
		$('.whiteBubble').hide();
		
		$('.whiteBar').show();
	} else if(chicletOption == 'white bubble') {
		$('.blueBarBubble').hide();
		$('.blueBar').hide();
		$('.blueBubble').hide();
		$('.whiteBarBubble').hide();
		$('.whiteBar').hide();
		$('.whiteBubble').hide();
		
		$('.whiteBubble').show();
	} else if(chicletOption == 'turn off chiclet') {
		$('.blueBarBubble').hide();
		$('.blueBar').hide();
		$('.blueBubble').hide();
		$('.whiteBarBubble').hide();
		$('.whiteBar').hide();
		$('.whiteBubble').hide();
	}
	
	$('#chiclet').change(function() {
		var option = $(this).find('option:selected').val();
		
		if(option == 'blue bar with bubble') {
			$('.blueBarBubble').hide();
			$('.blueBar').hide();
			$('.blueBubble').hide();
			$('.whiteBarBubble').hide();
			$('.whiteBar').hide();
			$('.whiteBubble').hide();
			
			$('.blueBarBubble').show();
		} else if(option == 'blue bar') {
			$('.blueBarBubble').hide();
			$('.blueBar').hide();
			$('.blueBubble').hide();
			$('.whiteBarBubble').hide();
			$('.whiteBar').hide();
			$('.whiteBubble').hide();
			
			$('.blueBar').show();
		} else if(option == 'blue bubble') {
			$('.blueBarBubble').hide();
			$('.blueBar').hide();
			$('.blueBubble').hide();
			$('.whiteBarBubble').hide();
			$('.whiteBar').hide();
			$('.whiteBubble').hide();
			
			$('.blueBubble').show();
		} else if(option == 'white bar with bubble') {
			$('.blueBarBubble').hide();
			$('.blueBar').hide();
			$('.blueBubble').hide();
			$('.whiteBarBubble').hide();
			$('.whiteBar').hide();
			$('.whiteBubble').hide();
			
			$('.whiteBarBubble').show();
		} else if(option == 'white bar') {
			$('.blueBarBubble').hide();
			$('.blueBar').hide();
			$('.blueBubble').hide();
			$('.whiteBarBubble').hide();
			$('.whiteBar').hide();
			$('.whiteBubble').hide();
			
			$('.whiteBar').show();
		} else if(option == 'white bubble') {
			$('.blueBarBubble').hide();
			$('.blueBar').hide();
			$('.blueBubble').hide();
			$('.whiteBarBubble').hide();
			$('.whiteBar').hide();
			$('.whiteBubble').hide();
			
			$('.whiteBubble').show();
		} else if(option == 'turn off chiclet') {
			$('.blueBarBubble').hide();
			$('.blueBar').hide();
			$('.blueBubble').hide();
			$('.whiteBarBubble').hide();
			$('.whiteBar').hide();
			$('.whiteBubble').hide();
		}
	});
	
	$('#scheme').change(function() {
		var scheme = $(this).find('option:selected').attr('value');
		
		$.post(
			ajaxurl,
			{
				action: 'ANNOtype_scheme',
				scheme: scheme
			},
			function(data) {
				$('#bubblePreview').empty()
				$('#bubblePreview').append(data);
			}
		);
	});
	
	
	// ANNO Bubble Count
	$('#bubbleCount').change(function() {
		if($(this).is(':checked')) {
			$('.annotation').mouseover(function() {
				var currentPosition = $(this).find('.smallBubble').offset();
				
				$('.ANNOBubbleCount').css('position', 'absolute');
				$('.ANNOBubbleCount').css('left', currentPosition.left);
				$('.ANNOBubbleCount').css('top', currentPosition.top-8);
				$('.ANNOBubbleCount').fadeIn(150);
			}).mouseout(function() {
				$('.ANNOBubbleCount').fadeOut(150);
			});
		} else {
			$('.annotation').unbind('mouseover');
		}
	});
	
	if($('#bubbleCount').is(':checked')) {
		$('.annotation').mouseover(function() {
			var currentPosition = $(this).find('.smallBubble').offset();
			
			$('.ANNOBubbleCount').css('position', 'absolute');
			$('.ANNOBubbleCount').css('left', currentPosition.left);
			$('.ANNOBubbleCount').css('top', currentPosition.top-8);
			$('.ANNOBubbleCount').fadeIn(150);
		}).mouseout(function() {
			$('.ANNOBubbleCount').fadeOut(150);
		});
	}
	
	// Highlight background
	$('#highlightAnnotations').change(function() {
		if($(this).is(':checked')) {
			$('.annotation').css('background', '#' + $('input[name=highlightColor]').attr('value'));
		} else {
			$('.annotation').css('background', 'transparent');
		}
	});
	
	if($('#highlightAnnotations').is(':checked')) {
		$('.annotation').css('background', '#' + $('input[name=highlightColor]').attr('value'));
	} else {
		$('.annotation').css('background', 'transparent');
	}
	
	// Dashed Underline
	$('#dashedUnderline').click(function() {
		if($(this).is(':checked')) {
			$('.annotation').css('border-bottom', '1px dashed silver');
		} else {
			$('.annotation').css('border-bottom', '0');
		}
	});
	
	if($('#dashedUnderline').is(':checked')) {
		$('.annotation').css('border-bottom', '1px dashed silver');
	}
	
	
	// Colletion
	
	var collector = $('#collector option:selected').attr('value');
	if(collector == 'Aweber') {
		$('#emailCollectionSetup').prev('hr').show();
		$('#emailCollectionSetup').show();
		
		$('input[name=aweber]').parents('.option').slideDown();
		$('input[name=getResponse]').parents('.option').hide();
		$('input[name=mailchimp]').parents('.option').hide();
	}
	if(collector == 'Mailchimp') {
		$('#emailCollectionSetup').prev('hr').show();
		$('#emailCollectionSetup').show();
		
		$('input[name=aweber]').parents('.option').hide();
		$('input[name=getResponse]').parents('.option').hide();
		$('input[name=mailchimp]').parents('.option').slideDown();
	}
	if(collector == 'GetResponse') {
		$('#emailCollectionSetup').prev('hr').show();
		$('#emailCollectionSetup').show();
		
		$('input[name=aweber]').parents('.option').hide();
		$('input[name=mailchimp]').parents('.option').hide();
		$('input[name=getResponse]').parents('.option').slideDown();
	}
	
	$('#collector').change(function() {
		var selected = $(this).find('option:selected').attr('value');
		if(selected == 'Aweber') {
			$('#emailCollectionSetup').prev('hr').show();
			$('#emailCollectionSetup').show();
			
			$('input[name=aweber]').parents('.option').slideDown();
			$('input[name=getResponse]').parents('.option').hide();
			$('input[name=mailchimp]').parents('.option').hide();
		}
		if(selected == 'Mailchimp') {
			$('#emailCollectionSetup').prev('hr').show();
			$('#emailCollectionSetup').show();
			
			$('input[name=aweber]').parents('.option').hide();
			$('input[name=getResponse]').parents('.option').hide();
			$('input[name=mailchimp]').parents('.option').slideDown();
		}
		if(selected == 'GetResponse') {
			$('#emailCollectionSetup').prev('hr').show();
			$('#emailCollectionSetup').show();
			
			$('input[name=aweber]').parents('.option').hide();
			$('input[name=mailchimp]').parents('.option').hide();
			$('input[name=getResponse]').parents('.option').slideDown();
		}
		if(selected == 'Select') {
			$('#emailCollectionSetup').prev('hr').hide();
			$('#emailCollectionSetup').hide();
			
			$('input[name=aweber]').parents('.option').hide();
			$('input[name=mailchimp]').parents('.option').hide();
			$('input[name=getResponse]').parents('.option').hide();
		}
	});
});
