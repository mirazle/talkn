import conf from '../../common/conf';
import Style from './index';
import Container from './Container';

export default class Post {

  static get bubbleStampScale(){ return 2 };
  static get stampScale(){ return 1 };
  static get stampStyle(){ 
    return `display: flex;justify-content: center;align-items: center;width: 100%;height: 100%;transform: scale(${Post.bubbleStampScale});font-size: 50px;`
  }
  static get iconSize(){ return '25px' };

  constructor( params ){
    const self = Post.getSelf(params);
    const upper = Post.getUpper(params);
    const upperSpace = Post.getUpperSpace(params);
    const upperRight = Post.getUpperRight(params);
    const upperChild = Post.getUpperChild(params);
    const upperTimeago = Post.getUpperTimeago(params);
    const bottom = Post.getBottom(params);
    const bottomIcon = Post.getBottomIcon(params);
    const bottomPost = Post.getBottomPost(params);
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

  static getSelf({app}){
    const padding = app.isBubblePost ? '20px 20px 20px 0px' : '0px 20px 0px 0px';
    const minHeight = app.isBubblePost ? "75px" : "40px";
    const layout = Style.getLayoutBlock({
      width: 'calc( 100% - 20px )',
      minWidth: 'calc( 100% - 20px )',
      height: 'auto',
      minHeight,
      padding,
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getUpper({app}){
    const display = app.isBubblePost ? "flex" : "none";
    const layout = Style.getLayoutFlex({
      display,
      justifyContent: 'space-between',
      height: '20px',
    });
    const content = Style.getContentBase({
      fontSize: '11px',
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
      fontSize: '11px',
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getBottom(){
    const layout = Style.getLayoutFlex({
      width: "100%"
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getBottomIcon(){
    const layout = Style.getLayoutBlock({
      flexGrow:  1,
      width: Post.iconSize,
      height: Post.iconSize,
      backgroundImage: `url(${conf.protcol}:${conf.assetsPath}favicon.ico")`,
      backgroundPosition: '50% 50%',
      backgroundSize: '20px 20px',
      backgroundRepeat: 'no-repeat',
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getBottomPost({app}){
    const background = app.isBubblePost ? Container.themeRGBA : "none";
    const color = app.isBubblePost ? Container.whiteRGBA : "rgba(160, 160, 160)";
    const padding = app.isBubblePost ? '15px 15px 15px 25px' : '0px';
    const layout = Style.getLayoutBlock({
      flexGrow:  5,
      width: 'min-content',
      background,
      padding,
      margin: "0px 1% 0px 0px",
      borderRadius: '10px',
      maxWidth: '79%',
    });
    const content = Style.getContentBase({
      color,
      lineHeight: 2.0,
      fontSize: '13px',
      textAlign: 'left',
      cursor: 'pointer',
      wordWrap: "break-word",
      overflowWrap: "break-word"
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }
}
