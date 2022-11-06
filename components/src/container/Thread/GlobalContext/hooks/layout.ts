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

export default ({ action, bools, layout, refs }: HookProps) => {
  if (layout.isSpLayout) {
    if (refs.screen.current) {
      const screenElm = refs.screen.current as HTMLElement;
      if (screenElm.scrollLeft === 0) {
        screenElm.scrollTo({ left: screenElm.scrollWidth, behavior: 'auto' });
      }
    }
  }
};
