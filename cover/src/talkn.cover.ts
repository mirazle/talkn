// eslint-disable-next-line import/no-unassigned-import
import 'normalize.css';

import BootOption from 'common/BootOption';
import conf from 'common/conf';
import define from 'common/define';

import Window from 'cover/Window';

declare global {
  interface Window {
    talknWindow: any;
    talknInterview: any;
    talknInterviewIndex: any;
    talknInterviewPointer: number;
    talknMedia: any;
    talknAPI: any;
    Youtube: any;
    log: any;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
  interface Math {
    easeInOutQuad: any;
  }
}

const location = String(window.location);
const splitedUrl = location.split('/');
const splitedUrlLength = splitedUrl.length;

let ch = '/';
window.talknInterviewPointer = window.talknInterviewIndex.contents.length;
if (splitedUrl[splitedUrlLength - 1] === '') {
  ch = location;
} else {
  const lastSlash = location.lastIndexOf('/');
  const _talknInterviewPointer = Number(location.substr(lastSlash + 1, lastSlash));
  ch = location.substr(0, lastSlash + 1);

  if (_talknInterviewPointer <= 0) {
    window.talknInterviewPointer = 1;
  }

  if (window.talknInterviewPointer < window.talknInterviewIndex.contents.length) {
    window.talknInterviewPointer = window.talknInterviewIndex.contents.length;
  } else {
    window.talknInterviewPointer = _talknInterviewPointer;
  }
}

if (conf.domain === define.DEVELOPMENT_DOMAIN) {
  if (ch.indexOf(define.PORTS.DEVELOPMENT_COVER) >= 0) {
    ch = ch.replace(`https://${define.DEVELOPMENT_DOMAIN}:${define.PORTS.DEVELOPMENT_COVER}`, '');
  } else {
    ch = ch.replace(`https://${define.SUB_DOMAINS.COVER}.${define.DEVELOPMENT_DOMAIN}`, '');
  }
}

const id = define.APP_TYPES.TOP;
const bootOption = new BootOption(id, { ch });
window.talknWindow = new Window(id, bootOption);
window.talknWindow.boot();
window.talknWindow.dom.renderTalkn();
