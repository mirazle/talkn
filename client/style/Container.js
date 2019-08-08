import App from '../../common/schemas/state/App';
import Style from './index';
import Header from './Header';
import DetailRight from './DetailRight';
import Menu from './Menu';
import Footer from './Footer';

export default class Container{
  constructor( params ){
    const self = Container.getSelf( params );
    const multistreamIconWrap = Container.getMultistreamIconWrap( params );
    const newPost = Container.getNewPost( params );
    const hideScreenBottom =  Container.getHideScreenBottom( params );
    const linkLabel = Container.getLinkLabel( params );
    return {
      self,
      multistreamIconWrap,
      newPost,
      hideScreenBottom,
      linkLabel
    }
  }

  static get width(){ return '100%' };
  static get widthRatio(){ return 0.94 };

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
  static get darkRGB(){ return Style.darkRGB };
  static get darkRGBA(){ return Style.darkRGBA };

  static get reliefRGB(){ return Style.mono180RGB };
  static get reliefRGBA(){ return Style.mono180RGBA };
  static get silverRGB(){ return Style.mono192RGB };
  static get silverRGBA(){ return Style.mono192RGBA };
  static get lightGrayRGB(){ return Style.mono211RGB };
  static get lightGrayRGBA(){ return Style.mono211RGBA };
  static get chromeOffTabRGB(){ return Style.mono225RGB };
  static get chromeOffTabRGBA(){ return Style.mono225RGBA };
  static get softCalmRGB(){ return Style.mono230RGB };
  static get softCalmRGBA(){ return Style.mono230RGBA };
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
  static get transitionFirstOn(){ return 300 };
  static get transitionOff(){ return 0 };

  static get notifHeight(){ return 20 };
  static get notifOpenTranslate(){ return 20 };
  static get notifHeight(){ return 20 };
  static get notifOpenTranslateY(){
    return `translate3d( 0px, -80px, 0px )`;
  }

  static get notifCloseTranslateY(){ return `translate3d( 0px, 0px, 0px )`; }
  static getNotifTranslateY( app ){
    return app.isOpenNewPost ?
      Container.notifOpenTranslateY : Container.notifCloseTranslateY;
  }

  static getNewPostDisplay(app){
    return app.isOpenNotif ? "none" : "flex";
  }

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
    return '0%'
  }

  static get multistreamWrapDefaultTop(){return 5}

  static getSelf( params ){
    const { app, bootOption } = params;
    const overflow = app.extensionMode === App.extensionModeExtBottomLabel ?
      "hidden" : "inherit";
    let borderRadius = "0px";
    if( bootOption && bootOption["border-radius"] ){
      borderRadius = bootOption["border-radius"];
    }else{
      if(
        borderRadius === "0px" &&
        app.extensionMode === App.extensionModeExtModalLabel
      ){
        borderRadius = "3px";
      }
    }

    const layout = Style.getLayoutBlock({
      display: "initial",
      width: '100%',
      height: '100%',
      overflow,
      borderRadius
    });
    const content = Style.getContentBase({});
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getMultistreamIconWrapTop( app ){    
    if( app.extensionMode === App.extensionModeExtBottomLabel ){
      return ( Header.headerHeight + Container.multistreamWrapDefaultTop ) + "px" ;
    }else if( app.extensionMode === App.extensionModeExtModalLabel ){
      return ( Header.headerHeight + Container.multistreamWrapDefaultTop ) + "px" ;
    }else{
        return ( Header.headerHeight + Container.multistreamWrapDefaultTop ) + "px" ;
    }
  }

  static getMultistreamIconWrapRight( app ){
    switch( app.screenMode ){
    case App.screenModeUndispLabel:
    case App.screenModeSmallLabel:
      return "5%" ;
    case App.screenModeMiddleLabel:
      return "20px" ;
    case App.screenModeLargeLabel:
      return `calc( ${DetailRight.getWidth(app)} + 20px)` ;
    }
  }

  static getMultistreamIconWrap( {app} ){
    const layout = Style.getLayoutBlock({
      width: '30px',
      height: '30px',
      margin: '0 auto',
      background: 'rgba(255, 255, 255, 0.8)',

    });

    const content = Style.getContentBase({
      color: 'rgb(255,255,255)',
      textAlign: 'center',
      fontSize: "12px",
      lineHeight: 2,
      cursor: 'pointer',
    });
    const animation = Style.getAnimationBase({
      transition: Container.transitionOff,
    });
    return Style.get({layout, content, animation});
  }

  static getNewPost( {app} ){
    let display = Container.getNewPostDisplay(app);
    let left = "0px";
    let width = "0px";
    switch(app.screenMode){
    case App.screenModeUndispLabel :
    case App.screenModeSmallLabel :
      left = "25%";
      width = "50%";
      break;
    case App.screenModeMiddleLabel :
      width = ( ( app.width - Menu.getWidth(app, true) ) * 0.5 );
      left = Menu.getWidth(app, true) + Math.floor( width / 2 );
      break;
    case App.screenModeLargeLabel :
      const detailOtherWidth = Math.floor( app.width * DetailRight.otherWidthRate );
      const postsWidth = Math.floor( detailOtherWidth - Menu.getWidth(app, true) );
      width = postsWidth * 0.5;
      left = Menu.getWidth(app, true) + Math.floor( width / 2 );
      break;
    }

    const layout = Style.getLayoutFlex({
      display,
      position: 'fixed',
      bottom: `-${Container.notifHeight}px`,
      left,
      width,
      height: Container.notifHeight,
      margin: '0px auto',
      alignItems: "center",
      justifyContent: "center",
      zIndex: '1',
      background: Container.darkRGBA,
      borderRadius: '20px',
    });
    const content = Style.getContentBase({
      color: 'rgb(255,255,255)',
      textAlign: 'center',
      fontSize: "12px",
      lineHeight: 2,
      cursor: 'pointer',
    });
    const animation = Style.getAnimationBase({
      transition: Container.getTransition( app ),
    });
    return Style.get({layout, content, animation});
  }

  static getHideScreenBottom( {app} ){
    const layout = Style.getLayoutFlex({
      position: 'fixed',
      top: `100vh`,
      width: "100vw",
      height: "300px",
      background: Container.reliefRGB,
    });
    const content = Style.getContentBase({});
    const animation = Style.getAnimationBase({});
    return Style.get({layout, content, animation});
  }

  static getLinkLabel({app}){
    const top = Header.headerHeight + "px";
    const left = app.screenMode === App.screenModeSmallLabel ?
      "0px" : `${Menu.getWidth(app)}`;
      console.log(Menu.getWidth(app));
    const layout = Style.getLayoutFlex({
      maxWidth: "200px",
      position: "fixed",
      top,
      left,
      height: "20px",
      padding: "5px 10px",
      alignItems: "center",
      justifyContent: "center",
      background: "rgba(0, 0, 0, 0.4)",
      zIndex: '10',
      borderRadius: "0px 0px 2px 0px"
    });
    const content = Style.getContentBase({
      lineHeight: 2,
      fontSize: '10px',
      color: Container.whiteRGB
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }
}
