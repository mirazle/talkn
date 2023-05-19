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

export type AlphaType = typeof brightAlpha | typeof baseAlpha | typeof darkAlpha | typeof lightAlpha | typeof deepDarkAlpha;

/*******************/
/*  function
/*******************/

export const getRgb = (color: ColorType) => `rgb(${color})`;
export const getRgba = (color: ColorType, alpha: AlphaType = baseAlpha) => `rgba(${color}, ${alpha})`;

/*******************/
/*  base colors
/*******************/

export const baseTension = 90;
export const darkDepth = 20;
export const darkerDepth = darkDepth * 2;

export const whiteRgb = '255, 255, 255';
export const brightestRgb = '250, 250, 250';
export const brightMoreRgb = '245, 245, 245';
export const brighterRgb = '240, 240, 240';
export const brightRgb = `${baseTension * 2}, ${baseTension * 2}, ${baseTension * 2}`;
export const baseRgb = `${baseTension}, ${baseTension}, ${baseTension}`;
export const darkRgb = `${baseTension - darkDepth}, ${baseTension - darkDepth}, ${baseTension - darkDepth}`;
export const darkerRgb = `${baseTension - darkerDepth}, ${baseTension - darkerDepth}, ${baseTension - darkerDepth}`;
export const blackRgb = '0, 0, 0';

/*******************/
/*  rank colors
/*******************/

export const rank1Rgb = '255, 10, 78';
export const rank2Rgb = '255, 127, 0';
export const rank3Rgb = '0, 142, 255';
export const otherRankRgb = '160, 160, 160';

export const hoverInputRgb = '240, 240, 240';

// alphas.
export const brightAlpha = '0.96';
export const baseAlpha = '0.9';
export const lightAlpha = '0.75';
export const darkAlpha = '0.6';
export const deepDarkAlpha = '0.3';

/*******************/
/*  theme colors
/*******************/

export const themeRgb = `59, 174, 159`;
export const themeDarkRgb = `49, 164, 149`;
export const hotRgb = `255, ${baseTension}, 0`;
export const flatRgb = `${baseTension}, ${baseTension}, ${baseTension}`;
export const coldRgb = `0, 150, 255`;

/*******************/
/*  common colors
/*******************/

// linear-gradient(55deg, rgba(55, 200, 255, 0.9), rgba(55, 255, 200,0.9))
//'linear-gradient(55deg, rgba(35, 180, 235, 0.9), rgba(35, 235, 180,0.9))';
export const themeColor = getRgba(themeRgb);
export const themeDarkColor = getRgba(themeDarkRgb);
export const hotColor = getRgba(hotRgb);
export const flatColor = getRgba(flatRgb);
export const coldColor = getRgba(coldRgb);
export const whiteColor = getRgba(whiteRgb);
export const brightestColor = getRgba(brightestRgb);
export const brightMoreColor = getRgba(brightMoreRgb);
export const brighterColor = getRgba(brighterRgb);
export const brightColor = getRgba(brightRgb);
export const hoverInputColor = getRgba(hoverInputRgb);
export const baseColor = getRgba(baseRgb);
export const darkColor = getRgba(darkRgb);
export const darkerColor = getRgba(darkerRgb);
export const blackColor = getRgba(blackRgb);

/*******************/
/*  font colors
/*******************/

export const fontLightColor = getRgb(brighterRgb);
export const fontColor = getRgb(baseRgb);
export const fontDarkColor = getRgb(darkerRgb);

/*******************/
/*  content colors
/*******************/

export const markupColor = getRgb(brighterRgb);
export const borderColor = getRgb(hoverInputRgb);
export const componentBgColor = getRgba(whiteRgb);
export const whiteHoverColor = getRgba(brightRgb, darkAlpha);
export const tagBgColor = getRgba(darkRgb);
export const advertColor = getRgba(brightRgb);
export const advertHoverColor = getRgba(darkRgb);
export const articleBgColor = getRgba(brightRgb);
export const articleBgHoverColor = getRgba(darkRgb);
export const saveColor = getRgba(hotRgb);
export const saveCheckColor = getRgba(themeRgb);
export const fullBackgroundColor = getRgba(blackRgb, deepDarkAlpha);
export const notifTipColor = getRgba(blackRgb, deepDarkAlpha);

export const rank1Color = getRgba(rank1Rgb);
export const rank2Color = getRgba(rank2Rgb);
export const rank3Color = getRgba(rank3Rgb);
export const otherRankColor = getRgba(otherRankRgb);

export const baseShadowColor = '#aaa';

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
  lightAlpha,
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
  hoverInputColor,
  whiteHoverColor,
  advertColor,
  advertHoverColor,
  articleBgColor,
  articleBgHoverColor,
  tagBgColor,
  saveColor,
  saveCheckColor,
  fullBackgroundColor,
  baseShadowColor,
  rank1Color,
  rank2Color,
  rank3Color,
  otherRankColor,
  themeDarkRgb,
  themeDarkColor,
  getRgb,
  getRgba,
};
