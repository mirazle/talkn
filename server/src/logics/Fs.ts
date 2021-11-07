import fs from 'fs';

import conf from 'common/conf';

export default class Fs {
  getInterview(ch, _interviewIndex): any {
    try {
      const serverPath = `${conf.serverAssetsPath}cover/${ch}interview`;
      const clientPath = `https://${conf.assetsURL}cover/${ch}interview`;
      const urls = { index: '', interview: '' };
      urls.index = `${clientPath}/index.json`;
      const index = JSON.parse(fs.readFileSync(`${serverPath}/index.json`, 'utf8'));
      const interviewIndex = _interviewIndex ? _interviewIndex : index.contents.length;

      urls.interview = `${clientPath}/${interviewIndex}.json`;
      const interview = JSON.parse(fs.readFileSync(`${serverPath}/${interviewIndex}.json`, 'utf8'));
      const css = fs.readFileSync(`${conf.serverAssetsPath}cover/${ch}interview/default.css`, 'utf8');
      return { index, interview, urls, css };
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
