import { css } from '@emotion/react';
import React, { createRef } from 'react';

import Spinner from 'components/atomicDesign/atoms/Spinner';
import { colors, layouts } from 'components/styles';
import animations from 'components/styles/animations';

import { liMargin } from '../';

export const todayLabel = 'Today';
export const yesterdayLabel = 'Yesterday';
export const notifTipMargin = layouts.doubleMargin;
export const notifTipPaddingColumn = layouts.basePadding;
export const notifTipHeight = layouts.blockHeight / 2;
export const notifTipScrollReduce = notifTipPaddingColumn; //notifTipHeight + notifTipPaddingColumn + notifTipMargin;

type TimeMarkerProps = {
  label: string;
  className?: string;
  isOpenFooter?: boolean;
  isMediaCh?: boolean;
  isLoading?: boolean;
  isFixed?: boolean;
  domsTimelines?: any;
};

const TimeMarker: React.FC<TimeMarkerProps> = ({
  label,
  className = 'TimeMarker',
  isMediaCh = false,
  isLoading = false,
  isFixed = false,
  domsTimelines,
}) => {
  if (isMediaCh) return null;
  const timeCss = isFixed ? styles.fixTimeMerker : styles.timeMerker;
  if (isLoading || label === '') {
    return (
      <time css={timeCss}>
        <Spinner size="20" />
      </time>
    );
  }

  if (domsTimelines && domsTimelines[label] === undefined) {
    return (
      <time className={className} css={timeCss}>
        {label}
      </time>
    );
  }

  return (
    <time className={className} css={timeCss}>
      {label}
    </time>
  );
};

type NewPostProps = {
  isOpenNewPost: boolean;
  isOpenFooter: boolean;
};

const NewPost: React.FC<NewPostProps> = ({ isOpenNewPost, isOpenFooter }) => {
  return <div css={styles.newPost(isOpenNewPost, isOpenFooter)}>NEW POST</div>;
};

export default {
  TimeMarker,
  NewPost,
};
const width = 150;
const fixTimeMerkerMargin = 20;
const timeMerkerMargin = layouts.baseMargin;
const notifTip = (margin: number) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${width}px;
  min-width: ${width}px;
  max-width: ${width}px;
  height: ${notifTipHeight}px;
  padding: ${notifTipPaddingColumn}px ${layouts.quadPadding}px;
  margin: ${margin}px auto;
  color: ${colors.whiteColor};
  background: ${colors.notifTipColor};
  border-radius: ${layouts.borderRadius * 2}px;
  white-space: nowrap;
  transition: ${animations.transitionDuration}ms;
  transform: translate(0px, 0px);
  user-select: none;
`;

export const fixTimeMarkerTop = 60;
const styles = {
  fixTimeMerker: css`
    position: fixed;
    top: ${fixTimeMarkerTop}px;
    left: calc(50% - ${width / 2}px);
    ${notifTip(fixTimeMerkerMargin)};
  `,
  timeMerker: notifTip(timeMerkerMargin),
  newPost: (isOpenNewPost: boolean, isOpenFooter: boolean) => css`
    position: absolute;
    top: 100%;
    left: calc(50% - ${width / 2}px);
    ${notifTip(timeMerkerMargin)};
    transform: translate(0px, ${getNewPostTranslateY(isOpenNewPost, isOpenFooter)}px);
  `,
};

const getNewPostTranslateY = (isOpenNewPost: boolean, isOpenFooter: boolean) => {
  if (isOpenNewPost) {
    if (isOpenFooter) {
      return -124;
    } else {
      return -64;
    }
  } else {
    return 0;
  }
};
