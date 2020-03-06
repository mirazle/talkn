import { combineReducers } from "redux";
import app from "./app";
import user from "./user";
import menuIndex from "./menuIndex";
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
import actionLog from "./actionLog";

const reducers = combineReducers({
  app,
  user,
  menuIndex,
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
  actionLog
});

export default reducers;
