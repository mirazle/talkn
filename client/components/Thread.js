import React, { Component, PropTypes } from "react"
import Posts from './Posts';

export default class Thread extends Component {

 	render() {
		const{ state, talknAPI } = this.props;
    const { app, user, style } = state;
		return (
      <div style={ style.thread.self }>
        <header style={ style.thread.header } />
        <main style={ style.main.self }>
          <div style={style.thread.more} />
          <Posts {...this.props} />
          <div style={style.thread.notif}>
            NEW POST
          </div>
        </main>
      </div>
		);
 	}
}
