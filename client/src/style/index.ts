import { CSSProperties } from 'react';

import Board from './Board';
import Container from './Container';
import Detail from './Detail';
import DetailFooter from './DetailFooter';
import EmotionGraph from './EmotionGraph';
import ExtScreen from './ExtScreen';
import Footer from './Footer';
import Header from './Header';
import Icon from './Icon';
import InnerNotif from './InnerNotif';
import Link from './Link';
import Links from './Links';
import Loading from './Loading';
import LockMenu from './LockMenu';
import Audio from './Media/Audio';
import Video from './Media/Video';
import Menu from './Menu';
import MenuUsers from './Menu/MenuUsers';
import Ranks from './Menu/Ranks';
import SetChModal from './Menu/SetChModal';
import Ch from './Menu/common/Ch';
import MenuFooter from './MenuFooter';
import Notif from './Notif';
import Post from './Post';
import Posts from './Posts';
import PostsFooter from './PostsFooter';
import PostsSupporter from './PostsSupporter';
import TimeMarker from './TimeMarker';
import LiveCnt from './common/LiveCnt';

export type StyleValue = string | number;
export type StyleCSSProperties = { [key: string]: StyleValue };

export default class Style {
  static get fontBaseRGB() {
    return 'rgb(60, 60, 60)';
  }

  static get darkLightRGB() {
    return 'rgba(0, 0, 0, 0.2)';
  }

  static get darkLightRGBA() {
    return 'rgba(0, 0, 0, 0.25)';
  }

  static get darkRGB() {
    return 'rgb(0, 0, 0)';
  }

  static get darkRGBA() {
    return 'rgba(0, 0, 0, 0.4)';
  }

  static get mono160RGB() {
    return 'rgb(160, 160, 160)';
  }
  static get mono160RGBA() {
    return 'rgb(160, 160, 160)';
  }
  static get mono180RGB() {
    return 'rgb(180, 180, 180)';
  }
  static get mono192RGB() {
    return 'rgb(192, 192, 192)';
  }
  static get mono200RGB() {
    return 'rgb(200, 200, 200)';
  }
  static get mono205RGB() {
    return 'rgb(205, 205, 205)';
  }
  static get mono210RGB() {
    return 'rgb(210, 210, 210)';
  }
  static get mono211RGB() {
    return 'rgb(211, 211, 211)';
  }
  static get mono215RGB() {
    return 'rgb(215, 215, 215)';
  }
  static get mono220RGB() {
    return 'rgb(220, 220, 220)';
  }
  static get mono225RGB() {
    return 'rgb(225, 225, 225)';
  }
  static get mono230RGB() {
    return 'rgb(230, 230, 230)';
  }
  static get mono235RGB() {
    return 'rgb(235, 235, 235)';
  }
  static get mono240RGB() {
    return 'rgb(240, 240, 240)';
  }
  static get mono245RGB() {
    return 'rgb(245, 245, 245)';
  }
  static get mono250RGB() {
    return 'rgb(250, 250, 250)';
  }
  static get mono251RGB() {
    return 'rgb(251, 251, 251)';
  }
  static get mono252RGB() {
    return 'rgb(252, 252, 252)';
  }
  static get mono253RGB() {
    return 'rgb(253, 253, 253)';
  }
  static get mono254RGB() {
    return 'rgb(254, 254, 254)';
  }
  static get mono255RGB() {
    return 'rgb(255, 255, 255)';
  }

