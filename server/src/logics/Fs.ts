import fs from 'fs';
import path from 'path';

import conf from 'common/conf';
import define from 'common/define';

export default class Fs {
  static names = {
    config: `${define.APP_NAME}.config.json`,
    stories: 'stories',
    assetsCoverBasePath: `./src/listens/express/assets/cover/`,
    assetsCoverDefaultIcon: `icon.jpg`,
    assetsCoverDefaultBg: `bg.jpg`,
  };
  getConfig(ch): any {
    try {
      const fixedCh = ch === '/' ? '' : ch + '/';
      let serverPath = `${conf.serverAssetsPath}cover/${fixedCh}${Fs.names.config}`;
      serverPath = serverPath.replace(/\/\//g, '/');

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

  getStories(ch, storiesIndexParam, config): any {
    try {
      const serverBasePath = `${conf.serverCoverPath}${ch}`;
      let storyIndex = storiesIndexParam && config.stories[storiesIndexParam - 1] ? config.stories[storiesIndexParam - 1] : null;
      let stories = null;

      if (storyIndex) {
        stories = JSON.parse(fs.readFileSync(`${serverBasePath}${storyIndex.interview}`, 'utf8'));
      }
      return stories;
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

  writeImage(email, destpath, name, callback?) {
    const base64 = fs.readFileSync(destpath, 'utf8');
    const img = (data) => {
      const reg = /^data:image\/([\w+]+);base64,([\s\S]+)/;
      const match = data.match(reg);
      const baseType = {
        jpeg: 'jpg',
      };

      baseType['svg+xml'] = 'svg';

      if (!match) {
        throw new Error('image base64 data error');
      }

      var extname = baseType[match[1]] ? baseType[match[1]] : match[1];

      return {
        extname: '.' + extname,
        base64: match[2],
      };
    };

    const result = img(base64);
    const fileName = name + result.extname;
    const filePath = path.join(`${Fs.names.assetsCoverBasePath}${email}/`, fileName);
    fs.writeFile(filePath, result.base64, { encoding: 'base64' }, (err) => {
      fs.unlinkSync(destpath);
      callback && callback(err, fileName);
    });
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

  mkdirAssetsCover(userId, callback = () => {}) {
    const path = `${Fs.names.assetsCoverBasePath}${userId}/`;
    if (!this.isExist(path)) {
      fs.mkdir(path, { recursive: true }, (err) => {
        if (err) throw err;
        callback();
      });
    }
    return path;
  }

  copyDefaultFile(userId) {
    const defaultBgPath = `${Fs.names.assetsCoverBasePath}${Fs.names.assetsCoverDefaultBg}`;
    const defaultIconPath = `${Fs.names.assetsCoverBasePath}${Fs.names.assetsCoverDefaultIcon}`;
    const userBgPath = `${Fs.names.assetsCoverBasePath}${userId}/bg.jpg`;
    const userIconPath = `${Fs.names.assetsCoverBasePath}${userId}/icon.jpg`;
    fs.copyFileSync(defaultBgPath, userBgPath);
    fs.copyFileSync(defaultIconPath, userIconPath);
  }

  getCoverImage(email, type) {
    const path = `${Fs.names.assetsCoverBasePath}${email}/${type}`;
    if (this.isExist(path)) {
      return fs.readFileSync(path, 'utf8');
    } else {
      return '';
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
