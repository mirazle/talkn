import App from '../../common/schemas/state/App';
import Style from './index';
import Container from './Container';
import Main from './Main';
import Menu from './Menu';
import DetailRight from './DetailRight';
import DetailModal from './DetailModal';

export default class Posts {

  static getMinWidth( app, addUnit = false ){
    let width = '300px';
    return addUnit ? Style.trimUnit( width ) : width ;
  }

  static getWidth( app, addUnit = false ){
    let width = 0;
    switch( app.screenMode ){
    case App.screenModeSmallLabel : width = '50.0%';break;
    case App.screenModeMiddleLabel :width = `calc( 100% - ${Menu.getWidth( app )})`;break;
    case App.screenModeLargeLabel :
      width = `calc( ${100 - DetailRight.getWidth( app, true )}% - ${Menu.getWidth( app, true )}px )`;
      break;
    }
    return addUnit ? Style.trimUnit( width ) : width ;
  }

  constructor( params ){
    const self = Posts.getSelf( params );
    const ol = Posts.getOl( params );
    const more = Posts.getMore( params );
    return {
      self,
      ol,
      more,
    }
  }

  static closeIndexTransform( {app} ){
    switch( app.screenMode ){
    case App.screenModeSmallLabel : return `translate3d( -${app.width}px, 0px, 0px)`;
    case App.screenModeMiddleLabel : return `translate3d( -${Menu.getWidth( app )}px, 0px, 0px)`;
    case App.screenModeLargeLabel : return `translate3d( -${Menu.getWidth( app )}px, 0px, 0px)`;
    }
  };
  static openIndexTransform( option ){
    return `translate3d( 0px, 0px, 0px)`
  };

  static get headerHeight(){ return 35 };

  static getSelf( {app} ){
    const layout = Style.getLayoutInlineBlock({
      width: Posts.getWidth( app ),
      minWidth: Posts.getMinWidth( app ),
      WebkitOverflowScrolling: 'touch',
    });
    const content = {};
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getOl(){
    const layout = Style.getLayoutBlock({
      width: '100%',
      height: `calc( 100% - ${Main.headerHeight}px )`,
      overflow: 'scroll',
      background: Container.whiteRGBA,
    });
    const content = {};
    const animation = Style.getAnimationBase({
      transition: '600ms',
    });
    return Style.get({layout, content, animation});
  }

  static getMore(){
    const layout = Style.getLayoutBlock({
      width: '50%',
      height: Container.notifHeight,
      margin: '15px auto',
      zIndex: '10',
      background: Container.themeRGBA,
      borderRadius: '20px',

    });
    const content = Style.getContentBase({
      lineHeight: 2,
      color: Container.whiteRGB,
      cursor: 'pointer',
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }
}
