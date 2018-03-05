import React, { Component, PropTypes } from "react"
import { connect } from 'react-redux';
import Style from 'client/components/Style';
import Footer from 'client/components/Footer';
import Main from 'client/components/Main';
import handles from 'client/actions/handles';
import callbacks from 'client/actions/callbacks';
import User from 'common/schemas/state/User';

class Container extends Component {

  componentWillMount(){
    const { state, talknAPI } = this.props;
    const { thread } = state;
    talknAPI.find( thread.connection );
  }

 	render() {
    const { style, user } = this.props.state;
		return (
			<div style={ style.container.self }>
        <Style {...this.props} />
        <Main {...this.props} />
        <Footer {...this.props} />
			</div>
		);
 	}
}

function mapStateToProps( state, props ) {
	return {state, talknAPI: props.talknAPI};
}

export default connect(
	mapStateToProps,
	{...handles, ...callbacks}
)( Container )
