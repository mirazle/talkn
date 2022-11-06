import define from 'common/define';

import Banner from 'api/Banner';
import Window from 'api/Window';
import { PublicApi } from 'api/public.api';

declare global {
  interface Window {
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

const script = document.currentScript;
const isPureApi = Boolean(script.getAttribute('src').indexOf(define.SUB_DOMAINS.BANNER) === -1);
const apiWindow = new Window(define.APP_TYPES.API);

window.talknAPI = new Promise((resolve) => {
  apiWindow.boot().then((_window: Window) => {
    const talknAPI: PublicApi = new PublicApi(_window);
    if (isPureApi) {
      window.talknAPI = talknAPI;
    } else {
      Banner(talknAPI);
    }
    resolve(talknAPI);
  });
});
