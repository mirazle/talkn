import io from "socket.io-client";
import conf from "common/conf";
import PostMessage, { MessageClientAndWsApiType, MessageParams } from "common/PostMessage";
import BootOption from "common/BootOption";
import define from "common/define";
import ApiState from "api/store/";
import Sequence from "api/Sequence";
import apiStore from "api/store/apiStore";
import WsServerToApiEmitAction from "api/actions/ws/serverToApiEmit";
import WsClientToApiRequestActions from "api/actions/ws/apiToServerRequest";
import WsServerToApiBroadcastAction from "api/actions/ws/serverToApiBradcast";

class Ws {
  webWorker: WebWorker;
  store: any;
  io: SocketIOClient.Socket;
  callbacks: { key: Function } | {} = {};
  static get server() {
    return conf.env === define.DEVELOPMENT || conf.env === define.LOCALHOST
      ? define.DEVELOPMENT_DOMAIN
      : define.PRODUCTION_DOMAIN;
  }
  constructor(webWorker: WebWorker) {
    this.connect = this.connect.bind(this);
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
    this.io = io(`${Sequence.HTTPS_PROTOCOL}//${Ws.server}:${define.PORTS.SOCKET_IO}`, { forceNew: true });
    this.io.on("connect", this.connect);
    this.onRequestAPI();
    this.onResponseMeAPI();
  }

  private connect() {
    this.webWorker.postMessage("GET_BOOT_OPTION", {}, "setUp");
  }

  private setUp(bootOption: BootOption) {
    const apiState = new ApiState(bootOption);
    this.store.dispatch({ ...apiState, type: "SETUPED_API_STORE" });
    this.onResponseChAPI(bootOption.ch);
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
        this.callbacks[requestState.type] = callback;
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
        const actionState = action(response);
        this.store.dispatch(actionState);
      };
    };
    const callback: any = getToMeAPI(WsServerToApiEmitAction);
    this.on(Sequence.CATCH_ME_KEY, callback);
  }

  private onResponseChAPI(ch) {
    const getResponseChAPI = (actionMethod) => {
      return (response) => {
        const actionState = actionMethod(response);
        this.store.dispatch(actionState);
      };
    };
    // To connect redux flow.
    const callback: any = getResponseChAPI(WsServerToApiBroadcastAction);
    this.on(ch, callback);
  }

  private offResponseChAPI(ch) {
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
    if (this.ws._callbacks[`$${offKey}`]) {
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
        if (this.callbacks[actionName]) {
          const { posts, thread, user } = apiState;
          this.callbacks[actionName](apiState, { posts, thread, uid: user.uid });
        }
      }
    }

    if (actionType === Sequence.API_RESPONSE_TYPE_BROADCAST) {
      if (this.callbacks[Sequence.API_BROADCAST_CALLBACK]) {
        const { posts, thread, user } = apiState;
        this.callbacks[Sequence.API_BROADCAST_CALLBACK](actionName, { posts, thread, uid: user.uid });
      }
    }
  }
}

export default class WebWorker {
  id?: string;
  bootOption: BootOption;
  ws: Ws;
  worker: Worker;
  constructor(worker: Worker) {
    // web socket server.
    this.onMessage = this.onMessage.bind(this);
    this.onMessageError = this.onMessageError.bind(this);
    this.postMessage = this.postMessage.bind(this);
    this.worker = worker;
    this.worker.onerror = this.onMessageError;
    this.worker.onmessage = this.onMessage;
    this.ws = new Ws(this);
  }

  public postMessage(method: string, params: MessageParams = {}, methodBack?): void {
    const message: MessageClientAndWsApiType = {
      id: this.id,
      type: PostMessage.WSAPI_TO_CLIENT_TYPE,
      method: method,
      params,
      methodBack,
    };
    this.worker.postMessage(message);
  }
  private onMessage(e: MessageEvent): void {
    const { type, method, params }: MessageClientAndWsApiType = e.data;
    if (type === PostMessage.CLIENT_TO_WSAPI_TYPE) {
      if (this.ws[method] && typeof this.ws[method] === "function") {
        this.ws[method](params);
      }
    }
  }
  private onMessageError(e: ErrorEvent): void {
    console.warn(e);
  }
}

new WebWorker(self as any);
