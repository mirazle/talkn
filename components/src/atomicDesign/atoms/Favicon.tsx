import React from 'react';
import styled from 'styled-components';

import { layouts } from 'components/styles';

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

const size = layouts.articleHeaderSideSize;
const Container = styled.i<ContainerPropsType>`
  display: flex;
  width: ${size}px;
  min-width: ${size}px;
  max-width: ${size}px;
  height: ${size}px;
  min-height: ${size}px;
  max-height: ${size}px;
  background: url('${(props) => props.src}') no-repeat center / 60%;
  border-radius: 5px 0 0 0;
`;
