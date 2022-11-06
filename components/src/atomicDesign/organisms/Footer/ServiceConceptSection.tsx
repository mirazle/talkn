import * as React from 'react';
import type { FunctionComponent } from 'react';
import styled from 'styled-components';

import Title from 'components/atomicDesign/atoms/Title';
import { layouts } from 'components/styles';

type Props = {};

const Component: FunctionComponent<Props> = () => {
  return (
    <Container>
      <Title type="Section">- Domain Profile -</Title>
      <br />
      <br />
      <br />
      <h3>Concept</h3>
      <Message>
        <p>
          ドメインの中でもの作りをする人をピックアップするWEBメディアです。
          TOPドメインが保有する「Metaタグ」「Ogpタグ」を編集することで自由に作成・編集が出来ます。
        </p>
        {/*
        <p>
          This is a web media that picks up people who make things in the domain. By editing the Meta tags and Ogp tags owned by the TOP
          domains, you can freely create and edit them.
        </p>
*/}
      </Message>
      <h3>Mission</h3>
      <Message>
        <p>
          もの作りに関わる人・繋がりたい人を「Metaタグ」「Ogpタグ」で可視化、AIマッチングすることで、インターネット上で不要な「仲介」や「需給ギャップ」を無くします。
        </p>
        {/*
        <p>
          Our mission is to eliminate unnecessary 「intermediaries」and「supply-demand gaps」 on the Internet by visualizing and AI-matching
          people who are involved in manufacturing and people who want to be connected with Meta Tags and Ogp Tags.
        </p>
        */}
      </Message>
    </Container>
  );
};

export default Component;

const Container = styled.section`
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: ${layouts.doublePadding}px ${layouts.doublePadding}px ${layouts.sepMargin}px ${layouts.doublePadding}px;
  background: rgb(68, 68, 68);
  color: #fff;
  line-height: 30px;
`;

const Message = styled.div`
  width: 100%;
  max-width: 600px;
`;
