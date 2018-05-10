import Style from './index';
import Container from './Container';
import Main from './Main';

export default class MenuIndex {

  static get iconSize(){ return '25px' };

  static get liHeight(){ return 90 };

  constructor( params ){
    const self = MenuIndex.getSelf( params );
    const header = MenuIndex.getHeader( params );
    const headerSearchIcon = MenuIndex.getHeaderSearchIcon( params );
    const headerConnection = MenuIndex.getHeaderConnection( params );
    const ol = MenuIndex.getOl( params );
    const liActive = MenuIndex.getLiActive();
    const liUnactive = MenuIndex.getLiUnactive();
    const upper = MenuIndex.getUpper();
    const upperSpace = MenuIndex.getUpperSpace();
    const upperRight = MenuIndex.getUpperRight();
    const bottom = MenuIndex.getBottom();
    const bottomIcon = MenuIndex.getBottomIcon();
    const bottomPost = MenuIndex.getBottomPost();
    return {
      self,
      header,
      headerSearchIcon,
      headerConnection,
      ol,
      liActive,
      liUnactive,
      upper,
      upperSpace,
      upperRight,
      bottom,
      bottomIcon,
      bottomPost,
    }
  }

  static getSelf( {app} ){
    const layout = Style.getLayoutBlock({
      height: '100%',
    });
    const content = Style.getContentBase({});
    const animation = Style.getAnimationBase({});
    return Style.get({layout, content, animation});
  }

  static getHeader( {app} ){
    const layout = Style.getLayoutBlock({
      width: '100%',
      height: `${MenuIndex.liHeight / 2 }px`,
      borderBottom: Container.border,
    });
    const content = Style.getContentBase({
      textAlign: 'left',
    });
    const animation = Style.getAnimationBase({
      transition: Container.getTransitionOn( app ),
    });
    return Style.get({layout, content, animation});
  }

  static getHeaderSearchIcon( {app} ){
    const layout = Style.getLayoutInlineBlock({
      width: '50px',
      minWidth: '50px',
      height: '45px',
    });
    const content = Style.getContentBase({});
    const animation = Style.getAnimationBase({
      transition: Container.getTransitionOn( app ),
    });
    return Style.get({layout, content, animation});
  }

  static getHeaderConnection( {app} ){
    const layout = Style.getLayoutInlineFlex({
      justifyContent: 'flexStart',
      width: `calc( 100% - 50px )`,
      overflow: 'scroll'
    });
    const content = Style.getContentBase({
      whiteSpace: 'nowrap',
    });
    const animation = Style.getAnimationBase({
      transition: Container.getTransitionOn( app ),
    });
    return Style.get({layout, content, animation});
  }

  static getOl( {app} ){
    const layout = Style.getLayoutBlock({
      width: '100%',
      height: `calc( 100% - ${Main.headerHeight}px )`,
      overflow: 'scroll',
      background: Container.whiteRGBA,
    });
    const content = {};
    const animation = Style.getAnimationBase({
      transition: Container.getTransitionOn( app ),
    });
    return Style.get({layout, content, animation});
  }

  static getLiActive(){
    const layout = Style.getLayoutBlock({
      width: 'initial',
      height: `${MenuIndex.liHeight}px`,
      padding: '10px',
      borderBottom: Container.border,
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getLiUnactive(){
    const layout = Style.getLayoutBlock({
      width: 'initial',
      height: `${MenuIndex.liHeight}px`,
      padding: '10px',
      borderBottom: Container.border,
      background: Container.offWhiteRGB,
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getUpper(){
    const layout = Style.getLayoutBlock({
      width: '100%',
      height: '20px',
    });
    const content = Style.getContentBase({
      fontSize: '10px',
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getUpperSpace(){
    const layout = Style.getLayoutInlineBlock({
      width: '20%',
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getUpperRight(){
    const layout = Style.getLayoutInlineBlock({
      width: '80%',
    });
    const content = Style.getContentBase({
      textAlign: 'left',
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getBottom(){
    const layout = Style.getLayoutBlock({
      width: '100%',
      height: '50px',
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getBottomIcon(){
    const layout = Style.getLayoutInlineBlock({
      width: '20%',
      height: '50px',
      backgroundImage: 'url("http://localhost:8080/favicon.ico")',
      backgroundPosition: '50% 15%',
      backgroundSize: '20px 20px',
      backgroundRepeat: 'no-repeat',
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getBottomPost(){
    const layout = Style.getLayoutInlineBlock({
      width: '80%',
      flexGrow:  2,
    });
    const content = Style.getContentBase({
      lineHeight: 2,
      textAlign: 'left',
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }
}
