import * as React from 'react';
import styled from 'styled-components';

import conf from 'common/conf';

import Search from 'cover/components/atoms/icon/Search';
import Flex, { A, Img, H1, Header } from 'cover/flexes';
import styles from 'cover/styles';

type Props = {
  openMenu: boolean;
  ch: string;
  account: React.ReactNode;
  handleOnClickMenu: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
};

const Component: React.FC<Props> = ({ ch, openMenu, account, handleOnClickMenu }) => {
  return (
    <Container
      className="Header"
      width="100%"
      height={`${styles.appHeaderHeight}px`}
      alignItems="center"
      justifyContent="space-between"
      border="underline">
      <HeaderInSideMenu
        flow="column wrap"
        alignItems="center"
        justifyContent="center"
        className={openMenu && 'open'}
        alt={{ label: 'Search', type: 'bottom left' }}
        sideMargin>
        <Search
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleOnClickMenu(e);
          }}
          close={openMenu}
        />
      </HeaderInSideMenu>

      <H1 id={'AppHeader'}>
        <TitleAnchor href={`https:/${ch}`} alignItems="center" justifyContent="center">
          <Img src={`//${conf.assetsURL}/cover/logo.png`} width="32px" className="logo" />
          STARTUP-HUB
        </TitleAnchor>
      </H1>

      <HeaderSide flow="column wrap" alignItems="center" justifyContent="center" sideMargin>
        {account}
      </HeaderSide>
    </Container>
  );
};

export default Component;

const Container = styled(Header)`
  box-sizing: border-box;
  z-index: ${styles.zIndex.header};
  position: sticky;
  top: 0;
  ${styles.alphaBgSet};
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

const TitleAnchor = styled(A)`
  position: relative;
  left: -32px;
  letter-spacing: 3px;
  .hub {
    margin-left: 4px;
  }
  .logo {
    margin-right: 12px;
  }
`;
