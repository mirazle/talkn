import React, { Component, PropTypes } from "react"
import { connect } from 'react-redux';

class Container extends Component {

 	render() {
		const{ state, app, style, user, talknAPI } = this.props;
		return(
			<div
				style={ style.Container }
				onClick={talknAPI.inc}
				>
				TALKN{app.talknIndex}_{user.num}
			</div>
		);
 	}
}

function mapStateToProps( state, props ) {
	return {...state, props};
}

export default connect(
	mapStateToProps,
	null
)( Container )
