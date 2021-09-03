import Posts from 'api/store/Posts';

export default (state = [], action) => {
  let posts = [];
  let postLength = 0;
  const sortWatchCnt = (a, b) => {
    if (a.ch === action.app.rootCh || b.ch === action.app.rootCh) {
      return 0;
    }
    if (a.liveCnt < b.liveCnt) return 1;
    if (a.liveCnt > b.liveCnt) return -1;
    return 0;
  };

  switch (action.type) {
    case 'SERVER_TO_API[EMIT]:fetchPosts':
      if (action.app.isLinkCh) {
        return state;
      }

      posts = Posts.getDispPosts(action);
      postLength = posts && posts.length ? posts.length : 0;

      if (postLength === 0) {
        return state;
      }

      return state.map((rank) => {
        if (action.thread.ch === rank.ch) {
          return {
            ...rank,
            favicon: posts[postLength - 1].favicon,
            stampId: posts[postLength - 1].stampId,
            post: posts[postLength - 1].post,
          };
        } else {
          return rank;
        }
      });
    case 'SERVER_TO_API[BROADCAST]:tune':
    case 'SERVER_TO_API[BROADCAST]:changeThread':
    case 'SERVER_TO_API[BROADCAST]:disconnect':
      return state
        .map((rank) => {
          if (action.thread.ch === rank.ch) {
            return { ...rank, liveCnt: action.thread.liveCnt };
          } else {
            return rank;
          }
        })
        .sort(sortWatchCnt);
    case 'SERVER_TO_API[BROADCAST]:post':
      return state.map((rank) => {
        if (action.posts[0].ch === rank.ch) {
          return {
            ...rank,
            title: action.posts[0].title,
            stampId: action.posts[0].stampId,
            favicon: action.posts[0].favicon,
            post: action.posts[0].post,
          };
        }
        return rank;
      });
    case 'SERVER_TO_API[EMIT]:rank':
      // stateとaction.rankの両方存在する場合
      if (state && state.length > 0 && action.rank && action.rank.length > 0) {
        const newRanks = [];
        const rankCnt = action.rank.length;
        let lastPost = action.rank[0];
        for (let i = 0; i < rankCnt; i++) {
          let newRank = action.rank[i];
          lastPost = newRank.updateTime > lastPost.updateTime ? newRank : lastPost;

          if (newRank.ch === state[0].ch) {
            newRank = {
              ...newRank,
              liveCnt: state[0].liveCnt,
            };
          }
          newRanks.push(newRank);
        }

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
