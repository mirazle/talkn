import io from "socket.io-client";
import conf from "common/conf";
import define from "common/define";
import BootOption from "common/BootOption";
import Sequence from "api/Sequence";
import ApiState from "api/store/";
import apiStore from "api/store/apiStore";
import WsServerToApiEmitAction from "api/actions/ws/serverToApiEmit";
import WsClientToApiRequestActions from "api/actions/ws/apiToServerRequest";
import WsServerToApiBroadcastAction from "api/actions/ws/serverToApiBradcast";

type Store = any;

export default class Ws {
  // @ts-ignore
  webWorker: WebWorker;
  store: Store;
  io: SocketIOClient.Socket;
  publicCallbacks: { key: Function } | {} = {};
  static get server() {
    return conf.env === define.DEVELOPMENT || conf.env === define.LOCALHOST
      ? define.DEVELOPMENT_DOMAIN
      : define.PRODUCTION_DOMAIN;
  }
  static get option() {
    return { forceNew: true };
  }
  // @ts-ignore;
  constructor(webWorker: WebWorker) {
    this.tuned = this.tuned.bind(this);
    this.setUp = this.setUp.bind(this);
    this.on = this.on.bind(this);
    this.off = this.off.bind(this);
    this.onResponseMeAPI = this.onResponseMeAPI.bind(this);
    this.offResponseChAPI = this.offResponseChAPI.bind(this);
    this.subscribe = this.subscribe.bind(this);
    this.exeCallback = this.exeCallback.bind(this);
    this.store = apiStore();
    this.store.subscribe(this.subscribe);
    this.webWorker = webWorker;
    this.webWorker.postMessage("GET_BOOT_OPTION", {}, "setUp");
  }

  public exe(method, params: Store) {
    this[method](params);
  }

  private tuned() {
    // this.store.dispatch({ type: "TUNED" });
    //    const params = this.reConnectOption.ch === "" ? {} : this.reConnectOption;
    // this.webWorker.postMessage("GET_BOOT_OPTION", {}, "setUp");
    //    this.reConnectOption = ReConnectThreadValue;
  }

  private getIoParams(bootOption: BootOption): string {
    let params = "";
    Object.keys(bootOption).forEach((key) => {
      if (key === "defaultProps") return;
      const value = bootOption[key];
      params += `${key}=${value}&`;
    });
    return params;
  }

  private setUp(bootOption: BootOption) {
    // store.
    const apiState = new ApiState(bootOption);
    this.store.dispatch({ ...apiState, type: "SETUPED_API_STOREE" });

    /*
      app.rootCh
      app.dispThreadType
      app.isToggleMultistream
    */
    // ws server.
    const ioParams = this.getIoParams(bootOption);
    this.io = io(`${Sequence.HTTPS_PROTOCOL}//${Ws.server}:${define.PORTS.SOCKET_IO}?${ioParams}`, Ws.option);
    this.io.on("connect", this.tuned);
    this.onResponseChAPI(bootOption.ch);
    this.onRequestAPI();
    this.onResponseMeAPI();
  }

  private onRequestAPI() {
    const actions = WsClientToApiRequestActions;
    const actionKeys = Object.keys(actions);
    const actionLength = actionKeys.length;
    const getCoreAPI = (actionName, beforeFunction) => {
      return (requestParams, callback = () => {}) => {
        const reduxState = this.store.getState();
        const _requestState = Sequence.getRequestState(actionName, reduxState, requestParams);
        const _actionState = Sequence.getRequestActionState(actionName, requestParams);
        const { requestState, actionState } = beforeFunction(reduxState, _requestState, _actionState);
        this.publicCallbacks[requestState.type] = callback;
        this.io.emit(requestState.type, requestState);
        return this.store.dispatch(actionState);
      };
    };

    for (let actionNodeCnt = 0; actionNodeCnt < actionLength; actionNodeCnt++) {
      const actionName = actionKeys[actionNodeCnt];
      const actionPlainName = actionName.replace(Sequence.API_TO_SERVER_REQUEST, "");
      const beforeFunction = actions[actionName];
      this[actionPlainName] = getCoreAPI(actionName, beforeFunction);
    }
  }

  private onResponseMeAPI() {
    const getToMeAPI = (action) => {
      return (response) => {
        console.log(response);
        const actionState = action(response);
        this.store.dispatch(actionState);
      };
    };
    const callback: any = getToMeAPI(WsServerToApiEmitAction);
    this.on(Sequence.CATCH_ME_KEY, callback);
  }

  public onResponseChAPI(ch) {
    const getResponseChAPI = (actionMethod) => {
      return (response) => {
        console.log(response);
        const actionState = actionMethod(response);
        this.store.dispatch(actionState);
      };
    };
    // To connect redux flow.
    const callback: any = getResponseChAPI(WsServerToApiBroadcastAction);
    this.on(ch, callback);
  }

  public offResponseChAPI(ch) {
    this.off(ch);
  }

  private on(onKey, callback = () => {}) {
    // @ts-ignore
    if (!this.io._callbacks[`$${onKey}`]) {
      this.io.on(onKey, callback);
    }
  }

  private off(offKey) {
    // @ts-ignore
    if (this.io._callbacks[`$${offKey}`]) {
      this.io.off(offKey);
    }
  }

  private subscribe() {
    const apiState = this.store.getState();
    this.exeCallback(apiState.app.actioned, apiState);
    this.webWorker.postMessage(apiState.app.actioned, apiState);
  }

  private exeCallback(method, apiState) {
    const { actionType, actionName } = Sequence.getSequenceActionMap(method);
    if (actionName !== Sequence.API_BROADCAST_CALLBACK) {
      if (actionType === Sequence.API_RESPONSE_TYPE_EMIT) {
        if (this.publicCallbacks[actionName]) {
          const { posts, thread, user } = apiState;
          this.publicCallbacks[actionName](apiState, { posts, thread, uid: user.uid });
        }
      }
    }

    if (actionType === Sequence.API_RESPONSE_TYPE_BROADCAST) {
      if (this.publicCallbacks[Sequence.API_BROADCAST_CALLBACK]) {
        const { posts, thread, user } = apiState;
        this.publicCallbacks[Sequence.API_BROADCAST_CALLBACK](actionName, { posts, thread, uid: user.uid });
      }
    }
  }

  /*
private reconnect(reConnectOption: ReConnectThreadType) {
this.reConnectOption = reConnectOption;
if (this.io.connected) this.io.disconnect();
this.io.connect();
}
*/
}
