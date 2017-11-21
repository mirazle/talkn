import React, { Component, PropTypes } from "react"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from '../styles'
import define from '../../util/define'
import func from '../../util/func'
import resetStyle from '../../util/resetStyle'
import Thread from '../thread/'
import Index from '../index/'
import Detail from '../detail/'
import Setting from '../setting/'
import Notif from '../notif'
import ResizeKnob from '../resizeKnob'
import TalknBtn from '../talknBtn'
import { IconMenu, IconUser } from '../icon'
import * as stylesAction from '../../actions/styles'
import $ from 'jquery'

class root extends Component {

	getRootProps(){
		const { talknIndex, styles } = this.props
		const { root, resizeKnob } = styles[ talknIndex ];
		return {
			style: Object.assign( {}, root.root ),
			onMouseMove: ( ev )=>{ if( resizeKnob.resizeFlg ) talknAPI.stickResizeTalkn( talknIndex, ev ) }
		}
	}

	getContainerProps(){
		const { talknIndex, styles, actionLog } = this.props
		const { container } = styles[ talknIndex ];
		return {
			style: Object.assign( {}, container.container ),
			onMouseDown: ( ev )=>{ talknAPI.focusTalkn( talknIndex, ev ) },
			onTransitionEnd:( ev )=>{
				if( actionLog[ 0 ] === "TOGGLE_DISPLAY_AREA" ){
					talknAPI.endTransitionDisplayArea( talknIndex );
				}
			}
		}
	}

	getResizeKnobProps(){
		const { talknIndex, styles } = this.props
		const { resizeKnob } = styles[ talknIndex ];
		return {
			style: Object.assign( {}, resizeKnob.resizeKnob ),
			onMouseDown: ( ev )=>{ talknAPI.startResizeTalkn( talknIndex, ev ) },
			onMouseMove: ( ev )=>{ if( resizeKnob.resizeFlg ) talknAPI.stickResizeTalkn( talknIndex, ev ) } ,
			onMouseOver: ( ev )=>{ if( resizeKnob.resizeFlg ) talknAPI.stickResizeTalkn( talknIndex, ev ) } ,
			onMouseEnter: ( ev )=>{ if( resizeKnob.resizeFlg ) talknAPI.stickResizeTalkn( talknIndex, ev ) } ,
			onMouseOut: ( ev )=>{ if( resizeKnob.resizeFlg ) talknAPI.stickResizeTalkn( talknIndex, ev ) } ,
			onMouseLeave: ( ev )=>{ if( resizeKnob.resizeFlg ) talknAPI.stickResizeTalkn( talknIndex, ev ) } ,
			onMouseUp: ( ev )=>{ talknAPI.endResizeTalkn( talknIndex, ev ) }
		}

	}

	getOpenSettingEvents(){
		const { talknIndex, styles } = this.props
		const { header } = styles[ talknIndex ];

		let mouseEvents = {
			onClick: ( ev )=>{ talknAPI.toggleSettingArea( talknIndex, ev ) }
		}

		let touchEvents = {
			onTouchStart: ( ev )=>{ talknAPI.toggleSettingArea( talknIndex, ev ) }
		}

		return ( define.isTouch )? touchEvents : mouseEvents ;
	}

	getMainProps(){
		const { talknIndex, styles } = this.props
		const { main } = styles[ talknIndex ];
		return {
			style: Object.assign( {}, main.main )
		}
	}

	getIndexProps(){
		const { talknIndex, actionLog, ws, styles, connection } = this.props
		const { root } = styles[ talknIndex ];
		let indexData = ws.index[ talknIndex ];
		return {
			styles: styles,
			actionLog: actionLog,
			connection: connection,
			talknIndex: talknIndex,
			indexData: indexData
		}
	}

