import React, { Component } from 'react'
import Sequence from 'common/Sequence';
import App from 'common/schemas/state/App';
import Audio from 'client/components/Media/Audio';
import Video from 'client/components/Media/Video';

export default class Media extends Component {

  constructor(props) {
    super(props);
    const { app, thread } = props.state;
    let src = "";
    let mediaType = "";

    if( app.extensionMode !== App.extensionModeExtNoneLabel ){
      if( thread.protocol === Sequence.HTTP_PROTOCOL || thread.protocol === Sequence.HTTPS_PROTOCOL ){
        src = thread.protocol + "/" +  thread.connection.replace(/\/$/, '');
        mediaType = App.getMediaTypeFromSrc( src );
      }
    }
    this.state = {
      src,
      mediaType
    }
  }

  componentWillReceiveProps(props){
    const { thread } = props.state;
    if( thread.protocol === Sequence.HTTP_PROTOCOL || thread.protocol === Sequence.HTTPS_PROTOCOL ){
      const src = thread.protocol + "/" +  thread.connection.replace(/\/$/, '');
      const mediaType = App.getMediaTypeFromSrc( src );
      if( this.state.src !== src || this.state.mediaType !== mediaType ){
        this.setState({src,mediaType});
      }
    }
  }

  render(){
    const { src, mediaType } = this.state;
    switch( mediaType ){
    case App.mediaTagTypeAudio:
      return <Audio {...this.props} src={src} />;
    case App.mediaTagTypeVideo:
      return <Video {...this.props} src={src} />;
    default:
      return null;
    }
  }
}
