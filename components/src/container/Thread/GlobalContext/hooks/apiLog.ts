import Posts from 'api/store/Posts';

import { HookProps, actions } from 'components/container/Thread/GlobalContext';

export type Type = string;
export const init: Type = '';

export default ({ action, bools, state, postsTimeline, setAction, setBools, setMenuRank, setPostsTimeline }: HookProps) => {
  const { app, apiLog, thread, ranks, posts } = state;
  switch (apiLog[0]) {
    case 'SERVER_TO_API[EMIT]:tune':
      setAction(actions.apiResponseTuning);
      break;
    case 'SERVER_TO_API[EMIT]:fetchPosts':
      if (action === actions.apiRequestFetch) {
        const dispPosts = Posts.getDispPosts(state);
        setPostsTimeline(dispPosts);
        setBools({ ...bools, catchFetchPost: true });
      }
      if (action === actions.apiRequestChangeThread) {
        const dispPosts = Posts.getDispPosts(state);
        setPostsTimeline(dispPosts);
        setAction(actions.apiResponseChangeThread);
      }
      break;
    case 'SERVER_TO_API[EMIT]:rank':
      setMenuRank(ranks);
      setBools({ ...bools, catchRanks: true });
      break;
    case 'SERVER_TO_API[EMIT]:getMore':
      setPostsTimeline(posts.concat(postsTimeline));
      setAction(actions.apiResponseGetMore);
      break;
    case 'SERVER_TO_API[BROADCAST]:post':
      if (app.isRootCh) {
        setPostsTimeline(postsTimeline.concat(posts));
        setAction(actions.apiResponsePost);
      } else {
        if (posts[0].ch === thread.ch) {
          setPostsTimeline(postsTimeline.concat(posts));
          setAction(actions.apiResponsePost);
        }
      }
      break;
    case 'SERVER_TO_API[EMIT]:changeThreadDetail':
      if (action === actions.apiRequestChangeThreadDetail) {
        setAction(actions.apiResponseChangeThreadDetail);
      }
      break;
  }
};

export type ParamsType = { [key: string]: string | number };
