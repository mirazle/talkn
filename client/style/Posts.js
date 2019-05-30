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
      console.log("A");
      return `0px 5% ${Header.headerHeight}px 5%`;
    }else if(app.iframe){
      console.log( app );
      console.log("B");
      return "0";
    }else{
      switch( app.screenMode ){
      case App.screenModeSmallLabel :
          console.log("C");
        return `${Header.headerHeight}px 0px 0px 0px`;
      case App.screenModeMiddleLabel :
          console.log("D");
        return `${Header.headerHeight}px 0px ${PostsFooter.selfHeight}px ${Menu.getWidth( app )}`;
      case App.screenModeLargeLabel :
          console.log("E");
        return `${Header.headerHeight}px 0px ${Header.headerHeight}px ${Menu.getWidth( app )}`
      }
    }
  }

  static getPadding( app, addUnit = false ){
    if(app.iframe){
      return "0px";
    }else{
      switch( app.screenMode ){
      case App.screenModeSmallLabel : return `0px 0px 25px 0px`;
      case App.screenModeMiddleLabel : return `0px`;
      case App.screenModeLargeLabel : return `0px`
      }
    }
  }

  static getSelfTransform(app){
    if( app.type === define.APP_TYPES.EXTENSION ){
      return app.isDispPosts ?
        "translate3d(0px, 0px, 0px)" : `translate3d(0px, calc( 100% + ${PostsFooter.selfHeight}px ), 0px)`;
    }else{
      return "translate3d(0px, 0px, 0px)";
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
    let zIndex = 1;
    let transform = Posts.getSelfTransform(app);

    if( app.type === define.APP_TYPES.EXTENSION ){
      position = "fixed";
      top = `${Header.headerHeight}px`;
      height = `calc( 100% - ${PostsFooter.selfHeight * 2}px )`;
      minHeight = height;
      overflow = "scroll";
      borders.borderRight = Container.border;
      borders.borderLeft = Container.border;
      zIndex = -2;
    }else if( app.iframe ){
      position = "relative";
      top = "45px";
      height = `calc( 100% - ${Header.headerHeight + Footer.selfHeight}px)`;
      borders.borderRight = Container.border;
      borders.borderLeft = Container.border;
      overflow = "scroll";
      minHeight = 0;
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
      background: Container.whiteRGBA,
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
