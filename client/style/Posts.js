import define from '../../common/define';
import App from '../../common/schemas/state/App';
import Style from './index';
import Container from './Container';
import Header from './Header';
import PostsFooter from './PostsFooter';
import Main from './Main';
import Menu from './Menu';
import Detail from './Detail';
import Footer from './Footer';

export default class Posts {

  static getMinWidth( app, addUnit = false ){
    let width = '200px';
    return addUnit ? Style.trimUnit( width ) : width ;
  }

  static getOlWidth( {app}, addUnit = false ){
    const width = app.type === define.APP_TYPES.EXTENSION ? '90%' : '100%';
    return addUnit ? Style.trimUnit( width ) : width ;
  }

  static getWidth( app, addUnit = false ){
    let width = 0;
    if( app.type === define.APP_TYPES.EXTENSION ){
      width = "90%";
    }else{
      switch( app.screenMode ){
      case App.screenModeSmallLabel :
        return "100%";
      case App.screenModeMiddleLabel :
        return `calc(100% - ${ Menu.getWidth( app, false ) })`
      case App.screenModeLargeLabel :
        width = `calc( ${ 100 - Detail.getWidth( app, false ) }% - ${Menu.getWidth( app, false ) } )`;
        break;
      }
    }
    return addUnit ? Style.trimUnit( width ) : width ;
  }

  static get notifHeight(){ return 20 };
  static get notifOpenTranslate(){ return 20 };
  static get notifHeight(){ return 20 };
  static get notifOpenTranslateY(){
    return `translate3d( 0px, ${-( Footer.selfHeight * 2 )}px, 0px )`;
  }
  static get notifCloseTranslateY(){ return `translate3d( 0px, 0px, 0px )`; }
  static getNotifTranslateY( app ){
    return app.isOpenNotifInThread ? Main.notifOpenTranslateY : Main.notifCloseTranslateY;
  }

  constructor( params ){
    const self = Posts.getSelf( params );
    const ol = Posts.getOl( params );
    const more = Posts.getMore( params );
    const notif = Posts.getNotif( params );
    return {
      self,
      ol,
      more,
      notif
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

  static getBorders( app ){
    return app.screenMode === App.screenModeSmallLabel ?
      {borderRight: Container.border, borderLeft: Container.border} :
      {} ;
  }

  static getMargin( app, addUnit = false ){
    switch( app.screenMode ){
    case App.screenModeSmallLabel : return `${Header.headerHeight}px 0px 0px 0px`;
    case App.screenModeMiddleLabel : return `${Header.headerHeight}px 0px ${PostsFooter.selfHeight}px ${Menu.getWidth( app )}`;
    case App.screenModeLargeLabel : return `${Header.headerHeight}px 0px 0px ${Menu.getWidth( app )}`
    }
  }

  static getSelf( {app} ){
    let width = '100%';
    let margin = '0';
    let borders = {
      borderRight: 0,
      borderLeft: 0
    }
    if( app.type === define.APP_TYPES.EXTENSION ){
      width = '90%';
      margin = '0px 0px 0px 5%';
      borders.borderRight = Container.border;
      borders.borderLeft = Container.border;
    }else{
      borders = Posts.getBorders(app);
    }
    const layout = Style.getLayoutBlock({
      position: 'relative',
      width: Posts.getWidth( app ),
      minWidth: Posts.getMinWidth( app ),
      height: "auto",
      minHeight: "100vh",
      maxHeight: "auto",
      margin: Posts.getMargin(app),
      overflow: 'scroll', 
      background: Container.whiteRGBA,
      ...borders
    });
    const content = {};
    const animation = Style.getAnimationBase({
      transform: 'translate3d(0px, 0px, 0px) scale(1.0)',
      transformOrigin: "top"
    });
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
      minHeight: "inherit",
      borderRight,
      borderLeft,
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

  static getNotif( {app} ){
    const layout = Style.getLayoutBlock({
      position: 'fixed',
      top: `calc( 100vh - ${Header.headerHeight}px )`,
      left: "25%",
      width: '50%',
      height: Container.notifHeight,
      margin: '0px auto',
      zIndex: '10',
      background: 'rgba(0, 0, 0, 0.4)',
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
}
