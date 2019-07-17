import define from '../../common/define';
import App from '../../common/schemas/state/App';
import Style from './index';
import Container from './Container';
import Header from './Header';
import PostsFooter from './PostsFooter';
import Main from './Main';
import Menu from './Menu';
import Detail from './Detail';
import Video from './Media/Video';
import Audio from './Media/Audio';

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

    if( app.includeIframeTag ){
      return {borderRight: Container.border, borderLeft: Container.border};
    }else{
      return app.extensionMode === App.screenModeUndispLabel ||
            app.extensionMode === App.screenModeSmallLabel ?
        {borderRight: Container.border, borderLeft: Container.border} :
        {} ;
    }
  }

  static getMargin( app, addUnit = false ){

    let margin = 0;
    let marginTop = 0;

    if( app.connectionType === App.mediaTagTypeVideo ){
      return app.isBubblePost ? 
        `0px 0px ${PostsFooter.selfHeight}px ${Menu.getWidth( app )}` :
        `10px 0px ${PostsFooter.selfHeight}px ${Menu.getWidth( app )}` ;
    }
    
    margin = `${Header.headerHeight}px 0px 0px 0px`;
    marginTop = app.isMediaConnection ? `${Audio.height + 20}px` : "0px";

    if( app.connectionType === App.mediaTagTypeVideo ){
      switch( app.screenMode ){
      case App.screenModeSmallLabel :
          return 0;
      case App.screenModeMiddleLabel :
          return `0px 0px 0px ${Menu.getWidth( app )}`;
      case App.screenModeLargeLabel :
          return `0px 0px 0px ${Menu.getWidth( app )}`;
      }
      return 0;
    }

    if( app.extensionMode === App.extensionModeExtBottomLabel ){
      margin = `${marginTop} 5% ${Header.headerHeight}px 5%`;
    }else if(app.extensionMode === App.extensionModeExtModalLabel ){
      margin = `${marginTop} 0px ${PostsFooter.selfHeight}px 0px`;
    }else{
      switch( app.screenMode ){
      case App.screenModeSmallLabel :
          margin = `${marginTop} 0px 0px 0px`;
          break;
      case App.screenModeMiddleLabel :
          margin = `${marginTop} 0px ${PostsFooter.selfHeight}px ${Menu.getWidth( app )}`;
          break;
      case App.screenModeLargeLabel :
          margin = `${marginTop} 0px ${Header.headerHeight}px ${Menu.getWidth( app )}`
          break;
      }
    }
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
      case App.screenModeSmallLabel : return `0px 0px ${PostsFooter.selfHeight}px 0px`;
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

  static getSelfHeight( app ){
    if( app.connectionType === App.mediaTagTypeVideo ){
      return `auto`;
    }else{
      if(
        app.extensionMode === App.extensionModeExtBottomLabel ||
        app.extensionMode === App.extensionModeExtModalLabel 
      ){
        return `calc( 100% - ${PostsFooter.selfHeight * 2}px )`;
      }else{
        return "auto";
      }
    }
  }

  static getSelfMinHeight( app ){
    if( app.connectionType === App.mediaTagTypeVideo ){
      return `calc( 100% - ${Video.height + PostsFooter.selfHeight + Header.headerHeight}px)`;
    }else{
      if(
        app.extensionMode === App.extensionModeExtBottomLabel ||
        app.extensionMode === App.extensionModeExtModalLabel 
      ){
        return `calc( 100% - ${PostsFooter.selfHeight * 2}px )`;
      }else{
        return "auto";
      }
    }
  }

  static getSelfTop( app ){
    if( app.connectionType === App.mediaTagTypeVideo ){
      return `${Header.headerHeight + Video.height}px`;
    }else{
      return `${Header.headerHeight}px`;
    }
  }

  static getSelf( {app} ){
    let position = "relative";
    let overflow = "hidden";
    let borders = {borderRight: 0, borderLeft: 0};
    let background = Container.whiteRGBA;
    let zIndex = 1;

    if(
      app.extensionMode === App.extensionModeExtBottomLabel ||
      app.extensionMode === App.extensionModeExtModalLabel 
    ){
      position = "fixed";
      overflow = "scroll";
      borders.borderRight = Container.border;
      borders.borderLeft = Container.border;
      zIndex = -2;
    }else{
      borders = Posts.getBorders(app);
    }

    const layout = Style.getLayoutBlock({
      position,
      top: Posts.getSelfTop( app ),
      width: Posts.getWidth( app ),
      minWidth: Posts.getMinWidth( app ),
      height: Posts.getSelfHeight( app ),
      minHeight: Posts.getSelfMinHeight( app ),
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

  static getMore({app}){
    const background = app.isBubblePost ? Container.themeRGBA : Container.reliefRGBA;
    const margin = app.isBubblePost ? '15px auto' : '10px auto';
    const layout = Style.getLayoutFlex({
      width: '50%',
      height: Container.notifHeight,
      margin,
      alignItems: "center",
      justifyContent: "center",
      zIndex: '10',
      background,
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
