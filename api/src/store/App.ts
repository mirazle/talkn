import Schema from 'common/Schema';

import Post from 'api/store/Post';
import Thread from 'api/store/Thread';

export type FromType = 'Ch' | 'BackToRootCh' | 'ToMedia' | 'Links' | 'findMediaCh' | '';

export default class App extends Schema {
  static get defaultOffsetFindId() {
    return Post.defaultFindId;
  }
  static get dispThreadTypeTimeline(): 'Timeline' {
    return 'Timeline';
  }
  static get dispThreadTypeSingle(): 'Single' {
    return 'Single';
  }
  static get dispThreadTypeMulti(): 'Multi' {
    return 'Multi';
  }
  static get dispThreadTypeChild(): 'Child' {
    return 'Child';
  }
  static get dispThreadTypeLogs(): 'Logs' {
    return 'Logs';
  }
  static get mediaTagTypeNo() {
    return 'html';
  }
  static get mediaTagTypeAudio() {
    return 'audio';
  }
  static get mediaTagTypeVideo() {
    return 'video';
  }
  static get mediaTypeMp3() {
    return 'mp3';
  }
  static get mediaTypeMp4() {
    return 'mp4';
  }
  static get mediaTypeM4a() {
    return 'm4a';
  }
  static get mediaChs() {
    return [App.mediaTypeMp3, App.mediaTypeMp4, App.mediaTypeM4a];
  }
  static get mediaChTagTypes() {
    return {
      [App.mediaTypeMp3]: App.mediaTagTypeAudio,
      [App.mediaTypeMp4]: App.mediaTagTypeVideo,
      [App.mediaTypeM4a]: App.mediaTagTypeAudio,
    };
  }
  static getMediaType(src, params) {
    if (params && params.chType) {
      return params.chType;
    }
    return App.getMediaTypeFromSrc(src);
  }
  static getMediaTypeFromSrc(src) {
    const mediaChTagTypeKeys = Object.keys(App.mediaChTagTypes);
    const mediaChTagTypeLength = mediaChTagTypeKeys.length;
    let mediaType = 'html';
    for (let i = 0; i < mediaChTagTypeLength; i++) {
      const regExp = new RegExp(`.${mediaChTagTypeKeys[i]}$`);
      if (src.match(regExp)) {
        mediaType = App.mediaChTagTypes[mediaChTagTypeKeys[i]];
        break;
      }
    }
    return mediaType;
  }
  static validInputPost(value) {
    if (/\r\n$|\n$|\r$/gim.test(value)) return 'LAST TYPE BREAK LINE.';
    return false;
  }

  static validPost(value) {
    if (value === '') return 'NO INPUT POST';
    if (/^\r\n+$|\n+$|\r+$/g.test(value)) return 'ONLY NEW LINE';
    if (/^\s+$/g.test(value)) return 'only space';
    if (/^\r\n+(\s|\S)+$|^\n+(\s|\S)+$|^\r+(\s|\S)+$/.test(value)) return 'EMPTY POST';
    return false;
  }

  static getWidth(params) {
    if (typeof window === 'object' && window.innerWidth) return window.innerWidth;
    if (params.width) {
      if (typeof params.width === 'string') {
        if (params.width.indexOf('px') >= 0) {
          return Number(params.width.replace('px', ''));
        }
      }
      return params.width;
    }
    return 0;
  }

  static getHeight(params = {}) {
    if (typeof window === 'object' && window.innerHeight) return window.innerHeight;
    return 0;
  }

  id: string;

  // スレッド基本関連
  isRootCh: boolean;
  isLinkCh: boolean;
  isMediaCh: boolean;
  isTune: boolean;
  rootCh: string;
  rootTitle: string;
  chType: 'video' | 'audio' | 'html';
  dispThreadType: 'Multi' | 'Single' | 'Child' | 'Timeline' | 'Logs';
  tunedCh: string;
  multistream: boolean;