  static get mono180RGBA() {
    return 'rgba(180, 180, 180, 0.96)';
  }
  static get mono192RGBA() {
    return 'rgba(192, 192, 192, 0.96)';
  }
  static get mono200RGBA() {
    return 'rgba(200, 200, 200, 0.96)';
  }
  static get mono205RGBA() {
    return 'rgba(205, 205, 205, 0.96)';
  }
  static get mono210RGBA() {
    return 'rgba(210, 210, 210, 0.96)';
  }
  static get mono211RGBA() {
    return 'rgba(211, 211, 211, 0.96)';
  }
  static get mono215RGBA() {
    return 'rgba(215, 215, 215, 0.96)';
  }
  static get mono220RGBA() {
    return 'rgba(220, 220, 220, 0.96)';
  }
  static get mono225RGBA() {
    return 'rgba(225, 225, 225, 0.96)';
  }
  static get mono230RGBA() {
    return 'rgba(230, 230, 230, 0.96)';
  }
  static get mono235RGBA() {
    return 'rgba(235, 235, 235, 0.96)';
  }
  static get mono240RGBA() {
    return 'rgba(240, 240, 240, 0.96)';
  }
  static get mono245RGBA() {
    return 'rgba(245, 245, 245, 0.96)';
  }
  static get mono250RGBA() {
    return 'rgba(250, 250, 250, 0.96)';
  }
  static get mono252RGBA() {
    return 'rgba(252, 252, 252, 0.96)';
  }
  static get mono255RGBA() {
    return 'rgba(255, 255, 255, 0.96)';
  }

  static get twitterRGB() {
    return 'rgba(76, 160, 235)';
  }
  static get twitterRGBA() {
    return 'rgba(76, 160, 235, 0.96)';
  }
  static get facebookRGB() {
    return 'rgba(73, 104, 173)';
  }
  static get facebookRGBA() {
    return 'rgba(73, 104, 173, 0.96)';
  }

  static get emptyLabelStyle() {
    return { maxWidth: 0, maxHeight: 0 };
  }

  container: Container;
  header: Header;
  footer: Footer;
  postsSupporter: PostsSupporter;
  postsFooter: PostsFooter;
  menuFooter: MenuFooter;
  menu: Menu;
  ranks: Ranks;
  ch: Ch;
  menuUsers: MenuUsers;
  setChModal: SetChModal;
  extScreen: ExtScreen;
  lockMenu: LockMenu;
  posts: Posts;
  post: Post;
  timeMarker: TimeMarker;
  notif: Notif;
  board: Board;
  links: Links;
  link: Link;
  audio: Audio;
  video: Video;
  innerNotif: InnerNotif;
  detail: Detail;
  detailFooter: DetailFooter;
  emotionGraph: EmotionGraph;
  icon: Icon;
  liveCnt: LiveCnt;
  loading: Loading;
  constructor(params) {
    const container = new Container(params);
    const header = new Header(params);
    const footer = new Footer(params);
    const postsSupporter = new PostsSupporter(params);
    const postsFooter = new PostsFooter(params);
    const menuFooter = new MenuFooter(params);
    const menu = new Menu(params);
    const ranks = new Ranks(params);
    const ch = new Ch(params);
    const menuUsers = new MenuUsers(params);
    const setChModal = new SetChModal(params);
    const extScreen = new ExtScreen(params);
    const lockMenu = new LockMenu(params);
    const posts = new Posts(params);
    const post = new Post(params);
    const timeMarker = new TimeMarker(params);
    const notif = new Notif(params);
    const board = new Board(params);
    const links = new Links(params);
    const link = new Link(params);
    const audio = new Audio(params);
    const video = new Video(params);
    const innerNotif = new InnerNotif(params);
    const detail = new Detail(params);
    const detailFooter = new DetailFooter(params);
    const emotionGraph = new EmotionGraph(params);
    const icon = new Icon(params);
    const liveCnt = new LiveCnt(params);
    const loading = new Loading(params);
    return {
      container,
      header,
      footer,
      postsSupporter,
      postsFooter,
      menuFooter,
      detailFooter,
      menu,
      ranks,
      ch,
      menuUsers,
      setChModal,
      extScreen,
      lockMenu,
      posts,
      post,
      timeMarker,
      notif,
      audio,
      video,
      board,
      links,
      link,
      innerNotif,
      detail,
      emotionGraph,
      icon,
      liveCnt,
      loading,
    };
  }

  static get(styles = { layout: {}, content: {}, animation: {} }): React.CSSProperties {
    return { ...styles.layout, ...styles.content, ...styles.animation };
  }

  /************************/
  /*  Layout              */
  /************************/

