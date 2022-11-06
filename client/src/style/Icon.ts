import Ui from 'common/clientState/store/Ui';

import conf from 'client/conf';

import Container from './Container';
import Style from './index';

import androidSrc from 'assets/png/android.png';
import androidGraySrc from 'assets/png/android_gray.png';
import appStoreSrc from 'assets/png/appstore.png';
import appStoreGraySrc from 'assets/png/appstore_gray.png';
import chromeExtensionSrc from 'assets/png/chrome_extension.png';
import facebookSrc from 'assets/png/facebook.png';
import facebookGraySrc from 'assets/png/facebook_gray.png';
import graphSrc from 'assets/png/graph.png';
import graphGraySrc from 'assets/png/graph_gray.png';
import homeSrc from 'assets/png/home.png';
import homeGraySrc from 'assets/png/home_gray.png';
import talknSrc from 'assets/png/talkn.png';
import twitterSrc from 'assets/png/twitter.png';
import twitterGraySrc from 'assets/png/twitter_gray.png';

export default class Icon {
  static get defaultOption() {
    return { sizePx: Icon.largeSize, active: true };
  }
  static get smallSize() {
    return '24px';
  }
  static get middleSize() {
    return '36px';
  }
  static get largeSize() {
    return '48px';
  }
  static get bigSize() {
    return '64px';
  }

  static get smallMargin() {
    return 2;
  }

  static get largeMargin() {
    return 4;
  }

  static getMargin({ app, ui }) {
    return ui.screenSize === Ui.screenSizeSmallLabel ? Icon.smallMargin : Icon.largeMargin;
  }

  svgIcon: Object;
  headTab: Object;
  menu: Object;
  talknLogo: Object;
  user: Object;
  headerUser: Object;
  search: Object;
  tag: Object;
  home: Object;
  graph: Object;
  index: Object;
  logs: Object;
  setting: Object;
  thunder: Object;
  bubble: Object;
  detail: Object;
  heart: Object;
  share: Object;
  money: Object;
  openEmoji: Object;
  close: Object;
  ch: Object;
  update: Object;
  loading: Object;
  tune: Object;
  liveCnt: Object;
  stampStr: String;
  stampLabel: Object;
  constructor(params: any) {
    const bootOption = { ...params.bootOption, ...params.app };
    const svgIcon = Icon.getSvgIcon(params);
    const headTab = Icon.getHeadTab(params);
    const menu = Icon.getMenu(params);
    const talknLogo = Icon.getTalknLogo(params);
    const user = Icon.getUser(params);
    const headerUser = Icon.getHeaderUser(params);
    const tag = Icon.getTag(params);
    const home = Icon.getHome(params);
    const graph = Icon.getGraph(params);
    const search = Icon.getSearch(params);
    const index = Icon.getIndex(params);
    const logs = Icon.getLogs(params);
    const setting = Icon.getSetting(params);
    const thunder = Icon.getThunder(params);
    const bubble = Icon.getBubble(params);
    const detail = Icon.getDetail(params);
    const heart = Icon.getHeart(params);
    const share = Icon.getShare(params);
    const money = Icon.getMoney(params);
    const openEmoji = Icon.getOpenEmoji(params);
    const close = Icon.getClose(params);
    const ch = Icon.getCh(params);
    const update = Icon.getUpdate(params);
    const loading = Icon.getLoading(params);
    const tune = Icon.getTune(params);
    const liveCnt = Icon.getLiveCnt(params);
    const stampStr = Icon.getStampStr(params);
    const stampLabel = Icon.getStampLabel(params);
    return {
      svgIcon,
      headTab,
      menu,
      talknLogo,
      user,
      headerUser,
      search,
      tag,
      home,
      graph,
      index,
      logs,
      setting,
      thunder,
      bubble,
      detail,
      heart,
      share,
      money,
      openEmoji,
      close,
      ch,
      update,
      loading,
      tune,
      liveCnt,
      stampStr,
      stampLabel,
    };
  }

  static getSvgIcon({ app, ui }, option = { active: false, key: '' }) {
    const sizePx = Icon.smallSize;
    const cursor = 'pointer';
    const margin = ui.screenSize === Ui.screenSizeSmallLabel ? '0' : '4px 0 6px';
    return Style.get({
      layout: Style.getLayoutInlineFlex({
        width: sizePx,
        maxWidth: sizePx,
        minWidth: sizePx,
        height: sizePx,
        maxHeight: sizePx,
        minHeight: sizePx,
        margin,
      }),
      content: Style.getContentBase({
        cursor,
      }),
      animation: Style.getAnimationBase({
        transform: `scale( 1 ) translate3d( 0px, 0px, 0px )`,
      }),
    });
  }

  static getEmpty({ app, ui }: any, option: any = {}) {
    option = { ...Icon.defaultOption, ...option };
    const sizePx = option.sizePx ? option.sizePx : Icon.middleSize;
    const cursor = option.active ? 'pointer' : 'default';
    return Style.get({
      layout: Style.getLayoutBlock({
        flexGrow: '1',
        width: sizePx,
        height: sizePx,
        minWidth: sizePx,
        minHeight: sizePx,
        backgroundSize: sizePx,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }),
      content: Style.getContentBase({
        cursor,
      }),
      animation: Style.getAnimationBase({
        transform: `scale( 1 ) translate3d( 0px, 0px, 0px )`,
      }),
    });
  }

  static getTwitter({ app, ui }: any, option: any = {}) {
    option = { ...Icon.defaultOption, ...option };
    const sizePx = option.sizePx ? option.sizePx : Icon.middleSize;
    const image = option.active ? twitterSrc : twitterGraySrc;
    const cursor = option.active ? 'pointer' : 'default';
    return Style.get({
      layout: Style.getLayoutBlock({
        flexGrow: '1',
        width: sizePx,
        height: sizePx,
        minWidth: sizePx,
        minHeight: sizePx,
        backgroundSize: sizePx,
        backgroundPosition: 'center',
        backgroundImage: `url(${image})`,
        backgroundRepeat: 'no-repeat',
      }),
      content: Style.getContentBase({
        cursor,
      }),
      animation: Style.getAnimationBase({
        transform: `scale( 1 ) translate3d( 0px, 0px, 0px )`,
      }),
    });
  }

  static getFacebook({ app, ui }: any, option: any = {}) {
    option = { ...Icon.defaultOption, ...option };
    const sizePx = option.sizePx ? option.sizePx : Icon.middleSize;
    const image = option.active ? facebookSrc : facebookGraySrc;
    const cursor = option.active ? 'pointer' : 'default';
    return Style.get({
      layout: Style.getLayoutBlock({
        flexGrow: '1',
        width: sizePx,
        height: sizePx,
        minWidth: sizePx,
        minHeight: sizePx,
        backgroundSize: sizePx,
        backgroundPosition: 'center',
        backgroundImage: `url(${image})`,
        backgroundRepeat: 'no-repeat',
      }),
      content: Style.getContentBase({
        cursor,
      }),
      animation: Style.getAnimationBase({
        transform: `scale( 1 ) translate3d( 0px, 0px, 0px )`,
      }),
    });
  }

