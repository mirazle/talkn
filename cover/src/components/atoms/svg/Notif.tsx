import React from 'react';
import styled from 'styled-components';

import Flex, { FlexBoxLayoutPropsType, flexLayoutCenterPropsInit, OnHandleType } from 'cover/flexes';
import styles from 'cover/styles';

export type Props = FlexBoxLayoutPropsType & OnHandleType;

const Component: React.FC<Props> = (props: Props) => {
  const p: Props = {
    ...flexLayoutCenterPropsInit,
    ...props,
  };
  return (
    <Container {...p}>
      <svg
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        width="64.000000pt"
        height="64.000000pt"
        viewBox="0 0 64.000000 64.000000"
        preserveAspectRatio="xMidYMid meet">
        <g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
          <path
            d="M288 629 c-10 -5 -20 -25 -24 -44 -3 -19 -11 -35 -17 -35 -21 0 -78
-52 -96 -88 -11 -22 -21 -70 -24 -120 -7 -87 -32 -159 -69 -199 -11 -12 -18
-29 -15 -37 6 -14 42 -16 277 -16 235 0 271 2 277 16 3 8 -4 25 -15 37 -38 40
-64 115 -69 201 -4 49 -13 95 -24 118 -18 36 -75 88 -96 88 -6 0 -14 16 -17
35 -9 48 -48 68 -88 44z m48 -40 c10 -17 -13 -36 -27 -22 -12 12 -4 33 11 33
5 0 12 -5 16 -11z"
          />
          <path
            d="M108 552 c-14 -15 -33 -42 -42 -60 -22 -44 -32 -127 -17 -137 18 -10
23 -1 32 57 5 32 20 70 39 96 16 23 30 47 30 52 0 21 -19 17 -42 -8z"
          />
          <path
            d="M494 567 c-3 -10 3 -28 16 -44 28 -36 50 -89 50 -122 0 -33 14 -56
29 -47 30 19 -9 153 -59 201 -25 24 -30 26 -36 12z"
          />
          <path
            d="M240 51 c0 -18 53 -51 80 -51 27 0 80 33 80 51 0 5 -36 9 -80 9 -44
0 -80 -4 -80 -9z"
          />
        </g>
      </svg>
    </Container>
  );
};

export default Component;

const Container = styled(Flex)`
  width: 36px;
  height: 36px;
  svg {
    width: inherit;
    height: inherit;
    cursor: pointer;
  }
  path {
    fill: ${styles.baseColor};
  }
  :hover {
    path {
      fill: ${styles.themeColor};
    }
  }
`;
