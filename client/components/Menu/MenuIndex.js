import React, { Component } from "react";
import App from 'common/schemas/state/App';
import Icon from '../Icon';
import MenuIndexList from './MenuIndexList';

export default class MenuIndex extends Component {

  constructor(props) {
    super(props);
    const {rootConnection} = props.state.app;
    this.state = {rootConnection};
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnKeyPress = this.handleOnKeyPress.bind(this);
  }

  handleOnChange( e ){
    this.setState({rootConnection: e.target.value});
  }

  handleOnKeyPress( e ){
    if ( e.nativeEvent.keyCode === 13 ) {
      const href = e.target.value.replace(/^https:\//, '').replace(/^http:\//, '');
      location.href = href;
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
          <span style={style.menuIndex.headerConnection}>
            <input
              type={ 'text' }
              style={style.menuIndex.headerInput}
              rows={1}
              onChange={this.handleOnChange}
              onKeyPress={this.handleOnKeyPress}
              placeholder={"Input URL"}
              value={this.state.rootConnection}
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
