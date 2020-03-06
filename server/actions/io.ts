import Sequence from "common/Sequence";
import Thread from "api/store/Thread";
import Collections from "server/logics/db/collections/";
import Logics from "server/logics";
import Actions from "server/actions";
import tests from "server/utils/testRequestState";

export default {
  setUp: async () => {
    const io = await Logics.io.get();
    return io.on("connection", Actions.io.attachAPI);
  },

  attachAPI: async ioUser => {
    const setting = await Actions.db.setUpUser();
    Object.keys(Sequence.map).forEach(endpoint => {
      const oneSequence = Sequence.map[endpoint];
      ioUser.on(endpoint, requestState => {
        console.log("------------------------------- " + endpoint);
        console.log(requestState);
        Actions.io[endpoint](ioUser, requestState, setting);
      });
    });
    Logics.io.connectionServer(ioUser);
  },

  tuned: (ioUser, requestState, setting) => {
    Logics.db.users.update(ioUser.conn.id, requestState.thread.ch);
    Logics.io.tuned(ioUser, requestState, setting);
    return true;
  },

  find: async (ioUser, requestState, setting) => {
    Actions.io.exeFind(ioUser, requestState, setting);
  },

  getMore: async (ioUser, requestState, setting) => {
    let { app } = requestState;
    const { ch } = requestState.thread;
    let thread = { ch };
    const isMultistream = Thread.getStatusIsMultistream(app);
    const postCntKey = isMultistream ? "multiPostCnt" : "postCnt";
    thread[postCntKey] = await Logics.db.posts.getCounts(requestState, {
      isMultistream
    });
    const { response: posts } = await Logics.db.posts.find(requestState, setting, { isMultistream, getMore: true });
    app = Collections.getNewApp(requestState.type, app, thread, posts);
    Logics.io.getMore(ioUser, { requestState, thread, posts, app });
  },

  changeThread: async (ioUser, requestState, setting) => {
    const tuned = requestState.app.tuned;

    if (tuned !== "") {
      const ch = requestState.thread.ch;

      const thread = await Logics.db.threads.saveOnWatchCnt({ ch: tuned }, -1);

      // ユーザーの接続情報を更新
      Logics.db.users.update(ioUser.conn.id, ch);

      // 配信
      Logics.io.changeThread(ioUser, {
        requestState,
        thread,
        app: {
          tuned: ch
        }
      });
    }

    requestState.type = "find";
    await Actions.io.exeFind(ioUser, requestState, setting);
  },

  exeFind: async (ioUser, requestState, setting) => {
    let { app } = requestState;

    // リクエストのあったchを取得する
    const { ch } = requestState.thread;

    // Thread
    let { response: thread } = await Logics.db.threads.findOne(ch, {}, {}, true);

    thread.hasSlash = requestState.thread.hasSlash;

    // Threadの状態
    const threadStatus = Thread.getStatus(thread, app, setting);

    // Posts
    const postCntKey = threadStatus.isMultistream ? "multiPostCnt" : "postCnt";
    thread[postCntKey] = await Logics.db.posts.getCounts(requestState, threadStatus);
    const { response: posts } = await Logics.db.posts.find(requestState, setting, threadStatus);

    // appの状況を更新する
    app = Collections.getNewApp(requestState.type, app, threadStatus, thread, posts);

    // 作成・更新が必要なスレッドの場合
    if (threadStatus.isRequireUpsert) {
      thread = await Logics.db.threads.requestHtmlParams(thread, requestState);

      // スレッド新規作成
      if (threadStatus.isSchema) {
        thread = await Logics.db.threads.save(thread);
        Logics.io.find(ioUser, { requestState, thread, posts, app });
        // スレッド更新
      } else {
        thread = await Logics.db.threads.saveOnWatchCnt(thread, +1);
        Logics.io.find(ioUser, { requestState, thread, posts, app });
      }

      // スレッドが存在して、更新も必要ない場合
    } else {
      // Multistreamボタンを押した場合
      if (!threadStatus.isToggleMultistream) {
        thread = await Logics.db.threads.saveOnWatchCnt(thread, +1);
      }
      Logics.io.find(ioUser, { requestState, thread, posts, app });
    }
  },

  changeThreadDetail: async (ioUser, requestState, setting) => {
    const { ch } = requestState.thread;
    let { response: thread } = await Logics.db.threads.findOne(ch, {}, {}, true);
    await Logics.io.changeThreadDetail(ioUser, { requestState, thread });
  },

  findMenuIndex: async (ioUser, requestState, setting) => {
    const menuIndex = await Logics.db.threads.findMenuIndex(requestState, setting);
    Logics.io.findMenuIndex(ioUser, { requestState, menuIndex });
  },

  post: async (ioUser, requestState, setting) => {
    const { app } = requestState;
    const { ch, emotions } = requestState.thread;
    const thread = { ch, emotions };
    const isMultistream = Thread.getStatusIsMultistream(app);
    const post = await Logics.db.posts.save(requestState);
    const emotionKeys = Object.keys(emotions);

    let set = { $inc: { postCnt: 1 }, lastPost: post };
    if (emotionKeys.length > 0) {
      emotionKeys.forEach(emotionModelKey => {
        Object.keys(emotions[emotionModelKey]).forEach(emotionKey => {
          set["$inc"][`emotions.${emotionModelKey}.${emotionKey}`] = emotions[emotionModelKey][emotionKey];
        });
      });
    }
    const response = await Logics.db.threads.update(ch, set);
    const postCntKey = isMultistream ? "multiPostCnt" : "postCnt";
    thread[postCntKey] = await Logics.db.posts.getCounts(requestState, {
      isMultistream
    });
    await Logics.io.post(ioUser, { requestState, posts: [post], thread });
    return true;
  },

  updateThread: async (ioUser, requestState, setting) => {
    const { ch } = requestState.thread;
    let { response: thread } = await Logics.db.threads.findOne(ch, {}, {}, true);
    const isMultistream = false;
    const isMediaCh = Thread.getStatusIsMediaCh(ch);
    thread.postCnt = await Logics.db.posts.getCounts(requestState, {
      isMediaCh,
      isMultistream
    });
    thread = await Logics.db.threads.requestHtmlParams(thread, requestState);
    thread = await Logics.db.threads.save(thread);
    Logics.io.updateThread(ioUser, { requestState, thread });
    return true;
  },

  updateThreadServerMetas: async (ioUser, requestState, setting) => {
    const { ch } = requestState.thread;
    const { response: baseThread } = await Logics.db.threads.findOne(ch);
    const serverMetas = await Logics.db.threads.updateServerMetas(ch, baseThread, requestState.thread);
    await Logics.io.updateThreadServerMetas(ioUser, {
      requestState,
      thread: { serverMetas }
    });
    return true;
  },

  disconnect: async (ioUser, requestState, setting) => {
    const { response: user } = await Logics.db.users.findOne(ioUser.conn.id);

    if (user && user.ch) {
      // ユーザーデータ削除
      await Logics.db.users.remove(ioUser.conn.id);

      // userコレクションからwatchCntの実数を取得(thread.watchCntは読み取り専用)
      const watchCnt = await Logics.db.users.getChCnt(user.ch);
      const thread = await Logics.db.threads.saveOnWatchCnt({ ch: user.ch }, watchCnt, true);

      // 配信
      Logics.io.saveOnWatchCnt(ioUser, {
        requestState: { type: "disconnect" },
        thread
      });
    }
    return true;
  },

  testAPI: (ioUser, setting) => {
    if (Object.keys(tests).length > 0) {
      let { chs, state } = tests.find();

      chs.forEach((ch, index) => {
        const requestState = {
          ...state,
          thread: { ...state.thread, ch }
        };
        Actions.io["find"](ioUser, requestState, setting);
      });
    }
  }
};
