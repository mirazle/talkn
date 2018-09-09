import React, { Component, PropTypes } from "react";
import Container from 'client/style/Container';
import User from 'common/schemas/state/User';
import util from 'common/util';
import conf from 'common/conf';
import App from 'common/schemas/state/App';
import Icon from '../Icon';
import MenuIndexList from './MenuIndexList';

export default class MenuLogs extends Component {
  componentDidUpdate(){
    const { app, actionLog } = this.props.state;

    switch( actionLog[ 0 ] ){
    case 'SERVER_TO_CLIENT[EMIT]:changeThread':

      switch( app.screenMode ){
      case App.screenModeSmallLabel :
        app.isOpenMenu = app.isOpenMenu ? false : true;
        talknAPI.onClickToggleDispMenu( app );
        break;
      }
    }
  }

  renderLi(){
    const { state, onClickOtherThread } = this.props;
    const { menuLogs } = state;
    return menuLogs.map( ( mi, index ) => {
      return(
        <MenuIndexList
          key={ mi.connection }
          menuIndexList={mi}
          onClickOtherThread={onClickOtherThread}
          {...this.props.state}
        />
      )
    });
  }

 	render() {
    const { style, thread } = this.props.state;
    const { connection } = thread;
    const { icon } = style;
    const Search = Icon.getSearch( icon.search );
    const dispConnection = connection.replace( '/', '' );
		return (
      <nav style={style.menuIndex.self}>
        <header style={style.menuIndex.header}>
          <span style={style.menuIndex.headerSearchIcon}>
            { Search }
          </span>
          <span style={style.menuIndex.headerConnection}>
            <input
              type={ 'text' }
              style={style.menuIndex.headerInput}
              rows={1}
              onChange={this.handleOnChange}
              onKeyPress={this.handleOnKeyPress}
              defaultValue={ dispConnection }
            />
          </span>
        </header>
        <ol style={style.menuIndex.ol}>
          {this.renderLi()}
        </ol>
      </nav>
		);
 	}
}
