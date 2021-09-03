import React from 'react';

import Schema from 'common/Schema';
import Emotions from 'common/emotions/index';

import TalknComponent from 'client/components/TalknComponent';
import Container from 'client/style/Container';
import { default as IconStyle } from 'client/style/Icon';

const emotionCoverTypes = new Emotions();
export default class Icon extends TalknComponent<{}, {}> {
  static get smallSize() {
    return IconStyle.smallSize;
  }
  static get middleSize() {
    return IconStyle.middleSize;
  }
  static get largeSize() {
    return IconStyle.largeSize;
  }
  static get bigSize() {
    return IconStyle.bigSize;
  }

  static generateImageIcon(name = 'Twitter', state: any = {}, overStyle, option: any = {}) {
    if (IconStyle[`get${name}`]) {
      const onClick = option.onClick ? option.onClick : () => {};
      const href = option.href ? option.href : '';
      const style = Icon.getOveredStyle(IconStyle[`get${name}`](state, option), overStyle);

      if (!Schema.isAnonymousFunc(onClick)) {
        return <div data-component-type={`Icon${name}`} onClick={onClick} style={style} />;
      }

      if (href !== '') {
        return <a href={href} data-component-type={`Icon${name}`} style={style} />;
      }

      return <div data-component-type={`Icon${name}`} style={style} />;
    }
    return undefined;
  }

  static getOveredStyle(baseStyle = {}, overStyle = {}) {
    Object.keys(overStyle).forEach((key) => {
      if (baseStyle[key]) {
        if (typeof baseStyle[key] === 'object') {
          baseStyle[key] = { ...baseStyle[key], ...overStyle[key] };
        } else {
          baseStyle[key] = overStyle[key];
        }
      }
    });
    return baseStyle;
  }

  constructor(props?) {
    super(props);
  }

  getDecolationProps1(styleKey, eleType, tagName) {
    return {
      onMouseOver: () => {
        this.clientAction('UPDATE_STYLE', {
          styleKey,
          eleType,
          tagName,
          style: {
            boxShadow: '0px 0px 20px rgba(240, 240, 240, 0.7 ) inset',
            transition: '200ms',
            transform: 'scale( 1 )',
            borderRadius: '100px',
            cursor: 'pointer',
          },
        });
      },
      onMouseLeave: () => {
        this.clientAction('UPDATE_STYLE', {
          styleKey,
          eleType,
          tagName,
          style: {
            boxShadow: '0px 0px 0px rgba(240, 240, 240, 0.7)',
            transition: '600ms',
            transform: 'scale( 1 )',
            borderRadius: '100px',
            cursor: 'default',
          },
        });
      },
      onMouseDown: () => {
        this.clientAction('UPDATE_STYLE', {
          styleKey,
          eleType,
          tagName,
          style: {
            boxShadow: '0px 0px 30px rgba(235, 235, 235, 0.7) inset ',
            transform: 'scale( 0.8 )',
            borderRadius: '100px',
            cursor: 'pointer',
          },
        });
      },
      onMouseUp: () => {
        this.clientAction('UPDATE_STYLE', {
          styleKey,
          eleType,
          tagName,
          style: {
            boxShadow: '0px 0px 20px rgba(240, 240, 240, 0.7) inset',
            transform: 'scale( 1 )',
            borderRadius: '100px',
            cursor: 'pointer',
          },
        });
      },
    };
  }

  getDecolationProps2(styleKey, eleType, tagName) {
    return {
      onMouseOver: () => {
        this.clientAction('UPDATE_STYLE', {
          styleKey,
          eleType,
          tagName,
          style: {
            boxShadow: '0px 0px 20px rgba(200, 200, 200, 0.7 ) inset',
            transition: '200ms',
            transform: 'scale( 1 )',
            borderRadius: '0px',
            cursor: 'pointer',
          },
        });
      },
      onMouseLeave: () => {
        this.clientAction('UPDATE_STYLE', {
          styleKey,
          eleType,
          tagName,
          style: {
            boxShadow: '0px 0px 0px rgba(220, 220, 220, 0.7)',
            transition: '600ms',
            transform: 'scale( 1 )',
            borderRadius: '0px',
            cursor: 'default',
          },
        });
      },
      onMouseDown: () => {
        this.clientAction('UPDATE_STYLE', {
          styleKey,
          eleType,
          tagName,
          style: {
            boxShadow: '0px 0px 30px rgba(200, 200, 200, 0.7) inset ',
            transform: 'scale( 0.8 )',
            borderRadius: '0px',
            cursor: 'pointer',
          },
        });
      },
      onMouseUp: () => {
        this.clientAction('UPDATE_STYLE', {
          styleKey,
          eleType,
          tagName,
          style: {
            boxShadow: '0px 0px 20px rgba(240, 240, 240, 0.7) inset',
            transform: 'scale( 1 )',
            borderRadius: '0px',
            cursor: 'pointer',
          },
        });
      },
    };
  }

