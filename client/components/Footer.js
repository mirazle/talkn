import React, { Component, PropTypes } from "react"
import App from 'common/schemas/state/App';
import util from 'common/util';
import conf from 'common/conf';
import Icon from 'client/components/Icon';

export default class Footer extends Component {

  constructor(props) {
    super(props);
    this.handleOnClickIcon = this.handleOnClickIcon.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnKeyPress = this.handleOnKeyPress.bind(this);
  }

  handleOnClickIcon( e ){
    const{ app } = this.props.state;

    if( app.isOpenMainPossible ){
      const isOpenMain = app.isOpenMain ? false : true ;
      talknAPI.onClickToggleDispMain( isOpenMain );
    }
  }

  handleOnClick( e ){
    if( !App.validInputPost( e.target.value ) ){
      talknAPI.post();
      talknAPI.onChangeInputPost('');
    }
  }

  handleOnChange( e ){
    const{ onChangeInputPost } = this.props;
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
    return thread.favicon ? {...style.footer.icon, backgroundImage: `url(${favicon})` } : style.footer.icon ;
  }

  getIconProps(){
    const { app } = this.props.state;
    return app.isOpenMainPossible ? Icon.getDecolationProps1( 'footer', 'icon' ) : {};
  }

  render() {
    const { style, thread, app } = this.props.state;
    return (
      <footer style={ style.footer.self }>
        <div
          style={ this.getIconStyle() }
          { ...this.getIconProps() }
          onClick={this.handleOnClickIcon}
        />
        <textarea
          style={style.footer.textarea}
          rows={1}
          onChange={this.handleOnChange}
          onKeyPress={this.handleOnKeyPress}
          value={app.inputPost}
          placeholder='Comment to this web'
        />
        <button
          style={style.footer.button}
          onClick={this.handleOnClick}
          >
          talkn
        </button>
      </footer>
		);
 	}
}
