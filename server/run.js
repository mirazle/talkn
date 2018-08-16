/**************************************/
/*  talknServer
/* ( MONGODB /  SOCKET.IO / REDIS / EXPRESS )
/**************************************/

import Actions from '~/server/actions';

class TalknServer{

  async start(){
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
    await Actions.db.setUp();
    await Actions.io.setUp();
    await Actions.express.setUp();
  }
}

const talknServer = new TalknServer();
talknServer.start();
