import App from '../../common/schemas/state/App';
import Style from './index';
import Container from './Container';
import Detail from './Detail';
import Posts from './Posts';
import Menu from './Menu';

export default class Board{
  static get size(){ return 54 }; 
  static get padding(){ return 5 }; 
  static get right(){ return 0 }; 
  static get activeColor(){ return Container.themeRGB }; 
  static get unactiveColor(){ return Container.fontBaseRGB }; 
  constructor( params ){
    const self = Board.getSelf( params );
    const menu = Board.getMenu( params );
    const menuUl = Board.getMenuUl( params );
    const menuLi = Board.getMenuLi( params );
    const menuLiChild = Board.getMenuLiChild( params );
    const menuLiBubble = Board.getMenuLiBubble( params );
    const menuLiPlay = Board.getMenuLiPlay( params );
    const menuToggle = Board.getMenuToggle( params );
    return {
      self,
      menu,
      menuUl,
      menuLi,
      menuLiChild,
      menuLiBubble,
      menuLiPlay,
      menuToggle
    }
  }

  static getTotalWidth(app){
    return Board.size + ( Board.padding * 2 ) + Board.right;
  }

  static getSelfTop(app){
    return "55px";
  }

  static getSelfWidth(app, addUnit = false){
    let width = "93%";
    if( app.isOpenMediaList ){
      if( app.extensionMode === App.extensionModeExtBottomLabel ){
        width = "93%";
      }else{
        switch( app.screenMode ){
        case App.screenModeSmallLabel :
          return "93%";
        case App.screenModeMiddleLabel :
          return `calc(97% - ${ Menu.getWidth( app, false ) })`
        case App.screenModeLargeLabel :
          width = `calc( ${ 97 - Detail.getWidth( app, false ) }% - ${Menu.getWidth( app, false ) } )`;
          break;
        }
      }
    }else{
      width = Board.getTotalWidth( app ) + "px";
    }
    return addUnit ? Style.trimUnit( width ) : width ;
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

  static getSelfBoxShadow(app, addUnit = false){
    return app.isOpenMediaList ? "rgb(220, 220, 220) 0px 0px 5px" : "rgb(220, 220, 220) 0px 0px 5px";
  }

  static getSelf( {app} ){
    const width = Board.getSelfWidth( app );
    const height = Board.getSelfHeight( app );
    const borderRadius = Board.getSelfBorderRadius( app );
    const background = Board.getSelfBackground( app );
    const right = Board.getSelfRight( app, true );
    const boxShadow = Board.getSelfBoxShadow( app );
    const layout = Style.getLayoutFlex({
      position: 'fixed',
      top: Board.getSelfTop(app),
      right,
      height,
      width,
      padding: "5px",
      background,
      flexDirection: "column",
      alignItems: "flex-end",
      justifyContent: "flex-end",
      boxShadow,
      borderRadius
    });
    const content = {};
    const animation = Style.getAnimationBase({
      transition: Container.getTransitionFirstOn( app )
    });
    return Style.get({layout, content, animation});
  }

  static getMenu( {app} ){
    const layout = Style.getLayoutFlex({
      width: Board.getTotalWidth( app ) + "px",
      flexDirection: "column",
      alignItems: "flex-end"
    });
    const content = {};
    const animation = {};
    return Style.get({layout, content, animation});
  }

  static getMenuUl( {app} ){
    const layout = Style.getLayoutFlex({
      height: "100%",
      width: "100%",
      justifyContent: "flex-start",
      alignItems: "flex-end",
      flexDirection: "column"
    });
    const content = {};
    const animation = Style.getAnimationBase({
      transition: Container.getTransition( app )
    });
    return Style.get({layout, content, animation});
  }

  static getMenuLi( {app} ){
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
      borderRadius: "5px",
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

  static getMenuLiChild( {app} ){
    const color = App.isActiveMultistream( app, "getLiChild" ) ?
      Board.activeColor : Board.unactiveColor;
    const layout = {};
    const content = Style.getContentBase({
      color
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getMenuLiBubble( {app} ){
    const color = app.isBubblePost ? Board.activeColor : Board.unactiveColor;
    const layout = {};
    const content = Style.getContentBase({
      color
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getMenuLiPlay( {app} ){
    const bgColor = app.isOpenMediaList ? Container.themeRGB : Container.reliefRGB;
    const layout = {};
    const content = Style.getContentBase({
      color: bgColor
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }
  
  static getMenuToggle( {app} ){
    const size = ( Board.size - 4 ) + "px";
    const layout = Style.getLayoutFlex({
      width: size,
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
