import React, { Component, PropTypes } from "react"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import style from './style'
import define from '../../util/define'
import * as stylesAction from '../../actions/styles'
import $ from 'jquery'

class resizeKnob extends Component {

	componentDidMount(){
	}

	render() {
		const { connection, talknIndex, styles } = this.props
		const { talkn, root, container, knob, resizeKnob, main, footer, talknBtn } = styles;

		return ( 
			<resizeKnob 
				className={ define.defaultTalknResizeClass }
				onMouseDown={ ( ev )=>{ talknAPI.startResizeTalkn( talknIndex, ev ) } }
				onMouseMove={ ( ev )=>{ if( resizeKnob.resizeFlg ) talknAPI.stickResizeTalkn( talknIndex, ev ) } }
				onMouseOver={ ( ev )=>{ if( resizeKnob.resizeFlg ) talknAPI.stickResizeTalkn( talknIndex, ev ) } }
				onMouseEnter={ ( ev )=>{ if( resizeKnob.resizeFlg ) talknAPI.stickResizeTalkn( talknIndex, ev ) } }
				onMouseOut={ ( ev )=>{ if( resizeKnob.resizeFlg ) talknAPI.stickResizeTalkn( talknIndex, ev ) } }
				onMouseLeave={ ( ev )=>{ if( resizeKnob.resizeFlg ) talknAPI.stickResizeTalkn( talknIndex, ev ) } }
				onMouseUp={ ( ev )=>{ talknAPI.endResizeTalkn( talknIndex, ev ) } }
			/> )
 	}
}

function mapStateToProps(state) {
 	return state
}

export default connect(
	mapStateToProps,
	null
)(resizeKnob)
