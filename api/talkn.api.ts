import io from "socket.io-client";
import conf from "common/conf";
import define from "common/define";
import PostMessage from "common/PostMessage";
import ApiState from "api/store/";
import Sequence from "api/Sequence";
import PublicApi from "api/public.api";
import apiStore from "api/store/apiStore";
import handleActions from "client/actions/handles";
import WsServerToApiEmitAction from "api/actions/ws/serverToApiEmit";
import WsClientToApiRequestActions from "api/actions/ws/apiToServerRequest";
import WsServerToApiBroadcastAction from "api/actions/ws/serverToApiBradcast";
import Thread from "api/store/Thread";
import ClientUtil from "client/container/util/clientUtil";
import PostsTimeline from "./store/PostsTimeline";
import PostsTimelineStock from "./store/PostsTimelineStock";

declare global {
  interface Window {
    $t: any;
    talknAPI: any;
    talknWindow: any;
    talknMedia: any;
    Youtube: any;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}

type EnvType = typeof define.DEVELOPMENT | typeof define.LOCALHOST | typeof define.PRODUCTION;
type BootType = typeof define.APP_TYPES.API | typeof define.APP_TYPES.PORTAL | typeof define.APP_TYPES.EXTENSION;
type BootProtocolType = typeof Sequence.HTTPS_PROTOCOL | typeof Sequence.HTTP_PROTOCOL | typeof Sequence.TALKN_PROTOCOL;
type BootOptionType = {
  env: EnvType;
  type: BootType;
  ch: string;
  hasSlash: boolean;
  protocol: BootProtocolType;
  host: string;
};

class BootOption {
  constructor() {
    // Resolved define scripts.
    const { env, apiScript } = BootOption.getEnvAndApiScript();
    const extScript = BootOption.getExtScript(env);
    const clientScript = BootOption.getClientScript(env);

    // Resolved define script attributes.
    const apiScriptAtt = apiScript ? BootOption.rebuildAttributes(apiScript.attributes) : {};
    const extScriptAtt = extScript ? BootOption.rebuildAttributes(extScript.attributes) : {};
    const clientScriptAtt = clientScript ? BootOption.rebuildAttributes(clientScript.attributes) : {};

    // Resolved boot option.
    const bootAttributes = BootOption.getBootAttributes(apiScriptAtt, extScriptAtt);
    const bootOption: BootOptionType = BootOption.initialBootOption(env, bootAttributes, clientScript, extScript);
    return bootOption;
  }

  static getEnvAndApiScript() {
    const { SUB_DOMAINS, PORTS, talknApiJs } = define;

    // Prod.
    const prodApiSrc1 = `${Sequence.HTTPS_PROTOCOL}//${SUB_DOMAINS.API}.${define.PRODUCTION_DOMAIN}/v${conf.apiVer}`;
    const prodApiScript1 = document.querySelector(`script[src='${prodApiSrc1}']`);
    if (prodApiScript1) return { env: define.PRODUCTION, apiScript: prodApiScript1 };

    const prodApiSrc2 = `//${SUB_DOMAINS.API}.${define.PRODUCTION_DOMAIN}/v${conf.apiVer}`;
    const prodApiScript2 = document.querySelector(`script[src='${prodApiSrc2}']`);
    if (prodApiScript2) return { env: define.PRODUCTION, apiScript: prodApiScript2 };

    // Localhost.
    const localApiSrc1 = `${Sequence.HTTPS_PROTOCOL}//${SUB_DOMAINS.API}.${define.DEVELOPMENT_DOMAIN}/v${conf.apiVer}`;
    const localApiScript1 = document.querySelector(`script[src='${localApiSrc1}']`);
    if (localApiScript1) return { env: define.LOCALHOST, apiScript: localApiScript1 };

    const localApiSrc2 = `//${SUB_DOMAINS.API}.${define.DEVELOPMENT_DOMAIN}/v${conf.apiVer}`;
    const localApiScript2 = document.querySelector(`script[src='${localApiSrc2}']`);
    if (localApiScript2) return { env: define.LOCALHOST, apiScript: localApiScript2 };

    // Development(webpack dev server),
    const devApiSrc1 = `${Sequence.HTTPS_PROTOCOL}//${define.DEVELOPMENT_DOMAIN}:${PORTS.DEVELOPMENT_API}/${talknApiJs}`;
    const devApiScript1 = document.querySelector(`script[src='${devApiSrc1}']`);
    if (devApiScript1) return { env: define.DEVELOPMENT, apiScript: devApiScript1 };

    const devApiSrc2 = `//${define.DEVELOPMENT_DOMAIN}:${PORTS.DEVELOPMENT_API}/${talknApiJs}`;
    const devApiScript2 = document.querySelector(`script[src='${devApiSrc2}']`);
    if (devApiScript2) return { env: define.DEVELOPMENT, apiScript: devApiScript2 };
    throw "NO EXIST API SCRIPT.";
  }

  static getClientScript(env: EnvType): Element | undefined {
    const { SUB_DOMAINS, PORTS, talknClientJs } = define;
    let clientSrc: string;
    switch (env) {
      case define.PRODUCTION:
        clientSrc = `${Sequence.HTTPS_PROTOCOL}//${SUB_DOMAINS.CLIENT}.${define.PRODUCTION_DOMAIN}`;
        break;
      case define.LOCALHOST:
        clientSrc = `${Sequence.HTTPS_PROTOCOL}//${SUB_DOMAINS.CLIENT}.${define.DEVELOPMENT_DOMAIN}`;
        break;
      case define.DEVELOPMENT:
        clientSrc = `${Sequence.HTTPS_PROTOCOL}//${define.DEVELOPMENT_DOMAIN}:${PORTS.DEVELOPMENT}/${talknClientJs}`;
        break;
    }
    const clientScript = document.querySelector(`script[src='${clientSrc}']`);
    return clientScript ? clientScript : undefined;
  }

  static getExtScript(env: EnvType): Element | undefined {
    const { SUB_DOMAINS } = define;

    switch (env) {
      case define.PRODUCTION:
        const prodExtSrc1 = `${Sequence.HTTPS_PROTOCOL}//${SUB_DOMAINS.EXT}.${define.PRODUCTION_DOMAIN}`;
        const prodExtScript1 = document.querySelector(`script[src='${prodExtSrc1}']`);
        if (prodExtScript1) return prodExtScript1;

        const prodExtSrc2 = `//${SUB_DOMAINS.EXT}.${define.PRODUCTION_DOMAIN}`;
        const prodExtScript2 = document.querySelector(`script[src='${prodExtSrc2}']`);
        if (prodExtScript2) return prodExtScript2;
        break;
      case define.LOCALHOST:
      case define.DEVELOPMENT:
        const devExtSrc1 = `${Sequence.HTTPS_PROTOCOL}://${SUB_DOMAINS.EXT}.${define.DEVELOPMENT_DOMAIN}`;
        const devExtScript1 = document.querySelector(`script[src='${devExtSrc1}']`);
        if (devExtScript1) return devExtScript1;

        const devExtSrc2 = `//${SUB_DOMAINS.EXT}.${define.DEVELOPMENT_DOMAIN}`;
        const devExtScript2 = document.querySelector(`script[src='${devExtSrc2}']`);
        if (devExtScript2) return devExtScript2;
        break;
    }

    return undefined;
  }

  static rebuildAttributes(attributes: any) {
    let rebuildAttributesObj: any = {};
    Object.keys(attributes).forEach((i) => {
      rebuildAttributesObj[attributes[i].name] = attributes[i].value;
    });
    return rebuildAttributesObj;
  }

  static getBootAttributes(apiScriptAtt: any, extScriptAtt: any) {
    return extScriptAtt ? { ...apiScriptAtt, ...extScriptAtt } : { ...apiScriptAtt };
  }

  static getInitialRootCh(env: EnvType, bootAttributes): string {
    let initialRootCh: string = bootAttributes && bootAttributes.ch ? bootAttributes.ch : location.href;
    initialRootCh = initialRootCh.replace(`${Sequence.HTTPS_PROTOCOL}/`, "").replace(`${Sequence.HTTP_PROTOCOL}/`, "");
    switch (env) {
      case define.PRODUCTION:
        console.log(initialRootCh);
        console.log(`^\/${define.PRODUCTION_DOMAIN}\/`);
        initialRootCh = initialRootCh.replace(`/${define.PRODUCTION_DOMAIN}`, "/");
        console.log(initialRootCh);
        break;
      case define.LOCALHOST:
        initialRootCh = initialRootCh.replace(`/${define.DEVELOPMENT_DOMAIN}`, "/");
        break;
      case define.DEVELOPMENT:
        initialRootCh = initialRootCh
          .replace(`${define.DEVELOPMENT_DOMAIN}`, "")
          .replace(`:${define.PORTS.DEVELOPMENT}`, "")
          .replace(`:${define.PORTS.DEVELOPMENT_API}`, "");
        break;
    }
    return initialRootCh;
  }

  static getType(extScript, clientScript): BootType {
    let type = define.APP_TYPES.API;
    if (extScript) return define.APP_TYPES.EXTENSION;
    if (clientScript) return define.APP_TYPES.PORTAL;
    return type;
  }

  static getProtocol(): BootProtocolType {
    if (location.protocol === Sequence.HTTPS_PROTOCOL) return Sequence.HTTPS_PROTOCOL;
    if (location.protocol === Sequence.HTTP_PROTOCOL) return Sequence.HTTP_PROTOCOL;
    return Sequence.TALKN_PROTOCOL;
  }

  static getFirstHasSlach(ch): boolean {
    return ch.indexOf("/") === 0;
  }

  static getLastHasSlach(ch): boolean {
    return ch.lastIndexOf("/") === ch.length - 1;
  }

  static getCh(initialRootCh, firstHasSlash, lastHasSlash): string {
    let ch = initialRootCh;
    ch = firstHasSlash ? ch : `/${ch}`;
    ch = lastHasSlash ? ch : `${ch}/`;
    ch = ch.replace(/^\/\//, "/");
    return ch;
  }

  static initialBootOption(
    env: EnvType,
    bootAttributes: any,
    clientScript: Element,
    extScript: Element
  ): BootOptionType {
    const type = BootOption.getType(extScript, clientScript);
    const initialRootCh = BootOption.getInitialRootCh(env, bootAttributes);
    const firstHasSlash = BootOption.getFirstHasSlach(initialRootCh);
    const lastHasSlash = BootOption.getLastHasSlach(initialRootCh);
    const ch = BootOption.getCh(initialRootCh, firstHasSlash, lastHasSlash);
    const protocol = BootOption.getProtocol();
    const host = location.host;
    return {
      env,
      type,
      ch,
      hasSlash: lastHasSlash,
      protocol,
      host,
    };
  }
}

class CoreAPI {
  ws: any;
  apiStore: any;
  state: any;
  ch: string;
  callbacks: { key: Function } | {} = {};
  constructor(env, apiStore, resolve) {
    const wsServer =
      env === define.DEVELOPMENT || env === define.LOCALHOST ? define.DEVELOPMENT_DOMAIN : define.PRODUCTION_DOMAIN;
    this.apiStore = apiStore;
    this.ws = io(`${Sequence.HTTPS_PROTOCOL}//${wsServer}:${define.PORTS.SOCKET_IO}`, { forceNew: true });
    this.onResponseMeAPI(resolve);
    this.setUp = this.setUp.bind(this);
  }

  setUp(state, ch) {
    this.state = state;
    this.ch = ch;

    // COMMUNUCATION API’s
    this.onResponseChAPI();
    this.onRequestAPI();
  }

  onRequestAPI() {
    const actions = WsClientToApiRequestActions;
    const actionKeys = Object.keys(actions);
    const actionLength = actionKeys.length;
    const getCoreAPI = (actionName, beforeFunction) => {
      return (requestParams, callback = () => {}) => {
        const reduxState = this.apiStore.getState();
        const _requestState = Sequence.getRequestState(actionName, reduxState, requestParams);
        const _actionState = Sequence.getRequestActionState(actionName, requestParams);
        const { requestState, actionState } = beforeFunction(reduxState, _requestState, _actionState);

        this.callbacks[requestState.type] = callback;
        this.ws.emit(requestState.type, requestState);
        return this.apiStore.dispatch(actionState);
      };
    };

    for (let actionNodeCnt = 0; actionNodeCnt < actionLength; actionNodeCnt++) {
      const actionName = actionKeys[actionNodeCnt];
      const actionPlainName = actionName.replace(Sequence.API_TO_SERVER_REQUEST, "");
      const beforeFunction = actions[actionName];
      this[actionPlainName] = getCoreAPI(actionName, beforeFunction);
    }
  }

  onResponseMeAPI(resolve: Promise<boolean> | null = null) {
    const getToMeAPI = (action, resolve = null) => {
      const self = this;
      return (response) => {
        if (resolve && response.type === Sequence.CONNECTION_SERVER_KEY) {
          resolve(self);
        }
        const actionState = action(response);
        return this.apiStore.dispatch(actionState);
      };
    };
    const callback: any = getToMeAPI(WsServerToApiEmitAction, resolve);
    this.on(Sequence.CATCH_ME_KEY, callback);
  }

  onResponseChAPI(ch = this.ch) {
    const getResponseChAPI = (actionMethod) => {
      return (response) => {
        const actionState = actionMethod(response);
        return this.apiStore.dispatch(actionState);
      };
    };
    // To connect redux flow.
    const callback: any = getResponseChAPI(WsServerToApiBroadcastAction);
    this.on(ch, callback);
  }

  offResponseChAPI(ch = this.ch) {
    this.off(ch);
  }

  on(onKey, callback = () => {}) {
    if (!this.ws._callbacks[`$${onKey}`]) {
      this.ws.on(onKey, callback);
    }
  }

  off(offKey) {
    if (this.ws._callbacks[`$${offKey}`]) {
      this.ws.off(offKey);
    }
  }
}

class GlobalWindow {
  bootId: any;
  bootOption: any;
  globalApi: any;
  coreApi: any;
  origin: string;
  apiStore: any;
  media: Media;
  static getRequestObj(method, params: any = {}) {
    const href = location.href;
    return {
      windowType: window.name,
      type: PostMessage.API_TO_CLIENT_TYPE,
      href,
      method: method,
      params: params,
    };
  }
  constructor() {
    this.apiStore = apiStore();
    this.bootOption = new BootOption();
    this.exeCoreApi = this.exeCoreApi.bind(this);
    this.clientTo = this.clientTo.bind(this);
    this.subscribe = this.subscribe.bind(this);
    this.onWsServer = this.onWsServer.bind(this);
    this.exeCallback = this.exeCallback.bind(this);
    this.afterMediaFilter = this.afterMediaFilter.bind(this);
    this.apiStore.subscribe(this.subscribe);

    this.onActions();
    const bootPromises = [];
    const self = this;

    bootPromises.push(
      new Promise((onMessageResolve) => {
        window.onmessage = (e) => {
          if (onMessageResolve) {
            self.origin = e.origin;
            onMessageResolve();
          }

          switch (e.data.type) {
            case PostMessage.CLIENT_TO_API_TYPE:
              if (e.data.method === PostMessage.HANDLE_API_AND_CLIENT) {
                clearInterval(self.bootId);
              } else {
                self.exeCoreApi(e);
              }
              break;
            case PostMessage.HANDLE_EXT_AND_API:
              break;
            case PostMessage.EXT_TO_API_TYPE:
              self.exeCoreApi(e);
              break;
          }
        };
      })
    );

    bootPromises.push(
      new Promise((resove) => {
        if (document.readyState === "complete") {
          new CoreAPI(this.bootOption.env, self.apiStore, resove);
        } else {
          window.onload = (e) => {
            new CoreAPI(this.bootOption.env, self.apiStore, resove);
          };
        }
      }).then(this.onWsServer)
    );

    Promise.all(bootPromises).then((bootParams: any) => {
      this.bootId = setInterval(() => {
        this.clientTo(PostMessage.HANDLE_API_AND_CLIENT, this.bootOption);
      }, 200);
    });
  }

  exeCoreApi(e) {
    if (this.coreApi && this.coreApi[e.data.method]) {
      const { method, params } = e.data;
      const apiState = this.apiStore.getState();
      this.beforeMediaFilter({ method, params, apiState });
      this.coreApi[method](params);
    }
  }

  onWsServer(coreApi: any) {
    this.coreApi = coreApi;
    const apiState = new ApiState(window, this.bootOption);
    this.coreApi.setUp(apiState, this.bootOption.ch);
    if (this.bootOption.type !== define.APP_TYPES.API) {
      this.coreApi.tune(apiState);
    }

    window.$t = new PublicApi(this.coreApi);
  }

  onActions() {
    const actionKeys = Object.keys(handleActions);
    const actionLength = actionKeys.length;
    const getActions = (actionName) => {
      return (params1, params2) => {
        const action = handleActions[actionName](params1);
        const reduxState = this.apiStore.getState();
        return this.apiStore.dispatch(action);
      };
    };
    for (let actionNodeCnt = 0; actionNodeCnt < actionLength; actionNodeCnt++) {
      const actionName = actionKeys[actionNodeCnt];
      this[actionName] = getActions(actionName);
    }
  }

  subscribe() {
    if (this.coreApi) {
      const apiState = this.apiStore.getState();
      this.afterMediaFilter(apiState);
      this.exeCallback(apiState.app.actioned, apiState);
      this.clientTo(apiState.app.actioned, apiState);
    }
  }

  exeCallback(method, apiState) {
    const { actionType, actionName } = Sequence.getSequenceActionMap(method);
    if (actionName !== Sequence.API_BROADCAST_CALLBACK) {
      if (actionType === Sequence.API_RESPONSE_TYPE_EMIT) {
        if (this.coreApi.callbacks[actionName]) {
          const { posts, thread, user } = apiState;
          this.coreApi.callbacks[actionName](apiState, { posts, thread, uid: user.uid });
        }
      }
    }

    if (actionType === Sequence.API_RESPONSE_TYPE_BROADCAST) {
      if (this.coreApi.callbacks[Sequence.API_BROADCAST_CALLBACK]) {
        const { posts, thread, user } = apiState;
        this.coreApi.callbacks[Sequence.API_BROADCAST_CALLBACK](actionName, { posts, thread, uid: user.uid });
      }
    }
  }

  beforeMediaFilter({ method, params, apiState }) {
    if (apiState.app.isMediaCh) {
      if (method === "post") {
        // 自分のpostsのみMediaに反映する
        params.app.inputCurrentTime = this.media.currentTime > 0 ? this.media.currentTime : 0;
      }
    }
    return params;
  }

  afterMediaFilter(apiState) {
    switch (apiState.app.actioned) {
      case "SERVER_TO_API[EMIT]:fetchPosts":
        if (apiState.app.isMediaCh) {
          // 見ているchがmediaChでなく、mediaの再生を始めた場合
          if (this.media && this.media.status === "finding" && this.media.ch === apiState.thread.ch) {
            this.media.setPostsTimelines(apiState);
            this.media.playing();

            // 見ているchがmediaChの場合
          } else {
            this.media = new Media(this);
            this.media.searching();
          }
        } else {
          this.media = new Media(this);
          this.media.searching();
        }
        break;
      case "SERVER_TO_API[BROADCAST]:post":
        if (apiState.app.isMediaCh) {
          const post = apiState.posts[0];
          if (post.ch === this.media.ch) {
            // 自分の投稿したpostの場合
            if (post.uid === apiState.user.uid) {
              this.media.refrectSelfPost(post);
            }
          }
        }
        break;
    }
  }

  clientTo(method, params = {}) {
    switch (this.bootOption.type) {
      case define.APP_TYPES.PORTAL:
        const requestObj = GlobalWindow.getRequestObj(method, params);
        window.postMessage(requestObj, location.href);
        break;
      case define.APP_TYPES.EXTENSION:
        const clientIframe: HTMLIFrameElement = document.querySelector(`iframe#talknExtension`);

        // boot by iframe.
        if (clientIframe) {
          const requestObj = GlobalWindow.getRequestObj(method, params);
          clientIframe.contentWindow.postMessage(requestObj, clientIframe.src);
          // boot by api only.
        } else {
          throw "NO EXTENSION IFRAME";
        }
        break;
      case define.APP_TYPES.API:
        break;
    }
  }
}

export class Media {
  static get mediaSecondInterval() {
    return 200;
  }
  static getMedia(thread) {
    const src = Thread.getMediaSrc(thread);
    const tagType = Thread.getMediaTagType(thread);
    return document.querySelector(`${tagType}[src='${src}']`);
  }
  static getRequestObj(method, params: any = {}) {
    return {
      windowType: window.name,
      type: PostMessage.MEDIA_TO_CLIENT_TYPE,
      method: method,
      params: params,
    };
  }
  ch: string;
  globalWindow: GlobalWindow;
  maxSearchingCnt: number = 30;
  searchingCnt: number;
  playingCnt: number;
  searchingId: any;
  waitingId: any;
  playIntervalId: any;
  started: boolean;
  isPosting: boolean;
  file: any;
  pointerTime: any;
  postsTimeline: any;
  postsTimelineStock: any;
  status: "shutdown" | "searching" | "waiting" | "finding" | "playing" | "seeking" = "shutdown";
  isLog: boolean = false;
  constructor(globalWindow) {
    this.globalWindow = globalWindow;
    this.ch = globalWindow.apiStore.getState().thread.ch;

    // controls.
    this.searchingCnt = 0;
    this.playingCnt = 0;
    this.pointerTime = 0;
    this.started = false;
    this.isPosting = false;

    clearInterval(this.searchingId);
    clearInterval(this.playIntervalId);

    // timeline datas.
    this.postsTimeline = [];
    this.postsTimelineStock = [];

    // methods.
    this.setPostsTimelines = this.setPostsTimelines.bind(this);
    this.refrectSelfPost = this.refrectSelfPost.bind(this);
    this.searching = this.searching.bind(this);
    this.handleEvents = this.handleEvents.bind(this);
    this.posting = this.posting.bind(this);
    this.apiTo = this.apiTo.bind(this);
    this.log = this.log.bind(this);
  }

  setStatus(status) {
    this.status = status;
    this.log("SET STATUS");
  }

  setPostsTimelines({ postsTimeline, postsTimelineStock }) {
    // 現在表示されているタイムライン状態
    this.postsTimeline = [...postsTimeline];

    // 0秒投稿のタイムライン状態
    this.postsTimelineStock = [...postsTimelineStock];

    this.log("INIT TIMELINES");
  }

  refrectSelfPost(post) {
    const length = this.postsTimeline.length;
    let pushFlg = false;
    for (let i = 0; i < length; i++) {
      if (post.currentTime < this.postsTimeline[i].currentTime) {
        pushFlg = true;
        this.postsTimeline.splice(i, 0, post);
      }
    }

    if (!pushFlg) {
      this.postsTimeline.push(post);
    }
  }

  get currentTime() {
    return this.file ? Math.floor(this.file.currentTime * 10) / 10 : 0;
  }

  searching(second = Media.mediaSecondInterval) {
    this.setStatus("searching");
    this.searchingCnt = 0;
    this.searchingId = null;
    this.waitingId = null;
    this.playIntervalId = null;
    this.searchingId = setInterval(() => {
      if (this.searchingCnt < this.maxSearchingCnt) {
        const videos = document.querySelectorAll("video");
        const audios = document.querySelectorAll("audio");
        videos.forEach(this.handleEvents);
        audios.forEach(this.handleEvents);
        if (videos.length > 0 || audios.length > 0) {
          this.setStatus("waiting");
          clearInterval(this.searchingId);
          clearInterval(this.playIntervalId);
        } else {
          this.searchingCnt++;
        }
      } else {
        clearInterval(this.searchingId);
        clearInterval(this.playIntervalId);
        this.searching(Media.mediaSecondInterval * 10);
      }
    }, second);
  }

  handleEvents(media) {
    media.addEventListener("play", (e) => {
      this.file = e.srcElement;
      const mediaCh = ClientUtil.deleteProtcol(this.file.currentSrc) + "/";

      // 見ているchがmediaChの場合
      if (this.ch === mediaCh) {
        if (this.playingCnt === 0) {
          this.setPostsTimelines(this.globalWindow.apiStore.getState());
        }
        this.playing();

        // 見ているchがmediaChでなく、mediaの再生を始めた場合
      } else {
        this.setStatus("finding");
        this.ch = mediaCh;
        this.globalWindow.coreApi.onResponseChAPI(this.ch);
        this.globalWindow.coreApi.changeThread({ thread: { ch: this.ch } });
      }
    });

    media.addEventListener("seeked", (e) => {
      this.setStatus("seeking");
    });

    media.addEventListener("pause", (e) => {
      this.setStatus("waiting");
    });

    media.addEventListener("ended", (e) => {
      this.setStatus("waiting");
      clearInterval(this.playIntervalId);
      const currentTime = Number.MAX_SAFE_INTEGER;
      const length = this.postsTimelineStock.length;
      for (let i = 0; i < length; i++) {
        if (this.postsTimelineStock[i] && this.postsTimelineStock[i].currentTime <= currentTime) {
          this.apiTo("NEXT_POSTS_TIMELINE", { postsTimeline: [this.postsTimelineStock[i]] });
        } else {
          break;
        }
      }
      this.setStatus("waiting");
    });
  }

  playing() {
    this.setStatus("playing");
    clearInterval(this.playIntervalId);
    this.playIntervalId = setInterval(() => {
      this.posting(this.currentTime);
    }, conf.mediaSecondInterval);
  }

  /**
   * メディアファイルの投稿を管理するメソッド
   * パラメータを与えて直接実行も可能(拡張機能から間接的に実行する)
   */
  posting(pointerTime = 0) {
    if (this.isPosting) return;
    const timelineLength = this.postsTimelineStock.length;
    this.playingCnt++;
    this.isPosting = true;

    // Timeline is next.
    if (this.pointerTime <= pointerTime) {
      this.pointerTime = pointerTime;
      while (this.isPosting) {
        if (timelineLength === 0) {
          this.isPosting = false;
        } else if (this.postsTimelineStock[0] && this.postsTimelineStock[0].currentTime <= pointerTime) {
          const addPost = this.postsTimelineStock.shift();
          this.apiTo("NEXT_POSTS_TIMELINE", { postsTimeline: [addPost] });
          this.log("POSTING");
        } else {
          this.isPosting = false;
          break;
        }
      }
      // Timeline is prev.
    } else {
      // prev.
      this.file.pause();

      const postsTimelineAll = this.globalWindow.apiStore.getState().postsTimeline.concat(this.postsTimelineStock);
      const length = postsTimelineAll.length;
      this.pointerTime = this.currentTime;
      this.postsTimeline = new PostsTimeline();
      this.postsTimelineStock = new PostsTimelineStock();

      for (let i = 0; i < length; i++) {
        const post = postsTimelineAll[i];
        if (post.currentTime <= this.pointerTime) {
          this.postsTimeline.push(post);
        } else {
          this.postsTimelineStock.push(post);
        }
      }

      // 指定した秒数を経過しているPostをreducerでdispFlgをfalseにしてPostをUnmountする
      this.apiTo("CLEAR_POSTS_TIMELINE", {
        postsTimeline: this.postsTimeline,
        postsTimelineStock: this.postsTimelineStock,
      });

      this.isPosting = false;
      this.file.play();
    }
  }

  apiTo(method, params = {}) {
    this.globalWindow.apiStore.dispatch({ type: method, ...params });
  }

  log(label, isForce = false) {
    if (this.isLog || isForce) {
      console.log(`@@@@@@@@@@@ ${label} ${this.status} CH ${this.ch} ${this.pointerTime} @@@`);
      console.log(`postsTimeline: ${this.postsTimeline.length} postsTimelineStock: ${this.postsTimelineStock.length}`);
      console.log(this.postsTimeline);
      console.log(this.postsTimelineStock);
    }
  }
}

const globalWindow = new GlobalWindow();
