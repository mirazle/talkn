import conf from '../../conf';
import Schema from '../Schema';

export default class Thread extends Schema{

  static getDefaultFavicon(){
    return 'user.png';
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
      connection = bootConnection;
      connections = Thread.getConnections( connection );
    }else{
      location = window.location ? window.location : {} ;
      href = location.href ? location.href : '' ;
      connection = Thread.getConnection( href );
      connections = Thread.getConnections( connection );
      protocol = location.protocol ? location.protocol : 'talkn:';
      contentType = document.contentType ? document.contentType : '';
      charset = document.charset ? document.charset : '';

      host = location.host ? location.host : '';
      favicon = Thread.getFaviconFromWindow( window );
    }

    const title = '';
    const metas = [];
    const serverMetas = [];
    const clientMetas = [];
    const links = [];
    const h1s = [];
    const uri = {};
    const layer = 0;
    const mediaIndex = [];
    const postCnt = 0;
    const multiPostCnt = 0;
    const isSelfConnection = Thread.getIsSelfConnection( href, connection );
    const createTime = '';
    const updateTime = '';

    return {
      location,
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
      uri,
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

  static isWindowObj( params ){
    return params.alert;
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

  static getConnections( connection ){
    let connections = ['/'];
    if( connection !== '' ){
      const connectionArr = connection.split( '/' );
      const connectionLength = connectionArr.length;

      if( connection !== "/" ){
        let connectNewConnection = '';
        for( var i = 1; i < connectionLength; i++ ){
          connectNewConnection += ( '/' + connectionArr[ i ] );
          connections.push( connectNewConnection );
        }
      }
    }
    return connections;
  }

  static getHost( connection ){
    return connection.split( "/" )[ 1 ];
  }

  static getProtocol( href ){
    if( href.index( 'http:' ) >= 0 ) return 'http:';
    if( href.index( 'https:' ) >= 0 ) return 'https:';
    return 'talkn:'
  }

  static getIsSelfConnection( href, connection ){
    const replacedHref = href.replace('http:/', '').replace('https:/', '').replace(/\u002f$/,'');
    return replacedHref === connection ;
  }

  setConnection( _connection = '/' ){
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
