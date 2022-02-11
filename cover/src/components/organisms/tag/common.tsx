import styled, { css } from 'styled-components';

import * as styles from 'cover/styles';

export type TagValueType = {
  id: string;
  label: string;
};

export const InputCss = css`
  display: block;
  min-width: 320px;
  max-width: calc(100% - ${styles.doubleMargin * 2}px);
  padding: ${styles.basePadding}px;
  margin-left: ${styles.doubleMargin}px;
  margin-right: ${styles.doubleMargin}px;
  outline-color: ${styles.themeColor};
  color: ${styles.fontColor};
  border-radius: 3px;
  border: 2px solid ${styles.borderColor};
  background: rgb(250, 250, 250);
  cursor: pointer;
  transition: ${styles.transitionDuration}ms;
  :focus {
    background: rgb(240, 250, 240);
  }
  :hover {
    background: rgb(240, 250, 240);
  }
`;

type ButtonPropsType = {
  disabled?: boolean;
};

export const ButtonCss = css<ButtonPropsType>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: ${styles.baseHeight}px;
  margin: 0 auto;
  border-radius: 7px;
  border: 0;
  color: #fff;
  outline: none;
  cursor: ${(props) => (props.disabled ? 'normal' : 'pointer')};
  background: ${(props) => (props.disabled ? 'rgb(200, 200, 200)' : styles.themeColor)};
  transition: ${styles.transitionDuration}ms;
  user-select: none;
  :hover {
    box-shadow: ${(props) => (props.disabled ? '' : '0 5px 10px 0 rgb(0, 0, 0, 0.2)')};
  }
`;

export const Button = styled.button<ButtonPropsType>`
  ${ButtonCss}
`;

export const ButtonDiv = styled.div<ButtonPropsType>`
  ${ButtonCss}
`;
