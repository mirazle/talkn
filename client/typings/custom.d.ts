declare module "worker-loader?publicPath=/&name=ws.client.worker.js!*" {
  class WsClientWorker extends Worker {
    constructor();
  }
  export default WsClientWorker;
}