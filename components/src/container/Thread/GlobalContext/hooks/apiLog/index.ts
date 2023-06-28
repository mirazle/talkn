import Posts from 'api/store/Posts';

import { HookProps, actions } from 'components/container/Thread/GlobalContext';

export type Type = string[];
export const init: Type = [];

export default (hookProps: HookProps) => {
  if (hookActions[hookProps.state.apiLog[0]]) {
    hookActions[hookProps.state.apiLog[0]](hookProps);
  }
};

const hookActions = {
  'SERVER_TO_API[EMIT]:tune': async ({ setAction }: HookProps) => {
    setAction(actions.apiResponseTuning);
  },
  'SERVER_TO_API[EMIT]:fetchPosts': async ({ action, bools, state, setAction, setBools, setPostsTimeline }: HookProps) => {
    const { app, apiLog, thread, ranks, posts } = state;

    if (action === actions.apiRequestFetch) {
      const dispPosts = Posts.getDispPosts(state);
      setBools((p) => ({ ...p, catchFetchPost: true }));
      setPostsTimeline(dispPosts);
    } else if (action === actions.apiRequestChangeThread) {
      setPostsTimeline(state.posts);
      setAction(actions.apiResponseChangeThread);
    }
  },

  'SERVER_TO_API[EMIT]:rank': async (props: HookProps) => {
    const { bools, state, setBools, setMenuRank } = props;
    const { app, apiLog, thread, ranks, posts } = state;
    setMenuRank(ranks);
    setBools((p) => ({ ...p, catchRanks: true }));
  },

  'SERVER_TO_API[EMIT]:getMore': async ({ state, postsTimeline, setAction, setPostsTimeline }: HookProps) => {
    const { app, apiLog, thread, ranks, posts } = state;
    setPostsTimeline(posts.concat(postsTimeline));
    setAction(actions.apiResponseGetMore);
  },
  'SERVER_TO_API[BROADCAST]:post': async ({ state, postsTimeline, setAction, setPostsTimeline }: HookProps) => {
    const { app, apiLog, thread, ranks, posts } = state;
    console.log('A', app.rootCh, posts);
    if (app.isRootCh) {
      console.log('B', app.rootCh, posts);
      setPostsTimeline(postsTimeline.concat(posts));
      setAction(actions.apiResponsePost);
    } else {
      console.log('C', app.rootCh, posts);
      if (posts[0].ch === thread.ch) {
        console.log('D', app.rootCh, posts);
        setPostsTimeline(postsTimeline.concat(posts));
        setAction(actions.apiResponsePost);
      }
    }
  },
  'SERVER_TO_API[EMIT]:changeThreadDetail': async ({ action, state, setAction }: HookProps) => {
    const { app, apiLog, thread, ranks, posts } = state;
    if (action === actions.apiRequestChangeThreadDetail) {
      setAction(actions.apiResponseChangeThreadDetail);
    }
  },
};

export type ParamsType = { [key: string]: string | number };
