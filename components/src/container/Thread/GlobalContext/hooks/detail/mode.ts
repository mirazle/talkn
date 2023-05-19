import Post from 'api/store/Post';

import { HookProps } from 'components/container/Thread/GlobalContext';
import { breakTabWidth } from 'components/styles/layouts';

import { menuModeBar, menuModeSmall, menuModeNormal } from '../menu/mode';

export const detailModeBar = 'Bar';
export const detailModeExpand = 'EXPAND';
export const detailModeModal = 'MODAL';
export const detailModeCycle = [detailModeBar, detailModeExpand];
export type DetailModeType = typeof detailModeBar | typeof detailModeExpand | typeof detailModeModal;

export type Type = DetailModeType;
export const getInit = (root: HTMLElement): Type => {
  return root.clientWidth <= breakTabWidth ? detailModeBar : detailModeExpand;
};

export default ({ layout, setDetailMode, setMenuMode }: HookProps) => {
  if (layout.isSpLayout) {
    setMenuMode(menuModeSmall);
  }
  if (layout.isTabLayout) {
    setDetailMode(detailModeBar);
  }
  if (!layout.isTabLayout && !layout.isSpLayout) {
    setDetailMode(detailModeExpand);
    setMenuMode(menuModeNormal);
  }
};
