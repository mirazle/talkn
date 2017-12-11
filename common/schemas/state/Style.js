export default class Style{
  constructor( params ){
    const container = new Container( params );
    return {
      container,
    };
  }

  static get( styles = { layout: {}, content: {}, animation: {} } ){
    return { ...styles.layout, ...styles.content, ...styles.animation };
  }

  static getResetStyle( style ){
    const resetStyle = {
      ...Style.getAnimationBase(),
      ...Style.getContentBase(),
      ...Style.getLayoutBase(),
    };
    return { ...resetStyle, ...style };
  }

  /************************/
  /*  Layout              */
  /************************/

  static getLayoutBase( style = {} ){
    const baseLayout = {
      display: 'block',
      boxSizing: "border-box",
      overflow: 'hidden',
      width: 'inherit',
      height: 'inherit',
      background: 'rgb(250, 250, 250)',
      padding: 0,
      margin: 0,
      font: 0,
      lineHeight: 1,
      listStyle: 'none',
      userSelect: "none",
      textDecoration: 'none',
      verticalAlign: 'baseline',
      borderCollapse: 'collapse',
      borderSpacing: 0,
      border: 0,
      borderRadius: 0,
    }
    return { ...baseLayout, ...style };
  }

  static getLayoutBlock( style = {} ){
    const blockLayout = Style.getLayoutBase({
      display: 'block',
      align: 'center',
    });
    return { ...blockLayout, ...style };
  }

  static getLayoutInlineBlock( style = {} ){
    const inlineBlockLayout = Style.getLayoutBase({
      display: 'inline-block',
      align: 'center',
      verticalAlign: 'middle',
    });
    return { ...inlineBlockLayout, ...style };
  }

  /************************/
  /* Content              */
  /************************/

  static getContentBase( style = {} ){
    const contentBase = {
      letterSpacing: '1px',
      wordWrap: 'breakWord',
      whiteSpace: 'nowrap',
      quotes: 'none',
      content: 'none',
    }
    const fontBase = Style.getFontBase();
    return { ...contentBase, ...fontBase, ...style };
  }

  static getFontBase( style = {} ){
    const fontBase = {
      color: 'rgb( 160, 160, 160 )',
      font: 'inherit',
      fontSize: '13px',
      fontFamily: '"Hiragino Kaku Gothic Pro", "ヒラギノ角ゴ Pro W3", メイリオ, Meiryo, "ＭＳ Ｐゴシック", "Helvetica Neue", Helvetica, Arial, sans-serif',
    }
    return { ...fontBase, ...style };
  }

  /************************/
  /* Animation            */
  /************************/

  static getAnimationBase( style = {} ){
    const animationBase = {
      transition: "0ms",
    }
    return { ...animationBase, ...style };
  }
}

class Container{
  constructor( params ){
    const { thread, bootOption } = params;
    const self = Container.getSelf( bootOption );
    const icon = Container.getIcon( thread );
    const textarea = Container.getTextarea();
    const button = Container.getButton();
    return {
      self,
      icon,
      textarea,
      button,
    }
  }

  static getLayout( style ){
    const common = Container.getLayoutCommon();
    return {...style, ...common }
  }

  static getContent( style ){
    const common = Container.getContentCommon();
    return {...style, ...common }
  }

  static getAnimation( style ){
    const common = Container.getAnimationCommon();
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

  static getSelf( bootOption ){
    const layoutBlock = Style.getLayoutBlock({
      position: 'fixed',
      bottom: '0px',
      right: '10px',
      width: '320px',
      height: '35px',
      margin: '4px 0px 0px 0px',
      boxShadow: 'rgb(230, 230, 230) 0px 0px 5px 0px',
      borderTop: '1px solid rgb(240, 240, 240)',
      borderRight: '1px solid rgb(240, 240, 240)',
      borderLeft: '1px solid rgb(240, 240, 240)',
      borderRadius: '3px 3px 0px 0px',
    });
    const layout = {...layoutBlock, ...bootOption};
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getIcon( thread ){
    const layoutInlineBlock = Style.getLayoutInlineBlock({
      margin: '4px 0 0 0',
      width: '20%',
      background: `url( ${thread.icon} ) 50% 50% / 20px 20px no-repeat`,
    });
    const layout = Container.getLayout( layoutInlineBlock );
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
    const layout = Container.getLayout( layoutInlineBlock );
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
    const layout = Container.getLayout( layoutInlineBlock );
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase();
    console.log(content);
    return Style.get({layout, content, animation});
  }
}
