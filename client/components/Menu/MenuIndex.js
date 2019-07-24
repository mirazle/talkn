import React, { Component } from "react";
import App from 'common/schemas/state/App';
import conf from 'common/conf';
import Icon from '../Icon';
import MenuIndexList from './MenuIndexList';

export default class MenuIndex extends Component {

  constructor(props) {
    super(props);
    const {app, style} = props.state;
    const {rootConnection} = app;
    this.state = {rootConnection, style: style.menuIndex.headerUpdateIcon};
    this.handleOnClickUpdate = this.handleOnClickUpdate.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnKeyPress = this.handleOnKeyPress.bind(this);
  }

  getDecolationProps(){
    return {
      onMouseOver: () => {
        this.setState(
          { style:
            {...this.state.style,
              transition: '200ms',
              transform: 'scale( 1.1 ) rotate( 0deg )'
            }
          }
        );
      },
      onMouseLeave: () => {
        this.setState( {style:
          {...this.state.style,
            transition: '600ms',
            transform: 'scale( 1 ) rotate( 0deg )'
          }
        });
      },
      onMouseDown: () => {
        this.setState( {style:
          {...this.state.style,
            transform: 'scale( 0.9 ) rotate( 180deg)'
          }
        });
      },
      onMouseUp: () => {
        this.setState( {style:
          {...this.state.style,
            transform: 'scale( 1 ) rotate( 0deg )'
          }
        });
      },
    }
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

        if( !app.isLinkConnection ){

          talknAPI.onClickToggleDispMenu();
        }
        break;
      }
    }
  }

  renderLi(){
    const {
      state,
      handleOnClickConnection,
      onClickToTimelineThread,
      onClickToMultiThread,
      onClickToSingleThread,
      onClickToChildThread,
      onClickToLogsThread
    } = this.props;

    const { menuIndex } = state;
    return menuIndex.map( ( mi, index ) => {
      return(
        <MenuIndexList
          key={ mi.connection }
          menuIndexList={mi}
          handleOnClickConnection={handleOnClickConnection}
          onClickToTimelineThread={onClickToTimelineThread}
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
    const headerUpdateIconStyle = this.state.style;
    const { style } = this.props.state;
    const { icon } = style;
    const Search = Icon.getSearch( icon.search );
    const Update = Icon.getUpdate( icon.update );
    return (
      <nav data-component-name={"MenuIndex"} style={style.menuIndex.self}>

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
            placeholder={"Tune ch"}
            value={this.state.rootConnection}
          />
          <div
            style={headerUpdateIconStyle}
            onClick={this.handleOnClickUpdate}
            {...this.getDecolationProps()}
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
