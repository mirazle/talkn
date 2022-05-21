import React from 'react';
import styled, { css } from 'styled-components';

import Flex, { FlexBoxLayoutPropsType, useFlexesContext, FlexesContextType } from 'cover/flexes';
import styles from 'cover/styles';

type CommonProps = {
  showAdvert: boolean;
};

type HeaderProps = CommonProps & {
  handleOnClickControlAdvert: () => void;
};

export const Header: React.FC<HeaderProps> = ({ showAdvert, handleOnClickControlAdvert }) => {
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

export const Right: React.FC<CommonProps> = ({ showAdvert }) => {
  return (
    <AdvertRight className="AdvertRight" showAdvert={showAdvert}>
      <Content />
    </AdvertRight>
  );
};

export const Left: React.FC<CommonProps> = ({ showAdvert = true }) => {
  return (
    <AdvertLeft className="AdvertLeft" showAdvert={showAdvert}>
      <Content />
    </AdvertLeft>
  );
};

export const Under: React.FC<CommonProps> = () => {
  const globalContext: FlexesContextType = useFlexesContext();
  return (
    <AdvertUnder className="AdvertUnder" showAdvert={globalContext.isScrollTop}>
      <AdvertUnderContent flow="row nowrap" alignItems="center" justifyContent="flex-start" width="100%" sideMargin="huge" border>
        <div className="picture" />
        <div className="description"> DESCRIPTION </div>
      </AdvertUnderContent>
    </AdvertUnder>
  );
};

export default {
  Header,
  Right,
  Left,
  Under,
};

type CommonCssProps = CommonProps & FlexBoxLayoutPropsType;

const AdvertCss = css<CommonCssProps>`
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
  cursor: pointer;
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

const AdvertHeader = styled.div<CommonCssProps>`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  padding-top: ${styles.doublePadding}px;
  padding-right: ${styles.doublePadding}px;
  cursor: pointer;
  @media (max-width: ${styles.doubleAdvertWidth}px) {
    padding-right: ${styles.basePadding}px;
  }
`;

const AdvertAttach = styled.div<CommonCssProps>`
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
  cursor: pointer;
  :hover {
    background: ${styles.advertHoverColor};
    box-shadow: ${styles.shadowHorizonBright};
  }
  @media (max-width: ${styles.spLayoutWidth}px) {
    display: none;
  }
`;

export const AdvertRight = styled.div<CommonCssProps>`
  ${AdvertCss};
`;

export const AdvertLeft = styled.div<CommonCssProps>`
  ${AdvertCss};
  @media (max-width: ${styles.doubleAdvertWidth}px) {
    display: none;
  }
  @media (max-width: ${styles.spLayoutWidth}px) {
    display: flex;
    margin-bottom: ${styles.baseMargin}px;
  }
`;

const underAdvertSize = styles.baseHeight * 2;
const underAdvertSpace = styles.doubleMargin * 2;
const underAdvertY = underAdvertSize + underAdvertSpace;
const underPictureSize = underAdvertSize - underAdvertSpace;
export const AdvertUnder = styled(Flex)<CommonCssProps>`
  position: fixed;
  bottom: ${styles.doubleMargin}px;
  width: 100%;
  max-width: ${styles.appWidth}px;
  height: ${underAdvertSize}px;
  padding: 0 64px;
  transition: ${styles.transitionDuration}ms;
  transform: translate(0px, ${(props) => (props.showAdvert ? 0 : underAdvertY)}px);
  .picture {
    width: ${underPictureSize}px;
    min-width: ${underPictureSize}px;
    max-width: ${underPictureSize}px;
    height: ${underPictureSize}px;
    min-height: ${underPictureSize}px;
    max-height: ${underPictureSize}px;
    margin: ${styles.doubleMargin}px;
    border: 1px solid ${styles.borderColor};
    border-radius: ${styles.borderRadius}px;
  }
  .description {
    width: 100%;
    height: 100%;
    padding: ${styles.doublePadding}px;
    color: ${styles.fontColor};
  }
`;

const AdvertUnderContent = styled(Flex)`
  height: 100%;
  ${styles.alphaLightBgSet};
  border-radius: ${styles.borderRadius}px;
  cursor: pointer;
  :hover {
    box-shadow: ${styles.shadowHorizonBright};
  }
`;
