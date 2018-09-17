import Style from './index';
import Container from './Container';
import App from '../../common/schemas/state/App';
import Main from './Main';

export default class Menu {

  static getWidth( app, addUnit = false ){
    let width = 0;
    switch( app.screenMode ){
    case App.screenModeSmallLabel : width = '50.0%';break;
    case App.screenModeMiddleLabel : width = '300px';break;
    case App.screenModeLargeLabel : width = '300px';break;
    }

    return addUnit ? Style.trimUnit( width ) : width ;
  }

  static getTransform( app ){
    let transform = 'translate3d( 0px ,0px, 0px )';
    switch( app.screenMode ){
    case App.screenModeSmallLabel : transform = 'translate3d( 0px ,0px, 0px )';break;
    case App.screenModeMiddleLabel :
      transform = app.isOpenDetail ? `translate3d( 0px ,0px, 0px )` : 'translate3d( 0px ,0px, 0px )';
      break;
    case App.screenModeLargeLabel : transform = 'translate3d( 0px ,0px, 0px )';break;
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
    const layout = Style.getLayoutInlineBlock({
      position: 'relative',
      width: Menu.getWidth( app ),
      minWidth: Menu.getWidth( app ),
      maxWidth: 'inherit',
      height: '100%',
      WebkitOverflowScrolling: 'touch',
      overflow: 'scroll',
    });
    const content = {};
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getWrapComponent( {app} ){

    const borders = app.screenMode === App.screenModeSmallLabel ?
      {borderRight: Container.border, borderLeft: Container.border,} :
      {borderLeft: Container.border} ;

    const layout = Style.getLayoutBlock({
      width: '100%',
      minWidth: 'inherit',
      maxWidth: 'inherit',
      height: `calc( 100% - ${Main.headerHeight}px )`,
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

    const borders = app.screenMode === App.screenModeSmallLabel ?
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
