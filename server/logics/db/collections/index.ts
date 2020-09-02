import App from "api/store/App";
import Threads from "server/logics/db/collections/Threads";
import Posts from "server/logics/db/collections/Posts";
import Setting from "server/logics/db/collections/Setting";
import Users from "server/logics/db/collections/Users";

export default class Collections {
  threads: Threads;
  posts: Posts;
  setting: Setting;
  users: Users;
  constructor(mongoDB) {
    this.threads = new Threads(mongoDB.Threads);
    this.posts = new Posts(mongoDB.Posts);
    this.setting = new Setting(mongoDB.Setting);
    this.users = new Users(mongoDB.Users);
    return this;
  }

  static getNewApp(type, app, threadStatus, thread, posts = []) {
    app = new App({ ...app, rootCh: thread.ch });
    const tuned = thread.ch;
    let dispThreadType = "";

    if (type === "getMore") {
      dispThreadType = app.dispThreadType;
    } else {
      const { stepTo } = App.getStepToDispThreadType({ app }, threadStatus, thread.ch);
      switch (stepTo) {
        case `${App.dispThreadTypeTimeline} to ${App.dispThreadTypeMulti}`:
          dispThreadType = App.dispThreadTypeMulti;
          break;
        case `${App.dispThreadTypeTimeline} to ${App.dispThreadTypeTimeline}`:
          dispThreadType = App.dispThreadTypeTimeline;
          break;
        case `${App.dispThreadTypeMulti} to ${App.dispThreadTypeMulti}`:
          dispThreadType = App.dispThreadTypeMulti;
          break;
        case `${App.dispThreadTypeMulti} to ${App.dispThreadTypeTimeline}`:
          dispThreadType = App.dispThreadTypeTimeline;
          break;
        case `${App.dispThreadTypeMulti} to ${App.dispThreadTypeChild}`:
          dispThreadType = App.dispThreadTypeChild;
          break;
        case `${App.dispThreadTypeSingle} to ${App.dispThreadTypeChild}`:
          dispThreadType = App.dispThreadTypeChild;
          break;
        case `${App.dispThreadTypeChild} to ${App.dispThreadTypeMulti}`:
          dispThreadType = App.dispThreadTypeMulti;
          break;
        case `${App.dispThreadTypeChild} to ${App.dispThreadTypeSingle}`:
          dispThreadType = App.dispThreadTypeSingle;
          break;
        case `${App.dispThreadTypeChild} to ${App.dispThreadTypeChild}`:
          dispThreadType = App.dispThreadTypeChild;
          break;
        case `${App.dispThreadTypeSingle} to ${App.dispThreadTypeSingle}`:
          dispThreadType = App.dispThreadTypeSingle;
          break;
        case `${App.dispThreadTypeSingle} to ${App.dispThreadTypeMulti}`:
          dispThreadType = App.dispThreadTypeMulti;
          break;
      }
    }

    const offsetFindId = App.getOffsetFindId({ posts });
    return {
      ...app,
      tuned,
      offsetFindId,
      dispThreadType,
    };
  }
}
