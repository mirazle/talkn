import * as React from 'react';
import type { FunctionComponent } from 'react';
import styled from 'styled-components';

import { animations, colors, layouts } from 'components/styles';

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
  padding: ${layouts.doubleMargin}px 0;
  width: 100%;
  background: rgb(255, 255, 255);
`;

const ToTopLayoyt = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  max-width: ${layouts.appWidth}px;
  @media (max-width: ${layouts.spLayoutStrictWidth}px) {
    justify-content: center;
  }
`;

const ToTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${layouts.quadSize}px;
  height: ${layouts.quadSize}px;
  padding: ${layouts.baseSize * 3}px;
  margin-right: ${layouts.doubleSize * 3}px;
  background: transparent;
  border: 1px solid ${colors.fontColor};
  border-radius: ${layouts.baseSize}px;
  transition: ${animations.transitionDuration}ms;
  div.ToTopArrow {
    position: relative;
    top: -3px;
    border-right: 15px solid transparent;
    border-bottom: 25px solid ${colors.fontColor};
    border-left: 15px solid transparent;
  }
  :hover {
    background: ${colors.fontColor};
    border: 1px solid ${colors.fontColor};
    div.ToTopArrow {
      border-bottom: 25px solid #fff;
    }
  }
  @media (max-width: ${layouts.spLayoutStrictWidth}px) {
    margin-right: 0;
  }
`;
