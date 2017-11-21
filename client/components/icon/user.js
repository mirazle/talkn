import React, { Component, PropTypes } from "react"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import define from '../../util/define'
import $ from 'jquery'

export default class IconUser extends Component {

 	render() {
		return( 
			<span style={ { height: "40px", width: "40px", display: "block", position: "relative" } }>
				<span style={ {
					content:'',
					height: "6px",
					width: "40px",
					background: "#333",
					borderRadius: "4px",
					WebkitBorderRadius: "4px",
					MozBorderRadius: "4px",
					display: "block",
					position: "absolute",
					top: "5px",
					left: 0,
					boxShadow: "0 12px #333, 0 24px #333",
					WebkitBoxShadow: "0 12px #333, 0 24px #333",
					MozBoxShadow: "0 12px #333, 0 24px #333"
				} } ></span>
				<span style={ {} }></span>
			</span>
		)
 	}
}
