export default {
  isUrl: (str) => {
    const pattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*|\\/)?$', // fragment locator
      'i'
    ); // fragment locåator

    return !pattern.test(str) ? false : true;
  },
  getSaveFaviconName: (fileName) => {
    if (fileName) {
      const _fileName = fileName.replace(/\u002f/g, '_');
      return _fileName.indexOf('.png') > 0 ? _fileName : _fileName + '.png';
    }
  },
  trimPx: (value) => {
    return value.toString().replace('px', '');
  },
  getUpperPrefix: (str) => {
    let text = str.charAt(0).toUpperCase() + str.slice(1);
    return text.substring(0, 1).toUpperCase() + text.substring(1);
  },
};