  getDecolationProps3(styleKey, eleType, tagName) {
    return {
      onMouseOver: () => {
        this.clientAction('UPDATE_STYLE', {
          styleKey,
          eleType,
          tagName,
          style: {
            boxShadow: '0px 0px 20px rgba(240, 240, 240, 0.7 ) inset',
            transition: '200ms',
            transform: 'scale( 1 )',
            cursor: 'pointer',
          },
        });
      },
      onMouseLeave: () => {
        this.clientAction('UPDATE_STYLE', {
          styleKey,
          eleType,
          tagName,
          style: {
            boxShadow: '0px 0px 0px rgba(240, 240, 240, 0.7)',
            transition: '600ms',
            transform: 'scale( 1 )',
            cursor: 'default',
          },
        });
      },
      onMouseDown: () => {
        this.clientAction('UPDATE_STYLE', {
          styleKey,
          eleType,
          tagName,
          style: {
            boxShadow: '0px 0px 30px rgba(235, 235, 235, 0.7) inset ',
            transform: 'scale( 0.8 )',
            cursor: 'pointer',
          },
        });
      },
      onMouseUp: () => {
        this.clientAction('UPDATE_STYLE', {
          styleKey,
          eleType,
          tagName,
          style: {
            boxShadow: '0px 0px 20px rgba(240, 240, 240, 0.7) inset',
            transform: 'scale( 1 )',
            cursor: 'pointer',
          },
        });
      },
    };
  }

  static getSvgIcon(type: string, { app, ui }, option = { active: false }) {
    const style = IconStyle.getSvgIcon({ app, ui });
    return (
      <i data-component-type={`IconSvg:${type}`} style={style}>
        {Icon[`getSvg${type}`](option)}
        <div></div>
      </i>
    );
  }

  static getSvgSocial() {
    return (
      <svg width={24} height={24} fill="rgba(180, 180, 180, 0.9)" viewBox="-42 0 512 512.002">
        <path d="m210.351562 246.632812c33.882813 0 63.222657-12.152343 87.195313-36.128906 23.972656-23.972656 36.125-53.304687 36.125-87.191406 0-33.875-12.152344-63.210938-36.128906-87.191406-23.976563-23.96875-53.3125-36.121094-87.191407-36.121094-33.886718 0-63.21875 12.152344-87.191406 36.125s-36.128906 53.308594-36.128906 87.1875c0 33.886719 12.15625 63.222656 36.132812 87.195312 23.976563 23.96875 53.3125 36.125 87.1875 36.125zm0 0" />
        <path d="m426.128906 393.703125c-.691406-9.976563-2.089844-20.859375-4.148437-32.351563-2.078125-11.578124-4.753907-22.523437-7.957031-32.527343-3.308594-10.339844-7.808594-20.550781-13.371094-30.335938-5.773438-10.15625-12.554688-19-20.164063-26.277343-7.957031-7.613282-17.699219-13.734376-28.964843-18.199219-11.226563-4.441407-23.667969-6.691407-36.976563-6.691407-5.226563 0-10.28125 2.144532-20.042969 8.5-6.007812 3.917969-13.035156 8.449219-20.878906 13.460938-6.707031 4.273438-15.792969 8.277344-27.015625 11.902344-10.949219 3.542968-22.066406 5.339844-33.039063 5.339844-10.972656 0-22.085937-1.796876-33.046874-5.339844-11.210938-3.621094-20.296876-7.625-26.996094-11.898438-7.769532-4.964844-14.800782-9.496094-20.898438-13.46875-9.75-6.355468-14.808594-8.5-20.035156-8.5-13.3125 0-25.75 2.253906-36.972656 6.699219-11.257813 4.457031-21.003906 10.578125-28.96875 18.199219-7.605469 7.28125-14.390625 16.121094-20.15625 26.273437-5.558594 9.785157-10.058594 19.992188-13.371094 30.339844-3.199219 10.003906-5.875 20.945313-7.953125 32.523437-2.058594 11.476563-3.457031 22.363282-4.148437 32.363282-.679688 9.796875-1.023438 19.964844-1.023438 30.234375 0 26.726562 8.496094 48.363281 25.25 64.320312 16.546875 15.746094 38.441406 23.734375 65.066406 23.734375h246.53125c26.625 0 48.511719-7.984375 65.0625-23.734375 16.757813-15.945312 25.253906-37.585937 25.253906-64.324219-.003906-10.316406-.351562-20.492187-1.035156-30.242187zm0 0" />
      </svg>
    );
  }

