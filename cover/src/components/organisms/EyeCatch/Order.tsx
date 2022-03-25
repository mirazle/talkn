import * as React from 'react';
import type { FunctionComponent } from 'react';
import styled from 'styled-components';

import conf from 'common/conf';
import { StoriesIndexType } from 'common/talknConfig';

import { HeadEyeCatchList, ViewAnchor } from 'cover/components/organisms/Contents/Story/index';
import styles from 'cover/styles';

type Props = {
  ch: string;
  storiesIndexCnt: number;
  storiesEyeCatchs: StoriesIndexType[];
  storiesEyeCatchOrderRef: React.MutableRefObject<HTMLElement>;
  handleOnScrollHeadEyeCatch: (e: React.UIEvent<HTMLOListElement, UIEvent>) => void;
  slide?: boolean;
};

const Component: FunctionComponent<Props> = ({
  ch,
  storiesEyeCatchs,
  storiesEyeCatchOrderRef,
  handleOnScrollHeadEyeCatch,
  slide = true,
}) => {
  return (
    <Container
      ref={storiesEyeCatchOrderRef}
      slide
      onScroll={handleOnScrollHeadEyeCatch}
      storiesIndexCnt={window.talknConfig.storiesIndex.length}>
      {storiesEyeCatchs.map((storiesEyeCatch, i) => (
        <HeadEyeCatchList
          key={`HeadEyeCatchList${i}`}
          slide
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
