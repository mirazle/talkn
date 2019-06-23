import React, { Component } from "react"
import App from 'common/schemas/state/App';
import util from 'common/util';
import conf from 'common/conf';

const regex = /^\s*$/;

export default class PostsFooter extends Component {

  constructor(props) {
    super(props);
    this.state = {focusSetIntervalId: 0};  
    this.renderButton = this.renderButton.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnKeyPress = this.handleOnKeyPress.bind(this);
  }

  componentDidMount(){
    talknAPI.componentDidMounts( "PostsFooter" );
  }

  handleOnClick( e ){
    console.log("ON CLICK");
    const value = this.refs.postArea.innerHTML;
    if( !App.validInputPost( value ) ){
      if( !value ){
        talknAPI.post();
        talknAPI.onChangeInputPost(''); 
        if(app.extensionMode === App.extensionModeExtModalLabel){
          talknWindow.parentTo( "setInputPost", {inputPost: false} );
        }
      }
    }
  }
  
  handleOnChange( e ){
    if( !App.validInputPost( e.target.value ) ){
      const { app } = this.props.state;
      talknAPI.onChangeInputPost( e.target.value );
      if(app.extensionMode === App.extensionModeExtModalLabel){
        if( !regex.test( e.target.value ) ){
          talknWindow.parentTo( "setInputPost", {inputPost: true} );
        }else{
          talknWindow.parentTo( "setInputPost", {inputPost: false} );
        }
      }
    }
  }

  handleOnKeyPress( e ){
    clearInterval(this.state.focusSetIntervalId);

    const { app } = this.props.state;
    if ( e.nativeEvent.keyCode === 13 ) {
      if( e.nativeEvent.shiftKey ){
        talknAPI.onChangeInputPost( e.target.value + '\n');
        if(app.extensionMode === App.extensionModeExtModalLabel){
          talknWindow.parentTo( "setInputPost", {inputPost:true} );
        }
      }else{
        if( !regex.test( e.target.value ) ){
          talknAPI.post();
          talknAPI.onChangeInputPost('');

          if(app.extensionMode === App.extensionModeExtModalLabel){
            talknWindow.parentTo( "setInputPost", {inputPost: false} );
          }
        }
      }
    }
  }
/*
  handleOnFocus( e ){
    const { app } = this.props.state;
    if( app.screenMode === App.screenModeSmallLabel ){
      talknWindow.setIsScrollBottom();
    }
  }

  handleOnBlur( e ){
    const { app } = this.props.state;
    if( app.screenMode === App.screenModeSmallLabel ){
      clearInterval(this.state.focusSetIntervalId);
      this.setState({focusSetIntervalId: 0});
    }
  }
*/
  getIconStyle(){
    const { thread, style } = this.props.state;
    const favicon = `https://${conf.assetsIconPath}${util.getSaveFaviconName( thread.favicon )}`;
    return thread.favicon ? {...style.postsFooter.icon, backgroundImage: `url(${favicon})` } : style.postsFooter.icon ;
  }

  renderButton(){
    const { style, app } = this.props.state;

    if( app.extensionMode === App.extensionModeExtModalLabel ){
      return null;
    }else{
      return (
        <button style={style.postsFooter.button} onClick={this.handleOnClick}>
          talkn
        </button>
      )
    }
  }

  render() {
    const { state, handleOnClickToggleMain } = this.props;
    const { style, app } = state;  
    const value = app.inputPost;

    return (
      <div data-component-name={"PostsFooter"} style={ style.postsFooter.self }>
        <div style={ this.getIconStyle() } onClick={handleOnClickToggleMain}/>
        <textarea
          data-component-name={"postArea"}
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
        {this.renderButton()}
      </div>
    );
  }
}
