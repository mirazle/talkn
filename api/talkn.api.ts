import define from "common/define";
import Window from "client/Window";
import PublicApi from "api/public.api";

declare global {
  interface Window {
    talknAPI: any;
  }
}
const curScriptElement = document.currentScript;
console.log(curScriptElement);
const bootBanner = () => {
  const banners = document.querySelectorAll(`.${define.bannerId}`);
  banners.forEach((banner) => {
    const bannerImg = banner.querySelector("a img");
    if (banner && !bannerImg) {
      console.log("`@@@@@@!");
    }
  });
};
const bootTalknApi = () => {
  const talknWindow = new Window(define.APP_TYPES.API);
  talknWindow.boot().then((_window: Window) => {
    window.talknAPI = new PublicApi(_window);
    // bootBanner();
  });
};

if (window.top.document.readyState === "complete") {
  bootTalknApi();
} else {
  window.onload = () => bootTalknApi();
}

// window.talknAPI = new WsApiWorker();
