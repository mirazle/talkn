import postsSingle from 'api/reducers/postsSingle';

import { HookProps, actions } from 'components/container/Thread/GlobalContext';
import { generateUiTimeMarker } from 'components/container/Thread/GlobalContext/func';

export type Type = {
  catchFetchPost: boolean;
  catchRanks: boolean;
  finnishFetch: boolean;
  inited: boolean;
  openFooter: boolean;
  openThread: boolean;
  openPictograms: boolean;
  openNewPost: boolean;
  openMenu: boolean;
  openTuneModal: boolean;
  openDetail: boolean;
  openPostsTextarea: boolean;
  loading: boolean;
  screenScrolling: boolean;
  postsScrollBottom: boolean;
  postsScrollingBottom: boolean;
  detailTransforming: boolean;
  screenTransforming: boolean;
};

export const init: Type = {
  catchFetchPost: false,
  catchRanks: false,
  finnishFetch: false,
  inited: false,
  openFooter: true,
  openThread: false,
  openPictograms: false,
  openNewPost: false,
  openMenu: false,
  openTuneModal: false,
  openDetail: false,
  openPostsTextarea: true,
  loading: false,
  screenScrolling: false,
  postsScrollBottom: false,
  postsScrollingBottom: false,
  detailTransforming: false,
  screenTransforming: false,
};

export default (props: HookProps) => {
  const { doms, bools, state, root, uiTimeMarker, setAction, setBools, setDoms } = props;
  const { screen, posts } = doms;

  if (!bools.inited && bools.finnishFetch && screen && posts) {
    const timelineDoms = {};

    Array.from(root.querySelectorAll('time.TimeMarker')).forEach((time) => {
      if (time.innerHTML !== '') {
        timelineDoms[time.innerHTML] = time;
      }
    });

    setDoms({ ...doms, timelines: timelineDoms });
    posts.scrollTo(0, posts.scrollHeight);
    screen.scrollTo(screen.scrollWidth, 0);
    setBools({ ...bools, inited: true, loading: false });
  } else if (bools.inited && uiTimeMarker.now.label === '') {
    generateUiTimeMarker(props);
  } else {
    if (bools.catchFetchPost && bools.catchRanks && !bools.finnishFetch) {
      setBools({ ...bools, finnishFetch: true });
      setAction(actions.apiResponseFetch);
    }
  }
};
