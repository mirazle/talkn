import React from 'react';
import styled, { css } from 'styled-components';

import styles from 'cover/styles';

type Props = {
  show: boolean;
  onClick: () => void;
  isOnHover?: boolean;
};

const Component: React.FC<Props> = ({ show, onClick, isOnHover = true }) => {
  return (
    <Container onClick={onClick} show={show} isOnHover={isOnHover}>
      <div className="addLineHorizon" />
      <div className="addLineVertical" />
    </Container>
  );
};

export default Component;

type ContainerType = {
  show: boolean;
  isOnHover: boolean;
};

const hoverCss = css`
  background: ${styles.themeColor};
  box-shadow: ${styles.shadowCircleDark};
`;
const width = 48;
const height = 10;
const Container = styled.div<ContainerType>`
  width: ${(props) => (props.show ? '54' : 0)}px;
  height: ${(props) => (props.show ? '54' : 0)}px;
  min-width: ${(props) => (props.show ? '54' : 0)}px;
  min-height: ${(props) => (props.show ? '54' : 0)}px;
  margin: ${(props) => (props.show ? styles.baseMargin : 0)}px;
  background: ${styles.themeColor};
  border: 3px solid #fff;
  border-radius: 50%;
  cursor: pointer;
  transform: ${(props) => (props.show ? 'rotate(0deg) scale(1)' : 'rotate(0deg) scale(0)')};
  transition: ${(props) => getTransition(props)};
  box-shadow: 0 0 4px 1px rgb(0, 0, 0, 0.2);
  :hover {
    ${(props) => props.isOnHover && hoverCss};
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

const getTransition = (props: ContainerType) => {
  return props.show
    ? `transform ${styles.transitionDuration}ms, background ${styles.transitionDuration}ms, box-shadow ${styles.transitionDuration}ms`
    : '0';
};
