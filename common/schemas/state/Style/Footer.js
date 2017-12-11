import Style from './index';

export default class Footer{
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
    const layout = {};
    const content = {};
    const animation = {};
    return Style.get({layout, content, animation});
  }

  static getIcon( thread ){
    const layoutInlineBlock = Style.getLayoutInlineBlock({
      margin: '4px 0 0 0',
      width: '20%',
      background: `url( ${thread.icon} ) 50% 50% / 20px 20px no-repeat`,
    });
    const layout = Footer.getLayout( layoutInlineBlock );
    const content = {};
    const animation = {};
    return Style.get({layout, content, animation});
  }

  static getTextarea(){
    const layoutInlineBlock = Style.getLayoutInlineBlock({
      width: '55%',
      background: 'rgb(255, 255, 255)',
      padding: '5px 0% 5px 3%',
      margin: '4px 2% 0 0',
      outline: 'none',
      resize: 'none',
      border: '1px solid rgb(240, 240, 240 )',
      borderRadius: '3px',
    });
    const layout = Footer.getLayout( layoutInlineBlock );
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase();

    return Style.get({layout, content, animation});
  }

  static getButton(){
    const layoutInlineBlock = Style.getLayoutInlineBlock({
      outline: 'none',
      width: '20%',
      margin: '4px 3% 0px 0%',
      background: 'rgb(245, 245, 245)',
      border: '1px solid rgb(240, 240, 240)',
      borderRadius: '3px',
    });
    const layout = Footer.getLayout( layoutInlineBlock );
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }
}
