import define from 'common/define';

import Window from 'client/Window';

const id = window.name === 'global' || window.name === '' ? define.APP_TYPES.PORTAL : define.APP_TYPES.EXTENSION;

window.talknWindow = new Window(id);
window.talknWindow.boot();
window.talknWindow.dom.renderTalkn();
