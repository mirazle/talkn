import define from "common/define";
import conf from "common/conf";
import Sequence from "api/Sequence";
import { PublicApi } from "api/public.api";

const liveCntClassName = "talkn_banner_live_cnt";
const getCh = (_ch?: string): string => {
  if (!_ch || _ch === "") return "/";
  const _ch1 = _ch.replace("https:/", "").replace("http:/", "");
  const _ch2 = _ch1.endsWith("/") ? _ch1 : _ch1 + "/";
  const ch = _ch2.startsWith("/") ? _ch2 : "/" + _ch2;
  return ch;
};

const getLive = (): HTMLDivElement => {
  const div = document.createElement("div");
  div.innerText = "0";
  div.className = liveCntClassName;
  return div;
};

const getA = (ch): HTMLAnchorElement => {
  const a = document.createElement("a");
  a.href = `//${conf.domain}${ch}`;
  return a;
};

const getImg = (): HTMLImageElement => {
  const img = document.createElement("img");
  img.src = `//${conf.assetsImgPath}logo.png`;
  return img;
};

const apiCallback = (ch, href, ioType, method, state) => {
  console.log("CALLBACK " + ioType + ch);
  if (ioType === Sequence.API_RESPONSE_TYPE_BROADCAST) {
    const banners = document.querySelectorAll(`.${define.bannerClass}[data-href="${href}"]`);
    banners.forEach((banner) => {
      const live = banner.querySelector(`.${liveCntClassName}`);
      live.innerHTML = state.thread.liveCnt;
    });
  }
};

const attachEvent = (talknAPI, ch, href) => {
  console.log("BANNER TUNE " + ch);
  talknAPI.tune({ ch, id: ch }, (ioType, method, state) => {
    apiCallback(ch, href, ioType, method, state);
  });
};

const Banner = (talknAPI: PublicApi): void => {
  console.log("BANNER A");
  const banners = document.querySelectorAll(`.${define.bannerClass}`);
  banners.forEach((banner: Element) => {
    console.log("BANNER B");
    const bannerImg = banner.querySelector("a img");
    if (!bannerImg) {
      console.log("BANNER C");
      const href = banner.getAttribute("data-href");
      if (href) {
        console.log("BANNER D");
        const ch = getCh(href);
        const a = getA(ch);
        const live = getLive();
        const img = getImg();
        a.append(img);
        banner.append(live);
        banner.append(a);
        attachEvent(talknAPI, ch, href);
      }
    }
  });
};

export default Banner;
