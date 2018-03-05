import Style from './index';
import Container from './Container';
import Thread from './Thread';

export default class Post {
  constructor( params ){
    const self = Post.getSelf();
    const upper = Post.getUpper();
    const upperLeft = Post.getUpperLeft();
    const upperRight = Post.getUpperRight();
    const bottom = Post.getBottom();
    const bottomLeft = Post.getBottomLeft();
    const bottomRight = Post.getBottomRight();
    return {
      self,
      upper,
      upperLeft,
      upperRight,
      bottom,
      bottomLeft,
      bottomRight,
    }
  }

  static getSelf( bootOption ){
    const layout = Style.getLayoutBlock({
      width: 'initial',
      height: 'initial',
      clear: 'both',
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

  static getUpperLeft(){
    const layout = Style.getLayoutBlock({
      margin: '0px 0px 0px 50px',
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getUpperRight(){
    const layout = Style.getLayoutBlock();
    const content = Style.getContentBase({
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

  static getBottomLeft(){
    const layout = Style.getLayoutBlock({
      flexGrow:  1,
      width: '25px',
      height: '25px',
      backgroundImage: 'url("http://localhost:8080/favicon.ico")',
      backgroundPosition: '50% 50%',
      backgroundSize: '20px 20px',
      backgroundRepeat: 'no-repeat',
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getBottomRight(){
    const layout = Style.getLayoutBlock({
      flexGrow:  5,
      background: Container.themeRGBA,
      padding: '20px 20px 20px 25px',
      borderRadius: '10px',
    });
    const content = Style.getContentBase({
      color: 'rgb(255,255,255)',
      textAlign: 'left',
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }
}
