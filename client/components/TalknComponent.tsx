import { Component } from "react";
import Message from "common/Message";
import ApiState from "api/store/";
import ClientState from "client/store/";
import Schema from "api/store/Schema";
import App from "api/store/App";
import Thread from "api/store/Thread";
import UiTimeMarker from "client/store/UiTimeMarker";
import conf from "client/conf";
import Ui from "client/store/Ui";

export default class TalknComponent<P, S> extends Component<P, S> {
  Html: HTMLElement;
  Body: HTMLBodyElement;
  Posts: HTMLOListElement;
  constructor(props: P) {
    super(props);
    this.Posts = document.querySelector("[data-component-name=Posts]");
    this.onScroll = this.onScroll.bind(this);
  }
  get apiStore(): ApiState {
    return window.talknWindow.stores.api;
  }
  get apiState() {
    return window.talknWindow.stores.api.getState();
  }
  get clientStore(): ClientState {
    return window.talknWindow.stores.client;
  }
  get clientState() {
    return window.talknWindow.stores.client.getState();
  }
  coreApi(method, params = {}, callback = () => {}) {
    window.postMessage({ type: Message.appToCoreApi, method, params }, location.href);
  }
  clientAction(type: string, params?, callback = () => {}) {
    const { app } = this.apiState;
    let action: any = {};
    if (typeof params === "object") {
      action = params ? { ...params, app, type } : { type, app };
    } else if (typeof params === "string") {
      action.type = type;
      action.app = app;
      action.params = params;
    } else if (typeof params === "undefined") {
      action.type = type;
      action.app = app;
    }

    window.talknWindow.stores.client.dispatch(action);
  }
  onClickCh(toCh, ui, overWriteHasSlash, called) {
    let { app, thread, menuIndex, setting } = this.apiState;
    const beforeCh = thread.ch;
    thread.ch = toCh;
    ui.isOpenLinks = false;
    ui.isOpenMenu = false;
    ui.isOpenBoard = true;

    if (Schema.isSet(overWriteHasSlash)) thread.hasSlash = overWriteHasSlash;

    const threadStatus = Thread.getStatus(thread, app, setting);
    let { app: updatedApp, stepTo } = App.getStepToDispThreadType({ app, menuIndex }, threadStatus, toCh, called);

    if (!app.isLinkCh && updatedApp.isLinkCh) this.coreApi("on", toCh);
    if (app.isLinkCh && !updatedApp.isLinkCh) this.coreApi("off", beforeCh);

    app = updatedApp;

    switch (stepTo) {
      case `${App.dispThreadTypeTimeline} to ${App.dispThreadTypeChild}`:
      case `${App.dispThreadTypeMulti} to ${App.dispThreadTypeChild}`:
      case `${App.dispThreadTypeSingle} to ${App.dispThreadTypeChild}`:
      case `${App.dispThreadTypeChild} to ${App.dispThreadTypeChild}`:
        this.clientAction("ON_CLICK_TO_CHILD_THREAD", { ui });
        this.coreApi("changeThread", { app, thread });
        break;
      case `${App.dispThreadTypeTimeline} to ${App.dispThreadTypeMulti}`:
      case `${App.dispThreadTypeChild} to ${App.dispThreadTypeMulti}`:
        this.clientAction("ON_CLICK_TO_MULTI_THREAD", { ui });
        this.coreApi("changeThread", { app, thread });
        break;
      case `${App.dispThreadTypeTimeline} to ${App.dispThreadTypeSingle}`:
      case `${App.dispThreadTypeChild} to ${App.dispThreadTypeSingle}`:
        this.clientAction("ON_CLICK_TO_SINGLE_THREAD", { ui });
        this.coreApi("changeThread", { app, thread });
        break;
      case `${App.dispThreadTypeMulti} to ${App.dispThreadTypeTimeline}`:
      case `${App.dispThreadTypeSingle} to ${App.dispThreadTypeTimeline}`:
      case `${App.dispThreadTypeChild} to ${App.dispThreadTypeTimeline}`:
      case `${App.dispThreadTypeTimeline} to ${App.dispThreadTypeTimeline}`:
        this.clientAction("ON_CLICK_TO_TIMELINE_THREAD", { ui });
        this.coreApi("changeThread", { app, thread });
        break;
    }
  }

  onScroll({ scrollTop = 0, clientHeight = 0, scrollHeight = 0 }) {
    const { thread } = this.apiState;
    const { ui, actionLog } = this.clientState;
    let { uiTimeMarker } = this.clientState;

    if (scrollTop === 0) {
      if (actionLog[0] !== "ON_RESIZE_END_WINDOW") {
        if (thread.postCnt > conf.findOnePostCnt) {
          const timeMarkerList: any = document.querySelector("[data-component-name=TimeMarkerList]");
          if (timeMarkerList && timeMarkerList.style) {
            // UI上、重なるTIME MARKERを非表示にする
            timeMarkerList.style.opacity = 0;
          }

          window.talknWindow.exeGetMore(this.clientStore);
        }
      }
    }

    // NEW POSTを閉じる
    if (ui.isOpenNewPost) {
      this.clientAction("CLOSE_NEW_POST");
    }

    // TIME MARKERを更新する
    const newUiTimeMarker = UiTimeMarker.update(scrollTop, uiTimeMarker);
    if (uiTimeMarker.now.label !== newUiTimeMarker.now.label) {
      this.clientAction("ON_SCROLL_UPDATE_TIME_MARKER", { uiTimeMarker: newUiTimeMarker });
    }

    window.talknWindow.scrollTop = scrollTop;
    window.talknWindow.scrollHeight = scrollHeight;
    window.talknWindow.clientHeight = clientHeight;
    window.talknWindow.isScrollBottom = scrollHeight === scrollTop + clientHeight;
  }

  scrollToDidUpdateGetMore() {
    const { ui } = this.clientState;
    const Posts = document.querySelector("[data-component-name=Posts]");
    const scrollHeight = ui.screenMode === Ui.screenModeLargeLabel ? Posts.scrollHeight : document.body.scrollHeight;
    window.talknWindow.scrollTop = scrollHeight - window.talknWindow.scrollHeight;
    Posts.scrollTop = window.talknWindow.scrollTop;
    window.scrollTo(0, window.talknWindow.scrollTop);
  }

  onScrollTop() {}

  onScrollBottom() {}
}
