import React, { Component, PropTypes } from "react"

export default class Footer extends Component {

  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnKeyPress = this.handleOnKeyPress.bind(this);
  }

  handleOnChange( e ){
    const{ onChangeInputPost } = this.props;
    onChangeInputPost( e.target.value );
  }

  handleOnClick(){
    const{ talknAPI, state, onChangeInputPost } = this.props;
    const{ user } = state;
    if(user.inputPost !== '' ){
      talknAPI.post( user.inputPost );
    }
  }

  handleOnKeyPress( e ){
    const{ user } = this.props.state;
    if ( e.nativeEvent.keyCode === 13 ) {
      if( !e.nativeEvent.shiftKey ){
        if( user.inputPost !== '' ){
          talknAPI.post( user.inputPost );
        }
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
