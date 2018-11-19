import React, { Component } from "react"
import define from 'common/define';
import App from 'common/schemas/state/App';
import util from 'common/util';
import conf from 'common/conf';
import Icon from 'client/components/Icon';

export default class PostsFooter extends Component {

  constructor(props) {
    super(props);
    this.handleOnClickIcon = this.handleOnClickIcon.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnKeyPress = this.handleOnKeyPress.bind(this);
  }

  handleOnClickIcon( e ){
    const { updateApp, state} = this.props;
    const { app } = state;
    if( app.type ===  define.APP_TYPES.EXTENSION ){
      app.isOpenMain = app.isOpenMain ? false : true;
      updateApp( "isOpenMain", app );
      talknAPI.extension("toggleIframe");
    }
  }

  handleOnClick( e ){
    if( !App.validInputPost( e.target.value ) ){
      talknAPI.post();
      talknAPI.onChangeInputPost('');
    }
  }

  handleOnChange( e ){
    if( !App.validInputPost( e.target.value ) ){
      talknAPI.onChangeInputPost( e.target.value );
    }
  }

  handleOnKeyPress( e ){
    if ( e.nativeEvent.keyCode === 13 ) {
      if( e.nativeEvent.shiftKey ){
        talknAPI.onChangeInputPost( e.target.value + '\n');
      }else{
        talknAPI.post();
        talknAPI.onChangeInputPost('');
      }
    }
  }

  getIconStyle(){
    const { thread, style } = this.props.state;
    const favicon = `//${conf.assetsIconPath}${util.getSaveFaviconName( thread.favicon )}`;
    return thread.favicon ? {...style.postsFooter.icon, backgroundImage: `url(${favicon})` } : style.postsFooter.icon ;
  }

  getIconProps(){
    const { app } = this.props.state;
    return app.isOpenMainPossible ? Icon.getDecolationProps1( 'footer', 'icon' ) : {};
  }

  render() {
    const { style, app } = this.props.state;
    return (
      <div data-component-name={this.constructor.name} style={ style.postsFooter.self }>
        <div
          style={ this.getIconStyle() }
          { ...this.getIconProps() }
          onClick={this.handleOnClickIcon}
        />
        <textarea
          style={style.postsFooter.textarea}
          rows={1}
          onChange={this.handleOnChange}
          onKeyPress={this.handleOnKeyPress}
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
