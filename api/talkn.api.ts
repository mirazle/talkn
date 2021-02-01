import define from "common/define";
import Window from "client/Window";
import Banner from "client/Banner";
import { PublicApi } from "api/public.api";

declare global {
  interface Window {
    talknAPI: any;
  }
}
console.log(1);

const script = document.currentScript;
const isPureApi = Boolean(script.getAttribute("src").indexOf(define.SUB_DOMAINS.BANNER) === -1);
const bootTalknApi = async () => {

  console.log(4);
  const talknWindow = new Window(define.APP_TYPES.API);

  console.log(5);
  await talknWindow.boot().then((_window: Window) => {

    console.log(6);
    const talknAPI: PublicApi = new PublicApi(_window);

    console.log(7);
    if (isPureApi) {

      console.log(8);
      window.talknAPI = talknAPI;
    } else {

      console.log(9);
      Banner(talknAPI);
    }
  });
};

switch (window.document.readyState) {
  case "interactive":
  case "complete":
    console.log(2);
    bootTalknApi();
    break;
  case "loading":
    console.log(3);
    awaitbootTalknApi();
//    window.addEventListener('load', bootTalknApi);
    break;
}
