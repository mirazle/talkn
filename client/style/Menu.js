import Style from './index';
import Container from './Container';
import Header from './Header';
import define from '../../common/define';
import App from '../../common/schemas/state/App';
import Main from './Main';

export default class Menu {

  static get baseWidth(){return "300px"}
  static getWidth( app, addUnit = false ){
    let width = 0;
    switch( app.screenMode ){
    case App.screenModeUndispLabel : width = '100.0%';break;
    case App.screenModeSmallLabel : width = '100.0%';break;
    case App.screenModeMiddleLabel : width = Menu.baseWidth;break;
    case App.screenModeLargeLabel : width = Menu.baseWidth;break;
    }

    return addUnit ? Style.trimUnit( width ) : width ;
  }

  static getTransform( app ){
    let transform = 'translate3d( 0px, 0px, 0px )';
    switch( app.screenMode ){
    case App.screenModeUndispLabel :
    case App.screenModeSmallLabel :
      transform = app.isOpenMenu ? 'translate3d( 0%, 0%, 0px )' : 'translate3d( -100% , 0%, 0px )';
      break;
    case App.screenModeMiddleLabel :
      transform = app.isOpenDetail ? `translate3d( 0px ,0px, 0px )` : 'translate3d( 0px ,0px, 0px )';
      break;
    case App.screenModeLargeLabel :
      transform = 'translate3d( 0px ,0px, 0px )';
      break;
    }
    return transform ;
  }

  constructor( params ){
    const self = Menu.getSelf( params );
    const wrapComponent = Menu.getWrapComponent( params );
    const footer = Menu.getFooter( params );
    const footerChild = Menu.getFooterChild( params );
    const footerChildMoney = Menu.getFooterChildMoney( params );
    return {
      self,
      wrapComponent,
      footer,
      footerChild,
      footerChildMoney,
    }
  }

  static getSelf( {app} ){
    const display = app.screenMode === App.screenModeUndispLabel ? "none" : "block";
    const background = app.extensionMode === App.extensionModeExtBottomLabel ?
      "none" : Container.reliefRGB;
    const layout = Style.getLayoutBlock({
      display,
      position: 'fixed',
      top: "0px",
      left: "0px",
      width: Menu.getWidth( app ),
      minWidth: Menu.getWidth( app ),
      height: "100%",
      minHeight: "auto",
      maHeight: "auto",
      margin: `${Header.headerHeight}px 0px 0px 0px`,
      background,
      WebkitOverflowScrolling: 'touch',
      overflow: 'scroll',
    });
    const content = {};
    const animation = Style.getAnimationBase({
      transition: Container.getTransition(app),
      transform: Menu.getTransform(app)
    });
    return Style.get({layout, content, animation});
  }

  static getWrapComponent( {app} ){

    const width = app.extensionMode === App.extensionModeExtBottomLabel ?    
      '90%' : '100%';

    const borders = app.screenMode === App.screenModeUndispLabel || app.screenMode === App.screenModeSmallLabel ?
      {borderRight: Container.border, borderLeft: Container.border,} :
      {borderLeft: Container.border} ;

    const layout = Style.getLayoutBlock({
      width,
      minWidth: 'inherit',
      maxWidth: 'inherit',
      height: `calc( 100% - ${Main.headerHeight * 2}px )`,
      margin: '0 auto',
      ...borders
    });
    const content = {};
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getWrap(){
    const layout = Style.getLayoutFlex({
      width: 'initial',
      height: '60px',
      minWidth: 'initial',
      minHeight: 'initial',
      borderRight: Container.border,
    });
    const content = Style.getContentBase({
      textAlign: 'left',
    });
    const animation = Style.getAnimationBase({});
    return Style.get({layout, content, animation});
  }

  static getFooter({app}){

    const borders = app.screenMode === App.screenModeUndispLabel || app.screenMode === App.screenModeSmallLabel?
      {border: Container.border} :
      {border: Container.border} ;

    const layout = Style.getLayoutFlex({
      width: '100%',
      background: Container.offWhiteRGB,
      height: `${Main.headerHeight}px`,
      ...borders
    });
    const content = Style.getContentBase({
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }


  static getFooterChild(){
    const layout = Style.getLayoutBlock({
      flexGrow: 1,
      height: '100%',
    });
    const content = Style.getContentBase({
      fontSize: '0.5em',
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getFooterChildMoney(){
    const layout = Style.getLayoutBlock({
      flexGrow: 1,
      height: '100%',
    });
    const content = Style.getContentBase({
      fontSize: '0.5em',
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }
}
