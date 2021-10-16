import React from 'react';
import styled from 'styled-components';

type Props = {
  children: React.ReactNode;
  alignItems?: string;
  justifyContent?: string;
};

const Component: React.FC<Props> = ({ children, alignItems = 'flex-start', justifyContent = 'flex-start' }) => {
  return (
    <Container alignItems={alignItems} justifyContent={justifyContent}>
      {children}
    </Container>
  );
};

export default Component;

type ContainerPropsType = {
  alignItems: string;
  justifyContent: string;
};

const Container = styled.div<ContainerPropsType>`
  display: flex;
  flex-flow: row wrap;
`;
