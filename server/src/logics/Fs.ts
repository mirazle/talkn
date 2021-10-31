import fs from 'fs';

import conf from 'common/conf';

export default class Fs {
  getInterview(ch, _interviewIndex): any {
    try {
      const index = JSON.parse(fs.readFileSync(`${conf.serverAssetsPath}cover/${ch}interview/index.json`, 'utf8'));
      const interviewIndex = _interviewIndex ? _interviewIndex : index.contents.length;
      const interview = JSON.parse(fs.readFileSync(`${conf.serverAssetsPath}cover/${ch}interview/${interviewIndex}.json`, 'utf8'));
      const css = fs.readFileSync(`${conf.serverAssetsPath}cover/${ch}interview/default.css`, 'utf8');
      return { index, interview, css };
    } catch (err) {
      console.warn(err);
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
