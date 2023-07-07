import { css } from '@emotion/react';
import React from 'react';

import bubble from 'components/container/Cover/bubble.svg';

type Props = {
  root: HTMLElement;
  body?: React.ReactNode;
};

const Component: React.FC<Props> = ({ root, body }) => {
  return (
    <div css={styles.container}>
      <header className="header">
        <h1>talkn for web</h1>
      </header>
      <main>{body && body}</main>
      <footer>
        <p>Powerd by talkn.io</p>
      </footer>
    </div>
  );
};

export default Component;

const styles = {
  container: css`
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    background: rgb(59, 174, 159) url('./bubble.svg') repeat;
    transform: translate(0px, 0px);

    header {
      position: fixed;
      top: 0;
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      justify-content: center;
      height: 60%;
      color: #fff;
      h1 {
        user-select: none;
      }
    }

    main {
      position: fixed;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      color: #fff;
    }

    footer {
      position: fixed;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 30%;
      letter-spacing: 2px;
      color: #fff;
    }

    svg {
      overflow: visible;
      position: fixed;
      top: 0;
      height: 100%;

      .parallax > use {
        animation: move-forever 10s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
        &::nth-of-type(1) {
          animation-delay: 0s;
          animation-duration: 0s;
        }
        &::nth-of-type(2) {
          animation-delay: 2s;
          animation-duration: 0s;
        }
        &::nth-of-type(3) {
          animation-delay: 4s;
          animation-duration: 0s;
        }
        &::nth-of-type(4) {
          animation-delay: 6s;
          animation-duration: 0s;
        }
      }
    }

    @keyframes move-forever {
      0% {
        transform: translate3d(-90px, 0px, 0) scale(1);
      }
      100% {
        transform: translate3d(85px, 0px, 0) scale(1);
      }
    }

    @keyframes scale-forever {
      0% {
        transform: scale(1);
      }

      50% {
        transform: scale(1.5);
      }

      100% {
        transform: scale(1);
      }
    }
  `,
};

/*
          <svg
            className="waves"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 24 150 28"
            preserveAspectRatio="none"
            shapeRendering="auto">
            <defs>
              <path id="gentle-wave1" d="M-160 44 c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
              <path id="gentle-wave2" d="M-160 44 c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
              <path id="gentle-wave3" d="M-160 44 c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
              <path id="gentle-wave4" d="M-160 44 c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
            </defs>
            <g className="parallax">
              <use xlinkHref="#gentle-wave1" x="48" y="-2" fill="rgba(255,255,255,0.2)" />
              <use xlinkHref="#gentle-wave2" x="53" y="1" fill="rgba(79, 174, 159, 0.2)" />
              <use xlinkHref="#gentle-wave3" x="58" y="3" fill="rgba(255,255,255,0.2)" />
              <use xlinkHref="#gentle-wave4" x="63" y="5" fill="#fff" />
            </g>
          </svg>
*/