  // 投稿情報
  findType: 'html' | 'mp3' | 'mp4' | 'm4a' | 'audio' | 'video';
  offsetFindId: string;
  offsetTimelineFindId: string = Post.defaultFindId;
  offsetSingleFindId: string = Post.defaultFindId;
  offsetMultiFindId: string = Post.defaultFindId;
  offsetChildFindId: string = Post.defaultFindId;
  offsetLogsFindId: string = Post.defaultFindId;

  // 入力状態
  inputPost: string;
  inputStampId: string | number;
  inputCurrentTime: number;
  inputSearch: string;

  // その他
  isToggleMultistream: boolean;
  isRankDetailMode: boolean;
  actioned: string;
  debug: string;

  constructor(params: any = {}, call = '') {
    super();

    // 準備
    const ch = params.ch ? params.ch : '';

    // ID
    const id = params.id ? params.id : '';

    // スレッド基本関連
    const isTune = Schema.isSet(params.isTune) ? params.isTune : false;
    const isMediaCh = Schema.isSet(params.isMediaCh) ? params.isMediaCh : App.getIsMediaCh(ch);
    const isLinkCh = Schema.isSet(params.isLinkCh) ? params.isLinkCh : false;
    const rootCh = params.rootCh ? params.rootCh : ch;
    const isRootCh = Schema.isSet(params.isRootCh) ? params.isRootCh : rootCh === ch;
    const rootTitle = params.rootTitle ? params.rootTitle : 'talkn';
    const src = App.getMediaSrc(params.protocol, ch);
    const chType = App.getMediaType(src, params);
    const tunedCh = params && params.tunedCh ? params.tunedCh : '';
    const dispThreadType = App.getDispThreadType(params, isMediaCh);
    const multistream = Schema.isSet(params.multistream) ? params.multistream : true;

    // 投稿情報
    const findType = params && params.findType ? params.findType : Thread.findTypeAll;
    const offsetFindId = params && params.offsetFindId ? params.offsetFindId : App.defaultOffsetFindId;
    const offsetTimelineFindId = params && params.offsetTimelineFindId ? params.offsetTimelineFindId : App.defaultOffsetFindId;
    const offsetSingleFindId = params && params.offsetSingleFindId ? params.offsetSingleFindId : App.defaultOffsetFindId;
    const offsetMultiFindId = params && params.offsetMultiFindId ? params.offsetMultiFindId : App.defaultOffsetFindId;
    const offsetChildFindId = params && params.offsetChildFindId ? params.offsetChildFindId : App.defaultOffsetFindId;
    const offsetLogsFindId = params && params.offsetLogsFindId ? params.offsetLogsFindId : App.defaultOffsetFindId;

    // 入力状態
    const inputPost = params.inputPost ? params.inputPost : '';
    const inputStampId = params.inputStampId ? params.inputStampId : false;
    const inputCurrentTime = params.inputCurrentTime ? params.inputCurrentTime : 0.0;
    const inputSearch = params.inputSearch ? params.inputSearch : '';

    // その他
    const isToggleMultistream = Schema.isSet(params.isToggleMultistream) ? params.isToggleMultistream : false;
    const isRankDetailMode = Schema.isSet(params.isRankDetailMode) ? params.isRankDetailMode : false;
    const actioned = params && params.actioned ? params.actioned : '';
    const debug = Schema.isSet(params.debug) ? params.debug : '';

    return this.create({
      // ID
      id,

      // スレッド基本関連
      isTune,
      isRootCh,
      isLinkCh,
      isMediaCh,
      rootCh,
      rootTitle,
      chType,
      dispThreadType,
      tunedCh, // changeThreadの際の接続していた古いスレッドのCH(liveCntをデクリメントする用途)として保持
      multistream, // dispThreadTypeがChild, Timelineになってもmultistream状態を維持する

      //      threadScrollY,

      // 投稿情報
      findType,
      offsetFindId,
      offsetTimelineFindId,
      offsetSingleFindId,
      offsetMultiFindId,
      offsetChildFindId,
      offsetLogsFindId,

      // detail情報

      // 入力状態
      inputPost,
      inputStampId,
      inputCurrentTime,
      inputSearch,

      // その他
      isToggleMultistream,
      isRankDetailMode,
      actioned,
      debug,
    });
  }

