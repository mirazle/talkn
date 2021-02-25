module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ({

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("hUgY");


/***/ }),

/***/ "4Q3z":
/***/ (function(module, exports) {

module.exports = require("next/router");

/***/ }),

/***/ "8+rz":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return LoadingState; });
/* unused harmony export MediaTypeState */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return MktTypeState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CategoryState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return UrlState; });
/* harmony import */ var recoil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("XGOH");
/* harmony import */ var recoil__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(recoil__WEBPACK_IMPORTED_MODULE_0__);

const defaultMediaType = String("news");
const defaultMktType = String("ja-JP");
const LoadingState = Object(recoil__WEBPACK_IMPORTED_MODULE_0__["atom"])({
  key: 'LoadingState',
  default: false
});
const MediaTypeState = Object(recoil__WEBPACK_IMPORTED_MODULE_0__["atom"])({
  key: 'mediaTypeState',
  default: defaultMediaType
});
const MktTypeState = Object(recoil__WEBPACK_IMPORTED_MODULE_0__["atom"])({
  key: 'mktTypeState',
  default: defaultMktType
});
const CategoryState = Object(recoil__WEBPACK_IMPORTED_MODULE_0__["atom"])({
  key: 'categoryState',
  default: ''
});
const UrlState = Object(recoil__WEBPACK_IMPORTED_MODULE_0__["atom"])({
  key: 'urlState',
  default: ''
});

/***/ }),

/***/ "Dtiu":
/***/ (function(module, exports) {

module.exports = require("styled-components");

/***/ }),

/***/ "F5FC":
/***/ (function(module, exports) {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ "XGOH":
/***/ (function(module, exports) {

module.exports = require("recoil");

/***/ }),

/***/ "cDcd":
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "dyMP":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var sass_extract_loader_plugins_sass_extract_js_styles_variables_module_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("xsP5");
/* harmony import */ var sass_extract_loader_plugins_sass_extract_js_styles_variables_module_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sass_extract_loader_plugins_sass_extract_js_styles_variables_module_scss__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["a"] = (sass_extract_loader_plugins_sass_extract_js_styles_variables_module_scss__WEBPACK_IMPORTED_MODULE_0___default.a);

/***/ }),

/***/ "hUgY":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__("F5FC");

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__("cDcd");

// EXTERNAL MODULE: external "recoil"
var external_recoil_ = __webpack_require__("XGOH");

// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__("4Q3z");
var router_default = /*#__PURE__*/__webpack_require__.n(router_);

// EXTERNAL MODULE: ./src/state/index.ts
var state = __webpack_require__("8+rz");

// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__("Dtiu");
var external_styled_components_default = /*#__PURE__*/__webpack_require__.n(external_styled_components_);

// CONCATENATED MODULE: ./src/components/atoms/Spinner.tsx



const Spinner_Component = ({
  size
}) => /*#__PURE__*/Object(jsx_runtime_["jsx"])(Icon, {
  size: size
});

const Icon = external_styled_components_default.a.div.withConfig({
  displayName: "Spinner__Icon",
  componentId: "sc-1c85pa9-0"
})(["width:", ";height:", ";border-top:0.5em solid rgba(79,174,159,0.7);border-right:0.5em solid rgba(0,0,0,0);border-bottom:0.5em solid rgba(0,0,0,0);border-left:0.5em solid rgba(0,0,0,0);border-radius:50%;animation:load8 1s infinite cubic-bezier(0.39,0.58,0.57,1);@keyframes load8{0%{transform:rotate(0deg);}100%{transform:rotate(360deg);}}"], props => props.size, props => props.size);
/* harmony default export */ var Spinner = (Spinner_Component);
// EXTERNAL MODULE: ./src/styles/StylesVars.ts
var StylesVars = __webpack_require__("dyMP");

// CONCATENATED MODULE: ./src/components/templates/PageWithLoadingSpinner.tsx











const spinnerSize = '80px';

