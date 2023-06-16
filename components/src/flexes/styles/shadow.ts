import colors, { getRgbColor } from './colors';

export const shadowSize = 10;
const shadowTextType = '1px 1px';
const shadowCircle = `0 0 ${shadowSize}px 0`;
const shadowHorizon = `0 ${shadowSize / 2}px ${shadowSize}px 0`;

export const baseTextShadow = `${shadowTextType} ${getRgbColor(colors.darkRgb)}`;
export const shadowCircleBrighter = `${shadowCircle} ${getRgbColor(colors.brighterRgb)}`;
export const shadowCircleBright = `${shadowCircle} ${getRgbColor(colors.brightRgb)}`;
export const shadowCircleBase = `${shadowCircle} ${getRgbColor(colors.baseRgb)}`;
export const shadowCircleDark = `${shadowCircle} ${getRgbColor(colors.darkRgb)}`;
export const shadowHorizonBrighter = `${shadowHorizon} ${getRgbColor(colors.brighterRgb)}`;
export const shadowHorizonBright = `${shadowHorizon} ${getRgbColor(colors.brightRgb)}`;
export const shadowHorizonBase = `${shadowHorizon} ${getRgbColor(colors.baseRgb)}`;
export const shadowHorizonDark = `${shadowHorizon} ${getRgbColor(colors.darkRgb)}`;
export const shadowDetailMenu = `0px -10px 50px 0px rgb(180, 180, 180) inset`;

export default {
  shadowSize,
  baseTextShadow,
  shadowCircleBrighter,
  shadowCircleBright,
  shadowCircleBase,
  shadowCircleDark,
  shadowHorizonBrighter,
  shadowHorizonBright,
  shadowHorizonBase,
  shadowHorizonDark,
  shadowDetailMenu,
};
