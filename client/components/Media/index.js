import React, { Component } from 'react'
import App from 'common/schemas/state/App';
import Audio from 'client/components/Media/Audio';
import Video from 'client/components/Media/Video';

export default class Media extends Component {

  constructor(props) {
    super(props);
    const { thread } = props.state;
    const src = thread.protocol + "/" +  thread.connection.replace(/\/$/, '');
    const mediaType = App.getMediaType( src );
    this.state = {
      src,
      mediaType
    }
  }

  render(){
    const { src, mediaType } = this.state;
    switch( mediaType ){
    case App.mediaTagTypeAudio:
      return <Audio {...this.props} src={src} />;
    case App.mediaTagTypeVideo:
      return <Video {...this.props} src={src} />;
    }
  }
}
