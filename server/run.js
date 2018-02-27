/**************************************/
/*  talknServer
/* ( SOCKET.IO / MONGODB / REDIS )
/**************************************/

import Actions from '~/actions';
import Sequence from '~/../common/Sequence'

class TalknServer{

	constructor(){
		this.connection = this.connection.bind(this);
	}

	async start(){
		await Actions.setUpApp();
		const io = await Actions.getIo();
		return io.on( 'connection', this.connection );
	}

	async connection( ioUser ){
//		console.log("CONNECTION " + ioUser.conn.id);
		const setting = await Actions.setUpUser();
		Object.keys( Sequence.map ).forEach( endpoint => {
			const oneSequence = Sequence.map[ endpoint ];
			ioUser.on( endpoint, ( requestState ) => {
//				console.log("========== START " + requestState.type );
				Actions[ endpoint ]( ioUser, requestState, setting );
			});
		});
	}
}

const talknServer = new TalknServer();
talknServer.start();
