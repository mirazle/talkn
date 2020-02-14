import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import define from "common/define";
import Schema from "common/schemas/Schema";
import Message from "common/Message";
import { default as PostsSchems } from "common/schemas/state/Posts";
import App from "common/schemas/state/App";
import State from "common/schemas/state";
// import BootOption from "common/schemas/state/BootOption";
import UiTimeMarker from "common/schemas/state/UiTimeMarker";
import conf from "client/conf";
import actionWrap from "client/container/util/actionWrap";
// import TalknSession from "client/operations/TalknSession";
// import TalknAPI from "client/operations/TalknAPI";
import TalknMedia from "client/operations/TalknMedia";
import Container from "client/container/";
import configureStore from "client/store/configureStore";
import handles from "api/actions/handles";
import storage from "client/mapToStateToProps/storage";

export default class TalknWindow {
  static get resizeInterval() {
    return 300;
  }
  static getPostsClientHeight() {
    const postsClient = document.querySelector("[data-component-name=Posts]");
    return postsClient ? postsClient.clientHeight : 0;
  }
  static getPostsHeight() {
    let postsHeight = 0;
    document.querySelectorAll("[data-component-name=Post]").forEach(post => {
      postsHeight += post.clientHeight;
    });
    return postsHeight;
  }

  static getLastPostHeight() {
    const posts: any = document.querySelector("[data-component-name=Posts]");
    if (posts && posts.lastChild && posts.lastChild.clientHeight) {
      return posts.lastChild.clientHeight;
    }
    return 0;
  }

  id: string;
  bootOption: any;
  appType: string;
  resizeTimer: any;
  parentUrl: string;
  threadHeight: any;
  innerHeight: any;
  scrollHeight: any;
  isLoaded: any;
  isMessageed: boolean;
  isExistParentWindow: boolean;
  isAnimateScrolling: boolean;
  isScrollBottom: boolean;
  dom: any;
  apiState: any;
  constructor() {
    this.id = "talkn1";
    this.resizeTimer = null;
    this.parentUrl = null;
    this.threadHeight = 0;
    this.innerHeight = 0;
    this.scrollHeight = 0;

    this.isLoaded = false;
    this.isMessageed = false;
    this.isExistParentWindow = false;
    this.isAnimateScrolling = false;
    this.isScrollBottom = true;

    this.load = this.load.bind(this);
    this.resize = this.resize.bind(this);
    this.scroll = this.scroll.bind(this);
    this.onMessage = this.onMessage.bind(this);
    this.parentExtTo = this.parentExtTo.bind(this);
    this.parentCoreApi = this.parentCoreApi.bind(this);

    this.resizeStartWindow = this.resizeStartWindow.bind(this);
    this.resizeEndWindow = this.resizeEndWindow.bind(this);
    this.setIsScrollBottom = this.setIsScrollBottom.bind(this);

    this.apiState = configureStore();
    this.dom = {};
    this.dom.html = document.querySelector("html");
    this.dom.body = document.querySelector("body");
    this.dom.talkn1 = document.querySelector("#talkn1");
    this.listenAsyncBoot();
  }

  setupWindow() {
    const html = document.querySelector("html");
    html.style.cssText +=
      "" +
      "width 100% !important;" +
      "height: 100% !important;" +
      "margin: 0px auto !important;" +
      "padding-top: 0px !important;";

    const body = document.querySelector("body");
    body.style.cssText +=
      "" +
      "width 100% !important;" +
      "height: 100% !important;" +
      "margin: 0px auto !important;" +
      "visibility: visible !important;" +
      "opacity: 1 !important;";
    //if( !window.name ) window.name = "talkn";
  }

  listenAsyncBoot() {
    const bootPromise: any = [];
    bootPromise.push(
      new Promise(loadResolve => {
        if (document.readyState === "complete") {
          this.load(loadResolve);
        } else {
          window.addEventListener("load", ev => {
            this.load(loadResolve);
          });
        }
      })
    );

    bootPromise.push(
      new Promise(messageResolve => {
        window.addEventListener("message", e => {
          if (e.data && e.data.type === Message.coreApiToApp) {
            if (e.data.method === Message.connectionMethod) {
              this.bootOption = e.data.params;
              this.parentCoreApi(Message.connectionMethod);
              messageResolve(e);
            } else {
              this.apiState.dispatch({ ...e.data.params, type: e.data.method });
            }
          }
          if (e.origin === "https://www.youtube.com") {
          }
        });
      })
    );

    window.addEventListener("resize", this.resize);
    window.addEventListener("scroll", this.scroll);
    window.talknMedia = new TalknMedia();

    Promise.all(bootPromise).then((bootParams: any) => {
      ReactDOM.render(
        <Provider store={this.apiState}>
          <Container />
        </Provider>,
        document.getElementById(this.id),
        () => {}
      );
    });
  }

