import React, { Component } from 'react'
import Thread from 'common/schemas/state/Thread';

export default class Audio extends Component {

  constructor(props) {
    super(props);
  }

  render(){
    const { src, state } = this.props;
    const { style } = state;
    return (
      <audio
        src={ src }
        style={ style.audio.self }
        preload="true"
        loop={ false }
        controls={ true }
        autoPlay={ false }
        data-component-name={"Audio"}
      />
    );
  }
}
