import Emotions from 'common/emotions';

import Post from 'api/store/Post';

import { HookProps } from 'components/container/Thread/GlobalContext';
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
import { init as refsInit } from 'components/container/Thread/GlobalContext/hooks/refs';

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

export default ({
  action,
  api,
  bootOption,
  state,
  bools,
  refs,
  layout,
  params,
  setIsTune,
  setAction,
  setLayout,
  setBootOption,
  setBools,
  setRefs,
  setScrollTop,
  setScrollHeight,
  setPostsTimeline,
  setPostsCatched,
  setUiTimeMarker,
  setDoms,
  setMenuRank,
  setRankCatched,
}: HookProps) => {
  const { app } = state;
  const postsElm = refs.posts.current as HTMLElement;

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
      setRefs(refsInit);
      setDoms(domsInit);
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
      setAction(actions.init, params);
      break;
    case actions.apiRequestFetch:
      api('fetchPosts', app.rootCh);
      api('rank', app.rootCh);
      break;
    case actions.neutral:
      setBools({ ...bools, openMenu: !layout.isSpLayout });
      break;
    case actions.reset:
      setBools({ ...boolsInit, openFooter: bools.openFooter });
      break;
    case actions.openFooterThread:
      setBools({ ...bools, openFooter: true });
      setAction(actions.reset);
      break;
    case actions.closeFooterThread:
      setBools({ ...bools, openFooter: false });
      setAction(actions.reset);
      break;
    case actions.openDetail:
      //      console.log(action, layout.isSpLayout, layout.isTabLayout, layout.isSmallPcLayout);
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
      const postsTextareaElm = refs.postsTextarea.current as HTMLTextAreaElement;
      const inputStampId = postsTextareaElm.dataset[dataset['stamp-id']];
      const inputPost = Number(inputStampId) > 0 ? Emotions.map[inputStampId] : postsTextareaElm.value;
      const inputCurrentTime = 0;
      exeApi('post', { app: { inputPost, inputStampId, inputCurrentTime } });
      setBools({ ...bools, openPostsTextarea: false, openPictograms: false });
      setAction(actions.apiRequestPosted);
      break;
    case actions.apiRequestPosted:
      setBools({ ...bools, openPostsTextarea: true });
      break;
    case actions.apiRequestGetMore:
      setRefs(refsInit);
      setScrollHeight(postsElm.scrollHeight);
      exeApi('getMore');
      break;
    case actions.apiRequestChangeThread:
      setBools(boolsInit);
      setRefs(refsInit);
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
    case actions.apiResponseFetch:
    case actions.apiResponsePost:
    case actions.apiResponseChangeThread:
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
