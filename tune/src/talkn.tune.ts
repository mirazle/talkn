import define from 'common/define';

import Window from 'tune/Window';

declare global {
  interface Window {
    talknCh: string;
    talknFavicon: string;
    talknServerMetas: any;
    talknWindow: any;
    talknTune: any;
    talknCategoryChs: any;
    talknInterview: any;
    talknInterviewIndex: any;
    talknComponents: any;
    talknInterviewPointer: number;
    talknInterviewUrls: {
      index: string;
      interview: string;
    };
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

const id = define.APP_TYPES.TUNE;
if (window.talknTune === undefined) {
  window.talknTune = new Window(id);
  window.talknTune.boot();
}
