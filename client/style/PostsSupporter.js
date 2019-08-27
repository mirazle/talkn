import define from '../../common/define';
import App from '../../common/schemas/state/App';
import Style from './index';
import Container from './Container';
import PostsFooter from './PostsFooter';

export default class PostsSupporter{

  static get selfHeight(){ return 180 };
  static getTransform( app ){
    return app.isOpenPostsSupporter ? 
    `translate3d( 0px, -${ PostsSupporter.selfHeight + PostsFooter.selfHeight }px, 0px )` : 'translate3d( 0px, 0px, 0px )';
  }

  constructor( params ){
    const self = PostsSupporter.getSelf( params );
    const emoji = PostsSupporter.getEmoji( params );
    const emojiLabel = PostsSupporter.getEmojiLabel( params );
    return {
      self,
      emoji,
      emojiLabel
    }
  }

  static getSelf( {app} ){
    const layout = Style.getLayoutFlex({
      display: "flex",
      position: "fixed",
      bottom: `-${ PostsSupporter.selfHeight }px`,
      left: PostsFooter.getLeft( app ),
      height: PostsSupporter.selfHeight,
      width: PostsFooter.getWidth( app ),
      maxWidth:  PostsFooter.getWidth( app ),
      color: Container.whiteRGB,
      flexFlow: "column wrap",
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
      transition: Container.getTransitionFirstOn( app ),
      transform: PostsSupporter.getTransform( app )
    });
    return Style.get({layout, content, animation});
  }

  static getEmoji( {app} ){
    const fontSize = App.screenModeSmallLabel === app.screenMode ? "35px" : "40px";
    const layout = Style.getLayoutFlex({
      minWidth: "20%",
      maxWidth: "20%",
      height: '90px',
      flexFlow: "row wrap",
      alignItems: "center",
      justifyContent: "center",
      padding: "5px"
    });
    const content = Style.getContentBase({
      fontSize,
      cursor: 'pointer',
    });
    const animation = Style.getAnimationBase({
      transition: Container.getTransition( app ),
      transform: 'scale(1.0)'
    });
    return Style.get({layout, content, animation});
  }

  static getEmojiLabel( {app} ){
    const margin = App.screenModeSmallLabel === app.screenMode ? "0px" : "0px";
    const fontSize = App.screenModeSmallLabel === app.screenMode ? "8px" : "10px";
    const layout = Style.getLayoutFlex({
      width: "100%",
      minWidth: "100%",
      height: "30px",
      margin
    });
    const content = Style.getContentBase({
      wordBreak: "break-word",
      fontSize,
      color: Container.whiteRGB
    });
    const animation = Style.getAnimationBase({
    });
    return Style.get({layout, content, animation});
  }
}
