import React, { Component } from "react"
import Posts from './Posts';
import Menu from './Menu/';
import Detail from './Detail';
import Modal from './Modal';
import App from 'common/schemas/state/App';

export default class Screen extends Component {

  renderDetail(){
    const { app } = this.props.state;
    return app.screenMode !== App.screenModeSmallLabel ?  
      <Detail type={'WIDE'} {...this.props} /> : null ;
  }

 	render() {
		const{ state } = this.props;
    const { style } = state;
		return (
      <div data-component-name={this.constructor.name} style={ style.screen.self }>
        <Menu {...this.props} />
        <Posts {...this.props} />
        { this.renderDetail() }
        <Modal {...this.props} />
      </div>
		);
 	}
}
