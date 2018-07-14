import request from 'request';
import fs from 'fs';
import Sequence from '~/common/Sequence'
import define from '~/common/define'
import Logics from '~/server/logics';
import conf from '~/server/conf'

export default class Favicon {

  static get defaultFaviconFileName(){ return `favicon` }
  static get extension(){ return '.ico' }
  static get defaultFaviconProtocol(){ return Sequence.HTTP_PROTOCOL}
  static get defaultFaviconName(){ return `${Favicon.defaultFaviconFileName}${Favicon.extension}` }
  static getDefaultFaviconFullname(){ return `user.png` }

  async requests( faviconDatas ){
    return new Promise( ( resolve, reject ) => {
      let promises = [];
      let faviconName = '';
      let faviconType = '';

      faviconDatas.forEach( faviconData => promises.push( Logics.favicon.request( faviconData ) ) );

      Promise.all( promises ).then( ( responses ) => {
        const results = responses.filter( response => response !== false );

        if( results.length > 0 ){
          const { faviconName, faviconType, faviconBinary } = results[0];
          Logics.fs.write( faviconName, faviconBinary );
          resolve( {faviconName, faviconType} );
        }else{
          resolve( {
            faviconName: Favicon.getDefaultFaviconFullname(),
            faviconType: 'default',
          } );
        }
      });
    });
  }

  request( faviconData ){
    return new Promise( ( resolve, reject ) => {
      const { faviconName } = faviconData;
      if( faviconName.indexOf( conf.domain ) >= 0 ){
        return false;
      }else{

        console.log( "@@@@@@ " + faviconName);

        request({method: 'GET', url: faviconName, encoding: null}, (error, response, faviconBinary) => {
          if( !error && response && response.statusCode === 200 ){
            if( response.headers[ 'content-type' ].indexOf( 'image' ) === 0 ){
              if( response.headers[ 'content-length' ] !== '0' ){
                resolve({...faviconData, faviconBinary});
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

  getDatas( thread, links ){
    let { protocol, host } = thread;
    protocol = protocol ? protocol : Favicon.defaultFaviconProtocol ;
    const linkLength = links.length;
    const superOrigin = `${protocol}//${host}`;
    let faviconDatas = [{
      faviconName: `${protocol}//${host}/${Favicon.defaultFaviconName}`,
      faviconType: 'NO_LINK_TAG',
    }];

    if( protocol.indexOf( Sequence.TALKN_PROTOCOL ) === 0 ){
      faviconDatas = [{
        faviconName: Favicon.getDefaultFaviconFullname(),
        faviconType: '[TALKN]'
      }]
    }else{
      if( linkLength > 0 ){

        for( let i = 0; i < linkLength; i++ ){
          const link = links[ i ];

          if( link.rel && link.rel.indexOf( 'Icon' ) >= 0 || link.rel && link.rel.indexOf( 'icon' ) >= 0 ){
console.log( "@@@ " + link.href );
            const faviconHostType = link.href.indexOf( host ) >= 0 ? '[SAME_HOST]' : '[DIF_HOST]' ;
            let faviconName = '';
            let faviconType = '';

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

            // 特定のパス位置に/ooo/facicon.icoが存在する記述の場合( /common/images/favicon.ico )
            }else if( link.href.indexOf( `${Favicon.defaultFaviconFileName}`) > 0 && link.href.indexOf( '/' ) === 0 ){

              faviconName = `${protocol}//${host}${link.href}`;
              faviconType = '/[PATH][ICON]';

            // 特定のパス位置にooo/facicon.icoが存在する記述の場合( common/images/favicon.ico )
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
            faviconDatas.push( {faviconName, faviconType} );
          }
        }
      }
    }

    return faviconDatas;
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
