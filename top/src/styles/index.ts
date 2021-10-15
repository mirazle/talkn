// Common.
export const baseSize = 15;
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
export const basePadding = baseSize;
export const doublePadding = basePadding * 2;
export const triplePadding = basePadding * 3;
export const quadPadding = basePadding * 4;
export const baseShadow = baseSize;
export const baseShadowColor = '#aaa';
export const baseTextShadow = '1px 1px rgba(80, 80, 80, 1)';
export const transitionDuration = '300ms';
export const fontColor = '#666';

// App.
export const appHeaderHeight = 60;
export const appWidth = 1280;
export const spLayoutStrictWidth = 680;
export const spLayoutWidth = 980;

// Article Order.
export const articleOrderHeight = 290;

// Article (list).
export const articleWidth = 300;
export const articleTotalWidth = articleWidth + baseSize * 2;
export const articleCloseHeight = 260;
export const articleOpenHeight = 'auto';
export const articleOpenScale = 1.05;
export const articleShadowColor = '#444';

export const getTrimUnitNumber = (value: string) => {
  return Number(value.replace('px', ''));
};
