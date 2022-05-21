import React, { useState, useCallback, useContext, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import conf from 'common/conf';

import HeaderSection from 'cover/components/molecules/HeaderSection';
import Adverts from 'cover/components/organisms/Adverts';
import Footer from 'cover/components/organisms/Footer';
import Header from 'cover/components/organisms/Header';
import ContentMenu from 'cover/components/organisms/Menu/ContentMenu';
import SideMenu from 'cover/components/organisms/Menu/SideMenu';
import SnsShare from 'cover/components/organisms/SnsShare';
import UserContent, { hoverAnimationBoxShadow } from 'cover/components/organisms/User/Content';
import UserTop from 'cover/components/organisms/User/Top';
import Flex, { A, Main } from 'cover/flexes';
import { GoogleSessionType, googleSessionInit } from 'cover/model/Google';
import { selectContentMenuUsers } from 'cover/model/Menus';
import { UserType } from 'cover/model/User';
import { UserTagsType, OpenModalOptionType, openModalOptionInit } from 'cover/model/userTags';
import styles from 'cover/styles';
import { Props as NodeProps } from 'cover/utils/Node';

export type GlobalContextType = {
  innerWidth: number;
  innerHeight: number;
  isScrollTop: boolean;
  isSpLayout: boolean;
  isSpLayoutStrict: boolean;
  isTransition: boolean;
};

const globalContextinit = {
  innerWidth: 0,
  innerHeight: 0,
  isScrollTop: false,
  isSpLayout: false,
  isSpLayoutStrict: false,
  isTransition: true,
};

const GlobalContext = React.createContext(globalContextinit);

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

type StoriesVerticalDatas = {
  offsetTop: number;
  offsetBottom: number;
};

type Props = {
  session: GoogleSessionType;
  setSession: React.Dispatch<React.SetStateAction<GoogleSessionType>>;
};

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

const Components: React.FC<Props> = ({ session, setSession }) => {
  const params = useParams();
  const userId = params.userId;
  const [dataMount, setMountData] = React.useState(false);
  const [config, setConfig] = useState<any>({});
  const [thread, setThread] = useState<any>({});
  const [users, setUsers] = useState([]);
  const [serverMetas, setServerMetas] = useState<any>({});
  const [stories, setStories] = useState<StoriesType>(storiesInit);

  const [isMyPage, setIsMyPage] = useState(false);

  const [user, setUser] = useState<UserType>();
  const [userTagsInit, setUserTagsInit] = useState<UserTagsType>();
  const [userTags, setUserTags] = useState<UserTagsType>();

  const [showProfileModalOption, setShowProfileModalOption] = useState<OpenModalOptionType>({ ...openModalOptionInit });

  const [maxMain, setMaxMain] = useState(false);
  const [showAdvert, setShowAdvert] = useState(true);
  const [showSearchModalOption, setShowSearchModalOption] = useState<OpenModalOptionType>({ ...openModalOptionInit });

  const [userCategoryChs, setUserCategoryChs] = useState([]);
  const [openMenu, setOpenMenu] = useState(false);
  const [storiesPointer, setStoriesPointer] = useState<number | undefined>();
  const [navigationLayout, setNavigationLayout] = useState<NavigationLayout | undefined>();

  const resumeRef = useRef<HTMLElement>();
  const ch = location.pathname;

  const handleOnClickContainer = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (openMenu && styles.menuPcWidth < e.clientX) {
      setOpenMenu(false);
    }
  };

  const handleOnClickMenu = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setOpenMenu(!openMenu);
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
    if (resumeRef.current && window.talknDatas.stories && window.talknDatas.stories.sections.length > 0) {
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
    if (session && session.email && session.email !== '' && user && user.email !== '' && user.email === session.email) {
      setIsMyPage(user.email === session.email);
    } else {
      setIsMyPage(false);
    }
  }, [session]);

  useEffect(() => {
    setShowProfileModalOption({ ...openModalOptionInit, ...user });
    setShowSearchModalOption({ ...openModalOptionInit, ...user });
  }, [user]);

  useEffect(() => {
    setUsers(window.talknDatas.users);
  }, []);

  return (
    <Container
      className="Container"
      width="100%"
      flow="column"
      alignItems="center"
      justifyContent="center"
      onClick={handleOnClickContainer}>
      {/* サイドメニュー */}
      <SideMenu openMenu={openMenu} userTags={userTags} />
      {/* ヘッダー */}
      <Header openMenu={openMenu} ch={ch} session={session} setSession={setSession} handleOnClickMenu={handleOnClickMenu} />

      <UserTop
        isMyPage={isMyPage}
        openModalOptions={showProfileModalOption}
        session={session}
        user={user}
        setUser={setUser}
        setShowProfileModalOption={setShowProfileModalOption}
      />
      {/* コンテンツメニュー */}
      <MainContentsBoard className="MainContentsBoard" flow="row wrap" justifyContent="center">
        <ContentMenu ch={ch} selectContentMenu={selectContentMenuUsers} />
        <Adverts.Header showAdvert={showAdvert} handleOnClickControlAdvert={handleOnClickControlAdvert} />
        <MainContentsWrap className="MainContentsWrap" showAdvert={showAdvert} alignItems="flex-start" justifyContent="center">
          <Adverts.Left showAdvert={showAdvert} />
          <MainContents className="MainContents" flow="column wrap" maxMain={maxMain} showAdvert={showAdvert}>
            <HeaderSection
              key={'Users'}
              title={'Users'}
              content={
                <>
                  {users &&
                    users.map((user, index) => (
                      <A key={`UserContent_${index}`} href={`https://${conf.coverURL}/users/${user._id}/`} display="block" width="100%">
                        <UserContent className={'UserIndex'} user={user} fullWidth={false} hoverAnimationType={hoverAnimationBoxShadow} />
                      </A>
                    ))}
                </>
              }
            />
          </MainContents>
          <Adverts.Right showAdvert={showAdvert} />
        </MainContentsWrap>
        <Adverts.Under showAdvert />
      </MainContentsBoard>
      <SnsShare ch={ch} />

      <Footer ch={ch} />
    </Container>
  );
};

export default Components;

const Container = styled(Flex)`
  min-width: ${styles.appMinWidth}px;
  max-width: 100%;
  margin: 0 auto;
  font-size: ${styles.fontBaseSize}px;
  font-weight: ${styles.fontBaseWeight};
  color: ${styles.fontColor};
  * {
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Hiragino Sans', 'Noto Sans CJK JP', 'Original Yu Gothic',
      'Yu Gothic', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Sans Emoji';
    ::selection {
      background: ${styles.themeColor};
      color: #fff;
    }
  }
  ::-webkit-scrollbar {
    width: 0.5em;
  }
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }
  ::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    outline: 1px solid slategrey;
  }
  ::-webkit-scrollbar:hover {
    width: 0.7em;
  }
  @media (max-width: ${styles.spLayoutStrictWidth}px) {
    font-size: ${styles.fontBaseSpSize}px;
  }
`;

const MainContentsBoard = styled(Flex)`
  width: 100%;
`;

const MainContentsWrap = styled(Flex)<{ showAdvert: boolean }>`
  flex-flow: row nowrap;
  width: 100%;
  @media (max-width: ${styles.spLayoutWidth}px) {
    flex-flow: column nowrap;
  }
`;

const MainContents = styled(Main)<{ showAdvert: boolean; maxMain: boolean }>`
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
