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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ({

/***/ "/T1H":
/***/ (function(module, exports) {

module.exports = require("next/dynamic");

/***/ }),

/***/ "1jgn":
/***/ (function(module) {

module.exports = JSON.parse("[{\"Market\":\"en-US\",\"Country\":\"United States\",\"Categories\":[{\"category\":\"Top\",\"label\":\"TOP\"},{\"category\":\"Business\",\"label\":\"Business\"},{\"category\":\"Entertainment\",\"label\":\"Entertainment\"},{\"category\":\"Health\",\"label\":\"Health\"},{\"category\":\"Politics\",\"label\":\"Politics\"},{\"category\":\"Products\",\"label\":\"Products\"},{\"category\":\"ScienceAndTechnology\",\"label\":\"Science&Tech\"},{\"category\":\"Sports\",\"label\":\"Sports\"},{\"category\":\"US\",\"label\":\"US\"},{\"category\":\"World\",\"label\":\"World\"}]},{\"Market\":\"en-AU\",\"Country\":\"Australia\",\"Categories\":[{\"category\":\"Top\",\"label\":\"TOP\"},{\"category\":\"Australia\",\"label\":\"Australia\"},{\"category\":\"Business\",\"label\":\"Business\"},{\"category\":\"Entertainment\",\"label\":\"Entertainment\"},{\"category\":\"Politics\",\"label\":\"Politics\"},{\"category\":\"Sports\",\"label\":\"Sports\"},{\"category\":\"World\",\"label\":\"World\"}]},{\"Market\":\"en-CA\",\"Country\":\"Canada\",\"Categories\":[{\"category\":\"Top\",\"label\":\"TOP\"},{\"category\":\"Business\",\"label\":\"Business\"},{\"category\":\"Canada\",\"label\":\"Canada\"},{\"category\":\"Entertainment\",\"label\":\"Entertainment\"},{\"category\":\"LifeStyle\",\"label\":\"LifeStyle\"},{\"category\":\"Politics\",\"label\":\"Politics\"},{\"category\":\"ScienceAndTechnology\",\"label\":\"Science&Tech\"},{\"category\":\"Sports\",\"label\":\"Sports\"},{\"category\":\"World\",\"label\":\"World\"}]},{\"Market\":\"zh-CN\",\"Country\":\"China\",\"Categories\":[{\"category\":\"Top\",\"label\":\"TOP\"},{\"category\":\"Auto\",\"label\":\"Auto\"},{\"category\":\"Business\",\"label\":\"Business\"},{\"category\":\"China\",\"label\":\"China\"},{\"category\":\"Education\",\"label\":\"Education\"},{\"category\":\"Entertainment\",\"label\":\"Entertainment\"},{\"category\":\"Military\",\"label\":\"Military\"},{\"category\":\"RealEstate\",\"label\":\"RealEstate\"},{\"category\":\"ScienceAndTechnology\",\"label\":\"Science&Tech\"},{\"category\":\"Society\",\"label\":\"Society\"},{\"category\":\"Sports\",\"label\":\"Sports\"},{\"category\":\"World\",\"label\":\"World\"}]},{\"Market\":\"en-IN\",\"Country\":\"India\",\"Categories\":[{\"category\":\"Top\",\"label\":\"TOP\"},{\"category\":\"Business\",\"label\":\"Business\"},{\"category\":\"Entertainment\",\"label\":\"Entertainment\"},{\"category\":\"India\",\"label\":\"India\"},{\"category\":\"LifeStyle\",\"label\":\"LifeStyle\"},{\"category\":\"Politics\",\"label\":\"Politics\"},{\"category\":\"ScienceAndTechnology\",\"label\":\"Science&Tech\"},{\"category\":\"Sports\",\"label\":\"Sports\"},{\"category\":\"World\",\"label\":\"World\"}]},{\"Market\":\"ja-JP\",\"Country\":\"Japan\",\"Categories\":[{\"category\":\"Top\",\"label\":\"TOP\"},{\"category\":\"Business\",\"label\":\"経済\"},{\"category\":\"Entertainment\",\"label\":\"エンタメ\"},{\"category\":\"Japan\",\"label\":\"国内\"},{\"category\":\"LifeStyle\",\"label\":\"ライフ\"},{\"category\":\"Politics\",\"label\":\"政治\"},{\"category\":\"ScienceAndTechnology\",\"label\":\"IT・科学\"},{\"category\":\"Sports\",\"label\":\"スポーツ\"},{\"category\":\"World\",\"label\":\"国際\"}]},{\"Market\":\"en-GB\",\"Country\":\"United Kingdom\",\"Categories\":[{\"category\":\"Top\",\"label\":\"TOP\"},{\"category\":\"Business\",\"label\":\"Business\"},{\"category\":\"Entertainment\",\"label\":\"Entertainment\"},{\"category\":\"Health\",\"label\":\"Health\"},{\"category\":\"Politics\",\"label\":\"Politics\"},{\"category\":\"ScienceAndTechnology\",\"label\":\"Science&Tech\"},{\"category\":\"Sports\",\"label\":\"Sports\"},{\"category\":\"UK\",\"label\":\"UK\"},{\"category\":\"World\",\"label\":\"World\"}]}]");

/***/ }),

/***/ 4:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("QeBL");


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

/***/ "FJ2h":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export localhost */
/* unused harmony export producthost */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return talknScriptHost; });
/* unused harmony export MediaTypeNews */
/* unused harmony export MediaTypeTrend */
/* unused harmony export MediaTypeGirlsNews */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getNetwork; });
const env = "development";
const localhost = 'localhost';
const producthost = 'talkn.io';
const talknScriptHost = env === 'development' ? localhost : producthost; // talkn live media.

const MediaTypeNews = 'news';
const MediaTypeTrend = 'trend';
const MediaTypeGirlsNews = 'girlsNews';

/*
  where	検索で使用される市場 (場所と言語) を選択するドロップダウン メニュー。
  query	検索語句を入力するテキスト フィールド。
  category	特定の種類の結果のレベルを上げる際に使用するチェック ボックス。 たとえば、健康ニュースのランクを上げると、健康の順位が上がります。
    MaxClass, World, Japan, Business, Entertainment, Sports, ScienceAndTechnology, Politics, LifeStyle
  when	オプションとして、最近の日、週、または月に検索を限定するためのドロップダウン メニュー。
  safe	"成人向け" の結果をフィルターで除外する Bing のセーフサーチ機能を使用するかどうかを指定するチェック ボックス。
  count	隠しフィールド。 各要求に対して返される検索結果の数。 変更すると、1 ページあたりの結果の表示数が増減します。
  offset	隠しフィールド。 要求における最初の検索結果のオフセット。ページングに使用されます。 新しい要求では 0 にリセットされます。

  https://docs.microsoft.com/en-us/rest/api/cognitiveservices-bingsearch/bing-news-api-v7-reference#news-categories-by-market
*/
const NetworkNews = {
  method: 'GET',
  endpoint: 'https://microsoft-azure-bing-news-search-v1.p.rapidapi.com/?',
  headers: {
    'x-rapidapi-host': 'microsoft-azure-bing-news-search-v1.p.rapidapi.com',
    'x-rapidapi-key': '2ca25813c0msh9db483c3530c143p1009bdjsnde50b6575cf1'
  },
  count: 50
};
const NetworkTrend = {
  method: 'GET',
  endpoint: '',
  headers: {},
  count: 50
};
const NetworkGirlsNews = {
  method: 'GET',
  endpoint: '',
  headers: {},
  count: 50
};
const Networks = {
  [MediaTypeNews]: NetworkNews,
  [MediaTypeTrend]: NetworkTrend,
  [MediaTypeGirlsNews]: NetworkGirlsNews
};
const getNetwork = mediaType => {
  return Networks[mediaType];
};

/***/ }),

/***/ "QeBL":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "getServerSideProps", function() { return /* binding */ getServerSideProps; });

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__("F5FC");

// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__("4Q3z");

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__("cDcd");

// EXTERNAL MODULE: external "recoil"
var external_recoil_ = __webpack_require__("XGOH");

// EXTERNAL MODULE: ./src/service/index.ts
var service = __webpack_require__("YCKj");

// EXTERNAL MODULE: ./src/state/index.ts
var state = __webpack_require__("8+rz");

// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__("Dtiu");
var external_styled_components_default = /*#__PURE__*/__webpack_require__.n(external_styled_components_);

// EXTERNAL MODULE: ./src/styles/StylesVars.ts
var StylesVars = __webpack_require__("dyMP");

// CONCATENATED MODULE: ./src/components/molecules/BoxList.tsx





const ThemeGreen = 'green';
const ThemeDark = 'dark';

const BoxList = props => {
  const addClassName = props.className ? props.className : '';
  const className = props.active ? `${addClassName} active` : addClassName;
  return /*#__PURE__*/Object(jsx_runtime_["jsx"])(Container, {
    theme: props.theme,
    className: className,
    children: /*#__PURE__*/Object(jsx_runtime_["jsxs"])("button", {
      onClick: e => props.onClick && props.onClick(e),
      children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("label", {
        children: props.label
      }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("div", {
        className: "lamp",
        children: "\xA0"
      })]
    })
  }, props.label);
};

BoxList.defaultProps = {
  active: false,
  theme: ThemeGreen
};
/* harmony default export */ var molecules_BoxList = (BoxList);
const Container = external_styled_components_default.a.li.withConfig({
  displayName: "BoxList__Container",
  componentId: "rdrwvi-0"
})(["display:flex;flex-flow:row wrap;align-items:center;justify-content:center;width:auto;height:", "px;button{display:flex;flex-flow:column wrap;align-items:center;justify-content:center;width:100%;height:100%;color:", ";cursor:pointer;background:", ";border:0;outline:0;transition:", ";}button:hover{background:", ";}.lamp{position:relative;width:50%;max-width:50px;height:10px;cursor:pointer;background:", ";border-radius:10px;transition:", ";}label{position:relative;margin-bottom:6px;cursor:pointer;}&.active div.lamp{cursor:pointer;background:", ";}a{display:flex;flex-flow:column nowrap;align-items:center;justify-content:center;width:100%;height:100%;color:", ";cursor:pointer;background:", ";}"], Number(StylesVars["a" /* default */].baseHeight), props => props.theme === ThemeGreen ? 'rgba(0, 0, 0, 1)' : 'rgba(255, 255, 255, 1)', props => props.theme === ThemeGreen ? 'rgba(255, 255, 255, 1)' : 'rgba(68, 68, 68, 1)', StylesVars["a" /* default */].transitionDuration, props => props.theme === ThemeGreen ? 'rgba(245, 245, 245, 1)' : 'rgba(98, 98, 98, 1)', props => props.theme === ThemeGreen ? StylesVars["a" /* default */].bgColor : 'rgba(155, 155, 155, 1)', StylesVars["a" /* default */].transitionDuration1, props => props.theme === ThemeGreen ? 'rgba(79, 174, 159, 1)' : 'rgba(79, 174, 159, 1)', props => props.theme === ThemeGreen ? 'rgba(0, 0, 0, 1)' : 'rgba(255, 255, 255, 1)', props => props.theme === ThemeGreen ? 'rgba(255, 255, 255, 1)' : 'rgba(68, 68, 68, 1)');
// CONCATENATED MODULE: ./src/components/organisms/Footer/OtherContents.tsx






