//import merge from 'lodash/merge'
import ReactDOM from 'react-dom'
import $ from 'jquery'
import func from '../util/func'
import define from '../util/define'
import styles from '../components/styles'

let state = {};
let _state = {};
let containerTransform = 0;
let $roots = "";
let $talkn = "";
let $root = "";
let $container = "";
let $resizeKnob = "";
let $main = "";
let $index = "";
let $thread = "";
let $detail = "";
let $setting = "";
let screenX = 0;
let screenY = 0;
let movedX = 0;
let direction = 0;
let updateOpenPage = "";
let hoseiMovedLeft = 0;
let indexMovedZIndex = 1;
let threadMovedZIndex = 1;
let detailMovedZIndex = 1;
let indexMovedLeft = 0;
let threadMovedLeft = 0;
let detailMovedLeft = 0;
let focusConnection = [];

let htmlCss = {};
let bodyCss = {};

export default ( state = {

}, action ) => {

        switch ( action.type ) {
	case 'INIT_ACTION':

		_state[ action.talknIndex ] = action.styles;
		return $.extend( true, state, _state );
        case "SET_TALKN_INDEX":

                if( typeof action.talknIndex === "undefined" ){
			return state;
                }else{

			$talkn = $( "#talkn" + action.talknIndex );
			$container = $( "#talkn" + action.talknIndex + " container" );
			$main = $( "#talkn" + action.talknIndex + " main" );
			$index = $( "#talkn" + action.talknIndex + " main .index" );
			$thread = $( "#talkn" + action.talknIndex + " main .thread" );
			$detail = $( "#talkn" + action.talknIndex + " main .detail" );
			$setting = $( "#talkn" + action.talknIndex + " .setting" );

			_state = state[ action.talknIndex ];
			_state.root.root.zIndex = define.style.focusZIndex;
			_state.container.container.left = ( $container.css( "left" ) === "auto" )? $container.offset().left : $container.css( "left" );
			_state.container.container.right = $container.css( "right" );
			_state.container.container.transform = $container.css( "transform" );

			if( _state.root.option.widthUnit === "%" ){
				_state.container.container.width = Math.ceil( ( parseInt( $container.width() ) / parseInt( window.innerWidth ) ) * 100 );
				_state.container.container.width = ( _state.container.container.width > 100 )? "100%" : _state.container.container.width + "%";
				_state.container.container.maxWidth = _state.container.container.width;

			}else{
				_state.container.container.width = $container.width();
			}

			if( func.isOpen( $container ) ){
				_state.container.container.height = $container.css( "max-height" );
			}else{
				_state.container.container.height = $container.css( "min-height" );
			}

			_state.container.container.minWidth = $container.css( "min-width" );
			_state.container.container.minHeight = $container.css( "min-height" );
			_state.main.main.transform = $main.css( "transform" );
			_state.index.index.transform = $index.css( "transform" );
			_state.thread.thread.transform = $thread.css( "transform" );
			_state.detail.detail.transform = $detail.css( "transform" );

			return func.getMergeState( state, _state, action );
		}

                break;
	case 'FOCUS_TALKN':

		let apiKeys = __talknAPI__.map( function( obj ){ return obj.talknIndex });
		let apiLen = apiKeys.length;
		_state = state[ action.talknIndex ];

		for( let i = 0; i <= apiLen; i++ ){
			let apiKey = apiKeys[ i ];

			if( parseInt( apiKey ) === parseInt( action.talknIndex ) ){
				$( "#talkn" + apiKey + " root" ).css( {"z-index": define.style.focusZIndex } );
			}else{
				$( "#talkn" + apiKey + " root" ).css( {"z-index": define.style.unfocusZIndex } );
			}
		}
		return func.getMergeState( state, _state, action );
	case 'TOGGLE_DISPLAY_AREA':

		containerTransform = $container.css('transform');

		_state = state[ action.talknIndex ];
		_state.container.startMoveKnobTop = func.getMatrixY( containerTransform );
		_state.container.startMoveKnobLeft = func.getMatrixX( containerTransform );

		if( _state.root.option.widthUnit === "%" ){
			_state.container.container.width = Math.ceil( ( parseInt( $container.width() ) / parseInt( window.innerWidth ) ) * 100 );
			_state.container.container.width = ( _state.container.container.width > 100 )? "100%" : _state.container.container.width + "%";
			_state.container.container.maxWidth = _state.container.container.width;

		}else{
			_state.container.container.width = $container.width();
		}

		_state.container.container.overflow = "hidden";
		_state.indexNotif.indexNotif.display = "none";
		_state.container.container.maxHeight = $container.css( "max-height" );
		_state.container.container.transform = "translate3d( " + _state.container.startMoveKnobLeft  + "px, " + _state.container.startMoveKnobTop + "px, 1px )";
		_state.container.container.transition = define.style.transition;
		_state.main.main.transition = "0ms";

		// To Close .
		if( func.isOpen( $container ) ){

			_state.header.connection.lineHeight = "18px";
			_state.header.header.boxShadow = "none";
			_state.header.header.background = "none";
			_state.header.openSetting.background = "none";
			_state.header.watchCnt.display = "none";
			_state.notif.notif.display = "block";
			_state.container.container.height = $container.css( "min-height" );
			_state.slide.slide.height = "calc( 100% - 61px )" ;
			_state.setting.setting.display = "none";

			if( _state.root.option.appType === "script" ){
				if( _state.container.container.maxHeight === "100%" && _state.container.container.width === "100%" ){
					$( "html" ).css( htmlCss );
					$( "body" ).css( bodyCss );
				}
			}

		// To Open .
		}else{

			_state.header.connection.lineHeight = "33px";
			_state.header.header.background = define.style.bgColor;
			_state.header.header.boxShadow = "0px 0px 0px 1px " + define.style.lineColor;
			_state.header.openSetting.background = define.style.settingBg;
			_state.header.watchCnt.display = "block";
			_state.notif.notif.display = "none";
			_state.container.container.height = $container.css( "max-height" );
			_state.main.main.overflow = "hidden";
			_state.slide.slide.height = "calc( 100% - 51px )";
			_state.setting.setting.display = "block";

			if( _state.root.option.appType === "script" ){

				if( _state.container.container.maxHeight === "100%" && _state.container.container.width === "100%" ){

					htmlCss.overflow = $( "html" ).css( "overflow" );
					bodyCss.overflow = $( "body" ).css( "overflow" );

					if( define.isTouch ){
						htmlCss.height = $( "html" ).css( "height" );
						bodyCss.height = $( "body" ).css( "height" );
						$( "html" ).css( {"overflow": "hidden", "height": "0%"} );
			 			$( "body" ).css( {"overflow": "hidden", "height": "0%"} );
					}else{
						$( "html" ).css( {"overflow": "hidden"} );
			 			$( "body" ).css( {"overflow": "hidden"} );
					}

				}
			}
		}

		return func.getMergeState( state, _state, action );

	case "START_RESIZE_TALKN":

		/****************/
		/* MODE		*/
		/****************/

		_state = state[ action.talknIndex ];
		_state.resizeKnob.resizeFlg = true;

		/****************/
		/* SELECTOR	*/
		/****************/

		$resizeKnob = $( "#talkn" + action.talknIndex + " resizeKnob" );

                /****************/
                /* ROOT         */
                /****************/

                _state.root.root.width = "100vw";
                _state.root.root.height = "100vh";

                /****************/
                /* RESIZE_KNOB  */
                /****************/

                _state.resizeKnob.resizeKnob.width = "500px"
                _state.resizeKnob.resizeKnob.height = "500px";
                _state.resizeKnob.resizeKnob.zIndex = "10";

                /****************/
                /* MAIN		*/
                /****************/

		_state.main.main.transition = "0ms";

                /****************/
                /* TOUCH DATA	*/
                /****************/

		screenX = ( define.isTouch )? action.ev.changedTouches[0]['screenX'] : action.ev.screenX ;
		screenY = ( define.isTouch )? action.ev.changedTouches[0]['screenY'] : action.ev.screenY ;

                _state.container.startMoveWidth = _state.container.container.width;
                _state.container.startMoveHeight = _state.container.container.height;
                _state.container.startMoveScreenX = screenX;
                _state.container.startMoveScreenY = screenY;
                _state.container.startMoveTop = func.getMatrixY( _state.container.container.transform );
                _state.container.startMoveLeft = func.getMatrixX( _state.container.container.transform );

                _state.index.index.transition = "0ms";
                _state.index.startMoveLeft = func.getMatrixX( _state.index.index.transform );
                _state.index.startMoveTop = func.getMatrixY( _state.index.index.transform );

		_state.detail.detail.transition = "0ms";
                _state.detail.startMoveLeft = func.getMatrixX( _state.detail.detail.transform );
                _state.detail.startMoveTop = func.getMatrixY( _state.detail.detail.transform );

                if( parseInt( $container.css( "height" ) ) === parseInt( define.style.displayAreaHeight ) ){
			_state.resizeKnob.subMode = "fixHeightResize";
                }else{
			_state.resizeKnob.subMode = "";
                }

		return func.getMergeState( state, _state, action.talknIndex );

	case "STICK_RESIZE_TALKN":

		_state = state[ action.talknIndex ];

		if( _state.resizeKnob.resizeFlg ){

			screenX = ( define.isTouch )? action.ev.changedTouches[0]['screenX'] : action.ev.screenX ;
			screenY = ( define.isTouch )? action.ev.changedTouches[0]['screenY'] : action.ev.screenY ;

			_state.container.container.transition = "0ms";
			let movedLeft = ( screenX - _state.container.startMoveScreenX );
			let movedTop = ( screenY - _state.container.startMoveScreenY );
			let translateY = _state.container.startMoveTop;
			let translateX = _state.container.startMoveLeft;
			let containerWidth = 0;
			let containerMaxWidth = 0;
			let containerHeight = 0;//parseInt( _state.container.startMoveHeight ) + -( parseInt( movedTop ) ) + "px";
			let containerMaxHeight = 0;//parseInt( _state.container.startMoveHeight ) + -( parseInt( movedTop ) ) + "px";

			let headerHeight = $( "#talkn" + action.talknIndex + " header" ).outerHeight();
			let mainHeight = $main.height();
			let footerHeight = $( "#talkn" + action.talknIndex + " footer" ).outerHeight();
			let settingHeight = mainHeight - ( headerHeight + footerHeight );

			if( _state.root.option.widthUnit === "%" ){
				containerWidth = Math.ceil( window.innerWidth * ( parseInt( _state.container.startMoveWidth ) / 100  ) ) + parseInt( movedLeft ) + "px";
				containerMaxWidth = containerWidth;
			}else{
				containerWidth = parseInt( _state.container.startMoveWidth ) + parseInt( movedLeft ) + "px";
				containerMaxWidth = parseInt( _state.container.startMoveWidth ) + parseInt( movedLeft ) + "px";
			}

			if( _state.root.option.heightUnit === "%" ){
				containerHeight = Math.ceil( window.innerHeight * ( parseInt( _state.container.startMoveHeight ) / 100  ) ) - parseInt( movedTop ) + "px";
			}else{
				containerHeight = parseInt( _state.container.startMoveHeight ) - parseInt( movedTop ) + "px";
			}

			if( _state.resizeKnob.subMode !== "fixHeightResize" ){

				if( parseInt( styles.container.container.minHeight ) < parseInt( containerHeight ) ){
					_state.container.container.height = containerHeight;
					_state.container.container.maxHeight = containerHeight;
				}
			}

			_state.container.container.height = containerHeight;
			_state.container.container.maxHeight = containerHeight;
			_state.setting.setting.height = settingHeight;
			_state.setting.setting.transition = "0ms";

			if( parseInt( styles.container.container.minWidth ) > parseInt( containerWidth ) ){
				translateX = _state.container.startMoveLeft;
			}else{

				translateX = _state.container.startMoveLeft;
				_state.container.container.width = containerWidth;
				_state.container.container.maxWidth = containerWidth;
				_state.container.beforeMovedTop = movedTop;
				_state.container.beforeMovedLeft = movedLeft;
				_state = getModePageState( _state, _state.slide.openPage );
			}
			_state.container.container.transform = "translate3d( " + translateX  + "px, " + translateY + "px, 1px )";
		}

		return func.getMergeState( state, _state, action.talknIndex );

	case "END_RESIZE_TALKN":

		let headerHeight = $( "#talkn" + action.talknIndex + " header" ).outerHeight();
		let mainHeight = $main.height();
		let footerHeight = $( "#talkn" + action.talknIndex + " footer" ).outerHeight();
		let settingHeight = mainHeight - ( headerHeight + footerHeight );

		screenX = ( define.isTouch )? action.ev.changedTouches[0]['screenX'] : action.ev.screenX ;
		screenY = ( define.isTouch )? action.ev.changedTouches[0]['screenY'] : action.ev.screenY ;

		_state = state[ action.talknIndex ];
		_state.resizeKnob.resizeFlg = false;
		_state.root.root.width = "0vw";
		_state.root.root.height = "0vh";
		_state.resizeKnob.resizeKnob.width = "15px";
		_state.resizeKnob.resizeKnob.height = "15px";
		_state.resizeKnob.resizeKnob.zIndex = "10";
		_state.container.container.transition = "0ms";
		_state.container.startScreenY = screenY;
		_state.container.startScreenX = screenX;
		_state.slide.stickSlideMoveCnt = 0;

		if( func.isOpen( $container ) ){

			_state.setting.setting.height = settingHeight;

			if( _state.root.option.heightUnit === "%" ){
				_state.container.container.height = func.getHeightPxToPer( _state.container.container.height, false );
				_state.container.container.maxHeight = _state.container.container.height;
			}

			if( _state.root.option.widthUnit === "%" ){
				_state.container.container.width = func.getWidthPxToPer( _state.container.container.width, false );
				_state.container.container.maxWidth = _state.container.container.width;
			}
		}

		return func.getMergeState( state, _state, action.talknIndex );

	case "MOUSEDOWN_TALKN_BTN":

		/****************/
		/* MODE		*/
		/****************/

		_state = state[ action.talknIndex ];
		_state.talknBtn.mousedownFlg = true;
		_state.talknBtn.mousedownAction = "toggleFooterArea";

		/****************/
		/* SELECTOR	*/
		/****************/

		$resizeKnob = $( "#talkn" + action.talknIndex + " resizeKnob" );

                /****************/
                /* TALKN        */
                /****************/

                _state.root.root.width = "100vw";
                _state.root.root.height = "100vh";

                /****************/
                /* CONTAINER    */
                /****************/

		_state.container.container.transition = "0ms";
                _state.container.container.transform = $container.css('transform');
		_state.container.container.width = $container.css( 'width' );
		_state.container.container.height = $container.css( 'height' );
                _state.container.container.maxWidth = $container.css( 'max-width' );
                _state.container.container.maxHeight = $container.css( 'max-height' );

		_state.index.index.transition = define.style.transition;
		_state.detail.detail.transition = define.style.transition;

                /****************/
                /* MAIN		*/
                /****************/

		_state.main.main.transition = "0ms";
		_state.main.main.transform = $main.css( "transform" );

                /****************/
                /* TOUCH DATA	*/
                /****************/

		screenX = ( define.isTouch )? action.ev.changedTouches[0]['screenX'] : action.ev.screenX ;
		screenY = ( define.isTouch )? action.ev.changedTouches[0]['screenY'] : action.ev.screenY ;
                _state.container.startMoveWidth = _state.container.container.width;
                _state.container.startMoveHeight = _state.container.container.height;
                _state.container.startMoveScreenX = screenX;
                _state.container.startMoveScreenY = screenY;
                _state.container.startMoveTop = func.getMatrixY( _state.container.container.transform );
                _state.container.startMoveLeft = func.getMatrixX( _state.container.container.transform );

		return func.getMergeState( state, _state, action );

	case "STICK_MOVE_TALKN":

		_state = state[ action.talknIndex ];
		_state.talknBtn.mousedownAction = "endMoveTalkn";

		if( _state.talknBtn.mousedownFlg ){

			screenX = ( define.isTouch )? action.ev.changedTouches[0]['screenX'] : action.ev.screenX ;
			screenY = ( define.isTouch )? action.ev.changedTouches[0]['screenY'] : action.ev.screenY ;
			let movedLeft = _state.container.startMoveLeft + ( screenX - _state.container.startMoveScreenX );
			let movedTop = _state.container.startMoveTop + ( screenY - _state.container.startMoveScreenY );

			_state.talknBtn.mousedownFlg = true;
			_state.container.container.transition = "0ms";
			_state.container.container.transform = "translate3d( " + movedLeft  + "px, " + movedTop + "px, 1px )";
			_state.container.beforeMovedTop = movedTop;
			_state.container.beforeMovedLeft = movedLeft;
		}

		return func.getMergeState( state, _state, action.talknIndex );

	case "END_MOVE_TALKN":

		screenX = ( define.isTouch )? action.ev.changedTouches[0]['screenX'] : action.ev.screenX ;
		screenY = ( define.isTouch )? action.ev.changedTouches[0]['screenY'] : action.ev.screenY ;
		_state = state[ action.talknIndex ];
		_state.talknBtn.mousedownFlg = false;
		_state.container.container.transition = "0ms";
		_state.container.startMoveScreenY = screenY;
		_state.container.startMoveScreenX = screenX;
		_state.root.root.width = "0vw";
		_state.root.root.height = "0vh";

		return func.getMergeState( state, _state, action.talknIndex );

	case "TOGGLE_SETTING_AREA":
		_state = state[ action.talknIndex ];

		if( func.isOpen( $container ) ){

			_state.setting.setting.transform = $setting.css( "transform" );
               		let translateY = func.getMatrixY( _state.setting.setting.transform );

			_state.setting.setting.transition = define.style.transition;

			if( translateY === 0 ){
				let headerHeight = $( "#talkn" + action.talknIndex + " header" ).outerHeight();
				_state.setting.setting.transform = "translate3d( 0%, calc( -100% - " + headerHeight + "px ), 1px )";

			}else{
				_state.setting.setting.transform = "translate3d( 0%, 0%, 1px )";
				_state = getModePageState( _state , _state.slide.openPage );
			}
		}

		return func.getMergeState( state, _state, action.talknIndex );
	case "END_SETTING_AREA":
		_state = state[ action.talknIndex ];
		_state.setting.setting.transition = "0ms";

		return func.getMergeState( state, _state, action.talknIndex );
	case "TOGGLE_FOOTER_AREA":

		_state = state[ action.talknIndex ];
		_state.talknBtn.mousedownFlg = false;

		let transform = $main.css( "transform" ) ;
               	let translateY = func.getMatrixY( transform );
		_state.root.root.height = "0vh"
		_state.root.root.width = "0vw"
		_state.main.main.transition = define.style.transition;
		_state.container.container.overflow = "hidden";

		// To Close .
		if( parseInt( translateY ) === 0 && parseInt( $main.outerHeight() ) === parseInt( define.style.displayAreaHeight ) ){
			_state.notif.notif.display = "none";
			_state.main.main.transform = "translate3d( 0px, " +  define.style.hideFooterHeight + ", 1px )";

		// To Open .
		}else{
			_state.notif.notif.display = "block";
			_state.main.main.transform = "translate3d( 0px, 0px, 1px )";
		}
		return func.getMergeState( state, _state, action );
	case "START_THREAD_MOVE":

		_state = state[ action.talknIndex ];

		if( _state.root.option.mode !== "screen3" ){

			/****************/
			/* SELECTOR	*/
			/****************/

			_state.index.index.transition = "0ms";
			_state.index.index.transform = $index.css('transform');
			_state.index.startMoveLeft = func.getMatrixX( _state.index.index.transform );

			_state.thread.thread.transition = "0ms";
	                _state.thread.thread.transform = $thread.css('transform');
			_state.thread.startMoveLeft = func.getMatrixX( _state.thread.thread.transform );

			_state.detail.detail.transition = "0ms";
        	        _state.detail.detail.transform = $detail.css('transform');
			_state.detail.startMoveLeft = func.getMatrixX( _state.detail.detail.transform );

			/****************/
			/* SLIDE	*/
			/****************/

			screenX = ( define.isTouch )? action.ev.changedTouches[0]['screenX'] : action.ev.screenX ;
			screenY = ( define.isTouch )? action.ev.changedTouches[0]['screenY'] : action.ev.screenY ;

			_state.slide.stickFlg = true;
			_state.slide.stickSlideMoveCnt = 0;
			_state.slide.startMoveScreenX = screenX;
			_state.slide.startMoveScreenY = screenY;
			_state.slide.startMoveTop = func.getMatrixY( _state.thread.thread.transform );
		}
		return func.getMergeState( state, _state, action );
	case "STICK_THREAD_MOVE":

		_state = state[ action.talknIndex ];

		screenX = ( define.isTouch )? action.ev.changedTouches[0]['screenX'] : action.ev.screenX ;
		screenY = ( define.isTouch )? action.ev.changedTouches[0]['screenY'] : action.ev.screenY ;
		let movedX = _state.slide.startMoveScreenX - screenX;
		let direction = ( movedX > 0 )? 'Left' : 'Right' ;

		_state.slide.stickSlideMoveCnt++;

		if( _state.slide.stickFlg ){

			let threadOpacity = 1;
			indexMovedLeft = _state.index.startMoveLeft;
			threadMovedLeft = _state.thread.startMoveLeft;
			detailMovedLeft = _state.detail.startMoveLeft;
			_state.index.index.transition = "0ms";
			_state.thread.thread.transition = "0ms";
			_state.detail.detail.transition = "0ms";

			switch( _state.slide.openPage ){
			case "Index":
				indexMovedZIndex = 10;
				threadMovedZIndex = 1;
				detailMovedZIndex = 1;
				break;
			case "Thread":
				indexMovedZIndex = 10;
				threadMovedZIndex = 1;
				detailMovedZIndex = 10;
				break;
			case "Detail":
				indexMovedZIndex = 1;
				threadMovedZIndex = 1;
				detailMovedZIndex = 10;
				break;
			}

			// Before move( Vertical safe scroll range ).
			if( _state.slide.stickSlideMoveCnt <= _state.slide.stickSlideActiveCnt ){

				_state.index.index.transform = "translate3d( " + indexMovedLeft  + "px, 0px, " + indexMovedZIndex + "px )";
				_state.thread.thread.transform = "translate3d( " + threadMovedLeft  + "px, 0px, " + threadMovedZIndex + "px )";
				_state.detail.detail.transform = "translate3d( " + detailMovedLeft  + "px, 0px, " + detailMovedZIndex + "px )";
				_state.slide.stickFlg = true;
			}else{

				switch( _state.slide.openPage ){
				case "Index":
					indexMovedLeft = parseInt( _state.index.startMoveLeft ) - ( _state.slide.startMoveScreenX - screenX );
					if( indexMovedLeft > $thread.width() ){
						indexMovedLeft = parseInt( $thread.width() );
					}
					if( direction === "Left" ){
						threadMovedLeft = parseInt( indexMovedLeft ) / parseInt( define.style.changePageMug );
						threadOpacity = Math.ceil( ( 1 - ( indexMovedLeft / $thread.width() ) ) * 100 ) / 100;
					}
					break;
				case "Thread":

					if( direction === "Right" ){
						if( _state.root.option.mode === "screen1" ){
							threadMovedLeft = _state.thread.startMoveLeft + ( screenX - _state.slide.startMoveScreenX );
							indexMovedLeft = ( parseInt( threadMovedLeft ) * parseInt( define.style.changePageMug ) ) - _state.slide.stickSlideActiveCnt;
						}
						threadOpacity = Math.ceil( ( 1 - ( indexMovedLeft / $thread.width() ) ) * 100 ) / 100;
					}
					if( direction === "Left" ){
						threadMovedLeft = parseInt( _state.thread.startMoveLeft ) + parseInt( screenX - _state.slide.startMoveScreenX );
						detailMovedLeft = parseInt( threadMovedLeft ) * parseInt( define.style.changePageMug ) + _state.slide.stickSlideActiveCnt;
						threadOpacity = Math.ceil( ( 1 - ( -( ( detailMovedLeft / $thread.width() ) ) ) ) * 100 ) / 100;
					}
					break;
				case "Detail":
					detailMovedLeft = parseInt( _state.detail.startMoveLeft ) + -( _state.slide.startMoveScreenX - screenX );
					if( -( detailMovedLeft ) > $thread.width() ) detailMovedLeft = parseInt( -( $thread.width() ) );
					if( direction === "Right" ){
						threadMovedLeft = parseInt( detailMovedLeft ) / parseInt( define.style.changePageMug );
						threadOpacity = Math.ceil( ( 1 - ( -( ( detailMovedLeft / $thread.width() ) ) ) ) * 100 ) / 100;
					}
					break;

				}

				// Thread Opacity Rate .
				_state.thread.thread.opacity = threadOpacity;

				// Translate .
				if( indexMovedLeft !== 0 ) _state.index.index.transform = "translate3d( " + indexMovedLeft  + "px, 0px, " + indexMovedZIndex + "px )";
				if( threadMovedLeft !== 0 ) _state.thread.thread.transform = "translate3d( " + threadMovedLeft  + "px, 0px, " + threadMovedZIndex + "px )";
				if( detailMovedLeft !== 0 ) _state.detail.detail.transform = "translate3d( " + detailMovedLeft  + "px, 0px, " + detailMovedZIndex + "px )";
			}
		}

		return func.getMergeState( state, _state, action );
	case "END_THREAD_MOVE":

		_state = state[ action.talknIndex ];

		if( _state.slide.stickFlg ){

			_state.slide.stickFlg = false;
			screenX = ( define.isTouch )? action.ev.changedTouches[0]['screenX'] : action.ev.screenX ;
			screenY = ( define.isTouch )? action.ev.changedTouches[0]['screenY'] : action.ev.screenY ;
			movedX = _state.slide.startMoveScreenX - screenX;
			direction = ( movedX > 0 )? 'Left' : 'Right' ;
			let movedThreadX = ( direction === "Left" )? movedX: -( movedX );
			let changePagePx = 60;
			let changePageFlg = ( changePagePx <= movedThreadX )? true : false ;
			let gridFlg = false;

			//_state.slide.stickSlideMoveCnt = 0;
			_state.index.index.transition = define.style.transition;
			_state.thread.thread.transition = define.style.transition;
			_state.detail.detail.transition = define.style.transition;

			if( changePageFlg ){
				switch( _state.slide.openPage ){
				case "Index":
					if( direction === "Left" ){
						_state = getModePageState( _state, "Thread" );
					}else{
						gridFlg = true;
					}
					break;
				case "Thread":
					if( direction === "Right" ){
						_state = getModePageState( _state, "Index" );
					}

					if( direction === "Left" ){
						_state = getModePageState( _state, "Detail" );
					}
					break;
				case "Detail":
					if( direction === "Right" ){
						_state = getModePageState( _state, "Thread" );
					}else{
						gridFlg = true;
					}
					break;
				}
			}else{
				gridFlg = true;
			}

			if( gridFlg ){
				_state = getModePageState( _state, _state.slide.openPage );
			}
		}
		return func.getMergeState( state, _state, action.talknIndex );
	case "SLIDE_LEFT":
		_state = state[ action.talknIndex ];
		switch( _state.slide.openPage ){
		case "Thread":
			_state = getModePageState( _state, "Index" );
			break;
		case "Detail":
			_state = getModePageState( _state, "Thread" );
			break;
		}
		return func.getMergeState( state, _state, action.talknIndex );
		break;
	case "SLIDE_CENTER":
		_state = state[ action.talknIndex ];
		_state = getModePageState( _state, "Thread" );
		return func.getMergeState( state, _state, action.talknIndex );
		break;
	case "SLIDE_RIGHT":
		_state = state[ action.talknIndex ];
		switch( _state.slide.openPage ){
		case "Index":
			_state = getModePageState( _state, "Thread" );
			break;
		case "Thread":
			_state = getModePageState( _state, "Detail" );
			break;
		}
		return func.getMergeState( state, _state, action.talknIndex );
		break;
	case "CHANGE_MODE":
		_state = state[ action.talknIndex ];
		_state = getModePageState( _state, _state.slide.openPage );
		_state.slide.stickSlideMoveCnt = 0;
		return func.getMergeState( state, _state, action.talknIndex );
		break;
	case "CHANGE_THREAD":

		_state = state[ action.talknIndex ];
		_state.root.option.connection = action.connection;
		_state.root.option.title = action.title;
		_state.root.option.thum = action.thum;
//		_state.root.option.desc = action.desc;

		_state.root.updateCallback[ action.type ][ "slideCenter" ] = action.slideCenter;
		focusConnection[ action.talknIndex ] = action.connection;
		return func.getMergeState( state, _state, action.talknIndex );
		break;
	case "END_TRANSITION_THREAD":
		_state = state[ action.talknIndex ];

		switch( _state.root.option.mode ){
		case "screen1":

			switch( _state.slide.openPage ){
			case "Index":
				_state.index.index.transform = "translate3d( 100%, 0px, 10px )";
				_state.thread.thread.transform = "translate3d( 50%, 0px, 1px )";
				_state.detail.detail.transform = "translate3d( 0%, 0px, 1px )";
				break;
			case "Thread":
				_state.index.index.transform = "translate3d( 0%, 0px, 1px )";
				_state.thread.thread.transform = "translate3d( 0%, 0px, 10px )";
				_state.detail.detail.transform = "translate3d( 0%, 0px, 1px )";
				break;
			case "Detail":

				_state.index.index.transform = "translate3d( 0%, 0px, 1px )";
				_state.thread.thread.transform = "translate3d( -50%, 0px, 1px )";
				_state.detail.detail.transform = "translate3d( -100%, 0px, 10px )";
				break;
			}

			break;
		}
		return func.getMergeState( state, _state, action.talknIndex );
	case "FIND":

		// Set Local Page Data .
		_state = state[ action.talknIndex ];
		$talkn = $( "#talkn" + action.talknIndex );
		$talkn.attr( "data-connection", action.connection );
		$talkn.attr( "data-title", action.title );

		focusConnection[ action.talknIndex ] = action.connection;
		return func.getMergeState( state, _state, action.talknIndex );
		break;
	case "CATCH_RESPONSE":

		_state = state[ action.talknIndex ];
		_state.thread.scrollData = func.getThreadScrollData( action );
		_state.detail.connectionPointer = 0;
		_state.root.focusMetaFlg = true;

		// Focus Connecttion .
		if( focusConnection[ action.talknIndex ] === action.connection ){

			_state.root.uid = action.post.uid;

			let writeFocusMetaFlg = false;
			let isFocusThreadEqSiteFlg = func.isFocusThreadEqSite( action.talknIndex, action.connection );
			let isChangeConnectionFlg = ( action.connection === _state.root.focusMeta.connection )? false : true ;

			if( isFocusThreadEqSiteFlg === true && isChangeConnectionFlg === true ) writeFocusMetaFlg = true
			if( isFocusThreadEqSiteFlg === false && isChangeConnectionFlg === false ) writeFocusMetaFlg = true
			if( isFocusThreadEqSiteFlg === false && isChangeConnectionFlg === true ) writeFocusMetaFlg = true

			if( typeof( action.index ) !== "undefined" ){
				_state.root.focusIndexId = action.index._id;
			}

			if( writeFocusMetaFlg ){

				switch( action.called ){
				case "find":
				case "changeThread" :

					if( action.index && action.index.meta ){
						_state.root.focusMeta = Object.assign( {}, action.index.meta );
						_state.root.focusMeta.indexId = action.index._id;
					}
					break;
				case "savePost":

					//let wsParams = func.getWsParams( "index", action.talknIndex, action.connection );

					break;
				default:

				}
			}

			_state.thread.newPostAlert.transform = "translate3d( 0px, " + define.style.offNewPostAlertTop + "px, 1px )";
			_state.thread.threadHidden.display = "none";
			_state.root.updateCallback[ action.type ][ "getMoreScroll" ] = ( action.called === "getMore" )? true : false ;
		}

		return func.getMergeState( state, _state, action.talknIndex );
	case "CATCH_RESPONSE_ACTION":
		_state = state[ action.talknIndex ];

		// If Open Display Area .
		if( func.isOpen( $container ) ){

			if( focusConnection[ action.talknIndex ] === _state.thread.scrollData.connection ){

				if( _state.root.updateCallback[ "CATCH_RESPONSE" ][ "getMoreScroll" ] ){
					_state.thread.threadHidden.display = "block";
				}

				// Case Scroll Bottom.
				if( _state.thread.scrollData.isBottom ){

					$( "#talkn" + action.talknIndex + " .threadPostBlocks" ).animate( {scrollTop: _state.thread.scrollData.threadHeight }, 600 );

				// Case Scroll Not Bottom.
				}else{


					if( _state.thread.scrollData.called === "savePost" ){

						if( _state.thread.scrollData.threadPostCnt !== 0 ){

							_state.thread.newPostAlert.transform = "translate3d( 0px, " + define.style.onNewPostAlertTop + "px, 1px )";
						}
					}
				}
			}

		// If Close Display Area .
		}else{

			let transform = $main.css( "transform" ) ;
               		let translateY = func.getMatrixY( transform );

			// If Open Footer Area .
			if( parseInt( translateY ) === 0 && parseInt( $main.outerHeight() ) === parseInt( define.style.displayAreaHeight ) ){

				_state.main.main.overflowX = "visible";
				_state.main.main.overflowY = "visible";
				_state.container.container.overflow = "visible";
				_state.indexNotif.indexNotif.display = "block";
			}
		}

		return func.getMergeState( state, _state, action.talknIndex );
	case "GET_MORE_SCROLL":
		_state = state[ action.talknIndex ];
		_state.thread.scrollData = func.getThreadScrollData( action );

		$( "#talkn" + action.talknIndex + " .threadPostBlocks" ).animate( {scrollTop: _state.thread.scrollData.threadHiddenHeight }, 0 );
		_state.root.updateCallback[ "CATCH_RESPONSE" ][ "getMoreScroll" ] = false;
		_state.thread.threadHidden.display = "none";
		return func.getMergeState( state, _state, action.talknIndex );
		break;
	case "CATCH_RESPONSE_API_META":
		_state = state[ action.talknIndex ];

		let writeFocusMetaFlg = false;
		let isFocusThreadEqSiteFlg = func.isFocusThreadEqSite( action.talknIndex, action.connection );
		let isChangeConnectionFlg = ( action.connection === _state.root.focusMeta.connection )? false : true ;

		_state.root.focusMetaFlg = false;

		return func.getMergeState( state, _state, action.talknIndex );
	case "SCROLL_THREAD":
		_state = state[ action.talknIndex ];
		_state.thread.newPostAlert.transform = "translate3d( 0px, " + define.style.offNewPostAlertTop + "px, 1px )";
		return func.getMergeState( state, _state, action.talknIndex );
	case "FOCUS_TEXTAREA":
		_state = state[ action.talknIndex ];
		_state.root.focusTextarea = action.called;
		return func.getMergeState( state, _state, action.talknIndex );
	case "END_NOTIF":
		_state = state[ action.talknIndex ];
		_state.main.main.overflowX = "hidden";
		_state.main.main.overflowY = "hidden";
		return func.getMergeState( state, _state, action.talknIndex );
	case "ON_SETTING_BTN":
		_state = state[ action.talknIndex ];
		return func.getMergeState( state, _state, action.talknIndex );
	case "TOGGLE_SETTING_SWITCH":
		_state = state[ action.talknIndex ];
		_state.root.setting[ action.switchType ] = ( _state.root.setting[ action.switchType ] )? false: true ;
		return func.getMergeState( state, _state, action.talknIndex );
	case "START_SETTING_BAR":
		_state = state[ action.talknIndex ];
		_state.settingBar.stickBarType = action.barType;
		_state.settingBar.startScreenX = ( define.isTouch )? action.ev.changedTouches[0]['screenX'] : action.ev.screenX ;
		_state.settingBar.startTranslateX = _state.settingBar.translateXs[ action.barType ];
		return func.getMergeState( state, _state, action.talknIndex );
	case "STICK_SETTING_BAR":

		_state = state[ action.talknIndex ];
		if( _state.settingBar.stickBarType === action.barType ){

			// Get Current TranslateX .
			let translateX = _state.settingBar.startTranslateX;
			screenX = ( define.isTouch )? action.ev.changedTouches[0]['screenX'] : action.ev.screenX ;
			let movedX = screenX - _state.settingBar.startScreenX;
			translateX = translateX + movedX;

			// Validate That Bottom & Upper Cap .
			translateX = ( translateX < 0 )? 0 : translateX ;
			translateX = ( translateX > define.style.settingBarLimit )? define.style.settingBarLimit : translateX ;

			// Set Bar Position .
			_state.settingBar.translateXs[ action.barType ] = translateX;

			// Effect Setting Colors .
			let drawBgColorR = Math.floor( _state.settingBar.translateXs.drawBgColorR * define.style.settingBarMug );
			let drawBgColorG = Math.floor( _state.settingBar.translateXs.drawBgColorG * define.style.settingBarMug );
			let drawBgColorB = Math.floor( _state.settingBar.translateXs.drawBgColorB * define.style.settingBarMug );
			_state.root.setting.drawBgColor1 = "rgba( " + drawBgColorR + ", " + drawBgColorG + ", " + drawBgColorB + ", " + define.style.drawBgColor1a + ")";

			let fontColorR = Math.floor( _state.settingBar.translateXs.fontColorR * define.style.settingBarMug );
			let fontColorG = Math.floor( _state.settingBar.translateXs.fontColorG * define.style.settingBarMug );
			let fontColorB = Math.floor( _state.settingBar.translateXs.fontColorB * define.style.settingBarMug );
			_state.root.setting.fontColor1 = "rgba( " + fontColorR + ", " + fontColorG + ", " + fontColorB + ", " + define.style.drawFontColor1a + ")";
		}

		//_state.settingBar.transform = trans;
		return func.getMergeState( state, _state, action.talknIndex );
	case "END_SETTING_BAR":
		_state = state[ action.talknIndex ];
		_state.settingBar.stickBarType = "";
		return func.getMergeState( state, _state, action.talknIndex );
	case 'END_TRANSITION_DISPLAY_AREA':
		_state = state[ action.talknIndex ];

		if( !func.isOpen( $container ) ){
			_state.main.main.overflow = "visible";
		}

		return func.getMergeState( state, _state, action.talknIndex );
	case 'TOGGLE_PRE_DELETE_INDEX':
		_state = state[ action.talknIndex ];

		if( _state.indexPost.ol.transform === "translateX( -65px )" ){
			_state.index.togglePreDeleteFlg = true;
			_state.indexPost.ol.transform = "translateX( 0px )";
		}else{
			_state.index.togglePreDeleteFlg = false;
			_state.indexPost.ol.transform = "translateX( -65px )";
		}
		return func.getMergeState( state, _state, action.talknIndex );
	case 'API_MENU_DIRECTION':
		_state = state[ action.talknIndex ];

		_state.detail.apiMenuBackOn = true;
		_state.detail.apiMenuNextOn = true;

		if( action.direction === "BACK" ){

			_state.detail.apiMenuPointer = parseInt( _state.detail.apiMenuPointer ) - 1;

			if( _state.detail.apiMenuPointer <= 0 ){
				_state.detail.apiMenuPointer = 0;
				_state.detail.apiMenuBackOn = false;
			}

		}else if( action.direction === "NEXT" ){

			let viewCap = ( define.apiMenu.length - define.apiMenuViewCnt ) ;
			_state.detail.apiMenuPointer = parseInt( _state.detail.apiMenuPointer ) + 1;

			if( _state.detail.apiMenuPointer >= viewCap ){

				_state.detail.apiMenuPointer = viewCap;
				_state.detail.apiMenuNextOn = false;
			}
		}

		return func.getMergeState( state, _state, action.talknIndex );
	case "SWITCH_DETAIL":
		_state = state[ action.talknIndex ];
		_state.detail.apiMenuExeKey = action.apiKey;
		return func.getMergeState( state, _state, action.talknIndex );
	case 'SWITCH_CONNECTION':
		_state = state[ action.talknIndex ];
		_state.detail.connectionPointer = parseInt( _state.detail.connectionPointer ) + 1
		_state.detail.connectionPointer = ( action.connectionLength <= _state.detail.connectionPointer )? 0 :_state.detail.connectionPointer ;
		return func.getMergeState( state, _state, action.talknIndex );

	case 'INIT_POSITION':

		_state = state[ action.talknIndex ];

		if( func.isOpen( $container ) ){
			_state.container.container.transition = define.style.transition;
			_state.container.container.maxHeight = _state.root.option.height;
			_state.container.container.width = _state.root.option.width;
			_state.container.container.transform = "translate3d( 0px, 0px, 1px )";
		}
		return func.getMergeState( state, _state, action.talknIndex );
        default:
                return state;
	}
};

