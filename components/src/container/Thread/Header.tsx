import { css } from '@emotion/react';
import React, { useEffect, useRef, useState } from 'react';

import DetailIcon from 'components/atomicDesign/atoms/Detail';
import MenuIcon from 'components/atomicDesign/atoms/Menu';
import { Props as AppProps } from 'components/container/Thread/App';
import { useGlobalContext, actions, menuModeCycle, detailModeCycle } from 'components/container/Thread/GlobalContext';
import { colors, dropFilter, emotions, layouts } from 'components/styles';

import { detailModeBar, detailModeExpand, DetailModeType } from './GlobalContext/hooks/detail/transformMode';
import { MenuModeType, menuModeNormal, menuModeBar, menuModeSmall } from './GlobalContext/hooks/menu/mode';

export type Props = {
  handleOnClickToggleTuneModal: () => void;
} & AppProps;

const Component: React.FC<Props> = ({ state, handleOnClickToggleTuneModal }: Props) => {
  const { menuMode, detailTransformMode, bools, doms, layout, setAction, setBools, setMenuMode, setDetailTransformMode } =
    useGlobalContext();
  const { thread, threadDetail } = state;
  const [duration, setDuration] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => emotions.useMarqueeContainer(containerRef, thread.title, setDuration), [thread.title, containerRef]);

  const handleOnClickMenu = () => {
    if (doms.screen) {
      const updateMenuIndex = () => {
        const menuIndex = menuModeCycle.findIndex((mode) => menuMode === mode);
        const nextMenuIndex = menuModeCycle[menuIndex + 1] === undefined ? 0 : menuIndex + 1;
        const nextMenuMode = menuModeCycle[nextMenuIndex] as MenuModeType;
        if (layout.isTabLayout) {
          if ((nextMenuMode === menuModeBar || nextMenuMode === menuModeNormal) && detailTransformMode === detailModeExpand) {
            setDetailTransformMode(detailModeBar);
          }
        }
        setMenuMode(nextMenuMode);
      };

      if (layout.isSpLayout) {
        if (bools.openMenu) {
          updateMenuIndex();
        } else {
          doms.screen.scrollTo({ left: 0, behavior: 'smooth' });
        }
      } else {
        updateMenuIndex();
      }
    }
  };

  const handleOnClickDetail = () => {
    if (thread.ch !== threadDetail.ch) {
      setAction(actions.apiRequestChangeThreadDetail, { ch: thread.ch });
    } else {
      const updateDetailIndex = () => {
        const detailIndex = detailModeCycle.findIndex((mode) => detailTransformMode === mode);
        const nextDetailIndex = detailModeCycle[detailIndex + 1] === undefined ? 0 : detailIndex + 1;
        const nextDetailMode = detailModeCycle[nextDetailIndex] as DetailModeType;
        if (layout.isTabLayout) {
          if (nextDetailMode === detailModeExpand && (menuMode === menuModeBar || menuMode === menuModeNormal)) {
            setMenuMode(menuModeSmall);
          }
        }

        setDetailTransformMode(nextDetailMode);
        setBools({ ...bools, detailTransforming: true });
      };
      if (layout.isSpLayout) {
        if (bools.openDetail) {
          setAction(actions.closeDetail);
        } else {
          setAction(actions.openDetail);
        }
      } else {
        updateDetailIndex();
      }
    }
  };

  return (
    <header css={styles.container}>
      <MenuIcon onClick={handleOnClickMenu} />
      <span ref={containerRef} css={[styles.title, emotions.marqueeContainer(duration)]} onClick={handleOnClickToggleTuneModal}>
        <span className="marquee">{thread.title}</span>
      </span>
      <span css={styles.liveCnt}>{thread.liveCnt}</span>
      <DetailIcon onClick={handleOnClickDetail} />
    </header>
  );
};

export default Component;

const partSize = layouts.blockHeight;
const spaceSize = layouts.basePadding;
const styles = {
  container: css`
    position: fixed;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: ${partSize}px;
    padding: ${layouts.basePadding}px ${layouts.basePadding * 2}px ${layouts.basePadding}px ${layouts.basePadding}px;
    border: 1px solid ${colors.borderColor};
    ${dropFilter.alphaBgSet};
    letter-spacing: 1.5px;
  `,
  title: css`
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 75%;
    height: 100%;
    transform: translate(0, 0);
    text-align: center;
    white-space: nowrap;
    user-select: none;
    cursor: pointer;
    color: ${colors.fontColor};
    &:before {
      position: absolute;
      top: -3px;
      left: -32px;
      content: url(/mike_1.svg);
      width: 24px;
      height: 24px;
      max-width: 24px;
      max-height: 24px;
    }
  `,
  liveCnt: css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    min-width: 30px;
    max-width: 30px;
    height: 30px;
    min-height: 30px;
    max-height: 30px;
    padding: ${layouts.basePadding}px;
    border-radius: 50%;
    background: ${colors.themeColor};
    color: ${colors.whiteColor};
    font-size: 75%;
    user-select: none;
  `,
};