  static getSvgRank() {
    return (
      <svg width={24} height={24} fill="rgba(79, 174, 159, 0.9)" viewBox="0 0 94.479 94.479">
        <path d="M92.479,6.821H26.823c-1.104,0-2,0.896-2,2V19.58c0,1.104,0.896,2,2,2h65.656c1.104,0,2-0.896,2-2V8.821C94.479,7.717,93.584,6.821,92.479,6.821z" />
        <path d="M92.479,40.457H26.823c-1.104,0-2,0.896-2,2v10.761c0,1.104,0.896,2,2,2h65.656c1.104,0,2-0.896,2-2V42.457C94.479,41.352,93.584,40.457,92.479,40.457z" />
        <path d="M92.479,75.109H26.823c-1.104,0-2,0.896-2,2v10.759c0,1.104,0.896,2,2,2h65.656c1.104,0,2-0.896,2-2V77.109C94.479,76.004,93.584,75.109,92.479,75.109z" />
        <path d="M1.842,11.104c0.423,0.051,0.848-0.08,1.167-0.36l0.914-0.799v12.973c0,0.828,0.672,1.5,1.5,1.5h1.546c0.828,0,1.5-0.672,1.5-1.5V5.567c0-0.828-0.672-1.5-1.5-1.5H5.378c-0.356,0-0.701,0.127-0.973,0.358L0.527,7.728c-0.589,0.501-0.7,1.369-0.256,2.003l0.522,0.745C1.04,10.825,1.42,11.053,1.842,11.104z" />
        <path d="M2.546,37.5c-0.647,0.23-1.056,0.872-0.99,1.556l0.096,0.999c0.048,0.497,0.339,0.938,0.778,1.176c0.438,0.238,0.967,0.243,1.409,0.011c1.18-0.615,1.923-0.775,2.922-0.534c0.71,0.163,1.188,0.586,1.438,1.225c0.378,1.143,0.395,2.957-2.854,6.873l-2.506,2.996c-0.589,0.688-0.99,1.119-1.302,1.404c-0.312,0.284-0.488,0.688-0.488,1.107v1.475c0,0.828,0.672,1.5,1.5,1.5h9.132c0.828,0,1.5-0.672,1.5-1.5V55.01c0-0.828-0.672-1.5-1.5-1.5H6.896c0.458-0.515,1.037-1.211,1.716-2.063c2.803-3.468,5.061-6.645,4.292-10.376c-0.309-1.672-1.247-2.966-2.731-3.752c-0.826-0.424-1.879-0.639-3.127-0.639C5.629,36.68,4.031,36.971,2.546,37.5z" />
        <path d="M10.491,79.516c0.25-0.135,0.487-0.289,0.74-0.483c1.718-1.313,1.801-3.335,1.786-3.885c-0.001-1.878-0.712-3.318-2.166-4.401c-1.026-0.77-2.534-1.177-4.361-1.177c-1.347,0-2.787,0.212-4.057,0.596c-0.668,0.202-1.107,0.839-1.063,1.533l0.058,0.88c0.031,0.471,0.28,0.896,0.673,1.155c0.394,0.259,0.886,0.319,1.327,0.159c0.864-0.307,1.571-0.45,2.223-0.45c0.229,0,0.457,0.019,0.722,0.063c0.94,0.127,1.563,0.549,1.9,1.283c0.237,0.52,0.19,1.445-0.083,1.885c-0.654,1.014-2.438,1.217-3.443,1.25c-0.81,0.024-1.453,0.688-1.453,1.498v0.658c0,0.828,0.687,1.5,1.515,1.5c1.575,0,2.311,0.309,2.596,0.485c0.737,0.465,1.065,1.043,1.066,1.918c0.025,0.912-0.348,1.606-1.129,2.121c-1.014,0.651-2.64,0.647-4.505,0.032c-0.438-0.146-0.918-0.082-1.302,0.175c-0.384,0.255-0.629,0.672-0.665,1.132l-0.068,0.872C0.75,88.973,1.135,89.588,1.75,89.83c0.33,0.13,0.551,0.183,1.022,0.281c0.857,0.196,1.84,0.302,2.842,0.302c1.493,0,4.248-0.247,5.944-1.919c1.657-1.69,1.974-4.11,1.56-5.729C12.636,80.704,11.461,79.946,10.491,79.516z" />
      </svg>
    );
  }

  static getSvgLogs() {
    return (
      <svg width={24} height={24} fill="rgba(180, 180, 180, 0.9)" viewBox="0 0 511.96 511.96">
        <path d="m447.047 61.288c-91.642-24.545-179.118 146.246-150.8 265.62 1.36 5.73 5.75 10.24 11.43 11.76l121.38 32.53c5.911 1.553 11.874-.344 15.77-4.47 84.937-89.983 92.848-281.146 2.22-305.44z" />
        <path d="m414.177 400.338-108.19-28.99c-8.53-2.29-17.31 2.78-19.59 11.31l-10.36 38.64c-10.27 38.35 12.57 77.91 50.92 88.18 38.121 10.27 77.813-12.232 88.18-50.91l10.35-38.64c2.276-8.482-2.739-17.29-11.31-19.59z" />
        <path d="m215.959 267.853c17.641-74.367-9.927-176.881-62.88-232.08-57.62-60.06-127.044-42.892-147.29 39.47-18.251 74.199 9.069 176.811 61.59 232.43 3.911 4.14 9.881 6.019 15.77 4.47l121.38-32.53c5.68-1.519 10.07-6.039 11.43-11.76z" />
        <path d="m225.809 323.603c-2.288-8.528-11.065-13.599-19.6-11.31l-108.18 28.99c-8.54 2.28-13.6 11.06-11.31 19.59l10.35 38.64c10.23 38.175 49.607 61.206 88.18 50.91 38.44-10.303 61.216-49.73 50.91-88.18z" />
      </svg>
    );
  }

