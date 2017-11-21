import $ from 'jquery';
import define from './define';
export const CONNECT = 'Connect';

export default store => next => action => {

	if (typeof action[ CONNECT ] === 'undefined') {
		return next(action);
	}

	console.log("!!!!!!! MIDDLEWARE CONNECT !!!!!!!" );
};

/*
export default store => next => action => {
	const callAPI = action[CALL_API];
	let { endpoint, method, body, headers } = callAPI;
	const { types } = callAPI;
 	
	let port   = ( location.protocol === "https:" )? define.server.httpsPort : define.server.httpPort ;
	return $.ajax({
				url: '//' + define.server.host + ':' + port + define.server.endPoint, 
				dataType: "script"
			}).then(( response ) => {
				console.log( io );
				resolve( { type: "CONNECT", resolve: true, io: io } )
			}, ( response ) => {
				reject( { type: "CONNECT", result: falsei, io: null } );
			});
	console.log( "#######" );
	console.log( promise );
	console.log( "#######" );
}
*/
