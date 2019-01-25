import { combineReducers } from 'redux';
import app from './app';
import user from './user';
import userAgent from './userAgent';
import menuIndex from './menuIndex';
import menuLogs from './menuLogs';
import thread from './thread';
import analyze from './analyze';
import bootOption from './bootOption';
import setting from './setting';
import posts from './posts';
import postsMulti from './postsMulti';
import postsSingle from './postsSingle';
import style from './style';
import actionLog from './actionLog';

const rootReducer = combineReducers({
	app,
	user,
	userAgent,
	menuIndex,
	menuLogs,
	thread,
	analyze,
	bootOption,
	setting,
	postsMulti,
	postsSingle,
	style,
	actionLog,
})

export default rootReducer
