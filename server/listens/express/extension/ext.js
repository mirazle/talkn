window.TALKN_EXT_ENV = "PROD";
/*
  Class
    Ext
    ReactMode
      Window
      ApiScript
      Styles
      Body
      Iframe
        IframeModal(*1)
          ModalHandleIcon
          ModalLiveCnt
          ModalNotif
        IframeBottom(*1)
        IframeWindow(*1)
        EmbedIframe(*n)
*/
class Ext {
  static get APP_NAME() {
    return "talkn";
  }
  static get APP_CLIENT_KEY() {
    return "Client";
  }
  static get USER_DEFINE_MODE_MODAL() {
    return "Modal";
  }
  static get USER_DEFINE_MODE_BOTTOM() {
    return "Bottom";
  }
  static get USER_DEFINE_MODE_EMBED() {
    return "Embed";
  }
  static get USER_DEFINE_MODE_WINDOW() {
    return "Window";
  }
  static get USER_DEFINE_MODE_DEFAULT() {
    return Ext.USER_DEFINE_MODE_MODAL;
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
  static get DEVELOPMENT_HASH() {
    return "#dev";
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
  static get APP_ASSETS_HOST() {
    if (TALKN_EXT_ENV === "PROD") {
      return `//assets.${Ext.BASE_PROD_HOST}`;
    } else if (TALKN_EXT_ENV === "START") {
      return `//assets.${Ext.BASE_DEV_HOST}`;
    } else if (TALKN_EXT_ENV === "DEV") {
      return `//assets.${Ext.BASE_DEV_HOST}:${Ext.BASE_DEV_PORT}`;
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
    }
    if (TALKN_EXT_ENV === "START") {
      return `//${Ext.API_KEY}.${Ext.BASE_DEV_HOST}`;
    } else if (TALKN_EXT_ENV === "DEV") {
      return `//${Ext.API_KEY}.${Ext.BASE_DEV_HOST}`;
    }
  }
  static get APP_ENDPOINT() {
    const port = location.hash === Ext.DEVELOPMENT_HASH ? ":8080" : "";
    return `https:${Ext.APP_HOST}${port}`;
  }
  static get API_ENDPOINT() {
    return location.hash === Ext.DEVELOPMENT_HASH
      ? `https://${Ext.BASE_DEV_HOST}:8081/talkn.api.js`
      : `https:${Ext.API_HOST}/v${Ext.API_VER_KEY}`;
  }
  static get() {
    return document.querySelector(`script[src='${Ext.APP_EXT_HOST}']`);
  }
  static isBrowserExt() {
    return Ext.get() === null;
  }
  static getUserDefineMode(options) {
    let embedTags;
    /*****************/
    /*  OPTION BOOT  */
    /*****************/

    if (options && options.mode) {
      if ("EXT_" + options.mode === Ext.USER_DEFINE_MODE_MODAL) {
        return Ext.USER_DEFINE_MODE_MODAL;
      }
      if ("EXT_" + options.mode === Ext.USER_DEFINE_MODE_EMBED && options.selector) {
        embedTags = document.querySelector(options.selector);
        if (embedTags) {
          Object.keys(options).forEach((key) => {
            if (key !== "mode") {
              embedTags.style[key] = options[key];
            }
          });
          return Ext.USER_DEFINE_MODE_EMBED;
        }
      }
    }

    /*****************/
    /*  NORMAL       */
    /*****************/

    let mode = Ext.USER_DEFINE_MODE_DEFAULT;
    const domain = TALKN_EXT_ENV === "PROD" ? Ext.BASE_PROD_HOST : Ext.BASE_DEV_HOST;
    const scriptTag = document.querySelector(`script[src='//ext.${domain}']`);

    if (scriptTag && scriptTag.attributes) {
      if (scriptTag.attributes.mode && scriptTag.attributes.mode.value) {
        mode = scriptTag.attributes.mode.value;
      }

      // 定義しているどのモードにも該当しない場合
      if (
        mode !== Ext.USER_DEFINE_MODE_BOTTOM &&
        mode !== Ext.USER_DEFINE_MODE_MODAL &&
        mode !== Ext.USER_DEFINE_MODE_EMEBD
      ) {
        // デフォルトのモードを設定する
        mode = Ext.USER_DEFINE_MODE_DEFAULT;
      }
    }

    return mode;
  }
  static getCh(_ch) {
    return _ch.replace("https:/", "").replace("http:/", "");
  }
  static getApiToRequestObj(iFrameId, method, params = {}) {
    return {
      iFrameId,
      type: "EXT_TO_API_TYPE",
      method: method,
      params: params,
      href: window.top.location.href,
    };
  }
}

class ReactMode {
  constructor(_window) {
    this.window = _window;
    this.action = this.action.bind(this);
  }
  action(called, dispMode) {
    let elm;
    if (this.get) {
      elm = this.get();
    }
    if (this.dom) {
      elm = this.dom;
    }
    if (this[`get${dispMode}Styles`]) {
      const styles = this[`get${dispMode}Styles`](called);

      if (elm && styles) {
        Object.keys(styles).forEach((key) => {
          elm.style[key] = styles[key];
        });
      }
    } else {
      throw `Error: ReactMode action method [${this.constructor.name}.get${dispMode}Styles ${called} ]`;
    }
  }
  callback(called, displayMode, displayModeDirection, actionName, _window) {
    // スマホだと頻繁にNativeのヘッダーやフッターが表示、非表示を繰り返しresizedが実行されてしまうため排他制御
    if (window.innerWidth < Styles.FULL_WIDTH_THRESHOLD) {
      if (called !== "resized") {
        switch (displayMode) {
          case Ext.DISPLAY_MODE_ACTIVE:
            if (displayModeDirection === "DESC") {
              window.scrollTo(0, _window.ins.body.locktimeMarginTop);
            }
            break;
          case Ext.DISPLAY_MODE_OPEN:
            if (displayModeDirection === "DESC") {
              window.scrollTo(0, _window.ins.body.locktimeMarginTop);
            }
            break;
        }
      }
    }
  }
}

class Window extends ReactMode {
  static get className() {
    return "talknGlobalParts";
  }

  static get talknNotifIdKey() {
    return "talknNotifIdKey";
  }
  static get mediaSecondInterval() {
    return 333;
  }
  static getCurrentTime(currentTime, base = 10) {
    return Math.floor(currentTime * base) / base;
  }

  static getActiveStyles(called) {}

  static getOpenStyles(called) {}

  get iframeKeys() {
    return Object.keys(this.ins.iframes);
  }

  constructor(refusedFrame = false) {
    super(window);
    this.refusedFrame = refusedFrame;
    this.isBrowserExt = Ext.isBrowserExt();
    this.href = window.top.location.href;
    this.ch = this.href.replace("http:/", "").replace("https:/", "");
    const hasSlash = this.ch.lastIndexOf("/") === this.ch.length - 1;
    this.ch = hasSlash ? this.ch : this.ch + "/";
    const bootFlg = Ext.EXCLUSION_ORIGINS.every((origin) => {
      return this.href.indexOf(origin) === -1;
    });

    if (bootFlg) {
      let init = (option = {}) => {
        // Variable
        this.talknParams = {};
        this.embedIframeTags = IframeEmbed.getEmbedIframeTags();
        this.embedIframeTagCnt = this.embedIframeTags.length;
        this.userDefineMode = Ext.getUserDefineMode(option);
        this.displayModeKey = Ext.DEFAULT_DISPLAY_MODE_KEY;
        this.displayModeDirection = "ASC";
        this.browser = this.getBrowser();
        this.handleMediaCurrentTime = 0;
        this.scrollY = window.scrollY;
        this.ins = {};

        // settimeout ids.
        this.transitionEndId = null;
        this.resizeMethodId = null;

        // Callback Methods.
        this.load = this.load.bind(this);
        this.resize = this.resize.bind(this);
        this.resized = this.resized.bind(this);
        this.scroll = this.scroll.bind(this);
        this.transitionend = this.transitionend.bind(this);
        this.remove = this.remove.bind(this);

        this.updateDisplayMode = this.updateDisplayMode.bind(this);
        this.transformDisplayMode = this.transformDisplayMode.bind(this);

        // Communicarion Methods.
        this.apiTo = this.apiTo.bind(this);
        this.catchMessage = this.catchMessage.bind(this);
        this.handleErrorMessage = this.handleErrorMessage.bind(this);

        window.addEventListener("message", this.catchMessage);
        window.addEventListener("load", this.load);
        window.addEventListener("resize", this.resize);
        window.addEventListener("scroll", this.scroll);
        window.addEventListener("transitionend", this.transitionend);

        this.ins.window = this;
        this.ins.apiScript = new ApiScript(this);
        this.ins.styles = new Styles(this);
        this.ins.body = new Body(this);
        this.ins.handleIcon = new HandleIcon(this);
        this.ins.notifStatus = new LiveCnt(this);
        this.ins.iframe = {};
        this.ins.iframes = {};

        // Embed auto boot.
        if (this.embedIframeTagCnt > 0) {
          this.embedIframeTags.forEach((embedtag, i) => {
            const index = i + 1;
            embedtag.id = embedtag.id ? embedtag.id : `${Ext.APP_NAME}${Iframe.MODE_EMBED}${index}`;
            const appendRoot = window.top.document.getElementById(embedtag.id);
            const ch = embedtag.getAttribute("ch") ? embedtag.getAttribute("ch") : window.top.location.href;
            const embedIframe = new IframeEmbed(this, appendRoot, ch, Iframe.MODE_EMBED, index);
            this.ins.iframes[embedtag.id] = embedIframe;
          });
        }

        switch (this.userDefineMode) {
          case Iframe.MODE_MODAL:
            this.ins.iframe = new IframeModal(this);
            this.ins.iframes[`${Ext.APP_NAME}${Iframe.MODE_MODAL}`] = this.ins.iframe;
            break;
          case Iframe.MODE_BOTTOM:
            this.ins.iframe = new IframeBottom(this);
            this.ins.iframes[`${Ext.APP_NAME}${Iframe.MODE_BOTTOM}`] = this.ins.iframe;
            break;
        }
      };

      init = init.bind(this);

      if (this.isBrowserExt) {
        // Communication to background.js
        chrome.runtime.sendMessage({ message: "message" }, (res) => {
          const option = res ? JSON.parse(res) : {};
          init(option);
        });
      } else {
        init();
      }
    }
  }

  /********************************/
  /* Control transform            */
  /********************************/

  updateDisplayMode(called, transform = true, option = {}) {
    if (option.displayModeKey !== undefined) {
      this.displayModeKey = option.displayModeKey;
      if (option.displayModeDirection) {
        this.displayModeDirection = option.displayModeDirection;
      }
    } else {
      if (this.displayModeDirection === "ASC") {
        this.displayModeKey++;
        if (this.displayModeKey >= Ext.DISPLAY_MODE.length) {
          this.displayModeDirection = "DESC";
          this.displayModeKey = this.displayModeKey - 2;
        }
      } else {
        this.displayModeKey--;
        if (this.displayModeKey < 0) {
          this.displayModeDirection = "ASC";
          this.displayModeKey = 1;
        }
      }
    }

    if (transform) {
      this.transformDisplayMode(called, this.displayModeKey);
    }
  }

  transformDisplayMode(called, displayModeKey) {
    const { body, iframes, handleIcon, notifStatus } = this.ins;
    const displayMode = Ext.DISPLAY_MODE[displayModeKey].toLowerCase();
    const actionName = displayMode.charAt(0).toUpperCase() + displayMode.slice(1);
    const beforeDisplayMode = Ext.DISPLAY_MODE[this.displayModeKey];
    const beforeDisplayModeDirection = this.displayModeDirection;
    if (this) this.action(called, actionName);
    if (body) body.action(called, actionName);
    if (iframes) this.iframeKeys.forEach((iFrameId) => iframes[iFrameId].action(called, actionName));
    if (handleIcon) handleIcon.action(called, actionName);
    if (notifStatus) notifStatus.action(called, actionName);
    this.callback(called, beforeDisplayMode, beforeDisplayModeDirection, actionName, this);
  }

  /********************************/
  /* Initial methods              */
  /********************************/

  get() {
    return window;
  }

  isMediaCh() {
    const href = location.href;
    let isMediaCh = false;
    if (href.match(/mp3$/) || href.match(/mp3\/$/)) {
      isMediaCh = true;
    }

    if (href.match(/mp4$/) || href.match(/mp4\/$/)) {
      isMediaCh = true;
    }

    if (href.match(/m4a$/) || href.match(/m4a\/$/)) {
      isMediaCh = true;
    }
    return isMediaCh;
  }

  getBrowser() {
    const agent = window.navigator.userAgent.toLowerCase();
    if (agent.indexOf("crios") !== -1 && agent.indexOf("safari") > 0) {
      return "Chrome";
    } else if (agent.indexOf("crios") === -1 && agent.indexOf("safari") > 0) {
      return "Safari";
    } else if (agent.indexOf("opera") > -1) {
      return "Opera";
    } else if (agent.indexOf("firefox") > -1) {
      return "Firefox";
    }
  }

  /*************************/
  /* Child Window          */
  /* Communication methods */
  /*************************/

  // From child window message.
  catchMessage(e) {
    const { iframes } = this.ins;
    const { iFrameId, type, method, params } = e.data;
    switch (type) {
      case "CLIENT_TO_EXT_TYPE":
        const iframe = iframes[iFrameId];
        if (!iframe) break;
        if (!iframe[method]) break;
        if (typeof iframe[method] !== "function") break;
        if (iframe.methodIdMap[method] || iframe.acceptPostMessages.includes(method)) {
          iframe[method](params);
          clearTimeout(iframe.methodIdMap[method]);
          delete iframe.methodIdMap[method];
        }
        break;
      case "API_TO_EXT_TYPE":
        break;
    }
  }
  // handle error.
  handleErrorMessage(method) {
    if (this.methodIdMap[method]) {
      switch (method) {
        case "bootExtension":
          this.clientTo("removeExtension");
          const { iframes, handleIcon, notifStatus } = this.ins;
          this.iframeKeys.foeach((iFrameId) => {
            iframes[iFrameId].remove();
          });
          handleIcon.remove();
          notifStatus.remove();
          this.remove();
          console.warn("CSP Reboot: " + method);
          new Window(true);
          break;
      }
    }
  }

  apiTo(iFrameId, method, params = {}) {
    const src = location.href;
    const requestObj = Ext.getApiToRequestObj(iFrameId, method, params);
    window.postMessage(requestObj, src);
  }

  transitionend(e) {
    const { body, iframes, handleIcon } = this.ins;

    if (this.transitionEndId === null) {
      this.transitionEndId = setTimeout(() => {
        this.transitionEndId = null;

        this.iframeKeys.forEach((iFrameId) => {
          const iframe = iframes[iFrameId];
          const clientToParams = {
            ui: {
              extensionMode: this.userDefineMode,
              extensionWidth: iframe.getWidth(true),
              extensionOpenHeight: Number(iframe.getHeight()),
            },
          };
          iframe.clientTo("updateExtension", clientToParams);
          iframe.transitionEnd(e);
        });
      }, Styles.BASE_TRANSITION);
    }

    if (body && body.transitionEnd) body.transitionEnd(e);
    if (handleIcon && handleIcon.transitionEnd) handleIcon.transitionEnd(e);
  }

  /*************************/
  /* CALLBACKS             */
  /*************************/

  load(e) {
    this.resized();
  }

  resize(e) {
    if (this.resizeMethodId === null) {
      this.resizeMethodId = setTimeout(this.resized, Styles.BASE_TRANSITION);
    }
  }

  scroll(e) {}

  resized(e) {
    const { iframes } = this.ins;
    this.resizeMethodId = null;

    this.updateDisplayMode("resized", true, {
      displayModeKey: this.displayModeKey,
      displayModeDirection: this.displayModeDirection,
    });

    this.iframeKeys.forEach((iFrameId) => {
      const clientToParams = {
        ui: {
          extensionMode: this.userDefineMode,
          extensionWidth: iframes[iFrameId].getWidth(true),
          extensionOpenHeight: Number(iframes[iFrameId].getHeight()),
        },
      };
      iframes[iFrameId].clientTo("updateExtension", clientToParams);
    });
  }

  remove() {
    window.removeEventListener("message", this.catchMessage);
    window.removeEventListener("load", this.load);
    window.removeEventListener("resize", this.resize);
    window.removeEventListener("scroll", this.scroll);
    window.removeEventListener("transitionend", this.transitionend);
  }

  /*************************/
  /* ANIMATION             */
  /*************************/

  getActiveStyles(called) {
    return {};
  }

  getOpenStyles(called) {
    this.scrollY = window.scrollY;
    return {};
  }
}

class ApiScript {
  constructor(_window) {
    this.window = _window;
    this.load = this.load.bind(this);
    const apiScript = document.createElement("script");
    apiScript.id = "talknApi";
    apiScript.async = true;
    apiScript.type = "text/javascript";
    apiScript.src = this.getSrc();
    apiScript.addEventListener("load", this.load);
    window.top.document.head.appendChild(apiScript);
  }

  getSrc() {
    if (this.window.isBrowserExt) {
      return window.chrome.runtime.getURL("talkn.api.js");
    } else {
      return Ext.API_ENDPOINT;
    }
  }

  load() {
    if (this.window.embedIframeTagCnt > 0) {
      this.window.embedIframeTags.forEach((iframe) => {
        this.window.apiTo(iframe.id, "HANDLE_EXT_AND_API", {});
      });
    }
    this.window.apiTo("talknModal", "HANDLE_EXT_AND_API", {});
  }
}

class Styles {
  static get zIndex() {
    return 2147483647;
  }
  static get FULL_WIDTH_THRESHOLD() {
    return 600;
  }
  static get BASE_TRANSITION() {
    return 600;
  }
  static get WIDTH() {
    return 280;
  }
  static get BOTTOM() {
    return 45;
  }
  static get BORDER_RADIUS() {
    return 5;
  }
  static get BASE_SHADOW() {
    return "rgba(200, 200, 200, 0.9) 0px 0px 1px 0px !important;";
  }
  static get BASE_ACTIVE_BG_COLOR() {
    return "rgba(255, 255, 255, 0.975) !important;";
  }
  static get BASE_UNACTIVE_BG_COLOR() {
    return "rgba(255, 255, 255, 0.85) !important;";
  }
  static get BASE_ACTIVE_BORDER() {
    return "1px solid rgba(235, 235, 235, 0.975) !important;";
  }
  static get BASE_UNACTIVE_BORDER() {
    return "1px solid rgba(235, 235, 235, 0.85) !important;";
  }
  constructor() {
    const style = document.createElement("style");
    const css = document.createTextNode(``);
    style.type = "text/css";
    style.appendChild(css);
    document.head.appendChild(style);
  }
}

class Body extends ReactMode {
  constructor(_window) {
    super(_window);
    const bodyElm = this.get();
    this.locktimeMarginTop = 0;

    if (bodyElm && bodyElm.style) {
      this.overflow = bodyElm.style.overflow;
      this.position = bodyElm.style.position;
      this.width = bodyElm.style.width;
      this.height = bodyElm.style.height;
      this.marginTop = bodyElm.style.marginTop;
    } else {
      console.warn(bodyElm);
    }
  }

  get() {
    return document.querySelector(`body`);
  }

  /*************************/
  /* ANIMATION             */
  /*************************/

  getActiveStyles(called) {
    if (window.innerWidth < Styles.FULL_WIDTH_THRESHOLD) {
      return {
        //                overflow: this.overflow,
        position: this.position,
        width: this.width,
        height: this.height,
        marginTop: this.marginTop,
      };
    }
    return {};
  }

  getOpenStyles(called) {
    if (window.innerWidth < Styles.FULL_WIDTH_THRESHOLD) {
      // スマホでOPENした際にresizedが実行されるため排他制御
      if (called === "resized") {
        return {};
      } else {
        this.locktimeMarginTop = window.scrollY;
        return {
          position: "fixed",
          width: "100%",
          height: "100%",
          marginTop: -window.scrollY + "px",
        };
      }
    }
  }

  transitionEnd() {}
}

class Iframe extends ReactMode {
  static get MODE_MODAL() {
    return "Modal";
  }
  static get MODE_BOTTOM() {
    return "Bottom";
  }
  static get MODE_EMBED() {
    return "Embed";
  }
  static get MODE_OUT_WINDOW() {
    return "OutWindow";
  }
  static get EXT_TO_CLIENT_TYPE() {
    return "EXT_TO_CLIENT_TYPE";
  }
  static get DEFAULT_MODE() {
    return Iframe.MODE_MODAL;
  }
  static get activeMethodSecond() {
    return 1000;
  }
  static get MODES() {
    return { IframeModal, IframeBottom, IframeEmbed, IframeWindow };
  }
  constructor(_window, ch, mode, number) {
    super(_window);

    // bind.
    this.getSrc = this.getSrc.bind(this);
    this.getClientToObj = this.getClientToObj.bind(this);
    this.load = this.load.bind(this);
    this.clientTo = this.clientTo.bind(this);
    this.catchMessage = this.catchMessage.bind(this);
    this.handleClientToError = this.handleClientToError.bind(this);

    // Communication status.
    this.state = {};
    this.methodIdMap = {};
    this.notifedId = [];

    // Iframe status.
    const numberKey = number ? String(number) : "";
    const width = `${this.getWidth(true)} !important;`;
    this.id = `${Ext.APP_NAME}${mode}${numberKey}`;
    this.ch = ch;
    this.mode = mode;
    this.src = this.getSrc();
    this.dom = document.createElement("iframe");
    this.dom.setAttribute("id", this.id);
    this.dom.setAttribute("src", this.src);
    this.dom.setAttribute("frameBorder", 0);
    this.dom.setAttribute("scrolling", "yes");
    this.dom.setAttribute("style", this.getStyles(width));
    this.dom.addEventListener("load", this.load);
    this.appendRoot.appendChild(this.dom);
  }

  getSrc() {
    if (this.window.refusedFrame) {
      return window.chrome.runtime.getURL(`csp.html?${this.ch}`);
    } else {
      return `${Ext.APP_ENDPOINT}${this.ch}`;
    }
  }

  getClientToObj(method, params = {}) {
    return {
      iFrameId: this.id,
      type: Iframe.EXT_TO_CLIENT_TYPE,
      method: method,
      params: params,
      href: window.top.location.href,
    };
  }

  clientTo(method, params = {}) {
    const requestObj = this.getClientToObj(method, params);
    const methodId = setTimeout(() => this.handleClientToError(method), Iframe.activeMethodSecond);
    this.methodIdMap[method] = methodId;
    this.dom.contentWindow.postMessage(requestObj, this.src);
  }

  // handle error.
  handleClientToError(method) {
    if (this.methodIdMap[method]) {
      switch (method) {
        case "bootExtension":
          // this.clientTo("removeExtension");
          const { iframes, handleIcon, notifStatus } = this.ins;
          this.iframeKeys.foeach((iFrameId) => {
            iframes[iFrameId].remove();
          });
          handleIcon.remove();
          notifStatus.remove();
          this.remove();
          console.warn("CSP Reboot: " + method);
          new Window(true);
          break;
      }
    }
  }

  bootExtension(params) {
    switch (this.window.ins.userDefineMode) {
      case Iframe.MODE_BOTTOM:
      case Iframe.MODE_EMBED:
        this.dom.style.height = IframeModal.getCloseHeight();
        this.dom.style.display = "flex";
        break;
      case Iframe.MODE_MODAL:
        break;
    }

    this.talknParams = params;
    this.clientTo("onTransition");
  }

  catchMessage(params) {}
  transitionEnd(params) {}
}

class IframeModal extends Iframe {
  static getCloseHeight(addUnit = false) {
    return addUnit ? "45px" : 45;
  }
  static getIframeOpenNotifHeight() {
    return "85px";
  }

  static get width() {
    return window.innerWidth < Styles.FULL_WIDTH_THRESHOLD ? "96%" : 280;
  }
  static get height() {
    return window.innerWidth < Styles.FULL_WIDTH_THRESHOLD ? "2%" : 420;
  }
  static get right() {
    return window.innerWidth < Styles.FULL_WIDTH_THRESHOLD ? "2%" : 10;
  }
  static get transform() {
    return `translate3d( 0px, ${Styles.BOTTOM}px, 0px )`;
  }
  static get closeHeight() {
    return 0;
  }
  static get modeModalBottom() {
    return 45;
  }
  get acceptPostMessages() {
    return [
      "tune",
      "bootExtension",
      "openNotif",
      "closeNotif",
      "toggleIframe",
      "location",
      "disconnect",
      "linkTo",
      "setInputPost",
      "getClientMetas",
    ];
  }
  get appendRoot() {
    return window.top.document.body;
  }

  constructor(_window) {
    const extScript = Ext.get();
    let ch = extScript.getAttribute("ch");
    ch = ch ? ch : window.top.location.href;
    ch = Ext.getCh(ch);
    super(_window, ch, Iframe.MODE_MODAL);

    // dom.
    this.getWidth = this.getWidth.bind(this);
    this.getHeight = this.getHeight.bind(this);
    this.getRight = this.getRight.bind(this);
    this.getTransform = this.getTransform.bind(this);

    // communication.
    this.bootExtension = this.bootExtension.bind(this);
    this.tune = this.tune.bind(this);
    this.updateLiveCnt = this.updateLiveCnt.bind(this);
    this.openNotif = this.openNotif.bind(this);
    this.closeNotif = this.closeNotif.bind(this);
    this.catchMessage = this.catchMessage.bind(this);
    this.handleClientToError = this.handleClientToError.bind(this);
  }

  /*************************/
  /* CALLBACKS             */
  /*************************/

  load(e) {
    this.clientTo("bootExtension", {
      ui: {
        extensionMode: this.mode,
        extensionWidth: this.getWidth(false),
        extensionOpenHeight: this.getHeight(false),
        extensionCloseHeight: Number(IframeModal.getCloseHeight()),
      },
    });
  }

  // handle error.
  handleClientToError(method) {}

  remove() {
    const { handleIcon, notifStatus } = this.ins;
    this.dom.removeEventListener("load", this.load);
    this.dom.remove();
    delete this;
    handleIcon.remove();
    notifStatus.remove();
  }

  getClientMetas() {
    let title = document.querySelector("title");
    title = title && title.text !== "" ? title.text : "";
    let description = document.querySelector("description");
    description = description && description.text !== "" ? description.text : "";
    const metas = document.querySelectorAll("meta");
    let clientMetas = { title, description };

    for (let i = 0; i < metas.length; i++) {
      const item = metas[i];
      let key = i;
      let content = "";
      if (item.getAttribute("name")) {
        key = item.getAttribute("name");
        content = item.getAttribute("content");
      } else if (item.getAttribute("property")) {
        key = item.getAttribute("property");
        content = item.getAttribute("content");
      } else if (item.getAttribute("chaset")) {
        key = "charset";
        content = item.getAttribute("chaset");
      } else if (item.getAttribute("http-equiv")) {
        key = item.getAttribute("http-equiv");
        content = item.getAttribute("content");
      }
      clientMetas[key] = content;
    }
    this.clientTo("getClientMetas", clientMetas);
  }

  /*************************/
  /* UI DATAS              */
  /*************************/

  getStyles(width) {
    const activeStyles = this.getActiveStyles();
    return (
      "" +
      `z-index: ${Styles.zIndex - 1} !important;` +
      "display: block !important;" +
      "align-items: flex-end !important;" +
      "position: fixed !important; " +
      `bottom: ${Styles.BOTTOM}px !important;` +
      `right: ${activeStyles.right} !important;` +
      `border-radius: 10px !important;` +
      `min-width: ${activeStyles.width} !important;` +
      `width: ${activeStyles.width} !important;` +
      `min-height: ${activeStyles.height} !important;` +
      `height: ${activeStyles.height} !important;` +
      "margin: 0 !important;" +
      "padding: 0 !important;" +
      `opacity: ${activeStyles.opacity} !important;` +
      `overflow: hidden !important;` +
      `clip-path: inset(0px round 10px) !important;` +
      `-webkit-clip-path: inset(0px round 10px) !important;` +
      `transition: ${Styles.BASE_TRANSITION}ms !important;` +
      `transform: ${activeStyles.transform} !important;`
    );
  }

  getWidth(addUnit = false) {
    const width = window.innerWidth < Styles.FULL_WIDTH_THRESHOLD ? "96%" : Styles.WIDTH + "px";
    return addUnit ? width : width.replace("px", "").replace("%", "");
  }

  getHeight(addUnit = false) {
    let height = "0px";
    height =
      window.innerWidth < Styles.FULL_WIDTH_THRESHOLD
        ? `${Math.floor(window.innerHeight * 0.9)}px`
        : `${IframeModal.height}px`;
    return addUnit ? height : height.replace("px", "").replace("%", "");
  }

  getRight(addUnit = false) {
    const right = window.innerWidth < Styles.FULL_WIDTH_THRESHOLD ? "2%" : "10px";
    return addUnit ? right : right.replace("px", "").replace("%", "");
  }

  getTransform() {
    let transform = "translate3d( 0px 0px 0px)";
    switch (Ext.DISPLAY_MODE[this.window.displayModeKey]) {
      case Ext.DISPLAY_MODE_ACTIVE:
        const translateY = Styles.BOTTOM + Number(this.getHeight());
        //return `translate3d( 0px, 0px, 0px ) scale( 1 )`;
        return `translate3d( 0px, ${translateY}px, 0px ) scale( 0.8 )`;
      case Ext.DISPLAY_MODE_OPEN:
        return `translate3d( 0px, 0px, 0px ) scale( 1.0 )`;
    }
    return transform;
  }

  getOpacity(addUnit = false) {
    let width = Styles.WIDTH + "px";
    switch (Ext.DISPLAY_MODE[this.window.displayModeKey]) {
      case Ext.DISPLAY_MODE_ACTIVE:
        return 1;
      case Ext.DISPLAY_MODE_OPEN:
        return 1;
    }
    return addUnit ? width : width.replace("px", "").replace("%", "");
  }

  static getModalOpenTransform() {
    return `translate3d(0px, 0px, 0px) scale( 1 )`;
  }

  getModalCloseTransform() {
    const translateY = Number(this.getHeight()) + Number(Iframe.modeModalBottom);
    return `translate3d( 0px, ${translateY}px, 0px )`;
  }

  /********************************/
  /* Accept Communication methods */
  /********************************/

  toggleIframe(params) {
    this.window.updateDisplayMode("toggleIframe");
  }

  tune(state) {
    this.state = state;
    this.updateLiveCnt();
  }

  disconnect(state) {
    this.state = state;
    this.updateLiveCnt();
  }

  updateLiveCnt() {
    const { state, window } = this;
    const { watchCnt } = state.thread;
    const { displayModeKey, ins } = window;
    const { notifStatus } = ins;
    if (Ext.DISPLAY_MODE[displayModeKey] === Ext.DISPLAY_MODE_ACTIVE) {
      notifStatus.updateCnt(watchCnt);
    }
  }

  openNotif(params) {
    const { window } = this;
    switch (Ext.DISPLAY_MODE[window.displayModeKey]) {
      case Ext.DISPLAY_MODE_ACTIVE:
        if (!this.notifedId.includes(params.id)) {
          // notifStatus.updateCnt(params.addUnreadCnt);
          this.notifedId.push(params.id);
        }
        new Notif(this.window, params);
        break;
    }
  }

  closeNotif(params) {}

  linkTo(params) {
    if (params && params.href) {
      window.top.location.href = params.href;
    }
  }

  setInputPost(params) {
    this.inputPost = params.inputPost;
  }

  remove() {
    this.dom.removeEventListener("load", this.load);
    this.dom.remove();
    delete this;
  }

  /*************************/
  /* ANIMATION             */
  /*************************/

  getActiveStyles(called) {
    const width = this.getWidth(true);
    const height = this.getHeight(true);
    const right = this.getRight(true);
    const opacity = this.getOpacity();
    const transform = this.getTransform();
    return {
      transform,
      opacity,
      right,
      width: width,
      height: height,
    };
  }

  getOpenStyles(called) {
    const width = this.getWidth(true);
    const height = this.getHeight(true);
    const right = this.getRight(true);
    const opacity = this.getOpacity();
    const transform = this.getTransform();
    return {
      transform,
      opacity,
      right,
      width: width,
      height: height,
    };
  }

  transitionEnd() {}
}

class IframeBottom extends Iframe {
  static get className() {
    return `.${Ext.APP_NAME}${Iframe.MODE_EMBED}`;
  }
  static getEmbedIframeTags() {
    return window.top.document.querySelectorAll(IframeEmbed.className);
  }

  getStyles(width) {
    const height = IframeModal.getCloseHeight(true);
    return (
      "" +
      `z-index: ${Styles.zIndex} !important;` +
      `overflow: hidden !important;` +
      "display: none !important;" +
      "align-items: flex-end !important;" +
      "position: fixed !important; " +
      "bottom: 0px !important;" +
      "right: 0px !important;" +
      `min-width: ${activeStyles.width} !important;` +
      `width: ${width} !important;` +
      `min-height: ${activeStyles.height} !important;` +
      `height: ${height} !important;` +
      "margin: 0 !important;" +
      "padding: 0 !important;" +
      "transition: 0ms !important;" +
      "transform: translate3d(0px, 0px, 0px) !important;"
    );
  }

  getWidth(addUnit = false) {
    width = window.innerWidth < Styles.FULL_WIDTH_THRESHOLD ? "100%" : Styles.WIDTH;
    return addUnit ? width : width.replace("px", "").replace("%", "");
  }

  getHeight(addUnit = false) {
    height =
      window.innerWidth < Styles.FULL_WIDTH_THRESHOLD
        ? `${Math.floor(window.innerHeight * 0.9)}px`
        : IframeModal.getCloseHeight(true);
    return addUnit ? height : height.replace("px", "").replace("%", "");
  }

  getRight(addUnit = false) {
    let right = "0px";
    return addUnit ? right : right.replace("px", "").replace("%", "");
  }

  getTransform() {
    let transform = "translate3d( 0px 0px 0px)";
    switch (Ext.DISPLAY_MODE[this.window.displayModeKey]) {
      case Ext.DISPLAY_MODE_ACTIVE:
        const translateY = Styles.BOTTOM + Number(this.getHeight());
        //return `translate3d( 0px, 0px, 0px ) scale( 1 )`;
        return `translate3d( 0px, ${translateY}px, 0px ) scale( 0.8 )`;
      case Ext.DISPLAY_MODE_OPEN:
        return `translate3d( 0px, 0px, 0px ) scale( 1.0 )`;
    }
    return transform;
  }

  getOpacity(addUnit = false) {
    let width = Styles.WIDTH + "px";
    width = window.innerWidth < Styles.FULL_WIDTH_THRESHOLD ? "100%" : width;
    return addUnit ? width : width.replace("px", "").replace("%", "");
  }
}

class IframeEmbed extends Iframe {
  static get className() {
    return `.${Ext.APP_NAME}${Iframe.MODE_EMBED}`;
  }
  static getEmbedIframeTags() {
    return window.top.document.querySelectorAll(IframeEmbed.className);
  }

  getStyles(width) {
    return (
      "" +
      `z-index: ${Styles.zIndex} !important;` +
      `overflow: hidden !important;` +
      "display: none !important;" +
      "align-items: flex-end !important;" +
      "position: absolute !important; " +
      "bottom: 0px !important;" +
      "right: 0px !important;" +
      `width: 100% !important;` +
      `min-width: 100% !important;` +
      `max-width: 100% !important;` +
      `height: 100% !important;` +
      `min-height: 100% !important;` +
      `max-height: 100% !important;` +
      "margin: 0 !important;" +
      "padding: 0 !important;" +
      `clip-path: inset(0px round 10px) !important;` +
      `-webkit-clip-path: inset(0px round 10px) !important;` +
      "transition: 0ms !important;" +
      "transform: translate3d(0px, 0px, 0px) !important;"
    );
  }

  getWidth(addUnit = false) {
    let width = Styles.WIDTH;
    const talknTag = document.querySelector(this.window.includeId);
    width = talknTag ? talknTag.clientWidth : "100%";
    return addUnit ? width + "px" : width;
  }

  getHeight(addUnit = false) {
    let height = "0px";
    const talknTag = document.querySelector(this.window.includeId);
    height = talknTag ? talknTag.clientHeight : "100%";
    return addUnit ? height + "px" : height;
  }

  getRight(addUnit = false) {
    let right = 0;
    return addUnit ? right : right.replace("px", "").replace("%", "");
  }

  getTransform() {
    return "translate3d( 0px 0px 0px)";
  }

  getOpacity(addUnit = false) {
    let width = Styles.WIDTH + "px";
    const talknTag = document.querySelector(this.window.includeId);
    width = talknTag ? talknTag.clientWidth : "100%";
    return addUnit ? width + "px" : width;
  }
}

class IframeWindow extends Iframe {
  static get className() {
    return `.${Ext.APP_NAME}${Iframe.MODE_EMBED}`;
  }
  static getEmbedIframeTags() {
    return window.top.document.querySelectorAll(IframeEmbed.className);
  }
}

class HandleIcon extends ReactMode {
  static get id() {
    return `${Ext.APP_NAME}${this.name}`;
  }
  static get width() {
    return 62;
  }
  static get right() {
    return 5;
  }
  constructor(_window) {
    super(_window);

    if (this.window.userDefineMode !== Iframe.MODE_EMBED) {
      let handleIcon = document.createElement("div");
      handleIcon.id = HandleIcon.id;
      handleIcon.className = Window.className;
      handleIcon.style = this.getStyle();
      // handleIcon.src = '//assets.localhost/airplane.svg';
      this.click = this.click.bind(this);
      this.mouseover = this.mouseover.bind(this);
      this.mouseout = this.mouseout.bind(this);

      handleIcon.addEventListener("click", this.click);
      handleIcon.addEventListener("mouseover", this.mouseover);
      handleIcon.addEventListener("mouseout", this.mouseout);

      window.top.document.body.appendChild(handleIcon);
    }
  }

  /*************************/
  /* UI DATAS              */
  /*************************/

  get() {
    return document.querySelector(`#${HandleIcon.id}`);
  }

  getStyle() {
    const talknHandleStyles = this.getActiveStyles();
    return (
      "" +
      `position: fixed !important;` +
      `bottom: ${talknHandleStyles.bottom} !important;` +
      `right: ${HandleIcon.right}px !important;` +
      `cursor: pointer !important;` +
      `display: flex !important;` +
      `align-items: center !important;` +
      `justify-content: center !important;` +
      `z-index: ${Styles.zIndex} !important;` +
      `width: ${HandleIcon.width}px  !important;` +
      `height: ${HandleIcon.width}px !important;` +
      `background: ${talknHandleStyles.background} !important;` +
      `border-radius: 100px !important;` +
      `box-shadow: ${Styles.BASE_SHADOW}` +
      `transition: ${Styles.BASE_TRANSITION}ms !important;` +
      `transform: ${talknHandleStyles.transform} !important;`
    );
  }

  drawCanvas(handle) {
    const rgba = "rgba( 180, 180, 180, 0.7 )";
    const c = handle.getContext("2d");
    const hoseiX = -5;
    const hoseiY = 0;
    c.beginPath();

    // 横 縦
    c.moveTo(50 + hoseiX, 60 + hoseiY);
    c.lineTo(230 + hoseiX, 40 + hoseiY);
    c.lineTo(140 + hoseiX, 80 + hoseiY);
    c.closePath();
    c.strokeStyle = rgba;
    c.stroke();
    c.fillStyle = rgba;
    c.fill();
    c.closePath();

    c.beginPath();
    c.moveTo(231 + hoseiX, 40 + hoseiY);
    c.lineTo(150 + hoseiX, 83 + hoseiY);
    c.lineTo(240 + hoseiX, 100 + hoseiY);
    c.closePath();
    c.strokeStyle = rgba;
    c.stroke();
    c.fillStyle = rgba;
    c.fill();
    c.closePath();

    c.beginPath();
    c.moveTo(125 + hoseiX, 80 + hoseiY);
    c.lineTo(170 + hoseiX, 90 + hoseiY);
    c.lineTo(130 + hoseiX, 105 + hoseiY);

    c.closePath();
    c.strokeStyle = rgba;
    c.stroke();
    c.fillStyle = rgba;
    c.fill();
    c.closePath();
    return handle;
  }

  /*************************/
  /* EVENT LISTENER        */
  /*************************/

  click() {
    const { thread } = this.window.ins.iframe.state;
    if (!thread || !thread.watchCnt) return false;
    const { notifStatus } = this.window.ins;
    switch (this.window.userDefineMode) {
      case Iframe.MODE_BOTTOM:
      case Iframe.MODE_MODAL:
        const regex = /^\s*$/;
        switch (Ext.DISPLAY_MODE[this.window.displayModeKey]) {
          case Ext.DISPLAY_MODE_ACTIVE:
            notifStatus.updateCnt(thread.watchCnt);
            this.window.updateDisplayMode("clickHandleIcon");
            break;
          case Ext.DISPLAY_MODE_OPEN:
            const { inputPost } = this.window;
            if (inputPost && inputPost !== "" && !regex.test(inputPost)) {
              const inputCurrentTime = Window.getCurrentTime(this.window.handleMediaCurrentTime);
              this.window.apiTo("talknModal", "post", { app: { inputPost, inputCurrentTime } });
              this.window.clientTo("ON_CHANGE_INPUT_POST", { ui: { inputPost: "" } });
            } else {
              this.window.updateDisplayMode("clickHandleIcon");
            }
            break;
        }
        break;
    }
  }

  mouseover() {
    const handleIcon = this.get();
    const translates = handleIcon.style.transform.split("translate3d(")[1].split(") ")[0];
    handleIcon.style.transform = `translate3d(${translates}) scale(1.1)`;
  }

  mouseout() {
    const handleIcon = this.get();
    const translates = handleIcon.style.transform.split("translate3d(")[1].split(") ")[0];
    handleIcon.style.transform = `translate3d(${translates}) scale(1.0)`;
  }

  remove() {
    const elm = this.get();
    elm.remove();
    delete this;
  }

  /*************************/
  /* ANIMATION             */
  /*************************/

  getActiveStyles(called) {
    switch (this.window.userDefineMode) {
      case Iframe.MODE_MODAL:
        return {
          bottom: "10px",
          boxShadow: "rgb(200, 200, 200) 0px 0px 10px 0px",
          transform: `translate3d(0px, 0px, 0px) scale( 0.95 )`,
          background: `#fff url("https:${Ext.APP_ASSETS_HOST}/airplane.svg") -1px 1px / 64px no-repeat`,
          border: Styles.BASE_UNACTIVE_BORDER,
        };
      case Iframe.MODE_BOTTOM:
        return {
          bottom: "0px",
          boxShadow: "rgb(200, 200, 200) 0px 0px 10px 0px",
          background: `#fff url("https:${Ext.APP_ASSETS_HOST}/airplane.svg") -1px 1px / 64px no-repeat`,
          border: Styles.BASE_UNACTIVE_BORDER,
        };
    }
  }

  getOpenStyles(called) {
    switch (this.window.userDefineMode) {
      case Iframe.MODE_MODAL:
        return {
          boxShadow: "rgb(200, 200, 200) 0px 0px 0px 0px",
          transform: `translate3d(0px, -25px, 0px) scale( 1 )`,
          background: Styles.BASE_ACTIVE_BG_COLOR,
          border: Styles.BASE_ACTIVE_BORDER,
        };
      case Iframe.MODE_BOTTOM:
        return {
          boxShadow: "rgb(200, 200, 200) 0px 0px 0px 0px",
          transform: `translate3d(0px, 0px, 0px) scale( 0.95 )`,
          background: Styles.BASE_ACTIVE_BG_COLOR,
          border: Styles.BASE_ACTIVE_BORDER,
        };
    }
  }

  transitionEnd() {}
}

class LiveCnt extends ReactMode {
  static get id() {
    return `${Ext.APP_NAME}${this.name}`;
  }
  constructor(_window, params) {
    super(_window);

    const id = LiveCnt.id;
    const notifStatus = document.createElement("div");
    const width = "24px";
    const height = "24px";
    const openStyles = this.getOpenStyles();

    this.getActiveStyles = this.getActiveStyles.bind(this);
    this.getOpenStyles = this.getOpenStyles.bind(this);
    this.updateCnt = this.updateCnt.bind(this);

    notifStatus.id = id;
    notifStatus.className = Window.className;
    notifStatus.innerText = 0;
    notifStatus.style =
      "" +
      `position: fixed !important;` +
      `bottom: 15px !important;` +
      `right: 5px !important;` +
      `display: flex !important;` +
      `align-items: center !important;` +
      `justify-content: center !important;` +
      `cursor: pointer !important;` +
      `z-index: ${Styles.zIndex} !important;` +
      `width: 24px !important;` +
      `min-width: ${width} !important;` +
      `max-width: ${width} !important;` +
      `height: ${height} !important;` +
      `min-height: ${height} !important;` +
      `max-height: ${height} !important;` +
      `padding: 0px !important;` +
      `opacity: 1 !important;` +
      `font-size: 9px !important;` +
      `font-family: "Myriad Set Pro", "Lucida Grande", "Helvetica Neue", Helvetica, Arial, Verdana, sans-serif !important;` +
      `color: rgb(255,255,255) !important;` +
      `background: rgba( 79, 174, 159, 0.6 ) !important;` +
      `border-radius: 100px !important;` +
      `transition: ${Styles.BASE_TRANSITION}ms !important;` +
      `transform: ${openStyles.transform} !important;`;
    window.top.document.body.appendChild(notifStatus);
  }

  get() {
    return document.querySelector(`#${LiveCnt.id}`);
  }

  remove() {
    const elm = this.get();
    elm.remove();
    delete this;
  }

  updateCnt(cnt) {
    const statusNotif = this.get();
    const updatedCnt = Number(cnt);

    if (updatedCnt > 0) {
      statusNotif.innerHTML = updatedCnt;
      const activeStyles = this.getActiveStyles("updateCnt");
      statusNotif.style.transform = activeStyles.transform;
    } else {
      this.reset();
    }
  }

  getActiveStyles(called) {
    const statusNotif = this.get();
    const baseCnt = Number(statusNotif.innerText);
    if (baseCnt > 0) {
      return {
        transform: "scale(1.0)",
      };
    } else {
      return {
        transform: "scale(0.0)",
      };
    }
  }

  getOpenStyles(called) {
    return {
      transform: "scale(0.0)",
    };
  }
}

class Notif extends ReactMode {
  static get id() {
    return `${Ext.APP_NAME}${this.name}`;
  }
  constructor(_window, params) {
    super(_window);
    this.getWidth = this.getWidth.bind(this);
    this.getHeight = this.getHeight.bind(this);
    this.getBottom = this.getBottom.bind(this);
    this.getRight = this.getRight.bind(this);
    this.getTranslateY = this.getTranslateY.bind(this);
    this.getBorderRadius = this.getBorderRadius.bind(this);

    const notif = document.createElement("div");
    const id = Notif.id + params.id;
    const width = this.getWidth(true);
    const height = this.getHeight(true);
    const padding = this.getPadding(true);
    const bottom = this.getBottom(true);
    const right = this.getRight(true);
    const translateY = this.getTranslateY(true);
    const borderRadius = this.getBorderRadius();

    notif.setAttribute("id", id);
    notif.setAttribute("className", Window.className);
    notif.setAttribute("name", "notif");
    notif.setAttribute(
      "style",
      `position: fixed !important;` +
        `bottom: ${bottom} !important;` +
        `right: ${right} !important;` +
        `display: flex !important;` +
        `align-items: center !important;` +
        `cursor: pointer !important;` +
        `justify-content: flex-start;` +
        `z-index: ${Styles.zIndex - 2} !important;` +
        `width: ${width} !important;` +
        `min-width: ${width} !important;` +
        `max-width: ${width} !important;` +
        `height: ${height} !important;` +
        `min-height: ${height} !important;` +
        `max-height: ${height} !important;` +
        `padding: 0px 20px 0px 10px!important;` +
        `opacity: 0 !important;` +
        `background: ${Styles.BASE_UNACTIVE_BG_COLOR}` +
        `border-radius: ${borderRadius} !important;` +
        `box-shadow: ${Styles.BASE_SHADOW}` +
        `color: rgba( 120, 120, 120, 0.9) !important;` +
        `transition: ${Styles.BASE_TRANSITION}ms !important;` +
        `transform: translate3d( 0px, 0px, 0px ) !important;`
    );

    const notifIcon = document.createElement("div");
    notifIcon.setAttribute(
      "style",
      "display: flex;" +
        "align-items: center;" +
        "justify-content: flex-start;" +
        `background-image: url(${params.favicon});` +
        "background-position: 50% 50%;" +
        "background-size: 20px 20px;" +
        "background-repeat: no-repeat;" +
        "width: 20% !important;" +
        "min-width: 20% !important;" +
        "max-width: 20% !important;" +
        "height: inherit !important;" +
        "min-height: inherit !important;" +
        "max-height: inherit !important;"
    );

    const notifPost = document.createElement("div");
    notifPost.setAttribute(
      "style",
      `font-family: "Myriad Set Pro", "Lucida Grande", "Helvetica Neue", Helvetica, Arial, Verdana, sans-serif !important;` +
        "overflow: hidden !important;" +
        "display: flex !important;" +
        "justify-content: flex-start !important;" +
        "align-items: center !important;" +
        "width: 80% !important;" +
        "min-width: 80% !important;" +
        "max-width: 80% !important;" +
        "height: inherit !important;" +
        "min-height: inherit !important;" +
        "max-height: inherit !important;" +
        "white-space: nowrap !important;" +
        "font-size: 13px !important;" +
        "line-height: 27px;" +
        "text-indent: 10px;"
    );

    notifPost.innerText = this.convertEmojiStamp(params);
    notif.appendChild(notifIcon);
    notif.appendChild(notifPost);

    notif.addEventListener("click", () => {
      switch (this.window.userDefineMode) {
        case Iframe.MODE_BOTTOM:
        case Iframe.MODE_MODAL:
          switch (Ext.DISPLAY_MODE[this.window.displayModeKey]) {
            case Ext.DISPLAY_MODE_ACTIVE:
              this.window.updateDisplayMode("clickNotif");
              break;
            case Ext.DISPLAY_MODE_OPEN:
              break;
          }
        case Iframe.MODE_EMBED:
          break;
      }
    });

    notif.addEventListener("mouseover", () => {
      const translates = notif.style.transform.split("translate3d(")[1].split(") ")[0];
      notif.style.transform = `translate3d(${translates}) scale(1.05)`;
    });

    notif.addEventListener("mouseout", () => {
      const translates = notif.style.transform.split("translate3d(")[1].split(") ")[0];
      notif.style.transform = `translate3d(${translates}) scale(1.0)`;
    });

    window.top.document.body.appendChild(notif);

    const debugRate = 1;
    setTimeout(() => {
      notif.style.opacity = 1;
      notif.style.transform = `translate3d(0px, ${translateY}, 0px) scale(1.0)`;
      setTimeout(() => {
        notif.style.opacity = 0;
        notif.style.transform = `translate3d(0px, 0px, 0px) scale(1.0)`;
        setTimeout(() => {
          const removeNotif = document.getElementById(id);
          document.body.removeChild(removeNotif);
        }, 1000 * debugRate);
      }, 2100 * debugRate);
    }, 50);
  }

  convertEmojiStamp({ post, stampId }) {
    if (stampId) {
      return post + " (STAMP)";
    }
    return post;
  }

  getWidth(addUnit = false) {
    let width = 0;
    switch (this.window.userDefineMode) {
      case Iframe.MODE_MODAL:
        switch (Ext.DISPLAY_MODE[this.window.displayModeKey]) {
          case Ext.DISPLAY_MODE_ACTIVE:
            width = window.innerWidth < Styles.FULL_WIDTH_THRESHOLD ? "calc( 100% - 130px )" : "180px";
            break;
          case Ext.DISPLAY_MODE_OPEN:
            break;
        }
      case Iframe.MODE_BOTTOM:
      case Iframe.MODE_EMBED:
        break;
    }
    return addUnit ? width : width.replace("px", "").replace("%", "");
  }

  getHeight(addUnit = false) {
    let height = "44px";
    return addUnit ? height : height.replace("px", "").replace("%", "");
  }

  getPadding(addUnit = false) {
    let padding = "0px";
    switch (this.window.userDefineMode) {
      case Iframe.MODE_MODAL:
        switch (Ext.DISPLAY_MODE[this.window.displayModeKey]) {
          case Ext.DISPLAY_MODE_ACTIVE:
            padding = "10px 20px 10px 10px";
            break;
          case Ext.DISPLAY_MODE_OPEN:
            break;
        }
      case Iframe.MODE_BOTTOM:
      case Iframe.MODE_EMBED:
        break;
    }
    return addUnit ? padding : padding.replace("px", "").replace("%", "");
  }

  getBottom(addUnit = false) {
    let bottom = "0px";
    switch (this.window.userDefineMode) {
      case Iframe.MODE_MODAL:
        switch (Ext.DISPLAY_MODE[this.window.displayModeKey]) {
          case Ext.DISPLAY_MODE_ACTIVE:
            bottom = "0px";
            break;
          case Ext.DISPLAY_MODE_OPEN:
            break;
        }
      case Iframe.MODE_BOTTOM:
      case Iframe.MODE_EMBED:
        break;
    }
    return addUnit ? bottom : bottom.replace("px", "").replace("%", "");
  }

  getRight(addUnit = false) {
    let right = "75px";
    switch (this.window.userDefineMode) {
      case Iframe.MODE_MODAL:
        switch (Ext.DISPLAY_MODE[this.window.displayModeKey]) {
          case Ext.DISPLAY_MODE_ACTIVE:
            right = "75px";
            break;
          case Ext.DISPLAY_MODE_OPEN:
            break;
        }
      case Iframe.MODE_BOTTOM:
      case Iframe.MODE_EMBED:
        break;
    }
    return addUnit ? right : right.replace("px", "").replace("%", "");
  }

  getTranslateY(addUnit = false) {
    let transformY = `-19px`;
    switch (this.window.userDefineMode) {
      case Iframe.MODE_MODAL:
        switch (Ext.DISPLAY_MODE[this.window.displayModeKey]) {
          case Ext.DISPLAY_MODE_ACTIVE:
            transformY = "-19px";
            break;
          case Ext.DISPLAY_MODE_OPEN:
            break;
        }
      case Iframe.MODE_BOTTOM:
      case Iframe.MODE_EMBED:
        break;
    }
    return addUnit ? transformY : transformY.replace("px", "").replace("%", "");
  }

  getBorderRadius() {
    let borderRadius = `3px`;
    return borderRadius;
  }
}

class EmbedIframe extends ReactMode {}

const talknExtension = document.querySelector("iframe#talknExtension");

// 多重起動防止
// ChromeExtとExt両方起動の場合はChromeExtが起動する
if (!talknExtension) {
  new Window();
}
