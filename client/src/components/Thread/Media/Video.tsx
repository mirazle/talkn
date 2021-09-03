import React from 'react';

import TalknComponent from 'client/components/TalknComponent';

type VideoProps = {
  src: string;
};

type VideoState = {
  src: string;
};

export default class Video extends TalknComponent<VideoProps, VideoState> {
  constructor(props: VideoProps) {
    super(props);
    this.componentName = 'Video';
  }

  render() {
    const { src, state }: any = this.props;
    const { style } = state;
    return (
      <video
        src={src}
        style={style.video.self}
        preload="true"
        loop={false}
        controls={true}
        autoPlay={false}
        controlsList={'nodownload'}
        data-component-name={this.componentName}
      />
    );
  }
}
