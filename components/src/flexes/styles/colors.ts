/*******************/
/*  type
/*******************/

export type ThemeColorType = typeof themeRgb | typeof hotRgb | typeof flatRgb | typeof coldRgb;
export type BaseColorType =
  | typeof whiteRgb
  | typeof brighterRgb
  | typeof brightRgb
  | typeof baseRgb
  | typeof darkRgb
  | typeof darkerRgb
  | typeof blackRgb;
export type ColorType = ThemeColorType | BaseColorType;

export type AlphaType = typeof brightAlpha | typeof baseAlpha | typeof darkAlpha | typeof deepDarkAlpha;

/*******************/
/*  function
/*******************/

export const getRgbColor = (color: ColorType) => `rgb(${color})`;
export const getRgbaColor = (color: ColorType, alpha: AlphaType = baseAlpha) => `rgba(${color}, ${alpha})`;

/*******************/
/*  base colors
/*******************/

export const baseTension = 100;
export const darkDepth = 20;
export const darkerDepth = darkDepth * 2;

export const whiteRgb = '255, 255, 255';
export const brighterRgb = '240, 240, 240';
export const brightRgb = `${baseTension * 2}, ${baseTension * 2}, ${baseTension * 2}`;
export const baseRgb = `${baseTension}, ${baseTension}, ${baseTension}`;
export const darkRgb = `${baseTension - darkDepth}, ${baseTension - darkDepth}, ${baseTension - darkDepth}`;
export const darkerRgb = `${baseTension - darkerDepth}, ${baseTension - darkerDepth}, ${baseTension - darkerDepth}`;
export const blackRgb = '0, 0, 0';

// alphas.
export const brightAlpha = '0.96';
export const baseAlpha = '0.9';
export const darkAlpha = '0.6';
export const deepDarkAlpha = '0.3';

/*******************/
/*  theme colors
/*******************/

export const themeRgb = `79, 174, 159`;
export const hotRgb = `255, ${baseTension}, 0`;
export const flatRgb = `${baseTension}, ${baseTension}, ${baseTension}`;
export const coldRgb = `0, 150, 255`;

/*******************/
/*  common colors
/*******************/

// linear-gradient(55deg, rgba(55, 200, 255, 0.9), rgba(55, 255, 200,0.9))
//'linear-gradient(55deg, rgba(35, 180, 235, 0.9), rgba(35, 235, 180,0.9))';
export const themeColor = getRgbaColor(themeRgb);
export const hotColor = getRgbaColor(hotRgb);
export const flatColor = getRgbaColor(flatRgb);
export const coldColor = getRgbaColor(coldRgb);

export const whiteColor = getRgbaColor(whiteRgb);
export const brighterColor = getRgbaColor(brighterRgb);
export const brightColor = getRgbaColor(brightRgb);
export const baseColor = getRgbaColor(baseRgb);
export const darkColor = getRgbaColor(darkRgb);
export const darkerColor = getRgbaColor(darkerRgb);
export const blackColor = getRgbaColor(blackRgb);

/*******************/
/*  font colors
/*******************/

export const fontLightColor = getRgbColor(brighterRgb);
export const fontColor = getRgbColor(baseRgb);
export const fontDarkColor = getRgbColor(darkerRgb);

/*******************/
/*  content colors
/*******************/

export const markupColor = getRgbColor(brighterRgb);
export const borderColor = getRgbColor(brightRgb);
export const componentBgColor = getRgbaColor(whiteRgb);
export const whiteHoverColor = getRgbaColor(brightRgb, deepDarkAlpha);
export const tagBgColor = getRgbaColor(darkRgb);
export const advertColor = getRgbaColor(brightRgb);
export const advertHoverColor = getRgbaColor(darkRgb);
export const articleBgColor = getRgbaColor(brightRgb);
export const articleBgHoverColor = getRgbaColor(darkRgb);
export const saveColor = getRgbaColor(hotRgb);
export const saveCheckColor = getRgbaColor(themeRgb);
export const fullBackgroundColor = getRgbaColor(blackRgb, deepDarkAlpha);

export default {
  baseTension,
  darkDepth,
  darkerDepth,
  whiteRgb,
  brighterRgb,
  brightRgb,
  baseRgb,
  darkRgb,
  darkerRgb,
  blackRgb,
  brightAlpha,
  baseAlpha,
  darkAlpha,
  deepDarkAlpha,
  themeRgb,
  hotRgb,
  flatRgb,
  coldRgb,
  themeColor,
  hotColor,
  flatColor,
  coldColor,
  whiteColor,
  brighterColor,
  brightColor,
  baseColor,
  darkColor,
  darkerColor,
  blackColor,
  fontLightColor,
  fontColor,
  fontDarkColor,
  markupColor,
  borderColor,
  componentBgColor,
  whiteHoverColor,
  advertColor,
  advertHoverColor,
  articleBgColor,
  articleBgHoverColor,
  tagBgColor,
  saveColor,
  saveCheckColor,
  fullBackgroundColor,
  getRgbColor,
  getRgbaColor,
};
