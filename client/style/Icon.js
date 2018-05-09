import Style from './index';
import Container from './Container';
import conf from '../conf';

export default class Icon {

  static get defaultSize(){ return 28 };

  constructor( params ){
    const bootOption = {...params.bootOption, ...params.app};
    const headTab = Icon.getHeadTab( params );
    const menu = Icon.getMenu( params );
    const talknLogo = Icon.getTalknLogo( params );
    const user = Icon.getUser( params );
    const index = Icon.getIndex( params );
    const footSteps = Icon.getFootSteps( params );
    const setting = Icon.getSetting( params );
    const detail = Icon.getDetail( params );
    const heart = Icon.getHeart( params );
    const share = Icon.getShare( params );
    const money = Icon.getMoney( params );
    return {
      headTab,
      menu,
      talknLogo,
      user,
      index,
      footSteps,
      setting,
      detail,
      heart,
      share,
      money,
    }
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

  static getUser( {app} ){
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

    const top = Style.get({
      layout: Style.getLayoutBlock({
        margin: '0 auto',
        background: Container.reliefRGB,
        width: '14px',
        height: '14px',
        borderRadius: '10px',
        position: 'relative',
        top: '-16px',
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
        width: '14px',
        height: '20px',
        borderRadius: '30px',
        position: 'relative',
        top: '15px',
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transition: Container.getTransitionOn( app ),
        transform: `scale( 1 ) translate3d( 0px, 0px, 0px )`,
      }),
    });
    return {div, top, bottom};
  }

  static getIndex( {app} ){

    const div = Style.get({
      layout: Style.getLayoutBlock({
        width: '45px',
        height: '45px',
        borderRadius: '100px',
        margin: '0 auto',
        cursor: 'default',
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: 'scale( 1 )'
      }),
    });

    const wrap = Style.get({
      layout: Style.getLayoutBlock({
        width: '28px',
        height: '30px',
        margin: '8px auto',
        borderRadius: '4px',
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase(),
    });

    const commonSpan = Style.get({
      layout: Style.getLayoutBlock({
        width: '22px',
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
        transition: Container.getTransitionOn( app ),
        transform: `translate3d( 0px, 0px, 0px )`,
      }),
    });
    return {div, wrap, top, middle, bottom};
  }

  static getFootSteps( {app} ){
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

    const foot1 = Style.get({
      layout: Style.getLayoutInlineBlock({
        position: 'absolute',
        top: '7px',
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
        width: '10px',
        height: '20px',
        borderRadius: '45px 30px 45px 45px',
        position: 'relative',
        zIndex: '0',
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transition: Container.getTransitionOn( app ),
        transform: `translate3d( 0px, 0px, 0px )`,
      }),
    });

    const foot1Bottom = Style.get({
      layout: Style.getLayoutBlock({
        margin: '0 auto',
        background: Container.reliefRGB,
        width: '8px',
        height: '8px',
        borderRadius: '10px',
        position: 'relative',
        zIndex: '0',
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: `translate3d( 0px, 0px, 0px )`,
      }),
    });

    const foot1Space = Style.get({
      layout: Style.getLayoutBlock({
        width: '18px',
        height: '2px',
        background: Container.offWhiteRGB,
        margin: '0 auto',
        zIndex: '1000',
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transition: Container.getTransitionOn( app ),
        transform: `translate3d( 0px, -9px, 1000px )`,
      }),
    });

    const foot2 = Style.get({
      layout: Style.getLayoutInlineBlock({
        position: 'absolute',
        top: '2px',
        left: '8px',
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
        width: '14px',
        height: '24px',
        borderRadius: '30px 50px 40px 40px',
        position: 'relative',
        zIndex: '0',
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transition: Container.getTransitionOn( app ),
        transform: `translate3d( 0px, 0px, 0px )`,
      }),
    });

    const foot2Bottom = Style.get({
      layout: Style.getLayoutBlock({
        margin: '0 auto',
        background: Container.reliefRGB,
        width: '11px',
        height: '11px',
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
        transition: Container.getTransitionOn( app ),
        transform: `translate3d( 0px, -13px, 1000px )`,
      }),
    });

    return {div, foot1, foot1Top, foot1Space, foot1Bottom, foot2, foot2Top, foot2Space, foot2Bottom};
  }

  static getSetting( {app} ){
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

    const commonWing = Style.get({
      layout: Style.getLayoutBlock({
        position: 'absolute',
        margin: '0 auto',
        background: Container.reliefRGB,
        width: '5px',
        height: '5px',
        borderRadius: '2px',
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
        transform: `translate3d( 19px, 8px, 0px ) rotate( 0deg )`,
      }),
    });

    const wing2 = Style.get({
      layout: commonWing,
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: `translate3d( 28px, 12px, 0px ) rotate( 45deg )`,
      }),
    });

    const wing3 = Style.get({
      layout: commonWing,
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: `translate3d( 31px, 19px, 0px ) rotate( 90deg )`,
      }),
    });

