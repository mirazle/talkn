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
    const {actionLog} = props.state;
    return [
      "ON_CHANGE_INPUT_POST",
      "RESIZE_END_WINDOW"
    ].includes( actionLog[0] );
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
        talknWindow.setIsScrollBottom();

        clearInterval(this.state.focusSetIntervalId);
        //if( !talknWindow.isScrollBottom ){
          window.scrollTo(0, 9999999);
          talknWindow.setIsScrollBottom();
        //}
      }

      talknAPI.onChangeInputPost( e.target.value );
    }
  }

  handleOnKeyPress( e ){
    clearInterval(this.state.focusSetIntervalId);

    const { app } = this.props.state;
    if( app.screenMode === App.screenModeSmallLabel ){
      const input = e.target.value.replace( app.inputPost, "" );
    }

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

      talknWindow.setIsScrollBottom();
      //alert( talknWindow.isScrollBottom );

      setTimeout( () => {
//        if(!talknWindow.isScrollBottom ){
          console.log("FOCUS SCROLL");
          window.scrollTo(0, 9999999);
          talknWindow.setIsScrollBottom();
//        }
      }, 100 );

      if( this.state.focusSetIntervalId === 0 ){
/*
        const focusSetIntervalId = setInterval(  () => {
          if(!talknWindow.isScrollBottom ){
            console.log("INTERVAL SCROLL");
            window.scrollTo(0, 9999999);
            talknWindow.setIsScrollBottom();
          }
        }, 1000);

        this.setState({focusSetIntervalId});
*/
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

  render() {
    const { state, handleOnClickToggleMain, debug } = this.props;
    const { style, app } = state;  
    const value = debug && debug !== "" ? debug : app.inputPost;
    return (
      <div  
        data-component-name={"PostsFooter"}
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
          value={value}
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
