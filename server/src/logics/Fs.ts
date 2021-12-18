import fs from 'fs';

import conf from 'common/conf';
import define from 'common/define';

export default class Fs {
  static names = {
    config: `${define.APP_NAME}.config.json`,
    creators: 'creators',
  };
  getConfig(ch): any {
    try {
      const serverPath = `${conf.serverCoverPath}${ch}${Fs.names.config}`;
      if (this.isExist(serverPath)) {
        const talknConfig = JSON.parse(fs.readFileSync(serverPath, 'utf8'));
        return talknConfig && talknConfig !== '' ? talknConfig : null;
      } else {
        return null;
      }
    } catch (err) {
      console.warn(err);
      return null;
    }
  }
  getCss(ch, config): any {
    if (config.css !== '') {
      fs.readFileSync(`${conf.serverAssetsPath}cover/${ch}/${config.css}`, 'utf8');
    } else {
      return null;
    }
  }

  getCreators(ch, creatorsIndexParam, config): any {
    try {
      const serverBasePath = `${conf.serverCoverPath}${ch}`;
      let creatorsIndex = creatorsIndexParam ? creatorsIndexParam : null;
      if (creatorsIndex === null) {
        creatorsIndex = config.creatorsIndex.length === 0 ? null : config.creatorsIndex.length;
      }

      let creators = null;
      if (creatorsIndex) {
        creators = JSON.parse(fs.readFileSync(`${serverBasePath}${Fs.names.creators}${creatorsIndex}.json`, 'utf8'));
      }
      return creators;
    } catch (err) {
      console.warn(err);
      return null;
    }
  }

  writeFavicon(fileName, binary) {
    const writeFileName = `${conf.serverAssetsPath}icon/${fileName}`;
    if (binary) {
      if (!this.isExist(writeFileName)) {
        fs.writeFileSync(writeFileName, binary, 'binary');
        return true;
      } else {
        return false;
      }
    } else {
      console.log('NO BINARY FAVICON ' + fileName);
      return false;
    }
  }

  isExistFavicon(fileName) {
    try {
      const writeFileName = `${conf.serverAssetsPath}icon/${fileName}`;
      fs.statSync(writeFileName);
      return true;
    } catch (err) {
      return false;
    }
  }

  isExist(writeFileName) {
    try {
      fs.statSync(writeFileName);
      return true;
    } catch (err) {
      return false;
    }
  }
}