const PageWithLoadingSpinner_Component = ({
  children
}) => {
  const [isLoading, setIsLoading] = Object(external_recoil_["useRecoilState"])(state["b" /* LoadingState */]);
  Object(external_react_["useEffect"])(() => {
    const startLoad = () => setIsLoading(true);

    const stopLoad = () => setIsLoading(false);

    router_default.a.events.on('routeChangeStart', startLoad);
    router_default.a.events.on('routeChangeComplete', stopLoad);
    router_default.a.events.on('routeChangeError', stopLoad);
    return () => {
      router_default.a.events.off('routeChangeStart', startLoad);
      router_default.a.events.off('routeChangeComplete', stopLoad);
      router_default.a.events.off('routeChangeError', stopLoad);
    };
  }, [setIsLoading]);
  const router = Object(router_["useRouter"])();
  return /*#__PURE__*/Object(jsx_runtime_["jsxs"])(jsx_runtime_["Fragment"], {
    children: [(router.isFallback || isLoading) && /*#__PURE__*/Object(jsx_runtime_["jsx"])(Wrapper, {
      children: /*#__PURE__*/Object(jsx_runtime_["jsx"])(Spinner, {
        size: spinnerSize
      })
    }), !router.isFallback && children]
  });
};

const Wrapper = external_styled_components_default.a.div.withConfig({
  displayName: "PageWithLoadingSpinner__Wrapper",
  componentId: "sc-1jhlvzt-0"
})(["position:fixed;z-index:", ";width:100vw;height:100vh;> *{position:fixed;top:calc((100vh - ", ") / 2);left:calc((100vw - ", ") / 2);z-index:", ";}"], StylesVars["a" /* default */].loadingAreaZindex, spinnerSize, spinnerSize, StylesVars["a" /* default */].loadingAreaZindex);
/* harmony default export */ var PageWithLoadingSpinner = (PageWithLoadingSpinner_Component);
// EXTERNAL MODULE: ./src/styles/global.scss
var global = __webpack_require__("t+Ps");

// CONCATENATED MODULE: ./src/pages/_app.tsx


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



 // import useGtag from 'hooks/useGtag';



const App = ({
  Component,
  pageProps
}) => {
  // useGtag();
  return /*#__PURE__*/Object(jsx_runtime_["jsx"])(external_recoil_["RecoilRoot"], {
    children: /*#__PURE__*/Object(jsx_runtime_["jsx"])(PageWithLoadingSpinner, {
      children: /*#__PURE__*/Object(jsx_runtime_["jsx"])(Component, _objectSpread({}, pageProps))
    })
  });
};

/* harmony default export */ var _app = __webpack_exports__["default"] = (App); // useContext
// export const Context = React.createContext({});
// <Context.Provider value={{ name: 'to-R Media' }}>
// </Context.Provider>

/***/ }),

/***/ "t+Ps":
/***/ (function(module, exports) {



/***/ }),

/***/ "xsP5":
/***/ (function(module, exports) {

module.exports = {"maxWidth":1070,"baseHeight":60,"topImageSectionDefaultHeight":300,"loadingAreaZindex":10000,"modalZindex":21,"headerListZindex":20,"headerZindex":10,"tab":960,"spLayoutWidth":720,"sp":480,"headerHeightWide":"80px","headerHeightNarrow":"60px","transitionDuration1":"0.1s","transitionDuration2":"0.2s","transitionDuration":"0.3s","keycolor":"rgb(52, 117, 204)","txtColor":"rgb(51, 51, 51)","emtxtColor":"rgb(0, 0, 0)","baseBackground":"rgb(255, 255, 255)","grayBackground":"rgb(248, 248, 248)","coverageBackground":"rgb(245, 249, 255)","defaultShadow":"rgba(0, 0, 0, 0.05)","defaultCardShadow":"rgba(0, 0, 0, 0.1)","tableBorder":"rgb(235, 235, 235)","thBackground":"rgb(247, 247, 247)","listTxtColor":"rgb(89, 89, 89)","listBackground":"rgb(249, 249, 249)","listBorder":"rgb(213, 213, 213)","listBorderLight":"rgb(240, 240, 240)","listTxtColorForBgdark":"rgb(179, 179, 179)","modalOverlay":"rgba(0, 0, 0, 0.7)","white":"rgb(255, 255, 255)","black":"rgb(0, 0, 0)","bgColor":"rgb(221, 221, 221)","borderColor":"rgb(238, 221, 238)","themeColor":"rgb(79, 174, 159)"};

/***/ })

/******/ });