import { combineReducers } from 'redux';
import app from './app';
import user from './user';
import userAgent from './userAgent';
import index from './index/';
import thread from './thread';
import analyze from './analyze';
import bootOption from './bootOption';
import mediaIndex from './mediaIndex';
import meta from './meta';
import setting from './setting';
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
	meta,
	setting,
	style,
})

export default rootReducer
