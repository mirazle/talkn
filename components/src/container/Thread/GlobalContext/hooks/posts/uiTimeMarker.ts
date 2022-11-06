import { HookProps } from 'components/container/Thread/GlobalContext';
import UiTimeMarker from 'components/container/Thread/UiTimeMarker';

export type Type = UiTimeMarker;
export const init: Type = new UiTimeMarker();

export default ({}: HookProps) => {};
