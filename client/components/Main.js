import define from 'common/define';
import React, { Component } from "react"
import Screen from './Screen';
import Header from './Header';
import Notif from './Notif';

export default class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      notifs: [],
    };
  }

  componentDidUpdate(){
    const { actionLog, posts } = this.props.state;
    switch( actionLog[ 0 ] ){
    case 'SERVER_TO_CLIENT[BROADCAST]:post':
      const latPost = posts[posts.length - 1];
      this.setState({
        notifs: this.state.notifs.concat(
          <Notif key={latPost._id} {...latPost} />
        )
      });
      break;
    }
  }

  renderHeader(){
    const{ app } = this.props.state;
    return app.type === define.APP_TYPES.EXTENSION ?
      null : <Header {...this.props} />;
  }

  renderScreen(){
    return <Screen {...this.props} />;
  }

  renderNotif(){
    return <ol>{this.state.notifs}</ol>;
  }

 	render() {
		const{ state } = this.props;
    const { style } = state;

    return (
      <main data-component-name={this.constructor.name} style={ style.main.self }>
        {this.renderHeader()}
        {this.renderScreen()}
        {this.renderNotif()}
      </main>
		);
 	}
}
