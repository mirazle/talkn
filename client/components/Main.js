import define from 'common/define';
import React, { Component } from "react"
import Screen from './Screen';
import Header from './Header';

export default class Main extends Component {

  constructor(props) {
    super(props);
  }

  renderHeader(){
    const{ app } = this.props.state;
    return app.type === define.APP_TYPES.EXTENSION ?
      null : <Header {...this.props} />;
  }

 	render() {
		const{ state } = this.props;
    const { style } = state;

    return (
      <main data-component-name={this.constructor.name} style={ style.main.self }>
        {this.renderHeader()}
        <Screen {...this.props} />
      </main>
		);
 	}
}
