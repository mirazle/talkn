import fs from 'fs';

import conf from 'common/conf';

export default class Fs {
  getInterview(ch): any {
    try {
      const interview = JSON.parse(fs.readFileSync(`${conf.serverAssetsPath}cover/${ch}interview/1.json`, 'utf8'));
      const css = fs.readFileSync(`${conf.serverAssetsPath}cover/${ch}interview/default.css`, 'utf8');
      return { interview, css };
    } catch (err) {
      return '';
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
