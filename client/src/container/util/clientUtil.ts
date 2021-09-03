export default class ClientUtil {
  static deleteProtcol(str) {
    return str.replace('https:/', '').replace('http:/', '');
  }
}
