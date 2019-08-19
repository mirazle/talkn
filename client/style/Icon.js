import Style from './index';
import Container from './Container';
import conf from '../conf';
import App from '../../common/schemas/state/App';
import { relative } from 'path';

export default class Icon {

  static get defaultOption(){ return {sizePx: Icon.largeSize, active: true} };
  static get smallSize(){ return '24px' };
  static get middleSize(){ return '36px' };
  static get largeSize(){ return '48px' };
  static get bigSize(){ return '64px' };

  constructor( params ){
    const bootOption = {...params.bootOption, ...params.app};
    const headTab = Icon.getHeadTab( params );
    const menu = Icon.getMenu( params );
    const talknLogo = Icon.getTalknLogo( params );
    const user = Icon.getUser( params );
    const headerUser = Icon.getHeaderUser( params );
    const tag = Icon.getTag( params );
    const home = Icon.getHome( params );
    const graph = Icon.getGraph( params );
    const search = Icon.getSearch( params );
    const index = Icon.getIndex( params );
    const logs = Icon.getLogs( params );
    const setting = Icon.getSetting( params );
    const thunder = Icon.getThunder( params );
    const bubble = Icon.getBubble( params );
    const detail = Icon.getDetail( params );
    const heart = Icon.getHeart( params );
    const share = Icon.getShare( params );
    const money = Icon.getMoney( params );
    const openEmoji = Icon.getOpenEmoji( params );
    const close = Icon.getClose( params );
    const ch = Icon.getCh( params );
    const update = Icon.getUpdate( params );
    return {
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
      update
    }
  }

  static getEmpty({app}, option = {}){
    option = {...Icon.defaultOption, ...option};
    const sizePx = option.sizePx ? option.sizePx : Icon.middleSize;
    const cursor = option.active ? "pointer" : "default";
    return Style.get({
      layout: Style.getLayoutBlock({
        flexGrow: "1",
        width: sizePx,
        height: sizePx,
        minWidth: sizePx,
        minHeight: sizePx,
        backgroundSize: sizePx,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }),
      content: Style.getContentBase({
        cursor
      }),
      animation: Style.getAnimationBase({
        transform: `scale( 1 ) translate3d( 0px, 0px, 0px )`,
      }),
    });
  }

  static getTwitter({app}, option = {}){
    option = {...Icon.defaultOption, ...option};
    const sizePx = option.sizePx ? option.sizePx : Icon.middleSize;
    const image = option.active ? "twitter.png" : "twitter_gray.png";
    const cursor = option.active ? "pointer" : "default";
    return Style.get({
      layout: Style.getLayoutBlock({
        flexGrow: "1",
        width: sizePx,
        height: sizePx,
        minWidth: sizePx,
        minHeight: sizePx,
        backgroundSize: sizePx,
        backgroundPosition: 'center',
        backgroundImage: `url(https://${conf.assetsImgPath}${image})`,
        backgroundRepeat: 'no-repeat',
      }),
      content: Style.getContentBase({
        cursor
      }),
      animation: Style.getAnimationBase({
        transform: `scale( 1 ) translate3d( 0px, 0px, 0px )`,
      }),
    });
  }

  static getFacebook({app}, option = {}){
    option = {...Icon.defaultOption, ...option};
    const sizePx = option.sizePx ? option.sizePx : Icon.middleSize;
    const image = option.active ? "facebook.png" : "facebook_gray.png";
    const cursor = option.active ? "pointer" : "default";
    return Style.get({
      layout: Style.getLayoutBlock({
        flexGrow: "1",
        width: sizePx,
        height: sizePx,
        minWidth: sizePx,
        minHeight: sizePx,
        backgroundSize: sizePx,
        backgroundPosition: 'center',
        backgroundImage: `url(https://${conf.assetsImgPath}${image})`,
        backgroundRepeat: 'no-repeat',
      }),
      content: Style.getContentBase({
        cursor
      }),
      animation: Style.getAnimationBase({
        transform: `scale( 1 ) translate3d( 0px, 0px, 0px )`,
      }),
    });
  }

