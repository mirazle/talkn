import BootOption from 'common/BootOption';
import define from 'common/define';

import { HookProps } from 'components/container/Thread/GlobalContext';

export type Type = BootOption;

export const init: Type = new BootOption(define.APP_TYPES.COMPONENTS);

export default (props: HookProps) => {};
