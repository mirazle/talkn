import { css } from 'styled-components';

import styles from 'components/styles';
import { getRgbaColor } from 'components/styles/colors';

styles.getRgbaColor;
type InputCssType = {
  disabled?: boolean;
};

export const InputCss = css<InputCssType>`
  display: block;
  min-width: fit-content;
  max-width: calc(100% - ${styles.quadMargin}px);
  padding: ${styles.doublePadding}px;
  margin-left: ${styles.quadMargin}px;
  margin-right: ${styles.quadMargin}px;
  outline-color: ${getRgbaColor(styles.themeRgb)};
  color: ${styles.fontColor};
  border-radius: ${styles.baseSize}px;
  border: 1px solid ${styles.borderColor};
  background: rgb(250, 250, 250, 0.4);
  cursor: ${(props) => (props.disabled === true && props.disabled !== undefined ? 'normal' : 'pointer')};
  transition: ${styles.transitionDuration}ms;
  appearance: none;
  -webkit-appearance: none;
  margin: ${styles.baseMargin}px 0;
  font-weight: 200;
  :focus {
    ${(props) => (props.disabled === true && props.disabled !== undefined ? '' : 'background: rgba(129, 224, 209, 0.1)')};
  }
  :hover {
    ${(props) => (props.disabled === true && props.disabled !== undefined ? '' : 'background: rgba(129, 224, 209, 0.1)')};
  }
`;
