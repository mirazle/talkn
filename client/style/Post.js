import conf from '../../common/conf';
import Style from './index';
import Container from './Container';

export default class Post {

  static get bubbleStampScale(){ return 2 };
  static get stampScale(){ return 1 };
  static get stampStyle(){ 
    return `display: flex;justify-content: center;align-items: center;width: 100%;height: 100%;transform: scale(${Post.bubbleStampScale});font-size: 50px;`
  }
  static get fontSize(){ return 14 };
  static get iconSize(){ return '25px' };

  constructor( params ){
    const self = Post.getSelf(params);
    const upper = Post.getUpper(params);
    const upperChild = Post.getUpperChild(params);
    const upperTitle = Post.getUpperTitle(params);
    const upperTimeago = Post.getUpperTimeago(params);
    const bottom = Post.getBottom(params);
    const bottomIcon = Post.getBottomIcon(params);
    const bottomPost = Post.getBottomPost(params);
    return {
      self,
      upper,
      upperChild,
      upperTitle,
      upperTimeago,
      bottom,
      bottomIcon,
      bottomPost,
    }
  }

  static getSelf({app}){
    const padding = app.isBubblePost ? '15px 15px 15px 0px' : '0px 15px 0px 0px';
    const minHeight = app.isBubblePost ? "75px" : "40px";
    const layout = Style.getLayoutBlock({
      width: 'calc( 100% - 0px )',
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
      height: '20px'
    });
    const content = Style.getContentBase({
      fontSize: '8px',
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getUpperChild(){
    const layout = Style.getLayoutFlex({
      alignItems: "flex-start",
      justifyContent: "flex-start",
      flexGrow:  2,
      width: "20%",
      minWidth: "20%",
      maxWidth: "20%",
    });
    const content = Style.getContentBase({
      textAlign: 'left',
      textIndent: '10px',
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getUpperTitle(){
    const layout = Style.getLayoutFlex({
      alignItems: "flex-start",
      justifyContent: "flex-start",
      flexGrow:  6,
      width: "60%",
      minWidth: "60%",
      maxWidth: "60%",
      padding: "0px 0px 0px 10px"
    });
    const content = Style.getContentBase({
      textAlign: 'left',
      wordBreak: "break-all"
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getUpperTimeago(){
    const layout = Style.getLayoutFlex({
      alignItems: "flex-start",
      justifyContent: "flex-start",
      flexGrow:  2,
      width: "20%",
      minWidth: "20%",
      maxWidth: "20%",
    });
    const content = Style.getContentBase({
      textAlign: 'right'
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getBottom(){
    const layout = Style.getLayoutFlex({});
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getBottomIcon(){
    const layout = Style.getLayoutBlock({
      flexGrow:  2,
      width: "20%",
      minWidth: "20%",
      maxWidth: "20%",
      height: Post.iconSize,
      backgroundImage: `url(${conf.protcol}:${conf.assetsPath}favicon.ico")`,
      backgroundPosition: '50% 50%',
      backgroundSize: '24px 24px',
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
      flexGrow:  8,
      width: "79%",
      minWidth: "79%",
      maxWidth: "79%",
      background,
      padding,
      margin: "0px 1% 0px 0px",
      borderRadius: '10px',

    });
    const content = Style.getContentBase({
      color,
      lineHeight: 1.7,
      fontSize: `${Post.fontSize}px`,
      textAlign: 'left',
      cursor: 'pointer',
      wordWrap: "break-word",
      overflowWrap: "break-word"
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }
}
