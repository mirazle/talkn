import define from "common/define";
import Window from "client/Window";
import PublicApi from "api/public.api";

declare global {
  interface Window {
    talknBlob: any;
    talknAPI: any;
  }
}

const bootTalknApi = () => {
  const talknWindow = new Window(define.APP_TYPES.API);
  talknWindow.boot().then((_window: Window) => {
    window.talknAPI = new PublicApi(_window);
  });
};

if (window.top.document.readyState === "complete") {
  bootTalknApi();
} else {
  window.onload = () => bootTalknApi();
}

// window.talknAPI = new WsApiWorker();
