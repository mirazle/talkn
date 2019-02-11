import React, { Component, PropTypes } from "react"

export default class  Style extends Component {

 	render() {
		const{ state, talknAPI } = this.props;
    const { app, style } = state;  
    const fontSize = app.width <= 290 ? 10 : 12;

    return (
      <style type='text/css'>
        {`
          #talkn1 textarea::placeholder {
            text-indent: 2%;
            font-size: ${fontSize}px;
            color: rgb(170, 170, 170);
          }
        `}
      </style>
		);
 	}
}
