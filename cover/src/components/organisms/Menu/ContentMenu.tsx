import * as React from 'react';
import styled from 'styled-components';

import conf from 'common/conf';

import { Menu, A, H2 } from 'cover/flexes';
import {
  SelectContentMenuType, //  selectContentMenuLivePages,
  selectContentMenuBusiness,
  selectContentMenuStories,
  selectContentMenuUsers,
} from 'cover/model/Menus';
import styles from 'cover/styles';

type Props = {
  ch: string;
  selectContentMenu: SelectContentMenuType;
};

const Component: React.FC<Props> = ({ ch, selectContentMenu }) => {
  return (
    <Container className="ContentMenu">
      <ContentMenuOrder>
        <ContentMenuList className={selectContentMenu === selectContentMenuUsers && 'active'}>
          <A href={`//${conf.coverURL}${ch}dashboard`}>
            <H2>DASHBOARD</H2>
            <div className="underBar" />
          </A>
        </ContentMenuList>
        <ContentMenuList className={selectContentMenu === selectContentMenuBusiness && 'active'}>
          <A href={`//${conf.coverURL}${ch}business`}>
            <H2>BUSINESS</H2>
            <div className="underBar" />
          </A>
        </ContentMenuList>
        <ContentMenuList className={selectContentMenu === selectContentMenuStories && 'active'}>
          <A href={`//${conf.coverURL}${ch}story`}>
            <H2>STORY</H2>
            <div className="underBar" />
          </A>
        </ContentMenuList>
      </ContentMenuOrder>
    </Container>
  );
};

export default Component;

const Container = styled(Menu)`
  position: sticky;
  top: ${styles.baseHeight}px;
  z-index: ${styles.zIndex.contentsMenu};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: ${styles.baseHeight}px;
  margin-top: ${styles.doubleMargin}px;
  margin-right: 0;
  margin-left: 0;
  margin-bottom: 0;
  padding-right: 0;
  padding-left: 0;
  ${styles.alphaBgSet};
  box-shadow: 0 0 0 1px ${styles.borderColor};
`;
const ContentMenuOrder = styled.ul`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: inherit;
  max-width: ${styles.appWidth}px;
  padding: 0;
  margin: 0;
  color: ${styles.fontColor};
  border-left: 1px solid ${styles.borderColor};
  font-size: 100%;
  font-weight: 200;
  letter-spacing: 5px;
  list-style: none;
  @media (max-width: ${styles.spLayoutWidth}px) {
    border-left: 0px solid ${styles.borderColor};
  }
`;

const ContentMenuList = styled.li`
  display: flex;
  flex-flow: column nowrap;
  flex: 1 1 auto;
  align-items: center;
  justify-content: center;
  width: 25%;
  height: inherit;
  border-right: 1px solid ${styles.borderColor};
  cursor: pointer;
  .underBar {
    width: 35%;
    min-width: 60px;
    height: 8px;
    margin-top: 8px;
    background: rgba(0, 0, 0, 0.25);
    border-radius: ${styles.baseSize}px;
    transition: ${styles.transitionDuration * 2}ms;
  }
  @media (max-width: ${styles.spLayoutWidth}px) {
    &:last-child {
      border-right: 0px solid ${styles.borderColor};
    }
  }

  :hover {
    .underBar {
      background: ${styles.darkColor};
    }
  }
  &.active {
    .underBar {
      background: ${styles.themeColor};
      color: #fff;
    }
  }
  a {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: #666;
  }
`;
