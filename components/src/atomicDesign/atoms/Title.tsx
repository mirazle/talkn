import React from 'react';
import styled from 'styled-components';

import { colors, layouts, shadow } from 'components/styles';

type Props = {
  children: React.ReactNode;
  id?: string;
  type?: string;
  className?: string;
  loop?: boolean;
  shadow?: boolean;
  underline?: boolean;
};

const Component: React.FC<Props> = ({ id: _id, className = 'Title', type = 'Article', shadow = false, underline = false, children }) => {
  const id = _id ? { id: _id } : {};
  switch (type) {
    case 'AppHeader':
      return (
        <AppHeader {...id} className={className} shadow={shadow} underline={underline}>
          {children}
        </AppHeader>
      );
    case 'ServiceHeader':
      return (
        <ServiceHeader {...id} className={className} shadow={shadow} underline={underline}>
          {children}
        </ServiceHeader>
      );
    case 'ArticleOrder':
      return (
        <ArticleOrder {...id} className={className} shadow={shadow} underline={underline}>
          {children}
        </ArticleOrder>
      );
    case 'Article':
      return (
        <Article {...id} className={className} shadow={shadow} underline={underline}>
          {children}
        </Article>
      );
    case 'Section':
      return (
        <Section {...id} className={className} shadow={shadow} underline={underline}>
          {children}
        </Section>
      );
    case 'DomainProfileDescTitle':
      return (
        <DomainProfileDescTitle {...id} className={className} shadow={shadow} underline={underline}>
          {children}
        </DomainProfileDescTitle>
      );
    case 'Index':
      return (
        <Index {...id} className={className} shadow={shadow} underline={underline}>
          {children}
        </Index>
      );
    case 'Resume':
    default:
      return (
        <Resume {...id} className={className} shadow={shadow} underline={underline}>
          {children}
        </Resume>
      );
  }
};

export default Component;

type StyledPropsType = {
  className: string;
  shadow: boolean;
  underline: boolean;
};

const AppHeader = styled.h1<StyledPropsType>`
  font-size: 24px;
  font-weight: 200;
  line-height; 30px;
  user-select: none;
`;

const H2LineHeight = layouts.quadMargin;
const H2Margin = layouts.baseMargin;
const ServiceHeader = styled.h2<StyledPropsType>`
  font-size: 175%;
  font-weight: 300;
  line-height: ${H2LineHeight}px;
  color: #e60012;
  user-select: none;
  margin: ${H2Margin}px 0;
  text-shadow: ${(props) => (props.shadow ? shadow.baseTextShadow : 'none')};
  @media (max-width: ${layouts.spLayoutWidth}px) {
    margin: 0;
    font-size: 150%;
    line-height: ${H2LineHeight}px;
  }
  @media (max-width: ${layouts.spLayoutStrictWidth}px) {
    margin: 0;
    font-size: 100%;
    line-height: ${H2LineHeight / 1.5}px;
  }
`;

const H3LineHeight = layouts.doubleMargin + 10;
const H3Margin = layouts.baseMargin;
export const H3Height = H3LineHeight + H3Margin * 2;
const ArticleOrder = styled.h3<StyledPropsType>`
  margin: ${H2Margin}px 0;
  text-indent: 30px;
  font-size: 18px;
  font-weight: 200;
  line-height: ${H3LineHeight}px;
  color: #555;
  user-select: none;
`;
const Article = styled.h4<StyledPropsType>`
  padding: 0;
  margin: 0;
  font-size: 18px;
  font-weight: 200;
  letter-spacing: 2.5px;
  user-select: none;
`;
const Section = styled.h5<StyledPropsType>`
  padding: 0;
  margin: 0;
  font-size: 28px;
  font-weight: 200;
  line-height: 40px;
  user-select: none;
  border-bottom: ${(props) => (props.underline ? 1 : 0)}px solid ${colors.borderColor};
  @media (max-width: ${layouts.spLayoutWidth}px) {
  }
  @media (max-width: ${layouts.spLayoutStrictWidth}px) {
    font-size: 20px;
    line-height: 30px;
  }
`;

const DomainProfileDescTitle = styled.h5<StyledPropsType>`
  padding: 0;
  margin: 0;
  font-size: 30px;
  font-weight: 200;
  line-height: 40px;
  user-select: none;
  border-bottom: 1px solid ${colors.borderColor};
  @media (max-width: ${layouts.spLayoutStrictWidth}px) {
    font-size: 20px;
    line-height: 30px;
  }
`;

const Index = styled.h5<StyledPropsType>`
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  padding: 0;
  margin: 0;
  font-size: 20px;
  font-weight: 200;
  user-select: none;
  cursor: pointer;
`;

const Resume = styled.h5<StyledPropsType>`
  padding: 0;
  margin: 15px 0;
  font-size: 20px;
  font-weight: 200;
  text-align: center;
  user-select: none;
  cursor: pointer;
`;
