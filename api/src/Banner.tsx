import Sequence from 'common/Sequence';
import conf from 'common/conf';
import define from 'common/define';

import { PublicApi } from 'api/public.api';

const liveCntClassName = 'talkn_banner_live_cnt';

const setStyles = {
  banner: (tag: HTMLDivElement): HTMLDivElement => {
    tag.style.display = 'flex';
    tag.style['justify-content'] = 'flex-start';
    tag.style['align-items'] = 'flex-start';
    tag.style.width = '64px';
    tag.style.height = '64px';
    return tag;
  },
  a: (tag: HTMLAnchorElement): HTMLAnchorElement => {
    tag.style.display = 'inline-flex';
    tag.style.width = 'inherit';
    tag.style.height = 'inherit';
    tag.style['justify-content'] = 'center';
    tag.style['align-items'] = 'center';
    return tag;
  },

  img: (tag: HTMLImageElement): HTMLImageElement => {
    tag.style.display = 'inline-block';
    tag.style.width = '58px';
    tag.style.height = '58px';
    return tag;
  },
  live: (tag: HTMLSpanElement): HTMLSpanElement => {
    const size = '28px';
    tag.style.display = 'flex';
    tag.style['justify-content'] = 'center';
    tag.style['align-items'] = 'center';
    tag.style.position = 'relative';
    tag.style.right = '17px';
    tag.style.border = '1px solid rgba(255,255,255,1)';
    tag.style['border-radius'] = size;
    tag.style.background = 'rgba(79, 174, 159, 0.6)';
    tag.style.margin = '0';
    tag.style.padding = '0';
    tag.style.width = size;
    tag.style.height = size;
    tag.style['min-width'] = size;
    tag.style['min-height'] = size;
    tag.style['max-width'] = size;
    tag.style['max-height'] = size;
    tag.style['text-align'] = 'center';
    tag.style['font-size'] = '13px';
    tag.style['font-weight'] = '300';
    tag.style['line-height'] = '10px';
    tag.style['letter-spacing'] = '0';
    tag.style.color = 'rgb(255, 255, 255)';

    return tag;
  },
};

const getCh = (_ch?: string): string => {
  if (!_ch || _ch === '') return '/';
  const _ch1 = _ch.replace('https:/', '').replace('http:/', '');
  const _ch2 = _ch1.endsWith('/') ? _ch1 : _ch1 + '/';
  const ch = _ch2.startsWith('/') ? _ch2 : '/' + _ch2;
  return ch;
};

const getLive = (): HTMLSpanElement => {
  let span = document.createElement('span');
  span.innerText = '0';
  span.className = liveCntClassName;
  span = setStyles.live(span);
  return span;
};

const getA = (ch): HTMLAnchorElement => {
  let a: HTMLAnchorElement = document.createElement('a');
  a.href = `//${conf.domain}${ch}`;
  a.style.display = 'inline-block';
  a = setStyles.a(a);
  return a;
};

const getImg = (): HTMLImageElement => {
  let img = document.createElement('img');
  img.src = `//${conf.assetsImgPath}logo128.png`;
  img = setStyles.img(img);
  return img;
};

const apiCallback = (ch, href, ioType, method, state) => {
  if (ioType === Sequence.API_RESPONSE_TYPE_BROADCAST) {
    const banners = document.querySelectorAll(`.${define.bannerClass}[data-href="${href}"]`);
    banners.forEach((banner) => {
      const live = banner.querySelector(`.${liveCntClassName}`);
      live.innerHTML = state.thread.liveCnt;
    });
  }
};

const attachEvent = (talknAPI, ch, href) => {
  const id = `${define.bannerClass}: ${ch}`;
  talknAPI.tune({ ch, id }, (ioType, method, state) => {
    apiCallback(ch, href, ioType, method, state);
  });
};

const Banner = (talknAPI: PublicApi): void => {
  const banners = document.querySelectorAll(`.${define.bannerClass}`);
  banners.forEach((banner: HTMLDivElement) => {
    const bannerImg = banner.querySelector('a img');
    if (!bannerImg) {
      const href = banner.getAttribute('data-href');
      if (href) {
        banner = setStyles.banner(banner);
        const ch = getCh(href);
        const a = getA(ch);
        const live = getLive();
        const img = getImg();
        a.append(img);
        banner.append(a);
        banner.append(live);
        attachEvent(talknAPI, ch, href);
      }
    }
  });
};

export default Banner;
