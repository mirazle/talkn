import App from "api/store/App";
import User from "api/store/User";
import Ranks from "api/store/Ranks";
import MenuLogs from "api/store/MenuLogs";
import Posts from "api/store/Posts";
import PostsTimeline from "api/store/PostsTimeline";
import PostsTimelineStock from "api/store/PostsTimelineStock";
import Analyze from "api/store/Analyze";
import BootOption from "api/store/BootOption";
import Thread from "api/store/Thread";
import ActionLog from "api/store/ActionLogs";

export default class ApiState {
  ranks: Ranks;
  menuLogs: MenuLogs;
  posts: Posts;
  postsMulti: Posts;
  postsSingle: Posts;
  postsChild: Posts;
  postsTimeline: PostsTimeline;
  postsTimelineStock: PostsTimelineStock;
  postsLogs: Posts;
  analyze: Analyze;
  bootOption: BootOption;
  threads: [Thread];
  thread: Thread;
  threadDetail: Thread;
  app: App;
  user: User;
  actionLog: ActionLog;
  constructor(bootOption: any = {}, caches: any = {}) {
    this.ranks = new Ranks();
    this.menuLogs = new MenuLogs(caches.menuLogs);
    this.posts = new Posts();
    this.postsMulti = new Posts();
    this.postsSingle = new Posts();
    this.postsChild = new Posts();
    this.postsTimeline = new PostsTimeline();
    this.postsTimelineStock = new PostsTimelineStock();
    this.postsLogs = new Posts();
    this.analyze = new Analyze();
    this.bootOption = new BootOption(bootOption);
    this.thread = new Thread(this.bootOption, caches.thread);
    this.threadDetail = new Thread(this.bootOption, caches.thread);
    this.app = new App(ApiState.getAppParams(this.thread, this.bootOption, caches));
    this.user = new User(ApiState.getUserParams(this, caches));
    this.actionLog = new ActionLog();
  }

  static getAppParams(thread, bootOption, caches) {
    return {
      isTransition: true,
      rootTitle: thread.title,
      ...bootOption,
      ...thread,
    };
  }

  static getUserParams(self, caches) {
    if (caches && caches.user && caches.user.uid) {
      return { ...caches.user };
    } else {
      const dispThreadType = self.thread.ch === self.app.rootCh ? App.dispThreadTypeMulti : App.dispThreadTypeSingle;
      return { dispThreadType };
    }
  }

  get ch() {
    return this.thread.ch;
  }
}
