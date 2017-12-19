import Style from './index';

export default class Footer{
  constructor( params ){
    const { meta, bootOption } = params;
    const self = Footer.getSelf( bootOption );
    const icon = Footer.getIcon( meta );
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

  // width: 20%;
  static getIcon( meta ){
    const layoutInlineBlock = Style.getLayoutInlineBlock({
      margin: '4px 0 0 0',
      width: '20%',
      background: `url( ${meta.icon} ) 50% 50% / 20px 20px no-repeat`,
    });
    const layout = Footer.getLayout( layoutInlineBlock );
    const content = {};
    const animation = {};
    return Style.get({layout, content, animation});
  }

  // width: 59%;
  static getTextarea(){
    const layoutInlineBlock = Style.getLayoutInlineBlock({
      width: '54%',
      background: 'rgb(255, 255, 255)',
      padding: '5px 0% 5px 2%',
      margin: '4px 3% 0 0',
      outline: 'none',
      resize: 'none',
      border: '1px solid rgb(220, 220, 220 )',
      borderRadius: '3px',
    });
    const layout = Footer.getLayout( layoutInlineBlock );
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase();

    return Style.get({layout, content, animation});
  }

  // width: 23%;
  static getButton(){
    const layoutInlineBlock = Style.getLayoutInlineBlock({
      outline: 'none',
      width: '20%',
      margin: '4px 3% 0px 0%',
      background: 'rgb(245, 245, 245)',
      border: '1px solid rgb(220, 220, 220)',
      borderRadius: '3px',
    });
    const layout = Footer.getLayout( layoutInlineBlock );
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }
}
