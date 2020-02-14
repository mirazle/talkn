import Schema from "api/store/Schema";
import App from "api/store/App";
import Post from "api/store/Post";
import Thread from "api/store/Thread";
import conf from "client/conf";

export default class Ui extends Schema {
  static get openLockMenuLabelNo() {
    return "No";
  }
  static get openLockMenuLabelLike() {
    return "Like";
  }
  static get openLockMenuLabelShare() {
    return "Share";
  }
  static get openLockMenuLabelAbout() {
    return "About";
  }

  static get menuComponentUsersLabel() {
    return "Users";
  }
  static get menuComponentIndexLabel() {
    return "Index";
  }
  static get menuComponentLogsLabel() {
    return "Logs";
  }
  static get menuComponentSettingLabel() {
    return "Setting";
  }
  static getDefaultMenuComponent() {
    return App.menuComponentIndexLabel;
  }

  static get screenModeIndexLabel() {
    return "MENU";
  }
  static get screenModeThreadLabel() {
    return "THREAD";
  }
  static get screenModeDetailLabel() {
    return "DETAIL";
  }
  static get screenModeSmallWidthPx() {
    return conf.screenMode.small;
  }
  static get screenModeMiddleWidthPx() {
    return conf.screenMode.middle;
  }

  static get defaultOffsetFindId() {
    return Post.defaultFindId;
  }
  static get dispThreadTypeTimeline() {
    return "Timeline";
  }
  static get dispThreadTypeSingle() {
    return "Single";
  }
  static get dispThreadTypeMulti() {
    return "Multi";
  }
  static get dispThreadTypeChild() {
    return "Child";
  }
  static get dispThreadTypeLogs() {
    return "Logs";
  }
  static get screenModeSmallLabel() {
    return "SMALL";
  }
  static get screenModeMiddleLabel() {
    return "MIDDLE";
  }
  static get screenModeLargeLabel() {
    return "LARGE";
  }
  static get extensionModeExtNoneLabel() {
    return "NONE";
  }
  static get extensionModeExtModalLabel() {
    return "EXT_MODAL";
  }
  static get extensionModeExtBottomLabel() {
    return "EXT_BOTTOM";
  }
  static get extensionModeExtIncludeLabel() {
    return "EXT_INCLUDE";
  }
  static get mediaTagTypeNo() {
    return "html";
  }
  static get mediaTagTypeAudio() {
    return "audio";
  }
  static get mediaTagTypeVideo() {
    return "video";
  }
  static get mediaTypeMp3() {
    return "mp3";
  }
  static get mediaTypeMp4() {
    return "mp4";
  }
  static get mediaTypeM4a() {
    return "m4a";
  }
  static get mediaChs() {
    return [App.mediaTypeMp3, App.mediaTypeMp4, App.mediaTypeM4a];
  }
  static get mediaChTagTypes() {
    return {
      [App.mediaTypeMp3]: App.mediaTagTypeAudio,
      [App.mediaTypeMp4]: App.mediaTagTypeVideo,
      [App.mediaTypeM4a]: App.mediaTagTypeAudio
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
    let mediaType = "html";
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
    if (/\r\n$|\n$|\r$/gim.test(value)) return "LAST TYPE BREAK LINE.";
    return false;
  }

  static validPost(value) {
    if (value === "") return "NO INPUT POST";
    if (/^\r\n+$|\n+$|\r+$/g.test(value)) return "ONLY NEW LINE";
    if (/^\s+$/g.test(value)) return "only space";
    if (/^\r\n+(\s|\S)+$|^\n+(\s|\S)+$|^\r+(\s|\S)+$/.test(value)) return "EMPTY POST";
    return false;
  }

  static getWidth(params) {
    if (typeof window === "object" && window.innerWidth) return window.innerWidth;
    if (params.width) {
      if (typeof params.width === "string") {
        if (params.width.indexOf("px") >= 0) {
          return Number(params.width.replace("px", ""));
        }
      }
      return params.width;
    }
    return 0;
  }

  static getHeight(params = {}) {
    if (typeof window === "object" && window.innerHeight) return window.innerHeight;
    return 0;
  }

  constructor(params: any = {}, call = "") {
    super();

    // 準備
    const ch = params.ch ? params.ch : "/";

    // 全体
    const name = params.name ? params.name : "talkn";
    const talknIndex = params.talknIndex ? params.talknIndex : 0;

    // 基本表示関連
    const width = App.getWidth(params);
    const height = App.getHeight(params);
    const postsHeight = params.postsHeight ? params.postsHeight : 0;
    const screenMode = App.getScreenMode(width);

    // 拡張表示の場合
    const extensionMode = params.extensionMode ? params.extensionMode : "NONE";
    const extensionWidth = params.extensionWidth ? params.extensionWidth : "0%";
    const extensionOpenHeight = params.extensionOpenHeight ? params.extensionOpenHeight : 0;
    const extensionCloseHeight = params.extensionCloseHeight ? params.extensionCloseHeight : 0;

    // Index情報
    const menuComponent = params.menuComponent ? params.menuComponent : App.getDefaultMenuComponent();

    // スレッド基本関連
    const isMediaCh = Schema.isSet(params.isMediaCh) ? params.isMediaCh : App.getIsMediaCh(ch);
    const isRootCh = Schema.isSet(params.isRootCh) ? params.isRootCh : false;
    const isLinkCh = Schema.isSet(params.isLinkCh) ? params.isLinkCh : false;
    const rootCh = params.rootCh ? params.rootCh : ch;
    const rootTitle = params.rootTitle ? params.rootTitle : "talkn";
    const src = App.getMediaSrc(params.protocol, ch);
    const chType = App.getMediaType(src, params);
    const tuned = params && params.tuned ? params.tuned : "";
    const dispThreadType = App.getDispThreadType(params, isMediaCh);
    const multistream = Schema.isSet(params.multistream) ? params.multistream : true;
    const multistreamed = params && params.multistreamed ? params.multistreamed : false;
    const threadScrollY = params && params.threadScrollY ? params.threadScrollY : 0;

    // 投稿情報
    const findType = params && params.findType ? params.findType : Thread.findTypeAll;
    const offsetFindId = params && params.offsetFindId ? params.offsetFindId : App.defaultOffsetFindId;
    const offsetTimelineFindId =
      params && params.offsetTimelineFindId ? params.offsetTimelineFindId : App.defaultOffsetFindId;
    const offsetSingleFindId =
      params && params.offsetSingleFindId ? params.offsetSingleFindId : App.defaultOffsetFindId;
    const offsetMultiFindId = params && params.offsetMultiFindId ? params.offsetMultiFindId : App.defaultOffsetFindId;
    const offsetChildFindId = params && params.offsetChildFindId ? params.offsetChildFindId : App.defaultOffsetFindId;
    const offsetLogsFindId = params && params.offsetLogsFindId ? params.offsetLogsFindId : App.defaultOffsetFindId;

    // detail情報
    const detailCh = params.detailCh ? params.detailCh : ch;

    // 入力状態
    const inputPost = params.inputPost ? params.inputPost : "";
    const inputStampId = params.inputStampId ? params.inputStampId : false;
    const inputCurrentTime = params.inputCurrentTime ? params.inputCurrentTime : 0.0;
    const inputSearch = params.inputSearch ? params.inputSearch : "";

    // 各パーツの状態(フラグ制御)
    const isOpenPosts = App.getIsOpenPosts({
      height,
      extensionMode,
      extensionOpenHeight,
      extensionCloseHeight
    });
    const isOpenSetting = params.isOpenSetting ? params.isOpenSetting : false;
    const isOpenMenu = params.isOpenMenu ? params.isOpenMenu : false;
    const isOpenDetail =
      screenMode === App.screenModeDetailLabel ? true : Schema.isSet(params.isOpenDetail) ? params.isOpenDetail : false;
    const isOpenNewPost = params.isOpenNewPost ? params.isOpenNewPost : false;
    const isOpenNotif = params.isOpenNotif ? params.isOpenNotif : false;
    const isOpenPostsSupporter = Schema.isSet(params.isOpenPostsSupporter) ? params.isOpenPostsSupporter : false;
    const isOpenBoard = Schema.isSet(params.isOpenBoard) ? params.isOpenBoard : App.getIsOpenBoard({ screenMode });
    const isBubblePost = Schema.isSet(params.isBubblePost) ? params.isBubblePost : true;
    const isDispPosts = Schema.isSet(params.isDispPosts) ? params.isDispPosts : false;
    const isOpenLinks = Schema.isSet(params.isOpenLinks) ? params.isOpenLinks : false;

    // 各パーツの状態(文字列制御)
    const openInnerNotif = params.openInnerNotif ? params.openInnerNotif : "";
    const openLockMenu = params.openLockMenu ? params.openLockMenu : App.openLockMenuLabelNo;

    const includeIframeTag = App.getIncludeIframeTag(params, extensionMode);

    // その他
    const actioned = params && params.actioned ? params.actioned : "";
    const isTransition = Schema.isSet(params.isTransition) ? params.isTransition : false;
    const isLoadingEnd = Schema.isSet(params.isLoadingEnd) ? params.isLoadingEnd : false;
    const debug = Schema.isSet(params.debug) ? params.debug : "";

    return this.create({
      // 全体
      name,
      talknIndex,

      // 基本表示関連
      width,
      height,
      postsHeight,
      screenMode,

      // iframeの拡張機能表示の場合
      extensionMode,
      extensionWidth,
      extensionOpenHeight,
      extensionCloseHeight,

      // Index情報
      menuComponent,

      // スレッド基本関連

      isRootCh,
      isLinkCh,
      isMediaCh,
      rootCh,
      rootTitle,
      chType,
      dispThreadType,
      tuned,
      multistream,
      multistreamed,
      threadScrollY,

      // 投稿情報
      findType,
      offsetFindId,
      offsetTimelineFindId,
      offsetSingleFindId,
      offsetMultiFindId,
      offsetChildFindId,
      offsetLogsFindId,

      // detail情報
      detailCh,

      // 入力状態
      inputPost,
      inputStampId,
      inputCurrentTime,
      inputSearch,

      // 各パーツの状態
      isOpenPosts,
      isOpenSetting,
      isOpenMenu,
      isOpenDetail,
      isOpenNewPost,
      isOpenNotif,
      isOpenPostsSupporter,
      isBubblePost,
      isOpenBoard,
      isDispPosts,
      isOpenLinks,

      // 各パーツの状態(文字列制御)
      openInnerNotif,
      openLockMenu,

      // iframe直接埋め込み
      includeIframeTag,

      // その他
      actioned,
      isTransition,
      isLoadingEnd,
      debug
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
    return protocol + "/" + ch.replace(/\/$/, "");
  }

  static getScreenMode(widthPx: any = 0) {
    if (!widthPx) {
      if ((window && window.innerWidth === 0) || window.innerHeight === 0) {
        return "NONE";
      }

      if (window && window.innerWidth > 0) {
        widthPx = window.innerWidth;
      }
    }

    if (typeof widthPx === "string") {
      widthPx = widthPx.replace("px", "");
    }

    if (App.screenModeSmallWidthPx >= widthPx) {
      return App.screenModeSmallLabel;
    }

    if (App.screenModeSmallWidthPx < widthPx && App.screenModeMiddleWidthPx >= widthPx) {
      return App.screenModeMiddleLabel;
    }
    return App.screenModeLargeLabel;
  }

  static getIncludeIframeTag(params, extensionMode) {
    // Open Portal(Judge server side)
    // Open Portal from iframe(Judge server side)
    // Open Extension( Judge ext.js )
    return extensionMode === App.extensionModeExtNoneLabel ? false : true;
  }

  static getIsMediaCh(ch) {
    return App.mediaChs.some(ext => {
      const regexp = new RegExp(`.${ext}\/$|.${ext}$`);
      return ch.match(regexp);
    });
  }

  static getIsOpenPosts(app: any, called: string = "") {
    let { extensionMode, height, extensionOpenHeight, extensionCloseHeight } = app;
    const log = false;
    const al = false;
    if (extensionMode === App.extensionModeExtBottomLabel || extensionMode === App.extensionModeExtModalLabel) {
      if (typeof height !== "number") height = Number(height);
      if (typeof extensionOpenHeight !== "number") extensionOpenHeight = Number(extensionOpenHeight);

      if (height === 0) {
        if (log) console.log("@getIsOpenPosts A " + " " + extensionOpenHeight + " " + height);
        if (al) alert("@getIsOpenPosts A " + " " + extensionOpenHeight + " " + height);
        return false;
      }

      if (extensionCloseHeight === height) {
        if (log) console.log("@getIsOpenPosts B " + " " + extensionOpenHeight + " " + height);
        if (al) alert("@getIsOpenPosts B " + " " + extensionOpenHeight + " " + height);
        return false;
      }

      // MEMO: スマホで入力モードになった時にheightがextensionOpenHeightを上回る時があるため
      if (extensionOpenHeight <= height) {
        if (log) console.log("@getIsOpenPosts C " + " " + extensionOpenHeight + " " + height);
        if (al) alert("@getIsOpenPosts C " + " " + extensionOpenHeight + " " + height);
        return true;
      }

      if (log) console.log("@getIsOpenPosts D " + " " + extensionOpenHeight + " " + height);
      if (al) alert("@getIsOpenPosts D " + " " + extensionOpenHeight + " " + height);
      return false;
    } else {
      if (log) console.log("@getIsOpenPosts E " + " " + extensionOpenHeight + " " + height);
      if (al) alert("@getIsOpenPosts E " + " " + extensionOpenHeight + " " + height);
      return true;
    }
  }

  static getIsOpenBoard(app) {
    switch (app.screenMode) {
      case App.screenModeSmallLabel:
        return false;
      case App.screenModeMiddleLabel:
      case App.screenModeLargeLabel:
        return true;
    }
  }

  static isActiveMultistream(app, called = "") {
    return app.menuComponent === "Index" && !app.isMediaCh && app.dispThreadType === App.dispThreadTypeMulti;
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

  static getStepToDispThreadType({ app, menuIndex }: any, threadStatus: any, toCh: any, called: any = "") {
    let afterDispThreadType = "";
    const beforeDispThreadType = app.dispThreadType;
    app = App.getStepDispThreadType({ app, menuIndex }, threadStatus, toCh, called);
    afterDispThreadType = app.dispThreadType;
    return { app, stepTo: `${beforeDispThreadType} to ${afterDispThreadType}` };
  }

  static getStepDispThreadType({ app, menuIndex }, threadStatus: any = {}, toCh, called) {
    const log = false;
    app.isLinkCh = false;
    app.isOpenLinks = false;

    if (log) console.log(called + " rootCh = " + app.rootCh + " toCh = " + toCh);

    if (called === "backToRootCh") {
      if (app.screenMode === App.screenModeSmallLabel) {
        if (log) console.log("A");
        // onClickToggleDispMenuで強制的にメニューが開いてしまうため、開けた状態にしておく。
        app.isOpenMenu = true;
        app.isOpenBoard = true;
      }
    }

    if (log) console.log(menuIndex);

    if (threadStatus.isMediaCh) {
      if (log) console.log("B");
      app.dispThreadType = App.dispThreadTypeTimeline;
      app.offsetFindId = app.offsetTimelineFindId ? app.offsetTimelineFindId : App.defaultOffsetFindId;
      app.isLinkCh = called === "toLinks" || called === "findMediaCh" ? true : false;
      app.isMediaCh = true;
      return app;
    }

    if (called === "toLinks") {
      const haveMenuIndex = menuIndex.some(mi => {
        return mi.ch === toCh || mi.ch === toCh + "/";
      });

      if (log) {
        console.log("C " + haveMenuIndex + "");
      }

      if (!haveMenuIndex) {
        if (log) {
          console.log("D");
        }

        app.offsetFindId = App.defaultOffsetFindId;
        app.dispThreadType = App.dispThreadTypeChild;
        app.isOpenLinks = false;
        app.isLinkCh = true;
        // app.isOpenMenu = true;
        return app;
      }
    }

    if (app.rootCh === toCh) {
      if (app.multistream) {
        if (log) console.log("E");
        app.dispThreadType = App.dispThreadTypeMulti;
        app.offsetFindId = app.offsetMultiFindId ? app.offsetMultiFindId : App.defaultOffsetFindId;
      } else {
        if (log) console.log("F");
        app.dispThreadType = App.dispThreadTypeSingle;
        app.offsetFindId = app.offsetSingleFindId ? app.offsetSingleFindId : App.defaultOffsetFindId;
      }
    } else {
      if (log) console.log("G");
      app.dispThreadType = App.dispThreadTypeChild;
      app.offsetFindId = app.offsetChildFindId ? app.offsetChildFindId : App.defaultOffsetFindId;
    }
    if (log) console.log(app);
    return app;
  }

  static getAppUpdatedOpenFlgs({ app }, call = "") {
    switch (call) {
      case "toggleMain":
      case "headerDetailIcon":
        switch (app.screenMode) {
          case App.screenModeSmallLabel:
            app.isOpenDetail = !app.isOpenDetail;
            break;
          case App.screenModeMiddleLabel:
            if (app.isOpenDetail) {
              if (app.detailCh === app.rootCh) {
                app.isOpenDetail = false;
                app.isOpenMenu = true;
              } else {
                app.isOpenMenu = false;
                app.isOpenDetail = false;
              }
            } else {
              app.isOpenMenu = false;
              app.isOpenDetail = true;
            }
            break;
        }
        break;
      case "headerMenuIcon":
        switch (app.screenMode) {
          case App.screenModeMiddleLabel:
            if (app.isOpenDetail) {
              app.isOpenMenu = true;
              app.isOpenDetail = false;
            } else {
              app.isOpenMenu = true;
              app.isOpenDetail = false;
            }
            break;
        }
        break;
      case "changeThreadDetail":
      case "post":
        switch (app.screenMode) {
          case App.screenModeSmallLabel:
            app.isOpenDetail = !app.isOpenDetail;
            break;
          case App.screenModeMiddleLabel:
            app.isOpenMenu = false;
            app.isOpenDetail = true;
          case App.screenModeLargeLabel:
            app.isOpenMenu = true;
            app.isOpenDetail = true;
            break;
        }
        break;
    }
    return app;
  }
}
