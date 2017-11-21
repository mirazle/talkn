import React, { Component, PropTypes } from "react"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as self from './'
import style from './style'
import define from '../../util/define'
import func from '../../util/func'
import { IconPlus } from '../icon'
import $ from 'jquery'

export default class DetailCommonText extends Component {

	getSplitRegExp( replaces ){
		let replaceLength = replaces.length;
		let splitRegArr = [];

		for( let i = 0; i < replaceLength; i++ ){
			splitRegArr.push( replaces[ i ][ "text" ] )
		}

		return new RegExp( splitRegArr.join( "|" ), "g" );

	}

 	render() {
		const { allText, replaces, talknIndex, connection, styles, ws, actionLog } = this.props;
		const { root, detail, icon } = styles[ talknIndex ]


		let replaceLength = replaces.length;

		for( let i = 0; i < replaceLength; i++ ){

			switch( replaces[ i ][ "type" ] ){
			case "IconPlus":

				break;
			case "url":

				break;
			}

		}

		return <div>
				{(() => {
					return allText;
				})()}
		</div>
/*
		console.log( "============= " + splitRegExp );
		let splitRegExp = this.getSplitRegExp( replaces );
		allText.split( splitRegExp ).map( ( obj, num, all )=>{
			console.log( "--- " + num )
			console.log( obj );
		} )
*/
 	}
}	
