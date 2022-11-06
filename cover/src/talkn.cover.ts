import conf from 'common/conf';
import define from 'common/define';

import Render from 'cover/App';

declare global {
  interface Window {
    google: any;
    talknDatas: any;
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

window.talknDatas.storiesPointer =
  window.talknDatas.config && window.talknDatas.config.stories ? window.talknDatas.config.stories.length : 0;

if (splitedUrl[splitedUrlLength - 1] === '') {
  ch = href;
} else {
  const lastSlash = href.lastIndexOf('/');
  const _talknStoriesPointer = Number(href.substr(lastSlash + 1, lastSlash));
  ch = href.substr(0, lastSlash + 1);

  if (_talknStoriesPointer <= 0) {
    window.talknDatas.storiesPointer = 1;
  }

  if (window.talknDatas.storiesPointer < window.talknDatas.config.stories.length) {
    window.talknDatas.storiesPointer = window.talknDatas.config.stories.length;
  } else {
    window.talknDatas.storiesPointer = _talknStoriesPointer;
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
