import request from 'request';
import cheerio from 'cheerio';
import jschardet from 'jschardet';
import {Iconv} from 'iconv';
import iconvLite from 'iconv-lite';
import {Buffer} from 'buffer';
import textEncoding from 'text-encoding';
import fs from 'fs';
import Sequence from '~/../common/Sequence'
import Thread from '~/../common/schemas/state/Thread'
import Logics from '~/logics';
import define from '~/../common/define';

export default class Html {

  static get getResponseSchema(){ return {title: '', serverMetas: {}, links: [], h1s: [], contentType: '', uri: '', favicon: '' } };

  constructor(){
    this.option = {
      method: 'GET',
      url: '',
      encoding: 'binary'
    };
  }

  async get( thread ){

    const { DEVELOPMENT_DOMAIN, PORTS } = define;
    let response = {};

    // URLと思われる文字列の場合
    if( thread.host === `${DEVELOPMENT_DOMAIN}:${PORTS.DEVELOPMENT}` || thread.connection.indexOf( '.' ) > 0 ){
      thread = {...thread, protocol: Sequence.HTTPS_PROTOCOL, host: Thread.getHost( thread.connection ) };
      const httpsResult = await Logics.html.request( thread );
      if( httpsResult ){

        response = {...httpsResult, getHtmlThread: thread};
      }else{
        thread = {...thread, protocol: Sequence.HTTP_PROTOCOL, host: Thread.getHost( thread.connection ) };
        const httpResult = await Logics.html.request( thread );
        if( httpResult ){
          response = {...httpResult, getHtmlThread: thread};
        }
      }
    }
/*
    if( Object.keys( response ).length > 0 ){
      console.log("HTML OK " + thread.connection );
    }else{
      console.log("HTML NG " + thread.connection );
    }
*/
    return Object.keys( response ).length > 0 ?
      response : {...Html.getResponseSchema, getHtmlThread: thread};
  }

  request( thread ){
    return new Promise( ( resolve, reject ) => {
      const { protocol, connection } = thread;
      const url = `${protocol}/${connection}`;
      const option = {method: 'GET', encoding: 'binary', url };
      request( option, ( error, response, body ) => {

        let responseSchema = Html.getResponseSchema;

        if( !error && response && response.statusCode === 200 ){
          const _$ = cheerio.load( body );

          console.log( _$('head').innerHTML );

          const utf8Body = this.toUtf8Str( body );
          const $ = cheerio.load( utf8Body );
          responseSchema.title = this.getTitle( $ );
          responseSchema.serverMetas = this.getMetas( $, response.request.uri.href );
          responseSchema.links = this.getLinks( $ );
          responseSchema.h1s = this.getH1s( $ );
          responseSchema.contentType = response.headers['content-type'];
          responseSchema.uri = response.request.uri;
          resolve( responseSchema );
        }else{
          console.log( "@@@ HTML NG " + url );
          resolve(false);
        }
      });
    });
  }

  getTitle( $ ){
    return $('head title').text();
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

  getMetas( $, href ){
    let serverMetas = {};
    const metaLength = $( "meta" ).length;
    for( var i = 0; i < metaLength; i++ ){
      const item = $( "meta" ).get( i );
      let key = i;
      let content = '';
      if( item.attribs.name ){
        key = item.attribs.name;
        content = item.attribs.content;
      }else if( item.attribs.property ){
        key = item.attribs.property;
        content = item.attribs.content;
      }else if( item.attribs.charset ){
        key = 'charset';
        content = item.attribs.charset;
      }else if( item.attribs['http-equiv'] ){
        key = item.attribs['http-equiv'];
        content = item.attribs.content;
      }

      if( key === 'og:image' ){
        if( content.indexOf( Sequence.HTTP_PROTOCOL ) !== 0 && content.indexOf( Sequence.HTTPS_PROTOCOL ) !== 0 ){
          content = `${href}${content}`;
        }
      }

      key = key.toString().replace( '.', '_' );
      serverMetas[ key ] = content;
    }
    return serverMetas;
  }

  toUtf8Str( body ){
    const detectResult = jschardet.detect( body );
    const buf = new Buffer( body, 'binary' );
    let resultBody = '';

    if( detectResult.encoding.indexOf( 'iso-8859' ) === 0 || detectResult.encoding.indexOf( 'ISO-8859' ) === 0 ){
      resultBody = iconvLite.decode( buf, detectResult.encoding );
    }else{
      const iconv = new Iconv( detectResult.encoding, 'UTF-8//TRANSLIT//IGNORE');
      resultBody = iconv.convert( buf ).toString();
    }
    return resultBody;
  }

  getCharset( dom ){
    const bin = dom.toString('binary');
    const re = bin.match(/<meta\b[^>]*charset=["']?([\w\-]+)/i);
    return ( re )? re[ 1 ] : "utf-8";
  }
}
