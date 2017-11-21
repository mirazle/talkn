import React, { Component, PropTypes } from "react"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { IconPlus, IconColor } from '../icon'
import * as self from './'
import SettingSwitch from '../settingSwitch'
import SettingBar from '../settingBar'
import style from './style'
import define from '../../util/define'
import $ from 'jquery'

export default class Setting extends Component {

	getIconProps(){
		const { talknIndex, actionLog, connection, indexData, styles } = this.props;
		const { root, index } = this.props.styles[ talknIndex ]

		return {
			talknIndex: talknIndex,
			actionLog: actionLog,
			connection: connection,
			styles: styles
		}
	}

	getIconEvents( connection ){
		const { talknIndex, styles } = this.props;
		const { slide, post, root } = styles[ talknIndex ]

		let mouseEvents = {
			onClick: ( ev )=>{ 

				if( root.focusMeta.connection !== connection ){

					connection = ( connection.indexOf( "/" ) === 0 )? connection : "/" + connection ;
					talknAPI.find( { 
							 talknIndex: talknIndex, 
							 connection: connection,
							 title: "",
							 desc: "",
							 ogFbId: "",
							 ogName: "",
							 ogTwId: "",
							 ogType: ""
							} );
					
					talknAPI.toggleSettingArea( talknIndex, ev );
				}

			}
		}

		let touchEvents = {
			onTouchStart: ( ev )=>{ 
				if( root.focusMeta.connection !== connection ){
					connection = ( connection.indexOf( "/" ) === 0 )? connection : "/" + connection ;
					talknAPI.find( { 
							talknIndex: talknIndex,
							connection: connection, 
							title: "",
							desc: "",
							ogFbId: "",
							ogName: "",
							ogTwId: "",
							ogType: ""
					} );
					
					talknAPI.toggleSettingArea( talknIndex, ev );
				}
			}
		}
		return ( define.isTouch )? touchEvents : mouseEvents ;
	}

	getSettingBarLiEvents(){
		const { talknIndex, connection, styles, type, actionLog } = this.props;
		const { root, settingBar } = styles[ talknIndex ]

		if( define.isTouch ){
			return {
				onTouchMove: ( ev )=>{
					
					let barType = ev.target.getAttribute( "class" );
					
					if( barType ){
					
						barType = ( barType.indexOf( "_switch" ) === false )? barType : barType.replace( "_switch", "" ) ;

						if( barType === settingBar.stickBarType ){
							talknAPI.stickSettingBar( talknIndex, {barType: barType, ev: ev } ) 
						}
					}
				},
				onTouchEnd: ( ev )=>{
					let barType = ev.target.getAttribute( "class" );
					barType = ( barType.indexOf( "_switch" ) === false )? barType : barType.replace( "_switch", "" ) ;
					talknAPI.endSettingBar( talknIndex, {barType: barType, ev: ev } ) 
				}
			}
		}else{
			return {
				onMouseMove: ( ev )=>{ 
		
					let barType = ev.target.getAttribute( "class" );
		
					if( barType ){
						barType = ( barType.indexOf( "_switch" ) === false )? barType : barType.replace( "_switch", "" ) ;
						
						if( barType === settingBar.stickBarType ){
							talknAPI.stickSettingBar( talknIndex, {barType: barType, ev: ev } ) 
						}
					}
				},
				onMouseUp: ( ev )=>{ 
					let barType = ev.target.getAttribute( "class" );
					barType = ( barType.indexOf( "_switch" ) === false )? barType : barType.replace( "_switch", "" ) ;
					talknAPI.endSettingBar( talknIndex, {barType: barType, ev: ev } ) 
				}
			}
		}
	}

 	getSettingSwitchProps(){
		const { talknIndex, styles } = this.props
		return {
			talknIndex: talknIndex,
			styles: styles
		}
	}

	getSettingBarProps(){
		const { talknIndex, styles } = this.props
		return {
			talknIndex: talknIndex,
			styles: styles
		}
	}

