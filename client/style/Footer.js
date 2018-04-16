import Style from './index';
import Container from './Container';

export default class Footer{

  static get selfHeight(){ return 45 };
  static get selfWidth(){ return '100%' };

  constructor( params ){
    const self = Footer.getSelf( params );
    const icon = Footer.getIcon( params );
    const textarea = Footer.getTextarea();
    const button = Footer.getButton();
    return {
      self,
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

  static getSelf(){
    const layout = Style.getLayoutFlex({
      height: Footer.selfHeight,
      width: Footer.selfWidth,
      background: Container.offWhiteRGBA,
      position: 'absolute',
//      boxShadow: Container.shadow,
//      borderTop: Container.border,
//      borderRight: Container.border,
//      borderLeft: Container.border,
//      borderRadius: '3px 3px 0px 0px',
      zIndex: Container.maxZIndex,
    });
    const content = {};
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getIcon( {thread} ){
    const layoutInlineBlock = Style.getLayoutInlineBlock({
      width: '20%',
      backgroundImage: `url( ${thread.favicon} )`,
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
