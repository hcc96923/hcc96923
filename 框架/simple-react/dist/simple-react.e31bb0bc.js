// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/react-dom/dom.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setAttribute = setAttribute;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function setAttribute(dom, name, value) {
  // 如果属性名是className，则返回class
  if (name === 'className') {
    name = 'class';
  } // 如果属性名是onXXX，则是一个监听方法


  if (/on\w+/.test(name)) {
    name = name.toLowerCase();
    dom[name] = value || ''; // 如果属性名style，则更新style对象
  } else if (name === 'style') {
    if (!value || typeof value === 'string') {
      dom.style.cssText = value || '';
    } else if (value && _typeof(value) === 'object') {
      for (var _name in value) {
        // 可以通过style={ width: 20 }这种形式来设置样式，可以省略掉单位px
        dom.style[_name] = typeof value[_name] === 'number' ? value[_name] + 'px' : value[_name];
      }
    } // 普通属性则直接更新属性

  } else {
    if (name in dom) {
      dom[name] = value || '';
    }

    if (value) {
      dom.setAttribute(name, value);
    } else {
      dom.removeAttribute(name);
    }
  }
}
},{}],"src/react-dom/render.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._render = _render;
exports.default = void 0;

var _diff = require("./diff");

var _dom = require("./dom");

function _render(vnode) {
  if (vnode === undefined || vnode === null || typeof vnode === 'boolean') {
    vnode = '';
  }

  if (typeof vnode === 'number') {
    vnode = String(vnode);
  } // function Welcome( props ) {
  //     return <h1>Hello, {props.name}</h1>;
  // }
  // tag 是 Welcome
  // 区分组件和原生DOM的工作，是babel-plugin-transform-react-jsx帮我们做的


  if (typeof vnode.tag === 'function') {
    // createComponent方法创建组件实例，并且将函数定义组件扩展为类定义组件进行处理
    var component = (0, _diff.createComponent)(vnode.tag, vnode.attrs);
    (0, _diff.setComponentProps)(component, vnode.attrs);
    return component.base;
  } // 当vnode为字符串时，渲染结果是一段文本


  if (typeof vnode === 'string' || typeof vnode === 'number') {
    var textNode = document.createTextNode(vnode);
    return textNode;
  }

  var dom = document.createElement(vnode.tag);

  if (vnode.attrs) {
    Object.keys(vnode.attrs).forEach(function (key) {
      var value = vnode.attrs[key];
      (0, _dom.setAttribute)(dom, key, value); // 设置属性
    });
  }

  vnode.children.forEach(function (child) {
    return render(child, dom);
  }); // 递归渲染子节点

  return dom;
}
/* 
    render的第一个参数接收的是createElement返回的对象
    第二个参数是挂载的目标DOM
    render的作用就是将虚拟DOM渲染成真实的DOM
*/


function render(vnode, container) {
  container.innnerHTML = ''; // 将渲染结果挂载到真正的DOM上

  return container.appendChild(_render(vnode));
}

var _default = render;
exports.default = _default;
},{"./diff":"src/react-dom/diff.js","./dom":"src/react-dom/dom.js"}],"src/react-dom/diff.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.diff = diff;
exports.renderComponent = renderComponent;
exports.setComponentProps = setComponentProps;
exports.createComponent = createComponent;

var _react = require("../react");

var _dom = require("./dom");

var _render2 = require("./render");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * @param {HTMLElement} dom 真实DOM
 * @param {vnode} vnode 虚拟DOM
 * @param {HTMLElement} container 容器
 * @returns {HTMLElement} 更新后的DOM
**/
// 对比虚拟DOM和真是DOM最后返回更新后的DOM
// diff的初衷：每次更新都重新渲染整个应用或者整个组件，DOM操作消耗性能很严重
// 为了减少DOM更新带来的性能消耗，找到渲染前后真正变化的部分，只更新这一部分DOM
function diff(dom, vnode, container) {
  var ret = diffNode(dom, vnode);

  if (container && ret.parentNode !== container) {
    container.appendChild(ret);
  }

  return ret;
}
/* 
    diffNode
    对比节点自身
*/


