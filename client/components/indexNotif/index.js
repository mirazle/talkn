import React, { Component, PropTypes } from "react"
import ReactDOM from 'react-dom'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import style from './style'
import define from '../../util/define'
import func from '../../util/func'
import injectStyle from '../../util/injectStyle';
import $ from 'jquery'

export default class IndexNotif extends Component {

	constructor(props) {
		super(props);
	}

 	render() {
		const { connection, talknIndex, actionLog, id, dataValue, styles } = this.props
		const { indexNotif } = this.props.styles[ talknIndex ]
		return( null )
 	}

	componentDidMount(){
		const { connection, talknIndex, actionLog, id, dataValue, styles } = this.props
		const { root, indexNotif } = this.props.styles[ talknIndex ]
		
		let _styles = {};
		let indexNotifKeys = Object.keys( indexNotif );
		let indexNotifLength = indexNotifKeys.length;
		let talk = ( dataValue.talk.indexOf( "<img " ) === 0 )? "< POSTED A IMAGE ! >" : dataValue.talk ;
		talk = ( dataValue.talk.indexOf( "<iframe " ) === 0 )? "< EMBED A SITE ! >" : talk ;

		let thum = dataValue.thum;
		if( thum && thum.indexOf( "http" ) !== 0 ){
			let protcol = func.getProtcol();
			thum = ( protcol + thum );
		}

		if( root.focusMeta.connection === dataValue.connection && dataValue.talk !== "" ){

			$( "#talknNotif" + talknIndex ).append( 
					"<li id=" + id + " style='" + 
								"display: " + indexNotif.indexNotif.display + ";" +
								"animation: " + define.style.notifAnimation + ";" + 
								"position: " + indexNotif.indexNotif.position + "; " + 
								"top: " + indexNotif.indexNotif.top + ";" + 
								"width: " + indexNotif.indexNotif.width + ";" + 
								"height: " + indexNotif.indexNotif.height + ";" + 
								"background: " + indexNotif.indexNotif.background + ";" + 
								"border-bottom: " + indexNotif.indexNotif.borderBottom + ";" + 
								"box-shadow: " + indexNotif.indexNotif.boxShadow + ";" + 
								"transform: " + indexNotif.indexNotif.transform + ";" + 
								"clear: both;'>" +				
								"<left style='" + 
										"background: url( " + thum + " ) 50% 60% / 30px 30px no-repeat;" +
										"display: " + indexNotif.left.display + ";" +
										"margin: " + indexNotif.left.margin + ";" + 
										"float: " + indexNotif.left.float + ";" + 
										"height: " + indexNotif.left.height + ";" +
										"width: " + indexNotif.left.width + ";'></left>" +
								"<right style='" + 
										"display: " + indexNotif.right.display + ";" + 
										"float: " + indexNotif.right.float + ";" + 
										"width: " + indexNotif.right.width + ";" + 
										"height: " + indexNotif.right.height + ";" +
										"text-align: " + indexNotif.right.textAlign + ";" + 
										"padding-top: " + indexNotif.right.paddingTop + ";'>" + 
									"<div style=''>" + talk + "</div>" +
								"</right>" +
					"</li>" );

			setTimeout( ()=>{
				talknAPI.endNotif( talknIndex, { notifId: id, connection: connection } )
				$( "#" + id ).remove();
			}, define.style.notifAnimationMs )
		}

	}

	componentDidUpdate(){
	}
}
