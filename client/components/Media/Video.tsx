import React from "react";
import TalknComponent from "client/components/TalknComponent";

interface VideoProps {
  src: any;
}
export default class Video extends TalknComponent<VideoProps, {}> {
  constructor(props: VideoProps) {
    super(props);
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
        controlsList={"nodownload"}
        data-component-name={"Video"}
      />
    );
  }
}
