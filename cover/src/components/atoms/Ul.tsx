import React from 'react';
import styled from 'styled-components';

import { FlexCss, FlexLayoutPropsType, flexLayoutPropsInit } from 'cover/components/atoms/Flex';
import * as Layout from 'cover/nodes/Layout';

export type Props = {
  children: React.ReactNode;
  className?: string;
} & Layout.LayoutPropsType &
  FlexLayoutPropsType;

const Component: React.FC<Props> = (props: Props) => {
  const p: Props = { ...Layout.layoutPropsInit, ...flexLayoutPropsInit, ...props };
  return <Container {...p}>{p.children}</Container>;
};

export default Component;

type ComponentPropsType = Layout.LayoutPropsType & FlexLayoutPropsType;

const Container = styled.ul<ComponentPropsType>`
  padding: 0;
  list-style: none;
  ${FlexCss};
  ${Layout.LayoutCss};
`;
