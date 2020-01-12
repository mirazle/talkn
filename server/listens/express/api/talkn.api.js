const TALKN_EXT_ENV = "START";
class TalknGlobalAPI {
  static get APP_NAME() {
    return "talkn";
  }
  static get MODE_MODAL() {
    return "EXT_MODAL";
  }
  static get MODE_BOTTOM() {
    return "EXT_BOTTOM";
  }
  static get MODE_INCLUDE() {
    return "EXT_INCLUDE";
  }
  static get DEFAULT_MODE() {
    return Ext.MODE_MODAL;
  }
  static get BASE_EXT_SUBDOMAIN() {
    return "ext";
  }
  static get BASE_PROD_HOST() {
    return "talkn.io";
  }
  static get BASE_DEV_HOST() {
    return "localhost";
  }
  static get BASE_DEV_PORT() {
    return 8080;
  }
  static get EXCLUSION_ORIGINS() {
    return ["https://localhost", "https://talkn.io"];
  }
  static get API_KEY() {
    return "api";
  }
  static get API_VER_KEY() {
    return "1";
  }
  static get DEFAULT_DISPLAY_MODE_KEY() {
    return 0;
  }
  static get DEFAULT_DISPLAY_MODE_DIRECTION() {
    return "ASC";
  }
  static get DISPLAY_MODE() {
    return [Ext.DISPLAY_MODE_ACTIVE, Ext.DISPLAY_MODE_OPEN];
  }
  static get DISPLAY_MODE_ACTIVE() {
    return "ACTIVE";
  }
  static get DISPLAY_MODE_STANBY() {
    return "STANBY";
  }
  static get DISPLAY_MODE_OPEN() {
    return "OPEN";
  }
  static get INCLUDE_ID() {
    return `#${Ext.APP_NAME}`;
  }
  static get APP_HOST() {
    if (TALKN_EXT_ENV === "PROD") {
      return `//${Ext.BASE_PROD_HOST}`;
    } else if (TALKN_EXT_ENV === "START") {
      return `//${Ext.BASE_DEV_HOST}`;
    } else if (TALKN_EXT_ENV === "DEV") {
      return `//${Ext.BASE_DEV_HOST}:${Ext.BASE_DEV_PORT}`;
    }
  }
  static get APP_EXT_HOST() {
    if (TALKN_EXT_ENV === "PROD") {
      return `//${Ext.BASE_EXT_SUBDOMAIN}.${Ext.BASE_PROD_HOST}`;
    } else if (TALKN_EXT_ENV === "START") {
      return `//${Ext.BASE_EXT_SUBDOMAIN}.${Ext.BASE_DEV_HOST}`;
    } else if (TALKN_EXT_ENV === "DEV") {
      return `//${Ext.BASE_EXT_SUBDOMAIN}.${Ext.BASE_DEV_HOST}:${Ext.BASE_DEV_PORT}`;
    }
  }
  static get API_HOST() {
    if (TALKN_EXT_ENV === "PROD") {
      return `//${Ext.API_KEY}.${Ext.BASE_PROD_HOST}`;
    } else if (TALKN_EXT_ENV === "START") {
      return `//${Ext.API_KEY}.${Ext.BASE_DEV_HOST}`;
    } else if (TALKN_EXT_ENV === "DEV") {
      return `//${Ext.API_KEY}.${Ext.BASE_DEV_HOST}`;
    }
  }
  static get APP_ENDPOINT() {
    return `https:${Ext.APP_HOST}`;
  }
  static get API_ENDPOINT() {
    return `https:${Ext.API_HOST}/v${Ext.API_VER_KEY}`;
  }
  static isExt() {
    const scriptTag = document.querySelector(`script[src='${Ext.APP_EXT_HOST}']`);
    return scriptTag === null ? true : false;
  }
  static getMode(options) {
    let includeTag;

    /************/
    /*  OPTION  */
    /************/

    if (options && options.mode) {
      if ("EXT_" + options.mode === Ext.MODE_MODAL) {
        return Ext.MODE_MODAL;
      }
      if ("EXT_" + options.mode === Ext.MODE_INCLUDE && options.selector) {
        includeTag = document.querySelector(options.selector);
        if (includeTag) {
          Object.keys(options).forEach(key => {
            if (key !== "mode") {
              includeTag.style[key] = options[key];
            }
          });
          return Ext.MODE_INCLUDE;
        }
      }
    }

    /************/
    /*  NORMAL  */
    /************/

    includeTag = document.querySelector(Ext.INCLUDE_ID);
    if (includeTag) {
      return Ext.MODE_INCLUDE;
    }

    let mode = Ext.DEFAULT_MODE;
    const domain = TALKN_EXT_ENV === "PROD" ? Ext.BASE_PROD_HOST : Ext.BASE_DEV_HOST;
    const scriptTag = document.querySelector(`script[src='//ext.${domain}']`);
    if (scriptTag && scriptTag.attributes) {
      if (scriptTag.attributes.mode && scriptTag.attributes.mode.value) {
        mode = "EXT_" + scriptTag.attributes.mode.value.toUpperCase();
      }

      // 定義しているどのモードにも該当しない場合
      if (mode !== Ext.MODE_BOTTOM && mode !== Ext.MODE_MODAL && mode !== Ext.MODE_INCLUDE) {
        // デフォルトのモードを設定する
        mode = Ext.DEFAULT_MODE;
      }
    }
    return mode;
  }
  static getRequestObj(method, params = {}) {
    const href = location.href;
    params.href = href;
    return {
      type: Ext.APP_NAME,
      href,
      method: method,
      methodId: 0,
      params: params
    };
  }
}

