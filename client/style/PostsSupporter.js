import define from '../../common/define';
import App from '../../common/schemas/state/App';
import Style from './index';
import Container from './Container';
import PostsFooter from './PostsFooter';

export default class PostsSupporter{

  static get selfHeight(){ return 45 };
  static getTransform( app ){
    return app.isOpenPostsSupporter ? 
    `translate3d( 0px, -${ PostsSupporter.selfHeight + PostsFooter.selfHeight }px, 0px )` : 'translate3d( 0px, 0px, 0px )';
  }

  constructor( params ){
    const self = PostsSupporter.getSelf( params );
    const emoji = PostsSupporter.getEmoji( params );
    return {
      self,
      emoji
    }
  }

  static getSelf( {app} ){
    const layout = Style.getLayoutFlex({
      display: "flex",
      position: "fixed",
      bottom: `-${ PostsSupporter.selfHeight }px`,
      left: PostsFooter.getLeft( app ),
      height: PostsFooter.selfHeight,
      width: PostsFooter.getWidth( app ),
      maxWidth:  PostsFooter.getWidth( app ),
      color: Container.whiteRGB,
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
    const layout = Style.getLayoutFlex({
      minWidth: "70px",
      alignItems: "center",
      justifyContent: "center",
    });
    const content = Style.getContentBase({
      fontSize: "30px",
      cursor: 'pointer',
    });
    const animation = Style.getAnimationBase({
      transition: Container.getTransition( app ),
      transform: 'scale(1.0)'
    });
    return Style.get({layout, content, animation});
  }
}
