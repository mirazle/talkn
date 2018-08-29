import App from '../../common/schemas/state/App';
import Style from './index';
import Container from './Container';
import Main from './Main';
import Menu from './Menu';
import Detail from './Detail';

export default class Posts {

  static getMinWidth( app, addUnit = false ){
    let width = '300px';
    return addUnit ? Style.trimUnit( width ) : width ;
  }

  static getWidth( app, addUnit = false ){
    let width = 0;
    switch( app.screenMode ){
    case App.screenModeSmallLabel : width = '50.0%';break;
    case App.screenModeMiddleLabel :width = `${ app.width - Menu.getWidth( app, true )}px`;break;
    case App.screenModeLargeLabel :
      width = `calc( 100% - ${ Detail.getWidth( app, true ) + Menu.getWidth( app, true ) }px )`;
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

    const borders = app.screenMode === App.screenModeSmallLabel ?
      {borderRight: Container.border, borderLeft: Container.border} :
      {borderLeft: Container.border} ;

    const layout = Style.getLayoutInlineBlock({
      position: 'relative',
      width: Posts.getWidth( app ),
      minWidth: Posts.getMinWidth( app ),
      WebkitOverflowScrolling: 'touch',
      ...borders
    });
    const content = {};
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getOl( {app} ){
    const layout = Style.getLayoutBlock({
      width: '100%',
      height: `calc( 100% - ${Main.headerHeight}px )`,
      overflow: 'scroll',
      background: Container.whiteRGBA,
    });
    const content = {};
    const animation = Style.getAnimationBase({
      transition: Container.getTransitionOn( app ),
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
