import define from 'common/define';
import App from 'common/schemas/state/App';
import React, { Component } from "react"
import Screen from './Screen';
import Header from './Header';
import Notif from './Notif';
import InnerNotif from './InnerNotif';
import LockMenu from './LockMenu';
import DetailFooter from './DetailFooter';

export default class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      notifs: [],
    };
  }

  componentDidUpdate(){
    const { state, createNotif } = this.props;
    const { app, user, actionLog, thread, style } = state;

    switch( actionLog[ 0 ] ){
    case 'OPEN_NOTIF':
      const posts = state[ `posts${user.dispThreadType}` ];
      const lastPost = posts[posts.length - 1];
      if(
        lastPost &&
        app.type === define.APP_TYPES.EXTENSION &&
        !app.isOpenMain
      ){

        createNotif();

        this.setState({
          notifs: this.state.notifs.concat(
            <Notif
              key={lastPost._id}
              app={app}
              style={style}
              thread={thread}
              post={lastPost}
            />
          )
        });
      }
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
    const { style } = this.props.state;
    return (
      <ol data-component-name="Notifs" style={style.notif.notifs}>
        {this.state.notifs}
      </ol>
    );
  }
  
  renderLockMenu(){
    const { app } = this.props.state;
    return app.screenMode !== App.screenModeSmallLabel ?  
      <LockMenu {...this.props} /> : null ;
  }
  
  renderDetailFooter(){
    const { app } = this.props.state
    switch( app.screenMode ){
    case App.screenModeSmallLabel :
      return null;
    case App.screenModeMiddleLabel : 
    case App.screenModeLargeLabel : 
      return <DetailFooter {...this.props } />;
    }
  }

  renderInnerNotif(){
    return <InnerNotif {...this.props}/>;
  }

 	render() {
		const{ state } = this.props;
    const { style } = state;
    return (
      <main
        data-component-name={this.constructor.name}
        style={ style.main.self }
        onTransitionEnd={()=>{}}
      >
        {this.renderHeader()}
        {this.renderScreen()}
        {this.renderNotif()}
        {this.renderLockMenu()} 
        {this.renderInnerNotif()}
      </main>
		);
 	}
}
