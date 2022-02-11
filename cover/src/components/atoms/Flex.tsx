import React from 'react';
import styled, { css } from 'styled-components';

import * as Layout from 'cover/styles/Layout';

export type FlexLayoutPropsType = {
  flow?: string;
  alignItems?: string;
  justifyContent?: string;
};

export type Props = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
} & Layout.LayoutPropsType &
  FlexLayoutPropsType;

export const flexLayutPropsInit = {
  flow: 'row nowrap',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
};

const Component: React.FC<Props> = (props: Props) => {
  const p: Props = {
    ...Layout.layoutPropsInit,
    ...flexLayutPropsInit,
    ...props,
    className: props.className ? `Flex ${props.className}` : 'Flex',
  };
  return <Container {...p}>{p.children}</Container>;
};

export default Component;

type ComponentPropsType = Layout.LayoutPropsType & FlexLayoutPropsType;

export const FlexCss = css<FlexLayoutPropsType>`
  display: flex;
  flex-flow: ${(props) => props.flow};
  align-items: ${(props) => props.alignItems};
  justify-content: ${(props) => props.justifyContent};
`;

const Container = styled.div<ComponentPropsType>`
  ${FlexCss};
  ${Layout.LayoutCss};
`;
