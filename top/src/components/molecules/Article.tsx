import React, { useEffect, useState, useRef } from 'react';
import styled, { css } from 'styled-components';

import Favicon from 'top/components/atoms/Favicon';
import LiveCnt from 'top/components/atoms/LiveCnt';
import OgpImage from 'top/components/atoms/OgpImage';
import P from 'top/components/atoms/P';
import Title from 'top/components/atoms/Title';
import { articleWidth, articleOpenScale, articleCloseHeight, articleOpenHeight, basePadding, baseShadow } from 'top/styles';

import androidIcon from 'assets/png/android.png';
import androidGrayIcon from 'assets/png/android_gray.png';
import appstoreIcon from 'assets/png/appstore.png';
import appstoreGrayIcon from 'assets/png/appstore_gray.png';
import facebookIcon from 'assets/png/facebook.png';
import facebbokGrayIcon from 'assets/png/facebook_gray.png';
import twitterIcon from 'assets/png/twitter.png';
import twitterGrayIcon from 'assets/png/twitter_gray.png';

const getSnsIconSrc = ({ type, visible }) => {
  switch (type) {
    case 'twitter':
      return visible ? twitterIcon : twitterGrayIcon;
    case 'facebook':
      return visible ? facebookIcon : facebbokGrayIcon;
    case 'appstore':
      return visible ? appstoreIcon : appstoreGrayIcon;
    case 'android':
      return visible ? androidIcon : androidGrayIcon;
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
  scrolling: boolean;
  setFocusIndex: React.Dispatch<React.SetStateAction<undefined | number>>;
  api: (method: any, params?: {}) => void;
};

const Component: React.FC<Props> = ({ article, index, focusIndex, scrolling, api, setFocusIndex }) => {
  const { serverMetas } = article;
  const [marqueeOn, setMarqueeOn] = useState(false);
  const detailRef = useRef(null);
  const isFocus = index === focusIndex;
  const handleOnMouseOver = () => {
    if (!scrolling) {
      setFocusIndex(index);
    }
  };

  const handleOnMouseLeave = () => {
    if (!scrolling) {
      setFocusIndex(undefined);
    }
  };

  // did mount.
  useEffect(() => {
    if (detailRef.current) {
      const detailElm = detailRef.current;
      const headerElm = detailElm.children[0];
      const titleElm = headerElm.children[1];
      setMarqueeOn(titleElm.clientWidth < titleElm.scrollWidth);
      api('onResponseChAPI', article.ch);
    }
  }, []);

  return (
    <Container>
      <Cover onMouseOver={handleOnMouseOver}>
        <Header overflowTitle={marqueeOn}>
          <Favicon src={article.favicon} className={'Favicon'} />
          <Title lv={3} className={'Title'}>
            {article.title}
          </Title>
          <LiveCnt className={'LiveCnt'}>{article.liveCnt}</LiveCnt>
        </Header>
        <OgpImage src={serverMetas['og:image']} ch={<>{article.ch}</>} />
      </Cover>
      <Detail
        ref={detailRef}
        isFocus={isFocus}
        marqueeDuration={marqueeOn ? article.title.length / 10 : 0}
        onMouseOver={handleOnMouseOver}
        onMouseLeave={handleOnMouseLeave}>
        <Header overflowTitle={marqueeOn}>
          <Favicon src={article.favicon} className={'Favicon'} />
          <Title lv={3} className={'Title'}>
            {article.title}
          </Title>
          <LiveCnt className={'LiveCnt'}>{article.liveCnt}</LiveCnt>
        </Header>
        <OgpImage src={serverMetas['og:image']} ch={<>{article.ch}</>} />
        <Description>
          <P>{serverMetas['og:description']}</P>
          <SnsLinks>
            <SnsIconImg src={getSnsIconSrc({ type: 'twitter', visible: serverMetas['twitter:site'] !== '' })} />
            <SnsIconImg src={getSnsIconSrc({ type: 'facebook', visible: serverMetas['fb:page_id'] !== '' })} />
            <SnsIconImg src={getSnsIconSrc({ type: 'appstore', visible: serverMetas['al:ios:app_store_id'] !== '' })} />
            <SnsIconImg src={getSnsIconSrc({ type: 'android', visible: serverMetas['al:android:package'] !== '' })} />
          </SnsLinks>
        </Description>
      </Detail>
    </Container>
  );
};

export default Component;

const Container = styled.div`
  width: ${articleWidth}px;
  height: 260px;
`;

type CoverPropsType = {};

const Cover = styled.div<CoverPropsType>`
  overflow: hidden;
  width: inherit;
  height: ${articleCloseHeight}px;
  background: #fff;
  box-shadow: 0px 0px ${basePadding}px 0px #ccc;
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

const Detail = styled.article<DetailPropsType>`
  z-index: 4;
  position: absolute;
  top: ${basePadding}px;
  left: ${basePadding}px;
  opacity: ${(props) => (props.isFocus ? 1 : 0)};
  width: inherit;
  height: ${articleOpenHeight}px;
  background: #fff;
  box-shadow: 0px 0px ${baseShadow}px 0px #999;
  border: ${(props) => (props.isFocus ? '0px solid rgb(79, 174, 159)' : '0px solid rgb(79, 174, 159)')};
  border-radius: 10px;
  transition-property: opacity, transform, height;
  transition-duration: 300ms, 300ms, 0ms;
  transform: ${(props) => (props.isFocus ? `scale(${articleOpenScale}) translate(0, 10px)` : 'scale(1) translate(0, 0)')};
  cursor: pointer;
  h3 {
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
  .Title3 {
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
