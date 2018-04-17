import App from '../../common/schemas/state/App';
import Style from './index';
import Container from './Container';
import Menu from './Menu';
import Posts from './Posts';
import Detail from './Detail';

export default class Footer{

  static get selfHeight(){ return 45 };
  static getWidth( app, addUnit = false ){
    const width = '100%';
    return addUnit ? Style.trimUnit( width ) : width ;
  };

  static getLeftWidth( app, addUnit = false ){
    let width = 0;
    switch( app.screenMode ){
    case App.screenModeSmallLabel : width = '0%';break;
    case App.screenModeMiddleLabel :width = Menu.getWidth( app );break;
    case App.screenModeLargeLabel : width = Menu.getWidth( app );break;
    }
    return addUnit ? Style.trimUnit( width ) : width ;
  }

  static getCenterWidth( app, addUnit = false ){
    let width = 0;
    switch( app.screenMode ){
    case App.screenModeSmallLabel : width = '100%';break;
    case App.screenModeMiddleLabel :width = Posts.getWidth( app );break;
    case App.screenModeLargeLabel : width = Posts.getWidth( app );break;
    }
    return addUnit ? Style.trimUnit( width ) : width ;
  }

  static getRightWidth( app, addUnit = false ){
    let width = 0;
    switch( app.screenMode ){
    case App.screenModeSmallLabel : width = '0%';break;
    case App.screenModeMiddleLabel :width = '0%';break;
    case App.screenModeLargeLabel : width = Detail.getWidth( app );break;
    }
    return addUnit ? Style.trimUnit( width ) : width ;
  }

  constructor( params ){
    const self = Footer.getSelf( params );
    const left = Footer.getLeft( params );
    const center = Footer.getCenter( params );
    const footer = Footer.getFooter( params );
    const right = Footer.getRight( params );
    const icon = Footer.getIcon( params );
    const textarea = Footer.getTextarea();
    const button = Footer.getButton();
    return {
      self,
      left,
      center,
      footer,
      right,
      icon,
      textarea,
      button,
    }
  }

  static getLayout( style ){
    const common = Footer.getLayoutCommon();
    return {...style, ...common }
  }

  static getContent( style ){
    const common = Footer.getContentCommon();
    return {...style, ...common }
  }

  static getAnimation( style ){
    const common = Footer.getAnimationCommon();
    return {...style, ...common }
  }

  static getLayoutCommon(){
    return {
      height: '25px',
    }
  }

  static getContentCommon(){
    return {}
  }

  static getAnimationCommon(){
    return {}
  }

  static getSelf( {app} ){
    const layout = Style.getLayoutFlex({
      height: Footer.selfHeight,
      width: Footer.getWidth( app ),
      zIndex: Container.maxZIndex,
    });
    const content = {};
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getLeft( {app} ){
    const layout = Style.getLayoutInlineBlock({
      width: Footer.getLeftWidth( app ),
      minWidth: Footer.getLeftWidth( app ),
    });
    const content = {};
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getCenter( {app} ){
    const layout = Style.getLayoutInlineBlock({
      width: Footer.getCenterWidth( app ),
      minWidth: Footer.getCenterWidth( app ),

    });
    const content = {};
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getFooter( {app} ){
    const layout = Style.getLayoutFlex({
      borderTop: Container.border,
      width: '100%',
      minWidth: '100%',
      background: Container.offWhiteRGBA,
    });
    const content = {};
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getRight( {app} ){
    const layout = Style.getLayoutInlineBlock({
      width: Footer.getRightWidth( app ),
      minWidth: Footer.getRightWidth( app ),
    });
    const content = {};
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getIcon( {thread} ){
    const layoutInlineBlock = Style.getLayoutInlineBlock({
      width: '20%',
      backgroundImage: `url()`,
      backgroundPosition: 'center center',
      backgroundSize: '20px 20px',
      backgroundRepeat: 'no-repeat',
    });
    const layout = Footer.getLayout( layoutInlineBlock );
    const content = {};
    const animation = {};
    return Style.get({layout, content, animation});
  }

  static getTextarea(){
    const layoutInlineBlock = Style.getLayoutInlineBlock({
      width: '54%',
      background: Container.whiteRGB,
      padding: '5px 0% 5px 2%',
      margin: '0 3% 0 0',
      outline: 'none',
      resize: 'none',
      border: Container.border,
      borderRadius: '3px',
      WebkitAppearance: 'none',

    });
    const layout = Footer.getLayout( layoutInlineBlock );
    const content = Style.getContentBase({
      textAlign: 'left',
    });
    const animation = Style.getAnimationBase();

    return Style.get({layout, content, animation});
  }

  static getButton(){
    const layoutInlineBlock = Style.getLayoutInlineBlock({
      outline: 'none',
      width: '20%',
      margin: '0px 3% 0px 0%',
      background: 'rgb(245, 245, 245)',
      border: Container.border,
      borderRadius: '3px',
    });
    const layout = Footer.getLayout( layoutInlineBlock );
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }
}
