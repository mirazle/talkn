import { createContext, useContext, useEffect, useState } from 'react';

import Post from 'api/store/Post';

import { Props as AppProps } from 'components/container/Thread/App';

import hook, {
  action as actionState,
  apiLog as apiLogState,
  clientLog as clientLogState,
  bootOption as bootOptionState,
  isTune as isTuneState,
  layout as layoutState,
  bools as boolsState,
  doms as domsState,
  dragX as dragXState,
  detailMode as detailModeState,
  rankCatched as rankCatchedState,
  menuRank as menuRankState,
  menuMode as menuModeState,
  scrollLeft as scrollLeftState,
  postsCatched as postsCatchedState,
  postsTimeline as postsTimelineState,
  scrollTop as scrollTopState,
  scrollHeight as scrollHeightState,
  uiTimeMarker as uiTimeMarkerState,
  refs as refsState,
} from './hooks';
import { ParamsType as ActionParamsType } from './hooks/action';

/*****************
 * Util Export
 *****************/

export const actions = actionState.actions;
export const menuModeCycle = menuModeState.menuModeCycle;
export const detailModeCycle = detailModeState.detailModeCycle;
export const dataset = refsState.dataset;

/*****************
 * Global Type
 *****************/

export type GlobalContextPublicType = {
  isTune: isTuneState.Type;
  action: actionState.Type;
  apiLog: apiLogState.Type;
  clientLog: clientLogState.Type;
  bootOption: bootOptionState.Type;
  doms: domsState.Type;
  layout: layoutState.Type;
  bools: boolsState.Type;
  refs: refsState.Type;
  rankCatched: rankCatchedState.Type;
  menuRank: menuRankState.Type;
  menuMode: menuModeState.Type;
  dragX: dragXState.Type;
  detailMode: detailModeState.Type;
  scrollLeft: scrollLeftState.Type;
  postsCatched: postsCatchedState.Type;
  postsTimeline: postsTimelineState.Type;
  uiTimeMarker: uiTimeMarkerState.Type;
  scrollTop: scrollTopState.Type;
  scrollHeight: scrollHeightState.Type;
  params: ActionParamsType;
  setAction: (action: actionState.Type, params?: ActionParamsType) => void;
  setMenuMode: React.Dispatch<React.SetStateAction<menuModeState.Type>>;
  setDetailMode: React.Dispatch<React.SetStateAction<detailModeState.Type>>;
  setScrollTop: React.Dispatch<React.SetStateAction<scrollTopState.Type>>;
  setScrollLeft: React.Dispatch<React.SetStateAction<scrollLeftState.Type>>;
  setDragX: React.Dispatch<React.SetStateAction<dragXState.Type>>;
};

export type GlobalContextPrivateType = GlobalContextPublicType & {
  setApiLog: React.Dispatch<React.SetStateAction<apiLogState.Type>>;
  setClientLog: React.Dispatch<React.SetStateAction<clientLogState.Type>>;
  setBootOption: React.Dispatch<React.SetStateAction<bootOptionState.Type>>;
  setDoms: React.Dispatch<React.SetStateAction<domsState.Type>>;
  setIsTune: React.Dispatch<React.SetStateAction<isTuneState.Type>>;
  setScrollHeight: React.Dispatch<React.SetStateAction<scrollHeightState.Type>>;
  setMenuRank: React.Dispatch<React.SetStateAction<menuRankState.Type>>;
  setRankCatched: React.Dispatch<React.SetStateAction<rankCatchedState.Type>>;
  setPostsTimeline: React.Dispatch<React.SetStateAction<postsTimelineState.Type>>;
  setPostsCatched: React.Dispatch<React.SetStateAction<postsCatchedState.Type>>;
  setUiTimeMarker: React.Dispatch<React.SetStateAction<uiTimeMarkerState.Type>>;
  setLayout: React.Dispatch<React.SetStateAction<layoutState.Type>>;
  setBools: React.Dispatch<React.SetStateAction<boolsState.Type>>;
  setRefs: React.Dispatch<React.SetStateAction<refsState.Type>>;
};

export type HookProps = AppProps & GlobalContextPrivateType;

export const GlobalContext = createContext({} as GlobalContextPublicType);

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

/*****************
 * Provider Value
 *****************/

