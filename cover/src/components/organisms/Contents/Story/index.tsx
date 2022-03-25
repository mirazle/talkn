import * as React from 'react';
import styled from 'styled-components';

import conf from 'common/conf';
import { StoriesIndexType } from 'common/talknConfig';

import styles from 'cover/styles';

type Props = {
  ch: string;
  storiesEyeCatchs: StoriesIndexType[];
  storiesEyeCatchOrderRef: React.MutableRefObject<HTMLElement>;
  handleOnClickMenu: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  handleOnScrollHeadEyeCatch: (e: React.UIEvent<HTMLOListElement, UIEvent>) => void;
};

const Component: React.FC<Props> = ({ ch, storiesEyeCatchs, storiesEyeCatchOrderRef, handleOnScrollHeadEyeCatch }) => {
  return (
    <Container ref={storiesEyeCatchOrderRef} onScroll={handleOnScrollHeadEyeCatch} storiesIndexCnt={window.talknConfig.storiesIndex.length}>
      {storiesEyeCatchs.map((storiesEyeCatch, i) => (
        <HeadEyeCatchList
          key={`HeadEyeCatchList${i}`}
          className="HeadEyeCatchList"
          data-no={storiesEyeCatch.no}
          ch={ch}
          eyeCatch={storiesEyeCatch.eyeCatch}
          storiesIndexCnt={window.talknConfig.storiesIndex.length}>
          <ViewAnchor href={`https://${conf.coverURL}${storiesEyeCatch.ch}story/${storiesEyeCatch.no}`}>
            <div className="creatorBg">{storiesEyeCatch.eyeCatch === '' && 'NO IMAGE'}</div>
            <div className="creatorDescription">{storiesEyeCatch.title}</div>
          </ViewAnchor>
        </HeadEyeCatchList>
      ))}
    </Container>
  );
};

export default Component;

type ContainerPropsType = {
  ref: any;
  slide?: boolean;
  storiesIndexCnt: number;
};

const Container = styled.ol<ContainerPropsType>`
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

export const HeadEyeCatchList = styled.li<{ ch: string; slide?: boolean; eyeCatch: string; storiesIndexCnt: number }>`
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  justify-content: flex-end;
  width: 33.33%;
  min-width: 400px;
  height: fit-content;
  padding: 10px;
  overflow: hidden;
  text-align: right;
  ${(props) => (props.slide ? 'scroll-snap-align: start' : '')};
  color: #fff;
  list-style: none;
  :hover {
    a {
      transform: scale(1.03);
      opacity: 0.8;
    }
    div.creatorDescription {
      text-decoration: underline solid ${styles.fontColor} 1px;
    }
  }
  a {
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    color: #fff;
    transition: ${styles.transitionDuration}ms;
    cursor: pointer;
  }
  div.creatorBg {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 160px;
    background-color: #ddd;
    background-size: cover;
    background-image: url('${(props) => (props.eyeCatch !== '' ? props.eyeCatch : 'none')}');
    background-position: 50%;
    background-repeat: no-repeat;
    border: 1px solid ${styles.borderColor};
    border-radius: ${styles.baseSize}px;
  }
  div.creatorDescription {
    margin: ${styles.baseMargin}px 0;
    text-align: left;
    line-height: 30px;
    font-size: 20px;
    font-weight: 200;
    color: ${styles.fontColor};
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

export const ViewAnchor = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  height: 100%;
`;
