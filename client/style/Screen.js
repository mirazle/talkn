import App from '../../common/schemas/state/App';
import Style from './index';
import Container from './Container';
import Detail from './Detail';
import Menu from './Menu';

export default class Screen {

  static getWidth( app, addUnit = false ){
    let width = 0;
    switch( app.screenMode ){
    case App.screenModeSmallLabel : width = '200%';break;
    case App.screenModeMiddleLabel : width = `calc( 100% + ${ Detail.getWidth( app ) } )`;break;
    case App.screenModeLargeLabel :
      width = '100%';
      break;
    }
    return addUnit ? Style.trimUnit( width ) : width ;
  }

  static getTransform( app ){
    let transform = 'translate3d( 0px ,0px, 0px )';
    switch( app.screenMode ){
    case App.screenModeSmallLabel :
      transform = app.isOpenMenu ? 'translate3d( 0% ,0px, 0px )' : 'translate3d( -50% ,0px, 0px )';
      break;
    case App.screenModeMiddleLabel :
      transform = app.isOpenMenu ? 'translate3d( 0% ,0px, 0px )' : 'translate3d( -50% ,0px, 0px )';
      transform = app.isOpenDetail ? `translate3d( -${Menu.baseWidth} ,0px, 0px )` : 'translate3d( 0px ,0px, 0px )';
      break;
    case App.screenModeLargeLabel :
      transform = 'translate3d( 0px ,0px, 0px )';
      break;
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
    const display = app.isOpenNotif ? 'none' : 'block';
    const layout = Style.getLayoutBlock({
      display,
      width: Screen.getWidth( app ),
      height: 'inherit',
      margin: "0 auto"
    });
    const content = Style.getContentBase({
      textAlign: 'left',
    });
    const animation = Style.getAnimationBase({
      transform: Screen.getTransform( app ),
      transition: Container.getTransition( app ),
    });
    return Style.get({layout, content, animation});
  }
}
