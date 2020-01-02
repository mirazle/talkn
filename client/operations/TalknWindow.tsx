import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import define from "common/define";
import Schema from "common/schemas/Schema";
import App from "common/schemas/state/App";
import State from "common/schemas/state";
import BootOption from "common/schemas/state/BootOption";
import conf from "client/conf";
import actionWrap from "client/container/util/actionWrap";
import TalknSession from "client/operations/TalknSession";
import TalknAPI from "client/operations/TalknAPI";
import TalknMedia from "client/operations/TalknMedia";
import configureStore from "client/store/configureStore";
import Container from "client/container/";
import storage from "client/mapToStateToProps/storage";

export default class TalknWindow {
  static get resizeInterval() {
    return 300;
  }
  static getAppType() {
    return window.name === define.APP_TYPES.EXTENSION ? define.APP_TYPES.EXTENSION : define.APP_TYPES.PORTAL;
  }
  static getInitialApp(bootOption) {
    let initialApp: any = {};
    if (bootOption.extensionMode) {
      switch (bootOption.extensionMode) {
        case App.extensionModeExtIncludeLabel:
          initialApp.width = bootOption.extensionWidth;
          initialApp.height = bootOption.extensionOpenHeight;
          break;
        case App.extensionModeExtModalLabel:
          const connection = bootOption.href.replace("https:/", "").replace("http:/", "");
          initialApp.hasslash = connection.lastIndexOf("/") === connection.length - 1;
          break;
      }
    }
    return initialApp;
  }
  static getHasSlach(bootOption) {
    if (bootOption.href) {
      const connection = bootOption.href.replace("https:/", "").replace("http:/", "");
      return connection.lastIndexOf("/") === connection.length - 1;
    } else {
      return bootOption.hasslash ? Schema.getBool(bootOption.hasslash) : false;
    }
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
  talknIndex: number;
  appType: string;
  talknAPI: any;
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
  constructor(talknIndex) {
    this.id = "talkn1";
    this.talknIndex = talknIndex;
    this.appType = TalknWindow.getAppType();
    this.talknAPI = {};
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
    this.message = this.message.bind(this);
    this.parentTo = this.parentTo.bind(this);

    this.resizeStartWindow = this.resizeStartWindow.bind(this);
    this.resizeEndWindow = this.resizeEndWindow.bind(this);
    this.setIsScrollBottom = this.setIsScrollBottom.bind(this);

    this.dom = {};
    this.dom.html = document.querySelector("html");
    this.dom.body = document.querySelector("body");
    this.dom.talkn1 = document.querySelector("#talkn1");

    window.talknAPI = window.__talknAPI__[window.talknIndex];

    this.listenAsyncBoot();
  }

  setupWindow(talknIndex = 0) {
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
    const bootPromises: any = [];

    bootPromises.push(
      new Promise(resolve => {
        const store = configureStore();
        this.talknAPI = new TalknAPI(this.talknIndex, resolve);
        this.talknAPI.connectioned(this.talknIndex, store);
      })
    );

    bootPromises.push(
      new Promise(resolve => {
        window.addEventListener("load", ev => {
          this.load(ev, resolve);
        });
      })
    );

    switch (this.appType) {
      case define.APP_TYPES.PORTAL:
        window.addEventListener("resize", this.resize);
        window.addEventListener("scroll", this.scroll);
        window.addEventListener("message", ev => {
          if (ev.origin === "https://www.youtube.com") {
            console.log(ev);
          }
        });
        break;
      case define.APP_TYPES.EXTENSION:
        bootPromises.push(
          new Promise(resolve => {
            window.addEventListener("message", ev => {
              this.message(ev, resolve);
            });
          })
        );
        window.addEventListener("resize", this.resize);
        window.addEventListener("scroll", this.scroll);
        window.talknMedia = new TalknMedia();
        break;
    }

    Promise.all(bootPromises).then((bootParams: any) => {
      let script1: Element;
      let script2: Element;
      let script: Element;
      if (conf.env === define.DEVELOPMENT) {
        script1 = document.querySelector(
          `script[src='//${conf.hostName}:${define.PORTS.DEVELOPMENT}/${define.talknClientJs}']`
        );
        script2 = document.querySelector(`script[src='https://${conf.clientURL}']`);
      } else {
        script1 = document.querySelector(`script[src='${conf.clientPath.replace(/\/$/, "")}']`);
        script2 = document.querySelector(`script[src='https:${conf.clientPath.replace(/\/$/, "")}']`);
      }
      script = script1 ? script1 : script2;

      const scriptOption = BootOption.rebuildAttributes(script.attributes);
      let bootOption: any = bootParams[1] ? { ...scriptOption, ...bootParams[1] } : scriptOption;
      bootOption = bootParams[2] ? { ...bootOption, ...bootParams[2] } : bootOption;
      bootOption.hasslash = TalknWindow.getHasSlach(bootOption);
      this.boot(bootOption);
    });
  }

  boot(bootOption) {
    const connection = bootOption.connection;
    const initialApp = TalknWindow.getInitialApp(bootOption);

    const caches = TalknSession.getCaches(connection);

    const state = new State(this.talknIndex, window, bootOption, initialApp, caches);
    this.talknAPI.booted(state, connection);
    this.talknAPI.initClientState(state);

    ReactDOM.render(
      <Provider store={this.talknAPI.store}>
        <Container talknAPI={this.talknAPI} />
      </Provider>,
      document.getElementById(this.id),
      () => {}
    );
    return true;
  }

  message(e, resolve) {
    if (e.data.type === "talkn") {
      const log = false;
      switch (e.data.method) {
        case "bootExtension":
          this.parentUrl = e.data.href;
          this.parentTo("bootExtension", conf);
          resolve(e.data.params);
          break;
        case "findMediaConnection":
          if (e.data.params.thread && e.data.params.thread.connection) {
            if (log) console.log("============== findMediaConnection A " + e.data.params.thread.connection);
            actionWrap.onClickConnection(e.data.params.thread.connection, false, e.data.method);
            TalknMedia.init("TalknWindow");
            window.talknAPI.startLinkMedia(e.data.params);
            window.talknMedia = new TalknMedia();
          }
          break;
        case "playMedia":
          const connection = e.data.params.thread.connection;
          const isExistThreadData = window.talknAPI.store.getState().threads[connection];

          if (log && window.talknMedia)
            console.log("========================= playMedia " + window.talknMedia.currentTime);

          if (window.talknMedia === undefined) {
            TalknMedia.init("TalknWindow");
            window.talknAPI.startLinkMedia(e.data.params);
            window.talknMedia = new TalknMedia();
            if (log) console.log("============== playMedia A " + window.talknMedia.currentTime);
          }

          if (window.talknMedia && Schema.isSet(window.talknMedia.currentTime) && window.talknMedia.started === false) {
            window.talknMedia.currentTime = window.talknMedia.getCurrentTime(e.data.params.currentTime);
            if (log) console.log("============== playMedia B " + window.talknMedia.currentTime);
          }

          if (
            e.data.params.thread &&
            e.data.params.thread.connection &&
            window.talknMedia &&
            window.talknMedia.timeline &&
            window.talknMedia.timeline.length === 0 &&
            window.talknMedia.started === false &&
            isExistThreadData
          ) {
            const timeline = storage.getStoragePostsTimeline(connection);

            if (log) console.log("============== playMedia C " + connection);

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
          let { app } = window.talknAPI.store.getState();
          app = { ...app, ...e.data.params };
          window.talknAPI.delegatePost(app);
          break;
        default:
          if (
            typeof window.talknAPI !== "undefined" &&
            window.talknAPI[e.data.method] &&
            typeof window.talknAPI[e.data.method] === "function"
          ) {
            window.talknAPI[e.data.method](e.data.params);
          }
          break;
      }
    }
  }

  load(ev, resolve) {
    this.threadHeight = document.querySelector("html").scrollHeight;
    this.scrollHeight = window.scrollY;
    this.innerHeight = window.innerHeight;
    this.setupWindow();
    resolve(true);
  }

  ready(ev) {}

  resize(ev) {
    if (window.talknAPI) {
      const app = window.talknAPI.store.getState().app;
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
    const { app } = window.talknAPI.store.getState();
    if (app.isOpenNewPost) {
      window.talknAPI.closeNewPost();
    }

    this.setIsScrollBottom(app);
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

  resizeStartWindow(app) {
    app.width = window.innerWidth;
    app.height = window.innerHeight;
    app.isTransition = false;
    app.screenMode = App.getScreenMode();
    const setting = window.talknAPI.store.getState().setting;
    window.talknAPI.onResizeStartWindow({ app, setting });
  }

  resizeEndWindow() {
    clearTimeout(this.resizeTimer);
    this.resizeTimer = null;

    const app = window.talknAPI.store.getState().app;
    app.width = window.innerWidth;
    app.height = window.innerHeight;
    app.screenMode = App.getScreenMode();

    const setting = window.talknAPI.store.getState().setting;
    const bootOption = window.talknAPI.store.getState().bootOption;
    window.talknAPI.onResizeEndWindow({ app, setting, bootOption });
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

  parentTo(method, params) {
    if (this.parentUrl) {
      window.top.postMessage(
        {
          type: "talkn",
          method,
          params
        },
        this.parentUrl
      );
    }
  }
}
