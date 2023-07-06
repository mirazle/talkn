import Emotions from 'common/emotions';

import Post from 'api/store/Post';

import { HookProps } from 'components/container/Thread/GlobalContext';
import { generateUiTimeMarker } from 'components/container/Thread/GlobalContext/func';
import { init as boolsInit } from 'components/container/Thread/GlobalContext/hooks/bools';
import { init as domsInit } from 'components/container/Thread/GlobalContext/hooks/doms';
import { init as isTuneInit } from 'components/container/Thread/GlobalContext/hooks/isTune';
import layout, { init as layoutInit } from 'components/container/Thread/GlobalContext/hooks/layout';
import { init as ranksCatchedInit } from 'components/container/Thread/GlobalContext/hooks/menu/catched';
import { init as menuRanksInit } from 'components/container/Thread/GlobalContext/hooks/menu/rank';
import { init as catchPostInit } from 'components/container/Thread/GlobalContext/hooks/posts/catched';
import { init as scrollHeightInit } from 'components/container/Thread/GlobalContext/hooks/posts/scrollHeight';
import { init as scrollTopInit } from 'components/container/Thread/GlobalContext/hooks/posts/scrollTop';
import { init as timelineInit } from 'components/container/Thread/GlobalContext/hooks/posts/timeline';
import { init as uiTimeMarkerInit } from 'components/container/Thread/GlobalContext/hooks/posts/uiTimeMarker';

import { dataset } from './refs';

export const actions = {
  init: 'init',
  // api
  apiRequestTuning: 'apiRequestTuning',
  apiResponseTuning: 'apiResponseTuning',
  apiRequestChangeTuning: 'apiRequestChangeTuning',
  apiRequestFetchPost: 'apiRequestFetchPost',
  apiRequestFetch: 'apiRequestFetch',
  apiResponseFetch: 'apiResponseFetch',
  apiResponseFetchPosts: 'apiResponseFetchPosts',
  apiRequestRank: 'apiRequestRank',
  apiResponseRank: 'apiResponseRank',
  apiRequestPost: 'apiRequestPost',
  apiRequestPosted: 'apiRequestPosted',
  apiResponsePost: 'apiResponsePost',
  apiRequestGetMore: 'apiRequestGetMore',
  apiResponseGetMore: 'apiResponseGetMore',
  apiRequestChangeThread: 'apiRequestChangeThread',
  apiResponseChangeThread: 'apiResponseChangeThread',
  apiRequestChangeThreadDetail: 'apiRequestChangeThreadDetail',
  apiResponseChangeThreadDetail: 'apiResponseChangeThreadDetail',
  // ui
  neutral: 'neutral',
  reset: 'reset',
  openFooterThread: 'openFooterThread',
  closeFooterThread: 'closeFooterThread',
  openPictogram: 'openPictogram',
  openTuneModal: 'openTuneModal',
  closeTuneModal: 'closeTuneModal',
  openDetail: 'openDetail',
  closeDetail: 'closeDetail',

  // media
  nextPostsTimeline: 'nextPostsTimeline',
  clearPostsTimeline: 'clearPostsTimeline',
} as const;
export type Type = valueOf<typeof actions>;
export const init: Type = actions.init;

let exeApiId = 0;

