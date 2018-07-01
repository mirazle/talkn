import Style from '../index';
import Container from '../Container';
import Main from '../Main';

export default class MenuIndexList {

  static get iconSize(){ return '25px' };

  static get liHeight(){ return 90 };

  constructor( params ){
    const liActiveSelf = MenuIndexList.getLiActiveSelf();
    const liUnactiveSelf = MenuIndexList.getLiUnactiveSelf();
    const upper = MenuIndexList.getUpper();
    const upperSpace = MenuIndexList.getUpperSpace();
    const upperRight = MenuIndexList.getUpperRight();
    const bottom = MenuIndexList.getBottom();
    const bottomIcon = MenuIndexList.getBottomIcon();
    const bottomPost = MenuIndexList.getBottomPost();
    return {
      liActiveSelf,
      liUnactiveSelf,
      upper,
      upperSpace,
      upperRight,
      bottom,
      bottomIcon,
      bottomPost,
    }
  }

  static getLiActiveSelf(){
    const layout = Style.getLayoutBlock({
      position: 'relative',
      width: 'initial',
      height: `${MenuIndexList.liHeight}px`,
      padding: '10px',
      borderBottom: Container.border,
      zIndex: 3,
      borderRight: `1px solid ${Container.white}`,
      background: Container.whiteRGB,
      cursor: 'pointer',
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getLiUnactiveSelf(){
    const layout = Style.getLayoutBlock({
      position: 'relative',
      width: 'initial',
      height: `${MenuIndexList.liHeight}px`,
      padding: '10px',
      borderBottom: Container.border,
      background: Container.offWhiteRGB,
      borderRight: Container.border,
      cursor: 'pointer',
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase({
      transition: '200ms',
    });
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
