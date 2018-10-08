import Logics from '~/server/logics';

export default {

  setUp: async () => {
    await Logics.db.threads.resetWatchCnt();
    await Logics.db.users.removeAll();
  },

  setUpUser: async () => {
    return await Logics.db.setting.findOne();
  },
}
