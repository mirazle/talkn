import React from 'react';
import styled from 'styled-components';

import Flex from 'cover/flexes';
import styles from 'cover/styles';

type Props = {
  onClick: () => void;
  disabled: boolean;
};

const Component: React.FC<Props> = ({ onClick, disabled = false }) => {
  return (
    <Container onClick={onClick} disabled={disabled}>
      RESET
    </Container>
  );
};

export default Component;

type ContainerPropsType = {
  disabled: boolean;
};

const Container = styled(Flex)<ContainerPropsType>`
  padding: ${styles.doublePadding}px;
  border: 1px solid ${styles.brightColor};
  border-radius: 5px;
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  background: ${(props) => (props.disabled ? 'none' : styles.brightColor)};
  color: ${(props) => (props.disabled ? styles.brightColor : '#fff')};
  transition: ${styles.transitionDuration}ms;
  ${(props) => getHover(props.disabled)};
`;

const getHover = (disabled) => {
  if (disabled) {
    return '';
  } else {
    return `
    :hover {
      background: ${(props) => (props.disabled ? styles.brightColor : styles.brightColor)};
      color: #fff;
      box-shadow: ${styles.shadowHorizonBright};
    }
  `;
  }
};
