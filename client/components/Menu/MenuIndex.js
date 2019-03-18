import React, { Component } from "react";
import App from 'common/schemas/state/App';
import conf from 'common/conf';
import Icon from '../Icon';
import MenuIndexList from './MenuIndexList';

export default class MenuIndex extends Component {

  constructor(props) {
    super(props);
    const {rootConnection} = props.state.app;
    this.state = {rootConnection};
    this.handleOnClickUpdate = this.handleOnClickUpdate.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnKeyPress = this.handleOnKeyPress.bind(this);
  }

  handleOnClickUpdate( connection ){
    const { rootConnection } = this.props.state.app;
    talknAPI.findMenuIndex( rootConnection );
  }

  handleOnChange( e ){
    this.setState({rootConnection: e.target.value});
  }

  handleOnKeyPress( e ){
    if ( e.nativeEvent.keyCode === 13 ) {
      const value = e.target.value;
      let href = "";
      if( value.indexOf( "http://" ) === 0 ){
        href = value.replace( /^http:\//, "" );
      }else if(value.indexOf( "https://" ) === 0){
        href = value.replace( /^https:\//, "" );
      }else if(value.indexOf( "//" ) === 0){
        href = value.replace( /^\/\//, "/" );
      }else if(value.indexOf( "/" ) === 0){
        href = value;
      }else{
        href = `/${value}`;
      }
      location.href = `https://${conf.domain}${href}`;
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
    const { style } = this.props.state;
    const { icon } = style;
    const Search = Icon.getSearch( icon.search );
    const Update = Icon.getUpdate( icon.update );

		return (
      <nav data-component-name={this.constructor.name} style={style.menuIndex.self}>

        <header style={style.menuIndex.header}>
          <div style={style.menuIndex.headerSearchIcon}>
            { Search }
          </div>
          <input
            type={ 'text' }
            style={style.menuIndex.headerInput}
            rows={1}
            onChange={this.handleOnChange}
            onKeyPress={this.handleOnKeyPress}
            placeholder={"Input favorite url"}
            value={this.state.rootConnection}
          />
          <div
            style={style.menuIndex.headerUpdateIcon}
            onClick={this.handleOnClickUpdate}
          >
            { Update }
          </div>
        </header>

        <ol style={style.menuIndex.ol}>
          {this.renderLi()}
        </ol>
      </nav>
		);
 	}
}
