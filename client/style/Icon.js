import Style from './index';
import Container from './Container';
import conf from '../conf';
import User from '~/common/schemas/state/User'

export default class Icon {

  static get defaultSize(){ return 28 };

  constructor( params ){
    const bootOption = {...params.bootOption, ...params.app};
    const headTab = Icon.getHeadTab( params );
    const menu = Icon.getMenu( params );
    const talknLogo = Icon.getTalknLogo( params );
    const user = Icon.getUser( params );
    const tag = Icon.getTag( params );
    const home = Icon.getHome( params );
    const search = Icon.getSearch( params );
    const index = Icon.getIndex( params );
    const logs = Icon.getLogs( params );
    const setting = Icon.getSetting( params );
    const thunder = Icon.getThunder( params );
    const detail = Icon.getDetail( params );
    const heart = Icon.getHeart( params );
    const share = Icon.getShare( params );
    const money = Icon.getMoney( params );
    return {
      headTab,
      menu,
      talknLogo,
      user,
      search,
      tag,
      home,
      index,
      logs,
      setting,
      thunder,
      detail,
      heart,
      share,
      money,
    }
  }

  static getTwitter(){
    return Style.get({
      layout: Style.getLayoutBlock({
        flexGrow: "1",
        width: "60px",
        height: Icon.defaultSize + "px",
        maxWidth: "60px",
        maxHeight: Icon.defaultSize + "px",
        backgroundImage: `url(//${conf.assetsImgPath}twitter.png)`,
        backgroundPosition: 'center center',
        backgroundSize: "26px",
        backgroundRepeat: 'no-repeat',
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: `scale( 1 ) translate3d( 0px, 0px, 0px )`,
      }),
    });
  }

  static getFacebook(){
    return Style.get({
      layout: Style.getLayoutBlock({
        flexGrow: "1",
        width: "60px",
        height: Icon.defaultSize + "px",
        maxWidth: "60px",
        maxHeight: Icon.defaultSize + "px",
        backgroundImage: `url(//${conf.assetsImgPath}facebook.png)`,
        backgroundPosition: 'center center',
        backgroundSize: "26px",
        backgroundRepeat: 'no-repeat',
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: `scale( 1 ) translate3d( 0px, 0px, 0px )`,
      }),
    });
  }

