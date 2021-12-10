// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
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

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
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
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"4w6mE":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "4a236f9275d0a351";
module.bundle.HMR_BUNDLE_ID = "cff8fabf323cfff2";
"use strict";
function _createForOfIteratorHelper(o, allowArrayLike) {
    var it;
    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
            if (it) o = it;
            var i = 0;
            var F = function F() {
            };
            return {
                s: F,
                n: function n() {
                    if (i >= o.length) return {
                        done: true
                    };
                    return {
                        done: false,
                        value: o[i++]
                    };
                },
                e: function e(_e) {
                    throw _e;
                },
                f: F
            };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return {
        s: function s() {
            it = o[Symbol.iterator]();
        },
        n: function n() {
            var step = it.next();
            normalCompletion = step.done;
            return step;
        },
        e: function e(_e2) {
            didErr = true;
            err = _e2;
        },
        f: function f() {
            try {
                if (!normalCompletion && it.return != null) it.return();
            } finally{
                if (didErr) throw err;
            }
        }
    };
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function accept(fn) {
            this._acceptCallbacks.push(fn || function() {
            });
        },
        dispose: function dispose(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? 'wss' : 'ws';
    var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/'); // $FlowFixMe
    ws.onmessage = function(event) {
        checkedAssets = {
        };
        acceptedAssets = {
        };
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === 'update') {
            // Remove error overlay if there is one
            if (typeof document !== 'undefined') removeErrorOverlay();
            var assets = data.assets.filter(function(asset) {
                return asset.envHash === HMR_ENV_HASH;
            }); // Handle HMR Update
            var handled = assets.every(function(asset) {
                return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                assets.forEach(function(asset) {
                    hmrApply(module.bundle.root, asset);
                });
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else window.location.reload();
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            var _iterator = _createForOfIteratorHelper(data.diagnostics.ansi), _step;
            try {
                for(_iterator.s(); !(_step = _iterator.n()).done;){
                    var ansiDiagnostic = _step.value;
                    var stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                    console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
                }
            } catch (err) {
                _iterator.e(err);
            } finally{
                _iterator.f();
            }
            if (typeof document !== 'undefined') {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log('[parcel] ✨ Error resolved');
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    var errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    var _iterator2 = _createForOfIteratorHelper(diagnostics), _step2;
    try {
        for(_iterator2.s(); !(_step2 = _iterator2.n()).done;){
            var diagnostic = _step2.value;
            var stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
            errorHTML += "\n      <div>\n        <div style=\"font-size: 18px; font-weight: bold; margin-top: 20px;\">\n          \uD83D\uDEA8 ".concat(diagnostic.message, "\n        </div>\n        <pre>").concat(stack, "</pre>\n        <div>\n          ").concat(diagnostic.hints.map(function(hint) {
                return '<div>💡 ' + hint + '</div>';
            }).join(''), "\n        </div>\n        ").concat(diagnostic.documentation ? "<div>\uD83D\uDCDD <a style=\"color: violet\" href=\"".concat(diagnostic.documentation, "\" target=\"_blank\">Learn more</a></div>") : '', "\n      </div>\n    ");
        }
    } catch (err) {
        _iterator2.e(err);
    } finally{
        _iterator2.f();
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        var deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            var fn = new Function('require', 'module', 'exports', asset.output);
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) return true;
    var parents = getParents(module.bundle.root, id); // If no parents, the asset is new. Prevent reloading the page.
    if (!parents.length) return true;
    return parents.some(function(v) {
        return hmrAcceptCheck(v[0], v[1], null);
    });
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {
    };
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"aCPO5":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _mithril = require("mithril");
var _mithrilDefault = parcelHelpers.interopDefault(_mithril);
var _components = require("../../src/app/components");
var _downloadJsx = require("./download.jsx");
var _downloadJsxDefault = parcelHelpers.interopDefault(_downloadJsx);
var _splashJsx = require("./splash.jsx");
var _splashJsxDefault = parcelHelpers.interopDefault(_splashJsx);
var _styleGuideJsx = require("./style-guide.jsx");
var _styleGuideJsxDefault = parcelHelpers.interopDefault(_styleGuideJsx);
var _defaultsScss = require("../../src/scss/defaults.scss");
var _typographyScss = require("../../src/scss/typography.scss");
var _globalsScss = require("../../src/scss/globals.scss");
let root = document.body;
const PagesLayout = {
    view: (vnode)=>{
        return _mithrilDefault.default('[', null, _mithrilDefault.default(_components.UnauthedNav, null), vnode.children);
    }
};
_mithrilDefault.default.route(root, '/', {
    '/': {
        view: ()=>{
            return _mithrilDefault.default(PagesLayout, null, _mithrilDefault.default(_splashJsxDefault.default, null));
        }
    },
    '/download': {
        view: ()=>{
            return _mithrilDefault.default(PagesLayout, null, _mithrilDefault.default(_downloadJsxDefault.default, null));
        }
    },
    '/style-guide': {
        view: ()=>{
            return _mithrilDefault.default(PagesLayout, null, _mithrilDefault.default(_styleGuideJsxDefault.default, null));
        }
    }
});

},{"mithril":"a7UJj","../../src/app/components":"h8DOh","./download.jsx":"8usp0","./splash.jsx":"g78wu","../../src/scss/defaults.scss":"bryrU","../../src/scss/typography.scss":"8ZQcx","../../src/scss/globals.scss":"5ZgLC","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV","./style-guide.jsx":"fHhYm"}],"a7UJj":[function(require,module,exports) {
"use strict";
var hyperscript = require("./hyperscript");
var request = require("./request");
var mountRedraw = require("./mount-redraw");
var m = function m() {
    return hyperscript.apply(this, arguments);
};
m.m = hyperscript;
m.trust = hyperscript.trust;
m.fragment = hyperscript.fragment;
m.mount = mountRedraw.mount;
m.route = require("./route");
m.render = require("./render");
m.redraw = mountRedraw.redraw;
m.request = request.request;
m.jsonp = request.jsonp;
m.parseQueryString = require("./querystring/parse");
m.buildQueryString = require("./querystring/build");
m.parsePathname = require("./pathname/parse");
m.buildPathname = require("./pathname/build");
m.vnode = require("./render/vnode");
m.PromisePolyfill = require("./promise/polyfill");
module.exports = m;

},{"./hyperscript":"amBFY","./request":"7QnjX","./mount-redraw":"3IzBr","./route":"hqfSN","./render":"35aJ6","./querystring/parse":"f2JYz","./querystring/build":"k3mZd","./pathname/parse":"dIkXY","./pathname/build":"3I4yB","./render/vnode":"6srsp","./promise/polyfill":"aBm4J"}],"amBFY":[function(require,module,exports) {
"use strict";
var hyperscript = require("./render/hyperscript");
hyperscript.trust = require("./render/trust");
hyperscript.fragment = require("./render/fragment");
module.exports = hyperscript;

},{"./render/hyperscript":"gVN62","./render/trust":"jgKzo","./render/fragment":"etwKa"}],"gVN62":[function(require,module,exports) {
"use strict";
var Vnode = require("../render/vnode");
var hyperscriptVnode = require("./hyperscriptVnode");
var selectorParser = /(?:(^|#|\.)([^#\.\[\]]+))|(\[(.+?)(?:\s*=\s*("|'|)((?:\\["'\]]|.)*?)\5)?\])/g;
var selectorCache = {
};
var hasOwn = {
}.hasOwnProperty;
function isEmpty(object) {
    for(var key in object)if (hasOwn.call(object, key)) return false;
    return true;
}
function compileSelector(selector) {
    var match, tag = "div", classes = [], attrs = {
    };
    while(match = selectorParser.exec(selector)){
        var type = match[1], value = match[2];
        if (type === "" && value !== "") tag = value;
        else if (type === "#") attrs.id = value;
        else if (type === ".") classes.push(value);
        else if (match[3][0] === "[") {
            var attrValue = match[6];
            if (attrValue) attrValue = attrValue.replace(/\\(["'])/g, "$1").replace(/\\\\/g, "\\");
            if (match[4] === "class") classes.push(attrValue);
            else attrs[match[4]] = attrValue === "" ? attrValue : attrValue || true;
        }
    }
    if (classes.length > 0) attrs.className = classes.join(" ");
    return selectorCache[selector] = {
        tag: tag,
        attrs: attrs
    };
}
function execSelector(state, vnode) {
    var attrs = vnode.attrs;
    var children = Vnode.normalizeChildren(vnode.children);
    var hasClass = hasOwn.call(attrs, "class");
    var className = hasClass ? attrs.class : attrs.className;
    vnode.tag = state.tag;
    vnode.attrs = null;
    vnode.children = undefined;
    if (!isEmpty(state.attrs) && !isEmpty(attrs)) {
        var newAttrs = {
        };
        for(var key in attrs)if (hasOwn.call(attrs, key)) newAttrs[key] = attrs[key];
        attrs = newAttrs;
    }
    for(var key in state.attrs)if (hasOwn.call(state.attrs, key) && key !== "className" && !hasOwn.call(attrs, key)) attrs[key] = state.attrs[key];
    if (className != null || state.attrs.className != null) attrs.className = className != null ? state.attrs.className != null ? String(state.attrs.className) + " " + String(className) : className : state.attrs.className != null ? state.attrs.className : null;
    if (hasClass) attrs.class = null;
    for(var key in attrs)if (hasOwn.call(attrs, key) && key !== "key") {
        vnode.attrs = attrs;
        break;
    }
    if (Array.isArray(children) && children.length === 1 && children[0] != null && children[0].tag === "#") vnode.text = children[0].children;
    else vnode.children = children;
    return vnode;
}
function hyperscript(selector) {
    if (selector == null || typeof selector !== "string" && typeof selector !== "function" && typeof selector.view !== "function") throw Error("The selector must be either a string or a component.");
    var vnode = hyperscriptVnode.apply(1, arguments);
    if (typeof selector === "string") {
        vnode.children = Vnode.normalizeChildren(vnode.children);
        if (selector !== "[") return execSelector(selectorCache[selector] || compileSelector(selector), vnode);
    }
    vnode.tag = selector;
    return vnode;
}
module.exports = hyperscript;

},{"../render/vnode":"6srsp","./hyperscriptVnode":"3jdrL"}],"6srsp":[function(require,module,exports) {
"use strict";
function Vnode(tag, key, attrs, children, text, dom) {
    return {
        tag: tag,
        key: key,
        attrs: attrs,
        children: children,
        text: text,
        dom: dom,
        domSize: undefined,
        state: undefined,
        events: undefined,
        instance: undefined
    };
}
Vnode.normalize = function(node) {
    if (Array.isArray(node)) return Vnode("[", undefined, undefined, Vnode.normalizeChildren(node), undefined, undefined);
    if (node == null || typeof node === "boolean") return null;
    if (typeof node === "object") return node;
    return Vnode("#", undefined, undefined, String(node), undefined, undefined);
};
Vnode.normalizeChildren = function(input) {
    var children = [];
    if (input.length) {
        var isKeyed = input[0] != null && input[0].key != null;
        // Note: this is a *very* perf-sensitive check.
        // Fun fact: merging the loop like this is somehow faster than splitting
        // it, noticeably so.
        for(var i = 1; i < input.length; i++){
            if ((input[i] != null && input[i].key != null) !== isKeyed) throw new TypeError("Vnodes must either always have keys or never have keys!");
        }
        for(var i = 0; i < input.length; i++)children[i] = Vnode.normalize(input[i]);
    }
    return children;
};
module.exports = Vnode;

},{}],"3jdrL":[function(require,module,exports) {
"use strict";
var Vnode = require("../render/vnode");
// Call via `hyperscriptVnode.apply(startOffset, arguments)`
//
// The reason I do it this way, forwarding the arguments and passing the start
// offset in `this`, is so I don't have to create a temporary array in a
// performance-critical path.
//
// In native ES6, I'd instead add a final `...args` parameter to the
// `hyperscript` and `fragment` factories and define this as
// `hyperscriptVnode(...args)`, since modern engines do optimize that away. But
// ES5 (what Mithril requires thanks to IE support) doesn't give me that luxury,
// and engines aren't nearly intelligent enough to do either of these:
//
// 1. Elide the allocation for `[].slice.call(arguments, 1)` when it's passed to
//    another function only to be indexed.
// 2. Elide an `arguments` allocation when it's passed to any function other
//    than `Function.prototype.apply` or `Reflect.apply`.
//
// In ES6, it'd probably look closer to this (I'd need to profile it, though):
// module.exports = function(attrs, ...children) {
//     if (attrs == null || typeof attrs === "object" && attrs.tag == null && !Array.isArray(attrs)) {
//         if (children.length === 1 && Array.isArray(children[0])) children = children[0]
//     } else {
//         children = children.length === 0 && Array.isArray(attrs) ? attrs : [attrs, ...children]
//         attrs = undefined
//     }
//
//     if (attrs == null) attrs = {}
//     return Vnode("", attrs.key, attrs, children)
// }
module.exports = function() {
    var attrs = arguments[this], start = this + 1, children;
    if (attrs == null) attrs = {
    };
    else if (typeof attrs !== "object" || attrs.tag != null || Array.isArray(attrs)) {
        attrs = {
        };
        start = this;
    }
    if (arguments.length === start + 1) {
        children = arguments[start];
        if (!Array.isArray(children)) children = [
            children
        ];
    } else {
        children = [];
        while(start < arguments.length)children.push(arguments[start++]);
    }
    return Vnode("", attrs.key, attrs, children);
};

},{"../render/vnode":"6srsp"}],"jgKzo":[function(require,module,exports) {
"use strict";
var Vnode = require("../render/vnode");
module.exports = function(html) {
    if (html == null) html = "";
    return Vnode("<", undefined, undefined, html, undefined, undefined);
};

},{"../render/vnode":"6srsp"}],"etwKa":[function(require,module,exports) {
"use strict";
var Vnode = require("../render/vnode");
var hyperscriptVnode = require("./hyperscriptVnode");
module.exports = function() {
    var vnode = hyperscriptVnode.apply(0, arguments);
    vnode.tag = "[";
    vnode.children = Vnode.normalizeChildren(vnode.children);
    return vnode;
};

},{"../render/vnode":"6srsp","./hyperscriptVnode":"3jdrL"}],"7QnjX":[function(require,module,exports) {
"use strict";
var PromisePolyfill = require("./promise/promise");
var mountRedraw = require("./mount-redraw");
module.exports = require("./request/request")(window, PromisePolyfill, mountRedraw.redraw);

},{"./promise/promise":"jcHh3","./mount-redraw":"3IzBr","./request/request":"1vd7c"}],"jcHh3":[function(require,module,exports) {
var global = arguments[3];
"use strict";
var PromisePolyfill = require("./polyfill");
if (typeof window !== "undefined") {
    if (typeof window.Promise === "undefined") window.Promise = PromisePolyfill;
    else if (!window.Promise.prototype.finally) window.Promise.prototype.finally = PromisePolyfill.prototype.finally;
    module.exports = window.Promise;
} else if (typeof global !== "undefined") {
    if (typeof global.Promise === "undefined") global.Promise = PromisePolyfill;
    else if (!global.Promise.prototype.finally) global.Promise.prototype.finally = PromisePolyfill.prototype.finally;
    module.exports = global.Promise;
} else module.exports = PromisePolyfill;

},{"./polyfill":"aBm4J"}],"aBm4J":[function(require,module,exports) {
"use strict";
/** @constructor */ var PromisePolyfill = function(executor) {
    if (!(this instanceof PromisePolyfill)) throw new Error("Promise must be called with `new`");
    if (typeof executor !== "function") throw new TypeError("executor must be a function");
    var self = this, resolvers = [], rejectors = [], resolveCurrent = handler(resolvers, true), rejectCurrent = handler(rejectors, false);
    var instance = self._instance = {
        resolvers: resolvers,
        rejectors: rejectors
    };
    var callAsync = typeof setImmediate === "function" ? setImmediate : setTimeout;
    function handler(list, shouldAbsorb) {
        return function execute(value) {
            var then;
            try {
                if (shouldAbsorb && value != null && (typeof value === "object" || typeof value === "function") && typeof (then = value.then) === "function") {
                    if (value === self) throw new TypeError("Promise can't be resolved w/ itself");
                    executeOnce(then.bind(value));
                } else callAsync(function() {
                    if (!shouldAbsorb && list.length === 0) console.error("Possible unhandled promise rejection:", value);
                    for(var i = 0; i < list.length; i++)list[i](value);
                    resolvers.length = 0, rejectors.length = 0;
                    instance.state = shouldAbsorb;
                    instance.retry = function() {
                        execute(value);
                    };
                });
            } catch (e) {
                rejectCurrent(e);
            }
        };
    }
    function executeOnce(then) {
        var runs = 0;
        function run(fn) {
            return function(value) {
                if (runs++ > 0) return;
                fn(value);
            };
        }
        var onerror = run(rejectCurrent);
        try {
            then(run(resolveCurrent), onerror);
        } catch (e) {
            onerror(e);
        }
    }
    executeOnce(executor);
};
PromisePolyfill.prototype.then = function(onFulfilled, onRejection) {
    var self = this, instance = self._instance;
    function handle(callback, list, next, state) {
        list.push(function(value) {
            if (typeof callback !== "function") next(value);
            else try {
                resolveNext(callback(value));
            } catch (e) {
                if (rejectNext) rejectNext(e);
            }
        });
        if (typeof instance.retry === "function" && state === instance.state) instance.retry();
    }
    var resolveNext, rejectNext;
    var promise = new PromisePolyfill(function(resolve, reject) {
        resolveNext = resolve, rejectNext = reject;
    });
    handle(onFulfilled, instance.resolvers, resolveNext, true), handle(onRejection, instance.rejectors, rejectNext, false);
    return promise;
};
PromisePolyfill.prototype.catch = function(onRejection) {
    return this.then(null, onRejection);
};
PromisePolyfill.prototype.finally = function(callback) {
    return this.then(function(value) {
        return PromisePolyfill.resolve(callback()).then(function() {
            return value;
        });
    }, function(reason) {
        return PromisePolyfill.resolve(callback()).then(function() {
            return PromisePolyfill.reject(reason);
        });
    });
};
PromisePolyfill.resolve = function(value) {
    if (value instanceof PromisePolyfill) return value;
    return new PromisePolyfill(function(resolve) {
        resolve(value);
    });
};
PromisePolyfill.reject = function(value) {
    return new PromisePolyfill(function(resolve, reject) {
        reject(value);
    });
};
PromisePolyfill.all = function(list) {
    return new PromisePolyfill(function(resolve, reject) {
        var total = list.length, count = 0, values = [];
        if (list.length === 0) resolve([]);
        else for(var i = 0; i < list.length; i++)(function(i) {
            function consume(value) {
                count++;
                values[i] = value;
                if (count === total) resolve(values);
            }
            if (list[i] != null && (typeof list[i] === "object" || typeof list[i] === "function") && typeof list[i].then === "function") list[i].then(consume, reject);
            else consume(list[i]);
        })(i);
    });
};
PromisePolyfill.race = function(list) {
    return new PromisePolyfill(function(resolve, reject) {
        for(var i = 0; i < list.length; i++)list[i].then(resolve, reject);
    });
};
module.exports = PromisePolyfill;

},{}],"3IzBr":[function(require,module,exports) {
"use strict";
var render = require("./render");
module.exports = require("./api/mount-redraw")(render, requestAnimationFrame, console);

},{"./render":"35aJ6","./api/mount-redraw":"4LuTr"}],"35aJ6":[function(require,module,exports) {
"use strict";
module.exports = require("./render/render")(window);

},{"./render/render":"32LcU"}],"32LcU":[function(require,module,exports) {
"use strict";
var Vnode = require("../render/vnode");
module.exports = function($window) {
    var $doc = $window && $window.document;
    var currentRedraw;
    var nameSpace = {
        svg: "http://www.w3.org/2000/svg",
        math: "http://www.w3.org/1998/Math/MathML"
    };
    function getNameSpace(vnode) {
        return vnode.attrs && vnode.attrs.xmlns || nameSpace[vnode.tag];
    }
    //sanity check to discourage people from doing `vnode.state = ...`
    function checkState(vnode, original) {
        if (vnode.state !== original) throw new Error("`vnode.state` must not be modified");
    }
    //Note: the hook is passed as the `this` argument to allow proxying the
    //arguments without requiring a full array allocation to do so. It also
    //takes advantage of the fact the current `vnode` is the first argument in
    //all lifecycle methods.
    function callHook(vnode) {
        var original = vnode.state;
        try {
            return this.apply(original, arguments);
        } finally{
            checkState(vnode, original);
        }
    }
    // IE11 (at least) throws an UnspecifiedError when accessing document.activeElement when
    // inside an iframe. Catch and swallow this error, and heavy-handidly return null.
    function activeElement() {
        try {
            return $doc.activeElement;
        } catch (e) {
            return null;
        }
    }
    //create
    function createNodes(parent, vnodes, start, end, hooks, nextSibling, ns) {
        for(var i = start; i < end; i++){
            var vnode = vnodes[i];
            if (vnode != null) createNode(parent, vnode, hooks, ns, nextSibling);
        }
    }
    function createNode(parent, vnode, hooks, ns, nextSibling) {
        var tag = vnode.tag;
        if (typeof tag === "string") {
            vnode.state = {
            };
            if (vnode.attrs != null) initLifecycle(vnode.attrs, vnode, hooks);
            switch(tag){
                case "#":
                    createText(parent, vnode, nextSibling);
                    break;
                case "<":
                    createHTML(parent, vnode, ns, nextSibling);
                    break;
                case "[":
                    createFragment(parent, vnode, hooks, ns, nextSibling);
                    break;
                default:
                    createElement(parent, vnode, hooks, ns, nextSibling);
            }
        } else createComponent(parent, vnode, hooks, ns, nextSibling);
    }
    function createText(parent, vnode, nextSibling) {
        vnode.dom = $doc.createTextNode(vnode.children);
        insertNode(parent, vnode.dom, nextSibling);
    }
    var possibleParents = {
        caption: "table",
        thead: "table",
        tbody: "table",
        tfoot: "table",
        tr: "tbody",
        th: "tr",
        td: "tr",
        colgroup: "table",
        col: "colgroup"
    };
    function createHTML(parent, vnode, ns, nextSibling) {
        var match = vnode.children.match(/^\s*?<(\w+)/im) || [];
        // not using the proper parent makes the child element(s) vanish.
        //     var div = document.createElement("div")
        //     div.innerHTML = "<td>i</td><td>j</td>"
        //     console.log(div.innerHTML)
        // --> "ij", no <td> in sight.
        var temp = $doc.createElement(possibleParents[match[1]] || "div");
        if (ns === "http://www.w3.org/2000/svg") {
            temp.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\">" + vnode.children + "</svg>";
            temp = temp.firstChild;
        } else temp.innerHTML = vnode.children;
        vnode.dom = temp.firstChild;
        vnode.domSize = temp.childNodes.length;
        // Capture nodes to remove, so we don't confuse them.
        vnode.instance = [];
        var fragment = $doc.createDocumentFragment();
        var child;
        while(child = temp.firstChild){
            vnode.instance.push(child);
            fragment.appendChild(child);
        }
        insertNode(parent, fragment, nextSibling);
    }
    function createFragment(parent, vnode, hooks, ns, nextSibling) {
        var fragment = $doc.createDocumentFragment();
        if (vnode.children != null) {
            var children = vnode.children;
            createNodes(fragment, children, 0, children.length, hooks, null, ns);
        }
        vnode.dom = fragment.firstChild;
        vnode.domSize = fragment.childNodes.length;
        insertNode(parent, fragment, nextSibling);
    }
    function createElement(parent, vnode, hooks, ns, nextSibling) {
        var tag = vnode.tag;
        var attrs = vnode.attrs;
        var is = attrs && attrs.is;
        ns = getNameSpace(vnode) || ns;
        var element = ns ? is ? $doc.createElementNS(ns, tag, {
            is: is
        }) : $doc.createElementNS(ns, tag) : is ? $doc.createElement(tag, {
            is: is
        }) : $doc.createElement(tag);
        vnode.dom = element;
        if (attrs != null) setAttrs(vnode, attrs, ns);
        insertNode(parent, element, nextSibling);
        if (!maybeSetContentEditable(vnode)) {
            if (vnode.text != null) {
                if (vnode.text !== "") element.textContent = vnode.text;
                else vnode.children = [
                    Vnode("#", undefined, undefined, vnode.text, undefined, undefined)
                ];
            }
            if (vnode.children != null) {
                var children = vnode.children;
                createNodes(element, children, 0, children.length, hooks, null, ns);
                if (vnode.tag === "select" && attrs != null) setLateSelectAttrs(vnode, attrs);
            }
        }
    }
    function initComponent(vnode, hooks) {
        var sentinel;
        if (typeof vnode.tag.view === "function") {
            vnode.state = Object.create(vnode.tag);
            sentinel = vnode.state.view;
            if (sentinel.$$reentrantLock$$ != null) return;
            sentinel.$$reentrantLock$$ = true;
        } else {
            vnode.state = void 0;
            sentinel = vnode.tag;
            if (sentinel.$$reentrantLock$$ != null) return;
            sentinel.$$reentrantLock$$ = true;
            vnode.state = vnode.tag.prototype != null && typeof vnode.tag.prototype.view === "function" ? new vnode.tag(vnode) : vnode.tag(vnode);
        }
        initLifecycle(vnode.state, vnode, hooks);
        if (vnode.attrs != null) initLifecycle(vnode.attrs, vnode, hooks);
        vnode.instance = Vnode.normalize(callHook.call(vnode.state.view, vnode));
        if (vnode.instance === vnode) throw Error("A view cannot return the vnode it received as argument");
        sentinel.$$reentrantLock$$ = null;
    }
    function createComponent(parent, vnode, hooks, ns, nextSibling) {
        initComponent(vnode, hooks);
        if (vnode.instance != null) {
            createNode(parent, vnode.instance, hooks, ns, nextSibling);
            vnode.dom = vnode.instance.dom;
            vnode.domSize = vnode.dom != null ? vnode.instance.domSize : 0;
        } else vnode.domSize = 0;
    }
    //update
    /**
	 * @param {Element|Fragment} parent - the parent element
	 * @param {Vnode[] | null} old - the list of vnodes of the last `render()` call for
	 *                               this part of the tree
	 * @param {Vnode[] | null} vnodes - as above, but for the current `render()` call.
	 * @param {Function[]} hooks - an accumulator of post-render hooks (oncreate/onupdate)
	 * @param {Element | null} nextSibling - the next DOM node if we're dealing with a
	 *                                       fragment that is not the last item in its
	 *                                       parent
	 * @param {'svg' | 'math' | String | null} ns) - the current XML namespace, if any
	 * @returns void
	 */ // This function diffs and patches lists of vnodes, both keyed and unkeyed.
    //
    // We will:
    //
    // 1. describe its general structure
    // 2. focus on the diff algorithm optimizations
    // 3. discuss DOM node operations.
    // ## Overview:
    //
    // The updateNodes() function:
    // - deals with trivial cases
    // - determines whether the lists are keyed or unkeyed based on the first non-null node
    //   of each list.
    // - diffs them and patches the DOM if needed (that's the brunt of the code)
    // - manages the leftovers: after diffing, are there:
    //   - old nodes left to remove?
    // 	 - new nodes to insert?
    // 	 deal with them!
    //
    // The lists are only iterated over once, with an exception for the nodes in `old` that
    // are visited in the fourth part of the diff and in the `removeNodes` loop.
    // ## Diffing
    //
    // Reading https://github.com/localvoid/ivi/blob/ddc09d06abaef45248e6133f7040d00d3c6be853/packages/ivi/src/vdom/implementation.ts#L617-L837
    // may be good for context on longest increasing subsequence-based logic for moving nodes.
    //
    // In order to diff keyed lists, one has to
    //
    // 1) match nodes in both lists, per key, and update them accordingly
    // 2) create the nodes present in the new list, but absent in the old one
    // 3) remove the nodes present in the old list, but absent in the new one
    // 4) figure out what nodes in 1) to move in order to minimize the DOM operations.
    //
    // To achieve 1) one can create a dictionary of keys => index (for the old list), then iterate
    // over the new list and for each new vnode, find the corresponding vnode in the old list using
    // the map.
    // 2) is achieved in the same step: if a new node has no corresponding entry in the map, it is new
    // and must be created.
    // For the removals, we actually remove the nodes that have been updated from the old list.
    // The nodes that remain in that list after 1) and 2) have been performed can be safely removed.
    // The fourth step is a bit more complex and relies on the longest increasing subsequence (LIS)
    // algorithm.
    //
    // the longest increasing subsequence is the list of nodes that can remain in place. Imagine going
    // from `1,2,3,4,5` to `4,5,1,2,3` where the numbers are not necessarily the keys, but the indices
    // corresponding to the keyed nodes in the old list (keyed nodes `e,d,c,b,a` => `b,a,e,d,c` would
    //  match the above lists, for example).
    //
    // In there are two increasing subsequences: `4,5` and `1,2,3`, the latter being the longest. We
    // can update those nodes without moving them, and only call `insertNode` on `4` and `5`.
    //
    // @localvoid adapted the algo to also support node deletions and insertions (the `lis` is actually
    // the longest increasing subsequence *of old nodes still present in the new list*).
    //
    // It is a general algorithm that is fireproof in all circumstances, but it requires the allocation
    // and the construction of a `key => oldIndex` map, and three arrays (one with `newIndex => oldIndex`,
    // the `LIS` and a temporary one to create the LIS).
    //
    // So we cheat where we can: if the tails of the lists are identical, they are guaranteed to be part of
    // the LIS and can be updated without moving them.
    //
    // If two nodes are swapped, they are guaranteed not to be part of the LIS, and must be moved (with
    // the exception of the last node if the list is fully reversed).
    //
    // ## Finding the next sibling.
    //
    // `updateNode()` and `createNode()` expect a nextSibling parameter to perform DOM operations.
    // When the list is being traversed top-down, at any index, the DOM nodes up to the previous
    // vnode reflect the content of the new list, whereas the rest of the DOM nodes reflect the old
    // list. The next sibling must be looked for in the old list using `getNextSibling(... oldStart + 1 ...)`.
    //
    // In the other scenarios (swaps, upwards traversal, map-based diff),
    // the new vnodes list is traversed upwards. The DOM nodes at the bottom of the list reflect the
    // bottom part of the new vnodes list, and we can use the `v.dom`  value of the previous node
    // as the next sibling (cached in the `nextSibling` variable).
    // ## DOM node moves
    //
    // In most scenarios `updateNode()` and `createNode()` perform the DOM operations. However,
    // this is not the case if the node moved (second and fourth part of the diff algo). We move
    // the old DOM nodes before updateNode runs because it enables us to use the cached `nextSibling`
    // variable rather than fetching it using `getNextSibling()`.
    //
    // The fourth part of the diff currently inserts nodes unconditionally, leading to issues
    // like #1791 and #1999. We need to be smarter about those situations where adjascent old
    // nodes remain together in the new list in a way that isn't covered by parts one and
    // three of the diff algo.
    function updateNodes(parent, old, vnodes, hooks, nextSibling, ns) {
        if (old === vnodes || old == null && vnodes == null) return;
        else if (old == null || old.length === 0) createNodes(parent, vnodes, 0, vnodes.length, hooks, nextSibling, ns);
        else if (vnodes == null || vnodes.length === 0) removeNodes(parent, old, 0, old.length);
        else {
            var isOldKeyed = old[0] != null && old[0].key != null;
            var isKeyed = vnodes[0] != null && vnodes[0].key != null;
            var start = 0, oldStart = 0;
            if (!isOldKeyed) while(oldStart < old.length && old[oldStart] == null)oldStart++;
            if (!isKeyed) while(start < vnodes.length && vnodes[start] == null)start++;
            if (isKeyed === null && isOldKeyed == null) return; // both lists are full of nulls
            if (isOldKeyed !== isKeyed) {
                removeNodes(parent, old, oldStart, old.length);
                createNodes(parent, vnodes, start, vnodes.length, hooks, nextSibling, ns);
            } else if (!isKeyed) {
                // Don't index past the end of either list (causes deopts).
                var commonLength = old.length < vnodes.length ? old.length : vnodes.length;
                // Rewind if necessary to the first non-null index on either side.
                // We could alternatively either explicitly create or remove nodes when `start !== oldStart`
                // but that would be optimizing for sparse lists which are more rare than dense ones.
                start = start < oldStart ? start : oldStart;
                for(; start < commonLength; start++){
                    o = old[start];
                    v = vnodes[start];
                    if (o === v || o == null && v == null) continue;
                    else if (o == null) createNode(parent, v, hooks, ns, getNextSibling(old, start + 1, nextSibling));
                    else if (v == null) removeNode(parent, o);
                    else updateNode(parent, o, v, hooks, getNextSibling(old, start + 1, nextSibling), ns);
                }
                if (old.length > commonLength) removeNodes(parent, old, start, old.length);
                if (vnodes.length > commonLength) createNodes(parent, vnodes, start, vnodes.length, hooks, nextSibling, ns);
            } else {
                // keyed diff
                var oldEnd = old.length - 1, end = vnodes.length - 1, map, o, v, oe, ve, topSibling;
                // bottom-up
                while(oldEnd >= oldStart && end >= start){
                    oe = old[oldEnd];
                    ve = vnodes[end];
                    if (oe.key !== ve.key) break;
                    if (oe !== ve) updateNode(parent, oe, ve, hooks, nextSibling, ns);
                    if (ve.dom != null) nextSibling = ve.dom;
                    oldEnd--, end--;
                }
                // top-down
                while(oldEnd >= oldStart && end >= start){
                    o = old[oldStart];
                    v = vnodes[start];
                    if (o.key !== v.key) break;
                    oldStart++, start++;
                    if (o !== v) updateNode(parent, o, v, hooks, getNextSibling(old, oldStart, nextSibling), ns);
                }
                // swaps and list reversals
                while(oldEnd >= oldStart && end >= start){
                    if (start === end) break;
                    if (o.key !== ve.key || oe.key !== v.key) break;
                    topSibling = getNextSibling(old, oldStart, nextSibling);
                    moveNodes(parent, oe, topSibling);
                    if (oe !== v) updateNode(parent, oe, v, hooks, topSibling, ns);
                    if (++start <= --end) moveNodes(parent, o, nextSibling);
                    if (o !== ve) updateNode(parent, o, ve, hooks, nextSibling, ns);
                    if (ve.dom != null) nextSibling = ve.dom;
                    oldStart++;
                    oldEnd--;
                    oe = old[oldEnd];
                    ve = vnodes[end];
                    o = old[oldStart];
                    v = vnodes[start];
                }
                // bottom up once again
                while(oldEnd >= oldStart && end >= start){
                    if (oe.key !== ve.key) break;
                    if (oe !== ve) updateNode(parent, oe, ve, hooks, nextSibling, ns);
                    if (ve.dom != null) nextSibling = ve.dom;
                    oldEnd--, end--;
                    oe = old[oldEnd];
                    ve = vnodes[end];
                }
                if (start > end) removeNodes(parent, old, oldStart, oldEnd + 1);
                else if (oldStart > oldEnd) createNodes(parent, vnodes, start, end + 1, hooks, nextSibling, ns);
                else {
                    // inspired by ivi https://github.com/ivijs/ivi/ by Boris Kaul
                    var originalNextSibling = nextSibling, vnodesLength = end - start + 1, oldIndices = new Array(vnodesLength), li = 0, i = 0, pos = 2147483647, matched = 0, map, lisIndices;
                    for(i = 0; i < vnodesLength; i++)oldIndices[i] = -1;
                    for(i = end; i >= start; i--){
                        if (map == null) map = getKeyMap(old, oldStart, oldEnd + 1);
                        ve = vnodes[i];
                        var oldIndex = map[ve.key];
                        if (oldIndex != null) {
                            pos = oldIndex < pos ? oldIndex : -1 // becomes -1 if nodes were re-ordered
                            ;
                            oldIndices[i - start] = oldIndex;
                            oe = old[oldIndex];
                            old[oldIndex] = null;
                            if (oe !== ve) updateNode(parent, oe, ve, hooks, nextSibling, ns);
                            if (ve.dom != null) nextSibling = ve.dom;
                            matched++;
                        }
                    }
                    nextSibling = originalNextSibling;
                    if (matched !== oldEnd - oldStart + 1) removeNodes(parent, old, oldStart, oldEnd + 1);
                    if (matched === 0) createNodes(parent, vnodes, start, end + 1, hooks, nextSibling, ns);
                    else {
                        if (pos === -1) {
                            // the indices of the indices of the items that are part of the
                            // longest increasing subsequence in the oldIndices list
                            lisIndices = makeLisIndices(oldIndices);
                            li = lisIndices.length - 1;
                            for(i = end; i >= start; i--){
                                v = vnodes[i];
                                if (oldIndices[i - start] === -1) createNode(parent, v, hooks, ns, nextSibling);
                                else if (lisIndices[li] === i - start) li--;
                                else moveNodes(parent, v, nextSibling);
                                if (v.dom != null) nextSibling = vnodes[i].dom;
                            }
                        } else for(i = end; i >= start; i--){
                            v = vnodes[i];
                            if (oldIndices[i - start] === -1) createNode(parent, v, hooks, ns, nextSibling);
                            if (v.dom != null) nextSibling = vnodes[i].dom;
                        }
                    }
                }
            }
        }
    }
    function updateNode(parent, old, vnode, hooks, nextSibling, ns) {
        var oldTag = old.tag, tag = vnode.tag;
        if (oldTag === tag) {
            vnode.state = old.state;
            vnode.events = old.events;
            if (shouldNotUpdate(vnode, old)) return;
            if (typeof oldTag === "string") {
                if (vnode.attrs != null) updateLifecycle(vnode.attrs, vnode, hooks);
                switch(oldTag){
                    case "#":
                        updateText(old, vnode);
                        break;
                    case "<":
                        updateHTML(parent, old, vnode, ns, nextSibling);
                        break;
                    case "[":
                        updateFragment(parent, old, vnode, hooks, nextSibling, ns);
                        break;
                    default:
                        updateElement(old, vnode, hooks, ns);
                }
            } else updateComponent(parent, old, vnode, hooks, nextSibling, ns);
        } else {
            removeNode(parent, old);
            createNode(parent, vnode, hooks, ns, nextSibling);
        }
    }
    function updateText(old, vnode) {
        if (old.children.toString() !== vnode.children.toString()) old.dom.nodeValue = vnode.children;
        vnode.dom = old.dom;
    }
    function updateHTML(parent, old, vnode, ns, nextSibling) {
        if (old.children !== vnode.children) {
            removeHTML(parent, old);
            createHTML(parent, vnode, ns, nextSibling);
        } else {
            vnode.dom = old.dom;
            vnode.domSize = old.domSize;
            vnode.instance = old.instance;
        }
    }
    function updateFragment(parent, old, vnode, hooks, nextSibling, ns) {
        updateNodes(parent, old.children, vnode.children, hooks, nextSibling, ns);
        var domSize = 0, children = vnode.children;
        vnode.dom = null;
        if (children != null) {
            for(var i = 0; i < children.length; i++){
                var child = children[i];
                if (child != null && child.dom != null) {
                    if (vnode.dom == null) vnode.dom = child.dom;
                    domSize += child.domSize || 1;
                }
            }
            if (domSize !== 1) vnode.domSize = domSize;
        }
    }
    function updateElement(old, vnode, hooks, ns) {
        var element = vnode.dom = old.dom;
        ns = getNameSpace(vnode) || ns;
        if (vnode.tag === "textarea") {
            if (vnode.attrs == null) vnode.attrs = {
            };
            if (vnode.text != null) {
                vnode.attrs.value = vnode.text //FIXME handle multiple children
                ;
                vnode.text = undefined;
            }
        }
        updateAttrs(vnode, old.attrs, vnode.attrs, ns);
        if (!maybeSetContentEditable(vnode)) {
            if (old.text != null && vnode.text != null && vnode.text !== "") {
                if (old.text.toString() !== vnode.text.toString()) old.dom.firstChild.nodeValue = vnode.text;
            } else {
                if (old.text != null) old.children = [
                    Vnode("#", undefined, undefined, old.text, undefined, old.dom.firstChild)
                ];
                if (vnode.text != null) vnode.children = [
                    Vnode("#", undefined, undefined, vnode.text, undefined, undefined)
                ];
                updateNodes(element, old.children, vnode.children, hooks, null, ns);
            }
        }
    }
    function updateComponent(parent, old, vnode, hooks, nextSibling, ns) {
        vnode.instance = Vnode.normalize(callHook.call(vnode.state.view, vnode));
        if (vnode.instance === vnode) throw Error("A view cannot return the vnode it received as argument");
        updateLifecycle(vnode.state, vnode, hooks);
        if (vnode.attrs != null) updateLifecycle(vnode.attrs, vnode, hooks);
        if (vnode.instance != null) {
            if (old.instance == null) createNode(parent, vnode.instance, hooks, ns, nextSibling);
            else updateNode(parent, old.instance, vnode.instance, hooks, nextSibling, ns);
            vnode.dom = vnode.instance.dom;
            vnode.domSize = vnode.instance.domSize;
        } else if (old.instance != null) {
            removeNode(parent, old.instance);
            vnode.dom = undefined;
            vnode.domSize = 0;
        } else {
            vnode.dom = old.dom;
            vnode.domSize = old.domSize;
        }
    }
    function getKeyMap(vnodes, start, end) {
        var map = Object.create(null);
        for(; start < end; start++){
            var vnode = vnodes[start];
            if (vnode != null) {
                var key = vnode.key;
                if (key != null) map[key] = start;
            }
        }
        return map;
    }
    // Lifted from ivi https://github.com/ivijs/ivi/
    // takes a list of unique numbers (-1 is special and can
    // occur multiple times) and returns an array with the indices
    // of the items that are part of the longest increasing
    // subsequece
    var lisTemp = [];
    function makeLisIndices(a) {
        var result = [
            0
        ];
        var u = 0, v = 0, i = 0;
        var il = lisTemp.length = a.length;
        for(var i = 0; i < il; i++)lisTemp[i] = a[i];
        for(var i = 0; i < il; ++i){
            if (a[i] === -1) continue;
            var j = result[result.length - 1];
            if (a[j] < a[i]) {
                lisTemp[i] = j;
                result.push(i);
                continue;
            }
            u = 0;
            v = result.length - 1;
            while(u < v){
                // Fast integer average without overflow.
                // eslint-disable-next-line no-bitwise
                var c = (u >>> 1) + (v >>> 1) + (u & v & 1);
                if (a[result[c]] < a[i]) u = c + 1;
                else v = c;
            }
            if (a[i] < a[result[u]]) {
                if (u > 0) lisTemp[i] = result[u - 1];
                result[u] = i;
            }
        }
        u = result.length;
        v = result[u - 1];
        while(u-- > 0){
            result[u] = v;
            v = lisTemp[v];
        }
        lisTemp.length = 0;
        return result;
    }
    function getNextSibling(vnodes, i, nextSibling) {
        for(; i < vnodes.length; i++){
            if (vnodes[i] != null && vnodes[i].dom != null) return vnodes[i].dom;
        }
        return nextSibling;
    }
    // This covers a really specific edge case:
    // - Parent node is keyed and contains child
    // - Child is removed, returns unresolved promise in `onbeforeremove`
    // - Parent node is moved in keyed diff
    // - Remaining children still need moved appropriately
    //
    // Ideally, I'd track removed nodes as well, but that introduces a lot more
    // complexity and I'm not exactly interested in doing that.
    function moveNodes(parent, vnode, nextSibling) {
        var frag = $doc.createDocumentFragment();
        moveChildToFrag(parent, frag, vnode);
        insertNode(parent, frag, nextSibling);
    }
    function moveChildToFrag(parent, frag, vnode) {
        // Dodge the recursion overhead in a few of the most common cases.
        while(vnode.dom != null && vnode.dom.parentNode === parent){
            if (typeof vnode.tag !== "string") {
                vnode = vnode.instance;
                if (vnode != null) continue;
            } else if (vnode.tag === "<") for(var i = 0; i < vnode.instance.length; i++)frag.appendChild(vnode.instance[i]);
            else if (vnode.tag !== "[") // Don't recurse for text nodes *or* elements, just fragments
            frag.appendChild(vnode.dom);
            else if (vnode.children.length === 1) {
                vnode = vnode.children[0];
                if (vnode != null) continue;
            } else for(var i = 0; i < vnode.children.length; i++){
                var child = vnode.children[i];
                if (child != null) moveChildToFrag(parent, frag, child);
            }
            break;
        }
    }
    function insertNode(parent, dom, nextSibling) {
        if (nextSibling != null) parent.insertBefore(dom, nextSibling);
        else parent.appendChild(dom);
    }
    function maybeSetContentEditable(vnode) {
        if (vnode.attrs == null || vnode.attrs.contenteditable == null && vnode.attrs.contentEditable == null // property
        ) return false;
        var children = vnode.children;
        if (children != null && children.length === 1 && children[0].tag === "<") {
            var content = children[0].children;
            if (vnode.dom.innerHTML !== content) vnode.dom.innerHTML = content;
        } else if (vnode.text != null || children != null && children.length !== 0) throw new Error("Child node of a contenteditable must be trusted");
        return true;
    }
    //remove
    function removeNodes(parent, vnodes, start, end) {
        for(var i = start; i < end; i++){
            var vnode = vnodes[i];
            if (vnode != null) removeNode(parent, vnode);
        }
    }
    function removeNode(parent, vnode) {
        var mask = 0;
        var original = vnode.state;
        var stateResult, attrsResult;
        if (typeof vnode.tag !== "string" && typeof vnode.state.onbeforeremove === "function") {
            var result = callHook.call(vnode.state.onbeforeremove, vnode);
            if (result != null && typeof result.then === "function") {
                mask = 1;
                stateResult = result;
            }
        }
        if (vnode.attrs && typeof vnode.attrs.onbeforeremove === "function") {
            var result = callHook.call(vnode.attrs.onbeforeremove, vnode);
            if (result != null && typeof result.then === "function") {
                // eslint-disable-next-line no-bitwise
                mask |= 2;
                attrsResult = result;
            }
        }
        checkState(vnode, original);
        // If we can, try to fast-path it and avoid all the overhead of awaiting
        if (!mask) {
            onremove(vnode);
            removeChild(parent, vnode);
        } else {
            if (stateResult != null) {
                var next = function() {
                    // eslint-disable-next-line no-bitwise
                    if (mask & 1) {
                        mask &= 2;
                        if (!mask) reallyRemove();
                    }
                };
                stateResult.then(next, next);
            }
            if (attrsResult != null) {
                var next = function() {
                    // eslint-disable-next-line no-bitwise
                    if (mask & 2) {
                        mask &= 1;
                        if (!mask) reallyRemove();
                    }
                };
                attrsResult.then(next, next);
            }
        }
        function reallyRemove() {
            checkState(vnode, original);
            onremove(vnode);
            removeChild(parent, vnode);
        }
    }
    function removeHTML(parent, vnode) {
        for(var i = 0; i < vnode.instance.length; i++)parent.removeChild(vnode.instance[i]);
    }
    function removeChild(parent, vnode) {
        // Dodge the recursion overhead in a few of the most common cases.
        while(vnode.dom != null && vnode.dom.parentNode === parent){
            if (typeof vnode.tag !== "string") {
                vnode = vnode.instance;
                if (vnode != null) continue;
            } else if (vnode.tag === "<") removeHTML(parent, vnode);
            else {
                if (vnode.tag !== "[") {
                    parent.removeChild(vnode.dom);
                    if (!Array.isArray(vnode.children)) break;
                }
                if (vnode.children.length === 1) {
                    vnode = vnode.children[0];
                    if (vnode != null) continue;
                } else for(var i = 0; i < vnode.children.length; i++){
                    var child = vnode.children[i];
                    if (child != null) removeChild(parent, child);
                }
            }
            break;
        }
    }
    function onremove(vnode) {
        if (typeof vnode.tag !== "string" && typeof vnode.state.onremove === "function") callHook.call(vnode.state.onremove, vnode);
        if (vnode.attrs && typeof vnode.attrs.onremove === "function") callHook.call(vnode.attrs.onremove, vnode);
        if (typeof vnode.tag !== "string") {
            if (vnode.instance != null) onremove(vnode.instance);
        } else {
            var children = vnode.children;
            if (Array.isArray(children)) for(var i = 0; i < children.length; i++){
                var child = children[i];
                if (child != null) onremove(child);
            }
        }
    }
    //attrs
    function setAttrs(vnode, attrs, ns) {
        for(var key in attrs)setAttr(vnode, key, null, attrs[key], ns);
    }
    function setAttr(vnode, key, old, value, ns) {
        if (key === "key" || key === "is" || value == null || isLifecycleMethod(key) || old === value && !isFormAttribute(vnode, key) && typeof value !== "object") return;
        if (key[0] === "o" && key[1] === "n") return updateEvent(vnode, key, value);
        if (key.slice(0, 6) === "xlink:") vnode.dom.setAttributeNS("http://www.w3.org/1999/xlink", key.slice(6), value);
        else if (key === "style") updateStyle(vnode.dom, old, value);
        else if (hasPropertyKey(vnode, key, ns)) {
            if (key === "value") {
                // Only do the coercion if we're actually going to check the value.
                /* eslint-disable no-implicit-coercion */ //setting input[value] to same value by typing on focused element moves cursor to end in Chrome
                if ((vnode.tag === "input" || vnode.tag === "textarea") && vnode.dom.value === "" + value && vnode.dom === activeElement()) return;
                //setting select[value] to same value while having select open blinks select dropdown in Chrome
                if (vnode.tag === "select" && old !== null && vnode.dom.value === "" + value) return;
                //setting option[value] to same value while having select open blinks select dropdown in Chrome
                if (vnode.tag === "option" && old !== null && vnode.dom.value === "" + value) return;
            /* eslint-enable no-implicit-coercion */ }
            // If you assign an input type that is not supported by IE 11 with an assignment expression, an error will occur.
            if (vnode.tag === "input" && key === "type") vnode.dom.setAttribute(key, value);
            else vnode.dom[key] = value;
        } else if (typeof value === "boolean") {
            if (value) vnode.dom.setAttribute(key, "");
            else vnode.dom.removeAttribute(key);
        } else vnode.dom.setAttribute(key === "className" ? "class" : key, value);
    }
    function removeAttr(vnode, key, old, ns) {
        if (key === "key" || key === "is" || old == null || isLifecycleMethod(key)) return;
        if (key[0] === "o" && key[1] === "n" && !isLifecycleMethod(key)) updateEvent(vnode, key, undefined);
        else if (key === "style") updateStyle(vnode.dom, old, null);
        else if (hasPropertyKey(vnode, key, ns) && key !== "className" && !(key === "value" && (vnode.tag === "option" || vnode.tag === "select" && vnode.dom.selectedIndex === -1 && vnode.dom === activeElement())) && !(vnode.tag === "input" && key === "type")) vnode.dom[key] = null;
        else {
            var nsLastIndex = key.indexOf(":");
            if (nsLastIndex !== -1) key = key.slice(nsLastIndex + 1);
            if (old !== false) vnode.dom.removeAttribute(key === "className" ? "class" : key);
        }
    }
    function setLateSelectAttrs(vnode, attrs) {
        if ("value" in attrs) {
            if (attrs.value === null) {
                if (vnode.dom.selectedIndex !== -1) vnode.dom.value = null;
            } else {
                var normalized = "" + attrs.value // eslint-disable-line no-implicit-coercion
                ;
                if (vnode.dom.value !== normalized || vnode.dom.selectedIndex === -1) vnode.dom.value = normalized;
            }
        }
        if ("selectedIndex" in attrs) setAttr(vnode, "selectedIndex", null, attrs.selectedIndex, undefined);
    }
    function updateAttrs(vnode, old, attrs, ns) {
        if (attrs != null) for(var key in attrs)setAttr(vnode, key, old && old[key], attrs[key], ns);
        var val;
        if (old != null) {
            for(var key in old)if ((val = old[key]) != null && (attrs == null || attrs[key] == null)) removeAttr(vnode, key, val, ns);
        }
    }
    function isFormAttribute(vnode, attr) {
        return attr === "value" || attr === "checked" || attr === "selectedIndex" || attr === "selected" && vnode.dom === activeElement() || vnode.tag === "option" && vnode.dom.parentNode === $doc.activeElement;
    }
    function isLifecycleMethod(attr) {
        return attr === "oninit" || attr === "oncreate" || attr === "onupdate" || attr === "onremove" || attr === "onbeforeremove" || attr === "onbeforeupdate";
    }
    function hasPropertyKey(vnode, key, ns) {
        // Filter out namespaced keys
        return ns === undefined && // If it's a custom element, just keep it.
        (vnode.tag.indexOf("-") > -1 || vnode.attrs != null && vnode.attrs.is || // If it's a normal element, let's try to avoid a few browser bugs.
        key !== "href" && key !== "list" && key !== "form" && key !== "width" && key !== "height" // && key !== "type"
        ) && key in vnode.dom;
    }
    //style
    var uppercaseRegex = /[A-Z]/g;
    function toLowerCase(capital) {
        return "-" + capital.toLowerCase();
    }
    function normalizeKey(key) {
        return key[0] === "-" && key[1] === "-" ? key : key === "cssFloat" ? "float" : key.replace(uppercaseRegex, toLowerCase);
    }
    function updateStyle(element, old, style) {
        if (old === style) ;
        else if (style == null) // New style is missing, just clear it.
        element.style.cssText = "";
        else if (typeof style !== "object") // New style is a string, let engine deal with patching.
        element.style.cssText = style;
        else if (old == null || typeof old !== "object") {
            // `old` is missing or a string, `style` is an object.
            element.style.cssText = "";
            // Add new style properties
            for(var key in style){
                var value = style[key];
                if (value != null) element.style.setProperty(normalizeKey(key), String(value));
            }
        } else {
            // Both old & new are (different) objects.
            // Update style properties that have changed
            for(var key in style){
                var value = style[key];
                if (value != null && (value = String(value)) !== String(old[key])) element.style.setProperty(normalizeKey(key), value);
            }
            // Remove style properties that no longer exist
            for(var key in old)if (old[key] != null && style[key] == null) element.style.removeProperty(normalizeKey(key));
        }
    }
    // Here's an explanation of how this works:
    // 1. The event names are always (by design) prefixed by `on`.
    // 2. The EventListener interface accepts either a function or an object
    //    with a `handleEvent` method.
    // 3. The object does not inherit from `Object.prototype`, to avoid
    //    any potential interference with that (e.g. setters).
    // 4. The event name is remapped to the handler before calling it.
    // 5. In function-based event handlers, `ev.target === this`. We replicate
    //    that below.
    // 6. In function-based event handlers, `return false` prevents the default
    //    action and stops event propagation. We replicate that below.
    function EventDict() {
        // Save this, so the current redraw is correctly tracked.
        this._ = currentRedraw;
    }
    EventDict.prototype = Object.create(null);
    EventDict.prototype.handleEvent = function(ev) {
        var handler = this["on" + ev.type];
        var result;
        if (typeof handler === "function") result = handler.call(ev.currentTarget, ev);
        else if (typeof handler.handleEvent === "function") handler.handleEvent(ev);
        if (this._ && ev.redraw !== false) (0, this._)();
        if (result === false) {
            ev.preventDefault();
            ev.stopPropagation();
        }
    };
    //event
    function updateEvent(vnode, key, value) {
        if (vnode.events != null) {
            if (vnode.events[key] === value) return;
            if (value != null && (typeof value === "function" || typeof value === "object")) {
                if (vnode.events[key] == null) vnode.dom.addEventListener(key.slice(2), vnode.events, false);
                vnode.events[key] = value;
            } else {
                if (vnode.events[key] != null) vnode.dom.removeEventListener(key.slice(2), vnode.events, false);
                vnode.events[key] = undefined;
            }
        } else if (value != null && (typeof value === "function" || typeof value === "object")) {
            vnode.events = new EventDict();
            vnode.dom.addEventListener(key.slice(2), vnode.events, false);
            vnode.events[key] = value;
        }
    }
    //lifecycle
    function initLifecycle(source, vnode, hooks) {
        if (typeof source.oninit === "function") callHook.call(source.oninit, vnode);
        if (typeof source.oncreate === "function") hooks.push(callHook.bind(source.oncreate, vnode));
    }
    function updateLifecycle(source, vnode, hooks) {
        if (typeof source.onupdate === "function") hooks.push(callHook.bind(source.onupdate, vnode));
    }
    function shouldNotUpdate(vnode, old) {
        do {
            if (vnode.attrs != null && typeof vnode.attrs.onbeforeupdate === "function") {
                var force = callHook.call(vnode.attrs.onbeforeupdate, vnode, old);
                if (force !== undefined && !force) break;
            }
            if (typeof vnode.tag !== "string" && typeof vnode.state.onbeforeupdate === "function") {
                var force = callHook.call(vnode.state.onbeforeupdate, vnode, old);
                if (force !== undefined && !force) break;
            }
            return false;
        }while (false) // eslint-disable-line no-constant-condition
        vnode.dom = old.dom;
        vnode.domSize = old.domSize;
        vnode.instance = old.instance;
        // One would think having the actual latest attributes would be ideal,
        // but it doesn't let us properly diff based on our current internal
        // representation. We have to save not only the old DOM info, but also
        // the attributes used to create it, as we diff *that*, not against the
        // DOM directly (with a few exceptions in `setAttr`). And, of course, we
        // need to save the children and text as they are conceptually not
        // unlike special "attributes" internally.
        vnode.attrs = old.attrs;
        vnode.children = old.children;
        vnode.text = old.text;
        return true;
    }
    return function(dom, vnodes, redraw) {
        if (!dom) throw new TypeError("Ensure the DOM element being passed to m.route/m.mount/m.render is not undefined.");
        var hooks = [];
        var active = activeElement();
        var namespace = dom.namespaceURI;
        // First time rendering into a node clears it out
        if (dom.vnodes == null) dom.textContent = "";
        vnodes = Vnode.normalizeChildren(Array.isArray(vnodes) ? vnodes : [
            vnodes
        ]);
        var prevRedraw = currentRedraw;
        try {
            currentRedraw = typeof redraw === "function" ? redraw : undefined;
            updateNodes(dom, dom.vnodes, vnodes, hooks, null, namespace === "http://www.w3.org/1999/xhtml" ? undefined : namespace);
        } finally{
            currentRedraw = prevRedraw;
        }
        dom.vnodes = vnodes;
        // `document.activeElement` can return null: https://html.spec.whatwg.org/multipage/interaction.html#dom-document-activeelement
        if (active != null && activeElement() !== active && typeof active.focus === "function") active.focus();
        for(var i = 0; i < hooks.length; i++)hooks[i]();
    };
};

},{"../render/vnode":"6srsp"}],"4LuTr":[function(require,module,exports) {
"use strict";
var Vnode = require("../render/vnode");
module.exports = function(render, schedule, console) {
    var subscriptions = [];
    var rendering = false;
    var pending = false;
    function sync() {
        if (rendering) throw new Error("Nested m.redraw.sync() call");
        rendering = true;
        for(var i = 0; i < subscriptions.length; i += 2)try {
            render(subscriptions[i], Vnode(subscriptions[i + 1]), redraw);
        } catch (e) {
            console.error(e);
        }
        rendering = false;
    }
    function redraw() {
        if (!pending) {
            pending = true;
            schedule(function() {
                pending = false;
                sync();
            });
        }
    }
    redraw.sync = sync;
    function mount(root, component) {
        if (component != null && component.view == null && typeof component !== "function") throw new TypeError("m.mount(element, component) expects a component, not a vnode");
        var index = subscriptions.indexOf(root);
        if (index >= 0) {
            subscriptions.splice(index, 2);
            render(root, [], redraw);
        }
        if (component != null) {
            subscriptions.push(root, component);
            render(root, Vnode(component), redraw);
        }
    }
    return {
        mount: mount,
        redraw: redraw
    };
};

},{"../render/vnode":"6srsp"}],"1vd7c":[function(require,module,exports) {
"use strict";
var buildPathname = require("../pathname/build");
module.exports = function($window, Promise, oncompletion) {
    var callbackCount = 0;
    function PromiseProxy(executor) {
        return new Promise(executor);
    }
    // In case the global Promise is some userland library's where they rely on
    // `foo instanceof this.constructor`, `this.constructor.resolve(value)`, or
    // similar. Let's *not* break them.
    PromiseProxy.prototype = Promise.prototype;
    PromiseProxy.__proto__ = Promise // eslint-disable-line no-proto
    ;
    function makeRequest(factory) {
        return function(url, args) {
            if (typeof url !== "string") {
                args = url;
                url = url.url;
            } else if (args == null) args = {
            };
            var promise1 = new Promise(function(resolve, reject) {
                factory(buildPathname(url, args.params), args, function(data) {
                    if (typeof args.type === "function") {
                        if (Array.isArray(data)) for(var i = 0; i < data.length; i++)data[i] = new args.type(data[i]);
                        else data = new args.type(data);
                    }
                    resolve(data);
                }, reject);
            });
            if (args.background === true) return promise1;
            var count = 0;
            function complete() {
                if (--count === 0 && typeof oncompletion === "function") oncompletion();
            }
            function wrap(promise) {
                var then = promise.then;
                // Set the constructor, so engines know to not await or resolve
                // this as a native promise. At the time of writing, this is
                // only necessary for V8, but their behavior is the correct
                // behavior per spec. See this spec issue for more details:
                // https://github.com/tc39/ecma262/issues/1577. Also, see the
                // corresponding comment in `request/tests/test-request.js` for
                // a bit more background on the issue at hand.
                promise.constructor = PromiseProxy;
                promise.then = function() {
                    count++;
                    var next = then.apply(promise, arguments);
                    next.then(complete, function(e) {
                        complete();
                        if (count === 0) throw e;
                    });
                    return wrap(next);
                };
                return promise;
            }
            return wrap(promise1);
        };
    }
    function hasHeader(args, name) {
        for(var key in args.headers){
            if (({
            }).hasOwnProperty.call(args.headers, key) && name.test(key)) return true;
        }
        return false;
    }
    return {
        request: makeRequest(function(url, args, resolve, reject) {
            var method = args.method != null ? args.method.toUpperCase() : "GET";
            var body = args.body;
            var assumeJSON = (args.serialize == null || args.serialize === JSON.serialize) && !(body instanceof $window.FormData);
            var responseType = args.responseType || (typeof args.extract === "function" ? "" : "json");
            var xhr = new $window.XMLHttpRequest(), aborted = false;
            var original = xhr, replacedAbort;
            var abort = xhr.abort;
            xhr.abort = function() {
                aborted = true;
                abort.call(this);
            };
            xhr.open(method, url, args.async !== false, typeof args.user === "string" ? args.user : undefined, typeof args.password === "string" ? args.password : undefined);
            if (assumeJSON && body != null && !hasHeader(args, /^content-type$/i)) xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
            if (typeof args.deserialize !== "function" && !hasHeader(args, /^accept$/i)) xhr.setRequestHeader("Accept", "application/json, text/*");
            if (args.withCredentials) xhr.withCredentials = args.withCredentials;
            if (args.timeout) xhr.timeout = args.timeout;
            xhr.responseType = responseType;
            for(var key in args.headers)if (({
            }).hasOwnProperty.call(args.headers, key)) xhr.setRequestHeader(key, args.headers[key]);
            xhr.onreadystatechange = function(ev) {
                // Don't throw errors on xhr.abort().
                if (aborted) return;
                if (ev.target.readyState === 4) try {
                    var success = ev.target.status >= 200 && ev.target.status < 300 || ev.target.status === 304 || /^file:\/\//i.test(url);
                    // When the response type isn't "" or "text",
                    // `xhr.responseText` is the wrong thing to use.
                    // Browsers do the right thing and throw here, and we
                    // should honor that and do the right thing by
                    // preferring `xhr.response` where possible/practical.
                    var response = ev.target.response, message;
                    if (responseType === "json") // For IE and Edge, which don't implement
                    // `responseType: "json"`.
                    {
                        if (!ev.target.responseType && typeof args.extract !== "function") response = JSON.parse(ev.target.responseText);
                    } else if (!responseType || responseType === "text") // Only use this default if it's text. If a parsed
                    // document is needed on old IE and friends (all
                    // unsupported), the user should use a custom
                    // `config` instead. They're already using this at
                    // their own risk.
                    {
                        if (response == null) response = ev.target.responseText;
                    }
                    if (typeof args.extract === "function") {
                        response = args.extract(ev.target, args);
                        success = true;
                    } else if (typeof args.deserialize === "function") response = args.deserialize(response);
                    if (success) resolve(response);
                    else {
                        try {
                            message = ev.target.responseText;
                        } catch (e) {
                            message = response;
                        }
                        var error = new Error(message);
                        error.code = ev.target.status;
                        error.response = response;
                        reject(error);
                    }
                } catch (e) {
                    reject(e);
                }
            };
            if (typeof args.config === "function") {
                xhr = args.config(xhr, args, url) || xhr;
                // Propagate the `abort` to any replacement XHR as well.
                if (xhr !== original) {
                    replacedAbort = xhr.abort;
                    xhr.abort = function() {
                        aborted = true;
                        replacedAbort.call(this);
                    };
                }
            }
            if (body == null) xhr.send();
            else if (typeof args.serialize === "function") xhr.send(args.serialize(body));
            else if (body instanceof $window.FormData) xhr.send(body);
            else xhr.send(JSON.stringify(body));
        }),
        jsonp: makeRequest(function(url, args, resolve, reject) {
            var callbackName = args.callbackName || "_mithril_" + Math.round(Math.random() * 10000000000000000) + "_" + callbackCount++;
            var script = $window.document.createElement("script");
            $window[callbackName] = function(data) {
                delete $window[callbackName];
                script.parentNode.removeChild(script);
                resolve(data);
            };
            script.onerror = function() {
                delete $window[callbackName];
                script.parentNode.removeChild(script);
                reject(new Error("JSONP request failed"));
            };
            script.src = url + (url.indexOf("?") < 0 ? "?" : "&") + encodeURIComponent(args.callbackKey || "callback") + "=" + encodeURIComponent(callbackName);
            $window.document.documentElement.appendChild(script);
        })
    };
};

},{"../pathname/build":"3I4yB"}],"3I4yB":[function(require,module,exports) {
"use strict";
var buildQueryString = require("../querystring/build");
var assign = require("./assign");
// Returns `path` from `template` + `params`
module.exports = function(template, params) {
    if (/:([^\/\.-]+)(\.{3})?:/.test(template)) throw new SyntaxError("Template parameter names *must* be separated");
    if (params == null) return template;
    var queryIndex = template.indexOf("?");
    var hashIndex = template.indexOf("#");
    var queryEnd = hashIndex < 0 ? template.length : hashIndex;
    var pathEnd = queryIndex < 0 ? queryEnd : queryIndex;
    var path = template.slice(0, pathEnd);
    var query = {
    };
    assign(query, params);
    var resolved = path.replace(/:([^\/\.-]+)(\.{3})?/g, function(m, key, variadic) {
        delete query[key];
        // If no such parameter exists, don't interpolate it.
        if (params[key] == null) return m;
        // Escape normal parameters, but not variadic ones.
        return variadic ? params[key] : encodeURIComponent(String(params[key]));
    });
    // In case the template substitution adds new query/hash parameters.
    var newQueryIndex = resolved.indexOf("?");
    var newHashIndex = resolved.indexOf("#");
    var newQueryEnd = newHashIndex < 0 ? resolved.length : newHashIndex;
    var newPathEnd = newQueryIndex < 0 ? newQueryEnd : newQueryIndex;
    var result = resolved.slice(0, newPathEnd);
    if (queryIndex >= 0) result += template.slice(queryIndex, queryEnd);
    if (newQueryIndex >= 0) result += (queryIndex < 0 ? "?" : "&") + resolved.slice(newQueryIndex, newQueryEnd);
    var querystring = buildQueryString(query);
    if (querystring) result += (queryIndex < 0 && newQueryIndex < 0 ? "?" : "&") + querystring;
    if (hashIndex >= 0) result += template.slice(hashIndex);
    if (newHashIndex >= 0) result += (hashIndex < 0 ? "" : "&") + resolved.slice(newHashIndex);
    return result;
};

},{"../querystring/build":"k3mZd","./assign":"imdNC"}],"k3mZd":[function(require,module,exports) {
"use strict";
module.exports = function(object) {
    if (Object.prototype.toString.call(object) !== "[object Object]") return "";
    var args = [];
    for(var key1 in object)destructure(key1, object[key1]);
    function destructure(key, value) {
        if (Array.isArray(value)) {
            for(var i = 0; i < value.length; i++){
                destructure(key + "[" + i + "]", value[i]);
            }
        } else if (Object.prototype.toString.call(value) === "[object Object]") {
            for(var i in value){
                destructure(key + "[" + i + "]", value[i]);
            }
        } else args.push(encodeURIComponent(key) + (value != null && value !== "" ? "=" + encodeURIComponent(value) : ""));
    }
    return args.join("&");
};

},{}],"imdNC":[function(require,module,exports) {
"use strict";
module.exports = Object.assign || function(target, source) {
    if (source) Object.keys(source).forEach(function(key) {
        target[key] = source[key];
    });
};

},{}],"hqfSN":[function(require,module,exports) {
"use strict";
var mountRedraw = require("./mount-redraw");
module.exports = require("./api/router")(window, mountRedraw);

},{"./mount-redraw":"3IzBr","./api/router":"cD68c"}],"cD68c":[function(require,module,exports) {
"use strict";
var Vnode = require("../render/vnode");
var m = require("../render/hyperscript");
var Promise = require("../promise/promise");
var buildPathname = require("../pathname/build");
var parsePathname = require("../pathname/parse");
var compileTemplate = require("../pathname/compileTemplate");
var assign = require("../pathname/assign");
var sentinel = {
};
module.exports = function($window, mountRedraw) {
    var fireAsync;
    function setPath(path, data, options) {
        path = buildPathname(path, data);
        if (fireAsync != null) {
            fireAsync();
            var state = options ? options.state : null;
            var title = options ? options.title : null;
            if (options && options.replace) $window.history.replaceState(state, title, route1.prefix + path);
            else $window.history.pushState(state, title, route1.prefix + path);
        } else $window.location.href = route1.prefix + path;
    }
    var currentResolver = sentinel, component, attrs1, currentPath, lastUpdate;
    var SKIP = route1.SKIP = {
    };
    function route1(root, defaultRoute, routes) {
        if (root == null) throw new Error("Ensure the DOM element that was passed to `m.route` is not undefined");
        // 0 = start
        // 1 = init
        // 2 = ready
        var state = 0;
        var compiled = Object.keys(routes).map(function(route) {
            if (route[0] !== "/") throw new SyntaxError("Routes must start with a `/`");
            if (/:([^\/\.-]+)(\.{3})?:/.test(route)) throw new SyntaxError("Route parameter names must be separated with either `/`, `.`, or `-`");
            return {
                route: route,
                component: routes[route],
                check: compileTemplate(route)
            };
        });
        var callAsync = typeof setImmediate === "function" ? setImmediate : setTimeout;
        var p = Promise.resolve();
        var scheduled = false;
        var onremove;
        fireAsync = null;
        if (defaultRoute != null) {
            var defaultData = parsePathname(defaultRoute);
            if (!compiled.some(function(i) {
                return i.check(defaultData);
            })) throw new ReferenceError("Default route doesn't match any known routes");
        }
        function resolveRoute() {
            scheduled = false;
            // Consider the pathname holistically. The prefix might even be invalid,
            // but that's not our problem.
            var prefix = $window.location.hash;
            if (route1.prefix[0] !== "#") {
                prefix = $window.location.search + prefix;
                if (route1.prefix[0] !== "?") {
                    prefix = $window.location.pathname + prefix;
                    if (prefix[0] !== "/") prefix = "/" + prefix;
                }
            }
            // This seemingly useless `.concat()` speeds up the tests quite a bit,
            // since the representation is consistently a relatively poorly
            // optimized cons string.
            var path = prefix.concat().replace(/(?:%[a-f89][a-f0-9])+/gim, decodeURIComponent).slice(route1.prefix.length);
            var data = parsePathname(path);
            assign(data.params, $window.history.state);
            function fail() {
                if (path === defaultRoute) throw new Error("Could not resolve default route " + defaultRoute);
                setPath(defaultRoute, null, {
                    replace: true
                });
            }
            loop(0);
            function loop(i) {
                // 0 = init
                // 1 = scheduled
                // 2 = done
                for(; i < compiled.length; i++)if (compiled[i].check(data)) {
                    var payload = compiled[i].component;
                    var matchedRoute = compiled[i].route;
                    var localComp = payload;
                    var update = lastUpdate = function(comp) {
                        if (update !== lastUpdate) return;
                        if (comp === SKIP) return loop(i + 1);
                        component = comp != null && (typeof comp.view === "function" || typeof comp === "function") ? comp : "div";
                        attrs1 = data.params, currentPath = path, lastUpdate = null;
                        currentResolver = payload.render ? payload : null;
                        if (state === 2) mountRedraw.redraw();
                        else {
                            state = 2;
                            mountRedraw.redraw.sync();
                        }
                    };
                    // There's no understating how much I *wish* I could
                    // use `async`/`await` here...
                    if (payload.view || typeof payload === "function") {
                        payload = {
                        };
                        update(localComp);
                    } else if (payload.onmatch) p.then(function() {
                        return payload.onmatch(data.params, path, matchedRoute);
                    }).then(update, fail);
                    else update("div");
                    return;
                }
                fail();
            }
        }
        // Set it unconditionally so `m.route.set` and `m.route.Link` both work,
        // even if neither `pushState` nor `hashchange` are supported. It's
        // cleared if `hashchange` is used, since that makes it automatically
        // async.
        fireAsync = function() {
            if (!scheduled) {
                scheduled = true;
                callAsync(resolveRoute);
            }
        };
        if (typeof $window.history.pushState === "function") {
            onremove = function() {
                $window.removeEventListener("popstate", fireAsync, false);
            };
            $window.addEventListener("popstate", fireAsync, false);
        } else if (route1.prefix[0] === "#") {
            fireAsync = null;
            onremove = function() {
                $window.removeEventListener("hashchange", resolveRoute, false);
            };
            $window.addEventListener("hashchange", resolveRoute, false);
        }
        return mountRedraw.mount(root, {
            onbeforeupdate: function() {
                state = state ? 2 : 1;
                return !(!state || sentinel === currentResolver);
            },
            oncreate: resolveRoute,
            onremove: onremove,
            view: function() {
                if (!state || sentinel === currentResolver) return;
                // Wrap in a fragment to preserve existing key semantics
                var vnode = [
                    Vnode(component, attrs1.key, attrs1)
                ];
                if (currentResolver) vnode = currentResolver.render(vnode[0]);
                return vnode;
            }
        });
    }
    route1.set = function(path, data, options) {
        if (lastUpdate != null) {
            options = options || {
            };
            options.replace = true;
        }
        lastUpdate = null;
        setPath(path, data, options);
    };
    route1.get = function() {
        return currentPath;
    };
    route1.prefix = "#!";
    route1.Link = {
        view: function(vnode) {
            var options = vnode.attrs.options;
            // Remove these so they don't get overwritten
            var attrs = {
            }, onclick, href;
            assign(attrs, vnode.attrs);
            // The first two are internal, but the rest are magic attributes
            // that need censored to not screw up rendering.
            attrs.selector = attrs.options = attrs.key = attrs.oninit = attrs.oncreate = attrs.onbeforeupdate = attrs.onupdate = attrs.onbeforeremove = attrs.onremove = null;
            // Do this now so we can get the most current `href` and `disabled`.
            // Those attributes may also be specified in the selector, and we
            // should honor that.
            var child = m(vnode.attrs.selector || "a", attrs, vnode.children);
            // Let's provide a *right* way to disable a route link, rather than
            // letting people screw up accessibility on accident.
            //
            // The attribute is coerced so users don't get surprised over
            // `disabled: 0` resulting in a button that's somehow routable
            // despite being visibly disabled.
            if (child.attrs.disabled = Boolean(child.attrs.disabled)) {
                child.attrs.href = null;
                child.attrs["aria-disabled"] = "true";
                // If you *really* do want to do this on a disabled link, use
                // an `oncreate` hook to add it.
                child.attrs.onclick = null;
            } else {
                onclick = child.attrs.onclick;
                href = child.attrs.href;
                child.attrs.href = route1.prefix + href;
                child.attrs.onclick = function(e) {
                    var result;
                    if (typeof onclick === "function") result = onclick.call(e.currentTarget, e);
                    else if (onclick == null || typeof onclick !== "object") ;
                    else if (typeof onclick.handleEvent === "function") onclick.handleEvent(e);
                    // Adapted from React Router's implementation:
                    // https://github.com/ReactTraining/react-router/blob/520a0acd48ae1b066eb0b07d6d4d1790a1d02482/packages/react-router-dom/modules/Link.js
                    //
                    // Try to be flexible and intuitive in how we handle links.
                    // Fun fact: links aren't as obvious to get right as you
                    // would expect. There's a lot more valid ways to click a
                    // link than this, and one might want to not simply click a
                    // link, but right click or command-click it to copy the
                    // link target, etc. Nope, this isn't just for blind people.
                    if (// Skip if `onclick` prevented default
                    result !== false && !e.defaultPrevented && (e.button === 0 || e.which === 0 || e.which === 1) && (!e.currentTarget.target || e.currentTarget.target === "_self") && // No modifier keys
                    !e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey) {
                        e.preventDefault();
                        e.redraw = false;
                        route1.set(href, null, options);
                    }
                };
            }
            return child;
        }
    };
    route1.param = function(key) {
        return attrs1 && key != null ? attrs1[key] : attrs1;
    };
    return route1;
};

},{"../render/vnode":"6srsp","../render/hyperscript":"gVN62","../promise/promise":"jcHh3","../pathname/build":"3I4yB","../pathname/parse":"dIkXY","../pathname/compileTemplate":"e47NK","../pathname/assign":"imdNC"}],"dIkXY":[function(require,module,exports) {
"use strict";
var parseQueryString = require("../querystring/parse");
// Returns `{path, params}` from `url`
module.exports = function(url) {
    var queryIndex = url.indexOf("?");
    var hashIndex = url.indexOf("#");
    var queryEnd = hashIndex < 0 ? url.length : hashIndex;
    var pathEnd = queryIndex < 0 ? queryEnd : queryIndex;
    var path = url.slice(0, pathEnd).replace(/\/{2,}/g, "/");
    if (!path) path = "/";
    else {
        if (path[0] !== "/") path = "/" + path;
        if (path.length > 1 && path[path.length - 1] === "/") path = path.slice(0, -1);
    }
    return {
        path: path,
        params: queryIndex < 0 ? {
        } : parseQueryString(url.slice(queryIndex + 1, queryEnd))
    };
};

},{"../querystring/parse":"f2JYz"}],"f2JYz":[function(require,module,exports) {
"use strict";
module.exports = function(string) {
    if (string === "" || string == null) return {
    };
    if (string.charAt(0) === "?") string = string.slice(1);
    var entries = string.split("&"), counters = {
    }, data = {
    };
    for(var i = 0; i < entries.length; i++){
        var entry = entries[i].split("=");
        var key = decodeURIComponent(entry[0]);
        var value = entry.length === 2 ? decodeURIComponent(entry[1]) : "";
        if (value === "true") value = true;
        else if (value === "false") value = false;
        var levels = key.split(/\]\[?|\[/);
        var cursor = data;
        if (key.indexOf("[") > -1) levels.pop();
        for(var j = 0; j < levels.length; j++){
            var level = levels[j], nextLevel = levels[j + 1];
            var isNumber = nextLevel == "" || !isNaN(parseInt(nextLevel, 10));
            if (level === "") {
                var key = levels.slice(0, j).join();
                if (counters[key] == null) counters[key] = Array.isArray(cursor) ? cursor.length : 0;
                level = counters[key]++;
            } else if (level === "__proto__") break;
            if (j === levels.length - 1) cursor[level] = value;
            else {
                // Read own properties exclusively to disallow indirect
                // prototype pollution
                var desc = Object.getOwnPropertyDescriptor(cursor, level);
                if (desc != null) desc = desc.value;
                if (desc == null) cursor[level] = desc = isNumber ? [] : {
                };
                cursor = desc;
            }
        }
    }
    return data;
};

},{}],"e47NK":[function(require,module,exports) {
"use strict";
var parsePathname = require("./parse");
// Compiles a template into a function that takes a resolved path (without query
// strings) and returns an object containing the template parameters with their
// parsed values. This expects the input of the compiled template to be the
// output of `parsePathname`. Note that it does *not* remove query parameters
// specified in the template.
module.exports = function(template) {
    var templateData = parsePathname(template);
    var templateKeys = Object.keys(templateData.params);
    var keys = [];
    var regexp = new RegExp("^" + templateData.path.replace(// I escape literal text so people can use things like `:file.:ext` or
    // `:lang-:locale` in routes. This is all merged into one pass so I
    // don't also accidentally escape `-` and make it harder to detect it to
    // ban it from template parameters.
    /:([^\/.-]+)(\.{3}|\.(?!\.)|-)?|[\\^$*+.()|\[\]{}]/g, function(m, key, extra) {
        if (key == null) return "\\" + m;
        keys.push({
            k: key,
            r: extra === "..."
        });
        if (extra === "...") return "(.*)";
        if (extra === ".") return "([^/]+)\\.";
        return "([^/]+)" + (extra || "");
    }) + "$");
    return function(data) {
        // First, check the params. Usually, there isn't any, and it's just
        // checking a static set.
        for(var i = 0; i < templateKeys.length; i++){
            if (templateData.params[templateKeys[i]] !== data.params[templateKeys[i]]) return false;
        }
        // If no interpolations exist, let's skip all the ceremony
        if (!keys.length) return regexp.test(data.path);
        var values = regexp.exec(data.path);
        if (values == null) return false;
        for(var i = 0; i < keys.length; i++)data.params[keys[i].k] = keys[i].r ? values[i + 1] : decodeURIComponent(values[i + 1]);
        return true;
    };
};

},{"./parse":"dIkXY"}],"h8DOh":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _authedNavJsx = require("./nav/authed-nav.jsx");
var _authedNavJsxDefault = parcelHelpers.interopDefault(_authedNavJsx);
var _buttonJsx = require("./button/button.jsx");
var _buttonJsxDefault = parcelHelpers.interopDefault(_buttonJsx);
var _breadcrumbJsx = require("./breadcrumb/breadcrumb.jsx");
var _breadcrumbJsxDefault = parcelHelpers.interopDefault(_breadcrumbJsx);
var _cardJsx = require("./card/card.jsx");
var _cardJsxDefault = parcelHelpers.interopDefault(_cardJsx);
var _containerJsx = require("./container/container.jsx");
var _containerJsxDefault = parcelHelpers.interopDefault(_containerJsx);
var _datePickerJsx = require("./date-picker/date-picker.jsx");
var _datePickerJsxDefault = parcelHelpers.interopDefault(_datePickerJsx);
var _dateRangeJsx = require("./date-range/date-range.jsx");
var _dateRangeJsxDefault = parcelHelpers.interopDefault(_dateRangeJsx);
var _iconButtonJsx = require("./icon-button/icon-button.jsx");
var _iconButtonJsxDefault = parcelHelpers.interopDefault(_iconButtonJsx);
var _modalJsx = require("./modal/modal.jsx");
var _modalJsxDefault = parcelHelpers.interopDefault(_modalJsx);
var _popoverJsx = require("./popover/popover.jsx");
var _popoverJsxDefault = parcelHelpers.interopDefault(_popoverJsx);
var _selectJsx = require("./select/select.jsx");
var _selectJsxDefault = parcelHelpers.interopDefault(_selectJsx);
var _spinnerJsx = require("./spinner/spinner.jsx");
var _spinnerJsxDefault = parcelHelpers.interopDefault(_spinnerJsx);
var _stepsJsx = require("./steps/steps.jsx");
var _stepsJsxDefault = parcelHelpers.interopDefault(_stepsJsx);
var _textFieldJsx = require("./text-field/text-field.jsx");
var _textFieldJsxDefault = parcelHelpers.interopDefault(_textFieldJsx);
var _toastOutletJsx = require("./toast-outlet/toast-outlet.jsx");
var _toastOutletJsxDefault = parcelHelpers.interopDefault(_toastOutletJsx);
var _unauthedNavJsx = require("./nav/unauthed-nav.jsx");
var _unauthedNavJsxDefault = parcelHelpers.interopDefault(_unauthedNavJsx);
module.exports = {
    AuthedNav: _authedNavJsxDefault.default,
    Button: _buttonJsxDefault.default,
    Breadcrumb: _breadcrumbJsxDefault.default,
    Card: _cardJsxDefault.default,
    Container: _containerJsxDefault.default,
    DatePicker: _datePickerJsxDefault.default,
    DateRange: _dateRangeJsxDefault.default,
    IconButton: _iconButtonJsxDefault.default,
    Modal: _modalJsxDefault.default,
    Popover: _popoverJsxDefault.default,
    Select: _selectJsxDefault.default,
    Spinner: _spinnerJsxDefault.default,
    Steps: _stepsJsxDefault.default,
    TextField: _textFieldJsxDefault.default,
    ToastOutlet: _toastOutletJsxDefault.default,
    UnauthedNav: _unauthedNavJsxDefault.default
};

},{"./nav/authed-nav.jsx":"lqIBz","./button/button.jsx":"9ihWA","./breadcrumb/breadcrumb.jsx":"gApSA","./card/card.jsx":"6lE74","./container/container.jsx":"gLTp9","./date-picker/date-picker.jsx":"ewFz0","./date-range/date-range.jsx":"d9uGO","./icon-button/icon-button.jsx":"9YaD7","./modal/modal.jsx":"5GWKD","./popover/popover.jsx":"aEmG5","./select/select.jsx":"eAg79","./spinner/spinner.jsx":"kFciu","./steps/steps.jsx":"hJEcR","./text-field/text-field.jsx":"kHRlH","./toast-outlet/toast-outlet.jsx":"hwIGQ","./nav/unauthed-nav.jsx":"34kZD","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"lqIBz":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _mithril = require("mithril");
var _mithrilDefault = parcelHelpers.interopDefault(_mithril);
var _ripple = require("@material/ripple");
var _containerJsx = require("../container/container.jsx");
var _containerJsxDefault = parcelHelpers.interopDefault(_containerJsx);
var _iconButtonJsx = require("../icon-button/icon-button.jsx");
var _iconButtonJsxDefault = parcelHelpers.interopDefault(_iconButtonJsx);
var _authedNavScss = require("./authed-nav.scss");
var _keepPng = require("../../../assets/img/logo/keep.png");
var _keepPngDefault = parcelHelpers.interopDefault(_keepPng);
class AuthedNav {
    constructor(){
        this.notificationsContainer = null;
        this.notificationsRipple = null;
    }
    oninit() {
    }
    oncreate() {
    // this.notificationsRipple = new MDCRipple(this.notificationsContainer);
    }
    onremove() {
    }
    view() {
        return _mithrilDefault.default("div", {
            class: "authedNav"
        }, _mithrilDefault.default(_containerJsxDefault.default, null, _mithrilDefault.default("div", {
            class: "authedNav__content"
        }, _mithrilDefault.default("h2", {
            class: "authedNav__title"
        }, _mithrilDefault.default(_mithrilDefault.default.route.Link, {
            class: "authedNav__link",
            href: "/"
        }, _mithrilDefault.default("img", {
            src: _keepPngDefault.default
        }))), _mithrilDefault.default("div", {
            class: "authedNav__spacer"
        }), _mithrilDefault.default("div", {
            class: "authedNav__notifications"
        }, _mithrilDefault.default("div", {
            class: "mdc-ripple-surface"
        }), _mithrilDefault.default("span", {
            class: "authedNav__notifications__count"
        }, "1"), _mithrilDefault.default("span", {
            class: "material-icons"
        }, "notifications")), _mithrilDefault.default(_iconButtonJsxDefault.default, {
            icon: "settings"
        }))));
    }
}
module.exports = AuthedNav;

},{"mithril":"a7UJj","@material/ripple":"13Hhl","../container/container.jsx":"gLTp9","../icon-button/icon-button.jsx":"9YaD7","./authed-nav.scss":"78RVy","../../../assets/img/logo/keep.png":"1w9S7","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"13Hhl":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "util", ()=>_util
);
/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */ var _util = require("./util");
var _adapter = require("./adapter");
parcelHelpers.exportAll(_adapter, exports);
var _component = require("./component");
parcelHelpers.exportAll(_component, exports);
var _constants = require("./constants");
parcelHelpers.exportAll(_constants, exports);
var _foundation = require("./foundation");
parcelHelpers.exportAll(_foundation, exports);
var _types = require("./types");
parcelHelpers.exportAll(_types, exports);

},{"./util":"hRWxM","./adapter":"6ezqL","./component":"l2wqP","./constants":"6iDKb","./foundation":"5cEAm","./types":"8iBfX","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"hRWxM":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "supportsCssVariables", ()=>supportsCssVariables
);
parcelHelpers.export(exports, "getNormalizedEventCoords", ()=>getNormalizedEventCoords
);
/**
 * Stores result from supportsCssVariables to avoid redundant processing to
 * detect CSS custom variable support.
 */ var supportsCssVariables_;
function supportsCssVariables(windowObj, forceRefresh) {
    if (forceRefresh === void 0) forceRefresh = false;
    var CSS = windowObj.CSS;
    var supportsCssVars = supportsCssVariables_;
    if (typeof supportsCssVariables_ === 'boolean' && !forceRefresh) return supportsCssVariables_;
    var supportsFunctionPresent = CSS && typeof CSS.supports === 'function';
    if (!supportsFunctionPresent) return false;
    var explicitlySupportsCssVars = CSS.supports('--css-vars', 'yes');
    // See: https://bugs.webkit.org/show_bug.cgi?id=154669
    // See: README section on Safari
    var weAreFeatureDetectingSafari10plus = CSS.supports('(--css-vars: yes)') && CSS.supports('color', '#00000000');
    supportsCssVars = explicitlySupportsCssVars || weAreFeatureDetectingSafari10plus;
    if (!forceRefresh) supportsCssVariables_ = supportsCssVars;
    return supportsCssVars;
}
function getNormalizedEventCoords(evt, pageOffset, clientRect) {
    if (!evt) return {
        x: 0,
        y: 0
    };
    var x = pageOffset.x, y = pageOffset.y;
    var documentX = x + clientRect.left;
    var documentY = y + clientRect.top;
    var normalizedX;
    var normalizedY;
    // Determine touch point relative to the ripple container.
    if (evt.type === 'touchstart') {
        var touchEvent = evt;
        normalizedX = touchEvent.changedTouches[0].pageX - documentX;
        normalizedY = touchEvent.changedTouches[0].pageY - documentY;
    } else {
        var mouseEvent = evt;
        normalizedX = mouseEvent.pageX - documentX;
        normalizedY = mouseEvent.pageY - documentY;
    }
    return {
        x: normalizedX,
        y: normalizedY
    };
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"ciiiV":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"6ezqL":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"l2wqP":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "MDCRipple", ()=>MDCRipple1
);
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */ var _tslib = require("tslib");
var _component = require("@material/base/component");
var _events = require("@material/dom/events");
var _ponyfill = require("@material/dom/ponyfill");
var _foundation = require("./foundation");
var _util = require("./util");
var MDCRipple1 = function(_super) {
    _tslib.__extends(MDCRipple, _super);
    function MDCRipple() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.disabled = false;
        return _this;
    }
    MDCRipple.attachTo = function(root, opts) {
        if (opts === void 0) opts = {
            isUnbounded: undefined
        };
        var ripple = new MDCRipple(root);
        // Only override unbounded behavior if option is explicitly specified
        if (opts.isUnbounded !== undefined) ripple.unbounded = opts.isUnbounded;
        return ripple;
    };
    MDCRipple.createAdapter = function(instance) {
        return {
            addClass: function(className) {
                return instance.root.classList.add(className);
            },
            browserSupportsCssVars: function() {
                return _util.supportsCssVariables(window);
            },
            computeBoundingRect: function() {
                return instance.root.getBoundingClientRect();
            },
            containsEventTarget: function(target) {
                return instance.root.contains(target);
            },
            deregisterDocumentInteractionHandler: function(evtType, handler) {
                return document.documentElement.removeEventListener(evtType, handler, _events.applyPassive());
            },
            deregisterInteractionHandler: function(evtType, handler) {
                return instance.root.removeEventListener(evtType, handler, _events.applyPassive());
            },
            deregisterResizeHandler: function(handler) {
                return window.removeEventListener('resize', handler);
            },
            getWindowPageOffset: function() {
                return {
                    x: window.pageXOffset,
                    y: window.pageYOffset
                };
            },
            isSurfaceActive: function() {
                return _ponyfill.matches(instance.root, ':active');
            },
            isSurfaceDisabled: function() {
                return Boolean(instance.disabled);
            },
            isUnbounded: function() {
                return Boolean(instance.unbounded);
            },
            registerDocumentInteractionHandler: function(evtType, handler) {
                return document.documentElement.addEventListener(evtType, handler, _events.applyPassive());
            },
            registerInteractionHandler: function(evtType, handler) {
                return instance.root.addEventListener(evtType, handler, _events.applyPassive());
            },
            registerResizeHandler: function(handler) {
                return window.addEventListener('resize', handler);
            },
            removeClass: function(className) {
                return instance.root.classList.remove(className);
            },
            updateCssVariable: function(varName, value) {
                return instance.root.style.setProperty(varName, value);
            }
        };
    };
    Object.defineProperty(MDCRipple.prototype, "unbounded", {
        get: function() {
            return Boolean(this.isUnbounded);
        },
        set: function(unbounded) {
            this.isUnbounded = Boolean(unbounded);
            this.setUnbounded();
        },
        enumerable: false,
        configurable: true
    });
    MDCRipple.prototype.activate = function() {
        this.foundation.activate();
    };
    MDCRipple.prototype.deactivate = function() {
        this.foundation.deactivate();
    };
    MDCRipple.prototype.layout = function() {
        this.foundation.layout();
    };
    MDCRipple.prototype.getDefaultFoundation = function() {
        return new _foundation.MDCRippleFoundation(MDCRipple.createAdapter(this));
    };
    MDCRipple.prototype.initialSyncWithDOM = function() {
        var root = this.root;
        this.isUnbounded = 'mdcRippleIsUnbounded' in root.dataset;
    };
    /**
     * Closure Compiler throws an access control error when directly accessing a
     * protected or private property inside a getter/setter, like unbounded above.
     * By accessing the protected property inside a method, we solve that problem.
     * That's why this function exists.
     */ MDCRipple.prototype.setUnbounded = function() {
        this.foundation.setUnbounded(Boolean(this.isUnbounded));
    };
    return MDCRipple;
}(_component.MDCComponent);

},{"tslib":"j55WF","@material/base/component":"4ISbx","@material/dom/events":"fUICs","@material/dom/ponyfill":"cB7q4","./foundation":"5cEAm","./util":"hRWxM","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"j55WF":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "__extends", ()=>__extends
);
parcelHelpers.export(exports, "__assign", ()=>__assign
);
parcelHelpers.export(exports, "__rest", ()=>__rest
);
parcelHelpers.export(exports, "__decorate", ()=>__decorate
);
parcelHelpers.export(exports, "__param", ()=>__param
);
parcelHelpers.export(exports, "__metadata", ()=>__metadata
);
parcelHelpers.export(exports, "__awaiter", ()=>__awaiter
);
parcelHelpers.export(exports, "__generator", ()=>__generator
);
parcelHelpers.export(exports, "__createBinding", ()=>__createBinding
);
parcelHelpers.export(exports, "__exportStar", ()=>__exportStar
);
parcelHelpers.export(exports, "__values", ()=>__values
);
parcelHelpers.export(exports, "__read", ()=>__read
);
/** @deprecated */ parcelHelpers.export(exports, "__spread", ()=>__spread
);
/** @deprecated */ parcelHelpers.export(exports, "__spreadArrays", ()=>__spreadArrays
);
parcelHelpers.export(exports, "__spreadArray", ()=>__spreadArray
);
parcelHelpers.export(exports, "__await", ()=>__await
);
parcelHelpers.export(exports, "__asyncGenerator", ()=>__asyncGenerator
);
parcelHelpers.export(exports, "__asyncDelegator", ()=>__asyncDelegator
);
parcelHelpers.export(exports, "__asyncValues", ()=>__asyncValues
);
parcelHelpers.export(exports, "__makeTemplateObject", ()=>__makeTemplateObject
);
parcelHelpers.export(exports, "__importStar", ()=>__importStar
);
parcelHelpers.export(exports, "__importDefault", ()=>__importDefault
);
parcelHelpers.export(exports, "__classPrivateFieldGet", ()=>__classPrivateFieldGet
);
parcelHelpers.export(exports, "__classPrivateFieldSet", ()=>__classPrivateFieldSet
);
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ /* global Reflect, Promise */ var extendStatics = function(d1, b1) {
    extendStatics = Object.setPrototypeOf || ({
        __proto__: []
    }) instanceof Array && function(d, b) {
        d.__proto__ = b;
    } || function(d, b) {
        for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    };
    return extendStatics(d1, b1);
};
function __extends(d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
        this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for(var s, i = 1, n = arguments.length; i < n; i++){
            s = arguments[i];
            for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function __rest(s, e) {
    var t = {
    };
    for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function") {
        for(var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++)if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
    }
    return t;
}
function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function __param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}
function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}
function __generator(thisArg, body) {
    var _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    }, f, y, t, g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
}
var __createBinding = Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, {
        enumerable: true,
        get: function() {
            return m[k];
        }
    });
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
};
function __exportStar(m, o) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}
function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function() {
            if (o && i >= o.length) o = void 0;
            return {
                value: o && o[i++],
                done: !o
            };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while((n === void 0 || n-- > 0) && !(r = i.next()).done)ar.push(r.value);
    } catch (error) {
        e = {
            error: error
        };
    } finally{
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally{
            if (e) throw e.error;
        }
    }
    return ar;
}
function __spread() {
    for(var ar = [], i = 0; i < arguments.length; i++)ar = ar.concat(__read(arguments[i]));
    return ar;
}
function __spreadArrays() {
    for(var s = 0, i = 0, il = arguments.length; i < il; i++)s += arguments[i].length;
    for(var r = Array(s), k = 0, i = 0; i < il; i++)for(var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)r[k] = a[j];
    return r;
}
function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) {
        for(var i = 0, l = from.length, ar; i < l; i++)if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}
function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}
function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    function verb(n) {
        if (g[n]) i[n] = function(v) {
            return new Promise(function(a, b) {
                q.push([
                    n,
                    v,
                    a,
                    b
                ]) > 1 || resume(n, v);
            });
        };
    }
    function resume(n, v) {
        try {
            step(g[n](v));
        } catch (e) {
            settle(q[0][3], e);
        }
    }
    function step(r) {
        r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
    }
    function fulfill(value) {
        resume("next", value);
    }
    function reject(value) {
        resume("throw", value);
    }
    function settle(f, v) {
        if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
    }
    return i = {
    }, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
        return this;
    }, i;
}
function __asyncDelegator(o) {
    var i, p;
    function verb(n, f) {
        i[n] = o[n] ? function(v) {
            return (p = !p) ? {
                value: __await(o[n](v)),
                done: n === "return"
            } : f ? f(v) : v;
        } : f;
    }
    return i = {
    }, verb("next"), verb("throw", function(e) {
        throw e;
    }), verb("return"), i[Symbol.iterator] = function() {
        return this;
    }, i;
}
function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    function verb(n) {
        i[n] = o[n] && function(v) {
            return new Promise(function(resolve, reject) {
                v = o[n](v), settle(resolve, reject, v.done, v.value);
            });
        };
    }
    function settle(resolve, reject, d, v1) {
        Promise.resolve(v1).then(function(v) {
            resolve({
                value: v,
                done: d
            });
        }, reject);
    }
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {
    }, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
        return this;
    }, i);
}
function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) Object.defineProperty(cooked, "raw", {
        value: raw
    });
    else cooked.raw = raw;
    return cooked;
}
var __setModuleDefault = Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
};
function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {
    };
    if (mod != null) {
        for(var k in mod)if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    }
    __setModuleDefault(result, mod);
    return result;
}
function __importDefault(mod) {
    return mod && mod.__esModule ? mod : {
        default: mod
    };
}
function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}
function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"4ISbx":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "MDCComponent", ()=>MDCComponent1
);
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */ var _tslib = require("tslib");
var _foundation = require("./foundation");
var MDCComponent1 = function() {
    function MDCComponent(root, foundation) {
        var args = [];
        for(var _i = 2; _i < arguments.length; _i++)args[_i - 2] = arguments[_i];
        this.root = root;
        this.initialize.apply(this, _tslib.__spreadArray([], _tslib.__read(args)));
        // Note that we initialize foundation here and not within the constructor's
        // default param so that this.root is defined and can be used within the
        // foundation class.
        this.foundation = foundation === undefined ? this.getDefaultFoundation() : foundation;
        this.foundation.init();
        this.initialSyncWithDOM();
    }
    MDCComponent.attachTo = function(root) {
        // Subclasses which extend MDCBase should provide an attachTo() method that takes a root element and
        // returns an instantiated component with its root set to that element. Also note that in the cases of
        // subclasses, an explicit foundation class will not have to be passed in; it will simply be initialized
        // from getDefaultFoundation().
        return new MDCComponent(root, new _foundation.MDCFoundation({
        }));
    };
    /* istanbul ignore next: method param only exists for typing purposes; it does not need to be unit tested */ MDCComponent.prototype.initialize = function() {
        var _args = [];
        for(var _i = 0; _i < arguments.length; _i++)_args[_i] = arguments[_i];
    // Subclasses can override this to do any additional setup work that would be considered part of a
    // "constructor". Essentially, it is a hook into the parent constructor before the foundation is
    // initialized. Any additional arguments besides root and foundation will be passed in here.
    };
    MDCComponent.prototype.getDefaultFoundation = function() {
        // Subclasses must override this method to return a properly configured foundation class for the
        // component.
        throw new Error("Subclasses must override getDefaultFoundation to return a properly configured foundation class");
    };
    MDCComponent.prototype.initialSyncWithDOM = function() {
    // Subclasses should override this method if they need to perform work to synchronize with a host DOM
    // object. An example of this would be a form control wrapper that needs to synchronize its internal state
    // to some property or attribute of the host DOM. Please note: this is *not* the place to perform DOM
    // reads/writes that would cause layout / paint, as this is called synchronously from within the constructor.
    };
    MDCComponent.prototype.destroy = function() {
        // Subclasses may implement this method to release any resources / deregister any listeners they have
        // attached. An example of this might be deregistering a resize event from the window object.
        this.foundation.destroy();
    };
    MDCComponent.prototype.listen = function(evtType, handler, options) {
        this.root.addEventListener(evtType, handler, options);
    };
    MDCComponent.prototype.unlisten = function(evtType, handler, options) {
        this.root.removeEventListener(evtType, handler, options);
    };
    /**
     * Fires a cross-browser-compatible custom event from the component root of the given type, with the given data.
     */ MDCComponent.prototype.emit = function(evtType, evtData, shouldBubble) {
        if (shouldBubble === void 0) shouldBubble = false;
        var evt;
        if (typeof CustomEvent === 'function') evt = new CustomEvent(evtType, {
            bubbles: shouldBubble,
            detail: evtData
        });
        else {
            evt = document.createEvent('CustomEvent');
            evt.initCustomEvent(evtType, shouldBubble, false, evtData);
        }
        this.root.dispatchEvent(evt);
    };
    return MDCComponent;
}();
exports.default = MDCComponent1;

},{"tslib":"j55WF","./foundation":"6nwGh","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"6nwGh":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "MDCFoundation", ()=>MDCFoundation1
);
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */ var MDCFoundation1 = function() {
    function MDCFoundation(adapter) {
        if (adapter === void 0) adapter = {
        };
        this.adapter = adapter;
    }
    Object.defineProperty(MDCFoundation, "cssClasses", {
        get: function() {
            // Classes extending MDCFoundation should implement this method to return an object which exports every
            // CSS class the foundation class needs as a property. e.g. {ACTIVE: 'mdc-component--active'}
            return {
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCFoundation, "strings", {
        get: function() {
            // Classes extending MDCFoundation should implement this method to return an object which exports all
            // semantic strings as constants. e.g. {ARIA_ROLE: 'tablist'}
            return {
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCFoundation, "numbers", {
        get: function() {
            // Classes extending MDCFoundation should implement this method to return an object which exports all
            // of its semantic numbers as constants. e.g. {ANIMATION_DELAY_MS: 350}
            return {
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCFoundation, "defaultAdapter", {
        get: function() {
            // Classes extending MDCFoundation may choose to implement this getter in order to provide a convenient
            // way of viewing the necessary methods of an adapter. In the future, this could also be used for adapter
            // validation.
            return {
            };
        },
        enumerable: false,
        configurable: true
    });
    MDCFoundation.prototype.init = function() {
    // Subclasses should override this method to perform initialization routines (registering events, etc.)
    };
    MDCFoundation.prototype.destroy = function() {
    // Subclasses should override this method to perform de-initialization routines (de-registering events, etc.)
    };
    return MDCFoundation;
}();
exports.default = MDCFoundation1;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"fUICs":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */ /**
 * Determine whether the current browser supports passive event listeners, and
 * if so, use them.
 */ parcelHelpers.export(exports, "applyPassive", ()=>applyPassive
);
function applyPassive(globalObj) {
    if (globalObj === void 0) globalObj = window;
    return supportsPassiveOption(globalObj) ? {
        passive: true
    } : false;
}
function supportsPassiveOption(globalObj) {
    if (globalObj === void 0) globalObj = window;
    // See
    // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
    var passiveSupported = false;
    try {
        var options = {
            // This function will be called when the browser
            // attempts to access the passive property.
            get passive () {
                passiveSupported = true;
                return false;
            }
        };
        var handler = function() {
        };
        globalObj.document.addEventListener('test', handler, options);
        globalObj.document.removeEventListener('test', handler, options);
    } catch (err) {
        passiveSupported = false;
    }
    return passiveSupported;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"cB7q4":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */ /**
 * @fileoverview A "ponyfill" is a polyfill that doesn't modify the global prototype chain.
 * This makes ponyfills safer than traditional polyfills, especially for libraries like MDC.
 */ parcelHelpers.export(exports, "closest", ()=>closest
);
parcelHelpers.export(exports, "matches", ()=>matches
);
/**
 * Used to compute the estimated scroll width of elements. When an element is
 * hidden due to display: none; being applied to a parent element, the width is
 * returned as 0. However, the element will have a true width once no longer
 * inside a display: none context. This method computes an estimated width when
 * the element is hidden or returns the true width when the element is visble.
 * @param {Element} element the element whose width to estimate
 */ parcelHelpers.export(exports, "estimateScrollWidth", ()=>estimateScrollWidth
);
function closest(element, selector) {
    if (element.closest) return element.closest(selector);
    var el = element;
    while(el){
        if (matches(el, selector)) return el;
        el = el.parentElement;
    }
    return null;
}
function matches(element, selector) {
    var nativeMatches = element.matches || element.webkitMatchesSelector || element.msMatchesSelector;
    return nativeMatches.call(element, selector);
}
function estimateScrollWidth(element) {
    // Check the offsetParent. If the element inherits display: none from any
    // parent, the offsetParent property will be null (see
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetParent).
    // This check ensures we only clone the node when necessary.
    var htmlEl = element;
    if (htmlEl.offsetParent !== null) return htmlEl.scrollWidth;
    var clone = htmlEl.cloneNode(true);
    clone.style.setProperty('position', 'absolute');
    clone.style.setProperty('transform', 'translate(-9999px, -9999px)');
    document.documentElement.appendChild(clone);
    var scrollWidth = clone.scrollWidth;
    document.documentElement.removeChild(clone);
    return scrollWidth;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"5cEAm":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "MDCRippleFoundation", ()=>MDCRippleFoundation1
);
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */ var _tslib = require("tslib");
var _foundation = require("@material/base/foundation");
var _constants = require("./constants");
var _util = require("./util");
// Activation events registered on the root element of each instance for activation
var ACTIVATION_EVENT_TYPES = [
    'touchstart',
    'pointerdown',
    'mousedown',
    'keydown', 
];
// Deactivation events registered on documentElement when a pointer-related down event occurs
var POINTER_DEACTIVATION_EVENT_TYPES = [
    'touchend',
    'pointerup',
    'mouseup',
    'contextmenu', 
];
// simultaneous nested activations
var activatedTargets = [];
var MDCRippleFoundation1 = function(_super) {
    _tslib.__extends(MDCRippleFoundation, _super);
    function MDCRippleFoundation(adapter) {
        var _this = _super.call(this, _tslib.__assign(_tslib.__assign({
        }, MDCRippleFoundation.defaultAdapter), adapter)) || this;
        _this.activationAnimationHasEnded = false;
        _this.activationTimer = 0;
        _this.fgDeactivationRemovalTimer = 0;
        _this.fgScale = '0';
        _this.frame = {
            width: 0,
            height: 0
        };
        _this.initialSize = 0;
        _this.layoutFrame = 0;
        _this.maxRadius = 0;
        _this.unboundedCoords = {
            left: 0,
            top: 0
        };
        _this.activationState = _this.defaultActivationState();
        _this.activationTimerCallback = function() {
            _this.activationAnimationHasEnded = true;
            _this.runDeactivationUXLogicIfReady();
        };
        _this.activateHandler = function(e) {
            _this.activateImpl(e);
        };
        _this.deactivateHandler = function() {
            _this.deactivateImpl();
        };
        _this.focusHandler = function() {
            _this.handleFocus();
        };
        _this.blurHandler = function() {
            _this.handleBlur();
        };
        _this.resizeHandler = function() {
            _this.layout();
        };
        return _this;
    }
    Object.defineProperty(MDCRippleFoundation, "cssClasses", {
        get: function() {
            return _constants.cssClasses;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCRippleFoundation, "strings", {
        get: function() {
            return _constants.strings;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCRippleFoundation, "numbers", {
        get: function() {
            return _constants.numbers;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCRippleFoundation, "defaultAdapter", {
        get: function() {
            return {
                addClass: function() {
                    return undefined;
                },
                browserSupportsCssVars: function() {
                    return true;
                },
                computeBoundingRect: function() {
                    return {
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                        width: 0,
                        height: 0
                    };
                },
                containsEventTarget: function() {
                    return true;
                },
                deregisterDocumentInteractionHandler: function() {
                    return undefined;
                },
                deregisterInteractionHandler: function() {
                    return undefined;
                },
                deregisterResizeHandler: function() {
                    return undefined;
                },
                getWindowPageOffset: function() {
                    return {
                        x: 0,
                        y: 0
                    };
                },
                isSurfaceActive: function() {
                    return true;
                },
                isSurfaceDisabled: function() {
                    return true;
                },
                isUnbounded: function() {
                    return true;
                },
                registerDocumentInteractionHandler: function() {
                    return undefined;
                },
                registerInteractionHandler: function() {
                    return undefined;
                },
                registerResizeHandler: function() {
                    return undefined;
                },
                removeClass: function() {
                    return undefined;
                },
                updateCssVariable: function() {
                    return undefined;
                }
            };
        },
        enumerable: false,
        configurable: true
    });
    MDCRippleFoundation.prototype.init = function() {
        var _this = this;
        var supportsPressRipple = this.supportsPressRipple();
        this.registerRootHandlers(supportsPressRipple);
        if (supportsPressRipple) {
            var _a = MDCRippleFoundation.cssClasses, ROOT_1 = _a.ROOT, UNBOUNDED_1 = _a.UNBOUNDED;
            requestAnimationFrame(function() {
                _this.adapter.addClass(ROOT_1);
                if (_this.adapter.isUnbounded()) {
                    _this.adapter.addClass(UNBOUNDED_1);
                    // Unbounded ripples need layout logic applied immediately to set coordinates for both shade and ripple
                    _this.layoutInternal();
                }
            });
        }
    };
    MDCRippleFoundation.prototype.destroy = function() {
        var _this = this;
        if (this.supportsPressRipple()) {
            if (this.activationTimer) {
                clearTimeout(this.activationTimer);
                this.activationTimer = 0;
                this.adapter.removeClass(MDCRippleFoundation.cssClasses.FG_ACTIVATION);
            }
            if (this.fgDeactivationRemovalTimer) {
                clearTimeout(this.fgDeactivationRemovalTimer);
                this.fgDeactivationRemovalTimer = 0;
                this.adapter.removeClass(MDCRippleFoundation.cssClasses.FG_DEACTIVATION);
            }
            var _a = MDCRippleFoundation.cssClasses, ROOT_2 = _a.ROOT, UNBOUNDED_2 = _a.UNBOUNDED;
            requestAnimationFrame(function() {
                _this.adapter.removeClass(ROOT_2);
                _this.adapter.removeClass(UNBOUNDED_2);
                _this.removeCssVars();
            });
        }
        this.deregisterRootHandlers();
        this.deregisterDeactivationHandlers();
    };
    /**
     * @param evt Optional event containing position information.
     */ MDCRippleFoundation.prototype.activate = function(evt) {
        this.activateImpl(evt);
    };
    MDCRippleFoundation.prototype.deactivate = function() {
        this.deactivateImpl();
    };
    MDCRippleFoundation.prototype.layout = function() {
        var _this = this;
        if (this.layoutFrame) cancelAnimationFrame(this.layoutFrame);
        this.layoutFrame = requestAnimationFrame(function() {
            _this.layoutInternal();
            _this.layoutFrame = 0;
        });
    };
    MDCRippleFoundation.prototype.setUnbounded = function(unbounded) {
        var UNBOUNDED = MDCRippleFoundation.cssClasses.UNBOUNDED;
        if (unbounded) this.adapter.addClass(UNBOUNDED);
        else this.adapter.removeClass(UNBOUNDED);
    };
    MDCRippleFoundation.prototype.handleFocus = function() {
        var _this = this;
        requestAnimationFrame(function() {
            return _this.adapter.addClass(MDCRippleFoundation.cssClasses.BG_FOCUSED);
        });
    };
    MDCRippleFoundation.prototype.handleBlur = function() {
        var _this = this;
        requestAnimationFrame(function() {
            return _this.adapter.removeClass(MDCRippleFoundation.cssClasses.BG_FOCUSED);
        });
    };
    /**
     * We compute this property so that we are not querying information about the client
     * until the point in time where the foundation requests it. This prevents scenarios where
     * client-side feature-detection may happen too early, such as when components are rendered on the server
     * and then initialized at mount time on the client.
     */ MDCRippleFoundation.prototype.supportsPressRipple = function() {
        return this.adapter.browserSupportsCssVars();
    };
    MDCRippleFoundation.prototype.defaultActivationState = function() {
        return {
            activationEvent: undefined,
            hasDeactivationUXRun: false,
            isActivated: false,
            isProgrammatic: false,
            wasActivatedByPointer: false,
            wasElementMadeActive: false
        };
    };
    /**
     * supportsPressRipple Passed from init to save a redundant function call
     */ MDCRippleFoundation.prototype.registerRootHandlers = function(supportsPressRipple) {
        var e_1, _a;
        if (supportsPressRipple) {
            try {
                for(var ACTIVATION_EVENT_TYPES_1 = _tslib.__values(ACTIVATION_EVENT_TYPES), ACTIVATION_EVENT_TYPES_1_1 = ACTIVATION_EVENT_TYPES_1.next(); !ACTIVATION_EVENT_TYPES_1_1.done; ACTIVATION_EVENT_TYPES_1_1 = ACTIVATION_EVENT_TYPES_1.next()){
                    var evtType = ACTIVATION_EVENT_TYPES_1_1.value;
                    this.adapter.registerInteractionHandler(evtType, this.activateHandler);
                }
            } catch (e_1_1) {
                e_1 = {
                    error: e_1_1
                };
            } finally{
                try {
                    if (ACTIVATION_EVENT_TYPES_1_1 && !ACTIVATION_EVENT_TYPES_1_1.done && (_a = ACTIVATION_EVENT_TYPES_1.return)) _a.call(ACTIVATION_EVENT_TYPES_1);
                } finally{
                    if (e_1) throw e_1.error;
                }
            }
            if (this.adapter.isUnbounded()) this.adapter.registerResizeHandler(this.resizeHandler);
        }
        this.adapter.registerInteractionHandler('focus', this.focusHandler);
        this.adapter.registerInteractionHandler('blur', this.blurHandler);
    };
    MDCRippleFoundation.prototype.registerDeactivationHandlers = function(evt) {
        var e_2, _a;
        if (evt.type === 'keydown') this.adapter.registerInteractionHandler('keyup', this.deactivateHandler);
        else try {
            for(var POINTER_DEACTIVATION_EVENT_TYPES_1 = _tslib.__values(POINTER_DEACTIVATION_EVENT_TYPES), POINTER_DEACTIVATION_EVENT_TYPES_1_1 = POINTER_DEACTIVATION_EVENT_TYPES_1.next(); !POINTER_DEACTIVATION_EVENT_TYPES_1_1.done; POINTER_DEACTIVATION_EVENT_TYPES_1_1 = POINTER_DEACTIVATION_EVENT_TYPES_1.next()){
                var evtType = POINTER_DEACTIVATION_EVENT_TYPES_1_1.value;
                this.adapter.registerDocumentInteractionHandler(evtType, this.deactivateHandler);
            }
        } catch (e_2_1) {
            e_2 = {
                error: e_2_1
            };
        } finally{
            try {
                if (POINTER_DEACTIVATION_EVENT_TYPES_1_1 && !POINTER_DEACTIVATION_EVENT_TYPES_1_1.done && (_a = POINTER_DEACTIVATION_EVENT_TYPES_1.return)) _a.call(POINTER_DEACTIVATION_EVENT_TYPES_1);
            } finally{
                if (e_2) throw e_2.error;
            }
        }
    };
    MDCRippleFoundation.prototype.deregisterRootHandlers = function() {
        var e_3, _a;
        try {
            for(var ACTIVATION_EVENT_TYPES_2 = _tslib.__values(ACTIVATION_EVENT_TYPES), ACTIVATION_EVENT_TYPES_2_1 = ACTIVATION_EVENT_TYPES_2.next(); !ACTIVATION_EVENT_TYPES_2_1.done; ACTIVATION_EVENT_TYPES_2_1 = ACTIVATION_EVENT_TYPES_2.next()){
                var evtType = ACTIVATION_EVENT_TYPES_2_1.value;
                this.adapter.deregisterInteractionHandler(evtType, this.activateHandler);
            }
        } catch (e_3_1) {
            e_3 = {
                error: e_3_1
            };
        } finally{
            try {
                if (ACTIVATION_EVENT_TYPES_2_1 && !ACTIVATION_EVENT_TYPES_2_1.done && (_a = ACTIVATION_EVENT_TYPES_2.return)) _a.call(ACTIVATION_EVENT_TYPES_2);
            } finally{
                if (e_3) throw e_3.error;
            }
        }
        this.adapter.deregisterInteractionHandler('focus', this.focusHandler);
        this.adapter.deregisterInteractionHandler('blur', this.blurHandler);
        if (this.adapter.isUnbounded()) this.adapter.deregisterResizeHandler(this.resizeHandler);
    };
    MDCRippleFoundation.prototype.deregisterDeactivationHandlers = function() {
        var e_4, _a;
        this.adapter.deregisterInteractionHandler('keyup', this.deactivateHandler);
        try {
            for(var POINTER_DEACTIVATION_EVENT_TYPES_2 = _tslib.__values(POINTER_DEACTIVATION_EVENT_TYPES), POINTER_DEACTIVATION_EVENT_TYPES_2_1 = POINTER_DEACTIVATION_EVENT_TYPES_2.next(); !POINTER_DEACTIVATION_EVENT_TYPES_2_1.done; POINTER_DEACTIVATION_EVENT_TYPES_2_1 = POINTER_DEACTIVATION_EVENT_TYPES_2.next()){
                var evtType = POINTER_DEACTIVATION_EVENT_TYPES_2_1.value;
                this.adapter.deregisterDocumentInteractionHandler(evtType, this.deactivateHandler);
            }
        } catch (e_4_1) {
            e_4 = {
                error: e_4_1
            };
        } finally{
            try {
                if (POINTER_DEACTIVATION_EVENT_TYPES_2_1 && !POINTER_DEACTIVATION_EVENT_TYPES_2_1.done && (_a = POINTER_DEACTIVATION_EVENT_TYPES_2.return)) _a.call(POINTER_DEACTIVATION_EVENT_TYPES_2);
            } finally{
                if (e_4) throw e_4.error;
            }
        }
    };
    MDCRippleFoundation.prototype.removeCssVars = function() {
        var _this = this;
        var rippleStrings = MDCRippleFoundation.strings;
        var keys = Object.keys(rippleStrings);
        keys.forEach(function(key) {
            if (key.indexOf('VAR_') === 0) _this.adapter.updateCssVariable(rippleStrings[key], null);
        });
    };
    MDCRippleFoundation.prototype.activateImpl = function(evt) {
        var _this = this;
        if (this.adapter.isSurfaceDisabled()) return;
        var activationState = this.activationState;
        if (activationState.isActivated) return;
        // Avoid reacting to follow-on events fired by touch device after an already-processed user interaction
        var previousActivationEvent = this.previousActivationEvent;
        var isSameInteraction = previousActivationEvent && evt !== undefined && previousActivationEvent.type !== evt.type;
        if (isSameInteraction) return;
        activationState.isActivated = true;
        activationState.isProgrammatic = evt === undefined;
        activationState.activationEvent = evt;
        activationState.wasActivatedByPointer = activationState.isProgrammatic ? false : evt !== undefined && (evt.type === 'mousedown' || evt.type === 'touchstart' || evt.type === 'pointerdown');
        var hasActivatedChild = evt !== undefined && activatedTargets.length > 0 && activatedTargets.some(function(target) {
            return _this.adapter.containsEventTarget(target);
        });
        if (hasActivatedChild) {
            // Immediately reset activation state, while preserving logic that prevents touch follow-on events
            this.resetActivationState();
            return;
        }
        if (evt !== undefined) {
            activatedTargets.push(evt.target);
            this.registerDeactivationHandlers(evt);
        }
        activationState.wasElementMadeActive = this.checkElementMadeActive(evt);
        if (activationState.wasElementMadeActive) this.animateActivation();
        requestAnimationFrame(function() {
            // Reset array on next frame after the current event has had a chance to bubble to prevent ancestor ripples
            activatedTargets = [];
            if (!activationState.wasElementMadeActive && evt !== undefined && (evt.key === ' ' || evt.keyCode === 32)) {
                // If space was pressed, try again within an rAF call to detect :active, because different UAs report
                // active states inconsistently when they're called within event handling code:
                // - https://bugs.chromium.org/p/chromium/issues/detail?id=635971
                // - https://bugzilla.mozilla.org/show_bug.cgi?id=1293741
                // We try first outside rAF to support Edge, which does not exhibit this problem, but will crash if a CSS
                // variable is set within a rAF callback for a submit button interaction (#2241).
                activationState.wasElementMadeActive = _this.checkElementMadeActive(evt);
                if (activationState.wasElementMadeActive) _this.animateActivation();
            }
            if (!activationState.wasElementMadeActive) // Reset activation state immediately if element was not made active.
            _this.activationState = _this.defaultActivationState();
        });
    };
    MDCRippleFoundation.prototype.checkElementMadeActive = function(evt) {
        return evt !== undefined && evt.type === 'keydown' ? this.adapter.isSurfaceActive() : true;
    };
    MDCRippleFoundation.prototype.animateActivation = function() {
        var _this = this;
        var _a = MDCRippleFoundation.strings, VAR_FG_TRANSLATE_START = _a.VAR_FG_TRANSLATE_START, VAR_FG_TRANSLATE_END = _a.VAR_FG_TRANSLATE_END;
        var _b = MDCRippleFoundation.cssClasses, FG_DEACTIVATION = _b.FG_DEACTIVATION, FG_ACTIVATION = _b.FG_ACTIVATION;
        var DEACTIVATION_TIMEOUT_MS = MDCRippleFoundation.numbers.DEACTIVATION_TIMEOUT_MS;
        this.layoutInternal();
        var translateStart = '';
        var translateEnd = '';
        if (!this.adapter.isUnbounded()) {
            var _c = this.getFgTranslationCoordinates(), startPoint = _c.startPoint, endPoint = _c.endPoint;
            translateStart = startPoint.x + "px, " + startPoint.y + "px";
            translateEnd = endPoint.x + "px, " + endPoint.y + "px";
        }
        this.adapter.updateCssVariable(VAR_FG_TRANSLATE_START, translateStart);
        this.adapter.updateCssVariable(VAR_FG_TRANSLATE_END, translateEnd);
        // Cancel any ongoing activation/deactivation animations
        clearTimeout(this.activationTimer);
        clearTimeout(this.fgDeactivationRemovalTimer);
        this.rmBoundedActivationClasses();
        this.adapter.removeClass(FG_DEACTIVATION);
        // Force layout in order to re-trigger the animation.
        this.adapter.computeBoundingRect();
        this.adapter.addClass(FG_ACTIVATION);
        this.activationTimer = setTimeout(function() {
            _this.activationTimerCallback();
        }, DEACTIVATION_TIMEOUT_MS);
    };
    MDCRippleFoundation.prototype.getFgTranslationCoordinates = function() {
        var _a = this.activationState, activationEvent = _a.activationEvent, wasActivatedByPointer = _a.wasActivatedByPointer;
        var startPoint;
        if (wasActivatedByPointer) startPoint = _util.getNormalizedEventCoords(activationEvent, this.adapter.getWindowPageOffset(), this.adapter.computeBoundingRect());
        else startPoint = {
            x: this.frame.width / 2,
            y: this.frame.height / 2
        };
        // Center the element around the start point.
        startPoint = {
            x: startPoint.x - this.initialSize / 2,
            y: startPoint.y - this.initialSize / 2
        };
        var endPoint = {
            x: this.frame.width / 2 - this.initialSize / 2,
            y: this.frame.height / 2 - this.initialSize / 2
        };
        return {
            startPoint: startPoint,
            endPoint: endPoint
        };
    };
    MDCRippleFoundation.prototype.runDeactivationUXLogicIfReady = function() {
        var _this = this;
        // This method is called both when a pointing device is released, and when the activation animation ends.
        // The deactivation animation should only run after both of those occur.
        var FG_DEACTIVATION = MDCRippleFoundation.cssClasses.FG_DEACTIVATION;
        var _a = this.activationState, hasDeactivationUXRun = _a.hasDeactivationUXRun, isActivated = _a.isActivated;
        var activationHasEnded = hasDeactivationUXRun || !isActivated;
        if (activationHasEnded && this.activationAnimationHasEnded) {
            this.rmBoundedActivationClasses();
            this.adapter.addClass(FG_DEACTIVATION);
            this.fgDeactivationRemovalTimer = setTimeout(function() {
                _this.adapter.removeClass(FG_DEACTIVATION);
            }, _constants.numbers.FG_DEACTIVATION_MS);
        }
    };
    MDCRippleFoundation.prototype.rmBoundedActivationClasses = function() {
        var FG_ACTIVATION = MDCRippleFoundation.cssClasses.FG_ACTIVATION;
        this.adapter.removeClass(FG_ACTIVATION);
        this.activationAnimationHasEnded = false;
        this.adapter.computeBoundingRect();
    };
    MDCRippleFoundation.prototype.resetActivationState = function() {
        var _this = this;
        this.previousActivationEvent = this.activationState.activationEvent;
        this.activationState = this.defaultActivationState();
        // Touch devices may fire additional events for the same interaction within a short time.
        // Store the previous event until it's safe to assume that subsequent events are for new interactions.
        setTimeout(function() {
            return _this.previousActivationEvent = undefined;
        }, MDCRippleFoundation.numbers.TAP_DELAY_MS);
    };
    MDCRippleFoundation.prototype.deactivateImpl = function() {
        var _this = this;
        var activationState = this.activationState;
        // This can happen in scenarios such as when you have a keyup event that blurs the element.
        if (!activationState.isActivated) return;
        var state = _tslib.__assign({
        }, activationState);
        if (activationState.isProgrammatic) {
            requestAnimationFrame(function() {
                _this.animateDeactivation(state);
            });
            this.resetActivationState();
        } else {
            this.deregisterDeactivationHandlers();
            requestAnimationFrame(function() {
                _this.activationState.hasDeactivationUXRun = true;
                _this.animateDeactivation(state);
                _this.resetActivationState();
            });
        }
    };
    MDCRippleFoundation.prototype.animateDeactivation = function(_a) {
        var wasActivatedByPointer = _a.wasActivatedByPointer, wasElementMadeActive = _a.wasElementMadeActive;
        if (wasActivatedByPointer || wasElementMadeActive) this.runDeactivationUXLogicIfReady();
    };
    MDCRippleFoundation.prototype.layoutInternal = function() {
        var _this = this;
        this.frame = this.adapter.computeBoundingRect();
        var maxDim = Math.max(this.frame.height, this.frame.width);
        // Surface diameter is treated differently for unbounded vs. bounded ripples.
        // Unbounded ripple diameter is calculated smaller since the surface is expected to already be padded appropriately
        // to extend the hitbox, and the ripple is expected to meet the edges of the padded hitbox (which is typically
        // square). Bounded ripples, on the other hand, are fully expected to expand beyond the surface's longest diameter
        // (calculated based on the diagonal plus a constant padding), and are clipped at the surface's border via
        // `overflow: hidden`.
        var getBoundedRadius = function() {
            var hypotenuse = Math.sqrt(Math.pow(_this.frame.width, 2) + Math.pow(_this.frame.height, 2));
            return hypotenuse + MDCRippleFoundation.numbers.PADDING;
        };
        this.maxRadius = this.adapter.isUnbounded() ? maxDim : getBoundedRadius();
        // Ripple is sized as a fraction of the largest dimension of the surface, then scales up using a CSS scale transform
        var initialSize = Math.floor(maxDim * MDCRippleFoundation.numbers.INITIAL_ORIGIN_SCALE);
        // Unbounded ripple size should always be even number to equally center align.
        if (this.adapter.isUnbounded() && initialSize % 2 !== 0) this.initialSize = initialSize - 1;
        else this.initialSize = initialSize;
        this.fgScale = "" + this.maxRadius / this.initialSize;
        this.updateLayoutCssVars();
    };
    MDCRippleFoundation.prototype.updateLayoutCssVars = function() {
        var _a = MDCRippleFoundation.strings, VAR_FG_SIZE = _a.VAR_FG_SIZE, VAR_LEFT = _a.VAR_LEFT, VAR_TOP = _a.VAR_TOP, VAR_FG_SCALE = _a.VAR_FG_SCALE;
        this.adapter.updateCssVariable(VAR_FG_SIZE, this.initialSize + "px");
        this.adapter.updateCssVariable(VAR_FG_SCALE, this.fgScale);
        if (this.adapter.isUnbounded()) {
            this.unboundedCoords = {
                left: Math.round(this.frame.width / 2 - this.initialSize / 2),
                top: Math.round(this.frame.height / 2 - this.initialSize / 2)
            };
            this.adapter.updateCssVariable(VAR_LEFT, this.unboundedCoords.left + "px");
            this.adapter.updateCssVariable(VAR_TOP, this.unboundedCoords.top + "px");
        }
    };
    return MDCRippleFoundation;
}(_foundation.MDCFoundation);
exports.default = MDCRippleFoundation1;

},{"tslib":"j55WF","@material/base/foundation":"6nwGh","./constants":"6iDKb","./util":"hRWxM","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"6iDKb":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "cssClasses", ()=>cssClasses
);
parcelHelpers.export(exports, "strings", ()=>strings
);
parcelHelpers.export(exports, "numbers", ()=>numbers
);
var cssClasses = {
    // Ripple is a special case where the "root" component is really a "mixin" of sorts,
    // given that it's an 'upgrade' to an existing component. That being said it is the root
    // CSS class that all other CSS classes derive from.
    BG_FOCUSED: 'mdc-ripple-upgraded--background-focused',
    FG_ACTIVATION: 'mdc-ripple-upgraded--foreground-activation',
    FG_DEACTIVATION: 'mdc-ripple-upgraded--foreground-deactivation',
    ROOT: 'mdc-ripple-upgraded',
    UNBOUNDED: 'mdc-ripple-upgraded--unbounded'
};
var strings = {
    VAR_FG_SCALE: '--mdc-ripple-fg-scale',
    VAR_FG_SIZE: '--mdc-ripple-fg-size',
    VAR_FG_TRANSLATE_END: '--mdc-ripple-fg-translate-end',
    VAR_FG_TRANSLATE_START: '--mdc-ripple-fg-translate-start',
    VAR_LEFT: '--mdc-ripple-left',
    VAR_TOP: '--mdc-ripple-top'
};
var numbers = {
    DEACTIVATION_TIMEOUT_MS: 225,
    FG_DEACTIVATION_MS: 150,
    INITIAL_ORIGIN_SCALE: 0.6,
    PADDING: 10,
    TAP_DELAY_MS: 300
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"8iBfX":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"gLTp9":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _mithril = require("mithril");
var _mithrilDefault = parcelHelpers.interopDefault(_mithril);
class Container {
    constructor(){
    }
    view(vnode) {
        return _mithrilDefault.default("div", {
            class: 'container' + (vnode.attrs.class ? ` ${vnode.attrs.class}` : '')
        }, vnode.children);
    }
}
module.exports = Container;

},{"mithril":"a7UJj","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"9YaD7":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _mithril = require("mithril");
var _mithrilDefault = parcelHelpers.interopDefault(_mithril);
var _ripple = require("@material/ripple");
var _services = require("../../services");
class IconButton {
    constructor(){
        this.randomId = 'u' + _services.UUID.uuidv4().substring(0, 8);
        this.buttonClass = `material-icons mdc-icon-button`;
        this.optionDefaults = {
            icon: '',
            title: null,
            ripple: true,
            onclick: null
        };
        this.options = null;
        this.mdcRipple = null;
    }
    oninit(vnode) {
        this.options = Object.assign({
        }, this.optionDefaults, vnode.attrs);
    }
    oncreate(vnode1) {
        if (this.options.ripple) try {
            this.mdcRipple = new _ripple.MDCRipple(document.getElementById(this.randomId));
            this.mdcRipple.unbounded = true;
        } catch (e) {
        }
    }
    view(vnode2) {
        return _mithrilDefault.default("button", {
            id: this.randomId,
            class: this.buttonClass,
            onclick: this.options.onclick,
            "aria-label": this.options.title,
            title: this.options.title
        }, _mithrilDefault.default("div", {
            class: "mdc-icon-button__ripple"
        }), this.options.icon);
    }
}
module.exports = IconButton;

},{"mithril":"a7UJj","@material/ripple":"13Hhl","../../services":"5OF80","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"5OF80":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _apiJsx = require("./api.jsx");
var _apiJsxDefault = parcelHelpers.interopDefault(_apiJsx);
var _toasterJsx = require("./toaster.jsx");
var _toasterJsxDefault = parcelHelpers.interopDefault(_toasterJsx);
var _uuidJsx = require("./uuid.jsx");
var _uuidJsxDefault = parcelHelpers.interopDefault(_uuidJsx);
module.exports = {
    API: _apiJsxDefault.default,
    Toaster: _toasterJsxDefault.default,
    UUID: _uuidJsxDefault.default
};

},{"./api.jsx":"1n7l7","./toaster.jsx":"gzHGs","./uuid.jsx":"cUAFL","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"1n7l7":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _mithril = require("mithril");
var _mithrilDefault = parcelHelpers.interopDefault(_mithril);
class Endpoint {
    constructor(endpoint){
        this.endpoint = endpoint;
    }
    getHeaders() {
        let headers = {
        }; // If logged in, add the authorization header
        if (!!localStorage.getItem('uid') && !!localStorage.getItem('token')) headers.Authorization = `Token ${localStorage.getItem('token')}`;
        return headers;
    }
    create(body = {
    }) {
        return _mithrilDefault.default.request({
            method: 'POST',
            url: this.createUrl(),
            headers: this.getHeaders(),
            body
        });
    }
    read(id, params = {
    }) {
        return _mithrilDefault.default.request({
            method: 'GET',
            headers: this.getHeaders(),
            url: this.createUrl(id),
            params
        });
    }
    list(params1 = {
    }) {
        return _mithrilDefault.default.request({
            method: 'GET',
            url: this.createUrl(),
            headers: this.getHeaders(),
            params: params1
        });
    }
    update(id1, body1 = {
    }, put = false) {
        let method = null;
        if (put) method = 'PUT';
        else method = 'PATCH';
        return _mithrilDefault.default.request({
            method,
            url: this.createUrl(id1),
            headers: this.getHeaders(),
            body: body1
        });
    }
    delete(id2) {
        return _mithrilDefault.default.request({
            method: 'DELETE',
            url: this.createUrl(id2),
            headers: this.getHeaders()
        });
    }
    listRoute(method, route, body2 = {
    }, params2 = {
    }) {
        return _mithrilDefault.default.request({
            method,
            url: `${this.createUrl()}${route}`,
            headers: this.getHeaders(),
            body: body2,
            params: params2
        });
    }
    detailRoute(method1, route1, id3, body3 = {
    }, params3 = {
    }) {
        return _mithrilDefault.default.request({
            method: method1,
            url: `${this.createUrl()}${id3}/${route1}`,
            headers: this.getHeaders(),
            body: body3,
            params: params3
        });
    }
    createUrl(id4 = null) {
        if (id4) return `${"http://localhost:8000/api"}/${this.endpoint}/${id4}/`;
        else return `${"http://localhost:8000/api"}/${this.endpoint}/`;
    }
}
class API {
    static Users = new Endpoint('users');
}
module.exports = API;

},{"mithril":"a7UJj","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"gzHGs":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _mithril = require("mithril");
var _mithrilDefault = parcelHelpers.interopDefault(_mithril);
class Toaster {
    static toasts = [];
    static uuidv4() {
        return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c)=>(c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }
    static toastDefault = ()=>{
        return {
            id: this.uuidv4(),
            text: '',
            type: 'info',
            timeout: 10000,
            closeButton: true
        };
    };
    static addToast(text, type, options = {
    }) {
        let toast = Object.assign(this.toastDefault(), {
            text,
            type,
            ...options
        });
        this.toasts.push(toast);
        if (toast.timeout > 0) setTimeout(()=>{
            this.remove(toast.id);
        }, toast.timeout);
    }
    static remove(id) {
        let spliceIndex = this.toasts.findIndex((t)=>t.id === id
        );
        this.toasts.splice(spliceIndex, 1);
        _mithrilDefault.default.redraw();
    }
    static success(text1, options1 = {
    }) {
        this.addToast(text1, 'success', options1);
    }
    static error(text2, options2 = {
    }) {
        this.addToast(text2, 'error', options2);
    }
    static warning(text3, options3 = {
    }) {
        this.addToast(text3, 'warning', options3);
    }
    static info(text4, options4 = {
    }) {
        this.addToast(text4, 'info', options4);
    }
}
module.exports = Toaster;

},{"mithril":"a7UJj","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"cUAFL":[function(require,module,exports) {
class UUID {
    static uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : r & 3 | 8;
            return v.toString(16);
        });
    }
}
module.exports = UUID;

},{}],"78RVy":[function() {},{}],"1w9S7":[function(require,module,exports) {
module.exports = require('./helpers/bundle-url').getBundleURL('hR23o') + "keep.ba65eae5.png" + "?" + Date.now();

},{"./helpers/bundle-url":"chiK4"}],"chiK4":[function(require,module,exports) {
"use strict";
var bundleURL = {
};
function getBundleURLCached(id) {
    var value = bundleURL[id];
    if (!value) {
        value = getBundleURL();
        bundleURL[id] = value;
    }
    return value;
}
function getBundleURL() {
    try {
        throw new Error();
    } catch (err) {
        var matches = ('' + err.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);
        if (matches) // The first two stack frames will be this function and getBundleURLCached.
        // Use the 3rd one, which will be a runtime in the original bundle.
        return getBaseURL(matches[2]);
    }
    return '/';
}
function getBaseURL(url) {
    return ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, '$1') + '/';
} // TODO: Replace uses with `new URL(url).origin` when ie11 is no longer supported.
function getOrigin(url) {
    var matches = ('' + url).match(/(https?|file|ftp):\/\/[^/]+/);
    if (!matches) throw new Error('Origin not found');
    return matches[0];
}
exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
exports.getOrigin = getOrigin;

},{}],"9ihWA":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _mithril = require("mithril");
var _mithrilDefault = parcelHelpers.interopDefault(_mithril);
var _ripple = require("@material/ripple");
var _services = require("../../services");
class Button {
    constructor(){
        this.randomId = 'u' + _services.UUID.uuidv4().substring(0, 8);
        this.buttonClass = `mdc-button`;
        this.optionDefaults = {
            outlined: false,
            raised: false,
            ripple: true,
            class: null,
            style: null,
            label: '',
            iconLeading: null,
            iconTrailing: null,
            disabled: false,
            onclick: null
        };
        this.options = null;
        this.mdcRipple = null;
    }
    oninit(vnode) {
        this.update(vnode);
    }
    oncreate(vnode1) {
        if (this.options.ripple) try {
            this.mdcRipple = new _ripple.MDCRipple(document.getElementById(this.randomId));
        } catch (e) {
        }
    }
    onupdate(vnode2) {
        this.update(vnode2);
    }
    update(vnode3) {
        this.options = Object.assign({
        }, this.optionDefaults, vnode3.attrs);
        if (this.options.raised) this.buttonClass += ' mdc-button--raised';
        if (this.options.outlined) this.buttonClass += ' mdc-button--outlined';
        if (this.options.iconLeading) this.buttonClass += ' mdc-button--icon-leading';
        if (this.options.iconTrailing) this.buttonClass += ' mdc-button--icon-trailing';
        if (this.options.class) this.buttonClass += ` ${this.options.class}`;
    }
    view(vnode4) {
        return _mithrilDefault.default("button", {
            id: this.randomId,
            class: this.buttonClass,
            style: this.options.style,
            disabled: this.options.disabled,
            onclick: this.options.onclick
        }, _mithrilDefault.default("div", {
            class: "mdc-button__ripple"
        }), this.options.iconLeading && _mithrilDefault.default("div", {
            class: "mdc-button__icon"
        }, _mithrilDefault.default("span", {
            class: "material-icons md-18"
        }, this.options.iconLeading)), _mithrilDefault.default("span", {
            class: "mdc-button__label"
        }, this.options.label), this.options.iconTrailing && _mithrilDefault.default("div", {
            class: "mdc-button__icon"
        }, _mithrilDefault.default("span", {
            class: "material-icons md-18"
        }, this.options.iconTrailing)));
    }
}
module.exports = Button;

},{"mithril":"a7UJj","@material/ripple":"13Hhl","../../services":"5OF80","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"gApSA":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _mithril = require("mithril");
var _mithrilDefault = parcelHelpers.interopDefault(_mithril);
var _breadcrumbScss = require("./breadcrumb.scss");
class Breadcrumb {
    constructor(){
    }
    view(vnode) {
        return _mithrilDefault.default("ul", {
            class: "breadcrumb",
            style: vnode.attrs.style
        }, vnode.attrs.items && vnode.attrs.items.map((item)=>{
            return _mithrilDefault.default("li", null, item.href ? _mithrilDefault.default("a", {
                onclick: ()=>{
                    if (item.params) _mithrilDefault.default.route.set(item.href, item.params);
                    else _mithrilDefault.default.route.set(item.href);
                }
            }, item.text) : _mithrilDefault.default("span", null, item.text));
        }));
    }
}
module.exports = Breadcrumb;

},{"mithril":"a7UJj","./breadcrumb.scss":"a3U87","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"a3U87":[function() {},{}],"6lE74":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _mithril = require("mithril");
var _mithrilDefault = parcelHelpers.interopDefault(_mithril);
var _buttonJsx = require("../button/button.jsx");
var _buttonJsxDefault = parcelHelpers.interopDefault(_buttonJsx);
var _iconButtonJsx = require("../icon-button/icon-button.jsx");
var _iconButtonJsxDefault = parcelHelpers.interopDefault(_iconButtonJsx);
class Card {
    constructor(){
        this.cardClass = 'mdc-card';
        this.optionDefaults = {
            class: null,
            outlined: false,
            padding: '16px'
        };
        this.options = null;
    }
    oninit(vnode) {
        this.options = Object.assign({
        }, this.optionDefaults, vnode.attrs);
        if (this.options.outlined) this.cardClass += ' mdc-card--outlined';
        if (this.options.class) this.cardClass += ` ${this.options.class}`;
    }
    view(vnode1) {
        return _mithrilDefault.default('[', null, _mithrilDefault.default("div", {
            class: this.cardClass,
            style: {
                padding: this.options.padding
            }
        }, _mithrilDefault.default("div", {
            class: "mdc-card__content"
        }, vnode1.children), _mithrilDefault.default("div", {
            class: "mdc-card__actions"
        }, _mithrilDefault.default("div", {
            class: "mdc-card__action-buttons"
        }, _mithrilDefault.default(_buttonJsxDefault.default, {
            class: "mdc-card__action mdc-card__action--button",
            label: "Action 1"
        }), _mithrilDefault.default(_buttonJsxDefault.default, {
            class: "mdc-card__action mdc-card__action--button",
            label: "Action 2"
        }))), _mithrilDefault.default("div", {
            class: "mdc-card__action-icons"
        }, _mithrilDefault.default(_iconButtonJsxDefault.default, {
            class: "mdc-card__action mdc-card__action--icon",
            icon: "share",
            title: "Share"
        }), _mithrilDefault.default(_iconButtonJsxDefault.default, {
            class: "mdc-card__action mdc-card__action--icon",
            icon: "more_vert",
            title: "More Options"
        }))));
    }
}
module.exports = Card;

},{"mithril":"a7UJj","../button/button.jsx":"9ihWA","../icon-button/icon-button.jsx":"9YaD7","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"ewFz0":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _mithril = require("mithril");
var _mithrilDefault = parcelHelpers.interopDefault(_mithril);
var _iconButtonJsx = require("../icon-button/icon-button.jsx");
var _iconButtonJsxDefault = parcelHelpers.interopDefault(_iconButtonJsx);
var _moment = require("moment");
var _momentDefault = parcelHelpers.interopDefault(_moment);
var _datePickerScss = require("./date-picker.scss");
class DatePicker {
    constructor(){
        this.selected = _momentDefault.default();
        this.currentMonth = 0;
        this.currentYear = 0;
        this.firstDayWeekday = 0;
        this.daysInMonth = 0;
    }
    oninit(vnode) {
        let date = null;
        if (!vnode.attrs.initialDate) date = _momentDefault.default();
        else date = _momentDefault.default(vnode.attrs.initialDate);
        this.selected = date;
        this.currentMonth = date.month();
        this.currentYear = date.year();
        this.daysInMonth = date.daysInMonth();
        this.firstDayWeekday = _momentDefault.default(`${this.currentYear}-${this.zeroPad(this.currentMonth + 1)}-01`).day();
    }
    back() {
        let current = _momentDefault.default(`${this.currentYear}-${this.zeroPad(this.currentMonth + 1)}-01`).subtract(1, 'months');
        this.currentMonth = current.month();
        this.currentYear = current.year();
        this.daysInMonth = current.daysInMonth();
        this.firstDayWeekday = _momentDefault.default(`${this.currentYear}-${this.zeroPad(this.currentMonth + 1)}-01`).day();
    }
    forward() {
        let current = _momentDefault.default(`${this.currentYear}-${this.zeroPad(this.currentMonth + 1)}-01`).add(1, 'months');
        this.currentMonth = current.month();
        this.currentYear = current.year();
        this.daysInMonth = current.daysInMonth();
        this.firstDayWeekday = _momentDefault.default(`${this.currentYear}-${this.zeroPad(this.currentMonth + 1)}-01`).day();
    }
    clickDay(vnode1, day3) {
        if (!day3) return;
        this.select(vnode1, day3);
    }
    select(vnode2, day1) {
        this.selected = _momentDefault.default(`${this.currentYear}-${this.zeroPad(this.currentMonth + 1)}-${this.zeroPad(day1)}`);
        vnode2.attrs.selectedChange(this.selected);
    }
    dayIsSelected(day2) {
        if (!day2 || !this.selected) return false;
        let dayAsMoment = _momentDefault.default(`${this.currentYear}-${this.zeroPad(this.currentMonth + 1)}-${this.zeroPad(day2)}`);
        return this.selected.isSame(dayAsMoment, 'day');
    }
    daysInMonthArray() {
        let array = [];
        for(let i = 0; i < this.daysInMonth; i++)array.push(i + 1);
        return array;
    }
    sliceIntoChunks(arr, chunkSize) {
        const res = [];
        for(let i = 0; i < arr.length; i += chunkSize){
            const chunk = arr.slice(i, i + chunkSize);
            res.push(chunk);
        }
        return res;
    }
    weekChunk() {
        let dimArray = this.daysInMonthArray();
        let firstWeek = []; // e.g: [null, null, null, null, null, 1, 2]
        let lastDayInFirstWeek = 0;
        let rest = [];
        for(let i = 0; i < this.firstDayWeekday; i++)firstWeek.push(null);
        for(let i1 = this.firstDayWeekday; i1 < 7; i1++){
            firstWeek.push(dimArray[i1 - this.firstDayWeekday]);
            lastDayInFirstWeek = i1 - this.firstDayWeekday;
        }
        for(let i2 = lastDayInFirstWeek + 1; i2 < dimArray.length; i2++)rest.push(dimArray[i2]);
        return this.sliceIntoChunks(firstWeek.concat(rest), 7);
    }
    formatHeader() {
        return _momentDefault.default(`${this.currentYear}-${this.zeroPad(this.currentMonth + 1)}-01`).format('MMMM YYYY');
    }
    zeroPad(num) {
        return num < 10 ? `0${num}` : `${num}`;
    }
    view(vnode3) {
        return _mithrilDefault.default("div", {
            class: "datePicker"
        }, _mithrilDefault.default("div", {
            class: "datePicker__navigation"
        }, _mithrilDefault.default(_iconButtonJsxDefault.default, {
            icon: "chevron_left",
            onclick: ()=>{
                this.back();
            }
        }), _mithrilDefault.default("div", {
            class: "datePicker__navigation__month"
        }, this.formatHeader()), _mithrilDefault.default(_iconButtonJsxDefault.default, {
            icon: "chevron_right",
            onclick: ()=>{
                this.forward();
            }
        })), _mithrilDefault.default("div", {
            class: "datePicker__calendar"
        }, _mithrilDefault.default("table", null, _mithrilDefault.default("thead", null, _mithrilDefault.default("tr", null, _mithrilDefault.default("th", null, "S"), _mithrilDefault.default("th", null, "M"), _mithrilDefault.default("th", null, "T"), _mithrilDefault.default("th", null, "W"), _mithrilDefault.default("th", null, "T"), _mithrilDefault.default("th", null, "F"), _mithrilDefault.default("th", null, "S"))), _mithrilDefault.default("tbody", null, this.weekChunk().map((week)=>{
            return _mithrilDefault.default("tr", null, week.map((day)=>{
                return _mithrilDefault.default("td", {
                    class: this.dayIsSelected(day) ? 'datePicker__calendar--selected' : '',
                    onclick: ()=>{
                        this.clickDay(vnode3, day);
                    }
                }, day);
            }));
        })))));
    }
}
module.exports = DatePicker;

},{"mithril":"a7UJj","../icon-button/icon-button.jsx":"9YaD7","moment":"1RrsF","./date-picker.scss":"kHd21","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"1RrsF":[function(require,module,exports) {
(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : global.moment = factory();
})(this, function() {
    'use strict';
    var hookCallback;
    function hooks() {
        return hookCallback.apply(null, arguments);
    }
    // This is done to register the method called with moment()
    // without creating circular dependencies.
    function setHookCallback(callback) {
        hookCallback = callback;
    }
    function isArray(input) {
        return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
    }
    function isObject(input) {
        // IE8 will treat undefined and null as object if it wasn't for
        // input != null
        return input != null && Object.prototype.toString.call(input) === '[object Object]';
    }
    function hasOwnProp(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b);
    }
    function isObjectEmpty(obj) {
        if (Object.getOwnPropertyNames) return Object.getOwnPropertyNames(obj).length === 0;
        else {
            var k;
            for(k in obj){
                if (hasOwnProp(obj, k)) return false;
            }
            return true;
        }
    }
    function isUndefined(input) {
        return input === void 0;
    }
    function isNumber(input) {
        return typeof input === 'number' || Object.prototype.toString.call(input) === '[object Number]';
    }
    function isDate(input) {
        return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
    }
    function map(arr, fn) {
        var res = [], i;
        for(i = 0; i < arr.length; ++i)res.push(fn(arr[i], i));
        return res;
    }
    function extend(a, b) {
        for(var i in b)if (hasOwnProp(b, i)) a[i] = b[i];
        if (hasOwnProp(b, 'toString')) a.toString = b.toString;
        if (hasOwnProp(b, 'valueOf')) a.valueOf = b.valueOf;
        return a;
    }
    function createUTC(input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, true).utc();
    }
    function defaultParsingFlags() {
        // We need to deep clone this object.
        return {
            empty: false,
            unusedTokens: [],
            unusedInput: [],
            overflow: -2,
            charsLeftOver: 0,
            nullInput: false,
            invalidEra: null,
            invalidMonth: null,
            invalidFormat: false,
            userInvalidated: false,
            iso: false,
            parsedDateParts: [],
            era: null,
            meridiem: null,
            rfc2822: false,
            weekdayMismatch: false
        };
    }
    function getParsingFlags(m) {
        if (m._pf == null) m._pf = defaultParsingFlags();
        return m._pf;
    }
    var some;
    if (Array.prototype.some) some = Array.prototype.some;
    else some = function(fun) {
        var t = Object(this), len = t.length >>> 0, i;
        for(i = 0; i < len; i++){
            if (i in t && fun.call(this, t[i], i, t)) return true;
        }
        return false;
    };
    function isValid(m) {
        if (m._isValid == null) {
            var flags = getParsingFlags(m), parsedParts = some.call(flags.parsedDateParts, function(i) {
                return i != null;
            }), isNowValid = !isNaN(m._d.getTime()) && flags.overflow < 0 && !flags.empty && !flags.invalidEra && !flags.invalidMonth && !flags.invalidWeekday && !flags.weekdayMismatch && !flags.nullInput && !flags.invalidFormat && !flags.userInvalidated && (!flags.meridiem || flags.meridiem && parsedParts);
            if (m._strict) isNowValid = isNowValid && flags.charsLeftOver === 0 && flags.unusedTokens.length === 0 && flags.bigHour === undefined;
            if (Object.isFrozen == null || !Object.isFrozen(m)) m._isValid = isNowValid;
            else return isNowValid;
        }
        return m._isValid;
    }
    function createInvalid(flags) {
        var m = createUTC(NaN);
        if (flags != null) extend(getParsingFlags(m), flags);
        else getParsingFlags(m).userInvalidated = true;
        return m;
    }
    // Plugins that add properties should also add the key here (null value),
    // so we can properly clone ourselves.
    var momentProperties = hooks.momentProperties = [], updateInProgress = false;
    function copyConfig(to, from) {
        var i, prop, val;
        if (!isUndefined(from._isAMomentObject)) to._isAMomentObject = from._isAMomentObject;
        if (!isUndefined(from._i)) to._i = from._i;
        if (!isUndefined(from._f)) to._f = from._f;
        if (!isUndefined(from._l)) to._l = from._l;
        if (!isUndefined(from._strict)) to._strict = from._strict;
        if (!isUndefined(from._tzm)) to._tzm = from._tzm;
        if (!isUndefined(from._isUTC)) to._isUTC = from._isUTC;
        if (!isUndefined(from._offset)) to._offset = from._offset;
        if (!isUndefined(from._pf)) to._pf = getParsingFlags(from);
        if (!isUndefined(from._locale)) to._locale = from._locale;
        if (momentProperties.length > 0) for(i = 0; i < momentProperties.length; i++){
            prop = momentProperties[i];
            val = from[prop];
            if (!isUndefined(val)) to[prop] = val;
        }
        return to;
    }
    // Moment prototype object
    function Moment(config) {
        copyConfig(this, config);
        this._d = new Date(config._d != null ? config._d.getTime() : NaN);
        if (!this.isValid()) this._d = new Date(NaN);
        // Prevent infinite loop in case updateOffset creates new moment
        // objects.
        if (updateInProgress === false) {
            updateInProgress = true;
            hooks.updateOffset(this);
            updateInProgress = false;
        }
    }
    function isMoment(obj) {
        return obj instanceof Moment || obj != null && obj._isAMomentObject != null;
    }
    function warn(msg) {
        if (hooks.suppressDeprecationWarnings === false && typeof console !== 'undefined' && console.warn) console.warn('Deprecation warning: ' + msg);
    }
    function deprecate(msg, fn) {
        var firstTime = true;
        return extend(function() {
            if (hooks.deprecationHandler != null) hooks.deprecationHandler(null, msg);
            if (firstTime) {
                var args = [], arg, i, key;
                for(i = 0; i < arguments.length; i++){
                    arg = '';
                    if (typeof arguments[i] === 'object') {
                        arg += '\n[' + i + '] ';
                        for(key in arguments[0])if (hasOwnProp(arguments[0], key)) arg += key + ': ' + arguments[0][key] + ', ';
                        arg = arg.slice(0, -2); // Remove trailing comma and space
                    } else arg = arguments[i];
                    args.push(arg);
                }
                warn(msg + '\nArguments: ' + Array.prototype.slice.call(args).join('') + '\n' + new Error().stack);
                firstTime = false;
            }
            return fn.apply(this, arguments);
        }, fn);
    }
    var deprecations = {
    };
    function deprecateSimple(name, msg) {
        if (hooks.deprecationHandler != null) hooks.deprecationHandler(name, msg);
        if (!deprecations[name]) {
            warn(msg);
            deprecations[name] = true;
        }
    }
    hooks.suppressDeprecationWarnings = false;
    hooks.deprecationHandler = null;
    function isFunction(input) {
        return typeof Function !== 'undefined' && input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
    }
    function set(config) {
        var prop, i;
        for(i in config)if (hasOwnProp(config, i)) {
            prop = config[i];
            if (isFunction(prop)) this[i] = prop;
            else this['_' + i] = prop;
        }
        this._config = config;
        // Lenient ordinal parsing accepts just a number in addition to
        // number + (possibly) stuff coming from _dayOfMonthOrdinalParse.
        // TODO: Remove "ordinalParse" fallback in next major release.
        this._dayOfMonthOrdinalParseLenient = new RegExp((this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + '|' + /\d{1,2}/.source);
    }
    function mergeConfigs(parentConfig, childConfig) {
        var res = extend({
        }, parentConfig), prop;
        for(prop in childConfig)if (hasOwnProp(childConfig, prop)) {
            if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
                res[prop] = {
                };
                extend(res[prop], parentConfig[prop]);
                extend(res[prop], childConfig[prop]);
            } else if (childConfig[prop] != null) res[prop] = childConfig[prop];
            else delete res[prop];
        }
        for(prop in parentConfig)if (hasOwnProp(parentConfig, prop) && !hasOwnProp(childConfig, prop) && isObject(parentConfig[prop])) // make sure changes to properties don't modify parent config
        res[prop] = extend({
        }, res[prop]);
        return res;
    }
    function Locale(config) {
        if (config != null) this.set(config);
    }
    var keys;
    if (Object.keys) keys = Object.keys;
    else keys = function(obj) {
        var i, res = [];
        for(i in obj)if (hasOwnProp(obj, i)) res.push(i);
        return res;
    };
    var defaultCalendar = {
        sameDay: '[Today at] LT',
        nextDay: '[Tomorrow at] LT',
        nextWeek: 'dddd [at] LT',
        lastDay: '[Yesterday at] LT',
        lastWeek: '[Last] dddd [at] LT',
        sameElse: 'L'
    };
    function calendar(key, mom, now) {
        var output = this._calendar[key] || this._calendar['sameElse'];
        return isFunction(output) ? output.call(mom, now) : output;
    }
    function zeroFill(number, targetLength, forceSign) {
        var absNumber = '' + Math.abs(number), zerosToFill = targetLength - absNumber.length, sign = number >= 0;
        return (sign ? forceSign ? '+' : '' : '-') + Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
    }
    var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g, localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, formatFunctions = {
    }, formatTokenFunctions = {
    };
    // token:    'M'
    // padded:   ['MM', 2]
    // ordinal:  'Mo'
    // callback: function () { this.month() + 1 }
    function addFormatToken(token, padded, ordinal, callback) {
        var func = callback;
        if (typeof callback === 'string') func = function() {
            return this[callback]();
        };
        if (token) formatTokenFunctions[token] = func;
        if (padded) formatTokenFunctions[padded[0]] = function() {
            return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
        };
        if (ordinal) formatTokenFunctions[ordinal] = function() {
            return this.localeData().ordinal(func.apply(this, arguments), token);
        };
    }
    function removeFormattingTokens(input) {
        if (input.match(/\[[\s\S]/)) return input.replace(/^\[|\]$/g, '');
        return input.replace(/\\/g, '');
    }
    function makeFormatFunction(format) {
        var array = format.match(formattingTokens), i1, length;
        for(i1 = 0, length = array.length; i1 < length; i1++)if (formatTokenFunctions[array[i1]]) array[i1] = formatTokenFunctions[array[i1]];
        else array[i1] = removeFormattingTokens(array[i1]);
        return function(mom) {
            var output = '', i;
            for(i = 0; i < length; i++)output += isFunction(array[i]) ? array[i].call(mom, format) : array[i];
            return output;
        };
    }
    // format date using native date object
    function formatMoment(m, format) {
        if (!m.isValid()) return m.localeData().invalidDate();
        format = expandFormat(format, m.localeData());
        formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);
        return formatFunctions[format](m);
    }
    function expandFormat(format, locale) {
        var i = 5;
        function replaceLongDateFormatTokens(input) {
            return locale.longDateFormat(input) || input;
        }
        localFormattingTokens.lastIndex = 0;
        while(i >= 0 && localFormattingTokens.test(format)){
            format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
            localFormattingTokens.lastIndex = 0;
            i -= 1;
        }
        return format;
    }
    var defaultLongDateFormat = {
        LTS: 'h:mm:ss A',
        LT: 'h:mm A',
        L: 'MM/DD/YYYY',
        LL: 'MMMM D, YYYY',
        LLL: 'MMMM D, YYYY h:mm A',
        LLLL: 'dddd, MMMM D, YYYY h:mm A'
    };
    function longDateFormat(key) {
        var format = this._longDateFormat[key], formatUpper = this._longDateFormat[key.toUpperCase()];
        if (format || !formatUpper) return format;
        this._longDateFormat[key] = formatUpper.match(formattingTokens).map(function(tok) {
            if (tok === 'MMMM' || tok === 'MM' || tok === 'DD' || tok === 'dddd') return tok.slice(1);
            return tok;
        }).join('');
        return this._longDateFormat[key];
    }
    var defaultInvalidDate = 'Invalid date';
    function invalidDate() {
        return this._invalidDate;
    }
    var defaultOrdinal = '%d', defaultDayOfMonthOrdinalParse = /\d{1,2}/;
    function ordinal1(number) {
        return this._ordinal.replace('%d', number);
    }
    var defaultRelativeTime = {
        future: 'in %s',
        past: '%s ago',
        s: 'a few seconds',
        ss: '%d seconds',
        m: 'a minute',
        mm: '%d minutes',
        h: 'an hour',
        hh: '%d hours',
        d: 'a day',
        dd: '%d days',
        w: 'a week',
        ww: '%d weeks',
        M: 'a month',
        MM: '%d months',
        y: 'a year',
        yy: '%d years'
    };
    function relativeTime(number, withoutSuffix, string, isFuture) {
        var output = this._relativeTime[string];
        return isFunction(output) ? output(number, withoutSuffix, string, isFuture) : output.replace(/%d/i, number);
    }
    function pastFuture(diff, output) {
        var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
        return isFunction(format) ? format(output) : format.replace(/%s/i, output);
    }
    var aliases = {
    };
    function addUnitAlias(unit, shorthand) {
        var lowerCase = unit.toLowerCase();
        aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
    }
    function normalizeUnits(units) {
        return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
    }
    function normalizeObjectUnits(inputObject) {
        var normalizedInput = {
        }, normalizedProp, prop;
        for(prop in inputObject)if (hasOwnProp(inputObject, prop)) {
            normalizedProp = normalizeUnits(prop);
            if (normalizedProp) normalizedInput[normalizedProp] = inputObject[prop];
        }
        return normalizedInput;
    }
    var priorities = {
    };
    function addUnitPriority(unit, priority) {
        priorities[unit] = priority;
    }
    function getPrioritizedUnits(unitsObj) {
        var units = [], u;
        for(u in unitsObj)if (hasOwnProp(unitsObj, u)) units.push({
            unit: u,
            priority: priorities[u]
        });
        units.sort(function(a, b) {
            return a.priority - b.priority;
        });
        return units;
    }
    function isLeapYear(year) {
        return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
    }
    function absFloor(number) {
        if (number < 0) // -0 -> 0
        return Math.ceil(number) || 0;
        else return Math.floor(number);
    }
    function toInt(argumentForCoercion) {
        var coercedNumber = +argumentForCoercion, value = 0;
        if (coercedNumber !== 0 && isFinite(coercedNumber)) value = absFloor(coercedNumber);
        return value;
    }
    function makeGetSet(unit, keepTime) {
        return function(value) {
            if (value != null) {
                set$1(this, unit, value);
                hooks.updateOffset(this, keepTime);
                return this;
            } else return get(this, unit);
        };
    }
    function get(mom, unit) {
        return mom.isValid() ? mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]() : NaN;
    }
    function set$1(mom, unit, value) {
        if (mom.isValid() && !isNaN(value)) {
            if (unit === 'FullYear' && isLeapYear(mom.year()) && mom.month() === 1 && mom.date() === 29) {
                value = toInt(value);
                mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value, mom.month(), daysInMonth(value, mom.month()));
            } else mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
        }
    }
    // MOMENTS
    function stringGet(units) {
        units = normalizeUnits(units);
        if (isFunction(this[units])) return this[units]();
        return this;
    }
    function stringSet(units, value) {
        if (typeof units === 'object') {
            units = normalizeObjectUnits(units);
            var prioritized = getPrioritizedUnits(units), i;
            for(i = 0; i < prioritized.length; i++)this[prioritized[i].unit](units[prioritized[i].unit]);
        } else {
            units = normalizeUnits(units);
            if (isFunction(this[units])) return this[units](value);
        }
        return this;
    }
    var match1 = /\d/, match2 = /\d\d/, match3 = /\d{3}/, match4 = /\d{4}/, match6 = /[+-]?\d{6}/, match1to2 = /\d\d?/, match3to4 = /\d\d\d\d?/, match5to6 = /\d\d\d\d\d\d?/, match1to3 = /\d{1,3}/, match1to4 = /\d{1,4}/, match1to6 = /[+-]?\d{1,6}/, matchUnsigned = /\d+/, matchSigned = /[+-]?\d+/, matchOffset = /Z|[+-]\d\d:?\d\d/gi, matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi, matchTimestamp = /[+-]?\d+(\.\d{1,3})?/, // any word (or two) characters or numbers including two/three word month in arabic.
    // includes scottish gaelic two word and hyphenated months
    matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i, regexes;
    regexes = {
    };
    function addRegexToken(token, regex, strictRegex) {
        regexes[token] = isFunction(regex) ? regex : function(isStrict, localeData) {
            return isStrict && strictRegex ? strictRegex : regex;
        };
    }
    function getParseRegexForToken(token, config) {
        if (!hasOwnProp(regexes, token)) return new RegExp(unescapeFormat(token));
        return regexes[token](config._strict, config._locale);
    }
    // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
    function unescapeFormat(s) {
        return regexEscape(s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(matched, p1, p2, p3, p4) {
            return p1 || p2 || p3 || p4;
        }));
    }
    function regexEscape(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }
    var tokens1 = {
    };
    function addParseToken(token, callback) {
        var i, func = callback;
        if (typeof token === 'string') token = [
            token
        ];
        if (isNumber(callback)) func = function(input, array) {
            array[callback] = toInt(input);
        };
        for(i = 0; i < token.length; i++)tokens1[token[i]] = func;
    }
    function addWeekParseToken(token2, callback) {
        addParseToken(token2, function(input, array, config, token) {
            config._w = config._w || {
            };
            callback(input, config._w, config, token);
        });
    }
    function addTimeToArrayFromToken(token, input, config) {
        if (input != null && hasOwnProp(tokens1, token)) tokens1[token](input, config._a, config, token);
    }
    var YEAR = 0, MONTH = 1, DATE = 2, HOUR = 3, MINUTE = 4, SECOND = 5, MILLISECOND = 6, WEEK = 7, WEEKDAY = 8;
    function mod(n, x) {
        return (n % x + x) % x;
    }
    var indexOf;
    if (Array.prototype.indexOf) indexOf = Array.prototype.indexOf;
    else indexOf = function(o) {
        // I know
        var i;
        for(i = 0; i < this.length; ++i){
            if (this[i] === o) return i;
        }
        return -1;
    };
    function daysInMonth(year, month) {
        if (isNaN(year) || isNaN(month)) return NaN;
        var modMonth = mod(month, 12);
        year += (month - modMonth) / 12;
        return modMonth === 1 ? isLeapYear(year) ? 29 : 28 : 31 - modMonth % 7 % 2;
    }
    // FORMATTING
    addFormatToken('M', [
        'MM',
        2
    ], 'Mo', function() {
        return this.month() + 1;
    });
    addFormatToken('MMM', 0, 0, function(format) {
        return this.localeData().monthsShort(this, format);
    });
    addFormatToken('MMMM', 0, 0, function(format) {
        return this.localeData().months(this, format);
    });
    // ALIASES
    addUnitAlias('month', 'M');
    // PRIORITY
    addUnitPriority('month', 8);
    // PARSING
    addRegexToken('M', match1to2);
    addRegexToken('MM', match1to2, match2);
    addRegexToken('MMM', function(isStrict, locale) {
        return locale.monthsShortRegex(isStrict);
    });
    addRegexToken('MMMM', function(isStrict, locale) {
        return locale.monthsRegex(isStrict);
    });
    addParseToken([
        'M',
        'MM'
    ], function(input, array) {
        array[MONTH] = toInt(input) - 1;
    });
    addParseToken([
        'MMM',
        'MMMM'
    ], function(input, array, config, token) {
        var month = config._locale.monthsParse(input, token, config._strict);
        // if we didn't find a month name, mark the date as invalid.
        if (month != null) array[MONTH] = month;
        else getParsingFlags(config).invalidMonth = input;
    });
    // LOCALES
    var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'), defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'), MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/, defaultMonthsShortRegex = matchWord, defaultMonthsRegex = matchWord;
    function localeMonths(m, format) {
        if (!m) return isArray(this._months) ? this._months : this._months['standalone'];
        return isArray(this._months) ? this._months[m.month()] : this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format) ? 'format' : 'standalone'][m.month()];
    }
    function localeMonthsShort(m, format) {
        if (!m) return isArray(this._monthsShort) ? this._monthsShort : this._monthsShort['standalone'];
        return isArray(this._monthsShort) ? this._monthsShort[m.month()] : this._monthsShort[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
    }
    function handleStrictParse(monthName, format, strict) {
        var i, ii, mom, llc = monthName.toLocaleLowerCase();
        if (!this._monthsParse) {
            // this is not used
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
            for(i = 0; i < 12; ++i){
                mom = createUTC([
                    2000,
                    i
                ]);
                this._shortMonthsParse[i] = this.monthsShort(mom, '').toLocaleLowerCase();
                this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
            }
        }
        if (strict) {
            if (format === 'MMM') {
                ii = indexOf.call(this._shortMonthsParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._longMonthsParse, llc);
                return ii !== -1 ? ii : null;
            }
        } else if (format === 'MMM') {
            ii = indexOf.call(this._shortMonthsParse, llc);
            if (ii !== -1) return ii;
            ii = indexOf.call(this._longMonthsParse, llc);
            return ii !== -1 ? ii : null;
        } else {
            ii = indexOf.call(this._longMonthsParse, llc);
            if (ii !== -1) return ii;
            ii = indexOf.call(this._shortMonthsParse, llc);
            return ii !== -1 ? ii : null;
        }
    }
    function localeMonthsParse(monthName, format, strict) {
        var i, mom, regex;
        if (this._monthsParseExact) return handleStrictParse.call(this, monthName, format, strict);
        if (!this._monthsParse) {
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
        }
        // TODO: add sorting
        // Sorting makes sure if one month (or abbr) is a prefix of another
        // see sorting in computeMonthsParse
        for(i = 0; i < 12; i++){
            // make the regex if we don't have it already
            mom = createUTC([
                2000,
                i
            ]);
            if (strict && !this._longMonthsParse[i]) {
                this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
                this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
            }
            if (!strict && !this._monthsParse[i]) {
                regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
                this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) return i;
            else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) return i;
            else if (!strict && this._monthsParse[i].test(monthName)) return i;
        }
    }
    // MOMENTS
    function setMonth(mom, value) {
        var dayOfMonth;
        if (!mom.isValid()) // No op
        return mom;
        if (typeof value === 'string') {
            if (/^\d+$/.test(value)) value = toInt(value);
            else {
                value = mom.localeData().monthsParse(value);
                // TODO: Another silent failure?
                if (!isNumber(value)) return mom;
            }
        }
        dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
        return mom;
    }
    function getSetMonth(value) {
        if (value != null) {
            setMonth(this, value);
            hooks.updateOffset(this, true);
            return this;
        } else return get(this, 'Month');
    }
    function getDaysInMonth() {
        return daysInMonth(this.year(), this.month());
    }
    function monthsShortRegex(isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) computeMonthsParse.call(this);
            if (isStrict) return this._monthsShortStrictRegex;
            else return this._monthsShortRegex;
        } else {
            if (!hasOwnProp(this, '_monthsShortRegex')) this._monthsShortRegex = defaultMonthsShortRegex;
            return this._monthsShortStrictRegex && isStrict ? this._monthsShortStrictRegex : this._monthsShortRegex;
        }
    }
    function monthsRegex(isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) computeMonthsParse.call(this);
            if (isStrict) return this._monthsStrictRegex;
            else return this._monthsRegex;
        } else {
            if (!hasOwnProp(this, '_monthsRegex')) this._monthsRegex = defaultMonthsRegex;
            return this._monthsStrictRegex && isStrict ? this._monthsStrictRegex : this._monthsRegex;
        }
    }
    function computeMonthsParse() {
        function cmpLenRev(a, b) {
            return b.length - a.length;
        }
        var shortPieces = [], longPieces = [], mixedPieces = [], i, mom;
        for(i = 0; i < 12; i++){
            // make the regex if we don't have it already
            mom = createUTC([
                2000,
                i
            ]);
            shortPieces.push(this.monthsShort(mom, ''));
            longPieces.push(this.months(mom, ''));
            mixedPieces.push(this.months(mom, ''));
            mixedPieces.push(this.monthsShort(mom, ''));
        }
        // Sorting makes sure if one month (or abbr) is a prefix of another it
        // will match the longer piece.
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        for(i = 0; i < 12; i++){
            shortPieces[i] = regexEscape(shortPieces[i]);
            longPieces[i] = regexEscape(longPieces[i]);
        }
        for(i = 0; i < 24; i++)mixedPieces[i] = regexEscape(mixedPieces[i]);
        this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._monthsShortRegex = this._monthsRegex;
        this._monthsStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
        this._monthsShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
    }
    // FORMATTING
    addFormatToken('Y', 0, 0, function() {
        var y = this.year();
        return y <= 9999 ? zeroFill(y, 4) : '+' + y;
    });
    addFormatToken(0, [
        'YY',
        2
    ], 0, function() {
        return this.year() % 100;
    });
    addFormatToken(0, [
        'YYYY',
        4
    ], 0, 'year');
    addFormatToken(0, [
        'YYYYY',
        5
    ], 0, 'year');
    addFormatToken(0, [
        'YYYYYY',
        6,
        true
    ], 0, 'year');
    // ALIASES
    addUnitAlias('year', 'y');
    // PRIORITIES
    addUnitPriority('year', 1);
    // PARSING
    addRegexToken('Y', matchSigned);
    addRegexToken('YY', match1to2, match2);
    addRegexToken('YYYY', match1to4, match4);
    addRegexToken('YYYYY', match1to6, match6);
    addRegexToken('YYYYYY', match1to6, match6);
    addParseToken([
        'YYYYY',
        'YYYYYY'
    ], YEAR);
    addParseToken('YYYY', function(input, array) {
        array[YEAR] = input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
    });
    addParseToken('YY', function(input, array) {
        array[YEAR] = hooks.parseTwoDigitYear(input);
    });
    addParseToken('Y', function(input, array) {
        array[YEAR] = parseInt(input, 10);
    });
    // HELPERS
    function daysInYear(year) {
        return isLeapYear(year) ? 366 : 365;
    }
    // HOOKS
    hooks.parseTwoDigitYear = function(input) {
        return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
    };
    // MOMENTS
    var getSetYear = makeGetSet('FullYear', true);
    function getIsLeapYear() {
        return isLeapYear(this.year());
    }
    function createDate(y, m, d, h, M, s, ms) {
        // can't just apply() to create a date:
        // https://stackoverflow.com/q/181348
        var date;
        // the date constructor remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) {
            // preserve leap years using a full 400 year cycle, then reset
            date = new Date(y + 400, m, d, h, M, s, ms);
            if (isFinite(date.getFullYear())) date.setFullYear(y);
        } else date = new Date(y, m, d, h, M, s, ms);
        return date;
    }
    function createUTCDate(y) {
        var date, args;
        // the Date.UTC function remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) {
            args = Array.prototype.slice.call(arguments);
            // preserve leap years using a full 400 year cycle, then reset
            args[0] = y + 400;
            date = new Date(Date.UTC.apply(null, args));
            if (isFinite(date.getUTCFullYear())) date.setUTCFullYear(y);
        } else date = new Date(Date.UTC.apply(null, arguments));
        return date;
    }
    // start-of-first-week - start-of-year
    function firstWeekOffset(year, dow, doy) {
        var fwd = 7 + dow - doy, // first-week day local weekday -- which local weekday is fwd
        fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;
        return -fwdlw + fwd - 1;
    }
    // https://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
    function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
        var localWeekday = (7 + weekday - dow) % 7, weekOffset = firstWeekOffset(year, dow, doy), dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset, resYear, resDayOfYear;
        if (dayOfYear <= 0) {
            resYear = year - 1;
            resDayOfYear = daysInYear(resYear) + dayOfYear;
        } else if (dayOfYear > daysInYear(year)) {
            resYear = year + 1;
            resDayOfYear = dayOfYear - daysInYear(year);
        } else {
            resYear = year;
            resDayOfYear = dayOfYear;
        }
        return {
            year: resYear,
            dayOfYear: resDayOfYear
        };
    }
    function weekOfYear(mom, dow, doy) {
        var weekOffset = firstWeekOffset(mom.year(), dow, doy), week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1, resWeek, resYear;
        if (week < 1) {
            resYear = mom.year() - 1;
            resWeek = week + weeksInYear(resYear, dow, doy);
        } else if (week > weeksInYear(mom.year(), dow, doy)) {
            resWeek = week - weeksInYear(mom.year(), dow, doy);
            resYear = mom.year() + 1;
        } else {
            resYear = mom.year();
            resWeek = week;
        }
        return {
            week: resWeek,
            year: resYear
        };
    }
    function weeksInYear(year, dow, doy) {
        var weekOffset = firstWeekOffset(year, dow, doy), weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
        return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
    }
    // FORMATTING
    addFormatToken('w', [
        'ww',
        2
    ], 'wo', 'week');
    addFormatToken('W', [
        'WW',
        2
    ], 'Wo', 'isoWeek');
    // ALIASES
    addUnitAlias('week', 'w');
    addUnitAlias('isoWeek', 'W');
    // PRIORITIES
    addUnitPriority('week', 5);
    addUnitPriority('isoWeek', 5);
    // PARSING
    addRegexToken('w', match1to2);
    addRegexToken('ww', match1to2, match2);
    addRegexToken('W', match1to2);
    addRegexToken('WW', match1to2, match2);
    addWeekParseToken([
        'w',
        'ww',
        'W',
        'WW'
    ], function(input, week, config, token) {
        week[token.substr(0, 1)] = toInt(input);
    });
    // HELPERS
    // LOCALES
    function localeWeek(mom) {
        return weekOfYear(mom, this._week.dow, this._week.doy).week;
    }
    var defaultLocaleWeek = {
        dow: 0,
        doy: 6
    };
    function localeFirstDayOfWeek() {
        return this._week.dow;
    }
    function localeFirstDayOfYear() {
        return this._week.doy;
    }
    // MOMENTS
    function getSetWeek(input) {
        var week = this.localeData().week(this);
        return input == null ? week : this.add((input - week) * 7, 'd');
    }
    function getSetISOWeek(input) {
        var week = weekOfYear(this, 1, 4).week;
        return input == null ? week : this.add((input - week) * 7, 'd');
    }
    // FORMATTING
    addFormatToken('d', 0, 'do', 'day');
    addFormatToken('dd', 0, 0, function(format) {
        return this.localeData().weekdaysMin(this, format);
    });
    addFormatToken('ddd', 0, 0, function(format) {
        return this.localeData().weekdaysShort(this, format);
    });
    addFormatToken('dddd', 0, 0, function(format) {
        return this.localeData().weekdays(this, format);
    });
    addFormatToken('e', 0, 0, 'weekday');
    addFormatToken('E', 0, 0, 'isoWeekday');
    // ALIASES
    addUnitAlias('day', 'd');
    addUnitAlias('weekday', 'e');
    addUnitAlias('isoWeekday', 'E');
    // PRIORITY
    addUnitPriority('day', 11);
    addUnitPriority('weekday', 11);
    addUnitPriority('isoWeekday', 11);
    // PARSING
    addRegexToken('d', match1to2);
    addRegexToken('e', match1to2);
    addRegexToken('E', match1to2);
    addRegexToken('dd', function(isStrict, locale) {
        return locale.weekdaysMinRegex(isStrict);
    });
    addRegexToken('ddd', function(isStrict, locale) {
        return locale.weekdaysShortRegex(isStrict);
    });
    addRegexToken('dddd', function(isStrict, locale) {
        return locale.weekdaysRegex(isStrict);
    });
    addWeekParseToken([
        'dd',
        'ddd',
        'dddd'
    ], function(input, week, config, token) {
        var weekday = config._locale.weekdaysParse(input, token, config._strict);
        // if we didn't get a weekday name, mark the date as invalid
        if (weekday != null) week.d = weekday;
        else getParsingFlags(config).invalidWeekday = input;
    });
    addWeekParseToken([
        'd',
        'e',
        'E'
    ], function(input, week, config, token) {
        week[token] = toInt(input);
    });
    // HELPERS
    function parseWeekday(input, locale) {
        if (typeof input !== 'string') return input;
        if (!isNaN(input)) return parseInt(input, 10);
        input = locale.weekdaysParse(input);
        if (typeof input === 'number') return input;
        return null;
    }
    function parseIsoWeekday(input, locale) {
        if (typeof input === 'string') return locale.weekdaysParse(input) % 7 || 7;
        return isNaN(input) ? null : input;
    }
    // LOCALES
    function shiftWeekdays(ws, n) {
        return ws.slice(n, 7).concat(ws.slice(0, n));
    }
    var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'), defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'), defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'), defaultWeekdaysRegex = matchWord, defaultWeekdaysShortRegex = matchWord, defaultWeekdaysMinRegex = matchWord;
    function localeWeekdays(m, format) {
        var weekdays = isArray(this._weekdays) ? this._weekdays : this._weekdays[m && m !== true && this._weekdays.isFormat.test(format) ? 'format' : 'standalone'];
        return m === true ? shiftWeekdays(weekdays, this._week.dow) : m ? weekdays[m.day()] : weekdays;
    }
    function localeWeekdaysShort(m) {
        return m === true ? shiftWeekdays(this._weekdaysShort, this._week.dow) : m ? this._weekdaysShort[m.day()] : this._weekdaysShort;
    }
    function localeWeekdaysMin(m) {
        return m === true ? shiftWeekdays(this._weekdaysMin, this._week.dow) : m ? this._weekdaysMin[m.day()] : this._weekdaysMin;
    }
    function handleStrictParse$1(weekdayName, format, strict) {
        var i, ii, mom, llc = weekdayName.toLocaleLowerCase();
        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._minWeekdaysParse = [];
            for(i = 0; i < 7; ++i){
                mom = createUTC([
                    2000,
                    1
                ]).day(i);
                this._minWeekdaysParse[i] = this.weekdaysMin(mom, '').toLocaleLowerCase();
                this._shortWeekdaysParse[i] = this.weekdaysShort(mom, '').toLocaleLowerCase();
                this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
            }
        }
        if (strict) {
            if (format === 'dddd') {
                ii = indexOf.call(this._weekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else if (format === 'ddd') {
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            }
        } else {
            if (format === 'dddd') {
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) return ii;
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                if (ii !== -1) return ii;
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else if (format === 'ddd') {
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                if (ii !== -1) return ii;
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) return ii;
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._minWeekdaysParse, llc);
                if (ii !== -1) return ii;
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) return ii;
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            }
        }
    }
    function localeWeekdaysParse(weekdayName, format, strict) {
        var i, mom, regex;
        if (this._weekdaysParseExact) return handleStrictParse$1.call(this, weekdayName, format, strict);
        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._minWeekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._fullWeekdaysParse = [];
        }
        for(i = 0; i < 7; i++){
            // make the regex if we don't have it already
            mom = createUTC([
                2000,
                1
            ]).day(i);
            if (strict && !this._fullWeekdaysParse[i]) {
                this._fullWeekdaysParse[i] = new RegExp('^' + this.weekdays(mom, '').replace('.', '\\.?') + '$', 'i');
                this._shortWeekdaysParse[i] = new RegExp('^' + this.weekdaysShort(mom, '').replace('.', '\\.?') + '$', 'i');
                this._minWeekdaysParse[i] = new RegExp('^' + this.weekdaysMin(mom, '').replace('.', '\\.?') + '$', 'i');
            }
            if (!this._weekdaysParse[i]) {
                regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
                this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (strict && format === 'dddd' && this._fullWeekdaysParse[i].test(weekdayName)) return i;
            else if (strict && format === 'ddd' && this._shortWeekdaysParse[i].test(weekdayName)) return i;
            else if (strict && format === 'dd' && this._minWeekdaysParse[i].test(weekdayName)) return i;
            else if (!strict && this._weekdaysParse[i].test(weekdayName)) return i;
        }
    }
    // MOMENTS
    function getSetDayOfWeek(input) {
        if (!this.isValid()) return input != null ? this : NaN;
        var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        if (input != null) {
            input = parseWeekday(input, this.localeData());
            return this.add(input - day, 'd');
        } else return day;
    }
    function getSetLocaleDayOfWeek(input) {
        if (!this.isValid()) return input != null ? this : NaN;
        var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return input == null ? weekday : this.add(input - weekday, 'd');
    }
    function getSetISODayOfWeek(input) {
        if (!this.isValid()) return input != null ? this : NaN;
        // behaves the same as moment#day except
        // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
        // as a setter, sunday should belong to the previous week.
        if (input != null) {
            var weekday = parseIsoWeekday(input, this.localeData());
            return this.day(this.day() % 7 ? weekday : weekday - 7);
        } else return this.day() || 7;
    }
    function weekdaysRegex(isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) computeWeekdaysParse.call(this);
            if (isStrict) return this._weekdaysStrictRegex;
            else return this._weekdaysRegex;
        } else {
            if (!hasOwnProp(this, '_weekdaysRegex')) this._weekdaysRegex = defaultWeekdaysRegex;
            return this._weekdaysStrictRegex && isStrict ? this._weekdaysStrictRegex : this._weekdaysRegex;
        }
    }
    function weekdaysShortRegex(isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) computeWeekdaysParse.call(this);
            if (isStrict) return this._weekdaysShortStrictRegex;
            else return this._weekdaysShortRegex;
        } else {
            if (!hasOwnProp(this, '_weekdaysShortRegex')) this._weekdaysShortRegex = defaultWeekdaysShortRegex;
            return this._weekdaysShortStrictRegex && isStrict ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
        }
    }
    function weekdaysMinRegex(isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) computeWeekdaysParse.call(this);
            if (isStrict) return this._weekdaysMinStrictRegex;
            else return this._weekdaysMinRegex;
        } else {
            if (!hasOwnProp(this, '_weekdaysMinRegex')) this._weekdaysMinRegex = defaultWeekdaysMinRegex;
            return this._weekdaysMinStrictRegex && isStrict ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
        }
    }
    function computeWeekdaysParse() {
        function cmpLenRev(a, b) {
            return b.length - a.length;
        }
        var minPieces = [], shortPieces = [], longPieces = [], mixedPieces = [], i, mom, minp, shortp, longp;
        for(i = 0; i < 7; i++){
            // make the regex if we don't have it already
            mom = createUTC([
                2000,
                1
            ]).day(i);
            minp = regexEscape(this.weekdaysMin(mom, ''));
            shortp = regexEscape(this.weekdaysShort(mom, ''));
            longp = regexEscape(this.weekdays(mom, ''));
            minPieces.push(minp);
            shortPieces.push(shortp);
            longPieces.push(longp);
            mixedPieces.push(minp);
            mixedPieces.push(shortp);
            mixedPieces.push(longp);
        }
        // Sorting makes sure if one weekday (or abbr) is a prefix of another it
        // will match the longer piece.
        minPieces.sort(cmpLenRev);
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._weekdaysShortRegex = this._weekdaysRegex;
        this._weekdaysMinRegex = this._weekdaysRegex;
        this._weekdaysStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
        this._weekdaysShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
        this._weekdaysMinStrictRegex = new RegExp('^(' + minPieces.join('|') + ')', 'i');
    }
    // FORMATTING
    function hFormat() {
        return this.hours() % 12 || 12;
    }
    function kFormat() {
        return this.hours() || 24;
    }
    addFormatToken('H', [
        'HH',
        2
    ], 0, 'hour');
    addFormatToken('h', [
        'hh',
        2
    ], 0, hFormat);
    addFormatToken('k', [
        'kk',
        2
    ], 0, kFormat);
    addFormatToken('hmm', 0, 0, function() {
        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
    });
    addFormatToken('hmmss', 0, 0, function() {
        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2);
    });
    addFormatToken('Hmm', 0, 0, function() {
        return '' + this.hours() + zeroFill(this.minutes(), 2);
    });
    addFormatToken('Hmmss', 0, 0, function() {
        return '' + this.hours() + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2);
    });
    function meridiem1(token, lowercase) {
        addFormatToken(token, 0, 0, function() {
            return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
        });
    }
    meridiem1('a', true);
    meridiem1('A', false);
    // ALIASES
    addUnitAlias('hour', 'h');
    // PRIORITY
    addUnitPriority('hour', 13);
    // PARSING
    function matchMeridiem(isStrict, locale) {
        return locale._meridiemParse;
    }
    addRegexToken('a', matchMeridiem);
    addRegexToken('A', matchMeridiem);
    addRegexToken('H', match1to2);
    addRegexToken('h', match1to2);
    addRegexToken('k', match1to2);
    addRegexToken('HH', match1to2, match2);
    addRegexToken('hh', match1to2, match2);
    addRegexToken('kk', match1to2, match2);
    addRegexToken('hmm', match3to4);
    addRegexToken('hmmss', match5to6);
    addRegexToken('Hmm', match3to4);
    addRegexToken('Hmmss', match5to6);
    addParseToken([
        'H',
        'HH'
    ], HOUR);
    addParseToken([
        'k',
        'kk'
    ], function(input, array, config) {
        var kInput = toInt(input);
        array[HOUR] = kInput === 24 ? 0 : kInput;
    });
    addParseToken([
        'a',
        'A'
    ], function(input, array, config) {
        config._isPm = config._locale.isPM(input);
        config._meridiem = input;
    });
    addParseToken([
        'h',
        'hh'
    ], function(input, array, config) {
        array[HOUR] = toInt(input);
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmm', function(input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmmss', function(input, array, config) {
        var pos1 = input.length - 4, pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('Hmm', function(input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
    });
    addParseToken('Hmmss', function(input, array, config) {
        var pos1 = input.length - 4, pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
    });
    // LOCALES
    function localeIsPM(input) {
        // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
        // Using charAt should be more compatible.
        return (input + '').toLowerCase().charAt(0) === 'p';
    }
    var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i, // Setting the hour should keep the time, because the user explicitly
    // specified which hour they want. So trying to maintain the same hour (in
    // a new timezone) makes sense. Adding/subtracting hours does not follow
    // this rule.
    getSetHour = makeGetSet('Hours', true);
    function localeMeridiem(hours, minutes, isLower) {
        if (hours > 11) return isLower ? 'pm' : 'PM';
        else return isLower ? 'am' : 'AM';
    }
    var baseConfig = {
        calendar: defaultCalendar,
        longDateFormat: defaultLongDateFormat,
        invalidDate: defaultInvalidDate,
        ordinal: defaultOrdinal,
        dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
        relativeTime: defaultRelativeTime,
        months: defaultLocaleMonths,
        monthsShort: defaultLocaleMonthsShort,
        week: defaultLocaleWeek,
        weekdays: defaultLocaleWeekdays,
        weekdaysMin: defaultLocaleWeekdaysMin,
        weekdaysShort: defaultLocaleWeekdaysShort,
        meridiemParse: defaultLocaleMeridiemParse
    };
    // internal storage for locale config files
    var locales = {
    }, localeFamilies = {
    }, globalLocale;
    function commonPrefix(arr1, arr2) {
        var i, minl = Math.min(arr1.length, arr2.length);
        for(i = 0; i < minl; i += 1){
            if (arr1[i] !== arr2[i]) return i;
        }
        return minl;
    }
    function normalizeLocale(key) {
        return key ? key.toLowerCase().replace('_', '-') : key;
    }
    // pick the locale from the array
    // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
    // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
    function chooseLocale(names) {
        var i = 0, j, next, locale, split;
        while(i < names.length){
            split = normalizeLocale(names[i]).split('-');
            j = split.length;
            next = normalizeLocale(names[i + 1]);
            next = next ? next.split('-') : null;
            while(j > 0){
                locale = loadLocale(split.slice(0, j).join('-'));
                if (locale) return locale;
                if (next && next.length >= j && commonPrefix(split, next) >= j - 1) break;
                j--;
            }
            i++;
        }
        return globalLocale;
    }
    function loadLocale(name) {
        var oldLocale = null, aliasedRequire;
        // TODO: Find a better way to register and load all the locales in Node
        if (locales[name] === undefined && typeof module !== 'undefined' && module && module.exports) try {
            oldLocale = globalLocale._abbr;
            aliasedRequire = undefined;
            aliasedRequire('./locale/' + name);
            getSetGlobalLocale(oldLocale);
        } catch (e) {
            // mark as not found to avoid repeating expensive file require call causing high CPU
            // when trying to find en-US, en_US, en-us for every format call
            locales[name] = null; // null means not found
        }
        return locales[name];
    }
    // This function will load locale and then set the global locale.  If
    // no arguments are passed in, it will simply return the current global
    // locale key.
    function getSetGlobalLocale(key, values) {
        var data;
        if (key) {
            if (isUndefined(values)) data = getLocale(key);
            else data = defineLocale(key, values);
            if (data) // moment.duration._locale = moment._locale = data;
            globalLocale = data;
            else if (typeof console !== 'undefined' && console.warn) //warn user if arguments are passed but the locale could not be set
            console.warn('Locale ' + key + ' not found. Did you forget to load it?');
        }
        return globalLocale._abbr;
    }
    function defineLocale(name, config) {
        if (config !== null) {
            var locale, parentConfig = baseConfig;
            config.abbr = name;
            if (locales[name] != null) {
                deprecateSimple('defineLocaleOverride', "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info.");
                parentConfig = locales[name]._config;
            } else if (config.parentLocale != null) {
                if (locales[config.parentLocale] != null) parentConfig = locales[config.parentLocale]._config;
                else {
                    locale = loadLocale(config.parentLocale);
                    if (locale != null) parentConfig = locale._config;
                    else {
                        if (!localeFamilies[config.parentLocale]) localeFamilies[config.parentLocale] = [];
                        localeFamilies[config.parentLocale].push({
                            name: name,
                            config: config
                        });
                        return null;
                    }
                }
            }
            locales[name] = new Locale(mergeConfigs(parentConfig, config));
            if (localeFamilies[name]) localeFamilies[name].forEach(function(x) {
                defineLocale(x.name, x.config);
            });
            // backwards compat for now: also set the locale
            // make sure we set the locale AFTER all child locales have been
            // created, so we won't end up with the child locale set.
            getSetGlobalLocale(name);
            return locales[name];
        } else {
            // useful for testing
            delete locales[name];
            return null;
        }
    }
    function updateLocale(name, config) {
        if (config != null) {
            var locale, tmpLocale, parentConfig = baseConfig;
            if (locales[name] != null && locales[name].parentLocale != null) // Update existing child locale in-place to avoid memory-leaks
            locales[name].set(mergeConfigs(locales[name]._config, config));
            else {
                // MERGE
                tmpLocale = loadLocale(name);
                if (tmpLocale != null) parentConfig = tmpLocale._config;
                config = mergeConfigs(parentConfig, config);
                if (tmpLocale == null) // updateLocale is called for creating a new locale
                // Set abbr so it will have a name (getters return
                // undefined otherwise).
                config.abbr = name;
                locale = new Locale(config);
                locale.parentLocale = locales[name];
                locales[name] = locale;
            }
            // backwards compat for now: also set the locale
            getSetGlobalLocale(name);
        } else // pass null for config to unupdate, useful for tests
        if (locales[name] != null) {
            if (locales[name].parentLocale != null) {
                locales[name] = locales[name].parentLocale;
                if (name === getSetGlobalLocale()) getSetGlobalLocale(name);
            } else if (locales[name] != null) delete locales[name];
        }
        return locales[name];
    }
    // returns locale data
    function getLocale(key) {
        var locale;
        if (key && key._locale && key._locale._abbr) key = key._locale._abbr;
        if (!key) return globalLocale;
        if (!isArray(key)) {
            //short-circuit everything else
            locale = loadLocale(key);
            if (locale) return locale;
            key = [
                key
            ];
        }
        return chooseLocale(key);
    }
    function listLocales() {
        return keys(locales);
    }
    function checkOverflow(m) {
        var overflow, a = m._a;
        if (a && getParsingFlags(m).overflow === -2) {
            overflow = a[MONTH] < 0 || a[MONTH] > 11 ? MONTH : a[DATE] < 1 || a[DATE] > daysInMonth(a[YEAR], a[MONTH]) ? DATE : a[HOUR] < 0 || a[HOUR] > 24 || a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0) ? HOUR : a[MINUTE] < 0 || a[MINUTE] > 59 ? MINUTE : a[SECOND] < 0 || a[SECOND] > 59 ? SECOND : a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND : -1;
            if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) overflow = DATE;
            if (getParsingFlags(m)._overflowWeeks && overflow === -1) overflow = WEEK;
            if (getParsingFlags(m)._overflowWeekday && overflow === -1) overflow = WEEKDAY;
            getParsingFlags(m).overflow = overflow;
        }
        return m;
    }
    // iso 8601 regex
    // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
    var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, tzRegex = /Z|[+-]\d\d(?::?\d\d)?/, isoDates = [
        [
            'YYYYYY-MM-DD',
            /[+-]\d{6}-\d\d-\d\d/
        ],
        [
            'YYYY-MM-DD',
            /\d{4}-\d\d-\d\d/
        ],
        [
            'GGGG-[W]WW-E',
            /\d{4}-W\d\d-\d/
        ],
        [
            'GGGG-[W]WW',
            /\d{4}-W\d\d/,
            false
        ],
        [
            'YYYY-DDD',
            /\d{4}-\d{3}/
        ],
        [
            'YYYY-MM',
            /\d{4}-\d\d/,
            false
        ],
        [
            'YYYYYYMMDD',
            /[+-]\d{10}/
        ],
        [
            'YYYYMMDD',
            /\d{8}/
        ],
        [
            'GGGG[W]WWE',
            /\d{4}W\d{3}/
        ],
        [
            'GGGG[W]WW',
            /\d{4}W\d{2}/,
            false
        ],
        [
            'YYYYDDD',
            /\d{7}/
        ],
        [
            'YYYYMM',
            /\d{6}/,
            false
        ],
        [
            'YYYY',
            /\d{4}/,
            false
        ], 
    ], // iso time formats and regexes
    isoTimes = [
        [
            'HH:mm:ss.SSSS',
            /\d\d:\d\d:\d\d\.\d+/
        ],
        [
            'HH:mm:ss,SSSS',
            /\d\d:\d\d:\d\d,\d+/
        ],
        [
            'HH:mm:ss',
            /\d\d:\d\d:\d\d/
        ],
        [
            'HH:mm',
            /\d\d:\d\d/
        ],
        [
            'HHmmss.SSSS',
            /\d\d\d\d\d\d\.\d+/
        ],
        [
            'HHmmss,SSSS',
            /\d\d\d\d\d\d,\d+/
        ],
        [
            'HHmmss',
            /\d\d\d\d\d\d/
        ],
        [
            'HHmm',
            /\d\d\d\d/
        ],
        [
            'HH',
            /\d\d/
        ], 
    ], aspNetJsonRegex = /^\/?Date\((-?\d+)/i, // RFC 2822 regex: For details see https://tools.ietf.org/html/rfc2822#section-3.3
    rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/, obsOffsets = {
        UT: 0,
        GMT: 0,
        EDT: -240,
        EST: -300,
        CDT: -300,
        CST: -360,
        MDT: -360,
        MST: -420,
        PDT: -420,
        PST: -480
    };
    // date from iso format
    function configFromISO(config) {
        var i, l, string = config._i, match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string), allowTime, dateFormat, timeFormat, tzFormat;
        if (match) {
            getParsingFlags(config).iso = true;
            for(i = 0, l = isoDates.length; i < l; i++)if (isoDates[i][1].exec(match[1])) {
                dateFormat = isoDates[i][0];
                allowTime = isoDates[i][2] !== false;
                break;
            }
            if (dateFormat == null) {
                config._isValid = false;
                return;
            }
            if (match[3]) {
                for(i = 0, l = isoTimes.length; i < l; i++)if (isoTimes[i][1].exec(match[3])) {
                    // match[2] should be 'T' or space
                    timeFormat = (match[2] || ' ') + isoTimes[i][0];
                    break;
                }
                if (timeFormat == null) {
                    config._isValid = false;
                    return;
                }
            }
            if (!allowTime && timeFormat != null) {
                config._isValid = false;
                return;
            }
            if (match[4]) {
                if (tzRegex.exec(match[4])) tzFormat = 'Z';
                else {
                    config._isValid = false;
                    return;
                }
            }
            config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
            configFromStringAndFormat(config);
        } else config._isValid = false;
    }
    function extractFromRFC2822Strings(yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
        var result = [
            untruncateYear(yearStr),
            defaultLocaleMonthsShort.indexOf(monthStr),
            parseInt(dayStr, 10),
            parseInt(hourStr, 10),
            parseInt(minuteStr, 10), 
        ];
        if (secondStr) result.push(parseInt(secondStr, 10));
        return result;
    }
    function untruncateYear(yearStr) {
        var year = parseInt(yearStr, 10);
        if (year <= 49) return 2000 + year;
        else if (year <= 999) return 1900 + year;
        return year;
    }
    function preprocessRFC2822(s) {
        // Remove comments and folding whitespace and replace multiple-spaces with a single space
        return s.replace(/\([^)]*\)|[\n\t]/g, ' ').replace(/(\s\s+)/g, ' ').replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    }
    function checkWeekday(weekdayStr, parsedInput, config) {
        if (weekdayStr) {
            // TODO: Replace the vanilla JS Date object with an independent day-of-week check.
            var weekdayProvided = defaultLocaleWeekdaysShort.indexOf(weekdayStr), weekdayActual = new Date(parsedInput[0], parsedInput[1], parsedInput[2]).getDay();
            if (weekdayProvided !== weekdayActual) {
                getParsingFlags(config).weekdayMismatch = true;
                config._isValid = false;
                return false;
            }
        }
        return true;
    }
    function calculateOffset(obsOffset, militaryOffset, numOffset) {
        if (obsOffset) return obsOffsets[obsOffset];
        else if (militaryOffset) // the only allowed military tz is Z
        return 0;
        else {
            var hm = parseInt(numOffset, 10), m = hm % 100, h = (hm - m) / 100;
            return h * 60 + m;
        }
    }
    // date and time from ref 2822 format
    function configFromRFC2822(config) {
        var match = rfc2822.exec(preprocessRFC2822(config._i)), parsedArray;
        if (match) {
            parsedArray = extractFromRFC2822Strings(match[4], match[3], match[2], match[5], match[6], match[7]);
            if (!checkWeekday(match[1], parsedArray, config)) return;
            config._a = parsedArray;
            config._tzm = calculateOffset(match[8], match[9], match[10]);
            config._d = createUTCDate.apply(null, config._a);
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
            getParsingFlags(config).rfc2822 = true;
        } else config._isValid = false;
    }
    // date from 1) ASP.NET, 2) ISO, 3) RFC 2822 formats, or 4) optional fallback if parsing isn't strict
    function configFromString(config) {
        var matched = aspNetJsonRegex.exec(config._i);
        if (matched !== null) {
            config._d = new Date(+matched[1]);
            return;
        }
        configFromISO(config);
        if (config._isValid === false) delete config._isValid;
        else return;
        configFromRFC2822(config);
        if (config._isValid === false) delete config._isValid;
        else return;
        if (config._strict) config._isValid = false;
        else // Final attempt, use Input Fallback
        hooks.createFromInputFallback(config);
    }
    hooks.createFromInputFallback = deprecate("value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.", function(config) {
        config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
    });
    // Pick the first defined of two or three arguments.
    function defaults(a, b, c) {
        if (a != null) return a;
        if (b != null) return b;
        return c;
    }
    function currentDateArray(config) {
        // hooks is actually the exported moment object
        var nowValue = new Date(hooks.now());
        if (config._useUTC) return [
            nowValue.getUTCFullYear(),
            nowValue.getUTCMonth(),
            nowValue.getUTCDate(), 
        ];
        return [
            nowValue.getFullYear(),
            nowValue.getMonth(),
            nowValue.getDate()
        ];
    }
    // convert an array to a date.
    // the array should mirror the parameters below
    // note: all values past the year are optional and will default to the lowest possible value.
    // [year, month, day , hour, minute, second, millisecond]
    function configFromArray(config) {
        var i, date, input = [], currentDate, expectedWeekday, yearToUse;
        if (config._d) return;
        currentDate = currentDateArray(config);
        //compute day of the year from weeks and weekdays
        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) dayOfYearFromWeekInfo(config);
        //if the day of the year is set, figure out what it is
        if (config._dayOfYear != null) {
            yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);
            if (config._dayOfYear > daysInYear(yearToUse) || config._dayOfYear === 0) getParsingFlags(config)._overflowDayOfYear = true;
            date = createUTCDate(yearToUse, 0, config._dayOfYear);
            config._a[MONTH] = date.getUTCMonth();
            config._a[DATE] = date.getUTCDate();
        }
        // Default to current date.
        // * if no year, month, day of month are given, default to today
        // * if day of month is given, default month and year
        // * if month is given, default only year
        // * if year is given, don't default anything
        for(i = 0; i < 3 && config._a[i] == null; ++i)config._a[i] = input[i] = currentDate[i];
        // Zero out whatever was not defaulted, including time
        for(; i < 7; i++)config._a[i] = input[i] = config._a[i] == null ? i === 2 ? 1 : 0 : config._a[i];
        // Check for 24:00:00.000
        if (config._a[HOUR] === 24 && config._a[MINUTE] === 0 && config._a[SECOND] === 0 && config._a[MILLISECOND] === 0) {
            config._nextDay = true;
            config._a[HOUR] = 0;
        }
        config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
        expectedWeekday = config._useUTC ? config._d.getUTCDay() : config._d.getDay();
        // Apply timezone offset from input. The actual utcOffset can be changed
        // with parseZone.
        if (config._tzm != null) config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
        if (config._nextDay) config._a[HOUR] = 24;
        // check for mismatching day of week
        if (config._w && typeof config._w.d !== 'undefined' && config._w.d !== expectedWeekday) getParsingFlags(config).weekdayMismatch = true;
    }
    function dayOfYearFromWeekInfo(config) {
        var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow, curWeek;
        w = config._w;
        if (w.GG != null || w.W != null || w.E != null) {
            dow = 1;
            doy = 4;
            // TODO: We need to take the current isoWeekYear, but that depends on
            // how we interpret now (local, utc, fixed offset). So create
            // a now version of current config (take local/utc/offset flags, and
            // create now).
            weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(createLocal(), 1, 4).year);
            week = defaults(w.W, 1);
            weekday = defaults(w.E, 1);
            if (weekday < 1 || weekday > 7) weekdayOverflow = true;
        } else {
            dow = config._locale._week.dow;
            doy = config._locale._week.doy;
            curWeek = weekOfYear(createLocal(), dow, doy);
            weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);
            // Default to current week.
            week = defaults(w.w, curWeek.week);
            if (w.d != null) {
                // weekday -- low day numbers are considered next week
                weekday = w.d;
                if (weekday < 0 || weekday > 6) weekdayOverflow = true;
            } else if (w.e != null) {
                // local weekday -- counting starts from beginning of week
                weekday = w.e + dow;
                if (w.e < 0 || w.e > 6) weekdayOverflow = true;
            } else // default to beginning of week
            weekday = dow;
        }
        if (week < 1 || week > weeksInYear(weekYear, dow, doy)) getParsingFlags(config)._overflowWeeks = true;
        else if (weekdayOverflow != null) getParsingFlags(config)._overflowWeekday = true;
        else {
            temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
            config._a[YEAR] = temp.year;
            config._dayOfYear = temp.dayOfYear;
        }
    }
    // constant that refers to the ISO standard
    hooks.ISO_8601 = function() {
    };
    // constant that refers to the RFC 2822 form
    hooks.RFC_2822 = function() {
    };
    // date from string and format string
    function configFromStringAndFormat(config) {
        // TODO: Move this to another part of the creation flow to prevent circular deps
        if (config._f === hooks.ISO_8601) {
            configFromISO(config);
            return;
        }
        if (config._f === hooks.RFC_2822) {
            configFromRFC2822(config);
            return;
        }
        config._a = [];
        getParsingFlags(config).empty = true;
        // This array is used to make a Date, either with `new Date` or `Date.UTC`
        var string = '' + config._i, i, parsedInput, tokens, token, skipped, stringLength = string.length, totalParsedInputLength = 0, era;
        tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];
        for(i = 0; i < tokens.length; i++){
            token = tokens[i];
            parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
            if (parsedInput) {
                skipped = string.substr(0, string.indexOf(parsedInput));
                if (skipped.length > 0) getParsingFlags(config).unusedInput.push(skipped);
                string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
                totalParsedInputLength += parsedInput.length;
            }
            // don't parse if it's not a known token
            if (formatTokenFunctions[token]) {
                if (parsedInput) getParsingFlags(config).empty = false;
                else getParsingFlags(config).unusedTokens.push(token);
                addTimeToArrayFromToken(token, parsedInput, config);
            } else if (config._strict && !parsedInput) getParsingFlags(config).unusedTokens.push(token);
        }
        // add remaining unparsed input length to the string
        getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
        if (string.length > 0) getParsingFlags(config).unusedInput.push(string);
        // clear _12h flag if hour is <= 12
        if (config._a[HOUR] <= 12 && getParsingFlags(config).bigHour === true && config._a[HOUR] > 0) getParsingFlags(config).bigHour = undefined;
        getParsingFlags(config).parsedDateParts = config._a.slice(0);
        getParsingFlags(config).meridiem = config._meridiem;
        // handle meridiem
        config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);
        // handle era
        era = getParsingFlags(config).era;
        if (era !== null) config._a[YEAR] = config._locale.erasConvertYear(era, config._a[YEAR]);
        configFromArray(config);
        checkOverflow(config);
    }
    function meridiemFixWrap(locale, hour, meridiem) {
        var isPm;
        if (meridiem == null) // nothing to do
        return hour;
        if (locale.meridiemHour != null) return locale.meridiemHour(hour, meridiem);
        else if (locale.isPM != null) {
            // Fallback
            isPm = locale.isPM(meridiem);
            if (isPm && hour < 12) hour += 12;
            if (!isPm && hour === 12) hour = 0;
            return hour;
        } else // this is not supposed to happen
        return hour;
    }
    // date from string and array of format strings
    function configFromStringAndArray(config) {
        var tempConfig, bestMoment, scoreToBeat, i, currentScore, validFormatFound, bestFormatIsValid = false;
        if (config._f.length === 0) {
            getParsingFlags(config).invalidFormat = true;
            config._d = new Date(NaN);
            return;
        }
        for(i = 0; i < config._f.length; i++){
            currentScore = 0;
            validFormatFound = false;
            tempConfig = copyConfig({
            }, config);
            if (config._useUTC != null) tempConfig._useUTC = config._useUTC;
            tempConfig._f = config._f[i];
            configFromStringAndFormat(tempConfig);
            if (isValid(tempConfig)) validFormatFound = true;
            // if there is any input that was not parsed add a penalty for that format
            currentScore += getParsingFlags(tempConfig).charsLeftOver;
            //or tokens
            currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;
            getParsingFlags(tempConfig).score = currentScore;
            if (!bestFormatIsValid) {
                if (scoreToBeat == null || currentScore < scoreToBeat || validFormatFound) {
                    scoreToBeat = currentScore;
                    bestMoment = tempConfig;
                    if (validFormatFound) bestFormatIsValid = true;
                }
            } else if (currentScore < scoreToBeat) {
                scoreToBeat = currentScore;
                bestMoment = tempConfig;
            }
        }
        extend(config, bestMoment || tempConfig);
    }
    function configFromObject(config) {
        if (config._d) return;
        var i = normalizeObjectUnits(config._i), dayOrDate = i.day === undefined ? i.date : i.day;
        config._a = map([
            i.year,
            i.month,
            dayOrDate,
            i.hour,
            i.minute,
            i.second,
            i.millisecond
        ], function(obj) {
            return obj && parseInt(obj, 10);
        });
        configFromArray(config);
    }
    function createFromConfig(config) {
        var res = new Moment(checkOverflow(prepareConfig(config)));
        if (res._nextDay) {
            // Adding is smart enough around DST
            res.add(1, 'd');
            res._nextDay = undefined;
        }
        return res;
    }
    function prepareConfig(config) {
        var input = config._i, format = config._f;
        config._locale = config._locale || getLocale(config._l);
        if (input === null || format === undefined && input === '') return createInvalid({
            nullInput: true
        });
        if (typeof input === 'string') config._i = input = config._locale.preparse(input);
        if (isMoment(input)) return new Moment(checkOverflow(input));
        else if (isDate(input)) config._d = input;
        else if (isArray(format)) configFromStringAndArray(config);
        else if (format) configFromStringAndFormat(config);
        else configFromInput(config);
        if (!isValid(config)) config._d = null;
        return config;
    }
    function configFromInput(config) {
        var input = config._i;
        if (isUndefined(input)) config._d = new Date(hooks.now());
        else if (isDate(input)) config._d = new Date(input.valueOf());
        else if (typeof input === 'string') configFromString(config);
        else if (isArray(input)) {
            config._a = map(input.slice(0), function(obj) {
                return parseInt(obj, 10);
            });
            configFromArray(config);
        } else if (isObject(input)) configFromObject(config);
        else if (isNumber(input)) // from milliseconds
        config._d = new Date(input);
        else hooks.createFromInputFallback(config);
    }
    function createLocalOrUTC(input, format, locale, strict, isUTC) {
        var c = {
        };
        if (format === true || format === false) {
            strict = format;
            format = undefined;
        }
        if (locale === true || locale === false) {
            strict = locale;
            locale = undefined;
        }
        if (isObject(input) && isObjectEmpty(input) || isArray(input) && input.length === 0) input = undefined;
        // object construction must be done this way.
        // https://github.com/moment/moment/issues/1423
        c._isAMomentObject = true;
        c._useUTC = c._isUTC = isUTC;
        c._l = locale;
        c._i = input;
        c._f = format;
        c._strict = strict;
        return createFromConfig(c);
    }
    function createLocal(input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, false);
    }
    var prototypeMin = deprecate('moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/', function() {
        var other = createLocal.apply(null, arguments);
        if (this.isValid() && other.isValid()) return other < this ? this : other;
        else return createInvalid();
    }), prototypeMax = deprecate('moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/', function() {
        var other = createLocal.apply(null, arguments);
        if (this.isValid() && other.isValid()) return other > this ? this : other;
        else return createInvalid();
    });
    // Pick a moment m from moments so that m[fn](other) is true for all
    // other. This relies on the function fn to be transitive.
    //
    // moments should either be an array of moment objects or an array, whose
    // first element is an array of moment objects.
    function pickBy(fn, moments) {
        var res, i;
        if (moments.length === 1 && isArray(moments[0])) moments = moments[0];
        if (!moments.length) return createLocal();
        res = moments[0];
        for(i = 1; i < moments.length; ++i)if (!moments[i].isValid() || moments[i][fn](res)) res = moments[i];
        return res;
    }
    // TODO: Use [].sort instead?
    function min() {
        var args = [].slice.call(arguments, 0);
        return pickBy('isBefore', args);
    }
    function max() {
        var args = [].slice.call(arguments, 0);
        return pickBy('isAfter', args);
    }
    var now1 = function() {
        return Date.now ? Date.now() : +new Date();
    };
    var ordering = [
        'year',
        'quarter',
        'month',
        'week',
        'day',
        'hour',
        'minute',
        'second',
        'millisecond', 
    ];
    function isDurationValid(m) {
        var key, unitHasDecimal = false, i;
        for(key in m){
            if (hasOwnProp(m, key) && !(indexOf.call(ordering, key) !== -1 && (m[key] == null || !isNaN(m[key])))) return false;
        }
        for(i = 0; i < ordering.length; ++i)if (m[ordering[i]]) {
            if (unitHasDecimal) return false; // only allow non-integers for smallest unit
            if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) unitHasDecimal = true;
        }
        return true;
    }
    function isValid$1() {
        return this._isValid;
    }
    function createInvalid$1() {
        return createDuration(NaN);
    }
    function Duration(duration) {
        var normalizedInput = normalizeObjectUnits(duration), years = normalizedInput.year || 0, quarters = normalizedInput.quarter || 0, months = normalizedInput.month || 0, weeks = normalizedInput.week || normalizedInput.isoWeek || 0, days = normalizedInput.day || 0, hours = normalizedInput.hour || 0, minutes = normalizedInput.minute || 0, seconds = normalizedInput.second || 0, milliseconds = normalizedInput.millisecond || 0;
        this._isValid = isDurationValid(normalizedInput);
        // representation for dateAddRemove
        this._milliseconds = +milliseconds + seconds * 1000 + minutes * 60000 + hours * 3600000; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
        // Because of dateAddRemove treats 24 hours as different from a
        // day when working around DST, we need to store them separately
        this._days = +days + weeks * 7;
        // It is impossible to translate months into days without knowing
        // which months you are are talking about, so we have to store
        // it separately.
        this._months = +months + quarters * 3 + years * 12;
        this._data = {
        };
        this._locale = getLocale();
        this._bubble();
    }
    function isDuration(obj) {
        return obj instanceof Duration;
    }
    function absRound(number) {
        if (number < 0) return Math.round(-1 * number) * -1;
        else return Math.round(number);
    }
    // compare two arrays, return the number of differences
    function compareArrays(array1, array2, dontConvert) {
        var len = Math.min(array1.length, array2.length), lengthDiff = Math.abs(array1.length - array2.length), diffs = 0, i;
        for(i = 0; i < len; i++)if (dontConvert && array1[i] !== array2[i] || !dontConvert && toInt(array1[i]) !== toInt(array2[i])) diffs++;
        return diffs + lengthDiff;
    }
    // FORMATTING
    function offset1(token, separator) {
        addFormatToken(token, 0, 0, function() {
            var offset = this.utcOffset(), sign = '+';
            if (offset < 0) {
                offset = -offset;
                sign = '-';
            }
            return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~offset % 60, 2);
        });
    }
    offset1('Z', ':');
    offset1('ZZ', '');
    // PARSING
    addRegexToken('Z', matchShortOffset);
    addRegexToken('ZZ', matchShortOffset);
    addParseToken([
        'Z',
        'ZZ'
    ], function(input, array, config) {
        config._useUTC = true;
        config._tzm = offsetFromString(matchShortOffset, input);
    });
    // HELPERS
    // timezone chunker
    // '+10:00' > ['10',  '00']
    // '-1530'  > ['-15', '30']
    var chunkOffset = /([\+\-]|\d\d)/gi;
    function offsetFromString(matcher, string) {
        var matches = (string || '').match(matcher), chunk, parts, minutes;
        if (matches === null) return null;
        chunk = matches[matches.length - 1] || [];
        parts = (chunk + '').match(chunkOffset) || [
            '-',
            0,
            0
        ];
        minutes = +(parts[1] * 60) + toInt(parts[2]);
        return minutes === 0 ? 0 : parts[0] === '+' ? minutes : -minutes;
    }
    // Return a moment from input, that is local/utc/zone equivalent to model.
    function cloneWithOffset(input, model) {
        var res, diff;
        if (model._isUTC) {
            res = model.clone();
            diff = (isMoment(input) || isDate(input) ? input.valueOf() : createLocal(input).valueOf()) - res.valueOf();
            // Use low-level api, because this fn is low-level api.
            res._d.setTime(res._d.valueOf() + diff);
            hooks.updateOffset(res, false);
            return res;
        } else return createLocal(input).local();
    }
    function getDateOffset(m) {
        // On Firefox.24 Date#getTimezoneOffset returns a floating point.
        // https://github.com/moment/moment/pull/1871
        return -Math.round(m._d.getTimezoneOffset());
    }
    // HOOKS
    // This function will be called whenever a moment is mutated.
    // It is intended to keep the offset in sync with the timezone.
    hooks.updateOffset = function() {
    };
    // MOMENTS
    // keepLocalTime = true means only change the timezone, without
    // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
    // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
    // +0200, so we adjust the time as needed, to be valid.
    //
    // Keeping the time actually adds/subtracts (one hour)
    // from the actual represented time. That is why we call updateOffset
    // a second time. In case it wants us to change the offset again
    // _changeInProgress == true case, then we have to adjust, because
    // there is no such time in the given timezone.
    function getSetOffset(input, keepLocalTime, keepMinutes) {
        var offset = this._offset || 0, localAdjust;
        if (!this.isValid()) return input != null ? this : NaN;
        if (input != null) {
            if (typeof input === 'string') {
                input = offsetFromString(matchShortOffset, input);
                if (input === null) return this;
            } else if (Math.abs(input) < 16 && !keepMinutes) input = input * 60;
            if (!this._isUTC && keepLocalTime) localAdjust = getDateOffset(this);
            this._offset = input;
            this._isUTC = true;
            if (localAdjust != null) this.add(localAdjust, 'm');
            if (offset !== input) {
                if (!keepLocalTime || this._changeInProgress) addSubtract(this, createDuration(input - offset, 'm'), 1, false);
                else if (!this._changeInProgress) {
                    this._changeInProgress = true;
                    hooks.updateOffset(this, true);
                    this._changeInProgress = null;
                }
            }
            return this;
        } else return this._isUTC ? offset : getDateOffset(this);
    }
    function getSetZone(input, keepLocalTime) {
        if (input != null) {
            if (typeof input !== 'string') input = -input;
            this.utcOffset(input, keepLocalTime);
            return this;
        } else return -this.utcOffset();
    }
    function setOffsetToUTC(keepLocalTime) {
        return this.utcOffset(0, keepLocalTime);
    }
    function setOffsetToLocal(keepLocalTime) {
        if (this._isUTC) {
            this.utcOffset(0, keepLocalTime);
            this._isUTC = false;
            if (keepLocalTime) this.subtract(getDateOffset(this), 'm');
        }
        return this;
    }
    function setOffsetToParsedOffset() {
        if (this._tzm != null) this.utcOffset(this._tzm, false, true);
        else if (typeof this._i === 'string') {
            var tZone = offsetFromString(matchOffset, this._i);
            if (tZone != null) this.utcOffset(tZone);
            else this.utcOffset(0, true);
        }
        return this;
    }
    function hasAlignedHourOffset(input) {
        if (!this.isValid()) return false;
        input = input ? createLocal(input).utcOffset() : 0;
        return (this.utcOffset() - input) % 60 === 0;
    }
    function isDaylightSavingTime() {
        return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
    }
    function isDaylightSavingTimeShifted() {
        if (!isUndefined(this._isDSTShifted)) return this._isDSTShifted;
        var c = {
        }, other;
        copyConfig(c, this);
        c = prepareConfig(c);
        if (c._a) {
            other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
            this._isDSTShifted = this.isValid() && compareArrays(c._a, other.toArray()) > 0;
        } else this._isDSTShifted = false;
        return this._isDSTShifted;
    }
    function isLocal() {
        return this.isValid() ? !this._isUTC : false;
    }
    function isUtcOffset() {
        return this.isValid() ? this._isUTC : false;
    }
    function isUtc() {
        return this.isValid() ? this._isUTC && this._offset === 0 : false;
    }
    // ASP.NET json date format regex
    var aspNetRegex = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/, // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
    // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
    // and further modified to allow for strings containing both week and day
    isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
    function createDuration(input, key) {
        var duration = input, // matching against regexp is expensive, do it on demand
        match = null, sign, ret, diffRes;
        if (isDuration(input)) duration = {
            ms: input._milliseconds,
            d: input._days,
            M: input._months
        };
        else if (isNumber(input) || !isNaN(+input)) {
            duration = {
            };
            if (key) duration[key] = +input;
            else duration.milliseconds = +input;
        } else if (match = aspNetRegex.exec(input)) {
            sign = match[1] === '-' ? -1 : 1;
            duration = {
                y: 0,
                d: toInt(match[DATE]) * sign,
                h: toInt(match[HOUR]) * sign,
                m: toInt(match[MINUTE]) * sign,
                s: toInt(match[SECOND]) * sign,
                ms: toInt(absRound(match[MILLISECOND] * 1000)) * sign
            };
        } else if (match = isoRegex.exec(input)) {
            sign = match[1] === '-' ? -1 : 1;
            duration = {
                y: parseIso(match[2], sign),
                M: parseIso(match[3], sign),
                w: parseIso(match[4], sign),
                d: parseIso(match[5], sign),
                h: parseIso(match[6], sign),
                m: parseIso(match[7], sign),
                s: parseIso(match[8], sign)
            };
        } else if (duration == null) // checks for null or undefined
        duration = {
        };
        else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
            diffRes = momentsDifference(createLocal(duration.from), createLocal(duration.to));
            duration = {
            };
            duration.ms = diffRes.milliseconds;
            duration.M = diffRes.months;
        }
        ret = new Duration(duration);
        if (isDuration(input) && hasOwnProp(input, '_locale')) ret._locale = input._locale;
        if (isDuration(input) && hasOwnProp(input, '_isValid')) ret._isValid = input._isValid;
        return ret;
    }
    createDuration.fn = Duration.prototype;
    createDuration.invalid = createInvalid$1;
    function parseIso(inp, sign) {
        // We'd normally use ~~inp for this, but unfortunately it also
        // converts floats to ints.
        // inp may be undefined, so careful calling replace on it.
        var res = inp && parseFloat(inp.replace(',', '.'));
        // apply sign while we're at it
        return (isNaN(res) ? 0 : res) * sign;
    }
    function positiveMomentsDifference(base, other) {
        var res = {
        };
        res.months = other.month() - base.month() + (other.year() - base.year()) * 12;
        if (base.clone().add(res.months, 'M').isAfter(other)) --res.months;
        res.milliseconds = +other - +base.clone().add(res.months, 'M');
        return res;
    }
    function momentsDifference(base, other) {
        var res;
        if (!(base.isValid() && other.isValid())) return {
            milliseconds: 0,
            months: 0
        };
        other = cloneWithOffset(other, base);
        if (base.isBefore(other)) res = positiveMomentsDifference(base, other);
        else {
            res = positiveMomentsDifference(other, base);
            res.milliseconds = -res.milliseconds;
            res.months = -res.months;
        }
        return res;
    }
    // TODO: remove 'name' arg after deprecation is removed
    function createAdder(direction, name) {
        return function(val, period) {
            var dur, tmp;
            //invert the arguments, but complain about it
            if (period !== null && !isNaN(+period)) {
                deprecateSimple(name, 'moment().' + name + '(period, number) is deprecated. Please use moment().' + name + '(number, period). ' + 'See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.');
                tmp = val;
                val = period;
                period = tmp;
            }
            dur = createDuration(val, period);
            addSubtract(this, dur, direction);
            return this;
        };
    }
    function addSubtract(mom, duration, isAdding, updateOffset) {
        var milliseconds = duration._milliseconds, days = absRound(duration._days), months = absRound(duration._months);
        if (!mom.isValid()) // No op
        return;
        updateOffset = updateOffset == null ? true : updateOffset;
        if (months) setMonth(mom, get(mom, 'Month') + months * isAdding);
        if (days) set$1(mom, 'Date', get(mom, 'Date') + days * isAdding);
        if (milliseconds) mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
        if (updateOffset) hooks.updateOffset(mom, days || months);
    }
    var add = createAdder(1, 'add'), subtract = createAdder(-1, 'subtract');
    function isString(input) {
        return typeof input === 'string' || input instanceof String;
    }
    // type MomentInput = Moment | Date | string | number | (number | string)[] | MomentInputObject | void; // null | undefined
    function isMomentInput(input) {
        return isMoment(input) || isDate(input) || isString(input) || isNumber(input) || isNumberOrStringArray(input) || isMomentInputObject(input) || input === null || input === undefined;
    }
    function isMomentInputObject(input) {
        var objectTest = isObject(input) && !isObjectEmpty(input), propertyTest = false, properties = [
            'years',
            'year',
            'y',
            'months',
            'month',
            'M',
            'days',
            'day',
            'd',
            'dates',
            'date',
            'D',
            'hours',
            'hour',
            'h',
            'minutes',
            'minute',
            'm',
            'seconds',
            'second',
            's',
            'milliseconds',
            'millisecond',
            'ms', 
        ], i, property;
        for(i = 0; i < properties.length; i += 1){
            property = properties[i];
            propertyTest = propertyTest || hasOwnProp(input, property);
        }
        return objectTest && propertyTest;
    }
    function isNumberOrStringArray(input) {
        var arrayTest = isArray(input), dataTypeTest = false;
        if (arrayTest) dataTypeTest = input.filter(function(item) {
            return !isNumber(item) && isString(input);
        }).length === 0;
        return arrayTest && dataTypeTest;
    }
    function isCalendarSpec(input) {
        var objectTest = isObject(input) && !isObjectEmpty(input), propertyTest = false, properties = [
            'sameDay',
            'nextDay',
            'lastDay',
            'nextWeek',
            'lastWeek',
            'sameElse', 
        ], i, property;
        for(i = 0; i < properties.length; i += 1){
            property = properties[i];
            propertyTest = propertyTest || hasOwnProp(input, property);
        }
        return objectTest && propertyTest;
    }
    function getCalendarFormat(myMoment, now) {
        var diff = myMoment.diff(now, 'days', true);
        return diff < -6 ? 'sameElse' : diff < -1 ? 'lastWeek' : diff < 0 ? 'lastDay' : diff < 1 ? 'sameDay' : diff < 2 ? 'nextDay' : diff < 7 ? 'nextWeek' : 'sameElse';
    }
    function calendar$1(time, formats) {
        // Support for single parameter, formats only overload to the calendar function
        if (arguments.length === 1) {
            if (!arguments[0]) {
                time = undefined;
                formats = undefined;
            } else if (isMomentInput(arguments[0])) {
                time = arguments[0];
                formats = undefined;
            } else if (isCalendarSpec(arguments[0])) {
                formats = arguments[0];
                time = undefined;
            }
        }
        // We want to compare the start of today, vs this.
        // Getting start-of-today depends on whether we're local/utc/offset or not.
        var now = time || createLocal(), sod = cloneWithOffset(now, this).startOf('day'), format = hooks.calendarFormat(this, sod) || 'sameElse', output = formats && (isFunction(formats[format]) ? formats[format].call(this, now) : formats[format]);
        return this.format(output || this.localeData().calendar(format, this, createLocal(now)));
    }
    function clone() {
        return new Moment(this);
    }
    function isAfter(input, units) {
        var localInput = isMoment(input) ? input : createLocal(input);
        if (!(this.isValid() && localInput.isValid())) return false;
        units = normalizeUnits(units) || 'millisecond';
        if (units === 'millisecond') return this.valueOf() > localInput.valueOf();
        else return localInput.valueOf() < this.clone().startOf(units).valueOf();
    }
    function isBefore(input, units) {
        var localInput = isMoment(input) ? input : createLocal(input);
        if (!(this.isValid() && localInput.isValid())) return false;
        units = normalizeUnits(units) || 'millisecond';
        if (units === 'millisecond') return this.valueOf() < localInput.valueOf();
        else return this.clone().endOf(units).valueOf() < localInput.valueOf();
    }
    function isBetween(from, to, units, inclusivity) {
        var localFrom = isMoment(from) ? from : createLocal(from), localTo = isMoment(to) ? to : createLocal(to);
        if (!(this.isValid() && localFrom.isValid() && localTo.isValid())) return false;
        inclusivity = inclusivity || '()';
        return (inclusivity[0] === '(' ? this.isAfter(localFrom, units) : !this.isBefore(localFrom, units)) && (inclusivity[1] === ')' ? this.isBefore(localTo, units) : !this.isAfter(localTo, units));
    }
    function isSame(input, units) {
        var localInput = isMoment(input) ? input : createLocal(input), inputMs;
        if (!(this.isValid() && localInput.isValid())) return false;
        units = normalizeUnits(units) || 'millisecond';
        if (units === 'millisecond') return this.valueOf() === localInput.valueOf();
        else {
            inputMs = localInput.valueOf();
            return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
        }
    }
    function isSameOrAfter(input, units) {
        return this.isSame(input, units) || this.isAfter(input, units);
    }
    function isSameOrBefore(input, units) {
        return this.isSame(input, units) || this.isBefore(input, units);
    }
    function diff1(input, units, asFloat) {
        var that, zoneDelta, output;
        if (!this.isValid()) return NaN;
        that = cloneWithOffset(input, this);
        if (!that.isValid()) return NaN;
        zoneDelta = (that.utcOffset() - this.utcOffset()) * 60000;
        units = normalizeUnits(units);
        switch(units){
            case 'year':
                output = monthDiff(this, that) / 12;
                break;
            case 'month':
                output = monthDiff(this, that);
                break;
            case 'quarter':
                output = monthDiff(this, that) / 3;
                break;
            case 'second':
                output = (this - that) / 1000;
                break; // 1000
            case 'minute':
                output = (this - that) / 60000;
                break; // 1000 * 60
            case 'hour':
                output = (this - that) / 3600000;
                break; // 1000 * 60 * 60
            case 'day':
                output = (this - that - zoneDelta) / 86400000;
                break; // 1000 * 60 * 60 * 24, negate dst
            case 'week':
                output = (this - that - zoneDelta) / 604800000;
                break; // 1000 * 60 * 60 * 24 * 7, negate dst
            default:
                output = this - that;
        }
        return asFloat ? output : absFloor(output);
    }
    function monthDiff(a, b) {
        if (a.date() < b.date()) // end-of-month calculations work correct when the start month has more
        // days than the end month.
        return -monthDiff(b, a);
        // difference in months
        var wholeMonthDiff = (b.year() - a.year()) * 12 + (b.month() - a.month()), // b is in (anchor - 1 month, anchor + 1 month)
        anchor = a.clone().add(wholeMonthDiff, 'months'), anchor2, adjust;
        if (b - anchor < 0) {
            anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor - anchor2);
        } else {
            anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor2 - anchor);
        }
        //check for negative zero, return zero if negative zero
        return -(wholeMonthDiff + adjust) || 0;
    }
    hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
    hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';
    function toString() {
        return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
    }
    function toISOString(keepOffset) {
        if (!this.isValid()) return null;
        var utc = keepOffset !== true, m = utc ? this.clone().utc() : this;
        if (m.year() < 0 || m.year() > 9999) return formatMoment(m, utc ? 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYYYY-MM-DD[T]HH:mm:ss.SSSZ');
        if (isFunction(Date.prototype.toISOString)) {
            // native implementation is ~50x faster, use it when we can
            if (utc) return this.toDate().toISOString();
            else return new Date(this.valueOf() + this.utcOffset() * 60000).toISOString().replace('Z', formatMoment(m, 'Z'));
        }
        return formatMoment(m, utc ? 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYY-MM-DD[T]HH:mm:ss.SSSZ');
    }
    /**
     * Return a human readable representation of a moment that can
     * also be evaluated to get a new moment which is the same
     *
     * @link https://nodejs.org/dist/latest/docs/api/util.html#util_custom_inspect_function_on_objects
     */ function inspect() {
        if (!this.isValid()) return 'moment.invalid(/* ' + this._i + ' */)';
        var func = 'moment', zone = '', prefix, year, datetime, suffix;
        if (!this.isLocal()) {
            func = this.utcOffset() === 0 ? 'moment.utc' : 'moment.parseZone';
            zone = 'Z';
        }
        prefix = '[' + func + '("]';
        year = 0 <= this.year() && this.year() <= 9999 ? 'YYYY' : 'YYYYYY';
        datetime = '-MM-DD[T]HH:mm:ss.SSS';
        suffix = zone + '[")]';
        return this.format(prefix + year + datetime + suffix);
    }
    function format1(inputString) {
        if (!inputString) inputString = this.isUtc() ? hooks.defaultFormatUtc : hooks.defaultFormat;
        var output = formatMoment(this, inputString);
        return this.localeData().postformat(output);
    }
    function from1(time, withoutSuffix) {
        if (this.isValid() && (isMoment(time) && time.isValid() || createLocal(time).isValid())) return createDuration({
            to: this,
            from: time
        }).locale(this.locale()).humanize(!withoutSuffix);
        else return this.localeData().invalidDate();
    }
    function fromNow(withoutSuffix) {
        return this.from(createLocal(), withoutSuffix);
    }
    function to1(time, withoutSuffix) {
        if (this.isValid() && (isMoment(time) && time.isValid() || createLocal(time).isValid())) return createDuration({
            from: this,
            to: time
        }).locale(this.locale()).humanize(!withoutSuffix);
        else return this.localeData().invalidDate();
    }
    function toNow(withoutSuffix) {
        return this.to(createLocal(), withoutSuffix);
    }
    // If passed a locale key, it will set the locale for this
    // instance.  Otherwise, it will return the locale configuration
    // variables for this instance.
    function locale1(key) {
        var newLocaleData;
        if (key === undefined) return this._locale._abbr;
        else {
            newLocaleData = getLocale(key);
            if (newLocaleData != null) this._locale = newLocaleData;
            return this;
        }
    }
    var lang = deprecate('moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.', function(key) {
        if (key === undefined) return this.localeData();
        else return this.locale(key);
    });
    function localeData() {
        return this._locale;
    }
    var MS_PER_SECOND = 1000, MS_PER_MINUTE = 60 * MS_PER_SECOND, MS_PER_HOUR = 60 * MS_PER_MINUTE, MS_PER_400_YEARS = 3506328 * MS_PER_HOUR;
    // actual modulo - handles negative numbers (for dates before 1970):
    function mod$1(dividend, divisor) {
        return (dividend % divisor + divisor) % divisor;
    }
    function localStartOfDate(y, m, d) {
        // the date constructor remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) // preserve leap years using a full 400 year cycle, then reset
        return new Date(y + 400, m, d) - MS_PER_400_YEARS;
        else return new Date(y, m, d).valueOf();
    }
    function utcStartOfDate(y, m, d) {
        // Date.UTC remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) // preserve leap years using a full 400 year cycle, then reset
        return Date.UTC(y + 400, m, d) - MS_PER_400_YEARS;
        else return Date.UTC(y, m, d);
    }
    function startOf(units) {
        var time, startOfDate;
        units = normalizeUnits(units);
        if (units === undefined || units === 'millisecond' || !this.isValid()) return this;
        startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;
        switch(units){
            case 'year':
                time = startOfDate(this.year(), 0, 1);
                break;
            case 'quarter':
                time = startOfDate(this.year(), this.month() - this.month() % 3, 1);
                break;
            case 'month':
                time = startOfDate(this.year(), this.month(), 1);
                break;
            case 'week':
                time = startOfDate(this.year(), this.month(), this.date() - this.weekday());
                break;
            case 'isoWeek':
                time = startOfDate(this.year(), this.month(), this.date() - (this.isoWeekday() - 1));
                break;
            case 'day':
            case 'date':
                time = startOfDate(this.year(), this.month(), this.date());
                break;
            case 'hour':
                time = this._d.valueOf();
                time -= mod$1(time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE), MS_PER_HOUR);
                break;
            case 'minute':
                time = this._d.valueOf();
                time -= mod$1(time, MS_PER_MINUTE);
                break;
            case 'second':
                time = this._d.valueOf();
                time -= mod$1(time, MS_PER_SECOND);
                break;
        }
        this._d.setTime(time);
        hooks.updateOffset(this, true);
        return this;
    }
    function endOf(units) {
        var time, startOfDate;
        units = normalizeUnits(units);
        if (units === undefined || units === 'millisecond' || !this.isValid()) return this;
        startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;
        switch(units){
            case 'year':
                time = startOfDate(this.year() + 1, 0, 1) - 1;
                break;
            case 'quarter':
                time = startOfDate(this.year(), this.month() - this.month() % 3 + 3, 1) - 1;
                break;
            case 'month':
                time = startOfDate(this.year(), this.month() + 1, 1) - 1;
                break;
            case 'week':
                time = startOfDate(this.year(), this.month(), this.date() - this.weekday() + 7) - 1;
                break;
            case 'isoWeek':
                time = startOfDate(this.year(), this.month(), this.date() - (this.isoWeekday() - 1) + 7) - 1;
                break;
            case 'day':
            case 'date':
                time = startOfDate(this.year(), this.month(), this.date() + 1) - 1;
                break;
            case 'hour':
                time = this._d.valueOf();
                time += MS_PER_HOUR - mod$1(time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE), MS_PER_HOUR) - 1;
                break;
            case 'minute':
                time = this._d.valueOf();
                time += MS_PER_MINUTE - mod$1(time, MS_PER_MINUTE) - 1;
                break;
            case 'second':
                time = this._d.valueOf();
                time += MS_PER_SECOND - mod$1(time, MS_PER_SECOND) - 1;
                break;
        }
        this._d.setTime(time);
        hooks.updateOffset(this, true);
        return this;
    }
    function valueOf() {
        return this._d.valueOf() - (this._offset || 0) * 60000;
    }
    function unix() {
        return Math.floor(this.valueOf() / 1000);
    }
    function toDate() {
        return new Date(this.valueOf());
    }
    function toArray() {
        var m = this;
        return [
            m.year(),
            m.month(),
            m.date(),
            m.hour(),
            m.minute(),
            m.second(),
            m.millisecond(), 
        ];
    }
    function toObject() {
        var m = this;
        return {
            years: m.year(),
            months: m.month(),
            date: m.date(),
            hours: m.hours(),
            minutes: m.minutes(),
            seconds: m.seconds(),
            milliseconds: m.milliseconds()
        };
    }
    function toJSON() {
        // new Date(NaN).toJSON() === null
        return this.isValid() ? this.toISOString() : null;
    }
    function isValid$2() {
        return isValid(this);
    }
    function parsingFlags() {
        return extend({
        }, getParsingFlags(this));
    }
    function invalidAt() {
        return getParsingFlags(this).overflow;
    }
    function creationData() {
        return {
            input: this._i,
            format: this._f,
            locale: this._locale,
            isUTC: this._isUTC,
            strict: this._strict
        };
    }
    addFormatToken('N', 0, 0, 'eraAbbr');
    addFormatToken('NN', 0, 0, 'eraAbbr');
    addFormatToken('NNN', 0, 0, 'eraAbbr');
    addFormatToken('NNNN', 0, 0, 'eraName');
    addFormatToken('NNNNN', 0, 0, 'eraNarrow');
    addFormatToken('y', [
        'y',
        1
    ], 'yo', 'eraYear');
    addFormatToken('y', [
        'yy',
        2
    ], 0, 'eraYear');
    addFormatToken('y', [
        'yyy',
        3
    ], 0, 'eraYear');
    addFormatToken('y', [
        'yyyy',
        4
    ], 0, 'eraYear');
    addRegexToken('N', matchEraAbbr);
    addRegexToken('NN', matchEraAbbr);
    addRegexToken('NNN', matchEraAbbr);
    addRegexToken('NNNN', matchEraName);
    addRegexToken('NNNNN', matchEraNarrow);
    addParseToken([
        'N',
        'NN',
        'NNN',
        'NNNN',
        'NNNNN'
    ], function(input, array, config, token) {
        var era = config._locale.erasParse(input, token, config._strict);
        if (era) getParsingFlags(config).era = era;
        else getParsingFlags(config).invalidEra = input;
    });
    addRegexToken('y', matchUnsigned);
    addRegexToken('yy', matchUnsigned);
    addRegexToken('yyy', matchUnsigned);
    addRegexToken('yyyy', matchUnsigned);
    addRegexToken('yo', matchEraYearOrdinal);
    addParseToken([
        'y',
        'yy',
        'yyy',
        'yyyy'
    ], YEAR);
    addParseToken([
        'yo'
    ], function(input, array, config, token) {
        var match;
        if (config._locale._eraYearOrdinalRegex) match = input.match(config._locale._eraYearOrdinalRegex);
        if (config._locale.eraYearOrdinalParse) array[YEAR] = config._locale.eraYearOrdinalParse(input, match);
        else array[YEAR] = parseInt(input, 10);
    });
    function localeEras(m, format) {
        var i, l, date, eras = this._eras || getLocale('en')._eras;
        for(i = 0, l = eras.length; i < l; ++i){
            switch(typeof eras[i].since){
                case 'string':
                    // truncate time
                    date = hooks(eras[i].since).startOf('day');
                    eras[i].since = date.valueOf();
                    break;
            }
            switch(typeof eras[i].until){
                case 'undefined':
                    eras[i].until = Infinity;
                    break;
                case 'string':
                    // truncate time
                    date = hooks(eras[i].until).startOf('day').valueOf();
                    eras[i].until = date.valueOf();
                    break;
            }
        }
        return eras;
    }
    function localeErasParse(eraName, format, strict) {
        var i, l, eras = this.eras(), name, abbr, narrow;
        eraName = eraName.toUpperCase();
        for(i = 0, l = eras.length; i < l; ++i){
            name = eras[i].name.toUpperCase();
            abbr = eras[i].abbr.toUpperCase();
            narrow = eras[i].narrow.toUpperCase();
            if (strict) switch(format){
                case 'N':
                case 'NN':
                case 'NNN':
                    if (abbr === eraName) return eras[i];
                    break;
                case 'NNNN':
                    if (name === eraName) return eras[i];
                    break;
                case 'NNNNN':
                    if (narrow === eraName) return eras[i];
                    break;
            }
            else if ([
                name,
                abbr,
                narrow
            ].indexOf(eraName) >= 0) return eras[i];
        }
    }
    function localeErasConvertYear(era, year) {
        var dir = era.since <= era.until ? 1 : -1;
        if (year === undefined) return hooks(era.since).year();
        else return hooks(era.since).year() + (year - era.offset) * dir;
    }
    function getEraName() {
        var i, l, val, eras = this.localeData().eras();
        for(i = 0, l = eras.length; i < l; ++i){
            // truncate time
            val = this.clone().startOf('day').valueOf();
            if (eras[i].since <= val && val <= eras[i].until) return eras[i].name;
            if (eras[i].until <= val && val <= eras[i].since) return eras[i].name;
        }
        return '';
    }
    function getEraNarrow() {
        var i, l, val, eras = this.localeData().eras();
        for(i = 0, l = eras.length; i < l; ++i){
            // truncate time
            val = this.clone().startOf('day').valueOf();
            if (eras[i].since <= val && val <= eras[i].until) return eras[i].narrow;
            if (eras[i].until <= val && val <= eras[i].since) return eras[i].narrow;
        }
        return '';
    }
    function getEraAbbr() {
        var i, l, val, eras = this.localeData().eras();
        for(i = 0, l = eras.length; i < l; ++i){
            // truncate time
            val = this.clone().startOf('day').valueOf();
            if (eras[i].since <= val && val <= eras[i].until) return eras[i].abbr;
            if (eras[i].until <= val && val <= eras[i].since) return eras[i].abbr;
        }
        return '';
    }
    function getEraYear() {
        var i, l, dir, val, eras = this.localeData().eras();
        for(i = 0, l = eras.length; i < l; ++i){
            dir = eras[i].since <= eras[i].until ? 1 : -1;
            // truncate time
            val = this.clone().startOf('day').valueOf();
            if (eras[i].since <= val && val <= eras[i].until || eras[i].until <= val && val <= eras[i].since) return (this.year() - hooks(eras[i].since).year()) * dir + eras[i].offset;
        }
        return this.year();
    }
    function erasNameRegex(isStrict) {
        if (!hasOwnProp(this, '_erasNameRegex')) computeErasParse.call(this);
        return isStrict ? this._erasNameRegex : this._erasRegex;
    }
    function erasAbbrRegex(isStrict) {
        if (!hasOwnProp(this, '_erasAbbrRegex')) computeErasParse.call(this);
        return isStrict ? this._erasAbbrRegex : this._erasRegex;
    }
    function erasNarrowRegex(isStrict) {
        if (!hasOwnProp(this, '_erasNarrowRegex')) computeErasParse.call(this);
        return isStrict ? this._erasNarrowRegex : this._erasRegex;
    }
    function matchEraAbbr(isStrict, locale) {
        return locale.erasAbbrRegex(isStrict);
    }
    function matchEraName(isStrict, locale) {
        return locale.erasNameRegex(isStrict);
    }
    function matchEraNarrow(isStrict, locale) {
        return locale.erasNarrowRegex(isStrict);
    }
    function matchEraYearOrdinal(isStrict, locale) {
        return locale._eraYearOrdinalRegex || matchUnsigned;
    }
    function computeErasParse() {
        var abbrPieces = [], namePieces = [], narrowPieces = [], mixedPieces = [], i, l, eras = this.eras();
        for(i = 0, l = eras.length; i < l; ++i){
            namePieces.push(regexEscape(eras[i].name));
            abbrPieces.push(regexEscape(eras[i].abbr));
            narrowPieces.push(regexEscape(eras[i].narrow));
            mixedPieces.push(regexEscape(eras[i].name));
            mixedPieces.push(regexEscape(eras[i].abbr));
            mixedPieces.push(regexEscape(eras[i].narrow));
        }
        this._erasRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._erasNameRegex = new RegExp('^(' + namePieces.join('|') + ')', 'i');
        this._erasAbbrRegex = new RegExp('^(' + abbrPieces.join('|') + ')', 'i');
        this._erasNarrowRegex = new RegExp('^(' + narrowPieces.join('|') + ')', 'i');
    }
    // FORMATTING
    addFormatToken(0, [
        'gg',
        2
    ], 0, function() {
        return this.weekYear() % 100;
    });
    addFormatToken(0, [
        'GG',
        2
    ], 0, function() {
        return this.isoWeekYear() % 100;
    });
    function addWeekYearFormatToken(token, getter) {
        addFormatToken(0, [
            token,
            token.length
        ], 0, getter);
    }
    addWeekYearFormatToken('gggg', 'weekYear');
    addWeekYearFormatToken('ggggg', 'weekYear');
    addWeekYearFormatToken('GGGG', 'isoWeekYear');
    addWeekYearFormatToken('GGGGG', 'isoWeekYear');
    // ALIASES
    addUnitAlias('weekYear', 'gg');
    addUnitAlias('isoWeekYear', 'GG');
    // PRIORITY
    addUnitPriority('weekYear', 1);
    addUnitPriority('isoWeekYear', 1);
    // PARSING
    addRegexToken('G', matchSigned);
    addRegexToken('g', matchSigned);
    addRegexToken('GG', match1to2, match2);
    addRegexToken('gg', match1to2, match2);
    addRegexToken('GGGG', match1to4, match4);
    addRegexToken('gggg', match1to4, match4);
    addRegexToken('GGGGG', match1to6, match6);
    addRegexToken('ggggg', match1to6, match6);
    addWeekParseToken([
        'gggg',
        'ggggg',
        'GGGG',
        'GGGGG'
    ], function(input, week, config, token) {
        week[token.substr(0, 2)] = toInt(input);
    });
    addWeekParseToken([
        'gg',
        'GG'
    ], function(input, week, config, token) {
        week[token] = hooks.parseTwoDigitYear(input);
    });
    // MOMENTS
    function getSetWeekYear(input) {
        return getSetWeekYearHelper.call(this, input, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy);
    }
    function getSetISOWeekYear(input) {
        return getSetWeekYearHelper.call(this, input, this.isoWeek(), this.isoWeekday(), 1, 4);
    }
    function getISOWeeksInYear() {
        return weeksInYear(this.year(), 1, 4);
    }
    function getISOWeeksInISOWeekYear() {
        return weeksInYear(this.isoWeekYear(), 1, 4);
    }
    function getWeeksInYear() {
        var weekInfo = this.localeData()._week;
        return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
    }
    function getWeeksInWeekYear() {
        var weekInfo = this.localeData()._week;
        return weeksInYear(this.weekYear(), weekInfo.dow, weekInfo.doy);
    }
    function getSetWeekYearHelper(input, week, weekday, dow, doy) {
        var weeksTarget;
        if (input == null) return weekOfYear(this, dow, doy).year;
        else {
            weeksTarget = weeksInYear(input, dow, doy);
            if (week > weeksTarget) week = weeksTarget;
            return setWeekAll.call(this, input, week, weekday, dow, doy);
        }
    }
    function setWeekAll(weekYear, week, weekday, dow, doy) {
        var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy), date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);
        this.year(date.getUTCFullYear());
        this.month(date.getUTCMonth());
        this.date(date.getUTCDate());
        return this;
    }
    // FORMATTING
    addFormatToken('Q', 0, 'Qo', 'quarter');
    // ALIASES
    addUnitAlias('quarter', 'Q');
    // PRIORITY
    addUnitPriority('quarter', 7);
    // PARSING
    addRegexToken('Q', match1);
    addParseToken('Q', function(input, array) {
        array[MONTH] = (toInt(input) - 1) * 3;
    });
    // MOMENTS
    function getSetQuarter(input) {
        return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
    }
    // FORMATTING
    addFormatToken('D', [
        'DD',
        2
    ], 'Do', 'date');
    // ALIASES
    addUnitAlias('date', 'D');
    // PRIORITY
    addUnitPriority('date', 9);
    // PARSING
    addRegexToken('D', match1to2);
    addRegexToken('DD', match1to2, match2);
    addRegexToken('Do', function(isStrict, locale) {
        // TODO: Remove "ordinalParse" fallback in next major release.
        return isStrict ? locale._dayOfMonthOrdinalParse || locale._ordinalParse : locale._dayOfMonthOrdinalParseLenient;
    });
    addParseToken([
        'D',
        'DD'
    ], DATE);
    addParseToken('Do', function(input, array) {
        array[DATE] = toInt(input.match(match1to2)[0]);
    });
    // MOMENTS
    var getSetDayOfMonth = makeGetSet('Date', true);
    // FORMATTING
    addFormatToken('DDD', [
        'DDDD',
        3
    ], 'DDDo', 'dayOfYear');
    // ALIASES
    addUnitAlias('dayOfYear', 'DDD');
    // PRIORITY
    addUnitPriority('dayOfYear', 4);
    // PARSING
    addRegexToken('DDD', match1to3);
    addRegexToken('DDDD', match3);
    addParseToken([
        'DDD',
        'DDDD'
    ], function(input, array, config) {
        config._dayOfYear = toInt(input);
    });
    // HELPERS
    // MOMENTS
    function getSetDayOfYear(input) {
        var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 86400000) + 1;
        return input == null ? dayOfYear : this.add(input - dayOfYear, 'd');
    }
    // FORMATTING
    addFormatToken('m', [
        'mm',
        2
    ], 0, 'minute');
    // ALIASES
    addUnitAlias('minute', 'm');
    // PRIORITY
    addUnitPriority('minute', 14);
    // PARSING
    addRegexToken('m', match1to2);
    addRegexToken('mm', match1to2, match2);
    addParseToken([
        'm',
        'mm'
    ], MINUTE);
    // MOMENTS
    var getSetMinute = makeGetSet('Minutes', false);
    // FORMATTING
    addFormatToken('s', [
        'ss',
        2
    ], 0, 'second');
    // ALIASES
    addUnitAlias('second', 's');
    // PRIORITY
    addUnitPriority('second', 15);
    // PARSING
    addRegexToken('s', match1to2);
    addRegexToken('ss', match1to2, match2);
    addParseToken([
        's',
        'ss'
    ], SECOND);
    // MOMENTS
    var getSetSecond = makeGetSet('Seconds', false);
    // FORMATTING
    addFormatToken('S', 0, 0, function() {
        return ~~(this.millisecond() / 100);
    });
    addFormatToken(0, [
        'SS',
        2
    ], 0, function() {
        return ~~(this.millisecond() / 10);
    });
    addFormatToken(0, [
        'SSS',
        3
    ], 0, 'millisecond');
    addFormatToken(0, [
        'SSSS',
        4
    ], 0, function() {
        return this.millisecond() * 10;
    });
    addFormatToken(0, [
        'SSSSS',
        5
    ], 0, function() {
        return this.millisecond() * 100;
    });
    addFormatToken(0, [
        'SSSSSS',
        6
    ], 0, function() {
        return this.millisecond() * 1000;
    });
    addFormatToken(0, [
        'SSSSSSS',
        7
    ], 0, function() {
        return this.millisecond() * 10000;
    });
    addFormatToken(0, [
        'SSSSSSSS',
        8
    ], 0, function() {
        return this.millisecond() * 100000;
    });
    addFormatToken(0, [
        'SSSSSSSSS',
        9
    ], 0, function() {
        return this.millisecond() * 1000000;
    });
    // ALIASES
    addUnitAlias('millisecond', 'ms');
    // PRIORITY
    addUnitPriority('millisecond', 16);
    // PARSING
    addRegexToken('S', match1to3, match1);
    addRegexToken('SS', match1to3, match2);
    addRegexToken('SSS', match1to3, match3);
    var token1, getSetMillisecond;
    for(token1 = 'SSSS'; token1.length <= 9; token1 += 'S')addRegexToken(token1, matchUnsigned);
    function parseMs(input, array) {
        array[MILLISECOND] = toInt(('0.' + input) * 1000);
    }
    for(token1 = 'S'; token1.length <= 9; token1 += 'S')addParseToken(token1, parseMs);
    getSetMillisecond = makeGetSet('Milliseconds', false);
    // FORMATTING
    addFormatToken('z', 0, 0, 'zoneAbbr');
    addFormatToken('zz', 0, 0, 'zoneName');
    // MOMENTS
    function getZoneAbbr() {
        return this._isUTC ? 'UTC' : '';
    }
    function getZoneName() {
        return this._isUTC ? 'Coordinated Universal Time' : '';
    }
    var proto = Moment.prototype;
    proto.add = add;
    proto.calendar = calendar$1;
    proto.clone = clone;
    proto.diff = diff1;
    proto.endOf = endOf;
    proto.format = format1;
    proto.from = from1;
    proto.fromNow = fromNow;
    proto.to = to1;
    proto.toNow = toNow;
    proto.get = stringGet;
    proto.invalidAt = invalidAt;
    proto.isAfter = isAfter;
    proto.isBefore = isBefore;
    proto.isBetween = isBetween;
    proto.isSame = isSame;
    proto.isSameOrAfter = isSameOrAfter;
    proto.isSameOrBefore = isSameOrBefore;
    proto.isValid = isValid$2;
    proto.lang = lang;
    proto.locale = locale1;
    proto.localeData = localeData;
    proto.max = prototypeMax;
    proto.min = prototypeMin;
    proto.parsingFlags = parsingFlags;
    proto.set = stringSet;
    proto.startOf = startOf;
    proto.subtract = subtract;
    proto.toArray = toArray;
    proto.toObject = toObject;
    proto.toDate = toDate;
    proto.toISOString = toISOString;
    proto.inspect = inspect;
    if (typeof Symbol !== 'undefined' && Symbol.for != null) proto[Symbol.for('nodejs.util.inspect.custom')] = function() {
        return 'Moment<' + this.format() + '>';
    };
    proto.toJSON = toJSON;
    proto.toString = toString;
    proto.unix = unix;
    proto.valueOf = valueOf;
    proto.creationData = creationData;
    proto.eraName = getEraName;
    proto.eraNarrow = getEraNarrow;
    proto.eraAbbr = getEraAbbr;
    proto.eraYear = getEraYear;
    proto.year = getSetYear;
    proto.isLeapYear = getIsLeapYear;
    proto.weekYear = getSetWeekYear;
    proto.isoWeekYear = getSetISOWeekYear;
    proto.quarter = proto.quarters = getSetQuarter;
    proto.month = getSetMonth;
    proto.daysInMonth = getDaysInMonth;
    proto.week = proto.weeks = getSetWeek;
    proto.isoWeek = proto.isoWeeks = getSetISOWeek;
    proto.weeksInYear = getWeeksInYear;
    proto.weeksInWeekYear = getWeeksInWeekYear;
    proto.isoWeeksInYear = getISOWeeksInYear;
    proto.isoWeeksInISOWeekYear = getISOWeeksInISOWeekYear;
    proto.date = getSetDayOfMonth;
    proto.day = proto.days = getSetDayOfWeek;
    proto.weekday = getSetLocaleDayOfWeek;
    proto.isoWeekday = getSetISODayOfWeek;
    proto.dayOfYear = getSetDayOfYear;
    proto.hour = proto.hours = getSetHour;
    proto.minute = proto.minutes = getSetMinute;
    proto.second = proto.seconds = getSetSecond;
    proto.millisecond = proto.milliseconds = getSetMillisecond;
    proto.utcOffset = getSetOffset;
    proto.utc = setOffsetToUTC;
    proto.local = setOffsetToLocal;
    proto.parseZone = setOffsetToParsedOffset;
    proto.hasAlignedHourOffset = hasAlignedHourOffset;
    proto.isDST = isDaylightSavingTime;
    proto.isLocal = isLocal;
    proto.isUtcOffset = isUtcOffset;
    proto.isUtc = isUtc;
    proto.isUTC = isUtc;
    proto.zoneAbbr = getZoneAbbr;
    proto.zoneName = getZoneName;
    proto.dates = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
    proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
    proto.years = deprecate('years accessor is deprecated. Use year instead', getSetYear);
    proto.zone = deprecate('moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/', getSetZone);
    proto.isDSTShifted = deprecate('isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information', isDaylightSavingTimeShifted);
    function createUnix(input) {
        return createLocal(input * 1000);
    }
    function createInZone() {
        return createLocal.apply(null, arguments).parseZone();
    }
    function preParsePostFormat(string) {
        return string;
    }
    var proto$1 = Locale.prototype;
    proto$1.calendar = calendar;
    proto$1.longDateFormat = longDateFormat;
    proto$1.invalidDate = invalidDate;
    proto$1.ordinal = ordinal1;
    proto$1.preparse = preParsePostFormat;
    proto$1.postformat = preParsePostFormat;
    proto$1.relativeTime = relativeTime;
    proto$1.pastFuture = pastFuture;
    proto$1.set = set;
    proto$1.eras = localeEras;
    proto$1.erasParse = localeErasParse;
    proto$1.erasConvertYear = localeErasConvertYear;
    proto$1.erasAbbrRegex = erasAbbrRegex;
    proto$1.erasNameRegex = erasNameRegex;
    proto$1.erasNarrowRegex = erasNarrowRegex;
    proto$1.months = localeMonths;
    proto$1.monthsShort = localeMonthsShort;
    proto$1.monthsParse = localeMonthsParse;
    proto$1.monthsRegex = monthsRegex;
    proto$1.monthsShortRegex = monthsShortRegex;
    proto$1.week = localeWeek;
    proto$1.firstDayOfYear = localeFirstDayOfYear;
    proto$1.firstDayOfWeek = localeFirstDayOfWeek;
    proto$1.weekdays = localeWeekdays;
    proto$1.weekdaysMin = localeWeekdaysMin;
    proto$1.weekdaysShort = localeWeekdaysShort;
    proto$1.weekdaysParse = localeWeekdaysParse;
    proto$1.weekdaysRegex = weekdaysRegex;
    proto$1.weekdaysShortRegex = weekdaysShortRegex;
    proto$1.weekdaysMinRegex = weekdaysMinRegex;
    proto$1.isPM = localeIsPM;
    proto$1.meridiem = localeMeridiem;
    function get$1(format, index, field, setter) {
        var locale = getLocale(), utc = createUTC().set(setter, index);
        return locale[field](utc, format);
    }
    function listMonthsImpl(format, index, field) {
        if (isNumber(format)) {
            index = format;
            format = undefined;
        }
        format = format || '';
        if (index != null) return get$1(format, index, field, 'month');
        var i, out = [];
        for(i = 0; i < 12; i++)out[i] = get$1(format, i, field, 'month');
        return out;
    }
    // ()
    // (5)
    // (fmt, 5)
    // (fmt)
    // (true)
    // (true, 5)
    // (true, fmt, 5)
    // (true, fmt)
    function listWeekdaysImpl(localeSorted, format, index, field) {
        if (typeof localeSorted === 'boolean') {
            if (isNumber(format)) {
                index = format;
                format = undefined;
            }
            format = format || '';
        } else {
            format = localeSorted;
            index = format;
            localeSorted = false;
            if (isNumber(format)) {
                index = format;
                format = undefined;
            }
            format = format || '';
        }
        var locale = getLocale(), shift = localeSorted ? locale._week.dow : 0, i, out = [];
        if (index != null) return get$1(format, (index + shift) % 7, field, 'day');
        for(i = 0; i < 7; i++)out[i] = get$1(format, (i + shift) % 7, field, 'day');
        return out;
    }
    function listMonths(format, index) {
        return listMonthsImpl(format, index, 'months');
    }
    function listMonthsShort(format, index) {
        return listMonthsImpl(format, index, 'monthsShort');
    }
    function listWeekdays(localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
    }
    function listWeekdaysShort(localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
    }
    function listWeekdaysMin(localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
    }
    getSetGlobalLocale('en', {
        eras: [
            {
                since: '0001-01-01',
                until: Infinity,
                offset: 1,
                name: 'Anno Domini',
                narrow: 'AD',
                abbr: 'AD'
            },
            {
                since: '0000-12-31',
                until: -Infinity,
                offset: 1,
                name: 'Before Christ',
                narrow: 'BC',
                abbr: 'BC'
            }, 
        ],
        dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal: function(number) {
            var b = number % 10, output = toInt(number % 100 / 10) === 1 ? 'th' : b === 1 ? 'st' : b === 2 ? 'nd' : b === 3 ? 'rd' : 'th';
            return number + output;
        }
    });
    // Side effect imports
    hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', getSetGlobalLocale);
    hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', getLocale);
    var mathAbs = Math.abs;
    function abs() {
        var data = this._data;
        this._milliseconds = mathAbs(this._milliseconds);
        this._days = mathAbs(this._days);
        this._months = mathAbs(this._months);
        data.milliseconds = mathAbs(data.milliseconds);
        data.seconds = mathAbs(data.seconds);
        data.minutes = mathAbs(data.minutes);
        data.hours = mathAbs(data.hours);
        data.months = mathAbs(data.months);
        data.years = mathAbs(data.years);
        return this;
    }
    function addSubtract$1(duration, input, value, direction) {
        var other = createDuration(input, value);
        duration._milliseconds += direction * other._milliseconds;
        duration._days += direction * other._days;
        duration._months += direction * other._months;
        return duration._bubble();
    }
    // supports only 2.0-style add(1, 's') or add(duration)
    function add$1(input, value) {
        return addSubtract$1(this, input, value, 1);
    }
    // supports only 2.0-style subtract(1, 's') or subtract(duration)
    function subtract$1(input, value) {
        return addSubtract$1(this, input, value, -1);
    }
    function absCeil(number) {
        if (number < 0) return Math.floor(number);
        else return Math.ceil(number);
    }
    function bubble() {
        var milliseconds = this._milliseconds, days = this._days, months = this._months, data = this._data, seconds, minutes, hours, years, monthsFromDays;
        // if we have a mix of positive and negative values, bubble down first
        // check: https://github.com/moment/moment/issues/2166
        if (!(milliseconds >= 0 && days >= 0 && months >= 0 || milliseconds <= 0 && days <= 0 && months <= 0)) {
            milliseconds += absCeil(monthsToDays(months) + days) * 86400000;
            days = 0;
            months = 0;
        }
        // The following code bubbles up values, see the tests for
        // examples of what that means.
        data.milliseconds = milliseconds % 1000;
        seconds = absFloor(milliseconds / 1000);
        data.seconds = seconds % 60;
        minutes = absFloor(seconds / 60);
        data.minutes = minutes % 60;
        hours = absFloor(minutes / 60);
        data.hours = hours % 24;
        days += absFloor(hours / 24);
        // convert days to months
        monthsFromDays = absFloor(daysToMonths(days));
        months += monthsFromDays;
        days -= absCeil(monthsToDays(monthsFromDays));
        // 12 months -> 1 year
        years = absFloor(months / 12);
        months %= 12;
        data.days = days;
        data.months = months;
        data.years = years;
        return this;
    }
    function daysToMonths(days) {
        // 400 years have 146097 days (taking into account leap year rules)
        // 400 years have 12 months === 4800
        return days * 4800 / 146097;
    }
    function monthsToDays(months) {
        // the reverse of daysToMonths
        return months * 146097 / 4800;
    }
    function as(units) {
        if (!this.isValid()) return NaN;
        var days, months, milliseconds = this._milliseconds;
        units = normalizeUnits(units);
        if (units === 'month' || units === 'quarter' || units === 'year') {
            days = this._days + milliseconds / 86400000;
            months = this._months + daysToMonths(days);
            switch(units){
                case 'month':
                    return months;
                case 'quarter':
                    return months / 3;
                case 'year':
                    return months / 12;
            }
        } else {
            // handle milliseconds separately because of floating point math errors (issue #1867)
            days = this._days + Math.round(monthsToDays(this._months));
            switch(units){
                case 'week':
                    return days / 7 + milliseconds / 604800000;
                case 'day':
                    return days + milliseconds / 86400000;
                case 'hour':
                    return days * 24 + milliseconds / 3600000;
                case 'minute':
                    return days * 1440 + milliseconds / 60000;
                case 'second':
                    return days * 86400 + milliseconds / 1000;
                // Math.floor prevents floating point math errors here
                case 'millisecond':
                    return Math.floor(days * 86400000) + milliseconds;
                default:
                    throw new Error('Unknown unit ' + units);
            }
        }
    }
    // TODO: Use this.as('ms')?
    function valueOf$1() {
        if (!this.isValid()) return NaN;
        return this._milliseconds + this._days * 86400000 + this._months % 12 * 2592000000 + toInt(this._months / 12) * 31536000000;
    }
    function makeAs(alias) {
        return function() {
            return this.as(alias);
        };
    }
    var asMilliseconds = makeAs('ms'), asSeconds = makeAs('s'), asMinutes = makeAs('m'), asHours = makeAs('h'), asDays = makeAs('d'), asWeeks = makeAs('w'), asMonths = makeAs('M'), asQuarters = makeAs('Q'), asYears = makeAs('y');
    function clone$1() {
        return createDuration(this);
    }
    function get$2(units) {
        units = normalizeUnits(units);
        return this.isValid() ? this[units + 's']() : NaN;
    }
    function makeGetter(name) {
        return function() {
            return this.isValid() ? this._data[name] : NaN;
        };
    }
    var milliseconds1 = makeGetter('milliseconds'), seconds1 = makeGetter('seconds'), minutes1 = makeGetter('minutes'), hours1 = makeGetter('hours'), days1 = makeGetter('days'), months1 = makeGetter('months'), years1 = makeGetter('years');
    function weeks1() {
        return absFloor(this.days() / 7);
    }
    var round = Math.round, thresholds1 = {
        ss: 44,
        s: 45,
        m: 45,
        h: 22,
        d: 26,
        w: null,
        M: 11
    };
    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
    }
    function relativeTime$1(posNegDuration, withoutSuffix, thresholds, locale) {
        var duration = createDuration(posNegDuration).abs(), seconds = round(duration.as('s')), minutes = round(duration.as('m')), hours = round(duration.as('h')), days = round(duration.as('d')), months = round(duration.as('M')), weeks = round(duration.as('w')), years = round(duration.as('y')), a = seconds <= thresholds.ss && [
            's',
            seconds
        ] || seconds < thresholds.s && [
            'ss',
            seconds
        ] || minutes <= 1 && [
            'm'
        ] || minutes < thresholds.m && [
            'mm',
            minutes
        ] || hours <= 1 && [
            'h'
        ] || hours < thresholds.h && [
            'hh',
            hours
        ] || days <= 1 && [
            'd'
        ] || days < thresholds.d && [
            'dd',
            days
        ];
        if (thresholds.w != null) a = a || weeks <= 1 && [
            'w'
        ] || weeks < thresholds.w && [
            'ww',
            weeks
        ];
        a = a || months <= 1 && [
            'M'
        ] || months < thresholds.M && [
            'MM',
            months
        ] || years <= 1 && [
            'y'
        ] || [
            'yy',
            years
        ];
        a[2] = withoutSuffix;
        a[3] = +posNegDuration > 0;
        a[4] = locale;
        return substituteTimeAgo.apply(null, a);
    }
    // This function allows you to set the rounding function for relative time strings
    function getSetRelativeTimeRounding(roundingFunction) {
        if (roundingFunction === undefined) return round;
        if (typeof roundingFunction === 'function') {
            round = roundingFunction;
            return true;
        }
        return false;
    }
    // This function allows you to set a threshold for relative time strings
    function getSetRelativeTimeThreshold(threshold, limit) {
        if (thresholds1[threshold] === undefined) return false;
        if (limit === undefined) return thresholds1[threshold];
        thresholds1[threshold] = limit;
        if (threshold === 's') thresholds1.ss = limit - 1;
        return true;
    }
    function humanize(argWithSuffix, argThresholds) {
        if (!this.isValid()) return this.localeData().invalidDate();
        var withSuffix = false, th = thresholds1, locale, output;
        if (typeof argWithSuffix === 'object') {
            argThresholds = argWithSuffix;
            argWithSuffix = false;
        }
        if (typeof argWithSuffix === 'boolean') withSuffix = argWithSuffix;
        if (typeof argThresholds === 'object') {
            th = Object.assign({
            }, thresholds1, argThresholds);
            if (argThresholds.s != null && argThresholds.ss == null) th.ss = argThresholds.s - 1;
        }
        locale = this.localeData();
        output = relativeTime$1(this, !withSuffix, th, locale);
        if (withSuffix) output = locale.pastFuture(+this, output);
        return locale.postformat(output);
    }
    var abs$1 = Math.abs;
    function sign1(x) {
        return (x > 0) - (x < 0) || +x;
    }
    function toISOString$1() {
        // for ISO strings we do not use the normal bubbling rules:
        //  * milliseconds bubble up until they become hours
        //  * days do not bubble at all
        //  * months bubble up until they become years
        // This is because there is no context-free conversion between hours and days
        // (think of clock changes)
        // and also not between days and months (28-31 days per month)
        if (!this.isValid()) return this.localeData().invalidDate();
        var seconds = abs$1(this._milliseconds) / 1000, days = abs$1(this._days), months = abs$1(this._months), minutes, hours, years, s, total = this.asSeconds(), totalSign, ymSign, daysSign, hmsSign;
        if (!total) // this is the same as C#'s (Noda) and python (isodate)...
        // but not other JS (goog.date)
        return 'P0D';
        // 3600 seconds -> 60 minutes -> 1 hour
        minutes = absFloor(seconds / 60);
        hours = absFloor(minutes / 60);
        seconds %= 60;
        minutes %= 60;
        // 12 months -> 1 year
        years = absFloor(months / 12);
        months %= 12;
        // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
        s = seconds ? seconds.toFixed(3).replace(/\.?0+$/, '') : '';
        totalSign = total < 0 ? '-' : '';
        ymSign = sign1(this._months) !== sign1(total) ? '-' : '';
        daysSign = sign1(this._days) !== sign1(total) ? '-' : '';
        hmsSign = sign1(this._milliseconds) !== sign1(total) ? '-' : '';
        return totalSign + 'P' + (years ? ymSign + years + 'Y' : '') + (months ? ymSign + months + 'M' : '') + (days ? daysSign + days + 'D' : '') + (hours || minutes || seconds ? 'T' : '') + (hours ? hmsSign + hours + 'H' : '') + (minutes ? hmsSign + minutes + 'M' : '') + (seconds ? hmsSign + s + 'S' : '');
    }
    var proto$2 = Duration.prototype;
    proto$2.isValid = isValid$1;
    proto$2.abs = abs;
    proto$2.add = add$1;
    proto$2.subtract = subtract$1;
    proto$2.as = as;
    proto$2.asMilliseconds = asMilliseconds;
    proto$2.asSeconds = asSeconds;
    proto$2.asMinutes = asMinutes;
    proto$2.asHours = asHours;
    proto$2.asDays = asDays;
    proto$2.asWeeks = asWeeks;
    proto$2.asMonths = asMonths;
    proto$2.asQuarters = asQuarters;
    proto$2.asYears = asYears;
    proto$2.valueOf = valueOf$1;
    proto$2._bubble = bubble;
    proto$2.clone = clone$1;
    proto$2.get = get$2;
    proto$2.milliseconds = milliseconds1;
    proto$2.seconds = seconds1;
    proto$2.minutes = minutes1;
    proto$2.hours = hours1;
    proto$2.days = days1;
    proto$2.weeks = weeks1;
    proto$2.months = months1;
    proto$2.years = years1;
    proto$2.humanize = humanize;
    proto$2.toISOString = toISOString$1;
    proto$2.toString = toISOString$1;
    proto$2.toJSON = toISOString$1;
    proto$2.locale = locale1;
    proto$2.localeData = localeData;
    proto$2.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', toISOString$1);
    proto$2.lang = lang;
    // FORMATTING
    addFormatToken('X', 0, 0, 'unix');
    addFormatToken('x', 0, 0, 'valueOf');
    // PARSING
    addRegexToken('x', matchSigned);
    addRegexToken('X', matchTimestamp);
    addParseToken('X', function(input, array, config) {
        config._d = new Date(parseFloat(input) * 1000);
    });
    addParseToken('x', function(input, array, config) {
        config._d = new Date(toInt(input));
    });
    //! moment.js
    hooks.version = '2.29.1';
    setHookCallback(createLocal);
    hooks.fn = proto;
    hooks.min = min;
    hooks.max = max;
    hooks.now = now1;
    hooks.utc = createUTC;
    hooks.unix = createUnix;
    hooks.months = listMonths;
    hooks.isDate = isDate;
    hooks.locale = getSetGlobalLocale;
    hooks.invalid = createInvalid;
    hooks.duration = createDuration;
    hooks.isMoment = isMoment;
    hooks.weekdays = listWeekdays;
    hooks.parseZone = createInZone;
    hooks.localeData = getLocale;
    hooks.isDuration = isDuration;
    hooks.monthsShort = listMonthsShort;
    hooks.weekdaysMin = listWeekdaysMin;
    hooks.defineLocale = defineLocale;
    hooks.updateLocale = updateLocale;
    hooks.locales = listLocales;
    hooks.weekdaysShort = listWeekdaysShort;
    hooks.normalizeUnits = normalizeUnits;
    hooks.relativeTimeRounding = getSetRelativeTimeRounding;
    hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
    hooks.calendarFormat = getCalendarFormat;
    hooks.prototype = proto;
    // currently HTML5 input type only supports 24-hour formats
    hooks.HTML5_FMT = {
        DATETIME_LOCAL: 'YYYY-MM-DDTHH:mm',
        DATETIME_LOCAL_SECONDS: 'YYYY-MM-DDTHH:mm:ss',
        DATETIME_LOCAL_MS: 'YYYY-MM-DDTHH:mm:ss.SSS',
        DATE: 'YYYY-MM-DD',
        TIME: 'HH:mm',
        TIME_SECONDS: 'HH:mm:ss',
        TIME_MS: 'HH:mm:ss.SSS',
        WEEK: 'GGGG-[W]WW',
        MONTH: 'YYYY-MM'
    };
    return hooks;
});

},{}],"kHd21":[function() {},{}],"d9uGO":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _mithril = require("mithril");
var _mithrilDefault = parcelHelpers.interopDefault(_mithril);
var _moment = require("moment");
var _momentDefault = parcelHelpers.interopDefault(_moment);
var _datePickerJsx = require("../date-picker/date-picker.jsx");
var _datePickerJsxDefault = parcelHelpers.interopDefault(_datePickerJsx);
var _popoverJsx = require("../popover/popover.jsx");
var _popoverJsxDefault = parcelHelpers.interopDefault(_popoverJsx);
var _dateRangeScss = require("./date-range.scss");
class DateRange {
    constructor(){
        this.datePickerVisible = false;
        this.rangeDropdownVisible = false;
        this.ranges = [
            {
                id: 'today',
                label: 'Today'
            },
            {
                id: 'week',
                label: 'This Week'
            },
            {
                id: 'month',
                label: 'This Month'
            },
            {
                id: 'year',
                label: 'This Year'
            },
            {
                id: 'twoWeeks',
                label: 'Two Weeks'
            },
            {
                id: 'all',
                label: 'All'
            }
        ];
    }
    oninit() {
        this.setRange('today');
    }
    openDatePicker() {
        this.datePickerVisible = true;
    }
    selectedRange(vnode) {
        let diffDays = vnode.attrs.endDate.diff(vnode.attrs.startDate, 'days', true);
        let diffMonths = vnode.attrs.endDate.diff(vnode.attrs.startDate, 'months', true);
        let diffYears = vnode.attrs.endDate.diff(vnode.attrs.startDate, 'years', true);
        if (vnode.attrs.endDate.date() === _momentDefault.default().date()) {
            if (vnode.attrs.startDate.isBefore(_momentDefault.default('0001-01-02'))) return 'All';
            else if (diffYears >= 1 && diffYears <= 1.005) return 'This Year';
            else if (diffMonths >= 1 && diffMonths <= 1.035) return 'This Month';
            else if (diffDays >= 14 && diffDays <= 15) return 'Two Weeks';
            else if (diffDays >= 7 && diffDays <= 8) return 'This Week';
            else if (diffDays >= 0 && diffDays <= 1) return 'Today';
        }
        return 'Custom';
    }
    openRangeDropdown() {
        this.rangeDropdownVisible = true;
    }
    setRange(vnode1, range1) {
        switch(range1){
            case 'today':
                vnode1.attrs.startDateChange(_momentDefault.default().startOf('day'));
                vnode1.attrs.endDateChange(_momentDefault.default().endOf('day'));
                break;
            case 'week':
                vnode1.attrs.startDateChange(_momentDefault.default().subtract(1, 'weeks').startOf('day'));
                vnode1.attrs.endDateChange(_momentDefault.default().endOf('day'));
                break;
            case 'month':
                vnode1.attrs.startDateChange(_momentDefault.default().subtract(1, 'months').startOf('day'));
                vnode1.attrs.endDateChange(_momentDefault.default().endOf('day'));
                break;
            case 'year':
                vnode1.attrs.startDateChange(_momentDefault.default().subtract(1, 'years').startOf('day'));
                vnode1.attrs.endDateChange(_momentDefault.default().endOf('day'));
                break;
            case 'twoWeeks':
                vnode1.attrs.startDateChange(_momentDefault.default().subtract(2, 'weeks').startOf('day'));
                vnode1.attrs.endDateChange(_momentDefault.default().endOf('day'));
                break;
            case 'all':
                vnode1.attrs.startDateChange(_momentDefault.default('0001-01-01'));
                vnode1.attrs.endDateChange(_momentDefault.default().endOf('day'));
                break;
        }
        this.rangeDropdownVisible = false;
    }
    view(vnode2) {
        return _mithrilDefault.default("div", {
            class: "dateRange"
        }, _mithrilDefault.default("div", {
            class: "dateRange__flex"
        }, _mithrilDefault.default("div", {
            class: "dateRange__segment"
        }, _mithrilDefault.default("div", {
            class: "dateRange__segment__content",
            onclick: ()=>{
                this.openDatePicker();
            }
        }, _mithrilDefault.default("span", {
            class: "material-icons",
            style: {
                marginRight: '.25rem'
            }
        }, "calendar_today"), _mithrilDefault.default("span", null, vnode2.attrs.startDate.format('MMM D, y'), " - ", vnode2.attrs.endDate.format('MMM D, y'))), _mithrilDefault.default(_popoverJsxDefault.default, {
            style: {
                top: '48px',
                width: '640px'
            },
            onClose: ()=>{
                this.datePickerVisible = false;
            },
            visible: this.datePickerVisible
        }, _mithrilDefault.default("div", {
            class: "dateRange__popover__flex"
        }, _mithrilDefault.default(_datePickerJsxDefault.default, {
            initialDate: vnode2.attrs.startDate,
            selectedChange: (date)=>{
                vnode2.attrs.startDateChange(date);
            }
        }), _mithrilDefault.default(_datePickerJsxDefault.default, {
            initialDate: vnode2.attrs.endDate,
            selectedChange: (date)=>{
                vnode2.attrs.endDateChange(date);
            }
        })))), _mithrilDefault.default("div", {
            class: "dateRange__segment"
        }, _mithrilDefault.default("div", {
            class: "dateRange__segment__content",
            onclick: ()=>{
                this.openRangeDropdown();
            }
        }, _mithrilDefault.default("div", {
            class: "segment__selected"
        }, this.selectedRange(vnode2)), _mithrilDefault.default("span", {
            class: "material-icons"
        }, "arrow_drop_down")), _mithrilDefault.default(_popoverJsxDefault.default, {
            style: {
                top: '48px',
                width: '150px'
            },
            onClose: ()=>{
                this.rangeDropdownVisible = false;
            },
            visible: this.rangeDropdownVisible
        }, this.ranges.map((range)=>{
            return [
                _mithrilDefault.default("div", {
                    class: "dateRange__popover__item",
                    onclick: ()=>{
                        this.setRange(vnode2, range.id);
                    }
                }, range.label)
            ];
        })))));
    }
}
module.exports = DateRange;

},{"mithril":"a7UJj","moment":"1RrsF","../date-picker/date-picker.jsx":"ewFz0","../popover/popover.jsx":"aEmG5","./date-range.scss":"14HYc","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"aEmG5":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _mithril = require("mithril");
var _mithrilDefault = parcelHelpers.interopDefault(_mithril);
var _popoverScss = require("./popover.scss");
class Popover {
    constructor(){
    }
    close(vnode) {
        vnode.attrs.onClose();
    }
    view(vnode1) {
        return vnode1.attrs.visible && _mithrilDefault.default('[', null, _mithrilDefault.default("div", {
            class: "popover",
            style: vnode1.attrs.style
        }, _mithrilDefault.default("div", {
            class: "popover__content",
            style: {
                padding: vnode1.attrs.padding
            }
        }, vnode1.children)), _mithrilDefault.default("div", {
            class: "popover__overlay",
            onclick: ()=>{
                this.close(vnode1);
            }
        }));
    }
}
module.exports = Popover;

},{"mithril":"a7UJj","./popover.scss":"ehYzW","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"ehYzW":[function() {},{}],"14HYc":[function() {},{}],"5GWKD":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _mithril = require("mithril");
var _mithrilDefault = parcelHelpers.interopDefault(_mithril);
var _iconButtonJsx = require("../icon-button/icon-button.jsx");
var _iconButtonJsxDefault = parcelHelpers.interopDefault(_iconButtonJsx);
var _modalScss = require("./modal.scss");
class Modal {
    constructor(){
    }
    close(vnode) {
        if (vnode.attrs.onClose) vnode.attrs.onClose();
    }
    view(vnode1) {
        return vnode1.attrs.isOpen && _mithrilDefault.default("div", {
            class: vnode1.attrs.backdropDisabled ? 'modal.modal--backdropDisabled' : 'modal',
            onclick: ()=>{
                this.close(vnode1);
            }
        }, _mithrilDefault.default("div", {
            class: "modal__content",
            style: vnode1.attrs.style,
            onclick: (e)=>{
                e.stopPropagation();
            }
        }, !vnode1.attrs.closeDisabled && _mithrilDefault.default("div", {
            class: "modal__close"
        }, _mithrilDefault.default(_iconButtonJsxDefault.default, {
            icon: "close",
            onclick: ()=>{
                this.close(vnode1);
            }
        })), vnode1.attrs.header && _mithrilDefault.default("div", null, vnode1.attrs.header), _mithrilDefault.default("div", null, vnode1.attrs.content), vnode1.attrs.footer && _mithrilDefault.default("div", null, vnode1.attrs.footer)));
    }
}
module.exports = Modal;

},{"mithril":"a7UJj","../icon-button/icon-button.jsx":"9YaD7","./modal.scss":"byDqM","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"byDqM":[function() {},{}],"eAg79":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _mithril = require("mithril");
var _mithrilDefault = parcelHelpers.interopDefault(_mithril);
var _select = require("@material/select");
class Select {
    constructor(){
        this.mdcInstance = null;
    }
    oncreate() {
        try {
            this.select = new _select.MDCSelect(document.querySelector('.mdc-select'));
            this.select.listen('MDCSelect:change', ()=>{
            });
        } catch (e) {
        }
    }
    view() {
        return _mithrilDefault.default('[', null, _mithrilDefault.default("div", {
            class: "mdc-select mdc-select--filled demo-width-class"
        }, _mithrilDefault.default("div", {
            class: "mdc-select__anchor",
            role: "button",
            "aria-haspopup": "listbox",
            "aria-expanded": "false",
            "aria-labelledby": "demo-label demo-selected-text"
        }, _mithrilDefault.default("span", {
            class: "mdc-select__ripple"
        }), _mithrilDefault.default("span", {
            id: "demo-label",
            class: "mdc-floating-label"
        }, "Pick a Food Group"), _mithrilDefault.default("span", {
            class: "mdc-select__selected-text-container"
        }, _mithrilDefault.default("span", {
            id: "demo-selected-text",
            class: "mdc-select__selected-text"
        })), _mithrilDefault.default("span", {
            class: "mdc-select__dropdown-icon"
        }, _mithrilDefault.default("svg", {
            class: "mdc-select__dropdown-icon-graphic",
            viewBox: "7 10 10 5",
            focusable: "false"
        }, _mithrilDefault.default("polygon", {
            class: "mdc-select__dropdown-icon-inactive",
            stroke: "none",
            "fill-rule": "evenodd",
            points: "7 10 12 15 17 10"
        }), _mithrilDefault.default("polygon", {
            class: "mdc-select__dropdown-icon-active",
            stroke: "none",
            "fill-rule": "evenodd",
            points: "7 15 12 10 17 15"
        }))), _mithrilDefault.default("span", {
            class: "mdc-line-ripple"
        })), _mithrilDefault.default("div", {
            class: "mdc-select__menu mdc-menu mdc-menu-surface mdc-menu-surface--fullwidth"
        }, _mithrilDefault.default("ul", {
            class: "mdc-deprecated-list",
            role: "listbox",
            "aria-label": "Food picker listbox"
        }, _mithrilDefault.default("li", {
            class: "mdc-deprecated-list-item mdc-deprecated-list-item--selected",
            "aria-selected": "true",
            "data-value": "",
            role: "option"
        }, _mithrilDefault.default("span", {
            class: "mdc-deprecated-list-item__ripple"
        })), _mithrilDefault.default("li", {
            class: "mdc-deprecated-list-item",
            "aria-selected": "false",
            "data-value": "grains",
            role: "option"
        }, _mithrilDefault.default("span", {
            class: "mdc-deprecated-list-item__ripple"
        }), _mithrilDefault.default("span", {
            class: "mdc-deprecated-list-item__text"
        }, "Bread, Cereal, Rice, and Pasta")), _mithrilDefault.default("li", {
            class: "mdc-deprecated-list-item mdc-deprecated-list-item--disabled",
            "aria-selected": "false",
            "data-value": "vegetables",
            "aria-disabled": "true",
            role: "option"
        }, _mithrilDefault.default("span", {
            class: "mdc-deprecated-list-item__ripple"
        }), _mithrilDefault.default("span", {
            class: "mdc-deprecated-list-item__text"
        }, "Vegetables")), _mithrilDefault.default("li", {
            class: "mdc-deprecated-list-item",
            "aria-selected": "false",
            "data-value": "fruit",
            role: "option"
        }, _mithrilDefault.default("span", {
            class: "mdc-deprecated-list-item__ripple"
        }), _mithrilDefault.default("span", {
            class: "mdc-deprecated-list-item__text"
        }, "Fruit"))))));
    }
}
module.exports = Select;

},{"mithril":"a7UJj","@material/select":"cnlm1","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"cnlm1":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */ var _adapter = require("./adapter");
parcelHelpers.exportAll(_adapter, exports);
var _component = require("./component");
parcelHelpers.exportAll(_component, exports);
var _constants = require("./constants");
parcelHelpers.exportAll(_constants, exports);
var _foundation = require("./foundation");
parcelHelpers.exportAll(_foundation, exports);
var _types = require("./types");
parcelHelpers.exportAll(_types, exports);
var _index = require("./helper-text/index");
parcelHelpers.exportAll(_index, exports);
var _index1 = require("./icon/index");
parcelHelpers.exportAll(_index1, exports);

},{"./adapter":"33l7I","./component":"kGGPG","./constants":"bKvZz","./foundation":"he4Oj","./types":"jo44u","./helper-text/index":"51nbW","./icon/index":"l5b0W","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"33l7I":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"kGGPG":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "MDCSelect", ()=>MDCSelect1
);
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */ var _tslib = require("tslib");
var _component = require("@material/base/component");
var _component1 = require("@material/floating-label/component");
var _component2 = require("@material/line-ripple/component");
var _constants = require("@material/menu-surface/constants");
var _component3 = require("@material/menu/component");
var _constants1 = require("@material/menu/constants");
var _component4 = require("@material/notched-outline/component");
var _component5 = require("@material/ripple/component");
var _foundation = require("@material/ripple/foundation");
var _constants2 = require("./constants");
var _foundation1 = require("./foundation");
var _component6 = require("./helper-text/component");
var _component7 = require("./icon/component");
var MDCSelect1 = function(_super) {
    _tslib.__extends(MDCSelect, _super);
    function MDCSelect() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MDCSelect.attachTo = function(root) {
        return new MDCSelect(root);
    };
    MDCSelect.prototype.initialize = function(labelFactory, lineRippleFactory, outlineFactory, menuFactory, iconFactory, helperTextFactory) {
        if (labelFactory === void 0) labelFactory = function(el) {
            return new _component1.MDCFloatingLabel(el);
        };
        if (lineRippleFactory === void 0) lineRippleFactory = function(el) {
            return new _component2.MDCLineRipple(el);
        };
        if (outlineFactory === void 0) outlineFactory = function(el) {
            return new _component4.MDCNotchedOutline(el);
        };
        if (menuFactory === void 0) menuFactory = function(el) {
            return new _component3.MDCMenu(el);
        };
        if (iconFactory === void 0) iconFactory = function(el) {
            return new _component7.MDCSelectIcon(el);
        };
        if (helperTextFactory === void 0) helperTextFactory = function(el) {
            return new _component6.MDCSelectHelperText(el);
        };
        this.selectAnchor = this.root.querySelector(_constants2.strings.SELECT_ANCHOR_SELECTOR);
        this.selectedText = this.root.querySelector(_constants2.strings.SELECTED_TEXT_SELECTOR);
        this.hiddenInput = this.root.querySelector(_constants2.strings.HIDDEN_INPUT_SELECTOR);
        if (!this.selectedText) throw new Error('MDCSelect: Missing required element: The following selector must be present: ' + ("'" + _constants2.strings.SELECTED_TEXT_SELECTOR + "'"));
        if (this.selectAnchor.hasAttribute(_constants2.strings.ARIA_CONTROLS)) {
            var helperTextElement = document.getElementById(this.selectAnchor.getAttribute(_constants2.strings.ARIA_CONTROLS));
            if (helperTextElement) this.helperText = helperTextFactory(helperTextElement);
        }
        this.menuSetup(menuFactory);
        var labelElement = this.root.querySelector(_constants2.strings.LABEL_SELECTOR);
        this.label = labelElement ? labelFactory(labelElement) : null;
        var lineRippleElement = this.root.querySelector(_constants2.strings.LINE_RIPPLE_SELECTOR);
        this.lineRipple = lineRippleElement ? lineRippleFactory(lineRippleElement) : null;
        var outlineElement = this.root.querySelector(_constants2.strings.OUTLINE_SELECTOR);
        this.outline = outlineElement ? outlineFactory(outlineElement) : null;
        var leadingIcon = this.root.querySelector(_constants2.strings.LEADING_ICON_SELECTOR);
        if (leadingIcon) this.leadingIcon = iconFactory(leadingIcon);
        if (!this.root.classList.contains(_constants2.cssClasses.OUTLINED)) this.ripple = this.createRipple();
    };
    /**
     * Initializes the select's event listeners and internal state based
     * on the environment's state.
     */ MDCSelect.prototype.initialSyncWithDOM = function() {
        var _this = this;
        this.handleFocus = function() {
            _this.foundation.handleFocus();
        };
        this.handleBlur = function() {
            _this.foundation.handleBlur();
        };
        this.handleClick = function(evt) {
            _this.selectAnchor.focus();
            _this.foundation.handleClick(_this.getNormalizedXCoordinate(evt));
        };
        this.handleKeydown = function(evt) {
            _this.foundation.handleKeydown(evt);
        };
        this.handleMenuItemAction = function(evt) {
            _this.foundation.handleMenuItemAction(evt.detail.index);
        };
        this.handleMenuOpened = function() {
            _this.foundation.handleMenuOpened();
        };
        this.handleMenuClosed = function() {
            _this.foundation.handleMenuClosed();
        };
        this.handleMenuClosing = function() {
            _this.foundation.handleMenuClosing();
        };
        this.selectAnchor.addEventListener('focus', this.handleFocus);
        this.selectAnchor.addEventListener('blur', this.handleBlur);
        this.selectAnchor.addEventListener('click', this.handleClick);
        this.selectAnchor.addEventListener('keydown', this.handleKeydown);
        this.menu.listen(_constants.strings.CLOSED_EVENT, this.handleMenuClosed);
        this.menu.listen(_constants.strings.CLOSING_EVENT, this.handleMenuClosing);
        this.menu.listen(_constants.strings.OPENED_EVENT, this.handleMenuOpened);
        this.menu.listen(_constants1.strings.SELECTED_EVENT, this.handleMenuItemAction);
        if (this.hiddenInput) {
            if (this.hiddenInput.value) {
                // If the hidden input already has a value, use it to restore the
                // select's value. This can happen e.g. if the user goes back or (in
                // some browsers) refreshes the page.
                this.foundation.setValue(this.hiddenInput.value, /** skipNotify */ true);
                this.foundation.layout();
                return;
            }
            this.hiddenInput.value = this.value;
        }
    };
    MDCSelect.prototype.destroy = function() {
        this.selectAnchor.removeEventListener('focus', this.handleFocus);
        this.selectAnchor.removeEventListener('blur', this.handleBlur);
        this.selectAnchor.removeEventListener('keydown', this.handleKeydown);
        this.selectAnchor.removeEventListener('click', this.handleClick);
        this.menu.unlisten(_constants.strings.CLOSED_EVENT, this.handleMenuClosed);
        this.menu.unlisten(_constants.strings.OPENED_EVENT, this.handleMenuOpened);
        this.menu.unlisten(_constants1.strings.SELECTED_EVENT, this.handleMenuItemAction);
        this.menu.destroy();
        if (this.ripple) this.ripple.destroy();
        if (this.outline) this.outline.destroy();
        if (this.leadingIcon) this.leadingIcon.destroy();
        if (this.helperText) this.helperText.destroy();
        _super.prototype.destroy.call(this);
    };
    Object.defineProperty(MDCSelect.prototype, "value", {
        get: function() {
            return this.foundation.getValue();
        },
        set: function(value) {
            this.foundation.setValue(value);
        },
        enumerable: false,
        configurable: true
    });
    MDCSelect.prototype.setValue = function(value, skipNotify) {
        if (skipNotify === void 0) skipNotify = false;
        this.foundation.setValue(value, skipNotify);
    };
    Object.defineProperty(MDCSelect.prototype, "selectedIndex", {
        get: function() {
            return this.foundation.getSelectedIndex();
        },
        set: function(selectedIndex) {
            this.foundation.setSelectedIndex(selectedIndex, /* closeMenu */ true);
        },
        enumerable: false,
        configurable: true
    });
    MDCSelect.prototype.setSelectedIndex = function(selectedIndex, skipNotify) {
        if (skipNotify === void 0) skipNotify = false;
        this.foundation.setSelectedIndex(selectedIndex, /* closeMenu */ true, skipNotify);
    };
    Object.defineProperty(MDCSelect.prototype, "disabled", {
        get: function() {
            return this.foundation.getDisabled();
        },
        set: function(disabled) {
            this.foundation.setDisabled(disabled);
            if (this.hiddenInput) this.hiddenInput.disabled = disabled;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCSelect.prototype, "leadingIconAriaLabel", {
        set: function(label) {
            this.foundation.setLeadingIconAriaLabel(label);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCSelect.prototype, "leadingIconContent", {
        /**
         * Sets the text content of the leading icon.
         */ set: function(content) {
            this.foundation.setLeadingIconContent(content);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCSelect.prototype, "helperTextContent", {
        /**
         * Sets the text content of the helper text.
         */ set: function(content) {
            this.foundation.setHelperTextContent(content);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCSelect.prototype, "useDefaultValidation", {
        /**
         * Enables or disables the default validation scheme where a required select
         * must be non-empty. Set to false for custom validation.
         * @param useDefaultValidation Set this to false to ignore default
         *     validation scheme.
         */ set: function(useDefaultValidation) {
            this.foundation.setUseDefaultValidation(useDefaultValidation);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCSelect.prototype, "valid", {
        /**
         * Checks if the select is in a valid state.
         */ get: function() {
            return this.foundation.isValid();
        },
        /**
         * Sets the current invalid state of the select.
         */ set: function(isValid) {
            this.foundation.setValid(isValid);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCSelect.prototype, "required", {
        /**
         * Returns whether the select is required.
         */ get: function() {
            return this.foundation.getRequired();
        },
        /**
         * Sets the control to the required state.
         */ set: function(isRequired) {
            this.foundation.setRequired(isRequired);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Re-calculates if the notched outline should be notched and if the label
     * should float.
     */ MDCSelect.prototype.layout = function() {
        this.foundation.layout();
    };
    /**
     * Synchronizes the list of options with the state of the foundation. Call
     * this whenever menu options are dynamically updated.
     */ MDCSelect.prototype.layoutOptions = function() {
        this.foundation.layoutOptions();
        this.menu.layout();
        // Update cached menuItemValues for adapter.
        this.menuItemValues = this.menu.items.map(function(el) {
            return el.getAttribute(_constants2.strings.VALUE_ATTR) || '';
        });
        if (this.hiddenInput) this.hiddenInput.value = this.value;
    };
    MDCSelect.prototype.getDefaultFoundation = function() {
        // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
        // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
        var adapter = _tslib.__assign(_tslib.__assign(_tslib.__assign(_tslib.__assign({
        }, this.getSelectAdapterMethods()), this.getCommonAdapterMethods()), this.getOutlineAdapterMethods()), this.getLabelAdapterMethods());
        return new _foundation1.MDCSelectFoundation(adapter, this.getFoundationMap());
    };
    /**
     * Handles setup for the menu.
     */ MDCSelect.prototype.menuSetup = function(menuFactory) {
        this.menuElement = this.root.querySelector(_constants2.strings.MENU_SELECTOR);
        this.menu = menuFactory(this.menuElement);
        this.menu.hasTypeahead = true;
        this.menu.singleSelection = true;
        this.menuItemValues = this.menu.items.map(function(el) {
            return el.getAttribute(_constants2.strings.VALUE_ATTR) || '';
        });
    };
    MDCSelect.prototype.createRipple = function() {
        var _this = this;
        // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
        // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
        // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
        var adapter = _tslib.__assign(_tslib.__assign({
        }, _component5.MDCRipple.createAdapter({
            root: this.selectAnchor
        })), {
            registerInteractionHandler: function(evtType, handler) {
                _this.selectAnchor.addEventListener(evtType, handler);
            },
            deregisterInteractionHandler: function(evtType, handler) {
                _this.selectAnchor.removeEventListener(evtType, handler);
            }
        });
        // tslint:enable:object-literal-sort-keys
        return new _component5.MDCRipple(this.selectAnchor, new _foundation.MDCRippleFoundation(adapter));
    };
    MDCSelect.prototype.getSelectAdapterMethods = function() {
        var _this = this;
        // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
        return {
            getMenuItemAttr: function(menuItem, attr) {
                return menuItem.getAttribute(attr);
            },
            setSelectedText: function(text) {
                _this.selectedText.textContent = text;
            },
            isSelectAnchorFocused: function() {
                return document.activeElement === _this.selectAnchor;
            },
            getSelectAnchorAttr: function(attr) {
                return _this.selectAnchor.getAttribute(attr);
            },
            setSelectAnchorAttr: function(attr, value) {
                _this.selectAnchor.setAttribute(attr, value);
            },
            removeSelectAnchorAttr: function(attr) {
                _this.selectAnchor.removeAttribute(attr);
            },
            addMenuClass: function(className) {
                _this.menuElement.classList.add(className);
            },
            removeMenuClass: function(className) {
                _this.menuElement.classList.remove(className);
            },
            openMenu: function() {
                _this.menu.open = true;
            },
            closeMenu: function() {
                _this.menu.open = false;
            },
            getAnchorElement: function() {
                return _this.root.querySelector(_constants2.strings.SELECT_ANCHOR_SELECTOR);
            },
            setMenuAnchorElement: function(anchorEl) {
                _this.menu.setAnchorElement(anchorEl);
            },
            setMenuAnchorCorner: function(anchorCorner) {
                _this.menu.setAnchorCorner(anchorCorner);
            },
            setMenuWrapFocus: function(wrapFocus) {
                _this.menu.wrapFocus = wrapFocus;
            },
            getSelectedIndex: function() {
                var index = _this.menu.selectedIndex;
                return index instanceof Array ? index[0] : index;
            },
            setSelectedIndex: function(index) {
                _this.menu.selectedIndex = index;
            },
            focusMenuItemAtIndex: function(index) {
                _this.menu.items[index].focus();
            },
            getMenuItemCount: function() {
                return _this.menu.items.length;
            },
            // Cache menu item values. layoutOptions() updates this cache.
            getMenuItemValues: function() {
                return _this.menuItemValues;
            },
            getMenuItemTextAtIndex: function(index) {
                return _this.menu.getPrimaryTextAtIndex(index);
            },
            isTypeaheadInProgress: function() {
                return _this.menu.typeaheadInProgress;
            },
            typeaheadMatchItem: function(nextChar, startingIndex) {
                return _this.menu.typeaheadMatchItem(nextChar, startingIndex);
            }
        };
    // tslint:enable:object-literal-sort-keys
    };
    MDCSelect.prototype.getCommonAdapterMethods = function() {
        var _this = this;
        // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
        return {
            addClass: function(className) {
                _this.root.classList.add(className);
            },
            removeClass: function(className) {
                _this.root.classList.remove(className);
            },
            hasClass: function(className) {
                return _this.root.classList.contains(className);
            },
            setRippleCenter: function(normalizedX) {
                _this.lineRipple && _this.lineRipple.setRippleCenter(normalizedX);
            },
            activateBottomLine: function() {
                _this.lineRipple && _this.lineRipple.activate();
            },
            deactivateBottomLine: function() {
                _this.lineRipple && _this.lineRipple.deactivate();
            },
            notifyChange: function(value) {
                if (_this.hiddenInput) _this.hiddenInput.value = value;
                var index = _this.selectedIndex;
                _this.emit(_constants2.strings.CHANGE_EVENT, {
                    value: value,
                    index: index
                }, true);
            }
        };
    // tslint:enable:object-literal-sort-keys
    };
    MDCSelect.prototype.getOutlineAdapterMethods = function() {
        var _this = this;
        // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
        return {
            hasOutline: function() {
                return Boolean(_this.outline);
            },
            notchOutline: function(labelWidth) {
                _this.outline && _this.outline.notch(labelWidth);
            },
            closeOutline: function() {
                _this.outline && _this.outline.closeNotch();
            }
        };
    // tslint:enable:object-literal-sort-keys
    };
    MDCSelect.prototype.getLabelAdapterMethods = function() {
        var _this = this;
        // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
        return {
            hasLabel: function() {
                return !!_this.label;
            },
            floatLabel: function(shouldFloat) {
                _this.label && _this.label.float(shouldFloat);
            },
            getLabelWidth: function() {
                return _this.label ? _this.label.getWidth() : 0;
            },
            setLabelRequired: function(isRequired) {
                _this.label && _this.label.setRequired(isRequired);
            }
        };
    // tslint:enable:object-literal-sort-keys
    };
    /**
     * Calculates where the line ripple should start based on the x coordinate within the component.
     */ MDCSelect.prototype.getNormalizedXCoordinate = function(evt) {
        var targetClientRect = evt.target.getBoundingClientRect();
        var xCoordinate = this.isTouchEvent(evt) ? evt.touches[0].clientX : evt.clientX;
        return xCoordinate - targetClientRect.left;
    };
    MDCSelect.prototype.isTouchEvent = function(evt) {
        return Boolean(evt.touches);
    };
    /**
     * Returns a map of all subcomponents to subfoundations.
     */ MDCSelect.prototype.getFoundationMap = function() {
        return {
            helperText: this.helperText ? this.helperText.foundationForSelect : undefined,
            leadingIcon: this.leadingIcon ? this.leadingIcon.foundationForSelect : undefined
        };
    };
    return MDCSelect;
}(_component.MDCComponent);

},{"tslib":"j55WF","@material/base/component":"4ISbx","@material/floating-label/component":"6mzJO","@material/line-ripple/component":"jFBqQ","@material/menu-surface/constants":"ilumG","@material/menu/component":"03Bve","@material/menu/constants":"fqDlq","@material/notched-outline/component":"eJptm","@material/ripple/component":"l2wqP","@material/ripple/foundation":"5cEAm","./constants":"bKvZz","./foundation":"he4Oj","./helper-text/component":"8B1ww","./icon/component":"khQc1","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"6mzJO":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "MDCFloatingLabel", ()=>MDCFloatingLabel1
);
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */ var _tslib = require("tslib");
var _component = require("@material/base/component");
var _ponyfill = require("@material/dom/ponyfill");
var _foundation = require("./foundation");
var MDCFloatingLabel1 = function(_super) {
    _tslib.__extends(MDCFloatingLabel, _super);
    function MDCFloatingLabel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MDCFloatingLabel.attachTo = function(root) {
        return new MDCFloatingLabel(root);
    };
    /**
     * Styles the label to produce the label shake for errors.
     * @param shouldShake If true, shakes the label by adding a CSS class; otherwise, stops shaking by removing the class.
     */ MDCFloatingLabel.prototype.shake = function(shouldShake) {
        this.foundation.shake(shouldShake);
    };
    /**
     * Styles the label to float/dock.
     * @param shouldFloat If true, floats the label by adding a CSS class; otherwise, docks it by removing the class.
     */ MDCFloatingLabel.prototype.float = function(shouldFloat) {
        this.foundation.float(shouldFloat);
    };
    /**
     * Styles the label as required.
     * @param isRequired If true, adds an asterisk to the label, indicating that it is required.
     */ MDCFloatingLabel.prototype.setRequired = function(isRequired) {
        this.foundation.setRequired(isRequired);
    };
    MDCFloatingLabel.prototype.getWidth = function() {
        return this.foundation.getWidth();
    };
    MDCFloatingLabel.prototype.getDefaultFoundation = function() {
        var _this = this;
        // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
        // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
        // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
        var adapter = {
            addClass: function(className) {
                return _this.root.classList.add(className);
            },
            removeClass: function(className) {
                return _this.root.classList.remove(className);
            },
            getWidth: function() {
                return _ponyfill.estimateScrollWidth(_this.root);
            },
            registerInteractionHandler: function(evtType, handler) {
                return _this.listen(evtType, handler);
            },
            deregisterInteractionHandler: function(evtType, handler) {
                return _this.unlisten(evtType, handler);
            }
        };
        // tslint:enable:object-literal-sort-keys
        return new _foundation.MDCFloatingLabelFoundation(adapter);
    };
    return MDCFloatingLabel;
}(_component.MDCComponent);

},{"tslib":"j55WF","@material/base/component":"4ISbx","@material/dom/ponyfill":"cB7q4","./foundation":"aG8y8","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"aG8y8":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "MDCFloatingLabelFoundation", ()=>MDCFloatingLabelFoundation1
);
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */ var _tslib = require("tslib");
var _foundation = require("@material/base/foundation");
var _constants = require("./constants");
var MDCFloatingLabelFoundation1 = function(_super) {
    _tslib.__extends(MDCFloatingLabelFoundation, _super);
    function MDCFloatingLabelFoundation(adapter) {
        var _this = _super.call(this, _tslib.__assign(_tslib.__assign({
        }, MDCFloatingLabelFoundation.defaultAdapter), adapter)) || this;
        _this.shakeAnimationEndHandler = function() {
            _this.handleShakeAnimationEnd();
        };
        return _this;
    }
    Object.defineProperty(MDCFloatingLabelFoundation, "cssClasses", {
        get: function() {
            return _constants.cssClasses;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCFloatingLabelFoundation, "defaultAdapter", {
        /**
         * See {@link MDCFloatingLabelAdapter} for typing information on parameters and return types.
         */ get: function() {
            // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
            return {
                addClass: function() {
                    return undefined;
                },
                removeClass: function() {
                    return undefined;
                },
                getWidth: function() {
                    return 0;
                },
                registerInteractionHandler: function() {
                    return undefined;
                },
                deregisterInteractionHandler: function() {
                    return undefined;
                }
            };
        // tslint:enable:object-literal-sort-keys
        },
        enumerable: false,
        configurable: true
    });
    MDCFloatingLabelFoundation.prototype.init = function() {
        this.adapter.registerInteractionHandler('animationend', this.shakeAnimationEndHandler);
    };
    MDCFloatingLabelFoundation.prototype.destroy = function() {
        this.adapter.deregisterInteractionHandler('animationend', this.shakeAnimationEndHandler);
    };
    /**
     * Returns the width of the label element.
     */ MDCFloatingLabelFoundation.prototype.getWidth = function() {
        return this.adapter.getWidth();
    };
    /**
     * Styles the label to produce a shake animation to indicate an error.
     * @param shouldShake If true, adds the shake CSS class; otherwise, removes shake class.
     */ MDCFloatingLabelFoundation.prototype.shake = function(shouldShake) {
        var LABEL_SHAKE = MDCFloatingLabelFoundation.cssClasses.LABEL_SHAKE;
        if (shouldShake) this.adapter.addClass(LABEL_SHAKE);
        else this.adapter.removeClass(LABEL_SHAKE);
    };
    /**
     * Styles the label to float or dock.
     * @param shouldFloat If true, adds the float CSS class; otherwise, removes float and shake classes to dock the label.
     */ MDCFloatingLabelFoundation.prototype.float = function(shouldFloat) {
        var _a = MDCFloatingLabelFoundation.cssClasses, LABEL_FLOAT_ABOVE = _a.LABEL_FLOAT_ABOVE, LABEL_SHAKE = _a.LABEL_SHAKE;
        if (shouldFloat) this.adapter.addClass(LABEL_FLOAT_ABOVE);
        else {
            this.adapter.removeClass(LABEL_FLOAT_ABOVE);
            this.adapter.removeClass(LABEL_SHAKE);
        }
    };
    /**
     * Styles the label as required.
     * @param isRequired If true, adds an asterisk to the label, indicating that it is required.
     */ MDCFloatingLabelFoundation.prototype.setRequired = function(isRequired) {
        var LABEL_REQUIRED = MDCFloatingLabelFoundation.cssClasses.LABEL_REQUIRED;
        if (isRequired) this.adapter.addClass(LABEL_REQUIRED);
        else this.adapter.removeClass(LABEL_REQUIRED);
    };
    MDCFloatingLabelFoundation.prototype.handleShakeAnimationEnd = function() {
        var LABEL_SHAKE = MDCFloatingLabelFoundation.cssClasses.LABEL_SHAKE;
        this.adapter.removeClass(LABEL_SHAKE);
    };
    return MDCFloatingLabelFoundation;
}(_foundation.MDCFoundation);
exports.default = MDCFloatingLabelFoundation1;

},{"tslib":"j55WF","@material/base/foundation":"6nwGh","./constants":"8ufOR","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"8ufOR":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "cssClasses", ()=>cssClasses
);
var cssClasses = {
    LABEL_FLOAT_ABOVE: 'mdc-floating-label--float-above',
    LABEL_REQUIRED: 'mdc-floating-label--required',
    LABEL_SHAKE: 'mdc-floating-label--shake',
    ROOT: 'mdc-floating-label'
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"jFBqQ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "MDCLineRipple", ()=>MDCLineRipple1
);
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */ var _tslib = require("tslib");
var _component = require("@material/base/component");
var _foundation = require("./foundation");
var MDCLineRipple1 = function(_super) {
    _tslib.__extends(MDCLineRipple, _super);
    function MDCLineRipple() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MDCLineRipple.attachTo = function(root) {
        return new MDCLineRipple(root);
    };
    /**
     * Activates the line ripple
     */ MDCLineRipple.prototype.activate = function() {
        this.foundation.activate();
    };
    /**
     * Deactivates the line ripple
     */ MDCLineRipple.prototype.deactivate = function() {
        this.foundation.deactivate();
    };
    /**
     * Sets the transform origin given a user's click location.
     * The `rippleCenter` is the x-coordinate of the middle of the ripple.
     */ MDCLineRipple.prototype.setRippleCenter = function(xCoordinate) {
        this.foundation.setRippleCenter(xCoordinate);
    };
    MDCLineRipple.prototype.getDefaultFoundation = function() {
        var _this = this;
        // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
        // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
        // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
        var adapter = {
            addClass: function(className) {
                return _this.root.classList.add(className);
            },
            removeClass: function(className) {
                return _this.root.classList.remove(className);
            },
            hasClass: function(className) {
                return _this.root.classList.contains(className);
            },
            setStyle: function(propertyName, value) {
                return _this.root.style.setProperty(propertyName, value);
            },
            registerEventHandler: function(evtType, handler) {
                return _this.listen(evtType, handler);
            },
            deregisterEventHandler: function(evtType, handler) {
                return _this.unlisten(evtType, handler);
            }
        };
        // tslint:enable:object-literal-sort-keys
        return new _foundation.MDCLineRippleFoundation(adapter);
    };
    return MDCLineRipple;
}(_component.MDCComponent);

},{"tslib":"j55WF","@material/base/component":"4ISbx","./foundation":"1zI1N","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"1zI1N":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "MDCLineRippleFoundation", ()=>MDCLineRippleFoundation1
);
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */ var _tslib = require("tslib");
var _foundation = require("@material/base/foundation");
var _constants = require("./constants");
var MDCLineRippleFoundation1 = function(_super) {
    _tslib.__extends(MDCLineRippleFoundation, _super);
    function MDCLineRippleFoundation(adapter) {
        var _this = _super.call(this, _tslib.__assign(_tslib.__assign({
        }, MDCLineRippleFoundation.defaultAdapter), adapter)) || this;
        _this.transitionEndHandler = function(evt) {
            _this.handleTransitionEnd(evt);
        };
        return _this;
    }
    Object.defineProperty(MDCLineRippleFoundation, "cssClasses", {
        get: function() {
            return _constants.cssClasses;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCLineRippleFoundation, "defaultAdapter", {
        /**
         * See {@link MDCLineRippleAdapter} for typing information on parameters and return types.
         */ get: function() {
            // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
            return {
                addClass: function() {
                    return undefined;
                },
                removeClass: function() {
                    return undefined;
                },
                hasClass: function() {
                    return false;
                },
                setStyle: function() {
                    return undefined;
                },
                registerEventHandler: function() {
                    return undefined;
                },
                deregisterEventHandler: function() {
                    return undefined;
                }
            };
        // tslint:enable:object-literal-sort-keys
        },
        enumerable: false,
        configurable: true
    });
    MDCLineRippleFoundation.prototype.init = function() {
        this.adapter.registerEventHandler('transitionend', this.transitionEndHandler);
    };
    MDCLineRippleFoundation.prototype.destroy = function() {
        this.adapter.deregisterEventHandler('transitionend', this.transitionEndHandler);
    };
    MDCLineRippleFoundation.prototype.activate = function() {
        this.adapter.removeClass(_constants.cssClasses.LINE_RIPPLE_DEACTIVATING);
        this.adapter.addClass(_constants.cssClasses.LINE_RIPPLE_ACTIVE);
    };
    MDCLineRippleFoundation.prototype.setRippleCenter = function(xCoordinate) {
        this.adapter.setStyle('transform-origin', xCoordinate + "px center");
    };
    MDCLineRippleFoundation.prototype.deactivate = function() {
        this.adapter.addClass(_constants.cssClasses.LINE_RIPPLE_DEACTIVATING);
    };
    MDCLineRippleFoundation.prototype.handleTransitionEnd = function(evt) {
        // Wait for the line ripple to be either transparent or opaque
        // before emitting the animation end event
        var isDeactivating = this.adapter.hasClass(_constants.cssClasses.LINE_RIPPLE_DEACTIVATING);
        if (evt.propertyName === 'opacity') {
            if (isDeactivating) {
                this.adapter.removeClass(_constants.cssClasses.LINE_RIPPLE_ACTIVE);
                this.adapter.removeClass(_constants.cssClasses.LINE_RIPPLE_DEACTIVATING);
            }
        }
    };
    return MDCLineRippleFoundation;
}(_foundation.MDCFoundation);
exports.default = MDCLineRippleFoundation1;

},{"tslib":"j55WF","@material/base/foundation":"6nwGh","./constants":"9xRHE","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"9xRHE":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "cssClasses", ()=>cssClasses
);
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */ var cssClasses = {
    LINE_RIPPLE_ACTIVE: 'mdc-line-ripple--active',
    LINE_RIPPLE_DEACTIVATING: 'mdc-line-ripple--deactivating'
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"ilumG":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "cssClasses", ()=>cssClasses
);
parcelHelpers.export(exports, "strings", ()=>strings
);
parcelHelpers.export(exports, "numbers", ()=>numbers
);
parcelHelpers.export(exports, "CornerBit", ()=>CornerBit1
);
parcelHelpers.export(exports, "Corner", ()=>Corner1
);
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */ var cssClasses = {
    ANCHOR: 'mdc-menu-surface--anchor',
    ANIMATING_CLOSED: 'mdc-menu-surface--animating-closed',
    ANIMATING_OPEN: 'mdc-menu-surface--animating-open',
    FIXED: 'mdc-menu-surface--fixed',
    IS_OPEN_BELOW: 'mdc-menu-surface--is-open-below',
    OPEN: 'mdc-menu-surface--open',
    ROOT: 'mdc-menu-surface'
};
// tslint:disable:object-literal-sort-keys
var strings = {
    CLOSED_EVENT: 'MDCMenuSurface:closed',
    CLOSING_EVENT: 'MDCMenuSurface:closing',
    OPENED_EVENT: 'MDCMenuSurface:opened',
    FOCUSABLE_ELEMENTS: [
        'button:not(:disabled)',
        '[href]:not([aria-disabled="true"])',
        'input:not(:disabled)',
        'select:not(:disabled)',
        'textarea:not(:disabled)',
        '[tabindex]:not([tabindex="-1"]):not([aria-disabled="true"])', 
    ].join(', ')
};
// tslint:enable:object-literal-sort-keys
var numbers = {
    /** Total duration of menu-surface open animation. */ TRANSITION_OPEN_DURATION: 120,
    /** Total duration of menu-surface close animation. */ TRANSITION_CLOSE_DURATION: 75,
    /**
     * Margin left to the edge of the viewport when menu-surface is at maximum
     * possible height. Also used as a viewport margin.
     */ MARGIN_TO_EDGE: 32,
    /**
     * Ratio of anchor width to menu-surface width for switching from corner
     * positioning to center positioning.
     */ ANCHOR_TO_MENU_SURFACE_WIDTH_RATIO: 0.67,
    /**
     * Amount of time to wait before restoring focus when closing the menu
     * surface. This is important because if a touch event triggered the menu
     * close, and the subsequent mouse event occurs after focus is restored, then
     * the restored focus would be lost.
     */ TOUCH_EVENT_WAIT_MS: 30
};
/**
 * Enum for bits in the {@see Corner) bitmap.
 */ var CornerBit1;
(function(CornerBit) {
    CornerBit[CornerBit["BOTTOM"] = 1] = "BOTTOM";
    CornerBit[CornerBit["CENTER"] = 2] = "CENTER";
    CornerBit[CornerBit["RIGHT"] = 4] = "RIGHT";
    CornerBit[CornerBit["FLIP_RTL"] = 8] = "FLIP_RTL";
})(CornerBit1 || (CornerBit1 = {
}));
/**
 * Enum for representing an element corner for positioning the menu-surface.
 *
 * The START constants map to LEFT if element directionality is left
 * to right and RIGHT if the directionality is right to left.
 * Likewise END maps to RIGHT or LEFT depending on the directionality.
 */ var Corner1;
(function(Corner) {
    Corner[Corner["TOP_LEFT"] = 0] = "TOP_LEFT";
    Corner[Corner["TOP_RIGHT"] = 4] = "TOP_RIGHT";
    Corner[Corner["BOTTOM_LEFT"] = 1] = "BOTTOM_LEFT";
    Corner[Corner["BOTTOM_RIGHT"] = 5] = "BOTTOM_RIGHT";
    Corner[Corner["TOP_START"] = 8] = "TOP_START";
    Corner[Corner["TOP_END"] = 12] = "TOP_END";
    Corner[Corner["BOTTOM_START"] = 9] = "BOTTOM_START";
    Corner[Corner["BOTTOM_END"] = 13] = "BOTTOM_END";
})(Corner1 || (Corner1 = {
}));

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"03Bve":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "MDCMenu", ()=>MDCMenu1
);
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */ var _tslib = require("tslib");
var _component = require("@material/base/component");
var _ponyfill = require("@material/dom/ponyfill");
var _component1 = require("@material/list/component");
var _constants = require("@material/list/constants");
var _foundation = require("@material/list/foundation");
var _component2 = require("@material/menu-surface/component");
var _foundation1 = require("@material/menu-surface/foundation");
var _constants1 = require("./constants");
var _foundation2 = require("./foundation");
var MDCMenu1 = function(_super) {
    _tslib.__extends(MDCMenu, _super);
    function MDCMenu() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MDCMenu.attachTo = function(root) {
        return new MDCMenu(root);
    };
    MDCMenu.prototype.initialize = function(menuSurfaceFactory, listFactory) {
        if (menuSurfaceFactory === void 0) menuSurfaceFactory = function(el) {
            return new _component2.MDCMenuSurface(el);
        };
        if (listFactory === void 0) listFactory = function(el) {
            return new _component1.MDCList(el);
        };
        this.menuSurfaceFactory = menuSurfaceFactory;
        this.listFactory = listFactory;
    };
    MDCMenu.prototype.initialSyncWithDOM = function() {
        var _this = this;
        this.menuSurface = this.menuSurfaceFactory(this.root);
        var list = this.root.querySelector(_constants1.strings.LIST_SELECTOR);
        if (list) {
            this.list = this.listFactory(list);
            this.list.wrapFocus = true;
        } else this.list = null;
        this.handleKeydown = function(evt) {
            _this.foundation.handleKeydown(evt);
        };
        this.handleItemAction = function(evt) {
            _this.foundation.handleItemAction(_this.items[evt.detail.index]);
        };
        this.handleMenuSurfaceOpened = function() {
            _this.foundation.handleMenuSurfaceOpened();
        };
        this.menuSurface.listen(_foundation1.MDCMenuSurfaceFoundation.strings.OPENED_EVENT, this.handleMenuSurfaceOpened);
        this.listen('keydown', this.handleKeydown);
        this.listen(_foundation.MDCListFoundation.strings.ACTION_EVENT, this.handleItemAction);
    };
    MDCMenu.prototype.destroy = function() {
        if (this.list) this.list.destroy();
        this.menuSurface.destroy();
        this.menuSurface.unlisten(_foundation1.MDCMenuSurfaceFoundation.strings.OPENED_EVENT, this.handleMenuSurfaceOpened);
        this.unlisten('keydown', this.handleKeydown);
        this.unlisten(_foundation.MDCListFoundation.strings.ACTION_EVENT, this.handleItemAction);
        _super.prototype.destroy.call(this);
    };
    Object.defineProperty(MDCMenu.prototype, "open", {
        get: function() {
            return this.menuSurface.isOpen();
        },
        set: function(value) {
            if (value) this.menuSurface.open();
            else this.menuSurface.close();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCMenu.prototype, "wrapFocus", {
        get: function() {
            return this.list ? this.list.wrapFocus : false;
        },
        set: function(value) {
            if (this.list) this.list.wrapFocus = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCMenu.prototype, "hasTypeahead", {
        /**
         * Sets whether the menu has typeahead functionality.
         * @param value Whether typeahead is enabled.
         */ set: function(value) {
            if (this.list) this.list.hasTypeahead = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCMenu.prototype, "typeaheadInProgress", {
        /**
         * @return Whether typeahead logic is currently matching some user prefix.
         */ get: function() {
            return this.list ? this.list.typeaheadInProgress : false;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Given the next desired character from the user, adds it to the typeahead
     * buffer. Then, attempts to find the next option matching the buffer. Wraps
     * around if at the end of options.
     *
     * @param nextChar The next character to add to the prefix buffer.
     * @param startingIndex The index from which to start matching. Only relevant
     *     when starting a new match sequence. To start a new match sequence,
     *     clear the buffer using `clearTypeaheadBuffer`, or wait for the buffer
     *     to clear after a set interval defined in list foundation. Defaults to
     *     the currently focused index.
     * @return The index of the matched item, or -1 if no match.
     */ MDCMenu.prototype.typeaheadMatchItem = function(nextChar, startingIndex) {
        if (this.list) return this.list.typeaheadMatchItem(nextChar, startingIndex);
        return -1;
    };
    /**
     * Layout the underlying list element in the case of any dynamic updates
     * to its structure.
     */ MDCMenu.prototype.layout = function() {
        if (this.list) this.list.layout();
    };
    Object.defineProperty(MDCMenu.prototype, "items", {
        /**
         * Return the items within the menu. Note that this only contains the set of elements within
         * the items container that are proper list items, and not supplemental / presentational DOM
         * elements.
         */ get: function() {
            return this.list ? this.list.listElements : [];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCMenu.prototype, "singleSelection", {
        /**
         * Turns on/off the underlying list's single selection mode. Used mainly
         * by select menu.
         *
         * @param singleSelection Whether to enable single selection mode.
         */ set: function(singleSelection) {
            if (this.list) this.list.singleSelection = singleSelection;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCMenu.prototype, "selectedIndex", {
        /**
         * Retrieves the selected index. Only applicable to select menus.
         * @return The selected index, which is a number for single selection and
         *     radio lists, and an array of numbers for checkbox lists.
         */ get: function() {
            return this.list ? this.list.selectedIndex : _constants.numbers.UNSET_INDEX;
        },
        /**
         * Sets the selected index of the list. Only applicable to select menus.
         * @param index The selected index, which is a number for single selection and
         *     radio lists, and an array of numbers for checkbox lists.
         */ set: function(index) {
            if (this.list) this.list.selectedIndex = index;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCMenu.prototype, "quickOpen", {
        set: function(quickOpen) {
            this.menuSurface.quickOpen = quickOpen;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Sets default focus state where the menu should focus every time when menu
     * is opened. Focuses the list root (`DefaultFocusState.LIST_ROOT`) element by
     * default.
     * @param focusState Default focus state.
     */ MDCMenu.prototype.setDefaultFocusState = function(focusState) {
        this.foundation.setDefaultFocusState(focusState);
    };
    /**
     * @param corner Default anchor corner alignment of top-left menu corner.
     */ MDCMenu.prototype.setAnchorCorner = function(corner) {
        this.menuSurface.setAnchorCorner(corner);
    };
    MDCMenu.prototype.setAnchorMargin = function(margin) {
        this.menuSurface.setAnchorMargin(margin);
    };
    /**
     * Sets the list item as the selected row at the specified index.
     * @param index Index of list item within menu.
     */ MDCMenu.prototype.setSelectedIndex = function(index) {
        this.foundation.setSelectedIndex(index);
    };
    /**
     * Sets the enabled state to isEnabled for the menu item at the given index.
     * @param index Index of the menu item
     * @param isEnabled The desired enabled state of the menu item.
     */ MDCMenu.prototype.setEnabled = function(index, isEnabled) {
        this.foundation.setEnabled(index, isEnabled);
    };
    /**
     * @return The item within the menu at the index specified.
     */ MDCMenu.prototype.getOptionByIndex = function(index) {
        var items = this.items;
        if (index < items.length) return this.items[index];
        else return null;
    };
    /**
     * @param index A menu item's index.
     * @return The primary text within the menu at the index specified.
     */ MDCMenu.prototype.getPrimaryTextAtIndex = function(index) {
        var item = this.getOptionByIndex(index);
        if (item && this.list) return this.list.getPrimaryText(item) || '';
        return '';
    };
    MDCMenu.prototype.setFixedPosition = function(isFixed) {
        this.menuSurface.setFixedPosition(isFixed);
    };
    MDCMenu.prototype.setIsHoisted = function(isHoisted) {
        this.menuSurface.setIsHoisted(isHoisted);
    };
    MDCMenu.prototype.setAbsolutePosition = function(x, y) {
        this.menuSurface.setAbsolutePosition(x, y);
    };
    /**
     * Sets the element that the menu-surface is anchored to.
     */ MDCMenu.prototype.setAnchorElement = function(element) {
        this.menuSurface.anchorElement = element;
    };
    MDCMenu.prototype.getDefaultFoundation = function() {
        var _this = this;
        // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
        // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
        // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
        var adapter = {
            addClassToElementAtIndex: function(index, className) {
                var list = _this.items;
                list[index].classList.add(className);
            },
            removeClassFromElementAtIndex: function(index, className) {
                var list = _this.items;
                list[index].classList.remove(className);
            },
            addAttributeToElementAtIndex: function(index, attr, value) {
                var list = _this.items;
                list[index].setAttribute(attr, value);
            },
            removeAttributeFromElementAtIndex: function(index, attr) {
                var list = _this.items;
                list[index].removeAttribute(attr);
            },
            getAttributeFromElementAtIndex: function(index, attr) {
                var list = _this.items;
                return list[index].getAttribute(attr);
            },
            elementContainsClass: function(element, className) {
                return element.classList.contains(className);
            },
            closeSurface: function(skipRestoreFocus) {
                _this.menuSurface.close(skipRestoreFocus);
            },
            getElementIndex: function(element) {
                return _this.items.indexOf(element);
            },
            notifySelected: function(evtData) {
                _this.emit(_constants1.strings.SELECTED_EVENT, {
                    index: evtData.index,
                    item: _this.items[evtData.index]
                });
            },
            getMenuItemCount: function() {
                return _this.items.length;
            },
            focusItemAtIndex: function(index) {
                _this.items[index].focus();
            },
            focusListRoot: function() {
                _this.root.querySelector(_constants1.strings.LIST_SELECTOR).focus();
            },
            isSelectableItemAtIndex: function(index) {
                return !!_ponyfill.closest(_this.items[index], "." + _constants1.cssClasses.MENU_SELECTION_GROUP);
            },
            getSelectedSiblingOfItemAtIndex: function(index) {
                var selectionGroupEl = _ponyfill.closest(_this.items[index], "." + _constants1.cssClasses.MENU_SELECTION_GROUP);
                var selectedItemEl = selectionGroupEl.querySelector("." + _constants1.cssClasses.MENU_SELECTED_LIST_ITEM);
                return selectedItemEl ? _this.items.indexOf(selectedItemEl) : -1;
            }
        };
        // tslint:enable:object-literal-sort-keys
        return new _foundation2.MDCMenuFoundation(adapter);
    };
    return MDCMenu;
}(_component.MDCComponent);

},{"tslib":"j55WF","@material/base/component":"4ISbx","@material/dom/ponyfill":"cB7q4","@material/list/component":"i9kG3","@material/list/constants":"6smap","@material/list/foundation":"cEKUg","@material/menu-surface/component":"bScxg","@material/menu-surface/foundation":"6LTC9","./constants":"fqDlq","./foundation":"3u17g","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"i9kG3":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "MDCList", ()=>MDCList1
);
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */ var _tslib = require("tslib");
var _component = require("@material/base/component");
var _ponyfill = require("@material/dom/ponyfill");
var _constants = require("./constants");
var _foundation = require("./foundation");
var MDCList1 = function(_super) {
    _tslib.__extends(MDCList, _super);
    function MDCList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MDCList.prototype, "vertical", {
        set: function(value) {
            this.foundation.setVerticalOrientation(value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCList.prototype, "listElements", {
        get: function() {
            return Array.from(this.root.querySelectorAll("." + this.classNameMap[_constants.cssClasses.LIST_ITEM_CLASS]));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCList.prototype, "wrapFocus", {
        set: function(value) {
            this.foundation.setWrapFocus(value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCList.prototype, "typeaheadInProgress", {
        /**
         * @return Whether typeahead is currently matching a user-specified prefix.
         */ get: function() {
            return this.foundation.isTypeaheadInProgress();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCList.prototype, "hasTypeahead", {
        /**
         * Sets whether typeahead functionality is enabled on the list.
         * @param hasTypeahead Whether typeahead is enabled.
         */ set: function(hasTypeahead) {
            this.foundation.setHasTypeahead(hasTypeahead);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCList.prototype, "singleSelection", {
        set: function(isSingleSelectionList) {
            this.foundation.setSingleSelection(isSingleSelectionList);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCList.prototype, "selectedIndex", {
        get: function() {
            return this.foundation.getSelectedIndex();
        },
        set: function(index) {
            this.foundation.setSelectedIndex(index);
        },
        enumerable: false,
        configurable: true
    });
    MDCList.attachTo = function(root) {
        return new MDCList(root);
    };
    MDCList.prototype.initialSyncWithDOM = function() {
        this.isEvolutionEnabled = _constants.evolutionAttribute in this.root.dataset;
        if (this.isEvolutionEnabled) this.classNameMap = _constants.evolutionClassNameMap;
        else if (_ponyfill.matches(this.root, _constants.strings.DEPRECATED_SELECTOR)) this.classNameMap = _constants.deprecatedClassNameMap;
        else this.classNameMap = Object.values(_constants.cssClasses).reduce(function(obj, className) {
            obj[className] = className;
            return obj;
        }, {
        });
        this.handleClick = this.handleClickEvent.bind(this);
        this.handleKeydown = this.handleKeydownEvent.bind(this);
        this.focusInEventListener = this.handleFocusInEvent.bind(this);
        this.focusOutEventListener = this.handleFocusOutEvent.bind(this);
        this.listen('keydown', this.handleKeydown);
        this.listen('click', this.handleClick);
        this.listen('focusin', this.focusInEventListener);
        this.listen('focusout', this.focusOutEventListener);
        this.layout();
        this.initializeListType();
        this.ensureFocusable();
    };
    MDCList.prototype.destroy = function() {
        this.unlisten('keydown', this.handleKeydown);
        this.unlisten('click', this.handleClick);
        this.unlisten('focusin', this.focusInEventListener);
        this.unlisten('focusout', this.focusOutEventListener);
    };
    MDCList.prototype.layout = function() {
        var direction = this.root.getAttribute(_constants.strings.ARIA_ORIENTATION);
        this.vertical = direction !== _constants.strings.ARIA_ORIENTATION_HORIZONTAL;
        var itemSelector = "." + this.classNameMap[_constants.cssClasses.LIST_ITEM_CLASS] + ":not([tabindex])";
        var childSelector = _constants.strings.FOCUSABLE_CHILD_ELEMENTS;
        // List items need to have at least tabindex=-1 to be focusable.
        var itemEls = this.root.querySelectorAll(itemSelector);
        if (itemEls.length) Array.prototype.forEach.call(itemEls, function(el) {
            el.setAttribute('tabindex', '-1');
        });
        // Child button/a elements are not tabbable until the list item is focused.
        var focusableChildEls = this.root.querySelectorAll(childSelector);
        if (focusableChildEls.length) Array.prototype.forEach.call(focusableChildEls, function(el) {
            el.setAttribute('tabindex', '-1');
        });
        if (this.isEvolutionEnabled) this.foundation.setUseSelectedAttribute(true);
        this.foundation.layout();
    };
    /**
     * Extracts the primary text from a list item.
     * @param item The list item element.
     * @return The primary text in the element.
     */ MDCList.prototype.getPrimaryText = function(item) {
        var _a;
        var primaryText = item.querySelector("." + this.classNameMap[_constants.cssClasses.LIST_ITEM_PRIMARY_TEXT_CLASS]);
        if (this.isEvolutionEnabled || primaryText) return (_a = primaryText === null || primaryText === void 0 ? void 0 : primaryText.textContent) !== null && _a !== void 0 ? _a : '';
        var singleLineText = item.querySelector("." + this.classNameMap[_constants.cssClasses.LIST_ITEM_TEXT_CLASS]);
        return singleLineText && singleLineText.textContent || '';
    };
    /**
     * Initialize selectedIndex value based on pre-selected list items.
     */ MDCList.prototype.initializeListType = function() {
        var _this = this;
        this.isInteractive = _ponyfill.matches(this.root, _constants.strings.ARIA_INTERACTIVE_ROLES_SELECTOR);
        if (this.isEvolutionEnabled && this.isInteractive) {
            var selection = Array.from(this.root.querySelectorAll(_constants.strings.SELECTED_ITEM_SELECTOR), function(listItem) {
                return _this.listElements.indexOf(listItem);
            });
            if (_ponyfill.matches(this.root, _constants.strings.ARIA_MULTI_SELECTABLE_SELECTOR)) this.selectedIndex = selection;
            else if (selection.length > 0) this.selectedIndex = selection[0];
            return;
        }
        var checkboxListItems = this.root.querySelectorAll(_constants.strings.ARIA_ROLE_CHECKBOX_SELECTOR);
        var radioSelectedListItem = this.root.querySelector(_constants.strings.ARIA_CHECKED_RADIO_SELECTOR);
        if (checkboxListItems.length) {
            var preselectedItems = this.root.querySelectorAll(_constants.strings.ARIA_CHECKED_CHECKBOX_SELECTOR);
            this.selectedIndex = Array.from(preselectedItems, function(listItem) {
                return _this.listElements.indexOf(listItem);
            });
        } else if (radioSelectedListItem) this.selectedIndex = this.listElements.indexOf(radioSelectedListItem);
    };
    /**
     * Updates the list item at itemIndex to the desired isEnabled state.
     * @param itemIndex Index of the list item
     * @param isEnabled Sets the list item to enabled or disabled.
     */ MDCList.prototype.setEnabled = function(itemIndex, isEnabled) {
        this.foundation.setEnabled(itemIndex, isEnabled);
    };
    /**
     * Given the next desired character from the user, adds it to the typeahead
     * buffer. Then, attempts to find the next option matching the buffer. Wraps
     * around if at the end of options.
     *
     * @param nextChar The next character to add to the prefix buffer.
     * @param startingIndex The index from which to start matching. Defaults to
     *     the currently focused index.
     * @return The index of the matched item.
     */ MDCList.prototype.typeaheadMatchItem = function(nextChar, startingIndex) {
        return this.foundation.typeaheadMatchItem(nextChar, startingIndex, /** skipFocus */ true);
    };
    MDCList.prototype.getDefaultFoundation = function() {
        var _this = this;
        // DO NOT INLINE this variable. For backward compatibility, foundations take
        // a Partial<MDCFooAdapter>. To ensure we don't accidentally omit any
        // methods, we need a separate, strongly typed adapter variable.
        var adapter = {
            addClassForElementIndex: function(index, className) {
                var element = _this.listElements[index];
                if (element) element.classList.add(_this.classNameMap[className]);
            },
            focusItemAtIndex: function(index) {
                var element = _this.listElements[index];
                if (element) element.focus();
            },
            getAttributeForElementIndex: function(index, attr) {
                return _this.listElements[index].getAttribute(attr);
            },
            getFocusedElementIndex: function() {
                return _this.listElements.indexOf(document.activeElement);
            },
            getListItemCount: function() {
                return _this.listElements.length;
            },
            getPrimaryTextAtIndex: function(index) {
                return _this.getPrimaryText(_this.listElements[index]);
            },
            hasCheckboxAtIndex: function(index) {
                var listItem = _this.listElements[index];
                return !!listItem.querySelector(_constants.strings.CHECKBOX_SELECTOR);
            },
            hasRadioAtIndex: function(index) {
                var listItem = _this.listElements[index];
                return !!listItem.querySelector(_constants.strings.RADIO_SELECTOR);
            },
            isCheckboxCheckedAtIndex: function(index) {
                var listItem = _this.listElements[index];
                var toggleEl = listItem.querySelector(_constants.strings.CHECKBOX_SELECTOR);
                return toggleEl.checked;
            },
            isFocusInsideList: function() {
                return _this.root !== document.activeElement && _this.root.contains(document.activeElement);
            },
            isRootFocused: function() {
                return document.activeElement === _this.root;
            },
            listItemAtIndexHasClass: function(index, className) {
                return _this.listElements[index].classList.contains(_this.classNameMap[className]);
            },
            notifyAction: function(index) {
                _this.emit(_constants.strings.ACTION_EVENT, {
                    index: index
                }, /** shouldBubble */ true);
            },
            removeClassForElementIndex: function(index, className) {
                var element = _this.listElements[index];
                if (element) element.classList.remove(_this.classNameMap[className]);
            },
            setAttributeForElementIndex: function(index, attr, value) {
                var element = _this.listElements[index];
                if (element) element.setAttribute(attr, value);
            },
            setCheckedCheckboxOrRadioAtIndex: function(index, isChecked) {
                var listItem = _this.listElements[index];
                var toggleEl = listItem.querySelector(_constants.strings.CHECKBOX_RADIO_SELECTOR);
                toggleEl.checked = isChecked;
                var event = document.createEvent('Event');
                event.initEvent('change', true, true);
                toggleEl.dispatchEvent(event);
            },
            setTabIndexForListItemChildren: function(listItemIndex, tabIndexValue) {
                var element = _this.listElements[listItemIndex];
                var selector = _constants.strings.CHILD_ELEMENTS_TO_TOGGLE_TABINDEX;
                Array.prototype.forEach.call(element.querySelectorAll(selector), function(el) {
                    el.setAttribute('tabindex', tabIndexValue);
                });
            }
        };
        return new _foundation.MDCListFoundation(adapter);
    };
    /**
     * Ensures that at least one item is focusable if the list is interactive and
     * doesn't specify a suitable tabindex.
     */ MDCList.prototype.ensureFocusable = function() {
        if (this.isEvolutionEnabled && this.isInteractive) {
            if (!this.root.querySelector("." + this.classNameMap[_constants.cssClasses.LIST_ITEM_CLASS] + "[tabindex=\"0\"]")) {
                var index = this.initialFocusIndex();
                if (index !== -1) this.listElements[index].tabIndex = 0;
            }
        }
    };
    MDCList.prototype.initialFocusIndex = function() {
        if (this.selectedIndex instanceof Array && this.selectedIndex.length > 0) return this.selectedIndex[0];
        if (typeof this.selectedIndex === 'number' && this.selectedIndex !== _constants.numbers.UNSET_INDEX) return this.selectedIndex;
        var el = this.root.querySelector("." + this.classNameMap[_constants.cssClasses.LIST_ITEM_CLASS] + ":not(." + this.classNameMap[_constants.cssClasses.LIST_ITEM_DISABLED_CLASS] + ")");
        if (el === null) return -1;
        return this.getListItemIndex(el);
    };
    /**
     * Used to figure out which list item this event is targetting. Or returns -1
     * if there is no list item
     */ MDCList.prototype.getListItemIndex = function(el) {
        var nearestParent = _ponyfill.closest(el, "." + this.classNameMap[_constants.cssClasses.LIST_ITEM_CLASS] + ", ." + this.classNameMap[_constants.cssClasses.ROOT]);
        // Get the index of the element if it is a list item.
        if (nearestParent && _ponyfill.matches(nearestParent, "." + this.classNameMap[_constants.cssClasses.LIST_ITEM_CLASS])) return this.listElements.indexOf(nearestParent);
        return -1;
    };
    /**
     * Used to figure out which element was clicked before sending the event to
     * the foundation.
     */ MDCList.prototype.handleFocusInEvent = function(evt) {
        var index = this.getListItemIndex(evt.target);
        this.foundation.handleFocusIn(index);
    };
    /**
     * Used to figure out which element was clicked before sending the event to
     * the foundation.
     */ MDCList.prototype.handleFocusOutEvent = function(evt) {
        var index = this.getListItemIndex(evt.target);
        this.foundation.handleFocusOut(index);
    };
    /**
     * Used to figure out which element was focused when keydown event occurred
     * before sending the event to the foundation.
     */ MDCList.prototype.handleKeydownEvent = function(evt) {
        var index = this.getListItemIndex(evt.target);
        var target = evt.target;
        this.foundation.handleKeydown(evt, target.classList.contains(this.classNameMap[_constants.cssClasses.LIST_ITEM_CLASS]), index);
    };
    /**
     * Used to figure out which element was clicked before sending the event to
     * the foundation.
     */ MDCList.prototype.handleClickEvent = function(evt) {
        var index = this.getListItemIndex(evt.target);
        var target = evt.target;
        // Toggle the checkbox only if it's not the target of the event, or the
        // checkbox will have 2 change events.
        var toggleCheckbox = !_ponyfill.matches(target, _constants.strings.CHECKBOX_RADIO_SELECTOR);
        this.foundation.handleClick(index, toggleCheckbox);
    };
    return MDCList;
}(_component.MDCComponent);

},{"tslib":"j55WF","@material/base/component":"4ISbx","@material/dom/ponyfill":"cB7q4","./constants":"6smap","./foundation":"cEKUg","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"6smap":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "strings", ()=>strings
);
parcelHelpers.export(exports, "cssClasses", ()=>cssClasses
);
parcelHelpers.export(exports, "numbers", ()=>numbers
);
parcelHelpers.export(exports, "deprecatedClassNameMap", ()=>deprecatedClassNameMap
);
parcelHelpers.export(exports, "evolutionAttribute", ()=>evolutionAttribute
);
parcelHelpers.export(exports, "evolutionClassNameMap", ()=>evolutionClassNameMap
);
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */ var _a, _b;
var cssClasses = {
    LIST_ITEM_ACTIVATED_CLASS: 'mdc-list-item--activated',
    LIST_ITEM_CLASS: 'mdc-list-item',
    LIST_ITEM_DISABLED_CLASS: 'mdc-list-item--disabled',
    LIST_ITEM_SELECTED_CLASS: 'mdc-list-item--selected',
    LIST_ITEM_TEXT_CLASS: 'mdc-list-item__text',
    LIST_ITEM_PRIMARY_TEXT_CLASS: 'mdc-list-item__primary-text',
    ROOT: 'mdc-list'
};
var evolutionClassNameMap = (_a = {
}, _a["" + cssClasses.LIST_ITEM_ACTIVATED_CLASS] = 'mdc-list-item--activated', _a["" + cssClasses.LIST_ITEM_CLASS] = 'mdc-list-item', _a["" + cssClasses.LIST_ITEM_DISABLED_CLASS] = 'mdc-list-item--disabled', _a["" + cssClasses.LIST_ITEM_SELECTED_CLASS] = 'mdc-list-item--selected', _a["" + cssClasses.LIST_ITEM_PRIMARY_TEXT_CLASS] = 'mdc-list-item__primary-text', _a["" + cssClasses.ROOT] = 'mdc-list', _a);
var deprecatedClassNameMap = (_b = {
}, _b["" + cssClasses.LIST_ITEM_ACTIVATED_CLASS] = 'mdc-deprecated-list-item--activated', _b["" + cssClasses.LIST_ITEM_CLASS] = 'mdc-deprecated-list-item', _b["" + cssClasses.LIST_ITEM_DISABLED_CLASS] = 'mdc-deprecated-list-item--disabled', _b["" + cssClasses.LIST_ITEM_SELECTED_CLASS] = 'mdc-deprecated-list-item--selected', _b["" + cssClasses.LIST_ITEM_TEXT_CLASS] = 'mdc-deprecated-list-item__text', _b["" + cssClasses.LIST_ITEM_PRIMARY_TEXT_CLASS] = 'mdc-deprecated-list-item__primary-text', _b["" + cssClasses.ROOT] = 'mdc-deprecated-list', _b);
var strings = {
    ACTION_EVENT: 'MDCList:action',
    ARIA_CHECKED: 'aria-checked',
    ARIA_CHECKED_CHECKBOX_SELECTOR: '[role="checkbox"][aria-checked="true"]',
    ARIA_CHECKED_RADIO_SELECTOR: '[role="radio"][aria-checked="true"]',
    ARIA_CURRENT: 'aria-current',
    ARIA_DISABLED: 'aria-disabled',
    ARIA_ORIENTATION: 'aria-orientation',
    ARIA_ORIENTATION_HORIZONTAL: 'horizontal',
    ARIA_ROLE_CHECKBOX_SELECTOR: '[role="checkbox"]',
    ARIA_SELECTED: 'aria-selected',
    ARIA_INTERACTIVE_ROLES_SELECTOR: '[role="listbox"], [role="menu"]',
    ARIA_MULTI_SELECTABLE_SELECTOR: '[aria-multiselectable="true"]',
    CHECKBOX_RADIO_SELECTOR: 'input[type="checkbox"], input[type="radio"]',
    CHECKBOX_SELECTOR: 'input[type="checkbox"]',
    CHILD_ELEMENTS_TO_TOGGLE_TABINDEX: "\n    ." + cssClasses.LIST_ITEM_CLASS + " button:not(:disabled),\n    ." + cssClasses.LIST_ITEM_CLASS + " a,\n    ." + deprecatedClassNameMap[cssClasses.LIST_ITEM_CLASS] + " button:not(:disabled),\n    ." + deprecatedClassNameMap[cssClasses.LIST_ITEM_CLASS] + " a\n  ",
    DEPRECATED_SELECTOR: '.mdc-deprecated-list',
    FOCUSABLE_CHILD_ELEMENTS: "\n    ." + cssClasses.LIST_ITEM_CLASS + " button:not(:disabled),\n    ." + cssClasses.LIST_ITEM_CLASS + " a,\n    ." + cssClasses.LIST_ITEM_CLASS + " input[type=\"radio\"]:not(:disabled),\n    ." + cssClasses.LIST_ITEM_CLASS + " input[type=\"checkbox\"]:not(:disabled),\n    ." + deprecatedClassNameMap[cssClasses.LIST_ITEM_CLASS] + " button:not(:disabled),\n    ." + deprecatedClassNameMap[cssClasses.LIST_ITEM_CLASS] + " a,\n    ." + deprecatedClassNameMap[cssClasses.LIST_ITEM_CLASS] + " input[type=\"radio\"]:not(:disabled),\n    ." + deprecatedClassNameMap[cssClasses.LIST_ITEM_CLASS] + " input[type=\"checkbox\"]:not(:disabled)\n  ",
    RADIO_SELECTOR: 'input[type="radio"]',
    SELECTED_ITEM_SELECTOR: '[aria-selected="true"], [aria-current="true"]'
};
var numbers = {
    UNSET_INDEX: -1,
    TYPEAHEAD_BUFFER_CLEAR_TIMEOUT_MS: 300
};
var evolutionAttribute = 'evolution';

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"cEKUg":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "MDCListFoundation", ()=>MDCListFoundation1
);
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */ var _tslib = require("tslib");
var _foundation = require("@material/base/foundation");
var _keyboard = require("@material/dom/keyboard");
var _constants = require("./constants");
var _events = require("./events");
var _typeahead = require("./typeahead");
function isNumberArray(selectedIndex) {
    return selectedIndex instanceof Array;
}
var MDCListFoundation1 = function(_super) {
    _tslib.__extends(MDCListFoundation, _super);
    function MDCListFoundation(adapter) {
        var _this = _super.call(this, _tslib.__assign(_tslib.__assign({
        }, MDCListFoundation.defaultAdapter), adapter)) || this;
        _this.wrapFocus = false;
        _this.isVertical = true;
        _this.isSingleSelectionList = false;
        _this.selectedIndex = _constants.numbers.UNSET_INDEX;
        _this.focusedItemIndex = _constants.numbers.UNSET_INDEX;
        _this.useActivatedClass = false;
        _this.useSelectedAttr = false;
        _this.ariaCurrentAttrValue = null;
        _this.isCheckboxList = false;
        _this.isRadioList = false;
        _this.hasTypeahead = false;
        // Transiently holds current typeahead prefix from user.
        _this.typeaheadState = _typeahead.initState();
        _this.sortedIndexByFirstChar = new Map();
        return _this;
    }
    Object.defineProperty(MDCListFoundation, "strings", {
        get: function() {
            return _constants.strings;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCListFoundation, "cssClasses", {
        get: function() {
            return _constants.cssClasses;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCListFoundation, "numbers", {
        get: function() {
            return _constants.numbers;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCListFoundation, "defaultAdapter", {
        get: function() {
            return {
                addClassForElementIndex: function() {
                    return undefined;
                },
                focusItemAtIndex: function() {
                    return undefined;
                },
                getAttributeForElementIndex: function() {
                    return null;
                },
                getFocusedElementIndex: function() {
                    return 0;
                },
                getListItemCount: function() {
                    return 0;
                },
                hasCheckboxAtIndex: function() {
                    return false;
                },
                hasRadioAtIndex: function() {
                    return false;
                },
                isCheckboxCheckedAtIndex: function() {
                    return false;
                },
                isFocusInsideList: function() {
                    return false;
                },
                isRootFocused: function() {
                    return false;
                },
                listItemAtIndexHasClass: function() {
                    return false;
                },
                notifyAction: function() {
                    return undefined;
                },
                removeClassForElementIndex: function() {
                    return undefined;
                },
                setAttributeForElementIndex: function() {
                    return undefined;
                },
                setCheckedCheckboxOrRadioAtIndex: function() {
                    return undefined;
                },
                setTabIndexForListItemChildren: function() {
                    return undefined;
                },
                getPrimaryTextAtIndex: function() {
                    return '';
                }
            };
        },
        enumerable: false,
        configurable: true
    });
    MDCListFoundation.prototype.layout = function() {
        if (this.adapter.getListItemCount() === 0) return;
        // TODO(b/172274142): consider all items when determining the list's type.
        if (this.adapter.hasCheckboxAtIndex(0)) this.isCheckboxList = true;
        else if (this.adapter.hasRadioAtIndex(0)) this.isRadioList = true;
        else this.maybeInitializeSingleSelection();
        if (this.hasTypeahead) this.sortedIndexByFirstChar = this.typeaheadInitSortedIndex();
    };
    /** Returns the index of the item that was last focused. */ MDCListFoundation.prototype.getFocusedItemIndex = function() {
        return this.focusedItemIndex;
    };
    /** Toggles focus wrapping with keyboard navigation. */ MDCListFoundation.prototype.setWrapFocus = function(value) {
        this.wrapFocus = value;
    };
    /**
     * Toggles orientation direction for keyboard navigation (true for vertical,
     * false for horizontal).
     */ MDCListFoundation.prototype.setVerticalOrientation = function(value) {
        this.isVertical = value;
    };
    /** Toggles single-selection behavior. */ MDCListFoundation.prototype.setSingleSelection = function(value) {
        this.isSingleSelectionList = value;
        if (value) {
            this.maybeInitializeSingleSelection();
            this.selectedIndex = this.getSelectedIndexFromDOM();
        }
    };
    /**
     * Automatically determines whether the list is single selection list. If so,
     * initializes the internal state to match the selected item.
     */ MDCListFoundation.prototype.maybeInitializeSingleSelection = function() {
        var selectedItemIndex = this.getSelectedIndexFromDOM();
        if (selectedItemIndex === _constants.numbers.UNSET_INDEX) return;
        var hasActivatedClass = this.adapter.listItemAtIndexHasClass(selectedItemIndex, _constants.cssClasses.LIST_ITEM_ACTIVATED_CLASS);
        if (hasActivatedClass) this.setUseActivatedClass(true);
        this.isSingleSelectionList = true;
        this.selectedIndex = selectedItemIndex;
    };
    /** @return Index of the first selected item based on the DOM state. */ MDCListFoundation.prototype.getSelectedIndexFromDOM = function() {
        var selectedIndex = _constants.numbers.UNSET_INDEX;
        var listItemsCount = this.adapter.getListItemCount();
        for(var i = 0; i < listItemsCount; i++){
            var hasSelectedClass = this.adapter.listItemAtIndexHasClass(i, _constants.cssClasses.LIST_ITEM_SELECTED_CLASS);
            var hasActivatedClass = this.adapter.listItemAtIndexHasClass(i, _constants.cssClasses.LIST_ITEM_ACTIVATED_CLASS);
            if (!(hasSelectedClass || hasActivatedClass)) continue;
            selectedIndex = i;
            break;
        }
        return selectedIndex;
    };
    /**
     * Sets whether typeahead is enabled on the list.
     * @param hasTypeahead Whether typeahead is enabled.
     */ MDCListFoundation.prototype.setHasTypeahead = function(hasTypeahead) {
        this.hasTypeahead = hasTypeahead;
        if (hasTypeahead) this.sortedIndexByFirstChar = this.typeaheadInitSortedIndex();
    };
    /**
     * @return Whether typeahead is currently matching a user-specified prefix.
     */ MDCListFoundation.prototype.isTypeaheadInProgress = function() {
        return this.hasTypeahead && _typeahead.isTypingInProgress(this.typeaheadState);
    };
    /** Toggle use of the "activated" CSS class. */ MDCListFoundation.prototype.setUseActivatedClass = function(useActivated) {
        this.useActivatedClass = useActivated;
    };
    /**
     * Toggles use of the selected attribute (true for aria-selected, false for
     * aria-checked).
     */ MDCListFoundation.prototype.setUseSelectedAttribute = function(useSelected) {
        this.useSelectedAttr = useSelected;
    };
    MDCListFoundation.prototype.getSelectedIndex = function() {
        return this.selectedIndex;
    };
    MDCListFoundation.prototype.setSelectedIndex = function(index, _a) {
        var _b = _a === void 0 ? {
        } : _a, forceUpdate = _b.forceUpdate;
        if (!this.isIndexValid(index)) return;
        if (this.isCheckboxList) this.setCheckboxAtIndex(index);
        else if (this.isRadioList) this.setRadioAtIndex(index);
        else this.setSingleSelectionAtIndex(index, {
            forceUpdate: forceUpdate
        });
    };
    /**
     * Focus in handler for the list items.
     */ MDCListFoundation.prototype.handleFocusIn = function(listItemIndex) {
        if (listItemIndex >= 0) {
            this.focusedItemIndex = listItemIndex;
            this.adapter.setAttributeForElementIndex(listItemIndex, 'tabindex', '0');
            this.adapter.setTabIndexForListItemChildren(listItemIndex, '0');
        }
    };
    /**
     * Focus out handler for the list items.
     */ MDCListFoundation.prototype.handleFocusOut = function(listItemIndex) {
        var _this = this;
        if (listItemIndex >= 0) {
            this.adapter.setAttributeForElementIndex(listItemIndex, 'tabindex', '-1');
            this.adapter.setTabIndexForListItemChildren(listItemIndex, '-1');
        }
        /**
         * Between Focusout & Focusin some browsers do not have focus on any
         * element. Setting a delay to wait till the focus is moved to next element.
         */ setTimeout(function() {
            if (!_this.adapter.isFocusInsideList()) _this.setTabindexToFirstSelectedOrFocusedItem();
        }, 0);
    };
    /**
     * Key handler for the list.
     */ MDCListFoundation.prototype.handleKeydown = function(event, isRootListItem, listItemIndex) {
        var _this = this;
        var isArrowLeft = _keyboard.normalizeKey(event) === 'ArrowLeft';
        var isArrowUp = _keyboard.normalizeKey(event) === 'ArrowUp';
        var isArrowRight = _keyboard.normalizeKey(event) === 'ArrowRight';
        var isArrowDown = _keyboard.normalizeKey(event) === 'ArrowDown';
        var isHome = _keyboard.normalizeKey(event) === 'Home';
        var isEnd = _keyboard.normalizeKey(event) === 'End';
        var isEnter = _keyboard.normalizeKey(event) === 'Enter';
        var isSpace = _keyboard.normalizeKey(event) === 'Spacebar';
        // Have to check both upper and lower case, because having caps lock on
        // affects the value.
        var isLetterA = event.key === 'A' || event.key === 'a';
        if (this.adapter.isRootFocused()) {
            if (isArrowUp || isEnd) {
                event.preventDefault();
                this.focusLastElement();
            } else if (isArrowDown || isHome) {
                event.preventDefault();
                this.focusFirstElement();
            }
            if (this.hasTypeahead) {
                var handleKeydownOpts = {
                    event: event,
                    focusItemAtIndex: function(index) {
                        _this.focusItemAtIndex(index);
                    },
                    focusedItemIndex: -1,
                    isTargetListItem: isRootListItem,
                    sortedIndexByFirstChar: this.sortedIndexByFirstChar,
                    isItemAtIndexDisabled: function(index) {
                        return _this.adapter.listItemAtIndexHasClass(index, _constants.cssClasses.LIST_ITEM_DISABLED_CLASS);
                    }
                };
                _typeahead.handleKeydown(handleKeydownOpts, this.typeaheadState);
            }
            return;
        }
        var currentIndex = this.adapter.getFocusedElementIndex();
        if (currentIndex === -1) {
            currentIndex = listItemIndex;
            if (currentIndex < 0) // If this event doesn't have a mdc-list-item ancestor from the
            // current list (not from a sublist), return early.
            return;
        }
        if (this.isVertical && isArrowDown || !this.isVertical && isArrowRight) {
            _events.preventDefaultEvent(event);
            this.focusNextElement(currentIndex);
        } else if (this.isVertical && isArrowUp || !this.isVertical && isArrowLeft) {
            _events.preventDefaultEvent(event);
            this.focusPrevElement(currentIndex);
        } else if (isHome) {
            _events.preventDefaultEvent(event);
            this.focusFirstElement();
        } else if (isEnd) {
            _events.preventDefaultEvent(event);
            this.focusLastElement();
        } else if (isLetterA && event.ctrlKey && this.isCheckboxList) {
            event.preventDefault();
            this.toggleAll(this.selectedIndex === _constants.numbers.UNSET_INDEX ? [] : this.selectedIndex);
        } else if (isEnter || isSpace) {
            if (isRootListItem) {
                // Return early if enter key is pressed on anchor element which triggers
                // synthetic MouseEvent event.
                var target = event.target;
                if (target && target.tagName === 'A' && isEnter) return;
                _events.preventDefaultEvent(event);
                if (this.adapter.listItemAtIndexHasClass(currentIndex, _constants.cssClasses.LIST_ITEM_DISABLED_CLASS)) return;
                if (!this.isTypeaheadInProgress()) {
                    if (this.isSelectableList()) this.setSelectedIndexOnAction(currentIndex);
                    this.adapter.notifyAction(currentIndex);
                }
            }
        }
        if (this.hasTypeahead) {
            var handleKeydownOpts = {
                event: event,
                focusItemAtIndex: function(index) {
                    _this.focusItemAtIndex(index);
                },
                focusedItemIndex: this.focusedItemIndex,
                isTargetListItem: isRootListItem,
                sortedIndexByFirstChar: this.sortedIndexByFirstChar,
                isItemAtIndexDisabled: function(index) {
                    return _this.adapter.listItemAtIndexHasClass(index, _constants.cssClasses.LIST_ITEM_DISABLED_CLASS);
                }
            };
            _typeahead.handleKeydown(handleKeydownOpts, this.typeaheadState);
        }
    };
    /**
     * Click handler for the list.
     */ MDCListFoundation.prototype.handleClick = function(index, toggleCheckbox) {
        if (index === _constants.numbers.UNSET_INDEX) return;
        if (this.adapter.listItemAtIndexHasClass(index, _constants.cssClasses.LIST_ITEM_DISABLED_CLASS)) return;
        if (this.isSelectableList()) this.setSelectedIndexOnAction(index, toggleCheckbox);
        this.adapter.notifyAction(index);
    };
    /**
     * Focuses the next element on the list.
     */ MDCListFoundation.prototype.focusNextElement = function(index) {
        var count = this.adapter.getListItemCount();
        var nextIndex = index + 1;
        if (nextIndex >= count) {
            if (this.wrapFocus) nextIndex = 0;
            else // Return early because last item is already focused.
            return index;
        }
        this.focusItemAtIndex(nextIndex);
        return nextIndex;
    };
    /**
     * Focuses the previous element on the list.
     */ MDCListFoundation.prototype.focusPrevElement = function(index) {
        var prevIndex = index - 1;
        if (prevIndex < 0) {
            if (this.wrapFocus) prevIndex = this.adapter.getListItemCount() - 1;
            else // Return early because first item is already focused.
            return index;
        }
        this.focusItemAtIndex(prevIndex);
        return prevIndex;
    };
    MDCListFoundation.prototype.focusFirstElement = function() {
        this.focusItemAtIndex(0);
        return 0;
    };
    MDCListFoundation.prototype.focusLastElement = function() {
        var lastIndex = this.adapter.getListItemCount() - 1;
        this.focusItemAtIndex(lastIndex);
        return lastIndex;
    };
    MDCListFoundation.prototype.focusInitialElement = function() {
        var initialIndex = this.getFirstSelectedOrFocusedItemIndex();
        this.focusItemAtIndex(initialIndex);
        return initialIndex;
    };
    /**
     * @param itemIndex Index of the list item
     * @param isEnabled Sets the list item to enabled or disabled.
     */ MDCListFoundation.prototype.setEnabled = function(itemIndex, isEnabled) {
        if (!this.isIndexValid(itemIndex)) return;
        if (isEnabled) {
            this.adapter.removeClassForElementIndex(itemIndex, _constants.cssClasses.LIST_ITEM_DISABLED_CLASS);
            this.adapter.setAttributeForElementIndex(itemIndex, _constants.strings.ARIA_DISABLED, 'false');
        } else {
            this.adapter.addClassForElementIndex(itemIndex, _constants.cssClasses.LIST_ITEM_DISABLED_CLASS);
            this.adapter.setAttributeForElementIndex(itemIndex, _constants.strings.ARIA_DISABLED, 'true');
        }
    };
    MDCListFoundation.prototype.setSingleSelectionAtIndex = function(index, _a) {
        var _b = _a === void 0 ? {
        } : _a, forceUpdate = _b.forceUpdate;
        if (this.selectedIndex === index && !forceUpdate) return;
        var selectedClassName = _constants.cssClasses.LIST_ITEM_SELECTED_CLASS;
        if (this.useActivatedClass) selectedClassName = _constants.cssClasses.LIST_ITEM_ACTIVATED_CLASS;
        if (this.selectedIndex !== _constants.numbers.UNSET_INDEX) this.adapter.removeClassForElementIndex(this.selectedIndex, selectedClassName);
        this.setAriaForSingleSelectionAtIndex(index);
        this.setTabindexAtIndex(index);
        if (index !== _constants.numbers.UNSET_INDEX) this.adapter.addClassForElementIndex(index, selectedClassName);
        this.selectedIndex = index;
    };
    /**
     * Sets aria attribute for single selection at given index.
     */ MDCListFoundation.prototype.setAriaForSingleSelectionAtIndex = function(index) {
        // Detect the presence of aria-current and get the value only during list
        // initialization when it is in unset state.
        if (this.selectedIndex === _constants.numbers.UNSET_INDEX) this.ariaCurrentAttrValue = this.adapter.getAttributeForElementIndex(index, _constants.strings.ARIA_CURRENT);
        var isAriaCurrent = this.ariaCurrentAttrValue !== null;
        var ariaAttribute = isAriaCurrent ? _constants.strings.ARIA_CURRENT : _constants.strings.ARIA_SELECTED;
        if (this.selectedIndex !== _constants.numbers.UNSET_INDEX) this.adapter.setAttributeForElementIndex(this.selectedIndex, ariaAttribute, 'false');
        if (index !== _constants.numbers.UNSET_INDEX) {
            var ariaAttributeValue = isAriaCurrent ? this.ariaCurrentAttrValue : 'true';
            this.adapter.setAttributeForElementIndex(index, ariaAttribute, ariaAttributeValue);
        }
    };
    /**
     * Returns the attribute to use for indicating selection status.
     */ MDCListFoundation.prototype.getSelectionAttribute = function() {
        return this.useSelectedAttr ? _constants.strings.ARIA_SELECTED : _constants.strings.ARIA_CHECKED;
    };
    /**
     * Toggles radio at give index. Radio doesn't change the checked state if it
     * is already checked.
     */ MDCListFoundation.prototype.setRadioAtIndex = function(index) {
        var selectionAttribute = this.getSelectionAttribute();
        this.adapter.setCheckedCheckboxOrRadioAtIndex(index, true);
        if (this.selectedIndex !== _constants.numbers.UNSET_INDEX) this.adapter.setAttributeForElementIndex(this.selectedIndex, selectionAttribute, 'false');
        this.adapter.setAttributeForElementIndex(index, selectionAttribute, 'true');
        this.selectedIndex = index;
    };
    MDCListFoundation.prototype.setCheckboxAtIndex = function(index) {
        var selectionAttribute = this.getSelectionAttribute();
        for(var i = 0; i < this.adapter.getListItemCount(); i++){
            var isChecked = false;
            if (index.indexOf(i) >= 0) isChecked = true;
            this.adapter.setCheckedCheckboxOrRadioAtIndex(i, isChecked);
            this.adapter.setAttributeForElementIndex(i, selectionAttribute, isChecked ? 'true' : 'false');
        }
        this.selectedIndex = index;
    };
    MDCListFoundation.prototype.setTabindexAtIndex = function(index) {
        if (this.focusedItemIndex === _constants.numbers.UNSET_INDEX && index !== 0) // If some list item was selected set first list item's tabindex to -1.
        // Generally, tabindex is set to 0 on first list item of list that has no
        // preselected items.
        this.adapter.setAttributeForElementIndex(0, 'tabindex', '-1');
        else if (this.focusedItemIndex >= 0 && this.focusedItemIndex !== index) this.adapter.setAttributeForElementIndex(this.focusedItemIndex, 'tabindex', '-1');
        // Set the previous selection's tabindex to -1. We need this because
        // in selection menus that are not visible, programmatically setting an
        // option will not change focus but will change where tabindex should be 0.
        if (!(this.selectedIndex instanceof Array) && this.selectedIndex !== index) this.adapter.setAttributeForElementIndex(this.selectedIndex, 'tabindex', '-1');
        if (index !== _constants.numbers.UNSET_INDEX) this.adapter.setAttributeForElementIndex(index, 'tabindex', '0');
    };
    /**
     * @return Return true if it is single selectin list, checkbox list or radio
     *     list.
     */ MDCListFoundation.prototype.isSelectableList = function() {
        return this.isSingleSelectionList || this.isCheckboxList || this.isRadioList;
    };
    MDCListFoundation.prototype.setTabindexToFirstSelectedOrFocusedItem = function() {
        var targetIndex = this.getFirstSelectedOrFocusedItemIndex();
        this.setTabindexAtIndex(targetIndex);
    };
    MDCListFoundation.prototype.getFirstSelectedOrFocusedItemIndex = function() {
        // Action lists retain focus on the most recently focused item.
        if (!this.isSelectableList()) return Math.max(this.focusedItemIndex, 0);
        // Single-selection lists focus the selected item.
        if (typeof this.selectedIndex === 'number' && this.selectedIndex !== _constants.numbers.UNSET_INDEX) return this.selectedIndex;
        // Multiple-selection lists focus the first selected item.
        if (isNumberArray(this.selectedIndex) && this.selectedIndex.length > 0) return this.selectedIndex.reduce(function(minIndex, currentIndex) {
            return Math.min(minIndex, currentIndex);
        });
        // Selection lists without a selection focus the first item.
        return 0;
    };
    MDCListFoundation.prototype.isIndexValid = function(index) {
        var _this = this;
        if (index instanceof Array) {
            if (!this.isCheckboxList) throw new Error('MDCListFoundation: Array of index is only supported for checkbox based list');
            if (index.length === 0) return true;
            else return index.some(function(i) {
                return _this.isIndexInRange(i);
            });
        } else if (typeof index === 'number') {
            if (this.isCheckboxList) throw new Error("MDCListFoundation: Expected array of index for checkbox based list but got number: " + index);
            return this.isIndexInRange(index) || this.isSingleSelectionList && index === _constants.numbers.UNSET_INDEX;
        } else return false;
    };
    MDCListFoundation.prototype.isIndexInRange = function(index) {
        var listSize = this.adapter.getListItemCount();
        return index >= 0 && index < listSize;
    };
    /**
     * Sets selected index on user action, toggles checkbox / radio based on
     * toggleCheckbox value. User interaction should not toggle list item(s) when
     * disabled.
     */ MDCListFoundation.prototype.setSelectedIndexOnAction = function(index, toggleCheckbox) {
        if (toggleCheckbox === void 0) toggleCheckbox = true;
        if (this.isCheckboxList) this.toggleCheckboxAtIndex(index, toggleCheckbox);
        else this.setSelectedIndex(index);
    };
    MDCListFoundation.prototype.toggleCheckboxAtIndex = function(index, toggleCheckbox) {
        var selectionAttribute = this.getSelectionAttribute();
        var isChecked = this.adapter.isCheckboxCheckedAtIndex(index);
        if (toggleCheckbox) {
            isChecked = !isChecked;
            this.adapter.setCheckedCheckboxOrRadioAtIndex(index, isChecked);
        }
        this.adapter.setAttributeForElementIndex(index, selectionAttribute, isChecked ? 'true' : 'false');
        // If none of the checkbox items are selected and selectedIndex is not
        // initialized then provide a default value.
        var selectedIndexes = this.selectedIndex === _constants.numbers.UNSET_INDEX ? [] : this.selectedIndex.slice();
        if (isChecked) selectedIndexes.push(index);
        else selectedIndexes = selectedIndexes.filter(function(i) {
            return i !== index;
        });
        this.selectedIndex = selectedIndexes;
    };
    MDCListFoundation.prototype.focusItemAtIndex = function(index) {
        this.adapter.focusItemAtIndex(index);
        this.focusedItemIndex = index;
    };
    MDCListFoundation.prototype.toggleAll = function(currentlySelectedIndexes) {
        var count = this.adapter.getListItemCount();
        // If all items are selected, deselect everything.
        if (currentlySelectedIndexes.length === count) this.setCheckboxAtIndex([]);
        else {
            // Otherwise select all enabled options.
            var allIndexes = [];
            for(var i = 0; i < count; i++)if (!this.adapter.listItemAtIndexHasClass(i, _constants.cssClasses.LIST_ITEM_DISABLED_CLASS) || currentlySelectedIndexes.indexOf(i) > -1) allIndexes.push(i);
            this.setCheckboxAtIndex(allIndexes);
        }
    };
    /**
     * Given the next desired character from the user, adds it to the typeahead
     * buffer. Then, attempts to find the next option matching the buffer. Wraps
     * around if at the end of options.
     *
     * @param nextChar The next character to add to the prefix buffer.
     * @param startingIndex The index from which to start matching. Only relevant
     *     when starting a new match sequence. To start a new match sequence,
     *     clear the buffer using `clearTypeaheadBuffer`, or wait for the buffer
     *     to clear after a set interval defined in list foundation. Defaults to
     *     the currently focused index.
     * @return The index of the matched item, or -1 if no match.
     */ MDCListFoundation.prototype.typeaheadMatchItem = function(nextChar, startingIndex, skipFocus) {
        var _this = this;
        if (skipFocus === void 0) skipFocus = false;
        var opts = {
            focusItemAtIndex: function(index) {
                _this.focusItemAtIndex(index);
            },
            focusedItemIndex: startingIndex ? startingIndex : this.focusedItemIndex,
            nextChar: nextChar,
            sortedIndexByFirstChar: this.sortedIndexByFirstChar,
            skipFocus: skipFocus,
            isItemAtIndexDisabled: function(index) {
                return _this.adapter.listItemAtIndexHasClass(index, _constants.cssClasses.LIST_ITEM_DISABLED_CLASS);
            }
        };
        return _typeahead.matchItem(opts, this.typeaheadState);
    };
    /**
     * Initializes the MDCListTextAndIndex data structure by indexing the current
     * list items by primary text.
     *
     * @return The primary texts of all the list items sorted by first character.
     */ MDCListFoundation.prototype.typeaheadInitSortedIndex = function() {
        return _typeahead.initSortedIndex(this.adapter.getListItemCount(), this.adapter.getPrimaryTextAtIndex);
    };
    /**
     * Clears the typeahead buffer.
     */ MDCListFoundation.prototype.clearTypeaheadBuffer = function() {
        _typeahead.clearBuffer(this.typeaheadState);
    };
    return MDCListFoundation;
}(_foundation.MDCFoundation);
exports.default = MDCListFoundation1;

},{"tslib":"j55WF","@material/base/foundation":"6nwGh","@material/dom/keyboard":"f68aW","./constants":"6smap","./events":"ad7r5","./typeahead":"kkPu7","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"f68aW":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "KEY", ()=>KEY
);
/**
 * normalizeKey returns the normalized string for a navigational action.
 */ parcelHelpers.export(exports, "normalizeKey", ()=>normalizeKey
);
/**
 * isNavigationEvent returns whether the event is a navigation event
 */ parcelHelpers.export(exports, "isNavigationEvent", ()=>isNavigationEvent
);
var KEY = {
    UNKNOWN: 'Unknown',
    BACKSPACE: 'Backspace',
    ENTER: 'Enter',
    SPACEBAR: 'Spacebar',
    PAGE_UP: 'PageUp',
    PAGE_DOWN: 'PageDown',
    END: 'End',
    HOME: 'Home',
    ARROW_LEFT: 'ArrowLeft',
    ARROW_UP: 'ArrowUp',
    ARROW_RIGHT: 'ArrowRight',
    ARROW_DOWN: 'ArrowDown',
    DELETE: 'Delete',
    ESCAPE: 'Escape',
    TAB: 'Tab'
};
var normalizedKeys = new Set();
// IE11 has no support for new Map with iterable so we need to initialize this
// by hand.
normalizedKeys.add(KEY.BACKSPACE);
normalizedKeys.add(KEY.ENTER);
normalizedKeys.add(KEY.SPACEBAR);
normalizedKeys.add(KEY.PAGE_UP);
normalizedKeys.add(KEY.PAGE_DOWN);
normalizedKeys.add(KEY.END);
normalizedKeys.add(KEY.HOME);
normalizedKeys.add(KEY.ARROW_LEFT);
normalizedKeys.add(KEY.ARROW_UP);
normalizedKeys.add(KEY.ARROW_RIGHT);
normalizedKeys.add(KEY.ARROW_DOWN);
normalizedKeys.add(KEY.DELETE);
normalizedKeys.add(KEY.ESCAPE);
normalizedKeys.add(KEY.TAB);
var KEY_CODE = {
    BACKSPACE: 8,
    ENTER: 13,
    SPACEBAR: 32,
    PAGE_UP: 33,
    PAGE_DOWN: 34,
    END: 35,
    HOME: 36,
    ARROW_LEFT: 37,
    ARROW_UP: 38,
    ARROW_RIGHT: 39,
    ARROW_DOWN: 40,
    DELETE: 46,
    ESCAPE: 27,
    TAB: 9
};
var mappedKeyCodes = new Map();
// IE11 has no support for new Map with iterable so we need to initialize this
// by hand.
mappedKeyCodes.set(KEY_CODE.BACKSPACE, KEY.BACKSPACE);
mappedKeyCodes.set(KEY_CODE.ENTER, KEY.ENTER);
mappedKeyCodes.set(KEY_CODE.SPACEBAR, KEY.SPACEBAR);
mappedKeyCodes.set(KEY_CODE.PAGE_UP, KEY.PAGE_UP);
mappedKeyCodes.set(KEY_CODE.PAGE_DOWN, KEY.PAGE_DOWN);
mappedKeyCodes.set(KEY_CODE.END, KEY.END);
mappedKeyCodes.set(KEY_CODE.HOME, KEY.HOME);
mappedKeyCodes.set(KEY_CODE.ARROW_LEFT, KEY.ARROW_LEFT);
mappedKeyCodes.set(KEY_CODE.ARROW_UP, KEY.ARROW_UP);
mappedKeyCodes.set(KEY_CODE.ARROW_RIGHT, KEY.ARROW_RIGHT);
mappedKeyCodes.set(KEY_CODE.ARROW_DOWN, KEY.ARROW_DOWN);
mappedKeyCodes.set(KEY_CODE.DELETE, KEY.DELETE);
mappedKeyCodes.set(KEY_CODE.ESCAPE, KEY.ESCAPE);
mappedKeyCodes.set(KEY_CODE.TAB, KEY.TAB);
var navigationKeys = new Set();
// IE11 has no support for new Set with iterable so we need to initialize this
// by hand.
navigationKeys.add(KEY.PAGE_UP);
navigationKeys.add(KEY.PAGE_DOWN);
navigationKeys.add(KEY.END);
navigationKeys.add(KEY.HOME);
navigationKeys.add(KEY.ARROW_LEFT);
navigationKeys.add(KEY.ARROW_UP);
navigationKeys.add(KEY.ARROW_RIGHT);
navigationKeys.add(KEY.ARROW_DOWN);
function normalizeKey(evt) {
    var key = evt.key;
    // If the event already has a normalized key, return it
    if (normalizedKeys.has(key)) return key;
    // tslint:disable-next-line:deprecation
    var mappedKey = mappedKeyCodes.get(evt.keyCode);
    if (mappedKey) return mappedKey;
    return KEY.UNKNOWN;
}
function isNavigationEvent(evt) {
    return navigationKeys.has(normalizeKey(evt));
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"ad7r5":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "preventDefaultEvent", ()=>preventDefaultEvent
);
/**
 * @license
 * Copyright 2020 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */ var ELEMENTS_KEY_ALLOWED_IN = [
    'input',
    'button',
    'textarea',
    'select'
];
var preventDefaultEvent = function(evt) {
    var target = evt.target;
    if (!target) return;
    var tagName = ("" + target.tagName).toLowerCase();
    if (ELEMENTS_KEY_ALLOWED_IN.indexOf(tagName) === -1) evt.preventDefault();
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"kkPu7":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Initializes a state object for typeahead. Use the same reference for calls to
 * typeahead functions.
 *
 * @return The current state of the typeahead process. Each state reference
 *     represents a typeahead instance as the reference is typically mutated
 *     in-place.
 */ parcelHelpers.export(exports, "initState", ()=>initState
);
/**
 * Initializes typeahead state by indexing the current list items by primary
 * text into the sortedIndexByFirstChar data structure.
 *
 * @param listItemCount numer of items in the list
 * @param getPrimaryTextByItemIndex function that returns the primary text at a
 *     given index
 *
 * @return Map that maps the first character of the primary text to the full
 *     list text and it's index
 */ parcelHelpers.export(exports, "initSortedIndex", ()=>initSortedIndex
);
/**
 * Given the next desired character from the user, it attempts to find the next
 * list option matching the buffer. Wraps around if at the end of options.
 *
 * @param opts Options and accessors
 *   - nextChar - the next character to match against items
 *   - sortedIndexByFirstChar - output of `initSortedIndex(...)`
 *   - focusedItemIndex - the index of the currently focused item
 *   - focusItemAtIndex - function that focuses a list item at given index
 *   - skipFocus - whether or not to focus the matched item
 *   - isItemAtIndexDisabled - function that determines whether an item at a
 *        given index is disabled
 * @param state The typeahead state instance. See `initState`.
 *
 * @return The index of the matched item, or -1 if no match.
 */ parcelHelpers.export(exports, "matchItem", ()=>matchItem
);
/**
 * Whether or not the given typeahead instaance state is currently typing.
 *
 * @param state The typeahead state instance. See `initState`.
 */ parcelHelpers.export(exports, "isTypingInProgress", ()=>isTypingInProgress
);
/**
 * Clears the typeahaed buffer so that it resets item matching to the first
 * character.
 *
 * @param state The typeahead state instance. See `initState`.
 */ parcelHelpers.export(exports, "clearBuffer", ()=>clearBuffer
);
/**
 * Given a keydown event, it calculates whether or not to automatically focus a
 * list item depending on what was typed mimicing the typeahead functionality of
 * a standard <select> element that is open.
 *
 * @param opts Options and accessors
 *   - event - the KeyboardEvent to handle and parse
 *   - sortedIndexByFirstChar - output of `initSortedIndex(...)`
 *   - focusedItemIndex - the index of the currently focused item
 *   - focusItemAtIndex - function that focuses a list item at given index
 *   - isItemAtFocusedIndexDisabled - whether or not the currently focused item
 *      is disabled
 *   - isTargetListItem - whether or not the event target is a list item
 * @param state The typeahead state instance. See `initState`.
 *
 * @returns index of the item matched by the keydown. -1 if not matched.
 */ parcelHelpers.export(exports, "handleKeydown", ()=>handleKeydown
);
/**
 * @license
 * Copyright 2020 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */ var _keyboard = require("@material/dom/keyboard");
var _constants = require("./constants");
var _events = require("./events");
function initState() {
    var state = {
        bufferClearTimeout: 0,
        currentFirstChar: '',
        sortedIndexCursor: 0,
        typeaheadBuffer: ''
    };
    return state;
}
function initSortedIndex(listItemCount, getPrimaryTextByItemIndex) {
    var sortedIndexByFirstChar = new Map();
    // Aggregate item text to index mapping
    for(var i = 0; i < listItemCount; i++){
        var primaryText = getPrimaryTextByItemIndex(i).trim();
        if (!primaryText) continue;
        var firstChar = primaryText[0].toLowerCase();
        if (!sortedIndexByFirstChar.has(firstChar)) sortedIndexByFirstChar.set(firstChar, []);
        sortedIndexByFirstChar.get(firstChar).push({
            text: primaryText.toLowerCase(),
            index: i
        });
    }
    // Sort the mapping
    // TODO(b/157162694): Investigate replacing forEach with Map.values()
    sortedIndexByFirstChar.forEach(function(values) {
        values.sort(function(first, second) {
            return first.index - second.index;
        });
    });
    return sortedIndexByFirstChar;
}
function matchItem(opts, state) {
    var nextChar = opts.nextChar, focusItemAtIndex = opts.focusItemAtIndex, sortedIndexByFirstChar = opts.sortedIndexByFirstChar, focusedItemIndex = opts.focusedItemIndex, skipFocus = opts.skipFocus, isItemAtIndexDisabled = opts.isItemAtIndexDisabled;
    clearTimeout(state.bufferClearTimeout);
    state.bufferClearTimeout = setTimeout(function() {
        clearBuffer(state);
    }, _constants.numbers.TYPEAHEAD_BUFFER_CLEAR_TIMEOUT_MS);
    state.typeaheadBuffer = state.typeaheadBuffer + nextChar;
    var index;
    if (state.typeaheadBuffer.length === 1) index = matchFirstChar(sortedIndexByFirstChar, focusedItemIndex, isItemAtIndexDisabled, state);
    else index = matchAllChars(sortedIndexByFirstChar, isItemAtIndexDisabled, state);
    if (index !== -1 && !skipFocus) focusItemAtIndex(index);
    return index;
}
/**
 * Matches the user's single input character in the buffer to the
 * next option that begins with such character. Wraps around if at
 * end of options. Returns -1 if no match is found.
 */ function matchFirstChar(sortedIndexByFirstChar, focusedItemIndex, isItemAtIndexDisabled, state) {
    var firstChar = state.typeaheadBuffer[0];
    var itemsMatchingFirstChar = sortedIndexByFirstChar.get(firstChar);
    if (!itemsMatchingFirstChar) return -1;
    // Has the same firstChar been recently matched?
    // Also, did starting index remain the same between key presses?
    // If both hold true, simply increment index.
    if (firstChar === state.currentFirstChar && itemsMatchingFirstChar[state.sortedIndexCursor].index === focusedItemIndex) {
        state.sortedIndexCursor = (state.sortedIndexCursor + 1) % itemsMatchingFirstChar.length;
        var newIndex = itemsMatchingFirstChar[state.sortedIndexCursor].index;
        if (!isItemAtIndexDisabled(newIndex)) return newIndex;
    }
    // If we're here, it means one of the following happened:
    // - either firstChar or startingIndex has changed, invalidating the
    // cursor.
    // - The next item of typeahead is disabled, so we have to look further.
    state.currentFirstChar = firstChar;
    var newCursorPosition = -1;
    var cursorPosition;
    // Find the first non-disabled item as a fallback.
    for(cursorPosition = 0; cursorPosition < itemsMatchingFirstChar.length; cursorPosition++)if (!isItemAtIndexDisabled(itemsMatchingFirstChar[cursorPosition].index)) {
        newCursorPosition = cursorPosition;
        break;
    }
    // Advance cursor to first item matching the firstChar that is positioned
    // after starting item. Cursor is unchanged from fallback if there's no
    // such item.
    for(; cursorPosition < itemsMatchingFirstChar.length; cursorPosition++)if (itemsMatchingFirstChar[cursorPosition].index > focusedItemIndex && !isItemAtIndexDisabled(itemsMatchingFirstChar[cursorPosition].index)) {
        newCursorPosition = cursorPosition;
        break;
    }
    if (newCursorPosition !== -1) {
        state.sortedIndexCursor = newCursorPosition;
        return itemsMatchingFirstChar[state.sortedIndexCursor].index;
    }
    return -1;
}
/**
 * Attempts to find the next item that matches all of the typeahead buffer.
 * Wraps around if at end of options. Returns -1 if no match is found.
 */ function matchAllChars(sortedIndexByFirstChar, isItemAtIndexDisabled, state) {
    var firstChar = state.typeaheadBuffer[0];
    var itemsMatchingFirstChar = sortedIndexByFirstChar.get(firstChar);
    if (!itemsMatchingFirstChar) return -1;
    // Do nothing if text already matches
    var startingItem = itemsMatchingFirstChar[state.sortedIndexCursor];
    if (startingItem.text.lastIndexOf(state.typeaheadBuffer, 0) === 0 && !isItemAtIndexDisabled(startingItem.index)) return startingItem.index;
    // Find next item that matches completely; if no match, we'll eventually
    // loop around to same position
    var cursorPosition = (state.sortedIndexCursor + 1) % itemsMatchingFirstChar.length;
    var nextCursorPosition = -1;
    while(cursorPosition !== state.sortedIndexCursor){
        var currentItem = itemsMatchingFirstChar[cursorPosition];
        var matches = currentItem.text.lastIndexOf(state.typeaheadBuffer, 0) === 0;
        var isEnabled = !isItemAtIndexDisabled(currentItem.index);
        if (matches && isEnabled) {
            nextCursorPosition = cursorPosition;
            break;
        }
        cursorPosition = (cursorPosition + 1) % itemsMatchingFirstChar.length;
    }
    if (nextCursorPosition !== -1) {
        state.sortedIndexCursor = nextCursorPosition;
        return itemsMatchingFirstChar[state.sortedIndexCursor].index;
    }
    return -1;
}
function isTypingInProgress(state) {
    return state.typeaheadBuffer.length > 0;
}
function clearBuffer(state) {
    state.typeaheadBuffer = '';
}
function handleKeydown(opts, state) {
    var event = opts.event, isTargetListItem = opts.isTargetListItem, focusedItemIndex = opts.focusedItemIndex, focusItemAtIndex = opts.focusItemAtIndex, sortedIndexByFirstChar = opts.sortedIndexByFirstChar, isItemAtIndexDisabled = opts.isItemAtIndexDisabled;
    var isArrowLeft = _keyboard.normalizeKey(event) === 'ArrowLeft';
    var isArrowUp = _keyboard.normalizeKey(event) === 'ArrowUp';
    var isArrowRight = _keyboard.normalizeKey(event) === 'ArrowRight';
    var isArrowDown = _keyboard.normalizeKey(event) === 'ArrowDown';
    var isHome = _keyboard.normalizeKey(event) === 'Home';
    var isEnd = _keyboard.normalizeKey(event) === 'End';
    var isEnter = _keyboard.normalizeKey(event) === 'Enter';
    var isSpace = _keyboard.normalizeKey(event) === 'Spacebar';
    if (event.ctrlKey || event.metaKey || isArrowLeft || isArrowUp || isArrowRight || isArrowDown || isHome || isEnd || isEnter) return -1;
    var isCharacterKey = !isSpace && event.key.length === 1;
    if (isCharacterKey) {
        _events.preventDefaultEvent(event);
        var matchItemOpts = {
            focusItemAtIndex: focusItemAtIndex,
            focusedItemIndex: focusedItemIndex,
            nextChar: event.key.toLowerCase(),
            sortedIndexByFirstChar: sortedIndexByFirstChar,
            skipFocus: false,
            isItemAtIndexDisabled: isItemAtIndexDisabled
        };
        return matchItem(matchItemOpts, state);
    }
    if (!isSpace) return -1;
    if (isTargetListItem) _events.preventDefaultEvent(event);
    var typeaheadOnListItem = isTargetListItem && isTypingInProgress(state);
    if (typeaheadOnListItem) {
        var matchItemOpts = {
            focusItemAtIndex: focusItemAtIndex,
            focusedItemIndex: focusedItemIndex,
            nextChar: ' ',
            sortedIndexByFirstChar: sortedIndexByFirstChar,
            skipFocus: false,
            isItemAtIndexDisabled: isItemAtIndexDisabled
        };
        // space participates in typeahead matching if in rapid typing mode
        return matchItem(matchItemOpts, state);
    }
    return -1;
}

},{"@material/dom/keyboard":"f68aW","./constants":"6smap","./events":"ad7r5","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"bScxg":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "MDCMenuSurface", ()=>MDCMenuSurface1
);
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */ var _tslib = require("tslib");
var _component = require("@material/base/component");
var _constants = require("./constants");
var _foundation = require("./foundation");
var _util = require("@material/animation/util");
var MDCMenuSurface1 = function(_super) {
    _tslib.__extends(MDCMenuSurface, _super);
    function MDCMenuSurface() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MDCMenuSurface.attachTo = function(root) {
        return new MDCMenuSurface(root);
    };
    MDCMenuSurface.prototype.initialSyncWithDOM = function() {
        var _this = this;
        var parentEl = this.root.parentElement;
        this.anchorElement = parentEl && parentEl.classList.contains(_constants.cssClasses.ANCHOR) ? parentEl : null;
        if (this.root.classList.contains(_constants.cssClasses.FIXED)) this.setFixedPosition(true);
        this.handleKeydown = function(event) {
            _this.foundation.handleKeydown(event);
        };
        this.handleBodyClick = function(event) {
            _this.foundation.handleBodyClick(event);
        };
        // capture so that no race between handleBodyClick and quickOpen when
        // menusurface opened on button click which registers this listener
        this.registerBodyClickListener = function() {
            document.body.addEventListener('click', _this.handleBodyClick, {
                capture: true
            });
        };
        this.deregisterBodyClickListener = function() {
            document.body.removeEventListener('click', _this.handleBodyClick, {
                capture: true
            });
        };
        this.listen('keydown', this.handleKeydown);
        this.listen(_constants.strings.OPENED_EVENT, this.registerBodyClickListener);
        this.listen(_constants.strings.CLOSED_EVENT, this.deregisterBodyClickListener);
    };
    MDCMenuSurface.prototype.destroy = function() {
        this.unlisten('keydown', this.handleKeydown);
        this.unlisten(_constants.strings.OPENED_EVENT, this.registerBodyClickListener);
        this.unlisten(_constants.strings.CLOSED_EVENT, this.deregisterBodyClickListener);
        _super.prototype.destroy.call(this);
    };
    MDCMenuSurface.prototype.isOpen = function() {
        return this.foundation.isOpen();
    };
    MDCMenuSurface.prototype.open = function() {
        this.foundation.open();
    };
    MDCMenuSurface.prototype.close = function(skipRestoreFocus) {
        if (skipRestoreFocus === void 0) skipRestoreFocus = false;
        this.foundation.close(skipRestoreFocus);
    };
    Object.defineProperty(MDCMenuSurface.prototype, "quickOpen", {
        set: function(quickOpen) {
            this.foundation.setQuickOpen(quickOpen);
        },
        enumerable: false,
        configurable: true
    });
    /** Sets the foundation to use page offsets for an positioning when the menu is hoisted to the body. */ MDCMenuSurface.prototype.setIsHoisted = function(isHoisted) {
        this.foundation.setIsHoisted(isHoisted);
    };
    /** Sets the element that the menu-surface is anchored to. */ MDCMenuSurface.prototype.setMenuSurfaceAnchorElement = function(element) {
        this.anchorElement = element;
    };
    /** Sets the menu-surface to position: fixed. */ MDCMenuSurface.prototype.setFixedPosition = function(isFixed) {
        if (isFixed) this.root.classList.add(_constants.cssClasses.FIXED);
        else this.root.classList.remove(_constants.cssClasses.FIXED);
        this.foundation.setFixedPosition(isFixed);
    };
    /** Sets the absolute x/y position to position based on. Requires the menu to be hoisted. */ MDCMenuSurface.prototype.setAbsolutePosition = function(x, y) {
        this.foundation.setAbsolutePosition(x, y);
        this.setIsHoisted(true);
    };
    /**
     * @param corner Default anchor corner alignment of top-left surface corner.
     */ MDCMenuSurface.prototype.setAnchorCorner = function(corner) {
        this.foundation.setAnchorCorner(corner);
    };
    MDCMenuSurface.prototype.setAnchorMargin = function(margin) {
        this.foundation.setAnchorMargin(margin);
    };
    MDCMenuSurface.prototype.getDefaultFoundation = function() {
        var _this = this;
        // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
        // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
        // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
        var adapter = {
            addClass: function(className) {
                return _this.root.classList.add(className);
            },
            removeClass: function(className) {
                return _this.root.classList.remove(className);
            },
            hasClass: function(className) {
                return _this.root.classList.contains(className);
            },
            hasAnchor: function() {
                return !!_this.anchorElement;
            },
            notifyClose: function() {
                return _this.emit(_foundation.MDCMenuSurfaceFoundation.strings.CLOSED_EVENT, {
                });
            },
            notifyClosing: function() {
                _this.emit(_foundation.MDCMenuSurfaceFoundation.strings.CLOSING_EVENT, {
                });
            },
            notifyOpen: function() {
                return _this.emit(_foundation.MDCMenuSurfaceFoundation.strings.OPENED_EVENT, {
                });
            },
            isElementInContainer: function(el) {
                return _this.root.contains(el);
            },
            isRtl: function() {
                return getComputedStyle(_this.root).getPropertyValue('direction') === 'rtl';
            },
            setTransformOrigin: function(origin) {
                var propertyName = _util.getCorrectPropertyName(window, 'transform') + "-origin";
                _this.root.style.setProperty(propertyName, origin);
            },
            isFocused: function() {
                return document.activeElement === _this.root;
            },
            saveFocus: function() {
                _this.previousFocus = document.activeElement;
            },
            restoreFocus: function() {
                if (_this.root.contains(document.activeElement)) {
                    if (_this.previousFocus && _this.previousFocus.focus) _this.previousFocus.focus();
                }
            },
            getInnerDimensions: function() {
                return {
                    width: _this.root.offsetWidth,
                    height: _this.root.offsetHeight
                };
            },
            getAnchorDimensions: function() {
                return _this.anchorElement ? _this.anchorElement.getBoundingClientRect() : null;
            },
            getWindowDimensions: function() {
                return {
                    width: window.innerWidth,
                    height: window.innerHeight
                };
            },
            getBodyDimensions: function() {
                return {
                    width: document.body.clientWidth,
                    height: document.body.clientHeight
                };
            },
            getWindowScroll: function() {
                return {
                    x: window.pageXOffset,
                    y: window.pageYOffset
                };
            },
            setPosition: function(position) {
                var rootHTML = _this.root;
                rootHTML.style.left = 'left' in position ? position.left + "px" : '';
                rootHTML.style.right = 'right' in position ? position.right + "px" : '';
                rootHTML.style.top = 'top' in position ? position.top + "px" : '';
                rootHTML.style.bottom = 'bottom' in position ? position.bottom + "px" : '';
            },
            setMaxHeight: function(height) {
                _this.root.style.maxHeight = height;
            }
        };
        // tslint:enable:object-literal-sort-keys
        return new _foundation.MDCMenuSurfaceFoundation(adapter);
    };
    return MDCMenuSurface;
}(_component.MDCComponent);

},{"tslib":"j55WF","@material/base/component":"4ISbx","./constants":"ilumG","./foundation":"6LTC9","@material/animation/util":"gRZvG","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"6LTC9":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "MDCMenuSurfaceFoundation", ()=>MDCMenuSurfaceFoundation1
);
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */ var _tslib = require("tslib");
var _foundation = require("@material/base/foundation");
var _constants = require("./constants");
var MDCMenuSurfaceFoundation1 = function(_super) {
    _tslib.__extends(MDCMenuSurfaceFoundation, _super);
    function MDCMenuSurfaceFoundation(adapter) {
        var _this = _super.call(this, _tslib.__assign(_tslib.__assign({
        }, MDCMenuSurfaceFoundation.defaultAdapter), adapter)) || this;
        _this.isSurfaceOpen = false;
        _this.isQuickOpen = false;
        _this.isHoistedElement = false;
        _this.isFixedPosition = false;
        _this.isHorizontallyCenteredOnViewport = false;
        _this.maxHeight = 0;
        _this.openAnimationEndTimerId = 0;
        _this.closeAnimationEndTimerId = 0;
        _this.animationRequestId = 0;
        _this.anchorCorner = _constants.Corner.TOP_START;
        /**
         * Corner of the menu surface to which menu surface is attached to anchor.
         *
         *  Anchor corner --->+----------+
         *                    |  ANCHOR  |
         *                    +----------+
         *  Origin corner --->+--------------+
         *                    |              |
         *                    |              |
         *                    | MENU SURFACE |
         *                    |              |
         *                    |              |
         *                    +--------------+
         */ _this.originCorner = _constants.Corner.TOP_START;
        _this.anchorMargin = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        };
        _this.position = {
            x: 0,
            y: 0
        };
        return _this;
    }
    Object.defineProperty(MDCMenuSurfaceFoundation, "cssClasses", {
        get: function() {
            return _constants.cssClasses;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCMenuSurfaceFoundation, "strings", {
        get: function() {
            return _constants.strings;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCMenuSurfaceFoundation, "numbers", {
        get: function() {
            return _constants.numbers;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCMenuSurfaceFoundation, "Corner", {
        get: function() {
            return _constants.Corner;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCMenuSurfaceFoundation, "defaultAdapter", {
        /**
         * @see {@link MDCMenuSurfaceAdapter} for typing information on parameters and return types.
         */ get: function() {
            // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
            return {
                addClass: function() {
                    return undefined;
                },
                removeClass: function() {
                    return undefined;
                },
                hasClass: function() {
                    return false;
                },
                hasAnchor: function() {
                    return false;
                },
                isElementInContainer: function() {
                    return false;
                },
                isFocused: function() {
                    return false;
                },
                isRtl: function() {
                    return false;
                },
                getInnerDimensions: function() {
                    return {
                        height: 0,
                        width: 0
                    };
                },
                getAnchorDimensions: function() {
                    return null;
                },
                getWindowDimensions: function() {
                    return {
                        height: 0,
                        width: 0
                    };
                },
                getBodyDimensions: function() {
                    return {
                        height: 0,
                        width: 0
                    };
                },
                getWindowScroll: function() {
                    return {
                        x: 0,
                        y: 0
                    };
                },
                setPosition: function() {
                    return undefined;
                },
                setMaxHeight: function() {
                    return undefined;
                },
                setTransformOrigin: function() {
                    return undefined;
                },
                saveFocus: function() {
                    return undefined;
                },
                restoreFocus: function() {
                    return undefined;
                },
                notifyClose: function() {
                    return undefined;
                },
                notifyOpen: function() {
                    return undefined;
                },
                notifyClosing: function() {
                    return undefined;
                }
            };
        // tslint:enable:object-literal-sort-keys
        },
        enumerable: false,
        configurable: true
    });
    MDCMenuSurfaceFoundation.prototype.init = function() {
        var _a = MDCMenuSurfaceFoundation.cssClasses, ROOT = _a.ROOT, OPEN = _a.OPEN;
        if (!this.adapter.hasClass(ROOT)) throw new Error(ROOT + " class required in root element.");
        if (this.adapter.hasClass(OPEN)) this.isSurfaceOpen = true;
    };
    MDCMenuSurfaceFoundation.prototype.destroy = function() {
        clearTimeout(this.openAnimationEndTimerId);
        clearTimeout(this.closeAnimationEndTimerId);
        // Cancel any currently running animations.
        cancelAnimationFrame(this.animationRequestId);
    };
    /**
     * @param corner Default anchor corner alignment of top-left menu surface
     *     corner.
     */ MDCMenuSurfaceFoundation.prototype.setAnchorCorner = function(corner) {
        this.anchorCorner = corner;
    };
    /**
     * Flip menu corner horizontally.
     */ MDCMenuSurfaceFoundation.prototype.flipCornerHorizontally = function() {
        this.originCorner = this.originCorner ^ _constants.CornerBit.RIGHT;
    };
    /**
     * @param margin Set of margin values from anchor.
     */ MDCMenuSurfaceFoundation.prototype.setAnchorMargin = function(margin) {
        this.anchorMargin.top = margin.top || 0;
        this.anchorMargin.right = margin.right || 0;
        this.anchorMargin.bottom = margin.bottom || 0;
        this.anchorMargin.left = margin.left || 0;
    };
    /** Used to indicate if the menu-surface is hoisted to the body. */ MDCMenuSurfaceFoundation.prototype.setIsHoisted = function(isHoisted) {
        this.isHoistedElement = isHoisted;
    };
    /**
     * Used to set the menu-surface calculations based on a fixed position menu.
     */ MDCMenuSurfaceFoundation.prototype.setFixedPosition = function(isFixedPosition) {
        this.isFixedPosition = isFixedPosition;
    };
    /**
     * @return Returns true if menu is in fixed (`position: fixed`) position.
     */ MDCMenuSurfaceFoundation.prototype.isFixed = function() {
        return this.isFixedPosition;
    };
    /** Sets the menu-surface position on the page. */ MDCMenuSurfaceFoundation.prototype.setAbsolutePosition = function(x, y) {
        this.position.x = this.isFinite(x) ? x : 0;
        this.position.y = this.isFinite(y) ? y : 0;
    };
    /** Sets whether menu-surface should be horizontally centered to viewport. */ MDCMenuSurfaceFoundation.prototype.setIsHorizontallyCenteredOnViewport = function(isCentered) {
        this.isHorizontallyCenteredOnViewport = isCentered;
    };
    MDCMenuSurfaceFoundation.prototype.setQuickOpen = function(quickOpen) {
        this.isQuickOpen = quickOpen;
    };
    /**
     * Sets maximum menu-surface height on open.
     * @param maxHeight The desired max-height. Set to 0 (default) to
     *     automatically calculate max height based on available viewport space.
     */ MDCMenuSurfaceFoundation.prototype.setMaxHeight = function(maxHeight) {
        this.maxHeight = maxHeight;
    };
    MDCMenuSurfaceFoundation.prototype.isOpen = function() {
        return this.isSurfaceOpen;
    };
    /**
     * Open the menu surface.
     */ MDCMenuSurfaceFoundation.prototype.open = function() {
        var _this = this;
        if (this.isSurfaceOpen) return;
        this.adapter.saveFocus();
        if (this.isQuickOpen) {
            this.isSurfaceOpen = true;
            this.adapter.addClass(MDCMenuSurfaceFoundation.cssClasses.OPEN);
            this.dimensions = this.adapter.getInnerDimensions();
            this.autoposition();
            this.adapter.notifyOpen();
        } else {
            this.adapter.addClass(MDCMenuSurfaceFoundation.cssClasses.ANIMATING_OPEN);
            this.animationRequestId = requestAnimationFrame(function() {
                _this.dimensions = _this.adapter.getInnerDimensions();
                _this.autoposition();
                _this.adapter.addClass(MDCMenuSurfaceFoundation.cssClasses.OPEN);
                _this.openAnimationEndTimerId = setTimeout(function() {
                    _this.openAnimationEndTimerId = 0;
                    _this.adapter.removeClass(MDCMenuSurfaceFoundation.cssClasses.ANIMATING_OPEN);
                    _this.adapter.notifyOpen();
                }, _constants.numbers.TRANSITION_OPEN_DURATION);
            });
            this.isSurfaceOpen = true;
        }
    };
    /**
     * Closes the menu surface.
     */ MDCMenuSurfaceFoundation.prototype.close = function(skipRestoreFocus) {
        var _this = this;
        if (skipRestoreFocus === void 0) skipRestoreFocus = false;
        if (!this.isSurfaceOpen) return;
        this.adapter.notifyClosing();
        if (this.isQuickOpen) {
            this.isSurfaceOpen = false;
            if (!skipRestoreFocus) this.maybeRestoreFocus();
            this.adapter.removeClass(MDCMenuSurfaceFoundation.cssClasses.OPEN);
            this.adapter.removeClass(MDCMenuSurfaceFoundation.cssClasses.IS_OPEN_BELOW);
            this.adapter.notifyClose();
            return;
        }
        this.adapter.addClass(MDCMenuSurfaceFoundation.cssClasses.ANIMATING_CLOSED);
        requestAnimationFrame(function() {
            _this.adapter.removeClass(MDCMenuSurfaceFoundation.cssClasses.OPEN);
            _this.adapter.removeClass(MDCMenuSurfaceFoundation.cssClasses.IS_OPEN_BELOW);
            _this.closeAnimationEndTimerId = setTimeout(function() {
                _this.closeAnimationEndTimerId = 0;
                _this.adapter.removeClass(MDCMenuSurfaceFoundation.cssClasses.ANIMATING_CLOSED);
                _this.adapter.notifyClose();
            }, _constants.numbers.TRANSITION_CLOSE_DURATION);
        });
        this.isSurfaceOpen = false;
        if (!skipRestoreFocus) this.maybeRestoreFocus();
    };
    /** Handle clicks and close if not within menu-surface element. */ MDCMenuSurfaceFoundation.prototype.handleBodyClick = function(evt) {
        var el = evt.target;
        if (this.adapter.isElementInContainer(el)) return;
        this.close();
    };
    /** Handle keys that close the surface. */ MDCMenuSurfaceFoundation.prototype.handleKeydown = function(evt) {
        var keyCode = evt.keyCode, key = evt.key;
        var isEscape = key === 'Escape' || keyCode === 27;
        if (isEscape) this.close();
    };
    MDCMenuSurfaceFoundation.prototype.autoposition = function() {
        var _a;
        // Compute measurements for autoposition methods reuse.
        this.measurements = this.getAutoLayoutmeasurements();
        var corner = this.getoriginCorner();
        var maxMenuSurfaceHeight = this.getMenuSurfaceMaxHeight(corner);
        var verticalAlignment = this.hasBit(corner, _constants.CornerBit.BOTTOM) ? 'bottom' : 'top';
        var horizontalAlignment = this.hasBit(corner, _constants.CornerBit.RIGHT) ? 'right' : 'left';
        var horizontalOffset = this.getHorizontalOriginOffset(corner);
        var verticalOffset = this.getVerticalOriginOffset(corner);
        var _b = this.measurements, anchorSize = _b.anchorSize, surfaceSize = _b.surfaceSize;
        var position = (_a = {
        }, _a[horizontalAlignment] = horizontalOffset, _a[verticalAlignment] = verticalOffset, _a);
        // Center align when anchor width is comparable or greater than menu
        // surface, otherwise keep corner.
        if (anchorSize.width / surfaceSize.width > _constants.numbers.ANCHOR_TO_MENU_SURFACE_WIDTH_RATIO) horizontalAlignment = 'center';
        // If the menu-surface has been hoisted to the body, it's no longer relative
        // to the anchor element
        if (this.isHoistedElement || this.isFixedPosition) this.adjustPositionForHoistedElement(position);
        this.adapter.setTransformOrigin(horizontalAlignment + " " + verticalAlignment);
        this.adapter.setPosition(position);
        this.adapter.setMaxHeight(maxMenuSurfaceHeight ? maxMenuSurfaceHeight + 'px' : '');
        // If it is opened from the top then add is-open-below class
        if (!this.hasBit(corner, _constants.CornerBit.BOTTOM)) this.adapter.addClass(MDCMenuSurfaceFoundation.cssClasses.IS_OPEN_BELOW);
    };
    /**
     * @return Measurements used to position menu surface popup.
     */ MDCMenuSurfaceFoundation.prototype.getAutoLayoutmeasurements = function() {
        var anchorRect = this.adapter.getAnchorDimensions();
        var bodySize = this.adapter.getBodyDimensions();
        var viewportSize = this.adapter.getWindowDimensions();
        var windowScroll = this.adapter.getWindowScroll();
        if (!anchorRect) // tslint:disable:object-literal-sort-keys Positional properties are more readable when they're grouped together
        anchorRect = {
            top: this.position.y,
            right: this.position.x,
            bottom: this.position.y,
            left: this.position.x,
            width: 0,
            height: 0
        };
        return {
            anchorSize: anchorRect,
            bodySize: bodySize,
            surfaceSize: this.dimensions,
            viewportDistance: {
                // tslint:disable:object-literal-sort-keys Positional properties are more readable when they're grouped together
                top: anchorRect.top,
                right: viewportSize.width - anchorRect.right,
                bottom: viewportSize.height - anchorRect.bottom,
                left: anchorRect.left
            },
            viewportSize: viewportSize,
            windowScroll: windowScroll
        };
    };
    /**
     * Computes the corner of the anchor from which to animate and position the
     * menu surface.
     *
     * Only LEFT or RIGHT bit is used to position the menu surface ignoring RTL
     * context. E.g., menu surface will be positioned from right side on TOP_END.
     */ MDCMenuSurfaceFoundation.prototype.getoriginCorner = function() {
        var corner = this.originCorner;
        var _a = this.measurements, viewportDistance = _a.viewportDistance, anchorSize = _a.anchorSize, surfaceSize = _a.surfaceSize;
        var MARGIN_TO_EDGE = MDCMenuSurfaceFoundation.numbers.MARGIN_TO_EDGE;
        var isAnchoredToBottom = this.hasBit(this.anchorCorner, _constants.CornerBit.BOTTOM);
        var availableTop;
        var availableBottom;
        if (isAnchoredToBottom) {
            availableTop = viewportDistance.top - MARGIN_TO_EDGE + this.anchorMargin.bottom;
            availableBottom = viewportDistance.bottom - MARGIN_TO_EDGE - this.anchorMargin.bottom;
        } else {
            availableTop = viewportDistance.top - MARGIN_TO_EDGE + this.anchorMargin.top;
            availableBottom = viewportDistance.bottom - MARGIN_TO_EDGE + anchorSize.height - this.anchorMargin.top;
        }
        var isAvailableBottom = availableBottom - surfaceSize.height > 0;
        if (!isAvailableBottom && availableTop > availableBottom) // Attach bottom side of surface to the anchor.
        corner = this.setBit(corner, _constants.CornerBit.BOTTOM);
        var isRtl = this.adapter.isRtl();
        var isFlipRtl = this.hasBit(this.anchorCorner, _constants.CornerBit.FLIP_RTL);
        var hasRightBit = this.hasBit(this.anchorCorner, _constants.CornerBit.RIGHT) || this.hasBit(corner, _constants.CornerBit.RIGHT);
        // Whether surface attached to right side of anchor element.
        var isAnchoredToRight = false;
        // Anchored to start
        if (isRtl && isFlipRtl) isAnchoredToRight = !hasRightBit;
        else // Anchored to right
        isAnchoredToRight = hasRightBit;
        var availableLeft;
        var availableRight;
        if (isAnchoredToRight) {
            availableLeft = viewportDistance.left + anchorSize.width + this.anchorMargin.right;
            availableRight = viewportDistance.right - this.anchorMargin.right;
        } else {
            availableLeft = viewportDistance.left + this.anchorMargin.left;
            availableRight = viewportDistance.right + anchorSize.width - this.anchorMargin.left;
        }
        var isAvailableLeft = availableLeft - surfaceSize.width > 0;
        var isAvailableRight = availableRight - surfaceSize.width > 0;
        var isOriginCornerAlignedToEnd = this.hasBit(corner, _constants.CornerBit.FLIP_RTL) && this.hasBit(corner, _constants.CornerBit.RIGHT);
        if (isAvailableRight && isOriginCornerAlignedToEnd && isRtl || !isAvailableLeft && isOriginCornerAlignedToEnd) // Attach left side of surface to the anchor.
        corner = this.unsetBit(corner, _constants.CornerBit.RIGHT);
        else if (isAvailableLeft && isAnchoredToRight && isRtl || isAvailableLeft && !isAnchoredToRight && hasRightBit || !isAvailableRight && availableLeft >= availableRight) // Attach right side of surface to the anchor.
        corner = this.setBit(corner, _constants.CornerBit.RIGHT);
        return corner;
    };
    /**
     * @param corner Origin corner of the menu surface.
     * @return Maximum height of the menu surface, based on available space. 0
     *     indicates should not be set.
     */ MDCMenuSurfaceFoundation.prototype.getMenuSurfaceMaxHeight = function(corner) {
        if (this.maxHeight > 0) return this.maxHeight;
        var viewportDistance = this.measurements.viewportDistance;
        var maxHeight = 0;
        var isBottomAligned = this.hasBit(corner, _constants.CornerBit.BOTTOM);
        var isBottomAnchored = this.hasBit(this.anchorCorner, _constants.CornerBit.BOTTOM);
        var MARGIN_TO_EDGE = MDCMenuSurfaceFoundation.numbers.MARGIN_TO_EDGE;
        // When maximum height is not specified, it is handled from CSS.
        if (isBottomAligned) {
            maxHeight = viewportDistance.top + this.anchorMargin.top - MARGIN_TO_EDGE;
            if (!isBottomAnchored) maxHeight += this.measurements.anchorSize.height;
        } else {
            maxHeight = viewportDistance.bottom - this.anchorMargin.bottom + this.measurements.anchorSize.height - MARGIN_TO_EDGE;
            if (isBottomAnchored) maxHeight -= this.measurements.anchorSize.height;
        }
        return maxHeight;
    };
    /**
     * @param corner Origin corner of the menu surface.
     * @return Horizontal offset of menu surface origin corner from corresponding
     *     anchor corner.
     */ MDCMenuSurfaceFoundation.prototype.getHorizontalOriginOffset = function(corner) {
        var anchorSize = this.measurements.anchorSize;
        // isRightAligned corresponds to using the 'right' property on the surface.
        var isRightAligned = this.hasBit(corner, _constants.CornerBit.RIGHT);
        var avoidHorizontalOverlap = this.hasBit(this.anchorCorner, _constants.CornerBit.RIGHT);
        if (isRightAligned) {
            var rightOffset = avoidHorizontalOverlap ? anchorSize.width - this.anchorMargin.left : this.anchorMargin.right;
            // For hoisted or fixed elements, adjust the offset by the difference
            // between viewport width and body width so when we calculate the right
            // value (`adjustPositionForHoistedElement`) based on the element
            // position, the right property is correct.
            if (this.isHoistedElement || this.isFixedPosition) return rightOffset - (this.measurements.viewportSize.width - this.measurements.bodySize.width);
            return rightOffset;
        }
        return avoidHorizontalOverlap ? anchorSize.width - this.anchorMargin.right : this.anchorMargin.left;
    };
    /**
     * @param corner Origin corner of the menu surface.
     * @return Vertical offset of menu surface origin corner from corresponding
     *     anchor corner.
     */ MDCMenuSurfaceFoundation.prototype.getVerticalOriginOffset = function(corner) {
        var anchorSize = this.measurements.anchorSize;
        var isBottomAligned = this.hasBit(corner, _constants.CornerBit.BOTTOM);
        var avoidVerticalOverlap = this.hasBit(this.anchorCorner, _constants.CornerBit.BOTTOM);
        var y = 0;
        if (isBottomAligned) y = avoidVerticalOverlap ? anchorSize.height - this.anchorMargin.top : -this.anchorMargin.bottom;
        else y = avoidVerticalOverlap ? anchorSize.height + this.anchorMargin.bottom : this.anchorMargin.top;
        return y;
    };
    /**
     * Calculates the offsets for positioning the menu-surface when the
     * menu-surface has been hoisted to the body.
     */ MDCMenuSurfaceFoundation.prototype.adjustPositionForHoistedElement = function(position) {
        var e_1, _a;
        var _b = this.measurements, windowScroll = _b.windowScroll, viewportDistance = _b.viewportDistance, surfaceSize = _b.surfaceSize, viewportSize = _b.viewportSize;
        var props = Object.keys(position);
        try {
            for(var props_1 = _tslib.__values(props), props_1_1 = props_1.next(); !props_1_1.done; props_1_1 = props_1.next()){
                var prop = props_1_1.value;
                var value = position[prop] || 0;
                if (this.isHorizontallyCenteredOnViewport && (prop === 'left' || prop === 'right')) {
                    position[prop] = (viewportSize.width - surfaceSize.width) / 2;
                    continue;
                }
                // Hoisted surfaces need to have the anchor elements location on the page
                // added to the position properties for proper alignment on the body.
                value += viewportDistance[prop];
                // Surfaces that are absolutely positioned need to have additional
                // calculations for scroll and bottom positioning.
                if (!this.isFixedPosition) {
                    if (prop === 'top') value += windowScroll.y;
                    else if (prop === 'bottom') value -= windowScroll.y;
                    else if (prop === 'left') value += windowScroll.x;
                    else value -= windowScroll.x;
                }
                position[prop] = value;
            }
        } catch (e_1_1) {
            e_1 = {
                error: e_1_1
            };
        } finally{
            try {
                if (props_1_1 && !props_1_1.done && (_a = props_1.return)) _a.call(props_1);
            } finally{
                if (e_1) throw e_1.error;
            }
        }
    };
    /**
     * The last focused element when the menu surface was opened should regain
     * focus, if the user is focused on or within the menu surface when it is
     * closed.
     */ MDCMenuSurfaceFoundation.prototype.maybeRestoreFocus = function() {
        var _this = this;
        var isRootFocused = this.adapter.isFocused();
        var childHasFocus = document.activeElement && this.adapter.isElementInContainer(document.activeElement);
        if (isRootFocused || childHasFocus) // Wait before restoring focus when closing the menu surface. This is
        // important because if a touch event triggered the menu close, and the
        // subsequent mouse event occurs after focus is restored, then the
        // restored focus would be lost.
        setTimeout(function() {
            _this.adapter.restoreFocus();
        }, _constants.numbers.TOUCH_EVENT_WAIT_MS);
    };
    MDCMenuSurfaceFoundation.prototype.hasBit = function(corner, bit) {
        return Boolean(corner & bit); // tslint:disable-line:no-bitwise
    };
    MDCMenuSurfaceFoundation.prototype.setBit = function(corner, bit) {
        return corner | bit; // tslint:disable-line:no-bitwise
    };
    MDCMenuSurfaceFoundation.prototype.unsetBit = function(corner, bit) {
        return corner ^ bit;
    };
    /**
     * isFinite that doesn't force conversion to number type.
     * Equivalent to Number.isFinite in ES2015, which is not supported in IE.
     */ MDCMenuSurfaceFoundation.prototype.isFinite = function(num) {
        return typeof num === 'number' && isFinite(num);
    };
    return MDCMenuSurfaceFoundation;
}(_foundation.MDCFoundation);
exports.default = MDCMenuSurfaceFoundation1;

},{"tslib":"j55WF","@material/base/foundation":"6nwGh","./constants":"ilumG","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"gRZvG":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "getCorrectPropertyName", ()=>getCorrectPropertyName
);
parcelHelpers.export(exports, "getCorrectEventName", ()=>getCorrectEventName
);
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */ var cssPropertyNameMap = {
    animation: {
        prefixed: '-webkit-animation',
        standard: 'animation'
    },
    transform: {
        prefixed: '-webkit-transform',
        standard: 'transform'
    },
    transition: {
        prefixed: '-webkit-transition',
        standard: 'transition'
    }
};
var jsEventTypeMap = {
    animationend: {
        cssProperty: 'animation',
        prefixed: 'webkitAnimationEnd',
        standard: 'animationend'
    },
    animationiteration: {
        cssProperty: 'animation',
        prefixed: 'webkitAnimationIteration',
        standard: 'animationiteration'
    },
    animationstart: {
        cssProperty: 'animation',
        prefixed: 'webkitAnimationStart',
        standard: 'animationstart'
    },
    transitionend: {
        cssProperty: 'transition',
        prefixed: 'webkitTransitionEnd',
        standard: 'transitionend'
    }
};
function isWindow(windowObj) {
    return Boolean(windowObj.document) && typeof windowObj.document.createElement === 'function';
}
function getCorrectPropertyName(windowObj, cssProperty) {
    if (isWindow(windowObj) && cssProperty in cssPropertyNameMap) {
        var el = windowObj.document.createElement('div');
        var _a = cssPropertyNameMap[cssProperty], standard = _a.standard, prefixed = _a.prefixed;
        var isStandard = standard in el.style;
        return isStandard ? standard : prefixed;
    }
    return cssProperty;
}
function getCorrectEventName(windowObj, eventType) {
    if (isWindow(windowObj) && eventType in jsEventTypeMap) {
        var el = windowObj.document.createElement('div');
        var _a = jsEventTypeMap[eventType], standard = _a.standard, prefixed = _a.prefixed, cssProperty = _a.cssProperty;
        var isStandard = cssProperty in el.style;
        return isStandard ? standard : prefixed;
    }
    return eventType;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"fqDlq":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "cssClasses", ()=>cssClasses
);
parcelHelpers.export(exports, "strings", ()=>strings
);
parcelHelpers.export(exports, "numbers", ()=>numbers
);
parcelHelpers.export(exports, "DefaultFocusState", ()=>DefaultFocusState1
);
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */ var cssClasses = {
    MENU_SELECTED_LIST_ITEM: 'mdc-menu-item--selected',
    MENU_SELECTION_GROUP: 'mdc-menu__selection-group',
    ROOT: 'mdc-menu'
};
var strings = {
    ARIA_CHECKED_ATTR: 'aria-checked',
    ARIA_DISABLED_ATTR: 'aria-disabled',
    CHECKBOX_SELECTOR: 'input[type="checkbox"]',
    LIST_SELECTOR: '.mdc-list,.mdc-deprecated-list',
    SELECTED_EVENT: 'MDCMenu:selected',
    SKIP_RESTORE_FOCUS: 'data-menu-item-skip-restore-focus'
};
var numbers = {
    FOCUS_ROOT_INDEX: -1
};
var DefaultFocusState1;
(function(DefaultFocusState) {
    DefaultFocusState[DefaultFocusState["NONE"] = 0] = "NONE";
    DefaultFocusState[DefaultFocusState["LIST_ROOT"] = 1] = "LIST_ROOT";
    DefaultFocusState[DefaultFocusState["FIRST_ITEM"] = 2] = "FIRST_ITEM";
    DefaultFocusState[DefaultFocusState["LAST_ITEM"] = 3] = "LAST_ITEM";
})(DefaultFocusState1 || (DefaultFocusState1 = {
}));

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"3u17g":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "MDCMenuFoundation", ()=>MDCMenuFoundation1
);
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */ var _tslib = require("tslib");
var _foundation = require("@material/base/foundation");
var _constants = require("@material/list/constants");
var _foundation1 = require("@material/menu-surface/foundation");
var _constants1 = require("./constants");
var MDCMenuFoundation1 = function(_super) {
    _tslib.__extends(MDCMenuFoundation, _super);
    function MDCMenuFoundation(adapter) {
        var _this = _super.call(this, _tslib.__assign(_tslib.__assign({
        }, MDCMenuFoundation.defaultAdapter), adapter)) || this;
        _this.closeAnimationEndTimerId = 0;
        _this.defaultFocusState = _constants1.DefaultFocusState.LIST_ROOT;
        _this.selectedIndex = -1;
        return _this;
    }
    Object.defineProperty(MDCMenuFoundation, "cssClasses", {
        get: function() {
            return _constants1.cssClasses;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCMenuFoundation, "strings", {
        get: function() {
            return _constants1.strings;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCMenuFoundation, "numbers", {
        get: function() {
            return _constants1.numbers;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCMenuFoundation, "defaultAdapter", {
        /**
         * @see {@link MDCMenuAdapter} for typing information on parameters and return types.
         */ get: function() {
            // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
            return {
                addClassToElementAtIndex: function() {
                    return undefined;
                },
                removeClassFromElementAtIndex: function() {
                    return undefined;
                },
                addAttributeToElementAtIndex: function() {
                    return undefined;
                },
                removeAttributeFromElementAtIndex: function() {
                    return undefined;
                },
                getAttributeFromElementAtIndex: function() {
                    return null;
                },
                elementContainsClass: function() {
                    return false;
                },
                closeSurface: function() {
                    return undefined;
                },
                getElementIndex: function() {
                    return -1;
                },
                notifySelected: function() {
                    return undefined;
                },
                getMenuItemCount: function() {
                    return 0;
                },
                focusItemAtIndex: function() {
                    return undefined;
                },
                focusListRoot: function() {
                    return undefined;
                },
                getSelectedSiblingOfItemAtIndex: function() {
                    return -1;
                },
                isSelectableItemAtIndex: function() {
                    return false;
                }
            };
        // tslint:enable:object-literal-sort-keys
        },
        enumerable: false,
        configurable: true
    });
    MDCMenuFoundation.prototype.destroy = function() {
        if (this.closeAnimationEndTimerId) clearTimeout(this.closeAnimationEndTimerId);
        this.adapter.closeSurface();
    };
    MDCMenuFoundation.prototype.handleKeydown = function(evt) {
        var key = evt.key, keyCode = evt.keyCode;
        var isTab = key === 'Tab' || keyCode === 9;
        if (isTab) this.adapter.closeSurface(/** skipRestoreFocus */ true);
    };
    MDCMenuFoundation.prototype.handleItemAction = function(listItem) {
        var _this = this;
        var index = this.adapter.getElementIndex(listItem);
        if (index < 0) return;
        this.adapter.notifySelected({
            index: index
        });
        var skipRestoreFocus = this.adapter.getAttributeFromElementAtIndex(index, _constants1.strings.SKIP_RESTORE_FOCUS) === 'true';
        this.adapter.closeSurface(skipRestoreFocus);
        // Wait for the menu to close before adding/removing classes that affect styles.
        this.closeAnimationEndTimerId = setTimeout(function() {
            // Recompute the index in case the menu contents have changed.
            var recomputedIndex = _this.adapter.getElementIndex(listItem);
            if (recomputedIndex >= 0 && _this.adapter.isSelectableItemAtIndex(recomputedIndex)) _this.setSelectedIndex(recomputedIndex);
        }, _foundation1.MDCMenuSurfaceFoundation.numbers.TRANSITION_CLOSE_DURATION);
    };
    MDCMenuFoundation.prototype.handleMenuSurfaceOpened = function() {
        switch(this.defaultFocusState){
            case _constants1.DefaultFocusState.FIRST_ITEM:
                this.adapter.focusItemAtIndex(0);
                break;
            case _constants1.DefaultFocusState.LAST_ITEM:
                this.adapter.focusItemAtIndex(this.adapter.getMenuItemCount() - 1);
                break;
            case _constants1.DefaultFocusState.NONE:
                break;
            default:
                this.adapter.focusListRoot();
                break;
        }
    };
    /**
     * Sets default focus state where the menu should focus every time when menu
     * is opened. Focuses the list root (`DefaultFocusState.LIST_ROOT`) element by
     * default.
     */ MDCMenuFoundation.prototype.setDefaultFocusState = function(focusState) {
        this.defaultFocusState = focusState;
    };
    /** @return Index of the currently selected list item within the menu. */ MDCMenuFoundation.prototype.getSelectedIndex = function() {
        return this.selectedIndex;
    };
    /**
     * Selects the list item at `index` within the menu.
     * @param index Index of list item within the menu.
     */ MDCMenuFoundation.prototype.setSelectedIndex = function(index) {
        this.validatedIndex(index);
        if (!this.adapter.isSelectableItemAtIndex(index)) throw new Error('MDCMenuFoundation: No selection group at specified index.');
        var prevSelectedIndex = this.adapter.getSelectedSiblingOfItemAtIndex(index);
        if (prevSelectedIndex >= 0) {
            this.adapter.removeAttributeFromElementAtIndex(prevSelectedIndex, _constants1.strings.ARIA_CHECKED_ATTR);
            this.adapter.removeClassFromElementAtIndex(prevSelectedIndex, _constants1.cssClasses.MENU_SELECTED_LIST_ITEM);
        }
        this.adapter.addClassToElementAtIndex(index, _constants1.cssClasses.MENU_SELECTED_LIST_ITEM);
        this.adapter.addAttributeToElementAtIndex(index, _constants1.strings.ARIA_CHECKED_ATTR, 'true');
        this.selectedIndex = index;
    };
    /**
     * Sets the enabled state to isEnabled for the menu item at the given index.
     * @param index Index of the menu item
     * @param isEnabled The desired enabled state of the menu item.
     */ MDCMenuFoundation.prototype.setEnabled = function(index, isEnabled) {
        this.validatedIndex(index);
        if (isEnabled) {
            this.adapter.removeClassFromElementAtIndex(index, _constants.cssClasses.LIST_ITEM_DISABLED_CLASS);
            this.adapter.addAttributeToElementAtIndex(index, _constants1.strings.ARIA_DISABLED_ATTR, 'false');
        } else {
            this.adapter.addClassToElementAtIndex(index, _constants.cssClasses.LIST_ITEM_DISABLED_CLASS);
            this.adapter.addAttributeToElementAtIndex(index, _constants1.strings.ARIA_DISABLED_ATTR, 'true');
        }
    };
    MDCMenuFoundation.prototype.validatedIndex = function(index) {
        var menuSize = this.adapter.getMenuItemCount();
        var isIndexInRange = index >= 0 && index < menuSize;
        if (!isIndexInRange) throw new Error('MDCMenuFoundation: No list item at specified index.');
    };
    return MDCMenuFoundation;
}(_foundation.MDCFoundation);
exports.default = MDCMenuFoundation1;

},{"tslib":"j55WF","@material/base/foundation":"6nwGh","@material/list/constants":"6smap","@material/menu-surface/foundation":"6LTC9","./constants":"fqDlq","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"eJptm":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "MDCNotchedOutline", ()=>MDCNotchedOutline1
);
/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */ var _tslib = require("tslib");
var _component = require("@material/base/component");
var _foundation = require("@material/floating-label/foundation");
var _constants = require("./constants");
var _foundation1 = require("./foundation");
var MDCNotchedOutline1 = function(_super) {
    _tslib.__extends(MDCNotchedOutline, _super);
    function MDCNotchedOutline() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MDCNotchedOutline.attachTo = function(root) {
        return new MDCNotchedOutline(root);
    };
    MDCNotchedOutline.prototype.initialSyncWithDOM = function() {
        this.notchElement = this.root.querySelector(_constants.strings.NOTCH_ELEMENT_SELECTOR);
        var label = this.root.querySelector('.' + _foundation.MDCFloatingLabelFoundation.cssClasses.ROOT);
        if (label) {
            label.style.transitionDuration = '0s';
            this.root.classList.add(_constants.cssClasses.OUTLINE_UPGRADED);
            requestAnimationFrame(function() {
                label.style.transitionDuration = '';
            });
        } else this.root.classList.add(_constants.cssClasses.NO_LABEL);
    };
    /**
     * Updates classes and styles to open the notch to the specified width.
     * @param notchWidth The notch width in the outline.
     */ MDCNotchedOutline.prototype.notch = function(notchWidth) {
        this.foundation.notch(notchWidth);
    };
    /**
     * Updates classes and styles to close the notch.
     */ MDCNotchedOutline.prototype.closeNotch = function() {
        this.foundation.closeNotch();
    };
    MDCNotchedOutline.prototype.getDefaultFoundation = function() {
        var _this = this;
        // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
        // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
        // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
        var adapter = {
            addClass: function(className) {
                return _this.root.classList.add(className);
            },
            removeClass: function(className) {
                return _this.root.classList.remove(className);
            },
            setNotchWidthProperty: function(width) {
                _this.notchElement.style.setProperty('width', width + 'px');
            },
            removeNotchWidthProperty: function() {
                _this.notchElement.style.removeProperty('width');
            }
        };
        // tslint:enable:object-literal-sort-keys
        return new _foundation1.MDCNotchedOutlineFoundation(adapter);
    };
    return MDCNotchedOutline;
}(_component.MDCComponent);

},{"tslib":"j55WF","@material/base/component":"4ISbx","@material/floating-label/foundation":"aG8y8","./constants":"5LktA","./foundation":"eEMgd","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"5LktA":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "cssClasses", ()=>cssClasses
);
parcelHelpers.export(exports, "numbers", ()=>numbers
);
parcelHelpers.export(exports, "strings", ()=>strings
);
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */ var strings = {
    NOTCH_ELEMENT_SELECTOR: '.mdc-notched-outline__notch'
};
var numbers = {
    // This should stay in sync with $mdc-notched-outline-padding * 2.
    NOTCH_ELEMENT_PADDING: 8
};
var cssClasses = {
    NO_LABEL: 'mdc-notched-outline--no-label',
    OUTLINE_NOTCHED: 'mdc-notched-outline--notched',
    OUTLINE_UPGRADED: 'mdc-notched-outline--upgraded'
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"eEMgd":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "MDCNotchedOutlineFoundation", ()=>MDCNotchedOutlineFoundation1
);
/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */ var _tslib = require("tslib");
var _foundation = require("@material/base/foundation");
var _constants = require("./constants");
var MDCNotchedOutlineFoundation1 = function(_super) {
    _tslib.__extends(MDCNotchedOutlineFoundation, _super);
    function MDCNotchedOutlineFoundation(adapter) {
        return _super.call(this, _tslib.__assign(_tslib.__assign({
        }, MDCNotchedOutlineFoundation.defaultAdapter), adapter)) || this;
    }
    Object.defineProperty(MDCNotchedOutlineFoundation, "strings", {
        get: function() {
            return _constants.strings;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCNotchedOutlineFoundation, "cssClasses", {
        get: function() {
            return _constants.cssClasses;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCNotchedOutlineFoundation, "numbers", {
        get: function() {
            return _constants.numbers;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCNotchedOutlineFoundation, "defaultAdapter", {
        /**
         * See {@link MDCNotchedOutlineAdapter} for typing information on parameters and return types.
         */ get: function() {
            // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
            return {
                addClass: function() {
                    return undefined;
                },
                removeClass: function() {
                    return undefined;
                },
                setNotchWidthProperty: function() {
                    return undefined;
                },
                removeNotchWidthProperty: function() {
                    return undefined;
                }
            };
        // tslint:enable:object-literal-sort-keys
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Adds the outline notched selector and updates the notch width calculated based off of notchWidth.
     */ MDCNotchedOutlineFoundation.prototype.notch = function(notchWidth) {
        var OUTLINE_NOTCHED = MDCNotchedOutlineFoundation.cssClasses.OUTLINE_NOTCHED;
        if (notchWidth > 0) notchWidth += _constants.numbers.NOTCH_ELEMENT_PADDING; // Add padding from left/right.
        this.adapter.setNotchWidthProperty(notchWidth);
        this.adapter.addClass(OUTLINE_NOTCHED);
    };
    /**
     * Removes notched outline selector to close the notch in the outline.
     */ MDCNotchedOutlineFoundation.prototype.closeNotch = function() {
        var OUTLINE_NOTCHED = MDCNotchedOutlineFoundation.cssClasses.OUTLINE_NOTCHED;
        this.adapter.removeClass(OUTLINE_NOTCHED);
        this.adapter.removeNotchWidthProperty();
    };
    return MDCNotchedOutlineFoundation;
}(_foundation.MDCFoundation);
exports.default = MDCNotchedOutlineFoundation1;

},{"tslib":"j55WF","@material/base/foundation":"6nwGh","./constants":"5LktA","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"bKvZz":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "cssClasses", ()=>cssClasses
);
parcelHelpers.export(exports, "strings", ()=>strings
);
parcelHelpers.export(exports, "numbers", ()=>numbers
);
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */ var cssClasses = {
    ACTIVATED: 'mdc-select--activated',
    DISABLED: 'mdc-select--disabled',
    FOCUSED: 'mdc-select--focused',
    INVALID: 'mdc-select--invalid',
    MENU_INVALID: 'mdc-select__menu--invalid',
    OUTLINED: 'mdc-select--outlined',
    REQUIRED: 'mdc-select--required',
    ROOT: 'mdc-select',
    WITH_LEADING_ICON: 'mdc-select--with-leading-icon'
};
var strings = {
    ARIA_CONTROLS: 'aria-controls',
    ARIA_DESCRIBEDBY: 'aria-describedby',
    ARIA_SELECTED_ATTR: 'aria-selected',
    CHANGE_EVENT: 'MDCSelect:change',
    HIDDEN_INPUT_SELECTOR: 'input[type="hidden"]',
    LABEL_SELECTOR: '.mdc-floating-label',
    LEADING_ICON_SELECTOR: '.mdc-select__icon',
    LINE_RIPPLE_SELECTOR: '.mdc-line-ripple',
    MENU_SELECTOR: '.mdc-select__menu',
    OUTLINE_SELECTOR: '.mdc-notched-outline',
    SELECTED_TEXT_SELECTOR: '.mdc-select__selected-text',
    SELECT_ANCHOR_SELECTOR: '.mdc-select__anchor',
    VALUE_ATTR: 'data-value'
};
var numbers = {
    LABEL_SCALE: 0.75,
    UNSET_INDEX: -1,
    CLICK_DEBOUNCE_TIMEOUT_MS: 330
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"he4Oj":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "MDCSelectFoundation", ()=>MDCSelectFoundation1
);
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */ var _tslib = require("tslib");
var _foundation = require("@material/base/foundation");
var _keyboard = require("@material/dom/keyboard");
var _constants = require("@material/menu-surface/constants");
var _constants1 = require("./constants");
var MDCSelectFoundation1 = function(_super) {
    _tslib.__extends(MDCSelectFoundation, _super);
    /* istanbul ignore next: optional argument is not a branch statement */ /**
     * @param adapter
     * @param foundationMap Map from subcomponent names to their subfoundations.
     */ function MDCSelectFoundation(adapter, foundationMap) {
        if (foundationMap === void 0) foundationMap = {
        };
        var _this = _super.call(this, _tslib.__assign(_tslib.__assign({
        }, MDCSelectFoundation.defaultAdapter), adapter)) || this;
        // Disabled state
        _this.disabled = false;
        // isMenuOpen is used to track the state of the menu by listening to the
        // MDCMenuSurface:closed event For reference, menu.open will return false if
        // the menu is still closing, but isMenuOpen returns false only after the menu
        // has closed
        _this.isMenuOpen = false;
        // By default, select is invalid if it is required but no value is selected.
        _this.useDefaultValidation = true;
        _this.customValidity = true;
        _this.lastSelectedIndex = _constants1.numbers.UNSET_INDEX;
        _this.clickDebounceTimeout = 0;
        _this.recentlyClicked = false;
        _this.leadingIcon = foundationMap.leadingIcon;
        _this.helperText = foundationMap.helperText;
        return _this;
    }
    Object.defineProperty(MDCSelectFoundation, "cssClasses", {
        get: function() {
            return _constants1.cssClasses;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCSelectFoundation, "numbers", {
        get: function() {
            return _constants1.numbers;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCSelectFoundation, "strings", {
        get: function() {
            return _constants1.strings;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCSelectFoundation, "defaultAdapter", {
        /**
         * See {@link MDCSelectAdapter} for typing information on parameters and return types.
         */ get: function() {
            // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
            return {
                addClass: function() {
                    return undefined;
                },
                removeClass: function() {
                    return undefined;
                },
                hasClass: function() {
                    return false;
                },
                activateBottomLine: function() {
                    return undefined;
                },
                deactivateBottomLine: function() {
                    return undefined;
                },
                getSelectedIndex: function() {
                    return -1;
                },
                setSelectedIndex: function() {
                    return undefined;
                },
                hasLabel: function() {
                    return false;
                },
                floatLabel: function() {
                    return undefined;
                },
                getLabelWidth: function() {
                    return 0;
                },
                setLabelRequired: function() {
                    return undefined;
                },
                hasOutline: function() {
                    return false;
                },
                notchOutline: function() {
                    return undefined;
                },
                closeOutline: function() {
                    return undefined;
                },
                setRippleCenter: function() {
                    return undefined;
                },
                notifyChange: function() {
                    return undefined;
                },
                setSelectedText: function() {
                    return undefined;
                },
                isSelectAnchorFocused: function() {
                    return false;
                },
                getSelectAnchorAttr: function() {
                    return '';
                },
                setSelectAnchorAttr: function() {
                    return undefined;
                },
                removeSelectAnchorAttr: function() {
                    return undefined;
                },
                addMenuClass: function() {
                    return undefined;
                },
                removeMenuClass: function() {
                    return undefined;
                },
                openMenu: function() {
                    return undefined;
                },
                closeMenu: function() {
                    return undefined;
                },
                getAnchorElement: function() {
                    return null;
                },
                setMenuAnchorElement: function() {
                    return undefined;
                },
                setMenuAnchorCorner: function() {
                    return undefined;
                },
                setMenuWrapFocus: function() {
                    return undefined;
                },
                focusMenuItemAtIndex: function() {
                    return undefined;
                },
                getMenuItemCount: function() {
                    return 0;
                },
                getMenuItemValues: function() {
                    return [];
                },
                getMenuItemTextAtIndex: function() {
                    return '';
                },
                isTypeaheadInProgress: function() {
                    return false;
                },
                typeaheadMatchItem: function() {
                    return -1;
                }
            };
        // tslint:enable:object-literal-sort-keys
        },
        enumerable: false,
        configurable: true
    });
    /** Returns the index of the currently selected menu item, or -1 if none. */ MDCSelectFoundation.prototype.getSelectedIndex = function() {
        return this.adapter.getSelectedIndex();
    };
    MDCSelectFoundation.prototype.setSelectedIndex = function(index, closeMenu, skipNotify) {
        if (closeMenu === void 0) closeMenu = false;
        if (skipNotify === void 0) skipNotify = false;
        if (index >= this.adapter.getMenuItemCount()) return;
        if (index === _constants1.numbers.UNSET_INDEX) this.adapter.setSelectedText('');
        else this.adapter.setSelectedText(this.adapter.getMenuItemTextAtIndex(index).trim());
        this.adapter.setSelectedIndex(index);
        if (closeMenu) this.adapter.closeMenu();
        if (!skipNotify && this.lastSelectedIndex !== index) this.handleChange();
        this.lastSelectedIndex = index;
    };
    MDCSelectFoundation.prototype.setValue = function(value, skipNotify) {
        if (skipNotify === void 0) skipNotify = false;
        var index = this.adapter.getMenuItemValues().indexOf(value);
        this.setSelectedIndex(index, /** closeMenu */ false, skipNotify);
    };
    MDCSelectFoundation.prototype.getValue = function() {
        var index = this.adapter.getSelectedIndex();
        var menuItemValues = this.adapter.getMenuItemValues();
        return index !== _constants1.numbers.UNSET_INDEX ? menuItemValues[index] : '';
    };
    MDCSelectFoundation.prototype.getDisabled = function() {
        return this.disabled;
    };
    MDCSelectFoundation.prototype.setDisabled = function(isDisabled) {
        this.disabled = isDisabled;
        if (this.disabled) {
            this.adapter.addClass(_constants1.cssClasses.DISABLED);
            this.adapter.closeMenu();
        } else this.adapter.removeClass(_constants1.cssClasses.DISABLED);
        if (this.leadingIcon) this.leadingIcon.setDisabled(this.disabled);
        if (this.disabled) // Prevent click events from focusing select. Simply pointer-events: none
        // is not enough since screenreader clicks may bypass this.
        this.adapter.removeSelectAnchorAttr('tabindex');
        else this.adapter.setSelectAnchorAttr('tabindex', '0');
        this.adapter.setSelectAnchorAttr('aria-disabled', this.disabled.toString());
    };
    /** Opens the menu. */ MDCSelectFoundation.prototype.openMenu = function() {
        this.adapter.addClass(_constants1.cssClasses.ACTIVATED);
        this.adapter.openMenu();
        this.isMenuOpen = true;
        this.adapter.setSelectAnchorAttr('aria-expanded', 'true');
    };
    /**
     * @param content Sets the content of the helper text.
     */ MDCSelectFoundation.prototype.setHelperTextContent = function(content) {
        if (this.helperText) this.helperText.setContent(content);
    };
    /**
     * Re-calculates if the notched outline should be notched and if the label
     * should float.
     */ MDCSelectFoundation.prototype.layout = function() {
        if (this.adapter.hasLabel()) {
            var optionHasValue = this.getValue().length > 0;
            var isFocused = this.adapter.hasClass(_constants1.cssClasses.FOCUSED);
            var shouldFloatAndNotch = optionHasValue || isFocused;
            var isRequired = this.adapter.hasClass(_constants1.cssClasses.REQUIRED);
            this.notchOutline(shouldFloatAndNotch);
            this.adapter.floatLabel(shouldFloatAndNotch);
            this.adapter.setLabelRequired(isRequired);
        }
    };
    /**
     * Synchronizes the list of options with the state of the foundation. Call
     * this whenever menu options are dynamically updated.
     */ MDCSelectFoundation.prototype.layoutOptions = function() {
        var menuItemValues = this.adapter.getMenuItemValues();
        var selectedIndex = menuItemValues.indexOf(this.getValue());
        this.setSelectedIndex(selectedIndex, /** closeMenu */ false, /** skipNotify */ true);
    };
    MDCSelectFoundation.prototype.handleMenuOpened = function() {
        if (this.adapter.getMenuItemValues().length === 0) return;
        // Menu should open to the last selected element, should open to first menu item otherwise.
        var selectedIndex = this.getSelectedIndex();
        var focusItemIndex = selectedIndex >= 0 ? selectedIndex : 0;
        this.adapter.focusMenuItemAtIndex(focusItemIndex);
    };
    MDCSelectFoundation.prototype.handleMenuClosing = function() {
        this.adapter.setSelectAnchorAttr('aria-expanded', 'false');
    };
    MDCSelectFoundation.prototype.handleMenuClosed = function() {
        this.adapter.removeClass(_constants1.cssClasses.ACTIVATED);
        this.isMenuOpen = false;
        // Unfocus the select if menu is closed without a selection
        if (!this.adapter.isSelectAnchorFocused()) this.blur();
    };
    /**
     * Handles value changes, via change event or programmatic updates.
     */ MDCSelectFoundation.prototype.handleChange = function() {
        this.layout();
        this.adapter.notifyChange(this.getValue());
        var isRequired = this.adapter.hasClass(_constants1.cssClasses.REQUIRED);
        if (isRequired && this.useDefaultValidation) this.setValid(this.isValid());
    };
    MDCSelectFoundation.prototype.handleMenuItemAction = function(index) {
        this.setSelectedIndex(index, /** closeMenu */ true);
    };
    /**
     * Handles focus events from select element.
     */ MDCSelectFoundation.prototype.handleFocus = function() {
        this.adapter.addClass(_constants1.cssClasses.FOCUSED);
        this.layout();
        this.adapter.activateBottomLine();
    };
    /**
     * Handles blur events from select element.
     */ MDCSelectFoundation.prototype.handleBlur = function() {
        if (this.isMenuOpen) return;
        this.blur();
    };
    MDCSelectFoundation.prototype.handleClick = function(normalizedX) {
        if (this.disabled || this.recentlyClicked) return;
        this.setClickDebounceTimeout();
        if (this.isMenuOpen) {
            this.adapter.closeMenu();
            return;
        }
        this.adapter.setRippleCenter(normalizedX);
        this.openMenu();
    };
    /**
     * Handles keydown events on select element. Depending on the type of
     * character typed, does typeahead matching or opens menu.
     */ MDCSelectFoundation.prototype.handleKeydown = function(event) {
        if (this.isMenuOpen || !this.adapter.hasClass(_constants1.cssClasses.FOCUSED)) return;
        var isEnter = _keyboard.normalizeKey(event) === _keyboard.KEY.ENTER;
        var isSpace = _keyboard.normalizeKey(event) === _keyboard.KEY.SPACEBAR;
        var arrowUp = _keyboard.normalizeKey(event) === _keyboard.KEY.ARROW_UP;
        var arrowDown = _keyboard.normalizeKey(event) === _keyboard.KEY.ARROW_DOWN;
        var isModifier = event.ctrlKey || event.metaKey;
        // Typeahead
        if (!isModifier && (!isSpace && event.key && event.key.length === 1 || isSpace && this.adapter.isTypeaheadInProgress())) {
            var key = isSpace ? ' ' : event.key;
            var typeaheadNextIndex = this.adapter.typeaheadMatchItem(key, this.getSelectedIndex());
            if (typeaheadNextIndex >= 0) this.setSelectedIndex(typeaheadNextIndex);
            event.preventDefault();
            return;
        }
        if (!isEnter && !isSpace && !arrowUp && !arrowDown) return;
        // Increment/decrement index as necessary and open menu.
        if (arrowUp && this.getSelectedIndex() > 0) this.setSelectedIndex(this.getSelectedIndex() - 1);
        else if (arrowDown && this.getSelectedIndex() < this.adapter.getMenuItemCount() - 1) this.setSelectedIndex(this.getSelectedIndex() + 1);
        this.openMenu();
        event.preventDefault();
    };
    /**
     * Opens/closes the notched outline.
     */ MDCSelectFoundation.prototype.notchOutline = function(openNotch) {
        if (!this.adapter.hasOutline()) return;
        var isFocused = this.adapter.hasClass(_constants1.cssClasses.FOCUSED);
        if (openNotch) {
            var labelScale = _constants1.numbers.LABEL_SCALE;
            var labelWidth = this.adapter.getLabelWidth() * labelScale;
            this.adapter.notchOutline(labelWidth);
        } else if (!isFocused) this.adapter.closeOutline();
    };
    /**
     * Sets the aria label of the leading icon.
     */ MDCSelectFoundation.prototype.setLeadingIconAriaLabel = function(label) {
        if (this.leadingIcon) this.leadingIcon.setAriaLabel(label);
    };
    /**
     * Sets the text content of the leading icon.
     */ MDCSelectFoundation.prototype.setLeadingIconContent = function(content) {
        if (this.leadingIcon) this.leadingIcon.setContent(content);
    };
    MDCSelectFoundation.prototype.getUseDefaultValidation = function() {
        return this.useDefaultValidation;
    };
    MDCSelectFoundation.prototype.setUseDefaultValidation = function(useDefaultValidation) {
        this.useDefaultValidation = useDefaultValidation;
    };
    MDCSelectFoundation.prototype.setValid = function(isValid) {
        if (!this.useDefaultValidation) this.customValidity = isValid;
        this.adapter.setSelectAnchorAttr('aria-invalid', (!isValid).toString());
        if (isValid) {
            this.adapter.removeClass(_constants1.cssClasses.INVALID);
            this.adapter.removeMenuClass(_constants1.cssClasses.MENU_INVALID);
        } else {
            this.adapter.addClass(_constants1.cssClasses.INVALID);
            this.adapter.addMenuClass(_constants1.cssClasses.MENU_INVALID);
        }
        this.syncHelperTextValidity(isValid);
    };
    MDCSelectFoundation.prototype.isValid = function() {
        if (this.useDefaultValidation && this.adapter.hasClass(_constants1.cssClasses.REQUIRED) && !this.adapter.hasClass(_constants1.cssClasses.DISABLED)) // See notes for required attribute under https://www.w3.org/TR/html52/sec-forms.html#the-select-element
        // TL;DR: Invalid if no index is selected, or if the first index is selected and has an empty value.
        return this.getSelectedIndex() !== _constants1.numbers.UNSET_INDEX && (this.getSelectedIndex() !== 0 || Boolean(this.getValue()));
        return this.customValidity;
    };
    MDCSelectFoundation.prototype.setRequired = function(isRequired) {
        if (isRequired) this.adapter.addClass(_constants1.cssClasses.REQUIRED);
        else this.adapter.removeClass(_constants1.cssClasses.REQUIRED);
        this.adapter.setSelectAnchorAttr('aria-required', isRequired.toString());
        this.adapter.setLabelRequired(isRequired);
    };
    MDCSelectFoundation.prototype.getRequired = function() {
        return this.adapter.getSelectAnchorAttr('aria-required') === 'true';
    };
    MDCSelectFoundation.prototype.init = function() {
        var anchorEl = this.adapter.getAnchorElement();
        if (anchorEl) {
            this.adapter.setMenuAnchorElement(anchorEl);
            this.adapter.setMenuAnchorCorner(_constants.Corner.BOTTOM_START);
        }
        this.adapter.setMenuWrapFocus(false);
        this.setDisabled(this.adapter.hasClass(_constants1.cssClasses.DISABLED));
        this.syncHelperTextValidity(!this.adapter.hasClass(_constants1.cssClasses.INVALID));
        this.layout();
        this.layoutOptions();
    };
    /**
     * Unfocuses the select component.
     */ MDCSelectFoundation.prototype.blur = function() {
        this.adapter.removeClass(_constants1.cssClasses.FOCUSED);
        this.layout();
        this.adapter.deactivateBottomLine();
        var isRequired = this.adapter.hasClass(_constants1.cssClasses.REQUIRED);
        if (isRequired && this.useDefaultValidation) this.setValid(this.isValid());
    };
    MDCSelectFoundation.prototype.syncHelperTextValidity = function(isValid) {
        if (!this.helperText) return;
        this.helperText.setValidity(isValid);
        var helperTextVisible = this.helperText.isVisible();
        var helperTextId = this.helperText.getId();
        if (helperTextVisible && helperTextId) this.adapter.setSelectAnchorAttr(_constants1.strings.ARIA_DESCRIBEDBY, helperTextId);
        else // Needed because screenreaders will read labels pointed to by
        // `aria-describedby` even if they are `aria-hidden`.
        this.adapter.removeSelectAnchorAttr(_constants1.strings.ARIA_DESCRIBEDBY);
    };
    MDCSelectFoundation.prototype.setClickDebounceTimeout = function() {
        var _this = this;
        clearTimeout(this.clickDebounceTimeout);
        this.clickDebounceTimeout = setTimeout(function() {
            _this.recentlyClicked = false;
        }, _constants1.numbers.CLICK_DEBOUNCE_TIMEOUT_MS);
        this.recentlyClicked = true;
    };
    return MDCSelectFoundation;
}(_foundation.MDCFoundation);
exports.default = MDCSelectFoundation1;

},{"tslib":"j55WF","@material/base/foundation":"6nwGh","@material/dom/keyboard":"f68aW","@material/menu-surface/constants":"ilumG","./constants":"bKvZz","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"8B1ww":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "MDCSelectHelperText", ()=>MDCSelectHelperText1
);
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */ var _tslib = require("tslib");
var _component = require("@material/base/component");
var _foundation = require("./foundation");
var MDCSelectHelperText1 = function(_super) {
    _tslib.__extends(MDCSelectHelperText, _super);
    function MDCSelectHelperText() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MDCSelectHelperText.attachTo = function(root) {
        return new MDCSelectHelperText(root);
    };
    Object.defineProperty(MDCSelectHelperText.prototype, "foundationForSelect", {
        // Provided for access by MDCSelect component
        get: function() {
            return this.foundation;
        },
        enumerable: false,
        configurable: true
    });
    MDCSelectHelperText.prototype.getDefaultFoundation = function() {
        var _this = this;
        // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
        // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
        // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
        var adapter = {
            addClass: function(className) {
                return _this.root.classList.add(className);
            },
            removeClass: function(className) {
                return _this.root.classList.remove(className);
            },
            hasClass: function(className) {
                return _this.root.classList.contains(className);
            },
            getAttr: function(attr) {
                return _this.root.getAttribute(attr);
            },
            setAttr: function(attr, value) {
                return _this.root.setAttribute(attr, value);
            },
            removeAttr: function(attr) {
                return _this.root.removeAttribute(attr);
            },
            setContent: function(content) {
                _this.root.textContent = content;
            }
        };
        // tslint:enable:object-literal-sort-keys
        return new _foundation.MDCSelectHelperTextFoundation(adapter);
    };
    return MDCSelectHelperText;
}(_component.MDCComponent);

},{"tslib":"j55WF","@material/base/component":"4ISbx","./foundation":"9AbIG","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"9AbIG":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "MDCSelectHelperTextFoundation", ()=>MDCSelectHelperTextFoundation1
);
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */ var _tslib = require("tslib");
var _foundation = require("@material/base/foundation");
var _constants = require("./constants");
var MDCSelectHelperTextFoundation1 = function(_super) {
    _tslib.__extends(MDCSelectHelperTextFoundation, _super);
    function MDCSelectHelperTextFoundation(adapter) {
        return _super.call(this, _tslib.__assign(_tslib.__assign({
        }, MDCSelectHelperTextFoundation.defaultAdapter), adapter)) || this;
    }
    Object.defineProperty(MDCSelectHelperTextFoundation, "cssClasses", {
        get: function() {
            return _constants.cssClasses;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCSelectHelperTextFoundation, "strings", {
        get: function() {
            return _constants.strings;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCSelectHelperTextFoundation, "defaultAdapter", {
        /**
         * See {@link MDCSelectHelperTextAdapter} for typing information on parameters and return types.
         */ get: function() {
            // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
            return {
                addClass: function() {
                    return undefined;
                },
                removeClass: function() {
                    return undefined;
                },
                hasClass: function() {
                    return false;
                },
                setAttr: function() {
                    return undefined;
                },
                getAttr: function() {
                    return null;
                },
                removeAttr: function() {
                    return undefined;
                },
                setContent: function() {
                    return undefined;
                }
            };
        // tslint:enable:object-literal-sort-keys
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @return The ID of the helper text, or null if none is set.
     */ MDCSelectHelperTextFoundation.prototype.getId = function() {
        return this.adapter.getAttr('id');
    };
    /**
     * @return Whether the helper text is currently visible.
     */ MDCSelectHelperTextFoundation.prototype.isVisible = function() {
        return this.adapter.getAttr(_constants.strings.ARIA_HIDDEN) !== 'true';
    };
    /**
     * Sets the content of the helper text field.
     */ MDCSelectHelperTextFoundation.prototype.setContent = function(content) {
        this.adapter.setContent(content);
    };
    /**
     * Sets the helper text to act as a validation message.
     * By default, validation messages are hidden when the select is valid and
     * visible when the select is invalid.
     *
     * @param isValidation True to make the helper text act as an error validation
     *     message.
     */ MDCSelectHelperTextFoundation.prototype.setValidation = function(isValidation) {
        if (isValidation) this.adapter.addClass(_constants.cssClasses.HELPER_TEXT_VALIDATION_MSG);
        else this.adapter.removeClass(_constants.cssClasses.HELPER_TEXT_VALIDATION_MSG);
    };
    /**
     * Sets the persistency of the validation helper text.
     * This keeps the validation message visible even if the select is valid,
     * though it will be displayed in the normal (grey) color.
     */ MDCSelectHelperTextFoundation.prototype.setValidationMsgPersistent = function(isPersistent) {
        if (isPersistent) this.adapter.addClass(_constants.cssClasses.HELPER_TEXT_VALIDATION_MSG_PERSISTENT);
        else this.adapter.removeClass(_constants.cssClasses.HELPER_TEXT_VALIDATION_MSG_PERSISTENT);
    };
    /**
     * When acting as a validation message, shows/hides the helper text and
     * triggers alerts as necessary based on the select's validity.
     */ MDCSelectHelperTextFoundation.prototype.setValidity = function(selectIsValid) {
        var isValidationMsg = this.adapter.hasClass(_constants.cssClasses.HELPER_TEXT_VALIDATION_MSG);
        if (!isValidationMsg) // Non-validating helper-text is always displayed and does not participate
        // in validation logic.
        return;
        var isPersistentValidationMsg = this.adapter.hasClass(_constants.cssClasses.HELPER_TEXT_VALIDATION_MSG_PERSISTENT);
        // Validating helper text is displayed if select is invalid, unless it is
        // set as persistent, in which case it always displays.
        var msgShouldDisplay = !selectIsValid || isPersistentValidationMsg;
        if (msgShouldDisplay) {
            this.showToScreenReader();
            // In addition to displaying, also trigger an alert if the select
            // has become invalid.
            if (!selectIsValid) this.adapter.setAttr(_constants.strings.ROLE, 'alert');
            else this.adapter.removeAttr(_constants.strings.ROLE);
            return;
        }
        // Hide everything.
        this.adapter.removeAttr(_constants.strings.ROLE);
        this.hide();
    };
    /**
     * Makes the helper text visible to screen readers.
     */ MDCSelectHelperTextFoundation.prototype.showToScreenReader = function() {
        this.adapter.removeAttr(_constants.strings.ARIA_HIDDEN);
    };
    /**
     * Hides the help text from screen readers.
     */ MDCSelectHelperTextFoundation.prototype.hide = function() {
        this.adapter.setAttr(_constants.strings.ARIA_HIDDEN, 'true');
    };
    return MDCSelectHelperTextFoundation;
}(_foundation.MDCFoundation);
exports.default = MDCSelectHelperTextFoundation1;

},{"tslib":"j55WF","@material/base/foundation":"6nwGh","./constants":"566Cl","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"566Cl":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "strings", ()=>strings
);
parcelHelpers.export(exports, "cssClasses", ()=>cssClasses
);
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */ var strings = {
    ARIA_HIDDEN: 'aria-hidden',
    ROLE: 'role'
};
var cssClasses = {
    HELPER_TEXT_VALIDATION_MSG: 'mdc-select-helper-text--validation-msg',
    HELPER_TEXT_VALIDATION_MSG_PERSISTENT: 'mdc-select-helper-text--validation-msg-persistent'
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"khQc1":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "MDCSelectIcon", ()=>MDCSelectIcon1
);
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */ var _tslib = require("tslib");
var _component = require("@material/base/component");
var _foundation = require("./foundation");
var MDCSelectIcon1 = function(_super) {
    _tslib.__extends(MDCSelectIcon, _super);
    function MDCSelectIcon() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MDCSelectIcon.attachTo = function(root) {
        return new MDCSelectIcon(root);
    };
    Object.defineProperty(MDCSelectIcon.prototype, "foundationForSelect", {
        // Provided for access by MDCSelect component
        get: function() {
            return this.foundation;
        },
        enumerable: false,
        configurable: true
    });
    MDCSelectIcon.prototype.getDefaultFoundation = function() {
        var _this = this;
        // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
        // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
        // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
        var adapter = {
            getAttr: function(attr) {
                return _this.root.getAttribute(attr);
            },
            setAttr: function(attr, value) {
                return _this.root.setAttribute(attr, value);
            },
            removeAttr: function(attr) {
                return _this.root.removeAttribute(attr);
            },
            setContent: function(content) {
                _this.root.textContent = content;
            },
            registerInteractionHandler: function(evtType, handler) {
                return _this.listen(evtType, handler);
            },
            deregisterInteractionHandler: function(evtType, handler) {
                return _this.unlisten(evtType, handler);
            },
            notifyIconAction: function() {
                return _this.emit(_foundation.MDCSelectIconFoundation.strings.ICON_EVENT, {
                } /* evtData */ , true);
            }
        };
        // tslint:enable:object-literal-sort-keys
        return new _foundation.MDCSelectIconFoundation(adapter);
    };
    return MDCSelectIcon;
}(_component.MDCComponent);

},{"tslib":"j55WF","@material/base/component":"4ISbx","./foundation":"giM8j","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"giM8j":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "MDCSelectIconFoundation", ()=>MDCSelectIconFoundation1
);
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */ var _tslib = require("tslib");
var _foundation = require("@material/base/foundation");
var _constants = require("./constants");
var INTERACTION_EVENTS = [
    'click',
    'keydown'
];
var MDCSelectIconFoundation1 = function(_super) {
    _tslib.__extends(MDCSelectIconFoundation, _super);
    function MDCSelectIconFoundation(adapter) {
        var _this = _super.call(this, _tslib.__assign(_tslib.__assign({
        }, MDCSelectIconFoundation.defaultAdapter), adapter)) || this;
        _this.savedTabIndex = null;
        _this.interactionHandler = function(evt) {
            _this.handleInteraction(evt);
        };
        return _this;
    }
    Object.defineProperty(MDCSelectIconFoundation, "strings", {
        get: function() {
            return _constants.strings;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCSelectIconFoundation, "defaultAdapter", {
        /**
         * See {@link MDCSelectIconAdapter} for typing information on parameters and return types.
         */ get: function() {
            // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
            return {
                getAttr: function() {
                    return null;
                },
                setAttr: function() {
                    return undefined;
                },
                removeAttr: function() {
                    return undefined;
                },
                setContent: function() {
                    return undefined;
                },
                registerInteractionHandler: function() {
                    return undefined;
                },
                deregisterInteractionHandler: function() {
                    return undefined;
                },
                notifyIconAction: function() {
                    return undefined;
                }
            };
        // tslint:enable:object-literal-sort-keys
        },
        enumerable: false,
        configurable: true
    });
    MDCSelectIconFoundation.prototype.init = function() {
        var e_1, _a;
        this.savedTabIndex = this.adapter.getAttr('tabindex');
        try {
            for(var INTERACTION_EVENTS_1 = _tslib.__values(INTERACTION_EVENTS), INTERACTION_EVENTS_1_1 = INTERACTION_EVENTS_1.next(); !INTERACTION_EVENTS_1_1.done; INTERACTION_EVENTS_1_1 = INTERACTION_EVENTS_1.next()){
                var evtType = INTERACTION_EVENTS_1_1.value;
                this.adapter.registerInteractionHandler(evtType, this.interactionHandler);
            }
        } catch (e_1_1) {
            e_1 = {
                error: e_1_1
            };
        } finally{
            try {
                if (INTERACTION_EVENTS_1_1 && !INTERACTION_EVENTS_1_1.done && (_a = INTERACTION_EVENTS_1.return)) _a.call(INTERACTION_EVENTS_1);
            } finally{
                if (e_1) throw e_1.error;
            }
        }
    };
    MDCSelectIconFoundation.prototype.destroy = function() {
        var e_2, _a;
        try {
            for(var INTERACTION_EVENTS_2 = _tslib.__values(INTERACTION_EVENTS), INTERACTION_EVENTS_2_1 = INTERACTION_EVENTS_2.next(); !INTERACTION_EVENTS_2_1.done; INTERACTION_EVENTS_2_1 = INTERACTION_EVENTS_2.next()){
                var evtType = INTERACTION_EVENTS_2_1.value;
                this.adapter.deregisterInteractionHandler(evtType, this.interactionHandler);
            }
        } catch (e_2_1) {
            e_2 = {
                error: e_2_1
            };
        } finally{
            try {
                if (INTERACTION_EVENTS_2_1 && !INTERACTION_EVENTS_2_1.done && (_a = INTERACTION_EVENTS_2.return)) _a.call(INTERACTION_EVENTS_2);
            } finally{
                if (e_2) throw e_2.error;
            }
        }
    };
    MDCSelectIconFoundation.prototype.setDisabled = function(disabled) {
        if (!this.savedTabIndex) return;
        if (disabled) {
            this.adapter.setAttr('tabindex', '-1');
            this.adapter.removeAttr('role');
        } else {
            this.adapter.setAttr('tabindex', this.savedTabIndex);
            this.adapter.setAttr('role', _constants.strings.ICON_ROLE);
        }
    };
    MDCSelectIconFoundation.prototype.setAriaLabel = function(label) {
        this.adapter.setAttr('aria-label', label);
    };
    MDCSelectIconFoundation.prototype.setContent = function(content) {
        this.adapter.setContent(content);
    };
    MDCSelectIconFoundation.prototype.handleInteraction = function(evt) {
        var isEnterKey = evt.key === 'Enter' || evt.keyCode === 13;
        if (evt.type === 'click' || isEnterKey) this.adapter.notifyIconAction();
    };
    return MDCSelectIconFoundation;
}(_foundation.MDCFoundation);
exports.default = MDCSelectIconFoundation1;

},{"tslib":"j55WF","@material/base/foundation":"6nwGh","./constants":"f8hvG","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"f8hvG":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "strings", ()=>strings
);
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */ var strings = {
    ICON_EVENT: 'MDCSelect:icon',
    ICON_ROLE: 'button'
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"jo44u":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"51nbW":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "helperTextCssClasses", ()=>_constants.cssClasses
);
parcelHelpers.export(exports, "helperTextStrings", ()=>_constants.strings
);
/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */ var _adapter = require("./adapter");
parcelHelpers.exportAll(_adapter, exports);
var _component = require("./component");
parcelHelpers.exportAll(_component, exports);
var _foundation = require("./foundation");
parcelHelpers.exportAll(_foundation, exports);
var _constants = require("./constants");

},{"./adapter":"ebFEZ","./component":"8B1ww","./foundation":"9AbIG","./constants":"566Cl","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"ebFEZ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"l5b0W":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "iconStrings", ()=>_constants.strings
);
/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */ var _adapter = require("./adapter");
parcelHelpers.exportAll(_adapter, exports);
var _component = require("./component");
parcelHelpers.exportAll(_component, exports);
var _foundation = require("./foundation");
parcelHelpers.exportAll(_foundation, exports);
var _constants = require("./constants");

},{"./adapter":"7tVWd","./component":"khQc1","./foundation":"giM8j","./constants":"f8hvG","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"7tVWd":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"kFciu":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _mithril = require("mithril");
var _mithrilDefault = parcelHelpers.interopDefault(_mithril);
var _circularProgress = require("@material/circular-progress");
var _services = require("../../services");
class Spinner {
    constructor(){
        this.randomId = 'u' + _services.UUID.uuidv4().substring(0, 8);
    }
    oncreate() {
        try {
            this.mdcInstance = new _circularProgress.MDCCircularProgress(document.getElementById(this.randomId));
        } catch (e) {
        }
    }
    view() {
        return _mithrilDefault.default('[', null, _mithrilDefault.default("div", {
            id: this.randomId,
            class: "mdc-circular-progress mdc-circular-progress--indeterminate",
            style: "width:48px;height:48px;",
            role: "progressbar",
            "aria-label": "Example Progress Bar",
            "aria-valuemin": "0",
            "aria-valuemax": "1"
        }, _mithrilDefault.default("div", {
            class: "mdc-circular-progress__determinate-container"
        }, _mithrilDefault.default("svg", {
            class: "mdc-circular-progress__determinate-circle-graphic",
            viewBox: "0 0 48 48",
            xmlns: "http://www.w3.org/2000/svg"
        }, _mithrilDefault.default("circle", {
            class: "mdc-circular-progress__determinate-track",
            cx: "24",
            cy: "24",
            r: "18",
            "stroke-width": "4"
        }), _mithrilDefault.default("circle", {
            class: "mdc-circular-progress__determinate-circle",
            cx: "24",
            cy: "24",
            r: "18",
            "stroke-dasharray": "113.097",
            "stroke-dashoffset": "113.097",
            "stroke-width": "4"
        }))), _mithrilDefault.default("div", {
            class: "mdc-circular-progress__indeterminate-container"
        }, _mithrilDefault.default("div", {
            class: "mdc-circular-progress__spinner-layer"
        }, _mithrilDefault.default("div", {
            class: "mdc-circular-progress__circle-clipper mdc-circular-progress__circle-left"
        }, _mithrilDefault.default("svg", {
            class: "mdc-circular-progress__indeterminate-circle-graphic",
            viewBox: "0 0 48 48",
            xmlns: "http://www.w3.org/2000/svg"
        }, _mithrilDefault.default("circle", {
            cx: "24",
            cy: "24",
            r: "18",
            "stroke-dasharray": "113.097",
            "stroke-dashoffset": "56.549",
            "stroke-width": "4"
        }))), _mithrilDefault.default("div", {
            class: "mdc-circular-progress__gap-patch"
        }, _mithrilDefault.default("svg", {
            class: "mdc-circular-progress__indeterminate-circle-graphic",
            viewBox: "0 0 48 48",
            xmlns: "http://www.w3.org/2000/svg"
        }, _mithrilDefault.default("circle", {
            cx: "24",
            cy: "24",
            r: "18",
            "stroke-dasharray": "113.097",
            "stroke-dashoffset": "56.549",
            "stroke-width": "3.2"
        }))), _mithrilDefault.default("div", {
            class: "mdc-circular-progress__circle-clipper mdc-circular-progress__circle-right"
        }, _mithrilDefault.default("svg", {
            class: "mdc-circular-progress__indeterminate-circle-graphic",
            viewBox: "0 0 48 48",
            xmlns: "http://www.w3.org/2000/svg"
        }, _mithrilDefault.default("circle", {
            cx: "24",
            cy: "24",
            r: "18",
            "stroke-dasharray": "113.097",
            "stroke-dashoffset": "56.549",
            "stroke-width": "4"
        })))))));
    }
}
module.exports = Spinner;

},{"mithril":"a7UJj","@material/circular-progress":"hslI1","../../services":"5OF80","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"hslI1":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * @license
 * Copyright 2020 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */ var _adapter = require("./adapter");
parcelHelpers.exportAll(_adapter, exports);
var _component = require("./component");
parcelHelpers.exportAll(_component, exports);
var _constants = require("./constants");
parcelHelpers.exportAll(_constants, exports);
var _foundation = require("./foundation");
parcelHelpers.exportAll(_foundation, exports);

},{"./adapter":"iUIZz","./component":"d85xN","./constants":"d0onw","./foundation":"2k0Pz","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"iUIZz":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"d85xN":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "MDCCircularProgress", ()=>MDCCircularProgress1
);
/**
 * @license
 * Copyright 2020 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */ var _tslib = require("tslib");
var _component = require("@material/base/component");
var _foundation = require("./foundation");
var MDCCircularProgress1 = function(_super) {
    _tslib.__extends(MDCCircularProgress, _super);
    function MDCCircularProgress() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MDCCircularProgress.prototype.initialize = function() {
        this.determinateCircle = this.root.querySelector(_foundation.MDCCircularProgressFoundation.strings.DETERMINATE_CIRCLE_SELECTOR);
    };
    MDCCircularProgress.attachTo = function(root) {
        return new MDCCircularProgress(root);
    };
    Object.defineProperty(MDCCircularProgress.prototype, "determinate", {
        /**
         * Sets whether the progress indicator is in determinate mode.
         * @param isDeterminate Whether the indicator should be determinate.
         */ set: function(value) {
            this.foundation.setDeterminate(value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCCircularProgress.prototype, "progress", {
        /**
         * Sets the current progress value. In indeterminate mode, this has no
         * visual effect but will be reflected if the indicator is switched to
         * determinate mode.
         * @param value The current progress value, which must be between 0 and 1.
         */ set: function(value) {
            this.foundation.setProgress(value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCCircularProgress.prototype, "isClosed", {
        /**
         * Whether the progress indicator is hidden.
         */ get: function() {
            return this.foundation.isClosed();
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Shows the progress indicator.
     */ MDCCircularProgress.prototype.open = function() {
        this.foundation.open();
    };
    /**
     * Hides the progress indicator.
     */ MDCCircularProgress.prototype.close = function() {
        this.foundation.close();
    };
    MDCCircularProgress.prototype.getDefaultFoundation = function() {
        var _this = this;
        // DO NOT INLINE this variable. For backward compatibility, foundations take
        // a Partial<MDCFooAdapter>. To ensure we don't accidentally omit any
        // methods, we need a separate, strongly typed adapter variable.
        var adapter = {
            addClass: function(className) {
                _this.root.classList.add(className);
            },
            getDeterminateCircleAttribute: function(attributeName) {
                return _this.determinateCircle.getAttribute(attributeName);
            },
            hasClass: function(className) {
                return _this.root.classList.contains(className);
            },
            removeClass: function(className) {
                _this.root.classList.remove(className);
            },
            removeAttribute: function(attributeName) {
                _this.root.removeAttribute(attributeName);
            },
            setAttribute: function(attributeName, value) {
                _this.root.setAttribute(attributeName, value);
            },
            setDeterminateCircleAttribute: function(attributeName, value) {
                _this.determinateCircle.setAttribute(attributeName, value);
            }
        };
        return new _foundation.MDCCircularProgressFoundation(adapter);
    };
    return MDCCircularProgress;
}(_component.MDCComponent);

},{"tslib":"j55WF","@material/base/component":"4ISbx","./foundation":"2k0Pz","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"2k0Pz":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "MDCCircularProgressFoundation", ()=>MDCCircularProgressFoundation1
);
/**
 * @license
 * Copyright 2020 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */ var _tslib = require("tslib");
var _foundation = require("@material/base/foundation");
var _constants = require("./constants");
var MDCCircularProgressFoundation1 = function(_super) {
    _tslib.__extends(MDCCircularProgressFoundation, _super);
    function MDCCircularProgressFoundation(adapter) {
        return _super.call(this, _tslib.__assign(_tslib.__assign({
        }, MDCCircularProgressFoundation.defaultAdapter), adapter)) || this;
    }
    Object.defineProperty(MDCCircularProgressFoundation, "cssClasses", {
        get: function() {
            return _constants.cssClasses;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCCircularProgressFoundation, "strings", {
        get: function() {
            return _constants.strings;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCCircularProgressFoundation, "defaultAdapter", {
        get: function() {
            return {
                addClass: function() {
                    return undefined;
                },
                getDeterminateCircleAttribute: function() {
                    return null;
                },
                hasClass: function() {
                    return false;
                },
                removeClass: function() {
                    return undefined;
                },
                removeAttribute: function() {
                    return undefined;
                },
                setAttribute: function() {
                    return undefined;
                },
                setDeterminateCircleAttribute: function() {
                    return undefined;
                }
            };
        },
        enumerable: false,
        configurable: true
    });
    MDCCircularProgressFoundation.prototype.init = function() {
        this.closed = this.adapter.hasClass(_constants.cssClasses.CLOSED_CLASS);
        this.determinate = !this.adapter.hasClass(_constants.cssClasses.INDETERMINATE_CLASS);
        this.progress = 0;
        if (this.determinate) this.adapter.setAttribute(_constants.strings.ARIA_VALUENOW, this.progress.toString());
        this.radius = Number(this.adapter.getDeterminateCircleAttribute(_constants.strings.RADIUS));
    };
    /**
     * Sets whether the progress indicator is in determinate mode.
     * @param determinate Whether the indicator should be determinate.
     */ MDCCircularProgressFoundation.prototype.setDeterminate = function(determinate) {
        this.determinate = determinate;
        if (this.determinate) {
            this.adapter.removeClass(_constants.cssClasses.INDETERMINATE_CLASS);
            this.setProgress(this.progress);
        } else {
            this.adapter.addClass(_constants.cssClasses.INDETERMINATE_CLASS);
            this.adapter.removeAttribute(_constants.strings.ARIA_VALUENOW);
        }
    };
    MDCCircularProgressFoundation.prototype.isDeterminate = function() {
        return this.determinate;
    };
    /**
     * Sets the current progress value. In indeterminate mode, this has no
     * visual effect but will be reflected if the indicator is switched to
     * determinate mode.
     * @param value The current progress value, which must be between 0 and 1.
     */ MDCCircularProgressFoundation.prototype.setProgress = function(value) {
        this.progress = value;
        if (this.determinate) {
            var unfilledArcLength = (1 - this.progress) * (2 * Math.PI * this.radius);
            this.adapter.setDeterminateCircleAttribute(_constants.strings.STROKE_DASHOFFSET, "" + unfilledArcLength);
            this.adapter.setAttribute(_constants.strings.ARIA_VALUENOW, this.progress.toString());
        }
    };
    MDCCircularProgressFoundation.prototype.getProgress = function() {
        return this.progress;
    };
    /**
     * Shows the progress indicator.
     */ MDCCircularProgressFoundation.prototype.open = function() {
        this.closed = false;
        this.adapter.removeClass(_constants.cssClasses.CLOSED_CLASS);
        this.adapter.removeAttribute(_constants.strings.ARIA_HIDDEN);
    };
    /**
     * Hides the progress indicator
     */ MDCCircularProgressFoundation.prototype.close = function() {
        this.closed = true;
        this.adapter.addClass(_constants.cssClasses.CLOSED_CLASS);
        this.adapter.setAttribute(_constants.strings.ARIA_HIDDEN, 'true');
    };
    /**
     * @return Returns whether the progress indicator is hidden.
     */ MDCCircularProgressFoundation.prototype.isClosed = function() {
        return this.closed;
    };
    return MDCCircularProgressFoundation;
}(_foundation.MDCFoundation);
exports.default = MDCCircularProgressFoundation1;

},{"tslib":"j55WF","@material/base/foundation":"6nwGh","./constants":"d0onw","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"d0onw":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "cssClasses", ()=>cssClasses
);
parcelHelpers.export(exports, "strings", ()=>strings
);
var cssClasses = {
    INDETERMINATE_CLASS: 'mdc-circular-progress--indeterminate',
    CLOSED_CLASS: 'mdc-circular-progress--closed'
};
var strings = {
    ARIA_HIDDEN: 'aria-hidden',
    ARIA_VALUENOW: 'aria-valuenow',
    DETERMINATE_CIRCLE_SELECTOR: '.mdc-circular-progress__determinate-circle',
    RADIUS: 'r',
    STROKE_DASHOFFSET: 'stroke-dashoffset'
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"hJEcR":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _mithril = require("mithril");
var _mithrilDefault = parcelHelpers.interopDefault(_mithril);
var _stepsScss = require("./steps.scss");
class Steps {
    constructor(){
    }
    view(vnode) {
        return _mithrilDefault.default('[', null, _mithrilDefault.default("div", {
            class: "steps",
            style: vnode.attrs.style
        }, [
            ...Array(vnode.attrs.count)
        ].map((s, idx)=>{
            return _mithrilDefault.default("div", {
                class: 'step' + (idx === vnode.attrs.selected ? ' step--selected' : ''),
                style: {
                    cursor: 'pointer'
                },
                onclick: ()=>{
                    vnode.attrs.selectedChange(idx);
                }
            });
        })));
    }
}
module.exports = Steps;

},{"mithril":"a7UJj","./steps.scss":"bwqNx","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"bwqNx":[function() {},{}],"kHRlH":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _mithril = require("mithril");
var _mithrilDefault = parcelHelpers.interopDefault(_mithril);
var _textfield = require("@material/textfield");
var _services = require("../../services");
class TextField {
    constructor(){
        this.randomId = 'u' + _services.UUID.uuidv4().substring(0, 8);
        this.textfieldClass = 'mdc-text-field';
        this.optionDefaults = {
            filled: false,
            outlined: false,
            fluid: false,
            textarea: false,
            rows: 4,
            cols: 40,
            class: null,
            style: null,
            label: null,
            pattern: null,
            // iconLeading: null,
            // iconTrailing: null,
            disabled: false,
            oninput: null
        };
        this.options = null;
    }
    oninit(vnode) {
        this.options = Object.assign({
        }, this.optionDefaults, vnode.attrs);
        if (this.options.filled) this.textfieldClass += ' mdc-text-field--filled';
        if (this.options.outlined) this.textfieldClass += ' mdc-text-field--outlined';
        if (this.options.textarea) this.textfieldClass += ' mdc-text-field--textarea';
        if (!this.options.label) this.textfieldClass += ' mdc-text-field--no-label';
        if (this.options.disabled) this.textfieldClass += ' mdc-text-field--disabled';
        if (this.options.class) this.textfieldClass += ` ${this.options.class}`;
    }
    oncreate() {
        try {
            this.mdcInstance = new _textfield.MDCTextField(document.getElementById(this.randomId));
        } catch (e) {
        }
    }
    view(vnode1) {
        return _mithrilDefault.default('[', null, _mithrilDefault.default("label", {
            id: this.randomId,
            class: this.textfieldClass,
            style: {
                width: this.options.fluid ? '100%' : 'auto',
                ...this.options.style
            }
        }, _mithrilDefault.default("span", {
            class: "mdc-text-field__ripple"
        }), this.options.filled && this.options.label && !this.options.textarea && _mithrilDefault.default('[', null, _mithrilDefault.default("span", {
            class: "mdc-floating-label"
        }, this.options.label)), this.options.outlined && !this.options.textarea && _mithrilDefault.default('[', null, _mithrilDefault.default("span", {
            class: "mdc-notched-outline"
        }, _mithrilDefault.default("span", {
            class: "mdc-notched-outline__leading"
        }), this.options.label && _mithrilDefault.default("span", {
            class: "mdc-notched-outline__notch"
        }, _mithrilDefault.default("span", {
            class: "mdc-floating-label"
        }, this.options.label)), _mithrilDefault.default("span", {
            class: "mdc-notched-outline__trailing"
        }))), this.options.outlined && this.options.textarea && _mithrilDefault.default('[', null, _mithrilDefault.default("span", {
            class: "mdc-notched-outline"
        }, _mithrilDefault.default("span", {
            class: "mdc-notched-outline__leading"
        }), _mithrilDefault.default("span", {
            class: "mdc-notched-outline__trailing"
        }))), this.options.textarea ? _mithrilDefault.default("span", {
            class: "mdc-text-field__resizer"
        }, _mithrilDefault.default("textarea", {
            class: "mdc-text-field__input",
            rows: this.options.rows,
            cols: this.options.cols,
            placeholder: this.options.placeholder,
            pattern: this.options.pattern,
            disabled: this.options.disabled,
            oninput: (e)=>{
                if (this.options.oninput) this.options.oninput(e);
            }
        })) : _mithrilDefault.default("input", {
            class: "mdc-text-field__input",
            type: "text",
            placeholder: this.options.placeholder,
            pattern: this.options.pattern,
            disabled: this.options.disabled,
            oninput: (e)=>{
                if (this.options.oninput) this.options.oninput(e);
            }
        }), this.options.filled && _mithrilDefault.default("span", {
            class: "mdc-line-ripple"
        })));
    }
}
module.exports = TextField;

},{"mithril":"a7UJj","@material/textfield":"frYDh","../../services":"5OF80","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"frYDh":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */ var _adapter = require("./adapter");
parcelHelpers.exportAll(_adapter, exports);
var _component = require("./component");
parcelHelpers.exportAll(_component, exports);
var _constants = require("./constants");
parcelHelpers.exportAll(_constants, exports);
var _foundation = require("./foundation");
parcelHelpers.exportAll(_foundation, exports);
var _types = require("./types");
parcelHelpers.exportAll(_types, exports);
var _index = require("./character-counter/index");
parcelHelpers.exportAll(_index, exports);
var _index1 = require("./helper-text/index");
parcelHelpers.exportAll(_index1, exports);
var _index2 = require("./icon/index");
parcelHelpers.exportAll(_index2, exports);

},{"./adapter":"3eNrt","./component":"lPfIU","./constants":"bQSWr","./foundation":"5yDkj","./types":"jwg2T","./character-counter/index":"eS7XF","./helper-text/index":"1lfbK","./icon/index":"dtT1q","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"3eNrt":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"lPfIU":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "MDCTextField", ()=>MDCTextField1
);
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */ var _tslib = require("tslib");
var _component = require("@material/base/component");
var _events = require("@material/dom/events");
var _ponyfill = require("@material/dom/ponyfill");
var _component1 = require("@material/floating-label/component");
var _component2 = require("@material/line-ripple/component");
var _component3 = require("@material/notched-outline/component");
var _component4 = require("@material/ripple/component");
var _foundation = require("@material/ripple/foundation");
var _component5 = require("./character-counter/component");
var _foundation1 = require("./character-counter/foundation");
var _constants = require("./constants");
var _foundation2 = require("./foundation");
var _component6 = require("./helper-text/component");
var _foundation3 = require("./helper-text/foundation");
var _component7 = require("./icon/component");
var MDCTextField1 = function(_super) {
    _tslib.__extends(MDCTextField, _super);
    function MDCTextField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MDCTextField.attachTo = function(root) {
        return new MDCTextField(root);
    };
    MDCTextField.prototype.initialize = function(rippleFactory, lineRippleFactory, helperTextFactory, characterCounterFactory, iconFactory, labelFactory, outlineFactory) {
        if (rippleFactory === void 0) rippleFactory = function(el, foundation) {
            return new _component4.MDCRipple(el, foundation);
        };
        if (lineRippleFactory === void 0) lineRippleFactory = function(el) {
            return new _component2.MDCLineRipple(el);
        };
        if (helperTextFactory === void 0) helperTextFactory = function(el) {
            return new _component6.MDCTextFieldHelperText(el);
        };
        if (characterCounterFactory === void 0) characterCounterFactory = function(el) {
            return new _component5.MDCTextFieldCharacterCounter(el);
        };
        if (iconFactory === void 0) iconFactory = function(el) {
            return new _component7.MDCTextFieldIcon(el);
        };
        if (labelFactory === void 0) labelFactory = function(el) {
            return new _component1.MDCFloatingLabel(el);
        };
        if (outlineFactory === void 0) outlineFactory = function(el) {
            return new _component3.MDCNotchedOutline(el);
        };
        this.input = this.root.querySelector(_constants.strings.INPUT_SELECTOR);
        var labelElement = this.root.querySelector(_constants.strings.LABEL_SELECTOR);
        this.label = labelElement ? labelFactory(labelElement) : null;
        var lineRippleElement = this.root.querySelector(_constants.strings.LINE_RIPPLE_SELECTOR);
        this.lineRipple = lineRippleElement ? lineRippleFactory(lineRippleElement) : null;
        var outlineElement = this.root.querySelector(_constants.strings.OUTLINE_SELECTOR);
        this.outline = outlineElement ? outlineFactory(outlineElement) : null;
        // Helper text
        var helperTextStrings = _foundation3.MDCTextFieldHelperTextFoundation.strings;
        var nextElementSibling = this.root.nextElementSibling;
        var hasHelperLine = nextElementSibling && nextElementSibling.classList.contains(_constants.cssClasses.HELPER_LINE);
        var helperTextEl = hasHelperLine && nextElementSibling && nextElementSibling.querySelector(helperTextStrings.ROOT_SELECTOR);
        this.helperText = helperTextEl ? helperTextFactory(helperTextEl) : null;
        // Character counter
        var characterCounterStrings = _foundation1.MDCTextFieldCharacterCounterFoundation.strings;
        var characterCounterEl = this.root.querySelector(characterCounterStrings.ROOT_SELECTOR);
        // If character counter is not found in root element search in sibling element.
        if (!characterCounterEl && hasHelperLine && nextElementSibling) characterCounterEl = nextElementSibling.querySelector(characterCounterStrings.ROOT_SELECTOR);
        this.characterCounter = characterCounterEl ? characterCounterFactory(characterCounterEl) : null;
        // Leading icon
        var leadingIconEl = this.root.querySelector(_constants.strings.LEADING_ICON_SELECTOR);
        this.leadingIcon = leadingIconEl ? iconFactory(leadingIconEl) : null;
        // Trailing icon
        var trailingIconEl = this.root.querySelector(_constants.strings.TRAILING_ICON_SELECTOR);
        this.trailingIcon = trailingIconEl ? iconFactory(trailingIconEl) : null;
        // Prefix and Suffix
        this.prefix = this.root.querySelector(_constants.strings.PREFIX_SELECTOR);
        this.suffix = this.root.querySelector(_constants.strings.SUFFIX_SELECTOR);
        this.ripple = this.createRipple(rippleFactory);
    };
    MDCTextField.prototype.destroy = function() {
        if (this.ripple) this.ripple.destroy();
        if (this.lineRipple) this.lineRipple.destroy();
        if (this.helperText) this.helperText.destroy();
        if (this.characterCounter) this.characterCounter.destroy();
        if (this.leadingIcon) this.leadingIcon.destroy();
        if (this.trailingIcon) this.trailingIcon.destroy();
        if (this.label) this.label.destroy();
        if (this.outline) this.outline.destroy();
        _super.prototype.destroy.call(this);
    };
    /**
     * Initializes the Text Field's internal state based on the environment's
     * state.
     */ MDCTextField.prototype.initialSyncWithDOM = function() {
        this.disabled = this.input.disabled;
    };
    Object.defineProperty(MDCTextField.prototype, "value", {
        get: function() {
            return this.foundation.getValue();
        },
        /**
         * @param value The value to set on the input.
         */ set: function(value) {
            this.foundation.setValue(value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCTextField.prototype, "disabled", {
        get: function() {
            return this.foundation.isDisabled();
        },
        /**
         * @param disabled Sets the Text Field disabled or enabled.
         */ set: function(disabled) {
            this.foundation.setDisabled(disabled);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCTextField.prototype, "valid", {
        get: function() {
            return this.foundation.isValid();
        },
        /**
         * @param valid Sets the Text Field valid or invalid.
         */ set: function(valid) {
            this.foundation.setValid(valid);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCTextField.prototype, "required", {
        get: function() {
            return this.input.required;
        },
        /**
         * @param required Sets the Text Field to required.
         */ set: function(required) {
            this.input.required = required;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCTextField.prototype, "pattern", {
        get: function() {
            return this.input.pattern;
        },
        /**
         * @param pattern Sets the input element's validation pattern.
         */ set: function(pattern) {
            this.input.pattern = pattern;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCTextField.prototype, "minLength", {
        get: function() {
            return this.input.minLength;
        },
        /**
         * @param minLength Sets the input element's minLength.
         */ set: function(minLength) {
            this.input.minLength = minLength;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCTextField.prototype, "maxLength", {
        get: function() {
            return this.input.maxLength;
        },
        /**
         * @param maxLength Sets the input element's maxLength.
         */ set: function(maxLength) {
            // Chrome throws exception if maxLength is set to a value less than zero
            if (maxLength < 0) this.input.removeAttribute('maxLength');
            else this.input.maxLength = maxLength;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCTextField.prototype, "min", {
        get: function() {
            return this.input.min;
        },
        /**
         * @param min Sets the input element's min.
         */ set: function(min) {
            this.input.min = min;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCTextField.prototype, "max", {
        get: function() {
            return this.input.max;
        },
        /**
         * @param max Sets the input element's max.
         */ set: function(max) {
            this.input.max = max;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCTextField.prototype, "step", {
        get: function() {
            return this.input.step;
        },
        /**
         * @param step Sets the input element's step.
         */ set: function(step) {
            this.input.step = step;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCTextField.prototype, "helperTextContent", {
        /**
         * Sets the helper text element content.
         */ set: function(content) {
            this.foundation.setHelperTextContent(content);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCTextField.prototype, "leadingIconAriaLabel", {
        /**
         * Sets the aria label of the leading icon.
         */ set: function(label) {
            this.foundation.setLeadingIconAriaLabel(label);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCTextField.prototype, "leadingIconContent", {
        /**
         * Sets the text content of the leading icon.
         */ set: function(content) {
            this.foundation.setLeadingIconContent(content);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCTextField.prototype, "trailingIconAriaLabel", {
        /**
         * Sets the aria label of the trailing icon.
         */ set: function(label) {
            this.foundation.setTrailingIconAriaLabel(label);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCTextField.prototype, "trailingIconContent", {
        /**
         * Sets the text content of the trailing icon.
         */ set: function(content) {
            this.foundation.setTrailingIconContent(content);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCTextField.prototype, "useNativeValidation", {
        /**
         * Enables or disables the use of native validation. Use this for custom validation.
         * @param useNativeValidation Set this to false to ignore native input validation.
         */ set: function(useNativeValidation) {
            this.foundation.setUseNativeValidation(useNativeValidation);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCTextField.prototype, "prefixText", {
        /**
         * Gets the text content of the prefix, or null if it does not exist.
         */ get: function() {
            return this.prefix ? this.prefix.textContent : null;
        },
        /**
         * Sets the text content of the prefix, if it exists.
         */ set: function(prefixText) {
            if (this.prefix) this.prefix.textContent = prefixText;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCTextField.prototype, "suffixText", {
        /**
         * Gets the text content of the suffix, or null if it does not exist.
         */ get: function() {
            return this.suffix ? this.suffix.textContent : null;
        },
        /**
         * Sets the text content of the suffix, if it exists.
         */ set: function(suffixText) {
            if (this.suffix) this.suffix.textContent = suffixText;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Focuses the input element.
     */ MDCTextField.prototype.focus = function() {
        this.input.focus();
    };
    /**
     * Recomputes the outline SVG path for the outline element.
     */ MDCTextField.prototype.layout = function() {
        var openNotch = this.foundation.shouldFloat;
        this.foundation.notchOutline(openNotch);
    };
    MDCTextField.prototype.getDefaultFoundation = function() {
        // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
        // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
        // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
        var adapter = _tslib.__assign(_tslib.__assign(_tslib.__assign(_tslib.__assign(_tslib.__assign({
        }, this.getRootAdapterMethods()), this.getInputAdapterMethods()), this.getLabelAdapterMethods()), this.getLineRippleAdapterMethods()), this.getOutlineAdapterMethods());
        // tslint:enable:object-literal-sort-keys
        return new _foundation2.MDCTextFieldFoundation(adapter, this.getFoundationMap());
    };
    MDCTextField.prototype.getRootAdapterMethods = function() {
        var _this = this;
        // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
        return {
            addClass: function(className) {
                return _this.root.classList.add(className);
            },
            removeClass: function(className) {
                return _this.root.classList.remove(className);
            },
            hasClass: function(className) {
                return _this.root.classList.contains(className);
            },
            registerTextFieldInteractionHandler: function(evtType, handler) {
                _this.listen(evtType, handler);
            },
            deregisterTextFieldInteractionHandler: function(evtType, handler) {
                _this.unlisten(evtType, handler);
            },
            registerValidationAttributeChangeHandler: function(handler) {
                var getAttributesList = function(mutationsList) {
                    return mutationsList.map(function(mutation) {
                        return mutation.attributeName;
                    }).filter(function(attributeName) {
                        return attributeName;
                    });
                };
                var observer = new MutationObserver(function(mutationsList) {
                    return handler(getAttributesList(mutationsList));
                });
                var config = {
                    attributes: true
                };
                observer.observe(_this.input, config);
                return observer;
            },
            deregisterValidationAttributeChangeHandler: function(observer) {
                observer.disconnect();
            }
        };
    // tslint:enable:object-literal-sort-keys
    };
    MDCTextField.prototype.getInputAdapterMethods = function() {
        var _this = this;
        // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
        return {
            getNativeInput: function() {
                return _this.input;
            },
            setInputAttr: function(attr, value) {
                _this.input.setAttribute(attr, value);
            },
            removeInputAttr: function(attr) {
                _this.input.removeAttribute(attr);
            },
            isFocused: function() {
                return document.activeElement === _this.input;
            },
            registerInputInteractionHandler: function(evtType, handler) {
                _this.input.addEventListener(evtType, handler, _events.applyPassive());
            },
            deregisterInputInteractionHandler: function(evtType, handler) {
                _this.input.removeEventListener(evtType, handler, _events.applyPassive());
            }
        };
    // tslint:enable:object-literal-sort-keys
    };
    MDCTextField.prototype.getLabelAdapterMethods = function() {
        var _this = this;
        return {
            floatLabel: function(shouldFloat) {
                _this.label && _this.label.float(shouldFloat);
            },
            getLabelWidth: function() {
                return _this.label ? _this.label.getWidth() : 0;
            },
            hasLabel: function() {
                return Boolean(_this.label);
            },
            shakeLabel: function(shouldShake) {
                _this.label && _this.label.shake(shouldShake);
            },
            setLabelRequired: function(isRequired) {
                _this.label && _this.label.setRequired(isRequired);
            }
        };
    };
    MDCTextField.prototype.getLineRippleAdapterMethods = function() {
        var _this = this;
        return {
            activateLineRipple: function() {
                if (_this.lineRipple) _this.lineRipple.activate();
            },
            deactivateLineRipple: function() {
                if (_this.lineRipple) _this.lineRipple.deactivate();
            },
            setLineRippleTransformOrigin: function(normalizedX) {
                if (_this.lineRipple) _this.lineRipple.setRippleCenter(normalizedX);
            }
        };
    };
    MDCTextField.prototype.getOutlineAdapterMethods = function() {
        var _this = this;
        return {
            closeOutline: function() {
                _this.outline && _this.outline.closeNotch();
            },
            hasOutline: function() {
                return Boolean(_this.outline);
            },
            notchOutline: function(labelWidth) {
                _this.outline && _this.outline.notch(labelWidth);
            }
        };
    };
    /**
     * @return A map of all subcomponents to subfoundations.
     */ MDCTextField.prototype.getFoundationMap = function() {
        return {
            characterCounter: this.characterCounter ? this.characterCounter.foundationForTextField : undefined,
            helperText: this.helperText ? this.helperText.foundationForTextField : undefined,
            leadingIcon: this.leadingIcon ? this.leadingIcon.foundationForTextField : undefined,
            trailingIcon: this.trailingIcon ? this.trailingIcon.foundationForTextField : undefined
        };
    };
    MDCTextField.prototype.createRipple = function(rippleFactory) {
        var _this = this;
        var isTextArea = this.root.classList.contains(_constants.cssClasses.TEXTAREA);
        var isOutlined = this.root.classList.contains(_constants.cssClasses.OUTLINED);
        if (isTextArea || isOutlined) return null;
        // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
        // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
        // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
        var adapter = _tslib.__assign(_tslib.__assign({
        }, _component4.MDCRipple.createAdapter(this)), {
            isSurfaceActive: function() {
                return _ponyfill.matches(_this.input, ':active');
            },
            registerInteractionHandler: function(evtType, handler) {
                _this.input.addEventListener(evtType, handler, _events.applyPassive());
            },
            deregisterInteractionHandler: function(evtType, handler) {
                _this.input.removeEventListener(evtType, handler, _events.applyPassive());
            }
        });
        // tslint:enable:object-literal-sort-keys
        return rippleFactory(this.root, new _foundation.MDCRippleFoundation(adapter));
    };
    return MDCTextField;
}(_component.MDCComponent);

},{"tslib":"j55WF","@material/base/component":"4ISbx","@material/dom/events":"fUICs","@material/dom/ponyfill":"cB7q4","@material/floating-label/component":"6mzJO","@material/line-ripple/component":"jFBqQ","@material/notched-outline/component":"eJptm","@material/ripple/component":"l2wqP","@material/ripple/foundation":"5cEAm","./character-counter/component":"5GngY","./character-counter/foundation":"5EQM4","./constants":"bQSWr","./foundation":"5yDkj","./helper-text/component":"k2Pal","./helper-text/foundation":"h7qcr","./icon/component":"8EzHS","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"5GngY":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "MDCTextFieldCharacterCounter", ()=>MDCTextFieldCharacterCounter1
);
/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */ var _tslib = require("tslib");
var _component = require("@material/base/component");
var _foundation = require("./foundation");
var MDCTextFieldCharacterCounter1 = function(_super) {
    _tslib.__extends(MDCTextFieldCharacterCounter, _super);
    function MDCTextFieldCharacterCounter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MDCTextFieldCharacterCounter.attachTo = function(root) {
        return new MDCTextFieldCharacterCounter(root);
    };
    Object.defineProperty(MDCTextFieldCharacterCounter.prototype, "foundationForTextField", {
        // Provided for access by MDCTextField component
        get: function() {
            return this.foundation;
        },
        enumerable: false,
        configurable: true
    });
    MDCTextFieldCharacterCounter.prototype.getDefaultFoundation = function() {
        var _this = this;
        // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
        // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
        var adapter = {
            setContent: function(content) {
                _this.root.textContent = content;
            }
        };
        return new _foundation.MDCTextFieldCharacterCounterFoundation(adapter);
    };
    return MDCTextFieldCharacterCounter;
}(_component.MDCComponent);

},{"tslib":"j55WF","@material/base/component":"4ISbx","./foundation":"5EQM4","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"5EQM4":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "MDCTextFieldCharacterCounterFoundation", ()=>MDCTextFieldCharacterCounterFoundation1
);
/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */ var _tslib = require("tslib");
var _foundation = require("@material/base/foundation");
var _constants = require("./constants");
var MDCTextFieldCharacterCounterFoundation1 = function(_super) {
    _tslib.__extends(MDCTextFieldCharacterCounterFoundation, _super);
    function MDCTextFieldCharacterCounterFoundation(adapter) {
        return _super.call(this, _tslib.__assign(_tslib.__assign({
        }, MDCTextFieldCharacterCounterFoundation.defaultAdapter), adapter)) || this;
    }
    Object.defineProperty(MDCTextFieldCharacterCounterFoundation, "cssClasses", {
        get: function() {
            return _constants.cssClasses;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCTextFieldCharacterCounterFoundation, "strings", {
        get: function() {
            return _constants.strings;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCTextFieldCharacterCounterFoundation, "defaultAdapter", {
        /**
         * See {@link MDCTextFieldCharacterCounterAdapter} for typing information on parameters and return types.
         */ get: function() {
            return {
                setContent: function() {
                    return undefined;
                }
            };
        },
        enumerable: false,
        configurable: true
    });
    MDCTextFieldCharacterCounterFoundation.prototype.setCounterValue = function(currentLength, maxLength) {
        currentLength = Math.min(currentLength, maxLength);
        this.adapter.setContent(currentLength + " / " + maxLength);
    };
    return MDCTextFieldCharacterCounterFoundation;
}(_foundation.MDCFoundation);
exports.default = MDCTextFieldCharacterCounterFoundation1;

},{"tslib":"j55WF","@material/base/foundation":"6nwGh","./constants":"jJ2IH","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"jJ2IH":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "strings", ()=>strings
);
parcelHelpers.export(exports, "cssClasses", ()=>cssClasses
);
/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */ var cssClasses = {
    ROOT: 'mdc-text-field-character-counter'
};
var strings = {
    ROOT_SELECTOR: "." + cssClasses.ROOT
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"bQSWr":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "cssClasses", ()=>cssClasses
);
parcelHelpers.export(exports, "strings", ()=>strings
);
parcelHelpers.export(exports, "numbers", ()=>numbers
);
parcelHelpers.export(exports, "VALIDATION_ATTR_WHITELIST", ()=>VALIDATION_ATTR_WHITELIST
);
parcelHelpers.export(exports, "ALWAYS_FLOAT_TYPES", ()=>ALWAYS_FLOAT_TYPES
);
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */ var strings = {
    ARIA_CONTROLS: 'aria-controls',
    ARIA_DESCRIBEDBY: 'aria-describedby',
    INPUT_SELECTOR: '.mdc-text-field__input',
    LABEL_SELECTOR: '.mdc-floating-label',
    LEADING_ICON_SELECTOR: '.mdc-text-field__icon--leading',
    LINE_RIPPLE_SELECTOR: '.mdc-line-ripple',
    OUTLINE_SELECTOR: '.mdc-notched-outline',
    PREFIX_SELECTOR: '.mdc-text-field__affix--prefix',
    SUFFIX_SELECTOR: '.mdc-text-field__affix--suffix',
    TRAILING_ICON_SELECTOR: '.mdc-text-field__icon--trailing'
};
var cssClasses = {
    DISABLED: 'mdc-text-field--disabled',
    FOCUSED: 'mdc-text-field--focused',
    HELPER_LINE: 'mdc-text-field-helper-line',
    INVALID: 'mdc-text-field--invalid',
    LABEL_FLOATING: 'mdc-text-field--label-floating',
    NO_LABEL: 'mdc-text-field--no-label',
    OUTLINED: 'mdc-text-field--outlined',
    ROOT: 'mdc-text-field',
    TEXTAREA: 'mdc-text-field--textarea',
    WITH_LEADING_ICON: 'mdc-text-field--with-leading-icon',
    WITH_TRAILING_ICON: 'mdc-text-field--with-trailing-icon',
    WITH_INTERNAL_COUNTER: 'mdc-text-field--with-internal-counter'
};
var numbers = {
    LABEL_SCALE: 0.75
};
/**
 * Whitelist based off of
 * https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation
 * under the "Validation-related attributes" section.
 */ var VALIDATION_ATTR_WHITELIST = [
    'pattern',
    'min',
    'max',
    'required',
    'step',
    'minlength',
    'maxlength', 
];
/**
 * Label should always float for these types as they show some UI even if value
 * is empty.
 */ var ALWAYS_FLOAT_TYPES = [
    'color',
    'date',
    'datetime-local',
    'month',
    'range',
    'time',
    'week', 
];

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"5yDkj":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "MDCTextFieldFoundation", ()=>MDCTextFieldFoundation1
);
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */ var _tslib = require("tslib");
var _foundation = require("@material/base/foundation");
var _constants = require("./constants");
var POINTERDOWN_EVENTS = [
    'mousedown',
    'touchstart'
];
var INTERACTION_EVENTS = [
    'click',
    'keydown'
];
var MDCTextFieldFoundation1 = function(_super) {
    _tslib.__extends(MDCTextFieldFoundation, _super);
    /**
     * @param adapter
     * @param foundationMap Map from subcomponent names to their subfoundations.
     */ function MDCTextFieldFoundation(adapter, foundationMap) {
        if (foundationMap === void 0) foundationMap = {
        };
        var _this = _super.call(this, _tslib.__assign(_tslib.__assign({
        }, MDCTextFieldFoundation.defaultAdapter), adapter)) || this;
        _this.isFocused = false;
        _this.receivedUserInput = false;
        _this.valid = true;
        _this.useNativeValidation = true;
        _this.validateOnValueChange = true;
        _this.helperText = foundationMap.helperText;
        _this.characterCounter = foundationMap.characterCounter;
        _this.leadingIcon = foundationMap.leadingIcon;
        _this.trailingIcon = foundationMap.trailingIcon;
        _this.inputFocusHandler = function() {
            _this.activateFocus();
        };
        _this.inputBlurHandler = function() {
            _this.deactivateFocus();
        };
        _this.inputInputHandler = function() {
            _this.handleInput();
        };
        _this.setPointerXOffset = function(evt) {
            _this.setTransformOrigin(evt);
        };
        _this.textFieldInteractionHandler = function() {
            _this.handleTextFieldInteraction();
        };
        _this.validationAttributeChangeHandler = function(attributesList) {
            _this.handleValidationAttributeChange(attributesList);
        };
        return _this;
    }
    Object.defineProperty(MDCTextFieldFoundation, "cssClasses", {
        get: function() {
            return _constants.cssClasses;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCTextFieldFoundation, "strings", {
        get: function() {
            return _constants.strings;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCTextFieldFoundation, "numbers", {
        get: function() {
            return _constants.numbers;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCTextFieldFoundation.prototype, "shouldAlwaysFloat", {
        get: function() {
            var type = this.getNativeInput().type;
            return _constants.ALWAYS_FLOAT_TYPES.indexOf(type) >= 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCTextFieldFoundation.prototype, "shouldFloat", {
        get: function() {
            return this.shouldAlwaysFloat || this.isFocused || !!this.getValue() || this.isBadInput();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCTextFieldFoundation.prototype, "shouldShake", {
        get: function() {
            return !this.isFocused && !this.isValid() && !!this.getValue();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCTextFieldFoundation, "defaultAdapter", {
        /**
         * See {@link MDCTextFieldAdapter} for typing information on parameters and
         * return types.
         */ get: function() {
            // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
            return {
                addClass: function() {
                    return undefined;
                },
                removeClass: function() {
                    return undefined;
                },
                hasClass: function() {
                    return true;
                },
                setInputAttr: function() {
                    return undefined;
                },
                removeInputAttr: function() {
                    return undefined;
                },
                registerTextFieldInteractionHandler: function() {
                    return undefined;
                },
                deregisterTextFieldInteractionHandler: function() {
                    return undefined;
                },
                registerInputInteractionHandler: function() {
                    return undefined;
                },
                deregisterInputInteractionHandler: function() {
                    return undefined;
                },
                registerValidationAttributeChangeHandler: function() {
                    return new MutationObserver(function() {
                        return undefined;
                    });
                },
                deregisterValidationAttributeChangeHandler: function() {
                    return undefined;
                },
                getNativeInput: function() {
                    return null;
                },
                isFocused: function() {
                    return false;
                },
                activateLineRipple: function() {
                    return undefined;
                },
                deactivateLineRipple: function() {
                    return undefined;
                },
                setLineRippleTransformOrigin: function() {
                    return undefined;
                },
                shakeLabel: function() {
                    return undefined;
                },
                floatLabel: function() {
                    return undefined;
                },
                setLabelRequired: function() {
                    return undefined;
                },
                hasLabel: function() {
                    return false;
                },
                getLabelWidth: function() {
                    return 0;
                },
                hasOutline: function() {
                    return false;
                },
                notchOutline: function() {
                    return undefined;
                },
                closeOutline: function() {
                    return undefined;
                }
            };
        // tslint:enable:object-literal-sort-keys
        },
        enumerable: false,
        configurable: true
    });
    MDCTextFieldFoundation.prototype.init = function() {
        var e_1, _a, e_2, _b;
        if (this.adapter.hasLabel() && this.getNativeInput().required) this.adapter.setLabelRequired(true);
        if (this.adapter.isFocused()) this.inputFocusHandler();
        else if (this.adapter.hasLabel() && this.shouldFloat) {
            this.notchOutline(true);
            this.adapter.floatLabel(true);
            this.styleFloating(true);
        }
        this.adapter.registerInputInteractionHandler('focus', this.inputFocusHandler);
        this.adapter.registerInputInteractionHandler('blur', this.inputBlurHandler);
        this.adapter.registerInputInteractionHandler('input', this.inputInputHandler);
        try {
            for(var POINTERDOWN_EVENTS_1 = _tslib.__values(POINTERDOWN_EVENTS), POINTERDOWN_EVENTS_1_1 = POINTERDOWN_EVENTS_1.next(); !POINTERDOWN_EVENTS_1_1.done; POINTERDOWN_EVENTS_1_1 = POINTERDOWN_EVENTS_1.next()){
                var evtType = POINTERDOWN_EVENTS_1_1.value;
                this.adapter.registerInputInteractionHandler(evtType, this.setPointerXOffset);
            }
        } catch (e_1_1) {
            e_1 = {
                error: e_1_1
            };
        } finally{
            try {
                if (POINTERDOWN_EVENTS_1_1 && !POINTERDOWN_EVENTS_1_1.done && (_a = POINTERDOWN_EVENTS_1.return)) _a.call(POINTERDOWN_EVENTS_1);
            } finally{
                if (e_1) throw e_1.error;
            }
        }
        try {
            for(var INTERACTION_EVENTS_1 = _tslib.__values(INTERACTION_EVENTS), INTERACTION_EVENTS_1_1 = INTERACTION_EVENTS_1.next(); !INTERACTION_EVENTS_1_1.done; INTERACTION_EVENTS_1_1 = INTERACTION_EVENTS_1.next()){
                var evtType = INTERACTION_EVENTS_1_1.value;
                this.adapter.registerTextFieldInteractionHandler(evtType, this.textFieldInteractionHandler);
            }
        } catch (e_2_1) {
            e_2 = {
                error: e_2_1
            };
        } finally{
            try {
                if (INTERACTION_EVENTS_1_1 && !INTERACTION_EVENTS_1_1.done && (_b = INTERACTION_EVENTS_1.return)) _b.call(INTERACTION_EVENTS_1);
            } finally{
                if (e_2) throw e_2.error;
            }
        }
        this.validationObserver = this.adapter.registerValidationAttributeChangeHandler(this.validationAttributeChangeHandler);
        this.setcharacterCounter(this.getValue().length);
    };
    MDCTextFieldFoundation.prototype.destroy = function() {
        var e_3, _a, e_4, _b;
        this.adapter.deregisterInputInteractionHandler('focus', this.inputFocusHandler);
        this.adapter.deregisterInputInteractionHandler('blur', this.inputBlurHandler);
        this.adapter.deregisterInputInteractionHandler('input', this.inputInputHandler);
        try {
            for(var POINTERDOWN_EVENTS_2 = _tslib.__values(POINTERDOWN_EVENTS), POINTERDOWN_EVENTS_2_1 = POINTERDOWN_EVENTS_2.next(); !POINTERDOWN_EVENTS_2_1.done; POINTERDOWN_EVENTS_2_1 = POINTERDOWN_EVENTS_2.next()){
                var evtType = POINTERDOWN_EVENTS_2_1.value;
                this.adapter.deregisterInputInteractionHandler(evtType, this.setPointerXOffset);
            }
        } catch (e_3_1) {
            e_3 = {
                error: e_3_1
            };
        } finally{
            try {
                if (POINTERDOWN_EVENTS_2_1 && !POINTERDOWN_EVENTS_2_1.done && (_a = POINTERDOWN_EVENTS_2.return)) _a.call(POINTERDOWN_EVENTS_2);
            } finally{
                if (e_3) throw e_3.error;
            }
        }
        try {
            for(var INTERACTION_EVENTS_2 = _tslib.__values(INTERACTION_EVENTS), INTERACTION_EVENTS_2_1 = INTERACTION_EVENTS_2.next(); !INTERACTION_EVENTS_2_1.done; INTERACTION_EVENTS_2_1 = INTERACTION_EVENTS_2.next()){
                var evtType = INTERACTION_EVENTS_2_1.value;
                this.adapter.deregisterTextFieldInteractionHandler(evtType, this.textFieldInteractionHandler);
            }
        } catch (e_4_1) {
            e_4 = {
                error: e_4_1
            };
        } finally{
            try {
                if (INTERACTION_EVENTS_2_1 && !INTERACTION_EVENTS_2_1.done && (_b = INTERACTION_EVENTS_2.return)) _b.call(INTERACTION_EVENTS_2);
            } finally{
                if (e_4) throw e_4.error;
            }
        }
        this.adapter.deregisterValidationAttributeChangeHandler(this.validationObserver);
    };
    /**
     * Handles user interactions with the Text Field.
     */ MDCTextFieldFoundation.prototype.handleTextFieldInteraction = function() {
        var nativeInput = this.adapter.getNativeInput();
        if (nativeInput && nativeInput.disabled) return;
        this.receivedUserInput = true;
    };
    /**
     * Handles validation attribute changes
     */ MDCTextFieldFoundation.prototype.handleValidationAttributeChange = function(attributesList) {
        var _this = this;
        attributesList.some(function(attributeName) {
            if (_constants.VALIDATION_ATTR_WHITELIST.indexOf(attributeName) > -1) {
                _this.styleValidity(true);
                _this.adapter.setLabelRequired(_this.getNativeInput().required);
                return true;
            }
            return false;
        });
        if (attributesList.indexOf('maxlength') > -1) this.setcharacterCounter(this.getValue().length);
    };
    /**
     * Opens/closes the notched outline.
     */ MDCTextFieldFoundation.prototype.notchOutline = function(openNotch) {
        if (!this.adapter.hasOutline() || !this.adapter.hasLabel()) return;
        if (openNotch) {
            var labelWidth = this.adapter.getLabelWidth() * _constants.numbers.LABEL_SCALE;
            this.adapter.notchOutline(labelWidth);
        } else this.adapter.closeOutline();
    };
    /**
     * Activates the text field focus state.
     */ MDCTextFieldFoundation.prototype.activateFocus = function() {
        this.isFocused = true;
        this.styleFocused(this.isFocused);
        this.adapter.activateLineRipple();
        if (this.adapter.hasLabel()) {
            this.notchOutline(this.shouldFloat);
            this.adapter.floatLabel(this.shouldFloat);
            this.styleFloating(this.shouldFloat);
            this.adapter.shakeLabel(this.shouldShake);
        }
        if (this.helperText && (this.helperText.isPersistent() || !this.helperText.isValidation() || !this.valid)) this.helperText.showToScreenReader();
    };
    /**
     * Sets the line ripple's transform origin, so that the line ripple activate
     * animation will animate out from the user's click location.
     */ MDCTextFieldFoundation.prototype.setTransformOrigin = function(evt) {
        if (this.isDisabled() || this.adapter.hasOutline()) return;
        var touches = evt.touches;
        var targetEvent = touches ? touches[0] : evt;
        var targetClientRect = targetEvent.target.getBoundingClientRect();
        var normalizedX = targetEvent.clientX - targetClientRect.left;
        this.adapter.setLineRippleTransformOrigin(normalizedX);
    };
    /**
     * Handles input change of text input and text area.
     */ MDCTextFieldFoundation.prototype.handleInput = function() {
        this.autoCompleteFocus();
        this.setcharacterCounter(this.getValue().length);
    };
    /**
     * Activates the Text Field's focus state in cases when the input value
     * changes without user input (e.g. programmatically).
     */ MDCTextFieldFoundation.prototype.autoCompleteFocus = function() {
        if (!this.receivedUserInput) this.activateFocus();
    };
    /**
     * Deactivates the Text Field's focus state.
     */ MDCTextFieldFoundation.prototype.deactivateFocus = function() {
        this.isFocused = false;
        this.adapter.deactivateLineRipple();
        var isValid = this.isValid();
        this.styleValidity(isValid);
        this.styleFocused(this.isFocused);
        if (this.adapter.hasLabel()) {
            this.notchOutline(this.shouldFloat);
            this.adapter.floatLabel(this.shouldFloat);
            this.styleFloating(this.shouldFloat);
            this.adapter.shakeLabel(this.shouldShake);
        }
        if (!this.shouldFloat) this.receivedUserInput = false;
    };
    MDCTextFieldFoundation.prototype.getValue = function() {
        return this.getNativeInput().value;
    };
    /**
     * @param value The value to set on the input Element.
     */ MDCTextFieldFoundation.prototype.setValue = function(value) {
        // Prevent Safari from moving the caret to the end of the input when the
        // value has not changed.
        if (this.getValue() !== value) this.getNativeInput().value = value;
        this.setcharacterCounter(value.length);
        if (this.validateOnValueChange) {
            var isValid = this.isValid();
            this.styleValidity(isValid);
        }
        if (this.adapter.hasLabel()) {
            this.notchOutline(this.shouldFloat);
            this.adapter.floatLabel(this.shouldFloat);
            this.styleFloating(this.shouldFloat);
            if (this.validateOnValueChange) this.adapter.shakeLabel(this.shouldShake);
        }
    };
    /**
     * @return The custom validity state, if set; otherwise, the result of a
     *     native validity check.
     */ MDCTextFieldFoundation.prototype.isValid = function() {
        return this.useNativeValidation ? this.isNativeInputValid() : this.valid;
    };
    /**
     * @param isValid Sets the custom validity state of the Text Field.
     */ MDCTextFieldFoundation.prototype.setValid = function(isValid) {
        this.valid = isValid;
        this.styleValidity(isValid);
        var shouldShake = !isValid && !this.isFocused && !!this.getValue();
        if (this.adapter.hasLabel()) this.adapter.shakeLabel(shouldShake);
    };
    /**
     * @param shouldValidate Whether or not validity should be updated on
     *     value change.
     */ MDCTextFieldFoundation.prototype.setValidateOnValueChange = function(shouldValidate) {
        this.validateOnValueChange = shouldValidate;
    };
    /**
     * @return Whether or not validity should be updated on value change. `true`
     *     by default.
     */ MDCTextFieldFoundation.prototype.getValidateOnValueChange = function() {
        return this.validateOnValueChange;
    };
    /**
     * Enables or disables the use of native validation. Use this for custom
     * validation.
     * @param useNativeValidation Set this to false to ignore native input
     *     validation.
     */ MDCTextFieldFoundation.prototype.setUseNativeValidation = function(useNativeValidation) {
        this.useNativeValidation = useNativeValidation;
    };
    MDCTextFieldFoundation.prototype.isDisabled = function() {
        return this.getNativeInput().disabled;
    };
    /**
     * @param disabled Sets the text-field disabled or enabled.
     */ MDCTextFieldFoundation.prototype.setDisabled = function(disabled) {
        this.getNativeInput().disabled = disabled;
        this.styleDisabled(disabled);
    };
    /**
     * @param content Sets the content of the helper text.
     */ MDCTextFieldFoundation.prototype.setHelperTextContent = function(content) {
        if (this.helperText) this.helperText.setContent(content);
    };
    /**
     * Sets the aria label of the leading icon.
     */ MDCTextFieldFoundation.prototype.setLeadingIconAriaLabel = function(label) {
        if (this.leadingIcon) this.leadingIcon.setAriaLabel(label);
    };
    /**
     * Sets the text content of the leading icon.
     */ MDCTextFieldFoundation.prototype.setLeadingIconContent = function(content) {
        if (this.leadingIcon) this.leadingIcon.setContent(content);
    };
    /**
     * Sets the aria label of the trailing icon.
     */ MDCTextFieldFoundation.prototype.setTrailingIconAriaLabel = function(label) {
        if (this.trailingIcon) this.trailingIcon.setAriaLabel(label);
    };
    /**
     * Sets the text content of the trailing icon.
     */ MDCTextFieldFoundation.prototype.setTrailingIconContent = function(content) {
        if (this.trailingIcon) this.trailingIcon.setContent(content);
    };
    /**
     * Sets character counter values that shows characters used and the total
     * character limit.
     */ MDCTextFieldFoundation.prototype.setcharacterCounter = function(currentLength) {
        if (!this.characterCounter) return;
        var maxLength = this.getNativeInput().maxLength;
        if (maxLength === -1) throw new Error('MDCTextFieldFoundation: Expected maxlength html property on text input or textarea.');
        this.characterCounter.setCounterValue(currentLength, maxLength);
    };
    /**
     * @return True if the Text Field input fails in converting the user-supplied
     *     value.
     */ MDCTextFieldFoundation.prototype.isBadInput = function() {
        // The badInput property is not supported in IE 11 💩.
        return this.getNativeInput().validity.badInput || false;
    };
    /**
     * @return The result of native validity checking (ValidityState.valid).
     */ MDCTextFieldFoundation.prototype.isNativeInputValid = function() {
        return this.getNativeInput().validity.valid;
    };
    /**
     * Styles the component based on the validity state.
     */ MDCTextFieldFoundation.prototype.styleValidity = function(isValid) {
        var INVALID = MDCTextFieldFoundation.cssClasses.INVALID;
        if (isValid) this.adapter.removeClass(INVALID);
        else this.adapter.addClass(INVALID);
        if (this.helperText) {
            this.helperText.setValidity(isValid);
            // We dynamically set or unset aria-describedby for validation helper text
            // only, based on whether the field is valid
            var helperTextValidation = this.helperText.isValidation();
            if (!helperTextValidation) return;
            var helperTextVisible = this.helperText.isVisible();
            var helperTextId = this.helperText.getId();
            if (helperTextVisible && helperTextId) this.adapter.setInputAttr(_constants.strings.ARIA_DESCRIBEDBY, helperTextId);
            else this.adapter.removeInputAttr(_constants.strings.ARIA_DESCRIBEDBY);
        }
    };
    /**
     * Styles the component based on the focused state.
     */ MDCTextFieldFoundation.prototype.styleFocused = function(isFocused) {
        var FOCUSED = MDCTextFieldFoundation.cssClasses.FOCUSED;
        if (isFocused) this.adapter.addClass(FOCUSED);
        else this.adapter.removeClass(FOCUSED);
    };
    /**
     * Styles the component based on the disabled state.
     */ MDCTextFieldFoundation.prototype.styleDisabled = function(isDisabled) {
        var _a = MDCTextFieldFoundation.cssClasses, DISABLED = _a.DISABLED, INVALID = _a.INVALID;
        if (isDisabled) {
            this.adapter.addClass(DISABLED);
            this.adapter.removeClass(INVALID);
        } else this.adapter.removeClass(DISABLED);
        if (this.leadingIcon) this.leadingIcon.setDisabled(isDisabled);
        if (this.trailingIcon) this.trailingIcon.setDisabled(isDisabled);
    };
    /**
     * Styles the component based on the label floating state.
     */ MDCTextFieldFoundation.prototype.styleFloating = function(isFloating) {
        var LABEL_FLOATING = MDCTextFieldFoundation.cssClasses.LABEL_FLOATING;
        if (isFloating) this.adapter.addClass(LABEL_FLOATING);
        else this.adapter.removeClass(LABEL_FLOATING);
    };
    /**
     * @return The native text input element from the host environment, or an
     *     object with the same shape for unit tests.
     */ MDCTextFieldFoundation.prototype.getNativeInput = function() {
        // this.adapter may be undefined in foundation unit tests. This happens when
        // testdouble is creating a mock object and invokes the
        // shouldShake/shouldFloat getters (which in turn call getValue(), which
        // calls this method) before init() has been called from the MDCTextField
        // constructor. To work around that issue, we return a dummy object.
        var nativeInput = this.adapter ? this.adapter.getNativeInput() : null;
        return nativeInput || {
            disabled: false,
            maxLength: -1,
            required: false,
            type: 'input',
            validity: {
                badInput: false,
                valid: true
            },
            value: ''
        };
    };
    return MDCTextFieldFoundation;
}(_foundation.MDCFoundation);
exports.default = MDCTextFieldFoundation1;

},{"tslib":"j55WF","@material/base/foundation":"6nwGh","./constants":"bQSWr","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"k2Pal":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "MDCTextFieldHelperText", ()=>MDCTextFieldHelperText1
);
/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */ var _tslib = require("tslib");
var _component = require("@material/base/component");
var _foundation = require("./foundation");
var MDCTextFieldHelperText1 = function(_super) {
    _tslib.__extends(MDCTextFieldHelperText, _super);
    function MDCTextFieldHelperText() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MDCTextFieldHelperText.attachTo = function(root) {
        return new MDCTextFieldHelperText(root);
    };
    Object.defineProperty(MDCTextFieldHelperText.prototype, "foundationForTextField", {
        // Provided for access by MDCTextField component
        get: function() {
            return this.foundation;
        },
        enumerable: false,
        configurable: true
    });
    MDCTextFieldHelperText.prototype.getDefaultFoundation = function() {
        var _this = this;
        // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
        // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
        // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
        var adapter = {
            addClass: function(className) {
                return _this.root.classList.add(className);
            },
            removeClass: function(className) {
                return _this.root.classList.remove(className);
            },
            hasClass: function(className) {
                return _this.root.classList.contains(className);
            },
            getAttr: function(attr) {
                return _this.root.getAttribute(attr);
            },
            setAttr: function(attr, value) {
                return _this.root.setAttribute(attr, value);
            },
            removeAttr: function(attr) {
                return _this.root.removeAttribute(attr);
            },
            setContent: function(content) {
                _this.root.textContent = content;
            }
        };
        // tslint:enable:object-literal-sort-keys
        return new _foundation.MDCTextFieldHelperTextFoundation(adapter);
    };
    return MDCTextFieldHelperText;
}(_component.MDCComponent);

},{"tslib":"j55WF","@material/base/component":"4ISbx","./foundation":"h7qcr","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"h7qcr":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "MDCTextFieldHelperTextFoundation", ()=>MDCTextFieldHelperTextFoundation1
);
/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */ var _tslib = require("tslib");
var _foundation = require("@material/base/foundation");
var _constants = require("./constants");
var MDCTextFieldHelperTextFoundation1 = function(_super) {
    _tslib.__extends(MDCTextFieldHelperTextFoundation, _super);
    function MDCTextFieldHelperTextFoundation(adapter) {
        return _super.call(this, _tslib.__assign(_tslib.__assign({
        }, MDCTextFieldHelperTextFoundation.defaultAdapter), adapter)) || this;
    }
    Object.defineProperty(MDCTextFieldHelperTextFoundation, "cssClasses", {
        get: function() {
            return _constants.cssClasses;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCTextFieldHelperTextFoundation, "strings", {
        get: function() {
            return _constants.strings;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCTextFieldHelperTextFoundation, "defaultAdapter", {
        /**
         * See {@link MDCTextFieldHelperTextAdapter} for typing information on parameters and return types.
         */ get: function() {
            // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
            return {
                addClass: function() {
                    return undefined;
                },
                removeClass: function() {
                    return undefined;
                },
                hasClass: function() {
                    return false;
                },
                getAttr: function() {
                    return null;
                },
                setAttr: function() {
                    return undefined;
                },
                removeAttr: function() {
                    return undefined;
                },
                setContent: function() {
                    return undefined;
                }
            };
        // tslint:enable:object-literal-sort-keys
        },
        enumerable: false,
        configurable: true
    });
    MDCTextFieldHelperTextFoundation.prototype.getId = function() {
        return this.adapter.getAttr('id');
    };
    MDCTextFieldHelperTextFoundation.prototype.isVisible = function() {
        return this.adapter.getAttr(_constants.strings.ARIA_HIDDEN) !== 'true';
    };
    /**
     * Sets the content of the helper text field.
     */ MDCTextFieldHelperTextFoundation.prototype.setContent = function(content) {
        this.adapter.setContent(content);
    };
    MDCTextFieldHelperTextFoundation.prototype.isPersistent = function() {
        return this.adapter.hasClass(_constants.cssClasses.HELPER_TEXT_PERSISTENT);
    };
    /**
     * @param isPersistent Sets the persistency of the helper text.
     */ MDCTextFieldHelperTextFoundation.prototype.setPersistent = function(isPersistent) {
        if (isPersistent) this.adapter.addClass(_constants.cssClasses.HELPER_TEXT_PERSISTENT);
        else this.adapter.removeClass(_constants.cssClasses.HELPER_TEXT_PERSISTENT);
    };
    /**
     * @return whether the helper text acts as an error validation message.
     */ MDCTextFieldHelperTextFoundation.prototype.isValidation = function() {
        return this.adapter.hasClass(_constants.cssClasses.HELPER_TEXT_VALIDATION_MSG);
    };
    /**
     * @param isValidation True to make the helper text act as an error validation message.
     */ MDCTextFieldHelperTextFoundation.prototype.setValidation = function(isValidation) {
        if (isValidation) this.adapter.addClass(_constants.cssClasses.HELPER_TEXT_VALIDATION_MSG);
        else this.adapter.removeClass(_constants.cssClasses.HELPER_TEXT_VALIDATION_MSG);
    };
    /**
     * Makes the helper text visible to the screen reader.
     */ MDCTextFieldHelperTextFoundation.prototype.showToScreenReader = function() {
        this.adapter.removeAttr(_constants.strings.ARIA_HIDDEN);
    };
    /**
     * Sets the validity of the helper text based on the input validity.
     */ MDCTextFieldHelperTextFoundation.prototype.setValidity = function(inputIsValid) {
        var helperTextIsPersistent = this.adapter.hasClass(_constants.cssClasses.HELPER_TEXT_PERSISTENT);
        var helperTextIsValidationMsg = this.adapter.hasClass(_constants.cssClasses.HELPER_TEXT_VALIDATION_MSG);
        var validationMsgNeedsDisplay = helperTextIsValidationMsg && !inputIsValid;
        if (validationMsgNeedsDisplay) {
            this.showToScreenReader();
            // If role is already alert, refresh it to trigger another announcement
            // from screenreader.
            if (this.adapter.getAttr(_constants.strings.ROLE) === 'alert') this.refreshAlertRole();
            else this.adapter.setAttr(_constants.strings.ROLE, 'alert');
        } else this.adapter.removeAttr(_constants.strings.ROLE);
        if (!helperTextIsPersistent && !validationMsgNeedsDisplay) this.hide();
    };
    /**
     * Hides the help text from screen readers.
     */ MDCTextFieldHelperTextFoundation.prototype.hide = function() {
        this.adapter.setAttr(_constants.strings.ARIA_HIDDEN, 'true');
    };
    MDCTextFieldHelperTextFoundation.prototype.refreshAlertRole = function() {
        var _this = this;
        this.adapter.removeAttr(_constants.strings.ROLE);
        requestAnimationFrame(function() {
            _this.adapter.setAttr(_constants.strings.ROLE, 'alert');
        });
    };
    return MDCTextFieldHelperTextFoundation;
}(_foundation.MDCFoundation);
exports.default = MDCTextFieldHelperTextFoundation1;

},{"tslib":"j55WF","@material/base/foundation":"6nwGh","./constants":"dL6SR","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"dL6SR":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "strings", ()=>strings
);
parcelHelpers.export(exports, "cssClasses", ()=>cssClasses
);
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */ var cssClasses = {
    HELPER_TEXT_PERSISTENT: 'mdc-text-field-helper-text--persistent',
    HELPER_TEXT_VALIDATION_MSG: 'mdc-text-field-helper-text--validation-msg',
    ROOT: 'mdc-text-field-helper-text'
};
var strings = {
    ARIA_HIDDEN: 'aria-hidden',
    ROLE: 'role',
    ROOT_SELECTOR: "." + cssClasses.ROOT
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"8EzHS":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "MDCTextFieldIcon", ()=>MDCTextFieldIcon1
);
/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */ var _tslib = require("tslib");
var _component = require("@material/base/component");
var _foundation = require("./foundation");
var MDCTextFieldIcon1 = function(_super) {
    _tslib.__extends(MDCTextFieldIcon, _super);
    function MDCTextFieldIcon() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MDCTextFieldIcon.attachTo = function(root) {
        return new MDCTextFieldIcon(root);
    };
    Object.defineProperty(MDCTextFieldIcon.prototype, "foundationForTextField", {
        // Provided for access by MDCTextField component
        get: function() {
            return this.foundation;
        },
        enumerable: false,
        configurable: true
    });
    MDCTextFieldIcon.prototype.getDefaultFoundation = function() {
        var _this = this;
        // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
        // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
        // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
        var adapter = {
            getAttr: function(attr) {
                return _this.root.getAttribute(attr);
            },
            setAttr: function(attr, value) {
                return _this.root.setAttribute(attr, value);
            },
            removeAttr: function(attr) {
                return _this.root.removeAttribute(attr);
            },
            setContent: function(content) {
                _this.root.textContent = content;
            },
            registerInteractionHandler: function(evtType, handler) {
                return _this.listen(evtType, handler);
            },
            deregisterInteractionHandler: function(evtType, handler) {
                return _this.unlisten(evtType, handler);
            },
            notifyIconAction: function() {
                return _this.emit(_foundation.MDCTextFieldIconFoundation.strings.ICON_EVENT, {
                } /* evtData */ , true);
            }
        };
        // tslint:enable:object-literal-sort-keys
        return new _foundation.MDCTextFieldIconFoundation(adapter);
    };
    return MDCTextFieldIcon;
}(_component.MDCComponent);

},{"tslib":"j55WF","@material/base/component":"4ISbx","./foundation":"fZFC5","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"fZFC5":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "MDCTextFieldIconFoundation", ()=>MDCTextFieldIconFoundation1
);
/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */ var _tslib = require("tslib");
var _foundation = require("@material/base/foundation");
var _constants = require("./constants");
var INTERACTION_EVENTS = [
    'click',
    'keydown'
];
var MDCTextFieldIconFoundation1 = function(_super) {
    _tslib.__extends(MDCTextFieldIconFoundation, _super);
    function MDCTextFieldIconFoundation(adapter) {
        var _this = _super.call(this, _tslib.__assign(_tslib.__assign({
        }, MDCTextFieldIconFoundation.defaultAdapter), adapter)) || this;
        _this.savedTabIndex = null;
        _this.interactionHandler = function(evt) {
            _this.handleInteraction(evt);
        };
        return _this;
    }
    Object.defineProperty(MDCTextFieldIconFoundation, "strings", {
        get: function() {
            return _constants.strings;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCTextFieldIconFoundation, "cssClasses", {
        get: function() {
            return _constants.cssClasses;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCTextFieldIconFoundation, "defaultAdapter", {
        /**
         * See {@link MDCTextFieldIconAdapter} for typing information on parameters and return types.
         */ get: function() {
            // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
            return {
                getAttr: function() {
                    return null;
                },
                setAttr: function() {
                    return undefined;
                },
                removeAttr: function() {
                    return undefined;
                },
                setContent: function() {
                    return undefined;
                },
                registerInteractionHandler: function() {
                    return undefined;
                },
                deregisterInteractionHandler: function() {
                    return undefined;
                },
                notifyIconAction: function() {
                    return undefined;
                }
            };
        // tslint:enable:object-literal-sort-keys
        },
        enumerable: false,
        configurable: true
    });
    MDCTextFieldIconFoundation.prototype.init = function() {
        var e_1, _a;
        this.savedTabIndex = this.adapter.getAttr('tabindex');
        try {
            for(var INTERACTION_EVENTS_1 = _tslib.__values(INTERACTION_EVENTS), INTERACTION_EVENTS_1_1 = INTERACTION_EVENTS_1.next(); !INTERACTION_EVENTS_1_1.done; INTERACTION_EVENTS_1_1 = INTERACTION_EVENTS_1.next()){
                var evtType = INTERACTION_EVENTS_1_1.value;
                this.adapter.registerInteractionHandler(evtType, this.interactionHandler);
            }
        } catch (e_1_1) {
            e_1 = {
                error: e_1_1
            };
        } finally{
            try {
                if (INTERACTION_EVENTS_1_1 && !INTERACTION_EVENTS_1_1.done && (_a = INTERACTION_EVENTS_1.return)) _a.call(INTERACTION_EVENTS_1);
            } finally{
                if (e_1) throw e_1.error;
            }
        }
    };
    MDCTextFieldIconFoundation.prototype.destroy = function() {
        var e_2, _a;
        try {
            for(var INTERACTION_EVENTS_2 = _tslib.__values(INTERACTION_EVENTS), INTERACTION_EVENTS_2_1 = INTERACTION_EVENTS_2.next(); !INTERACTION_EVENTS_2_1.done; INTERACTION_EVENTS_2_1 = INTERACTION_EVENTS_2.next()){
                var evtType = INTERACTION_EVENTS_2_1.value;
                this.adapter.deregisterInteractionHandler(evtType, this.interactionHandler);
            }
        } catch (e_2_1) {
            e_2 = {
                error: e_2_1
            };
        } finally{
            try {
                if (INTERACTION_EVENTS_2_1 && !INTERACTION_EVENTS_2_1.done && (_a = INTERACTION_EVENTS_2.return)) _a.call(INTERACTION_EVENTS_2);
            } finally{
                if (e_2) throw e_2.error;
            }
        }
    };
    MDCTextFieldIconFoundation.prototype.setDisabled = function(disabled) {
        if (!this.savedTabIndex) return;
        if (disabled) {
            this.adapter.setAttr('tabindex', '-1');
            this.adapter.removeAttr('role');
        } else {
            this.adapter.setAttr('tabindex', this.savedTabIndex);
            this.adapter.setAttr('role', _constants.strings.ICON_ROLE);
        }
    };
    MDCTextFieldIconFoundation.prototype.setAriaLabel = function(label) {
        this.adapter.setAttr('aria-label', label);
    };
    MDCTextFieldIconFoundation.prototype.setContent = function(content) {
        this.adapter.setContent(content);
    };
    MDCTextFieldIconFoundation.prototype.handleInteraction = function(evt) {
        var isEnterKey = evt.key === 'Enter' || evt.keyCode === 13;
        if (evt.type === 'click' || isEnterKey) {
            evt.preventDefault(); // stop click from causing host label to focus
            // input
            this.adapter.notifyIconAction();
        }
    };
    return MDCTextFieldIconFoundation;
}(_foundation.MDCFoundation);
exports.default = MDCTextFieldIconFoundation1;

},{"tslib":"j55WF","@material/base/foundation":"6nwGh","./constants":"cnC1i","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"cnC1i":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "strings", ()=>strings
);
parcelHelpers.export(exports, "cssClasses", ()=>cssClasses
);
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */ var strings = {
    ICON_EVENT: 'MDCTextField:icon',
    ICON_ROLE: 'button'
};
var cssClasses = {
    ROOT: 'mdc-text-field__icon'
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"jwg2T":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"eS7XF":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "characterCountCssClasses", ()=>_constants.cssClasses
);
parcelHelpers.export(exports, "characterCountStrings", ()=>_constants.strings
);
/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */ var _adapter = require("./adapter");
parcelHelpers.exportAll(_adapter, exports);
var _component = require("./component");
parcelHelpers.exportAll(_component, exports);
var _foundation = require("./foundation");
parcelHelpers.exportAll(_foundation, exports);
var _constants = require("./constants");

},{"./adapter":"kdHEW","./component":"5GngY","./foundation":"5EQM4","./constants":"jJ2IH","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"kdHEW":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"1lfbK":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "helperTextCssClasses", ()=>_constants.cssClasses
);
parcelHelpers.export(exports, "helperTextStrings", ()=>_constants.strings
);
/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */ var _adapter = require("./adapter");
parcelHelpers.exportAll(_adapter, exports);
var _component = require("./component");
parcelHelpers.exportAll(_component, exports);
var _foundation = require("./foundation");
parcelHelpers.exportAll(_foundation, exports);
var _constants = require("./constants");

},{"./adapter":"j06tc","./component":"k2Pal","./foundation":"h7qcr","./constants":"dL6SR","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"j06tc":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"dtT1q":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "iconCssClasses", ()=>_constants.cssClasses
);
parcelHelpers.export(exports, "iconStrings", ()=>_constants.strings
);
/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */ var _adapter = require("./adapter");
parcelHelpers.exportAll(_adapter, exports);
var _component = require("./component");
parcelHelpers.exportAll(_component, exports);
var _foundation = require("./foundation");
parcelHelpers.exportAll(_foundation, exports);
var _constants = require("./constants");

},{"./adapter":"ibszL","./component":"8EzHS","./foundation":"fZFC5","./constants":"cnC1i","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"ibszL":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"hwIGQ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _mithril = require("mithril");
var _mithrilDefault = parcelHelpers.interopDefault(_mithril);
var _iconButton = require("../icon-button/icon-button");
var _iconButtonDefault = parcelHelpers.interopDefault(_iconButton);
var _services = require("../../services");
var _toastOutletScss = require("./toast-outlet.scss");
class ToastOutlet {
    constructor(){
    }
    close(toast1) {
        _services.Toaster.remove(toast1.id);
    }
    view() {
        return _mithrilDefault.default("ul", {
            class: "toasts"
        }, _services.Toaster.toasts.map((toast)=>{
            return _mithrilDefault.default("li", {
                class: toast.type ? `toast toast--${toast.type}` : null,
                onclick: ()=>{
                    this.close(toast);
                }
            }, _mithrilDefault.default("div", {
                class: "toast__text"
            }, toast.text), toast.closeButton && _mithrilDefault.default(_iconButtonDefault.default, {
                icon: "close"
            }));
        }));
    }
}
module.exports = ToastOutlet;

},{"mithril":"a7UJj","../icon-button/icon-button":"9YaD7","../../services":"5OF80","./toast-outlet.scss":"2mzZ5","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"2mzZ5":[function() {},{}],"34kZD":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _mithril = require("mithril");
var _mithrilDefault = parcelHelpers.interopDefault(_mithril);
var _containerJsx = require("../container/container.jsx");
var _containerJsxDefault = parcelHelpers.interopDefault(_containerJsx);
var _unauthedNavScss = require("./unauthed-nav.scss");
var _keepPng = require("../../../assets/img/logo/keep.png");
var _keepPngDefault = parcelHelpers.interopDefault(_keepPng);
class UnauthedNav {
    constructor(){
    }
    oninit() {
    }
    onremove() {
    }
    view() {
        return _mithrilDefault.default("div", {
            class: "unauthedNav"
        }, _mithrilDefault.default(_containerJsxDefault.default, null, _mithrilDefault.default("div", {
            class: "unauthedNav__content"
        }, _mithrilDefault.default("h2", {
            class: "unauthedNav__title"
        }, _mithrilDefault.default(_mithrilDefault.default.route.Link, {
            class: "unauthedNav__link",
            href: "/"
        }, _mithrilDefault.default("img", {
            src: _keepPngDefault.default
        }))), _mithrilDefault.default("div", {
            class: "unauthedNav__spacer"
        }))));
    }
}
module.exports = UnauthedNav;

},{"mithril":"a7UJj","../container/container.jsx":"gLTp9","./unauthed-nav.scss":"5Jeg9","../../../assets/img/logo/keep.png":"1w9S7","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"5Jeg9":[function() {},{}],"8usp0":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _mithril = require("mithril");
var _mithrilDefault = parcelHelpers.interopDefault(_mithril);
var _components = require("../../src/app/components");
class Download {
    view() {
        return _mithrilDefault.default('[', null, _mithrilDefault.default(_components.Container, null, _mithrilDefault.default(_components.Button, {
            raised: true,
            label: "Download Software"
        })));
    }
}
module.exports = Download;

},{"mithril":"a7UJj","../../src/app/components":"h8DOh","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"g78wu":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _mithril = require("mithril");
var _mithrilDefault = parcelHelpers.interopDefault(_mithril);
var _components = require("../../src/app/components");
class Splash {
    view() {
        return _mithrilDefault.default('[', null, _mithrilDefault.default(_components.Container, null, _mithrilDefault.default(_components.Button, {
            raised: true,
            label: "Get Started",
            onclick: ()=>{
                _mithrilDefault.default.route.set('/download');
            }
        })));
    }
}
module.exports = Splash;

},{"mithril":"a7UJj","../../src/app/components":"h8DOh","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"bryrU":[function() {},{}],"8ZQcx":[function() {},{}],"5ZgLC":[function() {},{}],"fHhYm":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _mithril = require("mithril");
var _mithrilDefault = parcelHelpers.interopDefault(_mithril);
var _moment = require("moment");
var _momentDefault = parcelHelpers.interopDefault(_moment);
var _components = require("../../src/app/components");
class StyleGuide {
    constructor(){
        this.modalOpen = false;
        this.dateRangeStart = _momentDefault.default();
        this.dateRangeEnd = _momentDefault.default();
    }
    view() {
        return _mithrilDefault.default('[', null, _mithrilDefault.default(_components.Modal, {
            style: {
                animation: '0.4s slideInTop',
                width: '320px'
            },
            isOpen: this.modalOpen,
            onClose: ()=>{
                this.modalOpen = false;
            },
            header: _mithrilDefault.default("h1", null, "Header"),
            content: _mithrilDefault.default("p", null, "Content"),
            footer: _mithrilDefault.default("p", null, "Footer")
        }), _mithrilDefault.default(_components.Container, null, _mithrilDefault.default(_components.Card, {
            class: "headspace"
        }, _mithrilDefault.default("h1", null, "Styles & Examples"), _mithrilDefault.default("h3", null, "Button"), _mithrilDefault.default(_components.Button, {
            label: "Text"
        }), _mithrilDefault.default(_components.Button, {
            outlined: true,
            label: "Outlined"
        }), _mithrilDefault.default(_components.Button, {
            raised: true,
            label: "Raised"
        }), _mithrilDefault.default(_components.Button, {
            iconLeading: "search",
            label: "Icon Leading"
        }), _mithrilDefault.default(_components.Button, {
            iconTrailing: "search",
            label: "Icon Trailing"
        }), _mithrilDefault.default(_components.Button, {
            ripple: false,
            label: "No Ripple"
        }), _mithrilDefault.default(_components.Button, {
            class: "button__gray",
            label: "Gray"
        }), _mithrilDefault.default("h3", null, "Icon Button"), _mithrilDefault.default(_components.IconButton, {
            icon: "search"
        }), _mithrilDefault.default(_components.IconButton, {
            icon: "visibility",
            ripple: false
        }), _mithrilDefault.default("h3", null, "Text Field"), _mithrilDefault.default(_components.TextField, {
            filled: true,
            label: "Filled",
            placeholder: "Placeholder"
        }), _mithrilDefault.default(_components.TextField, {
            outlined: true,
            label: "Outlined",
            placeholder: "Placeholder"
        }), _mithrilDefault.default("label", {
            class: "label"
        }, "No Label"), _mithrilDefault.default(_components.TextField, {
            filled: true,
            placeholder: "Placeholder"
        }), _mithrilDefault.default(_components.TextField, {
            outlined: true,
            placeholder: "Placeholder"
        }), _mithrilDefault.default("label", {
            class: "label"
        }, "Disabled"), _mithrilDefault.default(_components.TextField, {
            filled: true,
            disabled: true,
            placeholder: "Placeholder"
        }), _mithrilDefault.default(_components.TextField, {
            outlined: true,
            disabled: true,
            placeholder: "Placeholder"
        }), _mithrilDefault.default("label", {
            class: "label"
        }, "Fluid"), _mithrilDefault.default(_components.TextField, {
            fluid: true,
            outlined: true,
            label: "Label",
            placeholder: "Placeholder"
        }), _mithrilDefault.default("h3", null, "Text Area"), _mithrilDefault.default(_components.TextField, {
            textarea: true,
            filled: true,
            placeholder: "Placeholder"
        }), _mithrilDefault.default(_components.TextField, {
            textarea: true,
            outlined: true,
            placeholder: "Placeholder"
        }), _mithrilDefault.default("h3", null, "Select"), _mithrilDefault.default(_components.Select, null), _mithrilDefault.default("h3", null, "Modal"), _mithrilDefault.default(_components.Button, {
            raised: true,
            label: "Open Modal",
            onclick: ()=>{
                this.modalOpen = true;
            }
        }), _mithrilDefault.default("h3", null, "Date Range"), _mithrilDefault.default(_components.DateRange, {
            startDate: this.dateRangeStart,
            startDateChange: (date)=>{
                this.dateRangeStart = date;
            },
            endDate: this.dateRangeEnd,
            endDateChange: (date)=>{
                this.dateRangeEnd = date;
            }
        }), _mithrilDefault.default("h3", null, "Breadcrumb"), _mithrilDefault.default(_components.Breadcrumb, {
            items: [
                {
                    href: '/',
                    text: 'Home'
                },
                {
                    href: null,
                    text: 'Style Guide'
                }
            ]
        }), _mithrilDefault.default("h3", null, "Spinner"), _mithrilDefault.default(_components.Spinner, null), _mithrilDefault.default("h3", null, "Typography"), _mithrilDefault.default("h1", null, "h1"), _mithrilDefault.default("h2", null, "h2"), _mithrilDefault.default("h3", null, "h3"), _mithrilDefault.default("h4", null, "h4"), _mithrilDefault.default("h5", null, "h5"), _mithrilDefault.default("h6", null, "h6"), _mithrilDefault.default("p", null, "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."), _mithrilDefault.default("p", {
            class: "error"
        }, "I'm an error."), _mithrilDefault.default("h3", null, "Links"), _mithrilDefault.default("ul", null, _mithrilDefault.default("li", null, _mithrilDefault.default(_mithrilDefault.default.route.Link, {
            href: "/tutorial"
        }, "Tutorial")), _mithrilDefault.default("li", null, _mithrilDefault.default(_mithrilDefault.default.route.Link, {
            href: "/error"
        }, "Error")), _mithrilDefault.default("li", null, _mithrilDefault.default(_mithrilDefault.default.route.Link, {
            href: "/style-guide"
        }, "Style Guide"))))));
    }
}
module.exports = StyleGuide;

},{"mithril":"a7UJj","moment":"1RrsF","../../src/app/components":"h8DOh","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}]},["4w6mE","aCPO5"], "aCPO5", "parcelRequire29f5")

//# sourceMappingURL=index.323cfff2.js.map
