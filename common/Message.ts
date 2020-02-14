export default class Message {
  static get coreApiToApp() {
    return "coreApiToApp";
  }
  static get connectionMethod() {
    return "handleCoreApi";
  }
  static get appToCoreApi() {
    return "appToCoreApi";
  }
  static get appToAction() {
    return "appToAction";
  }
}