	initPosition(){
		const { talknIndex, styles } = this.props

		let mouseEvents = {
			onClick: ( ev )=>{

				// isOpen
				if( parseInt( styles[ talknIndex ].container.container.height ) !== parseInt( define.style.displayAreaHeight ) ){
					talknAPI.initPosition( talknIndex );
				}
			}
		}

		let touchEvents = {
			onTouchStart: ( ev )=>{

				// isOpen
				if( parseInt( styles[ talknIndex ].container.container.height ) !== parseInt( define.style.displayAreaHeight ) ){
					talknAPI.initPosition( talknIndex );
				}
			}
		}

		let events = ( define.isTouch )? touchEvents : mouseEvents ;

		return events;
	}

	getThreadProps(){
		return this.props
	}

	getDetailProps(){
		return this.props;
	}

	getSettingProps(){
		return this.props;
	}

	getNotifProps(){
		const { talknIndex, actionLog, ws, styles, connection } = this.props
		const { root } = styles[ talknIndex ];
		let indexData = ws.index[ talknIndex ];

		return {
			styles: styles,
			actionLog: actionLog,
			connection: connection,
			talknIndex: talknIndex,
			notifData: indexData
		}
	}

	getTalknBtnProps(){
		const { talknIndex, styles } = this.props
		const { talknBtn } = styles[ talknIndex ];

		return {
			style: Object.assign( {}, talknBtn.button ),
			onMouseDown: ( ev )=>{ talknAPI.mousedownTalknBtn( talknIndex, ev ) },
			onMouseMove: ( ev )=>{ if( talknBtn.mousedownFlg ) talknAPI.stickMoveTalkn( talknIndex, ev ) },
			onMouseOver: ( ev )  =>{ if( talknBtn.mousedownFlg ) talknAPI.stickMoveTalkn( talknIndex, ev ) },
			onMouseEnter: ( ev )=>{ if( talknBtn.mousedownFlg ) talknAPI.stickMoveTalkn( talknIndex, ev ) },
			onMouseOut: ( ev )=>{ if( talknBtn.mousedownFlg ) talknAPI.stickMoveTalkn( talknIndex, ev ) },
			onMouseLeave: ( ev )=>{ if( talknBtn.mousedownFlg ) talknAPI.stickMoveTalkn( talknIndex, ev ) },
			onMouseUp: ( ev )=>{ talknAPI[ talknBtn.mousedownAction ]( talknIndex, ev ) }
		}
	}

	getHeaderEvents(){
		const { talknIndex, styles } = this.props

		let mouseEvents = {
			onClick: ( ev )=>{

				if( parseInt( styles[ talknIndex ].container.container.height ) === parseInt( define.style.displayAreaHeight ) ){
					talknAPI.toggleDisplayArea( talknIndex, ev )
				}
			}
		}

		let touchEvents = {
			onTouchStart: ( ev )=>{

				if( parseInt( styles[ talknIndex ].container.container.height ) === parseInt( define.style.displayAreaHeight ) ){
					talknAPI.toggleDisplayArea( talknIndex, ev )
				}
			}
		}

		let events = ( define.isTouch )? touchEvents : mouseEvents ;

		return events;
	}

	getFooterThumAreaProps(){
		const { talknIndex, styles } = this.props
		const { footer } = styles[ talknIndex ];

		let mouseEvents = {
			onClick: ( ev )=>{ talknAPI.toggleDisplayArea( talknIndex, ev ) }
		}

		let touchEvents = {
			onTouchStart: ( ev )=>{ talknAPI.toggleDisplayArea( talknIndex, ev ) }
		}

		let events = ( define.isTouch )? touchEvents : mouseEvents ;

		return Object.assign( {}, {style: footer.thumArea}, events );
	}

	getFooterThumProps(){
		const { talknIndex, styles, ws, focusIndex } = this.props
		const { root, footer } = styles[ talknIndex ];
		let focusMeta = root.focusMeta;
		let protcol = func.getProtcol();
		let h = protcol + "//";

		let thum = "";
		if( root.focusMeta && root.focusMeta.thum ) thum = root.focusMeta.thum;

		if( define.server.defaultThum === thum ){
			thum = focusIndex.thum
		}

		if( thum && thum !== "" && thum.indexOf( "http" ) !== 0 ){
			thum = h + thum;
		}

		footer.thum.backgroundImage = "url( " + thum  + " )";
		//footer.thum.backgroundImage = "url( //assets.talkn.io/img/microphone.png )";
		return Object.assign( {}, footer.thum );
	}

