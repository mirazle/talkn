import * as React from 'react';
import styled from 'styled-components';

import A from 'cover/components/atoms/A';
import Flex from 'cover/components/atoms/Flex';
import H from 'cover/components/atoms/H';
import Account from 'cover/components/molecules/Account';
import styles from 'cover/styles';
import { GoogleSessionType } from 'cover/talkn.cover';

type Props = {
  openMenu: boolean;
  ch: string;
  favicon: string;
  session: GoogleSessionType;
  setSession: React.Dispatch<React.SetStateAction<GoogleSessionType>>;
  handleOnClickMenu: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

const Component: React.FC<Props> = ({ ch, favicon, openMenu, session, setSession, handleOnClickMenu }) => {
  return (
    <Header>
      <HeaderInSideMenu
        flow="column wrap"
        alignItems="center"
        justifyContent="center"
        className={openMenu && 'open'}
        sideMargin
        onClick={handleOnClickMenu}>
        <div className="HeaderMenuLine" />
        <div className="HeaderMenuLine" />
        <div className="HeaderMenuLine" />
      </HeaderInSideMenu>
      <A href={`https:/${ch}`}>
        {/*<Img src={favicon} width={30} height={30} />*/}
        {<H.One id={'AppHeader'}>{ch === '/' ? 'talkn' : ch}</H.One>}
      </A>
      <HeaderSide flow="column wrap" alignItems="center" justifyContent="center" sideMargin>
        <Account session={session} setSession={setSession} />
      </HeaderSide>
    </Header>
  );
};

export default Component;

const Header = styled.header`
  box-sizing: border-box;
  z-index: ${styles.zIndex.header};
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: ${styles.appHeaderHeight}px;
  ${styles.alphaBgSet};
  border-bottom: 1px solid ${styles.borderColor};
  a {
    display: flex;
    flex-flow: row wrap;
    color: ${styles.fontColor};
  }
`;

const HeaderInSideMenu = styled(Flex)`
  width: 60px;
  height: 60px;
  margin-right: 10px;
  transition: ${styles.transitionDuration}ms;
  cursor: pointer;
  .HeaderMenuLine {
    width: 70%;
    height: 1px;
    margin: 5px;
    background: #bbb;
    transition: ${styles.transitionDuration}ms;
  }
  &.open {
    .HeaderMenuLine:nth-child(1) {
      transform: rotate(45deg) translate(8px, 8px);
    }
    .HeaderMenuLine:nth-child(2) {
      transform: rotate(45deg) translate(0px, 0px);
    }
    .HeaderMenuLine:nth-child(3) {
      transform: rotate(-45deg) translate(7px, -8px);
    }
  }
`;

const HeaderSide = styled(Flex)`
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
`;
