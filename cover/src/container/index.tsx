import React, { useState, useCallback, useContext, useEffect, useRef, useMemo } from 'react';
import styled from 'styled-components';

import { StoriesIndexType, configUserCategoryChLimit, configStoriesLimit } from 'common/talknConfig';

import CommingSoon from 'cover/components/atoms/CommingSoon';
import { Props as NodeProps } from 'cover/components/atoms/Node';
import Adverts from 'cover/components/organisms/Adverts';
import LivePageContents from 'cover/components/organisms/Contents/LivePage/';
import ContentMenu from 'cover/components/organisms/Contents/Menu';
import { userModalOptionInit, UserModalOptionType } from 'cover/components/organisms/Contents/Profile';
import ProfileContents from 'cover/components/organisms/Contents/Profile';
import SideMenu from 'cover/components/organisms/Contents/SideMenu';
import StoryContents from 'cover/components/organisms/Contents/Story/contents';
import StoryIndex from 'cover/components/organisms/Contents/Story/index';
import DomainProfile from 'cover/components/organisms/DomainProfile';
import EyeCatchCircleOrder from 'cover/components/organisms/EyeCatch/CircleOrder';
import EyeCatchMain from 'cover/components/organisms/EyeCatch/Main';
import EyeCatchOrder from 'cover/components/organisms/EyeCatch/Order';
import Footer from 'cover/components/organisms/Footer';
import Header from 'cover/components/organisms/Header';
import SnsShare from 'cover/components/organisms/SnsShare';
import styles from 'cover/styles';
import { GoogleSessionType, googleSessionInit } from 'cover/talkn.cover';
import {
  UserTagsType,
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

const StoriesIndexContentsInit: StoriesIndexType[] = [];
const storiesVerticalInitial = { offsetTop: 0, offsetBottom: 0 };
const getScrollWidth = () => (window.innerWidth > styles.appWidth ? styles.appWidth : window.innerWidth);
let storiesVerticalDatas: StoriesVerticalDatas[] = [];
const TalknContainer: React.FC<Props> = (props) => {
  const [dataMount, setMountData] = React.useState(false);
  const [config, setConfig] = useState<any>({});
  const [thread, setThread] = useState<any>({});
  const [serverMetas, setServerMetas] = useState<any>({});
  const [stories, setStories] = useState<StoriesType>(storiesInit);

  const [isMyPage, setIsMyPage] = useState(false);
  const [session, setSession] = useState<GoogleSessionType>(googleSessionInit);
  const [userTagsInit, setUserTagsInit] = useState<UserTagsType>();
  const [userTags, setUserTags] = useState<UserTagsType>();
  const [selectProfileModalOption, setSelectProfileModalOption] = useState<UserModalOptionType>({ ...userModalOptionInit });

  const [storiesEyeCatchs, setStoriesEyeCatchs] = useState<StoriesIndexType[]>(StoriesIndexContentsInit);
  const [eyeCatchScrollIndex, setEyeCatchScrollIndex] = useState(0);

  const [maxMain, setMaxMain] = useState(false);
  const [showAdvert, setShowAdvert] = useState(true);

  const [userCategoryChs, setUserCategoryChs] = useState([]);
  const [storiesIndex, setStoriesIndex] = useState<StoriesIndexType[]>(StoriesIndexContentsInit);
  const [storiesIndexPointer, setStoriesIndexPointer] = useState<number | undefined>();
  const [openMenu, setOpenMenu] = useState(false);
  const [eyeCatchHeight, setEyeCatchHeight] = useState(0);
  const [eyeCatchWidth, setEyeCatchWidth] = useState(0);
  const [selectContentMenu, setSelectContentMenu] = useState<SelectContentMenuType>(selectContentMenuDefault);
  const [storiesPointer, setStoriesPointer] = useState<number | undefined>();
  const [navigationLayout, setNavigationLayout] = useState<NavigationLayout | undefined>();

  const storiesEyeCatchOrderRef = useRef<HTMLElement>();
  const menuOrderRef = useRef<HTMLElement>();
  const storiesRef = useRef<HTMLElement>();
  const resumeRef = useRef<HTMLElement>();
  const contentMenuRef = useRef<HTMLElement>();
  const talknFrameRef = useRef<HTMLElement>();
  const ogpImageRef = useRef<HTMLElement>();

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

  const handleOnScrollHeadEyeCatch = (e: React.UIEvent<HTMLOListElement, UIEvent>) => {
    const scrollWidth = getScrollWidth();
    const scrollIndex = (e.target as HTMLOListElement).scrollLeft / scrollWidth;
    if (Number.isInteger(scrollIndex)) {
      setEyeCatchScrollIndex(scrollIndex);
    }
  };

  const handleOnClickCircle = (e) => {
    if (storiesEyeCatchOrderRef.current) {
      storiesEyeCatchOrderRef.current.scrollTo({
        left: getScrollWidth() * e.target.dataset.index,
        behavior: 'smooth',
      });
    }
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

  const handleOnChangeUserTags = (changedAccountTags: UserTagsType) => {
    setUserTags(changedAccountTags);
  };

  const useCallbackScroll = useCallback(() => {
    const _storiesPointer = storiesVerticalDatas.findIndex(
      (obj) => obj.offsetTop <= window.scrollY + styles.baseHeight && window.scrollY + styles.baseHeight < obj.offsetBottom
    );
    setStoriesPointer(_storiesPointer);
  }, [storiesVerticalDatas]);

  useEffect(() => {
    if (storiesEyeCatchOrderRef.current) {
      const scrollIndex = Array.from(storiesEyeCatchOrderRef.current.children).findIndex((child) => {
        const childElement = child as HTMLElement;
        return Number(childElement.getAttribute('data-no')) === window.talknStoriesPointer;
      });

      if (scrollIndex >= 0) {
        storiesEyeCatchOrderRef.current.scrollLeft = getScrollWidth() * scrollIndex;
        setEyeCatchScrollIndex(scrollIndex);
      }
    }
  }, [storiesEyeCatchOrderRef.current, window.talknStoriesPointer]);

  useEffect(() => {
    if (menuOrderRef.current) {
      menuOrderRef.current.scrollTop = -menuOrderRef.current.clientHeight;
    }
  }, [menuOrderRef.current]);

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
    const _offset = window.talknStoriesPointer - configStoriesLimit / 2;
    const offset = 0 <= _offset ? _offset : 0;
    const limit = configStoriesLimit;
    const _storiesIndex = [...window.talknConfig.storiesIndex].reverse();

    let _storiesEyeCatchs = [...window.talknConfig.storiesIndex]
      .map((storiesIndex, index) => {
        if (window.talknThread.ch !== '/') {
          //storiesIndex.no = index + 1;
        }
        return storiesIndex;
      })
      .splice(offset, limit);
    _storiesEyeCatchs = _storiesEyeCatchs.reverse();

    setStoriesIndex(_storiesIndex);
    setStoriesEyeCatchs(_storiesEyeCatchs);
  }, [window.talknConfig.storiesIndex]);

  useEffect(() => {
    if (ogpImageRef.current) {
      const image = new Image();
      image.src = serverMetas['og:image'];
      setEyeCatchWidth(image.width);
      setEyeCatchHeight(image.height);
    }
  }, [ogpImageRef.current]);

  useEffect(() => {
    if (session && session.email && session.email !== '') {
      const page = location.pathname.split('/')[1];
      setIsMyPage(session.email === page);
    } else {
      setIsMyPage(false);
    }
  }, [session]);

  useEffect(() => {
    if (userTags && userTags.profile) {
      setSelectProfileModalOption({
        ...userModalOptionInit,
        icon: userTags.profile.icon,
        bg: userTags.profile.bg,
        languages: userTags.profile.languages,
        sexes: userTags.profile.sexes,
        birthday: userTags.profile.birthday,
      });
    }
  }, [userTags && userTags.profile]);

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
    setUserTags(window.talknUser);

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
        } else if (storiesEyeCatchs && storiesEyeCatchs.length > 0) {
          return (
            <StoryIndex
              ch={thread.ch}
              storiesEyeCatchs={storiesEyeCatchs}
              storiesEyeCatchOrderRef={storiesEyeCatchOrderRef}
              handleOnClickMenu={handleOnClickMenu}
              handleOnScrollHeadEyeCatch={handleOnScrollHeadEyeCatch}
            />
          );
        } else {
          return <CommingSoon ch={thread.ch} />;
        }
      case selectContentMenuProfile:
        return (
          <ProfileContents
            isMyPage={isMyPage}
            session={session}
            userTags={userTags}
            userTagsInit={userTagsInit}
            selectProfileModalOption={selectProfileModalOption}
            setUserTags={setUserTags}
            setUserTagsInit={setUserTagsInit}
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
          //        headerSideMenuRef={headerSideMenuRef}
          handleOnClickMenu={handleOnClickMenu}
        />

        {/* ドメインのog:imageをアイキャッチとして表示 */}
        <EyeCatchMain
          ch={thread.ch}
          session={session}
          isMyPage={isMyPage}
          userModalOptions={selectProfileModalOption}
          userTags={userTags}
          userTagsInit={userTagsInit}
          setUserTags={setUserTags}
          setUserTagsInit={setUserTagsInit}
          setSelectProfileModalOption={setSelectProfileModalOption}
          ogImage={serverMetas['og:image']}
          ogpImageRef={ogpImageRef}
          eyeCatchWidth={eyeCatchWidth}
          eyeCatchHeight={eyeCatchHeight}
        />

        {/* クリエイターのインタビューのアイキャッチをslideで表示 */}
        {storiesEyeCatchs && storiesEyeCatchs.length > 0 && (
          <EyeCatchOrder
            ch={thread.ch}
            slide
            storiesEyeCatchs={storiesEyeCatchs}
            storiesEyeCatchOrderRef={storiesEyeCatchOrderRef}
            handleOnScrollHeadEyeCatch={handleOnScrollHeadEyeCatch}
            storiesIndexCnt={window.talknConfig.storiesIndex.length}
          />
        )}

        {/* クリエイターのインタビューの選択(●)アイコンを表示 */}
        {window.talknConfig && window.talknConfig.storiesIndex.length > 0 && (
          <EyeCatchCircleOrder
            ch={thread.ch}
            storiesIndexCnt={window.talknConfig.storiesIndex.length}
            eyeCatchScrollIndex={eyeCatchScrollIndex}
            storiesEyeCatchs={storiesEyeCatchs}
            storiesEyeCatchOrderRef={storiesEyeCatchOrderRef}
            handleOnClickCircle={handleOnClickCircle}
          />
        )}
        {/* コンテンツメニュー */}
        <MainContentsBoard>
          <ContentMenu ch={thread.ch} selectContentMenu={selectContentMenu} contentMenuRef={contentMenuRef} />
          <Adverts.Header showAdvert={showAdvert} handleOnClickControlAdvert={handleOnClickControlAdvert} />
          <MainContentsWrap showAdvert={showAdvert}>
            <Adverts.Left showAdvert={showAdvert} />
            <MainContents maxMain={maxMain} showAdvert={showAdvert}>
              {useMemo(getContentNode, [selectContentMenu, navigationLayout, storiesPointer, userCategoryChs, userTags, isMyPage])}
              <DomainProfile serverMetas={serverMetas} />
            </MainContents>
            <Adverts.Right showAdvert={showAdvert} />
          </MainContentsWrap>
        </MainContentsBoard>
        <SnsShare ch={thread.ch} />
        <Footer ch={thread.ch} />
      </Container>
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

  a,
  a:visited,
  a:hover,
  a:active {
    text-decoration: none;
    cursor: pointer;
    user-select: none;
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