const OtherContents = () => {
  return /*#__PURE__*/Object(jsx_runtime_["jsxs"])(OtherContents_Container, {
    children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("h3", {
      children: "- Other Contents -"
    }), /*#__PURE__*/Object(jsx_runtime_["jsxs"])("ul", {
      children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("li", {
        className: "title",
        children: "Talkn For"
      }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(molecules_BoxList, {
        label: "User",
        theme: "dark"
      }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(molecules_BoxList, {
        label: "Website owner",
        theme: "dark"
      }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(molecules_BoxList, {
        label: "Developper(Api)",
        theme: "dark"
      }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(molecules_BoxList, {
        label: "Chrome extension",
        theme: "dark"
      })]
    }), /*#__PURE__*/Object(jsx_runtime_["jsxs"])("ul", {
      children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("li", {
        className: "title",
        children: "Live Media"
      }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(molecules_BoxList, {
        label: "News",
        theme: "dark",
        active: true
      }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(molecules_BoxList, {
        label: "Girls News",
        theme: "dark"
      }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(molecules_BoxList, {
        label: "Trend",
        theme: "dark"
      }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(molecules_BoxList, {
        label: "App",
        theme: "dark"
      }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(molecules_BoxList, {
        label: "Music",
        theme: "dark"
      }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(molecules_BoxList, {
        label: "Video",
        theme: "dark"
      }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(molecules_BoxList, {
        label: "Book",
        theme: "dark"
      })]
    }), /*#__PURE__*/Object(jsx_runtime_["jsxs"])("ul", {
      children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("li", {
        className: "title",
        children: "Include your site"
      }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(molecules_BoxList, {
        label: "API",
        theme: "dark"
      }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(molecules_BoxList, {
        label: "CLIENT",
        theme: "dark"
      })]
    }), /*#__PURE__*/Object(jsx_runtime_["jsxs"])("ul", {
      children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("li", {
        className: "title",
        children: "Contact"
      }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(molecules_BoxList, {
        label: "Contact1",
        theme: "dark"
      }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(molecules_BoxList, {
        label: "Contact2",
        theme: "dark"
      })]
    })]
  });
};

/* harmony default export */ var Footer_OtherContents = (OtherContents);
const OtherContents_Container = external_styled_components_default.a.div.withConfig({
  displayName: "OtherContents__Container",
  componentId: "sc-1qsh6r1-0"
})(["display:flex;flex-flow:row wrap;align-items:flex-start;justify-content:center;width:100%;padding:20px;margin:0 auto;background:rgb(35,35,35);h3{width:100%;margin:20px 0;text-align:center;}ul{display:flex;flex-flow:column wrap;min-width:180px;margin:10px;text-align:center;}li{margin:10px;}li.title{font-weight:500;cursor:default;}"]);
// EXTERNAL MODULE: ./src/json/news/sitemap.json
var news_sitemap = __webpack_require__("1jgn");

// CONCATENATED MODULE: ./src/components/organisms/Footer/Sitemap.tsx







const Sitemap = props => {
  const {
    mktType,
    category,
    redirectTo
  } = props;
  const siteMap = news_sitemap;
  return /*#__PURE__*/Object(jsx_runtime_["jsxs"])(Sitemap_Container, {
    children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("h3", {
      children: "- Sitemap -"
    }), siteMap.map(countryDatas => {
      const country = countryDatas.Country;
      const categories = countryDatas.Categories.map(c => /*#__PURE__*/Object(jsx_runtime_["jsx"])(molecules_BoxList, {
        theme: "dark",
        label: c.label,
        active: countryDatas.Market === mktType && c.category === category,
        onClick: () => redirectTo(countryDatas.Market, c.category)
      }, country + c.label));
      return /*#__PURE__*/Object(jsx_runtime_["jsxs"])("ul", {
        children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("li", {
          className: "title",
          children: country
        }, `${country}title`), categories]
      }, country);
    })]
  });
};

/* harmony default export */ var Footer_Sitemap = (Sitemap);
const Sitemap_Container = external_styled_components_default.a.div.withConfig({
  displayName: "Sitemap__Container",
  componentId: "sc-2cufqb-0"
})(["display:flex;flex-flow:row wrap;align-items:flex-start;justify-content:center;width:100%;padding:20px;margin:0 auto;h3{width:100%;margin:20px 0;text-align:center;}ul{display:flex;flex-flow:column wrap;min-width:180px;margin:10px;text-align:center;}li{margin:10px;}"]);
// CONCATENATED MODULE: ./src/components/organisms/Footer/index.tsx







const Footer = props => {
  const {
    mktType,
    category,
    redirectTo
  } = props;
  return /*#__PURE__*/Object(jsx_runtime_["jsxs"])(Footer_Container, {
    children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(Footer_Sitemap, {
      mktType: mktType,
      category: category,
      redirectTo: redirectTo
    }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(Footer_OtherContents, {}), /*#__PURE__*/Object(jsx_runtime_["jsxs"])(Design, {
      children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(Bar, {}), /*#__PURE__*/Object(jsx_runtime_["jsx"])(BarArrow, {}), /*#__PURE__*/Object(jsx_runtime_["jsx"])(Logo, {}), /*#__PURE__*/Object(jsx_runtime_["jsx"])("div", {
        children: "- \u5168\u3066\u306E\u30B3\u30F3\u30C6\u30F3\u30C4\u306F\u30B3\u30DF\u30CB\u30E5\u30B1\u30FC\u30B7\u30E7\u30F3\u3092\u542B\u3080 -"
      }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(Copyright, {
        children: "Copyright \xA9 talkn, Inc."
      })]
    })]
  });
};

/* harmony default export */ var organisms_Footer = (Footer);
const Footer_Container = external_styled_components_default.a.footer.withConfig({
  displayName: "Footer__Container",
  componentId: "sc-1ephay5-0"
})(["position:relative;z-index:91;display:flex;flex-flow:row wrap;align-items:flex-start;justify-content:center;width:100%;color:#fff;background:#333;"]);
const Design = external_styled_components_default.a.div.withConfig({
  displayName: "Footer__Design",
  componentId: "sc-1ephay5-1"
})(["display:flex;flex-flow:column wrap;align-items:center;justify-content:flex-start;width:100%;height:1200px;background:#111 url(https://assets.talkn.io/img/walk.png) 80% 80% / 200px 40px no-repeat;"]);
const Bar = external_styled_components_default.a.div.withConfig({
  displayName: "Footer__Bar",
  componentId: "sc-1ephay5-2"
})(["width:40px;height:60%;margin-left:30%;background:rgb(35,35,35);"]);
const BarArrow = external_styled_components_default.a.div.withConfig({
  displayName: "Footer__BarArrow",
  componentId: "sc-1ephay5-3"
})(["width:0;height:0;padding:0;margin:0;border-color:transparent transparent rgb(35,35,35) transparent;border-style:solid;border-width:150px 150px 150px 0;transform:translate3d(190px,-203px,0) rotate(315deg);"]);
const Logo = external_styled_components_default.a.div.withConfig({
  displayName: "Footer__Logo",
  componentId: "sc-1ephay5-4"
})(["position:absolute;width:512px;height:512px;background:url(https://assets.talkn.io/img/logo3.png) 100% / 512px no-repeat;opacity:0.2;transform:translate3d(140px,640px,0);"]);
const Copyright = external_styled_components_default.a.div.withConfig({
  displayName: "Footer__Copyright",
  componentId: "sc-1ephay5-5"
})(["display:flex;flex-flow:column wrap;align-items:center;justify-content:center;width:100%;margin-bottom:100px;"]);
// CONCATENATED MODULE: ./src/components/organisms/Header/SelectContentsOrder.tsx






const SelectContentsOrder = props => {
  const {
    isMaxLayout,
    openSelectContentsOrder
  } = props;
  return /*#__PURE__*/Object(jsx_runtime_["jsxs"])(SelectContentsOrder_Container, {
    openSelectContentsOrder: openSelectContentsOrder,
    isMaxLayout: isMaxLayout,
    children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("li", {
      className: "active",
      children: "NEW"
    }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("li", {
      children: "LIVE"
    })]
  });
};

/* harmony default export */ var Header_SelectContentsOrder = (SelectContentsOrder);
const SelectContentsOrder_Container = external_styled_components_default.a.ol.withConfig({
  displayName: "SelectContentsOrder__Container",
  componentId: "tt0ep7-0"
})(["position:fixed;top:", "px;right:", ";display:grid;grid-template-rows:60px 60px;width:320px;height:140px;padding:10px;overflow:hidden;background:rgba(230,230,230,0.94);border-radius:0 0 2px 2px;transition:", ";transform:translate( ", "px,", "px );li{display:flex;flex-flow:row wrap;align-items:center;justify-content:center;width:300px;height:60px;cursor:pointer;background:rgb(245,245,245);}li.active{background:rgb(255,255,255);}"], StylesVars["a" /* default */].baseHeight, props => props.isMaxLayout ? 'unset' : 0, StylesVars["a" /* default */].transitionDuration, props => props.isMaxLayout ? 375 : 0, props => props.openSelectContentsOrder ? 0 : -140);
// CONCATENATED MODULE: ./src/utils/Animation.ts
const easeInOutQuad = (t, b, c, d) => {
  t /= d / 2;
  if (t < 1) return c / 2 * t * t + b;
  t--;
  return -c / 2 * (t * (t - 2) - 1) + b;
};

const scrollLeftAnimation = (elm, to, dispath) => {
  const duration = 300;
  const start = 0;
  let currentTime = 0;
  const increment = 20;

  const animateScroll = () => {
    currentTime += increment;
    const scrollLeft = easeInOutQuad(currentTime, start, to, duration);
    elm.scrollLeft = scrollLeft;

    if (currentTime < duration) {
      setTimeout(animateScroll, increment);
    } else {
      dispath && dispath(true);
    }
  };

  dispath && dispath(false);
  animateScroll();
};
const scrollWindowTopAnimation = (_to, dispath) => {
  const duration = 300;
  const start = window.scrollY;
  let currentTime = 0;
  const increment = 20;
  const to = _to - start;

  const animateScroll = () => {
    currentTime += increment;
    const scrollTop = easeInOutQuad(currentTime, start, to, duration);
    window.scrollTo(0, scrollTop);

    if (currentTime < duration) {
      setTimeout(animateScroll, increment);
    } else {
      dispath && dispath(true);
    }
  };

  dispath && dispath(false);
  animateScroll();
};
// CONCATENATED MODULE: ./src/components/organisms/Header/index.tsx










const Header = props => {
  const [mktType] = Object(external_recoil_["useRecoilState"])(state["c" /* MktTypeState */]);
  const {
    openSelectContentsOrder,
    setOpenSelectContentsOrder,
    isMaxLayout,
    isFixedSmallNav,
    isDispFooter
  } = props;
  const splitedMktType = mktType.split('-');
  const scrollTo = isDispFooter ? 0 : 1050;
  const arrowMark = isDispFooter ? '▲' : '▼';
  return /*#__PURE__*/Object(jsx_runtime_["jsxs"])(Header_Container, {
    isFixedSmallNav: isFixedSmallNav,
    children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(Header_SelectContentsOrder, {
      openSelectContentsOrder: openSelectContentsOrder,
      isMaxLayout: isMaxLayout
    }), /*#__PURE__*/Object(jsx_runtime_["jsxs"])(HeaderContent, {
      children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("div", {
        children: "Back"
      }), /*#__PURE__*/Object(jsx_runtime_["jsxs"])(AppName, {
        isDispFooter: isDispFooter,
        onClick: () => scrollWindowTopAnimation(scrollTo),
        children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(TalknLabel, {
          children: "talkn"
        }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(NewsLabel, {
          children: "news"
        }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(CountryLabel, {
          children: `(${splitedMktType[1]})`
        }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("span", {
          className: "arrow",
          children: arrowMark
        })]
      }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(MenuWrap, {
        children: /*#__PURE__*/Object(jsx_runtime_["jsx"])(Menu, {
          onClick: () => setOpenSelectContentsOrder(!openSelectContentsOrder)
        })
      })]
    })]
  });
};

/* harmony default export */ var organisms_Header = (Header);
const Header_Container = external_styled_components_default.a.header.withConfig({
  displayName: "Header__Container",
  componentId: "sc-1o4atd-0"
})(["position:fixed;top:0;z-index:100;display:flex;align-items:center;justify-content:center;width:100%;height:", "px;color:#000;border-bottom:", "px solid ", ";div{flex:1;text-align:center;}"], StylesVars["a" /* default */].baseHeight, props => props.isFixedSmallNav ? 0 : 1, StylesVars["a" /* default */].bgColor);
const HeaderContent = external_styled_components_default.a.div.withConfig({
  displayName: "Header__HeaderContent",
  componentId: "sc-1o4atd-1"
})(["z-index:10;display:flex;flex-flow:row wrap;align-items:center;justify-content:center;max-width:", "px;height:100%;margin:0 auto;background:#fff;"], StylesVars["a" /* default */].maxWidth);
const AppName = external_styled_components_default.a.div.withConfig({
  displayName: "Header__AppName",
  componentId: "sc-1o4atd-2"
})(["font-size:20px;cursor:pointer;transition:", ";.arrow{width:10px;height:10px;margin-left:3px;font-size:14px;color:", ";content:'\u25BC';transition:", ";}&:hover{transform:scale(1.03);.arrow{color:", ";}}"], StylesVars["a" /* default */].transitionDuration, StylesVars["a" /* default */].bgColor, StylesVars["a" /* default */].transitionDuration, StylesVars["a" /* default */].themeColor);
const TalknLabel = external_styled_components_default.a.span.withConfig({
  displayName: "Header__TalknLabel",
  componentId: "sc-1o4atd-3"
})(["margin:0 5px;font-weight:200;color:#000;"]);
const NewsLabel = external_styled_components_default.a.span.withConfig({
  displayName: "Header__NewsLabel",
  componentId: "sc-1o4atd-4"
})(["margin-right:5px;font-weight:300;color:rgba(79,174,159,1);"]);
const CountryLabel = external_styled_components_default.a.span.withConfig({
  displayName: "Header__CountryLabel",
  componentId: "sc-1o4atd-5"
})(["position:relative;top:-2px;font-size:10px;font-weight:300;color:#000;"]);
const MenuWrap = external_styled_components_default.a.div.withConfig({
  displayName: "Header__MenuWrap",
  componentId: "sc-1o4atd-6"
})(["display:flex;flex-flow:row wrap;align-items:center;justify-content:center;"]);
const Menu = external_styled_components_default.a.div.withConfig({
  displayName: "Header__Menu",
  componentId: "sc-1o4atd-7"
})(["position:relative;display:flex;align-items:center;justify-content:center;max-width:50px;height:50px;border-radius:25px;box-shadow:0 0 0 rgba(230,230,230,1) inset;transition:", ";&:hover{box-shadow:0 0 10px rgba(230,230,230,1) inset;}&::before{position:relative;top:-12px;width:8px;height:8px;content:'';background:", ";border-radius:6px;box-shadow:0 12px 0 ", ",0 24px 0 ", ";}"], StylesVars["a" /* default */].transitionDuration, StylesVars["a" /* default */].bgColor, StylesVars["a" /* default */].bgColor, StylesVars["a" /* default */].bgColor);
// CONCATENATED MODULE: ./src/assets/foreign.svg
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }



var _ref = /*#__PURE__*/external_react_["createElement"]("path", {
  d: "M488.727 0H302.545c-12.853 0-23.273 10.42-23.273 23.273s10.42 23.273 23.273 23.273h129.997L192.999 286.09c-9.089 9.089-9.089 23.823 0 32.912a23.195 23.195 0 0016.455 6.816 23.194 23.194 0 0016.457-6.817L465.455 79.458v129.997c0 12.853 10.42 23.273 23.273 23.273s23.273-10.42 23.273-23.273V23.273C512 10.42 501.58 0 488.727 0z"
});

var _ref2 = /*#__PURE__*/external_react_["createElement"]("path", {
  d: "M395.636 232.727c-12.853 0-23.273 10.42-23.273 23.273v209.455H46.545V139.636H256c12.853 0 23.273-10.42 23.273-23.273S268.853 93.091 256 93.091H23.273C10.42 93.091 0 103.511 0 116.364v372.364C0 501.58 10.42 512 23.273 512h372.364c12.853 0 23.273-10.42 23.273-23.273V256c-.001-12.853-10.421-23.273-23.274-23.273z"
});

function SvgForeign(props) {
  return /*#__PURE__*/external_react_["createElement"]("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 512 512"
  }, props), _ref, _ref2);
}

/* harmony default export */ var foreign = (SvgForeign);
// CONCATENATED MODULE: ./src/components/molecules/ImageSliderList.tsx







const ImageSliderList = props => {
  const {
    name,
    description,
    provider,
    url,
    layout,
    bg
  } = props;
  return /*#__PURE__*/Object(jsx_runtime_["jsx"])(ImageSliderList_Container, {
    "data-url": url,
    children: /*#__PURE__*/Object(jsx_runtime_["jsxs"])(ImageListBackground, {
      href: url,
      bg: bg,
      layout: layout.style.ImageList,
      children: [/*#__PURE__*/Object(jsx_runtime_["jsxs"])(ImageListContent, {
        layout: layout.style.ImageListContent,
        children: [/*#__PURE__*/Object(jsx_runtime_["jsxs"])(ImageListContentUpper, {
          layout: layout.style.ImageListContentUpper,
          children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(ImageListProviderTop, {
            className: "provider",
            layout: layout.style.ImageListProviderTop,
            children: provider
          }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(ImageListTitle, {
            layout: layout.style.ImageListTitle,
            children: name
          })]
        }), /*#__PURE__*/Object(jsx_runtime_["jsxs"])(ImageListDesc, {
          layout: layout.style.ImageListDesc,
          children: [description, "..."]
        })]
      }), /*#__PURE__*/Object(jsx_runtime_["jsxs"])(ImageListBottom, {
        children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(foreign, {}), /*#__PURE__*/Object(jsx_runtime_["jsx"])(ImageListProviderBottom, {
          className: "provider",
          layout: layout.style.ImageListProviderBottom,
          children: provider
        })]
      })]
    })
  });
};

/* harmony default export */ var molecules_ImageSliderList = (ImageSliderList);
const ImageSliderList_Container = external_styled_components_default.a.li.withConfig({
  displayName: "ImageSliderList__Container",
  componentId: "sc-14t078-0"
})(["display:flex;flex-flow:column nowrap;align-items:flex-start;justify-content:space-between;width:100%;min-width:100%;margin:0;overflow:hidden;text-align:right;scroll-snap-align:center;svg{width:26px;height:26px;opacity:1;& *:not([stroke='none' i]){fill:#fff;}}"]);
const ImageListBackground = external_styled_components_default.a.a.withConfig({
  displayName: "ImageSliderList__ImageListBackground",
  componentId: "sc-14t078-1"
})(["display:block;width:100%;min-width:100%;height:100%;", " transition:", ";&:hover{transform:scale(1.02);.provider{color:#000;background:#fff;}}"], props => {
  var _props$layout;

  return props.bg ? `background: #000 url(${props.bg}) ${(_props$layout = props.layout) === null || _props$layout === void 0 ? void 0 : _props$layout.bgPosition}px / contain no-repeat;` : 'background: #000;';
}, StylesVars["a" /* default */].transitionDuration);
const ImageListContent = external_styled_components_default.a.div.withConfig({
  displayName: "ImageSliderList__ImageListContent",
  componentId: "sc-14t078-2"
})(["display:flex;flex-flow:row wrap;justify-content:flex-end;width:", ";height:", ";max-height:240px;padding-top:", ";padding-right:", ";padding-bottom:", ";padding-left:", ";margin-top:", ";margin-right:", ";margin-bottom:", ";margin-left:", ";font-size:13px;color:#fff;text-align:right;background:rgba(0,0,0,0.6);border-radius:", ";"], props => props.layout.width, props => props.layout.height, props => props.layout.paddingTop, props => props.layout.paddingRight, props => props.layout.paddingBottom, props => props.layout.paddingLeft, props => props.layout.marginTop, props => props.layout.marginRight, props => props.layout.marginBottom, props => props.layout.marginLeft, props => props.layout.borderRadius);
const ImageListContentUpper = external_styled_components_default.a.div.withConfig({
  displayName: "ImageSliderList__ImageListContentUpper",
  componentId: "sc-14t078-3"
})(["display:flex;height:", ";white-space:", ";"], props => props.layout.height, props => props.layout.whiteSpace);
const ImageListTitle = external_styled_components_default.a.div.withConfig({
  displayName: "ImageSliderList__ImageListTitle",
  componentId: "sc-14t078-4"
})(["width:100%;margin-top:", ";margin-right:", ";margin-bottom:", ";margin-left:", ";font-size:", ";font-weight:600;"], props => props.layout.marginTop, props => props.layout.marginRight, props => props.layout.marginBottom, props => props.layout.marginLeft, props => props.layout.fontSize);
const ImageListDesc = external_styled_components_default.a.div.withConfig({
  displayName: "ImageSliderList__ImageListDesc",
  componentId: "sc-14t078-5"
})(["display:", ";height:", ";padding-top:", ";padding-right:", ";padding-bottom:", ";padding-left:", ";overflow:hidden;font-size:", ";"], props => props.layout.display, props => props.layout.height, props => props.layout.paddingTop, props => props.layout.paddingRight, props => props.layout.paddingBottom, props => props.layout.paddingLeft, props => props.layout.fontSize);
const ImageListProviderTop = external_styled_components_default.a.div.withConfig({
  displayName: "ImageSliderList__ImageListProviderTop",
  componentId: "sc-14t078-6"
})(["display:", ";align-items:center;justify-content:center;height:", ";min-height:", ";max-height:", ";padding:0 20px;margin:10px 20px 0;font-size:", ";color:#fff;white-space:nowrap;background:rgba(0,0,0,0.6);border:1px solid #fff;border-radius:20px;transition:", ";"], props => props.layout.display, props => props.layout.height, props => props.layout.height, props => props.layout.height, props => props.layout.fontSize, StylesVars["a" /* default */].transitionDuration);
const ImageListBottom = external_styled_components_default.a.div.withConfig({
  displayName: "ImageSliderList__ImageListBottom",
  componentId: "sc-14t078-7"
})(["display:inline-flex;margin:1% 30px 30px 30px;"]);
const ImageListProviderBottom = external_styled_components_default.a.div.withConfig({
  displayName: "ImageSliderList__ImageListProviderBottom",
  componentId: "sc-14t078-8"
})(["display:", ";align-items:center;justify-content:center;height:", ";min-height:", ";max-height:", ";padding:0 20px;margin-left:20px;font-size:", ";color:#fff;white-space:nowrap;background:rgba(0,0,0,0.6);border:1px solid #fff;border-radius:10px;transition:", ";"], props => props.layout.display, props => props.layout.height, props => props.layout.height, props => props.layout.height, props => props.layout.fontSize, StylesVars["a" /* default */].transitionDuration);
// CONCATENATED MODULE: ./src/utils/Constants.ts
const Enviroments = {
  development: 'development',
  production: 'production'
};
const LocalStorageKeys = {
  url: 'talknUrl'
};
const SessionStorageKeys = {
  scroll: 'talknScroll'
};
// CONCATENATED MODULE: ./src/utils/Func.ts
const urlToCh = url => {
  return url.replace('https:/', '').replace('http:/', ''); // return decodeURI(url.replace('https:/', '').replace('http:/', ''));
};
// EXTERNAL MODULE: ./src/utils/Networks.ts
var Networks = __webpack_require__("FJ2h");

// CONCATENATED MODULE: ./src/components/organisms/ImageSlider.tsx











const getLayout = (isSpLayout, fixed) => {
  return isSpLayout ? imageSectionNarrowLayouts[Number(fixed)] : imageSectionLayouts[Number(fixed)];
};

const activeScrollCnt = 5;
let scrollCnt = 0;

const getImageSliderUrl = e => {
  const imageScroll = e.target;
  const scrollLeft = imageScroll !== null && imageScroll !== void 0 && imageScroll.scrollLeft ? imageScroll === null || imageScroll === void 0 ? void 0 : imageScroll.scrollLeft : 0;
  const clientWidth = imageScroll !== null && imageScroll !== void 0 && imageScroll.clientWidth ? imageScroll === null || imageScroll === void 0 ? void 0 : imageScroll.clientWidth : 0;
  const index = Math.ceil(scrollLeft / clientWidth);
  const imageScrollLi = document.querySelectorAll('.imageSlider ol li')[index];
  return imageScrollLi ? String(imageScrollLi.dataset.url) : '';
};

const ImageSlider = props => {
  const [url, setUrl] = Object(external_recoil_["useRecoilState"])(state["d" /* UrlState */]);
  const {
    contents,
    isSpLayout,
    isFixedSmallNav
  } = props;
  const layout = getLayout(isSpLayout, isFixedSmallNav);
  const [scrollingId, setScrolligId] = external_react_["useState"](0);
  const scrollElm = external_react_["useRef"]();
  const scrollElmRef = external_react_["useCallback"](node => scrollElm.current = node, []);

  const onScrollEnd = e => {
    if (scrollCnt >= activeScrollCnt) {
      const iframeContainer = document.querySelector('#talknLiveMedia');
      const iframe = document.querySelector('#talknLiveMedia iframe');
      const url = getImageSliderUrl(e);
      setUrl(url);
      iframeContainer.dataset.url = url;
      iframe.src = `https://${Networks["b" /* talknScriptHost */]}${urlToCh(url)}`;
      localStorage.setItem(LocalStorageKeys.url, url);
    }
  };

  const onScroll = e => {
    if (scrollingId === 0) {
      scrollCnt = 0;
    } else {
      scrollCnt = scrollCnt + 1;
      clearTimeout(scrollingId);
    }

    setScrolligId(Number(setTimeout(() => onScrollEnd(e), 100)));
  }; // change url.


  external_react_["useEffect"](() => {
    if (scrollElm.current && scrollElm.current.children && url !== '') {
      const scrollOrder = scrollElm.current;
      const index = Array.from(scrollOrder.children).findIndex(child => {
        const liUrl = String(child.getAttribute('data-url'));
        return liUrl === url;
      });
      const oneScroll = Math.round(scrollOrder.scrollWidth / scrollElm.current.children.length);
      scrollOrder.scrollTo(oneScroll * index, 0);
    }
  }, [url]);
  return /*#__PURE__*/Object(jsx_runtime_["jsx"])(ImageSlider_Container, {
    className: "imageSlider",
    isSpLayout: isSpLayout,
    isFixedSmallNav: isFixedSmallNav,
    children: /*#__PURE__*/Object(jsx_runtime_["jsx"])(ImageOrderList, {
      ref: scrollElmRef,
      onScroll: onScroll,
      children: Array.from(contents).map((content, index) => {
        const bg = content.image ? `${content.image.thumbnail.contentUrl}&w=300&dpr=2&qlt=190` : undefined;
        return /*#__PURE__*/Object(jsx_runtime_["jsx"])(molecules_ImageSliderList, {
          name: content.name,
          description: content.description,
          provider: content.provider[0]['name'],
          url: content.url,
          layout: layout,
          bg: bg
        }, `${content.url}_${index}`);
      })
    })
  });
};

/* harmony default export */ var organisms_ImageSlider = (ImageSlider);
const ImageSlider_Container = external_styled_components_default.a.section.withConfig({
  displayName: "ImageSlider__Container",
  componentId: "t3huta-0"
})(["position:", ";top:", "px;z-index:80;width:100%;height:", "px;min-height:", "px;max-height:300px;margin:0 auto;overflow:hidden;cursor:pointer;transition:", ";ol{width:100%;max-width:", "px;margin:0 auto;}"], props => props.isFixedSmallNav ? 'fixed' : 'relative', props => props.isFixedSmallNav ? Number(StylesVars["a" /* default */].baseHeight) + Number(StylesVars["a" /* default */].baseHeight) / 2 : 0, props => props.isFixedSmallNav ? Number(StylesVars["a" /* default */].baseHeight) * 2 : Number(StylesVars["a" /* default */].baseHeight) * 5, Number(StylesVars["a" /* default */].baseHeight) * 2, StylesVars["a" /* default */].transitionDuration, StylesVars["a" /* default */].maxWidth);
const ImageOrderList = external_styled_components_default.a.ol.withConfig({
  displayName: "ImageSlider__ImageOrderList",
  componentId: "t3huta-1"
})(["display:flex;flex-flow:row nowrap;width:100%;height:100%;overflow-x:scroll;overflow-y:hidden;background:rgb(0,0,0);border-top:1px solid ", ";border-bottom:1px solid #000;scroll-snap-type:x mandatory;scroll-snap-points-x:repeat(100%);"], StylesVars["a" /* default */].borderColor);
const imageSectionNarrowLayouts = [{
  size: 300,
  style: {
    ImageList: {
      bgPosition: 0
    },
    ImageListContent: {
      width: '60%',
      height: 'auto',
      paddingTop: '0px',
      paddingRight: '10px',
      paddingBottom: '10px',
      paddingLeft: '0px',
      marginTop: '20px',
      marginRight: '0px',
      marginBottom: '0px',
      marginLeft: 'auto',
      borderRadius: '3px 0 0 3px'
    },
    ImageListContentUpper: {
      height: 'auto',
      whiteSpace: 'normal'
    },
    ImageListTitle: {
      marginTop: '10px',
      marginRight: '0px',
      marginBottom: '10px',
      marginLeft: '10px',
      fontSize: '13px'
    },
    ImageListDesc: {
      display: 'block',
      height: 'auto',
      paddingTop: '0px',
      paddingRight: '0px',
      paddingBottom: '0px',
      paddingLeft: '20px',
      fontSize: '10px'
    },
    ImageListProviderTop: {
      display: 'none',
      height: '30px',
      fontSize: '10px'
    },
    ImageListProviderBottom: {
      display: 'inline-flex',
      height: '30px',
      fontSize: '10px'
    }
  }
}, {
  size: 120,
  style: {
    ImageList: {
      bgPosition: 0
    },
    ImageListContent: {
      width: '80%',
      height: '100%',
      paddingTop: '0px',
      paddingRight: '10px',
      paddingBottom: '20px',
      paddingLeft: '10px',
      marginTop: '0px',
      marginRight: '0px',
      marginBottom: '0px',
      marginLeft: 'auto',
      borderRadius: '0'
    },
    ImageListContentUpper: {
      height: 'auto',
      whiteSpace: 'normal'
    },
    ImageListTitle: {
      marginTop: '8px',
      marginRight: '0px',
      marginBottom: '0px',
      marginLeft: '0px',
      fontSize: '13px'
    },
    ImageListDesc: {
      display: 'block',
      height: '50px',
      paddingTop: '5px',
      paddingRight: '0px',
      paddingBottom: '0px',
      paddingLeft: '0px',
      fontSize: '10px'
    },
    ImageListProviderTop: {
      display: 'none',
      height: '26px',
      fontSize: '10px'
    },
    ImageListProviderBottom: {
      display: 'none',
      height: '34px',
      fontSize: '10px'
    }
  }
}];
const imageSectionLayouts = [{
  size: 300,
  style: {
    ImageList: {
      bgPosition: 60
    },
    ImageListContent: {
      width: '60%',
      height: 'auto',
      paddingTop: '0px',
      paddingRight: '20px',
      paddingBottom: '20px',
      paddingLeft: '0px',
      marginTop: '20px',
      marginRight: '20px',
      marginBottom: '0px',
      marginLeft: 'auto',
      borderRadius: '3px'
    },
    ImageListContentUpper: {
      height: 'auto',
      whiteSpace: 'normal'
    },
    ImageListTitle: {
      marginTop: '20px',
      marginRight: '0px',
      marginBottom: '20px',
      marginLeft: '20px',
      fontSize: '18px'
    },
    ImageListDesc: {
      display: 'block',
      height: 'auto',
      paddingTop: '0px',
      paddingRight: '0px',
      paddingBottom: '0px',
      paddingLeft: '20px',
      fontSize: '13px'
    },
    ImageListProviderTop: {
      display: 'none',
      height: '30px',
      fontSize: '13px'
    },
    ImageListProviderBottom: {
      display: 'inline-flex',
      height: '30px',
      fontSize: '13px'
    }
  }
}, {
  size: 120,
  style: {
    ImageList: {
      bgPosition: 10
    },
    ImageListContent: {
      width: '80%',
      height: '100%',
      paddingTop: '0px',
      paddingRight: '0px',
      paddingBottom: '20px',
      paddingLeft: '0px',
      marginTop: '0px',
      marginRight: '20px',
      marginBottom: '0px',
      marginLeft: 'auto',
      borderRadius: '0'
    },
    ImageListContentUpper: {
      height: '34px',
      whiteSpace: 'normal'
    },
    ImageListTitle: {
      marginTop: '10px',
      marginRight: '0px',
      marginBottom: '0px',
      marginLeft: '0px',
      fontSize: '15px'
    },
    ImageListDesc: {
      display: 'block',
      height: '70px',
      paddingTop: '10px',
      paddingRight: '0px',
      paddingBottom: '0px',
      paddingLeft: '20px',
      fontSize: '13px'
    },
    ImageListProviderTop: {
      display: 'inline-flex',
      height: '26px',
      fontSize: '13px'
    },
    ImageListProviderBottom: {
      display: 'none',
      height: '26px',
      fontSize: '13px'
    }
  }
}];
// EXTERNAL MODULE: external "dayjs"
var external_dayjs_ = __webpack_require__("boVf");
var external_dayjs_default = /*#__PURE__*/__webpack_require__.n(external_dayjs_);

// CONCATENATED MODULE: ./src/utils/DateHelper.ts

const getProgressTime = time => {
  const minuteSecond = 60 * 1000;
  const hourSecond = 3600 * 1000;
  const daySecond = 3600 * 24 * 1000;
  const dNow = external_dayjs_default()().locale('en');
  const dPast = external_dayjs_default()(time).locale('en');
  const diffSeond = dNow.diff(dPast);
  let returnNum = 0;
  let returnTimeUnit = '';

  if (diffSeond < minuteSecond) {
    returnTimeUnit = 'sec';
    returnNum = dNow.diff(dPast, 'second');
  } else if (diffSeond < hourSecond) {
    returnTimeUnit = 'min';
    returnNum = dNow.diff(dPast, 'minute');
  } else if (diffSeond < daySecond) {
    returnTimeUnit = 'hour';
    returnNum = dNow.diff(dPast, 'hour');
  } else {
    returnTimeUnit = 'day';
    returnNum = dNow.diff(dPast, 'day');
  }

  return `${returnNum} ${returnTimeUnit} ago`;
};
// CONCATENATED MODULE: ./src/components/molecules/ContentsList.tsx







const ContentsList = props => {
  const {
    name,
    url,
    imageUrl,
    datePublished,
    active,
    onClick
  } = props;
  const ImageTag = imageUrl ? /*#__PURE__*/Object(jsx_runtime_["jsx"])(Image, {
    src: imageUrl,
    alt: name
  }) : /*#__PURE__*/Object(jsx_runtime_["jsx"])(NoImage, {
    children: "NO IMAGE"
  });
  const className = active ? 'active' : '';
  return /*#__PURE__*/Object(jsx_runtime_["jsx"])(ContentsList_Container, {
    className: className,
    children: /*#__PURE__*/Object(jsx_runtime_["jsxs"])("button", {
      onClick: e => onClick(e),
      "data-url": url,
      children: [ImageTag, /*#__PURE__*/Object(jsx_runtime_["jsx"])(Title, {
        children: name
      }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(OrderBase, {
        children: getProgressTime(datePublished)
      })]
    })
  });
};

/* harmony default export */ var molecules_ContentsList = (ContentsList);
const ContentsList_Container = external_styled_components_default.a.li.withConfig({
  displayName: "ContentsList__Container",
  componentId: "sc-1sz44xt-0"
})(["display:flex;flex-flow:row wrap;width:100%;height:60px;max-height:60px;cursor:pointer;background:rgb(240,240,240);border-right:1px solid ", ";border-bottom:1px solid ", ";transition:", ";&.active{background:rgb(255,255,255);border-right:1px solid #fff;}&:hover{background:rgb(255,255,255);border-right:1px solid #fff;}button{display:flex;flex-flow:row wrap;align-items:center;justify-content:center;width:100%;max-width:", "px;height:100%;text-align:left;background:rgba(255,255,255,0);border:0;outline:0;}"], StylesVars["a" /* default */].borderColor, StylesVars["a" /* default */].borderColor, StylesVars["a" /* default */].transitionDuration, StylesVars["a" /* default */].maxWidth);
const Image = external_styled_components_default.a.img.withConfig({
  displayName: "ContentsList__Image",
  componentId: "sc-1sz44xt-1"
})(["width:60px;height:60px;"]);
const NoImage = external_styled_components_default.a.div.withConfig({
  displayName: "ContentsList__NoImage",
  componentId: "sc-1sz44xt-2"
})(["display:flex;align-items:center;justify-content:center;width:60px;height:60px;font-weight:400;color:#fff;text-align:center;background:rgb(0,0,0);"]);
const Title = external_styled_components_default.a.div.withConfig({
  displayName: "ContentsList__Title",
  componentId: "sc-1sz44xt-3"
})(["display:flex;flex:4;align-items:center;justify-content:flex-start;width:100%;height:100%;padding:0 10px;line-height:20px;"]);
const OrderBase = external_styled_components_default.a.div.withConfig({
  displayName: "ContentsList__OrderBase",
  componentId: "sc-1sz44xt-4"
})(["display:flex;flex:1;align-items:center;justify-content:center;width:100%;height:100%;"]);
// CONCATENATED MODULE: ./src/components/organisms/Main/ContentsOrder.tsx








const ContentsOrder = props => {
  const [url] = Object(external_recoil_["useRecoilState"])(state["d" /* UrlState */]);
  const {
    contents,
    handleOnClickContents
  } = props;
  return /*#__PURE__*/Object(jsx_runtime_["jsx"])(ContentsOrder_Container, {
    url: url,
    children: Array.from(contents).map((content, index) => {
      var _content$image;

      return /*#__PURE__*/Object(jsx_runtime_["jsx"])(molecules_ContentsList, {
        name: content.name,
        url: content.url,
        imageUrl: (_content$image = content.image) === null || _content$image === void 0 ? void 0 : _content$image.thumbnail.contentUrl,
        datePublished: content.datePublished,
        active: content.url === url,
        onClick: e => handleOnClickContents(e, index)
      }, `${content.url}_${index}`);
    })
  });
};

/* harmony default export */ var Main_ContentsOrder = (ContentsOrder);
const ContentsOrder_Container = external_styled_components_default.a.ol.withConfig({
  displayName: "ContentsOrder__Container",
  componentId: "jwbjon-0"
})(["height:800px;overflow-x:hidden;overflow-y:scroll;background:#ddd;scroll-snap-align:center;@media (max-width:", "px){width:100%;min-width:100%;}@media (min-width:calc(", "px + 1px)){width:50%;}"], StylesVars["a" /* default */].spLayoutWidth, StylesVars["a" /* default */].spLayoutWidth);
// EXTERNAL MODULE: external "next/dynamic"
var dynamic_ = __webpack_require__("/T1H");
var dynamic_default = /*#__PURE__*/__webpack_require__.n(dynamic_);

// CONCATENATED MODULE: ./src/components/atoms/NoSsr.tsx




// eslint-disable-next-line react/jsx-no-useless-fragment
const _NoSsr = props => /*#__PURE__*/Object(jsx_runtime_["jsx"])(jsx_runtime_["Fragment"], {
  children: props.children
});

const NoSsr = dynamic_default()(() => Promise.resolve(_NoSsr), {
  ssr: false
});
/* harmony default export */ var atoms_NoSsr = (NoSsr);
// CONCATENATED MODULE: ./src/components/organisms/Main/Thread.tsx









const Thread = props => {
  const url = Object(external_recoil_["useRecoilState"])(state["d" /* UrlState */])[0];

  if (url === '') {
    return /*#__PURE__*/Object(jsx_runtime_["jsx"])(atoms_NoSsr, {});
  } else {
    const {
      isSpLayout,
      threadOnlyMode,
      talknPostFixed,
      talknPostTranslateY,
      talknPostRight,
      talknPostWidth
    } = props;
    return /*#__PURE__*/Object(jsx_runtime_["jsxs"])(atoms_NoSsr, {
      children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(Thread_Container, {
        "data-url": url,
        id: "talknLiveMedia"
      }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(TalknPostWrap, {
        id: "talknLiveMediaPost",
        isSpLayout: isSpLayout,
        threadOnlyMode: threadOnlyMode,
        fixed: talknPostFixed,
        translateY: talknPostTranslateY,
        right: talknPostRight,
        width: talknPostWidth
      })]
    });
  }
};

/* harmony default export */ var Main_Thread = (Thread);
const getTalknPostLayout = (windowInnerWidth, isMaxLayout, isSpLayout) => {
  let right = 0;
  let width = 0;

  if (isMaxLayout) {
    right = (windowInnerWidth - Number(StylesVars["a" /* default */].maxWidth) + 20) / 2;
    width = Number(StylesVars["a" /* default */].maxWidth) / 2 - 20;
  } else {
    if (isSpLayout) {
      width = window.innerWidth;
      right = 0;
    } else {
      width = window.innerWidth / 2 - 20;
      right = 10;
    }
  }

  return {
    width,
    right
  };
};
const Thread_Container = external_styled_components_default.a.div.withConfig({
  displayName: "Thread__Container",
  componentId: "sc-83z3zh-0"
})(["height:800px;padding-bottom:60px;overflow-x:hidden;overflow-y:scroll;scroll-snap-align:center;@media (max-width:", "px){width:100%;min-width:100%;}@media (min-width:calc(", "px + 1px)){width:50%;}"], StylesVars["a" /* default */].spLayoutWidth, StylesVars["a" /* default */].spLayoutWidth);
const TalknPostWrap = external_styled_components_default.a.div.withConfig({
  displayName: "Thread__TalknPostWrap",
  componentId: "sc-83z3zh-1"
})(["position:", ";top:", "px;right:", "px;bottom:", ";display:flex;flex-flow:row wrap;align-items:center;justify-content:flex-start;width:", "px;max-width:", "px;height:", "px;color:#000;background:rgba(255,255,255,0.96);border-top:1px solid ", ";border-right:", ";border-left:", ";border-radius:", ";transform:translateY(", "px);"], props => props.fixed ? 'fixed' : 'absolute', props => props.fixed ? 'unset' : '1050', props => props.right, props => props.fixed ? '0' : 'unset', props => props.width, props => props.isSpLayout ? props.width : Number(StylesVars["a" /* default */].maxWidth) / 2 - 20, Number(StylesVars["a" /* default */].baseHeight), StylesVars["a" /* default */].bgColor, props => props.isSpLayout ? 0 : `1px solid ${StylesVars["a" /* default */].bgColor}`, props => props.isSpLayout ? 0 : `1px solid ${StylesVars["a" /* default */].bgColor}`, props => props.isSpLayout ? 0 : '7px 7px 0 0', props => props.isSpLayout ? props.translateY : 0);
// CONCATENATED MODULE: ./src/components/organisms/Main/index.tsx














const getTalknPostTranslateY = (scrollLeft, scrollWidth) => {
  const talknPostTranslateYRate = Math.round(scrollLeft * 2 / scrollWidth * 100) / 100;
  const talknPostTranslateY = -(Number(StylesVars["a" /* default */].baseHeight) * talknPostTranslateYRate) + Number(StylesVars["a" /* default */].baseHeight);
  return String(talknPostTranslateY);
};

const Main = props => {
  const setUrl = Object(external_recoil_["useRecoilState"])(state["d" /* UrlState */])[1];
  const {
    contents,
    isFixedSmallNav,
    isSpLayout,
    talknPostFixed,
    talknPostRight,
    talknPostWidth
  } = props;
  const [threadOnlyMode, setThreadOnlyMode] = external_react_["useState"](false);
  const [talknPostTranslateY, setTalknPostTranslateY] = external_react_["useState"](String(0));
  const [handScrollMode, setHandScrollMode] = external_react_["useState"](true);

  const updateUrl = url => {
    const iframeContainer = document.querySelector('#talknLiveMedia');
    const iframe = document.querySelector('#talknLiveMedia iframe');
    setUrl(url);
    iframeContainer.dataset.url = url;
    iframe.src = `https://${Networks["b" /* talknScriptHost */]}${urlToCh(url)}`;
    localStorage.setItem(LocalStorageKeys.url, url);
  }; // handle on


  const handleOnClickContents = (e, index) => {
    const parentElement = e.target.parentElement;
    const clickedUrl = String(parentElement === null || parentElement === void 0 ? void 0 : parentElement.dataset.url);
    const imageScroll = document.querySelector('.imageSlider ol');
    const main = document.querySelector('main');
    updateUrl(clickedUrl);
    imageScroll === null || imageScroll === void 0 ? void 0 : imageScroll.scroll(imageScroll.clientWidth * index, 0);

    if (main && main.scrollLeft === 0) {
      scrollLeftAnimation(main, main.scrollWidth, setHandScrollMode);
    }
  };

  const onScroll = external_react_["useCallback"](e => {
    const main = e.target;
    const scrollLeft = (main === null || main === void 0 ? void 0 : main.scrollLeft) || 0;
    const scrollWidth = (main === null || main === void 0 ? void 0 : main.scrollWidth) || 0;

    if (scrollLeft === 0) {
      setThreadOnlyMode(false);
    }

    if (scrollWidth / 2 === scrollLeft) {
      setThreadOnlyMode(true);
    }

    setTalknPostTranslateY(getTalknPostTranslateY(scrollLeft, scrollWidth));
  }, []);
  external_react_["useEffect"](() => {
    const main = document.querySelector('main');

    if (main) {
      setTalknPostTranslateY(getTalknPostTranslateY(main === null || main === void 0 ? void 0 : main.scrollLeft, main === null || main === void 0 ? void 0 : main.scrollWidth));
    }
  }, []);
  return /*#__PURE__*/Object(jsx_runtime_["jsxs"])(Main_Container, {
    handScrollMode: handScrollMode,
    isFixedSmallNav: isFixedSmallNav,
    onScroll: onScroll,
    children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(Main_ContentsOrder, {
      contents: contents,
      handleOnClickContents: handleOnClickContents
    }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(Main_Thread, {
      isSpLayout: isSpLayout,
      threadOnlyMode: threadOnlyMode,
      talknPostTranslateY: talknPostTranslateY,
      talknPostFixed: talknPostFixed,
      talknPostRight: talknPostRight,
      talknPostWidth: talknPostWidth
    })]
  });
};

/* harmony default export */ var organisms_Main = (Main);
const Main_Container = external_styled_components_default.a.main.withConfig({
  displayName: "Main__Container",
  componentId: "xqmfse-0"
})(["z-index:1;display:flex;flex-flow:row nowrap;height:100%;margin:", "px auto 0;overflow-x:scroll;overflow-y:hidden;background:#fff;scroll-snap-type:", ";scroll-snap-points-x:", ";@media (max-width:", "px){width:100%;max-width:100%;}@media (min-width:calc(", "px + 1px)){width:100%;max-width:", "px;}"], props => props.isFixedSmallNav ? Number(StylesVars["a" /* default */].baseHeight) * 5 + 10 : 0, props => props.handScrollMode ? 'x mandatory' : 'none', props => props.handScrollMode ? 'repeat(100%)' : 'none', StylesVars["a" /* default */].spLayoutWidth, StylesVars["a" /* default */].spLayoutWidth, StylesVars["a" /* default */].maxWidth);
// CONCATENATED MODULE: ./src/components/organisms/Navigation/BoxNavigation.tsx








const BoxNavigation = props => {
  const [mktType] = Object(external_recoil_["useRecoilState"])(state["c" /* MktTypeState */]);
  const [category] = Object(external_recoil_["useRecoilState"])(state["a" /* CategoryState */]);
  const {
    categories,
    isFixedSmallNav,
    redirectTo
  } = props;
  return /*#__PURE__*/Object(jsx_runtime_["jsx"])(BoxNavigation_Container, {
    isFixedSmallNav: isFixedSmallNav,
    children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("ul", {
      children: Array.from(categories).map(c => {
        const active = c.category === category;
        return /*#__PURE__*/Object(jsx_runtime_["jsx"])(molecules_BoxList, {
          label: c.label,
          active: active,
          onClick: () => redirectTo(mktType, c.category)
        }, c.category);
      })
    })
  });
};

/* harmony default export */ var Navigation_BoxNavigation = (BoxNavigation);
const BoxNavigation_Container = external_styled_components_default.a.nav.withConfig({
  displayName: "BoxNavigation__Container",
  componentId: "sc-1wq75th-0"
})(["position:", ";top:", ";z-index:90;width:100%;max-width:", "px;height:", "px;margin:", "px auto 0;overflow:hidden;transition:", ";ul{display:grid;grid-template-rows:1fr 1fr;grid-template-columns:repeat(5,minmax(20%,1fr));gap:1px;height:100%;overflow:hidden;}"], props => props.isFixedSmallNav ? 'fixed' : 'relative', props => props.isFixedSmallNav ? `${StylesVars["a" /* default */].baseHeight}px` : 0, StylesVars["a" /* default */].maxWidth, Number(StylesVars["a" /* default */].baseHeight) * 2, props => props.isFixedSmallNav ? 0 : 60, StylesVars["a" /* default */].transitionDuration);
// CONCATENATED MODULE: ./src/components/organisms/Navigation/LineNavigation.tsx








const navigationScrollClassName = 'navigationScroll';

const LineNavigation = props => {
  const {
    lineNavScrollWidth,
    setLineNavScrollWidth,
    categories,
    isFixedSmallNav,
    redirectTo
  } = props;
  const [mktType] = Object(external_recoil_["useRecoilState"])(state["c" /* MktTypeState */]);
  const [category] = Object(external_recoil_["useRecoilState"])(state["a" /* CategoryState */]);
  const setNavScrollIndex = external_react_["useState"](0)[1];
  const [scrollingId, setScrolligId] = external_react_["useState"](0);
  const menus = categories.concat(categories).concat(categories);

  const onScrollEnd = async mktType => {
    const navigationScroll = document.querySelector(`.${navigationScrollClassName}`);

    if (navigationScroll) {
      if (lineNavScrollWidth === navigationScroll.scrollWidth) {
        if (scrollingId > 0) {
          const scrollY = window.scrollY;
          const sitemap = news_sitemap.find(sitemap => sitemap.Market === mktType);
          const categories = sitemap ? sitemap.Categories : [];
          const lineMenus = categories.concat(categories).concat(categories);
          const oneScroll = Math.round(lineNavScrollWidth / lineMenus.length);
          const scrollPosCnt = Math.round(navigationScroll.scrollLeft / oneScroll);
          const scrollNavIndex = scrollPosCnt + 2;
          const category = lineMenus[scrollNavIndex].category;
          await redirectTo(mktType, category); // scroll.

          window.scrollTo(0, scrollY);
          setScrolligId(0);
          setNavScrollIndex(Number(scrollNavIndex));
        }
      }
    }

    return Promise.resolve();
  };

  const onScroll = () => {
    if (scrollingId > 0) clearTimeout(scrollingId);
    /* eslint-disable-next-line @typescript-eslint/no-misused-promises */

    setScrolligId(Number(setTimeout(() => onScrollEnd(mktType), 100)));
  }; // did update.


  external_react_["useEffect"](() => {
    const navigationScroll = document.querySelector(`.${navigationScrollClassName}`);

    if (navigationScroll) {
      const scrollNavIndex = menus.findIndex((menu, i) => menu.category === category && i > categories.length);
      const oneScroll = Math.round(lineNavScrollWidth / menus.length);
      navigationScroll.scrollTo((scrollNavIndex - 2) * oneScroll, 0);
      setLineNavScrollWidth(navigationScroll.scrollWidth);
      setNavScrollIndex(scrollNavIndex);
    }
  }, [lineNavScrollWidth, category]);
  return /*#__PURE__*/Object(jsx_runtime_["jsx"])(LineNavigation_Container, {
    isFixedSmallNav: isFixedSmallNav,
    children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("ul", {
      className: navigationScrollClassName,
      onScroll: onScroll,
      children: menus.map((menu, i) => {
        const key = menu.label + String(i);
        const className = menu.category === category ? 'active' : '';
        return /*#__PURE__*/Object(jsx_runtime_["jsxs"])("li", {
          className: className,
          children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("button", {
            children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("label", {
              children: menu.label
            })
          }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("div", {
            className: "lamp",
            children: "\xA0"
          })]
        }, key);
      })
    })
  });
};

/* harmony default export */ var Navigation_LineNavigation = (LineNavigation);
const LineNavigation_Container = external_styled_components_default.a.nav.withConfig({
  displayName: "LineNavigation__Container",
  componentId: "sc-148d60j-0"
})(["position:", ";top:", ";z-index:91;width:100%;height:30px;overflow-x:scroll;transition:", ";ul{display:flex;flex-flow:row nowrap;width:100%;max-width:", "px;height:100%;margin:0 auto;overflow-y:hidden;background:#fff;scroll-snap-type:x mandatory;scroll-snap-points-x:repeat(100%);}li{display:flex;flex:1;align-items:center;justify-content:center;width:20%;min-width:20%;height:22px;scroll-snap-align:center;}li button{height:100%;background:rgba(255,255,255,0);border:0;outline:0;@media (max-width:", "px){width:80%;}@media (min-width:calc(", "px + 1px)){width:60%;}}li.active button{font-weight:500;color:#fff;background:rgba(79,174,159,1);border-radius:10px;}"], props => props.isFixedSmallNav ? 'fixed' : 'relative', props => props.isFixedSmallNav ? `${StylesVars["a" /* default */].baseHeight}px` : 0, StylesVars["a" /* default */].transitionDuration, StylesVars["a" /* default */].maxWidth, StylesVars["a" /* default */].spLayoutWidth, StylesVars["a" /* default */].spLayoutWidth);
// EXTERNAL MODULE: ./src/utils/Sitemap.ts
var utils_Sitemap = __webpack_require__("Y4gs");

// CONCATENATED MODULE: ./src/components/organisms/Navigation/index.tsx


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








const Navigation = props => {
  const [mktType] = Object(external_recoil_["useRecoilState"])(state["c" /* MktTypeState */]);
  const categories = Object(utils_Sitemap["a" /* getCategories */])(mktType);
  return props.isFixedSmallNav ? /*#__PURE__*/Object(jsx_runtime_["jsx"])(Navigation_LineNavigation, _objectSpread(_objectSpread({}, props), {}, {
    categories: categories
  })) : /*#__PURE__*/Object(jsx_runtime_["jsx"])(Navigation_BoxNavigation, _objectSpread(_objectSpread({}, props), {}, {
    categories: categories
  }));
};

/* harmony default export */ var organisms_Navigation = (Navigation);
// CONCATENATED MODULE: ./src/pages/index.tsx


//import Memcached from 'memcached';

















const pages_navigationScrollClassName = 'navigationScroll';
const talknPostScrollTop = 1113;
const footerScrollTop = 1050;

const TalknMedia = props => {
  const router = Object(router_["useRouter"])(); // disp key datas.

  const [mktType, setMktType] = Object(external_recoil_["useRecoilState"])(state["c" /* MktTypeState */]);
  const [category, setCategory] = Object(external_recoil_["useRecoilState"])(state["a" /* CategoryState */]);
  const [url, setUrl] = Object(external_recoil_["useRecoilState"])(state["d" /* UrlState */]);
  const {
    0: contents,
    1: setContents
  } = Object(external_react_["useState"])(props.contents); // layout total

  const {
    0: isSpLayout,
    1: setIsSpLayout
  } = Object(external_react_["useState"])(false);
  const {
    0: isMaxLayout,
    1: setIsMaxLayout
  } = Object(external_react_["useState"])(false);
  const {
    0: isFixedSmallNav,
    1: setFixedSmallNav
  } = Object(external_react_["useState"])(false);
  const [openSelectContentsOrder, setOpenSelectContentsOrder] = external_react_["useState"](false);
  const [lineNavScrollWidth, setLineNavScrollWidth] = external_react_["useState"](0); // layout talkn post footer TODO: 直す

  const {
    0: talknPostWidth,
    1: setTalknPostWidth
  } = Object(external_react_["useState"])(String(0));
  const {
    0: talknPostRight,
    1: setTalknPostRight
  } = Object(external_react_["useState"])(String(0));
  const {
    0: talknPostFixed,
    1: setTalknPostFixed
  } = Object(external_react_["useState"])(true);
  const {
    0: isDispFooter,
    1: setIsDispFooter
  } = Object(external_react_["useState"])(false);

  const updateUrl = url => {
    const iframeContainer = document.querySelector('#talknLiveMedia');
    const iframe = document.querySelector('#talknLiveMedia iframe');
    setUrl(url);

    if (iframeContainer && iframe) {
      console.log('UPDATE');
      iframeContainer.dataset.url = url;
      iframe.src = `https://${Networks["b" /* talknScriptHost */]}${urlToCh(url)}`;
      localStorage.setItem(LocalStorageKeys.url, url);
    }
  };

  const redirectTo = async (mktType, category) => {
    setOpenSelectContentsOrder(false);
    return await router.push(`/${mktType}/${category}`);
  };

  const windowEvents = {
    load: external_react_["useCallback"](() => {// console.log(window.talknAPI);
    }, []),
    scroll: external_react_["useCallback"](() => {
      setFixedSmallNav(window.scrollY >= 90);
      setTalknPostFixed(window.scrollY + window.innerHeight <= talknPostScrollTop);
      setIsDispFooter(window.scrollY >= footerScrollTop);
    }, []),
    resize: external_react_["useCallback"](() => {
      const navigationScroll = document.querySelector(`.${pages_navigationScrollClassName}`);

      const _isSpLayout = window.innerWidth < Number(StylesVars["a" /* default */].spLayoutWidth);

      const _isMaxLayout = Number(StylesVars["a" /* default */].maxWidth) < window.innerWidth;

      setIsSpLayout(_isSpLayout);
      setIsMaxLayout(_isMaxLayout);
      const {
        width,
        right
      } = getTalknPostLayout(window.innerWidth, _isMaxLayout, _isSpLayout);
      setTalknPostWidth(String(width));
      setTalknPostRight(String(right));

      if (navigationScroll) {
        setLineNavScrollWidth(navigationScroll.scrollWidth);
      }
    }, [])
  }; // did mount

  external_react_["useEffect"](() => {
    windowEvents.resize();

    switch (window.document.readyState) {
      case 'interactive':
      case 'complete':
        break;

      case 'loading':
        window.addEventListener('load', windowEvents.load);
        break;
    }

    window.addEventListener('resize', windowEvents.resize);
    window.addEventListener('scroll', windowEvents.scroll);
    return () => {
      window.removeEventListener('load', windowEvents.load);
      window.removeEventListener('resize', windowEvents.resize);
      window.removeEventListener('scroll', windowEvents.scroll);
    };
  }, []); // did update

  external_react_["useEffect"](() => {
    const cacheUrl = localStorage.getItem(LocalStorageKeys.url);
    if (props.contents !== contents) setContents(props.contents);
    if (mktType !== props.mktType) setMktType(props.mktType);
    if (category !== props.category) setCategory(props.category);

    if (url !== props.url) {
      updateUrl(props.url);
    }

    if (cacheUrl && url !== cacheUrl) {
      updateUrl(cacheUrl);
    }
  }, [props.contents, props.mktType, props.category, props.url]); // did update url

  external_react_["useEffect"](() => {
    localStorage.setItem(LocalStorageKeys.url, url);
  }, [url]);
  return /*#__PURE__*/Object(jsx_runtime_["jsxs"])(pages_Container, {
    children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(organisms_Header, {
      isMaxLayout: isMaxLayout,
      isFixedSmallNav: isFixedSmallNav,
      isDispFooter: isDispFooter,
      openSelectContentsOrder: openSelectContentsOrder,
      setOpenSelectContentsOrder: setOpenSelectContentsOrder
    }), /*#__PURE__*/Object(jsx_runtime_["jsxs"])(Body, {
      children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(AdvertWrap, {
        children: /*#__PURE__*/Object(jsx_runtime_["jsx"])(Advert, {})
      }), /*#__PURE__*/Object(jsx_runtime_["jsxs"])(Content, {
        children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(organisms_Navigation, {
          isSpLayout: isSpLayout,
          isFixedSmallNav: isFixedSmallNav,
          lineNavScrollWidth: lineNavScrollWidth,
          setLineNavScrollWidth: setLineNavScrollWidth,
          redirectTo: redirectTo
        }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(organisms_ImageSlider, {
          contents: contents,
          isSpLayout: isSpLayout,
          isFixedSmallNav: isFixedSmallNav
        }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(organisms_Main, {
          isFixedSmallNav: isFixedSmallNav,
          isSpLayout: isSpLayout,
          contents: contents,
          talknPostFixed: talknPostFixed,
          talknPostRight: talknPostRight,
          talknPostWidth: talknPostWidth
        })]
      }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(AdvertWrap, {
        children: /*#__PURE__*/Object(jsx_runtime_["jsx"])(Advert, {})
      })]
    }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(organisms_Footer, {
      mktType: mktType,
      category: category,
      redirectTo: redirectTo
    })]
  });
};

/* harmony default export */ var pages = __webpack_exports__["default"] = (TalknMedia);
const getServerSideProps = service["a" /* getServerSidePropsWrap */];
const AdvertWrapSize = 300;
const pages_Container = external_styled_components_default.a.div.withConfig({
  displayName: "pages__Container",
  componentId: "hj6qpc-0"
})(["width:100%;height:100%;padding:0;margin:0 auto;"]);
const Body = external_styled_components_default.a.div.withConfig({
  displayName: "pages__Body",
  componentId: "hj6qpc-1"
})(["display:flex;flex-flow:row nowrap;width:100%;max-width:", "px;margin:0 auto;"], Number(StylesVars["a" /* default */].maxWidth) + AdvertWrapSize * 2);
const AdvertWrap = external_styled_components_default.a.div.withConfig({
  displayName: "pages__AdvertWrap",
  componentId: "hj6qpc-2"
})(["flex:1;max-width:", "px;height:800px;margin-top:80px;"], AdvertWrapSize);
const Advert = external_styled_components_default.a.div.withConfig({
  displayName: "pages__Advert",
  componentId: "hj6qpc-3"
})(["width:100%;height:100%;background:#cdc;"]);
const Content = external_styled_components_default.a.div.withConfig({
  displayName: "pages__Content",
  componentId: "hj6qpc-4"
})(["display:flex;flex-flow:row wrap;align-items:center;justify-content:center;width:100%;max-width:", "px;"], StylesVars["a" /* default */].maxWidth);

/***/ }),

/***/ "XGOH":
/***/ (function(module, exports) {

module.exports = require("recoil");

/***/ }),

/***/ "Y4gs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export defaultMktType */
/* unused harmony export defaultCategory */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return validUrlParams; });
/* unused harmony export getCorrectUrlParams */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getCategories; });
/* harmony import */ var json_news_sitemap_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("1jgn");
var json_news_sitemap_json__WEBPACK_IMPORTED_MODULE_0___namespace = /*#__PURE__*/__webpack_require__.t("1jgn", 1);

const defaultMktType = String("ja-JP");
const defaultCategory = String("Top");
const validUrlParams = (mktType = defaultMktType, category = defaultCategory) => {
  const categories = getCategories(mktType);

  if (categories.length > 0) {
    return category === defaultCategory ? false : !categories.find(c => c.category === category);
  } else {
    return true;
  }
};
const getCorrectUrlParams = (_mktType, _category) => {
  let mktType, category;

  if (validUrlParams(_mktType, _category)) {
    mktType = defaultMktType;
    category = defaultCategory;
  } else {
    mktType = _mktType;
    category = _category;
  }

  return {
    mktType,
    category
  };
};
const getCategories = (mktType, complementDefault = false) => {
  const sitemap = json_news_sitemap_json__WEBPACK_IMPORTED_MODULE_0__.find(sitemap => sitemap.Market === mktType);

  if (sitemap) {
    return sitemap.Categories;
  } else {
    if (complementDefault) {
      return json_news_sitemap_json__WEBPACK_IMPORTED_MODULE_0__[0]['Categories'];
    } else {
      return [];
    }
  }
};

/***/ }),

