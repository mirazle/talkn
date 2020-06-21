import Posts from "api/store/Posts";
import App from "api/store/App";

export default (state = [], action) => {
  let posts = [];
  let postLength = 0;
  const sortWatchCnt = (a, b) => {
    if (a.ch === action.app.rootCh || b.ch === action.app.rootCh) {
      return 0;
    }
    if (a.watchCnt < b.watchCnt) return 1;
    if (a.watchCnt > b.watchCnt) return -1;
    return 0;
  };

  switch (action.type) {
    case "SERVER_TO_API[EMIT]:fetchPosts":
      if (action.app.isLinkCh) {
        return state;
      }

      posts = Posts.getDispPosts(action);
      postLength = posts && posts.length ? action.posts.length : 0;

      if (postLength === 0) {
        return state;
      }

      return state.map((mi) => {
        if (action.thread.ch === mi.ch) {
          return {
            ...mi,
            favicon: posts[postLength - 1].favicon,
            stampId: posts[postLength - 1].stampId,
            post: posts[postLength - 1].post,
          };
        } else {
          return mi;
        }
      });
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
      if (state && state.length === 1 && action.rank && action.rank.length > 0) {

        const newRanks = [];
        const rankCnt = action.rank.length;
        let lastPost = action.rank[0];
        for( let i = 0; i < rankCnt; i++ ){
          let newRank = action.rank[i];
          lastPost = newRank.updateTime > lastPost.updateTime ? newRank : lastPost;

          if (newRank.ch === state[0].ch) {
            newRank = { 
              ...newRank,
              watchCnt: state[0].watchCnt,
            };
          }
          newRanks.push(newRank);
        };

        newRanks.sort(sortWatchCnt);
        newRanks[0].faicon = lastPost.favicon;
        newRanks[0].post = lastPost.post;
        newRanks[0].stampId = lastPost.stampId;
        return newRanks;
      } else {
        return action.rank ? action.rank : state;
      }
    default:
      return action.rank ? action.rank : state;
  }
};