  onMessage(e) {
    if (e.data.type === "talkn") {
      const log = false;
      switch (e.data.method) {
        case "bootExtension":
          this.parentUrl = e.data.href;
          this.parentExtTo("bootExtension", conf);
          // resolve(e.data.params);
          break;
        case "findMediaCh":
          if (e.data.params.thread && e.data.params.thread.ch) {
            if (log) {
              console.log("============== findMediaCh A " + e.data.params.thread.ch);
            }
            actionWrap.onClickCh(e.data.params.thread.ch, false, e.data.method);
            TalknMedia.init("TalknWindow");
            window.talknWindow.parentCoreApi("startLinkMedia", e.data.params);
            window.talknMedia = new TalknMedia();
          }
          break;
        case "playMedia":
          const playMediaState = window.talknWindow.apiState.getState();
          const ch =
            e.data.params.thread && e.data.params.thread.ch ? e.data.params.thread.ch : playMediaState.thread.ch;
          const isExistThreadData = playMediaState.threads[ch];

          if (log && window.talknMedia)
            console.log("========================= playMedia " + window.talknMedia.currentTime);

          if (window.talknMedia === undefined) {
            TalknMedia.init("TalknWindow");
            window.talknWindow.parentCoreApi("startLinkMedia", e.data.params);
            window.talknMedia = new TalknMedia();
            if (log) console.log("============== playMedia A " + window.talknMedia.currentTime);
          }

          if (window.talknMedia && Schema.isSet(window.talknMedia.currentTime) && window.talknMedia.started === false) {
            window.talknMedia.currentTime = window.talknMedia.getCurrentTime(e.data.params.currentTime);
            if (log) console.log("============== playMedia B " + window.talknMedia.currentTime);
          }

          if (
            e.data.params.thread &&
            e.data.params.thread.ch &&
            window.talknMedia &&
            window.talknMedia.timeline &&
            window.talknMedia.timeline.length === 0 &&
            window.talknMedia.started === false &&
            isExistThreadData
          ) {
            const timeline = storage.getStoragePostsTimeline(ch);

            if (log) console.log("============== playMedia C " + ch);

            window.talknMedia.setTimeline(timeline);
          }

          if (
            (window.talknMedia && window.talknMedia.timeline && isExistThreadData) ||
            e.data.params.event === "seeked"
            //window.talknMedia.timeline.length > 0
          ) {
            if (log) console.log("============== playMedia D");
            if (log) console.log(window.talknMedia.timeline);
            if (log) console.log("============== ");
            window.talknMedia.proccess(e.data.params.currentTime);
          }

          break;
        case "endMedia":
          if (e.data.params.playCnt > 0) {
            window.talknMedia.endedFunc();
          }
          break;
        case "delegatePost":
          const delegateState = window.talknWindow.apiState.getState();
          let { app } = delegateState;
          app = { ...app, ...e.data.params };
          window.talknWindow.parentCoreApi("delegatePost", app);
          break;
        default:
          break;
      }
    }
  }

  load(resolve) {
    this.threadHeight = document.querySelector("html").scrollHeight;
    this.scrollHeight = window.scrollY;
    this.innerHeight = window.innerHeight;
    this.setupWindow();
    resolve(true);
  }

  ready(ev) {}

  resize(ev) {
    if (window.talknWindow) {
      const app = window.talknWindow.apiState.getState().app;
      if (app.extensionMode === "EXT_BOTTOM" || app.extensionMode === "EXT_MODAL") {
        if (this.resizeTimer === null) {
          this.resizeTimer = setTimeout(() => {
            this.resizeEndWindow();
          }, TalknWindow.resizeInterval);
        }
      } else {
        if (this.resizeTimer === null) {
          //this.resizeStartWindow(app);
          this.resizeTimer = setTimeout(app => {
            this.resizeEndWindow();
          }, TalknWindow.resizeInterval);
        }
      }
    }
  }

