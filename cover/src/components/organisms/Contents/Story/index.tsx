import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

import conf from 'common/conf';
import { StoriesIndexType, configStoriesLimit } from 'common/talknConfig';

import A from 'cover/components/atoms/A';
import Flex from 'cover/components/atoms/Flex';
import HeaderSection from 'cover/components/molecules/HeaderSection';
import ControlButton from 'cover/components/organisms/Contents/Profile/button/ControlButton';
import ResetButton from 'cover/components/organisms/Contents/Profile/button/ResetButton';
import Add from 'cover/components/organisms/Contents/Profile/tip/Add';
import styles from 'cover/styles';

type Props = {
  isMyPage: boolean;
  slide?: boolean;
  isEditable?: boolean;
};

export const storiesIndexContentsInit: StoriesIndexType[] = [];
export const getScrollWidth = () => (window.innerWidth > styles.appWidth ? styles.appWidth : window.innerWidth);

const Component: React.FC<Props> = ({ isMyPage = false, slide = false, isEditable = false }: Props) => {
  const storiesEyeCatchOrderRef = useRef<HTMLElement>();
  const [storiesIndexes, setStoriesIndexes] = useState<StoriesIndexType[]>([]);
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
    if (isEditable) {
      return <Add show onClick={() => {}} />;
    } else {
      if (eyeCatch === '') {
        return 'NO IMAGE';
      }
    }
    return null;
  };

  return (
    <HeaderSection
      title={'My Story'}
      iconType="Story"
      headerMenu={
        isMyPage && (
          <Flex flow="row nowrap">
            <ControlButton onClick={() => {}} isEditable={false} isChangeUserTag={false} />
            <ResetButton onClick={() => {}} disabled={false} />
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
            {isMyPage && (
              <HeadEyeCatchList key={`HeadEyeCatchListNo`} className="HeadEyeCatchListNo" isEditable={false} create>
                <A href={`https://${conf.coverURL}${window.talknThread.ch}story/create`}>
                  <div className="bg create">
                    <Add show onClick={() => {}} />
                  </div>
                  <div className="description"></div>
                </A>
              </HeadEyeCatchList>
            )}
            {storiesEyeCatchs.length > 0 &&
              storiesEyeCatchs.map((storiesEyeCatch, i) => (
                <HeadEyeCatchList
                  key={`HeadEyeCatchList${i}`}
                  slide={slide}
                  isEditable={isEditable}
                  className="HeadEyeCatchList"
                  data-no={storiesEyeCatch.no}
                  eyeCatch={storiesEyeCatch.eyeCatch}>
                  <A href={`https://${conf.coverURL}${window.talknThread.ch}story/${storiesEyeCatch.no}`}>
                    <div className="bg">{getBGContent(storiesEyeCatch.eyeCatch)}</div>
                    <div className="description">{storiesEyeCatch.title}</div>
                  </A>
                </HeadEyeCatchList>
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

export const HeadEyeCatchList = styled.li<{ isEditable: boolean; create?: boolean; eyeCatch?: string; slide?: boolean }>`
  display: flex;
  flex-flow: column nowrap;
  align-items: ${(props) => (props.create ? 'center' : 'flex-start')};
  justify-content: ${(props) => (props.create ? 'flex-start' : 'flex-start')};
  width: 33%;
  min-width: 360px;
  height: 256px;
  min-height: 256px;
  max-height: 256px;
  padding: 10px;
  overflow: hidden;
  text-align: right;
  ${(props) => (props.slide ? 'scroll-snap-align: start' : '')};
  list-style: none;
  border-radius: ${styles.doubleSize}px;
  transition: ${styles.transitionDuration}ms;
  transform: translate(0px, 0px);
  a {
    display: flex;
    flex-flow: column nowrap;
    align-items: ${(props) => (props.create ? 'center' : 'flex-start')};
    justify-content: center;
    width: 100%;
    transition: ${styles.transitionDuration}ms;
    cursor: pointer;
  }
  .bg {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 160px;
    background-color: ${(props) => (props.create ? 'none' : styles.articleBgColor)};
    background-size: cover;
    background-image: url('${(props) => (props.eyeCatch && props.eyeCatch !== '' ? props.eyeCatch : 'none')}');
    background-position: 50%;
    background-repeat: no-repeat;
    border: 1px solid ${styles.borderColor};
    border-radius: ${styles.doubleSize}px;
    transition: ${styles.transitionDuration}ms;
    color: ${styles.whiteColor};
  }
  .description {
    display: -webkit-box;
    margin: ${styles.baseMargin}px 0;
    text-align: left;
    line-height: 30px;
    font-size: 20px;
    font-weight: 200;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  :hover {
    a {
      transform: scale(1.03);
    }
    .description {
      text-decoration: underline solid ${styles.fontColor} 1px;
    }
    .bg {
    }
  }

  @media (max-width: ${styles.spLayoutWidth}px) {
    width: 50%;
    min-width: 50%;
  }
  @media (max-width: ${styles.spLayoutStrictWidth}px) {
    width: 100%;
    min-width: 100%;
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

/*
    :before {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      content: 'EDIT';
      background: rgba(129, 224, 209, 0.9);
      width: 90%;
      height: 90%;
      top: 5%;
      right: 0;
      bottom: 0;
      left: 5%;
      border-radius: ${styles.doubleSize}px;
      color: #fff;
      transition: ${styles.transitionDuration}ms;
    }
*/

/*
  :before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: '';
    backdrop-filter: blur(3px);
  }
*/
