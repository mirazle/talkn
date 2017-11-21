import React, { Component, PropTypes } from "react"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import style from './style'
import styles from '../styles'
import define from '../../util/define'
import Thread from '../thread/'
import Footer from '../footer/'
import ResizeKnob from '../resizeKnob'
import TalknBtn from '../talknBtn'
import $ from 'jquery'

class container extends Component {

	componentDidMount(){
	}

	render() {
		const { talkn, container, knob, resizeKnob, main, footer, talknBtn } = this.props.styles;

		return ( 
			<container style={ Object.assign( {}, container.container ) }>
				onMouseEnter={ ()=>{ console.log( "onMouseEnter" );  } }
				onMouseOver={ ()=>{ console.log( "onMouseOver" );  } }
				onMouseDown={ ()=>{ console.log( "onMouseDown" );  } }
				onMouseOut={ ()=>{ console.log( "onMouseOut" );  } }
				onMouseLeave={ ()=>{ console.log( "onMouseLeave" );  } }
				onMouseUp={ ()=>{ console.log( "onMouseUp" );  } }
				<ResizeKnob style={ Object.assign( {}, resizeKnob.resizeKnob ) } />
				<knob style={ Object.assign( {}, knob.knob ) }>
					<main style={ Object.assign( {}, main.main ) } >
						<Thread connection={ this.props.connection } />
						<Footer connection={ this.props.connection } />
					</main>
					<TalknBtn style={ Object.assign( {}, talknBtn.talknBtn ) } />
				</knob>
			</container>
		)
 	}
}

function mapStateToProps(state) {
 	return state
}

export default connect(
	mapStateToProps,
	null
)(container)
