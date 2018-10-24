import define from '../../common/define';
import App from '../../common/schemas/state/App';
import Style from './index';
import Container from './Container';
import Posts from './Posts';
import Detail from './Detail';

export default class PostsFooter{

  static get selfHeight(){ return 45 };
  static getWidth( app, addUnit = false ){
    let width = 0;
    switch( app.screenMode ){
    case App.screenModeSmallLabel : width = '100%';break;
    case App.screenModeMiddleLabel :width = Posts.getWidth( app );break;
    case App.screenModeLargeLabel : width = Posts.getWidth( app );break;
    }
    return addUnit ? Style.trimUnit( width ) : width ;
  };

  static getRight( app, addUnit = false ){
    let right = 0;
    switch( app.screenMode ){
    case App.screenModeSmallLabel : right = '0px';break;
    case App.screenModeMiddleLabel :right = '0px';break;
    case App.screenModeLargeLabel : right = Detail.getWidth( app );break;
    }
    return addUnit ? Style.trimUnit( right ) : right ;
  };

  static getTransform( app ){
    let transform = 'translate3d( 0px, 0px, 0px )';
    switch( app.screenMode ){
    case App.screenModeSmallLabel :
      transform = app.isOpenMenu ? 'translate3d( 100%, 0px, 0px )' : 'translate3d( 0px, 0px, 0px )';
      break;
    case App.screenModeMiddleLabel :
      transform = app.isOpenDetail ? `translate3d( -${Detail.getWidth( app )} ,0px, 0px )` : 'translate3d( 0px ,0px, 0px )';
      break;
    case App.screenModeLargeLabel : transform = 'translate3d( 0px ,0px, 0px )';break;
    }
    return transform ;
  }

  constructor( params ){
    const self = PostsFooter.getSelf( params );
    const icon = PostsFooter.getIcon( params );
    const textarea = PostsFooter.getTextarea();
    const button = PostsFooter.getButton();
    return {
      self,
      icon,
      textarea,
      button,
    }
  }

  static getSelf( {app} ){

    const borders = app.screenMode === App.screenModeSmallLabel ?
      {border: Container.border} :
      {borderTop: Container.border, borderBottom: Container.border} ;

    const borderRadius = app.type === define.APP_TYPES.EXTENSION ?
      Container.radiuses : '0px';

    const layout = Style.getLayoutFlex({
      position: 'fixed',
      bottom: '0px',
      right: PostsFooter.getRight( app ),
      height: PostsFooter.selfHeight,
      width: PostsFooter.getWidth( app ),
      background: Container.offWhiteRGBA,
      zIndex: Container.maxZIndex,
      borderRadius,
      ...borders
    });
    const content = {};
    const animation = Style.getAnimationBase({
      transform: PostsFooter.getTransform( app ),
      transition: Container.getTransitionOn( app ),
    });
    return Style.get({layout, content, animation});
  }

  static getIcon( {thread} ){
    const layout = Style.getLayoutInlineBlock({
      width: '20%',
      height: '25px',
      backgroundImage: `url()`,
      backgroundPosition: 'center center',
      backgroundSize: '20px 20px',
      backgroundRepeat: 'no-repeat',
    });
    const content = {};
    const animation = {};
    return Style.get({layout, content, animation});
  }

  static getTextarea(){
    const layout = Style.getLayoutInlineBlock({
      width: '54%',
      height: '25px',
      background: Container.whiteRGB,
      padding: '6px 0% 5px 2%',
      margin: '0 3% 0 0',
      outline: 'none',
      resize: 'none',
      border: Container.border,
      borderRadius: '3px',
      WebkitAppearance: 'none',
    });
    const content = Style.getContentBase({
      fontSize: '10px',
      textAlign: 'left',
    });
    const animation = Style.getAnimationBase();

    return Style.get({layout, content, animation});
  }

  static getButton(){
    const layout = Style.getLayoutInlineBlock({
      outline: 'none',
      width: '20%',
      height: '25px',
      margin: '0px 3% 0px 0%',
      background: 'rgb(245, 245, 245)',
      border: Container.border,
      borderRadius: '3px',
    });
    const content = Style.getContentBase({
      fontSize: '12px'
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }
}
