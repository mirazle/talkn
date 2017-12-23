export default class Thread{
  constructor( window ){

    const connection = Thread.getConnection( window.location.href );
    const contentType = window.document.contentType;
    const charset =  window.document.charset;
    const protocol = window.location.protocol;
    const host = window.location.host
    const title = '';
    const metas = [];
    const links = [];
    const h1s = [];
    const uri = [];
    const favicon = Thread.getFaviconFromWindow( window );
    return {
      connection,
      contentType,
      charset,
      protocol,
      host,
      title,
      metas,
      links,
      h1s,
      uri,
      favicon,
    };
  }

  static getConnection(origin){
    const splitedOrigin = origin.split(':/');
    return splitedOrigin[ 1 ].slice( 0, -1 ) ;
  }

  static getConnectionTop(connection){
    return '/' + connection.split("/")[ 1 ];
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
    const extentionType = User.getContentType(connection);
    const connections = User.getConnections(connection);

    return this.set('connection', connection)
               .set('connectionTop', connectionTop)
               .set('connections', connections)
               .set('extentionType', extentionType);
  }

  static getFaviconFromWindow( window ){
    const u = window.document.evaluate(
      "//link[contains(@rel,'icon')or(contains(@rel,'ICON'))][1]/@href",
      window.document,
      null,
      2,
      null).stringValue;
    const h = "http://";
    const hs = "https://";
    const l = location.host;
    if( u.indexOf( h ) || u.indexOf( hs ) ){
      const url = h+l+( u || "/favicon.ico" );
      const strCnt = url.split( '//' ).length - 1
      if( strCnt === 1 ){
        return url;
      }else{
        return u;
      }
    }else{
      return u ;
    }
  }
}
