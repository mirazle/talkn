import React from 'react';
import styled, { css } from 'styled-components';

import { flexLayutPropsInit } from 'cover/components/atoms/Flex';
import * as styles from 'cover/styles';
import * as Layout from 'cover/styles/Layout';

type ButtonPropsType = {
  children: React.ReactNode;
  disabled?: boolean;
  div?: boolean;
  theme?: string;
  onClick?: () => void;
};

type Props = ButtonPropsType & Layout.LayoutPropsType;

export const buttonBackgroundPositive = styles.themeColor;
export const buttonBackgroundCancel = '#ccc';
export const buttonBackgroundDefault = buttonBackgroundPositive;
export type ButtonBackgroundType = typeof buttonBackgroundDefault | typeof buttonBackgroundPositive | typeof buttonBackgroundCancel;

const Component: React.FC<Props> = (props: Props) => {
  const p: Props = {
    ...Layout.layoutPropsInit,
    ...flexLayutPropsInit,
    width: `auto`,
    height: `${styles.baseHeight}px`,
    theme: buttonBackgroundDefault,
    ...props,
  };
  return p.div ? <ButtonDiv {...p}>{p.children}</ButtonDiv> : <Button {...p}>{p.children}</Button>;
};

export default Component;

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
export const ButtonCss = css<Props>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: ${styles.baseHeight}px;
  margin: 0 auto;
  border-radius: 7px;
  border: 0;
  color: ${(props) => getColor(props)};
  outline: none;
  cursor: ${(props) => (props.disabled ? 'normal' : 'pointer')};
  background: ${(props) => getBackground(props)};
  transition: ${styles.transitionDuration}ms;
  user-select: none;
  :hover {
    box-shadow: ${(props) => (props.disabled ? '' : styles.horizonBoxShadow)};
  }
`;

export const Button = styled.button<Props>`
  ${ButtonCss};
  ${Layout.LayoutCss};
`;

export const ButtonDiv = styled.div<Props>`
  ${ButtonCss};
  ${Layout.LayoutCss};
`;

const getColor = (props) => {
  switch (props.theme) {
    case buttonBackgroundDefault:
    case buttonBackgroundPositive:
      return '#fff';
    case buttonBackgroundCancel:
      return '#fff';
  }
};

const getBackground = (props) => {
  switch (props.theme) {
    case buttonBackgroundDefault:
    case buttonBackgroundPositive:
      return props.disabled ? 'rgb(200, 200, 200)' : styles.themeColor;
    case buttonBackgroundCancel:
      return '#ccc';
  }
};
