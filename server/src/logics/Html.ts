import { Buffer } from 'buffer';
import cheerio from 'cheerio';
import { Iconv } from 'iconv';
import request from 'request';

import Sequence from 'common/Sequence';
import define from 'common/define';

import conf from 'server/conf';
import MongoDB from 'server/listens/db/MongoDB';
import Logics from 'server/logics';
import Fs from 'server/logics/Fs';
import HtmlSchema from 'server/schemas/logics/html';
import utils from 'server/utils';

import App from 'api/store/App';

const log = false;

export default class Html {
  public allChLayers: any = [];
  public fetchedCh = [];
  public successCh = [];
  public results: any = [];
  public depthLimit: number;

  constructor(allChLayers = [], fetchedCh = []) {
    this.allChLayers = allChLayers;
    this.fetchedCh = fetchedCh;
  }

  static get checkSpace() {
    return /^\s*$/;
  }

  setFetchedCh(ch): boolean {
    const isIncluded = this.fetchedCh.includes(ch);
    if (isIncluded) return true;
    this.fetchedCh.push(ch);
    return false;
  }

  // ROOT CH(Recurrent)
  // chを渡して、chLayer作成し、promise.allして全てchLayer全てのchをfetchする
  fetchChRecurrent(rootCh: string, fetchCh?: string, depth = 1) {
    fetchCh = fetchCh ? fetchCh : rootCh;
    return new Promise((resolve): any => {
      this.setFetchedCh(fetchCh);
      this.fetchCh(rootCh, fetchCh).then((result) => {
        if (result.response === null) {
          resolve(this.results);
        } else {
          let layerChPromises = [];
          this.results.push(result);

          if (fetchCh === '/hitonote.jp/result/') {
          }
          if (depth < this.depthLimit) {
            depth = depth + 1;
            // マージされて追加
            this.allChLayers = this.getMergedChLayersFromLinks(rootCh, fetchCh, result.response.links);

            // fetch ch layers.
            this.allChLayers.forEach((chLayer) => {
              chLayer.forEach((innerFetchCh) => {
                if (!this.setFetchedCh(innerFetchCh)) {
                  layerChPromises.push(this.fetchChRecurrent(rootCh, innerFetchCh, depth));
                }
              });
            });
          }

          return Promise.all(layerChPromises).then((_results) => {
            const results = _results.filter((result) => result && result.response);

            if (results && results.length > 0) {
              this.results = [...this.results, ...results];
            }
            resolve(this.results);
          });
        }
      });
    });
  }

  // ROOT CH
  async fetchCh(rootCh, ch, prorocol = Sequence.HTTPS_PROTOCOL) {
    let result: any = { protocol: Sequence.HTTPS_PROTOCOL, ch, response: null };
    const fetchUrl = this.getFetchUrl(ch, true);
    const exeFetchCh = async (fetchUrl) => {
      if (prorocol) {
        result = await Logics.html.exeFetch(prorocol, fetchUrl);
      } else {
        result = await Logics.html.exeFetch(Sequence.HTTPS_PROTOCOL, fetchUrl);
        if (!result.response) {
          result.protocol = Sequence.HTTP_PROTOCOL;
          result = await Logics.html.exeFetch(Sequence.HTTP_PROTOCOL, fetchUrl);
        }
      }
      return result;
    };
    console.log(this.successCh.length, 'REQUEST', fetchUrl);

    result = await exeFetchCh(fetchUrl);

    if (result.response === null) {
      result = await exeFetchCh(fetchUrl.replace(/\/$/, ''));
    }

    if (result.response) {
      console.log(this.successCh.length, 'RESPONSE', fetchUrl);
      this.successCh.push(ch);
    }
    return result;
  }

  getMergedChLayersFromLinks(rootCh, ch, links) {
    // GET UNDER CH
    links.forEach((link) => {
      const href = typeof link === 'string' ? link : link.href;
      const { buildCh: childCh, childChLayer } = this.getBuildChData(rootCh, ch, href);
      if (childCh) {
        if (!this.allChLayers[childChLayer]) {
          this.allChLayers[childChLayer] = [];
        }

        // fetch済みは弾く
        if (!this.fetchedCh.includes(childCh)) {
          // fertch対象は重複は弾く
          if (!this.allChLayers[childChLayer].includes(childCh)) {
            this.allChLayers[childChLayer].push(childCh);
          }
        }
      }
    });

    return this.allChLayers;
  }

