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

  async fetch( thread, iconHrefs ){
    const log = false;
    return new Promise( ( resolve, reject ) => {

      const faviconDatas = this.getFaviconDatas(thread, iconHrefs);

      let promises = [];

      faviconDatas.forEach( ( faviconData ) => {
        if( log ) console.log( faviconData );
        if( !faviconData.isDefault && faviconData.isExist ){
          if( log ) console.log("A");
          resolve(faviconData);
          return false;
        }

        if( !faviconData.isDefault && !faviconData.isExist ){
          if( log ) console.log("B");
          promises.push( Logics.favicon.request( faviconData ) );
          return false;
        }

        if( !faviconData.isExist ){
          if( log ) console.log("C");
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
    const log = true;
    return new Promise( ( resolve, reject ) => {
      const { faviconName } = faviconData;

      request({method: 'GET', url: faviconName, encoding: null}, (error, response, faviconBinary) => {
        if( !error && response && response.statusCode === 200 ){
          if( log ) console.log("A ");
          if( log ) console.log( response.headers );
          if( response.headers[ 'content-type' ].indexOf( 'image' ) === 0 ){
            if( log ) console.log("B " + response.headers[ 'content-length' ] );
            if( response.headers[ 'content-length' ] !== '0' ){
              if( log ) console.log("C");
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

  getFaviconDatas(thread, iconHrefs){
    const log = false;
    const { protocol, host, connection } = thread;

    // Faviconの初期値を設定
    let faviconDatas = [Favicon.defaultFaviconData];
    faviconDatas[ 0 ]['isExist'] = Logics.fs.isExistFavicon(
      util.getSaveFaviconName( faviconDatas[ 0 ]['faviconName'] )
    );

    // host直下のパターンを検出
    const faviconName = `${protocol}//${host}/${Favicon.defaultFaviconName}`;
    const iconHrefsLength = iconHrefs.length;

    faviconDatas.push( {
      faviconName: faviconName,
      faviconType: `NO_WRITE_ON_HOST`,
      isExist: Logics.fs.isExistFavicon( util.getSaveFaviconName( faviconName )),
      isDefault: false,
    } );
    if( log ) console.log( "@ " + iconHrefsLength);
    if( iconHrefsLength > 0 ){

      for( let i = 0; i < iconHrefsLength; i++ ){

        const href = iconHrefs[ i ];
        const faviconHostType = href.indexOf( host ) >= 0 ? '[SAME_HOST]' : '[DIF_HOST]' ;
        let faviconName = '';
        let faviconType = '';
        let isDefault = Favicon.defaultFaviconData.isDefault;
        let isExist = Favicon.defaultFaviconData.isExist;
        if( log ) console.log("@A");
        // フルパス記述している場合( http://example/favicon.ico )
        if( href.indexOf( Sequence.HTTP_PROTOCOL ) === 0 ||  href.indexOf( Sequence.HTTPS_PROTOCOL ) === 0){
          if( log ) console.log("@B");
          faviconName = href;
          faviconType = `[PROTOCOL]//${faviconHostType}/[ICON]`;

        // プロトコルだけ記述していない場合( //example/favicon.ico )
        }else if( href.indexOf( '//' ) === 0 ){
          console.log("@C");
          faviconName = `${protocol}${href}`;
          faviconType = `${faviconHostType}/[ICON]`;

        // /を含むfacicon.ico記述の場合( /favicon.ico )
        }else if( href.indexOf( `/${Favicon.defaultFaviconFileName}`) === 0 ){
          if( log ) console.log("@D");
          faviconName = `${protocol}//${host}${href}`;
          faviconType = '/[ICON]';

        // facicon.icoだけの記述の場合( favicon.ico )
        }else if( href.indexOf( `${Favicon.defaultFaviconFileName}`) === 0 ){
          if( log ) console.log("@E");
          faviconName = `${protocol}//${host}/${href}`;
          faviconType = '[ICON]';

        // 特定のパス位置にooo/facicon.icoが存在する記述の場合( common/images/favicon.ico )
        }else if( href.indexOf( `${Favicon.defaultFaviconFileName}`) > 0 ){

          // 特定のパス位置に/ooo/facicon.icoが存在する記述の場合( /common/images/favicon.ico )
          if( href.indexOf( '/' ) === 0 ){
            if( log ) console.log("@F");
            faviconName = `${protocol}//${host}${href}`;
            faviconType = '/[PATH][ICON]';

          // 特定の後パス位置に../ooo/facicon.icoが存在する記述の場合( common/images/favicon.ico )
          }else if( href.indexOf( "../") === 0 ){ 

            const splitedHref = href.split("../")
            const updateHref = href.replace(/\.\.\//g, "");
            const backPathCnt = splitedHref.length - 1;
            const splitedConnection = connection.split("/");
            const splitedConnectionLength = splitedConnection.length;
            const removePathCnt = backPathCnt + 3;
            let updateHost = "";

            for( let i = 0; i < splitedConnectionLength; i++ ){
              if( i > ( splitedConnectionLength - removePathCnt ) ){
                console.log("BREAK!");
                break;
              }
              updateHost = updateHost + splitedConnection[ i ] + "/";
              console.log( i + " " + updateHost);
            }

            faviconName = `${protocol}/${updateHost}${updateHref}`;
            faviconType = '[PATH]../[ICON]';
            if( log ) console.log("@G " + connection );
            if( log ) console.log("@G " + updateHost);
            if( log ) console.log("@G " + updateHref);
            if( log ) console.log("@G " + faviconName);
            if( log ) console.log("@G " + removePathCnt);
          }else{

            if( log ) console.log("@H " + href);
            faviconName = `${protocol}/${host}/${href}`;
            faviconType = '[PATH][ICON]';  
          }

        // それ以外の場合
        }else{
          if( log ) console.log("@I");
          faviconName = `${protocol}//${host}${href}`;
          faviconType = '[ELSE]';
        }

        // ランダム値を削除する
        faviconName = faviconName.replace(/[?].*$/, '');
        isDefault = Favicon.defaultFaviconData.faviconName === faviconName ;
        isExist = Logics.fs.isExistFavicon( util.getSaveFaviconName( faviconName ) );
        faviconDatas.push( {faviconName, faviconType, isExist, isDefault } );
      }

    // link(ICON)タグが存在しない場合
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
