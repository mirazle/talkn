/**************************************/
/*  talknServer
/* ( MONGODB /  SOCKET.IO / REDIS / EXPRESS )
/**************************************/

import Actions from '~/server/actions';

class TalknServer{
  async start(){
    await Actions.db.setUp();
    await Actions.io.setUp();
    await Actions.express.setUp();
  }
}

const talknServer = new TalknServer();
talknServer.start();
