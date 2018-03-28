import React, { Component, PropTypes } from "react"
import Control from 'common/schemas/state/Control';
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
    const{ control } = this.props.state;
    const isOpenMain = control.isOpenMain ? false : true ;
    talknAPI.onClickToggleDispMain( isOpenMain );
  }

  handleOnClick( e ){
    if( !Control.validInputPost( e.target.value ) ){
      talknAPI.post();
      talknAPI.onChangeInputPost('');
    }
  }

  handleOnChange( e ){
    const{ onChangeInputPost } = this.props;
    if( !Control.validInputPost( e.target.value ) ){
      talknAPI.onChangeInputPost( e.target.value );
    }
  }

  handleOnKeyPress( e ){
    if ( e.nativeEvent.keyCode === 13 ) {
      const{ user } = this.props.state;
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
    return thread.favicon ? {...style.footer.icon, backgroundImage: `url(${thread.favicon})` } : style.footer.icon ;
  }

  render() {
    const { style, control, thread } = this.props.state;
    return (
      <footer style={ style.footer.self }>
        <div
          style={ this.getIconStyle() }
          {...Icon.getDecolationProps1( 'footer', 'icon' )}
          onClick={this.handleOnClickIcon}
        />
        <textarea
          style={style.footer.textarea}
          rows={1}
          onChange={this.handleOnChange}
          onKeyPress={this.handleOnKeyPress}
          value={control.inputPost}
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
