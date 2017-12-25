import { combineReducers } from 'redux';
import app from './app';
import user from './user';
import userAgent from './userAgent';
import index from './index/';
import thread from './thread';
import analyze from './analyze';
import bootOption from './bootOption';
import mediaIndex from './mediaIndex';
import setting from './setting';
import posts from './posts';
import style from './style';

const rootReducer = combineReducers({
	app,
	user,
	userAgent,
	index,
	thread,
	analyze,
	bootOption,
	mediaIndex,
	setting,
	posts,
	style,
})

export default rootReducer
