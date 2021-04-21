(this.webpackJsonpminesweeper=this.webpackJsonpminesweeper||[]).push([[0],{21:function(t,e,i){},22:function(t,e,i){},23:function(t,e,i){},24:function(t,e,i){},26:function(t,e,i){"use strict";i.r(e);var n=i(1),r=i.n(n),o=i(15),s=i.n(o),a=(i(21),i(22),i(2)),c=i(3),u=i(4),h=i(6),d=(i(23),i(11)),l=(i(24),i(13)),f=i(7);function v(){for(var t=arguments.length,e=new Array(t),i=0;i<t;i++)e[i]=arguments[i];return e.flatMap((function(t){return String(t)===t||t instanceof Array?t:Object.entries(t).filter((function(t){var e=Object(f.a)(t,2);e[0];return e[1]})).map((function(t){var e=Object(f.a)(t,2),i=e[0];e[1];return i}))})).join(" ")}var p=function t(e){var i=this;Object(a.a)(this,t),this.timerId=0,this.values=[],this.duration=80,this.cb=void 0,this.next=function(t){i.timerId&&clearTimeout(i.timerId),i.timerId=window.setTimeout(i.flush,i.duration),i.values.push(t.buttons)},this.flush=function(){i.cb&&i.cb(Math.max.apply(Math,Object(l.a)(i.values))),i.values=[],i.timerId=0},this.cb=e};function b(t,e){if(null==e){var i=[0,t];t=i[0],e=i[1]}return t=Math.ceil(t),e=Math.floor(e),Math.floor(Math.random()*(e-t))+t}var m=i(0),g=function(t){Object(u.a)(i,t);var e=Object(h.a)(i);function i(t){var n;return Object(a.a)(this,i),(n=e.call(this,t)).state={content:"",enabled:!0},n.click=void 0,n.settings=void 0,n.open=function(){n.settings.isOpen=!0,n.setState({content:n.settings.isMine?"\ud83d\udca3":(n.settings.value||"").toString()})},n.mark=function(t){n.settings.isOpen||(n.settings.isMarked=null!==t&&void 0!==t?t:!n.settings.isMarked,n.setState({content:n.settings.isMarked?"\ud83d\udea9":""}))},n.lookup=function(){var t,e;if(n.settings.isOpen&&n.settings.value){var i=null===(t=n.settings.board)||void 0===t?void 0:t.getAround(n.settings),r=null!==(e=null===i||void 0===i?void 0:i.reduce((function(t,e){return t+Number(e.isMarked)}),0))&&void 0!==e?e:0;n.props.lookup&&n.settings.value===r&&n.props.lookup(n.settings)}},n.onClick=function(t){if(n.state.enabled)switch(t){case 1:n.settings.isMarked||(n.props.move&&n.props.move(n.settings),n.open());break;case 2:n.mark();break;case 3:n.lookup()}},n.disable=function(){n.setState({enabled:!1})},n.click=new p(n.onClick),n.settings=t.field,n.settings.component=Object(d.a)(n),n}return Object(c.a)(i,[{key:"render",value:function(){return Object(m.jsx)("div",{className:v("field",{open:this.settings.isOpen},"around".concat(this.settings.value)),onContextMenuCapture:this.mouseCapture,onMouseDown:this.click.next,children:this.state.content})}},{key:"mouseCapture",value:function(t){t.preventDefault(),t.nativeEvent.preventDefault()}}]),i}(r.a.Component),k=i(16),w=function t(e){Object(a.a)(this,t),this.value=0,this.x=0,this.y=0,this.isOpen=!1,this.isMine=!1,this.isMarked=!1,this.component=void 0,this.board=void 0,Object.assign(this,e)},O={Beginner:{width:9,height:9,mines:10},Intermediate:{width:16,height:16,mines:40},Expert:{width:30,height:16,mines:99}},j=function(t){Object(u.a)(i,t);var e=Object(h.a)(i);function i(){var t;Object(a.a)(this,i);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(t=e.call.apply(e,[this].concat(r))).fields=[],t.board=[],t.minesFields=[],t.width=8,t.height=8,t.mines=8,t.getAround=function(e){var i=e.x,n=e.y;return[[i-1,n-1],[i,n-1],[i+1,n-1],[i-1,n],[i+1,n],[i-1,n+1],[i,n+1],[i+1,n+1]].filter((function(e){var i=Object(f.a)(e,2),n=i[0],r=i[1];return n>=0&&n<t.width&&r>=0&&r<t.height})).map((function(e){var i=Object(f.a)(e,2),n=i[0],r=i[1];return t.board[n][r]}))},t.lookup=function(e){var i=[];return function e(n){var r=t.getAround(n).filter((function(t){return!i.includes(t)&&!t.isMarked}));i.push.apply(i,Object(l.a)(r)),r.filter((function(t){return!t.value})).forEach(e)}(e),i},t}return Object(c.a)(i,[{key:"createBoard",value:function(t){Object.assign(this,t),console.log("BoardState.createBoard"),this.fields=[],this.minesFields=[],this.board=[];for(var e=0;e<this.width;e++)this.board[e]=[];for(var i=0;i<this.height;i++)for(var n=0;n<this.width;n++)this.board[n][i]=new w({x:n,y:i,value:0,board:this}),this.fields.push(this.board[n][i])}},{key:"fillBoard",value:function(t){for(var e=this,i=this.mines;i;){var n=b(this.width),r=b(this.height);this.board[n][r].isMine||n===t.x||r===t.y||(this.minesFields.push(this.board[n][r]),this.board[n][r].isMine=!0,i--)}this.minesFields.forEach((function(t){e.getAround(t).forEach((function(t){return t.value++}))}))}},{key:"minesCount",get:function(){return this.mines-this.fields.filter((function(t){return t.isMarked})).length}}]),i}(Object(k.a)(Array)),M=function(t){Object(u.a)(i,t);var e=Object(h.a)(i);function i(t){var n;return Object(a.a)(this,i),(n=e.call(this,t)).board=new j,n.timer=0,n.timerId=0,n.state={won:null},n.tick=function(){n.timer++},n.move=function(t){if(n.timer||(n.board.fillBoard(t),n.timer=1,n.timerId=window.setInterval(n.tick,1e3)),t.isMine)return n.gameOver();n.checkWin(t)||t.value||n.lookup(t)},n.lookup=function(t){if(!t.isMarked){var e=n.board.lookup(t);return e.forEach((function(t){var e;return null===(e=t.component)||void 0===e?void 0:e.open()})),e.find((function(t){return t.isMine}))?n.gameOver():n.checkWin(),e}},n.board.createBoard(n.props),window.board=n.board,n}return Object(c.a)(i,[{key:"render",value:function(){var t=this;console.log("Board.render",this.board);var e={"--columns":this.props.width,"--rows":this.props.height};return Object(m.jsx)("div",{className:v("board",{win:!0===this.state.won,loose:!1===this.state.won}),style:e,children:this.board.fields.map((function(e){return Object(m.jsx)(g,{field:e,move:t.move,lookup:t.lookup},"".concat(e.x,".").concat(e.y))}))})}},{key:"checkWin",value:function(t){if(!this.board.fields.find((function(e){return!e.isMine&&!e.isOpen&&t!==e})))return console.log("Win!"),this.stop(),this.setState({won:!0}),this.board.minesFields.forEach((function(t){var e;return null===(e=t.component)||void 0===e?void 0:e.mark(!0)})),!0}},{key:"stop",value:function(){clearInterval(this.timerId),this.board.fields.forEach((function(t){var e;return null===(e=t.component)||void 0===e?void 0:e.disable()}))}},{key:"gameOver",value:function(){this.setState({won:!1}),console.log("game over"),this.board.minesFields.forEach((function(t){var e;return null===(e=t.component)||void 0===e?void 0:e.open()})),this.stop()}}]),i}(r.a.Component),y={width:12,height:8,mines:12};var x=function(){var t=O[window.location.hash.replace(/^#/,"")]||y;if(window.innerWidth<768&&t.width>t.height){var e=[t.height,t.width];t.width=e[0],t.height=e[1]}return Object(m.jsx)("div",{className:"App",children:Object(m.jsx)(M,{width:t.width,height:t.height,mines:t.mines})})},I=function(t){t&&t instanceof Function&&i.e(3).then(i.bind(null,27)).then((function(e){var i=e.getCLS,n=e.getFID,r=e.getFCP,o=e.getLCP,s=e.getTTFB;i(t),n(t),r(t),o(t),s(t)}))};s.a.render(Object(m.jsx)(r.a.StrictMode,{children:Object(m.jsx)(x,{})}),document.getElementById("root")),I()}},[[26,1,2]]]);
//# sourceMappingURL=main.fae653a0.chunk.js.map