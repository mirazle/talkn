import * as React from 'react';
import type { FunctionComponent } from 'react';
import styled from 'styled-components';

import conf from 'common/conf';

import Flex from 'components/atomicDesign/atoms/Flex';
import Title from 'components/atomicDesign/atoms/Title';
import { animations, layouts } from 'components/styles';

type Props = {
  ch: string;
};

const Component: FunctionComponent<Props> = ({ ch }) => {
  return (
    <Container>
      <Title type="Section">- Actions -</Title>
      <br />
      <br />
      <br />
      <h3>Download Config file</h3>
      <Flex flow="row wrap">
        <a href={'#'}>index</a>
        <a href={'#'}>this interview</a>
      </Flex>
      <h3>Update</h3>
      <Flex flow="row wrap">
        <a href={`https://${conf.coverURL}${ch}build`}>build page</a>
        <a href={`https://${conf.coverURL}${ch}config`}>config file</a>
      </Flex>
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
  padding: ${layouts.doublePadding}px;
  background: rgb(80, 80, 80);
  color: #fff;
  a {
    display: block;
    padding: ${layouts.doubleMargin}px ${layouts.doubleMargin}px;
    margin: ${layouts.quadMargin}px ${layouts.doubleMargin}px;
    background: rgb(130, 130, 130);
    color: #fff;
    border: 0;
    cursor: pointer;
    transition: ${animations.transitionDuration}ms;
    :hover {
      background: rgb(68, 68, 68);
    }
  }
`;
