import define from 'common/define';

let storage = {};

export default class TalknSession {
  static getBaseKey(ch) {
    return `${define.storageKey.baseKey}${ch}`;
  }

  static setStorage(rootCh, key, value) {
    if (key) {
      const baseKey = TalknSession.getBaseKey(rootCh);
      if (typeof localStorage !== 'undefined') {
        let items = JSON.parse(localStorage.getItem(baseKey));
        items = JSON.stringify({ ...items, [key]: value });
        localStorage.setItem(baseKey, items);
      } else {
        let items = storage[baseKey] ? storage[baseKey] : {};
        items = { ...items, [key]: value };
        storage[baseKey] = items;
      }
      return true;
    } else {
      return false;
    }
  }

  static getStorage(rootCh, key) {
    const baseKey = TalknSession.getBaseKey(rootCh);
    if (typeof localStorage !== 'undefined') {
      const item = JSON.parse(localStorage.getItem(baseKey));
      return item && item[key] ? item[key] : {};
    } else {
      let items = storage[baseKey] ? storage[baseKey] : {};
      return items[key] ? items[key] : {};
    }
  }

  static getCaches(rootCh) {
    const menuLogs = TalknSession.getStorage(rootCh, define.storageKey.menuLogs);
    const app = TalknSession.getStorage(rootCh, define.storageKey.app);
    const thread = TalknSession.getStorage(rootCh, define.storageKey.thread);
    const setting = TalknSession.getStorage(rootCh, define.storageKey.setting);
    return { menuLogs, app, thread, setting };
  }
}
