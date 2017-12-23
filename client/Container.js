import React, { Component, PropTypes } from "react"
import { connect } from 'react-redux';
import Style from 'client/components/Style';
import Footer from 'client/components/Footer';
import Main from 'client/components/Main';

class Container extends Component {

  componentWillMount(){
    const { state, talknAPI } = this.props;
    const { user } = state;

    talknAPI.find();
//    talknAPI.find( thread.connection );
//    talknAPI.find( {connection: thread.connection} );
  }

 	render() {
    const { style } = this.props.state;

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
	null
)( Container )
