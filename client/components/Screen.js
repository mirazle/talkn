import React, { Component } from "react"
import Posts from './Posts';
import Menu from './Menu/';
import Detail from './Detail';
import App from 'common/schemas/state/App';

export default class Screen extends Component {
 	render() {
		const{ state } = this.props;
    const { app, style } = state;

		return (
      <div style={ style.screen.self }>
        <Menu {...this.props} />
        <Posts {...this.props} />
        { app.screenMode !== App.screenModeSmallLabel ? <Detail type={'WIDE'} {...this.props} /> : null }
      </div>
		);
 	}
}
