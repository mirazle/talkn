import React, { Component } from "react";
import App from 'common/schemas/state/App';
import Icon from '../Icon';
import MenuIndexList from './MenuIndexList';

export default class MenuIndex extends Component {

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
    const { menuIndex } = state;
    return menuIndex.map( ( mi, index ) => {
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
    const { style, app } = this.props.state;
    const { rootConnection } = app;
    const { icon } = style;
    const Search = Icon.getSearch( icon.search );
    const dispConnection = rootConnection.replace( '/', '' );

		return (
      <nav data-component-name={this.constructor.name} style={style.menuIndex.self}>

        <header style={style.menuIndex.header}>
          <span style={style.menuIndex.headerSearchIcon}>
            { Search }
          </span>
          <button style={style.menuIndex.headerRootConnection}>{rootConnection}</button>
          <span style={style.menuIndex.headerConnection}>
            <input
              type={ 'text' }
              style={style.menuIndex.headerInput}
              rows={1}
              onChange={this.handleOnChange}
              onKeyPress={this.handleOnKeyPress}
              defaultValue={''}
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
