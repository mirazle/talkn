import io from "socket.io-client";
import Sequence from "common/Sequence";
import define from "common/define";
import conf from "client/conf";
import handleActions from "client/actions/handles";
import WsServerToClientEmitAction from "client/actions/ws/serverToClientEmit";
import WsClientToServerEmitActions from "client/actions/ws/clientToServerEmit";
import WsServerToClientBroadcastAction from "client/actions/ws/serverToClientBradcast";

export default class TalknAPI {
  ws: any;
  talknIndex: any;
  store;
  any;
  state: any;
  connection: any;

  /*
    このコンストラクを2つに分ける。
    wsの接続(connection)とfinnishOnをtalknWindowのbootより前にする！！
  */
  constructor(talknIndex, resolve) {
    this.talknIndex = talknIndex;
    window.__talknAPI__[talknIndex] = this;
    this.ws = io(`https://${conf.server}:${define.PORTS.SOCKET_IO}`, {
      forceNew: true
    });
    this.onCatchMeAPI(resolve);
/*
    this.ws.on(Sequence.CATCH_ME_KEY, () => {
      resolve(this);
    });
*/
  }

  static handle(talknIndex) {
    if (typeof window.__talknAPI__[talknIndex] === "undefined") {
      throw `BAD TALKN_API HANDLE TALKN_INDEX ${talknIndex}.`;
    } else {

      window.talknAPI = window.__talknAPI__[talknIndex];
      return true;
    }
  }

  connectioned(talknIndex, store){
    this.store = store;
  }

  booted(state, connection) {

    this.state = state;
    this.connection = connection;

    // CLIENT API's
    this.onHandleAPI();

    // COMMUNUCATION API’s
    this.onCatchConnectionAPI();
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
    const callback: any = this.getToMeAPI(
      talknIndex,
      WsServerToClientEmitAction,
      resolve
    );
    this.on(Sequence.CATCH_ME_KEY, callback);
  }

  onCatchConnectionAPI(connection = this.connection) {
    const talknIndex = this.talknIndex;

    // To connect redux flow.
    const callback: any = this.getCatchConnectionAPI(
      talknIndex,
      WsServerToClientBroadcastAction
    );
    this.on(connection, callback);
  }

  offCatchConnectionAPI(connection = this.connection) {
    const talknIndex = this.talknIndex;
    this.off(connection);
  }

  onTalknAPI() {
    const actions = WsClientToServerEmitActions;
    const talknIndex = this.talknIndex;
    const actionKeys = Object.keys(actions);
    const actionLength = actionKeys.length;

    for (let actionNodeCnt = 0; actionNodeCnt < actionLength; actionNodeCnt++) {
      const actionName = actionKeys[actionNodeCnt];
      const actionPlainName = actionName.replace(
        Sequence.CLIENT_TO_SERVER_EMIT,
        ""
      );
      const beforeFunction = actions[actionName];
      this[actionPlainName] = this.getTalknAPI(
        talknIndex,
        actionName,
        beforeFunction
      );
    }
  }

  on(onKey, callback = () => {}) {
    if (!this.ws._callbacks[`$${onKey}`]) {
      console.log("ON @@@@@ " + onKey);
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
        let _requestState = Sequence.getRequestState(
          actionName,
          reduxState,
          _requestParams
        );
        let _actionState = Sequence.getRequestActionState(
          actionName,
          _requestParams
        );
        const { requestState, actionState } = beforeFunction(
          reduxState,
          _requestState,
          _actionState
        );
        this.ws.emit(requestState.type, requestState);
        return window.talknAPI.store.dispatch(actionState);
      }
    };
  }

  getToMeAPI(talknIndex, action, resolve = null) {
    return response => {
      if (TalknAPI.handle(talknIndex)) {

        if( resolve ){
          resolve();
        }

        const actionState = action(response);
        return window.talknAPI.store.dispatch(actionState);
      }
    };
  }

  getCatchConnectionAPI(talknIndex, actionMethod) {
    return response => {
      if (TalknAPI.handle(talknIndex)) {
        const actionState = actionMethod(response);
        return window.talknAPI.store.dispatch(actionState);
      }
    };
  }
}
