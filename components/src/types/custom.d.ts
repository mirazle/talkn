type valueOf<T> = T[keyof T];

declare module 'worker-loader?inline=fallback&publicPath=/&filename=ws.api.worker.js!*' {
  class WsApiWorker extends Worker {
    constructor();
  }
  export default WsApiWorker;
}
