import { combineReducers } from "redux";
import app from "./app";
import user from "./user";
import tuneCh from "./tuneCh";
import ranks from "./ranks";
import thread from "./thread";
import threads from "./threads";
import threadDetail from "./threadDetail";
import analyze from "./analyze";
import bootOption from "./bootOption";
import setting from "./setting";
import posts from "./posts";
import postsTimeline from "./postsTimeline";
import postsTimelineStock from "./postsTimelineStock";
import postsTimelineZero from "./postsTimelineZero";
import postsTimelineZeroAfter from "./postsTimelineZeroAfter";
import postsMulti from "./postsMulti";
import postsSingle from "./postsSingle";
import postsChild from "./postsChild";
import actioned from "./actioned";

export const reducerFiles = {
  app,
  user,
  tuneCh,
  ranks,
  thread,
  threads,
  threadDetail,
  analyze,
  bootOption,
  setting,
  posts,
  postsTimeline,
  postsTimelineStock,
  postsTimelineZero,
  postsTimelineZeroAfter,
  postsMulti,
  postsSingle,
  postsChild,
  actioned,
};

export default combineReducers(reducerFiles);
