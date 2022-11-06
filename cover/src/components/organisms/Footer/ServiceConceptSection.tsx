import * as React from 'react';
import styled from 'styled-components';

import { H5 } from 'cover/flexes';
import styles from 'cover/styles';

type Props = {};

const Component: React.FC<Props> = () => {
  return (
    <Container>
      <H5 color={styles.fontLightColor}>- Domain Profile Project -</H5>
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
          もの作りに関わる人・繋がりたい人をタグ付けで可視化、AIマッチングすることで、インターネット上で不要な「仲介」や「需給ギャップ」を無くします。
        </p>
        {/*
        <p>
          Our mission is to eliminate unnecessary 「intermediaries」and「supply-demand gaps」 on the Internet by visualizing and AI-matching
          people who are involved in manufacturing and people who want to be connected with Meta Tags and Ogp Tags.
        </p>
        */}
      </Message>
      <h3>Sponser</h3>
      <Groups>
        <Member>
          <span className="icon" />
          <span></span>
        </Member>
        <Member>
          <span className="icon" />
          <span></span>
        </Member>
        <Member>
          <span className="icon" />
          <span></span>
        </Member>
      </Groups>
      <h3>Member</h3>
      <Groups>
        <Member href="https://twitter.com/mirazle" bgSrc="https://pbs.twimg.com/profile_images/1725640801/baba_x96.png">
          <span className="icon" />
          <span className="name">mirazle@talkn</span>
        </Member>
        <Member href="https://twitter.com/mirazle">
          <span className="icon" />
          <span className="name"></span>
        </Member>
        <Member href="https://twitter.com/mirazle">
          <span className="icon" />
          <span className="name"></span>
        </Member>
        <Member href="https://twitter.com/mirazle">
          <span className="icon" />
          <span className="name"></span>
        </Member>
        <Member href="https://twitter.com/mirazle">
          <span className="icon" />
          <span className="name"></span>
        </Member>
        <Member href="https://twitter.com/mirazle">
          <span className="icon" />
          <span className="name"></span>
        </Member>
        <Member href="https://twitter.com/mirazle">
          <span className="icon" />
          <span className="name"></span>
        </Member>
        <Member href="https://twitter.com/mirazle">
          <span className="icon" />
          <span className="name"></span>
        </Member>
        <Member href="https://twitter.com/mirazle">
          <span className="icon" />
          <span className="name"></span>
        </Member>
      </Groups>
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
  padding: ${styles.doublePadding}px ${styles.doublePadding}px ${styles.sepMargin}px ${styles.doublePadding}px;
  background: rgb(68, 68, 68);
  color: #fff;
  line-height: 30px;
  h3 {
    margin: 45px 0;
  }
`;

const Message = styled.div`
  width: 100%;
  max-width: 600px;
  p {
    font-size: 100%;
  }
`;

const Groups = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  max-width: ${styles.appWidth}px;
`;

type MemberType = {
  bgSrc?: string;
};

const Member = styled.a<MemberType>`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin: ${styles.baseMargin}px;
  font-size: 60%;
  color: #fff;
  opacity: 1;
  transition: ${styles.transitionDuration}ms;
  :hover {
    opacity: 0.6;
    .icon {
      background-size: 74px;
    }
  }
  .icon {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    cursor: pointer;
    background: url(${(props) => props.bgSrc});
    background-position: center;
    background-size: 64px;
    background-color: ${styles.fontColor};
    transition: ${styles.transitionDuration}ms;
  }
  .name {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
  }
`;
