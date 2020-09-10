declare module "worker-loader?inline=true&publicPath=/&name=ws.api.worker.js!*" {
  class WsApiWorker extends Worker {
    constructor();
  }
  export default WsApiWorker;
}
