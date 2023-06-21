import { css } from '@emotion/react';
import React, { useState } from 'react';

import { detailModeExpand, detailModeBar, DetailModeType } from 'components/container/Thread//GlobalContext/hooks/detail/transformMode';
import { Props as AppProps } from 'components/container/Thread/App';
import { useGlobalContext } from 'components/container/Thread/GlobalContext';
import { detailMenuMeta, detailMenuAnalyze, detailMenuConfig } from 'components/container/Thread/GlobalContext/hooks/detail/menu';
import { Type as LayoutType } from 'components/container/Thread/GlobalContext/hooks/layout';
import { animations, layouts } from 'components/styles';
import colors from 'components/styles/colors';

import Analyze from './Analyze';
import Config from './Config';
import Footer from './Footer';
import Meta from './Meta';

const barWidth = layouts.appMinWidth / 4;

type Props = AppProps & {
  isModal: boolean;
  handleOnClickToggleTuneModal: () => void;
};

const Component: React.FC<Props> = ({ isModal = false, state, handleOnClickToggleTuneModal }: Props) => {
  const { detailTransformMode, layout, detailMenu } = useGlobalContext();
  const { threadDetail } = state;

  const getContent = () => {
    switch (detailMenu) {
      case detailMenuMeta:
        return (
          <Meta
            isModal={isModal}
            detailTransformMode={detailTransformMode}
            threadDetail={threadDetail}
            handleOnClickToggleTuneModal={handleOnClickToggleTuneModal}
          />
        );
      case detailMenuAnalyze:
        return <Analyze isModal={isModal} detailTransformMode={detailTransformMode} />;
      case detailMenuConfig:
        return <Config isModal={isModal} detailTransformMode={detailTransformMode} />;
    }
  };

  return (
    <section className="DetailSection" css={styles.container(isModal, detailTransformMode, layout)}>
      <div css={styles.scrollY(isModal)}>{getContent()}</div>
      <Footer isModal={isModal} />
    </section>
  );
};

export default Component;

const styles = {
  container: (isModal: boolean, detailTransformMode: DetailModeType, layout: LayoutType) => css`
    overflow: hidden;
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-start;
    justify-content: flex-start;
    ${getContainerWidth(isModal, detailTransformMode, layout)};
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
    padding-bottom: ${layouts.blockHeight}px;
    border-left: ${isModal ? 0 : 1}px solid ${colors.borderColor};
  `,
};

const getContainerWidth = (isModal: boolean, detailTransformMode: DetailModeType, layout: LayoutType) => {
  if (isModal) {
    return css`
      width: 100%;
      min-width: ${layouts.appMinWidth}px;
    `;
  } else {
    switch (detailTransformMode) {
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
          width: ${barWidth}px;
          min-width: ${barWidth}px;
        `;
    }
  }
};

export const getBorderRadius = (isModal: boolean) => {
  if (isModal) {
    return `0`;
  } else {
    return `0`;
  }
};

export const getBodyPaddingSide = (isModal: boolean, detailTransformMode: DetailModeType) => {
  if (isModal) {
    return layouts.doublePadding;
  } else {
    return detailTransformMode === detailModeBar ? layouts.basePadding : layouts.doublePadding;
  }
};
