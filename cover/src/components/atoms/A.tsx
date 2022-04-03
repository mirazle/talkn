import React from 'react';
import styled from 'styled-components';

import { FlexCss, FlexLayoutPropsType, flexLayoutPropsInit } from 'cover/components/atoms/Flex';
import * as Layout from 'cover/nodes/Layout';
import styles from 'cover/styles';

export type Props = {
  children: React.ReactNode;
  href: string;
  className?: string;
  block?: boolean;
  hoverUnderline?: boolean;
} & Layout.LayoutPropsType &
  FlexLayoutPropsType;

const Component: React.FC<Props> = (props: Props) => {
  const p: Props = { ...Layout.layoutPropsInit, ...flexLayoutPropsInit, ...props };
  return <Container {...p}>{p.children}</Container>;
};

export default Component;

const Container = styled.a<Props>`
  ${(props) => (props.block ? 'display: block' : FlexCss)};
  ${Layout.LayoutCss};
  ${(props) => (props.block ? 'width: 100%' : '')};
  text-decoration: none;
  line-height: 30px;
  color: ${styles.fontColor};
  :visited,
  :hover,
  :active {
    color: ${styles.fontColor};
    cursor: pointer;
    user-select: none;
    text-decoration: ${styles.brightColor} solid ${(props) => (props.hoverUnderline ? 'underline' : 'none')};
  }
`;
