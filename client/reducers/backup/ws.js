import { combineReducers } from 'redux'
import connect from './ws/connect'
import setting from './ws/setting'
import posts from './ws/posts'
import thread from './ws/thread'
import index from './ws/index'
import notif from './ws/notif'
import apiMeta from './ws/apiMeta'
import apiSocial from './ws/apiSocial'
import apiMovie from './ws/apiMovie'
import apiPicture from './ws/apiPicture'
import apiWikipedia from './ws/apiWikipedia'
import apiAnalyze from './ws/apiAnalyze'

const rootReducer = combineReducers({
	connect,
	setting,
	posts,
	thread,
	index,
	notif,
	apiMeta,
	apiSocial,
	apiMovie,
	apiPicture,
	apiWikipedia,
	apiAnalyze
})

export default rootReducer
