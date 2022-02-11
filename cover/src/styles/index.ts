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
export const baseShadowColor = '#aaa';
export const markupColor = '#ddd';
export const baseTextShadow = '1px 1px rgba(80, 80, 80, 1)';
export const baseBoxShadow = '0px 0px 5px 0px rgba(200, 200, 200, 1)';
export const horizonBoxShadow = '0 5px 10px 0 rgb(0, 0, 0, 0.2)';
export const transitionDuration = 300;
export const fontColor = '#666';
export const borderColor = '#dcdcdc';
export const borderRadius = baseSize;
export const componentBgColor = 'rgba(255, 255, 255, 0.96)';
export const tagBgColor = 'rgba(100, 100, 100, 0.9)';
export const themeBaseColor = `79, 174, 159`;
export const themeColor = `rgba(${themeBaseColor}, 0.96)`;

// Section
export const sectionPadding = doubleSize;
export const sectionMarginColumn = quadMargin;

// Mnu.
export const menuPcWidth = 520;
export const menuTabWidth = 430;

// App.
export const baseHeight = 60;
export const appHeaderHeight = baseHeight;
export const appWidth = 1200;
export const advertWidth = 200;
export const spLayoutStrictWidth = 680;
export const spLayoutWidth = 980;
export const doubleAdvertWidth = appWidth + advertWidth * 1.5;

// Article Order.
export const articleOrderHeight = 290;

// Article (list).
export const articleWidth = 300;
export const articleTotalWidth = articleWidth + baseSize * 2;
export const articleCloseHeight = 260;
export const articleOpenHeight = 'auto';
export const articleOpenScale = 1.05;
export const articleShadowColor = '#444';

// Domain Profile.
export const imageWidth = 200;

export const zIndex = {
  sideMenu: 980,
  header: 102,
  toTop: 101,
  contentsMenu: 100,
};

export const getTrimUnitNumber = (value: string) => {
  return Number(value.replace('px', ''));
};
