import fs from 'fs';

export default class Fs {
  write( fileName, binary ){
    const writeFileName = `./assets/icon/${fileName.replace( '/' , '_' )}.png`;
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
