import { HookProps } from 'components/container/Thread/GlobalContext';
import { detailModeBar, detailModeExpand } from 'components/container/Thread/GlobalContext/hooks/detail/transformMode';

import { menuModeBar, menuModeNormal, menuModeSmall } from './menu/mode';

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

export default ({ doms, layout, setMenuMode, setDetailTransformMode }: HookProps) => {
  if (layout.isSpLayout) {
    if (doms.screen) {
      console.log('SP AA');
      const screenElm = doms.screen;
      setMenuMode(menuModeSmall);
      if (screenElm.scrollLeft === 0) {
        screenElm.scrollTo({ left: screenElm.scrollWidth, behavior: 'auto' });
      }
    }
  } else if (layout.isTabLayout) {
    if (doms.screen) {
      setMenuMode(menuModeNormal);
      setDetailTransformMode(detailModeBar);
    }
  } else {
    if (doms.screen) {
      setMenuMode(menuModeNormal);
      setDetailTransformMode(detailModeExpand);
    }
  }
};
