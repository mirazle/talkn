import React, { Component } from "react"
import App from 'common/schemas/state/App';
import Container from 'client/style/Container';
import Icon from 'client/components/Icon';

export default class List extends Component {

  constructor(props){
    super(props);
    this.handleOnClick = this.handleOnClick.bind( this );
  }

  handleOnClick(){

  }

  render() {
    const { style, thread } = this.props.state;
    return (
      <ul
        data-component-name={"MediaList"}
        onClick={ this.handleOnClick }
        style={ style.mediaList.self }
      >
        <li></li>
        <li></li>
      </ul>
		);
 	}
}
