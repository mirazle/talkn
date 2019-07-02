import define from '../../common/define';
import App from '../../common/schemas/state/App';
import Style from './index';
import Container from './Container';
import PostsFooter from './PostsFooter';
import Menu from './Menu';

export default class PostsSupporter{

  static get selfHeight(){ return 45 };
  static getDisplay( app ){
    return app.isOpenPostsSupporter ? "flex": "none";
  }
  static getWidth( app, addUnit = false ){
    let width = 0;
    if(
      app.extensionMode === App.extensionModeExtBottomLabel ||
      app.extensionMode === App.extensionModeExtModalLabel 
    ){
      width = '100%';
    }else{
      switch( app.screenMode ){
      case App.screenModeUndispLabel : width = '100%';break;
      case App.screenModeSmallLabel : width = '100%';break;
      case App.screenModeMiddleLabel : width = Posts.getWidth( app );break;
      case App.screenModeLargeLabel : width = Posts.getWidth( app );break;
      }
    }
    return addUnit ? Style.trimUnit( width ) : width ;
  }

  static getLeft( app, addUnit = false ){
    let left = 0;
    if( app.extensionMode === App.extensionModeExtBottomLabel ){
      return 0;
    }else if(app.extensionMode ===  App.extensionModeExtModalLabel ){
      return 0;
    }else{
      switch( app.screenMode ){
      case App.screenModeUndispLabel : left = '0px';break;
      case App.screenModeSmallLabel : left = '0px';break;
      case App.screenModeMiddleLabel :left = `${Menu.getWidth(app)}`;break;
      case App.screenModeLargeLabel : left = Menu.getWidth( app );break;
      }
    }
    return addUnit ? Style.trimUnit( left ) : left ;
  };

  static getBorder( app, addUnit = false ){
    switch( app.extensionMode ){
    case App.extensionModeExtBottomLabel:
      return {borderTop: Container.border, borderRight: Container.border, borderLeft: Container.border};  
    case App.extensionModeExtModalLabel:
      return {border: Container.border};
    default:
      if( app.includeIframeTag ){
          return {border: Container.border};
        }else{
          if(
            app.screenMode === App.screenModeUndispLabel ||
            app.screenMode === App.screenModeSmallLabe
          ){
            return {borderTop: Container.border, borderBottom: Container.border} ;
          }else{
            return {borderTop: Container.border, borderBottom: Container.border} ;
          }
        }
    }
  }

  static getBorderRadius( app, addUnit = false ){
    if( app.extensionMode === App.extensionModeExtBottomLabel ){
      return app.extensionWidth === "100%" ?
        "0px 0px 0px 0px" : `${Container.radius} ${Container.radius} 0px 0px`;
    }else if( app.extensionMode === App.extensionModeExtModalLabel ){
      return `0px 0px ${Container.radius} ${Container.radius}`;
    }
    return 0;
  }

  static getTransform( app ){
    let transform = 'translate3d( 0px, 0px, 0px )';
    switch( app.screenMode ){
    case App.screenModeUndispLabel :
    case App.screenModeSmallLabel :
      transform = app.isOpenMenu ? 'translate3d( 0%, 0px, 0px )' : 'translate3d( 0px, 0px, 0px )';
      break;
    case App.screenModeMiddleLabel :
      transform = app.isOpenDetail ? `translate3d( 0px ,0px, 0px )` : 'translate3d( 0px ,0px, 0px )';
      break;
    case App.screenModeLargeLabel : transform = 'translate3d( 0px ,0px, 0px )';
      break;
    }
    return transform ;
  }

  constructor( params ){
    const self = PostsSupporter.getSelf( params );
    const emoji = PostsSupporter.getEmoji( params );
    return {
      self,
      emoji
    }
  }

  static getSelf( {app} ){
    const display = PostsSupporter.getDisplay(app);
    const layout = Style.getLayoutFlex({
      display,
      position: "fixed",
      bottom: `${PostsFooter.selfHeight}px`,
      left: PostsFooter.getLeft( app ),
      height: PostsFooter.selfHeight,
      width: PostsFooter.getWidth( app ),
      maxWidth:  PostsFooter.getWidth( app ),
      color: Container.whiteRGB,
      alignItems: "center",
      justifyContent: "flex-start",
      background: Container.darkRGBA,
      whiteSpace: "nowrap",
      overflowScrolling: "touch",
      WebkitOverflowScrolling: "touch",
      overflowX: "scroll",
      overflowY: "hidden"
    });
    const content = {};
    const animation = Style.getAnimationBase({
      transform: PostsSupporter.getTransform( app )
    });
    return Style.get({layout, content, animation});
  }

  static getEmoji( {app} ){
    const layout = Style.getLayoutFlex({
      minWidth: "60px",
      alignItems: "center",
      justifyContent: "center",
    });
    const content = Style.getContentBase({
      fontSize: "30px",
      cursor: 'pointer',
    });
    const animation = Style.getAnimationBase({
      transition: Container.getTransition( app ),
      transform: 'scale(1.0)'
    });
    return Style.get({layout, content, animation});
  }
}
