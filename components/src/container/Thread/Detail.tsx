import { css } from '@emotion/react';
import React, { useState, useRef } from 'react';

import { detailModeExpand, detailModeBar, DetailModeType } from 'components/container/Thread//GlobalContext/hooks/detail/mode';
import { Props as AppProps } from 'components/container/Thread/App';
import { useGlobalContext } from 'components/container/Thread/GlobalContext';
import { Type as LayoutType } from 'components/container/Thread/GlobalContext/hooks/layout';
import { animations, layouts } from 'components/styles';
import colors from 'components/styles/colors';

import appleStore from '../../../public/apple-app-store.svg';
import facebook from '../../../public/facebook.svg';
import googlePlay from '../../../public/googlePlay.svg';
import home from '../../../public/home.svg';
import instagram from '../../../public/instagram.svg';
import mail from '../../../public/mail.svg';
import talkn from '../../../public/talkn.svg';
import twitter from '../../../public/twitter.svg';

type Props = AppProps & {
  isModal: boolean;
  handleOnClickToggleTuneModal: () => void;
};

const Component: React.FC<Props> = ({ isModal = false, state, handleOnClickToggleTuneModal }: Props) => {
  const { detailMode, layout } = useGlobalContext();
  const { threadDetail } = state;
  const { serverMetas } = threadDetail;
  const scrollXRef = useRef(null);
  const [isShowCh, setIsShowh] = useState(true);
  const [mouseOverHeader, setMouseOverHeader] = useState(false);
  const [scrollXIndex, setScrollXIndex] = useState(0);
  const handleOnClickHeader = ({ target }: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const elm = target as HTMLElement;
    if (!Array.from(elm.classList).includes('ch')) {
      setIsShowh(!isShowCh);
    }
  };

  const handleOnMouseOver = () => setMouseOverHeader(true);
  const handleOnMouseLeave = () => setMouseOverHeader(false);
  const handleOnScrollX = () => {
    if (scrollXRef.current) {
      const scrollXElm = scrollXRef.current as HTMLElement;
      const scrollLeft = Math.floor(scrollXElm.scrollLeft);
      const clientWidth = Math.floor(scrollXElm.clientWidth);

      if (scrollLeft === 0) {
        setScrollXIndex(0);
      } else if (scrollLeft === clientWidth || clientWidth - 1) {
        setScrollXIndex(1);
      }
    }
  };
  const handleOnClickTips = ({ target }: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    if (scrollXRef.current) {
      const elm = target as HTMLElement;
      const scrollXElm = scrollXRef.current as HTMLElement;
      if (elm.className === 'ogpImageTip') {
        scrollXElm.scrollTo({ left: 0, behavior: 'smooth' });
      } else if (elm.className === 'graphTip') {
        scrollXElm.scrollTo({ left: scrollXElm.offsetWidth, behavior: 'smooth' });
      }
    }
  };

  return (
    <section css={styles.container(isModal, detailMode, layout)}>
      <div css={styles.scrollY(isModal)}>
        <header
          css={styles.header(isModal, detailMode)}
          onClick={handleOnClickHeader}
          onMouseOver={handleOnMouseOver}
          onMouseLeave={handleOnMouseLeave}>
          <div ref={scrollXRef} css={styles.contents(serverMetas['og:image'], isModal, detailMode)} onScroll={handleOnScrollX}>
            <div className="ogpImage" />
            <div className="graph" />
          </div>
          <div className="ch" css={styles.ch(isModal, detailMode, mouseOverHeader, isShowCh)} onClick={handleOnClickToggleTuneModal}>
            {threadDetail.ch}
          </div>
        </header>
        <div css={styles.tips(isModal, detailMode, scrollXIndex)}>
          <span className="ogpImageTip" onClick={handleOnClickTips} />
          <span className="graphTip" onClick={handleOnClickTips} />
        </div>
        <div css={styles.body(isModal, detailMode)}>
          <div css={styles.description(isModal, detailMode)}>{serverMetas['description']}</div>
          <ul css={styles.share(isModal, detailMode)}>
            <li>{getShareImg('twitter', threadDetail)}</li>
            <li>{getShareImg('facebook', threadDetail)}</li>
            <li>{getShareImg('instagram', threadDetail)}</li>
            <li>{getShareImg('talkn', threadDetail)}</li>
            <li>{getShareImg('appleStore', threadDetail)}</li>
            <li>{getShareImg('googlePlay', threadDetail)}</li>
            <li>{getShareImg('home', threadDetail)}</li>
            <li>{getShareImg('mail', threadDetail)}</li>
          </ul>
          <div css={styles.contentType(isModal, detailMode)}>
            <label>{threadDetail.contentType && threadDetail.contentType.replace(/;.*$/, '')}</label>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Component;

const tipSize = 16;
const styles = {
  container: (isModal: boolean, detailMode: DetailModeType, layout: LayoutType) => css`
    overflow: hidden;
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-start;
    justify-content: flex-start;
    ${getContainerWidth(isModal, detailMode, layout)};
    height: 100%;
    padding-top: ${isModal ? 0 : layouts.appHeaderHeight}px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: ${getBorderRadius(isModal)};
    transition: width ${animations.transitionDuration}ms, min-width ${animations.transitionDuration}ms,
      background ${animations.transitionDuration}ms;
    transform: translate(0px, 0px);
    :hover {
      background: rgba(255, 255, 255, 1);
    }
  `,
  scrollY: (isModal: boolean) => css`
    overflow-x: hidden;
    overflow-y: scroll;
    width: 100%;
    min-width: 100%;
    height: 100%;
    border-left: ${isModal ? 0 : 1}px solid ${colors.borderColor};
  `,
  header: (isModal: boolean, detailMode: DetailModeType) => css`
    overflow: hidden;
    width: 100%;
    min-width: 100%;
    ${getHeaderHeights(isModal, detailMode)};
    border-bottom: 1px solid ${colors.borderColor};
    transition: height ${animations.transitionDuration}ms, min-height ${animations.transitionDuration}ms;
    transform: translate(0px, 0px);
  `,
  contents: (image, isModal: boolean, detailMode: DetailModeType) => css`
    overflow-x: scroll;
    overflow-y: hidden;
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-start;
    justify-content: flex-start;
    width: inherit;
    height: inherit;
    white-space: nowrap;
    scroll-snap-type: x mandatory;
    transition: transform ${animations.transitionDuration}ms;
    transform: translate(0px, 0px);
    :hover {
      transform: translate(0px, 0px) scale(1.06);
    }
    .ogpImage,
    .graph {
      width: 100%;
      min-width: 100%;
      height: 100%;
      scroll-snap-align: start;
    }
    .ogpImage {
      background-size: cover;
      background-image: url(${image});
      background-position: center;
    }
  `,
  ch: (isModal: boolean, detailMode: DetailModeType, mouseOverHeader: boolean, isShowCh: boolean) => css`
    display: ${detailMode === detailModeExpand || isModal ? 'block' : 'none'};
    overflow-x: scroll;
    overflow-y: hidden;
    position: absolute;
    bottom: 0;
    right: 0;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    max-width: 96%;
    max-height: 74px;
    padding: ${isModal ? '0px 8px 0px 24px' : '6px 8px 8px 24px'};
    margin: ${layouts.doubleMargin}px 0 ${isModal ? layouts.doubleMargin : layouts.tripleMargin}px ${layouts.doubleMargin}px;
    background: rgba(0, 0, 0, ${mouseOverHeader ? 0.6 : 0.4});
    color: rgb(255, 255, 255);
    border-radius: 30px 0 0 30px;
    line-height: 30px;
    letter-spacing: 1px;
    text-align: right;
    font-size: 75%;
    opacity: ${isShowCh ? 1 : 0};
    word-break: break-word;
    white-space: ${isModal ? 'nowrap' : 'break-spaces'};
    transition: box-shadow ${animations.transitionDuration}ms, opacity ${animations.transitionDuration}ms,
      background ${animations.transitionDuration}ms;
    cursor: pointer;
    :hover {
      box-shadow: 0px 3px 3px 0px rgb(0, 0, 0, 0.4);
    }
  `,
  tips: (isModal: boolean, detailMode: DetailModeType, scrollXIndex: number) => {
    const tipsSize = getTipsSize(isModal, detailMode);
    return css`
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: center;
      width: 100%;
      gap: ${tipsSize}px;
      margin: ${layouts.doubleMargin}px auto;
      transition: gap ${animations.transitionDuration}ms;
      .ogpImageTip,
      .graphTip {
        width: ${tipsSize}px;
        min-width: ${tipsSize}px;
        max-width: ${tipsSize}px;
        height: ${tipsSize}px;
        min-height: ${tipsSize}px;
        max-height: ${tipsSize}px;
        border: 1px solid rgba(200, 200, 200, 1);
        border-radius: 20px;
        cursor: pointer;
        transition: width ${animations.transitionDuration}ms, min-width ${animations.transitionDuration}ms,
          max-width ${animations.transitionDuration}ms, height ${animations.transitionDuration}ms,
          min-height ${animations.transitionDuration}ms, max-height ${animations.transitionDuration}ms,
          background ${animations.transitionDuration}ms;
        :hover {
          background: rgba(220, 220, 220, 1);
        }
      }
      .ogpImageTip {
        background: ${scrollXIndex === 0 ? 'rgba(200, 200, 200, 0.9)' : 'rgba(255, 255, 255, 0.9)'};
      }
      .graphTip {
        background: ${scrollXIndex === 1 ? 'rgba(200, 200, 200, 0.9)' : 'rgba(255, 255, 255, 0.9)'};
      }
    `;
  },
  body: (isModal: boolean, detailMode: DetailModeType) => css`
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: flex-start;
    padding: 0 ${getBodyPaddingSide(isModal, detailMode)}px ${detailMode === detailModeBar ? layouts.basePadding : layouts.doublePadding}px;
    white-space: initial;
    letter-spacing: 3px;
    line-height: 150%;
  `,
  description: (isModal: boolean, detailMode: DetailModeType) => css`
    display: ${getDescriptionDisplay(isModal, detailMode)};
  `,
  share: (isModal: boolean, detailMode: DetailModeType) => css`
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: ${detailMode === detailModeBar ? 'center' : 'space-between'};
    width: 100%;
    padding: 0;
    margin: 0;
    list-style: none;
    li {
      flex: 1 1 25%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 12px 12px 12px 14px;
      img {
        cursor: pointer;
      }
    }
  `,
  contentType: (isModal: boolean, detailMode: DetailModeType) => css`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    margin: ${layouts.doublePadding}px;
    label {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: ${layouts.basePadding}px ${getContentTypePaddingSide(isModal, detailMode)}px;
      font-size: ${detailMode === detailModeBar ? 30 : 100}%;
      white-space: break-spaces;
      word-break: break-word;
      letter-spacing: 1px;
      line-height: 20px;
      text-align: center;
      background: ${colors.baseColor};
      color: rgb(255, 255, 255);
      border-radius: 20px;
    }
  `,
};

const getDescriptionDisplay = (isModal: boolean, detailMode: DetailModeType) => {
  if (isModal) {
    return 'flex';
  } else {
    return detailMode === detailModeExpand ? 'flex' : 'none';
  }
};

const getBodyPaddingSide = (isModal: boolean, detailMode: DetailModeType) => {
  if (isModal) {
    return layouts.doublePadding;
  } else {
    return detailMode === detailModeBar ? layouts.basePadding : layouts.doublePadding;
  }
};

const getContentTypePaddingSide = (isModal: boolean, detailMode: DetailModeType) => {
  if (isModal) {
    return layouts.doublePadding;
  } else {
    return detailMode === detailModeBar ? layouts.basePadding : layouts.triplePadding;
  }
};

const getContainerWidth = (isModal: boolean, detailMode: DetailModeType, layout: LayoutType) => {
  if (isModal) {
    return css`
      width: 100%;
      min-width: ${layouts.appMinWidth}px;
    `;
  } else {
    switch (detailMode) {
      default:
      case detailModeExpand:
        if (layout.isTabLayout) {
          return css`
            width: 100%;
            min-width: ${layouts.appMinWidth}px;
          `;
        } else {
          return css`
            width: 30%;
          `;
        }
      case detailModeBar:
        return css`
          width: ${layouts.appMinWidth / 4}px;
          min-width: ${layouts.appMinWidth / 4}px;
        `;
    }
  }
};

const getBorderRadius = (isModal: boolean) => {
  if (isModal) {
    return `0`;
  } else {
    return `0`;
  }
};

const getHeaderHeights = (isModal: boolean, detailMode: DetailModeType) => {
  if (isModal) {
    return css`
      height: 100%;
      min-height: 140px;
      max-height: 220px;
    `;
  } else {
    switch (detailMode) {
      default:
      case detailModeExpand:
        return css`
          height: 275px;
          min-height: 275px;
        `;
      case detailModeBar:
        return css`
          height: 80px;
          min-height: 80px;
        `;
    }
  }
};

const getTipsSize = (isModal: boolean, detailMode: DetailModeType) => {
  if (isModal) {
    return tipSize;
  } else {
    switch (detailMode) {
      default:
      case detailModeExpand:
        return tipSize;
      case detailModeBar:
        return tipSize / 2;
    }
  }
};

const getShareImg = (shareType: string, threadDetail: any) => {
  const serverMetas = threadDetail;
  let src;
  let width = 64;
  let height = 64;
  let filter = 'none';
  switch (shareType) {
    case 'twitter':
      src = twitter;
      filter = serverMetas['twitter:site'] === '' ? 'grayscale(1)' : 'none';
      break;
    case 'facebook':
      src = facebook;
      filter = serverMetas['fb:page_id'] === '' ? 'grayscale(1)' : 'none';
      break;
    case 'instagram':
      src = instagram;
      filter = serverMetas['fb:page_id'] === '' ? 'grayscale(1)' : 'none';
      break;
    case 'talkn':
      src = talkn;
      width = 56;
      break;
    case 'appleStore':
      src = appleStore;
      filter = serverMetas['al:ios:url'] === '' ? 'grayscale(1)' : 'none';
      break;
    case 'googlePlay':
      src = googlePlay;
      height = 48;
      filter = serverMetas['al:android:url'] === '' ? 'grayscale(1)' : 'none';
      break;
    case 'home':
      src = home;
      width = 48;
      height = 64;
      filter = threadDetail.contentType === 'talkn/ch' ? 'grayscale(1)' : 'none';
      break;
    case 'mail':
      src = mail;
      width = 48;
      height = 48;
      filter = 'grayscale(1)';
      break;
  }
  return <img src={src} alt={shareType} width={width} style={{ filter }} />;
};
