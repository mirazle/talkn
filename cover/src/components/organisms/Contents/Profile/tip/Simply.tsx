import React from 'react';
import styled from 'styled-components';

import Flex from 'cover/flexes';
import styles from 'cover/styles';

type Props = {
  onClick: () => void;
  onClickRemove: () => void;
  label: React.ReactNode;
};

const Component: React.FC<Props> = ({ onClick, onClickRemove, label }) => {
  return (
    <Container className="SimplyTag" alt="View" flow="column nowrap">
      <Header className="CloseHeaeer" alignItems="center" justifyContent="flex-end">
        <CloseIcon className="CloseIcon" onClick={onClickRemove} show={false}>
          <div className="lineHorizon" />
          <div className="lineVertical" />
        </CloseIcon>
      </Header>
      <Body flow="column nowrap" alignItems="center" justifyContent="center" onClick={onClick}>
        {label}
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
  border: 3px solid rgba(255, 255, 255, 0.8);
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
  height: 55px;
  padding: 10px 30px;
  margin: 10px;
  background: ${styles.tagBgColor};
  border-radius: 30px;
  color: #fff;
  cursor: pointer;
  transition: background ${styles.transitionDuration}ms, box-shadow ${styles.transitionDuration}ms;
  :hover {
    background: ${styles.themeColor};
    box-shadow: ${styles.shadowHorizonBright};
  }
`;
