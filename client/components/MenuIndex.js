import React, { Component, PropTypes } from "react";
import Container from 'client/style/Container';
import User from 'common/schemas/state/User';

export default class MenuIndex extends Component {

  renderLi(){
    const { style, menuIndex } = this.props.state;
    return menuIndex.map( ( d ) => {
      console.log( d.connection );
      if(  d.connection === '' ) return null;
      return (
        <li key={ d.connection }>
          { d.connection }<br />
          { d.post }
          <hr />
        </li>
      )
    });
  }

 	render() {
		return (
      <ol>
        {this.renderLi()}
      </ol>
		);
 	}
}
