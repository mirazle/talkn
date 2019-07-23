import React, { Component } from "react";
import BoardStyle from 'client/style/Board';
import LinkStyle from 'client/style/Link';
import MenuIndexListStyle from 'client/style/Menu/MenuIndexList';

export default class LinkSupporternk extends Component {

  constructor(props) {
    super(props);
  }

 	render() {
    const { title } = this.props;
    return (
      <div>
        BACK | {title}
      </div>
    );
 	}
}