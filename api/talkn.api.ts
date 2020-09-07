import Window from "client/Window";
import PublicApi from "api/public.api";

declare global {
  interface Window {
    talknAPI: any;
  }
}
console.log("A");
const bootTalknApi = () => {
  const clientWindow = new Window(false);
  console.log("D");
  clientWindow.boot().then((_window: Window) => {
    console.log("E");
    window.talknAPI = new PublicApi(_window);
    console.log("F");
  });
};

if (window.top.document.readyState === "complete") {
  console.log("B");
  bootTalknApi();
} else {
  console.log("C");
  window.onload = () => bootTalknApi();
}
