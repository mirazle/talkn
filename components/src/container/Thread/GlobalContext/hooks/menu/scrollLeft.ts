import { HookProps } from 'components/container/Thread/GlobalContext';

export type Type = number;
export const init: Type = 0;

export default ({ state, bools, doms, setAction, setBools }: HookProps) => {
  if (doms.screen) {
    const { scrollLeft, clientWidth, scrollWidth } = doms.screen;
    let openMenu = false;
    let screenScrolling = true;
    // Caution: doms.screenの横幅が更新されると強制的にscrollLeftが0になってしまう。
    if (scrollLeft === 0) {
      openMenu = true;
      screenScrolling = false;
    } else if (scrollLeft === scrollWidth - clientWidth) {
      openMenu = false;
      screenScrolling = false;
    }
    setBools({ ...bools, screenScrolling, openMenu });
  }
};
