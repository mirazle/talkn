import define from '../../common/define';
import App from '../../common/schemas/state/App';
import Style from './index';
import Container from './Container';
import PostsFooter from './PostsFooter';

export default class ExtScreen {

  constructor( params ){
    const self = ExtScreen.getSelf( params );
    return {
      self
    }
  }

  static getSelfTransform(app, call){

    if( app.extensionMode === App.extensionModeExtBottomLabel ){
      return app.isDispPosts ?
        "translate3d(0px, -100%, 0px)" : `translate3d(0px, 0%, 0px)`;
    }else{
      return "translate3d(0px, 0px, 0px)";
    }
  }

  static getSelfTransition(app){
    if( app.extensionMode === App.extensionModeExtBottomLabel ){
      return app.isDispPosts ? `${Container.transitionOn}ms` :  `${Container.transitionOn}ms`;
    }else{
      return "0ms";
    }
  }

  static getSelf({app}){
    const layout = Style.getLayoutFlex({
      position: "fixed",
      top: "100%",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      height: "100%"

    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase({
      transform: ExtScreen.getSelfTransform(app),
      transition: ExtScreen.getSelfTransition(app)
    });
    return Style.get({layout, content, animation});
  }
}
