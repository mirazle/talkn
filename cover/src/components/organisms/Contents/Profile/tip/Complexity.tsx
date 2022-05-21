import React, { useState } from 'react';
import styled from 'styled-components';

import Flex from 'cover/flexes';
import styles from 'cover/styles';

type Props = {
  onClick: () => void;
  upperLeft: React.ReactNode;
  upperRight: React.ReactNode;
  bottomLeft: React.ReactNode;
  bottomRight: React.ReactNode;
  onClickRemove?: () => void;
};

const Component: React.FC<Props> = ({ onClick, onClickRemove, upperLeft, upperRight, bottomLeft, bottomRight }) => {
  const [isHover, setIsHover] = useState(false);
  return (
    <Container
      className="Complexity"
      flow="column nowrap"
      alt="View"
      onMouseOver={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}>
      <Header className="CloseHeaeer" alignItems="center" justifyContent="flex-end">
        <CloseIcon className="CloseIcon" onClick={onClickRemove} show={false /*onClickRemove && isHover*/}>
          <div className="lineHorizon" />
          <div className="lineVertical" />
        </CloseIcon>
      </Header>
      <Body flow="column nowrap" onClick={onClick}>
        <MiddlwFlex flow="row nowrap">
          <UpperLeft>{upperLeft}</UpperLeft>
          <span>/</span>
          <UpperRight>{upperRight}</UpperRight>
        </MiddlwFlex>
        <BottomFlex flow="row nowrap" align-items="center">
          <BottomLeft>{bottomLeft}</BottomLeft>
          <BottomRight>{bottomRight}</BottomRight>
        </BottomFlex>
      </Body>
    </Container>
  );
};

export default Component;

const Container = styled(Flex)`
  transform: translate(0px, 0px);
`;

const Header = styled(Flex)``;

type CloseIconType = {
  show: boolean;
};

const width = 48;
const height = 10;
const CloseIcon = styled.div<CloseIconType>`
  position: absolute;
  top: -5px;
  right: -5px;
  width: 38px;
  height: 38px;
  background: ${styles.themeColor};
  border: 3px solid #fff;
  border-radius: 50%;
  opacity: 0.9;
  transform: ${(props) => (props.show ? 'rotate(45deg) scale(1)' : 'rotate(45deg) scale(0)')};
  transition: transform ${styles.transitionDuration}ms, background ${styles.transitionDuration}ms, box-shadow ${styles.transitionDuration}ms;
  box-shadow: 0 0 4px 1px rgb(0, 0, 0, 0.2);
  cursor: pointer;
  :hover {
    box-shadow: ${styles.shadowCircleDark};
  }
  .lineHorizon {
    position: relative;
    top: 25%;
    margin: 0 auto;
    width: ${height}%;
    height: ${width}%;
    background: #fff;
    border-radius: 10%;
  }
  .lineVertical {
    position: relative;
    top: -4%;
    margin: 0 auto;
    width: ${width}%;
    height: ${height}%;
    background: #fff;
    border-radius: 10%;
  }
`;

type BodyPropsType = {};

const Body = styled(Flex)<BodyPropsType>`
  height: inherit;
  padding: 10px 30px;
  margin: 10px;
  background: ${styles.tagBgColor};
  border-radius: 30px;
  color: #fff;
  cursor: pointer;
  transition: background ${styles.transitionDuration}ms, box-shadow ${styles.transitionDuration}ms;
  :hover {
    box-shadow: ${styles.shadowHorizonBright};
    background: ${styles.themeColor};
  }
`;

const MiddlwFlex = styled(Flex)`
  font-size: 10px;
  line-height: 15px;
`;

const BottomFlex = styled(Flex)`
  line-height: 20px;
`;

const UpperLeft = styled.div``;
const UpperRight = styled.div``;
const BottomLeft = styled.div``;
const BottomRight = styled.div``;
