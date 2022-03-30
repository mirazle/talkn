import React from 'react';
import styled from 'styled-components';

import Flex from 'cover/components/atoms/Flex';
import H from 'cover/components/atoms/H';
import Section from 'cover/components/atoms/Section';
import Svg, { IconType } from 'cover/components/atoms/svg';
import Checkmark from 'cover/components/atoms/svg/Checkmark';
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
        {headerMenu && (
          <Flex className={'ProfileSectionMenu'} flow="column nowrap">
            {headerMenu}
          </Flex>
        )}
      </Header>
      <Flex width="100%" className={'ProfileSectionContent'} flow="column nowrap" upperPadding sidePadding sideMargin bottomPadding>
        {content}
      </Flex>
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
  }
`;

const Header = styled(Flex)`
  .ProfileSectionSvgIcon {
    margin: 0 ${styles.baseMargin}px 0 0;
  }
`;
