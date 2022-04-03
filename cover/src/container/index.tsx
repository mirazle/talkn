import React, { useState, useCallback, useContext, useEffect, useRef, useMemo } from 'react';
import styled from 'styled-components';

import { configUserCategoryChLimit } from 'common/talknConfig';

import CommingSoon from 'cover/components/atoms/CommingSoon';
import { Props as NodeProps } from 'cover/components/atoms/Node';
import Adverts from 'cover/components/organisms/Adverts';
import LivePageContents from 'cover/components/organisms/Contents/LivePage/';
import ContentMenu from 'cover/components/organisms/Contents/Menu';
import ProfileContents from 'cover/components/organisms/Contents/Profile';
import { UserModalOptionType, userModalOptionInit } from 'cover/components/organisms/Contents/Profile/index';
import SideMenu from 'cover/components/organisms/Contents/SideMenu';
import StoryContents from 'cover/components/organisms/Contents/Story/contents';
import StoryIndex from 'cover/components/organisms/Contents/Story/index';
import Footer from 'cover/components/organisms/Footer';
import Header from 'cover/components/organisms/Header';
import SnsShare from 'cover/components/organisms/SnsShare';
import UserTop from 'cover/components/organisms/User/Top';
import SearchModal from 'cover/components/pages/SearchModal';
import styles from 'cover/styles';
import {
  UserType,
  UserTagsType,
  GoogleSessionType,
  googleSessionInit,
  SelectContentMenuType,
  selectContentMenuLivePages,
  selectContentMenuBusiness,
  selectContentMenuStory,
  selectContentMenuProfile,
  selectContentMenuDefault,
} from 'cover/talkn.cover';

export type GlobalContextType = {
  innerWidth: number;
  innerHeight: number;
};

const GlobalContext = React.createContext({ innerWidth: 0, innerHeight: 0 });

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

type StoriesVerticalDatas = {
  offsetTop: number;
  offsetBottom: number;
};

type Props = unknown;

type NavigationLayout = {
  width: number;
  marginTop: number;
  marginRight: number;
  marginBottom: number;
  marginLeft: number;
  paddingTop: number;
  paddingRight: number;
  paddingBottom: number;
  paddingLeft: number;
};

type StoriesSectionType = {
  title: string;
  resume: string;
  flow: string;
  nodes: NodeProps[];
};

type StoriesType = {
  version: string;
  createTime: string;
  css: string;
  head: string;
  sections: StoriesSectionType[] | [];
};

const storiesInit: StoriesType = {
  version: '',
  createTime: '',
  css: '',
  head: '',
  sections: [],
};

const storiesVerticalInitial = { offsetTop: 0, offsetBottom: 0 };

