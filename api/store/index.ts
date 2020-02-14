import App from "api/store/App";
import Ui from "api/store/Ui";
import UiTimeMarker from "api/store/UiTimeMarker";
import User from "api/store/User";
import MenuIndex from "api/store/MenuIndex";
import MenuLogs from "api/store/MenuLogs";
import ActionLogs from "api/store/ActionLogs";
import Posts from "api/store/Posts";
import Analyze from "api/store/Analyze";
import BootOption from "api/store/BootOption";
import Thread from "api/store/Thread";
import Setting from "api/store/Setting";
import Style from "api/store/Style";
import ActionLog from "api/store/ActionLogs";

export default class State {
  menuIndex: MenuIndex;
  menuLogs: MenuLogs;
  ActionLogs: ActionLogs;
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
  setting: Setting;
  app: App;
  ui: Ui;
  uiTimeMarker: UiTimeMarker;
  user: User;
  style: Style;
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
    this.setting = new Setting(caches.setting);
    this.app = new App(State.getAppParams(this.thread, this.bootOption, caches));
    this.ui = new Ui(State.getAppParams(this.thread, this.bootOption, caches));
    this.uiTimeMarker = new UiTimeMarker();
    this.user = new User(State.getUserParams(this, caches));
    this.style = new Style(this);
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
