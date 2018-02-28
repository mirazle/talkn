import Style from './index';
import Container from './Container';

export default class Footer{

  static get selfHeight(){ return 40 };

  constructor( params ){
    const { thread, bootOption } = params;
    const self = Footer.getSelf( bootOption );
    const icon = Footer.getIcon( thread );
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
      background: Container.calmRGBA,
      position: 'absolute',
      boxShadow: Container.shadow,
      borderTop: Container.border,
      borderRight: Container.border,
      borderLeft: Container.border,
      borderRadius: '3px 3px 0px 0px',
    });
    const content = {};
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getIcon( thread ){
    const layoutInlineBlock = Style.getLayoutInlineBlock({
//      margin: '4px 0 0 0',
      width: '20%',
      background: `url( ${thread.thum} ) 50% 50% / 20px 20px no-repeat`,
    });
    const layout = Footer.getLayout( layoutInlineBlock );
    const content = {};
    const animation = {};
    return Style.get({layout, content, animation});
  }

  static getTextarea(){
    const layoutInlineBlock = Style.getLayoutInlineBlock({
      width: '54%',
      background: Container.lightRGB,
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

  // width: 23%;
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
