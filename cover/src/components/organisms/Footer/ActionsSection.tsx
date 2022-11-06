import React, { useState } from 'react';
import type { FunctionComponent } from 'react';
import styled from 'styled-components';

import conf from 'common/conf';

import BoxList from 'cover/components/molecules/BoxList';
import Flex, { H5 } from 'cover/flexes';
import styles from 'cover/styles';

type Props = {
  ch: string;
};

const Component: FunctionComponent<Props> = ({ ch }) => {
  const [copied, setCopied] = useState(false);
  const handleOnClick = (e) => {
    e.target.select();
    document.execCommand('copy');
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  return (
    <Container>
      <H5 color={styles.fontLightColor}>- Actions -</H5>
      <br />
      <br />
      <h3>Update</h3>
      <Flex flow="row wrap" alignItems="center" justifyContent="center">
        <BoxList label="Live Pages" theme="dark" href={`https://${conf.coverURL}${ch}build`} />
        <BoxList label="Config" theme="dark" href={`https://${conf.coverURL}${ch}updateConfig`} />
      </Flex>
      <br />
      <br />
      <h3>Include your site</h3>
      <Message copied={copied}>{copied && 'Copied'}</Message>
      <ul>
        <li>
          <span>LiveCntをサイトに組み込む</span>
          <input onClick={handleOnClick} onChange={() => {}} value={`<script src="//tune.talkn.io/" type="text/javascript" />`} />
        </li>
        <li>
          <span>Componentをサイトに組み込む</span>
          <input onClick={handleOnClick} onChange={() => {}} value={`<script src="//components.talkn.io/" type="text/javascript" />`} />
        </li>
        <li>
          <span>Full Packageをサイトに組み込む</span>
          <input onClick={handleOnClick} onChange={() => {}} value={`<script src="//ext.talkn.io/" type="text/javascript" />`} />
        </li>
        <li>
          <span>talknAPIをサイトに組み込む</span>
          <input onClick={handleOnClick} onChange={() => {}} value={`<script src="//api.talkn.io/" type="text/javascript" />`} />
        </li>
      </ul>
    </Container>
  );
};

export default Component;

const Container = styled.section`
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: ${styles.doublePadding}px;
  background: rgb(80, 80, 80);
  color: #fff;

  ul {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: center;
    max-width: ${styles.appWidth / 1.5}px;
    padding: 0;
    margin: 0;
    text-align: center;
    list-style: none;

    li {
      display: flex;
      flex-flow: column wrap;
      align-items: flex-start;
      justify-content: flex-start;
      width: 320px;
      margin: ${styles.baseMargin}px;
    }
    span {
      text-indent: ${styles.baseSize * 2}px;
    }
    input {
      width: 100%;
      min-width: 230px;
      max-width: 320px;
      padding: 10px ${styles.basePadding}px;
      margin: ${styles.baseMargin}px;
      border: 0;
      border-radius: ${styles.baseSize * 2}px;
      outline: none;
      cursor: pointer;
      transition: ${styles.transitionDuration}ms;
      :hover {
        background: ${styles.themeColor};
        color: #fff;
      }
    }
  }
`;

type MessagePropsType = {
  copied: boolean;
};

const Message = styled.div<MessagePropsType>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${styles.baseHeight}px;
  padding: 0 ${styles.doublePadding}px;
  border-radius: ${styles.baseSize}px;
  opacity: ${(props) => (props.copied ? 1 : 0)};
  transition: ${styles.transitionDuration}ms;
`;
