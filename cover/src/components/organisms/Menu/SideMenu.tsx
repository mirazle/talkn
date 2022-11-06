import React, { useEffect, useState, useMemo, forwardRef, useRef, createRef } from 'react';
import styled from 'styled-components';

import Button, { buttonThemeBright } from 'cover/components/atoms/Button';
import FounderMenu from 'cover/components/organisms/Contents/Profile/modal/FounderMenu';
import InvestorMenu from 'cover/components/organisms/Contents/Profile/modal/InvestorMenu';
import MemberMenu from 'cover/components/organisms/Contents/Profile/modal/MemberMenu';
import StoryMenu from 'cover/components/organisms/Contents/Profile/modal/StoryMenu';
import SelectSearchType from 'cover/components/organisms/Contents/Profile/modal/children/SelectSearchType';
import Flex, { A, Footer as FlexesFooter } from 'cover/flexes';
import { FixValuesType, tagFounder, tagInvestor, tagMember, tagStory, TagType } from 'cover/model/userTags';
import { UserTagsType } from 'cover/model/userTags';
import { FixFounderValuesType } from 'cover/model/userTags/Founder';
import { FixInvestorValuesType } from 'cover/model/userTags/Investor';
import { FixMemberValuesType } from 'cover/model/userTags/Member';
import { FixStoryValuesType } from 'cover/model/userTags/Story';
import styles from 'cover/styles';
import { getFixValuesEmpty } from 'cover/utils/userTags';

type Props = {
  openMenu: boolean;
  userTags: UserTagsType;
};

const Component: React.FC<Props> = ({ openMenu, userTags }) => {
  const [didMount, setDidMount] = useState(false);
  const [searchType, setSearchType] = useState<TagType>();
  const fixValuesEmpty = getFixValuesEmpty(searchType, true);
  const [fixValues, setFixValues] = useState<FixValuesType>(fixValuesEmpty);
  const [footerHeight, setFooterHeight] = useState(0);

  const handleOnClickClear = () => {
    setFixValues({ ...fixValuesEmpty });
  };

  const handleOnDidMountFixedFooter = (elm: HTMLElement) => {
    setFooterHeight(elm.clientHeight);
  };

  const searchMenuMemo = useMemo(() => {
    switch (searchType) {
      case tagInvestor:
        return (
          <InvestorMenu type="SearchInvestorMenu" isEditable fixValues={fixValues as FixInvestorValuesType} setFixValues={setFixValues} />
        );
      case tagFounder:
        return (
          <FounderMenu type="SearchFounderMenu" isEditable fixValues={fixValues as FixFounderValuesType} setFixValues={setFixValues} />
        );
      case tagMember:
        return <MemberMenu type="SearchMemberMenu" isEditable fixValues={fixValues as FixMemberValuesType} setFixValues={setFixValues} />;
      case tagStory:
        return (
          <StoryMenu type="SearchStoryMenu" userTags={userTags} fixValues={fixValues as FixStoryValuesType} setFixValues={setFixValues} />
        );
    }
  }, [fixValues]);

  useEffect(() => {
    if (openMenu) {
      setDidMount(true);
    }
    return () => setDidMount(false);
  }, [openMenu]);

  useEffect(() => {
    setFixValues(fixValuesEmpty);
  }, [searchType]);

  return (
    <Container>
      <Background openMenu={openMenu} show={didMount} />
      <SearchContainer
        className="SideMenuOrder"
        openMenu={openMenu}
        width="100%"
        flow="column nowrap"
        alignItems="flex-start"
        justifyContent="flex-start"
        border="rightline">
        <SearchContent
          className="SearchContent"
          flow="column nowrap"
          overflow="hidden scroll"
          width="100%"
          marginBottom={footerHeight}
          upperPadding
          sidePadding
          bottomPadding>
          <SelectSearchType
            type="SelectSearchType"
            isEditable
            underline
            searchType={searchType}
            onChange={(_searchType) => setSearchType(_searchType)}
          />
          {searchMenuMemo}
        </SearchContent>
        <FixedFooter
          alignItems="center"
          justifyContent="center"
          width="100%"
          className="FixedFooter"
          mouted={handleOnDidMountFixedFooter}
          border="topline"
          upperPadding
          bottomPadding>
          <Button disabled={false} theme={buttonThemeBright} onClick={handleOnClickClear} sideMargin>
            CLEAR
          </Button>
          <Button className="SearchButton" sideMargin>
            <ACustom href="https://yahoo.co.jp/">SEARCH</ACustom>
          </Button>
        </FixedFooter>
      </SearchContainer>
    </Container>
  );
};

export default Component;

const Container = styled(Flex)``;

type BackgroundPropsType = {
  openMenu: boolean;
  show: boolean;
};

const Background = styled(Flex)<BackgroundPropsType>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: ${styles.zIndex.sideMenu - 1};
  display: ${(props) => (props.openMenu ? 'block' : 'none')};
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => (props.show ? styles.fullBackgroundColor : 'rgba(0,0,0,0)')};
  transition: ${styles.transitionDuration}ms;
`;

type ContainerPropsType = {
  openMenu: boolean;
};

const SearchContainer = styled(Flex)<ContainerPropsType>`
  position: fixed;
  z-index: ${styles.zIndex.sideMenu};
  top: ${styles.appHeaderHeight}px;
  left: -${styles.menuPcWidth}px;
  color: ${styles.fontColor};
  width: ${styles.menuPcWidth}px;
  height: calc(100% - ${styles.appHeaderHeight}px);
  min-height: calc(100% - ${styles.appHeaderHeight}px);
  max-height: calc(100% - ${styles.appHeaderHeight}px);
  ${styles.alphaBgSet};
  transition: ${styles.transitionDuration}ms;
  transform: translate(${(props) => (props.openMenu ? `${styles.menuPcWidth}px` : 0)}, 0px);

  @media (max-width: ${styles.spLayoutWidth}px) {
    transform: translate(${(props) => (props.openMenu ? `${styles.menuPcWidth}px` : 0)}, 0px);
  }
  @media (max-width: ${styles.spLayoutStrictWidth}px) {
    left: -100%;
    width: 100%;
    transform: translate(${(props) => (props.openMenu ? '100%' : 0)}, 0px);
  }
`;

type SearchContentPropsType = {
  marginBottom: number;
};

const SearchContent = styled(Flex)<SearchContentPropsType>`
  margin-bottom: ${(props) => props.marginBottom}px;
`;

const FixedFooter = styled(FlexesFooter)`
  position: fixed;
  bottom: 0;
`;

const ACustom = styled(A)`
  color: #fff;
`;
