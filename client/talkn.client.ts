import WsApiWorker from "worker-loader?publicPath=/&name=worker.js!./ws.api.worker";
import conf from "common/conf";
import define from "common/define";
import BootOption from "common/BootOption";
import { default as PostsSchems } from "api/store/Posts";
import App from "api/store/App";
import PostMessage, { MessageClientAndWsApiType, MessageClientAndExtType, MessageParams } from "common/PostMessage";
import TalknSetup from "client/operations/TalknSetup";
import clientStore from "client/store/clientStore";
import ClientState from "client/store/";
import ApiState from "api/store/";
import Render from "client/App";
import TalknComponent from "client/components/TalknComponent";
import Ui from "client/store/Ui";
import UiTimeMarker from "client/store/UiTimeMarker";

declare global {
  interface Window {
    talknWindow: any;
    talknMedia: any;
    Youtube: any;
    log: any;
  }
  interface Math {
    easeInOutQuad: any;
  }
}

export default class Window {
  id: string = define.APP_TYPES.PORTAL;
  bootOption: BootOption;
  wsApi: WsApiWorker;
  store: any = clientStore();
  parentHref: string = location.href;
  ext: Ext;
  dom: Dom;
  constructor() {
    TalknSetup.setupMath();

    // store.
    this.bootOption = new BootOption(this.id);
    const apiState = new ApiState(this.bootOption);
    const clientState = new ClientState(apiState);
    const state = { ...apiState, ...clientState };
    this.store.dispatch({ ...state, type: "INIT_CLIENT" });

    // ws.api.worker.
    this.api = this.api.bind(this);
    this.injectStateToApp = this.injectStateToApp.bind(this);
    this.postMessage = this.postMessage.bind(this);
    this.onMessage = this.onMessage.bind(this);
    this.onError = this.onError.bind(this);
    this.wsApi = new WsApiWorker();
    this.wsApi.onerror = this.onError;
    this.wsApi.onmessage = this.onMessage;

    // handle ext.
    this.ext = new Ext(this);

    // dom
    this.dom = new Dom(this);
  }

  public api(method: string, params: MessageParams = {}): void {
    this.postMessage(method, params);
  }

  private injectStateToApp(apiState: MessageParams): void {
    this.api("tune", apiState);
    this.api("fetchPosts", apiState);
    this.api("rank", apiState);
  }

  private postMessage(method: string, params: MessageParams = {}): void {
    const message: MessageClientAndWsApiType = {
      id: this.id,
      type: PostMessage.CLIENT_TO_WSAPI_TYPE,
      method,
      params,
    };
    this.wsApi.postMessage(message);
  }

  private onMessage(e: MessageEvent): void {
    const { currentTarget, data } = e;
    if (currentTarget instanceof Worker) {
      const { type, method, params, methodBack }: MessageClientAndWsApiType = data;
      if (type === PostMessage.WSAPI_TO_CLIENT_TYPE) {
        const actionType = PostMessage.convertApiToClientActionType(method);

        // client.
        this.store.dispatch({ ...params, type: actionType });

        // ws api.
        if (WsApiResponseCallbacks[method] && typeof WsApiResponseCallbacks[method] === "function") {
          const backParams = WsApiResponseCallbacks[method](this, params);

          // api back
          if (methodBack) {
            this.postMessage(methodBack, backParams);
          }
        }

        // finnish handle ws api.
        if (method === `SETUPED_API_STORE`) {
          this.injectStateToApp(params);
        }
      }
    }
  }
  private onError(e: ErrorEvent): void {
    console.warn(e);
  }
}

class Ext {
  href: string;
  window: Window;
  constructor(_window: Window) {
    this.window = _window;
    this.onMessage = this.onMessage.bind(this);
    this.onMessageError = this.onMessageError.bind(this);
    this.postMessage = this.postMessage.bind(this);
    window.onmessage = this.onMessage;
    window.onmessageerror = this.onMessageError;
  }

  public to(method: string, params: MessageParams = {}): void {
    this.postMessage(method, params);
  }

  private postMessage(method: string, params: MessageParams = {}): void {
    const message: MessageClientAndExtType = {
      id: this.window.id,
      type: PostMessage.CLIENT_TO_EXT_TYPE,
      method,
      params,
      href: location.href,
    };
    window.top.postMessage(message, this.href);
  }

  private onMessage(e: MessageEvent): void {
    const { id, href, type, method, params, methodBack }: MessageClientAndExtType = e.data;
    if (type === PostMessage.EXT_TO_CLIENT_TYPE) {
      if (method === PostMessage.HANDLE_EXT_AND_CLIENT) {
        this.window.id = id;
        // @ts-ignore
        this.window.bootOption = new BootOption(id, params.bootOption);
        this.href = href;

        const apiState = new ApiState(this.window.bootOption);
        // @ts-ignore
        const clientState = new ClientState({ ...apiState, ui: params.ui });
        const state = { ...apiState, ...clientState };
        this.window.store.dispatch({ ...state, type: "INIT_CLIENT" });
        this.postMessage(method, state);
      }

      const actionType = PostMessage.convertExtToClientActionType(method);
      this.window.store.dispatch({ ...params, type: actionType });
    }
  }
  private onMessageError(e: ErrorEventInit): void {
    console.warn(e);
  }
}

