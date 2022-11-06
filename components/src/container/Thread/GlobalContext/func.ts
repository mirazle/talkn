import { HookProps } from 'components/container/Thread/GlobalContext';
import { Type as ActionType } from 'components/container/Thread/GlobalContext/hooks/action';
import UiTimeMarker from 'components/container/Thread/UiTimeMarker';

export const generateUiTimeMarker = ({ state, refs, setAction, setUiTimeMarker }: HookProps, callbackAction?: ActionType) => {
  const postsElm = refs.posts.current as HTMLElement;
  const timelinesElm = refs.timelines.current;
  const timelineKeys = Object.keys(timelinesElm);

  if (timelineKeys.length > 0) {
    const timelineElms = timelineKeys.map((key) => timelinesElm[key].current);
    const updateUiTimeMarker = UiTimeMarker.generate(postsElm.scrollTop, timelineElms);
    setUiTimeMarker(updateUiTimeMarker);
    callbackAction && setAction(callbackAction);
  }
};
