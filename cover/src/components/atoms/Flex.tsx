import React from 'react';
import styled, { css } from 'styled-components';

import * as Layout from 'cover/nodes/Layout';

const flexTagTypeDiv = 'div';
const flexTagTypeSpan = 'span';
const flexTagDefaultType = flexTagTypeDiv;
type FlexTagType = typeof flexTagTypeDiv | typeof flexTagTypeSpan;

export type FlexLayoutPropsType = {
  flow?: string;
  alignItems?: string;
  justifyContent?: string;
  inline?: boolean;
};

export type Props = {
  children: React.ReactNode;
  tagType?: FlexTagType;
  className?: string;
  onClick?: (e: any) => void;
} & Layout.LayoutPropsType &
  FlexLayoutPropsType;

export const flexLayoutPropsInit = {
  flow: 'row nowrap',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  inline: false,
};

export const flexLayoutCenterPropsInit = {
  flow: 'row nowrap',
  alignItems: 'center',
  justifyContent: 'center',
  inline: false,
};

export const flexPropsInit: Props = {
  children: <></>,
  tagType: flexTagDefaultType,
  ...Layout.layoutPropsInit,
  ...flexLayoutPropsInit,
};

const Component: React.FC<Props> = (props: Props) => {
  const p: Props = {
    ...flexPropsInit,
    ...props,
    className: props.className ? `Flex ${props.className}` : 'Flex',
  };
  switch (p.tagType) {
    default:
    case flexTagTypeDiv:
      return <Div {...p}>{p.children}</Div>;
    case flexTagTypeSpan:
      return <Span {...p}>{p.children}</Span>;
  }
};

export default Component;

type ComponentPropsType = any; //Layout.LayoutPropsType & FlexLayoutPropsType;

export const FlexCss = css<FlexLayoutPropsType>`
  display: ${(props) => (props.inline ? 'inline-flex' : 'flex')};
  flex-flow: ${(props) => props.flow};
  align-items: ${(props) => props.alignItems};
  justify-content: ${(props) => props.justifyContent};
`;

const ContainerCss = css<ComponentPropsType>`
  ${FlexCss};
  ${Layout.LayoutCss};
`;

const Div = styled.div`
  ${ContainerCss}
`;

const Span = styled.span`
  ${ContainerCss}
`;
