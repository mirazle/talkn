import React from 'react';
import styled from 'styled-components';

import * as styles from 'components/styles';

const Component: React.FC = () => {
  return <Container />;
};

export default Component;

const Container = styled.div`
  width: 100%;
  margin: ${styles.baseMargin}px 0;
  border-bottom: 1px solid #eee;
`;
