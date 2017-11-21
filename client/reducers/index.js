import { combineReducers } from 'redux'
import talknIndex from './talknIndex'
import actioned from './actioned'
import actionLog from './actionLog'
import ws from './ws'
import styles from './styles'
import watchCnt from './watchCnt'
import User from './User'

const rootReducer = combineReducers({
	talknIndex,
	actioned,
	actionLog,
	User,
	ws,
	styles,
	watchCnt,
	User,
})

export default rootReducer
