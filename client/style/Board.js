import App from '../../common/schemas/state/App';
import Style from './index';
import Container from './Container';
import Detail from './Detail';
import Posts from './Posts';
import Menu from './Menu';

export default class Board{
  static get tuneSize(){ return 50 }; 
  static get size(){ return 54 }; 
  static get padding(){ return 5 }; 
  static get right(){ return 0 }; 
  static get activeColor(){ return Container.themeRGB }; 
  static get unactiveColor(){ return Container.fontBaseRGB }; 
  constructor( params ){
    // BOARD DEFAULT LAYOUT
    const self = Board.getSelf( params );
    const menu = Board.getMenu( params );
    const menuUl = Board.getMenuUl( params );
    const menuLi = Board.getMenuLi( params );
    const menuLiChild = Board.getMenuLiChild( params );
    const menuLiBubble = Board.getMenuLiBubble( params );
    const menuLiLinks = Board.getMenuLiLinks( params );
    const menuToggle = Board.getMenuToggle( params );

    // LINKS LAYOUT
    const links = Board.getLinks( params );
    const linksUl = Board.getLinksUl( params );
    const linksLi = Board.getLinksLi( params );

    const linksLiActive = Board.getLinksLiActive( params );
    const linksLiUnactive = Board.getLinksLiUnactive( params );

    const linksTuneLi = Board.getLinksTuneLi( params );
    const linkMenuUl = Board.getLinkMenuUl( params );
    const linkMenuLi = Board.getLinkMenuLi( params );

    // LINK TAB LAYOUT
    const linksTabActive = Board.getLinksTabActive( params );
    const linksTabUnactive = Board.getLinksTabUnactive( params );
    const linksTabLast = Board.getLinksTabLast( params );
    return {
      // BOARD DEFAULT LAYOUT
      self,
      menu,
      menuUl,
      menuLi,
      menuLiChild,
      menuLiBubble,
      menuLiLinks,
      menuToggle,

      links,
      linksUl,
      linksLi,

      linksLiActive,
      linksLiUnactive,

      linksTuneLi,
      linkMenuUl,
      linkMenuLi,

      // LINK TAB LAYOUT
      linksTabActive,
      linksTabUnactive,
      linksTabLast
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
    if( app.isOpenLinks ){
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
    return "10px 0px 0px 10px";
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
    return app.isOpenLinks ? "rgb(220, 220, 220) 0px 0px 5px" : "rgb(220, 220, 220) 0px 0px 5px";
  }

  static getLinksDisplay(app){
    return app.isOpenLinks ? "flex" : "none";
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
      overflow: "hide",
      right,
      height,
      width,
      padding: "5px",
      background,
      flexDirection: "row",
      alignItems: "flex-start",
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
      height: "100%",
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
    console.log( "== " + color );
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

  static getMenuLiLinks( {app} ){
    const bgColor = app.dispThreadType === App.dispThreadTypeMulti || app.dispThreadType === App.dispThreadTypeSingle ?
      Container.themeRGB : Container.reliefRGB;
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

  static getLinks( {app} ){
    const display = Board.getLinksDisplay(app);
    const layout = Style.getLayoutFlex({
      display,
      width: "100%",
      height: `calc( 100% )`,
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      padding: "0px 3px 0px 0px"
    });
    const content = Style.getContentBase({
      fontSize: "14px"
    });
    const animation = {};
    return Style.get({layout, content, animation});
  }

  static getLinksUl( {app} ){
    const layout = Style.getLayoutFlex({
      height: "100%",
      width: "100%",
      justifyContent: "flex-start",
      alignItems: "flex-end",
      flexDirection: "column",
      overflow: "scroll",
      overflowScrolling: "touch",
      WebkitOverflowScrolling: "touch"
    });
    const content = {};
    const animation = Style.getAnimationBase({
      transition: Container.getTransition( app )
    });
    return Style.get({layout, content, animation});
  }

  static getLinksLi( {app} ){
    const size = Board.size + "px";
    const layout = Style.getLayoutFlex({
      alignItems: "flex-start",
      flexDirection: "column",
      width: "100%",
      height: size,
      minHeight: size,
      maxHeight: size,
      background: Container.whiteRGBA,
      borderRadius: "5px",
      padding: "0px 0px 0px 10px",
      marginBottom: "5px"
    });
    const content = Style.getContentBase({
      cursor: 'pointer',
      fontSize: "14px",
      lineHeight: "17px"
    });
    const animation = Style.getAnimationBase({
      transition: Container.getTransition( app )
    });
    return Style.get({layout, content, animation});
  }

  static getLinksLiActive( {app} ){
    const styles = Board.getLinksLi( {app} );
    styles.background = Container.whiteRGB;
    styles.color = Container.fontBaseRGB;
    return styles;
  }

  static getLinksLiUnactive( {app} ){
    const styles = Board.getLinksLi( {app} );
    styles.background = Container.calmRGB;
    styles.color = Container.fontBaseRGB;
    return styles;
  }

  static getLinksTuneLi( {app} ){
    const styles = Board.getLinksLi( {app} );
    styles.alignItems = "center";
    return styles;
  }
  
  static getLinkMenuUl( {app} ){
    const size = Board.size + "px";
    const layout = Style.getLayoutFlex({
      minHeight: size,
      height: size,
      width: "100%",
      justifyContent: "flex-start",
      alignItems: "flex-end",
      flexDirection: "row"
    });
    const content = {};
    const animation = Style.getAnimationBase({
      transition: Container.getTransition( app )
    });
    return Style.get({layout, content, animation});
  }

  static getLinkMenuLi( {app} ){
    const size = ( Board.size - 4 ) + "px";
    const layout = Style.getLayoutFlex({
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      flexGrow: 1,
      margin: "5px 1% 0px 0px",
      height: size,
      minHeight: size,
      maxHeight: size,
      background: Container.reliefRGB,
      borderRadius: "5px"
    });
    const content = Style.getContentBase({
      cursor: 'pointer',
      fontSize: "14px",
      lineHeight: "17px",
      color: Container.whiteRGB
    });
    const animation = Style.getAnimationBase({
      transition: Container.getTransition( app )
    });
    return Style.get({layout, content, animation});
  }

  static getLinksTabActive( {app} ){
    const styles = {}
    styles.background = Container.whiteRGBA;
    styles.color = Container.fontBaseRGB;
    return styles;
  }

  static getLinksTabUnactive( {app} ){
    const styles = Board.getLinkMenuLi({app});
    return styles;
  }

  static getLinksTabLast( {app} ){
    const styles = {};
    styles.margin = "5px 0px 0px 0px";
    return styles;
  }
}
