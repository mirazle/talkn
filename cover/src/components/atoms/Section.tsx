import React from 'react';
import styled from 'styled-components';

import { FlexCss, FlexLayoutPropsType, flexLayutPropsInit } from 'cover/components/atoms/Flex';
import * as Layout from 'cover/styles/Layout';

export type Props = {
  children: React.ReactNode;
  className?: string;
} & Layout.LayoutPropsType &
  FlexLayoutPropsType;

const Component: React.FC<Props> = (props: Props) => {
  const p: Props = { ...Layout.layoutPropsInit, ...flexLayutPropsInit, ...props };
  return <Container {...p}>{p.children}</Container>;
};

export default Component;

type ComponentPropsType = Layout.LayoutPropsType & FlexLayoutPropsType;

const Container = styled.section<ComponentPropsType>`
  ${FlexCss};
  ${Layout.LayoutCss};
`;
