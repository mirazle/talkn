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
const isPureApi = Boolean(script.getAttribute("src").indexOf(define.SUB_DOMAINS.BANNER) === -1);
const talknWindow = new Window(define.APP_TYPES.API);

window.talknAPI = new Promise((resolve) => {
  talknWindow.boot().then((_window: Window) => {
    const talknAPI: PublicApi = new PublicApi(_window);
    if (isPureApi) {
      window.talknAPI = talknAPI;
    } else {
      Banner(talknAPI);
    }
    resolve(talknAPI);
  });
});

/*

@ 1 socket.o.client 

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
const isPureApi = Boolean(script.getAttribute("src").indexOf(define.SUB_DOMAINS.BANNER) === -1);
const talknWindow = new Window(define.APP_TYPES.API);
const on = async () => {
  const _window = await talknWindow.boot();
  const talknAPI: PublicApi = new PublicApi(_window);
  if (isPureApi) {
    window.talknAPI = talknAPI;
  } else {
    Banner(talknAPI);
  }
};

window.talknAPI = () => { on };


@ 2

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
const isPureApi = Boolean(script.getAttribute("src").indexOf(define.SUB_DOMAINS.BANNER) === -1);
const bootTalknApi = () => {
  const talknWindow = new Window(define.APP_TYPES.API);
  talknWindow.boot().then((_window: Window) => {
    const talknAPI: PublicApi = new PublicApi(_window);
    if (isPureApi) {
      window.talknAPI = talknAPI;
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

*/