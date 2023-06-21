import { css } from '@emotion/react';
import { Chart as ChartJS, ChartData, ChartOptions, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import React, { useState, useRef } from 'react';
import { Radar, ChartProps } from 'react-chartjs-2';

import Emotions from 'common/emotions/index';

import { detailModeExpand, detailModeBar, DetailModeType } from 'components/container/Thread//GlobalContext/hooks/detail/transformMode';
import { animations, layouts } from 'components/styles';
import colors from 'components/styles/colors';

import { getBodyPaddingSide } from './';

import appleStore from '../../../../public/apple-app-store.svg';
import facebook from '../../../../public/facebook.svg';
import googlePlay from '../../../../public/googlePlay.svg';
import home from '../../../../public/home.svg';
import instagram from '../../../../public/instagram.svg';
import mail from '../../../../public/mail.svg';
import talkn from '../../../../public/talkn.svg';
import twitter from '../../../../public/twitter.svg';

// 必要なコントローラー、スケール、要素を登録
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const barWidth = layouts.appMinWidth / 4;
const calcRate = 1000000;
const emotions = new Emotions();
const russellSimple = new emotions.model.RussellSimple();

const getGraphDatas = (threadDetail) => {
  const emotionModelKey = Emotions.defaultModelKey;

  const { emotions } = threadDetail;
  const emotionKeys = emotions && emotions[emotionModelKey] ? Object.keys(emotions[emotionModelKey]) : [];
  const log = false;
  let graphType = 'within5';
  let totalNum = 0;
  let maxNum = 0;
  let graphMaxNum = 0;
  let rateMax = 0;
  let rateOne = 0;
  let rateMap = {};
  let graphRateMap = [];
  let data = [];

  // 合計数と各指標の数値を取得
  emotionKeys.forEach((emotionKey) => {
    const num = emotions[emotionModelKey][emotionKey];
    if (maxNum < num) maxNum = num;
    if (num > 5) graphType = 'over5';
    rateMap[emotionKey] = { num, rate: 0, graphNum: 0 };
    totalNum = totalNum + num;
  });

  if (graphType === 'within5') {
    emotionKeys.forEach((emotionKey) => {
      const num = emotions[emotionModelKey][emotionKey];
      data.push(num);
    });
  } else {
    // 合計数と各指標の数値の割合を算出
    emotionKeys.forEach((emotionKey) => {
      const { num } = rateMap[emotionKey];
      rateMap[emotionKey].rate = Math.round((num / totalNum) * calcRate) / calcRate;
    });

    // グラフの表示最上値を取得
    graphMaxNum = Emotions.getGraphMaxNum(emotionModelKey, totalNum, true);
    rateMax = Math.round((maxNum / totalNum) * calcRate) / calcRate;
    rateOne = rateMax / graphMaxNum;
    rateOne = Math.round(rateOne * calcRate) / calcRate;

    for (
      let ratePointLimit = rateOne;
      ratePointLimit <= rateMax;
      ratePointLimit = Math.round((ratePointLimit + rateOne) * calcRate) / calcRate
    ) {
      graphRateMap.push(ratePointLimit);
    }

    if (graphRateMap.length < graphMaxNum) {
      graphRateMap.push(rateMax);
    }

    emotionKeys.forEach((emotionKey) => {
      const { rate } = rateMap[emotionKey];
      let assignedFlg = false;
      for (let graphIndex = 0; graphIndex < graphMaxNum; graphIndex++) {
        const graphRate = graphRateMap[graphIndex];

        if (rate < graphRate) {
          rateMap[emotionKey].graphNum = graphIndex;
          data.push(graphIndex);
          assignedFlg = true;
          break;
        }

        if (graphIndex === graphMaxNum - 1) {
          if (!assignedFlg) {
            data.push(graphIndex);
          }
        }
      }
    });
  }

  if (log) {
    console.log('RESULT @@@@@@@@@@@@@@@@@@@@@ ' + graphType);
    console.log('totalNum ' + totalNum);
    console.log('maxNum ' + maxNum);
    console.log('graphMaxNum ' + graphMaxNum);
    console.log('rateMax ' + rateMax);
    console.log('rateOne ' + rateOne);
    console.log('rateMap ');
    console.log(rateMap);
    console.log('graphRateMap ');
    console.log(graphRateMap);
    console.log('russellSimple ');
    console.log(emotions.russellSimple);
    console.log('data ');
    console.log(data);
  }

  return { emotionModelKey, totalNum, data };
};

type Props = {
  isModal: boolean;
  detailTransformMode: DetailModeType;
  threadDetail: any;
  handleOnClickToggleTuneModal: () => void;
};

const Component: React.FC<Props> = ({ isModal, detailTransformMode, threadDetail, handleOnClickToggleTuneModal }) => {
  const scrollXRef = useRef(null);
  const [isShowCh, setIsShowh] = useState(true);
  const [mouseOverHeader, setMouseOverHeader] = useState(false);
  const [scrollXIndex, setScrollXIndex] = useState(0);
  const { emotionModelKey, totalNum, data } = getGraphDatas(threadDetail);
  const { serverMetas } = threadDetail;

  const chartData: ChartData<'radar', number[], string> = {
    labels: ['Excite', 'Happy', 'Joy', 'Relax', 'Slack', 'Melancholy', 'Anger', 'Worry&Fear'],
    datasets: [
      {
        fill: true,
        data,
        backgroundColor: 'rgba(59,154,139,0.2)',
        borderColor: 'rgba(59,154,139,1)',
        borderWidth: 1,

        pointBackgroundColor: 'rgba(59,154,139,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(59,154,139,1)',
      },
    ],
  };

  const chartOptions: ChartProps<'radar', number[], string>['options'] = {
    scales: {
      r: {
        min: 0,
        max: 5,
        pointLabels: {
          display: detailTransformMode === detailModeExpand,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    animation: {
      duration: 300,
    },
  };

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
    <>
      <header
        css={styles.header(isModal, detailTransformMode)}
        onClick={handleOnClickHeader}
        onMouseOver={handleOnMouseOver}
        onMouseLeave={handleOnMouseLeave}>
        <div ref={scrollXRef} css={styles.contents(serverMetas['og:image'], isModal, detailTransformMode)} onScroll={handleOnScrollX}>
          <div className="ogpImage" />
          <div className="graph">
            <Radar data={chartData} options={chartOptions} />
          </div>
        </div>
        <div className="ch" css={styles.ch(isModal, detailTransformMode, mouseOverHeader, isShowCh)} onClick={handleOnClickToggleTuneModal}>
          {threadDetail.ch}
        </div>
      </header>
      <div css={styles.tips(isModal, detailTransformMode, scrollXIndex)}>
        <span className="ogpImageTip" onClick={handleOnClickTips} />
        <span className="graphTip" onClick={handleOnClickTips} />
      </div>
      <div css={styles.body(isModal, detailTransformMode)}>
        <div css={styles.description(isModal, detailTransformMode)}>{serverMetas['description']}</div>
        <ul css={styles.share(isModal, detailTransformMode)}>
          <li>{getShareImg('twitter', threadDetail)}</li>
          <li>{getShareImg('facebook', threadDetail)}</li>
          <li>{getShareImg('instagram', threadDetail)}</li>
          <li>{getShareImg('talkn', threadDetail)}</li>
          <li>{getShareImg('appleStore', threadDetail)}</li>
          <li>{getShareImg('googlePlay', threadDetail)}</li>
          <li>{getShareImg('home', threadDetail)}</li>
          <li>{getShareImg('mail', threadDetail)}</li>
        </ul>
        <div css={styles.contentType(isModal, detailTransformMode)}>
          <label>{threadDetail.contentType && threadDetail.contentType.replace(/;.*$/, '')}</label>
        </div>
      </div>
    </>
  );
};

export default Component;

const tipSize = 16;

const styles = {
  header: (isModal: boolean, detailTransformMode: DetailModeType) => css`
    overflow: hidden;
    width: 100%;
    min-width: 100%;
    ${getHeaderHeights(isModal, detailTransformMode)};
    border-bottom: 1px solid ${colors.borderColor};
    transition: height ${animations.transitionDuration}ms, min-height ${animations.transitionDuration}ms;
    transform: translate(0px, 0px);
  `,
  contents: (image, isModal: boolean, detailTransformMode: DetailModeType) => css`
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
      display: flex;
      align-items: center;
      justify-content: center;
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
  ch: (isModal: boolean, detailTransformMode: DetailModeType, mouseOverHeader: boolean, isShowCh: boolean) => css`
    display: ${detailTransformMode === detailModeExpand || isModal ? 'block' : 'none'};
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
  tips: (isModal: boolean, detailTransformMode: DetailModeType, scrollXIndex: number) => {
    const tipsSize = getTipsSize(isModal, detailTransformMode);
    return css`
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: center;
      width: 100%;
      gap: ${tipsSize}px;
      margin: ${layouts.tripleMargin}px auto;
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
  body: (isModal: boolean, detailTransformMode: DetailModeType) => css`
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: flex-start;
    padding: 0 ${getBodyPaddingSide(isModal, detailTransformMode)}px
      ${detailTransformMode === detailModeBar ? layouts.basePadding : layouts.doublePadding}px;
    white-space: initial;
    letter-spacing: 3px;
    line-height: 175%;
    gap: ${layouts.doubleSize}px;
  `,
  description: (isModal: boolean, detailTransformMode: DetailModeType) => css`
    display: ${getDescriptionDisplay(isModal, detailTransformMode)};
  `,
  share: (isModal: boolean, detailTransformMode: DetailModeType) => css`
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: ${detailTransformMode === detailModeBar ? 'center' : 'space-between'};
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
  contentType: (isModal: boolean, detailTransformMode: DetailModeType) => css`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    margin: ${layouts.doublePadding}px;
    label {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: ${layouts.basePadding * 1.5}px ${getContentTypePaddingSide(isModal, detailTransformMode)}px;
      font-size: ${detailTransformMode === detailModeBar ? 30 : 100}%;
      white-space: break-spaces;
      word-break: break-word;
      letter-spacing: 1px;
      line-height: 20px;
      text-align: center;
      background: ${colors.baseColor};
      color: rgb(255, 255, 255);
      border-radius: 30px;
    }
  `,
  poweredBy: () => css`
    width: 100%;
    text-align: center;
    color: ${colors.fontColor};
    margin: ${layouts.blockHeight / 2}px 0 ${layouts.blockHeight / 2}px;
    letter-spacing: 1px;
  `,
};

const getDescriptionDisplay = (isModal: boolean, detailTransformMode: DetailModeType) => {
  if (isModal) {
    return 'flex';
  } else {
    return detailTransformMode === detailModeExpand ? 'flex' : 'none';
  }
};

const getContentTypePaddingSide = (isModal: boolean, detailTransformMode: DetailModeType) => {
  if (isModal) {
    return layouts.doublePadding;
  } else {
    return detailTransformMode === detailModeBar ? layouts.basePadding : layouts.triplePadding;
  }
};

const getHeaderHeights = (isModal: boolean, detailTransformMode: DetailModeType) => {
  if (isModal) {
    return css`
      height: 100%;
      min-height: 140px;
      max-height: 220px;
    `;
  } else {
    switch (detailTransformMode) {
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

const getTipsSize = (isModal: boolean, detailTransformMode: DetailModeType) => {
  if (isModal) {
    return tipSize;
  } else {
    switch (detailTransformMode) {
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
