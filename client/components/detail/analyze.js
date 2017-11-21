import React, { Component, PropTypes } from "react"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as self from './'
import style from './style'
import define from '../../util/define'
import func from '../../util/func'
import { IconPlus } from '../icon'
import $ from 'jquery'

export default class DetailAnalyze extends Component {

 	render() {
		const { talknIndex, connection, styles, ws, actionLog } = this.props;
		const { root, detail, icon, setting } = styles[ talknIndex ]
		let data = ws.apiAnalyze[ talknIndex ];

		if( data.index ){

			return (
					<div style={ detail.inner }>

						<div style={ detail.space }></div>
						<div style={ detail.connection } >
							TOTAL POST CNT: { data.index.cnt }<br/>
							1 HOUR RANK: { 0 }<br/>
							1 DAY RANK: { 0 }<br/>
							1 WEEK RANK: { 0 }<br/>
							LAYER: { data.index.layer }<br/>
							UPDATED: { data.index.updatedTime }<br/>
						</div>
					</div>
			);
		}else{
			return ( <div> Loading ... </div> )
		}
	}

	componentDidMount(){
		const { talknIndex, styles, metaData, actionLog, ws } = this.props;
		const { root, detail, icon } = styles[ talknIndex ];

		if( ws.index[ talknIndex ].length > 0 ){
			let connection = ( root.focusMeta.connection )? root.focusMeta.connection : root.option.connection ;
			connection = connection.replace( /^\//, '' );
			talknAPI.getApiAnalyze( {talknIndex: talknIndex, connection: "/" + connection } ) 
		}
	}

	componentDidUpdate(){
	}
}
