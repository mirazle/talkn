import React from 'react';
import styled from 'styled-components';

import Flex from 'cover/flexes';
import styles from 'cover/styles';

const Component: React.FC = () => {
  return (
    <Container className="checkwrapper" alignItems="center" justifyContent="center">
      <svg version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 98.5 98.5" enableBackground="new 0 0 98.5 98.5">
        <path
          className="checkmark"
          fill="none"
          strokeWidth="4"
          strokeMiterlimit="50"
          d="M81.7,17.8C73.5,9.3,62,4,49.2,4
	C24.3,4,4,24.3,4,49.2s20.3,45.2,45.2,45.2s45.2-20.3,45.2-45.2c0-8.6-2.4-16.6-6.5-23.4l0,0L45.6,68.2L24.7,47.3"
        />
      </svg>
    </Container>
  );
};

export default Component;

const Container = styled(Flex)`
  position: absolute;
  width: 100%;
  height: 100%;

  svg {
    width: 100px;
    height: 100px;
  }

  .checkmark {
    stroke: ${styles.saveCheckColor};
    stroke-dashoffset: 745.74853515625;
    stroke-dasharray: 745.74853515625;
    animation: dash 2s ease-out forwards;
  }

  @keyframes dash {
    0% {
      stroke-dashoffset: 745.74853515625;
    }
    100% {
      stroke-dashoffset: 0;
    }
  }
`;

/*
    border: 5px solid ${styles.saveCircleBorderColor};
    background: ${styles.saveCircleBgColor};
    border-radius: 50%;
*/
