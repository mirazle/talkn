import request from 'request';
import cheerio from 'cheerio';
import {Iconv} from 'iconv';
import {Buffer} from 'buffer';
import fs from 'fs';

export default class Favicon {

  getName( requestState, links ){
    const { protocol, host } = requestState;
    const linkLength = links.length;
    const superDomain = this.getSuperDomain( host );
    const superOrigin = `${protocol}//${superDomain}`;
    let faviconName = '';
    let clientIconUrl = '';

    for( var i = 0; i < linkLength; i++ ){
      const link = links[ i ];
      if( link.rel && link.rel.indexOf( 'Icon' ) >= 0 || link.rel.indexOf( 'icon' ) >= 0 ){
        faviconName = `${host}${link.href}`;
        clientIconUrl = `${protocol}//${faviconName}`;
        break;
      }
    }

    if( faviconName === '' ){
      faviconName = `${host}${link.href}`;
      clientIconUrl = `${protocol}//${faviconName}`;
    }

    return faviconName;
  }

  request( requestState, faviconName ){
    return new Promise( ( resolve, reject ) => {
      const { protocol } = requestState;
      const clientIconUrl = `${protocol}//${faviconName}`;
      request({method: 'GET', url: clientIconUrl, encoding: null}, (error, response, body) => {
        if( !error && response && response.statusCode === 200 ){
          resolve(body);
        }else{
          console.warn(error);
          resolve(null);
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
      return `${hostParts[ hostPartLength - 2 ]}.${hostParts[ hostPartLength - 1 ]}`;
    }
  }
}
