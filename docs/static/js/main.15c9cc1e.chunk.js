(this.webpackJsonpminesweeper=this.webpackJsonpminesweeper||[]).push([[0],{26:function(t,e,n){},27:function(t,e,n){},28:function(t,e,n){},29:function(t,e,n){},31:function(t,e,n){},32:function(t,e,n){},33:function(t,e,n){"use strict";n.r(e);var i=n(3),s=n.n(i),o=n(20),r=n.n(o),a=(n(26),n(1)),l=n(2),u=n(4),c=n(5),d=(n(27),n(19)),h=(n(28),n(13)),f=(n(29),n(6));function v(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return e.flatMap((function(t){return String(t)===t||t instanceof Array?t:Object.entries(t).filter((function(t){var e=Object(f.a)(t,2);e[0];return e[1]})).map((function(t){var e=Object(f.a)(t,2),n=e[0];e[1];return n}))})).join(" ")}function g(t,e){if(null==e){var n=[0,t];t=n[0],e=n[1]}return t=Math.ceil(t),e=Math.floor(e),Math.floor(Math.random()*(e-t))+t}var m,p=n(15);!function(t){t[t.Open=1]="Open",t[t.Mark=2]="Mark",t[t.Lookup=3]="Lookup",t[t.Suggest=4]="Suggest"}(m||(m={}));var b,j=function(){function t(e){var n=this;Object(a.a)(this,t),this.timerId=0,this.values=[],this.value=0,this.duration=64,this.phase=null,this.target=null,this.boardState=void 0,this.logging=!1,this.resultsValues={contextmenu:m.Mark,dblclick:m.Lookup,click:m.Open},this.buttonsMapping={0:1,1:4,2:2,3:8,4:16},this.goDown=function(t){n.log("down",t),null===n.phase&&(n.target=n.boardState.elements.get(t.target)),n.phase=!1,n.values.push(n.buttonsMapping[t.button]),n.startTimer((function(){n.value=n.values[0],n.values.length>1&&(n.value=n.values.reduce((function(t,e){return t|e}))),n.log("pre flush"),n.reset(!0),n.flush()}))},this.goUp=function(t){n.log("up",t),n.phase=!0,n.startTimer(n.flush)},this.catchResult=function(t){n.log("catch",t),n.target||(n.target=n.boardState.elements.get(t.target)),n.value||(n.value=n.resultsValues[t.type]),n.phase=!0,n.flush(),n.reset(),t.stopPropagation(),t.preventDefault()},this.startTimer=function(t){n.timerId||(n.timerId=window.setTimeout(t,n.duration))},this.reset=function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];n.values=[],n.timerId&&clearTimeout(n.timerId),n.timerId=0,t||(n.value=0,n.phase=null,n.target=null)},this.flush=function(){var t,e;(n.log("flush"),null===(t=n.target)||void 0===t||t.onPress(!!n.phase,n.value),n.phase)&&(null===(e=n.target)||void 0===e||e.onClick(n.value),n.reset())},this.log=function(t,e){if(n.logging){if(!1===e)return console.log(t);var i=null!==e&&void 0!==e?e:{},s=i.button,o=i.buttons,r=i.type,l=n.value,u=n.phase,c={1:"Open",2:"Mark",3:"Lookup",4:"Suggest"}[l];console.log(t,{value:l,valueStr:c,phase:u,values:Object(p.a)(n.values)},e?{button:s,buttons:o,type:r,event:e}:new function t(){Object(a.a)(this,t)})}},this.boardState=e}return Object(l.a)(t,[{key:"listeners",get:function(){return{onMouseDownCapture:this.goDown,onMouseUpCapture:this.goUp,onContextMenuCapture:this.catchResult,onDoubleClickCapture:this.catchResult}}}]),t}(),O=n(0),w=function(t){Object(u.a)(n,t);var e=Object(c.a)(n);function n(t){var i;return Object(a.a)(this,n),(i=e.call(this,t)).state={content:"",isSuggested:!1,count:0},i.enabled=!0,i.settings=void 0,i.element=void 0,i.open=function(){i.settings.isOpen=!0,i.setState({content:i.settings.isMine?"\ud83d\udca3":(i.settings.value||"").toString(),isSuggested:!1})},i.mark=function(t){var e,n,s,o;if(!i.settings.isOpen){i.settings.isMarked=null!==t&&void 0!==t?t:!i.settings.isMarked;var r=null!==(e=null===(n=i.settings.board)||void 0===n?void 0:n.minesCount)&&void 0!==e?e:0;null===(s=(o=i.props).mark)||void 0===s||s.call(o,r),i.setState({count:r,isSuggested:!1,content:i.settings.isMarked?"\ud83d\udea9":""}),null==t&&setTimeout(i.resetAnimation,0)}},i.lookup=function(){var t,e;if(i.settings.isOpen&&i.settings.value){var n=null===(t=i.settings.board)||void 0===t?void 0:t.getAround(i.settings),s=null!==(e=null===n||void 0===n?void 0:n.reduce((function(t,e){return t+Number(e.isMarked)}),0))&&void 0!==e?e:0;i.props.lookup&&i.settings.value===s&&i.props.lookup(i.settings)}},i.suggest=function(){i.settings.isOpen||i.settings.isMarked||i.setState({isSuggested:!i.state.isSuggested})},i.onClick=function(t){if(i.enabled)switch(t){case m.Open:i.settings.isMarked||(i.props.move&&i.props.move(i.settings),i.open());break;case m.Mark:i.mark();break;case m.Lookup:i.lookup();break;case m.Suggest:i.suggest()}},i.disable=function(){i.enabled=!1},i.resetAnimation=function(){var t,e,n;null===(t=i.element.current)||void 0===t||t.classList.remove("animate"),null===(e=i.element.current)||void 0===e||e.offsetWidth,null===(n=i.element.current)||void 0===n||n.classList.add("animate")},i.onPress=function(t,e){var n;e===m.Lookup&&(null===(n=i.settings.board)||void 0===n||n.getAround(i.settings).filter((function(t){return!t.isOpen&&!t.isMarked})).forEach((function(e){var n,i;null===(n=e.component)||void 0===n||null===(i=n.element.current)||void 0===i||i.classList.toggle("pressed",!t)})))},i.settings=t.field,i.settings.component=Object(h.a)(i),i.element=s.a.createRef(),i}return Object(l.a)(n,[{key:"render",value:function(){var t={"--count":this.state.count,"--direction":this.settings.y<2?1:-1};return Object(O.jsx)("div",{className:v("field","around".concat(this.settings.isMine?0:this.settings.value),{open:this.settings.isOpen,marked:this.settings.isMarked,suggested:this.state.isSuggested}),style:t,ref:this.element,children:this.state.content})}},{key:"componentDidMount",value:function(){var t;null===(t=this.settings.board)||void 0===t||t.elements.set(this.element.current,this)}}]),n}(s.a.Component),k=n(16);!function(t){t.Pending="Pending",t.InProgress="In Progress",t.Win="You Win! \ud83d\ude0e",t.Loose="You Loose \ud83d\ude41"}(b||(b={}));var y=function t(e){Object(a.a)(this,t),this.value=0,this.x=0,this.y=0,this.isOpen=!1,this.isMine=!1,this.isMarked=!1,this.component=void 0,this.board=void 0,Object.assign(this,e)},M=function(t){Object(u.a)(n,t);var e=Object(c.a)(n);function n(){var t;Object(a.a)(this,n);for(var i=arguments.length,s=new Array(i),o=0;o<i;o++)s[o]=arguments[o];return(t=e.call.apply(e,[this].concat(s))).fields=[],t.board=[],t.minesFields=[],t.elements=new Map,t.columns=8,t.rows=8,t.mines=8,t.getAround=function(e){var n=e.x,i=e.y;return[[n-1,i-1],[n,i-1],[n+1,i-1],[n-1,i],[n+1,i],[n-1,i+1],[n,i+1],[n+1,i+1]].filter((function(e){var n=Object(f.a)(e,2),i=n[0],s=n[1];return i>=0&&i<t.columns&&s>=0&&s<t.rows})).map((function(e){var n=Object(f.a)(e,2),i=n[0],s=n[1];return t.board[i][s]}))},t.lookup=function(e){var n=[];return function e(i){var s=t.getAround(i).filter((function(t){return!n.includes(t)&&!t.isMarked}));n.push.apply(n,Object(p.a)(s)),s.filter((function(t){return!t.value})).forEach(e)}(e),n},t}return Object(l.a)(n,[{key:"createBoard",value:function(t){Object.assign(this,t),this.fields=[],this.minesFields=[],this.board=[];for(var e=0;e<this.columns;e++)this.board[e]=[];for(var n=0;n<this.rows;n++)for(var i=0;i<this.columns;i++)this.board[i][n]=new y({x:i,y:n,value:0,board:this}),this.fields.push(this.board[i][n])}},{key:"fillBoard",value:function(t){for(var e=this,n=this.mines;n;){var i=g(this.columns),s=g(this.rows);this.board[i][s].isMine||i===t.x||s===t.y||(this.minesFields.push(this.board[i][s]),this.board[i][s].isMine=!0,n--)}this.minesFields.forEach((function(t){e.getAround(t).forEach((function(t){return t.value++}))}))}},{key:"minesCount",get:function(){return this.mines-this.fields.filter((function(t){return t.isMarked})).length}}]),n}(Object(k.a)(Array)),S=function(t){Object(u.a)(n,t);var e=Object(c.a)(n);function n(t){var i,s,o;return Object(a.a)(this,n),(o=e.call(this,t)).board=new M,o.click=new j(o.board),o.timer=0,o.timerId=0,o.state={won:null},o.tick=function(){var t,e;o.timer++,null===(t=(e=o.props).updateInfo)||void 0===t||t.call(e,{timer:o.timer})},o.mark=function(t){var e,n;null===(e=(n=o.props).updateInfo)||void 0===e||e.call(n,{minesLeft:t})},o.move=function(t){var e,n;o.timer||(o.board.fillBoard(t),o.timer=1,o.timerId=window.setInterval(o.tick,1e3),null===(e=(n=o.props).updateInfo)||void 0===e||e.call(n,{state:b.InProgress}));if(t.isMine)return o.gameOver();o.checkWin(t)||t.value||o.lookup(t)},o.lookup=function(t){if(!t.isMarked){var e=o.board.lookup(t);return e.forEach((function(t){var e;return!t.isOpen&&(null===(e=t.component)||void 0===e?void 0:e.open())})),e.find((function(t){return t.isMine}))?o.gameOver():o.checkWin(),e}},o.board.createBoard(o.props),null===(i=(s=o.props).updateInfo)||void 0===i||i.call(s,{state:b.Pending,minesLeft:o.props.mines}),window.board=o.board,o}return Object(l.a)(n,[{key:"render",value:function(){var t=this,e={"--columns":this.props.columns,"--rows":this.props.rows,"--count":this.board.minesCount};return Object(O.jsx)("div",Object(d.a)(Object(d.a)({},this.click.listeners),{},{className:v("board",{win:!0===this.state.won,loose:!1===this.state.won}),style:e,children:this.board.fields.map((function(e){return Object(O.jsx)(w,{field:e,move:t.move,lookup:t.lookup,mark:t.mark},"".concat(e.x,".").concat(e.y))}))}))}},{key:"checkWin",value:function(t){var e,n;if(!this.board.fields.find((function(e){return!e.isMine&&!e.isOpen&&t!==e})))return console.log("Win!",this.timer,"seconds"),null===(e=(n=this.props).updateInfo)||void 0===e||e.call(n,{state:b.Win}),this.stop(),this.setState({won:!0}),this.board.minesFields.forEach((function(t){var e;return null===(e=t.component)||void 0===e?void 0:e.mark(!0)})),!0}},{key:"stop",value:function(){clearInterval(this.timerId),this.board.fields.forEach((function(t){var e;return null===(e=t.component)||void 0===e?void 0:e.disable()}))}},{key:"gameOver",value:function(){var t,e;this.setState({won:!1}),null===(t=(e=this.props).updateInfo)||void 0===t||t.call(e,{state:b.Loose}),console.log("game over"),this.board.minesFields.forEach((function(t){var e;return null===(e=t.component)||void 0===e?void 0:e.open()})),this.stop()}}]),n}(s.a.Component),x=n(21),C={beginner:{columns:9,rows:9,mines:10},default:{columns:12,rows:8,mines:12},intermediate:{columns:16,rows:16,mines:40},expert:{columns:30,rows:16,mines:99}},I={beginner:{min:10,mines:.12},default:{min:12,mines:.125},intermediate:{min:16,mines:.15},expert:{min:20,mines:.2}},E={beginer:"beginner",small:"beginner",easy:"beginner",min:"beginner",medium:"intermediate",middle:"intermediate",big:"expert",max:"expert",herd:"expert"},L=function(){function t(){Object(a.a)(this,t),this.columns=void 0,this.rows=void 0,this.mines=void 0;var e=t.getInitialSettings(),n=window.screen.orientation?"land"===window.screen.orientation.type.substr(0,4):window.innerWidth>window.innerHeight;if(window.innerWidth<800&&n&&e.columns<e.rows){var i=[e.rows,e.columns];e.columns=i[0],e.rows=i[1]}Object.assign(this,e),window.settings=this}return Object(l.a)(t,[{key:"getPossibleSettings",value:function(){for(var t=window.innerWidth,e=window.innerHeight,n=[],i=Object.keys(I),s=function(s){for(var o=function(o){if(n.find((function(t){return t.columns===s||t.rows===o})))return"continue";var r=Math.min(e/o,t/s);if(t-s*r<10&&e-o*r<10){var a=s*o,l={columns:s,rows:o,mines:{}};i.forEach((function(t){return l.mines[t]=Math.floor(I[t].mines*a)})),n.push(l)}},r=100;r>=2;r--)o(r)},o=100;o>=2;o--)s(o);return n.reverse()}}],[{key:"getInitialSettings",value:function(){var t=window.location.hash.replace("#","").toLowerCase();if(!t)return C.default;if(t in E&&(t=E[t]),t in C)return C[t];if(/^fill:?(\w+)?$/.test(t)){var e=I[RegExp.$1]||I[E[RegExp.$1]]||I.default,n=window,i=n.innerWidth,s=n.innerHeight,o=Math.max(i,s),r=Math.min(i,s),a=Math.floor(r/e.min),l=Math.floor(o/a),u=Math.floor(e.min*l*e.mines);return i>s?{mines:u,columns:l,rows:e.min}:{mines:u,columns:e.min,rows:l}}if(/^custom:/.test(t)){var c,d=null===(c=t.match(Object(x.a)(/^custom:([0-9]+)[\0-\/:-\uFFFF]([0-9]+)[\0-\/:-\uFFFF]([0-9]+)/,{columns:1,rows:2,mines:3})))||void 0===c?void 0:c.groups,h={};for(var f in d)h[f]=+d[f];return h}return C.default}}]),t}(),B=n(7),F=(n(31),function(t){Object(u.a)(n,t);var e=Object(c.a)(n);function n(t){var i,s;Object(a.a)(this,n),(s=e.call(this,t)).joiner="x",s.possible=[],s.state=void 0,s.changeCustom=function(t){s.setState(Object(B.a)({},t.target.name,t.target.value))},s.changeSettings=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"fill:default";if(!t&&s.state.board&&s.state.mines){var e=s.getVariantByBoard(s.state.board);t="custom:"+[null===e||void 0===e?void 0:e.columns,null===e||void 0===e?void 0:e.rows,null===e||void 0===e?void 0:e.mines[s.state.mines]].join(s.joiner)}window.history.pushState({},"Minesweeper","#"+t),window.location.reload()},s.possible=s.props.settings.getPossibleSettings();var o=[s.props.settings.columns,s.props.settings.rows].join(s.joiner);s.getVariantByBoard(o)||(o=null);var r=(i={},Object(B.a)(i,s.getMinesCount("beginner",o),"beginner"),Object(B.a)(i,s.getMinesCount("intermediate",o),"intermediate"),Object(B.a)(i,s.getMinesCount("expert",o),"expert"),i)[s.props.settings.mines];return s.state={board:o,mines:r},s}return Object(l.a)(n,[{key:"render",value:function(){var t,e,n,i,s=this;return Object(O.jsxs)("div",{className:"settings-selector",onClick:function(t){return t.stopPropagation()},children:[this.props.info.state!==b.Pending&&Object(O.jsxs)("div",{children:[Object(O.jsxs)("h3",{children:["Game State: ",null===(t=this.props.info)||void 0===t?void 0:t.state]}),Object(O.jsxs)("h4",{className:"sub",children:["Seconds from start: ",null!==(e=null===(n=this.props.info)||void 0===n?void 0:n.timer)&&void 0!==e?e:"--"]}),Object(O.jsxs)("h4",{className:"sub",children:["Mines left: ",null===(i=this.props.info)||void 0===i?void 0:i.minesLeft]})]}),Object(O.jsx)("h3",{children:"Standard difficulty levels:"}),Object(O.jsx)("p",{className:"link",onClick:function(){return s.changeSettings("fill")},children:"Default"}),Object(O.jsx)("p",{className:"link",onClick:function(){return s.changeSettings("fill:beginner")},children:"Beginner"}),Object(O.jsx)("p",{className:"link",onClick:function(){return s.changeSettings("fill:intermediate")},children:"Intermediate"}),Object(O.jsx)("p",{className:"link",onClick:function(){return s.changeSettings("fill:expert")},children:"Expert"}),Object(O.jsx)("h3",{children:"Custom board:"}),Object(O.jsxs)("label",{children:[Object(O.jsx)("h4",{children:"Board size:"}),Object(O.jsxs)("select",{onChange:this.changeCustom,name:"board",defaultValue:this.state.board,children:[!this.state.board&&Object(O.jsx)("option",{className:"default",children:"-- Select Board --"}),this.possible.map((function(t){var e=[t.columns,t.rows].join(s.joiner);return Object(O.jsx)("option",{value:e,children:e},e)}))]})]}),Object(O.jsxs)("label",{children:[Object(O.jsx)("h4",{children:"Mines count:"}),Object(O.jsxs)("select",{onChange:this.changeCustom,name:"mines",defaultValue:this.state.mines,children:[!this.state.mines&&Object(O.jsx)("option",{className:"default",children:"-- Select Mines --"}),Object(O.jsxs)("option",{value:"beginner",children:["Beginner ",this.state.board&&"(".concat(this.getMinesCount("beginner"),")")]}),Object(O.jsxs)("option",{value:"intermediate",children:["Intermediate ",this.state.board&&"(".concat(this.getMinesCount("intermediate"),")")]}),Object(O.jsxs)("option",{value:"expert",children:["Expert ",this.state.board&&"(".concat(this.getMinesCount("expert"),")")]})]})]}),Object(O.jsx)("button",{className:"button",onClick:function(){return s.changeSettings("")},disabled:!this.state.board||!this.state.mines,children:"Apply Custom"})]})}},{key:"getMinesCount",value:function(t){var e,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.state.board;if(!n)return"--";var i=this.getVariantByBoard(n);return null!==(e=null===i||void 0===i?void 0:i.mines[t].toString())&&void 0!==e?e:"--"}},{key:"getVariantByBoard",value:function(t){var e,n=t.split(this.joiner).map((function(t){return Number(t)})),i=Object(f.a)(n,2),s=i[0],o=i[1];return null!==(e=this.possible.find((function(t){return t.columns===s&&t.rows===o})))&&void 0!==e?e:null}}]),n}(s.a.Component)),N=function(){function t(){var e,n=this,i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:document.body,s=arguments.length>1&&void 0!==arguments[1]&&arguments[1];Object(a.a)(this,t),this.startX=null,this.startY=null,this.element=null,this.handlers={},this.threshold=Math.min(window.innerWidth,window.innerHeight)/5,this.handleTouchStart=function(t){var e=t.touches[0],i=e.clientX,s=e.clientY;Object.assign(n,{startX:i,startY:s})},this.handleTouchEnd=function(t){var e,i;if(null!=n.startX&&null!=n.startY){var s=t.changedTouches[0],o=s.clientX,r=s.clientY,a=n.startX-o;Math.abs(a)<n.threshold&&(a=0);var l=n.startY-r;Math.abs(l)<n.threshold&&(l=0);var u=Math.abs(a)>Math.abs(l)?a>0?"left":"right":l>0?"up":"down";return n.startX=null,n.startY=null,null===(e=(i=n.handlers)[u])||void 0===e?void 0:e.call(i,t)}},this.element="string"===typeof i?null!==(e=document.querySelector(i))&&void 0!==e?e:null:i,s&&this.attach()}return Object(l.a)(t,[{key:"attach",value:function(){this.element&&(this.element.addEventListener("touchstart",this.handleTouchStart,!1),this.element.addEventListener("touchend",this.handleTouchEnd,!1))}},{key:"detach",value:function(){this.element&&(this.element.removeEventListener("touchstart",this.handleTouchStart,!1),this.element.removeEventListener("touchend",this.handleTouchEnd,!1))}},{key:"on",value:function(t,e){return t&&e?this.handlers[t]=e:Object.assign(this.handlers,t),this}}]),t}(),P=(n(32),function(t){Object(u.a)(n,t);var e=Object(c.a)(n);function n(){var t;Object(a.a)(this,n);for(var i=arguments.length,s=new Array(i),o=0;o<i;o++)s[o]=arguments[o];return(t=e.call.apply(e,[this].concat(s))).close=function(){var e,n;null===(e=(n=t.props).onClose)||void 0===e||e.call(n)},t.catchEsc=function(e){"Escape"===e.key&&t.close()},t}return Object(l.a)(n,[{key:"render",value:function(){return Object(O.jsx)("div",{className:"wrapper",onClick:this.close,onKeyUp:this.catchEsc,children:this.props.children})}}]),n}(s.a.Component)),A=function(t){Object(u.a)(n,t);var e=Object(c.a)(n);function n(){var t;Object(a.a)(this,n);for(var i=arguments.length,s=new Array(i),o=0;o<i;o++)s[o]=arguments[o];return(t=e.call.apply(e,[this].concat(s))).settings=new L,t.state={showSettings:!1,timer:0,minesLeft:t.settings.mines,state:b.Pending},t.swipe=(new N).on({left:function(e){return t.toggleSettings(e,!1)},right:function(e){return t.toggleSettings(e,!0)}}),t.closeSettings=function(){t.setState({showSettings:!1})},t.toggleSettings=function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:!t.state.showSettings;"keyup"===e.type&&"Escape"!==e.key||t.setState({showSettings:n})},t.updateInfo=function(e){t.setState(e)},t}return Object(l.a)(n,[{key:"componentDidMount",value:function(){document.body.addEventListener("keyup",this.toggleSettings),this.swipe.attach()}},{key:"componentWillUnmount",value:function(){document.body.removeEventListener("keyup",this.toggleSettings),this.swipe.detach()}},{key:"render",value:function(){return Object(O.jsxs)("div",{className:"App",children:[Object(O.jsx)(S,{columns:this.settings.columns,rows:this.settings.rows,mines:this.settings.mines,updateInfo:this.updateInfo}),this.state.showSettings&&Object(O.jsx)(P,{onClose:this.closeSettings,children:Object(O.jsx)(F,{settings:this.settings,info:this.state})})]})}}]),n}(s.a.Component),T=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,34)).then((function(e){var n=e.getCLS,i=e.getFID,s=e.getFCP,o=e.getLCP,r=e.getTTFB;n(t),i(t),s(t),o(t),r(t)}))};r.a.render(Object(O.jsx)(s.a.StrictMode,{children:Object(O.jsx)(A,{})}),document.getElementById("root")),T()}},[[33,1,2]]]);
//# sourceMappingURL=main.15c9cc1e.chunk.js.map