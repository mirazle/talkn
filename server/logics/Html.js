import request from 'request';
import cheerio from 'cheerio';
import jschardet from 'jschardet';
import {Iconv} from 'iconv';
import {Buffer} from 'buffer';
import Sequence from '~/common/Sequence';
import define from '~/common/define';
import MongoDB from '~/server/listens/db/MongoDB';
import Logics from '~/server/logics';
import HtmlSchema from '~/server/schemas/logics/Html';

export default class Html {

  async fetch( thread ){

    const { protocol, connection } = thread;
    const { DEVELOPMENT_DOMAIN, PORTS } = define;
    let response = null;

    switch( protocol ){
    case Sequence.HTTPS_PROTOCOL:
      response = await Logics.html.exeFetch( Sequence.HTTPS_PROTOCOL, connection );
      if( !response ){
        response = await Logics.html.exeFetch( Sequence.HTTP_PROTOCOL, connection );
      }
      break;
    case Sequence.HTTP_PROTOCOL:
      response = await Logics.html.exeFetch( Sequence.HTTP_PROTOCOL, connection );
      if( !response ){
        response = await Logics.html.exeFetch( Sequence.HTTPS_PROTOCOL, connection );
      }
      break;
    case Sequence.TALKN_PROTOCOL:
    case Sequence.UNKNOWN_PROTOCOL:
    default:
      response = await Logics.html.exeFetch( Sequence.HTTPS_PROTOCOL, connection );
      if( !response ){
        response = await Logics.html.exeFetch( Sequence.HTTP_PROTOCOL, connection );
      }
      break;
    }

    return response ? response : MongoDB.getDefineSchemaObj( new HtmlSchema() );
  }

  exeFetch( protocol, connection ){
    return new Promise( ( resolve, reject ) => {

      const url = `${protocol}/${connection}`;
      const option = {method: 'GET', encoding: 'binary', url };

      request( option, ( error, response, body ) => {

        let responseSchema = MongoDB.getDefineSchemaObj( new HtmlSchema() );

        if( !error && response && response.statusCode === 200 ){
          const utf8Body = this.toUtf8Str( body );
          const $ = cheerio.load( utf8Body );
          responseSchema.protocol = protocol;
          responseSchema.serverMetas = this.getMetas( $, response.request.uri.href );
          responseSchema.links = this.getLinks( $ );
          responseSchema.h1s = this.getH1s( $ );
          responseSchema.videos = this.getVideos( $ );
          responseSchema.audios = this.getAudios( $ );
          responseSchema.contentType = response.headers['content-type'];
          resolve( responseSchema );
        }else{
          resolve( null );
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

  getVideos( $ ){
    const videoLength = $('video').length;
    let videos = [];
    for( let i = 0; i < videoLength; i++ ){
      const video = $('video').get( i );
      const sources = $( video ).find('source');
      const sourceLength = sources.length;
      let srcs = [];
      for( var i = 0; i < sourceLength; i++ ){
        srcs.push( sources[ i ].attribs.src );
      }
      videos.push( {...video.attribs, srcs } );
    }
    return videos;
  }

  getAudios( $ ){
    const audioLength = $('audio').length;
    let audios = [];
    for( let i = 0; i < audioLength; i++ ){
      const audio = $('audio').get( i );
      const sources = $( audio ).find('source');
      const sourceLength = sources.length;
      let srcs = [];
      for( var i = 0; i < sourceLength; i++ ){
        srcs.push( sources[ i ].attribs.src );
      }

      audios.push( {...audio.attribs, srcs } );
    }
    return audios;
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
    let responseSchema = MongoDB.getDefineSchemaObj( new HtmlSchema() );
    let serverMetas = responseSchema.serverMetas;
    const metaLength = $( "meta" ).length;

    serverMetas.title = this.getTitle( $ );

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
    const encoding = this.getCharset( body );//jschardet.detect( body ).encoding;
    const buf = Buffer.from( body, 'binary');
    const iconv = new Iconv( encoding, 'UTF-8//TRANSLIT//IGNORE');
    return iconv.convert( buf ).toString();
  }

  getCharset( body ){
    const bin = body.toString('binary');
    const re = bin.match(/<meta\b[^>]*charset=["']?([\w\-]+)/i);
    return ( re )? re[ 1 ] : "utf-8";
  }
}
