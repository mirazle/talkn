import { css } from '@emotion/react';
import React, { useEffect, useState } from 'react';

import Thread from 'api/store/Thread';

import { Props as AppProps } from 'components/container/Thread/App';
import { useGlobalContext, actions } from 'components/container/Thread/GlobalContext';
import layouts from 'components/styles/layouts';

type Props = AppProps & {
  ch: string;
  findType: string;
};

const Component: React.FC<Props> = ({ ch, findType, state }) => {
  const { bools, layout } = useGlobalContext();
  const { audios, videos } = state.thread;

  if (findType === Thread.findTypeMusic) {
    return (
      <div css={styles.container(layout.isSpLayout, bools.screenScrolling, bools.openMenu)}>
        <audio src={audios[0] && audios[0].src} controls />
      </div>
    );
  }
  if (findType === Thread.findTypeVideo) {
    return (
      <div css={styles.container(layout.isSpLayout, bools.screenScrolling, bools.openMenu)}>
        <video src={videos[0] && videos[0].src} controls />
      </div>
    );
  }
  return null;
};

export default Component;

const styles = {
  container: (isSpLayout: boolean, screenScrolling: boolean, openMenu: boolean) => css`
    overflow: visible;
    position: fixed;
    top: ${layouts.appHeaderHeight + 16}px;
    flex: 1 1 auto;
    display: block;
    width: 300px;
    min-width: 300px;
    max-width: 300px;
    height: 54px;
    background: rgba(240, 240, 240, 1);
    white-space: nowrap;
    word-break: keep-all;
    border-radius: ${isSpLayout && openMenu ? '30px 0px 0px 30px' : '30px 30px 30px 30px'};
    transform: translate(0px, 0px);
    audio,
    video {
      position: fixed;
      top: 0;
      left: 0;
      flex: 1 1 auto;
      display: ${screenScrolling ? 'block' : 'flex'};
      width: 100%;
      min-width: 300px;
      max-width: unset;
      height: 54px;
    }
  `,
};
