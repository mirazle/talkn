import { css } from '@emotion/react';
import React, { useEffect, useMemo, useRef } from 'react';

import DateHelper from 'common/DateHelper';

import { Props as AppProps } from 'components/container/Thread/App';
import { actions, useGlobalContext } from 'components/container/Thread/GlobalContext';
import { colors, layouts } from 'components/styles';
import animations from 'components/styles/animations';

import FixedTools from './FixedTools';
import NotifTip, { todayLabel, yesterdayLabel } from './FixedTools/NotifTip';
import Post from './Post';

type Props = {
  handleOnClickToggleTuneModal: () => void;
  screenRef: any;
  postsRef: any;
  postTextareaRef: any;
} & AppProps;

const NoPostHelloFriend: React.FC = () => (
  <li css={styles.noPost}>
    <div>Hello, Friend😁</div>
    <div>Let's make the first post📩</div>
  </li>
);

const Component: React.FC<Props> = ({
  bootOption,
  api,
  state,
  root,
  postsRef,
  screenRef,
  postTextareaRef,
  handleOnClickToggleTuneModal,
}) => {
  const { bools, doms, postsTimeline, setScrollTop } = useGlobalContext();
  const handleOnScroll = ({ target }: React.UIEvent<HTMLElement, UIEvent>) => {
    const postsOlElm = target as HTMLElement;
    setScrollTop(postsOlElm.scrollTop);
  };

  // TODO: refが/のPostsが取得されている(refsのメモリーは1画面1reactっぽい)
  return (
    <div className={'Posts'} css={styles.container}>
      <ol className={`PostsOl ch:${state.app.rootCh}`} css={styles.ol(bools.openFooter)} ref={postsRef} onScroll={handleOnScroll}>
        {useMemo(() => getTimelinePostList(bools.loading, postsTimeline, doms.timelines, state), [postsTimeline, bools.loading])}
      </ol>

      <FixedTools
        bootOption={bootOption}
        screenRef={screenRef}
        postsRef={postsRef}
        postTextareaRef={postTextareaRef}
        api={api}
        state={state}
        root={root}
        handleOnClickToggleTuneModal={handleOnClickToggleTuneModal}
      />
    </div>
  );
};

export default Component;

const getTimelinePostList = (isLoading, postsTimeline, domsTimelines, state) => {
  const { app, thread } = state;
  const dispPosts = [];
  const postCnt = postsTimeline.length;
  const nowDate = DateHelper.getNowYmdhis();
  let beforeDiffDay: number = 0;

  // Add time marker.
  for (let i = 0; i < postCnt; i++) {
    let timeLabel = '';
    const post = postsTimeline[i];
    const postYmdhis = DateHelper.getMongoYmdhis(post.createTime);
    const diffDay = DateHelper.getDiffDay(nowDate, postYmdhis);

    if (!app.isMediaCh) {
      const isTop = i === 0;
      const isDispTimeMarker = isTop ? true : beforeDiffDay !== diffDay;
      beforeDiffDay = diffDay;
      if (isDispTimeMarker) {
        switch (diffDay) {
          case 0:
            timeLabel = todayLabel;
            break;
          case 1:
            timeLabel = yesterdayLabel;
            break;
          default:
            timeLabel = `(${postYmdhis.Day})${postYmdhis.M}/${postYmdhis.D}`;
            break;
        }

        dispPosts.push(
          <li key={`${timeLabel}_${i}`}>
            <NotifTip.TimeMarker domsTimelines={domsTimelines} label={timeLabel} isMediaCh={app.isMediaCh} />
          </li>
        );
      }
    }

    dispPosts.push(
      <li key={`${post._id}_${i}`} data-id={post._id}>
        <Post state={state} post={post} findType={thread.findType} childLayerCnt={post.layer - thread.layer} />
      </li>
    );
  }

  if (dispPosts.length === 0) {
    if (!isLoading) {
      dispPosts.push(<NoPostHelloFriend key={`NoPostHelloFriend`} />);
    }
  }

  return dispPosts;
};

export const liMargin = layouts.doubleMargin;
const styles = {
  container: css`
    overflow: hidden;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: flex-start
    width: 100%;
    height: inherit;
    transform: translate(0, 0);
  `,
  ol: (isOpenFooter: boolean) => css`
    overflow: hidden scroll;
    width: 100%;
    height: fit-content;
    padding: ${layouts.blockHeight}px 0 ${layouts.doublePadding}px;
    margin: 0;
    background: ${colors.whiteColor};
    list-style: none;
    li {
      gap: 8px;
      padding: ${liMargin}px 0 0 0;
    }
    li:last-child {
      transition: margin-bottom ${animations.transitionDuration}ms;
      margin-bottom: ${isOpenFooter ? layouts.blockHeight : 0}px;
    }
  `,
  fixedToolContainer: css`
    overflow: hidden;
    display: flex;
    flex-flow: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    height: 0;
    min-height: 0;
    max-height: 0;
    transform: translate(0, 0);
  `,
  noPost: css`
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    padding: 16px !important;
    margin-top: 60px !important;
    margin-right: 24px;
    margin-left: 24px;
    background: ${colors.themeColor};
    border-radius: ${layouts.borderRadius}px;
    color: ${colors.whiteColor};
  `,
};
