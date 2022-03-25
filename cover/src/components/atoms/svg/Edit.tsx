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
            d="M165.628,461.127c0,0,0.827-0.828,1.838-1.839l194.742-194.742c1.012-1.011,1.92-1.92,2.019-2.019
		c0.099-0.099,1.008-1.008,2.019-2.019l103.182-103.182c0.018-0.018,0.018-0.048,0-0.067L354.259,42.092
		c-0.018-0.018-0.048-0.018-0.067,0L251.01,145.274c-1.011,1.011-1.92,1.92-2.019,2.019c-0.099,0.099-1.008,1.008-2.019,2.019
		L50.401,345.884c-0.006,0.006-0.01,0.012-0.012,0.02L0.002,511.459c-0.011,0.036,0.023,0.07,0.059,0.059l163.079-49.633
		C164.508,461.468,165.628,461.127,165.628,461.127z M36.734,474.727l25.159-82.666c0.01-0.034,0.053-0.045,0.078-0.02
		l57.507,57.507c0.025,0.025,0.014,0.068-0.02,0.078l-82.666,25.16C36.756,474.797,36.722,474.764,36.734,474.727z"></path>
          <path
            d="M502.398,104.432c12.803-12.804,12.803-33.754,0-46.558l-47.791-47.792c-12.804-12.803-33.754-12.803-46.558,0
		l-23.862,23.862c-0.018,0.018-0.018,0.048,0,0.067l94.282,94.282c0.018,0.018,0.048,0.018,0.067,0L502.398,104.432z"></path>
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
