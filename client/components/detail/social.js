import React, { Component, PropTypes } from "react"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as self from './'
import style from './style'
import define from '../../util/define'
import func from '../../util/func'
import { IconPlus } from '../icon'
import DetailCommonText from './commonText'
import $ from 'jquery'

export default class DetailSocial extends Component {

	getResolveEntityText( data ){
		const { styles, talknIndex } = this.props;
		const { root } = styles[ talknIndex ];

		let resolveEntityText = data.text;
		let keys = Object.keys( data.entities );
		let keysLength = keys.length;

		for( let i = ( keysLength - 1 ); 0 <= i; i-- ){

			let key = keys[ i ];
			let keyLength = data.entities[ key ].length;
			
			if( keyLength > 0 ){

				if( key === "hashtags" ){

					for( let j = 0; j < keyLength; j++ ){

						let events = "";
						let text = data.entities[ key ][ j ][ "text" ];
						let hashTag = "#" + text;
						//let IconFind = func.getIconFind( text, root );
						let IconPlus = func.getPlainIconFind( text, root );

						resolveEntityText = resolveEntityText.replace( hashTag, IconPlus );
					}
				}

				if( key === "urls" ){

					for( let j = 0; j < keyLength; j++ ){
		
						let url = data.entities[ key ][ j ][ "url" ];

						resolveEntityText = resolveEntityText.replace( url, 
												"<a href='" + url + "'" + " style='font-weight: bold;color:" + root.customColor.drawBgColor1 + ";'>" + 
													url + 
												"</a>"
								)
					}
				}
			}
		}

		return resolveEntityText;
	}

	getResolveEntityMap( data ){
		const { styles, talknIndex } = this.props;
		const { root } = styles[ talknIndex ];

		let resolveEntityMap = [];
		let keys = Object.keys( data.entities );
		let keysLength = keys.length;

		for( let i = ( keysLength - 1 ); 0 <= i; i-- ){

			let key = keys[ i ];
			let keyLength = data.entities[ key ].length;
			
			if( keyLength === 0 ) continue ;

			if( key === "hashtags" ){

				for( let j = 0; j < keyLength; j++ ){

					let events = "";
					let text = data.entities[ key ][ j ][ "text" ];
					let hashTag = "#" + text;
					let start = data.text.indexOf( hashTag );
					let length = hashTag.length;
					let end = start + length

					resolveEntityMap.push( { type: "IconPlus", text: hashTag, start: start, end: end, length: length } );
				}
			}

			if( key === "urls" ){

				for( let j = 0; j < keyLength; j++ ){
					let url = data.entities[ key ][ j ][ "url" ];
					let start = data.text.indexOf( url );
					let length = url.length;
					let end = start + length

					resolveEntityMap.push( { type: "url", text: url, start: start, end: end, length: length } );
				}
			}
		}

		let resolveEntityMapLength = resolveEntityMap.length;

		if( resolveEntityMapLength === 0 ){

			resolveEntityMap.push( { type: "plain", start: 0,  end: data.text.length, text: data.text, length: data.text.length } );
		}else{

			resolveEntityMap.sort( ( a, b )=>{
				if( a.start < b.start ) return -1;
				if( a.start > b.start ) return 1;
				return 0;
			} );

			let startMap = [];
			let pushMap = [];

			for( let i = 0; i <= ( resolveEntityMapLength - 1 ) ; i++ ){
	
				let type = "plain";
				let start = 0;
				let end = 0;
				let length = 0;
				let text = 0;
					
				if( typeof( resolveEntityMap[ i - 1 ] ) !== "undefined" ){

					if( ( resolveEntityMap[ i ][ "start" ] - 1 ) > resolveEntityMap[ i - 1 ][ "end" ] ){

						if( $.inArray( resolveEntityMap[ i -1 ][ "end" ] + 1, startMap ) === -1 ){
							
							start = resolveEntityMap[ i- 1 ][ "end" ] + 1;
							end = ( typeof( resolveEntityMap[ i + 1 ] ) !== "undefined" )? resolveEntityMap[ i + 1 ][ "start" ] - 1 : data.text.length ;
							text = data.text.substr( start, end );
							length = text.length;
							pushMap.push( { type: type, start: start,  end: end, text: text, length: length } );

							startMap.push( start );
						}
					}

				}else{

					if( i === 0 ){

						start = 0;
						end = ( resolveEntityMap[ 0 ][ "start" ] - 1 );
						text = data.text.substr( start, end );
						length = text.length;
						pushMap.push( { type: type, start: start,  end: end, text: text, length: length } );

						startMap.push( start );
					}

				}

				if( i === ( resolveEntityMapLength - 1 ) ){

					let dataLength = data.text.length;
					if( resolveEntityMap[ i ][ "end" ] < data.text.length ){

						if( $.inArray( resolveEntityMap[ i ][ "end" ] + 1 , startMap ) === - 1 ){

							start = resolveEntityMap[ i ][ "end" ] + 1;
							end = data.text.length;
							text = data.text.substr( start, end );
							length = data.text.length;

							pushMap.push( { type: type, start: start,  end: end, text: text, length: length } );
						}
					}
				}
			}
		
			resolveEntityMap = resolveEntityMap.concat( pushMap );

			resolveEntityMap.sort( ( a, b )=>{
				if( a.start < b.start ) return -1;
				if( a.start > b.start ) return 1;
				return 0;
			} );
		}

		return resolveEntityMap;
	}

