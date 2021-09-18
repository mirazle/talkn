import React from 'react';
import styled from 'styled-components';

type Props = {
  lv?: number;
  loop?: boolean;
};

const Component: React.FC<Props> = ({ lv = 2, children }) => {
  switch (lv) {
    case 1:
      return <H1>{children}</H1>;
    case 2:
      return <H2>{children}</H2>;
    case 3:
      return <H3>{children}</H3>;
    case 4:
      return <H4>{children}</H4>;
    case 5:
    default:
      return <H5>{children}</H5>;
  }
};

export default Component;

const H1 = styled.h1`
  font-size: 24px;
`;
const H2 = styled.h2`
  font-size: 18px;
`;
const H3 = styled.h3`
  font-size: 18px;
`;
const H4 = styled.h4`
  font-size: 16px;
`;
const H5 = styled.h5`
  font-size: 16px;
`;
