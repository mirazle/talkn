import * as React from 'react';
import type { FunctionComponent } from 'react';
import styled from 'styled-components';

import conf from 'common/conf';

import Flex from 'cover/components/atoms/Flex';
import Title from 'cover/components/atoms/Title';
import * as styles from 'cover/styles';

type Props = {
  ch: string;
};

const Component: FunctionComponent<Props> = ({ ch }) => {
  return (
    <Container>
      <Title type="Section">- Configiration -</Title>
      <br />
      <br />
      <br />
      <h3>Download</h3>
      <Flex flow="row wrap">
        <a href={window.talknInterviewUrls && window.talknInterviewUrls.index}>index</a>
        <a href={window.talknInterviewUrls && window.talknInterviewUrls.interview}>this interview</a>
      </Flex>
      <h3>Update</h3>
      <Flex flow="row wrap">
        <a href={`https://${conf.coverURL}${ch}update`}>update</a>
      </Flex>
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
  a {
    display: block;
    padding: ${styles.doubleMargin}px ${styles.doubleMargin}px;
    margin: ${styles.quadMargin}px ${styles.doubleMargin}px;
    background: rgb(130, 130, 130);
    color: #fff;
    border: 0;
    cursor: pointer;
    transition: ${styles.transitionDuration};
    :hover {
      background: rgb(68, 68, 68);
    }
  }
`;
