import Schema from '../Schema';

export default class Thread extends Schema{
  constructor( params = {} ){
    super();

    const thread = Thread.isWindowObj( params ) ? Thread.constructorFromWindow( params ) : params;

    return this.create(thread);
  }

  static constructorFromWindow( window ){
    const location = window.location ? window.location : {} ;
    const href = location.href ? location.href : '' ;
    const connection = Thread.getConnection( href );
    const contentType = document.contentType ? document.contentType : '';
    const charset = document.charset ? document.charset : '';
    const protocol = location.protocol ? location.protocol : '';
    const host = location.host ? location.host : '';
    const title = '';
    const metas = [];
    const links = [];
    const h1s = [];
    const uri = {};
    const thum = Thread.getFaviconFromWindow( window );

    const layer = 0;
    const mediaIndex = [];
    const postCnt = 0;
    const createTime = '';
    const updateTime = '';

    return {
      location,
      href,
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
      thum,
      layer,
      mediaIndex,
      postCnt,
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
