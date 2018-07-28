import fs from 'fs';
import User from '~/common/schemas/state/User'
import Thread from '~/common/schemas/state/Thread'
import Sequence from '~/common/Sequence'
import Actions from '~/server/actions';
import Logics from '~/server/logics';
import utils from '~/server/utils';
import Favicon from '~/server/logics/Favicon'

export default {

  setUp: async () => {
    await Logics.db.threads.resetWatchCnt();
    await Logics.db.users.removeAll();
  },

  setUpUser: async () => {
    return await Logics.db.setting.findOne();
  },
}
