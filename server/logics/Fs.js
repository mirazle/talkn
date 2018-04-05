import fs from 'fs';
import conf from '~/conf';

export default class Fs {
  write( fileName, binary ){
    fileName = fileName.replace(/\u002f/g, "\uff0f");;
    fileName = fileName.indexOf( '.png' ) > 0 ? fileName : fileName + ".png";
    const writeFileName = `${conf.assetsPath}icon/${fileName}`;
    if( binary && !this.isExist( writeFileName ) ){
      fs.writeFileSync(writeFileName, binary, 'binary');
      return true;
    }
    return false;
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
