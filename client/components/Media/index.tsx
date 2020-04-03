import React from "react";
import TalknComponent from "client/components/TalknComponent";
import ClientState from "client/store/";
import Sequence from "api/Sequence";
import App from "api/store/App";
import Ui from "client/store/Ui";
import Audio from "client/components/Media/Audio";
import Video from "client/components/Media/Video";

interface MediaProps {
  clientState: ClientState;
}

export default class Media extends TalknComponent<MediaProps, {}> {
  constructor(props) {
    super(props);
    const { thread } = this.apiState;
    const { ui } = props.clientState;
    let src: string = "";
    let mediaType: string = "";

    if (ui.extensionMode === Ui.extensionModeExtNoneLabel) {
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
    const { thread } = this.apiState;
    const { ui } = props.clientState;
    if (ui.extensionMode === Ui.extensionModeExtNoneLabel) {
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
