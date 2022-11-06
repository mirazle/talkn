import Schema from 'common/Schema';

import App from 'api/store/App';

import conf from 'client/conf';

export type ClickedType = 'Ch' | 'BackToRootCh' | 'ToMedia' | 'Links' | 'findMediaCh' | '';

export type ExtensionModeType =
  | typeof Ui.extensionModeModal
  | typeof Ui.extensionModeBottom
  | typeof Ui.extensionModeOutWindow
  | typeof Ui.extensionModeLiveMedia;

export default class Ui extends Schema {
  static get openLockMenuLabelNo() {
    return 'No';
  }
  static get openLockMenuLabelLike() {
    return 'Like';
  }
  static get openLockMenuLabelShare() {
    return 'Share';
  }
  static get openLockMenuLabelAbout() {
    return 'About';
  }
  static get screenSizeSmallLabel() {
    return 'SMALL';
  }
  static get screenSizeMiddleLabel() {
    return 'MIDDLE';
  }
  static get screenSizeLargeLabel() {
    return 'LARGE';
  }
  static get screenSizeIndexLabel() {
    return 'MENU';
  }
  static get screenSizeThreadLabel() {
    return 'THREAD';
  }
  static get screenSizeDetailLabel() {
    return 'DETAIL';
  }
  static get screenSizeSmallWidthPx() {
    return conf.screenSize.small;
  }
  static get screenSizeMiddleWidthPx() {
    return conf.screenSize.middle;
  }
  static get extensionModeModal() {
    return 'Modal';
  }
  static get extensionModeBottom() {
    return 'Bottom';
  }
  static get extensionModeEmbed() {
    return 'Embed';
  }
  static get extensionModeLiveMedia() {
    return 'LiveMedia';
  }
  static get extensionModeOutWindow() {
    return 'OutWindow';
  }
  static get extensionModeNone() {
    return 'None';
  }
  static get menuComponentUsersLabel() {
    return 'Users';
  }
  static get menuComponentRankLabel() {
    return 'Rank';
  }
  static get menuComponentLogsLabel() {
    return 'Logs';
  }
  static get menuComponentSettingLabel() {
    return 'Setting';
  }
  static getDefaultMenuComponent() {
    return Ui.menuComponentRankLabel;
  }

