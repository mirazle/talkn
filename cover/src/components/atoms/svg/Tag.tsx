import React from 'react';
import styled from 'styled-components';

import Flex, { BoxLayoutPropsType, boxLayoutPropsInit } from 'cover/flexes';
import styles from 'cover/styles';

export type Props = {
  className?: string;
} & BoxLayoutPropsType;

const Component: React.FC<Props> = (props: Props) => {
  const p: Props = {
    ...boxLayoutPropsInit,
    ...props,
  };
  return (
    <Container {...p}>
      <svg version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 512 512" xmlSpace="preserve">
        <g>
          <path
            d="M490.249,308.087v-0.01L348.89,449.436c-17.525,17.525-40.416,26.237-63.459,26.256
		c-23.042-0.02-45.935-8.732-63.458-26.256L21.751,249.215L0,270.984l200.222,200.211c23.472,23.474,54.416,35.27,85.209,35.26
		c30.794,0.01,61.737-11.776,85.21-35.26L512,329.838L490.249,308.087z"></path>
          <path
            d="M54.376,228.916l200.221,200.222c17.024,17.024,44.643,17.024,61.667,0l141.358-141.369
		c17.044-17.034,17.024-44.643,0-61.656L257.422,25.891c-7.651-7.631-17.846-12.168-28.62-12.708L79.852,5.601
		C67.535,4.971,55.538,9.597,46.805,18.32c-8.712,8.722-13.339,20.73-12.698,33.046l7.571,148.939
		C42.22,211.09,46.746,221.285,54.376,228.916z M115.041,86.535c14.02-14.02,36.732-14.02,50.751,0
		c14.02,14.02,14.02,36.742,0,50.761c-14.02,14.02-36.731,14.02-50.751,0C101.022,123.277,101.022,100.555,115.041,86.535z"></path>
        </g>
      </svg>
    </Container>
  );
};

export default Component;

const Container = styled(Flex)`
  width: 24px;
  height: 24px;
  svg {
    width: inherit;
    height: inherit;
  }
  path {
    fill: ${styles.baseColor};
  }
`;