	getResolveEntityTag( map ){

		const { talknIndex, actionLog, connection, indexData, styles } = this.props;
		const { root, detail  } = this.props.styles[ talknIndex ]
		let mapLength = map.length;
		let returnTag = [];

		for( let i = 0; i < mapLength; i++ ){

			let d = map[ i ];
			let key = d.start + "_" + d.text;

			switch( d.type ){
			case "plain":
				returnTag.push( <span key={ key }>{ d.text }</span> );
				break;
			case "url":
				returnTag.push( 
					<a key={ key } href={ d.text } style={ { display: "block", fontWeight: "bold", color: root.customColor.drawBgColor1 } }>
						{ d.text }
					</a>
				)	
				break;
			case "IconPlus":
				returnTag.push(
						<span key={ key } { ...this.getKeywordEvents( d.text.replace( "#", "" ) ) } style={ Object.assign( {}, detail.meta.keyword ) }>
							<IconPlus { ...this.getIconProps() }  updateStyles={ { iconPlus: { top: "3px", left: "-10px", transform: "scale( 1.4 )"} } } />
 							{ d.text.replace( "#", "" ) }
						</span> 
				);
				break;
			}
		}
		return returnTag;
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
		let data = ws.apiSocial[ talknIndex ];
		let protcol = func.getProtcol();

		return <ol style={ Object.assign( {}, detail.social.ol ) } >

			{
				(() => {

					if( data && data.statuses && data.statuses.length > 0 ){

						return data.statuses.map( ( data, indexNum ) => {

							let keys = Object.keys( data.entities );
							let keysLength = keys.length;
							
							let profileImage = ( protcol === "http:" )? data.user.profile_image_url : data.user.profile_image_url_https
							//let resolveEntityText = this.getResolveEntityText( data );
							let resolveEntityMap = this.getResolveEntityMap( data );
							let tag = this.getResolveEntityTag( resolveEntityMap );

							return <li key={ data.id } style={ Object.assign( {}, detail.social.li ) }>
								<left style={ Object.assign( {}, detail.social.left, { backgroundImage: "url( " + profileImage + " )" } ) } />
								<right style={ detail.social.right }>
									<div style={ detail.social.userName }>@{ data.user.name }</div>
							{/*		<div style={ detail.social.text } dangerouslySetInnerHTML={{__html: resolveEntityText } } ></div> */ }
									{ tag }
								</right>
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
			talknAPI.getApiSocial( {talknIndex: talknIndex, connection: connection } ) 
		}
	}

	componentDidUpdate(){
	}
}