  static getSvgSetting() {
    return (
      <svg width={24} height={24} fill="rgba(180, 180, 180, 0.9)" viewBox="0 0 48.4 48.4">
        <path d="M48.4,24.2c0-1.8-1.297-3.719-2.896-4.285s-3.149-1.952-3.6-3.045c-0.451-1.093-0.334-3.173,0.396-4.705c0.729-1.532,0.287-3.807-0.986-5.08c-1.272-1.273-3.547-1.714-5.08-0.985c-1.532,0.729-3.609,0.848-4.699,0.397s-2.477-2.003-3.045-3.602C27.921,1.296,26,0,24.2,0c-1.8,0-3.721,1.296-4.29,2.895c-0.569,1.599-1.955,3.151-3.045,3.602c-1.09,0.451-3.168,0.332-4.7-0.397c-1.532-0.729-3.807-0.288-5.08,0.985c-1.273,1.273-1.714,3.547-0.985,5.08c0.729,1.533,0.845,3.611,0.392,4.703c-0.453,1.092-1.998,2.481-3.597,3.047S0,22.4,0,24.2s1.296,3.721,2.895,4.29c1.599,0.568,3.146,1.957,3.599,3.047c0.453,1.089,0.335,3.166-0.394,4.698s-0.288,3.807,0.985,5.08c1.273,1.272,3.547,1.714,5.08,0.985c1.533-0.729,3.61-0.847,4.7-0.395c1.091,0.452,2.476,2.008,3.045,3.604c0.569,1.596,2.49,2.891,4.29,2.891c1.8,0,3.721-1.295,4.29-2.891c0.568-1.596,1.953-3.15,3.043-3.604c1.09-0.453,3.17-0.334,4.701,0.396c1.533,0.729,3.808,0.287,5.08-0.985c1.273-1.273,1.715-3.548,0.986-5.08c-0.729-1.533-0.849-3.61-0.398-4.7c0.451-1.09,2.004-2.477,3.603-3.045C47.104,27.921,48.4,26,48.4,24.2z M24.2,33.08c-4.91,0-8.88-3.97-8.88-8.87c0-4.91,3.97-8.88,8.88-8.88c4.899,0,8.87,3.97,8.87,8.88C33.07,29.11,29.1,33.08,24.2,33.08z" />
      </svg>
    );
  }

  static getSvgLike() {
    return (
      <svg width={24} height={24} fill="rgba(180, 180, 180, 0.9)" viewBox="0 0 512 512">
        <path d="M376,30c-27.783,0-53.255,8.804-75.707,26.168c-21.525,16.647-35.856,37.85-44.293,53.268c-8.437-15.419-22.768-36.621-44.293-53.268C189.255,38.804,163.783,30,136,30C58.468,30,0,93.417,0,177.514c0,90.854,72.943,153.015,183.369,247.118c18.752,15.981,40.007,34.095,62.099,53.414C248.38,480.596,252.12,482,256,482s7.62-1.404,10.532-3.953c22.094-19.322,43.348-37.435,62.111-53.425C439.057,330.529,512,268.368,512,177.514C512,93.417,453.532,30,376,30z" />
      </svg>
    );
  }

  static getSvgShare({ active }, overStyled = {}) {
    const fill = active ? Container.themeRGBA : Container.reliefRGBA;
    return (
      <svg width={24} height={24} fill={fill} viewBox="0 0 512 512">
        <path d="m182.461 155.48 49.539-49.539v262.059a24 24 0 0 0 48 0v-262.059l49.539 49.539a24 24 0 1 0 33.941-33.941l-90.509-90.51a24 24 0 0 0 -33.942 0l-90.509 90.51a24 24 0 1 0 33.941 33.941z" />
        <path d="m464 232a24 24 0 0 0 -24 24v184h-368v-184a24 24 0 0 0 -48 0v192a40 40 0 0 0 40 40h384a40 40 0 0 0 40-40v-192a24 24 0 0 0 -24-24z" />
      </svg>
    );
  }

