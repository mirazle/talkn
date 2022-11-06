import { HookProps, actions } from 'components/container/Thread/GlobalContext';

export type Type = string;
export const init: Type = '';

export default ({ state, postsTimeline, setPostsTimeline, setAction }: HookProps) => {
  switch (state.clientLog[0]) {
    case 'NEXT_POSTS_TIMELINE':
      const postsTimelineCnt = postsTimeline.length - 1;
      const postsTimelineStateCnt = state.postsTimeline.length - 1;
      if (postsTimeline[postsTimelineCnt] && state.postsTimeline[postsTimelineStateCnt]) {
        if (postsTimeline[postsTimelineCnt]._id !== state.postsTimeline[postsTimelineStateCnt]._id) {
          setPostsTimeline([...postsTimeline, state.postsTimeline[postsTimelineStateCnt]]);
          setAction(actions.nextPostsTimeline);
        }
      }

      break;
    case 'CLEAR_POSTS_TIMELINE':
      setPostsTimeline([...state.postsTimeline]);
      break;
  }
};
