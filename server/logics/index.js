import Db from './Db';
import Io from './Io';
import Html from './Html';
import Favicon from './Favicon';
import Fs from './Fs';

import MongoDB from '~/db/MongoDB';
import SocketIo from '~/io/SocketIo';
const mongoDB = new MongoDB();
const socketIo = new SocketIo();

export default {
  db: new Db( mongoDB ),
  io: new Io( socketIo ),
  html: new Html(),
  favicon: new Favicon(),
  fs: new Fs(),
}
