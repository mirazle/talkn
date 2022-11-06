import React, { useState } from 'react';
import styled from 'styled-components';

import conf from 'common/conf';

import Add from 'cover/components/organisms/Contents/Profile/tip/Add';
import { A, Li } from 'cover/flexes';
import styles from 'cover/styles';

import { scrollBaseLeft } from './';

type Props = {
  userId: string;
  isMyPage: boolean;
  title?: string;
  eyeCatch?: string;
  create?: boolean;
  slide?: boolean;
};

const Component: React.FC<Props> = ({ userId, isMyPage, title = '', eyeCatch = '', create = false, slide = false }: Props) => {
  const [isHover, setIsHover] = useState(false);
  const getBGContent = (eyeCatch) => {
    if (create) {
      return <Add onClick={() => {}} show={create} showForceHover={isHover} />;
    } else {
      return eyeCatch === '' && <span className="noImage">NO IMAGE</span>;
    }
  };

  return (
    <Container
      key={`HeadEyeCatchListNo`}
      eyeCatch={eyeCatch}
      isMyPage={isMyPage}
      create={create}
      slide={slide}
      alt={title !== '' ? title : 'Add'}
      onMouseOver={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}>
      <A href={`https://${conf.coverURL}/story/${userId}/create`}>
        <div className="bg">{getBGContent(eyeCatch)}</div>
        <div className="description">{title}</div>
      </A>
    </Container>
  );
};

export default Component;

type ContainerPropsType = {
  isMyPage: boolean;
  eyeCatch: string;
  create: boolean;
  slide: boolean;
};

export const Container = styled(Li)<ContainerPropsType>`
  flex-flow: column nowrap;
  align-items: ${(props) => (props.create ? 'center' : 'flex-start')};
  justify-content: ${(props) => (props.create ? 'flex-start' : 'flex-start')};
  width: 33%;
  min-width: 360px;
  height: 256px;
  min-height: 256px;
  max-height: 256px;
  margin: ${scrollBaseLeft}px;
  overflow: visible;
  text-align: right;
  ${(props) => (props.slide || props.create ? 'scroll-snap-align: start' : '')};
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
    padding: ${styles.basePadding}px;
    border-radius: 16px;
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
    background-image: url('${(props) => (props.eyeCatch !== '' ? props.eyeCatch : 'none')}');
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
    font-size: 100%;
    font-weight: 200;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    color: ${styles.fontColor};
    overflow: hidden;
  }
  う :hover {
    a {
    }
    .description {
      text-decoration: underline solid ${(props) => (props.isMyPage && !props.create ? styles.whiteColor : styles.fontColor)}
        ${(props) => (props.isMyPage && !props.create ? 0 : 1)}px;
    }
    .bg {
      box-shadow: ${styles.shadowHorizonBright};
      opacity: 0.8;
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
