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
import { PageProps } from 'cover/container';
import Flex, { A, Main } from 'cover/flexes';
import { selectContentMenuUsers } from 'cover/model/Menus';
import User from 'cover/model/User';
import { UserTagsType, OpenModalOptionType, openModalOptionInit } from 'cover/model/userTags';
import styles from 'cover/styles';
import { Props as NodeProps } from 'cover/utils/Node';

export type GlobalContextPrivateType = {
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

const Components: React.FC<PageProps> = ({ isMyPage, myUser, setMyUser, account }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [showProfileModalOption, setShowProfileModalOption] = useState<OpenModalOptionType>({ ...openModalOptionInit });
  const [maxMain, setMaxMain] = useState(false);
  const [showAdvert, setShowAdvert] = useState(true);
  const [openMenu, setOpenMenu] = useState(false);
  const [userTags, setUserTags] = useState<UserTagsType>();
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

  useEffect(() => {
    setUsers(window.talknDatas.users.map((user: User) => new User(user)));
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
      <Header openMenu={openMenu} ch={ch} account={account} handleOnClickMenu={handleOnClickMenu} />

      <UserTop
        isMyPage={isMyPage}
        openModalOptions={showProfileModalOption}
        user={myUser}
        setMyUser={setMyUser}
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
                      <A key={`UserContent_${index}`} href={`https://${conf.coverURL}/users/${user.id}/`} display="block" width="100%">
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
