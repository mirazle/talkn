import Rank from "api/store/Rank";
import App from "api/store/App";

export default (state = [], action) => {
  const sortWatchCnt = (a, b) => {
    if (a.ch === action.app.rootCh || b.ch === action.app.rootCh) {
      return 0;
    }
    if (a.watchCnt < b.watchCnt) return 1;
    if (a.watchCnt > b.watchCnt) return -1;
    return 0;
  };
  switch (action.type) {
    case "ON_CLICK_MULTISTREAM":
      const multistreamPosts =
        action.app.dispThreadType === App.dispThreadTypeMulti ? action.postsMulti : action.postsSingle;
      const multistreamPostLength = multistreamPosts && multistreamPosts.length ? multistreamPosts.length : 0;
      if (multistreamPostLength > 0) {
        return state.map((mi) => {
          if (action.app.rootCh === mi.ch) {
            return {
              ...mi,
              //						title: multistreamPosts[ multistreamPostLength - 1].title,
              favicon: multistreamPosts[multistreamPostLength - 1].favicon,
              post: multistreamPosts[multistreamPostLength - 1].post,
            };
          } else {
            return mi;
          }
        });
      }
      return state;
    case "SERVER_TO_API[EMIT]:fetchPosts":
      if (action.app.isLinkCh) {
        return state;
      }

      const postLength = action.posts && action.posts.length ? action.posts.length : 0;

      if (postLength === 0) {
        return state.map((mi) => {
          if (action.thread.ch === mi.ch) {
            return {
              ...mi,
              title: action.thread.title,
              favicon: action.thread.favicon,
              watchCnt: action.thread.watchCnt,
            };
          } else {
            return mi;
          }
        });
      }

      if (action.app.dispThreadType === App.dispThreadTypeMulti) {
        return state.map((mi) => {
          if (action.thread.ch === mi.ch) {
            return {
              ...mi,
              //						title: action.posts[ postLength - 1].title,
              favicon: action.thread.favicon,
              stampId: action.posts[postLength - 1].stampId,
              //						watchCnt: action.thread.watchCnt,
              post: action.posts[postLength - 1].post,
            };
          } else {
            return mi;
          }
        });
      }
      /*
		console.log("MENU INDEX C");

		return state.map( ( mi ) => {
			if( action.posts[ 0 ].ch === mi.ch ){
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

    case "SERVER_TO_API[BROADCAST]:fetchPosts":
    case "SERVER_TO_API[BROADCAST]:changeThread":
    case "SERVER_TO_API[BROADCAST]:disconnect":
      if (state.length === 0) {
        return [action.thread];
      } else {
        return state
          .map((mi) => {
            if (action.thread.ch === mi.ch) {
              return { ...mi, watchCnt: action.thread.watchCnt };
            } else {
              return mi;
            }
          })
          .sort(sortWatchCnt);
      }
    case "SERVER_TO_API[BROADCAST]:post":
      return state.map((mi) => {
        // rootCh
        if (action.app.rootCh === mi.ch) {
          if (action.app.multistream) {
            return {
              ...mi,
              title: action.posts[0].title,
              stampId: action.posts[0].stampId,
              favicon: action.posts[0].favicon,
              post: action.posts[0].post,
            };
          } else {
            return mi;
          }
        }

        // childCh
        if (action.posts[0].ch === mi.ch) {
          return {
            ...mi,
            title: action.posts[0].title,
            stampId: action.posts[0].stampId,
            favicon: action.posts[0].favicon,
            post: action.posts[0].post,
          };
        }
        return mi;
      });
    case "SERVER_TO_API[EMIT]:rank":
      console.log(action.rank);
      if (state && state.length > 0 && action.rank && action.rank.length > 0) {
        action.rank.shift();
        return [state[0]].concat(action.rank);
      } else {
        return action.rank ? action.rank : state;
      }
    default:
      return action.rank ? action.rank : state;
  }
};
