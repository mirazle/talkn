import React, { Component, PropTypes } from "react"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import define from '../../util/define'
import $ from 'jquery'


export class IconFind extends Component {

	render(){

		connection = func.escape( connection );
		let mouseEvents = { onClick: ( ev )=>{ talknAPI.find( { connection: connection } ) } }
		let touchEvents = { onTouchStart: ( ev )=>{ talknAPI.find( { connection: connection } ) } }
		let event = ( define.isTouch )? touchEvents: mouseEvents ; 
                
		return <div { ...event }
				style={ {
					display: "table", 
					margin: "10px 0px 10px 0px",
					padding: "1px 15px 0px",
					borderRadius: "50px",
					lineHeight: "23px",
					background: root.customColor.drawBgColor1,
					cursor: "pointer",
					color: "rgb(238, 238, 238)" 
					}
			}>  
				<div style={ {
					display: "table-cell",
					verticalAlign: "middle"
					}
				}>
					<i style={ {
						boxSizing: "initial",
						position: "relative",
						display: "table-cell",
						padding: "0px",
						margin: "0px",
						background: "rgba(255, 255, 255, 0.8 )",
						border: "1px solid " + root.customColor.drawBgColor1,
						borderRadius: "14px",
						width: "14px",
						minWidth: "14px",
						height: "14px",	
						minHeight: "14px",
						transform: "scale(1.4)",
						transition: "500ms",
						cursor: "pointer",
						top: "0px",
						left: "-10px"}
					}>

						<div style={ { 
								display: "block",
								background: root.customColor.drawBgColor1,
								borderRadius: "14px",
								width: "9px",
								height: "2px",
								transform: "translate3d(2.5px, 6px, 1px)" }
						} />
						<div style={ {
								display: "block",
								background: root.customColor.drawBgColor1,
								borderRadius: "14px",
								width: "2px",
								height: "9px",
								transform: "translate3d(6px, 1px, 1px)" }
						} />
					</i>
				</div>
				<div style={ { display: table-cell } } >
					{ connection }
				</div>
			</div>

	}
}

export class IconColor extends Component {
 	render() { return( <i style={ this.props.styleParams } /> )}
}

export class IconPlus extends Component {

 	render() {
		const { talknIndex, actioned, connection, styles, updateStyles, touchFunc } = this.props;
		const { icon } = this.props.styles[ talknIndex ]

		return( 
			<i { ...touchFunc } style={ Object.assign( {}, icon.iconPlus, updateStyles.iconPlus ) }>
				<div style={ Object.assign( {}, icon.iconPlus1, updateStyles.iconPlus1 ) } />  
				<div style={ Object.assign( {}, icon.iconPlus2, updateStyles.iconPlus2 ) } />  
			</i>
		)
	}
}

IconPlus.defaultProps = {
	updateStyles: { updateStyles: { iconPlus: {}, iconPlus1: {}, iconPlus2: {} } }
}

export class IconMinus extends Component {

 	render() {
		const { talknIndex, actioned, connection, styles, updateStyles, touchFunc } = this.props;
		const { icon } = this.props.styles[ talknIndex ]

		return( 
			<i { ...touchFunc } style={ Object.assign( {}, icon.iconMinus, updateStyles.iconMinus ) }>
				<div style={ Object.assign( {}, icon.iconMinus1 , updateStyles.iconMinus1 ) } />  
			</i>
		)
	}
}

IconMinus.defaultProps = {
	updateStyles: { updateStyles: { iconMinus: {}, iconMinus1: {} } }
}

export class IconMenu extends Component {

 	render() {
		return( 
			<div style={ {
/*
				transform: "scale3d( 1, 0.7, 1 )",
				height:"5px",
				width: "5px",
				display: "block",
				position: "relative"
*/
			} }>
				<div style={ {
					content:'',
					height: "6px",
					width: "6px",
					background: "rgba(10, 150, 150, 0.8 )",
					borderRadius: "4px",
					WebkitBorderRadius: "4px",
					MozBorderRadius: "4px",
					display: "block",
					position: "absolute",
					top: 0,
					left: 0,
					boxShadow: "0 12px rgba( 10, 150, 250, 0.88 ), 0 24px rgba( 255, 120, 255, 0.88 )"
				} }></div>
				<span style={{}}></span>
			</div>
		)
 	}
}

export class IconUser extends Component {

 	render() {
		return( 
			<span style={ {
				height:"40px",
				width: "40px",
				display: "block",
				position: "relative"
			} }>
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
				} }></span>
				<span style={{}}></span>
			</span>
		)
 	}
}
