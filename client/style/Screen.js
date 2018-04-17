import App from '../../common/schemas/state/App';
import Style from './index';
import Container from './Container';
import Footer from './Footer';
import Menu from './Menu';
import DetailRight from './DetailRight';

export default class Screen {

  static getScreenWidth( app, addUnit = false ){
    let width = 0;
    switch( app.screenMode ){
    case App.screenModeSmallLabel : width = '200%';break;
    case App.screenModeMiddleLabel : width = `100%`;break;
    case App.screenModeLargeLabel : width = `100%`;break;
    }
    return addUnit ? Style.trimUnit() : width ;
  }

  static getScreenTransform( app ){
    let transform = 'translate3d( 0px ,0px, 0px )';
    switch( app.screenMode ){
    case App.screenModeSmallLabel : transform = 'translate3d( -50% ,0px, 0px )';break;
    case App.screenModeMiddleLabel : transform = 'translate3d( 0px ,0px, 0px )';break;
    case App.screenModeLargeLabel : transform = 'translate3d( 0px ,0px, 0px )';break;
    }
    return transform ;
  }

  constructor( params ){
    const self = Screen.getSelf( params );
    return {
      self,
    }
  }

  static getSelf( {app} ){
    const layout = Style.getLayoutBlock({
      width: Screen.getScreenWidth( app ),
      height: 'inherit',
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase({
      transform: Screen.getScreenTransform( app ),
      transition: Container.getTransitionOn( app ),
    });
    return Style.get({layout, content, animation});
  }
}