  static getSvgAbout() {
    return (
      <svg width={24} height={24} fill="rgba(180, 180, 180, 0.9)" viewBox="0 0 431.855 431.855">
        <path d="M215.936,0C96.722,0,0.008,96.592,0.008,215.814c0,119.336,96.714,216.041,215.927,216.041c119.279,0,215.911-96.706,215.911-216.041C431.847,96.592,335.214,0,215.936,0z M231.323,335.962c-5.015,4.463-10.827,6.706-17.411,6.706c-6.812,0-12.754-2.203-17.826-6.617c-5.08-4.406-7.625-10.575-7.625-18.501c0-7.031,2.463-12.949,7.373-17.745c4.91-4.796,10.933-7.194,18.078-7.194c7.031,0,12.949,2.398,17.753,7.194c4.796,4.796,7.202,10.713,7.202,17.745C238.858,325.362,236.346,331.5,231.323,335.962z M293.856,180.934c-3.853,7.145-8.429,13.306-13.737,18.501c-5.292,5.194-14.81,13.924-28.548,26.198c-3.788,3.463-6.836,6.503-9.12,9.12c-2.284,2.626-3.991,5.023-5.105,7.202c-1.122,2.178-1.983,4.357-2.593,6.535c-0.61,2.17-1.528,5.999-2.772,11.469c-2.113,11.608-8.754,17.411-19.915,17.411c-5.804,0-10.681-1.894-14.656-5.69c-3.959-3.796-5.934-9.429-5.934-16.907c0-9.372,1.455-17.493,4.357-24.361c2.886-6.869,6.747-12.892,11.543-18.086c4.804-5.194,11.274-11.356,19.427-18.501c7.145-6.251,12.307-10.965,15.485-14.144c3.186-3.186,5.861-6.73,8.031-10.632c2.187-3.91,3.26-8.145,3.26-12.721c0-8.933-3.308-16.46-9.957-22.597c-6.641-6.137-15.209-9.21-25.703-9.21c-12.282,0-21.321,3.097-27.125,9.291c-5.804,6.194-10.705,15.314-14.729,27.369c-3.804,12.616-11.006,18.923-21.598,18.923c-6.251,0-11.526-2.203-15.826-6.609c-4.292-4.406-6.438-9.177-6.438-14.314c0-10.6,3.406-21.346,10.21-32.23c6.812-10.884,16.745-19.899,29.807-27.036c13.054-7.145,28.296-10.722,45.699-10.722c16.184,0,30.466,2.991,42.854,8.966c12.388,5.966,21.963,14.087,28.718,24.361c6.747,10.266,10.128,21.427,10.128,33.482C299.635,165.473,297.709,173.789,293.856,180.934z" />
      </svg>
    );
  }

  static getSvgLinkTo() {
    return (
      <svg width={24} height={24} fill="rgba(180, 180, 180, 0.9)" viewBox="0 0 512 512">
        <path d="M488.727 0H302.545c-12.853 0-23.273 10.42-23.273 23.273s10.42 23.273 23.273 23.273h129.997L192.999 286.09c-9.089 9.089-9.089 23.823 0 32.912a23.195 23.195 0 0016.455 6.816 23.194 23.194 0 0016.457-6.817L465.455 79.458v129.997c0 12.853 10.42 23.273 23.273 23.273s23.273-10.42 23.273-23.273V23.273C512 10.42 501.58 0 488.727 0z"></path>
        <path d="M395.636 232.727c-12.853 0-23.273 10.42-23.273 23.273v209.455H46.545V139.636H256c12.853 0 23.273-10.42 23.273-23.273S268.853 93.091 256 93.091H23.273C10.42 93.091 0 103.511 0 116.364v372.364C0 501.58 10.42 512 23.273 512h372.364c12.853 0 23.273-10.42 23.273-23.273V256c-.001-12.853-10.421-23.273-23.274-23.273z"></path>
      </svg>
    );
  }

  static getSvgPost() {
    return (
      <svg width={24} height={24} fill="rgba(180, 180, 180, 0.9)">
        <defs>
          <path
            d="M359.65 221.83C332.21 285.09 315.06 324.63 308.2 340.44C307.44 342.2 305.57 343.21 303.68 342.87C291.69 340.75 261.71 335.44 213.73 326.95C161.24 317.65 128.43 311.85 115.3 309.52C111.55 308.86 110.25 304.14 113.13 301.64C155.01 265.38 200 231.16 248.11 198.99C298.91 165.02 353.12 133.36 410.75 104.02L359.65 221.83Z"
            id="a5krBNxgY"></path>
          <path
            d="M382.16 220.68C359.7 289 345.67 331.7 340.05 348.78C339.45 350.63 340.3 352.63 342.04 353.48C377.73 370.76 475.88 418.29 510.1 434.86C514.37 436.93 519.17 433.23 518.25 428.57C508.52 379.39 495.37 328.89 478.79 277.07C460.98 221.43 439.27 164.42 413.66 106.04L382.16 220.68Z"
            id="adQ58SEPO"></path>
          <path
            d="M368.06 408.28C370.46 406.2 370.05 402.37 367.27 400.84C351.43 392.11 333.76 384.56 314.25 378.18C294.7 371.78 273.97 367.06 252.05 364.01C248.95 363.58 246.56 366.68 247.77 369.57C256.57 390.56 279.63 445.56 288.28 466.19C289.99 470.29 295.22 471.51 298.57 468.6C313.46 455.68 352.8 421.53 368.06 408.28Z"
            id="a5SBas3Y42"></path>
        </defs>
        <use xlinkHref="#a5krBNxgY" opacity="1" fill="#c9c9c9" fill-opacity="1"></use>
        <use xlinkHref="#a5krBNxgY" opacity="1" fill-opacity="0" stroke="#000000" stroke-width="0" stroke-opacity="1"></use>
        <use xlinkHref="#adQ58SEPO" opacity="1" fill="#c9c9c9" fill-opacity="1"></use>
        <use xlinkHref="#adQ58SEPO" opacity="1" fill-opacity="0" stroke="#000000" stroke-width="0" stroke-opacity="1"></use>
        <use xlinkHref="#a5SBas3Y42" opacity="1" fill="#c9c9c9" fill-opacity="1"></use>
        <use xlinkHref="#a5SBas3Y42" opacity="1" fill-opacity="0" stroke="#000000" stroke-width="0" stroke-opacity="1"></use>
      </svg>
    );
  }

