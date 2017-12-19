import request from 'request';
import cheerio from 'cheerio';
import {Iconv} from 'iconv';
import {Buffer} from 'buffer';

export default class Html {

  constructor(){
    this.option = {
      method: 'GET',
      url: '',
      encoding: 'binary'
    };
  }

  static get faviocnName(){
    return 'favicon.ico';
  }

  get( requestState ){
    const { protocol, connection, host } = requestState;
    const url = `${protocol}/${connection}`;
    const option = {method: 'GET', encoding: 'binary', url };
    request( option, ( error, response, body ) => {

      if( !error && response && response.statusCode === 200 ){
        const utf8Body = this.toUtf8( body );
        const $ = cheerio.load( utf8Body );
        const title = this.getTitle( $ );
        const metas = this.getMetas( $ );
        const links = this.getLinks( $ );
        const h1s = this.getH1s( $ );
        const icon = this.getIconUrl( requestState, links );
      }else{
        console.warn(error);
      }
    });
    return true;
  }

  getTitle( $ ){
    return $('head title').text();
  }

  getIconUrl( requestState, links ){
    let iconUrl = '';
    const { protocol, host } = requestState;
    const linkLength = links.length;

    for( var i = 0; i < linkLength; i++ ){
      const link = links[ i ];
      if( link.rel && link.rel.indexOf( 'Icon' ) >= 0 || link.rel.indexOf( 'icon' ) >= 0 ){
        iconUrl = link.href;
        break;
      }
    }

    if( iconUrl === '' ){
      iconUrl = this.getSuperDomain( host ) + '/' + Html.faviocnName;
    }

    request({method: 'GET', url: iconUrl, encoding: null}, (error, response, body) => {
      if( !error && response && response.statusCode === 200 ){
        console.log();
        // FSでスーパードメイン名で保存
      }
    });
  }

  getH1s( $ ){
    const h1Length = $('h1').length;
    let h1s = [];
    for( let i = 0; i < h1Length; i++ ){
      const h1 = $('h1').get( i );
      h1s.push( $( h1 ).text() );
    }
    return h1s;
  }

  getLinks( $ ){
    let links = [];
    const linkLength = $( "link" ).length;
    for( var i = 0; i < linkLength; i++ ){
      const item = $( "link" ).get( i );
      links.push( item.attribs )
    }
    return links;
  }

  getMetas( $ ){
    let metas = [];
    const metaLength = $( "meta" ).length;
    for( var i = 0; i < metaLength; i++ ){
      const item = $( "meta" ).get( i );
      metas.push(item.attribs);
    }
    return metas;
  }

  toUtf8( dom ){
    const iconv = new Iconv( this.getCharset( dom ), 'UTF-8//TRANSLIT//IGNORE');
    dom = new Buffer( dom, 'binary' );
    return iconv.convert( dom ).toString();
  }

  getSuperDomain( host ){
    const hostParts = host.split('.');
    const hostPartLength = hostParts.length;

    if( hostPartLength === 1 ){
      return host;
    }else if( hostPartLength === 2 ){
      return `${hostParts[ 0 ]}.${hostParts[ 1 ]}`;
    }else{
      return `${hostParts[ hostPartLength - 2 ]}.${hostParts[ hostPartLength - 1 ]}`;
    }
  }

  getCharset( dom ){
    const bin = dom.toString('binary');
    const re = bin.match(/<meta\b[^>]*charset=["']?([\w\-]+)/i);
    return ( re )? re[ 1 ] : "utf-8";
  }
}
