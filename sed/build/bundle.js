var app=function(){"use strict";function t(){}function n(t){return t()}function e(){return Object.create(null)}function r(t){t.forEach(n)}function i(t){return"function"==typeof t}function o(t,n){return t!=t?n==n:t!==n||t&&"object"==typeof t||"function"==typeof t}function a(n,e,r){n.$$.on_destroy.push(function(n,...e){if(null==n)return t;const r=n.subscribe(...e);return r.unsubscribe?()=>r.unsubscribe():r}(e,r))}function u(t,n){t.appendChild(n)}function s(t,n,e){t.insertBefore(n,e||null)}function c(t){t.parentNode.removeChild(t)}function l(t){return document.createElement(t)}function h(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function f(t){return document.createTextNode(t)}function g(){return f(" ")}function d(t,n,e){null==e?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}function p(t,n){n=""+n,t.wholeText!==n&&(t.data=n)}let m;function y(t){m=t}const w=[],v=[],b=[],x=[],$=Promise.resolve();let M=!1;function k(t){b.push(t)}const N=new Set;let A=0;function E(){const t=m;do{for(;A<w.length;){const t=w[A];A++,y(t),_(t.$$)}for(y(null),w.length=0,A=0;v.length;)v.pop()();for(let t=0;t<b.length;t+=1){const n=b[t];N.has(n)||(N.add(n),n())}b.length=0}while(w.length);for(;x.length;)x.pop()();M=!1,N.clear(),y(t)}function _(t){if(null!==t.fragment){t.update(),r(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(k)}}const q=new Set;function S(t,n){-1===t.$$.dirty[0]&&(w.push(t),M||(M=!0,$.then(E)),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31}function j(o,a,u,s,l,h,f,g=[-1]){const d=m;y(o);const p=o.$$={fragment:null,ctx:null,props:h,update:t,not_equal:l,bound:e(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(a.context||(d?d.$$.context:[])),callbacks:e(),dirty:g,skip_bound:!1,root:a.target||d.$$.root};f&&f(p.root);let w=!1;if(p.ctx=u?u(o,a.props||{},((t,n,...e)=>{const r=e.length?e[0]:n;return p.ctx&&l(p.ctx[t],p.ctx[t]=r)&&(!p.skip_bound&&p.bound[t]&&p.bound[t](r),w&&S(o,t)),n})):[],p.update(),w=!0,r(p.before_update),p.fragment=!!s&&s(p.ctx),a.target){if(a.hydrate){const t=function(t){return Array.from(t.childNodes)}(a.target);p.fragment&&p.fragment.l(t),t.forEach(c)}else p.fragment&&p.fragment.c();a.intro&&((v=o.$$.fragment)&&v.i&&(q.delete(v),v.i(b))),function(t,e,o,a){const{fragment:u,on_mount:s,on_destroy:c,after_update:l}=t.$$;u&&u.m(e,o),a||k((()=>{const e=s.map(n).filter(i);c?c.push(...e):r(e),t.$$.on_mount=[]})),l.forEach(k)}(o,a.target,a.anchor,a.customElement),E()}var v,b;y(d)}const P=[];const z=function(n,e=t){let r;const i=new Set;function a(t){if(o(n,t)&&(n=t,r)){const t=!P.length;for(const t of i)t[1](),P.push(t,n);if(t){for(let t=0;t<P.length;t+=2)P[t][0](P[t+1]);P.length=0}}}return{set:a,update:function(t){a(t(n))},subscribe:function(o,u=t){const s=[o,u];return i.add(s),1===i.size&&(r=e(a)||t),o(n),()=>{i.delete(s),0===i.size&&(r(),r=null)}}}}(0);function R(t,n){return null==t||null==n?NaN:t<n?-1:t>n?1:t>=n?0:NaN}function H(t,n){return null==t||null==n?NaN:n<t?-1:n>t?1:n>=t?0:NaN}function F(t){let n,e,r;function i(t,r,i=0,o=t.length){if(i<o){if(0!==n(r,r))return o;do{const n=i+o>>>1;e(t[n],r)<0?i=n+1:o=n}while(i<o)}return i}return 2!==t.length?(n=R,e=(n,e)=>R(t(n),e),r=(n,e)=>t(n)-e):(n=t===R||t===H?t:O,e=t,r=t),{left:i,center:function(t,n,e=0,o=t.length){const a=i(t,n,e,o-1);return a>e&&r(t[a-1],n)>-r(t[a],n)?a-1:a},right:function(t,r,i=0,o=t.length){if(i<o){if(0!==n(r,r))return o;do{const n=i+o>>>1;e(t[n],r)<=0?i=n+1:o=n}while(i<o)}return i}}}function O(){return 0}const C=F(R).right;F((function(t){return null===t?NaN:+t})).center;var L=C,T=Math.sqrt(50),X=Math.sqrt(10),Y=Math.sqrt(2);function I(t,n,e){var r=(n-t)/Math.max(0,e),i=Math.floor(Math.log(r)/Math.LN10),o=r/Math.pow(10,i);return i>=0?(o>=T?10:o>=X?5:o>=Y?2:1)*Math.pow(10,i):-Math.pow(10,-i)/(o>=T?10:o>=X?5:o>=Y?2:1)}function B(t,n,e){t=+t,n=+n,e=(i=arguments.length)<2?(n=t,t=0,1):i<3?1:+e;for(var r=-1,i=0|Math.max(0,Math.ceil((n-t)/e)),o=new Array(i);++r<i;)o[r]=t+r*e;return o}function D(t,n,e){t.prototype=n.prototype=e,e.constructor=t}function Q(t,n){var e=Object.create(t.prototype);for(var r in n)e[r]=n[r];return e}function V(){}var G=.7,U=1/G,Z="\\s*([+-]?\\d+)\\s*",J="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",K="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",W=/^#([0-9a-f]{3,8})$/,tt=new RegExp(`^rgb\\(${Z},${Z},${Z}\\)$`),nt=new RegExp(`^rgb\\(${K},${K},${K}\\)$`),et=new RegExp(`^rgba\\(${Z},${Z},${Z},${J}\\)$`),rt=new RegExp(`^rgba\\(${K},${K},${K},${J}\\)$`),it=new RegExp(`^hsl\\(${J},${K},${K}\\)$`),ot=new RegExp(`^hsla\\(${J},${K},${K},${J}\\)$`),at={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};function ut(){return this.rgb().formatHex()}function st(){return this.rgb().formatRgb()}function ct(t){var n,e;return t=(t+"").trim().toLowerCase(),(n=W.exec(t))?(e=n[1].length,n=parseInt(n[1],16),6===e?lt(n):3===e?new dt(n>>8&15|n>>4&240,n>>4&15|240&n,(15&n)<<4|15&n,1):8===e?ht(n>>24&255,n>>16&255,n>>8&255,(255&n)/255):4===e?ht(n>>12&15|n>>8&240,n>>8&15|n>>4&240,n>>4&15|240&n,((15&n)<<4|15&n)/255):null):(n=tt.exec(t))?new dt(n[1],n[2],n[3],1):(n=nt.exec(t))?new dt(255*n[1]/100,255*n[2]/100,255*n[3]/100,1):(n=et.exec(t))?ht(n[1],n[2],n[3],n[4]):(n=rt.exec(t))?ht(255*n[1]/100,255*n[2]/100,255*n[3]/100,n[4]):(n=it.exec(t))?bt(n[1],n[2]/100,n[3]/100,1):(n=ot.exec(t))?bt(n[1],n[2]/100,n[3]/100,n[4]):at.hasOwnProperty(t)?lt(at[t]):"transparent"===t?new dt(NaN,NaN,NaN,0):null}function lt(t){return new dt(t>>16&255,t>>8&255,255&t,1)}function ht(t,n,e,r){return r<=0&&(t=n=e=NaN),new dt(t,n,e,r)}function ft(t){return t instanceof V||(t=ct(t)),t?new dt((t=t.rgb()).r,t.g,t.b,t.opacity):new dt}function gt(t,n,e,r){return 1===arguments.length?ft(t):new dt(t,n,e,null==r?1:r)}function dt(t,n,e,r){this.r=+t,this.g=+n,this.b=+e,this.opacity=+r}function pt(){return`#${vt(this.r)}${vt(this.g)}${vt(this.b)}`}function mt(){const t=yt(this.opacity);return`${1===t?"rgb(":"rgba("}${wt(this.r)}, ${wt(this.g)}, ${wt(this.b)}${1===t?")":`, ${t})`}`}function yt(t){return isNaN(t)?1:Math.max(0,Math.min(1,t))}function wt(t){return Math.max(0,Math.min(255,Math.round(t)||0))}function vt(t){return((t=wt(t))<16?"0":"")+t.toString(16)}function bt(t,n,e,r){return r<=0?t=n=e=NaN:e<=0||e>=1?t=n=NaN:n<=0&&(t=NaN),new $t(t,n,e,r)}function xt(t){if(t instanceof $t)return new $t(t.h,t.s,t.l,t.opacity);if(t instanceof V||(t=ct(t)),!t)return new $t;if(t instanceof $t)return t;var n=(t=t.rgb()).r/255,e=t.g/255,r=t.b/255,i=Math.min(n,e,r),o=Math.max(n,e,r),a=NaN,u=o-i,s=(o+i)/2;return u?(a=n===o?(e-r)/u+6*(e<r):e===o?(r-n)/u+2:(n-e)/u+4,u/=s<.5?o+i:2-o-i,a*=60):u=s>0&&s<1?0:a,new $t(a,u,s,t.opacity)}function $t(t,n,e,r){this.h=+t,this.s=+n,this.l=+e,this.opacity=+r}function Mt(t){return(t=(t||0)%360)<0?t+360:t}function kt(t){return Math.max(0,Math.min(1,t||0))}function Nt(t,n,e){return 255*(t<60?n+(e-n)*t/60:t<180?e:t<240?n+(e-n)*(240-t)/60:n)}D(V,ct,{copy(t){return Object.assign(new this.constructor,this,t)},displayable(){return this.rgb().displayable()},hex:ut,formatHex:ut,formatHex8:function(){return this.rgb().formatHex8()},formatHsl:function(){return xt(this).formatHsl()},formatRgb:st,toString:st}),D(dt,gt,Q(V,{brighter(t){return t=null==t?U:Math.pow(U,t),new dt(this.r*t,this.g*t,this.b*t,this.opacity)},darker(t){return t=null==t?G:Math.pow(G,t),new dt(this.r*t,this.g*t,this.b*t,this.opacity)},rgb(){return this},clamp(){return new dt(wt(this.r),wt(this.g),wt(this.b),yt(this.opacity))},displayable(){return-.5<=this.r&&this.r<255.5&&-.5<=this.g&&this.g<255.5&&-.5<=this.b&&this.b<255.5&&0<=this.opacity&&this.opacity<=1},hex:pt,formatHex:pt,formatHex8:function(){return`#${vt(this.r)}${vt(this.g)}${vt(this.b)}${vt(255*(isNaN(this.opacity)?1:this.opacity))}`},formatRgb:mt,toString:mt})),D($t,(function(t,n,e,r){return 1===arguments.length?xt(t):new $t(t,n,e,null==r?1:r)}),Q(V,{brighter(t){return t=null==t?U:Math.pow(U,t),new $t(this.h,this.s,this.l*t,this.opacity)},darker(t){return t=null==t?G:Math.pow(G,t),new $t(this.h,this.s,this.l*t,this.opacity)},rgb(){var t=this.h%360+360*(this.h<0),n=isNaN(t)||isNaN(this.s)?0:this.s,e=this.l,r=e+(e<.5?e:1-e)*n,i=2*e-r;return new dt(Nt(t>=240?t-240:t+120,i,r),Nt(t,i,r),Nt(t<120?t+240:t-120,i,r),this.opacity)},clamp(){return new $t(Mt(this.h),kt(this.s),kt(this.l),yt(this.opacity))},displayable(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1},formatHsl(){const t=yt(this.opacity);return`${1===t?"hsl(":"hsla("}${Mt(this.h)}, ${100*kt(this.s)}%, ${100*kt(this.l)}%${1===t?")":`, ${t})`}`}}));var At=t=>()=>t;function Et(t){return 1==(t=+t)?_t:function(n,e){return e-n?function(t,n,e){return t=Math.pow(t,e),n=Math.pow(n,e)-t,e=1/e,function(r){return Math.pow(t+r*n,e)}}(n,e,t):At(isNaN(n)?e:n)}}function _t(t,n){var e=n-t;return e?function(t,n){return function(e){return t+e*n}}(t,e):At(isNaN(t)?n:t)}var qt=function t(n){var e=Et(n);function r(t,n){var r=e((t=gt(t)).r,(n=gt(n)).r),i=e(t.g,n.g),o=e(t.b,n.b),a=_t(t.opacity,n.opacity);return function(n){return t.r=r(n),t.g=i(n),t.b=o(n),t.opacity=a(n),t+""}}return r.gamma=t,r}(1);function St(t,n){n||(n=[]);var e,r=t?Math.min(n.length,t.length):0,i=n.slice();return function(o){for(e=0;e<r;++e)i[e]=t[e]*(1-o)+n[e]*o;return i}}function jt(t,n){var e,r=n?n.length:0,i=t?Math.min(r,t.length):0,o=new Array(i),a=new Array(r);for(e=0;e<i;++e)o[e]=Ct(t[e],n[e]);for(;e<r;++e)a[e]=n[e];return function(t){for(e=0;e<i;++e)a[e]=o[e](t);return a}}function Pt(t,n){var e=new Date;return t=+t,n=+n,function(r){return e.setTime(t*(1-r)+n*r),e}}function zt(t,n){return t=+t,n=+n,function(e){return t*(1-e)+n*e}}function Rt(t,n){var e,r={},i={};for(e in null!==t&&"object"==typeof t||(t={}),null!==n&&"object"==typeof n||(n={}),n)e in t?r[e]=Ct(t[e],n[e]):i[e]=n[e];return function(t){for(e in r)i[e]=r[e](t);return i}}var Ht=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,Ft=new RegExp(Ht.source,"g");function Ot(t,n){var e,r,i,o=Ht.lastIndex=Ft.lastIndex=0,a=-1,u=[],s=[];for(t+="",n+="";(e=Ht.exec(t))&&(r=Ft.exec(n));)(i=r.index)>o&&(i=n.slice(o,i),u[a]?u[a]+=i:u[++a]=i),(e=e[0])===(r=r[0])?u[a]?u[a]+=r:u[++a]=r:(u[++a]=null,s.push({i:a,x:zt(e,r)})),o=Ft.lastIndex;return o<n.length&&(i=n.slice(o),u[a]?u[a]+=i:u[++a]=i),u.length<2?s[0]?function(t){return function(n){return t(n)+""}}(s[0].x):function(t){return function(){return t}}(n):(n=s.length,function(t){for(var e,r=0;r<n;++r)u[(e=s[r]).i]=e.x(t);return u.join("")})}function Ct(t,n){var e,r,i=typeof n;return null==n||"boolean"===i?At(n):("number"===i?zt:"string"===i?(e=ct(n))?(n=e,qt):Ot:n instanceof ct?qt:n instanceof Date?Pt:(r=n,!ArrayBuffer.isView(r)||r instanceof DataView?Array.isArray(n)?jt:"function"!=typeof n.valueOf&&"function"!=typeof n.toString||isNaN(n)?Rt:zt:St))(t,n)}function Lt(t,n){return t=+t,n=+n,function(e){return Math.round(t*(1-e)+n*e)}}function Tt(t,n){if((e=(t=n?t.toExponential(n-1):t.toExponential()).indexOf("e"))<0)return null;var e,r=t.slice(0,e);return[r.length>1?r[0]+r.slice(2):r,+t.slice(e+1)]}function Xt(t){return(t=Tt(Math.abs(t)))?t[1]:NaN}var Yt,It=/^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;function Bt(t){if(!(n=It.exec(t)))throw new Error("invalid format: "+t);var n;return new Dt({fill:n[1],align:n[2],sign:n[3],symbol:n[4],zero:n[5],width:n[6],comma:n[7],precision:n[8]&&n[8].slice(1),trim:n[9],type:n[10]})}function Dt(t){this.fill=void 0===t.fill?" ":t.fill+"",this.align=void 0===t.align?">":t.align+"",this.sign=void 0===t.sign?"-":t.sign+"",this.symbol=void 0===t.symbol?"":t.symbol+"",this.zero=!!t.zero,this.width=void 0===t.width?void 0:+t.width,this.comma=!!t.comma,this.precision=void 0===t.precision?void 0:+t.precision,this.trim=!!t.trim,this.type=void 0===t.type?"":t.type+""}function Qt(t,n){var e=Tt(t,n);if(!e)return t+"";var r=e[0],i=e[1];return i<0?"0."+new Array(-i).join("0")+r:r.length>i+1?r.slice(0,i+1)+"."+r.slice(i+1):r+new Array(i-r.length+2).join("0")}Bt.prototype=Dt.prototype,Dt.prototype.toString=function(){return this.fill+this.align+this.sign+this.symbol+(this.zero?"0":"")+(void 0===this.width?"":Math.max(1,0|this.width))+(this.comma?",":"")+(void 0===this.precision?"":"."+Math.max(0,0|this.precision))+(this.trim?"~":"")+this.type};var Vt={"%":(t,n)=>(100*t).toFixed(n),b:t=>Math.round(t).toString(2),c:t=>t+"",d:function(t){return Math.abs(t=Math.round(t))>=1e21?t.toLocaleString("en").replace(/,/g,""):t.toString(10)},e:(t,n)=>t.toExponential(n),f:(t,n)=>t.toFixed(n),g:(t,n)=>t.toPrecision(n),o:t=>Math.round(t).toString(8),p:(t,n)=>Qt(100*t,n),r:Qt,s:function(t,n){var e=Tt(t,n);if(!e)return t+"";var r=e[0],i=e[1],o=i-(Yt=3*Math.max(-8,Math.min(8,Math.floor(i/3))))+1,a=r.length;return o===a?r:o>a?r+new Array(o-a+1).join("0"):o>0?r.slice(0,o)+"."+r.slice(o):"0."+new Array(1-o).join("0")+Tt(t,Math.max(0,n+o-1))[0]},X:t=>Math.round(t).toString(16).toUpperCase(),x:t=>Math.round(t).toString(16)};function Gt(t){return t}var Ut,Zt,Jt,Kt=Array.prototype.map,Wt=["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"];function tn(t){var n,e,r=void 0===t.grouping||void 0===t.thousands?Gt:(n=Kt.call(t.grouping,Number),e=t.thousands+"",function(t,r){for(var i=t.length,o=[],a=0,u=n[0],s=0;i>0&&u>0&&(s+u+1>r&&(u=Math.max(1,r-s)),o.push(t.substring(i-=u,i+u)),!((s+=u+1)>r));)u=n[a=(a+1)%n.length];return o.reverse().join(e)}),i=void 0===t.currency?"":t.currency[0]+"",o=void 0===t.currency?"":t.currency[1]+"",a=void 0===t.decimal?".":t.decimal+"",u=void 0===t.numerals?Gt:function(t){return function(n){return n.replace(/[0-9]/g,(function(n){return t[+n]}))}}(Kt.call(t.numerals,String)),s=void 0===t.percent?"%":t.percent+"",c=void 0===t.minus?"−":t.minus+"",l=void 0===t.nan?"NaN":t.nan+"";function h(t){var n=(t=Bt(t)).fill,e=t.align,h=t.sign,f=t.symbol,g=t.zero,d=t.width,p=t.comma,m=t.precision,y=t.trim,w=t.type;"n"===w?(p=!0,w="g"):Vt[w]||(void 0===m&&(m=12),y=!0,w="g"),(g||"0"===n&&"="===e)&&(g=!0,n="0",e="=");var v="$"===f?i:"#"===f&&/[boxX]/.test(w)?"0"+w.toLowerCase():"",b="$"===f?o:/[%p]/.test(w)?s:"",x=Vt[w],$=/[defgprs%]/.test(w);function M(t){var i,o,s,f=v,M=b;if("c"===w)M=x(t)+M,t="";else{var k=(t=+t)<0||1/t<0;if(t=isNaN(t)?l:x(Math.abs(t),m),y&&(t=function(t){t:for(var n,e=t.length,r=1,i=-1;r<e;++r)switch(t[r]){case".":i=n=r;break;case"0":0===i&&(i=r),n=r;break;default:if(!+t[r])break t;i>0&&(i=0)}return i>0?t.slice(0,i)+t.slice(n+1):t}(t)),k&&0==+t&&"+"!==h&&(k=!1),f=(k?"("===h?h:c:"-"===h||"("===h?"":h)+f,M=("s"===w?Wt[8+Yt/3]:"")+M+(k&&"("===h?")":""),$)for(i=-1,o=t.length;++i<o;)if(48>(s=t.charCodeAt(i))||s>57){M=(46===s?a+t.slice(i+1):t.slice(i))+M,t=t.slice(0,i);break}}p&&!g&&(t=r(t,1/0));var N=f.length+t.length+M.length,A=N<d?new Array(d-N+1).join(n):"";switch(p&&g&&(t=r(A+t,A.length?d-M.length:1/0),A=""),e){case"<":t=f+t+M+A;break;case"=":t=f+A+t+M;break;case"^":t=A.slice(0,N=A.length>>1)+f+t+M+A.slice(N);break;default:t=A+f+t+M}return u(t)}return m=void 0===m?6:/[gprs]/.test(w)?Math.max(1,Math.min(21,m)):Math.max(0,Math.min(20,m)),M.toString=function(){return t+""},M}return{format:h,formatPrefix:function(t,n){var e=h(((t=Bt(t)).type="f",t)),r=3*Math.max(-8,Math.min(8,Math.floor(Xt(n)/3))),i=Math.pow(10,-r),o=Wt[8+r/3];return function(t){return e(i*t)+o}}}}function nn(t,n){switch(arguments.length){case 0:break;case 1:this.range(t);break;default:this.range(n).domain(t)}return this}function en(t){return+t}Ut=tn({thousands:",",grouping:[3],currency:["$",""]}),Zt=Ut.format,Jt=Ut.formatPrefix;var rn=[0,1];function on(t){return t}function an(t,n){return(n-=t=+t)?function(e){return(e-t)/n}:(e=isNaN(n)?NaN:.5,function(){return e});var e}function un(t,n,e){var r=t[0],i=t[1],o=n[0],a=n[1];return i<r?(r=an(i,r),o=e(a,o)):(r=an(r,i),o=e(o,a)),function(t){return o(r(t))}}function sn(t,n,e){var r=Math.min(t.length,n.length)-1,i=new Array(r),o=new Array(r),a=-1;for(t[r]<t[0]&&(t=t.slice().reverse(),n=n.slice().reverse());++a<r;)i[a]=an(t[a],t[a+1]),o[a]=e(n[a],n[a+1]);return function(n){var e=L(t,n,1,r)-1;return o[e](i[e](n))}}function cn(t,n){return n.domain(t.domain()).range(t.range()).interpolate(t.interpolate()).clamp(t.clamp()).unknown(t.unknown())}function ln(){var t,n,e,r,i,o,a=rn,u=rn,s=Ct,c=on;function l(){var t,n,e,s=Math.min(a.length,u.length);return c!==on&&(t=a[0],n=a[s-1],t>n&&(e=t,t=n,n=e),c=function(e){return Math.max(t,Math.min(n,e))}),r=s>2?sn:un,i=o=null,h}function h(n){return null==n||isNaN(n=+n)?e:(i||(i=r(a.map(t),u,s)))(t(c(n)))}return h.invert=function(e){return c(n((o||(o=r(u,a.map(t),zt)))(e)))},h.domain=function(t){return arguments.length?(a=Array.from(t,en),l()):a.slice()},h.range=function(t){return arguments.length?(u=Array.from(t),l()):u.slice()},h.rangeRound=function(t){return u=Array.from(t),s=Lt,l()},h.clamp=function(t){return arguments.length?(c=!!t||on,l()):c!==on},h.interpolate=function(t){return arguments.length?(s=t,l()):s},h.unknown=function(t){return arguments.length?(e=t,h):e},function(e,r){return t=e,n=r,l()}}function hn(){return ln()(on,on)}function fn(t,n,e,r){var i,o=function(t,n,e){var r=Math.abs(n-t)/Math.max(0,e),i=Math.pow(10,Math.floor(Math.log(r)/Math.LN10)),o=r/i;return o>=T?i*=10:o>=X?i*=5:o>=Y&&(i*=2),n<t?-i:i}(t,n,e);switch((r=Bt(null==r?",f":r)).type){case"s":var a=Math.max(Math.abs(t),Math.abs(n));return null!=r.precision||isNaN(i=function(t,n){return Math.max(0,3*Math.max(-8,Math.min(8,Math.floor(Xt(n)/3)))-Xt(Math.abs(t)))}(o,a))||(r.precision=i),Jt(r,a);case"":case"e":case"g":case"p":case"r":null!=r.precision||isNaN(i=function(t,n){return t=Math.abs(t),n=Math.abs(n)-t,Math.max(0,Xt(n)-Xt(t))+1}(o,Math.max(Math.abs(t),Math.abs(n))))||(r.precision=i-("e"===r.type));break;case"f":case"%":null!=r.precision||isNaN(i=function(t){return Math.max(0,-Xt(Math.abs(t)))}(o))||(r.precision=i-2*("%"===r.type))}return Zt(r)}function gn(t){var n=t.domain;return t.ticks=function(t){var e=n();return function(t,n,e){var r,i,o,a,u=-1;if(e=+e,(t=+t)==(n=+n)&&e>0)return[t];if((r=n<t)&&(i=t,t=n,n=i),0===(a=I(t,n,e))||!isFinite(a))return[];if(a>0){let e=Math.round(t/a),r=Math.round(n/a);for(e*a<t&&++e,r*a>n&&--r,o=new Array(i=r-e+1);++u<i;)o[u]=(e+u)*a}else{a=-a;let e=Math.round(t*a),r=Math.round(n*a);for(e/a<t&&++e,r/a>n&&--r,o=new Array(i=r-e+1);++u<i;)o[u]=(e+u)/a}return r&&o.reverse(),o}(e[0],e[e.length-1],null==t?10:t)},t.tickFormat=function(t,e){var r=n();return fn(r[0],r[r.length-1],null==t?10:t,e)},t.nice=function(e){null==e&&(e=10);var r,i,o=n(),a=0,u=o.length-1,s=o[a],c=o[u],l=10;for(c<s&&(i=s,s=c,c=i,i=a,a=u,u=i);l-- >0;){if((i=I(s,c,e))===r)return o[a]=s,o[u]=c,n(o);if(i>0)s=Math.floor(s/i)*i,c=Math.ceil(c/i)*i;else{if(!(i<0))break;s=Math.ceil(s*i)/i,c=Math.floor(c*i)/i}r=i}return t},t}function dn(){var t=hn();return t.copy=function(){return cn(t,dn())},nn.apply(t,arguments),gn(t)}function pn(t,n,e){this.k=t,this.x=n,this.y=e}function mn(t,n,e){const r=t.slice();return r[7]=n[e],r}function yn(t){let n,e;return{c(){n=h("circle"),d(n,"cx",e=t[4](t[7])),d(n,"cy","154"),d(n,"r","3")},m(t,e){s(t,n,e)},p(t,r){4&r&&e!==(e=t[4](t[7]))&&d(n,"cx",e)},d(t){t&&c(n)}}}function wn(n){let e,r,i,o,a,m,y,w,v,b,x,$,M,k,N,A,E,_,q,S,j,P,z,R,H,F,O,C,L=(n[2].wavg?n[2].wavg.toFixed(2):n[2].wavg)+"",T=(n[2].usum?n[2].usum.toFixed(2):n[2].usum)+"",X=(n[2].wspread?n[2].wspread.toFixed(2):n[2].wspread)+"",Y=n[2].w,I=[];for(let t=0;t<Y.length;t+=1)I[t]=yn(mn(n,Y,t));return{c(){e=l("div"),r=g(),i=l("div"),o=l("div"),a=l("p"),m=f("Institution: "),y=f(n[0]),w=f("\n\t\twage spread: "),v=f(n[1]),b=g(),x=l("p"),$=f("wavg: "),M=f(L),k=g(),N=l("p"),A=f("usum: "),E=f(T),_=g(),q=l("p"),S=f("wspread: "),j=f(X),P=g(),z=f(n[3]),R=g(),H=l("div"),F=h("svg");for(let t=0;t<I.length;t+=1)I[t].c();var t,u,s,c;d(e,"class","container svelte-1az1xg3"),t=o,u="width",null===(s="200px")?t.style.removeProperty(u):t.style.setProperty(u,s,c?"important":""),d(F,"width","1200px"),d(F,"height","500px"),d(F,"viewBox","0 0 400 400"),d(F,"xmlns","http://www.w3.org/2000/svg"),d(i,"class","sim svelte-1az1xg3")},m(t,c){s(t,e,c),s(t,r,c),s(t,i,c),u(i,o),u(o,a),u(a,m),u(a,y),u(o,w),u(o,v),u(o,b),u(o,x),u(x,$),u(x,M),u(o,k),u(o,N),u(N,A),u(N,E),u(o,_),u(o,q),u(q,S),u(q,j),u(o,P),u(o,z),u(i,R),u(i,H),u(H,F);for(let t=0;t<I.length;t+=1)I[t].m(F,null);var l,h,f,g;O||(l=e,h="mousemove",f=n[5],l.addEventListener(h,f,g),C=()=>l.removeEventListener(h,f,g),O=!0)},p(t,[n]){if(1&n&&p(y,t[0]),2&n&&p(v,t[1]),4&n&&L!==(L=(t[2].wavg?t[2].wavg.toFixed(2):t[2].wavg)+"")&&p(M,L),4&n&&T!==(T=(t[2].usum?t[2].usum.toFixed(2):t[2].usum)+"")&&p(E,T),4&n&&X!==(X=(t[2].wspread?t[2].wspread.toFixed(2):t[2].wspread)+"")&&p(j,X),8&n&&p(z,t[3]),20&n){let e;for(Y=t[2].w,e=0;e<Y.length;e+=1){const r=mn(t,Y,e);I[e]?I[e].p(r,n):(I[e]=yn(r),I[e].c(),I[e].m(F,null))}for(;e<I.length;e+=1)I[e].d(1);I.length=Y.length}},i:t,o:t,d(t){t&&c(e),t&&c(r),t&&c(i),function(t,n){for(let e=0;e<t.length;e+=1)t[e]&&t[e].d(n)}(I,t),O=!1,C()}}}pn.prototype={constructor:pn,scale:function(t){return 1===t?this:new pn(this.k*t,this.x,this.y)},translate:function(t,n){return 0===t&0===n?this:new pn(this.k,this.x+this.k*t,this.y+this.k*n)},apply:function(t){return[t[0]*this.k+this.x,t[1]*this.k+this.y]},applyX:function(t){return t*this.k+this.x},applyY:function(t){return t*this.k+this.y},invert:function(t){return[(t[0]-this.x)/this.k,(t[1]-this.y)/this.k]},invertX:function(t){return(t-this.x)/this.k},invertY:function(t){return(t-this.y)/this.k},rescaleX:function(t){return t.copy().domain(t.range().map(this.invertX,this).map(t.invert,t))},rescaleY:function(t){return t.copy().domain(t.range().map(this.invertY,this).map(t.invert,t))},toString:function(){return"translate("+this.x+","+this.y+") scale("+this.k+")"}},new pn(1,0,0);function vn(t,n,e){let r;a(t,z,(t=>e(3,r=t)));let i={x:0,y:0},o="none",u="none",s={wavg:void 0,usum:void 0,wspread:void 0,w:[]},c=dn().domain([0,4]).range([100,800]);return t.$$.update=()=>{68&t.$$.dirty&&(i.y>40&&i.y<207?(e(1,u="equal"),e(2,s.wspread=0,s)):i.y>233&&i.y<399?(e(1,u="average"),e(2,s.wspread=.5,s)):i.y>424&&i.y<592?(e(1,u="inequality"),e(2,s.wspread=s.wavg,s)):e(1,u="")),64&t.$$.dirty&&(i.x>110&&i.x<270?e(0,o="OA"):i.x>293&&i.x<453?e(0,o="PfHw"):i.x>476&&i.x<636?e(0,o="PfLw"):i.x>659&&i.x<819?e(0,o="EC"):i.x>842&&i.x<1002?e(0,o="TQ"):i.x>1025&&i.x<1185?e(0,o="PA"):e(0,o="")),66&t.$$.dirty&&("equal"==u?e(2,s.wavg=(207-i.y)/167*1.5,s):"average"==u?e(2,s.wavg=(399-i.y)/166*1.5,s):"inequality"==u&&e(2,s.wavg=(592-i.y)/168*1.5,s)),65&t.$$.dirty&&("OA"==o?e(2,s.usum=(i.x-110)/160*5,s):"PfHw"==o?e(2,s.usum=(i.x-293)/160*5,s):"PfLw"==o?e(2,s.usum=(i.x-476)/160*5,s):"EC"==o?e(2,s.usum=(i.x-659)/160*5,s):"TQ"==o?e(2,s.usum=(i.x-842)/160*5,s):"PA"==o&&e(2,s.usum=(i.x-1025)/160*5,s)),6&t.$$.dirty&&("equal"==u?e(2,s.w=Array(20).fill(s.wavg),s):"average"==u?e(2,s.w=B(s.wavg-s.wspread,s.wavg+s.wspread,2*s.wspread/20).map((t=>Math.max(0,t))),s):"inequality"==u&&e(2,s.w=B(0,s.wavg+s.wspread,(s.wavg+s.wspread)/20),s))},[o,u,s,r,c,function(t){const n=t.currentTarget.getBoundingClientRect();e(6,i.x=t.clientX-n.x,i),e(6,i.y=t.clientY-n.y,i)},i]}return new class extends class{$destroy(){!function(t,n){const e=t.$$;null!==e.fragment&&(r(e.on_destroy),e.fragment&&e.fragment.d(n),e.on_destroy=e.fragment=null,e.ctx=[])}(this,1),this.$destroy=t}$on(t,n){const e=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return e.push(n),()=>{const t=e.indexOf(n);-1!==t&&e.splice(t,1)}}$set(t){var n;this.$$set&&(n=t,0!==Object.keys(n).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}{constructor(t){super(),j(this,t,vn,wn,o,{})}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map