  static getEmpty(state: any = {}, overStyle, option: any = {}) {
    const style = Icon.getOveredStyle(IconStyle.getEmpty(state, option), overStyle);
    return <div data-component-type={'IconEmpty'} style={style} />;
  }

  /*
  static getMultistreamIcon(props) {
    const { state } = props;
    const { style, ui } = state;
    const ThunderIcon = Icon.getThunder(IconStyle.getThunder(state));
    if (ui.menuComponent === "Index" && app.isRootCh) {
      return (
        <div data-component-name={"multistreamIcon"} style={style.container.multistreamIconWrap}>
          {ThunderIcon}
        </div>
      );
    } else {
      return null;
    }
  }
*/

  static getLiveCnt({ app, ui }, liveCnt = 0, isHighligt = false): React.ReactNode {
    const style = IconStyle.getLiveCnt({ app, ui });
    style.div.boxShadow = isHighligt ? '0px 0px 20px rgba(79, 174, 159, 0.96)' : '0px 0px 0px rgba(79, 174, 159, 1)';
    console.log(isHighligt + ' ' + style.div.boxShadow);
    return (
      <span style={style.div}>
        <span style={style.circle}>{liveCnt}</span>
      </span>
    );
  }

  static getStampStr(post, dispLabelStampId, isBubble = true) {
    const stampStrStyle = IconStyle.getStampStr(isBubble);
    if (dispLabelStampId > 0) {
      const stampLabelStrStyle = IconStyle.getStampLabelAtMenuStr();
      const stampType = emotionCoverTypes.belongCoverTypes[dispLabelStampId] ? emotionCoverTypes.belongCoverTypes[dispLabelStampId] : 'No';
      return (
        `<div data-component-name="stamp" style="${stampStrStyle}">` +
        post +
        `<span data-component-name="stamp-label" style="${stampLabelStrStyle}"> (${stampType})</span>` +
        `</div >`
      );
    } else {
      return `<div data-component-name="stamp" style="${stampStrStyle}">` + post + `</div >`;
    }
  }

  static getStampLabel({ app, ui, post }, type = 'default') {
    if (post.stampId > 0) {
      const stampLabelStyle = IconStyle.getStampLabel({ app, ui });
      let stampType = emotionCoverTypes.belongCoverTypes[post.stampId] ? emotionCoverTypes.belongCoverTypes[post.stampId] : 'No';
      return (
        <div data-component-name={'stamp-label-div'} style={stampLabelStyle.div}>
          <div data-component-name={'stamp-label'} style={stampLabelStyle.label}>
            ({stampType})
          </div>
        </div>
      );
    } else {
      return undefined;
    }
  }

  static getTwitter(state = {}, overStyle, option = {}): React.ReactNode {
    return Icon.generateImageIcon('Twitter', state, overStyle, option);
  }

  static getFacebook(state = {}, overStyle, option = {}): React.ReactNode {
    return Icon.generateImageIcon('Facebook', state, overStyle, option);
  }

  static getAppstore(state = {}, overStyle, option = {}): React.ReactNode {
    return Icon.generateImageIcon('Appstore', state, overStyle, option);
  }

  static getAndroid(state = {}, overStyle, option = {}): React.ReactNode {
    return Icon.generateImageIcon('Android', state, overStyle, option);
  }

  static getHome(state = {}, overStyle, option = {}): React.ReactNode {
    return Icon.generateImageIcon('Home', state, overStyle, option);
  }

  static getGraph(state: any = {}, overStyle, option: any = {}): React.ReactNode {
    const onClick = option.onClick ? option.onClick : () => {};
    const style = Icon.getOveredStyle(IconStyle.getGraph(state, option), overStyle);
    return <div data-component-type={'IconGraph'} onClick={onClick} style={style} />;
  }

  static getTalkn(state = {}, overStyle, option = {}): React.ReactNode {
    return Icon.generateImageIcon('Talkn', state, overStyle, option);
  }

  static getTalknLogo(style): React.ReactNode {
    return <div data-component-type={'IconTalknLogo'} style={style.img} />;
  }

  static getChromeExtension(overStyle, state = {}, option = {}) {
    return Icon.generateImageIcon('ChromeExtension', state, overStyle, option);
  }

  static getTag(style): React.ReactNode {
    return (
      <div data-component-type={'IconTag'} style={style.div}>
        <div style={style.left}></div>
        <div style={style.right}></div>
        <div style={style.bar}></div>
      </div>
    );
  }

  static getHomeCss(style): React.ReactNode {
    return (
      <div data-component-type={'IconHomeCss'} style={style.div}>
        <div style={style.leaf}></div>
        <div style={style.base}></div>
        <div style={style.door}></div>
      </div>
    );
  }

  static getSearch(style): React.ReactNode {
    return (
      <div data-component-type={'IconSearch'} style={style.div}>
        <span style={style.circle}></span>
        <span style={style.bar}></span>
      </div>
    );
  }

