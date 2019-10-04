import React from "react";

interface AudioProps {
  src: any;
}
export default class Audio extends React.Component<AudioProps> {
  constructor(props: AudioProps) {
    super(props);
  }

  render() {
    const { src, state }: any = this.props;
    const { style } = state;

    return (
      <audio
        src={src}
        style={style.audio.self}
        preload="true"
        loop={false}
        controls={true}
        autoPlay={false}
        data-component-name={"Audio"}
      />
    );
  }
}
