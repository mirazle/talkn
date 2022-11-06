import blocks from './blocks';

// Section
export const sectionPadding = blocks.doubleSize;
export const sectionMarginColumn = blocks.quadMargin;

// Mnu.
export const menuPcWidth = 375;
export const menuTabWidth = 430;

// App.
export const baseHeight = 60;
export const appHeaderHeight = baseHeight;
export const appMenuMinWidth = 359;
export const appMinWidth = 375;
export const appWidth = 1200;
export const advertWidth = 200;
export const spLayoutStrictWidth = 680;
export const spLayoutStrictWidthPx = `${spLayoutStrictWidth}px`;
export const spLayoutWidth = 980;
export const doubleAdvertWidth = appWidth + advertWidth * 1.5;
export const eyeCatchVwValue = 100;
export const eyeCatchVhValue = 20;
export const eyeCatchMinHeightPxValue = 280;

// Article Order.
export const articleOrderHeight = 290;

// Article (list).
export const articleWidth = 300;
export const articleTotalWidth = articleWidth + blocks.baseSize * 2;
export const articleCloseHeight = 260;
export const articleOpenHeight = 'auto';
export const articleOpenScale = 1.05;
export const articleShadowColor = '#444';

// Domain Profile.
export const imageWidth = 200;

export default {
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
};