  static getWidth(params) {
    if (params && params.extensionWidth > 0) {
      return params.extensionWidth;
    }
    if (params && params.width > 0) {
      return params.width;
    }
    if (typeof window === 'object' && window.innerWidth) {
      return window.innerWidth;
    }
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

  static getHeight(params: any = {}) {
    if (params && params.extensionHeigt > 0) {
      return params.extensionHeigt;
    }
    if (params && params.height > 0) {
      return params.height;
    }
    if (typeof window === 'object' && window.innerHeight) {
      return window.innerHeight;
    }
    return 0;
  }

  static getScreenSize(widthPx: any = 0) {
    if (!widthPx) {
      if ((window && window.innerWidth === 0) || window.innerHeight === 0) {
        return undefined;
      }

      if (window && window.innerWidth > 0) {
        widthPx = window.innerWidth;
      }
    }

    if (typeof widthPx === 'string') {
      widthPx = widthPx.replace('px', '');
    }

    if (Ui.screenSizeSmallWidthPx >= widthPx) {
      return Ui.screenSizeSmallLabel;
    }

    if (Ui.screenSizeSmallWidthPx <= widthPx && Ui.screenSizeMiddleWidthPx >= widthPx) {
      return Ui.screenSizeMiddleLabel;
    }
    return Ui.screenSizeLargeLabel;
  }

  static getIsOpenMenu(ui) {
    switch (ui.screenSize) {
      case Ui.screenSizeSmallLabel:
        return false;
      case Ui.screenSizeMiddleLabel:
      case Ui.screenSizeLargeLabel:
        return true;
    }
  }

  static getIsOpenBoard(ui) {
    switch (ui.screenSize) {
      case Ui.screenSizeSmallLabel:
        return false;
      case Ui.screenSizeMiddleLabel:
      case Ui.screenSizeLargeLabel:
        return true;
    }
  }

  static getIsOpenPosts(ui: any, called: string = '') {
    let { extensionMode, height, extensionHeight, extensionCloseHeight } = ui;
    const log = false;
    const al = false;
    if (extensionMode === Ui.extensionModeBottom || extensionMode === Ui.extensionModeModal) {
      if (typeof height !== 'number') height = Number(height);
      if (typeof extensionHeight !== 'number') extensionHeight = Number(extensionHeight);

      if (height === 0) {
        if (log) console.log('@getIsOpenPosts A ' + ' ' + extensionHeight + ' ' + height);
        if (al) alert('@getIsOpenPosts A ' + ' ' + extensionHeight + ' ' + height);
        return false;
      }

      // MEMO: スマホで入力モードになった時にheightがextensionHeightを上回る時があるため
      if (extensionHeight <= height) {
        if (log) console.log('@getIsOpenPosts C ' + ' ' + extensionHeight + ' ' + height);
        if (al) alert('@getIsOpenPosts C ' + ' ' + extensionHeight + ' ' + height);
        return true;
      }

      if (log) console.log('@getIsOpenPosts D ' + ' ' + extensionHeight + ' ' + height);
      if (al) alert('@getIsOpenPosts D ' + ' ' + extensionHeight + ' ' + height);
      return false;
    } else {
      if (log) console.log('@getIsOpenPosts E ' + ' ' + extensionHeight + ' ' + height);
      if (al) alert('@getIsOpenPosts E ' + ' ' + extensionHeight + ' ' + height);
      return true;
    }
  }

  static getUiUpdatedOpenFlgs({ app, ui }, call = '') {
    switch (call) {
      case 'toggleMain':
      case 'headerDetailIcon':
        switch (ui.screenSize) {
          case Ui.screenSizeSmallLabel:
            ui.isOpenDetail = !ui.isOpenDetail;
            break;
          case Ui.screenSizeMiddleLabel:
            if (ui.isOpenDetail) {
              if (app.detailCh === app.rootCh) {
                ui.isOpenDetail = false;
                ui.isOpenMenu = true;
              } else {
                ui.isOpenMenu = false;
                ui.isOpenDetail = false;
              }
            } else {
              ui.isOpenMenu = false;
              ui.isOpenDetail = true;
            }
            break;
        }
        break;
      case 'headerMenuIcon':
        switch (ui.screenSize) {
          case Ui.screenSizeMiddleLabel:
            if (ui.isOpenDetail) {
              ui.isOpenMenu = true;
              ui.isOpenDetail = false;
            } else {
              ui.isOpenMenu = true;
              ui.isOpenDetail = false;
            }
            break;
        }
        break;
      case 'changeThreadDetail':
      case 'post':
        switch (ui.screenSize) {
          case Ui.screenSizeSmallLabel:
            ui.isOpenDetail = !ui.isOpenDetail;
            break;
          case Ui.screenSizeMiddleLabel:
            ui.isOpenMenu = false;
            ui.isOpenDetail = true;
          case Ui.screenSizeLargeLabel:
            ui.isOpenMenu = true;
            ui.isOpenDetail = true;
            break;
        }
        break;
    }
    return ui;
  }

  static isActiveMultistream({ app, ui }, called = '') {
    return ui.menuComponent === Ui.menuComponentRankLabel && app.dispThreadType === App.dispThreadTypeMulti;
  }

  // 基本表示関連
  iFrameId: string;
  width: string | number;
  height: string | number;
  postsHeight: string | number;
  screenSize: 'LARGE' | 'MIDDLE' | 'SMALL' | undefined;

  // iframeの拡張機能表示の場合
  extensionMode: 'Modal' | 'Bottom' | 'Embed' | 'None';
  extensionWidth: string | number;
  extensionHeight: string | number;

  isOpenPosts: boolean;
  isOpenSetting: boolean;
  isOpenMenu: boolean;
  isOpenDetail: boolean;
  isOpenNewPost: boolean;
  isOpenNotif: boolean;
  isOpenPostsSupporter: boolean;
  isOpenBoard: boolean;
  isOpenSetChModal: boolean;
  isBubblePost: boolean;
  isDispPosts: boolean;
  isOpenLinks: boolean;
  isTransition: boolean;

  // クリック情報
  clicked: ClickedType;

  // detail情報
  detailCh: string;

  // Index情報
  menuComponent: 'Users' | 'Index' | 'Logs' | 'Setting';

  // 各パーツの状態(文字列制御)
  threadScrollY: string | number;
  openInnerNotif: boolean;
  openLockMenu: 'Abount' | 'Like' | 'Share' | 'No';
  inputPost: string;
  inputStampId: string | number;
  inputCurrentTime: number;
  inputSearch: string;

  isLoading: boolean;

  // iframe直接埋め込み
  includeIframeTag: boolean;
  constructor(params: any = {}) {
    super();
    const iFrameId = params.iFrameId ? params.iFrameId : '';
    const width = Ui.getWidth(params);
    const height = Ui.getHeight(params);
    const postsHeight = params.postsHeight ? params.postsHeight : 0;
    const screenSize = Ui.getScreenSize(width);
    const extensionMode = params.extensionMode ? params.extensionMode : Ui.extensionModeNone;
    const extensionWidth = params.extensionWidth ? params.extensionWidth : '0%';
    const extensionHeight = params.extensionHeight ? params.extensionHeight : 0;

    // 各パーツの状態(フラグ制御)
    const threadScrollY = params && params.threadScrollY ? params.threadScrollY : 0;
    const isOpenPosts = Ui.getIsOpenPosts({
      height,
      extensionMode,
      extensionHeight,
    });
    const isOpenSetting = params.isOpenSetting ? params.isOpenSetting : false;
    const isOpenMenu = Schema.isSet(params.isOpenMenu) ? params.isOpenMenu : Ui.getIsOpenMenu({ screenSize });
    const isOpenDetail = screenSize === Ui.screenSizeDetailLabel ? true : Schema.isSet(params.isOpenDetail) ? params.isOpenDetail : false;
    const isOpenNewPost = params.isOpenNewPost ? params.isOpenNewPost : false;
    const isOpenNotif = params.isOpenNotif ? params.isOpenNotif : false;
    const isOpenPostsSupporter = Schema.isSet(params.isOpenPostsSupporter) ? params.isOpenPostsSupporter : false;
    const isOpenBoard = Schema.isSet(params.isOpenBoard) ? params.isOpenBoard : Ui.getIsOpenBoard({ screenSize });
    const isOpenSetChModal = Schema.isSet(params.isOpenSetChModal) ? params.isOpenSetChModal : false;
    const isBubblePost = Schema.isSet(params.isBubblePost) ? params.isBubblePost : true;
    const isDispPosts = Schema.isSet(params.isDispPosts) ? params.isDispPosts : false;
    const isOpenLinks = Schema.isSet(params.isOpenLinks) ? params.isOpenLinks : false;
    const isTransition = Schema.isSet(params.isTransition) ? params.isTransition : true;
    const menuComponent = params.menuComponent ? params.menuComponent : Ui.getDefaultMenuComponent();
    const openLockMenu = params.openLockMenu ? params.openLockMenu : Ui.openLockMenuLabelNo;
    const openInnerNotif = params.openInnerNotif ? params.openInnerNotif : '';

    // クリック情報
    const clicked = params.clicked ? params.clicked : '';

    // detail情報
    const detailCh = params.detailCh ? params.detailCh : '/';

    // 入力状態
    const inputPost = params.inputPost ? params.inputPost : '';
    const inputStampId = params.inputStampId ? params.inputStampId : false;
    const inputCurrentTime = params.inputCurrentTime ? params.inputCurrentTime : 0.0;
    const inputSearch = params.inputSearch ? params.inputSearch : '';
    const isLoading = Schema.isSet(params.isLoading) ? params.isLoading : true;
    return this.create({
      iFrameId,
      width,
      height,
      postsHeight,
      screenSize,
      extensionMode,
      extensionWidth,
      extensionHeight,
      threadScrollY,
      isOpenPosts,
      isOpenSetting,
      isOpenMenu,
      isOpenDetail,
      isOpenNewPost,
      isOpenNotif,
      isOpenPostsSupporter,
      isOpenBoard,
      isOpenSetChModal,
      isBubblePost,
      isDispPosts,
      isOpenLinks,
      isTransition,
      menuComponent,
      openLockMenu,
      openInnerNotif,
      clicked,
      detailCh,
      inputPost,
      inputStampId,
      inputCurrentTime,
      inputSearch,
      isLoading,
    });
  }
}
