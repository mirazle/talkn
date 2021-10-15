import React from 'react';
import styled from 'styled-components';

import * as styles from 'top/styles';

type Props = {
  id?: string;
  className?: string;
  lv?: number;
  loop?: boolean;
  shadow?: boolean;
};

const Component: React.FC<Props> = ({ id: _id, className = 'Title', lv = 2, shadow = false, children }) => {
  const id = _id ? { id: _id } : {};
  const fixedClassName = `${className}${lv}`;
  switch (lv) {
    case 1:
      return (
        <H1 {...id} className={fixedClassName} shadow={shadow}>
          {children}
        </H1>
      );
    case 2:
      return (
        <H2 {...id} className={fixedClassName} shadow={shadow}>
          {children}
        </H2>
      );
    case 3:
      return (
        <H3 {...id} className={fixedClassName} shadow={shadow}>
          {children}
        </H3>
      );
    case 4:
      return (
        <H4 {...id} className={fixedClassName} shadow={shadow}>
          {children}
        </H4>
      );
    case 5:
      return (
        <H5 {...id} className={fixedClassName} shadow={shadow}>
          {children}
        </H5>
      );
    case 6:
    default:
      return (
        <H6 {...id} className={fixedClassName} shadow={shadow}>
          {children}
        </H6>
      );
  }
};

export default Component;

type StyledPropsType = {
  shadow: boolean;
};

const H1 = styled.h1<StyledPropsType>`
  font-size: 24px;
  font-weight: 200;
  line-height; 30px;
  user-select: none;
`;

const H2LineHeight = styles.quadMargin;
const H2Margin = styles.baseMargin;
const H2 = styled.h2<StyledPropsType>`
  font-size: 175%;
  font-weight: 300;
  line-height: ${H2LineHeight}px;
  color: #e60012;
  user-select: none;
  margin: ${H2Margin}px 0;
  text-shadow: ${(props) => (props.shadow ? styles.baseTextShadow : 'none')};
  @media (max-width: ${styles.spLayoutWidth}px) {
    margin: 0;
    font-size: 150%;
    line-height: ${H2LineHeight}px;
  }
  @media (max-width: ${styles.spLayoutStrictWidth}px) {
    margin: 0;
    font-size: 100%;
    line-height: ${H2LineHeight / 1.5}px;
  }
`;

const H3LineHeight = styles.doubleMargin;
const H3Margin = styles.baseMargin;
export const H3Height = H3LineHeight + H3Margin * 2;
const H3 = styled.h3<StyledPropsType>`
  margin: ${H2Margin}px 0;
  text-indent: 30px;
  font-size: 20px;
  font-weight: 200;
  line-height: ${H3LineHeight}px;
  color: #555;
  user-select: none;
`;
const H4 = styled.h4<StyledPropsType>`
  padding: 0;
  margin: 0;
  font-size: 18px;
  font-weight: 200;
  user-select: none;
`;
const H5 = styled.h5<StyledPropsType>`
  padding: 0;
  margin: 0;
  font-size: 30px;
  font-weight: 200;
  line-height: 40px;
  user-select: none;
  @media (max-width: ${styles.spLayoutWidth}px) {
  }
  @media (max-width: ${styles.spLayoutStrictWidth}px) {
    font-size: 20px;
    line-height: 30px;
  }
`;

const H6 = styled.h5<StyledPropsType>`
  padding: 0;
  margin: 15px 0;
  text-align: center;
  font-size: 20px;
  font-weight: 200;
  user-select: none;
`;
