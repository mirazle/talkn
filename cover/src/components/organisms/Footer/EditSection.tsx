import * as React from 'react';
import type { FunctionComponent } from 'react';
import styled from 'styled-components';

import Flex from 'cover/components/atoms/Flex';
import Title from 'cover/components/atoms/Title';
import * as styles from 'cover/styles';

type Props = {};

const Component: FunctionComponent<Props> = () => {
  return (
    <Container>
      <Title type="Section">- Edit Interview -</Title>
      <Flex flow="row wrap">
        <a href={window.talknInterviewUrls && window.talknInterviewUrls.index}>INDEX</a>
        <a href={window.talknInterviewUrls && window.talknInterviewUrls.interview}>OGP</a>
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
  background: rgb(68, 68, 68);
  color: #fff;
  a {
    display: block;
    padding: ${styles.doubleMargin}px ${styles.doubleMargin}px;
    margin: ${styles.quadMargin}px ${styles.doubleMargin}px;
    background: ${styles.fontColor};
    color: #fff;
    border: 0;
    cursor: pointer;
    transition: ${styles.transitionDuration};
    :hover {
      background: #fff;
      color: ${styles.fontColor};
    }
  }
`;
