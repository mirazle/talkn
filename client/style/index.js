import Container from './Container';
import Detail from './Detail';
import Footer from './Footer';
import Icon from './Icon';
import Main from './Main';
import Screen from './Screen';
import Menu from './Menu';
import Posts from './Posts';
import Post from './Post';


export default class Style{

  static get mono180RGB(){ return 'rgb(180, 180, 180)' };
  static get mono220RGB(){ return 'rgb(220, 220, 220)' };
  static get mono225RGB(){ return 'rgb(225, 225, 225)' };
  static get mono230RGB(){ return 'rgb(230, 230, 230)' };
  static get mono235RGB(){ return 'rgb(235, 235, 235)' };
  static get mono240RGB(){ return 'rgb(240, 240, 240)' };
  static get mono245RGB(){ return 'rgb(245, 245, 245)' };
  static get mono250RGB(){ return 'rgb(250, 250, 250)' };
  static get mono255RGB(){ return 'rgb(255, 255, 255)' };

  static get mono180RGBA(){ return 'rgba(180, 180, 180, 0.96)' };
  static get mono220RGBA(){ return 'rgba(220, 220, 220, 0.96)' };
  static get mono225RGBA(){ return 'rgba(225, 225, 225, 0.96)' };
  static get mono230RGBA(){ return 'rgba(230, 230, 230, 0.96)' };
  static get mono235RGBA(){ return 'rgba(235, 235, 235, 0.96)' };
  static get mono240RGBA(){ return 'rgba(240, 240, 240, 0.96)' };
  static get mono245RGBA(){ return 'rgba(245, 245, 245, 0.96)' };
  static get mono250RGBA(){ return 'rgba(250, 250, 250, 0.96)' };
  static get mono255RGBA(){ return 'rgba(255, 255, 255, 0.96)' };

  constructor( params ){
    const container = new Container( params );
    const footer = new Footer( params );
    const menu = new Menu( params );
    const main = new Main( params );
    const screen = new Screen( params );
    const posts = new Posts( params );
    const post = new Post( params );
    const detail = new Detail( params );
    const icon = new Icon( params );
    return {
      container,
      footer,
      menu,
      main,
      screen,
      posts,
      post,
      detail,
      icon,
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
      minWidth: 'auto',
      minHeight: 'auto',
      maxWidth: 'inherit',
      maxHeight: 'inherit',
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
      flexDirection: 'row',
      flexWrap: 'no-wrap',
    });
    return { ...blockLayout, ...style };
  }

  static getLayoutTable( style = {} ){
    const blockLayout = Style.getLayoutBase({
      display: 'table',
    });
    return { ...blockLayout, ...style };
  }

  static getLayoutTableRow( style = {} ){
    const blockLayout = Style.getLayoutBase({
      display: 'table-row',
    });
    return { ...blockLayout, ...style };
  }

  static getLayoutTableCol( style = {} ){
    const blockLayout = Style.getLayoutBase({
      display: 'table-cell',
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

  static getLayoutInline( style = {} ){
    const blockLayout = Style.getLayoutBase({
      display: 'inline',
    });
    return { ...blockLayout, ...style };
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
//      fontFamily: '"Hiragino Kaku Gothic Pro", "ヒラギノ角ゴ Pro W3", メイリオ, Meiryo, "ＭＳ Ｐゴシック", "Helvetica Neue", Helvetica, Arial, sans-serif',
      fontFamily: '"Myriad Set Pro", "Lucida Grande", "Helvetica Neue", "Helvetica", "Arial", "Verdana", "sans-serif"',
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

  static trimUnit( value ){
    return Number( value.toString().replace( /px|%|vw|vh/, '' ) );
  }
}
