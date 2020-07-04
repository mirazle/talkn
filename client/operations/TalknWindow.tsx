import React from "react";
import PostMessage from "common/PostMessage";
import TalknComponent from "client/components/TalknComponent";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Sequence from "api/Sequence";
import { default as PostsSchems } from "api/store/Posts";
import App from "api/store/App";
import ClientState from "client/store/";
import Ui from "client/store/Ui";
import UiTimeMarker from "client/store/UiTimeMarker";
import conf from "client/conf";
import Container from "client/container/";
import apiStore from "api/store/apiStore";
import clientStore from "client/store/clientStore";

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
    document.querySelectorAll("[data-component-name=Post]").forEach((post) => {
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

  id: string = "talkn";
  bootOption: any;
  appType: string;
  resizeTimer: any = null;
  scrollTop: number = 0;
  clientHeight: number = 0;
  scrollHeight: number = 0;
  isScrollBottom: boolean = false;
  isAnimateScrolling: boolean = false;
  parentUrl: string = location.href;
  extUiParams: any = {};
  private dom: any;
  private stores: any;
  constructor(props = null) {
    super(props);
    this.stores = { client: clientStore(), api: apiStore() };
    this.load = this.load.bind(this);
    this.resize = this.resize.bind(this);
    this.scroll = this.scroll.bind(this);
    this.parentExtTo = this.parentExtTo.bind(this);
    this.listenAsyncBoot = this.listenAsyncBoot.bind(this);
    this.exeGetMore = this.exeGetMore.bind(this);
    this.resizeStartWindow = this.resizeStartWindow.bind(this);
    this.resizeEndWindow = this.resizeEndWindow.bind(this);
    this.removeTalknBg = this.removeTalknBg.bind(this);
    this.dom = {};
    this.dom.talkn = document.querySelector(`div#${this.id}`);
    this.dom.html = document.querySelector(`html`);
    this.dom.body = document.querySelector(`body`);
    this.dom.posts = document.querySelector(`[data-component-name=Posts]`);
    this.listenAsyncBoot();
  }

  createClientState(state) {
    if (this.stores.client !== null) {
      this.stores.client = new ClientState(state);
    }
  }

  setupWindow() {
    /*
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
      */
  }

  listenAsyncBoot() {
    const bootPromise: any = [];
    bootPromise.push(
      new Promise((loadResolve) => {
        if (document.readyState === "complete") {
          this.load(loadResolve);
        } else {
          window.addEventListener("load", (ev) => {
            this.load(loadResolve);
          });
        }
      })
    );

    bootPromise.push(
      new Promise((messageResolve) => {
        window.addEventListener("message", (e) => {
          switch (e.data.type) {
            case PostMessage.EXT_TO_CLIENT_TYPE:
              switch (e.data.method) {
                case PostMessage.HANDLE_EXT_AND_CLIENT:
                  this.parentUrl = e.origin;
                  this.parentExtTo(PostMessage.HANDLE_EXT_AND_CLIENT, conf);
                  this.extUiParams = e.data.params.ui;
                  break;
                default:
                  const clientState = this.stores.client.getState();
                  const actionType = Sequence.convertApiToClientActionType(e.data.method);
                  const dispatchState = { ...clientState, ...e.data.params };
                  this.stores.client.dispatch({ ...dispatchState, type: actionType });
                  break;
              }
              break;
            case PostMessage.API_TO_CLIENT_TYPE:
              if (e.data.method === PostMessage.HANDLE_API_AND_CLIENT) {
                this.bootOption = e.data.params;
                this.coreApi(PostMessage.HANDLE_API_AND_CLIENT);
                messageResolve(e);
              } else {
                const actionType = Sequence.convertApiToClientActionType(e.data.method);
                const apiState = e.data.params;

                if (actionType === "API_TO_CLIENT[REQUEST]:tune") {
                  const initClientState = { ...apiState, ...this.extUiParams, type: actionType };
                  const clientState = new ClientState(initClientState);
                  this.stores.client.dispatch({ ...clientState, type: actionType });
                } else {
                  this.stores.client.dispatch({ ...apiState, type: actionType });
                }
              }
              break;
            case PostMessage.MEDIA_TO_CLIENT_TYPE:
              this.stores.api.dispatch({
                type: e.data.method,
                postsTimeline: e.data.params.postsTimeline,
              });
              this.stores.client.dispatch({ type: e.data.method });
              break;
          }
          if (e.origin === "https://www.youtube.com") {
          }
        });
      })
    );

    window.addEventListener("resize", this.resize);
    window.addEventListener("scroll", this.scroll);

    Promise.all(bootPromise).then((bootParams: any) => {
      ReactDOM.render(
        <Provider store={this.stores.client}>
          <Container />
        </Provider>,
        document.querySelector(`div#${this.id}`),
        () => {}
      );
    });
  }

  load(resolve) {
    this.setupWindow();
    resolve(true);
  }

  ready(ev) {}

  resize(ev) {
    if (window.talknWindow) {
      const { app, ui } = this.clientState;
      if (this.resizeTimer === null) {
        this.resizeStartWindow(ui);
        this.resizeTimer = setTimeout(() => {
          this.resizeEndWindow(ui);
        }, TalknWindow.resizeInterval);
      }
    }
  }

  scroll(ev) {
    const body = document.querySelector("body");
    const scrollTop = window.scrollY;
    const clientHeight = window.innerHeight;
    const scrollHeight = body.scrollHeight;
    this.onScroll({ scrollTop, clientHeight, scrollHeight });
  }

  exeGetMore(clientState) {
    const { thread, app } = this.clientState;
    const posts = PostsSchems.getDispPosts(this.clientState);
    const dispPostCnt = posts.length;
    const postCntKey = app.dispThreadType === App.dispThreadTypeMulti ? "multiPostCnt" : "postCnt";

    if (conf.findOnePostCnt <= dispPostCnt && dispPostCnt < conf.findOneLimitCnt) {
      if (thread[postCntKey] > conf.findOnePostCnt) {
        if (dispPostCnt < thread[postCntKey]) {
          this.coreApi("getMore");
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
    ui.isTransition = false;
    this.clientAction("ON_RESIZE_START_WINDOW", { ui });
  }

  resizeEndWindow(ui) {
    if (ui) {
      clearTimeout(this.resizeTimer);
      this.resizeTimer = null;
      const clientStore = window.talknWindow.clientStore.getState();
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

  removeTalknBg() {
    this.dom.talkn.style["display"] = "initial";
    this.dom.talkn.style["background-image"] = "none";
    this.dom.talkn.style["animation-name"] = "none";
  }

  lockWindow() {
    console.log("---- LOCK");
    const overflow = "hidden";
    this.dom.html.style.overflow = overflow;
    this.dom.body.style.overflow = overflow;
    this.dom.talkn.style.overflow = overflow;
    return window.scrollY;
  }

  unlockWindow() {
    console.log("---- UNLOCK");
    const overflow = "inherit";
    this.dom.html.style.overflow = overflow;
    this.dom.body.style.overflow = overflow;
    this.dom.talkn.style.overflow = overflow;
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
          type: PostMessage.CLIENT_TO_EXT_TYPE,
          method,
          params,
        },
        this.parentUrl
      );
    }
  }
}
