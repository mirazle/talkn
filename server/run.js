/**************************************/
/*  talknServer
/* ( SOCKET.IO / MONGODB / REDIS )
/**************************************/

import Actions from '~/actions';
import {sequenceMap} from '~/../common/sequence'

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
		Object.keys( sequenceMap ).forEach( endpoint => {
			const sequence = sequenceMap[ endpoint ];

			ioUser.on( endpoint, ( requestState ) => {
				console.log(endpoint);
				Actions[ endpoint ]( sequence, ioUser, requestState );
			});
		});
	}
}

const talknServer = new TalknServer();
talknServer.start();
