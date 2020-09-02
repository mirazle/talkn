declare module "worker-loader?publicPath=/&name=ws.api.worker.js!*" {
  class WsApiWorker extends Worker {
    constructor();
  }
  export default WsApiWorker;
}
