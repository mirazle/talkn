import React, { Component } from "react"
import define from 'common/define';
import App from 'common/schemas/state/App';
import util from 'common/util';
import conf from 'common/conf';
import Icon from 'client/components/Icon';

export default class PostsFooter extends Component {

  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnKeyPress = this.handleOnKeyPress.bind(this);
    this.handleOnFocus = this.handleOnFocus.bind(this);
  }

  handleOnClick( e ){
    const value = this.refs.postArea.innerHTML;
    if( !App.validInputPost( value ) ){
      if(value && value !== ""){
        console.log(value);
        talknAPI.post();
        talknAPI.onChangeInputPost('');
      }
    }
  }

  // TODO スマホのマルチバイト入力は最下位スクロールでいける！？

  handleOnChange( e ){
    if( !App.validInputPost( e.target.value ) ){

      const { app } = this.props.state;
      if( app.screenMode === App.screenModeSmallLabel ){

        if( !talknWindow.isScrollBottom ){
/*
          const htmlScrollHeight = document.querySelector("html").scrollHeight;
          alert(
            `htmlScrollHeight( ${htmlScrollHeight} ) === window.innerHeight( ${window.innerHeight} ) + window.scrollY( ${window.scrollY} ) `
            );
*/
            window.scrollTo(0, 9999999);
          talknWindow.setIsScrollBottom();
        }
      }
      talknAPI.onChangeInputPost( e.target.value );
    }
  }

  handleOnKeyPress( e ){
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
    window.scrollTo(0, 9999999);
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
      <div data-component-name={this.constructor.name} style={ style.postsFooter.self }>
        <div
          style={ this.getIconStyle() }
          { ...this.getIconProps() }
          onClick={handleOnClickToggleMain}
        />
        <textarea
          style={style.postsFooter.textarea}
          ref={"postArea"}
          rows={1}
          onChange={this.handleOnChange}
          onKeyPress={this.handleOnKeyPress}
          onFocus={this.handleOnFocus}
          value={app.inputPost}
          placeholder='Comment to this web'
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
