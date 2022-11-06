import WsApiWorker from 'worker-loader?inline=fallback&publicPath=/&filename=ws.api.worker.js!../../api/src/ws.api.worker';

import BootOption, { BootOptionParamsType } from 'common/BootOption';
import PostMessage, {
  IoTypeValues,
  MessageClientAndWsApiType,
  MessageClientAndExtType,
  MessageMediaClientAndMediaServerType,
  MessageParams,
} from 'common/PostMessage';
import Sequence from 'common/Sequence';
import TalknSetup from 'common/clientState/operations/TalknSetup';
import ClientState from 'common/clientState/store/';
import Ui from 'common/clientState/store/Ui';
import UiTimeMarker from 'common/clientState/store/UiTimeMarker';
import clientStore from 'common/clientState/store/clientStore';
import conf from 'common/conf';
import define from 'common/define';

import ApiState from 'api/store';
import App from 'api/store/App';
import { default as PostsSchems } from 'api/store/Posts';

import Render from 'client/App';
import TalknComponent from 'client/components/TalknComponent';

const MediaServer = require('common/MediaServer');
const mediaServer = new MediaServer.default();

export default class Window {
  id: string = define.APP_TYPES.API;
  bootOption: BootOption;
  wsApi: WsApiWorker;
  store: any = clientStore();
  parentHref: string = location.href;
  ext: Ext;
  mediaClient: MediaClient;
  dom: Dom;
  callback: Function | undefined;
  conned: (value?: any | PromiseLike<any>) => void;
  static get SET_CALLBACK_METHOD() {
    return 'tune';
  }
  constructor(id) {
    TalknSetup.setupMath();

    // client store.
    this.id = id;
    this.bootOption = new BootOption(this.id);
    const apiState = new ApiState(this.bootOption);
    const clientState = new ClientState(apiState);
    const state = { ...apiState, ...clientState };
    this.store.dispatch({ ...state, type: 'INIT_CLIENT' });

    // ws.api.worker.
    this.api = this.api.bind(this);
    this.injectStateToApp = this.injectStateToApp.bind(this);
    this.postMessage = this.postMessage.bind(this);
    this.onMessage = this.onMessage.bind(this);
    this.exePublicCallback = this.exePublicCallback.bind(this);
    this.onError = this.onError.bind(this);
  }

  public boot() {
    return new Promise((resolve) => {
      this.conned = resolve;
      this.wsApi = new WsApiWorker();
      this.wsApi.onerror = this.onError;
      this.wsApi.onmessage = this.onMessage;

      if (this.id === define.APP_TYPES.CLIENT || this.id === define.APP_TYPES.EXTENSION) {
        // handle ext.
        this.ext = new Ext(this);

        // media client.
        this.mediaClient = new MediaClient(this);

        // dom.
        this.dom = new Dom(this);
      }
    });
  }

  public api(method: string, params: MessageParams = {}, callback?: Function): void {
    if (method === Window.SET_CALLBACK_METHOD && callback) this.callback = callback;
    this.postMessage(method, params);
  }

  private injectStateToApp(apiState: MessageParams): void {
    this.api('fetchPosts', apiState);
    this.api('rank', apiState);
  }

  private postMessage(method: string, params: MessageParams = {}): void {
    const message: MessageClientAndWsApiType = {
      // @ts-ignore
      id: params.id ? params.id : this.id,
      type: PostMessage.CLIENT_TO_WSAPI_TYPE,
      ioType: Sequence.API_SETUP,
      method,
      params,
    };

    this.mediaClient && this.mediaClient.wsClientBeforeFilter({ method, params });
    this.wsApi.postMessage(message);
  }

  private onMessage(e: MessageEvent): void {
    const { currentTarget, data } = e;
    const { type, method, ioType, params, methodBack }: MessageClientAndWsApiType = data;

    if (currentTarget instanceof Worker) {
      if (type === PostMessage.WSAPI_TO_CLIENT_TYPE) {
        const actionType = PostMessage.convertApiToClientActionType(method);
        const { ioType, exeMethod } = PostMessage.getMessageTypes(actionType);
        const state = { ...params, type: actionType };

        // disptch client state.
        this.store.dispatch(state);

        // callback
        this.exePublicCallback(ioType, exeMethod, state);

        if (method === 'WS_CONSTRUCTED') {
          this.conned(this);
          if (this.id === define.APP_TYPES.CLIENT) {
            // @ts-ignore
            const backParams = params.ch ? { ...this.bootOption, ch: params.ch } : this.bootOption;
            this.api('tune', backParams);
          }
        }

        if (this.id === define.APP_TYPES.EXTENSION) {
          // ext
          this.ext && this.ext.to(method, ioType, params);
        }

        // media
        this.mediaClient && this.mediaClient.wsClientAfterFilter({ method, params, state });

        // finnish handle ws api.
        if (this.id === define.APP_TYPES.CLIENT || this.id === define.APP_TYPES.EXTENSION) {
          if (method === `SERVER_TO_API[EMIT]:tune`) {
            this.injectStateToApp(params);
          }
        }
      }
    }
  }

