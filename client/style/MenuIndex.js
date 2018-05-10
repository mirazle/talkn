import Style from './index';
import Container from './Container';
import Main from './Main';

export default class MenuIndex {

  static get iconSize(){ return '25px' };

  static get liHeight(){ return 90 };

  constructor( params ){
    const connection = MenuIndex.getConnection( params );
    const ol = MenuIndex.getOl( params );
    const li = MenuIndex.getLi();
    const upper = MenuIndex.getUpper();
    const upperSpace = MenuIndex.getUpperSpace();
    const upperRight = MenuIndex.getUpperRight();
    const upperChild = MenuIndex.getUpperChild();
    const upperTimeago = MenuIndex.getUpperTimeago();
    const bottom = MenuIndex.getBottom();
    const bottomIcon = MenuIndex.getBottomIcon();
    const bottomPost = MenuIndex.getBottomPost();
    return {
      connection,
      ol,
      li,
      upper,
      upperSpace,
      upperRight,
      upperChild,
      upperTimeago,
      bottom,
      bottomIcon,
      bottomPost,
    }
  }

  static getConnection( {app} ){
    const layout = Style.getLayoutFlex({
      height: `${MenuIndex.liHeight / 2 }px`,
      borderBottom: Container.border,
      justifyContent: 'flex-start',
    });
    const content = Style.getContentBase({
      textIndent: '10px',
      textAlign: 'left',
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

  static getLi(){
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

  static getUpper(){
    const layout = Style.getLayoutFlex({
      justifyContent: 'space-between',
      height: '20px',
    });
    const content = Style.getContentBase({
      fontSize: '10px',
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getUpperSpace(){
    const layout = Style.getLayoutBlock({
      width: MenuIndex.iconSize,
      flexGrow: 1,
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getUpperRight(){
    const layout = Style.getLayoutFlex({
      flexGrow: 5,
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getUpperChild(){
    const layout = Style.getLayoutBlock({
      flexGrow: 1,
    });
    const content = Style.getContentBase({
      textAlign: 'left',
      textIndent: '25px',
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getUpperTimeago(){
    const layout = Style.getLayoutBlock({
      flexGrow: 4,
    });
    const content = Style.getContentBase({
      textAlign: 'right',
      fontSize: '10px',
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getBottom(){
    const layout = Style.getLayoutFlex({
      alignItems: 'unset',
      height: '50px',
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getBottomIcon(){
    const layout = Style.getLayoutBlock({
      flexGrow:  1,
      width: '50px',
      height: MenuIndex.iconSize,
      backgroundImage: 'url("http://localhost:8080/favicon.ico")',
      backgroundPosition: '50% 50%',
      backgroundSize: '20px 20px',
      backgroundRepeat: 'no-repeat',
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getBottomPost(){
    const layout = Style.getLayoutBlock({
      flexGrow:  5,
      width: 'min-content',
      padding: '0px 5px 5px 10px',
    });
    const content = Style.getContentBase({
      lineHeight: 2,
      textAlign: 'left',
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }
}
