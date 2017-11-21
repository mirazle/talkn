import React, { Component, PropTypes } from "react"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as self from './'
import style from './style'
import define from '../../util/define'
import $ from 'jquery'

export default class SettingSwitch extends Component {

	getSettingSwitchEvents(){
		const { talknIndex, connection, styles, indexData, threadData, actionLog } = this.props;
		const { root, settingSwitch } = styles[ talknIndex ]

		if( define.isTouch ){
			return {
				onTouchEnd: ( ev )=>{ 
					let switchType = ev.target.getAttribute( "class" );
					switchType = ( switchType.indexOf( "_switch" ) === false )? switchType : switchType.replace( "_switch", "" ) ;
					talknAPI.toggleSettingSwitch( talknIndex, { switchType: switchType, ev: ev } ) 
				}
			}
		}else{
			return {
				onMouseUp: ( ev )=>{ 
					let switchType = ev.target.getAttribute( "class" );
					switchType = ( switchType.indexOf( "_switch" ) === false )? switchType : switchType.replace( "_switch", "" ) ;
					talknAPI.toggleSettingSwitch( talknIndex, { switchType: switchType, ev: ev } ) 
				}
			}
		}
	}

	getSettingSwitchWrapToggle( switchType ){
		const { talknIndex, connection, styles } = this.props;
		const { root, settingSwitch } = styles[ talknIndex ]

		let style = ( root.setting[ switchType ] )? settingSwitch.settingSwitch1 :settingSwitch.settingSwitch0 ;
				
		return {
			style: Object.assign( {}, style ) 
		}
	}

	getSettingSwitchToggle( switchType ){
		const { talknIndex, connection, styles } = this.props;
		const { root, settingSwitch } = styles[ talknIndex ]
//console.log( root.setting );
		let style = ( root.setting[ switchType ] )? settingSwitch.switch1 :settingSwitch.switch0 ;
				
		return {
			style: Object.assign( {}, style ) 
		}
	}

 	render() {
		const { talknIndex, connection, styles, actionLog, type } = this.props;
		const { root, settingSwitch } = styles[ talknIndex ]

                return (
			<div className={ type } { ...this.getSettingSwitchWrapToggle( type ) } { ...this.getSettingSwitchEvents() } >
				<div className={ type + "_switch" } { ...this.getSettingSwitchToggle( type ) } />
			</div>
		) 
 	}
}