	getSlideEvents(){
		const { talknIndex, styles } = this.props
		const { slide } = styles[ talknIndex ];

		if( define.isTouch ){
			return {
				onTouchStart: ( ev )=>{ talknAPI.startThreadMove( talknIndex, ev ) },
				onTouchMove: ( ev )=>{ if( slide.stickFlg ) talknAPI.stickThreadMove( talknIndex, ev ) },
				onTouchEnd: ( ev )=>{ talknAPI.endThreadMove( talknIndex, ev ) }
			}
		}else{
			return {
				onMouseDown: ( ev )=>{ talknAPI.startThreadMove( talknIndex, ev ) },
				onMouseMove: ( ev )=>{ if( slide.stickFlg ) talknAPI.stickThreadMove( talknIndex, ev ) },
				onMouseUp: ( ev )=>{ talknAPI.endThreadMove( talknIndex, ev ) }
			}
		}

	}

	getIndexPostEvents(){

		const { talknIndex, actionLog, connection, styles } = this.props;
		const { root } = styles[ talknIndex ];

		return {
			talknIndex: talknIndex,
			actionLog: actionLog,
			connection: connection,
			styles: styles
			}
	}

	render() {

		const { talkn, talknIndex, styles, ws, actionLog, connection, watchCnt } = this.props
		const { root, container, knob, resizeKnob, main, header, footer, talknBtn, slide, index, thread, detail, icon } = styles[ talknIndex ];
		let apiMeta = ws.apiMeta[ talknIndex ];
		let iconStyle = Object.assign( {}, header.openSetting, { opacity: icon.opacity } );
		let talknCssId = "#talkn" + talknIndex;

		return (
			<root { ...this.getRootProps() }>
				<style type='text/css'>
					{ resetStyle( talknIndex ) }
				</style>
				<container { ...this.getContainerProps() } >
					<resizeKnob { ...this.getResizeKnobProps() } />
					<main { ...this.getMainProps() } >

						<Setting { ...this.getSettingProps() } />

						<header style={ Object.assign( {}, header.header ) } { ...this.getHeaderEvents() } >
							<openIndex { ...this.initPosition() } style={ Object.assign( {}, header.openIndex ) } >
							</openIndex>
							<connection style={ Object.assign( {}, header.connection ) }>
								{
									(()=>{
										let watchCntDisp = " (" + watchCnt + ")";
										//let watchCntDisp = " (126)";

										//return "DJ大悟のSmile Hour!(126)"
										if( root.focusMeta.title !== ""){
											return root.focusMeta.title + watchCntDisp;
										}else{
											return root.focusMeta.connection + watchCntDisp;
										}
									})()
								}
							</connection>
							<openSetting style={ Object.assign( {}, iconStyle ) } { ...this.getOpenSettingEvents() }></openSetting>
						</header>

						<ol className="slide" style={ Object.assign( {}, slide.slide ) } { ...this.getSlideEvents() }>
							<Index { ...this.getIndexProps() } />
							<Thread { ...this.getThreadProps() } />
							<Detail { ...this.getDetailProps() } />
						</ol>

						<footer className={ define.defaultTalknStickClass } style={ Object.assign( {}, footer.footer ) } >
							<div style={ footer.footerRow }>
								<div { ...this.getFooterThumAreaProps() } >
									<div style={ this.getFooterThumProps() }>talkn</div>
								</div>
								<div style={ footer.textareaArea }>
									<div style={ footer.textareaTable }>
										<div style={ footer.textareaRow } >
											<div style={ footer.textareaFocusTheme } />
										</div>
										<div style={ footer.textareaRow } >
											<div style={ footer.textareaWrap } >
												<textarea className={ "post" }
													  data-talknindex={ talknIndex }
													  onFocus={ ()=>{ talknAPI.focusTextarea( talknIndex, "post" ) } }
													  style={ Object.assign( {}, footer.textarea ) }></textarea>
											</div>
										</div>
									</div>
								</div>
								<div style={ footer.btnArea }></div>
							</div>
						</footer>

						<Notif { ...this.getNotifProps() } />
					</main>

					<button { ...this.getTalknBtnProps() } />
				</container>
			</root>
		)
 	}