function diffNode(dom, vnode) {
  var out = dom;
  if (vnode === undefined || vnode === null || typeof vnode === 'boolean') vnode = '';
  if (typeof vnode === 'number') vnode = String(vnode); // diff text node

  if (typeof vnode === "string") {
    // 当前DOM节点是文本节点，直接更新内容
    // nodeType: https://developer.mozilla.org/zh-CN/docs/Web/API/Node/nodeType
    if (dom && dom.nodeType === 3) {
      if (dom.textContent !== vnode) {
        dom.textContent = vnode;
      } // 如果DOM不是文本节点，则新建一个文本节点DOM，并移除掉原来的

    } else {
      out = document.createTextNode(vnode);

      if (dom && dom.parentNode) {
        dom.parentNode.replaceChild(out, dom);
      }
    } // 文本节点非常简单没有属性，没有子元素


    return out;
  }

  if (typeof vnode.tag === 'function') {
    return diffComponent(dom, vnode);
  } // 情况一：如果真实DOM不存在，表示此节点是新增的，或者新旧两个节点的类型不一样，
  // 那么就新建一个DOM元素，并将原来的子节点（如果有的话）移动到新建的DOM节点下。


  if (!dom || !isSameNodeType(dom, vnode)) {
    out = document.createElement(vnode.tag); // 不是同一类型的dom

    if (dom) {
      // 将原来的子节点移到新节点下
      _toConsumableArray(dom.childNodes).map(out.appendChild);

      if (dom.parentNode) {
        // 移除掉原来的DOM对象
        dom.parentNode.replaceChild(out, dom);
      }
    }
  } // 情况二：如果真实DOM存在，并且和虚拟DOM是同一类型的，那我们暂时不需要做别的，
  // 只需要等待后面对比属性和对比子节点。


  if (vnode.children && vnode.children.length > 0 || out.childNodes && out.childNodes.length > 0) {
    diffChildren(out, vnode.children);
  }

  diffAttributes(out, vnode);
  return out;
}
/* 
    diffChildren
    对比子节点
*/


function diffChildren(dom, vchildren) {
  // 对比子节点时，子节点是一个数组，它们可能改变了顺序，数量。很难确定要和虚拟DOM对比的是哪一个
  // 这里就要为每一个子节点设一个key，重新渲染时对比key值相同的节点
  var domChildren = dom.childNodes;
  var children = [];
  var keyed = {}; // 将有key的节点和没有key的节点分开

  if (domChildren.length > 0) {
    for (var index = 0; index < domChildren.length; index++) {
      var child = domChildren[index];
      var key = child.key;

      if (key) {
        keyed[key] = child;
      } else {
        children.push(child);
      }
    }
  } // 虚拟DOM的children


  if (vchildren && vchildren.length > 0) {
    var min = 0;
    var childrenLen = children.length;

    for (var _index = 0; _index < vchildren.length; _index++) {
      var vchild = vchildren[_index];
      var _key = vchild.key;

      var _child = void 0; // 如果有key的话，找到对应key值的节点


      if (_key) {
        if (keyed[_key]) {
          _child = keyed[_key];
          keyed[_key] = undefined;
        }
      } else if (min < childrenLen) {
        for (var _index2 = min; _index2 < childrenLen; _index2++) {
          var c = children[_index2];

          if (c && isSameNodeType(c, vchild)) {
            _child = c;
            children[_index2] = undefined;

            if (_index2 === childrenLen - 1) {
              childrenLen--;
            }

            if (_index2 === min) {
              min++;
            }

            break;
          }
        }
      } // 对比


      _child = diff(_child, vchild); // 更新DOM

      var f = domChildren[_index];

      if (_child && _child !== dom && _child !== f) {
        // 如果更新前的对应位置为空，说明此节点时新增的
        if (!f) {
          dom.appendChild(_child); // 如果更新后的节点和更新前对应位置的下一个节点一样，说明当前位置的节点被移除了
        } else if (_child === f.nextSibling) {
          removeNode(f); // 将更新后的节点移动到正确的位置
        } else {
          // 注意insertBefore的用法，第一个参数是要插入的节点，第二个参数是已存在的节点
          dom.insertBefore(_child, f);
        }
      }
    }
  }
}
/* 
    diffComponent
    对比组件
*/


