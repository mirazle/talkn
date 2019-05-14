import React, { Component } from "react"
import define from 'common/define';
import App from 'common/schemas/state/App';
import util from 'common/util';
import conf from 'common/conf';
import Icon from 'client/components/Icon';

export default class PostsFooter extends Component {

  constructor(props) {
    super(props);
    this.state = {focusSetIntervalId: 0};
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnKeyPress = this.handleOnKeyPress.bind(this);
    this.handleOnFocus = this.handleOnFocus.bind(this);
    this.handleOnBlur = this.handleOnBlur.bind(this);
  }

  shouldComponentUpdate(props){
    const {app, actionLog} = props.state;
    switch( app.type ){
    case define.APP_TYPES.EXTENSION:
/*
      return [
        "SERVER_TO_CLIENT[BROADCAST]:find",
        "ON_CLICK_TOGGLE_MAIN",
        "ON_CLICK_TOGGLE_DISP_DETAIL",
        "ON_CLICK_OPEN_LOCK_MENU",
        "SERVER_TO_CLIENT[EMIT]:getMore",
        "ON_CLICK_MULTISTREAM",
        "RESIZE_END_WINDOW"

      ].includes( actionLog[0] );
*/
    }
  }

  componentDidMount(){
  }

  handleOnClick( e ){
    const value = this.refs.postArea.innerHTML;
    if( !App.validInputPost( value ) ){
      if(value && value !== ""){
        talknAPI.post();
        talknAPI.onChangeInputPost('');
      }
    }
  }
  
  handleOnChange( e ){
    if( !App.validInputPost( e.target.value ) ){

      const { app } = this.props.state;
      if( app.screenMode === App.screenModeSmallLabel ){
        clearInterval(this.state.focusSetIntervalId);
        window.scrollTo(0, 9999999);
        if( !talknWindow.isScrollBottom ){
            window.scrollTo(0, 9999999);
          talknWindow.setIsScrollBottom();
        }
      }
      talknAPI.onChangeInputPost( e.target.value );
    }
  }

  handleOnKeyPress( e ){
    clearInterval(this.state.focusSetIntervalId);
    if ( e.nativeEvent.keyCode === 13 ) {
      if( e.nativeEvent.shiftKey ){
        talknAPI.onChangeInputPost( e.target.value + '\n');
      }else{
        if(e.target.value !== ""){
          talknAPI.post();
          talknAPI.onChangeInputPost('');
        }
      }
    }
  }

  handleOnFocus( e ){
    const { app } = this.props.state;
    if( app.screenMode === App.screenModeSmallLabel ){
      if( this.state.focusSetIntervalId === 0 ){
        window.scrollTo(0, 9999999);
        const focusSetIntervalId = setInterval(  () => {
          window.scrollTo(0, 9999999)
        }, 500);
        this.setState({focusSetIntervalId});
      }
    }
  }

  handleOnBlur( e ){
    const { app } = this.props.state;
    if( app.screenMode === App.screenModeSmallLabel ){
      clearInterval(this.state.focusSetIntervalId);
      this.setState({focusSetIntervalId: 0});
    }
  }

  getIconStyle(){
    const { thread, style } = this.props.state;
    const favicon = `https://${conf.assetsIconPath}${util.getSaveFaviconName( thread.favicon )}`;
    return thread.favicon ? {...style.postsFooter.icon, backgroundImage: `url(${favicon})` } : style.postsFooter.icon ;
  }

  getIconProps(){
    const { app } = this.props.state;
    return app.isOpenMainPossible ? Icon.getDecolationProps1( 'footer', 'icon' ) : {};
  }

  render() {
    const { state, handleOnClickToggleMain } = this.props;
    const { style, app } = state;  
    return (
      <div  
        data-component-name={this.constructor.name}
        style={ style.postsFooter.self }
      >
        <div
          style={ this.getIconStyle() }
          onClick={handleOnClickToggleMain}
        />
        <textarea
          style={style.postsFooter.textarea}
          ref={"postArea"}
          rows={1}
          onChange={this.handleOnChange}
          onKeyPress={this.handleOnKeyPress}
          onFocus={this.handleOnFocus}
          onBlur={this.handleOnBlur}
          value={app.inputPost}
          placeholder='Comment to web'
        />
        <button
          style={style.postsFooter.button}
          onClick={this.handleOnClick}
          >
          talkn
        </button>
      </div>
		);
 	}
}
