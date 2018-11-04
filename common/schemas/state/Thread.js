import conf from '~/client/conf';
import Schema from '~/common/schemas/Schema';

export default class Thread extends Schema{

  static getDefaultFavicon(){
    return 'user.png';
  }

  static isWindowObj( params ){
    return params.alert ? true : false;
  }

  constructor( params = {}, bootOption = {}){
    super();
    const thread = Thread.isWindowObj( params ) ? Thread.constructorFromWindow( params, bootOption ) : params;
    return this.create(thread);
  }

  static constructorFromWindow( window, bootOption ){

    const bootConnection = bootOption.connection ? bootOption.connection : false;

    let location = {} ;
    let href = '' ;
    let connection = '/';
    let connections = ['/'];
    let protocol = 'talkn:';
    let contentType = '';
    let charset = 'UTF-8';

    let host = '';
    let favicon = Thread.getDefaultFavicon();

    if( bootConnection ){

      // URLのコネクション文字列からではPROTOCOLは判別できない。
      protocol = Thread.getProtocol( bootConnection );
      connection = bootConnection;
      host = Thread.getHost( bootConnection );
      connections = bootConnection.connections && bootConnection.connections.length > 0 ?
        bootConnection.connections : Thread.getConnections( connection );
    }else{
      location = window.location ? window.location : {} ;
      href = location.href ? location.href : '' ;
      connection = Thread.getConnection( href );
      connections = params.connections && params.connections.length > 0 ?
        params.connections : Thread.getConnections( connection );
      protocol = location.protocol ? location.protocol : '????:';
      contentType = document.contentType ? document.contentType : '';
      charset = document.charset ? document.charset : '';

      host = location.host ? location.host : '';
      favicon = Thread.getFaviconFromWindow( window );
    }

    const title = '';
    const metas = [];
    const serverMetas = {};
    const clientMetas = {};
    const links = [];
    const h1s = [];
    const audios = [];
    const videos = [];
    const layer = Thread.getLayer( connection );
    const mediaIndex = [];
    const postCnt = 0;
    const multiPostCnt = 0;
    const isSelfConnection = Thread.getIsSelfConnection( href, connection );
    const createTime = '';
    const updateTime = '';

    return {
      href,
      connection,
      connections,
      contentType,
      charset,
      protocol,
      host,
      title,
      clientMetas,
      serverMetas,
      links,
      h1s,
      audios,
      videos,
      favicon,
      layer,
      mediaIndex,
      postCnt,
      multiPostCnt,
      isSelfConnection,
      createTime,
      updateTime,
    }
  }

  static getConnection( href ){

    if( href !== '' ){
      href = href.slice( -1 ) === '/' ? href.slice( 0, -1 ) : href ;
      href = href.replace('http:/', '');
      href = href.replace('https:/', '');
      return href;
    }else{
      return '';
    }
  }

  static getConnectionTop( connection ){
    if( connection !== '' ){
      return '/' + connection.split("/")[ 1 ];
    }else{
      return '';
    }
  }

  static getConnections( _connection ){
    let connections = ['/'];

    if( _connection !== '' ){
      //connection = connection.replace(/\u002f$/g, '');
      const connection = _connection.slice( -1 ) === "/" ? _connection : _connection + "/";

      if( connection !== "/" ){
        const connectionArr = connection.split( '/' );
        const connectionLength = connectionArr.length;
        let newConnection = '';
        for( var i = 1; i < connectionLength; i++ ){
          if( connectionArr[ i ] !== "" ){

            newConnection += connectionArr[ i ];
            newConnection = newConnection.slice( -1 ) === "/" ? newConnection : newConnection + "/";
            newConnection = newConnection.slice( 0, 1 ) === "/" ? newConnection : "/" + newConnection;
            connections.push( newConnection );
          }
        }
      }
    }
    return connections;
  }

  static getHost( connection ){
    if( connection.indexOf( '.' ) >= 0 ){
      connection = connection.replace( 'https://', '' ).replace('http://', '' );
      return connection.replace( /^\//, '' ).replace( /\/.*$/, '' );
    }else{
      return conf.domain;
    }
  }

  static getProtocol( href ){
    if( href.indexOf( 'http:' ) >= 0 ) return 'http:';
    if( href.indexOf( 'https:' ) >= 0 ) return 'https:';
    return '????:'
  }

  static getIsSelfConnection( href, connection ){
    const replacedHref = href.replace('http:/', '').replace('https:/', '').replace(/\u002f$/,'');
    return replacedHref === connection ;
  }

  static getLayer( connection ){
    const layerCnt = connection.split( '/' ).length - 1;
    return connection.match(/\u002f$/) ? layerCnt - 1 : layerCnt ;
  }

  setConnection( _connection = '/' ){
    const connection = _connection.indexOf('/') === 0 ? _connection : `/${_connection}`;
    const connectionTop = User.getConnectionTop(connection);
    const extentionType = User.getContentType(connection);
    const connections = Thread.getConnections(connection);

    return this.set('connection', connection)
               .set('connectionTop', connectionTop)
               .set('connections', connections)
               .set('extentionType', extentionType);
  }

  static getFaviconFromWindow( window ){
    if( window && window.document ){
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
    }else{
      return '';
    }
  }
}
