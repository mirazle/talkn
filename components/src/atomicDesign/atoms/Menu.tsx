import { css } from '@emotion/react';
import React, { useState } from 'react';
import type { FunctionComponent } from 'react';

import colors from 'components/flexes/styles/colors';
import { animations, layouts } from 'components/styles';

type Props = {
  onClick: () => void;
};

const MenuIcon: FunctionComponent<Props> = (props: Props) => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  return (
    <div css={styles.container} onClick={props.onClick} onMouseDown={() => setIsMouseDown(true)} onMouseUp={() => setIsMouseDown(false)}>
      <button css={styles.button(isMouseDown)} />
    </div>
  );
};

export default MenuIcon;

const color = 'rgb(230, 230, 230)';
const size = layouts.blockHeight;
const styles = {
  container: css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${size}px;
    min-width: ${size}px;
    height: ${size}px;
    min-height: ${size}px;
  `,
  button: (isMouseDown: boolean) => css`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 80%;
    max-width: 80%;
    height: 80%;
    min-height: 80%;
    cursor: pointer;
    border-radius: 50%;
    background: none;
    border: none;
    box-shadow: 0 0 0 rgba(230, 230, 230, 1) inset;
    transition: ${animations.transitionDuration}ms;
    transform: scale(${isMouseDown ? 0.9 : 1});
    &:hover {
      box-shadow: 0 0 10px rgba(230, 230, 230, 1) inset;
    }
    &::before {
      position: relative;
      top: -12px;
      width: 8px;
      height: 8px;
      content: '';
      background: ${color};
      border-radius: 6px;
      box-shadow: 0 12px 0 ${color}, 0 24px 0 ${color};
    }
  `,
};
