import define from "common/define";
import App from "common/schemas/state/App";
import Ui from "common/schemas/state/Ui";
import UiTimeMarker from "common/schemas/state/UiTimeMarker";
import User from "common/schemas/state/User";
import MenuIndex from "common/schemas/state/MenuIndex";
import MenuLogs from "common/schemas/state/MenuLogs";
import ActionLogs from "common/schemas/state/ActionLogs";
import Post from "common/schemas/state/Post";
import Posts from "common/schemas/state/Posts";
import Analyze from "common/schemas/state/Analyze";
import BootOption from "common/schemas/state/BootOption";
import Thread from "common/schemas/state/Thread";
import Setting from "common/schemas/state/Setting";
import Style from "common/schemas/state/Style";
import ActionLog from "common/schemas/state/ActionLogs";

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
  constructor(talknIndex: any, window: any, bootOption: any = {}, initialApp: any = {}, caches: any = {}) {
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
    this.app = new App(State.getAppParams(talknIndex, this.thread, this.bootOption, initialApp, caches));
    this.ui = new Ui(State.getAppParams(talknIndex, this.thread, this.bootOption, initialApp, caches));
    this.uiTimeMarker = new UiTimeMarker();
    this.user = new User(State.getUserParams(this, caches));
    this.style = new Style(this);
    this.actionLog = new ActionLog();
  }

  static getAppParams(talknIndex, thread, bootOption, initialApp, caches) {
    return {
      isTransition: true,
      talknIndex,
      rootTitle: thread.title,
      ...bootOption,
      ...initialApp,
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
