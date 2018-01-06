import React, { Component, PropTypes } from "react"
import User from 'common/schemas/state/User';


export default class Footer extends Component {

  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnKeyPress = this.handleOnKeyPress.bind(this);
  }

  handleOnChange( e ){
    if( !User.validInputPost( e.target.value ) ){
      const{ onChangeInputPost } = this.props;
      const{ user } = this.props.state;
      onChangeInputPost( e.target.value );
    }
  }

  handleOnClick(){
    if( !User.validInputPost( e.target.value ) ){
      const{ talknAPI, state, onChangeInputPost } = this.props;
      const{ user } = state;
      talknAPI.post( user.inputPost );
    }
  }

  handleOnKeyPress( e ){
    const{ user } = this.props.state;
    if ( e.nativeEvent.keyCode === 13 ) {
      if( e.nativeEvent.shiftKey ){

      }else{
        console.log("KEY PRESS");
        talknAPI.post( user.inputPost );
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
