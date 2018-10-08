import request from 'request';
import Sequence from '~/common/Sequence'
import util from '~/common/util'
import Logics from '~/server/logics';
import conf from '~/server/conf'

export default class Favicon {

  static get defaultFaviconFileName(){ return `favicon` }
  static get extension(){ return '.ico' }
  static get defaultFaviconName(){ return `${Favicon.defaultFaviconFileName}${Favicon.extension}` }
  static get defaultFaviconPath(){ return `${Sequence.HTTPS_PROTOCOL}${conf.assetsPath}${Favicon.defaultFaviconFileName}${Favicon.extension}` }
  static get defaultFaviconData(){
    return {
      faviconName: Favicon.defaultFaviconPath,
      faviconType: '[TALKN]',
      faviconBinary: null,
      isExist: false,
      isDefault: true,
      isForceGet: false
    }
  }

  async fetch( thread ){

    return new Promise( ( resolve, reject ) => {

      const faviconDatas = this.getFaviconDatas(thread);

      let promises = [];

      faviconDatas.forEach( ( faviconData ) => {

        if( !faviconData.isDefault && faviconData.isExist ){
          resolve(faviconData);
          return false;
        }

        if( !faviconData.isDefault && !faviconData.isExist ){
          promises.push( Logics.favicon.request( faviconData ) );
          return false;
        }

        if( !faviconData.isExist ){
          promises.push( Logics.favicon.request( faviconData ) );
        }
      });

      Promise.all( promises ).then( ( responses ) => {

        // 取得失敗分をfilterする
        const results = responses.filter( response => response !== false );
        const resultLength = results.length;
        let resolveResult = Favicon.defaultFaviconData

        if( resultLength > 0 ){
          results.forEach( ( result, index ) => {
            resolveResult = result;

            // 規定のfaviconでなければ即ループを抜ける
            if( !resolveResult.isDefault ){
              return false;
            }
          });
        }

        // バイナリが存在する場合
        if( resolveResult.faviconBinary ){
          // faviconを保存
          const saveFaviconName = util.getSaveFaviconName( resolveResult.faviconName );
          Logics.fs.writeFavicon( saveFaviconName, resolveResult.faviconBinary );
        }else{

        }
        resolve( resolveResult );
      });
    });
  }

  request( faviconData ){
    return new Promise( ( resolve, reject ) => {
      const { faviconName } = faviconData;

      request({method: 'GET', url: faviconName, encoding: null}, (error, response, faviconBinary) => {

        if( !error && response && response.statusCode === 200 ){
          if( response.headers[ 'content-type' ].indexOf( 'image' ) === 0 ){
            if( response.headers[ 'content-length' ] !== '0' ){
              resolve({...faviconData, faviconBinary});
              return true;
            }
          }
        }
        resolve(false);
        return false;
      });
    });
  }

  getFaviconDatas(thread){
    const { protocol, host, connection, links } = thread;
    const linkLength = links.length;

    // Faviconの初期値を設定
    let faviconDatas = [Favicon.defaultFaviconData];
    faviconDatas[ 0 ]['isExist'] = Logics.fs.isExistFavicon(
      util.getSaveFaviconName( faviconDatas[ 0 ]['faviconName'] )
    );

    // host直下のパターンを検出
    const faviconName = `${protocol}//${host}/${Favicon.defaultFaviconName}`;

    faviconDatas.push( {
      faviconName: faviconName,
      faviconType: `NO_WRITE_ON_HOST`,
      isExist: Logics.fs.isExistFavicon( util.getSaveFaviconName( faviconName )),
      isDefault: false,
    } );

    if( linkLength > 0 ){

      for( let i = 0; i < linkLength; i++ ){
        const link = links[ i ];
        if( link.rel && link.rel.indexOf( 'Icon' ) >= 0 || link.rel && link.rel.indexOf( 'icon' ) >= 0 ){
          const faviconHostType = link.href.indexOf( host ) >= 0 ? '[SAME_HOST]' : '[DIF_HOST]' ;
          let faviconName = '';
          let faviconType = '';
          let isDefault = Favicon.defaultFaviconData.isDefault;
          let isExist = Favicon.defaultFaviconData.isExist;

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
            faviconType = '[ELSE]';
          }

          // ランダム値を削除する
          faviconName = faviconName.replace(/[?].*$/, '');
          isDefault = Favicon.defaultFaviconData.faviconName === faviconName ;
          isExist = Logics.fs.isExistFavicon( util.getSaveFaviconName( faviconName ) );
          faviconDatas.push( {faviconName, faviconType, isExist, isDefault } );
        }
      }

    // linkタグが存在しない場合
    }else{
      faviconDatas[ 0 ]['faviconType'] = "[NO_LINK_TAG]";
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
