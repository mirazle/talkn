import atob from 'atob';

import Ui from 'common/clientState/store/Ui';

export default {
  isUrl: (str) => {
    const pattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*|\\/)?$', // fragment locator
      'i'
    ); // fragment locåator

    return !pattern.test(str) ? false : true;
  },
  getSaveFaviconName: (fileName) => {
    if (fileName) {
      const _fileName = fileName.replace(/\u002f/g, '_');
      return _fileName.indexOf('.png') > 0 ? _fileName : _fileName + '.png';
    }
  },
  trimPx: (value) => {
    return value.toString().replace('px', '');
  },
  getUpperPrefix: (str) => {
    let text = str.charAt(0).toUpperCase() + str.slice(1);
    return text.substring(0, 1).toUpperCase() + text.substring(1);
  },
  timeAgoFormatter: (value, unit, suffix, extensionMode = Ui.extensionModeNone) => {
    let shortUnit = String(unit);
    switch (String(unit)) {
      case 'year':
        shortUnit = 'YR';
        break;
      case 'month':
        shortUnit = 'mo';
        break;
      case 'week':
        shortUnit = 'wk';
        break;
      case 'hour':
        shortUnit = 'hr';
        break;
      case 'minute':
        shortUnit = 'min';
        break;
      case 'second':
        shortUnit = 'sec';
        break;
    }
    const dispSuffix = extensionMode === Ui.extensionModeNone ? suffix : suffix.replace('ago', '');
    return `${value} ${shortUnit} ${dispSuffix}`;
  },
  parseJwt: (token) => {
    if (token === null) return null;
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(jsonPayload);
  },
  deepCopy: (obj) => {
    return JSON.parse(JSON.stringify(obj));
  },
  deepEquals: (obj1, obj2) => {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  },
  getAgeByBirthday: (birthday: number): number | '-' => {
    let returnAge = undefined;
    if (birthday !== 0) {
      const birthDate = new Date(birthday);
      const nowDate = new Date();
      const age = nowDate.getFullYear() - birthDate.getFullYear();
      const thisYearsBirthday = new Date(nowDate.getFullYear(), birthDate.getMonth(), birthDate.getDate());
      returnAge = age + (thisYearsBirthday.getTime() > nowDate.getTime() ? -1 : 0);
    }
    return returnAge ? returnAge : '-';
  },
  getUniqueId: (label: string, strong = 1000) => {
    return `${label}_${new Date().getTime().toString(16) + Math.floor(strong * Math.random()).toString(16)}`;
  },
  getHeadUpper: (str: string) => {
    if (typeof str !== 'string' || !str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  },
};
