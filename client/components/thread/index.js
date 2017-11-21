import React, { Component, PropTypes } from "react"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import define from '../../util/define'
import func from '../../util/func'
import Post from '../post'
import $ from 'jquery'
import timeago from 'timeago.js';
import lang from 'timeago.js/locales/ja';

export default class Thread extends Component {

	constructor(props) {
		super(props);
		this.state = {
			timeAgo: {}
		};
	}

	getPostProps(){
		const { talknIndex, connection, styles, actionLog } = this.props;
		return {
			talknIndex: talknIndex,
			connection: connection,
			actionLog: actionLog,
			styles: styles
		}
	}

	getMoreEvents( connection, firstPostTime ){

		const { talknIndex, styles, ws, actionLog } = this.props;
		const { slide, post, root } = styles[ talknIndex ]

		let threadData = ws.thread[ talknIndex ];
		let threadDataLength = ( threadData && threadData.length > 0 )? threadData.length : 0 ;
		let events = {};

		if( threadData && threadDataLength > 0 ){

			if( define.isTouch ){
			
				events = {
					onTouchStart: ( ev )=>{ 

						if( slide.stickSlideMoveCnt < 2 ){

							connection = ( connection.indexOf( "/" ) === 0 )? connection : "/" + connection ;
							talknAPI.find( { 
									 talknIndex: talknIndex, 
									 connection: connection,
									offsetPostTime: firstPostTime,
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

			}else{

				events = {
					onClick: ( ev )=>{ 
						
						if( slide.stickSlideMoveCnt < 2 ){

							connection = ( connection.indexOf( "/" ) === 0 )? connection : "/" + connection ;
							talknAPI.find( { 
									talknIndex: talknIndex,
									connection: connection, 
									offsetPostTime: firstPostTime,
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
		}

		return events;
	}

	getMoreTag( firstPostTime ){
		const { talknIndex, connection, styles, ws, focusIndex, actionLog } = this.props;
		const { root, slide, thread } = styles[ talknIndex ]

		let serverSetting = ws.setting[ talknIndex ];
		let threadData = ws.thread[ talknIndex ];
		let threadDataLength = ( threadData && threadData.length > 0 )? threadData.length : 0 ;

		if( focusIndex.cnt > threadDataLength ){

			let indexData = ws.index[ talknIndex ];
			let postsData = ws.posts[ talknIndex ];

			let multiStreamKey = ( root.setting.multiStream )? "1": "0" ;
			let getMoreDisplay = ( threadData.length > 0 )? "block" : "none" ;
			thread.getMore = Object.assign( {}, thread.getMore, { display: getMoreDisplay } );

			return	<li key={ firstPostTime } { ...this.getMoreEvents( root.focusMeta.connection, firstPostTime ) } style={ Object.assign( {}, thread.getMore ) }>
					↑MORE↑
				</li>
				
		}
	}

 	render() {
		const { talknIndex, connection, styles, ws, actionLog } = this.props;
		const { root, slide, thread } = styles[ talknIndex ]

		let indexData = ws.index[ talknIndex ];
		let threadData = ws.thread[ talknIndex ];
		let postsData = ws.posts[ talknIndex ];

		let multiStreamKey = ( root.setting.multiStream )? "1": "0" ;
		let getMoreDisplay = ( threadData.length > 0 )? "block" : "none" ;
		thread.getMore = Object.assign( {}, thread.getMore, { display: getMoreDisplay } );

		return( 
			<li className={ "thread" } 
				style={ Object.assign( {}, thread.thread ) }
				onTransitionEnd={ ()=>{ 
					if( actionLog[ 0 ] === "END_THREAD_MOVE" ){
						talknAPI.endTransitionThread( talknIndex );
					}
				} }
			> 
				<div className="threadPostBlocks" style={ thread.inner } onScroll={ ()=>{ talknAPI.scrollThread( talknIndex ) } }>	
					{(()=>{

						if( threadData.length === 0 ) return false; 
	
						let firstPostTime = threadData[ 0 ][ "postTime" ];
						let threadMap = threadData.map( ( data, index ) => {

							let dispFlg = true;

							if( !root.setting.multiStream ){
								dispFlg = ( root.focusMeta.connection === data.connection )? true : false ;
							}
							
							if( dispFlg ){
								return <Post key={ index + "_" + data._id } { ...this.getPostProps() } {...data }/>;
							}
						} ) 
				
						return <ol className="postBlocks" style={ Object.assign( {}, thread.ol ) }>
								{ this.getMoreTag( firstPostTime ) }
								{ threadMap }
							</ol>;
					
					})()}

				</div>

				<div className="threadHidden" style={ Object.assign( {}, thread.threadHidden ) } >
					<ol style={ Object.assign( {}, thread.ol ) }>
						{(()=>{

							if( postsData && postsData.connection ){
		
								let posts = postsData[ "multiStream" + multiStreamKey ];

								return posts.map( ( data, index ) => {

									let dispFlg = true;

									if( !root.setting.multiStream ){
										dispFlg = ( root.focusMeta.connection === data.connection )? true : false ;
									}
									
									if( dispFlg ){
										return <Post key={ index + "_" + data._id } { ...this.getPostProps() } {...data }/>;
									}
								} );
							}
						})()}
					</ol>
				</div>

				<div className={ "newPostAlert" } style={ Object.assign( {}, thread.newPostAlert ) }>
					New Posts
				</div>
			</li>
		)
 	}

	componentDidUpdate(){
		const { talknIndex, connection, styles, ws, actionLog } = this.props;
		const { root, slide, thread } = styles[ talknIndex ]

		let indexData = ws.index[ talknIndex ];
		let threadData = ws.thread[ talknIndex ];
		let postsData = ws.posts[ talknIndex ];

		switch( actionLog[ 0 ] ){
		case "CATCH_RESPONSE" :

			let slideCenterFlg = false;
			let threadScrollData = func.getThreadScrollData( {talknIndex:talknIndex,connection: root.option.connection });
			threadScrollData.connection = root.option.connection;
			talknAPI.catchResponseAction( talknIndex, threadScrollData );

			if( ( slide.openPage === "Index" || slide.openPage === "Detail" ) && talknAPI.talknIndex === talknIndex ){

				let indexLength = indexData.length;
				let indexDataKeys = Object.keys( indexData );

				for( let i = 0; i < indexLength; i++ ){

					//let connection = Object.keys( indexData[ i ] ) [ 0 ];
					let connection = indexData[ i ].connection;

					if( connection === root.focusMeta.connection ){

						switch( indexData[ i ][ "called" ] ){
						case "find" :

							slideCenterFlg = true;
							break;
						case "changeThread":

							slideCenterFlg = ( root.updateCallback[ "CHANGE_THREAD" ][ "slideCenter" ] )? root.updateCallback[ "CHANGE_THREAD" ][ "slideCenter" ] : true;
							break;
						}
					}
				}

				if( slideCenterFlg ){

					talknAPI.slideCenter();
				}
			}
			break;
		case "CATCH_RESPONSE_ACTION":

			let getMoreScrollFlg = root.updateCallback[ "CATCH_RESPONSE" ][ "getMoreScroll" ];

			if( getMoreScrollFlg ){
				talknAPI.getMoreScroll();
			}
			
			this.state.timeAgo.render(document.querySelectorAll( '.timeAgo' ) );
			this.state.timeAgo.cancel();
			break;
		case "SLIDE_CENTER":
			this.state.timeAgo.render(document.querySelectorAll( '.timeAgo' ) );
			this.state.timeAgo.cancel();
			break;
		case "TOGGLE_SETTING_SWITCH":
			this.state.timeAgo.render(document.querySelectorAll( '.timeAgo' ) );
			this.state.timeAgo.cancel();
			break;
		}
	}

	componentDidMount(){
		this.state.timeAgo = new timeago();
	}
}

