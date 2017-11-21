import React, { Component, PropTypes } from "react"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as self from './'
import style from './style'
import define from '../../util/define'
import func from '../../util/func'
import { IconPlus } from '../icon'
import $ from 'jquery'

export default class DetailMeta extends Component {

	getPostEvents(){
		const { talknIndex, styles, indexData, actionLog } = this.props;
		const { root, slide, talknBtn, indexPost } = styles[ talknIndex ]

		let events = {}

		if( define.isTouch ){
			events = { onTouchEnd: ( ev )=>{
					let req = Object.assign( {}, { talknIndex: talknIndex, talk: "Update Meta Data" }, root.focusMeta );
					req.title = $( "#talkn" + talknIndex + " #InputTalknThreadTitle" ).val()
					req.desc = $( "#talkn" + talknIndex + " #InputTalknThreadDesc" ).val()

					if( req.title !== "" ){
						talknAPI.post( req );
						talknAPI.getApiMeta( {talknIndex: talknIndex, connection: root.focusMeta.connection } )
					}
				}
			}
		}else{
			events = { onClick:  ( ev )=>{
					let req = Object.assign( {}, { talknIndex: talknIndex, talk: "Update Meta Data" }, root.focusMeta );
					req.title = $( "#talkn" + talknIndex + " #InputTalknThreadTitle" ).val()
					req.desc = $( "#talkn" + talknIndex + " #InputTalknThreadDesc" ).val()

					if( req.title !== "" ){
						talknAPI.post( req );
						talknAPI.getApiMeta( {talknIndex: talknIndex, connection: root.focusMeta.connection } )
					}
				}
			}
		}

		return events;
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

	getLinkTag( detail, icon, metaData ){

		let returnTag = "";
		let socialLink = Object.assign( {}, detail.socialLink, { opacity: icon.opacity } );

		if( metaData && metaData.connection ){
			let ogTwId = ( metaData.ogTwId !== undefined )? metaData.ogTwId: "" ;
			let ogFbId = ( metaData.ogFbId !== undefined )? metaData.ogFbId: "" ;
			let connection = metaData.connection;

			returnTag = <div>
					<ol style={ Object.assign( {}, detail.meta.olLink ) }>
						<li style={ detail.meta.liLink }>
							<a style={ Object.assign( {}, socialLink, define.style.twBg ) } href={ "//twitter.com/" + ogTwId.replace( "@", "" ) } >tw</a>
						</li>
						<li style={ detail.meta.liLink }>
							<a style={ Object.assign( {}, socialLink, define.style.fbBg ) } href={ "//www.facebook.com/" + ogFbId }>fb</a>
						</li>
						<li style={ detail.meta.liLink }>
							<a style={ Object.assign( {}, socialLink, define.style.appleBg ) } href={ "http://" + connection.substr( 1 ) }>hp</a>
						</li>
						<li style={ detail.meta.liLink }>
							<a style={ Object.assign( {}, socialLink, define.style.androidBg ) } href="">sh</a>
						</li>
					</ol>
				</div>
		}
		return returnTag;
	}

	getKeywordsTag( detail, metaData ){

		if( metaData ){
			if( metaData.keywords === undefined ) metaData.keywords = [];
			let keywordLength = metaData.keywords.length;

			if ( metaData.keywords && keywordLength > 0 ) {
				if ( metaData.keywords[ 0 ] !== "" ) {

					return <div>
						{(()=>{
							return metaData.keywords.map( ( keyword, index ) => {

								if( keyword === "" ) return null;
								return <span key={ index + "_" + keyword } { ...this.getKeywordEvents( keyword ) } style={ Object.assign( {}, detail.meta.keyword ) }>
										<IconPlus { ...this.getIconProps() }
											  updateStyles={ { iconPlus: { top: "3px", left: "-10px", transform: "scale( 1.4 )"} } }
										/>
										{ keyword }
									</span>;
							})
						})()}
					</div>
				}
			}
		}
	}

 	render() {
		const { talknIndex, connection, styles, ws, actionLog } = this.props;
		const { root, detail, icon } = styles[ talknIndex ]

		/****************/
		/* Get Tag	*/
		/****************/

		let metaData = ( root.focusMetaFlg )? root.focusMeta : ws.apiMeta[ talknIndex ] ;
		let metaIcon = Object.assign( {}, detail.meta.metaIcon, { opacity: icon.opacity } );
		let writeIcon = Object.assign( {}, detail.meta.writeIcon, { opacity: icon.opacity } );
		let submitFlg = false;

		/****************/
		/* COMPOSE 	*/
		/****************/

		// Category
		let ogType = ( metaData.ogType && metaData.ogType !== "" )? metaData.ogType : ""

		// Type .
		let type = ( metaData.type && metaData.type === "www" )?
			<a href={ "/" + metaData.connection }><i style={ Object.assign( {}, metaIcon, define.style.wwwBg ) } /></a> :
			<i style={ Object.assign( {}, metaIcon, define.style.userHandBg ) }  /> ;

		// Title .
		let title = ( metaData.title && metaData.title !== "" )? metaData.title: "";

		// Desc .
		let desc = ( metaData.desc && metaData.desc !== "" )? <div style={ detail.meta.desc }>{ metaData.desc }</div> : "" ;

		// Submit .
		let submit = "";

		/****************/
		/* FORM	 	*/
		/****************/

		if( title === "" ){
			submitFlg = true;
			title = <div style={ detail.meta.inputThreadTitleWrap }>
					<i style={ Object.assign( {}, writeIcon, define.style.writeBg ) } />
					<label style={ detail.meta.inputLabel } htmlFor={ "InputTalknThreadTitle" } >Title </label><br />
					<input style={ detail.meta.inputThreadTitle } id={ "InputTalknThreadTitle" } />
				</div>
		}

		if( desc === "" ){
			submitFlg = true;
			desc = <div style={ detail.meta.inputThreadDescWrap }>
					<i style={ Object.assign( {}, writeIcon, define.style.writeBg ) } />
					<label style={ detail.meta.inputLabel } htmlFor={ "InputTalknThreadDesc" }>Description </label><br/>
					<textarea style={ detail.meta.inputThreadDesc } rows="3" id={ "InputTalknThreadDesc" } />
				</div>
		}


		if( submitFlg ){
			submit = <button { ...this.getPostEvents() } style={ detail.meta.submit }>POST</button>
		}

		/****************/
		/* Disp		*/
		/****************/

		return <div style={ detail.meta.root }>

			<div style={ detail.meta.head }>
				<div style={ detail.meta.headTitle }>{ title }</div>
				<div style={ detail.meta.headIcon }>{ type }</div>
			</div>

			{ desc }

			{(()=>{
				if( submit === "" ){

					return <div>
						{ this.getLinkTag( detail, icon, metaData ) }
						<div style={ detail.space }></div>
						{ this.getKeywordsTag( detail, metaData ) }
					</div>

				}else{
					return submit
				}
			})()}

			<div style={ detail.space }></div>
		</div>
 	}

	componentDidMount(){
		const { talknIndex, styles, metaData, actionLog, ws } = this.props;
		const { root, detail, icon } = styles[ talknIndex ];

		if( ws.index.length > 0 && ws.index[ talknIndex ].length > 0 ){
			let connection = ( root.focusMeta.connection )? root.focusMeta.connection : root.option.connection ;
			talknAPI.getApiMeta( {talknIndex: talknIndex, connection: connection } )
		}
	}

	componentDidUpdate(){
		const { talknIndex, styles, metaData, actionLog, ws } = this.props;
		const { root, slide, container } = styles[ talknIndex ];

		// isOpen
		if( parseInt( container.container.height ) !== parseInt( define.style.displayAreaHeight ) ){
			if( root.focusMetaFlg === false ){
				if( actionLog === "CATCH_RESPONSE_API_META" ){
					if( ( slide.openPage === "Thread" ) ){
						talknAPI.slideRight( talknIndex );
					}
				}
			}
		}
	}

}
