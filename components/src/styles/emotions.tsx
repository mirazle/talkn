import { css } from '@emotion/react';

import animations from 'components/styles/animations';
import colors from 'components/styles/colors';
import { basePadding, doublePadding, sexPadding } from 'components/styles/layouts';

const marqueeClassName = 'marquee';
const innerMarqueeClassName = 'innerMarquee';

export const useMarqueeContainer = (containerRef, title, setDurationMs) => {
  if (title && containerRef.current) {
    const containerElm = containerRef.current as HTMLElement;
    const hoverElm = containerElm.querySelector(`.${marqueeClassName}`) as HTMLElement;

    const div = document.createElement('div');
    div.className = innerMarqueeClassName;
    div.innerText = title;
    hoverElm.innerHTML = '';
    hoverElm.append(div);

    if (hoverElm && containerElm.scrollWidth < hoverElm.scrollWidth) {
      const durationRate = hoverElm.scrollWidth - containerElm.scrollWidth / 100;
      setDurationMs(durationRate * 5);
    } else {
      setDurationMs(0);
    }
  }
};

export const marqueeContainer = (duration: number = 0) => css`
  .${marqueeClassName} {
    overflow: hidden;
    width: 100%;
  }
  :hover {
    .${innerMarqueeClassName} {
      overflow: visible;
      width: 100%;
      white-space: nowrap;
      transform: translate(0, 0);
      @keyframes animation-marquee {
        0% {
          transform: translate(0%);
        }
        100% {
          transform: translate(-100%);
        }
      }
      @-webkit-keyframes animation-marquee {
        0% {
          transform: translate(0%);
        }
        100% {
          transform: translate(-100%);
        }
      }
      animation-name: animation-marquee;
      animation-duration: ${duration}ms;
      animation-timing-function: linear;
      animation-delay: 0ms;
      animation-iteration-count: infinite;
      animation-direction: normal;
    }
  }
`;

export const inputEffect = (type: string) => css`
  width: 100%;
  height: 38px;
  padding: ${basePadding}px 0 ${basePadding}px ${type === 'Footer' ? sexPadding : basePadding}px;
  margin: 0 0 0 ${doublePadding}px;
  outline: none;
  border: 1px solid rgba(230, 230, 230, 0.96);
  border-radius: 5px;
  color: ${colors.fontColor};
  letter-spacing: 2px;
  background: rgba(255, 255, 255, 0.4);
  transition: ${animations.transitionDuration}ms;
  &::placeholder {
    color: ${colors.brightColor};
  }
  :hover {
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid rgba(230, 230, 230, 0.96);
  }
  :focus {
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(210, 210, 210, 1);
  }
`;

export default {
  useMarqueeContainer,
  marqueeContainer,
};
