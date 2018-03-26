import Db from './db';
import Io from './Io';
import Html from './Html';
import Favicon from './Favicon';
import Fs from './Fs';
import Control from './Control';
import Login from './Login';
import endpoints from './endpoints';

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
  control: new Control(),
  login: new Login(),
  endpoints,
}
