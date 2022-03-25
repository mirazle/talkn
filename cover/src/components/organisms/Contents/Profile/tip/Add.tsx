import React from 'react';
import styled from 'styled-components';

import styles from 'cover/styles';

type Props = {
  show: boolean;
  onClick: () => void;
};

const Component: React.FC<Props> = ({ show, onClick }) => {
  return (
    <Container onClick={onClick} show={show}>
      <div className="addLineHorizon" />
      <div className="addLineVertical" />
    </Container>
  );
};

export default Component;

type ContainerType = {
  show: boolean;
};

const width = 48;
const height = 10;
const Container = styled.div<ContainerType>`
  width: 54px;
  height: 54px;
  min-width: 54px;
  min-height: 54px;
  margin: ${styles.baseMargin}px;
  background: ${styles.themeColor};
  border: 3px solid #fff;
  border-radius: 50%;
  cursor: pointer;
  transform: ${(props) => (props.show ? 'rotate(0deg) scale(1)' : 'rotate(0deg) scale(0)')};
  transition: transform ${styles.transitionDuration}ms, background ${styles.transitionDuration}ms, box-shadow ${styles.transitionDuration}ms;
  box-shadow: 0 0 4px 1px rgb(0, 0, 0, 0.2);
  :hover {
    background: ${styles.themeColor};
    box-shadow: ${styles.shadowCircleDark};
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