function diffComponent(dom, vnode) {
  var c = dom && dom._component;
  var oldDom = dom; // 如果组件类型没有变化则重新set props

  if (c && c.constructor === vnode.tag) {
    setComponentProps(c, vnode.attrs);
    dom = c.base; // 如果组件类型变化，则移除掉原来组件，并渲染新的组件
  } else {
    if (c) {
      unmountComponent(c);
      oldDom = null;
    }

    c = createComponent(vnode.tag, vnode.attrs);
    setComponentProps(c, vnode.attrs);
    dom = c.base;

    if (oldDom && dom !== oldDom) {
      oldDom._component = null;
      removeNode(oldDom);
    }
  }

  return dom;
}

function isSameNodeType(dom, vnode) {
  if (typeof vnode === 'string' || typeof vnode === 'number') {
    return dom.nodeType === 3;
  }

  if (typeof vnode.tag === 'string') {
    return dom.nodeName.toLowerCase() === vnode.tag.toLowerCase();
  }

  return dom && dom._component && dom._component.constructor === vnode.tag;
}
/* 
    diffAttributes
    对比节点属性
*/


function diffAttributes(dom, vnode) {
  // diff算法不仅要找出节点类型的变化，还要找出节点的属性以及事件监听的变化
  var old = {}; // 当前DOM的属性

  var attrs = vnode.attrs; // 虚拟DOM的属性
  // 添加新的属性

  for (var index = 0; index < dom.attributes.length; index++) {
    var attr = dom.attributes[index];
    old[attr.name] = attr.value;
  } // 如果原来的属性不在新属性当中，则将其移除掉


  for (var name in old) {
    if (!(name in attrs)) {
      (0, _dom.setAttribute)(dom, name, undefined);
    }
  } // 更新新的属性值


  for (var _name in attrs) {
    if (old[_name] !== attrs[_name]) {
      (0, _dom.setAttribute)(dom, _name, attrs[_name]);
    }
  }
}

function renderComponent(component) {
  var base; // 调用组件的render函数返回dom对象

  var renderer = component.render();

  if (component.base && component.componentWillUpdate) {
    component.componentWillUpdate();
  } // base = _render(renderer);


  base = diff(component.base, renderer);

  if (component.base) {
    if (component.componentDidUpdate) component.componentDidUpdate();
  } else if (component.componentDidMount) {
    component.componentDidMount();
  } // if ( component.base && component.base.parentNode ) {
  //     component.base.parentNode.replaceChild( base, component.base );
  // }
  // component.base保存组件实例最终渲染出来的DOM
  // 反过来base._component保存的是dom对象所对应的组件，这个就是为了把他们关联起来


  component.base = base;
  base._component = component;
}

function setComponentProps(component, props) {
  if (!component.base) {
    if (component.componentWillMount) {
      component.componentWillMount();
    } else if (component.compoentWillReceiveProps) {
      component.compoentWillReceiveProps();
    }

    component.props = props; // renderComponent方法用来渲染组件，setState方法会直接调用这个方法进行重新渲染
    // 在这个方法里可以实现componentWillUpdate, componentDidUpdate, componentDidMount

    renderComponent(component);
  }
}

function createComponent(component, props) {
  var inst; // 如果是类定义组件，则直接返回实例

  if (component.prototype && component.prototype.render) {
    inst = new component(props); // 如果是函数定义组件，则将其扩展为类定义组件
  } else {
    inst = new Component(props);
    inst.constructor = component;

    inst.render = function () {
      return this.constructor(props);
    };
  }

  return inst;
}