/***/ "YCKj":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getServerSidePropsWrap; });
/* harmony import */ var node_cache__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("qyX6");
/* harmony import */ var node_cache__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_cache__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var utils_Networks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("FJ2h");
/* harmony import */ var utils_Sitemap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("Y4gs");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




const myCache = new node_cache__WEBPACK_IMPORTED_MODULE_0___default.a();
const defaultMediaType = String("news");
const defaultMktType = String("ja-JP");
const defaultCategory = String("Top");
const defaultUrl = '';
const {
  endpoint,
  method,
  headers,
  count
} = Object(utils_Networks__WEBPACK_IMPORTED_MODULE_1__[/* getNetwork */ "a"])(defaultMediaType);
const requestOption = {
  method,
  headers
};
const keepContentsSecond = Number("3600") * 1000;
const keepContentsCnt = Number("100");

class Monitor {
  constructor() {
    _defineProperty(this, "isLogging", false);
  }

}

class ContentsValues {
  constructor(merged = [], fetched = [], cached = []) {
    this.merged = merged;
    this.fetched = fetched;
    this.cached = cached;
  }

}

class Requests extends Monitor {
  constructor(query, referers) {
    super();

    _defineProperty(this, "mktType", defaultMktType);

    _defineProperty(this, "category", defaultCategory);

    _defineProperty(this, "url", defaultUrl);

    _defineProperty(this, "isSame", false);

    _defineProperty(this, "fetched", false);

    if (query.mktType) this.mktType = query.mktType;
    if (query.category) this.category = query.category;
    if (query.url) this.url = query.url;
    this.isSame = this.mktType !== referers.mktType || this.category !== referers.category;
  }

