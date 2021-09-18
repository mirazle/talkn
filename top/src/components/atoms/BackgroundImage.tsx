import React from 'react';
import styled from 'styled-components';

import noimage from 'assets/svg/noimage.svg';

type Props = {
  src: string;
};

const Component: React.FC<Props> = ({ src }) => {
  return <Container src={src} />;
};

export default Component;

type ContainerPropsType = {
  src: string;
};

const Container = styled.div<ContainerPropsType>`
  max-width: 320px;
  height: 200px;
  background: url('${(props) => props.src}') no-repeat center / cover, url('${noimage}') no-repeat center / contain;
  background-color: #eee;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
`;
