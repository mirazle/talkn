import React, { Component, PropTypes } from "react"

export default class  Style extends Component {

 	render() {
		const{ state, talknAPI } = this.props;
    const { app, style } = state;

		return (
      <style type='text/css'>
        {`
          #talkn1 textarea::placeholder {
            font-size: 10px;
            color: rgb(170, 170, 170);
          }
        `}
      </style>
		);
 	}
}
