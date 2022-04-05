import * as React from 'react';
import type { FunctionComponent } from 'react';
import styled, { css } from 'styled-components';

import styles from 'cover/styles';

type CommonProps = {
  showAdvert: boolean;
};

type HeaderProps = CommonProps & {
  handleOnClickControlAdvert: () => void;
};

export const Header: FunctionComponent<HeaderProps> = ({ showAdvert, handleOnClickControlAdvert }) => {
  return (
    <AdvertHeader showAdvert={showAdvert}>
      <AdvertAttach showAdvert={showAdvert} onClick={handleOnClickControlAdvert}>
        AD
        <br />
        {showAdvert ? 'OFF' : 'ON'}
      </AdvertAttach>
    </AdvertHeader>
  );
};

const Content = () => {
  return (
    <>
      スポンサー
      <br />
      募集中
      <br />
      <br />
      ¥0~
    </>
  );
};

export const Right: FunctionComponent<CommonProps> = ({ showAdvert }) => {
  return (
    <AdvertRight showAdvert={showAdvert}>
      <Content />
    </AdvertRight>
  );
};

export const Left: FunctionComponent<CommonProps> = ({ showAdvert }) => {
  return (
    <AdvertLeft showAdvert={showAdvert}>
      <Content />
    </AdvertLeft>
  );
};

export default {
  Header,
  Right,
  Left,
};

const AdvertCss = css<CommonProps>`
  position: sticky;
  top: ${styles.baseHeight * 2 + styles.baseMargin}px;
  flex: 1 1 ${styles.advertWidth}px;
  display: ${(props) => (props.showAdvert ? 'flex' : 'none')};
  opacity: ${(props) => (props.showAdvert ? 1 : 0)};
  align-items: center;
  justify-content: center;
  width: ${styles.advertWidth}px;
  min-width: ${styles.advertWidth}px;
  max-width: ${styles.advertWidth}px;
  height: calc(100vh - ${styles.baseHeight * 2 + styles.baseMargin * 2}px);
  margin-top: ${styles.doubleMargin}px;
  background: ${styles.advertColor};
  color: #fff;
  text-align: center;
  transition-property: background, transform;
  transition-duration: ${styles.transitionDuration}ms, ${styles.transitionDuration}ms;
  :hover {
    background: ${styles.advertHoverColor};
  }
  @media (max-width: ${styles.spLayoutWidth}px) {
    display: flex;
    position: relative;
    top: 0;
    width: calc(100% - ${styles.doubleMargin}px);
    max-width: calc(100% - ${styles.doubleMargin}px);
    margin: 0 ${styles.baseMargin}px;
  }
`;

const AdvertHeader = styled.div<CommonProps>`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  padding-right: ${styles.doublePadding}px;
  @media (max-width: ${styles.doubleAdvertWidth}px) {
    padding-right: ${styles.basePadding}px;
  }
`;

const AdvertAttach = styled.div<CommonProps>`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background: ${styles.advertColor};
  color: #fff;
  font-size: 10px;
  text-align: center;
  line-height: 14px;
  border-radius: 5px;
  cursor: pointer;
  transition: ${styles.transitionDuration}ms;
  :hover {
    background: ${styles.advertHoverColor};
    box-shadow: ${styles.shadowHorizonBright};
  }
  @media (max-width: ${styles.spLayoutWidth}px) {
    display: none;
  }
`;

export const AdvertRight = styled.div<CommonProps>`
  ${AdvertCss};
`;

export const AdvertLeft = styled.div<CommonProps>`
  ${AdvertCss};
  @media (max-width: ${styles.doubleAdvertWidth}px) {
    display: none;
  }
  @media (max-width: ${styles.spLayoutWidth}px) {
    display: flex;
    margin-bottom: ${styles.baseMargin}px;
  }
`;
