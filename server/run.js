/**************************************/
/*  talknServer
/* ( MONGODB /  SOCKET.IO / REDIS / EXPRESS )
/**************************************/

import Actions from '~/actions';

class TalknServer{
  async start(){
    await Actions.setUpDB();
    await Actions.setUpAPI();
    await Actions.setUpExpress();
  }
}

const talknServer = new TalknServer();
talknServer.start();
