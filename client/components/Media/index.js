import React, { Component } from 'react'
import App from 'common/schemas/state/App';
import Audio from 'client/components/Media/Audio';
import Video from 'client/components/Media/Video';

export default class Media extends Component {

  constructor(props) {
    super(props);
    const { thread } = props.state;
    const src = thread.protocol + "/" +  thread.connection.replace(/\/$/, '');
    const mediaConnectionTagTypeKeys = Object.keys( App.mediaConnectionTagTypes );
    const mediaConnectionTagTypeLength = mediaConnectionTagTypeKeys.length;
    let componentType = App.mediaTagTypeAudio;

    for(let i = 0; i < mediaConnectionTagTypeLength; i++){
      const regExp = new RegExp(`.${mediaConnectionTagTypeKeys[ i ]}$`);
      if( src.match( regExp) ){
        componentType = App.mediaConnectionTagTypes[ mediaConnectionTagTypeKeys[ i ] ];
        break;
      }
    }

    this.state = {
      src,
      componentType
    }
  }

  render(){
    const { src, componentType } = this.state;
    switch( componentType ){
    case App.mediaTagTypeAudio:
      return <Audio {...this.props} src={src} />;
    case App.mediaTagTypeVideo:
      return <Video {...this.props} src={src} />;
    }
  }
}
