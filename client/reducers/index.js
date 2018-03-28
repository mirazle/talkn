import { combineReducers } from 'redux';
import app from './app';
import user from './user';
import control from './control';
import userAgent from './userAgent';
import index from './index/';
import thread from './thread';
import analyze from './analyze';
import bootOption from './bootOption';
import mediaIndex from './mediaIndex';
import setting from './setting';
import posts from './posts';
import style from './style';
import actionLog from './actionLog';

const rootReducer = combineReducers({
	app,
	user,
	control,
	userAgent,
	index,
	thread,
	analyze,
	bootOption,
	mediaIndex,
	setting,
	posts,
	style,
	actionLog,
})

export default rootReducer
