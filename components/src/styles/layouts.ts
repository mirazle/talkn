import blocks from './blocks';

// Break.
export const appMinWidth = 320;
export const breakSpWidth = appMinWidth * 2;
export const breakTabWidth = appMinWidth * 3;
export const breakSmallPcWidth = appMinWidth * 4;

// Menu.
export const menu = 680;

export const baseSize = 8;
export const doubleSize = baseSize * 2;
export const tripleSize = baseSize * 3;
export const quadSize = baseSize * 4;
export const quintSize = baseSize * 5;
export const sexSize = baseSize * 6;
export const sepSize = baseSize * 7;
export const baseMargin = baseSize;
export const doubleMargin = baseMargin * 2;
export const tripleMargin = baseMargin * 3;
export const quadMargin = baseMargin * 4;
export const quintMargin = baseMargin * 5;
export const sexMargin = baseMargin * 6;
export const sepMargin = baseMargin * 7;
export const basePadding = baseSize;
export const doublePadding = basePadding * 2;
export const triplePadding = basePadding * 3;
export const quadPadding = basePadding * 4;
export const quintPadding = baseMargin * 5;
export const sexPadding = baseMargin * 6;
export const sepPadding = baseMargin * 7;
export const baseShadow = baseSize;
export const borderRadius = doubleSize;
// Section
export const sectionPadding = blocks.doubleSize;
export const sectionMarginColumn = blocks.quadMargin;

// App.
export const baseHeight = 60;
export const appHeaderHeight = baseHeight;
export const appMenuMinWidth = 359;

export const appWidth = 1200;
export const advertWidth = 200;
export const spLayoutStrictWidth = 680;
export const spLayoutStrictWidthPx = `${spLayoutStrictWidth}px`;
export const spLayoutWidth = 980;
export const doubleAdvertWidth = appWidth + advertWidth * 1.5;
export const eyeCatchVwValue = 100;
export const eyeCatchVhValue = 20;
export const eyeCatchMinHeightPxValue = 280;

// Cover Mnu.
export const menuPcWidth = appMinWidth;
export const menuTabWidth = 430;

// Article Order.
export const articleOrderHeight = 290;

// Article (list).
export const articleWidth = 300;
export const articleTotalWidth = articleWidth + blocks.baseSize * 2;
export const articleCloseHeight = 260;
export const articleOpenHeight = 'auto';
export const articleOpenScale = 1.05;
export const articleShadowColor = '#444';
export const articleHeaderHeight = 50;
export const articleHeaderSideSize = 40;

// Domain Profile.
export const imageWidth = 200;

export const blockHeight = 64;
export const pictogramHeight = 180;

export default {
  breakSpWidth,
  breakTabWidth,
  breakSmallPcWidth,
  sectionPadding,
  sectionMarginColumn,
  menuPcWidth,
  menuTabWidth,
  baseHeight,
  appHeaderHeight,
  appMenuMinWidth,
  appMinWidth,
  appWidth,
  advertWidth,
  spLayoutStrictWidth,
  spLayoutStrictWidthPx,
  spLayoutWidth,
  doubleAdvertWidth,
  eyeCatchVwValue,
  eyeCatchVhValue,
  eyeCatchMinHeightPxValue,
  articleOrderHeight,
  articleWidth,
  articleTotalWidth,
  articleCloseHeight,
  articleOpenHeight,
  articleOpenScale,
  articleShadowColor,
  imageWidth,
  blockHeight,
  pictogramHeight,
};
