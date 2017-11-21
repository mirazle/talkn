import React, { Component, PropTypes } from "react"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as self from './'
import style from './style'
import define from '../../util/define'
import $ from 'jquery'

export default class SettingBar extends Component {

	getSettingBarEvents(){
		const { talknIndex, connection, styles, type, actionLog } = this.props;
		const { root, setting } = styles[ talknIndex ]

		if( define.isTouch ){
			return {
				onTouchStart: ( ev )=>{ 	
					let barType = ev.target.getAttribute( "class" );
					barType = ( barType.indexOf( "_switch" ) === false )? barType : barType.replace( "_switch", "" ) ;
					talknAPI.startSettingBar( talknIndex, { barType: barType, ev: ev } ) 
				}
			}
		}else{
			return {
				onMouseDown: ( ev )=>{ 
					let barType = ev.target.getAttribute( "class" );
					barType = ( barType.indexOf( "_switch" ) === false )? barType : barType.replace( "_switch", "" ) ;
					talknAPI.startSettingBar( talknIndex, {barType: barType, ev: ev } ) 
				}
			}
		}
	}

 	render() {
		const { talknIndex, connection, styles, barType, actionLog } = this.props;
		const { root, settingBar } = styles[ talknIndex ]

		settingBar.bar.transform = "translateX(" + settingBar.translateXs[ barType ] + "px)";

                return (
			<div className={ barType } style={ Object.assign( {}, settingBar.settingBar ) } { ...this.getSettingBarEvents() }>
				<div className={ barType + "_switch" } style={ Object.assign( {}, settingBar.bar ) }></div>
			</div>
		) 
 	}
}
