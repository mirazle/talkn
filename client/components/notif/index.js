import React, { Component, PropTypes } from "react"
import ReactDOM from 'react-dom'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import IndexNotif from '../indexNotif';
import style from './style'
import func from '../../util/func'
import define from '../../util/define'
import injectStyle from '../../util/injectStyle';
import $ from 'jquery'

export default class Notif extends Component {

	constructor(props) {
		super(props);

		const keyframesStyle = `
			@-webkit-keyframes toastUp {
				0% {transform: translate3d(0px, 0px, 1px);}
				10% {transform: translate3d(0px, -76px, 1px);}
				15% {transform: translate3d(0px, -70px, 1px);}
				18% {transform: translate3d(0px, -75px, 1px);}
				21% {transform: translate3d(0px, -70px, 1px);}
				23% {transform: translate3d(0px, -74px, 1px);}
				15% {transform: translate3d(0px, -70px, 1px);}
				26% {transform: translate3d(0px, -73px, 1px);}
				27% {transform: translate3d(0px, -70px, 1px);}
				28% {transform: translate3d(0px, -72px, 1px);}
				29% {transform: translate3d(0px, -70px, 1px);}
				30% {transform: translate3d(0px, -71px, 1px);}
				31% {transform: translate3d(0px, -70px, 1px);}
				80% {transform: translate3d(0px, -70px, 1px);}
				100% {transform: translate3d(0px, 0px, 1px);}
		}`;
		injectStyle( keyframesStyle );
	}

	getLiEvents(){
		const { talknIndex, actionLog, connection, styles } = this.props;

		return {}
	}

	getIndexPostEvents(){
		const { talknIndex, actionLog, connection, styles } = this.props;

		return {
			talknIndex: talknIndex,
			actionLog: actionLog,
			connection: connection,
			styles: styles
			}
	}

 	render() {
		const { connection, talknIndex, actionLog, notifData, styles } = this.props
		const { root, notif, index } = this.props.styles[ talknIndex ]
		let multiStreamKey = ( root.setting.multiStream )? "1": "0" ;

		return (
			<ol id={ "talknNotif" + talknIndex } style={ Object.assign( {}, notif.notif ) } >
			{
				(() => {

					if(notifData){					
						return notifData.map( ( dataMap, indexNum ) => {

							let data = dataMap[ "multiStream" + multiStreamKey ];

							if( data !== undefined && data.connection !== undefined ){

								let id = talknIndex + "_" + indexNum + "_" + data._id;

								return <IndexNotif
									key={ talknIndex + "_" + indexNum + "_" + data._id }
									id={ id }
									connection={ data.connection }
									talknIndex={ talknIndex }
									styles={ styles }
									actionLog={ actionLog }
									dataValue={ data }
									/>
							}
						})
					}
				})()
			}
			</ol>
		)
 	}

	componentDidMount(){
	}

	componentDidUpdate(){
		const { connection, talknIndex, actionLog, notifData, styles } = this.props
		const { root, notif, index } = this.props.styles[ talknIndex ]
	}

}
