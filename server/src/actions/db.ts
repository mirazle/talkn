/*
import industory from 'server/data/industory';
import industoryParent from 'server/data/industoryParent';
import jobCategory from 'server/data/jobCategory';
import jobParent from 'server/data/jobParent';
import jobTerm from 'server/data/jobTerm';
import jobTitle from 'server/data/jobTitle';
import jobs from 'server/data/jobs';
import startupSeries from 'server/data/startupSeries';
import story from 'server/data/story';
*/
import Logics from 'server/logics';

export default {
  setUp: async () => {
    await Logics.db.threads.resetLiveCnt();
    await Logics.db.sessions.removeAll();
    /*
    await Logics.db.industoryParent.removeAll();
    await Logics.db.industoryParent.insertMany(industoryParent);
    await Logics.db.industory.removeAll();
    await Logics.db.industory.insertMany(industory);
    await Logics.db.startupSeries.removeAll();
    await Logics.db.startupSeries.insertMany(startupSeries);
    await Logics.db.jobTerm.removeAll();
    await Logics.db.jobTerm.insertMany(jobTerm);
    await Logics.db.jobTitle.removeAll();
    await Logics.db.jobTitle.insertMany(jobTitle);

    await Logics.db.jobParents.removeAll();
    await Logics.db.jobParents.insertMany(jobParent);
    await Logics.db.jobCategory.removeAll();
    await Logics.db.jobCategory.insertMany(jobCategory);
    await Logics.db.jobs.removeAll();
    await Logics.db.jobs.insertMany(jobs);

    await Logics.db.story.removeAll();
    await Logics.db.story.insertMany(story);
    */
  },

  setUpUser: async () => {
    return await Logics.db.setting.findOne();
  },
};
