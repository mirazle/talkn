import animations from './animations';
import blocks from './blocks';
import colors from './colors';
import dropFilter from './dropFilter';
import layouts from './layouts';
import shadow from './shadow';
import zIndex from './zIndex';

export const getTrimUnitNumber = (value: string) => Number(value.replace('px', ''));

export default {
  zIndex,
  ...animations,
  ...layouts,
  ...colors,
  ...dropFilter,
  ...blocks,
  ...shadow,
  getTrimUnitNumber,
};