  static getAppstore({app}, option = {}){
    option = {...Icon.defaultOption, ...option};
    const sizePx = option.sizePx ? option.sizePx : Icon.middleSize;
    const image = option.active ? "appstore.png" : "appstore_gray.png";
    const cursor = option.active ? "pointer" : "default";
    return Style.get({
      layout: Style.getLayoutBlock({
        flexGrow: "1",
        width: sizePx,
        height: sizePx,
        minWidth: sizePx,
        minHeight: sizePx,
        backgroundSize: sizePx,
        backgroundPosition: 'center',
        backgroundImage: `url(https://${conf.assetsImgPath}${image})`,
        backgroundRepeat: 'no-repeat',
      }),
      content: Style.getContentBase({
        cursor
      }),
      animation: Style.getAnimationBase({
        transform: `scale( 1 ) translate3d( 0px, 0px, 0px )`,
      }),
    });
  }

  static getAndroid({app}, option = {}){
    option = {...Icon.defaultOption, ...option};
    const sizePx = option.sizePx ? option.sizePx : Icon.middleSize;
    const image = option.active ? "android.png" : "android_gray.png";
    const cursor = option.active ? "pointer" : "default";
    return Style.get({
      layout: Style.getLayoutBlock({
        flexGrow: "1",
        width: sizePx,
        height: sizePx,
        minWidth: sizePx,
        minHeight: sizePx,
        backgroundSize: sizePx,
        backgroundPosition: 'center',
        backgroundImage: `url(https://${conf.assetsImgPath}${image})`,
        backgroundRepeat: 'no-repeat',
      }),
      content: Style.getContentBase({
        cursor
      }),
      animation: Style.getAnimationBase({
        transform: `scale( 1 ) translate3d( 0px, 0px, 0px )`,
      }),
    });
  }

  static getHome({app}, option = {}){
    option = {...Icon.defaultOption, ...option};
    const sizePx = option.sizePx ? option.sizePx : Icon.middleSize;
    const image = option.active ? "home.png" : "home_gray.png";
    const cursor = option.active ? "pointer" : "default";
    return Style.get({
      layout: Style.getLayoutBlock({
        flexGrow: "1",
        width: sizePx,
        height: sizePx,
        minWidth: sizePx,
        minHeight: sizePx,
        backgroundSize: sizePx,
        backgroundPosition: 'center',
        backgroundImage: `url(https://${conf.assetsImgPath}${image})`,
        backgroundRepeat: 'no-repeat',
      }),
      content: Style.getContentBase({
        cursor
      }),
      animation: Style.getAnimationBase({
        transform: `scale( 1 ) translate3d( 0px, 0px, 0px )`,
      }),
    });
  }

  static getGraph({app}, option = {}){
    option = {...Icon.defaultOption, ...option};
    const sizePx = option.sizePx ? option.sizePx : Icon.middleSize;
    const image = option.active ? "graph.png" : "graph_gray.png";
    const cursor = option.active ? "pointer" : "default";
    return Style.get({
      layout: Style.getLayoutBlock({
        flexGrow: "1",
        width: sizePx,
        height: sizePx,
        minWidth: sizePx,
        minHeight: sizePx,
        backgroundSize: sizePx,
        backgroundPosition: 'center',
        backgroundImage: `url(https://${conf.assetsImgPath}${image})`,
        backgroundRepeat: 'no-repeat',
      }),
      content: Style.getContentBase({
        cursor
      }),
      animation: Style.getAnimationBase({
        transform: `scale( 1 ) translate3d( 0px, 0px, 0px )`,
      }),
    });
  }

  static getTalkn({app}, option = {}){
    option = {...Icon.defaultOption, ...option};
    const sizePx = option.sizePx ? option.sizePx : Icon.middleSize;
    const image = option.active ? "talkn.png" : "talkn.png";
    const cursor = option.active ? "pointer" : "default";
    return Style.get({
      layout: Style.getLayoutBlock({
        flexGrow: "1",
        width: sizePx,
        height: sizePx,
        minWidth: sizePx,
        minHeight: sizePx,
        backgroundSize: sizePx,
        backgroundPosition: 'center',
        backgroundImage: `url(https://${conf.assetsImgPath}${image})`,
        backgroundRepeat: 'no-repeat',
      }),
      content: Style.getContentBase({
        cursor
      }),
      animation: Style.getAnimationBase({
        transform: `scale( 1 ) translate3d( 0px, 0px, 0px )`,
      }),
    });
  }

  static getTalknLogo( {app} ){
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
    return {img};
  }

