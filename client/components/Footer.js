import React, { Component, PropTypes } from "react"

export default class Footer extends Component {

  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.state = {
      input: '',
    }
  }

  handleOnClick(){
    const{ talknAPI, state } = this.props;
    const{ user } = state;
    if(user.inputPost !== '' ){
      talknAPI.post( user.inputPost );
    }
  }

 	render() {
    const { style, user } = this.props.state;
    const { onChangeInputPost } = this.props;

		return (
      <footer style={ style.footer.self }>
        <div style={style.footer.icon} />
        <textarea
          style={style.footer.textarea}
          rows={1}
          onChange={ ( e ) => onChangeInputPost( e.target.value ) }
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
