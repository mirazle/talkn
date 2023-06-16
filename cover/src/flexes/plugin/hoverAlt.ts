import styled, { css } from 'styled-components';

import styles from 'cover/styles';

export const getHoverAltCss = (props) => {
  if (props.alt) {
    let att;
    let horizon;
    let vertical;
    let content;
    let translateY;
    if (typeof props.alt === 'string') {
      att = 'before';
      horizon = 'bottom: 100%';
      vertical = 'left: unset';
      content = props.alt;
      translateY = -8;
    } else if (typeof props.alt.label === 'string' && props.alt.type && props.alt.type !== '') {
      att = props.alt.type.indexOf('upper') === 0 ? 'before' : 'after';
      horizon = att === 'before' ? 'bottom: 100%' : 'top: 100%';
      vertical = props.alt.type.indexOf('right') > 0 ? 'right: unset' : 'left: unset';
      content = props.alt.label;
      translateY = att === 'before' ? -8 : 8;
    } else {
      return '';
    }
    if (content === '') {
      return '';
    }

    return css<any>`
      transform: translate(0, 0);
      :${att} {
        position: absolute;
        ${horizon};
        ${vertical};
        display: contents;
        align-items: center;
        justify-content: flex-start;
        width: auto;
        height: 0;
        min-height: 0;
        max-height: 0;
        padding: 8px 16px;
        margin: 0 8px;
        background: rgba(0, 0, 0, 0.6);
        color: #fff;
        font-size: 75%;
        box-shadow: none;
        border-radius: 6px;
        content: '';
        text-align: left;
        white-space: normal;
        transition: ${styles.transitionDuration}ms;
        transform: translate(0, 0);
      }
      :hover {
        :${att} {
          position: absolute;
          ${horizon};
          ${vertical};
          display: flex;
          align-items: center;
          justify-content: flex-start;
          width: auto;
          height: auto;
          min-height: auto;
          max-height: unset;
          padding: 8px 16px;
          margin: 0 8px;
          background: rgba(0, 0, 0, 0.6);
          color: #fff;
          font-size: 75%;
          box-shadow: ${styles.shadowHorizonBase};
          border-radius: 6px;
          content: '${content}';
          text-align: left;
          white-space: normal;
          transition: ${styles.transitionDuration}ms;
          transform: translate(0px, ${translateY}px);
        }
      }
    `;
  } else {
    return '';
  }
};
