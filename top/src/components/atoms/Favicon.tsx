import React from 'react';
import styled from 'styled-components';

type Props = {
  src: string;
  className?: string;
};

const Component: React.FC<Props> = ({ src, className = 'Favicon' }) => {
  return <Container src={src} className={className} />;
};

export default Component;

type ContainerPropsType = {
  src: string;
};

const Container = styled.i<ContainerPropsType>`
  z-index: 1;
  width: 50px;
  min-width: 50px;
  max-width: 50px;
  height: 50px;
  min-height: 50px;
  max-height: 50px;
  background: url('${(props) => props.src}') no-repeat center / 60%;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 5px 0 0 0;
`;
