import React from 'react';
import styled from 'styled-components';

import { FlexCss, FlexLayoutPropsType, flexLayoutPropsInit } from 'cover/components/atoms/Flex';
import * as Content from 'cover/nodes/Content';
import * as Layout from 'cover/nodes/Layout';

export type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
} & Layout.LayoutPropsType &
  FlexLayoutPropsType &
  Content.ContentProps;

const Component: React.FC<Props> = (props: Props) => {
  const p: Props = { ...Layout.layoutPropsInit, ...flexLayoutPropsInit, ...Content.contentPropsInit, ...props };
  return <Container {...p}>{p.children}</Container>;
};

export default Component;

type ComponentPropsType = Layout.LayoutPropsType & FlexLayoutPropsType & Content.ContentProps;

const Container = styled.li<ComponentPropsType>`
  ${FlexCss};
  ${Layout.LayoutCss};
  ${Content.ContentCss}
`;