  static getAppstore({ app, ui }: any, option: any = {}) {
    option = { ...Icon.defaultOption, ...option };
    const sizePx = option.sizePx ? option.sizePx : Icon.middleSize;
    const image = option.active ? appStoreSrc : appStoreGraySrc;
    const cursor = option.active ? 'pointer' : 'default';
    return Style.get({
      layout: Style.getLayoutBlock({
        flexGrow: '1',
        width: sizePx,
        height: sizePx,
        minWidth: sizePx,
        minHeight: sizePx,
        backgroundSize: sizePx,
        backgroundPosition: 'center',
        backgroundImage: `url(${image})`,
        backgroundRepeat: 'no-repeat',
      }),
      content: Style.getContentBase({
        cursor,
      }),
      animation: Style.getAnimationBase({
        transform: `scale( 1 ) translate3d( 0px, 0px, 0px )`,
      }),
    });
  }

  static getAndroid({ app, ui }: any, option: any = {}) {
    option = { ...Icon.defaultOption, ...option };
    const sizePx = option.sizePx ? option.sizePx : Icon.middleSize;
    const image = option.active ? androidSrc : androidGraySrc;
    const cursor = option.active ? 'pointer' : 'default';
    return Style.get({
      layout: Style.getLayoutBlock({
        flexGrow: '1',
        width: sizePx,
        height: sizePx,
        minWidth: sizePx,
        minHeight: sizePx,
        backgroundSize: sizePx,
        backgroundPosition: 'center',
        backgroundImage: `url(${image})`,
        backgroundRepeat: 'no-repeat',
      }),
      content: Style.getContentBase({
        cursor,
      }),
      animation: Style.getAnimationBase({
        transform: `scale( 1 ) translate3d( 0px, 0px, 0px )`,
      }),
    });
  }

  static getHome({ app, ui }: any, option: any = {}) {
    option = { ...Icon.defaultOption, ...option };
    const sizePx = option.sizePx ? option.sizePx : Icon.middleSize;
    const image = option.active ? homeSrc : homeGraySrc;
    const cursor = option.active ? 'pointer' : 'default';
    return Style.get({
      layout: Style.getLayoutBlock({
        flexGrow: '1',
        width: sizePx,
        height: sizePx,
        minWidth: sizePx,
        minHeight: sizePx,
        backgroundSize: sizePx,
        backgroundPosition: 'center',
        backgroundImage: `url(${image})`,
        backgroundRepeat: 'no-repeat',
      }),
      content: Style.getContentBase({
        cursor,
      }),
      animation: Style.getAnimationBase({
        transform: `scale( 1 ) translate3d( 0px, 0px, 0px )`,
      }),
    });
  }

  static getGraph({ app, ui }: any, option: any = {}) {
    option = { ...Icon.defaultOption, ...option };
    const sizePx = option.sizePx ? option.sizePx : Icon.middleSize;
    const image = option.active ? graphSrc : graphGraySrc;
    const cursor = option.active ? 'pointer' : 'default';
    return Style.get({
      layout: Style.getLayoutBlock({
        flexGrow: '1',
        width: sizePx,
        height: sizePx,
        minWidth: sizePx,
        minHeight: sizePx,
        backgroundSize: sizePx,
        backgroundPosition: 'center',
        backgroundImage: `url(${image})`,
        backgroundRepeat: 'no-repeat',
      }),
      content: Style.getContentBase({
        cursor,
      }),
      animation: Style.getAnimationBase({
        transform: `scale( 1 ) translate3d( 0px, 0px, 0px )`,
      }),
    });
  }

  static getTalkn({ app, ui }: any, option: any = {}) {
    option = { ...Icon.defaultOption, ...option };
    const sizePx = option.sizePx ? option.sizePx : Icon.middleSize;
    const image = option.active ? talknSrc : talknSrc;
    const cursor = option.active ? 'pointer' : 'default';
    return Style.get({
      layout: Style.getLayoutBlock({
        flexGrow: '1',
        width: sizePx,
        height: sizePx,
        minWidth: sizePx,
        minHeight: sizePx,
        backgroundSize: sizePx,
        backgroundPosition: 'center',
        backgroundImage: `url(${image})`,
        backgroundRepeat: 'no-repeat',
      }),
      content: Style.getContentBase({
        cursor,
      }),
      animation: Style.getAnimationBase({
        transform: `scale( 1 ) translate3d( 0px, 0px, 0px )`,
      }),
    });
  }

  static getTalknLogo({ app, ui }: any) {
    const img = Style.get({
      layout: Style.getLayoutBlock({
        backgroundImage: `url(${conf.assetsImgPath}talkn_logo2.png)`,
        backgroundPosition: 'center center',
        backgroundSize: '90%',
        backgroundRepeat: 'no-repeat',
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: `scale( 1 ) translate3d( 0px, 0px, 0px )`,
      }),
    });
    return { img };
  }

