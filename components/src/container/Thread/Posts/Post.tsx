import { css } from '@emotion/react';
import React, { useEffect, useState, useRef } from 'react';
import TimeAgo from 'react-timeago';

import Emotions from 'common/emotions/index';
import util from 'common/util';

import { actions, useGlobalContext } from 'components/container/Thread/GlobalContext';
import { colors, emotions, getRgba, layouts } from 'components/styles';
import animations from 'components/styles/animations';

import Favicon from '../Favicon';

const emotionCoverTypes = new Emotions();

export const getStampLabel = (stampId: string) => {
  return emotionCoverTypes.belongCoverTypes[stampId] ? emotionCoverTypes.belongCoverTypes[stampId] : 'No';
};

type PostPropsType = {
  _id: string;
  protocol: string;
  ch: string;
  chs: string[];
  layer: number;
  uid: string;
  utype: string;
  favicon: string;
  title: string;
  post: string;
  stampId: string;
  data: string;
  findType: string;
  currentTime: string;
  updateTime: string;
  dispFlg: boolean;
  createTime: string;
  __v: string;
};

type PostProps = {
  state: any;
  post: any;
  findType: string;
  childLayerCnt: number;
};

const Component: React.FC<PostProps> = ({ state, post }) => {
  const { app, ui } = state;
  const { doms, setAction } = useGlobalContext();
  const [duration, setDuration] = useState(0);
  const containerRef = useRef(null);

  const handleOnClick = () => {
    setAction(actions.apiRequestChangeThreadDetail, { ch: post.ch });
  };
  const time = () => {
    if (app.isMediaCh) {
      const dispCurrentTime = String(post.currentTime).split('.')[0];
      return <time>{dispCurrentTime} sec.</time>;
    } else {
      return (
        <TimeAgo date={post.updateTime} formatter={(value, unit, suffix) => util.timeAgoFormatter(value, unit, suffix, ui.extensionMode)} />
      );
    }
  };

  useEffect(() => {
    emotions.useMarqueeContainer(containerRef, post.title, setDuration);
  }, [post.title, containerRef]);

  return (
    <section ref={containerRef} css={[styles.container, emotions.marqueeContainer(duration)]}>
      <div css={styles.faviconWrap}>
        <Favicon icon={post.favicon} />
      </div>
      <div css={styles.content}>
        <div css={styles.contentUpper}>
          <span className="title marquee">{post.title}</span>
          {time()}
        </div>
        <div css={styles.contentBottom(post.stampId)} onClick={handleOnClick}>
          <div className="post">{post.post}</div>
          {Number(post.stampId) !== 0 && <div className="stampLabel">{getStampLabel(post.stampId)}</div>}
        </div>
      </div>
    </section>
  );
};

export default Component;

const faviconSize = 64;
const margin = 16;
const styles = {
  container: css`
    display: flex;
    align-items: flex-start;
    width: inherit;
    transition: transform ${animations.transitionDuration}ms;
    transform: scale(1);
    cursor: pointer;
    :hover {
      transform: scale(1.0175);
    }

    @media (max-width: ${layouts.breakTabWidth}px) {
      :hover {
        transform: scale(1.025);
      }
    }
    @media (max-width: ${layouts.breakSpWidth}px) {
      :hover {
        transform: scale(1.05);
      }
    }
  `,
  faviconWrap: css`
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 ${faviconSize}px;
  `,
  content: css`
    display: flex;
    flex-flow: column nowrap;
    width: calc(100% - ${faviconSize + margin}px);
    margin-right: ${margin}px;
    color: ${colors.whiteColor};
  `,
  contentUpper: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 ${layouts.basePadding}px ${layouts.basePadding / 2}px;
    color: ${colors.blackColor};
    letter-spacing: 1.5px;
    color: ${colors.fontColor};
    .title {
      overflow: hidden;
      width: 100%;
      max-width: calc(100% - 80px);
      user-select: none;
    }
    time {
      font-size: 75%;
      user-select: none;
    }
  `,
  contentBottom: (stampId: string) => {
    const layoutStamp = css`
      display: flex;
      align-items: center;
      justify-content: center;
    `;

    const layoutText = css`
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
    `;

    const layout = stampId ? layoutStamp : layoutText;

    const content = css`
      padding: ${layouts.doublePadding + 4}px ${layouts.quadPadding}px;
      background: ${colors.themeColor};
      border-radius: ${layouts.borderRadius}px;
      letter-spacing: 1.5px;
      color: ${colors.whiteColor};
      transform: translate(0px, 0px);

      .post {
        font-size: ${stampId ? 400 : 100}%;
        user-select: none;
      }
      .stampLabel {
        position: absolute;
        bottom: 0;
        right: 0;
        padding: 4px 24px;
        margin: 0 24px;
        border-radius: 8px 8px 0 0;
        background: ${getRgba('0,0,0', '0.3')};
        color: ${colors.whiteColor};
        font-size: 75%;
        user-select: none;
      }
    `;
    return [layout, content];
  },
};
