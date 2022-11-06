import * as React from 'react';
import type { FunctionComponent } from 'react';
import styled from 'styled-components';

import { layouts } from 'components/styles';

type Props = {};

const MessageSection: FunctionComponent<Props> = () => {
  return (
    <Container>
      <Message>- Update the internet for creators -</Message>
      <Copyright>Copyright © talkn.</Copyright>
    </Container>
  );
};

export default MessageSection;

const Container = styled.section`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: ${layouts.sepMargin}px 0;
  color: #fff;
  background: #111;
  @media (max-width: ${layouts.spLayoutWidth}px) {
    padding: 60px 0 120px;
  }
`;

const Message = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  margin: 20px;
`;

const Copyright = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 20px;
`;
