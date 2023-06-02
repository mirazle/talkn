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
    console.log('SP');
    if (doms.screen) {
      const screenElm = doms.screen;

      if (screenElm.scrollLeft === 0) {
        screenElm.scrollTo({ left: screenElm.scrollWidth, behavior: 'auto' });
      }
    }
  } else if (layout.isTabLayout) {
    console.log('TAB');
    if (doms.screen) {
    }
  } else {
    console.log('PC');
    if (doms.screen) {
    }
  }
};
/*
  if (layout.isSpLayout) {
    setMenuMode(menuModeSmall);
  }
  if (layout.isTabLayout) {
    setDetailMode(detailModeBar);
  }
  if (!layout.isTabLayout && !layout.isSpLayout) {
    console.log('PC', action);
    setDetailMode(detailModeExpand);
    setMenuMode(menuModeNormal);
  }
  */