  get fetchUrl() {
    const mktQuery = `mkt=${this.mktType}`;
    const categoryQery = this.category === defaultCategory ? '' : `&Category=${this.category}`;
    const countQuery = `&count=${count}`;
    return endpoint + mktQuery + categoryQery + countQuery;
  }

  async fetch() {
    console.log(`EXE FETCH ${this.mktType} ${this.category} ${count}`);
    const response = await fetch(this.fetchUrl, requestOption);
    if (response.status !== 200) throw `RESPONSE EROOR: ${response.status} ${this.fetchUrl}`;
    this.fetched = true;
    return await response.json();
  }

}

class Referers extends Monitor {
  constructor(referer) {
    super();

    _defineProperty(this, "mktType", '');

    _defineProperty(this, "category", '');

    const splitedReferer = referer ? referer.split('/') : [];

    if (splitedReferer.length >= 3 && splitedReferer[2] !== '') {
      this.mktType = splitedReferer && splitedReferer[2];
    }

    if (splitedReferer.length >= 4 && splitedReferer[3] !== '') {
      this.category = splitedReferer && splitedReferer[3].indexOf('?') >= 0 ? splitedReferer[3].split('?')[0] : splitedReferer[4];
    }
  }

}

class MyCache extends Monitor {
  constructor(requests, nowUnixtime) {
    super();

    _defineProperty(this, "key", '');

    _defineProperty(this, "nowUnixtime", void 0);

    this.nowUnixtime = nowUnixtime;
    this.key = `json/${defaultMediaType}/${requests.mktType}/${requests.category}`;
  }

