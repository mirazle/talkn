import * as React from 'react';
import type { FunctionComponent } from 'react';
import styled from 'styled-components';

import styles from 'cover/styles';

type Props = {};

const DesignSection: FunctionComponent<Props> = () => {
  return (
    <Container>
      <Content>
        <BarArrowWrap>
          <Bar />
          <BarArrow />
        </BarArrowWrap>
        <Logo />
      </Content>
    </Container>
  );
};

export default DesignSection;

const Container = styled.section`
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 1680px;
  margin: 0 auto;
  background: #111;
`;

const Content = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  max-width: ${styles.appWidth}px;
  height: inherit;
  margin: 0 auto;
  background: url(https://assets.talkn.io/img/walk2.png) 10% 85% / 240px no-repeat;
  @media (max-width: ${styles.spLayoutWidth}px) {
    background: url(https://assets.talkn.io/img/walk2.png) 50% 100% / 240px no-repeat;
  }
`;

const BarArrowWrap = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-items: flex-start;
  justify-content: flex-start;
  width: 300px;
  height: calc(80% + 190px);
  margin-left: -45%;
  @media (max-width: ${styles.spLayoutWidth}px) {
    height: calc(100% + 190px);
    margin-left: 0;
  }
`;

const Bar = styled.div`
  width: 40px;
  height: 80%;
  background: rgb(35, 35, 35);
`;

const BarArrow = styled.div`
  width: 150px;
  height: 150px;
  padding: 0;
  margin: 0;
  border-color: transparent transparent rgb(35, 35, 35) transparent;
  border-style: solid;
  border-width: 150px 150px 150px 0;
  transform: translate3d(-104px, -203px, 0) rotate(315deg);
`;

const Logo = styled.div`
  position: absolute;
  width: 512px;
  height: 512px;
  background: url(https://assets.talkn.io/img/logo_glay.png) 100% / 512px no-repeat;
  opacity: 0.2;
  transform: translate3d(-100px, 640px, 0);
  @media (max-width: ${styles.spLayoutWidth}px) {
    transform: translate3d(-100px, 780px, 0);
  }
`;
