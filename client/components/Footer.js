import React, { Component, PropTypes } from "react"

export default class Footer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      input: '',
    }
  }

 	render() {
		const{ state, talknAPI } = this.props;
    const { app, user, style } = state;

		return (
      <footer style={ style.footer.self }>
        <div style={style.footer.icon} />
        <textarea
          style={style.footer.textarea}
          rows={1}
          onChange={(e)=>{this.setState({input: e.target.value})}}
          value={this.state.input}
          placeholder='Comment to this web.'
        />
        <button
          style={style.footer.button}
          onClick={()=>talknAPI.post( this.state.input )}
          >
          talkn
        </button>
      </footer>
		);
 	}
}
