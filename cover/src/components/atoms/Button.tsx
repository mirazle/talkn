import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { InteractiveProps, flexLayoutCenterPropsInit, boxLayoutPropsInit, BoxLayoutCss } from 'components/flexes';
import styles from 'components/styles';

export const buttonThemeHot = styles.hotColor;
export const buttonThemeFlat = styles.flatColor;
export const buttonThemeCold = styles.coldColor;
export const buttonThemeBright = styles.brightColor;
export const buttonThemeBase = styles.baseColor;
export const buttonThemeDefault = styles.themeColor;
export type ButtonThemeType =
  | typeof buttonThemeDefault
  | typeof buttonThemeHot
  | typeof buttonThemeFlat
  | typeof buttonThemeCold
  | typeof buttonThemeBase
  | typeof buttonThemeBright;

type ButtonPropsType = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  theme?: ButtonThemeType;
  className?: string;
  animation?: boolean;
};

export type Props = InteractiveProps & ButtonPropsType;

const Component: React.FC<Props> = (props: Props) => {
  const [didMount, setDidMount] = useState(false);
  const p: Props = {
    ...flexLayoutCenterPropsInit,
    ...boxLayoutPropsInit,
    theme: buttonThemeDefault,
    animation: true,
    className: 'Button',
    width: 'auto',
    ...props,
  };

  useEffect(() => {
    setDidMount(true);
  }, []);

  return (
    <Button {...p} didMount={didMount}>
      {p.children}
    </Button>
  );
};

export default Component;

type ButtonStyledPropsType = {
  didMount: boolean;
} & Props;

export const Button = styled.button<ButtonStyledPropsType>`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  min-height: ${styles.baseHeight}px;
  ${BoxLayoutCss};
  min-width: auto;
  padding: ${styles.doublePadding}px ${styles.doublePadding * 2}px;
  color: ${(props) => getColor(props)};
  outline: none;
  cursor: ${(props) => (props.disabled || props.onClick === undefined ? 'normal' : 'pointer')};
  background: ${(props) => getBackground(props)};
  border: ${(props) => (props.disabled ? 1 : 0)}px solid ${styles.borderColor};
  border-radius: ${styles.baseSize}px;
  transition: ${(props) => (props.didMount && props.animation ? styles.transitionDuration : 0)}ms;
  white-space: nowrap;
  font-weight: 200;
  user-select: none;
  :hover {
    box-shadow: ${(props) => (props.disabled || props.onClick === undefined ? 0 : styles.shadowHorizonBright)};
  }
  @media (max-width: ${styles.spLayoutStrictWidth}px) {
    padding: ${styles.basePadding}px ${styles.doublePadding * 1.5}px;
  }
`;

const getColor = (props) => {
  if (props.disabled) {
    return styles.brightColor;
  } else {
    switch (props.theme) {
      case buttonThemeDefault:
      case buttonThemeHot:
      case buttonThemeCold:
      case buttonThemeBright:
        return styles.whiteColor;
    }
  }
};

const getBackground = (props) => {
  if (props.disabled) {
    return 'none';
  } else {
    return props.theme;
  }
};
