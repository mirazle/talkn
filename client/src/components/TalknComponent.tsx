import { Component } from 'react';

import Schema from 'common//Schema';
import ClientState from 'common/clientState/store';
import Ui from 'common/clientState/store/Ui';
import UiTimeMarker from 'common/clientState/store/UiTimeMarker';

import App from 'api/store/App';
import Thread from 'api/store/Thread';

import conf from 'client/conf';

export default class TalknComponent<P, S> extends Component<P, S> {
  componentName: string;
  constructor(props: P) {
    super(props);
    this.onScroll = this.onScroll.bind(this);
  }

  get clientStore(): ClientState {
    if (window.talknWindow) {
      return window.talknWindow.store;
    }
  }
  get clientState() {
    if (window.talknWindow) {
      return window.talknWindow.store.getState();
    }
  }
  api(method, params = {}) {
    window.talknWindow.api(method, params);
  }

  clientAction(type: string, params?, callback = () => {}) {
    const action = params ? { ...params, type } : { type };
    window.talknWindow.store.dispatch(action);
  }

  onClickCh(toCh, ui, overWriteHasSlash, clicked) {
    let { app, thread, ranks, setting } = this.clientState;
    const beforeCh = thread.ch;
    thread.ch = toCh;

    ui.clicked = clicked;
    ui.isOpenLinks = false;
    ui.isOpenMenu = ui.screenSize === Ui.screenSizeSmallLabel ? ui.isOpenMenu : false;
    ui.isOpenBoard = true;

    if (Schema.isSet(overWriteHasSlash)) thread.hasSlash = overWriteHasSlash;
    const threadStatus = Thread.getStatus(thread, app, setting);
    let { app: updatedApp, stepTo } = App.getStepToDispThreadType({ app, ranks }, threadStatus, toCh, clicked);

    if (clicked === 'ToMedia') {
      this.api('onResponseChAPI', toCh);
    }
    if (app.isLinkCh && !updatedApp.isLinkCh) {
      this.api('offResponseChAPI', beforeCh);
    }

    app = updatedApp;
    app.offsetFindId = App.defaultOffsetFindId;
    switch (stepTo) {
      case `${App.dispThreadTypeTimeline} to ${App.dispThreadTypeChild}`:
      case `${App.dispThreadTypeMulti} to ${App.dispThreadTypeChild}`:
      case `${App.dispThreadTypeSingle} to ${App.dispThreadTypeChild}`:
      case `${App.dispThreadTypeChild} to ${App.dispThreadTypeChild}`:
        ui.isRootCh = false;
        this.clientAction('ON_CLICK_TO_CHILD_THREAD', { ui });
        this.api('changeThread', { app, thread });
        break;
      case `${App.dispThreadTypeTimeline} to ${App.dispThreadTypeMulti}`:
      case `${App.dispThreadTypeChild} to ${App.dispThreadTypeMulti}`:
        ui.isRootCh = true;
        this.clientAction('ON_CLICK_TO_MULTI_THREAD', { ui });
        this.api('changeThread', { app, thread });
        break;
      case `${App.dispThreadTypeTimeline} to ${App.dispThreadTypeSingle}`:
      case `${App.dispThreadTypeChild} to ${App.dispThreadTypeSingle}`:
        ui.isRootCh = true;
        this.clientAction('ON_CLICK_TO_SINGLE_THREAD', { ui });
        this.api('changeThread', { app, thread });
        break;
      case `${App.dispThreadTypeMulti} to ${App.dispThreadTypeTimeline}`:
      case `${App.dispThreadTypeSingle} to ${App.dispThreadTypeTimeline}`:
      case `${App.dispThreadTypeChild} to ${App.dispThreadTypeTimeline}`:
      case `${App.dispThreadTypeTimeline} to ${App.dispThreadTypeTimeline}`:
        ui.isRootCh = !app.isLinkCh;
        this.clientAction('ON_CLICK_TO_TIMELINE_THREAD', { ui });
        this.api('changeThread', { app, thread });
        break;
    }
  }

  onScroll({ scrollTop = 0, clientHeight = 0, scrollHeight = 0 }) {
    const { thread, app, ui, clientLog } = this.clientState;
    const actionTypes =
      ui.extensionMode === Ui.extensionModeNone ? ['ON_RESIZE_END_WINDOW'] : ['ON_RESIZE_END_WINDOW' /*, "ON_SCROLL_UPDATE_TIME_MARKER"*/];
    let { uiTimeMarker } = this.clientState;

    if (scrollTop === 0) {
      if (!actionTypes.includes(clientLog[0])) {
        const postCntKey = app.multistream ? 'multiPostCnt' : 'postCnt';
        if (thread[postCntKey] > conf.findOnePostCnt) {
          const timeMarkerList: any = document.querySelector('[data-component-name=TimeMarkerList]');
          if (timeMarkerList && timeMarkerList.style) {
            // UI上、重なるTIME MARKERを非表示にする
            timeMarkerList.style.opacity = 0;
          }
          window.talknWindow.dom.exeGetMore(this.clientStore);
        }
      }
    }

    // NEW POSTを閉じる
    if (ui.isOpenNewPost) {
      this.clientAction('CLOSE_NEW_POST');
    }

    // TIME MARKERを更新する
    const newUiTimeMarker = UiTimeMarker.update(scrollTop, uiTimeMarker, { app, ui });
    if (uiTimeMarker.now.label !== newUiTimeMarker.now.label) {
      this.clientAction('ON_SCROLL_UPDATE_TIME_MARKER', { uiTimeMarker: newUiTimeMarker });
    }
    window.talknWindow.dom.scrollTop = scrollTop;
    window.talknWindow.dom.scrollHeight = scrollHeight;
    window.talknWindow.dom.clientHeight = clientHeight;
    window.talknWindow.dom.isScrollBottom = scrollHeight === scrollTop + clientHeight;
  }

  scrollToDidUpdateGetMore() {
    const { ui } = this.clientState;
    const Posts = document.querySelector('[data-component-name=Posts]');
    let scrollHeight = 0;
    switch (ui.screenSize) {
      case Ui.screenSizeLargeLabel:
      case Ui.screenSizeSmallLabel:
        // ui.screenSize === Ui.screenSizeLargeLabel || ui.extensionMode !== Ui.extensionModeNone;
        scrollHeight = Posts.scrollHeight;
        break;
      case Ui.screenSizeMiddleLabel:
        scrollHeight = document.body.scrollHeight;
        break;
    }

    window.talknWindow.dom.scrollTop = scrollHeight - window.talknWindow.dom.scrollHeight;
    Posts.scrollTop = window.talknWindow.dom.scrollTop;
    window.scrollTo(0, window.talknWindow.dom.scrollTop);
  }
}
