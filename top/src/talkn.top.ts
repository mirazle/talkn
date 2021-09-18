// eslint-disable-next-line import/no-unassigned-import
import 'normalize.css';

import define from 'common/define';

import Window from 'top/Window';

const id = define.APP_TYPES.TOP;

window.talknWindow = new Window(id);
window.talknWindow.boot();
window.talknWindow.dom.renderTalkn();
