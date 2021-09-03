import Logics from 'server/logics';

export default {
  setUp: async () => {
    await Logics.db.threads.resetLiveCnt();
    await Logics.db.users.removeAll();
  },

  setUpUser: async () => {
    return await Logics.db.setting.findOne();
  },
};
