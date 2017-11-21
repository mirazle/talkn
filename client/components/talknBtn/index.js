import React, { Component, PropTypes } from "react"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import style from './style'
import define from '../../util/define'
import $ from 'jquery'

class TalknBtn extends Component {

	componentDidMount(){
	}

	render() {

		const { connection, talknIndex, styles } = this.props
		const { talkn, root, container, knob, resizeKnob, main, footer, talknBtn } = styles;
		const { button } = style;

		return (
				<button 
					style={ button }
					className={ define.defaultTalknStickClass }
					onMouseDown={ ( ev )=>{ talknAPI.mousedownTalknBtn( talknIndex, ev ) } }
					onMouseMove={ ( ev )=>{ if( talknBtn.mousedownFlg ) talknAPI.stickMoveTalkn( talknIndex, ev ) } }
					onMouseOver={ ( ev )  =>{ if( talknBtn.mousedownFlg ) talknAPI.stickMoveTalkn( talknIndex, ev ) } }
					onMouseEnter={ ( ev )=>{ if( talknBtn.mousedownFlg ) talknAPI.stickMoveTalkn( talknIndex, ev ) } }
					onMouseOut={ ( ev )=>{ if( talknBtn.mousedownFlg ) talknAPI.stickMoveTalkn( talknIndex, ev ) } }
					onMouseLeave={ ( ev )=>{ if( talknBtn.mousedownFlg ) talknAPI.stickMoveTalkn( talknIndex, ev ) } }
					onMouseUp={ ( ev )=>{ talknAPI[ talknBtn.mousedownAction ]( talknIndex, ev ) } }
				 />
			 )
 	}
}

function mapStateToProps( state, props ) {
 	return Object.assign( {}, state, props );
}

export default connect(
	mapStateToProps,
	null
)(TalknBtn)
