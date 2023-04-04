import { css } from '@emotion/react';
import React from 'react';

import bubble from 'components/container/Cover/bubble.svg';

type Props = {
  root: HTMLElement;
  body?: React.ReactNode;
};

const WaveAnimation = () => {
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: 'rgba(255,255,255,0.2)' }} />
          <stop offset="100%" style={{ stopColor: 'rgba(255,255,255,0)' }} />
        </linearGradient>
      </defs>
      <path
        className="wave1"
        d="M0,100 C25,50 50,0 75,50 C100,100 125,50 150,100 L100,100 L50,100 L0,100 Z"
        fill="none"
        stroke="url(#grad)"
        strokeWidth="1"
      />
      <path
        className="wave2"
        d="M0,100 C25,75 50,50 75,75 C100,100 125,75 150,100 L100,100 L50,100 L0,100 Z"
        fill="none"
        stroke="url(#grad)"
        strokeWidth="1"
      />
      <path
        className="wave3"
        d="M0,100 C25,100 50,75 75,100 C100,125 125,100 150,100 L100,100 L50,100 L0,100 Z"
        fill="none"
        stroke="url(#grad)"
        strokeWidth="1"
      />
      <path
        className="wave4"
        d="M0,100 C25,50 50,100 75,50 C100,0 125,50 150,100 L100,100 L50,100 L0,100 Z"
        fill="none"
        stroke="url(#grad)"
        strokeWidth="1"
      />
    </svg>
  );
};

const Component: React.FC<Props> = ({ root, body }) => {
  return (
    <div css={styles.container}>
      <header className="header">
        <h1>talkn.io</h1>
      </header>
      {/*<main>{body && body}</main>*/}

      <div id="wave-container">
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
      </div>
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

    #wave-container {
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    .wave {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-repeat: repeat no-repeat;
      background-position: 0 bottom;
      transform-origin: center bottom;
      animation: wave 20s linear infinite;
    }
    .wave:nth-child(2) {
      animation-duration: 6s;
    }
    .wave:nth-child(3) {
      animation-duration: 8s;
    }
    .wave:nth-child(4) {
      animation-duration: 10s;
    }
    @keyframes wave {
      0% {
        transform: rotate(0deg) scale(0.1);
      }
      50% {
        transform: rotate(180deg) scale(1);
      }
      100% {
        transform: rotate(360deg) scale(0.1);
      }
    }
    .wave:before {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      height: 100%;
      width: 50%;
      background-color: rgba(255, 255, 255, 0.3);
      transform-origin: bottom left;
      transform: skew(-30deg) translateX(-50%);
    }
    .wave:after {
      content: '';
      position: absolute;
      right: 0;
      bottom: 0;
      height: 100%;
      width: 50%;
      background-color: rgba(255, 255, 255, 0.3);
      transform-origin: bottom right;
      transform: skew(30deg) translateX(50%);
    }
    /*
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
    */
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
