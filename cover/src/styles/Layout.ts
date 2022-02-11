import { css } from 'styled-components';

import * as styles from 'cover/styles';

const underline = 'underline';
export type LayoutPropsType = {
  width?: string;
  height?: string;
  upperPadding?: boolean;
  sidePadding?: boolean;
  bottomPadding?: boolean;
  upperMargin?: boolean;
  sideMargin?: boolean;
  bottomMargin?: boolean;
  border?: boolean | typeof underline;
  radius?: boolean;
};

export const layoutPropsInit = {
  width: 'auto',
  height: 'auto',
  upperPadding: false,
  sidePadding: false,
  bottomPadding: false,
  upperMargin: false,
  sideMargin: false,
  bottomMargin: false,
  border: false,
  radius: false,
  underline: false,
};

export const LayoutCss = css<LayoutPropsType>`
  width: ${(props) => getWidth(props)};
  height: ${(props) => getHeight(props)};
  padding: ${(props) => getPadding(props)};
  margin: ${(props) => getMargin(props)};
  ${(props) => getBorder(props)};
  border-radius: ${(props) => (props.radius ? `${styles.borderRadius}px` : 0)};
`;

export const getWidth = (props: LayoutPropsType | any) => {
  if (props.sideMargin) {
    return `calc( 100% - ${styles.doubleMargin}px )`;
  } else {
    return props.width;
  }
};

export const getHeight = (props: LayoutPropsType | any) => {
  if (props.upperMargin && props.bottomMargin) {
    return `calc( 100% - ${styles.doubleMargin}px )`;
  } else if (props.upperMargin || props.bottomMargin) {
    return `calc( 100% - ${styles.baseMargin}px )`;
  } else {
    return props.height;
  }
};

export const getPadding = (props: LayoutPropsType | any) => {
  if (props.upperPadding && !props.sidePadding && !props.bottomPadding) {
    return `${styles.basePadding}px 0 0 0`;
  } else if (!props.upperPadding && props.sidePadding && !props.bottomPadding) {
    return `0 ${styles.basePadding}px`;
  } else if (!props.upperPadding && !props.sidePadding && props.bottomPadding) {
    return `0 0 ${styles.basePadding}px 0`;
  } else if (props.upperPadding && !props.sidePadding && props.bottomPadding) {
    return `${styles.basePadding}px 0`;
  } else if (props.upperPadding && props.sidePadding && !props.bottomPadding) {
    return `${styles.basePadding}px ${styles.basePadding}px 0`;
  } else if (props.upperPadding && props.sidePadding && props.bottomPadding) {
    return `${styles.basePadding}px ${styles.basePadding}px`;
  } else if (!props.upperPadding && props.sidePadding && props.bottomPadding) {
    return `0 ${styles.basePadding}px ${styles.basePadding}px`;
  }
};

export const getMargin = (props: LayoutPropsType | any) => {
  if (props.upperMargin && !props.sideMargin && !props.bottomMargin) {
    return `${styles.baseMargin}px 0 0 0`;
  } else if (!props.upperMargin && props.sideMargin && !props.bottomMargin) {
    return `0 ${styles.baseMargin}px`;
  } else if (!props.upperMargin && !props.sideMargin && props.bottomMargin) {
    return `0 0 ${styles.baseMargin}px 0`;
  } else if (props.upperMargin && !props.sideMargin && props.bottomMargin) {
    return `${styles.baseMargin}px 0`;
  } else if (props.upperMargin && props.sideMargin && props.bottomMargin) {
    return `${styles.baseMargin}px ${styles.baseMargin}px`;
  } else if (props.upperMargin && props.sideMargin && !props.bottomMargin) {
    return `${styles.baseMargin}px ${styles.baseMargin}px 0`;
  }
};

export const getBorder = (props: LayoutPropsType | any) => {
  if (props.border === underline) {
    return `border-bottom: 1px solid ${styles.borderColor}`;
  } else if (props.border === true) {
    return `border: 1px solid ${styles.borderColor}`;
  }
  return '';
};