  scroll(ev) {
    const state = window.talknWindow.apiState.getState();
    const { app, thread, uiTimeMarker } = state;
    if (app.isOpenNewPost) {
      window.talknWindow.parentCoreApi("closeNewPost");
    }

    const newUiTimeMarker = UiTimeMarker.update(window.scrollY, uiTimeMarker);
    if (uiTimeMarker.now.label !== newUiTimeMarker.now.label) {
      window.talknWindow.parentCoreApi("onScrollUpdateTimeMarker", newUiTimeMarker);
      // this.apiState.dispatch({ ...e.data.params, type: "onScrollUpdateTimeMarker" });
    }

    window.talknWindow.setIsScrollBottom(app);
    if (window.scrollY === 0) {
      if (thread.postCnt > conf.findOnePostCnt) {
        const timeMarkerList: any = document.querySelector("[data-component-name=TimeMarkerList]");
        if (timeMarkerList && timeMarkerList.style) {
          timeMarkerList.style.opacity = 0;
        }
        window.talknWindow.exeGetMore(state);
      }
    }
  }

  exeGetMore(state) {
    const { thread, app } = state;
    const posts = PostsSchems.getDispPosts(state);
    const dispPostCnt = posts.length;
    const postCntKey = app.dispThreadType === App.dispThreadTypeMulti ? "multiPostCnt" : "postCnt";
    if (conf.findOnePostCnt <= dispPostCnt && dispPostCnt < conf.findOneLimitCnt) {
      if (thread[postCntKey] > conf.findOnePostCnt) {
        if (dispPostCnt < thread[postCntKey]) {
          window.talknWindow.parentCoreApi("getMore");
        }
      }
    }
  }

  setIsScrollBottom(app, isScrollBottom = true) {
    if (app.extensionMode === App.extensionModeExtNoneLabel) {
      if (app.screenMode === App.screenModeLargeLabel) {
        this.isScrollBottom = isScrollBottom;
      } else {
        // ここがスマホブラウザだと正しく取得されていない模様
        const htmlScrollHeight = document.querySelector("html").scrollHeight;
        this.innerHeight = window.innerHeight;
        this.scrollHeight = window.scrollY;
        const bodyScrollHeight = document.querySelector("body").scrollTop;
        this.isScrollBottom = htmlScrollHeight === this.innerHeight + this.scrollHeight;
      }
    } else {
      this.isScrollBottom = isScrollBottom;
    }
  }

  updateUiTimeMarker(scrollTop) {
    const timeMarkers: any = document.querySelectorAll("li[data-component-name=TimeMarkerList]");
    const uiTimeMarker = UiTimeMarker.generate(scrollTop, timeMarkers);
    if (uiTimeMarker.list.length > 0) {
      window.talknWindow.parentAction("onScrollUpdateTimeMarker", uiTimeMarker);
    }
  }

  resizeStartWindow(app) {
    app.width = window.innerWidth;
    app.height = window.innerHeight;
    app.isTransition = false;
    app.screenMode = App.getScreenMode();
    const setting = window.talknWindow.apiState.getState().setting;
    window.talknWindow.parentCoreApi("onResizeStartWindow", { app, setting });
  }

  resizeEndWindow() {
    clearTimeout(this.resizeTimer);
    this.resizeTimer = null;
    const apiState = window.talknWindow.apiState.getState();
    const app = apiState.app;
    app.width = window.innerWidth;
    app.height = window.innerHeight;
    app.screenMode = App.getScreenMode();

    const setting = apiState.setting;
    const bootOption = apiState.bootOption;
    window.talknWindow.parentCoreApi("onResizeEndWindow", { app, setting, bootOption });
  }

  animateScrollTo(to = 9999999, duration = 400, callback = () => {}) {
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

  lockWindow() {
    const overflow = "hidden";
    this.dom.html.style.overflow = overflow;
    this.dom.body.style.overflow = overflow;
    this.dom.talkn1.style.overflow = overflow;
    return window.scrollY;
  }

  unlockWindow() {
    const overflow = "inherit";
    this.dom.html.style.overflow = overflow;
    this.dom.body.style.overflow = overflow;
    this.dom.talkn1.style.overflow = overflow;
  }

  appendRoot() {
    const container = document.createElement("talkn");
    container.id = this.id;
    document.body.appendChild(container);
    return true;
  }

  parentExtTo(method, params) {
    if (this.parentUrl) {
      window.top.postMessage(
        {
          type: "talknExt",
          method,
          params
        },
        this.parentUrl
      );
    }
  }

  parentCoreApi(method, params1 = null, params2 = null) {
    if (params2) {
    }
    window.postMessage(
      {
        type: Message.appToCoreApi,
        method,
        params1,
        params2
        //        arg
      },
      location.href
    );
  }

  parentAction(method, params1 = null, params2 = null) {
    if (handles[method]) {
      const action = handles[method](params1, params2);
      this.apiState.dispatch(action);
    }

    window.postMessage(
      {
        type: Message.appToCoreApi,
        method,
        params1,
        params2
      },
      location.href
    );
  }
}
