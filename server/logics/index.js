import App from './App';
import Db from './db';
import Io from './Io';
import Html from './Html';
import Favicon from './Favicon';
import Fs from './Fs';
import Control from './Control';
import Passport from './Passport';

import MongoDB from '~/listens/db/MongoDB';
import SocketIo from '~/listens/io/SocketIo';
const mongoDB = new MongoDB();
const socketIo = new SocketIo();

export default {
  app: new App(),
  db: new Db( mongoDB ),
  io: new Io( socketIo ),
  html: new Html(),
  favicon: new Favicon(),
  fs: new Fs(),
  control: new Control(),
  passport: new Passport(),
}