	componentWillReceiveProps() {
		const { talknIndex, styles, actionLog } = this.props
	}

	componentWillMount(){
		const { talknIndex, styles, actionLog } = this.props
	}

	componentDidMount(){
		const { talkn, talknIndex, styles, actionLog } = this.props
		const { root, container, knob, resizeKnob, main, header, footer, talknBtn, slide, index, thread } = styles[ talknIndex ];


		talknAPI.slideCenter( talknIndex );

		if( talknIndex === 0 ){
			chrome.runtime.sendMessage( { method: "getItem", key: define.cacheKey.index + talknIndex, function(){} } );

		}else{
			let connectionList = JSON.parse( localStorage.getItem( define.cacheKey.index + talknIndex ) );
			func.findMap( talknIndex, connectionList, root.focusMeta );
		}
	}

	componentDidUpdate(){
		const { talknIndex, styles, actionLog } = this.props
		const { root, container, knob, resizeKnob, main, header, footer, talknBtn, slide, index, thread } = styles[ talknIndex ];

		if( actionLog[ 0 ] === "STICK_RESIZE_TALKN" || actionLog[ 0 ] === "END_RESIZE_TALKN" ){

			let mode = func.getMode( container.container.width );

			if( root.option.mode !== mode ){
				talknAPI.changeMode( talknAPI.talknIndex, mode );
			}
		}

	}
}