let storiesVerticalDatas: StoriesVerticalDatas[] = [];
const TalknContainer: React.FC<Props> = (props) => {
  const [dataMount, setMountData] = React.useState(false);
  const [config, setConfig] = useState<any>({});
  const [thread, setThread] = useState<any>({});
  const [serverMetas, setServerMetas] = useState<any>({});
  const [stories, setStories] = useState<StoriesType>(storiesInit);

  const [isMyPage, setIsMyPage] = useState(false);
  const [session, setSession] = useState<GoogleSessionType>(googleSessionInit);

  const [user, setUser] = useState<UserType>();
  const [userTagsInit, setUserTagsInit] = useState<UserTagsType>();
  const [userTags, setUserTags] = useState<UserTagsType>();

  const [selectProfileModalOption, setSelectProfileModalOption] = useState<UserModalOptionType>({ ...userModalOptionInit });

  const [maxMain, setMaxMain] = useState(false);
  const [showAdvert, setShowAdvert] = useState(true);
  const [showSearchModalOption, setShowSearchModalOption] = useState<UserModalOptionType>({ ...userModalOptionInit });

  const [userCategoryChs, setUserCategoryChs] = useState([]);
  //  const [storiesIndex, setStoriesIndex] = useState<StoriesIndexType[]>(StoriesIndexContentsInit);
  const [storiesIndexPointer, setStoriesIndexPointer] = useState<number | undefined>();
  const [openMenu, setOpenMenu] = useState(false);
  const [selectContentMenu, setSelectContentMenu] = useState<SelectContentMenuType>(selectContentMenuDefault);
  const [storiesPointer, setStoriesPointer] = useState<number | undefined>();
  const [navigationLayout, setNavigationLayout] = useState<NavigationLayout | undefined>();

  const menuOrderRef = useRef<HTMLElement>();
  const storiesRef = useRef<HTMLElement>();
  const resumeRef = useRef<HTMLElement>();
  const contentMenuRef = useRef<HTMLElement>();
  const talknFrameRef = useRef<HTMLElement>();
  const ogpImageRef = useRef<HTMLElement>();
  const showSearchModal = showSearchModalOption.index !== undefined;

  const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({ innerWidth: 0, innerHeight: 0 });

    useEffect(() => {
      const handleResize = () => {
        setWindowSize({
          innerWidth: window.innerWidth,
          innerHeight: window.innerHeight,
        });
      };
      window.addEventListener('resize', handleResize);
      handleResize();
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowSize;
  };

  const size = useWindowSize();

  const handleOnClickNav = (chapterIndex: number) => {
    if (storiesRef.current) {
      const scrollToElm = storiesRef.current.children[chapterIndex] as HTMLElement;
      const scrollToTop = scrollToElm.offsetTop - styles.appHeaderHeight * 2 - styles.baseSize;
      window.scrollTo({ top: scrollToTop, behavior: 'smooth' });
    }
  };

  const handleOnClickMenu = () => {
    setOpenMenu(!openMenu);
  };

  const handleOnClickMenuOut = (e) => {
    //    if (e.target !== menuOrderRef.current && e.target !== headerSideMenuRef.current) {
    setOpenMenu(false);
    //    }
  };

  const handleOnClickControlAdvert = () => {
    if (showAdvert) {
      setShowAdvert(false);
      setMaxMain(true);
    } else {
      setMaxMain(false);
      setTimeout(() => {
        setShowAdvert(true);
      }, styles.transitionDuration);
    }
  };

  useEffect(() => {
    if (menuOrderRef.current) {
      menuOrderRef.current.scrollTop = -menuOrderRef.current.clientHeight;
    }
  }, [menuOrderRef.current]);

  /***********/
  /* STORY
  /***********/

  const useCallbackScroll = useCallback(() => {
    const _storiesPointer = storiesVerticalDatas.findIndex(
      (obj) => obj.offsetTop <= window.scrollY + styles.baseHeight && window.scrollY + styles.baseHeight < obj.offsetBottom
    );
    setStoriesPointer(_storiesPointer);
  }, [storiesVerticalDatas]);

  useEffect(() => {
    if (storiesRef.current) {
      Array.from(storiesRef.current.children).forEach((child: HTMLElement, index) => {
        if (!storiesVerticalDatas[index]) {
          storiesVerticalDatas[index] = storiesVerticalInitial;
        }
        const offsetTop = child.offsetTop - styles.appHeaderHeight - styles.baseSize;
        const offsetBottom = offsetTop + child.clientHeight;
        storiesVerticalDatas[index] = { offsetTop, offsetBottom };
        if (index > 0) {
          storiesVerticalDatas[index - 1].offsetBottom = offsetTop - 1;
        }
      });
    }
  }, [storiesRef.current && storiesRef.current.clientHeight]);

  useEffect(() => {
    if (resumeRef.current && window.talknStories && window.talknStories.sections.length > 0) {
      if (styles.spLayoutWidth < window.innerWidth) {
        const resumeElm = resumeRef.current;
        const resumeStyle = getComputedStyle(resumeElm);
        const width = styles.getTrimUnitNumber(resumeStyle.width);
        const marginTop = styles.getTrimUnitNumber(resumeStyle.marginTop);
        const marginRight = styles.getTrimUnitNumber(resumeStyle.marginRight);
        const marginBottom = styles.getTrimUnitNumber(resumeStyle.marginBottom);
        const marginLeft = styles.getTrimUnitNumber(resumeStyle.marginLeft);
        const paddingTop = styles.getTrimUnitNumber(resumeStyle.paddingTop);
        const paddingRight = styles.getTrimUnitNumber(resumeStyle.paddingRight);
        const paddingBottom = styles.getTrimUnitNumber(resumeStyle.paddingBottom);
        const paddingLeft = styles.getTrimUnitNumber(resumeStyle.paddingLeft);

        setNavigationLayout({
          width,
          marginTop,
          marginRight,
          marginBottom,
          marginLeft,
          paddingTop,
          paddingRight,
          paddingBottom,
          paddingLeft,
        });
      }
    }
  }, [window.innerWidth, stories && stories.sections.length]);

  useEffect(() => {
    if (session && session.email && session.email !== '') {
      const page = location.pathname.split('/')[1];
      setIsMyPage(session.email === page);
    } else {
      setIsMyPage(false);
    }
  }, [session]);

  useEffect(() => {
    setSelectProfileModalOption({ ...userModalOptionInit, ...user });
    setShowSearchModalOption({ ...userModalOptionInit, ...user });
  }, [user]);

  useEffect(() => {
    setMountData(true);
    const userCategoryChCnt = window.talknConfig.userCategoryChs.length;
    window.talknConfig.userCategoryChs = window.talknConfig.userCategoryChs.concat(
      new Array(configUserCategoryChLimit - userCategoryChCnt).fill('')
    );

    setConfig(window.talknConfig);
    setThread(window.talknThread);
    setServerMetas(window.talknServerMetas);
    setStories(window.talknStories);
    setStoriesIndexPointer(window.talknStoriesPointer);
    setUserCategoryChs(window.talknConfig.userCategoryChs);
    setSelectContentMenu(window.talknSelectContentMenu);
    setUser(window.talknUser);
    setUserTags(window.talknUserTags);

    window.addEventListener('scroll', useCallbackScroll);
  }, []);

  const getContentNode = () => {
    switch (selectContentMenu) {
      case selectContentMenuLivePages:
        return <LivePageContents ch={thread.ch} userCategoryChs={userCategoryChs} talknFrameRef={talknFrameRef} />;
      case selectContentMenuBusiness:
        return <CommingSoon ch={thread.ch} />;
      case selectContentMenuStory:
        if (window.talknStories && window.talknStories.sections.length > 0) {
          return (
            <StoryContents
              navigationLayout={navigationLayout}
              storiesRef={storiesRef}
              resumeRef={resumeRef}
              storiesPointer={storiesPointer}
              handleOnClickNav={handleOnClickNav}
            />
          );
        } else {
          return <StoryIndex isMyPage={isMyPage} />;
        }
      case selectContentMenuProfile:
        return (
          <ProfileContents
            isMyPage={isMyPage}
            session={session}
            user={user}
            userTags={userTags}
            userTagsInit={userTagsInit}
            selectProfileModalOption={selectProfileModalOption}
            setUser={setUser}
            setUserTags={setUserTags}
            setUserTagsInit={setUserTagsInit}
            setShowSearchModalOption={setShowSearchModalOption}
          />
        );
    }
  };

  return (
    <GlobalContext.Provider value={{ innerWidth: size.innerWidth, innerHeight: size.innerHeight }}>
      <Container onClick={(e) => handleOnClickMenuOut}>
        {/* サイドメニュー */}
        <SideMenu
          ch={thread.ch}
          openMenu={openMenu}
          storiesIndexPointer={storiesIndexPointer}
          selectContentMenu={selectContentMenu}
          menuOrderRef={menuOrderRef}
        />
        {/* ヘッダー */}
        <Header
          openMenu={openMenu}
          ch={thread.ch}
          favicon={thread.favicon}
          session={session}
          setSession={setSession}
          handleOnClickMenu={handleOnClickMenu}
        />

        <UserTop
          isMyPage={isMyPage}
          userModalOptions={selectProfileModalOption}
          user={user}
          setUser={setUser}
          setSelectProfileModalOption={setSelectProfileModalOption}
        />

        {/* コンテンツメニュー */}
        <MainContentsBoard>
          <ContentMenu ch={thread.ch} selectContentMenu={selectContentMenu} contentMenuRef={contentMenuRef} />
          <Adverts.Header showAdvert={showAdvert} handleOnClickControlAdvert={handleOnClickControlAdvert} />
          <MainContentsWrap showAdvert={showAdvert}>
            <Adverts.Left showAdvert={showAdvert} />
            <MainContents maxMain={maxMain} showAdvert={showAdvert}>
              {useMemo(getContentNode, [selectContentMenu, navigationLayout, storiesPointer, userCategoryChs, user, userTags, isMyPage])}
            </MainContents>
            <Adverts.Right showAdvert={showAdvert} />
          </MainContentsWrap>
        </MainContentsBoard>
        <SnsShare ch={thread.ch} />
        <Footer ch={thread.ch} />
      </Container>
      {showSearchModal && (
        <SearchModal
          show={showSearchModal}
          userModalOptions={showSearchModalOption}
          handleOnClose={() => setShowSearchModalOption({ ...userModalOptionInit })}
        />
      )}
    </GlobalContext.Provider>
  );
};

export default TalknContainer;

// prettier-ignore
const Container = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  font-size: ${styles.fontBaseSize}px;
  font-weight: ${styles.fontBaseWeight};
  color: ${styles.fontColor};

  * {
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Hiragino Sans', 'Noto Sans CJK JP', 'Original Yu Gothic',
      'Yu Gothic', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Sans Emoji';
    letter-spacing: 2px;
    ::selection {
      background: ${styles.themeColor};
      color: #fff;
    }
  }
`;

const MainContentsBoard = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  width: 100%;
`;

const MainContentsWrap = styled.div<{ showAdvert: boolean }>`
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  @media (max-width: ${styles.spLayoutWidth}px) {
    flex-flow: column nowrap;
  }
`;

const MainContents = styled.main<{ showAdvert: boolean; maxMain: boolean }>`
  width: 100%;
  max-width: ${(props) => (!props.maxMain ? `${styles.appWidth}px` : '100%')};
  transition: max-width ${styles.transitionDuration}ms ease 0s;
  @media (max-width: ${styles.doubleAdvertWidth}px) {
    width: ${(props) => (props.showAdvert ? `calc( 100% - ${styles.advertWidth + styles.baseMargin * 2}px)` : '100%')};
  }
  @media (max-width: ${styles.spLayoutWidth}px) {
    width: 100%;
  }
`;
