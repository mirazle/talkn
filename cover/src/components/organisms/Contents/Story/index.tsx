import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

import conf from 'common/conf';
import { StoriesIndexType, configStoriesLimit } from 'common/talknConfig';

import A from 'cover/components/atoms/A';
import Flex from 'cover/components/atoms/Flex';
import HeaderSection from 'cover/components/molecules/HeaderSection';
import ControlButton from 'cover/components/organisms/Contents/Profile/button/ControlButton';
import Add from 'cover/components/organisms/Contents/Profile/tip/Add';
import StoryList from 'cover/components/organisms/Contents/Story/List';
import styles from 'cover/styles';

type Props = {
  isMyPage: boolean;
  slide?: boolean;
};

export const storiesIndexContentsInit: StoriesIndexType[] = [];
export const getScrollWidth = () => (window.innerWidth > styles.appWidth ? styles.appWidth : window.innerWidth);

const Component: React.FC<Props> = ({ isMyPage = false, slide = false }: Props) => {
  const storiesEyeCatchOrderRef = useRef<HTMLElement>();
  const [storiesIndexes, setStoriesIndexes] = useState<StoriesIndexType[]>([]);
  const [isEditable, setIsEditable] = useState(false);
  const [storiesIndex, setStoriesIndex] = useState(0);
  const [storiesEyeCatchs, setStoriesEyeCatchs] = useState<StoriesIndexType[]>(storiesIndexContentsInit);
  const storiesIndexCnt = window.talknConfig.storiesIndex.length;
  useEffect(() => {
    const _offset = window.talknStoriesPointer - configStoriesLimit / 2;
    const offset = 0 <= _offset ? _offset : 0;
    const limit = configStoriesLimit;
    const _storiesIndexes = [...window.talknConfig.storiesIndex].reverse();

    let _storiesEyeCatchs = [...window.talknConfig.storiesIndex]
      .map((storiesIndex, index) => {
        if (window.talknThread.ch !== '/') {
          //storiesIndex.no = index + 1;
        }
        return storiesIndex;
      })
      .splice(offset, limit);
    _storiesEyeCatchs = _storiesEyeCatchs.reverse();

    setStoriesIndexes(_storiesIndexes);
    setStoriesEyeCatchs(_storiesEyeCatchs);
  }, [window.talknConfig.storiesIndex]);

  useEffect(() => {
    const olElm = storiesEyeCatchOrderRef.current as HTMLOListElement;
    if (isEditable) {
      olElm.scrollTo({
        left: 0,
        behavior: 'smooth',
      });
    }
  }, [isEditable]);

  const handleOnScrollHeadEyeCatch = (e: React.UIEvent<HTMLOListElement, UIEvent>) => {
    const scrollWidth = getScrollWidth();
    const scrollIndex = (e.target as HTMLOListElement).scrollLeft / scrollWidth;
    if (Number.isInteger(scrollIndex)) {
      setStoriesIndex(scrollIndex);
    }
  };

  const handleOnClickCircle = (e) => {
    if (storiesEyeCatchOrderRef.current) {
      storiesEyeCatchOrderRef.current.scrollTo({
        left: getScrollWidth() * e.target.dataset.index,
        behavior: 'smooth',
      });
    }
  };

  const getBGContent = (eyeCatch) => {
    return (
      <>
        {eyeCatch === '' && !isEditable && <span className="noImage">NO IMAGE</span>}
        <Add onClick={() => {}} show={isEditable} />
      </>
    );
  };

  return (
    <HeaderSection
      title={'My Stories'}
      iconType="Story"
      headerMenu={
        isMyPage && (
          <Flex flow="row nowrap">
            <ControlButton
              onClick={() => {
                setIsEditable(!isEditable);
              }}
              isEditable={isEditable}
              isChangeUserTag={false}
            />
          </Flex>
        )
      }
      content={
        <>
          <Container
            ref={storiesEyeCatchOrderRef}
            onScroll={handleOnScrollHeadEyeCatch}
            slide={slide}
            storiesIndexCnt={window.talknConfig.storiesIndex.length}>
            {isMyPage && <StoryList key={`HeadEyeCatchListNo`} isMyPage={isMyPage} create />}
            {storiesEyeCatchs.length > 0 &&
              storiesEyeCatchs.map((storiesEyeCatch, i) => (
                <StoryList
                  key={`HeadEyeCatchList${i}`}
                  title={storiesEyeCatch.title}
                  eyeCatch={storiesEyeCatch.eyeCatch}
                  isMyPage={isMyPage}
                  data-no={storiesEyeCatch.no}
                  slide={slide}
                />
              ))}
          </Container>
          {storiesIndexCnt > 0 && (
            <>
              <EyeCatchCircleOrder storiesIndexCnt={storiesIndexCnt} eyeCatchScrollIndex={storiesIndex}>
                {window.talknConfig &&
                  window.talknConfig.storiesIndex.map((circle, index) => (
                    <li key={`${circle.no}-${index}`} data-index={index} onClick={handleOnClickCircle} />
                  ))}
              </EyeCatchCircleOrder>

              {slide && (
                <Flex width="100%" justifyContent="flex-end" sidePadding>
                  <A href={`//${conf.coverURL}${window.talknThread.ch}story`} hoverUnderline>
                    More →
                  </A>
                </Flex>
              )}
            </>
          )}
        </>
      }
    />
  );
};

export default Component;

type ContainerPropsType = {
  ref: any;
  storiesIndexCnt: number;
  slide?: boolean;
};

const Container = styled.ol<ContainerPropsType>`
  ${(props) => (props.slide ? 'overflow: scroll hidden' : '')};
  display: flex;
  flex-flow: row ${(props) => (props.slide ? 'nowrap' : 'wrap')};
  align-items: flex-start;
  justify-content: ${(props) => {
    if (props.slide) {
      return props.storiesIndexCnt < 3 && props.storiesIndexCnt !== 0 ? 'center' : 'flex-start';
    } else {
      return 'flex-start';
    }
  }};
  width: 100%;
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
