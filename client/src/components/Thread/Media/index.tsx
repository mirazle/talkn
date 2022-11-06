import React from 'react';

import Sequence from 'common/Sequence';
import Ui from 'common/clientState/store/Ui';

import App from 'api/store/App';

import TalknComponent from 'client/components/TalknComponent';
import Audio from 'client/components/Thread/Media/Audio';
import Video from 'client/components/Thread/Media/Video';

type MediaProps = {
  state: any;
};

type MediaState = unknown;

export default class Media extends TalknComponent<MediaProps, MediaState> {
  constructor(props) {
    super(props);
    const { ui, thread } = props.state;
    let src: string = '';
    let mediaType: string = '';

    if (ui.extensionMode === Ui.extensionModeNone) {
      if (thread.protocol === Sequence.HTTP_PROTOCOL || thread.protocol === Sequence.HTTPS_PROTOCOL) {
        src = thread.protocol + '/' + thread.ch.replace(/\/$/, '');
        mediaType = App.getMediaTypeFromSrc(src);
      }
    }

    this.state = {
      src,
      mediaType,
    };
  }

  UNSAFE_componentWillReceiveProps(props) {
    const { ui, thread } = props.state;
    if (ui.extensionMode === Ui.extensionModeNone) {
      if (thread.protocol === Sequence.HTTP_PROTOCOL || thread.protocol === Sequence.HTTPS_PROTOCOL) {
        const { src, mediaType }: any = this.state;
        const newSrc = thread.protocol + '/' + thread.ch.replace(/\/$/, '');
        const newMediaType = App.getMediaTypeFromSrc(newSrc);
        if (src !== newSrc || mediaType !== newMediaType) {
          this.setState({ src: newSrc, mediaType: newMediaType });
        }
      } else {
        this.setState({ src: '', mediaType: '' });
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
