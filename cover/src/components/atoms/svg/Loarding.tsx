import React from 'react';
import styled from 'styled-components';

import Spinner from 'cover/components/atoms/icon/Spinner';
import Flex from 'cover/flexes';
import styles from 'cover/styles';

const Component: React.FC = () => {
  return (
    <Container className="checkwrapper" alignItems="center" justifyContent="center">
      <Spinner />
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
