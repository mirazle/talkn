import fs from 'fs';

export default class Fs {
  write( faviconName, icon ){
    const writeFaviconName = `./assets/icon/${faviconName.replace( '/' , '_' )}.png`;
    if( icon && !this.isExist( writeFaviconName ) ){
      fs.writeFileSync(writeFaviconName, icon, 'binary');
      return true;
    }
    return false;
  }

  isExist( writeFaviconName ){
    try {
      fs.statSync( writeFaviconName );
      return true
    } catch( err ) {
      return false
    }
  }
}
