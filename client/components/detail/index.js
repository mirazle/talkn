import React, { Component, PropTypes } from "react"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as self from './'
import Meta from './meta'
import Social from './social'
import Movie from './movie'
import Picture from './picture'
import Wikipedia from './wikipedia'
import Analyze from './analyze'
import define from '../../util/define'
import { IconPlus } from '../icon'
import func from '../../util/func'
import $ from 'jquery'

export default class Detail extends Component {

	getConnectionTag(){
		const { talknIndex, styles, ws, actionLog } = this.props;
		const { root, detail, icon } = styles[ talknIndex ]
		let metaData = ( root.focusMetaFlg )? root.focusMeta : ws.apiMeta[ talknIndex ] ;

		let connection = metaData.connection;
		let connections = func.getPathArr( connection, false );

		if( metaData.title && metaData.title !== connection ){
			connections.push( metaData.title );
		}

		connection = connections[ detail.connectionPointer ];

		return <ol style={ Object.assign( {}, detail.olConnection ) }>
				<li style={ detail.liConnectionTable }>
					<div style={ Object.assign( {}, detail.liConnectionTd, { width: "40px" } ) }>
						<IconPlus { ...this.getIconProps() }
							touchFunc={ this.getIconEvents( connection ) }
							updateStyles={ { iconPlus: detail.iconPlusConnection } } />
					</div>
					<div { ...this.switchConnection( connections.length ) } style={ detail.liConnectionTd }>
						<div style={ detail.connection } >
							{ connection }
						</div>
					</div>
				</li>
			</ol>
	}

	switchConnection( connectionLength ){
		const { talknIndex, styles, ws, actionLog } = this.props;
		const { root, slide, talknBtn, indexPost } = styles[ talknIndex ]
		let events = {}

		if( define.isTouch ){
			events = { onTouchEnd: ( ev )=>{ 
					if( slide.stickSlideMoveCnt < 2 ){
						talknAPI.switchConnection( talknIndex, { connectionLength: connectionLength } );
					}
			 	} 
			} 
		}else{
			events = { onClick:  ( ev )=>{
					if( slide.stickSlideMoveCnt < 2 ){
						talknAPI.switchConnection( talknIndex, { connectionLength: connectionLength } );
					}
				}
			} 
		}

		return events;
	}

	getApiTag(){
		const { talknIndex, connection, styles, apiMeta, actionLog } = this.props;
		const { root, detail, icon } = styles[ talknIndex ]

		let returnTag = "";
		let apiA = Object.assign( {}, detail.apiA, { opacity: icon.opacity } );
		let oneTranslateX = parseFloat( detail.apiOl.left ) * 2;
		let apiTranslateX = ( detail.apiMenuPointer * oneTranslateX ); 
		apiTranslateX = { transform: "translateX( -" + apiTranslateX + "% )" };

		let wrapBackStyle = Object.assign( {}, detail.apiWrapBack );
		let wrapNextStyle = Object.assign( {}, detail.apiWrapNext );
		wrapBackStyle = ( detail.apiMenuBackOn )? Object.assign( {}, wrapBackStyle ) : wrapBackStyle ;
		wrapNextStyle = ( detail.apiMenuNextOn )? Object.assign( {}, wrapNextStyle ) : wrapNextStyle ;

		let backStyle = Object.assign( {}, detail.apiWrapAbox, { float: "left", borderRadius: "0px 5px 0px 0px" } ) 
		let nextStyle = Object.assign( {}, detail.apiWrapAbox, { float: "right", borderRadius: "5px 0px 0px 0px" } ) 
		backStyle = ( detail.apiMenuBackOn )? Object.assign( {}, backStyle, detail.apiWrapAboxOn ) : backStyle ;
		nextStyle = ( detail.apiMenuNextOn )? Object.assign( {}, nextStyle, detail.apiWrapAboxOn ) : nextStyle ;

		returnTag = <div>
				<ol style={ Object.assign( {}, detail.apiOl, apiTranslateX ) }>

					{(() => { return define.apiMenu.map( ( apiKey, apiMenuIndex ) => {

							let apiLi = detail.apiLi;
							let apiAbox = detail.apiAbox;

							// If Exe Api Key .
							if( detail.apiMenuExeKey === apiKey ){

								apiLi = Object.assign( {}, apiLi, detail.apiLiFocus );

								// Screen Out Left .
								if( apiMenuIndex < detail.apiMenuPointer ){
								
									apiAbox = Object.assign( {}, apiAbox, detail.apiAboxFocusOut );

								// On Screen .
								}else if( apiMenuIndex >= detail.apiMenuPointer && apiMenuIndex < ( detail.apiMenuPointer + define.apiMenuViewCnt ) ){
									
									apiAbox = Object.assign( {}, apiAbox, detail.apiAboxFocus );

								// Screen Out Right .
								}else{

									apiAbox = Object.assign( {}, apiAbox, detail.apiAboxFocusOut );
								}
							
							// If Not Exe Api Key .
							}else{

								// Screen Out Left .
								if( apiMenuIndex < detail.apiMenuPointer ){

									apiLi = Object.assign( {}, apiLi, { height: "44px", borderBottom: "1px solid rgba( 255, 255, 255, 0 )" } );

								// On Screen .
								}else if( apiMenuIndex >= detail.apiMenuPointer && apiMenuIndex < ( detail.apiMenuPointer + define.apiMenuViewCnt ) ){
									
									apiLi = Object.assign( {}, apiLi, { height: "44px" } );

								// Screen Out Right .
								}else{

									apiLi = Object.assign( {}, apiLi, { height: "44px", borderBottom: "1px solid rgba( 255, 255, 255, 0 )" } );
								}
							

							}

							return <li key={ apiKey } style={ Object.assign( {}, apiLi ) }>
									<div { ...this.switchDetail( apiKey ) } style={ Object.assign( {}, apiAbox ) }>
										<a style={ Object.assign( {}, apiA, define.style[ apiKey + "Bg" ] ) } ></a>
									</div>
								</li>
						}) 
					})()}
				</ol>

				<div style={ wrapBackStyle }>
					<div { ...this.getApiMenuDirectionEvents( "BACK" ) } style={ backStyle } >
						<a style={ Object.assign( {}, apiA, define.style.backBg ) } ></a>
					</div>
				</div>
				<div style={ wrapNextStyle }>
					<div { ...this.getApiMenuDirectionEvents( "NEXT" ) } style={ nextStyle } >
						<a style={ Object.assign( {}, apiA, define.style.nextBg ) } ></a>
					</div>
				</div>
			</div>
		return returnTag;
	}

