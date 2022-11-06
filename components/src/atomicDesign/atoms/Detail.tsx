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
      <button css={styles.button(isMouseDown)}>
        <div css={styles.wrap}>
          <span css={styles.one} />
          <span css={styles.two} />
          <span css={styles.three} />
          <span css={styles.four} />
          <span css={styles.five} />
        </div>
      </button>
    </div>
  );
};

export default MenuIcon;

const color = 'rgb(230, 230, 230)';
const size = 52;
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
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    border: 0;
    border-radius: 50%;
    background: transparent;
    transition: ${animations.transitionDuration}ms;
    transform: scale(${isMouseDown ? 0.9 : 1});
    &:hover {
      box-shadow: 0 0 10px rgb(230 230 230) inset;
    }
  `,
  wrap: css`
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-start;
    justify-content: space-between;
    width: 64%;
    height: 60%;
    padding: 12% 0% 15% 14%;
    background: rgb(230, 230, 230);
    border-radius: 3px 12px 3px 3px;
    transform: translate(0px, 0px);
  `,
  one: css`
    width: 40%;
    height: 2px;
    background: rgb(255, 255, 255);
    border-radius: 4px;
  `,
  two: css`
    width: 70%;
    height: 2px;
    background: rgb(255, 255, 255);
    border-radius: 4px;
  `,
  three: css`
    width: 70%;
    height: 2px;
    background: rgb(255, 255, 255);
    border-radius: 4px;
  `,
  four: css`
    width: 70%;
    height: 2px;
    background: rgb(255, 255, 255);
    border-radius: 4px;
  `,
  five: css`
    position: absolute;
    top: 0;
    right: 0;
    width: 10px;
    height: 10px;
    border-radius: 0px 12px 0px 0px;
    background: rgb(190, 190, 190);
  `,
};