  static getUser({ app, ui }: any, overStyle = {}): React.ReactNode {
    const style: any = Icon.getOveredStyle(IconStyle.getUser({ app, ui }), overStyle);
    return (
      <div data-component-type={'IconUser'} style={style.div}>
        <span style={style.bottom}></span>
        <span style={style.top}></span>
      </div>
    );
  }

  static getHeaderUser({ app, ui }: any, overStyle = {}): React.ReactNode {
    const style: any = Icon.getOveredStyle(IconStyle.getHeaderUser({ app, ui }), overStyle);
    return (
      <div data-component-type={'IconUser'} style={style.div}>
        <span style={style.bottom}></span>
        <span style={style.top}></span>
      </div>
    );
  }

  static getLogs({ app, ui }: any, overStyle = {}): React.ReactNode {
    const style: any = Icon.getOveredStyle(IconStyle.getLogs({ app, ui }), overStyle);
    return (
      <div data-component-type={'IconLogs'} style={style.div}>
        <div style={style.foot1}>
          <span style={style.foot1Top}></span>
          <span style={style.foot1Bottom}></span>
          <span style={style.foot1Space}></span>
        </div>
        <div style={style.foot2}>
          <span style={style.foot2Top}></span>
          <span style={style.foot2Bottom}></span>
          <span style={style.foot2Space}></span>
        </div>
      </div>
    );
  }

  static getSetting({ app, ui }: any, overStyle = {}): React.ReactNode {
    const style: any = Icon.getOveredStyle(IconStyle.getSetting({ app, ui }), overStyle);
    return (
      <div data-component-type={'IconSetting'} style={style.div}>
        <div style={style.wing1} />
        <div style={style.wing2} />
        <div style={style.wing3} />
        <div style={style.wing4} />
        <div style={style.wing5} />
        <div style={style.wing6} />
        <div style={style.wing7} />
        <div style={style.wing8} />
        <div style={style.circle} />
      </div>
    );
  }

  static getMenu(style): React.ReactNode {
    return (
      <div data-component-type={'IconMenu'} style={style.div}>
        <div style={style.dot} />
        <div style={style.dot} />
        <div style={style.dot} />
      </div>
    );
  }

  static getIndex({ app, ui }, overStyle: any = {}): React.ReactNode {
    const style: any = Icon.getOveredStyle(IconStyle.getIndex({ app, ui }), overStyle);
    return (
      <div data-component-type={'IconIndex'} style={style.div}>
        <div style={style.wrap}>
          <span style={style.top}></span>
          <span style={style.middle}></span>
          <span style={style.bottom}></span>
        </div>
      </div>
    );
  }

  static getDetail(style): React.ReactNode {
    return (
      <div data-component-type={'IconDetail'} style={style.div}>
        <div style={style.wrap}>
          <span style={style.bar1}></span>
          <span style={style.bar2}></span>
          <span style={style.bar3}></span>
          <span style={style.bar4}></span>
          <span style={style.mekuri}></span>
        </div>
      </div>
    );
  }

  static getThunder(style): React.ReactNode {
    return (
      <div data-component-type={'IconThunder'} style={style.div}>
        <div data-component-type={'IconThunderWrap'} style={style.wrap}>
          <span data-component-type={'IconThunderTop'} style={style.top}></span>
          <span data-component-type={'IconThunderBottom'} style={style.bottom}></span>
        </div>
      </div>
    );
  }

  static getBubble(style): React.ReactNode {
    return (
      <div data-component-type={'IconBubbleDiv'} style={style.div}>
        <div data-component-type={'IconBubble'} style={style.bubble}></div>
        <div data-component-type={'IconBubbleBar'} style={style.bubbleBar}></div>
      </div>
    );
  }

  static getPlay(style): React.ReactNode {
    return (
      <div data-component-type={'IconPlayDiv'} style={style.div}>
        <div data-component-type={'IconPlayCircle'} style={style.playCircle}></div>
        <div data-component-type={'IconPlayTriangle'} style={style.playTriangle}></div>
      </div>
    );
  }

  static getLinks(style): React.ReactNode {
    return (
      <div data-component-type={'IconLinksDiv'} style={style.div}>
        <div data-component-type={'IconLinksA1'} style={style.linksA1}></div>
        <div data-component-type={'IconLinksB1'} style={style.linksB1}></div>
        <div data-component-type={'IconLinksA2'} style={style.linksA2}></div>
        <div data-component-type={'IconLinksB2'} style={style.linksB2}></div>
      </div>
    );
  }

  static getHeadTab(overStyle, params = {}): React.ReactNode {
    const style: any = Icon.getOveredStyle(IconStyle.getHeadTab(params), overStyle);
    return (
      <div data-component-type={'IconHeadTab'} style={style.div}>
        <span style={style.left}></span>
        <span style={style.right}></span>
      </div>
    );
  }

  static getHeart(overStyle, params = {}): React.ReactNode {
    const style: any = Icon.getOveredStyle(IconStyle.getHeart(params), overStyle);
    return (
      <div data-component-type={'IconHeart'} style={style.div}>
        <div style={style.before}></div>
        <div style={style.after}></div>
      </div>
    );
  }

