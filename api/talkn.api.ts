import io from "socket.io-client";
import conf from "client/conf";
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

class BootOption {
  constructor() {
    const apiScript = document.querySelector(`script[src='${Sequence.HTTPS_PROTOCOL}//${conf.apiAccessURL}']`);
    const clientScript = document.querySelector(`script[src='${Sequence.HTTPS_PROTOCOL}//${conf.clientURL}']`);
    const extScript = document.querySelector(`script[src='${Sequence.HTTPS_PROTOCOL}//${conf.extURL}']`);
    const apiScriptAtt = apiScript ? BootOption.rebuildAttributes(apiScript.attributes) : {};
    const extScriptAtt = extScript ? BootOption.rebuildAttributes(extScript.attributes) : {};
    const bootParams = { ...extScriptAtt, ...apiScriptAtt };
    const bootOption: any = BootOption.initialBootOption(bootParams, clientScript);
    return bootOption;
  }

  static rebuildAttributes(attributes) {
    let rebuildAttributesObj: any = {};
    Object.keys(attributes).forEach(i => {
      rebuildAttributesObj[attributes[i].name] = attributes[i].value;
    });
    return rebuildAttributesObj;
  }

  static initialBootOption(bootOption, clientScript) {
    bootOption.ch = bootOption.ch
      ? bootOption.ch
      : location.href
          .replace(`${Sequence.HTTPS_PROTOCOL}//${conf.domain}`, "")
          .replace(`:${define.PORTS.DEVELOPMENT}`, "")
          .replace(`:${define.PORTS.DEVELOPMENT_API}`, "")
          .replace(`${Sequence.HTTPS_PROTOCOL}/`, "")
          .replace(`${Sequence.HTTP_PROTOCOL}/`, "");

    if (conf.env === define.DEVELOPMENT) {
      bootOption.ch = bootOption.ch.replace(`/${define.LOCALHOST}:${define.PORTS.DEVELOPMENT}`, "");
    }
    bootOption.hasSlash = BootOption.getHasSlach(bootOption);

    if (bootOption.ch !== "/") {
      if (bootOption.hasSlash) {
        bootOption.ch = bootOption.ch;
      } else {
        bootOption.ch = bootOption.ch + "/";
      }
    }
    bootOption.type = clientScript ? define.APP_TYPES.PORTAL : define.APP_TYPES.EXTENSION;
    delete bootOption.src;
    delete bootOption.async;
    console.log(bootOption);
    return bootOption;
  }

  static getHasSlach({ ch }): boolean {
    return ch.lastIndexOf("/") === ch.length - 1;
  }
}

class CoreAPI {
  ws: any;
  apiStore: any;
  state: any;
  ch: string;
  constructor(apiStore, resolve) {
    const wsServer =
      location.host.indexOf(define.PRODUCTION_DOMAIN) >= 0 ? define.PRODUCTION_DOMAIN : define.DEVELOPMENT_DOMAIN;
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
      return requestParams => {
        const reduxState = this.apiStore.getState();
        const _requestState = Sequence.getRequestState(actionName, reduxState, requestParams);
        const _actionState = Sequence.getRequestActionState(actionName, requestParams);
        const { requestState, actionState } = beforeFunction(reduxState, _requestState, _actionState);
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
      return response => {
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
    const getResponseChAPI = actionMethod => {
      return response => {
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
      params: params
    };
  }
  constructor() {
    this.apiStore = apiStore();
    this.bootOption = new BootOption();
    this.exeCoreApi = this.exeCoreApi.bind(this);
    this.clientTo = this.clientTo.bind(this);
    this.subscribe = this.subscribe.bind(this);
    this.onWsServer = this.onWsServer.bind(this);
    this.afterMediaFilter = this.afterMediaFilter.bind(this);
    this.apiStore.subscribe(this.subscribe);

    this.onActions();

    const bootPromises = [];
    const self = this;

    bootPromises.push(
      new Promise(onMessageResolve => {
        window.onmessage = e => {
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
      new Promise(resove => {
        if (document.readyState === "complete") {
          new CoreAPI(self.apiStore, resove);
        } else {
          window.onload = e => {
            new CoreAPI(self.apiStore, resove);
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
    this.coreApi.tuned(apiState);
    window.$t = new PublicApi(this.coreApi);
  }

  onActions() {
    const actionKeys = Object.keys(handleActions);
    const actionLength = actionKeys.length;
    const getActions = actionName => {
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
    const apiState = this.apiStore.getState();
    this.afterMediaFilter(apiState);
    this.clientTo(apiState.app.actioned, apiState);
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
    console.log(apiState.app.actioned);
    switch (apiState.app.actioned) {
      case "SERVER_TO_API[EMIT]:find":
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
    const requestObj = GlobalWindow.getRequestObj(method, params);
    if (this.bootOption.type === "portal") {
      window.postMessage(requestObj, this.bootOption.clientHref);
    } else {
      const clientIframe: HTMLIFrameElement = document.querySelector(`iframe#talknExtension`);
      clientIframe.contentWindow.postMessage(requestObj, clientIframe.src);
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
      params: params
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
    media.addEventListener("play", e => {
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

    media.addEventListener("seeked", e => {
      this.setStatus("seeking");
    });

    media.addEventListener("pause", e => {
      this.setStatus("waiting");
    });

    media.addEventListener("ended", e => {
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
        postsTimelineStock: this.postsTimelineStock
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

console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
const globalWindow = new GlobalWindow();
