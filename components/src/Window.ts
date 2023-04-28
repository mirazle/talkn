import WsApiWorker from 'worker-loader?inline=fallback&publicPath=/&filename=ws.api.worker.js!../../api/src/ws.api.worker';

import BootOption, { BootOptionParamsType } from 'common/BootOption';
import PostMessage, {
  IoTypeValues,
  MessageClientAndWsApiType,
  MessageClientAndExtType,
  MessageMediaClientAndMediaServerType,
  MessageParams,
} from 'common/PostMessage';
import Sequence from 'common/Sequence';
import TalknSetup from 'common/clientState/operations/TalknSetup';
import ClientState from 'common/clientState/store/';
import clientStore from 'common/clientState/store/clientStore';
import define from 'common/define';

import ApiState from 'api/store';

export default class Window {
  id: string;
  type: string = define.APP_TYPES.COMPONENTS;
  bootOption: BootOption;
  ch: string;
  wsApi: WsApiWorker;
  store: any = clientStore();
  callback: Function | undefined;
  conned: (value?: any | PromiseLike<any>) => void;
  static get SET_CALLBACK_METHOD() {
    return 'tune';
  }
  constructor(id, type, bootOptionParams?: BootOptionParamsType) {
    TalknSetup.setupMath();

    // client store.
    this.id = id;
    this.type = type;
    this.bootOption = new BootOption(this.id, this.type, bootOptionParams);
    this.ch = this.bootOption.ch;
    const apiState = new ApiState(this.bootOption);
    const clientState = new ClientState(apiState);
    const state = { ...apiState, ...clientState };
    this.store.dispatch({ ...state, type: 'INIT_CLIENT' });

    // ws.api.worker.
    this.api = this.api.bind(this);
    this.postMessageToApi = this.postMessageToApi.bind(this);
    this.onMessageFromApi = this.onMessageFromApi.bind(this);
    this.onErrorFromApi = this.onErrorFromApi.bind(this);
  }

  public boot(): Promise<void> {
    return new Promise((resolve) => {
      this.conned = resolve;
      this.wsApi = new WsApiWorker();
      this.wsApi.onerror = this.onErrorFromApi;
      this.wsApi.onmessage = this.onMessageFromApi;

      this.onMessage = this.onMessage.bind(this);
      this.onMessageError = this.onMessageError.bind(this);
      this.postMessage = this.postMessage.bind(this);
    });
  }

  // public
  public api(method: string, params: MessageParams = {}, callback?: Function): void {
    if (method === Window.SET_CALLBACK_METHOD && callback) this.callback = callback;
    this.postMessageToApi(method, params);
  }

  private postMessageToApi(method: string, params: MessageParams = {}): void {
    const message: MessageClientAndWsApiType = {
      // @ts-ignore
      id: params.id ? params.id : this.id,
      type: PostMessage.CLIENT_TO_WSAPI_TYPE,
      ioType: Sequence.API_SETUP,
      method,
      params,
    };

    window.talknMediaClients[this.id] && window.talknMediaClients[this.id].wsClientBeforeFilter({ method, params });
    this.wsApi.postMessage(message);
  }

  private onMessageFromApi(e: MessageEvent): void {
    const { currentTarget, data } = e;
    const { type, method, params }: MessageClientAndWsApiType = data;

    if (currentTarget instanceof Worker) {
      if (type === PostMessage.WSAPI_TO_CLIENT_TYPE) {
        const actionType = PostMessage.convertApiToClientActionType(method);
        const { ioType, exeMethod } = PostMessage.getMessageTypes(actionType);
        const state: any = { ...params, type: actionType };

        // Redux
        this.store.dispatch(state);

        if (method === 'WS_CONSTRUCTED') {
          this.conned(this);
        }

        if (this.id === define.APP_TYPES.EXTENSION) {
          // ext
          this.extTo(method, ioType, params);
        }

        if (window.talknMediaClients[this.id]) {
          window.talknMediaClients[this.id].wsClientAfterFilter({ method, params, state });
        }
      }
    }
  }

  private onErrorFromApi(e: ErrorEvent): void {
    console.warn(e);
  }

  clientAction(type: string, params?, callback = () => {}) {
    const action = params ? { ...params, type } : { type };
    this.store.dispatch(action);
  }

  public extTo(method: string, ioType: IoTypeValues, params: MessageParams = {}): void {
    if (method.indexOf(Sequence.METHOD_COLON) >= 0) {
      method = method.split(Sequence.METHOD_COLON)[1];
    }
    const message: MessageClientAndExtType = {
      id: this.id,
      type: PostMessage.CLIENT_TO_EXT_TYPE,
      ioType,
      method,
      params,
      href: location.href,
    };
    this.postMessage(message);
  }

  public toMediaServer(method: string, params: MessageParams = {}): void {
    const message: MessageMediaClientAndMediaServerType = {
      id: this.id,
      type: PostMessage.MEDIA_CLIENT_TO_MEDIA_SERVER_TYPE,
      method,
      params,
    };
    this.postMessage(message);
  }

  private postMessage(message: MessageParams = {}): void {
    window.postMessage(message, location.href);
  }

  public onMessage(e: MessageEvent): void {
    const { id, href, type, method, ioType, params, methodBack }: MessageClientAndExtType = e.data;
    if (type === PostMessage.EXT_TO_CLIENT_TYPE) {
      switch (method) {
        case PostMessage.HANDLE_EXT_AND_CLIENT:
          this.id = id;

          // @ts-ignore
          this.window.bootOption = new BootOption(id, params.bootOption);

          const apiState = new ApiState(this.bootOption);

          // @ts-ignore
          const clientState = new ClientState({ ...apiState, ui: params.ui });
          const state = { ...apiState, ...clientState };
          this.store.dispatch({ ...state, type: 'EXT_INIT_CLIENT' });
          this.postMessageToApi('tune', this.bootOption);
          this.extTo(method, ioType, state);
          break;
        default:
          const isApiMethod = Boolean(Object.keys(Sequence.map).find((apiMethod) => apiMethod === method));
          if (isApiMethod) {
            this.postMessageToApi(method, params);
          }
          break;
      }

      // const actionType = PostMessage.convertExtToClientActionType(method);
      this.store.dispatch({ ...params, type: method });
    } else if (type === PostMessage.MEDIA_SERVER_TO_MEDIA_CLIENT_TYPE) {
      window.talknMediaClients[this.id] && window.talknMediaClients[this.id].onMessage(e, this.store.getState());
    }
  }
  public onMessageError(e: ErrorEventInit): void {
    console.warn(e);
  }
}