export const useGlobalProviderValue = (props: AppProps): GlobalContextPublicType => {
  const { state } = props;
  const { app, ranks, posts, thread } = state;

  const firstRank = ranks[0] ? ranks[0] : new Post();
  const latestPostIndex = posts.length - 1;
  const latestPost = posts[latestPostIndex] ? posts[latestPostIndex] : new Post();
  const postsCatchedHookKey = `${latestPost._id}_${latestPost.ch}`;

  const [isTune, setIsTune] = useState<isTuneState.Type>(isTuneState.init);
  const [action, setPrivateAction] = useState<actionState.Type>(actionState.init);
  const [apiLog, setApiLog] = useState<apiLogState.Type>(apiLogState.init);
  const [clientLog, setClientLog] = useState<clientLogState.Type>(clientLogState.init);
  const [bootOption, setBootOption] = useState<bootOptionState.Type>(bootOptionState.init);
  const [params, setPrivateParams] = useState<{ [key: string]: string | number }>({});
  const [layout, setLayout] = useState<layoutState.Type>(layoutState.init);
  const [bools, setBools] = useState<boolsState.Type>(boolsState.init);
  const [refs, setRefs] = useState<refsState.Type>(refsState.init);
  const [doms, setDoms] = useState<domsState.Type>(domsState.init);
  const [menuRank, setMenuRank] = useState<menuRankState.Type>(menuRankState.init);
  const [menuMode, setMenuMode] = useState<menuModeState.Type>(menuModeState.init);
  const [scrollLeft, setScrollLeft] = useState<scrollLeftState.Type>(scrollLeftState.init);
  const [dragX, setDragX] = useState<dragXState.Type>(dragXState.init);
  const [detailMode, setDetailMode] = useState<detailModeState.Type>(detailModeState.init);
  const [rankCatched, setRankCatched] = useState<rankCatchedState.Type>(rankCatchedState.init);
  const [postsTimeline, setPostsTimeline] = useState<postsTimelineState.Type>(postsTimelineState.init);
  const [postsCatched, setPostsCatched] = useState<postsCatchedState.Type>(postsCatchedState.init);
  const [scrollTop, setScrollTop] = useState<scrollTopState.Type>(scrollTopState.init);
  const [scrollHeight, setScrollHeight] = useState<scrollHeightState.Type>(scrollHeightState.init);
  const [uiTimeMarker, setUiTimeMarker] = useState<uiTimeMarkerState.Type>(uiTimeMarkerState.init);

  const setAction = (action: actionState.Type, toPrivateParams?: ActionParamsType) => {
    toPrivateParams && setPrivateParams(toPrivateParams);
    setPrivateAction(action);
  };

  const publicValue: GlobalContextPublicType = {
    isTune,
    action,
    apiLog,
    clientLog,
    bootOption,
    layout,
    bools,
    refs,
    doms,
    dragX,
    detailMode,
    menuRank,
    menuMode,
    scrollLeft,
    rankCatched,
    postsTimeline,
    postsCatched,
    scrollTop,
    scrollHeight,
    uiTimeMarker,
    params,
    setAction,
    setMenuMode,
    setDetailMode,
    setScrollTop,
    setScrollLeft,
    setDragX,
  };

  const privateValue: GlobalContextPrivateType = {
    ...publicValue,
    setIsTune,
    setApiLog,
    setClientLog,
    setBootOption,
    setLayout,
    setBools,
    setRefs,
    setDoms,
    setMenuRank,
    setMenuMode,
    setRankCatched,
    setPostsTimeline,
    setPostsCatched,
    setScrollHeight,
    setUiTimeMarker,
  };
  const hookProps = { ...props, ...privateValue };
  useEffect(() => hook.isTune(hookProps), [app.isTune]);
  useEffect(() => hook.apiLog(hookProps), [state.apiLog.length]);
  useEffect(() => hook.clientLog(hookProps), [state.clientLog.length]);
  useEffect(() => hook.action(hookProps), [action]);
  useEffect(() => hook.bootOption(hookProps), [bootOption]);
  useEffect(() => hook.layout(hookProps), [layout]);
  useEffect(() => hook.bools(hookProps), [bools]);
  useEffect(() => hook.refs(hookProps), [{ ...refs }]);
  useEffect(() => hook.doms(hookProps), [{ ...doms }]);
  useEffect(() => hook.dragX(hookProps), [dragX]);
  useEffect(() => hook.detailMode(hookProps), [detailMode]);
  useEffect(() => hook.menuRank(hookProps), [menuRank]);
  useEffect(() => hook.menuMode(hookProps), [menuMode]);
  useEffect(() => hook.rankCatched(hookProps), [firstRank._id]);
  useEffect(() => hook.scrollLeft(hookProps), [scrollLeft]);
  useEffect(() => hook.postsTimeline(hookProps), [postsTimeline]);
  useEffect(() => hook.postsCatched(hookProps), [postsCatchedHookKey]);
  useEffect(() => hook.postsTimeline(hookProps), [postsTimeline]);
  useEffect(() => hook.scrollTop(hookProps), [scrollTop]);
  useEffect(() => hook.scrollHeight(hookProps), [scrollHeight]);
  useEffect(() => hook.uiTimeMarker(hookProps), [uiTimeMarker]);
  useEffect(() => hook.didMount(hookProps), []);

  return publicValue;
};
