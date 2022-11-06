import React, { useEffect, useState, useRef } from 'react';
import styled, { css } from 'styled-components';

import Favicon from 'components/atomicDesign/atoms/Favicon';
import LiveCnt from 'components/atomicDesign/atoms/LiveCnt';
import OgpImage from 'components/atomicDesign/atoms/OgpImage';
import P from 'components/atomicDesign/atoms/P';
import Title from 'components/atomicDesign/atoms/Title';
import SnsLinks from 'components/atomicDesign/molecules/SnsLinks';
import Flex from 'components/flexes';
import { animations, colors, layouts } from 'components/styles';

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
  findType: string;
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
    }, animations.articleAutoHideMs);
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
      const titleElm = headerElm.children[0];
      setMarqueeOn(titleElm.clientWidth < titleElm.scrollWidth);
    }
  }, []);

  return (
    <Container>
      <Cover isFocus={isFocus} onMouseOver={handleOnMouseOver}>
        <Header overflowTitle={marqueeOn}>
          <Title type={'Article'} className={'Title'}>
            {article.title}
          </Title>
          <FaviconWrap>
            <Favicon src={article.favicon} className={'Favicon'} />
          </FaviconWrap>
          <LiveCntWrap>
            <LiveCnt className={'LiveCnt'}>{article.liveCnt}</LiveCnt>
          </LiveCntWrap>
        </Header>
        <OgpImage src={serverMetas['og:image']} ch={article.ch} findType={article.findType} />
      </Cover>
      <Detail
        isFocus={isFocus}
        marqueeDuration={marqueeOn ? article.title.length / 10 : 0}
        onMouseOver={handleOnMouseOver}
        onMouseMove={handleOnMouseMove}
        onMouseLeave={handleOnMouseLeave}>
        <a href={`/${article.ch}`}>
          <Header ref={headerRef} overflowTitle={marqueeOn}>
            <Title type={'Article'} className={'Title'}>
              {article.title}
            </Title>
            <FaviconWrap>
              <Favicon src={article.favicon} className={'Favicon'} />
            </FaviconWrap>
            <LiveCntWrap>
              <LiveCnt className={'LiveCnt'}>{article.liveCnt}</LiveCnt>
            </LiveCntWrap>
          </Header>
          <OgpImage src={serverMetas['og:image']} ch={article.ch} findType={article.findType} />
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
  width: ${layouts.articleWidth}px;
  height: ${layouts.articleCloseHeight}px;
`;

type CoverPropsType = {
  isFocus: boolean;
};

const Cover = styled.div<CoverPropsType>`
  box-sizing: border-box;
  overflow: hidden;
  width: inherit;
  height: ${layouts.articleCloseHeight}px;
  background: #fff;
  box-shadow: 0px 0px ${layouts.baseShadow}px 0px ${colors.baseShadowColor};
  border-radius: 10px;
  opacity: ${(props) => (props.isFocus ? 1 : 1)};
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

const _reduceShadow = layouts.baseShadow * layouts.articleOpenScale - layouts.baseShadow;
const reduceShadow = Math.floor(_reduceShadow * 100) / 100;
const Detail = styled.article<DetailPropsType>`
  z-index: 20;
  position: absolute;
  top: ${layouts.basePadding}px;
  left: ${layouts.basePadding}px;
  opacity: ${(props) => (props.isFocus ? 1 : 0)};
  width: inherit;
  height: ${layouts.articleOpenHeight}px;
  background: #fff;
  border: 2px solid ${colors.themeColor};
  box-shadow: 1px 0px ${layouts.baseShadow * reduceShadow}px 0px ${layouts.articleShadowColor};
  border-radius: 10px;
  transition-property: opacity, transform, height;
  transition-duration: ${(props) => (props.isFocus ? '300ms, 300ms, 0ms' : '0ms, 0ms, 0ms')};
  transform: ${(props) => (props.isFocus ? `scale(${layouts.articleOpenScale}) translate(0, 12px)` : 'scale(1) translate(0, 0)')};
  cursor: pointer;
  .Title {
    display: flex;
    ${(props) => (props.marqueeDuration ? marqueeCss : '')};
    text-decoration: none;
  }
  .LiveCnt {
    text-decoration: none;
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
  height: ${layouts.articleHeaderHeight}px;
  white-space: nowrap;
  transform: translate(0px, 0px);
  .Title {
    position: absolute;
    left: 40px;
    flex: 1 1 calc(100% - ${layouts.articleHeaderSideSize * 2}px);
    justify-content: center;
    width: calc(100% - ${layouts.articleHeaderSideSize * 2}px);
    max-width: calc(100% - ${layouts.articleHeaderSideSize * 2}px);
    text-align: center;
    color: ${colors.fontColor};
    text-decoration: none;
  }
`;

const Description = styled.div`
  overflow: hidden;
  margin: 8px 15px 24px;
  line-height: 26px;
  font-size: 14px;
  font-weight: 200;
  letter-spacing: 2px;
  text-decoration: none;
`;

const LiveCntWrap = styled.div`
  position: absolute;
  right: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 8px 0 4px;
  background-color: rgba(255, 255, 255, 1);
`;

const FaviconWrap = styled.div`
  position: absolute;
  left: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 8px;
  background-color: rgba(255, 255, 255, 1);
`;
