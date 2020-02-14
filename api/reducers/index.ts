import { combineReducers } from "redux";
import app from "./app";
import ui from "./ui";
import user from "./user";
import menuIndex from "./menuIndex";
import menuLogs from "./menuLogs";
import thread from "./thread";
import threads from "./threads";
import threadDetail from "./threadDetail";
import analyze from "./analyze";
import bootOption from "./bootOption";
import setting from "./setting";
import posts from "./posts";
import postsTimeline from "./postsTimeline";
import postsMulti from "./postsMulti";
import postsSingle from "./postsSingle";
import postsChild from "./postsChild";
import uiTimeMarker from "./uiTimeMarker";
import style from "./style";
import componentDidMounts from "./componentDidMounts";
import actionLog from "./actionLog";
export const list = {
  app,
  ui,
  user,
  menuIndex,
  menuLogs,
  thread,
  threads,
  threadDetail,
  analyze,
  bootOption,
  setting,
  posts,
  postsTimeline,
  postsMulti,
  postsSingle,
  postsChild,
  uiTimeMarker,
  style,
  componentDidMounts,
  actionLog
};
const reducers = combineReducers(list);

export default reducers;
