import React, { Component } from "react"
import App from 'common/schemas/state/App';
import Icon from 'client/components/Icon';

export default class MenuFooter extends Component {
  render() {
    const { style } = this.props.state;
    const { icon } = style;
    const UserIcon = Icon.getUser( icon.user );
    const IndexIcon = Icon.getIndex( icon.index );
    const Logs = Icon.getLogs( icon.logs );
    const Setting = Icon.getSetting( icon.setting );
    return (
      <div data-component-name={this.constructor.name} style={ style.menuFooter.self }>
        <div style={ style.menuFooter.childMoney } onClick={ () => talknAPI.onClickMenu( App.menuComponentUsersLabel ) } {...Icon.getDecolationProps1( 'icon', 'user', 'div' )}>
          { UserIcon }
        </div>
        <div style={ style.menuFooter.childMoney } onClick={ () => talknAPI.onClickMenu( App.menuComponentIndexLabel ) }  {...Icon.getDecolationProps1( 'icon', 'index', 'div' )}>
          { IndexIcon }
        </div>
        <div style={ style.menuFooter.childMoney } onClick={ ()=> talknAPI.onClickMenu( App.menuComponentLogsLabel ) }  {...Icon.getDecolationProps1( 'icon', 'logs', 'div' )}>
          { Logs }
        </div>
        <div style={ style.menuFooter.childMoney } onClick={ ()=> talknAPI.onClickMenu( App.menuComponentSettingLabel ) }  {...Icon.getDecolationProps1( 'icon', 'setting', 'div' )}>
          { Setting }
        </div>
      </div>
		);
 	}
}
