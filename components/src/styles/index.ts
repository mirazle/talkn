import animations from './animations';
import blocks from './blocks';
import colors from './colors';
import dropFilter from './dropFilter';
import emotions from './emotions';
import layouts from './layouts';
import shadow from './shadow';
import zIndex from './zIndex';

export * as animations from './animations';
export * as blocks from './blocks';
export * as colors from './colors';
export * as emotions from './emotions';
export * as dropFilter from './dropFilter';
export * as layouts from './layouts';
export * as shadow from './shadow';
export * as zIndex from './zIndex';

export const getRgba = colors.getRgba;
export const getRgb = colors.getRgb;

export const getTrimUnitNumber = (value: string) => {
  return Number(value.replace('px', ''));
};

export default {
  zIndex,
  animations,
  layouts,
  colors,
  emotions,
  dropFilter,
  blocks,
  shadow,
  getTrimUnitNumber,
};
