import App from '../../common/schemas/state/App';
import Style from './index';
import Container from './Container';
import Main from './Main';

import Menu from './Menu';

export default class MenuFooter{

  static getWidth( app, addUnit = false ){
    let width = 0;
    switch( app.screenMode ){
    case App.screenModeSmallLabel : width = '100%';break;
    case App.screenModeMiddleLabel : width = Menu.baseWidth;break;
    case App.screenModeLargeLabel : width = Menu.baseWidth;break;
    }
    return addUnit ? Style.trimUnit( width ) : width ;
  };

  constructor( params ){
    const self = MenuFooter.getSelf( params );
    const child = MenuFooter.getChild( params );
    const childMoney = MenuFooter.getChildMoney( params );
    return {
      self,
      child,
      childMoney
    }
  }

  static getSelf({app}){

    const borders = app.screenMode === App.screenModeSmallLabel ?
      {border: Container.border} :
      {border: Container.border} ;

    const layout = Style.getLayoutFlex({
      width: MenuFooter.getWidth(app),
      minWidth: MenuFooter.getWidth(app),
      height: `${Main.headerHeight}px`,
      background: Container.offWhiteRGB,
      ...borders
    });
    const content = Style.getContentBase({
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }


  static getChild(){
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

  static getChildMoney(){
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
