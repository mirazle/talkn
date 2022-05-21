import React from 'react';
import styled from 'styled-components';

import Svg, { IconType } from 'cover/components/atoms/svg';
import Checkmark from 'cover/components/atoms/svg/Checkmark';
import Flex, { Section, H5 } from 'cover/flexes';
import styles from 'cover/styles';

type Props = {
  title: string;
  content: React.ReactNode;
  headerMenu?: React.ReactNode;
  iconType?: IconType;
  checkAnimation?: boolean;
};

const Component: React.FC<Props> = ({ title, headerMenu, content, iconType = 'Tag', checkAnimation }) => {
  const SvgIcon = Svg[iconType];
  return (
    <SectionCustom
      className="HeaderSection"
      width="100%"
      flow="column nowrap"
      alignItems="center"
      resetOrigin
      border
      borderRadius
      upperMargin
      sideMargin
      sidePadding
      bottomPadding
      bottomMargin>
      <Header
        className={'HeaderSectionHeader'}
        width="100%"
        alignItems="center"
        justifyContent="space-between"
        border="underline"
        upperPadding
        sidePadding
        bottomPadding>
        <H5 className={title} upperMargin bottomMargin>
          {/*<SvgIcon className="ProfileSectionSvgIcon" />*/}
          {title}
        </H5>
        {headerMenu && (
          <Flex className={'ProfileSectionMenu'} flow="column nowrap">
            {headerMenu}
          </Flex>
        )}
      </Header>
      <Content
        className={'HeaderSectionContent'}
        flow="column nowrap"
        justifyContent="center"
        upperPadding
        sidePadding
        sideMargin
        bottomPadding>
        {content}
      </Content>
      {checkAnimation && <Checkmark />}
    </SectionCustom>
  );
};

export default Component;

const SectionCustom = styled(Section)`
  @media (max-width: ${styles.spLayoutStrictWidth}px) {
    margin-right: 0;
    margin-left: 0;
    padding-right: 0;
    padding-left: 0;
    border-right: 0;
    border-left: 0;
    border-radius: 0;
    .HeaderSection {
      margin: 0;
    }
    .HeaderSectionContent {
      padding: ${styles.basePadding}px;
      margin: 0;
    }
  }
`;

const Header = styled(Flex)`
  .ProfileSectionSvgIcon {
    margin: 0 ${styles.doubleMargin}px 0 0;
  }
`;

const Content = styled(Flex)`
  width: 100%;
  height: auto;
  min-height: 200px;
`;
