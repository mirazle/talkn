import * as React from 'react';
import type { FunctionComponent } from 'react';
import styled from 'styled-components';

import * as styles from 'cover/styles';

type Props = {};

const Component: FunctionComponent<Props> = () => {
  const handleOnClickToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <Container>
      <ToTopLayoyt>
        <ToTop onClick={handleOnClickToTop}>
          <div className={'ToTopArrow'} />
        </ToTop>
      </ToTopLayoyt>
    </Container>
  );
};

export default Component;

const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${styles.doubleMargin}px 0;
  width: 100%;
  background: rgb(68, 68, 68);
`;

const ToTopLayoyt = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  max-width: ${styles.appWidth}px;
  @media (max-width: ${styles.spLayoutStrictWidth}px) {
    justify-content: center;
  }
`;

const ToTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${styles.quadSize}px;
  height: ${styles.quadSize}px;
  padding: ${styles.baseSize * 3}px;
  margin-right: ${styles.doubleSize * 3}px;
  background: transparent;
  color: #fff;
  border: 1px solid #fff;
  border-radius: ${styles.baseSize}px;
  transition: ${styles.transitionDuration};
  div.ToTopArrow {
    position: relative;
    top: -3px;
    border-right: 15px solid transparent;
    border-bottom: 25px solid #fff;
    border-left: 15px solid transparent;
  }
  :hover {
    background: #fff;
    border: 1px solid #000;
    div.ToTopArrow {
      border-bottom: 25px solid #000;
    }
  }
  @media (max-width: ${styles.spLayoutStrictWidth}px) {
    margin-right: 0;
  }
`;