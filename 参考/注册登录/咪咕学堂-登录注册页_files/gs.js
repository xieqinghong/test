
(function(){var u=window,k=document,h=k.referrer,p=k.documentElement,z=location,f=navigator.userAgent.toLowerCase();if(u.GridsumWebDissector){return}var r={errorUrls:["diag-wd.gridsumdissector.com/receivewddiag/gs.gif"],funcList:[],handlers:[],voidFunc:function(D){return D},lower:function(D){return(D&&D.toLowerCase)?D.toLowerCase():D},indexOf:function(H,G,F){if(H){if(H.indexOf){return H.indexOf(G,F)}else{if(H.length){for(var E=F||0,D=H.length;E<D;E++){if(H[E]===G){return E}}}}}return-1},getHashCode:function(H,D){var G=1315423911,E,F;if(!D){H=C(H)}for(E=H.length-1;E>=0;E--){F=H.charCodeAt(E);G^=((G<<5)+F+(G>>2))}return(G&2147483647)},getRandomString:function(H){var G,E=[],F="abcdefghijklmnopqrstuvwxyz0123456789",D=35;for(G=0;G<H;G++){E.push(F.charAt(Math.round(Math.random()*D)))}return E.join("")},getRandomID:function(){var E=new Date().getTime()+"";var F=""+Math.abs(r.getHashCode(z.href+h+f));var D=F.length>2?2:F.length;F=F.substring(0,D);return E.substring(2,E.length-3)+r.getRandomString(6)+F},getUrlParam:function(F,H,E,D){if(!H){return null}F=(F||(z.pathname+z.search)).replace(/\#.*/ig,"");var I=["&","?"];for(var G=0;G<2;G++){var J=r.find(F,I[G]+H+"=","&",E);if(J!=null){return D?q(J):J}}return null},find:function(J,H,I,E,G){var F=r.findArray(J,H,I,E,G),D=F.length;return D>0?F[D-1]:null},findArray:function(H,G,M,J,I){if(!H||!H.length){return[]}var F=[],E,L,O,N,K,D=0;G=G||"";if(!J){N=C(H);G=C(G);M=C(M)}while(D>-1){K=null;if((E=b(N,G,D))>-1){O=E+G.length;if(!M){K=H.substring(O);D=-1}else{L=b(N,M,O);if(L>=O){K=H.substring(O,L);D=L+M.length}else{K=H.substring(O);D=-1}}}if(!K){break}F.push(!I?r.trim(K):K)}return F},getTimeZone:function(){return Math.round(new Date().getTimezoneOffset()/-60)+""},getLocalTime:function(){return new Date().getTime()+r.getTimeZone()*3600000},isPageMatch:function(I,G,H){H=C(H||z.pathname);G=C(G);if(!l(I)){I=[I]}for(var F=0,D=I.length;F<D;F++){var E=C(I[F]);if((G=="contains"&&b(H,E)>-1)||(G=="startswith"&&b(H,E)==0)||(G=="endswith"&&b(H,E,H.length-E.length)>-1)||(G=="exactmatch"&&H==E)||(G=="regex"&&E.test&&E.test(H))){return true}}return false},getCookie:function(E,G,D){if(!E){return null}var H,F=r.toDict(k.cookie,"=",";",true);E=C(E);for(H in F){if(c(F,H)&&C(H)===E){return D?F[H]:q(F[H])}}return G||null},setCookie:function(F,H,D,J,G,I,E){if(!F){return}F=C(F);if(!E){H=g(H)}F=F+"="+H+";";D=D?("expires="+r.getExpireDate(D).toGMTString())+";":"";J=!!J?"path="+J+";":"path=/;";G=G?("domain="+G)+";":"";I=I?"secure=true;":"";k.cookie=[F,D,J,G,I].join("")},delCookie:function(D,F,E){r.setCookie(D,"",-1000,F,E)},getExpireDate:function(D){return new Date(new Date().getTime()+D*1000)},trim:function(D){return(D&&D.replace)?D.replace(/(^\s+)|(\s+$)/ig,""):D},toDict:function(K,D,E,L){var H,M,G,J,F,I={};D=D||"=";E=E||"&";G=K.split(E);F=L?r.trim:r.voidFunc;for(H=0,J=G.length;H<J;H++){M=b(G[H],D);if(M>-1){I[F(G[H].substring(0,M))]=F(G[H].substring(M+1))}else{I[G[H]]=null}}return I},resolveUrl:function(F){while(F&&F[0]==" "){F=F.substr(1)}var E,G=/((\w+:)?\/\/([^\/\#&?]*))?\/?([^?#]*)?(\?[^#]*)?(#.*)?/,D={url:F},H;if((E=F.match(G))){H=E[2]||z.protocol;D.protocol=H.substring(0,H.length-1);D.local=D.protocol=="file";D.host=E[3]||z.host;D.path="/"+(E[4]||"");D.fullPath=D.path;D.query=(E[5]||"").substring(1);D.anchor=(E[6]||"").substring(1);if(D.query){D.fullPath+="?"+D.query;D.params=r.toDict(D.query.replace(/\?/g,"&"))}}else{D.local=true;D.protocol="file";D.fullPath=D.path="/"+F.replace(/\\/g,"/")}return D},encode:function(D){if(!D||!D.replace){return D}return(u.encodeURIComponent||escape)(D)},decode:function(E){if(E&&E.replace){E=E.replace(/\+/ig,"%20");try{return(u.decodeURIComponent||unescape)(E)}catch(D){}}return E},serialize:function(K,F,G,M,J){function L(R){if(!R){return""}var Q=[],P;for(P in R){if(c(R,P)&&(R[P]||R[P]===0)){Q.push(P+":"+g(R[P]))}}return Q.join(";")}var H=[],O=!J?g:r.voidFunc,D,N=["ubc","gstl","gsflver","gsalexaver","gsdotnetver","gssil","gsclr","gsscr","gsbrlang","gsmcurl","lt","lk","gsclkpa","gsclktl"];F=F||"=";G=G||"&";for(D in K){var E=true;for(var I in N){if(N[I]==D){E=false}}if(E&&c(K,D)&&(M||K[D]||K[D]===0)){H.push(D+F+(D=="pcp"||D=="ecp"?L(K[D]):O(K[D])))}}for(D=0;D<N.length;D++){if(c(K,N[D])&&(M||K[N[D]]||K[N[D]]===0)){H.push(N[D]+F+O(K[N[D]]))}}return H.join(G)},getEl:function(D){return D.split?k.getElementById(D):D},waitFor:function(I,H,D,F,E){D=D||1000;F=F||30;var G=setInterval(function(){if(I.split){var L,N=I.split(".",3),J=N.length,M=u;if(J>1){for(var K=0;K<J;K++){if(!K||N[K]!="window"){M=M[N[K]];if(!M){break}}}L=M}}if(L||(L=r.getEl(I))){clearInterval(G);H(L)}else{if(F>0){F-=1}else{clearInterval(G);if(E){E(L)}}}},D)},getPos:function(E){var D,F,H,L=null,K=[],I=k.body,M={};if(E.parentNode===null||E.style.display=="none"){return false}if(E.getBoundingClientRect){H=E.getBoundingClientRect();D=Math.max(p.scrollTop,I.scrollTop);F=Math.max(p.scrollLeft,I.scrollLeft);if(k.compatMode=="BackCompat"&&r.isIE()){M={x:H.left,y:H.top}}else{M={x:H.left+F,y:H.top+D}}return M}else{if(k.getBoxObjectFor){H=k.getBoxObjectFor(E);var J=(E.style.borderLeftWidth)?parseInt(E.style.borderLeftWidth,10):0;var G=(E.style.borderTopWidth)?parseInt(E.style.borderTopWidth,10):0;K=[H.x-J,H.y-G]}else{K=[E.offsetLeft,E.offsetTop];L=E.offsetParent;if(L!=E){while(L){K[0]+=L.offsetLeft;K[1]+=L.offsetTop;L=L.offsetParent}}if(b(f,"opera")!=-1||(b(f,"safari")!=-1&&E.style.position=="absolute")){K[0]-=I.offsetLeft;K[1]-=I.offsetTop}}}if(E.parentNode){L=E.parentNode}else{L=null}while(L&&L.tagName!="BODY"&&L.tagName!="HTML"){K[0]-=L.scrollLeft;K[1]-=L.scrollTop;if(L.parentNode){L=L.parentNode}else{L=null}}M={x:K[0],y:K[1]};return M},getDocWidth:function(){return(p&&p.scrollWidth)||(k.body&&k.body.scrollWidth)||0},getPointer:function(E){var D=k.body||{scrollLeft:0,scrollTop:0};return{x:E.pageX||(E.clientX+(p.scrollLeft||D.scrollLeft)-(p.clientLeft||0)),y:E.pageY||(E.clientY+(p.scrollTop||D.scrollTop)-(p.clientTop||0))}},observe:function(E,D,G){E=r.getEl(E);if(!E){return null}function F(I){if(!I.target){I.target=I.srcElement||E}if(!I.pageX){var H=r.getPointer(I);I.pageX=H.x;I.pageY=H.y}I.root=E;G.call(E,I)}if(E.addEventListener){E.addEventListener(D,F,false)}else{E.attachEvent("on"+D,F)}return E},observeTouch:function(D,I){var G,F;D=r.getEl(D);if(!D){return null}function H(J){G=J.pageX;F=J.pageY}function E(K){if(!K.target){K.target=K.srcElement||D}try{if(K.changedTouches[0].pageX!=G||K.changedTouches[0].pageY!=F){G=null;F=null;return}}catch(J){r.report(config.serviceID,"M_utility_observeTouch",J);G=null;F=null;return}r.touchPoint={X:G,Y:F};G=null;F=null;K.root=D;I.call(D,K)}if(D.addEventListener){D.addEventListener("touchstart",H,false);D.addEventListener("touchend",E,false)}else{D.attachEvent("ontouchstart",H);D.attachEvent("ontouchend",E)}return D},format:function(D){if(arguments.length==1){return D}else{var F=arguments.length;for(var E=1;E<F;E++){D=D.replace(new RegExp("\\{"+(E-1)+"\\}","g"),arguments[E])}return D}},getInnerText:function(D){D=r.getEl(D);if(D&&D.innerHTML){return r.trim(D.innerHTML.replace(/<[^>]+>/ig,""))}return null},getInnerUnvisibleText:function(G,D){G=r.getEl(G);var F="";if(G&&G.innerHTML){var I=G.innerHTML,H=I.indexOf(D+'="');while(H!=-1){H+=D.length+2;var E=I.indexOf('"',H);F+=I.substr(H,E-H);I=I.substr(E);H=I.indexOf(D+'="')}}return F},searchUp:function(L,D,H,J,I){var E,G,F=C(H),M=L&&L.parentNode,K,N;N=D.target;do{G=true;if(!F||C(N.tagName)==F){G=false;for(E in J){if(c(J,E)&&b(C(N[E]||N.getAttribute(E)),C(J[E]))<0){G=true;break}}}if(G){N=N.parentNode}else{return N}if(I==0){break}I--}while(N&&N!=M&&N.getAttribute);return null},report:function(E,L,M,G){try{M=M||{};for(var K=0;K<r.errorUrls.length;K++){var D=r.errorUrls[K]+"?gscmd=err&gsrd={0}&gsver={1}&gserrc={2}&gssrvid={3}&gserrobj={4}",H=y.version,F=new Image(1,1),J=Math.round(Math.random()*2147483647);D=(location.protocol=="https:"?"https://":"http://")+D;D=r.format(D,J,H,L,E,r.serialize(M,"~","'"));F.onload=function(){return true};F.onerror=function(){return true};F.src=D}}catch(I){}},getAd:function(E,G){var M,H,O,K,J,F=G.ignoreParams,R=G.campaignKey,L=G.keywordKey,I=G.sourceKey,Q=G.mediumKey,D=G.contentKey,T=G.groupKey,N=G.channelKey,S=G.adidKey,P=G.ad;H=r.resolveUrl(E);if(!H.local){O=new B(H.host,[],[R,L,I,Q,D,T,N,S]);M={campaign:P.campaign,group:P.group,source:P.source,medium:P.medium,keyword:P.keyword,content:P.content,channel:P.channel,adid:P.adid};if((K=O.match(E.replace(/#/g,"?")))){J=K.params;if(K.paramCount!==0){M.campaign=P.campaign||((R!=G.campaignKeyDefault)?q(J[R]):null);M.group=P.group||(T!=G.groupKeyDefault?q(J[T]):null);M.source=P.source||(I!=G.sourceKeyDefault?q(J[I]):null);M.medium=P.medium||(Q!=G.mediumKeyDefault?q(J[Q]):null);M.keyword=P.keyword||(L!=G.keywordKeyDefault?q(J[L]):null);M.content=P.content||(D!=G.contentKeyDefault?q(J[D]):null);M.channel=P.channel||(N!=G.channelKeyDefault?q(J[N]):null);M.adid=P.adid||(S!=G.adidKeyDefault?q(J[S]):null)}}}return M},isIE:function(){return"\v"=="v"},getMobileConnectionType:function(){return navigator.connection.type},getMobileDeviceCordovaVersion:function(){return device.cordova},getMobileDeviceManufacturer:function(){return device.manufacturer},getMobileDeviceName:function(){return device.model},getMobileDeviceOSPlatform:function(){return device.platform},getMobileDeviceUUID:function(){return device.uuid},getMobileDeviceOSVersion:function(){return device.version},watchPosition:function(E,D){return navigator.geolocation.watchPosition(E,D,{timeout:30000})}};var C=r.lower,b=r.indexOf,g=r.encode,q=r.decode,t=Array.prototype.slice;function l(D){return!!(D&&D.constructor==Array)}function c(D,E){return(D&&D.hasOwnProperty)?D.hasOwnProperty(E):false}function m(D){return typeof D=="string"}function B(F,D,G){var E=this;E.host=F;E.reqParams=D||[];E.optParams=G||[]}B.prototype={testHost:function(D){var E=this.host;if(m(E)){return b(D,E)>-1}else{return E.test&&E.test(D)}},match:function(D){var I,K,L,E,O=0,J=this,F=r.resolveUrl(D),H={},M=J.reqParams,G=J.optParams,N=F.host;if(J.testHost(N)){if((E=F.params)){for(I in E){if(c(E,I)){E[C(I)]=E[I]}}for(I=0,K=M.length;I<K;I++){L=E[M[I]];if(!L){return false}else{H[M[I]]=L;O++}}for(I=0,K=G.length;I<K;I++){L=E[G[I]];if(L){H[G[I]]=L;O++}}}else{if(M.length){return false}}return{host:N,params:H,paramCount:O}}return false}};function i(D){var E=this;function F(G){if(E.suffix){G=G+E.suffix}else{G=G+"_"+r.getHashCode(D.serviceID+"_"+D.domain)}return g(G)}E.get=function(G,I){var H=F(G);return r.getCookie(H,I,true)};E.set=function(H,K,G,M,J,L){var I=F(H);J=J||D.domain;M=M||D.path;L=L||D.secure;r.setCookie(I,K,G,M,J,L,true)};E.remove=function(G){E.set(G,"0",-1000)}}function n(D){var E=this;function F(G){G=G+"_"+r.getHashCode(D.serviceID+"_"+D.domain);return g(G)}E.get=function(H){var J=F(H);var G=localStorage.getItem(J);if(G){var I=JSON.parse(G);return new Date().getTime()<=I.time?I.value:null}else{return null}};E.set=function(H,K,G){var J=F(H);G=G||0;var I=new Date().getTime()+G*1000;localStorage.setItem(J,JSON.stringify({value:K,time:I}))};E.remove=function(G){var H=F(G);localStorage.removeItem(H)};E.appendFailed=function(N,H,M){var L=F("gsfailed");var K={obj:N,noEncode:H,destUrl:M};var J=E.popAllFailed();if(J.length>=100){for(var I=0,G=J.length;I<G;I++){if(J[I].obj.gscmd!=="launch"){J.splice(I,1);break}}}J.push(K);localStorage.setItem(L,JSON.stringify(J))};E.popAllFailed=function(){var G=F("gsfailed");var H=localStorage.getItem(G);localStorage.removeItem(G);if(H){return JSON.parse(H)}else{return[]}}}function A(D){var E=this;E.storage=z.protocol==="file:"?new n(D):new i(D);E.get=function(F){return E.storage.get(F)};E.set=function(G,H,F){E.storage.set(G,H,F)};E.remove=function(F){E.storage.remove(F)}}function a(E){var G=this,F=E.tracker,H="UA-26783561-2";function D(L,J,K){K=K||E.serviceUrls[0];return K+"?"+r.serialize(L,"=","&",false,J)}function I(P,K,O){P.rd=r.getRandomString(5);var N=E.serviceID,L,J=new Image(1,1),M={};y.execHook("sender.send",P,O,M);if(M.cancel){return}L=D(P,K,O).substring(0,2000);J.onerror=function(){setTimeout(function(){var Q=new Image(1,1);Q.onload=function(){r.report(N,"RetrySuccess",{cmd:P.gscmd},H)};Q.onerror=function(){r.report(N,"SendingFailed",{cmd:P.gscmd},H);return true};Q.src=L},2000);return true};J.onload=function(){};J.src=L;G.img=J}G.checkUrl=function(L,J,K){L.rd=r.getRandomString(5);return D(L,J,K).length<=2000};G.send=function(O,K,M){if(!O){return}if(!M){var N=E.serviceUrls;for(var L=0,J=N.length;L<J;L++){I(O,K,N[L])}}else{I(O,K,M)}}}function s(E){var G=this,J=new n(E),F=E.tracker,H="UA-26783561-2";function D(M,K,L){L=L||E.serviceUrls[0];return L+"?"+r.serialize(M,"=","&",false,K)}function I(Q,L,P){Q.rd=r.getRandomString(5);var O=E.serviceID,M,K=new Image(1,1),N={};y.execHook("sender.send",Q,P,N);if(N.cancel){return}M=D(Q,L,P).substring(0,2000);K.onerror=function(){setTimeout(function(){var R=new Image(1,1);R.onload=function(){r.report(O,"RetrySuccess",{cmd:Q.gscmd},H)};R.onerror=function(){r.report(O,"SendingFailed",{cmd:Q.gscmd},H);J.appendFailed(Q,L,P);return true};R.src=M},2000);return true};K.onload=function(){var T=J.popAllFailed();for(var S=0,R=T.length;S<R;S++){G.send(T[S].obj,T[S].noEncode,T[S].destUrl)}};K.src=M;G.img=K}G.checkUrl=function(M,K,L){M.rd=r.getRandomString(5);return D(M,K,L).length<=2000};G.send=function(P,L,N){if(!P){return}if(!N){var O=E.serviceUrls;for(var M=0,K=O.length;M<K;M++){I(P,L,O[M])}}else{I(P,L,N)}}}function o(D){var E=this;E.parse=function(H){try{var V,Q,G,S,I,K,Z,J=D.keepAnchor,L=D.ignoreParams,M=D.campaignKey,T=D.keywordKey,P=D.sourceKey,ab=D.mediumKey,F=D.contentKey,X=D.groupKey,N=D.channelKey,aa=D.adidKey,Y=D.ad,O=D.cleanUrl;H=H||z.href;S=r.resolveUrl(H);G={protocol:S.protocol,local:S.local,host:S.host,path:S.fullPath,anchor:S.anchor,params:S.params};if(J&&S.anchor){G.path+="#"+S.anchor}if(O){G.cleanUrl=O}else{if(L.length!==0&&S.params){for(var R in S.params){for(V=0;V<L.length;V++){if(C(R)==L[V]){delete S.params[R]}}}for(V=0;V<L.length;V++){delete S.params[L[V]]}Q=r.serialize(S.params,"=","&",false,true);if(Q){Q="?"+Q}if(J&&S.anchor){Q+=("#"+S.anchor)}G.cleanUrl=[S.protocol,"://",S.host,S.path,Q].join("")}else{G.cleanUrl=[S.protocol,"://",S.host,G.path].join("")}}if(!G.local){var U=r.getAd(H,D);G.ad=U}return G}catch(W){r.report(D.serviceID,"M_Url",W)}}}function e(F){var G=this,J=new A(F),E={},D={};function I(){var O,M=G.uid,L=G.sid,K=[],N=[];for(O in E){if(c(E,O)){K.push(O+":"+g(E[O]))}}if(K.length>0){M=M+"|"+K.join("|")}for(O in D){if(c(D,O)){N.push(O+":"+g(D[O]))}}if(N.length>0){L=L+"|"+N.join("|")}J.set("_gscu",M,63072000);J.set("_gscs",L,1800);J.set("_gscbrs",1)}function H(Q){if(!Q){return null}var N,L,O=/[^\d\w]+/i,K={},P={},R=Q.split("|"),M;if(R[0].length==0||R[0].length>30||O.test(R[0])||R[0]=="null"){return null}K.id=R[0];for(N=1,L=R.length;N<L;N++){M=R[N].split(":");P[M[0]]=q(M[1])}K.data=P;return K}G.init=function(N){try{var P,L,R,K,M,O="";E={};D={};if(F.crossDomain){P=r.getUrlParam(z.href.replace("#","&"),"_gsc");if(P){P=P.split(";");if(P.length==2){K=q(P[0]);M=q(P[1]);L=1;R=true}}}if(!R){K=J.get("_gscu");M=J.get("_gscs");L=J.get("_gscbrs")}if((K=H(K))){G.uid=K.id;E=K.data;if(M=H(M)){G.sid=M.id;D=M.data}else{if(!M&&L){O="t"}G.sid=O+r.getRandomID()}}else{G.uid=r.getRandomID();G.sid=r.getRandomID()}if(!N){I()}}catch(Q){r.report(F.serviceID,"M_User",Q);G.uid=r.getRandomID();G.sid=r.getRandomID();E={};D={};I()}};G.saveSessionData=function(K,L){D[K]=L+"";I()};G.saveUserData=function(K,L){E[K]=L+"";I()};G.updateSessionRefPageIfNotExist=function(M){var L="_gsref";var K=J.get(L);if(!K&&!!M){K=M+""}if(K){J.set(L,K,1800)}};G.getSessionRefPage=function(){var K="_gsref";return J.get(K)};G.get=function(K){return E[K]||D[K]||null};G.serialize=function(){return"_gsc="+J.get("_gscu")+";"+J.get("_gscs")};G.isSampled=function(){var K=F.sample,L=r.getHashCode(G.uid);return L%10000<K*100}}function d(D){var E=this;E.getRefer=function(H){if(!H){try{H=u.top.document.referrer}catch(J){H=h}}if(!H){try{if(u.opener){H=u.opener.location.href}}catch(J){}}var I=[];var F=H.split("?");if(F.length!==1){var L=F[1];var K=L.split("&");for(var G=0;G<K.length;G++){if(K[G].length<401){I.push(K[G])}}return F[0]+"?"+I.join("&")}return H}}function v(F){var L=this,J,I,M=F.tracker,O=F.origin;function N(){if(!F.heatmap){return false}if(F.mcSample==100){return true}return Math.round(Math.random()*10000)<F.mcSample*100}function R(){if(F.docWidth){J=(r.getDocWidth()-F.docWidth)/2;I=0}else{if(O){var S=r.getPos(O);J=S.x;I=S.y}else{J=0;I=0}}}function H(T,S){R();return G({x:T-J,y:S-I})}function G(S){S.x=Math.round(S.x/10)*10;S.y=Math.round(S.y/10)*10;return S}function Q(ad,aa,Z,af){var U,ac,ab,W=Number(u[F.snapshotVar]||0),X=M.getCommon("mc"),T=M.url,V=T.parse(),ae=[],S={};if(!(W>-1&&W<256)){W=0}y.execHook("heatmap.send",X,ad,aa,Z,af,S);if(S.cancel){return}var Y=r.searchUp(null,af,"A",null,3);if(Y!=null){X.lk=Y.href;X.lt=_gsUtility.getInnerUnvisibleText(Y,"title")+Y.title||_gsUtility.getInnerUnvisibleText(Y,"alt")||_gsUtility.getInnerText(Y);ab=_gsUtility.getPos(Y);ab=H(ab.x,ab.y);X.lx=ab.x;X.ly=ab.y}Y=r.searchUp(null,af,null,{gsregion:""});if(Y!=null){ac=Number(Y.getAttribute("gsregion"));if(ac>-1&&ac<256){X.re=ac;if(Y.getAttribute("gsposfixed")=="1"){ab=r.getPos(Y);ab=H(ab.x,ab.y);ad=ad-ab.x;aa=aa-ab.y}Y=r.searchUp(null,af,null,{gssnapshot:""});if(Y){W=Number(Y.getAttribute("gssnapshot"));if(W<0||W>255){W=0}}}}X.gspver=F.pageVer;X.gsmcoffsetx=ad;X.gsmcoffsety=aa;ae=[V.protocol,"://",V.host,V.path];if(F.keepAnchor&&V.anchor){ae.push("#",V.anchor)}X.gsmcurl=ae.join("");X.gstl=F.pageName||k.title;X.gssn=W;X.gsorurl=V.cleanUrl;M.sender.send(X)}function K(Y){if(E(Y)){return}try{if(!N()){return}var X,T,W=C(Y.target.tagName);if(W=="body"||W=="html"){return}var U=Y.pageX,S=Y.pageY;if(r.touchPoint){U=r.touchPoint.X,S=r.touchPoint.Y,r.touchPoint=null}var Z=H(U,S);Q(Z.x,Z.y,this,Y)}catch(V){r.report(F.serviceID,"M_Heatmap_doc",V)}}function P(W,X){if(E(X)){return}try{var U=X.clientX,T=X.clientY;if(r.touchPoint){U=r.touchPoint.X,T=r.touchPoint.Y,r.touchPoint=null}var S=G(r.getPos(W)),Y=H(U,T);Q(Y.x+S.x,Y.y+S.y,W,X)}catch(V){r.report(F.serviceID,"M_Heatmap_iframe",V)}}function E(S){return r.touchPoint&&r.touchPoint.X==S.pageX&&r.touchPoint.Y==S.pageY}function D(){var U,W,V=F.iframes,T=frames;if(V.length==0){for(U=0,W=T.length;U<W;U++){try{var Y=T[U].frameElement||T[U];if(Y.contentDocument||T[U].document){Y.contentDocument=Y.contentDocument||T[U].document;V.push(Y)}}catch(X){}}}for(U=0,W=V.length;U<W;U++){var S=r.getEl(V[U]);if(S){try{S=S.frameElement||S;var Z=S.contentDocument;var aa=(function(ab){return function(ac){P(ab,ac)}})(S);if(k.ontouchstart!==undefined){r.observeTouch(Z,aa)}r.observe(Z,"mouseup",aa)}catch(X){}}}}L.bind=function(){if(L.isBind||!F.heatmap){return}L.isBind=true;if(k.ontouchstart!==undefined){r.observeTouch(k,K)}r.observe(k,"mouseup",K);if(/loaded|complete/.test(k.readyState)){D()}else{r.observe(u,"load",D)}};L.init=function(){L.bind()}}function x(D){var E=this;E.orders=[];E.ordersForEcom=[];E.addOrder=function(H,F,G){F=Number(F);E.orders.push({orderid:H+"",price:F||0,quantity:0,user:G,products:[],recal:!F})};E.addProduct=function(F,S,O,N,H,G,Q){try{var I,K,P,R,J,M=E.orders,T={};F=F+"";N=Number(N)||0;H=Number(H)||0;for(I=0,K=M.length;I<K;I++){if(M[I].orderid==F){P=M[I];break}}if(!P){P={orderid:F,price:0,quantity:0,products:[],recal:true};M.push(P)}R=P.recal;J=Number((N*H).toFixed(2));T={orderid:F,name:S,sku:O,quantity:H,unitPrice:N,price:J,category:G};if(Q){T.procp=r.serialize(Q,":",",",true,false)}P.quantity+=T.quantity;P.products.push(T);if(R){P.price=Number((P.price+J).toFixed(2))}}catch(L){r.report(D.serviceID,"FC_addProduct",L)}}}function j(F){var D=this,E=z.hostname;D.ad={};D.properties={};D.pageProperties=null;D.serviceID=F;D.serviceUrls=["http://www.webdissector.com/recv/gs.gif","http://recv-wd.gridsumdissector.com/gs.gif"];D.heatmapUrl="//www.webdissector.cn/js/heatmap.js";D.redirectServer="//www.addissector.com/";D.redirectServerPath="/redirect.gif";D.campaignKeyDefault="utm_campaign";D.mediumKeyDefault="utm_medium";D.sourceKeyDefault="utm_source";D.groupKeyDefault="utm_adgroup";D.keywordKeyDefault="utm_term";D.contentKeyDefault="utm_content";D.channelKeyDefault="utm_channel";D.accountKeyDefault="utm_account";D.adidKeyDefault="gsadid";D.campaignKey=D.campaignKeyDefault;D.mediumKey=D.mediumKeyDefault;D.sourceKey=D.sourceKeyDefault;D.groupKey=D.groupKeyDefault;D.keywordKey=D.keywordKeyDefault;D.contentKey=D.contentKeyDefault;D.channelKey=D.channelKeyDefault;D.accountKey=D.accountKeyDefault;D.adidKey=D.adidKeyDefault;D.ignoreParams=["gclid","bdclkid","gs_ws",D.campaignKey,D.mediumKey,D.sourceKey,D.groupKey,D.keywordKey,D.contentKey,D.channelKey,D.accountKey,"gsadid","gsabredir"];D.contentNetworkKey="content_";if(E.substring(0,4)=="www."){E=E.substring(4)}D.domain=E;D.path="/";D.sessionTimeout=30*60;D.sample=100;D.origin=k.body;D.mcSample=100;D.iframes=[];D.snapshotVar="GridsumSnapshotID";D.tsVar="GSTS";D.mobileLaunchProperties={}}function w(G,L){var I=this,H=new j(G);H.tracker=I;I.serviceID=G;I.appName=L;I.config=H;function E(){try{if(r.getCookie("_gsHijack")){return}if(top!=u&&top.location.href===z.href){r.report(G,"WebPageHijack");r.setCookie("_gsHijack",1)}}catch(P){}}function K(){if(H.trackLocal){return false}var P=z.hostname;return z.protocol==="file:"||b(P,"localhost")>-1||b(P,"127.")==0||b(P,"192.168.")==0||b(P,"10.")==0||b(P,"172.")==0}function D(){var P=C(z.hash);return H.heatmap&&b(P,"#gwdheatmap&")>-1&&b(P,G.substring(4))>-1}function O(){return!G||(!I.appName&&K())||D()||b(f,H.ignoreUA)>-1||!I.user.isSampled()}function F(Q){var P=I.user;return{gsver:y.version,gscmd:Q,gssrvid:G,gsuid:P.uid,gssid:P.sid,gsltime:r.getLocalTime(),gstmzone:r.getTimeZone(),gsjp:H.junction,rd:1}}function J(P){P.gsscr=screen.width+"*"+screen.height}function N(Q){var P=new Date(),R=Math.round((P-Q)/1000);if(R>180){R=180}if(R<0){R=0}I.duration=R}function M(P,Q){if(!I.hbSent){I.trackHeartbeat(P,Q);I.hbSent=1;return true}}I.getCommon=F;I.init=function(){if(I.isInit){I.user.init();return}I.user=new e(H);I.referrer=new d(H);I.url=new o(H);I.ecom=new x(H);I.sender=z.protocol==="file:"?new s(H):new a(H);I.heatmap=new v(H);I.user.init();var T,S=y.plugins,W=S.length;for(T=0;T<W;T++){var U=S[T],P=U.name;I[P]=new U.template(H)}if(D()){I.showHeatmap()}if(!O()){if(H.lazyBinding){r.observe(u,"load",function(){I.heatmap.init()})}else{I.heatmap.init()}I.pvid=r.getRandomID();var Y=new Date();r.observe(u,"load",function(){var Z=u[H.tsVar]||Y;N(Z)});r.observe(u,"beforeunload",function(){if(I.duration==null){var Z=u[H.tsVar]||Y;N(Z)}if(z.protocol!="file:"){M()}});var X;var R=I.user.sid;var V=I.user.uid;var Q=u.setInterval(function(){if(!I.conditionMatch){I.user.init(true);var Z=I.user.get("pv");if(X&&X<Z){I.conditionMatch=1}else{if(I.user.sid!=R){I.conditionMatch=1}}X=Z}if(I.conditionMatch&&I.duration!=null&&z.protocol!="file:"){M(R,V);I.user.updateSessionRefPageIfNotExist(I.referrerPage);u.clearInterval(Q)}},1000)}else{I.disabled=true}I.isInit=true};I.track=function(X,P){try{I.init();if(I.disabled){return}var ab=false;var Y=H.properties,ae=H.pageProperties,ac,U=I.user,R,Q=I.url,S,V=F("spv"),Z=(X&&P)?z.href:"";if(X){ab=true;X=X.replace(/\/+/g,"/")}S=X||z.href;X=Q.parse(S);Z=I.referrer.getRefer(Z);R=Number(U.get("pv"))||0;if(!I.isSent){V.pvid=I.pvid;I.isSent=1}V.gstl=H.pageName||k.title;V.ubc=H.breadcrumb;V.gscp=r.serialize(Y,"::","||",false,false);V.pcp=ae;if(I.appName){V.gsurl=[X.protocol,"://",I.appName,X.path].join("")}else{V.gsurl=ab?[X.protocol,"://",X.host,S].join(""):S}if(z.protocol==="file:"){V.gsmconn=r.getMobileConnectionType();V.gsmlati=sessionStorage.getItem("gslatitude");V.gsmlongi=sessionStorage.getItem("gslongitude")}else{ac=X.ad;V.adcp=ac.campaign;V.adgp=ac.group;V.adsr=ac.source;V.admd=ac.medium;V.adkw=ac.keyword;V.adct=ac.content;V.adch=ac.channel;V.adid=ac.adid}J(V);if(H.cleanUrl){V.gsorurl=ab?[X.protocol,"://",X.host,S].join(""):H.cleanUrl}I.referrerPage=V.gsref=Z||"";I.sender.send(V);U.updateSessionRefPageIfNotExist(I.referrerPage);U.saveSessionData("pv",++R);if(I.rsDomain&&R==1&&(!h||b(h,I.rsDomain)>-1)){var aa=V;aa.gscmd="rpv";var T=[H.redirectServer,r.getHashCode(I.rsDomain),H.redirectServerPath].join("");I.sender.send(aa,false,T)}E()}catch(W){r.report(G,"FC_track",W)}};I.trackMobileLaunch=function(){try{I.init();if(I.disabled){return}var P=F("launch");P.gscp=r.serialize(H.mobileLaunchProperties,"::","||",false,false);P.gsmsdk="Cordova"+r.getMobileDeviceCordovaVersion();P.gsmmanu=r.getMobileDeviceManufacturer();P.gsmname=r.getMobileDeviceName();P.gsmplat=r.getMobileDeviceOSPlatform();P.gsmuuid=r.getMobileDeviceUUID();P.gsmver=r.getMobileDeviceOSVersion();P.gsmapp=I.appName;r.watchPosition(function(R){sessionStorage.setItem("gslatitude",R.coords.latitude);sessionStorage.setItem("gslongitude",R.coords.longitude)},function(R){sessionStorage.setItem("gslatitude","error");sessionStorage.setItem("gslongitude","error")});I.sender.send(P)}catch(Q){r.report(G,"FC_trackMobileLaunch",Q)}};I.trackLink=function(S,R,Q,P){return I.bindEvent(R,"click",function(T){I.track(S,true)},Q,P)};I.trackECom=function(){try{I.init();if(I.disabled){return}var X,V,aa,T,P,Y=I.sender,ac=I.ecom.orders,W=F("ecom"),Q,S,ae,ad=[],U=I.user,Z=U.get("_gsecom");if(Z){Z=Z.split(",")}else{Z=[]}for(X=0,aa=ac.length;X<aa;X++){S=ac[X];P=g(S.orderid);if(b(Z,P)>-1){continue}Z.push(P);W.gsorderid=S.orderid;W.gstotal=S.price;W.gsquan=S.quantity;W.gsuserid=S.user;for(var R in I.ecom.ordersForEcom){if(I.ecom.ordersForEcom[R].orderid==S.orderid){W.ecp=I.ecom.ordersForEcom[R].ecomProperties;break}}Q=S.products;ad=[];for(V=0,T=Q.length;V<T;V++){ae=Q[V];ae=r.serialize(ae,"::",",,",false,true);ad.push(ae)}W.gsproducts=ad.join("||");if(!Y.checkUrl(W)){for(V=0;V<Q.length;V++){ae=Q[V];ae=r.serialize(ae,"::",",,",false,true);W.gsproducts=ae;Y.send(W)}}else{Y.send(W)}}U.saveSessionData("_gsecom",Z.join(","));I.ecom.orders=[]}catch(ab){r.report(G,"FC_trackECom",ab)}};I.trackClickthrough=function(T,P){try{I.init();if(I.disabled){return}if(T||P){var Q=F("ct"),S=I.lastSearchID;if(S){Q.gsssid=S;if(P){Q.url=P}Q.gsclktl=T;I.sender.send(Q)}}}catch(R){r.report(G,"FC_trackClickthrough",R)}};I.trackHeartbeat=function(P,Q){var R=F("hb");R.pvid=I.pvid;R.pld=I.duration;R.gssid=P||R.gssid;R.gsuid=Q||R.gsuid;I.sender.send(R)};I.trackSiteSearch=function(U,Q,R,X,W){try{I.init();if(I.disabled){return}var T=F("ss"),S=r.getRandomID();if(X){T.gsskwd=r.getUrlParam(z.href,U);T.gssenc=R||"utf-8";T.gsscat=r.getUrlParam(z.href,Q)}else{if(R){T.gsskwd=U;T.gsscat=Q;T.gssenc=R}else{T.gsskwd=g(U);T.gsscat=g(Q);T.gssenc="utf-8"}}if(!T.gsskwd){return}T.gsssid=I.lastSearchID=S;W=W||h;if(W){var P=r.resolveUrl(W);T.gssrefpa=P.fullPath;T.gssrefdm=P.host}I.sender.send(T)}catch(V){r.report(G,"FC_trackSiteSearch",V)}};I.trackEvent=function(R,P,Q,U){I.init();if(I.disabled){return}try{var T=F("ev"),S=z.href;T.eca=R;T.eac=P;T.eva=U;T.ela=Q;S=I.url.parse(S);T.gsourl=S.cleanUrl;I.sender.send(T)}catch(V){r.report(G,"FC_trackEvent",V)}};I.bindEvent=function(S,P,T,R,Q){Q=Q||{};return r.observe(S,P,function(V){if(!V||!V.target){return}var U=r.searchUp(S,V,R,Q);if(U!=null){V.matched=U;T(V);return}})};I.bindSearchResults=function(P,Q){return I.bindEvent(P,"click",function(S){var R=S.matched;I.trackClickthrough(r.getInnerText(R),R.href)},"a",Q)};I.showHeatmap=function(){var Q=H.heatmapUrl;y.heatmapUrl=z.href;var P=k.createElement("script");P.src=Q;k.getElementsByTagName("head")[0].appendChild(P)};I.addOrder=function(Q,P){I.ecom.addOrder(Q,Number(P))};I.addProduct=function(V,R,U,S,T,Q,P){I.ecom.addProduct(V,R,U,Number(S),Number(T),Q,P)};I.setSessionTimeout=function(P){if(P<1||P>3600){return}H.sessionTimeout=P};I.setBreadcrumb=function(P){I.config.breadcrumb=P};I.setCampaign=function(P){if(P&&P.length!=0){H.ad.campaign=P}};I.setGroup=function(P){if(P&&P.length!=0){H.ad.group=P}};I.setContent=function(P){if(P&&P.length!=0){H.ad.content=P}};I.setKeyword=function(P){if(P&&P.length!=0){H.ad.keyword=P}};I.setMedium=function(P){if(P&&P.length!=0){H.ad.medium=P}};I.setSource=function(P){if(P&&P.length!=0){H.ad.source=P}};I.setAdid=function(P){if(P&&P.length!=0){H.ad.adid=P}};I.setCampaignKey=function(P){H.ignoreParams.push(H.campaignKey=C(P))};I.setMediumKey=function(P){H.ignoreParams.push(H.mediumKey=C(P))};I.setContentKey=function(P){H.ignoreParams.push(H.contentKey=C(P))};I.setSourceKey=function(P){H.ignoreParams.push(H.sourceKey=C(P))};I.setKeywordKey=function(P){H.ignoreParams.push(H.keywordKey=C(P))};I.setGroupKey=function(P){H.ignoreParams.push(H.groupKey=C(P))};I.setChannelKey=function(P){H.ignoreParams.push(H.channelKey=C(P))};I.setAdidKey=function(P){H.ignoreParams.push(H.adidKey=C(P))};I.setContentNetworkPrefix=function(P){H.contentNetworkKey=P};I.setChannel=function(R,P,Q){var S;if(P){if(Q){S=r.getUrlParam(h,P)}else{S=r.getUrlParam(z.href,P)}if(S){R=S}}if(R&&R.length!=0){H.ad.channel=R}};I.setIgnoreTrafficKeyword=function(P){if(P){H.ignoreUA=P}};I.setCustomProperty=function(Q,P,S,R){var T=P;if(S==="cookie"){T=r.getCookie(R)||P}else{if(S==="query"){T=r.getUrlParam(z.href,R)||P}}if(T!=null){H.properties[Q]=T}};I.setMobileLaunchProperty=function(P,Q){if(Q!=null){H.mobileLaunchProperties[P]=Q}};I.setPageProperty=function(P,Q){if(P==null||Q==null){return}if(!H.pageProperties){H.pageProperties={}}H.pageProperties[P]=Q};I.setEcomProperty=function(P,R,T){if(P==null||R==null||T==null){return}for(var S in I.ecom.ordersForEcom){if(I.ecom.ordersForEcom[S].orderid==P){I.ecom.ordersForEcom[S].ecomProperties[R]=T;return}}var Q=I.ecom.ordersForEcom.push({orderid:P,ecomProperties:{}});I.ecom.ordersForEcom[Q-1].ecomProperties[R]=T};I.setHeatmapScriptUrl=function(P){H.heatmapUrl=P};I.setPageName=function(P){H.pageName=P};I.setServiceUrl=function(P){H.serviceUrls=[P]};I.setServiceUrls=function(P){if(!l(P)){P=t.call(arguments)}H.serviceUrls=P};I.setJunctionPoint=function(P){H.junction=P};I.setCookieProperties=function(Q,R,P){if(Q&&Q.charAt(0)==="."){Q=Q.substring(1)}H.domain=Q||H.domain;H.path=R||H.path;H.secure=!!P};I.setSamplingRate=function(P){H.sample=P};I.setClickSamplingRate=function(P){H.mcSample=P};I.setDocWidth=function(P){H.docWidth=Number(P)};I.setOriginalUrl=function(P){H.cleanUrl=P};I.setOriginElement=function(P){H.origin=r.getEl(P)};I.setPageVersion=function(P){H.pageVer=P};I.getWDCookieString=function(){I.init();return I.user.serialize()};I.jump=function(Q){var P=I.getWDCookieString(),R=m(Q)?Q:Q.action;z.href=R+"#"+P};I.addIgnoreParams=function(){H.ignoreParams=H.ignoreParams.concat(t.call(arguments))};I.enableLazyClickTrace=function(P){H.lazyBinding=!P};I.enableHeatmap=function(P){H.heatmap=!P;if(I.heatmap){I.heatmap.bind()}};I.enableCrossDomain=function(P){H.crossDomain=!P};I.enableLocalTraffic=function(){H.trackLocal=true};I.enableAnchor=function(P){};I.keepAnchor=function(P){H.keepAnchor=!P};I.enableRedirectServer=function(P){I.rsDomain=P||H.domain};I.setErrorUrls=function(P){if(!l(P)){P=t.call(arguments)}r.errorUrls=P||[]};I.getSessionRefPage=function(){var P;if(I.user){P=I.user.getSessionRefPage()}return P}}var y={version:"3.1.0.0",hooks:[],plugins:[],trackers:{},register:function(D,F,E){y.plugins.push({name:D,template:F});y.addApis(E)},addApis:function(D){if(D){for(var E in D){if(c(D,E)){w.prototype[E]=D[E]}}}},addHook:function(E,F){var D=y.hooks;E=C(E);D[E]=D[E]||[];D[E].push(F)},execHook:function(E){var H;if((H=y.hooks[E])){for(var F=0,D=H.length;F<D;F++){var G=H[F];G.apply(G,t.call(arguments,1))}}},isTrackerExist:function(D){return!!y.trackers[D]},getTracker:function(E,D){return y.trackers[E]||(y.trackers[E]=new w(E,D))},loadCallback:function(E,D,F){E=E||"_gsCallback";return r.waitFor("window."+E,function(G){G()},D,F)}};u.GridsumWebDissector=y;u._gsUtility=r;r.resolveURL=r.resolveUrl})();var _gsTracker=GridsumWebDissector.getTracker('GWD-002717');if(_gsUtility.isPageMatch(["/index.html","/index.htm","/default.aspx","/home.aspx","/home.html"],'exactmatch',location.pathname)){}else{}
_gsTracker.track();