class Window {
  static get talknNotifId() {
    return "talknNotifId";
  }
  static get mediaSecondInterval() {
    return 333;
  }
  static get activeMethodSecond() {
    return 1000;
  }
  static get aacceptPostMessages() {
    return ["toggleIframe", "location", "find", "openNotif", "closeNotif", "linkTo", "setInputPost", "getClientMetas"];
  }

  static getCurrentTime(currentTime, base = 10) {
    return Math.floor(currentTime * base) / base;
  }

  static getActiveStyles(called) {}

  static getOpenStyles(called) {}

  constructor(refusedFrame = false) {
    super(window);
    console.log("@@@@@@@ LOAD GLOBAL API");
    this.refusedFrame = refusedFrame;
    this.isExt = Ext.isExt();
    this.href = window.location.href;
    this.ch = this.href.replace("http:/", "").replace("https:/", "");
    const hasSlash = this.ch.lastIndexOf("/") === this.ch.length - 1;
    this.ch = hasSlash ? this.ch : this.ch + "/";
    const bootFlg = Ext.EXCLUSION_ORIGINS.every(origin => {
      return this.href.indexOf(origin) === -1;
    });

    if (bootFlg) {
      let init = (options = {}) => {
        // Variable
        this.state = {};
        window.addEventListener("message", this.catchMessage);
      };

      init = init.bind(this);

      if (this.isExt) {
        // Communication to background.js
        chrome.runtime.sendMessage({ message: "message" }, res => {
          const options = res ? JSON.parse(res) : {};
          init(options);
        });
      } else {
        init();
      }
    }
  }

  /********************************/
  /* Initial methods              */
  /********************************/

  get() {
    return window;
  }

  /*************************/
  /* Child Window          */
  /* Communication methods */
  /*************************/

  bootExtension(params) {
    const { iframe } = this.ins;
    const iframeElm = iframe.get();
    switch (this.extMode) {
      case Ext.MODE_BOTTOM:
      case Ext.MODE_INCLUDE:
        iframeElm.style.height = Iframe.getCloseHeight();
        iframeElm.style.display = "flex";
        break;
      case Ext.MODE_MODAL:
        break;
    }

    this.talknParams = params;
    this.childTo("onTransition");
  }

  // From child window message.
  catchMessage(e) {
    const { type, method, params } = e.data;
    if (type === Ext.APP_NAME) {
      if (this[method] && typeof this[method] === "function") {
        if (this.methodIdMap[method] || Window.aacceptPostMessages.includes(method)) {
          const iframe = document.querySelector(`iframe#${Ext.APP_NAME}Extension`);
          this[method](params);
          clearTimeout(this.methodIdMap[method]);
          delete this.methodIdMap[method];
        }
      }
    }
  }
  // handle error.
  handleErrorMessage(method) {
    if (this.methodIdMap[method]) {
      switch (method) {
        case "bootExtension":
          this.childTo("removeExtension");
          const { iframe, handleIcon, notifStatus, textarea } = this.ins;
          iframe.remove();
          handleIcon.remove();
          notifStatus.remove();
          textarea.remove();
          this.remove();
          console.warn("CSP Reboot: " + method);
          new Window(true);
          break;
      }
    }
  }
  // To child window message.
  childTo(method, params = {}) {
    const iframe = this.ins.iframe.get();
    const src = this.ins.iframe.getSrc();
    const requestObj = Ext.getRequestObj(method, params);
    const methodId = setTimeout(() => this.handleErrorMessage(method), Window.activeMethodSecond);
    this.methodIdMap[method] = methodId;
    iframe.contentWindow.postMessage(requestObj, src);
  }

  /********************************/
  /* Accept Communication methods */
  /********************************/

  toggleIframe(params) {
    this.updateDisplayMode("toggleIframe");
  }

  find(state) {
    this.state = state;
  }
}

const talknExtension = document.querySelector("iframe#talknExtension");
if (!talknExtension) {
  new Window();
}
