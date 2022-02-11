import React, { useState, useRef } from 'react';
import styled from 'styled-components';

import Flex from 'cover/components/atoms/Flex';
import * as styles from 'cover/styles';

type Props = {
  onClick: () => void;
  upperLeft?: React.ReactNode;
  upperRight?: React.ReactNode;
  bottomLeft?: React.ReactNode;
  bottomRight?: React.ReactNode;
};

const Component: React.FC<Props> = ({ onClick, upperLeft, upperRight, bottomLeft, bottomRight }) => {
  return (
    <Container flow="column nowrap" onClick={onClick}>
      <UpperFlex flow="row nowrap">
        <UpperLeft>{upperLeft}</UpperLeft>
        <span>/</span>
        <UpperRight>{upperRight}</UpperRight>
      </UpperFlex>
      <Flex flow="row nowrap">
        <BottomLeft>{bottomLeft}</BottomLeft>
        <BottomRight>{bottomRight}</BottomRight>
      </Flex>
    </Container>
  );
};

export default Component;

const Container = styled(Flex)`
  padding: 10px 30px;
  margin: 10px;
  background: #666;
  border-radius: 30px;
  color: #fff;
  transition: background ${styles.transitionDuration}ms;
  cursor: pointer;
  :hover {
    background: ${styles.themeColor};
  }
`;
const UpperFlex = styled(Flex)`
  font-size: 10px;
`;
const UpperLeft = styled.div``;
const UpperRight = styled.div``;
const BottomLeft = styled.div``;
const BottomRight = styled.div``;
