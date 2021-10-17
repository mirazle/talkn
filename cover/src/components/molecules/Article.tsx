import React, { useEffect, useState, useRef } from 'react';
import styled, { css } from 'styled-components';

import conf from 'common/conf';

import Favicon from 'cover/components/atoms/Favicon';
import LiveCnt from 'cover/components/atoms/LiveCnt';
import OgpImage from 'cover/components/atoms/OgpImage';
import P from 'cover/components/atoms/P';
import Title from 'cover/components/atoms/Title';
import SnsLinks from 'cover/components/molecules/SnsLinks';
import {
  articleShadowColor,
  articleWidth,
  articleOpenScale,
  articleCloseHeight,
  articleOpenHeight,
  basePadding,
  baseShadow,
  baseShadowColor,
} from 'cover/styles';

export type ServerMetasType = {
  'og:image': string;
  'og:description': string;
  'twitter:site': string;
  'fb:page_id': string;
  'al:ios:app_store_id': string;
  'al:android:package': string;
};

export type ArticleType = {
  ch: string;
  title: string;
  favicon: string;
  updateTime: string;
  liveCnt: number;
  serverMetas: ServerMetasType;
};

export type Props = {
  article: ArticleType;
  index: number;
  focusIndex: undefined | number;
  setFocusIndex: React.Dispatch<React.SetStateAction<undefined | number>>;
};
let timeoutId: number = 0;
const Component: React.FC<Props> = ({ article, index, focusIndex, setFocusIndex }) => {
  const { serverMetas } = article;
  const [marqueeOn, setMarqueeOn] = useState(false);
  const headerRef = useRef(null);
  const isFocus = index === focusIndex;

  const handleOnMouseOver = () => {
    setFocusIndex(index);
    clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      setFocusIndex(undefined);
    }, 10000);
  };

  const handleOnMouseMove = () => {
    setFocusIndex(index);
  };

  const handleOnMouseLeave = () => {
    clearTimeout(timeoutId);
    setFocusIndex(undefined);
  };

  // did mount.
  useEffect(() => {
    if (headerRef.current) {
      const headerElm = headerRef.current;
      const titleElm = headerElm.children[1];
      setMarqueeOn(titleElm.clientWidth < titleElm.scrollWidth);
    }
  }, []);

  return (
    <Container>
      <Cover onMouseOver={handleOnMouseOver}>
        <Header overflowTitle={marqueeOn}>
          <Favicon src={article.favicon} className={'Favicon'} />
          <Title lv={4} className={'Title'}>
            {article.title}
          </Title>
          <LiveCnt className={'LiveCnt'}>{article.liveCnt}</LiveCnt>
        </Header>
        <OgpImage src={serverMetas['og:image']} ch={<>{article.ch}</>} />
      </Cover>
      <Detail
        isFocus={isFocus}
        marqueeDuration={marqueeOn ? article.title.length / 10 : 0}
        onMouseOver={handleOnMouseOver}
        onMouseMove={handleOnMouseMove}
        onMouseLeave={handleOnMouseLeave}>
        <a href={`/${article.ch}`}>
          <Header ref={headerRef} overflowTitle={marqueeOn}>
            <Favicon src={article.favicon} className={'Favicon'} />
            <Title lv={4} className={'Title'}>
              {article.title}
            </Title>
            <LiveCnt className={'LiveCnt'}>{article.liveCnt}</LiveCnt>
          </Header>
          <OgpImage src={serverMetas['og:image']} ch={<>{article.ch}</>} />
          <Description>
            <P lv={2}>{serverMetas['og:description']}</P>
            <SnsLinks serverMetas={serverMetas} />
          </Description>
        </a>
      </Detail>
    </Container>
  );
};

export default Component;

const Container = styled.div`
  width: ${articleWidth}px;
  height: ${articleCloseHeight}px;
`;

type CoverPropsType = {};

const Cover = styled.div<CoverPropsType>`
  box-sizing: border-box;
  overflow: hidden;
  width: inherit;
  height: ${articleCloseHeight}px;
  background: #fff;
  box-shadow: 0px 0px ${baseShadow}px 0px ${baseShadowColor};
  border-radius: 10px;
`;

type DetailPropsType = {
  isFocus: boolean;
  marqueeDuration: number;
};

const marqueeCss = css<DetailPropsType>`
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

const _reduceShadow = baseShadow * articleOpenScale - baseShadow;
const reduceShadow = Math.floor(_reduceShadow * 100) / 100;
const Detail = styled.article<DetailPropsType>`
  z-index: 20;
  position: absolute;
  top: ${basePadding}px;
  left: ${basePadding}px;
  opacity: ${(props) => (props.isFocus ? 1 : 0)};
  width: inherit;
  height: ${articleOpenHeight}px;
  background: #fff;
  box-shadow: 0px 0px ${baseShadow * reduceShadow}px 0px ${articleShadowColor};
  border-radius: 10px;
  transition-property: opacity, transform, height;
  transition-duration: ${(props) => (props.isFocus ? '300ms, 300ms, 0ms' : '0ms, 0ms, 0ms')};
  transform: ${(props) => (props.isFocus ? `scale(${articleOpenScale}) translate(0, 10px)` : 'scale(1) translate(0, 0)')};
  cursor: pointer;
  h4 {
    display: flex;
    ${(props) => (props.marqueeDuration ? marqueeCss : '')};
  }
`;

type HeaderPropsType = {
  overflowTitle: boolean;
};

const Header = styled.header<HeaderPropsType>`
  overflow: hidden;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-start;
  width: inherit;
  height: 60px;
  white-space: nowrap;
  .Favicon {
    flex: 1 1 50px;
  }
  .Title4 {
    flex: 1 1 200px;
    max-width: 200px;
    text-align: center;
  }
  .LiveCnt {
    flex: 1 1 50px;
  }
`;

const Description = styled.div`
  overflow: hidden;
  margin: 8px 15px 24px;
  line-height: 26px;
  font-size: 18px;
  font-weight: 200;
`;