function mapStateToProps( state, props ) {

	/************************/
	/* LOGIC		*/
	/************************/

	let addObj = {}
	let talknIndex = state.talknIndex;
	let root = state.styles[ talknIndex ].root;
	let setting = root.setting;
	let index = state.ws.index[ talknIndex ];
	let apiMeta = state.ws.apiMeta[ talknIndex ];
	let posts = state.ws.posts[ talknIndex ];
	let indexLength = index ? index.length: 0 ;
	let multiStreamKey = ( setting.multiStream )? "1": "0" ;

	/************************/
	/* ADD OBJECT		*/
	/************************/

	addObj.focusIndex = func.getFocusIndex( talknIndex, state );

	/************************/
	/* SET CACHE		*/
	/************************/

	if( state.actionLog[ 0 ] === "FIND" || state.actionLog[ 0 ] === "CATCH_RESPONSE" || state.actionLog[ 0 ] === "DELETE_INDEX" ){

		if( setting.saveIndex ){
			func.setCache( talknIndex, define.cacheKey.index, state.ws.index[ talknIndex ] );
		}

		if( setting.saveIndex && state.actionLog[ 0 ] === "DELETE_INDEX" ){
			func.setCache( talknIndex, define.cacheKey.index, state.ws.index[ talknIndex ] );
		}
	}

	if( state.actionLog[ 0 ] === "TOGGLE_SETTING_SWITCH" || state.actionLog[ 0 ] === "END_SETTING_BAR" ){
		func.setCache( talknIndex, define.cacheKey.setting, setting );
	}

	/************************/
	/* EFFECT SETTING	*/
	/************************/

	if( state.actionLog[ 0 ] === "CONNECT" ||
		state.actionLog[ 0 ] === "STICK_SETTING_BAR"  ||
		state.actionLog[ 0 ] === "END_SETTING_BAR" ||
		state.actionLog[ 0 ] === "TOGGLE_DISPLAY_AREA" ){

		addObj.custom = {};
		addObj.custom.fontColor = "";
		addObj.custom.lineColor = "";
		addObj.custom.drawBgColor1 = "";

		let drawBgColor1 = setting.drawBgColor1
		let drawBgColor1Obj = func.getSplitRgba( drawBgColor1 );
		let colorPart = Math.floor( ( drawBgColor1Obj.R + drawBgColor1Obj.G + drawBgColor1Obj.B ) / 3 );
		colorPart = ( colorPart < 0 )? 0 : colorPart;
		colorPart = ( colorPart > 255 )? 255 : colorPart;
		let colorRate = Math.floor( ( colorPart / 255 ) * 100 ) / 100

		let lineColorA = Math.floor( ( drawBgColor1Obj.A / 2 ) * 100 ) / 100 ;
		let lineColor = "rgba( " + colorPart + ", " + colorPart + ", " + colorPart + ", " + ( drawBgColor1Obj.A / 2 ) + " ) ";

		let fontColorA = Math.floor( ( drawBgColor1Obj.A + 0.2 ) * 100 ) / 100 ;
		let fontColor = "rgba( " + colorPart + ", " + colorPart + ", " + colorPart + ", " + fontColorA + " ) ";

		let iconOpacityRange = parseFloat( root.iconOpacityRange.max ) - parseFloat( root.iconOpacityRange.min );
		let iconOpacity = parseFloat( root.iconOpacityRange.max ) - ( iconOpacityRange * colorRate );
		iconOpacity = Math.floor( iconOpacity * 100 ) / 100;

		/************************/
		/* EFFECT SETTING COLOR	*/
		/************************/

		// BackgroundColor .
		state.styles[ talknIndex ].thread.getMore.background = drawBgColor1;
		state.styles[ talknIndex ].thread.newPostAlert.background = drawBgColor1;
		state.styles[ talknIndex ].post.balloon.background = drawBgColor1
		state.styles[ talknIndex ].settingSwitch.settingSwitch1.background = drawBgColor1
		state.styles[ talknIndex ].settingBar.settingBar.background = drawBgColor1
		state.styles[ talknIndex ].index.guideWrap.background = drawBgColor1
		state.styles[ talknIndex ].detail.meta.keyword.background = drawBgColor1
		state.styles[ talknIndex ].icon.iconPlus.border = "1px solid " + drawBgColor1
		state.styles[ talknIndex ].icon.iconPlus1.background = drawBgColor1
		state.styles[ talknIndex ].icon.iconPlus2.background = drawBgColor1
		state.styles[ talknIndex ].icon.iconMinus.border = "1px solid " + drawBgColor1
		state.styles[ talknIndex ].icon.iconMinus1.background = drawBgColor1

		// Root .
		state.styles[ talknIndex ].root.customColor.fontColor = fontColor;
		state.styles[ talknIndex ].root.customColor.lineColor = lineColor;
		state.styles[ talknIndex ].root.customColor.drawBgColor1 = drawBgColor1;

		// FontColor .
		state.styles[ talknIndex ].root.root.color = fontColor;

		// IconOpacity .
		state.styles[ talknIndex ].icon.opacity = iconOpacity;

		// LineColor .
		state.styles[ talknIndex ].index.index.boxShadow = "-1px 1px 0px 0px " + lineColor + " inset";
		state.styles[ talknIndex ].index.guideWrap.borderBottom = "1px solid " + lineColor;
		state.styles[ talknIndex ].index.textarea.border = "1px solid " + lineColor;
		state.styles[ talknIndex ].indexPost.indexPost.borderBottom = "1px solid " + lineColor;
		state.styles[ talknIndex ].detail.social.li.borderBottom = "1px solid " + lineColor;

		state.styles[ talknIndex ].detail.apiWrapBack.borderBottom = "1px solid " + lineColor;
		state.styles[ talknIndex ].detail.apiWrapNext.borderBottom = "1px solid " + lineColor;
		state.styles[ talknIndex ].detail.apiLi.borderBottom = "1px solid " + lineColor;
		state.styles[ talknIndex ].detail.apiAboxFocus.borderTop = "1px solid " + lineColor;
		state.styles[ talknIndex ].detail.apiAboxFocus.borderLeft = "1px solid " + lineColor;
		state.styles[ talknIndex ].detail.apiAboxFocus.borderRight = "1px solid " + lineColor;

		state.styles[ talknIndex ].detail.olConnection.borderTop = "1px solid " + lineColor;
		state.styles[ talknIndex ].detail.olConnection.borderBottom = "1px solid " + lineColor;
		state.styles[ talknIndex ].detail.li.borderBottom = "1px solid " + lineColor;
		state.styles[ talknIndex ].detail.apiCase.borderBottom = "1px solid " + lineColor;

		state.styles[ talknIndex ].index.textarea.color = fontColor;
		state.styles[ talknIndex ].detail.meta.inputThreadTitle.border = "1px solid " + fontColor;
		state.styles[ talknIndex ].detail.meta.inputThreadDesc.border = "1px solid " + fontColor;
		state.styles[ talknIndex ].detail.meta.submit.border = "1px solid " + fontColor;
		state.styles[ talknIndex ].detail.meta.submit.color = fontColor;
		state.styles[ talknIndex ].footer.textarea.color = fontColor;

		state.styles[ talknIndex ].detail.switchMap.border = "1px solid " + lineColor;
		state.styles[ talknIndex ].detail.switch.border = "1px solid " + lineColor;
		state.styles[ talknIndex ].setting.ol.border = "1px solid " + lineColor;
		state.styles[ talknIndex ].setting.ol.switch = "1px solid " + lineColor;
		state.styles[ talknIndex ].setting.ol.switchMap = "1px solid " + lineColor;
		state.styles[ talknIndex ].setting.li.borderBottom = "1px solid " + lineColor;
		state.styles[ talknIndex ].setting.space.boxShadow = "1px 0px 0px 0px " + lineColor + " inset, -1px 0px 0px 0px " + lineColor + " inset";
		state.styles[ talknIndex ].settingSwitch.settingSwitch0.border = "1px solid " + lineColor;
		state.styles[ talknIndex ].settingSwitch.settingSwitch1.border = "1px solid " + lineColor;
		state.styles[ talknIndex ].settingSwitch.switch0.border = "1px solid " + lineColor;
		state.styles[ talknIndex ].settingSwitch.switch1.border = "1px solid " + lineColor;
		state.styles[ talknIndex ].settingBar.settingBar.border = "1px solid " + lineColor;
		state.styles[ talknIndex ].settingBar.bar.border = "1px solid " + lineColor;
		state.styles[ talknIndex ].footer.footer.boxShadow = "0px 1px 0px 0px " + lineColor + " inset";
		state.styles[ talknIndex ].footer.textarea.border = "1px solid " + lineColor;
		state.styles[ talknIndex ].main.main.border = "1px solid " + lineColor;
		state.styles[ talknIndex ].indexNotif.indexNotif.borderBottom = "1px solid " + lineColor;
		state.styles[ talknIndex ].indexNotif.indexNotif.boxShadow = "0px 0px 0px 1px " + lineColor + " inset";

		// isOpen
		if( parseInt( state.styles[ talknIndex ].container.container.height ) !== parseInt( define.style.displayAreaHeight ) ){
			state.styles[ talknIndex ].header.header.boxShadow = "0px 0px 0px 1px " + lineColor;
		}

		if( state.actionLog[ 0 ] === "CONNECT" ){

			/************************/
			/* SETTING BAR POSITION	*/
			/************************/

			state.styles[ talknIndex ].settingBar.translateXs.drawBgColorR = Math.floor( drawBgColor1Obj.R / define.style.settingBarMug );
			state.styles[ talknIndex ].settingBar.translateXs.drawBgColorG = Math.floor( drawBgColor1Obj.G / define.style.settingBarMug );
			state.styles[ talknIndex ].settingBar.translateXs.drawBgColorB = Math.floor( drawBgColor1Obj.B / define.style.settingBarMug );
		}
	}

	return Object.assign( {}, props, state, addObj );
}

export default connect(
	mapStateToProps,
	null
)( root )