  static getLayoutBase(style = {}): CSSProperties {
    const baseLayout: CSSProperties = {
      display: 'block',
      boxSizing: 'border-box',
      overflow: 'hidden',
      width: 'inherit',
      height: 'inherit',
      minWidth: 'auto',
      minHeight: 'auto',
      maxWidth: 'inherit',
      maxHeight: 'inherit',
      padding: 0,
      margin: 0,
      lineHeight: 1,
      listStyle: 'none',
      userSelect: 'none',
      textDecoration: 'none',
      verticalAlign: 'baseline',
      borderCollapse: 'collapse',
      borderSpacing: 0,
      border: 0,
      borderRadius: 0,
      zIndex: 1,
    };
    return { ...baseLayout, ...style };
  }

  static getLayoutGrid(style = {}): CSSProperties {
    const blockLayout: CSSProperties = Style.getLayoutBase({
      display: 'grid',
    });
    return { ...blockLayout, ...style };
  }

  static getLayoutFlex(style = {}): CSSProperties {
    const blockLayout: CSSProperties = Style.getLayoutBase({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      flexWrap: 'no-wrap',
    });
    return { ...blockLayout, ...style };
  }

  static getLayoutInlineFlex(style = {}): CSSProperties {
    const blockLayout: CSSProperties = Style.getLayoutBase({
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      flexWrap: 'no-wrap',
    });
    return { ...blockLayout, ...style };
  }

  static getLayoutTable(style = {}): CSSProperties {
    const blockLayout: CSSProperties = Style.getLayoutBase({
      display: 'table',
    });
    return { ...blockLayout, ...style };
  }

  static getLayoutTableRow(style = {}): CSSProperties {
    const blockLayout: CSSProperties = Style.getLayoutBase({
      display: 'table-row',
    });
    return { ...blockLayout, ...style };
  }

  static getLayoutTableCol(style = {}): CSSProperties {
    const blockLayout: CSSProperties = Style.getLayoutBase({
      display: 'table-cell',
    });
    return { ...blockLayout, ...style };
  }

  static getLayoutFlexChild(style = {}): CSSProperties {
    const blockLayout: CSSProperties = Style.getLayoutBase({
      width: 'auto',
      height: 'auto',
    });
    return { ...blockLayout, ...style };
  }

  static getLayoutBlock(style = {}): CSSProperties {
    const blockLayout: CSSProperties = Style.getLayoutBase({
      display: 'block',
    });
    return { ...blockLayout, ...style };
  }

  static getLayoutInlineBlock(style = {}): CSSProperties {
    const inlineBlockLayout: CSSProperties = Style.getLayoutBase({
      display: 'inline-block',
      align: 'center',
      verticalAlign: 'middle',
    });
    return { ...inlineBlockLayout, ...style };
  }

  static getLayoutInline(style = {}): CSSProperties {
    const blockLayout: CSSProperties = Style.getLayoutBase({
      display: 'inline',
    });
    return { ...blockLayout, ...style };
  }

  /************************/
  /* Content              */
  /************************/

  static getContentBase(style = {}): CSSProperties {
    const contentBase: CSSProperties = {
      wordWrap: 'break-word',
      whiteSpace: 'normal',
      quotes: 'none',
      content: 'none',
      cursor: 'default',
    };
    const fontBase = Style.getFontBase();
    return { ...contentBase, ...fontBase, ...style };
  }

  static getFontBase(style = {}): CSSProperties {
    const fontBase: CSSProperties = {
      letterSpacing: 'inherit',
      lineHeight: 'inherit',
      textAlign: 'center',
      color: Style.fontBaseRGB,
      fontWeight: 300,
      fontSize: 'inherit',
      fontFamily:
        '"M PLUS 1p",-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Hiragino Sans,Noto Sans CJK JP,Original Yu Gothic,Yu Gothic,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Sans Emoji',
    };
    return { ...fontBase, ...style };
  }

  /************************/
  /* Animation            */
  /************************/

  static getAnimationBase(style = {}): CSSProperties {
    const animationBase = {
      transition: `${Container.transitionOff}ms`,
      transform: 'translate3d(0px, 0px, 0px)',
    };
    return { ...animationBase, ...style };
  }

  static trimUnit(value) {
    return Number(value.toString().replace(/px|%|vw|vh|ms/, ''));
  }
}
