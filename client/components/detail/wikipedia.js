import React, { Component, PropTypes } from "react"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as self from './'
import style from './style'
import define from '../../util/define'
import func from '../../util/func'
import { IconPlus } from '../icon'
import $ from 'jquery'

export default class DetailWikipedia extends Component {

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

	getKeywordEvents( connection ){
		const { talknIndex, styles } = this.props;
		const { slide, post, root } = styles[ talknIndex ]
		connection = func.escape( connection );

		let mouseEvents = {
			onClick: ( ev )=>{ 

				if( slide.stickSlideMoveCnt < 2 ){
					if( root.option.connection !== connection ){
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
					}
				}
			}
		}

		let touchEvents = {
			onTouchStart: ( ev )=>{ 
				if( slide.stickSlideMoveCnt < 2 ){
					if( root.option.connection !== connection ){
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
					}
				}
			}
		}

		return ( define.isTouch )? touchEvents : mouseEvents ;
	}

 	render() {
		const { talknIndex, connection, styles, ws, actionLog } = this.props;
		const { root, detail, icon } = styles[ talknIndex ]
		let data = ws.apiWikipedia[ talknIndex ];

		return <ol style={ Object.assign( {}, detail.social.ol ) } >

			{
				(() => {

					if( data && data.res && data.res.query && data.res.query.pages ){

						let content = "<style type='text/css'>a{ color: " + root.customColor.drawBgColor1 + " }</style>";
						let pageId = Object.keys( data.res.query.pages )[ 0 ];
						let page = data.res.query.pages[ pageId ];

						if( page[ "revisions" ] && page[ "revisions" ][ 0 ] && page[ "revisions" ][ 0 ][ "*" ] ){
						
							content += page[ "revisions" ][ 0 ][ "*" ];

							return <div dangerouslySetInnerHTML={{__html: content } } />
						}
					}else{
						return "No Data .";
					}
				})()
			}
			</ol>

 	}
	
	componentDidMount(){
		const { talknIndex, styles, metaData, actionLog, ws } = this.props;
		const { root, detail, icon } = styles[ talknIndex ];

		if( ws.index[ talknIndex ].length > 0 ){
			let connection = ( root.focusMeta.connection )? root.focusMeta.connection : root.option.connection ;
			connection = connection.replace( /^\//, '' );
			talknAPI.getApiWikipedia( {talknIndex: talknIndex, connection: connection } ) 
		}
	}

	componentDidUpdate(){
	}
}
