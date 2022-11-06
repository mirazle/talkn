import WsApiWorker from 'worker-loader?inline=fallback&publicPath=/&filename=ws.api.worker.js!../../api/src/ws.api.worker';

import BootOption, { BootOptionParamsType } from 'common/BootOption';
import PostMessage, { MessageClientAndWsApiType, MessageParams } from 'common/PostMessage';
import Sequence from 'common/Sequence';
import TalknSetup from 'common/clientState/operations/TalknSetup';
import define from 'common/define';

import ApiState from 'api/store';
import apiStore from 'api/store/apiStore';

export default class Window {
  id: string = define.APP_TYPES.API;
  isRankDetailMode: boolean;
  bootOption: BootOption;
  wsApi: WsApiWorker;
  store: any = apiStore();
  parentHref: string = location.href;
  callback: Function | undefined;
  conned: (value?: any | PromiseLike<any>) => void;
  static get SET_CALLBACK_METHOD() {
    return 'tune';
  }

  constructor(id, bootOptionParams?: BootOptionParamsType) {
    TalknSetup.setupMath();

    this.id = id;
    this.bootOption = new BootOption(this.id);
    const apiState = new ApiState(this.bootOption);
    const state = { ...apiState };

    this.store.dispatch({ ...state, type: 'INIT_CLIENT' });

    this.api = this.api.bind(this);
    this.postMessage = this.postMessage.bind(this);
    this.onMessage = this.onMessage.bind(this);
    this.onError = this.onError.bind(this);
  }

  public boot(): Promise<void> {
    return new Promise((resolve) => {
      this.conned = resolve;
      this.wsApi = new WsApiWorker();
      this.wsApi.onerror = this.onError;
      this.wsApi.onmessage = this.onMessage;
    });
  }

  public api(method: string, params: MessageParams = {}, callback?: Function): void {
    if (method === Window.SET_CALLBACK_METHOD && callback) this.callback = callback;
    this.postMessage(method, params);
  }

  private postMessage(method: string, params: MessageParams = {}): void {
    const message: MessageClientAndWsApiType = {
      // @ts-ignore
      id: params.id ? params.id : this.id,
      type: PostMessage.CLIENT_TO_WSAPI_TYPE,
      ioType: Sequence.API_SETUP,
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
        const state = { ...params, type: actionType };

        // disptch client state.
        this.store.dispatch(state);

        if (method === 'WS_CONSTRUCTED') {
          this.conned(this);
          if (this.id === define.APP_TYPES.TUNE || this.id === define.APP_TYPES.CLIENT) {
            // @ts-ignore
            const backParams = params.ch ? { ...this.bootOption, ch: params.ch } : this.bootOption;
            this.api('tune', backParams);
          }
        }
      }
    }
  }

  private onError(e: ErrorEvent): void {
    console.warn(e);
  }
}
