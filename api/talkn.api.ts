import Window from "client/Window";
import PublicApi from "api/public.api";

declare global {
  interface Window {
    talknAPI: any;
  }
}

const bootTalknApi = () => {
  const clientWindow = new Window(false);
  clientWindow.boot().then((_window: Window) => {
    window.talknAPI = new PublicApi(_window);
  });
};

if (window.top.document.readyState === "complete") {
  bootTalknApi();
} else {
  window.onload = () => bootTalknApi();
}
