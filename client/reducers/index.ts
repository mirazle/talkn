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
import { list } from "api/reducers";

const reducers = combineReducers({
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
});

export default reducers;

/*

export default (state = [], action) => [action.type, ...state];





*/
function getReduceObj(some: string) {
  return (state = {}, action: any) => {
    return action[some] ? { ...action[some] } : state;
  };
}

function getReduceArray(some: string) {
  return (state = {}, action: any) => {
    return action[some] ? [...action[some]] : state;
  };
}
