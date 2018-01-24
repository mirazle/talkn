import Thread from 'common/schemas/state/Thread';

export default ( state = new Thread() , action ) => {
	switch( action.type ){
	case 'SERVER_TO_CLIENT[BROADCAST]:post':
		return state.merge({postCnt: state.postCnt + 1 });
	default :
		// TODO ブラウザ初期表示時に上に画面を上にスクロールするとスレッドが見えてしまう
		return action.thread ? state.merge( action.thread ) : state ;
	}
};
