import util from '~/common/util'
import conf from '~/common/conf';
import fs from 'fs';

export default class Fs {

  writeFavicon( fileName, binary ){

    const writeFileName = `${conf.serverAssetsPath}icon/${fileName}`;
    if( binary ){
      if( !this.isExist( writeFileName ) ){
        fs.writeFileSync(writeFileName, binary, 'binary');
        return true;
      }else{
        return false;
      }
    }else{
      console.log( "NO BINARY FAVICON " + fileName );
      return false;
    }
  }

  isExistFavicon( fileName ){
    try {
      const writeFileName = `${conf.serverAssetsPath}icon/${fileName}`;
      fs.statSync( writeFileName );
      return true
    } catch( err ) {
      return false
    }
  }

  isExist( writeFileName ){
    try {
      fs.statSync( writeFileName );
      return true
    } catch( err ) {
      return false
    }
  }
}
