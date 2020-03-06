import App from "api/store/App";
import User from "api/store/User";
import MenuIndex from "api/store/MenuIndex";
import MenuLogs from "api/store/MenuLogs";
import Posts from "api/store/Posts";
import Analyze from "api/store/Analyze";
import BootOption from "api/store/BootOption";
import Thread from "api/store/Thread";
import ActionLog from "api/store/ActionLogs";

export default class ApiState {
  menuIndex: MenuIndex;
  menuLogs: MenuLogs;
  posts: Posts;
  postsMulti: Posts;
  postsSingle: Posts;
  postsChild: Posts;
  postsTimeline: Posts;
  postsLogs: Posts;
  analyze: Analyze;
  bootOption: BootOption;
  threads: [Thread];
  thread: Thread;
  threadDetail: Thread;
  app: App;
  user: User;
  actionLog: ActionLog;
  constructor(window: any, bootOption: any = {}, caches: any = {}) {
    this.menuIndex = new MenuIndex();
    this.menuLogs = new MenuLogs(caches.menuLogs);
    this.posts = new Posts();
    this.postsMulti = new Posts();
    this.postsSingle = new Posts();
    this.postsChild = new Posts();
    this.postsTimeline = new Posts();
    this.postsLogs = new Posts();
    this.analyze = new Analyze();
    this.bootOption = new BootOption(bootOption);
    this.thread = new Thread(window, this.bootOption, caches.thread);
    this.threadDetail = new Thread(window, this.bootOption, caches.thread);
    this.app = new App(ApiState.getAppParams(this.thread, this.bootOption, caches));
    this.user = new User(ApiState.getUserParams(this, caches));
    this.actionLog = new ActionLog();
  }

  static getAppParams(thread, bootOption, caches) {
    return {
      isTransition: true,
      rootTitle: thread.title,
      ...bootOption,
      ...thread
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

  get appName() {
    return this.app.name;
  }

  get talknIndex() {
    return this.app.talknIndex;
  }

  get ch() {
    return this.thread.ch;
  }
}