  static getChromeExtension({app}, option = {}){
    option = {...Icon.defaultOption, ...option};
    const sizeWidthPx = "100%";
    const sizeHeightPx = "60px";
    const image = option.active ? "chrome_extension.png" : "chrome_extension.png";
    const cursor = option.active ? "pointer" : "default";
    return Style.get({
      layout: Style.getLayoutBlock({
        flexGrow: "1",
        width: sizeWidthPx,
        minWidth: sizeWidthPx,
        height: "180px",
        minHeight: sizeHeightPx,
        backgroundColor: Container.reliefRGB,
        backgroundSize: "75%",
        backgroundPosition: 'center',
        backgroundImage: `url(https://${conf.assetsImgPath}${image})`,
        backgroundRepeat: 'no-repeat',
      }),
      content: Style.getContentBase({
        cursor
      }),
      animation: Style.getAnimationBase({
        transform: `scale( 1 ) translate3d( 0px, 0px, 0px )`,
      }),
    });
  }

  static getTag( {app} ){
    const div = Style.get({
      layout: Style.getLayoutInlineBlock({
        width: "30px",
        height: "30px"
      }),
      content: Style.getContentBase({
        cursor: "pointer"
      }),
      animation: Style.getAnimationBase({
        transform: 'scale( 1 )'
      }),
    });

    const left = Style.get({
      layout: Style.getLayoutInlineBlock({
        borderBottom: `2px solid ${Container.reliefRGB}`,
        borderLeft: `2px solid ${Container.reliefRGB}`,
        borderRadius: "0px",
        margin: "0 auto",
        width: "12px",
        height: "12px"
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: 'rotate(45deg) translate3d(5px, 5px, 0px)'
      }),
    });

    const right = Style.get({
      layout: Style.getLayoutInlineBlock({
        borderBottom: `2px solid ${Container.reliefRGB}`,
        borderLeft: `2px solid ${Container.reliefRGB}`,
        borderRadius: "0px",
        margin: "0 auto",
        width: "12px",
        height: "12px"
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: 'rotate(-135deg) translate3d(-6px, -4px, 0px)'
      }),
    });

    const bar = Style.get({
      layout: Style.getLayoutInlineBlock({
        background: Container.reliefRGB,
        width: "2px",
        height: "13px"
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: 'rotate(40deg) translate3d(-5px, 13px, 0px)'
      }),
    });
    return {div, left, right, bar};
  }

  static getHomeCss( {app} ){
    const div = Style.get({
      layout: Style.getLayoutInlineBlock({
        width: "30px",
        height: "30px"
      }),
      content: Style.getContentBase({
        cursor: "pointer"
      }),
      animation: Style.getAnimationBase({
        transform: 'scale( 1 )'
      }),
    });

    const leaf = Style.get({
      layout: Style.getLayoutInlineBlock({
        borderBottom: `2px solid ${Container.reliefRGB}`,
        borderLeft: `2px solid ${Container.reliefRGB}`,
        borderRadius: "0px",
        margin: "0 auto",
        width: "19px",
        height: "18px"
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: 'rotate(135deg) translate3d(5px, -3px, 0px)'
      }),
    });

    const base = Style.get({
      layout: Style.getLayoutInlineBlock({
        borderRight: `2px solid ${Container.reliefRGB}`,
        borderBottom: `2px solid ${Container.reliefRGB}`,
        borderLeft: `2px solid ${Container.reliefRGB}`, 
        borderRadius: "0px",
        margin: "0 auto",
        width: "20px",
        height: "12px"
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: 'translate3d(2px, -6px, 0px)'
      }),
    });

    const door = Style.get({
      layout: Style.getLayoutInlineBlock({
        background: `${Container.reliefRGB}`,
        width: "6px",
        height: "8px",
        margin: "0 auto",
        borderRadius: "5px 5px 0px 0px"
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: 'translate3d(-11px, -5px, 0px)'
      }),
    });

    return {div, leaf, door, base};
  } 

  static getSearch( {app} ){
    const div = Style.get({
      layout: Style.getLayoutInlineBlock({
        width: '45px',
        height: '45px',
        borderRadius: '100px'
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: 'scale( 1 )'
      }),
    });

    const circle = Style.get({
      layout: Style.getLayoutBlock({
        position: "absolute",
        top: "4px",
        left: "16px",
        margin: '7px auto',
        width: '18px',
        height: '18px',
        borderRadius: '100px',
        border: `3px solid ${Container.chromeOffTabRGB}`
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: `scale( 1 ) translate3d( 0px, 0px, 0px )`,
      }),
    });

    const bar = Style.get({
      layout: Style.getLayoutInlineBlock({
        position: "absolute",
        top: "23px",
        left: "13px",
        margin: '0 auto',
        background: Container.chromeOffTabRGB,
        width: '4px',
        height: '12px',
        borderRadius: '10px',
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transition: Container.getTransition( app ),
        transform: `scale(1) translate3d(0px, 0px, 0px) rotate(45deg)`,
      }),
    });
    return {div, circle, bar};
  }