function unmountComponent(component) {
  if (component.componentWillUnmount) component.componentWillUnmount();
  removeNode(component.base);
}
},{"../react":"src/react/index.js","./dom":"src/react-dom/dom.js","./render":"src/react-dom/render.js"}],"src/react/component.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _diff = require("../react-dom/diff");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Component = /*#__PURE__*/function () {
  // 通过继承React.Component定义的组件有自己的私有状态state可以通过this.state获取到
  // 同时也能通过this.props来获取传入的数据
  // 所以在构造函数中，需要初始化state和props
  function Component() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Component);

    this.state = {};
    this.props = props;
  } // 组件内部的state和渲染相关，state改变时通常会出发渲染，为了让react
  // 直到我们改变了state，我们只能通过setState方法修改数据


  _createClass(Component, [{
    key: "setState",
    value: function setState(stateChange) {
      // 将修改合并到state
      Object.assign(this.state, stateChange); // 在每次更新state后，需要调用renderComponent方法重新渲染组件

      (0, _diff.renderComponent)(this);
    }
  }]);

  return Component;
}();

var _default = Component;
exports.default = _default;
},{"../react-dom/diff":"src/react-dom/diff.js"}],"src/react/create-element.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/* 
    React.createElement
    jsx片段会被转译成用React.createElement方法包裹的代码
    返回一个对象来保存它的信息
    tag 标签名
    attrs 一个对象包含了所有的属性
    ...children 所有的子节点
*/
function createElement(tag, attrs) {
  attrs = attrs || {};

  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  return {
    tag: tag,
    attrs: attrs,
    children: children
  };
}

var _default = createElement;
exports.default = _default;
},{}],"src/react/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _component = _interopRequireDefault(require("./component.js"));

var _createElement = _interopRequireDefault(require("./create-element.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  Component: _component.default,
  createElement: _createElement.default
};
exports.default = _default;
},{"./component.js":"src/react/component.js","./create-element.js":"src/react/create-element.js"}],"src/react-dom/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _render = _interopRequireDefault(require("./render"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  render: _render.default
};
exports.default = _default;
},{"./render":"src/react-dom/render.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _react = _interopRequireDefault(require("./src/react"));

var _reactDom = _interopRequireDefault(require("./src/react-dom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var App = /*#__PURE__*/function (_React$Component) {
  _inherits(App, _React$Component);

  var _super = _createSuper(App);

  function App() {
    _classCallCheck(this, App);

    return _super.apply(this, arguments);
  }

  _createClass(App, [{
    key: "render",
    value: function render() {
      return _react.default.createElement("h1", null, "Hello World");
    }
  }]);

  return App;
}(_react.default.Component);

var Conuter = /*#__PURE__*/function (_React$Component2) {
  _inherits(Conuter, _React$Component2);

  var _super2 = _createSuper(Conuter);

  function Conuter(props) {
    var _this;

    _classCallCheck(this, Conuter);

    _this = _super2.call(this, props);
    _this.state = {
      num: 0
    };
    return _this;
  }

  _createClass(Conuter, [{
    key: "componentWillUpdate",
    value: function componentWillUpdate() {// console.log( 'update' );
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {// console.log( 'mount' );
    }
  }, {
    key: "onClick",
    value: function onClick() {
      this.setState({
        num: this.state.num + 1
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      // transform-react-jsx是将jsx转换为js的babel插件
      // 它有一个pragma项，可以定义jsx转换方法的名称。
      // 首先jsx片段会被转译成用React.createElement方法包裹的代码
      return _react.default.createElement("div", {
        onClick: function onClick() {
          return _this2.onClick();
        }
      }, "Hello World", _react.default.createElement("h1", null, "number: ", this.state.num), _react.default.createElement("button", null, "add"));
    }
  }]);

  return Conuter;
}(_react.default.Component);

_reactDom.default.render(_react.default.createElement(Conuter, null), document.getElementById('root'));
},{"./src/react":"src/react/index.js","./src/react-dom":"src/react-dom/index.js"}],"../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62213" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/simple-react.e31bb0bc.js.map