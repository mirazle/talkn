import App from 'common/schemas/state/App';
import define from 'common/define';
import React, { Component } from "react"
import Detail from './Detail';
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

  renderDetail(){
    const{ app } = this.props.state;
    return app.screenMode === App.screenModeSmallLabel ?
      <Detail type={'SMALL'} {...this.props} /> : null ;
  }

 	render() {
		const{ state } = this.props;
    const { style } = state;

    return (
      <main data-component-name={this.constructor.name} style={ style.main.self }>
        {this.renderHeader()}
        <Screen {...this.props} />
        {this.renderDetail()}
      </main>
		);
 	}
}
