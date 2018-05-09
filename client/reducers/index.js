import { combineReducers } from 'redux';
import app from './app';
import user from './user';
import userAgent from './userAgent';
import menuIndex from './menuIndex';
import thread from './thread';
import analyze from './analyze';
import bootOption from './bootOption';
import setting from './setting';
import posts from './posts';
import style from './style';
import actionLog from './actionLog';

const rootReducer = combineReducers({
	app,
	user,
	userAgent,
	menuIndex,
	thread,
	analyze,
	bootOption,
	setting,
	posts,
	style,
	actionLog,
})

export default rootReducer
