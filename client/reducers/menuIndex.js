import MenuIndex from 'common/schemas/state/MenuIndex';
import App from 'common/schemas/state/App';

export default ( state = new MenuIndex() , action ) => {

	const sortWatchCnt = ( a, b ) => {
		if(
			a.connection === action.app.rootConnection ||
			b.connection === action.app.rootConnection
		){
			return 0;
		}
		if(a.watchCnt < b.watchCnt) return 1;
		if(a.watchCnt > b.watchCnt) return -1;
		return 0;
	}; 

	switch( action.type ){
	case 'ON_CLICK_MULTISTREAM':
		const multistreamPosts = action.app.dispThreadType === App.dispThreadTypeMulti ?
			action.postsMulti : action.postsSingle;
		const multistreamPostLength = multistreamPosts && multistreamPosts.length ? multistreamPosts.length : 0;
		if(multistreamPostLength > 0 ){
			return state.map( mi => {
				if( action.app.rootConnection === mi.connection ){
					return {...mi,
//						title: multistreamPosts[ multistreamPostLength - 1].title,
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

	
		if( action.app.isLinkConnection ){
			return state;
		}

		const postLength = action.posts && action.posts.length ? action.posts.length : 0;

		if(postLength === 0 ){
			console.log("MENU INDEX A");
			return state.map( mi => {
				if( action.thread.connection === mi.connection ){
					return {...mi,
						title: action.thread.title,
						favicon: action.thread.favicon,
						watchCnt: action.thread.watchCnt,
					}
				}else{
					return mi;
				}
			});
		}

		if(action.app.dispThreadType === App.dispThreadTypeMulti){
			console.log("MENU INDEX B");

			return state.map( mi => {
				if( action.thread.connection === mi.connection ){
					return {...mi,
//						title: action.posts[ postLength - 1].title,
//						favicon: action.posts[ postLength - 1].favicon,
//						watchCnt: action.thread.watchCnt,
						post: action.posts[ postLength - 1].post
					}
				}else{
					return mi;
				}
			});
		}
/*
		console.log("MENU INDEX C");

		return state.map( ( mi ) => {
			if( action.posts[ 0 ].connection === mi.connection ){
				return {...mi,
//					favicon: action.posts[ postLength - 1 ].favicon,
//					post: action.posts[ postLength - 1 ].post,
//					watchCnt: action.thread.watchCnt
				}
			}else{
				return mi;
			}
		});
*/
		return state;

	case 'SERVER_TO_CLIENT[BROADCAST]:find':
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
		}).sort( sortWatchCnt );
	case 'SERVER_TO_CLIENT[BROADCAST]:post':
		return state.map( ( mi ) => {

			// rootConnection
			if(action.app.rootConnection === mi.connection){
				if(action.app.multistream){
					return {...mi,
						title: action.posts[ 0 ].title,
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
					title: action.posts[ 0 ].title,
					favicon: action.posts[ 0 ].favicon,
					post: action.posts[ 0 ].post
				}
			}
			return mi
		});
	case "SERVER_TO_CLIENT[EMIT]:findMenuIndex":
		if( state && state.length > 0 && action.menuIndex && action.menuIndex.length > 0 ){
			action.menuIndex.shift();
			return [ state[0] ].concat( action.menuIndex );
		}else{
			return action.menuIndex ? action.menuIndex : state ;			
		}
	default:
		return action.menuIndex ? action.menuIndex : state ;
	}
};

