webpackJsonp([60],{3101:function(e,t,n){"use strict";n(15),n(3102)},3102:function(e,t,n){var r=n(3103);"string"===typeof r&&(r=[[e.i,r,""]]);var o={hmr:!0};o.transform=void 0;n(737)(r,o);r.locals&&(e.exports=r.locals)},3103:function(e,t,n){t=e.exports=n(736)(!1),t.push([e.i,"/* stylelint-disable at-rule-empty-line-before,at-rule-name-space-after,at-rule-no-unknown */\n/* stylelint-disable no-duplicate-selectors */\n/* stylelint-disable */\n/* stylelint-disable declaration-bang-space-before,no-duplicate-selectors,string-no-newline */\n.ant-affix {\n  position: fixed;\n  z-index: 10;\n}\n",""])},3104:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(){if("function"!==typeof WeakMap)return null;var e=new WeakMap;return o=function(){return e},e}function i(){return i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},i.apply(this,arguments)}function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function f(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function u(e,t,n){return t&&l(e.prototype,t),n&&l(e,n),e}function c(e,t){return!t||"object"!==y(t)&&"function"!==typeof t?s(e):t}function s(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function p(e){return(p=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function d(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&h(e,t)}function h(e,t){return(h=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function y(e){return(y="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function m(){return"undefined"!==typeof window?window:null}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var v,b=function(e){if(e&&e.__esModule)return e;var t=o();if(t&&t.has(e))return t.get(e);var n={};if(null!=e){var r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var i in e)if(Object.prototype.hasOwnProperty.call(e,i)){var a=r?Object.getOwnPropertyDescriptor(e,i):null;a&&(a.get||a.set)?Object.defineProperty(n,i,a):n[i]=e[i]}}return n.default=e,t&&t.set(e,n),n}(n(0)),g=n(16),O=r(n(2)),w=r(n(35)),x=n(8),E=n(3105),P=r(n(317)),T=r(n(32)),j=n(3106),_=function(e,t,n,r){var o,i=arguments.length,a=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"===("undefined"===typeof Reflect?"undefined":y(Reflect))&&"function"===typeof Reflect.decorate)a=Reflect.decorate(e,t,n,r);else for(var f=e.length-1;f>=0;f--)(o=e[f])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a};!function(e){e[e.None=0]="None",e[e.Prepare=1]="Prepare"}(v||(v={}));var S=function(e){function t(){var e;return f(this,t),e=c(this,p(t).apply(this,arguments)),e.state={status:v.None,lastAffix:!1,prevTarget:null},e.getOffsetTop=function(){var t=e.props,n=t.offset,r=t.offsetBottom,o=e.props.offsetTop;return"undefined"===typeof o&&(o=n,(0,T.default)("undefined"===typeof n,"Affix","`offset` is deprecated. Please use `offsetTop` instead.")),void 0===r&&void 0===o&&(o=0),o},e.getOffsetBottom=function(){return e.props.offsetBottom},e.savePlaceholderNode=function(t){e.placeholderNode=t},e.saveFixedNode=function(t){e.fixedNode=t},e.measure=function(){var t=e.state,n=t.status,r=t.lastAffix,o=e.props,i=o.target,a=o.onChange;if(n===v.Prepare&&e.fixedNode&&e.placeholderNode&&i){var f=e.getOffsetTop(),l=e.getOffsetBottom(),u=i();if(u){var c={status:v.None},s=(0,j.getTargetRect)(u),p=(0,j.getTargetRect)(e.placeholderNode),d=(0,j.getFixedTop)(p,s,f),h=(0,j.getFixedBottom)(p,s,l);void 0!==d?(c.affixStyle={position:"fixed",top:d,width:p.width,height:p.height},c.placeholderStyle={width:p.width,height:p.height}):void 0!==h&&(c.affixStyle={position:"fixed",bottom:h,width:p.width,height:p.height},c.placeholderStyle={width:p.width,height:p.height}),c.lastAffix=!!c.affixStyle,a&&r!==c.lastAffix&&a(c.lastAffix),e.setState(c)}}},e.prepareMeasure=function(){e.setState({status:v.Prepare,affixStyle:void 0,placeholderStyle:void 0})},e.renderAffix=function(t){var n=t.getPrefixCls,r=e.state,o=r.affixStyle,f=r.placeholderStyle,l=e.props,u=l.prefixCls,c=l.children,s=(0,O.default)(a({},n("affix",u),o)),p=(0,w.default)(e.props,["prefixCls","offsetTop","offsetBottom","target","onChange"]);return b.createElement(P.default,{onResize:function(){e.updatePosition()}},b.createElement("div",i({},p,{ref:e.savePlaceholderNode}),o&&b.createElement("div",{style:f,"aria-hidden":"true"}),b.createElement("div",{className:s,ref:e.saveFixedNode,style:o},b.createElement(P.default,{onResize:function(){e.updatePosition()}},c))))},e}return d(t,e),u(t,[{key:"componentDidMount",value:function(){var e=this,t=this.props.target;t&&(this.timeout=setTimeout(function(){(0,j.addObserveTarget)(t(),e),e.updatePosition()}))}},{key:"componentDidUpdate",value:function(e){var t=this.state.prevTarget,n=this.props.target,r=null;n&&(r=n()||null),t!==r&&((0,j.removeObserveTarget)(this),r&&((0,j.addObserveTarget)(r,this),this.updatePosition()),this.setState({prevTarget:r})),e.offsetTop===this.props.offsetTop&&e.offsetBottom===this.props.offsetBottom||this.updatePosition(),this.measure()}},{key:"componentWillUnmount",value:function(){clearTimeout(this.timeout),(0,j.removeObserveTarget)(this),this.updatePosition.cancel()}},{key:"updatePosition",value:function(){this.prepareMeasure()}},{key:"lazyUpdatePosition",value:function(){var e=this.props.target,t=this.state.affixStyle;if(e&&t){var n=this.getOffsetTop(),r=this.getOffsetBottom(),o=e();if(o){var i=(0,j.getTargetRect)(o),a=(0,j.getTargetRect)(this.placeholderNode),f=(0,j.getFixedTop)(a,i,n),l=(0,j.getFixedBottom)(a,i,r);if(void 0!==f&&t.top===f||void 0!==l&&t.bottom===l)return}}this.prepareMeasure()}},{key:"render",value:function(){return b.createElement(x.ConfigConsumer,null,this.renderAffix)}}]),t}(b.Component);S.defaultProps={target:m},_([(0,E.throttleByAnimationFrameDecorator)()],S.prototype,"updatePosition",null),_([(0,E.throttleByAnimationFrameDecorator)()],S.prototype,"lazyUpdatePosition",null),(0,g.polyfill)(S);var A=S;t.default=A},3105:function(e,t,n){"use strict";function r(e){return a(e)||i(e)||o()}function o(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function i(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}function a(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}function f(e){var t,n=function(n){return function(){t=null,e.apply(void 0,r(n))}},o=function(){if(null==t){for(var e=arguments.length,r=new Array(e),o=0;o<e;o++)r[o]=arguments[o];t=(0,u.default)(n(r))}};return o.cancel=function(){return u.default.cancel(t)},o}function l(){return function(e,t,n){var r=n.value,o=!1;return{configurable:!0,get:function(){if(o||this===e.prototype||this.hasOwnProperty(t))return r;var n=f(r.bind(this));return o=!0,Object.defineProperty(this,t,{value:n,configurable:!0,writable:!0}),o=!1,n}}}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=f,t.throttleByAnimationFrameDecorator=l;var u=function(e){return e&&e.__esModule?e:{default:e}}(n(89))},3106:function(e,t,n){"use strict";function r(e){return e!==window?e.getBoundingClientRect():{top:0,bottom:window.innerHeight}}function o(e,t,n){if(void 0!==n&&t.top>e.top-n)return n+t.top}function i(e,t,n){if(void 0!==n&&t.bottom<e.bottom+n){return n+(window.innerHeight-t.bottom)}}function a(){return s}function f(e,t){if(e){var n=s.find(function(t){return t.target===e});n?n.affixList.push(t):(n={target:e,affixList:[t],eventHandlers:{}},s.push(n),c.forEach(function(t){n.eventHandlers[t]=(0,u.default)(e,t,function(){n.affixList.forEach(function(e){e.lazyUpdatePosition()})})}))}}function l(e){var t=s.find(function(t){var n=t.affixList.some(function(t){return t===e});return n&&(t.affixList=t.affixList.filter(function(t){return t!==e})),n});t&&0===t.affixList.length&&(s=s.filter(function(e){return e!==t}),c.forEach(function(e){var n=t.eventHandlers[e];n&&n.remove&&n.remove()}))}Object.defineProperty(t,"__esModule",{value:!0}),t.getTargetRect=r,t.getFixedTop=o,t.getFixedBottom=i,t.getObserverEntities=a,t.addObserveTarget=f,t.removeObserveTarget=l;var u=function(e){return e&&e.__esModule?e:{default:e}}(n(297)),c=["resize","scroll","touchstart","touchmove","touchend","pageshow","load"],s=[]},768:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function i(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var a=n(3101),f=(n.n(a),n(3104)),l=n.n(f),u=n(64),c=(n.n(u),n(50)),s=n.n(c),p=n(0),d=n.n(p),h=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),y=function(e){function t(){return r(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),h(t,[{key:"render",value:function(){var e=this;return d.a.createElement("div",null,d.a.createElement("h2",null," Basic Affix "),d.a.createElement(l.a,null,d.a.createElement(s.a,{type:"primary"},"Affix top")),d.a.createElement("br",null),d.a.createElement(l.a,{offsetBottom:0},d.a.createElement(s.a,{type:"primary"},"Affix bottom")),d.a.createElement("br",null),d.a.createElement("br",null),d.a.createElement("br",null),d.a.createElement("br",null),d.a.createElement("h2",null," Containter to Scroll Affix "),d.a.createElement("div",{className:"scrollable-container",ref:function(t){e.container=t}},d.a.createElement("div",{className:"background"},d.a.createElement(l.a,{target:function(){return e.container}},d.a.createElement(s.a,{type:"primary"},"Fixed at the top of container")))),d.a.createElement("br",null),d.a.createElement("br",null),d.a.createElement("br",null),d.a.createElement("br",null),d.a.createElement("h2",null," Affix with Callback "),d.a.createElement(l.a,{offsetTop:120,onChange:function(e){}},d.a.createElement(s.a,null,"120px to affix top")),d.a.createElement("br",null),d.a.createElement("br",null),d.a.createElement("br",null),d.a.createElement("br",null))}}]),t}(p.Component);t.default=y}});