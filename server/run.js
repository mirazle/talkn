/**************************************/
/*  talknServer
/* ( SOCKET.IO / MONGODB / REDIS )
/**************************************/

import Actions from '~/actions';

class TalknServer{
  async start(){
console.log("A");
    await Actions.setUpDB();
console.log("B");
    await Actions.setUpAPI();
console.log("C");

    await Actions.setUpProxyServer();
console.log("D");
    await Actions.setUpPortal();
console.log("E");
    await Actions.setUpClient();
console.log("F");
    await Actions.setUpAssets();
console.log("G");
    await Actions.setUpSession();
console.log("H");
  }
}

const talknServer = new TalknServer();
talknServer.start();
