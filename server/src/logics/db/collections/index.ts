import Industory from 'server/logics/db/collections/Industory';
import IndustoryParent from 'server/logics/db/collections/IndustoryParent';
import JobCategory from 'server/logics/db/collections/JobCategory';
import JobParents from 'server/logics/db/collections/JobParents';
import JobTerm from 'server/logics/db/collections/JobTerm';
import JobTitle from 'server/logics/db/collections/JobTitle';
import Jobs from 'server/logics/db/collections/Jobs';
import Posts from 'server/logics/db/collections/Posts';
import Sessions from 'server/logics/db/collections/Sessions';
import Setting from 'server/logics/db/collections/Setting';
import StartupSeries from 'server/logics/db/collections/StartupSeries';
import Story from 'server/logics/db/collections/Story';
import Threads from 'server/logics/db/collections/Threads';
import User from 'server/logics/db/collections/User';
import UserTags from 'server/logics/db/collections/UserTags';

import App from 'api/store/App';

export default class Collections {
  user: User;
  userTags: UserTags;
  threads: Threads;
  posts: Posts;
  setting: Setting;
  sessions: Sessions;
  startupSeries: StartupSeries;
  story: Story;
  industoryParent: IndustoryParent;
  industory: Industory;
  jobTerm: JobTerm;
  jobTitle: JobTitle;
  jobParents: JobParents;
  jobCategory: JobCategory;
  jobs: Jobs;
  constructor(mongoDB) {
    this.user = new User(mongoDB.User);
    this.userTags = new UserTags(mongoDB.UserTags);
    this.threads = new Threads(mongoDB.Threads);
    this.posts = new Posts(mongoDB.Posts);
    this.setting = new Setting(mongoDB.Setting);
    this.sessions = new Sessions(mongoDB.Sessions);

    this.industoryParent = new IndustoryParent(mongoDB.IndustoryParent);
    this.industory = new Industory(mongoDB.Industory);
    this.startupSeries = new StartupSeries(mongoDB.StartupSeries);
    this.jobTerm = new JobTerm(mongoDB.JobTerm);
    this.jobTitle = new JobTerm(mongoDB.JobTitle);
    this.jobParents = new JobParents(mongoDB.JobParents);
    this.jobCategory = new JobCategory(mongoDB.JobCategory);
    this.jobs = new Jobs(mongoDB.Jobs);
    this.story = new Story(mongoDB.Story);
    return this;
  }

  static getNewApp(type, app, threadStatus, thread, posts = []) {
    app = new App({ ...app, rootCh: thread.ch });
    const tuned = thread.ch;
    let dispThreadType = '';

    if (type === 'getMore') {
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
