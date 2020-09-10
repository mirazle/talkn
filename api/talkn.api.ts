import WsApiWorker from "worker-loader?inline=true&publicPath=/&name=ws.api.worker.js!./ws.api.worker";
import Window from "client/Window";
import clientStore from "client/store/clientStore";
import ClientState from "client/store/";
import define from "common/define";
import BootOption from "common/BootOption";
import PostMessage, {
  MessageClientAndWsApiType,
  MessageClientAndExtType,
  MessageMediaClientAndMediaServerType,
  MessageParams,
} from "common/PostMessage";
import ApiState from "api/store/";
import Sequence from "api/Sequence";
import PublicApi from "api/public.api";

declare global {
  interface Window {
    talknBlob: any;
    talknAPI: any;
  }
}

class TalknAPI {
  id: string = define.APP_TYPES.PORTAL;
  bootOption: BootOption;
  wsApi: WsApiWorker;
  store: any = clientStore();
  parentHref: string = location.href;
  callback: Function | undefined;
  conned: (value?: any | PromiseLike<any>) => void;
  static get SET_CALLBACK_METHOD() {
    return "tune";
  }
  constructor() {
    // client store.
    this.bootOption = new BootOption(this.id);
    const apiState = new ApiState(this.bootOption);
    const clientState = new ClientState(apiState);
    const state = { ...apiState, ...clientState };
    this.store.dispatch({ ...state, type: "INIT_API" });

    // ws.api.worker.
    this.api = this.api.bind(this);
    this.postMessage = this.postMessage.bind(this);
    this.onMessage = this.onMessage.bind(this);
    this.exePublicCallback = this.exePublicCallback.bind(this);
    this.onError = this.onError.bind(this);
  }

  public boot() {
    return new Promise((resolve) => {
      this.conned = resolve;
      this.wsApi = new WsApiWorker();
      this.wsApi.onerror = this.onError;
      this.wsApi.onmessage = this.onMessage;
    });
  }

  public api(method: string, params: MessageParams = {}, callback?: Function): void {
    if (method === TalknAPI.SET_CALLBACK_METHOD && callback) this.callback = callback;
    this.postMessage(method, params);
  }

  private postMessage(method: string, params: MessageParams = {}): void {
    const message: MessageClientAndWsApiType = {
      // @ts-ignore
      id: params.id ? params.id : this.id,
      type: PostMessage.CLIENT_TO_WSAPI_TYPE,
      method,
      params,
    };

    this.wsApi.postMessage(message);
  }

  private onMessage(e: MessageEvent): void {
    const { currentTarget, data } = e;
    const { type, method, params }: MessageClientAndWsApiType = data;
    if (currentTarget instanceof Worker) {
      if (type === PostMessage.WSAPI_TO_CLIENT_TYPE) {
        const actionType = PostMessage.convertApiToClientActionType(method);
        const { ioType, exeMethod } = PostMessage.getMessageTypes(actionType);
        const state = { ...params, type: actionType };

        // disptch client state.
        this.store.dispatch(state);

        // callback
        this.exePublicCallback(ioType, exeMethod, state);

        if (method === "WS_CONSTRUCTED") {
          this.conned(this);
        }
      }
    }
  }

  private onError(e: ErrorEvent): void {
    console.warn(e);
  }

  private exePublicCallback(ioType, exeMethod, state: any): void {
    if (this.callback) {
      if (ioType === Sequence.API_RESPONSE_TYPE_EMIT || ioType === Sequence.API_RESPONSE_TYPE_BROADCAST) {
        this.callback(ioType, exeMethod, state);
      }
    }
  }
}

const bootTalknApi = () => {
  const talknWindow = new Window(false);
  talknWindow.boot().then((_window: Window) => {
    window.talknAPI = new PublicApi(_window);
  });
};

if (window.top.document.readyState === "complete") {
  bootTalknApi();
} else {
  window.onload = () => bootTalknApi();
}

// window.talknAPI = new WsApiWorker();
