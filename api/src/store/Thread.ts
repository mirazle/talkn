import Schema from 'common/Schema';
import Sequence from 'common/Sequence';
import conf from 'common/conf';

import App from 'api/store/App';
import BootOption from 'api/store/BootOption';

export type ThreadStatusType = {
  dispType: string;
  isCreate: boolean;
  isRequireUpsert: boolean;
  isMultistream: boolean;
  isMediaCh: boolean;
  isToggleMultistream: boolean;
  getMore: boolean;
};

export default class Thread extends Schema {
  static get findTypeAll(): 'All' {
    return 'All';
  }
  static get findTypeHtml(): 'Html' {
    return 'Html';
  }
  static get findTypeMusic(): 'Music' {
    return 'Music';
  }
  static get findTypePdf(): 'Pdf' {
    return 'Pdf';
  }
  static get findTypeVideo(): 'Video' {
    return 'Video';
  }
  static get findTypeOther(): 'Other' {
    return 'Other';
  }
  static get findTypes() {
    return {
      [Thread.findTypeHtml]: ['text/html'],
      [Thread.findTypeMusic]: ['audio', 'audio/mpeg', 'audio/mp4', 'audio/x-wav', 'audio/midi', 'application/x-smaf'],
      [Thread.findTypeVideo]: [
        'video',
        'video/mpeg',
        'video/mp4',
        'video/quicktime',
        'video/x-ms-wmv',
        'application/x-shockwave-flash',
        'video/3gpp2',
      ],
    };
  }
  static getDefaultTitle() {
    return 'talkn';
  }

  static getDefaultFavicon() {
    return `https://${conf.assetsURL}/favicon.ico`;
  }

  static isWindowObj(params) {
    return params.alert ? true : false;
  }

  href: string;
  ch: string;
  chs: [string] = ['/'];
  hasSlash: boolean;
  protocol: string = Sequence.TALKN_PROTOCOL;
  contentType: string;
  charset: string = 'UTF-8';
  host: string = '';
  favicon: string = Thread.getDefaultFavicon();
  findType: 'All' | 'Html' | 'Music' | 'Video' = Thread.findTypeAll;
  title: string = Thread.getDefaultTitle();
  metas: any = [];
  emotions: any = {};
  serverMetas: any = {};
  clientMetas: any = {};
  links: any = [];
  h1s: any = [];
  audios: any = [];
  videos: any = [];
  layer: number = Thread.getLayer();
  mediaIndex: any = [];
  postCnt: number = 0;
  multiPostCnt: number = 0;
  isSelfCh: boolean = false;
  createTime: string = '';
  updateTime: string = '';
  constructor(params: any = {}, bootOption?: BootOption | {}) {
    super();
    const thread = Thread.isWindowObj(params) ? Thread.constructorFromWindow(params, bootOption) : params;
    return this.create(thread);
  }

  static constructorFromWindow(params, bootOption) {
    const bootCh = bootOption.ch ? bootOption.ch : false;
    const ch = Thread.getCh(bootOption);

    let thread: any = {};
    let href = '';
    thread.ch = ch;
    thread.chs = ['/'];
    thread.hasSlash = bootOption.hasslash ? Schema.getBool(bootOption.hasslash) : false;
    thread.protocol = 'talkn:';
    thread.contentType = '';
    thread.charset = 'UTF-8';
    thread.host = '';
    thread.favicon = Thread.getDefaultFavicon();
    thread.findType = Thread.findTypeAll;

    if (bootCh) {
      // URLのコネクション文字列からではPROTOCOLは判別できない。
      thread.protocol = Thread.getProtocol(bootCh);
      thread.host = Thread.getHost(bootCh);
      thread.chs = bootCh.chs && bootCh.chs.length > 0 ? bootCh.chs : Thread.getChs(ch);
    } else {
      thread.protocol = location.protocol ? location.protocol : '????:';
      thread.chs = params.chs && params.chs.length > 0 ? params.chs : Thread.getChs(ch);
      thread.contentType = document.contentType ? document.contentType : '';
      thread.charset = document.charset ? document.charset : '';

      thread.host = location.host ? location.host : '';
      thread.favicon = Thread.getFaviconFromWindow(window);
    }

    thread.title = Thread.getDefaultTitle();
    thread.metas = [];
    thread.serverMetas = {};
    thread.clientMetas = {};
    thread.emotions = {};
    thread.links = [];
    thread.h1s = [];
    thread.audios = [];
    thread.videos = [];
    thread.layer = Thread.getLayer(thread.ch);
    thread.mediaIndex = [];
    thread.postCnt = 0;
    thread.multiPostCnt = 0;
    thread.isSelfCh = Thread.getIsSelfCh(href, thread.ch);
    thread.createTime = '';
    thread.updateTime = '';
    return thread;
  }

