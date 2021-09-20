import React from 'react';
import styled from 'styled-components';

type Props = {
  lv?: number;
  loop?: boolean;
  className?: string;
};

const Component: React.FC<Props> = ({ lv = 2, className = 'Title', children }) => {
  const fixedClassName = `${className}${lv}`;
  switch (lv) {
    case 1:
      return <H1 className={fixedClassName}>{children}</H1>;
    case 2:
      return <H2 className={fixedClassName}>{children}</H2>;
    case 3:
      return <H3 className={fixedClassName}>{children}</H3>;
    case 4:
      return <H4 className={fixedClassName}>{children}</H4>;
    case 5:
    default:
      return <H5 className={fixedClassName}>{children}</H5>;
  }
};

export default Component;

const H1 = styled.h1`
  font-size: 24px;
  font-weight: 200;
  user-select: none;
`;
const H2 = styled.h2`
  font-size: 24px;
  font-weight: 400;
  text-indent: 8px;
  user-select: none;
`;
const H3 = styled.h3`
  font-size: 18px;
  font-weight: 200;
  user-select: none;
`;
const H4 = styled.h4`
  font-size: 16px;
`;
const H5 = styled.h5`
  font-size: 16px;
`;
