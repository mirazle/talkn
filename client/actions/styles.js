import { CONNECT } from '../middlewares/ws';
import define from '../util/define';

export function initAction( params ) {
	return {
		type: 'INIT_ACTION',
		talknIndex: params.talknIndex,
		styles: params.styles
	}
}

export function setTalknIndex( talknIndex ) {
	return {
		type: 'SET_TALKN_INDEX',
		talknIndex: talknIndex
	}
}

export function focusTalkn( talknIndex, ev ) {
	return {
		type: 'FOCUS_TALKN',
		talknIndex: talknIndex,
		ev: ev
	}
}

export function unfocusTalkn( talknIndex, ev ) {
	return {
		type: 'UNFOCUS_TALKN',
		talknIndex: talknIndex,
		ev: ev
	}
}

export function toggleDisplayArea( talknIndex, ev ) {
  return {
                type: 'TOGGLE_DISPLAY_AREA',
                talknIndex: talknIndex,
                ev: ev
        }
}

export function startResizeTalkn( talknIndex, ev ) {
        return {
                type: 'START_RESIZE_TALKN',
                talknIndex: talknIndex,
                ev:ev
        }
}

export function stickResizeTalkn( talknIndex, ev ) {
        return {
                type: 'STICK_RESIZE_TALKN',
                talknIndex: talknIndex,
                ev: ev
        }
}

export function endResizeTalkn( talknIndex, ev ) {
        return {
                type: 'END_RESIZE_TALKN',
                talknIndex: talknIndex,
                ev: ev
        }
}

export function mousedownTalknBtn( talknIndex, ev ) {
        return {
                type: 'MOUSEDOWN_TALKN_BTN',
                talknIndex: talknIndex,
                ev: ev
        }
}

export function startMoveTalkn( talknIndex, ev ) {
        return {
                type: 'START_MOVE_TALKN',
                talknIndex: talknIndex,
                ev:ev
        }
}

export function stickMoveTalkn( talknIndex, ev ) {
        return {
                type: 'STICK_MOVE_TALKN',
                talknIndex: talknIndex,
                ev: ev
        }
}

export function endMoveTalkn( talknIndex, ev ) {
        return {
                type: 'END_MOVE_TALKN',
                talknIndex: talknIndex,
                ev: ev
        }
}

export function toggleFooterArea( talknIndex, ev ) {
        return {
                type: 'TOGGLE_FOOTER_AREA',
                talknIndex: talknIndex,
                ev: ev
        }
}

export function startMoveKnob( screenX, screenY ) {
        return {
                type: 'START_MOVE_KNOB',
                screenX: screenX,
                screenY: screenY
        }
}

export function stickMoveKnob( screenX, screenY ) {
        return {
                type: 'STICK_MOVE_KNOB',
                screenX: screenX,
                screenY: screenY
        }
}

export function endMoveKnob( screenX, screenY ) {
        return {
                type: 'END_MOVE_KNOB',
                screenX: screenX,
                screenY: screenY
        }
}

export function startThreadMove( talknIndex, ev ) { 
	return {
		type: 'START_THREAD_MOVE',
                talknIndex: talknIndex,
		ev: ev
	}
}

export function stickThreadMove( talknIndex, ev ) { 
	return {
		type: 'STICK_THREAD_MOVE',
                talknIndex: talknIndex,
		ev: ev
	}
}

export function endThreadMove( talknIndex, ev ) { 
	return {
		type: 'END_THREAD_MOVE',
                talknIndex: talknIndex,
		ev: ev
	}
}

export function slideLeft( talknIndex, ev ) { 
	return {
		type: 'SLIDE_LEFT',
                talknIndex: talknIndex,
		ev: ev
	}
}

export function slideCenter( talknIndex, ev ) { 
	return {
		type: 'SLIDE_CENTER',
                talknIndex: talknIndex,
		ev: ev
	}
}

