import React, { Component } from "react";
import Sequence from "common/Sequence";
import App from "common/schemas/state/App";
import Audio from "client/components/Media/Audio";
import Video from "client/components/Media/Video";

export default class Media extends Component {
  constructor(props) {
    super(props);
    const { app, thread } = props.state;
    let src: string = "";
    let mediaType: string = "";

    if (app.extensionMode === App.extensionModeExtNoneLabel) {
      if (thread.protocol === Sequence.HTTP_PROTOCOL || thread.protocol === Sequence.HTTPS_PROTOCOL) {
        src = thread.protocol + "/" + thread.ch.replace(/\/$/, "");
        mediaType = App.getMediaTypeFromSrc(src);
      }
    }

    this.state = {
      src,
      mediaType
    };
  }

  componentWillReceiveProps(props) {
    const { app, thread } = props.state;
    if (app.extensionMode === App.extensionModeExtNoneLabel) {
      if (thread.protocol === Sequence.HTTP_PROTOCOL || thread.protocol === Sequence.HTTPS_PROTOCOL) {
        const { src, mediaType }: any = this.state;
        const newSrc = thread.protocol + "/" + thread.ch.replace(/\/$/, "");
        const newMediaType = App.getMediaTypeFromSrc(newSrc);
        if (src !== newSrc || mediaType !== newMediaType) {
          this.setState({ src: newSrc, mediaType: newMediaType });
        }
      } else {
        this.setState({ src: "", mediaType: "" });
      }
    }
  }

  render() {
    const { src, mediaType }: any = this.state;

    switch (mediaType) {
      case App.mediaTagTypeAudio:
        return <Audio {...this.props} src={src} />;
      case App.mediaTagTypeVideo:
        return <Video {...this.props} src={src} />;
      default:
        return null;
    }
  }
}
