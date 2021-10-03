// eslint-disable-next-line import/no-unassigned-import
import 'normalize.css';

import define from 'common/define';

import Window from 'top/Window';

declare global {
  interface Window {
    talknWindow: any;
    talknArticles: { [key: string]: any };
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

const id = define.APP_TYPES.TOP;
window.talknArticles = {};
window.talknWindow = new Window(id);
window.talknWindow.boot();
window.talknWindow.dom.renderTalkn();