class Dom extends TalknComponent<{}, {}> {
  id: string = "talkn";
  window: Window;
  html: HTMLElement;
  body: HTMLBodyElement;
  talkn: HTMLDivElement;
  posts: HTMLOListElement;
  timeMerkerLists: NodeList;
  srollHeight: number = 0;
  isScrollBottom: boolean = false;
  resizeTimer: any = null;
  isAnimateScrolling: boolean = false;
  static get resizeInterval() {
    return 300;
  }
  static get selectHtml(): HTMLElement {
    return document.querySelector(`html`);
  }
  static get selectBody(): HTMLBodyElement {
    return document.querySelector(`body`);
  }
  static get selectTalkn(): HTMLDivElement {
    return document.querySelector(`div#talkn`);
  }
  static get selectPosts(): HTMLOListElement {
    return document.querySelector("[data-component-name=Posts]");
  }
  static get selectAllPost() {
    return document.querySelectorAll("[data-component-name=Post]");
  }
  static get selectAllTimeMarkerList() {
    return document.querySelectorAll("li[data-component-name=TimeMarkerList]");
  }
  constructor(_window: Window) {
    super(null);
    this.window = _window;
    this.load = this.load.bind(this);
    this.resize = this.resize.bind(this);
    this.scroll = this.scroll.bind(this);
    this.renderTalkn = this.renderTalkn.bind(this);
    this.loadContainer = this.loadContainer.bind(this);
    this.updateUiTimeMarker = this.updateUiTimeMarker.bind(this);

    window.onload = this.load;
    window.onresize = this.resize;
    window.onscroll = this.scroll;
  }

  public renderTalkn() {
    Render(this, this.loadContainer);
  }
  loadContainer() {
    this.html = Dom.selectHtml;
    this.body = Dom.selectBody;
    this.talkn = Dom.selectTalkn;
    this.removeTalknLoading();
  }

  private load() {}

  private resize(ev) {
    if (window.talknWindow) {
      const { ui } = this.window.store.getState();
      if (this.resizeTimer === null) {
        this.resizeStartWindow(ui);
        this.resizeTimer = setTimeout(() => {
          this.resizeEndWindow(ui);
        }, Dom.resizeInterval);
      }
    }
  }

  private scroll(ev) {
    const scrollTop = window.scrollY;
    const clientHeight = window.innerHeight;
    const scrollHeight = this.body.scrollHeight;
    this.onScroll({ scrollTop, clientHeight, scrollHeight });
  }

  public updateUiTimeMarker(scrollTop, { app, ui }) {
    const uiTimeMarker = UiTimeMarker.generate(scrollTop, Dom.selectAllTimeMarkerList, { app, ui });
    if (uiTimeMarker.list.length > 0) {
      this.clientAction("ON_SCROLL_UPDATE_TIME_MARKER", { uiTimeMarker });
    }
  }

  private resizeStartWindow(ui) {
    ui.isTransition = false;
    this.clientAction("ON_RESIZE_START_WINDOW", { ui });
  }

  private resizeEndWindow(ui) {
    if (ui) {
      clearTimeout(this.resizeTimer);
      this.resizeTimer = null;
      const clientStore = window.talknWindow.store.getState();
      let updateWindow = false;
      if (ui.width !== window.innerWidth) {
        ui.width = window.innerWidth;
        updateWindow = true;
      }
      if (ui.height !== window.innerHeight) {
        ui.height = window.innerHeight;
        updateWindow = true;
      }

      if (updateWindow) {
        ui.screenMode = Ui.getScreenMode();
        ui.isTransition = true;
        clientStore.ui = ui;
        this.clientAction("ON_RESIZE_END_WINDOW", clientStore);
      }
    }
  }

  public animateScrollTo(to = 9999999, duration = 400, callback = () => {}) {
    if (duration === 0) {
      window.scrollTo(0, to);
    } else {
      if (!this.isAnimateScrolling) {
        let start = window.scrollY;
        let change = to - start;
        let currentTime = 0;
        let increment = 20;
        const animateScroll = () => {
          currentTime += increment;
          let scrollTop = Math.easeInOutQuad(currentTime, start, change, duration);
          screenTop = Math.floor(scrollTop);
          window.scrollTo(0, scrollTop);
          if (currentTime < duration) {
            this.isAnimateScrolling = true;
            setTimeout(animateScroll, increment);
          } else {
            this.isAnimateScrolling = false;
            callback();
          }
        };
        animateScroll();
      }
    }
  }
  exeGetMore() {
    const { thread, app } = this.clientState;
    const posts = PostsSchems.getDispPosts(this.clientState);
    const dispPostCnt = posts.length;
    const postCntKey = app.dispThreadType === App.dispThreadTypeMulti ? "multiPostCnt" : "postCnt";

    if (conf.findOnePostCnt <= dispPostCnt && dispPostCnt < conf.findOneLimitCnt) {
      if (thread[postCntKey] > conf.findOnePostCnt) {
        if (dispPostCnt < thread[postCntKey]) {
          this.api("getMore");
        }
      }
    }
  }
  getPostsHeight() {
    let postsHeight = 0;
    Dom.selectAllPost.forEach((post) => {
      postsHeight += post.clientHeight;
    });
    return postsHeight;
  }
  removeTalknLoading() {
    this.talkn.style["display"] = "initial";
    this.talkn.style["background-image"] = "none";
    this.talkn.style["animation-name"] = "none";
  }

  lockWindow() {
    console.log("---- LOCK");
    const overflow = "hidden";
    this.html.style.overflow = overflow;
    this.body.style.overflow = overflow;
    this.talkn.style.overflow = overflow;
    return window.scrollY;
  }

  unlockWindow() {
    console.log("---- UNLOCK");
    const overflow = "inherit";
    this.html.style.overflow = overflow;
    this.body.style.overflow = overflow;
    this.talkn.style.overflow = overflow;
  }
}

const WsApiResponseCallbacks = {
  GET_BOOT_OPTION: (_window, messageParams: MessageParams) => {
    return _window.bootOption;
  },
};

const talknWindow = new Window();
window.talknWindow = talknWindow;
talknWindow.dom.renderTalkn();
