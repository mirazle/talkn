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
    await Actions.setUpClient();
    await Actions.setUpAssets();
    await Actions.setUpSession();
  }
}

const talknServer = new TalknServer();
talknServer.start();
