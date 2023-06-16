import colors, { getRgb } from './colors';

export const shadowSize = 10;
const shadowTextType = '1px 1px';
const shadowCircle = `0 0 ${shadowSize}px 0`;
const shadowHorizon = `0 ${shadowSize / 2}px ${shadowSize}px 0`;

export const baseTextShadow = `${shadowTextType} ${getRgb(colors.darkRgb)}`;
export const shadowCircleBrighter = `${shadowCircle} ${getRgb(colors.brighterRgb)}`;
export const shadowCircleBright = `${shadowCircle} ${getRgb(colors.brightRgb)}`;
export const shadowCircleBase = `${shadowCircle} ${getRgb(colors.baseRgb)}`;
export const shadowCircleDark = `${shadowCircle} ${getRgb(colors.darkRgb)}`;
export const shadowHorizonBrighter = `${shadowHorizon} ${getRgb(colors.brighterRgb)}`;
export const shadowHorizonBright = `${shadowHorizon} ${getRgb(colors.brightRgb)}`;
export const shadowHorizonBase = `${shadowHorizon} ${getRgb(colors.baseRgb)}`;
export const shadowHorizonDark = `${shadowHorizon} ${getRgb(colors.darkRgb)}`;
export const shadowDetailMenu = `0px -10px 50px 0px rgb(200, 200, 200) inset`;

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
