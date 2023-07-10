import { css } from '@emotion/react';
import React, { useEffect, useState, useRef } from 'react';

import apiLog from 'api/reducers/apiLog';
import Post from 'api/store/Post';

//import Posts from 'api/store/Posts';
import Cover from 'components/container/Cover';
import { Props, StateType } from 'components/container/Thread/App';
import { useGlobalContext, actions, GlobalContext, HookProps } from 'components/container/Thread/GlobalContext';
import { Type as LayoutType } from 'components/container/Thread/GlobalContext/hooks/layout';
import User, { userInit } from 'components/model/User';
import { colors, dropFilter, emotions, layouts } from 'components/styles';
import { animations } from 'components/styles';

import Detail from './Detail';
import FixedTools from './FixedTools';
import hook from './GlobalContext/hooks';
import { menuModeBar, menuModeInclude, menuModeNormal, menuModeSmall, MenuModeType } from './GlobalContext/hooks/menu/mode';
import Header from './Header';
import Menu from './Menu';
import Posts from './Posts';

type LoardingCoverProps = {
  state: StateType;
  root: HTMLElement;
};

const LoardingCover: React.FC<LoardingCoverProps> = ({ root, state }) => {
  return (
    <Cover
      root={root}
      body={
        <span css={styles.inputWrap}>
          <br /> <br />
          <input css={styles.input('')} value={state.thread.ch} readOnly />
          <br />
          {state.apiLog[0]}
          <br /> <br />
        </span>
      }
    />
  );
};

const Component: React.FC<Props> = (props) => {
  const { bootOption: bootOptionProps, api, state, root } = props;
  const { app, posts, ranks, thread } = state;
  const globalContext = useGlobalContext();

  const {
    action,
    bools,
    bootOption,
    isTune,
    menuMode,
    detailTransformMode,
    layout,
    dragX,
    postsTimeline,
    doms,
    menuRank,
    scrollLeft,
    scrollTop,
    scrollHeight,
    uiTimeMarker,
    setPostsTimeline,
    setScrollLeft,
    setBools,
    setDoms,
    setAction,
  } = globalContext;
  const screenRef = useRef(null);
  const postsRef = useRef(null);
  const postTextareaRef = useRef(null);

  const firstRank = ranks[0] ? ranks[0] : new Post();
  const latestPostIndex = posts.length - 1;
  const latestPost = posts[latestPostIndex] ? posts[latestPostIndex] : new Post();
  const postsCatchedHookKey = `${latestPost._id}_${latestPost.ch}`;
  const hookProps = { ...props, ...globalContext } as HookProps;

  useEffect(() => hook.isTune(hookProps), [app.isTune]);
  useEffect(() => hook.apiLog(hookProps), [state.apiLog.length]);
  useEffect(() => hook.clientLog(hookProps), [state.clientLog.length]);
  useEffect(() => hook.action(hookProps), [action]);
  useEffect(() => hook.bootOption(hookProps), [bootOptionProps, bootOption]);
  useEffect(() => hook.layout(hookProps), [layout]);
  useEffect(() => hook.bools(hookProps), [bools]);
  useEffect(() => hook.doms(hookProps), [doms, state.clientLog.length]);
  useEffect(() => hook.dragX(hookProps), [dragX]);
  useEffect(() => hook.detailTransformMode(hookProps), [detailTransformMode, layout.isSpLayout, layout.isTabLayout]);
  useEffect(() => hook.menuRank(hookProps), [menuRank]);
  useEffect(() => hook.menuMode(hookProps), [menuMode]);
  useEffect(() => hook.rankCatched(hookProps), [firstRank._id]);
  useEffect(() => hook.scrollLeft(hookProps), [scrollLeft]);
  useEffect(() => hook.postsTimeline(hookProps), [postsTimeline]);
  useEffect(() => hook.postsCatched(hookProps), [postsCatchedHookKey]);
  useEffect(() => hook.postsTimeline(hookProps), [postsTimeline]);
  useEffect(() => hook.scrollTop(hookProps), [scrollTop]);
  useEffect(() => hook.scrollHeight(hookProps), [scrollHeight]);
  useEffect(() => hook.uiTimeMarker(hookProps), [uiTimeMarker.now.label, uiTimeMarker]);
  useEffect(() => hook.didMount(hookProps), []);

  const [myUser, setMyUser] = useState<User>(userInit);
  const [isMyPage, setIsMyPage] = useState(true);
  const [showUserMenu, setShowUserMenu] = useState(false);
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
    setDoms({
      ...doms,
      screen: root.querySelector('.screen'),
      posts: root.querySelector('.PostsOl'),
      postTextarea: root.querySelector('textarea.postTextarea'),
      tuneInput: root.querySelector('input.tuneInput'),
    });
  }, [screenRef.current, postsRef.current, postTextareaRef.current]);

  useEffect(() => {
    if (!isTune) {
      setAction(actions.apiRequestTuning);
    }
  }, [isTune]);

  return (
    <div css={styles.container}>
      <section css={styles.section(isTune)}>
        <div
          className={`screen ch:${app.rootCh}`}
          css={styles.screen(menuMode, layout, bools.openDetail, dragX)}
          ref={screenRef}
          onScroll={handleOnScroll}
          onTransitionEnd={handleOnTransitionEndScreen}>
          <Menu
            bootOption={bootOption}
            api={api}
            state={state}
            root={root}
            myUser={myUser}
            isMyPage={isMyPage}
            transitionEndMenuMode={transitionEndMenuMode}
            setShowUserMenu={setShowUserMenu}
            setMyUser={setMyUser}
            setIsMyPage={setIsMyPage}
            handleOnClickToggleTuneModal={handleOnClickToggleTuneModal}
          />
          <Posts
            screenRef={screenRef}
            postsRef={postsRef}
            postTextareaRef={postTextareaRef}
            bootOption={bootOption}
            api={api}
            state={state}
            root={root}
            handleOnClickToggleTuneModal={handleOnClickToggleTuneModal}
          />
          {!layout.isSpLayout && <Detail isModal={false} {...props} handleOnClickToggleTuneModal={handleOnClickToggleTuneModal} />}
        </div>

        <FixedTools
          ch={state.thread.ch}
          screenRef={screenRef}
          postsRef={postsRef}
          postTextareaRef={postTextareaRef}
          api={api}
          state={state}
          root={root}
          bootOption={bootOption}
          myUser={myUser}
          showUserMenu={showUserMenu}
          setShowUserMenu={setShowUserMenu}
        />
        <Header bootOption={bootOption} api={api} state={state} root={root} handleOnClickToggleTuneModal={handleOnClickToggleTuneModal} />
      </section>
      {!isTune && <LoardingCover root={root} state={state} />}
    </div>
  );
};

export default Component;

const styles = {
  container: css`
    overflow: hidden;
    width: inherit;
    min-width: ${layouts.appMinWidth}px;
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
    width: 40%;
  `,
  input: (type: string) => css`
    ${emotions.inputEffect(type)};
    width: inherit;
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
