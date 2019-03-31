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
  static getSelfDisplay(app){return app.isOpenNotif ? 'none' : 'flex'}
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

  constructor( params ){
    const self = Posts.getSelf( params );
    const ol = Posts.getOl( params );
    const more = Posts.getMore( params );
    return {
      self,
      ol,
      more
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
    if( app.type === define.APP_TYPES.EXTENSION ){
      return `0px 5% ${Header.headerHeight}px 5%`;
    }else{
      switch( app.screenMode ){
      case App.screenModeSmallLabel : return `${Header.headerHeight}px 0px 25px 0px`;
      case App.screenModeMiddleLabel : return `${Header.headerHeight}px 0px ${PostsFooter.selfHeight}px ${Menu.getWidth( app )}`;
      case App.screenModeLargeLabel : return `${Header.headerHeight}px 0px ${Header.headerHeight}px ${Menu.getWidth( app )}`
      }
    }
  }

  static getSelf( {app} ){
    let position = "relative";
    let top = 0;
    let height = "auto";
    let minHeight = `calc( 100vh - ${Header.headerHeight}px)`;
    let overflow = "hidden";
    let borders = {
      borderRight: 0,
      borderLeft: 0
    }
    if( app.type === define.APP_TYPES.EXTENSION ){
      position = "fixed";
      top = `${Header.headerHeight}px`;
      height = `calc( 100% - ${PostsFooter.selfHeight * 2}px )`;
      minHeight = height;
      overflow = "scroll";
      borders.borderRight = Container.border;
      borders.borderLeft = Container.border;
    }else{
      borders = Posts.getBorders(app);
    }
    const layout = Style.getLayoutBlock({
      position,
      top,
      width: Posts.getWidth( app ),
      minWidth: Posts.getMinWidth( app ),
      height,
      minHeight,
      maxHeight: "auto",
      margin: Posts.getMargin( app ),
      background: Container.whiteRGBA,
      overflow,
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
    const layout = Style.getLayoutFlex({
      width: '50%',
      height: Container.notifHeight,
      margin: '15px auto',
      alignItems: "center",
      justifyContent: "center",
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
}