  static isMediaContentType(contentType) {
    return App.isAudioContentType(contentType) || App.isVideoContentType(contentType);
  }

  static isAudioContentType(contentType) {
    return contentType.indexOf(App.mediaTagTypeAudio) >= 0;
  }

  static isVideoContentType(contentType) {
    return contentType.indexOf(App.mediaTagTypeVideo) >= 0;
  }

  static getMediaSrc(protocol, ch) {
    return protocol + '/' + ch.replace(/\/$/, '');
  }

  static getIsMediaCh(ch) {
    return App.mediaChs.some((ext) => {
      const regexp = new RegExp(`.${ext}\/$|.${ext}$`);
      return ch.match(regexp);
    });
  }

  static getDispThreadType(params, isMediaCh) {
    if (params && params.dispThreadType) {
      return params.dispThreadType;
    } else {
      if (isMediaCh) {
        return App.dispThreadTypeTimeline;
      } else {
        return App.dispThreadTypeMulti;
      }
    }
  }

  static getOffsetFindId({ posts }) {
    if (posts && posts[0] && posts[0]._id) {
      return posts[0]._id;
    }
    return Post.defaultFindId;
  }

  static getStepToDispThreadType({ app, ranks }: any, threadStatus: any, toCh: string, clicked: FromType = '') {
    let afterDispThreadType = '';
    const beforeDispThreadType = app && app.dispThreadType ? app.dispThreadType : App.dispThreadTypeMulti;
    app = App.getStepDispThreadType({ app, ranks }, threadStatus, toCh, clicked);
    afterDispThreadType = app.dispThreadType;
    return { app, stepTo: `${beforeDispThreadType} to ${afterDispThreadType}` };
  }

  static getStepDispThreadType({ app, ranks }, threadStatus: any = {}, toCh, clicked) {
    const log = false;
    const updatedApp = app ? app : {};
    updatedApp.offsetFindId = App.defaultOffsetFindId;

    if (log) console.log(ranks);
    if (log) console.log(threadStatus);

    if (threadStatus.isMediaCh) {
      if (log) console.log('B');
      updatedApp.dispThreadType = App.dispThreadTypeTimeline;
      updatedApp.offsetFindId = updatedApp.offsetTimelineFindId ? updatedApp.offsetTimelineFindId : App.defaultOffsetFindId;
      updatedApp.isLinkCh = clicked === 'Links' || clicked === 'findMediaCh' || clicked === 'ToMedia' ? true : false;
      updatedApp.isMediaCh = true;
      return updatedApp;
    }

    if (clicked === 'BackToRootCh') {
      updatedApp.isLinkCh = false;
    }

    if (clicked === 'Links' && ranks.length > 0) {
      const haveMenuIndex = ranks.some((mi) => {
        return mi.ch === toCh || mi.ch === toCh + '/';
      });

      if (log) console.log('C ' + haveMenuIndex + '');

      if (!haveMenuIndex) {
        if (log) console.log('D');

        updatedApp.offsetFindId = App.defaultOffsetFindId;
        updatedApp.dispThreadType = App.dispThreadTypeChild;
        updatedApp.isLinkCh = true;
        return updatedApp;
      }
    }

    if (updatedApp.rootCh === toCh) {
      if (updatedApp.multistream) {
        if (log) console.log('E');
        updatedApp.dispThreadType = App.dispThreadTypeMulti;
      } else {
        if (log) console.log('F');
        updatedApp.dispThreadType = App.dispThreadTypeSingle;
      }
    } else {
      if (log) console.log('G');
      updatedApp.dispThreadType = App.dispThreadTypeChild;
    }
    if (log) console.log(app);
    return updatedApp;
  }
}
