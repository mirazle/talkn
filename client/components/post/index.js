import React, { Component, PropTypes } from "react"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import define from '../../util/define'
import func from '../../util/func'
import $ from 'jquery'
import timeago from 'timeago.js';
import lang from 'timeago.js/locales/ja';


export default class Post extends Component {

	getBalloonEvents( postConnection ){
		const { talknIndex, connection, styles } = this.props;
		const { slide, post } = styles[ talknIndex ]

		let mouseEvents = {
			onClick: ( ev )=>{ 
				if( slide.stickSlideMoveCnt < 2 ){
					talknAPI.getApiMeta( {talknIndex: talknIndex, connection: postConnection } ) 
				}
			}
		}

		let touchEvents = {
			onTouchStart: ( ev )=>{ 
				if( slide.stickSlideMoveCnt < 2 ){
					talknAPI.getApiMeta( {talknIndex: talknIndex, connection: postConnection } ) 
				}
			}
		}

		return ( define.isTouch )? touchEvents : mouseEvents ;
	}

	getDispConnection( rootConnection, currentConnection ){

		if( rootConnection === currentConnection ){
			return "@" ;
		}else{
			return "@" + currentConnection.replace( rootConnection + "/", "" );
		}
	}

	getLeftProps(){
		const { talknIndex, connection, styles } = this.props;
		const { post } = styles[ talknIndex ]
		return post.left
	}

 	render() {
		const { talknIndex, connection, styles, actionLog } = this.props;
		const { root, post } = styles[ talknIndex ]

		let thum = this.props.thum;

		if( thum && thum.indexOf( "http" ) !== 0 ){
			let protcol = func.getProtcol();
			thum = ( protcol + thum );
		}

		post.left.backgroundImage = "url( " + thum  + " )";
		//post.left.backgroundImage = "url( //assets.talkn.io/img/microphone.png )";

		return( 
			<li style={ post.post } >
				<left style={ Object.assign( {}, post.left ) } >
				</left>
				<right style={ post.right }>
					<div className={ "timeAgo" } dateTime={ this.props.postTime } style={ post.postTime } >{ this.props.postTime }</div>
					<balloon style={ Object.assign( {}, post.balloon ) } { ...this.getBalloonEvents( this.props.connection ) } >
						{ <div style={ post.balloonConnection }>{ this.getDispConnection( root.focusMeta.connection, this.props.connection ) }</div> } 
						{ /* DJ大悟のSmile Hour! */ }
						<div style={ post.balloonTalk } dangerouslySetInnerHTML={{__html: this.props.talk } } ></div>
					</balloon>
				</right>
			</li>
		)
 	}
}

