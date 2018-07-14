import express from '~/server/logics/express';
import sns from '~/server/logics/sns';
import Db from '~/server/logics/db';
import Io from '~/server/logics/Io';
import Html from '~/server/logics/Html';
import Favicon from '~/server/logics/Favicon';
import Fs from '~/server/logics/Fs';
import Control from '~/server/logics/Control';
import Passport from '~/server/logics/Passport';

import MongoDB from '~/server/listens/db/MongoDB';
import SocketIo from '~/server/listens/io/SocketIo';
const mongoDB = new MongoDB();
const socketIo = new SocketIo();

export default {
  express: express,
  sns: new sns(),
  db: new Db( mongoDB ),
  io: new Io( socketIo ),
  html: new Html(),
  favicon: new Favicon(),
  fs: new Fs(),
  control: new Control(),
  passport: new Passport(),
}