 	render() {
		const { talknIndex, connection, styles, indexData, threadData, ws, actionLog } = this.props;
		const { root, setting, detail, icon } = styles[ talknIndex ]
		let wsSetting = ws.setting[ talknIndex ];
		let uid = ( wsSetting && wsSetting.uid )? wsSetting.uid : 0 ;

		let iconStyle = Object.assign( {}, setting.icon, { opacity: icon.opacity } );

                return (
			<div className={ "setting" } 
			     style={ Object.assign( {}, setting.setting ) }
			     onTransitionEnd={ ( ev )=>{ 
					if( actionLog[ 0 ] === "TOGGLE_SETTING_AREA" ){
						talknAPI.endSettingArea( talknIndex, ev );
					}
				} }
			>
				<div style={ setting.inner }>

					<div style={ Object.assign( {}, setting.space ) }></div>
					<ol style={ Object.assign( {}, setting.ol ) }>
						<li style={ Object.assign( {}, setting.li ) }>
							<div style={ {}, Object.assign( iconStyle, define.style.multiStreamBg ) } />
							<div style={ setting.subTitle }>
								MultiStream
							</div>
							<SettingSwitch type={ "multiStream" } { ...this.getSettingSwitchProps() } />
						</li>
						<li style={ Object.assign( {}, setting.liLast ) }>
							<div style={ Object.assign( {}, iconStyle, define.style.saveIndexBg ) } />
							<div style={ setting.subTitle }>
								SaveIndex
							</div>
							<SettingSwitch type={ "saveIndex" } { ...this.getSettingSwitchProps() } />
						</li>
					</ol>

					<div style={ Object.assign( {}, setting.space ) }></div>
					<ol style={ Object.assign( {}, setting.ol ) }>
						<li style={ Object.assign( {}, setting.liLast ) }>

							<div style={ Object.assign( {}, iconStyle, define.style.myThreadBg ) } />

							<div style={ setting.subTitle }>
								MyThread
							</div>
							
							<IconPlus { ...this.getIconProps() }
								touchFunc={ this.getIconEvents( uid ) }
								updateStyles={ { iconPlus: setting.iconPlusConnection } } />
						</li>
					</ol>

					<div style={ Object.assign( {}, setting.space ) }></div>
					<ol style={ Object.assign( {}, setting.ol ) }>
						<li style={ Object.assign( {}, setting.li ) }>
							<div style={ Object.assign( {}, iconStyle, define.style.metaBg ) } />
							<div style={ setting.subTitle }>
								Meta
							</div>
							<SettingSwitch type={ "apiMeta" } { ...this.getSettingSwitchProps() } />
						</li>
						<li style={ Object.assign( {}, setting.li ) }>
							<div style={ Object.assign( {}, iconStyle, define.style.socialBg ) } />
							<div style={ setting.subTitle }>
								Social
							</div>
							<SettingSwitch type={ "apiSocial" } { ...this.getSettingSwitchProps() } />
						</li>
						<li style={ Object.assign( {}, setting.li ) }>
							<div style={ Object.assign( {}, iconStyle, define.style.movieBg ) } />
							<div style={ setting.subTitle }>
								Movie
							</div>
							<SettingSwitch type={ "apiMovie" } { ...this.getSettingSwitchProps() } />
						</li>
						<li style={ Object.assign( {}, setting.li ) }>
							<div style={ Object.assign( {}, iconStyle, define.style.pictureBg ) } />
							<div style={ setting.subTitle }>
								Picture
							</div>
							<SettingSwitch type={ "apiPicture" } { ...this.getSettingSwitchProps() } />
						</li>
						<li style={ Object.assign( {}, setting.li ) }>
							<div style={ Object.assign( {}, iconStyle, define.style.wikipediaBg ) } />
							<div style={ setting.subTitle }>
								Wikipedia
							</div>
							<SettingSwitch type={ "apiWikipedia" } { ...this.getSettingSwitchProps() } />
						</li>
						<li style={ Object.assign( {}, setting.liLast ) }>
							<div style={ Object.assign( {}, iconStyle, define.style.analyzeBg ) } />
							<div style={ setting.subTitle }>
								Analyze
							</div>
							<SettingSwitch type={ "apiAnalyze" } { ...this.getSettingSwitchProps() } />
						</li>
					</ol>

					<div style={ Object.assign( {}, setting.space ) }></div>
					<ol style={ Object.assign( {}, setting.ol ) }>	
						<li className={ "drawBgColorR_switch" } style={ Object.assign( {}, setting.li ) } { ...this.getSettingBarLiEvents() }>
							<div style={ Object.assign( {}, iconStyle, define.style.colorBg ) } />
							<div style={ setting.subTitle }>
								Red
							</div>
							<SettingBar barType={ "drawBgColorR" } { ...this.getSettingBarProps() } />
						</li>
						<li className={ "drawBgColorG_switch" } style={ Object.assign( {}, setting.li ) } { ...this.getSettingBarLiEvents() }>
							<div style={ Object.assign( {}, iconStyle, define.style.colorBg ) } />
							<div style={ setting.subTitle }>
								Green
							</div>
							<SettingBar barType={ "drawBgColorG" } { ...this.getSettingBarProps() } />
						</li>
						<li className={ "drawBgColorB_switch" } style={ Object.assign( {}, setting.li ) } { ...this.getSettingBarLiEvents() }>
							<div style={ Object.assign( {}, iconStyle, define.style.colorBg ) } />
							<div style={ setting.subTitle }>
								Blue
							</div>
							<SettingBar barType={ "drawBgColorB" } { ...this.getSettingBarProps() } />
						</li>
						<li style={ setting.liLast }>
							<div style={ Object.assign( {}, iconStyle, define.style.clearBg ) } />
							<div style={ setting.subTitle }>
								Reset
							</div>
						</li>
					</ol>

					<div style={ Object.assign( {}, setting.space ) }></div>
				</div>
			</div>
		) 
 	}
}
