import Sequence from 'common/Sequence';

import Actions from 'server/actions';
import Logics from 'server/logics';
import Collections from 'server/logics/db/collections/';
import tests from 'server/utils/testRequestState';

import Thread from 'api/store/Thread';

export default {
  setUp: async () => {
    const io = await Logics.io.get();
    return io.on('connection', Actions.io.attachAPI);
  },

  attachAPI: async (ioUser, tt) => {
    const setting = await Actions.db.setUpUser();
    Object.keys(Sequence.map).forEach((endpoint) => {
      const oneSequence = Sequence.map[endpoint];
      ioUser.on(endpoint, (requestState) => {
        console.log('------------------------------- ' + endpoint);
        //        console.log(requestState);

        Actions.io[endpoint](ioUser, requestState, setting);
      });
    });
    const { ch, hasSlash, protocol, host } = ioUser.handshake.query;
    const thread = { ch, hasSlash, protocol, host };
    const requestState = { thread, type: 'tune' };
    Actions.io.tune(ioUser, requestState, setting);
  },

  tune: async (ioUser, requestState, setting) => {
    const requestThread = requestState.thread;
    const { ch } = requestThread;

    // sessions.
    const liveCnt = await Logics.db.sessions.getIncLiveCnt(ioUser.conn.id, ch);

    // update thread rank.
    let { thread, isExist } = await Logics.db.threads.tune({ ch }, liveCnt, true);
    requestState.thread = thread;
    const isRequireUpsert = Thread.getStatusIsRequireUpsert(thread, isExist);

    // 作成・更新が必要なスレッドの場合
    if (isRequireUpsert) {
      thread = await Logics.db.threads.requestHtmlParams(thread, requestThread);
      // スレッド新規作成
      if (!isExist) {
        thread = await Logics.db.threads.save(thread);
        Logics.io.tune(ioUser, requestState, setting);
        // スレッド更新
      } else {
        Logics.io.tune(ioUser, requestState, setting);
      }

      // スレッドが存在して、更新も必要ない場合
    } else {
      Logics.io.tune(ioUser, requestState, setting);
    }
  },

  fetchPosts: async (ioUser, requestState, setting) => {
    Actions.io.exeFetchPosts(ioUser, requestState, setting);
  },

  getMore: async (ioUser, requestState, setting) => {
    let { app } = requestState;
    const { ch } = requestState.thread;
    let thread = { ch };
    const threadStatus = Thread.getStatus(thread, app, true);
    threadStatus.getMore = true;
    const postCntKey = threadStatus.isMultistream ? 'multiPostCnt' : 'postCnt';
    thread[postCntKey] = await Logics.db.posts.getCounts(requestState, threadStatus);

    const { response: posts } = await Logics.db.posts.find(requestState, setting, threadStatus);
    app = Collections.getNewApp(requestState.type, app, thread, posts);
    Logics.io.getMore(ioUser, { requestState, thread, posts, app });
  },

  changeThread: async (ioUser, requestState, setting) => {
    // Old Thread.
    Logics.db.sessions.remove(ioUser.conn.id);
    const oldCh = requestState.app.tunedCh;
    const { thread: oldThread } = await Logics.db.threads.tune({ ch: oldCh }, -1);

    // New thread.
    const newCh = requestState.thread.ch;
    const liveCnt = await Logics.db.sessions.getIncLiveCnt(ioUser.conn.id, newCh);
    const { thread: newThread } = await Logics.db.threads.tune({ ch: newCh }, liveCnt, true);

    // Resolve Sessions.
    Logics.db.sessions.getIncLiveCnt(ioUser.conn.id, newCh);

    // 古いthreadのliveCntが減った通知をBroardcasrtする
    // 新しいthreadのliveCntが増えた通知をBroardcasrtする
    // 新しいthread情報をEmitする
    Logics.io.changeThread(ioUser, {
      requestState,
      oldThread,
      newThread,
    });

    // Postsを解決(exeFetchPosts).
    requestState.thread = newThread;
    Actions.io.exeFetchPosts(ioUser, { ...requestState, type: 'fetchPosts' }, setting);
  },

  exeFetchPosts: async (ioUser, requestState, setting) => {
    const { ch } = requestState.thread;
    let { app } = requestState;

    // Thread
    let { response: thread, isExist } = await Logics.db.threads.findOne(ch, { buildinSchema: true });
    thread.hasSlash = requestState.thread.hasSlash;
    const threadStatus = Thread.getStatus(thread, app, isExist);

    // Posts
    const postCntKey = threadStatus.isMultistream ? 'multiPostCnt' : 'postCnt';
    thread[postCntKey] = await Logics.db.posts.getCounts(requestState, threadStatus);
    const { response: posts } = await Logics.db.posts.find(requestState, setting, threadStatus);

    // App.
    app = Collections.getNewApp(requestState.type, app, threadStatus, thread, posts);

    Logics.io.fetchPosts(ioUser, { requestState, thread, posts, app });
  },

  changeThreadDetail: async (ioUser, requestState) => {
    const { ch } = requestState.thread;
    let { response: thread } = await Logics.db.threads.findOne(ch, { buildinSchema: true });
    await Logics.io.changeThreadDetail(ioUser, { requestState, thread });
  },

  rank: async (ioUser, requestState, setting) => {
    const rank = await Logics.db.threads.rank(requestState, setting);
    Logics.io.rank(ioUser, { requestState, rank });
  },

  post: async (ioUser, requestState) => {
    const { app } = requestState;
    const { ch, emotions } = requestState.thread;
    const thread = { ch, emotions };
    const threadStatus = Thread.getStatus(thread, app, true);
    const post = await Logics.db.posts.save(requestState);
    const emotionKeys = emotions ? Object.keys(emotions) : [];
    console.log('DEBUG', app.inputPost);
    let set = { $inc: { postCnt: 1 }, lastPost: post };
    if (emotionKeys.length > 0) {
      emotionKeys.forEach((emotionModelKey) => {
        Object.keys(emotions[emotionModelKey]).forEach((emotionKey) => {
          set['$inc'][`emotions.${emotionModelKey}.${emotionKey}`] = emotions[emotionModelKey][emotionKey];
        });
      });
    }
    const response = await Logics.db.threads.update(ch, set);
    const postCntKey = threadStatus.isMultistream ? 'multiPostCnt' : 'postCnt';
    thread[postCntKey] = await Logics.db.posts.getCounts(requestState, threadStatus);
    await Logics.io.post(ioUser, { requestState, posts: [post], thread });
  },

  updateThread: async (ioUser, requestState) => {
    const { ch } = requestState.thread;
    let { response: thread } = await Logics.db.threads.findOne(ch, { buildinSchema: true });
    const isMultistream = false;
    const isMediaCh = Thread.getStatusIsMediaCh(ch);
    thread.postCnt = await Logics.db.posts.getCounts(requestState, {
      isMediaCh,
      isMultistream,
    });
    thread = await Logics.db.threads.requestHtmlParams(thread, requestState.thread);
    thread = await Logics.db.threads.save(thread);
    Logics.io.updateThread(ioUser, { requestState, thread });
    return true;
  },

  updateThreadServerMetas: async (ioUser, requestState) => {
    const { ch } = requestState.thread;
    const { response: baseThread } = await Logics.db.threads.findOne(ch);
    const serverMetas = await Logics.db.threads.updateServerMetas(ch, baseThread, requestState.thread);
    await Logics.io.updateThreadServerMetas(ioUser, {
      requestState,
      thread: { ch, serverMetas },
    });
    return true;
  },

  disconnect: async (ioUser) => {
    const { response: user } = await Logics.db.sessions.findOne(ioUser.conn.id);
    if (user && user.ch) {
      // ユーザーデータ削除

      await Logics.db.sessions.remove(ioUser.conn.id);
      // userコレクションからliveCntの実数を取得(thread.liveCntは読み取り専用)
      const liveCnt = await Logics.db.sessions.getLiveCnt(user.ch);
      const { thread } = await Logics.db.threads.tune({ ch: user.ch }, liveCnt, true);
      Logics.io.disconnect(ioUser, {
        requestState: { type: 'disconnect' },
        thread,
      });
    }
    return true;
  },

  testAPI: (ioUser, setting) => {
    if (Object.keys(tests).length > 0) {
      let { chs, state } = tests.find();

      chs.forEach((ch) => {
        const requestState = {
          ...state,
          thread: { ...state.thread, ch },
        };
        Actions.io['find'](ioUser, requestState, setting);
      });
    }
  },
};
