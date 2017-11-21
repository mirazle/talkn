import React, { Component, PropTypes } from "react"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as self from './'
import * as stylesAction from '../../actions/styles'
import style from './style'
import define from '../../util/define'
import $ from 'jquery'

class Footer extends Component {

 	render() {
		const { connection, talknIndex, styles } = this.props
		const { talkn, root, container, knob, resizeKnob, main, footer, talknBtn } = styles;
		
		return (
			<footer 
				className={ define.defaultTalknStickClass }  
				style={ Object.assign( {}, footer.footer ) } >
				<div style={ footer.footerRow }>
					<div style={ footer.thumArea } onClick={ ( ev )=>{ talknAPI.toggleDisplayArea( talknIndex, ev ) } } >
						<div style={ footer.thum }>talkn</div>
					</div>
					<div style={ footer.textareaArea }>
						<div style={ footer.textareaTable }>
							<div style={ footer.textareaRow } >
								<div style={ footer.textareaFocusTheme } />
							</div>
							<div style={ footer.textareaRow } >
								<div style={ footer.textareaWrap } >
									<textarea value={ "#" } style={ Object.assign( {}, footer.textarea ) } />
								</div>
							</div>
						</div>
					</div>
					<div style={ Object.assign( {}, footer.btnArea ) }>
					</div>
				</div>
			</footer>
		)
 	}
}

export default connect( function( state, props ){
	return Object.assign( {}, state, props );
}, null )( Footer ) ;
