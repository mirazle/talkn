import React, { Component, PropTypes } from "react"
import Detail from './Detail';
import Screen from './Screen';
import Header from './Header';
import App from 'common/schemas/state/App';

export default class Main extends Component {

  constructor(props) {
    super(props);
  }

 	render() {
		const{ state } = this.props;
    const { app, style } = state;
		return (
      <main style={ style.main.self }>
        <Header {...this.props} />
        <Screen {...this.props} />
        { app.screenMode === App.screenModeSmallLabel ? <Detail type={'SMALL'} {...this.props} /> : null }
      </main>
		);
 	}
}
