import { transitionDuration } from './animations';
import colors, { getRgbaColor } from './colors';

export const alphaBgSet = `
    background: ${getRgbaColor(colors.whiteRgb)};
    backdrop-filter: blur(5px);
`;

export const alphaLightBgSet = `
    background: ${getRgbaColor(colors.whiteRgb)};
    backdrop-filter: blur(2.5px);
`;

export const beforeBlur = `
    background-color: rgba(0, 0, 0, 0.3);
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    content: ' ';
    backdrop-filter: ${(props) => getBackdropFilter(props)};
    transition: ${transitionDuration}ms;
`;

export const getBackdropFilter = (props: { isHover: boolean }): string => {
  if (props.isHover) {
    return `blur(2px) brightness(0.7)`;
  } else {
    return `blur(0) brightness(1)`;
  }
};

export default {
  alphaBgSet,
  alphaLightBgSet,
  beforeBlur,
  getBackdropFilter,
};
