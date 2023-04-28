import Post from 'api/store/Post';

import { HookProps } from 'components/container/Thread/GlobalContext';
import { breakTabWidth } from 'components/styles/layouts';

export const menuModeSmall = 'SMALL';
export const menuModeBar = 'BAR';
export const menuModeNormal = 'NORMAL';
export const menuModeInclude = 'INCLUDE';
export const menuModeCycle = [menuModeSmall, menuModeNormal];
export type MenuModeType = typeof menuModeSmall | typeof menuModeBar | typeof menuModeNormal | typeof menuModeInclude;

export type Type = MenuModeType;
export const getInit = (root: HTMLElement): Type => {
  return root.clientWidth <= breakTabWidth ? menuModeSmall : menuModeNormal;
};

export default ({}: HookProps) => {};
