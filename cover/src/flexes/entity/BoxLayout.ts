import { css } from 'styled-components';

import styles from 'cover/styles';

export const none = 'none';
export const topline = 'topline';
export const underline = 'underline';
export const rightline = 'rightline';
export const leftline = 'leftline';
export const radiusCircle = 'circle';
export const radiusButton = 'button';
export const radiusInput = 'input';
export const sizeOff = 'off';
export const sizeSmall = 'small';
export const sizeMiddle = 'middle';
export const sizeLarge = 'large';
export const sizeHuge = 'huge';
export const sizeDefault = false;

export type SizeType = boolean | typeof sizeSmall | typeof sizeMiddle | typeof sizeLarge | typeof sizeHuge;

export type BoxLayoutPropsType = {
  width?: string;
  minWidth?: string | number;
  maxWidth?: string | number;
  height?: string;
  upperPadding?: SizeType;
  sidePadding?: SizeType;
  bottomPadding?: SizeType;
  upperMargin?: SizeType;
  sideMargin?: SizeType;
  bottomMargin?: SizeType;
  border?: boolean | typeof underline | typeof topline | typeof rightline | typeof leftline | typeof none;
  borderRadius?: boolean | typeof radiusCircle | typeof radiusButton | typeof radiusInput;
  hover?: boolean | string;
  resetOrigin?: boolean;
  overflow?: string;
};

export const boxLayoutPropsInit = {
  width: 'auto',
  minWidth: 0,
  maxWidth: 'none',
  height: 'auto',
  upperPadding: sizeDefault,
  sidePadding: sizeDefault,
  bottomPadding: sizeDefault,
  upperMargin: sizeDefault,
  sideMargin: sizeDefault,
  bottomMargin: sizeDefault,
  border: false,
  borderRadius: false,
  hover: false,
  resetOrigin: false,
  overflow: 'visible',
};

export const BoxLayoutCss = css<BoxLayoutPropsType>`
  overflow: ${(props) => props.overflow};
  width: ${(props) => getWidth(props)};
  min-width: ${(props) => getMinMaxSize(props.minWidth)};
  max-width: ${(props) => getMinMaxSize(props.maxWidth)};
  height: ${(props) => getHeight(props)};
  padding: ${(props) => getPadding(props)};
  margin: ${(props) => getMargin(props)};
  ${(props) => getBorder(props)};
  ${(props) => getRadius(props)};
  ${(props) => getBackground(props)};
  ${(props) => (props.resetOrigin ? 'transform: translate(0px, 0px)' : '')};
  transition: ${styles.transitionDuration}ms;
`;

export const getBackground = (props: BoxLayoutPropsType | any) => {
  if (props.hover === true) {
    return `:hover {
      background: ${styles.whiteHoverColor};
    }`;
  } else if (props.hover) {
    return `:hover {
      background: ${props.hover};
    }`;
  }
  return '';
};

export const getWidth = (props: BoxLayoutPropsType | any) => {
  let width = 'auto';

  if (props.width === 'auto') {
    return props.width;
  }

  if (props.display && props.display.indexOf('inline') === 0) {
    return 'auto';
  }

  if (props.sideMargin === sizeSmall) {
    return `calc( 100% - ${styles.baseMargin * 2}px )`;
  } else if (props.sideMargin === true || props.sideMargin === sizeMiddle) {
    return `calc( 100% - ${styles.doubleMargin * 2}px )`;
  } else if (props.sideMargin === sizeLarge) {
    return `calc( 100% - ${styles.tripleMargin * 2}px )`;
  } else if (props.sideMargin === sizeHuge) {
    return `calc( 100% - ${styles.quadMargin * 2}px )`;
  } else {
    return props.width;
  }

  return width;
};

export const getMinMaxSize = (value: string | number) => (typeof value === 'string' ? value : `${value}px`);
export const getHeight = (props: BoxLayoutPropsType | any) => (props.height ? props.height : 'auto');

