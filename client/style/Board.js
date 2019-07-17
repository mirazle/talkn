import App from '../../common/schemas/state/App';
import Style from './index';
import Container from './Container';
import Detail from './Detail';

export default class Board{
  static get size(){ return 54 }; 
  static get padding(){ return 5 }; 
  static get right(){ return 0 }; 
  static get activeColor(){ return Container.themeRGB }; 
  static get unactiveColor(){ return Container.fontBaseRGB }; 
  constructor( params ){
    const self = Board.getSelf( params );
    const ul = Board.getUl( params );
    const li = Board.getLi( params );
    const liChild = Board.getLiChild( params );
    const liBubble = Board.getLiBubble( params );
    const liPlay = Board.getLiPlay( params );
    const toggle = Board.getToggle( params );
    return {
      self,
      ul,
      li,
      liChild,
      liBubble,
      liPlay,
      toggle
    }
  }

  static getTotalWidth(app){
    return Board.size + ( Board.padding * 2 ) + Board.right;
  }

  static getSelfHeight(app){
    return app.isOpenBoard ? "237px" : "64px";
  }

  static getSelfBorderRadius(app){
    return "15px 2px 2px 15px";
  }

  static getSelfBackground(app){
    return app.isOpenBoard ? Container.lightRGBA : Container.whiteRGBA;
  }

  static getSelfRight(app, addUnit = false){
    const right =  app.screenMode === App.screenModeLargeLabel ?
      `calc( ${Detail.getWidth(app, true)} + ${Board.right}px )` : `${Board.right}px`;
    return addUnit ? right : Style.trimUnit( right ) ;
  }

  static getSelf( {app} ){
    const height = Board.getSelfHeight( app );
    const borderRadius = Board.getSelfBorderRadius( app );
    const background = Board.getSelfBackground( app );
    const right = Board.getSelfRight( app, true );
    const layout = Style.getLayoutFlex({
      position: 'fixed',
      top: '55px',
      right,
      height,
      width: "auto",
      padding: "5px",
      background,
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      boxShadow: "rgb(220, 220, 220) 0px 0px 5px",
      borderRadius
    });
    const content = {};
    const animation = Style.getAnimationBase({
      transition: Container.getTransitionFirstOn( app )
    });
    return Style.get({layout, content, animation});
  }

  static getUl( {app} ){
    const layout = Style.getLayoutFlex({
      height: "100%",
      width: "100%",
      justifyContent: "flex-start",
      flexDirection: "column"
    });
    const content = {};
    const animation = Style.getAnimationBase({
      transition: Container.getTransition( app )
    });
    return Style.get({layout, content, animation});
  }

  static getLi( {app} ){
    const size = Board.size + "px";
    const layout = Style.getLayoutFlex({
      flexDirection: "column",
      width: size,
      height: size,
      minWidth: size,
      minHeight: size,
      maxWidth: size,
      maxHeight: size,
      background: Container.whiteRGBA,
      borderRadius: "10px",
      marginBottom: "5px"
    });
    const content = Style.getContentBase({
      fontSize: "10px",
      lineHeight: "17px"
    });
    const animation = Style.getAnimationBase({
      transition: Container.getTransition( app )
    });
    return Style.get({layout, content, animation});
  }

  static getLiChild( {app} ){
    const color = App.isActiveMultistream( app, "getLiChild" ) ?
      Board.activeColor : Board.unactiveColor;
    const layout = {};
    const content = Style.getContentBase({
      color
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getLiBubble( {app} ){
    const color = app.isBubblePost ? Board.activeColor : Board.unactiveColor;
    const layout = {};
    const content = Style.getContentBase({
      color
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getLiPlay( {app} ){
//    const bgColor = app.isMediaConnection ? Container.themeRGB : Container.reliefRGB;
    const bgColor = Container.reliefRGB;
    const layout = {};
    const content = Style.getContentBase({
      color: bgColor
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }
  
  static getToggle( {app} ){
    const size = ( Board.size - 4 ) + "px";
    const layout = Style.getLayoutFlex({
      width: "100%",
      height: size,
      minHeight: size,
      maxHeight: size
    });
    const content = {};
    const animation = Style.getAnimationBase({
      transition: Container.getTransition( app )
    });
    return Style.get({layout, content, animation});
  }
}
