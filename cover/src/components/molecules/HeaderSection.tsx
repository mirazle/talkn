import React from 'react';
import styled from 'styled-components';

import Flex from 'cover/components/atoms/Flex';
import H from 'cover/components/atoms/H';
import Section from 'cover/components/atoms/Section';
import Svg, { IconType } from 'cover/components/atoms/svg';
import Checmmark from 'cover/components/atoms/svg/Checmmark';
import styles from 'cover/styles';

type Props = {
  title: string;
  headerMenu: React.ReactNode;
  content: React.ReactNode;
  iconType?: IconType;
  checkAnimation?: boolean;
};

const Component: React.FC<Props> = ({ title, headerMenu, content, iconType = 'Tag', checkAnimation }) => {
  const SvgIcon = Svg[iconType];
  return (
    <Section
      className="ProfileSection"
      flow="column nowrap"
      resetOrigin
      border
      borderRadius
      upperMargin
      sideMargin
      sidePadding
      bottomPadding
      bottomMargin>
      <Header
        className={'ProfileSectionHeader'}
        width="100%"
        alignItems="center"
        justifyContent="space-between"
        border="underline"
        upperPadding
        sidePadding
        bottomPadding>
        <H.Five className={title} upperMargin bottomMargin>
          <SvgIcon className="ProfileSectionSvgIcon" />
          {title}
        </H.Five>
        <Flex className={'ProfileSectionMenu'} flow="column nowrap">
          {headerMenu}
        </Flex>
      </Header>
      <Flex width="100%" className={'ProfileSectionContent'} flow="column nowrap" upperPadding sidePadding sideMargin bottomPadding>
        {content}
      </Flex>
      {checkAnimation && <Checmmark />}
    </Section>
  );
};

export default Component;

const Header = styled(Flex)`
  .ProfileSectionSvgIcon {
    margin: 0 ${styles.baseMargin}px 0 0;
  }
`;