  private onError(e: ErrorEvent): void {
    console.warn(e);
  }

  private exePublicCallback(ioType, exeMethod, state: any): void {
    if (this.callback) {
      if (ioType === Sequence.API_RESPONSE_TYPE_EMIT || ioType === Sequence.API_RESPONSE_TYPE_BROADCAST) {
        this.callback(ioType, exeMethod, state);
      }
    }
  }
}

class Ext {
  id: string;
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

  public to(method: string, ioType: IoTypeValues, params: MessageParams = {}): void {
    if (method.indexOf(Sequence.METHOD_COLON) >= 0) {
      method = method.split(Sequence.METHOD_COLON)[1];
    }
    const message: MessageClientAndExtType = {
      id: this.window.id,
      type: PostMessage.CLIENT_TO_EXT_TYPE,
      ioType,
      method,
      params,
      href: location.href,
    };
    this.postMessage(message);
  }

  public toMediaServer(method: string, params: MessageParams = {}): void {
    const message: MessageMediaClientAndMediaServerType = {
      id: this.window.id,
      type: PostMessage.MEDIA_CLIENT_TO_MEDIA_SERVER_TYPE,
      method,
      params,
    };

    this.postMessage(message);
  }

  private postMessage(message: MessageParams = {}): void {
    if (this.href) {
      window.top.postMessage(message, this.href);
    } else {
      window.postMessage(message, location.href);
    }
  }

  private onMessage(e: MessageEvent): void {
    const { id, href, type, method, ioType, params, methodBack }: MessageClientAndExtType = e.data;
    if (type === PostMessage.EXT_TO_CLIENT_TYPE) {
      switch (method) {
        case PostMessage.HANDLE_EXT_AND_CLIENT:
          this.id = id;

          // @ts-ignore
          this.window.bootOption = new BootOption(id, params.bootOption);
          this.href = href;

          const apiState = new ApiState(this.window.bootOption);
          // @ts-ignore
          const clientState = new ClientState({ ...apiState, ui: params.ui });
          const state = { ...apiState, ...clientState };
          this.window.store.dispatch({ ...state, type: 'EXT_INIT_CLIENT' });
          this.window.api('tune', this.window.bootOption);
          this.to(method, ioType, state);
          break;
        default:
          const isApiMethod = Boolean(Object.keys(Sequence.map).find((apiMethod) => apiMethod === method));
          if (isApiMethod) {
            this.window.api(method, params);
          }
          break;
      }

      // const actionType = PostMessage.convertExtToClientActionType(method);
      this.window.store.dispatch({ ...params, type: method });
    } else if (type === PostMessage.MEDIA_SERVER_TO_MEDIA_CLIENT_TYPE) {
      this.window.mediaClient.onMessage(e, this.window.store.getState());
    }
  }
  private onMessageError(e: ErrorEventInit): void {
    console.warn(e);
  }
}

class MediaClient {
  static get STATUS_SEARCH() {
    return 'SEARCH';
  }
  static get STATUS_STANBY() {
    return 'STANBY';
  }
  static get STATUS_PLAY() {
    return 'PLAY';
  }
  static get STATUS_ENDED() {
    return 'ENDED';
  }
  static get STATUS_BACK() {
    return 'BACK';
  }
  ch: string;
  status:
    | typeof MediaClient.STATUS_SEARCH
    | typeof MediaClient.STATUS_STANBY
    | typeof MediaClient.STATUS_PLAY
    | typeof MediaClient.STATUS_ENDED;
  pointerTime: number = 0.0;
  isPosting: boolean = false;
  isChangeThread: boolean = false;
  window: Window;
  postsTimeline: any[];
  postsTimelineStock: any[];
  constructor(_window: Window) {
    this.window = _window;
    this.status = MediaClient.STATUS_ENDED;
    this.requestServer = this.requestServer.bind(this);
    this.onMessage = this.onMessage.bind(this);
    this.wsClientBeforeFilter = this.wsClientBeforeFilter.bind(this);
    this.wsClientAfterFilter = this.wsClientAfterFilter.bind(this);
    this.setPostsTimelines = this.setPostsTimelines.bind(this);
    this.refrectSelfPost = this.refrectSelfPost.bind(this);
    this.play = this.play.bind(this);
    this.stanby = this.stanby.bind(this);
    this.ended = this.ended.bind(this);

    // timeline datas.
    this.postsTimeline = [];
    this.postsTimelineStock = [];
  }

