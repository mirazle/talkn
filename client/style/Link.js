import App from '../../common/schemas/state/App';
import Style from './index';
import Container from './Container';
import MenuIndexListStyle from 'client/style/Menu/MenuIndexList';

export default class Link{
  static get tuneSize(){ return 50 }; 
  static get size(){ return 54 }; 
  static get padding(){ return 5 }; 
  static get right(){ return 0 }; 
  static get activeColor(){ return Container.themeRGB }; 
  static get unactiveColor(){ return Container.fontBaseRGB }; 
  static get activeBgColor(){ return Container.whiteRGBA} ;
  static get unactiveBgColor(){ return "rgba( 240, 240, 240, 0.96 )"} ; 
  constructor( params ){    
    const self = Link.getSelf( params );
    const tuneLi = Link.getTuneLi( params );
    const activeLi = Link.getActiveLi( params );
    const unactiveLi = Link.getUnactiveLi( params );

    return {
      self,
      tuneLi,
      activeLi,
      unactiveLi,
    }
  }

  static getSelf( {app} ){
    const size = Link.size + "px";
    const layout = Style.getLayoutFlex({
      alignItems: "flex-start",
      flexDirection: "column",
      width: "100%",
      height: size,
      minHeight: size,
      maxHeight: size,
      background: MenuIndexListStyle.activeLiSelfBackground,
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

  static getTuneLi( {app} ){
    const styles = Link.getActiveLi( {app} );
    styles.alignItems = "center";
    console.log( styles );
    return styles;
  }

  static getActiveLi( {app} ){
    const styles = Link.getSelf( {app} );
    styles.background = Link.activeBgColor;
    styles.color = Container.fontBaseRGB;
    return styles;
  }

  static getUnactiveLi( {app} ){
    const styles = Link.getSelf( {app} );
    styles.background = Link.unactiveBgColor;
    styles.color = Container.fontBaseRGB;
    return styles;
  }
}
