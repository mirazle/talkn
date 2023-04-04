import React from 'react';
import styled from 'styled-components';

import Title from 'components/atomicDesign/atoms/Title';
import { layouts, colors } from 'components/styles';

type Props = {
  children: React.ReactNode;
  number: number;
  title: string;
  flow?: string;
};

const assignZero = (number: number): string => (String(number).length === 1 ? `0${number}` : String(number));

const Component: React.FC<Props> = ({ number, title, flow = 'column wrap', children }) => {
  return (
    <Container className="Section">
      <UpperLeft className="upperLeft">
        <Q>{assignZero(number)}</Q>
      </UpperLeft>
      <UpperRight className="upperRight">
        <Title type={'Section'}>{title}</Title>
      </UpperRight>
      <BottomLeft className="bottomLeft"></BottomLeft>
      <BottomRight className="bottomRight" flow={flow}>
        {children}
      </BottomRight>
    </Container>
  );
};

export default Component;

const ChapterLeftWidth = layouts.sepSize;
const ChapterMargin = layouts.sectionMarginColumn;
const InnerPadding = layouts.sectionPadding;
const Container = styled.section`
  display: flex;
  flex-flow: row wrap;
  align-items: flex-end;
  justify-content: flex-start;
  padding: ${InnerPadding * 2}px ${InnerPadding}px;
  margin: ${ChapterMargin}px 0;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid #eee;
  border-radius: ${layouts.baseSize}px;
  > * {
    box-sizing: border-content;
  }
  @media (max-width: ${layouts.spLayoutStrictWidth}px) {
    padding: ${InnerPadding}px ${InnerPadding / 2}px;
    margin: ${ChapterMargin}px 0;
    border-radius: 0;
  }
`;
const UpperLeft = styled.span`
  flex: 1 1 ${ChapterLeftWidth}px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  width: ${ChapterLeftWidth}px;
  padding-right: ${InnerPadding}px;
  padding-bottom: ${InnerPadding}px;
  border-bottom: 1px solid ${colors.fontColor};
  @media (max-width: ${layouts.spLayoutStrictWidth}px) {
    align-items: center;
    justify-content: center;
    max-width: 80px;
    padding-right: 0;
  }
`;
const UpperRight = styled.span`
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  flex: 1 1 calc(100% - ${ChapterLeftWidth + InnerPadding * 2}px);
  padding: ${InnerPadding}px;
  border-left: 1px solid #666;
  border-bottom: 1px solid ${colors.fontColor};
`;
const BottomLeft = styled.span`
  flex: 1 1 ${ChapterLeftWidth}px;
  @media (max-width: ${layouts.spLayoutWidth}px) {
  }
  @media (max-width: ${layouts.spLayoutStrictWidth}px) {
    display: contents;
  }
`;

type BottomRightPropsType = {
  flow: string;
};

const BottomRight = styled.span<BottomRightPropsType>`
  flex: 1 1 calc(100% - ${ChapterLeftWidth + InnerPadding * 2}px);
  flex-flow: ${(props) => props.flow};
  padding: ${InnerPadding}px ${InnerPadding}px 0;
  border-left 1px solid ${colors.fontColor};
  @media (max-width: ${layouts.spLayoutWidth}px) {
  }
  @media (max-width: ${layouts.spLayoutStrictWidth}px) {
    padding: ${InnerPadding}px 0;
    border-left 0;
  }
`;

const Q = styled.span`
  font-size: 70px;
  font-weight: 200;
  font-style: italic;
  line-height: 70px;
  @media (max-width: ${layouts.spLayoutStrictWidth}px) {
    font-size: 50px;
    line-height: 50px;
  }
`;
