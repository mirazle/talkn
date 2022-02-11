import React, { useState, useRef } from 'react';
import styled from 'styled-components';

import Flex from 'cover/components/atoms/Flex';
import * as styles from 'cover/styles';

type Props = {
  onClick: () => void;
  label: string;
};

const Component: React.FC<Props> = ({ onClick, label }) => {
  return (
    <Container flow="column nowrap" onClick={onClick}>
      {label}
    </Container>
  );
};

export default Component;

const Container = styled(Flex)`
  padding: 10px 30px;
  margin: 10px;
  background: ${styles.tagBgColor};
  border-radius: 30px;
  color: #fff;
  transition: background ${styles.transitionDuration}ms;
  cursor: pointer;
  :hover {
    background: ${styles.themeColor};
  }
`;
