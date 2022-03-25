import * as React from 'react';
import type { FunctionComponent } from 'react';
import styled from 'styled-components';

import { StoriesIndexType } from 'common/talknConfig';

import styles from 'cover/styles';

type Props = {
  ch: string;
  storiesIndexCnt: number;
  eyeCatchScrollIndex: number;
  storiesEyeCatchs: StoriesIndexType[];
  storiesEyeCatchOrderRef: React.MutableRefObject<HTMLElement>;
  handleOnClickCircle: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
  slide?: boolean;
};

const Component: FunctionComponent<Props> = ({ storiesIndexCnt, eyeCatchScrollIndex, handleOnClickCircle }) => {
  return (
    <Container storiesIndexCnt={storiesIndexCnt} eyeCatchScrollIndex={eyeCatchScrollIndex}>
      {window.talknConfig &&
        window.talknConfig.storiesIndex.map((circle, index) => (
          <li key={`${circle.no}-${index}`} data-index={index} onClick={handleOnClickCircle} />
        ))}
    </Container>
  );
};

export default Component;

type ContainerPropsType = {
  storiesIndexCnt: number;
  eyeCatchScrollIndex: number;
};

const Container = styled.div<ContainerPropsType>`
  display: none;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-around;
  width: calc(${(props) => getHeadEyeCatchSelectOrderWidth(props.storiesIndexCnt)}% - ${styles.doubleMargin}px);
  margin: ${styles.baseMargin}px;
  li {
    width: ${styles.baseSize}px;
    height: ${styles.baseSize}px;
    margin: ${styles.baseSize}px;
    background: ${styles.borderColor};
    border-radius: ${styles.baseSize}px;
    list-style: none;
    cursor: pointer;
  }
  li[data-index='${(props) => props.eyeCatchScrollIndex}'] {
    background: ${styles.fontColor};
  }
  @media (max-width: ${styles.spLayoutWidth}px) {
    li {
      margin: ${styles.baseSize / 2}px;
    }
  }
  @media (max-width: ${styles.spLayoutStrictWidth}px) {
    display: flex;
    li {
      width: 10px;
      min-width: 10px;
      height: 10px;
      min-height: 10px;
      margin: 10px;
    }
  }
`;

const getHeadEyeCatchSelectOrderWidth = (storiesIndexCnt): number => {
  if (storiesIndexCnt < 10) return Number(`${storiesIndexCnt}0`);
  return 100;
};
