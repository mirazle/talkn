import * as React from 'react';
import type { FunctionComponent } from 'react';
import styled from 'styled-components';

import { MediaTypeNews, MediaTypeSubdomains, NetworkList } from 'common/Networks';

import BoxList from 'cover/components/molecules/BoxList';
import { Section } from 'cover/flexes';
import styles from 'cover/styles';

type Props = unknown;

const OtherContentsSection: FunctionComponent<Props> = () => {
  const LiveMediaList = Array.from(Object.keys(NetworkList)).map((_mediaType: string) => {
    const mediaType = _mediaType as MediaTypeSubdomains;
    const label = NetworkList[mediaType].label;
    const active = mediaType === MediaTypeNews;
    return <BoxList label={label} key={label} active={active} theme="dark" href="https://news.talkn.io" />;
  });

  return (
    <>
      {/*
      <Container flow="column nowrap" alignItems="center" upperPadding bottomPadding>
      <H5 color={styles.fontLightColor}>- Other Contents -</H5>
      <Flex flow="row wrap" upperMargin>
        <Ul flow="column nowrap" alignItems="center">
          <li className="title">Talkn For</li>
          <BoxList label="User" theme="dark" href="https://www.talkn.io" />
          <BoxList label="Website owner" theme="dark" href="https://own.talkn.io" />
          <BoxList
            label="Chrome extension"
            theme="dark"
            href="https://chrome.google.com/webstore/detail/talkn-for-chrome/dkngnmdlcofambpfaccepbnjgfholgbo?hl=en"
          />
        </Ul>
        <Ul flow="column nowrap" alignItems="center">
          <li className="title">Live Media</li>
          <BoxList label="talkn" theme="dark" href="https://talkn.io/" />
          <BoxList label="talkn news" theme="dark" href="https://news.talkn.io/" />
        </Ul>
      </Flex>
      </Container>
  */}
    </>
  );
};

export default OtherContentsSection;

const Container = styled(Section)`
  background: rgb(35, 35, 35);
  color: #fff;
  @media (max-width: ${styles.spLayoutWidth}px) {
    padding: 20px 0;
  }
`;
