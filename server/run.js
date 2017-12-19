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
		const setting = await Actions.setUp();
		const io = await Actions.getIo();
		io.on( 'connection', this.connection );
		return true;
	}

	connection( ioUser ){
		Object.keys( Sequence.map ).forEach( endpoint => {
			const oneSequence = Sequence.map[ endpoint ];
			ioUser.on( endpoint, ( requestState ) => {
				Actions[ endpoint ]( ioUser, requestState );
			});
		});
	}
}

const talknServer = new TalknServer();
talknServer.start();
