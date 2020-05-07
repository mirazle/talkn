import Schema from "api/store/Schema";
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
  static get extensionModeExtModalLabel() {
    return "EXT_MODAL";
  }
  static get extensionModeExtBottomLabel() {
    return "EXT_BOTTOM";
  }
  static get extensionModeExtIncludeLabel() {
    return "EXT_INCLUDE";
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
    return Ui.menuComponentIndexLabel;
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

    if (Ui.screenModeSmallWidthPx >= widthPx) {
      return Ui.screenModeSmallLabel;
    }

    if (Ui.screenModeSmallWidthPx < widthPx && Ui.screenModeMiddleWidthPx >= widthPx) {
      return Ui.screenModeMiddleLabel;
    }
    return Ui.screenModeLargeLabel;
  }

  static getIsOpenBoard(ui) {
    switch (ui.screenMode) {
      case Ui.screenModeSmallLabel:
        return false;
      case Ui.screenModeMiddleLabel:
      case Ui.screenModeLargeLabel:
        return true;
    }
  }

  static getIsOpenPosts(ui: any, called: string = "") {
    let { extensionMode, height, extensionOpenHeight, extensionCloseHeight } = ui;
    const log = false;
    const al = false;
    if (extensionMode === Ui.extensionModeExtBottomLabel || extensionMode === Ui.extensionModeExtModalLabel) {
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

  static getUiUpdatedOpenFlgs({ app, ui }, call = "") {
    switch (call) {
      case "toggleMain":
      case "headerDetailIcon":
        switch (ui.screenMode) {
          case Ui.screenModeSmallLabel:
            ui.isOpenDetail = !ui.isOpenDetail;
            break;
          case Ui.screenModeMiddleLabel:
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
      case "headerMenuIcon":
        switch (ui.screenMode) {
          case Ui.screenModeMiddleLabel:
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
      case "changeThreadDetail":
      case "post":
        switch (ui.screenMode) {
          case Ui.screenModeSmallLabel:
            ui.isOpenDetail = !ui.isOpenDetail;
            break;
          case Ui.screenModeMiddleLabel:
            ui.isOpenMenu = false;
            ui.isOpenDetail = true;
          case Ui.screenModeLargeLabel:
            ui.isOpenMenu = true;
            ui.isOpenDetail = true;
            break;
        }
        break;
    }
    return ui;
  }

  // 基本表示関連
  width: string | number;
  height: string | number;
  postsHeight: string | number;
  screenMode: "LARGE" | "MIDDLE" | "SMALL" | "NONE";

  // iframeの拡張機能表示の場合
  extensionMode: "EXT_MODAL" | "EXT_BOTTOM" | "EXT_INCLUDE" | "NONE";
  extensionWidth: string | number;
  extensionOpenHeight: string | number;
  extensionCloseHeight: string | number;

  isOpenPosts: boolean;
  isOpenSetting: boolean;
  isOpenMenu: boolean;
  isOpenDetail: boolean;
  isOpenNewPost: boolean;
  isOpenNotif: boolean;
  isOpenPostsSupporter: boolean;
  isOpenBoard: boolean;
  isBubblePost: boolean;
  isDispPosts: boolean;
  isOpenLinks: boolean;
  isTransition: boolean;

  // detail情報
  detailCh: string;

  // Index情報
  menuComponent: "Users" | "Index" | "Logs" | "Setting";

  // 各パーツの状態(文字列制御)
  threadScrollY: string | number;
  openInnerNotif: boolean;
  openLockMenu: "Abount" | "Like" | "Share" | "No";
  inputPost: string;
  inputStampId: string | number;
  inputCurrentTime: number;
  inputSearch: string;

  isLoading: boolean;

  // iframe直接埋め込み
  includeIframeTag: boolean;
  constructor(params: any = {}) {
    super();
    const width = Ui.getWidth(params);
    const height = Ui.getHeight(params);
    const postsHeight = params.postsHeight ? params.postsHeight : 0;
    const screenMode = Ui.getScreenMode(width);
    const extensionMode = params.extensionMode ? params.extensionMode : "NONE";
    const extensionWidth = params.extensionWidth ? params.extensionWidth : "0%";
    const extensionOpenHeight = params.extensionOpenHeight ? params.extensionOpenHeight : 0;
    const extensionCloseHeight = params.extensionCloseHeight ? params.extensionCloseHeight : 0;

    // 各パーツの状態(フラグ制御)
    const threadScrollY = params && params.threadScrollY ? params.threadScrollY : 0;
    const isOpenPosts = Ui.getIsOpenPosts({
      height,
      extensionMode,
      extensionOpenHeight,
      extensionCloseHeight,
    });
    const isOpenSetting = params.isOpenSetting ? params.isOpenSetting : false;
    const isOpenMenu = params.isOpenMenu ? params.isOpenMenu : false;
    const isOpenDetail =
      screenMode === Ui.screenModeDetailLabel ? true : Schema.isSet(params.isOpenDetail) ? params.isOpenDetail : false;
    const isOpenNewPost = params.isOpenNewPost ? params.isOpenNewPost : false;
    const isOpenNotif = params.isOpenNotif ? params.isOpenNotif : false;
    const isOpenPostsSupporter = Schema.isSet(params.isOpenPostsSupporter) ? params.isOpenPostsSupporter : false;
    const isOpenBoard = Schema.isSet(params.isOpenBoard) ? params.isOpenBoard : Ui.getIsOpenBoard({ screenMode });
    const isBubblePost = Schema.isSet(params.isBubblePost) ? params.isBubblePost : true;
    const isDispPosts = Schema.isSet(params.isDispPosts) ? params.isDispPosts : false;
    const isOpenLinks = Schema.isSet(params.isOpenLinks) ? params.isOpenLinks : false;
    const isTransition = Schema.isSet(params.isTransition) ? params.isTransition : true;
    const menuComponent = params.menuComponent ? params.menuComponent : Ui.getDefaultMenuComponent();
    const openLockMenu = params.openLockMenu ? params.openLockMenu : Ui.openLockMenuLabelNo;
    const openInnerNotif = params.openInnerNotif ? params.openInnerNotif : "";

    // detail情報
    const detailCh = params.detailCh ? params.detailCh : "/";

    // 入力状態
    const inputPost = params.inputPost ? params.inputPost : "";
    const inputStampId = params.inputStampId ? params.inputStampId : false;
    const inputCurrentTime = params.inputCurrentTime ? params.inputCurrentTime : 0.0;
    const inputSearch = params.inputSearch ? params.inputSearch : "";

    const isLoading = Schema.isSet(params.isLoading) ? params.isLoading : false;
    return this.create({
      width,
      height,
      postsHeight,
      screenMode,
      extensionMode,
      extensionWidth,
      extensionOpenHeight,
      extensionCloseHeight,
      threadScrollY,
      isOpenPosts,
      isOpenSetting,
      isOpenMenu,
      isOpenDetail,
      isOpenNewPost,
      isOpenNotif,
      isOpenPostsSupporter,
      isOpenBoard,
      isBubblePost,
      isDispPosts,
      isOpenLinks,
      isTransition,
      menuComponent,
      openLockMenu,
      openInnerNotif,
      detailCh,
      inputPost,
      inputStampId,
      inputCurrentTime,
      inputSearch,
      isLoading,
    });
  }
}
