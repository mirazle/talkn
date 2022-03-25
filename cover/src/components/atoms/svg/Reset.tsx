import React from 'react';
import styled from 'styled-components';

import Flex from 'cover/components/atoms/Flex';
import { LayoutPropsType, layoutPropsInit } from 'cover/nodes/Layout';
import styles from 'cover/styles';

export type Props = {
  className?: string;
} & LayoutPropsType;

const Component: React.FC<Props> = (props: Props) => {
  const p: Props = {
    ...layoutPropsInit,
    ...props,
  };
  return (
    <Container {...p}>
      <svg version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 512 512" xmlSpace="preserve">
        <g>
          <path
            d="M446.025,92.206c-40.762-42.394-97.487-69.642-160.383-72.182c-15.791-0.638-29.114,11.648-29.752,27.433
		c-0.638,15.791,11.648,29.114,27.426,29.76c47.715,1.943,90.45,22.481,121.479,54.681c30.987,32.235,49.956,75.765,49.971,124.011
		c-0.015,49.481-19.977,94.011-52.383,126.474c-32.462,32.413-76.999,52.368-126.472,52.382
		c-49.474-0.015-94.025-19.97-126.474-52.382c-32.405-32.463-52.368-76.992-52.382-126.474c0-3.483,0.106-6.938,0.302-10.364
		l34.091,16.827c3.702,1.824,8.002,1.852,11.35,0.086c3.362-1.788,5.349-5.137,5.264-8.896l-3.362-149.834
		c-0.114-4.285-2.88-8.357-7.094-10.464c-4.242-2.071-9.166-1.809-12.613,0.738L4.008,182.45c-3.05,2.221-4.498,5.831-3.86,9.577
		c0.61,3.759,3.249,7.143,6.966,8.974l35.722,17.629c-1.937,12.166-3.018,24.602-3.018,37.279
		c-0.014,65.102,26.475,124.31,69.153,166.944C151.607,465.525,210.8,492.013,275.91,492
		c65.095,0.014,124.302-26.475,166.937-69.146c42.678-42.635,69.167-101.842,69.154-166.944
		C512.014,192.446,486.844,134.565,446.025,92.206z"></path>
        </g>
      </svg>
    </Container>
  );
};

export default Component;

const Container = styled(Flex)`
  width: 100%;
  height: 100%;
`;