  static getShare(overStyle, params = {}): React.ReactNode {
    const style: any = Icon.getOveredStyle(IconStyle.getShare(params), overStyle);
    return (
      <div data-component-type={'IconShare'} style={style.div}>
        <div style={style.arrow}></div>
        <div style={style.bar}></div>
        <div style={style.whiteBar1}></div>
        <div style={style.whiteBar2}></div>
        <div style={style.base}></div>
      </div>
    );
  }

  static getMoney(overStyle, params = {}): React.ReactNode {
    const style: any = Icon.getOveredStyle(IconStyle.getMoney(params), overStyle);
    return (
      <div data-component-type={'IconMoney'} style={style.div}>
        <div style={style.outer}>
          <div style={style.inner}></div>
        </div>
      </div>
    );
  }

  static getOpenEmoji(overStyle, params = {}): React.ReactNode {
    const style: any = Icon.getOveredStyle(IconStyle.getOpenEmoji(params), overStyle);
    return <div data-component-type={'IconOpenEmoji'} style={style.div} />;
  }

  static getCloseEmoji(overStyle, params: any = {}): React.ReactNode {
    const style: any = Icon.getOveredStyle(IconStyle.getCloseEmoji(params), overStyle);
    return <div data-component-type={'IconCloseEmoji'} style={style.div} />;
  }

  static getClose(overStyle, params = {}): React.ReactNode {
    const style: any = Icon.getOveredStyle(IconStyle.getClose(params), overStyle);
    return (
      <div data-component-type={'IconClose'} style={style.div}>
        <div style={style.circle}>
          <div style={style.bar1} />
          <div style={style.bar2} />
        </div>
      </div>
    );
  }

  static getCh(overStyle, params = {}): React.ReactNode {
    const style: any = Icon.getOveredStyle(IconStyle.getCh(params), overStyle);
    return (
      <div data-component-type={'IconCh'} style={style.div}>
        <div data-component-type={'IconChC'} style={style.chC} />
        <div data-component-type={'IconCSpace'} style={style.chCSpace} />
        <div data-component-type={'IconChCircle1'} style={style.chCCircle1} />
        <div data-component-type={'IconChCircle2'} style={style.chCCircle2} />
        <div data-component-type={'IconChH1'} style={style.chH1} />
        <div data-component-type={'IconChH2'} style={style.chH2} />
        <div data-component-type={'IconChH3'} style={style.chH3} />
      </div>

      /*
      <div data-component-type={"IconCh"} style={style.div}>
        <div data-component-type={"IconChCircle1"} style={style.circle1}>
          <div data-component-type={"IconChCircle2"} style={style.circle2}>
            <div data-component-type={"IconChStr"} style={style.str}>
                CH
            </div>
          </div>
        </div>
        <div data-component-type={"IconShadow1"} style={style.shadow1} />
        <div data-component-type={"IconShadow2"} style={style.shadow2} />
      </div>
      */
    );
  }

  static getUpdate(overStyle, params = {}): React.ReactNode {
    const style: any = Icon.getOveredStyle(IconStyle.getUpdate(params), overStyle);
    return (
      <div data-component-type={'IconUpdate'} style={style.div}>
        <div style={style.circle}>
          <div style={style.bar} />
          <div style={style.white} />
        </div>
      </div>
    );
  }

  static getLoading(overStyle, params = {}): React.ReactNode {
    const style: any = Icon.getOveredStyle(IconStyle.getLoading(params), overStyle);
    return (
      <div data-component-type={'IconLoading'} style={style.div}>
        <div style={style.circle} />
        <div style={style.after} />
      </div>
    );
  }

  static getTune(overStyle, params = {}): React.ReactNode {
    const style: any = Icon.getOveredStyle(IconStyle.getTune(params), overStyle);
    return (
      <div data-component-type={'IconTune'} style={style.div}>
        <div data-component-type={'IconSide1'} style={style.side1}></div>
        <div data-component-type={'IconSide2'} style={style.side2}></div>
        <div data-component-type={'IconCut'} style={style.cut}></div>
        <div data-component-type={'IconCenter'} style={style.center}></div>

        <div data-component-type={'IconTerminalLeftTop1'} style={style.terminalLeftTop1}></div>
        <div data-component-type={'IconTerminalLeftTop2'} style={style.terminalLeftTop2}></div>
        <div data-component-type={'IconTerminalLeftBottom1'} style={style.terminalLeftBottom1}></div>
        <div data-component-type={'IconTerminalLeftBottom2'} style={style.terminalLeftBottom2}></div>

        <div data-component-type={'IconTerminalRightTop1'} style={style.terminalRightTop1}></div>
        <div data-component-type={'IconTerminalRightTop2'} style={style.terminalRightTop2}></div>
        <div data-component-type={'IconTerminalRightBottom1'} style={style.terminalRightBottom1}></div>
        <div data-component-type={'IconTerminalRightBottom2'} style={style.terminalRightBottom2}></div>
      </div>
    );
  }
}
