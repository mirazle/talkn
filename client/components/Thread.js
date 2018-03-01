import React, { Component, PropTypes } from "react"
import Posts from './Posts';
import Icon from './Icon';

export default class Thread extends Component {

 	render() {
		const{ state, talknAPI } = this.props;
    const { app, user, thread, style } = state;
    const Menu = Icon.getMenu();
    const HeadTab = Icon.getHeadTab();
		return (
      <div style={ style.thread.self }>
        <header style={ style.thread.header }>
          <div style={ style.thread.headerChildWatchCnt }>{thread.watchCnt}</div>
          <div style={ style.thread.headerChild }>{ HeadTab }</div>
          <div style={ style.thread.headerChild }>{ Menu }</div>
        </header>
        <main style={ style.main.self }>
          <Posts {...this.props} />
          <div style={style.thread.notif}>NEW POST</div>
        </main>
      </div>
		);
 	}
}
