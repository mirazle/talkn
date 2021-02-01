import define from "common/define";
import Window from "client/Window";
import Banner from "client/Banner";
import { PublicApi } from "api/public.api";

declare global {
  interface Window {
    talknAPI: any;
  }
}

window.talknAPI = new Promise((resolve) => {
  const script = document.currentScript;
  const isPureApi = Boolean(script.getAttribute("src").indexOf(define.SUB_DOMAINS.BANNER) === -1);
  const bootTalknApi = () => {
    const talknWindow = new Window(define.APP_TYPES.API);
    talknWindow.boot().then((_window: Window) => {
      const talknAPI: PublicApi = new PublicApi(_window);
      if (isPureApi) {
        resolve(talknAPI);
      } else {
        Banner(talknAPI);
      }
    });
  };

  switch (window.document.readyState) {
    case "interactive":
    case "complete":
      bootTalknApi();
      break;
    case "loading":
      window.addEventListener('load', bootTalknApi);
      break;
  }
}).then((talknAPI) => {
  window.talknAPI = talknAPI;
});
