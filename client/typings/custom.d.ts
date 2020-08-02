declare module "worker-loader?publicPath=/&name=worker.js!*" {
  class WsApiWorker extends Worker {
    constructor();
  }
  export default WsApiWorker;
}
