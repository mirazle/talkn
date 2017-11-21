import Parser from 'ua-parser-js';
import Schema from './../../schemas/Schema';
import Index from './../../schemas/state/Index/';
import Thread from './../../schemas/state/Thread';

export default class State extends Schema{

  constructor( location, userAgent, html ){
    super();
    const headers = ioUser.handshake.headers;

		// Client Redux State Schemas .
    const id = 0;
    const talknIndex = '';
    const cookie = State.getCookie( headers );
    const userAgent = State.getUserAgent( headers );
    const appType = '';
    const screenMode = '';
    const origin = headers.origin;
    const connection = State.getConnection(origin);
    const port = State.getPort(connection);
    const protcol = State.getProtcol(origin);
    const connectionTop = State.getConnectionTop(connection);
    const extentionType = State.getExtentionType(connection);
    const connections = State.getConnections(connection);
		const index = [];
		const thread = new Thread( headers );

    // Initialize.
    return this.init({
      id,
      talknIndex,
      cookie,
      userAgent,
      appType,
      screenMode,
      origin,
      connection,
      port,
      protcol,
      connectionTop,
      extentionType,
      connections,
			index,
			thread,
    });
  }

  thread(){
    return this.get('thread');
  }

  static getProtcol(origin){
    const splitedOrigin = origin.split(':');
    return splitedOrigin[ 0 ];
  }

  static getConnection(origin){
    const splitedOrigin = origin.split(':/');
    return splitedOrigin[ 1 ];
  }

  static getConnectionTop(connection){
    return connection.split("/")[ 1 ];
  }

  static getExtentionType(connection){
    let extentionType = 'html';
    const splitedConnection = connection.split('/');
    const splitedLastConnection = splitedConnection[ splitedConnection.length - 1 ];

    if( splitedLastConnection.indexOf('.') > 0 ){
      extentionType = splitedLastConnection.split('.')[ 1 ];
    }
    return extentionType;
  }

  static getPort(connection){
    let port = 80;
    if( connection.indexOf(':') > 0 ){
      const splitedConnection = connection.split(':');
      port = splitedConnection[ splitedConnection.length - 1 ];
    }
    return Number(port);
  }

  static getConnections(connection){
    const connectionArr = connection.split( '/' );
    const connectionLength = connectionArr.length;
    let connections = ['/'];
    if( connection !== "/" ){
      let connectNewConnection = '';
      for( var i = 1; i < connectionLength; i++ ){
        connectNewConnection += ( '/' + connectionArr[ i ] );
        connections.push( connectNewConnection );
      }
    }
    return connections;
  }

  static getCookie( headers ){
    return headers['cookie'];
  }

  static getUserAgent( headers ){
    return Parser(headers['user-agent']);
  }

  setConnection(_connection = '/'){
    const connection = _connection.indexOf('/') === 0 ? _connection : `/${_connection}`;
    const connectionTop = User.getConnectionTop(connection);
    const extentionType = User.getExtentionType(connection);
    const connections = User.getConnections(connection);

    return this.set('connection', connection)
               .set('connectionTop', connectionTop)
               .set('connections', connections)
               .set('extentionType', extentionType);
  }
}
