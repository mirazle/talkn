import { css } from 'styled-components';

import styles from 'cover/styles';

export const topline = 'topline';
export const underline = 'underline';
export const radiusCircle = 'circle';
export const radiusButton = 'button';
export const radiusInput = 'input';
export const sizeOff = 'off';
export const sizeSmall = 'small';
export const sizeMiddle = 'middle';
export const sizeLarge = 'large';
export const sizeDefault = false;

export type SizeType = boolean | typeof sizeSmall | typeof sizeMiddle | typeof sizeLarge;

export type LayoutPropsType = {
  width?: string;
  height?: string;
  upperPadding?: SizeType;
  sidePadding?: SizeType;
  bottomPadding?: SizeType;
  upperMargin?: SizeType;
  sideMargin?: SizeType;
  bottomMargin?: SizeType;
  border?: boolean | typeof underline | typeof topline;
  borderRadius?: boolean | typeof radiusCircle | typeof radiusButton | typeof radiusInput;
  hover?: boolean | string;
  resetOrigin?: boolean;
  inline?: boolean;
};

export const layoutPropsInit = {
  width: 'auto',
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
  inline: false,
};

export const LayoutCss = css<LayoutPropsType>`
  width: ${(props) => getWidth(props)};
  height: ${(props) => getHeight(props)};
  padding: ${(props) => getPadding(props)};
  margin: ${(props) => getMargin(props)};
  ${(props) => getBorder(props)};
  ${(props) => getRadius(props)};
  ${(props) => getBackground(props)};
  ${(props) => (props.resetOrigin ? 'transform: translate(0px, 0px)' : '')};
  transition: ${styles.transitionDuration}ms;
`;

export const getBackground = (props: LayoutPropsType | any) => {
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

export const getWidth = (props: LayoutPropsType | any) => {
  let width = 'auto';
  if (props.width === undefined) {
    if (props.inline) {
      return 'auto';
    } else {
      if (props.sideMargin === sizeSmall) {
        return `calc( 100% - ${styles.baseMargin * 2}px )`;
      } else if (props.sideMargin === true || props.sideMargin === sizeMiddle) {
        return `calc( 100% - ${styles.doubleMargin * 2}px )`;
      } else if (props.sideMargin === sizeLarge) {
        return `calc( 100% - ${styles.tripleMargin * 2}px )`;
      } else {
        return props.width;
      }
    }
  } else {
    width = props.width;
  }
  return width;
};

export const getHeight = (props: LayoutPropsType | any) => {
  if (props.height) {
    return props.height;
  } else {
    return 'auto';
  }
};

export const getPadding = (props: LayoutPropsType | any) => {
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
  }

  // bottom
  if (props.bottomPadding === sizeSmall) {
    paddingBottom = styles.basePadding;
  } else if (props.bottomPadding === sizeMiddle || props.bottomPadding === true) {
    paddingBottom = styles.doublePadding;
  } else if (props.bottomPadding === sizeLarge) {
    paddingBottom = styles.triplePadding;
  }

  return `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`;
};

export const getMargin = (props: LayoutPropsType | any) => {
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
  }

  // bottom
  if (props.bottomMargin === sizeSmall) {
    marginBottom = styles.basePadding;
  } else if (props.bottomMargin === sizeMiddle || props.bottomMargin === true) {
    marginBottom = styles.doublePadding;
  } else if (props.bottomMargin === sizeLarge) {
    marginBottom = styles.triplePadding;
  }

  return `${marginTop}px ${marginRight}px ${marginBottom}px ${marginLeft}px`;
};

export const getBorder = (props: LayoutPropsType | any) => {
  if (props.border === underline) {
    return `border-bottom: 1px solid ${styles.borderColor}`;
  } else if (props.border === topline) {
    return `border-top: 1px solid ${styles.borderColor}`;
  } else if (props.border === true) {
    return `border: 1px solid ${styles.borderColor}`;
  }
  return '';
};

export const getRadius = (props: LayoutPropsType | any) => {
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
