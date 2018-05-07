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
    const detail = Icon.getDetail( params );
    const heart = Icon.getHeart( params );
    const share = Icon.getShare( params );
    const money = Icon.getMoney( params );
    return {
      headTab,
      menu,
      talknLogo,
      user,
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
        transform: `scale(0.8) translate3d( 0px, 0px, 0px )`,
      }),
    });
    return {img};
  }

  static getUser( {app} ){
    const border = {...Container.border, }
    const div = Style.get({
      layout: Style.getLayoutInlineBlock({
        width: Icon.defaultSize,
        height: Icon.defaultSize,
        borderRadius: '100px'
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase(),
    });

    const top = Style.get({
      layout: Style.getLayoutBlock({
        margin: '0 auto',
        background: Container.calmRGB,
        width: '10px',
        height: '10px',
        borderRadius: '10px',
        position: 'relative',
        top: '1px',
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: `scale(0.8) translate3d( 0px, 0px, 0px )`,
      }),
    });

    const bottom = Style.get({
      layout: Style.getLayoutBlock({
        margin: '0 auto',
        background: Container.calmRGB,
        width: '16px',
        height: '30px',
        borderRadius: '30px',
        position: 'relative',
        top: '-1px',
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transition: Container.getTransitionOn( app ),
        transform: `scale(0.8) translate3d( 0px, 0px, 0px )`,
      }),
    });
    return {div, top, bottom};
  }

  static getDetail( {app} ){
    const border = {...Container.border, }
    const div = Style.get({
      layout: Style.getLayoutInlineBlock({
        width: Icon.defaultSize,
        height: Icon.defaultSize,
        borderRadius: '50px',
        paddingTop: '1px',
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase(),
    });

    const commonSpan = Style.get({
      layout: Style.getLayoutBlock({
        width: '20px',
        height: '3px',
        margin: '4px auto 3px',
        borderRadius: '6px',
        background: Container.calmRGB,
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
    return {div, top, middle, bottom};
  }

  static getMenu( {app} ){
    const div = Style.get({
      layout: Style.getLayoutInlineBlock({
        position: 'absolute',
        left: '15%',
        width: '45px',
        height: '45px',
        margin: '0 auto',
        boxShadow: '0px 0px 0px rgb(240, 240, 240) inset',
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
        margin: '6px auto',
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
