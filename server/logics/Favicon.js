import request from 'request';
import cheerio from 'cheerio';
import {Iconv} from 'iconv';
import {Buffer} from 'buffer';
import fs from 'fs';
import Sequence from '~/../common/Sequence'
import define from '~/../common/define'
import conf from '~/conf'

export default class Favicon {

  static get extensionLabel(){ return '.ico' }
  static get defaultFaviconProtocol(){ return Sequence.HTTP_PROTOCOL}
  static get defaultFaviconName(){ return `favicon${Favicon.extensionLabel}` }
  static getDefaultFaviconFullname(){
    return `${Sequence.HTTP_PROTOCOL}//${conf.domain}:${define.PORTS.ASSETS}/icon/user.png`;
  }

  getName( thread, links ){
    let { protocol, host } = thread;
    protocol = protocol ? protocol : Favicon.defaultFaviconProtocol ;
    const linkLength = links.length;
    const superOrigin = `${protocol}//${host}`;
    let faviconName = `${protocol}//${host}/${Favicon.defaultFaviconName}`;

    if( protocol.indexOf( Sequence.TALKN_PROTOCOL ) === 0 ){
      return Favicon.getDefaultFaviconFullname();
    }else{
      if( linkLength > 0 ){
        for( let i = 0; i < linkLength; i++ ){
          const link = links[ i ];
          if( link.rel && link.rel.indexOf( 'Icon' ) >= 0 || link.rel.indexOf( 'icon' ) >= 0 ){
            if( faviconName.indexOf( Sequence.HTTP_PROTOCOL ) !== 0 || faviconName.indexOf( Sequence.HTTPS_PROTOCOL ) !== 0 ){
              if( link.href.indexOf( Favicon.extensionLabel ) >= 0 ){
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

                    if( link.href === Favicon.defaultFaviconName ){
                      faviconName = `${protocol}//${host}/${link.href}`;
                    }else if( link.href === `/${Favicon.defaultFaviconName}` ){
                      faviconName = `${protocol}//${host}${link.href}`;
                    }else if( link.href.indexOf( Sequence.HTTP_PROTOCOL ) >= 0 ){
                      faviconName = link.href;
                    }else if( link.href.indexOf( '//' ) === 0 ){
                      faviconName = `${protocol}${link.href}`;
                    }else{
                      faviconName = `${protocol}//${host}${link.href}`;
                    }
                  }
                }
                faviconName = faviconName.replace(/[?].*$/, '');
                break;
              }
            }
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
          if( response.headers[ 'content-type' ].indexOf( 'image' ) === 0 ){
            resolve(body);
            return true;
          }
        }

        console.warn(error);
        resolve(false);
        return false;
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
