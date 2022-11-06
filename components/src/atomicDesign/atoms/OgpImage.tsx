import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import Thread from 'api/store/Thread';

import { animations, colors, layouts } from 'components/styles';

import noimage from 'assets/svg/noimage.svg';

type Props = {
  src: string;
  ch: string;
  findType?: string;
};

const Component: React.FC<Props> = ({ src, ch, findType = Thread.findTypeHtml }) => {
  const [isPlay, setIsPlay] = useState(false);

  const handleOnClickPlay = (e) => {
    e.preventDefault();
    setIsPlay(!isPlay);
  };

  const PlayComponent =
    findType === Thread.findTypeMusic || findType === Thread.findTypeVideo ? (
      <PlayCircle onClick={handleOnClickPlay}>
        <PlayMark isPlay={isPlay} />
      </PlayCircle>
    ) : null;

  const media = () => {
    switch (findType) {
      case Thread.findTypeMusic:
        return <Audio src={`/${ch.replace(/\/$/, '')}`} controls autoPlay />;
      case Thread.findTypeVideo:
        return <Video src={`/${ch.replace(/\/$/, '')}`} controls autoPlay />;
    }
  };

  return (
    <Container>
      {PlayComponent}
      <BgImage src={src}>{isPlay ? media() : <Tip>{ch}</Tip>}</BgImage>
    </Container>
  );
};

export default Component;

const Container = styled.div`
  overflow: hidden;
  width: inherit;
  height: ${layouts.imageWidth}px;
  border-top: 1px solid #eee;
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

const PlayCircleSize = 60;
const PlayCircleHarfSize = PlayCircleSize / 2;
const PlayCircle = styled.span`
  position: absolute;
  left: calc(50% - ${PlayCircleHarfSize}px);
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${PlayCircleSize}px;
  height: ${PlayCircleSize}px;
  margin-top: 40px;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid ${colors.borderColor};
  border-radius: 50%;
  transition: ${animations.transitionDuration}ms;
  :hover {
    box-shadow: 0 0 12px 1px rgba(0, 0, 0, 0.4);
  }
`;

type PlayMarkPropsType = {
  isPlay: boolean;
};

const playMarkPlay = css`
  margin-left: 20px;
  border-top: ${PlayCircleHarfSize / 2 - 2}px solid transparent;
  border-right: ${PlayCircleHarfSize / 2}px solid transparent;
  border-bottom: ${PlayCircleHarfSize / 2 - 2}px solid transparent;
  border-left: ${PlayCircleHarfSize / 2}px solid rgba(${colors.themeColor}, 0.8);
`;

const playMarkStop = css`
  margin-left: 0px;
  border-top: ${PlayCircleHarfSize / 3}px solid rgba(${colors.themeColor}, 0.8);
  border-right: ${PlayCircleHarfSize / 3}px solid rgba(${colors.themeColor}, 0.8);
  border-bottom: ${PlayCircleHarfSize / 3}px solid rgba(${colors.themeColor}, 0.8);
  border-left: ${PlayCircleHarfSize / 3}px solid rgba(${colors.themeColor}, 0.8);
  border-radius: 3px;
`;

const PlayMark = styled.div<PlayMarkPropsType>`
  transition: ${animations.transitionDuration}ms;
  ${(props) => (props.isPlay ? playMarkStop : playMarkPlay)}
`;

const Tip = styled.span`
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  max-height: 70px;
  padding: 6px 8px 8px 24px;
  margin: 16px 0 16px 16px;
  background: rgba(0, 0, 0, 0.4);
  color: rgb(255, 255, 255);
  border-radius: 30px 0 0 30px;
  line-height: 28px;
  text-align: right;
  word-break: break-word;
`;

const Audio = styled.audio`
  margin-bottom: ${layouts.baseMargin}px;
`;

const Video = styled.video`
  margin: 0 ${layouts.baseMargin}px ${layouts.baseMargin}px ${layouts.baseMargin}px;
`;
