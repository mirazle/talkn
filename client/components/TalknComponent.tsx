import { Component } from "react";
import PostMessage from "common/PostMessage";
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

  get clientStore(): ClientState {
    if (window.talknWindow) {
      return window.talknWindow.stores.client;
    }
  }
  get clientState() {
    if (window.talknWindow) {
      return window.talknWindow.stores.client.getState();
    }
  }

  coreApi(method, params = {}, callback = () => {}) {
    const postWindow = window.talknWindow.parentUrl === location.href ? window : window.top;
    postWindow.postMessage(
      {
        type: PostMessage.CLIENT_TO_API_TYPE,
        method,
        params,
      },
      window.talknWindow.parentUrl
    );
  }
  clientAction(type: string, params?, callback = () => {}) {
    const action = params ? { ...params, type } : { type };
    window.talknWindow.stores.client.dispatch(action);
  }

  onClickCh(toCh, ui, overWriteHasSlash, called) {
    let { app, thread, rank, setting } = this.clientState;
    const beforeCh = thread.ch;
    thread.ch = toCh;
    ui.isOpenLinks = false;
    ui.isOpenMenu = false;
    ui.isOpenBoard = true;

    if (Schema.isSet(overWriteHasSlash)) thread.hasSlash = overWriteHasSlash;
    const threadStatus = Thread.getStatus(thread, app, setting);
    let { app: updatedApp, stepTo } = App.getStepToDispThreadType({ app, rank }, threadStatus, toCh, called);

    if (!app.isLinkCh && updatedApp.isLinkCh) this.coreApi("on", toCh);
    if (app.isLinkCh && !updatedApp.isLinkCh) this.coreApi("off", beforeCh);

    app = updatedApp;
    app.offsetFindId = App.defaultOffsetFindId;

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
    const { thread, ui, actionLog } = this.clientState;
    const actionTypes =
      ui.extensionMode === Ui.extensionModeExtNoneLabel
        ? ["ON_RESIZE_END_WINDOW", "ON_SCROLL_UPDATE_TIME_MARKER"]
        : ["ON_RESIZE_END_WINDOW", "ON_SCROLL_UPDATE_TIME_MARKER"];
    let { uiTimeMarker } = this.clientState;

    if (scrollTop === 0) {
      if (!actionTypes.includes(actionLog[0])) {
        if (thread.postCnt > conf.findOnePostCnt) {
          const timeMarkerList: any = document.querySelector("[data-component-name=TimeMarkerList]");
          if (timeMarkerList && timeMarkerList.style) {
            // UI上、重なるTIME MARKERを非表示にする
            timeMarkerList.style.opacity = 0;
          }
          console.log("EXE GET MORE " + actionLog[0]);
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
    const scrollHeight =
      ui.screenMode === Ui.screenModeLargeLabel || ui.extensionMode !== Ui.extensionModeExtNoneLabel
        ? Posts.scrollHeight
        : document.body.scrollHeight;

    window.talknWindow.scrollTop = scrollHeight - window.talknWindow.scrollHeight;
    Posts.scrollTop = window.talknWindow.scrollTop;
    window.scrollTo(0, window.talknWindow.scrollTop);
  }
}
