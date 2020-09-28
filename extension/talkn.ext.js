window.TALKN_EXT_ENV = "PROD";
/*
  Reasons for plain js:
  Obfuscated or bundled js is rejected by Chrome Extension examination.
  
  Class
    Ext
    BootOption
    ReactMode
      Window
      MediaServer
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

class MediaServer {
  get mediaSecondInterval() {
    return 200;
  }
  get currentTime() {
    return this.file ? Math.floor(this.file.currentTime * 10) / 10 : 0;
  }
  static get STATUS_SEARCH() {
    return "SEARCH";
  }
  static get STATUS_STANBY() {
    return "STANBY";
  }
  static get STATUS_PLAY() {
    return "PLAY";
  }
  static get STATUS_ENDED() {
    return "ENDED";
  }
  static get STATUS_STOP() {
    return "STOP";
  }
  static get PORTAL_KEY() {
    return "PORTAL";
  }
  static get EXTENSION_KEY() {
    return "EXTENSION";
  }
  constructor() {
    // postMessage to iframe ids.
    this.init = this.init.bind(this);
    this.onError = this.onError.bind(this);
    this.onMessage = this.onMessage.bind(this);
    this.postMessage = this.postMessage.bind(this);

    // methods.
    this.setClientParams = this.setClientParams.bind(this);
    this.setRelationElms = this.setRelationElms.bind(this);
    this.searching = this.searching.bind(this);
    this.handleEvents = this.handleEvents.bind(this);
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.ended = this.ended.bind(this);
    this.log = this.log.bind(this);

    this.init();
    this.setRelationElms();
    this.listenMessage();
  }

  listenMessage() {
    window.addEventListener("message", this.onMessage);
    window.addEventListener("messageerror", this.onError);
  }

  setStatus(status, called) {
    this.status = status;
    this.log("SET STATUS ", called);
  }

  init() {
    this.ch = null;
    this.status = MediaServer.STATUS_STANBY;
    // controls.
    this.iframes = {};
    this.audios = [];
    this.videos = [];
    this.handleEventSrc = [];
    this.file = null;
    this.searchingIds = {};
    this.maxSearchingCnt = 30;
    this.playIntervalId = null;
    this.searchingCnt = 0;
    this.isLog = false;

    window.removeEventListener("message", this.onMessage);
    window.removeEventListener("messageerror", this.onError);

    Object.keys(this.searchingIds).forEach((iFrameId) => {
      clearInterval(this.searchingIds[iFrameId]);
    });
    clearInterval(this.playIntervalId);
  }

  setRelationElms(id) {
    if (Object.keys(this.iframes).length === 0) {
      if (id === MediaServer.PORTAL_KEY || id === MediaServer.EXTENSION_KEY) {
        this.iframes[id] = {
          dom: window,
          params: {
            id: "",
            ch: "",
            href: "",
            audios: [],
            videos: [],
          },
        };
      } else {
        const iframes = window.document.querySelectorAll(`.talknIframes`);
        iframes.forEach((iframe) => {
          if (iframe.id) {
            this.iframes[iframe.id] = {
              dom: iframe,
              params: {
                id: "",
                ch: "",
                href: "",
                audios: [],
                videos: [],
              },
            };
          } else {
            throw `Error: Please set iframe id.`;
          }
        });
      }
    }

    if (this.videos.length === 0) {
      this.videos = window.document.querySelectorAll("video");
    }
    if (this.audios.length === 0) {
      this.audios = window.document.querySelectorAll("audio");
    }
  }

  setClientParams(params) {
    if (params && params.id) {
      this.iframes[params.id].params = params;
    }
  }

  onMessage(e) {
    if (e.data && e.data.type) {
      if (e.data.type === "MEDIA_CLIENT_TO_MEDIA_SERVER_TYPE") {
        const { method, params } = e.data;
        if (this.file && this.file[method] && typeof this.file[method] === "function") {
          this.file[method]();
        } else {
          if (this[method] && typeof this[method] === "function") {
            this.setRelationElms(params.id);
            this.setClientParams(params);
            this[method](params.id);
          }
        }
      }
    }
  }

  onError(e) {
    console.warn(e);
  }

  postMessage() {
    Object.keys(this.iframes).forEach((iFrameId) => {
      const iframe = this.iframes[iFrameId].dom;
      const href = this.iframes[iFrameId].params.href;
      const type = "MEDIA_SERVER_TO_MEDIA_CLIENT_TYPE";
      const params = {
        ch: this.ch,
        status: this.status.toLowerCase(),
        currentTime: this.currentTime,
      };
      const content = iFrameId === MediaServer.PORTAL_KEY ? window : iframe.contentWindow;
      content.postMessage({ type, params }, href);
    });
  }

  searching(iFrameId) {
    if (!iFrameId) return false;
    this.setStatus(MediaServer.STATUS_SEARCH, `start searching ${iFrameId}`);
    this.searchingCnt = 0;
    this.searchingId = null;
    this.playIntervalId = null;
    const handleEventsWrap = (mediaType) => {
      let isHandle = false;

      this[mediaType].forEach((media) => {
        if (isHandle) return;
        this.iframes[iFrameId].params[mediaType].forEach((iframeMedia) => {
          if (isHandle) return;
          if (media.src.indexOf(iframeMedia.src) >= 0) {
            if (!this.handleEventSrc.includes(media.src)) {
              this.handleEventSrc.push(media.src);
              this.handleEvents(media);
              isHandle = true;
            }
          }
        });
      });
      return isHandle;
    };

    this.searchingIds[iFrameId] = setInterval(() => {
      this.setRelationElms(iFrameId);
      const iframeHasAudio = Boolean(this.iframes[iFrameId].params.audios.length);
      const iframeHasVideo = Boolean(this.iframes[iFrameId].params.videos.length);
      let isHandleEvents = false;

      if (this.searchingCnt < this.maxSearchingCnt) {
        if (this.videos.length > 0 && iframeHasVideo) {
          isHandleEvents = handleEventsWrap("videos");
          if (isHandleEvents) {
            this.setStatus(MediaServer.STATUS_STANBY, `searched video ${iFrameId}`);
          }
        }

        if (this.audios.length > 0 && iframeHasAudio) {
          isHandleEvents = handleEventsWrap("audios");
          if (isHandleEvents) {
            this.setStatus(MediaServer.STATUS_STANBY, `searched audio ${iFrameId}`);
          }
        }
      } else {
        clearInterval(this.searchingIds[iFrameId]);
        this.setStatus(MediaServer.STATUS_ENDED, `search to ended ${iFrameId}`);
      }
      this.searchingCnt++;
    }, MediaServer.mediaSecondInterval);
  }

  handleEvents(media) {
    media.addEventListener("play", this.play);
    media.addEventListener("pause", this.pause);
    media.addEventListener("ended", this.ended);
  }

  play(e) {
    this.file = e.srcElement;
    this.ch = this.file.currentSrc.replace("http:/", "").replace("https:/", "") + "/";
    this.setStatus(MediaServer.STATUS_PLAY, "play");
    this.playIntervalId = setInterval(() => {
      this.postMessage();
    }, this.mediaSecondInterval);
  }

  pause(e) {
    if (this.status !== MediaServer.STATUS_STANBY) {
      this.setStatus(MediaServer.STATUS_STANBY, "pause");
      clearInterval(this.playIntervalId);
      this.postMessage();
    }
  }

  ended(e) {
    this.setStatus(MediaServer.STATUS_ENDED, "ended");
    clearInterval(this.playIntervalId);
    this.postMessage();
    Object.keys(this.searchingIds).forEach((iFrameId) => {
      clearInterval(this.searchingIds[iFrameId]);
    });
  }

  log(label, called) {
    if (this.isLog) {
      console.log(`@@@@@@@@@@@ ${label} ${this.status} [${called}] ch: ${this.ch} time: ${this.pointerTime} @@@`);
    }
  }
}

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
  static get BASE_ASSETS_SUBDOMAIN() {
    return "assets";
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
  static get IS_DEVELOPMENT_MODE() {
    return (location.hash === Ext.DEVELOPMENT_HASH) | (location.hash === `${Ext.DEVELOPMENT_HASH}/`);
  }
  static get INCLUDE_ID() {
    return `#${Ext.APP_NAME}`;
  }
  static get APP_HOST() {
    if (Ext.IS_DEVELOPMENT_MODE) {
      return `//${Ext.BASE_DEV_HOST}`;
    }
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
  static get APP_ENDPOINT() {
    const port = Ext.IS_DEVELOPMENT_MODE ? ":8080" : "";
    return `https:${Ext.APP_HOST}${port}`;
  }
  static get() {
    const script1 = document.querySelector(`script[src='${Ext.APP_EXT_HOST}']`);
    const script2 = document.querySelector(`script[src='https:${Ext.APP_EXT_HOST}']`);
    // if (!script1 && !script2) throw "NO EXIST EXT SCRIPT TAG";
    return script1 || script2;
  }
  static isBrowserExt() {
    return Ext.get() === null;
  }
  static getUserDefineMode(options) {
    /********************************/
    /*  OPTION BOOT ( browser ext ) */
    /********************************/

    let mode = Ext.USER_DEFINE_MODE_DEFAULT;
    let embedTags = IframeEmbed.getAll();
    const embedTagCnt = embedTags.length;

    if (options && options.mode) {
      if ("EXT_" + options.mode === Ext.USER_DEFINE_MODE_MODAL) {
        return Ext.USER_DEFINE_MODE_MODAL;
      }
      if ("EXT_" + options.mode === Ext.USER_DEFINE_MODE_EMBED && options.selector) {
        embedTags = window.document.querySelector(options.selector);
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

    /********************************/
    /*  NORMAL                      */
    /********************************/

    const scriptTag = Ext.get();

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

  static getApiToRequestObj(iFrameId, method, params = {}) {
    return {
      iFrameId,
      type: "EXT_TO_API_TYPE",
      method: method,
      params: params,
      href: window.location.href,
    };
  }
  static throw(message, warns = []) {
    warns.forEach((warn) => console.warn(warn));
    throw `Error: ${message}`;
  }
}

class BootOption {
  constructor(id, href) {
    this.id = id;
    this.ch = href ? this.getCh(href) : location.href;
    this.hasSlash = this.ch.endsWith("/");
    this.protocol = this.getProtocol(href);
    this.host = this.getHost(this.ch);
  }
  getCh(ch) {
    ch = ch.replace("https:/", "").replace("http:/", "");
    ch = ch.replace(`${Ext.DEVELOPMENT_HASH}/`, "").replace(Ext.DEVELOPMENT_HASH, "");
    return ch.endsWith("/") ? ch : ch + "/";
  }
  getProtocol(href) {
    if (href.startsWith("https:")) return "https:";
    if (href.startsWith("http:")) return "http:";
    return "talkn:";
  }
  getHost(ch) {
    return ch.split("/")[1];
  }
}

class ReactMode {
  get name() {
    return this.constructor.name;
  }
  constructor(_window) {
    this.window = _window;
    this.validAction = this.validAction.bind(this);
    this.action = this.action.bind(this);
  }
  action(called, dispMode) {
    const result = this.validAction(called, dispMode);
    if (result.success) {
      const styles = this[`get${dispMode}Styles`](called);
      Object.keys(styles).forEach((key) => {
        this.dom.style[key] = styles[key];
      });
    } else {
      Ext.throw(result.errorMessage, result.warns);
    }
  }
  validAction(called, dispMode) {
    let result = { success: false, errorMessage: "", warns: [] };
    if (this.dom === undefined) {
      result.errorMessage = `Undefined dom ${this.name}, called ${called} #1`;
      return result;
    }
    if (this[`get${dispMode}Styles`] === undefined) {
      result.errorMessage = `Undefined ${this.name}.get${dispMode}Styles, called ${called} #2`;
      result.warns = [this[`get${dispMode}Styles`]];
      return result;
    }

    const styles = this[`get${dispMode}Styles`](called);
    if (typeof styles !== "object") {
      result.errorMessage = `Undefined Styles, ${this.name}.get${dispMode}Styles, called ${called} #3`;
      result.warns = [styles, this[`get${dispMode}Styles`]];
      return result;
    }
    result.success = true;
    return result;
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
  static get selectTop() {
    return window;
    //    return window.top;
  }
  static get selectDoc() {
    return Window.selectTop.document;
  }
  static get selectHead() {
    return Window.selectDoc.head;
  }
  static get selectBody() {
    return Window.selectDoc.body;
  }
  static select(selector) {
    return Window.selectDoc.querySelector(selector);
  }
  static selectAll(selector) {
    return Window.selectDoc.querySelectorAll(selector);
  }
  static selectId(id) {
    return Window.selectDoc.getElementById(id);
  }
  static selectClass(className) {
    return Window.selectDoc.getElementsByClassName(className);
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
    this.dom = window;
    this.refusedFrame = refusedFrame;
    this.isBrowserExt = Ext.isBrowserExt();
    this.href = Window.selectDoc.location.href;
    const bootFlg = Ext.EXCLUSION_ORIGINS.every((origin) => this.href.indexOf(origin) === -1);

    if (bootFlg) {
      let init = (option = {}) => {
        // Variable
        this.embedIframeTags = IframeEmbed.getAll();
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
        this.mediaServerTo = this.mediaServerTo.bind(this);

        this.updateDisplayMode = this.updateDisplayMode.bind(this);
        this.transformDisplayMode = this.transformDisplayMode.bind(this);

        // Communicarion Methods.
        this.catchMessage = this.catchMessage.bind(this);
        this.getCatchMessageProccess = this.getCatchMessageProccess.bind(this);

        window.addEventListener("message", this.catchMessage);
        window.addEventListener("load", this.load);
        window.addEventListener("resize", this.resize);
        window.addEventListener("scroll", this.scroll);
        window.addEventListener("transitionend", this.transitionend);

        // media server.
        this.mediaServer = new MediaServer();

        // dom instance.
        this.ins.window = this;
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
            let href = embedtag.getAttribute("ch") ? embedtag.getAttribute("ch") : window.location.href;
            href = href ? href : Window.selectTop.location.href;
            const bootOption = new BootOption(embedtag.id, href);
            const embedIframe = new IframeEmbed(this, embedtag, bootOption);
            this.ins.iframes[embedtag.id] = embedIframe;
          });
        }

        switch (this.userDefineMode) {
          case Iframe.MODE_MODAL:
            this.ins.iframe = new IframeModal(this);
            this.ins.iframes[`${Iframe.MODE_MODAL}`] = this.ins.iframe;
            break;
          case Iframe.MODE_BOTTOM:
            this.ins.iframe = new IframeBottom(this);
            this.ins.iframes[`${Iframe.MODE_BOTTOM}`] = this.ins.iframe;
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
  /* Media Server          */
  /* Communication methods */
  /*************************/

  mediaServerTo(method, params) {
    window.postMessage({ ...params, method, type: "EXT_TO_MEDIA_TYPE" });
  }

  /*************************/
  /* Child Window          */
  /* Communication methods */
  /*************************/

  // From child window message.
  catchMessage(e) {
    const { iframes } = this.ins;
    const { id: iFrameId, type, method, params } = e.data;

    switch (type) {
      case "CLIENT_TO_EXT_TYPE":
        const proccess = this.getCatchMessageProccess(iFrameId, method);
        if (proccess.exeMethod) {
          const iframe = iframes[iFrameId];
          iframe[method](params);
          clearTimeout(iframe.methodIdMap[method]);
          delete iframe.methodIdMap[method];
        } else {
          if (proccess.error !== "") {
            throw proccess.error;
          }
        }
        break;
      case "API_TO_EXT_TYPE":
        break;
    }
  }

  getCatchMessageProccess(iFrameId, method) {
    const { iframes } = this.ins;
    let proccess = { exeMethod: false, error: "" };
    if (!iframes) {
      proccess.error = "Error: iframes.";
      return proccess;
    }
    if (!iFrameId) {
      proccess.error = `Error: iFrameId ${iFrameId}.`;
      return proccess;
    }

    const iframe = iframes[iFrameId];
    if (!iframe) {
      proccess.error = `Error: No iframes in iFrameId ${iFrameId}.`;
      return proccess;
    }

    if (!iframe.acceptPostMessages.includes(method)) {
      return proccess;
    }

    if (typeof iframe[method] !== "function") {
      proccess.error = `Error: No Exist Accept Method ${method} in iFrameId ${iFrameId}.`;
      return proccess;
    }

    proccess.exeMethod = true;
    return proccess;
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

  transitionend(e) {
    const { body, iframes, handleIcon } = this.ins;

    if (this.transitionEndId === null) {
      this.transitionEndId = setTimeout(() => {
        this.transitionEndId = null;

        this.iframeKeys.forEach((iFrameId) => {
          const iframe = iframes[iFrameId];
          const clientToParams = {
            ui: {
              extensionWidth: iframe.dom.clientWidth,
              extensionHeight: iframe.dom.innerHeight,
            },
          };
          iframe.extToClient("UPDATE_EXTENSION", clientToParams);
          iframe.transitionEnd(e);
        });
      }, Styles.BASE_TRANSITION);
    }

    if (body && body.transitionEnd) body.transitionEnd(e);
    if (handleIcon && handleIcon.transitionEnd) handleIcon.transitionEnd(e);
  }

  resized(e) {
    const { iframes } = this.ins;
    this.resizeMethodId = null;

    this.updateDisplayMode("resized", true, {
      displayModeKey: this.displayModeKey,
      displayModeDirection: this.displayModeDirection,
    });

    this.iframeKeys.forEach((iFrameId) => {
      const iframe = iframes[iFrameId];
      const clientToParams = {
        ui: {
          extensionWidth: iframe.dom.clientWidth,
          extensionHeight: iframe.dom.innerHeight,
        },
      };
      iframes[iFrameId].extToClient("UPDATE_EXTENSION", clientToParams);
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
  static get HEIGHT() {
    return 430;
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
    this.dom = document.createElement("style");
    const css = document.createTextNode(``);
    this.dom.type = "text/css";
    this.dom.appendChild(css);
    document.head.appendChild(this.dom);
  }
}

class Body extends ReactMode {
  constructor(_window) {
    super(_window);
    this.dom = Window.selectBody;
    this.locktimeMarginTop = 0;

    if (this.dom && this.dom.style) {
      this.overflow = this.dom.style.overflow;
      this.position = this.dom.style.position;
      this.width = this.dom.style.width;
      this.height = this.dom.style.height;
      this.marginTop = this.dom.style.marginTop;
    } else {
      console.warn(this.dom);
    }
  }

  /*************************/
  /* ANIMATION             */
  /*************************/

  getActiveStyles(called) {
    if (window.innerWidth < Styles.FULL_WIDTH_THRESHOLD) {
      return {
        // overflow: this.overflow,
        position: this.position,
        width: this.width,
        height: this.height,
        marginTop: this.marginTop,
      };
    }
    return {};
  }

  getOpenStyles(called) {
    let styles = {};
    if (window.innerWidth < Styles.FULL_WIDTH_THRESHOLD) {
      // スマホでOPENした際にresizedが実行されるため排他制御
      if (called === "resized") {
        return styles;
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
    return styles;
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
  static get MEDIA_TO_CLIENT_TYPE() {
    return "MEDIA_TO_CLIENT_TYPE";
  }
  static get CLASS_NAME() {
    return "talknIframes";
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
  constructor(_window, root, bootOption, mode) {
    super(_window);

    if (bootOption.id === "") {
      throw `Error: Please set id that iframe root tag ${mode}`;
    }

    // instance bind.
    this.load = this.load.bind(this);
    this.getSrc = this.getSrc.bind(this);
    this.getExtToClientObj = this.getExtToClientObj.bind(this);
    this.extToClient = this.extToClient.bind(this);
    this.getMediaToClientObj = this.getMediaToClientObj.bind(this);
    this.handleClientToError = this.handleClientToError.bind(this);

    // message method bind.
    this.tune = this.tune.bind(this);
    this.changeThread = this.changeThread.bind(this);

    // Communication status.
    this.state = {};
    this.methodIdMap = {};
    this.notifedId = [];

    // Iframe status.
    this.id = bootOption.id;
    this.root = root;
    this.bootOption = bootOption;
    this.mode = mode;
    this.src = this.getSrc();
    this.dom = document.createElement("iframe");
    this.dom.setAttribute("id", this.id);
    this.dom.setAttribute("name", this.id);
    this.dom.setAttribute("class", Iframe.CLASS_NAME);
    this.dom.setAttribute("src", this.src);
    this.dom.setAttribute("frameBorder", 0);
    this.dom.setAttribute("scrolling", "yes");
    this.dom.setAttribute("style", this.getStyles());
    this.dom.addEventListener("load", this.load);
    root.appendChild(this.dom);
  }

  getSrc() {
    if (this.window.refusedFrame) {
      return window.chrome.runtime.getURL(`csp.html?${this.bootOption.ch}`);
    } else {
      return `${Ext.APP_ENDPOINT}${this.bootOption.ch}`;
    }
  }

  getExtToClientObj(method, params = {}, methodBack) {
    return {
      id: this.id,
      type: Iframe.EXT_TO_CLIENT_TYPE,
      method,
      params,
      href: window.location.href,
      methodBack,
    };
  }

  getMediaToClientObj(method, params = {}, methodBack) {
    return {
      id: this.id,
      type: Iframe.MEDIA_TO_CLIENT_TYPE,
      method,
      params,
      href: window.location.href,
      methodBack,
    };
  }

  extToClient(method, params = {}, methodBack) {
    const requestObj = this.getExtToClientObj(method, params, methodBack);
    this.methodIdMap[method] = setTimeout(() => this.handleClientToError(this.id, method), Iframe.activeMethodSecond);
    this.dom.contentWindow.postMessage(requestObj, this.src);
  }

  handleClientToError(iFrameId, method) {
    if (this.methodIdMap[method]) {
      switch (method) {
        case "handleExtAndClient":
          this.remove();
          console.warn("CSP Reboot: " + method);
          new Window(true);
          break;
      }
    }
  }

  load(e) {
    const params = {
      bootOption: this.bootOption,
      ui: {
        iFrameId: this.id,
        extensionMode: this.mode,
        extensionWidth: this.getWidth(false),
        extensionHeight: this.getHeight(false),
      },
    };
    this.extToClient("handleExtAndClient", params);
    this.window.mediaServerTo("handleExtAndMedia", this.bootOption);
  }

  remove() {
    this.dom.removeEventListener("load", this.load);
    this.dom.remove();
    delete this;
  }

  handleExtAndClient(params) {
    this.state = params;
    this.extToClient("ON_TRANSITION");
  }

  tune(state) {
    this.state = state;
  }

  changeThread(state) {
    this.state = state;
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
    this.extToClient("GET_CLIENT_METAS", clientMetas);
  }

  setInputPost(params) {
    this.inputPost = params.inputPost;
  }

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
  static get appendRoot() {
    return Window.selectBody;
  }
  get acceptPostMessages() {
    return [
      "handleExtAndClient",
      "tune",
      "changeThread",
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
  constructor(_window) {
    const extScript = Ext.get();
    let href = extScript ? extScript.getAttribute("ch") : location.href;
    href = href ? href : Window.selectTop.location.href;
    const bootOption = new BootOption(Iframe.MODE_MODAL, href);
    super(_window, IframeModal.appendRoot, bootOption, Iframe.MODE_MODAL);

    // dom.
    this.getWidth = this.getWidth.bind(this);
    this.getHeight = this.getHeight.bind(this);
    this.getRight = this.getRight.bind(this);
    this.getTransform = this.getTransform.bind(this);

    // communication.
    this.handleExtAndClient = this.handleExtAndClient.bind(this);
    this.tune = this.tune.bind(this);
    this.changeThread = this.changeThread.bind(this);
    this.updateLiveCnt = this.updateLiveCnt.bind(this);
    this.openNotif = this.openNotif.bind(this);
    this.closeNotif = this.closeNotif.bind(this);
    this.disconnect = this.disconnect.bind(this);
  }

  /*************************/
  /* CALLBACKS             */
  /*************************/

  remove() {
    super.remove();
    handleIcon.remove();
    notifStatus.remove();
  }

  /*************************/
  /* UI DATAS              */
  /*************************/

  getStyles(width) {
    const activeStyles = this.getActiveStyles();
    return (
      "" +
      `z-index: ${Styles.zIndex - 2} !important;` +
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
    super.tune(state);
    this.updateLiveCnt();
  }

  changeThread(state) {
    super.changeThread(state);
    this.updateLiveCnt();
  }

  disconnect(state) {
    this.state = state;
    this.updateLiveCnt();
  }

  updateLiveCnt() {
    const { state, window } = this;
    const { liveCnt } = state.thread;
    const { ins } = window;
    const { notifStatus } = ins;
    notifStatus.updateCnt(liveCnt);
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
      Window.selectTop.location.href = params.href;
    }
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

  getRight() {
    return 0;
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
  static getAll() {
    return window.document.querySelectorAll(IframeEmbed.className);
  }
  get acceptPostMessages() {
    return [
      "handleExtAndClient",
      "tune",
      "changeThread",
      "toggleIframe",
      "location",
      "disconnect",
      "linkTo",
      "setInputPost",
      "getClientMetas",
    ];
  }
  constructor(_window, appendRoot, bootOption) {
    super(_window, appendRoot, bootOption, Iframe.MODE_EMBED);
    // dom
    this.getWidth = this.getWidth.bind(this);
    this.getHeight = this.getHeight.bind(this);
    this.getRight = this.getRight.bind(this);
    this.getTransform = this.getTransform.bind(this);

    // communication.
    this.tune = this.tune.bind(this);
    this.disconnect = this.disconnect.bind(this);
  }

  disconnect(state) {
    this.state = state;
  }

  getStyles() {
    const { width, height } = getComputedStyle(this.root);
    return (
      "" +
      `z-index: ${Styles.zIndex} !important;` +
      `overflow: hidden !important;` +
      "display: block !important;" +
      "align-items: flex-end !important;" +
      "bottom: 0px !important;" +
      "right: 0px !important;" +
      `width: 100% !important;` +
      `min-width: 280px !important;` +
      `max-width: 100% !important;` +
      `height: 100% !important;` +
      `min-height: 430px !important;` +
      `max-height: 100% !important;` +
      "margin: 0 !important;" +
      "padding: 0 !important;" +
      `clip-path: inset(0px round 10px) !important;` +
      `-webkit-clip-path: inset(0px round 10px) !important;` +
      "transition: 0ms !important;" +
      "transform: translate3d(0px, 0px, 0px) !important;"
    );
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

  getWidth(addUnit = false) {
    return getComputedStyle(this.root).width;
  }

  getHeight(addUnit = false) {
    return getComputedStyle(this.root).height;
  }

  getRight() {
    return 0;
  }

  getTransform() {
    return "translate3d( 0px 0px 0px)";
  }

  getOpacity() {
    return 1;
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
      this.dom = document.createElement("div");
      this.dom.id = HandleIcon.id;
      this.dom.className = Window.className;
      this.dom.style = this.getStyle();
      // handleIcon.src = '//assets.localhost/airplane.svg';
      this.click = this.click.bind(this);
      this.mouseover = this.mouseover.bind(this);
      this.mouseout = this.mouseout.bind(this);

      this.dom.addEventListener("click", this.click);
      this.dom.addEventListener("mouseover", this.mouseover);
      this.dom.addEventListener("mouseout", this.mouseout);
      Window.selectBody.appendChild(this.dom);
    }
  }

  /*************************/
  /* UI DATAS              */
  /*************************/

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
      `z-index: ${Styles.zIndex - 1} !important;` +
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
    if (!thread || !thread.liveCnt) return false;
    const { notifStatus } = this.window.ins;
    switch (this.window.userDefineMode) {
      case Iframe.MODE_BOTTOM:
      case Iframe.MODE_MODAL:
        const regex = /^\s*$/;
        switch (Ext.DISPLAY_MODE[this.window.displayModeKey]) {
          case Ext.DISPLAY_MODE_ACTIVE:
            notifStatus.updateCnt(thread.liveCnt);
            this.window.updateDisplayMode("clickHandleIcon");
            break;
          case Ext.DISPLAY_MODE_OPEN:
            const { inputPost } = this.window;
            if (inputPost && inputPost !== "" && !regex.test(inputPost)) {
              const inputCurrentTime = Window.getCurrentTime(this.window.handleMediaCurrentTime);
              // this.window.mediaToCLient("talknModal", "post", { app: { inputPost, inputCurrentTime } });
              this.window.extToClient("ON_CHANGE_INPUT_POST", { ui: { inputPost: "" } });
            } else {
              this.window.updateDisplayMode("clickHandleIcon");
            }
            break;
        }
        break;
    }
  }

  mouseover() {
    const translates = this.dom.style.transform.split("translate3d(")[1].split(") ")[0];
    this.dom.style.transform = `translate3d(${translates}) scale(1.1)`;
  }

  mouseout() {
    const translates = this.dom.style.transform.split("translate3d(")[1].split(") ")[0];
    this.dom.style.transform = `translate3d(${translates}) scale(1.0)`;
  }

  remove() {
    this.dom.remove();
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
    this.dom = document.createElement("div");
    const width = "24px";
    const height = "24px";
    const openStyles = this.getOpenStyles();

    this.getActiveStyles = this.getActiveStyles.bind(this);
    this.getOpenStyles = this.getOpenStyles.bind(this);
    this.updateCnt = this.updateCnt.bind(this);

    this.dom.id = id;
    this.dom.className = Window.className;
    this.dom.innerText = 0;
    this.dom.style =
      "" +
      `position: fixed !important;` +
      `bottom: 50px !important;` +
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
    Window.selectBody.appendChild(this.dom);
  }

  remove() {
    this.dom.remove();
    delete this;
  }

  updateCnt(cnt) {
    const updatedCnt = Number(cnt);
    if (updatedCnt > 0) {
      const { displayModeKey } = this.window;
      const activeStyles = this.getActiveStyles("updateCnt");
      this.dom.innerHTML = updatedCnt;
      if (Ext.DISPLAY_MODE[displayModeKey] === Ext.DISPLAY_MODE_ACTIVE) {
        this.dom.style.transform = activeStyles.transform;
      }
    }
  }

  getActiveStyles(called) {
    const baseCnt = Number(this.dom.innerText);
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

    this.dom = document.createElement("div");
    const id = Notif.id + params.id;
    const width = this.getWidth(true);
    const height = this.getHeight(true);
    const padding = this.getPadding(true);
    const bottom = this.getBottom(true);
    const right = this.getRight(true);
    const translateY = this.getTranslateY(true);
    const borderRadius = this.getBorderRadius();

    this.dom.setAttribute("id", id);
    this.dom.setAttribute("className", Window.className);
    this.dom.setAttribute("name", "notif");
    this.dom.setAttribute(
      "style",
      `position: fixed !important;` +
        `bottom: ${bottom} !important;` +
        `right: ${right} !important;` +
        `display: flex !important;` +
        `align-items: center !important;` +
        `cursor: pointer !important;` +
        `justify-content: flex-start;` +
        `z-index: ${Styles.zIndex - 3} !important;` +
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
    this.dom.appendChild(notifIcon);
    this.dom.appendChild(notifPost);

    this.dom.addEventListener("click", () => {
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

    this.dom.addEventListener("mouseover", () => {
      const translates = this.dom.style.transform.split("translate3d(")[1].split(") ")[0];
      this.dom.style.transform = `translate3d(${translates}) scale(1.05)`;
    });

    this.dom.addEventListener("mouseout", () => {
      const translates = this.dom.style.transform.split("translate3d(")[1].split(") ")[0];
      this.dom.style.transform = `translate3d(${translates}) scale(1.0)`;
    });

    Window.selectBody.appendChild(this.dom);

    const debugRate = 1;
    setTimeout(() => {
      this.dom.style.opacity = 1;
      this.dom.style.transform = `translate3d(0px, ${translateY}, 0px) scale(1.0)`;
      setTimeout(() => {
        this.dom.style.opacity = 0;
        this.dom.style.transform = `translate3d(0px, 0px, 0px) scale(1.0)`;
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

const talknExtension = document.querySelector("iframe#talknExtension");

// 多重起動防止
// ChromeExtとExt両方起動の場合はChromeExtが起動する
if (!talknExtension) {
  new Window();
}
