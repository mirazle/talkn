import { HookProps } from 'components/container/Thread/GlobalContext';

export const detailMenuMeta = 'meta';
export const detailMenuAnalyze = 'analyze';
export const detailMenuConfig = 'config';
export const detailMenuIndexList = [detailMenuMeta, detailMenuAnalyze, detailMenuConfig];
export type DetailMenuType = typeof detailMenuMeta | typeof detailMenuAnalyze | typeof detailMenuConfig;

export type Type = DetailMenuType;
export const init: Type = detailMenuMeta;
export default ({ action, layout, setMenuMode }: HookProps) => {};
