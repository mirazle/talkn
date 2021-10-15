import React from 'react';
import styled from 'styled-components';

type Props = {
  lv?: number;
};

const Component: React.FC<Props> = ({ lv = 1, children }) => {
  switch (lv) {
    case 1:
      return <P1>{children}</P1>;
    case 2:
      return <P2>{children}</P2>;
    case 3:
      return <P3>{children}</P3>;
    case 4:
      return <P4>{children}</P4>;
    case 5:
    default:
      return <P5>{children}</P5>;
  }
};

export default Component;

const P1 = styled.p`
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: 200;
  line-height: 32px;
  user-select: none;
`;

const P2 = styled.p`
  font-size: 16px;
  font-weight: 200;
  user-select: none;
`;

const P3 = styled.p`
  font-size: 16px;
  font-weight: 200;
  user-select: none;
`;

const P4 = styled.p`
  font-size: 16px;
  font-weight: 200;

  user-select: none;
`;

const P5 = styled.p`
  font-size: 16px;
  user-select: none;
`;
