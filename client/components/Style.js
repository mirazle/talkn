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
            text-indent: 2% !important;
            font-size: ${fontSize}px !important;
            color: rgb(170, 170, 170) !important;
          }
        `}
      </style>
		);
 	}
}
