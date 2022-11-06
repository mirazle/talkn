import Post from 'api/store/Post';

import { HookProps } from 'components/container/Thread/GlobalContext';

export const detailModeBar = 'Bar';
export const detailModeExpand = 'EXPAND';
export const detailModeModal = 'MODAL';
export const detailModeCycle = [detailModeBar, detailModeExpand];
export type DetailModeType = typeof detailModeBar | typeof detailModeExpand | typeof detailModeModal;

export type Type = DetailModeType;
export const init: Type = detailModeExpand;

export default ({}: HookProps) => {};