  private requestServer(method, params = {}) {
    this.window.ext.toMediaServer(method, params);
  }

  public onMessage(e: MessageEvent, state) {
    const { params } = e.data;
    const { currentTime, status, ch } = params;
    const nextStatus = status.toUpperCase();
    switch (nextStatus) {
      case MediaClient.STATUS_PLAY:
        if (state.thread.ch === ch && !this.isChangeThread) {
          if (this.postsTimeline.length > 0 || this.postsTimelineStock.length > 0) {
            // update status.
            this.status = nextStatus;
            this.play(currentTime);
          }
        } else {
          if (this.status !== MediaClient.STATUS_BACK) {
            state.thread.ch = ch;
            this.isChangeThread = true;
            window.talknWindow.dom.onClickCh(state.thread.ch, state.ui, state.thread.hasSlash, 'ToMedia');
          }
        }
        break;
    }
  }

  public wsClientBeforeFilter({ method, params }) {
    if (method === 'post') {
      const state = this.window.store.getState();
      if (state.app.isMediaCh) {
        // 投稿時に自分のpostsのみMediaに反映する
        // 投稿時にメディアの再生秒数を反映する
        params.app.inputCurrentTime = this.pointerTime > 0 ? this.pointerTime : 0;
      }
    }
    return params;
  }

  public wsClientAfterFilter({ method, params, state }) {
    switch (method) {
      case 'SERVER_TO_API[EMIT]:tune':
        this.window.mediaClient = new MediaClient(this.window);
        this.requestServer('searching', {
          // TODO: EXTで複数起動の場合に正しく動作するのか検証
          id: this.window.id,
          ch: state.thread.ch,
          href: location.href,
          audios: state.thread.audios,
          videos: state.thread.videos,
        });
        break;
      case 'SERVER_TO_API[EMIT]:changeThread':
        if (this.window.id === define.APP_TYPES.CLIENT) {
          this.requestServer('searching', {
            // TODO: EXTで複数起動の場合に正しく動作するのか検証
            id: this.window.id,
            ch: state.thread.ch,
            href: location.href,
            audios: state.thread.audios,
            videos: state.thread.videos,
          });
        } else {
          if (state.ui.clicked === 'BackToRootCh') {
            this.status = MediaClient.STATUS_BACK;
          }
        }
        this.isChangeThread = false;
        break;
      case 'SERVER_TO_API[EMIT]:fetchPosts':
        this.setPostsTimelines(state);
        break;
      case 'SERVER_TO_API[BROADCAST]:post':
        if (state.app.isMediaCh) {
          const post = state.posts[0];
          if (post.ch === state.thread.ch) {
            // 自分の投稿したpostの場合
            if (post.uid === state.user.uid) {
              this.refrectSelfPost(post);
            }
          }
        }
        break;
    }
  }

  public setPostsTimelines({ postsTimeline, postsTimelineStock }) {
    // 現在、表示されている投稿
    this.postsTimeline = [...postsTimeline];

    // 現在、表示されていない投稿
    this.postsTimelineStock = [...postsTimelineStock];
  }

  public refrectSelfPost(post) {
    const length = this.postsTimeline.length;
    let pushFlg = false;
    for (let i = 0; i < length; i++) {
      if (post.currentTime < this.postsTimeline[i].currentTime) {
        pushFlg = true;
        this.postsTimeline.splice(i, 0, post);
      }
    }

    if (!pushFlg) {
      // 最末尾にpushする
      this.postsTimeline.push(post);
    }
  }

  public setServerParams(params) {
    this.ch = params.ch;
    this.status = params.status;
    this.pointerTime = params.currentTime;
  }

  public searching() {}

  public stanby() {}

  public ended() {
    const currentTime = Number.MAX_SAFE_INTEGER;
    const length = this.postsTimelineStock.length;
    for (let i = 0; i < length; i++) {
      if (this.postsTimelineStock[i] && this.postsTimelineStock[i].currentTime <= currentTime) {
        this.window.dom.clientAction('NEXT_POSTS_TIMELINE', { postsTimeline: [this.postsTimelineStock[i]] });
      } else {
        break;
      }
    }
  }

