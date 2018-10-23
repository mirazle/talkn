import React, { Component, PropTypes } from "react";
import Container from 'client/style/Container';
import User from 'common/schemas/state/User';

export default class MenuSetting extends Component {
 	render() {
		return (
      <ol data-component-name={this.constructor.name}>
        <li>
          menu SETTING
        </li>
      </ol>
		);
 	}
}
