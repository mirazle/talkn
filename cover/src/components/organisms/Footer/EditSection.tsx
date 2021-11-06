import * as React from 'react';
import type { FunctionComponent } from 'react';
import styled from 'styled-components';

import Title from 'cover/components/atoms/Title';
import * as styles from 'cover/styles';

type Props = {};

const Component: FunctionComponent<Props> = () => {
  return (
    <Container>
      <Title type="Section">- Edit Interview -</Title>
      <div>
        <button>INDEX</button>
        <button>OGP</button>
      </div>
    </Container>
  );
};

export default Component;

const Container = styled.section`
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: ${styles.doublePadding}px;
  background: rgb(68, 68, 68);
  color: #fff;
  button {
    padding: ${styles.doubleMargin}px ${styles.doubleMargin}px;
    margin: ${styles.quadMargin}px ${styles.doubleMargin}px;
    background: ${styles.fontColor};
    color: #fff;
    border: 0;
    cursor: pointer;
    transition: ${styles.transitionDuration};
    :hover {
      background: #fff;
      color: ${styles.fontColor};
    }
  }
`;