function getModePageState( _state, openPage ){

	let talknIndex = _state.root.option.talknIndex;
	let beforePage = _state.slide.openPage;
	let unit = _state.root.option.widthUnit;
	let screenMode = func.getMode( _state.container.container.width );
	_state.root.option.mode = screenMode;
	_state.slide.openPage = openPage;


	// Slide Layout
	_state.slide.slide = Object.assign( {}, _state.slide.slide, _state.slide.mode[ unit ][ screenMode ] );
	_state.index.index = Object.assign( {}, _state.index.index, _state.index.mode[ unit ][ screenMode ] );
	_state.thread.thread = Object.assign( {}, _state.thread.thread, _state.thread.mode[ unit ][ screenMode ] );
	_state.detail.detail = Object.assign( {}, _state.detail.detail, _state.detail.mode[ unit ][ screenMode ] );
	_state.index.index.transition = define.style.transition;
	_state.thread.thread.transition = define.style.transition;
	_state.detail.detail.transition = define.style.transition;

	// Setting Layout
	//_state.setting.setting.transform = $setting.css( "transform" );
	let translateY = func.getMatrixY( _state.setting.setting.transform );

	if( translateY === 0 ){

		let headerHeight = $( "#talkn" + talknIndex + " header" ).outerHeight();
		let mainHeight = $main.height();
		let footerHeight = $( "#talkn" + talknIndex + " footer" ).outerHeight();
		let settingHeight = mainHeight - ( headerHeight + footerHeight );

		_state.setting.setting = Object.assign( {}, _state.setting.setting, _state.setting.mode[ unit ][ screenMode ] );
		_state.setting.setting.height = settingHeight;
	}

	switch( screenMode ){
	case "screen1":

		switch( openPage ){
		case "Index":
			_state.thread.thread.opacity = 0;
			_state.index.index.transform = "translate3d( 100%, 0px, " + indexMovedZIndex + "px )";
			_state.thread.thread.transform = "translate3d( 50%, 0px, " + threadMovedZIndex + "px )";
			_state.detail.detail.transform = "translate3d( 0%, 0px, " + detailMovedZIndex + "px )";
			break;
		case "Thread":
			_state.thread.thread.opacity = 1;
			_state.index.index.transform = "translate3d( 0%, 0px, " + indexMovedZIndex + "px )";
			_state.thread.thread.transform = "translate3d( 0%, 0px, " + threadMovedZIndex + "px )";
			_state.detail.detail.transform = "translate3d( 0%, 0px, " + detailMovedZIndex + "px )";
			break;
		case "Detail":
			_state.thread.thread.opacity = 0;
			_state.index.index.transform = "translate3d( 0%, 0px, " + indexMovedZIndex + "px )";
			_state.thread.thread.transform = "translate3d( -50%, 0px, " + threadMovedZIndex + "px )";
			_state.detail.detail.transform = "translate3d( -100%, 0px, " + detailMovedZIndex + "px )";
			break;
		}

		break;
	case "screen2":

		switch( openPage ){
		case "Index":
			_state.slide.openPage = "Thread";
			_state.thread.thread.opacity = 1;
			_state.index.index.transform = "translate3d( 0%, 0px, 1px )";
			_state.thread.thread.transform = "translate3d( 0%, 0px, 1px )";
			_state.detail.detail.transform = "translate3d( 0%, 0px, 1px )";
			break;
		case "Thread":
			_state.thread.thread.opacity = 1;
			_state.index.index.transform = "translate3d( 0%, 0px, 1px )";
			_state.thread.thread.transform = "translate3d( 0%, 0px, 1px )";
			_state.detail.detail.transform = "translate3d( 0%, 0px, 1px )";
			break;
		case "Detail":
			_state.thread.thread.opacity = 0;
			_state.index.index.transform = "translate3d( 0%, 0px, 1px )";
			_state.thread.thread.transform = "translate3d( -50%, 0px, 1px )";
			_state.detail.detail.transform = "translate3d( -100%, 0px, 1px )";
			break;
		}
		break;
	case "screen3":

		_state.slide.openPage = "Thread";
		_state.thread.thread.opacity = 1;
		_state.index.index.transform = "translate3d( 0%, 0px, 1px )";
		_state.thread.thread.transform = "translate3d( 0%, 0px, 1px )";
		_state.detail.detail.transform = "translate3d( 0%, 0px, 1px )";
		break;
	}

	return _state
}
