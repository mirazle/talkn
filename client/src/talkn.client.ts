import TalknAPI from "client/operations/TalknAPI";
import TalknWindow from "client/operations/TalknWindow";
import TalknSetup from "client/operations/TalknSetup";
TalknSetup.setupMath();

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
    talknIndex: number;
    talknAPI: any;
    TalknAPI: any;
    talknWindow: any;
    talknMedia: any;
    Youtube: any;
    __talknWindow__: any;
    __talknAPI__: any;
  }
}
declare global {
  interface Math {
    easeInOutQuad: any;
  }
}
if (!window.TalknAPI) window.TalknAPI = TalknAPI;
if (!window.__talknAPI__) window.__talknAPI__ = [];

const talknIndex = window.talknIndex ? window.talknIndex + 1 : 1;
const talknWindow = new TalknWindow(talknIndex);

if (!window.talknWindow) window.talknWindow = talknWindow;
if (!window.__talknWindow__) window.__talknWindow__ = [];
if (!window.__talknWindow__[talknIndex])
  window.__talknWindow__[talknIndex] = talknWindow;

  