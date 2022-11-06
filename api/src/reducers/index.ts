import { combineReducers } from 'redux';

import analyze from './analyze';
import apiLog from './apiLog';
import app from './app';
import bootOption from './bootOption';
import posts from './posts';
import postsChild from './postsChild';
import postsMulti from './postsMulti';
import postsSingle from './postsSingle';
import postsTimeline from './postsTimeline';
import postsTimelineStock from './postsTimelineStock';
import postsTimelineZero from './postsTimelineZero';
import postsTimelineZeroAfter from './postsTimelineZeroAfter';
import ranks from './ranks';
import setting from './setting';
import thread from './thread';
import threadDetail from './threadDetail';
import threads from './threads';
import tuneCh from './tuneCh';
import user from './user';

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
  apiLog,
};

export default combineReducers(reducerFiles);
