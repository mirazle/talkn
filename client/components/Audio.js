import React, { Component } from 'react'

export default class Audio extends Component {

  constructor(props) {
    super(props);
  }

  getSrc(){
    const { thread } = this.props.state;
    return thread.protocol + "/" +  thread.connection.replace(/\/$/, '');
  }

  render(){
    const { style } = this.props.state;
    const src = this.getSrc();
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