  static getTalkn(){
    return Style.get({
      layout: Style.getLayoutBlock({
        flexGrow: "1",
        width: "60px",
        height: Icon.defaultSize + "px",
        maxWidth: "60px",
        maxHeight: Icon.defaultSize + "px",
        backgroundImage: `url(//${conf.assetsImgPath}talkn.png)`,
        backgroundPosition: 'center center',
        backgroundSize: "34px",
        backgroundRepeat: 'no-repeat',
      }),
      content: Style.getContentBase(),
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

  static getHome( {app} ){
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
      layout: Style.getLayoutInlineBlock({
        margin: '6px auto',
        width: '22px',
        height: '22px',
        borderRadius: '100px',
        border: `4px solid ${Container.calmRGB}`,
        borderWidth: '4px',
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: `scale( 1 ) translate3d( 5px, 2px, 0px )`,
      }),
    });

    const bar = Style.get({
      layout: Style.getLayoutInlineBlock({
        margin: '0 auto',
        background: Container.calmRGB,
        width: '5px',
        height: '14px',
        borderRadius: '10px',
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transition: Container.getTransition( app ),
        transform: `scale(1) translate3d(-20px, 12px, 0px) rotate(45deg)`,
      }),
    });
    return {div, circle, bar};
  }

  static getUser(){
    const div = Style.get({
      layout: Style.getLayoutInlineBlock({
        width: '26px',
        height: '26px',
        margin: '1px'
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
        width: '14px',
        height: '14px',
        borderRadius: '10px',
        position: 'relative',
        top: '-17px',
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
        width: '12px',
        height: '16px',
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

  static getIndex(){

    const div = Style.get({
      layout: Style.getLayoutInlineBlock({
        width: '26px',
        height: '26px',
        margin: '1px'
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: 'scale( 1 )'
      }),
    });

    const wrap = Style.get({
      layout: Style.getLayoutBlock({
        width: '26px',
        height: '26px',
        margin: '0 auto',
        borderRadius: '4px',
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase(),
    });

    const commonSpan = Style.get({
      layout: Style.getLayoutBlock({
        width: '20px',
        height: '3px',
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
        width: '26px',
        height: '26px',
        margin: '1px'
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
        left: '-4px',
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
        height: '15px',
        borderRadius: '45px 30px 45px 45px',
        position: 'relative',
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
        width: '7px',
        height: '7px',
        borderRadius: '10px',
        position: 'relative',
        top: "-1px",
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
        left: '2px',
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
        width: '13px',
        height: '23px',
        borderRadius: '30px 50px 40px 40px',
        position: 'relative',
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
        width: '10px',
        height: '10px',
        borderRadius: '10px',
        position: 'relative',
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
        transform: `translate3d( 0px, -13px, 1000px )`,
      }),
    });

    return {div, foot1, foot1Top, foot1Space, foot1Bottom, foot2, foot2Top, foot2Space, foot2Bottom};
  }

  static getSetting(){
    const div = Style.get({
      layout: Style.getLayoutInlineBlock({
        width: '26px',
        height: '26px',
        margin: '1px'

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
        transform: `translate3d(11.5px, 3px, 0px) rotate(0deg)`,
      }),
    });

    const wing2 = Style.get({
      layout: commonWing,
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: `translate3d( 18px, 6px, 0px ) rotate( 45deg )`,
      }),
    });

    const wing3 = Style.get({
      layout: commonWing,
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: `translate3d( 20px, 11px, 0px ) rotate( 90deg )`,
      }),
    });

    const wing4 = Style.get({
      layout: commonWing,
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: `translate3d( 18px, 17px, 0px ) rotate( 125deg )`,
      }),
    });

    const wing5 = Style.get({
      layout: commonWing,
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: `translate3d( 11.5px, 20px, 0px ) rotate( 180deg )`,
      }),
    });

    const wing6 = Style.get({
      layout: commonWing,
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: `translate3d( 5px, 17.5px, 0px ) rotate( 225deg )`,
      }),
    });

    const wing7 = Style.get({
      layout: commonWing,
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: `translate3d( 3px, 11.5px, 0px ) rotate( 270deg )`,
      }),
    });

    const wing8 = Style.get({
      layout: commonWing,
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: `translate3d( 5px, 5.5px, 0px ) rotate( 315deg )`,
      }),
    });

    const circle = Style.get({
      layout: Style.getLayoutBlock({
        position: 'absolute',
        top: '3px',
        left: '5px',
        width: '16px',
        height: '16px',
        border: `3px solid ${Container.reliefRGB}`,
        borderRadius: '50px'
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: `translate3d( 0px, 2px, 0px )`,
      }),
    });
    return {div, wing1, wing2, wing3, wing4, wing5, wing6, wing7, wing8, circle};
  }

  static getThunder( { app, user } ){
    const borderColor = user.dispThreadType ===  User.dispThreadTypeMulti ?
      Container.themeRGB : Container.reliefRGBA;

    const div = Style.get({
      layout: Style.getLayoutInlineBlock({
        width: "50px",
        height: "50px",
        borderRadius: "50px"
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
        transform: "rotate(90deg) translate3d(-2px,8px,0px)",
      }),
    });

    const top = Style.get({
      layout: Style.getLayoutBlock({
        position: "relative",
        top: "0px",
        left: "-10px",
        width: "0px",
        height: "0px",
        margin: "0 auto",
        borderTop: "8px solid transparent",
        borderRight: "8px solid transparent",
        borderBottom: `10px solid ${borderColor}`,
        borderLeft: "8px solid transparent",
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transition: Container.transitionOff,
        transform: "skew(60deg, 0deg) rotate(0deg) translate(0px, 0px)"
      }),
    });

    const bottom = Style.get({
      layout: Style.getLayoutBlock({
        position: "relative",
        top: "0px",
        left: "10px",
        width: "0px",
        height: "0px",
        margin: "0 auto",
        borderBottom: "8px solid transparent",
        borderRight: "8px solid transparent",
        borderTop: `10px solid ${borderColor}`,
        borderLeft: "8px solid transparent",
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transition: Container.transitionOff,
        transform: "skew(60deg, 0deg) rotate(0deg) translate(0px, 0px)"
      }),
    });
    return {div, wrap, top, bottom};
  }

  static getDetail( {app} ){

    const div = Style.get({
      layout: Style.getLayoutBlock({
        width: '40px',
        height: '40px',
        borderRadius: '100px',
        margin: '4px auto',
        cursor: 'default',
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
      height: '20px',
      borderRadius: '10px',
      background: Container. calmRGB,
    });

    const div = Style.get({
      layout: Style.getLayoutBlock({
        width: "100%"
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase(),
    });

    const left = Style.get({
      layout: commonLayout,
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transition: Container.getTransition( app ),
        transform: Icon.getHeadTabLeftTransform( app.isOpenMain ),
      }),
    });

    const right = Style.get({
      layout: commonLayout,
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transition: Container.getTransition( app ),
        transform: Icon.getHeadTabRightTransform( app.isOpenMain ),
      }),
    });
    return {div,left,right};
  }

  static getHeart(){

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


  static getShare(){

    const div = Style.get({
      layout: Style.getLayoutInlineBlock({
        width: '26px',
        height: '26px',
        margin: '1px'
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
        border: `2px solid ${Container.reliefRGB}`,
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
        background: Container.reliefRGB,
      }),
      content: Style.getContentBase({}),
      animation: Style.getAnimationBase({
        transform: 'translate3d(-4px, -1px, 0px)',
      }),
    });

    const whiteBar1 = Style.get({
      layout: Style.getLayoutInlineBlock({
        position: 'absolute',
        width: '2px',
        height: '4px',
        top: '10px',
        left: '14px',
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
        width: '2px',
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
        borderTop: `2px solid ${Container.reliefRGB}`,
        borderRight: `2px solid ${Container.reliefRGB}`,
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
        width: '26px',
        height: '26px',
        margin: '1px'
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
}