  getBuildChData(rootCh, ch, href) {
    let buildCh = undefined;
    let childChLayer = 0;
    const haveJavascriptVoid = href.indexOf('javascript:void(0)');
    const haveSharp = href.indexOf('#');
    const rootIndex = href.indexOf('/');
    const questionIndex = href.indexOf('?');
    const backIndex = href.indexOf('../');
    let buildRoot = '';

    // 絶対パス
    if (href.indexOf(Sequence.HTTPS_PROTOCOL) === 0 || href.indexOf(Sequence.HTTP_PROTOCOL) === 0) {
      // 絶対パス(自身のドメイン)
      if (href.indexOf(`${Sequence.HTTPS_PROTOCOL}/${rootCh}`) === 0 || href.indexOf(`${Sequence.HTTP_PROTOCOL}/${rootCh}`) === 0) {
        buildCh = href.replace(`${Sequence.HTTPS_PROTOCOL}/`, '').replace(`${Sequence.HTTP_PROTOCOL}/`, '');
      }
      // 相対パス(自身のドメイン)
    } else {
      if (haveSharp !== 0) {
        if (rootIndex === 0) {
          if (href.indexOf(rootCh) === 0) {
            buildCh = href;
          } else {
            const path = href.replace(/^\//, '');
            buildCh = `${rootCh}${path}`;
          }
        }
        if (haveJavascriptVoid >= 0) {
          buildCh = href.replace(/javascript\:void\(0\).*$/, '');
          buildCh = buildCh === '' ? undefined : buildCh;
        }
        if (questionIndex >= 0) {
          buildCh = rootCh + href.substr(0, questionIndex);
        }
        if (haveSharp >= 0) {
          buildCh = rootCh + href.replace(/^\//, ''); //.replace(/\#.*$/, '');
        }
        if (backIndex >= 0) {
          const backPathCnt = href.split('../').length - 1;
          const chSplited = ch.split('/');
          const chSplitedCnt = chSplited.length - 1;
          let basePath = '';
          chSplited.forEach((chParts, index) => {
            if (index < chSplitedCnt - backPathCnt) {
              basePath += chParts === '' ? '/' : chParts + '/';
            }
          });
          buildCh = basePath + href.replace(/\.\.\//g, '');
        }
        if (ch.endsWith('/') && href.startsWith('/')) {
          if (ch.indexOf(href) >= 0) {
            const path = href.replace(/^\//, '');
            buildCh = `${rootCh}${path}`;
          }
        }
      }
    }
    if (buildCh && haveJavascriptVoid >= 0) {
      buildCh = buildCh.replace(/javascript\:void\(0\).*$/, '');
      buildCh = buildCh === '' ? undefined : buildCh;
    }

    if (buildCh) {
      if (!buildCh.endsWith('/')) {
        buildCh = buildCh + '/';
      }
      childChLayer = buildCh.split('/').length - 1;
    }
    return { buildCh, childChLayer, buildRoot };
  }

  async fetchCoverConfig(ch) {
    const fetchUrl = this.getFetchUrl(ch, true);
    let result: any = { response: null, iconHrefs: [] };

    result = await Logics.html.exeFetch(Sequence.HTTPS_PROTOCOL, fetchUrl);

    if (!result.response) {
      result = await Logics.html.exeFetch(Sequence.HTTP_PROTOCOL, fetchUrl);
    }

    if (result.response) {
      return result;
    } else {
      result.response = MongoDB.getDefineSchemaObj(new HtmlSchema({}));
      return result;
    }
  }

  getFetchUrl(ch = '/', hasSlash) {
    let fetchUrl = ch;
    if (ch === '/') {
      fetchUrl = `//${conf.domain}`;
    } else {
      if (hasSlash) {
        if (ch.endsWith('/')) {
          fetchUrl = `/${ch}`;
        } else {
          fetchUrl = `/${ch}/`;
        }
      } else {
        if (fetchUrl.endsWith('/')) {
          fetchUrl = fetchUrl.replace(/\/$/, '');
        }
        fetchUrl = `/${fetchUrl}`;
      }
    }
    return fetchUrl;
  }

  async fetch(thread, { protocol, ch, hasSlash }) {
    // io(tune)する際はGETで接続するのでboolがstringになってしまう
    hasSlash = utils.getBool(hasSlash);

    const fetchUrl = this.getFetchUrl(ch, hasSlash);
    let result: any = { response: null, iconHrefs: [] };

    switch (protocol) {
      case Sequence.HTTPS_PROTOCOL:
        result = await Logics.html.exeFetch(Sequence.HTTPS_PROTOCOL, fetchUrl);

        if (!result.response) {
          result = await Logics.html.exeFetch(Sequence.HTTP_PROTOCOL, fetchUrl);
        }
        break;
      case Sequence.HTTP_PROTOCOL:
        result = await Logics.html.exeFetch(Sequence.HTTP_PROTOCOL, fetchUrl);
        if (!result.response) {
          result = await Logics.html.exeFetch(Sequence.HTTPS_PROTOCOL, fetchUrl);
        }
        break;
      case Sequence.TALKN_PROTOCOL:
      case Sequence.UNKNOWN_PROTOCOL:
      default:
        result = await Logics.html.exeFetch(Sequence.HTTPS_PROTOCOL, fetchUrl);
        if (!result.response) {
          result = await Logics.html.exeFetch(Sequence.HTTP_PROTOCOL, fetchUrl);
        }
        break;
    }

    if (result.response) {
      return result;
    } else {
      result.response = MongoDB.getDefineSchemaObj(new HtmlSchema({}));
      return result;
    }
  }

  exeFetch(protocol, url) {
    return new Promise((resolve, reject) => {
      const ch = url.replace(/^\//, '');
      const option = { method: 'GET', encoding: 'binary', url: protocol + encodeURI(url), timeout: 10000 };
      // localhost is not get.
      request(option, (error, response, body) => {
        if (log) {
          console.log('Fetch Html ' + option.url);
          console.log(error);
        }

        let responseSchema = MongoDB.getDefineSchemaObj(new HtmlSchema({}));

        if (!error && response && response.statusCode === 200) {
          const contentType = response.headers['content-type'];
          let iconHrefs = [];
          responseSchema.contentType = contentType;
          responseSchema.protocol = protocol;

          // media fileの場合
          if (App.isMediaContentType(contentType)) {
            responseSchema.title = this.getTitle(null, url, contentType);
            responseSchema.serverMetas.title = responseSchema.title;
            if (App.isAudioContentType(contentType)) {
              responseSchema.audios = [{ src: url, title: responseSchema.title }];
            }
            if (App.isVideoContentType(contentType)) {
              responseSchema.videos = [{ src: url, title: responseSchema.title }];
            }
          } else {
            const utf8Body = this.toUtf8Str(body, contentType);
            const $ = cheerio.load(utf8Body);
            iconHrefs = this.getIconHrefs($);
            responseSchema.links = this.getLinks($);
            responseSchema.h1s = this.getHTags($, 1);
            responseSchema.h2s = this.getHTags($, 2);
            responseSchema.h3s = this.getHTags($, 3);
            responseSchema.h4s = this.getHTags($, 4);
            responseSchema.h5s = this.getHTags($, 5);
            responseSchema.videos = this.getVideos($);
            responseSchema.audios = this.getAudios($);
            responseSchema.serverMetas = this.getMetas($, url, responseSchema, response.request.uri.href);
          }
          resolve({ response: responseSchema, iconHrefs, ch });
        } else {
          resolve({ response: null, iconHrefs: [], ch });
        }
      });
    });
  }

  exeFetchConfig(protocol, ch): any {
    return new Promise((resolve, reject) => {
      const url = `${protocol}:/${ch}${Fs.names.config}`;
      const option = { method: 'GET', encoding: 'binary', url, timeout: 2000 };
      request(option, (error, response, body) => {
        if (log) {
          console.log('Fetch Config ' + option.url);
          console.log(error);
        }

        if (!error && response && response.statusCode === 200) {
          resolve(null);
        } else {
          resolve(null);
        }
      });
    });
  }

  getTitle($, url, contentType) {
    let title = '';
    if (App.isMediaContentType(contentType)) {
      const splitedCh = url.split('/');

      const _title1 = splitedCh[splitedCh.length - 1];
      if (_title1 !== '') return _title1;
      const _title2 = splitedCh[splitedCh.length - 2];
      if (_title2 !== '') return _title2;
      const _title3 = splitedCh[splitedCh.length - 3];
      if (_title3 !== '') return _title3;
    } else {
      title = $('head title').text();
    }
    return title;
  }

  getHTags($, number) {
    const hLength = $(`h${number}`).length;
    let hs = [];
    for (let i = 0; i < hLength; i++) {
      const h1 = $(`h${number}`).get(i);
      hs.push($(h1).text());
    }
    return hs;
  }

  getVideos($) {
    const videoLength = $('video').length;
    let videos: any = [];

    for (let i = 0; i < videoLength; i++) {
      const video = $('video').get(i);
      const sources = $(video).find('source');
      const sourceLength = sources.length;

      if (video.attribs.src) {
        const splitedTitle = video.attribs.src.split('/');
        const title = splitedTitle[splitedTitle.length - 1];
        videos.push({ ...video.attribs, title });
      }

      for (var j = 0; j < sourceLength; j++) {
        const src = sources[j].attribs.src;
        const splitedTitle = src.split('/');
        const title = splitedTitle[splitedTitle.length - 1];
        videos.push({ ...videos.attribs, src, title });
      }
    }
    return videos;
  }

  getAudios($) {
    const audioLength = $('body audio').length;

    let audios = [];
    for (let i = 0; i < audioLength; i++) {
      const audio = $('audio').get(i);
      const sources = $(audio).find('source');
      const sourceLength = sources.length;

      if (audio.attribs.src) {
        const splitedTitle = audio.attribs.src.split('/');
        const title = splitedTitle[splitedTitle.length - 1];
        audios.push({ ...audio.attribs, title });
      }

      for (var j = 0; j < sourceLength; j++) {
        const src = sources[j].attribs.src;
        const splitedTitle = src.split('/');
        const title = splitedTitle[splitedTitle.length - 1];
        audios.push({ ...audio.attribs, src, title });
      }
    }
    return audios;
  }

  getIconHrefs($) {
    let iconHrefs = [];
    const icon = $('head link[rel="icon"]');
    const Icon = $('head link[rel="Icon"]');
    const shortcutIcon = $('head link[rel="shortcut icon"]');
    const iconLength = icon.length;
    const IconLength = Icon.length;
    const shortcutIconLength = shortcutIcon.length;

    if (iconLength > 0) {
      for (let i = 0; i < iconLength; i++) {
        if (icon[i].attribs.href !== '') {
          iconHrefs.push(icon[i].attribs.href);
        }
      }
    }
    if (IconLength > 0) {
      for (let i = 0; i < IconLength; i++) {
        if (Icon[i].attribs.href !== '') {
          iconHrefs.push(Icon[i].attribs.href);
        }
      }
    }
    if (shortcutIconLength > 0) {
      for (let i = 0; i < shortcutIconLength; i++) {
        if (shortcutIcon[i].attribs.href !== '') {
          iconHrefs.push(shortcutIcon[i].attribs.href);
        }
      }
    }
    return iconHrefs;
  }

  getLinks($) {
    const linkLength = $('body a').length;

    const getHref = (item) => {
      if (item && item.attribs && item.attribs.href && item.attribs.href !== '') {
        return item.attribs.href;
      }
      return '';
    };
    const getText = ($, item, text = '') => {
      const itemLength = item.children.length;

      for (let i = 0; i < itemLength; i++) {
        const child = item.children[i];

        if (child.type === 'text' && child.data !== '' && !Html.checkSpace.test(child.data)) {
          text = text === '' ? child.data : text + '&nbsp;' + child.data;
          break;
        }

        if (
          child.name === 'img' &&
          child.attribs &&
          child.attribs.alt &&
          child.attribs.alt !== '' &&
          !Html.checkSpace.test(child.attribs.alt)
        ) {
          text = child.attribs.alt;
          break;
        }

        if (child.children && child.children.length > 0) {
          text = getText($, child, text);
          break;
        }
        break;
      }

      if (text === undefined || text !== '' || Html.checkSpace.test(text)) {
        text = $(item).text();
      }
      return text;
    };

    let links = [];

    for (var i = 0; i < linkLength; i++) {
      const item = $('body a').get(i);
      const href = getHref(item);
      const text = getText($, item, '');

      if (href && href !== '' && text && text !== '') {
        links.push({ href, text });
      }
    }
    return links;
  }

  getMetas($, url, parentSchema, href) {
    let responseSchema = MongoDB.getDefineSchemaObj(new HtmlSchema({}));
    let serverMetas = responseSchema.serverMetas;
    const metaLength = $('meta').length;

    serverMetas.title = this.getTitle($, url, parentSchema.contentType);

    for (var i = 0; i < metaLength; i++) {
      const item = $('meta').get(i);
      let key: any = i;
      let content = '';
      if (item.attribs.name) {
        key = item.attribs.name;
        content = item.attribs.content;
      } else if (item.attribs.property) {
        key = item.attribs.property;
        content = item.attribs.content;
      } else if (item.attribs.charset) {
        key = 'charset';
        content = item.attribs.charset;
      } else if (item.attribs['http-equiv']) {
        key = item.attribs['http-equiv'];
        content = item.attribs.content;
      }

      if (key === 'og:image') {
        if (content.indexOf(Sequence.HTTP_PROTOCOL) !== 0 && content.indexOf(Sequence.HTTPS_PROTOCOL) !== 0) {
          content = `${href}${content}`;
        }
      }

      if (log) console.log('----------- ' + key + ' : ' + content);
      key = key.toString().replace('.', '_');
      serverMetas[key] = content;
    }

    return serverMetas;
  }

  toUtf8Str(body, contentType) {
    const encoding = this.getCharset(body); //jschardet.detect( body ).encoding;
    const buf = Buffer.from(body, 'binary');
    try {
      const iconv = new Iconv(encoding, 'UTF-8//TRANSLIT//IGNORE');
      return iconv.convert(buf).toString();
      //      return String(buf);
    } catch (e) {
      console.warn(e);
      return body;
    }
  }

  getCharset(body) {
    const bin = body.toString('binary');
    const re = bin.match(/<meta\b[^>]*charset=["']?([\w\-]+)/i);
    return re ? re[1] : 'utf-8';
  }
}
