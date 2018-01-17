import React, { Component, PropTypes } from "react"
import ReactDOM from 'react-dom'
import Posts from './Posts';

export default class Thread extends Component {

 	render() {
		const{ state, talknAPI } = this.props;
    const { app, user, style } = state;
		return (
      <div style={ style.thread.self }>
        <header style={ style.thread.header } />
        <main style={ style.main.self }>
          <Posts {...this.props} />
        </main>
      </div>
		);
 	}
}
