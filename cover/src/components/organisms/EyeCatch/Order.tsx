import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

import conf from 'common/conf';
import { StoriesIndexType, configStoriesLimit } from 'common/talknConfig';

import { HeadEyeCatchList, ViewAnchor, getScrollWidth } from 'cover/components/organisms/Contents/Story/index';
import styles from 'cover/styles';

export const storiesIndexContentsInit: StoriesIndexType[] = [];
type Props = {
  slide?: boolean;
};

const Component: React.FC<Props> = ({ slide }) => {
  const storiesEyeCatchOrderRef = useRef<HTMLElement>();
  const [storiesIndex, setStoriesIndex] = useState<StoriesIndexType[]>(storiesIndexContentsInit);
  const [storiesEyeCatchs, setStoriesEyeCatchs] = useState<StoriesIndexType[]>(storiesIndexContentsInit);
  const [eyeCatchScrollIndex, setEyeCatchScrollIndex] = useState(0);
  const storiesIndexCnt = window.talknConfig.storiesIndex.length;

  useEffect(() => {
    if (storiesEyeCatchOrderRef.current) {
      const scrollIndex = Array.from(storiesEyeCatchOrderRef.current.children).findIndex((child) => {
        const childElement = child as HTMLElement;
        return Number(childElement.getAttribute('data-no')) === window.talknStoriesPointer;
      });

      if (scrollIndex >= 0) {
        storiesEyeCatchOrderRef.current.scrollLeft = getScrollWidth() * scrollIndex;
        setEyeCatchScrollIndex(scrollIndex);
      }
    }
  }, [storiesEyeCatchOrderRef.current, window.talknStoriesPointer]);

  useEffect(() => {
    const _offset = window.talknStoriesPointer - configStoriesLimit / 2;
    const offset = 0 <= _offset ? _offset : 0;
    const limit = configStoriesLimit;
    const _storiesIndex = [...window.talknConfig.storiesIndex].reverse();

    let _storiesEyeCatchs = [...window.talknConfig.storiesIndex]
      .map((storiesIndex, index) => {
        if (window.talknThread.ch !== '/') {
          //storiesIndex.no = index + 1;
        }
        return storiesIndex;
      })
      .splice(offset, limit);
    _storiesEyeCatchs = _storiesEyeCatchs.reverse();

    setStoriesIndex(_storiesIndex);
    setStoriesEyeCatchs(_storiesEyeCatchs);
  }, [window.talknConfig.storiesIndex]);

  const handleOnScrollHeadEyeCatch = (e) => {};

  const handleOnClickCircle = (e) => {
    if (storiesEyeCatchOrderRef.current) {
      storiesEyeCatchOrderRef.current.scrollTo({
        left: getScrollWidth() * e.target.dataset.index,
        behavior: 'smooth',
      });
    }
  };
  return (
    <>
      <Container ref={storiesEyeCatchOrderRef} slide onScroll={handleOnScrollHeadEyeCatch} storiesIndexCnt={storiesIndexCnt}>
        {storiesEyeCatchs.map((storiesEyeCatch, i) => (
          <HeadEyeCatchList
            key={`HeadEyeCatchList${i}`}
            slide
            className="HeadEyeCatchList"
            data-no={storiesEyeCatch.no}
            eyeCatch={storiesEyeCatch.eyeCatch}
            storiesIndexCnt={storiesIndexCnt}>
            <ViewAnchor href={`https://${conf.coverURL}${storiesEyeCatch.ch}story/${storiesEyeCatch.no}`}>
              <div className="creatorBg">{storiesEyeCatch.eyeCatch === '' && 'NO IMAGE'}</div>
              <div className="creatorDescription">{storiesEyeCatch.title}</div>
            </ViewAnchor>
          </HeadEyeCatchList>
        ))}
      </Container>
      {window.talknConfig && window.talknConfig.storiesIndex.length > 0 && (
        <EyeCatchCircleOrder storiesIndexCnt={storiesIndexCnt} eyeCatchScrollIndex={eyeCatchScrollIndex}>
          {window.talknConfig &&
            window.talknConfig.storiesIndex.map((circle, index) => (
              <li key={`${circle.no}-${index}`} data-index={index} onClick={handleOnClickCircle} />
            ))}
        </EyeCatchCircleOrder>
      )}
    </>
  );
};

export default Component;

type ContainerPropsType = {
  ref: any;
  slide?: boolean;
  storiesIndexCnt: number;
  onScroll: any;
};

const Container = styled.div<ContainerPropsType>`
  ${(props) => (props.slide ? 'overflow: scroll hidden' : '')};
  display: flex;
  flex-flow: row ${(props) => (props.slide ? 'nowrap' : 'wrap')};
  align-items: flex-start;
  justify-content: ${(props) => {
    if (props.slide) {
      return props.storiesIndexCnt < 3 ? 'center' : 'flex-start';
    } else {
      return 'flex-start';
    }
  }};
  width: 100%;
  max-width: ${styles.appWidth}px;
  padding: 0;
  margin: 0 auto;
  ${(props) => (props.slide ? 'scroll-snap-type: x mandatory' : '')};
  @media (max-width: ${styles.spLayoutWidth}px) {
    justify-content: flex-start;
  }
  @media (max-width: ${styles.spLayoutStrictWidth}px) {
    justify-content: flex-start;
  }
`;

type EyeCatchCircleOrderPropsType = {
  storiesIndexCnt: number;
  eyeCatchScrollIndex: number;
};

const EyeCatchCircleOrder = styled.ol<EyeCatchCircleOrderPropsType>`
  display: none;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-around;
  width: calc(${(props) => getHeadEyeCatchSelectOrderWidth(props.storiesIndexCnt)}% - ${styles.doubleMargin}px);
  padding: 0;
  margin: 0 auto;
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
