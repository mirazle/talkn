import * as React from 'react';
import styled from 'styled-components';

import styles from 'cover/styles';

type Props = {};

const Component: React.FC<Props> = () => {
  const handleOnClickToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <ToTop onClick={handleOnClickToTop}>
      <div className={'ToTopArrow'} />
      <div className={'ToTopArrowUnderBar'} />
    </ToTop>
  );
};

export default Component;

const ToTop = styled.div`
  z-index: ${styles.zIndex.toTop};
  position: sticky;
  top: calc(100vh - 110px);
  right: 70px;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  width: ${styles.quintSize}px;
  height: ${styles.quintSize}px;
  padding: ${styles.quintSize}px;
  margin: 0 0 60px auto;
  background: ${styles.whiteColor};
  border: 1px solid ${styles.fontColor};
  border-radius: ${styles.baseSize}px;
  transition: ${styles.transitionDuration}ms;
  div.ToTopArrow {
    position: relative;
    top: -4px;
    border-right: 15px solid transparent;
    border-bottom: 25px solid ${styles.fontColor};
    border-left: 15px solid transparent;
  }
  div.ToTopArrowUnderBar {
    width: 30px;
    height: 5px;
    min-height: 5px;
    background: ${styles.fontColor};
    border-radius: 10px;
  }
  :hover {
    background: ${styles.fontColor};
    border: 1px solid ${styles.fontColor};
    div.ToTopArrow {
      border-bottom: 25px solid #fff;
    }
    div.ToTopArrowUnderBar {
      background: #fff;
    }
  }
  @media (max-width: ${styles.spLayoutStrictWidth}px) {
    right: 15px;
    margin-right: 0;
  }
`;
