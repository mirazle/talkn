import Parser from 'ua-parser-js';

export default class User{
  constructor( window ){
    const id = 0;
    const agent = User.getUserAgent( window.navigator.userAgent );
    const connection = User.getConnection( window.location.href );
    const connectionTop = User.getConnectionTop( connection );
    const extentionType = User.getExtentionType( connection );
    const connections = User.getConnections( connection );
    return {
      id,
      agent,
      connection,
      connectionTop,
      extentionType,
      connections,
      num: 100,
    };
  }

  static getUserAgent( userAgent ){
    return Parser( userAgent );
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
