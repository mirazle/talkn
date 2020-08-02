declare module "worker-loader?name=worker.js!*" {
  class WsApiWorker extends Worker {
    constructor();
  }
  export default WsApiWorker;
}
