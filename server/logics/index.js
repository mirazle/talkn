import Db from './Db';
import Io from './Io';
import Request from './Request';

import MongoDB from '~/db/MongoDB';
import SocketIo from '~/io/SocketIo';

const mongoDB = new MongoDB();
const socketIo = new SocketIo();

export default {
  db: new Db( mongoDB ),
  io: new Io( socketIo ),
  request: new Request(),
}
