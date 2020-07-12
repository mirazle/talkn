import TalknWindow from "client/operations/TalknWindow";
import TalknSetup from "client/operations/TalknSetup";
TalknSetup.setupMath();

declare global {
  interface Window {
    name: string;
    talknWindow: any;
    talknMedia: any;
    Youtube: any;
  }
}

declare global {
  interface Math {
    easeInOutQuad: any;
  }
}

const talknWindow = new TalknWindow();
if (!window.talknWindow) window.talknWindow = talknWindow;
