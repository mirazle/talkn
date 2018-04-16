import React, { Component, PropTypes } from "react"

export default class  Style extends Component {

 	render() {
		const{ state, talknAPI } = this.props;
    const { app, user, style } = state;

		return (
      <style type='text/css'>
        {'talkn ::placeholder {color: rgb(200, 200, 200); }'}
      </style>
		);
 	}
}
