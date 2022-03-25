import React from 'react';
import styled from 'styled-components';

import styles from 'cover/styles';

type Props = {
  lv?: number;
  className?: string;
};

const Component: React.FC<Props> = ({ lv = 1, className = 'P', children }) => {
  switch (lv) {
    case 1:
      return <P1 className={className}>{children}</P1>;
    case 2:
      return <P2 className={className}>{children}</P2>;
    case 3:
      return <P3 className={className}>{children}</P3>;
    case 4:
      return <P4 className={className}>{children}</P4>;
    case 5:
    default:
      return <P5 className={className}>{children}</P5>;
  }
};

export default Component;

const P1 = styled.p`
  margin: 0 auto;
  font-size: 20px;
  font-weight: 200;
  line-height: 32px;
  user-select: none;
  color: ${styles.fontColor};
`;

const P2 = styled.p`
  margin: 0 auto;
  line-height: 30px;
  font-size: 18px;
  font-weight: 200;
  user-select: none;
  color: ${styles.fontColor};
`;

const P3 = styled.p`
  margin: 0 auto;
  font-size: 16px;
  font-weight: 200;
  user-select: none;
  color: ${styles.fontColor};
`;

const P4 = styled.p`
  margin: 0 auto;
  font-size: 16px;
  font-weight: 200;
  user-select: none;
  color: ${styles.fontColor};
`;

const P5 = styled.p`
  margin: 0 auto;
  font-size: 16px;
  user-select: none;
  color: ${styles.fontColor};
`;
