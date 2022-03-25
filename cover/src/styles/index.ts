import blocks from './blocks';
import colors from './colors';
import layouts from './layouts';
import shadow from './shadow';
import zIndex from './zIndex';

export const getTrimUnitNumber = (value: string) => Number(value.replace('px', ''));

export default {
  zIndex,
  ...layouts,
  ...colors,
  ...blocks,
  ...shadow,
  getTrimUnitNumber,
};
