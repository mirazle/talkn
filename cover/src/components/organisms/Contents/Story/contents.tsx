import * as React from 'react';
import styled from 'styled-components';

import StorySection from 'cover/components/molecules/StorySection';
import { H5 } from 'cover/flexes';
import styles from 'cover/styles';
import Node, { Props as NodeProps } from 'cover/utils/Node';

export type NavigationLayout = {
  width: number;
  marginTop: number;
  marginRight: number;
  marginBottom: number;
  marginLeft: number;
  paddingTop: number;
  paddingRight: number;
  paddingBottom: number;
  paddingLeft: number;
};

type Props = {
  navigationLayout: NavigationLayout;
  storiesRef: React.MutableRefObject<HTMLElement>;
  resumeRef: React.MutableRefObject<HTMLElement>;
  storiesPointer: number;
  handleOnClickNav: (chapterIndex: number) => void;
};

const Component: React.FC<Props> = ({ navigationLayout, storiesRef, resumeRef, storiesPointer, handleOnClickNav }) => {
  return (
    <Container navigationLayout={navigationLayout}>
      <Stories className={'Stories'} ref={storiesRef}>
        {window.talknDatas.stories.sections.map(({ title, flow, nodes }, i) => {
          return (
            <StorySection key={`Section${i}`} number={i + 1} title={title} flow={flow}>
              {nodes.map((node: NodeProps, j) => (
                <Node key={`${node.type}-${i}-${j}`} type={node.type} props={node.props} nodes={node.nodes} />
              ))}
            </StorySection>
          );
        })}
      </Stories>
      <Navigation ref={resumeRef} navigationLayout={navigationLayout}>
        <HFiveCustom>- 目次 -</HFiveCustom>
        {window.talknDatas.stories && window.talknDatas.stories.sections.length > 0 && (
          <NavigationOrder storiesPointer={storiesPointer}>
            {window.talknDatas.stories.sections.map(({ resume }, index) => {
              const number = index < 9 ? `0${index + 1}` : index + 1;
              return (
                <li key={`${resume}${index}`}>
                  <AnchorRow onClick={() => handleOnClickNav(index)}>
                    <span className="number">{number}.</span>
                    <span className="resume">{resume}</span>
                  </AnchorRow>
                </li>
              );
            })}
          </NavigationOrder>
        )}
      </Navigation>
    </Container>
  );
};

export default Component;

type StoriesPropsType = {
  navigationLayout: NavigationLayout;
};

const Container = styled.div<StoriesPropsType>`
  display: flex;
  flex-flow: ${(props) => (props.navigationLayout ? 'row nowrap' : 'column nowrap')};
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  max-width: ${styles.appWidth}px;
  height: auto;
  margin: 0 auto;
  @media (max-width: ${styles.spLayoutWidth}px) {
    flex-flow: column-reverse;
  }
`;

type StoriesRefType = {
  ref: any;
};

const layoutPaddingLeft = styles.doublePadding;
const Stories = styled.div<StoriesRefType>`
  flex: 1 1 auto;
  overflow: hidden;
  height: auto;
  padding-right: 0;
  padding-left: ${layoutPaddingLeft}px;
  @media (max-width: ${styles.spLayoutWidth}px) {
    padding-right: ${styles.basePadding}px;
    padding-left: ${styles.basePadding}px;
  }
  @media (max-width: ${styles.spLayoutStrictWidth}px) {
    padding-right: 0;
    padding-left: 0;
  }
`;

const Navigation = styled.nav<{ navigationLayout: NavigationLayout }>`
  flex: 1 1 auto;
  z-index: 0;
  position: sticky;
  top: ${styles.appHeaderHeight * 2 + styles.baseMargin}px;
  width: 100%;
  min-width: 320px;
  max-width: 320px;
  padding-top: ${styles.basePadding}px;
  padding-right: ${styles.basePadding}px;
  padding-bottom: ${styles.doublePadding}px;
  padding-left: ${styles.basePadding}px;
  margin: ${styles.quadMargin}px ${styles.baseMargin}px ${styles.baseMargin}px ${styles.baseMargin}px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid ${styles.borderColor};
  border-radius: 15px;
  ol,
  li {
    list-style: none;
  }
  li {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 20px;
    line-height: 24px;
  }
  a {
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-start;
    justify-content: flex-start;
    line-height: 40px;
  }
  @media (max-width: ${styles.spLayoutWidth}px) {
    z-index: auto;
    position: relative;
    top: 0;
    width: calc(100% - ${styles.doubleMargin}px);
    min-width: calc(100% - ${styles.doubleMargin}px);
    padding: 0;
    text-align: center;
    li {
      justify-content: center;
    }
  }
`;
type NavigationOrderPropsType = {
  storiesPointer: number;
};

const NavigationOrder = styled.ol<NavigationOrderPropsType>`
  padding: 0;
  margin: 0 auto;
  li:nth-child(${(props) => props.storiesPointer + 1}) a {
    font-weight: 400;
    letter-spacing: 1.5px;
  }
`;

const AnchorRow = styled.a`
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
  justify-content: flex-start;
  line-height: 40px;
  :hover {
    font-weight: 300;
    .resume {
      text-decoration: underline;
    }
  }
  .number {
    width: 35px;
    min-width: 35px;
  }
`;

const HFiveCustom = styled(H5)`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
`;
