import React from 'react';
import styled from 'styled-components';

type Props = {
  children: React.ReactNode;
  className?: string;
  flow?: string;
  alignItems?: string;
  justifyContent?: string;
  width?: string;
};

const Component: React.FC<Props> = ({
  children,
  className = 'FlexFlow',
  flow = 'row nowrap',
  alignItems = 'flex-start',
  justifyContent = 'flex-start',
  width = 'auto',
}) => {
  return (
    <Container className={className} flow={flow} alignItems={alignItems} justifyContent={justifyContent} width={width}>
      {children}
    </Container>
  );
};

export default Component;

type ContainerPropsType = {
  flow: string;
  alignItems: string;
  justifyContent: string;
  width: string;
};

const Container = styled.div<ContainerPropsType>`
  display: flex;
  flex-flow: ${(props) => props.flow};
  align-items: ${(props) => props.alignItems};
  justify-content: ${(props) => props.justifyContent};
  width: ${(props) => props.width};
`;
