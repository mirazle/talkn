import React, { Component } from 'react'

export default class Video extends Component {

  constructor(props) {
    super(props);
  }

  getSrc(){
    const { thread } = this.props.state;
    return thread.protocol + "/" +  thread.connection.replace(/\/$/, '');
  }

  render(){
    const src = this.getSrc();
    return (
      <video
        src={ src }
        style={ style.video.self }
        preload="true"
        loop={ false }
        controls={ true }
        autoPlay={ false }
        controlslist={"nodownload"}
        data-component-name={"Audio"}
      />
    );
  }
}
