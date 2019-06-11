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
    const width = app.extensionMode === App.extensionModeExtBottomLabel ? '90%' : '100%';
    return addUnit ? Style.trimUnit( width ) : width ;
  }

  static getWidth( app, addUnit = false ){
    let width = "100%";
    if( app.extensionMode === App.extensionModeExtBottomLabel ){
      width = "90%";
    }else{
      switch( app.screenMode ){
      case App.screenModeUndispLabel :
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
    case App.screenModeUndispLabel : return `translate3d( -${app.width}px, 0px, 0px)`;
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
    return app.extensionMode === App.screenModeUndispLabel || app.extensionMode === App.screenModeSmallLabel ?
      {borderRight: Container.border, borderLeft: Container.border} :
      {} ;
  }

  static getMargin( app, addUnit = false ){
    let margin = `${Header.headerHeight}px 0px 0px 0px`;
    if( app.extensionMode === App.extensionModeExtBottomLabel ){
      margin = `0px 5% ${Header.headerHeight}px 5%`;
    }else if(app.extensionMode === App.extensionModeExtModalLabel ){
      margin = `0px 0px ${PostsFooter.selfHeight}px 0px`;
    }else{
      switch( app.screenMode ){
      case App.screenModeUndispLabel :
      case App.screenModeSmallLabel :
          margin = `0px 0px 0px 0px`;
          break;
      case App.screenModeMiddleLabel :
          margin = `0px 0px ${PostsFooter.selfHeight}px ${Menu.getWidth( app )}`;
          break;
      case App.screenModeLargeLabel :
          margin = `0px 0px ${Header.headerHeight}px ${Menu.getWidth( app )}`
          break;
      }
    }
//    console.log( app.extensionMode + " " + app.screenMode + " " + margin );
    return margin;
  }

  static getPadding( app, addUnit = false ){
    if( app.extensionMode === App.extensionModeExtBottomLabel ){
      return "0px";
    }else if(app.extensionMode === App.extensionModeExtModalLabel ){
      return "0px";
    }else{
      switch( app.screenMode ){
      case App.screenModeUndispLabel : return `0px 0px 25px 0px`;
      case App.screenModeSmallLabel : return `0px 0px 25px 0px`;
      case App.screenModeMiddleLabel : return `0px`;
      case App.screenModeLargeLabel : return `0px`
      }
    }
  }

  static getSelfTransform(app){
    if( app.extensionMode === App.extensionModeExtBottomLabel ){
      return app.isDispPosts ?
        "translate3d(0px, 0px, 0px)" : `translate3d(0px, calc( 100% + ${PostsFooter.selfHeight}px ), 0px)`;
    }else{
      return "translate3d(0px, 0px, 0px)";
    }
  }

  static getSelf( {app} ){
    let position = "relative";
    let top = `${Header.headerHeight}px`;
    let height = "auto";
    let minHeight = `calc( 100vh - ${Header.headerHeight}px)`;
    let overflow = "hidden";
    let borders = {
      borderRight: 0,
      borderLeft: 0
    }
    let background = Container.whiteRGBA;
    let zIndex = 1;
    let transform = Posts.getSelfTransform(app);

    if(
      app.extensionMode === App.extensionModeExtBottomLabel ||
      app.extensionMode === App.extensionModeExtModalLabel 
    ){
      position = "fixed";
      top = `${Header.headerHeight}px`;
      height = `calc( 100% - ${PostsFooter.selfHeight * 2}px )`;
      minHeight = height;
      overflow = "scroll";
      borders.borderRight = Container.border;
      borders.borderLeft = Container.border;
      zIndex = -2;
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
      padding: Posts.getPadding( app ),
      background,
      overflowScrolling: "touch",
      WebkitOverflowScrolling: "touch",
      overflow,
      ...borders,
      zIndex
    });
    const content = {};
    const animation = Style.getAnimationBase({});

    return Style.get({layout, content, animation});
  }

  static getOl( {app} ){
    let width = '100%';
    let margin = '0';
    let borderRight = '0';
    let borderLeft = '0';

    if( app.extensionMode === App.extensionModeExtBottomLabel ){
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
      borderLeft
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
