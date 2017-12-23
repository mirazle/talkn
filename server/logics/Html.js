import request from 'request';
import cheerio from 'cheerio';
import {Iconv} from 'iconv';
import {Buffer} from 'buffer';
import fs from 'fs';

export default class Html {

  constructor(){
    this.option = {
      method: 'GET',
      url: '',
      encoding: 'binary'
    };
  }

  get( requestState ){
    return new Promise( ( resolve, reject ) => {

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
          const contentType = response.headers['content-type'];
          const uri = response.request.uri;
          resolve({title, metas, links, h1s, contentType, uri});
        }else{
          console.warn(error);
          reject(error);
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

  getCharset( dom ){
    const bin = dom.toString('binary');
    const re = bin.match(/<meta\b[^>]*charset=["']?([\w\-]+)/i);
    return ( re )? re[ 1 ] : "utf-8";
  }
}
