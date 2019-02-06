import define from '../../common/define';
import App from '../../common/schemas/state/App';
import User from '../../common/schemas/state/User';
import Style from './index';
import Container from './Container';
import Header from './Header';
import Main from './Main';
import Menu from './Menu';
import Detail from './Detail';

export default class Posts {

  static getMinWidth( app, addUnit = false ){
    let width = '200px';
    return addUnit ? Style.trimUnit( width ) : width ;
  }

  static getWidth( app, addUnit = false ){
    let width = 0;
    switch( app.screenMode ){
    case App.screenModeSmallLabel :
      width = '50.0%';
      break;
    case App.screenModeMiddleLabel :
      width = app.isOpenDetail ? 
        `${ app.width - Menu.getWidth( app, true )}px` :
        `${ app.width - Menu.getWidth( app, true )}px` ;
      break;
    case App.screenModeLargeLabel :
      width = `calc( 100% - ${ Detail.getWidth( app, true ) + Menu.getWidth( app, true ) }px )`;
      break;
    }
    return addUnit ? Style.trimUnit( width ) : width ;
  }

  static get multistreamWrapTop(){return 5}

  constructor( params ){
    const self = Posts.getSelf( params );
    const ol = Posts.getOl( params );
    const more = Posts.getMore( params );
    const multistreamIconWrap = Posts.getMultistreamIconWrap( params );
    return {
      self,
      ol,
      more,
      multistreamIconWrap,
    }
  }

  static closeIndexTransform( {app} ){
    switch( app.screenMode ){
    case App.screenModeSmallLabel : return `translate3d( -${app.width}px, 0px, 0px)`;
    case App.screenModeMiddleLabel : return `translate3d( -${Menu.getWidth( app )}px, 0px, 0px)`;
    case App.screenModeLargeLabel : return `translate3d( -${Menu.getWidth( app )}px, 0px, 0px)`;
    }
  };
  static openIndexTransform( option ){
    return `translate3d( 0px, 0px, 0px)`
  };

  static get headerHeight(){ return 35 };

  static getBorder( app ){
    if( app.type === define.APP_TYPES.EXTENSION ){
      return {};
    }else{
      return app.screenMode === App.screenModeSmallLabel ?
        {borderRight: Container.border, borderLeft: Container.border} :
        {} ;
    }  
  }

  static getOlWidth( {app}, addUnit = false ){
    const width = app.type === define.APP_TYPES.EXTENSION ? '90%' : '100%';
    return addUnit ? Style.trimUnit( width ) : width ;
  }

  static getSelf( {app} ){
    const borders = Posts.getBorder(app);
    const layout = Style.getLayoutInlineBlock({
      position: 'relative',
      width: Posts.getWidth( app ),
      minWidth: Posts.getMinWidth( app ),
      WebkitOverflowScrolling: 'touch',
      ...borders
    });
    const content = {};
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getOl( {app} ){
    let width = '100%';
    let margin = '0';
    let borderRight = '0';
    let borderLeft = '0';

    if( app.type === define.APP_TYPES.EXTENSION ){
      width = Posts.getOlWidth({app});
      margin = '0px 0px 0px 5%';
      borderRight = Container.border;
      borderLeft = Container.border;
    }

    const layout = Style.getLayoutBlock({
      width,
      margin,
      height: `calc( 100% - ${Main.headerHeight}px )`,
      borderRight,
      borderLeft,
      overflow: 'scroll',
      background: Container.whiteRGBA,
    });
    const content = {};
    const animation = Style.getAnimationBase({
      transition: Container.getTransition( app ),
    });
    return Style.get({layout, content, animation});
  }

  static getMore(){
    const layout = Style.getLayoutBlock({
      width: '50%',
      height: Container.notifHeight,
      margin: '15px auto',
      zIndex: '10',
      background: Container.themeRGBA,
      borderRadius: '20px',

    });
    const content = Style.getContentBase({
      lineHeight: 2,
      fontSize: '12px',
      color: Container.whiteRGB,
      cursor: 'pointer',
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getMultistreamIconWrapBorder( {user} ){
    console.log(user.dispThreadType);
    return !user.dispThreadType || user.dispThreadType === User.dispThreadTypeMulti ?
      `1px solid ${Container.themeRGBA}` :
      `1px solid ${Container.calmRGBA}`;
  }

  static getMultistreamIconWrap( {app, user} ){

    const top = app.type === define.APP_TYPES.EXTENSION ?
      ( Header.headerHeight + Posts.multistreamWrapTop ) + "px" :
      Posts.multistreamWrapTop + "px";

    const layout = Style.getLayoutBlock({
      position: 'absolute',
      top,
      right: "20px",
      width: '50px',
      height: '50px',
      margin: '0 auto',
      zIndex: '1',
      border: Posts.getMultistreamIconWrapBorder( {user} ),
      background: 'rgba(255, 255, 255, 0.8)',
      borderRadius: '50px',
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
}
