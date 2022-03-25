import { css } from 'styled-components';

import styles from 'cover/styles';

export type ContentProps = {
  color?: string;
  fontSize?: string;
  fontWeight?: string;
  lineHeight?: string;
  useSelect?: boolean;
  pointer?: boolean;
};

export const contentPropsInit: ContentProps = {
  color: styles.fontColor,
  fontSize: styles.fontSize,
  fontWeight: styles.fontWeight,
  lineHeight: styles.lineHeight,
  useSelect: false,
  pointer: false,
};

export const ContentCss = css<ContentProps>`
  color: ${(props) => props.color};
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
  line-height: ${(props) => props.lineHeight};
  use-select: ${(props) => (props.useSelect ? 'auto' : 'none')};
  cursor: ${(props) => (props.pointer ? 'pointer' : 'default')};
`;
