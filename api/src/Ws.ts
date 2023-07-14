import io, { Socket } from 'socket.io-client';

import BootOption from 'common/BootOption';
import Sequence from 'common/Sequence';
import conf from 'common/conf';
import define from 'common/define';

import WsClientToApiRequestActions from 'api/actions/ws/apiToServerRequest';
import WsServerToApiBroadcastAction from 'api/actions/ws/serverToApiBradcast';
import WsServerToApiEmitAction from 'api/actions/ws/serverToApiEmit';
import ApiState from 'api/store';
import WsApiWorker from 'api/ws.api.worker';

import apiStore from './store/apiStore';

type Store = any;

// TODO: ワーカーは子ワーカーを生成できる(パフォーマンス向上)
export default class Ws {
  id: string;
  webWorker: WsApiWorker;
  stores: { [s: string]: Store } | {} = {};
  ios: { [s: string]: Socket } | {} = {};
  methods: { [s: string]: Function } | {} = {};
  publicCallbacks: { [s: string]: Function } | {} = {};
  static get server() {
    return conf.env === define.DEVELOPMENT || conf.env === define.LOCALHOST ? define.DEVELOPMENT_DOMAIN : define.PRODUCTION_DOMAIN;
  }
  static get option() {
    return { forceNew: true };
  }
  constructor(webWorker: WsApiWorker) {
    this.use = this.use.bind(this);
    this.tune = this.tune.bind(this);
    this.tuned = this.tuned.bind(this);
    this.untune = this.untune.bind(this);
    this.exe = this.exe.bind(this);
    this.onResponseMeAPI = this.onResponseMeAPI.bind(this);
    this.offResponseChAPI = this.offResponseChAPI.bind(this);
    this.subscribe = this.subscribe.bind(this);
    this.exeCallback = this.exeCallback.bind(this);
    this.on = this.on.bind(this);
    this.off = this.off.bind(this);

    this.webWorker = webWorker;
    this.webWorker.postMessage('WS_CONSTRUCTED', { ioType: Sequence.API_SETUP });
  }

  // change io connection.
  public use(id: string): boolean {
    if (this.stores[id] && this.ios[this.id]) {
      this.id = id;
      return true;
    }
    return false;
  }

  public exe(method: string, params: Store): boolean {
    if (this[method] && typeof this[method] === 'function') {
      this[method](params);
      return true;
    }
    if (this.methods[method] && typeof this.methods[method] === 'function') {
      this.methods[method](params);
      return true;
    }

    return false;
  }

  public onResponseChAPI(ch) {
    const getResponseChAPI = (actionMethod) => {
      return (response) => {
        const actionState = actionMethod(response);
        this.stores[this.id] && this.stores[this.id].dispatch(actionState);
      };
    };

    const callback: any = getResponseChAPI(WsServerToApiBroadcastAction);
    this.on(ch, callback);
  }

  public offResponseChAPI(ch) {
    this.off(ch);
  }

  private getIoParams(bootOption: BootOption): string {
    let params = '';
    Object.keys(bootOption).forEach((key) => {
      if (key === 'id') return;
      if (key === 'defaultProps') return;
      const value = bootOption[key];
      params += `${key}=${encodeURIComponent(value)}&`;
    });
    return params.replace(/&$/, '');
  }

  private tune(bootOption: BootOption) {
    if (!this.use(bootOption.id)) {
      // id
      this.id = bootOption.id;

      // store.
      this.stores[this.id] = apiStore();
      this.stores[this.id].subscribe(this.subscribe);

      const apiState = new ApiState(bootOption);

      this.stores[this.id].dispatch({ ...apiState, type: 'SETUPED_API_STORE' });

      // ws server.
      const ioParams = this.getIoParams(bootOption);
      const endpoint = `${Sequence.HTTPS_PROTOCOL}//${Ws.server}:${define.PORTS.SOCKET_IO}?${ioParams}`;
      this.ios[this.id] = io(endpoint, Ws.option);
      this.ios[this.id].on('connect', this.tuned);

      this.onResponseChAPI(bootOption.ch);
      this.onRequestAPI();
      this.onResponseMeAPI();
    }
  }

  private untune(bootOption: BootOption) {
    const id = bootOption && bootOption.id ? bootOption.id : this.id;
    if (this.ios[id]) {
      this.ios[id]['disconnect']();
      delete this.ios[id];
      delete this.stores[id];
      if (Object.keys(this.ios).length > 0) {
        this.id = Object.keys(this.ios)[0];
      }
      return true;
    }
    return false;
  }

  private tuned() {
    this.webWorker.postMessage('TUNED', { id: this.id, ioType: Sequence.API_SETUP });
  }

  private onRequestAPI() {
    const actions = WsClientToApiRequestActions;
    const actionKeys = Object.keys(actions);
    const actionLength = actionKeys.length;
    const getCoreAPI = (actionName, beforeFunction) => {
      return (requestParams, callback = () => {}) => {
        const reduxState = this.stores[this.id].getState();
        const _requestState = Sequence.getRequestState(actionName, reduxState, requestParams);
        const _actionState = Sequence.getRequestActionState(actionName, requestParams);
        const { requestState, actionState } = beforeFunction(reduxState, _requestState, _actionState);
        this.publicCallbacks[requestState.type] = callback;
        //        console.log(requestState.type, requestState.app.offsetFindId);
        this.ios[this.id].emit(requestState.type, requestState);
        return this.stores[this.id].dispatch(actionState);
      };
    };

    for (let actionNodeCnt = 0; actionNodeCnt < actionLength; actionNodeCnt++) {
      const actionName = actionKeys[actionNodeCnt];
      const actionPlainName = actionName.replace(Sequence.API_TO_SERVER_REQUEST, '');
      const beforeFunction = actions[actionName];
      this.methods[actionPlainName] = getCoreAPI(actionName, beforeFunction);
    }
  }

  private onResponseMeAPI() {
    const getToMeAPI = (action) => {
      return (response) => {
        const actionState = action(response);
        this.stores[this.id].dispatch(actionState);
      };
    };
    const callback: any = getToMeAPI(WsServerToApiEmitAction);
    this.on(Sequence.CATCH_ME_KEY, callback);
  }

  private on(onKey, callback = () => {}) {
    if (this.id && !this.ios[this.id]._callbacks[`$${onKey}`]) {
      this.ios[this.id].on(onKey, callback);
    }
  }

  private off(offKey) {
    //console.log('OFF', this.id, offKey, this.ios);
    if (this.ios[this.id] && this.ios[this.id]._callbacks[`$${offKey}`]) {
      this.ios[this.id].off(offKey);
    }
  }

  private subscribe(state) {
    const apiState = this.stores[this.id].getState();
    const ioType = Sequence.convertServerToApiIoType(this.id, apiState.app.actioned);
    this.exeCallback(apiState.app.actioned, apiState);
    this.webWorker.postMessage(apiState.app.actioned, { ...apiState, ioType });
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
}
