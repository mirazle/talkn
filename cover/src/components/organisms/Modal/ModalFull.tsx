import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

import Spinner from 'cover/components/atoms/icon/Spinner';
import Checkmark from 'cover/components/atoms/svg/Checkmark';
import Flex, {
  FlexBoxLayoutPropsType,
  flexLayoutPropsInit,
  useFlexesContext,
  FlexesContextType,
  BoxLayoutPropsType,
  boxLayoutPropsInit,
} from 'cover/flexes';
import styles from 'cover/styles';

type Props = {
  show: boolean;
  content: React.ReactNode;
  header?: React.ReactNode;
  menu?: React.ReactNode;
  footer?: React.ReactNode;
  contentIndex?: number;
  isLoading?: boolean;
  isCheckAnimation?: boolean;
  handleOnChangeContentIndex?: (contentIndex: number) => void;
  handleOnClickClose?: () => void;
} & BoxLayoutPropsType &
  FlexBoxLayoutPropsType;

const defaultOverflow = 'hidden scroll';
const space = styles.doubleMargin;
const partsHeight = 80;
const modalContainerClassName = 'ModalFull';

const Component: React.FC<Props> = (props: Props) => {
  const contentOrderRef = useRef(<div />);
  const globalContext: FlexesContextType = useFlexesContext();
  const [contentIndex, setContentIndex] = useState(props.contentIndex ? props.contentIndex : 0);
  const p: Props = {
    ...boxLayoutPropsInit,
    ...flexLayoutPropsInit,
    overflow: defaultOverflow,
    width: styles.spLayoutStrictWidthPx,
    ...props,
  };
  const optinalPartCnt = getOptionalPartsCnt(p);
  const contentHeight = getContentHeight(globalContext, optinalPartCnt);
  const isContentLoading = p.isLoading || (globalContext.isSpLayout && contentIndex === 0);
  const isLoading = p.isLoading && !globalContext.isSpLayout && !globalContext.isSpLayoutStrict;
  const handleOnScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    const elm = e.target as HTMLElement;
    if (elm.scrollLeft === 0) {
      setContentIndex(0);
      p.handleOnChangeContentIndex && p.handleOnChangeContentIndex(0);
    } else if (elm.scrollLeft === elm.scrollWidth / 2) {
      setContentIndex(1);
      p.handleOnChangeContentIndex && p.handleOnChangeContentIndex(1);
    }
  };

  useEffect(() => {
    if (props.contentIndex !== undefined) {
      setContentIndex(props.contentIndex);
      if (props.contentIndex === 1) {
        const contentOrderElm = contentOrderRef.current as unknown as HTMLElement;
        contentOrderElm.scrollTo({
          left: contentOrderElm.scrollWidth,
          behavior: 'smooth',
        });
      }
    }
  }, [props.contentIndex]);

  return (
    <Container
      className={modalContainerClassName}
      show={p.show}
      onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const elm = e.target as HTMLElement;
        const isClose = Boolean(Array.from(elm.classList).find((className) => className === modalContainerClassName));
        if (isClose) {
          p.handleOnClickClose && p.handleOnClickClose();
        }
      }}>
      <SectionBoard className={`${modalContainerClassName}Board`} show={p.show} width={p.width}>
        {p.header && (
          <Header
            className={`${modalContainerClassName}Header`}
            width="100%"
            alignItems="center"
            justifyContent="space-between"
            border="underline"
            sidePadding>
            {p.header}
          </Header>
        )}
        <BodyOrder ref={contentOrderRef} className="ModalFullBodyOrder" contentHeight={contentHeight} onScroll={handleOnScroll}>
          <Menu
            className="ModalFullMenu"
            width={`${styles.appMenuMinWidth}px`}
            flow="column nowrap"
            overflow="hidden scroll"
            upperPadding
            sidePadding
            bottomPadding>
            {p.menu}
          </Menu>
          <Content className="ModalFullContent" width="100%" flow="row nowrap" overflow="hidden scroll" border="leftline">
            {isContentLoading ? (
              <Flex flow="column nowrap" width="100%" height="100%" alignItems="center" justifyContent="center">
                <Spinner />
              </Flex>
            ) : (
              p.content
            )}
          </Content>
        </BodyOrder>
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
      {p.isCheckAnimation && <Checkmark />}
      {/* isLoading && <Svg.Loarding />*/}
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
  background-color: ${styles.fullBackgroundColor};
  z-index: ${(props) => (props.show ? 1000 : -1)};
  opacity: ${(props) => (props.show ? 1 : 0)};
  transition: background-color ${styles.transitionDuration}ms;
`;

type SectionBoardTypeProps = {
  show: boolean;
  width: string;
};

const SectionBoard = styled.section<SectionBoardTypeProps>`
  overflow: hidden;
  width: ${(props) => (props.width ? props.width : 'fit-content')};
  max-width: ${styles.appWidth}px;
  height: fit-content;
  max-height: calc(100vh - ${space * 2}px);
  padding: 0;
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

type BodyOrderPropsType = {
  ref: any;
  contentHeight: string;
} & FlexBoxLayoutPropsType;

const BodyOrder = styled.ol<BodyOrderPropsType>`
  overflow: hidden;
  flex-flow: row nowrap;
  display: flex;
  width: 100%;
  height: ${(props) => props.contentHeight};
  min-height: ${(props) => props.contentHeight};
  max-height: ${(props) => props.contentHeight};
  padding: 0;
  margin: 0;
  @media (max-width: ${styles.spLayoutWidth}px) {
    overflow: scroll hidden;
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    scroll-snap-type: x mandatory;
  }
`;

const Menu = styled(Flex)<FlexBoxLayoutPropsType>`
  width: ${(props) => props.width};
  min-width: ${(props) => props.width};
  max-width: ${(props) => props.width};
  @media (max-width: ${styles.spLayoutWidth}px) {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    scroll-snap-align: start;
  }
`;

type ContentPropsType = FlexBoxLayoutPropsType;

const Content = styled(Flex)<ContentPropsType>`
  @media (max-width: ${styles.spLayoutWidth}px) {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    scroll-snap-align: start;
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

const getContentHeight = (globalContext: FlexesContextType, optinalPartCnt) => {
  const addSpace = globalContext.isSpLayoutStrict ? 0 : space;
  return `${globalContext.innerHeight - (partsHeight + addSpace) * optinalPartCnt}px`;
};
