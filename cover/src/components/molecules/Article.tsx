import React, { useEffect, useState, useRef } from 'react';
import styled, { css } from 'styled-components';

import conf from 'common/conf';

import Favicon from 'cover/components/atoms/Favicon';
import LiveCnt from 'cover/components/atoms/LiveCnt';
import OgpImage from 'cover/components/atoms/OgpImage';
import P from 'cover/components/atoms/P';
import Title from 'cover/components/atoms/Title';
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

const getSnsIconSrc = ({ type, visible }) => {
  switch (type) {
    case 'twitter':
      return visible ? `//${conf.assetsImgPath}twitter.svg` : `//${conf.assetsImgPath}twitter_gray.svg`;
    case 'facebook':
      return visible ? `//${conf.assetsImgPath}facebook.svg` : `//${conf.assetsImgPath}facebook_gray.svg`;
    case 'appstore':
      return visible ? `//${conf.assetsImgPath}appstore.svg` : `//${conf.assetsImgPath}appstore_gray.svg`;
    case 'android':
      return visible ? `//${conf.assetsImgPath}android.svg` : `//${conf.assetsImgPath}android_gray.svg`;
  }
};

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

const Component: React.FC<Props> = ({ article, index, focusIndex, setFocusIndex }) => {
  const { serverMetas } = article;
  const [marqueeOn, setMarqueeOn] = useState(false);
  const headerRef = useRef(null);
  const isFocus = index === focusIndex;
  const handleOnMouseOver = () => {
    setFocusIndex(index);
  };

  const handleOnMouseMove = () => {
    setFocusIndex(index);
  };

  const handleOnMouseLeave = () => {
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
            <SnsLinks>
              <SnsIconImg src={getSnsIconSrc({ type: 'twitter', visible: serverMetas['twitter:site'] !== '' })} />
              <SnsIconImg src={getSnsIconSrc({ type: 'facebook', visible: serverMetas['fb:page_id'] !== '' })} />
              <SnsIconImg src={getSnsIconSrc({ type: 'appstore', visible: serverMetas['al:ios:app_store_id'] !== '' })} />
              <SnsIconImg src={getSnsIconSrc({ type: 'android', visible: serverMetas['al:android:package'] !== '' })} />
            </SnsLinks>
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

const SnsLinks = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const SnsIconImg = styled.img`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  width: 46px;
  min-width: 46px;
  max-width: 46px;
  height: 46px;
  min-height: 46px;
  max-height: 46px;
  user-select: none;
`;