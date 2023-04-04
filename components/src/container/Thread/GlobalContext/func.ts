import { HookProps } from 'components/container/Thread/GlobalContext';
import { Type as ActionType } from 'components/container/Thread/GlobalContext/hooks/action';
import UiTimeMarker from 'components/container/Thread/UiTimeMarker';
import { layouts } from 'components/styles';

export const generateUiTimeMarker = ({ doms, state, root, setAction, setUiTimeMarker }: HookProps, callbackAction?: ActionType) => {
  const postsElm = doms.posts;

  if (doms.timelines) {
    const timelineKeys = Object.keys(doms.timelines);
    const timelineElms = timelineKeys.map((key) => doms.timelines[key]);
    if (postsElm) {
      const { scrollTop } = doms.posts;
      const reduceTop = -layouts.appHeaderHeight;
      const updateUiTimeMarker = UiTimeMarker.generate(root, scrollTop - reduceTop, timelineElms);
      setUiTimeMarker(updateUiTimeMarker);
    }
    callbackAction && setAction(callbackAction);
  }
};
