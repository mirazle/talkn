import Post from 'api/store/Post';

import { HookProps } from 'components/container/Thread/GlobalContext';

export const menuModeSmall = 'SMALL';
export const menuModeBar = 'BAR';
export const menuModeNormal = 'NORMAL';
export const menuModeInclude = 'INCLUDE';
export const menuModeCycle = [menuModeSmall, menuModeNormal];
export type MenuModeType = typeof menuModeSmall | typeof menuModeBar | typeof menuModeNormal | typeof menuModeInclude;

export type Type = MenuModeType;
export const init: Type = menuModeSmall;

export default ({}: HookProps) => {};
