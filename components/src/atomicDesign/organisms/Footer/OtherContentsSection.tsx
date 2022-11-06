import * as React from 'react';
import type { FunctionComponent } from 'react';
import styled from 'styled-components';

import { MediaTypeNews, MediaTypeSubdomains, NetworkList } from 'common/Networks';

import Title from 'components/atomicDesign/atoms/Title';
import BoxList from 'components/atomicDesign/molecules/BoxList';
import { layouts } from 'components/styles';

type Props = unknown;

const OtherContentsSection: FunctionComponent<Props> = () => {
  const LiveMediaList = Array.from(Object.keys(NetworkList)).map((_mediaType: string) => {
    const mediaType = _mediaType as MediaTypeSubdomains;
    const label = NetworkList[mediaType].label;
    const active = mediaType === MediaTypeNews;
    return <BoxList label={label} key={label} active={active} theme="dark" href="https://news.talkn.io" />;
  });

  return (
    <Container>
      <Title type="Section">- Other Contents -</Title>
      <br />
      <br />
      <br />
      <ul>
        <li className="title">Talkn For</li>
        <BoxList label="User" theme="dark" href="https://www.talkn.io" />
        <BoxList label="Website owner" theme="dark" href="https://own.talkn.io" />
        <BoxList
          label="Chrome extension"
          theme="dark"
          href="https://chrome.google.com/webstore/detail/talkn-for-chrome/dkngnmdlcofambpfaccepbnjgfholgbo?hl=en"
        />
      </ul>
      <ul>
        <li className="title">Live Media</li>
        <BoxList label="talkn" theme="dark" href="https://talkn.io/" />
        <BoxList label="talkn news" theme="dark" href="https://news.talkn.io/" />
      </ul>
    </Container>
  );
};

export default OtherContentsSection;

const Container = styled.section`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: ${layouts.sepPadding}px ${layouts.doublePadding}px;
  margin: 0 auto;
  background: rgb(35, 35, 35);
  color: #fff;
  @media (max-width: ${layouts.spLayoutWidth}px) {
    padding: 20px 0;
  }
  h2 {
    width: 100%;
    margin: 20px 0;
    text-align: center;
  }
  ul {
    display: flex;
    flex-flow: column wrap;
    min-width: 180px;
    padding: 0;
    margin: 10px;
    text-align: center;
    list-style: none;
    @media (max-width: ${layouts.spLayoutWidth}px) {
      min-width: 160px;
    }
  }
  li {
    margin: 10px;
  }
  li.title {
    font-weight: 500;
    cursor: default;
  }
`;