export default (props: HookProps) => {
  const {
    action,
    api,
    bootOption,
    state,
    bools,
    doms,
    layout,
    params,
    setIsTune,
    setAction,
    setLayout,
    setBootOption,
    setBools,
    setScrollTop,
    setScrollHeight,
    setPostsTimeline,
    setPostsCatched,
    setUiTimeMarker,
    setDoms,
    setMenuRank,
    setRankCatched,
  } = props;
  const { app } = state;
  const postsElm = doms.posts;

  const exeApi = (method, params?: any) => {
    exeApiId = window.setTimeout(() => {
      setBools({ ...bools, loading: false });
      setAction(actions.neutral);
    }, 5000);
    setBools({ ...bools, loading: true });
    if (params) {
      api(method, params);
    } else {
      api(method);
    }
  };

  switch (action) {
    case actions.init:
      setIsTune(isTuneInit);
      setLayout(layoutInit);
      setBools(boolsInit);
      setDoms({ ...domsInit });
      setMenuRank(menuRanksInit);
      setRankCatched(ranksCatchedInit);
      setPostsTimeline(timelineInit);
      setScrollTop(scrollTopInit);
      setScrollHeight(scrollHeightInit);
      setPostsCatched(catchPostInit);
      setUiTimeMarker(uiTimeMarkerInit);
      break;
    case actions.apiRequestTuning:
      const createBootOption = { ...bootOption, ...params };
      api('tune', createBootOption);
      setBootOption(createBootOption);
      setBools({ ...bools, loading: true });
      break;
    case actions.apiRequestChangeTuning:
      api('untune', bootOption);
      setIsTune(false);
      setBools(boolsInit);
      setAction(actions.init, params);
      break;
    case actions.apiRequestFetch:
      api('fetchPosts', app.rootCh);
      api('rank', app.rootCh);
      break;
    case actions.neutral:
      setBools({ ...bools, openMenu: !layout.isSpLayout, loading: false });
      break;
    case actions.reset:
      setBools({ ...boolsInit, openFooter: bools.openFooter });
      break;
    case actions.openFooterThread:
      setBools({ ...bools, openFooter: true });

      break;
    case actions.closeFooterThread:
      setBools({ ...bools, openFooter: false, openPictograms: false });

      break;
    case actions.openDetail:
      setBools({ ...bools, openDetail: true });
      break;
    case actions.closeDetail:
      setBools({ ...bools, openDetail: false });
      break;
    case actions.openPictogram:
      setBools({ ...bools, openPictograms: true, openTuneModal: false });
      break;
    case actions.openTuneModal:
      setBools({ ...bools, openTuneModal: true, openPictograms: false });
      break;
    case actions.closeTuneModal:
      setBools({ ...bools, openTuneModal: false, openPictograms: false });
      break;
    case actions.apiRequestPost:
      const inputStampId = doms.postTextarea.dataset[dataset['stamp-id']];
      const inputPost = Number(inputStampId) > 0 ? Emotions.map[inputStampId] : doms.postTextarea.value;
      const inputCurrentTime = 0;
      exeApi('post', { app: { inputPost, inputStampId, inputCurrentTime } });
      setBools({ ...bools, openPostsTextarea: false, openPictograms: false });
      setAction(actions.apiRequestPosted);
      break;
    case actions.apiRequestPosted:
      setBools({ ...bools, openPostsTextarea: true });
      break;
    case actions.apiRequestGetMore:
      setScrollHeight(postsElm.scrollHeight);
      exeApi('getMore');
      break;
    case actions.apiRequestChangeThread:
      setBools(boolsInit);
      setPostsTimeline(timelineInit);
      setScrollTop(scrollTopInit);
      setPostsCatched(catchPostInit);
      exeApi('changeThread', { app: { offsetFindId: Post.defaultFindId }, thread: { ch: params.ch } });
      break;
    case actions.apiRequestChangeThreadDetail:
      exeApi('changeThreadDetail', { thread: { ch: params.ch } });
      break;
    case actions.apiResponseTuning:
      setAction(actions.apiRequestFetch);
      break;
    case actions.apiResponseChangeThread:
      const bottomTop = Number.MAX_SAFE_INTEGER;
      clearTimeout(exeApiId);
      setBools({ ...bools, loading: false });
      setAction(actions.neutral);
      postsElm.scrollTo({ left: 0, top: bottomTop });
      generateUiTimeMarker(props);
      break;

    case actions.apiResponsePost:
      if (bools.postsScrollBottom) {
        doms.posts.scrollTo({ left: 0, top: Number.MAX_SAFE_INTEGER, behavior: 'smooth' });
        setBools({ ...bools, postsScrollingBottom: true });
        setTimeout(() => {
          setBools({ ...bools, postsScrollingBottom: false });
          setAction(actions.neutral);
        }, 1000);
      } else {
        if (doms.posts.clientHeight < doms.posts.scrollHeight) {
          setBools({ ...bools, openNewPost: true });
        }
      }
      clearTimeout(exeApiId);
      setAction(actions.neutral);
      break;
    case actions.apiResponseFetch:
    case actions.apiResponseChangeThreadDetail:
    case actions.apiResponseGetMore:
      setIsTune(true);
      clearTimeout(exeApiId);
      setBools({ ...bools, loading: false });
      setAction(actions.neutral);
      break;
    default:
  }
};

export type ParamsType = { [key: string]: string | number };