export function slideRight( talknIndex, ev ) { 
	return {
		type: 'SLIDE_RIGHT',
                talknIndex: talknIndex,
		ev: ev
	}
}

export function changeMode( talknIndex, mode ) { 
	return {
		type: 'CHANGE_MODE',
                talknIndex: talknIndex,
		mode: mode
	}
}

export function endTransitionThread( talknIndex ) { 
	return {
		type: 'END_TRANSITION_THREAD',
                talknIndex: talknIndex
	}
}

export function catchResponseAction( talknIndex, params ) {
	return {
		type: 'CATCH_RESPONSE_ACTION',
		talknIndex: talknIndex,
		connection: params.connection,
		threadHeight: params.threadHeight,
		threadScrollTop: params.threadScrollTop,
		threadScrollHeight: params.threadScrollHeight
	}
}

export function scrollThread( talknIndex ) { 
	return {
		type: 'SCROLL_THREAD',
                talknIndex: talknIndex
	}
}

export function focusTextarea( talknIndex, called ) { 
	return {
		type: 'FOCUS_TEXTAREA',
                talknIndex: talknIndex,
		called: called
	}
}

export function endNotif( talknIndex, params ) { 
	return {
		type: 'END_NOTIF',
                talknIndex: talknIndex,
		notifId: params.notifId,
		connection: params.connection
	}
}

export function toggleSettingArea( talknIndex, ev ) { 
	return {
		type: 'TOGGLE_SETTING_AREA',
                talknIndex: talknIndex,
		ev: ev
	}
}

export function endSettingArea( talknIndex, ev ) { 
	return {
		type: 'END_SETTING_AREA',
                talknIndex: talknIndex,
		ev: ev
	}
}

export function getMoreScroll( talknIndex, params ){
	return {
		type: 'GET_MORE_SCROLL',
		talknIndex: talknIndex
	}
}

export function initPosition( talknIndex, params ){
	return {
		type: 'INIT_POSITION',
		talknIndex: talknIndex
	}
}

/****************/
/* SETTING	*/
/****************/

export function onSettingBtn( talknIndex, params ) {
	return {
		type: 'ON_SETTING_BTN',
                talknIndex: talknIndex,
		btnType: params.type,
		ev: params.ev
	}
}

export function toggleSettingSwitch( talknIndex, params ) {
	return {
		type: 'TOGGLE_SETTING_SWITCH',
                talknIndex: talknIndex,
		switchType: params.switchType,
		ev: params.ev
	}
}

export function startSettingBar( talknIndex, params ) {
	return {
		type: 'START_SETTING_BAR',
                talknIndex: talknIndex,
		barType: params.barType,
		ev: params.ev
	}
}

export function stickSettingBar( talknIndex, params ) {
	return {
		type: 'STICK_SETTING_BAR',
                talknIndex: talknIndex,
		barType: params.barType,
		ev: params.ev
	}
}

export function endSettingBar( talknIndex, params ) {
	return {
		type: 'END_SETTING_BAR',
                talknIndex: talknIndex,
		barType: params.barType,
		ev: params.ev
	}
}

export function endTransitionDisplayArea( talknIndex ){
	return {
		type: 'END_TRANSITION_DISPLAY_AREA',
                talknIndex: talknIndex
	}
}

export function togglePreDeleteIndex( talknIndex ){
	return {
		type: 'TOGGLE_PRE_DELETE_INDEX',
                talknIndex: talknIndex
	}
}

export function apiMenuDirection( talknIndex, params ){
	return {
		type: 'API_MENU_DIRECTION',
		talknIndex: talknIndex,
		direction: params.direction
	}
}

export function switchDetail( talknIndex, params ){
	return {
		type: 'SWITCH_DETAIL',
		talknIndex: talknIndex,
		apiKey: params.apiKey
	}
}

export function switchConnection( talknIndex, params ){
	return {
		type: 'SWITCH_CONNECTION',
		talknIndex: talknIndex,
		connectionLength: params.connectionLength
	}
}
