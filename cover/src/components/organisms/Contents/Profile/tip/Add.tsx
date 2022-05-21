import React from 'react';
import styled, { css } from 'styled-components';

import Flex, { AltPropsType } from 'cover/flexes';
import styles from 'cover/styles';

type Props = {
  show: boolean;
  onClick: () => void;
  alt?: AltPropsType;
  showForceHover?: boolean;
};

const Component: React.FC<Props> = ({ show, onClick, alt, showForceHover = false }) => {
  return (
    <Container
      className="AddTag"
      alignItems="center"
      justifyContent="center"
      onClick={onClick}
      show={show}
      showForceHover={showForceHover}
      alt={alt}>
      <div className="addLineHorizon" />
      <div className="addLineVertical" />
    </Container>
  );
};

export default Component;

type ContainerType = {
  show: boolean;
  showForceHover: boolean;
};

const hoverCss = css<ContainerType>`
  background: ${styles.themeColor};
  box-shadow: ${styles.shadowCircleBase};
`;

const hoverCssNoBoxShadow = css<ContainerType>`
  background: ${styles.themeColor};
`;

const width = 48;
const height = 10;
const Container = styled(Flex)<ContainerType>`
  width: ${(props) => (props.show ? '54' : 0)}px;
  height: ${(props) => (props.show ? '54' : 0)}px;
  min-width: ${(props) => (props.show ? '54' : 0)}px;
  min-height: ${(props) => (props.show ? '54' : 0)}px;
  margin: ${(props) => (props.show ? styles.baseMargin : 0)}px;
  background: ${styles.tagBgColor};
  border: 3px solid #fff;
  border-radius: 50%;
  cursor: pointer;
  transform: ${(props) => (props.show ? 'rotate(0deg) scale(1)' : 'rotate(0deg) scale(0)')};
  transition: ${(props) => getTransition(props)};
  box-shadow: 0 0 4px 1px rgb(0, 0, 0, 0.2);
  ${(props) => props.showForceHover && hoverCssNoBoxShadow};
  :hover {
    ${(props) => !props.showForceHover && hoverCss};
  }
  .addLineHorizon {
    position: relative;
    margin: 0 auto;
    width: ${height}%;
    height: ${width}%;
    background: #fff;
    border-radius: 10%;
  }
  .addLineVertical {
    position: absolute;
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
