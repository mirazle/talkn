import React from 'react';
import styled, { css } from 'styled-components';

import { FlexCss, FlexLayoutPropsType, flexLayoutPropsInit } from 'cover/components/atoms/Flex';
import { ContentProps } from 'cover/nodes/Content';
import * as Layout from 'cover/nodes/Layout';
import styles from 'cover/styles';

type HProps = {
  children: React.ReactNode;
  id?: string;
  className?: string;
  onClick?: () => void;
} & ContentProps;

export type Props = HProps & FlexLayoutPropsType & Layout.LayoutPropsType;

const getNode = (num: number, props: Props) => {
  const Container = Containers[num];
  const p: Props = {
    ...Layout.layoutPropsInit,
    ...flexLayoutPropsInit,
    ...props,
  };

  return (
    <Container className={`H${num}`} {...p}>
      {p.children}
    </Container>
  );
};

const H1: React.FC<Props> = (props: Props) => getNode(1, props);
const H2: React.FC<Props> = (props: Props) => getNode(2, props);
const H3: React.FC<Props> = (props: Props) => getNode(3, props);
const H4: React.FC<Props> = (props: Props) => getNode(4, props);
const H5: React.FC<Props> = (props: Props) => getNode(5, props);
const H6: React.FC<Props> = (props: Props) => getNode(6, props);

const HCss = css`
  ${FlexCss};
  ${Layout.LayoutCss};
`;

const Containers = {
  1: styled.h1<Props>`
    margin: 0;
    ${HCss}
    font-size: ${(props) => (props.fontSize ? props.fontSize : '24px')};
    font-weight: ${(props) => (props.fontWeight ? props.fontWeight : '200')};
    line-height: ${(props) => (props.lineHeight ? props.lineHeight : '24px')};
    color: ${(props) => (props.color ? props.color : styles.fontColor)};
  `,
  2: styled.h2<Props>`
    margin: 0;
    ${HCss}
    font-size: ${(props) => (props.fontSize ? props.fontSize : '20px')};
    font-weight: ${(props) => (props.fontWeight ? props.fontWeight : '200')};
    line-height: ${(props) => (props.lineHeight ? props.lineHeight : '24px')};
    color: ${(props) => (props.color ? props.color : styles.fontColor)};
  `,
  3: styled.h3<Props>`
    margin: 0;
    ${HCss}
    font-size: ${(props) => (props.fontSize ? props.fontSize : '24px')};
    font-weight: ${(props) => (props.fontWeight ? props.fontWeight : '200')};
    line-height: ${(props) => (props.lineHeight ? props.lineHeight : '24px')};
    color: ${(props) => (props.color ? props.color : styles.fontColor)};
  `,
  4: styled.h4<Props>`
    margin: 0;
    ${HCss}
    font-size: ${(props) => (props.fontSize ? props.fontSize : '24px')};
    font-weight: ${(props) => (props.fontWeight ? props.fontWeight : '200')};
    line-height: ${(props) => (props.lineHeight ? props.lineHeight : '24px')};
    color: ${(props) => (props.color ? props.color : styles.fontColor)};
  `,
  5: styled.h5<Props>`
    margin: 0;
    ${HCss}
    font-size: ${(props) => (props.fontSize ? props.fontSize : '24px')};
    font-weight: ${(props) => (props.fontWeight ? props.fontWeight : '200')};
    line-height: ${(props) => (props.lineHeight ? props.lineHeight : '24px')};
    color: ${(props) => (props.color ? props.color : styles.fontColor)};
  `,
  6: styled.h6<Props>`
    margin: 0;
    ${HCss}
    font-size: ${(props) => (props.fontSize ? props.fontSize : '24px')};
    font-weight: ${(props) => (props.fontWeight ? props.fontWeight : '200')};
    line-height: ${(props) => (props.lineHeight ? props.lineHeight : '24px')};
    color: ${(props) => (props.color ? props.color : styles.fontColor)};
  `,
};

export default {
  One: H1,
  Two: H2,
  Three: H3,
  Four: H4,
  Five: H5,
  Six: H6,
};
