import React, { Component, PropTypes } from "react";
import Container from 'client/style/Container';
import User from 'common/schemas/state/User';
import conf from 'common/conf';

export default class MenuUsers extends Component {


 	render() {
		return (
      <ol>
        <li>
          SOCIAL USERS<br />
          <br />
          <a href={`https://${conf.sessionURL}/twitter/auth`}>Login Twitter</a>
        </li>
      </ol>
		);
 	}
}
