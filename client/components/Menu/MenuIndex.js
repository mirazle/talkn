import React, { Component } from "react";
import App from 'common/schemas/state/App';
import Icon from '../Icon';
import MenuIndexList from './MenuIndexList';

export default class MenuIndex extends Component {

  constructor(props) {
    super(props);
    this.handleOnKeyPress = this.handleOnKeyPress.bind(this);
  }


  handleOnKeyPress( e ){
    if ( e.nativeEvent.keyCode === 13 ) {
      const { openInnerNotif } = this.props;
      openInnerNotif();
    }
  }

  componentDidUpdate(){
    const { app, actionLog } = this.props.state;
    switch( actionLog[ 0 ] ){
    case 'SERVER_TO_CLIENT[EMIT]:changeThread':
      switch( app.screenMode ){
      case App.screenModeSmallLabel :
        talknAPI.onClickToggleDispMenu();
        break;
      }
    }
  }

  renderLi(){
    const { state, onClickToMultiThread, onClickToSingleThread, onClickToChildThread, onClickToLogsThread } = this.props;
    const { menuIndex } = state;
    return menuIndex.map( ( mi, index ) => {
      return(
        <MenuIndexList
          key={ mi.connection }
          menuIndexList={mi}
          onClickToMultiThread={onClickToMultiThread}
          onClickToSingleThread={onClickToSingleThread}
          onClickToChildThread={onClickToChildThread}
          onClickToLogsThread={onClickToLogsThread}
          rank={ index }
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
