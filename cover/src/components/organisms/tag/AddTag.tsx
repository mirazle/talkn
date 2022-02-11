import React, { useState, useRef } from 'react';
import styled from 'styled-components';

import * as styles from 'cover/styles';

type Props = {
  onClick: () => void;
};

const Component: React.FC<Props> = ({ onClick }) => {
  return (
    <Container onClick={onClick}>
      <div className="addLineHorizon" />
      <div className="addLineVertical" />
    </Container>
  );
};

export default Component;

const width = 48;
const height = 10;
const Container = styled.div`
  width: ${styles.baseSize * 3}px;
  height: ${styles.baseSize * 3}px;
  margin: ${styles.baseMargin}px;
  background: ${styles.tagBgColor};
  border-radius: 50%;
  cursor: pointer;
  transition: background ${styles.transitionDuration}ms;
  transform: translate(0px, 0px);
  :hover {
    background: ${styles.themeColor};
  }
  .addLineHorizon {
    position: relative;
    top: 25%;
    margin: 0 auto;
    width: ${height}%;
    height: ${width}%;
    background: #fff;
    border-radius: 10%;
  }
  .addLineVertical {
    position: relative;
    top: -4%;
    margin: 0 auto;
    width: ${width}%;
    height: ${height}%;
    background: #fff;
    border-radius: 10%;
  }
`;
