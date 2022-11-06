import { css } from 'styled-components';

export type ContentProps = {
  color?: string;
  fontSize?: string;
  fontWeight?: string;
  lineHeight?: string;
  letterSpacing?: string;
  useSelect?: boolean;
  pointer?: boolean;
};

export const contentPropsInit: ContentProps = {
  color: 'inherit',
  fontSize: 'inherit',
  fontWeight: 'inherit',
  lineHeight: 'inherit',
  letterSpacing: '2px',
  useSelect: false,
  pointer: false,
};

export const ContentCss = css<ContentProps>`
  color: ${(props) => props.color};
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
  line-height: ${(props) => props.lineHeight};
  use-select: ${(props) => (props.useSelect ? 'auto' : 'none')};
  cursor: ${(props) => (props.pointer ? 'pointer' : 'inherit')};
  letter-spacing: ${(props) => props.letterSpacing};
`;