  static getChromeExtension({ app, ui }: any, option: any = {}) {
    option = { ...Icon.defaultOption, ...option };
    const sizeWidthPx = '100%';
    const sizeHeightPx = '60px';
    const image = chromeExtensionSrc;
    const cursor = option.active ? 'pointer' : 'default';
    return Style.get({
      layout: Style.getLayoutBlock({
        flexGrow: '1',
        width: sizeWidthPx,
        minWidth: sizeWidthPx,
        height: '180px',
        minHeight: sizeHeightPx,
        backgroundSize: '75%',
        backgroundPosition: 'center',
        backgroundImage: `url(${image})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor: Container.silverRGBA,
      }),
      content: Style.getContentBase({
        cursor,
      }),
      animation: Style.getAnimationBase({
        transform: `scale( 1 ) translate3d( 0px, 0px, 0px )`,
      }),
    });
  }

  static getTag({ app, ui }: any) {
    const div = Style.get({
      layout: Style.getLayoutInlineBlock({
        width: '30px',
        height: '30px',
      }),
      content: Style.getContentBase({
        cursor: 'pointer',
      }),
      animation: Style.getAnimationBase({
        transform: 'scale( 1 )',
      }),
    });

    const left = Style.get({
      layout: Style.getLayoutInlineBlock({
        borderBottom: `2px solid ${Container.reliefRGB}`,
        borderLeft: `2px solid ${Container.reliefRGB}`,
        borderRadius: '0px',
        margin: '0 auto',
        width: '12px',
        height: '12px',
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: 'rotate(45deg) translate3d(5px, 5px, 0px)',
      }),
    });

    const right = Style.get({
      layout: Style.getLayoutInlineBlock({
        borderBottom: `2px solid ${Container.reliefRGB}`,
        borderLeft: `2px solid ${Container.reliefRGB}`,
        borderRadius: '0px',
        margin: '0 auto',
        width: '12px',
        height: '12px',
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: 'rotate(-135deg) translate3d(-6px, -4px, 0px)',
      }),
    });

    const bar = Style.get({
      layout: Style.getLayoutInlineBlock({
        background: Container.reliefRGB,
        width: '2px',
        height: '13px',
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: 'rotate(40deg) translate3d(-5px, 13px, 0px)',
      }),
    });
    return { div, left, right, bar };
  }

  static getHomeCss({ app, ui }: any) {
    const div = Style.get({
      layout: Style.getLayoutInlineBlock({
        width: '30px',
        height: '30px',
      }),
      content: Style.getContentBase({
        cursor: 'pointer',
      }),
      animation: Style.getAnimationBase({
        transform: 'scale( 1 )',
      }),
    });

    const leaf = Style.get({
      layout: Style.getLayoutInlineBlock({
        borderBottom: `2px solid ${Container.reliefRGB}`,
        borderLeft: `2px solid ${Container.reliefRGB}`,
        borderRadius: '0px',
        margin: '0 auto',
        width: '19px',
        height: '18px',
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: 'rotate(135deg) translate3d(5px, -3px, 0px)',
      }),
    });

    const base = Style.get({
      layout: Style.getLayoutInlineBlock({
        borderRight: `2px solid ${Container.reliefRGB}`,
        borderBottom: `2px solid ${Container.reliefRGB}`,
        borderLeft: `2px solid ${Container.reliefRGB}`,
        borderRadius: '0px',
        margin: '0 auto',
        width: '20px',
        height: '12px',
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: 'translate3d(2px, -6px, 0px)',
      }),
    });

    const door = Style.get({
      layout: Style.getLayoutInlineBlock({
        background: `${Container.reliefRGB}`,
        width: '6px',
        height: '8px',
        margin: '0 auto',
        borderRadius: '5px 5px 0px 0px',
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: 'translate3d(-11px, -5px, 0px)',
      }),
    });

    return { div, leaf, door, base };
  }

  static getSearch({ app, ui }: any) {
    const div = Style.get({
      layout: Style.getLayoutInlineBlock({
        width: `${Container.getBlockSize({ app, ui })}px`,
        height: `${Container.getBlockSize({ app, ui })}px`,
        borderRadius: '100px',
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: 'scale( 1 )',
      }),
    });

    const circle = Style.get({
      layout: Style.getLayoutBlock({
        position: 'absolute',
        top: '4px',
        left: '16px',
        margin: '7px auto',
        width: '18px',
        height: '18px',
        borderRadius: '100px',
        border: `3px solid ${Container.chromeOffTabRGB}`,
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: `scale( 1 ) translate3d( 0px, 0px, 0px )`,
      }),
    });

    const bar = Style.get({
      layout: Style.getLayoutInlineBlock({
        position: 'absolute',
        top: '23px',
        left: '13px',
        margin: '0 auto',
        background: Container.chromeOffTabRGB,
        width: '4px',
        height: '12px',
        borderRadius: '10px',
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transition: Container.getTransition({ app, ui }),
        transform: `scale(1) translate3d(0px, 0px, 0px) rotate(45deg)`,
      }),
    });
    return { div, circle, bar };
  }

  static getUser({ app, ui }) {
    const div = Style.get({
      layout: Style.getLayoutInlineBlock({
        width: '24px',
        height: Icon.smallSize,
        margin: `${Icon.getMargin({ app, ui })}px`,
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: 'scale( 1 )',
      }),
    });

    const top = Style.get({
      layout: Style.getLayoutBlock({
        margin: '0 auto',
        background: Container.reliefRGB,
        width: '6px',
        height: '6px',
        borderRadius: '10px',
        position: 'relative',
        top: '-10px',
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: `scale( 1 ) translate3d( 0px, 0px, 0px )`,
      }),
    });

    const bottom = Style.get({
      layout: Style.getLayoutBlock({
        margin: '0 auto',
        background: Container.reliefRGB,
        width: '8px',
        height: '12px',
        borderRadius: '6px',
        position: 'relative',
        top: '10px',
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        //        transition: Container.getTransition( app ),
        transform: `scale( 1 ) translate3d( 0px, 0px, 0px )`,
      }),
    });
    return { div, top, bottom };
  }

  static getHeaderUser({ app, ui }: any) {
    const div = Style.get({
      layout: Style.getLayoutInlineBlock({
        width: '40px',
        height: '40px',
        margin: '5px',
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: 'scale( 1 )',
      }),
    });

    const top = Style.get({
      layout: Style.getLayoutBlock({
        margin: '0 auto',
        background: `${Container.chromeOffTabRGB}`,
        width: '14px',
        height: '14px',
        borderRadius: '10px',
        position: 'relative',
        top: '-12px',
        border: '3px solid rgb(250, 250, 250)',
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: `scale( 1 ) translate3d( 0px, 0px, 0px )`,
      }),
    });

    const bottom = Style.get({
      layout: Style.getLayoutBlock({
        margin: '0 auto',
        background: `${Container.chromeOffTabRGB}`,
        width: '10px',
        height: '16px',
        borderRadius: '6px',
        position: 'relative',
        top: '12px',
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        //        transition: Container.getTransition( app ),
        transform: `scale( 1 ) translate3d( 0px, 0px, 0px )`,
      }),
    });
    return { div, top, bottom };
  }

  static getIndex({ app, ui }: any) {
    const div = Style.get({
      layout: Style.getLayoutInlineBlock({
        width: '24px',
        height: Icon.smallSize,
        margin: `${Icon.getMargin({ app, ui })}px`,
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: 'scale( 1 )',
      }),
    });

    const wrap = Style.get({
      layout: Style.getLayoutBlock({
        width: '24px',
        height: '24px',
        margin: '0 auto',
        borderRadius: '4px',
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase(),
    });

    const commonSpan = Style.get({
      layout: Style.getLayoutBlock({
        width: '24px',
        height: '2px',
        margin: '5px auto',
        borderRadius: '6px',
        background: Container.reliefRGB,
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase(),
    });

    const top = Style.get({
      layout: commonSpan,
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: `translate3d( 0px, 0px, 0px )`,
      }),
    });

    const middle = Style.get({
      layout: commonSpan,
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: `translate3d( 0px, 0px, 0px )`,
      }),
    });

    const bottom = Style.get({
      layout: commonSpan,
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        //        transition: Container.getTransition( app ),
        transform: `translate3d( 0px, 0px, 0px )`,
      }),
    });
    return { div, wrap, top, middle, bottom };
  }

  static getLogs({ app, ui }: any) {
    const div = Style.get({
      layout: Style.getLayoutInlineBlock({
        width: '24px',
        height: Icon.smallSize,
        margin: `${Icon.getMargin({ app, ui })}px`,
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: 'scale( 1 )',
      }),
    });

    const foot1 = Style.get({
      layout: Style.getLayoutInlineBlock({
        position: 'absolute',
        top: '3px',
        left: '-6px',
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: `scale( 1 ) rotate(-15deg)`,
      }),
    });

    const foot1Top = Style.get({
      layout: Style.getLayoutBlock({
        margin: '0 auto',
        background: Container.reliefRGB,
        width: '9px',
        height: '13px',
        borderRadius: '45px 30px 45px 45px',
        position: 'relative',
        left: '2px',
        zIndex: '0',
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        //        transition: Container.getTransition( app ),
        transform: `translate3d( 0px, 0px, 0px )`,
      }),
    });

    const foot1Bottom = Style.get({
      layout: Style.getLayoutBlock({
        margin: '0 auto',
        background: Container.reliefRGB,
        width: '6px',
        height: '8px',
        borderRadius: '10px',
        position: 'relative',
        top: '-2px',
        left: '2px',
        zIndex: '0',
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: `translate3d( 0px, 0px, 0px )`,
      }),
    });

    const foot1Space = Style.get({
      layout: Style.getLayoutBlock({
        width: '7px',
        height: '2px',
        background: Container.offWhiteRGB,
        margin: '0 auto',
        zIndex: '1000',
        position: 'relative',
        left: '1px',
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        //        transition: Container.getTransition( app ),
        transform: `translate3d( 1px, -9px, 1000px )`,
      }),
    });

    const foot2 = Style.get({
      layout: Style.getLayoutInlineBlock({
        width: '36px',
        height: '36px',
        position: 'absolute',
        top: '-4px',
        left: '0px',
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: `scale( 0.5 ) rotate(30deg)`,
      }),
    });

    const foot2Top = Style.get({
      layout: Style.getLayoutBlock({
        margin: '0 auto',
        background: Container.reliefRGB,
        width: '11px',
        height: '21px',
        borderRadius: '30px 50px 40px 40px',
        position: 'relative',
        left: '-1px',
        zIndex: '0',
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        //        transition: Container.getTransition( app ),
        transform: `translate3d( 0px, 0px, 0px )`,
      }),
    });

    const foot2Bottom = Style.get({
      layout: Style.getLayoutBlock({
        margin: '0 auto',
        background: Container.reliefRGB,
        width: '8px',
        height: '8px',
        borderRadius: '2px 2px 3px 3px',
        position: 'relative',
        left: '-1px',
        zIndex: '0',
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: `translate3d( 0px, 0px, 0px )`,
      }),
    });

    const foot2Space = Style.get({
      layout: Style.getLayoutBlock({
        width: '19px',
        height: '3px',
        background: Container.offWhiteRGB,
        margin: '0 auto',
        zIndex: '1000',
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        //        transition: Container.getTransition( app ),
        transform: `translate3d( 0px, -10px, 1000px )`,
      }),
    });

    return {
      div,
      foot1,
      foot1Top,
      foot1Space,
      foot1Bottom,
      foot2,
      foot2Top,
      foot2Space,
      foot2Bottom,
    };
  }

  static getSetting({ app, ui }: any) {
    const div = Style.get({
      layout: Style.getLayoutInlineBlock({
        width: '24px',
        height: Icon.smallSize,
        margin: `${Icon.getMargin({ app, ui })}px`,
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: 'scale( 1 )',
      }),
    });

    const commonWing = Style.get({
      layout: Style.getLayoutBlock({
        position: 'absolute',
        margin: '0 auto',
        background: Container.reliefRGB,
        width: '4px',
        height: '4px',
        borderRadius: '1px',
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: `translate3d( 0px, 0px, 0px )`,
      }),
    });

    const wing1 = Style.get({
      layout: commonWing,
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: `translate3d(9.5px, 1px, 0px) rotate(0deg)`,
      }),
    });

    const wing2 = Style.get({
      layout: commonWing,
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: `translate3d( 15px, 4px, 0px ) rotate( 45deg )`,
      }),
    });

    const wing3 = Style.get({
      layout: commonWing,
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: `translate3d( 17px, 9px, 0px ) rotate( 90deg )`,
      }),
    });

    const wing4 = Style.get({
      layout: commonWing,
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: `translate3d( 15.5px, 14px, 0px ) rotate( 125deg )`,
      }),
    });

    const wing5 = Style.get({
      layout: commonWing,
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: `translate3d( 9.5px, 17px, 0px ) rotate( 180deg )`,
      }),
    });

    const wing6 = Style.get({
      layout: commonWing,
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: `translate3d( 3px, 14px, 0px ) rotate( 225deg )`,
      }),
    });

    const wing7 = Style.get({
      layout: commonWing,
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: `translate3d( 1px, 9px, 0px ) rotate( 270deg )`,
      }),
    });

    const wing8 = Style.get({
      layout: commonWing,
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: `translate3d( 2.5px, 4px, 0px ) rotate( 315deg )`,
      }),
    });

    const circle = Style.get({
      layout: Style.getLayoutBlock({
        position: 'absolute',
        top: '2px',
        left: '3px',
        width: '16px',
        height: '16px',
        border: `3px solid ${Container.reliefRGB}`,
        borderRadius: '50px',
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: `translate3d( 0px, 1px, 0px )`,
      }),
    });
    return {
      div,
      wing1,
      wing2,
      wing3,
      wing4,
      wing5,
      wing6,
      wing7,
      wing8,
      circle,
    };
  }

  static getThunder({ app, ui }: any) {
    let borderColor = Container.reliefRGBA;
    if (Ui.isActiveMultistream({ app, ui })) {
      borderColor = Container.themeRGBA;
    }

    const div = Style.get({
      layout: Style.getLayoutInlineBlock({
        width: '30px',
        height: '30px',
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transition: Container.transitionOff,
        transform: 'rotate(0deg) translate(0px, 0px)',
      }),
    });

    const wrap = Style.get({
      layout: Style.getLayoutInlineBlock({
        borderRadius: '50px',
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transition: Container.transitionOff,
        transform: 'rotate(90deg) translate3d(0px,0px,0px)',
      }),
    });

    const top = Style.get({
      layout: Style.getLayoutBlock({
        position: 'relative',
        top: '0px',
        left: '0px',
        width: '0px',
        height: '0px',
        margin: '0 auto',

        borderWidth: '8px 8px 10px 8px',
        borderTopStyle: 'solid',
        borderRightStyle: 'solid',
        borderBottomStyle: 'solid',
        borderLeftStyle: 'solid',
        borderTopColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: `${borderColor}`,
        borderLeftColor: 'transparent',
        borderTopLeftRadius: '0px',
        borderTopRightRadius: '0px',
        borderBottomRightRadius: '0px',
        borderBottomLeftRadius: '0px',
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transition: Container.transitionOff,
        transform: 'skew(60deg, 0deg) rotate(0deg) translate(-3px, -3px)',
      }),
    });

    const bottom = Style.get({
      layout: Style.getLayoutFlex({
        position: 'relative',
        top: '0px',
        left: '0px',
        width: '0px',
        height: '0px',
        margin: '0 auto',
        borderWidth: '8px 8px 10px 8px',
        borderTopStyle: 'solid',
        borderRightStyle: 'solid',
        borderBottomStyle: 'solid',
        borderLeftStyle: 'solid',
        borderTopColor: `${borderColor}`,
        borderRightColor: 'transparent',
        borderBottomColor: 'transparent',
        borderLeftColor: 'transparent',
        borderTopLeftRadius: '0px',
        borderTopRightRadius: '0px',
        borderBottomRightRadius: '0px',
        borderBottomLeftRadius: '0px',
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transition: Container.transitionOff,
        transform: 'skew(60deg, 0deg) rotate(0deg) translate(15px, -3px)',
      }),
    });
    return { div, wrap, top, bottom };
  }

  static getPlay({ app, ui }: any) {
    const bgColor = ui.isOpenLinks ? Container.themeRGB : Container.reliefRGB;
    const div = Style.get({
      layout: Style.getLayoutFlex({
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '30px',
        height: '30px',
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transition: Container.transitionOff,
        transform: 'translate(0px, 0px)',
      }),
    });

    const playCircleSize = '24px';
    const playCircle = Style.get({
      layout: Style.getLayoutInlineBlock({
        position: 'absolute',
        top: '5px',
        width: playCircleSize,
        height: playCircleSize,
        minWidth: playCircleSize,
        minHeight: playCircleSize,
        border: `2px solid ${bgColor}`,
        borderRadius: '30px',
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transition: Container.transitionOff,
        transform: 'translate3d(0px,0px,0px)',
      }),
    });

    const playTriangleSize = '6px';
    const playTriangle = Style.get({
      layout: Style.getLayoutInlineBlock({
        position: 'relative',
        width: playTriangleSize,
        height: playTriangleSize,
        borderTop: `${playTriangleSize} solid transparent`,
        borderRight: `${playTriangleSize} solid transparent`,
        borderBottom: `${playTriangleSize} solid transparent`,
        borderLeft: `${playTriangleSize} solid ${bgColor}`,
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transition: Container.transitionOff,
        transform: 'translate3d(4px, 1.5px, 0px)',
      }),
    });
    return { div, playCircle, playTriangle };
  }

  static getLinks({ app, ui }: any) {
    const bgColor = Container.themeRGB;

    const div = Style.get({
      layout: Style.getLayoutFlex({
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '30px',
        height: '30px',
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transition: Container.transitionOff,
        transform: 'translate(0px, 0px)',
      }),
    });

    const blockWidth = '24px';
    const blockHeight = '14px';
    const linksA1 = Style.get({
      layout: Style.getLayoutInlineBlock({
        position: 'absolute',
        top: '5px',
        left: '6px',
        width: blockWidth,
        height: blockHeight,
        border: `2px solid ${bgColor}`,
        borderRadius: '30px',
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transition: Container.transitionOff,
        transform: 'translate3d(0px,0px,0px)',
      }),
    });

    const whiteSize = '4px';
    const linksA2 = Style.get({
      layout: Style.getLayoutInlineBlock({
        position: 'relative',
        top: '5px',
        left: '5px',
        width: whiteSize,
        height: whiteSize,
        borderRadius: '10px',
        background: Container.whiteRGB,
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({}),
    });

    const linksB1 = Style.get({
      layout: Style.getLayoutInlineBlock({
        position: 'absolute',
        top: '11px',
        left: '0px',
        width: blockWidth,
        height: blockHeight,
        border: `2px solid ${bgColor}`,
        borderRadius: '30px',
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transition: Container.transitionOff,
        transform: 'translate3d(0px,0px,0px)',
      }),
    });

    const linksB2 = Style.get({
      layout: Style.getLayoutInlineBlock({
        position: 'relative',
        top: '-5px',
        left: '-5px',
        width: whiteSize,
        height: whiteSize,
        borderRadius: '10px',
        background: Container.whiteRGB,
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({}),
    });
    return { div, linksA1, linksA2, linksB1, linksB2 };
  }

  static getBubble({ app, ui }: any) {
    const background = ui.isBubblePost ? Container.themeRGB : Container.reliefRGBA;
    const div = Style.get({
      layout: Style.getLayoutFlex({
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '30px',
        height: '30px',
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transition: Container.transitionOff,
        transform: 'translate(0px, 0px)',
      }),
    });

    const bubble = Style.get({
      layout: Style.getLayoutInlineBlock({
        position: 'relative',
        top: '5px',
        width: '18px',
        height: '14px',
        background,
        borderRadius: '30px',
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transition: Container.transitionOff,
        transform: 'translate3d(0px,0px,0px)',
      }),
    });

    const bubbleBar = Style.get({
      layout: Style.getLayoutInlineBlock({
        position: 'relative',
        top: '5px',
        width: '5px',
        height: '10px',
        background,
        border: `3px solid ${background}`,
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transition: Container.transitionOff,
        transform: 'skew(30deg, 28deg) rotate(30deg) translate3d(-2px, -7px, 0px)',
      }),
    });
    return { div, bubble, bubbleBar };
  }

  static getDetail({ app, ui }: any) {
    const margin = ui.screenSize === Ui.screenSizeSmallLabel ? '0' : '1px auto';
    const div = Style.get({
      layout: Style.getLayoutInlineFlex({
        width: '40px',
        height: '40px',
        borderRadius: '100px',
        margin,
        cursor: 'pointer',
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase(),
    });

    const wrap = Style.get({
      layout: Style.getLayoutBlock({
        width: '26px',
        height: '28px',
        margin: '7px auto',
        borderRadius: '2px',
        background: `${Container.calmRGB}`,
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase(),
    });

    const commonSpan = Style.get({
      layout: Style.getLayoutBlock({
        width: '14px',
        height: '2px',
        margin: '3px auto',
        borderRadius: '6px',
        background: Container.whiteRGB,
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase(),
    });

    const bar1 = Style.get({
      layout: { ...commonSpan, width: '7px', margin: '5px 0px 0px 6px' },
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: `translate3d( 0px, 0px, 0px )`,
      }),
    });

    const bar2 = Style.get({
      layout: commonSpan,
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: `translate3d( 0px, 0px, 0px )`,
      }),
    });

    const bar3 = Style.get({
      layout: commonSpan,
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transition: Container.getTransition({ app, ui }),
        transform: `translate3d( 0px, 0px, 0px )`,
      }),
    });

    const bar4 = Style.get({
      layout: commonSpan,
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transition: Container.getTransition({ app, ui }),
        transform: `translate3d( 0px, 0px, 0px )`,
      }),
    });

    const mekuri = Style.get({
      layout: {
        ...commonSpan,
        position: 'absolute',
        top: 0,
        rightt: 0,
        width: 0,
        height: 0,
        borderRadius: 0,
        borderTop: `4px solid ${Container.whiteRGB}`,
        borderLeft: `4px solid ${Container.whiteRGB}`,
        borderRight: `4px solid ${Container.reliefRGB}`,
        borderBottom: `4px solid ${Container.reliefRGB}`,
      },
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: `translate3d(18px, -3px, 0px) rotate( 90deg )`,
      }),
    });
    return { div, wrap, bar1, bar2, bar3, bar4, mekuri };
  }

  static getMenu({ app, ui }: any) {
    const div = Style.get({
      layout: Style.getLayoutInlineBlock({
        width: '40px',
        height: '40px',
        margin: `${Icon.getMargin({ app, ui })}px`,
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transition: Container.getTransition({ app, ui }),
      }),
    });

    const dot = Style.get({
      layout: Style.getLayoutBlock({
        position: 'relative',
        top: '2px',
        width: '6px',
        height: '6px',
        margin: '4px auto',
        borderRadius: '6px',
        background: Container.calmRGB,
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase(),
    });
    return { div, dot };
  }

  static getHeadTabLeftTransform() {
    return Icon.getHeadTabLeftOpenTransform;
  }
  static getHeadTabRightTransform() {
    return Icon.getHeadTabRightOpenTransform;
  }
  static get getHeadTabLeftOpenTransform() {
    return 'rotate( 120deg ) translate3d(3px, 5px, 0px)';
  }
  static get getHeadTabRightOpenTransform() {
    return 'rotate( -120deg ) translate3d(-3px, 5px, 0px)';
  }
  static get getHeadTabLeftCloseTransform() {
    return 'rotate( 90deg ) translate3d(3px, 5px, 0px)';
  }
  static get getHeadTabRightCloseTransform() {
    return 'rotate( -90deg ) translate3d(-3px, 5px, 0px)';
  }
  static getHeadTab({ app, ui }: any) {
    const commonLayout = Style.getLayoutInlineBlock({
      width: '4px',
      borderRadius: '10px',
      background: Container.calmRGB,
    });

    const div = Style.get({
      layout: Style.getLayoutBlock({
        width: '40px',
        height: '20px',
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase(),
    });

    const left = Style.get({
      layout: commonLayout,
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transition: Container.getTransition({ app, ui }),
        transform: Icon.getHeadTabLeftTransform(),
      }),
    });

    const right = Style.get({
      layout: commonLayout,
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transition: Container.getTransition({ app, ui }),
        transform: Icon.getHeadTabRightTransform(),
      }),
    });
    return { div, left, right };
  }

  static getHeart({ app, ui }: any) {
    const color = ui.openLockMenu === Ui.openLockMenuLabelShare ? Container.themeRGBA : Container.reliefRGB;
    const div = Style.get({
      layout: Style.getLayoutInlineBlock({
        width: Icon.smallSize,
        height: Icon.smallSize,
        margin: `${Icon.getMargin({ app, ui })}px`,
      }),
      content: Style.getContentBase({}),
      animation: Style.getAnimationBase({}),
    });

    const before = Style.get({
      layout: Style.getLayoutBase({
        width: '10px',
        height: '17px',
        borderRadius: '10px 10px 0 0',
        background: Container.reliefRGB,
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: 'rotate(-45deg) translate3d(0px, 4px, 0px)',
      }),
    });

    const after = Style.get({
      layout: Style.getLayoutBase({
        width: '17px',
        height: '10px',
        borderRadius: '0 10px 10px 0',
        background: Container.reliefRGB,
      }),
      content: Style.getContentBase({}),
      animation: Style.getAnimationBase({
        transform: 'rotate(-45deg) translate3d(11px, -4px, 0px)',
      }),
    });
    return { div, before, after };
  }

  static getShare({ app, ui }: any) {
    const color = ui.openLockMenu === Ui.openLockMenuLabelShare ? Container.themeRGBA : Container.reliefRGB;
    const div = Style.get({
      layout: Style.getLayoutInlineBlock({
        width: Icon.smallSize,
        height: Icon.smallSize,
        margin: `${Icon.getMargin({ app, ui })}px`,
      }),
      content: Style.getContentBase({}),
      animation: Style.getAnimationBase({}),
    });

    const base = Style.get({
      layout: Style.getLayoutInlineBlock({
        position: 'absolute',
        top: '11px',
        left: '9px',
        width: '16px',
        height: '14px',
        margin: '0 auto',
        border: `2px solid ${color}`,
        borderRadius: '3px',
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: 'translate3d(-4px, -3px, 0px)',
      }),
    });

    const bar = Style.get({
      layout: Style.getLayoutInlineBlock({
        position: 'absolute',
        top: '6px',
        left: '16px',
        width: '2px',
        height: '11px',
        margin: '0 auto',
        background: color,
      }),
      content: Style.getContentBase({}),
      animation: Style.getAnimationBase({
        transform: 'translate3d(-4px, -3px, 0px)',
      }),
    });

    const whiteBar1 = Style.get({
      layout: Style.getLayoutInlineBlock({
        position: 'absolute',
        width: '5px',
        height: '4px',
        top: '10px',
        left: '11px',
        margin: '0 auto',
        background: 'rgb(250, 250, 250)',
        zIndex: 100,
      }),
      content: Style.getContentBase({}),
      animation: Style.getAnimationBase({
        transform: 'translate3d(-4px, -2px, 0px)',
      }),
    });

    const whiteBar2 = Style.get({
      layout: Style.getLayoutInlineBlock({
        position: 'absolute',
        width: '5px',
        height: '4px',
        top: '10px',
        left: '18px',
        margin: '0 auto',
        background: 'rgb(250, 250, 250)',
        zIndex: 100,
      }),
      content: Style.getContentBase({}),
      animation: Style.getAnimationBase({
        transform: 'translate3d(-4px, -2px, 0px)',
      }),
    });

    const arrow = Style.get({
      layout: Style.getLayoutInlineBlock({
        position: 'absolute',
        top: '5px',
        left: '13px',
        width: '8px',
        height: '8px',
        borderTop: `2px solid ${color}`,
        borderRight: `2px solid ${color}`,
      }),
      content: Style.getContentBase({}),
      animation: Style.getAnimationBase({
        transform: 'translate3d(-4px, -1px, 0px) rotate( -45deg)',
      }),
    });
    return { div, base, whiteBar1, whiteBar2, bar, arrow };
  }

  static getMoney({ app, ui }: any) {
    const div = Style.get({
      layout: Style.getLayoutInlineBlock({
        width: Icon.smallSize,
        height: Icon.smallSize,
        margin: `${Icon.getMargin({ app, ui })}px`,
      }),
      content: Style.getContentBase({}),
      animation: Style.getAnimationBase({
        transform: 'translate3d(0px, -2px, 0px)',
      }),
    });

    const outer = Style.get({
      layout: Style.getLayoutBlock({
        margin: '0 auto',
        width: '20px',
        height: '20px',
        borderRadius: '24px',
        border: `2px solid ${Container.reliefRGB}`,
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: 'translate3d(0px, 3px, 0px)',
      }),
    });

    const inner = Style.get({
      layout: Style.getLayoutBlock({
        margin: '0 auto',
        width: '8px',
        height: '8px',
        borderRadius: '8px',
        border: `2px solid ${Container.reliefRGB}`,
      }),
      content: Style.getContentBase({}),
      animation: Style.getAnimationBase({
        transform: 'translate3d(0px, 4px, 0px)',
      }),
    });
    return { div, outer, inner };
  }

  static getOpenEmoji(state: any) {
    const { app, ui } = state;
    const size = '5px';
    const display = Ui.screenSizeSmallLabel === ui.screenSize ? 'none' : 'inline-block';
    const div = Style.get({
      layout: Style.getLayoutInlineBlock({
        display,
        width: size,
        height: size,
        minWidth: size,
        minHeight: size,
        margin: '0px 5px 0px 0px',
        borderRight: `${size} solid transparent`,
        borderTop: `${size} solid transparent`,
        borderBottom: `${size} solid transparent`,
        borderLeft: `${size} solid rgba(200,200,200,0.8)`,
      }),
      content: Style.getContentBase({}),
      animation: Style.getAnimationBase({
        transform: 'translate3d( 5px, 0px, 0px )',
        transition: Container.getTransition({ app, ui }),
      }),
    });
    return { div };
  }

  static getCloseEmoji({ app, ui }: any) {
    const size = '8px';
    const div = Style.get({
      layout: Style.getLayoutInlineBlock({
        width: size,
        height: size,
        minWidth: size,
        minHeight: size,
        margin: '0px 0px 0px -20px',
        borderRight: `${size} solid rgba(200,200,200,0.8)`,
        borderTop: `${size} solid transparent`,
        borderBottom: `${size} solid transparent`,
        borderLeft: `${size} solid transparent`,
      }),
      content: Style.getContentBase({}),
      animation: Style.getAnimationBase({
        transform: 'translate3d( 5px, 0px, 0px )',
        transition: Container.getTransition({ app, ui }),
      }),
    });
    return { div };
  }

  static getCloseOptionModal({ app, ui }: any) {
    const size = Container.getBlockSize({ app, ui });
    return {
      div: { position: 'absolute', right: 0, transform: `translate( 0px, -${size + 20}px)` },
    };
  }

  static getClose({ app, ui }: any) {
    const div = Style.get({
      layout: Style.getLayoutInlineFlex({
        width: Container.getBlockSize({ app, ui }),
        height: Container.getBlockSize({ app, ui }),
        margin: '1px',
      }),
      content: Style.getContentBase({
        cursor: 'pointer',
      }),
      animation: Style.getAnimationBase({}),
    });

    const circle = Style.get({
      layout: Style.getLayoutFlex({
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto',
        width: '80%',
        height: '80%',
        background: Container.calmRGBA,
        border: `0px solid ${Container.calmRGB}`,
        borderRadius: '50%',
        boxShadow: '0px 0px 4px rgba(100, 100, 100, 1)',
      }),
      content: Style.getContentBase({
        cursor: 'pointer',
      }),
      animation: Style.getAnimationBase({
        transform: 'translate3d(0px, 0px, 0px) rotate(0deg)',
      }),
    });

    const bar1 = Style.get({
      layout: Style.getLayoutBlock({
        position: 'absolute',
        margin: '0 auto',
        width: '2px',
        height: '70%',
        background: Container.whiteRGBA,
        borderRadius: '2px',
      }),
      content: Style.getContentBase({
        cursor: 'pointer',
      }),
      animation: Style.getAnimationBase({
        transform: 'translate3d(0px, 0px, 0px) rotate(45deg)',
      }),
    });

    const bar2 = Style.get({
      layout: Style.getLayoutBlock({
        position: 'absolute',
        margin: '0 auto',
        width: '2px',
        height: '70%',
        background: Container.whiteRGBA,
        borderRadius: '2px',
      }),
      content: Style.getContentBase({
        cursor: 'pointer',
      }),
      animation: Style.getAnimationBase({
        transform: 'translate3d(0px, 0px, 0px) rotate(-45deg)',
      }),
    });
    return { div, circle, bar1, bar2 };
  }

  static getCh({ app, ui }: any) {
    //    const color = `rgb(${Container.themeLightRGBString})`;
    const color = Container.lightGrayRGB;

    const div = Style.get({
      layout: Style.getLayoutFlex({
        width: '46px',
        height: '46px',
      }),
      content: Style.getContentBase({
        cursor: 'pointer',
      }),
      animation: Style.getAnimationBase({}),
    });

    const chC = Style.get({
      layout: Style.getLayoutFlex({
        position: 'absolute',
        top: '30%',
        left: '3%',
        width: '44%',
        height: '44%',
        border: `4px solid ${color}`,
        borderRadius: '100%',
      }),
      content: {},
      animation: {},
    });

    const chCSpace = Style.get({
      layout: Style.getLayoutFlex({
        position: 'absolute',
        top: '35%',
        left: '30%',
        width: '30%',
        height: '30%',
        background: Container.lightRGB,
      }),
      content: {},
      animation: {
        transform: 'rotate(45deg)',
      },
    });

    const chCCircle1 = Style.get({
      layout: Style.getLayoutFlex({
        position: 'absolute',
        top: '37%',
        left: '33%',
        width: '9%',
        height: '9%',
        background: color,
        borderRadius: '100%',
      }),
      content: {},
      animation: {
        transform: 'scale(1) translate(-32%, -60%)',
      },
    });

    const chCCircle2 = Style.get({
      layout: Style.getLayoutFlex({
        position: 'absolute',
        top: '59%',
        left: '33%',
        width: '9%',
        height: '9%',
        background: color,
        borderRadius: '100%',
      }),
      content: {},
      animation: {
        transform: 'scale(1) translate(-7%, 30%)',
      },
    });

    const chH1 = Style.get({
      layout: Style.getLayoutFlex({
        position: 'absolute',
        top: '30%',
        left: '53%',
        width: '10%',
        height: '43%',
        background: color,
        borderRadius: '23%',
      }),
      content: {},
      animation: {},
    });

    const chH2 = Style.get({
      layout: Style.getLayoutFlex({
        position: 'absolute',
        top: '30%',
        left: '79%',
        width: '10%',
        height: '43%',
        background: color,
        borderRadius: '23%',
      }),
      content: {},
      animation: {},
    });

    const chH3 = Style.get({
      layout: Style.getLayoutFlex({
        position: 'absolute',
        top: '47%',
        left: '53%',
        width: '36%',
        height: '9%',
        background: color,
      }),
      content: {},
      animation: {},
    });
    return { div, chC, chCSpace, chCCircle1, chCCircle2, chH1, chH2, chH3 };
  }

  static getUpdate({ app, ui }: any) {
    const color = Container.whiteRGB;
    const div = Style.get({
      layout: Style.getLayoutFlex({
        width: Icon.middleSize,
        height: Icon.middleSize,
      }),
      content: Style.getContentBase({
        cursor: 'pointer',
      }),
      animation: Style.getAnimationBase({
        transform: 'scale( 0.75)',
      }),
    });

    const circle = Style.get({
      layout: Style.getLayoutBase({
        width: '55%',
        height: '55%',
        borderRadius: '30px',
        border: `2px solid ${color}`,
        overflow: 'visible',
      }),
      content: Style.getContentBase({
        cursor: 'pointer',
      }),
      animation: Style.getAnimationBase({}),
    });

    const bar = Style.get({
      layout: Style.getLayoutBase({
        position: 'relative',
        top: '1px',
        left: '12px',
        width: '8px',
        height: '8px',
        background: 'none',
        borderTop: `0px solid ${Container.themeRGB}`,
        borderRight: `2px solid ${color}`,
        borderBottom: `2px solid ${color}`,
        borderLeft: `0px solid ${Container.themeRGB}`,
      }),
      content: Style.getContentBase({
        cursor: 'pointer',
      }),
      animation: Style.getAnimationBase({
        transform: 'rotate(25deg)',
      }),
    });

    const white = Style.get({
      layout: Style.getLayoutBase({
        position: 'relative',
        top: '2px',
        left: '12px',
        width: '10px',
        height: '4px',
        background: 'rgba(100, 192, 170, 1)',
      }),
      content: Style.getContentBase({
        cursor: 'pointer',
      }),
      animation: Style.getAnimationBase({
        transform: 'rotate(25deg)',
      }),
    });
    return { div, circle, bar, white };
  }

  static getLoading({ app, ui }: any) {
    const color = Container.whiteRGB;
    const div = Style.get({
      layout: Style.getLayoutFlex({}),
      content: Style.getContentBase({}),
      animation: Style.getAnimationBase({}),
    });

    const circle = Style.get({
      layout: Style.getLayoutBase({
        margin: '0 auto',
        width: '2em',
        height: '2em',
        borderRadius: '50%',
        borderTop: `0.3em solid rgba(255, 255, 255, 0.2)`,
        borderRight: '0.3em solid rgba(255, 255, 255, 0.2)',
        borderBottom: '0.3em solid rgba(255, 255, 255, 0.2)',
        borderLeft: '0.3em solid #ffffff',
      }),
      content: Style.getContentBase({}),
      animation: Style.getAnimationBase({
        transform: 'translateZ(0)',
        animation: 'Rotation 1.1s infinite linear',
      }),
    });

    const after = Style.get({
      layout: Style.getLayoutBase({
        display: 'none',
        borderRadius: '50%',
        width: '2em',
        height: '2em',
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({}),
    });
    return { div, circle, after };
  }

  static getTune({ app, ui }: any) {
    const size = '30px';
    const zIndex = 1000000;
    const bgColor = Container.chromeOffTabRGB;
    const top1 = '153px';
    const top2 = '190px';
    const top3 = '280px';
    const top4 = '317px';
    const left1 = '69px';
    const left2 = '146px';
    const left3 = '324px';
    const left4 = '401px';

    const div = Style.get({
      layout: Style.getLayoutFlex({
        position: 'absolute',
        // background: "green",
        width: '500px',
        height: '500px',
      }),
      content: Style.getContentBase({}),
      animation: Style.getAnimationBase({
        transform: 'scale(1)',
      }),
    });

    const side1 = Style.get({
      layout: Style.getLayoutBase({
        position: 'absolute',
        top: '135px',
        left: '135px',
        border: `${size} solid ${bgColor}`,
        borderRadius: '300px',
        width: '230px',
        height: '230px',
        zIndex: 0,
      }),
      content: Style.getContentBase({}),
      animation: Style.getAnimationBase({}),
    });

    const side2 = Style.get({
      layout: Style.getLayoutBase({
        position: 'absolute',
        top: '50px',
        left: '50px',
        border: `${size} solid ${bgColor}`,
        borderRadius: '300px',
        width: '400px',
        height: '400px',
        zIndex: 0,
      }),
      content: Style.getContentBase({}),
      animation: Style.getAnimationBase({}),
    });

    const cut = Style.get({
      layout: Style.getLayoutBase({
        //       display: "none",
        position: 'absolute',
        top: '50px',
        left: '-150px',
        background: 'none',
        width: '0px',
        height: '0px',
        borderTop: `200px solid ${Container.lightRGB}`,
        borderRight: '400px solid rgba(255,255,255,0)',
        borderBottom: `200px solid ${Container.lightRGB}`,
        borderLeft: '400px solid rgba(255,255,255,0)',
        zIndex: 1,
      }),
      content: Style.getContentBase({}),
      animation: Style.getAnimationBase({}),
    });

    const center = Style.get({
      layout: Style.getLayoutBase({
        position: 'absolute',
        top: '220px',
        left: '220px',
        width: '60px',
        height: '60px',
        borderRadius: '100px',
        background: bgColor,
        zIndex,
      }),
      content: Style.getContentBase({}),
      animation: Style.getAnimationBase({}),
    });

    const terminalLeftTop1 = Style.get({
      layout: Style.getLayoutBase({
        position: 'absolute',
        top: top1,
        left: left1,
        width: size,
        height: size,
        borderRadius: '100px',
        background: bgColor,
        zIndex,
      }),
      content: Style.getContentBase({}),
      animation: Style.getAnimationBase({}),
    });

    const terminalLeftTop2 = Style.get({
      layout: Style.getLayoutBase({
        position: 'absolute',
        top: top2,
        left: left2,
        width: size,
        height: size,
        borderRadius: '100px',
        background: bgColor,
        zIndex,
      }),
      content: Style.getContentBase({}),
      animation: Style.getAnimationBase({}),
    });

    const terminalLeftBottom1 = Style.get({
      layout: Style.getLayoutBase({
        position: 'absolute',
        top: top4,
        left: left1,
        width: size,
        height: size,
        borderRadius: '100px',
        background: bgColor,
        zIndex,
      }),
      content: Style.getContentBase({}),
      animation: Style.getAnimationBase({}),
    });

    const terminalLeftBottom2 = Style.get({
      layout: Style.getLayoutBase({
        position: 'absolute',
        top: top3,
        left: left2,
        width: size,
        height: size,
        borderRadius: '100px',
        background: bgColor,
        zIndex,
      }),
      content: Style.getContentBase({}),
      animation: Style.getAnimationBase({}),
    });

    const terminalRightTop1 = Style.get({
      layout: Style.getLayoutBase({
        position: 'absolute',
        top: top1,
        left: left4,
        width: size,
        height: size,
        borderRadius: '100px',
        background: bgColor,
        zIndex,
      }),
      content: Style.getContentBase({}),
      animation: Style.getAnimationBase({}),
    });

    const terminalRightTop2 = Style.get({
      layout: Style.getLayoutBase({
        position: 'absolute',
        top: top2,
        left: left3,
        width: size,
        height: size,
        borderRadius: '100px',
        background: bgColor,
        zIndex,
      }),
      content: Style.getContentBase({}),
      animation: Style.getAnimationBase({}),
    });

    const terminalRightBottom1 = Style.get({
      layout: Style.getLayoutBase({
        position: 'absolute',
        top: top4,
        left: left4,
        width: size,
        height: size,
        borderRadius: '100px',
        background: bgColor,
        zIndex,
      }),
      content: Style.getContentBase({}),
      animation: Style.getAnimationBase({}),
    });

    const terminalRightBottom2 = Style.get({
      layout: Style.getLayoutBase({
        position: 'absolute',
        top: top3,
        left: left3,
        width: size,
        height: size,
        borderRadius: '100px',
        background: bgColor,
        zIndex,
      }),
      content: Style.getContentBase({}),
      animation: Style.getAnimationBase({}),
    });

    return {
      div,
      side1,
      side2,
      cut,
      center,
      terminalLeftTop1,
      terminalLeftTop2,
      terminalLeftBottom1,
      terminalLeftBottom2,
      terminalRightTop1,
      terminalRightTop2,
      terminalRightBottom1,
      terminalRightBottom2,
    };
  }

  static getLiveCnt({ app, ui }: any) {
    const div = Style.get({
      layout: Style.getLayoutInlineBlock({
        width: '26px',
        height: '26px',
        background: `rgba(${Container.themeRGBString}, 0.85)`,
        borderRadius: '26px',
        boxShadow: '0px 0px 0px rgba(255,255,255,1)',
      }),
      content: Style.getContentBase({
        fontSize: '0.7em',
        textAlign: 'center',
      }),
      animation: Style.getAnimationBase({}),
    });

    const circle = Style.get({
      layout: Style.getLayoutInlineFlex({
        width: '100%',
        height: '100%',
      }),
      content: Style.getContentBase({
        textAlign: 'center',
        color: Container.whiteRGB,
      }),
      animation: Style.getAnimationBase(),
    });
    return { div, circle };
  }

  static getStampStr(isBubblePost = true) {
    let scale = '1';
    let height = '40px';
    let fontSize = '2em';
    let justifyContent = 'flex-start';
    if (isBubblePost) {
      scale = '1.5';
      height = '100%';
      fontSize = '3.2em';
      justifyContent = 'center';
    }
    return (
      `display: flex;` +
      `justify-content: ${justifyContent};` +
      `align-items: center;` +
      `width: 100%;` +
      `height: ${height};` +
      `transform: scale(${scale});` +
      `line-height: 2em;` +
      `font-size: ${fontSize};`
    );
  }

  static getStampLabelAtMenuStr(isBubblePost = true) {
    return `text-indent: 0.5em; font-size: 0.5em; letter-spacing: 0.1em;`;
  }

  static getStampLabel({ app, ui }) {
    let divLayout = {
      height: '20px',
      justifyContent: 'flex-end',
    };
    let labelLayout = {
      left: Ui.screenSizeSmallLabel === ui.screenSize ? '-12%' : '-9%',
      color: Container.whiteRGB,
      background: 'rgba(80, 80 ,80, 0.3)',
      borderRadius: '5px 5px 0px 0px',
      justifyContent: 'center',
    };
    let labelContent = {
      color: Container.whiteRGB,
      fontSize: '0.7em',
    };

    if (!ui.isBubblePost) {
      divLayout.height = '40px';
      divLayout.justifyContent = 'flex-start';
      labelLayout.left = Ui.screenSizeSmallLabel === ui.screenSize ? '30%' : '27%';
      labelLayout.background = 'none';
      labelLayout.borderRadius = Container.radius;
      labelLayout.justifyContent = 'flex-start';
      labelContent.color = Container.fontBaseRGB;
      labelContent.fontSize = '0.9em';
    }

    const div = Style.get({
      layout: Style.getLayoutFlex({
        position: 'absolute',
        bottom: '0px',
        width: '100%',
        zIndex: 10,
        ...divLayout,
      }),
      content: Style.getContentBase({}),
      animation: Style.getAnimationBase({}),
    });
    const label = Style.get({
      layout: Style.getLayoutFlex({
        position: 'relative',
        width: '120px',
        height: 'inherit',
        padding: '5px 5px 5px 20px',
        justifyContent: 'center',
        alignItems: 'center',
        ...labelLayout,
      }),
      content: Style.getContentBase({
        ...labelContent,
      }),
      animation: Style.getAnimationBase({}),
    });
    return { div, label };
  }
}
