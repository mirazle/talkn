import React, { Component, PropTypes } from "react"
import { connect } from 'react-redux';

class Container extends Component {

  constructor(props) {
    super(props);
    this.state = {
      input: '',
    }
  }

  handleOnClick(){

  }

 	render() {
		const{ state, talknAPI } = this.props;
    const { app, user, style } = state;

		return (
			<div style={ style.container.self }>
      <style type='text/css'>
        {'talkn ::placeholder {color: rgb(160, 160, 160); }'}
      </style>
        <div style={style.container.icon} />
        <textarea
          style={style.container.textarea}
          rows={1}
          onChange={(e)=>{this.setState({input: e.target.value})}}
          value={this.state.input}
          placeholder='Comment to this web.'
        />
        <button style={style.container.button}>talkn</button>
			</div>
		);
 	}
}

function mapStateToProps( state, props ) {
	return {state, talknAPI: props.talknAPI};
}

export default connect(
	mapStateToProps,
	null
)( Container )
