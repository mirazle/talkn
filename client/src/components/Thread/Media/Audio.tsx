import React from 'react';

import TalknComponent from 'client/components/TalknComponent';

type AudioProps = {
  src: string;
};

type AudioState = unknown;

export default class Audio extends TalknComponent<AudioProps, AudioState> {
  constructor(props: AudioProps) {
    super(props);
    this.componentName = 'Audio';
  }

  render() {
    const { src, state }: any = this.props;
    const { style } = state;

    return <audio src={src} style={style.audio.self} preload="true" loop={false} controls={true} autoPlay={false} data-component-name={this.componentName} />;
  }
}
