import MenuIndex from 'common/schemas/state/MenuIndex';
import User from 'common/schemas/state/User';

export default ( state = new MenuIndex() , action ) => {

	switch( action.type ){
	case 'SERVER_TO_CLIENT[EMIT]:find':
		const postLength = action.posts && action.posts.length ? action.posts.length : 0;
		if(postLength === 0 ){
			console.log("A " + action.posts[0].connection);
			return state.map( mi => {
				if( action.thread.connection === mi.connection ){
					return {...mi,
						favicon: action.thread.favicon,
						watchCnt: action.thread.watchCnt,
					}
				}else{
					return mi;
				}
			});
		}

		if(action.user.dispThreadType === User.dispThreadTypeMulti){
			console.log("B " + action.posts[0].connection);
			return state.map( mi => {
				if( action.thread.connection === mi.connection ){
					console.log("a " + mi.connection);
					return {...mi,
						favicon: action.posts[ postLength - 1].favicon,
						watchCnt: action.thread.watchCnt,
						post: action.posts[ postLength - 1].post
					}
				}else{
					console.log("b " + mi.connection);
					return mi;
				}
			});
		}else{
			console.log("C " + action.posts[0].connection);
			return state.map( ( mi ) => {
				if( action.posts[ 0 ].connection === mi.connection ){
					console.log("a " + mi.connection);
					return {...mi,
						favicon: action.posts[ 0 ].favicon,
						post: action.posts[ 0 ].post,
						watchCnt: action.thread.watchCnt
					}
				}else{
					console.log("b " + mi.connection);
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