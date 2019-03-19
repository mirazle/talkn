import define from '../../common/define';
import Style from './index';

export default class Container{
  constructor( params ){
    const self = Container.getSelf( params );
    return {
      self,
    }
  }

  static get width(){ return '100%' };
  static get radius(){ return '7px' };
  static get radiuses(){ return `${Container.radius} ${Container.radius} 0px 0px` };
  static get openHeight(){ return 360 };
  static get closeHeight(){ return 360 };
  static get threadHeight(){ return 360 };
  static get maxZIndex(){ return 2147483647 };

  static get openBottom(){ return Container.footerHeight };
  static get closeBottom(){ return 0 };
  static get merginRatio(){ return 0.034 };
  static get notifOpenTranslate(){ return 25 };
  static get notifHeight(){ return 25 };

  static get borderRGB(){ return Style.mono220RGB };
  static get border(){ return `1px solid ${Container.borderRGB}` };
  static get shadow(){ return `${Style.mono230RGB} 0px 0px 5px 0px` };

  static get reliefRGB(){ return Style.mono180RGB };
  static get reliefRGBA(){ return Style.mono180RGBA };
  static get silverRGB(){ return Style.mono192RGB };
  static get silverRGBA(){ return Style.mono192RGBA };
  static get lightGrayRGB(){ return Style.mono211RGB };
  static get lightGrayRGBA(){ return Style.mono211RGBA };
  static get chromeOffTabRGB(){ return Style.mono225RGB };
  static get chromeOffTabRGBA(){ return Style.mono225RGBA };
  static get calmRGB(){ return Style.mono240RGB };
  static get calmRGBA(){ return Style.mono240RGBA };
  static get lightRGB(){ return Style.mono245RGB };
  static get lightRGBA(){ return Style.mono245RGBA };
  static get offWhiteRGB(){ return Style.mono250RGB };
  static get offWhiteRGBA(){ return Style.mono250RGBA };
  static get offWhitePlusRGB(){ return Style.mono252RGB };
  static get offWhitePlusRGBA(){ return Style.mono252RGBA };
  static get whiteRGB(){ return Style.mono255RGB };
  static get whiteRGBA(){ return Style.mono255RGBA };

  static get fontBaseRGB(){ return Style.fontBaseRGB };
  static get themeRGBString(){ return '79, 174, 159' };
  static get themeRGB(){ return `rgb(${Container.themeRGBString})` };
  static get themeRGBA(){ return `rgba(${Container.themeRGBString}, 0.8)` };
  static getThemeRGBA(alpha = 0.8){ return `rgba(${Container.themeRGBString}, ${alpha})` };
  static getTransitionOn( app = {}, removeUnit = false ){
    let transition = Container.transitionOn;
    if( app ){
      transition =  app.isTransition ? `${ Container.transitionOn }ms` : `${ Container.transitionOff }ms`;
    }else{
      transition = `${ Container.transitionOn }ms`;
    }

    return removeUnit ? Style.trimUnit( transition ) : transition ;
  };
  static getTransition( app = {}, addUnit = false ){
    const transition = app.isTransition ? `${ Container.transitionOn }ms` : `${ Container.transitionOff }ms`;
    return addUnit ? Style.trimUnit( transition ) : transition ;
  };
  static getTransitionFirstOn( app, addUnit = false ){
    const transition = app.isTransition ? `${ Container.transitionFirstOn }ms` : `${ Container.transitionOff }ms`;
    return addUnit ? Style.trimUnit( transition ) : transition ;
  };
  static get transitionOn(){ return 600 };
  static get transitionNotif(){ return 300 };
  static get transitionNotifDisp(){ return 3000 };
  static get transitionFirstOn(){ return 200 };
  static get transitionOff(){ return 0 };

  static getWidthPx( {bootOption, app} ){
    if( bootOption ){
      return bootOption.width ?
        bootOption.width :
        Container.width;
    }else{
      return app.width;
    }
  }

  static getRightPx( {app}, widthPx ){
    switch( app.type ){
    case define.APP_TYPES.PORTSL:
    case define.APP_TYPES.EXTENSION:
      return '0%';
    default :
      if( widthPx === '100%' ){
        return '0%';
      }else if( widthPx === '100vw' ){
        return '0vw';
      }else{
        return '10px';
      }
    }
  }

  static getSelf( params ){
    const { app, bootOption } = params;
    let borderRadius = "0px";
    if( bootOption && bootOption["border-radius"] ){
      borderRadius = bootOption["border-radius"];
    }else{
      if( borderRadius === "0px" && app.iframe ){
        borderRadius = "3px";
      }
    }

    const layout = Style.getLayoutFlex({
      width: 'inherit',
      height: 'inherit',
      overflow: "auto",
      borderRadius
    });
    const content = Style.getContentBase({});
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }
}