export const getPadding = (props: BoxLayoutPropsType | any) => {
  let paddingTop = 0;
  let paddingRight = 0;
  let paddingBottom = 0;
  let paddingLeft = 0;

  // upper
  if (props.upperPadding === sizeSmall) {
    paddingTop = styles.basePadding;
  } else if (props.upperPadding === sizeMiddle || props.upperPadding === true) {
    paddingTop = styles.doublePadding;
  } else if (props.upperPadding === sizeLarge) {
    paddingTop = styles.triplePadding;
  } else if (props.upperPadding === sizeHuge) {
    paddingTop = styles.quadPadding;
  }

  // side
  if (props.sidePadding === sizeSmall) {
    paddingRight = styles.basePadding;
    paddingLeft = styles.basePadding;
  } else if (props.sidePadding === sizeMiddle || props.sidePadding === true) {
    paddingRight = styles.doublePadding;
    paddingLeft = styles.doublePadding;
  } else if (props.sidePadding === sizeLarge) {
    paddingRight = styles.triplePadding;
    paddingLeft = styles.triplePadding;
  } else if (props.sidePadding === sizeHuge) {
    paddingRight = styles.quadPadding;
    paddingLeft = styles.quadPadding;
  }

  // bottom
  if (props.bottomPadding === sizeSmall) {
    paddingBottom = styles.basePadding;
  } else if (props.bottomPadding === sizeMiddle || props.bottomPadding === true) {
    paddingBottom = styles.doublePadding;
  } else if (props.bottomPadding === sizeLarge) {
    paddingBottom = styles.triplePadding;
  } else if (props.bottomPadding === sizeHuge) {
    paddingBottom = styles.quadPadding;
  }

  return `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`;
};

export const getMargin = (props: BoxLayoutPropsType | any) => {
  let marginTop = 0;
  let marginRight = 0;
  let marginBottom = 0;
  let marginLeft = 0;

  // upper
  if (props.upperMargin === sizeSmall) {
    marginTop = styles.basePadding;
  } else if (props.upperMargin === sizeMiddle || props.upperMargin === true) {
    marginTop = styles.doublePadding;
  } else if (props.upperMargin === sizeLarge) {
    marginTop = styles.triplePadding;
  } else if (props.upperMargin === sizeHuge) {
    marginTop = styles.quadPadding;
  }

  // side
  if (props.sideMargin === sizeSmall) {
    marginRight = styles.basePadding;
    marginLeft = styles.basePadding;
  } else if (props.sideMargin === sizeMiddle || props.sideMargin === true) {
    marginRight = styles.doublePadding;
    marginLeft = styles.doublePadding;
  } else if (props.sideMargin === sizeLarge) {
    marginRight = styles.triplePadding;
    marginLeft = styles.triplePadding;
  } else if (props.sideMargin === sizeHuge) {
    marginRight = styles.quadPadding;
    marginLeft = styles.quadPadding;
  }

  // bottom
  if (props.bottomMargin === sizeSmall) {
    marginBottom = styles.basePadding;
  } else if (props.bottomMargin === sizeMiddle || props.bottomMargin === true) {
    marginBottom = styles.doublePadding;
  } else if (props.bottomMargin === sizeLarge) {
    marginBottom = styles.triplePadding;
  } else if (props.bottomMargin === sizeHuge) {
    marginBottom = styles.quadPadding;
  }

  return `${marginTop}px ${marginRight}px ${marginBottom}px ${marginLeft}px`;
};

export const getBorder = (props: BoxLayoutPropsType | any) => {
  if (props.border === underline) {
    return `border-bottom: 1px solid ${styles.borderColor}`;
  } else if (props.border === rightline) {
    return `border-right: 1px solid ${styles.borderColor}`;
  } else if (props.border === leftline) {
    return `border-left: 1px solid ${styles.borderColor}`;
  } else if (props.border === topline) {
    return `border-top: 1px solid ${styles.borderColor}`;
  } else if (props.border === true) {
    return `border: 1px solid ${styles.borderColor}`;
  } else if (props.border === false || props.border === none) {
    return '';
  }
  return '';
};

export const getRadius = (props: BoxLayoutPropsType | any) => {
  if (props.borderRadius === true) {
    return `border-radius: ${styles.borderRadius}px`;
  }
  if (props.borderRadius === radiusCircle) {
    return `border-radius: 50%`;
  }
  if (props.borderRadius === radiusButton) {
    return `border-radius: 6px`;
  }
  if (props.borderRadius === radiusInput) {
    return `border-radius: 3px`;
  }
  return '';
};
