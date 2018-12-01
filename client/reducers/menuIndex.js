import MenuIndex from 'common/schemas/state/MenuIndex';

export default ( state = new MenuIndex() , action ) => {

	switch( action.type ){
	case 'SERVER_TO_CLIENT[EMIT]:find':
		const postLength = action.posts.length;
		if(action.posts.length === 0 ){
			return state;
		}

		if(action.app.multistream){
			return state.map( mi => {
				if( action.thread.connection === mi.connection ){
					return {...mi,
						favicon: action.posts[ postLength - 1].favicon,
						post: action.posts[ postLength - 1].post
					}
				}else{
					return mi;
				}
			});
		}else{
			return state.map( ( mi ) => {
				if( action.posts[ 0 ].connection === mi.connection ){
					return {...mi,
						favicon: action.posts[ 0 ].favicon,
						post: action.posts[ 0 ].post
					}
				}else{
					return mi;
				}
			});
		}
	case 'SERVER_TO_CLIENT[BROADCAST]:find':
		return state.map( ( mi ) => {
			if( action.thread.connection === mi.connection ){
				return {...mi,
					watchCnt: action.thread.watchCnt,
				}
			}else{
				return mi;
			};
		});		
	case 'SERVER_TO_CLIENT[BROADCAST]:changeThread':
	case 'SERVER_TO_CLIENT[BROADCAST]:disconnect':
		return state.map( ( mi ) => {
			if( action.thread.connection === mi.connection ){
				return {...mi,
					watchCnt: action.thread.watchCnt,
				}
			}else{
				return mi
			};
		});
	case 'SERVER_TO_CLIENT[BROADCAST]:post':
		return state.map( mi => isAssing( action, mi ) ?
				{...mi,
					favicon: action.posts[ 0 ].favicon,
					post: action.posts[ 0 ].post
				} : mi);
	default:
		return action.menuIndex ? state.merge( action.menuIndex ) : state ;
	}
};

/********************/
/*	FUNCTION		*/
/********************/

const isAssing = ( action, mi ) => {
	if(action.posts[ 0 ].connection === mi.connection) return true;
	if(action.app.rootConnection === mi.connection) return true;
	return false;
}