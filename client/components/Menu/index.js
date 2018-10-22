import conf from 'client/conf';
import React, { Component, PropTypes } from "react"
import App from 'common/schemas/state/App';
import User from 'common/schemas/state/User';
import MenuLi from 'client/components/Menu/MenuLi';
import MenuUsers from 'client/components/Menu/MenuUsers';
import MenuIndex from 'client/components/Menu/MenuIndex';
import MenuLogs from 'client/components/Menu/MenuLogs';
import MenuSetting from 'client/components/Menu/MenuSetting';
import Icon from '../Icon';

export default class Menu extends Component {

  constructor(props) {
    super(props);
    this.handleOnClickchildrenThreadView = this.handleOnClickchildrenThreadView.bind(this);
    this.handleOnClickLoginTwitter = this.handleOnClickLoginTwitter.bind(this);
    this.handleOnClickLoginFacebook = this.handleOnClickLoginFacebook.bind(this);
  }

  handleOnClickchildrenThreadView(){
    const{ app } = this.props.state;
    const childrenThreadView = app.childrenThreadView ? false : true ;

    if( app.isOpenNotif ){
      this.props.closeNotif();
    }

    talknAPI.onClickChildrenThreadView( childrenThreadView );
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

 	render() {
    const { style, app, user, thread } = this.props.state;
    const { icon } = style;
    const childrenThreadViewLabel = app.childrenThreadView ? 'Children thread view ON' : 'Children thread view OFF';
    const UserIcon = Icon.getUser( icon.user );
    const IndexIcon = Icon.getIndex( icon.index );
    const Logs = Icon.getLogs( icon.logs );
    const Setting = Icon.getSetting( icon.setting );
		return (
      <div style={ style.menu.self } >

        <div style={ style.menu.wrapComponent } >
          {this.renderMenuComponent()}
        </div>
        <footer style={ style.menu.footer }>
          <div style={ style.menu.footerChildMoney } onClick={ ()=> talknAPI.onClickMenu( App.menuComponentUsersLabel ) } {...Icon.getDecolationProps1( 'icon', 'user', 'div' )}>
            { UserIcon }
          </div>
          <div style={ style.menu.footerChildMoney } onClick={ ()=> talknAPI.onClickMenu( App.menuComponentIndexLabel ) }  {...Icon.getDecolationProps1( 'icon', 'index', 'div' )}>
            { IndexIcon }
          </div>
          <div style={ style.menu.footerChildMoney } onClick={ ()=> talknAPI.onClickMenu( App.menuComponentLogsLabel ) }  {...Icon.getDecolationProps1( 'icon', 'logs', 'div' )}>
            { Logs }
          </div>
          <div style={ style.menu.footerChildMoney } onClick={ ()=> talknAPI.onClickMenu( App.menuComponentSettingLabel ) }  {...Icon.getDecolationProps1( 'icon', 'setting', 'div' )}>
            { Setting }
          </div>
        </footer>
      </div>
		);
 	}
}