  get has() {
    return myCache.has(this.key);
  } // キャッシュ更新から、n時間経過している場合はfetchを実行して連結する


  get isRequireConcat() {
    if (this.isLogging) {
      console.log(new Date(this.nowUnixtime));
      console.log(new Date(this.generateUnixtime));
      console.log(new Date(this.generateUnixtime + keepContentsSecond));
      console.log(this.nowUnixtime > this.generateUnixtime + keepContentsSecond);
    }

    return this.nowUnixtime > this.generateUnixtime + keepContentsSecond;
  }

  get generateUnixtime() {
    if (this.has) {
      const contentsCache = myCache.get(this.key);
      return contentsCache.generateUnixtime;
    } else {
      return 0;
    }
  }

  set(contents) {
    const contentsCache = {
      contents,
      generateUnixtime: this.nowUnixtime
    };
    return myCache.set(this.key, contentsCache, 36000);
  }

  get() {
    const contentsCache = myCache.get(this.key);
    return contentsCache.contents;
  }

}

const getServerSidePropsWrap = async ({
  req,
  res,
  query
}) => {
  const nowUnixtime = new Date().getTime();
  let contentsValues = new ContentsValues();
  const referers = new Referers(String(req.headers.referer));
  const requests = new Requests(query, referers);
  const myCache = new MyCache(requests, nowUnixtime); // redirect root if invalid url.

  if (Object(utils_Sitemap__WEBPACK_IMPORTED_MODULE_2__[/* validUrlParams */ "b"])(requests.mktType, requests.category)) {
    res.writeHead(302, {
      Location: '/'
    });
    res.end();
  }

  console.log(`@@@ getServerSidePropsWrap @@@ ${myCache.key}`);
  console.log(myCache.has);

  if (myCache.has) {
    contentsValues.cached = myCache.get();
    contentsValues.merged = contentsValues.cached;

    if (myCache.isRequireConcat) {
      contentsValues = await fetchProcess(requests, contentsValues, myCache);
    }
  } else {
    contentsValues = await fetchProcess(requests, contentsValues, myCache);
  }

  requests.url = requests.url === '' && contentsValues.merged.length > 0 ? contentsValues.merged[0].url : requests.url;
  return {
    props: _objectSpread(_objectSpread({}, requests), {}, {
      contents: contentsValues.merged
    })
  };
};

