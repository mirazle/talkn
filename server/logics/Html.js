import request from 'request';
import cheerio from 'cheerio';
import jschardet from 'jschardet';
import {Iconv} from 'iconv';
import {Buffer} from 'buffer';
import Sequence from '~/common/Sequence';
import App from '~/common/schemas/state/App';
import Thread from '~/common/schemas/state/Thread';
import MongoDB from '~/server/listens/db/MongoDB';
import Logics from '~/server/logics';
import HtmlSchema from '~/server/schemas/logics/Html';

export default class Html {

  static get checkSpace(){ return /^\s*$/};

  async fetch( thread, requestState ){

    const { hasSlash } = requestState.thread;
    const { protocol, connection } = thread;
    const layer = Thread.getLayer( connection );
    let requestConnection = connection;

    if( layer === 2 ){
      requestConnection = connection.replace(/\/$/, '');
    }else{
      requestConnection = JSON.parse(hasSlash) ? connection : connection.replace(/\/$/, '');
    }

    let result = {response: null, iconHrefs: []};

    switch( protocol ){
    case Sequence.HTTPS_PROTOCOL:
      result = await Logics.html.exeFetch( Sequence.HTTPS_PROTOCOL, requestConnection );

      if( !result.response ){
        result = await Logics.html.exeFetch( Sequence.HTTP_PROTOCOL, requestConnection );
      }
      break;
    case Sequence.HTTP_PROTOCOL:
      result = await Logics.html.exeFetch( Sequence.HTTP_PROTOCOL, requestConnection );
      if( !result.response ){
        result = await Logics.html.exeFetch( Sequence.HTTPS_PROTOCOL, requestConnection );
      }
      break;
    case Sequence.TALKN_PROTOCOL:
    case Sequence.UNKNOWN_PROTOCOL:
    default:
      result = await Logics.html.exeFetch( Sequence.HTTPS_PROTOCOL, requestConnection );
      if( !result.response ){
        result = await Logics.html.exeFetch( Sequence.HTTP_PROTOCOL, requestConnection );
      }
      break;
    }

    if( result.response ){
      return result;
    }else{
      result.response = MongoDB.getDefineSchemaObj( new HtmlSchema() );
      return result;
    }
  }

  exeFetch( protocol, connection ){
    return new Promise( ( resolve, reject ) => {

      const url = `${protocol}/${connection}`;
      const option = {method: 'GET', encoding: 'binary', url };

      // localhost is not get.
      request( option, ( error, response, body ) => {

        let responseSchema = MongoDB.getDefineSchemaObj( new HtmlSchema() );

        if( error ){
          //console.warn( "html.js " + url );
          //console.warn( error );
        }

        if( !error && response && response.statusCode === 200 ){

          const contentType = response.headers['content-type'];
          let iconHrefs = [];

          responseSchema.contentType = contentType;
          responseSchema.protocol = protocol;
          if( App.isMediaContentType( contentType ) ){
            responseSchema.serverMetas.title = this.getTitle( null, connection, contentType );
          }else{
            const utf8Body = this.toUtf8Str( body, contentType );
            const $ = cheerio.load( utf8Body );
            iconHrefs = this.getIconHrefs( $ );

            responseSchema.links = this.getLinks( $ );
            responseSchema.h1s = this.getH1s( $ );
            responseSchema.videos = this.getVideos( $ );
            responseSchema.audios = this.getAudios( $ );
            responseSchema.serverMetas = this.getMetas( $, connection, responseSchema, response.request.uri.href );
          }
          resolve( {response: responseSchema, iconHrefs });
        }else{
          resolve( {response: null, iconHrefs: [] } );
        }
      });
    });
  }

