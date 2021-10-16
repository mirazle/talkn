import React from 'react';
import styled from 'styled-components';

type Props = {
  className?: string;
};

const Component: React.FC<Props> = ({ className = 'Favicon', children }) => {
  return (
    <Container className={className}>
      <LiveCnt>{children}</LiveCnt>
    </Container>
  );
};

export default Component;

type ContainerPropsType = {};

const Container = styled.div`
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  min-width: 50px;
  max-width: 50px;
  height: 50px;
  min-height: 50px;
  max-height: 50px;
  background: rgba(255, 255, 255, 1);
  border-radius: 0 50% 50% 0;
`;

const LiveCnt = styled.div<ContainerPropsType>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  min-width: 30px;
  max-width: 30px;
  height: 30px;
  min-height: 30px;
  max-height: 30px;
  background: rgba(79, 174, 159, 0.96);
  color: #fff;
  font-size: 12px;
  border-radius: 50%;
`;
