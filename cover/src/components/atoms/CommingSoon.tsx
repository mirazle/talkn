import React from 'react';
import styled from 'styled-components';

import { P } from 'components/flexes';

type Props = {
  ch: string;
  className?: string;
};

const Component: React.FC<Props> = ({ ch }) => {
  return (
    <Container>
      <P>{`Update your site that`}</P>
      <P>{`/${ch}talkn.config.json`}</P>
    </Container>
  );
};

export default Component;

const Container = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;
  height: 340px;
`;
