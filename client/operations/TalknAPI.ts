/*
import io from "socket.io-client";
import define from "common/define";
import Sequence from "api/Sequence";
import configureStore from "api/store/configureStore";
import handleActions from "api/actions/handles";
import WsServerToClientEmitAction from "api/actions/ws/serverToClientEmit";
import WsClientToServerEmitActions from "api/actions/ws/clientToServerEmit";
import WsServerToClientBroadcastAction from "api/actions/ws/serverToClientBradcast";

export default class TalknAPI {
  ws: any;
  talknIndex: any;
  store: any;
  state: any;
  ch: any;

  constructor(talknIndex, resolve) {
    this.store = configureStore();
    this.talknIndex = talknIndex;
    window.__talknAPI__[talknIndex] = this;
    const connectServer = location.host.indexOf( define.PRODUCTION_DOMAIN ) >= 0 ? define.PRODUCTION_DOMAIN : define.DEVELOPMENT_DOMAIN;
    this.ws = io(`https://${connectServer}:${define.PORTS.SOCKET_IO}`, { forceNew: true });
    this.onCatchMeAPI(resolve);
  }

  static handle(talknIndex) {
    if (typeof window.__talknAPI__[talknIndex] === "undefined") {
      throw `BAD TALKN_API HANDLE TALKN_INDEX ${talknIndex}.`;
    } else {
      window.talknAPI = window.__talknAPI__[talknIndex];
      return true;
    }
  }

  booted(state, ch) {
    this.state = state;
    this.ch = ch;

    // CLIENT API's
    this.onHandleAPI();

    // COMMUNUCATION API’s
    this.onCatchChAPI();
    this.onTalknAPI();
  }

  onHandleAPI() {
    const actions = handleActions;
    const talknIndex = this.talknIndex;
    const actionKeys = Object.keys(actions);
    const actionLength = actionKeys.length;
    for (let actionNodeCnt = 0; actionNodeCnt < actionLength; actionNodeCnt++) {
      const actionName = actionKeys[actionNodeCnt];
      this[actionName] = this.getHandleAPI(talknIndex, actionName);
    }
  }

  onCatchMeAPI(resolve: Promise<boolean> | null = null) {
    const talknIndex = this.talknIndex;
    const callback: any = this.getToMeAPI(talknIndex, WsServerToClientEmitAction, resolve);
    this.on(Sequence.CATCH_ME_KEY, callback);
  }

  onCatchChAPI(ch = this.ch) {
    const talknIndex = this.talknIndex;

    // To connect redux flow.
    const callback: any = this.getCatchChAPI(talknIndex, WsServerToClientBroadcastAction);
    this.on(ch, callback);
  }

  offCatchChAPI(ch = this.ch) {
    const talknIndex = this.talknIndex;
    this.off(ch);
  }

  onTalknAPI() {
    const actions = WsClientToServerEmitActions;
    const talknIndex = this.talknIndex;
    const actionKeys = Object.keys(actions);
    const actionLength = actionKeys.length;

    for (let actionNodeCnt = 0; actionNodeCnt < actionLength; actionNodeCnt++) {
      const actionName = actionKeys[actionNodeCnt];
      const actionPlainName = actionName.replace(Sequence.CLIENT_TO_SERVER_EMIT, "");
      const beforeFunction = actions[actionName];
      this[actionPlainName] = this.getTalknAPI(talknIndex, actionName, beforeFunction);
    }
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

  getHandleAPI(talknIndex, actionName) {
    return params => {
      if (TalknAPI.handle(talknIndex)) {
        const action = handleActions[actionName](params);
        const reduxState = window.talknAPI.store.getState();
        return window.talknAPI.store.dispatch(action);
      }
    };
  }

  getTalknAPI(talknIndex, actionName, beforeFunction) {
    return _requestParams => {
      if (TalknAPI.handle(talknIndex)) {
        const reduxState = window.talknAPI.store.getState();
        let _requestState = Sequence.getRequestState(actionName, reduxState, _requestParams);
        let _actionState = Sequence.getRequestActionState(actionName, _requestParams);
        const { requestState, actionState } = beforeFunction(reduxState, _requestState, _actionState);
        this.ws.emit(requestState.type, requestState);
        return window.talknAPI.store.dispatch(actionState);
      }
    };
  }

  getToMeAPI(talknIndex, action, resolve = null) {
    return response => {
      if (TalknAPI.handle(talknIndex)) {
        if (resolve && response.type === Sequence.CONNECTION_SERVER_KEY) {
          window.talknAPI = this;
          resolve();
        }

        const actionState = action(response);
        return window.talknAPI.store.dispatch(actionState);
      }
    };
  }

  getCatchChAPI(talknIndex, actionMethod) {
    return response => {
      if (TalknAPI.handle(talknIndex)) {
        const actionState = actionMethod(response);
        return window.talknAPI.store.dispatch(actionState);
      }
    };
  }
}
*/
