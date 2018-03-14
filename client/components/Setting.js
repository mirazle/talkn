import React, { Component, PropTypes } from "react"
import User from 'common/schemas/state/User';

export default class Setting extends Component {

  constructor(props) {
    super(props);
    this.handleOnClickchildrenThreadView = this.handleOnClickchildrenThreadView.bind(this);
    this.handleOnClickLoginTwitter = this.handleOnClickLoginTwitter.bind(this);
  }

  handleOnClickchildrenThreadView(){
    const{ control } = this.props.state;
    const childrenThreadView = control.childrenThreadView ? false : true ;

    if( control.isOpenNotif ){
      this.props.closeNotif();
    }

    talknAPI.onClickChildrenThreadView( childrenThreadView );
  }

  handleOnClickLoginTwitter(){
    talknAPI.login( 'twitter' );
  }

 	render() {
    const { style, control, user, thread } = this.props.state;
    const childrenThreadViewLabel = control.childrenThreadView ? 'ON' : 'OFF';
		return (
      <div style={ style.setting.self } >
        <div style={ style.setting.scroll } >

          <br />
          <ol style={ style.setting.columns }>
            <li style={ style.setting.column }>
              { thread.connection  }
            </li>
            <li style={ style.setting.columnLast } onClick={ this.handleOnClickchildrenThreadView }>
              Children thread view: {childrenThreadViewLabel}
            </li>
          </ol>

          <br />
          <ol style={ style.setting.columns }>
            <li style={ style.setting.column }>
              Account: {user.uid}
            </li>
            <li style={ style.setting.columnLast } onClick={this.handleOnClickLoginTwitter}>
              → LOGIN
            </li>
          </ol>
          <br />
        </div>
      </div>
		);
 	}
}
