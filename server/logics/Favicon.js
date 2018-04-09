import request from 'request';
import cheerio from 'cheerio';
import {Iconv} from 'iconv';
import {Buffer} from 'buffer';
import fs from 'fs';
import Sequence from '~/../common/Sequence'

export default class Favicon {

  static get defaultFaviconProtocol(){ return Sequence.HTTP_PROTOCOL}
  static get defaultFaviconName(){ return 'favicon.ico' }

  getName( requestState, links ){
    let { protocol, host } = requestState;
    protocol = protocol ? protocol : Favicon.defaultFaviconProtocol ;
    const linkLength = links.length;
    const superOrigin = `${protocol}//${host}`;
    let faviconName = `${protocol}//${host}/${Favicon.defaultFaviconName}`;

    if( linkLength > 0 ){
      for( let i = 0; i < linkLength; i++ ){
        const link = links[ i ];
        if( link.rel && link.rel.indexOf( 'Icon' ) >= 0 || link.rel.indexOf( 'icon' ) >= 0 ){
          if( faviconName.indexOf( Sequence.HTTP_PROTOCOL ) !== 0 || faviconName.indexOf( Sequence.HTTPS_PROTOCOL ) !== 0 ){

            if( link.href.indexOf( host ) >= 0 ){
              if( link.href.indexOf( protocol ) >= 0 ){
                faviconName = `${link.href}`;
              }else{
                faviconName = `${protocol}//${link.href}`;
              }
            }else{
              if( link.href.indexOf( protocol ) >= 0 ){
                faviconName = `${link.href}`;
              }else{
                faviconName = `${protocol}//${host}${link.href}`;
              }
            }
            break;
          }
        }
      }
    }
    return faviconName;
  }

  request( faviconName ){
    return new Promise( ( resolve, reject ) => {
      request({method: 'GET', url: faviconName, encoding: null}, (error, response, body) => {
        if( !error && response && response.statusCode === 200 ){
          resolve(body);
        }else{
          console.warn(error);
          resolve(false);
        }
      });
    });
  }

  getSuperDomain( host ){
    const hostParts = host.split('.');
    const hostPartLength = hostParts.length;

    if( hostPartLength === 1 ){
      return host;
    }else if( hostPartLength === 2 ){
      return `${hostParts[ 0 ]}.${hostParts[ 1 ]}`;
    }else{
      return host;
    }
  }
}
