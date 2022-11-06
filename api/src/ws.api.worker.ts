import BootOption from 'common/BootOption';
import PostMessage, { MessageClientAndWsApiType, MessageParams } from 'common/PostMessage';
import Sequence from 'common/Sequence';

import Ws from 'api/Ws';

export default class WsApiWorker {
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
      ioType: Sequence.API_SETUP,
      method,
      params,
      methodBack,
    };
    this.worker.postMessage(message);
  }
  private onMessage(e: MessageEvent): void {
    const { id, type, ioType, method, params }: MessageClientAndWsApiType = e.data;

    if (type === PostMessage.CLIENT_TO_WSAPI_TYPE) {
      this.ws.exe(method, params);
    }
  }
  private onMessageError(e: ErrorEvent): void {
    console.warn(e);
  }
}

new WsApiWorker(self as any);