  public play(pointerTime = 0) {
    if (this.isPosting) return;
    const timelineLength = this.postsTimelineStock.length;
    this.isPosting = true;

    // Timeline is next.
    if (this.pointerTime <= pointerTime) {
      this.pointerTime = pointerTime;
      while (this.isPosting) {
        if (timelineLength === 0) {
          this.isPosting = false;
        } else if (this.postsTimelineStock[0] && this.postsTimelineStock[0].currentTime <= pointerTime) {
          const addPost = this.postsTimelineStock.shift();
          this.postsTimeline.push(addPost);
          this.window.dom.clientAction('NEXT_POSTS_TIMELINE', { postsTimeline: [addPost] });
        } else {
          this.isPosting = false;
          break;
        }
      }

      // Timeline is prev.
    } else {
      // 処理が終わるまで強制停止
      this.requestServer('pause');
      const postsTimelineAll = this.postsTimeline.concat(this.postsTimelineStock);
      const length = postsTimelineAll.length;
      this.pointerTime = pointerTime;
      this.postsTimeline = [];
      this.postsTimelineStock = [];

      for (let i = 0; i < length; i++) {
        const post = postsTimelineAll[i];
        if (post.currentTime <= this.pointerTime) {
          this.postsTimeline.push(post);
        } else {
          this.postsTimelineStock.push(post);
        }
      }

      // 指定した秒数を経過しているPostをreducerでdispFlgをfalseにしてPostをUnmountする
      this.window.dom.clientAction('CLEAR_POSTS_TIMELINE', {
        postsTimeline: this.postsTimeline,
        postsTimelineStock: this.postsTimelineStock,
      });

      // 処理が終わったので再生開始
      this.requestServer('play');
    }
    this.isPosting = false;
  }
}

class Dom extends TalknComponent<{}, {}> {
  id: string = 'talkn';
  window: Window;
  html: HTMLElement;
  body: HTMLBodyElement;
  talkn: HTMLDivElement;
  posts: HTMLOListElement;
  timeMerkerLists: NodeList;
  scrollHeight: number = 0;
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
    return document.querySelector('[data-component-name=Posts]');
  }
  static get selectAllPost() {
    return document.querySelectorAll('[data-component-name=Post]');
  }
  static get selectAllTimeMarkerList() {
    return document.querySelectorAll('li[data-component-name=TimeMarkerList]');
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
    this.getPostsClientHeight = this.getPostsClientHeight.bind(this);

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
      this.clientAction('ON_SCROLL_UPDATE_TIME_MARKER', { uiTimeMarker });
    }
  }

  private resizeStartWindow(ui) {
    ui.isTransition = false;
    this.clientAction('ON_RESIZE_START_WINDOW', { ui });
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
        ui.screenSize = Ui.getScreenSize();
        ui.isTransition = true;
        clientStore.ui = ui;
        this.clientAction('ON_RESIZE_END_WINDOW', clientStore);
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
    const postCntKey = app.dispThreadType === App.dispThreadTypeMulti ? 'multiPostCnt' : 'postCnt';

    if (conf.findOnePostCnt <= dispPostCnt && dispPostCnt < conf.findOneLimitCnt) {
      if (thread[postCntKey] > conf.findOnePostCnt) {
        if (dispPostCnt < thread[postCntKey]) {
          this.api('getMore');
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
  getPostsClientHeight() {
    const postsClient = Dom.selectPosts;
    return postsClient ? postsClient.clientHeight : 0;
  }
  removeTalknLoading() {
    this.talkn.style['display'] = 'initial';
    this.talkn.style['background-image'] = 'none';
    this.talkn.style['animation-name'] = 'none';
  }

  lockWindow() {
    const overflow = 'hidden';
    this.html.style.overflow = overflow;
    this.body.style.overflow = overflow;
    this.talkn.style.overflow = overflow;
    return window.scrollY;
  }

  unlockWindow() {
    const overflow = 'inherit';
    this.html.style.overflow = overflow;
    this.body.style.overflow = overflow;
    this.talkn.style.overflow = overflow;
  }
}

const WsClientResponseCallbacks = {
  CONSTRUCTED: (_window, parama: BootOption): BootOption => {
    return parama.ch ? { ..._window.bootOption, ch: parama.ch } : _window.bootOption;
  },
};
