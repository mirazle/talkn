import React, { Component, PropTypes } from "react"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as self from './'
import style from './style'
import define from '../../util/define'
import func from '../../util/func'
import { IconPlus } from '../icon'
import $ from 'jquery'

export default class DetailMovie extends Component {

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
		let data = ws.apiMovie[ talknIndex ];

		return <ol style={ Object.assign( {}, detail.social.ol ) } >

			{
				(() => {

					if( data && data.res && data.res.items && data.res.items.length > 0 ){

						return data.res.items.map( ( item, indexNum ) => {

							let link = ( item.id.kind === "youtube#video" )? 
								"https://www.youtube.com/watch?v=" + item.id.videoId : "https://www.youtube.com/playlist?list=" + item.id.playlistId ;
							let image = item.snippet.thumbnails.default.url;
							//let IconPlus = func.getPlainIconFind( item.snippet.channelTitle, root );
							let chTitle = item.snippet.channelTitle;

							return <li key={ item.etag } style={ Object.assign( {}, detail.movie.li ) }>
								
								<a href={ link }>
									<left style={ Object.assign( {}, detail.movie.left, { backgroundImage: "url( " + image + " )" } ) } />
								</a>
								<right style={ detail.movie.right }>
									<div style={ detail.movie.title }>{ item.snippet.title }</div>
								</right>
								<div { ...this.getKeywordEvents( chTitle ) } style={ Object.assign( {}, detail.meta.keyword, { marginTop: "10px"} ) }>
									<IconPlus { ...this.getIconProps() } 
										  updateStyles={ { iconPlus: { top: "3px", left: "-10px", transform: "scale( 1.4 )"} } } 
									/>
 									{ chTitle }
								</div> 

							</li>;
						})
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
			talknAPI.getApiMovie( {talknIndex: talknIndex, connection: connection } ) 
		}
	}

	componentDidUpdate(){
	}
}
