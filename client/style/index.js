import Container from './Container';
import Detail from './Detail';
import DetailFooter from './DetailFooter';
import Header from './Header';
import Footer from './Footer';
import PostsSupporter from './PostsSupporter';
import PostsFooter from './PostsFooter';
import MenuFooter from './MenuFooter';
import Icon from './Icon';
import Menu from './Menu';
import MenuIndex from './Menu/index';
import MenuIndexList from './Menu/MenuIndexList';
import MenuUsers from './Menu/MenuUsers';
import LockMenu from './LockMenu';
import Posts from './Posts';
import Post from './Post';
import InnerNotif from './InnerNotif';
import Audio from './Media/Audio';
import Video from './Media/Video';
import Notif from './Notif';
import Board from './Board';
import Links from './Links';
import Link from './Link';
import Loading from './Loading';
import ExtScreen from './ExtScreen';

export default class Style{

  static get fontBaseRGB(){ return 'rgb(160, 160, 160)' };

  static get darkRGB(){ return 'rgb(0, 0, 0)' };
  static get darkRGBA(){ return 'rgba(0, 0, 0, 0.4)' };

  static get mono180RGB(){ return 'rgb(180, 180, 180)' };
  static get mono192RGB(){ return 'rgb(192, 192, 192)' };
  static get mono200RGB(){ return 'rgb(200, 200, 200)' };
  static get mono205RGB(){ return 'rgb(205, 205, 205)' };
  static get mono210RGB(){ return 'rgb(210, 210, 210)' };
  static get mono211RGB(){ return 'rgb(211, 211, 211)' };
  static get mono215RGB(){ return 'rgb(215, 215, 215)' };
  static get mono220RGB(){ return 'rgb(220, 220, 220)' };
  static get mono225RGB(){ return 'rgb(225, 225, 225)' };
  static get mono230RGB(){ return 'rgb(230, 230, 230)' };
  static get mono235RGB(){ return 'rgb(235, 235, 235)' };
  static get mono240RGB(){ return 'rgb(240, 240, 240)' };
  static get mono245RGB(){ return 'rgb(245, 245, 245)' };
  static get mono250RGB(){ return 'rgb(250, 250, 250)' };
  static get mono251RGB(){ return 'rgb(251, 251, 251)' };
  static get mono252RGB(){ return 'rgb(252, 252, 252)' };
  static get mono253RGB(){ return 'rgb(253, 253, 253)' };
  static get mono254RGB(){ return 'rgb(254, 254, 254)' };
  static get mono255RGB(){ return 'rgb(255, 255, 255)' };

  static get mono180RGBA(){ return 'rgba(180, 180, 180, 0.96)' };
  static get mono192RGBA(){ return 'rgba(192, 192, 192, 0.96)' };
  static get mono200RGBA(){ return 'rgba(200, 200, 200, 0.96)' };
  static get mono205RGBA(){ return 'rgba(205, 205, 205, 0.96)' };
  static get mono210RGBA(){ return 'rgba(210, 210, 210, 0.96)' };
  static get mono211RGBA(){ return 'rgba(211, 211, 211, 0.96)' };
  static get mono215RGBA(){ return 'rgba(215, 215, 215, 0.96)' };
  static get mono220RGBA(){ return 'rgba(220, 220, 220, 0.96)' };
  static get mono225RGBA(){ return 'rgba(225, 225, 225, 0.96)' };
  static get mono230RGBA(){ return 'rgba(230, 230, 230, 0.96)' };
  static get mono235RGBA(){ return 'rgba(235, 235, 235, 0.96)' };
  static get mono240RGBA(){ return 'rgba(240, 240, 240, 0.96)' };
  static get mono245RGBA(){ return 'rgba(245, 245, 245, 0.96)' };
  static get mono250RGBA(){ return 'rgba(250, 250, 250, 0.96)' };
  static get mono252RGBA(){ return 'rgba(252, 252, 252, 0.96)' };
  static get mono255RGBA(){ return 'rgba(255, 255, 255, 0.96)' };

  static get twitterRGB(){ return 'rgba(76, 160, 235)' };
  static get twitterRGBA(){ return 'rgba(76, 160, 235, 0.96)' };
  static get facebookRGB(){ return 'rgba(73, 104, 173)' };
  static get facebookRGBA(){ return 'rgba(73, 104, 173, 0.96)' };

  constructor( params ){
    const container = new Container( params );
    const header = new Header( params );
    const footer = new Footer( params );
    const postsSupporter = new PostsSupporter( params );
    const postsFooter = new PostsFooter( params );
    const menuFooter = new MenuFooter( params );
    const menu = new Menu( params );
    const menuIndex = new MenuIndex( params );
    const menuIndexList = new MenuIndexList( params );
    const menuUsers = new MenuUsers( params );
    const extScreen = new ExtScreen( params );
    const lockMenu = new LockMenu( params );
    const posts = new Posts( params );
    const post = new Post( params );
    const notif = new Notif( params );
    const board = new Board( params );
    const links = new Links( params );
    const link = new Link( params );
    const audio = new Audio( params );
    const video = new Video( params );
    const innerNotif = new InnerNotif( params );
    const detail = new Detail( params );
    const detailFooter = new DetailFooter( params );
    const icon = new Icon( params );
    const loading = new Loading( params );
    return {
      container,
      header,
      footer,
      postsSupporter,
      postsFooter,
      menuFooter,
      detailFooter,
      menu,
      menuIndex,
      menuIndexList,
      menuUsers,
      extScreen,
      lockMenu,
      posts,
      post,
      notif,
      audio,
      video,
      board,
      links,
      link,
      innerNotif,
      detail,
      icon,
      loading,
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

  static getLayoutInlineFlex( style = {} ){
    const blockLayout = Style.getLayoutBase({
      display: 'inline-flex',
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
      color: Style.fontBaseRGB,
      font: 'inherit',
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
      transition: Container.transitionOff,
      transform: 'translate3d(0px, 0px, 0px)',
    }
    return { ...animationBase, ...style };
  }

  static trimUnit( value ){
    return Number( value.toString().replace( /px|%|vw|vh|ms/, '' ) );
  }
}
