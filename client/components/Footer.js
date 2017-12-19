import React, { Component, PropTypes } from "react"

export default class Footer extends Component {

  constructor(props) {
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.state = {
      input: '',
    }
  }

  handleOnChange( e ){
    this.setState({input: e.target.value});
  }

  handleOnClick(){
    if(this.state.input !== '' ){
      const{ talknAPI, state } = this.props;
      talknAPI.post( {...state,
        user: {...state.user,
          inputPost: this.state.input
        }
      });
    }
  }

 	render() {
    const { style } = this.props.state;

		return (
      <footer style={ style.footer.self }>
        <div style={style.footer.icon} />
        <textarea
          style={style.footer.textarea}
          rows={1}
          onChange={this.handleOnChange}
          value={this.state.input}
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
