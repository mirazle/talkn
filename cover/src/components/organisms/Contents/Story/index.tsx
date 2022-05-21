import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

import conf from 'common/conf';
import { StoriesType, configStoriesLimit } from 'common/talknConfig';

import HeaderSection from 'cover/components/molecules/HeaderSection';
import StoryList from 'cover/components/organisms/Contents/Story/List';
import Flex, { A, Ol } from 'cover/flexes';
import styles from 'cover/styles';

type Props = {
  userId: string;
  isMyPage: boolean;
  slide?: boolean;
};

export const scrollBaseLeft = styles.baseMargin;
export const storiesInit: StoriesType[] = [];
export const getScrollWidth = () => (window.innerWidth > styles.appWidth ? styles.appWidth : window.innerWidth);

let orderElm;
const Component: React.FC<Props> = ({ userId, isMyPage = false, slide = false }: Props) => {
  const orderRef = useRef();
  const [displayStories, setDisplayStories] = useState<StoriesType[]>(storiesInit);
  const [index, setIndex] = useState(0);
  const indexCnt = window.talknDatas.config && window.talknDatas.config.stories ? window.talknDatas.config.stories.length : 0;

  useEffect(() => {
    const _offset = window.talknDatas.storiesPointer - configStoriesLimit / 2;
    const offset = 0 <= _offset ? _offset : 0;
    const limit = configStoriesLimit;
    const updateDisplayStories = [...window.talknDatas.config.stories]
      .map((stories, index) => stories)
      .splice(offset, limit)
      .reverse();

    setDisplayStories(updateDisplayStories);
  }, [window.talknDatas.config.stories]);

  const handleOnScroll = (e: React.UIEvent<HTMLOListElement, UIEvent>) => {
    const olElm = e.target as HTMLOListElement;
    if (olElm.children.length > 0) {
      const oneScrollWidth = window.innerWidth - scrollBaseLeft * 2;
      const index = olElm.scrollLeft / oneScrollWidth;
      if (Number.isInteger(index)) {
        setIndex(index);
      }
    }
  };

  const handleOnClickCircle = (e) => {
    if (orderRef.current) {
      orderElm.scrollTo({
        left: getScrollWidth() * e.target.dataset.index,
        behavior: 'smooth',
      });
    }
  };

  const getContent = () => {
    return indexCnt > 0 ? (
      <>
        <CircleOrder indexCnt={indexCnt} index={index}>
          {isMyPage && <li key={`CircleOrderCreate`} data-index={0} onClick={handleOnClickCircle} />}
          {window.talknDatas.config &&
            window.talknDatas.config.stories.map((circle, i) => (
              <li key={`${circle.no}-${i}`} data-index={isMyPage ? i + 1 : i} onClick={handleOnClickCircle} />
            ))}
        </CircleOrder>

        {slide && (
          <Flex width="100%" justifyContent="flex-end" sidePadding>
            <CustomA href={`//${conf.coverURL}${userId}story`}>More →</CustomA>
          </Flex>
        )}
      </>
    ) : (
      'NO DATA'
    );
  };

  return (
    <HeaderSection
      title={'My Stories'}
      iconType="Story"
      content={
        <>
          <StoryOrder
            className="StoryOrder"
            mouted={(elm) => (orderElm = elm)}
            onScroll={handleOnScroll}
            slide={slide}
            indexCnt={window.talknDatas.config.stories.length}>
            {isMyPage && <StoryList key={`StoryListCreate`} userId={userId} isMyPage={isMyPage} create />}
            {displayStories.length > 0 &&
              displayStories.map((storiesEyeCatch, i) => (
                <StoryList
                  key={`StoryList${i}`}
                  userId={userId}
                  title={storiesEyeCatch.title}
                  eyeCatch={storiesEyeCatch.eyeCatch}
                  isMyPage={isMyPage}
                  data-no={storiesEyeCatch.no}
                  slide={slide}
                />
              ))}
          </StoryOrder>
          {getContent()}
        </>
      }
    />
  );
};

export default Component;

type ContainerPropsType = {
  indexCnt: number;
  slide?: boolean;
};

const StoryOrder = styled(Ol)<ContainerPropsType>`
  ${(props) => (props.slide ? 'overflow: scroll visible' : '')};
  flex-flow: row ${(props) => (props.slide ? 'nowrap' : 'wrap')};
  align-items: flex-start;
  justify-content: ${(props) => {
    if (props.slide) {
      return props.indexCnt < 3 && props.indexCnt !== 0 ? 'center' : 'flex-start';
    } else {
      return 'flex-start';
    }
  }};
  width: 100%;
  padding-top: 100px;
  margin-top: -100px;
  ${(props) => (props.slide ? 'scroll-snap-type: x mandatory' : '')};
  @media (max-width: ${styles.spLayoutWidth}px) {
    justify-content: flex-start;
  }
  @media (max-width: ${styles.spLayoutStrictWidth}px) {
    justify-content: flex-start;
  }
`;

type CircleOrderPropsType = {
  indexCnt: number;
  index: number;
};

const CircleOrder = styled.ol<CircleOrderPropsType>`
  display: none;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-around;
  width: calc(${(props) => getHeadEyeCatchSelectOrderWidth(props.indexCnt)}% - ${styles.doubleMargin}px);
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
  li[data-index='${(props) => props.index}'] {
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

const CustomA = styled(A)`
  :visited,
  :hover,
  :active {
    cursor: pointer;
    user-select: none;
    text-decoration: ${styles.brightColor} solid underline;
  }
`;

const getHeadEyeCatchSelectOrderWidth = (indexCnt): number => {
  if (indexCnt < 10) return Number(`${indexCnt}0`);
  return 100;
};
