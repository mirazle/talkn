import React, { Component } from 'react'

export default class Video extends Component {

  constructor(props) {
    super(props);
  }

  render(){
    const { src, state } = this.props;
    const { style } = state;
    return (
      <video
        src={ src }
        style={ style.video.self }
        preload="true"
        loop={ false }
        controls={ true }
        autoPlay={ false }
        controlsList={"nodownload"}
        data-component-name={"Video"}
      />
    );
  }
}
