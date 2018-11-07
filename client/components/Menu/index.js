import React, { Component } from "react"
import define from 'common/define';
import App from 'common/schemas/state/App';
import MenuUsers from 'client/components/Menu/MenuUsers';
import MenuIndex from 'client/components/Menu/MenuIndex';
import MenuLogs from 'client/components/Menu/MenuLogs';
import MenuSetting from 'client/components/Menu/MenuSetting';
import Header from '../Header';
import MenuFooter from '../MenuFooter';

export default class Menu extends Component {

  constructor(props) {
    super(props);
    this.handleOnClickMultistream = this.handleOnClickMultistream.bind(this);
    this.handleOnClickLoginTwitter = this.handleOnClickLoginTwitter.bind(this);
    this.handleOnClickLoginFacebook = this.handleOnClickLoginFacebook.bind(this);
  }

  handleOnClickMultistream(){
    const{ app, setting } = this.props.state;
    const multistream = setting.multistream ? false : true ;

    if( app.isOpenNotif ){
      this.props.closeNotif();
    }
  }

  handleOnClickLoginFacebook(){
    const{ thread } = this.props.state;
    const href = `https://talkn.io:8443/auth/facebook?url=${window.location.href}`;
    location.href = href;
  }

  handleOnClickLoginTwitter(){
    const{ thread } = this.props.state;
    const href = `https://talkn.io:8443/auth/twitter?url=${window.location.href}`;
    location.href = href;
  }

  renderFriendLiLabel( name, icon, connection ){
    const { style } = this.props.state;
    const href = `/${connection}`;
    const label = connection ?
      (<span style={ style.menu.namesAddConnection }>{ name }<br />{ connection }</span>) :
      (<span style={ style.menu.names }><br />{ name }</span>) ;

    return(
      <a style={ style.menu.wrap } href={ href } >
        <img style={ style.menu.img } src={ icon } />
        { label }
      </a>
    );
  }

  responseFacebook(response) {

  }

  renderMenuComponent(){
    const {  app } = this.props.state;
    let menuComponent;
    switch( app.menuComponent ){
    case App.menuComponentUsersLabel :
      menuComponent = <MenuUsers {...this.props} />
      break;
    case App.menuComponentIndexLabel :
      menuComponent = <MenuIndex {...this.props} />
      break;
    case App.menuComponentLogsLabel :
      menuComponent = <MenuLogs {...this.props} />
      break;
    case App.menuComponentSettingLabel :
      menuComponent = <MenuSetting {...this.props} />
      break;
    }
    return menuComponent;
  }

  renderHeader(){
    const{ app } = this.props.state;
    return app.type === define.APP_TYPES.EXTENSION ?
      <Header {...this.props} /> : null;
  }

  renderFooter(){
    const { app } = this.props.state;
    if( app.type ===  define.APP_TYPES.EXTENSION){
      return null;
    }else{
      switch( app.screenMode ){
      case App.screenModeSmallLabel :
        return <MenuFooter {...this.props} />;
      case App.screenModeMiddleLabel : 
      case App.screenModeLargeLabel : 
        return null;
      }
    }
  }

 	render() {
    const { style } = this.props.state;
		return (
      <div data-component-name={this.constructor.name} style={ style.menu.self } >
        {this.renderHeader()}
        <div style={ style.menu.wrapComponent } >
          {this.renderMenuComponent()}
        </div>
        {this.renderFooter()}
      </div>
		);
 	}
}
