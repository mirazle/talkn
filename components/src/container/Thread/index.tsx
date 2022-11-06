import { css } from '@emotion/react';
import React, { useEffect, useState } from 'react';

import Cover from 'components/container/Cover';
import { Props } from 'components/container/Thread/App';
import { useGlobalContext, actions } from 'components/container/Thread/GlobalContext';
import { Type as LayoutType } from 'components/container/Thread/GlobalContext/hooks/layout';
import { colors, dropFilter, emotions, layouts } from 'components/styles';
import { animations } from 'components/styles';

import Detail, { detailSideType } from './Detail';
import { menuModeBar, menuModeInclude, menuModeNormal, menuModeSmall, MenuModeType } from './GlobalContext/hooks/menu/mode';
import Header from './Header';
import Menu from './Menu';
import Posts from './Posts';

const Component: React.FC<Props> = (props) => {
  const { bootOption, api, state, root } = props;
  const { bools, isTune, refs, menuMode, layout, dragX, setScrollLeft, setAction } = useGlobalContext();
  const [transitionEndMenuMode, setTransitionEndMenuMode] = useState<MenuModeType>(menuMode);

  const handleOnScroll = ({ target }: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const screenElm = target as HTMLDivElement;
    setScrollLeft(screenElm.scrollLeft);
  };

  const handleOnClickToggleTuneModal = () => {
    if (bools.openTuneModal) {
      setAction(actions.closeTuneModal);
    } else {
      setAction(actions.openTuneModal);
    }
  };

  const handleOnTransitionEndScreen = (e: React.TransitionEvent<HTMLDivElement>) => {
    const { target, propertyName } = e;
    const { tagName, classList } = target as HTMLElement;

    // 横幅
    if (tagName === 'OL' && classList.contains('Menu') && propertyName === 'width') {
      setTransitionEndMenuMode(menuMode);
    }

    // 縦幅
    if (tagName === 'LI' && classList.contains('MenuLi') && propertyName === 'height') {
      setTransitionEndMenuMode(menuMode);
    }
  };

  useEffect(() => {
    if (!isTune) {
      setAction(actions.apiRequestTuning);
    }
  }, [isTune]);

  return (
    <div css={styles.container}>
      <section css={styles.section(isTune)}>
        <div
          className="screen"
          css={styles.screen(menuMode, layout, bools.openDetail, dragX)}
          ref={refs.screen}
          onScroll={handleOnScroll}
          onTransitionEnd={handleOnTransitionEndScreen}>
          <Menu bootOption={bootOption} api={api} state={state} root={root} transitionEndMenuMode={transitionEndMenuMode} />
          <Posts bootOption={bootOption} api={api} state={state} root={root} handleOnClickToggleTuneModal={handleOnClickToggleTuneModal} />
          {!layout.isSpLayout && <Detail mode={detailSideType} {...props} handleOnClickToggleTuneModal={handleOnClickToggleTuneModal} />}
        </div>

        <Header bootOption={bootOption} api={api} state={state} root={root} handleOnClickToggleTuneModal={handleOnClickToggleTuneModal} />
      </section>
      {!isTune && (
        <Cover
          root={root}
          body={
            <span css={styles.inputWrap}>
              <br /> <br />
              <input css={styles.input('')} value={state.thread.ch} readOnly />
              <br />
              Tuning..
              <br /> <br />
            </span>
          }
        />
      )}
    </div>
  );
};

export default Component;

const styles = {
  container: css`
    overflow: hidden;
    width: inherit;
    height: inherit;
    transform: translate(0px, 0px);
    button {
      outline: none;
    }
  `,
  section: (isTune: boolean) => css`
    overflow: hidden;
    width: inherit;
    height: inherit;
    opacity: ${isTune ? 1 : 0};
    transition: opacity ${animations.transitionDuration}ms;
    transform: translate(0px, 0px);
    * {
      box-sizing: border-box;
    }
  `,
  screen: (menuMode: MenuModeType, layout: LayoutType, openDetail: boolean, dragX: number) => css`
    overflow-x: scroll;
    overflow-y: hidden;
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    min-width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    border: 1px solid ${colors.brighterColor};
    white-space: nowrap;
    scroll-snap-type: x mandatory;
    ${getMenuCss(menuMode)}
    ${getPostsCss(menuMode, layout, openDetail, dragX)}
  `,
  footer: css`
    position: fixed;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: ${layouts.blockHeight}px;
    border-top: 1px solid ${colors.brighterColor};
    border-bottom: 1px solid ${colors.brighterColor};
    ${dropFilter.alphaBgSet};
  `,
  inputWrap: css`
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    gap: 16px;
  `,
  input: (type: string) => css`
    ${emotions.inputEffect(type)};
    color: rgb(160, 160, 160);
    background: rgba(255, 255, 255, 0.9);
    user-select: none;
    border: 1px solid rgba(240, 240, 240, 1);
    outline: 0px;
    text-indent: 8px;
  `,
};

const smallWidth = 80;
const largeWidth = layouts.appMinWidth;
const detailTabDefaultWidth = layouts.appMinWidth;
const detailPcDefaultWidth = 380;
const smallLiHeight = 64;
const largeLiHeight = 90;

const getMenuCss = (menuMode: MenuModeType) => {
  const width = getMenuModeWidth(menuMode);
  const liHeight = getLiHeight(menuMode);
  return css`
    .Menu {
      scroll-snap-align: start;
      width: ${width}px;
      min-width: ${width}px;
      max-width: ${width}px;
      transition: width ${animations.transitionDuration}ms, min-width ${animations.transitionDuration}ms,
        max-width ${animations.transitionDuration}ms, height ${animations.transitionDuration}ms,
        min-height ${animations.transitionDuration}ms, max-height ${animations.transitionDuration}ms;
      li {
        height: ${liHeight}px;
        min-height: ${liHeight}px;
        max-height: ${liHeight}px;
        transition: height ${animations.transitionDuration}ms, min-height ${animations.transitionDuration}ms,
          max-height ${animations.transitionDuration}ms;
      }
    }
  `;
};

const getPostsCss = (menuMode: MenuModeType, layout: LayoutType, openDetail: boolean, dragX: number) => {
  const menuModeWidth = getMenuModeWidth(menuMode);
  const detailWidth = getDetailWidth(layout, openDetail);
  const width = menuModeWidth + detailWidth + dragX;
  return css`
    .Posts {
      flex: 1 1 auto;
      @media (max-width: ${layouts.breakSpWidth}px) {
        width: 100%;
        min-width: 100%;
        max-width: 100%;
        scroll-snap-align: start;
      }
    }
  `;
};

const getMenuModeWidth = (menuMode: MenuModeType) => {
  switch (menuMode) {
    case menuModeSmall:
      return smallWidth;
    case menuModeBar:
      return largeWidth;
    case menuModeNormal:
      return largeWidth;
    //    case menuModeInclude:
    //      return largeWidth;
  }
};

const getDetailWidth = (layout: LayoutType, openDetail: boolean) => {
  if (openDetail) {
    if (layout.isTabLayout) {
      return detailTabDefaultWidth;
    } else if (!layout.isSpLayout && !layout.isTabLayout) {
      return detailPcDefaultWidth;
    }
  }
  return 0;
};

const getLiHeight = (menuMode: MenuModeType) => {
  switch (menuMode) {
    case menuModeSmall:
      return smallLiHeight;
    case menuModeBar:
      return smallLiHeight;
    case menuModeNormal:
      return largeLiHeight;
    case menuModeInclude:
      return largeLiHeight;
  }
};
