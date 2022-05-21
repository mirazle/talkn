import React from 'react';
import styled from 'styled-components';

import Flex, {
  FlexBoxLayoutPropsType,
  flexLayoutPropsInit,
  BoxLayoutPropsType,
  boxLayoutPropsInit,
  useFlexesContext,
  FlexesContextType,
} from 'cover/flexes';
import styles from 'cover/styles';

type Props = {
  show: boolean;
  closeModal: () => void;
  header?: React.ReactNode;
  content: React.ReactNode;
  footer?: React.ReactNode;
  fullHeight?: boolean;
} & BoxLayoutPropsType &
  FlexBoxLayoutPropsType;

const defaultOverflow = 'hidden scroll';
const space = styles.doubleMargin;
const partsHeight = 80;
const modalContainerClassName = 'ModalContainer';

const Component: React.FC<Props> = (props: Props) => {
  const globalContext: FlexesContextType = useFlexesContext();
  const p: Props = {
    ...boxLayoutPropsInit,
    ...flexLayoutPropsInit,
    overflow: defaultOverflow,
    width: styles.spLayoutStrictWidthPx,
    ...props,
  };
  const optinalPartCnt = getOptionalPartsCnt(p);

  return (
    <Container
      className={modalContainerClassName}
      show={p.show}
      alignItems="center"
      justifyContent="center"
      width="100vw"
      height="100vh"
      onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const elm = e.target as HTMLElement;
        const isClose = Boolean(Array.from(elm.classList).find((className) => className === modalContainerClassName));
        if (isClose) {
          p.closeModal();
        }
      }}>
      <SectionBoard className={`${modalContainerClassName}Board`} show={p.show} width={p.width}>
        {p.header && (
          <Header
            className={`${modalContainerClassName}Header`}
            alignItems="center"
            justifyContent="flex-start"
            border="underline"
            sidePadding>
            {p.header}
          </Header>
        )}
        <Content
          className={`${modalContainerClassName}Content`}
          flow={p.flow}
          windowInnerHeight={globalContext.innerHeight}
          fullHeight={p.fullHeight}
          optinalPartCnt={optinalPartCnt}
          overflow={p.overflow}
          upperPadding
          sidePadding
          bottomPadding>
          {p.content}
        </Content>
        {p.footer && (
          <Footer
            className={`${modalContainerClassName}Footer`}
            width="100%"
            alignItems="center"
            justifyContent="center"
            border="topline"
            sidePadding>
            {p.footer}
          </Footer>
        )}
      </SectionBoard>
    </Container>
  );
};

export default Component;

type ContainerTypeProps = {
  show: boolean;
};

const Container = styled(Flex)<ContainerTypeProps>`
  position: fixed;
  top: 0;
  left: 0;

  background-color: rgb(0, 0, 0, 0.3);
  z-index: ${(props) => (props.show ? 1000 : -1)};
  opacity: ${(props) => (props.show ? 1 : 0)};
  transition: background-color ${styles.transitionDuration}ms;
`;

type BoardTypeProps = {
  show: boolean;
  width: string;
};

const SectionBoard = styled.section<BoardTypeProps>`
  overflow: hidden;
  width: ${(props) => (props.width ? props.width : 'fit-content')};
  height: fit-content;
  max-height: calc(100vh - ${space * 2}px);
  padding: 0 ${space}px;
  margin: ${space}px;
  ${styles.alphaBgSet};
  border-radius: ${styles.borderRadius}px;
  box-shadow: ${styles.shadowHorizonBase};
  transition: transform ${styles.transitionDuration}ms;
  transform: translateY(${(props) => (props.show ? 0 : `${styles.baseSize * 2}px`)});
  @media (max-width: ${styles.spLayoutStrictWidth}px) {
    width: 100vw;
    height: 100vh;
    max-height: none;
    padding: 0;
    margin: 0;
    border-radius: 0;
  }
`;

const Header = styled(Flex)`
  height: ${partsHeight}px;
`;

type ContentPropsType = {
  windowInnerHeight: number;
  optinalPartCnt: number;
  overflow: string;
  fullHeight?: boolean;
} & FlexBoxLayoutPropsType;

const Content = styled(Flex)<ContentPropsType>`
  overflow: ${(props) => props.overflow};
  ${(props) => (props.fullHeight ? 'height: 100vh' : '')};
  max-height: ${(props) => props.windowInnerHeight - (partsHeight + space) * props.optinalPartCnt}px;
  @media (max-width: ${styles.spLayoutStrictWidth}px) {
    max-height: ${(props) => props.windowInnerHeight - partsHeight * props.optinalPartCnt}px;
  }
`;

const Footer = styled(Flex)`
  height: ${partsHeight}px;
  @media (max-width: ${styles.spLayoutStrictWidth}px) {
    position: fixed;
    bottom: 0;
  }
`;

const getOptionalPartsCnt = (p: Props) => {
  let optinalPartCnt = 0;
  Boolean(p.header) && optinalPartCnt++;
  Boolean(p.footer) && optinalPartCnt++;
  return optinalPartCnt;
};

const getContentHeight = (windowInnerHeight, optinalPartCnt) => {
  return `${windowInnerHeight - (partsHeight + space) * optinalPartCnt}px`;
};
