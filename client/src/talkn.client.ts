import define from 'common/define';

import Window from 'client/Window';

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
const id = window.name === 'global' || window.name === '' ? define.APP_TYPES.CLIENT : define.APP_TYPES.EXTENSION;

window.talknWindow = new Window(id);
window.talknWindow.boot();
window.talknWindow.dom.renderTalkn();
