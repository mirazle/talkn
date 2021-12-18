import 'normalize.css';

import { ConfigType, configInit } from 'common/Config';
import conf from 'common/conf';
import define from 'common/define';

import Render from 'cover/App';

export const selectContentMenuLivePages = 'livePages';
export const selectContentMenuCreators = 'creators';
export const selectContentMenuAnalytics = 'analytics';
export const selectContentMenuDefault = selectContentMenuLivePages;
export type SelectContentMenuType =
  | typeof selectContentMenuLivePages
  | typeof selectContentMenuCreators
  | typeof selectContentMenuAnalytics;

declare global {
  interface Window {
    talknThread: any;
    talknServerMetas: any;
    talknConfig: ConfigType;

    talknSelectContentMenu: SelectContentMenuType;
    talknComponents: any;
    talknCreators: any;
    talknCreatorsPointer: number;
    talknWindow: any;
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

const href = String(window.location.href);
const splitedUrl = href.split('/');
const splitedUrlLength = splitedUrl.length;
let ch = '/';

window.talknCreatorsPointer = window.talknConfig && window.talknConfig.creatorsIndex ? window.talknConfig.creatorsIndex.length : 0;

if (splitedUrl[splitedUrlLength - 1] === '') {
  ch = href;
} else {
  const lastSlash = href.lastIndexOf('/');
  const _talknCreatorsPointer = Number(href.substr(lastSlash + 1, lastSlash));
  ch = href.substr(0, lastSlash + 1);

  if (_talknCreatorsPointer <= 0) {
    window.talknCreatorsPointer = 1;
  }

  if (window.talknCreatorsPointer < window.talknConfig.creatorsIndex.length) {
    window.talknCreatorsPointer = window.talknConfig.creatorsIndex.length;
  } else {
    window.talknCreatorsPointer = _talknCreatorsPointer;
  }
}

if (conf.domain === define.DEVELOPMENT_DOMAIN) {
  if (ch.indexOf(define.PORTS.DEVELOPMENT_COVER) >= 0) {
    ch = ch.replace(`https://${define.DEVELOPMENT_DOMAIN}:${define.PORTS.DEVELOPMENT_COVER}`, '');
  } else {
    ch = ch.replace(`https://${define.SUB_DOMAINS.COVER}.${define.DEVELOPMENT_DOMAIN}`, '');
  }
} else {
  ch = ch.replace(`https://${define.SUB_DOMAINS.COVER}.${define.PRODUCTION_DOMAIN}`, '');
}

Render();
