import React, { Component, PropTypes } from "react"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as self from './'
import * as footerAction from '../../actions/footer'
import style from './style'
import define from '../../util/define'
import $ from 'jquery'

class Thread extends Component {


	componentDidMount(){
		//alert("LOAD FOOTER");
	}

 	render() {
		return (
			<thread style={ style.thread }></thread>
		)
 	}
}

export default connect( function( state ){
	return state
}, footerAction )( Thread ) ;
