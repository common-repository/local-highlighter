/*
 Rangy, a cross-browser JavaScript range and selection library
 http://code.google.com/p/rangy/

 Copyright 2010, Tim Down
 Licensed under the MIT license.
 Version: 0.1.195
 Build date: 1 November 2010
*/
var rangy=function(){function q(f,n){var x=typeof f[n];return x=="function"||!!(x=="object"&&f[n])||x=="unknown"}function E(f,n){return!!(typeof f[n]=="object"&&f[n])}function F(f,n){return typeof f[n]!="undefined"}function u(f){return function(n,x){for(var C=x.length;C--;)if(!f(n,x[C]))return false;return true}}function A(f){window.alert("Rangy not supported in your browser. Reason: "+f);l.initialized=true;l.supported=false}function I(){if(!l.initialized){var f,n=false,x=false;if(q(document,"createRange")){f=
document.createRange();if(r(f,D)&&w(f,K))n=true;f.detach()}if((f=E(document,"body")?document.body:document.getElementsByTagName("body")[0])&&q(f,"createTextRange")){f=f.createTextRange();if(r(f,m)&&w(f,j))x=true}!n&&!x&&A("Neither Range nor TextRange are implemented");l.initialized=true;l.features={implementsDomRange:n,implementsTextRange:x};n=k.concat(d);x=0;for(f=n.length;x<f;++x)try{n[x](l)}catch(C){E(window,"console")&&q(window.console,"log")&&console.log("Init listener threw an exception. Continuing.",
C)}}}function G(f){this.name=f;this.supported=this.initialized=false}var K=["startContainer","startOffset","endContainer","endOffset","collapsed","commonAncestorContainer","START_TO_START","START_TO_END","END_TO_START","END_TO_END"],D=["setStart","setStartBefore","setStartAfter","setEnd","setEndBefore","setEndAfter","collapse","selectNode","selectNodeContents","compareBoundaryPoints","deleteContents","extractContents","cloneContents","insertNode","surroundContents","cloneRange","toString","detach"],
j=["boundingHeight","boundingLeft","boundingTop","boundingWidth","htmlText","text"],m=["collapse","compareEndPoints","duplicate","getBookmark","moveToBookmark","moveToElementText","parentElement","pasteHTML","select","setEndPoint"],r=u(q),v=u(E),w=u(F),l={initialized:false,supported:true,util:{isHostMethod:q,isHostObject:E,isHostProperty:F,areHostMethods:r,areHostObjects:v,areHostProperties:w,randomString:function(f){return f+ +new Date+"_"+(""+Math.random()).substr(2)}},features:{},modules:{},config:{alertOnWarn:false}};
l.fail=A;l.warn=function(f){f="Rangy warning: "+f;if(l.config.alertOnWarn)window.alert(f);else typeof window.console!="undefined"&&typeof window.console.log!="undefined"&&window.console.log(f)};l.init=I;var d=[],k=[];l.addInitListener=function(f){l.initialized?f(l):d.push(f)};G.prototype.fail=function(f){this.initialized=true;this.supported=false;throw Error("Module '"+this.name+"' failed to load: "+f);};G.prototype.createError=function(f){return Error("Error in Rangy "+this.name+" module: "+f)};
l.createModule=function(f,n){var x=new G(f);l.modules[f]=x;k.push(function(C){n(C,x);x.initialized=true;x.supported=true})};l.requireModules=function(f){for(var n=0,x=f.length,C,L;n<x;++n){L=f[n];C=l.modules[L];if(!C||!(C instanceof G))throw Error("Module '"+L+"' not found");if(!C.supported)throw Error("Module '"+L+"' not supported");}};var e=false;v=function(){if(!e){e=true;l.initialized||I()}};if(typeof window=="undefined")A("No window found");else if(typeof document=="undefined")A("No document found");
else{q(document,"addEventListener")&&document.addEventListener("DOMContentLoaded",v,false);if(q(window,"addEventListener"))window.addEventListener("load",v,false);else q(window,"attachEvent")?window.attachEvent("onload",v):A("Window does not have required addEventListener or attachEvent method");return l}}();
rangy.createModule("DomUtil",function(q,E){function F(d){for(var k=0;d=d.previousSibling;)k++;return k}function u(d,k){var e=[],f;for(f=d;f;f=f.parentNode)e.push(f);for(f=k;f;f=f.parentNode)if(l(e,f))return f;return null}function A(d,k,e){for(e=e?d:d.parentNode;e;){d=e.parentNode;if(d===k)return e;e=d}return null}function I(d){d=d.nodeType;return d==3||d==4||d==8}function G(d,k){var e=k.nextSibling,f=k.parentNode;e?f.insertBefore(d,e):f.appendChild(d);return d}function K(d){if(d.nodeType==9)return d;
else if(typeof d.ownerDocument!="undefined")return d.ownerDocument;else if(typeof d.document!="undefined")return d.document;else if(d.parentNode)return K(d.parentNode);else throw Error("getDocument: no document found for node");}function D(d){if(!d)return"[No node]";return I(d)?'"'+d.data+'"':d.nodeType==1?"<"+d.nodeName+(d.id?' id="'+d.id+'"':"")+">":d.nodeName}function j(d){this._next=this.root=d}function m(d,k){this.node=d;this.offset=k}function r(d){this.code=this[d];this.codeName=d;this.message=
"DOMException: "+this.codeName}var v=q.util;v.areHostMethods(document,["createDocumentFragment","createElement","createTextNode"])||E.fail("document missing a Node creation method");v.isHostMethod(document,"getElementsByTagName")||E.fail("document getElementsByTagName method");var w=document.createElement("div");v.areHostMethods(w,["insertBefore","appendChild","cloneNode"])||E.fail("Incomplete Element implementation");w=document.createTextNode("test");v.areHostMethods(w,["splitText","deleteData",
"insertData","appendData","cloneNode"])||E.fail("Incomplete Text Node implementation");var l=function(d,k){for(var e=d.length;e--;)if(d[e]===k)return true;return false};j.prototype={_current:null,hasNext:function(){return!!this._next},next:function(){var d=this._current=this._next,k;if(this._current)if(k=d.firstChild)this._next=k;else{for(k=null;d!==this.root&&!(k=d.nextSibling);)d=d.parentNode;this._next=k}return this._current},detach:function(){this._current=this._next=this.root=null}};m.prototype=
{equals:function(d){return this.node===d.node&this.offset==d.offset},inspect:function(){return"[DomPosition("+D(this.node)+":"+this.offset+")]"}};r.prototype={INDEX_SIZE_ERR:1,HIERARCHY_REQUEST_ERR:3,WRONG_DOCUMENT_ERR:4,NO_MODIFICATION_ALLOWED_ERR:7,NOT_FOUND_ERR:8,NOT_SUPPORTED_ERR:9,INVALID_STATE_ERR:11};r.prototype.toString=function(){return this.message};q.dom={arrayContains:l,getNodeIndex:F,getCommonAncestor:u,isAncestorOf:function(d,k,e){for(k=e?k:k.parentNode;k;)if(k===d)return true;else k=
k.parentNode;return false},getClosestAncestorIn:A,isCharacterDataNode:I,insertAfter:G,splitDataNode:function(d,k){var e;if(d.nodeType==3)e=d.splitText(k);else{e=d.cloneNode();e.deleteData(0,k);d.deleteData(0,d.length-k);G(e,d)}return e},getDocument:K,getWindow:function(d){d=K(d);if(typeof d.defaultView!="undefined")return d.defaultView;else if(typeof d.parentWindow!="undefined")return d.parentWindow;else throw Error("Cannot get a window object for node");},getBody:function(d){return v.isHostObject(d,
"body")?d.body:d.getElementsByTagName("body")[0]},comparePoints:function(d,k,e,f){var n;if(d==e)return k===f?0:k<f?-1:1;else if(n=A(e,d,true))return k<=F(n)?-1:1;else if(n=A(d,e,true))return F(n)<f?-1:1;else{k=u(d,e);d=d===k?k:A(d,k,true);e=e===k?k:A(e,k,true);if(d===e)throw Error("comparePoints got to case 4 and childA and childB are the same!");else{for(k=k.firstChild;k;){if(k===d)return-1;else if(k===e)return 1;k=k.nextSibling}throw Error("Should not be here!");}}},inspectNode:D,createIterator:function(d){return new j(d)},
DomPosition:m,DOMException:r}});
rangy.createModule("DomRange",function(q){function E(a,h){this.range=a;this.clonePartiallySelectedTextNodes=h;if(!a.collapsed){this.sc=a.startContainer;this.so=a.startOffset;this.ec=a.endContainer;this.eo=a.endOffset;var t=a.commonAncestorContainer;if(this.sc===this.ec&&o.isCharacterDataNode(this.sc)){this.isSingleCharacterDataNode=true;this._first=this._last=this._next=this.sc}else{this._first=this._next=this.sc===t&&!o.isCharacterDataNode(this.sc)?this.sc.childNodes[this.so]:o.getClosestAncestorIn(this.sc,
t,true);this._last=this.ec===t&&!o.isCharacterDataNode(this.ec)?this.ec.childNodes[this.eo-1]:o.getClosestAncestorIn(this.ec,t,true)}}}function F(a){this.code=this[a];this.codeName=a;this.message="RangeException: "+this.codeName}function u(a){return o.getDocument(a.startContainer)}function A(a,h,t){if(h=a._listeners[h])for(var y=0,H=h.length;y<H;++y)h[y].call(a,{target:a,args:t})}function I(a){return new P(a.parentNode,o.getNodeIndex(a))}function G(a){return new P(a.parentNode,o.getNodeIndex(a)+1)}
function K(a){return o.isCharacterDataNode(a)?a.length:a.childNodes?a.childNodes.length:0}function D(a,h,t){var y=a.nodeType==11?a.firstChild:a;if(o.isCharacterDataNode(h))t==h.length?o.insertAfter(a,h):h.parentNode.insertBefore(a,t==0?h:o.splitDataNode(h,t));else t>=h.childNodes.length?h.appendChild(a):h.insertBefore(a,h.childNodes[t]);return y}function j(a){for(var h,t,y=u(a.range).createDocumentFragment();t=a.next();){h=a.isPartiallySelectedSubtree();t=t.cloneNode(!h);if(h){h=a.getSubtreeIterator();
t.appendChild(j(h));h.detach(true)}if(t.nodeType==10)throw new M("HIERARCHY_REQUEST_ERR");y.appendChild(t)}return y}function m(a,h,t){var y,H;for(t=t||{stop:false};y=a.next();)if(a.isPartiallySelectedSubtree())if(h(y)===false){t.stop=true;return}else{y=a.getSubtreeIterator();m(y,h,t);y.detach(true);if(t.stop)return}else for(y=o.createIterator(y);H=y.next();)if(h(H)===false){t.stop=true;return}}function r(a){for(var h;a.next();)if(a.isPartiallySelectedSubtree()){h=a.getSubtreeIterator();r(h);h.detach(true)}else a.remove()}
function v(a){for(var h,t=u(a.range).createDocumentFragment(),y;h=a.next();){if(a.isPartiallySelectedSubtree()){h=h.cloneNode(false);y=a.getSubtreeIterator();h.appendChild(v(y));y.detach(true)}else a.remove();if(h.nodeType==10)throw new M("HIERARCHY_REQUEST_ERR");t.appendChild(h)}return t}function w(a,h,t){var y=!!(h&&h.length),H,Q=!!t;if(y)H=RegExp("^("+h.join("|")+")$");var U=[];m(new E(a,false),function(V){if((!y||H.test(V.nodeType))&&(!Q||t(V)))U.push(V)});return U}function l(a,h,t){this.nodes=
w(a,h,t);this._next=this.nodes[0];this._pointer=0}function d(a,h){return a.nodeType!=3&&(o.isAncestorOf(a,h.startContainer,true)||o.isAncestorOf(a,h.endContainer,true))}function k(a){return function(h,t){for(var y,H=t?h:h.parentNode;H;){y=H.nodeType;if(o.arrayContains(a,y))return H;H=H.parentNode}return null}}function e(a){for(var h;h=a.parentNode;)a=h;return a}function f(a,h){if(ia(a,h))throw new F("INVALID_NODE_TYPE_ERR");}function n(a){if(!a.startContainer)throw new M("INVALID_STATE_ERR");}function x(a,
h){if(!o.arrayContains(h,a.nodeType))throw new F("INVALID_NODE_TYPE_ERR");}function C(a,h){if(h<0||h>(o.isCharacterDataNode(a)?a.length:a.childNodes.length))throw new M("INDEX_SIZE_ERR");}function L(a,h){if(aa(a,true)!==aa(h,true))throw new M("WRONG_DOCUMENT_ERR");}function T(a){if(ja(a,true))throw new M("NO_MODIFICATION_ALLOWED_ERR");}function R(a,h){if(!a)throw new M(h);}function W(a){a.START_TO_START=Y;a.START_TO_END=ba;a.END_TO_END=ka;a.END_TO_START=ca;a.NODE_BEFORE=da;a.NODE_AFTER=ea;a.NODE_BEFORE_AND_AFTER=
fa;a.NODE_INSIDE=Z}function S(a){W(a);W(a.prototype)}function b(a,h,t){function y(c,g){return function(p){n(this);x(p,ga);x(e(p),la);p=(c?I:G)(p);(g?H:Q)(this,p.node,p.offset)}}function H(c,g,p){var B=c.endContainer,J=c.endOffset;if(g!==c.startContainer||p!==this.startOffset){if(e(g)!=e(B)||o.comparePoints(g,p,B,J)==1){B=g;J=p}h(c,g,p,B,J)}}function Q(c,g,p){var B=c.startContainer,J=c.startOffset;if(g!==c.endContainer||p!==this.endOffset){if(e(g)!=e(B)||o.comparePoints(g,p,B,J)==-1){B=g;J=p}h(c,B,
J,g,p)}}function U(c,g,p){if(g!==c.startContainer||p!==this.startOffset||g!==c.endContainer||p!==this.endOffset)h(c,g,p,g,p)}function V(c){return function(){n(this);var g=this.startContainer,p=this.startOffset,B=this.commonAncestorContainer,J=new E(this,true);if(g!==B){g=o.getClosestAncestorIn(g,B,true);p=G(g);g=p.node;p=p.offset}m(J,T);J.reset();B=c(J);J.detach();h(this,g,p,g,p);return B}}a.prototype={attachListener:function(c,g){this._listeners[c].push(g)},setStart:function(c,g){n(this);f(c,true);
C(c,g);H(this,c,g)},setEnd:function(c,g){n(this);f(c,true);C(c,g);Q(this,c,g)},setStartBefore:y(true,true),setStartAfter:y(false,true),setEndBefore:y(true,false),setEndAfter:y(false,false),collapse:function(c){n(this);c?h(this,this.startContainer,this.startOffset,this.startContainer,this.startOffset):h(this,this.endContainer,this.endOffset,this.endContainer,this.endOffset)},selectNodeContents:function(c){n(this);f(c,true);h(this,c,0,c,K(c))},selectNode:function(c){n(this);f(c,false);x(c,ga);var g=
I(c);c=G(c);h(this,g.node,g.offset,c.node,c.offset)},compareBoundaryPoints:function(c,g){n(this);L(this.startContainer,g.startContainer);var p=c==ca||c==Y?"start":"end",B=c==ba||c==Y?"start":"end";return o.comparePoints(this[p+"Container"],this[p+"Offset"],g[B+"Container"],g[B+"Offset"])},insertNode:function(c){n(this);x(c,ma);T(this.startContainer);if(o.isAncestorOf(c,this.startContainer,true))throw new M("HIERARCHY_REQUEST_ERR");this.setStartBefore(D(c,this.startContainer,this.startOffset))},cloneContents:function(){n(this);
var c,g;if(this.collapsed)return u(this).createDocumentFragment();else{if(this.startContainer===this.endContainer&&o.isCharacterDataNode(this.startContainer)){c=this.startContainer.cloneNode(true);c.data=c.data.slice(this.startOffset,this.endOffset);g=u(this).createDocumentFragment();g.appendChild(c);return g}else{g=new E(this,true);c=j(g);g.detach()}return c}},extractContents:V(v),deleteContents:V(r),surroundContents:function(c){n(this);T(this.startContainer);T(this.endContainer);x(c,na);var g=new E(this,
true),p=g._first&&d(g._first,this)||g._last&&d(g._last,this);g.detach();if(p)throw new F("BAD_BOUNDARYPOINTS_ERR");g=this.extractContents();if(c.hasChildNodes())for(;c.lastChild;)c.removeChild(c.lastChild);D(c,this.startContainer,this.startOffset);c.appendChild(g);this.selectNode(c)},cloneRange:function(){n(this);for(var c=new z(u(this)),g=$.length,p;g--;){p=$[g];c[p]=this[p]}return c},detach:function(){t(this)},toString:function(){n(this);var c=this.startContainer;if(c===this.endContainer&&o.isCharacterDataNode(c))return c.nodeType==
3||c.nodeType==4?c.data.slice(this.startOffset,this.endOffset):"";else{var g=[];c=new E(this,true);m(c,function(p){if(p.nodeType==3||p.nodeType==4)g.push(p.data)});c.detach();return g.join("")}},compareNode:function(c){var g=c.parentNode,p=o.getNodeIndex(c);if(!g)throw new M("NOT_FOUND_ERR");c=this.comparePoint(g,p);g=this.comparePoint(g,p+1);return c<0?g>0?fa:da:g>0?ea:Z},comparePoint:function(c,g){n(this);R(c,"HIERARCHY_REQUEST_ERR");L(c,this.startContainer);if(o.comparePoints(c,g,this.startContainer,
this.startOffset)<0)return-1;else if(o.comparePoints(c,g,this.endContainer,this.endOffset)>0)return 1;return 0},createContextualFragment:function(c){n(this);var g=u(this),p=g.createElement("div");p.innerHTML=c;for(c=g.createDocumentFragment();g=p.firstChild;)c.appendChild(g);return c},intersectsNode:function(c){n(this);R(c,"NOT_FOUND_ERR");if(o.getDocument(c)!==u(this))return false;var g=c.parentNode,p=o.getNodeIndex(c);R(g,"NOT_FOUND_ERR");c=o.comparePoints(g,p,this.startContainer,this.startOffset);
g=o.comparePoints(g,p+1,this.endContainer,this.endOffset);return!(c<0&&g<0||c>0&&g>0)},isPointInRange:function(c,g){n(this);R(c,"HIERARCHY_REQUEST_ERR");L(c,this.startContainer);return o.comparePoints(c,g,this.startContainer,this.startOffset)>=0&&o.comparePoints(c,g,this.endContainer,this.endOffset)<=0},intersectsRange:function(c){n(this);if(u(c)!=u(this))throw new M("WRONG_DOCUMENT_ERR");return o.comparePoints(this.startContainer,this.startOffset,c.endContainer,c.endOffset)<0&&o.comparePoints(this.endContainer,
this.endOffset,c.startContainer,c.startOffset)>0},containsNode:function(c,g){return g?this.intersectsNode(c):this.compareNode(c)==Z},containsNodeContents:function(c){return this.comparePoint(c,0)>=0&&this.comparePoint(c,K(c))<=0},splitBoundaries:function(){var c=this.startContainer,g=this.startOffset,p=this.endContainer,B=this.endOffset,J=c===p;n(this);o.isCharacterDataNode(p)&&B<p.length&&o.splitDataNode(p,B);if(o.isCharacterDataNode(c)&&g>0){c=o.splitDataNode(c,g);if(J){B-=g;p=c}g=0}h(this,c,g,
p,B)},normalizeBoundaries:function(){n(this);var c=this.startContainer,g=this.startOffset,p=this.endContainer,B=this.endOffset,J=function(O){var N=O.nextSibling;if(N&&N.nodeType==O.nodeType){p=O;B=O.length;O.appendData(N.data);N.parentNode.removeChild(N)}},ha=function(O){var N=O.previousSibling;if(N&&N.nodeType==O.nodeType){c=O;g=N.length;O.insertData(0,N.data);N.parentNode.removeChild(N);if(c==p){B+=g;p=c}}},X=true;if(o.isCharacterDataNode(p))p.length==B&&J(p);else{if(B>0)(X=p.childNodes[B-1])&&
o.isCharacterDataNode(X)&&J(X);X=!this.collapsed}if(X)if(o.isCharacterDataNode(c))g==0&&ha(c);else{if(g<c.childNodes.length)(J=c.childNodes[g])&&o.isCharacterDataNode(J)&&ha(J)}else{c=p;g=B}h(this,c,g,p,B)},createNodeIterator:function(c,g){return new l(this,c,g)},getNodes:function(c,g){return w(this,c,g)},collapseToPoint:function(c,g){n(this);f(c,true);C(c,g);U(this,c,g)},collapseBefore:function(c){this.setEndBefore(c);this.collapse(false)},collapseAfter:function(c){this.setStartAfter(c);this.collapse(true)},
getName:function(){return"DomRange"},inspect:function(){return"["+(this.getName?this.getName():"Range")+"("+o.inspectNode(this.startContainer)+":"+this.startOffset+", "+o.inspectNode(this.endContainer)+":"+this.endOffset+")]"}};S(a)}function i(a){a.collapsed=a.startContainer===a.endContainer&&a.startOffset===a.endOffset;a.commonAncestorContainer=a.collapsed?a.startContainer:o.getCommonAncestor(a.startContainer,a.endContainer)}function s(a,h,t,y,H){var Q=a.startContainer!==h||a.startOffset!==t,U=a.endContainer!==
y||a.endOffset!==H;a.startContainer=h;a.startOffset=t;a.endContainer=y;a.endOffset=H;i(a);A(a,"boundarychange",{startMoved:Q,endMoved:U})}function z(a){this.startContainer=a;this.startOffset=0;this.endContainer=a;this.endOffset=0;this._listeners={boundarychange:[],detach:[]};i(this)}q.requireModules(["DomUtil"]);var o=q.dom,P=o.DomPosition,M=o.DOMException;E.prototype={_current:null,_next:null,_first:null,_last:null,isSingleCharacterDataNode:false,reset:function(){this._current=null;this._next=this._first},
hasNext:function(){return!!this._next},next:function(){var a=this._current=this._next;if(a){this._next=a!==this._last?a.nextSibling:null;if(o.isCharacterDataNode(a)&&this.clonePartiallySelectedTextNodes){if(a===this.ec)(a=a.cloneNode(true)).deleteData(this.eo,a.length-this.eo);if(this._current===this.sc)(a=a.cloneNode(true)).deleteData(0,this.so)}}return a},remove:function(){var a=this._current,h,t;if(o.isCharacterDataNode(a)&&(a===this.sc||a===this.ec)){h=a===this.sc?this.so:0;t=a===this.ec?this.eo:
a.length;h!=t&&a.deleteData(h,t-h)}else a.parentNode&&a.parentNode.removeChild(a)},isPartiallySelectedSubtree:function(){return d(this._current,this.range)},getSubtreeIterator:function(){var a;if(this.isSingleCharacterDataNode){a=this.range.cloneRange();a.collapse()}else{a=new z(u(this.range));var h=this._current,t=h,y=0,H=h,Q=K(h);if(o.isAncestorOf(h,this.sc,true)){t=this.sc;y=this.so}if(o.isAncestorOf(h,this.ec,true)){H=this.ec;Q=this.eo}s(a,t,y,H,Q)}return new E(a,this.clonePartiallySelectedTextNodes)},
detach:function(a){a&&this.range.detach();this.range=this._current=this._next=this._first=this._last=this.sc=this.so=this.ec=this.eo=null}};F.prototype={BAD_BOUNDARYPOINTS_ERR:1,INVALID_NODE_TYPE_ERR:2};F.prototype.toString=function(){return this.message};l.prototype={_current:null,hasNext:function(){return!!this._next},next:function(){this._current=this._next;this._next=this.nodes[++this._pointer];return this._current},detach:function(){this._current=this._next=this.nodes=null}};var ga=[1,3,4,5,
7,8,10],la=[2,9,11],ma=[1,3,4,5,7,8,10,11],na=[1,3,4,5,7,8],aa=k([9,11]),ja=k([5,6,10,12]),ia=k([6,10,12]),$=["startContainer","startOffset","endContainer","endOffset","collapsed","commonAncestorContainer"],Y=0,ba=1,ka=2,ca=3,da=0,ea=1,fa=2,Z=3;b(z,s,function(a){n(a);a.startContainer=a.startOffset=a.endContainer=a.endOffset=null;a.collapsed=a.commonAncestorContainer=null;A(a,"detach",null);a._listeners=null});z.fromRange=function(a){var h=new z(u(a));s(h,a.startContainer,a.startOffset,a.endContainer,
a.endOffset);return h};z.rangeProperties=$;z.RangeIterator=E;z.DOMException=M;z.RangeException=F;z.copyComparisonConstants=S;z.createPrototypeRange=b;z.util={getRangeDocument:u,getEndOffset:K,rangesEqual:function(a,h){return a.startContainer===h.startContainer&&a.startOffset===h.startOffset&&a.endContainer===h.endContainer&&a.endOffset===h.endOffset}};q.DomRange=z});
rangy.createModule("WrappedRange",function(q){function E(j,m,r,v){var w=j.duplicate();w.collapse(r);var l=w.parentElement();A.isAncestorOf(m,l,true)||(l=m);if(!l.canHaveHTML)return new I(l.parentNode,A.getNodeIndex(l));m=A.getDocument(l).createElement("span");var d,k=r?"StartToStart":"StartToEnd";do{l.insertBefore(m,m.previousSibling);w.moveToElementText(m)}while((d=w.compareEndPoints(k,j))>0&&m.previousSibling);k=m.nextSibling;if(d==-1&&k){w.setEndPoint(r?"EndToStart":"EndToEnd",j);if(/[\r\n]/.test(k.data)){l=
w.duplicate();r=l.text.replace(/\r\n/g,"\r").length;for(r=l.moveStart("character",r);l.compareEndPoints("StartToEnd",l)==-1;){r++;l.moveStart("character",1)}}else r=w.text.length;l=new I(k,r)}else{k=(v||!r)&&m.previousSibling;l=(r=(v||r)&&m.nextSibling)&&A.isCharacterDataNode(r)?new I(r,0):k&&A.isCharacterDataNode(k)?new I(k,k.length):new I(l,A.getNodeIndex(m))}m.parentNode.removeChild(m);return l}function F(j,m){var r,v,w=j.offset,l=A.getDocument(j.node),d=l.body.createTextRange(),k=false,e=false,
f=A.isCharacterDataNode(j.node);if(f){r=j.node;v=r.parentNode;if(v.nodeType==1)if(w==0&&!r.previousSibling)k=true;else if(w==r.length&&!r.nextSibling)e=true}else{r=j.node.childNodes;if(j.node.nodeType==1)if(w==0)k=true;else if(w==r.length)e=true;r=w<r.length?r[w]:null;v=j.node}if(k||e){d.moveToElementText(v);d.collapse(k)}else{l=l.createElement("span");l.innerHTML="&#ffef;";r?v.insertBefore(l,r):v.appendChild(l);d.moveToElementText(l);d.collapse(!m);v.removeChild(l);if(f)d[m?"moveStart":"moveEnd"]("character",
w)}return d}q.requireModules(["DomUtil","DomRange"]);var u,A=q.dom,I=A.DomPosition,G=q.DomRange,K=G.util;if(q.features.implementsDomRange)(function(){function j(e){for(var f=r.length,n;f--;){n=r[f];e[n]=e.nativeRange[n]}}var m,r=G.rangeProperties,v,w;u=function(e){if(!e)throw Error("Range must be specified");this.nativeRange=e;j(this)};G.createPrototypeRange(u,function(e,f,n,x,C){var L=e.startContainer!==f||e.startOffset!=n;(e.endContainer!==x||e.endOffset!=C)&&e.setEnd(x,C);L&&e.setStart(f,n)},function(e){e.nativeRange.detach();
e.detached=true;for(var f=r.length,n;f--;){n=r[f];e[n]=null}});m=u.prototype;m.selectNode=function(e){this.nativeRange.selectNode(e);j(this)};m.deleteContents=function(){this.nativeRange.deleteContents();j(this)};m.extractContents=function(){var e=this.nativeRange.extractContents();j(this);return e};m.cloneContents=function(){return this.nativeRange.cloneContents()};m.surroundContents=function(e){this.nativeRange.surroundContents(e);j(this)};m.collapse=function(e){this.nativeRange.collapse(e);j(this)};
m.cloneRange=function(){return new u(this.nativeRange.cloneRange())};m.refresh=function(){j(this)};m.toString=function(){return this.nativeRange.toString()};var l=document.createTextNode("test");A.getBody(document).appendChild(l);var d=document.createRange();d.setStart(l,0);d.setEnd(l,0);try{d.setStart(l,1);v=true;m.setStart=function(e,f){this.nativeRange.setStart(e,f);j(this)};m.setEnd=function(e,f){this.nativeRange.setEnd(e,f);j(this)};w=function(e){return function(f){this.nativeRange[e](f);j(this)}}}catch(k){v=
false;m.setStart=function(e,f){try{this.nativeRange.setStart(e,f)}catch(n){this.nativeRange.setEnd(e,f);this.nativeRange.setStart(e,f)}j(this)};m.setEnd=function(e,f){try{this.nativeRange.setEnd(e,f)}catch(n){this.nativeRange.setStart(e,f);this.nativeRange.setEnd(e,f)}j(this)};w=function(e,f){return function(n){try{this.nativeRange[e](n)}catch(x){this.nativeRange[f](n);this.nativeRange[e](n)}j(this)}}}m.setStartBefore=w("setStartBefore","setEndBefore");m.setStartAfter=w("setStartAfter","setEndAfter");
m.setEndBefore=w("setEndBefore","setStartBefore");m.setEndAfter=w("setEndAfter","setStartAfter");d.selectNodeContents(l);m.selectNodeContents=d.startContainer==l&&d.endContainer==l&&d.startOffset==0&&d.endOffset==l.length?function(e){this.nativeRange.selectNodeContents(e);j(this)}:function(e){this.setStart(e,0);this.setEnd(e,K.getEndOffset(e))};d.selectNodeContents(l);d.setEnd(l,3);v=document.createRange();v.selectNodeContents(l);v.setEnd(l,4);v.setStart(l,2);m.compareBoundaryPoints=d.compareBoundaryPoints(d.START_TO_END,
v)==-1&&d.compareBoundaryPoints(d.END_TO_START,v)==1?function(e,f){f=f.nativeRange||f;if(e==f.START_TO_END)e=f.END_TO_START;else if(e==f.END_TO_START)e=f.START_TO_END;return this.nativeRange.compareBoundaryPoints(e,f)}:function(e,f){return this.nativeRange.compareBoundaryPoints(e,f.nativeRange||f)};A.getBody(document).removeChild(l);d.detach();v.detach()})();else if(q.features.implementsTextRange){u=function(j){this.textRange=j;this.refresh()};u.prototype=new G(document);u.prototype.refresh=function(){var j,
m;m=this.textRange.duplicate();var r=m.getBookmark();m.collapse(true);j=m.parentElement();m.moveToBookmark(r);m.collapse(false);m=m.parentElement();m=j==m?j:A.getCommonAncestor(j,m);if(this.textRange.compareEndPoints("StartToEnd",this.textRange)==0)m=j=E(this.textRange,m,true,true);else{j=E(this.textRange,m,true,false);m=E(this.textRange,m,false,false)}this.setStart(j.node,j.offset);this.setEnd(m.node,m.offset)};u.rangeToTextRange=function(j){if(j.collapsed)return F(new I(j.startContainer,j.startOffset),
true,true);else{var m=F(new I(j.startContainer,j.startOffset),true,false),r=F(new I(j.endContainer,j.endOffset),false,false);j=A.getDocument(j.startContainer).body.createTextRange();j.setEndPoint("StartToStart",m);j.setEndPoint("EndToEnd",r);return j}};G.copyComparisonConstants(u);var D=function(){return this}();if(typeof D.Range=="undefined")D.Range=u}u.prototype.getName=function(){return"WrappedRange"};q.WrappedRange=u;q.createNativeRange=function(j){j=j||document;if(q.features.implementsDomRange)return j.createRange();
else if(q.features.implementsTextRange)return j.body.createTextRange()};q.createRange=function(j){j=j||document;return new u(q.createNativeRange(j))};q.createRangyRange=function(j){j=j||document;return new G(j)}});
rangy.createModule("WrappedSelection",function(q,E){function F(b,i,s){var z=s?"end":"start";s=s?"start":"end";b.anchorNode=i[z+"Container"];b.anchorOffset=i[z+"Offset"];b.focusNode=i[s+"Container"];b.focusOffset=i[s+"Offset"]}function u(b){b.anchorNode=b.focusNode=null;b.anchorOffset=b.focusOffset=0;b.rangeCount=0;b.isCollapsed=true;b._ranges.length=0}function A(b){var i;if(b instanceof m){i=b._selectionNativeRange;if(!i){i=q.createNativeRange(D.getDocument(b.startContainer));i.setEnd(b.endContainer,
b.endOffset);i.setStart(b.startContainer,b.startOffset);b._selectionNativeRange=i;b.attachListener("detach",function(){this._selectionNativeRange=null})}}else if(b instanceof r)i=b.nativeRange;else if(window.Range&&b instanceof Range)i=b;return i}function I(b){b=b.getNodes();if(b.length!=1||b[0].nodeType!=1)throw Error("getSingleElementFromRange: range did not consist of a single element");return b[0]}function G(b){b._ranges.length=0;if(b.nativeSelection.type=="None")u(b);else{var i=b.nativeSelection.createRange();
b.rangeCount=i.length;for(var s,z=D.getDocument(i.item(0)),o=0;o<b.rangeCount;++o){s=q.createRange(z);s.selectNode(i.item(o));b._ranges.push(s)}b.isCollapsed=b.rangeCount==1&&b._ranges[0].collapsed;F(b,b._ranges[b.rangeCount-1],false)}}function K(b){this.nativeSelection=b;this._ranges=[];this.refresh()}q.requireModules(["DomUtil","DomRange","WrappedRange"]);q.config.checkSelectionRanges=true;var D=q.dom,j=q.util,m=q.DomRange,r=q.WrappedRange,v=D.DOMException,w,l;if(q.util.isHostMethod(window,"getSelection"))w=
function(b){return(b||window).getSelection()};else if(q.util.isHostObject(document,"selection"))w=function(b){return(b||window).document.selection};else E.fail("No means of obtaining a selection object");q.getNativeSelection=w;var d=w(),k=q.createNativeRange(document),e=D.getBody(document),f=j.areHostObjects(d,j.areHostProperties(d,["anchorOffset","focusOffset"]));q.features.selectionHasAnchorAndFocus=f;var n=false;if(j.areHostMethods(d,["addRange","getRangeAt","removeAllRanges"])&&typeof d.rangeCount==
"number"&&q.features.implementsDomRange){var x=e.appendChild(document.createTextNode("One")),C=e.appendChild(document.createTextNode("Two")),L=q.createNativeRange(document);L.selectNodeContents(x);var T=q.createNativeRange(document);T.selectNodeContents(C);d.removeAllRanges();d.addRange(L);d.addRange(T);n=d.rangeCount==2;d.removeAllRanges();x.parentNode.removeChild(x);C.parentNode.removeChild(C)}q.features.selectionSupportsMultipleRanges=n;x=j.isHostProperty(d,"type");C=false;if(e&&j.isHostMethod(e,
"createControlRange")){e=e.createControlRange();if(j.areHostProperties(e,["item","add"]))C=true}q.features.implementsControlRange=C;l=f?function(b){return b.anchorNode===b.focusNode&&b.anchorOffset===b.focusOffset}:function(b){return b.rangeCount?b.getRangeAt(b.rangeCount-1).collapsed:false};var R;if(j.isHostMethod(d,"getRangeAt"))R=function(b,i){try{return b.getRangeAt(i)}catch(s){return null}};else if(f)R=function(b){var i=D.getDocument(b.anchorNode);i=q.createRange(i);i.setStart(b.anchorNode,b.anchorOffset);
i.setEnd(b.focusNode,b.focusOffset);if(i.collapsed!==this.isCollapsed){i.setStart(b.focusNode,b.focusOffset);i.setEnd(b.anchorNode,b.anchorOffset)}return i};q.getSelection=function(b){b=b||window;var i=b._rangySelection;if(i)i.refresh();else{i=new K(w(b));b._rangySelection=i}return i};e=K.prototype;if(f&&j.areHostMethods(d,["removeAllRanges","addRange"])){e.removeAllRanges=function(){this.nativeSelection.removeAllRanges();u(this)};e.addRange=function(b){if(n)this.rangeCount++;else{this.removeAllRanges();
this.rangeCount=1}this.nativeSelection.addRange(A(b));if(q.config.checkSelectionRanges){var i=R(this.nativeSelection,this.rangeCount-1);if(i&&!m.util.rangesEqual(i,b))b=i}this._ranges[this.rangeCount-1]=b;F(this,b,S(this.nativeSelection));this.isCollapsed=l(this)};e.setRanges=function(b){this.removeAllRanges();for(var i=0,s=b.length;i<s;++i)this.addRange(b[i])}}else if(j.isHostMethod(d,"empty")&&j.isHostMethod(k,"select")&&x&&C){e.removeAllRanges=function(){this.nativeSelection.empty();u(this)};e.addRange=
function(b){if(this.nativeSelection.type=="Control"){var i=this.nativeSelection.createRange();b=I(b);var s=D.getDocument(i.item(0));s=D.getBody(s).createControlRange();for(var z=0,o=i.length;z<o;++z)s.add(i.item(z));s.add(b);s.select();G(this)}else{r.rangeToTextRange(b).select();this._ranges[0]=b;this.rangeCount=1;this.isCollapsed=this._ranges[0].collapsed;F(this,b,false)}};e.setRanges=function(b){this.removeAllRanges();var i=b.length;if(i>1){var s=D.getDocument(b[0].startContainer);s=D.getBody(s).createControlRange();
for(var z=0;z<i;++z)s.add(I(b[z]));s.select();G(this)}else i&&this.addRange(b[0])}}else{E.fail("No means of selecting a Range or TextRange was found");return false}e.getRangeAt=function(b){if(b<0||b>=this.rangeCount)throw new v("INDEX_SIZE_ERR");else return this._ranges[b]};if(j.isHostMethod(d,"getRangeAt")&&typeof d.rangeCount=="number")e.refresh=function(){if(this._ranges.length=this.rangeCount=this.nativeSelection.rangeCount){for(var b=0,i=this.rangeCount;b<i;++b)this._ranges[b]=new q.WrappedRange(this.nativeSelection.getRangeAt(b));
F(this,this._ranges[this.rangeCount-1],S(this.nativeSelection));this.isCollapsed=l(this)}else u(this)};else if(f&&typeof d.isCollapsed=="boolean"&&typeof k.collapsed=="boolean"&&q.features.implementsDomRange)e.refresh=function(){var b;b=this.nativeSelection;if(b.anchorNode){b=R(b,0);this._ranges=[b];this.rangeCount=1;b=this.nativeSelection;this.anchorNode=b.anchorNode;this.anchorOffset=b.anchorOffset;this.focusNode=b.focusNode;this.focusOffset=b.focusOffset;this.isCollapsed=l(this)}else u(this)};
else if(j.isHostMethod(d,"createRange")&&q.features.implementsTextRange)e.refresh=function(){var b=this.nativeSelection.createRange();if(this.nativeSelection.type=="Control")G(this);else if(b&&typeof b.text!="undefined"){b=new r(b);this._ranges=[b];F(this,b,false);this.rangeCount=1;this.isCollapsed=b.collapsed}else u(this)};else{E.fail("No means of obtaining a Range or TextRange from the user's selection was found");return false}var W=function(b,i){var s=b.getAllRanges(),z=false;b.removeAllRanges();
for(var o=0,P=s.length;o<P;++o)if(z||i!==s[o])b.addRange(s[o]);else z=true;b.rangeCount||u(b)};e.removeRange=x&&C?function(b){if(this.nativeSelection.type=="Control"){var i=this.nativeSelection.createRange();b=I(b);var s=D.getDocument(i.item(0));s=D.getBody(s).createControlRange();for(var z,o=false,P=0,M=i.length;P<M;++P){z=i.item(P);if(z!==b||o)s.add(i.item(P));else o=true}s.select();G(this)}else W(this,b)}:function(b){W(this,b)};var S;if(f&&q.features.implementsDomRange){S=function(b){var i=false;
if(b.anchorNode)i=D.comparePoints(b.anchorNode,b.anchorOffset,b.focusNode,b.focusOffset)==1;return i};e.isBackwards=function(){return S(this)}}else S=e.isBackwards=function(){return false};e.toString=function(){for(var b=[],i=0,s=this.rangeCount;i<s;++i)b[i]=""+this._ranges[i];return b.join("")};e.collapse=function(b,i){if(this.anchorNode&&D.getDocument(this.anchorNode)!==D.getDocument(b))throw new v("WRONG_DOCUMENT_ERR");var s=q.createRange(D.getDocument(b));s.setStart(b,i);s.collapse(true);this.removeAllRanges();
this.addRange(s);this.isCollapsed=true};e.collapseToStart=function(){if(this.rangeCount){var b=this._ranges[0];this.collapse(b.startContainer,b.startOffset)}else throw new v("INVALID_STATE_ERR");};e.collapseToEnd=function(){if(this.rangeCount){var b=this._ranges[this.rangeCount-1];this.collapse(b.endContainer,b.endOffset)}else throw new v("INVALID_STATE_ERR");};e.selectAllChildren=function(b){this.collapse(b,0);var i=this.getRangeAt(0);i.selectNodeContents(b);this.removeAllRanges();this.addRange(i)};
e.deleteFromDocument=function(){if(this.rangeCount){var b=this.getAllRanges();this.removeAllRanges();for(var i=0,s=b.length;i<s;++i)b[i].deleteContents();this.addRange(b[s-1])}};e.getAllRanges=function(){return this._ranges.slice(0)};e.setSingleRange=function(b){this.setRanges([b])};e.containsNode=function(b,i){for(var s=0,z=this._ranges.length;s<z;++s)if(this._ranges[s].containsNode(b,i))return true;return false};e.inspect=function(){for(var b=[],i=0,s=this.rangeCount;i<s;++i)b[i]=this._ranges[i].inspect();
return"[WrappedSelection("+b.join(", ")+")]"};e.detach=function(){if(this.anchorNode)D.getWindow(this.anchorNode)._rangySelection=null}});