const fetchProcess = async (requests, contentsValues, myCache) => {
  const responseJson = await requests.fetch();
  contentsValues.fetched = responseJson.value;
  contentsValues.merged = saveContentsSwitch(contentsValues, myCache);
  contentsValues.cached = contentsValues.merged;
  return contentsValues;
};

const saveContentsSwitch = (contentsValue, myCache) => {
  contentsValue.merged = contentsValue.fetched;
  let existCachedContents = false;
  let existFetchedContens = false;
  if (contentsValue.cached.length > 0) existCachedContents = true;
  if (contentsValue.fetched.length > 0) existFetchedContens = true; // fetch成功してcacheが存在してた場合 -> 連結&ソートして返す

  if (existFetchedContens && existCachedContents) {
    const cachedLastUnixtime = new Date(contentsValue.cached[0].datePublished).getTime();
    contentsValue.merged = contentsValue.cached;
    contentsValue.fetched.sort(sortContents);
    const addFetchContentsIndex = contentsValue.fetched.findIndex(value => {
      const fetchedUnixtime = new Date(value.datePublished).getTime();
      return fetchedUnixtime < cachedLastUnixtime;
    });
    const addFetchContents = contentsValue.fetched.slice(0, addFetchContentsIndex - 1);
    contentsValue.merged = addFetchContents.concat(contentsValue.merged);
    contentsValue.merged = contentsValue.merged.slice(0, keepContentsCnt);
    console.log(`> UPDATE( CONCAT & SORT ) CACHE fetchLast: ${myCache.generateUnixtime}`);
    myCache.set(contentsValue.merged);
  } else if (existFetchedContens && !existCachedContents) {
    console.log('> CREATE NEW CACHE');
    contentsValue.fetched.sort(sortContents);
    contentsValue.merged = contentsValue.fetched;
    contentsValue.merged = contentsValue.merged.slice(0, keepContentsCnt);
    myCache.set(contentsValue.merged);
  } else if (!existFetchedContens && existCachedContents) {
    console.log('> NO FETCH & BACK CACHE');
    contentsValue.merged = contentsValue.cached;
  } else {
    console.log('> NO FETCH & NO CACHE');
    contentsValue.merged = contentsValue.fetched;
    myCache.set(contentsValue.merged);
  }

  return contentsValue.merged;
};

