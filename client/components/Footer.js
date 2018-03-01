import React, { Component, PropTypes } from "react"
import User from 'common/schemas/state/User';

export default class Footer extends Component {

  constructor(props) {
    super(props);
    this.handleOnClickIcon = this.handleOnClickIcon.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnKeyPress = this.handleOnKeyPress.bind(this);
  }

  handleOnClickIcon( e ){
    const{ user } = this.props.state;
    this.props.onClickToggleDispThread( !user.isOpenThread );
  }

  handleOnClick( e ){
    if( !User.validInputPost( e.target.value ) ){
      const{ talknAPI } = this.props;
      const{ user } = this.props.state;
      talknAPI.post( user.post );
      this.props.onChangeInputPost('');
    }
  }

  handleOnChange( e ){
    const{ onChangeInputPost } = this.props;
    if( !User.validInputPost( e.target.value ) ){
      onChangeInputPost( e.target.value );
    }
  }

  handleOnKeyPress( e ){
    if ( e.nativeEvent.keyCode === 13 ) {
      const{ user } = this.props.state;
      const{ onChangeInputPost } = this.props;
      if( e.nativeEvent.shiftKey ){
        onChangeInputPost( e.target.value + '\n');
      }else{
        onChangeInputPost('');
        talknAPI.post( user.inputPost );
      }
    }
  }

 	render() {
    const { style, user } = this.props.state;
		return (
      <footer style={ style.footer.self }>
        <div
          style={style.footer.icon}
          onClick={this.handleOnClickIcon}
        />
        <textarea
          style={style.footer.textarea}
          rows={1}
          onChange={this.handleOnChange}
          onKeyPress={this.handleOnKeyPress}
          value={user.inputPost}
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
