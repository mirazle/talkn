import * as React from 'react';
import styled from 'styled-components';

import conf from 'common/conf';

import H from 'cover/components/atoms/H';
import styles from 'cover/styles';
import {
  SelectContentMenuType, //  selectContentMenuLivePages,
  selectContentMenuBusiness,
  selectContentMenuStory,
  selectContentMenuProfile,
} from 'cover/talkn.cover';

type Props = {
  ch: string;
  selectContentMenu: SelectContentMenuType;
  contentMenuRef: React.MutableRefObject<HTMLElement>;
};

const Component: React.FC<Props> = ({ ch, selectContentMenu, contentMenuRef }) => {
  return (
    <Container ref={contentMenuRef}>
      <ContentMenuOrder>
        {/*
        <ContentMenuList className={selectContentMenu === selectContentMenuLivePages && 'active'}>
          <a href={`//${conf.coverURL}${ch}livePages`}>
            <H.Two>LIVE PAGES</H.Two>
            <div className="underBar" />
          </a>
        </ContentMenuList>
  */}
        <ContentMenuList className={selectContentMenu === selectContentMenuProfile && 'active'}>
          <a href={`//${conf.coverURL}${ch}profile`}>
            <H.Two>PROFILE</H.Two>
            <div className="underBar" />
          </a>
        </ContentMenuList>
        <ContentMenuList className={selectContentMenu === selectContentMenuBusiness && 'active'}>
          <a href={`//${conf.coverURL}${ch}business`}>
            <H.Two>BUSINESS</H.Two>
            <div className="underBar" />
          </a>
        </ContentMenuList>
        <ContentMenuList className={selectContentMenu === selectContentMenuStory && 'active'}>
          <a href={`//${conf.coverURL}${ch}story`}>
            <H.Two>STORY</H.Two>
            <div className="underBar" />
          </a>
        </ContentMenuList>
      </ContentMenuOrder>
    </Container>
  );
};

export default Component;

type ContainerPropsType = {
  ref: any;
};

const Container = styled.ol<ContainerPropsType>`
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
  margin-bottom: ${styles.doubleMargin}px;
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
  font-size: 19px;
  font-weight: 200;
  letter-spacing: 5px;
  list-style: none;
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
    width: 30%;
    min-width: 60px;
    height: 8px;
    margin-top: 8px;
    background: rgba(0, 0, 0, 0.25);
    border-radius: ${styles.baseSize}px;
    transition: ${styles.transitionDuration * 2}ms;
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
