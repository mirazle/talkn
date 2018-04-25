import request from 'request';
import cheerio from 'cheerio';
import {Iconv} from 'iconv';
import {Buffer} from 'buffer';
import fs from 'fs';
import Sequence from '~/../common/Sequence'
import define from '~/../common/define'
import conf from '~/conf'

export default class Favicon {

  static get defaultFaviconFileName(){ return `favicon` }
  static get extension(){ return '.ico' }
  static get defaultFaviconProtocol(){ return Sequence.HTTP_PROTOCOL}
  static get defaultFaviconName(){ return `${Favicon.defaultFaviconFileName}${Favicon.extension}` }
  static getDefaultFaviconFullname(){
    return `//${conf.domain}:${define.PORTS.ASSETS}/icon/user.png`;
  }

  getName( thread, links ){
    let { protocol, host } = thread;
    protocol = protocol ? protocol : Favicon.defaultFaviconProtocol ;
    const linkLength = links.length;
    const superOrigin = `${protocol}//${host}`;
    let faviconType = '';
    let faviconName = `${protocol}//${host}/${Favicon.defaultFaviconName}`;

    if( protocol.indexOf( Sequence.TALKN_PROTOCOL ) === 0 ){
      return {
        faviconType: '[TALKN]',
        faviconName : Favicon.getDefaultFaviconFullname()
      }
    }else{
      if( linkLength > 0 ){
        for( let i = 0; i < linkLength; i++ ){
          const link = links[ i ];

          // 複数のICONが設定してあって、有効、無効が混在している場合
          if( link.rel && link.rel.indexOf( 'Icon' ) >= 0 || link.rel.indexOf( 'icon' ) >= 0 ){

            const faviconHostType = link.href.indexOf( host ) >= 0 ? '[SAME_HOST]' : '[DIF_HOST]' ;

            // フルパス記述している場合( http://example/favicon.ico )
            if( link.href.indexOf( Sequence.HTTP_PROTOCOL ) === 0 ||  link.href.indexOf( Sequence.HTTPS_PROTOCOL ) === 0){

              faviconName = link.href;
              faviconType = `[PROTOCOL]//${faviconHostType}/[ICON]`;

            // プロトコルだけ記述していない場合( //example/favicon.ico )
            }else if( link.href.indexOf( '//' ) === 0 ){

              faviconName = `${protocol}${link.href}`;
              faviconType = `${faviconHostType}/[ICON]`;

              // /を含むfacicon.ico記述の場合( /favicon.ico )
            }else if( link.href.indexOf( `/${Favicon.defaultFaviconFileName}`) === 0 ){

              faviconName = `${protocol}//${host}${link.href}`;
              faviconType = '/[ICON]';

            // facicon.icoだけの記述の場合( favicon.ico )
            }else if( link.href.indexOf( `${Favicon.defaultFaviconFileName}`) === 0 ){

              faviconName = `${protocol}//${host}/${link.href}`;
              faviconType = '[ICON]';

            // facicon.icoだけの記述の場合( common/images/favicon.ico )
            }else if( link.href.indexOf( `${Favicon.defaultFaviconFileName}`) > 0 ){

              faviconName = `${protocol}//${host}/${link.href}`;
              faviconType = '[PATH][ICON]';

            // それ以外の場合
            }else{
              faviconName = `${protocol}//${host}${link.href}`;
              faviconType = 'ELSE';
            }

            // ランダム値を削除する
            faviconName = faviconName.replace(/[?].*$/, '');
            break;
          }else{
            faviconType = 'NO_LINK_ICON_TAG';
          }
        }
      }else{
        faviconType = 'NO_LINK_TAG';
      }
    }

    return {faviconType, faviconName};
  }

  request( faviconName ){
    return new Promise( ( resolve, reject ) => {

      if( faviconName.indexOf( conf.domain ) >= 0 ){
        return false;
      }else{

        request({method: 'GET', url: faviconName, encoding: null}, (error, response, body) => {
          if( !error && response && response.statusCode === 200 ){
            if( response.headers[ 'content-type' ].indexOf( 'image' ) === 0 ){
              if( response.headers[ 'content-length' ] !== '0' ){
                resolve(body);
                return true;
              }
            }
          }

          console.warn(error);
          resolve(false);
          return false;
        });
      }
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
