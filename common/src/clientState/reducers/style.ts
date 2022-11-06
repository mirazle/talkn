import Ui from 'common/clientState/store/Ui';

import Board from 'client/style/Board';
import Container from 'client/style/Container';
import Detail from 'client/style/Detail';
import DetailModal from 'client/style/DetailModal';
import DetailRight from 'client/style/DetailRight';
import ExtScreen from 'client/style/ExtScreen';
import Footer from 'client/style/Footer';
import Header from 'client/style/Header';
import Icon from 'client/style/Icon';
import Links from 'client/style/Links';
import LockMenu from 'client/style/LockMenu';
import Audio from 'client/style/Media/Audio';
import Video from 'client/style/Media/Video';
import Menu from 'client/style/Menu';
import Ranks from 'client/style/Menu/Ranks';
import SetChModal from 'client/style/Menu/SetChModal';
import MenuFooter from 'client/style/MenuFooter';
import Notif from 'client/style/Notif';
import Post from 'client/style/Post';
import Posts from 'client/style/Posts';
import PostsFooter from 'client/style/PostsFooter';
import PostsSupporter from 'client/style/PostsSupporter';
// import style from "client/store/Style";
import Style from 'client/style/index';

export default (state: any = {}, action: any) => {
  switch (action.type) {
    case 'ON_RESIZE_START_WINDOW':
    case 'ON_RESIZE_END_WINDOW':
    case 'ON_TRANSITION':
    case 'ON_TRANSITION_END':
    case 'OFF_TRANSITION':
    case 'EXT_TO_CLIENT[ACTION]:ON_TRANSITION':
    case 'bootExtension':
      return new Style(action);
    case 'TOGGLE_DISP_MAIN':
      return { ...state };
    case 'API_TO_CLIENT[EMIT]:rank':
    case 'API_TO_CLIENT[EMIT]:tune':
    case 'API_TO_CLIENT[BROADCAST]:tune':
      return {
        ...state,
        ranks: {
          ...state.ranks,
          ol: Ranks.getOl(action),
        },
      };
    case 'ON_CLICK_MULTISTREAM':
      return {
        ...state,
        board: {
          ...state.board,
          menuLiChild: {
            ...state.board.menuLiChild,
            color: action.app.multistream ? Board.activeColor : Board.unactiveColor,
          },
        },
        icon: {
          ...state.icon,
          thunder: {},
        },
      };
    case 'COMPONENT_DID_MOUNTS':
      return {
        ...state,
        menus: {
          ...state.menus,
          self: { ...state.menus, transform: Menu.getTransform(action) },
        },
      };
    case 'API_TO_CLIENT[BROADCAST]:fetchPosts':
      return {
        ...state,
        menus: {
          ...state.menus,
          self: { ...state.menus, transform: Menu.getTransform(action) },
        },
      };

    case 'API_TO_CLIENT[REQUEST]:fetchPosts':
    case 'API_TO_CLIENT[REQUEST]:changeThread':
      return {
        ...state,
        posts: { ...state.posts, self: Posts.getSelf(action) },
      };
    case 'API_TO_CLIENT[EMIT]:fetchPosts':
    case 'OPEN_LINKS':
    case 'CLOSE_LINKS':
    case 'TOGGLE_LINKS':
      return {
        ...state,
        menus: {
          ...state.menus,
          self: { ...state.menus, transform: Menu.getTransform(action) },
        },
        posts: { ...state.posts, self: Posts.getSelf(action) },
        board: {
          ...state.board,
          self: {
            ...state.board.self,
            width: Board.getSelfWidth(action),
            height: Board.getSelfHeight(action),
            boxShadow: Board.getSelfBoxShadow(action),
          },
          menuLiChild: Board.getMenuLiChild(action),
          menuLiLinks: Board.getMenuLiLinks(action),
        },
        links: {
          ...state.links,
          self: {
            ...state.links.self,
            display: Links.getSelfDisplay(action),
          },
          linksUl: {
            ...state.links.linksUl,
            overflowY: Links.getLinksUlOevrflowY(action),
          },
        },
        icon: {
          ...state.icon,
          thunder: Icon.getThunder(action),
          bubble: Icon.getBubble(action),
          links: Icon.getLinks(action),
        },
      };
    case 'TOGGLE_DISP_SET_CH_MODAL':
      return {
        ...state,
        setChModal: {
          ...state.setChModal,
          self: SetChModal.getSelf(action),
        },
      };
    case 'TOGGLE_BUBBLE_POST':
      return {
        ...state,
        board: {
          ...state.board,
          menuLiBubble: {
            ...state.board.menuLiBubble,
            color: action.ui.isBubblePost ? Board.activeColor : Board.unactiveColor,
          },
        },
        posts: {
          ...state.posts,
          self: Posts.getSelf(action),
          more: Posts.getMore(action),
        },
        post: {
          ...state.post,
          self: Post.getSelf(action),
          upper: Post.getUpper(action),
          bottomPost: Post.getBottomPost(action),
        },
      };
    case 'TOGGLE_DISP_POSTS_SUPPORTER':
    case 'CLOSE_DISP_POSTS_SUPPORTER':
      return {
        ...state,
        postsSupporter: {
          ...state.postsSupporter,
          self: {
            ...state.postsSupporter.self,
            transform: PostsSupporter.getTransform(action),
          },
        },
      };
    case 'ON_CLICK_TO_TIMELINE_THREAD':
      return {
        ...state,
        posts: { ...state.posts, self: Posts.getSelf(action) },
        board: {
          ...state.board,
          self: {
            ...state.board.self,
            height: Board.getSelfHeight(action),
          },
          menuLiChild: {
            ...state.menuLiChild,
            color: Ui.isActiveMultistream(action, 'reducer') ? Board.activeColor : Board.unactiveColor,
          },
          menuLiLinks: { ...state.menuLiLinks, color: Board.unactiveColor },
        },
        video: { ...state.video, self: Video.getSelf(action) },
        audio: { ...state.audio, self: Audio.getSelf(action) },
      };
    case 'ON_CLICK_TO_MULTI_THREAD':
      return {
        ...state,
        posts: { ...state.posts, self: Posts.getSelf(action) },
        board: {
          ...state.board,
          self: {
            ...state.board.self,
            height: Board.getSelfHeight(action),
          },
          menuLiChild: { ...state.board.menuLiChild, color: Board.activeColor },
          menuLiLinks: { ...state.menuLiLinks, color: Board.activeColor },
        },
      };
    case 'ON_CLICK_TO_SINGLE_THREAD':
      return {
        ...state,
        board: {
          ...state.board,
          self: {
            ...state.board.self,
            height: Board.getSelfHeight(action),
          },
          menuLiLinks: { ...state.menuLiLinks, color: Board.activeColor },
        },
      };
    case 'ON_CLICK_TO_CHILD_THREAD':
      return {
        ...state,
        board: {
          ...state.board,
          self: {
            ...state.board.self,
            height: Board.getSelfHeight(action),
          },
          menuLiChild: {
            ...state.board.menuLiChild,
            color: Board.unactiveColor,
          },
          menuLiLinks: { ...state.menuLiLinks, color: Board.unactiveColor },
        },
        icon: { ...state.icon, thunder: Icon.getThunder(action) },
      };
    case 'ON_CLICK_TOGGLE_DISP_MENU_END':
      return {
        ...state,
        posts: {
          ...state.posts,
          self: Posts.getSelf(action),
        },
      };
    case 'ON_CLICK_TOGGLE_DISP_DETAIL':
    case 'ON_CLICK_TOGGLE_DISP_MENU':
      return {
        ...state,
        menu: {
          ...state.menu,
          self: {
            ...state.menu.self,
            width: Menu.getWidth(action),
            transform: Menu.getTransform(action),
          },
        },
        detail: {
          ...state.detail,
          [`self${Detail.detailRightSelfKey}`]: {
            ...state.detail[`self${Detail.detailRightSelfKey}`],
            transform: DetailRight.getTransform(action),
          },
          [`self${Detail.detailModalSelfKey}`]: {
            ...state.detail[`self${Detail.detailModalSelfKey}`],
            transform: DetailModal.getTransform(action),
          },
        },
        posts: {
          ...state.posts,
          self: { ...state.posts.self, width: Posts.getWidth(action) },
        },
        footer: {
          ...state.footer,
          self: {
            ...state.footer.self,
            width: Footer.getWidth(action),
            transform: Footer.getTransform(action),
          },
        },
        menuFooter: {
          ...state.menuFooter,
          self: {
            ...state.menuFooter.self,
            width: MenuFooter.getWidth(action),
          },
        },
        postsFooter: {
          ...state.postsFooter,
          self: {
            ...state.postsFooter.self,
            maxWidth: PostsFooter.getWidth(action),
            width: PostsFooter.getWidth(action),
          },
        },
      };
    case 'ON_CLICK_OPEN_LOCK_MENU':
      return {
        ...state,
        lockMenu: {
          ...state.lockMenu,
          menuShare: {
            ...state.lockMenu.menuShare,
            transform: LockMenu.getCommonTransform(action),
          },
        },
      };
    case 'OPEN_NEW_POST':
    case 'CLOSE_NEW_POST':
      return {
        ...state,
        container: {
          ...state.container,
          newPost: {
            ...state.container.newPost,
            transform: Container.getNotifTranslateY(action),
          },
        },
      };
    case 'OPEN_NOTIF':
    case 'CLOSE_NOTIF':
      const notifDisplay = Notif.getNotifsDisplay(action);
      return {
        ...state,
        header: {
          ...state.header,
          self: {
            ...state.header.self,
            transform: Header.getNotifTranslateY(action),
          },
        },
        container: {
          ...state.container,
          newPost: {
            ...state.container.newPost,
            display: Container.getNewPostDisplay(action),
          },
        },
        notif: {
          ...state.notif,
          notifs: {
            ...state.notif.notifs,
            height: Notif.getNotifsHeight(action),
          },
          self: { ...state.notif.self, display: notifDisplay },
        },
      };
    case 'TOGGLE_DISP_BOARD':
      return {
        ...state,
        board: { ...state.board, self: Board.getSelf(action) },
      };
    case 'OPEN_INNER_NOTIF':
    case 'CLOSE_INNER_NOTIF':
      return {
        ...state,
        innerNotif: {
          ...state.innerNotif,
          self: {
            ...state.innerNotif.self,
            height: action.ui.openInnerNotif !== '' ? `${Container.getBlockSize(action)}px` : '0px',
          },
        },
      };
    case 'UPDATE_STYLE':
      const { styleKey, eleType, tagName, style } = action;
      if (styleKey && eleType && tagName) {
        return {
          ...state,
          [styleKey]: {
            ...state[styleKey],
            [eleType]: {
              ...state[styleKey][eleType],
              [tagName]: { ...state[styleKey][eleType][tagName], ...style },
            },
          },
        };
      } else if (styleKey && eleType) {
        return {
          ...state,
          [styleKey]: {
            ...state[styleKey],
            [eleType]: { ...state[styleKey][eleType], ...style },
          },
        };
      }
      break;
    case 'START_DISP_POSTS':
    case 'START_UNDISP_POSTS':
      return {
        ...state,
        extScreen: {
          ...state.extScreen,
          self: {
            ...state.extScreen.self,
            transform: ExtScreen.getSelfTransform(action),
            transition: ExtScreen.getSelfTransition(action),
          },
        },
        notif: {
          ...state.notif,
          notifs: {
            ...state.notif.notifs,
            display: Notif.getNotifsDisplay(action),
          },
        },
      };
    default:
      return action.style ? action.style : state;
  }
};
