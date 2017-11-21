import React, { Component, PropTypes } from "react"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { IconMinus } from '../icon'
import define from '../../util/define'
import func from '../../util/func'
import $ from 'jquery'

export default class indexPost extends Component {

	getIconMinusEvents( connection ){
		const { talknIndex, styles, indexData, actionLog } = this.props;
		const { root, slide, indexPost } = styles[ talknIndex ]
		
		let events = {}

		if( define.isTouch ){
			events = { onTouchEnd: ( ev )=>{ 

					if( indexData.length >= 2 ){
						talknAPI.preDeleteIndex( { talknIndex: talknIndex, connection: connection } );
					}
				} 
			} 
		}else{
			events = { onClick:  ( ev )=>{

					if( indexData.length >= 2 ){
						talknAPI.preDeleteIndex( { talknIndex: talknIndex, connection: connection } );
					}
				}
			} 
		}

		return events;
	}

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

	getLiEvents(){
		const { talknIndex, styles, ws, actionLog } = this.props;
		const { root, index, slide, detail, indexPost } = styles[ talknIndex ]
		let events = {}

		if( define.isTouch ){
			events = { onTouchEnd: ( ev )=>{ 
				if( !index.togglePreDeleteFlg ){
					
					let connection = ev.currentTarget.getAttribute( "data-connection" );
					let wsParams = func.getWsParams( "index", talknIndex, connection );
					wsParams = wsParams[ "multiStream0" ];

					talknAPI.changeThread( { 
									talknIndex: talknIndex, 
									title: wsParams.title,
									connection: connection,
									thum: func.getThum( root, this.props )
					} )

				}
			} }
		}else{
			events = { onClick:  ( ev )=>{

				if( slide.stickSlideMoveCnt < 2 ){

					if( !index.togglePreDeleteFlg ){
						let connection = ev.currentTarget.getAttribute( "data-connection" );
						let wsParams = func.getWsParams( "index", talknIndex, connection );
						wsParams = wsParams[ "multiStream0" ];

						talknAPI.changeThread( { 
										talknIndex: talknIndex, 
										title: wsParams.title,
										connection: connection,
										thum: wsParams.thum
						} )
					}
				}
			} } 
		}

		return events;
	}

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

 	render() {
		const { talknIndex, connection, styles } = this.props;
		const { root, indexPost } = styles[ talknIndex ]

		let title = ( this.props.title && this.props.title !== "" )? this.props.title : this.props.connection;
		let talk = ( this.props.talk.indexOf( "<img " ) === 0 )? "< POSTED A IMAGE ! >" : this.props.talk ;
		talk = ( this.props.talk.indexOf( "<iframe " ) === 0 )? "< EMBED A SITE ! >" : talk ;
		indexPost.left.backgroundImage = "url( " + func.getThum( root, this.props )  + " )";

		return( 
			<li data-title={ this.props.title } data-tid={ this.props.tid } style={ Object.assign( {}, indexPost.indexPost ) } > 
				<ol style={ Object.assign( {}, indexPost.ol ) }>
					<li style={ Object.assign( {}, indexPost.remove ) }>
						<IconMinus { ...this.getIconProps() } 
								touchFunc={ this.getIconMinusEvents( this.props.connection ) } 
								updateStyles={ { iconMinus: { top: "28px", left: "24px", transform: "scale( 1.4 )" } } }/>

					</li>
					<li data-connection={ this.props.connection }
					    style={ Object.assign( {}, indexPost.indexWrap ) } 
					    { ...this.getLiEvents() } >
						<left style={ Object.assign( {}, indexPost.left ) }>
						</left>
						<right style={ indexPost.right }>
							<div style={ indexPost.balloonTitle }>{ this.props.connection }</div>
							<div style={ indexPost.balloonTalk }>{ talk }</div>
						</right>
					</li>
				</ol>
			</li>
		)
 	}
}
