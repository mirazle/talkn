import MenuIndex from 'common/schemas/state/MenuIndex';
import User from 'common/schemas/state/User';

export default ( state = new MenuIndex() , action ) => {

	switch( action.type ){
	case 'ON_CLICK_MULTISTREAM':
		const multistreamPosts = action.user.dispThreadType === User.dispThreadTypeMulti ?
			action.postsMulti : action.postsSingle;
		const multistreamPostLength = multistreamPosts && multistreamPosts.length ? multistreamPosts.length : 0;
		if(multistreamPostLength > 0 ){
			return state.map( mi => {
				if( action.app.rootConnection === mi.connection ){
					return {...mi,
						favicon: multistreamPosts[ multistreamPostLength - 1].favicon,
						post: multistreamPosts[ multistreamPostLength - 1].post
					}
				}else{
					return mi;
				}
			});
		}
		return state;
	case 'SERVER_TO_CLIENT[EMIT]:find':
		const postLength = action.posts && action.posts.length ? action.posts.length : 0;
		if(postLength === 0 ){
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
			return state.map( mi => {
				if( action.thread.connection === mi.connection ){
					return {...mi,
						favicon: action.posts[ postLength - 1].favicon,
						watchCnt: action.thread.watchCnt,
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
						favicon: action.posts[ postLength - 1 ].favicon,
						post: action.posts[ postLength - 1 ].post,
						watchCnt: action.thread.watchCnt
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
		return state.map( ( mi ) => {

			// rootConnection
			if(action.app.rootConnection === mi.connection){
				if(action.app.multistream){
					return {...mi,
						favicon: action.posts[ 0 ].favicon,
						post: action.posts[ 0 ].post
					}
				}else{
					return mi;
				}
			}

			// childConnection
			if(action.posts[0].connection === mi.connection){
				return {...mi,
					favicon: action.posts[ 0 ].favicon,
					post: action.posts[ 0 ].post
				}
			}
			return mi
		});
	default:
		return action.menuIndex ? state.merge( action.menuIndex ) : state ;
	}
};