  static getUser(){
    const div = Style.get({
      layout: Style.getLayoutInlineBlock({
        width: "22px",
        height: Icon.smallSize,
        margin: '2px'
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: 'scale( 1 )'
      }),
    });

    const top = Style.get({
      layout: Style.getLayoutBlock({
        margin: '0 auto',
        background: Container.reliefRGB,
        width: '12px',
        height: '12px',
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
        background: Container.reliefRGB,
        width: '8px',
        height: '12px',
        borderRadius: '6px',
        position: 'relative',
        top: '8px',
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
//        transition: Container.getTransition( app ),
        transform: `scale( 1 ) translate3d( 0px, 0px, 0px )`,
      }),
    });
    return {div, top, bottom};
  }

  static getHeaderUser(){
    const div = Style.get({
      layout: Style.getLayoutInlineBlock({
        width: "40px",
        height: "40px",
        margin: '5px'
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: 'scale( 1 )'
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
    return {div, top, bottom};
  }

  static getIndex(){

    const div = Style.get({
      layout: Style.getLayoutInlineBlock({
        width: "22px",
        height: Icon.smallSize,
        margin: '2px'
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: 'scale( 1 )'
      }),
    });

    const wrap = Style.get({
      layout: Style.getLayoutBlock({
        width: "22px",
        height: "22px",
        margin: '0 auto',
        borderRadius: '4px',
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase(),
    });

    const commonSpan = Style.get({
      layout: Style.getLayoutBlock({
        width: '16px',
        height: '2px',
        margin: '4px auto',
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
    return {div, wrap, top, middle, bottom};
  }

  static getLogs(){
    const div = Style.get({
      layout: Style.getLayoutInlineBlock({
        width: "22px",
        height: Icon.smallSize,
        margin: '2px'
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: 'scale( 1 )'
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
        width: '8px',
        height: '12px',
        borderRadius: '45px 30px 45px 45px',
        position: 'relative',
        left: "2px",
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
        width: '5px',
        height: '7px',
        borderRadius: '10px',
        position: 'relative',
        top: "-2px",
        left: "2px",
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
        left: "1px",
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
//        transition: Container.getTransition( app ),
        transform: `translate3d( 0px, -8px, 1000px )`,
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
        width: '10px',
        height: '20px',
        borderRadius: '30px 50px 40px 40px',
        position: 'relative',
        left: "-5px",
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
        width: '7px',
        height: '7px',
        borderRadius: '2px 2px 3px 3px',
        position: 'relative',
        left: '-5px',
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

    return {div, foot1, foot1Top, foot1Space, foot1Bottom, foot2, foot2Top, foot2Space, foot2Bottom};
  }

  static getSetting(){
    const div = Style.get({
      layout: Style.getLayoutInlineBlock({
        width: "22px",
        height: Icon.smallSize,
        margin: '2px'
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: 'scale( 1 )'
      }),
    });

    const commonWing = Style.get({
      layout: Style.getLayoutBlock({
        position: 'absolute',
        margin: '0 auto',
        background: Container.reliefRGB,
        width: '3px',
        height: '3px',
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
        transform: `translate3d(9.5px, 2px, 0px) rotate(0deg)`,
      }),
    });

    const wing2 = Style.get({
      layout: commonWing,
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: `translate3d( 15px, 4.5px, 0px ) rotate( 45deg )`,
      }),
    });

    const wing3 = Style.get({
      layout: commonWing,
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: `translate3d( 16.5px, 9px, 0px ) rotate( 90deg )`,
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
        transform: `translate3d( 10px, 17px, 0px ) rotate( 180deg )`,
      }),
    });

    const wing6 = Style.get({
      layout: commonWing,
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: `translate3d( 4px, 14.5px, 0px ) rotate( 225deg )`,
      }),
    });

    const wing7 = Style.get({
      layout: commonWing,
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: `translate3d( 2.5px, 9.5px, 0px ) rotate( 270deg )`,
      }),
    });

    const wing8 = Style.get({
      layout: commonWing,
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: `translate3d( 4px, 4.5px, 0px ) rotate( 315deg )`,
      }),
    });

    const circle = Style.get({
      layout: Style.getLayoutBlock({
        position: 'absolute',
        top: '3px',
        left: '4px',
        width: '14px',
        height: '14px',
        border: `3px solid ${Container.reliefRGB}`,
        borderRadius: '50px'
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: `translate3d( 0px, 1px, 0px )`,
      }),
    });
    return {div, wing1, wing2, wing3, wing4, wing5, wing6, wing7, wing8, circle};
  }

  static getThunder( { app } ){
    let borderColor = Container.reliefRGBA;
    if( App.isActiveMultistream( app ) ){
      borderColor = Container.themeRGBA;
    }

    const div = Style.get({
      layout: Style.getLayoutInlineBlock({
        width: "30px",
        height: "30px"
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transition: Container.transitionOff,
        transform: "rotate(0deg) translate(0px, 0px)",
      }),
    });

    const wrap = Style.get({
      layout: Style.getLayoutInlineBlock({
        borderRadius: "50px"
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transition: Container.transitionOff,
        transform: "rotate(90deg) translate3d(0px,0px,0px)",
      }),
    });

    const top = Style.get({
      layout: Style.getLayoutBlock({
        position: "relative",
        top: "0px",
        left: "0px",
        width: "0px",
        height: "0px",
        margin: "0 auto",

        borderWidth: "8px 8px 10px 8px",
        borderTopStyle: "solid",
        borderRightStyle: "solid",
        borderBottomStyle: "solid",
        borderLeftStyle: "solid",
        borderTopColor: "transparent",
        borderRightColor: "transparent",
        borderBottomColor: `${borderColor}`,
        borderLeftColor: "transparent",
        borderTopLeftRadius: "0px",
        borderTopRightRadius: "0px",
        borderBottomRightRadius: "0px",
        borderBottomLeftRadius: "0px"
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transition: Container.transitionOff,
        transform: "skew(60deg, 0deg) rotate(0deg) translate(-3px, -3px)"
      }),
    });

    const bottom = Style.get({
      layout: Style.getLayoutFlex({
        position: "relative",
        top: "0px",
        left: "0px",
        width: "0px",
        height: "0px",
        margin: "0 auto",
        borderWidth: "8px 8px 10px 8px",
        borderTopStyle: "solid",
        borderRightStyle: "solid",
        borderBottomStyle: "solid",
        borderLeftStyle: "solid",
        borderTopColor: `${borderColor}`,
        borderRightColor: "transparent",
        borderBottomColor: "transparent",
        borderLeftColor: "transparent",
        borderTopLeftRadius: "0px",
        borderTopRightRadius: "0px",
        borderBottomRightRadius: "0px",
        borderBottomLeftRadius: "0px"
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transition: Container.transitionOff,
        transform: "skew(60deg, 0deg) rotate(0deg) translate(15px, -3px)"
      }),
    });
    return {div, wrap, top, bottom};
  }

  static getPlay( { app } ){
    const bgColor = app.isOpenLinks ? Container.themeRGB : Container.reliefRGB;
    const div = Style.get({
      layout: Style.getLayoutFlex({
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",  
        width: "30px",
        height: "30px"
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transition: Container.transitionOff,
        transform: "translate(0px, 0px)",
      }),
    });

    const playCircleSize = "24px";
    const playCircle = Style.get({
      layout: Style.getLayoutInlineBlock({
        position: "absolute",
        top: "5px",
        width: playCircleSize,
        height: playCircleSize,
        minWidth: playCircleSize,
        minHeight: playCircleSize,
        border: `2px solid ${bgColor}`,
        borderRadius: "30px"
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transition: Container.transitionOff,
        transform: "translate3d(0px,0px,0px)",
      }),
    });

    const playTriangleSize = "6px";
    const playTriangle = Style.get({
      layout: Style.getLayoutInlineBlock({
        position: "relative",
        width: playTriangleSize,
        height: playTriangleSize,
        borderTop: `${playTriangleSize} solid transparent`,
        borderRight: `${playTriangleSize} solid transparent`,
        borderBottom: `${playTriangleSize} solid transparent`,
        borderLeft: `${playTriangleSize} solid ${bgColor}`
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transition: Container.transitionOff,
        transform: "translate3d(4px, 1.5px, 0px)",
      }),
    });
    return {div, playCircle, playTriangle};
  }

  static getLinks( { app } ){
    const bgColor = Container.themeRGB;

    const div = Style.get({
      layout: Style.getLayoutFlex({
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",  
        width: "30px",
        height: "30px"
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transition: Container.transitionOff,
        transform: "translate(0px, 0px)",
      }),
    });

    const blockWidth = "24px";
    const blockHeight = "14px";
    const linksA1 = Style.get({
      layout: Style.getLayoutInlineBlock({
        position: "absolute",
        top: "5px",
        left: "6px",
        width: blockWidth,
        height: blockHeight,
        border: `2px solid ${bgColor}`,
        borderRadius: "30px"
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transition: Container.transitionOff,
        transform: "translate3d(0px,0px,0px)",
      }),
    });

    const whiteSize = "4px";
    const linksA2 = Style.get({
      layout: Style.getLayoutInlineBlock({
        position: "relative",
        top: "5px",
        left: "5px",
        width: whiteSize,
        height: whiteSize,
        borderRadius: "10px",
        background: Container.whiteRGB,
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({}),
    });


    const linksB1 = Style.get({
      layout: Style.getLayoutInlineBlock({
        position: "absolute",
        top: "11px",
        left: "0px",
        width: blockWidth,
        height: blockHeight,
        border: `2px solid ${bgColor}`,
        borderRadius: "30px"
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transition: Container.transitionOff,
        transform: "translate3d(0px,0px,0px)",
      }),
    });

    const linksB2 = Style.get({
      layout: Style.getLayoutInlineBlock({
        position: "relative",
        top: "-5px",
        left: "-5px",
        width: whiteSize,
        height: whiteSize,
        borderRadius: "10px",
        background: Container.whiteRGB,
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({}),
    });
    return {div, linksA1, linksA2, linksB1, linksB2};
  }

  static getBubble( { app } ){
    const background = app.isBubblePost ?
      Container.themeRGB : Container.reliefRGBA;
    const div = Style.get({
      layout: Style.getLayoutFlex({
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",  
        width: "30px",
        height: "30px"
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transition: Container.transitionOff,
        transform: "translate(0px, 0px)",
      }),
    });

    const bubble = Style.get({
      layout: Style.getLayoutInlineBlock({
        position: "relative",
        top: "5px",
        width: "18px",
        height: "14px",
        background,
        borderRadius: "30px"
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transition: Container.transitionOff,
        transform: "translate3d(0px,0px,0px)",
      }),
    });

    const bubbleBar = Style.get({
      layout: Style.getLayoutInlineBlock({
        position: "relative",
        top: "5px",
        width: "5px",
        height: "10px",
        background,
        border: `3px solid ${background}`
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transition: Container.transitionOff,
        transform: "skew(30deg, 28deg) rotate(30deg) translate3d(-2px, -7px, 0px)",
      }),
    });
    return {div, bubble, bubbleBar};
  }

  static getDetail( {app} ){
    const div = Style.get({
      layout: Style.getLayoutBlock({
        width: '40px',
        height: '40px',
        borderRadius: '100px',
        margin: '1px auto',
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
      layout: {...commonSpan, width: '7px', margin: '5px 0px 0px 6px'},
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
        transition: Container.getTransition( app ),
        transform: `translate3d( 0px, 0px, 0px )`,
      }),
    });

    const bar4 = Style.get({
      layout: commonSpan,
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transition: Container.getTransition( app ),
        transform: `translate3d( 0px, 0px, 0px )`,
      }),
    });

    const mekuri = Style.get({
      layout: {...commonSpan,
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
    return {div, wrap, bar1, bar2, bar3, bar4, mekuri};
  }

  static getMenu( {app} ){
    const div = Style.get({
      layout: Style.getLayoutInlineBlock({
        width: '40px',
        height: '40px',
        margin: '4px auto',
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transition: Container.getTransition( app ),
      }),
    });

    const dot = Style.get({
      layout: Style.getLayoutBlock({
        width: '6px',
        height: '6px',
        margin: '4px auto',
        borderRadius: '6px',
        background: Container.calmRGB,
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase(),
    });
    return {div, dot};
  }

  static getHeadTabLeftTransform(){return Icon.getHeadTabLeftOpenTransform };
  static getHeadTabRightTransform(){return Icon.getHeadTabRightOpenTransform };
  static get getHeadTabLeftOpenTransform(){return 'rotate( 120deg ) translate3d(3px, 5px, 0px)'};
  static get getHeadTabRightOpenTransform(){return 'rotate( -120deg ) translate3d(-3px, 5px, 0px)'};
  static get getHeadTabLeftCloseTransform(){return 'rotate( 90deg ) translate3d(3px, 5px, 0px)'};
  static get getHeadTabRightCloseTransform(){return 'rotate( -90deg ) translate3d(-3px, 5px, 0px)'};
  static getHeadTab( {app} ){

    const commonLayout = Style.getLayoutInlineBlock({
      width: '4px',
      borderRadius: '10px',
      background: Container. calmRGB,
    });

    const div = Style.get({
      layout: Style.getLayoutBlock({
        width: "40px",
        height: '20px'
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase(),
    });

    const left = Style.get({
      layout: commonLayout,
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transition: Container.getTransition( app ),
        transform: Icon.getHeadTabLeftTransform(),
      }),
    });

    const right = Style.get({
      layout: commonLayout,
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transition: Container.getTransition( app ),
        transform: Icon.getHeadTabRightTransform(),
      }),
    });
    return {div,left,right};
  }

  static getHeart({app}){
    const color = app.openLockMenu === App.openLockMenuLabelShare ? Container.themeRGBA : Container.reliefRGB;
    const div = Style.get({
      layout: Style.getLayoutInlineBlock({
        width: Icon.smallSize,
        height: Icon.smallSize,
        margin: '2px'
      }),
      content: Style.getContentBase({}),
      animation: Style.getAnimationBase({

      }),
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
        transform: 'rotate(-45deg) translate3d(0px, 7px, 0px)',
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
        transform: 'rotate(-45deg) translate3d(11px, -1px, 0px)',
      }),
    });
    return {div, before, after};
  }


  static getShare({app}){
    const color = app.openLockMenu === App.openLockMenuLabelShare ? Container.themeRGBA : Container.reliefRGB;
    const div = Style.get({
      layout: Style.getLayoutInlineBlock({
        width: Icon.smallSize,
        height: Icon.smallSize,
        margin: '2px'
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
        borderRadius: "3px"
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: 'translate3d(-4px, -1px, 0px)',
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
        transform: 'translate3d(-4px, -1px, 0px)',
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
        transform: 'translate3d(-4px, 0px, 0px)',
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
        transform: 'translate3d(-4px, 0px, 0px)',
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
    return {div, base, whiteBar1, whiteBar2, bar, arrow};
  }

  static getMoney(){
    const div = Style.get({
      layout: Style.getLayoutInlineBlock({
        width: Icon.smallSize,
        height: Icon.smallSize,
        margin: '2px'
      }),
      content: Style.getContentBase({}),
      animation: Style.getAnimationBase({

      }),
    });

    const outer = Style.get({
      layout: Style.getLayoutBlock({
        margin: '0 auto',
        width: '22px',
        height: '22px',
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
        transform: 'translate3d(0px, 5px, 0px)',
      }),
    });
    return {div, outer, inner};
  }

  static getOpenEmoji( {app} ){
    const size = "5px";
    const div = Style.get({
      layout: Style.getLayoutInlineBlock({
        width: size,
        height: size,
        minWidth: size,
        minHeight: size,
        marginLeft: "5px",
        borderRight: `${size} solid transparent`,
        borderTop: `${size} solid transparent`,
        borderBottom: `${size} solid transparent`,
        borderLeft: `${size} solid rgba(200,200,200,0.8)`
      }),
      content: Style.getContentBase({

      }),
      animation: Style.getAnimationBase({
        transform: "translate3d( 5px, 0px, 0px )",
        transition: Container.getTransition( app ),
      }),
    });
    return {div};
  }

  static getCloseEmoji( {app} ){
    const size = "5px";
    const div = Style.get({
      layout: Style.getLayoutInlineBlock({
        width: size,
        height: size,
        minWidth: size,
        minHeight: size,
        borderRight: `${size} solid rgba(200,200,200,0.8)`,
        borderTop: `${size} solid transparent`,
        borderBottom: `${size} solid transparent`,
        borderLeft: `${size} solid transparent`
      }),
      content: Style.getContentBase({
      }),
      animation: Style.getAnimationBase({
        transform: "translate3d( 5px, 0px, 0px )",
        transition: Container.getTransition( app ),
      }),
    });
    return {div};
  }

  static getClose(){
    const div = Style.get({
      layout: Style.getLayoutInlineBlock({
        width: '26px',
        height: '26px',
        margin: '1px'
      }),
      content: Style.getContentBase({}),
      animation: Style.getAnimationBase({

      }),
    });

    const circle = Style.get({
      layout: Style.getLayoutBlock({
        position: "absolute",
        margin: '0 auto',
        width: '26px',
        height: '26px',
        border: `2px solid ${Container.calmRGB}`,
        borderRadius: '30px',
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: 'translate3d(0px, 0px, 0px) rotate(0deg)',
      }),
    });

    const bar1 = Style.get({
      layout: Style.getLayoutBlock({
        position: "absolute",
        margin: '0 auto',
        width: '2px',
        height: '18px',
        background: Container.calmRGBA,
        borderRadius: '2px',
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: 'translate3d(10px, 2px, 0px) rotate(45deg)',
      }),
    });

    const bar2 = Style.get({
      layout: Style.getLayoutBlock({
        position: "absolute",
        margin: '0 auto',
        width: '2px',
        height: '18px',
        background: Container.calmRGBA,
        borderRadius: '2px',
      }),
      content: Style.getContentBase({}),
      animation: Style.getAnimationBase({
        transform: 'translate3d(10px, 2px, 0px) rotate(-45deg)',
      }),
    });
    return {div, circle, bar1, bar2};
  }

  static getCh(){
    const color = Container.lightGrayRGB;
    const div = Style.get({
      layout: Style.getLayoutFlex({
        width: "44px",
        height: "44px"
      }),
      content: Style.getContentBase({
        cursor: "pointer"
      }),
      animation: Style.getAnimationBase({}),
    });

    const circle1 = Style.get({
      layout: Style.getLayoutFlex({
        position: "absolute",
        top: "0px",
        width: "inherit",
        height: "inherit",
        border: `2px solid ${ color }`,
        borderRadius: "30px"
      }),
      content: {},
      animation: {},
    });

    const circle2 = Style.get({
      layout: Style.getLayoutFlex({
        width: "75%",
        height: "75%",
        border: `2px solid ${ color }`,
        borderRadius: "30px"
      }),
      content: Style.getContentBase({
        cursor: "pointer"
      }),
      animation: Style.getAnimationBase({}),
    });

    const str = Style.get({
      layout: Style.getLayoutFlex({
        width: "inherit",
        height: "inherit",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "30px"
      }),
      content: Style.getContentBase({
        lineHeight: 2,
        color,
        fontSize: "10px"
      }),
      animation: Style.getAnimationBase({}),
    });

    const commonShadowLayout = {
      width: "24px",
      height: "24px",
      background: Container.lightRGB,
      position: "absolute",
      zIndex: 10
    };

    const shadow1 = Style.get({
      layout: {...commonShadowLayout, top: "-4px"},
      content: {},
      animation: {
        transform: "rotate(45deg) scale3d(1, 1, 1) skew(-57deg, -57deg)"
      }
     });

     const shadow2 = Style.get({
      layout: {...commonShadowLayout, top: "24px"},
      content: {},
      animation: {
        transform: "rotate(45deg) scale3d(1, 1, 1) skew(-57deg, -57deg)"
      }
     });

    return {div, circle1, circle2, str, shadow1, shadow2};
  }

  static getUpdate({app}){
    const color = Container.whiteRGB;
    const div = Style.get({
      layout: Style.getLayoutFlex({
        width: Icon.middleSize,
        height: Icon.middleSize
      }),
      content: Style.getContentBase({
        cursor: "pointer"
      }),
      animation: Style.getAnimationBase({
        transform: "scale( 0.75)"
      }),
    });

    const circle = Style.get({
      layout: Style.getLayoutBase({
        width: '55%',
        height: '55%',
        borderRadius: '30px',
        border: `2px solid ${color}`,
        overflow: "visible"
      }),
      content: Style.getContentBase({
        cursor: "pointer"
      }),
      animation: Style.getAnimationBase({
      }),
    });

    const bar = Style.get({
      layout: Style.getLayoutBase({
        position: "relative",
        top: "1px",
        left: "12px",
        width: '8px',
        height: '8px',
        background: "none",
        borderTop: `0px solid ${Container.themeRGB}`,
        borderRight: `2px solid ${color}`,
        borderBottom: `2px solid ${color}`,
        borderLeft: `0px solid ${Container.themeRGB}`
      }),
      content: Style.getContentBase({
        cursor: "pointer"
      }),
      animation: Style.getAnimationBase({
        transform: 'rotate(25deg)',
      }),
    });

    const white = Style.get({
      layout: Style.getLayoutBase({
        position: "relative",
        top: "2px",
        left: "12px",
        width: '10px',
        height: '4px',
        background: "rgba(100, 192, 170, 1)"
      }),
      content: Style.getContentBase({
        cursor: "pointer"
      }),
      animation: Style.getAnimationBase({
        transform: 'rotate(25deg)',
      }),
    });
    return {div, circle, bar, white};
  }
}
