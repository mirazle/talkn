import React, { Component, PropTypes } from "react"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as self from './'
import style from './style'
import define from '../../util/define'
import { IconPlus } from '../icon'
import $ from 'jquery'

export default class DetailPicture extends Component {

	getIconEvents( connection ){
		const { talknIndex, styles } = this.props;
		const { slide, post, root } = styles[ talknIndex ]

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

	getMetaTag( detail, icon, detailData ){



	}

	getLinkTag( detail, icon, detailData ){

		let returnTag = "";
		let socialLink = Object.assign( {}, detail.socialLink, { opacity: icon.opacity } );

		if( detailData && detailData.connection ){
			let ogTwId = ( detailData.ogTwId !== undefined )? detailData.ogTwId: "" ;
			let ogFbId = ( detailData.ogFbId !== undefined )? detailData.ogFbId: "" ;
			let connection = detailData.connection;

			returnTag = <div>
					<ol style={ Object.assign( {}, detail.meta.olLink ) }>
						<li style={ detail.meta.liLink }>
							<a style={ Object.assign( {}, socialLink, define.style.twBg ) } href={ "//twitter.com/" + ogTwId.replace( "@", "" ) } >tw</a>
						</li>
						<li style={ detail.meta.liLink }>
							<a style={ Object.assign( {}, socialLink, define.style.fbBg ) } href={ "//www.facebook.com/" + ogFbId }>fb</a>
						</li>
						<li style={ detail.meta.liLink }>
							<a style={ Object.assign( {}, socialLink, define.style.hpBg ) } href={ "http://" + connection.substr( 1 ) }>hp</a>
						</li>
						<li style={ detail.meta.liLink }>
							<a style={ Object.assign( {}, socialLink, define.style.shBg ) } href="">sh</a>
						</li>
					</ol>
				</div>
		}
		return returnTag;
	}

	getKeywordsTag( detail, detailData ){

		if( detailData ){
			if( detailData.keywords === undefined ) detailData.keywords = [];
			let keywordLength = detailData.keywords.length;

			if ( detailData.keywords && keywordLength > 0 ) {
				if ( detailData.keywords[ 0 ] !== "" ) {

					return <div>
						{(()=>{
							return detailData.keywords.map( ( keyword, index ) => {
	
								if( keyword === "" ) return null;
								return <span key={ index + "_" + keyword } style={ Object.assign( {}, detail.meta.keyword ) }>
										<IconPlus { ...this.getIconProps() } 
											  touchFunc={ this.getIconEvents( keyword ) }
											  updateStyles={ { iconPlus: { top: "3px", left: "-16px", transform: "scale( 1.4 )"} } } 
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
		const { talknIndex, connection, styles, detailData, actionLog } = this.props;
		const { root, detail, icon } = styles[ talknIndex ]

		/****************/
		/* Get Tag	*/
		/****************/

		let returnTag1 = null;
		let returnTag2 = null;

		if ( detailData ){

			if( detailData.ogName !== "" || detailData.ogType !== "" ) {
				returnTag1 = <li style={ detail.meta.liMeta }>

						{(()=>{ 
							if( detailData.ogName && detailData.ogName !== "" ){ 
								return detailData.title 
							} 
						})()}

						{(()=>{ 
							if( detailData.ogType && detailData.ogType !== "" ){
								return "(" + detailData.ogType + ")"; 
							} 
						})()}
						
					</li>
			}

		
			if ( detailData.desc !== "" ) {
				returnTag2 = <li style={ detail.meta.liDesc }>{ detailData.desc }</li>
			}
		}

		/****************/
		/* Disp Flg	*/
		/****************/

		if( returnTag1 && returnTag1.props.children.length > 0 ){
			if( returnTag1.props.children[ 0 ] === undefined && returnTag1.props.children[ 1 ] === undefined ){
				returnTag1 = null;
			}
		}else{
			returnTag1 = null;
		}

		if( returnTag2 && returnTag2.props.children === undefined ){
			returnTag2 = null;
		}

		/****************/
		/* Disp		*/
		/****************/

		if( returnTag1 !== null || returnTag2 !== null ){

			return <ol style={ Object.assign( {}, detail.meta.ol ) }>
					PICTURE ON
				</ol>
		}else{
			return <ol style={ Object.assign( {}, detail.meta.ol ) } >
				<br/><br/>
				PICTURE OFF
				No Data .
				<br/><br/>
			</ol>
		}

 	}
	
	componentDidMount(){
		const { talknIndex, styles, metaData, actionLog, ws } = this.props;
		const { root, detail, icon } = styles[ talknIndex ];

		if( ws.index[ talknIndex ].length > 0 ){
			let connection = ( root.focusMeta.connection )? root.focusMeta.connection : root.option.connection ;
			talknAPI.getApiPicture( {talknIndex: talknIndex, connection: connection } ) 
		}
	}

	componentDidUpdate(){
	}

}