  static getCh(bootOption: any) {
    return bootOption && bootOption.ch && bootOption.ch !== '' ? bootOption.ch : '/';
  }

  static getChTop(ch) {
    if (ch !== '') {
      return '/' + ch.split('/')[1];
    } else {
      return '';
    }
  }

  static getChs(_ch) {
    let chs = ['/'];

    if (_ch !== '') {
      //ch = ch.replace(/\u002f$/g, '');
      const ch = _ch.slice(-1) === '/' ? _ch : _ch + '/';

      if (ch !== '/') {
        const chArr = ch.split('/');
        const chLength = chArr.length;
        let newCh = '';
        for (var i = 1; i < chLength; i++) {
          if (chArr[i] !== '') {
            newCh += chArr[i];

            // 一番最後が/の場合
            newCh = newCh.slice(-1) === '/' ? newCh : newCh + '/';

            // 一番最初が/の場合
            newCh = newCh.slice(0, 1) === '/' ? newCh : '/' + newCh;

            // 最後が/無しのコネクションを生成
            //noSlashCh = newCh.slice(0, -1);

            //chs.push( noSlashCh );
            chs.push(newCh);
          }
        }
      }
    }
    return chs;
  }

  static getHost(ch) {
    if (ch.indexOf('.') >= 0) {
      ch = ch.replace('https://', '').replace('http://', '');
      return ch.replace(/^\//, '').replace(/\/.*$/, '');
    } else {
      return conf.domain;
    }
  }

  static getProtocol(href) {
    if (href.indexOf('http:') >= 0) return 'http:';
    if (href.indexOf('https:') >= 0) return 'https:';
    if (location && location.protocol) return location.protocol;
    return '????:';
  }

  static getIsSelfCh(href, ch) {
    const replacedHref = href
      .replace('http:/', '')
      .replace('https:/', '')
      .replace(/\u002f$/, '');
    return replacedHref === ch;
  }

  static getLayer(ch = '/') {
    return ch.split('/').length - 1;
  }

  static getMediaSrc(thread) {
    return App.getMediaSrc(thread.protocol, thread.ch);
  }

  static getMediaTagType(thread) {
    const src = Thread.getMediaSrc(thread);
    return App.getMediaType(src, null);
  }

  static getFaviconFromWindow(window) {
    if (window && window.document) {
      const u = window.document.evaluate(
        "//link[contains(@rel,'icon')or(contains(@rel,'ICON'))][1]/@href",
        window.document,
        null,
        2,
        null
      ).stringValue;
      const h = 'http://';
      const hs = 'https://';
      const l = location.host;
      if (u.indexOf(h) || u.indexOf(hs)) {
        const url = h + l + (u || '/favicon.ico');
        const strCnt = url.split('//').length - 1;
        if (strCnt === 1) {
          return url;
        } else {
          return u;
        }
      } else {
        return u;
      }
    } else {
      return '';
    }
  }

  static getStatus(thread, app, isExist): ThreadStatusType {
    let status = {
      dispType: '', // TIMELINE, MULTI, SINGLE, CHILD, LOGS
      isCreate: false,
      isRequireUpsert: false,
      isMultistream: false,
      isMediaCh: false,
      isToggleMultistream: false,
      getMore: false,
    };

    /*******************************************************/
    /* threadが空のSchemaかどうか(DBにデータが存在しない)        */
    /*******************************************************/

    status.isCreate = Thread.getStatusCreate(isExist);

    /*******************************************************/
    /* 更新が必要なthreadかどうか                             */
    /*******************************************************/

    status.isRequireUpsert = Thread.getStatusIsRequireUpsert(thread, status.isCreate);

    /*******************************************************/
    /* Multistream形式かどうか                               */
    /*******************************************************/

    status.isMultistream = Thread.getStatusIsMultistream(app);

    /*******************************************************/
    /* Multistreamのボタンを押したか                          */
    /*******************************************************/

    status.isToggleMultistream = Thread.getStatusIsToggleMultistream(app);

    /*******************************************************/
    /* threadが空のSchemaかどうか(DBにデータが存在しない)        */
    /*******************************************************/

    status.isMediaCh = Thread.getStatusIsMediaCh(thread.ch);
    return status;
  }

  static getStatusCreate(isExist) {
    return !isExist;
  }

  static getStatusIsRequireUpsert(thread, isCreate = false) {
    if (!isCreate) {
      return true;
    }
    if (thread.updateTime) {
      const threadUpdateTime = thread.updateTime.getTime ? thread.updateTime.getTime() : thread.updateTime;

      // 現在時刻を取得
      const now = new Date();
      const nowYear = now.getFullYear();
      const nowMonth = now.getMonth();
      const nowDay = now.getDate();
      const nowHour = now.getHours();
      const nowMinutes = now.getMinutes();
      const activeDate = new Date(nowYear, nowMonth, nowDay, nowHour - conf.findOneThreadActiveHour);
      const activeTime = activeDate.getTime();

      // スレッドの更新時間と、現在時間 - n を比較して、スレッドの更新時間が古かったらtrueを返す
      return threadUpdateTime < activeTime;
    } else {
      return false;
    }
  }

  static getStatusIsMultistream(app): boolean {
    if (app === undefined || app.dispThreadType === undefined) return true;
    return app.dispThreadType === App.dispThreadTypeMulti && app.multistream;
  }

  static getStatusIsMediaCh(ch) {
    return App.getIsMediaCh(ch);
  }

  static getStatusIsToggleMultistream(app): boolean {
    // TODO: Judge fix actioned.
    if (app === undefined || app.actioned === undefined) return false;
    return app.isToggleMultistream;
  }

  static getContentTypeFromFindType(contentType) {
    const findTypeHtml = Thread.findTypes[Thread.findTypeHtml];
    const findTypeMusic = Thread.findTypes[Thread.findTypeMusic];
    const findTypeVideo = Thread.findTypes[Thread.findTypeVideo];

    let findType: typeof Thread.findTypeHtml | typeof Thread.findTypeMusic | typeof Thread.findTypeVideo | typeof Thread.findTypeOther;
    if (contentType && contentType !== '') {
      let splitedContentType = '';
      if (contentType.indexOf(';') > 0) {
        splitedContentType = contentType.split(';')[0];
      }
      if (findTypeHtml.includes(contentType) || findTypeHtml.includes(splitedContentType)) {
        findType = Thread.findTypeHtml;
      }
      if (findTypeMusic.includes(contentType) || findTypeMusic.includes(splitedContentType)) {
        findType = Thread.findTypeMusic;
      }
      if (findTypeVideo.includes(contentType) || findTypeVideo.includes(splitedContentType)) {
        findType = Thread.findTypeVideo;
      }
    }
    return findType;
  }

  static getFindTypeFromSrc(src) {
    const str = App.getMediaTypeFromSrc(src);
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
