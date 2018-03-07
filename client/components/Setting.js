import React, { Component, PropTypes } from "react"
import User from 'common/schemas/state/User';

export default class Setting extends Component {

  constructor(props) {
    super(props);
    this.handleOnClickchildrenThreadView = this.handleOnClickchildrenThreadView.bind(this);
  }

  handleOnClickchildrenThreadView(){
    const{ control } = this.props.state;
    const childrenThreadView = control.childrenThreadView ? false : true ;
    talknAPI.onClickChildrenThreadView( childrenThreadView );
  }

 	render() {
    const { style, user, setting } = this.props.state;
    const childrenThreadViewLabel = user.childrenThreadView ? 'ON' : 'OFF';
		return (
      <div style={ style.setting.self } >
        <div style={ style.setting.scroll } >
          <br />
          <ol style={ style.setting.columns }>
            <li style={ style.setting.column }>
              Account: mirazle
            </li>
            <li style={ style.setting.columnLast }>
              → LOGOUT
            </li>
          </ol>
          <br />
          <ol style={ style.setting.columns }>
            <li
              style={ style.setting.column }
              onClick={ this.handleOnClickchildrenThreadView }
            >
              Children thread view: {childrenThreadViewLabel}
            </li>
            <li style={ style.setting.columnLast }>
              Save Index: OFF
            </li>
          </ol>
        </div>
      </div>
		);
 	}
}
