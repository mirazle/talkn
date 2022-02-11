import React from 'react';
import type { FunctionComponent } from 'react';
import styled from 'styled-components';

import Flex, { FlexLayoutPropsType, flexLayutPropsInit } from 'cover/components/atoms/Flex';
import * as styles from 'cover/styles';
import { LayoutPropsType, layoutPropsInit } from 'cover/styles/Layout';

type Props = {
  show: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
} & LayoutPropsType &
  FlexLayoutPropsType;

const modalContainerClassName = 'ModalContainer';

const Component: FunctionComponent<Props> = (props: Props) => {
  const p: Props = { ...layoutPropsInit, ...flexLayutPropsInit, ...props };
  const handleOnClick = (e) => {
    if (e.target.className.indexOf(modalContainerClassName) >= 0) {
      p.setShowModal(false);
    }
  };

  return (
    <Container className={modalContainerClassName} show={p.show} onClick={handleOnClick}>
      <Board show={p.show}>
        <Flex flow={p.flow}>{p.children}</Flex>
      </Board>
    </Container>
  );
};

export default Component;

type ContainerTypeProps = {
  show: boolean;
};

const Container = styled.div<ContainerTypeProps>`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, ${(props) => (props.show ? '0.4' : '0')});
  z-index: ${(props) => (props.show ? 1000 : -1)};
  opacity: ${(props) => (props.show ? 1 : 0)};
  transition: background-color ${styles.transitionDuration}ms;
`;

const Board = styled.section<ContainerTypeProps>`
  width: fit-content;
  height: fit-content;
  background: rgb(255, 255, 255);
  padding: ${styles.basePadding}px;
  border-radius: ${styles.borderRadius}px;
  box-shadow: ${styles.horizonBoxShadow};
  transition: transform ${styles.transitionDuration}ms;
  transform: translateY(${(props) => (props.show ? 0 : `${styles.baseSize * 2}px`)});
`;
