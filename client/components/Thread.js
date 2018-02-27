import React, { Component, PropTypes } from "react"
import Posts from './Posts';

export default class Thread extends Component {

 	render() {
		const{ state, talknAPI } = this.props;
    const { app, user, thread, style } = state;
		return (
      <div style={ style.thread.self }>
        <header style={ style.thread.header }>
          <div style={ style.thread.headerChild }>{thread.watchCnt}</div>
          <div style={ style.thread.headerChild }></div>
          <div style={ style.thread.headerChild }></div>
        </header>
        <main style={ style.main.self }>
          <Posts {...this.props} />
          <div style={style.thread.notif}>NEW POST</div>
        </main>
      </div>
		);
 	}
}
