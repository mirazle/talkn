import conf from 'common/conf';
import Sequence from 'common/Sequence';
import React, { Component } from "react"

export default class LockMenu extends Component {

  constructor(props) {
    super(props);
    this.handleOnClickToWeb = this.handleOnClickToWeb.bind(this);
    this.handleOnClickToTalkn = this.handleOnClickToTalkn.bind(this);
  }

  handleOnClickToWeb(){
    const { threadDetail } = this.props.state;
    console.log(this.props.state);

    if( threadDetail.protocol === Sequence.TALKN_PROTOCOL ){
      location.href = threadDetail.connection;
    }else{
      location.href = threadDetail.protocol + "/" + threadDetail.connection;
    }
  }

  handleOnClickToTalkn(){
    const { threadDetail } = this.props.state;
    location.href = `//${conf.domain}${threadDetail.connection}`;
  }

 	render() {
    const { app, style } = this.props.state;
    switch( app.openLockMenu ){
    case 1:
      return (
        <div data-component-name={this.constructor.name} style={style.lockMenu.menuWeb}>
          <header style={style.lockMenu.header}>
            WEB
          </header>
          <ul style={style.lockMenu.ul}>
            <li style={style.lockMenu.li} onClick={this.handleOnClickToWeb}>Web page</li>
            <li style={style.lockMenu.liLast} onClick={this.handleOnClickToTalkn}>Talkn</li>
          </ul>
        </div>
      );
    case 2:
      return (
        <div data-component-name={this.constructor.name} style={style.lockMenu.menuShare}>
          <header style={style.lockMenu.header}>
            SHARE
          </header>
          <ul style={style.lockMenu.ul}>
            <li style={style.lockMenu.li}>Embed</li>
            <li style={style.lockMenu.li}>Twitter</li>
            <li style={style.lockMenu.li}>Facebook</li>
          </ul>
        </div>
      );
    default :
      return null;
    }
 	}
}
