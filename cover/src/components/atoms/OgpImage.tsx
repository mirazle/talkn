import React from 'react';
import styled from 'styled-components';

import noimage from 'assets/svg/noimage.svg';

type Props = {
  src: string;
  ch: React.ReactNode;
};

const Component: React.FC<Props> = ({ src, ch }) => {
  return (
    <Container className="OgpImage">
      <BgImage src={src}>
        <Tip>{ch}</Tip>
      </BgImage>
    </Container>
  );
};

export default Component;

const Container = styled.div`
  overflow: hidden;
  width: inherit;
  height: 200px;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
`;

type BgImagePropsType = {
  src: string;
};

const BgImage = styled.div<BgImagePropsType>`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  width: inherit;
  height: inherit;
  background: url('${(props) => props.src}') no-repeat center / cover, url('${noimage}') no-repeat center / 40%;
  background-color: #eee;
`;

const Tip = styled.span`
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  padding: 6px 8px 8px 24px;
  margin: 16px 0 16px 16px;
  background: rgba(0, 0, 0, 0.4);
  color: rgb(255, 255, 255);
  border-radius: 30px 0 0 30px;
  line-height: 28px;
  text-align: right;
  word-break: break-word;
`;
