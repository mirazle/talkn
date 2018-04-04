/**************************************/
/*  talknServer
/* ( SOCKET.IO / MONGODB / REDIS )
/**************************************/

import Actions from '~/actions';

class TalknServer{
  async start(){
    await Actions.setUpDB();
    await Actions.setUpAPI();
    await Actions.setUpProxyServer();
    await Actions.setUpPortal();
    await Actions.setUpSession();
    await Actions.setUpClient();
  }
}

const talknServer = new TalknServer();
talknServer.start();
