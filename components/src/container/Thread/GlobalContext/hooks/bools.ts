import { HookProps, actions } from 'components/container/Thread/GlobalContext';

export type Type = {
  catchFetchPost: boolean;
  catchRanks: boolean;
  finnishFetch: boolean;
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
  screenTransforming: boolean;
};

export const init: Type = {
  catchFetchPost: false,
  catchRanks: false,
  finnishFetch: false,
  openFooter: false,
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
  screenTransforming: false,
};

export default ({ bools, setAction, setBools }: HookProps) => {
  if (!bools.finnishFetch && bools.catchFetchPost && bools.catchRanks) {
    setBools({ ...bools, finnishFetch: true });
    setAction(actions.apiResponseFetch);
  }
};
