import define from '../../common/define';
import App from '../../common/schemas/state/App';
import Style from './index';
import Container from './Container';
import Posts from './Posts';
import Menu from './Menu';

export default class PostsFooter{

  static get selfHeight(){ return 45 };
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
    const self = PostsFooter.getSelf( params );
    const icon = PostsFooter.getIcon( params );
    const textarea = PostsFooter.getTextarea( params );
    const modalTextarea = PostsFooter.getModalTextarea( params );
    const button = PostsFooter.getButton( params );
    const upper = PostsFooter.getUpper( params );
    const bottom = PostsFooter.getBottom( params );
    return {
      self,
      icon,
      textarea,
      modalTextarea,
      button,
      upper,
      bottom
    }
  }

  static getSelf( {app} ){
    //const display = app.extensionMode === App.extensionModeExtModalLabel ? "none": "flex";
    const borders = PostsFooter.getBorder(app);
    const borderRadius = PostsFooter.getBorderRadius(app);
    const layout = Style.getLayoutFlex({
      //display,
      position: "fixed",
      bottom: 0,
      left: PostsFooter.getLeft( app ),
      flexGrow: 1,
      height: PostsFooter.selfHeight,
      width: PostsFooter.getWidth( app ),
      maxWidth:  PostsFooter.getWidth( app ),
      background: Container.offWhiteRGBA,
      justifyContent: "flex-start",
      borderRadius,
      ...borders
    });
    const content = {};
    const animation = Style.getAnimationBase({
      transform: PostsFooter.getTransform( app )
    });
    return Style.get({layout, content, animation});
  }

  static getIcon( {thread} ){
    const layout = Style.getLayoutInlineBlock({
      width: '20%',
      maxWidth: '20%',
      height: '55%',
      backgroundImage: `url()`,
      backgroundPosition: 'center center',
      backgroundSize: '24px 24px',
      backgroundRepeat: 'no-repeat',
      zIndex: 9999
    });
    const content = Style.getContentBase({
      cursor: 'pointer',
    });
    const animation = {};
    return Style.get({layout, content, animation});
  }

  static getTextarea({app}){
    const width = app.extensionMode === App.extensionModeExtModalLabel ? "60%" : "54%" ;
    const layout = Style.getLayoutInlineBlock({
      width,
      maxWidth: width,
      height: '25px',
      background: Container.whiteRGB,
      padding: '6px',
      margin: '0 3% 0 0',
      outline: 'none',
      resize: 'none',
      lineHeight: '0.9',
      border: Container.border,
      borderRadius: '3px',
      WebkitAppearance: 'none',
    });
    const content = Style.getContentBase({
      fontSize: '12px',
      textAlign: 'left',
    });
    const animation = Style.getAnimationBase();

    return Style.get({layout, content, animation});
  }

  static getModalTextarea(){
    const layout = Style.getLayoutInlineBlock({
      width: '60%',
      maxWidth: '60%',
      height: '55%',
      background: Container.whiteRGB,
      padding: '6px',
      margin: '0 0% 0 0',
      outline: 'none',
      resize: 'none',
      lineHeight: '0.9',
      border: Container.border,
      borderRadius: '3px',
      WebkitAppearance: 'none',
    });
    const content = Style.getContentBase({
      fontSize: '12px',
      textAlign: 'left',
    });
    const animation = Style.getAnimationBase();

    return Style.get({layout, content, animation});
  }

  static getButton({app}){
    const layout = Style.getLayoutInlineBlock({
      outline: 'none',
      width: '20%',
      maxWidth: '20%',
      height: '55%',
      margin: '0px 3% 0px 0%',
      background: 'rgb(245, 245, 245)',
      border: Container.border,
      borderRadius: '3px',
    });
    const content = Style.getContentBase({
      fontSize: '12px',
      cursor: 'pointer',
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getUpper(){
    const layout = Style.getLayoutFlex({
      alignItems: "center",
      justifyContent: "flex-start"
    });
    const content = Style.getContentBase({
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getBottom(){
    const layout = Style.getLayoutFlex({
      alignItems: "center",
      justifyContent: "center"
    });
    const content = Style.getContentBase({
      fontSize: "10px"
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }
}
