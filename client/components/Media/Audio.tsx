import React from "react";
import TalknComponent from "client/components/TalknComponent";

interface AudioProps {
  src: any;
}
export default class Audio extends TalknComponent<AudioProps, {}> {
  constructor(props: AudioProps) {
    super(props);
  }

  render() {
    const { src, clientState }: any = this.props;
    const { style } = clientState;

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
