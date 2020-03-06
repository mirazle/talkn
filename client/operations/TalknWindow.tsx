import React from "react";
import Message from "common/Message";
import TalknComponent from "client/components/TalknComponent";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Schema from "api/store/Schema";
import Sequence from "api/Sequence";
import { default as PostsSchems } from "api/store/Posts";
import App from "api/store/App";
import Ui from "client/store/Ui";
import UiTimeMarker from "client/store/UiTimeMarker";
import conf from "client/conf";
import TalknMedia from "client/operations/TalknMedia";
import Container from "client/container/";
import apiStore from "api/store/apiStore";
import clientStore from "client/store/clientStore";
import storage from "client/mapToStateToProps/storage";

export default class TalknWindow extends TalknComponent<{}, {}> {
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

  id: string = "talkn1";
  bootOption: any;
  appType: string;
  resizeTimer: any = null;
  parentUrl: string;
  scrollTop: number = 0;
  clientHeight: number = 0;
  scrollHeight: number = 0;
  isScrollBottom: boolean = false;
  isAnimateScrolling: boolean = false;
  private dom: any;
  private stores: any;
  constructor(props = null) {
    super(props);
    this.stores = { client: clientStore(), api: apiStore() };
    this.load = this.load.bind(this);
    this.resize = this.resize.bind(this);
    this.scroll = this.scroll.bind(this);
    this.onMessage = this.onMessage.bind(this);
    this.parentExtTo = this.parentExtTo.bind(this);
    this.listenAsyncBoot = this.listenAsyncBoot.bind(this);
    this.exeGetMore = this.exeGetMore.bind(this);
    this.resizeStartWindow = this.resizeStartWindow.bind(this);
    this.resizeEndWindow = this.resizeEndWindow.bind(this);
    this.dom = {};
    this.dom.talkn1 = document.querySelector("#talkn1");
    this.dom.html = document.querySelector("html");
    this.dom.body = document.querySelector("body");
    this.dom.posts = document.querySelector("[data-component-name=Posts]");

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
              this.coreApi(Message.connectionMethod);
              messageResolve(e);
            } else {
              const apiState = e.data.params;
              const clientState = this.stores.client.getState();
              const actionType = Sequence.convertApiToClientActionType(e.data.method);
              const dispatchState = { ...clientState, ...apiState };
              this.stores.api = apiStore(apiState);
              this.stores.client.dispatch({ ...dispatchState, type: actionType });
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
        <Provider store={this.stores.client}>
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
            const { ui } = window.talknWindow.apiStore.getState();
            this.onClickCh(e.data.params.thread.ch, ui, false, e.data.method);
            TalknMedia.init("TalknWindow");
            this.clientAction("START_LINK_MEDIA");
            window.talknMedia = new TalknMedia();
          }
          break;
        case "playMedia":
          const playMediaState = window.talknWindow.apiStore.getState();
          const ch =
            e.data.params.thread && e.data.params.thread.ch ? e.data.params.thread.ch : playMediaState.thread.ch;
          const isExistThreadData = playMediaState.threads[ch];

          if (log && window.talknMedia)
            console.log("========================= playMedia " + window.talknMedia.currentTime);

          if (window.talknMedia === undefined) {
            TalknMedia.init("TalknWindow");
            this.clientAction("START_LINK_MEDIA");
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
          const delegateState = window.talknWindow.apiStore.getState();
          let { app } = delegateState;
          app = { ...app, ...e.data.params };
          this.clientAction("DELEGATE_POST", app);
          break;
        default:
          break;
      }
    }
  }

  load(resolve) {
    /*
    this.scrollHeight = document.querySelector("body").scrollHeight;
    this.scrollTop = window.scrollY;
    this.innerHeight = window.innerHeight;
*/
    this.setupWindow();
    resolve(true);
  }

  ready(ev) {}

  resize(ev) {
    if (window.talknWindow) {
      const { ui } = this.clientState;
      if (ui.extensionMode === "EXT_BOTTOM" || ui.extensionMode === "EXT_MODAL") {
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
    const body = document.querySelector("body");
    const scrollTop = window.scrollY;
    const clientHeight = body.offsetHeight;
    const scrollHeight = body.scrollHeight;
    this.onScroll({ scrollTop, clientHeight, scrollHeight });
  }

  exeGetMore(clientState) {
    const { thread, app } = this.apiState;
    const posts = PostsSchems.getDispPosts(this.apiState);
    const dispPostCnt = posts.length;
    const postCntKey = app.dispThreadType === App.dispThreadTypeMulti ? "multiPostCnt" : "postCnt";
    if (conf.findOnePostCnt <= dispPostCnt && dispPostCnt < conf.findOneLimitCnt) {
      if (thread[postCntKey] > conf.findOnePostCnt) {
        if (dispPostCnt < thread[postCntKey]) {
          this.coreApi("getMore", {});
        }
      }
    }
  }

  updateUiTimeMarker(scrollTop) {
    const timeMarkers: any = document.querySelectorAll("li[data-component-name=TimeMarkerList]");
    const uiTimeMarker = UiTimeMarker.generate(scrollTop, timeMarkers);
    if (uiTimeMarker.list.length > 0) {
      this.clientAction("ON_SCROLL_UPDATE_TIME_MARKER", { uiTimeMarker });
    }
  }

  resizeStartWindow(ui) {
    ui.width = window.innerWidth;
    ui.height = window.innerHeight;
    ui.isTransition = false;
    ui.screenMode = Ui.getScreenMode();
    this.clientAction("ON_RESIZE_START_WINDOW", { ui });
  }

  resizeEndWindow() {
    clearTimeout(this.resizeTimer);
    this.resizeTimer = null;
    const clientStore = window.talknWindow.clientStore.getState();
    const ui = clientStore.ui;
    ui.width = window.innerWidth;
    ui.height = window.innerHeight;
    ui.screenMode = Ui.getScreenMode();
    this.clientAction("ON_RESIZE_END_WINDOW", { ui });
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
  /*
  parentCoreApi(method, params = {}, params2 = null) {
    if (params2 && typeof params2 !== "function") {
      throw "STOP! " + method + " " + params2;
    }
    window.postMessage(
      {
        type: Message.appToCoreApi,
        method,
        params
      },
      location.href
    );
  }
  */
}
