import conf from '../../../common/conf';
import App from '../../../common/schemas/state/App';
import Style from '../index';
import Container from '../Container';
import Main from '../Main';

export default class MenuIndex {

  static get iconSize(){ return '25px' };
  static get liHeight(){ return 90 };

  constructor( params ){
    const self = MenuIndex.getSelf( params );
    const header = MenuIndex.getHeader( params );
    const headerSearchIcon = MenuIndex.getHeaderSearchIcon( params );
    const headerRootConnection = MenuIndex.getHeaderRootConnection( params );
    const headerConnection = MenuIndex.getHeaderConnection( params );
    const headerInput = MenuIndex.getHeaderInput( params );
    const ol = MenuIndex.getOl( params );

    return {
      self,
      header,
      headerSearchIcon,
      headerRootConnection,
      headerConnection,
      headerInput,
      ol,
    }
  }

  static getSelf( {app} ){
    const layout = Style.getLayoutBlock({
      width: '100%',
      height: '100%',
      margin: '0 auto'
    });
    const content = Style.getContentBase({});
    const animation = Style.getAnimationBase({});
    return Style.get({layout, content, animation});
  }

  static getHeader( {app} ){

    const borders = app.screenMode === App.screenModeSmallLabel ?
      {borderBottom: Container.border, borderLeft: 0} :
      {borderBottom: Container.border, borderLeft: 0, borderRight: Container.border} ;

    const layout = Style.getLayoutBlock({
      width: '100%',
      height: `${MenuIndex.liHeight / 2 }px`,
      ...borders,
      background: Container.lightRGB,
    });
    const content = Style.getContentBase({
      textAlign: 'left',
    });
    const animation = Style.getAnimationBase({
      transition: Container.getTransition( app ),
    });
    return Style.get({layout, content, animation});
  }

  static getHeaderSearchIcon( {app} ){
    const layout = Style.getLayoutInlineBlock({
      width: '60px',
      minWidth: '60px',
      height: '45px',
    });
    const content = Style.getContentBase({});
    const animation = Style.getAnimationBase({
      transition: Container.getTransition( app ),
    });
    return Style.get({layout, content, animation});
  }

  static getHeaderRootConnection( {app} ){
    const layout = Style.getLayoutInlineBlock({
      position: 'absolute',
      top: '13px',
      left: '63px',
      width: 'fit-content',
      minWidth: '20px',
      height: '20px',
      padding: '0px 5px 1px 5px',
      background: Container.offWhiteRGB,
      border: Container.border,
      borderRadius: '3px',
    });
    const content = Style.getContentBase({
      fontSize: '10px',
    });
    const animation = Style.getAnimationBase({
      transition: Container.getTransition( app ),
    });
    return Style.get({layout, content, animation});
  }

  static getHeaderConnection( {app} ){
    const layout = Style.getLayoutInlineFlex({
      justifyContent: 'flexStart',
      width: `calc( 100% - 60px )`,
      overflow: 'scroll'
    });
    const content = Style.getContentBase({
      whiteSpace: 'nowrap',
      fontSize: '12px',
    });
    const animation = Style.getAnimationBase({
      transition: Container.getTransition( app ),
    });
    return Style.get({layout, content, animation});
  }

  static getHeaderInput(){
    const layout = Style.getLayoutInlineBlock({
      width: '90%',
      height: '25px',
      background: Container.whiteRGB,
      padding: '4px 0% 5px 2%',
      margin: '0 3% 0 0',
      outline: 'none',
      resize: 'none',
      border: Container.border,
      borderRadius: '3px',
      WebkitAppearance: 'none',
    });
    const content = Style.getContentBase({
      textIndent: '22px',
      textAlign: 'left',
    });
    const animation = Style.getAnimationBase();

    return Style.get({layout, content, animation});
  }

  static getOl( {app} ){
    const layout = Style.getLayoutBlock({
      width: '100%',
      height: `calc( 100% - ${Main.headerHeight}px )`,
      overflow: 'scroll',
      background: Container.chromeOffTabRGB,
//      boxShadow: '0px 1px 1px 1px rgb( 220, 220, 220 )inset',
    });
    const content = {};
    const animation = Style.getAnimationBase({
      transition: Container.getTransition( app ),
    });
    return Style.get({layout, content, animation});
  }

  static getLiActive(){
    const layout = Style.getLayoutBlock({
      position: 'relative',
      width: 'initial',
      height: `${MenuIndex.liHeight}px`,
      padding: '10px',
      borderBottom: Container.border,
      zIndex: 3,
      borderRight: `1px solid ${Container.white}`,
      background: Container.whiteRGB,
//      boxShadow: '5px 5px 5px 5px rgb( 240, 240, 240)',
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getLiUnactive(){
    const layout = Style.getLayoutBlock({
      position: 'relative',
      width: 'initial',
      height: `${MenuIndex.liHeight}px`,
      padding: '10px',
      borderBottom: Container.border,
      background: Container.offWhiteRGB,
      borderRight: Container.border,
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getUpper(){
    const layout = Style.getLayoutBlock({
      width: '100%',
      height: '20px',
    });
    const content = Style.getContentBase({
      fontSize: '10px',
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getUpperSpace(){
    const layout = Style.getLayoutInlineBlock({
      width: '20%',
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getUpperRight(){
    const layout = Style.getLayoutInlineBlock({
      width: '80%',
    });
    const content = Style.getContentBase({
      textAlign: 'left',
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getBottom(){
    const layout = Style.getLayoutBlock({
      width: '100%',
      height: '50px',
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getBottomIcon(){
    const layout = Style.getLayoutInlineBlock({
      width: '20%',
      height: '50px',
      backgroundImage: `url(${conf.protcol}:${conf.assetsPath}favicon.ico")`,
      backgroundPosition: '50% 15%',
      backgroundSize: '20px 20px',
      backgroundRepeat: 'no-repeat',
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getBottomPost(){
    const layout = Style.getLayoutInlineBlock({
      width: '80%',
      flexGrow:  2,
    });
    const content = Style.getContentBase({
      lineHeight: 2,
      textAlign: 'left',
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }
}
