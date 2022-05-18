import Industory from 'server/schemas/db/collections/Industory';
import IndustoryParent from 'server/schemas/db/collections/IndustoryParent';
import JobCategory from 'server/schemas/db/collections/JobCategory';
import JobParents from 'server/schemas/db/collections/JobParents';
import JobTerm from 'server/schemas/db/collections/JobTerm';
import JobTitle from 'server/schemas/db/collections/JobTitle';
import Jobs from 'server/schemas/db/collections/Jobs';
import Posts from 'server/schemas/db/collections/Posts';
import Sessions from 'server/schemas/db/collections/Sessions';
import Setting from 'server/schemas/db/collections/Setting';
import StartupSeries from 'server/schemas/db/collections/StartupSeries';
import Story from 'server/schemas/db/collections/Story';
import Threads from 'server/schemas/db/collections/Threads';
import UserTags from 'server/schemas/db/collections/UserTags';
import Users from 'server/schemas/db/collections/Users';
import html from 'server/schemas/logics/html';

export default {
  db: {
    collections: {
      Users,
      UserTags,
      Posts,
      Setting,
      Threads,
      Sessions,
      IndustoryParent,
      Industory,
      StartupSeries,
      JobTerm,
      JobTitle,
      JobParents,
      JobCategory,
      Jobs,
      Story,
    },
  },
  logics: {
    html,
  },
};