const sortContents = (a, b) => {
  if (a.datePublished < b.datePublished) return 1;
  if (a.datePublished > b.datePublished) return -1;
  return 0;
};

/***/ }),

/***/ "boVf":
/***/ (function(module, exports) {

module.exports = require("dayjs");

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

/***/ "qyX6":
/***/ (function(module, exports) {

module.exports = require("node-cache");

/***/ }),

/***/ "xsP5":
/***/ (function(module, exports) {

module.exports = {"maxWidth":1070,"baseHeight":60,"topImageSectionDefaultHeight":300,"loadingAreaZindex":10000,"modalZindex":21,"headerListZindex":20,"headerZindex":10,"tab":960,"spLayoutWidth":720,"sp":480,"headerHeightWide":"80px","headerHeightNarrow":"60px","transitionDuration1":"0.1s","transitionDuration2":"0.2s","transitionDuration":"0.3s","keycolor":"rgb(52, 117, 204)","txtColor":"rgb(51, 51, 51)","emtxtColor":"rgb(0, 0, 0)","baseBackground":"rgb(255, 255, 255)","grayBackground":"rgb(248, 248, 248)","coverageBackground":"rgb(245, 249, 255)","defaultShadow":"rgba(0, 0, 0, 0.05)","defaultCardShadow":"rgba(0, 0, 0, 0.1)","tableBorder":"rgb(235, 235, 235)","thBackground":"rgb(247, 247, 247)","listTxtColor":"rgb(89, 89, 89)","listBackground":"rgb(249, 249, 249)","listBorder":"rgb(213, 213, 213)","listBorderLight":"rgb(240, 240, 240)","listTxtColorForBgdark":"rgb(179, 179, 179)","modalOverlay":"rgba(0, 0, 0, 0.7)","white":"rgb(255, 255, 255)","black":"rgb(0, 0, 0)","bgColor":"rgb(221, 221, 221)","borderColor":"rgb(238, 221, 238)","themeColor":"rgb(79, 174, 159)"};

/***/ })

/******/ });