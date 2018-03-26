/**************************************/
/*  talknServer
/* ( SOCKET.IO / MONGODB / REDIS )
/**************************************/

import Actions from '~/actions';
import Sequence from '~/../common/Sequence'

class TalknServer{

	constructor(){
		this.userConnection = this.userConnection.bind(this);
	}

	async start(){
		await Actions.setUpApp();
		await Actions.setUpEndpoints();
		const io = await Actions.getIo();
		return io.on( 'connection', this.userConnection );
	}

	async userConnection( ioUser ){
		const setting = await Actions.setUpUser();
		Object.keys( Sequence.map ).forEach( endpoint => {
			const oneSequence = Sequence.map[ endpoint ];
			ioUser.on( endpoint, ( requestState ) => {
				console.log("========== START " + endpoint );
				Actions[ endpoint ]( ioUser, requestState, setting );
			});
		});
	}
}

const talknServer = new TalknServer();
talknServer.start();
