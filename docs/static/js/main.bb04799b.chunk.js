(this.webpackJsonpminesweeper=this.webpackJsonpminesweeper||[]).push([[0],{25:function(t,e,n){},26:function(t,e,n){},27:function(t,e,n){},28:function(t,e,n){},30:function(t,e,n){},31:function(t,e,n){},32:function(t,e,n){"use strict";n.r(e);var i=n(3),s=n.n(i),o=n(19),r=n.n(o),a=(n(25),n(1)),l=n(2),u=n(4),c=n(5),h=(n(26),n(18)),d=(n(27),n(13)),f=(n(28),n(6));function p(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return e.flatMap((function(t){return String(t)===t||t instanceof Array?t:Object.entries(t).filter((function(t){var e=Object(f.a)(t,2);e[0];return e[1]})).map((function(t){var e=Object(f.a)(t,2),n=e[0];e[1];return n}))})).join(" ")}function v(t,e){if(null==e){var n=[0,t];t=n[0],e=n[1]}return t=Math.ceil(t),e=Math.floor(e),Math.floor(Math.random()*(e-t))+t}var g,m=n(15);!function(t){t[t.Open=1]="Open",t[t.Mark=2]="Mark",t[t.Lookup=3]="Lookup",t[t.Suggest=4]="Suggest"}(g||(g={}));var b,j=function(){function t(e){var n=this;Object(a.a)(this,t),this.timerId=0,this.values=[],this.value=0,this.duration=64,this.phase=null,this.target=null,this.boardState=void 0,this.logging=!1,this.resultsValues={contextmenu:g.Mark,dblclick:g.Lookup,click:g.Open},this.buttonsMapping={0:1,1:4,2:2,3:8,4:16},this.goDown=function(t){n.log("down",t),null===n.phase&&(n.target=n.boardState.elements.get(t.target)),n.phase=!1,n.values.push(n.buttonsMapping[t.button]),n.startTimer((function(){n.value=n.values[0],n.values.length>1&&(n.value=n.values.reduce((function(t,e){return t|e}))),n.log("pre flush"),n.reset(!0),n.flush()}))},this.goUp=function(t){n.log("up",t),n.phase=!0,n.startTimer(n.flush)},this.catchResult=function(t){n.log("catch",t),n.target||(n.target=n.boardState.elements.get(t.target)),n.value||(n.value=n.resultsValues[t.type]),n.phase=!0,n.flush(),n.reset(),t.stopPropagation(),t.preventDefault()},this.startTimer=function(t){n.timerId||(n.timerId=window.setTimeout(t,n.duration))},this.reset=function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];n.values=[],n.timerId&&clearTimeout(n.timerId),n.timerId=0,t||(n.value=0,n.phase=null,n.target=null)},this.flush=function(){var t,e;(n.log("flush"),null===(t=n.target)||void 0===t||t.onPress(!!n.phase,n.value),n.phase)&&(null===(e=n.target)||void 0===e||e.onClick(n.value),n.reset())},this.log=function(t,e){if(n.logging){if(!1===e)return console.log(t);var i=null!==e&&void 0!==e?e:{},s=i.button,o=i.buttons,r=i.type,l=n.value,u=n.phase,c={1:"Open",2:"Mark",3:"Lookup",4:"Suggest"}[l];console.log(t,{value:l,valueStr:c,phase:u,values:Object(m.a)(n.values)},e?{button:s,buttons:o,type:r,event:e}:new function t(){Object(a.a)(this,t)})}},this.boardState=e}return Object(l.a)(t,[{key:"listeners",get:function(){return{onMouseDownCapture:this.goDown,onMouseUpCapture:this.goUp,onContextMenuCapture:this.catchResult,onDoubleClickCapture:this.catchResult}}}]),t}(),O=n(0),k=function(t){Object(u.a)(n,t);var e=Object(c.a)(n);function n(t){var i;return Object(a.a)(this,n),(i=e.call(this,t)).state={content:"",isSuggested:!1,count:0},i.enabled=!0,i.settings=void 0,i.element=void 0,i.open=function(){var t,e,n=arguments.length>0&&void 0!==arguments[0]&&arguments[0];n&&(null===(t=(e=i.props).move)||void 0===t||t.call(e,i.settings)),i.settings.isOpen=!0,i.setState({content:i.settings.isMine?"\ud83d\udca3":(i.settings.value||"").toString(),isSuggested:!1})},i.mark=function(t){var e,n,s,o;if(!i.settings.isOpen){i.settings.isMarked=null!==t&&void 0!==t?t:!i.settings.isMarked;var r=null!==(e=null===(n=i.settings.board)||void 0===n?void 0:n.minesCount)&&void 0!==e?e:0;null===(s=(o=i.props).mark)||void 0===s||s.call(o,r),i.setState({count:r,isSuggested:!1,content:i.settings.isMarked?"\ud83d\udea9":""}),null==t&&setTimeout(i.resetAnimation,0)}},i.lookup=function(){var t,e;if(i.settings.isOpen&&i.settings.value){var n=null===(t=i.settings.board)||void 0===t?void 0:t.getAround(i.settings),s=null!==(e=null===n||void 0===n?void 0:n.reduce((function(t,e){return t+Number(e.isMarked)}),0))&&void 0!==e?e:0;i.props.lookup&&i.settings.value===s&&i.props.lookup(i.settings)}},i.suggest=function(){i.settings.isOpen||i.settings.isMarked||i.setState({isSuggested:!i.state.isSuggested})},i.onClick=function(t){if(i.enabled)switch(t){case g.Open:i.settings.isMarked||i.open(!0);break;case g.Mark:i.mark();break;case g.Lookup:i.lookup();break;case g.Suggest:i.suggest()}},i.disable=function(){i.enabled=!1},i.resetAnimation=function(){var t,e,n;null===(t=i.element.current)||void 0===t||t.classList.remove("animate"),null===(e=i.element.current)||void 0===e||e.offsetWidth,null===(n=i.element.current)||void 0===n||n.classList.add("animate")},i.onPress=function(t,e){var n;e===g.Lookup&&(null===(n=i.settings.board)||void 0===n||n.getAround(i.settings).filter((function(t){return!t.isOpen&&!t.isMarked})).forEach((function(e){var n,i;null===(n=e.component)||void 0===n||null===(i=n.element.current)||void 0===i||i.classList.toggle("pressed",!t)})))},i.settings=t.field,i.settings.component=Object(d.a)(i),i.element=s.a.createRef(),i}return Object(l.a)(n,[{key:"render",value:function(){var t={"--count":this.state.count,"--direction":this.settings.y<2?1:-1};return Object(O.jsx)("div",{className:p("field","around".concat(this.settings.isMine?0:this.settings.value),{open:this.settings.isOpen,marked:this.settings.isMarked,suggested:this.state.isSuggested}),style:t,ref:this.element,children:this.state.content})}},{key:"componentDidMount",value:function(){var t;null===(t=this.settings.board)||void 0===t||t.elements.set(this.element.current,this)}}]),n}(s.a.Component);!function(t){t.Pending="Pending",t.InProgress="In Progress",t.Win="You Win! \ud83d\ude0e",t.Loose="You Loose \ud83d\ude41"}(b||(b={}));var w=function t(e){Object(a.a)(this,t),this.value=0,this.x=0,this.y=0,this.isOpen=!1,this.isMine=!1,this.isMarked=!1,this.component=void 0,this.board=void 0,Object.assign(this,e)},y=function(){function t(){var e=this;Object(a.a)(this,t),this.fields=[],this.board=[],this.minesFields=[],this.elements=new Map,this.columns=8,this.rows=8,this.mines=8,this.getAround=function(t){var n=t.x,i=t.y;return[[n-1,i-1],[n,i-1],[n+1,i-1],[n-1,i],[n+1,i],[n-1,i+1],[n,i+1],[n+1,i+1]].filter((function(t){var n=Object(f.a)(t,2),i=n[0],s=n[1];return i>=0&&i<e.columns&&s>=0&&s<e.rows})).map((function(t){var n=Object(f.a)(t,2),i=n[0],s=n[1];return e.board[i][s]}))},this.lookup=function(t){var n=[];return function t(i){var s=e.getAround(i).filter((function(t){return!n.includes(t)&&!t.isMarked}));n.push.apply(n,Object(m.a)(s)),s.filter((function(t){return!t.value})).forEach(t)}(t),n}}return Object(l.a)(t,[{key:"createBoard",value:function(t){Object.assign(this,t),this.fields=[],this.minesFields=[],this.board=[];for(var e=0;e<this.columns;e++)this.board[e]=[];for(var n=0;n<this.rows;n++)for(var i=0;i<this.columns;i++)this.board[i][n]=new w({x:i,y:n,value:0,board:this}),this.fields.push(this.board[i][n])}},{key:"fillBoard",value:function(t){for(var e=this,n=this.mines;n;){var i=v(this.columns),s=v(this.rows);this.board[i][s].isMine||i===t.x||s===t.y||(this.minesFields.push(this.board[i][s]),this.board[i][s].isMine=!0,n--)}this.minesFields.forEach((function(t){e.getAround(t).forEach((function(t){return t.value++}))}))}},{key:"minesCount",get:function(){return this.mines-this.fields.filter((function(t){return t.isMarked})).length}},{key:"help",value:function(){var t=this,e=this.fields.filter((function(t){return!t.isMine&&!t.isOpen&&!t.isMarked})),n=this.minesFields.filter((function(t){return!t.isMarked})),i=n.filter((function(e){return t.getAround(e).filter((function(t){return t.isOpen})).length}));i.length||(i=n);var s=i[v(i.length)],o=e[v(e.length)];s.isMine=!1,o.isMine=!0,this.getAround(s).forEach((function(t){var e;t.value--,t.isOpen&&(null===(e=t.component)||void 0===e||e.setState({content:t.value||""}))})),this.getAround(o).forEach((function(t){var e;t.value++,t.isOpen&&(null===(e=t.component)||void 0===e||e.setState({content:t.value||""}))}));var r=this.minesFields.findIndex((function(t){return t===s}));this.minesFields.splice(r,1,o),this.getAround(s).filter((function(t){return!t.value&&t.isOpen})).forEach((function(t){var e;null===(e=t.component)||void 0===e||e.open(!0)}))}},{key:"checkWin",value:function(t){return!this.fields.find((function(e){return!e.isMine&&!e.isOpen&&t!==e}))&&(this.minesFields.forEach((function(t){var e;return null===(e=t.component)||void 0===e?void 0:e.mark(!0)})),!0)}}]),t}(),M=function(t){Object(u.a)(n,t);var e=Object(c.a)(n);function n(t){var i,s,o;return Object(a.a)(this,n),(o=e.call(this,t)).click=void 0,o.timer=0,o.timerId=0,o.state={won:null},o.tick=function(){var t,e;o.timer++,null===(t=(e=o.props).updateInfo)||void 0===t||t.call(e,{timer:o.timer})},o.mark=function(t){var e,n;null===(e=(n=o.props).updateInfo)||void 0===e||e.call(n,{minesLeft:t})},o.move=function(t){var e,n;o.timer||(o.props.board.fillBoard(t),o.timer=1,o.timerId=window.setInterval(o.tick,1e3),null===(e=(n=o.props).updateInfo)||void 0===e||e.call(n,{state:b.InProgress}));if(t.isMine)return o.gameOver();o.checkWin(t)||t.value||o.lookup(t)},o.lookup=function(t){if(!t.isMarked){var e=o.props.board.lookup(t);return e.forEach((function(t){var e;return!t.isOpen&&(null===(e=t.component)||void 0===e?void 0:e.open())})),e.find((function(t){return t.isMine}))?o.gameOver():o.checkWin(),e}},o.props.board.createBoard(o.props),o.click=new j(o.props.board),null===(i=(s=o.props).updateInfo)||void 0===i||i.call(s,{state:b.Pending,minesLeft:o.props.mines}),window.board=o.props.board,o}return Object(l.a)(n,[{key:"render",value:function(){var t=this,e={"--columns":this.props.columns,"--rows":this.props.rows,"--count":this.props.board.minesCount};return Object(O.jsx)("div",Object(h.a)(Object(h.a)({},this.click.listeners),{},{className:p("board",{win:!0===this.state.won,loose:!1===this.state.won}),style:e,children:this.props.board.fields.map((function(e){return Object(O.jsx)(k,{field:e,move:t.move,lookup:t.lookup,mark:t.mark},"".concat(e.x,".").concat(e.y))}))}))}},{key:"checkWin",value:function(t){var e,n;if(this.props.board.checkWin(t))return console.log("Win!",this.timer,"seconds"),null===(e=(n=this.props).updateInfo)||void 0===e||e.call(n,{state:b.Win}),this.stop(),this.setState({won:!0}),!0}},{key:"stop",value:function(){clearInterval(this.timerId),this.props.board.fields.forEach((function(t){var e;return null===(e=t.component)||void 0===e?void 0:e.disable()}))}},{key:"gameOver",value:function(){var t,e;this.setState({won:!1}),null===(t=(e=this.props).updateInfo)||void 0===t||t.call(e,{state:b.Loose}),console.log("game over"),this.props.board.minesFields.forEach((function(t){var e;return null===(e=t.component)||void 0===e?void 0:e.open()})),this.stop()}}]),n}(s.a.Component),S=n(20),x={beginner:{columns:9,rows:9,mines:10},default:{columns:12,rows:8,mines:12},intermediate:{columns:16,rows:16,mines:40},expert:{columns:30,rows:16,mines:99}},C={beginner:{min:10,mines:.12},default:{min:12,mines:.125},intermediate:{min:16,mines:.15},expert:{min:20,mines:.2}},I={beginer:"beginner",small:"beginner",easy:"beginner",min:"beginner",medium:"intermediate",middle:"intermediate",big:"expert",max:"expert",herd:"expert"},E=function(){function t(){Object(a.a)(this,t),this.columns=void 0,this.rows=void 0,this.mines=void 0;var e=t.getInitialSettings(),n=window.screen.orientation?"land"===window.screen.orientation.type.substr(0,4):window.innerWidth>window.innerHeight;if(window.innerWidth<800&&n&&e.columns<e.rows){var i=[e.rows,e.columns];e.columns=i[0],e.rows=i[1]}Object.assign(this,e),window.settings=this}return Object(l.a)(t,[{key:"getPossibleSettings",value:function(){for(var t=window.innerWidth,e=window.innerHeight,n=[],i=Object.keys(C),s=function(s){for(var o=function(o){if(n.find((function(t){return t.columns===s||t.rows===o})))return"continue";var r=Math.min(e/o,t/s);if(t-s*r<10&&e-o*r<10){var a=s*o,l={columns:s,rows:o,mines:{}};i.forEach((function(t){return l.mines[t]=Math.floor(C[t].mines*a)})),n.push(l)}},r=100;r>=2;r--)o(r)},o=100;o>=2;o--)s(o);return n.reverse()}}],[{key:"getInitialSettings",value:function(){var t=window.location.hash.replace("#","").toLowerCase();if(!t)return x.default;if(t in I&&(t=I[t]),t in x)return x[t];if(/^fill:?(\w+)?$/.test(t)){var e=C[RegExp.$1]||C[I[RegExp.$1]]||C.default,n=window,i=n.innerWidth,s=n.innerHeight,o=Math.max(i,s),r=Math.min(i,s),a=Math.floor(r/e.min),l=Math.floor(o/a),u=Math.floor(e.min*l*e.mines);return i>s?{mines:u,columns:l,rows:e.min}:{mines:u,columns:e.min,rows:l}}if(/^custom:/.test(t)){var c,h=null===(c=t.match(Object(S.a)(/^custom:([0-9]+)[\0-\/:-\uFFFF]([0-9]+)[\0-\/:-\uFFFF]([0-9]+)/,{columns:1,rows:2,mines:3})))||void 0===c?void 0:c.groups,d={};for(var f in h)d[f]=+h[f];return d}return x.default}}]),t}(),L=n(7),F=(n(30),function(t){Object(u.a)(n,t);var e=Object(c.a)(n);function n(t){var i,s;Object(a.a)(this,n),(s=e.call(this,t)).joiner="x",s.possible=[],s.state=void 0,s.changeCustom=function(t){s.setState(Object(L.a)({},t.target.name,t.target.value))},s.changeSettings=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"fill:default";if(!t&&s.state.board&&s.state.mines){var e=s.getVariantByBoard(s.state.board);t="custom:"+[null===e||void 0===e?void 0:e.columns,null===e||void 0===e?void 0:e.rows,null===e||void 0===e?void 0:e.mines[s.state.mines]].join(s.joiner)}window.history.pushState({},"Minesweeper","#"+t),window.location.reload()},s.getHelp=function(){s.props.board.help(),s.props.board.checkWin(),s.props.onClose()},s.possible=s.props.settings.getPossibleSettings();var o=[s.props.settings.columns,s.props.settings.rows].join(s.joiner);s.getVariantByBoard(o)||(o=null);var r=(i={},Object(L.a)(i,s.getMinesCount("beginner",o),"beginner"),Object(L.a)(i,s.getMinesCount("intermediate",o),"intermediate"),Object(L.a)(i,s.getMinesCount("expert",o),"expert"),i)[s.props.settings.mines];return s.state={board:o,mines:r},s}return Object(l.a)(n,[{key:"render",value:function(){var t,e,n,i,s,o,r,a=this;return Object(O.jsxs)("div",{className:"settings-selector",onClick:function(t){return t.stopPropagation()},children:[this.props.info.state!==b.Pending&&Object(O.jsxs)("div",{children:[Object(O.jsxs)("h3",{children:["Game State: ",(null===(t=this.props.info)||void 0===t?void 0:t.state)!==b.InProgress?null===(e=this.props.info)||void 0===e?void 0:e.state:""]}),Object(O.jsxs)("h4",{className:"sub",children:["Seconds from start: ",null!==(n=null===(i=this.props.info)||void 0===i?void 0:i.timer)&&void 0!==n?n:"--"]}),(null===(s=this.props.info)||void 0===s?void 0:s.state)===b.InProgress&&Object(O.jsxs)("h4",{className:"sub",children:["Mines left: ",null===(o=this.props.info)||void 0===o?void 0:o.minesLeft]}),(null===(r=this.props.info)||void 0===r?void 0:r.state)===b.InProgress&&Object(O.jsx)("button",{className:"button small",onClick:this.getHelp,children:"Get Help"})]}),Object(O.jsx)("h3",{children:"Standard difficulty levels:"}),Object(O.jsx)("p",{className:"link",onClick:function(){return a.changeSettings("fill")},children:"Default"}),Object(O.jsx)("p",{className:"link",onClick:function(){return a.changeSettings("fill:beginner")},children:"Beginner"}),Object(O.jsx)("p",{className:"link",onClick:function(){return a.changeSettings("fill:intermediate")},children:"Intermediate"}),Object(O.jsx)("p",{className:"link",onClick:function(){return a.changeSettings("fill:expert")},children:"Expert"}),Object(O.jsx)("h3",{children:"Custom board:"}),Object(O.jsxs)("label",{children:[Object(O.jsx)("h4",{children:"Board size:"}),Object(O.jsxs)("select",{onChange:this.changeCustom,name:"board",defaultValue:this.state.board,children:[!this.state.board&&Object(O.jsx)("option",{className:"default",children:"-- Select Board --"}),this.possible.map((function(t){var e=[t.columns,t.rows].join(a.joiner);return Object(O.jsx)("option",{value:e,children:e},e)}))]})]}),Object(O.jsxs)("label",{children:[Object(O.jsx)("h4",{children:"Mines count:"}),Object(O.jsxs)("select",{onChange:this.changeCustom,name:"mines",defaultValue:this.state.mines,children:[!this.state.mines&&Object(O.jsx)("option",{className:"default",children:"-- Select Mines --"}),Object(O.jsxs)("option",{value:"beginner",children:["Beginner ",this.state.board&&"(".concat(this.getMinesCount("beginner"),")")]}),Object(O.jsxs)("option",{value:"intermediate",children:["Intermediate ",this.state.board&&"(".concat(this.getMinesCount("intermediate"),")")]}),Object(O.jsxs)("option",{value:"expert",children:["Expert ",this.state.board&&"(".concat(this.getMinesCount("expert"),")")]})]})]}),Object(O.jsx)("button",{className:"button",onClick:function(){return a.changeSettings("")},disabled:!this.state.board||!this.state.mines,children:"Apply Custom"})]})}},{key:"getMinesCount",value:function(t){var e,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.state.board;if(!n)return"--";var i=this.getVariantByBoard(n);return null!==(e=null===i||void 0===i?void 0:i.mines[t].toString())&&void 0!==e?e:"--"}},{key:"getVariantByBoard",value:function(t){var e,n=t.split(this.joiner).map((function(t){return Number(t)})),i=Object(f.a)(n,2),s=i[0],o=i[1];return null!==(e=this.possible.find((function(t){return t.columns===s&&t.rows===o})))&&void 0!==e?e:null}}]),n}(s.a.Component)),P=function(){function t(){var e,n=this,i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:document.body,s=arguments.length>1&&void 0!==arguments[1]&&arguments[1];Object(a.a)(this,t),this.startX=null,this.startY=null,this.element=null,this.handlers={},this.threshold=Math.min(window.innerWidth,window.innerHeight)/5,this.handleTouchStart=function(t){var e=t.touches[0],i=e.clientX,s=e.clientY;Object.assign(n,{startX:i,startY:s})},this.handleTouchEnd=function(t){var e,i;if(null!=n.startX&&null!=n.startY){var s=t.changedTouches[0],o=s.clientX,r=s.clientY,a=n.startX-o;Math.abs(a)<n.threshold&&(a=0);var l=n.startY-r;Math.abs(l)<n.threshold&&(l=0);var u=Math.abs(a)>Math.abs(l)?a>0?"left":"right":l>0?"up":"down";return n.startX=null,n.startY=null,null===(e=(i=n.handlers)[u])||void 0===e?void 0:e.call(i,t)}},this.element="string"===typeof i?null!==(e=document.querySelector(i))&&void 0!==e?e:null:i,s&&this.attach()}return Object(l.a)(t,[{key:"attach",value:function(){this.element&&(this.element.addEventListener("touchstart",this.handleTouchStart,!1),this.element.addEventListener("touchend",this.handleTouchEnd,!1))}},{key:"detach",value:function(){this.element&&(this.element.removeEventListener("touchstart",this.handleTouchStart,!1),this.element.removeEventListener("touchend",this.handleTouchEnd,!1))}},{key:"on",value:function(t,e){return t&&e?this.handlers[t]=e:Object.assign(this.handlers,t),this}}]),t}(),B=(n(31),function(t){Object(u.a)(n,t);var e=Object(c.a)(n);function n(){var t;Object(a.a)(this,n);for(var i=arguments.length,s=new Array(i),o=0;o<i;o++)s[o]=arguments[o];return(t=e.call.apply(e,[this].concat(s))).close=function(){var e,n;null===(e=(n=t.props).onClose)||void 0===e||e.call(n)},t.catchEsc=function(e){"Escape"===e.key&&t.close()},t}return Object(l.a)(n,[{key:"render",value:function(){return Object(O.jsx)("div",{className:"wrapper",onClick:this.close,onKeyUp:this.catchEsc,children:this.props.children})}}]),n}(s.a.Component)),A=function(t){Object(u.a)(n,t);var e=Object(c.a)(n);function n(){var t;Object(a.a)(this,n);for(var i=arguments.length,s=new Array(i),o=0;o<i;o++)s[o]=arguments[o];return(t=e.call.apply(e,[this].concat(s))).board=new y,t.settings=new E,t.state={showSettings:!1,timer:0,minesLeft:t.settings.mines,state:b.Pending},t.swipe=(new P).on({left:function(e){return t.toggleSettings(e,!1)},right:function(e){return t.toggleSettings(e,!0)}}),t.closeSettings=function(){t.setState({showSettings:!1})},t.toggleSettings=function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:!t.state.showSettings;"keyup"!==e.type||"h"!==e.key||t.state.state!==b.InProgress?"keyup"===e.type&&"Escape"!==e.key||t.setState({showSettings:n}):t.board.help()},t.updateInfo=function(e){t.setState(e)},t}return Object(l.a)(n,[{key:"componentDidMount",value:function(){document.body.addEventListener("keyup",this.toggleSettings),this.swipe.attach()}},{key:"componentWillUnmount",value:function(){document.body.removeEventListener("keyup",this.toggleSettings),this.swipe.detach()}},{key:"render",value:function(){return Object(O.jsxs)("div",{className:"App",children:[Object(O.jsx)(M,{board:this.board,columns:this.settings.columns,rows:this.settings.rows,mines:this.settings.mines,updateInfo:this.updateInfo}),this.state.showSettings&&Object(O.jsx)(B,{onClose:this.closeSettings,children:Object(O.jsx)(F,{settings:this.settings,info:this.state,board:this.board,onClose:this.closeSettings})})]})}}]),n}(s.a.Component),N=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,33)).then((function(e){var n=e.getCLS,i=e.getFID,s=e.getFCP,o=e.getLCP,r=e.getTTFB;n(t),i(t),s(t),o(t),r(t)}))};r.a.render(Object(O.jsx)(s.a.StrictMode,{children:Object(O.jsx)(A,{})}),document.getElementById("root")),N()}},[[32,1,2]]]);
//# sourceMappingURL=main.bb04799b.chunk.js.map