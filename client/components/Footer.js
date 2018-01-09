import React, { Component, PropTypes } from "react"
import User from 'common/schemas/state/User';


export default class Footer extends Component {

  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnKeyPress = this.handleOnKeyPress.bind(this);
  }

  handleOnClick(){
    if( !User.validInputPost( e.target.value ) ){
      const{ talknAPI, state, onChangeInputPost } = this.props;
      const{ user } = state;
      talknAPI.post( user.post );
      onChangeInputPost('');
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
        talknAPI.post( user.inputPost );
        onChangeInputPost('');
      }
    }
  }

 	render() {
    const { style, user } = this.props.state;
		return (
      <footer style={ style.footer.self }>
        <div style={style.footer.icon} />
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
