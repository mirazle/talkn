import define from "common/define";
import Window from "client/Window";
import Banner from "client/Banner";
import { PublicApi } from "api/public.api";

declare global {
  interface Window {
    talknAPI: any;
  }
}
const script = document.currentScript;
console.log(script.getAttribute('async'));
const isPureApi = Boolean(script.getAttribute("src").indexOf(define.SUB_DOMAINS.BANNER) === -1);
const bootTalknApi = () => {
  console.log("A");
  const talknWindow = new Window(define.APP_TYPES.API);
  talknWindow.boot().then((_window: Window) => {
console.log("B");
    const talknAPI: PublicApi = new PublicApi(_window);
    if (isPureApi) {
console.log("C");
      window.talknAPI = talknAPI;
    } else {
console.log("D");
      Banner(talknAPI);
    }
  });
};

console.log(window.document.readyState);
switch (window.document.readyState) {
  case "interactive":
  case "complete":
    bootTalknApi();
    break;
}