  getTitle( $, connection, contentType ){
    let title = "";
    if( App.isMediaContentType( contentType )){
      const splitedConnection = connection.split("/");
      const _title1 = splitedConnection[ splitedConnection.length - 1 ];
      const _title2 = splitedConnection[ splitedConnection.length - 2 ];
      const _title3 = splitedConnection[ splitedConnection.length - 3 ];
      if( _title1 !== "" ) title = _title1;
      if( _title2 !== "" ) title = _title2;
      if( _title3 !== "" ) title = _title3;
    }else{
      title = $('head title').text();
    }
    return title;
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
      for( var j = 0; j < sourceLength; j++ ){
        srcs.push( sources[ j ].attribs.src );
      }
      videos.push( {...video.attribs, srcs } );
    }
    return videos;
  }

  getAudios( $ ){
    const audioLength = $('body audio').length;
    let audios = [];
    for( let i = 0; i < audioLength; i++ ){
      const audio = $('audio').get( i );
      const sources = $( audio ).find('source');
      const sourceLength = sources.length;
      let srcs = [];
      for( var j = 0; j < sourceLength; j++ ){
        srcs.push( sources[ j ].attribs.src );
      }

      audios.push( {...audio.attribs, srcs } );
    }
    return audios;
  }

  getIconHrefs( $ ){
    let iconHrefs = [];
    const icon = $('head link[rel="icon"]');
    const Icon = $('head link[rel="Icon"]');
    const iconLength = icon.length;
    const IconLength = Icon.length;

    if( iconLength > 0 ){
      for( let i = 0; i < iconLength; i++ ){
        if( icon[ i ].attribs.href !== "" ){
          iconHrefs.push( icon[ i ].attribs.href );
        }
      }
    }
    if( IconLength > 0 ){
      for( let i = 0; i < IconLength; i++ ){
        if( Icon[ i ].attribs.href !== "" ){
          iconHrefs.push( Icon[ i ].attribs.href );
        }
      }
    }
    return iconHrefs;
  }

  getLinks( $ ){
    const linkLength = $( "body a" ).length;
    const getHref = ( item ) => {
      if( item && item.attribs && item.attribs.href && item.attribs.href !== "" ){
        return item.attribs.href;
      }
      return "";
    }
    const getText = ( item ) => {
      const itemLength = item.children.length;
      let text = "";
      for( let i = 0; i < itemLength; i++ ){
        const child = item.children[ i ];

        if( child.type === "text" && child.data !== "" && !Html.checkSpace.test( child.data) ){
          text = child.data;
          break;
        }

        if( child.name === "img" && child.attribs && child.attribs.alt && child.attribs.alt !== "" && !Html.checkSpace.test( child.attribs.alt ) ){
          text = child.attribs.alt;
          break;
        }
        
        if( child.children && child.children.length > 0 ){
          text = getText( child );
          break;
        }
        break;
      }
      return text;
    }

    let links = [];

    for( var i = 0; i < linkLength; i++ ){
      const item = $( "body a" ).get( i );
      const href = getHref( item );
      const text = getText( item );

      if( href && href !== "" && text && text !== ""){
        links.push( {href, text} );
      }
    }
    return links;
  }

  getMetas( $, connection, parentSchema, href ){
    let responseSchema = MongoDB.getDefineSchemaObj( new HtmlSchema() );
    let serverMetas = responseSchema.serverMetas;
    const metaLength = $( "meta" ).length;

    serverMetas.title = this.getTitle( $, connection, parentSchema.contentType );

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

  toUtf8Str( body, contentType ){
    const encoding = this.getCharset( body );//jschardet.detect( body ).encoding;
    const buf = Buffer.from( body, 'binary');
    try{
      const iconv = new Iconv( encoding, 'UTF-8//TRANSLIT//IGNORE');
      return iconv.convert( buf ).toString();
    }catch(e){
      console.warn( e );
      return body;
    }
  }

  getCharset( body ){
    const bin = body.toString('binary');
    const re = bin.match(/<meta\b[^>]*charset=["']?([\w\-]+)/i);
    return ( re )? re[ 1 ] : "utf-8";
  }
}
