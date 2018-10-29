import define from '../../common/define';
import App from '../../common/schemas/state/App';
import Style from './index';
import Container from './Container';
import Detail from './Detail';
import Menu from './Menu';

export default class Footer{

  static get selfHeight(){ return 45 };
  static getWidth( app, addUnit = false ){
    let width = 0;
    switch( app.screenMode ){
    case App.screenModeSmallLabel : width = '200%';break;
    case App.screenModeMiddleLabel :width = '100%';break;
    case App.screenModeLargeLabel :
      width = `calc( 100% - ${Detail.getWidth(app)})`;
      break;
    }
    return addUnit ? Style.trimUnit( width ) : width ;
  };

  static getLeft( app, addUnit = false ){
    let left = 0;
    switch( app.screenMode ){
    case App.screenModeSmallLabel : left = '0px';break;
    case App.screenModeMiddleLabel : left = '0px';break;
    case App.screenModeLargeLabel : left = '0px';break;
  }
    return addUnit ? Style.trimUnit( left ) : left ;
  };

  static getTransform( app ){
    let transform = 'translate3d( 0px, 0px, 0px )';

    if( app.type ===  define.APP_TYPES.EXTENSION){
      transform = app.isOpenMenu ? 'translate3d( 0%, 0px, 0px )' : 'translate3d( -50%, 0px, 0px )';
    }else{
      switch( app.screenMode ){
      case App.screenModeSmallLabel :
        transform = app.isOpenMenu ? 'translate3d( 100%, 0px, 0px )' : 'translate3d( 0px, 0px, 0px )';
        break;
      case App.screenModeMiddleLabel :
        transform = app.isOpenDetail ? `translate3d( -${Menu.baseWidth}, 0px, 0px )` : 'translate3d( 0px ,0px, 0px )';
        break;
      case App.screenModeLargeLabel : transform = 'translate3d( 0px ,0px, 0px )';break;
      }
    }
    return transform ;
  }

  static getBorders( app ){
    if( app.type ===  define.APP_TYPES.EXTENSION){
      return {border: 0};
    }else{
      return app.screenMode === App.screenModeSmallLabel ?
        {border: Container.border} :
        {borderTop: Container.border, borderBottom: Container.border} ;
    }
  }

  constructor( params ){
    const self = Footer.getSelf( params );
    return {
      self,
    }
  }

  static getSelf( {app} ){

    const borders = Footer.getBorders(app);

    const borderRadius = app.type === define.APP_TYPES.EXTENSION ?
      Container.radiuses : '0px';

    const layout = Style.getLayoutFlex({
      position: 'fixed',
      bottom: '0px',
      left: Footer.getLeft( app ),
      height: Footer.selfHeight,
      width: Footer.getWidth( app ),
//      background: Container.offWhiteRGBA,
      zIndex: Container.maxZIndex,
      borderRadius,
      justifyContent: "flex-start",
      ...borders
    });
    const content = {};
    const animation = Style.getAnimationBase({
      transform: Footer.getTransform( app ),
      transition: Container.getTransitionOn( app ),
    });
    return Style.get({layout, content, animation});
  }
}
