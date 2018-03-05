import Container from './Container';
import Thread from './Thread';
import Footer from './Footer';
import Setting from './Setting';
import Main from './Main';
import Posts from './Posts';
import Post from './Post';

export default class Style{
  constructor( params ){
    const container = new Container( params );
    const thread = new Thread( params );
    const footer = new Footer( params );
    const setting = new Setting( params );
    const main = new Main( params );
    const posts = new Posts( params );
    const post = new Post( params );
    return {
      container,
      thread,
      footer,
      setting,
      main,
      posts,
      post,
    };
  }

  static get( styles = { layout: {}, content: {}, animation: {} } ){
    return { ...styles.layout, ...styles.content, ...styles.animation };
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
      zIndex: 1,
      align: 'center',
    }
    return { ...baseLayout, ...style };
  }

  static getLayoutFlex( style = {} ){
    const blockLayout = Style.getLayoutBase({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    });
    return { ...blockLayout, ...style };
  }

  static getLayoutFlexChild( style = {} ){
    const blockLayout = Style.getLayoutBase({
      width: 'auto',
      height: 'auto',
    });
    return { ...blockLayout, ...style };
  }

  static getLayoutBlock( style = {} ){
    const blockLayout = Style.getLayoutBase({
      display: 'block',
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
      letterSpacing: '1.5px',
      wordWrap: 'breakWord',
      whiteSpace: 'normal',
      quotes: 'none',
      content: 'none',
      cursor: 'default',
    }
    const fontBase = Style.getFontBase();
    return { ...contentBase, ...fontBase, ...style };
  }

  static getFontBase( style = {} ){
    const fontBase = {
      textAlign: 'center',
      color: 'rgb( 160, 160, 160 )',
      font: 'inherit',
      fontSize: '12px',
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
      transform: 'translate3d(0px, 0px, 0px)',
    }
    return { ...animationBase, ...style };
  }
}
