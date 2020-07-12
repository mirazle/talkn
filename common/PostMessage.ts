export default class PostMessage {
  // HANDLE_API_AND_CLIENT
  static get HANDLE_API_AND_CLIENT() {
    return "HANDLE_API_AND_CLIENT";
  }
  static get API_TO_CLIENT_TYPE() {
    return "API_TO_CLIENT_TYPE";
  }
  static get CLIENT_TO_API_TYPE() {
    return "CLIENT_TO_API_TYPE";
  }

  // HANDLE_API_AND_EXT
  static get HANDLE_EXT_AND_API() {
    return "HANDLE_EXT_AND_API";
  }
  static get MEDIA_TO_CLIENT_TYPE() {
    return "MEDIA_TO_CLIENT_TYPE";
  }
  static get EXT_TO_API_TYPE() {
    return "EXT_TO_API_TYPE";
  }

  // HANDLE_CLIENT_AND_EXT
  static get HANDLE_EXT_AND_CLIENT() {
    return "bootExtension";
  }
  static get CLIENT_TO_EXT_TYPE() {
    return "CLIENT_TO_EXT_TYPE";
  }
  static get EXT_TO_CLIENT_TYPE() {
    return "EXT_TO_CLIENT_TYPE";
  }
}
