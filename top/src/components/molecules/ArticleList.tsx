import React, { useEffect, useState, useRef } from 'react';
import styled, { css } from 'styled-components';

import BackgroundImage from 'top/components/atoms/BackgroundImage';
import Favicon from 'top/components/atoms/Favicon';
import Time from 'top/components/atoms/Time';
import Title from 'top/components/atoms/Title';

export type ServerMetasType = {
  'og:image': string;
};

export type ArticleType = {
  title: string;
  description: string;
  favicon: string;
  updateTime: string;
  serverMetas: ServerMetasType;
};

export type Props = {
  article: ArticleType;
};

const Component: React.FC<Props> = ({ article }) => {
  const [marqueeOn, setMarqueeOn] = useState(false);
  const selfRef = useRef(null);
  useEffect(() => {
    if (selfRef.current) {
      const selfElm = selfRef.current;
      const headerElm = selfElm.children[0];
      setMarqueeOn(headerElm.clientWidth < headerElm.scrollWidth);
    }
  }, []);

  return (
    <ArticleList>
      <Article ref={selfRef} marqueeOn={marqueeOn} marqueeDuration={article.title.length / 4}>
        <Header overflowTitle={marqueeOn}>
          <Favicon src={article.favicon} />
          <Title lv={2}>{article.title}</Title>
        </Header>
        <BackgroundImage src={article.serverMetas['og:image']} />
        <Time value={article.updateTime} />
        <p>{article.description}</p>
        <dl>
          <dd>Twitter</dd>
          <dd>Facebook</dd>
          <dd>Home</dd>
        </dl>
      </Article>
    </ArticleList>
  );
};

export default Component;

const ArticleList = styled.li`
  list-style: none;
`;

type ContainerPropsType = {
  marqueeOn: boolean;
  marqueeDuration: number;
};

const Article = styled.article<ContainerPropsType>`
  overflow: hidden;
  width: 300px;
  height: 480px;
  margin: 16px;
  background: #fff;
  box-shadow: 0px 0px 16px 0px #ccc;
  border-radius: 10px;
  transition: 300ms;
  :hover {
    background: #fefefe;
    box-shadow: 0px 0px 24px 0px #bbb;
    h2 {
      ${(props) => (props.marqueeOn ? animationCss : '')};
    }
  }
`;

const animationCss = css<ContainerPropsType>`
  @keyframes animation-marquee {
    0% {
      transform: translate(0%);
    }
    100% {
      transform: translate(-100%);
    }
  }
  @-webkit-keyframes animation-marquee {
    0% {
      transform: translate(0%);
    }
    100% {
      transform: translate(-100%);
    }
  }
  animation-name: animation-marquee;
  animation-duration: ${(props) => props.marqueeDuration}s;
  animation-timing-function: linear;
  animation-delay: 0s;
  animation-iteration-count: infinite;
  animation-direction: normal;
`;

type HeaderPropsType = {
  overflowTitle: boolean;
};

const Header = styled.header<HeaderPropsType>`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-start;
  height: 60px;
  white-space: nowrap;
  h2 {
    position: relative;
    left: -50px;
    width: 100%;
    min-width: 100%;
    text-align: center;
    text-indent: ${(props) => (props.overflowTitle ? 50 : 25)}px;
    /*
    :before {
      position: relative;
      left: 274px;
      width: 16px;
      min-width: 16px;
      max-width: 16px;
      height: 60px;
      min-height: 60px;
      max-height: 60px;
      content: '_';
      background: red;
    }
    */
  }
`;
