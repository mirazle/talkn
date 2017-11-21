import React, { Component, PropTypes } from "react"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { IconPlus, IconMinus } from '../icon'
import style from './style'
import define from '../../util/define'
import func from '../../util/func'
import IndexPost from '../indexPost'
import $ from 'jquery'

export default class Index extends Component {

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

	getIconMinusEvents(){
		const { talknIndex, styles, ws, actionLog } = this.props;
		const { root, slide, talknBtn, indexPost } = styles[ talknIndex ]
		let events = {}

		if( define.isTouch ){
			events = { onTouchEnd: ( ev )=>{
					talknAPI.togglePreDeleteIndex( talknIndex );
			 	}
			}
		}else{
			events = { onClick:  ( ev )=>{
					talknAPI.togglePreDeleteIndex( talknIndex );
				}
			}
		}

		return events;
	}

	getIconPlusEvents(){
		const { talknIndex, styles, ws, actionLog } = this.props;
		const { root, slide, talknBtn, indexPost } = styles[ talknIndex ]
		let events = {}

		if( define.isTouch ){
			events = { onTouchEnd: ( ev )=>{
			 	}
			}
		}else{
			events = { onClick:  ( ev )=>{
				}
			}
		}

		return events;
	}

	getIndexPostProps( indexNum ){
		const { talknIndex, actionLog, connection, indexData, styles } = this.props;
		const { root, index } = this.props.styles[ talknIndex ]

		return {
			talknIndex: talknIndex,
			actionLog: actionLog,
			indexData: indexData,
			connection: indexData[ indexNum ].connection,
			styles: styles
		}
	}

	componentDidUpdate(){
		const { talknIndex, styles, indexData, threadData, actionLog } = this.props;
		const { root, slide, thread, index } = styles[ talknIndex ]

		let deleteThreadConnection = "";
		let changeThreadConnection = "";
		let indexDataLength = indexData ? indexData.length : 0;

		switch( actionLog[ 0 ] ){
		case "PRE_DELETE_INDEX":

			for( let indexNum = 0; indexNum < indexDataLength; indexNum++ ){

				let connection = indexData[ indexNum ].connection;

				if( indexData[ indexNum ][ "called" ] && indexData[ indexNum ][ "called" ].indexOf( "deleteConnection:" ) !== -1 ){

					let threadConnections = indexData[ indexNum ][ "called" ].split( "," );
					deleteThreadConnection = threadConnections[ 0 ].replace( "deleteConnection:", "" );
					changeThreadConnection = threadConnections[ 1 ].replace( "changeConnection:", "" );

					let wsParams = func.getWsParams( "index", talknIndex, changeThreadConnection );
					talknAPI.deleteIndex( {talknIndex: talknIndex, connection: deleteThreadConnection } )
					talknAPI.changeThread( {
									talknIndex: talknIndex,
									title: wsParams.title,
									connection: changeThreadConnection,
									thum: wsParams.thum,
									slideCenter: false
					} )
					break;
				}
			}
			break;
		}
	}

	componentDidMount(){
	}

 	render() {
		const { connection, talknIndex, indexData, styles } = this.props
		const { root, index } = this.props.styles[ talknIndex ]

		let multiStreamKey = ( root.setting.multiStream )? "1": "0" ;
		let iconMinusUpdateStyles = { iconMinus:{ left: "14px", top: "7px" }};
		let iconPlusUpdateStyles = { iconPlus:{ left: "40px", top: "7px"  }};
		iconMinusUpdateStyles.iconMinus.transform = ( index.togglePreDeleteFlg )? "rotate( 90deg ) scale( 2 )" : "rotate( 0deg ) scale( 2 )" ;
		iconPlusUpdateStyles.iconPlus.transform = "scale( 2 )";

		let indexTextarea = Object.assign( {}, index.textarea );

		return (
			<li style={ Object.assign( {}, index.index ) } className={ "index" }>

				<div style={ index.inner }>
					<div style={ Object.assign( {}, index.guideWrap ) }>
						<div style={ Object.assign( {}, index.guideLeft ) }>
							<IconMinus { ...this.getIconProps() } touchFunc={ this.getIconMinusEvents() } updateStyles={ iconMinusUpdateStyles } />
							<IconPlus { ...this.getIconProps() } touchFunc={ this.getIconPlusEvents() } updateStyles={ iconPlusUpdateStyles } />
						</div>
						<div style={ Object.assign( {}, index.guideRight ) }>
							<textarea className={ "searchIndex" } data-talknindex={ talknIndex } style={ Object.assign( {}, index.textarea ) }
								  onFocus={ ()=>{ talknAPI.focusTextarea( talknIndex, "searchIndex" ) } }
								  className={ "searchIndex" }></textarea>
						</div>
					</div>
					<ol style={ index.ol }>
					{
						(() => {
							if( typeof indexData !== "undefined" ){

								return indexData.map( ( data, indexNum ) => {

									let dataValue = data[ "multiStream" + multiStreamKey ];

									if( dataValue !== undefined ){

										return <IndexPost key={ data.connection } { ...this.getIndexPostProps( indexNum ) } {...dataValue }/>;
									}
								})
							}
						})()
					}
					</ol>
				</div>
			</li>
		)
 	}
}
