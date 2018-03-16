import Style from './index';
import Container from './Container';

export default class Post {

  static get iconSize(){ return '25px' };

  constructor( params ){
    const self = Post.getSelf();
    const upper = Post.getUpper();
    const upperSpace = Post.getUpperSpace();
    const upperRight = Post.getUpperRight();
    const upperChild = Post.getUpperChild();
    const upperTimeago = Post.getUpperTimeago();
    const bottom = Post.getBottom();
    const bottomIcon = Post.getBottomIcon();
    const bottomPost = Post.getBottomPost();
    return {
      self,
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

  static getSelf( bootOption ){
    const layout = Style.getLayoutBlock({
      width: 'initial',
      height: 'initial',
      margin: '20px 20px 20px 0px',
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
      width: Post.iconSize,
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
    const layout = Style.getLayoutFlex();
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getBottomIcon(){
    const layout = Style.getLayoutBlock({
      flexGrow:  1,
      width: Post.iconSize,
      height: Post.iconSize,
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
      background: Container.themeRGBA,
      padding: '20px 20px 20px 25px',
      borderRadius: '10px',
      maxWidth: '79%',
    });
    const content = Style.getContentBase({
      color: 'rgb(255,255,255)',
      textAlign: 'left',
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }
}