	switchDetail( apiKey ){
		const { talknIndex, styles, ws, actionLog } = this.props;
		const { root, slide, talknBtn, indexPost } = styles[ talknIndex ]
		let events = {}

		if( define.isTouch ){
			events = { onTouchEnd: ( ev )=>{ 
					talknAPI.switchDetail( talknIndex, { apiKey: apiKey } );
			 	} 
			} 
		}else{
			events = { onClick:  ( ev )=>{
					talknAPI.switchDetail( talknIndex, { apiKey: apiKey } );
				}
			} 
		}

		return events;
	}

	getApiMenuDirectionEvents( direction ){
		const { talknIndex, styles, ws, actionLog } = this.props;
		const { root, slide, talknBtn, indexPost } = styles[ talknIndex ]
		let events = {}

		if( define.isTouch ){
			events = { onTouchEnd: ( ev )=>{ 
					talknAPI.apiMenuDirection( talknIndex, { direction: direction } );
			 	} 
			} 
		}else{
			events = { onClick:  ( ev )=>{
					talknAPI.apiMenuDirection( talknIndex, { direction: direction } );
				}
			} 
		}

		return events;
	}

	getIconEvents( connection ){
		const { talknIndex, styles } = this.props;
		const { slide, post, root } = styles[ talknIndex ]

		let mouseEvents = {
			onClick: ( ev )=>{ 

				if( slide.stickSlideMoveCnt < 2 ){

					console.log( root.focusMeta.connection + " !== " + connection );

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
					}
				}
			}
		}

		let touchEvents = {
			onTouchStart: ( ev )=>{ 
				if( slide.stickSlideMoveCnt < 2 ){
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
					}
				}
			}
		}

		return ( define.isTouch )? touchEvents : mouseEvents ;
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

	getProps(){
		return this.props;
	}

 	render() {
		const { talknIndex, connection, styles, apiMeta, actionLog } = this.props;
		const { root, detail, icon } = styles[ talknIndex ]

                return (
			<li className={ "detail" } style={ Object.assign( {}, detail.detail ) }>
				<div style={ detail.inner }>

					<div style={ detail.space }></div>
					{ this.getConnectionTag() }

					<div style={ detail.space }></div>
					{ this.getApiTag() }

					<ol style={ Object.assign( {}, detail.apiCase ) }>
						{(() => { 

							switch( detail.apiMenuExeKey ){
							case "meta":
								return <Meta { ...this.getProps() } />
							case "social":
								return <Social { ...this.getProps() } />
							case "movie":
								return <Movie { ...this.getProps() } />
							case "picture":
								return <Picture { ...this.getProps() } />
							case "wikipedia":
								return <Wikipedia { ...this.getProps() } />
							case "analyze":
								return <Analyze { ...this.getProps() } />
							case "reflesh":
								return null;
							}
						})()}
					</ol>
					<div style={ detail.space }></div>
				</div>
			</li>
		) 
 	}
	
	componentDidMount(){
	}

	componentDidUpdate(){
	}

}