    const wing4 = Style.get({
      layout: commonWing,
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: `translate3d( 28px, 27px, 0px ) rotate( 125deg )`,
      }),
    });

    const wing5 = Style.get({
      layout: commonWing,
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: `translate3d( 20px, 31px, 0px ) rotate( 180deg )`,
      }),
    });

    const wing6 = Style.get({
      layout: commonWing,
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: `translate3d( 11px, 27px, 0px ) rotate( 225deg )`,
      }),
    });

    const wing7 = Style.get({
      layout: commonWing,
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: `translate3d( 8px, 19px, 0px ) rotate( 270deg )`,
      }),
    });

    const wing8 = Style.get({
      layout: commonWing,
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: `translate3d( 11px, 11px, 0px ) rotate( 315deg )`,
      }),
    });

    const circle = Style.get({
      layout: Style.getLayoutBlock({
        position: 'absolute',
        top: '9px',
        left: '11px',
        width: '22px',
        height: '22px',
        border: `5px solid ${Container.reliefRGB}`,
        borderRadius: '50px'
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: `translate3d( 0px, 2px, 0px )`,
      }),
    });
    return {div, wing1, wing2, wing3, wing4, wing5, wing6, wing7, wing8, circle};
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
        width: '16px',
        height: '2px',
        margin: '5px auto',
        borderRadius: '6px',
        background: Container.whiteRGB,
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase(),
    });

    const top = Style.get({
      layout: {...commonSpan, width: '8px', margin: '5px 0px 0px 5px'},
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
        transition: Container.getTransitionOn( app ),
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
        transform: `translate3d(18px, -6px, 0px) rotate( 90deg )`,
      }),
    });
    return {div, wrap, top, middle, bottom, mekuri};
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
        transition: Container.getTransitionOn( app ),
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

  static getHeadTabLeftTransform( isOpenMain ){return isOpenMain ? Icon.getHeadTabLeftOpenTransform : Icon.getHeadTabLeftCloseTransform};
  static getHeadTabRightTransform( isOpenMain ){return isOpenMain ? Icon.getHeadTabRightOpenTransform : Icon.getHeadTabRightCloseTransform};
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
      layout: Style.getLayoutBlock(),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase(),
    });

    const left = Style.get({
      layout: commonLayout,
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transition: Container.getTransitionOn( app ),
        transform: Icon.getHeadTabLeftTransform( app.isOpenMain ),
      }),
    });

    const right = Style.get({
      layout: commonLayout,
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transition: Container.getTransitionOn( app ),
        transform: Icon.getHeadTabRightTransform( app.isOpenMain ),
      }),
    });
    return {div,left,right};
  }

  static getHeart(){

    const div = Style.get({
      layout: Style.getLayoutInlineBlock({
        width: '30px',
        height: '30px',
      }),
      content: Style.getContentBase({}),
      animation: Style.getAnimationBase({

      }),
    });

    const before = Style.get({
      layout: Style.getLayoutBase({
        width: '10px',
        height: '18px',
        borderRadius: '10px 10px 0 0',
        background: Container.reliefRGB,
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: 'rotate(-45deg) translate3d(1px, 8px, 0px)',
      }),
    });

    const after = Style.get({
      layout: Style.getLayoutBase({
        width: '18px',
        height: '10px',
        borderRadius: '0 10px 10px 0',
        background: Container.reliefRGB,
      }),
      content: Style.getContentBase({}),
      animation: Style.getAnimationBase({
        transform: 'rotate(-45deg) translate3d(13px, 0px, 0px)',
      }),
    });
    return {div, before, after};
  }


  static getShare(){

    const div = Style.get({
      layout: Style.getLayoutInlineBlock({
        width: '30px',
        height: '30px',
        margin: '0 auto',
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
        height: '15px',
        margin: '0 auto',
        border: `2px solid ${Container.reliefRGB}`,
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: 'translate3d(-2px, 0px, 0px)',
      }),
    });

    const bar = Style.get({
      layout: Style.getLayoutInlineBlock({
        position: 'absolute',
        top: '6px',
        left: '16px',
        width: '2px',
        height: '12px',
        margin: '0 auto',
        background: Container.reliefRGB,
      }),
      content: Style.getContentBase({}),
      animation: Style.getAnimationBase({
        transform: 'translate3d(-2px, 0px, 0px)',
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
        transform: 'translate3d(-2px, 0px, 0px)',
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
        transform: 'translate3d(-2px, 0px, 0px)',
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
        transform: 'translate3d(-2px, 0px, 0px) rotate( -45deg)',
      }),
    });
    return {div, base, whiteBar1, whiteBar2, bar, arrow};
  }

  static getMoney(){

    const div = Style.get({
      layout: Style.getLayoutBlock({
        margin: '0 auto',
        width: '30px',
        height: '30px',
      }),
      content: Style.getContentBase({}),
      animation: Style.getAnimationBase({

      }),
    });

    const outer = Style.get({
      layout: Style.getLayoutBlock({
        margin: '0 auto',
        width: '24px',
        height: '24px',
        borderRadius: '24px',
        border: `2px solid ${Container.reliefRGB}`,
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: 'translate3d(-2px, 3px, 0px)',
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
        transform: 'translate3d(0px, 6px, 0px)',
      }),
    });
    return {div, outer, inner};
  }
}
