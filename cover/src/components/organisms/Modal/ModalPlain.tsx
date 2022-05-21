import React from 'react';
import type { FunctionComponent } from 'react';
import styled from 'styled-components';

import Flex, { FlexBoxLayoutPropsType, flexLayoutPropsInit, BoxLayoutPropsType, boxLayoutPropsInit } from 'cover/flexes';
import styles from 'cover/styles';

type Props = {
  show: boolean;
  closeModal: () => void;
  children: React.ReactNode;
} & BoxLayoutPropsType &
  FlexBoxLayoutPropsType;

const modalContainerClassName = 'ModalContainer';

const Component: FunctionComponent<Props> = (props: Props) => {
  const p: Props = { ...boxLayoutPropsInit, ...flexLayoutPropsInit, width: styles.spLayoutStrictWidthPx, ...props };
  const handleOnClick = (e) => {
    if (e.target.className.indexOf(modalContainerClassName) >= 0) {
      p.closeModal();
    }
  };

  return (
    <Container className={modalContainerClassName} show={p.show} onClick={handleOnClick} onTransitionEnd={() => {}}>
      <Board className={`${modalContainerClassName}Board`} show={p.show} width={p.width}>
        <Flex className={`${modalContainerClassName}Flex`} flow={p.flow}>
          {p.children}
        </Flex>
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
  background-color: rgb(0, 0, 0, 0.3);
  z-index: ${(props) => (props.show ? 1000 : -1)};
  opacity: ${(props) => (props.show ? 1 : 0)};
  transition: background-color ${styles.transitionDuration}ms;
`;

type BoardTypeProps = {
  show: boolean;
  width: string;
};

const Board = styled.section<BoardTypeProps>`
  width: ${(props) => (props.width ? props.width : 'fit-content')};
  height: fit-content;
  padding: ${styles.basePadding}px;
  ${styles.alphaBgSet};
  border-radius: ${styles.borderRadius}px;
  box-shadow: ${styles.shadowHorizonBase};
  transition: transform ${styles.transitionDuration}ms;
  transform: translateY(${(props) => (props.show ? 0 : `${styles.baseSize * 2}px`)});
  @media (max-width: ${styles.spLayoutStrictWidth}px) {
    width: 100vw;
    height: 100vh;
    border-radius: 0;
  }
`;
