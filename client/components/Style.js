import React, { Component, PropTypes } from "react"

export default class  Style extends Component {

 	render() {
		const{ state } = this.props;
    const { app } = state;  
    let fontSize = 12;

    return (
      <style type='text/css'>
        {`
          #talkn1 textarea::placeholder {
            text-indent: 3%;
            font-size: ${fontSize}px;
            letter-spacing: 2px;
            color: rgb(170, 170, 170);
          }
          #talkn1 input::placeholder {
            text-indent: 3%;
            font-size: ${fontSize}px;
            color: rgb(170, 170, 170);
          }
        `}
      </style>
		);
 	}
}
