import { HookProps } from 'components/container/Thread/GlobalContext';

export type Type = {
  innerWidth: number;
  innerHeight: number;
  isSpLayout: boolean;
  isTabLayout: boolean;
  isSmallPcLayout: boolean;
  isFullScreen: boolean;
};

export const init: Type = {
  innerWidth: 0,
  innerHeight: 0,
  isSpLayout: false,
  isTabLayout: false,
  isSmallPcLayout: false,
  isFullScreen: false,
};

export default ({ doms, layout }: HookProps) => {
  if (layout.isSpLayout) {
    if (doms.screen) {
      const screenElm = doms.screen;
      console.log('SP');
      if (screenElm.scrollLeft === 0) {
        screenElm.scrollTo({ left: screenElm.scrollWidth, behavior: 'auto' });
      }
    }
  } else if (layout.isTabLayout) {
    if (doms.screen) {
      console.log('TAB');
    }
  } else {
    if (doms.screen) {
      console.log('PC');
    }
  }
};
